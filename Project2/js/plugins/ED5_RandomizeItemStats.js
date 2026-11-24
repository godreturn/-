//=============================================================================
// RPG Maker MZ - ED5 Procedural Item Generator Plugin
//=============================================================================

/*:
 * @target MZ MV
 * @plugindesc v2.3 Generates items with random prefixes and suffixes - 60 built-in modifiers (Diablo-style loot system)
 * * @author ED5 (ChigooX)
 * @url https://itch.io/chigoox/ED5_RandomizeItemStats
 *
 * @command GenerateWeapon
 * @text Generate Random Weapon
 * @desc Creates a weapon with random prefixes and suffixes based on settings
 *
 * @arg baseWeaponId
 * @text Base Weapon ID
 * @desc The ID of the base weapon to use
 * @type weapon
 * @default 1
 *
 * @arg prefixCategories
 * @text Prefix Categories
 * @desc Which prefix categories to use (leave empty for random)
 * @type string[]
 * @default []
 *
 * @arg suffixCategories
 * @text Suffix Categories
 * @desc Which suffix categories to use (leave empty for random)
 * @type string[]
 * @default []
 *
 * @command GenerateArmor
 * @text Generate Random Armor
 * @desc Creates armor with random prefixes and suffixes based on settings
 *
 * @arg baseArmorId
 * @text Base Armor ID
 * @desc The ID of the base armor to use
 * @type armor
 * @default 1
 *
 * @arg prefixCategories
 * @text Prefix Categories
 * @desc Which prefix categories to use (leave empty for random)
 * @type string[]
 * @default []
 *
 * @arg suffixCategories
 * @text Suffix Categories
 * @desc Which suffix categories to use (leave empty for random)
 * @type string[]
 * @default []
 *
 * @command GenerateItem
 * @text Generate Random Item (Consumable)
 * @desc Creates a consumable item with random prefixes and suffixes based on settings
 *
 * @arg baseItemId
 * @text Base Item ID
 * @desc The ID of the base item to use
 * @type item
 * @default 1
 *
 * @arg prefixCategories
 * @text Prefix Categories
 * @desc Which prefix categories to use (leave empty for random)
 * @type string[]
 * @default []
 *
 * @arg suffixCategories
 * @text Suffix Categories
 * @desc Which suffix categories to use (leave empty for random)
 * @type string[]
 * @default []
 *
 * @command DeleteWeapon
 * @text Delete Generated Weapon
 * @desc Removes a procedurally generated weapon from the game data and inventory
 *
 * @arg weaponId
 * @text Weapon ID
 * @desc The ID of the generated weapon to delete
 * @type number
 * @default 0
 *
 * @command DeleteArmor
 * @text Delete Generated Armor
 * @desc Removes a procedurally generated armor from the game data and inventory
 *
 * @arg armorId
 * @text Armor ID
 * @desc The ID of the generated armor to delete
 * @type number
 * @default 0
 *
 * @command DeleteItem
 * @text Delete Generated Item
 * @desc Removes a procedurally generated item from the game data and inventory
 *
 * @arg itemId
 * @text Item ID
 * @desc The ID of the generated item to delete
 * @type number
 * @default 0
 *
 * @param Prefixes
 * @text Prefix Configuration
 * @desc Configure prefixes that modify item stats and parameters (30 defaults included)
 * @type struct<Modifier>[]
 * @default ["{\"name\":\"Sturdy\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.3\",\"rarity\":\"1\"}","{\"name\":\"Fine\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"2\\\",\\\"2\\\",\\\"0\\\",\\\"0\\\",\\\"1\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.4\",\"rarity\":\"1\"}","{\"name\":\"Superior\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"4\\\",\\\"0\\\",\\\"2\\\",\\\"0\\\",\\\"2\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.6\",\"rarity\":\"2\"}","{\"name\":\"Masterwork\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"5\\\",\\\"3\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"Flawless\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"6\\\",\\\"6\\\",\\\"4\\\",\\\"4\\\",\\\"2\\\",\\\"3\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.5\",\"rarity\":\"3\"}","{\"name\":\"Legendary\",\"category\":\"quality\",\"params\":\"[\\\"50\\\",\\\"20\\\",\\\"8\\\",\\\"8\\\",\\\"6\\\",\\\"6\\\",\\\"3\\\",\\\"5\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"3.5\",\"rarity\":\"4\"}","{\"name\":\"Pristine\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"5\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"4\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.8\",\"rarity\":\"2\"}","{\"name\":\"Artisan\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"3\\\",\\\"2\\\",\\\"2\\\",\\\"1\\\",\\\"1\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.5\",\"rarity\":\"1\"}","{\"name\":\"Exquisite\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"4\\\",\\\"3\\\",\\\"3\\\",\\\"2\\\",\\\"2\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.2\",\"rarity\":\"3\"}","{\"name\":\"Crude\",\"category\":\"quality\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"-2\\\",\\\"-1\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"0.5\",\"rarity\":\"1\"}","{\"name\":\"Iron\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.5\",\"rarity\":\"1\"}","{\"name\":\"Steel\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"2\\\",\\\"5\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"Bronze\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"1\\\",\\\"2\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.3\",\"rarity\":\"1\"}","{\"name\":\"Mithril\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"6\\\",\\\"3\\\",\\\"0\\\",\\\"2\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"3.0\",\"rarity\":\"3\"}","{\"name\":\"Adamantine\",\"category\":\"material\",\"params\":\"[\\\"30\\\",\\\"0\\\",\\\"5\\\",\\\"10\\\",\\\"0\\\",\\\"5\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"4.0\",\"rarity\":\"4\"}","{\"name\":\"Silver\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"10\\\",\\\"0\\\",\\\"2\\\",\\\"4\\\",\\\"2\\\",\\\"0\\\",\\\"2\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.2\",\"rarity\":\"2\"}","{\"name\":\"Gold\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"1\\\",\\\"1\\\",\\\"1\\\",\\\"1\\\",\\\"0\\\",\\\"5\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.5\",\"rarity\":\"2\"}","{\"name\":\"Platinum\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"4\\\",\\\"2\\\",\\\"3\\\",\\\"0\\\",\\\"3\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"3.2\",\"rarity\":\"3\"}","{\"name\":\"Obsidian\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"1\\\",\\\"5\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"Crystal\",\"category\":\"material\",\"params\":\"[\\\"0\\\",\\\"20\\\",\\\"0\\\",\\\"0\\\",\\\"6\\\",\\\"4\\\",\\\"0\\\",\\\"2\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.8\",\"rarity\":\"3\"}","{\"name\":\"Strong\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.3\",\"rarity\":\"1\"}","{\"name\":\"Mighty\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"8\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.5\",\"rarity\":\"2\"}","{\"name\":\"Swift\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"2\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.4\",\"rarity\":\"1\"}","{\"name\":\"Deadly\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"6\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"4\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:2:0.1\\\"]\",\"priceModifier\":\"1.8\",\"rarity\":\"2\"}","{\"name\":\"Brutal\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"10\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"-1\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.6\",\"rarity\":\"2\"}","{\"name\":\"Arcane\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"15\\\",\\\"0\\\",\\\"0\\\",\\\"7\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.7\",\"rarity\":\"2\"}","{\"name\":\"Blessed\",\"category\":\"modifier\",\"params\":\"[\\\"20\\\",\\\"10\\\",\\\"2\\\",\\\"2\\\",\\\"2\\\",\\\"2\\\",\\\"0\\\",\\\"3\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.0\",\"rarity\":\"3\"}","{\"name\":\"Cursed\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"12\\\",\\\"0\\\",\\\"8\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.5\",\"rarity\":\"2\"}","{\"name\":\"Vicious\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"7\\\",\\\"-2\\\",\\\"4\\\",\\\"0\\\",\\\"2\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.4\",\"rarity\":\"1\"}","{\"name\":\"Ethereal\",\"category\":\"modifier\",\"params\":\"[\\\"0\\\",\\\"25\\\",\\\"0\\\",\\\"0\\\",\\\"8\\\",\\\"5\\\",\\\"3\\\",\\\"4\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.5\",\"rarity\":\"3\"}"]
 *
 * @param Suffixes
 * @text Suffix Configuration
 * @desc Configure suffixes that add special effects - elements, states, traits (30 defaults included)
 * @type struct<Modifier>[]
 * @default ["{\"name\":\"of Flames\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[\\\"2\\\"]\",\"attackStates\":\"[\\\"10:15\\\"]\",\"traits\":\"[]\",\"priceModifier\":\"1.8\",\"rarity\":\"2\"}","{\"name\":\"of Frost\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[\\\"3\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"11:2:0.8\\\"]\",\"priceModifier\":\"1.8\",\"rarity\":\"2\"}","{\"name\":\"of Lightning\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"2\\\",\\\"0\\\"]\",\"elements\":\"[\\\"4\\\"]\",\"attackStates\":\"[\\\"5:25\\\"]\",\"traits\":\"[]\",\"priceModifier\":\"2.2\",\"rarity\":\"3\"}","{\"name\":\"of the Storm\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"10\\\",\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\"]\",\"elements\":\"[\\\"4\\\"]\",\"attackStates\":\"[\\\"5:20\\\"]\",\"traits\":\"[\\\"11:4:0.5\\\"]\",\"priceModifier\":\"2.5\",\"rarity\":\"3\"}","{\"name\":\"of the Inferno\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"8\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[\\\"2\\\"]\",\"attackStates\":\"[\\\"10:30\\\"]\",\"traits\":\"[\\\"11:2:0.5\\\",\\\"11:3:1.5\\\"]\",\"priceModifier\":\"3.0\",\"rarity\":\"4\"}","{\"name\":\"of the Glacier\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"6\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[\\\"3\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"11:3:0.5\\\"]\",\"priceModifier\":\"2.8\",\"rarity\":\"3\"}","{\"name\":\"of Wind\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"2\\\",\\\"0\\\",\\\"4\\\",\\\"2\\\"]\",\"elements\":\"[\\\"7\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.9\",\"rarity\":\"2\"}","{\"name\":\"of Earth\",\"category\":\"elemental\",\"params\":\"[\\\"30\\\",\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"0\\\",\\\"3\\\",\\\"-1\\\",\\\"0\\\"]\",\"elements\":\"[\\\"6\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"1.9\",\"rarity\":\"2\"}","{\"name\":\"of Light\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"4\\\",\\\"0\\\",\\\"3\\\"]\",\"elements\":\"[\\\"8\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"11:9:0.7\\\"]\",\"priceModifier\":\"2.3\",\"rarity\":\"3\"}","{\"name\":\"of Darkness\",\"category\":\"elemental\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"6\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[\\\"9\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"11:8:0.7\\\"]\",\"priceModifier\":\"2.3\",\"rarity\":\"3\"}","{\"name\":\"of the Bear\",\"category\":\"bestial\",\"params\":\"[\\\"50\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"-2\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.05\\\"]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"of the Wolf\",\"category\":\"bestial\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:2:0.08\\\"]\",\"priceModifier\":\"1.9\",\"rarity\":\"2\"}","{\"name\":\"of the Eagle\",\"category\":\"bestial\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"2\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"3\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:0:0.1\\\",\\\"22:1:0.05\\\"]\",\"priceModifier\":\"2.1\",\"rarity\":\"2\"}","{\"name\":\"of the Dragon\",\"category\":\"bestial\",\"params\":\"[\\\"80\\\",\\\"40\\\",\\\"6\\\",\\\"6\\\",\\\"6\\\",\\\"6\\\",\\\"0\\\",\\\"5\\\"]\",\"elements\":\"[\\\"2\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"11:2:0.5\\\"]\",\"priceModifier\":\"4.5\",\"rarity\":\"4\"}","{\"name\":\"of the Serpent\",\"category\":\"bestial\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[\\\"4:30\\\"]\",\"traits\":\"[]\",\"priceModifier\":\"1.8\",\"rarity\":\"2\"}","{\"name\":\"of the Tiger\",\"category\":\"bestial\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"6\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\",\\\"2\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:2:0.12\\\"]\",\"priceModifier\":\"2.2\",\"rarity\":\"3\"}","{\"name\":\"of the Turtle\",\"category\":\"bestial\",\"params\":\"[\\\"60\\\",\\\"0\\\",\\\"0\\\",\\\"8\\\",\\\"0\\\",\\\"6\\\",\\\"-3\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.08\\\"]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"of the Falcon\",\"category\":\"bestial\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"4\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"6\\\",\\\"4\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"61:0:0.25\\\"]\",\"priceModifier\":\"2.5\",\"rarity\":\"3\"}","{\"name\":\"of the Lion\",\"category\":\"bestial\",\"params\":\"[\\\"40\\\",\\\"0\\\",\\\"5\\\",\\\"3\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"3\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:0:0.08\\\"]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"of the Phoenix\",\"category\":\"bestial\",\"params\":\"[\\\"100\\\",\\\"50\\\",\\\"0\\\",\\\"0\\\",\\\"5\\\",\\\"5\\\",\\\"0\\\",\\\"5\\\"]\",\"elements\":\"[\\\"2\\\"]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.1\\\",\\\"22:8:0.05\\\"]\",\"priceModifier\":\"4.0\",\"rarity\":\"4\"}","{\"name\":\"of Power\",\"category\":\"legendary\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"10\\\",\\\"0\\\",\\\"5\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[]\",\"priceModifier\":\"2.0\",\"rarity\":\"2\"}","{\"name\":\"of the Gods\",\"category\":\"legendary\",\"params\":\"[\\\"60\\\",\\\"30\\\",\\\"5\\\",\\\"5\\\",\\\"5\\\",\\\"5\\\",\\\"3\\\",\\\"5\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.05\\\",\\\"22:8:0.03\\\"]\",\"priceModifier\":\"3.5\",\"rarity\":\"4\"}","{\"name\":\"of Eternity\",\"category\":\"legendary\",\"params\":\"[\\\"100\\\",\\\"100\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"8\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.15\\\",\\\"22:8:0.1\\\"]\",\"priceModifier\":\"4.0\",\"rarity\":\"4\"}","{\"name\":\"of Devastation\",\"category\":\"legendary\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"15\\\",\\\"0\\\",\\\"10\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:2:0.2\\\"]\",\"priceModifier\":\"3.0\",\"rarity\":\"3\"}","{\"name\":\"of Protection\",\"category\":\"legendary\",\"params\":\"[\\\"80\\\",\\\"0\\\",\\\"0\\\",\\\"12\\\",\\\"0\\\",\\\"10\\\",\\\"0\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.06\\\"]\",\"priceModifier\":\"2.8\",\"rarity\":\"3\"}","{\"name\":\"of Haste\",\"category\":\"legendary\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"0\\\",\\\"10\\\",\\\"5\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"61:0:0.5\\\"]\",\"priceModifier\":\"3.2\",\"rarity\":\"4\"}","{\"name\":\"of Annihilation\",\"category\":\"legendary\",\"params\":\"[\\\"0\\\",\\\"0\\\",\\\"18\\\",\\\"0\\\",\\\"12\\\",\\\"0\\\",\\\"-2\\\",\\\"0\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:2:0.15\\\"]\",\"priceModifier\":\"3.0\",\"rarity\":\"3\"}","{\"name\":\"of Wisdom\",\"category\":\"legendary\",\"params\":\"[\\\"0\\\",\\\"60\\\",\\\"0\\\",\\\"0\\\",\\\"12\\\",\\\"8\\\",\\\"0\\\",\\\"4\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:8:0.08\\\"]\",\"priceModifier\":\"2.8\",\"rarity\":\"3\"}","{\"name\":\"of Champions\",\"category\":\"legendary\",\"params\":\"[\\\"50\\\",\\\"25\\\",\\\"6\\\",\\\"4\\\",\\\"4\\\",\\\"4\\\",\\\"2\\\",\\\"4\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:0:0.1\\\",\\\"22:2:0.1\\\"]\",\"priceModifier\":\"3.5\",\"rarity\":\"4\"}","{\"name\":\"of the Immortal\",\"category\":\"legendary\",\"params\":\"[\\\"150\\\",\\\"0\\\",\\\"0\\\",\\\"8\\\",\\\"0\\\",\\\"8\\\",\\\"0\\\",\\\"6\\\"]\",\"elements\":\"[]\",\"attackStates\":\"[]\",\"traits\":\"[\\\"22:7:0.2\\\"]\",\"priceModifier\":\"4.2\",\"rarity\":\"4\"}"]
 *
 * @param RarityProbabilities
 * @text Rarity Probabilities
 * @desc Probability for each rarity level (1-4)
 * @type struct<RarityProb>[]
 * @default ["{\"rarity\":\"1\",\"probability\":\"0.50\"}","{\"rarity\":\"2\",\"probability\":\"0.30\"}","{\"rarity\":\"3\",\"probability\":\"0.15\"}","{\"rarity\":\"4\",\"probability\":\"0.05\"}"]
 *
 * @param GlobalChanceMultiplier
 * @text Global Chance Multiplier
 * @desc Global multiplier for all prefix/suffix appearance chances
 * @type number
 * @decimals 2
 * @min 0.01
 * @max 5.00
 * @default 0.1
 *
 * @param MaxPrefixes
 * @text Max Prefixes
 * @desc Maximum number of prefixes per item
 * @type number
 * @min 1
 * @max 5
 * @default 3
 *
 * @param MaxSuffixes
 * @text Max Suffixes
 * @desc Maximum number of suffixes per item
 * @type number
 * @min 0
 * @max 3
 * @default 1
 *
 * @param EnableDebugLog
 * @text Enable Debug Logging
 * @desc Show detailed console logs for debugging
 * @type boolean
 * @default false
 *
 * @param PrefixOrder
 * @text Prefix Category Order
 * @desc Order in which prefix categories appear in item names (comma-separated)
 * @type text
 * @default quality,material,modifier
 *
 * @help
 * ============================================================================
 * ED5 Procedural Item Generator v2.1
 * ============================================================================
 * 
 * This plugin creates Diablo-style randomized loot with prefixes and suffixes.
 * Items can have stat bonuses, elemental damage, special traits, and more!
 * 
 * Compatible with BOTH RPG Maker MZ and RPG Maker MV!
 *
 * ----------------------------------------------------------------------------
 * Features:
 * ----------------------------------------------------------------------------
 * - 60 built-in modifiers (30 prefixes, 30 suffixes)
 * - Prefix system (quality, material, modifier categories)
 * - Suffix system (elemental, bestial, legendary categories)
 * - Element support (Fire, Ice, Thunder, etc.)
 * - Attack state support (Poison, Burn, Stun, etc.)
 * - Trait system (Critical rate, HP regen, etc.)
 * - Rarity-based color coding (Common, Uncommon, Rare, Legendary)
 * - Save/Load persistent items
 * - Dual compatibility (MZ & MV)
 *
 * ----------------------------------------------------------------------------
 * RPG Maker MZ - Plugin Commands:
 * ----------------------------------------------------------------------------
 * Use the event editor Plugin Command interface:
 * 
 * > Generate Random Weapon
 *   - Base Weapon ID: 1
 *   - Prefix Categories: (leave empty for random)
 *   - Suffix Categories: (leave empty for random)
 * 
 * > Generate Random Armor
 *   - Base Armor ID: 1
 *   - Prefix Categories: (leave empty for random)
 *   - Suffix Categories: (leave empty for random)
 *
 * ----------------------------------------------------------------------------
 * RPG Maker MV - Plugin Commands:
 * ----------------------------------------------------------------------------
 * Use the event editor Script command with these formats:
 * 
 * GenerateWeapon 1
 * GenerateWeapon 1 quality,material elemental
 * 
 * GenerateArmor 1
 * GenerateArmor 1 modifier bestial
 * 
 * Format: CommandName BaseItemID [PrefixCategories] [SuffixCategories]
 * Categories are comma-separated (no spaces)
 *
 * ----------------------------------------------------------------------------
 * Script Calls (MZ & MV Compatible):
 * ----------------------------------------------------------------------------
 * // Generate weapon with random modifiers
 * ED5_ProcGen.createWeapon(1, [], []);
 * 
 * // Generate weapon with specific prefix/suffix categories
 * ED5_ProcGen.createWeapon(1, ["quality", "material"], ["elemental"]);
 * 
 * // Generate armor with random modifiers
 * ED5_ProcGen.createArmor(1, [], []);
 * 
 * // Generate armor with specific categories
 * ED5_ProcGen.createArmor(1, ["modifier"], ["bestial", "legendary"]);
 *
 * // Generate a consumable ITEM (potion, food...) with random modifiers.
 * // HP/MP entries in the modifier's Parameters become Recover HP/MP effects.
 * ED5_ProcGen.createItem(1, [], []);
 * ED5_ProcGen.createItem(1, ["quality"], []);
 *
 * // Every create* call returns the generated database entry (or the base
 * // item when nothing rolled) and adds one copy to the party inventory.
 * var sword = ED5_ProcGen.createWeapon(1, [], []);
 * console.log(sword.id, sword.name);
 *
 * // Remove a generated entry again (also unequips it from every actor)
 * ED5_ProcGen.deleteWeapon(sword.id);
 * ED5_ProcGen.deleteArmor(armorId);
 * ED5_ProcGen.deleteItem(itemId);
 *
 * MV plugin commands for items: GenerateItem 1 [prefixCats] [suffixCats],
 * DeleteWeapon id, DeleteArmor id, DeleteItem id.
 *
 * ----------------------------------------------------------------------------
 * Modifier Categories:
 * ----------------------------------------------------------------------------
 * Prefixes (30 total):
 *   - quality: Sturdy, Fine, Superior, Masterwork, Flawless, etc.
 *   - material: Iron, Steel, Bronze, Mithril, Adamantine, etc.
 *   - modifier: Strong, Mighty, Swift, Deadly, Brutal, etc.
 * 
 * Suffixes (30 total):
 *   - elemental: of Flames, of Frost, of Lightning, etc.
 *   - bestial: of the Bear, of the Wolf, of the Dragon, etc.
 *   - legendary: of Power, of the Gods, of Eternity, etc.
 *
 * ----------------------------------------------------------------------------
 * Parameter Arrays (8 values):
 * ----------------------------------------------------------------------------
 * Index 0: Max HP
 * Index 1: Max MP
 * Index 2: ATK (Attack)
 * Index 3: DEF (Defense)
 * Index 4: MAT (Magic Attack)
 * Index 5: MDF (Magic Defense)
 * Index 6: AGI (Agility)
 * Index 7: LUK (Luck)
 *
 * ----------------------------------------------------------------------------
 * Elements (default RPG Maker):
 * ----------------------------------------------------------------------------
 * 1: Physical, 2: Fire, 3: Ice, 4: Thunder, 5: Water, 6: Earth, 
 * 7: Wind, 8: Light, 9: Darkness
 *
 * ----------------------------------------------------------------------------
 * Attack States Format:
 * ----------------------------------------------------------------------------
 * "stateId:chance" - Example: "4:25" means 25% chance to inflict state 4
 *
 * ----------------------------------------------------------------------------
 * Trait Format:
 * ----------------------------------------------------------------------------
 * "code:dataId:value" - Example: "22:2:0.1" means +10% critical rate
 * Common trait codes (RPG Maker MZ/MV engine values):
 *   11: Element Rate (dataId=element, value=multiplier)
 *   13: State Rate (dataId=state, value=multiplier)
 *   14: State Immunity (dataId=state, value unused)
 *   21: Parameter Rate (dataId=param 0-7, value=multiplier, 1.1 = +10%)
 *   22: Ex-Parameter (dataId=xparam 0-9, value=bonus rate)
 *       dataId 0=Hit, 1=Evasion, 2=Critical, 3=Crit Evasion,
 *              4=Magic Evasion, 5=Magic Reflect, 6=Counter,
 *              7=HP Regen, 8=MP Regen, 9=TP Regen
 *   23: Sp-Parameter (dataId=sparam 0-9, value=multiplier)
 *   31: Attack Element (dataId=element, value unused)
 *   32: Attack State (dataId=state, value=chance)
 *   33: Attack Speed (dataId unused, value=speed)
 *   34: Attack Times+ (dataId unused, value=extra)
 *   41: Add Skill Type (dataId=skillTypeId, value unused)
 *   42: Seal Skill Type (dataId=skillTypeId, value unused)
 *   43: Add Skill (dataId=skillId, value unused)
 *   44: Seal Skill (dataId=skillId, value unused)
 *   61: Action Times+ (dataId unused, value=chance of extra action)
 *
 * Worked examples (type these into a modifier's "Traits" list, one per row):
 *   43:102        -> grants Skill #102 while the item is equipped
 *   41:2          -> unlocks Skill Type #2 (e.g. "Magic") while equipped
 *   22:2:0.10     -> +10% Critical Rate
 *   22:7:0.02     -> +2% HP Regen per turn
 *   21:2:1.15     -> ATK x1.15
 *   11:2:0.5      -> takes half damage from element 2 (Fire)
 *   32:4:0.25     -> normal attacks have a 25% chance to inflict State #4
 *   14:6          -> immune to State #6
 * Value-less codes (14, 31, 41-44) only need code:dataId.
 * Note the codes are the ENGINE's trait codes: 31 is Attack Element and
 * 33 is Attack Speed - to add a skill or a skill type use 43 / 41.
 *
 * ----------------------------------------------------------------------------
 * Examples:
 * ----------------------------------------------------------------------------
 * Results you might see:
 * - "Masterwork Steel Deadly Sword of the Dragon"
 * - "Fine Bronze Shield of Protection"
 * - "Flawless Mithril Swift Axe of Lightning"
 * - "Legendary Adamantine Blessed Armor of the Phoenix"
 *
 * ----------------------------------------------------------------------------
 * LOAD ORDER (VisuStella and other plugin suites)
 * ----------------------------------------------------------------------------
 * Put this plugin BELOW VisuStella / any core, battle or menu suite in the
 * Plugin Manager. ED5 plugins alias engine methods and expect the suite's
 * versions to already be in place. Among ED5 plugins: ED5_GearBox first, then
 * ED5_TimeSeasonsWeather before anything that reacts to time or weather,
 * then everything else in any order.
 *
 * ----------------------------------------------------------------------------
 * Terms of Use:
 * ----------------------------------------------------------------------------
 * - Free for commercial and non-commercial use
 * - Credit "ED5 (AKA CHIGOOX)" appreciated but not required
 * - Modify freely for your project
 * - Do not redistribute as a plugin template
 *
 * ============================================================================
 * Changelog:
 * ============================================================================
 * v2.3 - Documentation: item script calls / MV commands / delete calls,
 *         worked Custom Traits examples with the correct engine codes,
 *         load-order guidance for VisuStella users
 * v2.2 - Added consumable (item) creation, delete functions for all types,
 *         fixed trait code documentation, fixed save/load for items,
 *         fixed sequential MV plugin commands
 * v2.1 - Added RPG Maker MV compatibility, 60 built-in modifiers
 * v2.0 - Complete rewrite with suffix system, elements, states, traits
 * v1.0 - Initial release
 */

/*~struct~Modifier:
 * @param name
 * @text Name
 * @desc The prefix/suffix name (e.g., "Strong" or "of Flames")
 * @type text
 * @default Strong
 *
 * @param category
 * @text Category
 * @desc Category for this modifier (modifier, material, quality, elemental, bestial, legendary)
 * @type combo
 * @option quality
 * @option material
 * @option modifier
 * @option elemental
 * @option bestial
 * @option legendary
 * @default modifier
 *
 * @param params
 * @text Parameters
 * @desc Stat modifications [HP, MP, ATK, DEF, MAT, MDF, AGI, LUK]
 * @type number[]
 * @default ["0","0","0","0","0","0","0","0"]
 *
 * @param elements
 * @text Element IDs
 * @desc Elements to add (for weapons) or resist (for armor)
 * @type number[]
 * @default []
 *
 * @param attackStates
 * @text Attack States
 * @desc States to inflict on hit (format: "stateId:chance")
 * @type string[]
 * @default []
 *
 * @param traits
 * @text Traits
 * @desc Custom traits (format: "code:dataId:value")
 * @type string[]
 * @default []
 *
 * @param priceModifier
 * @text Price Modifier
 * @desc Price multiplier (1.0 = no change)
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 10.0
 * @default 1.0
 *
 * @param rarity
 * @text Rarity
 * @desc Rarity level (1=Common, 2=Uncommon, 3=Rare, 4=Legendary)
 * @type number
 * @min 1
 * @max 4
 * @default 1
 */

/*~struct~RarityProb:
 * @param rarity
 * @text Rarity Level
 * @desc Rarity tier (1-4)
 * @type number
 * @min 1
 * @max 4
 * @default 1
 *
 * @param probability
 * @text Probability
 * @desc Base chance for this rarity (0.0 to 1.0)
 * @type number
 * @decimals 2
 * @min 0.0
 * @max 1.0
 * @default 0.5
 */


//=============================================================================
// Plugin Initialization
//=============================================================================

var ED5_ProcGen = ED5_ProcGen || {};
ED5_ProcGen.parameters = PluginManager.parameters('ED5_RandomizeItemStats');
ED5_ProcGen.prefixes = [];
ED5_ProcGen.suffixes = [];
ED5_ProcGen.rarityProbs = {};
ED5_ProcGen.config = {
    globalChance: Number(ED5_ProcGen.parameters['GlobalChanceMultiplier'] || 1.0),
    maxPrefixes: Number(ED5_ProcGen.parameters['MaxPrefixes'] || 3),
    maxSuffixes: Number(ED5_ProcGen.parameters['MaxSuffixes'] || 1),
    debugLog: ED5_ProcGen.parameters['EnableDebugLog'] === 'true',
    prefixOrder: (ED5_ProcGen.parameters['PrefixOrder'] || 'quality,material,modifier').split(',')
};

// Rarity color mapping (Diablo-style)
ED5_ProcGen.rarityColors = {
    1: '#a1e065', // Green - Common
    2: '#0070dd', // Blue - Uncommon
    3: '#a335ee', // Purple - Rare
    4: '#ff8000'  // Orange - Legendary
};

//=============================================================================
// Parameter Parsing
//=============================================================================

ED5_ProcGen.parseModifier = function(jsonStr) {
    try {
        var obj = JSON.parse(jsonStr);
        return {
            name: String(obj.name || 'Unknown'),
            category: String(obj.category || 'modifier'),
            params: JSON.parse(obj.params || '["0","0","0","0","0","0","0","0"]').map(Number),
            elements: JSON.parse(obj.elements || '[]').map(Number),
            attackStates: JSON.parse(obj.attackStates || '[]'),
            traits: JSON.parse(obj.traits || '[]'),
            priceModifier: Number(obj.priceModifier || 1.0),
            rarity: Number(obj.rarity || 1)
        };
    } catch (e) {
        console.error('ED5_ProcGen: Failed to parse modifier:', e);
        return null;
    }
};

ED5_ProcGen.parseRarityProb = function(jsonStr) {
    try {
        var obj = JSON.parse(jsonStr);
        return {
            rarity: Number(obj.rarity || 1),
            probability: Number(obj.probability || 0.5)
        };
    } catch (e) {
        console.error('ED5_ProcGen: Failed to parse rarity probability:', e);
        return null;
    }
};

// Parse prefixes
if (ED5_ProcGen.parameters['Prefixes']) {
    var prefixArray = JSON.parse(ED5_ProcGen.parameters['Prefixes']);
    prefixArray.forEach(function(prefixStr) {
        var modifier = ED5_ProcGen.parseModifier(prefixStr);
        if (modifier) ED5_ProcGen.prefixes.push(modifier);
    });
}

// Parse suffixes
if (ED5_ProcGen.parameters['Suffixes']) {
    var suffixArray = JSON.parse(ED5_ProcGen.parameters['Suffixes']);
    suffixArray.forEach(function(suffixStr) {
        var modifier = ED5_ProcGen.parseModifier(suffixStr);
        if (modifier) ED5_ProcGen.suffixes.push(modifier);
    });
}

// Parse rarity probabilities
if (ED5_ProcGen.parameters['RarityProbabilities']) {
    var rarityArray = JSON.parse(ED5_ProcGen.parameters['RarityProbabilities']);
    rarityArray.forEach(function(rarityStr) {
        var prob = ED5_ProcGen.parseRarityProb(rarityStr);
        if (prob) ED5_ProcGen.rarityProbs[prob.rarity] = prob.probability;
    });
}

// Set defaults if no probabilities defined
if (Object.keys(ED5_ProcGen.rarityProbs).length === 0) {
    ED5_ProcGen.rarityProbs = {1: 0.50, 2: 0.30, 3: 0.15, 4: 0.05};
}

//=============================================================================
// Debug Logging
//=============================================================================

ED5_ProcGen.log = function() {
    if (ED5_ProcGen.config.debugLog) {
        console.log.apply(console, ['[ED5_ProcGen]'].concat(Array.prototype.slice.call(arguments)));
    }
};


//=============================================================================
// Random Selection Functions
//=============================================================================

ED5_ProcGen.getRandomModifier = function(modifierArray, category, usedCategories) {
    // Filter by category if specified, and exclude used categories
    var available = modifierArray.filter(function(mod) {
        var categoryMatch = !category || mod.category === category;
        var notUsed = usedCategories.indexOf(mod.category) === -1;
        return categoryMatch && notUsed;
    });
    
    if (available.length === 0) return null;
    
    // Calculate weights based on rarity
    var totalWeight = 0;
    var weights = [];
    
    available.forEach(function(mod) {
        var weight = 1 / (mod.rarity * mod.rarity); // Higher rarity = lower weight
        totalWeight += weight;
        weights.push({modifier: mod, weight: totalWeight});
    });
    
    // Select based on weight
    var roll = Math.random() * totalWeight;
    var selected = available[available.length - 1];
    
    for (var i = 0; i < weights.length; i++) {
        if (roll <= weights[i].weight) {
            selected = weights[i].modifier;
            break;
        }
    }
    
    // Check if modifier should appear based on rarity probability
    var probability = ED5_ProcGen.rarityProbs[selected.rarity] || 0.5;
    probability *= ED5_ProcGen.config.globalChance;
    
    if (Math.random() > probability) {
        ED5_ProcGen.log('Modifier failed probability check:', selected.name, 'needed', probability);
        return null;
    }
    
    return selected;
};

ED5_ProcGen.selectModifiers = function(modifierArray, categories, maxCount) {
    var selected = [];
    var usedCategories = [];
    var attempts = 0;
    var maxAttempts = maxCount * 3; // Prevent infinite loops
    
    while (selected.length < maxCount && attempts < maxAttempts) {
        attempts++;
        var category = categories.length > 0 ? 
            categories[Math.floor(Math.random() * categories.length)] : null;
        
        var modifier = ED5_ProcGen.getRandomModifier(modifierArray, category, usedCategories);
        
        if (modifier) {
            selected.push(modifier);
            usedCategories.push(modifier.category);
            ED5_ProcGen.log('Selected modifier:', modifier.name, 'category:', modifier.category);
        }
    }
    
    return selected;
};

//=============================================================================
// ID Generation
//=============================================================================

ED5_ProcGen.generateUniqueId = function(dataArray) {
    var maxId = 0;
    for (var i = 1; i < dataArray.length; i++) {
        if (dataArray[i] && dataArray[i].id > maxId) {
            maxId = dataArray[i].id;
        }
    }
    return maxId + 1;
};

//=============================================================================
// Item Modification Functions
//=============================================================================

ED5_ProcGen.applyModifiers = function(baseItem, prefixes, suffixes) {
    var newItem = JsonEx.makeDeepCopy(baseItem);
    var allModifiers = prefixes.concat(suffixes);
    
    // Apply parameters
    allModifiers.forEach(function(mod) {
        for (var i = 0; i < 8; i++) {
            newItem.params[i] += mod.params[i] || 0;
        }
    });
    
    // Apply price modifiers
    var priceMultiplier = 1.0;
    allModifiers.forEach(function(mod) {
        priceMultiplier *= mod.priceModifier;
    });
    newItem.price = Math.round(baseItem.price * priceMultiplier);
    
    // Weapons have wtypeId; armors only have etypeId. (Weapons carry no
    // .damage object, so element handling must branch on the item type.)
    var isWeapon = newItem.wtypeId !== undefined;
    var isArmor = !isWeapon && newItem.etypeId !== undefined;

    // Initialize traits array if not exists
    if (!newItem.traits) {
        newItem.traits = [];
    }
    
    // Apply traits
    allModifiers.forEach(function(mod) {
        if (mod.traits && mod.traits.length > 0) {
            mod.traits.forEach(function(traitStr) {
                var parts = String(traitStr).split(':');
                // Value-less traits (e.g. 41 Add Skill Type, 43 Add Skill,
                // 21 Attack Element, 14 State Resist) only need code:dataId.
                // Accept 2+ parts and default the value to 0 when omitted so
                // skill/skill-type/element traits are not silently dropped.
                if (parts.length >= 2) {
                    newItem.traits.push({
                        code: Number(parts[0]),
                        dataId: Number(parts[1]),
                        value: parts.length >= 3 ? Number(parts[2]) : 0
                    });
                }
            });
        }

        // Apply elements: weapons gain attack elements, armors gain
        // element resistance.
        if (mod.elements && mod.elements.length > 0) {
            mod.elements.forEach(function(elementId) {
                if (isWeapon) {
                    // Trait code 31 = Attack Element
                    // (Game_BattlerBase.TRAIT_ATTACK_ELEMENT)
                    newItem.traits.push({
                        code: 31,
                        dataId: elementId,
                        value: 0
                    });
                } else if (isArmor) {
                    // Trait code 11 = Element Rate, value 0.8 = 20% resistance
                    newItem.traits.push({
                        code: 11,
                        dataId: elementId,
                        value: 0.8
                    });
                }
            });
        }
    });
    
    // Apply attack states (for weapons)
    allModifiers.forEach(function(mod) {
        if (mod.attackStates && mod.attackStates.length > 0) {
            mod.attackStates.forEach(function(stateStr) {
                var parts = String(stateStr).split(':');
                if (parts.length >= 2) {
                    var stateId = Number(parts[0]);
                    var chance = Number(parts[1]) / 100; // Convert percentage to decimal
                    // Trait code 32 = Attack State with chance
                    // (Game_BattlerBase.TRAIT_ATTACK_STATE; 31 is ATTACK_ELEMENT)
                    newItem.traits.push({
                        code: 32,
                        dataId: stateId,
                        value: chance
                    });
                }
            });
        }
    });
    
    return newItem;
};

ED5_ProcGen.createItemName = function(baseName, prefixes, suffixes) {
    var name = baseName;
    
    // Get category order from config
    var categoryOrder = ED5_ProcGen.config.prefixOrder;
    
    // Sort prefixes by category order
    if (prefixes.length > 0) {
        var sortedPrefixes = prefixes.slice().sort(function(a, b) {
            var orderA = categoryOrder.indexOf(a.category);
            var orderB = categoryOrder.indexOf(b.category);
            // If category not in order list, put it at the end
            if (orderA === -1) orderA = 999;
            if (orderB === -1) orderB = 999;
            return orderA - orderB;
        });
        
        var prefixNames = sortedPrefixes.map(function(p) { return p.name; });
        name = prefixNames.join(' ') + ' ' + name;
    }
    
    // Append suffixes (no sorting needed, typically only 1)
    if (suffixes.length > 0) {
        var suffixNames = suffixes.map(function(s) { return s.name; });
        name = name + ' ' + suffixNames.join(' ');
    }
    
    return name;
};

ED5_ProcGen.getHighestRarity = function(modifiers) {
    var highest = 1;
    modifiers.forEach(function(mod) {
        if (mod.rarity > highest) highest = mod.rarity;
    });
    return highest;
};

ED5_ProcGen.addItemNotes = function(item, prefixes, suffixes) {
    var allModifiers = prefixes.concat(suffixes);
    var highestRarity = ED5_ProcGen.getHighestRarity(allModifiers);
    
    // Add rarity note
    item.note = item.note || '';
    item.note += ' <pRarity:' + highestRarity + '>';
    
    // Add color note based on highest rarity
    var color = ED5_ProcGen.rarityColors[highestRarity];
    if (color) {
        item.note += ' <Color:' + color + '>';
    }
    
    // Add procedural generation marker
    item.note += ' <ProcGen>';

    // Unique generation key: marks the item as procedurally generated and
    // lets networked clients recognize the same item when local ids collide
    // (see MMO integration below).
    item.ed5ProcGenKey = Date.now().toString(36) + '-' +
        Math.floor(Math.random() * 0xffffffff).toString(36);

    // Re-extract metadata so notetag-driven systems see the new notes
    if (DataManager.extractMetadata) {
        DataManager.extractMetadata(item);
    }

    return item;
};


//=============================================================================
// Main Item Creation Functions
//=============================================================================

ED5_ProcGen.createWeapon = function(baseWeaponId, prefixCategories, suffixCategories) {
    prefixCategories = prefixCategories || [];
    suffixCategories = suffixCategories || [];
    
    var baseWeapon = $dataWeapons[baseWeaponId];
    if (!baseWeapon) {
        console.error('ED5_ProcGen: Base weapon not found with ID:', baseWeaponId);
        return null;
    }
    
    ED5_ProcGen.log('Creating weapon from base:', baseWeapon.name);
    
    // Select prefixes and suffixes
    var prefixes = ED5_ProcGen.selectModifiers(
        ED5_ProcGen.prefixes, 
        prefixCategories, 
        ED5_ProcGen.config.maxPrefixes
    );
    
    var suffixes = ED5_ProcGen.selectModifiers(
        ED5_ProcGen.suffixes, 
        suffixCategories, 
        ED5_ProcGen.config.maxSuffixes
    );
    
    ED5_ProcGen.log('Selected prefixes:', prefixes.length, 'suffixes:', suffixes.length);

    // No modifiers rolled: hand out the base weapon instead of minting a
    // unique DB entry with identical stats (avoids save bloat).
    if (prefixes.length === 0 && suffixes.length === 0) {
        $gameParty.gainItem(baseWeapon, 1);
        ED5_ProcGen.log('No modifiers rolled; gave base weapon:', baseWeapon.name);
        return baseWeapon;
    }

    // Create new weapon
    var newWeapon = ED5_ProcGen.applyModifiers(baseWeapon, prefixes, suffixes);
    newWeapon.id = ED5_ProcGen.generateUniqueId($dataWeapons);
    newWeapon.name = ED5_ProcGen.createItemName(baseWeapon.name, prefixes, suffixes);
    ED5_ProcGen.addItemNotes(newWeapon, prefixes, suffixes);
    
    // Register in data
    $dataWeapons[newWeapon.id] = newWeapon;
    
    // Add to party inventory
    $gameParty.gainItem(newWeapon, 1);
    
    ED5_ProcGen.log('Created weapon:', newWeapon.name, 'ID:', newWeapon.id);
    
    return newWeapon;
};

ED5_ProcGen.createArmor = function(baseArmorId, prefixCategories, suffixCategories) {
    prefixCategories = prefixCategories || [];
    suffixCategories = suffixCategories || [];
    
    var baseArmor = $dataArmors[baseArmorId];
    if (!baseArmor) {
        console.error('ED5_ProcGen: Base armor not found with ID:', baseArmorId);
        return null;
    }
    
    ED5_ProcGen.log('Creating armor from base:', baseArmor.name);
    
    // Select prefixes and suffixes
    var prefixes = ED5_ProcGen.selectModifiers(
        ED5_ProcGen.prefixes, 
        prefixCategories, 
        ED5_ProcGen.config.maxPrefixes
    );
    
    var suffixes = ED5_ProcGen.selectModifiers(
        ED5_ProcGen.suffixes, 
        suffixCategories, 
        ED5_ProcGen.config.maxSuffixes
    );
    
    ED5_ProcGen.log('Selected prefixes:', prefixes.length, 'suffixes:', suffixes.length);

    // No modifiers rolled: hand out the base armor instead of minting a
    // unique DB entry with identical stats (avoids save bloat).
    if (prefixes.length === 0 && suffixes.length === 0) {
        $gameParty.gainItem(baseArmor, 1);
        ED5_ProcGen.log('No modifiers rolled; gave base armor:', baseArmor.name);
        return baseArmor;
    }

    // Create new armor
    var newArmor = ED5_ProcGen.applyModifiers(baseArmor, prefixes, suffixes);
    newArmor.id = ED5_ProcGen.generateUniqueId($dataArmors);
    newArmor.name = ED5_ProcGen.createItemName(baseArmor.name, prefixes, suffixes);
    ED5_ProcGen.addItemNotes(newArmor, prefixes, suffixes);
    
    // Register in data
    $dataArmors[newArmor.id] = newArmor;
    
    // Add to party inventory
    $gameParty.gainItem(newArmor, 1);
    
    ED5_ProcGen.log('Created armor:', newArmor.name, 'ID:', newArmor.id);
    
    return newArmor;
};

//=============================================================================
// Consumable Item Creation (NEW in v2.2)
//=============================================================================

ED5_ProcGen.createItem = function(baseItemId, prefixCategories, suffixCategories) {
    prefixCategories = prefixCategories || [];
    suffixCategories = suffixCategories || [];
    
    var baseItem = $dataItems[baseItemId];
    if (!baseItem) {
        console.error('ED5_ProcGen: Base item not found with ID:', baseItemId);
        return null;
    }
    
    ED5_ProcGen.log('Creating item from base:', baseItem.name);
    
    // Select prefixes and suffixes
    var prefixes = ED5_ProcGen.selectModifiers(
        ED5_ProcGen.prefixes, 
        prefixCategories, 
        ED5_ProcGen.config.maxPrefixes
    );
    
    var suffixes = ED5_ProcGen.selectModifiers(
        ED5_ProcGen.suffixes, 
        suffixCategories, 
        ED5_ProcGen.config.maxSuffixes
    );
    
    ED5_ProcGen.log('Selected prefixes:', prefixes.length, 'suffixes:', suffixes.length);

    // No modifiers rolled: hand out the base item instead of minting a
    // unique DB entry with identical stats (avoids save bloat).
    if (prefixes.length === 0 && suffixes.length === 0) {
        $gameParty.gainItem(baseItem, 1);
        ED5_ProcGen.log('No modifiers rolled; gave base item:', baseItem.name);
        return baseItem;
    }

    // Create new item via deep copy
    var newItem = JsonEx.makeDeepCopy(baseItem);
    
    // Apply parameter-based modifiers to effects where applicable
    // Items don't have .params like weapons/armor, so we translate stat
    // bonuses into RPG Maker effects (e.g. Recover HP/MP based on
    // HP/MP modifier values, or buff states).
    var allModifiers = prefixes.concat(suffixes);
    
    // Apply price modifier
    var priceMultiplier = 1.0;
    allModifiers.forEach(function(mod) {
        priceMultiplier *= mod.priceModifier;
    });
    newItem.price = Math.round(baseItem.price * priceMultiplier);
    
    // Initialize traits and effects arrays
    if (!newItem.traits) newItem.traits = [];
    if (!newItem.effects) newItem.effects = [];
    
    // Translate HP/MP param bonuses into Recover HP/Recover MP effects
    allModifiers.forEach(function(mod) {
        var hpBonus = mod.params[0] || 0;
        var mpBonus = mod.params[1] || 0;
        
        // Effect code 11 = Recover HP (value1 = %, value2 = flat)
        if (hpBonus !== 0) {
            newItem.effects.push({
                code: 11,
                dataId: 0,
                value1: 0,
                value2: hpBonus
            });
        }
        // Effect code 12 = Recover MP (value1 = %, value2 = flat)
        if (mpBonus !== 0) {
            newItem.effects.push({
                code: 12,
                dataId: 0,
                value1: 0,
                value2: mpBonus
            });
        }
        
        // Apply custom traits
        if (mod.traits && mod.traits.length > 0) {
            mod.traits.forEach(function(traitStr) {
                var parts = String(traitStr).split(':');
                // Value-less traits (e.g. 41 Add Skill Type, 43 Add Skill)
                // only need code:dataId; accept 2+ parts and default value to 0.
                if (parts.length >= 2) {
                    newItem.traits.push({
                        code: Number(parts[0]),
                        dataId: Number(parts[1]),
                        value: parts.length >= 3 ? Number(parts[2]) : 0
                    });
                }
            });
        }
    });

    // Generate unique ID and name
    newItem.id = ED5_ProcGen.generateUniqueId($dataItems);
    newItem.name = ED5_ProcGen.createItemName(baseItem.name, prefixes, suffixes);
    ED5_ProcGen.addItemNotes(newItem, prefixes, suffixes);
    
    // Register in data
    $dataItems[newItem.id] = newItem;
    
    // Add to party inventory
    $gameParty.gainItem(newItem, 1);
    
    ED5_ProcGen.log('Created item:', newItem.name, 'ID:', newItem.id);
    
    return newItem;
};

//=============================================================================
// Delete Functions (NEW in v2.2)
//=============================================================================

// Unequip an equip item from every actor (active party and reserve) so
// deleting it leaves no dangling equip references in the save.
ED5_ProcGen.unequipFromAllActors = function(item) {
    if (typeof $gameActors === 'undefined' || !$gameActors || !$gameActors._data) return;
    $gameActors._data.forEach(function(actor) {
        if (!actor) return;
        while (actor.equips().indexOf(item) >= 0) {
            actor.discardEquip(item);
        }
    });
};

ED5_ProcGen.deleteWeapon = function(weaponId) {
    weaponId = Number(weaponId);
    if (!$dataWeapons[weaponId]) {
        ED5_ProcGen.log('Weapon ID not found:', weaponId);
        return false;
    }
    // Only delete procedurally generated items
    if (!ED5_ProcGen._generatedWeapons[weaponId]) {
        ED5_ProcGen.log('Weapon ID is not procedurally generated:', weaponId);
        return false;
    }
    // Unequip from all actors first (party and reserve)
    ED5_ProcGen.unequipFromAllActors($dataWeapons[weaponId]);
    // Remove from inventory
    $gameParty.loseItem($dataWeapons[weaponId], $gameParty.numItems($dataWeapons[weaponId]));
    // Remove from data arrays
    delete $dataWeapons[weaponId];
    delete ED5_ProcGen._generatedWeapons[weaponId];
    ED5_ProcGen.log('Deleted generated weapon ID:', weaponId);
    return true;
};

ED5_ProcGen.deleteArmor = function(armorId) {
    armorId = Number(armorId);
    if (!$dataArmors[armorId]) {
        ED5_ProcGen.log('Armor ID not found:', armorId);
        return false;
    }
    if (!ED5_ProcGen._generatedArmors[armorId]) {
        ED5_ProcGen.log('Armor ID is not procedurally generated:', armorId);
        return false;
    }
    // Unequip from all actors first (party and reserve)
    ED5_ProcGen.unequipFromAllActors($dataArmors[armorId]);
    $gameParty.loseItem($dataArmors[armorId], $gameParty.numItems($dataArmors[armorId]));
    delete $dataArmors[armorId];
    delete ED5_ProcGen._generatedArmors[armorId];
    ED5_ProcGen.log('Deleted generated armor ID:', armorId);
    return true;
};

ED5_ProcGen.deleteItem = function(itemId) {
    itemId = Number(itemId);
    if (!$dataItems[itemId]) {
        ED5_ProcGen.log('Item ID not found:', itemId);
        return false;
    }
    if (!ED5_ProcGen._generatedItems[itemId]) {
        ED5_ProcGen.log('Item ID is not procedurally generated:', itemId);
        return false;
    }
    $gameParty.loseItem($dataItems[itemId], $gameParty.numItems($dataItems[itemId]));
    delete $dataItems[itemId];
    delete ED5_ProcGen._generatedItems[itemId];
    ED5_ProcGen.log('Deleted generated item ID:', itemId);
    return true;
};

//=============================================================================
// Plugin Commands (MZ & MV Compatible)
//=============================================================================

// MZ Plugin Commands
if (PluginManager.registerCommand) {
    PluginManager.registerCommand('ED5_RandomizeItemStats', 'GenerateWeapon', function(args) {
        var weaponId = Number(args.baseWeaponId);
        var prefixCats = args.prefixCategories ? JSON.parse(args.prefixCategories) : [];
        var suffixCats = args.suffixCategories ? JSON.parse(args.suffixCategories) : [];
        
        ED5_ProcGen.createWeapon(weaponId, prefixCats, suffixCats);
    });

    PluginManager.registerCommand('ED5_RandomizeItemStats', 'GenerateArmor', function(args) {
        var armorId = Number(args.baseArmorId);
        var prefixCats = args.prefixCategories ? JSON.parse(args.prefixCategories) : [];
        var suffixCats = args.suffixCategories ? JSON.parse(args.suffixCategories) : [];
        
        ED5_ProcGen.createArmor(armorId, prefixCats, suffixCats);
    });

    PluginManager.registerCommand('ED5_RandomizeItemStats', 'GenerateItem', function(args) {
        var itemId = Number(args.baseItemId);
        var prefixCats = args.prefixCategories ? JSON.parse(args.prefixCategories) : [];
        var suffixCats = args.suffixCategories ? JSON.parse(args.suffixCategories) : [];
        
        ED5_ProcGen.createItem(itemId, prefixCats, suffixCats);
    });

    PluginManager.registerCommand('ED5_RandomizeItemStats', 'DeleteWeapon', function(args) {
        ED5_ProcGen.deleteWeapon(Number(args.weaponId));
    });

    PluginManager.registerCommand('ED5_RandomizeItemStats', 'DeleteArmor', function(args) {
        ED5_ProcGen.deleteArmor(Number(args.armorId));
    });

    PluginManager.registerCommand('ED5_RandomizeItemStats', 'DeleteItem', function(args) {
        ED5_ProcGen.deleteItem(Number(args.itemId));
    });
}

// MV Plugin Commands (fixed: use else if to prevent sequential firing)
var ED5_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ED5_Game_Interpreter_pluginCommand.call(this, command, args);
    
    if (command === 'GenerateWeapon' || command === 'ED5_GenerateWeapon') {
        var weaponId = Number(args[0]) || 1;
        var prefixCats = args[1] ? args[1].split(',') : [];
        var suffixCats = args[2] ? args[2].split(',') : [];
        ED5_ProcGen.createWeapon(weaponId, prefixCats, suffixCats);
    } else if (command === 'GenerateArmor' || command === 'ED5_GenerateArmor') {
        var armorId = Number(args[0]) || 1;
        var prefixCats = args[1] ? args[1].split(',') : [];
        var suffixCats = args[2] ? args[2].split(',') : [];
        ED5_ProcGen.createArmor(armorId, prefixCats, suffixCats);
    } else if (command === 'GenerateItem' || command === 'ED5_GenerateItem') {
        var itemId = Number(args[0]) || 1;
        var prefixCats = args[1] ? args[1].split(',') : [];
        var suffixCats = args[2] ? args[2].split(',') : [];
        ED5_ProcGen.createItem(itemId, prefixCats, suffixCats);
    } else if (command === 'DeleteWeapon' || command === 'ED5_DeleteWeapon') {
        ED5_ProcGen.deleteWeapon(Number(args[0]));
    } else if (command === 'DeleteArmor' || command === 'ED5_DeleteArmor') {
        ED5_ProcGen.deleteArmor(Number(args[0]));
    } else if (command === 'DeleteItem' || command === 'ED5_DeleteItem') {
        ED5_ProcGen.deleteItem(Number(args[0]));
    }
};

//=============================================================================
// Legacy Compatibility Functions
//=============================================================================

// Keep old function names for backward compatibility
function create_weapon(baseWeaponId, prefixCategories) {
    return ED5_ProcGen.createWeapon(baseWeaponId, prefixCategories, []);
}

function create_armor(baseArmorId, prefixCategories) {
    return ED5_ProcGen.createArmor(baseArmorId, prefixCategories, []);
}

//=============================================================================
// Save/Load Persistence System
//=============================================================================

// Store generated items in save data
ED5_ProcGen._generatedWeapons = {};
ED5_ProcGen._generatedArmors = {};
ED5_ProcGen._generatedItems = {};

// Hook into DataManager to save/load generated items
var ED5_DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = ED5_DataManager_makeSaveContents.call(this);
    contents.ed5ProcGenWeapons = ED5_ProcGen._generatedWeapons;
    contents.ed5ProcGenArmors = ED5_ProcGen._generatedArmors;
    contents.ed5ProcGenItems = ED5_ProcGen._generatedItems;
    return contents;
};

var ED5_DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    ED5_DataManager_extractSaveContents.call(this, contents);
    // Always reset first so items generated in a previous session don't
    // leak into a save file that doesn't contain them.
    ED5_ProcGen.clearGeneratedItems();
    ED5_ProcGen._generatedWeapons = contents.ed5ProcGenWeapons || {};
    ED5_ProcGen._generatedArmors = contents.ed5ProcGenArmors || {};
    ED5_ProcGen._generatedItems = contents.ed5ProcGenItems || {};
    ED5_ProcGen.restoreGeneratedItems();
};

// Reset registries on New Game so orphan items from a previous session
// can't contaminate a fresh playthrough (strip-before-save / rebuild-on-load
// fix pattern).
var ED5_DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    ED5_DataManager_setupNewGame.call(this);
    ED5_ProcGen.clearGeneratedItems();
};

// Remove all generated entries from the runtime databases and empty the
// registries.
ED5_ProcGen.clearGeneratedItems = function() {
    var id;
    for (id in ED5_ProcGen._generatedWeapons) {
        if (ED5_ProcGen._generatedWeapons.hasOwnProperty(id)) delete $dataWeapons[id];
    }
    for (id in ED5_ProcGen._generatedArmors) {
        if (ED5_ProcGen._generatedArmors.hasOwnProperty(id)) delete $dataArmors[id];
    }
    for (id in ED5_ProcGen._generatedItems) {
        if (ED5_ProcGen._generatedItems.hasOwnProperty(id)) delete $dataItems[id];
    }
    ED5_ProcGen._generatedWeapons = {};
    ED5_ProcGen._generatedArmors = {};
    ED5_ProcGen._generatedItems = {};
};

// Restore generated items after loading
ED5_ProcGen.restoreGeneratedItems = function() {
    // Restore weapons
    for (var id in ED5_ProcGen._generatedWeapons) {
        if (ED5_ProcGen._generatedWeapons.hasOwnProperty(id)) {
            $dataWeapons[id] = ED5_ProcGen._generatedWeapons[id];
            if (DataManager.extractMetadata) DataManager.extractMetadata($dataWeapons[id]);
        }
    }

    // Restore armors
    for (var id in ED5_ProcGen._generatedArmors) {
        if (ED5_ProcGen._generatedArmors.hasOwnProperty(id)) {
            $dataArmors[id] = ED5_ProcGen._generatedArmors[id];
            if (DataManager.extractMetadata) DataManager.extractMetadata($dataArmors[id]);
        }
    }

    // Restore items (consumables)
    for (var id in ED5_ProcGen._generatedItems) {
        if (ED5_ProcGen._generatedItems.hasOwnProperty(id)) {
            $dataItems[id] = ED5_ProcGen._generatedItems[id];
            if (DataManager.extractMetadata) DataManager.extractMetadata($dataItems[id]);
        }
    }
    
    ED5_ProcGen.log('Restored', Object.keys(ED5_ProcGen._generatedWeapons).length, 
                    'weapons,', Object.keys(ED5_ProcGen._generatedArmors).length, 'armors,',
                    'and', Object.keys(ED5_ProcGen._generatedItems).length, 'items');
};

// Update create functions to store generated items
var ED5_ProcGen_createWeapon_original = ED5_ProcGen.createWeapon;
ED5_ProcGen.createWeapon = function(baseWeaponId, prefixCategories, suffixCategories) {
    var weapon = ED5_ProcGen_createWeapon_original.call(this, baseWeaponId, prefixCategories, suffixCategories);
    // Only register truly generated copies (base items lack ed5ProcGenKey)
    if (weapon && weapon.ed5ProcGenKey) {
        ED5_ProcGen._generatedWeapons[weapon.id] = weapon;
    }
    return weapon;
};

var ED5_ProcGen_createArmor_original = ED5_ProcGen.createArmor;
ED5_ProcGen.createArmor = function(baseArmorId, prefixCategories, suffixCategories) {
    var armor = ED5_ProcGen_createArmor_original.call(this, baseArmorId, prefixCategories, suffixCategories);
    // Only register truly generated copies (base items lack ed5ProcGenKey)
    if (armor && armor.ed5ProcGenKey) {
        ED5_ProcGen._generatedArmors[armor.id] = armor;
    }
    return armor;
};

var ED5_ProcGen_createItem_original = ED5_ProcGen.createItem;
ED5_ProcGen.createItem = function(baseItemId, prefixCategories, suffixCategories) {
    var item = ED5_ProcGen_createItem_original.call(this, baseItemId, prefixCategories, suffixCategories);
    // Only register truly generated copies (base items lack ed5ProcGenKey)
    if (item && item.ed5ProcGenKey) {
        ED5_ProcGen._generatedItems[item.id] = item;
    }
    return item;
};

//=============================================================================
// Initialization
//=============================================================================

ED5_ProcGen.log('ED5 Procedural Item Generator v2.2 loaded');
ED5_ProcGen.log('Loaded', ED5_ProcGen.prefixes.length, 'prefixes and', 
                ED5_ProcGen.suffixes.length, 'suffixes');
ED5_ProcGen.log('Config:', ED5_ProcGen.config);

// ============================================================================
//  ED5 MMO INTEGRATION (detect-and-extend)
// ============================================================================
//  Procedurally generated items need server persistence so they remain
//  consistent across sessions and can be traded between players.
//  No ABS integration needed (item stats work the same in ABS).
// ============================================================================

(function() {
    'use strict';

    var _mmoAvailable = (typeof ED5 !== 'undefined' && ED5.MMO &&
        ED5.MMO.ExtensionBus && typeof $gameMMO !== 'undefined');

    if (_mmoAvailable) {
        console.log('[ED5_RandomizeItemStats] ED5 MMO detected — registering extension "procgen".');

        // Item ids are allocated client-locally, so ids minted by another
        // player can collide with different local items. Install incoming
        // items collision-safely: same generation key = same item
        // (idempotent update); different key on an occupied id = reassign
        // the incoming item a fresh local id instead of overwriting.
        var _installIncomingItem = function(item, dataArray, registry) {
            if (!item) return;
            var id = Number(item.id);
            var existing = dataArray[id];
            if (existing && existing.ed5ProcGenKey !== item.ed5ProcGenKey) {
                id = ED5_ProcGen.generateUniqueId(dataArray);
                item.id = id;
            }
            registry[id] = item;
            dataArray[id] = item;
            if (DataManager.extractMetadata) DataManager.extractMetadata(item);
        };

        ED5.MMO.ExtensionBus.register('procgen', {

            onConnect: function(client) {
                // Request generated item registry from server
                ED5.MMO.ExtensionBus.send('procgen', 'request_items', {});
            },

            onReconnect: function() {
                ED5.MMO.ExtensionBus.send('procgen', 'request_items', {});
            },

            getSyncData: function() {
                return {};
            },

            onMessage: function(action, data) {
                switch (action) {
                    case 'load_items':
                        // Server sent generated item definitions
                        if (data.weapons) {
                            for (var id in data.weapons) {
                                _installIncomingItem(data.weapons[id],
                                    $dataWeapons, ED5_ProcGen._generatedWeapons);
                            }
                        }
                        if (data.armors) {
                            for (var id in data.armors) {
                                _installIncomingItem(data.armors[id],
                                    $dataArmors, ED5_ProcGen._generatedArmors);
                            }
                        }
                        ED5_ProcGen.log('Loaded generated items from server.');
                        break;

                    case 'item_created':
                        // Server broadcast: another player created a new item
                        if (data.type === 'weapon' && data.item) {
                            _installIncomingItem(data.item,
                                $dataWeapons, ED5_ProcGen._generatedWeapons);
                        } else if (data.type === 'armor' && data.item) {
                            _installIncomingItem(data.item,
                                $dataArmors, ED5_ProcGen._generatedArmors);
                        }
                        break;

                    case 'save_confirm':
                        break;
                }
            },

            onMapChange: function(fromMapId, toMapId) {
                // Save generated items on map change
                ED5.MMO.ExtensionBus.send('procgen', 'save_items', {
                    weapons: ED5_ProcGen._generatedWeapons,
                    armors: ED5_ProcGen._generatedArmors
                });
            }
        });

        // Notify server when a new item is generated
        var _origCreateWeapon = ED5_ProcGen.createWeapon;
        ED5_ProcGen.createWeapon = function(baseWeaponId, prefixCategories, suffixCategories) {
            var weapon = _origCreateWeapon.call(this, baseWeaponId, prefixCategories, suffixCategories);
            // Only broadcast truly generated copies (base items lack the key)
            if (weapon && weapon.ed5ProcGenKey) {
                ED5.MMO.ExtensionBus.send('procgen', 'item_created', {
                    type: 'weapon',
                    item: weapon
                });
            }
            return weapon;
        };

        var _origCreateArmor = ED5_ProcGen.createArmor;
        ED5_ProcGen.createArmor = function(baseArmorId, prefixCategories, suffixCategories) {
            var armor = _origCreateArmor.call(this, baseArmorId, prefixCategories, suffixCategories);
            // Only broadcast truly generated copies (base items lack the key)
            if (armor && armor.ed5ProcGenKey) {
                ED5.MMO.ExtensionBus.send('procgen', 'item_created', {
                    type: 'armor',
                    item: armor
                });
            }
            return armor;
        };
    }

})();
