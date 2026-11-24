/*:
 * @target MZ
 * @plugindesc [MZ] [Item 2] [v1.3] [SLT_Item Random Properties]
 * @author SLT (Shawn Trapp)
 * @url https://shawn-trapp.itch.io/slt-item-random-properties-mz
 *
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 * This plugin generates randomized item properties at runtime, including:
 *
 * - Base parameter bonuses (ATK, DEF, etc.)
 * - EX / SP parameter modifications
 * - Elemental damage bonuses
 * - Broad damage dealt modifiers (Physical / Magical / All)
 * - Elemental resistances (including weakness and immunity)
 * - Metadata inheritance from database objects (items / armors / weapons)
 *
 * Properties are defined via note tags and rolled when items are created.
 *
 * This plugin is part of the SLT Itemization Package and is designed to work
 * alongside Item Foundation and other SLT systems.
 * 
 * Designed for scalable ARPG-style itemization.
 *
 * ============================================================================
 * ■ Requirements / Load Order
 * ============================================================================
 * - RPG Maker MZ (Engine, Required)
 * - Recommended: SLT_ItemFoundation
 *   (Place at the top of SLT item system load order)
 * 
 * - SLT_Refinement 
 *   (Future display integration support; unreleased)
 *
 * - Place below core systems such as VisuStella plugins.
 *
 * ============================================================================
 * ■ Display Behavior
 * ============================================================================
 * This plugin does not draw UI directly. Instead, it outputs structured data
 * used by other scenes (e.g. Refinement, Equipment screens).
 *
 * Display categories:
 * - StatModifiers (base parameter modifications)
 * - ExParams (ex param modifications)
 * - SpParams (sp param modifications)
 * - Special (unique properties, including data read from note tags)
 *
 * ============================================================================
 * ■ Element Mapping
 * ============================================================================
 * Element names used in note tags are resolved via:
 *
 * 1. Explicit: Element X (e.g. Element 5)
 * 2. Plugin Parameters (ElementNameMap)
 * 3. Alias fallback
 * 4. Legacy fallback (internal maps)
 *
 * Example:
 *   Heat → ID 3
 *   Cold → ID 5
 *   Slashing → ID 2
 * 
 * ============================================================================
 * ■ Plugin Commands
 * ============================================================================
 * 
 * Commands Used: None
 * 
 * ============================================================================
 * ■ Note Tag Usage
 * ============================================================================
 *
 * ---------------------------------------------------------------------------
 * Random List Properties
 * ---------------------------------------------------------------------------
 * Applies all valid entries:
 * 
 * Format:
 * 
 * <Random List Properties>
 * Line_entry_1: (chance_of_acquisition%)
 * Line_entry_2: (chance_of_acquisition%)
 * </Random List Properties>
 * 
 * Example:
 * 
 * <Random List Properties>
 * Heat Damage: +25% to +25% (100%)
 * Cold Resistance: -25% to -25% (100%)
 * </Random List Properties>
 *
 * ---------------------------------------------------------------------------
 * Random Property Pool
 * ---------------------------------------------------------------------------
 * Selects ONE entry based on weighted chance:
 * Note that the sum of the line entries percent_weights must equal 100%.
 *  
 * Format:
 * 
 * <Random Property Pool: chance_of_pool_activating%>
 * line_entry_1: (percent_weight%)
 * line_entry_2: (percent_weight%)
 * ...
 * line_entry_N: (percent_weight%)
 * </Random Property Pool>
 * 
 * Example:
 *
 * <Random Property Pool: 100%>
 * Heat Damage: +25% to +25% (50%)
 * Cold Damage: +25% to +25% (50%)
 * </Random Property Pool>
 * 
 * ============================================================================
 * ■ MetaInherit Properties
 * ============================================================================
 * Allows random properties to inherit metadata and note-tag behavior from
 *  database objects.
 *
 *  Supported sources:
 *  - Data Weapons
 *  - Data Armors
 *  - Data Items
 *
 *  Syntax:
 *
 *  - Data Weapons MetaInherit: database_id (chance%)
 *  - Data Armors MetaInherit: database_id (chance%)
 *  - Data Items MetaInherit: database_id (chance%)
 * 
 *  Example: 
 * 
 *  <Random List Properties>
 *  Data Armors MetaInherit: 24 (25%)
 *  </Random List Properties>
 * 
 *
 *  Optional display label:
 *
 *  - Data Weapons/Armors/Items MetaInherit: database_id [display_name] (chance%)
 * 
 *  Example: 
 * 
 *  <Random List Properties>
 *  Data Weapons MetaInherit: 37 [Protector Set] (15%)
 *  </Random List Properties>
 *
 *  This allows randomized items to inherit compatible metadata such as:
 *  - Equip Set tags
 *  - passive compatibility tags
 *  - external plugin note-tag behaviors
 *
 *  The optional bracket label controls player-facing display text shown in:
 *  - Refinement
 *  - item cards
 *  - special property displays
 *
 *  If omitted, a fallback display label is generated automatically.
 *
 *  ============================================================================
 *  ■ MetaInherit Design Purpose
 *  ============================================================================
 *
 *  MetaInherit allows randomized properties to inherit note-tag and metadata
 *  behavior from existing database objects.
 *
 *  This makes it possible to:
 *  - randomize set bonuses
 *  - inject compatibility tags
 *  - grant conditional passive effects
 *  - reuse complex note-tag behavior
 *  - modularize special item properties
 *
 *  Rather than hardcoding every property directly into the random-property
 *  parser, MetaInherit allows external systems and plugins to participate
 *  through inherited metadata.
 * 
 *  - When choosing a weapon, armor, or item to be a carrier for inheritable 
 *  traits, it is recommended that only the desired metadata and traits are
 *  present. If using brackets for optional display, keep in mind that the
 *  name will apply to all data inherited from the chosen object. If each
 *  inherited property should have its own display name, use separate
 *  inheritance payload objects, each with its own display label.
 * 
 * ============================================================================
 * ■ Supported Property Types
 * ============================================================================
 *
 * --- Base Parameters ---
 * List or Pool OK:
 * MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *
 * Supported Ranges:
 * - Negative or Positive
 * - Flat or Rate
 *
 * ----------------------------------------------------------------------------
 *
 * --- EX Parameters ---
 * List or Pool OK:
 * Hit Rate, Evasion Rate, Critical Rate, Critical Evasion,
 * Magic Evasion, Magic Reflection, Counter Rate,
 * HP Regeneration, MP Regeneration, TP Regeneration
 *
 * Supported Ranges:
 * - Negative or Positive
 * - Rate Only
 *
 * ----------------------------------------------------------------------------
 * 
 * --- SP Parameters ---
 * List or Pool OK:
 * Target Rate, Guard Effect, Recovery Effect,
 * Pharmacology, MP Cost Rate, TP Charge Rate,
 * Physical Damage Rate, Magical Damage Rate,
 * Floor Damage Rate, Experience Rate
 * 
 * Supported Ranges:
 * - Negative or Positive
 * - Rate Only
 *
 * These are native RPG Maker SP Parameters and primarily affect
 * damage received or battler rate behavior.
 *
 * ----------------------------------------------------------------------------
 * 
 * --- Elemental Damage ---
 * List or Pool OK:
 * Any element defined through plugin parameters.
 *
 * Supported Ranges:
 * - Negative or Positive
 * - Flat or Rate
 *
 * ----------------------------------------------------------------------------
 *
 * --- Broad Damage Types ---
 * List or Pool OK:
 * - Physical Damage Dealt
 * - Magical Damage Dealt
 * - All Damage Dealt
 *
 * These are custom SLT offensive damage modifiers affecting outgoing damage.
 * In essence, they apply to the broad categories, not elements specifically.
 * 
 * Supported Ranges:
 * - Negative or Positive
 * - Flat or Rate
 *
 * ----------------------------------------------------------------------------
 *
 * --- Elemental Resistance ---
 * List or Pool OK:
 * Any element defined through plugin parameters.
 * 
 * Supported Ranges:
 * - Negative or Positive
 * - Rate Only
 *
 * Example:
 * Heat Resistance: +25% to +25%
 * Cold Resistance: -25% to -25%
 *
 * Special Syntax:
 * <Element> Resistance: Null
 *
 * This grants immunity to the specified damage type.
 *
 * ============================================================================
 * ■ Value Ranges
 * ============================================================================
 * 
 *  Supports:
 *  - Positive ranges
 *  - Negative ranges
 *  - Mixed ranges
 *
 *  Example:
 *  Cold Resistance: -50% to +50%
 *
 *  This may produce either resistance or weakness.
 *
 *  Range behavior:
 *  - Left value = minimum roll
 *  - Right value = maximum roll
 *
 *  Equal values produce fixed results.
 * 
 * ============================================================================
 * ■ Examples
 * ============================================================================
 * 
 * <Random List Properties>
 * AGI: -10 to +10 (35%)
 * LUK: +5% to +10% (20%)
 * Physical Damage Dealt: +20% to +30% (100%)
 * Heat Damage: +10% to +25% (100%)
 * Cold Resistance: -20% to -10% (100%)
 * </Random List Properties>
 * 
 * <Random List Properties>
 * Critical Rate: +3% to +8% (100%)
 * Physical Damage Dealt: +10% to +25% (40%)
 * Data Armors MetaInherit: 24 [Protector Set] (20%)
 * </Random List Properties>
 *
 * <Random Property Pool: 100%>
 * Slashing Resistance: Null (25%)
 * Heat Resistance: +50% to +50% (75%)
 * </Random Property Pool>
 * 
 * <Random List Properties>
 * Data Armors MetaInherit: 24 [Protector Set] (15%)
 * Data Items MetaInherit: 12 [Moon Blessed] (10%)
 * </Random List Properties>
 *
 * ============================================================================
 * ■ Notes / Design Intent
 * ============================================================================
 * - Resistance uses native RPG Maker element rate traits.
 * - Broad damage types are custom and stack additively.
 * - Element names should be defined via plugin parameters.
 * - Mixed ranges are supported but should be used carefully.
 * - Inherited metadata is selectively copied/applied.
 * - Display labels are separated from inherited payload sources.
 *
 * ============================================================================
 * ■ Ecosystem Integration
 * ============================================================================
 * Current integrations:
 * - Item Foundation compatibility
 * - Affix interoperability
 * - Metadata inheritance support
 *
 * Planned extensions:
 * - When Refinement is released, will have display integration
 * - Refinement mutation systems
 * - Expanded keyword tag support
 * - Advanced conditional property logic
 * 
 * ============================================================================
 * ■ Compatibility / Expectations
 * ============================================================================
 *
 *  This plugin is designed primarily for independent-item workflows.
 *
 *  Recommended for use alongside:
 *  - SLT_ItemFoundation
 *  - Other SLT itemization systems
 *
 *  Compatibility with third-party plugins may vary depending on
 *  how those plugins modify item data, traits, or runtime generation.
 *
 *  Use caution when inheriting metadata from arbitrary database objects.
 * 
 * ============================================================================
 *  ■ Terms of Use / Credits
 * ============================================================================
 *
 *  Free for commercial and non-commercial RPG Maker projects.
 *
 *  Credit required:
 *  SLT (Shawn Trapp)
 * 
 *  - Developed with AI-assisted design and implementation support.
 * 
 * =============================================================================
 *  ■ Version History
 * =============================================================================
 *
 * Version 1.3
 * -----------------------------------------------------------------------------
 * - Added webpage link
 * - Adjusted plugin description
 * 
 * Version 1.1
 * -----------------------------------------------------------------------------
 * - Added Data Weapons/Armors/Items inheritance support for property 
 *   randomization 
 * - Updated header documentation
 * 
 * =============================================================================
 * 
 * Version 1.0
 * -----------------------------------------------------------------------------
 * - Initial release
 * 
 * =============================================================================
 * 
 * @param ===== Element Mapping =====
 * @text ===== Element Mapping =====
 * @type string
 * @default
 * @desc Visual divider only. Configure custom element names and aliases below.
 *
 * @param ElementNameMap
 * @text Element Name Map
 * @parent ===== Element Mapping =====
 * @type struct<ElementMapEntry>[]
 * @default []
 * @desc Maps element names and aliases to RPG Maker element IDs.
 *
 * @param ===== Debug =====
 * @text ===== Debug =====
 * @type string
 * @default
 * @desc Visual divider only.
 *
 * @param DebugMode
 * @text Debug Mode
 * @parent ===== Debug =====
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * @desc Enables console logging for random property rolls and warnings.
 */

/*~struct~ElementMapEntry:
 * @param name
 * @text Display Name
 * @type string
 * @desc Canonical element name used in display and note tags.
 *
 * @param id
 * @text Element ID
 * @type number
 * @min 1
 * @desc RPG Maker database element ID.
 *
 * @param aliases
 * @text Aliases
 * @type string[]
 * @default []
 * @desc Alternate names accepted in note tags (e.g. Fire, Ice).
 */



(() => {
"use strict";

const PLUGIN_NAME = "SLT_ItemRandomProperties";
const PARAMS = PluginManager.parameters(PLUGIN_NAME);
const ELEMENT_DISPLAY_NAMES = {};

function parseJsonArrayParam(raw) {
    try {
        return JSON.parse(raw || "[]");
    } catch (e) {
        console.warn("[SLT ItemRandomProperties] Failed to parse JSON array param:", raw, e);
        return [];
    }
}

function normKey(value) {
    return String(value || "").trim().toLowerCase();
}

function dataTypeToInheritanceType(dataType) {
    const key = String(dataType || "").trim().toLowerCase().replace(/\s+/g, "");

    if (key === "dataweapons") return "weapon";
    if (key === "dataarmors") return "armor";
    if (key === "dataitems") return "item";

    return "";
}

//------------------------------------------------------------------
// Elemental Lookup / Display
//------------------------------------------------------------------

function buildElementLookup() {
    const out = {};
    const entries = parseJsonArrayParam(PARAMS.ElementNameMap);
   
    for (const rawEntry of entries) {
        let entry = rawEntry;
        if (typeof entry === "string") {
            try {
                entry = JSON.parse(entry);
            } catch (e) {
                console.warn("[SLT ItemRandomProperties] Invalid element map entry:", rawEntry, e);
                continue;
            }
        }

        const id = Number(entry.id || 0);
        if (id <= 0) continue;

        if (entry.name) {
           ELEMENT_DISPLAY_NAMES[id] = String(entry.name).trim();
        }

        const names = [entry.name];

        const aliases = parseJsonArrayParam(entry.aliases);
        for (const alias of aliases) {
            names.push(alias);
        }

        for (const name of names) {
            const key = normKey(name);
            if (key) out[key] = id;
        }
    }

    return out;
}


const ELEMENT_LOOKUP = buildElementLookup();

function elementDisplayName(id, fallback) {
    if (ELEMENT_DISPLAY_NAMES[id]) return ELEMENT_DISPLAY_NAMES[id];

    for (const name in ELEMENT_MAP) {
        if (ELEMENT_MAP[name] === id) return name;
    }

    return fallback || `Element ${id}`;
}

const SLT_CONFIG = {
    DEBUG: String(PARAMS.DebugMode || "false") === "true"
};

const TRAIT_ELEMENT_RATE = 11;
const TRAIT_XPARAM = 22;
const TRAIT_SPARAM = 23;

const ELEMENT_MAP = {
"Crushing":1,"Slashing":2,"Piercing":3,
"Heat":4,"Cold":5,"Electric":6,"Sonic":7,
"Spectral":8,"Biological":9,"Cosmic":10
};

const BASE = {
"Health":0,"Chi":1,"Physical Attack":2,"Physical Defense":3,
"Mystic Attack":4,"Mystic Defense":5,"Agility":6,"Fortune":7
};

const XPARAM = {
"Accuracy":0,"Evasion":1,"Critical Rate":2,"Critical Evasion":3,
"Magic Evasion":4,"Magic Reflection":5,"Counter Rate":6
};

const SPARAM = {
"Guard Effect":1,"Recovery Effect":2,"Pharmacology":3,
"MP Cost Rate":4,"Physical Damage Rate":6,
"Mystic Damage Rate":7,"Floor Damage Rate":8
};

const BASE_ALIASES = {
    "health": 0, "max health": 0, "max hp": 0, "mhp": 0,
    "chi": 1, "max chi": 1, "max mp": 1, "mmp": 1,
    "physical attack": 2, "p.attack": 2, "attack": 2, "atk": 2,
    "physical defense": 3, "p.defense": 3, "defense": 3, "def": 3,
    "mystic attack": 4, "m.attack": 4, "magic attack": 4, "magical attack": 4, "mat": 4,
    "mystic defense": 5, "m.defense": 5, "magic defense": 5, "magical defense": 5, "mdf": 5,
    "agility": 6, "agi": 6,
    "fortune": 7, "luck": 7, "luk": 7
};

const XPARAM_ALIASES = {
    "accuracy": 0, "hit rate": 0, "hit": 0,
    "evasion": 1, "evasion rate": 1, "evade": 1,
    "critical rate": 2, "crit rate": 2, "critical": 2, "crit": 2,
    "critical evasion": 3, "crit evasion": 3, "critical evade": 3,
    "magic evasion": 4, "magic evade": 4, "mev": 4,
    "magic reflection": 5, "magic reflect": 5, "reflection": 5,
    "counter rate": 6, "counter attack": 6, "counter": 6
};

const SPARAM_ALIASES = {
    "guard effect": 1, "guard": 1,
    "recovery effect": 2, "recovery": 2,
    "pharmacology": 3, "medicine effect": 3, "medicine": 3,
    "mp cost rate": 4, "mp cost": 4,
    "physical damage rate": 6, "physical damage": 6,
    "mystic damage rate": 7, "magic damage rate": 7, "magic damage": 7,
    "floor damage rate": 8, "floor damage": 8
};

const ELEMENT_ALIASES = {
    "crushing": 1,
    "slashing": 2,
    "piercing": 3, "pierce": 3,
    "heat": 4, "fire": 4,
    "cold": 5, "ice": 5,
    "electric": 6, "lightning": 6,
    "sonic": 7,
    "spectral": 8,
    "biological": 9, "bio": 9,
    "cosmic": 10
};

//----------------------------------------------------------------------
// General Helpers
//----------------------------------------------------------------------

function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}

function extract(note,tag){
const r=new RegExp(`<${tag}>[\\s\\S]*?<\\/${tag}>`,"i");
const m=note.match(r); if(!m) return "";
return m[0].replace(new RegExp(`^<${tag}>`,"i"),"")
.replace(new RegExp(`<\\/${tag}>$`,"i"),"").trim();
}

function ensure(item) {
    if (window.SLT?.ItemCore?.ensureModule) {
        return SLT.ItemCore.ensureModule(item, "randomProperties", {
            done: false,
            flatParams: {},
            rateParams: {},
            xparams: {},
            sparams: {},
            elementDamage: {},
            damageTypes: {},
            elementProfiles: [],
            special: [],
            displayRows: {
                statModifiers: [],
                exParams: [],
                spParams: [],
                special: []
            }
        });
    }

    // Fallback if Item Foundation is absent.
    item._sltRandomProperties ??= {
        done: false,
        flatParams: {},
        rateParams: {},
        xparams: {},
        sparams: {},
        elementDamage: {},
        damageTypes: {},
        elementProfiles: [],
        special: [],
        displayRows: {
            statModifiers: [],
            exParams: [],
            spParams: [],
            special: []
        }
    };

    return item._sltRandomProperties;
}

function classifyEntry(e) {
  const name = e.name?.trim() || "";
  const key = name.toLowerCase();

  // META / NOTE INHERITANCE
  // Syntax:
  // DataWeapons MetaInherit: 3 (100%)
  // DataArmors MetaInherit: 70 (100%)
  // DataItems MetaInherit: 12 (100%)
 const inheritMatch = name.match(/^(Data\s*Weapons|Data\s*Armors|Data\s*Items)\s+MetaInherit$/i);

if (inheritMatch) {
    const inheritType = dataTypeToInheritanceType(inheritMatch[1]);
    const sourceId = Number(e.min || 0);

    if (!inheritType || sourceId <= 0) {
        console.warn(`[SLT ItemRandomProperties] Invalid MetaInherit entry: "${name}"`);
        return null;
    }

    return {
        ...e,
        k: "inherit",
        inheritedContent: [
            {
                type: inheritType,
                id: sourceId,
                copyNote: true,
                copyMeta: true,
                materializeTags: ["Equip Set"],
                displayText: String(e.displayText || "").trim() || `${inheritMatch[1].replace(/\s+/g, "")} ${sourceId}`
            }
        ]
    };
}

  // BROAD DAMAGE TYPES (Physical / Magical / All)
  const typeMatch = name.match(/^(Physical|Magical|All)\s+Damage\s+Dealt$/i);
  if (typeMatch) {
      return {
          ...e,
          k: "typeDmg",
          type: typeMatch[1].toLowerCase()
      };
  }

  // ELEMENT RESISTANCE
  const resistMatch = name.match(/^(.+)\s+Resistance$/i);
  if (resistMatch) {
      const elName = resistMatch[1].trim();
      const elKey = normKey(elName);

      let id = null;

      const idMatch = elName.match(/^Element\s+(\d+)$/i);
      if (idMatch) {
          id = Number(idMatch[1]);
      } else {
          id = ELEMENT_LOOKUP[elKey];

          if (id == null && typeof ELEMENT_ALIASES !== "undefined") {
              id = ELEMENT_ALIASES[elKey];
          }

          if (id == null && typeof ELEMENT_MAP !== "undefined") {
              id = ELEMENT_MAP[elName] ?? ELEMENT_MAP[e.el];
          }
      }

      if (id != null) {
          return {
              ...e,
              k: "elemResist",
              id,
              el: elName
          };
      }

      console.warn(`[SLT ItemRandomProperties] Unknown element in resistance entry: "${name}"`);
      return null;
  }

  const dmg = name.match(/^(.+)\s+Damage$/i);
  if (dmg) {
    const el = dmg[1].trim();
    const elKey = normKey(el);

    let id = null;

    const idMatch = el.match(/^Element\s+(\d+)$/i);
    if (idMatch) {
        id = Number(idMatch[1]);
    } else {
        id = ELEMENT_LOOKUP[elKey];

        if (id == null && typeof ELEMENT_ALIASES !== "undefined") {
            id = ELEMENT_ALIASES[elKey];
        }

        if (id == null && typeof ELEMENT_MAP !== "undefined") {
            id = ELEMENT_MAP[el];
        }
    }

    ;
    if (id != null) {
      return {
        ...e,
        k: e.isPercent ? "dmgPct" : "dmgFlat",
        id,
        el
      };
    }
    console.warn(`[SLT RandomProperties] Unknown element in damage entry: "${name}"`);
    return null;
  }

  if (BASE_ALIASES[key] != null) {
    return {
        ...e,
        k: e.isPercent ? "baseRate" : "base",
        i: BASE_ALIASES[key]
    };
  }
  if (XPARAM_ALIASES[key] != null) {
      return { ...e, k: "x", i: XPARAM_ALIASES[key] };
  }
  if (SPARAM_ALIASES[key] != null) {
      return { ...e, k: "s", i: SPARAM_ALIASES[key] };
  }

  console.warn(`[SLT RandomProperties] Unknown property entry: "${name}"`);
  return null;
}

function commit(item){
  const r = ensure(item);
  if (r.done) return;

  const base = item.originalBaseItemId ?
    (DataManager.isWeapon(item) ? $dataWeapons[item.originalBaseItemId] : $dataArmors[item.originalBaseItemId]) : item;

  const note = base.note || "";

  const list = extractAll(note, "Random List Properties").flatMap(block => parseRandomList(block));
  const pools = parseRandomPools(note);
  const profile = parseElementalProfile(note);

  const resolved = resolveRolls(list, pools, profile);

  const applied = {
    dmgPct: new Set(),
    dmgFlat: new Set(),
    x: new Set(),
    s: new Set(),
    baseFlat: new Set(),
    baseRate: new Set()
  };

  function rollValue(e){
    const v = Math.max(e.min, Math.min(e.max, rand(e.min, e.max)));
    return v;
  }

  function applyEntry(e){
    const name = e.name || "";

    // INHERITED NOTE/META CONTENT
    if (e.k === "inherit") {
        if (Array.isArray(e.inheritedContent) && window.SLT?.ItemCore?.addInheritedContent) {
            for (const payload of e.inheritedContent) {
                SLT.ItemCore.addInheritedContent(item, payload);
            }
        }

        if (SLT_CONFIG.DEBUG) {
            console.log("[APPLY META INHERIT]", item.name, e.inheritedContent);
        }

        return;
    }

    if (Array.isArray(e.inheritedContent) && window.SLT?.ItemCore?.addInheritedContent) {
        for (const payload of e.inheritedContent) {
            SLT.ItemCore.addInheritedContent(item, payload);
        }
    }

    r.displayRows = r.displayRows || {
      statModifiers: [],
      exParams: [],
      spParams: [],
      special: []
    };


    // BROAD DAMAGE TYPES
    if (e.k === "typeDmg") {
        const type = e.type;

        if (!r.damageTypes) {
            r.damageTypes = { physical: 0, magical: 0, all: 0 };
        }

        const v = rollValue(e);

        r.damageTypes[type] = (r.damageTypes[type] || 0) + v;

        r.displayRows.special.push({
            label: name,
            value: v,
            suffix: "%"
        });

        if (SLT_CONFIG.DEBUG) {
            console.log("[APPLY TYPE DMG]", item.name, name, v);
        }
    }

    // ELEMENT RESISTANCE
    else if (e.k === "elemResist") {
        const id = e.id;
        let displayValue;
        let traitValue;

        if (e.isNull) {
            displayValue = "Null";
            traitValue = 0;
        } else {
            const v = rollValue(e);
            displayValue = v;
            traitValue = 1 - (v / 100);
        }

        item.traits.push({
            code: TRAIT_ELEMENT_RATE,
            dataId: id,
            value: traitValue
        });

        r.displayRows.special.push({
            label: `${elementDisplayName(id, e.el)} Resistance`,
            value: e.isNull ? 100 : displayValue,
            suffix: "%"
        });

        if (SLT_CONFIG.DEBUG) {
            console.log("[APPLY ELEMENT RESIST]", item.name, e.name, traitValue);
        }
    }

    // ELEMENTAL DAMAGE
    else if (e.k === "dmgPct") {
        const id = e.id;

        if (applied.dmgPct.has(id)) return;
        applied.dmgPct.add(id);

        const v = rollValue(e);

        if (!r.dmgPct) r.dmgPct = {};
        r.dmgPct[id] = v;

        r.elementDamage[id] = (r.elementDamage[id] || 0) + v;

        r.displayRows.special.push({
            label: `${ELEMENT_DISPLAY_NAMES[id] || name.replace(/\s+Damage$/i, "")} Damage`,
            value: v,
            suffix: "%"
        });

        if (SLT_CONFIG.DEBUG) console.log("[APPLY DMG %]", item.name, name, v);
    }

    else if (e.k === "dmgFlat") {  
        const id = e.id;

        if (applied.dmgFlat.has(id)) return;
        applied.dmgFlat.add(id);

        const v = rollValue(e);

        if (!r.dmgFlat) r.dmgFlat = {};
          r.dmgFlat[id] = v;

          r.elementDamageFlat ??= {};
          r.elementDamageFlat[id] = (r.elementDamageFlat[id] || 0) + v;

          r.displayRows.special.push({
            label: `${ELEMENT_DISPLAY_NAMES[id] || name.replace(/\s+Damage$/i, "")} Damage`,
            value: v
          });

        if (SLT_CONFIG.DEBUG) console.log("[APPLY DMG FLAT]", item.name, name, v);
    }

    // BASE PARAM
    else if (e.k === "base") {
      if (applied.baseFlat.has(e.i)) return;
      applied.baseFlat.add(e.i);
      
      const v = rollValue(e);
      item.params[e.i] += v;
      
      if (!r.base) r.base = {};
        r.base[e.i] = v;

      if (!r.flatParams) r.flatParams = {};
        r.flatParams[e.i] = v;
      
      r.displayRows.statModifiers.push({
          label: name,
          value: v
      });
  
    }

    else if (e.k === "baseRate") {
      if (applied.baseRate.has(e.i)) return;
      applied.baseRate.add(e.i);
      const v = rollValue(e);

      if (!r.rateParams) r.rateParams = {};
      r.rateParams[e.i] = v/100;

      r.displayRows.statModifiers.push({
        label: name,
        value: v,
        suffix: "%"
      });

      if (SLT_CONFIG.DEBUG) console.log("[APPLY BASE RATE]", item.name, e.i, v);
    
    }

    // XPARAM
    else if (e.k === "x") {
      if (applied.x.has(e.i)) return;
      applied.x.add(e.i);

      const v = rollValue(e);
      item.traits.push({code:TRAIT_XPARAM,dataId:e.i,value:v/100});
      if (!r.x) {
        r.x = {};
      }
      r.x[e.i] = v;

      if (!r.xparams) {
        r.xparams = {};
      }

      r.xparams[e.i] = v;
      r.displayRows.exParams.push({
        label: name,
        value: v,
        suffix: "%"
      });

      if (SLT_CONFIG.DEBUG) console.log("[APPLY X]", item.name, e.i, v);
    }

    // SPARAM
    else if (e.k === "s") {
      if (applied.s.has(e.i)) return;
      applied.s.add(e.i);

      const v = rollValue(e);
      item.traits.push({code:TRAIT_SPARAM,dataId:e.i,value:1+v/100});
      if (!r.s) {
        r.s = {};
      }
      r.s[e.i] = v;

      if (!r.sparams) {
        r.sparams = {};
      }

      r.sparams[e.i] = v;
      r.displayRows.spParams.push({
        label: name,
        value: v,
        suffix: "%"
      });

      if (SLT_CONFIG.DEBUG) console.log("[APPLY S]", item.name, e.i, v);
    }
  }

  // APPLY LIST
  for (const raw of resolved.list) {
    const e = classifyEntry(raw);
    if (e) applyEntry(e);
  }

  // APPLY POOL
  for (const raw of resolved.pool) {
    const e = classifyEntry(raw);
    if (e) applyEntry(e);
  }

  // APPLY PROFILE
  if (resolved.profile && resolved.profile.type !== "none") {
    r.profile = resolved.profile;
    
    for (const eff of resolved.profile.effects) {
      item.traits.push({
        code: TRAIT_ELEMENT_RATE,
        dataId: eff.id,
        value: eff.type === "resist" ? 0.5 : 1.5
      });
    }

    if (SLT_CONFIG.DEBUG) console.log("[APPLY PROFILE]", item.name, resolved.profile);
  }

  r.done = true;
}

// -----------------------------------------------------------------------------
// Commit random properties when runtime items are created
// -----------------------------------------------------------------------------

if (window.SLT?.ItemCore?.registerRuntimeInstance) {
    const _sltRegisterRuntimeInstance = SLT.ItemCore.registerRuntimeInstance;

    SLT.ItemCore.registerRuntimeInstance = function(item) {
        const result = _sltRegisterRuntimeInstance.call(this, item);
        if (result) commit(result);
        else if (item) commit(item);
        return result;
    };
}

if (DataManager.registerNewItem) {
    const _reg = DataManager.registerNewItem;

    DataManager.registerNewItem = function(item) {
        const n = _reg.call(this, item);
        if (n && n !== item) commit(n);
        else if (n) commit(n);
        return n;
    };
}

function extractAll(note, tag) {
  const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
  const matches = note.match(re);
  if (!matches) return [];

  return matches.map(block =>
    block
      .replace(new RegExp(`^<${tag}[^>]*>`, "i"), "")
      .replace(new RegExp(`<\\/${tag}>$`, "i"), "")
      .trim()
  );
}

function parseRandomList(text) {
  const lines = text.split(/\n/).map(s => s.trim()).filter(Boolean);
  const out = [];

  const inheritRe = /^(Data\s*Weapons|Data\s*Armors|Data\s*Items)\s+MetaInherit\s*:\s*(\d+)\s*(?:\[(.*?)\])?\s*\((\d+)\s*%\)$/i;
  const rangeRe = /^(.+?):\s*([+-]?\d+)\s*(%?)\s*to\s*([+-]?\d+)\s*(%?)\s*\((\d+)\s*%\)$/i;
  const nullRe  = /^(.+?):\s*Null\s*\((\d+)\s*%\)$/i;

  for (const l of lines) {

    const inheritMatch = l.match(inheritRe);
      if (inheritMatch) {
        const label = String(inheritMatch[3] || "").trim();

        out.push({
          name: `${inheritMatch[1].trim()} MetaInherit`,
          min: Number(inheritMatch[2]),
          max: Number(inheritMatch[2]),
          chance: Number(inheritMatch[4]),
          isPercent: false,
          displayText: label
        });
        continue;
      }

    const nullMatch = l.match(nullRe);
    if (nullMatch) {
      out.push({
        name: nullMatch[1].trim(),
        min: 0,
        max: 0,
        chance: Number(nullMatch[2]),
        isPercent: true,
        isNull: true
      });
      continue;
    }

    const m = l.match(rangeRe);
    if (!m) {
      console.warn(`[SLT ItemRandomProperties] Invalid list line: "${l}"`);
      continue;
    }

    const name = m[1].trim();
    const min = Number(m[2]);
    const minPct = !!m[3];
    const max = Number(m[4]);
    const maxPct = !!m[5];
    const chance = Number(m[6]);

    if (minPct !== maxPct) {
      console.warn(`[SLT ItemRandomProperties] Mixed units in line: "${l}"`);
      continue;
    }

    out.push({
      name,
      min,
      max,
      chance,
      isPercent: minPct
    });
  }

  return out;
}

function parseRandomPools(note) {
  const re = /<Random Property Pool:\s*(\d+)%>([\s\S]*?)<\/Random Property Pool>/gi;

  const out = [];
  let match;

  while ((match = re.exec(note)) !== null) {
    const chance = Number(match[1]);
    const body = match[2].trim();

    const entries = parseRandomList(body);

    const total = entries.reduce((a, b) => a + b.chance, 0);

    if (total !== 100) {
      console.warn(`[SLTRandomProperties] Pool total != 100% (got ${total}%)`);
      continue;
    }

    out.push({ chance, entries });
  }

  return out;
}

function parseElementalProfile(note) {
  const blocks = extractAll(note, "Elemental Resistance Profile");
  if (!blocks.length) return null;

  const lines = blocks[0].split(/\n/).map(s => s.trim()).filter(Boolean);

  const out = [];

  const re = /^(.+)\s*\((\d+)%\)$/i;

  for (const l of lines) {
    const m = l.match(re);
    if (!m) {
      console.warn(`[SLT RandomProperties] Invalid profile line: "${l}"`);
      continue;
    }

    const entry = m[1].trim();
    const weight = Number(m[2]);

    if (/^none$/i.test(entry)) {
      out.push({ type: "none", weight });
      continue;
    }

    const parts = entry.split("/").map(s => s.trim());

    const effects = [];

    for (const p of parts) {
      const match = p.match(/^(.+)\s+(Resist|Weak)$/i);
      if (!match) continue;

      const el = match[1].trim();
      const type = match[2].toLowerCase();

      if (!ELEMENT_MAP[el]) continue;

      effects.push({ id: ELEMENT_MAP[el], type });
    }

    out.push({ type: "profile", weight, effects });
  }

  const total = out.reduce((a, b) => a + b.weight, 0);

  if (total !== 100) {
    console.warn(`[SLT RandomProperties] Elemental profile total != 100%`);
    return null;
  }

  return out;
}

function resolveRolls(list, pools, profile) {
  const resolved = {
    list: [],
    pool: [],
    profile: null
  };

  const applied = {
    dmgPct: new Set(),
    dmgFlat: new Set(),
    x: new Set(),
    s: new Set(),
    base: new Set()
  };

  // === LIST (independent rolls)
  for (const e of list) {
    if (Math.random() * 100 >= e.chance) continue;
    resolved.list.push(e);
  }

  // === POOLS (one per pool)
  for (const pool of pools) {
    if (Math.random() * 100 >= pool.chance) continue;

    let roll = Math.random() * 100;
    let accum = 0;

    for (const entry of pool.entries) {
      accum += entry.chance;
      if (roll <= accum) {
        resolved.pool.push(entry);
        break;
      }
    }
  }

  // === PROFILE (single selection)
  if (profile && profile.length) {
    let roll = Math.random() * 100;
    let accum = 0;

    for (const entry of profile) {
      accum += entry.weight;
      if (roll <= accum) {
        resolved.profile = entry;
        break;
      }
    }
  }

  return resolved;
}

Game_Actor.prototype.slt_getElementDamageBonus = function(elementId) {
  let total = 0;
  for (const item of this.equips()) {
    if (!item || !item._roll || !item._roll.dmgPct) continue;
    total += Number(item._roll.dmgPct[elementId] || 0);
  }
  return total;
};


const _dmg = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical){
        let v = _dmg.call(this, target, critical);

        const item = this.item();
        const subject = this.subject();
        const elementId = item && item.damage ? item.damage.elementId : 0;

        if (subject && v !== 0) {
            let totalBonus = 0;

            // BROAD DAMAGE TYPES (from equipment)
            const equips = subject.equips ? subject.equips() : [];
            for (const eq of equips) {
                const mod = eq?._slt?.modules?.randomProperties;
                if (!mod || !mod.damageTypes) continue;

                // All Damage always applies
                if (mod.damageTypes.all) {
                    totalBonus += mod.damageTypes.all;
                }

                // Physical layer
                if (this.isPhysical && this.isPhysical() && mod.damageTypes.physical) {
                    totalBonus += mod.damageTypes.physical;
                }

                // Magical layer
                if (this.isMagical && this.isMagical() && mod.damageTypes.magical) {
                    totalBonus += mod.damageTypes.magical;
                }
            }

            // Direct skill/item element
            if (elementId > 0) {

                const equips = subject.equips ? subject.equips() : [];
                for (const eq of equips) {
                    const mod = eq?._slt?.modules?.randomProperties;
                    if (!mod) continue;

                    // % bonus
                    if (mod.elementDamage && mod.elementDamage[elementId]) {
                        totalBonus += mod.elementDamage[elementId];
                    }

                    // flat bonus
                    if (mod.elementDamageFlat && mod.elementDamageFlat[elementId]) {
                        v += mod.elementDamageFlat[elementId];
                    }
                }
            }

            // Normal attack element(s)
            else if (elementId < 0 && subject.attackElements) {
                const atkElements = [...new Set(subject.attackElements())];
                for (const id of atkElements) {
                  
                  const equips = subject.equips ? subject.equips() : [];
                  for (const eq of equips) {
                      const mod = eq?._slt?.modules?.randomProperties;
                      if (!mod) continue;

                      if (mod.elementDamage && mod.elementDamage[id]) {
                          totalBonus += mod.elementDamage[id];
                      }

                      if (mod.elementDamageFlat && mod.elementDamageFlat[id]) {
                          v += mod.elementDamageFlat[id];
                      }
                  }
              }
            }

            if (totalBonus !== 0) {
                v *= 1 + (totalBonus / 100);
            }
        }

        return v;
    };

    window.SLT = window.SLT || {};

    SLT.ItemRandomProperties = SLT.ItemRandomProperties || {};

    SLT.ItemRandomProperties.commit = commit;
    SLT.ItemRandomProperties.ensure = ensure;

})();