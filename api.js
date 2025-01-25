import { showFloatingMessage } from './utils.js';

// API Constants
export const PANTRY_URL = "https://getpantry.cloud/apiv1/pantry/be94921b-0a73-4c27-852f-903779cb6787";
export const BASKET_NAME = "LeaseBasket";
const API_COOLDOWN = 2000; // 2 second cooldown between API requests
const INITIAL_BACKOFF = 10000; // 10 second initial backoff
const MAX_BACKOFF = 30000; // 30 second maximum backoff

export class APIQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
        this.currentBackoff = INITIAL_BACKOFF;
        this.lastRequestTime = 0;
        this.currentAction = null;
        this.removingExpiredShares = false;
    }

    hasExpiredShareRemovalInQueue() {
        return this.queue.some(item =>
            item.request.options.method === 'POST' &&
            new URL(item.request.url).pathname.includes(`/basket/${BASKET_NAME}`) &&
            item.request.options.body
        );
    }

    removeExpiredShareRequest() {
        const index = this.queue.findIndex(item =>
            item.request.options.method === 'POST' &&
            new URL(item.request.url).pathname.includes(`/basket/${BASKET_NAME}`) &&
            item.request.options.body
        );
        if (index !== -1) {
            const [removed] = this.queue.splice(index, 1);
            removed.resolve(); // Resolve the promise since we're handling it with a newer request
            this.updateQueueDisplay();
        }
    }

    hasRefreshInQueue() {
        return this.queue.some(item =>
            item.request.options.method === 'GET' &&
            new URL(item.request.url).pathname.includes(`/basket/${BASKET_NAME}`)
        );
    }

    getActionMessage(request) {
        const method = request.options.method;
        const path = new URL(request.url).pathname;
        
        // Convert API requests to user-friendly messages
        if (method === 'GET') {
            return 'Fetching shares from the database';
        } else if (method === 'POST') {
            return 'Updating share database';
        } else if (method === 'PUT') {
            return 'Creating new share';
        }
        return 'Processing request...';
    }

    updateQueueDisplay() {
        const queueStatus = document.getElementById("queueStatus");
        const queueLengthSpan = document.querySelector(".queue-length");
        const processingSpan = document.querySelector(".processing");

        queueLengthSpan.textContent = this.queue.length;
        
        // If there's a current action, show it
        if (this.currentAction) {
            processingSpan.textContent = this.currentAction;
        }
        // If no current action but items in queue, show next action
        else if (this.queue.length > 0) {
            processingSpan.textContent = this.getActionMessage(this.queue[0].request);
        }
        // If nothing in queue and not processing, show ready state
        else {
            processingSpan.textContent = 'Ready for next operation';
        }

        // Show queue status if there are items in queue or processing
        if (this.queue.length > 0 || this.processing) {
            queueStatus.classList.add('visible');
        } else {
            queueStatus.classList.remove('visible');
        }
    }

    async enqueue(request) {
        console.log(`[Queue] Enqueueing ${request.options.method} request to ${request.url}`);
        console.log('[Queue] Current queue length:', this.queue.length);
        
        return new Promise((resolve, reject) => {
            this.queue.push({
                request,
                resolve,
                reject,
                retryCount: 0
            });
            console.log('[Queue] Request added. New queue length:', this.queue.length);
            this.updateQueueDisplay();
            this.processQueue();
        });
    }

    async processQueue() {
        if (this.processing || this.queue.length === 0) {
            console.log('[Queue] Queue processing skipped:', 
                this.processing ? 'Already processing' : 'Queue empty');
            if (!this.processing) {
                this.currentAction = null;
                this.updateQueueDisplay();
            }
            return;
        }
        
        this.processing = true;
        console.log('[Queue] Starting queue processing');

        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < API_COOLDOWN) {
            const waitTime = API_COOLDOWN - timeSinceLastRequest;
            console.log(`[Queue] Cooldown in effect. Waiting ${waitTime}ms`);
            // Keep showing the next action even during cooldown
            const nextItem = this.queue[0];
            this.currentAction = this.getActionMessage(nextItem.request);
            this.updateQueueDisplay();
            await this.delay(waitTime);
        }

        const item = this.queue[0];
        this.currentAction = this.getActionMessage(item.request);
        this.updateQueueDisplay();
        
        console.log('[Queue] Processing request:', item.request.options.method, item.request.url);
        
        try {
            console.log('[API] Making request:', {
                url: item.request.url,
                method: item.request.options.method,
                body: item.request.options.body
            });

            const response = await fetch(item.request.url, {
                ...item.request.options,
                headers: { "Content-Type": "application/json" }
            });
            
            if (response.status === 429) {
                console.warn(`[API] Rate limited. Backing off for ${this.currentBackoff}ms`);
                showFloatingMessage(`Server is busy. Retrying in ${this.currentBackoff / 1000} seconds...`, 'error');
                this.currentAction = `Waiting for server availability (${this.currentBackoff / 1000}s)`;
                this.updateQueueDisplay();
                await this.delay(this.currentBackoff);
                
                // Increase backoff time
                this.currentBackoff = Math.min(this.currentBackoff + 10000, MAX_BACKOFF);
                item.retryCount++;
                console.log(`[Queue] Retry ${item.retryCount}. New backoff: ${this.currentBackoff}ms`);
                
                // Keep the item in queue for retry
                this.processing = false;
                this.processQueue();
                return;
            }

            if (!response.ok) {
                // Try to get error details from response
                let errorMessage;
                try {
                    const errorText = await response.text();
                    console.log('[API] Error response text:', errorText);
                    
                    try {
                        // Try to parse as JSON first
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.message || errorText;
                    } catch {
                        // Use text as is if not JSON
                        errorMessage = errorText;
                    }
                } catch {
                    errorMessage = `HTTP Error: ${response.status}`;
                }
                throw new Error(errorMessage);
            }

            // Success - reset backoff and process response
            this.currentBackoff = INITIAL_BACKOFF;
            
            let responseData;
            const contentType = response.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                // JSON response (e.g., from PUT request)
                responseData = await response.json();
                console.log('[API] JSON Response:', responseData);
            } else {
                // Text response (e.g., from POST request)
                const textResponse = await response.text();
                console.log('[API] Text Response:', textResponse);
                
                // Try to parse as JSON in case content-type header is missing
                try {
                    responseData = JSON.parse(textResponse);
                    console.log('[API] Parsed as JSON:', responseData);
                } catch {
                    // Not JSON, use text response
                    responseData = textResponse;
                }
            }
            
            this.queue.shift(); // Remove the processed item
            console.log('[Queue] Request completed. Queue length:', this.queue.length);
            
            item.resolve(responseData);
        } catch (error) {
            console.error("[API] Error:", error);
            showFloatingMessage(`Error: ${error.message}`, 'error');
            item.reject(error);
            this.queue.shift(); // Remove failed item
            console.log('[Queue] Request failed. Queue length:', this.queue.length);
        }

        this.lastRequestTime = Date.now();
        this.processing = false;
        this.currentAction = null;
        this.updateQueueDisplay();
        console.log('[Queue] Processing complete');
        
        // Process next item after cooldown
        setTimeout(() => this.processQueue(), API_COOLDOWN);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// API Functions
export async function validateDiscordId(id) {
    try {
        const response = await fetch(`https://discordlookup.mesalytic.moe/v1/user/${id}`);
        const data = await response.json();
        
        if (data.message === "Unknown User" || data.message === "Value is not a valid Discord snowflake") {
            return { valid: false, error: "Invalid Discord ID" };
        }
        
        const username = data.global_name || data.username;
        return {
            valid: true,
            username
        };
    } catch (error) {
        console.error("[Discord] API Error:", error);
        return { valid: false, error: "Discord API error" };
    }
}

export function cleanExpiredShares(data) {
    const now = Date.now();
    if (data === null || typeof data !== 'object') {
        data = { shares: [] };
    }
    if (!('shares' in data)) {
        data.shares = [];
    }
    const originalShares = Array.isArray(data.shares) ? data.shares : [];
    const validShares = originalShares.filter(share =>
        (share.c || share.confirmed) || // Keep confirmed shares
        (share.e || share.expiration) > now // Keep unexpired shares
    );
    
    const expiredCount = originalShares.length - validShares.length;
    if (expiredCount > 0) {
        console.log('[Clean] Found expired shares:', expiredCount);
    }

    return {
        updated: expiredCount > 0,
        data: { ...data, shares: validShares }
    };
}