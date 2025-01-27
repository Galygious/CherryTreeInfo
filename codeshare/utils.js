// Constants
export const DIGIT_LENGTH = 8;
export const REQUIRED_DIGITS = [8,1,0,2,5,3];
export const SHARE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const USERNAME_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Calculate maximum possible codes based on digit length and required digits
export const MAX_TOTAL_CODES = calculateCombinationsWithAllDigits(DIGIT_LENGTH, REQUIRED_DIGITS);

// Helper function to parse range string into array of ranges
export function parseRanges(rangeStr) {
    if (!rangeStr) return [];
    return rangeStr.split(',').map(range => {
        const [start, end] = range.split('-').map(Number);
        return { start, end: end || start }; // Handle single numbers (e.g., "13" becomes "13-13")
    }).sort((a, b) => a.start - b.start); // Ensure ranges are sorted
}

// Find available gaps in existing ranges
export function findAvailableGaps(existingRanges, count) {
    if (!existingRanges || existingRanges.length === 0) return [{ start: 0, count }];
    
    const parsedRanges = parseRanges(existingRanges);
    const gaps = [];
    let currentPosition = 0;
    let remainingCount = count;
    
    // Check gap before first range
    if (parsedRanges[0].start > 0) {
        const gapSize = parsedRanges[0].start;
        const allocatedCount = Math.min(gapSize, remainingCount);
        if (allocatedCount > 0) {
            gaps.push({ start: 0, count: allocatedCount });
            remainingCount -= allocatedCount;
        }
    }
    
    // Check gaps between ranges
    for (let i = 0; i < parsedRanges.length - 1; i++) {
        if (remainingCount <= 0) break;
        
        const gapStart = parsedRanges[i].end + 1;
        const gapEnd = parsedRanges[i + 1].start - 1;
        const gapSize = gapEnd - gapStart + 1;
        
        if (gapSize > 0) {
            const allocatedCount = Math.min(gapSize, remainingCount);
            gaps.push({ start: gapStart, count: allocatedCount });
            remainingCount -= allocatedCount;
        }
    }
    
    // If we still need more positions, add them after the last range
    if (remainingCount > 0) {
        const lastRange = parsedRanges[parsedRanges.length - 1];
        gaps.push({ start: lastRange.end + 1, count: remainingCount });
    }
    
    return gaps;
}

// Helper function to validate ranges format
export function validateRanges(rangeStr) {
    if (!rangeStr) return false;
    const ranges = parseRanges(rangeStr);
    return ranges.every(range =>
        !isNaN(range.start) &&
        !isNaN(range.end) &&
        range.start <= range.end
    );
}

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
    let position = 0;
    
    while (true) {
        // Check if current code is valid (contains all digits)
        const usedDigits = new Set(code);
        if (sortedDigits.every(digit => usedDigits.has(digit))) {
            // Only yield if we've reached startIndex
            if (position >= startIndex) {
                yield code.join("");
            }
            position++;
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
    const parsedRanges = parseRanges(ranges);
    
    // Generate codes for each range
    for (const range of parsedRanges) {
        const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, range.start);
        let position = range.start;
        
        while (position <= range.end) {
            const { value, done } = generator.next();
            if (done) break;
            codes.push(value);
            position++;
        }
    }

    return codes;
}

export function getTotalCodesFromRanges(ranges) {
    if (!ranges) return 0;
    const parsedRanges = parseRanges(ranges);
    return parsedRanges.reduce((total, range) =>
        total + (range.end - range.start + 1), 0);
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