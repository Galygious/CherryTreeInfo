import {
    DIGIT_LENGTH,
    REQUIRED_DIGITS,
    generateValidCodes,
    generateCodesFromRanges,
    showFloatingMessage,
    SHARE_DURATION,
    MAX_TOTAL_CODES,
    cleanDiscordId
} from 'https://galygious.github.io/CherryTreeInfo/codeshare/utils.js';
import { APIQueue, PANTRY_URL, BASKET_NAME, validateDiscordId, cleanExpiredShares, overwriteBasket } from 'https://galygious.github.io/CherryTreeInfo/codeshare/api.js';

// Initialize constants
const SHARE_DURATION_VALUE = SHARE_DURATION;

let currentShareId = null;
let isCustomShare = false;
let pendingChanges = false;
let originalShare = null;
let unusedCodes = new Set(); // Track codes that weren't used in operations

// DOM Elements
const codeModal = document.getElementById('codeModal');
const codeInput = document.getElementById('codeInput');
const validationSummary = document.getElementById('validationSummary');
const shareRanges = document.getElementById('shareRanges');
const shareCodeCount = document.getElementById('shareCodeCount');
const modalDiscordId = document.getElementById('modalDiscordId');
const modalDiscordValidation = document.getElementById('modalDiscordValidation');
const customShareFields = document.getElementById('customShareFields');
const addBulkCodesBtn = document.getElementById('addBulkCodes');
const removeBulkCodesBtn = document.getElementById('removeBulkCodes');

export function initializeCodeManagement(localData, apiQueue, overwriteBasket, renderTable) {
    // Modal Discord ID validation
    modalDiscordId.addEventListener('input', async () => {
        const rawValue = modalDiscordId.value.trim();
        const cleanValue = cleanDiscordId(rawValue);
        
        if (cleanValue !== rawValue) {
            modalDiscordId.value = cleanValue;
        }

        const isValidFormat = /^\d{17,20}$/.test(cleanValue);
        if (!cleanValue) {
            modalDiscordValidation.textContent = '';
            modalDiscordValidation.className = 'validation-message';
        } else if (!isValidFormat) {
            modalDiscordValidation.textContent = 'Invalid Discord ID format';
            modalDiscordValidation.className = 'validation-message error';
        } else {
            modalDiscordValidation.textContent = 'Validating...';
            modalDiscordValidation.className = 'validation-message';
            
            const validation = await validateDiscordId(cleanValue);
            if (validation.valid) {
                modalDiscordValidation.textContent = validation.username;
                modalDiscordValidation.className = 'validation-message success';
            } else {
                modalDiscordValidation.textContent = validation.error;
                modalDiscordValidation.className = 'validation-message error';
            }
        }
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === codeModal) {
            closeModal();
        }
    };

    // Close modal when clicking X
    document.querySelector('.close-modal').onclick = closeModal;

    // Store references for bulk operations
    const bulkOpsContext = { localData, apiQueue, overwriteBasket, renderTable };

    // Code input validation
    let validationTimeout;
    codeInput.addEventListener('input', () => {
        if (validationTimeout) {
            clearTimeout(validationTimeout);
        }
        validationTimeout = setTimeout(() => {
            const inputText = codeInput.value.trim();
            if (inputText) {
                const codes = inputText.split('\n')
                    .map(code => code.trim())
                    .filter(code => code);
                const validationResults = validateInputCodes(codes, localData);
                updateValidationSummary(validationResults);
            } else {
                validationSummary.classList.remove('visible');
            }
        }, 300);
    });

    // Make functions globally available
    window.closeModal = closeModal;
    window.toggleCodeSelection = toggleCodeSelection;
    window.selectAllCodes = selectAllCodes;
    window.deselectAllCodes = deselectAllCodes;
    window.addBulkCodes = () => addBulkCodes(bulkOpsContext);
    window.removeBulkCodes = () => removeBulkCodes(bulkOpsContext);
    window.removeSelectedCodes = () => removeSelectedCodes(bulkOpsContext);
    window.copyCodes = (shareId) => {
        // Get existing share
        const share = localData.shares.find(s => s.i === shareId || s.share_id === shareId);
        if (!share) return;
        
        // Set isCustomShare to false since we're editing an existing share
        isCustomShare = false;
        showCodeManagement(shareId, localData, false);
    };
    window.saveChanges = () => saveChanges(localData, apiQueue, overwriteBasket, renderTable);
    window.discardChanges = discardChanges;
}

function closeModal() {
    if (pendingChanges) {
        if (!confirm("You have unsaved changes. Are you sure you want to discard them?")) {
            return;
        }
    }

    codeModal.style.display = "none";
    currentShareId = null;
    isCustomShare = false;
    pendingChanges = false;
    originalShare = null;
    
    // Clear inputs
    codeInput.value = '';
    codeInput.disabled = false;
    modalDiscordId.value = '';
    validationSummary.innerHTML = '';
    validationSummary.classList.remove('visible');
    modalDiscordValidation.textContent = '';
    modalDiscordValidation.className = 'validation-message';
    
    // Reset UI
    customShareFields.style.display = 'none';
    document.querySelector('.share-preview').classList.remove('changes-pending');
}

function addBulkCodes(context) {
    const { localData } = context;
    const inputText = codeInput.value.trim();
    if (!inputText) {
        showFloatingMessage("Please enter codes to add", 'error');
        return;
    }

    const codes = inputText.split('\n')
        .map(code => code.trim())
        .filter(code => code);

    // Validate codes
    const validationResults = validateInputCodes(codes, localData);
    const validCodes = validationResults.filter(r => r.isValid).map(r => r.code);
    const invalidCodes = validationResults.filter(r => !r.isValid).map(r => r.code);

    if (validCodes.length === 0) {
        showFloatingMessage("No valid codes to add", 'error');
        return;
    }

    // Add valid codes
    const existingRanges = originalShare.r || originalShare.ranges || '';
    const positions = findCodePositions(validCodes, existingRanges);
    if (positions.length > 0) {
        updateShareWithNewCodes(positions, existingRanges);
        
        // Update text area to show only invalid codes
        if (invalidCodes.length > 0) {
            codeInput.value = invalidCodes.join('\n');
            showFloatingMessage(`${invalidCodes.length} invalid codes remain in the text area`, 'error');
        } else {
            codeInput.value = '';
        }
        
        showFloatingMessage(`Added ${validCodes.length} codes successfully`, 'success');
    }
}

function removeBulkCodes(context) {
    const { localData } = context;
    const inputText = codeInput.value.trim();
    if (!inputText) {
        showFloatingMessage("Please enter codes to remove", 'error');
        return;
    }

    const codes = inputText.split('\n')
        .map(code => code.trim())
        .filter(code => code);

    // Get current codes
    const currentCodes = generateCodesFromRanges(originalShare.r || originalShare.ranges);
    const validRemovals = codes.filter(code => currentCodes.includes(code));
    const invalidRemovals = codes.filter(code => !currentCodes.includes(code));

    if (validRemovals.length === 0) {
        showFloatingMessage("No valid codes to remove", 'error');
        return;
    }

    // Remove valid codes
    const remainingCodes = currentCodes.filter(code => !validRemovals.includes(code));
    if (remainingCodes.length === 0) {
        showFloatingMessage("Cannot remove all codes from a share", 'error');
        return;
    }

    // Update ranges with remaining codes
    const currentRanges = originalShare.r || originalShare.ranges || '';
    const positions = findCodePositions(remainingCodes, currentRanges);
    updateShareWithNewCodes(positions, currentRanges);

    // Update text area to show only invalid removals
    if (invalidRemovals.length > 0) {
        codeInput.value = invalidRemovals.join('\n');
        showFloatingMessage(`${invalidRemovals.length} codes not found in current selection`, 'error');
    } else {
        codeInput.value = '';
    }

    showFloatingMessage(`Removed ${validRemovals.length} codes successfully`, 'success');
}

function removeSelectedCodes(context) {
    const { localData } = context;
    const selectedElements = document.querySelectorAll('.code-item.selected');
    if (selectedElements.length === 0) {
        showFloatingMessage("No codes selected to remove", 'error');
        return;
    }

    const selectedCodes = Array.from(selectedElements)
        .map(element => element.querySelector('span').textContent);

    // Get current codes and filter out selected ones
    const currentCodes = generateCodesFromRanges(originalShare.r || originalShare.ranges);
    const remainingCodes = currentCodes.filter(code => !selectedCodes.includes(code));

    if (remainingCodes.length === 0) {
        showFloatingMessage("Cannot remove all codes from a share", 'error');
        return;
    }

    // Update ranges with remaining codes
    const currentRanges = originalShare.r || originalShare.ranges || '';
    const positions = findCodePositions(remainingCodes, currentRanges);
    updateShareWithNewCodes(positions, currentRanges);
    showFloatingMessage(`Removed ${selectedCodes.length} codes successfully`, 'success');
}

export function showCodeManagement(shareId = null, localData, customShare = false) {
    currentShareId = shareId;
    pendingChanges = false;
    isCustomShare = customShare;
    unusedCodes.clear();
    
    if (customShare) {
        // Show custom share fields
        customShareFields.style.display = 'block';
        document.getElementById('modalTitle').textContent = 'Create Custom Share';
        // Initialize empty share
        originalShare = {
            i: Date.now().toString(),
            r: '',
            e: Date.now() + SHARE_DURATION_VALUE,
            c: false
        };
    } else {
        // Hide custom share fields
        customShareFields.style.display = 'none';
        document.getElementById('modalTitle').textContent = 'Edit Share';
        // Get existing share
        const share = localData.shares.find(s => s.i === shareId || s.share_id === shareId);
        if (!share) return;
        // Store original share state
        originalShare = { ...share };
    }

    // Update share preview
    updateSharePreview(originalShare);

    // Reset code input
    codeInput.value = '';
    validationSummary.classList.remove('visible');
    
    // Show modal
    codeModal.style.display = "block";
    
    // For custom shares, show message about adding codes
    if (customShare) {
        showFloatingMessage("Add codes using the bulk operations or select codes to remove", 'info');
    }
}

function updateSharePreview(share) {
    const codes = generateCodesFromRanges(share.r || share.ranges);
    shareCodeCount.textContent = `${codes.length} codes`;
    shareRanges.textContent = share.r || share.ranges;

    // Generate codes and populate list with validation status and selection state
    const codeList = document.getElementById('codeList');
    codeList.innerHTML = codes.map(code => {
        const digits = code.split('').map(Number);
        const hasRequiredDigits = REQUIRED_DIGITS.every(digit => digits.includes(digit));
        const isValid = code.length === DIGIT_LENGTH && hasRequiredDigits;
        
        return `
            <div class="code-item ${isValid ? 'valid' : 'invalid'}" onclick="toggleCodeSelection(this)">
                <input type="checkbox">
                <span>${code}</span>
                ${!isValid ? `<div class="validation-errors">Invalid vault code</div>` : ''}
            </div>
        `;
    }).join('');

    // Track changes
    if (originalShare) {
        const hasChanges = share.r !== originalShare.r;
        pendingChanges = hasChanges || (isCustomShare && share.r);
        document.querySelector('.share-preview').classList.toggle('changes-pending', pendingChanges);
    }
}

function validateInputCodes(codes, localData) {
    // Check for duplicate codes in all shares (active and historical)
    const existingCodes = new Set();
    if (localData) {
        const now = Date.now();
        
        // Get all shares that are either:
        // 1. Active (not expired) and unconfirmed
        // 2. Confirmed (historical)
        const relevantShares = localData.shares.filter(share =>
            ((!share.c && share.e > now) || // Active unconfirmed shares
             share.c) // Confirmed shares (historical)
        );
        
        for (const share of relevantShares) {
            const shareCodes = generateCodesFromRanges(share.r);
            shareCodes.forEach(code => {
                existingCodes.add(code);
                console.log(`[Validation] Found existing code: ${code} in share ${share.i} (${share.c ? 'confirmed' : 'active'})`);
            });
        }
    }
    
    return codes.map(code => {
        // Check length
        const isValidLength = code.length === DIGIT_LENGTH;
        
        // Check required digits
        const digits = code.split('').map(Number);
        const hasRequiredDigits = REQUIRED_DIGITS.every(digit => digits.includes(digit));
        
        // Check if code would be generated by our generator
        let isGeneratable = false;
        if (isValidLength && hasRequiredDigits) {
            const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, 0);
            let result;
            let position = 0;
            
            while (!isGeneratable && position < MAX_TOTAL_CODES) {
                result = generator.next();
                if (result.done) break;
                if (result.value === code) {
                    isGeneratable = true;
                    break;
                }
                position++;
            }
        }

        // Check for duplicates
        const isDuplicate = existingCodes.has(code);
        
        // Get detailed duplicate information if it exists
        let duplicateInfo = '';
        if (isDuplicate && localData) {
            const duplicateShare = localData.shares.find(share => {
                const shareCodes = generateCodesFromRanges(share.r);
                return shareCodes.includes(code);
            });
            if (duplicateShare) {
                duplicateInfo = duplicateShare.c
                    ? 'Code has been previously confirmed'
                    : 'Code is currently in use by an active share';
            }
        }

        return {
            code,
            isValid: isValidLength && hasRequiredDigits && isGeneratable && !isDuplicate,
            errors: [
                !isValidLength && `Must be ${DIGIT_LENGTH} digits`,
                !hasRequiredDigits && `Must contain all required digits: ${REQUIRED_DIGITS.join(', ')}`,
                (isValidLength && hasRequiredDigits && !isGeneratable) && 'Not a valid vault code',
                isDuplicate && (duplicateInfo || 'Code is already in use')
            ].filter(Boolean)
        };
    });
}

function updateValidationSummary(validationResults) {
    const validCount = validationResults.filter(r => r.isValid).length;
    const invalidCount = validationResults.length - validCount;

    validationSummary.innerHTML = `
        <div>Valid codes: ${validCount}</div>
        ${invalidCount > 0 ? `<div>Invalid codes: ${invalidCount}</div>` : ''}
    `;
    validationSummary.classList.add('visible');
}

function findCodePositions(codes, existingRanges = '') {
    const positions = [];
    const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, 0);
    const allGeneratedCodes = [];
    let position = 0;
    
    // Generate all possible codes first
    while (true) {
        const {value, done} = generator.next();
        if (done) break;
        allGeneratedCodes.push({ code: value, position });
        position++;
        if (position >= MAX_TOTAL_CODES) break;
    }

    // Find positions of input codes
    const codePositions = [];
    for (const code of codes) {
        const match = allGeneratedCodes.find(gc => gc.code === code);
        if (match) {
            codePositions.push(match.position);
        }
    }

    // If no existing ranges, return positions directly
    if (!existingRanges) {
        return codePositions;
    }

    // Find available gaps that can accommodate our codes
    const gaps = findAvailableGaps(existingRanges, codePositions.length);
    
    // Map code positions to gap positions
    let usedPositions = 0;
    for (const gap of gaps) {
        const remainingCodes = codePositions.length - usedPositions;
        const codesInGap = Math.min(gap.count, remainingCodes);
        
        for (let i = 0; i < codesInGap; i++) {
            positions.push(gap.start + i);
            usedPositions++;
        }
        
        if (usedPositions >= codePositions.length) break;
    }

    return positions;
}

function updateShareWithNewCodes(positions, existingRanges = '') {
    if (positions.length === 0) return;

    // Parse existing ranges and new positions
    const existingRangesArray = parseRanges(existingRanges);
    const newPositions = new Set(positions);
    
    // Combine existing ranges with new positions
    const allPositions = new Set();
    
    // Add positions from existing ranges
    existingRangesArray.forEach(range => {
        for (let i = range.start; i <= range.end; i++) {
            allPositions.add(i);
        }
    });
    
    // Add new positions
    newPositions.forEach(pos => allPositions.add(pos));
    
    // Convert back to array and sort
    const sortedPositions = Array.from(allPositions).sort((a, b) => a - b);
    
    // Create optimized ranges
    const ranges = [];
    let rangeStart = sortedPositions[0];
    let rangeEnd = sortedPositions[0];

    for (let i = 1; i < sortedPositions.length; i++) {
        if (sortedPositions[i] === rangeEnd + 1) {
            rangeEnd = sortedPositions[i];
        } else {
            ranges.push(`${rangeStart}-${rangeEnd}`);
            rangeStart = sortedPositions[i];
            rangeEnd = sortedPositions[i];
        }
    }
    ranges.push(`${rangeStart}-${rangeEnd}`);

    // Update share
    originalShare.r = ranges.join(',');
    updateSharePreview(originalShare);
    pendingChanges = true;
    document.querySelector('.share-preview').classList.toggle('changes-pending', true);
}

function toggleCodeSelection(element) {
    if (element.classList.contains('invalid')) return;
    element.classList.toggle('selected');
    element.querySelector('input').checked = element.classList.contains('selected');
    
    // Track changes when in remove mode
    if (currentMode === 'remove' && !isCustomShare) {
        const hasSelectedCodes = document.querySelectorAll('.code-item.selected').length > 0;
        pendingChanges = hasSelectedCodes;
        document.querySelector('.share-preview').classList.toggle('changes-pending', hasSelectedCodes);
    }
}

function selectAllCodes() {
    document.querySelectorAll('.code-item:not(.invalid)').forEach(item => {
        item.classList.add('selected');
        item.querySelector('input').checked = true;
    });
    
    // Track changes when in remove mode
    if (currentMode === 'remove' && !isCustomShare) {
        const hasSelectedCodes = document.querySelectorAll('.code-item.selected').length > 0;
        pendingChanges = hasSelectedCodes;
        document.querySelector('.share-preview').classList.toggle('changes-pending', hasSelectedCodes);
    }
}

function deselectAllCodes() {
    document.querySelectorAll('.code-item').forEach(item => {
        item.classList.remove('selected');
        item.querySelector('input').checked = false;
    });
    
    // Track changes when in remove mode
    if (currentMode === 'remove' && !isCustomShare) {
        pendingChanges = false;
        document.querySelector('.share-preview').classList.remove('changes-pending');
    }
}

async function confirmCodeAction(localData, apiQueue, overwriteBasket, renderTable) {
    const inputText = codeInput.value.trim();
    if (!inputText) {
        updateSharePreview(originalShare);
        return;
    }

    console.log('[Confirm] Starting code action:', {
        mode: currentMode,
        isCustomShare,
        inputText
    });

    // Create a temporary share for preview
    const previewShare = { ...originalShare };
    console.log('[Confirm] Original share:', originalShare);
    
    if (currentMode === 'add') {
        // Preview adding codes
        const newCodes = inputText.split('\n')
            .map(code => code.trim())
            .filter(code => {
                const digits = code.split('').map(Number);
                return code.length === DIGIT_LENGTH &&
                       REQUIRED_DIGITS.every(digit => digits.includes(digit));
            });

        if (newCodes.length === 0) {
            showFloatingMessage("No valid codes to add", 'error');
            return;
        }

        // Find positions of new codes using existing ranges
        const shareRanges = previewShare.r || previewShare.ranges || '';
        console.log('[Position] Finding positions for codes with existing ranges:', shareRanges);
        const positions = findCodePositions(newCodes, shareRanges);
        
        console.log('[Position] Found positions:', positions);
        if (positions.length === 0) {
            console.error('[Position] No valid positions found');
            showFloatingMessage("No valid vault codes found", 'error');
            return;
        }

        // Handle range creation/modification
        console.log('[Range] Processing positions:', positions);
        
        // For custom shares or empty ranges, create a direct range from positions
        if (isCustomShare || !previewShare.r) {
            console.log('[Range] Creating new range for', isCustomShare ? 'custom share' : 'empty range');
            
            if (positions.length === 0) {
                console.error('[Range] No valid positions found');
                showFloatingMessage("No valid code positions found", 'error');
                return;
            }

            const start = Math.min(...positions);
            const end = Math.max(...positions);
            console.log('[Range] Creating range:', { start, end });
            
            previewShare.r = `${start}-${end}`;
            console.log('[Range] Created range:', previewShare.r);
            
            // Verify code count doesn't exceed maximum
            const totalCodes = positions.length;
            if (totalCodes > 100) {
                showFloatingMessage("Cannot exceed 100 codes per share", 'error');
                return;
            }

            // Update preview and return
            originalShare.r = previewShare.r;
            updateSharePreview(originalShare);
            pendingChanges = true;
            document.querySelector('.share-preview').classList.toggle('changes-pending', true);
            
            // Clear input after successful action
            codeInput.value = '';
            validationSummary.classList.remove('visible');
            return;
        }
        
        // Initialize ranges array
        const rangeList = [];
        
        // Parse existing ranges if any
        const parsedRanges = (previewShare.r || previewShare.ranges || '').split(',').filter(r => r);
        if (parsedRanges.length > 0) {
            parsedRanges.forEach(range => {
                const [start, end] = range.split('-').map(Number);
                rangeList.push({ start, end });
            });
        }

        // Add new positions
        positions.forEach(pos => {
            let merged = false;
            
            // Try to merge with existing ranges
            for (let i = 0; i < rangeList.length; i++) {
                const range = rangeList[i];
                
                // Position is within or adjacent to range
                if (pos >= range.start - 1 && pos <= range.end + 1) {
                    range.start = Math.min(range.start, pos);
                    range.end = Math.max(range.end, pos);
                    merged = true;
                    break;
                }
            }
            
            // If position couldn't be merged, create new range
            if (!merged) {
                rangeList.push({ start: pos, end: pos });
            }
        });

        // Sort ranges and merge overlapping ones
        rangeList.sort((a, b) => a.start - b.start);
        const mergedRanges = [];
        
        if (rangeList.length > 0) {
            let currentRange = rangeList[0];
            for (let i = 1; i < rangeList.length; i++) {
                if (rangeList[i].start <= currentRange.end + 1) {
                    // Ranges overlap or are adjacent, merge them
                    currentRange.end = Math.max(currentRange.end, rangeList[i].end);
                } else {
                    // Ranges don't overlap, start new range
                    mergedRanges.push(`${currentRange.start}-${currentRange.end}`);
                    currentRange = rangeList[i];
                }
            }
            mergedRanges.push(`${currentRange.start}-${currentRange.end}`);
        } else {
            // If no existing ranges, create a new range from positions
            const start = Math.min(...positions);
            const end = Math.max(...positions);
            mergedRanges.push(`${start}-${end}`);
        }

        // Update share with merged ranges
        previewShare.r = mergedRanges.join(',');
    } else {
        // Preview removing codes
        const selectedElements = document.querySelectorAll('.code-item.selected');
        if (selectedElements.length === 0) {
            showFloatingMessage("No codes selected to remove", 'error');
            return;
        }

        const selectedCodes = Array.from(selectedElements)
            .map(element => element.querySelector('span').textContent);

        // Get all codes and filter out selected ones
        const allCodes = generateCodesFromRanges(previewShare.r || previewShare.ranges);
        const remainingCodes = allCodes.filter(code => !selectedCodes.includes(code));

        if (remainingCodes.length === 0) {
            showFloatingMessage("Cannot remove all codes from a share", 'error');
            return;
        }

        // Find positions of remaining codes using existing ranges
        const currentRanges = previewShare.r || previewShare.ranges || '';
        const positions = findCodePositions(remainingCodes, currentRanges);
        
        if (positions.length === 0) {
            showFloatingMessage("Failed to process remaining codes", 'error');
            return;
        }

        // Update preview share with new positions
        updateShareWithNewCodes(positions, currentRanges);
        previewShare.r = originalShare.r;

        // Verify code count doesn't exceed maximum
        const totalCodes = positions.length;
        if (totalCodes > 100) {
            showFloatingMessage("Cannot exceed 100 codes per share", 'error');
            return;
        }
    }

    // Update originalShare with the preview changes
    originalShare.r = previewShare.r;
    updateSharePreview(originalShare);
    pendingChanges = true;
    document.querySelector('.share-preview').classList.toggle('changes-pending', true);
    
    // Clear input after successful action
    codeInput.value = '';
    validationSummary.classList.remove('visible');
}


async function saveChanges(localData, apiQueue, overwriteBasket, renderTable) {
    // For custom shares, require codes to be added first
    if (isCustomShare && !pendingChanges) {
        showFloatingMessage("Please add codes using the Add Codes button first", 'error');
        return;
    }

    // Check if there are any pending changes in the input
    const inputText = codeInput.value.trim();
    if (inputText) {
        // If there's input, confirm the changes first
        await confirmCodeAction(localData, apiQueue, overwriteBasket, renderTable);
    }

    // Verify we have a valid range to save
    if (!originalShare.r) {
        showFloatingMessage("No codes to save", 'error');
        return;
    }

    if (isCustomShare) {
        // Get current time once
        const now = Date.now();
        
        // Check for duplicate codes first
        const activeShares = localData.shares.filter(share =>
            !share.c && // Only check unconfirmed shares
            share.e > now // Only check active shares
        );
        
        const existingCodes = new Set();
        for (const share of activeShares) {
            const shareCodes = generateCodesFromRanges(share.r);
            shareCodes.forEach(code => existingCodes.add(code));
        }
        
        const newCodes = generateCodesFromRanges(originalShare.r);
        
        // Check code count limit
        if (newCodes.length > 100) {
            showFloatingMessage("Cannot exceed 100 codes per share", 'error');
            return;
        }

        const duplicates = newCodes.filter(code => existingCodes.has(code));
        
        if (duplicates.length > 0) {
            console.error('[Save] Found duplicate codes:', duplicates);
            showFloatingMessage(`Code ${duplicates[0]} already exists in another active share`, 'error');
            return;
        }
        
        const discordId = cleanDiscordId(modalDiscordId.value.trim());
        if (!discordId) {
            showFloatingMessage("Please enter a Discord User ID", 'error');
            return;
        }

        // Validate Discord ID
        const validation = await validateDiscordId(discordId);
        if (!validation.valid) {
            showFloatingMessage(validation.error, 'error');
            return;
        }

        // Check if user has an active unconfirmed share
        const hasActiveShare = localData.shares.some(share =>
            share.d === discordId &&
            !share.c &&
            share.e > now
        );

        if (hasActiveShare) {
            showFloatingMessage(`${validation.username} already has an active unconfirmed share`, 'error');
            return;
        }

        // Create new share with current preview state
        const newShare = {
            ...originalShare,
            d: discordId,
            r: originalShare.r
        };

        try {
            await apiQueue.enqueue({
                url: `${PANTRY_URL}/basket/${BASKET_NAME}`,
                options: {
                    method: "PUT",
                    body: JSON.stringify({ shares: [newShare] })
                }
            });
            localData.shares.push(newShare);
            await renderTable(localData.shares);
            showFloatingMessage("Custom share created successfully", 'success');
            closeModal();
        } catch (err) {
            console.error("[Create] Error:", err);
            showFloatingMessage("Failed to create custom share", 'error');
        }
    } else {
        // Update existing share
        const share = localData.shares.find(s => s.i === currentShareId || s.share_id === currentShareId);
        if (!share) return;

        // Apply changes from originalShare
        share.r = originalShare.r;

        // Update database
        try {
            await overwriteBasket(localData, apiQueue);
            await renderTable(localData.shares);
            showFloatingMessage("Share updated successfully", 'success');
            closeModal();
        } catch (err) {
            console.error("[Update] Error:", err);
            showFloatingMessage("Failed to update share", 'error');
        }
    }
}

function discardChanges() {
    if (pendingChanges) {
        if (!confirm("You have unsaved changes. Are you sure you want to discard them?")) {
            return;
        }
    }
    closeModal();
}