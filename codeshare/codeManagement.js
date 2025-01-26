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
let currentMode = 'add';
let isCustomShare = false;
let pendingChanges = false;
let originalShare = null;

// DOM Elements
const codeModal = document.getElementById('codeModal');
const codeInput = document.getElementById('codeInput');
const validationSummary = document.getElementById('validationSummary');
const shareRanges = document.getElementById('shareRanges');
const shareCodeCount = document.getElementById('shareCodeCount');
const modalDiscordId = document.getElementById('modalDiscordId');
const modalDiscordValidation = document.getElementById('modalDiscordValidation');
const customShareFields = document.getElementById('customShareFields');

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

    // Code input event listeners
    let validationTimeout;
    
    codeInput.addEventListener('input', () => {
        const inputText = codeInput.value.trim();
        if (!inputText) {
            // When input is cleared, show original codes
            updateSharePreview(originalShare);
            validationSummary.classList.remove('visible');
            return;
        }
        
        // Clear any pending validation
        if (validationTimeout) {
            clearTimeout(validationTimeout);
        }
        
        // Schedule validation after typing stops
        validationTimeout = setTimeout(() => {
            validateCodes();
        }, 300);
    });

    codeInput.addEventListener('paste', (e) => {
        // Allow paste event to complete, then validate
        if (validationTimeout) {
            clearTimeout(validationTimeout);
        }
        validationTimeout = setTimeout(() => {
            validateCodes();
        }, 100);
    });

    // Make functions globally available
    window.switchMode = (mode) => switchMode(mode, localData);
    window.closeModal = closeModal;
    window.toggleCodeSelection = toggleCodeSelection;
    window.selectAllCodes = selectAllCodes;
    window.deselectAllCodes = deselectAllCodes;
    window.confirmCodeAction = () => confirmCodeAction(localData, apiQueue, overwriteBasket, renderTable);
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

function switchMode(mode, localData) {
    if (pendingChanges) {
        if (!confirm("You have unsaved changes. Are you sure you want to switch modes?")) {
            return;
        }
    }

    currentMode = mode;
    document.getElementById('addMode').classList.toggle('active', mode === 'add');
    document.getElementById('removeMode').classList.toggle('active', mode === 'remove');
    
    // Update modal title and button text
    document.getElementById('modalTitle').textContent = mode === 'add' ? 'Add Codes' : 'Remove Codes';
    document.getElementById('confirmAction').textContent = mode === 'add' ? 'Add Codes' : 'Remove Selected';
    
    // Store textarea state
    const wasFocused = document.activeElement === codeInput;
    const cursorPosition = codeInput.selectionStart;
    
    // Clear input and validation
    codeInput.value = '';
    codeInput.disabled = false;
    validationSummary.innerHTML = '';
    validationSummary.classList.remove('visible');
    
    // Restore focus if needed
    if (wasFocused) {
        requestAnimationFrame(() => {
            codeInput.focus();
            codeInput.setSelectionRange(cursorPosition, cursorPosition);
        });
    }
    
    // Update placeholder text
    codeInput.placeholder = mode === 'add'
        ? "Enter codes to add (one per line)..."
        : "Enter codes to remove (one per line)...";
    
    // Reset selection state
    deselectAllCodes();
    
    // Reset changes tracking
    pendingChanges = false;
    document.querySelector('.share-preview').classList.remove('changes-pending');
    
    // Update share preview to original state
    if (!isCustomShare && originalShare) {
        updateSharePreview(originalShare);
    }
    
    validateCodes();
}

export function showCodeManagement(shareId = null, localData, customShare = false) {
    currentShareId = shareId;
    pendingChanges = false;
    isCustomShare = customShare;
    
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

    // Reset to add mode
    currentMode = 'add';
    document.getElementById('addMode').classList.add('active');
    document.getElementById('removeMode').classList.remove('active');
    
    // Update button text
    const confirmButton = document.getElementById('confirmAction');
    if (confirmButton) {
        confirmButton.textContent = 'Add Codes';
        confirmButton.disabled = false;
    }

    // Update share preview
    updateSharePreview(originalShare);

    // Reset code input
    codeInput.value = '';
    codeInput.disabled = false;
    
    // Show modal
    codeModal.style.display = "block";
    
    // For custom shares, show message about adding codes
    if (customShare) {
        showFloatingMessage("Please add codes using the Add Codes button before saving", 'info');
    }
}

function updateSharePreview(share) {
    // Store textarea state
    const wasFocused = document.activeElement === codeInput;
    const cursorPosition = codeInput.selectionStart;
    
    // Ensure textarea stays enabled
    codeInput.disabled = false;
    
    const codes = generateCodesFromRanges(share.r || share.ranges);
    shareCodeCount.textContent = `${codes.length} codes`;
    shareRanges.textContent = share.r || share.ranges;

    // Generate codes and populate list with validation status
    const codeList = document.getElementById('codeList');
    codeList.innerHTML = codes.map(code => {
        // Validate code
        const digits = code.split('').map(Number);
        const hasRequiredDigits = REQUIRED_DIGITS.every(digit => digits.includes(digit));
        const isValid = code.length === DIGIT_LENGTH && hasRequiredDigits;
        
        return `
            <div class="code-item ${isValid ? 'valid' : 'invalid'}" onclick="toggleCodeSelection(this)">
                <input type="checkbox" ${isValid ? '' : 'disabled'}>
                <span>${code}</span>
                <span class="validation-status">${isValid ? '✓' : '✕'}</span>
                ${!isValid ? `<div class="validation-errors">Invalid vault code</div>` : ''}
            </div>
        `;
    }).join('');

    // Track changes for both custom and existing shares
    if (originalShare) {
        const hasChanges = share.r !== originalShare.r;
        pendingChanges = hasChanges || (isCustomShare && share.r); // For custom shares, having any ranges means changes
        document.querySelector('.share-preview').classList.toggle('changes-pending', pendingChanges);
    }

    // Restore textarea focus and cursor position if it was focused
    if (wasFocused) {
        requestAnimationFrame(() => {
            codeInput.focus();
            codeInput.setSelectionRange(cursorPosition, cursorPosition);
        });
    }
}

function validateCodes() {
    // Store current cursor position
    const cursorPosition = codeInput.selectionStart;
    
    // Ensure textarea stays enabled
    codeInput.disabled = false;
    
    const inputText = codeInput.value.trim();
    if (!inputText) {
        validationSummary.classList.remove('visible');
        return;
    }

    const codes = inputText.split('\n')
        .map(code => code.trim())
        .filter(code => code);

    console.log('[Validate] Checking codes:', codes);
    
    // Check for duplicate codes in existing shares
    const existingCodes = new Set();
    if (isCustomShare) {
        const now = Date.now();
        const activeShares = localData.shares.filter(share =>
            !share.c && // Only check unconfirmed shares
            share.e > now // Only check active shares
        );
        
        for (const share of activeShares) {
            const shareCodes = generateCodesFromRanges(share.r);
            shareCodes.forEach(code => existingCodes.add(code));
        }
    }
    
    const validationResults = codes.map(code => {
        // Check length
        const isValidLength = code.length === DIGIT_LENGTH;
        
        // Check required digits
        const digits = code.split('').map(Number);
        const hasRequiredDigits = REQUIRED_DIGITS.every(digit => digits.includes(digit));
        
        console.log('[Validate] Code:', code, {
            length: isValidLength,
            digits: hasRequiredDigits
        });
        
        // Check if code would be generated by our generator
        let isGeneratable = false;
        if (isValidLength && hasRequiredDigits) {
            // Create a generator starting from 0 to check if this code would be generated
            const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, 0);
            let result;
            let position = 0;
            
            // Keep generating codes until we find a match or run out of codes
            while (!isGeneratable) {
                result = generator.next();
                if (result.done) break;
                if (result.value === code) {
                    isGeneratable = true;
                    break;
                }
                position++;
                // Break if we've checked more codes than theoretically possible
                if (position >= MAX_TOTAL_CODES) break;
            }
        }

        // Check for duplicates
        const isDuplicate = existingCodes.has(code);
        
        return {
            code,
            isValid: isValidLength && hasRequiredDigits && isGeneratable && !isDuplicate,
            errors: [
                !isValidLength && `Must be ${DIGIT_LENGTH} digits`,
                !hasRequiredDigits && `Must contain all required digits: ${REQUIRED_DIGITS.join(', ')}`,
                (isValidLength && hasRequiredDigits && !isGeneratable) && 'Not a valid vault code',
                isDuplicate && 'Code already exists in another active share'
            ].filter(Boolean)
        };
    });

    // Update validation summary
    const validCount = validationResults.filter(r => r.isValid).length;
    const invalidCount = validationResults.length - validCount;

    validationSummary.innerHTML = `
        <div>Valid codes: ${validCount}</div>
        ${invalidCount > 0 ? `<div>Invalid codes: ${invalidCount}</div>` : ''}
    `;
    validationSummary.classList.add('visible');

    // Update code list with validation status
    const codeList = document.getElementById('codeList');
    codeList.innerHTML = validationResults.map(result => `
        <div class="code-item ${result.isValid ? 'valid' : 'invalid'}" onclick="toggleCodeSelection(this)">
            <input type="checkbox" ${result.isValid ? '' : 'disabled'}>
            <span>${result.code}</span>
            <span class="validation-status">${result.isValid ? '✓' : '✕'}</span>
            ${!result.isValid ? `<div class="validation-errors">${result.errors.join(', ')}</div>` : ''}
        </div>
    `).join('');
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

        // Find positions of new codes
        const positions = [];
        const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, 0);
        const allGeneratedCodes = [];
        let position = 0;
        
        // Generate all possible codes first
        console.log('[Generate] Starting code generation');
        let generatedCount = 0;
        while (true) {
            const {value, done} = generator.next();
            if (done) {
                console.log('[Generate] Generation complete, total codes:', generatedCount);
                break;
            }
            allGeneratedCodes.push({ code: value, position });
            position++;
            generatedCount++;
            
            // Log progress every 1000 codes
            if (generatedCount % 1000 === 0) {
                console.log('[Generate] Generated', generatedCount, 'codes');
            }
        }
        console.log('[Generate] First few codes:', allGeneratedCodes.slice(0, 5));

        // Find positions of input codes
        console.log('[Position] Finding positions for codes:', newCodes);
        for (const code of newCodes) {
            console.log('[Position] Looking for code:', code);
            const match = allGeneratedCodes.find(gc => gc.code === code);
            if (match) {
                console.log('[Position] Found position:', match.position);
                positions.push(match.position);
            } else {
                console.log('[Position] No position found for code:', code);
            }
        }

        console.log('[Position] All found positions:', positions);
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
        const currentRanges = [];
        
        // Parse existing ranges if any
        const existingRanges = (previewShare.r || previewShare.ranges || '').split(',').filter(r => r);
        if (existingRanges.length > 0) {
            existingRanges.forEach(range => {
                const [start, end] = range.split('-').map(Number);
                currentRanges.push({ start, end });
            });
        }

        // Add new positions
        positions.forEach(pos => {
            let merged = false;
            
            // Try to merge with existing ranges
            for (let i = 0; i < currentRanges.length; i++) {
                const range = currentRanges[i];
                
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
                currentRanges.push({ start: pos, end: pos });
            }
        });

        // Sort ranges and merge overlapping ones
        currentRanges.sort((a, b) => a.start - b.start);
        const mergedRanges = [];
        
        if (currentRanges.length > 0) {
            let currentRange = currentRanges[0];
            for (let i = 1; i < currentRanges.length; i++) {
                if (currentRanges[i].start <= currentRange.end + 1) {
                    // Ranges overlap or are adjacent, merge them
                    currentRange.end = Math.max(currentRange.end, currentRanges[i].end);
                } else {
                    // Ranges don't overlap, start new range
                    mergedRanges.push(`${currentRange.start}-${currentRange.end}`);
                    currentRange = currentRanges[i];
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

        // Find positions of remaining codes
        const positions = [];
        for (const code of remainingCodes) {
            const generator = generateValidCodes(DIGIT_LENGTH, REQUIRED_DIGITS, 0);
            let position = 0;
            let found = false;
            
            while (!found) {
                const {value, done} = generator.next();
                if (done) break;
                if (value === code) {
                    positions.push(position);
                    found = true;
                }
                position++;
            }
        }

        // Create new ranges
        positions.sort((a, b) => a - b);
        const newRanges = [];
        let rangeStart = positions[0];
        let rangeEnd = positions[0];

        for (let i = 1; i < positions.length; i++) {
            if (positions[i] === rangeEnd + 1) {
                rangeEnd = positions[i];
            } else {
                newRanges.push(`${rangeStart}-${rangeEnd}`);
                rangeStart = positions[i];
                rangeEnd = positions[i];
            }
        }
        newRanges.push(`${rangeStart}-${rangeEnd}`);
        previewShare.r = newRanges.join(',');

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