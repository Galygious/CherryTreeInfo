# File: scripts/convert_enemy_data.py

import csv

# --------------------------------------------------------------------------------
# Below are the original Java-based lists copied as Python lists.
# We will convert them to CSV with the columns:
#   Enemy Name, Enemy Icon, Enemy Health, Enemy Attack, Enemy Strength,
#   Enemy Defence, Enemy Attack Speed, Enemy Slayer Exp, Enemy Weakness,
#   Enemy Slayer Level, Enemy Drops, Enemy Area
# --------------------------------------------------------------------------------

enemyNames = [
    "Chicken", "Crow", "Rat", "Sheep", "Goat", "Pig", "Ox", "Young Goblin", "Goblin Grump",
    "Goblin Guard", "Goblin Chief", "Jin", "Red Ghoul", "Grey Wolf", "Cyclops", "Cave Demon",
    "Banshee", "Cave Beast", "Giant Cave Spider", "Wild Dog", "Crocodile", "Lion", "Brown Bear",
    "Skeletal Bear", "Baby Red Dragon", "Baby Blue Dragon", "Undead Dragon", "Ancient Dragon",
    "Green Dragon", "Water Dragon", "King Dragon", "Dragon Queen", "Elite Chicken", "Elite Crow",
    "Elite Rat", "Elite Sheep", "Elite Goat", "Elite Pig", "Elite Ox", "Training Dummy", "Ghost",
    "Phoenix", "Nightmare", "Orc Captain", "Cobra", "Skeletal Hound", "Necromancer", "Fluffy",
    "Blue Devil", "Ancient Tribal Leader", "Dummy Queen", "Scarab Queen", "Spider Queen",
    "Undead Dragon Queen", "Bone King", "Skeletal King", "Living Armour King", "Orc King",
    "Elven Fairy", "Elven Warrior", "Elven Archer", "Elven Mage", "Elven King", "Elven Queen",
    "Amaran", "Aurial", "Cognium", "Copina", "Feroxi", "Kynosian", "Noctyra", "Opulina"
]

# Instead of converting R.drawable.* references directly, we treat them as strings here for CSV.
enemyIcons = [
    "R.drawable.enemy_chicken_01", "R.drawable.enemy_crow_01", "R.drawable.enemy_rat_01",
    "R.drawable.enemy_sheep_01", "R.drawable.enemy_goat_01", "R.drawable.enemy_pig_01",
    "R.drawable.enemy_ox_01", "R.drawable.enemy_goblin_01", "R.drawable.enemy_goblin_02",
    "R.drawable.enemy_goblin_03", "R.drawable.enemy_goblin_04", "R.drawable.enemy_jin",
    "R.drawable.enemy_red_ghoul_01", "R.drawable.enemy_greywolf_02", "R.drawable.enemy_cyclop_01",
    "R.drawable.enemy_demon_06", "R.drawable.enemy_banshee", "R.drawable.enemy_beest_02",
    "R.drawable.enemy_spider_01", "R.drawable.enemy_dog_01", "R.drawable.enemy_crocodile_01",
    "R.drawable.enemy_lion_01", "R.drawable.enemy_bear_01", "R.drawable.enemy_bear",
    "R.drawable.enemy_dragon_10", "R.drawable.enemy_dragon_11", "R.drawable.enemy_dragon_08",
    "R.drawable.enemy_dragon_07", "R.drawable.enemy_dragon_04", "R.drawable.enemy_dragon_05",
    "R.drawable.enemy_dragon_01", "R.drawable.enemy_dragon_06", "R.drawable.enemy_chicken_01",
    "R.drawable.enemy_crow_01", "R.drawable.enemy_rat_01", "R.drawable.enemy_sheep_01",
    "R.drawable.enemy_goat_01", "R.drawable.enemy_pig_01", "R.drawable.enemy_ox_01",
    "R.drawable.enemy_dummy_01", "R.drawable.enemy_ghost_01", "R.drawable.enemy_phoenix_01",
    "R.drawable.enemy_nightmare_01", "R.drawable.enemy_orc_05", "R.drawable.enemy_snake_01",
    "R.drawable.enemy_hound", "R.drawable.enemy_skeleton_05", "R.drawable.enemy_spider_03",
    "R.drawable.enemy_tentacle_01", "R.drawable.enemy_mask_01", "R.drawable.enemy_doll_01",
    "R.drawable.enemy_bug", "R.drawable.enemy_spider_02", "R.drawable.enemy_dragon_13",
    "R.drawable.enemy_bone_beast", "R.drawable.enemy_skeleton_04", "R.drawable.enemy_living_armor_03",
    "R.drawable.enemy_orc_04", "R.drawable.enemy_elvenfairy", "R.drawable.enemy_elvenwarrior",
    "R.drawable.enemy_elvenarcher", "R.drawable.enemy_elvenmage", "R.drawable.enemy_elvenking",
    "R.drawable.enemy_elvenqueen", "R.drawable.enemy_amaran", "R.drawable.enemy_aurial",
    "R.drawable.enemy_cognium", "R.drawable.enemy_copina", "R.drawable.enemy_feroxi",
    "R.drawable.enemy_kynosian", "R.drawable.enemy_noctyra", "R.drawable.enemy_opulina"
]

enemyHealth = [
    10, 20, 30, 50, 75, 100, 150, 35, 75, 135, 225, 375, 600, 90, 150, 300, 450, 675, 1000,
    180, 360, 570, 750, 1200, 999,
    1000, 1600, 2800, 4000, 5200, 8000, 15000, 10000, 15000, 20000,
    25000, 30000, 50000, 75000, 35, 75, 100, 200,
    600, 750, 1500, 2500, 5000, 8000, 12000, 50000, 75000, 100000, 150000, 200000, 250000,
    300000, 400000, 100000, 150000, 300000, 400000, 600000, 750000, 7000000,
    4000000, 8000000, 9000000,
    6500000, 9000000, 8000000, 4500000
]

enemyAttack = [
    1, 5, 5, 10, 10, 15, 25, 10, 15, 25, 45, 70, 80, 35, 60, 75, 75, 80, 90, 50, 65, 70, 80, 95,
    120, 150, 180, 200, 300, 350, 1000,
    999, 300, 500, 1000, 600, 750, 900, 1200, 10, 30, 50,
    60, 70, 80, 140, 200, 250, 350, 600, 2000,
    2400, 3000, 3750, 5000, 7500, 10000, 15000, 8000, 9000, 12000, 15000, 24000, 30000, 70000,
    60000, 80000, 60000, 90000, 80000, 100000, 70000
]

enemyStrength = [
    1, 4, 10, 15, 25, 15, 30, 15, 15, 20, 60, 65, 90, 50, 75, 65, 80, 80, 95, 65, 70, 75, 90,
    120, 120, 150, 220, 280, 350, 350, 450, 750, 300, 1000, 450, 600, 750,
    900, 1200, 10, 25, 60, 70, 80, 90, 160, 250, 300,
    500, 999, 999, 1400, 2000,
    2400, 3600, 4800, 6000, 7200, 6000, 8000, 10000, 15000, 25000, 40000, 300000, 225000, 450000,
    225000, 562500, 525000, 562500, 262500
]

enemyDefence = [
    1, 5, 8, 15, 15, 25, 40, 5, 10, 35, 50, 70, 85, 40, 70, 60, 70, 80, 85, 55, 50, 60, 85,
    100, 120, 130, 140, 300, 240, 300, 450, 2000, 200, 300, 200,
    1000, 600, 750, 1000, 10, 20, 50, 75, 75, 85, 120, 200, 350,
    1000, 850, 850, 1000, 1500, 1700, 2500, 3800, 5000, 8500, 10000,
    12000, 14000, 16000, 18000, 25000, 67500, 36000, 54000, 40500, 63000, 36000, 67500, 45000
]

enemyAttackSpeed = [
    "Slow", "Medium", "Medium", "Slow", "Slow", "Medium", "Slow", "Medium", "Medium", "Medium",
    "Fast", "Very Fast", "Very Fast", "Fast", "Slow", "Medium", "Fast", "Fast", "Very Fast",
    "Fast", "Slow", "Fast", "Slow", "Slow", "Medium", "Medium", "Fast", "Fast", "Fast",
    "Very Fast", "Very Fast", "Very Fast", "Fast", "Fast", "Fast", "Fast", "Very Fast",
    "Very Fast", "Very Fast", "Slow", "Medium", "Fast", "Fast", "Fast", "Very Fast", "Fast",
    "Fast", "Very Fast", "Fast", "Very Fast", "Very Fast", "Very Fast", "Very Fast", "Insane",
    "Very Fast", "Very Fast", "Very Fast", "Insane", "Fast", "Fast", "Very Fast", "Very Fast",
    "Insane", "Insane", "Very Fast", "Fast", "Insane", "Fast", "Very Fast", "Insane", "Insane",
    "Fast"
]

enemySlayerExp = [
    11, 12, 13, 15, 16, 18, 22, 13, 16, 21, 29, 39, 53, 21, 28, 35, 44, 56, 74, 28, 37, 49,
    60, 86, 68, 82, 117, 192, 255, 320, 475, 938, 550, 820, 1063, 1340, 1615, 2638, 3930, 13,
    18, 31, 40, 51, 60, 106, 168, 305, 473, 723, 2693, 4000, 5335, 7903, 10565, 13315, 16060,
    21545, 6210, 8960, 16810, 22310, 33360, 42260, 371885, 216060, 329210, 266285, 360785,
    282060, 336510, 243885
]

enemyWeakness = [
    "Melee", "Archery", "Melee", "Melee", "Melee", "Melee", "Melee", "Archery", "Melee",
    "Melee", "Archery", "Melee", "Archery", "Melee", "Archery", "Melee", "Archery", "Melee",
    "Archery", "Melee", "Archery", "Melee", "Melee", "Melee", "Archery", "Archery", "Archery",
    "Archery", "Archery", "Archery", "Archery", "Archery", "Melee", "Archery", "Melee", "Melee",
    "Melee", "Melee", "Melee", "Melee", "Melee", "Archery", "Archery", "Melee", "Melee",
    "Melee", "Melee", "Archery", "Archery", "Melee", "Melee", "Archery", "Archery", "Archery",
    "Melee", "Melee", "Melee", "Archery", "Archery", "Archery", "Melee", "Archery", "Melee",
    "Melee", "None", "None", "None", "None", "None", "None", "None", "None"
]

enemySlayerLevel = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 20, 30, 45, 60, 65, 75, 85, 90, 95, 99, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 130, 130, 130, 130, 130, 130, 130, 130
]

enemyDrops = [
    "Bones,1,1,Always/Feathers,1,3,Always/Egg,1,1,Uncommon/Drumstick,1,1,Rare/Thread,1,1,Common/Birds Nest,1,1,Uncommon/Common Key,1,1,Rare/Chicken Knife,1,1,Secret Rare",
    "Bones,1,1,Always/Feathers,3,6,Always/Evergreen Arrow Shafts,5,10,Uncommon/Egg,1,1,Uncommon/Thread,1,3,Common/Coins,2,10,Uncommon/Birds Nest,1,2,Uncommon/Common Chest,1,1,Rare/Raw Shrimp,1,1,Uncommon",
    "Bones,1,1,Always/Coins,1,5,Uncommon/Stone Arrowheads,5,10,Uncommon/Common Chest,1,1,Rare/Thread,2,5,Common/Raw Shrimp,1,1,Uncommon/Emerald,1,1,Super Rare",
    "Bones,1,1,Always/Coins,5,10,Uncommon/Wool,1,1,Common/Akomeric,1,1,Rare/Common Chest,1,1,Rare/Thread,2,6,Common/Raw Snail,1,1,Uncommon/Raw Shrimp,1,1,Common",
    "Bones,1,1,Always/Milk,1,1,Uncommon/Oak Arrow Shafts,15,30,Rare/Coins,5,10,Uncommon/Common Chest,1,1,Rare/Thread,5,10,Common/Raw Carp,1,1,Uncommon",
    "Bones,1,1,Always/Bacon,1,1,Common/Coins,10,20,Uncommon/Common Chest,1,1,Rare/Raw Minnows,1,1,Uncommon/Emerald,1,1,Super Rare",
    "Bones,1,1,Always/Milk,1,1,Common/Coins,20,40,Common/Hide,1,1,Common/Common Chest,1,1,Uncommon/Thread,10,15,Common/Raw Perch,1,1,Uncommon",
    "Bones,1,1,Always/Coins,5,10,Common/Evergreen Bow,1,1,Rare/Akomeric,1,1,Uncommon/Bloodroot,1,1,Rare/Hyssop,1,1,Rare/Red Chest,1,1,Super Rare/Oak,1,3,Common",
    "Bones,1,1,Always/Coins,5,10,Common/Copper Arrowheads,5,10,Rare/Akomeric,1,1,Uncommon/Bloodroot,1,1,Rare/Hyssop,1,1,Rare/Hide,1,1,Common/Red Chest,1,1,Super Rare",
    "Bones,1,1,Always/Coins,10,15,Common/Oak Bow,1,1,Rare/Red Chest,1,1,Rare/Wood,1,1,Common/Iron Ore,1,1,Common/Bloodroot,1,1,Common/Akomeric,1,1,Common",
    "Bones,1,1,Always/Coins,20,30,Common/Red Chest,1,1,Rare/Goblin Cleaver,1,1,Legendary/Bloodroot,1,1,Common/Akomeric,1,1,Common/Hyssop,1,1,Common/Ancient Rod,1,1,Secret Rare",
    "Bones,1,1,Always/Coins,50,100,Uncommon/Maple Bow,1,1,Rare/Red Chest,1,1,Uncommon/Raw Crab,1,1,Rare/Raw Lobster,1,1,Rare/Empty Vial,5,10,Common/Oak,3,5,Common/Cauldron,1,1,Secret Rare",
    "Bones,1,1,Always/Coins,60,100,Uncommon/Red Chest,1,1,Uncommon/Raw Crab,1,1,Uncommon/Raw Lobster,1,1,Rare/Emerald,1,1,Super Rare",
    "Bones,1,1,Always/Akomeric,1,1,Always/Hide,1,5,Uncommon/Leather,1,2,Rare/Iron Ore,1,1,Uncommon/Emerald,1,1,Super Rare",
    "Bones,1,1,Always/Akomeric,1,1,Always/Maple Log,1,1,Uncommon/Bloodroot,1,1,Uncommon/Stone,1,3,Uncommon/Wood,2,5,Uncommon/Rope,1,3,Rare/Mithril Boots,1,1,Super Rare/Mithril Ore,1,5,Rare",
    "Bones,1,1,Always/Empty Vial,1,3,Common/Fir Bow,1,1,Rare/Nails,1,5,Uncommon/Bloodroot,1,1,Uncommon/Fishing Potion,1,1,Rare/Honey,1,1,Uncommon",
    "Bones,1,1,Always/Empty Vial,1,3,Common/Strength Potion,1,1,Uncommon/Mithril Top,1,1,Super Rare/Mithril Greaves,1,1,Super Rare/Mithril Boots,1,1,Super Rare/Safflower,1,1,Rare",
    "Bones,1,1,Always/Tooth Necklace,1,1,Rare/Empty Vial,1,3,Common/Hyssop,1,1,Common/Safflower,1,1,Uncommon/Hide,1,10,Uncommon/Raw Catfish,1,5,Rare/Large Fishing Net,1,1,Super Rare/Fishing Net,3,5,Rare",
    "Bones,1,1,Always/Stone Tablet,1,1,Legendary/Hide,5,10,Uncommon/Thread,10,20,Uncommon/Leather,1,5,Rare/Rope,5,10,Super Rare/Wolfmint,1,1,Super Rare/Vissinel,1,1,Super Rare/Coins,200,500,Rare",
    "Bones,1,1,Always/Nefrit Chest,1,1,Super Rare/Nefrit Key,1,1,Super Rare/Iron Ore,1,5,Uncommon/Wood,1,3,Common/Emerald,1,1,Super Rare",
    "Bones,1,1,Always/Nefrit Chest,1,1,Super Rare/Nefrit Key,1,1,Super Rare/Cog,1,1,Common/Thread,5,10,Common/Hide,1,5,Uncommon/Fishing Net,1,3,Rare",
    "Bones,1,1,Always/Ram Skull,1,1,Super Rare/Fir Log,1,1,Uncommon/Nefrit Chest,1,1,Super Rare/Nefrit Key,1,1,Super Rare/Thread,5,10,Common/Yarn,1,5,Uncommon/Emerald,1,1,Rare",
    "Bones,1,1,Always/Ram Skull,1,1,Super Rare/Honey,1,1,Common/Nefrit Chest,1,1,Rare/Nefrit Key,1,1,Rare/Coins,200,500,Rare/Pot of Gold,1,1,Rare/Thread,10,20,Uncommon/Yarn,5,10,Common",
    "Bones,1,1,Always/Gold Ring,1,1,Legendary/Rhodium Ore,1,1,Super Rare/Nefrit Chest,1,1,Uncommon/Nefrit Key,1,1,Uncommon/Coins,500,1000,Rare/Thread,20,50,Rare/Oak,5,10,Common",
    "Dragon Bones,1,1,Always/Dragon Leather,1,1,Rare/Dragon Skull,1,1,Legendary/Crystal Chest,1,1,Super Rare/Dragon Ore,1,1,Super Rare/Dragon Scimitar,1,1,Super Rare/Coins,500,1000,Rare/Luck Potion,1,1,Uncommon",
    "Dragon Bones,1,1,Always/Dragon Leather,1,1,Rare/Dragon Skull,1,1,Legendary/Crystal Key,1,1,Super Rare/Dragon Ore,1,1,Super Rare/Dragon Scimitar,1,1,Super Rare/Coins,500,1000,Rare/Luck Potion,1,1,Uncommon",
    "Dragon Bones,1,1,Always/Dragon Leather,1,1,Uncommon/Dragon Skull,1,1,Legendary/Crystal Chest,1,1,Super Rare/Dragon Ore,1,2,Super Rare/Dragon Scimitar,1,1,Super Rare/Coins,500,1000,Rare/Luck Potion,1,1,Uncommon",
    "Dragon Bones,1,1,Always/Dragon Arrowheads,15,25,Rare/Dragon Leather,1,1,Uncommon/Dragon Skull,1,1,Legendary/Golden Necklace,1,1,Legendary/Crystal Key,1,1,Super Rare/Dragon Ore,1,2,Super Rare/Dragon Scimitar,1,1,Super Rare/Coins,1000,2500,Rare",
    "Dragon Bones,1,1,Always/Dragon Leather,1,2,Uncommon/Dragon Skull,1,1,Legendary/Dragon Tail,1,1,Legendary/Golden Necklace,1,1,Legendary/Crystal Chest,1,1,Rare/Dragon Ore,1,2,Super Rare/Dragon Wing Battleaxe,1,1,Legendary/Dragon Scimitar,1,1,Super Rare/Coins,1000,2500,Rare",
    "Dragon Bones,1,1,Always/Dragon Leather,1,2,Common/Dragon Skull,1,1,Legendary/Dragon Tail,1,1,Legendary/Golden Scarab,1,1,Legendary/Crystal Key,1,1,Rare/Dragon Ore,1,1,Rare/Trident of the Seas,1,1,Legendary/Dragon Wing Battleaxe,1,1,Super Rare/Dragon Scimitar,1,1,Super Rare/Coins,2500,5000,Rare",
    "Big Dragon Bones,1,1,Always/Dragon Leather,2,5,Common/Dragon Skull,1,1,Legendary/Dragon Tail,1,1,Legendary/Golden Scarab,1,1,Legendary/Crystal Key,1,1,Rare/Dragon Ore,1,2,Rare/Dragon Wing Battleaxe,1,1,Super Rare/Dragon Scimitar,1,1,Rare/Coins,5000,10000,Rare/Kings Chest,1,1,Mythical/Kings Key,1,1,Mythical",
    "Big Dragon Bones,1,2,Always/Dragon Leather,5,10,Common/Dragon Skull,1,1,Super Rare/Dragon Tail,1,1,Super Rare/Golden Scarab,1,1,Super Rare/Queens Chest,1,1,Mythical/Queens Key,1,1,Mythical/Dragon Ore,2,5,Rare/Dragon Scimitar,1,1,Rare/Coins,5000,10000,Rare",
    "Bones,5,5,Always/Coins,1000,2500,Always/Cedar Log,1,1,Rare/Feathers,10,30,Always/Egg,5,10,Uncommon/Chicken Knife,1,1,Legendary/Farm Chest,1,1,Legendary/Farmour Fragment,1,1,Legendary",
    "Bones,5,5,Always/Coins,1500,2500,Always/Feathers,5,10,Always/Egg,1,3,Uncommon/Thread,5,10,Common/Birds Nest,2,5,Uncommon/Farm Key,1,1,Legendary/Dagger Fragment,1,1,Mythical",
    "Bones,5,5,Always/Coins,2000,3000,Always/Platinum Ore,1,1,Rare/Emerald,1,3,Rare/Farm Chest,1,1,Super Rare/Farmour Fragment,1,2,Legendary",
    "Bones,5,5,Always/Coins,2500,3000,Always/Wool,2,5,Common/Farm Key,1,1,Super Rare/Dagger Fragment,1,3,Mythical",
    "Bones,5,5,Always/Coins,3000,4000,Always/Cedar Bow,1,1,Super Rare/Milk,2,5,Uncommon/Farm Chest,1,1,Rare/Farmour Fragment,1,3,Legendary",
    "Bones,5,5,Always/Coins,3500,4500,Always/Bacon,2,5,Common/Farm Key,1,1,Rare/Dagger Fragment,2,5,Mythical",
    "Bones,5,5,Always/Coins,4000,5000,Always/Hide,2,5,Common/Ginkgo Bow,1,1,Legendary/Ginkgo Log,1,1,Uncommon/Farm Chest,1,2,Rare/Farm Key,1,2,Rare/Farmour Fragment,2,5,Legendary/Dagger Fragment,1,1,Legendary",
    "Wood,1,1,Always/Hide,1,1,Uncommon/Redwood Log,1,1,Super Rare/Thread,1,3,Common/Common Key,1,1,Rare/Oak,1,3,Uncommon/Iron Ore,1,3,Uncommon",
    "Akomeric,1,1,Common/Mushroom,1,1,Common/Stone,1,5,Common/Common Key,1,1,Rare/Common Chest,1,1,Rare",
    "Bones,1,1,Always/Bloodroot,1,1,Common/Red Chest,1,1,Rare/Red Key,1,1,Rare/Thread,10,20,Common/Yarn,1,5,Common/Ruby,1,1,Rare/Gold Ore,1,1,Legendary/Sextant,1,1,Super Rare/Mystery Egg,1,1,Secret Rare",
    "Hyssop,1,1,Common/Red Key,1,1,Rare/Red Chest,1,1,Rare/Book of Aroon,1,1,Legendary/Thread,25,50,Rare/Hide,10,25,Uncommon/Iron Ore,1,3,Common",
    "Bones,1,1,Always/Thread,10,25,Common/Sage Leaf,1,5,Common/Wood,10,20,Uncommon/Mithril Ore,5,10,Rare/Iron Ore,10,25,Rare/Barbarian Boots,1,1,Legendary/Barbarian Gloves,1,1,Legendary/Barbarian Top,1,1,Legendary/Barbarian Helm,1,1,Legendary/Barbarian Greaves,1,1,Legendary/Barbarian Cape,1,1,Legendary",
    "Bones,1,1,Always/Safflower,1,1,Common/Sunburst Flower,1,1,Super Rare/Spiked Chest,1,1,Rare/Spiked Key,1,1,Rare/Hide,10,25,Uncommon/Mithril Ore,1,5,Rare/Iron Ore,10,25,Common/Yarn,5,10,Rare/Emerald,1,1,Rare",
    "Bones,1,1,Always/Sage Leaf,1,1,Common/Redwood Bow,1,1,Super Rare/Mithril Ore,5,10,Uncommon/Rope,5,10,Uncommon/Cog,1,1,Rare/Iron Ore,5,10,Common/Blue Silk,15,20,Super Rare",
    "Bones,1,5,Always/Thread,10,15,Common/Vissinel,1,1,Common/Wood,10,20,Uncommon/Mithril Ore,5,10,Rare/Iron Ore,10,20,Rare/Necromancer Boots,1,1,Legendary/Necromancer Gloves,1,1,Legendary/Necromancer Top,1,1,Legendary/Necromancer Helm,1,1,Legendary/Necromancer Greaves,1,1,Legendary/Necromancer Cape,1,1,Legendary",
    "Bones,1,1,Always/Wolfmint,1,1,Common/Ember Fern,1,1,Super Rare/Chestnut Log,1,1,Rare/Crystal Chest,1,2,Super Rare/Thread,25,50,Uncommon/Rope,10,15,Rare/Yarn,5,10,Rare/Gold Ring,1,1,Legendary/Iron Ore,10,20,Common",
    "Bones,1,1,Always/Vissinel,1,1,Always/Crystal Key,1,1,Rare/Chestnut Bow,1,1,Super Rare/Stone Tablet,1,1,Legendary/Gold Ring,1,1,Legendary/Thread,50,100,Uncommon/Rope,15,20,Rare/Blue Thread,1,1,Common",
    "Bones,5,5,Always/Vissinel,3,5,Always/Crystal Chest,1,3,Rare/Ancient Dagger,1,1,Mythical/Blue Thread,3,5,Common/Blue Silk,1,3,Uncommon/Coin Purse,1,1,Super Rare/Golden Necklace,1,1,Super Rare/Wine,3,5,Rare",
    "Coins,100,200,Always/Queens Chest,1,1,Super Rare/Wood,10,20,Always/Hide,10,20,Uncommon/Thread,10,30,Common/Queens Armour Fragment,1,1,Legendary",
    "Coins,150,250,Always/Queens Key,1,1,Super Rare/Golden Necklace,1,1,Super Rare/Wine,3,5,Rare/Queens Armour Fragment,1,2,Legendary/Golden Scarab,1,1,Super Rare",
    "Coins,250,500,Always/Queens Chest,1,1,Rare/Golden Necklace,1,1,Super Rare/Wine,3,5,Rare/Wolfmint,1,1,Common/Ember Fern,1,1,Rare/Thread,50,100,Uncommon/Gold Ring,1,1,Legendary/Queens Armour Fragment,1,3,Legendary",
    "Coins,500,750,Always/Queens Key,1,1,Rare/Big Dragon Bones,2,3,Always/Dragon Leather,2,5,Common/Dragon Skull,1,1,Legendary/Dragon Tail,1,1,Legendary/Golden Scarab,1,1,Legendary/Queens Weapon Fragment,1,1,Legendary",
    "Sunburst Flower,1,1,Always/Coins,750,1000,Always/Kings Chest,1,1,Super Rare/Kings Armour Fragment,1,1,Legendary",
    "Sunburst Flower,1,1,Always/Coins,1000,1500,Always/Kings Key,1,1,Super Rare/Kings Armour Fragment,1,2,Legendary",
    "Ember Fern,1,1,Always/Coins,2000,3000,Always/Kings Chest,1,1,Rare/Kings Armour Fragment,1,3,Legendary",
    "Ember Fern,1,1,Always/Coins,3000,5000,Always/Kings Key,1,1,Rare/Kings Weapon Fragment,1,1,Legendary",
    "Coins,8000,10000,Always/Elven Armour Fragment,1,1,Legendary/Blue Silk,5,10,Common/Compass,1,1,Rare/Treasure Map,1,1,Rare/Extreme Power Potion,1,1,Rare/Safflower,1,3,Uncommon/Dragon Tail,1,3,Legendary/Elven Crystal,1,1,Rare",
    "Coins,10000,15000,Always/Elven Weapon Fragment,1,1,Legendary/Compass,1,3,Rare/Sunburst Flower,1,3,Uncommon/Dragon Skull,1,3,Legendary/Raw Ray,1,1,Common/Pirates Hat,1,1,Super Rare/Elven Crystal,1,3,Rare",
    "Coins,15000,20000,Always/Elven Armour Fragment,1,1,Super Rare/Elven Arrows,1,1,Super Rare/Sunburst Flower,3,5,Uncommon/Crab,3,5,Common/Dragon Plate,15,20,Super Rare/Raw Shark,1,1,Common/Golden Scarab,1,3,Super Rare/Elven Crystal,1,1,Uncommon",
    "Coins,20000,25000,Always/Elven Weapon Fragment,1,1,Super Rare/Sunburst Flower,5,10,Uncommon/Dragon Leather,15,20,Super Rare/Raw Octopus,1,1,Common/Dragon Ore,1,3,Super Rare/Dragon Platter,1,1,Rare/Elven Crystal,1,3,Uncommon",
    "Coins,30000,50000,Always/Elven Armour Fragment,1,2,Uncommon/Ember Fern,3,5,Uncommon/Dragon Tail,5,10,Legendary/Dragon Ore,3,5,Super Rare/Golden Scarab,3,5,Super Rare/Dragon Platter,3,5,Rare/Elven Crystal,1,1,Common",
    "Coins,50000,100000,Always/Elven Weapon Fragment,1,2,Uncommon/Ember Fern,15,20,Uncommon/Dragon Skull,5,10,Legendary/Queens Weapon Fragment,1,1,Super Rare/Queens Armour Fragment,1,1,Super Rare/Dragon Platter,5,10,Uncommon/Elven Crystal,1,3,Common",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always",
    "Gold Coin,5,10,Always"
]

enemyArea = [
    "Farm", "Farm", "Farm", "Farm", "Farm", "Farm", "Farm",
    "Abandoned Village", "Abandoned Village", "Abandoned Village", "Abandoned Village", "Abandoned Village", "Abandoned Village",
    "Caves", "Caves", "Caves", "Caves", "Caves", "Caves", 
    "Great Plains", "Great Plains", "Great Plains", "Great Plains", "Great Plains",
    "Dragon Island", "Dragon Island", "Dragon Island", "Dragon Island", "Dragon Island", "Dragon Island", "Dragon Island", "Dragon Island",
    "Elite Farm", "Elite Farm", "Elite Farm", "Elite Farm", "Elite Farm", "Elite Farm", "Elite Farm",
    "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon",
    "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon", "Slayer Dungeon",
    "Realm of the Kings", "Realm of the Kings", "Realm of the Kings", "Realm of the Kings",
    "Realm of the Kings", "Realm of the Kings", "Realm of the Kings", "Realm of the Kings",
    "Immortal Realm", "Immortal Realm", "Immortal Realm", "Immortal Realm", "Immortal Realm", "Immortal Realm",
    "Kingdom of the Gods", "Kingdom of the Gods", "Kingdom of the Gods", "Kingdom of the Gods",
    "Kingdom of the Gods", "Kingdom of the Gods", "Kingdom of the Gods", "Kingdom of the Gods"
]

# ------------------------------------------------------------------
# Create and write the CSV file. We'll call it 'enemy_data.csv'.
# ------------------------------------------------------------------

def convert_enemies_to_csv():
    with open("enemy_data.csv", mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)

        # Write the header row
        writer.writerow([
            "Enemy Name", "Enemy Icon", "Enemy Health", "Enemy Attack", "Enemy Strength",
            "Enemy Defence", "Enemy Attack Speed", "Enemy Slayer Exp", "Enemy Weakness",
            "Enemy Slayer Level", "Enemy Drops", "Enemy Area"
        ])

        # Write each enemy row
        for i in range(len(enemyNames)):
            row_data = [
                enemyNames[i],
                enemyIcons[i],
                enemyHealth[i],
                enemyAttack[i],
                enemyStrength[i],
                enemyDefence[i],
                enemyAttackSpeed[i],
                enemySlayerExp[i],
                enemyWeakness[i],
                enemySlayerLevel[i],
                enemyDrops[i],
                enemyArea[i]
            ]
            writer.writerow(row_data)

    print("enemy_data.csv has been created successfully!")

if __name__ == "__main__":
    convert_enemies_to_csv()
