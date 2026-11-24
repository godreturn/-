/*:
 * @target MZ MV
 * @plugindesc [v2.2] ED5 Random Loot System - Weighted loot pools with group support and procedural generation.
 * * @author ED5 (ChigooX)
 * @url https://chigoox.itch.io/
 *
 * @help
 * ============================================================================
 * 💰 ED5 Random Loot System v2.1
 * ============================================================================
 * 
 * A powerful loot generation system with weighted drops, group management,
 * conditional requirements, and integration with ED5_RandomizeItemStats for
 * procedural equipment generation.
 *
 * ----------------------------------------------------------------------------
 * 🎮 RPG Maker MZ & MV Compatible
 * ----------------------------------------------------------------------------
 * This plugin works in BOTH RPG Maker MZ and MV with full feature parity.
 *
 * ----------------------------------------------------------------------------
 * ⚡ Quick Start
 * ----------------------------------------------------------------------------
 * 
 * 1. Add note tags to your database items/weapons/armor:
 *    <dropWeight:5>      - Higher weight = more common (default: 1)
 *    <drop:2..4>         - Drops 2-4 of this item
 *    <group:boss,rare>   - Assign to loot groups
 *    <dropLv:10>         - Requires party level 10+
 *    <noDrop>            - Exclude from loot pool
 *
 * 2. Use Plugin Commands (MZ) or Script Calls (MV/MZ):
 *    - Spawn random item/weapon/armor
 *    - Spawn from specific group
 *    - Optionally generate procedural stats
 *
 * ----------------------------------------------------------------------------
 * 📝 Note Tags Reference
 * ----------------------------------------------------------------------------
 * 
 * <dropWeight:NUMBER>
 *   Weight in loot pool. Higher = more common.
 *   Example: <dropWeight:10> makes item 10x more likely
 *
 * <drop:MIN..MAX>
 *   Quantity range when dropped.
 *   Example: <drop:1..3> drops 1 to 3 items
 *
 * <group:NAME,NAME>
 *   Assign to one or more loot groups.
 *   Example: <group:boss,legendary,rare>
 *
 * <dropLv:NUMBER>
 *   Requires minimum party level.
 *   Example: <dropLv:20> only drops for level 20+ parties
 *
 * <dropAtk:NUMBER>, <dropDef:NUMBER>, etc.
 *   Requires minimum party average stat.
 *   Supported: atk, def, mat, mdf, agi, luck, hp, mp
 *
 * <noDrop>
 *   Excludes item from all loot pools.
 *
 * ----------------------------------------------------------------------------
 * 🎯 Plugin Commands (MZ) & Script Calls (MZ/MV)
 * ----------------------------------------------------------------------------
 * 
 * MZ Plugin Commands:
 *   - Spawn Random Item
 *   - Spawn Random Weapon  
 *   - Spawn Random Armor
 *   - Spawn Random Loot (any type)
 *   - Spawn Group Loot (from specific group)
 *
 * MV Plugin Commands:
 *   SpawnRandomItem
 *   SpawnRandomWeapon
 *   SpawnRandomArmor
 *   SpawnRandomLoot
 *   SpawnGroupLoot [groupName]
 *
 * Script Calls (Both MZ & MV):
 *   ED5.RandomLoot.spawnRandomLoot('item');
 *   ED5.RandomLoot.spawnRandomLoot('weapon');
 *   ED5.RandomLoot.spawnRandomLoot('armor');
 *   ED5.RandomLoot.spawnRandomLoot('all');
 *   ED5.RandomLoot.spawnGroupLoot('boss');
 *
 * ----------------------------------------------------------------------------
 * 🔗 Integration with ED5_RandomizeItemStats
 * ----------------------------------------------------------------------------
 * 
 * When ED5_RandomizeItemStats is installed, weapons and armor can be
 * automatically generated with procedural modifiers!
 *
 * Enable in plugin parameters: "Enable Procedural Generation"
 *
 * This creates Diablo-style loot with prefixes, suffixes, and enhanced stats.
 *
 * ----------------------------------------------------------------------------
 * 💡 Examples
 * ----------------------------------------------------------------------------
 * 
 * Boss Loot Table:
 *   - Create items with <group:boss>
 *   - Use: SpawnGroupLoot boss
 *
 * Level-Scaled Drops:
 *   - Potion: <dropLv:1>
 *   - Hi-Potion: <dropLv:10>
 *   - Mega Potion: <dropLv:20>
 *
 * Rare Item Pool:
 *   - Common sword: <dropWeight:10>
 *   - Rare sword: <dropWeight:1>
 *   - Legendary sword: <dropWeight:0.5> (use decimal weights)
 *
 * ----------------------------------------------------------------------------
 * 💰 License
 * ----------------------------------------------------------------------------
 * This is a PAID plugin. Purchase includes:
 * - Use in commercial and non-commercial projects
 * - Lifetime updates and support
 * - Integration with other ED5 plugins
 *
 * Do NOT redistribute or resell this plugin.
 * License is per-developer, not per-project.
 *
 * ----------------------------------------------------------------------------
 * 📞 Support
 * ----------------------------------------------------------------------------
 * Visit: https://chigoox.itch.io/
 * For updates, documentation, and more plugins!
 *
 * ============================================================================
 *
 * @param enableProceduralGen
 * @text Enable Procedural Generation
 * @type boolean
 * @default true
 * @desc Generate weapons/armor with ED5_RandomizeItemStats modifiers when available.
 *
 * @param enableDebugLog
 * @text Enable Debug Logging
 * @type boolean
 * @default false
 * @desc Show detailed console logs for troubleshooting.
 *
 * @param popupDuration
 * @text Popup Duration
 * @type number
 * @min 30
 * @max 300
 * @default 60
 * @desc How long the loot popup stays visible (in frames, 60 = 1 second).
 *
 * @param popupRiseSpeed
 * @text Popup Rise Speed
 * @type number
 * @min 0
 * @max 10
 * @default 1
 * @desc How fast the popup moves upward (pixels per frame).
 *
 * @param defaultMinDrop
 * @text Default Min Drop
 * @type number
 * @min 1
 * @default 1
 * @desc Default minimum quantity when <drop> tag is not specified.
 *
 * @param defaultMaxDrop
 * @text Default Max Drop
 * @type number
 * @min 1
 * @default 1
 * @desc Default maximum quantity when <drop> tag is not specified.
 *
 * @param defaultDropDistance
 * @text Default Drop Distance
 * @type number
 * @min 1
 * @default 1
 * @desc Default radius in tiles for loot to drop from source.
 *
 * @command spawnItem
 * @text Spawn Random Item
 * @desc Spawns a random item from the loot pool.
 *
 * @arg distance
 * @text Drop Distance
 * @type number
 * @default 0
 * @desc Max distance to drop from source. 0 uses default.
 *
 * @command spawnWeapon
 * @text Spawn Random Weapon
 * @desc Spawns a random weapon from the loot pool (may be procedural if enabled).
 *
 * @arg distance
 * @text Drop Distance
 * @type number
 * @default 0
 * @desc Max distance to drop from source. 0 uses default.
 *
 * @command spawnArmor
 * @text Spawn Random Armor
 * @desc Spawns a random armor from the loot pool (may be procedural if enabled).
 *
 * @arg distance
 * @text Drop Distance
 * @type number
 * @default 0
 * @desc Max distance to drop from source. 0 uses default.
 *
 * @command spawnAll
 * @text Spawn Random Loot
 * @desc Spawns random loot of any type (item, weapon, or armor) from the pool.
 *
 * @arg distance
 * @text Drop Distance
 * @type number
 * @default 0
 * @desc Max distance to drop from source. 0 uses default.
 *
 * @command spawnGroup
 * @text Spawn Group Loot
 * @desc Spawns random loot from a specific group (e.g., boss, rare, common).
 *
 * @arg groupName
 * @type string
 * @text Group Name
 * @desc The name of the group to spawn loot from (must match <group:NAME> tags).
 *
 * @arg distance
 * @text Drop Distance
 * @type number
 * @default 0
 * @desc Max distance to drop from source. 0 uses default.
 *
 * @command spawnGold
 * @text Spawn Gold
 * @desc Spawns a random amount of gold.
 *
 * @arg min
 * @type number
 * @text Min Gold
 * @default 10
 * @desc Minimum amount of gold to drop.
 *
 * @arg max
 * @type number
 * @text Max Gold
 * @default 100
 * @desc Maximum amount of gold to drop.
 *
 * @arg distance
 * @text Drop Distance
 * @type number
 * @default 0
 * @desc Max distance to drop from source. 0 uses default.
 *
 * @param visualDrop
 * @text Visual Drop Settings
 *
 * @param enableVisualDrop
 * @parent visualDrop
 * @text Enable Visual Drop
 * @type boolean
 * @default true
 * @desc Show animated icon dropping from the event.
 *
 * @param dropHeight
 * @parent visualDrop
 * @text Drop Height
 * @type number
 * @default 48
 * @desc How high the item jumps before falling.
 *
 * @param dropDuration
 * @parent visualDrop
 * @text Drop Duration
 * @type number
 * @default 45
 * @desc How long the drop animation lasts.
 *
 * @param enableBobbing
 * @parent visualDrop
 * @text Enable Bobbing
 * @type boolean
 * @default true
 * @desc If true, items float up and down while on the ground.
 *
 * @param bobbingAmplitude
 * @parent visualDrop
 * @text Bobbing Amplitude
 * @type number
 * @default 5
 * @desc How many pixels the item moves up and down.
 *
 * @param bobbingSpeed
 * @parent visualDrop
 * @text Bobbing Speed
 * @type number
 * @decimals 2
 * @default 0.10
 * @desc How fast the item bobs.
 */

var Imported = Imported || {};
Imported.ED5_RandomLoot = true;

var ED5 = ED5 || {};
ED5.RandomLoot = ED5.RandomLoot || {};

(() => {
  const pluginName = "ED5_RandomLoot";

  // ============================================================================
  // Plugin Parameters
  // ============================================================================
  const parameters = PluginManager.parameters(pluginName);
  const config = {
    enableProceduralGen: parameters['enableProceduralGen'] === 'true',
    enableDebugLog: parameters['enableDebugLog'] === 'true',
    popupDuration: Number(parameters['popupDuration']) || 60,
    popupRiseSpeed: Number(parameters['popupRiseSpeed']) || 1,
    defaultMinDrop: Number(parameters['defaultMinDrop']) || 1,
    defaultMaxDrop: Number(parameters['defaultMaxDrop']) || 1,
    defaultDropDistance: Number(parameters['defaultDropDistance']) || 1,
    enableVisualDrop: parameters['enableVisualDrop'] === 'true',
    dropHeight: Number(parameters['dropHeight']) || 48,
    dropDuration: Number(parameters['dropDuration']) || 45,
    enableBobbing: parameters['enableBobbing'] === 'true',
    bobbingAmplitude: Number(parameters['bobbingAmplitude']) || 5,
    bobbingSpeed: Number(parameters['bobbingSpeed']) || 0.1
  };

  ED5.RandomLoot.config = config;

  // Debug logging helper
  const debugLog = (message) => {
    if (config.enableDebugLog) {
      console.log(`[ED5_RandomLoot] ${message}`);
    }
  };

  // ============================================================================
  // Engine Detection (MZ vs MV)
  // ============================================================================
  const isMZ = Utils.RPGMAKER_NAME === "MZ";
  const isMV = Utils.RPGMAKER_NAME === "MV";
  debugLog(`Running on RPG Maker ${isMZ ? 'MZ' : isMV ? 'MV' : 'Unknown'}`);
  // ImageManager.iconWidth/iconHeight are MZ-only statics; MV stores them on Window_Base.
  //const ED5_ICON_W = isMZ ? ImageManager.iconWidth : Window_Base._iconWidth;
  //const ED5_ICON_H = isMZ ? ImageManager.iconHeight : Window_Base._iconHeight;
const ED5_ICON_W=48;
const ED5_ICON_H =48;
  debugLog(`Running on RPG Maker ${isMZ ? 'MZ' : isMV ? 'MV' : 'Unknown'}`);

  // ============================================================================
  // Helper Functions
  // ============================================================================
  // ============================================================================
  // Helper Functions
  // ============================================================================

  // Helper function to parse note tags
  ED5.RandomLoot.parseNoteTag = (note, tag) => {
    if (!note) return null;
    const regex = new RegExp(`<${tag}(:\\s*([^>]+))?>`, "i");
    const match = regex.exec(note);
    return match ? (match[2] ? match[2].trim() : true) : null;
  };

  ED5.RandomLoot.parseDropTag = (note) => {
    if (!note) return null;
    const regex = /<drop:(\d+)(?:\.\.(\d+))?>/i;
    const match = note.match(regex);
    if (match) {
      const min = parseInt(match[1], 10);
      const max = match[2] ? parseInt(match[2], 10) : min;
      return { min, max };
    }
    return null;
  };

  // Parse <group:name1,name2> tag
  ED5.RandomLoot.parseGroupTag = (note) => {
    if (!note) return null;
    const regex = /<group:\s*([^>]+)>/i;
    const match = note.match(regex);
    if (match) {
      return match[1].split(",").map((group) => group.trim());
    }
    return null;
  };

  // Check if database is loaded
  ED5.RandomLoot.isDatabaseLoaded = () => {
    return !!($dataItems && $dataWeapons && $dataArmors);
  };

  // Validate item data
  // NOTE: price > 0 is NOT required. Consumables (potions, etc.) often
  // have price 0 and should still appear in loot pools.
  ED5.RandomLoot.validateItem = (item) => {
    if (!item) return false;
    if (!item.name) {
      debugLog("Item missing name property");
      return false;
    }
    return true;
  };

  // Check drop conditions (level, stats, etc.)
  ED5.RandomLoot.meetsDropConditions = (note) => {
    if (!note) return true;

    const conditions = {
      lv: $gameParty.averageLevel(),
      atk: $gameParty.averageParam(2),
      def: $gameParty.averageParam(3),
      mat: $gameParty.averageParam(4),
      mdf: $gameParty.averageParam(5),
      agi: $gameParty.averageParam(6),
      luck: $gameParty.averageParam(7),
      mp: $gameParty.averageParam(1),
      hp: $gameParty.averageParam(0),
    };

    const regex = /<drop(\w+):\s*(\d+)>/gi;
    let match;

    while ((match = regex.exec(note)) !== null) {
      const stat = match[1].toLowerCase();
      if (stat === "weight") continue; // Skip dropWeight tag
      
      const value = parseInt(match[2], 10);
      if (conditions[stat] === undefined || conditions[stat] < value) {
        debugLog(`Condition not met: ${stat} < ${value} (party has ${conditions[stat]})`);
        return false;
      }
    }

    return true;
  };

  // ============================================================================
  // Loot Pool Building
  // ============================================================================

  // Build the loot pool
  ED5.RandomLoot.buildLootPool = (groupName = null) => {
    const lootPool = [];

    const addToLootPool = (type, data) => {
      const groups = ED5.RandomLoot.parseGroupTag(data.note);

      if (groupName && (!groups || !groups.includes(groupName))) {
        return;
      }

      const rawWeight = ED5.RandomLoot.parseNoteTag(data.note, "dropWeight");
      const weight =
        rawWeight === true || rawWeight === null
          ? 1
          : parseFloat(rawWeight) || 1;
      const dropRange = ED5.RandomLoot.parseDropTag(data.note) || {
        min: config.defaultMinDrop,
        max: config.defaultMaxDrop,
      };

      // Support decimal weights by rounding probability
      const weightCount = Math.max(1, Math.round(weight));
      for (let i = 0; i < weightCount; i++) {
        lootPool.push({ type, data, dropRange });
      }
    };

    // Add items (price > 0 is NOT required — consumables often have price 0)
    if ($dataItems) {
      $dataItems.forEach((item) => {
        if (
          item &&
          item.name &&
          !ED5.RandomLoot.parseNoteTag(item.note, "noDrop") &&
          ED5.RandomLoot.meetsDropConditions(item.note)
        ) {
          addToLootPool("item", item);
        }
      });
    }

    // Add weapons
    if ($dataWeapons) {
      $dataWeapons.forEach((weapon) => {
        if (
          weapon &&
          weapon.name &&
          !ED5.RandomLoot.parseNoteTag(weapon.note, "noDrop") &&
          ED5.RandomLoot.meetsDropConditions(weapon.note)
        ) {
          addToLootPool("weapon", weapon);
        }
      });
    }

    // Add armors
    if ($dataArmors) {
      $dataArmors.forEach((armor) => {
        if (
          armor &&
          armor.name &&
          !ED5.RandomLoot.parseNoteTag(armor.note, "noDrop") &&
          ED5.RandomLoot.meetsDropConditions(armor.note)
        ) {
          addToLootPool("armor", armor);
        }
      });
    }

    debugLog(`Loot pool built: ${lootPool.length} items${groupName ? ` (group: ${groupName})` : ''}`);
    return lootPool;
  };

  // ============================================================================
  // Loot Generation
  // ============================================================================

  // Generate random loot
  ED5.RandomLoot.generateRandomLoot = (type = "all") => {
    const lootPool = ED5.RandomLoot.buildLootPool();
    const filteredPool =
      type === "all" ? lootPool : lootPool.filter((loot) => loot.type === type);

    if (filteredPool.length === 0) {
      debugLog(`No loot available for type: ${type}`);
      return null;
    }

    const randomLoot =
      filteredPool[Math.floor(Math.random() * filteredPool.length)];
    return randomLoot;
  };

  // Add procedural generation using ED5_RandomizeItemStats
  ED5.RandomLoot.addRandomPrefix = (item) => {
    if (!item || !item.data) {
      debugLog("Invalid item passed to addRandomPrefix");
      return null;
    }

    // Validate that the base item actually exists before trying to generate
    if (item.type === 'weapon' && (!$dataWeapons[item.data.id] || !$dataWeapons[item.data.id].name)) {
      debugLog(`[WARNING] Base weapon ID ${item.data.id} not found or invalid, skipping procedural generation`);
      return null; // Return null instead of invalid item
    }
    if (item.type === 'armor' && (!$dataArmors[item.data.id] || !$dataArmors[item.data.id].name)) {
      debugLog(`[WARNING] Base armor ID ${item.data.id} not found or invalid, skipping procedural generation`);
      return null; // Return null instead of invalid item
    }

    // Check if procedural generation is enabled and available
    if (config.enableProceduralGen && Imported.ED5_RandomizeItemStats && typeof window.ED5_ProcGen !== 'undefined') {
      const itemType = item.type;
      
      if (itemType === 'weapon' && typeof window.ED5_ProcGen.createWeapon === 'function') {
        debugLog(`Generating procedural weapon from base ID: ${item.data.id}`);
        try {
          // Create procedural weapon - automatically adds to party and returns the item object
          const proceduralWeapon = window.ED5_ProcGen.createWeapon(item.data.id, [], []);
          if (proceduralWeapon) {
            debugLog(`Successfully created procedural weapon: ${proceduralWeapon.name} (ID: ${proceduralWeapon.id})`);
            return proceduralWeapon;
          }
        } catch (error) {
          console.error("[ED5_RandomLoot] Error generating procedural weapon:", error);
          return null;
        }
      } else if (itemType === 'armor' && typeof window.ED5_ProcGen.createArmor === 'function') {
        debugLog(`Generating procedural armor from base ID: ${item.data.id}`);
        try {
          // Create procedural armor - automatically adds to party and returns the item object
          const proceduralArmor = window.ED5_ProcGen.createArmor(item.data.id, [], []);
          if (proceduralArmor) {
            debugLog(`Successfully created procedural armor: ${proceduralArmor.name} (ID: ${proceduralArmor.id})`);
            return proceduralArmor;
          }
        } catch (error) {
          console.error("[ED5_RandomLoot] Error generating procedural armor:", error);
          return null;
        }
      }
    }

    // Return original item data if procedural generation is disabled or unavailable
    return item.data;
  };

  // ============================================================================
  // Loot Management System
  // ============================================================================

  // Extend Game_Map to store loot
  const _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this._lootItems = [];
  };

  const _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateLootPickup();
  };

  Game_Map.prototype.updateLootPickup = function() {
    if (!this._lootItems) return;
    
    const playerX = $gamePlayer.x;
    const playerY = $gamePlayer.y;

    for (let i = this._lootItems.length - 1; i >= 0; i--) {
      const loot = this._lootItems[i];
      
      // Handle pickup delay
      if (loot.pickupDelay > 0) {
          loot.pickupDelay--;
          continue;
      }

      // Simple collision: same tile
      if (Math.round(loot.x) === playerX && Math.round(loot.y) === playerY && !loot.pickedUp && loot.landed) {
        this.pickUpLoot(loot, i);
      }
    }
  };

  Game_Map.prototype.pickUpLoot = function(loot, index) {
    loot.pickedUp = true;
    this._lootItems.splice(index, 1);
    
    // Add to inventory
    if (loot.type === 'gold') {
      $gameParty.gainGold(loot.amount);
      const message = `${loot.amount} ${TextManager.currencyUnit}`;
      showLootPop(message, loot.iconIndex);
    } else {
      // For items, we need to handle the object
      // If it was procedural, we might need to handle it carefully
      // But here we just have the item data
      $gameParty.gainItem(loot.item, loot.quantity);
      const message = `${loot.quantity}x ${loot.item.name}`;
      showLootPop(message, loot.item.iconIndex || 0);
    }
    
    // Play sound
    SoundManager.playShop(); // Or any pickup sound
  };

  Game_Map.prototype.addLootDrop = function(lootData) {
    if (!this._lootItems) this._lootItems = [];
    this._lootItems.push(lootData);
  };

  // Helper to find a valid drop tile near source
  ED5.RandomLoot.findDropTile = (sourceX, sourceY, distance = 0) => {
    const dist = distance > 0 ? distance : ED5.RandomLoot.config.defaultDropDistance;
    const candidates = [];
    // Check radius
    for (let x = sourceX - dist; x <= sourceX + dist; x++) {
      for (let y = sourceY - dist; y <= sourceY + dist; y++) {
        if (ED5.RandomLoot.isValidDropTile(x, y)) {
          candidates.push({x, y});
        }
      }
    }
    
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }
    return {x: sourceX, y: sourceY};
  };

  ED5.RandomLoot.isValidDropTile = (x, y) => {
    if (!$gameMap.isValid(x, y)) return false;
    
    // Check if passable in any direction (Down, Left, Right, Up).
    // NOTE: Game_Map.checkPassage expects a passage *bit flag* (0x01-0x08), not a
    // direction number. Passing raw directions (2/4/6/8) silently mis-tests collision,
    // which let loot land on impassable tiles. Use isPassable(), which converts
    // direction -> bit internally and is the correct API here.
    const isPassable = $gameMap.isPassable(x, y, 2) ||
                       $gameMap.isPassable(x, y, 4) ||
                       $gameMap.isPassable(x, y, 6) ||
                       $gameMap.isPassable(x, y, 8);

    if (!isPassable) {
        return false;
    }

    // Check for blocking events
    const events = $gameMap.eventsXyNt(x, y);
    for (const event of events) {
        if (event && typeof event.priorityType === 'function' && event.priorityType() === 1) { // Same as characters
            return false;
        }
    }
    
    return true;
  };

  // ============================================================================
  // Visual Drop Effect (Persistent)
  // ============================================================================

  // Extend Spriteset_Map to render loot
  const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
  Spriteset_Map.prototype.createCharacters = function() {
    _Spriteset_Map_createCharacters.call(this);
    this.createLootSprites();
  };

  Spriteset_Map.prototype.createLootSprites = function() {
    this._lootSprites = [];
    // Create a container for loot, insert it into the tilemap
    // We want it to be sorted with characters usually, but for simplicity
    // let's put it below characters (Z order) or just use the tilemap container
    this._lootContainer = new Sprite();
    // In MZ, this._tilemap is the container for the map
    this._tilemap.addChild(this._lootContainer);
  };

  const _Spriteset_Map_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.update = function() {
    _Spriteset_Map_update.call(this);
    this.updateLootSprites();
  };

  Spriteset_Map.prototype.updateLootSprites = function() {
    if (!$gameMap._lootItems) return;

    // Remove sprites for removed loot
    for (let i = this._lootSprites.length - 1; i >= 0; i--) {
      const sprite = this._lootSprites[i];
      if (!$gameMap._lootItems.includes(sprite._lootData)) {
        this._lootContainer.removeChild(sprite);
        this._lootSprites.splice(i, 1);
      }
    }

    // Add sprites for new loot
    for (const loot of $gameMap._lootItems) {
      if (!this._lootSprites.find(s => s._lootData === loot)) {
        const sprite = new Sprite_Loot(loot);
        this._lootContainer.addChild(sprite);
        this._lootSprites.push(sprite);
      }
    }
  };

  // ============================================================================
  // Sprite_Loot Class
  // ============================================================================
  class Sprite_Loot extends Sprite {
    constructor(lootData) {
      super();
      this._lootData = lootData;
      this._iconIndex = lootData.iconIndex;
      this._homeX = lootData.x; // Target Map X
      this._homeY = lootData.y; // Target Map Y
      this._sourceX = lootData.sourceX; // Source Map X
      this._sourceY = lootData.sourceY; // Source Map Y
      
      // Animation state
      this._duration = ED5.RandomLoot.config.dropDuration;
      this._maxDuration = this._duration;
      this._jumpHeight = ED5.RandomLoot.config.dropHeight;
      this._timer = 0;
      this.z = 2; // Render below characters (usually z=3)
      
      this.createBitmap();
      this.updateDropAnimation();
    }

    createBitmap() {
      this.bitmap = ImageManager.loadSystem("IconSet");
      const pw = ED5_ICON_W;
      const ph = ED5_ICON_H;
      // Guard against a missing/invalid iconIndex (e.g. procedural items) so the
      // frame math never resolves to NaN and draws a garbage sprite.
      const idx = Number(this._iconIndex) || 0;
      const sx = (idx % 16) * pw;
      const sy = Math.floor(idx / 16) * ph;
      this.setFrame(sx, sy, pw, ph);
      this.anchor.x = 0.5;
      this.anchor.y = 0.5;
    }

    update() {
      super.update();
      this._timer++;
      
      if (this._timer <= this._maxDuration) {
        // Drop Animation
        this.updateDropAnimation();
      } else {
        // Resting Animation (Bobbing)
        this._lootData.landed = true; // Mark as ready for pickup
        this.updateRestingAnimation();
      }
    }

    updateDropAnimation() {
      const t = this._timer / this._maxDuration;
      
      // Interpolate Map X/Y to Screen X/Y
      // We need to convert Map coordinates to Screen coordinates dynamically
      // because the map might scroll while the item is dropping
      
      const startScreenX = ($gameMap.adjustX(this._sourceX) + 0.5) * $gameMap.tileWidth();
      const startScreenY = ($gameMap.adjustY(this._sourceY) + 0.5) * $gameMap.tileHeight() - 24;
      
      const endScreenX = ($gameMap.adjustX(this._homeX) + 0.5) * $gameMap.tileWidth();
      const endScreenY = ($gameMap.adjustY(this._homeY) + 0.5) * $gameMap.tileHeight(); // Land on ground center
      
      this.x = startScreenX + (endScreenX - startScreenX) * t;
      
      // Parabolic arc for Y
      const jumpY = 4 * this._jumpHeight * t * (1 - t);
      const linearY = startScreenY + (endScreenY - startScreenY) * t;
      
      this.y = linearY - jumpY;
    }

    updateRestingAnimation() {
      // Update screen position based on map scroll
      this.x = ($gameMap.adjustX(this._homeX) + 0.5) * $gameMap.tileWidth();
      const groundY = ($gameMap.adjustY(this._homeY) + 0.5) * $gameMap.tileHeight();
      
      // Bobbing effect
      let bob = 0;
      if (ED5.RandomLoot.config.enableBobbing) {
          bob = Math.sin(this._timer * ED5.RandomLoot.config.bobbingSpeed) * ED5.RandomLoot.config.bobbingAmplitude;
      }
      this.y = groundY - 12 + bob; // Float slightly above ground
    }
  }

  // ============================================================================
  // Main Spawning Functions
  // ============================================================================

  // Spawn random loot
  ED5.RandomLoot.spawnRandomLoot = (type, sourceEvent = null, distance = 0) => {
    try {
      if (!ED5.RandomLoot.isDatabaseLoaded()) {
        debugLog("Database not loaded yet");
        return;
      }

      const loot = ED5.RandomLoot.generateRandomLoot(type);

      if (!loot || !loot.data || !loot.data.id) {
        debugLog(`Invalid loot generated for type: ${type}`);
        return;
      }

      // Determine the quantity to drop
      const { min, max } = loot.dropRange || { min: config.defaultMinDrop, max: config.defaultMaxDrop };
      const quantity = Math.floor(Math.random() * (max - min + 1)) + min;

      // For weapons and armor, try procedural generation
      let finalLoot = loot.data;
      let wasProcedurallyGenerated = false;
      
      if (loot.type === 'weapon' || loot.type === 'armor') {
        const proceduralLoot = ED5.RandomLoot.addRandomPrefix(loot);
        
        if (proceduralLoot === null) {
          debugLog(`[WARNING] Skipping loot drop - base ${loot.type} ID ${loot.data.id} is invalid`);
          return;
        }
        
        if (proceduralLoot && proceduralLoot.id !== loot.data.id) {
          finalLoot = proceduralLoot;
          wasProcedurallyGenerated = true;
          // If procedural, it was added to party. Remove it temporarily.
          $gameParty.loseItem(finalLoot, 1);
        }
      }

      const displayQuantity = wasProcedurallyGenerated ? 1 : quantity;
      debugLog(`Dropping ${displayQuantity}x ${loot.type}: ${finalLoot.name}`);

      // Create Loot Drop Object
      const source = sourceEvent || $gamePlayer;
      const sourceX = source.x;
      const sourceY = source.y;
      const target = ED5.RandomLoot.findDropTile(sourceX, sourceY, distance);
      
      const lootData = {
        type: loot.type,
        item: finalLoot,
        quantity: displayQuantity,
        amount: 0,
        x: target.x,
        y: target.y,
        sourceX: sourceX,
        sourceY: sourceY,
        iconIndex: finalLoot.iconIndex,
        landed: false,
        pickedUp: false,
        pickupDelay: 30 // Delay before pickup allowed
      };
      
      $gameMap.addLootDrop(lootData);
      
    } catch (error) {
      console.error("[ED5_RandomLoot] Error in spawnRandomLoot:", error);
    }
  };

  // Spawn group loot
  ED5.RandomLoot.spawnGroupLoot = (groupName, sourceEvent = null, distance = 0) => {
    if (!groupName) {
      console.warn("[ED5_RandomLoot] No group name provided");
      return;
    }

    try {
      const lootPool = ED5.RandomLoot.buildLootPool(groupName);
      if (lootPool.length === 0) {
        debugLog(`No loot available for group: ${groupName}`);
        return;
      }

      const randomLoot = lootPool[Math.floor(Math.random() * lootPool.length)];
      const { min, max } = randomLoot.dropRange || { min: config.defaultMinDrop, max: config.defaultMaxDrop };
      const quantity = Math.floor(Math.random() * (max - min + 1)) + min;

      let finalLoot = randomLoot.data;
      let wasProcedurallyGenerated = false;
      
      if (randomLoot.type === 'weapon' || randomLoot.type === 'armor') {
        const proceduralLoot = ED5.RandomLoot.addRandomPrefix(randomLoot);
        if (proceduralLoot && proceduralLoot.id !== randomLoot.data.id) {
          finalLoot = proceduralLoot;
          wasProcedurallyGenerated = true;
          $gameParty.loseItem(finalLoot, 1);
        }
      }

      const displayQuantity = wasProcedurallyGenerated ? 1 : quantity;
      debugLog(`Dropping ${displayQuantity}x ${randomLoot.type} from group '${groupName}': ${finalLoot.name}`);

      const source = sourceEvent || $gamePlayer;
      const sourceX = source.x;
      const sourceY = source.y;
      const target = ED5.RandomLoot.findDropTile(sourceX, sourceY, distance);
      
      const lootData = {
        type: randomLoot.type,
        item: finalLoot,
        quantity: displayQuantity,
        amount: 0,
        x: target.x,
        y: target.y,
        sourceX: sourceX,
        sourceY: sourceY,
        iconIndex: finalLoot.iconIndex || 0,
        landed: false,
        pickedUp: false,
        pickupDelay: 30 // Delay before pickup allowed
      };
      
      $gameMap.addLootDrop(lootData);
      
    } catch (error) {
      console.error("[ED5_RandomLoot] Error in spawnGroupLoot:", error);
    }
  };

  // Spawn Gold
  ED5.RandomLoot.spawnGold = (min, max, sourceEvent = null, distance = 0) => {
    try {
      const amount = Math.floor(Math.random() * (max - min + 1)) + min;
      
      debugLog(`Dropping ${amount} Gold`);
      
      const goldIconIndex = 314; 
      const source = sourceEvent || $gamePlayer;
      const sourceX = source.x;
      const sourceY = source.y;
      const target = ED5.RandomLoot.findDropTile(sourceX, sourceY, distance);
      
      const lootData = {
        type: 'gold',
        item: null,
        quantity: 0,
        amount: amount,
        x: target.x,
        y: target.y,
        sourceX: sourceX,
        sourceY: sourceY,
        iconIndex: goldIconIndex,
        landed: false,
        pickedUp: false,
        pickupDelay: 30 // Delay before pickup allowed
      };
      
      $gameMap.addLootDrop(lootData);
      
    } catch (error) {
      console.error("[ED5_RandomLoot] Error in spawnGold:", error);
    }
  };

  // ============================================================================
  // Plugin Command Registration (MZ)
  // ============================================================================

  if (isMZ) {
    PluginManager.registerCommand(pluginName, "spawnItem", function(args) {
      const distance = args && args.distance ? Number(args.distance) : 0;
      if (ED5.RandomLoot.isDatabaseLoaded()) {
        ED5.RandomLoot.spawnRandomLoot("item", this.character(0), distance);
      } else {
        console.warn("[ED5_RandomLoot] Database not loaded - cannot spawn item");
      }
    });

    PluginManager.registerCommand(pluginName, "spawnWeapon", function(args) {
      const distance = args && args.distance ? Number(args.distance) : 0;
      ED5.RandomLoot.spawnRandomLoot("weapon", this.character(0), distance);
    });

    PluginManager.registerCommand(pluginName, "spawnArmor", function(args) {
      const distance = args && args.distance ? Number(args.distance) : 0;
      ED5.RandomLoot.spawnRandomLoot("armor", this.character(0), distance);
    });

    PluginManager.registerCommand(pluginName, "spawnAll", function(args) {
      const distance = args && args.distance ? Number(args.distance) : 0;
      ED5.RandomLoot.spawnRandomLoot("all", this.character(0), distance);
    });

    PluginManager.registerCommand(pluginName, "spawnGroup", function(args) {
      const groupName = args.groupName;
      const distance = args && args.distance ? Number(args.distance) : 0;
      ED5.RandomLoot.spawnGroupLoot(groupName, this.character(0), distance);
    });

    PluginManager.registerCommand(pluginName, "spawnGold", function(args) {
      const min = Number(args.min) || 10;
      const max = Number(args.max) || 100;
      const distance = args && args.distance ? Number(args.distance) : 0;
      ED5.RandomLoot.spawnGold(min, max, this.character(0), distance);
    });
  }

  // ============================================================================
  // Plugin Command Registration (MV)
  // ============================================================================

  if (isMV) {
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
      _Game_Interpreter_pluginCommand.call(this, command, args);
      
      if (command === 'SpawnRandomItem') {
        const distance = args[0] ? Number(args[0]) : 0;
        ED5.RandomLoot.spawnRandomLoot('item', this.character(0), distance);
      } else if (command === 'SpawnRandomWeapon') {
        const distance = args[0] ? Number(args[0]) : 0;
        ED5.RandomLoot.spawnRandomLoot('weapon', this.character(0), distance);
      } else if (command === 'SpawnRandomArmor') {
        const distance = args[0] ? Number(args[0]) : 0;
        ED5.RandomLoot.spawnRandomLoot('armor', this.character(0), distance);
      } else if (command === 'SpawnRandomLoot') {
        const distance = args[0] ? Number(args[0]) : 0;
        ED5.RandomLoot.spawnRandomLoot('all', this.character(0), distance);
      } else if (command === 'SpawnGroupLoot') {
        const groupName = args[0];
        const distance = args[1] ? Number(args[1]) : 0;
        ED5.RandomLoot.spawnGroupLoot(groupName, this.character(0), distance);
      } else if (command === 'SpawnGold') {
        const min = Number(args[0]) || 10;
        const max = Number(args[1]) || 100;
        const distance = args[2] ? Number(args[2]) : 0;
        ED5.RandomLoot.spawnGold(min, max, this.character(0), distance);
      }
    };
  }
})();

Game_Party.prototype.averageLevel = function () {
  const members = this.members();
  if (members.length === 0) return 0;
  return Math.floor(
    members.reduce((sum, member) => sum + member.level, 0) / members.length
  );
};

Game_Party.prototype.averageParam = function (paramId) {
  const members = this.members();
  if (members.length === 0) return 0;
  return Math.floor(
    members.reduce((sum, member) => sum + member.param(paramId), 0) /
      members.length
  );
};

// ============================================================================
// Sprite_LootDrop (Removed - Replaced by Sprite_Loot)
// ============================================================================

//class Window_LootPop extends Window_Base {
//  constructor(message, iconIndex) {
//   const width = 160;
//    const height = 40;
//   const x = $gamePlayer.screenX() - width / 2;
//    const y = $gamePlayer.screenY() - 80;
//    // MZ: Window_Base takes a Rectangle; MV: (x, y, width, height)
//    if (Utils.RPGMAKER_NAME === "MZ") {
//      super(new Rectangle(x, y, width, height));
//    } else {
//      super(x, y, width, height);
//    }
//    this.opacity = 0;
//    this.contentsOpacity = 0;
//    this._message = message;
//    this._iconIndex = iconIndex;
//    this._fadeIn = true;
//    this._fadeOut = false;
//    this._duration = ED5.RandomLoot.config.popupDuration;
//    this._riseSpeed = ED5.RandomLoot.config.popupRiseSpeed;
//    this.refresh();
//  }

  // Remove default padding
//  updatePadding() {
//    this.padding = 0;
//  }

  // Remove default background opacity
//  updateBackOpacity() {
//   this.backOpacity = 0;
//  }

//  refresh() {
//    this.contents.clear();
//    this.drawBackground();
//    this.drawIconAndText();
//  }

//  drawBackground() {
//    const padding = 2; // Minimal padding for sleekness
//    const radius = 6; // Rounded corners
//    const width = this.width - padding * 2;
//    const height = this.height - padding * 2;
//    const x = padding;
//    const y = padding;

//    const context = this.contents.context;
//    context.save();
//    context.beginPath();
//    context.moveTo(x + radius, y);
//    context.lineTo(x + width - radius, y);
//    context.quadraticCurveTo(x + width, y, x + width, y + radius);
//    context.lineTo(x + width, y + height - radius);
//    context.quadraticCurveTo(
//      x + width,
//      y + height,
//      x + width - radius,
//      y + height
//    );
//    context.lineTo(x + radius, y + height);
//    context.quadraticCurveTo(x, y + height, x, y + height - radius);
//    context.lineTo(x, y + radius);
//    context.quadraticCurveTo(x, y, x + radius, y);
//    context.closePath();
//    context.fillStyle = "rgba(0, 0, 0, 0.85)"; // Darker semi-transparent black
//    context.fill();
//    context.restore();
//  }

//  drawIconAndText() {
//    const iconX = 4; // Icon position X
//    const iconY = (this.height - ED5_ICON_H) / 2; // Center icon vertically
//    const textX = iconX + ED5_ICON_W + 6; // Text starts after the icon
//    const textY = 0; // Text starts at the top
//    const textWidth = this.width - textX - 4; // Remaining width for text

    // Draw the icon
//    if (this._iconIndex !== undefined) {
//      this.drawIcon(this._iconIndex, iconX, iconY);
//    }

    // Draw the text
//    this.drawText(this._message, textX, textY, textWidth, "left");
//  }

//  update() {
//    super.update();

    // Guard: player may be unavailable during scene transitions.
//    if (!$gamePlayer) return;

    // Follow the player's position and rise upward
//    this.x = $gamePlayer.screenX() - this.width / 2;
//    this.y -= this._riseSpeed;

    // Handle fade-in and fade-out animations
//    if (this._fadeIn) {
//      this.opacity += 32;
//      this.contentsOpacity += 32;
//      if (this.opacity >= 255) {
//        this.opacity = 255;
//        this.contentsOpacity = 255;
//        this._fadeIn = false;
//      }
//    } else if (this._fadeOut) {
//      this.opacity -= 16;
//      this.contentsOpacity -= 16;
//      if (this.opacity <= 0) {
//        this.opacity = 0;
//        this.contentsOpacity = 0;
//        SceneManager._scene.removeChild(this);
//      }
//    } else {
//      // Start fade-out after the duration
//      this._duration--;
//      if (this._duration <= 0) {
//        this._fadeOut = true;
//      }
//    }
//  }
//}

//function showLootPop(message, iconIndex) {
//  const lootWindow = new Window_LootPop(message, iconIndex);
//  SceneManager._scene.addChild(lootWindow);
//  if (ED5.RandomLoot.config.enableDebugLog) {
//    console.log("[ED5_RandomLoot] Loot popup displayed:", message);
//  }
//}

// ============================================================================
//  ED5 ULTIMATE ABS INTEGRATION (detect-and-extend)
// ============================================================================
//  When ED5 ABS is loaded, enemy death events in ABS trigger the random
//  loot system, spawning drops at the enemy's location using the same
//  notetag-based pools and weighted rolls.
// ============================================================================

(function() {
    'use strict';

    var _absAvailable = (typeof ED5 !== 'undefined' && ED5.ABS &&
        ED5.ABS.MODULES && ED5.ABS.MODULES['Core']);

    if (_absAvailable) {
        console.log('[ED5_RandomLoot] ED5 ABS detected — hooking enemy death for loot drops.');

        // --- Enemy Death in ABS → spawn loot from pools ---
        ED5.ABS.on('enemyDeath', function(data) {
            if (!data || !data.target) return;
            var targetChar = data.target;
            var targetBattler = data.targetBattler;
            if (!targetBattler) return;

            // In MMO mode, only the host spawns loot (server authoritative)
            if (ED5.ABS.isMMO && ED5.ABS.isMMO() && !ED5.ABS.isHost()) return;

            // Check for enemy notetags for loot groups
            var enemy = targetBattler.enemy ? targetBattler.enemy() : null;
            if (!enemy) return;

            var note = enemy.note || '';
            var groupMatch = note.match(/<lootGroup:\s*(.+?)>/i);
            var typeMatch = note.match(/<lootType:\s*(.+?)>/i);
            var distance = 1;

            // Create a fake event-like object for position
            var sourceObj = {
                x: targetChar.x || targetChar._x || $gamePlayer.x,
                y: targetChar.y || targetChar._y || $gamePlayer.y,
                screenX: function() { return targetChar.screenX ? targetChar.screenX() : 0; },
                screenY: function() { return targetChar.screenY ? targetChar.screenY() : 0; }
            };

            if (groupMatch) {
                // Spawn from named group
                var groupName = groupMatch[1].trim();
                if (ED5.RandomLoot.spawnGroupLoot) {
                    ED5.RandomLoot.spawnGroupLoot(groupName, sourceObj, distance);
                }
            } else if (typeMatch) {
                // Spawn by type
                var lootType = typeMatch[1].trim().toLowerCase();
                if (ED5.RandomLoot.spawnRandomLoot) {
                    ED5.RandomLoot.spawnRandomLoot(lootType, sourceObj, distance);
                }
            } else {
                // Default: use standard enemy drops + random loot from 'all' pool
                if (ED5.RandomLoot.spawnRandomLoot) {
                    ED5.RandomLoot.spawnRandomLoot('all', sourceObj, distance);
                }
            }

            // Also spawn gold if enemy has gold value
            if (targetBattler.gold && targetBattler.gold() > 0) {
                var goldAmount = targetBattler.gold();
                // Randomize ±20%
                var minGold = Math.floor(goldAmount * 0.8);
                var maxGold = Math.ceil(goldAmount * 1.2);
                if (ED5.RandomLoot.spawnGold) {
                    ED5.RandomLoot.spawnGold(minGold, maxGold, sourceObj, distance);
                }
            }
        });

        // --- Drop Pickup → also works with ABS loot system ---
        // If ABS has its own drop system ($gameMap.absDrops), link them
        ED5.ABS.on('dropPickup', function(data) {
            if (!data || !data.drop) return;
            var drop = data.drop;
            // Show loot popup for ABS drop pickups
            if (drop.item && drop.item.name && drop.item.iconIndex !== undefined) {
                showLootPop(drop.item.name, drop.item.iconIndex);
            }
        });
    }

    // ========================================================================
    //  ED5 MMO INTEGRATION (detect-and-extend)
    // ========================================================================
    //  When ED5 MMO is loaded, register with the ExtensionBus so loot
    //  rolls can be server-authoritative (anti-cheat, fair distribution).
    // ========================================================================

    var _mmoAvailable = (typeof ED5 !== 'undefined' && ED5.MMO &&
        ED5.MMO.ExtensionBus && typeof $gameMMO !== 'undefined');

    if (_mmoAvailable) {
        console.log('[ED5_RandomLoot] ED5 MMO detected — registering extension "loot".');

        ED5.MMO.ExtensionBus.register('loot', {

            onConnect: function(client) {
                // Nothing to sync on connect — loot is event-driven
            },

            onMessage: function(action, data) {
                switch (action) {
                    case 'spawn_loot':
                        // Server tells us to spawn specific loot at a position
                        if (data.items && Array.isArray(data.items)) {
                            for (var i = 0; i < data.items.length; i++) {
                                var lootItem = data.items[i];
                                var container = null;
                                if (lootItem.type === 'item') container = $dataItems;
                                else if (lootItem.type === 'weapon') container = $dataWeapons;
                                else if (lootItem.type === 'armor') container = $dataArmors;
                                if (container && container[lootItem.id]) {
                                    var item = container[lootItem.id];
                                    $gameParty.gainItem(item, lootItem.amount || 1);
                                    if (item.name && item.iconIndex !== undefined) {
                                        showLootPop(item.name, item.iconIndex);
                                    }
                                }
                            }
                        }
                        if (data.gold && data.gold > 0) {
                            $gameParty.gainGold(data.gold);
                            showLootPop(data.gold + ' Gold', 314); // Gold icon
                        }
                        break;

                    case 'loot_denied':
                        // Server denied a loot pickup (already taken, etc.)
                        break;

                    case 'loot_announce':
                        // Rare item announcement to all players
                        if (data.playerName && data.itemName) {
                            if (typeof $gameMMO !== 'undefined' && $gameMMO.chat) {
                                $gameMMO.chat.send('system',
                                    data.playerName + ' found ' + data.itemName + '!');
                            }
                        }
                        break;
                }
            },

            getSyncData: function() {
                return {};
            },

            onMapChange: function(fromMapId, toMapId) {
                // Loot is position-based, nothing to sync on map change
            }
        });
    }

})();
