// Constants
export const DIGIT_LENGTH = 8;
export const REQUIRED_DIGITS = [8,1,0,2,5,3];
export const SHARE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
export const USERNAME_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Calculate maximum possible codes based on digit length and required digits
export const MAX_TOTAL_CODES = calculateCombinationsWithAllDigits(DIGIT_LENGTH, REQUIRED_DIGITS);

// Calculate total possible combinations with required digits
export function calculateCombinationsWithAllDigits(length, digits) {
    if (length < digits.length) return 0;

    // Calculate using dynamic programming
    // dp[i][mask] represents number of ways to fill i positions using digits from mask
    const dp = Array(length + 1).fill().map(() => Array(1 << digits.length).fill(0));
    dp[0][0] = 1;

    // For each position
    for (let i = 0; i < length; i++) {
        // For each current state of used digits
        for (let mask = 0; mask < (1 << digits.length); mask++) {
            if (dp[i][mask] === 0) continue;
            
            // Try using each available digit
            for (let digit of digits) {
                const digitIndex = digits.indexOf(digit);
                const newMask = mask | (1 << digitIndex);
                dp[i + 1][newMask] += dp[i][mask];
            }
        }
    }

    // Sum all states where all digits are used (mask has all bits set)
    const fullMask = (1 << digits.length) - 1;
    return dp[length][fullMask];
}

// Generate codes ensuring all required digits are used
export function* generateValidCodes(length, digits, startIndex) {
    // Sort digits to ensure consistent ordering
    const sortedDigits = [...digits].sort((a, b) => a - b);
    const code = new Array(length).fill(sortedDigits[0]);
    let count = 0;
    
    while (true) {
        // Check if current code is valid (contains all digits)
        const usedDigits = new Set(code);
        if (sortedDigits.every(digit => usedDigits.has(digit))) {
            if (count >= startIndex) {
                yield code.join("");
            }
            count++;
        }
        
        // Generate next code
        let pos = length - 1;
        while (pos >= 0) {
            const currentIndex = sortedDigits.indexOf(code[pos]);
            if (currentIndex < sortedDigits.length - 1) {
                code[pos] = sortedDigits[currentIndex + 1];
                break;
            }
            code[pos] = sortedDigits[0];
            pos--;
        }
        if (pos < 0) break;
    }
}

export function generateCodesFromRanges(ranges) {
    if (!ranges) return [];
    const codes = [];
    ranges.split(',').forEach(range => {
        const [start, end] = range.split('-').map(Number);
        const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, start);
        
        // Generate codes for this range
        for (let i = start; i <= end; i++) {
            const {value, done} = generator.next();
            if (done) break;
            codes.push(value);
        }
    });
    return codes;
}

export function getTotalCodesFromRanges(ranges) {
    if (!ranges) return 0;
    return ranges.split(',').reduce((total, range) => {
        const [start, end] = range.split('-').map(Number);
        return total + (end - start + 1);
    }, 0);
}

export function formatTimeLeft(milliseconds) {
    const seconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        return `${days}d ${remainingHours}h ${remainingMinutes}m`;
    } else if (hours > 0) {
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}

// Username cache management
export function getCachedUsername(discordId) {
    const cache = localStorage.getItem(`username_${discordId}`);
    if (cache) {
        const { username, timestamp } = JSON.parse(cache);
        if (Date.now() - timestamp < USERNAME_CACHE_DURATION) {
            return username;
        }
        // Cache expired, remove it
        localStorage.removeItem(`username_${discordId}`);
    }
    return null;
}

export function cacheUsername(discordId, username) {
    localStorage.setItem(`username_${discordId}`, JSON.stringify({
        username,
        timestamp: Date.now()
    }));
}

// Clean Discord ID input
export function cleanDiscordId(input) {
    // Remove <@>, <@!, and any non-numeric characters
    return input.replace(/[<@!>]/g, '').replace(/\D/g, '');
}

// Message handling
const activeMessages = new Map(); // message -> {element, count}
const messageQueue = [];
let isProcessingQueue = false;

export function showFloatingMessage(message, type = 'info') {
    // Check if this message is already being displayed
    if (activeMessages.has(message)) {
        const { element, count } = activeMessages.get(message);
        const newCount = count + 1;
        element.textContent = `${message} (×${newCount})`;
        activeMessages.set(message, { element, count: newCount });
        return;
    }

    // Queue the new message
    messageQueue.push({ message, type });
    processMessageQueue();
}

async function processMessageQueue() {
    if (isProcessingQueue || messageQueue.length === 0) return;
    isProcessingQueue = true;

    let container = document.querySelector('.error-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'error-container';
        document.body.appendChild(container);
    }

    while (messageQueue.length > 0) {
        const { message, type } = messageQueue.shift();
        
        // Create and show the message
        const messageElement = document.createElement('div');
        messageElement.className = `floating-message ${type}`;
        messageElement.textContent = message;
        container.appendChild(messageElement);

        // Track the active message
        activeMessages.set(message, { element: messageElement, count: 1 });

        // Wait for animation to complete
        await new Promise(resolve => {
            messageElement.addEventListener('animationend', () => {
                activeMessages.delete(message);
                messageElement.remove();
                // Remove container if it's empty
                if (container.children.length === 0) {
                    container.remove();
                }
                resolve();
            });
        });

        // Add a small delay between messages
        if (messageQueue.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    isProcessingQueue = false;
}