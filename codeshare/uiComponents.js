import { formatTimeLeft, getTotalCodesFromRanges, showFloatingMessage, cleanDiscordId, getCachedUsername, SHARE_DURATION, DIGIT_LENGTH, REQUIRED_DIGITS, generateValidCodes } from 'https://galygious.github.io/CherryTreeInfo/codeshare/utils.js';
import { validateDiscordId, cleanExpiredShares, PANTRY_URL, BASKET_NAME } from 'https://galygious.github.io/CherryTreeInfo/codeshare/api.js';
import { showCodeManagement } from 'https://galygious.github.io/CherryTreeInfo/codeshare/codeManagement.js';

export function initializeUI(localData, apiQueue, overwriteBasket, renderTable) {
    const shareButton = document.getElementById("createShare");
    const refreshButton = document.getElementById("refresh");
    const discordInput = document.getElementById("discordId");
    const createCustomShareButton = document.getElementById('createCustomShare');

    // Input validation - only check format, not API
    discordInput.addEventListener('input', () => {
        const rawValue = discordInput.value.trim();
        const cleanValue = cleanDiscordId(rawValue);
        
        // Update input with cleaned value if it's different
        if (cleanValue !== rawValue) {
            discordInput.value = cleanValue;
        }

        // Discord IDs are numeric and typically 17-20 digits
        const isValidFormat = /^\d{17,20}$/.test(cleanValue);
        
        if (cleanValue && !isValidFormat) {
            showFloatingMessage("Invalid Discord ID format", 'error');
        }
        // Enable/disable button based on format only
        shareButton.disabled = !isValidFormat;
    });

    // Add event listener for custom share creation
    createCustomShareButton.addEventListener('click', () => {
        showCodeManagement(null, localData, true);
    });

    // Share management functions
    window.releaseShare = async (shareId) => {
        const share = localData.shares.find(s => s.i === shareId);
        if (!share) return;

        // Remove the share from local data
        localData.shares = localData.shares.filter(s => s.i !== shareId);
        renderTable(localData.shares);

        // Update the database
        await overwriteBasket(localData);
        showFloatingMessage("Code range released successfully", 'success');
    };

    window.confirmShare = async (shareId) => {
        const share = localData.shares.find(s => s.i === shareId);
        if (!share) return;

        // Mark the share as confirmed
        share.c = true;
        renderTable(localData.shares);

        // Update the database
        await overwriteBasket(localData);
        showFloatingMessage("Code range confirmed successfully", 'success');
    };

    window.unconfirmShare = async (shareId) => {
        const share = localData.shares.find(s => s.i === shareId);
        if (!share) return;

        // Check if user has any active unconfirmed shares
        const discordId = share.d;
        const now = Date.now();
        const hasActiveShare = localData.shares.some(s =>
            (s.d === discordId) &&
            !(s.c || s.confirmed) &&
            (s.e || s.expiration) > now
        );

        if (hasActiveShare) {
            const username = await validateDiscordId(discordId).then(result => result.username);
            showFloatingMessage(`${username} has an active share. Delete active share before unconfirming.`, 'error');
            return;
        }

        // Mark the share as unconfirmed and reset expiration
        share.c = false;
        share.e = Date.now() + SHARE_DURATION;
        await renderTable(localData.shares);

        // Update the database
        await overwriteBasket(localData);
        showFloatingMessage("Code range unconfirmed successfully", 'success');
    };

    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            showFloatingMessage("Copied to clipboard!", 'success');
        }).catch(err => {
            console.error('Failed to copy:', err);
            showFloatingMessage("Failed to copy to clipboard", 'error');
        });
    };

    // Event listeners
    shareButton.addEventListener("click", () => createShare(localData, apiQueue, renderTable, shareButton, discordInput));
    refreshButton.addEventListener("click", () => fetchBasket(localData, apiQueue, renderTable, shareButton));
    document.getElementById('showConfirmed').addEventListener('change', async () => {
        await renderTable(localData.shares);
    });

    // Initialize page
    console.log('[Init] Starting application');
    fetchBasket(localData, apiQueue, renderTable, shareButton);

    // Timer update loop
    setInterval(async () => {
        await renderTable(localData.shares);
        await removeExpiredShares(localData, apiQueue, renderTable);
    }, 1000);
}

export async function renderTable(shares) {
    const shareTable = document.getElementById("shareTable");
    shares = Array.isArray(shares) ? shares : [];
    if (!shareTable) {
        console.error("[Render] Error: shareTable element not found in the DOM.");
        return;
    }

    const showConfirmed = document.getElementById('showConfirmed').checked;
    // Filter shares based on confirmation status
    shares = shares.filter(share => showConfirmed ? (share.c || share.confirmed) : !(share.c || share.confirmed));

    // First, get all unique Discord IDs that need usernames
    const uniqueDiscordIds = [...new Set(shares.map(share => share.d || share.discord_id))];
    
    // Fetch usernames for all IDs
    const usernamePromises = uniqueDiscordIds.map(async id => {
        let username = getCachedUsername(id);
        if (!username) {
            const validation = await validateDiscordId(id);
            username = validation.valid ? validation.username : id;
        }
        return [id, username];
    });

    // Wait for all username fetches to complete
    const usernames = new Map(await Promise.all(usernamePromises));

    shareTable.innerHTML = shares.length
        ? shares.map(share => {
            const timeLeft = Math.max(0, (share.e || share.expiration) - Date.now());
            const discordId = share.d || share.discord_id;
            const shareId = share.i || share.share_id;
            const ranges = share.r || share.ranges;
            const isConfirmed = share.c || share.confirmed;
            const username = usernames.get(discordId) || discordId;
            
            return `
                <tr>
                    <td>
                        <a href="#" onclick="copyToClipboard('<@${discordId}>'); return false;" style="color: #66a0ff; text-decoration: none;">
                            ${username}
                        </a>
                    </td>
                    <td>
                        <a href="#" onclick="copyCodes('${shareId}'); return false;" style="color: #66a0ff; text-decoration: none;">
                            ${getTotalCodesFromRanges(ranges)} codes (${ranges})
                        </a>
                    </td>
                    <td>${formatTimeLeft(timeLeft)}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="square-button release-button"
                                onclick="releaseShare('${shareId}')"
                                title="Release">✕</button>
                            ${isConfirmed
                                ? `<button class="square-button confirm-button"
                                    onclick="unconfirmShare('${shareId}')"
                                    title="Unconfirm">↺</button>`
                                : `<button class="square-button confirm-button"
                                    onclick="confirmShare('${shareId}')"
                                    title="Confirm">✓</button>`
                            }
                        </div>
                    </td>
                </tr>
            `;
        }).join("")
        : `<tr><td colspan="4">No ${showConfirmed ? 'confirmed' : 'active'} shares.</td></tr>`;
}

async function createShare(localData, apiQueue, renderTable, shareButton, discordInput) {
    console.log('[Create] Creating new 10-minute share');
    shareButton.disabled = true;
    const discordId = cleanDiscordId(discordInput.value.trim());
    console.log('[Discord] Cleaned ID:', discordId);

    if (!discordId) {
        showFloatingMessage("Please enter a Discord User ID", 'error');
        shareButton.disabled = false;
        return;
    }

    // Validate Discord ID first
    showFloatingMessage("Validating Discord ID...", 'info');
    const discordValidation = await validateDiscordId(discordId);

    if (!discordValidation.valid) {
        showFloatingMessage(discordValidation.error, 'error');
        shareButton.disabled = false;
        return;
    }

    // Check if user has an unconfirmed active share
    const now = Date.now();
    const existingUnconfirmedShare = localData.shares.find(share =>
        (share.d === discordId) && // Only check new format
        (share.e > now) && // Only check new format
        !share.c // Only check new format
    );
    
    if (existingUnconfirmedShare) {
        showFloatingMessage(`${discordValidation.username} already has an active unconfirmed share`, 'error');
        shareButton.disabled = false;
        return;
    }

    // Validate requested code count
    showFloatingMessage("Validating code count...", 'info');
    const requestedCount = parseInt(document.getElementById('codeCount').value) || 1;

    if (requestedCount < 1) {
        showFloatingMessage("Please enter a valid number of codes", 'error');
        shareButton.disabled = false;
        return;
    }

    // Generate codes
    const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, 0);
    let count = 0;
    let codes = [];
    while (count < requestedCount) {
        const { value, done } = generator.next();
        if (done) break;
        codes.push(value);
        count++;
    }

    // Create range from generated codes
    const range = `0-${requestedCount - 1}`;

    const newShare = {
        i: Date.now().toString(),
        d: discordId,
        r: range,
        e: Date.now() + SHARE_DURATION,
        c: false
    };

    try {
        // Only send the new share for the PUT request since it's an append operation
        await apiQueue.enqueue({
            url: `${PANTRY_URL}/basket/${BASKET_NAME}`,
            options: {
                method: "PUT",
                body: JSON.stringify({ shares: [newShare] })
            }
        });
        console.log("[Create] Share added successfully");
        localData.shares.push(newShare);
        discordInput.value = ''; // Clear input after successful creation
    } catch (err) {
        console.error("[Create] Error:", err);
        showFloatingMessage("Failed to create share", 'error');
    }

    shareButton.disabled = false;
    await renderTable(localData.shares);
}

async function fetchBasket(localData, apiQueue, renderTable, shareButton) {
    console.log('[Fetch] Getting basket contents');
    
    // Check if there's already a refresh in queue
    if (apiQueue.hasRefreshInQueue()) {
        console.log('[Fetch] Refresh already queued, skipping');
        showFloatingMessage("Update already in progress...", 'info');
        return;
    }

    try {
        const data = await apiQueue.enqueue({
            url: `${PANTRY_URL}/basket/${BASKET_NAME}`,
            options: {
                method: "GET"
            }
        });

        console.log('[Fetch] Current basket data:', data);
        const cleanedData = cleanExpiredShares(data);
        console.log('[Fetch] Cleaned data:', cleanedData);
        
        if (cleanedData.updated) {
            console.log('[Fetch] Expired shares found, updating basket');
            await overwriteBasket(cleanedData.data);
        }

        localData = cleanedData.data;
        await renderTable(localData.shares);
        shareButton.disabled = false;
    } catch (err) {
        console.error("[Fetch] Error:", err);
    }
}

async function removeExpiredShares(localData, apiQueue, renderTable) {
    // Skip if we're already processing expired shares
    if (apiQueue.removingExpiredShares) return;

    const now = Date.now();
    if (!Array.isArray(localData.shares)) {
        localData.shares = [];
        return;
    }

    const expiredShares = localData.shares.filter(share =>
        !(share.c || share.confirmed) && // Don't count confirmed shares as expired
        (share.e || share.expiration) <= now
    );
    if (expiredShares.length === 0) return;

    console.log('[Remove] Found expired shares:', expiredShares.length);
    const validShares = localData.shares.filter(share =>
        (share.c || share.confirmed) || // Keep confirmed shares
        (share.e || share.expiration) > now // Keep unexpired shares
    );
    localData.shares = validShares;
    renderTable(localData.shares);

    // If there's already a request to remove expired shares, remove it as this one will handle those changes
    if (apiQueue.hasExpiredShareRemovalInQueue()) {
        apiQueue.removeExpiredShareRequest();
    }

    // Mark that we're processing expired shares
    apiQueue.removingExpiredShares = true;

    try {
        await apiQueue.enqueue({
            url: `${PANTRY_URL}/basket/${BASKET_NAME}`,
            options: {
                method: "POST",
                body: JSON.stringify({ shares: validShares })
            }
        });
    } catch (err) {
        console.error("[Remove] Error:", err);
    } finally {
        // Clear the flag when we're done
        apiQueue.removingExpiredShares = false;
    }
}