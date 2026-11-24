/*:
 * @target MZ
 * @plugindesc [MZ] [Custom Scenes 1] [v1.3] [SLT_UI Foundation]
 * @author SLT (Shawn Trapp)
 * @url http://shawn-trapp.itch.io/slt-ui-foundation-mz
 *
 * @param === Universal UI Styling ===
 * @text === Universal UI Styling ===
 * @type string
 * @default
 * 
 * @param -> For most default menus
 * @text -> For most default menus
 * @type string
 * @default
 *
 * @param ApplyTextStyle                             
 * @text Apply Text Outline Globally
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * 
 * @param TextOutlineColor                                                     
 * @text Text Outline Color
 * @type string
 * @default rgba(0,0,0,0.65)
 
 * @param TextOutlineWidth                          
 * @text Text Outline Width
 * @type number
 * @min 0
 * @default 5
 *
 * @param ApplyCursorStyle                            
 * @text Apply Cursor Styling Globally
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 *
 * @param CursorAlpha                                
 * @text Cursor Alpha
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 0.70
 *
 * @param CursorTone                                  
 * @text Cursor Tone [R,G,B,Gray]
 * @type string
 * @default 60,20,-60,0
 *
 * @param CursorBlend                                 
 * @text Cursor Blend [R,G,B,A]
 * @type string
 * @default 170,110,50,70
 * 
 * @param ApplyColorManagerOverrides
 * @text Apply ColorManager Overrides
 * @type boolean
 * @default true
 * 
 * @param ApplyListSeparators
 * @text Apply List Row Separators
 * @type boolean
 * @default true
 * @desc Adds thin divider lines to compatible list windows.
 *
 * @param == Shared Palette Colors ==
 * @text == Shared Palette Colors ==
 * @type string
 * @default
 * 
 * @param -> ColorManager Helpers
 * @text -> ColorManager Helpers
 * @type string
 * @default
 * 
 * @param -> General Utility 
 * @text -> General Utility
 * @type string
 * @default
 * 
 * @param HeaderColor
 * @text Header Color
 * @type string
 * @default #FFA300
 *
 * @param LabelColor
 * @text Label Color
 * @type string
 * @default #F4C430
 *
 * @param DividerColor
 * @text Divider Color
 * @type string
 * @default #B08A3C
 *
 * @param PositiveColor
 * @text Positive Color
 * @type string
 * @default #66FF99
 *
 * @param NegativeColor
 * @text Negative Color
 * @type string
 * @default #FF5A3C
 * 
 * @param == Helper Colors ==
 * @text == Helper Colors ==
 * @type string
 * @default
 * 
 * @param -> SLT (scenes/overlays)
 * @text -> SLT (scenes/overlays)
 * @type string
 * @default 
 * 
 * @param PanelBackground                            
 * @text Panel Background
 * @type string
 * @default rgba(28, 10, 18, 1)
 *
 * @param OverlayColor                               
 * @text Scene Overlay Color
 * @type string
 * @default rgba(22,10,14,0.85)
 * 
 * @param == SLT Suite (Custom) ==
 * @text == SLT Suite (Custom) ==
 * @type string
 * @default
 * 
 * @param -> SLT Scenes
 * @text -> SLT Scenes
 * @type string
 * @default
 *
 * @param Tier1Color
 * @text Tier 1 Color
 * @type string
 * @default #EAE1CF
 *
 * @param Tier2Color
 * @text Tier 2 Color
 * @type string
 * @default #00A86B
 *
 * @param Tier3Color
 * @text Tier 3 Color
 * @type string
 * @default #46A6FF
 *
 * @param Tier4Color
 * @text Tier 4 Color
 * @type string
 * @default #A765E8
 *
 * @param Tier5Color
 * @text Tier 5 Color
 * @type string
 * @default #DC5340
 *
 * @param Tier6Color
 * @text Tier 6 Color
 * @type string
 * @default #F08A3C
 *
 * @param Tier7Color
 * @text Tier 7 Color
 * @type string
 * @default #D6B46A
 * 
 * @param DurabilityColor
 * @text Durability Color
 * @type string
 * @default #C8A2FF
 *
 * @param PristineColor
 * @text Pristine Color
 * @type string
 * @default #7CFFB2
 *
 * @param ExcellentColor
 * @text Excellent Color
 * @type string
 * @default #5CFF8A
 *
 * @param GoodColor
 * @text Good Color
 * @type string
 * @default #B8FF7A
 *
 * @param WornColor
 * @text Worn Color
 * @type string
 * @default #FFC85A
 *
 * @param BrokenConditionColor
 * @text Broken Condition Color
 * @type string
 * @default #FF5A3C
 *
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 *
 * Lightweight UI styling for RPG Maker MZ.
 * Designed to enhance default and compatible menus without full UI overhaul.
 * Combined with RPG Maker MZ's built-in window color customization
 * (Database → System 1 → Window Color), this plugin allows broad visual
 * customization without requiring full UI replacement.
 *
 * When menus use standard draw-text color routines, label colors, divider
 * colors, positive colors, and negative colors can affect both default scenes
 * and several VisuStella scenes as well.
 * 
 * This applies to default scenes, as well as several VisuStella ones as well. 
 * In addition when using custom SLT scenes, additional options are available 
 * (tier colors, durability colors, custom panel backgrounds, and header colors).
 * 
 * Features:
 * Core / Broad Styling:
 * - Optional ColorManager overrides
 * - Optional compatible list row dividers
 * - Optional text outline and cursor styling
 *
 * Custom Scene Helpers:
 * - Fixed solid panel backgrounds for custom windows
 * - Dark scene overlay helper
 * - Shared palette helpers
 * - Tier, durability, and condition colors
 * 
 * ============================================================================
 * ■ Load Order
 * ============================================================================
 * 
 * No hard dependencies, but plugin management placement is recommended below
 * core engine and third party plugings, grouped with SLT plugins. If using
 * Item Foundation and the accompanying suite of independent item plugins, it
 * is recommended that this plugin is placed above those.
 * 
 * ============================================================================
 * ■ Plugin Parameters
 * ============================================================================
 * 
 * - Apply Text Outline Globally: Default true. Enables colored pixel outlines 
 *   for text. Potentially subtle, but noticeable with a larger width outline.
 * 
 * - Text Outline Width: Default 5. Increment this with care, as it can 
 *   overpower the text it is bordering.
 * 
 * - Cursor Alpha: Default 0.70. Opacity depending on if a more solid outline
 *   is desired.
 * 
 * - Cursor Tone: Affects the overall cursor color. Subtle effect.
 * 
 * - Cursor Blend: Like cursor tone, it is subtle, but effects the overall 
 *   highlight.
 * 
 * - Apply ColorManager Overrides: Default True. Allows UI Foundation to 
 *   override compatible ColorManager text colors.
 * 
 * - Apply List Row Separators: Default true. Creates a 2 pixel high divider 
 *   in certain menus. Somewhat restrained, but can be very noticeable with
 *   certain colors.
 * 
 * - Header Color: Hexidecimal color value for custom SLT scene headers.
 * 
 * - Label Color: Applies to scenes throughout RMMZ, and will affect labels 
 *   in some VisuStella menus as well.
 * 
 * - Divider Color: Affects the color of list row separators in core RMMZ 
 *   and some VisuStella scenes, and also dividers in custom SLT scenes. 
 * 
 * - Positive Color: Affects the color used for text such as stat boosts 
 *   gained through equipment.
 * 
 * - Negative Color: Affects the color used for text such as stat 
 *   penalties gained through equipment.
 * 
 * - Panel Background: Used in custom SLT scenes. Similar in function to
 *   changing the window color, but with adjustable opacity.
 * 
 * - Scene Overlay Color: More subtle effect than panel background. It is
 *   more apparent with lowered opacity as it is a background effect.
 * 
 * - Tier Color Assignment: Hex color adjustments to the various tiers
 *   (up to 7 supported). Requires Item Foundation to utilize.
 * 
 * - Durability Color: Text Color used for durability. Requires Durability
 *   plugin to utilize.
 * 
 * - Condition Colors: The text colors used for each of the condition 
 *   categories of durability (pristine, excellent, good, worn, broken).
 *   Requires Durability plugin to utilize.
 * 
 * ============================================================================
 * ■ Example Themes
 * ============================================================================
 * 
 * These sample palettes can be used directly or modified as a foundation for
 * more elaborate UI themes.
 * 
 * ----------------------------------
 * Warm Brown
 * ----------------------------------
 * 
 * Window Color: R 36, G 12, B 20
 * 
 * Text Outline Color: 0, 0, 0, 0.75
 * 
 * Text Outline Width: 6
 * 
 * Cursor Alpha: 0.85
 * 
 * Cursor Tone: 80, 40, -80, 0
 * 
 * Cursor Blend: 200, 140, 60, 90
 * 
 * Header Color: Unchanged
 * 
 * Label Color: #F4C430
 * 
 * Divider Color: #C9A448
 * 
 * Positive Color: #66FF99
 * 
 * Negative Color: #FF5A5A
 * 
 * ---------------------------------
 * Cool Blue 
 * ---------------------------------
 * 
 * Window Color: R 25, G 25, B 112
 * 
 * Text Outline Color: 10, 0, 30, 0.4
 * 
 * Text Outline Width: 6
 * 
 * Cursor Alpha: 0.50
 * 
 * Cursor Tone: 40, 60, -60, 0
 * 
 * Cursor Blend: 120, 170, 255, 70
 * 
 * Label Color: #A8E0FF
 * 
 * Divider Color: #F0F0E3
 * 
 * Positive Color: #7CFFD8
 * 
 * Negative Color: #FF8A8A
 * 
 * ----------------------------------
 * Cyberpunk
 * ----------------------------------
 * 
 * Window Color: 15, 21, 25
 * 
 * Text Outline Color: 20, 0, 30, 0.4
 * 
 * Text Outline Width: 5
 * 
 * Cursor Alpha: 0.95
 * 
 * Cursor Tone: 0, 40, 60, 0
 * 
 * Cursor Blend: 0, 40, 60, 0.65
 * 
 * Label Color: #FF4DFF
 * 
 * Divider Color: #00FFFF
 * 
 * Positive Color: #00FF9C
 * 
 * Negative Color: #FF6FFF
 * 
 * ============================================================================
 * ■ Compatibility Notes
 * ============================================================================
 *
 * When used alongside SLT plugins such as SLT_ItemFoundation, UI Foundation 
 * acts as the central authority for shared UI colors.
 *
 * Functions such as SLT.UI.getTierColor will override plugin-specific color 
 * settings.
 *
 * Other plugins will fall back to their own internal color settings only if 
 * UI Foundation is not present.
 *
 * ============================================================================
 * ■ Script Helpers
 * ============================================================================
 *
 *  SLT.UI.applySolidWindow(window)
 *  SLT.UI.applyTextStyle(window)
 *  SLT.UI.createDarkOverlay(scene, opacity)
 *
 *  SLT.UI.applySolidPanel(window, color)
 *  SLT.UI.refreshSolidPanel(window, color)
 *  SLT.UI.applySolidCommandPanel(window, color)
 *
 *  SLT.UI.drawHeader(window, text, x, y, width)
 *  SLT.UI.drawDivider(window, x, y, width, thickness)
 *  SLT.UI.drawLabeledValue(window, label, value, x, y, width)
 *
 *  SLT.UI.getTierColor(tier)
 *  SLT.UI.getConditionColor(condition)
 *  SLT.UI.getPositiveColor()
 *  SLT.UI.getNegativeColor()
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
 * v1.3
 * ----------------------------------------------------------------------------
 * - Added webpage link
 * - Adjusted plugin description
 * 
 * v1.2
 * ----------------------------------------------------------------------------
 * - Updated header. 
 * - Standardized supported parameter behavior across compatible SLT scenes.
 * - Removed parameter support for Solid Windows.
 * 
 * ============================================================================
 * 
 * v1.1
 * ----------------------------------------------------------------------------
 *  - Added fixed solid panel helper API for custom scenes.
 *  - Added clearer helper wrappers: applySolidPanel and refreshSolidPanel.
 *  - Stabilized solid panel behavior for scrollable, list, and detail windows.
 *  - Added compatible list row separators.
 *  - Added optional ColorManager overrides for label, positive, negative, crisis, 
 *    and death colors.
 *  - Added shared SLT palette helpers for tier, durability, and condition colors.
 * 
 * v1.0
 * -------------------------------------------------------------------------------
 * - Initial Release.
 * 
 * ===============================================================================
 */

(() => {
  "use strict";

  const PLUGIN_NAME = "SLT_UIFoundation";
  const params = PluginManager.parameters(PLUGIN_NAME);

  window.SLT = window.SLT || {};
  const SLT = window.SLT;
  SLT.UI = SLT.UI || {};

  // ---------------------------------------------------------------------------
  // Parameter Helpers
  // ---------------------------------------------------------------------------

  function boolParam(name, fallback) {
    const value = params[name];
    if (value === undefined) return fallback;
    return String(value).toLowerCase() === "true";
  }

  function numParam(name, fallback) {
    const n = Number(params[name]);
    return Number.isFinite(n) ? n : fallback;
  }

  function strParam(name, fallback) {
    const s = String(params[name] ?? "").trim();
    return s || fallback;
  }

  function parseNumberArray(text, fallback) {
    const arr = String(text || "")
      .split(",")
      .map(v => Number(v.trim()));

    if (arr.length !== fallback.length || arr.some(v => !Number.isFinite(v))) {
      return fallback.slice();
    }

    return arr;
  }

  SLT.UI.params = {
    applyTextStyle: boolParam("ApplyTextStyle", true),
    applyCursorStyle: boolParam("ApplyCursorStyle", true),
    applyGlobalFillBackground: boolParam("ApplyGlobalFillBackground", false),
    applyColorManagerOverrides: boolParam("ApplyColorManagerOverrides", true),
    applyListSeparators: boolParam("ApplyListSeparators", true),

    textOutlineColor: strParam("TextOutlineColor", "rgba(0,0,0,0.65)"),
    textOutlineWidth: numParam("TextOutlineWidth", 5),

    cursorAlpha: numParam("CursorAlpha", 0.70),
    cursorTone: parseNumberArray(params.CursorTone, [60, 20, -60, 0]),
    cursorBlend: parseNumberArray(params.CursorBlend, [170, 110, 50, 70])
  };

  // ---------------------------------------------------------------------------
  // Palette
  // ---------------------------------------------------------------------------

  SLT.UI.Colors = {
    panelBg: strParam("PanelBackground", "rgba(28, 10, 18, 1)"),
    overlay: strParam("OverlayColor", "rgba(22,10,14,0.85)"),

    header: strParam("HeaderColor", "#FFA300"),
    label: strParam("LabelColor", "#F4C430"),
    divider: strParam("DividerColor", "#B08A3C"),

    positive: strParam("PositiveColor", "#66FF99"),
    negative: strParam("NegativeColor", "#FF5A3C"),

    durability: strParam("DurabilityColor", "#C8A2FF"),
    broken: strParam("BrokenColor", "#FF5A3C"),

    tiers: {
      1: strParam("Tier1Color", "#EAE1CF"),
      2: strParam("Tier2Color", "#00A86B"),
      3: strParam("Tier3Color", "#46A6FF"),
      4: strParam("Tier4Color", "#A765E8"),
      5: strParam("Tier5Color", "#DC5340"),
      6: strParam("Tier6Color", "#F08A3C"),
      7: strParam("Tier7Color", "#D6B46A")
    },

    condition: {
      pristine: strParam("PristineColor", "#7CFFB2"),
      excellent: strParam("ExcellentColor", "#5CFF8A"),
      good: strParam("GoodColor", "#B8FF7A"),
      worn: strParam("WornColor", "#FFC85A"),
      broken: strParam("BrokenConditionColor", "#FF5A3C")
    }
  };

  // ---------------------------------------------------------------------------
  // Core Window Styling
  // ---------------------------------------------------------------------------

  SLT.UI.applySolidWindow = function(win) {
    if (!win) return;
    win.opacity = 255;
    win.backOpacity = 255;
    win.contentsOpacity = 255;
  };

  SLT.UI.applyTextStyle = function(win) {
    if (!win || !win.contents) return;
    win.contents.outlineColor = SLT.UI.params.textOutlineColor;
    win.contents.outlineWidth = SLT.UI.params.textOutlineWidth;
  };

  SLT.UI.createDarkOverlay = function(scene, color = null) {
      if (!scene) return null;

      const fillColor = color || SLT.UI.Colors.overlay;

      const sprite = new Sprite();
      sprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
      sprite.bitmap.fillRect(0, 0, Graphics.width, Graphics.height, fillColor);

      scene.addChildAt(sprite, 0);
      return sprite;
  };


  SLT.UI.applySolidFillBackground  = function(win, color = null) {
    if (!win) return;

    const fillColor = color || SLT.UI.Colors.panelBg;
    const w = Math.max(1, win.innerWidth || win.contentsWidth?.() || 1);
    const h = Math.max(1, win.innerHeight || win.contentsHeight?.() || 1);
    const pad = win.padding || 0;

    win.opacity = 255;
    win.backOpacity = 255;
    win.contentsOpacity = 255;

    if (win._backSprite) {
        win._backSprite.visible = false;
    }

    if (!win._sltFixedSolidBack) {
        win._sltFixedSolidBack = new Sprite();

        const clientIndex = win.children.indexOf(win._clientArea);
        if (clientIndex >= 0) {
            win.addChildAt(win._sltFixedSolidBack, clientIndex);
        } else {
            win.addChildAt(win._sltFixedSolidBack, 0);
        }
    }

    win._sltFixedSolidBack.x = pad;
    win._sltFixedSolidBack.y = pad;

    if (
        !win._sltFixedSolidBack.bitmap ||
        win._sltFixedSolidBack.bitmap.width !== w ||
        win._sltFixedSolidBack.bitmap.height !== h
    ) {
        win._sltFixedSolidBack.bitmap = new Bitmap(w, h);
    } else {
        win._sltFixedSolidBack.bitmap.clear();
    }

    win._sltFixedSolidBack.bitmap.fillAll(fillColor);
    win._sltFixedSolidBack.visible = true;

    win._sltSolidFillEnabled = true;
    win._sltSolidFillColor = fillColor;
  };

  SLT.UI.refreshSolidFillBackground = function(win, contentHeight = 0, color = null) {
      if (!win) return;
      const fillColor = color || win._sltSolidFillColor || SLT.UI.Colors.panelBg;
      SLT.UI.applySolidPanel(win, fillColor);
  };

  // ---------------------------------------------------------------------------
  // Solid Panel Helper Aliases
  // ---------------------------------------------------------------------------
  // These wrappers provide clearer public names while preserving the older
  // applySolidFillBackground / refreshSolidFillBackground helpers.

  SLT.UI.applySolidPanel = function(win, color = null) {
    SLT.UI.applySolidFillBackground(win, color);
  };

  SLT.UI.refreshSolidPanel = function(win, color = null) {
      SLT.UI.refreshSolidFillBackground(win, 0, color);
  };

  SLT.UI.applySolidCommandPanel = function(win, color = null) {
      SLT.UI.applySolidFillBackground(win, color);
  };

  SLT.UI.applySolidCommandPanel = function(win, color = null) {
    SLT.UI.applySolidFillBackground(win, color);

    // Ensure command windows redraw correctly
    if (win.refresh) {
        const _refresh = win.refresh.bind(win);
        win.refresh = function() {
            _refresh();
            SLT.UI.refreshSolidFillBackground(win, 0, color);
        };
    }
};

  // ---------------------------------------------------------------------------
  // Color Accessors
  // ---------------------------------------------------------------------------

  SLT.UI.getConditionColor = function(cond) {
    if (!cond) return ColorManager.normalColor();
    return SLT.UI.Colors.condition?.[String(cond).toLowerCase()] || ColorManager.normalColor();
  };

  SLT.UI.getTierColor = function(tier) {
    return SLT.UI.Colors?.tiers?.[Number(tier)] || ColorManager.normalColor();
  };

  SLT.UI.getPositiveColor = function() {
    return SLT.UI.Colors.positive;
  };

  SLT.UI.getNegativeColor = function() {
    return SLT.UI.Colors.negative;
  };

  SLT.UI.getNeutralColor = function() {
    return ColorManager.normalColor();
};

  SLT.UI.getHeaderColor = function() {
    return SLT.UI.Colors.header;
  };

  SLT.UI.getDividerColor = function() {
    return SLT.UI.Colors.divider;
  };

 SLT.UI.getValueColor = function(kind, value, index = 0) {
  const n = Number(value || 0);
  const type = String(kind || "").toLowerCase();

  if (type === "sp") {
    // Lower is better
    if (index === 4 || index === 8) {
      return n < 0 ? SLT.UI.Colors.positive : SLT.UI.Colors.negative;
    }

    // Higher is better
    if (index === 5 || index === 6 || index === 7) {
      return n > 0 ? SLT.UI.Colors.positive : SLT.UI.Colors.negative;
    }
  }

  if (n > 0) return SLT.UI.Colors.positive;
  if (n < 0) return SLT.UI.Colors.negative;

  if (type === "special") return SLT.UI.Colors.label;
  if (type === "keyword") return SLT.UI.Colors.durability;
  if (type === "durability") return SLT.UI.Colors.durability;

  return ColorManager.normalColor();
};

  // ---------------------------------------------------------------------------
  // ColorManager Overrides
  // ---------------------------------------------------------------------------

  const _CM_systemColor = ColorManager.systemColor;
  ColorManager.systemColor = function() {
    if (!SLT.UI.params.applyColorManagerOverrides) {
      return _CM_systemColor.call(this);
    }
    return SLT.UI.Colors.label || _CM_systemColor.call(this);
  };

  const _CM_powerUpColor = ColorManager.powerUpColor;
  ColorManager.powerUpColor = function() {
    if (!SLT.UI.params.applyColorManagerOverrides) {
      return _CM_powerUpColor.call(this);
    }
    return SLT.UI.Colors.positive || _CM_powerUpColor.call(this);
  };

  const _CM_powerDownColor = ColorManager.powerDownColor;
  ColorManager.powerDownColor = function() {
    if (!SLT.UI.params.applyColorManagerOverrides) {
      return _CM_powerDownColor.call(this);
    }
    return SLT.UI.Colors.negative || _CM_powerDownColor.call(this);
  };

  const _CM_crisisColor = ColorManager.crisisColor;
  ColorManager.crisisColor = function() {
    if (!SLT.UI.params.applyColorManagerOverrides) {
      return _CM_crisisColor.call(this);
    }
    return SLT.UI.Colors.condition?.worn || _CM_crisisColor.call(this);
  };

  const _CM_deathColor = ColorManager.deathColor;
  ColorManager.deathColor = function() {
    if (!SLT.UI.params.applyColorManagerOverrides) {
      return _CM_deathColor.call(this);
    }
    return SLT.UI.Colors.condition?.broken || _CM_deathColor.call(this);
  };

  // ---------------------------------------------------------------------------
  // Drawing Helpers
  // ---------------------------------------------------------------------------

  SLT.UI.drawHeader = function(win, text, x = 0, y = 0, width = null) {
    if (!win || !win.contents) return y;

    const drawWidth = width ?? win.contentsWidth();
    const prevBold = win.contents.fontBold;

    win.contents.fontBold = true;
    win.changeTextColor(SLT.UI.Colors.header);
    win.drawText(String(text || ""), x, y, drawWidth, "left");
    win.resetTextColor();
    win.contents.fontBold = prevBold;

    return y + win.lineHeight();
  };

  SLT.UI.drawDivider = function(win, x = 0, y = 0, width = null, thickness = 2) {
    if (!win || !win.contents) return y;

    const drawWidth = width ?? win.contentsWidth();
    win.contents.paintOpacity = 255;
    win.contents.fillRect(x, y, drawWidth, thickness, SLT.UI.Colors.divider);

    return y + thickness;
  };

  SLT.UI.drawLabeledValue = function(win, label, value, x = 0, y = 0, width = null) {
    if (!win || !win.contents) return y;

    const drawWidth = width ?? win.contentsWidth();
    const labelWidth = Math.floor(drawWidth * 0.48);
    const valueWidth = drawWidth - labelWidth;

    win.changeTextColor(SLT.UI.Colors.label);
    win.drawText(String(label || ""), x, y, labelWidth, "left");

    win.resetTextColor();
    win.drawText(String(value ?? ""), x + labelWidth, y, valueWidth, "right");

    return y + win.lineHeight();
  };

  SLT.UI.drawColoredText = function(win, text, color, x = 0, y = 0, width = null, align = "left") {
    if (!win || !win.contents) return y;

    const drawWidth = width ?? win.contentsWidth();

    win.changeTextColor(color || ColorManager.normalColor());
    win.drawText(String(text || ""), x, y, drawWidth, align);
    win.resetTextColor();

    return y + win.lineHeight();
  };

  // ---------------------------------------------------------------------------
  // Compatible List Row Separators
  // ---------------------------------------------------------------------------

  SLT.UI.drawListSeparator = function(win, rect) {
    if (!win || !win.contents || !rect) return;

    const x = rect.x;
    const y = rect.y + rect.height - 2;
    const w = rect.width;

    const prevOpacity = win.contents.paintOpacity;

    // Main line
    win.contents.paintOpacity = 180;
    win.contents.fillRect(x, y, w, 1, SLT.UI.Colors.divider);

    // Soft glow line (above)
    win.contents.paintOpacity = 80;
    win.contents.fillRect(x, y - 1, w, 1, "#FFFFFF");

    win.contents.paintOpacity = prevOpacity;
  };

  function patchListSeparator(windowClass) {
    if (!windowClass || !windowClass.prototype) return;
    if (windowClass.prototype._sltListSeparatorPatched) return;

    const _drawItem = windowClass.prototype.drawItem;
    if (typeof _drawItem !== "function") return;

    windowClass.prototype.drawItem = function(index) {
      _drawItem.call(this, index);

      if (!SLT.UI.params.applyListSeparators) return;
      if (!this.itemRect) return;

      const rect = this.itemRect(index);
      SLT.UI.drawListSeparator(this, rect);
    };

    windowClass.prototype._sltListSeparatorPatched = true;
  }

  patchListSeparator(Window_ItemList);
  patchListSeparator(Window_SkillList);
  patchListSeparator(Window_EquipItem);
  patchListSeparator(Window_ShopBuy);
  patchListSeparator(Window_SavefileList);

  // ---------------------------------------------------------------------------
  // Global Window Hook
  // ---------------------------------------------------------------------------

  const _Window_Base_initialize_SLT_UIFoundation = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function(rect) {
    _Window_Base_initialize_SLT_UIFoundation.call(this, rect);

    if (SLT.UI.params.applyTextStyle) {
      SLT.UI.applyTextStyle(this);
    }

  };

  // ---------------------------------------------------------------------------
  // Global Cursor Styling
  // ---------------------------------------------------------------------------

  const _Window__updateCursor_SLT_UIFoundation = Window.prototype._updateCursor;
  Window.prototype._updateCursor = function() {
    _Window__updateCursor_SLT_UIFoundation.call(this);

    if (!SLT.UI.params.applyCursorStyle) return;

    if (this._cursorSprite) {
      this._cursorSprite.alpha = SLT.UI.params.cursorAlpha;
      this._cursorSprite.setColorTone(SLT.UI.params.cursorTone);
      this._cursorSprite.setBlendColor(SLT.UI.params.cursorBlend);
    }
  };

})();