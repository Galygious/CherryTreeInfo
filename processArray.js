const fs = require('fs');

// Read the input file
const rawData = fs.readFileSync('array2.txt', 'utf8');

// Split data into segments by !
const segments = rawData.split('!').map(segment => segment.trim()).filter(Boolean);

// Parse a segment into an array of values
function parseSegment(segment) {
    const values = segment.split(',').map(value => {
        // Clean up the value and remove quotes
        value = value.trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        return value;
    });
    return values.filter(v => v); // Remove empty values
}

// Parse each segment
const [
    names,
    rarities,
    values,
    types,
    healingAmounts,
    farmingLevels,
    attackBonuses,
    strengthBonuses,
    defenceBonuses,
    healthBonuses,
    descriptions
] = segments.map(parseSegment);

// Create items array
const items = names.map((name, i) => ({
    name: name,
    rarity: rarities[i],
    value: parseInt(values[i]) || 0,
    type: types[i],
    healingAmount: parseInt(healingAmounts[i]) || 0,
    farmingLevel: parseInt(farmingLevels[i]) || 0,
    attackBonus: parseInt(attackBonuses[i]) || 0,
    strengthBonus: parseInt(strengthBonuses[i]) || 0,
    defenceBonus: parseInt(defenceBonuses[i]) || 0,
    healthBonus: parseInt(healthBonuses[i]) || 0,
    description: descriptions[i]
}));

// Generate the output
const output = `const items = ${JSON.stringify(items, null, 2)};\n\nexport default items;`;

// Write to file
fs.writeFileSync('items.js', output);

// Verify the results
console.log(`Processed ${items.length} items`);
console.log('\nFirst item:', JSON.stringify(items[0], null, 2));
console.log('\nRarities of first few items:', items.slice(0, 3).map(item => item.rarity));