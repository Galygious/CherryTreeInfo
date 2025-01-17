// @ts-nocheck
const monsters = {
    "Chicken": {
      "enemyIcons": "R.drawable.enemy_chicken_01",
      "enemyHealth": 10,
      "enemyAttack": 1,
      "enemyStrength": 1,
      "enemyDefence": 1,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "11",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Feathers",
          "min": 1,
          "max": 3,
          "dropclass": "Always"
        },
        {
          "name": "Egg",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Drumstick",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Birds Nest",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Common Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Chicken Knife",
          "min": 1,
          "max": 1,
          "dropclass": "Secret Rare"
        }
      ],
      "enemyArea": "Farm"
    },
    "Crow": {
      "enemyIcons": "R.drawable.enemy_crow_01",
      "enemyHealth": 20,
      "enemyAttack": 5,
      "enemyStrength": 4,
      "enemyDefence": 5,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "12",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Feathers",
          "min": 3,
          "max": 6,
          "dropclass": "Always"
        },
        {
          "name": "Evergreen Arrow Shafts",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Egg",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Thread",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        },
        {
          "name": "Coins",
          "min": 2,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Birds Nest",
          "min": 1,
          "max": 2,
          "dropclass": "Uncommon"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Raw Shrimp",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Farm"
    },
    "Rat": {
      "enemyIcons": "R.drawable.enemy_rat_01",
      "enemyHealth": 30,
      "enemyAttack": 5,
      "enemyStrength": 10,
      "enemyDefence": 8,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "13",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 1,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Stone Arrowheads",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 2,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Raw Shrimp",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Farm"
    },
    "Sheep": {
      "enemyIcons": "R.drawable.enemy_sheep_01",
      "enemyHealth": 50,
      "enemyAttack": 10,
      "enemyStrength": 15,
      "enemyDefence": 15,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "15",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Wool",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 2,
          "max": 6,
          "dropclass": "Common"
        },
        {
          "name": "Raw Snail",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Raw Shrimp",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Farm"
    },
    "Goat": {
      "enemyIcons": "R.drawable.enemy_goat_01",
      "enemyHealth": 75,
      "enemyAttack": 10,
      "enemyStrength": 25,
      "enemyDefence": 15,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "16",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Milk",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Oak Arrow Shafts",
          "min": 15,
          "max": 30,
          "dropclass": "Rare"
        },
        {
          "name": "Coins",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Raw Carp",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Farm"
    },
    "Pig": {
      "enemyIcons": "R.drawable.enemy_pig_01",
      "enemyHealth": 100,
      "enemyAttack": 15,
      "enemyStrength": 15,
      "enemyDefence": 25,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "18",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Bacon",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Coins",
          "min": 10,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Raw Minnows",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Farm"
    },
    "Ox": {
      "enemyIcons": "R.drawable.enemy_ox_01",
      "enemyHealth": 150,
      "enemyAttack": 25,
      "enemyStrength": 30,
      "enemyDefence": 40,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "22",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Milk",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Coins",
          "min": 20,
          "max": 40,
          "dropclass": "Common"
        },
        {
          "name": "Hide",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 15,
          "dropclass": "Common"
        },
        {
          "name": "Raw Perch",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Farm"
    },
    "Young Goblin": {
      "enemyIcons": "R.drawable.enemy_goblin_01",
      "enemyHealth": 35,
      "enemyAttack": 10,
      "enemyStrength": 15,
      "enemyDefence": 5,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "13",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Evergreen Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Hyssop",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Oak",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Abandoned Village"
    },
    "Goblin Grump": {
      "enemyIcons": "R.drawable.enemy_goblin_02",
      "enemyHealth": 75,
      "enemyAttack": 15,
      "enemyStrength": 15,
      "enemyDefence": 10,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "16",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Copper Arrowheads",
          "min": 5,
          "max": 10,
          "dropclass": "Rare"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Hyssop",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Hide",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Abandoned Village"
    },
    "Goblin Guard": {
      "enemyIcons": "R.drawable.enemy_goblin_03",
      "enemyHealth": 135,
      "enemyAttack": 25,
      "enemyStrength": 20,
      "enemyDefence": 35,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "21",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 10,
          "max": 15,
          "dropclass": "Common"
        },
        {
          "name": "Oak Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Wood",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Iron Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Abandoned Village"
    },
    "Goblin Chief": {
      "enemyIcons": "R.drawable.enemy_goblin_04",
      "enemyHealth": 225,
      "enemyAttack": 45,
      "enemyStrength": 60,
      "enemyDefence": 50,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "29",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 20,
          "max": 30,
          "dropclass": "Common"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Goblin Cleaver",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Hyssop",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Ancient Rod",
          "min": 1,
          "max": 1,
          "dropclass": "Secret Rare"
        }
      ],
      "enemyArea": "Abandoned Village"
    },
    "Jin": {
      "enemyIcons": "R.drawable.enemy_jin",
      "enemyHealth": 375,
      "enemyAttack": 70,
      "enemyStrength": 65,
      "enemyDefence": 70,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "39",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 50,
          "max": 100,
          "dropclass": "Uncommon"
        },
        {
          "name": "Maple Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Raw Crab",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Raw Lobster",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Empty Vial",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Oak",
          "min": 3,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Cauldron",
          "min": 1,
          "max": 1,
          "dropclass": "Secret Rare"
        }
      ],
      "enemyArea": "Abandoned Village"
    },
    "Red Ghoul": {
      "enemyIcons": "R.drawable.enemy_red_ghoul_01",
      "enemyHealth": 600,
      "enemyAttack": 80,
      "enemyStrength": 90,
      "enemyDefence": 85,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "53",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 60,
          "max": 100,
          "dropclass": "Uncommon"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Raw Crab",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Raw Lobster",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Abandoned Village"
    },
    "Grey Wolf": {
      "enemyIcons": "R.drawable.enemy_greywolf_02",
      "enemyHealth": 90,
      "enemyAttack": 35,
      "enemyStrength": 50,
      "enemyDefence": 40,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "21",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Hide",
          "min": 1,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Leather",
          "min": 1,
          "max": 2,
          "dropclass": "Rare"
        },
        {
          "name": "Iron Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Caves"
    },
    "Cyclops": {
      "enemyIcons": "R.drawable.enemy_cyclop_01",
      "enemyHealth": 150,
      "enemyAttack": 60,
      "enemyStrength": 75,
      "enemyDefence": 70,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "28",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Maple Log",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Stone",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        },
        {
          "name": "Wood",
          "min": 2,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Rope",
          "min": 1,
          "max": 3,
          "dropclass": "Rare"
        },
        {
          "name": "Mithril Boots",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Mithril Ore",
          "min": 1,
          "max": 5,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Caves"
    },
    "Cave Demon": {
      "enemyIcons": "R.drawable.enemy_demon_06",
      "enemyHealth": 300,
      "enemyAttack": 75,
      "enemyStrength": 65,
      "enemyDefence": 60,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "35",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Empty Vial",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        },
        {
          "name": "Fir Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Nails",
          "min": 1,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Fishing Potion",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Honey",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Caves"
    },
    "Banshee": {
      "enemyIcons": "R.drawable.enemy_banshee",
      "enemyHealth": 450,
      "enemyAttack": 75,
      "enemyStrength": 80,
      "enemyDefence": 70,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "44",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Empty Vial",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        },
        {
          "name": "Strength Potion",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Mithril Top",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Mithril Greaves",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Mithril Boots",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Safflower",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Caves"
    },
    "Cave Beast": {
      "enemyIcons": "R.drawable.enemy_beest_02",
      "enemyHealth": 675,
      "enemyAttack": 80,
      "enemyStrength": 80,
      "enemyDefence": 80,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "56",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Tooth Necklace",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Empty Vial",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        },
        {
          "name": "Hyssop",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Safflower",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Hide",
          "min": 1,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Raw Catfish",
          "min": 1,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Large Fishing Net",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Fishing Net",
          "min": 3,
          "max": 5,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Caves"
    },
    "Giant Cave Spider": {
      "enemyIcons": "R.drawable.enemy_spider_01",
      "enemyHealth": 1000,
      "enemyAttack": 90,
      "enemyStrength": 95,
      "enemyDefence": 85,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "74",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Stone Tablet",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Hide",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Leather",
          "min": 1,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Rope",
          "min": 5,
          "max": 10,
          "dropclass": "Super Rare"
        },
        {
          "name": "Wolfmint",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Vissinel",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 200,
          "max": 500,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Caves"
    },
    "Wild Dog": {
      "enemyIcons": "R.drawable.enemy_dog_01",
      "enemyHealth": 180,
      "enemyAttack": 50,
      "enemyStrength": 65,
      "enemyDefence": 55,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "28",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Nefrit Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Nefrit Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Iron Ore",
          "min": 1,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Wood",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Great Plains"
    },
    "Crocodile": {
      "enemyIcons": "R.drawable.enemy_crocodile_01",
      "enemyHealth": 360,
      "enemyAttack": 65,
      "enemyStrength": 70,
      "enemyDefence": 50,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "37",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Nefrit Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Nefrit Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Cog",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Thread",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Hide",
          "min": 1,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Fishing Net",
          "min": 1,
          "max": 3,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Great Plains"
    },
    "Lion": {
      "enemyIcons": "R.drawable.enemy_lion_01",
      "enemyHealth": 570,
      "enemyAttack": 70,
      "enemyStrength": 75,
      "enemyDefence": 60,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "49",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Ram Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Fir Log",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Nefrit Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Nefrit Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Thread",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Yarn",
          "min": 1,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Great Plains"
    },
    "Brown Bear": {
      "enemyIcons": "R.drawable.enemy_bear_01",
      "enemyHealth": 750,
      "enemyAttack": 80,
      "enemyStrength": 90,
      "enemyDefence": 85,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "60",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Ram Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Honey",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Nefrit Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Nefrit Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Coins",
          "min": 200,
          "max": 500,
          "dropclass": "Rare"
        },
        {
          "name": "Pot of Gold",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Yarn",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Great Plains"
    },
    "Skeletal Bear": {
      "enemyIcons": "R.drawable.enemy_bear",
      "enemyHealth": 1200,
      "enemyAttack": 95,
      "enemyStrength": 120,
      "enemyDefence": 100,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "86",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Gold Ring",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Rhodium Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Nefrit Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Nefrit Key",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Coins",
          "min": 500,
          "max": 1000,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 20,
          "max": 50,
          "dropclass": "Rare"
        },
        {
          "name": "Oak",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Great Plains"
    },
    "Baby Red Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_10",
      "enemyHealth": 800,
      "enemyAttack": 120,
      "enemyStrength": 120,
      "enemyDefence": 120,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "68",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 500,
          "max": 1000,
          "dropclass": "Rare"
        },
        {
          "name": "Luck Potion",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Baby Blue Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_11",
      "enemyHealth": 1000,
      "enemyAttack": 150,
      "enemyStrength": 150,
      "enemyDefence": 130,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "82",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 500,
          "max": 1000,
          "dropclass": "Rare"
        },
        {
          "name": "Luck Potion",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Undead Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_08",
      "enemyHealth": 1600,
      "enemyAttack": 180,
      "enemyStrength": 220,
      "enemyDefence": 140,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "117",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 2,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 500,
          "max": 1000,
          "dropclass": "Rare"
        },
        {
          "name": "Luck Potion",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Ancient Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_07",
      "enemyHealth": 2800,
      "enemyAttack": 69420,
      "enemyStrength": 280,
      "enemyDefence": 300,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "192",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Arrowheads",
          "min": 15,
          "max": 25,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Leather",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Golden Necklace",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 2,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 1000,
          "max": 2500,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Green Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_04",
      "enemyHealth": 4000,
      "enemyAttack": 300,
      "enemyStrength": 350,
      "enemyDefence": 240,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "255",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 1,
          "max": 2,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Tail",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Golden Necklace",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 2,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Wing Battleaxe",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 1000,
          "max": 2500,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Water Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_05",
      "enemyHealth": 5200,
      "enemyAttack": 350,
      "enemyStrength": 350,
      "enemyDefence": 300,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "320",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 1,
          "max": 2,
          "dropclass": "Common"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Tail",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Golden Scarab",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Trident of the Seas",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Wing Battleaxe",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Coins",
          "min": 2500,
          "max": 5000,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "King Dragon": {
      "enemyIcons": "R.drawable.enemy_dragon_01",
      "enemyHealth": 8000,
      "enemyAttack": 69420,
      "enemyStrength": 450,
      "enemyDefence": 450,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "475",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Big Dragon Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 2,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Tail",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Golden Scarab",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Crystal Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 2,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Wing Battleaxe",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Coins",
          "min": 5000,
          "max": 10000,
          "dropclass": "Rare"
        },
        {
          "name": "Kings Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Mythical"
        },
        {
          "name": "Kings Key",
          "min": 1,
          "max": 1,
          "dropclass": "Mythical"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Dragon Queen": {
      "enemyIcons": "R.drawable.enemy_dragon_06",
      "enemyHealth": 15000,
      "enemyAttack": 69420,
      "enemyStrength": 750,
      "enemyDefence": 69420,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "938",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Big Dragon Bones",
          "min": 1,
          "max": 2,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Tail",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Golden Scarab",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Queens Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Mythical"
        },
        {
          "name": "Queens Key",
          "min": 1,
          "max": 1,
          "dropclass": "Mythical"
        },
        {
          "name": "Dragon Ore",
          "min": 2,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Dragon Scimitar",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Coins",
          "min": 5000,
          "max": 10000,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Dragon Island"
    },
    "Elite Chicken": {
      "enemyIcons": "R.drawable.enemy_chicken_01",
      "enemyHealth": 10000,
      "enemyAttack": 300,
      "enemyStrength": 300,
      "enemyDefence": 200,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "550",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 1000,
          "max": 2500,
          "dropclass": "Always"
        },
        {
          "name": "Cedar Log",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Feathers",
          "min": 10,
          "max": 30,
          "dropclass": "Always"
        },
        {
          "name": "Egg",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Chicken Knife",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Farm Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Farmour Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Elite Crow": {
      "enemyIcons": "R.drawable.enemy_crow_01",
      "enemyHealth": 15000,
      "enemyAttack": 500,
      "enemyStrength": 69420,
      "enemyDefence": 300,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "820",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 1500,
          "max": 2500,
          "dropclass": "Always"
        },
        {
          "name": "Feathers",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        },
        {
          "name": "Egg",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        },
        {
          "name": "Thread",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Birds Nest",
          "min": 2,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Farm Key",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dagger Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Mythical"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Elite Rat": {
      "enemyIcons": "R.drawable.enemy_rat_01",
      "enemyHealth": 69420,
      "enemyAttack": 69420,
      "enemyStrength": 450,
      "enemyDefence": 200,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "1063",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 2000,
          "max": 3000,
          "dropclass": "Always"
        },
        {
          "name": "Platinum Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 3,
          "dropclass": "Rare"
        },
        {
          "name": "Farm Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Farmour Fragment",
          "min": 1,
          "max": 2,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Elite Sheep": {
      "enemyIcons": "R.drawable.enemy_sheep_01",
      "enemyHealth": 25000,
      "enemyAttack": 600,
      "enemyStrength": 600,
      "enemyDefence": 69420,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "1340",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 2500,
          "max": 3000,
          "dropclass": "Always"
        },
        {
          "name": "Wool",
          "min": 2,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Farm Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dagger Fragment",
          "min": 1,
          "max": 3,
          "dropclass": "Mythical"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Elite Goat": {
      "enemyIcons": "R.drawable.enemy_goat_01",
      "enemyHealth": 30000,
      "enemyAttack": 750,
      "enemyStrength": 750,
      "enemyDefence": 600,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "1615",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 3000,
          "max": 4000,
          "dropclass": "Always"
        },
        {
          "name": "Cedar Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Milk",
          "min": 2,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Farm Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Farmour Fragment",
          "min": 1,
          "max": 3,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Elite Pig": {
      "enemyIcons": "R.drawable.enemy_pig_01",
      "enemyHealth": 50000,
      "enemyAttack": 900,
      "enemyStrength": 900,
      "enemyDefence": 750,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "2638",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 3500,
          "max": 4500,
          "dropclass": "Always"
        },
        {
          "name": "Bacon",
          "min": 2,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Farm Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Dagger Fragment",
          "min": 2,
          "max": 5,
          "dropclass": "Mythical"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Elite Ox": {
      "enemyIcons": "R.drawable.enemy_ox_01",
      "enemyHealth": 75000,
      "enemyAttack": 1200,
      "enemyStrength": 1200,
      "enemyDefence": 1000,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "3930",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 4000,
          "max": 5000,
          "dropclass": "Always"
        },
        {
          "name": "Hide",
          "min": 2,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Ginkgo Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Ginkgo Log",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Farm Chest",
          "min": 1,
          "max": 2,
          "dropclass": "Rare"
        },
        {
          "name": "Farm Key",
          "min": 1,
          "max": 2,
          "dropclass": "Rare"
        },
        {
          "name": "Farmour Fragment",
          "min": 2,
          "max": 5,
          "dropclass": "Legendary"
        },
        {
          "name": "Dagger Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Elite Farm"
    },
    "Training Dummy": {
      "enemyIcons": "R.drawable.enemy_dummy_01",
      "enemyHealth": 35,
      "enemyAttack": 10,
      "enemyStrength": 10,
      "enemyDefence": 10,
      "enemyAttackSpeed": "Slow",
      "enemySlayerExp": "13",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 10,
      "enemyDrops": [
        {
          "name": "Wood",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Hide",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        },
        {
          "name": "Redwood Log",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Thread",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        },
        {
          "name": "Common Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Oak",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        },
        {
          "name": "Iron Ore",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Ghost": {
      "enemyIcons": "R.drawable.enemy_ghost_01",
      "enemyHealth": 75,
      "enemyAttack": 30,
      "enemyStrength": 25,
      "enemyDefence": 20,
      "enemyAttackSpeed": "Medium",
      "enemySlayerExp": "18",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 20,
      "enemyDrops": [
        {
          "name": "Akomeric",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Mushroom",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Stone",
          "min": 1,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Common Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Common Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Phoenix": {
      "enemyIcons": "R.drawable.enemy_phoenix_01",
      "enemyHealth": 69420,
      "enemyAttack": 50,
      "enemyStrength": 60,
      "enemyDefence": 50,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "31",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 30,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Bloodroot",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Red Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 20,
          "dropclass": "Common"
        },
        {
          "name": "Yarn",
          "min": 1,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Ruby",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Gold Ore",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Sextant",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Mystery Egg",
          "min": 1,
          "max": 1,
          "dropclass": "Secret Rare"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Nightmare": {
      "enemyIcons": "R.drawable.enemy_nightmare_01",
      "enemyHealth": 69420,
      "enemyAttack": 60,
      "enemyStrength": 70,
      "enemyDefence": 75,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "40",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 45,
      "enemyDrops": [
        {
          "name": "Hyssop",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Red Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Red Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Book of Aroon",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Thread",
          "min": 25,
          "max": 50,
          "dropclass": "Rare"
        },
        {
          "name": "Hide",
          "min": 10,
          "max": 25,
          "dropclass": "Uncommon"
        },
        {
          "name": "Iron Ore",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Orc Captain": {
      "enemyIcons": "R.drawable.enemy_orc_05",
      "enemyHealth": 600,
      "enemyAttack": 70,
      "enemyStrength": 80,
      "enemyDefence": 75,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "51",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 60,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 25,
          "dropclass": "Common"
        },
        {
          "name": "Sage Leaf",
          "min": 1,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Wood",
          "min": 10,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Mithril Ore",
          "min": 5,
          "max": 10,
          "dropclass": "Rare"
        },
        {
          "name": "Iron Ore",
          "min": 10,
          "max": 25,
          "dropclass": "Rare"
        },
        {
          "name": "Barbarian Boots",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Barbarian Gloves",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Barbarian Top",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Barbarian Helm",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Barbarian Greaves",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Barbarian Cape",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Cobra": {
      "enemyIcons": "R.drawable.enemy_snake_01",
      "enemyHealth": 750,
      "enemyAttack": 80,
      "enemyStrength": 90,
      "enemyDefence": 85,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "60",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 65,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Safflower",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Sunburst Flower",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Spiked Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Spiked Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Hide",
          "min": 10,
          "max": 25,
          "dropclass": "Uncommon"
        },
        {
          "name": "Mithril Ore",
          "min": 1,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Iron Ore",
          "min": 10,
          "max": 25,
          "dropclass": "Common"
        },
        {
          "name": "Yarn",
          "min": 5,
          "max": 10,
          "dropclass": "Rare"
        },
        {
          "name": "Emerald",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Skeletal Hound": {
      "enemyIcons": "R.drawable.enemy_hound",
      "enemyHealth": 1500,
      "enemyAttack": 140,
      "enemyStrength": 160,
      "enemyDefence": 120,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "106",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 75,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Sage Leaf",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Redwood Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Mithril Ore",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Rope",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Cog",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Iron Ore",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Blue Silk",
          "min": 15,
          "max": 20,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Necromancer": {
      "enemyIcons": "R.drawable.enemy_skeleton_05",
      "enemyHealth": 2500,
      "enemyAttack": 200,
      "enemyStrength": 69420,
      "enemyDefence": 200,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "168",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 85,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 15,
          "dropclass": "Common"
        },
        {
          "name": "Vissinel",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Wood",
          "min": 10,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Mithril Ore",
          "min": 5,
          "max": 10,
          "dropclass": "Rare"
        },
        {
          "name": "Iron Ore",
          "min": 10,
          "max": 20,
          "dropclass": "Rare"
        },
        {
          "name": "Necromancer Boots",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Necromancer Gloves",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Necromancer Top",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Necromancer Helm",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Necromancer Greaves",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Necromancer Cape",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Fluffy": {
      "enemyIcons": "R.drawable.enemy_spider_03",
      "enemyHealth": 5000,
      "enemyAttack": 69420,
      "enemyStrength": 300,
      "enemyDefence": 350,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "305",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 90,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Wolfmint",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Ember Fern",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Chestnut Log",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Crystal Chest",
          "min": 1,
          "max": 2,
          "dropclass": "Super Rare"
        },
        {
          "name": "Thread",
          "min": 25,
          "max": 50,
          "dropclass": "Uncommon"
        },
        {
          "name": "Rope",
          "min": 10,
          "max": 15,
          "dropclass": "Rare"
        },
        {
          "name": "Yarn",
          "min": 5,
          "max": 10,
          "dropclass": "Rare"
        },
        {
          "name": "Gold Ring",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Iron Ore",
          "min": 10,
          "max": 20,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Blue Devil": {
      "enemyIcons": "R.drawable.enemy_tentacle_01",
      "enemyHealth": 8000,
      "enemyAttack": 350,
      "enemyStrength": 500,
      "enemyDefence": 69420,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "473",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 95,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Vissinel",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Crystal Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Chestnut Bow",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Stone Tablet",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Gold Ring",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Thread",
          "min": 50,
          "max": 100,
          "dropclass": "Uncommon"
        },
        {
          "name": "Rope",
          "min": 15,
          "max": 20,
          "dropclass": "Rare"
        },
        {
          "name": "Blue Thread",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Ancient Tribal Leader": {
      "enemyIcons": "R.drawable.enemy_mask_01",
      "enemyHealth": 12000,
      "enemyAttack": 600,
      "enemyStrength": 69420,
      "enemyDefence": 850,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "723",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 99,
      "enemyDrops": [
        {
          "name": "Bones",
          "min": 5,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Vissinel",
          "min": 3,
          "max": 5,
          "dropclass": "Always"
        },
        {
          "name": "Crystal Chest",
          "min": 1,
          "max": 3,
          "dropclass": "Rare"
        },
        {
          "name": "Ancient Dagger",
          "min": 1,
          "max": 1,
          "dropclass": "Mythical"
        },
        {
          "name": "Blue Thread",
          "min": 3,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Blue Silk",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        },
        {
          "name": "Coin Purse",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Golden Necklace",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Wine",
          "min": 3,
          "max": 5,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Slayer Dungeon"
    },
    "Dummy Queen": {
      "enemyIcons": "R.drawable.enemy_doll_01",
      "enemyHealth": 50000,
      "enemyAttack": 69420,
      "enemyStrength": 69420,
      "enemyDefence": 850,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "2693",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 100,
          "max": 200,
          "dropclass": "Always"
        },
        {
          "name": "Queens Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Wood",
          "min": 10,
          "max": 20,
          "dropclass": "Always"
        },
        {
          "name": "Hide",
          "min": 10,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Thread",
          "min": 10,
          "max": 30,
          "dropclass": "Common"
        },
        {
          "name": "Queens Armour Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Scarab Queen": {
      "enemyIcons": "R.drawable.enemy_bug",
      "enemyHealth": 75000,
      "enemyAttack": 2400,
      "enemyStrength": 1400,
      "enemyDefence": 1000,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "4000",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 150,
          "max": 250,
          "dropclass": "Always"
        },
        {
          "name": "Queens Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Golden Necklace",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Wine",
          "min": 3,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Queens Armour Fragment",
          "min": 1,
          "max": 2,
          "dropclass": "Legendary"
        },
        {
          "name": "Golden Scarab",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Spider Queen": {
      "enemyIcons": "R.drawable.enemy_spider_02",
      "enemyHealth": 100000,
      "enemyAttack": 3000,
      "enemyStrength": 69420,
      "enemyDefence": 1500,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "5335",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 250,
          "max": 500,
          "dropclass": "Always"
        },
        {
          "name": "Queens Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Golden Necklace",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Wine",
          "min": 3,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Wolfmint",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Ember Fern",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Thread",
          "min": 50,
          "max": 100,
          "dropclass": "Uncommon"
        },
        {
          "name": "Gold Ring",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Queens Armour Fragment",
          "min": 1,
          "max": 3,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Undead Dragon Queen": {
      "enemyIcons": "R.drawable.enemy_dragon_13",
      "enemyHealth": 150000,
      "enemyAttack": 3750,
      "enemyStrength": 2400,
      "enemyDefence": 1700,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "7903",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 500,
          "max": 750,
          "dropclass": "Always"
        },
        {
          "name": "Queens Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Big Dragon Bones",
          "min": 2,
          "max": 3,
          "dropclass": "Always"
        },
        {
          "name": "Dragon Leather",
          "min": 2,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Tail",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Golden Scarab",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Queens Weapon Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Bone King": {
      "enemyIcons": "R.drawable.enemy_bone_beast",
      "enemyHealth": 200000,
      "enemyAttack": 5000,
      "enemyStrength": 3600,
      "enemyDefence": 2500,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "10565",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Sunburst Flower",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 750,
          "max": 1000,
          "dropclass": "Always"
        },
        {
          "name": "Kings Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Kings Armour Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Skeletal King": {
      "enemyIcons": "R.drawable.enemy_skeleton_04",
      "enemyHealth": 250000,
      "enemyAttack": 7500,
      "enemyStrength": 4800,
      "enemyDefence": 3800,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "13315",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Sunburst Flower",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 1000,
          "max": 1500,
          "dropclass": "Always"
        },
        {
          "name": "Kings Key",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Kings Armour Fragment",
          "min": 1,
          "max": 2,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Living Armour King": {
      "enemyIcons": "R.drawable.enemy_living_armor_03",
      "enemyHealth": 300000,
      "enemyAttack": 10000,
      "enemyStrength": 6000,
      "enemyDefence": 5000,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "16060",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Ember Fern",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 2000,
          "max": 3000,
          "dropclass": "Always"
        },
        {
          "name": "Kings Chest",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Kings Armour Fragment",
          "min": 1,
          "max": 3,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Orc King": {
      "enemyIcons": "R.drawable.enemy_orc_04",
      "enemyHealth": 400000,
      "enemyAttack": 15000,
      "enemyStrength": 7200,
      "enemyDefence": 8500,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "21545",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Ember Fern",
          "min": 1,
          "max": 1,
          "dropclass": "Always"
        },
        {
          "name": "Coins",
          "min": 3000,
          "max": 5000,
          "dropclass": "Always"
        },
        {
          "name": "Kings Key",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Kings Weapon Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        }
      ],
      "enemyArea": "Realm of the Kings"
    },
    "Elven Fairy": {
      "enemyIcons": "R.drawable.enemy_elvenfairy",
      "enemyHealth": 100000,
      "enemyAttack": 8000,
      "enemyStrength": 6000,
      "enemyDefence": 10000,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "6210",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 8000,
          "max": 10000,
          "dropclass": "Always"
        },
        {
          "name": "Elven Armour Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Blue Silk",
          "min": 5,
          "max": 10,
          "dropclass": "Common"
        },
        {
          "name": "Compass",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Treasure Map",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Extreme Power Potion",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Safflower",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Tail",
          "min": 1,
          "max": 3,
          "dropclass": "Legendary"
        },
        {
          "name": "Elven Crystal",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Immortal Realm"
    },
    "Elven Warrior": {
      "enemyIcons": "R.drawable.enemy_elvenwarrior",
      "enemyHealth": 150000,
      "enemyAttack": 9000,
      "enemyStrength": 8000,
      "enemyDefence": 12000,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "8960",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 10000,
          "max": 15000,
          "dropclass": "Always"
        },
        {
          "name": "Elven Weapon Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Legendary"
        },
        {
          "name": "Compass",
          "min": 1,
          "max": 3,
          "dropclass": "Rare"
        },
        {
          "name": "Sunburst Flower",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Skull",
          "min": 1,
          "max": 3,
          "dropclass": "Legendary"
        },
        {
          "name": "Raw Ray",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Pirates Hat",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Elven Crystal",
          "min": 1,
          "max": 3,
          "dropclass": "Rare"
        }
      ],
      "enemyArea": "Immortal Realm"
    },
    "Elven Archer": {
      "enemyIcons": "R.drawable.enemy_elvenarcher",
      "enemyHealth": 300000,
      "enemyAttack": 12000,
      "enemyStrength": 10000,
      "enemyDefence": 14000,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "16810",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 15000,
          "max": 20000,
          "dropclass": "Always"
        },
        {
          "name": "Elven Armour Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Elven Arrows",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Sunburst Flower",
          "min": 3,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Crab",
          "min": 3,
          "max": 5,
          "dropclass": "Common"
        },
        {
          "name": "Dragon Plate",
          "min": 15,
          "max": 20,
          "dropclass": "Super Rare"
        },
        {
          "name": "Raw Shark",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Golden Scarab",
          "min": 1,
          "max": 3,
          "dropclass": "Super Rare"
        },
        {
          "name": "Elven Crystal",
          "min": 1,
          "max": 1,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Immortal Realm"
    },
    "Elven Mage": {
      "enemyIcons": "R.drawable.enemy_elvenmage",
      "enemyHealth": 400000,
      "enemyAttack": 15000,
      "enemyStrength": 15000,
      "enemyDefence": 16000,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "22310",
      "enemyWeakness": "Archery",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 20000,
          "max": 25000,
          "dropclass": "Always"
        },
        {
          "name": "Elven Weapon Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Sunburst Flower",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Leather",
          "min": 15,
          "max": 20,
          "dropclass": "Super Rare"
        },
        {
          "name": "Raw Octopus",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        },
        {
          "name": "Dragon Ore",
          "min": 1,
          "max": 3,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Platter",
          "min": 1,
          "max": 1,
          "dropclass": "Rare"
        },
        {
          "name": "Elven Crystal",
          "min": 1,
          "max": 3,
          "dropclass": "Uncommon"
        }
      ],
      "enemyArea": "Immortal Realm"
    },
    "Elven King": {
      "enemyIcons": "R.drawable.enemy_elvenking",
      "enemyHealth": 600000,
      "enemyAttack": 24000,
      "enemyStrength": 25000,
      "enemyDefence": 18000,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "33360",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 30000,
          "max": 50000,
          "dropclass": "Always"
        },
        {
          "name": "Elven Armour Fragment",
          "min": 1,
          "max": 2,
          "dropclass": "Uncommon"
        },
        {
          "name": "Ember Fern",
          "min": 3,
          "max": 5,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Tail",
          "min": 5,
          "max": 10,
          "dropclass": "Legendary"
        },
        {
          "name": "Dragon Ore",
          "min": 3,
          "max": 5,
          "dropclass": "Super Rare"
        },
        {
          "name": "Golden Scarab",
          "min": 3,
          "max": 5,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Platter",
          "min": 3,
          "max": 5,
          "dropclass": "Rare"
        },
        {
          "name": "Elven Crystal",
          "min": 1,
          "max": 1,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Immortal Realm"
    },
    "Elven Queen": {
      "enemyIcons": "R.drawable.enemy_elvenqueen",
      "enemyHealth": 750000,
      "enemyAttack": 30000,
      "enemyStrength": 40000,
      "enemyDefence": 25000,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "42260",
      "enemyWeakness": "Melee",
      "enemySlayerLevel": 1,
      "enemyDrops": [
        {
          "name": "Coins",
          "min": 50000,
          "max": 100000,
          "dropclass": "Always"
        },
        {
          "name": "Elven Weapon Fragment",
          "min": 1,
          "max": 2,
          "dropclass": "Uncommon"
        },
        {
          "name": "Ember Fern",
          "min": 15,
          "max": 20,
          "dropclass": "Uncommon"
        },
        {
          "name": "Dragon Skull",
          "min": 5,
          "max": 10,
          "dropclass": "Legendary"
        },
        {
          "name": "Queens Weapon Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Queens Armour Fragment",
          "min": 1,
          "max": 1,
          "dropclass": "Super Rare"
        },
        {
          "name": "Dragon Platter",
          "min": 5,
          "max": 10,
          "dropclass": "Uncommon"
        },
        {
          "name": "Elven Crystal",
          "min": 1,
          "max": 3,
          "dropclass": "Common"
        }
      ],
      "enemyArea": "Immortal Realm"
    },
    "Amaran": {
      "enemyIcons": "R.drawable.enemy_amaran",
      "enemyHealth": 69420,
      "enemyAttack": 70000,
      "enemyStrength": 300000,
      "enemyDefence": 67500,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "371885",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Aurial": {
      "enemyIcons": "R.drawable.enemy_aurial",
      "enemyHealth": 4000000,
      "enemyAttack": 60000,
      "enemyStrength": 225000,
      "enemyDefence": 36000,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "216060",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Cognium": {
      "enemyIcons": "R.drawable.enemy_cognium",
      "enemyHealth": 69420,
      "enemyAttack": 80000,
      "enemyStrength": 450000,
      "enemyDefence": 54000,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "329210",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Copina": {
      "enemyIcons": "R.drawable.enemy_copina",
      "enemyHealth": 69420,
      "enemyAttack": 60000,
      "enemyStrength": 225000,
      "enemyDefence": 40500,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "266285",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Feroxi": {
      "enemyIcons": "R.drawable.enemy_feroxi",
      "enemyHealth": 6500000,
      "enemyAttack": 90000,
      "enemyStrength": 562500,
      "enemyDefence": 63000,
      "enemyAttackSpeed": "Very Fast",
      "enemySlayerExp": "360785",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Kynosian": {
      "enemyIcons": "R.drawable.enemy_kynosian",
      "enemyHealth": 69420,
      "enemyAttack": 80000,
      "enemyStrength": 525000,
      "enemyDefence": 36000,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "282060",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Noctyra": {
      "enemyIcons": "R.drawable.enemy_noctyra",
      "enemyHealth": 69420,
      "enemyAttack": 100000,
      "enemyStrength": 562500,
      "enemyDefence": 67500,
      "enemyAttackSpeed": "Insane",
      "enemySlayerExp": "336510",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    },
    "Opulina": {
      "enemyIcons": "R.drawable.enemy_opulina",
      "enemyHealth": 4500000,
      "enemyAttack": 70000,
      "enemyStrength": 262500,
      "enemyDefence": 45000,
      "enemyAttackSpeed": "Fast",
      "enemySlayerExp": "243885",
      "enemyWeakness": "None",
      "enemySlayerLevel": 130,
      "enemyDrops": [
        {
          "name": "Gold Coin",
          "min": 5,
          "max": 10,
          "dropclass": "Always"
        }
      ],
      "enemyArea": "Kingdom of the Gods"
    }
  };

const battleAreas = [
    "Farm",
    "Abandoned Village",
    "Caves",
    "Great Plains",
    "Dragon Island",
    "Elite Farm",
    "Slayer Dungeon",
    "Realm of the Kings",
    "Immortal Realm",
    "Kingdom of the Gods"
];

const battleAreasDifficulty = [
    "Easy",
    "Easy - Medium",
    "Medium - Hard",
    "Hard - Very Hard",
    "Very Hard - Extreme",
    "Very Hard - Extreme",
    "Easy - Extreme",
    "Extreme - Insanity",
    "Insanity",
    "The Endgame (Changes Weekly, requires 130 Slayer)"
];

const slayerMastersTasks = [
	"Chicken/Crow/Rat/Young Goblin",
	"Rat/Sheep/Goat/Young Goblin/Goblin Grump/Pig",
	"Goblin Grump/Goblin Guard/Grey Wolf/Ox/Pig",
	"Ox/Goblin Guard/Goblin Chief/Grey Wolf/Cyclops/Wild Dog/Crocodile",
	"Crocodile/Jin/Lion/Red Ghoul/Cyclops/Cave Demon/Banshee/Cave Beast",
	"Red Ghoul/Cave Beast/Giant Cave Spider/Lion/Brown Bear/Skeletal Bear/Baby Red Dragon/Baby Blue Dragon",
	"Green Dragon/Water Dragon/King Dragon/Fluffy/Blue Devil",
	"Bone King/Skeletal King/Living Armour King/Orc King",
	"Orc King/Elven Archer/Elven Mage/Elven King/Elven Queen"
  ];


const slayerMastersDif = ["Blade", "Tracer", "Crux", "Tide", "Quill", "Lumen", "Vain", "Feroxi", "Adamet"];
const slayerMastersKillCoins = [1, 2, 5, 10, 20, 25, 40, 60, 100];
const slayerMastersLevelUnlock = [1, 20, 35, 50, 70, 85, 99, 108, 120];
const slayerMastersMinTask = [5, 10, 20, 25, 40, 60, 90, 100, 120];
const slayerMastersMaxTask = [10, 20, 30, 40, 60, 90, 120, 150, 200];

const slayerMasterMap = {
  slayerMastersDif:slayerMastersDif,
  slayerMastersTasks:slayerMastersTasks,
  slayerMastersKillCoins:slayerMastersKillCoins,
  slayerMastersLevelUnlock:slayerMastersLevelUnlock,
  slayerMastersMinTask:slayerMastersMinTask,
  slayerMastersMaxTask:slayerMastersMaxTask,
}



const allGods = ["Amaran", "Aurial", "Cognium", "Copina", "Feroxi", "Kynosian", "Noctyra", "Opulina"];
const allGodDrops = [
  ["Shield of Amaran", "Ring of Life", "Necklace of Defence", "Necklace of Health", "Queens Armour Fragment", "Kings Armour Fragment", "Invincibility Potion", "Rock Skin Potion", "Dragon Platter", "Iridium Ore"],
  ["Scythe of Aurial", "Scythe of Demeter", "Restoration Fragment 2", "Magic Watering Can", "Farm Chest", "Farm Key", "Wine", "Eggplant", "Fruit Salad", "Lemon"],
  ["Sword of Cognium", "Ring of Speed", "Ring Fragments", "Sextant", "Steel Bar", "Cog", "Iron Ore"],
  ["Rod of Copina", "Knife of Copina", "Rabbits Foot", "Eagles Nest", "Book of Aroon", "Stone Tablet", "Ginkgo Log", "Shark", "Marlin", "Chestnut Log", "Large Fishing Net", "Rhodium Ore"],
  ["Shield of Feroxi", "Gloves of Feroxi", "Berserker Ring", "Extreme Power Stone", "Necklace of Strength", "Kings Weapon Fragment", "Queens Weapon Fragment", "Ultimate Power Potion", "Super Power Stone", "Tooth Necklace", "Super Power Potion", "Power Potion"],
  ["Quiver of Kynosian", "Kynosian Boots", "Kynosian Gloves", "Kynosian Arrows", "Elven Bow", "Elven Arrows", "Kings Bow", "Kings Arrows", "Queens Bow", "Queens Arrows", "Ginkgo Headless Arrows", "Ginkgo Arrow Shafts"],
  ["Mystic Staff", "Death Princess Rune", "Ancient Elven Book", "Ring of Death", "Book of Death", "Soul Gem", "Liquid Death Potion", "Dragon Skull", "Insta Kill Potion", "Big Dragon Bones", "Dragon Bones", "Bones"],
  ["Opulinas Robe Bottoms", "Gold Coin", "Gold Coin", "Golden Touch Potion", "Gold Coin", "Golden Scarab", "Pot of Gold", "Treasure Map", "Gold Coin", "Gold Bar", "Gold Feather", "Gold Ore"]
];
const allGodDropAmounts = [
  ["1,1", "1,1", "1,1", "1,1", "4,5", "2,3", "1,3", "2,5", "15,25", "10,20"],
  ["1,1", "1,1", "1,1", "1,1", "2,3", "2,3", "15,20", "10,15", "15,20", "15,20"],
  ["1,1", "1,1", "1,2", "3,5", "15,20", "5,10", "20,30"],
  ["1,1", "1,1", "1,1", "2,3", "4,5", "4,5", "20,25", "40,50", "50,60", "25,40", "5,10", "15,25"],
  ["1,1", "1,1", "1,1", "1,2", "1,1", "2,3", "3,4", "2,5", "2,5", "3,5", "5,10", "10,15"],
  ["1,1", "1,1", "1,1", "2,5", "1,1", "5,10", "1,1", "15,20", "1,1", "20,30", "25,40", "40,60"],
  ["1,1", "1,1", "1,1", "1,1", "1,1", "1,1", "5,10", "5,10", "10,15", "15,20", "20,25", "30,40"],
  ["1,1", "100,100", "25,25", "2,5", "15,15", "5,10", "5,10", "5,10", "5,5", "15,20", "25,30", "30,40"]
];
const allGodDropRates = [
  [1, 4, 14, 24, 144, 384, 984, 2984, 7984, 17984],
  [1, 3, 5, 13, 163, 313, 1313, 4313, 10313, 20313],
  [1, 4, 19, 519, 3019, 8019, 18019],
  [1, 2, 6, 106, 256, 406, 906, 1706, 4206, 8206, 14206, 24206],
  [1, 2, 5, 11, 17, 67, 187, 937, 1937, 3937, 8937, 18937],
  [1, 2, 3, 9, 24, 54, 204, 454, 954, 1704, 9204, 19204],
  [1, 3, 6, 11, 16, 22, 522, 1272, 2772, 5772, 10772, 20772],
  [1, 3, 7, 15, 31, 111, 411, 1011, 2011, 4511, 9511, 17511]
];

const tableList = {
    monsters:monsters,
    battleAreas: battleAreas,
    battleAreasDifficulty: battleAreasDifficulty,
    slayerMastersTasks: slayerMastersTasks,
    slayerMastersKillCoins: slayerMastersKillCoins,
    slayerMastersLevelUnlock: slayerMastersLevelUnlock,
    slayerMastersMinTask: slayerMastersMinTask,
    slayerMastersMaxTask: slayerMastersMaxTask,
    allGods: allGods,
    allGodDrops: allGodDrops,
    allGodDropAmounts: allGodDropAmounts,
    allGodDropRates: allGodDropRates
};