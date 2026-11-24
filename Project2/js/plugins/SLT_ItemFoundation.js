/*:
 * @target MZ
 * @plugindesc [MZ] [Item 1] [v1.5] [SLT_Item Foundation]
 * @author SLT (Shawn Trapp)
 * @url https://shawn-trapp.itch.io/slt-item-foundation-mz
 *
 * @param ===== Runtime Registration =====
 * @text ===== Runtime Registration =====
 * @type string
 * @default
 *
 * @param WeaponRuntimeStart
 * @text Weapon Runtime Start ID
 * @type number
 * @min 1
 * @default 3000
 *
 * @param ArmorRuntimeStart
 * @text Armor Runtime Start ID
 * @type number
 * @min 1
 * @default 3000
 *
 * @param ItemRuntimeStart
 * @text Item Runtime Start ID
 * @type number
 * @min 1
 * @default 3000
 *
 * @param ===== Display / Tier Colors =====
 * @text ===== Display / Tier Colors =====
 * @type string
 * @default
 *
 * @param EnableTierColors
 * @text Enable Tier Fallback Colors
 * @type boolean
 * @default true
 *
 * @param TierColorTable
 * @text Tier Color Table
 * @type struct<TierColor>[]
 * @default ["{\"tier\":\"1\",\"color\":\"#D8D8D8\"}","{\"tier\":\"2\",\"color\":\"#7ED957\"}","{\"tier\":\"3\",\"color\":\"#4DA6FF\"}","{\"tier\":\"4\",\"color\":\"#B26BFF\"}","{\"tier\":\"5\",\"color\":\"#FF5C5C\"}","{\"tier\":\"6\",\"color\":\"#FF8A3D\"}","{\"tier\":\"7\",\"color\":\"#FFD166\"}"]
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 *
 * Core framework for independent item handling and structured runtime data.
 *
 * This plugin establishes the foundation for all SLT independent item systems:
 * - Independent runtime item instances (weapons, armor, items)
 * - Structured per-instance data (_slt)
 * - Modular stat, durability, and property systems (compatible plugins)
 * - Composed item naming system (affix plugin support)
 * - Tier-based and custom color display (UI Foundation will take precedence)
 * - Runtime database registration (creates fresh item instance)
 * - Save/load persistence for runtime items (ensures that item data is stable)
 * 
 * In short, this plugin is the independent item core of the SLT independent
 * item suite. Other supported plugins within this group all depend on this
 * plugin to function properly.
 *
 * ============================================================================
 * ■ Load Order
 * ============================================================================
 *
 * - Place near the top of custom plugins.
 * - This plugin defines core behavior used by all SLT independent item systems.
 * - Relevant plugins will use a [Item <Tier> - <Purpose>] format in the
 *   description field of the plugin manager.
 *
 * ============================================================================
 * ■ Independent Item Behavior
 * ============================================================================
 *
 * By default, all items are treated as independent (instance-based).
 *
 * Each item gained creates a unique runtime instance with its own:
 * - stats (params, ex params, sp params)
 * - durability (if durability plugin is present)
 * - affixes (if affix plugin is present)
 * - custom properties
 *
 * It is possible to disable this behavior, and have an item act as a standard
 * database object via note tag. In this case, the stack size can be customized 
 * via note-tag as well.
 * 
 * ============================================================================
 * ■ Plugin Parameters
 * ============================================================================
 * 
 * Runtime Registration:
 * 
 * - Weapon runtime start ID: independent weapons will be initialized starting
 *   at this database slot, and will increment from there.
 * 
 * - Armor runtime start ID: independent armors will be initialized starting at 
 *   this database slot, and will increment from there.
 * 
 * - Item runtime start ID: independent items will be initialized starting at 
 *   this database slot, and will increment from there.
 * 
 * Display / Tier Color:
 * 
 * - Enable Tier Fallback Color: Default true. If set to false, all tier colors
 *   will default to standard text coloration (white).
 * 
 * Tier Color Table: By default a set of 7 tier colors are configured as hex
 * values. These may be changed to suit personal preference. If UI Foundation
 * is present, the tier colors will be set to whatever those values are 
 * configured to.
 * 
 * ============================================================================
 * ■ Note Tags
 * ============================================================================
 *
 * --- Display ---
 *
 * <Tier: x>
 *   Assigns item tier (used for fallback color mapping)
 *
 * <New Item Color: #RRGGBB>
 *   Forces a specific hex color for the text color of weapons, armors, or
 *   items. This will overwrite the item color with no regard to the presence 
 *   or lack of color fallback being enabled. It also applies regardless of 
 *   tier color assignment in either Item Foundation or UI Foundation.
 *
 * <New Item Color: x>
 *   Uses RPG Maker text color index, with the same guidelines as hex color 
 *   assignment. Either of these note tags will take priority over any other
 *   configured color settings.
 *
 * --- Inventory ---
 * 
 * <Non Independent> 
 *   Forces weapons, armors, and items to be standard database objects, so 
 *   they will stack normally, have a default stack cap of 99, possess static 
 *   properties, etc.
 *
 * <Slot Max: x>
 *   Sets max stack size for non-independent weapons, armors, and items.
 *
 * --- Foundation Stats ---
 * 
 * Important:
 * 
 * Foundation stat note tags are NOT displayed in
 * Stat Modifiers sections of item-card displays.
 *
 * To expose visible modifier entries, use Random Properties
 * module note tags instead.
 * 
 * ----------------------------------------
 * Flat Bonuses
 * ----------------------------------------
 *
 * Adds a flat value directly to the item's parameter total.
 * This is applied after the base stat roll and before any rate multipliers.
 *
 * Supports both fixed values and ranges (rolled at item creation).
 *
 * Examples:
 *
 * <New Item Flat: ATK +5>
 * → Adds +5 ATK to the final base stat
 *
 * <New Item Flat: ATK -5>
 * → Subtracts 5 ATK (can be used for tradeoffs or cursed items)
 *
 * <New Item Flat: ATK +3 to +8>
 * → Rolls a random value between +3 and +8 at creation
 *
 * <New Item Flat: ATK -8 to -3>
 * → Rolls a negative penalty between -8 and -3
 *
 * Notes:
 * - Flat bonuses stack additively with other flat sources
 * 
 * - Applied before rate multipliers
 * 
 * - Can be used alongside ItemProfileStatRoll outputs
 * 
 * ----------------------------------------
 *  Rate Bonuses
 * ----------------------------------------
 *
 * Applies a multiplicative modifier to the final parameter total.
 *
 * All rate bonuses are summed first, then applied once to the
 * final flat-adjusted parameter value.
 *
 *  Examples:
 *
 *  <New Item Rate: ATK +10%>
 *  → Increases ATK by 10%
 *
 *  <New Item Rate: ATK -10%>
 *  → Reduces ATK by 10%
 *
 *  <New Item Rate: ATK +5% to +15%>
 *  → Rolls a random multiplier between +5% and +15%
 *
 *  <New Item Rate: ATK -15% to +15%>
 *  → Rolls a value that can be either positive or negative
 *
 *  Notes:
 *  - Rate bonuses stack additively before being applied
 * 
 *  - Final multiplier is applied once after all flat bonuses
 * 
 *  - Result is floored before application (if applicable)
 * 
 * =============================================================================
 * ■ Tier System
 * =============================================================================
 *
 * Tier Color Priority order:
 *   
 *  1. Explicit color (<New Item Color>)
 * 
 *  2. UI Foundation parameters (if installed)
 *
 *  3. Item Foundation tier color (<Tier: x>)
 *
 *  4. Default UI color
 *   
 * - Tier colors are configured via plugin parameters.
 * 
 * Tier Properties:
 * - In combination with sorting note-tags <SortId: X> SLT custom scenes can 
 *   sort selections based on tier, equipment type, and alphabetically.
 * 
 * - If Item Profile Stat Roll is present, tier assignment will dictate random
 *   scaled stat distribution based on the selected profile and configured 
 *   parameters.
 * 
 * - Conceptually tiers are weapon and armor families with each "tier"
 *   occupying its own database slot. This means that stat distribution, 
 *   durability, properties, and such can be independently adjusted to 
 *   customize each tier level.
 * 
 * =============================================================================
 * ■ UI Foundation Compatibility
 * =============================================================================
 *
 * If SLT_UIFoundation is installed:
 * 
 * - Color resolution is delegated to UI Foundation.
 * 
 * - Item Foundation provides tier and explicit color data,
 *   but UI Foundation controls how colors are applied in UI rendering.
 *   
 * If SLT_UIFoundation is NOT installed:
 * 
 * - Item Foundation applies colors directly using its local settings.
 * 
 * - Local color settings in this plugin act as fallback values
 *   when UI Foundation is not present.
 *
 * ============================================================================
 * ■ Terms of Use / Credits
 * ============================================================================
 *
 *  Free for commercial and non-commercial RPG Maker projects.
 *
 *  Credit required:
 *  SLT (Shawn Trapp)
 * 
 *  - Developed with AI-assisted design and implementation support.
 *
 * ============================================================================
 * ■ Version History
 * ============================================================================
 *
 * v1.5
 * ----------------------------------------------------------------------------
 * - Added webpage link
 * - Adjusted plugin description
 * 
 * v1.4
 * ----------------------------------------------------------------------------
 * - Adjusted header for increased clarity.
 * - Properly set ownership of tier color to UI Foundation if present.
 * 
 * ============================================================================
 * v1.3
 * ----------------------------------------------------------------------------
 * -Added clearer documentation for usage of <New Item Flat/Rate: +/-X>
 *  notetags.
 * 
 * ============================================================================
 * v1.2
 * ----------------------------------------------------------------------------
 * -Item Foundation is preferred/expected for full compatibility with SLT
 *  independent item plugins. Changes to homogenize other SLT plugins.
 * 
 * ============================================================================
 * v1.1
 * ----------------------------------------------------------------------------
 * - Added runtime item save/load persistence
 * - Added stored tier resolution for display
 * - Stabilized item color rendering
 *
 * ============================================================================
 * v1.0
 * ----------------------------------------------------------------------------
 * - Initial release
 *
 * ============================================================================
 */ 

/*~struct~TierColor:
 * @param tier
 * @text Tier
 * @type number
 * @min 1
 * @default 1
 *
 * @param color
 * @text Color
 * @type string
 * @default #D8D8D8
 */
 
//=============================================================================
//  SLT_ItemFoundation
//=============================================================================


var SLT = SLT || {};
SLT.ItemCore = SLT.ItemCore || {};


(function() {

"use strict";

//=============================================================================
//  Parameters
//=============================================================================

const PLUGIN_NAME = "SLT_ItemFoundation";
const PARAMS = PluginManager.parameters(PLUGIN_NAME);

const WEAPON_RUNTIME_START = Number(PARAMS.WeaponRuntimeStart || 3000);
const ARMOR_RUNTIME_START  = Number(PARAMS.ArmorRuntimeStart || 3000);
const ITEM_RUNTIME_START   = Number(PARAMS.ItemRuntimeStart || 3000);

const ENABLE_TIER_COLORS = PARAMS.EnableTierColors === "true";

const TIER_COLOR_MAP = {};
try {
    const raw = JSON.parse(PARAMS.TierColorTable || "[]");
    for (const entry of raw) {
        const obj = JSON.parse(entry);
        const tier = Number(obj.tier);

        let color = String(obj.color || "").trim();

        while (
            (color.startsWith('"') && color.endsWith('"')) ||
            (color.startsWith("'") && color.endsWith("'"))
        ) {
            color = color.slice(1, -1).trim();
        }

        if (tier > 0 && color) {
            TIER_COLOR_MAP[tier] = color;
        }
    }
} catch (e) {
    console.warn("[SLT Tier Colors] Failed to parse TierColorTable", e);
}
 
SLT.ItemCore = SLT.ItemCore || {};
SLT.ItemCore.enableTierColors = ENABLE_TIER_COLORS;
SLT.ItemCore.tierColorMap = TIER_COLOR_MAP;

//=============================================================================
//  Internal State
//=============================================================================

let _instanceCounter = 1;
let _nextRuntimeWeaponId = 0;
let _nextRuntimeArmorId = 0;
let _nextRuntimeItemId = 0;

//=============================================================================
//  Core Schema Creator
//=============================================================================

SLT.ItemCore.createSLT = function(item, kind, baseItem) {
    return {
        version: 1,

       identity: {
            instanceId: SLT.ItemCore.nextInstanceId(),
            kind: kind,
            baseItemId: baseItem.id,
            baseName: baseItem.name,
            baseIconIndex: baseItem.iconIndex,
            isRuntimeInstance: false,
            runtimeId: 0
        },

        inheritedContent: [],

        display: {
            color: null,
            iconIndex: null,

            nameOverride: null,
            descriptionOverride: null,

            namePolicy: {
                maxPrefixes: 1,
                maxSuffixes: 0
            },

            nameParts: [],
            descriptionParts: [],
            specialLines: []
        },

        affixes: {
            prefixes: [],
            suffixes: []
        },

        modules: {
            quality: null,
            durability: null,
            statRolls: null,
            propertyRolls: null,
            refinement: null
        },

        runtime: {
            initialized: true,
            dirtyName: true,
            dirtyDescription: true,
            cachedName: "",
            cachedDescription: ""
        }

    };
        
};


//=============================================================================
//  Instance ID
//=============================================================================

SLT.ItemCore.nextInstanceId = function() {
    return _instanceCounter++;
};


//=============================================================================
//  Ensure Function
//=============================================================================

SLT.ItemCore.ensure = function(item) {    
    if (!item) return;

    if (!item._slt) {
        const kind = SLT.ItemCore.resolveKindFromItem(item);
        const base = SLT.ItemCore.resolveBaseObjectFromItem(item) || item;
        item._slt = SLT.ItemCore.createSLT(item, kind, base);
        applyFoundationStats(item);
        applyFoundationDisplay(item);
    }
};

//=============================================================================
//  Parameter Id Helper
//=============================================================================

const SLT_PARAM_MAP = {
    MHP: 0, MAXHP: 0,
    MMP: 1, MAXMP: 1,
    ATK: 2,
    DEF: 3,
    MAT: 4, MATTACK: 4,
    MDF: 5, MDEF: 5,
    AGI: 6,
    LUK: 7
};

function getParamIdFromName(name) {
    if (!name) return -1;
    const key = String(name).toUpperCase().replace(/\s+/g, "");
    return SLT_PARAM_MAP[key] ?? -1;
}

//=============================================================================
//  Type Helpers
//=============================================================================

SLT.ItemCore.getKind = function(item) {
    if (!item) return "item";
    if (item._slt?.identity?.kind) return item._slt.identity.kind;
    return SLT.ItemCore.resolveKindFromItem(item);
};

SLT.ItemCore.getBaseObject = function(item) {
    if (!item._slt) return null;

    const kind = item._slt.identity.kind;
    const id = item._slt.identity.baseItemId;

    if (kind === "weapon") return $dataWeapons[id];
    if (kind === "armor") return $dataArmors[id];
    return $dataItems[id];
};

SLT.ItemCore.resolveBaseObjectFromItem = function(item) {
    if (!item) return null;

    if (DataManager.isWeapon(item)) return $dataWeapons[item.id] || null;
    if (DataManager.isArmor(item))  return $dataArmors[item.id] || null;
    return $dataItems[item.id] || null;
};

SLT.ItemCore.resolveKindFromItem = function(item) {
    if (!item) return "item";

    if (DataManager.isWeapon(item)) return "weapon";
    if (DataManager.isArmor(item))  return "armor";
    return "item";
};

//=============================================================================
//  Runtime Database Registration Helpers
//=============================================================================

SLT.ItemCore.findHighestAuthoredId = function(dataArray) {
    let maxId = 0;

    for (let i = 1; i < dataArray.length; i++) {
        const obj = dataArray[i];
        if (obj && obj.id > maxId) {
            maxId = obj.id;
        }
    }

    return maxId;
};

SLT.ItemCore.initializeRuntimeIdCounters = function() {
    if (_nextRuntimeWeaponId <= 0) {
        const authoredWeaponMax = SLT.ItemCore.findHighestAuthoredId($dataWeapons);
        _nextRuntimeWeaponId = Math.max(WEAPON_RUNTIME_START, authoredWeaponMax + 1);
    }

    if (_nextRuntimeArmorId <= 0) {
        const authoredArmorMax = SLT.ItemCore.findHighestAuthoredId($dataArmors);
        _nextRuntimeArmorId = Math.max(ARMOR_RUNTIME_START, authoredArmorMax + 1);
    }

    if (_nextRuntimeItemId <= 0) {
    const authoredItemMax = SLT.ItemCore.findHighestAuthoredId($dataItems);
    _nextRuntimeItemId = Math.max(ITEM_RUNTIME_START, authoredItemMax + 1);
    }
};

SLT.ItemCore.nextRuntimeWeaponId = function() {
    SLT.ItemCore.initializeRuntimeIdCounters();
    return _nextRuntimeWeaponId++;
};

SLT.ItemCore.nextRuntimeArmorId = function() {
    SLT.ItemCore.initializeRuntimeIdCounters();
    return _nextRuntimeArmorId++;
};

SLT.ItemCore.nextRuntimeItemId = function() {
    SLT.ItemCore.initializeRuntimeIdCounters();
    return _nextRuntimeItemId++;
};

SLT.ItemCore.registerRuntimeInstance = function(item) {
    if (!item || !item._slt) return item;

    const kind = item._slt.identity.kind;

    if (kind === "weapon") {
        const runtimeId = SLT.ItemCore.nextRuntimeWeaponId();
        item.id = runtimeId;
        item._slt.identity.isRuntimeInstance = true;
        item._slt.identity.runtimeId = runtimeId;
        $dataWeapons[runtimeId] = item;
        return item;
    }

    if (kind === "armor") {
        const runtimeId = SLT.ItemCore.nextRuntimeArmorId();
        item.id = runtimeId;
        item._slt.identity.isRuntimeInstance = true;
        item._slt.identity.runtimeId = runtimeId;
        $dataArmors[runtimeId] = item;
        return item;
    }

    if (kind === "item") {
        const runtimeId = SLT.ItemCore.nextRuntimeItemId();
        item.id = runtimeId;
        item._slt.identity.isRuntimeInstance = true;
        item._slt.identity.runtimeId = runtimeId;
        $dataItems[runtimeId] = item;
        return item;
    }

    return item;
};

SLT.ItemCore.isRuntimeInstance = function(item) {
    return !!(item &&
        item._slt &&
        item._slt.identity &&
        item._slt.identity.isRuntimeInstance
    );
};

SLT.ItemCore.getRuntimeId = function(item) {
    return item?._slt?.identity?.runtimeId || 0;
};

//=============================================================================
//  Base Data Access
//=============================================================================

SLT.ItemCore.getBaseName = function(item) {
    return item._slt?.identity.baseName || item.name;
};

SLT.ItemCore.getBaseMeta = function(item) {
    const base = SLT.ItemCore.getBaseObject(item);
    return base?.meta || {};
};

SLT.ItemCore.getBaseNote = function(item) {
    const base = SLT.ItemCore.getBaseObject(item);
    return base?.note || "";
};

//=============================================================================
//  Inherited Content Helpers
//=============================================================================

SLT.ItemCore.resolveInheritedSource = function(type, id) {
    const sourceId = Number(id || 0);
    if (!Number.isFinite(sourceId) || sourceId <= 0) return null;

    const kind = String(type || "").trim().toLowerCase();

    let source = null;

    if (kind === "weapon") source = $dataWeapons[sourceId] || null;
    if (kind === "armor") source = $dataArmors[sourceId] || null;
    if (kind === "item") source = $dataItems[sourceId] || null;
    if (kind === "state") source = $dataStates[sourceId] || null;

    if (source && !source.meta && DataManager.extractMetadata) {
        DataManager.extractMetadata(source);
    }

    return source;
};

SLT.ItemCore.extractMaterializedTags = function(note, tagNames) {
    const out = [];
    const sourceNote = String(note || "");

    if (!sourceNote || !Array.isArray(tagNames) || !tagNames.length) {
        return out;
    }

    for (const tagName of tagNames) {
        const safeName = String(tagName || "").trim()
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        if (!safeName) continue;

        const singleRe = new RegExp(`<\\s*${safeName}\\s*:\\s*[^>]*>`, "gi");
        const blockRe = new RegExp(`<\\s*${safeName}\\s*>[\\s\\S]*?<\\s*\\/\\s*${safeName}\\s*>`, "gi");

        const singles = sourceNote.match(singleRe) || [];
        const blocks = sourceNote.match(blockRe) || [];

        for (const tag of [...singles, ...blocks]) {
            const clean = String(tag || "").trim();
            if (clean && !out.includes(clean)) out.push(clean);
        }
    }

    return out;
};

SLT.ItemCore.materializeNoteTags = function(item, source, tagNames) {
    if (!item || !source || !Array.isArray(tagNames) || !tagNames.length) return;

    const tags = SLT.ItemCore.extractMaterializedTags(source.note, tagNames);
    if (!tags.length) return;

    const existingNote = String(item.note || "");
    const additions = tags.filter(tag => !existingNote.includes(tag));

    if (!additions.length) return;

    item.note = `${existingNote.trim()}\n${additions.join("\n")}`.trim();

    if (DataManager.extractMetadata) {
        DataManager.extractMetadata(item);
    }
};

SLT.ItemCore.addInheritedContent = function(item, payload) {
    SLT.ItemCore.ensure(item);
    if (!item || !item._slt || !payload) return;

    const type = String(payload.type || "").trim().toLowerCase();
    const id = Number(payload.id || 0);

    if (!type || !Number.isFinite(id) || id <= 0) return;

    const source = SLT.ItemCore.resolveInheritedSource(type, id);
    if (!source) return;

    if (!Array.isArray(item._slt.inheritedContent)) {
        item._slt.inheritedContent = [];
    }

    const entry = {
        type,
        id,
        copyNote: payload.copyNote !== false,
        copyMeta: payload.copyMeta !== false,
        displayText: String(payload.displayText || "").trim(),
        sourceName: String(source.name || ""),
        materializeTags: Array.isArray(payload.materializeTags)
            ? payload.materializeTags.slice()
            : [],
        enabled: payload.enabled !== false
    };

    const duplicate = item._slt.inheritedContent.some(e =>
        e &&
        e.type === entry.type &&
        Number(e.id) === entry.id &&
        e.displayText === entry.displayText
    );

    if (duplicate) return;

    item._slt.inheritedContent.push(entry);

    if (entry.materializeTags.length) {
        SLT.ItemCore.materializeNoteTags(item, source, entry.materializeTags);
    }

    if (entry.displayText) {
        SLT.ItemCore.addSpecialLine(item, {
            id: `inherit_${entry.type}_${entry.id}_${entry.displayText}`,
            text: entry.displayText,
            priority: Number(payload.priority ?? 500),
            source: "inheritedContent"
        });
    }
};

SLT.ItemCore.getInheritedContent = function(item) {
    SLT.ItemCore.ensure(item);
    return Array.isArray(item?._slt?.inheritedContent)
        ? item._slt.inheritedContent
        : [];
};

SLT.ItemCore.getComposedNote = function(item) {
    if (!item) return "";

    SLT.ItemCore.ensure(item);

    const parts = [];

    const pushNote = function(note) {
        const text = String(note || "").trim();
        if (!text) return;
        if (!parts.includes(text)) parts.push(text);
    };

    pushNote(item.note);

    const baseNote = SLT.ItemCore.getBaseNote(item);
    if (baseNote && baseNote !== item.note) {
        pushNote(baseNote);
    }

    for (const entry of SLT.ItemCore.getInheritedContent(item)) {
        if (!entry || entry.enabled === false || entry.copyNote === false) continue;

        const source = SLT.ItemCore.resolveInheritedSource(entry.type, entry.id);
        const note = String(source?.note || "").trim();

        if (note) {
            pushNote(note);
        }
    }

    return parts.join("\n");
};

SLT.ItemCore.getComposedMeta = function(item) {
    const meta = {};

    if (!item) return meta;

    SLT.ItemCore.ensure(item);

    const assignMetaFrom = function(obj) {
        if (!obj) return;

        if (!obj.meta && DataManager.extractMetadata) {
            DataManager.extractMetadata(obj);
        }

        Object.assign(meta, obj.meta || {});
    };

    const base = SLT.ItemCore.getBaseObject(item);

    assignMetaFrom(base);
    assignMetaFrom(item);

    for (const entry of SLT.ItemCore.getInheritedContent(item)) {
        if (!entry || entry.enabled === false || entry.copyMeta === false) continue;

        const source = SLT.ItemCore.resolveInheritedSource(entry.type, entry.id);
        assignMetaFrom(source);
    }

    return meta;
};

//=============================================================================
//  Display Helpers - Special Lines
//=============================================================================

SLT.ItemCore.addSpecialLine = function(item, line) {
    SLT.ItemCore.ensure(item);
    if (!item || !item._slt || !line) return;

    if (!Array.isArray(item._slt.display.specialLines)) {
        item._slt.display.specialLines = [];
    }

    const text = String(line.text || "").trim();
    if (!text) return;

    const entry = {
        id: line.id || text,
        text,
        priority: Number(line.priority ?? 500),
        source: line.source || "unknown",
        enabled: line.enabled !== false
    };

    const duplicate = item._slt.display.specialLines.some(existing =>
        existing && String(existing.text || "") === entry.text
    );

    if (duplicate) return;

    item._slt.display.specialLines.push(entry);
};

SLT.ItemCore.getSpecialLines = function(item) {
    SLT.ItemCore.ensure(item);

    const lines = Array.isArray(item?._slt?.display?.specialLines)
        ? item._slt.display.specialLines
        : [];

    return lines
        .filter(line => line && line.enabled !== false && String(line.text || "").trim())
        .slice()
        .sort((a, b) => Number(a.priority ?? 500) - Number(b.priority ?? 500));
};


//=============================================================================
//  Display Helpers - Name Parts
//=============================================================================

SLT.ItemCore.markNameDirty = function(item) {
    if (!item || !item._slt) return;
    item._slt.runtime.dirtyName = true;
};

SLT.ItemCore.getNameParts = function(item) {
    SLT.ItemCore.ensure(item);
    return item._slt.display.nameParts;
};

SLT.ItemCore.addNamePart = function(item, part) {
    SLT.ItemCore.ensure(item);
    if (!part) return;

    const newPart = {
        id: part.id || "",
        kind: part.kind || "prefix",   // prefix | base | suffix
        text: String(part.text || "").trim(),
        priority: Number(part.priority ?? 500),
        source: part.source || "unknown",
        enabled: part.enabled !== false,
        uniqueByText: part.uniqueByText !== false
    };

    item._slt.display.nameParts.push(newPart);
    SLT.ItemCore.markNameDirty(item);
};

SLT.ItemCore.removeNamePart = function(item, id) {
    SLT.ItemCore.ensure(item);
    if (!id) return;

    item._slt.display.nameParts = item._slt.display.nameParts.filter(
        part => part.id !== id
    );

    SLT.ItemCore.markNameDirty(item);
};

SLT.ItemCore.clearNameParts = function(item, kind) {
    SLT.ItemCore.ensure(item);

    if (!kind) {
        item._slt.display.nameParts = [];
    } else {
        item._slt.display.nameParts = item._slt.display.nameParts.filter(
            part => part.kind !== kind
        );
    }

    SLT.ItemCore.markNameDirty(item);
};

SLT.ItemCore.setNameOverride = function(item, text) {
    SLT.ItemCore.ensure(item);
    item._slt.display.nameOverride = text != null ? String(text) : null;
    SLT.ItemCore.markNameDirty(item);
};

SLT.ItemCore.clearNameOverride = function(item) {
    SLT.ItemCore.ensure(item);
    item._slt.display.nameOverride = null;
    SLT.ItemCore.markNameDirty(item);
};

SLT.ItemCore.normalizeNameText = function(text) {
    return String(text || "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
};

SLT.ItemCore.composeName = function(item) {
    SLT.ItemCore.ensure(item);

    const display = item._slt.display;
    const runtime = item._slt.runtime;

    if (display.nameOverride != null) {
        runtime.cachedName = String(display.nameOverride);
        runtime.dirtyName = false;
        return runtime.cachedName;
    }

    const parts = (display.nameParts || []).filter(part =>
        part &&
        part.enabled &&
        String(part.text || "").trim()
    );

    let prefixes = parts.filter(part => part.kind === "prefix");
    let bases    = parts.filter(part => part.kind === "base");
    let suffixes = parts.filter(part => part.kind === "suffix");

    // If no explicit base token exists, inject base name automatically
    if (bases.length === 0) {
        bases.push({
            id: "base_name",
            kind: "base",
            text: SLT.ItemCore.getBaseName(item),
            priority: 500,
            source: "base",
            enabled: true,
            uniqueByText: true
        });
    }

    const sortByPriority = (a, b) => a.priority - b.priority;
    prefixes.sort(sortByPriority);
    bases.sort(sortByPriority);
    suffixes.sort(sortByPriority);

    const dedupeParts = function(arr) {
        const seen = new Set();
        const out = [];

        for (const part of arr) {
            if (!part.uniqueByText) {
                out.push(part);
                continue;
            }

            const norm = SLT.ItemCore.normalizeNameText(part.text);
            if (seen.has(norm)) continue;

            seen.add(norm);
            out.push(part);
        }

        return out;
    };

    prefixes = dedupeParts(prefixes);
    bases    = dedupeParts(bases);
    suffixes = dedupeParts(suffixes);

    const maxPrefixes = Number(display.namePolicy?.maxPrefixes ?? 1);
    const maxSuffixes = Number(display.namePolicy?.maxSuffixes ?? 0);

    if (maxPrefixes >= 0) prefixes = prefixes.slice(0, maxPrefixes);
    if (maxSuffixes >= 0) suffixes = suffixes.slice(0, maxSuffixes);

    const finalParts = [
        ...prefixes.map(p => p.text),
        ...bases.map(p => p.text),
        ...suffixes.map(p => p.text)
    ].filter(Boolean);

    runtime.cachedName = finalParts.join(" ").trim();
    runtime.dirtyName = false;

    return runtime.cachedName;
};

SLT.ItemCore.getDisplayName = function(item) {
    SLT.ItemCore.ensure(item);

    if (item._slt.runtime.dirtyName) {
        return SLT.ItemCore.composeName(item);
    }

    return item._slt.runtime.cachedName || SLT.ItemCore.composeName(item);
};

SLT.ItemCore.setNamePolicy = function(item, policy) {
    SLT.ItemCore.ensure(item);
    if (!policy) return;

    const current = item._slt.display.namePolicy || {};

    item._slt.display.namePolicy = {
        maxPrefixes: Number(policy.maxPrefixes ?? current.maxPrefixes ?? 1),
        maxSuffixes: Number(policy.maxSuffixes ?? current.maxSuffixes ?? 0)
    };

    SLT.ItemCore.markNameDirty(item);
};

SLT.ItemCore.getNamePolicy = function(item) {
    SLT.ItemCore.ensure(item);
    return item._slt.display.namePolicy;
};

//=============================================================================
//  Affix Helpers
//=============================================================================

SLT.ItemCore.getAffixes = function(item) {
    SLT.ItemCore.ensure(item);
    return item._slt.affixes;
};

SLT.ItemCore.getPrefixes = function(item) {
    SLT.ItemCore.ensure(item);
    return item._slt.affixes.prefixes;
};

SLT.ItemCore.getSuffixes = function(item) {
    SLT.ItemCore.ensure(item);
    return item._slt.affixes.suffixes;
};

SLT.ItemCore.hasAffix = function(item, id) {
    SLT.ItemCore.ensure(item);
    const all = [
        ...item._slt.affixes.prefixes,
        ...item._slt.affixes.suffixes
    ];
    return all.some(affix => affix.id === id);
};

SLT.ItemCore.addAffix = function(item, affix) {
    SLT.ItemCore.ensure(item);
    if (!affix || !affix.id) return;

    if (SLT.ItemCore.hasAffix(item, affix.id)) return;

    const newAffix = {
        id: affix.id,
        kind: affix.kind || "prefix",           // prefix | suffix
        sourceType: affix.sourceType || "unknown",
        sourceId: affix.sourceId || affix.id,
        text: String(affix.text || "").trim(),
        color: affix.color || null,
        priority: Number(affix.priority ?? 500),
        enabled: affix.enabled !== false,

        modifiers: Object.assign({}, affix.modifiers || {}),

        inheritedContent: {
            weaponId: affix.inheritedContent?.weaponId || null,
            armorId: affix.inheritedContent?.armorId || null,
            itemId: affix.inheritedContent?.itemId || null,
            stateIds: Array.isArray(affix.inheritedContent?.stateIds)
                ? affix.inheritedContent.stateIds.slice()
                : [],
            noteTags: Array.isArray(affix.inheritedContent?.noteTags)
                ? affix.inheritedContent.noteTags.slice()
                : []
        },

        specialLines: Array.isArray(affix.specialLines)
            ? affix.specialLines.slice()
            : [],

        meta: Object.assign({}, affix.meta || {})
    };

    if (newAffix.kind === "suffix") {
        item._slt.affixes.suffixes.push(newAffix);
    } else {
        item._slt.affixes.prefixes.push(newAffix);
    }

    // Optional name contribution if affix has visible text
    if (newAffix.text) {
        SLT.ItemCore.addNamePart(item, {
            id: newAffix.id,
            kind: newAffix.kind,
            text: newAffix.text,
            priority: newAffix.priority,
            source: "affix",
            enabled: newAffix.enabled,
            uniqueByText: true
        });
    }

    // Optional display color contribution
    if (newAffix.color) {
        item._slt.display.color = newAffix.color;
    }
};

SLT.ItemCore.removeAffix = function(item, id) {
    SLT.ItemCore.ensure(item);
    if (!id) return;

    item._slt.affixes.prefixes = item._slt.affixes.prefixes.filter(a => a.id !== id);
    item._slt.affixes.suffixes = item._slt.affixes.suffixes.filter(a => a.id !== id);

    SLT.ItemCore.removeNamePart(item, id);
};

//=============================================================================
//  Module Helpers
//=============================================================================

SLT.ItemCore.setModule = function(item, key, data) {
    SLT.ItemCore.ensure(item);
    if (!key) return;

    item._slt.modules[key] = data;
};

SLT.ItemCore.getModule = function(item, key) {
    SLT.ItemCore.ensure(item);
    if (!key) return null;

    return item._slt.modules[key] ?? null;
};

SLT.ItemCore.hasModule = function(item, key) {
    SLT.ItemCore.ensure(item);
    if (!key) return false;

    return item._slt.modules[key] != null;
};

SLT.ItemCore.ensureModule = function(item, key, defaults = {}) {
    SLT.ItemCore.ensure(item);
    if (!key) return null;

    if (!item._slt.modules[key]) {
        item._slt.modules[key] = JSON.parse(JSON.stringify(defaults));
    }

    return item._slt.modules[key];
};

SLT.ItemCore.clearModule = function(item, key) {
    SLT.ItemCore.ensure(item);
    if (!key) return;

    item._slt.modules[key] = null;
};

 
//=============================================================================
//  Parameter Export (Module Aggregation)
//=============================================================================

SLT.ItemCore.makeZeroParams = function() {
    return [0, 0, 0, 0, 0, 0, 0, 0];
};

SLT.ItemCore.normalizeModuleBuckets = function(data) {
    const zero = SLT.ItemCore.makeZeroParams();

    if (!data || typeof data !== "object") {
        return {
            flatParams: zero.slice(),
            rateParams: zero.slice(),
            runtimeFlatParams: zero.slice(),
            runtimeRateParams: zero.slice(),
            meta: {}
        };
    }

    const normalizeArray = function(arr) {
        const out = zero.slice();

        if (!arr || typeof arr !== "object") {
            return out;
        } 

        for (let i = 0; i < 8; i++) {
            out[i] = Number(arr[i] || 0);
        }

        return out;
    };

    return {
        flatParams: normalizeArray(data.flatParams),
        rateParams: normalizeArray(data.rateParams),
        runtimeFlatParams: normalizeArray(data.runtimeFlatParams),
        runtimeRateParams: normalizeArray(data.runtimeRateParams),
        meta: Object.assign({}, data.meta || {})
    };
};

SLT.ItemCore.collectParamBuckets = function(item) {
    SLT.ItemCore.ensure(item);

    const total = {
        flatParams: SLT.ItemCore.makeZeroParams(),
        rateParams: SLT.ItemCore.makeZeroParams(),
        runtimeFlatParams: SLT.ItemCore.makeZeroParams(),
        runtimeRateParams: SLT.ItemCore.makeZeroParams()
    };

    const modules = item._slt?.modules || {};

    for (const key in modules) {
        const mod = SLT.ItemCore.normalizeModuleBuckets(modules[key]);

        for (let i = 0; i < 8; i++) {
            total.flatParams[i] += mod.flatParams[i];
            total.rateParams[i] += mod.rateParams[i];
            total.runtimeFlatParams[i] += mod.runtimeFlatParams[i];
            total.runtimeRateParams[i] += mod.runtimeRateParams[i];
        }
    }

    return total;
};

//=============================================================================
//  Parameter Helpers
//=============================================================================

SLT.ItemCore.getFinalParam = function(item, paramId) {
    if (!item) return 0;

    // Non-independent / non-SLT fallback
    if (!item._slt) {
        return Math.floor(Number(item?.params?.[paramId] || 0));
    }

    const buckets = SLT.ItemCore.collectParamBuckets(item);

    let value = 0;

    // Permanent flat stage
    value += Number(buckets.flatParams[paramId] || 0);

    // Permanent rate stage
    const permanentRate = Number(buckets.rateParams[paramId] || 0);
    value = Math.floor(value * (1 + permanentRate));

    // Runtime flat stage
    value += Number(buckets.runtimeFlatParams[paramId] || 0);

    // Runtime rate stage
    let runtimeRate = Number(buckets.runtimeRateParams[paramId] || 0);

    // Inject durability multiplier
    const durability = window.SLT?.Durability;
    if (durability && typeof durability.getMultiplier === "function") {
        const mult = durability.getMultiplier(item);

        if (typeof mult === "number") {
            runtimeRate += (mult - 1); // convert multiplier to additive rate
        }
    }

    value = Math.floor(value * (1 + runtimeRate));

        return Math.floor(value);
    };

//=============================================================================
//  Display Color Helpers
//=============================================================================

SLT.ItemCore.setDisplayColor = function(item, hex) {
    SLT.ItemCore.ensure(item);
    item._slt.display.color = hex || null;
};

SLT.ItemCore.getDisplayColor = function(item) {
    SLT.ItemCore.ensure(item);
    return item._slt.display.color || null;
};

SLT.ItemCore.clearDisplayColor = function(item) {
    SLT.ItemCore.ensure(item);
    item._slt.display.color = null;
};

//=============================================================================
//  Note Tag Parsing + Rolling
//=============================================================================

function parseFoundationStatTags(item) {
    if (!item?.note) return [];

    const lines = item.note.split(/[\r\n]+/);
    const results = [];

    const flatRegex = /<\s*New Item Flat\s*:\s*(\w+)\s*([+-]?\d+)(?:\s*to\s*([+-]?\d+))?\s*>/i;
    const rateRegex = /<\s*New Item Rate\s*:\s*(\w+)\s*([+-]?\d+)%?(?:\s*to\s*([+-]?\d+)%?)?\s*>/i;

    for (const line of lines) {
        let m;

        if ((m = flatRegex.exec(line))) {
            const paramId = getParamIdFromName(m[1]);
            if (paramId < 0) continue;

            const min = Number(m[2]);
            const max = m[3] !== undefined ? Number(m[3]) : min;

            results.push({
                type: "flat",
                paramId,
                min,
                max
            });
        }

        if ((m = rateRegex.exec(line))) {
            const paramId = getParamIdFromName(m[1]);
            if (paramId < 0) continue;

            const min = Number(m[2]) / 100;
            const max = m[3] !== undefined ? Number(m[3]) / 100 : min;

            results.push({
                type: "rate",
                paramId,
                min,
                max
            });
        }
    }

    return results;
}

function rollValue(min, max) {
    if (min === max) return min;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollRate(min, max) {
    if (min === max) return min;
    return min + Math.random() * (max - min);
}

function parseFoundationDisplayTags(item) {
    if (!item?.note) return {};

    const lines = item.note.split(/[\r\n]+/);
    const out = {};

    const colorRegex = /<\s*New Item Color\s*:\s*(.+?)\s*>/i;

    for (const line of lines) {
        const m = colorRegex.exec(line);
        if (!m) continue;

        const raw = String(m[1]).trim();

        // Hex color
        if (/^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(raw)) {
            out.color = raw;
            continue;
        }

        // Window text color index
        if (/^\d+$/.test(raw)) {
            out.colorIndex = Number(raw);
            continue;
        }
    }

    return out;
}

function getItemTier(item) {
    if (!item) return null;

    if (item._slt?.display && Number.isInteger(item._slt.display.tier)) {
        return item._slt.display.tier;
    }

    const notes = [];

    if (item.note) notes.push(item.note);

    const baseNote = SLT.ItemCore.getBaseNote
        ? SLT.ItemCore.getBaseNote(item)
        : "";

    if (baseNote && baseNote !== item.note) {
        notes.push(baseNote);
    }

    for (const note of notes) {
        const match = String(note).match(/<\s*Tier\s*:\s*(\d+)\s*>/i);
        if (match) return Number(match[1]);
    }

    return null;
}

SLT.ItemCore.getItemTier = getItemTier;


SLT.ItemCore.getSlotMax = function(item) {
    if (!item || !item.note) return null;

    const match = item.note.match(/<\s*Slot\s*Max\s*:\s*(\d+)\s*>/i);
    if (!match) return null;

    const value = Number(match[1]);
    if (isNaN(value)) return null;

    return Math.max(1, Math.min(999, value));
};

//=============================================================================
//  Inventory Behavior Overrides
//=============================================================================

const _Game_Party_maxItems = Game_Party.prototype.maxItems;
Game_Party.prototype.maxItems = function(item) {
    if (!item) return _Game_Party_maxItems.call(this, item); 
     
    if (SLT.ItemCore && !SLT.ItemCore.isIndependent(item)) {
        const slotMax = SLT.ItemCore.getSlotMax(item);
        if (slotMax !== null) return slotMax;
    }

    return _Game_Party_maxItems.call(this, item);
};

//=============================================================================
// Foundation Module Application
//=============================================================================

function applyFoundationStats(item) {
    if (item._slt?.modules?.foundation?.meta?.applied) return;

    if (!item) return;

    const defs = parseFoundationStatTags(item);
   
    if (!defs.length) return;

    const flatParams = Array(8).fill(0);
    const rateParams = Array(8).fill(0);

    for (const def of defs) {
        if (def.type === "flat") {
            const val = rollValue(def.min, def.max);
            flatParams[def.paramId] += val;
        }

        if (def.type === "rate") {
            const val = rollRate(def.min, def.max);
            rateParams[def.paramId] += val;
        }
    }

    const moduleData = {
        flatParams,
        rateParams,
        runtimeFlatParams: Array(8).fill(0),
        runtimeRateParams: Array(8).fill(0),
        meta: {
            source: "foundation",
            applied: true
        }
    };

    SLT.ItemCore.setModule(item, "foundation", moduleData);    
}

//=============================================================================
// Foundation Display Application
//=============================================================================

function applyFoundationDisplay(item) {
    if (!item?._slt) return;

    if (item._slt?.display?.foundationApplied) return;

    const displayData = parseFoundationDisplayTags(item);

    if (displayData.color) {
        item._slt.display.color = displayData.color;
    }

    if (Number.isInteger(displayData.colorIndex)) {
        item._slt.display.colorIndex = displayData.colorIndex;
    }

    const tier = getItemTier(item);
        if (Number.isInteger(tier) && tier > 0) {
            item._slt.display.tier = tier;
        }

    item._slt.display.foundationApplied = true;
}

function resolveTierColor(item, tier) {
    const ui = window.SLT?.UI;

    if (
        ui &&
        typeof ui.getTierColor === "function" &&
        ui.Colors?.tiers?.[Number(tier)]
    ) {
        return ui.getTierColor(tier);
    }

    const core = window.SLT?.ItemCore;
    const tierMap = core?.tierColorMap || {};
    return tier ? tierMap[tier] : null;
}

//=============================================================================
// 🔷 Independent Item Creation
//=============================================================================

SLT.ItemCore.makeInstance = function(baseItem, kind) {
    const newItem = JsonEx.makeDeepCopy(baseItem);

    newItem._slt = SLT.ItemCore.createSLT(newItem, kind, baseItem);
    applyFoundationStats(newItem);
    applyFoundationDisplay(newItem);

    return newItem;
};

SLT.ItemCore.makeRegisteredInstance = function(baseItem, kind) {
    const instance = SLT.ItemCore.makeInstance(baseItem, kind);
    const runtimeItem = SLT.ItemCore.registerRuntimeInstance(instance);

    if (window.SLT?.ItemProfileRoll?.ensureRolled) {
        SLT.ItemProfileRoll.ensureRolled(runtimeItem);
    }

    return runtimeItem;
};


//=============================================================================
// 🔷 Independent Detection 
//=============================================================================

SLT.ItemCore.isIndependent = function(item) {
    if (!item) return false;

    const note = item.note || "";
    if (/<\s*Non\s*Independent\s*>/i.test(note)) return false;

    return true;
};


//=============================================================================
// 🔷 Debug Helper 
//=============================================================================

SLT.ItemCore.debugItem = function(item) {
    if (!item) {
        console.warn("[SLT] debugItem: no item provided");
        return;
    }

    const modules = item._slt?.modules || {};

    const finalParams = Array.from({ length: 8 }, (_, i) => {
        return SLT.ItemCore.getFinalParam(item, i);
    });

    console.log("[SLT] Debug Item:", {
        name: item.name,
        baseParams: item.params,
        display: item._slt?.display || {},
        modules: modules,
        finalParams: finalParams
    });
};

//=============================================================================
// 🔷 Gain Item Hook 
//=============================================================================

(() => {

    const _Game_Party_gainItem = Game_Party.prototype.gainItem;

    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        if (!item || amount === 0) {
            return _Game_Party_gainItem.call(this, item, amount, includeEquip);
        }

        const isSupportedType =
            DataManager.isWeapon(item) ||
            DataManager.isArmor(item) ||
            DataManager.isItem(item);

        if (!isSupportedType) {
            return _Game_Party_gainItem.call(this, item, amount, includeEquip);
        }

        // IMPORTANT:
        // If this is already a runtime instance, do NOT clone it again.
        // Just let vanilla add/remove that exact object.
        if (SLT.ItemCore.isRuntimeInstance(item)) {
           return _Game_Party_gainItem.call(this, item, amount, includeEquip);
        }

        const independent = SLT.ItemCore.isIndependent(item);

        if (!independent) {
            return _Game_Party_gainItem.call(this, item, amount, includeEquip);
        }

        // Independent authored weapons/armors/items: create registered runtime instances
        if (amount > 0) {
            for (let i = 0; i < amount; i++) {
                const runtimeItem = SLT.ItemCore.makeRegisteredInstance(
                    item,
                    SLT.ItemCore.resolveKindFromItem(item)
                );

                _Game_Party_gainItem.call(this, runtimeItem, 1, includeEquip);
            }
            return;
        }

        // Negative removal of authored independent equipment shouldn't normally happen,
        // but fallback to vanilla for safety.
        return _Game_Party_gainItem.call(this, item, amount, includeEquip);

    };

})();

//=============================================================================
// 🔷 Battler Param Patch
//=============================================================================

(() => {

    const _Game_BattlerBase_param = Game_BattlerBase.prototype.param;

    Game_BattlerBase.prototype.param = function(paramId) {
        let value = _Game_BattlerBase_param.call(this, paramId);

        if (!this.equips) return value;

        const equips = this.equips();

        for (const item of equips) {
            if (item && item._slt) {
                const authored = Number(item.params?.[paramId] || 0);
                const resolved = SLT.ItemCore.getFinalParam(item, paramId);

                // Remove authored database/template equip contribution,
                // then add Foundation-resolved contribution.
                value -= authored;
                value += resolved;
            }
        }

        return value;
    };

})();


//=============================================================================
// 🔷 Runtime Item Save / Load Persistence
//=============================================================================

SLT.ItemCore.collectRuntimeItemsForSave = function() {
    const collect = function(dataArray) {
        const out = [];

        for (let i = 1; i < dataArray.length; i++) {
            const item = dataArray[i];

            if (item?._slt?.identity?.isRuntimeInstance) {
                out.push(JsonEx.makeDeepCopy(item));
            }
        }

        return out;
    };

    return {
        version: 1,
        weapons: collect($dataWeapons),
        armors: collect($dataArmors),
        items: collect($dataItems)
    };
};

SLT.ItemCore.restoreRuntimeItemsFromSave = function(saveData) {
    if (!saveData) return;

    const restore = function(list, dataArray) {
        if (!Array.isArray(list)) return 0;

        let maxId = 0;

        for (const item of list) {
            if (!item || !item.id) continue;

            dataArray[item.id] = item;
            maxId = Math.max(maxId, Number(item.id || 0));

            if (item._slt?.identity) {
                item._slt.identity.isRuntimeInstance = true;
                item._slt.identity.runtimeId = item.id;
            }
        }

        return maxId;
    };

    const maxWeaponId = restore(saveData.weapons, $dataWeapons);
    const maxArmorId  = restore(saveData.armors, $dataArmors);
    const maxItemId   = restore(saveData.items, $dataItems);

    SLT.ItemCore.initializeRuntimeIdCounters();

    if (maxWeaponId > 0) {
        _nextRuntimeWeaponId = Math.max(_nextRuntimeWeaponId, maxWeaponId + 1);
    }

    if (maxArmorId > 0) {
        _nextRuntimeArmorId = Math.max(_nextRuntimeArmorId, maxArmorId + 1);
    }

    if (maxItemId > 0) {
        _nextRuntimeItemId = Math.max(_nextRuntimeItemId, maxItemId + 1);
    }

};

SLT.ItemCore.installSavePersistence = function() {
    if (SLT.ItemCore._savePersistenceInstalled) return;
    SLT.ItemCore._savePersistenceInstalled = true;

    const _makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        const contents = _makeSaveContents.call(this);

        contents.sltItemFoundation = SLT.ItemCore.collectRuntimeItemsForSave();

        return contents;
    };

    const _extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _extractSaveContents.call(this, contents);

        if (contents?.sltItemFoundation) {
            SLT.ItemCore.restoreRuntimeItemsFromSave(contents.sltItemFoundation);
        }
    };   
};

// Install after all plugins have loaded.
(() => {
    const _Scene_Boot_start_SLT_ItemFoundation = Scene_Boot.prototype.start;

    Scene_Boot.prototype.start = function() {
        SLT.ItemCore.installSavePersistence();
        _Scene_Boot_start_SLT_ItemFoundation.call(this);
    };
})();

//=============================================================================
// 🔷 Shared Item Name Draw Override
//=============================================================================

(() => {

    const _Window_Base_drawItemName = Window_Base.prototype.drawItemName;

    Window_Base.prototype.drawItemName = function(item, x, y, width) {
        
        if (!item) {
            return _Window_Base_drawItemName.call(this, item, x, y, width);
        }

        const core = window.SLT?.ItemCore || null;
        const statRoll = window.SLT?.ItemProfileRoll || null;

        if (core && typeof core.ensure === "function") {
            core.ensure(item);
        }

        if (statRoll && typeof statRoll.ensureRolled === "function") {
            statRoll.ensureRolled(item);
        }

        const display = item._slt?.display || {};
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, (width || 312) - textMargin);

        this.drawIcon(item.iconIndex, x, iconY);

        let appliedCustomColor = false;

        if (display.color) {
            this.changeTextColor(display.color);
            appliedCustomColor = true;

        } else if (Number.isInteger(display.colorIndex)) {
            this.changeTextColor(ColorManager.textColor(display.colorIndex));
            appliedCustomColor = true;

        } else if (
            core &&
            core.enableTierColors &&
            typeof core.getItemTier === "function"
        ) {
            const tier = core.getItemTier(item);
            const tierColor = resolveTierColor(item, tier);

            if (
                typeof tierColor === "string" &&
                /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(tierColor.trim())
            ) {
                
                this.changeTextColor(tierColor.trim());

                appliedCustomColor = true;
            }
        }

        const name = SLT.ItemCore?.getDisplayName?.(item) ?? item.name;

               
        this.drawText(name, x + textMargin, y, itemWidth);

        if (appliedCustomColor) {
            this.resetTextColor();
        }

       
    };

})();



})();