import { DIGIT_LENGTH, REQUIRED_DIGITS, generateValidCodes, generateCodesFromRanges, showFloatingMessage, SHARE_DURATION } from 'https://galygious.github.io/CherryTreeInfo/codeshare/utils.js';
import { validateDiscordId, PANTRY_URL, BASKET_NAME } from 'https://galygious.github.io/CherryTreeInfo/codeshare/api.js';

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
    codeInput.addEventListener('input', () => {
        validateCodes();
        const currentCodes = codeInput.value.trim().split('\n').filter(code => code);
        const hasChanges = currentCodes.length > 0;
        
        // Track changes for both custom and existing shares
        if (originalShare) {
            pendingChanges = hasChanges;
            document.querySelector('.share-preview').classList.toggle('changes-pending', hasChanges);
        }
    });

    codeInput.addEventListener('paste', (e) => {
        // Allow paste event to complete, then validate
        setTimeout(validateCodes, 0);
    });

    // Make functions globally available
    window.switchMode = (mode) => switchMode(mode, localData);
    window.closeModal = closeModal;
    window.toggleCodeSelection = toggleCodeSelection;
    window.selectAllCodes = selectAllCodes;
    window.deselectAllCodes = deselectAllCodes;
    window.confirmCodeAction = () => confirmCodeAction(localData, apiQueue, overwriteBasket, renderTable);
    window.copyCodes = (shareId) => showCodeManagement(shareId, localData);
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
    
    // Clear input and validation
    codeInput.value = '';
    validationSummary.innerHTML = '';
    validationSummary.classList.remove('visible');
    
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
            e: Date.now() + SHARE_DURATION,
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

    // Update share preview
    updateSharePreview(originalShare);

    codeModal.style.display = "block";
}

function updateSharePreview(share) {
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
}

function validateCodes() {
    const inputText = codeInput.value.trim();
    if (!inputText) {
        validationSummary.classList.remove('visible');
        return;
    }

    const codes = inputText.split('\n').map(code => code.trim()).filter(code => code);
    const validationResults = codes.map(code => {
        // Check length
        const isValidLength = code.length === DIGIT_LENGTH;
        
        // Check required digits
        const digits = code.split('').map(Number);
        const hasRequiredDigits = REQUIRED_DIGITS.every(digit => digits.includes(digit));
        
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

        return {
            code,
            isValid: isValidLength && hasRequiredDigits && isGeneratable,
            errors: [
                !isValidLength && `Must be ${DIGIT_LENGTH} digits`,
                !hasRequiredDigits && `Must contain all required digits: ${REQUIRED_DIGITS.join(', ')}`,
                (isValidLength && hasRequiredDigits && !isGeneratable) && 'Not a valid vault code'
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
    if (currentMode === 'add') {
        await addCodesToShare();
    } else {
        await removeCodesFromShare();
    }
}

async function addCodesToShare() {
    const inputText = codeInput.value.trim();
    if (!inputText) return;

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

    // Find positions of new codes in generator sequence
    const positions = [];
    for (const code of newCodes) {
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

    // Create new ranges including new codes
    const currentRanges = (originalShare.r || originalShare.ranges).split(',')
        .map(range => range.split('-').map(Number));
    
    const allPositions = [...positions];
    currentRanges.forEach(([start, end]) => {
        for (let i = start; i <= end; i++) {
            allPositions.push(i);
        }
    });

    // Sort and merge positions into ranges
    allPositions.sort((a, b) => a - b);
    const newRanges = [];
    let rangeStart = allPositions[0];
    let rangeEnd = allPositions[0];

    for (let i = 1; i < allPositions.length; i++) {
        if (allPositions[i] === rangeEnd + 1) {
            rangeEnd = allPositions[i];
        } else {
            newRanges.push(`${rangeStart}-${rangeEnd}`);
            rangeStart = allPositions[i];
            rangeEnd = allPositions[i];
        }
    }
    newRanges.push(`${rangeStart}-${rangeEnd}`);

    // Update original share
    originalShare.r = newRanges.join(',');
    updateSharePreview(originalShare);
    pendingChanges = true;
}

async function removeCodesFromShare() {
    const selectedElements = document.querySelectorAll('.code-item.selected');
    if (selectedElements.length === 0) {
        showFloatingMessage("No codes selected to remove", 'error');
        return;
    }

    const selectedCodes = Array.from(selectedElements)
        .map(element => element.querySelector('span').textContent);

    // Get all codes and filter out selected ones
    const allCodes = generateCodesFromRanges(originalShare.r || originalShare.ranges);
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

    // Create new ranges from remaining positions
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

    // Update original share
    originalShare.r = newRanges.join(',');
    updateSharePreview(originalShare);
    pendingChanges = true;
}

async function saveChanges(localData, apiQueue, overwriteBasket, renderTable) {
    if (isCustomShare) {
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
        const now = Date.now();
        const hasActiveShare = localData.shares.some(share =>
            share.d === discordId &&
            !share.c &&
            share.e > now
        );

        if (hasActiveShare) {
            showFloatingMessage(`${validation.username} already has an active unconfirmed share`, 'error');
            return;
        }

        // Create new share
        const newShare = {
            ...originalShare,
            d: discordId
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
            await overwriteBasket(localData);
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