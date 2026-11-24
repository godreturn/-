//=============================================================================
// ED5_GearBox.js
//=============================================================================
// ED5 Gear Box — in-game control center for every plugin in the project.
// Load this FIRST (above every other ED5_* plugin). It has no dependencies.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [v1.0.0] ED5 Gear Box — in-game control center: live-edit any plugin's parameters, toggle plugins, inspect, profile, and expose settings to players.
 * @author ED5 (ChigooX)
 * @url https://ed5.itch.io
 *
 * @help ED5_GearBox.js
 *
 * ============================================================================
 * WHAT IT IS
 * ============================================================================
 *
 * Gear Box is a docked side panel that opens over the running game and gives
 * you the whole Plugin Manager, live:
 *
 *   - Every plugin in js/plugins.js, ED5 or third party, in load order.
 *   - A real form for every parameter, built from the plugin's own header
 *     (sliders, switches, dropdowns, database pickers, struct editors).
 *   - Changes apply live when the plugin cooperates (see "LIVE APPLY"), and
 *     are otherwise applied on the next reload. Edits persist across reloads
 *     until you Save them to js/plugins.js or Discard them.
 *   - Plugin on/off, load-order drag and drop, dependency warnings.
 *   - Inspector: gauges, actions, health, and the public ED5.* API of every
 *     plugin. A command runner for @command plugin commands. A console.
 *   - Profiles: named sets of edits you can swap, export, import, and ship
 *     to players as presets.
 *   - Player mode: a curated "Mod Settings" page in the Options menu, built
 *     from fields you choose to expose.
 *
 * ============================================================================
 * QUICK START
 * ============================================================================
 *
 *   1. Put ED5_GearBox at the TOP of the plugin list, enabled.
 *   2. Playtest from RPG Maker (NW.js test mode). Developer mode turns on
 *      automatically ("Developer Mode" = auto). In a browser add ?gearbox to
 *      the URL to force it.
 *   3. Press F9 (configurable) to open the panel.
 *
 * Shortcuts inside the panel:
 *   F9          toggle panel          Esc        blur input / return to game
 *   Ctrl+K      focus search          Ctrl+S     save to js/plugins.js
 *   Ctrl+Z      undo last edit        Ctrl+Y     redo
 *   Alt+1..6    switch tabs           Ctrl+R     reload game (NW.js)
 *
 * ============================================================================
 * LIVE APPLY, RELOAD, SAVE
 * ============================================================================
 *
 * Every edit is written into the running parameter table immediately, so
 * PluginManager.parameters('Name') returns the new value at once. Whether the
 * plugin *reacts* depends on it:
 *
 *   LIVE     The plugin registered with Gear Box (below). Its reload handler
 *            runs and the change is visible right away.
 *   RELOAD   The plugin read its parameters once at startup. Your edit is
 *            kept and re-applied automatically on the next reload, before the
 *            plugin loads, so it takes effect then. Use "Reload" in the
 *            panel header ("Reload & resume here" saves the current map and
 *            position and puts you back there).
 *
 * Unsaved edits live in this machine's localStorage (developer mode only)
 * and are never part of a deployed build. "Save" writes them into
 * js/plugins.js in the editor's exact format (a .bak is written first;
 * refuses if the editor changed the file since the game started).
 * Enabling or disabling a plugin always needs Save + Reload, unless the
 * plugin offers setEnabled (see API).
 *
 * ============================================================================
 * MAKING YOUR PLUGIN GEAR BOX AWARE (PUBLIC API)
 * ============================================================================
 *
 * Nothing is required. A plugin that never calls the API still gets a full
 * form and "reload to apply". Registering upgrades it to live:
 *
 *   if (window.ED5 && ED5.GearBox) {
 *     ED5.GearBox.register('ED5_MyPlugin', {
 *       version:   '1.2.0',
 *       namespace: 'ED5.MyPlugin',           // shown in the Inspector
 *       docs:      'https://...',            // optional link
 *
 *       // Live apply. Values are STRINGS in Plugin Manager format, exactly
 *       // what PluginManager.parameters() returns, so reuse your boot parser.
 *       reload: function(params) { PARAMS = parseParams(params); refresh(); },
 *       // or fine grained:
 *       onChange: function(key, value, params) { ... },
 *       liveKeys: ['*'],                     // or a list; others need reload
 *
 *       setEnabled: function(on) { on ? start() : stop(); },   // optional
 *       validate: function(key, value) { return null; }, // string = error
 *
 *       gauges:  { 'Active lights': function() { return count; } },
 *       actions: { 'Rebuild': function() { rebuild(); } },
 *       panel:   function(container, api) { },  // custom DOM below the form
 *       playerExposed: ['radius', 'quality']  // suggested player fields
 *     });
 *   }
 *
 * If your plugin must load before Gear Box, push the same arguments into
 * window.ED5_GearBoxPending = window.ED5_GearBoxPending || [] as
 * [name, spec] and Gear Box will pick them up.
 *
 * Other calls:
 *   ED5.GearBox.get(plugin, key)               effective string value
 *   ED5.GearBox.set(plugin, key, value)        edit (goes through live apply)
 *   ED5.GearBox.params(plugin)                 effective parameter map
 *   ED5.GearBox.schema(plugin, cb)             parsed header (async)
 *   ED5.GearBox.setEnabled(plugin, bool)
 *   ED5.GearBox.on('change'|'enabled'|'open'|'close'|'save'|'reload', fn)
 *   ED5.GearBox.off(event, fn)
 *   ED5.GearBox.open(tab) / close() / toggle() / isOpen()
 *   ED5.GearBox.addPanel(title, function(container, api) {...})
 *   ED5.GearBox.profiles.list()/apply(name)/saveCurrent(name)/remove(name)
 *   ED5.GearBox.profiles.exportJson(name) / importJson(json)
 *   ED5.GearBox.log(plugin, level, message)    routes into the Console tab
 *   ED5.GearBox.reload({ resume: true })       reload game (NW.js/browser)
 *   ED5.GearBox.save(cb)                       write js/plugins.js (NW.js)
 *
 * ============================================================================
 * PLAYER MODE
 * ============================================================================
 *
 * Turn on "Enable Player Mode" and list the parameters you want players to
 * control in "Exposed Fields". An entry appears in the Options menu (label
 * configurable) that opens a compact settings page. Player values are stored
 * per device (like the Options menu) and applied before other plugins load,
 * so they work even for plugins that are not live. "Shipped Presets" appear
 * as one-click buttons; build them from the Profiles tab ("Ship to players").
 * Player mode never shows the developer panel, the console, or file writes.
 *
 * ============================================================================
 * NOTES AND LIMITS
 * ============================================================================
 *
 *   - A plugin cannot be "un-run". Disabling needs Save + Reload unless the
 *     plugin implements setEnabled.
 *   - Load order changes and newly added plugins need Save + Reload.
 *   - Saving js/plugins.js works only under NW.js. In a browser, edits are
 *     session/localStorage only.
 *   - Third-party plugins with unusual headers fall back to a key/value
 *     editor with guessed types.
 *   - Developer mode never activates in a deployed build (unless you set
 *     "Developer Mode" to "always", which you should not ship).
 *
 * ============================================================================
 * TERMS OF USE
 * ============================================================================
 *
 * Free for commercial and non-commercial use with credit to ED5.
 *
 * @param General
 * @default
 *
 * @param devMode
 * @parent General
 * @text Developer Mode
 * @type select
 * @option Auto (NW.js playtest or ?gearbox URL flag)
 * @value auto
 * @option Always (never ship this)
 * @value always
 * @option Never
 * @value never
 * @default auto
 * @desc When the developer panel is available. Auto = RPG Maker playtest only. Player mode is independent of this.
 *
 * @param hotkey
 * @parent General
 * @text Panel Hotkey
 * @type select
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F6
 * @option F7
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 * @option None
 * @default F9
 * @desc Key that toggles the developer panel. F5 is the engine reload key and F8 opens devtools, so they are not offered.
 *
 * @param dock
 * @parent General
 * @text Dock Side
 * @type select
 * @option Right
 * @value right
 * @option Left
 * @value left
 * @default right
 * @desc Which side of the screen the panel docks to. Can be flipped from the panel header.
 *
 * @param panelWidth
 * @parent General
 * @text Panel Width (px)
 * @type number
 * @min 320
 * @max 900
 * @default 440
 * @desc Initial width of the panel. Drag the panel edge to resize; the width is remembered.
 *
 * @param shrinkCanvas
 * @parent General
 * @text Shrink Game Canvas
 * @type boolean
 * @on Shrink (side by side)
 * @off Overlay
 * @default false
 * @desc Shrink the game to sit beside the panel instead of drawing the panel over it.
 *
 * @param rememberLayout
 * @parent General
 * @text Remember Layout
 * @type boolean
 * @default true
 * @desc Remember the active tab, width, dock side, filters, pinned fields and expanded plugins between sessions.
 *
 * @param openCommandInMenu
 * @parent General
 * @text Add To Pause Menu
 * @type boolean
 * @default false
 * @desc Adds a "Gear Box" command to the main menu while developer mode is active.
 *
 * @param menuCommandName
 * @parent General
 * @text Pause Menu Label
 * @type text
 * @default Gear Box
 * @desc Label of the pause-menu command when "Add To Pause Menu" is on.
 *
 * @param openOnStart
 * @parent General
 * @text Open On Start
 * @type boolean
 * @default false
 * @desc Open the panel automatically when the title screen or first map appears (developer mode). The ?gearbox-open URL flag does the same.
 *
 * @param Behavior
 * @default
 *
 * @param autoApply
 * @parent Behavior
 * @text Apply Edits Immediately
 * @type boolean
 * @on Immediately
 * @off Stage, then Apply
 * @default true
 * @desc Apply each edit as soon as you make it. Off = edits are staged per plugin until you press Apply.
 *
 * @param persistUnsavedEdits
 * @parent Behavior
 * @text Keep Unsaved Edits Across Reloads
 * @type boolean
 * @default true
 * @desc Store unsaved edits in localStorage and re-apply them before plugins load on the next reload (developer mode only).
 *
 * @param confirmPluginsJsWrite
 * @parent Behavior
 * @text Confirm Before Writing plugins.js
 * @type boolean
 * @default true
 * @desc Ask before Gear Box writes js/plugins.js.
 *
 * @param backupPluginsJs
 * @parent Behavior
 * @text Back Up plugins.js
 * @type boolean
 * @default true
 * @desc Write js/plugins.js.gearbox.bak before every save.
 *
 * @param pollGaugesHz
 * @parent Behavior
 * @text Gauge Refresh Rate (Hz)
 * @type number
 * @min 1
 * @max 30
 * @default 4
 * @desc How often Inspector gauges are polled while the Inspector tab is visible.
 *
 * @param captureConsole
 * @parent Behavior
 * @text Capture Console
 * @type boolean
 * @default true
 * @desc Mirror console.log / warn / error into the Console tab. The browser console still receives everything, but while capture is on its source links point at ED5_GearBox.js.
 *
 * @param consoleBufferSize
 * @parent Behavior
 * @text Console Buffer (lines)
 * @type number
 * @min 100
 * @max 5000
 * @default 600
 * @desc How many console lines the Console tab keeps.
 *
 * @param hideThirdParty
 * @parent Behavior
 * @text Hide Third-Party Plugins
 * @type boolean
 * @default false
 * @desc Show only ED5 plugins in the Plugins tab by default (the filter can still show everything).
 *
 * @param PlayerMode
 * @text Player Mode
 * @default
 *
 * @param enablePlayerMode
 * @parent PlayerMode
 * @text Enable Player Mode
 * @type boolean
 * @default false
 * @desc Add a settings page to the Options menu that exposes the fields listed below to players.
 *
 * @param playerMenuLabel
 * @parent PlayerMode
 * @text Options Menu Label
 * @type text
 * @default Mod Settings
 * @desc Text of the Options menu entry that opens the player settings page.
 *
 * @param playerTitle
 * @parent PlayerMode
 * @text Page Title
 * @type text
 * @default Settings
 * @desc Title shown at the top of the player settings page.
 *
 * @param exposedFields
 * @parent PlayerMode
 * @text Exposed Fields
 * @type struct<ExposedField>[]
 * @default []
 * @desc Parameters players may change. Plugin = file name without .js, Param = parameter key from the plugin header.
 *
 * @param shippedProfiles
 * @parent PlayerMode
 * @text Shipped Presets
 * @type struct<ShippedProfile>[]
 * @default []
 * @desc One-click presets shown on the player page. Easiest to create from the Profiles tab with "Ship to players".
 *
 * @param Theme
 * @default
 *
 * @param themePreset
 * @parent Theme
 * @text Theme
 * @type select
 * @option Dark
 * @value dark
 * @option Light
 * @value light
 * @default dark
 * @desc Base color scheme of the panel.
 *
 * @param themeAccent
 * @parent Theme
 * @text Accent Color
 * @type text
 * @default #5ea1ff
 * @desc Hex color used for active controls, links and highlights.
 *
 * @param themeBg
 * @parent Theme
 * @text Background Override
 * @type text
 * @default
 * @desc Optional hex color for the panel background. Leave empty to use the theme.
 *
 * @param themeText
 * @parent Theme
 * @text Text Color Override
 * @type text
 * @default
 * @desc Optional hex color for panel text. Leave empty to use the theme.
 *
 * @param themeFont
 * @parent Theme
 * @text Font Family
 * @type text
 * @default
 * @desc Optional CSS font-family for the panel. Leave empty for the system UI font.
 *
 * @param themeRadius
 * @parent Theme
 * @text Corner Radius (px)
 * @type number
 * @min 0
 * @max 20
 * @default 10
 * @desc Corner radius of cards and controls.
 *
 * @param themeOpacity
 * @parent Theme
 * @text Panel Opacity
 * @type number
 * @min 0.5
 * @max 1
 * @decimals 2
 * @default 0.98
 * @desc Opacity of the panel background (0.5 - 1).
 *
 * @command open
 * @text Open Panel
 * @desc Open the developer panel (developer mode only).
 * @arg tab
 * @text Tab
 * @type select
 * @option plugins
 * @option inspector
 * @option commands
 * @option order
 * @option profiles
 * @option console
 * @default plugins
 *
 * @command close
 * @text Close Panel
 * @desc Close the developer panel.
 *
 * @command toggle
 * @text Toggle Panel
 * @desc Toggle the developer panel.
 *
 * @command openPlayerSettings
 * @text Open Player Settings
 * @desc Open the player settings page (requires Enable Player Mode).
 *
 * @command applyProfile
 * @text Apply Profile
 * @desc Apply a saved profile or a shipped preset by name.
 * @arg name
 * @text Profile Name
 * @type text
 *
 * @command setParam
 * @text Set Parameter
 * @desc Set one plugin parameter (Plugin Manager string format). Goes through live apply.
 * @arg plugin
 * @text Plugin
 * @type text
 * @arg param
 * @text Parameter Key
 * @type text
 * @arg value
 * @text Value
 * @type multiline_string
 *
 * @command setEnabled
 * @text Enable / Disable Plugin
 * @desc Toggle a plugin. Live only if the plugin implements setEnabled; otherwise needs Save + Reload.
 * @arg plugin
 * @text Plugin
 * @type text
 * @arg enabled
 * @text Enabled
 * @type boolean
 * @default true
 *
 * @command reload
 * @text Reload Game
 * @desc Reload the game (developer mode). Optionally resume at the current map position.
 * @arg resume
 * @text Resume Here
 * @type boolean
 * @default true
 */

/*~struct~ExposedField:
 * @param plugin
 * @text Plugin
 * @type text
 * @desc Plugin file name without .js (e.g. ED5_LightingEngine).
 *
 * @param param
 * @text Parameter Key
 * @type text
 * @desc The parameter key exactly as written after @param in the plugin header.
 *
 * @param label
 * @text Label
 * @type text
 * @desc Label shown to players. Leave empty to use the plugin's own label.
 *
 * @param help
 * @text Help Text
 * @type text
 * @desc Short description shown under the label. Leave empty to use the plugin's own description.
 *
 * @param min
 * @text Min (numbers)
 * @type text
 * @desc Optional lower bound for numeric fields.
 *
 * @param max
 * @text Max (numbers)
 * @type text
 * @desc Optional upper bound for numeric fields.
 *
 * @param step
 * @text Step (numbers)
 * @type text
 * @desc Optional slider step for numeric fields.
 */

/*~struct~ShippedProfile:
 * @param name
 * @text Preset Name
 * @type text
 *
 * @param description
 * @text Description
 * @type text
 *
 * @param entries
 * @text Values
 * @type struct<ProfileEntry>[]
 * @default []
 */

/*~struct~ProfileEntry:
 * @param plugin
 * @text Plugin
 * @type text
 *
 * @param param
 * @text Parameter Key
 * @type text
 *
 * @param value
 * @text Value (Plugin Manager format)
 * @type multiline_string
 */

var Imported = Imported || {};
Imported.ED5_GearBox = true;

var ED5 = ED5 || {};
ED5.GearBox = ED5.GearBox || {};

(function() {
'use strict';

var GB = ED5.GearBox;
var PLUGIN_NAME = 'ED5_GearBox';
GB.VERSION = '1.0.0';

//=============================================================================
// 1. Small utilities
//=============================================================================

function toBool(v, d) { if (v === undefined || v === null || v === '') return d; return String(v) === 'true'; }
function toNum(v, d) { if (v === undefined || v === null || v === '') return d; var n = Number(v); return isNaN(n) ? d : n; }
function toStr(v, d) { return (v === undefined || v === null || v === '') ? d : String(v); }
function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function isObj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
function each(o, fn) { if (!o) return; Object.keys(o).forEach(function(k) { fn(o[k], k); }); }
function deepClone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
function safeJson(str, fallback) { try { return JSON.parse(str); } catch (e) { return fallback; } }
function parseStructArray(str) {
    var arr = safeJson(str || '[]', []);
    if (!Array.isArray(arr)) return [];
    return arr.map(function(s) { return typeof s === 'string' ? safeJson(s, null) : s; }).filter(Boolean);
}
function debounce(fn, ms) {
    var t = null;
    return function() {
        var self = this, args = arguments;
        clearTimeout(t);
        t = setTimeout(function() { fn.apply(self, args); }, ms);
    };
}
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}
function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function fmtTime(d) {
    d = d || new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
}
function baseName(name) { return String(name).split('/').pop(); }
function isHexColor(s) { return /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(String(s || '').trim()); }
function extractVersion(desc) {
    var m = /\bv?(\d+\.\d+(?:\.\d+)?)\b/.exec(String(desc || ''));
    return m ? m[1] : '';
}
function tryCall(fn, ctx, args, onError) {
    try { return fn.apply(ctx, args || []); }
    catch (e) { if (onError) onError(e); else console.error('[ED5_GearBox]', e); return undefined; }
}

GB._u = { toBool: toBool, toNum: toNum, toStr: toStr, clamp: clamp, safeJson: safeJson, deepClone: deepClone, escapeHtml: escapeHtml, baseName: baseName };

//=============================================================================
// 2. Environment
//=============================================================================

var Env = GB.Env = {
    fs: null,
    path: null,
    base: '',
    pluginBase: 'js/plugins/',
    isNwjs: function() { return typeof Utils !== 'undefined' && !!Utils.isNwjs && Utils.isNwjs(); },
    isTest: function() { return typeof Utils !== 'undefined' && !!Utils.isOptionValid && Utils.isOptionValid('test'); },
    hasFlag: function(flag) { return typeof Utils !== 'undefined' && !!Utils.isOptionValid && Utils.isOptionValid(flag); },
    canWriteFiles: function() { return !!this.fs; },
    projectId: '',
    init: function() {
        if (this.isNwjs()) {
            try {
                this.fs = require('fs');
                this.path = require('path');
                this.base = this.path.dirname(process.mainModule.filename).replace(/\\/g, '/');
            } catch (e) {
                this.fs = null; this.path = null;
            }
        }
        this.projectId = this.base || (typeof location !== 'undefined' ? location.pathname : 'ed5');
    },
    pluginPath: function(name) {
        return this.base ? this.base + '/js/plugins/' + name + '.js' : this.pluginBase + name + '.js';
    },
    pluginsJsPath: function() { return this.base ? this.base + '/js/plugins.js' : 'js/plugins.js'; },
    readText: function(filePath, cb) {
        var self = this;
        if (this.fs) {
            this.fs.readFile(filePath, 'utf8', function(err, text) { cb(err ? null : text, err); });
            return;
        }
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', filePath);
            xhr.overrideMimeType('text/plain');
            xhr.onload = function() {
                if (xhr.status === 200 || xhr.status === 0) cb(xhr.responseText, null);
                else cb(null, new Error('HTTP ' + xhr.status));
            };
            xhr.onerror = function() { cb(null, new Error('Network error')); };
            xhr.send();
        } catch (e) { cb(null, e); }
        void self;
    },
    listDir: function(dir, exts) {
        if (!this.fs) return null;
        try {
            var self = this;
            return this.fs.readdirSync(dir).filter(function(f) {
                var full = self.path.join(dir, f);
                try { if (self.fs.statSync(full).isDirectory()) return false; } catch (e) { return false; }
                var ext = self.path.extname(f).toLowerCase();
                return !exts || exts.indexOf(ext) >= 0;
            });
        } catch (e) { return null; }
    },
    listPluginFiles: function() {
        if (!this.fs) return null;
        var self = this, out = [];
        function walk(dir, prefix) {
            var items;
            try { items = self.fs.readdirSync(dir); } catch (e) { return; }
            items.forEach(function(f) {
                var full = self.path.join(dir, f);
                var st; try { st = self.fs.statSync(full); } catch (e) { return; }
                if (st.isDirectory()) { walk(full, prefix + f + '/'); }
                else if (/\.js$/i.test(f)) out.push(prefix + f.replace(/\.js$/i, ''));
            });
        }
        walk(this.base + '/js/plugins', '');
        return out;
    },
    mtime: function(filePath) {
        if (!this.fs) return 0;
        try { return this.fs.statSync(filePath).mtimeMs; } catch (e) { return 0; }
    }
};
Env.init();

//=============================================================================
// 3. Local storage helpers (never throws)
//=============================================================================

var LS = GB.LS = {
    prefix: 'ed5gearbox.',
    key: function(k) { return this.prefix + k; },
    get: function(k, fallback) {
        try { var v = localStorage.getItem(this.key(k)); return v === null ? fallback : JSON.parse(v); }
        catch (e) { return fallback; }
    },
    set: function(k, v) {
        try { localStorage.setItem(this.key(k), JSON.stringify(v)); return true; } catch (e) { return false; }
    },
    remove: function(k) { try { localStorage.removeItem(this.key(k)); } catch (e) { /* ignore */ } }
};

//=============================================================================
// 4. Parameters (own)
//=============================================================================

var P = GB.PARAMS = {};

function readOwnParams() {
    var raw = PluginManager.parameters(PLUGIN_NAME) || {};
    P.devMode = toStr(raw.devMode, 'auto');
    P.hotkey = toStr(raw.hotkey, 'F9');
    P.dock = toStr(raw.dock, 'right') === 'left' ? 'left' : 'right';
    P.panelWidth = clamp(toNum(raw.panelWidth, 440), 320, 900);
    P.shrinkCanvas = toBool(raw.shrinkCanvas, false);
    P.rememberLayout = toBool(raw.rememberLayout, true);
    P.openCommandInMenu = toBool(raw.openCommandInMenu, false);
    P.menuCommandName = toStr(raw.menuCommandName, 'Gear Box');
    P.openOnStart = toBool(raw.openOnStart, false);
    P.autoApply = toBool(raw.autoApply, true);
    P.persistUnsavedEdits = toBool(raw.persistUnsavedEdits, true);
    P.confirmPluginsJsWrite = toBool(raw.confirmPluginsJsWrite, true);
    P.backupPluginsJs = toBool(raw.backupPluginsJs, true);
    P.pollGaugesHz = clamp(toNum(raw.pollGaugesHz, 4), 1, 30);
    P.captureConsole = toBool(raw.captureConsole, true);
    P.consoleBufferSize = clamp(toNum(raw.consoleBufferSize, 600), 100, 5000);
    P.hideThirdParty = toBool(raw.hideThirdParty, false);
    P.enablePlayerMode = toBool(raw.enablePlayerMode, false);
    P.playerMenuLabel = toStr(raw.playerMenuLabel, 'Mod Settings');
    P.playerTitle = toStr(raw.playerTitle, 'Settings');
    P.exposedFields = parseStructArray(raw.exposedFields);
    P.shippedProfiles = parseStructArray(raw.shippedProfiles).map(function(sp) {
        sp.entries = parseStructArray(sp.entries);
        return sp;
    });
    P.themePreset = toStr(raw.themePreset, 'dark') === 'light' ? 'light' : 'dark';
    P.themeAccent = isHexColor(raw.themeAccent) ? String(raw.themeAccent).trim() : '#5ea1ff';
    P.themeBg = isHexColor(raw.themeBg) ? String(raw.themeBg).trim() : '';
    P.themeText = isHexColor(raw.themeText) ? String(raw.themeText).trim() : '';
    P.themeFont = toStr(raw.themeFont, '');
    P.themeRadius = clamp(toNum(raw.themeRadius, 10), 0, 20);
    P.themeOpacity = clamp(toNum(raw.themeOpacity, 0.98), 0.5, 1);
}
readOwnParams();

GB.isDev = function() {
    if (P.devMode === 'always') return true;
    if (P.devMode === 'never') return false;
    return (Env.isNwjs() && Env.isTest()) || Env.hasFlag('gearbox');
};

//=============================================================================
// 5. Events
//=============================================================================

var Events = GB.events = {
    _l: {},
    on: function(evt, fn) { (this._l[evt] = this._l[evt] || []).push(fn); return fn; },
    off: function(evt, fn) { var a = this._l[evt]; if (!a) return; var i = a.indexOf(fn); if (i >= 0) a.splice(i, 1); },
    emit: function(evt, payload) {
        var a = this._l[evt]; if (!a) return;
        a.slice().forEach(function(fn) { tryCall(fn, null, [payload]); });
    }
};
GB.on = function(evt, fn) { return Events.on(evt, fn); };
GB.off = function(evt, fn) { return Events.off(evt, fn); };

//=============================================================================
// 6. Header parser: plugin source text -> schema
//=============================================================================

var HeaderParser = GB.HeaderParser = {
    ATTR_TAGS: ['text', 'desc', 'type', 'default', 'min', 'max', 'decimals', 'dir', 'require', 'parent', 'on', 'off'],
    LIST_TAGS: ['base', 'orderAfter', 'orderBefore', 'noteParam', 'noteDir', 'noteType', 'noteData'],

    parseType: function(str) {
        var s = String(str || '').trim();
        if (!s) return { kind: 'text', isArray: false, struct: null, raw: '' };
        var isArray = /\[\]$/.test(s);
        if (isArray) s = s.replace(/\[\]$/, '').trim();
        var m = /^struct<([^>]+)>$/i.exec(s);
        if (m) return { kind: 'struct', isArray: isArray, struct: m[1].trim(), raw: str };
        var kind = s.toLowerCase();
        if (kind === 'string') kind = 'text';
        return { kind: kind, isArray: isArray, struct: null, raw: str };
    },

    // Split a comment body into "@tag value" records with continuation lines.
    _tokenize: function(body) {
        var lines = body.split(/\r?\n/);
        var records = [];
        var current = null;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].replace(/^\s*\*\s?/, '').replace(/\s+$/, '');
            var m = /^\s*@([A-Za-z_][\w]*)(?:\s+([\s\S]*))?$/.exec(line);
            if (m) {
                current = { tag: m[1], value: m[2] !== undefined ? m[2] : '' , lines: [] };
                records.push(current);
            } else if (current) {
                current.lines.push(line);
            }
        }
        records.forEach(function(r) {
            // trim trailing blank continuation lines
            while (r.lines.length && !r.lines[r.lines.length - 1].trim()) r.lines.pop();
            r.multi = r.lines.length ? (r.value + '\n' + r.lines.join('\n')) : r.value;
        });
        return records;
    },

    _newParam: function(name) {
        return { name: name, text: '', desc: '', type: null, typeRaw: '', def: undefined, min: undefined, max: undefined,
                 decimals: undefined, dir: '', require: false, parent: '', on: '', off: '', options: [], children: [] };
    },

    _applyAttr: function(target, r) {
        var tag = r.tag;
        switch (tag) {
            case 'text': target.text = r.value.trim(); break;
            case 'desc': target.desc = r.lines.length ? [r.value].concat(r.lines).join(' ').replace(/\s+/g, ' ').trim() : r.value.trim(); break;
            case 'type': target.typeRaw = r.value.trim(); target.type = this.parseType(r.value); break;
            case 'default': target.def = r.multi; break;
            case 'min': target.min = Number(r.value); break;
            case 'max': target.max = Number(r.value); break;
            case 'decimals': target.decimals = Number(r.value); break;
            case 'dir': target.dir = r.value.trim(); break;
            case 'require': target.require = r.value.trim() === '1' || r.value.trim() === 'true'; break;
            case 'parent': target.parent = r.value.trim(); break;
            case 'on': target.on = r.value.trim(); break;
            case 'off': target.off = r.value.trim(); break;
            case 'option': target.options.push({ label: r.value.trim(), value: r.value.trim(), explicit: false }); break;
            case 'value':
                if (target.options.length) { var o = target.options[target.options.length - 1]; o.value = r.value.trim(); o.explicit = true; }
                break;
        }
    },

    _parseBlock: function(body, isStruct) {
        var self = this;
        var records = this._tokenize(body);
        var out = { desc: '', author: '', url: '', help: '', target: '', base: [], orderAfter: [], orderBefore: [],
                    params: [], commands: [], meta: {} };
        var ctx = 'plugin', param = null, command = null, arg = null;
        records.forEach(function(r) {
            var tag = r.tag;
            if (tag === 'param') {
                param = self._newParam(r.value.trim()); out.params.push(param); ctx = 'param'; return;
            }
            if (tag === 'command') {
                command = { name: r.value.trim(), text: '', desc: '', args: [] }; out.commands.push(command); ctx = 'command'; arg = null; return;
            }
            if (tag === 'arg') {
                if (!command) return;
                arg = self._newParam(r.value.trim()); command.args.push(arg); ctx = 'arg'; return;
            }
            if (tag === 'help') { out.help = r.multi; ctx = 'plugin'; return; }
            if (tag === 'plugindesc') { out.desc = r.value.trim(); ctx = 'plugin'; return; }
            if (tag === 'author') { out.author = r.value.trim(); ctx = 'plugin'; return; }
            if (tag === 'url') { out.url = r.value.trim(); ctx = 'plugin'; return; }
            if (tag === 'target') { out.target = r.value.trim(); ctx = 'plugin'; return; }
            if (self.LIST_TAGS.indexOf(tag) >= 0) {
                if (tag === 'base' || tag === 'orderAfter' || tag === 'orderBefore') out[tag].push(r.value.trim());
                else (out.meta[tag] = out.meta[tag] || []).push(r.value.trim());
                return;
            }
            if (self.ATTR_TAGS.indexOf(tag) >= 0 || tag === 'option' || tag === 'value') {
                if (ctx === 'param' && param) self._applyAttr(param, r);
                else if (ctx === 'arg' && arg) self._applyAttr(arg, r);
                else if (ctx === 'command' && command) { if (tag === 'text') command.text = r.value.trim(); else if (tag === 'desc') command.desc = r.value.trim(); }
                return;
            }
            out.meta[tag] = r.multi;
        });
        void isStruct;
        return out;
    },

    // Decorative separator params such as "══ Ambient ══", "---General---" or "[Display]".
    _isDivider: function(p) {
        var label = p.text || p.name;
        return /^[^A-Za-z0-9]/.test(p.name) || /[═=─—\-_*#~]{2,}/.test(label) || /^\[.*\]$/.test(label.trim()) || /^<.*>$/.test(label.trim());
    },
    _cleanLabel: function(s) {
        return String(s).replace(/[═=─—\-_*#~\[\]<>|:]+/g, ' ').replace(/\s+/g, ' ').trim();
    },
    // Builds children[] from @parent and flags section headers. Dividers without @parent
    // children adopt the params that follow them, so flat headers still get grouped.
    _buildTree: function(params) {
        var self = this;
        var byName = {};
        params.forEach(function(p) { byName[p.name] = p; p.children = []; });
        var roots = [];
        params.forEach(function(p) {
            var parent = p.parent && byName[p.parent] && byName[p.parent] !== p ? byName[p.parent] : null;
            // guard against cycles
            var guard = parent, depth = 0;
            while (guard && depth < 32) { if (guard === p) { parent = null; break; } guard = guard.parent ? byName[guard.parent] : null; depth++; }
            if (parent) parent.children.push(p); else roots.push(p);
        });
        params.forEach(function(p) {
            var noType = !p.type;
            var emptyDefault = p.def === undefined || String(p.def).trim() === '';
            p.isSection = noType && emptyDefault && p.children.length > 0;
            p.isDivider = noType && emptyDefault && !p.children.length && self._isDivider(p);
            if (p.isSection || p.isDivider) p.text = self._cleanLabel(p.text || p.name) || p.name;
            if (!p.type) p.type = { kind: 'text', isArray: false, struct: null, raw: '' };
        });
        var usesParent = params.some(function(p) { return p.parent; });
        if (!usesParent && roots.some(function(p) { return p.isDivider; })) {
            var grouped = [], current = null;
            roots.forEach(function(p) {
                if (p.isDivider) { p.isSection = true; p.isDivider = false; current = p; grouped.push(p); }
                else if (current) current.children.push(p);
                else grouped.push(p);
            });
            grouped.forEach(function(p) { if (p.isSection && !p.children.length) { p.isSection = false; p.isDivider = true; } });
            return grouped;
        }
        return roots;
    },

    parse: function(source) {
        var self = this;
        var blocks = [];
        var re = /\/\*(~struct~([A-Za-z0-9_]+))?:([a-z]{2})?([\s\S]*?)\*\//g;
        var m;
        while ((m = re.exec(source))) {
            blocks.push({ struct: m[2] || null, locale: m[3] || '', body: m[4] });
        }
        var main = null, structs = {};
        blocks.forEach(function(b) {
            if (!b.struct) {
                if (!main || (main.locale && !b.locale)) main = b;
            } else {
                if (!structs[b.struct] || (structs[b.struct].locale && !b.locale)) structs[b.struct] = b;
            }
        });
        if (!main) return null;
        var schema = this._parseBlock(main.body, false);
        schema.roots = this._buildTree(schema.params);
        schema.structs = {};
        each(structs, function(b, name) {
            var parsed = self._parseBlock(b.body, true);
            parsed.params.forEach(function(p) { if (!p.type) p.type = { kind: 'text', isArray: false, struct: null, raw: '' }; });
            schema.structs[name] = { name: name, fields: parsed.params };
        });
        schema.commands.forEach(function(c) {
            c.args.forEach(function(a) { if (!a.type) a.type = { kind: 'text', isArray: false, struct: null, raw: '' }; });
        });
        schema.paramMap = {};
        schema.params.forEach(function(p) { schema.paramMap[p.name] = p; });
        return schema;
    },

    // Fallback schema for plugins we could not parse: guess from stored values.
    guess: function(parameters, desc) {
        var params = [];
        each(parameters || {}, function(v, k) {
            var p = HeaderParser._newParam(k);
            p.text = k;
            var s = String(v);
            if (s === 'true' || s === 'false') p.type = HeaderParser.parseType('boolean');
            else if (/^-?\d+(\.\d+)?$/.test(s)) p.type = HeaderParser.parseType('number');
            else if (/^\s*\[/.test(s) && safeJson(s, null)) p.type = HeaderParser.parseType('string[]');
            else if (/\n/.test(s)) p.type = HeaderParser.parseType('multiline_string');
            else p.type = HeaderParser.parseType('text');
            p.def = s;
            p.guessed = true;
            params.push(p);
        });
        var schema = { desc: desc || '', author: '', url: '', help: '', target: '', base: [], orderAfter: [], orderBefore: [],
                       params: params, commands: [], meta: {}, structs: {}, guessed: true };
        schema.roots = this._buildTree(params);
        schema.paramMap = {};
        params.forEach(function(p) { schema.paramMap[p.name] = p; });
        return schema;
    }
};

//=============================================================================
// 7. Value codec: Plugin Manager strings <-> JS values, driven by schema
//=============================================================================

var Codec = GB.Codec = {
    elem: function(field) {
        var e = Object.create(field);
        e.type = { kind: field.type.kind, isArray: false, struct: field.type.struct, raw: field.type.raw };
        e.def = undefined;
        return e;
    },
    isNumeric: function(kind) {
        return kind === 'number' || this.isDbRef(kind);
    },
    isDbRef: function(kind) {
        return ['switch', 'variable', 'actor', 'class', 'skill', 'item', 'weapon', 'armor', 'enemy', 'troop', 'state',
                'animation', 'tileset', 'common_event', 'map'].indexOf(kind) >= 0;
    },
    // Parsed containers remember the strings they came from (non-enumerable), so that
    // serializing an untouched value reproduces the stored text byte for byte.
    _setRaw: function(target, raw) {
        try { Object.defineProperty(target, '__gbRaw', { value: raw, enumerable: false, writable: true, configurable: true }); } catch (e) { /* ignore */ }
        return target;
    },
    parse: function(field, str, structs) {
        var t = field.type;
        if (str === undefined || str === null) str = field.def !== undefined ? field.def : '';
        if (t.isArray) {
            var arr = safeJson(String(str) || '[]', null);
            if (!Array.isArray(arr)) arr = [];
            var el = this.elem(field);
            var items = arr.map(function(s) { return typeof s === 'string' ? s : JSON.stringify(s); });
            var out = items.map(function(s) { return Codec.parse(el, s, structs); });
            return this._setRaw(out, { text: String(str), items: items });
        }
        switch (t.kind) {
            case 'struct': {
                var obj = safeJson(String(str) || '{}', null);
                if (!isObj(obj)) obj = {};
                var def = (structs && structs[t.struct]) || null;
                var res = {};
                var fields = {};
                each(obj, function(v, k) { fields[k] = typeof v === 'string' ? v : JSON.stringify(v); });
                if (def) {
                    def.fields.forEach(function(f) {
                        res[f.name] = Codec.parse(f, has(fields, f.name) ? fields[f.name] : undefined, structs);
                    });
                    each(fields, function(v, k) { if (!has(res, k)) res[k] = v; });
                } else {
                    each(fields, function(v, k) { res[k] = v; });
                }
                return this._setRaw(res, { text: String(str), fields: fields });
            }
            case 'boolean': return String(str) === 'true';
            case 'number': {
                var s0 = String(str);
                if (s0.trim() === '') return '';
                var n = Number(s0);
                return isNaN(n) ? s0 : n;
            }
            case 'note': {
                var s = String(str);
                if (/^\s*"/.test(s)) { var parsed = safeJson(s, undefined); if (typeof parsed === 'string') return parsed; }
                return s;
            }
            default:
                if (this.isDbRef(t.kind)) { var id = Number(str); return (String(str).trim() === '' || isNaN(id)) ? String(str) : id; }
                return String(str);
        }
    },
    // original: the stored string this value was parsed from, when known. Untouched values
    // come back exactly as stored (number formatting, note quoting style, JSON whitespace).
    serialize: function(field, value, structs, original) {
        var t = field.type;
        if (t.isArray) {
            var el = this.elem(field);
            var list = Array.isArray(value) ? value : [];
            var raw = list.__gbRaw;
            var items = list.map(function(v, i) { return Codec.serialize(el, v, structs, raw && raw.items ? raw.items[i] : undefined); });
            if (raw && raw.items && raw.items.length === items.length && items.every(function(s, i) { return s === raw.items[i]; })) return raw.text;
            return JSON.stringify(items);
        }
        switch (t.kind) {
            case 'struct': {
                var def = (structs && structs[t.struct]) || null;
                var src = isObj(value) ? value : {};
                var sraw = src.__gbRaw;
                var rawFields = sraw && sraw.fields ? sraw.fields : null;
                var obj = {};
                if (def) {
                    def.fields.forEach(function(f) {
                        var orig = rawFields && has(rawFields, f.name) ? rawFields[f.name] : undefined;
                        obj[f.name] = Codec.serialize(f, has(src, f.name) ? src[f.name] : Codec.parse(f, undefined, structs), structs, orig);
                    });
                    each(src, function(v, k) { if (!has(obj, k)) obj[k] = typeof v === 'string' ? v : JSON.stringify(v); });
                } else {
                    each(src, function(v, k) { obj[k] = typeof v === 'string' ? v : JSON.stringify(v); });
                }
                if (rawFields) {
                    var same = true;
                    each(rawFields, function(v, k) { if (obj[k] !== v) same = false; });
                    if (same && def) {
                        // keys the header added since this value was stored must still be at their defaults
                        each(obj, function(v, k) {
                            if (has(rawFields, k) || !same) return;
                            var f = null;
                            for (var i = 0; i < def.fields.length; i++) if (def.fields[i].name === k) { f = def.fields[i]; break; }
                            if (!f) { same = false; return; }
                            if (Codec.serialize(f, Codec.parse(f, undefined, structs), structs) !== v) same = false;
                        });
                    } else if (same) {
                        each(obj, function(v, k) { if (!has(rawFields, k)) same = false; });
                    }
                    if (same) return sraw.text;
                }
                return JSON.stringify(obj);
            }
            case 'boolean': {
                var b = value === true || value === 'true';
                if (original !== undefined && (String(original) === 'true') === b) return String(original);
                return b ? 'true' : 'false';
            }
            case 'number': {
                if (value === '' || value === undefined || value === null) return original !== undefined && String(original).trim() === '' ? String(original) : '';
                if (typeof value === 'string' && isNaN(Number(value))) return value;
                var n = Number(value);
                if (original !== undefined && String(original).trim() !== '' && Number(original) === n) return String(original);
                // controls commit pre-formatted strings ("0.50"); keep their formatting
                if (typeof value === 'string') return value.trim();
                return String(n);
            }
            case 'note': {
                var text = String(value === undefined || value === null ? '' : value);
                if (original !== undefined && text === String(original)) return String(original);
                if (original !== undefined && !/^\s*"/.test(String(original))) return text;
                return JSON.stringify(text);
            }
            default: {
                var sv = value === undefined || value === null ? '' : String(value);
                if (original !== undefined && this.isDbRef(t.kind) && String(original).trim() !== '' && Number(original) === Number(sv) && !isNaN(Number(sv))) return String(original);
                return sv;
            }
        }
    },
    // Human-friendly one-line summary of a stored string, for list rows and diffs.
    summarize: function(field, str, structs, maxLen) {
        maxLen = maxLen || 60;
        var s = String(str === undefined ? '' : str);
        if (field && field.type) {
            var t = field.type;
            if (t.isArray) {
                var arr = safeJson(s || '[]', []);
                return Array.isArray(arr) ? arr.length + (arr.length === 1 ? ' item' : ' items') : s;
            }
            if (t.kind === 'struct') {
                var obj = safeJson(s || '{}', {});
                var def = structs && structs[t.struct];
                var first = null;
                if (def) {
                    for (var i = 0; i < def.fields.length; i++) {
                        var f = def.fields[i];
                        if (!f.type.isArray && f.type.kind !== 'struct' && obj[f.name] !== undefined && String(obj[f.name]).trim() !== '') { first = String(obj[f.name]); break; }
                    }
                }
                if (first === null) { var keys = Object.keys(obj); first = keys.length ? String(obj[keys[0]]) : '{}'; }
                s = first;
            }
            if (t.kind === 'note') { var p = safeJson(s, undefined); if (typeof p === 'string') s = p; }
        }
        s = s.replace(/\s+/g, ' ');
        if (s === '') return '(empty)';
        return s.length > maxLen ? s.slice(0, maxLen - 1) + '…' : s;
    }
};

//=============================================================================
// 8. Registry: everything Gear Box knows about
//=============================================================================

var Registry = GB.Registry = {
    entries: [],
    byName: {},
    registrants: {},
    built: false,

    _make: function(name, plugin, index) {
        var base = baseName(name);
        return {
            name: name, key: name, baseName: base, index: index, plugin: plugin,
            installed: false, onDisk: null, notInstalled: false, dupOf: null, dupEntry: false,
            source: /^ED5_/i.test(base) ? 'ed5' : 'thirdparty',
            schema: null, schemaState: 'idle', schemaError: null, sourceText: null,
            registrant: null, health: { status: 'ok', errors: [] },
            loadedLate: false, version: extractVersion(plugin.description)
        };
    },

    build: function() {
        var self = this;
        var prevHealth = {};
        this.entries.forEach(function(e) { prevHealth[e.name] = e.health; });
        this.entries = []; this.byName = {};
        var seenBase = {};
        var list = (typeof $plugins !== 'undefined' && Array.isArray($plugins)) ? $plugins : [];
        list.forEach(function(pl, i) {
            var e = self._make(pl.name, pl, i);
            e.installed = true;
            e.loadedLate = !!pl._gbLoadedLate;
            var b = e.baseName.toLowerCase();
            if (seenBase[b]) e.dupOf = seenBase[b].name; else seenBase[b] = e;
            if (prevHealth[e.name]) e.health = prevHealth[e.name];
            // A second entry with the exact same name (a broken plugins.js) gets its own key so it still shows up.
            e.key = self.byName[e.name] ? e.name + '#' + i : e.name;
            e.dupEntry = e.key !== e.name;
            self.entries.push(e); self.byName[e.key] = e;
        });
        each(this.registrants, function(spec, name) {
            if (self.get(name)) return;
            var pl = { name: name, status: true, description: spec.description || '', parameters: PluginManager.parameters(baseName(name)) };
            var e = self._make(name, pl, -1);
            e.source = 'api-only';
            if (prevHealth[e.name]) e.health = prevHealth[e.name];
            self.entries.push(e); self.byName[e.name] = e;
        });
        var files = Env.listPluginFiles();
        if (files) {
            var fileSet = {};
            files.forEach(function(f) { fileSet[f.toLowerCase()] = f; });
            this.entries.forEach(function(e) { if (e.installed) e.onDisk = !!fileSet[e.name.toLowerCase()]; });
            files.forEach(function(f) {
                if (self.get(f)) return;
                if (/\.(bak|old|disabled)$/i.test(f)) return;
                var e = self._make(f, { name: f, status: false, description: '', parameters: {} }, -1);
                e.notInstalled = true; e.onDisk = true;
                self.entries.push(e); self.byName[e.name] = e;
            });
        }
        this._attachRegistrants();
        this.built = true;
        Events.emit('registry', { entries: this.entries });
        return this.entries;
    },

    _attachRegistrants: function() {
        var self = this;
        this.entries.forEach(function(e) { e.registrant = null; });
        each(this.registrants, function(spec, name) {
            var e = self.get(name);
            if (e) e.registrant = spec;
        });
    },

    get: function(name) {
        if (!name) return null;
        if (this.byName[name]) return this.byName[name];
        var lower = String(name).toLowerCase();
        var base = baseName(lower);
        var found = null;
        for (var i = 0; i < this.entries.length; i++) {
            var e = this.entries[i];
            if (e.name.toLowerCase() === lower) return e;
            if (e.baseName.toLowerCase() === base && e.installed && (!found || (e.plugin.status && !found.plugin.status))) found = e;
        }
        return found;
    },

    installed: function() { return this.entries.filter(function(e) { return e.installed; }); },

    normalizeSpec: function(spec) {
        spec = spec || {};
        var s = {
            version: toStr(spec.version, ''), namespace: spec.namespace || null, docs: toStr(spec.docs, ''),
            description: toStr(spec.description, ''),
            reload: typeof spec.reload === 'function' ? spec.reload : null,
            onChange: typeof spec.onChange === 'function' ? spec.onChange : null,
            setEnabled: typeof spec.setEnabled === 'function' ? spec.setEnabled : null,
            validate: typeof spec.validate === 'function' ? spec.validate : null,
            panel: typeof spec.panel === 'function' ? spec.panel : null,
            gauges: isObj(spec.gauges) ? spec.gauges : {},
            actions: isObj(spec.actions) ? spec.actions : {},
            playerExposed: Array.isArray(spec.playerExposed) ? spec.playerExposed.slice() : [],
            liveKeys: null
        };
        if (Array.isArray(spec.liveKeys)) s.liveKeys = spec.liveKeys.map(String);
        else if (typeof spec.liveKeys === 'string') s.liveKeys = [spec.liveKeys];
        else s.liveKeys = (s.reload || s.onChange) ? ['*'] : [];
        return s;
    },

    register: function(name, spec) {
        if (!name) return null;
        var s = this.normalizeSpec(spec);
        this.registrants[name] = s;
        if (this.built) {
            var e = this.get(name);
            if (e) e.registrant = s;
            else this.build();
        }
        Events.emit('register', { plugin: name, spec: s });
        return s;
    },

    unregister: function(name) {
        delete this.registrants[name];
        var e = this.get(name);
        if (e) e.registrant = null;
    },

    isLiveKey: function(entry, key) {
        var r = entry && entry.registrant;
        if (!r || !(r.reload || r.onChange)) return false;
        return r.liveKeys.indexOf('*') >= 0 || r.liveKeys.indexOf(key) >= 0;
    },
    hasLive: function(entry) {
        var r = entry && entry.registrant;
        return !!(r && (r.reload || r.onChange) && r.liveKeys.length);
    },

    ensureSchema: function(name, cb) {
        var e = typeof name === 'object' ? name : this.get(name);
        if (!e) { if (cb) cb(null); return; }
        if (e.schemaState === 'ready' || e.schemaState === 'error') { if (cb) cb(e); return; }
        if (e.schemaState === 'loading') { e._schemaWaiters.push(cb); return; }
        e.schemaState = 'loading';
        e._schemaWaiters = cb ? [cb] : [];
        Env.readText(Env.pluginPath(e.name), function(text, err) {
            var schema = null;
            if (text) {
                e.sourceText = text;
                schema = tryCall(HeaderParser.parse, HeaderParser, [text], function(ex) { e.schemaError = ex; });
            } else {
                e.schemaError = err || new Error('Could not read ' + e.name + '.js');
                if (e.installed && e.onDisk === null) e.onDisk = false;
            }
            if (!schema) schema = HeaderParser.guess(e.plugin.parameters, e.plugin.description);
            e.schema = schema;
            e.schemaState = text ? 'ready' : 'error';
            if (!e.notInstalled && !e.plugin.description && schema.desc) e.plugin.description = schema.desc;
            if (!e.version) e.version = extractVersion(schema.desc);
            var waiters = e._schemaWaiters; e._schemaWaiters = [];
            waiters.forEach(function(w) { if (w) tryCall(w, null, [e]); });
            Events.emit('schema', { plugin: e.name, entry: e });
        });
    },

    ensureAll: function(onProgress, onDone) {
        var self = this;
        var pending = this.entries.filter(function(e) { return e.schemaState === 'idle' || e.schemaState === 'loading'; });
        var total = this.entries.length, done = total - pending.length;
        if (!pending.length) { if (onDone) onDone(); return; }
        pending.forEach(function(e) {
            self.ensureSchema(e, function() {
                done++;
                if (onProgress) onProgress(done, total);
                if (done >= total && onDone) { var cb = onDone; onDone = null; cb(); }
            });
        });
    },

    recordError: function(name, err, context) {
        var e = this.get(name);
        var rec = { time: new Date(), message: err && err.message ? err.message : String(err), stack: err && err.stack ? String(err.stack) : '', context: context || '' };
        if (e) {
            e.health.status = 'error';
            e.health.errors.push(rec);
            if (e.health.errors.length > 20) e.health.errors.shift();
        }
        Events.emit('health', { plugin: name, error: rec, entry: e });
        return rec;
    },
    clearHealth: function(name) {
        var e = this.get(name);
        if (e) { e.health.status = 'ok'; e.health.errors = []; Events.emit('health', { plugin: name, entry: e }); }
    }
};

//=============================================================================
// 9. Store: baseline (file), applied (running), staged, undo/redo
//=============================================================================

var Store = GB.Store = {
    baseline: {},
    baselineOrder: [],
    applied: {},
    staged: {},
    undo: [],
    redo: [],

    _list: function() { return (typeof $plugins !== 'undefined' && Array.isArray($plugins)) ? $plugins : []; },

    snapshotBaseline: function() {
        var self = this;
        this.baseline = {}; this.baselineOrder = [];
        this._list().forEach(function(pl) {
            self.baseline[pl.name] = { status: !!pl.status, parameters: deepClone(pl.parameters || {}) };
            self.baselineOrder.push(pl.name);
        });
    },
    snapshotApplied: function() {
        var self = this;
        this.applied = {};
        this._list().forEach(function(pl) {
            var base = self.baseline[pl.name];
            var running = base ? base.status : !!pl.status;
            if (pl._gbLoadedLate) running = true;
            self.applied[pl.name] = { status: running, parameters: deepClone(pl.parameters || {}) };
        });
    },

    entry: function(name) { var e = Registry.get(name); return e ? e.plugin : null; },
    value: function(name, key) { var pl = this.entry(name); return pl && pl.parameters ? pl.parameters[key] : undefined; },
    baseValue: function(name, key) { var b = this.baseline[name]; return b ? b.parameters[key] : undefined; },
    appliedValue: function(name, key) { var a = this.applied[name]; return a ? a.parameters[key] : undefined; },

    isDirty: function(name, key) { return this.value(name, key) !== this.baseValue(name, key); },
    isStale: function(name, key) {
        var e = Registry.get(name);
        if (!e || !e.installed) return false;
        if (!this.applied[name]) return false;
        return this.value(name, key) !== this.appliedValue(name, key);
    },
    _keyUnion: function(name, other) {
        var pl = this.entry(name), keys = {};
        each(pl && pl.parameters, function(v, k) { keys[k] = true; });
        each(other && other.parameters, function(v, k) { keys[k] = true; });
        return Object.keys(keys);
    },
    dirtyKeys: function(name) {
        var self = this;
        return this._keyUnion(name, this.baseline[name]).filter(function(k) { return self.isDirty(name, k); });
    },
    staleKeys: function(name) {
        var self = this;
        if (!this.applied[name]) return [];
        return this._keyUnion(name, this.applied[name]).filter(function(k) { return self.isStale(name, k); });
    },
    isStatusDirty: function(name) {
        var pl = this.entry(name), b = this.baseline[name];
        if (!pl) return false;
        if (!b) return true;
        return !!pl.status !== !!b.status;
    },
    isStatusStale: function(name) {
        var pl = this.entry(name), a = this.applied[name];
        if (!pl || !a) return false;
        return !!pl.status !== !!a.status;
    },
    isOrderDirty: function() {
        var cur = this._list().map(function(p) { return p.name; });
        if (cur.length !== this.baselineOrder.length) return true;
        for (var i = 0; i < cur.length; i++) if (cur[i] !== this.baselineOrder[i]) return true;
        return false;
    },
    changes: function() {
        var self = this, out = [];
        this._list().forEach(function(pl) {
            var name = pl.name;
            if (self.isStatusDirty(name)) {
                var b = self.baseline[name];
                out.push({ plugin: name, kind: 'status', from: b ? b.status : undefined, to: !!pl.status, isNew: !b });
            }
            self.dirtyKeys(name).forEach(function(k) {
                out.push({ plugin: name, kind: 'param', key: k, from: self.baseValue(name, k), to: pl.parameters[k] });
            });
        });
        if (this.isOrderDirty()) out.push({ plugin: '', kind: 'order' });
        return out;
    },
    // Why a plugin's running state differs from its edited state: 'save' (needs Save + Reload), 'reload', or null.
    staleReason: function(name) {
        if (this.isStatusStale(name)) return 'save';
        var pl = this.entry(name);
        if (pl && pl.status && this.staleKeys(name).length) return 'reload';
        return null;
    },
    anyStale: function() {
        var self = this, out = [];
        this._list().forEach(function(pl) { var r = self.staleReason(pl.name); if (r) out.push({ plugin: pl.name, reason: r }); });
        return out;
    },

    pushUndo: function(rec) {
        this.undo.push(rec);
        if (this.undo.length > 300) this.undo.shift();
        this.redo = [];
    },

    markSaved: function() {
        this.snapshotBaseline();
        Events.emit('saved', {});
    }
};

//=============================================================================
// 10. Overlay: unsaved edits that survive reloads (developer mode only)
//=============================================================================

var Overlay = GB.Overlay = {
    data: null,
    enabled: function() { return P.persistUnsavedEdits && GB.isDev(); },
    key: function() { return 'overlay:' + Env.projectId; },
    load: function() {
        var d = LS.get(this.key(), null);
        if (!isObj(d) || !isObj(d.plugins)) d = { plugins: {}, order: null };
        this.data = d;
        return d;
    },
    save: function() {
        if (!this.data) return;
        if (this.isEmpty()) LS.remove(this.key());
        else LS.set(this.key(), this.data);
    },
    isEmpty: function() {
        if (!this.data) return true;
        if (this.data.order) return false;
        var empty = true;
        each(this.data.plugins, function(rec) {
            if (rec.status || (rec.params && Object.keys(rec.params).length)) empty = false;
        });
        return empty;
    },
    _plugin: function(name) {
        if (!this.data) this.load();
        return this.data.plugins[name] || (this.data.plugins[name] = { params: {} });
    },
    record: function(name, key, value) {
        if (!this.enabled()) return;
        var rec = this._plugin(name);
        var base = Store.baseValue(name, key);
        if (value === base) delete rec.params[key];
        else rec.params[key] = { value: value === undefined ? null : value, remove: value === undefined, base: base === undefined ? null : base, baseAbsent: base === undefined };
        this.save();
    },
    recordStatus: function(name, value) {
        if (!this.enabled()) return;
        var rec = this._plugin(name);
        var b = Store.baseline[name];
        if (b && !!b.status === !!value) delete rec.status;
        else rec.status = { value: !!value, base: b ? !!b.status : null };
        this.save();
    },
    recordOrder: function() {
        if (!this.enabled()) return;
        if (!this.data) this.load();
        this.data.order = Store.isOrderDirty() ? Store._list().map(function(p) { return p.name; }) : null;
        this.save();
    },
    clear: function() { this.data = { plugins: {}, order: null }; LS.remove(this.key()); },

    // Runs at Gear Box parse time, before sibling plugins execute.
    applyAtBoot: function() {
        var result = { applied: 0, stale: 0, lateLoaded: [], statusPending: 0 };
        if (!this.enabled()) return result;
        var d = this.load();
        var list = Store._list();
        var byName = {};
        list.forEach(function(p) { byName[p.name] = p; });
        each(d.plugins, function(rec, name) {
            var pl = byName[name];
            if (!pl) { delete d.plugins[name]; result.stale++; return; }
            pl.parameters = pl.parameters || {};
            each(rec.params, function(r, key) {
                var cur = pl.parameters[key];
                var expected = r.baseAbsent ? undefined : r.base;
                if (cur === expected) {
                    if (r.remove) delete pl.parameters[key]; else pl.parameters[key] = r.value;
                    result.applied++;
                } else { delete rec.params[key]; result.stale++; }
            });
            if (rec.status) {
                if (rec.status.base !== null && !!pl.status !== !!rec.status.base) { delete rec.status; result.stale++; }
                else if (rec.status.value && !pl.status) {
                    pl.status = true; pl._gbLoadedLate = true;
                    tryCall(function() {
                        PluginManager.setParameters(baseName(pl.name), pl.parameters);
                        PluginManager.loadScript(pl.name);
                        if (PluginManager._scripts && PluginManager._scripts.indexOf(baseName(pl.name)) < 0) PluginManager._scripts.push(baseName(pl.name));
                    });
                    result.lateLoaded.push(pl.name);
                } else if (!rec.status.value && pl.status) {
                    pl.status = false; result.statusPending++;
                }
            }
        });
        if (Array.isArray(d.order)) {
            var pos = {};
            d.order.forEach(function(n, i) { pos[n] = i; });
            var known = list.filter(function(p) { return has(pos, p.name); }).sort(function(a, b) { return pos[a.name] - pos[b.name]; });
            var unknown = list.filter(function(p) { return !has(pos, p.name); });
            var merged = known.concat(unknown);
            list.length = 0;
            merged.forEach(function(p) { list.push(p); });
        }
        this.save();
        return result;
    }
};

//=============================================================================
// 11. Applier: the single write path for parameters, status and order
//=============================================================================

var Applier = GB.Applier = {
    _reloadQueue: {},
    _reloadTimer: null,

    set: function(name, key, value, opts) {
        opts = opts || {};
        var e = Registry.get(name);
        if (!e) return { ok: false, error: 'Unknown plugin: ' + name };
        if (e.notInstalled) return { ok: false, error: name + ' is not in plugins.js. Add it to the plugin list first.' };
        var pl = e.plugin;
        pl.parameters = pl.parameters || {};
        value = value === undefined || value === null ? '' : String(value);
        var prev = pl.parameters[key];
        if (prev === value) return { ok: true, changed: false, live: false };
        if (opts.stage) {
            var st = Store.staged[e.name] = Store.staged[e.name] || { parameters: {} };
            if (Store.value(e.name, key) === value) delete st.parameters[key]; else st.parameters[key] = value;
            Events.emit('staged', { plugin: e.name, key: key, value: value });
            return { ok: true, changed: true, staged: true };
        }
        var r = e.registrant;
        if (r && r.validate) {
            var err = tryCall(r.validate, r, [key, value, pl.parameters], function(ex) { Registry.recordError(e.name, ex, 'validate'); });
            if (typeof err === 'string' && err) return { ok: false, error: err };
        }
        pl.parameters[key] = value;
        if (!opts.noUndo) Store.pushUndo({ type: 'param', plugin: e.name, key: key, prev: prev, next: value });
        var live = this._tryLive(e, key, value);
        if (live) {
            var ap = Store.applied[e.name];
            if (ap) ap.parameters[key] = value;
        }
        if (opts.source !== 'player') Overlay.record(e.name, key, value);
        Events.emit('change', { plugin: e.name, key: key, value: value, prev: prev, live: live, source: opts.source || 'panel' });
        return { ok: true, changed: true, live: live };
    },

    applyStaged: function(name) {
        var self = this, st = Store.staged[name];
        if (!st) return 0;
        var n = 0;
        each(st.parameters, function(v, k) { var r = self.set(name, k, v, { source: 'staged' }); if (r.ok && r.changed) n++; });
        if (st.status !== undefined) { self.setEnabled(name, st.status, { source: 'staged' }); n++; }
        delete Store.staged[name];
        Events.emit('staged', { plugin: name, cleared: true });
        return n;
    },
    discardStaged: function(name) {
        delete Store.staged[name];
        Events.emit('staged', { plugin: name, cleared: true });
    },
    stagedCount: function(name) {
        var st = Store.staged[name];
        if (!st) return 0;
        return Object.keys(st.parameters).length + (st.status !== undefined ? 1 : 0);
    },

    _tryLive: function(e, key, value) {
        var r = e.registrant;
        if (!r || !e.plugin.status) return false;
        if (!Registry.isLiveKey(e, key)) return false;
        var params = e.plugin.parameters;
        var ok = true;
        if (r.onChange) {
            tryCall(r.onChange, r, [key, value, params], function(ex) { ok = false; Registry.recordError(e.name, ex, 'onChange(' + key + ')'); });
        }
        if (r.reload) this._queueReload(e.name);
        return ok;
    },
    _queueReload: function(name) {
        var self = this;
        this._reloadQueue[name] = true;
        if (this._reloadTimer) return;
        this._reloadTimer = setTimeout(function() { self.flushReloads(); }, 0);
    },
    flushReloads: function() {
        var q = this._reloadQueue;
        this._reloadQueue = {}; this._reloadTimer = null;
        each(q, function(v, name) {
            var e = Registry.get(name);
            if (!e || !e.registrant || !e.registrant.reload) return;
            var t0 = Date.now();
            tryCall(e.registrant.reload, e.registrant, [e.plugin.parameters], function(ex) { Registry.recordError(name, ex, 'reload'); });
            Events.emit('reloaded', { plugin: name, ms: Date.now() - t0 });
        });
    },

    setEnabled: function(name, enabled, opts) {
        opts = opts || {};
        var e = Registry.get(name);
        if (!e) return { ok: false, error: 'Unknown plugin: ' + name };
        if (e.notInstalled) return { ok: false, error: name + ' is not in plugins.js. Add it to the plugin list first.' };
        enabled = !!enabled;
        var pl = e.plugin;
        if (!!pl.status === enabled) return { ok: true, changed: false };
        if (opts.stage) {
            var st = Store.staged[e.name] = Store.staged[e.name] || { parameters: {} };
            st.status = enabled;
            Events.emit('staged', { plugin: e.name, status: enabled });
            return { ok: true, changed: true, staged: true };
        }
        var prev = !!pl.status;
        pl.status = enabled;
        if (!opts.noUndo) Store.pushUndo({ type: 'status', plugin: e.name, prev: prev, next: enabled });
        var live = false;
        var r = e.registrant;
        if (r && r.setEnabled) {
            live = true;
            tryCall(r.setEnabled, r, [enabled], function(ex) { live = false; Registry.recordError(e.name, ex, 'setEnabled'); });
            if (live) {
                var ap = Store.applied[e.name];
                if (ap) ap.status = enabled;
                if (enabled && !PluginManager._parameters[e.baseName.toLowerCase()]) PluginManager.setParameters(e.baseName, pl.parameters);
            }
        }
        Overlay.recordStatus(e.name, enabled);
        Events.emit('enabled', { plugin: e.name, enabled: enabled, live: live, source: opts.source || 'panel' });
        return { ok: true, changed: true, live: live };
    },

    _setOrder: function(names) {
        var list = Store._list(), byName = {};
        list.forEach(function(p) { (byName[p.name] = byName[p.name] || []).push(p); });
        var next = [];
        names.forEach(function(n) { var q = byName[n]; if (q && q.length) next.push(q.shift()); });
        list.forEach(function(p) { if (next.indexOf(p) < 0) next.push(p); });
        list.length = 0;
        next.forEach(function(p) { list.push(p); });
        Registry.entries.forEach(function(e) { if (e.installed) e.index = list.indexOf(e.plugin); });
        return list.map(function(p) { return p.name; });
    },
    reorder: function(names) {
        var prevOrder = Store._list().map(function(p) { return p.name; });
        var order = this._setOrder(names);
        Store.pushUndo({ type: 'order', prev: prevOrder, next: order });
        Overlay.recordOrder();
        Events.emit('order', { order: order });
    },

    addToList: function(name) {
        var e = Registry.get(name);
        if (!e || !e.notInstalled) return null;
        var list = Store._list();
        var params = {};
        if (e.schema && !e.schema.guessed) e.schema.params.forEach(function(p) { if (!p.isSection) params[p.name] = p.def === undefined ? '' : String(p.def); });
        var pl = { name: e.name, status: false, description: e.schema ? e.schema.desc : '', parameters: params };
        list.push(pl);
        e.plugin = pl; e.installed = true; e.notInstalled = false; e.index = list.length - 1;
        Overlay.recordOrder();
        Events.emit('order', { order: list.map(function(p) { return p.name; }), added: e.name });
        return e;
    },

    removeFromList: function(name) {
        var e = Registry.get(name);
        if (!e || !e.installed) return false;
        var list = Store._list();
        var i = list.indexOf(e.plugin);
        if (i < 0) return false;
        list.splice(i, 1);
        e.installed = false; e.notInstalled = true; e.index = -1;
        Overlay.recordOrder();
        Events.emit('order', { order: list.map(function(p) { return p.name; }), removed: e.name });
        return true;
    },

    undo: function() {
        var rec = Store.undo.pop();
        if (!rec) return null;
        this._replay(rec, true);
        Store.redo.push(rec);
        return rec;
    },
    redo: function() {
        var rec = Store.redo.pop();
        if (!rec) return null;
        this._replay(rec, false);
        Store.undo.push(rec);
        return rec;
    },
    _replay: function(rec, reverse) {
        var src = reverse ? 'undo' : 'redo';
        if (rec.type === 'param') {
            var v = reverse ? rec.prev : rec.next;
            if (v === undefined) this._deleteKey(rec.plugin, rec.key, src);
            else this.set(rec.plugin, rec.key, v, { noUndo: true, source: src });
        } else if (rec.type === 'status') {
            this.setEnabled(rec.plugin, reverse ? rec.prev : rec.next, { noUndo: true, source: src });
        } else if (rec.type === 'order') {
            var order = this._setOrder(reverse ? rec.prev : rec.next);
            Overlay.recordOrder();
            Events.emit('order', { order: order });
        }
    },
    _deleteKey: function(name, key, source) {
        var e = Registry.get(name);
        if (!e) return;
        var prev = e.plugin.parameters[key];
        delete e.plugin.parameters[key];
        Overlay.record(e.name, key, undefined);
        Events.emit('change', { plugin: e.name, key: key, value: undefined, prev: prev, live: false, source: source || 'revert' });
    },

    revertKey: function(name, key) {
        var base = Store.baseValue(name, key);
        var e = Registry.get(name);
        if (!e) return;
        if (base === undefined) {
            var prev = e.plugin.parameters[key];
            Store.pushUndo({ type: 'param', plugin: e.name, key: key, prev: prev, next: undefined });
            this._deleteKey(e.name, key, 'revert');
            return;
        }
        this.set(name, key, base, { source: 'revert' });
    },

    revertAll: function() {
        var self = this;
        Store.changes().forEach(function(c) {
            if (c.kind === 'param') self.revertKey(c.plugin, c.key);
            else if (c.kind === 'status') {
                if (c.isNew) self.removeFromList(c.plugin);
                else self.setEnabled(c.plugin, c.from, { source: 'revert' });
            }
        });
        if (Store.isOrderDirty()) {
            var order = this._setOrder(Store.baselineOrder);
            Events.emit('order', { order: order });
        }
        Overlay.clear();
        Events.emit('reverted', {});
    }
};

//=============================================================================
// 12. plugins.js writer (NW.js only)
//=============================================================================

var PluginsFile = GB.PluginsFile = {
    bootMtime: 0,
    lastWriteMtime: 0,
    eol: '\n',
    init: function() {
        if (!Env.fs) return;
        var p = Env.pluginsJsPath();
        this.bootMtime = Env.mtime(p);
        try {
            var head = Env.fs.readFileSync(p, 'utf8').slice(0, 4000);
            this.eol = /\r\n/.test(head) ? '\r\n' : '\n';
        } catch (e) { /* keep default */ }
    },
    canWrite: function() { return !!Env.fs; },
    externallyModified: function() {
        if (!Env.fs) return false;
        var m = Env.mtime(Env.pluginsJsPath());
        return !!m && m !== this.bootMtime && m !== this.lastWriteMtime;
    },
    serialize: function() {
        var eol = this.eol;
        var lines = Store._list().map(function(pl) {
            var e = Registry.byName[pl.name];
            var desc = pl.description;
            if (e && e.schema && !e.schema.guessed && e.schema.desc) desc = e.schema.desc;
            return JSON.stringify({ name: pl.name, status: !!pl.status, description: desc || '', parameters: pl.parameters || {} });
        });
        return '// Generated by RPG Maker.' + eol + '// Do not edit this file directly.' + eol + 'var $plugins =' + eol + '[' + eol + lines.join(',' + eol) + eol + '];' + eol;
    },
    write: function(opts, cb) {
        opts = opts || {};
        if (!Env.fs) { cb(new Error('Writing js/plugins.js requires NW.js (RPG Maker playtest).')); return; }
        if (!opts.force && this.externallyModified()) { var err = new Error('js/plugins.js was modified outside Gear Box since the game started.'); err.conflict = true; cb(err); return; }
        var p = Env.pluginsJsPath();
        try {
            if (P.backupPluginsJs) {
                try { Env.fs.copyFileSync(p, p + '.gearbox.bak'); } catch (e) { /* first run or missing */ }
            }
            Env.fs.writeFileSync(p, this.serialize(), 'utf8');
            this.lastWriteMtime = Env.mtime(p);
            this.bootMtime = this.lastWriteMtime;
        } catch (e) { cb(e); return; }
        Store._list().forEach(function(pl) { delete pl._gbLoadedLate; });
        Store.markSaved();
        Overlay.clear();
        Events.emit('save', { path: p });
        cb(null);
    }
};
PluginsFile.init();

//=============================================================================
// 13. Profiles
//=============================================================================

var Profiles = GB.Profiles = {
    list: [],
    key: function() { return 'profiles:' + Env.projectId; },
    load: function() {
        var l = LS.get(this.key(), []);
        this.list = Array.isArray(l) ? l.filter(function(p) { return p && p.name; }) : [];
        return this.list;
    },
    save: function() { LS.set(this.key(), this.list); Events.emit('profiles', { list: this.list }); },
    get: function(name) {
        for (var i = 0; i < this.list.length; i++) if (this.list[i].name === name) return this.list[i];
        return null;
    },
    // Overrides object from the current diff against plugins.js.
    captureCurrent: function() {
        var overrides = {};
        Store.changes().forEach(function(c) {
            if (c.kind === 'order') return;
            var rec = overrides[c.plugin] = overrides[c.plugin] || { params: {} };
            if (c.kind === 'status') rec.status = c.to;
            else rec.params[c.key] = c.to === undefined ? null : c.to;
        });
        return overrides;
    },
    count: function(profile) {
        var n = 0;
        each(profile.overrides, function(rec) { n += Object.keys(rec.params || {}).length + (rec.status !== undefined ? 1 : 0); });
        return n;
    },
    saveCurrent: function(name, description) {
        name = String(name || '').trim();
        if (!name) return null;
        var existing = this.get(name);
        var now = new Date().toISOString();
        var prof = existing || { name: name, description: '', createdAt: now, shipped: false, overrides: {} };
        if (description !== undefined) prof.description = String(description);
        prof.overrides = this.captureCurrent();
        prof.updatedAt = now;
        if (!existing) this.list.push(prof);
        this.save();
        if (prof.shipped) this.syncShipped();
        return prof;
    },
    rename: function(oldName, newName) {
        var p = this.get(oldName);
        newName = String(newName || '').trim();
        if (!p || !newName || this.get(newName)) return false;
        p.name = newName; p.updatedAt = new Date().toISOString();
        this.save();
        if (p.shipped) this.syncShipped();
        return true;
    },
    setDescription: function(name, description) {
        var p = this.get(name);
        if (!p) return false;
        p.description = String(description || '');
        this.save();
        if (p.shipped) this.syncShipped();
        return true;
    },
    remove: function(name) {
        var p = this.get(name);
        if (!p) return false;
        this.list.splice(this.list.indexOf(p), 1);
        this.save();
        if (p.shipped) this.syncShipped();
        return true;
    },
    setShipped: function(name, shipped) {
        var p = this.get(name);
        if (!p) return false;
        p.shipped = !!shipped;
        this.save();
        this.syncShipped();
        return true;
    },
    apply: function(nameOrProfile, opts) {
        opts = opts || {};
        var p = typeof nameOrProfile === 'string' ? (this.get(nameOrProfile) || this.shippedByName(nameOrProfile)) : nameOrProfile;
        if (!p) return { ok: false, error: 'No profile named ' + nameOrProfile };
        var n = 0, missing = [];
        each(p.overrides, function(rec, plugin) {
            var e = Registry.get(plugin);
            if (!e) { missing.push(plugin); return; }
            each(rec.params, function(v, k) {
                if (v === null) Applier.revertKey(e.name, k);
                else { var r = Applier.set(e.name, k, v, { source: opts.source || 'profile' }); if (r.ok && r.changed) n++; }
            });
            if (rec.status !== undefined) { var rs = Applier.setEnabled(e.name, rec.status, { source: opts.source || 'profile' }); if (rs.ok && rs.changed) n++; }
        });
        Events.emit('profile', { name: p.name, applied: n, missing: missing });
        return { ok: true, applied: n, missing: missing };
    },
    exportJson: function(name) {
        var p = this.get(name);
        return p ? JSON.stringify({ gearbox: GB.VERSION, profile: p }, null, 2) : null;
    },
    exportAllJson: function() { return JSON.stringify({ gearbox: GB.VERSION, profiles: this.list }, null, 2); },
    importJson: function(json) {
        var data = safeJson(json, null);
        if (!data) return { ok: false, error: 'Not valid JSON' };
        var incoming = [];
        if (data.profile) incoming = [data.profile];
        else if (Array.isArray(data.profiles)) incoming = data.profiles;
        else if (data.name && data.overrides) incoming = [data];
        else return { ok: false, error: 'No profiles found in that JSON' };
        var self = this, n = 0;
        incoming.forEach(function(p) {
            if (!p || !p.name || !isObj(p.overrides)) return;
            var existing = self.get(p.name);
            if (existing) self.list.splice(self.list.indexOf(existing), 1);
            self.list.push({ name: String(p.name), description: String(p.description || ''), createdAt: p.createdAt || new Date().toISOString(),
                             updatedAt: new Date().toISOString(), shipped: !!p.shipped, overrides: p.overrides });
            n++;
        });
        this.save();
        this.syncShipped();
        return { ok: true, imported: n };
    },
    // Shipped presets come from our own shippedProfiles param (works in deployed builds).
    shippedList: function() {
        return (P.shippedProfiles || []).map(function(sp) {
            var overrides = {};
            (sp.entries || []).forEach(function(en) {
                if (!en || !en.plugin || !en.param) return;
                var rec = overrides[en.plugin] = overrides[en.plugin] || { params: {} };
                rec.params[en.param] = en.value === undefined ? '' : String(en.value);
            });
            return { name: String(sp.name || ''), description: String(sp.description || ''), overrides: overrides, shipped: true, readOnly: true };
        }).filter(function(p) { return p.name; });
    },
    shippedByName: function(name) {
        var l = this.shippedList();
        for (var i = 0; i < l.length; i++) if (l[i].name === name) return l[i];
        return null;
    },
    // Writes all profiles flagged "shipped" into our own shippedProfiles parameter.
    syncShipped: function() {
        var shipped = this.list.filter(function(p) { return p.shipped; });
        var structs = shipped.map(function(p) {
            var entries = [];
            each(p.overrides, function(rec, plugin) {
                each(rec.params, function(v, k) { if (v !== null) entries.push(JSON.stringify({ plugin: plugin, param: k, value: String(v) })); });
            });
            return JSON.stringify({ name: p.name, description: p.description || '', entries: JSON.stringify(entries) });
        });
        Applier.set(PLUGIN_NAME, 'shippedProfiles', JSON.stringify(structs), { source: 'profiles' });
    }
};

//=============================================================================
// 14. Health: runtime errors attributed to plugin files
//=============================================================================

var Health = GB.Health = {
    installed: false,
    install: function() {
        if (this.installed || typeof window === 'undefined') return;
        this.installed = true;
        window.addEventListener('error', function(ev) {
            var file = ev && ev.filename ? String(ev.filename) : '';
            var m = /js\/plugins\/(.+?)\.js/i.exec(decodeURIComponent(file));
            if (!m) return;
            Registry.recordError(m[1], ev.error || new Error(ev.message), 'runtime error' + (ev.lineno ? ' at line ' + ev.lineno : ''));
        });
        window.addEventListener('unhandledrejection', function(ev) {
            var reason = ev && ev.reason;
            var stack = reason && reason.stack ? String(reason.stack) : '';
            var m = /js\/plugins\/(.+?)\.js/i.exec(stack);
            if (!m) return;
            Registry.recordError(m[1], reason, 'unhandled promise rejection');
        });
    }
};

//=============================================================================
// 15. Namespace walker (Inspector)
//=============================================================================

var Namespace = GB.Namespace = {
    resolvePath: function(path) {
        if (!path) return null;
        if (typeof path !== 'string') return path;
        var parts = path.split('.');
        var cur = (typeof window !== 'undefined') ? window : null;
        for (var i = 0; i < parts.length && cur !== null && cur !== undefined; i++) cur = cur[parts[i]];
        return cur === undefined ? null : cur;
    },
    // Best guess for plugins that did not tell us their namespace.
    guess: function(entry) {
        if (entry.registrant && entry.registrant.namespace) {
            var ns = entry.registrant.namespace;
            var r = this.resolvePath(ns);
            if (r) return { path: typeof ns === 'string' ? ns : entry.name, obj: r };
        }
        var base = entry.baseName.replace(/^ED5_/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
        if (typeof ED5 === 'object' && base) {
            var keys = Object.keys(ED5);
            var best = null;
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i], kl = k.toLowerCase();
                if (kl === base) { best = k; break; }
                if (kl.length >= 3 && base.indexOf(kl) === 0 && (!best || k.length > best.length)) best = k;
            }
            if (best && (isObj(ED5[best]) || typeof ED5[best] === 'function')) return { path: 'ED5.' + best, obj: ED5[best] };
        }
        if (typeof window !== 'undefined' && window[entry.baseName]) return { path: entry.baseName, obj: window[entry.baseName] };
        return null;
    },
    describe: function(v) {
        if (v === null) return { type: 'null', preview: 'null' };
        if (v === undefined) return { type: 'undefined', preview: 'undefined' };
        var t = typeof v;
        if (t === 'function') {
            var src = '';
            try { src = Function.prototype.toString.call(v); } catch (e) { /* ignore */ }
            var isClass = /^class\s/.test(src);
            return { type: isClass ? 'class' : 'function', preview: (isClass ? 'class' : 'ƒ') + '(' + v.length + ')' };
        }
        if (Array.isArray(v)) return { type: 'array', preview: 'Array(' + v.length + ')' };
        if (t === 'object') {
            var ctor = v.constructor && v.constructor.name && v.constructor.name !== 'Object' ? v.constructor.name : '';
            var n = 0; try { n = Object.keys(v).length; } catch (e) { /* ignore */ }
            return { type: 'object', preview: (ctor || 'Object') + ' {' + n + '}' };
        }
        if (t === 'string') return { type: 'string', preview: JSON.stringify(v.length > 60 ? v.slice(0, 59) + '…' : v) };
        return { type: t, preview: String(v) };
    },
    children: function(obj) {
        var out = [];
        var keys;
        try { keys = Object.keys(obj); } catch (e) { return out; }
        keys.sort(function(a, b) {
            var fa = typeof obj[a] === 'function', fb = typeof obj[b] === 'function';
            if (fa !== fb) return fa ? 1 : -1;
            return a < b ? -1 : a > b ? 1 : 0;
        });
        keys.forEach(function(k) {
            var v;
            try { v = obj[k]; } catch (e) { v = '(getter threw)'; }
            var d = Namespace.describe(v);
            out.push({ key: k, value: v, type: d.type, preview: d.preview, expandable: (d.type === 'object' || d.type === 'array') && v !== obj });
        });
        return out;
    }
};

//=============================================================================
// 16. Console capture + eval + completion
//=============================================================================

var Con = GB.Console = {
    buffer: [],
    tags: {},
    installed: false,
    _orig: {},
    max: function() { return P.consoleBufferSize; },
    install: function() {
        if (this.installed || typeof console === 'undefined') return;
        this.installed = true;
        var self = this;
        ['log', 'info', 'warn', 'error', 'debug'].forEach(function(level) {
            var orig = console[level];
            if (typeof orig !== 'function') return;
            self._orig[level] = orig;
            console[level] = function() {
                try { if (P.captureConsole) self.push(level, Array.prototype.slice.call(arguments)); } catch (e) { /* never break console */ }
                return orig.apply(console, arguments);
            };
        });
    },
    push: function(level, args, tagOverride) {
        var text = args.map(function(a) { return Con.format(a, 0); }).join(' ');
        var tag = tagOverride || '';
        if (!tag) { var m = /^\[([^\]]{1,40})\]/.exec(text); if (m) tag = m[1]; }
        if (tag) this.tags[tag] = (this.tags[tag] || 0) + 1;
        var rec = { level: level, text: text, tag: tag, time: new Date() };
        this.buffer.push(rec);
        if (this.buffer.length > this.max()) this.buffer.splice(0, this.buffer.length - this.max());
        Events.emit('console', rec);
        return rec;
    },
    clear: function() { this.buffer = []; this.tags = {}; Events.emit('console', null); },
    format: function(v, depth) {
        depth = depth || 0;
        if (v === null) return 'null';
        if (v === undefined) return 'undefined';
        var t = typeof v;
        if (t === 'string') return depth ? JSON.stringify(v) : v;
        if (t === 'number' || t === 'boolean') return String(v);
        if (t === 'function') return '[Function ' + (v.name || 'anonymous') + ']';
        if (v instanceof Error) return (v.stack || (v.name + ': ' + v.message));
        if (typeof HTMLElement !== 'undefined' && v instanceof HTMLElement) return '<' + v.tagName.toLowerCase() + (v.id ? '#' + v.id : '') + '>';
        if (depth > 2) return Array.isArray(v) ? '[…]' : '{…}';
        if (Array.isArray(v)) {
            var items = v.slice(0, 20).map(function(x) { return Con.format(x, depth + 1); });
            if (v.length > 20) items.push('… ' + (v.length - 20) + ' more');
            return '[' + items.join(', ') + ']';
        }
        if (t === 'object') {
            var keys; try { keys = Object.keys(v); } catch (e) { return String(v); }
            var ctor = v.constructor && v.constructor.name && v.constructor.name !== 'Object' ? v.constructor.name + ' ' : '';
            var parts = keys.slice(0, 12).map(function(k) { var val; try { val = v[k]; } catch (e) { val = '?'; } return k + ': ' + Con.format(val, depth + 1); });
            if (keys.length > 12) parts.push('… ' + (keys.length - 12) + ' more');
            return ctor + '{' + parts.join(', ') + '}';
        }
        return String(v);
    },
    evaluate: function(code) {
        try {
            var value = (0, eval)(code);
            return { ok: true, value: value };
        } catch (e) { return { ok: false, error: e }; }
    },
    complete: function(text) {
        var m = /([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\.?)?([\w$]*)$/.exec(text);
        if (!m || (!m[1] && !m[2])) return [];
        var basePath = m[1] ? m[1].replace(/\.$/, '') : '';
        var partial = m[2] || '';
        if (m[1] && !/\.$/.test(m[1])) { basePath = m[1].indexOf('.') >= 0 ? m[1].slice(0, m[1].lastIndexOf('.')) : ''; partial = m[1].indexOf('.') >= 0 ? m[1].slice(m[1].lastIndexOf('.') + 1) : m[1]; }
        var obj = basePath ? Namespace.resolvePath(basePath) : window;
        if (obj === null || obj === undefined || (typeof obj !== 'object' && typeof obj !== 'function')) return [];
        var names = {};
        var cur = obj, guard = 0;
        while (cur && guard++ < 8) {
            try { Object.getOwnPropertyNames(cur).forEach(function(k) { names[k] = true; }); } catch (e) { break; }
            cur = Object.getPrototypeOf(cur);
            if (cur === Object.prototype || cur === Function.prototype) break;
        }
        var pl = partial.toLowerCase();
        return Object.keys(names).filter(function(k) { return k.toLowerCase().indexOf(pl) === 0 && /^[A-Za-z_$][\w$]*$/.test(k); })
            .sort(function(a, b) { var da = a.charAt(0) === '_', db = b.charAt(0) === '_'; if (da !== db) return da ? 1 : -1; return a.toLowerCase() < b.toLowerCase() ? -1 : 1; })
            .slice(0, 40)
            .map(function(k) { var ty; try { ty = typeof obj[k]; } catch (e) { ty = '?'; } return { label: k, insert: (basePath ? basePath + '.' : '') + k, type: ty }; });
    }
};

//=============================================================================
// 17. Player overrides (per device; applied before sibling plugins load)
//=============================================================================

var PlayerStore = GB.PlayerStore = {
    key: function() { return 'player:' + Env.projectId; },
    data: null,
    load: function() { var d = LS.get(this.key(), null); this.data = isObj(d) ? d : {}; return this.data; },
    save: function() { LS.set(this.key(), this.data || {}); },
    get: function(plugin, key) { var d = this.data || this.load(); return d[plugin] ? d[plugin][key] : undefined; },
    set: function(plugin, key, value) {
        var d = this.data || this.load();
        d[plugin] = d[plugin] || {};
        if (value === undefined || value === null) delete d[plugin][key]; else d[plugin][key] = String(value);
        if (!Object.keys(d[plugin]).length) delete d[plugin];
        this.save();
    },
    clear: function() { this.data = {}; LS.remove(this.key()); },
    count: function() { var n = 0; each(this.data || this.load(), function(rec) { n += Object.keys(rec).length; }); return n; },
    exposed: function() {
        var out = [], seen = {};
        (P.exposedFields || []).forEach(function(f) {
            if (!f || !f.plugin || !f.param) return;
            var id = f.plugin + '::' + f.param;
            if (seen[id]) return; seen[id] = true;
            out.push({ plugin: String(f.plugin), param: String(f.param), label: toStr(f.label, ''), help: toStr(f.help, ''),
                       min: f.min === '' || f.min === undefined ? undefined : Number(f.min), max: f.max === '' || f.max === undefined ? undefined : Number(f.max),
                       step: f.step === '' || f.step === undefined ? undefined : Number(f.step) });
        });
        return out;
    },
    applyAtBoot: function() {
        if (!P.enablePlayerMode) return 0;
        var d = this.load();
        var allowed = {};
        this.exposed().forEach(function(f) { allowed[f.plugin + '::' + f.param] = true; });
        var list = Store._list(), n = 0;
        var byName = {};
        list.forEach(function(p) { byName[p.name] = p; if (!byName[baseName(p.name)]) byName[baseName(p.name)] = p; });
        each(d, function(rec, plugin) {
            var pl = byName[plugin];
            if (!pl) return;
            each(rec, function(v, k) {
                if (!allowed[plugin + '::' + k]) return;
                pl.parameters = pl.parameters || {};
                pl.parameters[k] = String(v); n++;
            });
        });
        return n;
    }
};

//=============================================================================
// 18. UI kit: DOM helpers, icons, stylesheet, components
//=============================================================================

function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
        each(attrs, function(v, k) {
            if (v === null || v === undefined || v === false) return;
            if (k === 'class') el.className = v;
            else if (k === 'style') el.style.cssText = v;
            else if (k === 'text') el.textContent = v;
            else if (k === 'html') el.innerHTML = v;
            else if (k === 'dataset') each(v, function(dv, dk) { el.dataset[dk] = dv; });
            else if (k.indexOf('on') === 0 && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
            else el.setAttribute(k, v === true ? '' : v);
        });
    }
    append(el, children);
    return el;
}
function append(el, children) {
    if (children === undefined || children === null || children === false) return el;
    if (Array.isArray(children)) { children.forEach(function(c) { append(el, c); }); return el; }
    if (typeof children === 'string' || typeof children === 'number') { el.appendChild(document.createTextNode(String(children))); return el; }
    if (children.nodeType) el.appendChild(children);
    return el;
}
function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }
function closest(el, selector) {
    while (el && el.nodeType === 1) { if (el.matches(selector)) return el; el = el.parentNode; }
    return null;
}
function isTextInput(el) {
    if (!el || el.nodeType !== 1) return false;
    var tag = el.tagName;
    return tag === 'TEXTAREA' || (tag === 'INPUT' && !/^(checkbox|radio|range|button|submit|color)$/i.test(el.type || '')) || el.isContentEditable;
}
function copyText(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text); return true; }
    } catch (e) { /* fall through */ }
    try {
        var ta = h('textarea', { style: 'position:fixed;opacity:0;top:0;left:0' });
        ta.value = text; document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy'); document.body.removeChild(ta); return ok;
    } catch (e) { return false; }
}
function hexToRgb(hex) {
    var s = String(hex).replace('#', '');
    if (s.length === 3) s = s.split('').map(function(c) { return c + c; }).join('');
    if (s.length === 8) s = s.slice(0, 6);
    var n = parseInt(s, 16);
    if (isNaN(n)) return { r: 94, g: 161, b: 255 };
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgba(hex, a) { var c = hexToRgb(hex); return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')'; }
function shiftHue(hex, deg) {
    var c = hexToRgb(hex), r = c.r / 255, g = c.g / 255, b = c.b / 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, hh = 0, s = 0, d = max - min;
    if (d) {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) hh = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) hh = ((b - r) / d + 2) / 6;
        else hh = ((r - g) / d + 4) / 6;
    }
    hh = (hh + deg / 360 + 1) % 1;
    function f(p, q, t) { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; }
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    var rr = Math.round(f(p, q, hh + 1 / 3) * 255), gg = Math.round(f(p, q, hh) * 255), bb = Math.round(f(p, q, hh - 1 / 3) * 255);
    return 'rgb(' + rr + ',' + gg + ',' + bb + ')';
}
function luminance(hex) { var c = hexToRgb(hex); return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255; }

var ICONS = {
    gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    chevronDown: '<polyline points="6 9 12 15 18 9"/>',
    chevronRight: '<polyline points="9 18 15 12 9 6"/>',
    chevronLeft: '<polyline points="15 18 9 12 15 6"/>',
    chevronsRight: '<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
    chevronsLeft: '<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    reset: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
    undo: '<polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
    redo: '<polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/>',
    play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    alert: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
    dockRight: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="15" y1="3" x2="15" y2="21"/>',
    dockLeft: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/>',
    grip: '<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    more: '<circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/><circle cx="5" cy="12" r="1" fill="currentColor"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    command: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    edit: '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 19.5 2 21l1.5-5.5L17 3z"/>',
    arrowUp: '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>',
    arrowDown: '<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
    power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    pin: '<line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>'
};

function icon(name, cls) {
    var span = h('span');
    span.innerHTML = '<svg class="gb-icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.box) + '</svg>';
    return span.firstChild;
}

var CSS_TEXT = [
'.gb-root{position:fixed;top:0;bottom:0;right:0;width:var(--gb-width,440px);max-width:94vw;z-index:10050;display:flex;flex-direction:column;background:var(--gb-bg);color:var(--gb-text);font:13px/1.45 var(--gb-font);border-left:1px solid var(--gb-border-strong);box-shadow:-12px 0 40px rgba(0,0,0,.35);pointer-events:auto;-webkit-font-smoothing:antialiased;transition:transform .22s cubic-bezier(.2,.8,.2,1);text-align:left;letter-spacing:0}',
'.gb-root.gb-left{right:auto;left:0;border-left:none;border-right:1px solid var(--gb-border-strong);box-shadow:12px 0 40px rgba(0,0,0,.35)}',
'.gb-root.is-hidden{transform:translateX(calc(100% + 48px));pointer-events:none}',
'.gb-root.gb-left.is-hidden{transform:translateX(calc(-100% - 48px))}',
'.gb-root.is-collapsed{width:38px!important}',
'.gb-root.is-collapsed>*{display:none!important}',
'.gb-root.is-collapsed>.gb-strip{display:flex!important}',
'.gb-strip{display:none;flex-direction:column;align-items:center;gap:10px;padding:10px 0;height:100%;cursor:pointer;color:var(--gb-text-muted)}',
'.gb-strip:hover{color:var(--gb-text);background:var(--gb-bg-hover)}',
'.gb-strip-label{writing-mode:vertical-rl;transform:rotate(180deg);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase}',
'.gb-strip .gb-badge-dot{width:8px;height:8px;border-radius:50%;background:var(--gb-accent)}',
'.gb-ui *,.gb-ui *::before,.gb-ui *::after{box-sizing:border-box}',
'.gb-ui button,.gb-ui input,.gb-ui select,.gb-ui textarea{font:inherit;color:inherit;margin:0}',
'.gb-ui ::-webkit-scrollbar{width:10px;height:10px}',
'.gb-ui ::-webkit-scrollbar-thumb{background:var(--gb-border-strong);border-radius:6px;border:2px solid transparent;background-clip:padding-box}',
'.gb-ui ::-webkit-scrollbar-thumb:hover{background:var(--gb-text-dim);border:2px solid transparent;background-clip:padding-box}',
'.gb-ui ::-webkit-scrollbar-track{background:transparent}',
'.gb-ui a{color:var(--gb-accent);text-decoration:none}.gb-ui a:hover{text-decoration:underline}',
'.gb-ui :focus{outline:none}',
'.gb-ui :focus-visible{outline:2px solid var(--gb-accent);outline-offset:1px}.gb-ui [tabindex="-1"]:focus-visible{outline:none}',
'.gb-icon{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;display:inline-block;vertical-align:-3px;flex-shrink:0}',
'.gb-resizer{position:absolute;top:0;bottom:0;left:-3px;width:7px;cursor:col-resize;z-index:5}',
'.gb-resizer::after{content:"";position:absolute;top:0;bottom:0;left:3px;width:1px;background:transparent;transition:background .12s}',
'.gb-resizer:hover::after,.gb-resizer.is-active::after{background:var(--gb-accent)}',
'.gb-root.gb-left .gb-resizer{left:auto;right:-3px}',
'.gb-mono{font-family:var(--gb-mono);font-size:12px}',
'.gb-muted{color:var(--gb-text-muted)}.gb-dim{color:var(--gb-text-dim)}.gb-small{font-size:11.5px}',
'.gb-row{display:flex;align-items:center;gap:8px;min-width:0}.gb-grow{flex:1;min-width:0}.gb-wrap{flex-wrap:wrap}',
'.gb-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-hidden{display:none!important}',
'.gb-kbd{display:inline-flex;align-items:center;height:18px;padding:0 5px;border-radius:4px;border:1px solid var(--gb-border-strong);background:var(--gb-bg-elev);font-family:var(--gb-mono);font-size:10px;color:var(--gb-text-dim);white-space:nowrap}',
'.gb-hl{background:rgba(245,185,66,.35);color:inherit;border-radius:2px;padding:0 1px}',
'@keyframes gb-fade{from{opacity:0}to{opacity:1}}',
'@keyframes gb-slide-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}',
'@keyframes gb-pop{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}',
'@keyframes gb-spin{to{transform:rotate(360deg)}}',
'@keyframes gb-pulse{0%,100%{opacity:1}50%{opacity:.45}}',
'.gb-spinner{width:16px;height:16px;border-radius:50%;border:2px solid var(--gb-border-strong);border-top-color:var(--gb-accent);animation:gb-spin .8s linear infinite;display:inline-block;vertical-align:-3px}',
// header
'.gb-header{display:flex;align-items:center;gap:8px;height:50px;padding:0 8px 0 14px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev);flex-shrink:0;position:relative}',
'.gb-brand{display:flex;align-items:center;gap:9px;min-width:0;flex:1}',
'.gb-logo{width:28px;height:28px;border-radius:9px;background:linear-gradient(135deg,var(--gb-accent),var(--gb-accent-2));display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 3px 10px var(--gb-accent-glow);flex-shrink:0}',
'.gb-logo .gb-icon{width:16px;height:16px}',
'.gb-title{font-weight:700;font-size:14px;letter-spacing:-.01em;line-height:1.1}',
'.gb-subtitle{font-size:10.5px;color:var(--gb-text-dim);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
'.gb-mode{font-size:9.5px;font-weight:700;letter-spacing:.1em;color:var(--gb-text-dim);border:1px solid var(--gb-border-strong);border-radius:4px;padding:1px 5px;flex-shrink:0}',
'.gb-header-actions{display:flex;align-items:center;gap:2px;flex-shrink:0}',
'.gb-unsaved{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 9px 0 8px;border-radius:999px;background:var(--gb-accent-soft);color:var(--gb-accent);font-size:11.5px;font-weight:600;cursor:pointer;border:none;white-space:nowrap;margin-right:4px}',
'.gb-unsaved:hover{background:var(--gb-accent-soft2)}',
'.gb-unsaved .gb-dot{width:6px;height:6px;border-radius:50%;background:currentColor}',
'.gb-unsaved.is-stale{background:var(--gb-warn-soft);color:var(--gb-warn)}',
// buttons
'.gb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:30px;padding:0 12px;border-radius:var(--gb-radius-sm);border:1px solid var(--gb-border-strong);background:var(--gb-bg-elev2);color:var(--gb-text);font-weight:500;font-size:12.5px;cursor:pointer;white-space:nowrap;transition:background .12s,border-color .12s,color .12s;user-select:none;line-height:1}',
'.gb-btn:hover{background:var(--gb-bg-hover2);border-color:var(--gb-text-dim)}',
'.gb-btn:active{transform:translateY(1px)}',
'.gb-btn[disabled],.gb-btn.is-disabled{opacity:.45;cursor:not-allowed;pointer-events:none}',
'.gb-btn-primary{background:var(--gb-accent);border-color:transparent;color:#fff}',
'.gb-btn-primary:hover{background:var(--gb-accent);filter:brightness(1.1);border-color:transparent}',
'.gb-btn-ghost{background:transparent;border-color:transparent;color:var(--gb-text-muted)}',
'.gb-btn-ghost:hover{background:var(--gb-bg-hover2);color:var(--gb-text);border-color:transparent}',
'.gb-btn-danger{color:var(--gb-danger)}.gb-btn-danger:hover{background:var(--gb-danger-soft);border-color:transparent}',
'.gb-btn-icon{width:30px;padding:0}',
'.gb-btn-sm{height:24px;padding:0 8px;font-size:11.5px}.gb-btn-sm.gb-btn-icon{width:24px}',
'.gb-btn-xs{height:20px;padding:0 6px;font-size:11px}.gb-btn-xs.gb-btn-icon{width:20px}',
'.gb-btn .gb-icon{width:15px;height:15px}.gb-btn-sm .gb-icon{width:14px;height:14px}.gb-btn-xs .gb-icon{width:12px;height:12px}',
'.gb-btn.has-dot{position:relative}.gb-btn.has-dot::after{content:"";position:absolute;top:4px;right:4px;width:7px;height:7px;border-radius:50%;background:var(--gb-warn);box-shadow:0 0 0 2px var(--gb-bg-elev)}',
'.gb-split{display:inline-flex}.gb-split .gb-btn:first-child{border-top-right-radius:0;border-bottom-right-radius:0}.gb-split .gb-btn:last-child{border-top-left-radius:0;border-bottom-left-radius:0;width:24px;padding:0;margin-left:-1px}',
// inputs
'.gb-input,.gb-textarea,.gb-select{width:100%;height:30px;padding:0 10px;border-radius:var(--gb-radius-sm);border:1px solid var(--gb-border-strong);background:var(--gb-bg-elev2);color:var(--gb-text);outline:none;transition:border-color .12s,box-shadow .12s;font-size:12.5px}',
'.gb-input:hover,.gb-textarea:hover,.gb-select:hover{border-color:var(--gb-text-dim)}',
'.gb-input:focus,.gb-textarea:focus,.gb-select:focus{border-color:var(--gb-accent);box-shadow:0 0 0 3px var(--gb-accent-soft)}',
'.gb-input.is-invalid{border-color:var(--gb-danger)}',
'.gb-input::placeholder,.gb-textarea::placeholder{color:var(--gb-text-dim)}',
'.gb-input.gb-mono,.gb-textarea{font-family:var(--gb-mono);font-size:12px}',
'.gb-textarea{height:auto;min-height:60px;padding:7px 10px;resize:vertical;line-height:1.45;display:block}',
'.gb-select{-webkit-appearance:none;appearance:none;padding-right:28px;cursor:pointer;background-image:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%239aa4b5\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 8px center;background-size:14px}',
'.gb-select option{background:var(--gb-bg-elev);color:var(--gb-text)}',
'.gb-input[type=number]::-webkit-inner-spin-button,.gb-input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}',
'.gb-switch{position:relative;width:34px;height:20px;border-radius:10px;background:var(--gb-border-strong);transition:background .15s;cursor:pointer;flex-shrink:0;border:none;padding:0;display:inline-block}',
'.gb-switch::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .15s cubic-bezier(.2,.8,.2,1);box-shadow:0 1px 2px rgba(0,0,0,.4)}',
'.gb-switch.is-on{background:var(--gb-accent)}.gb-switch.is-on::after{transform:translateX(14px)}',
'.gb-switch:hover{filter:brightness(1.1)}.gb-switch[disabled]{opacity:.5;cursor:not-allowed}',
'.gb-switch-row{display:inline-flex;align-items:center;gap:8px}.gb-switch-text{font-size:12px;color:var(--gb-text-muted);min-width:0}',
'.gb-range{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:2px;background:linear-gradient(to right,var(--gb-accent) 0%,var(--gb-accent) var(--gb-fill,0%),var(--gb-border-strong) var(--gb-fill,0%),var(--gb-border-strong) 100%);outline:none;cursor:pointer;margin:0}',
'.gb-range::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;border:2px solid var(--gb-accent);box-shadow:0 1px 3px rgba(0,0,0,.4);cursor:grab;transition:transform .1s}',
'.gb-range::-webkit-slider-thumb:hover{transform:scale(1.15)}.gb-range:active::-webkit-slider-thumb{cursor:grabbing;transform:scale(1.1)}',
'.gb-number{display:flex;align-items:center;gap:10px}.gb-number .gb-range{flex:1}',
'.gb-number .gb-input{width:86px;flex-shrink:0;text-align:right;font-family:var(--gb-mono);font-size:12px;padding:0 8px}',
'.gb-stepper{display:inline-flex;align-items:stretch;width:160px}.gb-stepper .gb-input{border-radius:0;text-align:center;font-family:var(--gb-mono);font-size:12px;padding:0 4px}',
'.gb-stepper .gb-btn{border-radius:0;width:28px;padding:0}.gb-stepper .gb-btn:first-child{border-radius:var(--gb-radius-sm) 0 0 var(--gb-radius-sm)}.gb-stepper .gb-btn:last-child{border-radius:0 var(--gb-radius-sm) var(--gb-radius-sm) 0}',
'.gb-stepper .gb-input{margin:0 -1px}',
'.gb-color{display:flex;align-items:center;gap:8px}.gb-color .gb-input{flex:1;font-family:var(--gb-mono);font-size:12px}',
'.gb-swatch{width:30px;height:30px;border-radius:var(--gb-radius-sm);border:1px solid var(--gb-border-strong);position:relative;overflow:hidden;flex-shrink:0;cursor:pointer;background:repeating-conic-gradient(#666 0 25%,#999 0 50%) 0 0/8px 8px}',
'.gb-swatch-fill{position:absolute;top:0;left:0;right:0;bottom:0}',
'.gb-swatch input{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer}',
'.gb-combo{position:relative;display:flex;width:100%}.gb-combo .gb-input{padding-right:30px}',
'.gb-combo-btn{position:absolute;right:2px;top:2px;bottom:2px;width:26px;border:none;background:transparent;color:var(--gb-text-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;border-radius:4px}',
'.gb-combo-btn:hover{color:var(--gb-text);background:var(--gb-bg-hover2)}',
'.gb-combo-list{max-height:250px;overflow:auto;min-width:100%}',
'.gb-combo-item{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:5px;cursor:pointer;white-space:nowrap;font-size:12.5px}',
'.gb-combo-item:hover,.gb-combo-item.is-active{background:var(--gb-bg-hover2)}',
'.gb-combo-item.is-selected{color:var(--gb-accent)}',
'.gb-combo-item .gb-sub{margin-left:auto;color:var(--gb-text-dim);font-family:var(--gb-mono);font-size:11px;padding-left:12px}',
'.gb-combo-empty{padding:8px 10px;color:var(--gb-text-dim);font-size:12px}',
// chips
'.gb-chip{display:inline-flex;align-items:center;gap:4px;height:18px;padding:0 6px;border-radius:999px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;background:var(--gb-bg-elev2);color:var(--gb-text-muted);border:1px solid var(--gb-border);line-height:1}',
'.gb-chip .gb-icon{width:11px;height:11px}',
'.gb-chip-live{background:var(--gb-live-soft);color:var(--gb-live);border-color:transparent}',
'.gb-chip-warn{background:var(--gb-warn-soft);color:var(--gb-warn);border-color:transparent}',
'.gb-chip-info{background:var(--gb-accent-soft);color:var(--gb-accent);border-color:transparent}',
'.gb-chip-danger{background:var(--gb-danger-soft);color:var(--gb-danger);border-color:transparent}',
'.gb-chip-ed5{background:var(--gb-accent);color:#fff;border-color:transparent;letter-spacing:.06em}',
'.gb-chip-clickable{cursor:pointer}.gb-chip-clickable:hover{filter:brightness(1.15)}',
// tabs / body / status
'.gb-tabs{display:flex;align-items:stretch;height:48px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev);flex-shrink:0;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;padding:0 4px}',
'.gb-tabs::-webkit-scrollbar{display:none}',
'.gb-tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:4px 2px 0;border:none;background:transparent;color:var(--gb-text-muted);font-weight:500;font-size:10px;letter-spacing:0;cursor:pointer;position:relative;white-space:nowrap;min-width:44px;border-radius:6px 6px 0 0;transition:color .12s,background .12s}',
'.gb-tab .gb-icon{width:17px;height:17px;stroke-width:1.9}',
'.gb-tab:hover{color:var(--gb-text);background:var(--gb-bg-hover)}',
'.gb-tab.is-active{color:var(--gb-accent)}',
'.gb-tab.is-active::after{content:"";position:absolute;left:10px;right:10px;bottom:-1px;height:2px;border-radius:2px 2px 0 0;background:var(--gb-accent)}',
'.gb-tab .gb-tab-label{overflow:hidden;text-overflow:ellipsis;max-width:100%}',
'.gb-root.is-narrow .gb-tab .gb-tab-label{display:none}',
'.gb-root.is-narrow .gb-tabs{height:40px}',
'.gb-tab-dot{position:absolute;top:5px;left:calc(50% + 6px);width:7px;height:7px;border-radius:50%;background:var(--gb-warn);box-shadow:0 0 0 2px var(--gb-bg-elev)}',
'.gb-body{flex:1;min-height:0;position:relative;display:flex;flex-direction:column}',
'.gb-view{flex:1;min-height:0;display:none;flex-direction:column;animation:gb-fade .12s}',
'.gb-view.is-active{display:flex}',
'.gb-scroll{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain}',
'.gb-statusbar{display:flex;align-items:center;gap:10px;height:28px;padding:0 12px;border-top:1px solid var(--gb-border);background:var(--gb-bg-elev);font-size:11px;color:var(--gb-text-dim);flex-shrink:0;white-space:nowrap;overflow:hidden}',
'.gb-statusbar .gb-grow{overflow:hidden;text-overflow:ellipsis}',
'.gb-statusbar .gb-kbd{height:16px}',
// toolbar / search / filters
'.gb-toolbar{padding:10px 12px 8px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev);flex-shrink:0}',
'.gb-search{position:relative;display:flex;align-items:center}',
'.gb-search>.gb-icon{position:absolute;left:10px;color:var(--gb-text-dim);pointer-events:none}',
'.gb-search .gb-input{padding-left:32px;padding-right:62px;height:34px;font-size:13px}',
'.gb-search .gb-search-right{position:absolute;right:6px;display:flex;align-items:center;gap:4px}',
'.gb-filters{display:flex;gap:4px;margin-top:8px;flex-wrap:wrap}',
'.gb-filter{height:24px;padding:0 9px;border-radius:999px;border:1px solid var(--gb-border-strong);background:transparent;color:var(--gb-text-muted);font-size:11.5px;font-weight:500;cursor:pointer;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}',
'.gb-filter:hover{color:var(--gb-text);border-color:var(--gb-text-dim)}',
'.gb-filter.is-active{background:var(--gb-accent-soft);color:var(--gb-accent);border-color:transparent}',
'.gb-filter .gb-count{font-size:10.5px;opacity:.7;font-family:var(--gb-mono)}',
'.gb-filter.is-warn.is-active{background:var(--gb-warn-soft);color:var(--gb-warn)}',
'.gb-progress{height:2px;background:var(--gb-border);overflow:hidden;flex-shrink:0}',
'.gb-progress-bar{height:100%;background:var(--gb-accent);transition:width .15s;width:0}',
'.gb-toolbar-note{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11.5px;color:var(--gb-text-dim)}',
// plugin rows
'.gb-plugin{border-bottom:1px solid var(--gb-border);background:var(--gb-bg)}',
'.gb-plugin-head{display:flex;align-items:center;gap:10px;padding:9px 12px;cursor:pointer;user-select:none;min-height:54px}',
'.gb-plugin-head:hover{background:var(--gb-bg-hover)}',
'.gb-plugin.is-open>.gb-plugin-head{background:var(--gb-bg-elev);position:sticky;top:0;z-index:3;box-shadow:0 1px 0 var(--gb-border)}',
'.gb-plugin-title{flex:1;min-width:0}',
'.gb-plugin-name{display:flex;align-items:center;gap:6px;font-weight:600;font-size:13px;min-width:0}',
'.gb-plugin-name>span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-plugin-name .gb-ver{font-weight:500;color:var(--gb-text-dim);font-family:var(--gb-mono);font-size:10.5px;flex-shrink:0}',
'.gb-plugin-desc{color:var(--gb-text-muted);font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}',
'.gb-plugin-chips{display:flex;gap:4px;flex-shrink:0;flex-wrap:wrap;justify-content:flex-end;max-width:46%}',
'.gb-plugin.is-off .gb-plugin-title{opacity:.55}',
'.gb-plugin-body{background:var(--gb-bg);animation:gb-fade .16s ease}',
'.gb-plugin-meta{display:flex;align-items:center;gap:4px;flex-wrap:wrap;padding:7px 10px;font-size:11.5px;color:var(--gb-text-muted);border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev)}',
'.gb-plugin-meta .gb-sep{width:1px;height:14px;background:var(--gb-border-strong);margin:0 4px}',
'.gb-plugin-help{padding:10px 14px;border-bottom:1px solid var(--gb-border);white-space:pre-wrap;font-family:var(--gb-mono);font-size:11px;line-height:1.5;max-height:340px;overflow:auto;color:var(--gb-text-muted);background:var(--gb-bg-elev);word-break:break-word}',
'.gb-plugin-custom{padding:10px 12px;border-bottom:1px solid var(--gb-border)}',
'.gb-chev{transition:transform .15s;color:var(--gb-text-dim);flex-shrink:0}',
'.gb-plugin.is-open>.gb-plugin-head .gb-chev{transform:rotate(90deg)}',
'.gb-stage-bar{display:flex;align-items:center;gap:8px;padding:8px 12px 8px 10px;background:var(--gb-bg-elev);border-bottom:1px solid var(--gb-border);border-left:3px solid var(--gb-accent);font-size:12px;position:sticky;top:54px;z-index:2;box-shadow:0 4px 12px rgba(0,0,0,.25)}',
'.gb-group-title{display:flex;align-items:center;gap:8px;padding:14px 12px 6px;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gb-text-dim)}',
'.gb-group-title .gb-line{flex:1;height:1px;background:var(--gb-border)}',
// form
'.gb-form{padding-bottom:6px}',
'.gb-section{border-top:1px solid var(--gb-border)}.gb-section:first-child{border-top:none}',
'.gb-section-head{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;color:var(--gb-text-muted);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;user-select:none;min-height:34px}',
'.gb-section-head:hover{color:var(--gb-text);background:var(--gb-bg-hover)}',
'.gb-section.is-open>.gb-section-head .gb-chev{transform:rotate(90deg)}',
'.gb-section-body{display:none}.gb-section.is-open>.gb-section-body{display:block}',
'.gb-section-count{margin-left:auto;font-weight:500;letter-spacing:0;text-transform:none;color:var(--gb-text-dim);font-family:var(--gb-mono);font-size:10.5px}',
'.gb-section-dots{display:flex;gap:3px;align-items:center}',
'.gb-field{position:relative;padding:8px 12px 10px 14px;border-left:2px solid transparent;transition:background .12s}',
'.gb-field:hover{background:var(--gb-bg-hover)}',
'.gb-field.is-dirty{border-left-color:var(--gb-accent)}',
'.gb-field.is-stale{border-left-color:var(--gb-warn)}',
'.gb-field.is-dirty.is-stale{border-left-color:var(--gb-warn)}',
'.gb-field.is-missing .gb-field-label{font-style:italic}',
'.gb-field-head{display:flex;align-items:center;gap:8px;min-height:22px}',
'.gb-field-label{font-weight:500;color:var(--gb-text);display:flex;align-items:center;gap:6px;min-width:0;font-size:12.5px}',
'.gb-field-label>span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-field-key{font-family:var(--gb-mono);font-size:10.5px;color:var(--gb-text-dim);opacity:0;transition:opacity .12s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:40%}',
'.gb-field:hover>.gb-field-head .gb-field-key,.gb-field:focus-within>.gb-field-head .gb-field-key{opacity:1}',
'.gb-field-tools{margin-left:auto;display:flex;gap:1px;opacity:0;transition:opacity .12s;flex-shrink:0}',
'.gb-field:hover>.gb-field-head>.gb-field-tools,.gb-field:focus-within>.gb-field-head>.gb-field-tools{opacity:1}',
'.gb-field-tools .gb-btn.is-pinned{opacity:1;color:var(--gb-warn)}',
'.gb-field.is-pinned>.gb-field-head>.gb-field-tools{opacity:1}',
'.gb-field-desc{color:var(--gb-text-muted);font-size:11.5px;margin:1px 0 6px;line-height:1.4}',
'.gb-field-control{margin-top:4px}',
'.gb-field-bool .gb-field-head{justify-content:space-between}',
'.gb-field-bool .gb-field-desc{margin-bottom:0}',
'.gb-field-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;display:none}',
'.gb-field.is-dirty .gb-field-dot{display:block;background:var(--gb-accent)}',
'.gb-field.is-stale .gb-field-dot{display:block;background:var(--gb-warn)}',
'.gb-field-note{font-size:11px;color:var(--gb-text-dim);margin-top:5px;display:flex;align-items:center;gap:5px}',
'.gb-field-note.is-warn{color:var(--gb-warn)}.gb-field-note.is-error{color:var(--gb-danger)}',
'.gb-field-live{color:var(--gb-live)}',
// list editor / struct
'.gb-list-editor{border:1px solid var(--gb-border-strong);border-radius:var(--gb-radius-sm);overflow:hidden;background:var(--gb-bg-elev)}',
'.gb-list-item{border-bottom:1px solid var(--gb-border)}.gb-list-item:last-of-type{border-bottom:none}',
'.gb-list-item-head{display:flex;align-items:center;gap:6px;padding:5px 6px 5px 8px;cursor:pointer;min-height:34px;user-select:none}',
'.gb-list-item-head:hover{background:var(--gb-bg-hover)}',
'.gb-list-item.is-open>.gb-list-item-head{background:var(--gb-bg-hover);border-bottom:1px solid var(--gb-border)}',
'.gb-list-item-body{display:none;background:var(--gb-bg)}.gb-list-item.is-open>.gb-list-item-body{display:block}',
'.gb-list-item.is-open>.gb-list-item-head .gb-chev{transform:rotate(90deg)}',
'.gb-level-toggle.is-on{background:var(--gb-bg-elev2);color:var(--gb-text);border-color:var(--gb-border-strong)}',
'.gb-list-item-body .gb-field{padding-left:12px}',
'.gb-list-index{font-family:var(--gb-mono);font-size:10.5px;color:var(--gb-text-dim);min-width:18px;text-align:right;flex-shrink:0}',
'.gb-list-summary{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px}',
'.gb-list-summary.is-empty{color:var(--gb-text-dim);font-style:italic}',
'.gb-list-tools{display:flex;gap:1px;opacity:0;flex-shrink:0}',
'.gb-list-item-head:hover .gb-list-tools,.gb-list-item.is-open>.gb-list-item-head .gb-list-tools{opacity:1}',
'.gb-list-scalar{display:flex;align-items:center;gap:6px;padding:4px 6px 4px 8px}',
'.gb-list-scalar>.gb-grow{min-width:0}',
'.gb-list-add{display:flex;align-items:center;gap:6px;padding:7px 10px;color:var(--gb-accent);cursor:pointer;font-weight:500;font-size:12px;background:transparent;border:none;width:100%;text-align:left;border-top:1px solid var(--gb-border)}',
'.gb-list-add:hover{background:var(--gb-accent-soft)}',
'.gb-list-empty{padding:8px 10px;color:var(--gb-text-dim);font-size:12px;font-style:italic}',
'.gb-grip{cursor:grab;color:var(--gb-text-dim);display:flex;flex-shrink:0;padding:2px 0}.gb-grip:hover{color:var(--gb-text)}.gb-grip:active{cursor:grabbing}',
'.is-dragging{opacity:.35}.gb-drop-before{box-shadow:inset 0 2px 0 var(--gb-accent)}.gb-drop-after{box-shadow:inset 0 -2px 0 var(--gb-accent)}',
'.gb-struct{border:1px solid var(--gb-border-strong);border-radius:var(--gb-radius-sm);background:var(--gb-bg-elev);padding:2px 0}',
'.gb-struct .gb-field{padding-left:12px}',
// cards / inspector
'.gb-card{margin:10px 12px;border:1px solid var(--gb-border);border-radius:var(--gb-radius);background:var(--gb-bg-elev);overflow:hidden}',
'.gb-card-head{display:flex;align-items:center;gap:8px;padding:9px 12px;border-bottom:1px solid var(--gb-border);font-weight:600;font-size:12px}',
'.gb-card-head .gb-icon{color:var(--gb-text-muted)}',
'.gb-card-head .gb-right{margin-left:auto;display:flex;gap:4px;align-items:center}',
'.gb-card-body{padding:10px 12px}.gb-card-body.gb-flush{padding:0}',
'.gb-card-body p{margin:0 0 8px}.gb-card-body p:last-child{margin-bottom:0}',
'.gb-gauges{display:grid;grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:8px}',
'.gb-gauge{padding:8px 10px;border-radius:var(--gb-radius-sm);background:var(--gb-bg-elev2);border:1px solid var(--gb-border);min-width:0}',
'.gb-gauge-value{font-family:var(--gb-mono);font-size:16px;font-weight:600;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-gauge-label{color:var(--gb-text-muted);font-size:11px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-actions{display:flex;flex-wrap:wrap;gap:6px}',
'.gb-tree-row{display:flex;align-items:center;gap:6px;padding:3px 10px 3px calc(10px + var(--gb-depth,0) * 14px);font-family:var(--gb-mono);font-size:11.5px;cursor:default;min-width:0}',
'.gb-tree-row:hover{background:var(--gb-bg-hover)}.gb-tree-row.is-expandable{cursor:pointer}',
'.gb-tree-row .gb-chev{width:12px;height:12px}',
'.gb-tree-key{color:var(--gb-text);flex-shrink:0}.gb-tree-key.is-fn{color:var(--gb-accent)}',
'.gb-tree-preview{color:var(--gb-text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}',
'.gb-tree-type{margin-left:auto;font-size:9.5px;color:var(--gb-text-dim);text-transform:uppercase;letter-spacing:.05em;flex-shrink:0}',
'.gb-health-ok{color:var(--gb-live)}.gb-health-error{color:var(--gb-danger)}',
'.gb-error-item{padding:8px 12px;border-bottom:1px solid var(--gb-border);font-size:12px}',
'.gb-error-item:last-child{border-bottom:none}',
'.gb-error-msg{color:var(--gb-danger);font-family:var(--gb-mono);font-size:11.5px;word-break:break-word}',
'.gb-error-stack{color:var(--gb-text-dim);font-family:var(--gb-mono);font-size:10.5px;white-space:pre-wrap;margin-top:4px;max-height:120px;overflow:auto}',
'.gb-code{background:var(--gb-bg);border:1px solid var(--gb-border);border-radius:var(--gb-radius-sm);padding:10px 12px;font-family:var(--gb-mono);font-size:11px;line-height:1.5;white-space:pre;overflow:auto;color:var(--gb-text-muted);margin:0}',
// console
'.gb-log{flex:1;min-height:0;overflow:auto;font-family:var(--gb-mono);font-size:11.5px;line-height:1.5;padding:6px 0;background:var(--gb-bg)}',
'.gb-log-line{display:flex;gap:8px;padding:2px 12px;white-space:pre-wrap;word-break:break-word;border-left:2px solid transparent}',
'.gb-log-line:hover{background:var(--gb-bg-hover)}',
'.gb-log-time{color:var(--gb-text-dim);flex-shrink:0;font-size:10.5px;padding-top:1px}',
'.gb-log-tag{color:var(--gb-accent);flex-shrink:0}',
'.gb-log-text{flex:1;min-width:0}',
'.gb-log-warn{border-left-color:var(--gb-warn);background:var(--gb-warn-soft)}',
'.gb-log-error{border-left-color:var(--gb-danger);background:var(--gb-danger-soft)}',
'.gb-log-debug{color:var(--gb-text-dim)}',
'.gb-log-result .gb-log-text{color:var(--gb-live)}',
'.gb-log-input .gb-log-text{color:var(--gb-text-muted)}.gb-log-input .gb-log-text::before{content:"› ";color:var(--gb-accent)}',
'.gb-console-bar{display:flex;align-items:center;gap:6px;padding:8px 12px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev);flex-wrap:wrap}',
'.gb-console-input-wrap{display:flex;align-items:center;gap:6px;padding:8px 12px;border-top:1px solid var(--gb-border);background:var(--gb-bg-elev);position:relative}',
'.gb-console-input-wrap>.gb-prompt{color:var(--gb-accent);font-family:var(--gb-mono);font-weight:700}',
'.gb-console-input{flex:1;font-family:var(--gb-mono);font-size:12px}',
'.gb-level-toggle{opacity:.4}.gb-level-toggle.is-on{opacity:1}',
// order view
'.gb-order-row{display:flex;align-items:center;gap:8px;padding:7px 12px 7px 8px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg);min-height:42px}',
'.gb-order-row:hover{background:var(--gb-bg-hover)}',
'.gb-order-index{font-family:var(--gb-mono);font-size:11px;color:var(--gb-text-dim);width:24px;text-align:right;flex-shrink:0}',
'.gb-order-main{flex:1;min-width:0}',
'.gb-order-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;font-size:12.5px}',
'.gb-order-row.is-off .gb-order-name{opacity:.5}',
'.gb-order-warns{display:flex;flex-wrap:wrap;gap:4px;margin-top:3px}',
'.gb-order-tools{display:flex;gap:1px;opacity:0;flex-shrink:0}.gb-order-row:hover .gb-order-tools{opacity:1}',
// diff / profiles
'.gb-diff-row{display:flex;align-items:center;gap:8px;padding:6px 12px;border-bottom:1px solid var(--gb-border);font-size:12px;min-height:34px}',
'.gb-diff-row:last-child{border-bottom:none}',
'.gb-diff-main{flex:1;min-width:0}',
'.gb-diff-key{display:flex;align-items:center;gap:6px;min-width:0}',
'.gb-diff-key .gb-plugin-ref{color:var(--gb-text-muted);font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-diff-key .gb-k{font-family:var(--gb-mono);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-diff-vals{display:flex;align-items:center;gap:6px;min-width:0;font-size:11.5px;margin-top:2px}',
'.gb-diff-vals>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--gb-mono);max-width:45%}',
'.gb-diff-from{color:var(--gb-danger);text-decoration:line-through;opacity:.8}.gb-diff-to{color:var(--gb-live)}.gb-diff-arrow{color:var(--gb-text-dim)}',
'.gb-profile{display:flex;align-items:center;gap:10px;padding:10px 12px;border-bottom:1px solid var(--gb-border)}',
'.gb-profile:last-child{border-bottom:none}.gb-profile:hover{background:var(--gb-bg-hover)}',
'.gb-profile-main{flex:1;min-width:0}.gb-profile-name{font-weight:600;display:flex;align-items:center;gap:6px}',
'.gb-profile-desc{color:var(--gb-text-muted);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
'.gb-preset{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--gb-border-strong);border-radius:var(--gb-radius-sm);background:var(--gb-bg-elev2);cursor:pointer;text-align:left;width:100%}',
'.gb-preset:hover{border-color:var(--gb-accent);background:var(--gb-accent-soft)}',
'.gb-preset-name{font-weight:600}.gb-preset-desc{color:var(--gb-text-muted);font-size:11.5px}',
// empty / misc
'.gb-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:36px 24px;color:var(--gb-text-muted);gap:8px}',
'.gb-empty .gb-icon{width:30px;height:30px;color:var(--gb-text-dim);stroke-width:1.5}',
'.gb-empty-title{font-weight:600;color:var(--gb-text);font-size:13px}',
'.gb-empty-text{font-size:12px;max-width:300px;line-height:1.5}',
'.gb-callout{display:flex;gap:10px;padding:10px 12px;margin:10px 12px;border-radius:var(--gb-radius-sm);background:var(--gb-accent-soft);color:var(--gb-text);font-size:12px;line-height:1.45;border:1px solid transparent}',
'.gb-callout .gb-icon{color:var(--gb-accent);flex-shrink:0;margin-top:1px}',
'.gb-callout.is-warn{background:var(--gb-warn-soft)}.gb-callout.is-warn .gb-icon{color:var(--gb-warn)}',
'.gb-callout.is-danger{background:var(--gb-danger-soft)}.gb-callout.is-danger .gb-icon{color:var(--gb-danger)}',
'.gb-callout-body{flex:1;min-width:0}.gb-callout-title{font-weight:600;margin-bottom:2px}',
'.gb-callout .gb-actions{margin-top:8px}',
'.gb-inline-form{display:flex;gap:6px;align-items:center;padding:10px 12px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev)}',
'.gb-inline-form .gb-input{flex:1}',
'.gb-field-list>.gb-field{border-bottom:1px solid var(--gb-border)}',
// toast / modal / popover / tooltip
'.gb-toasts{position:absolute;left:10px;right:10px;bottom:34px;display:flex;flex-direction:column;gap:6px;z-index:20;pointer-events:none}',
'.gb-toast{pointer-events:auto;display:flex;align-items:flex-start;gap:8px;padding:9px 10px;border-radius:var(--gb-radius);background:var(--gb-bg-elev2);border:1px solid var(--gb-border-strong);box-shadow:0 8px 24px rgba(0,0,0,.35);animation:gb-slide-up .18s cubic-bezier(.2,.8,.2,1);font-size:12px}',
'.gb-toast>.gb-icon{margin-top:1px}',
'.gb-toast-info>.gb-icon{color:var(--gb-accent)}.gb-toast-success>.gb-icon{color:var(--gb-live)}.gb-toast-warn>.gb-icon{color:var(--gb-warn)}.gb-toast-error>.gb-icon{color:var(--gb-danger)}',
'.gb-toast-body{flex:1;min-width:0}.gb-toast-title{font-weight:600}.gb-toast-msg{color:var(--gb-text-muted);word-break:break-word}',
'.gb-toast-actions{display:flex;gap:6px;margin-top:6px}',
'.gb-toast .gb-toast-close{margin:-4px -4px 0 0}',
'.gb-modal-backdrop{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:30;display:flex;align-items:center;justify-content:center;padding:16px;animation:gb-fade .12s}',
'.gb-modal{width:100%;max-width:440px;max-height:100%;overflow:auto;background:var(--gb-bg-elev);border:1px solid var(--gb-border-strong);border-radius:var(--gb-radius);box-shadow:0 20px 60px rgba(0,0,0,.5);animation:gb-pop .16s cubic-bezier(.2,.8,.2,1)}',
'.gb-modal-title{font-weight:600;font-size:14px;padding:14px 16px 4px;display:flex;align-items:center;gap:8px}',
'.gb-modal-body{padding:6px 16px 12px;color:var(--gb-text-muted);font-size:12.5px;line-height:1.5}',
'.gb-modal-body .gb-input,.gb-modal-body .gb-textarea{margin-top:8px}',
'.gb-modal-actions{display:flex;justify-content:flex-end;gap:8px;padding:8px 16px 14px}',
'.gb-popover{position:fixed;z-index:10060;min-width:160px;max-width:380px;background:var(--gb-bg-elev2);border:1px solid var(--gb-border-strong);border-radius:var(--gb-radius-sm);box-shadow:0 10px 30px rgba(0,0,0,.45);padding:4px;animation:gb-pop .12s;font:13px/1.45 var(--gb-font);color:var(--gb-text)}',
'.gb-menu-item{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:5px;cursor:pointer;white-space:nowrap;font-size:12.5px;user-select:none}',
'.gb-menu-item:hover,.gb-menu-item.is-active{background:var(--gb-bg-hover2)}',
'.gb-menu-item.is-danger{color:var(--gb-danger)}.gb-menu-item.is-disabled{opacity:.45;pointer-events:none}',
'.gb-menu-item .gb-hint{margin-left:auto;color:var(--gb-text-dim);font-size:11px;padding-left:16px}',
'.gb-menu-item .gb-icon{color:var(--gb-text-muted)}',
'.gb-menu-sep{height:1px;background:var(--gb-border);margin:4px 0}',
'.gb-menu-title{padding:6px 10px 2px;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--gb-text-dim)}',
'.gb-tooltip{position:fixed;z-index:10070;max-width:300px;padding:6px 9px;border-radius:6px;background:#0b0e13;color:#e8ecf3;font:11.5px/1.4 var(--gb-font);box-shadow:0 6px 20px rgba(0,0,0,.5);pointer-events:none;opacity:0;transition:opacity .1s;border:1px solid rgba(255,255,255,.12);white-space:pre-wrap}',
'.gb-tooltip.is-visible{opacity:1}',
'.gb-tooltip .gb-kbd{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15);color:#c9d1dc;margin-left:6px}',
// player
'.gb-player-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10040;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px;animation:gb-fade .15s;font:13px/1.45 var(--gb-font);color:var(--gb-text);-webkit-font-smoothing:antialiased;text-align:left}',
'.gb-player{width:100%;max-width:600px;max-height:88vh;display:flex;flex-direction:column;background:var(--gb-bg);border:1px solid var(--gb-border-strong);border-radius:calc(var(--gb-radius) + 4px);box-shadow:0 30px 80px rgba(0,0,0,.6);animation:gb-pop .18s cubic-bezier(.2,.8,.2,1);overflow:hidden}',
'.gb-player-head{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid var(--gb-border);background:var(--gb-bg-elev)}',
'.gb-player-title{font-weight:700;font-size:16px;flex:1}',
'.gb-player-body{flex:1;min-height:0;overflow:auto}',
'.gb-player-foot{display:flex;align-items:center;gap:8px;padding:10px 16px;border-top:1px solid var(--gb-border);background:var(--gb-bg-elev)}',
'.gb-player .gb-field{padding:10px 16px 12px 18px}',
'.gb-player .gb-field-label{font-size:13.5px}',
'.gb-player .gb-field-desc{font-size:12px}',
'.gb-player .gb-group-title{padding:14px 16px 4px}',
'.gb-player-presets{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;padding:8px 16px 12px}',
'.gb-player .gb-tabs{height:44px}',
'@media (max-width:600px){.gb-root{max-width:100vw;width:100vw!important}.gb-player{max-height:100vh;border-radius:0}}'
].join('\n');

var UI = GB.UI = {
    styleEl: null,
    tooltipEl: null,
    injectCss: function() {
        if (this.styleEl) return;
        this.styleEl = h('style', { id: 'ed5-gearbox-css', text: CSS_TEXT });
        document.head.appendChild(this.styleEl);
    },
    themeVars: function() {
        var dark = P.themePreset !== 'light';
        var accent = P.themeAccent;
        var v = dark ? {
            '--gb-bg': P.themeBg || '#0f1218', '--gb-bg-elev': '#151a22', '--gb-bg-elev2': '#1c222c',
            '--gb-bg-hover': 'rgba(255,255,255,0.04)', '--gb-bg-hover2': 'rgba(255,255,255,0.08)',
            '--gb-border': 'rgba(255,255,255,0.07)', '--gb-border-strong': 'rgba(255,255,255,0.14)',
            '--gb-text': P.themeText || '#e8ecf3', '--gb-text-muted': '#9aa4b5', '--gb-text-dim': '#6b7585',
            '--gb-live': '#34d399', '--gb-warn': '#f5b942', '--gb-danger': '#ff6b6b',
            '--gb-live-soft': 'rgba(52,211,153,0.14)', '--gb-warn-soft': 'rgba(245,185,66,0.14)', '--gb-danger-soft': 'rgba(255,107,107,0.14)'
        } : {
            '--gb-bg': P.themeBg || '#f6f7f9', '--gb-bg-elev': '#ffffff', '--gb-bg-elev2': '#eef1f5',
            '--gb-bg-hover': 'rgba(0,0,0,0.035)', '--gb-bg-hover2': 'rgba(0,0,0,0.07)',
            '--gb-border': 'rgba(0,0,0,0.08)', '--gb-border-strong': 'rgba(0,0,0,0.16)',
            '--gb-text': P.themeText || '#1b202a', '--gb-text-muted': '#5b6472', '--gb-text-dim': '#8a93a2',
            '--gb-live': '#059669', '--gb-warn': '#b7791f', '--gb-danger': '#dc2626',
            '--gb-live-soft': 'rgba(5,150,105,0.12)', '--gb-warn-soft': 'rgba(183,121,31,0.14)', '--gb-danger-soft': 'rgba(220,38,38,0.12)'
        };
        v['--gb-accent'] = accent;
        v['--gb-accent-2'] = shiftHue(accent, 40);
        v['--gb-accent-soft'] = rgba(accent, dark ? 0.16 : 0.13);
        v['--gb-accent-soft2'] = rgba(accent, dark ? 0.26 : 0.22);
        v['--gb-accent-glow'] = rgba(accent, 0.45);
        v['--gb-radius'] = P.themeRadius + 'px';
        v['--gb-radius-sm'] = Math.max(3, Math.round(P.themeRadius * 0.6)) + 'px';
        v['--gb-font'] = P.themeFont || 'Inter, "Segoe UI", system-ui, -apple-system, Roboto, "Helvetica Neue", Arial, sans-serif';
        v['--gb-mono'] = '"JetBrains Mono", "Cascadia Code", "Fira Code", Consolas, "Roboto Mono", monospace';
        return v;
    },
    applyTheme: function(root) {
        if (!root) return;
        var vars = this.themeVars();
        each(vars, function(v, k) { root.style.setProperty(k, v); });
        root.style.setProperty('--gb-panel-opacity', String(P.themeOpacity));
        if (root.classList.contains('gb-root')) {
            var bg = vars['--gb-bg'];
            root.style.background = isHexColor(bg) ? rgba(bg, P.themeOpacity) : bg;
            if (P.themeOpacity < 1) root.style.backdropFilter = 'blur(10px)'; else root.style.backdropFilter = '';
        }
    },

    // ---- tooltip -----------------------------------------------------------
    installTooltips: function(root) {
        var self = this;
        if (!this.tooltipEl) {
            this.tooltipEl = h('div', { class: 'gb-tooltip gb-ui', role: 'tooltip' });
            document.body.appendChild(this.tooltipEl);
        }
        var timer = null, current = null;
        function hide() { clearTimeout(timer); timer = null; current = null; self.tooltipEl.classList.remove('is-visible'); }
        function show(el) {
            var tip = el.getAttribute('data-tip');
            if (!tip) return;
            var t = self.tooltipEl;
            clear(t);
            var parts = tip.split('|');
            t.appendChild(document.createTextNode(parts[0]));
            if (parts[1]) t.appendChild(h('span', { class: 'gb-kbd', text: parts[1] }));
            self.applyTheme(t);
            t.style.left = '0px'; t.style.top = '0px';
            t.classList.add('is-visible');
            var r = el.getBoundingClientRect(), tr = t.getBoundingClientRect();
            var x = r.left + r.width / 2 - tr.width / 2, y = r.top - tr.height - 8;
            if (y < 6) y = r.bottom + 8;
            x = clamp(x, 6, window.innerWidth - tr.width - 6);
            t.style.left = Math.round(x) + 'px'; t.style.top = Math.round(y) + 'px';
        }
        root.addEventListener('mouseover', function(ev) {
            var el = closest(ev.target, '[data-tip]');
            if (!el || el === current) return;
            hide(); current = el;
            timer = setTimeout(function() { if (current === el && document.body.contains(el)) show(el); }, 380);
        });
        root.addEventListener('mouseout', function(ev) {
            var el = closest(ev.target, '[data-tip]');
            if (el && el === current && !el.contains(ev.relatedTarget)) hide();
        });
        root.addEventListener('mousedown', hide, true);
        root.addEventListener('scroll', hide, true);
        root.addEventListener('keydown', hide, true);
        this.hideTooltip = hide;
    },
    hideTooltip: function() {},

    // ---- buttons -----------------------------------------------------------
    button: function(opts) {
        opts = opts || {};
        var cls = 'gb-btn' + (opts.primary ? ' gb-btn-primary' : '') + (opts.ghost ? ' gb-btn-ghost' : '') + (opts.danger ? ' gb-btn-danger' : '') +
                  (opts.icon && !opts.label ? ' gb-btn-icon' : '') + (opts.size === 'sm' ? ' gb-btn-sm' : '') + (opts.size === 'xs' ? ' gb-btn-xs' : '') + (opts.cls ? ' ' + opts.cls : '');
        var b = h('button', { class: cls, type: 'button', 'data-tip': opts.tip || null, disabled: opts.disabled || null, 'aria-label': opts.tip && !opts.label ? opts.tip.split('|')[0] : null });
        if (opts.icon) b.appendChild(icon(opts.icon));
        if (opts.label) b.appendChild(h('span', { text: opts.label }));
        if (opts.onClick) b.addEventListener('click', function(ev) { ev.stopPropagation(); opts.onClick(ev, b); });
        return b;
    },
    switchEl: function(on, onChange, opts) {
        opts = opts || {};
        var b = h('button', { class: 'gb-switch' + (on ? ' is-on' : ''), type: 'button', role: 'switch', 'aria-checked': on ? 'true' : 'false', 'data-tip': opts.tip || null, disabled: opts.disabled || null });
        b._gbOn = !!on;
        b.set = function(v) { b._gbOn = !!v; b.classList.toggle('is-on', b._gbOn); b.setAttribute('aria-checked', b._gbOn ? 'true' : 'false'); };
        b.addEventListener('click', function(ev) {
            ev.stopPropagation();
            if (b.disabled) return;
            var next = !b._gbOn;
            if (onChange) { var r = onChange(next, b); if (r === false) return; }
            b.set(next);
        });
        return b;
    },
    chip: function(text, kind, opts) {
        opts = opts || {};
        var c = h('span', { class: 'gb-chip' + (kind ? ' gb-chip-' + kind : '') + (opts.onClick ? ' gb-chip-clickable' : ''), 'data-tip': opts.tip || null });
        if (opts.icon) c.appendChild(icon(opts.icon));
        c.appendChild(h('span', { text: text }));
        if (opts.onClick) c.addEventListener('click', function(ev) { ev.stopPropagation(); opts.onClick(ev); });
        return c;
    },
    empty: function(iconName, title, text, action) {
        return h('div', { class: 'gb-empty' }, [icon(iconName || 'box'), h('div', { class: 'gb-empty-title', text: title }), text ? h('div', { class: 'gb-empty-text', text: text }) : null, action || null]);
    },
    callout: function(kind, title, text, actions) {
        var iconName = kind === 'warn' ? 'alert' : kind === 'danger' ? 'alert' : 'info';
        var body = h('div', { class: 'gb-callout-body' }, [title ? h('div', { class: 'gb-callout-title', text: title }) : null, text ? h('div', { text: text }) : null]);
        if (actions && actions.length) body.appendChild(h('div', { class: 'gb-actions' }, actions));
        return h('div', { class: 'gb-callout' + (kind && kind !== 'info' ? ' is-' + kind : '') }, [icon(iconName), body]);
    },
    highlight: function(text, query) {
        text = String(text === undefined || text === null ? '' : text);
        if (!query) return document.createTextNode(text);
        var frag = document.createDocumentFragment();
        var re = new RegExp(escapeRe(query), 'ig');
        var last = 0, m;
        while ((m = re.exec(text))) {
            if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
            frag.appendChild(h('mark', { class: 'gb-hl', text: m[0] }));
            last = m.index + m[0].length;
            if (!m[0].length) re.lastIndex++;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        return frag;
    },

    // ---- popover (menus, combos, completion) --------------------------------
    _popovers: [],
    popover: function(anchor, build, opts) {
        opts = opts || {};
        var self = this;
        var pop = h('div', { class: 'gb-popover gb-ui' + (opts.cls ? ' ' + opts.cls : ''), role: opts.role || 'menu' });
        this.applyTheme(pop);
        var host = opts.host || document.body;
        host.appendChild(pop);
        var api = {
            el: pop,
            close: function() {
                if (!pop.parentNode) return;
                pop.parentNode.removeChild(pop);
                document.removeEventListener('mousedown', onDown, true);
                document.removeEventListener('keydown', onKey, true);
                window.removeEventListener('resize', api.position);
                var i = self._popovers.indexOf(api); if (i >= 0) self._popovers.splice(i, 1);
                if (opts.onClose) opts.onClose();
            },
            position: function() {
                var r = anchor.getBoundingClientRect();
                pop.style.maxHeight = '';
                var pr = pop.getBoundingClientRect();
                var width = opts.matchWidth ? r.width : pr.width;
                if (opts.matchWidth) pop.style.width = r.width + 'px';
                var x = opts.align === 'right' ? r.right - width : r.left;
                x = clamp(x, 6, window.innerWidth - width - 6);
                var below = window.innerHeight - r.bottom - 8, above = r.top - 8;
                var y, maxH;
                if (pr.height <= below || below >= above) { y = r.bottom + 4; maxH = below; }
                else { y = Math.max(6, r.top - 4 - Math.min(pr.height, above)); maxH = above; }
                pop.style.left = Math.round(x) + 'px';
                pop.style.top = Math.round(y) + 'px';
                pop.style.maxHeight = Math.max(80, Math.floor(maxH)) + 'px';
                pop.style.overflow = 'auto';
            }
        };
        function onDown(ev) {
            if (pop.contains(ev.target) || anchor.contains(ev.target)) return;
            api.close();
        }
        function onKey(ev) {
            if (ev.key === 'Escape') { ev.stopPropagation(); ev.preventDefault(); api.close(); }
        }
        build(pop, api);
        api.position();
        this._popovers.push(api);
        setTimeout(function() {
            document.addEventListener('mousedown', onDown, true);
            document.addEventListener('keydown', onKey, true);
            window.addEventListener('resize', api.position);
        }, 0);
        return api;
    },
    closePopovers: function() { this._popovers.slice().forEach(function(p) { p.close(); }); },
    menu: function(anchor, items, opts) {
        opts = opts || {};
        return this.popover(anchor, function(pop, api) {
            items.forEach(function(it) {
                if (!it) return;
                if (it.sep) { pop.appendChild(h('div', { class: 'gb-menu-sep' })); return; }
                if (it.title) { pop.appendChild(h('div', { class: 'gb-menu-title', text: it.title })); return; }
                var row = h('div', { class: 'gb-menu-item' + (it.danger ? ' is-danger' : '') + (it.disabled ? ' is-disabled' : ''), role: 'menuitem', 'data-tip': it.tip || null });
                if (it.icon) row.appendChild(icon(it.icon));
                row.appendChild(h('span', { text: it.label }));
                if (it.hint) row.appendChild(h('span', { class: 'gb-hint', text: it.hint }));
                row.addEventListener('click', function() { api.close(); if (it.onClick) it.onClick(); });
                pop.appendChild(row);
            });
        }, { align: opts.align || 'right' });
    },

    // Searchable dropdown / combobox. options: [{value, label, sub}]
    combo: function(opts) {
        var self = this;
        var input = h('input', { class: 'gb-input' + (opts.mono ? ' gb-mono' : ''), type: 'text', placeholder: opts.placeholder || '', spellcheck: 'false', autocomplete: 'off' });
        var btn = h('button', { class: 'gb-combo-btn', type: 'button', tabindex: '-1', 'aria-label': 'Open list' }, [icon('chevronDown')]);
        var wrap = h('div', { class: 'gb-combo' }, [input, btn]);
        var state = { value: opts.value === undefined ? '' : String(opts.value), options: opts.options || [], pop: null, active: -1 };
        function labelFor(v) {
            for (var i = 0; i < state.options.length; i++) if (String(state.options[i].value) === String(v)) return state.options[i].label;
            return v;
        }
        function render() { input.value = labelFor(state.value); }
        function commit(v) {
            v = String(v);
            if (v === state.value) { render(); return; }
            state.value = v; render();
            if (opts.onChange) opts.onChange(v);
        }
        function filtered(q) {
            q = (q || '').toLowerCase();
            if (!q || q === String(labelFor(state.value)).toLowerCase()) return state.options;
            return state.options.filter(function(o) { return String(o.label).toLowerCase().indexOf(q) >= 0 || String(o.value).toLowerCase().indexOf(q) >= 0 || (o.sub && String(o.sub).toLowerCase().indexOf(q) >= 0); });
        }
        var listEl = null;
        function renderList(q) {
            if (!listEl) return;
            clear(listEl);
            var items = filtered(q);
            state.items = items;
            if (!items.length) { listEl.appendChild(h('div', { class: 'gb-combo-empty', text: opts.allowCustom ? 'No matches. Press Enter to use "' + q + '".' : 'No matches' })); return; }
            items.slice(0, 400).forEach(function(o, i) {
                var row = h('div', { class: 'gb-combo-item' + (String(o.value) === state.value ? ' is-selected' : '') + (i === state.active ? ' is-active' : ''), role: 'option' }, [
                    h('span', { class: 'gb-ellipsis', text: o.label }), o.sub ? h('span', { class: 'gb-sub', text: o.sub }) : null]);
                row.addEventListener('mousedown', function(ev) { ev.preventDefault(); });
                row.addEventListener('click', function() { commit(o.value); close(); input.blur(); });
                listEl.appendChild(row);
            });
            if (items.length > 400) listEl.appendChild(h('div', { class: 'gb-combo-empty', text: (items.length - 400) + ' more, keep typing…' }));
        }
        function open(q) {
            if (state.pop) { renderList(q); return; }
            state.active = -1;
            state.pop = self.popover(wrap, function(pop) {
                listEl = h('div', { class: 'gb-combo-list', role: 'listbox' });
                pop.appendChild(listEl);
                renderList(q);
            }, { matchWidth: true, role: 'listbox', onClose: function() { state.pop = null; listEl = null; } });
            var sel = listEl && listEl.querySelector('.is-selected');
            if (sel) sel.scrollIntoView({ block: 'nearest' });
        }
        function close() { if (state.pop) state.pop.close(); }
        function moveActive(d) {
            if (!state.pop) { open(''); return; }
            var n = (state.items || []).length;
            if (!n) return;
            state.active = (state.active + d + n) % n;
            renderList(input.value);
            var act = listEl.querySelector('.is-active');
            if (act) act.scrollIntoView({ block: 'nearest' });
        }
        input.addEventListener('focus', function() { input.select(); });
        input.addEventListener('input', function() { open(input.value); state.active = -1; });
        input.addEventListener('keydown', function(ev) {
            if (ev.key === 'ArrowDown') { ev.preventDefault(); moveActive(1); }
            else if (ev.key === 'ArrowUp') { ev.preventDefault(); moveActive(-1); }
            else if (ev.key === 'Enter') {
                ev.preventDefault();
                var items = state.items || filtered(input.value);
                if (state.pop && state.active >= 0 && items[state.active]) commit(items[state.active].value);
                else if (items.length === 1 && input.value) commit(items[0].value);
                else if (opts.allowCustom) commit(input.value);
                else if (items.length && input.value) commit(items[0].value);
                else render();
                close(); input.blur();
            } else if (ev.key === 'Escape') { render(); close(); input.blur(); ev.stopPropagation(); }
            else if (ev.key === 'Tab') { close(); if (opts.allowCustom && input.value !== labelFor(state.value)) commit(input.value); else render(); }
        });
        input.addEventListener('blur', function() {
            setTimeout(function() {
                if (state.pop) return;
                if (opts.allowCustom && input.value !== labelFor(state.value)) commit(input.value); else render();
            }, 120);
        });
        btn.addEventListener('mousedown', function(ev) { ev.preventDefault(); });
        btn.addEventListener('click', function() { if (state.pop) close(); else { input.focus(); open(''); } });
        render();
        wrap.setValue = function(v) { state.value = String(v === undefined ? '' : v); render(); };
        wrap.setOptions = function(o) { state.options = o || []; render(); };
        wrap.input = input;
        return wrap;
    },

    // ---- toasts / modals -------------------------------------------------------
    toastHost: null,
    toast: function(opts) {
        if (typeof opts === 'string') opts = { message: opts };
        var host = this.toastHost;
        if (!host) { console.log('[ED5_GearBox]', opts.title || '', opts.message || ''); return null; }
        var kind = opts.type || 'info';
        var iconName = kind === 'success' ? 'check' : kind === 'warn' ? 'alert' : kind === 'error' ? 'alert' : 'info';
        var body = h('div', { class: 'gb-toast-body' }, [opts.title ? h('div', { class: 'gb-toast-title', text: opts.title }) : null, opts.message ? h('div', { class: 'gb-toast-msg', text: opts.message }) : null]);
        var el = h('div', { class: 'gb-toast gb-toast-' + kind, role: 'status' }, [icon(iconName), body]);
        var timer = null;
        function dismiss() { clearTimeout(timer); if (el.parentNode) el.parentNode.removeChild(el); }
        if (opts.actions && opts.actions.length) {
            body.appendChild(h('div', { class: 'gb-toast-actions' }, opts.actions.map(function(a) {
                return UI.button({ label: a.label, size: 'sm', primary: !!a.primary, onClick: function() { if (a.onClick) a.onClick(); if (!a.keep) dismiss(); } });
            })));
        }
        el.appendChild(this.button({ icon: 'x', ghost: true, size: 'sm', cls: 'gb-toast-close', onClick: dismiss }));
        host.appendChild(el);
        while (host.children.length > 4) host.removeChild(host.firstChild);
        var timeout = opts.timeout !== undefined ? opts.timeout : (opts.actions ? 9000 : 3800);
        if (timeout > 0) {
            timer = setTimeout(dismiss, timeout);
            el.addEventListener('mouseenter', function() { clearTimeout(timer); });
            el.addEventListener('mouseleave', function() { timer = setTimeout(dismiss, 1800); });
        }
        return { el: el, dismiss: dismiss };
    },
    modalHost: null,
    modal: function(opts) {
        var self = this;
        var host = this.modalHost || document.body;
        var actionsEl = h('div', { class: 'gb-modal-actions' });
        var bodyEl = h('div', { class: 'gb-modal-body' });
        var box = h('div', { class: 'gb-modal', role: 'dialog', 'aria-modal': 'true' }, [
            opts.title ? h('div', { class: 'gb-modal-title' }, [opts.icon ? icon(opts.icon) : null, h('span', { text: opts.title })]) : null, bodyEl, actionsEl]);
        var backdrop = h('div', { class: 'gb-modal-backdrop' }, [box]);
        if (host === document.body) { backdrop.classList.add('gb-ui'); backdrop.style.position = 'fixed'; backdrop.style.zIndex = '10065'; self.applyTheme(backdrop); }
        var api = {
            el: box,
            close: function(result) {
                if (!backdrop.parentNode) return;
                backdrop.parentNode.removeChild(backdrop);
                document.removeEventListener('keydown', onKey, true);
                if (opts.onClose) opts.onClose(result);
                if (prevFocus && prevFocus.focus) { try { prevFocus.focus(); } catch (e) { /* ignore */ } }
            }
        };
        if (typeof opts.body === 'string') bodyEl.textContent = opts.body;
        else if (typeof opts.body === 'function') opts.body(bodyEl, api);
        else if (opts.body) bodyEl.appendChild(opts.body);
        (opts.actions || [{ label: 'Close' }]).forEach(function(a) {
            var b = self.button({ label: a.label, primary: !!a.primary, danger: !!a.danger, onClick: function() { var r = a.onClick ? a.onClick(api) : undefined; if (r !== false && !a.keep) api.close(a.value !== undefined ? a.value : a.label); } });
            if (a.primary) b.setAttribute('data-primary', '1');
            actionsEl.appendChild(b);
        });
        function onKey(ev) {
            if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); api.close(null); }
            else if (ev.key === 'Enter' && !isTextInput(document.activeElement) || (ev.key === 'Enter' && document.activeElement && document.activeElement.tagName === 'INPUT')) {
                var prim = actionsEl.querySelector('[data-primary]');
                if (prim) { ev.preventDefault(); ev.stopPropagation(); prim.click(); }
            }
        }
        backdrop.addEventListener('mousedown', function(ev) { if (ev.target === backdrop && opts.dismissable !== false) api.close(null); });
        var prevFocus = document.activeElement;
        host.appendChild(backdrop);
        document.addEventListener('keydown', onKey, true);
        setTimeout(function() {
            var f = opts.focus ? box.querySelector(opts.focus) : (box.querySelector('input,textarea') || actionsEl.querySelector('[data-primary]') || actionsEl.lastChild);
            if (f && f.focus) f.focus();
        }, 0);
        return api;
    },
    confirm: function(opts) {
        var self = this;
        return new Promise(function(resolve) {
            self.modal({
                title: opts.title, icon: opts.icon || (opts.danger ? 'alert' : null), body: opts.message,
                onClose: function(r) { resolve(r === true); },
                actions: [{ label: opts.cancelLabel || 'Cancel', value: false }, { label: opts.okLabel || 'OK', primary: true, danger: !!opts.danger, value: true }]
            });
        });
    },
    prompt: function(opts) {
        var self = this;
        return new Promise(function(resolve) {
            var input;
            self.modal({
                title: opts.title, body: function(el) {
                    if (opts.message) el.appendChild(h('div', { text: opts.message }));
                    input = opts.multiline ? h('textarea', { class: 'gb-textarea', placeholder: opts.placeholder || '', rows: '8' }) : h('input', { class: 'gb-input', type: 'text', placeholder: opts.placeholder || '', spellcheck: 'false' });
                    input.value = opts.value || '';
                    el.appendChild(input);
                },
                onClose: function(r) { resolve(r === true ? input.value : null); },
                actions: [{ label: opts.cancelLabel || 'Cancel', value: false }, { label: opts.okLabel || 'OK', primary: true, value: true }]
            });
        });
    },

    // ---- drag & drop reorder for lists ------------------------------------
    makeSortable: function(listEl, itemSelector, handleSelector, onMove) {
        var dragging = null, over = null, after = false;
        listEl.addEventListener('mousedown', function(ev) {
            var handle = closest(ev.target, handleSelector);
            var item = handle && closest(handle, itemSelector);
            if (item && item.parentNode === listEl) item.setAttribute('draggable', 'true');
        });
        listEl.addEventListener('dragstart', function(ev) {
            var item = closest(ev.target, itemSelector);
            if (!item || item.getAttribute('draggable') !== 'true') { ev.preventDefault(); return; }
            dragging = item;
            item.classList.add('is-dragging');
            try { ev.dataTransfer.effectAllowed = 'move'; ev.dataTransfer.setData('text/plain', 'gb'); } catch (e) { /* ignore */ }
        });
        listEl.addEventListener('dragover', function(ev) {
            if (!dragging) return;
            var item = closest(ev.target, itemSelector);
            if (!item || item === dragging || item.parentNode !== listEl) return;
            ev.preventDefault();
            var r = item.getBoundingClientRect();
            var nextAfter = ev.clientY > r.top + r.height / 2;
            if (over && (over !== item || after !== nextAfter)) over.classList.remove('gb-drop-before', 'gb-drop-after');
            over = item; after = nextAfter;
            item.classList.add(after ? 'gb-drop-after' : 'gb-drop-before');
        });
        listEl.addEventListener('dragleave', function(ev) {
            var item = closest(ev.target, itemSelector);
            if (item && item === over && !item.contains(ev.relatedTarget)) { item.classList.remove('gb-drop-before', 'gb-drop-after'); }
        });
        listEl.addEventListener('drop', function(ev) {
            if (!dragging || !over) return;
            ev.preventDefault();
            var items = Array.prototype.slice.call(listEl.querySelectorAll(':scope > ' + itemSelector));
            var from = items.indexOf(dragging), to = items.indexOf(over);
            if (after) to++;
            if (from < to) to--;
            over.classList.remove('gb-drop-before', 'gb-drop-after');
            if (from !== to && from >= 0 && to >= 0) onMove(from, to);
        });
        listEl.addEventListener('dragend', function() {
            if (dragging) { dragging.classList.remove('is-dragging'); dragging.removeAttribute('draggable'); }
            if (over) over.classList.remove('gb-drop-before', 'gb-drop-after');
            dragging = null; over = null;
        });
    }
};

//=============================================================================
// 19. Form renderer: schema + values -> controls -> values
//=============================================================================

var Form = GB.Form = {
    _dbCache: {},
    _fileCache: {},
    invalidateCaches: function() { this._dbCache = {}; this._fileCache = {}; },

    dbOptions: function(kind) {
        if (this._dbCache[kind]) return this._dbCache[kind];
        var out = [{ value: '0', label: 'None', sub: '#0' }];
        var g = (typeof window !== 'undefined') ? window : {};
        function fromObjects(arr) {
            if (!Array.isArray(arr)) return;
            arr.forEach(function(d, i) { if (!d || i === 0) return; var id = d.id !== undefined ? d.id : i; out.push({ value: String(id), label: d.name || '(unnamed)', sub: '#' + id }); });
        }
        function fromNames(arr) {
            if (!Array.isArray(arr)) return;
            arr.forEach(function(n, i) { if (i === 0) return; out.push({ value: String(i), label: n || '(unnamed)', sub: '#' + i }); });
        }
        switch (kind) {
            case 'switch': fromNames(g.$dataSystem && g.$dataSystem.switches); break;
            case 'variable': fromNames(g.$dataSystem && g.$dataSystem.variables); break;
            case 'actor': fromObjects(g.$dataActors); break;
            case 'class': fromObjects(g.$dataClasses); break;
            case 'skill': fromObjects(g.$dataSkills); break;
            case 'item': fromObjects(g.$dataItems); break;
            case 'weapon': fromObjects(g.$dataWeapons); break;
            case 'armor': fromObjects(g.$dataArmors); break;
            case 'enemy': fromObjects(g.$dataEnemies); break;
            case 'troop': fromObjects(g.$dataTroops); break;
            case 'state': fromObjects(g.$dataStates); break;
            case 'animation': fromObjects(g.$dataAnimations); break;
            case 'tileset': fromObjects(g.$dataTilesets); break;
            case 'common_event': fromObjects(g.$dataCommonEvents); break;
            case 'map': fromObjects(g.$dataMapInfos); break;
        }
        if (out.length > 1) this._dbCache[kind] = out;
        return out;
    },
    fileOptions: function(dir) {
        dir = String(dir || '').replace(/\/+$/, '');
        if (this._fileCache[dir]) return this._fileCache[dir];
        var files = Env.listDir(Env.base + '/' + dir, null);
        if (!files) return null;
        var seen = {}, out = [];
        files.forEach(function(f) {
            var name = f.replace(/\.[^.]+$/, '');
            if (seen[name] || /^\./.test(name)) return;
            seen[name] = true;
            out.push({ value: name, label: name });
        });
        this._fileCache[dir] = out;
        return out;
    },

    defaultFor: function(field, structs) {
        var t = field.type;
        if (t.isArray) return [];
        if (t.kind === 'struct') return Codec.parse(field, undefined, structs);
        if (field.def !== undefined) return Codec.parse(field, field.def, structs);
        if (t.kind === 'boolean') return false;
        if (t.kind === 'number') return 0;
        if (Codec.isDbRef(t.kind)) return 1;
        return '';
    },
    label: function(field) { return field.text || field.name; },

    structSummary: function(structDef, obj) {
        if (!isObj(obj)) return '';
        var prefer = ['name', 'id', 'key', 'label', 'text', 'title'];
        var fields = structDef ? structDef.fields : Object.keys(obj).map(function(k) { return { name: k, type: { kind: 'text' } }; });
        for (var p = 0; p < prefer.length; p++) {
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].name.toLowerCase() === prefer[p] && obj[fields[i].name] !== undefined && String(obj[fields[i].name]).trim() !== '') return String(obj[fields[i].name]);
            }
        }
        for (var j = 0; j < fields.length; j++) {
            var f = fields[j], v = obj[f.name];
            if (v === undefined || v === null || v === '' || typeof v === 'boolean' || Array.isArray(v) || isObj(v)) continue;
            if (f.type && (f.type.kind === 'text' || f.type.kind === 'combo' || f.type.kind === 'select' || f.type.kind === 'file')) return String(v);
        }
        for (var k = 0; k < fields.length; k++) {
            var v2 = obj[fields[k].name];
            if (v2 !== undefined && v2 !== null && v2 !== '' && !Array.isArray(v2) && !isObj(v2)) return Form.label(fields[k]) + ': ' + String(v2);
        }
        return '';
    },

    // A labeled field frame. opts: {label, key, desc, isBool, search, tools:[], note}
    frame: function(opts) {
        var head = h('div', { class: 'gb-field-head' });
        var dot = h('span', { class: 'gb-field-dot' });
        var label = h('div', { class: 'gb-field-label' }, [h('span', {}, [UI.highlight(opts.label, opts.search)])]);
        if (opts.key && opts.key !== opts.label) label.appendChild(h('span', { class: 'gb-field-key', text: opts.key }));
        head.appendChild(dot); head.appendChild(label);
        var tools = h('div', { class: 'gb-field-tools' });
        head.appendChild(tools);
        var el = h('div', { class: 'gb-field' + (opts.isBool ? ' gb-field-bool' : '') + (opts.cls ? ' ' + opts.cls : ''), 'data-key': opts.key || null }, [head]);
        if (opts.desc) el.appendChild(h('div', { class: 'gb-field-desc' }, [UI.highlight(opts.desc, opts.search)]));
        var controlHost = h('div', { class: 'gb-field-control' });
        if (!opts.isBool) el.appendChild(controlHost);
        var noteEl = null;
        var api = {
            el: el, head: head, tools: tools, controlHost: controlHost, labelEl: label,
            setNote: function(text, kind) {
                if (!text) { if (noteEl) { noteEl.remove(); noteEl = null; } return; }
                if (!noteEl) { noteEl = h('div', { class: 'gb-field-note' }); el.appendChild(noteEl); }
                noteEl.className = 'gb-field-note' + (kind ? ' is-' + kind : '');
                clear(noteEl);
                if (kind === 'warn' || kind === 'error') noteEl.appendChild(icon('alert'));
                else if (kind === 'live') noteEl.appendChild(icon('zap'));
                noteEl.appendChild(h('span', { text: text }));
            },
            setBoolControl: function(ctrl) { head.appendChild(ctrl); }
        };
        return api;
    },

    // Generic control. value is a JS value (see Codec); commit(jsValue) is called on change.
    renderControl: function(field, value, commit, env, opts) {
        opts = opts || {};
        env = env || {};
        var t = field.type || { kind: 'text' };
        if (t.isArray) return this.renderList(field, Array.isArray(value) ? value : [], commit, env);
        switch (t.kind) {
            case 'struct': return this.renderStruct(field, isObj(value) ? value : {}, commit, env);
            case 'boolean': return this.renderBoolean(field, value, commit);
            case 'number': return this.renderNumber(field, value, commit, opts);
            case 'select': return this.renderSelect(field, value, commit);
            case 'combo': return this.renderCombo(field, value, commit);
            case 'file': return this.renderFile(field, value, commit);
            case 'note': case 'multiline_string': return this.renderTextarea(field, value, commit);
            default:
                if (Codec.isDbRef(t.kind)) return this.renderDbRef(field, value, commit);
                return this.renderText(field, value, commit);
        }
    },

    renderBoolean: function(field, value, commit) {
        var on = value === true || value === 'true';
        var text = h('span', { class: 'gb-switch-text', text: on ? (field.on || 'ON') : (field.off || 'OFF') });
        var sw = UI.switchEl(on, function(next) { text.textContent = next ? (field.on || 'ON') : (field.off || 'OFF'); commit(next); });
        var row = h('div', { class: 'gb-switch-row' }, [text, sw]);
        row.setValue = function(v) { var o = v === true || v === 'true'; sw.set(o); text.textContent = o ? (field.on || 'ON') : (field.off || 'OFF'); };
        return row;
    },

    renderNumber: function(field, value, commit, opts) {
        var min = opts.min !== undefined ? opts.min : field.min;
        var max = opts.max !== undefined ? opts.max : field.max;
        function countDec(v) { var m = /\.(\d+)\s*$/.exec(String(v === undefined || v === null ? '' : v)); return m ? m[1].length : 0; }
        var decimals = Math.max(field.decimals || 0, countDec(value), countDec(field.def), countDec(opts.step));
        var step = opts.step !== undefined ? opts.step : (decimals ? Math.pow(10, -decimals) : 1);
        var hasRange = typeof min === 'number' && typeof max === 'number' && isFinite(min) && isFinite(max) && max > min;
        var cur = (value === '' || value === undefined || value === null || isNaN(Number(value))) ? '' : Number(value);
        function fmt(n) { return n === '' ? '' : (decimals ? Number(n).toFixed(decimals) : String(Math.round(n))); }
        function normalize(n) {
            if (n === '' || isNaN(n)) return '';
            if (typeof min === 'number' && isFinite(min)) n = Math.max(min, n);
            if (typeof max === 'number' && isFinite(max)) n = Math.min(max, n);
            return decimals ? Number(n.toFixed(decimals)) : Math.round(n);
        }
        var num = h('input', { class: 'gb-input', type: 'number', step: String(step), min: typeof min === 'number' && isFinite(min) ? String(min) : null, max: typeof max === 'number' && isFinite(max) ? String(max) : null, spellcheck: 'false' });
        num.value = fmt(cur);
        var range = null;
        function setFill() {
            if (!range) return;
            var v = num.value === '' ? min : Number(num.value);
            range.style.setProperty('--gb-fill', (clamp((v - min) / (max - min), 0, 1) * 100).toFixed(2) + '%');
        }
        var commitDebounced = debounce(function(n) { commit(n); }, 140);
        function setValue(n, fromRange) {
            n = normalize(n);
            num.value = fmt(n);
            if (range && n !== '') range.value = String(n);
            setFill();
            var out = n === '' ? '' : fmt(n);
            if (fromRange) commitDebounced(out); else commit(out);
        }
        num.addEventListener('change', function() { setValue(num.value === '' ? '' : Number(num.value)); });
        num.addEventListener('keydown', function(ev) {
            if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') {
                ev.preventDefault();
                var mult = ev.shiftKey ? 10 : 1;
                var base = num.value === '' ? (typeof min === 'number' ? min : 0) : Number(num.value);
                setValue(base + (ev.key === 'ArrowUp' ? step : -step) * mult);
            } else if (ev.key === 'Enter') { num.blur(); }
        });
        var wrap;
        if (hasRange) {
            range = h('input', { class: 'gb-range', type: 'range', min: String(min), max: String(max), step: String(step) });
            range.value = String(cur === '' ? min : cur);
            range.addEventListener('input', function() { num.value = fmt(Number(range.value)); setFill(); commitDebounced(fmt(normalize(Number(range.value)))); });
            range.addEventListener('change', function() { setValue(Number(range.value)); });
            range.addEventListener('wheel', function(ev) {
                if (document.activeElement !== range) return;
                ev.preventDefault();
                setValue((num.value === '' ? min : Number(num.value)) + (ev.deltaY < 0 ? step : -step));
            }, { passive: false });
            setFill();
            wrap = h('div', { class: 'gb-number' }, [range, num]);
        } else {
            var minus = UI.button({ icon: 'minus', tip: 'Decrease|Shift: ×10', onClick: function(ev) { var base = num.value === '' ? 0 : Number(num.value); setValue(base - step * (ev.shiftKey ? 10 : 1)); } });
            var plus = UI.button({ icon: 'plus', tip: 'Increase|Shift: ×10', onClick: function(ev) { var base = num.value === '' ? 0 : Number(num.value); setValue(base + step * (ev.shiftKey ? 10 : 1)); } });
            wrap = h('div', { class: 'gb-stepper' }, [minus, num, plus]);
        }
        wrap.setValue = function(v) { var n = (v === '' || v === undefined || v === null || isNaN(Number(v))) ? '' : normalize(Number(v)); num.value = fmt(n); if (range && n !== '') range.value = String(n); setFill(); };
        return wrap;
    },

    renderSelect: function(field, value, commit) {
        var sel = h('select', { class: 'gb-select' });
        var options = (field.options || []).slice();
        var cur = value === undefined || value === null ? '' : String(value);
        var found = options.some(function(o) { return String(o.value) === cur; });
        if (!found) options.unshift({ label: cur === '' ? '(empty)' : '(current: ' + cur + ')', value: cur, phantom: true });
        options.forEach(function(o) {
            var opt = h('option', { value: String(o.value), text: o.label + (o.explicit && o.label !== o.value ? '' : '') });
            if (String(o.value) === cur) opt.selected = true;
            sel.appendChild(opt);
        });
        sel.addEventListener('change', function() { commit(sel.value); });
        sel.setValue = function(v) { sel.value = String(v === undefined ? '' : v); };
        return sel;
    },

    renderCombo: function(field, value, commit) {
        var options = (field.options || []).map(function(o) { return { value: String(o.value), label: o.label }; });
        var c = UI.combo({ value: value === undefined || value === null ? '' : String(value), options: options, allowCustom: true, placeholder: 'Type or choose…', onChange: function(v) { commit(v); } });
        return c;
    },

    renderFile: function(field, value, commit) {
        var options = field.dir ? this.fileOptions(field.dir) : null;
        if (!options) {
            var input = this.renderText(field, value, commit, { placeholder: field.dir ? field.dir + '/…' : 'file name' });
            return input;
        }
        var c = UI.combo({ value: value === undefined || value === null ? '' : String(value), options: options, allowCustom: true, placeholder: field.dir + '/…', onChange: function(v) { commit(v); } });
        return c;
    },

    renderDbRef: function(field, value, commit) {
        var options = this.dbOptions(field.type.kind);
        var cur = value === '' || value === undefined || value === null ? '' : String(value);
        var c = UI.combo({ value: cur, options: options, allowCustom: true, mono: false, placeholder: 'Choose ' + field.type.kind.replace('_', ' ') + '…', onChange: function(v) {
            var n = Number(v);
            if (v === '') { commit(''); return; }
            if (!isNaN(n)) commit(n);
            else {
                var m = options.filter(function(o) { return o.label.toLowerCase() === String(v).toLowerCase(); })[0];
                if (m) { commit(Number(m.value)); c.setValue(m.value); }
                else c.setValue(cur);
            }
        } });
        return c;
    },

    renderTextarea: function(field, value, commit) {
        var ta = h('textarea', { class: 'gb-textarea', spellcheck: 'false', rows: '3' });
        ta.value = value === undefined || value === null ? '' : String(value);
        function autosize() { ta.style.height = 'auto'; ta.style.height = Math.min(420, Math.max(60, ta.scrollHeight + 2)) + 'px'; }
        ta.addEventListener('input', autosize);
        ta.addEventListener('focus', autosize);
        ta.addEventListener('change', function() { commit(ta.value); });
        ta.addEventListener('keydown', function(ev) { if (ev.key === 'Escape') { ta.blur(); ev.stopPropagation(); } });
        setTimeout(autosize, 0);
        ta.setValue = function(v) { ta.value = v === undefined ? '' : String(v); autosize(); };
        return ta;
    },

    renderText: function(field, value, commit, opts) {
        opts = opts || {};
        var cur = value === undefined || value === null ? '' : String(value);
        var input = h('input', { class: 'gb-input', type: 'text', spellcheck: 'false', placeholder: opts.placeholder || (field.def !== undefined && field.def !== '' ? 'default: ' + String(field.def).slice(0, 40) : '') });
        input.value = cur;
        var colorMode = isHexColor(cur) || (/colou?r/i.test(field.name) && (cur === '' || isHexColor(cur)) && !/rgba?\(/.test(cur));
        input.addEventListener('change', function() { commit(input.value); });
        input.addEventListener('keydown', function(ev) { if (ev.key === 'Enter') input.blur(); else if (ev.key === 'Escape') { input.value = cur; input.blur(); ev.stopPropagation(); } });
        if (!colorMode) { input.setValue = function(v) { cur = v === undefined ? '' : String(v); input.value = cur; }; return input; }
        var fill = h('span', { class: 'gb-swatch-fill' });
        var picker = h('input', { type: 'color', 'aria-label': 'Pick color' });
        var swatch = h('span', { class: 'gb-swatch', 'data-tip': 'Pick color' }, [fill, picker]);
        function sync(v) {
            var ok = isHexColor(v);
            fill.style.background = ok ? v : 'transparent';
            if (ok) { var six = v.length === 4 ? '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3] : v.slice(0, 7); picker.value = six.toLowerCase(); }
        }
        var debounced = debounce(function(v) { commit(v); }, 120);
        picker.addEventListener('input', function() { input.value = picker.value; sync(picker.value); debounced(picker.value); });
        picker.addEventListener('change', function() { input.value = picker.value; sync(picker.value); commit(picker.value); });
        input.addEventListener('input', function() { sync(input.value); });
        sync(cur);
        input.classList.add('gb-mono');
        var wrap = h('div', { class: 'gb-color' }, [swatch, input]);
        wrap.setValue = function(v) { cur = v === undefined ? '' : String(v); input.value = cur; sync(cur); };
        return wrap;
    },

    renderStruct: function(field, obj, commit, env) {
        var def = env.structs && env.structs[field.type.struct];
        var box = h('div', { class: 'gb-struct' });
        box.appendChild(this.renderStructFields(def, obj, function(o) { commit(o); }, env));
        return box;
    },

    renderStructFields: function(def, obj, commit, env) {
        var self = this;
        var list = h('div', { class: 'gb-struct-fields' });
        var fields = def ? def.fields : Object.keys(obj).map(function(k) { return { name: k, text: k, type: { kind: typeof obj[k] === 'object' ? 'multiline_string' : 'text', isArray: false }, options: [] }; });
        fields.forEach(function(f) {
            if (!f.type) f.type = { kind: 'text', isArray: false };
            var isBool = f.type.kind === 'boolean' && !f.type.isArray;
            var frame = self.frame({ label: self.label(f), key: f.name, desc: f.desc, isBool: isBool, search: env.search });
            var val = has(obj, f.name) ? obj[f.name] : self.defaultFor(f, env.structs);
            if (!def) val = typeof val === 'object' ? JSON.stringify(val) : val;
            var ctrl = self.renderControl(f, val, function(v) { obj[f.name] = v; commit(obj); }, env);
            if (isBool) frame.setBoolControl(ctrl); else frame.controlHost.appendChild(ctrl);
            if (f.def !== undefined && !isBool && !f.type.isArray && f.type.kind !== 'struct') {
                frame.tools.appendChild(UI.button({ icon: 'reset', ghost: true, size: 'xs', tip: 'Reset to default', onClick: function() {
                    var d = self.defaultFor(f, env.structs); obj[f.name] = d; commit(obj);
                    var nc = self.renderControl(f, d, function(v) { obj[f.name] = v; commit(obj); }, env);
                    clear(frame.controlHost).appendChild(nc);
                } }));
            }
            list.appendChild(frame.el);
        });
        return list;
    },

    renderList: function(field, arr, commit, env) {
        var self = this;
        var elem = Codec.elem(field);
        var isStruct = elem.type.kind === 'struct';
        var def = isStruct && env.structs ? env.structs[elem.type.struct] : null;
        var box = h('div', { class: 'gb-list-editor' });
        var itemsEl = h('div', { class: 'gb-list-items' });
        var openSet = env.openItems || (env.openItems = []);
        function isOpen(item) { return openSet.indexOf(item) >= 0; }
        function setOpen(item, on) { var i = openSet.indexOf(item); if (on && i < 0) openSet.push(item); if (!on && i >= 0) openSet.splice(i, 1); }
        function rebuild() {
            clear(itemsEl);
            if (!arr.length) itemsEl.appendChild(h('div', { class: 'gb-list-empty', text: 'No items yet.' }));
            arr.forEach(function(item, i) { itemsEl.appendChild(isStruct ? structRow(item, i) : scalarRow(item, i)); });
        }
        function structRow(item, i) {
            var summaryText = self.structSummary(def, item);
            var summary = h('span', { class: 'gb-list-summary' + (summaryText ? '' : ' is-empty'), text: summaryText || 'Item ' + (i + 1) });
            var tools = h('div', { class: 'gb-list-tools' }, [
                UI.button({ icon: 'copy', ghost: true, size: 'xs', tip: 'Duplicate', onClick: function() { arr.splice(i + 1, 0, deepClone(item)); commit(arr); rebuild(); } }),
                UI.button({ icon: 'arrowUp', ghost: true, size: 'xs', tip: 'Move up', disabled: i === 0, onClick: function() { move(i, i - 1); } }),
                UI.button({ icon: 'arrowDown', ghost: true, size: 'xs', tip: 'Move down', disabled: i === arr.length - 1, onClick: function() { move(i, i + 1); } }),
                UI.button({ icon: 'trash', ghost: true, size: 'xs', danger: true, tip: 'Remove', onClick: function() { arr.splice(i, 1); commit(arr); rebuild(); } })
            ]);
            var head = h('div', { class: 'gb-list-item-head' }, [
                h('span', { class: 'gb-grip', 'data-tip': 'Drag to reorder' }, [icon('grip')]), icon('chevronRight', 'gb-chev'),
                h('span', { class: 'gb-list-index', text: String(i + 1) }), summary, tools]);
            var body = h('div', { class: 'gb-list-item-body' });
            var row = h('div', { class: 'gb-list-item' + (isOpen(item) ? ' is-open' : '') }, [head, body]);
            var built = false;
            function build() {
                if (built) return; built = true;
                body.appendChild(self.renderStructFields(def, item, function(o) {
                    arr[i] = o; commit(arr);
                    var s = self.structSummary(def, o);
                    summary.textContent = s || 'Item ' + (i + 1); summary.classList.toggle('is-empty', !s);
                }, env));
            }
            if (isOpen(item)) build();
            head.addEventListener('click', function(ev) {
                if (closest(ev.target, '.gb-btn') || closest(ev.target, '.gb-grip')) return;
                var open = !row.classList.contains('is-open');
                row.classList.toggle('is-open', open); setOpen(item, open);
                if (open) build();
            });
            return row;
        }
        function scalarRow(item, i) {
            var ctrl = self.renderControl(elem, item, function(v) { arr[i] = v; commit(arr); }, env);
            var row = h('div', { class: 'gb-list-item gb-list-scalar' }, [
                h('span', { class: 'gb-grip', 'data-tip': 'Drag to reorder' }, [icon('grip')]),
                h('span', { class: 'gb-list-index', text: String(i + 1) }),
                h('div', { class: 'gb-grow' }, [ctrl]),
                UI.button({ icon: 'trash', ghost: true, size: 'xs', danger: true, tip: 'Remove', onClick: function() { arr.splice(i, 1); commit(arr); rebuild(); } })
            ]);
            return row;
        }
        function move(from, to) {
            if (to < 0 || to >= arr.length) return;
            var it = arr.splice(from, 1)[0]; arr.splice(to, 0, it); commit(arr); rebuild();
        }
        var add = h('button', { class: 'gb-list-add', type: 'button' }, [icon('plus'), h('span', { text: isStruct ? 'Add ' + (def ? def.name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase() : 'item') : 'Add item' })]);
        add.addEventListener('click', function() {
            var v = self.defaultFor(elem, env.structs);
            arr.push(v); commit(arr);
            if (isStruct) setOpen(v, true);
            rebuild();
            var last = itemsEl.lastChild;
            if (last) { last.scrollIntoView({ block: 'nearest' }); var f = last.querySelector('input,select,textarea'); if (f) f.focus(); }
        });
        box.appendChild(itemsEl); box.appendChild(add);
        UI.makeSortable(itemsEl, '.gb-list-item', '.gb-grip', function(from, to) { move(from, to); });
        rebuild();
        return box;
    },

    // Root field bound to a plugin parameter through ctx.
    renderField: function(param, ctx, opts) {
        var self = this;
        opts = opts || {};
        var key = param.name;
        var structs = ctx.structs;
        var ov = opts.override || {};
        var isBool = param.type.kind === 'boolean' && !param.type.isArray;
        var frame = this.frame({ label: ov.label || this.label(param), key: ctx.mode === 'player' ? null : key, desc: ov.help || param.desc, isBool: isBool, search: ctx.search, cls: opts.cls });
        var el = frame.el;
        var env = { structs: structs, search: ctx.search, mode: ctx.mode, openItems: [] };
        var stored = ctx.getValue(key);
        el._gbLastValue = stored;

        function currentJs() { return Codec.parse(param, ctx.getValue(key), structs); }
        function commit(js) {
            var str = Codec.serialize(param, js, structs, ctx.getValue(key));
            var r = ctx.setValue(key, str);
            if (r && r.ok === false) { frame.setNote(r.error || 'Rejected', 'error'); return; }
            el._gbLastValue = str;
            refresh();
        }
        function buildControl() {
            var ctrl = self.renderControl(param, currentJs(), commit, env, { min: ov.min, max: ov.max, step: ov.step });
            if (isBool) { var old = frame.head.querySelector('.gb-switch-row'); if (old) old.remove(); frame.setBoolControl(ctrl); }
            else clear(frame.controlHost).appendChild(ctrl);
            el._gbControl = ctrl;
        }
        buildControl();

        var toolRevert = null, toolDefault = null, toolPin = null;
        if (ctx.mode !== 'player') {
            toolRevert = UI.button({ icon: 'undo', ghost: true, size: 'xs', tip: 'Revert to saved value', onClick: function() { ctx.revert(key); } });
            frame.tools.appendChild(toolRevert);
            if (param.def !== undefined) {
                toolDefault = UI.button({ icon: 'reset', ghost: true, size: 'xs', tip: 'Reset to plugin default', onClick: function() { commit(Codec.parse(param, param.def, structs)); buildControl(); } });
                frame.tools.appendChild(toolDefault);
            }
            if (ctx.togglePin) {
                toolPin = UI.button({ icon: 'pin', ghost: true, size: 'xs', tip: 'Pin to Favorites', onClick: function() { ctx.togglePin(key); refresh(); } });
                frame.tools.appendChild(toolPin);
            }
            frame.tools.appendChild(UI.button({ icon: 'copy', ghost: true, size: 'xs', tip: 'Copy value', onClick: function() { copyText(String(ctx.getValue(key) === undefined ? '' : ctx.getValue(key))); UI.toast({ type: 'success', message: 'Value copied', timeout: 1500 }); } }));
        } else if (param.def !== undefined) {
            toolDefault = UI.button({ icon: 'reset', ghost: true, size: 'xs', tip: 'Reset to default', onClick: function() { commit(Codec.parse(param, param.def, structs)); buildControl(); } });
            frame.tools.appendChild(toolDefault);
        }

        function refresh() {
            var v = ctx.getValue(key);
            var dirty = ctx.isDirty ? ctx.isDirty(key) : false;
            var stale = ctx.isStale ? ctx.isStale(key) : false;
            var live = ctx.isLive ? ctx.isLive(key) : false;
            var pinned = ctx.isPinned ? ctx.isPinned(key) : false;
            var missing = v === undefined;
            el.classList.toggle('is-dirty', dirty);
            el.classList.toggle('is-stale', stale);
            el.classList.toggle('is-pinned', pinned);
            el.classList.toggle('is-missing', missing);
            if (toolRevert) toolRevert.classList.toggle('gb-hidden', !dirty);
            if (toolDefault) toolDefault.classList.toggle('gb-hidden', param.def === undefined || (v !== undefined && String(v) === String(param.def)));
            if (toolPin) { toolPin.classList.toggle('is-pinned', pinned); toolPin.setAttribute('data-tip', pinned ? 'Unpin from Favorites' : 'Pin to Favorites'); }
            if (ctx.mode === 'player') {
                if (stale && !live) frame.setNote('Takes effect the next time the game starts', 'warn'); else frame.setNote('');
            } else if (missing) frame.setNote('Not in plugins.js yet, showing the plugin default. Edit to add it.', null);
            else if (stale && ctx.staleReason && ctx.staleReason() === 'save') frame.setNote('Save + Reload to apply', 'warn');
            else if (stale) frame.setNote('Applies on reload', 'warn');
            else if (dirty && live) frame.setNote('Live', 'live');
            else frame.setNote('');
        }
        el._gbRefresh = refresh;
        el._gbSync = function() {
            var v = ctx.getValue(key);
            if (v !== el._gbLastValue) { el._gbLastValue = v; buildControl(); }
            refresh();
        };
        el._gbKey = key;
        refresh();
        return el;
    },

    // Whole plugin form from schema roots.
    renderForm: function(schema, ctx, opts) {
        var self = this;
        opts = opts || {};
        var form = h('div', { class: 'gb-form' });
        var count = 0;
        function fieldMatches(p) {
            if (!ctx.search) return true;
            var q = ctx.search.toLowerCase();
            return p.name.toLowerCase().indexOf(q) >= 0 || (p.text || '').toLowerCase().indexOf(q) >= 0 || (p.desc || '').toLowerCase().indexOf(q) >= 0;
        }
        function anyMatch(node) {
            if (!node.isSection && fieldMatches(node)) return true;
            return node.children.some(anyMatch);
        }
        function renderNode(node, host, depth) {
            if (node.isSection) {
                if (opts.filterKeys) { if (!node.children.some(function(c) { return anyMatchKeys(c); })) return; }
                else if (ctx.search && !anyMatch(node)) return;
                var body = h('div', { class: 'gb-section-body' });
                var n = 0;
                node.children.forEach(function(c) { n += renderNode(c, body, depth + 1); });
                if (!n) return 0;
                var sid = node.name;
                var collapsed = ctx.isSectionCollapsed ? ctx.isSectionCollapsed(sid) : false;
                if (ctx.search) collapsed = false;
                var dots = h('span', { class: 'gb-section-dots' });
                var head = h('div', { class: 'gb-section-head', role: 'button' }, [icon('chevronRight', 'gb-chev'), h('span', {}, [UI.highlight(self.label(node), ctx.search)]), dots, h('span', { class: 'gb-section-count', text: String(n) })]);
                var sec = h('div', { class: 'gb-section' + (collapsed ? '' : ' is-open') }, [head, body]);
                head.addEventListener('click', function() {
                    var open = !sec.classList.contains('is-open');
                    sec.classList.toggle('is-open', open);
                    if (ctx.setSectionCollapsed) ctx.setSectionCollapsed(sid, !open);
                });
                sec._gbRefreshDots = function() {
                    clear(dots);
                    var d = 0, s = 0;
                    Array.prototype.forEach.call(body.querySelectorAll('.gb-field[data-key]'), function(f) { if (f.classList.contains('is-stale')) s++; else if (f.classList.contains('is-dirty')) d++; });
                    if (d) dots.appendChild(h('span', { class: 'gb-field-dot', style: 'display:block;background:var(--gb-accent)', 'data-tip': d + ' edited' }));
                    if (s) dots.appendChild(h('span', { class: 'gb-field-dot', style: 'display:block;background:var(--gb-warn)', 'data-tip': s + ' pending reload' }));
                };
                sec._gbRefreshDots();
                host.appendChild(sec);
                return n;
            }
            if (node.isDivider) {
                if (!ctx.search && !opts.filterKeys) host.appendChild(h('div', { class: 'gb-group-title', style: 'padding-top:10px' }, [h('span', { text: self.label(node) }), h('span', { class: 'gb-line' })]));
                return 0;
            }
            var rendered = 0;
            var show = opts.filterKeys ? opts.filterKeys.indexOf(node.name) >= 0 : fieldMatches(node);
            if (show) { host.appendChild(self.renderField(node, ctx)); rendered++; count++; }
            if (node.children.length) {
                var kids = h('div', { class: 'gb-children', style: 'margin-left:12px;border-left:1px solid var(--gb-border)' });
                var kn = 0;
                node.children.forEach(function(c) { kn += renderNode(c, kids, depth + 1); });
                if (kn) { host.appendChild(kids); rendered += kn; }
            }
            return rendered;
        }
        function anyMatchKeys(node) {
            if (!node.isSection && opts.filterKeys.indexOf(node.name) >= 0) return true;
            return node.children.some(anyMatchKeys);
        }
        schema.roots.forEach(function(r) { renderNode(r, form, 0); });
        // Parameters that exist in plugins.js but not in the header (renamed/removed): show as guessed fields.
        if (!opts.filterKeys && ctx.extraKeys) {
            var extras = ctx.extraKeys().filter(function(k) { return !ctx.search || k.toLowerCase().indexOf(ctx.search.toLowerCase()) >= 0; });
            if (extras.length) {
                var body = h('div', { class: 'gb-section-body' });
                extras.forEach(function(k) {
                    var p = HeaderParser._newParam(k); p.text = k; p.guessed = true; p.type = HeaderParser.guess({ k: ctx.getValue(k) }).params[0].type;
                    p.desc = 'Stored in plugins.js but not declared in the plugin header (renamed or removed parameter).';
                    body.appendChild(self.renderField(p, ctx)); count++;
                });
                var head = h('div', { class: 'gb-section-head' }, [icon('chevronRight', 'gb-chev'), h('span', { text: 'Not in header' }), h('span', { class: 'gb-section-count', text: String(extras.length) })]);
                var sec = h('div', { class: 'gb-section' }, [head, body]);
                head.addEventListener('click', function() { sec.classList.toggle('is-open'); });
                form.appendChild(sec);
            }
        }
        form._gbCount = count;
        return form;
    }
};

//=============================================================================
// 20. Panel shell (header, tabs, status bar, dock, resize, shortcuts)
//=============================================================================

function View(id, title, iconName) {
    this.id = id; this.title = title; this.icon = iconName;
    this.el = h('div', { class: 'gb-view', 'data-view': id });
    this.built = false;
    this.visible = false;
}
View.prototype.build = function() {};
View.prototype.show = function() { if (!this.built) { this.built = true; this.build(); } this.visible = true; this.el.classList.add('is-active'); if (this.onShow) this.onShow(); };
View.prototype.hide = function() { this.visible = false; this.el.classList.remove('is-active'); if (this.onHide) this.onHide(); };

var Panel = GB.Panel = {
    root: null, built: false, open: false, collapsed: false, dock: 'right', width: 440, tab: 'plugins',
    layout: null, views: {}, tabOrder: [], customTabs: [], tabButtons: {},
    _saveLayout: null,

    layoutKey: function() { return 'layout:' + Env.projectId; },
    loadLayout: function() {
        var d = P.rememberLayout ? LS.get(this.layoutKey(), null) : null;
        if (!isObj(d)) d = {};
        this.layout = {
            tab: d.tab || 'plugins', width: clamp(toNum(d.width, P.panelWidth), 320, 900), dock: d.dock === 'left' || d.dock === 'right' ? d.dock : P.dock,
            collapsed: !!d.collapsed, filter: d.filter || (P.hideThirdParty ? 'ed5' : 'all'), expanded: isObj(d.expanded) ? d.expanded : {},
            pinned: Array.isArray(d.pinned) ? d.pinned : [], sections: isObj(d.sections) ? d.sections : {}, consoleLevels: isObj(d.consoleLevels) ? d.consoleLevels : null,
            inspectorPlugin: d.inspectorPlugin || '', helpOpen: isObj(d.helpOpen) ? d.helpOpen : {}
        };
        this.width = this.layout.width; this.dock = this.layout.dock; this.collapsed = this.layout.collapsed; this.tab = this.layout.tab;
        var self = this;
        this._saveLayout = debounce(function() { if (P.rememberLayout) LS.set(self.layoutKey(), self.layout); }, 250);
        return this.layout;
    },
    saveLayout: function() { if (this._saveLayout) this._saveLayout(); },

    build: function() {
        if (this.built) return;
        this.built = true;
        var self = this;
        UI.injectCss();
        this.loadLayout();
        var root = this.root = h('div', { class: 'gb-root gb-ui is-hidden' + (this.dock === 'left' ? ' gb-left' : ''), role: 'complementary', 'aria-label': 'ED5 Gear Box', tabindex: '-1' });
        UI.applyTheme(root);
        root.style.setProperty('--gb-width', this.width + 'px');

        // resizer
        var resizer = h('div', { class: 'gb-resizer', 'data-tip': 'Drag to resize' });
        resizer.addEventListener('mousedown', function(ev) {
            ev.preventDefault();
            resizer.classList.add('is-active');
            var startX = ev.clientX, startW = self.width;
            function move(e) { var dx = e.clientX - startX; self.setWidth(self.dock === 'right' ? startW - dx : startW + dx, true); }
            function up() { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); resizer.classList.remove('is-active'); self.setWidth(self.width); }
            document.addEventListener('mousemove', move); document.addEventListener('mouseup', up);
        });
        root.appendChild(resizer);

        // collapsed strip
        var strip = h('div', { class: 'gb-strip', 'data-tip': 'Expand Gear Box|' + P.hotkey }, [icon('gear'), h('span', { class: 'gb-strip-label', text: 'Gear Box' }), h('span', { class: 'gb-badge-dot gb-hidden' })]);
        strip.addEventListener('click', function() { self.setCollapsed(false); });
        root.appendChild(strip);
        this.stripDot = strip.querySelector('.gb-badge-dot');

        // header
        this.subtitleEl = h('div', { class: 'gb-subtitle', text: '' });
        var brand = h('div', { class: 'gb-brand' }, [h('div', { class: 'gb-logo' }, [icon('gear')]), h('div', { class: 'gb-grow' }, [h('div', { class: 'gb-title', text: 'Gear Box' }), this.subtitleEl])]);
        this.unsavedBtn = h('button', { class: 'gb-unsaved gb-hidden', type: 'button', 'data-tip': 'Review unsaved edits' }, [h('span', { class: 'gb-dot' }), h('span', { class: 'gb-unsaved-text', text: '' })]);
        this.unsavedBtn.addEventListener('click', function() { self.showTab('profiles'); });
        this.saveBtn = UI.button({ icon: 'save', primary: true, tip: 'Save to js/plugins.js|Ctrl+S', onClick: function() { self.save({}); } });
        this.saveMenuBtn = UI.button({ icon: 'chevronDown', primary: true, tip: 'Save options', onClick: function(ev, b) {
            var stale = Store.anyStale().length > 0;
            UI.menu(b, [
                { label: 'Save to plugins.js', icon: 'save', hint: 'Ctrl+S', onClick: function() { self.save({}); } },
                { label: 'Save & reload', icon: 'refresh', onClick: function() { self.save({ reload: true }); } },
                { label: 'Save & reload, resume here', icon: 'play', disabled: !Resume.canResume(), onClick: function() { self.save({ reload: true, resume: true }); } },
                { sep: true },
                { label: 'Discard all edits', icon: 'trash', danger: true, disabled: !Store.changes().length, onClick: function() { self.discardAll(); } },
                stale ? { label: 'Reload without saving', icon: 'refresh', onClick: function() { GB.reload({ resume: Resume.canResume() }); } } : null
            ]);
        } });
        this.reloadBtn = UI.button({ icon: 'refresh', ghost: true, tip: 'Reload game|Ctrl+R', onClick: function(ev, b) {
            UI.menu(b, [
                { title: 'Reload game' },
                { label: 'Reload', icon: 'refresh', hint: 'Ctrl+R', onClick: function() { GB.reload({}); } },
                { label: 'Reload & resume here', icon: 'play', disabled: !Resume.canResume(), tip: Resume.canResume() ? null : 'Start a game first', onClick: function() { GB.reload({ resume: true }); } }
            ]);
        } });
        var moreBtn = UI.button({ icon: 'more', ghost: true, tip: 'More', onClick: function(ev, b) {
            UI.menu(b, [
                { label: 'Undo', icon: 'undo', hint: 'Ctrl+Z', disabled: !Store.undo.length, onClick: function() { self.undo(); } },
                { label: 'Redo', icon: 'redo', hint: 'Ctrl+Y', disabled: !Store.redo.length, onClick: function() { self.redo(); } },
                { sep: true },
                { label: self.dock === 'right' ? 'Dock to left' : 'Dock to right', icon: self.dock === 'right' ? 'dockLeft' : 'dockRight', onClick: function() { self.setDock(self.dock === 'right' ? 'left' : 'right'); } },
                { label: P.shrinkCanvas ? 'Overlay the game' : 'Shrink game beside panel', icon: 'layers', onClick: function() { Applier.set(PLUGIN_NAME, 'shrinkCanvas', P.shrinkCanvas ? 'false' : 'true'); } },
                { label: 'Collapse panel', icon: 'chevronsRight', onClick: function() { self.setCollapsed(true); } },
                { sep: true },
                { label: 'Gear Box settings', icon: 'gear', onClick: function() { self.showTab('plugins'); self.views.plugins.reveal(PLUGIN_NAME); } },
                { label: 'Rescan plugin folder', icon: 'folder', disabled: !Env.fs, onClick: function() { Registry.build(); Form.invalidateCaches(); self.views.plugins.renderList(); UI.toast({ type: 'success', message: 'Plugin folder rescanned' }); } },
                { label: 'Open browser devtools', icon: 'terminal', disabled: !Env.isNwjs(), onClick: function() { try { nw.Window.get().showDevTools(); } catch (e) { UI.toast({ type: 'error', message: 'Could not open devtools' }); } } },
                { sep: true },
                { label: 'About Gear Box v' + GB.VERSION, icon: 'info', onClick: function() { self.about(); } }
            ]);
        } });
        var collapseBtn = UI.button({ icon: this.dock === 'right' ? 'chevronsRight' : 'chevronsLeft', ghost: true, tip: 'Collapse', onClick: function() { self.setCollapsed(true); } });
        this.collapseBtn = collapseBtn;
        var closeBtn = UI.button({ icon: 'x', ghost: true, tip: 'Close|' + P.hotkey, onClick: function() { self.hide(); } });
        var actions = h('div', { class: 'gb-header-actions' }, [this.unsavedBtn, h('div', { class: 'gb-split' }, [this.saveBtn, this.saveMenuBtn]), this.reloadBtn, moreBtn, collapseBtn, closeBtn]);
        root.appendChild(h('div', { class: 'gb-header' }, [brand, h('span', { class: 'gb-mode', text: 'DEV', 'data-tip': GB.isDev() ? 'Developer mode' : 'Developer mode (forced)' }), actions]));

        // tabs
        this.tabsEl = h('div', { class: 'gb-tabs', role: 'tablist' });
        root.appendChild(this.tabsEl);

        // body / views
        this.bodyEl = h('div', { class: 'gb-body' });
        root.appendChild(this.bodyEl);
        this.views = {
            plugins: new PluginsView(), inspector: new InspectorView(), commands: new CommandsView(),
            order: new OrderView(), profiles: new ProfilesView(), console: new ConsoleView()
        };
        this.tabOrder = ['plugins', 'inspector', 'commands', 'order', 'profiles', 'console'];
        this.tabOrder.forEach(function(id) { self._addTab(self.views[id]); });
        this.customTabs.forEach(function(t) { self._addCustomTab(t); });

        // toasts / modal hosts
        var toasts = h('div', { class: 'gb-toasts' });
        this.bodyEl.appendChild(toasts);
        UI.toastHost = toasts;
        UI.modalHost = root;

        // status bar
        this.statusLeft = h('div', { class: 'gb-grow', text: '' });
        var hint = h('div', { class: 'gb-row' }, [h('span', { class: 'gb-kbd', text: 'Esc' }), h('span', { text: 'game' }), h('span', { class: 'gb-kbd', text: 'Ctrl+K' }), h('span', { text: 'search' })]);
        root.appendChild(h('div', { class: 'gb-statusbar' }, [this.statusLeft, hint]));

        document.body.appendChild(root);
        UI.installTooltips(root);
        root.addEventListener('keydown', function(ev) { self._onKeyDown(ev); });
        window.addEventListener('resize', function() { self._updateNarrow(); });
        this._bindStoreEvents();
        this._updateNarrow();
        if (this.collapsed) this.setCollapsed(true, true);
        this.showTab(this.tab, true);
        this.refreshHeader();
    },

    _addTab: function(view) {
        var self = this;
        var btn = h('button', { class: 'gb-tab', type: 'button', role: 'tab', 'data-tab': view.id, 'data-tip': view.title + '|Alt+' + (this.tabsEl.children.length + 1) }, [icon(view.icon), h('span', { class: 'gb-tab-label', text: view.title }), h('span', { class: 'gb-tab-dot gb-hidden' })]);
        btn.addEventListener('click', function() { self.showTab(view.id); });
        this.tabsEl.appendChild(btn);
        this.tabButtons[view.id] = btn;
        this.bodyEl.appendChild(view.el);
    },
    _addCustomTab: function(t) {
        var view = new View(t.id, t.title, t.icon || 'box');
        var api = { plugin: t.plugin, refresh: function() { if (view.built && t.onShow) t.onShow(view.el); }, h: h, icon: icon, ui: UI, form: Form, toast: UI.toast.bind(UI) };
        view.build = function() {
            var scroll = h('div', { class: 'gb-scroll' });
            view.el.appendChild(scroll);
            tryCall(t.build, null, [scroll, api], function(e) { scroll.appendChild(UI.callout('danger', 'Panel failed to build', e.message)); });
        };
        view.onShow = function() { if (t.onShow) tryCall(t.onShow, null, [view.el.firstChild, api]); };
        this.views[t.id] = view;
        this.tabOrder.push(t.id);
        this._addTab(view);
    },
    addPanel: function(title, build, opts) {
        opts = opts || {};
        var id = 'custom_' + String(title).toLowerCase().replace(/[^a-z0-9]+/g, '_');
        var t = { id: id, title: title, build: build, icon: opts.icon, onShow: opts.onShow, plugin: opts.plugin };
        this.customTabs.push(t);
        if (this.built) this._addCustomTab(t);
        return id;
    },

    showTab: function(id, silent) {
        if (!this.built) { this.tab = id || 'plugins'; return; }
        if (!this.views[id]) id = 'plugins';
        var self = this;
        each(this.views, function(v, k) {
            var active = k === id;
            if (active) v.show(); else if (v.visible) v.hide();
            var b = self.tabButtons[k];
            if (b) { b.classList.toggle('is-active', active); b.setAttribute('aria-selected', active ? 'true' : 'false'); }
        });
        this.tab = id;
        this.layout.tab = id;
        if (!silent) this.saveLayout();
        this.refreshStatus();
    },
    setTabDot: function(id, on) {
        var b = this.tabButtons[id];
        if (b) b.querySelector('.gb-tab-dot').classList.toggle('gb-hidden', !on);
    },

    show: function(tab) {
        if (!this.built) this.build();
        if (!Registry.built) Registry.build();
        var wasOpen = this.open;
        this.open = true;
        this.root.classList.remove('is-hidden');
        this.root.setAttribute('aria-hidden', 'false');
        if (this.collapsed) this.setCollapsed(false, true);
        if (tab) this.showTab(tab);
        else if (!wasOpen) this.views[this.tab].show();
        this._applyShrink();
        this.refreshHeader();
        if (!wasOpen) {
            Events.emit('open', { tab: this.tab });
            if (!this._welcomed) { this._welcomed = true; this._bootToasts(); }
        }
    },
    hide: function() {
        if (!this.open) return;
        this.open = false;
        UI.closePopovers();
        UI.hideTooltip();
        this.root.classList.add('is-hidden');
        this.root.setAttribute('aria-hidden', 'true');
        this.focusGame();
        this._applyShrink();
        Events.emit('close', {});
    },
    toggle: function(tab) { if (this.open && !this.collapsed) this.hide(); else this.show(tab); },
    isOpen: function() { return this.open; },
    focusGame: function() {
        var a = document.activeElement;
        if (a && a.blur && this.root && this.root.contains(a)) a.blur();
        if (typeof Input !== 'undefined' && Input.clear) Input.clear();
        if (typeof TouchInput !== 'undefined' && TouchInput.clear) TouchInput.clear();
    },
    setCollapsed: function(on, silent) {
        this.collapsed = !!on;
        this.root.classList.toggle('is-collapsed', this.collapsed);
        this.layout.collapsed = this.collapsed;
        if (!silent) this.saveLayout();
        if (this.collapsed) { UI.closePopovers(); this.focusGame(); }
        this._applyShrink();
        this.refreshHeader();
    },
    setDock: function(side) {
        this.dock = side === 'left' ? 'left' : 'right';
        this.root.classList.toggle('gb-left', this.dock === 'left');
        this.layout.dock = this.dock;
        clear(this.collapseBtn).appendChild(icon(this.dock === 'right' ? 'chevronsRight' : 'chevronsLeft'));
        this.saveLayout();
        this._applyShrink();
    },
    setWidth: function(px, live) {
        this.width = clamp(Math.round(px), 320, Math.min(900, window.innerWidth - 80));
        this.root.style.setProperty('--gb-width', this.width + 'px');
        this.layout.width = this.width;
        this._updateNarrow();
        if (!live) { this.saveLayout(); this._applyShrink(); }
    },
    _updateNarrow: function() {
        if (!this.root) return;
        this.root.classList.toggle('is-narrow', this.width < 400);
    },
    shrinkActive: function() { return this.open && !this.collapsed && P.shrinkCanvas; },
    _applyShrink: function() {
        var active = this.shrinkActive();
        if (!active && !this._shrunk) return;
        this._shrunk = active;
        if (typeof Graphics === 'undefined' || !Graphics._updateAllElements || !Graphics._canvas) return;
        tryCall(function() { Graphics._updateAllElements(); });
    },

    ownsEvent: function(ev) {
        if (PlayerPanel.open) {
            if (ev && ev.type && ev.type.indexOf('key') === 0) return true;
            return !!(ev && ev.target && PlayerPanel.root && PlayerPanel.root.contains(ev.target));
        }
        if (!this.open || !this.root) return false;
        if (ev && ev.target && ev.target.nodeType === 1 && this.root.contains(ev.target)) return true;
        if (ev && ev.type && ev.type.indexOf('key') === 0) {
            var a = document.activeElement;
            if (a && this.root.contains(a) && a !== this.root) return true;
        }
        return false;
    },

    _onKeyDown: function(ev) {
        var self = this;
        var inText = isTextInput(ev.target);
        var ctrl = ev.ctrlKey || ev.metaKey;
        if (ev.key === 'Escape') {
            if (UI._popovers.length) return;
            ev.preventDefault(); ev.stopPropagation();
            var a = document.activeElement;
            if (a && a !== this.root && this.root.contains(a)) { a.blur(); this.focusGame(); UI.toast({ type: 'info', message: 'Game has keyboard focus', timeout: 1200 }); }
            else this.hide();
            return;
        }
        if (ctrl && (ev.key === 'k' || ev.key === 'K')) { ev.preventDefault(); this.showTab('plugins'); this.views.plugins.focusSearch(); return; }
        if (ctrl && (ev.key === 's' || ev.key === 'S')) { ev.preventDefault(); this.save({}); return; }
        if (ctrl && (ev.key === 'r' || ev.key === 'R')) { ev.preventDefault(); GB.reload({ resume: Resume.canResume() }); return; }
        if (ctrl && !inText && (ev.key === 'z' || ev.key === 'Z')) { ev.preventDefault(); if (ev.shiftKey) this.redo(); else this.undo(); return; }
        if (ctrl && !inText && (ev.key === 'y' || ev.key === 'Y')) { ev.preventDefault(); this.redo(); return; }
        if (ev.altKey && /^[1-9]$/.test(ev.key)) {
            var id = this.tabOrder[Number(ev.key) - 1];
            if (id) { ev.preventDefault(); this.showTab(id); }
        }
        void self;
    },

    undo: function() {
        var rec = Applier.undo();
        if (!rec) { UI.toast({ type: 'info', message: 'Nothing to undo', timeout: 1200 }); return; }
        UI.toast({ type: 'info', message: 'Undid ' + (rec.type === 'param' ? rec.plugin + ' › ' + rec.key : rec.type === 'status' ? rec.plugin + ' status' : 'load order change'), timeout: 1600 });
    },
    redo: function() {
        var rec = Applier.redo();
        if (!rec) { UI.toast({ type: 'info', message: 'Nothing to redo', timeout: 1200 }); return; }
        UI.toast({ type: 'info', message: 'Redid ' + (rec.type === 'param' ? rec.plugin + ' › ' + rec.key : rec.type === 'status' ? rec.plugin + ' status' : 'load order change'), timeout: 1600 });
    },

    refreshHeader: function() {
        if (!this.built) return;
        var changes = Store.changes();
        var stale = Store.anyStale();
        var n = changes.length;
        var canWrite = PluginsFile.canWrite();
        this.unsavedBtn.classList.toggle('gb-hidden', n === 0);
        this.unsavedBtn.querySelector('.gb-unsaved-text').textContent = n + (n === 1 ? ' unsaved' : ' unsaved');
        this.saveBtn.disabled = !(n > 0 && canWrite);
        this.saveMenuBtn.disabled = !(canWrite || n > 0);
        this.saveBtn.setAttribute('data-tip', canWrite ? 'Save ' + n + ' edit' + (n === 1 ? '' : 's') + ' to js/plugins.js|Ctrl+S' : 'Saving needs an RPG Maker playtest (NW.js). Edits stay in this browser session.');
        this.reloadBtn.classList.toggle('has-dot', stale.length > 0);
        this.reloadBtn.setAttribute('data-tip', stale.length ? stale.length + ' plugin' + (stale.length === 1 ? '' : 's') + ' waiting for reload|Ctrl+R' : 'Reload game|Ctrl+R');
        if (this.stripDot) this.stripDot.classList.toggle('gb-hidden', n === 0 && !stale.length);
        var entries = Registry.installed();
        var live = entries.filter(function(e) { return e.plugin.status && Registry.hasLive(e); }).length;
        var enabled = entries.filter(function(e) { return e.plugin.status; }).length;
        this.subtitleEl.textContent = entries.length + ' plugins · ' + enabled + ' on · ' + live + ' live';
        this.setTabDot('profiles', n > 0);
        var errs = Registry.entries.filter(function(e) { return e.health.status === 'error'; }).length;
        this.setTabDot('inspector', errs > 0);
        this.refreshStatus();
    },
    refreshStatus: function() {
        if (!this.built) return;
        var v = this.views[this.tab];
        var text = v && v.statusText ? v.statusText() : '';
        if (!text) {
            var stale = Store.anyStale();
            text = stale.length ? stale.length + ' plugin' + (stale.length === 1 ? '' : 's') + ' will pick up edits on reload' : (Env.fs ? 'Project: ' + Env.base.split('/').pop() : 'Browser session (no file writes)');
        }
        this.statusLeft.textContent = text;
    },

    _bindStoreEvents: function() {
        var self = this;
        var refresh = debounce(function() { self.refreshHeader(); }, 30);
        ['change', 'enabled', 'order', 'saved', 'reverted', 'health', 'register', 'registry', 'staged'].forEach(function(evt) { Events.on(evt, refresh); });
        Events.on('change', function(p) { if (p.plugin === PLUGIN_NAME) self._onOwnChange(p.key); });
        Events.on('health', function(p) {
            if (!p.error) return;
            UI.toast({ type: 'error', title: p.plugin, message: p.error.message, actions: [{ label: 'Inspect', onClick: function() { self.showTab('inspector'); self.views.inspector.select(p.plugin); } }] });
        });
        Events.on('reloaded', function(p) { if (self.views.plugins) self.views.plugins.flashLive(p.plugin); });
    },
    _onOwnChange: function(key) {
        if (/^theme/.test(key)) { UI.applyTheme(this.root); if (PlayerPanel.root) UI.applyTheme(PlayerPanel.root); }
        if (key === 'shrinkCanvas') this._applyShrink();
    },

    _bootToasts: function() {
        var r = GB._bootResult || {};
        var self = this;
        if (r.overlay && (r.overlay.applied || r.overlay.lateLoaded.length)) {
            var msg = r.overlay.applied + ' unsaved edit' + (r.overlay.applied === 1 ? '' : 's') + ' re-applied from your last session';
            if (r.overlay.lateLoaded.length) msg += '; ' + r.overlay.lateLoaded.join(', ') + ' loaded late (enable pending save)';
            UI.toast({ type: 'info', title: 'Edits restored', message: msg, actions: [
                { label: 'Review', onClick: function() { self.showTab('profiles'); } },
                { label: 'Discard', onClick: function() { self.discardAll(); } }] });
        }
        if (r.overlay && r.overlay.stale) UI.toast({ type: 'warn', message: r.overlay.stale + ' stored edit' + (r.overlay.stale === 1 ? ' was' : 's were') + ' dropped because plugins.js changed underneath.' });
        if (r.overlay && r.overlay.statusPending) UI.toast({ type: 'warn', message: r.overlay.statusPending + ' plugin' + (r.overlay.statusPending === 1 ? ' is' : 's are') + ' marked off but still running. Save + Reload to apply.' });
        if (!Env.fs) UI.toast({ type: 'info', message: 'Browser session: edits apply live or on reload, but cannot be written to plugins.js here.', timeout: 6000 });
    },

    save: function(opts) {
        opts = opts || {};
        var self = this;
        if (!PluginsFile.canWrite()) { UI.toast({ type: 'warn', title: 'Cannot write plugins.js', message: 'Saving needs an RPG Maker playtest (NW.js). Your edits stay active in this session.' }); return; }
        var changes = Store.changes();
        if (!changes.length) { UI.toast({ type: 'info', message: 'Nothing to save', timeout: 1500 }); if (opts.reload) GB.reload(opts); return; }
        var params = changes.filter(function(c) { return c.kind === 'param'; }).length;
        var status = changes.filter(function(c) { return c.kind === 'status'; }).length;
        var order = changes.some(function(c) { return c.kind === 'order'; });
        var parts = [];
        if (params) parts.push(params + ' parameter' + (params === 1 ? '' : 's'));
        if (status) parts.push(status + ' on/off change' + (status === 1 ? '' : 's'));
        if (order) parts.push('load order');
        function doWrite(force) {
            PluginsFile.write({ force: force }, function(err) {
                if (err && err.conflict) {
                    UI.confirm({ title: 'plugins.js changed on disk', icon: 'alert', danger: true, okLabel: 'Overwrite', message: 'js/plugins.js was modified outside Gear Box (probably the RPG Maker editor) since the game started. Overwriting will discard those external changes.' })
                        .then(function(ok) { if (ok) doWrite(true); });
                    return;
                }
                if (err) { UI.toast({ type: 'error', title: 'Save failed', message: err.message }); return; }
                self.refreshHeader();
                self.views.plugins.syncAll();
                if (self.views.profiles.built) self.views.profiles.render();
                if (self.views.order.built) self.views.order.render();
                if (opts.reload) { GB.reload(opts); return; }
                var stale = Store.anyStale();
                UI.toast({ type: 'success', title: 'Saved to js/plugins.js', message: parts.join(', ') + (stale.length ? '. ' + stale.length + ' plugin' + (stale.length === 1 ? '' : 's') + ' still need a reload.' : ''), actions: stale.length ? [{ label: 'Reload now', primary: true, onClick: function() { GB.reload({ resume: Resume.canResume() }); } }] : null });
            });
        }
        if (P.confirmPluginsJsWrite) {
            UI.confirm({ title: 'Write js/plugins.js?', icon: 'save', okLabel: opts.reload ? 'Save & reload' : 'Save', message: 'This writes ' + parts.join(', ') + ' into js/plugins.js' + (P.backupPluginsJs ? ' (a .gearbox.bak backup is written first)' : '') + '. If the RPG Maker editor is open, reload the project there afterwards.' })
                .then(function(ok) { if (ok) doWrite(false); });
        } else doWrite(false);
    },
    discardAll: function() {
        var self = this;
        var n = Store.changes().length;
        if (!n) { UI.toast({ type: 'info', message: 'No edits to discard', timeout: 1500 }); return; }
        UI.confirm({ title: 'Discard ' + n + ' edit' + (n === 1 ? '' : 's') + '?', danger: true, okLabel: 'Discard', message: 'All unsaved parameter, on/off and load-order edits go back to what js/plugins.js has. Live plugins revert immediately; others on reload.' })
            .then(function(ok) {
                if (!ok) return;
                Applier.revertAll();
                self.views.plugins.syncAll();
                if (self.views.profiles.built) self.views.profiles.render();
                if (self.views.order.built) self.views.order.render();
                UI.toast({ type: 'success', message: 'Edits discarded' });
            });
    },
    about: function() {
        UI.modal({ title: 'ED5 Gear Box v' + GB.VERSION, icon: 'gear', body: function(el) {
            el.appendChild(h('p', { text: 'In-game control center for every plugin in this project. Edits apply live for plugins registered with the Gear Box API and on reload for everything else.' }));
            el.appendChild(h('p', { html: '<b>Environment</b>: ' + (Env.isNwjs() ? 'NW.js' : 'Browser') + (Env.isTest() ? ' (playtest)' : '') + ' · file writes ' + (Env.fs ? 'available' : 'unavailable') + '<br><b>Project</b>: ' + escapeHtml(Env.base || location.pathname) }));
            el.appendChild(h('p', { text: 'Register your plugin with ED5.GearBox.register(name, { reload: fn }) to make it live. See the plugin help for the full API.' }));
        } });
    }
};

//=============================================================================
// 21. Plugins tab
//=============================================================================

function PluginsView() { View.call(this, 'plugins', 'Plugins', 'sliders'); this.rows = {}; this.query = ''; this.filter = 'all'; }
PluginsView.prototype = Object.create(View.prototype);
PluginsView.prototype.constructor = PluginsView;

PluginsView.prototype.build = function() {
    var self = this;
    this.filter = Panel.layout.filter || 'all';
    this.searchInput = h('input', { class: 'gb-input', type: 'search', placeholder: 'Search plugins and parameters…', spellcheck: 'false', 'aria-label': 'Search' });
    var clearBtn = UI.button({ icon: 'x', ghost: true, size: 'sm', tip: 'Clear', cls: 'gb-hidden', onClick: function() { self.searchInput.value = ''; self.setQuery(''); self.searchInput.focus(); } });
    this.clearBtn = clearBtn;
    var kbd = h('span', { class: 'gb-kbd', text: 'Ctrl+K' });
    var search = h('div', { class: 'gb-search' }, [icon('search'), this.searchInput, h('div', { class: 'gb-search-right' }, [clearBtn, kbd])]);
    var onInput = debounce(function() { self.setQuery(self.searchInput.value); }, 160);
    this.searchInput.addEventListener('input', function() { clearBtn.classList.toggle('gb-hidden', !self.searchInput.value); kbd.classList.toggle('gb-hidden', !!self.searchInput.value); onInput(); });
    this.searchInput.addEventListener('keydown', function(ev) { if (ev.key === 'Escape' && self.searchInput.value) { ev.stopPropagation(); self.searchInput.value = ''; self.setQuery(''); clearBtn.classList.add('gb-hidden'); kbd.classList.remove('gb-hidden'); } });
    this.filtersEl = h('div', { class: 'gb-filters', role: 'group' });
    this.progressEl = h('div', { class: 'gb-progress gb-hidden' }, [h('div', { class: 'gb-progress-bar' })]);
    this.noteEl = h('div', { class: 'gb-toolbar-note gb-hidden' });
    this.el.appendChild(h('div', { class: 'gb-toolbar' }, [search, this.filtersEl, this.noteEl]));
    this.el.appendChild(this.progressEl);
    this.scrollEl = h('div', { class: 'gb-scroll' });
    this.pinnedEl = h('div', { class: 'gb-pinned' });
    this.listEl = h('div', { class: 'gb-list' });
    this.extraEl = h('div', { class: 'gb-list-extra' });
    this.emptyEl = h('div', { class: 'gb-hidden' });
    this.scrollEl.appendChild(this.pinnedEl); this.scrollEl.appendChild(this.listEl); this.scrollEl.appendChild(this.extraEl); this.scrollEl.appendChild(this.emptyEl);
    this.el.appendChild(this.scrollEl);
    this.renderFilters();
    this.renderList();
    this.loadAllSchemas();
    Events.on('change', function(p) { self.onChange(p); });
    Events.on('enabled', function(p) { self.onEnabled(p); });
    Events.on('staged', function(p) { var r = self.rows[p.plugin]; if (r) { self.updateChips(r); self.updateStageBar(r); } });
    Events.on('schema', function(p) { var r = self.rows[p.plugin]; if (r) { self.updateChips(r); if (r.awaiting) { r.awaiting = false; self.buildBody(r); } } });
    Events.on('health', function(p) { var r = self.rows[p.plugin]; if (r) self.updateChips(r); });
    Events.on('register', function(p) { var r = self.rows[p.plugin]; if (r) { self.updateChips(r); if (r.bodyBuilt) { r.bodyBuilt = false; clear(r.body); if (r.open) self.buildBody(r); } } });
    Events.on('order', function() { self.renderList(); });
    Events.on('registry', function() { self.renderList(); });
    Events.on('reverted', function() { self.syncAll(); });
};
PluginsView.prototype.onShow = function() { if (this.dirtyList) this.renderList(); };
PluginsView.prototype.statusText = function() {
    var visible = Object.keys(this.rows).filter(function(k) { return !this.rows[k].el.classList.contains('gb-hidden'); }, this).length;
    var total = Registry.entries.length;
    return visible === total ? total + ' plugins in load order' : visible + ' of ' + total + ' plugins shown';
};
PluginsView.prototype.focusSearch = function() { if (this.searchInput) { this.searchInput.focus(); this.searchInput.select(); } };

PluginsView.prototype.loadAllSchemas = function() {
    var self = this, bar = this.progressEl.firstChild;
    var pending = Registry.entries.some(function(e) { return e.schemaState === 'idle'; });
    if (!pending) return;
    this.progressEl.classList.remove('gb-hidden');
    Registry.ensureAll(function(done, total) { bar.style.width = Math.round(done / total * 100) + '%'; }, function() {
        setTimeout(function() { self.progressEl.classList.add('gb-hidden'); bar.style.width = '0'; }, 250);
        self.renderFilters();
        if (self.query) self.renderList();
        each(self.rows, function(r) { self.updateChips(r); });
        if (Panel.views.commands && Panel.views.commands.built) Panel.views.commands.render();
    });
};

PluginsView.prototype.filters = function() {
    var entries = Registry.entries;
    function count(fn) { return entries.filter(fn).length; }
    return [
        { id: 'all', label: 'All', count: count(function() { return true; }) },
        { id: 'ed5', label: 'ED5', count: count(function(e) { return e.source === 'ed5'; }) },
        { id: 'third', label: 'Other', count: count(function(e) { return e.source !== 'ed5'; }) },
        { id: 'live', label: 'Live', count: count(function(e) { return e.installed && e.plugin.status && Registry.hasLive(e); }), icon: 'zap' },
        { id: 'edited', label: 'Edited', count: count(function(e) { return e.installed && (Store.dirtyKeys(e.name).length || Store.isStatusDirty(e.name)); }) },
        { id: 'stale', label: 'Reload', count: count(function(e) { return e.installed && Store.staleReason(e.name); }), warn: true },
        { id: 'off', label: 'Off', count: count(function(e) { return e.installed && !e.plugin.status; }) },
        { id: 'pinned', label: 'Pinned', count: Panel.layout.pinned.length, icon: 'pin' }
    ];
};
PluginsView.prototype.renderFilters = function() {
    var self = this;
    clear(this.filtersEl);
    this.filters().forEach(function(f) {
        if ((f.id === 'edited' || f.id === 'stale' || f.id === 'pinned' || f.id === 'live') && !f.count && self.filter !== f.id) return;
        var b = h('button', { class: 'gb-filter' + (self.filter === f.id ? ' is-active' : '') + (f.warn ? ' is-warn' : ''), type: 'button' }, [f.icon ? icon(f.icon) : null, h('span', { text: f.label }), h('span', { class: 'gb-count', text: String(f.count) })]);
        b.addEventListener('click', function() { self.filter = f.id; Panel.layout.filter = f.id; Panel.saveLayout(); self.renderFilters(); self.renderList(); });
        self.filtersEl.appendChild(b);
    });
};

PluginsView.prototype.setQuery = function(q) {
    q = String(q || '').trim();
    if (q === this.query) return;
    var had = !!this.query;
    this.query = q;
    if (q && Registry.entries.some(function(e) { return e.schemaState === 'idle' || e.schemaState === 'loading'; })) this.loadAllSchemas();
    // forms rendered with a search filter must be rebuilt when the query changes
    var self = this;
    each(this.rows, function(r) { if (r.bodyBuilt && (r.builtWithQuery || q)) { r.bodyBuilt = false; clear(r.body); if (r.open || q) self.buildBody(r); } });
    this.renderList();
    if (had && !q) this.scrollEl.scrollTop = 0;
};

PluginsView.prototype.matches = function(entry) {
    var f = this.filter;
    if (f === 'ed5' && entry.source !== 'ed5') return false;
    if (f === 'third' && entry.source === 'ed5') return false;
    if (f === 'live' && !(entry.installed && entry.plugin.status && Registry.hasLive(entry))) return false;
    if (f === 'edited' && !(entry.installed && (Store.dirtyKeys(entry.name).length || Store.isStatusDirty(entry.name)))) return false;
    if (f === 'stale' && !(entry.installed && Store.staleReason(entry.name))) return false;
    if (f === 'off' && !(entry.installed && !entry.plugin.status)) return false;
    if (f === 'pinned' && !Panel.layout.pinned.some(function(p) { return p.split('::')[0] === entry.name; })) return false;
    if (!this.query) return true;
    var q = this.query.toLowerCase();
    if (entry.name.toLowerCase().indexOf(q) >= 0) return true;
    if ((entry.plugin.description || '').toLowerCase().indexOf(q) >= 0) return true;
    var s = entry.schema;
    if (s) {
        for (var i = 0; i < s.params.length; i++) {
            var p = s.params[i];
            if (p.name.toLowerCase().indexOf(q) >= 0 || (p.text || '').toLowerCase().indexOf(q) >= 0 || (p.desc || '').toLowerCase().indexOf(q) >= 0) return true;
        }
    }
    return false;
};

PluginsView.prototype.renderList = function() {
    var self = this;
    if (!this.visible) { this.dirtyList = true; return; }
    this.dirtyList = false;
    if (!Registry.built) Registry.build();
    var entries = Registry.entries.slice();
    var installed = entries.filter(function(e) { return e.installed; }).sort(function(a, b) { return a.index - b.index; });
    var apiOnly = entries.filter(function(e) { return !e.installed && !e.notInstalled; });
    var onDisk = entries.filter(function(e) { return e.notInstalled; }).sort(function(a, b) { return a.name < b.name ? -1 : 1; });
    var shown = 0;
    clear(this.listEl); clear(this.extraEl);
    installed.forEach(function(e) {
        var row = self.row(e);
        var vis = self.matches(e);
        row.el.classList.toggle('gb-hidden', !vis);
        if (vis) shown++;
        self.listEl.appendChild(row.el);
        if (vis && self.query && !row.open && self.fieldMatch(e)) self.setOpen(row, true, true);
        else if (!self.query && row.open && row.autoOpened) self.setOpen(row, false, true);
    });
    if (apiOnly.length) {
        var g1 = h('div', { class: 'gb-group-title' }, [h('span', { text: 'Registered via API only' }), h('span', { class: 'gb-line' })]);
        var n1 = 0;
        var frag1 = document.createDocumentFragment();
        apiOnly.forEach(function(e) { var row = self.row(e); var vis = self.matches(e); row.el.classList.toggle('gb-hidden', !vis); if (vis) n1++; frag1.appendChild(row.el); });
        if (n1) { this.extraEl.appendChild(g1); this.extraEl.appendChild(frag1); shown += n1; }
    }
    if (onDisk.length && this.filter !== 'off' && this.filter !== 'edited' && this.filter !== 'stale' && this.filter !== 'live' && this.filter !== 'pinned') {
        var n2 = 0, frag2 = document.createDocumentFragment();
        onDisk.forEach(function(e) { var row = self.row(e); var vis = self.matches(e); row.el.classList.toggle('gb-hidden', !vis); if (vis) n2++; frag2.appendChild(row.el); });
        if (n2) {
            this.extraEl.appendChild(h('div', { class: 'gb-group-title', 'data-tip': 'Files in js/plugins that are not listed in plugins.js' }, [icon('folder'), h('span', { text: 'In folder, not in plugin list' }), h('span', { class: 'gb-line' })]));
            this.extraEl.appendChild(frag2); shown += n2;
        }
    }
    this.renderPinned();
    clear(this.emptyEl);
    this.emptyEl.classList.toggle('gb-hidden', shown > 0);
    if (!shown) {
        var msg = this.query ? 'Nothing matches "' + this.query + '"' : 'No plugins in this filter';
        this.emptyEl.appendChild(UI.empty('search', msg, this.query ? 'Search looks at plugin names, descriptions, parameter labels and keys.' : 'Try another filter.', UI.button({ label: 'Show all', size: 'sm', onClick: function() { self.filter = 'all'; self.searchInput.value = ''; self.query = ''; self.renderFilters(); self.renderList(); } })));
    }
    Panel.refreshStatus();
};
PluginsView.prototype.fieldMatch = function(entry) {
    if (!this.query || !entry.schema) return false;
    var q = this.query.toLowerCase();
    if (entry.name.toLowerCase().indexOf(q) >= 0) return false;
    return entry.schema.params.some(function(p) { return p.name.toLowerCase().indexOf(q) >= 0 || (p.text || '').toLowerCase().indexOf(q) >= 0 || (p.desc || '').toLowerCase().indexOf(q) >= 0; });
};

PluginsView.prototype.row = function(entry) {
    var self = this;
    var row = this.rows[entry.key];
    if (row) { row.entry = entry; return row; }
    row = { entry: entry, open: false, bodyBuilt: false, awaiting: false, fields: {} };
    this.rows[entry.key] = row;
    row.sw = UI.switchEl(!!entry.plugin.status, function(next) {
        if (entry.notInstalled) { UI.toast({ type: 'info', message: 'Add this plugin to the list first (expand the row).' }); return false; }
        var r = Applier.setEnabled(entry.name, next, { stage: !P.autoApply });
        if (!r.ok) { UI.toast({ type: 'error', message: r.error }); return false; }
        if (r.staged) return true;
        row.el.classList.toggle('is-off', !next);
        self.updateChips(row);
        if (!r.live) UI.toast({ type: 'warn', message: (next ? 'Enabling ' : 'Disabling ') + entry.baseName + ' needs Save + Reload.', timeout: 2600, actions: PluginsFile.canWrite() ? [{ label: 'Save & reload', primary: true, onClick: function() { Panel.save({ reload: true, resume: Resume.canResume() }); } }] : null });
        return true;
    }, { tip: 'Enable / disable' });
    row.nameEl = h('span', {});
    row.verEl = h('span', { class: 'gb-ver' });
    row.descEl = h('div', { class: 'gb-plugin-desc' });
    row.chipsEl = h('div', { class: 'gb-plugin-chips' });
    var mark = entry.source === 'ed5' ? h('span', { class: 'gb-field-dot', style: 'display:block;background:var(--gb-accent);width:7px;height:7px', 'data-tip': 'ED5 plugin' }) : null;
    row.head = h('div', { class: 'gb-plugin-head', role: 'button', 'aria-expanded': 'false' }, [
        row.sw, h('div', { class: 'gb-plugin-title' }, [h('div', { class: 'gb-plugin-name' }, [mark, row.nameEl, row.verEl]), row.descEl]), row.chipsEl, icon('chevronRight', 'gb-chev')]);
    row.body = h('div', { class: 'gb-plugin-body gb-hidden' });
    row.el = h('div', { class: 'gb-plugin' + (entry.plugin.status ? '' : ' is-off'), 'data-plugin': entry.name }, [row.head, row.body]);
    row.head.addEventListener('click', function(ev) {
        if (closest(ev.target, '.gb-switch') || closest(ev.target, '.gb-chip-clickable')) return;
        self.setOpen(row, !row.open);
    });
    this.updateHead(row);
    if (Panel.layout.expanded[entry.name] && !this.query) this.setOpen(row, true, true);
    return row;
};
PluginsView.prototype.updateHead = function(row) {
    var e = row.entry;
    clear(row.nameEl).appendChild(UI.highlight(e.name, this.query));
    row.verEl.textContent = e.version ? 'v' + e.version : '';
    var desc = (e.plugin.description || (e.schema && e.schema.desc) || '').replace(/^\[?v?[\d.]+\]?\s*(FREE|PRO)?\]?\s*/i, '');
    clear(row.descEl).appendChild(UI.highlight(desc || (e.notInstalled ? 'Not in plugins.js' : 'No description'), this.query));
    row.descEl.setAttribute('data-tip', desc && desc.length > 60 ? desc : '');
    row.sw.set(!!e.plugin.status);
    row.el.classList.toggle('is-off', !e.plugin.status);
    this.updateChips(row);
};
PluginsView.prototype.updateChips = function(row) {
    var e = row.entry, chips = row.chipsEl;
    clear(chips);
    var self = this;
    if (e.health.status === 'error') chips.appendChild(UI.chip('Error', 'danger', { icon: 'alert', tip: e.health.errors.length + ' error' + (e.health.errors.length === 1 ? '' : 's') + '. Click to inspect.', onClick: function() { Panel.showTab('inspector'); Panel.views.inspector.select(e.name); } }));
    if (e.notInstalled) chips.appendChild(UI.chip('Not listed', null, { tip: 'File exists in js/plugins but is not in plugins.js' }));
    if (e.dupEntry) chips.appendChild(UI.chip('Duplicate entry', 'danger', { tip: 'plugins.js lists this plugin twice. The engine ignores this second entry; remove it from the row menu.' }));
    else if (e.dupOf) chips.appendChild(UI.chip('Duplicate', 'danger', { tip: 'Same file name as "' + e.dupOf + '". The engine loads only the first one.' }));
    if (e.installed && e.onDisk === false) chips.appendChild(UI.chip('Missing file', 'danger', { tip: 'js/plugins/' + e.name + '.js was not found' }));
    if (e.loadedLate) chips.appendChild(UI.chip('Loaded late', 'warn', { tip: 'Enabled from an unsaved edit, so it loaded after everything else. Save + Reload to load it in order.' }));
    var staged = Applier.stagedCount(e.name);
    if (staged) chips.appendChild(UI.chip(staged + ' staged', 'info', { tip: 'Staged edits waiting for Apply' }));
    if (e.installed) {
        var dirty = Store.dirtyKeys(e.name).length + (Store.isStatusDirty(e.name) ? 1 : 0);
        var reason = Store.staleReason(e.name);
        if (reason === 'save') chips.appendChild(UI.chip('Save + reload', 'warn', { icon: 'refresh', tip: 'On/off change takes effect after Save + Reload' }));
        else if (reason === 'reload') chips.appendChild(UI.chip('Reload', 'warn', { icon: 'refresh', tip: 'Edits are kept and applied on the next reload', onClick: function() { GB.reload({ resume: Resume.canResume() }); } }));
        if (dirty) chips.appendChild(UI.chip(dirty + ' edited', 'info', { tip: dirty + ' unsaved edit' + (dirty === 1 ? '' : 's') }));
        if (e.plugin.status && Registry.hasLive(e)) chips.appendChild(UI.chip('Live', 'live', { icon: 'zap', tip: 'Registered with Gear Box: edits apply instantly' + (e.registrant.liveKeys.indexOf('*') < 0 ? ' for ' + e.registrant.liveKeys.length + ' key' + (e.registrant.liveKeys.length === 1 ? '' : 's') : '') }));
    }
    if (e.schema && e.schema.commands.length && !this.query) chips.appendChild(UI.chip(String(e.schema.commands.length), null, { icon: 'play', tip: e.schema.commands.length + ' plugin command' + (e.schema.commands.length === 1 ? '' : 's') + '. Click to open the Commands tab.', onClick: function() { Panel.showTab('commands'); Panel.views.commands.reveal(e.name); } }));
    void self;
};

PluginsView.prototype.setOpen = function(row, open, auto) {
    row.open = open;
    row.autoOpened = open ? !!auto : false;
    row.el.classList.toggle('is-open', open);
    row.head.setAttribute('aria-expanded', open ? 'true' : 'false');
    row.body.classList.toggle('gb-hidden', !open);
    if (!auto) { if (open) Panel.layout.expanded[row.entry.name] = true; else delete Panel.layout.expanded[row.entry.name]; Panel.saveLayout(); }
    if (open && !row.bodyBuilt) this.buildBody(row);
};
PluginsView.prototype.reveal = function(name, key) {
    var e = Registry.get(name);
    if (!e) return;
    var row = this.row(e);
    if (this.filter !== 'all' && !this.matches(e)) { this.filter = 'all'; Panel.layout.filter = 'all'; this.renderFilters(); this.renderList(); }
    this.setOpen(row, true);
    var self = this;
    setTimeout(function() {
        var target = key && row.fields[key] ? row.fields[key] : row.el;
        target.scrollIntoView({ block: key ? 'center' : 'start', behavior: 'smooth' });
        if (key && row.fields[key]) { row.fields[key].style.transition = 'background .4s'; row.fields[key].style.background = 'var(--gb-accent-soft)'; setTimeout(function() { row.fields[key].style.background = ''; }, 900); }
        void self;
    }, 60);
};

PluginsView.prototype.makeCtx = function(entry, row) {
    var self = this;
    var name = entry.name;
    return {
        entry: entry, mode: 'dev', search: this.query || null, structs: entry.schema ? entry.schema.structs : {},
        getValue: function(k) { return Store.value(name, k); },
        setValue: function(k, v) {
            var r = Applier.set(name, k, v, { stage: !P.autoApply });
            if (r.ok && r.changed && !r.staged) {
                self.updateChips(row);
                if (!r.live && Registry.hasLive(entry) && entry.plugin.status) UI.toast({ type: 'warn', message: k + ' is not a live key for ' + entry.baseName + '. Applies on reload.', timeout: 2200 });
            }
            return r;
        },
        isDirty: function(k) { return Store.isDirty(name, k); },
        isStale: function(k) { return Store.isStale(name, k); },
        isLive: function(k) { return !!entry.plugin.status && Registry.isLiveKey(entry, k); },
        staleReason: function() { return Store.staleReason(name); },
        isPinned: function(k) { return Panel.layout.pinned.indexOf(name + '::' + k) >= 0; },
        togglePin: function(k) {
            var id = name + '::' + k, i = Panel.layout.pinned.indexOf(id);
            if (i >= 0) Panel.layout.pinned.splice(i, 1); else Panel.layout.pinned.push(id);
            Panel.saveLayout(); self.renderPinned(); self.renderFilters();
        },
        revert: function(k) { Applier.revertKey(name, k); self.syncRow(row, k); },
        isSectionCollapsed: function(sid) { return !!Panel.layout.sections[name + '::' + sid]; },
        setSectionCollapsed: function(sid, on) { if (on) Panel.layout.sections[name + '::' + sid] = true; else delete Panel.layout.sections[name + '::' + sid]; Panel.saveLayout(); },
        extraKeys: function() {
            if (!entry.schema || entry.schema.guessed) return [];
            var map = entry.schema.paramMap, out = [];
            each(entry.plugin.parameters, function(v, k) { if (!map[k]) out.push(k); });
            return out;
        }
    };
};

PluginsView.prototype.buildBody = function(row) {
    var self = this, e = row.entry;
    if (e.schemaState !== 'ready' && e.schemaState !== 'error') {
        row.awaiting = true;
        clear(row.body).appendChild(h('div', { class: 'gb-plugin-meta' }, [h('span', { class: 'gb-spinner' }), h('span', { text: 'Reading ' + e.name + '.js…' })]));
        Registry.ensureSchema(e);
        return;
    }
    row.bodyBuilt = true;
    row.builtWithQuery = !!this.query;
    row.fields = {};
    clear(row.body);
    var schema = e.schema;
    // meta bar
    var meta = h('div', { class: 'gb-plugin-meta' });
    if (schema.author) meta.appendChild(h('span', { text: schema.author }));
    if (schema.author) meta.appendChild(h('span', { class: 'gb-sep' }));
    meta.appendChild(h('span', { class: 'gb-mono', style: 'font-size:11px', text: e.name + '.js' }));
    if (e.registrant && e.registrant.version) { meta.appendChild(h('span', { class: 'gb-sep' })); meta.appendChild(h('span', { text: 'API v' + e.registrant.version })); }
    if (schema.guessed) { meta.appendChild(h('span', { class: 'gb-sep' })); meta.appendChild(UI.chip('Header not parsed', 'warn', { tip: e.schemaError ? String(e.schemaError.message || e.schemaError) : 'Types guessed from stored values' })); }
    var right = h('span', { class: 'gb-row', style: 'margin-left:auto' });
    if (schema.help) {
        var helpBtn = UI.button({ icon: 'help', ghost: true, size: 'sm', label: 'Help', onClick: function() { var open = help.classList.toggle('gb-hidden'); Panel.layout.helpOpen[e.name] = !open; Panel.saveLayout(); } });
        right.appendChild(helpBtn);
    }
    if (schema.url || (e.registrant && e.registrant.docs)) right.appendChild(UI.button({ icon: 'external', ghost: true, size: 'sm', tip: 'Open documentation', onClick: function() { var u = (e.registrant && e.registrant.docs) || schema.url; try { if (Env.isNwjs()) nw.Shell.openExternal(u); else window.open(u, '_blank'); } catch (ex) { copyText(u); UI.toast({ type: 'info', message: 'Link copied: ' + u }); } } }));
    right.appendChild(UI.button({ icon: 'activity', ghost: true, size: 'sm', tip: 'Inspect runtime state', onClick: function() { Panel.showTab('inspector'); Panel.views.inspector.select(e.name); } }));
    if (schema.commands.length) right.appendChild(UI.button({ icon: 'command', ghost: true, size: 'sm', tip: schema.commands.length + ' plugin commands', onClick: function() { Panel.showTab('commands'); Panel.views.commands.reveal(e.name); } }));
    right.appendChild(UI.button({ icon: 'more', ghost: true, size: 'sm', tip: 'More', onClick: function(ev, b) {
        UI.menu(b, [
            { label: 'Copy parameters as JSON', icon: 'copy', onClick: function() { copyText(JSON.stringify(e.plugin.parameters, null, 2)); UI.toast({ type: 'success', message: 'Parameters copied' }); } },
            { label: 'Paste parameters from JSON', icon: 'upload', onClick: function() { self.pasteParams(e, row); } },
            { label: 'Reset all to plugin defaults', icon: 'reset', disabled: schema.guessed, onClick: function() { self.resetAll(e, row); } },
            { label: 'Revert all edits', icon: 'undo', disabled: !Store.dirtyKeys(e.name).length, onClick: function() { Store.dirtyKeys(e.name).forEach(function(k) { Applier.revertKey(e.name, k); }); self.syncRow(row); } },
            { sep: true },
            { label: 'Collapse all sections', onClick: function() { Array.prototype.forEach.call(row.body.querySelectorAll('.gb-section.is-open>.gb-section-head'), function(hd) { hd.click(); }); } },
            { label: 'Expand all sections', onClick: function() { Array.prototype.forEach.call(row.body.querySelectorAll('.gb-section:not(.is-open)>.gb-section-head'), function(hd) { hd.click(); }); } },
            { sep: true },
            e.installed && !e.notInstalled ? { label: 'Remove from plugin list', icon: 'trash', danger: true, onClick: function() { self.removeFromList(e); } } : null
        ]);
    } }));
    meta.appendChild(right);
    row.body.appendChild(meta);
    if (e.notInstalled) {
        row.body.appendChild(UI.callout('info', 'Not in the plugin list', 'This file is in js/plugins but plugins.js does not list it. Add it to edit its parameters; it loads (disabled) after Save + Reload.', [
            UI.button({ label: 'Add to plugin list', icon: 'plus', primary: true, size: 'sm', onClick: function() { Applier.addToList(e.name); self.renderList(); self.reveal(e.name); UI.toast({ type: 'success', message: e.name + ' added (disabled). Save to write plugins.js.' }); } })]));
    }
    if (schema.help) {
        var help = h('div', { class: 'gb-plugin-help' + (Panel.layout.helpOpen[e.name] ? '' : ' gb-hidden'), text: schema.help.trim() });
        row.body.appendChild(help);
    }
    if (!P.autoApply && e.installed) { row.stageBar = h('div', { class: 'gb-stage-bar gb-hidden' }); row.body.appendChild(row.stageBar); this.updateStageBar(row); }
    if (e.registrant && e.registrant.panel) {
        var custom = h('div', { class: 'gb-plugin-custom' });
        tryCall(e.registrant.panel, e.registrant, [custom, { h: h, icon: icon, ui: UI, get: function(k) { return Store.value(e.name, k); }, set: function(k, v) { return Applier.set(e.name, k, v, { source: 'panel-custom' }); }, toast: UI.toast.bind(UI) }], function(ex) { Registry.recordError(e.name, ex, 'panel'); });
        if (custom.childNodes.length) row.body.appendChild(custom);
    }
    var ctx = this.makeCtx(e, row);
    var form = Form.renderForm(schema, ctx, {});
    Array.prototype.forEach.call(form.querySelectorAll('.gb-field[data-key]'), function(f) { row.fields[f.getAttribute('data-key')] = f; });
    if (!form._gbCount) {
        form.appendChild(this.query ? h('div', { class: 'gb-list-empty', style: 'padding:10px 14px', text: 'No parameters match "' + this.query + '" (plugin name matched).' }) : UI.empty('sliders', 'No parameters', schema.guessed ? 'This plugin declares no parameters and none are stored in plugins.js.' : 'This plugin has no @param entries in its header.'));
    }
    row.form = form;
    row.body.appendChild(form);
    if (this.query && row.fieldMatchCount === undefined) { /* keep */ }
};
PluginsView.prototype.updateStageBar = function(row) {
    if (!row.stageBar) return;
    var e = row.entry, n = Applier.stagedCount(e.name);
    row.stageBar.classList.toggle('gb-hidden', !n);
    clear(row.stageBar);
    if (!n) return;
    var self = this;
    row.stageBar.appendChild(h('span', { class: 'gb-grow', text: n + ' staged edit' + (n === 1 ? '' : 's') }));
    row.stageBar.appendChild(UI.button({ label: 'Discard', size: 'sm', ghost: true, onClick: function() { Applier.discardStaged(e.name); self.syncRow(row); } }));
    row.stageBar.appendChild(UI.button({ label: 'Apply', size: 'sm', primary: true, onClick: function() { Applier.applyStaged(e.name); self.syncRow(row); } }));
};
PluginsView.prototype.syncRow = function(row, key) {
    if (!row.bodyBuilt) { this.updateChips(row); return; }
    each(row.fields, function(f, k) { if (!key || k === key) { if (f._gbSync) f._gbSync(); } });
    Array.prototype.forEach.call(row.body.querySelectorAll('.gb-section'), function(s) { if (s._gbRefreshDots) s._gbRefreshDots(); });
    this.updateHead(row);
    this.updateStageBar(row);
};
PluginsView.prototype.syncAll = function() {
    var self = this;
    each(this.rows, function(r) { self.syncRow(r); });
    this.renderPinned();
    this.renderFilters();
};
PluginsView.prototype.onChange = function(p) {
    var row = this.rows[p.plugin];
    if (row) {
        var f = row.fields[p.key];
        if (f && f._gbSync) f._gbSync();
        Array.prototype.forEach.call(row.body.querySelectorAll('.gb-section'), function(s) { if (s._gbRefreshDots) s._gbRefreshDots(); });
        this.updateChips(row);
    }
    if (this.pinnedFields && this.pinnedFields[p.plugin + '::' + p.key]) { var pf = this.pinnedFields[p.plugin + '::' + p.key]; if (pf._gbSync) pf._gbSync(); }
    this.renderFiltersSoon();
};
PluginsView.prototype.onEnabled = function(p) {
    var row = this.rows[p.plugin];
    if (row) { row.sw.set(p.enabled); row.el.classList.toggle('is-off', !p.enabled); this.updateChips(row); }
    this.renderFiltersSoon();
};
PluginsView.prototype.renderFiltersSoon = function() {
    var self = this;
    if (!this._rf) this._rf = debounce(function() { self.renderFilters(); }, 200);
    this._rf();
};
PluginsView.prototype.flashLive = function(name) {
    var row = this.rows[name];
    if (!row) return;
    var chip = row.chipsEl.querySelector('.gb-chip-live');
    if (chip) { chip.style.transition = 'transform .15s'; chip.style.transform = 'scale(1.12)'; setTimeout(function() { chip.style.transform = ''; }, 180); }
};

PluginsView.prototype.renderPinned = function() {
    var self = this;
    clear(this.pinnedEl);
    this.pinnedFields = {};
    var pins = Panel.layout.pinned.slice();
    if (!pins.length || this.query) return;
    var host = h('div', { class: 'gb-field-list', style: 'border-bottom:1px solid var(--gb-border)' });
    var title = h('div', { class: 'gb-group-title' }, [icon('pin'), h('span', { text: 'Favorites' }), h('span', { class: 'gb-line' }), UI.button({ label: 'Clear', size: 'xs', ghost: true, onClick: function() { Panel.layout.pinned = []; Panel.saveLayout(); self.renderPinned(); self.renderFilters(); each(self.rows, function(r) { self.syncRow(r); }); } })]);
    this.pinnedEl.appendChild(title);
    this.pinnedEl.appendChild(host);
    pins.forEach(function(id) {
        var parts = id.split('::'), name = parts[0], key = parts[1];
        var e = Registry.get(name);
        if (!e) return;
        Registry.ensureSchema(e, function() {
            var param = e.schema && e.schema.paramMap[key];
            if (!param) return;
            var row = self.row(e);
            var ctx = self.makeCtx(e, row);
            var f = Form.renderField(param, ctx, {});
            var lbl = f.querySelector('.gb-field-label');
            if (lbl) lbl.insertBefore(h('span', { class: 'gb-plugin-ref', style: 'color:var(--gb-text-dim);font-weight:400;cursor:pointer', text: e.baseName + ' ›', onClick: function() { self.reveal(e.name, key); } }), lbl.firstChild);
            self.pinnedFields[id] = f;
            host.appendChild(f);
        });
    });
};

PluginsView.prototype.pasteParams = function(e, row) {
    var self = this;
    UI.prompt({ title: 'Paste parameters for ' + e.baseName, message: 'A JSON object of key: value (Plugin Manager string format). Keys not in the plugin are ignored.', multiline: true, okLabel: 'Apply' }).then(function(text) {
        if (text === null) return;
        var obj = safeJson(text, null);
        if (!isObj(obj)) { UI.toast({ type: 'error', message: 'That is not a JSON object' }); return; }
        var n = 0;
        each(obj, function(v, k) { if (e.schema && e.schema.paramMap[k] && !e.schema.paramMap[k].isSection) { var r = Applier.set(e.name, k, typeof v === 'string' ? v : JSON.stringify(v)); if (r.ok && r.changed) n++; } });
        self.syncRow(row);
        UI.toast({ type: 'success', message: n + ' parameter' + (n === 1 ? '' : 's') + ' applied' });
    });
};
PluginsView.prototype.resetAll = function(e, row) {
    var self = this;
    UI.confirm({ title: 'Reset ' + e.baseName + ' to defaults?', okLabel: 'Reset', danger: true, message: 'Every parameter goes back to the @default in the plugin header. You can still undo or revert before saving.' }).then(function(ok) {
        if (!ok) return;
        var n = 0;
        e.schema.params.forEach(function(p) { if (p.isSection || p.def === undefined) return; var r = Applier.set(e.name, p.name, String(p.def)); if (r.ok && r.changed) n++; });
        self.syncRow(row);
        UI.toast({ type: 'success', message: n + ' parameter' + (n === 1 ? '' : 's') + ' reset' });
    });
};
PluginsView.prototype.removeFromList = function(e) {
    var self = this;
    UI.confirm({ title: 'Remove ' + e.baseName + ' from plugins.js?', okLabel: 'Remove', danger: true, message: 'The file stays in js/plugins. The entry (and its stored parameters) is removed from the list when you Save. The plugin keeps running until reload.' }).then(function(ok) {
        if (!ok) return;
        Applier.removeFromList(e.key);
        delete self.rows[e.key];
        self.renderList();
        UI.toast({ type: 'success', message: e.name + ' removed from list (unsaved)' });
    });
};

//=============================================================================
// 22. Inspector tab
//=============================================================================

function InspectorView() { View.call(this, 'inspector', 'Inspector', 'activity'); this.current = ''; this.timer = null; this.gaugeEls = {}; }
InspectorView.prototype = Object.create(View.prototype);
InspectorView.prototype.constructor = InspectorView;

InspectorView.prototype.build = function() {
    var self = this;
    this.combo = UI.combo({ value: '', options: [], placeholder: 'Choose a plugin to inspect…', onChange: function(v) { self.select(v); } });
    this.el.appendChild(h('div', { class: 'gb-toolbar' }, [h('div', { class: 'gb-row' }, [h('div', { class: 'gb-grow' }, [this.combo]), UI.button({ icon: 'refresh', ghost: true, tip: 'Refresh', onClick: function() { self.render(); } })])]));
    this.scrollEl = h('div', { class: 'gb-scroll' });
    this.el.appendChild(this.scrollEl);
    Events.on('register', function() { self.refreshOptions(); if (self.visible) self.render(); });
    Events.on('registry', function() { self.refreshOptions(); });
    Events.on('health', function(p) { if (self.visible && (p.plugin === self.current || !self.current)) self.render(); });
    this.refreshOptions();
    this.current = Panel.layout.inspectorPlugin || '';
    if (this.current && !Registry.get(this.current)) this.current = '';
    this.combo.setValue(this.current);
};
InspectorView.prototype.refreshOptions = function() {
    if (!this.combo) return;
    var opts = [{ value: '', label: 'Overview', sub: '' }];
    Registry.entries.filter(function(e) { return e.installed || e.source === 'api-only'; }).sort(function(a, b) {
        var ra = a.registrant ? 0 : 1, rb = b.registrant ? 0 : 1;
        if (ra !== rb) return ra - rb;
        return a.index - b.index;
    }).forEach(function(e) { opts.push({ value: e.name, label: e.name, sub: e.registrant ? 'API' : (e.health.status === 'error' ? 'error' : '') }); });
    this.combo.setOptions(opts);
};
InspectorView.prototype.onShow = function() { this.refreshOptions(); this.render(); this.startPolling(); };
InspectorView.prototype.onHide = function() { this.stopPolling(); };
InspectorView.prototype.statusText = function() { var e = Registry.get(this.current); return e ? 'Inspecting ' + e.name : 'Inspector overview'; };
InspectorView.prototype.select = function(name) {
    this.current = name || '';
    Panel.layout.inspectorPlugin = this.current; Panel.saveLayout();
    if (this.combo) this.combo.setValue(this.current);
    if (this.built) this.render();
};
InspectorView.prototype.startPolling = function() {
    var self = this;
    this.stopPolling();
    this.timer = setInterval(function() { self.pollGauges(); }, Math.round(1000 / P.pollGaugesHz));
};
InspectorView.prototype.stopPolling = function() { if (this.timer) clearInterval(this.timer); this.timer = null; };
InspectorView.prototype.pollGauges = function() {
    var e = Registry.get(this.current);
    if (!e || !e.registrant) return;
    var self = this;
    each(e.registrant.gauges, function(fn, label) {
        var el = self.gaugeEls[label];
        if (!el) return;
        var v = tryCall(fn, e.registrant, [], function(ex) { el.textContent = 'ERR'; el.setAttribute('data-tip', ex.message); });
        if (v === undefined) return;
        var text = typeof v === 'number' ? (Number.isInteger(v) ? String(v) : v.toFixed(2)) : (isObj(v) || Array.isArray(v) ? Con.format(v, 1) : String(v));
        if (el.textContent !== text) el.textContent = text;
    });
};

InspectorView.prototype.card = function(title, iconName, body, right) {
    var head = h('div', { class: 'gb-card-head' }, [icon(iconName), h('span', { text: title })]);
    if (right) head.appendChild(h('div', { class: 'gb-right' }, right));
    return h('div', { class: 'gb-card' }, [head, body]);
};

InspectorView.prototype.render = function() {
    var self = this;
    clear(this.scrollEl);
    this.gaugeEls = {};
    var e = Registry.get(this.current);
    if (!e) { this.renderOverview(); return; }
    // Overview
    var facts = [];
    facts.push(['File', e.name + '.js']);
    if (e.version) facts.push(['Version', 'v' + e.version]);
    facts.push(['Status', e.installed ? (e.plugin.status ? 'Enabled' : 'Disabled') : 'Not in plugins.js']);
    facts.push(['Load order', e.index >= 0 ? '#' + (e.index + 1) : '—']);
    var ns = Namespace.guess(e);
    if (ns) facts.push(['Namespace', ns.path]);
    if (e.registrant) {
        facts.push(['Gear Box API', 'registered' + (e.registrant.version ? ' (v' + e.registrant.version + ')' : '')]);
        facts.push(['Live keys', e.registrant.liveKeys.indexOf('*') >= 0 ? 'all parameters' : (e.registrant.liveKeys.length ? e.registrant.liveKeys.join(', ') : 'none (reload)')]);
        facts.push(['Runtime toggle', e.registrant.setEnabled ? 'yes (setEnabled)' : 'no']);
    } else facts.push(['Gear Box API', 'not registered']);
    var table = h('div', { class: 'gb-card-body' }, facts.map(function(f) {
        return h('div', { class: 'gb-row', style: 'padding:3px 0;align-items:flex-start' }, [h('span', { class: 'gb-muted', style: 'width:110px;flex-shrink:0;font-size:11.5px', text: f[0] }), h('span', { class: 'gb-grow', style: 'word-break:break-word', text: f[1] })]);
    }));
    this.scrollEl.appendChild(this.card(e.name, 'box', table, [UI.button({ icon: 'sliders', ghost: true, size: 'sm', tip: 'Edit parameters', onClick: function() { Panel.showTab('plugins'); Panel.views.plugins.reveal(e.name); } })]));

    // Health
    var errs = e.health.errors;
    var healthBody = h('div', { class: 'gb-card-body' + (errs.length ? ' gb-flush' : '') });
    if (!errs.length) healthBody.appendChild(h('div', { class: 'gb-row gb-health-ok' }, [icon('check'), h('span', { text: 'No errors recorded this session' })]));
    else errs.slice().reverse().forEach(function(er) {
        healthBody.appendChild(h('div', { class: 'gb-error-item' }, [
            h('div', { class: 'gb-row' }, [h('span', { class: 'gb-dim gb-small', text: fmtTime(er.time) }), h('span', { class: 'gb-muted gb-small', text: er.context })]),
            h('div', { class: 'gb-error-msg', text: er.message }), er.stack ? h('div', { class: 'gb-error-stack', text: er.stack.split('\n').slice(0, 6).join('\n') }) : null]));
    });
    this.scrollEl.appendChild(this.card('Health', errs.length ? 'alert' : 'heart', healthBody, errs.length ? [UI.button({ label: 'Clear', size: 'sm', ghost: true, onClick: function() { Registry.clearHealth(e.name); self.render(); Panel.refreshHeader(); } })] : null));

    // Gauges / actions
    if (e.registrant && Object.keys(e.registrant.gauges).length) {
        var grid = h('div', { class: 'gb-gauges' });
        each(e.registrant.gauges, function(fn, label) {
            var val = h('div', { class: 'gb-gauge-value', text: '…' });
            self.gaugeEls[label] = val;
            grid.appendChild(h('div', { class: 'gb-gauge' }, [val, h('div', { class: 'gb-gauge-label', text: label, 'data-tip': label })]));
        });
        this.scrollEl.appendChild(this.card('Gauges', 'activity', h('div', { class: 'gb-card-body' }, [grid]), [h('span', { class: 'gb-dim gb-small', text: P.pollGaugesHz + ' Hz' })]));
        this.pollGauges();
    }
    if (e.registrant && Object.keys(e.registrant.actions).length) {
        var acts = h('div', { class: 'gb-actions' });
        each(e.registrant.actions, function(fn, label) {
            acts.appendChild(UI.button({ label: label, icon: 'play', size: 'sm', onClick: function() {
                var r = tryCall(fn, e.registrant, [], function(ex) { Registry.recordError(e.name, ex, 'action "' + label + '"'); });
                if (r !== undefined && r !== null) UI.toast({ type: 'info', title: label, message: Con.format(r, 1) });
                else UI.toast({ type: 'success', message: label + ' done', timeout: 1500 });
                self.pollGauges();
            } }));
        });
        this.scrollEl.appendChild(this.card('Actions', 'zap', h('div', { class: 'gb-card-body' }, [acts])));
    }
    // Namespace tree
    if (ns) {
        var tree = h('div', { class: 'gb-tree', style: 'padding:4px 0' });
        this.renderTree(tree, ns.obj, 0, 2);
        this.scrollEl.appendChild(this.card(ns.path, 'code', h('div', { class: 'gb-card-body gb-flush' }, [tree]), [UI.button({ icon: 'terminal', ghost: true, size: 'sm', tip: 'Open in console', onClick: function() { Panel.showTab('console'); Panel.views.console.setInput(ns.path); } })]));
    } else {
        this.scrollEl.appendChild(this.card('Namespace', 'code', h('div', { class: 'gb-card-body gb-muted', text: 'No global namespace found for this plugin. Pass namespace: "ED5.Foo" in ED5.GearBox.register() to show its API here.' })));
    }
    // Registration snippet
    if (!e.registrant) {
        var snippet = [
            "if (window.ED5 && ED5.GearBox) {",
            "  ED5.GearBox.register('" + e.baseName + "', {",
            "    version: '" + (e.version || '1.0.0') + "',",
            ns ? "    namespace: '" + ns.path + "'," : "    namespace: 'ED5.YourNamespace',",
            "    // called with the fresh parameter map; reuse your boot parser",
            "    reload: function(params) { /* re-read params and refresh */ },",
            "    gauges: { 'Example': function() { return 0; } }",
            "  });",
            "}"
        ].join('\n');
        this.scrollEl.appendChild(this.card('Make it live', 'zap', h('div', { class: 'gb-card-body' }, [
            h('p', { class: 'gb-muted', text: 'This plugin reads its parameters once at startup, so edits apply on reload. Add this to its file to get live apply, gauges and actions:' }),
            h('pre', { class: 'gb-code', text: snippet })]), [UI.button({ icon: 'copy', ghost: true, size: 'sm', tip: 'Copy snippet', onClick: function() { copyText(snippet); UI.toast({ type: 'success', message: 'Snippet copied' }); } })]));
    }
};
InspectorView.prototype.renderTree = function(host, obj, depth, autoDepth) {
    var self = this;
    var kids = Namespace.children(obj);
    if (!kids.length) { host.appendChild(h('div', { class: 'gb-tree-row gb-dim', style: '--gb-depth:' + depth, text: '(no enumerable members)' })); return; }
    kids.slice(0, 200).forEach(function(k) {
        var row = h('div', { class: 'gb-tree-row' + (k.expandable ? ' is-expandable' : ''), style: '--gb-depth:' + depth }, [
            k.expandable ? icon('chevronRight', 'gb-chev') : h('span', { style: 'width:12px;flex-shrink:0' }),
            h('span', { class: 'gb-tree-key' + (k.type === 'function' || k.type === 'class' ? ' is-fn' : ''), text: k.key }),
            h('span', { class: 'gb-tree-preview', text: k.preview }), h('span', { class: 'gb-tree-type', text: k.type })]);
        var childHost = null;
        function toggle() {
            if (!k.expandable) return;
            if (childHost) { var open = childHost.classList.toggle('gb-hidden'); row.querySelector('.gb-chev').style.transform = open ? '' : 'rotate(90deg)'; return; }
            childHost = h('div', {});
            self.renderTree(childHost, k.value, depth + 1, 0);
            row.parentNode.insertBefore(childHost, row.nextSibling);
            row.querySelector('.gb-chev').style.transform = 'rotate(90deg)';
        }
        row.addEventListener('click', toggle);
        row.addEventListener('dblclick', function() { copyText(k.key); });
        host.appendChild(row);
        if (autoDepth > 0 && k.expandable && depth < 1 && kids.length <= 12) toggle();
    });
    if (kids.length > 200) host.appendChild(h('div', { class: 'gb-tree-row gb-dim', style: '--gb-depth:' + depth, text: '… ' + (kids.length - 200) + ' more' }));
};
InspectorView.prototype.renderOverview = function() {
    var self = this;
    var registered = Registry.entries.filter(function(e) { return e.registrant; });
    var errored = Registry.entries.filter(function(e) { return e.health.status === 'error'; });
    var body = h('div', { class: 'gb-card-body' });
    body.appendChild(h('p', { class: 'gb-muted', text: registered.length + ' plugin' + (registered.length === 1 ? '' : 's') + ' registered with the Gear Box API. Pick a plugin above to see its state, gauges, actions and namespace.' }));
    this.scrollEl.appendChild(this.card('Overview', 'activity', body));
    if (errored.length) {
        var list = h('div', {});
        errored.forEach(function(e) {
            var last = e.health.errors[e.health.errors.length - 1];
            var row = h('div', { class: 'gb-error-item', style: 'cursor:pointer' }, [h('div', { class: 'gb-row' }, [h('b', { text: e.name }), h('span', { class: 'gb-dim gb-small', text: e.health.errors.length + ' error' + (e.health.errors.length === 1 ? '' : 's') })]), h('div', { class: 'gb-error-msg', text: last.message })]);
            row.addEventListener('click', function() { self.select(e.name); });
            list.appendChild(row);
        });
        this.scrollEl.appendChild(this.card('Plugins with errors', 'alert', h('div', { class: 'gb-card-body gb-flush' }, [list])));
    }
    if (registered.length) {
        var reg = h('div', {});
        registered.forEach(function(e) {
            var row = h('div', { class: 'gb-profile', style: 'cursor:pointer' }, [icon('zap'), h('div', { class: 'gb-profile-main' }, [h('div', { class: 'gb-profile-name', text: e.name }), h('div', { class: 'gb-profile-desc', text: (Object.keys(e.registrant.gauges).length + ' gauges · ' + Object.keys(e.registrant.actions).length + ' actions · ' + (e.registrant.liveKeys.indexOf('*') >= 0 ? 'all keys live' : e.registrant.liveKeys.length + ' live keys')) })]), icon('chevronRight', 'gb-chev')]);
            row.addEventListener('click', function() { self.select(e.name); });
            reg.appendChild(row);
        });
        this.scrollEl.appendChild(this.card('Registered plugins', 'zap', h('div', { class: 'gb-card-body gb-flush' }, [reg])));
    }
    if (typeof ED5 === 'object') {
        var tree = h('div', { class: 'gb-tree', style: 'padding:4px 0' });
        this.renderTree(tree, ED5, 0, 0);
        this.scrollEl.appendChild(this.card('ED5 namespace', 'code', h('div', { class: 'gb-card-body gb-flush' }, [tree])));
    }
};

//=============================================================================
// 23. Commands tab
//=============================================================================

function CommandsView() { View.call(this, 'commands', 'Commands', 'command'); this.query = ''; this.history = []; this.openCmds = {}; }
CommandsView.prototype = Object.create(View.prototype);
CommandsView.prototype.constructor = CommandsView;

CommandsView.prototype.build = function() {
    var self = this;
    this.searchInput = h('input', { class: 'gb-input', type: 'search', placeholder: 'Search commands…', spellcheck: 'false' });
    this.searchInput.addEventListener('input', debounce(function() { self.query = self.searchInput.value.trim(); self.render(); }, 150));
    this.el.appendChild(h('div', { class: 'gb-toolbar' }, [h('div', { class: 'gb-search' }, [icon('search'), this.searchInput])]));
    this.scrollEl = h('div', { class: 'gb-scroll' });
    this.el.appendChild(this.scrollEl);
    this.render();
    if (Registry.entries.some(function(e) { return e.schemaState === 'idle'; })) Registry.ensureAll(null, function() { self.render(); });
};
CommandsView.prototype.onShow = function() { this.render(); };
CommandsView.prototype.statusText = function() { return this.count + ' plugin command' + (this.count === 1 ? '' : 's') + ' available'; };
CommandsView.prototype.reveal = function(name) {
    this.revealName = name;
    this.render();
    var card = this.scrollEl.querySelector('[data-plugin="' + name + '"]');
    if (card) card.scrollIntoView({ block: 'start', behavior: 'smooth' });
};
CommandsView.prototype.handlerKey = function(entry, cmd) {
    var keys = [entry.baseName + ':' + cmd.name, entry.name + ':' + cmd.name];
    for (var i = 0; i < keys.length; i++) if (PluginManager._commands && typeof PluginManager._commands[keys[i]] === 'function') return keys[i];
    return null;
};
CommandsView.prototype.render = function() {
    var self = this;
    clear(this.scrollEl);
    this.count = 0;
    var q = this.query.toLowerCase();
    if (this.history.length) {
        var hist = h('div', {});
        this.history.slice(0, 6).forEach(function(hrec) {
            hist.appendChild(h('div', { class: 'gb-profile' }, [icon('clock'), h('div', { class: 'gb-profile-main' }, [h('div', { class: 'gb-profile-name', text: hrec.cmd.text || hrec.cmd.name }), h('div', { class: 'gb-profile-desc', text: hrec.entry.baseName + (Object.keys(hrec.args).length ? ' · ' + JSON.stringify(hrec.args) : '') })]),
                UI.button({ icon: 'play', size: 'sm', tip: 'Run again', onClick: function() { self.run(hrec.entry, hrec.cmd, hrec.args); } })]));
        });
        this.scrollEl.appendChild(h('div', { class: 'gb-card' }, [h('div', { class: 'gb-card-head' }, [icon('clock'), h('span', { text: 'Recent' }), h('div', { class: 'gb-right' }, [UI.button({ label: 'Clear', size: 'xs', ghost: true, onClick: function() { self.history = []; self.render(); } })])]), h('div', { class: 'gb-card-body gb-flush' }, [hist])]));
    }
    var entries = Registry.installed().filter(function(e) { return e.schema && e.schema.commands.length; }).sort(function(a, b) { return (b.plugin.status - a.plugin.status) || (a.index - b.index); });
    var any = false;
    entries.forEach(function(e) {
        var cmds = e.schema.commands.filter(function(c) { return !q || c.name.toLowerCase().indexOf(q) >= 0 || (c.text || '').toLowerCase().indexOf(q) >= 0 || (c.desc || '').toLowerCase().indexOf(q) >= 0 || e.name.toLowerCase().indexOf(q) >= 0; });
        if (!cmds.length) return;
        any = true;
        self.count += cmds.length;
        var list = h('div', {});
        cmds.forEach(function(c) { list.appendChild(self.commandRow(e, c)); });
        var head = h('div', { class: 'gb-card-head' }, [icon('box'), h('span', { class: 'gb-ellipsis', text: e.name }), e.plugin.status ? null : UI.chip('Off', null, { tip: 'Plugin is disabled; its commands are not registered' }), h('div', { class: 'gb-right' }, [h('span', { class: 'gb-dim gb-small', text: cmds.length + (cmds.length === 1 ? ' command' : ' commands') })])]);
        self.scrollEl.appendChild(h('div', { class: 'gb-card', 'data-plugin': e.name }, [head, h('div', { class: 'gb-card-body gb-flush' }, [list])]));
    });
    if (!any) this.scrollEl.appendChild(UI.empty('command', q ? 'No commands match "' + this.query + '"' : 'No plugin commands found', q ? '' : (Registry.entries.some(function(e) { return e.schemaState === 'idle' || e.schemaState === 'loading'; }) ? 'Reading plugin headers…' : 'Plugins declare commands with @command in their header.')));
    Panel.refreshStatus();
};
CommandsView.prototype.commandRow = function(entry, cmd) {
    var self = this;
    var id = entry.name + '::' + cmd.name;
    var handler = this.handlerKey(entry, cmd);
    var body = h('div', { class: 'gb-list-item-body' });
    var head = h('div', { class: 'gb-list-item-head', style: 'padding:8px 10px' }, [icon('chevronRight', 'gb-chev'),
        h('div', { class: 'gb-grow' }, [h('div', { style: 'font-weight:600', text: cmd.text || cmd.name }), h('div', { class: 'gb-muted gb-small gb-ellipsis', text: cmd.desc || cmd.name })]),
        handler ? null : UI.chip('No handler', 'warn', { tip: 'The plugin has not registered this command (disabled, or a different name)' }),
        UI.button({ icon: 'play', size: 'sm', primary: true, tip: 'Run', disabled: !handler, onClick: function() { self.run(entry, cmd, self.collectArgs(id, cmd)); } })]);
    var row = h('div', { class: 'gb-list-item' + (this.openCmds[id] ? ' is-open' : ''), style: 'border-bottom:1px solid var(--gb-border)' }, [head, body]);
    var built = false;
    function build() {
        if (built) return; built = true;
        var args = self.openCmds[id] && self.openCmds[id].args ? self.openCmds[id].args : {};
        self.openCmds[id] = { open: true, args: args };
        if (!cmd.args.length) { body.appendChild(h('div', { class: 'gb-list-empty', text: 'No arguments.' })); return; }
        var env = { structs: entry.schema.structs, mode: 'dev' };
        cmd.args.forEach(function(a) {
            if (!has(args, a.name)) args[a.name] = Codec.parse(a, a.def, env.structs);
            var isBool = a.type.kind === 'boolean' && !a.type.isArray;
            var frame = Form.frame({ label: a.text || a.name, key: a.name, desc: a.desc, isBool: isBool });
            var ctrl = Form.renderControl(a, args[a.name], function(v) { args[a.name] = v; }, env);
            if (isBool) frame.setBoolControl(ctrl); else frame.controlHost.appendChild(ctrl);
            body.appendChild(frame.el);
        });
    }
    if (this.openCmds[id] && this.openCmds[id].open) build();
    head.addEventListener('click', function(ev) {
        if (closest(ev.target, '.gb-btn')) return;
        var open = !row.classList.contains('is-open');
        row.classList.toggle('is-open', open);
        self.openCmds[id] = self.openCmds[id] || { args: {} }; self.openCmds[id].open = open;
        if (open) build();
    });
    return row;
};
CommandsView.prototype.collectArgs = function(id, cmd) {
    var state = this.openCmds[id];
    var out = {};
    var structs = {};
    cmd.args.forEach(function(a) {
        var v = state && state.args && has(state.args, a.name) ? state.args[a.name] : Codec.parse(a, a.def, structs);
        out[a.name] = Codec.serialize(a, v, structs);
    });
    return out;
};
CommandsView.prototype.run = function(entry, cmd, args) {
    var key = this.handlerKey(entry, cmd);
    if (!key) { UI.toast({ type: 'error', message: 'No handler registered for ' + cmd.name }); return; }
    var pluginKey = key.split(':')[0];
    var interpreter = typeof Game_Interpreter === 'function' ? new Game_Interpreter() : {};
    var t0 = Date.now();
    var ok = true;
    tryCall(function() { PluginManager.callCommand(interpreter, pluginKey, cmd.name, args); }, null, [], function(ex) { ok = false; Registry.recordError(entry.name, ex, 'command "' + cmd.name + '"'); });
    this.history.unshift({ entry: entry, cmd: cmd, args: args, time: new Date() });
    if (this.history.length > 20) this.history.pop();
    if (ok) UI.toast({ type: 'success', message: (cmd.text || cmd.name) + ' ran in ' + (Date.now() - t0) + ' ms', timeout: 1800 });
    if (this.visible) { var top = this.scrollEl.scrollTop; this.render(); this.scrollEl.scrollTop = top; }
};

//=============================================================================
// 24. Load order tab
//=============================================================================

function OrderView() { View.call(this, 'order', 'Order', 'layers'); }
OrderView.prototype = Object.create(View.prototype);
OrderView.prototype.constructor = OrderView;

OrderView.prototype.build = function() {
    var self = this;
    this.scrollEl = h('div', { class: 'gb-scroll' });
    this.el.appendChild(this.scrollEl);
    this.render();
    Events.on('order', function() { if (self.visible) self.render(); else self.stale = true; });
    Events.on('enabled', function() { if (self.visible) self.render(); else self.stale = true; });
    Events.on('schema', function() { if (self.visible) self.renderSoon(); });
    Events.on('saved', function() { if (self.visible) self.render(); else self.stale = true; });
};
OrderView.prototype.onShow = function() { if (this.stale) this.render(); this.stale = false; if (Registry.entries.some(function(e) { return e.schemaState === 'idle'; })) { var self = this; Registry.ensureAll(null, function() { self.render(); }); } };
OrderView.prototype.renderSoon = function() { var self = this; if (!this._rs) this._rs = debounce(function() { self.render(); }, 200); this._rs(); };
OrderView.prototype.statusText = function() { return Store.isOrderDirty() ? 'Load order changed (unsaved)' : 'Drag rows to reorder. Order applies after Save + Reload.'; };
OrderView.prototype.warningsFor = function(e, list) {
    var w = [];
    if (e.dupOf) w.push({ text: 'duplicate of ' + e.dupOf, tip: 'Same file name; the engine loads only the first entry' });
    if (e.onDisk === false) w.push({ text: 'file missing', tip: 'js/plugins/' + e.name + '.js not found' });
    var s = e.schema;
    if (!s) return w;
    var pos = {};
    list.forEach(function(x, i) { pos[x.baseName.toLowerCase()] = { i: i, on: x.plugin.status }; });
    s.base.forEach(function(b) {
        var p = pos[baseName(b).toLowerCase()];
        if (!p) w.push({ text: 'needs ' + b, tip: '@base ' + b + ' is not in the plugin list' });
        else if (!p.on) w.push({ text: b + ' is off', tip: '@base ' + b + ' is disabled' });
        else if (p.i > e.index) w.push({ text: 'must load after ' + b, tip: '@base ' + b + ' loads later' });
    });
    s.orderAfter.forEach(function(b) { var p = pos[baseName(b).toLowerCase()]; if (p && p.i > e.index) w.push({ text: 'should be after ' + b, tip: '@orderAfter ' + b }); });
    s.orderBefore.forEach(function(b) { var p = pos[baseName(b).toLowerCase()]; if (p && p.i < e.index) w.push({ text: 'should be before ' + b, tip: '@orderBefore ' + b }); });
    if (s.target && !/\bMZ\b/i.test(s.target)) w.push({ text: '@target ' + s.target, tip: 'Written for ' + s.target + ', not MZ' });
    return w;
};
OrderView.prototype.render = function() {
    var self = this;
    clear(this.scrollEl);
    var list = Registry.installed().sort(function(a, b) { return a.index - b.index; });
    var listEl = h('div', { class: 'gb-order-list' });
    var warnTotal = 0;
    list.forEach(function(e, i) {
        e.index = i;
        var warns = self.warningsFor(e, list);
        warnTotal += warns.length;
        var sw = UI.switchEl(!!e.plugin.status, function(next) { var r = Applier.setEnabled(e.name, next); if (!r.ok) { UI.toast({ type: 'error', message: r.error }); return false; } return true; });
        var row = h('div', { class: 'gb-order-row' + (e.plugin.status ? '' : ' is-off'), 'data-plugin': e.name }, [
            h('span', { class: 'gb-grip', 'data-tip': 'Drag to reorder' }, [icon('grip')]),
            h('span', { class: 'gb-order-index', text: String(i + 1) }), sw,
            h('div', { class: 'gb-order-main' }, [h('div', { class: 'gb-order-name' }, [h('span', { text: e.name }), e.version ? h('span', { class: 'gb-ver gb-dim', style: 'font-size:10.5px;margin-left:6px', text: 'v' + e.version }) : null]),
                warns.length ? h('div', { class: 'gb-order-warns' }, warns.map(function(w) { return UI.chip(w.text, 'warn', { icon: 'alert', tip: w.tip }); })) : null]),
            Store.isStatusDirty(e.name) ? UI.chip('edited', 'info') : null,
            h('div', { class: 'gb-order-tools' }, [
                UI.button({ icon: 'arrowUp', ghost: true, size: 'xs', tip: 'Move up', disabled: i === 0, onClick: function() { self.move(i, i - 1); } }),
                UI.button({ icon: 'arrowDown', ghost: true, size: 'xs', tip: 'Move down', disabled: i === list.length - 1, onClick: function() { self.move(i, i + 1); } }),
                UI.button({ icon: 'sliders', ghost: true, size: 'xs', tip: 'Edit parameters', onClick: function() { Panel.showTab('plugins'); Panel.views.plugins.reveal(e.name); } }),
                UI.button({ icon: 'trash', ghost: true, size: 'xs', danger: true, tip: 'Remove from list', onClick: function() { Panel.views.plugins.removeFromList(e); } })])]);
        listEl.appendChild(row);
    });
    UI.makeSortable(listEl, '.gb-order-row', '.gb-grip', function(from, to) { self.move(from, to); });
    var dirty = Store.isOrderDirty();
    this.scrollEl.appendChild(UI.callout(dirty ? 'warn' : 'info', dirty ? 'Load order changed' : 'Load order', dirty ? 'The new order is written on Save and takes effect on reload.' : 'Plugins run top to bottom. Base plugins and APIs (like Gear Box) belong at the top. ' + (warnTotal ? warnTotal + ' dependency warning' + (warnTotal === 1 ? '' : 's') + ' below.' : 'No dependency warnings.'),
        dirty ? [UI.button({ label: 'Save & reload', icon: 'save', primary: true, size: 'sm', disabled: !PluginsFile.canWrite(), onClick: function() { Panel.save({ reload: true, resume: Resume.canResume() }); } }), UI.button({ label: 'Revert order', size: 'sm', onClick: function() { Applier._setOrder(Store.baselineOrder); Overlay.recordOrder(); Events.emit('order', { order: Store.baselineOrder.slice() }); } })] : null));
    this.scrollEl.appendChild(listEl);
    var onDisk = Registry.entries.filter(function(e) { return e.notInstalled; });
    if (onDisk.length) {
        var extra = h('div', {});
        onDisk.forEach(function(e) {
            extra.appendChild(h('div', { class: 'gb-order-row' }, [h('span', { style: 'width:16px' }), h('span', { class: 'gb-order-index', text: '' }), icon('file'),
                h('div', { class: 'gb-order-main' }, [h('div', { class: 'gb-order-name', text: e.name }), h('div', { class: 'gb-muted gb-small gb-ellipsis', text: (e.schema && e.schema.desc) || '' })]),
                UI.button({ label: 'Add', icon: 'plus', size: 'sm', onClick: function() { Applier.addToList(e.name); UI.toast({ type: 'success', message: e.name + ' added (disabled)' }); } })]));
        });
        this.scrollEl.appendChild(h('div', { class: 'gb-group-title' }, [icon('folder'), h('span', { text: 'In folder, not in list' }), h('span', { class: 'gb-line' })]));
        this.scrollEl.appendChild(extra);
    }
    Panel.refreshStatus();
};
OrderView.prototype.move = function(from, to) {
    var names = Registry.installed().sort(function(a, b) { return a.index - b.index; }).map(function(e) { return e.name; });
    if (to < 0 || to >= names.length || from === to) return;
    var n = names.splice(from, 1)[0]; names.splice(to, 0, n);
    Applier.reorder(names);
};

//=============================================================================
// 25. Profiles tab (changes, profiles, presets)
//=============================================================================

function ProfilesView() { View.call(this, 'profiles', 'Profiles', 'bookmark'); }
ProfilesView.prototype = Object.create(View.prototype);
ProfilesView.prototype.constructor = ProfilesView;

ProfilesView.prototype.build = function() {
    var self = this;
    this.scrollEl = h('div', { class: 'gb-scroll' });
    this.el.appendChild(this.scrollEl);
    this.render();
    var rerender = debounce(function() { if (self.visible) self.render(); else self.stale = true; }, 80);
    ['change', 'enabled', 'order', 'saved', 'reverted', 'profiles'].forEach(function(evt) { Events.on(evt, rerender); });
};
ProfilesView.prototype.onShow = function() { this.render(); };
ProfilesView.prototype.statusText = function() { var n = Store.changes().length; return n ? n + ' unsaved edit' + (n === 1 ? '' : 's') + ' vs plugins.js' : 'No unsaved edits'; };
ProfilesView.prototype.card = function(title, iconName, body, right) {
    var head = h('div', { class: 'gb-card-head' }, [icon(iconName), h('span', { text: title })]);
    if (right) head.appendChild(h('div', { class: 'gb-right' }, right));
    return h('div', { class: 'gb-card' }, [head, body]);
};
ProfilesView.prototype.render = function() {
    var self = this;
    var top = this.scrollEl.scrollTop;
    clear(this.scrollEl);
    // Changes
    var changes = Store.changes();
    var body = h('div', { class: 'gb-card-body' + (changes.length ? ' gb-flush' : '') });
    if (!changes.length) body.appendChild(h('div', { class: 'gb-muted', text: 'Everything matches js/plugins.js.' }));
    changes.forEach(function(c) {
        var e = Registry.get(c.plugin);
        var param = e && e.schema ? e.schema.paramMap[c.key] : null;
        var structs = e && e.schema ? e.schema.structs : {};
        var main;
        if (c.kind === 'order') main = h('div', { class: 'gb-diff-main' }, [h('div', { class: 'gb-diff-key' }, [h('span', { class: 'gb-k', text: 'Load order changed' })])]);
        else if (c.kind === 'status') main = h('div', { class: 'gb-diff-main' }, [h('div', { class: 'gb-diff-key' }, [h('span', { class: 'gb-plugin-ref', text: c.plugin }), h('span', { class: 'gb-k', text: c.isNew ? 'added to list' : (c.to ? 'enabled' : 'disabled') })])]);
        else main = h('div', { class: 'gb-diff-main' }, [h('div', { class: 'gb-diff-key' }, [h('span', { class: 'gb-plugin-ref', text: c.plugin + ' ›' }), h('span', { class: 'gb-k', text: param ? Form.label(param) : c.key })]),
            h('div', { class: 'gb-diff-vals' }, [h('span', { class: 'gb-diff-from', text: c.from === undefined ? '(absent)' : Codec.summarize(param, c.from, structs, 40), 'data-tip': c.from === undefined ? '' : String(c.from).slice(0, 300) }), h('span', { class: 'gb-diff-arrow', text: '→' }), h('span', { class: 'gb-diff-to', text: c.to === undefined ? '(removed)' : Codec.summarize(param, c.to, structs, 40), 'data-tip': c.to === undefined ? '' : String(c.to).slice(0, 300) })])]);
        var row = h('div', { class: 'gb-diff-row' }, [main]);
        if (c.kind === 'param') row.appendChild(UI.button({ icon: 'sliders', ghost: true, size: 'xs', tip: 'Show field', onClick: function() { Panel.showTab('plugins'); Panel.views.plugins.reveal(c.plugin, c.key); } }));
        row.appendChild(UI.button({ icon: 'undo', ghost: true, size: 'xs', tip: 'Revert', onClick: function() {
            if (c.kind === 'param') Applier.revertKey(c.plugin, c.key);
            else if (c.kind === 'status') { if (c.isNew) Applier.removeFromList(c.plugin); else Applier.setEnabled(c.plugin, c.from); }
            else { Applier._setOrder(Store.baselineOrder); Overlay.recordOrder(); Events.emit('order', { order: Store.baselineOrder.slice() }); }
            Panel.views.plugins.syncAll();
        } }));
        body.appendChild(row);
    });
    var right = [];
    if (changes.length) {
        right.push(UI.button({ label: 'Discard all', size: 'sm', ghost: true, onClick: function() { Panel.discardAll(); } }));
        right.push(UI.button({ label: 'Save', icon: 'save', size: 'sm', primary: true, disabled: !PluginsFile.canWrite(), onClick: function() { Panel.save({}); } }));
    }
    this.scrollEl.appendChild(this.card('Unsaved edits' + (changes.length ? ' (' + changes.length + ')' : ''), 'edit', body, right));

    // Save as profile
    var nameInput = h('input', { class: 'gb-input', type: 'text', placeholder: 'Profile name (e.g. "Balance test", "Low-end PC")', spellcheck: 'false' });
    var saveAs = UI.button({ label: 'Save as profile', icon: 'bookmark', size: 'sm', primary: true, disabled: !changes.length, onClick: function() { self.saveAs(nameInput.value); } });
    nameInput.addEventListener('keydown', function(ev) { if (ev.key === 'Enter') { ev.preventDefault(); self.saveAs(nameInput.value); } });
    var form = h('div', { class: 'gb-inline-form' }, [nameInput, saveAs]);
    // Profiles list
    var list = h('div', {});
    var profiles = Profiles.list;
    if (!profiles.length) list.appendChild(h('div', { class: 'gb-list-empty', style: 'padding:12px', text: changes.length ? 'Name your current edits above to keep them as a profile you can re-apply or ship.' : 'Make some edits, then save them as a profile. Profiles capture the difference from plugins.js.' }));
    profiles.forEach(function(p) { list.appendChild(self.profileRow(p)); });
    var wrap = h('div', { class: 'gb-card-body gb-flush' }, [form, list]);
    this.scrollEl.appendChild(this.card('Profiles', 'bookmark', wrap, [
        UI.button({ icon: 'upload', ghost: true, size: 'sm', tip: 'Import profiles from JSON', onClick: function() { self.importJson(); } }),
        UI.button({ icon: 'download', ghost: true, size: 'sm', tip: 'Copy all profiles as JSON', disabled: !profiles.length, onClick: function() { copyText(Profiles.exportAllJson()); UI.toast({ type: 'success', message: 'All profiles copied as JSON' }); } })]));

    // Shipped presets
    var shipped = Profiles.shippedList();
    var sbody = h('div', { class: 'gb-card-body' + (shipped.length ? ' gb-flush' : '') });
    if (!shipped.length) sbody.appendChild(h('div', { class: 'gb-muted', text: 'Presets marked "Ship to players" are stored in Gear Box\'s own parameters and appear as one-click buttons on the player settings page.' + (P.enablePlayerMode ? '' : ' Player mode is currently off.') }));
    shipped.forEach(function(p) {
        var n = Profiles.count(p);
        sbody.appendChild(h('div', { class: 'gb-profile' }, [icon('package'), h('div', { class: 'gb-profile-main' }, [h('div', { class: 'gb-profile-name', text: p.name }), h('div', { class: 'gb-profile-desc', text: (p.description ? p.description + ' · ' : '') + n + ' value' + (n === 1 ? '' : 's') })]),
            UI.button({ label: 'Apply', size: 'sm', onClick: function() { var r = Profiles.apply(p); UI.toast({ type: 'success', message: r.applied + ' value' + (r.applied === 1 ? '' : 's') + ' applied' }); Panel.views.plugins.syncAll(); } })]));
    });
    this.scrollEl.appendChild(this.card('Shipped presets', 'package', sbody, [P.enablePlayerMode ? UI.button({ icon: 'user', ghost: true, size: 'sm', tip: 'Preview player settings page', onClick: function() { PlayerPanel.show(); } }) : null]));
    this.scrollEl.scrollTop = top;
    Panel.refreshStatus();
};
ProfilesView.prototype.profileRow = function(p) {
    var self = this;
    var n = Profiles.count(p);
    var row = h('div', { class: 'gb-profile' }, [icon(p.shipped ? 'package' : 'bookmark'),
        h('div', { class: 'gb-profile-main' }, [h('div', { class: 'gb-profile-name' }, [h('span', { text: p.name }), p.shipped ? UI.chip('Shipped', 'info', { tip: 'Included in the player settings page as a preset' }) : null]),
            h('div', { class: 'gb-profile-desc', text: (p.description ? p.description + ' · ' : '') + n + ' value' + (n === 1 ? '' : 's') + (p.updatedAt ? ' · ' + new Date(p.updatedAt).toLocaleDateString() : '') })]),
        UI.button({ label: 'Apply', size: 'sm', primary: true, onClick: function() {
            var r = Profiles.apply(p.name);
            UI.toast({ type: r.missing.length ? 'warn' : 'success', message: r.applied + ' value' + (r.applied === 1 ? '' : 's') + ' applied' + (r.missing.length ? '; missing plugins: ' + r.missing.join(', ') : '') });
            Panel.views.plugins.syncAll();
        } }),
        UI.button({ icon: 'more', ghost: true, size: 'sm', tip: 'More', onClick: function(ev, b) {
            UI.menu(b, [
                { label: 'Update from current edits', icon: 'refresh', disabled: !Store.changes().length, onClick: function() { Profiles.saveCurrent(p.name); UI.toast({ type: 'success', message: p.name + ' updated' }); } },
                { label: 'Rename', icon: 'edit', onClick: function() { UI.prompt({ title: 'Rename profile', value: p.name }).then(function(v) { if (v && v !== p.name) { if (!Profiles.rename(p.name, v)) UI.toast({ type: 'error', message: 'That name is taken or empty' }); } }); } },
                { label: 'Edit description', icon: 'edit', onClick: function() { UI.prompt({ title: 'Description for ' + p.name, value: p.description || '' }).then(function(v) { if (v !== null) Profiles.setDescription(p.name, v); }); } },
                { label: p.shipped ? 'Stop shipping to players' : 'Ship to players', icon: 'package', onClick: function() { Profiles.setShipped(p.name, !p.shipped); UI.toast({ type: 'success', message: p.shipped ? p.name + ' is now a player preset (save plugins.js to ship it)' : p.name + ' removed from player presets' }); } },
                { label: 'Copy as JSON', icon: 'copy', onClick: function() { copyText(Profiles.exportJson(p.name)); UI.toast({ type: 'success', message: 'Profile copied' }); } },
                { sep: true },
                { label: 'Delete', icon: 'trash', danger: true, onClick: function() { UI.confirm({ title: 'Delete "' + p.name + '"?', danger: true, okLabel: 'Delete', message: 'This removes the profile from this machine' + (p.shipped ? ' and from the shipped presets' : '') + '.' }).then(function(ok) { if (ok) Profiles.remove(p.name); }); } }
            ]);
            void self;
        } })]);
    return row;
};
ProfilesView.prototype.saveAs = function(name) {
    name = String(name || '').trim();
    if (!name) { UI.toast({ type: 'warn', message: 'Give the profile a name' }); return; }
    if (!Store.changes().length) { UI.toast({ type: 'warn', message: 'No edits to capture' }); return; }
    var existed = !!Profiles.get(name);
    Profiles.saveCurrent(name);
    UI.toast({ type: 'success', message: existed ? name + ' updated' : name + ' saved' });
};
ProfilesView.prototype.importJson = function() {
    UI.prompt({ title: 'Import profiles', message: 'Paste JSON exported from Gear Box.', multiline: true, okLabel: 'Import' }).then(function(text) {
        if (text === null) return;
        var r = Profiles.importJson(text);
        UI.toast({ type: r.ok ? 'success' : 'error', message: r.ok ? r.imported + ' profile' + (r.imported === 1 ? '' : 's') + ' imported' : r.error });
    });
};

//=============================================================================
// 26. Console tab
//=============================================================================

function ConsoleView() { View.call(this, 'console', 'Console', 'terminal'); this.levels = { log: true, info: true, warn: true, error: true, debug: false, result: true, input: true }; this.tag = ''; this.query = ''; this.history = []; this.histIdx = -1; this.pending = 0; }
ConsoleView.prototype = Object.create(View.prototype);
ConsoleView.prototype.constructor = ConsoleView;

ConsoleView.prototype.build = function() {
    var self = this;
    if (Panel.layout.consoleLevels) each(Panel.layout.consoleLevels, function(v, k) { self.levels[k] = !!v; });
    var bar = h('div', { class: 'gb-console-bar' });
    ['log', 'info', 'warn', 'error', 'debug'].forEach(function(level) {
        var b = h('button', { class: 'gb-filter gb-level-toggle' + (self.levels[level] ? ' is-on' : ''), type: 'button', text: level });
        b.addEventListener('click', function() { self.levels[level] = !self.levels[level]; b.classList.toggle('is-on', self.levels[level]); Panel.layout.consoleLevels = self.levels; Panel.saveLayout(); self.renderLog(); });
        bar.appendChild(b);
    });
    this.tagCombo = UI.combo({ value: '', options: [{ value: '', label: 'All tags' }], placeholder: 'tag', onChange: function(v) { self.tag = v; self.renderLog(); } });
    this.tagCombo.style.width = '130px';
    bar.appendChild(this.tagCombo);
    this.filterInput = h('input', { class: 'gb-input', type: 'search', placeholder: 'filter…', style: 'width:110px;flex:1;min-width:80px' });
    this.filterInput.addEventListener('input', debounce(function() { self.query = self.filterInput.value.trim(); self.renderLog(); }, 120));
    bar.appendChild(this.filterInput);
    bar.appendChild(UI.button({ icon: 'copy', ghost: true, size: 'sm', tip: 'Copy visible log', onClick: function() { copyText(self.visibleText()); UI.toast({ type: 'success', message: 'Log copied' }); } }));
    bar.appendChild(UI.button({ icon: 'trash', ghost: true, size: 'sm', tip: 'Clear', onClick: function() { Con.clear(); self.renderLog(); } }));
    this.el.appendChild(bar);
    this.logEl = h('div', { class: 'gb-log', role: 'log' });
    this.el.appendChild(this.logEl);
    this.input = h('input', { class: 'gb-input gb-console-input', type: 'text', placeholder: 'JavaScript… (↑↓ history, Tab completes ED5.*)', spellcheck: 'false', autocomplete: 'off' });
    this.input.addEventListener('keydown', function(ev) { self.onInputKey(ev); });
    this.input.addEventListener('input', function() { self.updateCompletion(); });
    this.el.appendChild(h('div', { class: 'gb-console-input-wrap' }, [h('span', { class: 'gb-prompt', text: '›' }), this.input, UI.button({ icon: 'play', size: 'sm', primary: true, tip: 'Run|Enter', onClick: function() { self.run(); } })]));
    Events.on('console', function(rec) { if (!self.visible) { self.pending++; if (rec && rec.level === 'error') Panel.setTabDot('console', true); return; } if (rec) self.appendLine(rec); else self.renderLog(); });
    this.renderLog();
};
ConsoleView.prototype.onShow = function() { this.renderLog(); this.pending = 0; Panel.setTabDot('console', false); var self = this; setTimeout(function() { self.input.focus(); }, 30); };
ConsoleView.prototype.onHide = function() { if (this.completion) this.completion.close(); };
ConsoleView.prototype.statusText = function() { return Con.buffer.length + ' line' + (Con.buffer.length === 1 ? '' : 's') + ' captured' + (P.captureConsole ? '' : ' (capture off)'); };
ConsoleView.prototype.setInput = function(text) { this.input.value = text; this.input.focus(); };
ConsoleView.prototype.passes = function(rec) {
    if (this.levels[rec.level] === false) return false;
    if (this.tag && rec.tag !== this.tag) return false;
    if (this.query && rec.text.toLowerCase().indexOf(this.query.toLowerCase()) < 0) return false;
    return true;
};
ConsoleView.prototype.renderLog = function() {
    var self = this;
    clear(this.logEl);
    var tags = Object.keys(Con.tags).sort();
    this.tagCombo.setOptions([{ value: '', label: 'All tags' }].concat(tags.map(function(t) { return { value: t, label: t, sub: String(Con.tags[t]) }; })));
    var shown = 0;
    Con.buffer.forEach(function(rec) { if (self.passes(rec)) { self.appendLine(rec, true); shown++; } });
    if (!shown) this.logEl.appendChild(h('div', { class: 'gb-log-line gb-log-debug', text: Con.buffer.length ? 'No lines match the current filters.' : (P.captureConsole ? 'Console output will appear here. Type JavaScript below to evaluate it.' : 'Console capture is off (Gear Box › Capture Console).') }));
    this.logEl.scrollTop = this.logEl.scrollHeight;
};
ConsoleView.prototype.appendLine = function(rec, bulk) {
    if (!bulk && !this.passes(rec)) return;
    var atBottom = this.logEl.scrollHeight - this.logEl.scrollTop - this.logEl.clientHeight < 24;
    var line = h('div', { class: 'gb-log-line gb-log-' + rec.level }, [h('span', { class: 'gb-log-time', text: fmtTime(rec.time) }), rec.tag && rec.level !== 'input' ? h('span', { class: 'gb-log-tag', text: '[' + rec.tag + ']' }) : null,
        h('span', { class: 'gb-log-text', text: rec.tag && rec.level !== 'input' ? rec.text.replace(/^\[[^\]]+\]\s*/, '') : rec.text })]);
    this.logEl.appendChild(line);
    while (this.logEl.children.length > P.consoleBufferSize) this.logEl.removeChild(this.logEl.firstChild);
    if (atBottom || bulk) this.logEl.scrollTop = this.logEl.scrollHeight;
};
ConsoleView.prototype.visibleText = function() {
    return Array.prototype.map.call(this.logEl.querySelectorAll('.gb-log-line'), function(l) { return l.textContent; }).join('\n');
};
ConsoleView.prototype.run = function() {
    var code = this.input.value.trim();
    if (!code) return;
    if (this.completion) this.completion.close();
    this.history.unshift(code); if (this.history.length > 100) this.history.pop();
    this.histIdx = -1;
    this.input.value = '';
    Con.push('input', [code]);
    var r = Con.evaluate(code);
    if (r.ok) {
        if (r.value && typeof r.value.then === 'function') {
            Con.push('result', ['(promise pending)']);
            r.value.then(function(v) { Con.push('result', [v]); }, function(e) { Con.push('error', [e]); });
        } else Con.push('result', [r.value]);
    } else Con.push('error', [r.error && r.error.stack ? r.error.stack.split('\n').slice(0, 3).join('\n') : String(r.error)]);
    Panel.refreshStatus();
};
ConsoleView.prototype.onInputKey = function(ev) {
    var self = this;
    if (this.completion && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp' || ev.key === 'Tab' || ev.key === 'Enter')) {
        if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { ev.preventDefault(); this.moveCompletion(ev.key === 'ArrowDown' ? 1 : -1); return; }
        if (ev.key === 'Tab' || (ev.key === 'Enter' && this.compIdx >= 0)) { ev.preventDefault(); this.acceptCompletion(); return; }
    }
    if (ev.key === 'Enter') { ev.preventDefault(); this.run(); return; }
    if (ev.key === 'Tab') { ev.preventDefault(); this.updateCompletion(true); return; }
    if (ev.key === 'ArrowUp') { ev.preventDefault(); if (this.histIdx < this.history.length - 1) { this.histIdx++; this.input.value = this.history[this.histIdx]; } return; }
    if (ev.key === 'ArrowDown') { ev.preventDefault(); if (this.histIdx > 0) { this.histIdx--; this.input.value = this.history[this.histIdx]; } else { this.histIdx = -1; this.input.value = ''; } return; }
    if (ev.key === 'Escape') { if (this.completion) { this.completion.close(); ev.stopPropagation(); } else if (this.input.value) { this.input.value = ''; ev.stopPropagation(); } return; }
    if (ev.key === 'l' && ev.ctrlKey) { ev.preventDefault(); Con.clear(); this.renderLog(); }
    void self;
};
ConsoleView.prototype.updateCompletion = function(force) {
    var self = this;
    var text = this.input.value.slice(0, this.input.selectionStart);
    var items = (force || /[\w$.]{2,}$/.test(text)) ? Con.complete(text) : [];
    if (this.completion) { this.completion.close(); this.completion = null; }
    if (!items.length) return;
    this.compItems = items; this.compIdx = force ? 0 : -1;
    this.compPrefixLen = (/[A-Za-z_$][\w$]*$/.exec(text) || [''])[0].length;
    this.completion = UI.popover(this.input, function(pop) {
        self.compList = h('div', { class: 'gb-combo-list' });
        items.forEach(function(it, i) {
            var row = h('div', { class: 'gb-combo-item' + (i === self.compIdx ? ' is-active' : ''), style: 'font-family:var(--gb-mono);font-size:12px' }, [h('span', { text: it.label }), h('span', { class: 'gb-sub', text: it.type })]);
            row.addEventListener('mousedown', function(ev) { ev.preventDefault(); });
            row.addEventListener('click', function() { self.compIdx = i; self.acceptCompletion(); });
            self.compList.appendChild(row);
        });
        pop.appendChild(self.compList);
    }, { matchWidth: true, onClose: function() { self.completion = null; } });
};
ConsoleView.prototype.moveCompletion = function(d) {
    var n = this.compItems.length;
    this.compIdx = (this.compIdx + d + n) % n;
    Array.prototype.forEach.call(this.compList.children, function(c, i) { c.classList.toggle('is-active', i === this.compIdx); }, this);
    var act = this.compList.children[this.compIdx];
    if (act) act.scrollIntoView({ block: 'nearest' });
};
ConsoleView.prototype.acceptCompletion = function() {
    var it = this.compItems[Math.max(0, this.compIdx)];
    if (!it) return;
    var pos = this.input.selectionStart;
    var before = this.input.value.slice(0, pos - this.compPrefixLen), after = this.input.value.slice(pos);
    this.input.value = before + it.label + after;
    var np = before.length + it.label.length;
    this.input.setSelectionRange(np, np);
    if (this.completion) this.completion.close();
    if (it.type === 'object' || it.type === 'function') { /* leave caret for a dot or call */ }
};

//=============================================================================
// 27. Player settings page
//=============================================================================

var PlayerPanel = GB.PlayerPanel = {
    root: null, open: false, built: false, fields: [],
    build: function() {
        if (this.built) return;
        this.built = true;
        var self = this;
        UI.injectCss();
        this.titleEl = h('div', { class: 'gb-player-title', text: P.playerTitle });
        this.bodyEl = h('div', { class: 'gb-player-body' });
        this.resetBtn = UI.button({ label: 'Reset to defaults', icon: 'reset', ghost: true, onClick: function() { self.resetAll(); } });
        var card = h('div', { class: 'gb-player', role: 'dialog', 'aria-modal': 'true', tabindex: '-1' }, [
            h('div', { class: 'gb-player-head' }, [h('div', { class: 'gb-logo' }, [icon('gear')]), this.titleEl, UI.button({ icon: 'x', ghost: true, tip: 'Close|Esc', onClick: function() { self.hide(); } })]),
            this.bodyEl,
            h('div', { class: 'gb-player-foot' }, [this.resetBtn, h('div', { class: 'gb-grow' }), UI.button({ label: 'Done', primary: true, onClick: function() { self.hide(); } })])]);
        this.card = card;
        this.root = h('div', { class: 'gb-player-backdrop gb-ui gb-hidden' }, [card]);
        UI.applyTheme(this.root);
        this.root.addEventListener('mousedown', function(ev) { if (ev.target === self.root) self.hide(); });
        this.root.addEventListener('keydown', function(ev) { if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); self.hide(); } });
        document.body.appendChild(this.root);
        UI.installTooltips(this.root);
    },
    show: function() {
        if (!this.built) this.build();
        if (!Registry.built) Registry.build();
        this.titleEl.textContent = P.playerTitle;
        this.render();
        this.root.classList.remove('gb-hidden');
        this.open = true;
        if (typeof Input !== 'undefined' && Input.clear) Input.clear();
        if (typeof TouchInput !== 'undefined' && TouchInput.clear) TouchInput.clear();
        var self = this;
        setTimeout(function() { self.card.focus(); }, 30);
        Events.emit('playerOpen', {});
    },
    hide: function() {
        if (!this.open) return;
        this.open = false;
        UI.closePopovers();
        this.root.classList.add('gb-hidden');
        var a = document.activeElement; if (a && a.blur) a.blur();
        if (typeof Input !== 'undefined' && Input.clear) Input.clear();
        Events.emit('playerClose', {});
    },
    toggle: function() { if (this.open) this.hide(); else this.show(); },
    ctxFor: function(entry) {
        return {
            mode: 'player', structs: entry.schema ? entry.schema.structs : {},
            getValue: function(k) { return Store.value(entry.name, k); },
            setValue: function(k, v) {
                var r = Applier.set(entry.name, k, v, { source: 'player' });
                if (r.ok && r.changed) PlayerStore.set(entry.name, k, v);
                return r;
            },
            isDirty: function(k) { return Store.isDirty(entry.name, k); },
            isStale: function(k) { return Store.isStale(entry.name, k); },
            isLive: function(k) { return !!entry.plugin.status && Registry.isLiveKey(entry, k); }
        };
    },
    render: function() {
        var self = this;
        clear(this.bodyEl);
        this.fields = [];
        var shipped = Profiles.shippedList();
        if (shipped.length) {
            this.bodyEl.appendChild(h('div', { class: 'gb-group-title' }, [icon('package'), h('span', { text: 'Presets' }), h('span', { class: 'gb-line' })]));
            var grid = h('div', { class: 'gb-player-presets' });
            shipped.forEach(function(p) {
                var b = h('button', { class: 'gb-preset', type: 'button' }, [icon('zap'), h('div', { class: 'gb-grow' }, [h('div', { class: 'gb-preset-name', text: p.name }), p.description ? h('div', { class: 'gb-preset-desc', text: p.description }) : null])]);
                b.addEventListener('click', function() {
                    var n = 0;
                    each(p.overrides, function(rec, plugin) { each(rec.params, function(v, k) { var r = Applier.set(plugin, k, v, { source: 'player' }); if (r.ok) { PlayerStore.set(plugin, k, v); if (r.changed) n++; } }); });
                    self.render();
                    UI.toast({ type: 'success', message: p.name + ' applied' + (n ? '' : ' (already active)'), timeout: 1800 });
                });
                grid.appendChild(b);
            });
            this.bodyEl.appendChild(grid);
        }
        var exposed = PlayerStore.exposed();
        if (!exposed.length) { this.bodyEl.appendChild(UI.empty('sliders', 'No settings exposed', 'The developer has not exposed any plugin settings yet.')); return; }
        var groups = {};
        var order = [];
        exposed.forEach(function(f) { if (!groups[f.plugin]) { groups[f.plugin] = []; order.push(f.plugin); } groups[f.plugin].push(f); });
        order.forEach(function(plugin) {
            var e = Registry.get(plugin);
            var host = h('div', { class: 'gb-field-list' });
            var title = e ? (e.schema && e.schema.desc ? e.baseName.replace(/^ED5_/, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ') : e.baseName.replace(/^ED5_/, '').replace(/_/g, ' ')) : plugin;
            self.bodyEl.appendChild(h('div', { class: 'gb-group-title' }, [h('span', { text: title }), h('span', { class: 'gb-line' })]));
            self.bodyEl.appendChild(host);
            if (!e) { host.appendChild(h('div', { class: 'gb-list-empty', text: 'Plugin "' + plugin + '" is not installed.' })); return; }
            var placeholder = h('div', { class: 'gb-list-empty' }, [h('span', { class: 'gb-spinner' }), ' Loading…']);
            host.appendChild(placeholder);
            Registry.ensureSchema(e, function() {
                placeholder.remove();
                var ctx = self.ctxFor(e);
                groups[plugin].forEach(function(f) {
                    var param = e.schema && e.schema.paramMap[f.param];
                    if (!param) { console.warn('[ED5_GearBox] Exposed field not found:', plugin, f.param); return; }
                    var el = Form.renderField(param, ctx, { override: { label: f.label, help: f.help, min: f.min, max: f.max, step: f.step } });
                    self.fields.push({ entry: e, key: f.param, el: el });
                    host.appendChild(el);
                });
            });
        });
        // a UI-less Scene_Options frame stays behind; keep player focus in the dialog
    },
    resetAll: function() {
        var self = this;
        UI.confirm({ title: 'Reset all settings?', okLabel: 'Reset', message: 'Every exposed setting returns to the game\'s default value.' }).then(function(ok) {
            if (!ok) return;
            PlayerStore.exposed().forEach(function(f) {
                var e = Registry.get(f.plugin);
                if (!e) return;
                var base = Store.baseValue(e.name, f.param);
                if (base === undefined) Applier.revertKey(e.name, f.param); else Applier.set(e.name, f.param, base, { source: 'player' });
            });
            PlayerStore.clear();
            self.render();
            UI.toast({ type: 'success', message: 'Settings reset', timeout: 1500 });
        });
    }
};

//=============================================================================
// 28. Reload & resume
//=============================================================================

var Resume = GB.Resume = {
    SAVE: 'ed5gearbox_resume',
    key: function() { return 'resume:' + Env.projectId; },
    canResume: function() {
        try {
            return typeof $gameMap !== 'undefined' && !!$gameMap && $gameMap.mapId() > 0 && typeof $gamePlayer !== 'undefined' && !!$gamePlayer &&
                   typeof DataManager !== 'undefined' && typeof StorageManager !== 'undefined' && !(typeof $gameParty !== 'undefined' && $gameParty && $gameParty.inBattle && $gameParty.inBattle());
        } catch (e) { return false; }
    },
    prepare: function() {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                if ($gameSystem && $gameSystem.onBeforeSave) $gameSystem.onBeforeSave();
                var contents = DataManager.makeSaveContents();
                StorageManager.saveObject(self.SAVE, contents).then(function() { LS.set(self.key(), { t: Date.now(), map: $gameMap.mapId() }); resolve(); }).catch(reject);
            } catch (e) { reject(e); }
        });
    },
    pending: function() { var r = LS.get(this.key(), null); return !!(r && Date.now() - r.t < 10 * 60 * 1000); },
    clear: function() { LS.remove(this.key()); try { if (StorageManager.remove) StorageManager.remove(this.SAVE); } catch (e) { /* ignore */ } },
    perform: function(onFail) {
        var self = this;
        StorageManager.loadObject(this.SAVE).then(function(contents) {
            DataManager.createGameObjects();
            DataManager.extractSaveContents(contents);
            DataManager.correctDataErrors();
            if ($gameSystem.onAfterLoad) $gameSystem.onAfterLoad();
            var mapId = $gameMap.mapId(), x = $gamePlayer.x, y = $gamePlayer.y, d = $gamePlayer.direction();
            $gamePlayer.reserveTransfer(mapId, x, y, d, 0);
            $gamePlayer.requestMapReload();
            self.clear();
            SceneManager.goto(Scene_Map);
            Events.emit('resumed', { mapId: mapId });
            console.log('[ED5_GearBox] Resumed on map ' + mapId + ' after reload.');
        }).catch(function(e) {
            self.clear();
            console.warn('[ED5_GearBox] Could not resume after reload:', e && e.message ? e.message : e);
            onFail(e);
        });
    }
};

GB.reload = function(opts) {
    opts = opts || {};
    Events.emit('reload', opts);
    function go() {
        try { if (Panel.built) Panel.hide(); } catch (e) { /* ignore */ }
        try { if (Con._orig.log) Con._orig.log.call(console, '[ED5_GearBox] Reloading game…'); } catch (e) { /* ignore */ }
        location.reload();
    }
    if (opts.resume && Resume.canResume()) {
        UI.toast({ type: 'info', message: 'Saving position and reloading…', timeout: 3000 });
        Resume.prepare().then(go, function(e) { UI.toast({ type: 'warn', message: 'Could not save position (' + (e && e.message) + '). Reloading anyway.' }); setTimeout(go, 600); });
    } else go();
};

//=============================================================================
// 29. Engine hooks
//=============================================================================

var Hooks = GB.Hooks = {
    install: function() {
        var dev = GB.isDev();
        if (typeof Input !== 'undefined' && typeof Input._onKeyDown === 'function') {
            var _Input_onKeyDown = Input._onKeyDown;
            Input._onKeyDown = function(event) {
                if (Panel.ownsEvent(event)) return;
                _Input_onKeyDown.call(this, event);
            };
            var _Input_pollGamepads = Input._pollGamepads;
            Input._pollGamepads = function() {
                if (PlayerPanel.open) { this.clear(); return; }
                _Input_pollGamepads.call(this);
            };
        }
        if (typeof TouchInput !== 'undefined') {
            ['_onMouseDown', '_onMouseMove', '_onMouseUp', '_onWheel', '_onTouchStart', '_onTouchMove', '_onTouchEnd', '_onTouchCancel'].forEach(function(name) {
                var orig = TouchInput[name];
                if (typeof orig !== 'function') return;
                TouchInput[name] = function(event) {
                    if (Panel.ownsEvent(event)) return;
                    return orig.call(this, event);
                };
            });
        }
        if (typeof Graphics !== 'undefined' && typeof Graphics._stretchWidth === 'function') {
            var _Graphics_stretchWidth = Graphics._stretchWidth;
            Graphics._stretchWidth = function() {
                var w = _Graphics_stretchWidth.call(this);
                return Panel.shrinkActive() ? Math.max(200, w - Panel.width) : w;
            };
            var _Graphics_centerElement = Graphics._centerElement;
            Graphics._centerElement = function(element) {
                _Graphics_centerElement.call(this, element);
                if (Panel.shrinkActive()) {
                    if (Panel.dock === 'right') element.style.right = Panel.width + 'px'; else element.style.left = Panel.width + 'px';
                }
            };
        }
        if (dev && typeof document !== 'undefined') {
            document.addEventListener('keydown', function(ev) {
                if (P.hotkey === 'None' || ev.key !== P.hotkey || ev.ctrlKey || ev.altKey || ev.metaKey) return;
                ev.preventDefault(); ev.stopPropagation();
                Panel.toggle();
            }, true);
        }
        if (dev && typeof Scene_Boot !== 'undefined') {
            var _Scene_Boot_start = Scene_Boot.prototype.start;
            Scene_Boot.prototype.start = function() {
                if (!Resume.pending()) { _Scene_Boot_start.call(this); return; }
                var self = this;
                Scene_Base.prototype.start.call(this);
                if (typeof SoundManager !== 'undefined' && SoundManager.preloadImportantSounds) SoundManager.preloadImportantSounds();
                if (this.resizeScreen) this.resizeScreen();
                if (this.updateDocumentTitle) this.updateDocumentTitle();
                Resume.perform(function() { if (self.startNormalGame) self.startNormalGame(); else _Scene_Boot_start.call(self); });
            };
        }
        if (dev && (P.openOnStart || Env.hasFlag('gearbox-open'))) {
            var opened = false;
            var openOnce = function() { if (opened) return; opened = true; setTimeout(function() { tryCall(function() { Panel.show(); }); }, 50); };
            ['Scene_Title', 'Scene_Map'].forEach(function(sceneName) {
                var Scene = (typeof window !== 'undefined') ? window[sceneName] : null;
                if (!Scene || !Scene.prototype) return;
                var _start = Scene.prototype.start;
                Scene.prototype.start = function() { _start.apply(this, arguments); openOnce(); };
            });
        }
        if (dev && P.openCommandInMenu && typeof Window_MenuCommand !== 'undefined' && typeof Scene_Menu !== 'undefined') {
            var _WMC_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
            Window_MenuCommand.prototype.addOriginalCommands = function() {
                _WMC_addOriginalCommands.call(this);
                this.addCommand(P.menuCommandName, 'ed5GearBox', true);
            };
            var _SM_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
            Scene_Menu.prototype.createCommandWindow = function() {
                _SM_createCommandWindow.call(this);
                var scene = this;
                this._commandWindow.setHandler('ed5GearBox', function() { Panel.show(); scene._commandWindow.activate(); });
            };
        }
        if (P.enablePlayerMode && typeof Window_Options !== 'undefined') {
            var SYM = 'ed5GearBox';
            var _WO_makeCommandList = Window_Options.prototype.makeCommandList;
            Window_Options.prototype.makeCommandList = function() { _WO_makeCommandList.call(this); this.addCommand(P.playerMenuLabel, SYM); };
            var _WO_statusText = Window_Options.prototype.statusText;
            Window_Options.prototype.statusText = function(index) { return this.commandSymbol(index) === SYM ? '' : _WO_statusText.call(this, index); };
            var _WO_processOk = Window_Options.prototype.processOk;
            Window_Options.prototype.processOk = function() {
                if (this.commandSymbol(this.index()) === SYM) { this.playOkSound(); PlayerPanel.show(); return; }
                _WO_processOk.call(this);
            };
            var _WO_cursorRight = Window_Options.prototype.cursorRight;
            Window_Options.prototype.cursorRight = function() { if (this.commandSymbol(this.index()) === SYM) return; _WO_cursorRight.apply(this, arguments); };
            var _WO_cursorLeft = Window_Options.prototype.cursorLeft;
            Window_Options.prototype.cursorLeft = function() { if (this.commandSymbol(this.index()) === SYM) return; _WO_cursorLeft.apply(this, arguments); };
            if (typeof Scene_Options !== 'undefined' && Scene_Options.prototype.maxCommands) {
                var _SO_maxCommands = Scene_Options.prototype.maxCommands;
                Scene_Options.prototype.maxCommands = function() { return _SO_maxCommands.call(this) + 1; };
            }
        }
        if (typeof PluginManager !== 'undefined' && PluginManager.registerCommand) {
            PluginManager.registerCommand(PLUGIN_NAME, 'open', function(args) { GB.open(args && args.tab); });
            PluginManager.registerCommand(PLUGIN_NAME, 'close', function() { GB.close(); });
            PluginManager.registerCommand(PLUGIN_NAME, 'toggle', function() { GB.toggle(); });
            PluginManager.registerCommand(PLUGIN_NAME, 'openPlayerSettings', function() { GB.openPlayerSettings(); });
            PluginManager.registerCommand(PLUGIN_NAME, 'applyProfile', function(args) { var r = Profiles.apply(String(args.name || ''), { source: 'command' }); if (!r.ok) console.warn('[ED5_GearBox]', r.error); });
            PluginManager.registerCommand(PLUGIN_NAME, 'setParam', function(args) { var r = Applier.set(String(args.plugin || ''), String(args.param || ''), args.value, { source: 'command' }); if (!r.ok) console.warn('[ED5_GearBox]', r.error); });
            PluginManager.registerCommand(PLUGIN_NAME, 'setEnabled', function(args) { var r = Applier.setEnabled(String(args.plugin || ''), String(args.enabled) === 'true', { source: 'command' }); if (!r.ok) console.warn('[ED5_GearBox]', r.error); });
            PluginManager.registerCommand(PLUGIN_NAME, 'reload', function(args) { if (GB.isDev()) GB.reload({ resume: String(args.resume) !== 'false' }); });
        }
    }
};

//=============================================================================
// 30. Public API
//=============================================================================

GB.register = function(name, spec) { return Registry.register(name, spec); };
GB.unregister = function(name) { Registry.unregister(name); };
GB.get = function(plugin, key) { return Store.value(plugin, key); };
GB.set = function(plugin, key, value, opts) {
    var o = { source: 'api' };
    each(opts, function(v, k) { o[k] = v; });
    return Applier.set(plugin, key, value, o);
};
GB.params = function(plugin) { var e = Registry.get(plugin); return e ? e.plugin.parameters : {}; };
GB.schema = function(plugin, cb) { Registry.ensureSchema(plugin, function(e) { if (cb) cb(e ? e.schema : null, e); }); };
GB.setEnabled = function(plugin, enabled, opts) {
    var o = { source: 'api' };
    each(opts, function(v, k) { o[k] = v; });
    return Applier.setEnabled(plugin, enabled, o);
};
GB.isEnabled = function(plugin) { var e = Registry.get(plugin); return !!(e && e.plugin.status); };
GB.list = function() {
    if (!Registry.built) Registry.build();
    return Registry.entries.map(function(e) { return { name: e.name, baseName: e.baseName, enabled: !!e.plugin.status, installed: e.installed, source: e.source, live: Registry.hasLive(e), registered: !!e.registrant, index: e.index }; });
};
GB.open = function(tab) {
    if (!GB.isDev()) { console.warn('[ED5_GearBox] Developer panel is unavailable (Developer Mode is off in this build).'); return false; }
    Panel.show(tab);
    return true;
};
GB.close = function() { if (Panel.built) Panel.hide(); };
GB.toggle = function(tab) { if (!GB.isDev()) return false; Panel.toggle(tab); return true; };
GB.isOpen = function() { return Panel.open; };
GB.addPanel = function(title, build, opts) { return Panel.addPanel(title, build, opts); };
GB.profiles = {
    list: function() { return Profiles.list.slice(); },
    get: function(name) { return Profiles.get(name); },
    apply: function(name) { return Profiles.apply(name, { source: 'api' }); },
    saveCurrent: function(name, description) { return Profiles.saveCurrent(name, description); },
    remove: function(name) { return Profiles.remove(name); },
    exportJson: function(name) { return name ? Profiles.exportJson(name) : Profiles.exportAllJson(); },
    importJson: function(json) { return Profiles.importJson(json); },
    shipped: function() { return Profiles.shippedList(); }
};
GB.log = function(plugin, level) {
    var lv = ['log', 'info', 'warn', 'error', 'debug'].indexOf(level) >= 0 ? level : 'log';
    Con.push(lv, Array.prototype.slice.call(arguments, 2), String(plugin || ''));
};
GB.save = function(cb) { PluginsFile.write({}, cb || function(err) { if (err) console.warn('[ED5_GearBox]', err.message); }); };
GB.discard = function() { Applier.revertAll(); };
GB.changes = function() { return Store.changes(); };
GB.openPlayerSettings = function() {
    if (!P.enablePlayerMode && !GB.isDev()) { console.warn('[ED5_GearBox] Player mode is disabled.'); return false; }
    PlayerPanel.show();
    return true;
};
GB.toast = function(opts) { return UI.toast(opts); };
GB.ui = UI;

//=============================================================================
// 31. Boot
//=============================================================================

Store.snapshotBaseline();
GB._bootResult = {
    player: PlayerStore.applyAtBoot(),
    overlay: Overlay.applyAtBoot()
};
Store.snapshotApplied();
Registry.build();
Profiles.load();
Health.install();
Con.install();
Hooks.install();

// Registrations queued by plugins that load before Gear Box.
(function drainPending() {
    var pending = (typeof window !== 'undefined') ? window.ED5_GearBoxPending : null;
    var items = Array.isArray(pending) ? pending.slice() : [];
    items.forEach(function(p) {
        if (Array.isArray(p)) GB.register(p[0], p[1]);
        else if (p && p.name) GB.register(p.name, p.spec || p);
    });
    if (typeof window !== 'undefined') window.ED5_GearBoxPending = { push: function(p) { if (Array.isArray(p)) GB.register(p[0], p[1]); else if (p && p.name) GB.register(p.name, p.spec || p); } };
})();

GB.register(PLUGIN_NAME, {
    version: GB.VERSION,
    namespace: 'ED5.GearBox',
    liveKeys: ['hotkey', 'dock', 'panelWidth', 'shrinkCanvas', 'rememberLayout', 'menuCommandName', 'autoApply', 'persistUnsavedEdits', 'confirmPluginsJsWrite',
               'backupPluginsJs', 'pollGaugesHz', 'captureConsole', 'consoleBufferSize', 'hideThirdParty', 'playerTitle', 'exposedFields', 'shippedProfiles',
               'themePreset', 'themeAccent', 'themeBg', 'themeText', 'themeFont', 'themeRadius', 'themeOpacity'],
    reload: function() {
        readOwnParams();
        if (Panel.built) { UI.applyTheme(Panel.root); Panel._applyShrink(); Panel.refreshHeader(); }
        if (PlayerPanel.root) UI.applyTheme(PlayerPanel.root);
    },
    gauges: {
        'Unsaved edits': function() { return Store.changes().length; },
        'Pending reload': function() { return Store.anyStale().length; },
        'Registered': function() { return Registry.entries.filter(function(e) { return e.registrant; }).length; },
        'Console lines': function() { return Con.buffer.length; }
    },
    actions: {
        'Rescan plugin folder': function() { Registry.build(); Form.invalidateCaches(); if (Panel.views.plugins) Panel.views.plugins.renderList(); },
        'Forget panel layout': function() { LS.remove(Panel.layoutKey()); return 'Layout cleared; takes effect on reload.'; },
        'Clear player settings': function() { PlayerStore.clear(); return 'Player settings cleared.'; }
    }
});

if (GB.isDev()) {
    console.log('[ED5_GearBox] v' + GB.VERSION + ' ready. Press ' + P.hotkey + ' to open the control center.' +
        (GB._bootResult.overlay.applied ? ' Re-applied ' + GB._bootResult.overlay.applied + ' unsaved edit(s).' : ''));
}

})();
