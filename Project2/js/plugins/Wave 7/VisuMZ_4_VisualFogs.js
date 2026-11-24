//=============================================================================
// VisuStella MZ - Visual Fogs
// VisuMZ_4_VisualFogs.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualFogs = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualFogs = VisuMZ.VisualFogs || {};
VisuMZ.VisualFogs.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.14] [VisualFogs]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Fogs_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Fogs are a handy feature long removed from RPG Maker since RPG Maker XP.
 * This plugin reintroduces them back into RPG Maker MZ. Fogs function similar
 * to parallaxes, except rather than being under the tile map, fogs appear
 * above the tile map and the characters. This plugin gives you an unlimited
 * amount of fogs to apply to each map alongside many controls to make the fogs
 * appear more vivid.
 * 
 * A restricted fog area system is also added to this plugin to make fogs
 * appear only within certain regions and/or terrain tags. This way, you can
 * utilize parallaxes as masked layers for obscured sections of the map.
 * 
 * Sometimes, fogs may be too intrusive to the player's visibility. A vignette
 * feature has been added to make fogs appear only on the borders or certain
 * sides of the screen. This way, fogs can still add to the atmosphere without
 * obscuring too much of the visible screen.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove fogs through map notetags.
 * * Lots of customization options for each of the fogs.
 * * Limit where fogs can be displayed on the map through regions and/or
 *   terrain tags to obscure parts of the map.
 * * Use vignettes to obscure sides of the screen without affecting the center.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove fogs as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Fogs
 * 
 * Fogs are not an inherent feature for the map editor. They need to be added
 * through map notetags or Plugin Commands.
 * 
 * Each of the fogs added through this plugin's notetags and/or commands are
 * assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that fog when needed.
 * 
 * When fogs are created, they appear above the tile map and characters, but
 * below the weather. This means they are created between the two layers when
 * the map's sprites are generated.
 * 
 * Fogs will behave very similar to parallaxes in how they move about the
 * screen. This means that if a fog is set to looping, it will loop in
 * accordance to the screen's display coordinates. This is to maintain
 * consistency with how the RPG Maker MZ engine behaves.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a fog to appear for the whole entire foreground and want
 * to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * *NOTE*: This effect does not work on looping maps.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the fog. Those parts will be little squares each,
 * equal to the size of a tile. They have soft borders due to blurring options.
 * The foggy tiles will be slightly larger than normal due to spill values.
 * 
 * You may notice that some tiles don't blur well when they are towards the
 * right and bottom sides of the screen when the blur values are higher than
 * normal. This is a known issue with Pixi JS's filters and there's not much
 * the VisuStella team can do about it. Instead, what we recommend is that you
 * use a fog vignette on an upper layer to mask the bleeding issue.
 * 
 * Each fog layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Fog layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Vignettes
 * 
 * If you don't want fogs to obscure the whole screen, use a vignette to make
 * them appear only at the sides of the screen. You can use custom vignette
 * masks or rendered ones provided by this plugin.
 * 
 * If you decide to make a custom vignette mask, create them similar to regular
 * image masks. This means that white areas of the masking image will be the
 * parts of the screen where the fog appears while the black areas of the image
 * will hide the fog. You can use gradients to make the vignette mask appear
 * more smooth.
 * 
 * Vignettes cannot be used with region and terrain tags. This is because the
 * region and terrain tag tiles move alongside the screen while vignettes are
 * always locked onto the borders of the screen. However, if you wish to use
 * both, just apply two different fog layers instead.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 * battle. There's a separate plugin for that called Visual Battle Environment.
 * The reason why fogs aren't made for battle is because the way fogs are
 * handled in map vary from how they would be handled in battle. Using the
 * Visual Fogs Plugin Commands will only alter the fog appearances when the
 * player finishes battle.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Fog-Related Notetags ===
 * 
 * ---
 *
 * <Fog id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Fog id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular fog layer for this map by default.
 * - Replace 'id' with a number value to assign to the fog.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no fog will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a fog found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 * 
 * -=-=- Optional Properties -=-=-
 * 
 * Replace the 'optional property' segment of the notetags above with any of
 * the text below to acquire their effects. You can add/remove as many of the
 * optional properties as you need.
 * 
 * ---
 * 
 * Horz Scroll: x
 * Vert Scroll: y
 * 
 * - This enables horizontal or vertical scrolling for the fog.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the fog to only scroll when the map scrolls.
 * - This has the same effect as naming a fog with "!" in front of
 *   its filename.
 * - If the filename used for this fog has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the fog.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * 
 * ---
 * 
 * Blend Mode: Normal
 * Blend Mode: Additive
 * Blend Mode: Multiply
 * Blend Mode: Screen
 * 
 * - Sets the blend mode for the icon on the fog.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the fog to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   fog each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the fog.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - This feature cannot be used with looping maps.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the fog to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the fog will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the fog can appear on.
 * - This feature cannot be used with Vignettes.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Tile Blur: x
 * 
 * - Determines how soft the borders are around the revealed fog tiles.
 * - Use larger numbers to blur them more.
 * - Use a value of zero to remove any blur.
 * 
 * ---
 * 
 * Tile Spill: x
 * 
 * - Determines how much larger to make the revealed fog tiles.
 * - Use larger numbers to spill more and make the tiles larger.
 * - Use a value of zero to not spill at all and use the exact tile sizes.
 * 
 * ---
 * 
 * Vignette: type
 * 
 * - Makes the fog appear along the edge of the screen rather than the entire
 *   visible game screen.
 * - Replace 'type' with any of the following:
 *   - Border
 *   - Horizontal
 *   - Vertical
 *   - Upper
 *   - Lower
 *   - Left
 *   - Right
 * 
 * ---
 * 
 * Custom Vignette: filename
 * 
 * - Allows you to use a custom parallax image as a vignette.
 * - Replace 'filename' with the filename of the image you want to use as
 *   a vignette found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Custom vignettes are used as masks.
 *   - White areas on the image determine the visible parts of the fog.
 *   - Black areas on the image determine the invisible parts of the fog.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Fog Plugin Commands ===
 * 
 * ---
 *
 * Fog: Add/Change Settings
 * - Add/Change settings for target fog.
 * - Doesn't affect map notes.
 * - This is temporary and will be reset upon re-entering the map.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this fog to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the fog?
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 * 
 *       Map Lock?:
 *       - Lock the fog to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the fog horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the fog vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this fog?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the fog?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this fog's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the fog?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this fog?
 *       - Does not work with 0. Leave empty to ignore.
 * 
 *       Tile Blur:
 *       - What's the blur level you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *       Tile Spill:
 *       - What's the spill amount you wish to use for tiles?
 *       - You may use JavaScript code.
 * 
 *     Vignette:
 *
 *       Type:
 *       - What vignette do you want to use for this fog?
 *       - This will override location settings.
 * 
 *       Custom:
 *       - Do you wish to use a custom vignette instead?
 *       - Automatically changes the type to "Custom".
 *
 * ---
 * 
 * Fog: Fade Opacity
 * - Fades the target fog(s) opacity to a different value.
 * - This is temporary and will be reset upon re-entering the map.
 * 
 *   ID(s):
 *   - Target which fog(s)?
 *   - Cannot target the map editor's fog.
 * 
 *   Target Opacity:
 *   - What opacity level to this value (0-255).
 *   - You may use JavaScript code to determine the value.
 * 
 *   Duration:
 *   - How many frames should this change take?
 *   - You may use JavaScript code to determine the value.
 * 
 * ---
 *
 * Fog: Remove
 * - Removes target fog(s).
 * - This is temporary and will be reset upon re-entering the map.
 *
 *   ID(s):
 *   - Remove which fog(s)?
 *   - Cannot remove the map editor's fog.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * The below are the default settings when it comes to creating fogs through
 * map notetags.
 *
 * ---
 *
 * Defaults
 * 
 *   Fog Opacity:
 *   - What is the default fog opacity level for map notetags?
 * 
 *   Blend Mode:
 *   - What is the default fog blend mode for map notetags?
 *     - Normal
 *     - Additive
 *     - Multiply
 *     - Screen
 * 
 *   Tile Blur:
 *   - What is the default fog tile blur intensity for map notetags?
 * 
 *   Tile Spill:
 *   - What is the default fog tile spill amount for map notetags?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.14: September 14, 2026
 * * Compatibility Update!
 * ** Fogs now scale with zoom settings below 100%. Update made by Arisu.
 * 
 * Version 1.13: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where making editor changes to the current map a fog has been
 *    placed through plugin command will cause it all to be erased and reset.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Added an extra note to Fog: Add/Change Settings.
 * ** Added an extra note to Fog: Fade Opacity.
 * ** Added an extra note to Fog: Remove.
 * *** This is temporary and will be reset upon re-entering the map.
 * 
 * Version 1.12: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** Uses a better algorithm to determine terrain tags.
 * 
 * Version 1.11: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where having a '!' at the start of a fog graphic file's name
 *    did not automatically incur map lock when done from plugin commands.
 *    Fix made by Arisu.
 * 
 * Version 1.10: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.09: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause a crash upon using the "Return to Title
 *    Screen" event command with the "Event Title Screen" plugin installed. Fix
 *    made by Irina.
 * 
 * Version 1.08: June 15, 2023
 * * Bug Fixes!
 * ** Fixes a visual bug involving the borders with the zoom animation upon
 *    entering a random encounter. Fix made by Arisu.
 * 
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Vignettes now work better with zoom.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the fogs to behave more like they do for
 *    pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Fogs plugin is NOT made for
 *     battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why fogs aren't made for battle is because the
 *     way fogs are handled in map vary from how they would be handled in
 *     battle. Using the Visual Fogs Plugin Commands will only alter the fog
 *     appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.04: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.03: May 28, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Added a clause we forgot to mention that region-locked fog effects only
 *    work on maps with no looping. A note will be added to the "Regions and
 *    Terrain Tags" and notetag sections. We apologize for any inconveniences
 *    this may cause.
 * 
 * Version 1.01: May 7, 2021
 * * Bug Fixes!
 * ** Cached vignettes will no longer be cleared from memory. Fix by Irina.
 *
 * Version 1.00 Official Release Date: March 5, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogAddChangeSettings
 * @text Fog: Add/Change Settings
 * @desc Add/Change settings for target fog. Doesn't affect map notes.
 * This is temporary and will be reset upon re-entering the map.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this fog to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the fog?
 * @default >>>ATTENTION<<<
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Fogs.
 * @default {"Scrolling":"","_fogZero:eval":"false","_fogLoopX:eval":"false","_fogSx:eval":"+0","_fogLoopY:eval":"false","_fogSy:eval":"+0","Appearance":"","opacity:eval":"200","blendMode:eval":"1","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]","maskBlur:eval":"10","maskSpill:eval":"10","Vignette":"","vignette:str":"None","vignetteFilename:str":""}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogFadeOpacity
 * @text Fog: Fade Opacity
 * @desc Fades the target fog(s) opacity to a different value.
 * This is temporary and will be reset upon re-entering the map.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which fog(s)?
 * Cannot target the map editor's fog.
 * @default ["1"]
 *
 * @arg targetOpacity:eval
 * @text Target Opacity
 * @desc What opacity level to this value (0-255).
 * You may use JavaScript code to determine the value.
 * @default 255
 *
 * @arg opacityDuration:eval
 * @text Duration
 * @desc How many frames should this change take?
 * You may use JavaScript code to determine the value.
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FogRemove
 * @text Fog: Remove
 * @desc Removes target fog(s).
 * This is temporary and will be reset upon re-entering the map.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which fog(s)?
 * Cannot remove the map editor's fog.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VisualFogs
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Defaults
 *
 * @param FogOpacity:num
 * @text Fog Opacity
 * @parent Defaults
 * @type number
 * @max 255
 * @desc What is the default fog opacity level for map notetags?
 * @default 200
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Defaults
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What is the default fog blend mode for map notetags?
 * @default 1
 *
 * @param MaskBlur:num
 * @text Tile Blur
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile blur intensity for map notetags?
 * @default 10
 *
 * @param MaskSpill:num
 * @text Tile Spill
 * @parent Defaults
 * @type number
 * @desc What is the default fog tile spill amount for map notetags?
 * @default 10
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Optional Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Optional:
 * 
 * @param Scrolling
 * 
 * @param _fogZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the fog to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _fogLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSx:eval
 * @text Scroll:
 * @parent _fogLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _fogLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the fog horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _fogSy:eval
 * @text Scroll:
 * @parent _fogLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this fog?
 * You may use JavaScript code.
 * @default 200
 *
 * @param blendMode:eval
 * @text Blend Mode
 * @parent Appearance
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the fog?
 * You may use JavaScript code.
 * @default 1
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this fog's hue?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hueShift:eval
 * @text Hue Shift
 * @parent hue:eval
 * @desc How much do you want the hue to shift each frame?
 * You may use JavaScript code.
 * @default +0
 *
 * @param colorTone:eval
 * @text Color Tone
 * @parent Appearance
 * @desc What tone do you want for the fog?
 * Format: [Red, Green, Blue, Gray]
 * @default [0, 0, 0, 0]
 * 
 * @param Location
 *
 * @param maskRegions:arraynum
 * @text Regions
 * @parent Location
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this fog?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskBlur:eval
 * @text Tile Blur
 * @parent Location
 * @desc What's the blur level you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 *
 * @param maskSpill:eval
 * @text Tile Spill
 * @parent Location
 * @desc What's the spill amount you wish to use for tiles?
 * You may use JavaScript code.
 * @default 10
 * 
 * @param Vignette
 *
 * @param vignette:str
 * @text Type
 * @parent Vignette
 * @type select
 * @option None
 * @option Border
 * @option Horizontal
 * @option Vertical
 * @option Upper
 * @option Lower
 * @option Left
 * @option Right
 * @desc What vignette do you want to use for this fog?
 * This will override location settings.
 * @default None
 *
 * @param vignetteFilename:str
 * @text Custom
 * @parent Vignette
 * @type file
 * @dir img/parallaxes/
 * @desc Do you wish to use a custom vignette instead?
 * Automatically changes the type to "Custom".
 * @default 
 *
 */
//=============================================================================

const _0x28cd6b=_0x5cb1;(function(_0x2f1246,_0x4762f8){const _0x3f006e=_0x5cb1,_0x53aa2c=_0x2f1246();while(!![]){try{const _0x103e0e=parseInt(_0x3f006e(0x223))/0x1+-parseInt(_0x3f006e(0x250))/0x2+-parseInt(_0x3f006e(0x23b))/0x3+parseInt(_0x3f006e(0x1de))/0x4*(-parseInt(_0x3f006e(0x1f4))/0x5)+-parseInt(_0x3f006e(0x21d))/0x6*(parseInt(_0x3f006e(0x1e7))/0x7)+parseInt(_0x3f006e(0x288))/0x8*(parseInt(_0x3f006e(0x23f))/0x9)+parseInt(_0x3f006e(0x25e))/0xa;if(_0x103e0e===_0x4762f8)break;else _0x53aa2c['push'](_0x53aa2c['shift']());}catch(_0x5e8578){_0x53aa2c['push'](_0x53aa2c['shift']());}}}(_0x5131,0x6233a));function _0x5131(){const _0x597821=['_displayX','parse','upper','DEFAULT_FOG_TILE_SPILL','exit','scale','327655NfONpR','version','SpriteMaskFilter','Game_Map_scrollDown','move','isLoopVertical','charAt','updateOrigin','Game_Map_updateParallax','ceil','gradientFillRect','updateVisualFogLayer','split','CustomVignette','updateBlendMode','_scene','_visualFogSettings','DEFAULT_FOG_BLEND_MODE','BlurFilter','updateOpacity','_fogY','toUpperCase','scrollRight','_maskFilter','updateZoom','DEFAULT_FOG_TILE_BLUR','End','MaskTerrainTags','ConvertParams','setup','addChild','opacity','filters','filename','sort','PremadeVignette','_fogLoopX','ARRAYJSON','updateHue','screenTileX','list','2028216JlTfzH','NORMAL','setDisplayPos','makeDeepCopy','bitmap','regionId','65265sDznMj','Spriteset_Map_createWeather','STRUCT','addLoadListener','rgba(0,\x200,\x200,\x200)','scrollDown','initialize','children','getVisualFogs','_blurFilter','NUM','blendMode','ARRAYFUNC','TemplateSettings','loadTemplateVignette','Tone','VertLoop','_fogSx','note','vignette','displayX','loadBitmap','update','RegExp','2243979ZVhnsZ','scrollLeft','hue','#ffffff','29079BYyDcB','_fogSy','registerCommand','origin','call','ARRAYEVAL','name','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateMask','right','hueShift','updateVisualFogSettings','setupVisualFogs','find','FogAddChangeSettings','_colorFilter','bind','688404QVbQwx','_fogLoopY','_createColorFilter','trim','DEFAULT_FOG_OPACITY','tileWidth','getVisualFogOy','scrollUp','MaskSpill','BlendMode','zoomScale','ARRAYSTR','createMaskBitmap','FogRemove','21665400fYVbAD','getVisualFogOx','_fogX','Game_Map_scrollLeft','STR','updateParallax','maskBlur','loadCustomVignette','settings','_fogVignettes','getFogVignette_horizontal','getVisualFogSettings','_grafterRefreshRegions','Game_Map_scrollUp','_spriteset','MULTIPLY','findTargetVisualFog','round','colorTone','ARRAYNUM','constructor','map','addChangeVisualFog','Start','createWeather','_customModified','FogOpacity','createFogLayers','horizontal','filter','_baseSprite','Filename','getFogVignette_%1','isSceneMap','opacityDuration','_fogZero','custom','_id','parameters','length','clamp','getFogVignette_lower','984AnHXTD','Optional','Game_Map_scrollRight','_updateColorFilter','format','createMaskSprite','push','indexOf','sortVisualFogs','blur','width','max','_fogName','>>>ATTENTION<<<','createMaskTileBitmap','Game_Map_setup','OpacityRate','removeChild','getFogVignette_empty','_colorTone','border','_maskSprite','displayY','tileHeight','isInstanceOfSceneMap','left','isLoopHorizontal','_displayY','maskTerrainTags','JSON','OpacityFlat','match','none','SCREEN','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','drawMaskTile','_lastVisualFogMapID','empty','loadParallax','prototype','includes','setColorTone','Settings','setHue','HorzLoop','createFogContainer','_hue','height','equals','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','maskSpill','screenTileY','removeVisualFog','maskRegions','createNewFogLayer','CreateLayerData','ARRAYSTRUCT','floor','VisuMZ_2_TileGrafterSystem','vignetteFilename','_fogDataRef','getFogVignette','Game_Map_setDisplayPos','fillRect','28UfWlti','VisualFogs','updateTone','ScrollLock','_fogContainer','description','targetOpacity','MaskBlur','status','14etTpFC','getFogVignette_right','mapId','terrainTag','clone','vertical','lower'];_0x5131=function(){return _0x597821;};return _0x5131();}function _0x5cb1(_0x28b9a3,_0x458edc){const _0x51319d=_0x5131();return _0x5cb1=function(_0x5cb11b,_0xd4a255){_0x5cb11b=_0x5cb11b-0x1da;let _0x49f3b8=_0x51319d[_0x5cb11b];return _0x49f3b8;},_0x5cb1(_0x28b9a3,_0x458edc);}var label=_0x28cd6b(0x1df),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x4b633e){const _0x3f9e3b=_0x28cd6b;return _0x4b633e[_0x3f9e3b(0x1e6)]&&_0x4b633e['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x28cd6b(0x2b2)]=VisuMZ[label][_0x28cd6b(0x2b2)]||{},VisuMZ['ConvertParams']=function(_0x14fbf1,_0x2fc828){const _0x438b3d=_0x28cd6b;for(const _0x5e61f7 in _0x2fc828){if(_0x5e61f7[_0x438b3d(0x2a7)](/(.*):(.*)/i)){const _0x1929ea=String(RegExp['$1']),_0x595dbf=String(RegExp['$2'])[_0x438b3d(0x209)]()[_0x438b3d(0x253)]();let _0x4280b0,_0x7b9ff1,_0x25336d;switch(_0x595dbf){case _0x438b3d(0x22d):_0x4280b0=_0x2fc828[_0x5e61f7]!==''?Number(_0x2fc828[_0x5e61f7]):0x0;break;case _0x438b3d(0x271):_0x7b9ff1=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):[],_0x4280b0=_0x7b9ff1[_0x438b3d(0x273)](_0xa3fee7=>Number(_0xa3fee7));break;case'EVAL':_0x4280b0=_0x2fc828[_0x5e61f7]!==''?eval(_0x2fc828[_0x5e61f7]):null;break;case _0x438b3d(0x244):_0x7b9ff1=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):[],_0x4280b0=_0x7b9ff1[_0x438b3d(0x273)](_0x30ab0d=>eval(_0x30ab0d));break;case _0x438b3d(0x2a5):_0x4280b0=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):'';break;case _0x438b3d(0x219):_0x7b9ff1=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):[],_0x4280b0=_0x7b9ff1[_0x438b3d(0x273)](_0x189c02=>JSON['parse'](_0x189c02));break;case'FUNC':_0x4280b0=_0x2fc828[_0x5e61f7]!==''?new Function(JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7])):new Function('return\x200');break;case _0x438b3d(0x22f):_0x7b9ff1=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):[],_0x4280b0=_0x7b9ff1[_0x438b3d(0x273)](_0x41b287=>new Function(JSON['parse'](_0x41b287)));break;case _0x438b3d(0x262):_0x4280b0=_0x2fc828[_0x5e61f7]!==''?String(_0x2fc828[_0x5e61f7]):'';break;case _0x438b3d(0x25b):_0x7b9ff1=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):[],_0x4280b0=_0x7b9ff1[_0x438b3d(0x273)](_0x3d1fbe=>String(_0x3d1fbe));break;case _0x438b3d(0x225):_0x25336d=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):{},_0x4280b0=VisuMZ['ConvertParams']({},_0x25336d);break;case _0x438b3d(0x2c0):_0x7b9ff1=_0x2fc828[_0x5e61f7]!==''?JSON[_0x438b3d(0x1ef)](_0x2fc828[_0x5e61f7]):[],_0x4280b0=_0x7b9ff1['map'](_0xc576e9=>VisuMZ['ConvertParams']({},JSON['parse'](_0xc576e9)));break;default:continue;}_0x14fbf1[_0x1929ea]=_0x4280b0;}}return _0x14fbf1;},(_0x46892d=>{const _0x4fdca6=_0x28cd6b,_0x707b3c=_0x46892d['name'];for(const _0x375e24 of dependencies){if(!Imported[_0x375e24]){alert(_0x4fdca6(0x2b9)['format'](_0x707b3c,_0x375e24)),SceneManager[_0x4fdca6(0x1f2)]();break;}}const _0x46a443=_0x46892d[_0x4fdca6(0x1e3)];if(_0x46a443[_0x4fdca6(0x2a7)](/\[Version[ ](.*?)\]/i)){const _0x5962d4=Number(RegExp['$1']);_0x5962d4!==VisuMZ[label][_0x4fdca6(0x1f5)]&&(alert(_0x4fdca6(0x2aa)[_0x4fdca6(0x28c)](_0x707b3c,_0x5962d4)),SceneManager[_0x4fdca6(0x1f2)]());}if(_0x46a443[_0x4fdca6(0x2a7)](/\[Tier[ ](\d+)\]/i)){const _0x28cf17=Number(RegExp['$1']);_0x28cf17<tier?(alert(_0x4fdca6(0x246)[_0x4fdca6(0x28c)](_0x707b3c,_0x28cf17,tier)),SceneManager[_0x4fdca6(0x1f2)]()):tier=Math[_0x4fdca6(0x293)](_0x28cf17,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x46892d[_0x4fdca6(0x284)]);})(pluginData),VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x230)]=function(){const _0x51dae8=_0x28cd6b;return{'id':0x0,'filename':'','_fogZero':![],'_fogLoopX':![],'_fogLoopY':![],'_fogSx':0x0,'_fogSy':0x0,'_fogX':0x0,'_fogY':0x0,'opacity':Game_Map[_0x51dae8(0x254)],'targetOpacity':Game_Map['DEFAULT_FOG_OPACITY'],'opacityDuration':0x0,'blendMode':Game_Map[_0x51dae8(0x205)],'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[],'maskBlur':Game_Map['DEFAULT_FOG_TILE_BLUR'],'maskSpill':Game_Map[_0x51dae8(0x1f1)],'vignette':_0x51dae8(0x2a8),'vignetteFilename':''};},PluginManager[_0x28cd6b(0x241)](pluginData['name'],_0x28cd6b(0x24d),_0x165fef=>{const _0x261ac1=_0x28cd6b;VisuMZ[_0x261ac1(0x210)](_0x165fef,_0x165fef);if(_0x165fef['id']<=0x0)return;if(_0x165fef[_0x261ac1(0x215)]===''||_0x165fef[_0x261ac1(0x215)]===_0x261ac1(0x295))return;let _0x55b4a2=JsonEx['makeDeepCopy'](_0x165fef[_0x261ac1(0x289)]);if(!_0x55b4a2['hasOwnProperty']('maskRegions'))_0x55b4a2=VisuMZ[_0x261ac1(0x1df)][_0x261ac1(0x230)]();_0x55b4a2[_0x261ac1(0x215)]=_0x165fef[_0x261ac1(0x215)],_0x55b4a2['id']=_0x165fef['id'];while(_0x55b4a2[_0x261ac1(0x270)][_0x261ac1(0x285)]<0x4){_0x55b4a2[_0x261ac1(0x270)][_0x261ac1(0x28e)](0x0);}_0x55b4a2[_0x261ac1(0x260)]=0x0,_0x55b4a2[_0x261ac1(0x208)]=0x0,_0x55b4a2[_0x261ac1(0x1e4)]=_0x165fef[_0x261ac1(0x213)],_0x55b4a2[_0x261ac1(0x280)]=0x0,_0x55b4a2[_0x261ac1(0x236)]=_0x55b4a2['vignette']||_0x261ac1(0x2a8),_0x55b4a2['vignette']=_0x55b4a2[_0x261ac1(0x236)]['toLowerCase']()[_0x261ac1(0x253)](),_0x55b4a2['vignetteFilename']!==''&&(_0x55b4a2[_0x261ac1(0x236)]='custom'),$gameMap[_0x261ac1(0x274)](_0x55b4a2);}),PluginManager[_0x28cd6b(0x241)](pluginData[_0x28cd6b(0x245)],'FogFadeOpacity',_0xb4a5a5=>{const _0x24525a=_0x28cd6b;if(!SceneManager[_0x24525a(0x2a0)]())return;VisuMZ[_0x24525a(0x210)](_0xb4a5a5,_0xb4a5a5);const _0x3b7244=_0xb4a5a5[_0x24525a(0x21c)];for(const _0x58885a of _0x3b7244){const _0xc79127=$gameMap['getVisualFogSettings'](_0x58885a);if(!_0xc79127)continue;_0xc79127[_0x24525a(0x1e4)]=_0xb4a5a5['targetOpacity']||0x0,_0xc79127[_0x24525a(0x280)]=_0xb4a5a5[_0x24525a(0x280)]||0x0,_0xc79127[_0x24525a(0x280)]<=0x0&&(_0xc79127[_0x24525a(0x213)]=_0xc79127[_0x24525a(0x1e4)]);}}),PluginManager[_0x28cd6b(0x241)](pluginData['name'],_0x28cd6b(0x25d),_0x1cd817=>{const _0x38fe4d=_0x28cd6b;if(!SceneManager[_0x38fe4d(0x2a0)]())return;VisuMZ[_0x38fe4d(0x210)](_0x1cd817,_0x1cd817);const _0x1ffde5=_0x1cd817[_0x38fe4d(0x21c)];for(const _0x2e93b9 of _0x1ffde5){$gameMap[_0x38fe4d(0x2bc)](_0x2e93b9);}}),VisuMZ['VisualFogs'][_0x28cd6b(0x23a)]={'Start':/<(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:FOG)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'MaskBlur':/(?:TILE BLUR|BLUR):[ ](.*)/i,'MaskSpill':/(?:TILE SPILL|SPILL):[ ](.*)/i,'CustomVignette':/CUSTOM (?:VIGNETTE|OVERLAY):[ ](.*)/i,'PremadeVignette':/(?:VIGNETTE|OVERLAY):[ ](.*)/i},ImageManager[_0x28cd6b(0x1db)]=function(_0xee5677){const _0x163fcf=_0x28cd6b;if(!_0xee5677)return this[_0x163fcf(0x29a)]();this['_fogVignettes']=this[_0x163fcf(0x267)]||{},_0xee5677=_0xee5677['toLowerCase']()['trim']();const _0x37943e=_0x163fcf(0x27e)[_0x163fcf(0x28c)](_0xee5677);if(this[_0x163fcf(0x267)][_0xee5677])return this[_0x163fcf(0x267)][_0xee5677];else return this[_0x37943e]?this[_0x37943e]():this[_0x163fcf(0x29a)]();},ImageManager['getFogVignette_empty']=function(){const _0x35dd73=_0x28cd6b;if(this[_0x35dd73(0x267)]['empty'])return this[_0x35dd73(0x267)][_0x35dd73(0x2ad)];const _0x2e656e=new Bitmap(Graphics[_0x35dd73(0x292)],Graphics[_0x35dd73(0x2b7)]);return _0x2e656e['fillRect'](0x0,0x0,_0x2e656e[_0x35dd73(0x292)],_0x2e656e[_0x35dd73(0x2b7)],_0x35dd73(0x23e)),_0x2e656e[_0x35dd73(0x277)]=![],this[_0x35dd73(0x267)]=this[_0x35dd73(0x267)]||{},this['_fogVignettes'][_0x35dd73(0x2ad)]=_0x2e656e,_0x2e656e;},ImageManager['getFogVignette_upper']=function(){const _0x2ebfd4=_0x28cd6b,_0xec94ba=new Bitmap(Graphics['width'],Graphics[_0x2ebfd4(0x2b7)]),_0x1388e5=_0x2ebfd4(0x227),_0x4e03cc=_0x2ebfd4(0x23e);return _0xec94ba[_0x2ebfd4(0x1fe)](0x0,0x0,Graphics[_0x2ebfd4(0x292)],Math[_0x2ebfd4(0x1fd)](Graphics[_0x2ebfd4(0x2b7)]/0x3),_0x4e03cc,_0x1388e5,!![]),_0xec94ba[_0x2ebfd4(0x277)]=![],this[_0x2ebfd4(0x267)]=this[_0x2ebfd4(0x267)]||{},this[_0x2ebfd4(0x267)][_0x2ebfd4(0x1f0)]=_0xec94ba,_0xec94ba;},ImageManager[_0x28cd6b(0x287)]=function(){const _0x7d46aa=_0x28cd6b,_0x214c26=new Bitmap(Graphics[_0x7d46aa(0x292)],Graphics[_0x7d46aa(0x2b7)]),_0x5798f0='rgba(0,\x200,\x200,\x200)',_0x481616=_0x7d46aa(0x23e);return _0x214c26[_0x7d46aa(0x1fe)](0x0,Math[_0x7d46aa(0x1fd)](Graphics[_0x7d46aa(0x2b7)]*0x2/0x3),Graphics[_0x7d46aa(0x292)],Math['ceil'](Graphics[_0x7d46aa(0x2b7)]/0x3),_0x5798f0,_0x481616,!![]),_0x214c26[_0x7d46aa(0x277)]=![],this[_0x7d46aa(0x267)]=this[_0x7d46aa(0x267)]||{},this['_fogVignettes'][_0x7d46aa(0x1ed)]=_0x214c26,_0x214c26;},ImageManager[_0x28cd6b(0x268)]=function(){const _0x265c5c=_0x28cd6b,_0x5b293a=new Bitmap(Graphics[_0x265c5c(0x292)],Graphics[_0x265c5c(0x2b7)]),_0x499401=_0x265c5c(0x227),_0x21ce28=_0x265c5c(0x23e);return _0x5b293a[_0x265c5c(0x1fe)](0x0,0x0,Graphics[_0x265c5c(0x292)],Math['ceil'](Graphics[_0x265c5c(0x2b7)]/0x3),_0x21ce28,_0x499401,!![]),_0x5b293a[_0x265c5c(0x1fe)](0x0,Math[_0x265c5c(0x1fd)](Graphics[_0x265c5c(0x2b7)]*0x2/0x3),Graphics[_0x265c5c(0x292)],Math[_0x265c5c(0x1fd)](Graphics['height']/0x3),_0x499401,_0x21ce28,!![]),_0x5b293a[_0x265c5c(0x277)]=![],this[_0x265c5c(0x267)]=this['_fogVignettes']||{},this['_fogVignettes'][_0x265c5c(0x27a)]=_0x5b293a,_0x5b293a;},ImageManager['getFogVignette_left']=function(){const _0x2d1fd2=_0x28cd6b,_0x364fc2=new Bitmap(Graphics[_0x2d1fd2(0x292)],Graphics[_0x2d1fd2(0x2b7)]),_0x233e1e='rgba(0,\x200,\x200,\x200)',_0xe85a24=_0x2d1fd2(0x23e);return _0x364fc2[_0x2d1fd2(0x1fe)](0x0,0x0,Math['ceil'](Graphics['width']/0x3),Graphics[_0x2d1fd2(0x2b7)],_0xe85a24,_0x233e1e,![]),_0x364fc2[_0x2d1fd2(0x277)]=![],this['_fogVignettes']=this['_fogVignettes']||{},this[_0x2d1fd2(0x267)][_0x2d1fd2(0x2a1)]=_0x364fc2,_0x364fc2;},ImageManager[_0x28cd6b(0x1e8)]=function(){const _0x43d778=_0x28cd6b,_0x5c47ac=new Bitmap(Graphics[_0x43d778(0x292)],Graphics[_0x43d778(0x2b7)]),_0x59673d=_0x43d778(0x227),_0x55ab5=_0x43d778(0x23e);return _0x5c47ac[_0x43d778(0x1fe)](Math[_0x43d778(0x1fd)](Graphics['width']*0x2/0x3),0x0,Math['ceil'](Graphics[_0x43d778(0x292)]/0x3),Graphics['height'],_0x59673d,_0x55ab5,![]),_0x5c47ac['_customModified']=![],this[_0x43d778(0x267)]=this[_0x43d778(0x267)]||{},this[_0x43d778(0x267)][_0x43d778(0x248)]=_0x5c47ac,_0x5c47ac;},ImageManager['getFogVignette_vertical']=function(){const _0x205ad0=_0x28cd6b,_0x440e26=new Bitmap(Graphics['width'],Graphics[_0x205ad0(0x2b7)]),_0x317ad8=_0x205ad0(0x227),_0x5db532=_0x205ad0(0x23e);return _0x440e26[_0x205ad0(0x1fe)](0x0,0x0,Math[_0x205ad0(0x1fd)](Graphics['width']/0x3),Graphics[_0x205ad0(0x2b7)],_0x5db532,_0x317ad8,![]),_0x440e26[_0x205ad0(0x1fe)](Math[_0x205ad0(0x1fd)](Graphics[_0x205ad0(0x292)]*0x2/0x3),0x0,Math[_0x205ad0(0x1fd)](Graphics[_0x205ad0(0x292)]/0x3),Graphics[_0x205ad0(0x2b7)],_0x317ad8,_0x5db532,![]),_0x440e26['_customModified']=![],this['_fogVignettes']=this['_fogVignettes']||{},this[_0x205ad0(0x267)][_0x205ad0(0x1ec)]=_0x440e26,_0x440e26;},ImageManager['getFogVignette_border']=function(){const _0x11d5dc=_0x28cd6b,_0x3e054b=new Bitmap(Graphics[_0x11d5dc(0x292)],Graphics[_0x11d5dc(0x2b7)]),_0xd11d71=_0x11d5dc(0x227),_0x3d3dfa=_0x11d5dc(0x23e);return _0x3e054b[_0x11d5dc(0x1fe)](0x0,0x0,Graphics['width'],Math[_0x11d5dc(0x1fd)](Graphics[_0x11d5dc(0x2b7)]/0x3),_0x3d3dfa,_0xd11d71,!![]),_0x3e054b[_0x11d5dc(0x1fe)](0x0,Math[_0x11d5dc(0x1fd)](Graphics[_0x11d5dc(0x2b7)]*0x2/0x3),Graphics[_0x11d5dc(0x292)],Math[_0x11d5dc(0x1fd)](Graphics[_0x11d5dc(0x2b7)]/0x3),_0xd11d71,_0x3d3dfa,!![]),_0x3e054b['gradientFillRect'](0x0,0x0,Math[_0x11d5dc(0x1fd)](Graphics[_0x11d5dc(0x292)]/0x3),Graphics[_0x11d5dc(0x2b7)],_0x3d3dfa,_0xd11d71,![]),_0x3e054b[_0x11d5dc(0x1fe)](Math[_0x11d5dc(0x1fd)](Graphics[_0x11d5dc(0x292)]*0x2/0x3),0x0,Math[_0x11d5dc(0x1fd)](Graphics[_0x11d5dc(0x292)]/0x3),Graphics[_0x11d5dc(0x2b7)],_0xd11d71,_0x3d3dfa,![]),_0x3e054b[_0x11d5dc(0x277)]=![],this[_0x11d5dc(0x267)]=this['_fogVignettes']||{},this[_0x11d5dc(0x267)][_0x11d5dc(0x29c)]=_0x3e054b,_0x3e054b;},SceneManager[_0x28cd6b(0x27f)]=function(){const _0x4b34d7=_0x28cd6b;return this['_scene']&&this[_0x4b34d7(0x203)][_0x4b34d7(0x272)]===Scene_Map;},SceneManager[_0x28cd6b(0x2a0)]=function(){const _0x327b58=_0x28cd6b;return this[_0x327b58(0x203)]&&this['_scene']instanceof Scene_Map;},VisuMZ['VisualFogs'][_0x28cd6b(0x297)]=Game_Map['prototype'][_0x28cd6b(0x211)],Game_Map['prototype'][_0x28cd6b(0x211)]=function(_0xd8bbee){const _0x423322=_0x28cd6b;VisuMZ[_0x423322(0x1df)][_0x423322(0x297)][_0x423322(0x243)](this,_0xd8bbee),this[_0x423322(0x24b)]();},Game_Map[_0x28cd6b(0x254)]=VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x2b2)][_0x28cd6b(0x278)],Game_Map[_0x28cd6b(0x205)]=VisuMZ[_0x28cd6b(0x1df)]['Settings'][_0x28cd6b(0x259)],Game_Map[_0x28cd6b(0x20d)]=VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x2b2)]['MaskBlur'],Game_Map[_0x28cd6b(0x1f1)]=VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x2b2)]['MaskSpill'],Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x24b)]=function(){const _0x1a89c7=_0x28cd6b;this[_0x1a89c7(0x2ac)]!==this[_0x1a89c7(0x1e9)]()&&(this['_lastVisualFogMapID']=this['mapId'](),this['_visualFogSettings']=[null]);if(!$dataMap)return;const _0x26b863=VisuMZ[_0x1a89c7(0x1df)][_0x1a89c7(0x2bf)]();for(const _0xfaa1 of _0x26b863){if(!_0xfaa1)continue;this[_0x1a89c7(0x204)][_0xfaa1['id']]=_0xfaa1;}},VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x2bf)]=function(){const _0x170ef9=_0x28cd6b;if(!$dataMap)return[];const _0x169315=[],_0x4548f3=VisuMZ[_0x170ef9(0x1df)][_0x170ef9(0x230)]();if(!$dataMap[_0x170ef9(0x235)])return[];const _0x37b68e=VisuMZ[_0x170ef9(0x1df)]['RegExp'],_0x5294f7=$dataMap[_0x170ef9(0x235)][_0x170ef9(0x200)](/[\r\n]+/);let _0x1f1eb7=JsonEx[_0x170ef9(0x220)](_0x4548f3);for(const _0x1cb092 of _0x5294f7){if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x275)]))_0x1f1eb7['id']=Number(RegExp['$1']);else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x20e)])){const _0x3065eb=Number(RegExp['$1']);if(_0x3065eb>0x0&&_0x3065eb===_0x1f1eb7['id']&&_0x1f1eb7['filename']!=='')_0x169315[_0x170ef9(0x28e)](_0x1f1eb7);_0x1f1eb7=JsonEx[_0x170ef9(0x220)](_0x4548f3);}else{if(_0x1f1eb7['id']<=0x0)continue;}}if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x27d)]))_0x1f1eb7['filename']=String(RegExp['$1'])[_0x170ef9(0x253)](),_0x1f1eb7[_0x170ef9(0x215)][_0x170ef9(0x1fa)](0x0)==='!'&&(_0x1f1eb7[_0x170ef9(0x281)]=!![]);else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x2b4)]))_0x1f1eb7[_0x170ef9(0x218)]=!![],_0x1f1eb7[_0x170ef9(0x234)]=Number(RegExp['$1'])||0x0;else{if(_0x1cb092['match'](_0x37b68e[_0x170ef9(0x233)]))_0x1f1eb7['_fogLoopY']=!![],_0x1f1eb7[_0x170ef9(0x240)]=Number(RegExp['$1'])||0x0;else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x1e1)]))_0x1f1eb7[_0x170ef9(0x281)]=!![];else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x298)])){const _0x14ffdf=Number(RegExp['$1'])*0.01;_0x1f1eb7[_0x170ef9(0x213)]=Math[_0x170ef9(0x26f)](_0x14ffdf*0xff)[_0x170ef9(0x286)](0x0,0xff);}else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x2a6)]))_0x1f1eb7[_0x170ef9(0x213)]=Number(RegExp['$1'])[_0x170ef9(0x286)](0x0,0xff);else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e['BlendMode'])){const _0x11812d=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x174ff4=[_0x170ef9(0x21e),'ADDITIVE',_0x170ef9(0x26d),_0x170ef9(0x2a9)];_0x1f1eb7[_0x170ef9(0x22e)]=_0x174ff4[_0x170ef9(0x28f)](_0x11812d)[_0x170ef9(0x286)](0x0,0x3);}else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e['Hue']))_0x1f1eb7[_0x170ef9(0x23d)]=Number(RegExp['$1'])[_0x170ef9(0x286)](0x0,0x168);else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e['HueShift']))_0x1f1eb7[_0x170ef9(0x249)]=Number(RegExp['$1'])||0x0;else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x232)])){const _0x5ece7f=String(RegExp['$1'])[_0x170ef9(0x200)](',')[_0x170ef9(0x273)](_0x1439ab=>Number(_0x1439ab)||0x0);while(_0x5ece7f[_0x170ef9(0x285)]<0x4)_0x5ece7f['push'](0x0);_0x1f1eb7[_0x170ef9(0x270)]=_0x5ece7f;}else{if(_0x1cb092['match'](_0x37b68e['MaskRegions'])){const _0x3f6060=String(RegExp['$1'])[_0x170ef9(0x200)](',')[_0x170ef9(0x273)](_0x38285e=>Number(_0x38285e)||0x1);_0x1f1eb7[_0x170ef9(0x2bd)]=_0x3f6060;}else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x20f)])){const _0x5cd914=String(RegExp['$1'])[_0x170ef9(0x200)](',')[_0x170ef9(0x273)](_0x3434df=>Number(_0x3434df)||0x1);_0x1f1eb7[_0x170ef9(0x2a4)]=_0x5cd914;}else{if(_0x1cb092['match'](_0x37b68e[_0x170ef9(0x1e5)]))_0x1f1eb7[_0x170ef9(0x264)]=Math[_0x170ef9(0x293)](Number(RegExp['$1'])||0x0,0x0);else{if(_0x1cb092['match'](_0x37b68e[_0x170ef9(0x258)]))_0x1f1eb7[_0x170ef9(0x2ba)]=Math['max'](Number(RegExp['$1'])||0x0,0x0);else{if(_0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x201)]))_0x1f1eb7[_0x170ef9(0x2c3)]=(String(RegExp['$1'])||'')['trim'](),_0x1f1eb7[_0x170ef9(0x236)]=_0x170ef9(0x282);else _0x1cb092[_0x170ef9(0x2a7)](_0x37b68e[_0x170ef9(0x217)])&&(_0x1f1eb7[_0x170ef9(0x236)]=(String(RegExp['$1'])||'')['toLowerCase']());}}}}}}}}}}}}}}}return _0x169315;},Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x22b)]=function(){const _0x5b4a20=_0x28cd6b;return this[_0x5b4a20(0x204)]===undefined&&this['setupVisualFogs'](),this[_0x5b4a20(0x204)][_0x5b4a20(0x27b)](_0x4a9afa=>!!_0x4a9afa);},Game_Map[_0x28cd6b(0x2af)]['getVisualFogSettings']=function(_0x335558){const _0x3af9bb=_0x28cd6b;return this[_0x3af9bb(0x204)]=this[_0x3af9bb(0x204)]||[],this[_0x3af9bb(0x204)][_0x335558]||null;},Game_Map[_0x28cd6b(0x2af)]['getVisualFogOx']=function(_0x1a030d){const _0x1569e3=_0x28cd6b,_0x518728=this[_0x1569e3(0x269)](_0x1a030d);if(_0x518728['_fogZero'])return _0x518728[_0x1569e3(0x260)]*this['tileWidth']();else return _0x518728['_fogLoopX']?_0x518728['_fogX']*this[_0x1569e3(0x255)]()/0x2:0x0;},Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x256)]=function(_0x4bc9ad){const _0x13a31a=_0x28cd6b,_0x43447b=this['getVisualFogSettings'](_0x4bc9ad);if(_0x43447b['_fogZero'])return _0x43447b['_fogY']*this[_0x13a31a(0x29f)]();else return _0x43447b[_0x13a31a(0x251)]?_0x43447b[_0x13a31a(0x208)]*this[_0x13a31a(0x29f)]()/0x2:0x0;},Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x2bc)]=function(_0x8dd713){const _0x19f508=_0x28cd6b;this[_0x19f508(0x204)]=this[_0x19f508(0x204)]||[];if(!this['_visualFogSettings'][_0x8dd713])return;this[_0x19f508(0x204)][_0x8dd713]=null;const _0x1183ef=SceneManager['_scene'][_0x19f508(0x26c)];_0x1183ef&&_0x1183ef['removeVisualFogLayer'](_0x8dd713);},Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x274)]=function(_0x456530){const _0x5e398f=_0x28cd6b,_0x152eec=_0x456530['id'];_0x456530[_0x5e398f(0x215)]['charAt'](0x0)==='!'&&(_0x456530[_0x5e398f(0x281)]=!![]);let _0x5cd198=![];this[_0x5e398f(0x204)]=this[_0x5e398f(0x204)]||[];if(this[_0x5e398f(0x204)][_0x152eec]){const _0x4af379=this[_0x5e398f(0x204)][_0x152eec];if(!_0x4af379[_0x5e398f(0x2bd)]['equals'](_0x456530[_0x5e398f(0x2bd)]))_0x5cd198=!![];else{if(!_0x4af379[_0x5e398f(0x2a4)]['equals'](_0x456530[_0x5e398f(0x2a4)]))_0x5cd198=!![];else _0x4af379['vignette']!=='none'&&(_0x5cd198=!![]);}}this[_0x5e398f(0x204)][_0x152eec]=_0x456530;if(!SceneManager[_0x5e398f(0x27f)]())return;const _0x139b4a=SceneManager['_scene']['_spriteset'];_0x139b4a&&_0x139b4a[_0x5e398f(0x1ff)](_0x152eec,_0x5cd198);},VisuMZ['VisualFogs'][_0x28cd6b(0x1dc)]=Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x21f)],Game_Map[_0x28cd6b(0x2af)]['setDisplayPos']=function(_0x5dc5cb,_0x26c5d1){const _0x2ca8b2=_0x28cd6b;VisuMZ['VisualFogs'][_0x2ca8b2(0x1dc)][_0x2ca8b2(0x243)](this,_0x5dc5cb,_0x26c5d1);for(const _0xf835c8 of this[_0x2ca8b2(0x22b)]()){if(!_0xf835c8)continue;this[_0x2ca8b2(0x2a2)]()?_0xf835c8[_0x2ca8b2(0x260)]=_0x5dc5cb:_0xf835c8[_0x2ca8b2(0x260)]=this[_0x2ca8b2(0x1ee)],this[_0x2ca8b2(0x1f9)]()?_0xf835c8[_0x2ca8b2(0x208)]=_0x26c5d1:_0xf835c8['_fogY']=this[_0x2ca8b2(0x2a3)];}},VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x261)]=Game_Map[_0x28cd6b(0x2af)]['scrollLeft'],Game_Map['prototype'][_0x28cd6b(0x23c)]=function(_0x57a0cf){const _0x279d64=_0x28cd6b,_0x379945=this[_0x279d64(0x1ee)];VisuMZ[_0x279d64(0x1df)]['Game_Map_scrollLeft'][_0x279d64(0x243)](this,_0x57a0cf);for(const _0x140413 of this['getVisualFogs']()){if(!_0x140413)continue;if(this[_0x279d64(0x2a2)]())_0x140413[_0x279d64(0x218)]&&(_0x140413['_fogX']-=_0x57a0cf);else this['width']()>=this[_0x279d64(0x21b)]()&&(_0x140413['_fogX']+=this[_0x279d64(0x1ee)]-_0x379945);}},VisuMZ['VisualFogs'][_0x28cd6b(0x28a)]=Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x20a)],Game_Map['prototype'][_0x28cd6b(0x20a)]=function(_0xde9dac){const _0x2ae49d=_0x28cd6b,_0x1c04d0=this[_0x2ae49d(0x1ee)];VisuMZ[_0x2ae49d(0x1df)]['Game_Map_scrollRight']['call'](this,_0xde9dac);for(const _0x5a1f87 of this['getVisualFogs']()){if(!_0x5a1f87)continue;if(this['isLoopHorizontal']())_0x5a1f87[_0x2ae49d(0x218)]&&(_0x5a1f87[_0x2ae49d(0x260)]+=_0xde9dac);else this['width']()>=this[_0x2ae49d(0x21b)]()&&(_0x5a1f87['_fogX']+=this[_0x2ae49d(0x1ee)]-_0x1c04d0);}},VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x1f7)]=Game_Map['prototype'][_0x28cd6b(0x228)],Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x228)]=function(_0x3ae94e){const _0x534ae4=_0x28cd6b,_0x11d66e=this['_displayY'];VisuMZ[_0x534ae4(0x1df)][_0x534ae4(0x1f7)][_0x534ae4(0x243)](this,_0x3ae94e);for(const _0x123acc of this[_0x534ae4(0x22b)]()){if(!_0x123acc)continue;if(this[_0x534ae4(0x1f9)]())_0x123acc['_fogLoopY']&&(_0x123acc[_0x534ae4(0x208)]+=_0x3ae94e);else this[_0x534ae4(0x2b7)]()>=this[_0x534ae4(0x2bb)]()&&(_0x123acc['_fogY']+=this[_0x534ae4(0x2a3)]-_0x11d66e);}},VisuMZ[_0x28cd6b(0x1df)]['Game_Map_scrollUp']=Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x257)],Game_Map['prototype'][_0x28cd6b(0x257)]=function(_0x509bda){const _0x3c4d94=_0x28cd6b,_0x953391=this['_displayY'];VisuMZ[_0x3c4d94(0x1df)][_0x3c4d94(0x26b)][_0x3c4d94(0x243)](this,_0x509bda);for(const _0x23c0d5 of this['getVisualFogs']()){if(!_0x23c0d5)continue;if(this[_0x3c4d94(0x1f9)]())_0x23c0d5[_0x3c4d94(0x251)]&&(_0x23c0d5[_0x3c4d94(0x208)]-=_0x509bda);else this[_0x3c4d94(0x2b7)]()>=this[_0x3c4d94(0x2bb)]()&&(_0x23c0d5[_0x3c4d94(0x208)]+=this[_0x3c4d94(0x2a3)]-_0x953391);}},VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x1fc)]=Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x263)],Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x263)]=function(){const _0x379174=_0x28cd6b;VisuMZ[_0x379174(0x1df)]['Game_Map_updateParallax'][_0x379174(0x243)](this);for(const _0x37b5ae of this['getVisualFogs']()){if(!_0x37b5ae)continue;this[_0x379174(0x24a)](_0x37b5ae);}},Game_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x24a)]=function(_0x5552af){const _0x29089b=_0x28cd6b;_0x5552af[_0x29089b(0x218)]&&(_0x5552af['_fogX']+=_0x5552af[_0x29089b(0x234)]/this['tileWidth']()/0x2);_0x5552af[_0x29089b(0x251)]&&(_0x5552af['_fogY']+=_0x5552af[_0x29089b(0x240)]/this['tileHeight']()/0x2);_0x5552af[_0x29089b(0x23d)]+=_0x5552af[_0x29089b(0x249)];if(_0x5552af[_0x29089b(0x280)]>0x0){const _0x5b2fe7=_0x5552af[_0x29089b(0x280)];_0x5552af[_0x29089b(0x213)]=(_0x5552af[_0x29089b(0x213)]*(_0x5b2fe7-0x1)+_0x5552af[_0x29089b(0x1e4)])/_0x5b2fe7,_0x5552af['opacityDuration']--;}};function Sprite_VisualFog(){const _0x30464b=_0x28cd6b;this[_0x30464b(0x229)](...arguments);}Sprite_VisualFog[_0x28cd6b(0x2af)]=Object['create'](TilingSprite[_0x28cd6b(0x2af)]),Sprite_VisualFog[_0x28cd6b(0x2af)]['constructor']=Sprite_VisualFog,Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x229)]=function(_0x251d06){const _0x1c11ca=_0x28cd6b;this[_0x1c11ca(0x283)]=_0x251d06,TilingSprite['prototype']['initialize'][_0x1c11ca(0x243)](this),this[_0x1c11ca(0x252)](),this['loadBitmap'](),this[_0x1c11ca(0x221)][_0x1c11ca(0x226)](this[_0x1c11ca(0x28d)]['bind'](this));},Sprite_VisualFog['prototype'][_0x28cd6b(0x266)]=function(){const _0x2d0975=_0x28cd6b;return $gameMap[_0x2d0975(0x269)](this[_0x2d0975(0x283)]);},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x252)]=function(){const _0xc5cc50=_0x28cd6b;this[_0xc5cc50(0x2b6)]=0x0,this[_0xc5cc50(0x29b)]=[0x0,0x0,0x0,0x0],this['_colorFilter']=new ColorFilter(),!this[_0xc5cc50(0x214)]&&(this[_0xc5cc50(0x214)]=[]),this[_0xc5cc50(0x214)][_0xc5cc50(0x28e)](this['_colorFilter']);},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x28b)]=function(){const _0x333b7f=_0x28cd6b;!this[_0x333b7f(0x24e)]&&this[_0x333b7f(0x252)](),this[_0x333b7f(0x24e)][_0x333b7f(0x2b3)](this[_0x333b7f(0x2b6)]),this['_colorFilter'][_0x333b7f(0x2b1)](this[_0x333b7f(0x29b)]);},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x238)]=function(){const _0x5137b1=_0x28cd6b;this[_0x5137b1(0x294)]=this[_0x5137b1(0x266)]()[_0x5137b1(0x215)],this[_0x5137b1(0x221)]=ImageManager[_0x5137b1(0x2ae)](this['_fogName']);},Sprite_VisualFog['prototype'][_0x28cd6b(0x28d)]=function(){const _0x2edeb1=_0x28cd6b;this[_0x2edeb1(0x29d)]=new Sprite(),this[_0x2edeb1(0x25c)]();},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x25c)]=function(){const _0x189e28=_0x28cd6b;this['_maskSprite']['bitmap']&&this[_0x189e28(0x299)](this[_0x189e28(0x29d)]);const _0x3758a6=this[_0x189e28(0x266)]()['maskRegions'],_0x5a0440=this[_0x189e28(0x266)]()[_0x189e28(0x2a4)];if(this[_0x189e28(0x266)]()['vignette']===_0x189e28(0x282))this[_0x189e28(0x265)]();else{if(this['settings']()[_0x189e28(0x236)]!=='none')this['loadTemplateVignette']();else{if(_0x3758a6[_0x189e28(0x285)]>0x0||_0x5a0440[_0x189e28(0x285)]>0x0)this[_0x189e28(0x296)]();else this[_0x189e28(0x266)]()[_0x189e28(0x236)]===_0x189e28(0x2a8)&&this[_0x189e28(0x231)]();}}this['addChild'](this[_0x189e28(0x29d)]),this[_0x189e28(0x20b)]=new PIXI[(_0x189e28(0x1f6))](this[_0x189e28(0x29d)]),this[_0x189e28(0x214)][_0x189e28(0x28e)](this[_0x189e28(0x20b)]);if(this[_0x189e28(0x22c)])this[_0x189e28(0x214)][_0x189e28(0x28e)](this[_0x189e28(0x22c)]);},Sprite_VisualFog['prototype'][_0x28cd6b(0x265)]=function(){const _0x4219ae=_0x28cd6b,_0x5b5f18=this[_0x4219ae(0x266)]()[_0x4219ae(0x2c3)];this[_0x4219ae(0x29d)][_0x4219ae(0x221)]=ImageManager[_0x4219ae(0x2ae)](_0x5b5f18),this[_0x4219ae(0x29d)][_0x4219ae(0x221)]['_customModified']=![];},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x231)]=function(){const _0x4c7e3e=_0x28cd6b,_0x132ad8=this[_0x4c7e3e(0x266)]()['vignette'];this['_maskSprite']['bitmap']=ImageManager['getFogVignette'](_0x132ad8);},Sprite_VisualFog['prototype'][_0x28cd6b(0x296)]=function(){const _0x9566c0=_0x28cd6b,_0x20021b=this['settings']()['maskRegions'],_0x1d94be=this[_0x9566c0(0x266)]()[_0x9566c0(0x2a4)];if(_0x20021b['length']<=0x0&&_0x1d94be[_0x9566c0(0x285)]<=0x0)return;if($gameMap[_0x9566c0(0x2a2)]()||$gameMap[_0x9566c0(0x1f9)]())return;const _0x5de192=$gameMap[_0x9566c0(0x292)](),_0xee9054=$gameMap[_0x9566c0(0x2b7)](),_0x14ff72=$gameMap[_0x9566c0(0x255)](),_0x178a86=$gameMap[_0x9566c0(0x29f)](),_0x5a9c51=this[_0x9566c0(0x266)]()[_0x9566c0(0x2ba)],_0x4a4adf=_0x14ff72+_0x5a9c51*0x2,_0x1962e3=_0x178a86+_0x5a9c51*0x2;this[_0x9566c0(0x29d)][_0x9566c0(0x221)]=new Bitmap(_0x5de192*_0x14ff72,_0xee9054*_0x178a86);for(let _0x41b1bd=0x0;_0x41b1bd<_0x5de192;_0x41b1bd++){for(let _0x2e1116=0x0;_0x2e1116<_0xee9054;_0x2e1116++){const _0x5daa3c=$gameMap[_0x9566c0(0x222)](_0x41b1bd,_0x2e1116);(_0x20021b[_0x9566c0(0x2b0)](_0x5daa3c)||_0x1d94be['includes']($gameMap[_0x9566c0(0x1ea)](_0x41b1bd,_0x2e1116)))&&(this[_0x9566c0(0x29d)][_0x9566c0(0x221)][_0x9566c0(0x1dd)](_0x41b1bd*_0x14ff72-_0x5a9c51,_0x2e1116*_0x178a86-_0x5a9c51,_0x4a4adf,_0x1962e3,_0x9566c0(0x23e)),Imported[_0x9566c0(0x2c2)]&&_0x20021b[_0x9566c0(0x2b0)](_0x5daa3c)&&SceneManager[_0x9566c0(0x203)][_0x9566c0(0x26a)][_0x9566c0(0x28e)](_0x5daa3c));}}this[_0x9566c0(0x214)]=[];!!PIXI[_0x9566c0(0x214)]['BlurFilter']&&!this[_0x9566c0(0x22c)]&&(this[_0x9566c0(0x22c)]=new PIXI['filters'][(_0x9566c0(0x206))](clamp=!![]));if(this[_0x9566c0(0x22c)]){const _0x9f6265=this[_0x9566c0(0x266)]()[_0x9566c0(0x264)];this[_0x9566c0(0x22c)][_0x9566c0(0x291)]=_0x9f6265||0.01;}},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x2ab)]=function(_0x1f7702,_0x2f7336){},Sprite_VisualFog['prototype'][_0x28cd6b(0x239)]=function(){const _0x5c3b3f=_0x28cd6b;TilingSprite[_0x5c3b3f(0x2af)][_0x5c3b3f(0x239)]['call'](this);if(!this[_0x5c3b3f(0x221)])return;if(!this[_0x5c3b3f(0x266)]())return;this[_0x5c3b3f(0x207)](),this[_0x5c3b3f(0x1fb)](),this[_0x5c3b3f(0x202)](),this['updateHue'](),this[_0x5c3b3f(0x1e0)](),this[_0x5c3b3f(0x247)](),this['updateZoom']();},Sprite_VisualFog['prototype'][_0x28cd6b(0x207)]=function(){const _0x1e91a1=_0x28cd6b;this[_0x1e91a1(0x213)]=this['settings']()[_0x1e91a1(0x213)];},Sprite_VisualFog['prototype']['updateOrigin']=function(){const _0x604524=_0x28cd6b;this[_0x604524(0x242)]['x']=$gameMap[_0x604524(0x25f)](this[_0x604524(0x283)]),this['origin']['y']=$gameMap[_0x604524(0x256)](this[_0x604524(0x283)]);},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x202)]=function(){const _0x3f9f72=_0x28cd6b;this[_0x3f9f72(0x20b)]&&(this['_maskFilter'][_0x3f9f72(0x22e)]=this[_0x3f9f72(0x266)]()[_0x3f9f72(0x22e)]);},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x21a)]=function(){const _0x2fb1c5=_0x28cd6b;this[_0x2fb1c5(0x2b3)](this[_0x2fb1c5(0x266)]()[_0x2fb1c5(0x23d)]);},Sprite_VisualFog['prototype'][_0x28cd6b(0x2b3)]=function(_0x5b5989){const _0x5356ad=_0x28cd6b;this[_0x5356ad(0x2b6)]!==Number(_0x5b5989)&&(this[_0x5356ad(0x2b6)]=Number(_0x5b5989),this[_0x5356ad(0x28b)]());},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x1e0)]=function(){const _0x5743e3=_0x28cd6b;this[_0x5743e3(0x2b1)](this[_0x5743e3(0x266)]()[_0x5743e3(0x270)]);},Sprite_VisualFog['prototype'][_0x28cd6b(0x2b1)]=function(_0x31e3eb){const _0x19f24c=_0x28cd6b;if(!(_0x31e3eb instanceof Array))throw new Error('Argument\x20must\x20be\x20an\x20array');!this[_0x19f24c(0x29b)][_0x19f24c(0x2b8)](_0x31e3eb)&&(this['_colorTone']=_0x31e3eb[_0x19f24c(0x1eb)](),this[_0x19f24c(0x28b)]());},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x247)]=function(){const _0x57803d=_0x28cd6b;if(!this[_0x57803d(0x29d)])return;const _0x1764b1=this[_0x57803d(0x266)]()[_0x57803d(0x2bd)],_0x40301e=this[_0x57803d(0x266)]()['maskTerrainTags'];if(this[_0x57803d(0x266)]()['vignette']!==_0x57803d(0x2a8)){this['_maskSprite']['x']=0x0,this[_0x57803d(0x29d)]['y']=0x0;if(!Imported['VisuMZ_4_MapCameraZoom'])return;this['_maskSprite']['scale']['x']=0x1/$gameScreen[_0x57803d(0x25a)](),this[_0x57803d(0x29d)][_0x57803d(0x1f3)]['y']=0x1/$gameScreen[_0x57803d(0x25a)]();}else{if(_0x1764b1[_0x57803d(0x285)]>0x0||_0x40301e[_0x57803d(0x285)]>0x0)this[_0x57803d(0x29d)]['x']=Math['floor'](-$gameMap[_0x57803d(0x237)]()*$gameMap['tileWidth']()),this[_0x57803d(0x29d)]['y']=Math[_0x57803d(0x2c1)](-$gameMap[_0x57803d(0x29e)]()*$gameMap[_0x57803d(0x29f)]()),this[_0x57803d(0x29d)][_0x57803d(0x1f3)]['x']=0x1,this[_0x57803d(0x29d)][_0x57803d(0x1f3)]['y']=0x1;else{if(this[_0x57803d(0x266)]()[_0x57803d(0x236)]===_0x57803d(0x2a8)){this['_maskSprite']['x']=0x0,this['_maskSprite']['y']=0x0;const _0x43fcc6=$gameScreen[_0x57803d(0x25a)]();this['_maskSprite'][_0x57803d(0x1f3)]['x']=0x1/_0x43fcc6,this[_0x57803d(0x29d)][_0x57803d(0x1f3)]['y']=0x1/_0x43fcc6;}}}},Sprite_VisualFog[_0x28cd6b(0x2af)][_0x28cd6b(0x20c)]=function(){const _0x2d881d=_0x28cd6b,_0x1f704a=$gameScreen[_0x2d881d(0x25a)](),_0xf05ac=Math[_0x2d881d(0x1fd)](Graphics[_0x2d881d(0x292)]/_0x1f704a),_0x56f5cf=Math[_0x2d881d(0x1fd)](Graphics[_0x2d881d(0x2b7)]/_0x1f704a);(this[_0x2d881d(0x292)]!==_0xf05ac||this[_0x2d881d(0x2b7)]!==_0x56f5cf)&&this['move'](0x0,0x0,_0xf05ac,_0x56f5cf);},VisuMZ[_0x28cd6b(0x1df)][_0x28cd6b(0x224)]=Spriteset_Map['prototype'][_0x28cd6b(0x276)],Spriteset_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x276)]=function(){const _0x7fa8b2=_0x28cd6b;this[_0x7fa8b2(0x2b5)](),this[_0x7fa8b2(0x279)](),this[_0x7fa8b2(0x290)](),VisuMZ['VisualFogs']['Spriteset_Map_createWeather'][_0x7fa8b2(0x243)](this);},Spriteset_Map['prototype']['createFogContainer']=function(){const _0x218afe=_0x28cd6b;this['_fogContainer']=new Sprite(),this[_0x218afe(0x27c)][_0x218afe(0x212)](this['_fogContainer']),this[_0x218afe(0x1da)]=[null];},Spriteset_Map[_0x28cd6b(0x2af)]['createFogLayers']=function(){const _0x4c34a=_0x28cd6b,_0x9e5f4b=$gameMap[_0x4c34a(0x22b)]();for(const _0x5341c5 of _0x9e5f4b){if(!_0x5341c5)continue;this[_0x4c34a(0x2be)](_0x5341c5);}},Spriteset_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x2be)]=function(_0x136d93){const _0x1066b9=_0x28cd6b;if(!_0x136d93)return;const _0x3ebd0d=new Sprite_VisualFog(_0x136d93['id']);_0x3ebd0d[_0x1066b9(0x1f8)](0x0,0x0,Graphics[_0x1066b9(0x292)],Graphics[_0x1066b9(0x2b7)]),this[_0x1066b9(0x1e2)]['addChild'](_0x3ebd0d);},Spriteset_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x290)]=function(){const _0x5342f3=_0x28cd6b;this[_0x5342f3(0x1e2)][_0x5342f3(0x22a)][_0x5342f3(0x216)]((_0x543606,_0x510bbf)=>_0x543606[_0x5342f3(0x283)]-_0x510bbf[_0x5342f3(0x283)]);},Spriteset_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x26e)]=function(_0x32f4b1){const _0x4a3e32=_0x28cd6b;return this[_0x4a3e32(0x1e2)][_0x4a3e32(0x22a)][_0x4a3e32(0x24c)](_0x546ecc=>_0x546ecc[_0x4a3e32(0x283)]===_0x32f4b1);},Spriteset_Map[_0x28cd6b(0x2af)]['removeVisualFogLayer']=function(_0x16c9f4){const _0x52ab87=_0x28cd6b,_0x4d475b=this[_0x52ab87(0x26e)](_0x16c9f4);_0x4d475b&&this[_0x52ab87(0x1e2)]['removeChild'](_0x4d475b);},Spriteset_Map[_0x28cd6b(0x2af)][_0x28cd6b(0x1ff)]=function(_0xf04c99,_0x15ca00){const _0x3459a6=_0x28cd6b,_0x44c3d0=this[_0x3459a6(0x26e)](_0xf04c99);!_0x44c3d0?(this[_0x3459a6(0x2be)]($gameMap['getVisualFogSettings'](_0xf04c99)),this[_0x3459a6(0x290)]()):(_0x44c3d0['loadBitmap'](),_0x15ca00&&_0x44c3d0[_0x3459a6(0x221)]['addLoadListener'](_0x44c3d0['createMaskBitmap'][_0x3459a6(0x24f)](_0x44c3d0)));};