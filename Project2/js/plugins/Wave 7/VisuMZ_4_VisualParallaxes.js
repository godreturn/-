//=============================================================================
// VisuStella MZ - Visual Parallaxes
// VisuMZ_4_VisualParallaxes.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualParallaxes = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualParallaxes = VisuMZ.VisualParallaxes || {};
VisuMZ.VisualParallaxes.version = 1.15;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.15] [VisualParallaxes]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Parallaxes_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * By default, RPG Maker MZ only allows each map to have one parallax. Such a
 * limit makes it difficult to create different layers of objects to portray
 * distance and the like. This plugin will remedy that by allowing you to add
 * an unlimited amount of parallaxes per map alongside many controls to make
 * the parallaxes more vivid.
 * 
 * A restricted parallax area system is also added to this plugin to make
 * parallaxes appear only within certain regions and/or terrain tags. This way,
 * you can utilize parallaxes as masked layers for water surfaces and the like.
 * 
 * To make the most out of this, with the tilesets are formatted properly,
 * reflective water and reflective solid surfaces are also new effects added
 * through this plugin. Water effects will show ripples while reflective solid
 * surfaces are static.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add, change, and/or remove parallaxes through map notetags.
 * * Lots of customization options for each of the parallaxes.
 * * Limit where parallaxes can be displayed on the map through regions and/or
 *   terrain tags.
 * * Create reflective surfaces for water and solid ground as long as the
 *   tilesets have been formatted properly.
 * * Use Plugin Commands midway through the game to add, change, fade, and/or
 *   remove parallaxes as needed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Recommended Plugin List ------
 *
 * * Pixi JS Filters*
 *
 * This plugin recommends the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You can use this plugin without
 * it, but there will be features missing.
 * 
 * *Note* You can download the Pixi JS Filters plugin library from the below
 * URL or from the Action Sequence Impact product page. Install it as a
 * Tier 0 plugin.
 * 
 * *Note2* Pixi JS Filters perform differently on different machines/devices.
 * Please understand that this is outside of VisuStella's control.
 * 
 * URL: https://filters.pixijs.download/v3.1.0/pixi-filters.js
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
 * Parallaxes
 * 
 * The map editor's inherent parallax will remain untouched and unable to
 * utilize the extra features provided by this plugin. However, you can just
 * simply create a new parallax layer over it and hide it from view if needed.
 * 
 * Each of the parallaxes added through this plugin's notetags and/or commands
 * are assigned an ID. Referring back to the ID later will allow you to update
 * and/or remove that parallax when needed.
 * 
 * The new parallaxes are created on a separate layer from the map editor's
 * parallax and isn't included with the new parallaxes. Layers with higher ID's
 * will appear above layers with lower ID's.
 * 
 * However, other than that, all of the new parallaxes follow the same rules as
 * the map editor's parallax. This means that they will not appear above the
 * tile map and require transparent tiles to be seen. They will also scroll the
 * same way the original parallax does to provide consistency.
 *
 * ---
 * 
 * Regions and Terrain Tags
 * 
 * If you don't want a parallax to appear for the whole entire background and
 * want to confine them to certain areas of the map, you can assign regions or
 * terrain tags for them to appear in.
 * 
 * Only the parts of the map marked by the designated regions and/or terrain
 * tags will reveal the parallax. Those parts will be little squares each,
 * equal to the size of a tile. They have hard borders and do not have any
 * smoothing options in order to display the parallax tiles accurately.
 * 
 * Each parallax layer can have their own custom regions and/or terrain tags to
 * appear in. These can be adjusted through the notetag settings or through the
 * Plugin Commands provided by this plugin. Parallax layers can be limited to
 * multiple regions and/or terrain tags at the same time.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Reflections
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * *NOTE*: This effect does not work on looping maps.
 * 
 * By default, water-based reflections are assigned the Terrain Tag 1 and solid
 * ground reflections are assigned the Terrain Tag 2. In order to make water
 * tiles show water reflections, you need to mark their tiles in the database's
 * tilesets with 1's. To mark reflective ground surfaces, mark them with 2's.
 * If the tiles are not tagged properly, the reflections will not be shown.
 * 
 * In the Plugin Parameters and notetags, you can decide if the reflections
 * will appear above the parallaxes or below them. By default, they will appear
 * above them. However, if you change them to appear below the parallaxes, then
 * pay attention to the opacity level of the parallaxes. If the parallaxes are
 * too opaque, you will barely see the reflection.
 * 
 * Once again, both water and ground tiles need to be semi-transparent or fully
 * transparent in order for reflections to be seen.
 * 
 * WARNING: This will cause longer load times on larger maps and affect their
 * performance. We highly recommend that you don't use this feature on maps
 * larger than 120 tiles wide or tall. However, this value can vary from device
 * to device.
 * 
 * ---
 * 
 * Not For Battle
 * 
 * For clarification, the VisuStella MZ Visual Parallaxes plugin is NOT made
 * for battle. There's a separate plugin for that called Visual Battle
 * Environment. The reason why parallaxes aren't made for battle is because the
 * way parallaxes are handled in map vary from how they would be handled in
 * battle. Using the Visual Parallax Plugin Commands will only alter the
 * parallax appearances when the player finishes battle.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Pixi JS Filters
 *
 * If the game project has Pixi JS Filters installed, then water reflections
 * will have a ripple effect. This is based off the Pixi JS ReflectionFilter
 * and will follow their rules. There are a couple of settings that can be
 * adjusted to customize the reflective properties.
 * 
 * Boundary: Vertical position of the reflection point, default is 50% (middle)
 * smaller numbers produce a larger reflection, larger numbers produce a
 * smaller reflection. This also means that reflections closer to the edges
 * will also have a different visual ripple effect than those towards the
 * middle of the reflection.
 * 
 * Amplitude: Starting and ending amplitude of waves allows you to control the
 * intensity of the reflection ripples. Use larger numbers for more intensity.
 * You have control over the values for the start and end values.
 * 
 * Wavelength: Starting and ending wavelength values determine the size of the
 * ripples for the reflection filter. Use larger numbers for larger wave sizes.
 * You have control over the values for the start and end values.
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
 * === Parallax-Related Notetags ===
 * 
 * ---
 *
 * <Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a regular parallax layer for this map by default.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 *
 * ---
 *
 * <Water Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Water Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a water-based parallax layer for this map by default.
 *   - This will utilize the water reflection properties and will only appear
 *     on water-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Solid Parallax id Settings>
 *  Name: filename
 *  optional property
 *  optional property
 *  optional property
 * </Solid Parallax id Settings>
 *
 * - Used for: Map Notetags
 * - Creates a solid-based parallax layer for this map by default.
 *   - This will utilize the solid reflection properties and will only appear
 *     on solid-marked regions and terrain tags.
 * - Replace 'id' with a number value to assign to the parallax.
 *   - Plugin Commands will refer to this ID for changes and removal.
 * - The 'Name' setting is required. Without it, no parallax will be made.
 *   - Replace 'filename' with the filename of the image you want to use as
 *     a parallax found in the game project's img/parallaxes/ folder.
 *   - Do not include the file extension.
 * - Insert as many of the optional properties as you want. You can find a list
 *   of them in the section below.
 * - WARNING: This WILL cause longer load times on larger maps.
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
 * - This enables horizontal or vertical scrolling for the parallax.
 * - Replace 'x' or 'y' with a Number value to determine how fast they will
 *   scroll across the screen.
 * - Use a negative value to make them scroll the other way.
 * - These effects are mutually exclusive from the "Map Locked" property.
 * 
 * ---
 * 
 * Map Locked
 * 
 * - This will cause the parallax to only scroll when the map scrolls.
 * - This has the same effect as naming a parallax with "!" in front of
 *   its filename.
 * - If the filename used for this parallax has "!" in front of it, the
 *   Map Locked effect will be automatically turned on.
 * - These effect is mutually exclusive from the "Horz Scroll" and
 *   "Vert Scroll" properties.
 * 
 * ---
 * 
 * Opacity: x
 * Opacity: x%
 * 
 * - Changes the opacity level of the parallax.
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
 * - Sets the blend mode for the icon on the parallax.
 * - Use only one of the above.
 * 
 * ---
 * 
 * Hue: x
 * Hue Shift: x
 * 
 * - Changes the hue of the parallax to 'x' so that you don't need to create
 *   multiple copies of the files with different colors.
 * - Replace 'x' with a number value between 0 and 360.
 * - If the "Hue Shift" property is also used, then adjust the hue of the
 *   parallax each frame by 'x' amount.
 *   - 'x' can be positive or negative.
 * 
 * ---
 * 
 * Color Tone: red, green, blue, gray
 * 
 * - Changes the color tone or tint of the parallax.
 * - Replace 'red', 'green', 'blue' with a value between -255 and 255.
 * - Replace 'gray' with a value between 0 and 255.
 * 
 * ---
 * 
 * Region: id
 * Regions: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked regions with a
 *   matching ID (alongside valid terrain tags).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * Terrain Tag: id
 * Terrain Tags: id, id, id
 * 
 * - Forces the parallax to only become visible on tiles marked terrain tags
 *   with a matching ID (alongside valid regions).
 * - If this isn't used, then the parallax will be as large as the screen.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - WARNING: This WILL cause longer load times on larger maps.
 * 
 * ---
 * 
 * === Event Reflection-Related Notetags ===
 * 
 * ---
 *
 * <No Reflection>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - This will cause the event to not show any reflection on reflective tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * === Reflection-Related Notetags ===
 * 
 * In order to use reflections, you need to use tiles that are semi-transparent
 * or fully transparent. For example, water reflections need to come from tiles
 * that have been modified to be semi-transparent or fully transparent. If the
 * tile is completely opaque, the reflection will not show through. This rule
 * also applies to ground surfaces.
 * 
 * ---
 *
 * <Water Reflection Region: id>
 * <Water Reflection Regions: id, id, id>
 *
 * <Solid Reflection Region: id>
 * <Solid Reflection Regions: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the region ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a region ID between 1 and 255.
 *   - Region 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 *
 * <Water Reflection Terrain Tag: id>
 * <Water Reflection Terrain Tags: id, id, id>
 *
 * <Solid Reflection Terrain Tag: id>
 * <Solid Reflection Terrain Tags: id, id, id>
 *
 * - Used for: Map Notetags
 * - Sets the tiles marked by the terrain tag ID's to become reflective.
 * - This will override the Plugin Parameter settings for this map.
 *   - This does not add upon them.
 * - Replace 'id' with a terrain tag ID between 1 and 7.
 *   - Terrain Tag 0 is ignored and will not work.
 * - Insert multiple ID's to mark more tiles the parallax can appear on.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 * - WARNING: This WILL cause longer load times on larger maps.
 *
 * ---
 * 
 * <No Reflections>
 * 
 * - Used for: Map Notetags
 * - Disable water and map reflections on the current map.
 * 
 * ---
 *
 * <Water Reflection Top>
 * <Water Reflection Bottom>
 *
 * <Solid Reflection Top>
 * <Solid Reflection Bottom>
 *
 * - Used for: Map Notetags
 * - This will put the reflection layer either above all of the newly added
 *   parallaxes or below them.
 *   - If placed below, the reflection layer will not appear below the map
 *     editor's parallax layer.
 *   - If you change them to appear below the parallaxes, then pay attention to
 *     the opacity level of the parallaxes. If the parallaxes are too opaque,
 *     you will barely see the reflection.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Blur: x>
 * 
 * <Solid Reflection Blur: x>
 *
 * - Used for: Map Notetags
 * - Changes how much the water/solid tiles will blur the reflection for
 *   this map.
 * - Replace 'x' with a decimal Number value. Use a number between 0 and 1 for
 *   the best results.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 *
 * <Water Reflection Opacity: x>
 * <Water Reflection Opacity: x%>
 * 
 * <Solid Reflection Opacity: x>
 * <Solid Reflection Opacity: x%>
 *
 * - Used for: Map Notetags
 * - Changes the opacity level of the tile's reflection.
 * - Replace 'x' with a number from 0 to 255 representing the opacity level.
 * - Replace 'x%' with a percentage from 0% to 100% representing the opacity.
 * - If these tags aren't used, refer to the settings found in the Plugin
 *   Parameter defaults.
 *
 * ---
 * 
 * <Water Reflection Boundary: x>
 *
 * <Water Reflection Amplitude: start, end>
 * 
 * <Water Reflection Wavelength: start, end>
 *
 * - Used for: Map Notetags
 * - Requires Pixi JS Filters installed for the game project.
 * - These settings adjust the water reflection's ripple intensity.
 * - Replace Boundary's 'x' with a number value between 0 and 1.
 *   - Vertical position of the reflection point, default is 50% (middle)
 *     smaller numbers produce a larger reflection, larger numbers produce a
 *     smaller reflection. This also means that reflections closer to the edges
 *     will also have a different visual ripple effect than those towards the
 *     middle of the reflection.
 * - Replace Amplitude's 'start' and 'end' with number values representing how
 *   much to alter the intensity by.
 *   - Starting and ending amplitude of waves allows you to control the
 *     intensity of the reflection ripples.
 *   - Use larger numbers for more intensity.
 * - Replace Wavelength's 'start' and 'end' with number values representing the
 *   wave size.
 *   - Starting and ending wavelength values determine the size of the ripples
 *     for the reflection filter.
 *   - Use larger numbers for larger wave sizes.
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
 * === Parallax Plugin Commands ===
 * 
 * ---
 *
 * Parallax: Add/Change Settings
 * - Add/Change settings for target parallax.
 * - Doesn't affect map notes.
 * - This is temporary and will be reset upon re-entering the map.
 *
 *   Required:
 *
 *     ID:
 *     - What is the ID of this parallax to be added/changed?
 *
 *     Filename:
 *     - What is the filename of the parallax?
 *
 *     Type:
 *     - What kind of parallax is this going to be?
 *     - Normal
 *     - Water
 *     - Solid
 * 
 *   Optional Settings:
 * 
 *     Scrolling:
 *
 *       Map Lock?:
 *       - Lock the parallax to the map's scrolling?
 *       - Automatically enable if the filename starts with "!"
 *
 *       Loop Horizontally?:
 *       - Loop the parallax horizontally?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the horizontal scroll speed?
 *         - Use a negative value to invert the direction.
 *
 *       Loop Vertically?:
 *       - Loop the parallax vertically?
 *       - Does not work with Map Lock enabled.
 *
 *         Scroll:
 *         - What is the vertical scroll speed?
 *         - Use a negative value to invert the direction.
 * 
 *     Appearance:
 *
 *       Opacity:
 *       - What is the opacity level for this parallax?
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the parallax?
 *       - You may use JavaScript code.
 *         - Normal
 *         - Additive
 *         - Multiply
 *         - Screen
 *
 *       Hue:
 *       - Do you wish to adjust this parallax's hue?
 *       - You may use JavaScript code.
 *
 *       Hue Shift:
 *       - How much do you want the hue to shift each frame?
 *       - You may use JavaScript code.
 *
 *       Color Tone:
 *       - What tone do you want for the parallax?
 *       - Format: [Red, Green, Blue, Gray]
 * 
 *     Location:
 *
 *       Regions:
 *       - Which regions will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 *       Terrain Tags:
 *       - Which terrain tags will show this parallax?
 *       - Does not work with 0. Leave empty to ignore.
 *
 * ---
 * 
 * Parallax: Fade Opacity
 * - Fades the target parallax(es) opacity to a different value.
 * - This is temporary and will be reset upon re-entering the map.
 * 
 *   ID(s):
 *   - Target which parallax(es)?
 *   - Cannot target the map editor's parallax.
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
 * Parallax: Remove
 * - Removes target parallax(es).
 * - This is temporary and will be reset upon re-entering the map.
 *
 *   ID(s):
 *   - Remove which parallax(es)?
 *   - Cannot remove the map editor's parallax.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Water Reflection Settings
 * ============================================================================
 *
 * These are the default settings for water-based reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
 * 
 *   Water Boundary:
 *   - At which point is the water boundary?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Amplitude Start:
 *   - What should be the starting amplitude value?
 * 
 *   Amplitude End:
 *   - What should be the ending amplitude value?
 * 
 *   Wavelength Start:
 *   - What should be the starting wavelength value?
 * 
 *   Wavelength End:
 *   - What should be the ending wavelength value?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Solid Reflection Settings
 * ============================================================================
 *
 * These are the default settings for solid ground reflections.
 *
 * ---
 *
 * Markers
 * 
 *   Regions:
 *   - By default, which regions by default apply this reflection?
 *   - 0 is ignored.
 * 
 *   Terrain Tags:
 *   - By default, which terrain tags by default apply this reflection?
 *   - 0 is ignored.
 *
 * ---
 *
 * Positioning
 * 
 *   Above Parallaxes?:
 *   - Place water reflections above visual parallaxes?
 *
 * ---
 *
 * Appearance
 * 
 *   Blur Rate:
 *   - How much do you wish to blur this reflection?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Opacity:
 *   - What is the default opacity for this reflection?
 *   - Use a value between 0 and 255.
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
 * Version 1.15: September 14, 2026
 * * Compatibility Update!
 * ** Parallaxes now scale with zoom settings below 100%. Update made by Arisu.
 * 
 * Version 1.14: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where making editor changes to the current map a parallax has
 *    been placed through plugin command will cause it all to be erased and
 *    reset. Fix made by Arisu.
 * * Documentation Update!
 * ** Added an extra note to Parallax: Add/Change Settings.
 * ** Added an extra note to Parallax: Fade Opacity.
 * ** Added an extra note to Parallax: Remove.
 * *** This is temporary and will be reset upon re-entering the map.
 * 
 * Version 1.13: November 14, 2024
 * * Compatibility Update!
 * ** Added reflection compatibility with spawned events.
 * 
 * Version 1.12: July 18, 2024
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** Uses a better algorithm to determine terrain tags.
 * 
 * Version 1.11: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where having a '!' at the start of a parallax file's name
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
 * Version 1.08: May 18, 2023
 * * Bug Fixes!
 * ** Reflections should now work properly with VisuMZ_1_EventsMoveCore's
 *    latest version. Fix made by Arisu.
 * 
 * Version 1.07: August 4, 2022
 * * Compatibility Update!
 * ** Map Locked parallaxes now work better with smooth scroll.
 * 
 * Version 1.06: July 7, 2022
 * * Feature Update!
 * ** Blend modes are now revamped for the parallaxes to behave more like they
 *    do for pictures for better accuracy. Update made by Irina.
 * 
 * Version 1.05: January 27, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 6, 2022
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.03: December 9, 2021
 * * Documentation Update!
 * ** Added section to "Major Changes" for clarification purposes:
 * *** Not For Battle
 * *** For clarification, the VisuStella MZ Visual Parallxes plugin is NOT made
 *     for battle. There's a separate plugin for that called Visual Battle
 *     Environment. The reason why parallaxes aren't made for battle is because
 *     the way parallaxes are handled in map vary from how they would be
 *     handled in battle. Using the Visual Parallaxes Plugin Commands will only
 *     alter the parallax appearances when the player finishes battle.
 * * Feature Update!
 * ** Added fail safes to prevent Plugin Command usage during battle to cause
 *    problems while inside battle test. Update made by Irina.
 * 
 * Version 1.02: June 25, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for Event Title Scene.
 * 
 * Version 1.01: May 28, 2021
 * * Feature Update!
 * ** Fail safe added for those without Pixi JS Filters added.
 * ** Removed the VisuStella MZ Core Engine requirement.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00 Official Release Date: March 12, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxAddChangeSettings
 * @text Parallax: Add/Change Settings
 * @desc Add/Change settings for target parallax. Not map notes.
 * This is temporary and will be reset upon re-entering the map.
 * 
 * @arg Required
 *
 * @arg id:num
 * @text ID
 * @parent Required
 * @type number
 * @min 1
 * @desc What is the ID of this parallax to be added/changed?
 * @default 1
 *
 * @arg filename:str
 * @text Filename
 * @parent Required
 * @type file
 * @dir img/parallaxes/
 * @desc What is the filename of the parallax?
 * @default >>>ATTENTION<<<
 *
 * @arg type:str
 * @text Type
 * @parent Required
 * @type select
 * @option Normal
 * @value normal
 * @option Water
 * @value water
 * @option Solid
 * @value solid
 * @desc What kind of parallax is this going to be?
 * @default normal
 *
 * @arg Optional:struct
 * @text Optional Settings
 * @type struct<Optional>
 * @desc Optional settings regarding Visual Parallaxes.
 * @default {"Scrolling":"","_parallaxZero:eval":"false","_parallaxLoopX:eval":"false","_parallaxSx:eval":"+0","_parallaxLoopY:eval":"false","_parallaxSy:eval":"+0","Appearance":"","opacity:eval":"255","blendMode:eval":"0","hue:eval":"0","hueShift:eval":"+0","colorTone:eval":"[0, 0, 0, 0]","Location":"","maskRegions:arraynum":"[]","maskTerrainTags:arraynum":"[]"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ParallaxFadeOpacity
 * @text Parallax: Fade Opacity
 * @desc Fades the target parallax(es) opacity to a different value.
 * This is temporary and will be reset upon re-entering the map.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Target which parallax(es)?
 * Cannot target the map editor's parallax.
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
 * @command ParallaxRemove
 * @text Parallax: Remove
 * @desc Removes target parallax(es).
 * This is temporary and will be reset upon re-entering the map.
 *
 * @arg list:arraynum
 * @text ID(s)
 * @type number[]
 * @min 1
 * @desc Remove which parallax(es)?
 * Cannot remove the map editor's parallax.
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
 * @param VisualParallaxes
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WaterReflect:struct
 * @text Water Reflection Settings
 * @type struct<WaterReflect>
 * @desc These are the default settings for water-based reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"1\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128","Boundary:num":"0.1","AmpStart:num":"2","AmpEnd:num":"4","WaveStart:num":"4","WaveEnd:num":"16"}
 *
 * @param SolidReflect:struct
 * @text Solid Reflection Settings
 * @type struct<SolidReflect>
 * @desc These are the default settings for solid ground reflections.
 * @default {"Markers":"","Regions:arraynum":"[]","TerrainTags:arraynum":"[\"2\"]","Positioning":"","Top:eval":"true","Appearance":"","Blur:num":"0.8","Opacity:num":"128"}
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
 * Water Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WaterReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["1"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place water reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
 *
 * @param Boundary:num
 * @text Water Boundary
 * @parent Appearance
 * @desc At which point is the water boundary?
 * Use a decimal number between 0 and 1.
 * @default 0.1
 *
 * @param AmpStart:num
 * @text Amplitude Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting amplitude value?
 * @default 2
 *
 * @param AmpEnd:num
 * @text Amplitude End
 * @parent Appearance
 * @type number
 * @desc What should be the ending amplitude value?
 * @default 4
 *
 * @param WaveStart:num
 * @text Wavelength Start
 * @parent Appearance
 * @type number
 * @desc What should be the starting wavelength value?
 * @default 4
 *
 * @param WaveEnd:num
 * @text Wavelength End
 * @parent Appearance
 * @type number
 * @desc What should be the ending wavelength value?
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Solid Reflection Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SolidReflect:
 *
 * @param Markers
 *
 * @param Regions:arraynum
 * @text Regions
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 255
 * @desc By default, which regions by default apply this reflection? 0 is ignored.
 * @default []
 *
 * @param TerrainTags:arraynum
 * @text Terrain Tags
 * @parent Markers
 * @type number[]
 * @min 1
 * @max 7
 * @desc By default, which terrain tags by default apply this reflection? 0 is ignored.
 * @default ["2"]
 * 
 * @param Positioning
 * 
 * @param Top:eval
 * @text Above Parallaxes?
 * @parent Positioning
 * @type boolean
 * @on Above Parallaxes
 * @off Below Parallaxes
 * @desc Place solid reflections above visual parallaxes?
 * @default true
 * 
 * @param Appearance
 *
 * @param Blur:num
 * @text Blur Rate
 * @parent Appearance
 * @desc How much do you wish to blur this reflection?
 * Use a decimal number between 0 and 1.
 * @default 0.8
 *
 * @param Opacity:num
 * @text Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What is the default opacity for this reflection?
 * Use a value between 0 and 255.
 * @default 128
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
 * @param _parallaxZero:eval
 * @text Map Lock?
 * @parent Scrolling
 * @type boolean
 * @on Map Lock
 * @off No Map Lock
 * @desc Lock the parallax to the map's scrolling?
 * Automatically enable if the filename starts with "!"
 * @default false
 * 
 * @param _parallaxLoopX:eval
 * @text Loop Horizontally?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSx:eval
 * @text Scroll:
 * @parent _parallaxLoopX:eval
 * @desc What is the horizontal scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param _parallaxLoopY:eval
 * @text Loop Vertically?
 * @parent Scrolling
 * @type boolean
 * @on Loop
 * @off No Loop
 * @desc Loop the parallax horizontally?
 * Does not work with Map Lock enabled.
 * @default false
 *
 * @param _parallaxSy:eval
 * @text Scroll:
 * @parent _parallaxLoopY:eval
 * @desc What is the vertical scroll speed?
 * Use a negative value to invert the direction.
 * @default +0
 * 
 * @param Appearance
 *
 * @param opacity:eval
 * @text Opacity
 * @parent Appearance
 * @desc What is the opacity level for this parallax?
 * You may use JavaScript code.
 * @default 255
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
 * @desc What kind of blend mode do you wish to apply to the parallax?
 * You may use JavaScript code.
 * @default 0
 *
 * @param hue:eval
 * @text Hue
 * @parent Appearance
 * @desc Do you wish to adjust this parallax's hue?
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
 * @desc What tone do you want for the parallax?
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
 * @desc Which regions will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 * @param maskTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Location
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags will show this parallax?
 * Does not work with 0. Leave empty to ignore.
 * @default []
 *
 */
//=============================================================================

function _0xc04d(){const _0x4da04b=['693108BWJhco','_blurFilter','push','ConvertParams','End','_solidReflectContainer','OpacityFlat','match','updateSolidReflections','updateZoom','_maskSprite','_reflection','SolidRegions','clone','updateTone','move','DEFAULT_WATER_REFLECTION_FILTER_BLUR','parse','Spriteset_Map_createSpawnedEvent','updateOpacity','Start','createWaterReflectionLayer','scrollRight','_reflectFilter','description','list','DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY','_hasWaterReflections','SolidOpacityRate','_waterReflectContainer','_waterReflectLayer','TerrainTags','exit','updateBlendMode','targetOpacity','isEventTest','11622tZXgxC','DEFAULT_WATER_REFLECTION_FILTER_TOP','_createColorFilter','ParallaxRemove','initVisualParallaxesEffects','removeChild','Spriteset_Map_createParallax','DEFAULT_SOLID_REFLECTION_FILTER_OPACITY','width','getWaterReflectionOpacity','_parallaxSx','getSolidReflectionTerrainTags','_scene','DEFAULT_SOLID_REFLECTION_FILTER_BLUR','ceil','2572212kxuvPj','addLoadListener','WaterRegions','WaterBottom','create','AmpEnd','DEFAULT_SOLID_REFLECTION_REGIONS','updateParallax','removeVisualParallax','update','WaveEnd','registerCommand','water','charAt','addChild','DEFAULT_WATER_REFLECTION_FILTER_AMPLITUDE','DEFAULT_WATER_REFLECTION_TERRAINTAGS','Game_Map_scrollLeft','isSceneMap','1084644yWlArx','ARRAYJSON','isLoopHorizontal','code','createReflectionMask','DEFAULT_SOLID_REFLECTION_TERRAINTAGS','remove','BlurFilter','reverseData','destroy','getSolidReflectionRegions','getWaterReflectionAmplitude','registerReflectionSettings','map','Game_Map_scrollUp','tileWidth','SpriteMaskFilter','bitmap','createCharacterReflections','HueShift','SolidTerrainTags','hueShift','_parallaxX','_parallaxLoopY','16ODzJRq','OpacityRate','_maskFilter','_displayY','name','getWaterReflectionTop','tileHeight','status','STRUCT','format','settings','wasolidter','getSolidReflectionTop','getWaterReflectionRegions','loadBitmap','toUpperCase','WaterReflect','WaterAmplitude','CreateLayerData','Game_Map_setup','_parallaxName','setupPageSettings','_scaleX','getVisualParallaxes','type','getSolidReflectionOpacity','_parallaxZero','equals','NUM','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','terrainTag','NoReflection','vehicles','4530114mBMswP','WaterTerrainTags','layeredTiles','setupVisualParallaxesCommentTags','opacity','SolidOpacityFlat','findTargetVisualParallax','maskRegions','_scaleY','_grafterRefreshRegions','_updateColorFilter','filters','mapId','maskTerrainTags','MULTIPLY','getWaterReflectionBlur','_colorTone','loadParallax','4301094LvJtlt','_mask','isInstanceOfSceneMap','DEFAULT_WATER_REFLECTION_FILTER_OPACITY','_visualParallaxSettings','mask','isLoopVertical','_id','Boundary','Argument\x20must\x20be\x20an\x20array','Game_Map_updateParallax','updateHue','setupVisualParallaxesEffects','Spriteset_Map_createCharacters','scale','addChangeVisualParallax','scrollLeft','setHue','createMaskBitmap','setup','max','Opacity','VertLoop','_parallaxLoopX','prototype','WaterOpacityFlat','STR','updateScaleBase','regionId','Top','getWaterReflectionWavelength','parameters','makeDeepCopy','WaveStart','round','Game_Event_clearPageSettings','opacityDuration','_lastVisualParallaxMapID','ScrollLock','ReflectionFilter','screenTileY','_solidReflectLayer','1965YmWPKz','>>>ATTENTION<<<','clamp','HorzLoop','height','createSolidReflectionLayer','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','find','createSolidReflectionMask','JSON','_noReflection','floor','_character','createParallax','_parallaxContainer','SolidBlur','getSolidReflectionBlur','updateVisualParallaxLayer','displayX','updateMask','return\x200','updateOrigin','_colorFilter','noReflections','createSpawnedEvent','displayY','blendMode','events','_baseSprite','filename','setDisplayPos','_displayX','sortVisualParallaxes','page','ARRAYSTRUCT','getVisualParallaxOy','RegExp','_solidReflectAdded','updateWaterReflections','createParallaxContainer','SolidReflect','_waterReflectAdded','Optional','ARRAYFUNC','note','getWaterReflectionTerrainTags','398928yWsxHk','Game_Map_scrollRight','Game_Map_scrollDown','createWaterReflectionMask','includes','ParallaxAddChangeSettings','WaterOpacityRate','hasOwnProperty','Filename','scrollUp','MaskRegions','length','checkVisualParallaxesStringTags','_parallaxDataRef','setColorTone','createMaskSprite','Hue','_hue','getVisualParallaxSettings','_hasSolidReflections','VisuMZ_2_TileGrafterSystem','Spriteset_Map_update','Settings','initialize','updateVisualParallaxSettings','call','SolidBottom','bind','getVisualParallaxOx','ADDITIVE','_parallaxSy','filter','origin','hue','clearPageSettings','createCharacters','VisualParallaxes','tilesetFlags','DEFAULT_SOLID_REFLECTION_FILTER_TOP','hasWaterReflections','trim','TemplateSettings','getWaterReflectionBoundary','scrollDown','sort','_parallaxY','Blur','colorTone','constructor','DEFAULT_WATER_REFLECTION_REGIONS','screenTileX','setupRadialLight','hasSolidReflections','BlendMode','zoomScale','setupVisualParallaxes','Regions','EVAL','fillRect','followers','createParallaxLayers','#ffffff','split','children','createNewParallaxLayer','ARRAYEVAL','Game_Map_setDisplayPos'];_0xc04d=function(){return _0x4da04b;};return _0xc04d();}const _0x307ba3=_0x32ca;(function(_0x3d134e,_0x1a80bc){const _0x423c61=_0x32ca,_0x10eda6=_0x3d134e();while(!![]){try{const _0x17576b=parseInt(_0x423c61(0xea))/0x1+parseInt(_0x423c61(0x173))/0x2+-parseInt(_0x423c61(0x12d))/0x3+-parseInt(_0x423c61(0x160))/0x4+parseInt(_0x423c61(0x1e8))/0x5*(parseInt(_0x423c61(0x151))/0x6)+parseInt(_0x423c61(0x1be))/0x7+-parseInt(_0x423c61(0x18b))/0x8*(parseInt(_0x423c61(0x1ac))/0x9);if(_0x17576b===_0x1a80bc)break;else _0x10eda6['push'](_0x10eda6['shift']());}catch(_0x4f8321){_0x10eda6['push'](_0x10eda6['shift']());}}}(_0xc04d,0x6a7b8));var label=_0x307ba3(0x10e),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0xee0f62){const _0x2feaee=_0x307ba3;return _0xee0f62[_0x2feaee(0x192)]&&_0xee0f62[_0x2feaee(0x145)][_0x2feaee(0xee)]('['+label+']');})[0x0];VisuMZ[label][_0x307ba3(0x100)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x307ba3(0x130)]=function(_0x12d657,_0x16def2){const _0x84cef3=_0x307ba3;for(const _0x497abc in _0x16def2){if(_0x497abc[_0x84cef3(0x134)](/(.*):(.*)/i)){const _0x409f99=String(RegExp['$1']),_0x4a86e2=String(RegExp['$2'])[_0x84cef3(0x19a)]()['trim']();let _0x4b9bdd,_0x420c19,_0x5cec31;switch(_0x4a86e2){case _0x84cef3(0x1a7):_0x4b9bdd=_0x16def2[_0x497abc]!==''?Number(_0x16def2[_0x497abc]):0x0;break;case'ARRAYNUM':_0x420c19=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):[],_0x4b9bdd=_0x420c19[_0x84cef3(0x180)](_0x46760f=>Number(_0x46760f));break;case _0x84cef3(0x123):_0x4b9bdd=_0x16def2[_0x497abc]!==''?eval(_0x16def2[_0x497abc]):null;break;case _0x84cef3(0x12b):_0x420c19=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):[],_0x4b9bdd=_0x420c19['map'](_0x34e9e4=>eval(_0x34e9e4));break;case _0x84cef3(0x1f1):_0x4b9bdd=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):'';break;case _0x84cef3(0x174):_0x420c19=_0x16def2[_0x497abc]!==''?JSON['parse'](_0x16def2[_0x497abc]):[],_0x4b9bdd=_0x420c19[_0x84cef3(0x180)](_0x524ef6=>JSON['parse'](_0x524ef6));break;case'FUNC':_0x4b9bdd=_0x16def2[_0x497abc]!==''?new Function(JSON['parse'](_0x16def2[_0x497abc])):new Function(_0x84cef3(0x1fc));break;case _0x84cef3(0xe7):_0x420c19=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):[],_0x4b9bdd=_0x420c19[_0x84cef3(0x180)](_0x23fb6d=>new Function(JSON[_0x84cef3(0x13e)](_0x23fb6d)));break;case _0x84cef3(0x1d8):_0x4b9bdd=_0x16def2[_0x497abc]!==''?String(_0x16def2[_0x497abc]):'';break;case'ARRAYSTR':_0x420c19=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):[],_0x4b9bdd=_0x420c19[_0x84cef3(0x180)](_0x226b19=>String(_0x226b19));break;case _0x84cef3(0x193):_0x5cec31=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):{},_0x4b9bdd=VisuMZ[_0x84cef3(0x130)]({},_0x5cec31);break;case _0x84cef3(0xde):_0x420c19=_0x16def2[_0x497abc]!==''?JSON[_0x84cef3(0x13e)](_0x16def2[_0x497abc]):[],_0x4b9bdd=_0x420c19[_0x84cef3(0x180)](_0xc88472=>VisuMZ[_0x84cef3(0x130)]({},JSON[_0x84cef3(0x13e)](_0xc88472)));break;default:continue;}_0x12d657[_0x409f99]=_0x4b9bdd;}}return _0x12d657;},(_0x5da988=>{const _0x4d7960=_0x307ba3,_0x227a1f=_0x5da988[_0x4d7960(0x18f)];for(const _0x1979a5 of dependencies){if(!Imported[_0x1979a5]){alert(_0x4d7960(0x1a8)[_0x4d7960(0x194)](_0x227a1f,_0x1979a5)),SceneManager[_0x4d7960(0x14d)]();break;}}const _0x3d2f39=_0x5da988['description'];if(_0x3d2f39[_0x4d7960(0x134)](/\[Version[ ](.*?)\]/i)){const _0x2bd36c=Number(RegExp['$1']);_0x2bd36c!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x227a1f,_0x2bd36c)),SceneManager[_0x4d7960(0x14d)]());}if(_0x3d2f39[_0x4d7960(0x134)](/\[Tier[ ](\d+)\]/i)){const _0x14a09e=Number(RegExp['$1']);_0x14a09e<tier?(alert(_0x4d7960(0x1ee)[_0x4d7960(0x194)](_0x227a1f,_0x14a09e,tier)),SceneManager[_0x4d7960(0x14d)]()):tier=Math[_0x4d7960(0x1d2)](_0x14a09e,tier);}VisuMZ[_0x4d7960(0x130)](VisuMZ[label]['Settings'],_0x5da988['parameters']);})(pluginData),VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x113)]=function(){return{'id':0x0,'filename':'','_parallaxZero':![],'_parallaxLoopX':![],'_parallaxLoopY':![],'_parallaxSx':0x0,'_parallaxSy':0x0,'_parallaxX':0x0,'_parallaxY':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'blendMode':0x0,'hue':0x0,'hueShift':0x0,'colorTone':[0x0,0x0,0x0,0x0],'maskRegions':[],'maskTerrainTags':[]};},PluginManager[_0x307ba3(0x16b)](pluginData[_0x307ba3(0x18f)],_0x307ba3(0xef),_0xd01a5e=>{const _0x1b3672=_0x307ba3;VisuMZ['ConvertParams'](_0xd01a5e,_0xd01a5e);if(_0xd01a5e['id']<=0x0)return;if(_0xd01a5e['filename']===''||_0xd01a5e[_0x1b3672(0xd9)]===_0x1b3672(0x1e9))return;let _0x2d5c99=JsonEx['makeDeepCopy'](_0xd01a5e[_0x1b3672(0xe6)]);if(!_0x2d5c99[_0x1b3672(0xf1)](_0x1b3672(0x1b3)))_0x2d5c99=VisuMZ['VisualParallaxes']['TemplateSettings']();_0x2d5c99[_0x1b3672(0xd9)]=_0xd01a5e[_0x1b3672(0xd9)],_0x2d5c99['id']=_0xd01a5e['id'];_0xd01a5e[_0x1b3672(0x1a3)]===_0x1b3672(0x16c)&&(_0x2d5c99[_0x1b3672(0x1b3)][_0x1b3672(0xf5)]<=0x0&&(_0x2d5c99['maskRegions']=JsonEx[_0x1b3672(0x1de)]($gameMap['getWaterReflectionRegions']())),_0x2d5c99[_0x1b3672(0x1b9)][_0x1b3672(0xf5)]<=0x0&&(_0x2d5c99['maskTerrainTags']=JsonEx[_0x1b3672(0x1de)]($gameMap['getWaterReflectionTerrainTags']())));_0xd01a5e[_0x1b3672(0x1a3)]===_0x1b3672(0x196)&&(_0x2d5c99[_0x1b3672(0x1b3)][_0x1b3672(0xf5)]<=0x0&&(_0x2d5c99[_0x1b3672(0x1b3)]=JsonEx[_0x1b3672(0x1de)]($gameMap[_0x1b3672(0x17d)]())),_0x2d5c99[_0x1b3672(0x1b9)]['length']<=0x0&&(_0x2d5c99[_0x1b3672(0x1b9)]=JsonEx[_0x1b3672(0x1de)]($gameMap['getSolidReflectionTerrainTags']())));while(_0x2d5c99[_0x1b3672(0x119)][_0x1b3672(0xf5)]<0x4){_0x2d5c99[_0x1b3672(0x119)][_0x1b3672(0x12f)](0x0);}_0x2d5c99[_0x1b3672(0x189)]=0x0,_0x2d5c99['_parallaxY']=0x0,_0x2d5c99[_0x1b3672(0x14f)]=_0xd01a5e['opacity'],_0x2d5c99['opacityDuration']=0x0,$gameMap[_0x1b3672(0x1cd)](_0x2d5c99);}),PluginManager[_0x307ba3(0x16b)](pluginData[_0x307ba3(0x18f)],'ParallaxFadeOpacity',_0x26eb43=>{const _0x5444c2=_0x307ba3;if(!SceneManager[_0x5444c2(0x1c0)]())return;VisuMZ[_0x5444c2(0x130)](_0x26eb43,_0x26eb43);const _0x4a8415=_0x26eb43[_0x5444c2(0x146)];for(const _0x2b2908 of _0x4a8415){const _0xcc9553=$gameMap['getVisualParallaxSettings'](_0x2b2908);if(!_0xcc9553)continue;_0xcc9553[_0x5444c2(0x14f)]=_0x26eb43[_0x5444c2(0x14f)]||0x0,_0xcc9553[_0x5444c2(0x1e2)]=_0x26eb43[_0x5444c2(0x1e2)]||0x0,_0xcc9553[_0x5444c2(0x1e2)]<=0x0&&(_0xcc9553[_0x5444c2(0x1b0)]=_0xcc9553[_0x5444c2(0x14f)]);}}),PluginManager[_0x307ba3(0x16b)](pluginData[_0x307ba3(0x18f)],_0x307ba3(0x154),_0x3fd235=>{const _0x427a4e=_0x307ba3;if(!SceneManager[_0x427a4e(0x1c0)]())return;VisuMZ[_0x427a4e(0x130)](_0x3fd235,_0x3fd235);const _0x26b434=_0x3fd235['list'];for(const _0x34a3e6 of _0x26b434){$gameMap[_0x427a4e(0x168)](_0x34a3e6);}}),VisuMZ['VisualParallaxes'][_0x307ba3(0xe0)]={'Start':/<(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'End':/<\/(?:PARALLAX|WATER PARALLAX|SOLID PARALLAX)[ ](\d+)[ ](?:SETTING|SETTINGS)>/i,'Filename':/(?:FILENAME|NAME):[ ](.*)/i,'HorzLoop':/(?:HORZ|HORIZONTAL) (?:LOOP|SCROLL):[ ](.*)/i,'VertLoop':/(?:VERT|VERTICAL) (?:LOOP|SCROLL):[ ](.*)/i,'ScrollLock':/<(?:MAP|SCROLL)[ ](?:LOCK|LOCKED)>/i,'OpacityRate':/(?:OPACITY):[ ](\d+)([%％])/i,'OpacityFlat':/(?:OPACITY):[ ](\d+)/i,'BlendMode':/BLEND MODE:[ ](.*)/i,'Hue':/HUE:[ ](\d+)/i,'HueShift':/HUE (?:SHIFT|SPEED):[ ](.*)/i,'Tone':/(?:COLOR TONE|TONE|TINT):[ ](.*)/i,'MaskRegions':/(?:REGION|REGIONS):[ ](.*)/i,'MaskTerrainTags':/TERRAIN (?:TAG|TAGS):[ ](.*)/i,'WaterRegions':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'WaterTerrainTags':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'WaterTop':/<(?:WATER|WATER REFLECT|WATER REFLECTION) TOP>/i,'WaterBottom':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOTTOM>/i,'WaterBlur':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BLUR:[ ](.*)>/i,'WaterOpacityRate':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'WaterOpacityFlat':/<(?:WATER|WATER REFLECT|WATER REFLECTION) OPACITY:[ ](\d+)>/i,'WaterBoundary':/<(?:WATER|WATER REFLECT|WATER REFLECTION) BOUNDARY:[ ](.*)>/i,'WaterAmplitude':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:AMP|AMPLITUDE):[ ](.*)>/i,'WaterWavelength':/<(?:WATER|WATER REFLECT|WATER REFLECTION) (?:WAVE|WAVELENGTH):[ ](.*)>/i,'SolidRegions':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) (?:REGION|REGIONS):[ ](.*)>/i,'SolidTerrainTags':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'SolidTop':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) TOP>/i,'SolidBottom':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BOTTOM>/i,'SolidBlur':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) BLUR:[ ](.*)>/i,'SolidOpacityRate':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)([%％])>/i,'SolidOpacityFlat':/<(?:SOLID|SOLID REFLECT|SOLID REFLECTION) OPACITY:[ ](\d+)>/i,'NoReflection':/<NO (?:REFLECT|REFLECTION|REFLECTIONS)>/i},SceneManager[_0x307ba3(0x172)]=function(){const _0x31d856=_0x307ba3;return this['_scene']&&this[_0x31d856(0x15d)][_0x31d856(0x11a)]===Scene_Map;},SceneManager[_0x307ba3(0x1c0)]=function(){const _0x1c8fb7=_0x307ba3;return this[_0x1c8fb7(0x15d)]&&this[_0x1c8fb7(0x15d)]instanceof Scene_Map;},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x19e)]=Game_Map['prototype'][_0x307ba3(0x1d1)],Game_Map['prototype'][_0x307ba3(0x1d1)]=function(_0x4f7fd9){const _0x32d1e3=_0x307ba3;VisuMZ['VisualParallaxes'][_0x32d1e3(0x19e)][_0x32d1e3(0x103)](this,_0x4f7fd9),this['setupVisualParallaxes'](),this[_0x32d1e3(0x17f)]();},Game_Map[_0x307ba3(0x11b)]=VisuMZ['VisualParallaxes']['Settings'][_0x307ba3(0x19b)][_0x307ba3(0x122)],Game_Map[_0x307ba3(0x170)]=VisuMZ['VisualParallaxes']['Settings'][_0x307ba3(0x19b)][_0x307ba3(0x14c)],Game_Map[_0x307ba3(0x1d6)]['noReflections']=function(){const _0x509f02=_0x307ba3;if(DataManager[_0x509f02(0x150)]())return!![];if(this['isLoopHorizontal']()||this['isLoopVertical']())return!![];const _0x3310f4=VisuMZ[_0x509f02(0x10e)][_0x509f02(0xe0)],_0x1d8e20=$dataMap['note']||'';return _0x1d8e20['match'](_0x3310f4[_0x509f02(0x1aa)])?!![]:![];},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x198)]=function(){const _0x4d7376=_0x307ba3,_0x3bd89b=VisuMZ['VisualParallaxes'][_0x4d7376(0xe0)],_0x378fbd=$dataMap[_0x4d7376(0xe8)]||'';if(_0x378fbd[_0x4d7376(0x134)](_0x3bd89b[_0x4d7376(0x162)]))return String(RegExp['$1'])[_0x4d7376(0x128)](',')[_0x4d7376(0x180)](_0x21f7d8=>Number(_0x21f7d8)||0x1)[_0x4d7376(0x179)](0x0);return JsonEx[_0x4d7376(0x1de)](Game_Map[_0x4d7376(0x11b)])['remove'](0x0);},Game_Map['prototype'][_0x307ba3(0xe9)]=function(){const _0x379935=_0x307ba3,_0x26276d=VisuMZ[_0x379935(0x10e)][_0x379935(0xe0)],_0x2f0bc9=$dataMap[_0x379935(0xe8)]||'';if(_0x2f0bc9['match'](_0x26276d[_0x379935(0x1ad)]))return String(RegExp['$1'])[_0x379935(0x128)](',')[_0x379935(0x180)](_0x23ce72=>Number(_0x23ce72)||0x1)['remove'](0x0);return JsonEx[_0x379935(0x1de)](Game_Map[_0x379935(0x170)])['remove'](0x0);},Game_Map[_0x307ba3(0x152)]=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)][_0x307ba3(0x19b)][_0x307ba3(0x1db)],Game_Map[_0x307ba3(0x13d)]=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)][_0x307ba3(0x19b)][_0x307ba3(0x118)],Game_Map[_0x307ba3(0x1c1)]=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)][_0x307ba3(0x19b)][_0x307ba3(0x1d3)],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BOUNDARY']=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)]['WaterReflect'][_0x307ba3(0x1c6)],Game_Map[_0x307ba3(0x16f)]=[VisuMZ['VisualParallaxes'][_0x307ba3(0x100)][_0x307ba3(0x19b)]['AmpStart'],VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)][_0x307ba3(0x19b)][_0x307ba3(0x165)]],Game_Map['DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH']=[VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)]['WaterReflect'][_0x307ba3(0x1df)],VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)]['WaterReflect'][_0x307ba3(0x16a)]],Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x190)]=function(){const _0x204295=_0x307ba3,_0x2ea7a3=VisuMZ[_0x204295(0x10e)][_0x204295(0xe0)],_0x1d1c6a=$dataMap[_0x204295(0xe8)]||'';if(_0x1d1c6a[_0x204295(0x134)](_0x2ea7a3['WaterTop']))return!![];else{if(_0x1d1c6a[_0x204295(0x134)](_0x2ea7a3[_0x204295(0x163)]))return![];}return Game_Map[_0x204295(0x152)];},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1bb)]=function(){const _0x30f2e7=_0x307ba3,_0x52a9c6=VisuMZ[_0x30f2e7(0x10e)][_0x30f2e7(0xe0)],_0x1b4610=$dataMap[_0x30f2e7(0xe8)]||'';if(_0x1b4610[_0x30f2e7(0x134)](_0x52a9c6['WaterBlur']))return Math[_0x30f2e7(0x1d2)](0x0,Number(RegExp['$1'])||0x0);return Game_Map['DEFAULT_WATER_REFLECTION_FILTER_BLUR'];},Game_Map[_0x307ba3(0x1d6)]['getWaterReflectionOpacity']=function(){const _0x32b780=_0x307ba3,_0x475e85=VisuMZ[_0x32b780(0x10e)][_0x32b780(0xe0)],_0x205f37=$dataMap[_0x32b780(0xe8)]||'';if(_0x205f37[_0x32b780(0x134)](_0x475e85[_0x32b780(0xf0)]))return Math[_0x32b780(0x1e0)]((Number(RegExp['$1'])||0x0)*0.01*0xff)[_0x32b780(0x1ea)](0x0,0xff);else{if(_0x205f37['match'](_0x475e85[_0x32b780(0x1d7)]))return(Number(RegExp['$1'])||0x0)[_0x32b780(0x1ea)](0x0,0xff);}return Game_Map[_0x32b780(0x158)];},Game_Map['prototype'][_0x307ba3(0x114)]=function(){const _0x207294=_0x307ba3,_0xf90fcb=VisuMZ[_0x207294(0x10e)][_0x207294(0xe0)],_0x389db0=$dataMap[_0x207294(0xe8)]||'';if(_0x389db0[_0x207294(0x134)](_0xf90fcb['WaterBoundary']))return(Number(RegExp['$1'])||0x0)[_0x207294(0x1ea)](0x0,0x1);return Game_Map[_0x207294(0x147)];},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x17e)]=function(){const _0x4718fb=_0x307ba3,_0x7d2f4a=VisuMZ[_0x4718fb(0x10e)]['RegExp'],_0x5fdb3b=$dataMap[_0x4718fb(0xe8)]||'';if(_0x5fdb3b[_0x4718fb(0x134)](_0x7d2f4a[_0x4718fb(0x19c)])){const _0x446b5a=String(RegExp['$1'])[_0x4718fb(0x128)](',')[_0x4718fb(0x180)](_0x317025=>Number(_0x317025)||0x0);if(_0x446b5a[_0x4718fb(0xf5)]<=0x1)_0x446b5a[0x1]=_0x446b5a[0x0];}return JsonEx[_0x4718fb(0x1de)](Game_Map[_0x4718fb(0x16f)])[_0x4718fb(0x179)](0x0);},Game_Map['prototype']['getWaterReflectionWavelength']=function(){const _0x4256ef=_0x307ba3,_0x140247=VisuMZ[_0x4256ef(0x10e)][_0x4256ef(0xe0)],_0x52e4bf=$dataMap[_0x4256ef(0xe8)]||'';if(_0x52e4bf[_0x4256ef(0x134)](_0x140247[_0x4256ef(0x19c)])){const _0x1cca24=String(RegExp['$1'])[_0x4256ef(0x128)](',')['map'](_0x716b53=>Number(_0x716b53)||0x0);if(_0x1cca24['length']<=0x1)_0x1cca24[0x1]=_0x1cca24[0x0];}return JsonEx[_0x4256ef(0x1de)](Game_Map['DEFAULT_WATER_REFLECTION_FILTER_WAVELENGTH'])[_0x4256ef(0x179)](0x0);},Game_Map[_0x307ba3(0x166)]=VisuMZ['VisualParallaxes'][_0x307ba3(0x100)][_0x307ba3(0xe4)][_0x307ba3(0x122)],Game_Map[_0x307ba3(0x178)]=VisuMZ[_0x307ba3(0x10e)]['Settings']['SolidReflect']['TerrainTags'],Game_Map[_0x307ba3(0x1d6)]['getSolidReflectionRegions']=function(){const _0x2d7d0b=_0x307ba3,_0xe19961=VisuMZ[_0x2d7d0b(0x10e)]['RegExp'],_0x207321=$dataMap[_0x2d7d0b(0xe8)]||'';if(_0x207321['match'](_0xe19961[_0x2d7d0b(0x139)]))return String(RegExp['$1'])[_0x2d7d0b(0x128)](',')[_0x2d7d0b(0x180)](_0x4826c8=>Number(_0x4826c8)||0x1)[_0x2d7d0b(0x179)](0x0);return JsonEx['makeDeepCopy'](Game_Map[_0x2d7d0b(0x166)])[_0x2d7d0b(0x179)](0x0);},Game_Map[_0x307ba3(0x1d6)]['getSolidReflectionTerrainTags']=function(){const _0x2e074e=_0x307ba3,_0x37d918=VisuMZ[_0x2e074e(0x10e)][_0x2e074e(0xe0)],_0x4901ad=$dataMap[_0x2e074e(0xe8)]||'';if(_0x4901ad[_0x2e074e(0x134)](_0x37d918[_0x2e074e(0x187)]))return String(RegExp['$1'])[_0x2e074e(0x128)](',')[_0x2e074e(0x180)](_0x34c97f=>Number(_0x34c97f)||0x1)[_0x2e074e(0x179)](0x0);return JsonEx['makeDeepCopy'](Game_Map['DEFAULT_SOLID_REFLECTION_TERRAINTAGS'])['remove'](0x0);},Game_Map[_0x307ba3(0x110)]=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)]['SolidReflect']['Top'],Game_Map[_0x307ba3(0x15e)]=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)][_0x307ba3(0xe4)][_0x307ba3(0x118)],Game_Map[_0x307ba3(0x158)]=VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x100)][_0x307ba3(0xe4)][_0x307ba3(0x1d3)],Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x197)]=function(){const _0x242933=_0x307ba3,_0xae2f89=VisuMZ[_0x242933(0x10e)][_0x242933(0xe0)],_0x55316b=$dataMap[_0x242933(0xe8)]||'';if(_0x55316b[_0x242933(0x134)](_0xae2f89['SolidTop']))return!![];else{if(_0x55316b[_0x242933(0x134)](_0xae2f89[_0x242933(0x104)]))return![];}return Game_Map[_0x242933(0x110)];},Game_Map[_0x307ba3(0x1d6)]['getSolidReflectionBlur']=function(){const _0x5de107=_0x307ba3,_0x51d2d5=VisuMZ['VisualParallaxes'][_0x5de107(0xe0)],_0x2fea69=$dataMap[_0x5de107(0xe8)]||'';if(_0x2fea69[_0x5de107(0x134)](_0x51d2d5[_0x5de107(0x1f7)]))return Math['max'](0x0,Number(RegExp['$1'])||0x0);return Game_Map[_0x5de107(0x15e)];},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1a4)]=function(){const _0xbf5319=_0x307ba3,_0x7babfe=VisuMZ[_0xbf5319(0x10e)][_0xbf5319(0xe0)],_0x44c825=$dataMap[_0xbf5319(0xe8)]||'';if(_0x44c825['match'](_0x7babfe[_0xbf5319(0x149)]))return Math[_0xbf5319(0x1e0)]((Number(RegExp['$1'])||0x0)*0.01*0xff)['clamp'](0x0,0xff);else{if(_0x44c825[_0xbf5319(0x134)](_0x7babfe[_0xbf5319(0x1b1)]))return(Number(RegExp['$1'])||0x0)[_0xbf5319(0x1ea)](0x0,0xff);}return Game_Map[_0xbf5319(0x158)];},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x17f)]=function(){const _0x4cd33d=_0x307ba3,_0x4a1136=this['getWaterReflectionRegions'](),_0x5066c7=this[_0x4cd33d(0xe9)](),_0x20055d=this[_0x4cd33d(0x17d)](),_0x56cd09=this[_0x4cd33d(0x15c)](),_0x4ba696=this[_0x4cd33d(0x159)](),_0x4a03bb=this['height']();this[_0x4cd33d(0x148)]=![],this[_0x4cd33d(0xfd)]=![];const _0x4baa1c=this[_0x4cd33d(0x10f)]();for(let _0x310bc7=0x0;_0x310bc7<_0x4ba696;_0x310bc7++){for(let _0x1181f3=0x0;_0x1181f3<_0x4a03bb;_0x1181f3++){const _0x1004b5=this[_0x4cd33d(0x1da)](_0x310bc7,_0x1181f3);_0x4a1136[_0x4cd33d(0xee)](_0x1004b5)&&(this['_hasWaterReflections']=!![]);_0x20055d[_0x4cd33d(0xee)](_0x1004b5)&&(this[_0x4cd33d(0xfd)]=!![]);const _0x5b9bbe=this[_0x4cd33d(0x1ae)](_0x310bc7,_0x1181f3);for(const _0x4b037c of _0x5b9bbe){if(_0x4b037c<0x400)continue;const _0x22d120=_0x4baa1c[_0x4b037c]>>0xc;_0x5066c7['includes'](_0x22d120)&&(this[_0x4cd33d(0x148)]=!![]),_0x56cd09['includes'](_0x22d120)&&(this[_0x4cd33d(0xfd)]=!![]);}if(this[_0x4cd33d(0x148)]&&this['_hasSolidReflections'])break;}}},Game_Map[_0x307ba3(0x1d6)]['hasWaterReflections']=function(){const _0x5c3a99=_0x307ba3;if(this[_0x5c3a99(0x148)]===undefined)this[_0x5c3a99(0x17f)]();return this[_0x5c3a99(0x148)];},Game_Map[_0x307ba3(0x1d6)]['hasSolidReflections']=function(){const _0x108bb0=_0x307ba3;if(this[_0x108bb0(0xfd)]===undefined)this[_0x108bb0(0x17f)]();return this[_0x108bb0(0xfd)];},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x121)]=function(){const _0x3dd848=_0x307ba3;this[_0x3dd848(0x1e3)]!==this[_0x3dd848(0x1b8)]()&&(this[_0x3dd848(0x1e3)]=this['mapId'](),this['_visualParallaxSettings']=[null]);if(!$dataMap)return;const _0x3e049e=VisuMZ['VisualParallaxes'][_0x3dd848(0x19d)]();for(const _0x3884a4 of _0x3e049e){if(!_0x3884a4)continue;this[_0x3dd848(0x1c2)][_0x3884a4['id']]=_0x3884a4;}},VisuMZ[_0x307ba3(0x10e)]['CreateLayerData']=function(){const _0x961007=_0x307ba3;if(!$dataMap)return[];const _0x3d8546=[],_0x5551a9=VisuMZ[_0x961007(0x10e)][_0x961007(0x113)]();if(!$dataMap[_0x961007(0xe8)])return[];const _0x131cc9=VisuMZ[_0x961007(0x10e)][_0x961007(0xe0)],_0x585f37=$dataMap[_0x961007(0xe8)][_0x961007(0x128)](/[\r\n]+/);let _0x2c532f=JsonEx[_0x961007(0x1de)](_0x5551a9);for(const _0x1d566f of _0x585f37){if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x141)])){_0x2c532f['id']=Number(RegExp['$1']);if(_0x1d566f[_0x961007(0x134)](/WATER/i))_0x2c532f['maskRegions']=JsonEx[_0x961007(0x1de)]($gameMap['getWaterReflectionRegions']()),_0x2c532f['maskTerrainTags']=JsonEx[_0x961007(0x1de)]($gameMap['getWaterReflectionTerrainTags']());else _0x1d566f[_0x961007(0x134)](/SOLID/i)&&(_0x2c532f[_0x961007(0x1b3)]=JsonEx[_0x961007(0x1de)]($gameMap['getSolidReflectionRegions']()),_0x2c532f[_0x961007(0x1b9)]=JsonEx['makeDeepCopy']($gameMap[_0x961007(0x15c)]()));}else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x131)])){const _0x3b81d1=Number(RegExp['$1']);if(_0x3b81d1>0x0&&_0x3b81d1===_0x2c532f['id']&&_0x2c532f[_0x961007(0xd9)]!=='')_0x3d8546[_0x961007(0x12f)](_0x2c532f);_0x2c532f=JsonEx[_0x961007(0x1de)](_0x5551a9);}else{if(_0x2c532f['id']<=0x0)continue;}}if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0xf2)]))_0x2c532f[_0x961007(0xd9)]=String(RegExp['$1'])[_0x961007(0x112)](),_0x2c532f[_0x961007(0xd9)][_0x961007(0x16d)](0x0)==='!'&&(_0x2c532f[_0x961007(0x1a5)]=!![]);else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x1eb)]))_0x2c532f[_0x961007(0x1d5)]=!![],_0x2c532f[_0x961007(0x15b)]=Number(RegExp['$1'])||0x0;else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x1d4)]))_0x2c532f[_0x961007(0x18a)]=!![],_0x2c532f[_0x961007(0x108)]=Number(RegExp['$1'])||0x0;else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x1e4)]))_0x2c532f['_parallaxZero']=!![];else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x18c)])){const _0x620401=Number(RegExp['$1'])*0.01;_0x2c532f[_0x961007(0x1b0)]=Math['round'](_0x620401*0xff)[_0x961007(0x1ea)](0x0,0xff);}else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x133)]))_0x2c532f[_0x961007(0x1b0)]=Number(RegExp['$1'])[_0x961007(0x1ea)](0x0,0xff);else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0x11f)])){const _0x1edfa5=String(RegExp['$1'])['toUpperCase']()[_0x961007(0x112)](),_0x48fc18=['NORMAL',_0x961007(0x107),_0x961007(0x1ba),'SCREEN'];_0x2c532f['blendMode']=_0x48fc18['indexOf'](_0x1edfa5)[_0x961007(0x1ea)](0x0,0x3);}else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9[_0x961007(0xfa)]))_0x2c532f[_0x961007(0x10b)]=Number(RegExp['$1'])[_0x961007(0x1ea)](0x0,0x168);else{if(_0x1d566f['match'](_0x131cc9[_0x961007(0x186)]))_0x2c532f[_0x961007(0x188)]=Number(RegExp['$1'])||0x0;else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9['Tone'])){const _0x2f1e60=String(RegExp['$1'])[_0x961007(0x128)](',')[_0x961007(0x180)](_0x1f3832=>Number(_0x1f3832)||0x0);while(_0x2f1e60[_0x961007(0xf5)]<0x4)_0x2f1e60['push'](0x0);_0x2c532f[_0x961007(0x119)]=_0x2f1e60;}else{if(_0x1d566f['match'](_0x131cc9[_0x961007(0xf4)])){const _0x1f8441=String(RegExp['$1'])[_0x961007(0x128)](',')[_0x961007(0x180)](_0x35e577=>Number(_0x35e577)||0x1);_0x2c532f[_0x961007(0x1b3)]=_0x1f8441;}else{if(_0x1d566f[_0x961007(0x134)](_0x131cc9['MaskTerrainTags'])){const _0x421206=String(RegExp['$1'])[_0x961007(0x128)](',')[_0x961007(0x180)](_0x3babd8=>Number(_0x3babd8)||0x1);_0x2c532f[_0x961007(0x1b9)]=_0x421206;}}}}}}}}}}}}}return _0x3d8546;},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1a2)]=function(){const _0x386911=_0x307ba3;return this[_0x386911(0x1c2)]===undefined&&this[_0x386911(0x121)](),this['_visualParallaxSettings'][_0x386911(0x109)](_0x9ffdb0=>!!_0x9ffdb0);},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0xfc)]=function(_0x1a90ef){const _0x3f1660=_0x307ba3;return this[_0x3f1660(0x1c2)]=this[_0x3f1660(0x1c2)]||[],this[_0x3f1660(0x1c2)][_0x1a90ef]||null;},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x106)]=function(_0x39a85f){const _0x3c3165=_0x307ba3,_0x247002=this[_0x3c3165(0xfc)](_0x39a85f);if(_0x247002['_parallaxZero'])return Math[_0x3c3165(0x1f3)](_0x247002[_0x3c3165(0x189)]*this[_0x3c3165(0x182)]());else return _0x247002[_0x3c3165(0x1d5)]?_0x247002[_0x3c3165(0x189)]*this[_0x3c3165(0x182)]()/0x2:0x0;},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0xdf)]=function(_0x2b3736){const _0x54bdf1=_0x307ba3,_0x3fc391=this[_0x54bdf1(0xfc)](_0x2b3736);if(_0x3fc391[_0x54bdf1(0x1a5)])return Math['floor'](_0x3fc391[_0x54bdf1(0x117)]*this['tileHeight']());else return _0x3fc391[_0x54bdf1(0x18a)]?_0x3fc391[_0x54bdf1(0x117)]*this[_0x54bdf1(0x191)]()/0x2:0x0;},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x168)]=function(_0x361ee7){const _0x572772=_0x307ba3;this[_0x572772(0x1c2)]=this[_0x572772(0x1c2)]||[];if(!this[_0x572772(0x1c2)][_0x361ee7])return;this[_0x572772(0x1c2)][_0x361ee7]=null;const _0x342941=SceneManager[_0x572772(0x15d)]['_spriteset'];_0x342941&&_0x342941['removeVisualParallaxLayer'](_0x361ee7);},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1cd)]=function(_0xa30a67){const _0x1ac5a9=_0x307ba3,_0x2ea5e6=_0xa30a67['id'];_0xa30a67[_0x1ac5a9(0xd9)]['charAt'](0x0)==='!'&&(_0xa30a67[_0x1ac5a9(0x1a5)]=!![]);let _0x18c619=![];this[_0x1ac5a9(0x1c2)]=this[_0x1ac5a9(0x1c2)]||[];if(this[_0x1ac5a9(0x1c2)][_0x2ea5e6]){const _0x5b7050=this[_0x1ac5a9(0x1c2)][_0x2ea5e6];if(!_0x5b7050[_0x1ac5a9(0x1b3)][_0x1ac5a9(0x1a6)](_0xa30a67['maskRegions']))_0x18c619=!![];else!_0x5b7050[_0x1ac5a9(0x1b9)][_0x1ac5a9(0x1a6)](_0xa30a67[_0x1ac5a9(0x1b9)])&&(_0x18c619=!![]);}this[_0x1ac5a9(0x1c2)][_0x2ea5e6]=_0xa30a67;if(!SceneManager[_0x1ac5a9(0x172)]())return;const _0x5dc31c=SceneManager[_0x1ac5a9(0x15d)]['_spriteset'];_0x5dc31c&&_0x5dc31c['updateVisualParallaxLayer'](_0x2ea5e6,_0x18c619);},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x12c)]=Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0xda)],Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0xda)]=function(_0x3856bd,_0x3db85c){const _0x123105=_0x307ba3;VisuMZ[_0x123105(0x10e)][_0x123105(0x12c)][_0x123105(0x103)](this,_0x3856bd,_0x3db85c);for(const _0x36a5c7 of this[_0x123105(0x1a2)]()){if(!_0x36a5c7)continue;this[_0x123105(0x175)]()?_0x36a5c7['_parallaxX']=_0x3856bd:_0x36a5c7[_0x123105(0x189)]=this['_displayX'],this[_0x123105(0x1c4)]()?_0x36a5c7[_0x123105(0x117)]=_0x3db85c:_0x36a5c7[_0x123105(0x117)]=this[_0x123105(0x18e)];}},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x171)]=Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1ce)],Game_Map['prototype'][_0x307ba3(0x1ce)]=function(_0x4e8080){const _0x18f7d0=_0x307ba3,_0x18c278=this[_0x18f7d0(0xdb)];VisuMZ[_0x18f7d0(0x10e)]['Game_Map_scrollLeft'][_0x18f7d0(0x103)](this,_0x4e8080);for(const _0x1a9ec7 of this['getVisualParallaxes']()){if(!_0x1a9ec7)continue;if(this[_0x18f7d0(0x175)]())_0x1a9ec7[_0x18f7d0(0x1d5)]&&(_0x1a9ec7['_parallaxX']-=_0x4e8080);else this[_0x18f7d0(0x159)]()>=this[_0x18f7d0(0x11c)]()&&(_0x1a9ec7[_0x18f7d0(0x189)]+=this[_0x18f7d0(0xdb)]-_0x18c278);}},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0xeb)]=Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x143)],Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x143)]=function(_0x2e3384){const _0x5f5cf1=_0x307ba3,_0x4ecb6c=this[_0x5f5cf1(0xdb)];VisuMZ[_0x5f5cf1(0x10e)][_0x5f5cf1(0xeb)]['call'](this,_0x2e3384);for(const _0x31e4ab of this[_0x5f5cf1(0x1a2)]()){if(!_0x31e4ab)continue;if(this['isLoopHorizontal']())_0x31e4ab[_0x5f5cf1(0x1d5)]&&(_0x31e4ab[_0x5f5cf1(0x189)]+=_0x2e3384);else this['width']()>=this['screenTileX']()&&(_0x31e4ab[_0x5f5cf1(0x189)]+=this[_0x5f5cf1(0xdb)]-_0x4ecb6c);}},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0xec)]=Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x115)],Game_Map['prototype'][_0x307ba3(0x115)]=function(_0x9dd3c5){const _0x25d208=_0x307ba3,_0x7cd104=this['_displayY'];VisuMZ[_0x25d208(0x10e)][_0x25d208(0xec)][_0x25d208(0x103)](this,_0x9dd3c5);for(const _0x2ee1ef of this[_0x25d208(0x1a2)]()){if(!_0x2ee1ef)continue;if(this[_0x25d208(0x1c4)]())_0x2ee1ef['_parallaxLoopY']&&(_0x2ee1ef[_0x25d208(0x117)]+=_0x9dd3c5);else this[_0x25d208(0x1ec)]()>=this[_0x25d208(0x1e6)]()&&(_0x2ee1ef[_0x25d208(0x117)]+=this['_displayY']-_0x7cd104);}},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x181)]=Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0xf3)],Game_Map['prototype'][_0x307ba3(0xf3)]=function(_0x536475){const _0x15aec7=_0x307ba3,_0x22e5c3=this[_0x15aec7(0x18e)];VisuMZ[_0x15aec7(0x10e)][_0x15aec7(0x181)]['call'](this,_0x536475);for(const _0x271278 of this[_0x15aec7(0x1a2)]()){if(!_0x271278)continue;if(this['isLoopVertical']())_0x271278[_0x15aec7(0x18a)]&&(_0x271278[_0x15aec7(0x117)]-=_0x536475);else this['height']()>=this[_0x15aec7(0x1e6)]()&&(_0x271278['_parallaxY']+=this[_0x15aec7(0x18e)]-_0x22e5c3);}},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x1c8)]=Game_Map['prototype'][_0x307ba3(0x167)],Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x167)]=function(){const _0x58814=_0x307ba3;VisuMZ[_0x58814(0x10e)][_0x58814(0x1c8)][_0x58814(0x103)](this);for(const _0x4bfc5d of this[_0x58814(0x1a2)]()){if(!_0x4bfc5d)continue;this['updateVisualParallaxSettings'](_0x4bfc5d);}},Game_Map[_0x307ba3(0x1d6)][_0x307ba3(0x102)]=function(_0x208063){const _0x1f8ac8=_0x307ba3;_0x208063[_0x1f8ac8(0x1d5)]&&(_0x208063[_0x1f8ac8(0x189)]+=_0x208063[_0x1f8ac8(0x15b)]/this['tileWidth']()/0x2);_0x208063[_0x1f8ac8(0x18a)]&&(_0x208063[_0x1f8ac8(0x117)]+=_0x208063[_0x1f8ac8(0x108)]/this[_0x1f8ac8(0x191)]()/0x2);_0x208063[_0x1f8ac8(0x10b)]+=_0x208063['hueShift'];if(_0x208063[_0x1f8ac8(0x1e2)]>0x0){const _0x17e754=_0x208063[_0x1f8ac8(0x1e2)];_0x208063[_0x1f8ac8(0x1b0)]=(_0x208063[_0x1f8ac8(0x1b0)]*(_0x17e754-0x1)+_0x208063['targetOpacity'])/_0x17e754,_0x208063[_0x1f8ac8(0x1e2)]--;}},VisuMZ[_0x307ba3(0x10e)]['Game_Event_clearPageSettings']=Game_Event[_0x307ba3(0x1d6)]['clearPageSettings'],Game_Event[_0x307ba3(0x1d6)][_0x307ba3(0x10c)]=function(){const _0x3f44dd=_0x307ba3;VisuMZ[_0x3f44dd(0x10e)][_0x3f44dd(0x1e1)][_0x3f44dd(0x103)](this),this[_0x3f44dd(0x155)]();},VisuMZ[_0x307ba3(0x10e)]['Game_Event_setupPageSettings']=Game_Event['prototype'][_0x307ba3(0x1a0)],Game_Event['prototype'][_0x307ba3(0x1a0)]=function(){const _0x3020d1=_0x307ba3;VisuMZ[_0x3020d1(0x10e)]['Game_Event_setupPageSettings']['call'](this),this[_0x3020d1(0x1ca)]();},Game_Event[_0x307ba3(0x1d6)][_0x307ba3(0x1ca)]=function(){const _0x710151=_0x307ba3;if(!this['event']())return;this['initVisualParallaxesEffects'](),this['setupVisualParallaxesNotetags'](),this[_0x710151(0x1af)]();},Game_Event[_0x307ba3(0x1d6)]['setupVisualParallaxesNotetags']=function(){const _0x2a7a30=_0x307ba3,_0x3dccec=this['event']()[_0x2a7a30(0xe8)];if(_0x3dccec==='')return;this[_0x2a7a30(0xf6)](_0x3dccec);},Game_Event['prototype'][_0x307ba3(0x1af)]=function(){const _0x3163ce=_0x307ba3;if(!this[_0x3163ce(0xdd)]())return;const _0x1a2f17=this[_0x3163ce(0x146)]();let _0x4fdf2c='';for(const _0x2a7cb1 of _0x1a2f17){if([0x6c,0x198][_0x3163ce(0xee)](_0x2a7cb1[_0x3163ce(0x176)])){if(_0x4fdf2c!=='')_0x4fdf2c+='\x0a';_0x4fdf2c+=_0x2a7cb1[_0x3163ce(0x1dd)][0x0];}}this[_0x3163ce(0xf6)](_0x4fdf2c);},Game_Event['prototype'][_0x307ba3(0x155)]=function(){this['_noReflection']=![];},Game_Event[_0x307ba3(0x1d6)][_0x307ba3(0xf6)]=function(_0x494926){const _0x190c0b=_0x307ba3,_0x4f9b00=VisuMZ[_0x190c0b(0x10e)]['RegExp'];_0x494926[_0x190c0b(0x134)](_0x4f9b00[_0x190c0b(0x1aa)])&&(this['_noReflection']=!![]);};function Sprite_VisualParallax(){const _0x35444b=_0x307ba3;this[_0x35444b(0x101)](...arguments);}function _0x32ca(_0x28b5b3,_0x13bd43){const _0xc04da7=_0xc04d();return _0x32ca=function(_0x32ca14,_0x3ab739){_0x32ca14=_0x32ca14-0xd5;let _0xf2ed80=_0xc04da7[_0x32ca14];return _0xf2ed80;},_0x32ca(_0x28b5b3,_0x13bd43);}Sprite_VisualParallax[_0x307ba3(0x1d6)]=Object[_0x307ba3(0x164)](TilingSprite[_0x307ba3(0x1d6)]),Sprite_VisualParallax['prototype'][_0x307ba3(0x11a)]=Sprite_VisualParallax,Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x101)]=function(_0x3d3eec){const _0x3beadf=_0x307ba3;this['_id']=_0x3d3eec,TilingSprite[_0x3beadf(0x1d6)][_0x3beadf(0x101)][_0x3beadf(0x103)](this),this[_0x3beadf(0x153)](),this[_0x3beadf(0x199)](),this[_0x3beadf(0x184)][_0x3beadf(0x161)](this[_0x3beadf(0xf9)][_0x3beadf(0x105)](this));},Sprite_VisualParallax['prototype']['settings']=function(){const _0x103289=_0x307ba3;return $gameMap[_0x103289(0xfc)](this[_0x103289(0x1c5)]);},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x153)]=function(){const _0x43024=_0x307ba3;this['_hue']=0x0,this[_0x43024(0x1bc)]=[0x0,0x0,0x0,0x0],this[_0x43024(0x1fe)]=new ColorFilter(),!this['filters']&&(this[_0x43024(0x1b7)]=[]),this['filters'][_0x43024(0x12f)](this['_colorFilter']);},Sprite_VisualParallax['prototype']['_updateColorFilter']=function(){const _0x7b0d5e=_0x307ba3;!this['_colorFilter']&&this[_0x7b0d5e(0x153)](),this[_0x7b0d5e(0x1fe)][_0x7b0d5e(0x1cf)](this[_0x7b0d5e(0xfb)]),this[_0x7b0d5e(0x1fe)][_0x7b0d5e(0xf8)](this[_0x7b0d5e(0x1bc)]);},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x199)]=function(){const _0x3ea41e=_0x307ba3;this[_0x3ea41e(0x19f)]=this[_0x3ea41e(0x195)]()['filename'],this[_0x3ea41e(0x184)]=ImageManager[_0x3ea41e(0x1bd)](this['_parallaxName']);},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0xf9)]=function(){const _0x53f940=_0x307ba3;this['_maskSprite']=new Sprite(),this[_0x53f940(0x1d0)]();},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x1d0)]=function(){const _0x59a5db=_0x307ba3;this[_0x59a5db(0x137)][_0x59a5db(0x184)]&&(this[_0x59a5db(0x137)]['bitmap'][_0x59a5db(0x17c)](),this[_0x59a5db(0x156)](this[_0x59a5db(0x137)]));const _0x2fcc8d=new Bitmap(Graphics[_0x59a5db(0x159)],Graphics['height']);_0x2fcc8d['fillRect'](0x0,0x0,_0x2fcc8d[_0x59a5db(0x159)],_0x2fcc8d[_0x59a5db(0x1ec)],_0x59a5db(0x127)),this[_0x59a5db(0x137)]['bitmap']=_0x2fcc8d,this[_0x59a5db(0x16e)](this[_0x59a5db(0x137)]),this[_0x59a5db(0x18d)]=new PIXI[(_0x59a5db(0x183))](this[_0x59a5db(0x137)]),this[_0x59a5db(0x1b7)][_0x59a5db(0x12f)](this[_0x59a5db(0x18d)]);const _0x461d70=this[_0x59a5db(0x195)]()[_0x59a5db(0x1b3)],_0xd2da57=this[_0x59a5db(0x195)]()[_0x59a5db(0x1b9)];if(_0x461d70[_0x59a5db(0xf5)]<=0x0&&_0xd2da57[_0x59a5db(0xf5)]<=0x0)return;if($gameMap[_0x59a5db(0x175)]()||$gameMap[_0x59a5db(0x1c4)]())return;const _0xa3d297=$gameMap[_0x59a5db(0x159)](),_0x4d96f3=$gameMap[_0x59a5db(0x1ec)](),_0x57ce94=$gameMap[_0x59a5db(0x182)](),_0x327783=$gameMap[_0x59a5db(0x191)]();this[_0x59a5db(0x137)][_0x59a5db(0x184)]=new Bitmap(_0xa3d297*_0x57ce94,_0x4d96f3*_0x327783);for(let _0x4cbc42=0x0;_0x4cbc42<_0xa3d297;_0x4cbc42++){for(let _0x48c083=0x0;_0x48c083<_0x4d96f3;_0x48c083++){const _0x1096d0=$gameMap['regionId'](_0x4cbc42,_0x48c083);(_0x461d70[_0x59a5db(0xee)](_0x1096d0)||_0xd2da57[_0x59a5db(0xee)]($gameMap['terrainTag'](_0x4cbc42,_0x48c083)))&&(this[_0x59a5db(0x137)]['bitmap'][_0x59a5db(0x124)](_0x4cbc42*_0x57ce94,_0x48c083*_0x327783,_0x57ce94,_0x327783,'#ffffff'),Imported[_0x59a5db(0xfe)]&&SceneManager['_scene'][_0x59a5db(0x1b5)]['push'](_0x1096d0));}}},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x169)]=function(){const _0x4c697c=_0x307ba3;TilingSprite['prototype'][_0x4c697c(0x169)][_0x4c697c(0x103)](this);if(!this['bitmap'])return;if(!this[_0x4c697c(0x195)]())return;this[_0x4c697c(0x140)](),this['updateOrigin'](),this['updateBlendMode'](),this[_0x4c697c(0x1c9)](),this['updateTone'](),this[_0x4c697c(0x1fb)](),this[_0x4c697c(0x136)]();},Sprite_VisualParallax[_0x307ba3(0x1d6)]['updateOpacity']=function(){const _0x503b73=_0x307ba3;this[_0x503b73(0x1b0)]=this['settings']()[_0x503b73(0x1b0)];},Sprite_VisualParallax['prototype'][_0x307ba3(0x1fd)]=function(){const _0x4e7b9=_0x307ba3;this[_0x4e7b9(0x10a)]['x']=$gameMap[_0x4e7b9(0x106)](this[_0x4e7b9(0x1c5)]),this[_0x4e7b9(0x10a)]['y']=$gameMap['getVisualParallaxOy'](this[_0x4e7b9(0x1c5)]);},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x14e)]=function(){const _0x36ef10=_0x307ba3;this[_0x36ef10(0x18d)]&&(this[_0x36ef10(0x18d)][_0x36ef10(0xd6)]=this[_0x36ef10(0x195)]()[_0x36ef10(0xd6)]);},Sprite_VisualParallax['prototype'][_0x307ba3(0x1c9)]=function(){const _0x2ea5a4=_0x307ba3;this[_0x2ea5a4(0x1cf)](this[_0x2ea5a4(0x195)]()[_0x2ea5a4(0x10b)]);},Sprite_VisualParallax[_0x307ba3(0x1d6)]['setHue']=function(_0xa57123){const _0x531f4f=_0x307ba3;this[_0x531f4f(0xfb)]!==Number(_0xa57123)&&(this['_hue']=Number(_0xa57123),this[_0x531f4f(0x1b6)]());},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x13b)]=function(){const _0x1e2f63=_0x307ba3;this[_0x1e2f63(0xf8)](this[_0x1e2f63(0x195)]()['colorTone']);},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0xf8)]=function(_0x38bfc6){const _0x12e101=_0x307ba3;if(!(_0x38bfc6 instanceof Array))throw new Error(_0x12e101(0x1c7));!this[_0x12e101(0x1bc)][_0x12e101(0x1a6)](_0x38bfc6)&&(this[_0x12e101(0x1bc)]=_0x38bfc6[_0x12e101(0x13a)](),this['_updateColorFilter']());},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x1fb)]=function(){const _0x554ff4=_0x307ba3;if(!this[_0x554ff4(0x137)])return;const _0x120650=this[_0x554ff4(0x195)]()[_0x554ff4(0x1b3)],_0x3bb6c7=this[_0x554ff4(0x195)]()[_0x554ff4(0x1b9)];if(_0x120650[_0x554ff4(0xf5)]<=0x0&&_0x3bb6c7['length']<=0x0){const _0x4e43c0=$gameScreen[_0x554ff4(0x120)]();this['_maskSprite']['x']=0x0,this[_0x554ff4(0x137)]['y']=0x0,this[_0x554ff4(0x137)][_0x554ff4(0x1cc)]['x']=0x1/_0x4e43c0,this[_0x554ff4(0x137)][_0x554ff4(0x1cc)]['y']=0x1/_0x4e43c0;return;}if($gameMap[_0x554ff4(0x175)]()||$gameMap['isLoopVertical']())return;this['_maskSprite']['x']=Math['floor'](-$gameMap[_0x554ff4(0x1fa)]()*$gameMap[_0x554ff4(0x182)]()),this[_0x554ff4(0x137)]['y']=Math[_0x554ff4(0x1f3)](-$gameMap['displayY']()*$gameMap[_0x554ff4(0x191)]()),this[_0x554ff4(0x137)][_0x554ff4(0x1cc)]['x']=0x1,this[_0x554ff4(0x137)][_0x554ff4(0x1cc)]['y']=0x1;},Sprite_VisualParallax[_0x307ba3(0x1d6)][_0x307ba3(0x136)]=function(){const _0x3e123e=_0x307ba3,_0x43cbe5=$gameScreen[_0x3e123e(0x120)](),_0x347b4e=Math[_0x3e123e(0x15f)](Graphics[_0x3e123e(0x159)]/_0x43cbe5),_0x3d6aa2=Math['ceil'](Graphics[_0x3e123e(0x1ec)]/_0x43cbe5);(this[_0x3e123e(0x159)]!==_0x347b4e||this[_0x3e123e(0x1ec)]!==_0x3d6aa2)&&this[_0x3e123e(0x13c)](0x0,0x0,_0x347b4e,_0x3d6aa2);};function Sprite_ReflectionCharacter(){const _0x502c85=_0x307ba3;this[_0x502c85(0x101)](...arguments);}Sprite_ReflectionCharacter['prototype']=Object[_0x307ba3(0x164)](Sprite_Character[_0x307ba3(0x1d6)]),Sprite_ReflectionCharacter['prototype'][_0x307ba3(0x11a)]=Sprite_ReflectionCharacter,Sprite_ReflectionCharacter[_0x307ba3(0x1d6)][_0x307ba3(0x11d)]=function(_0xc9bdc8){},Sprite_ReflectionCharacter[_0x307ba3(0x1d6)][_0x307ba3(0x169)]=function(){const _0x14938e=_0x307ba3;Sprite_Character[_0x14938e(0x1d6)]['update'][_0x14938e(0x103)](this);},Sprite_ReflectionCharacter[_0x307ba3(0x1d6)][_0x307ba3(0x1d9)]=function(){const _0x40332d=_0x307ba3;this['scale']['x']=this[_0x40332d(0x1f4)][_0x40332d(0x1a1)],this[_0x40332d(0x1cc)]['y']=-this['_character'][_0x40332d(0x1b4)];},VisuMZ['VisualParallaxes'][_0x307ba3(0x157)]=Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1f5)],Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1f5)]=function(){const _0x20ce16=_0x307ba3;VisuMZ[_0x20ce16(0x10e)]['Spriteset_Map_createParallax']['call'](this);if(!$gameMap[_0x20ce16(0x190)]())this[_0x20ce16(0x142)]();if(!$gameMap['getSolidReflectionRegions']())this[_0x20ce16(0x1ed)]();this[_0x20ce16(0xe3)](),this[_0x20ce16(0x126)](),this[_0x20ce16(0xdc)]();if($gameMap[_0x20ce16(0x190)]())this[_0x20ce16(0x142)]();if($gameMap[_0x20ce16(0x17d)]())this[_0x20ce16(0x1ed)]();},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x142)]=function(){const _0x5a990d=_0x307ba3;if(!PIXI['filters'])return;if($gameMap[_0x5a990d(0x175)]()||$gameMap['isLoopVertical']())return;if($gameMap[_0x5a990d(0x1ff)]())return;this['_waterReflectLayer']=new Sprite(),this[_0x5a990d(0x14a)]=new Sprite(),this['_waterReflectAdded']=![],this[_0x5a990d(0xd8)][_0x5a990d(0x16e)](this[_0x5a990d(0x14b)]),this[_0x5a990d(0x14b)][_0x5a990d(0x1b7)]=[],this['_waterReflectLayer'][_0x5a990d(0x1b0)]=$gameMap[_0x5a990d(0x15a)](),!!PIXI[_0x5a990d(0x1b7)]['ReflectionFilter']&&(this[_0x5a990d(0x14b)]['_reflectFilter']=new PIXI[(_0x5a990d(0x1b7))][(_0x5a990d(0x1e5))]({'boundary':$gameMap[_0x5a990d(0x114)](),'amplitude':$gameMap[_0x5a990d(0x17e)](),'waveLength':$gameMap[_0x5a990d(0x1dc)](),'mirror':![]})),!!PIXI[_0x5a990d(0x1b7)][_0x5a990d(0x17a)]&&(this['_waterReflectLayer'][_0x5a990d(0x12e)]=new PIXI['filters'][(_0x5a990d(0x17a))]($gameMap[_0x5a990d(0x1bb)]()),this[_0x5a990d(0x14b)][_0x5a990d(0x1b7)]['push'](this[_0x5a990d(0x14b)][_0x5a990d(0x12e)])),this[_0x5a990d(0xed)]();},Spriteset_Map[_0x307ba3(0x1d6)]['createWaterReflectionMask']=function(){const _0x31f80f=_0x307ba3,_0x2c369b=$gameMap[_0x31f80f(0x198)](),_0x136c17=$gameMap[_0x31f80f(0xe9)](),_0x162fa0=this['createReflectionMask'](_0x2c369b,_0x136c17);_0x162fa0&&(this[_0x31f80f(0x16e)](_0x162fa0),this[_0x31f80f(0x14b)][_0x31f80f(0x1c3)]=_0x162fa0);},Spriteset_Map[_0x307ba3(0x1d6)]['createSolidReflectionLayer']=function(){const _0x21615d=_0x307ba3;if(!PIXI[_0x21615d(0x1b7)])return;if($gameMap[_0x21615d(0x175)]()||$gameMap[_0x21615d(0x1c4)]())return;if($gameMap[_0x21615d(0x1ff)]())return;this[_0x21615d(0x1e7)]=new Sprite(),this['_solidReflectContainer']=new Sprite(),this['_solidReflectAdded']=![],this[_0x21615d(0xd8)]['addChild'](this[_0x21615d(0x1e7)]),this['_solidReflectLayer'][_0x21615d(0x1b7)]=[],this[_0x21615d(0x1e7)][_0x21615d(0x1b0)]=$gameMap[_0x21615d(0x1a4)](),!!PIXI[_0x21615d(0x1b7)][_0x21615d(0x17a)]&&(this[_0x21615d(0x1e7)]['_blurFilter']=new PIXI['filters'][(_0x21615d(0x17a))]($gameMap[_0x21615d(0x1f8)]()),this[_0x21615d(0x1e7)][_0x21615d(0x1b7)][_0x21615d(0x12f)](this['_solidReflectLayer'][_0x21615d(0x12e)])),this[_0x21615d(0x1f0)]();},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1f0)]=function(){const _0xc13533=_0x307ba3,_0x546af5=$gameMap[_0xc13533(0x17d)](),_0x2cdcb9=$gameMap[_0xc13533(0x15c)](),_0x35d9c6=this[_0xc13533(0x177)](_0x546af5,_0x2cdcb9);_0x35d9c6&&(this[_0xc13533(0x16e)](_0x35d9c6),this[_0xc13533(0x1e7)][_0xc13533(0x1c3)]=_0x35d9c6);},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x177)]=function(_0x3d0f79,_0x25ab39){const _0x76f690=_0x307ba3;if(_0x3d0f79['length']<=0x0&&_0x25ab39[_0x76f690(0xf5)]<=0x0)return null;const _0x358bf9=$gameMap[_0x76f690(0x159)](),_0x2e4b88=$gameMap[_0x76f690(0x1ec)](),_0x3ad3c2=$gameMap[_0x76f690(0x182)](),_0x5a76b3=$gameMap[_0x76f690(0x191)](),_0x59d2f1=0x0,_0x22df4c=_0x59d2f1*0x2,_0x38c6d4=new Sprite();_0x38c6d4['bitmap']=new Bitmap(_0x358bf9*_0x3ad3c2,_0x2e4b88*_0x5a76b3);for(let _0xea4bd0=0x0;_0xea4bd0<_0x358bf9;_0xea4bd0++){for(let _0x3a3310=0x0;_0x3a3310<_0x2e4b88;_0x3a3310++){const _0x796b78=$gameMap[_0x76f690(0x1da)](_0xea4bd0,_0x3a3310);(_0x3d0f79[_0x76f690(0xee)](_0x796b78)||_0x25ab39[_0x76f690(0xee)]($gameMap[_0x76f690(0x1a9)](_0xea4bd0,_0x3a3310)))&&(_0x38c6d4[_0x76f690(0x184)][_0x76f690(0x124)](_0xea4bd0*_0x3ad3c2+_0x59d2f1,_0x3a3310*_0x5a76b3+_0x59d2f1,_0x3ad3c2-_0x22df4c,_0x5a76b3-_0x22df4c,_0x76f690(0x127)),Imported[_0x76f690(0xfe)]&&SceneManager['_scene'][_0x76f690(0x1b5)][_0x76f690(0x12f)](_0x796b78));}}return _0x38c6d4;},VisuMZ['VisualParallaxes'][_0x307ba3(0x1cb)]=Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x10d)],Spriteset_Map[_0x307ba3(0x1d6)]['createCharacters']=function(){const _0x21d276=_0x307ba3;VisuMZ[_0x21d276(0x10e)][_0x21d276(0x1cb)][_0x21d276(0x103)](this),this['createCharacterReflections']();},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x185)]=function(){const _0x3e8ede=_0x307ba3;if($gameMap[_0x3e8ede(0x1ff)]())return;const _0x3571a3=[],_0x5f32cf=[];for(const _0x4f8a48 of $gameMap[_0x3e8ede(0xd7)]()){if(_0x4f8a48[_0x3e8ede(0x1f2)])continue;_0x3571a3['push'](new Sprite_ReflectionCharacter(_0x4f8a48)),_0x5f32cf[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter(_0x4f8a48));}for(const _0x4c1d23 of $gameMap[_0x3e8ede(0x1ab)]()){_0x3571a3[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter(_0x4c1d23)),_0x5f32cf[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter(_0x4c1d23));}for(const _0x3312dc of $gamePlayer[_0x3e8ede(0x125)]()[_0x3e8ede(0x17b)]()){_0x3571a3[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter(_0x3312dc)),_0x5f32cf[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter(_0x3312dc));}_0x3571a3[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter($gamePlayer)),_0x5f32cf[_0x3e8ede(0x12f)](new Sprite_ReflectionCharacter($gamePlayer));if(this[_0x3e8ede(0x14b)])for(const _0x29c37c of _0x3571a3){_0x29c37c[_0x3e8ede(0x138)]=!![],this[_0x3e8ede(0x14a)]['addChild'](_0x29c37c),_0x29c37c['scale']['y']=-0.85,_0x29c37c['filters']=_0x29c37c[_0x3e8ede(0x1b7)]||[],this[_0x3e8ede(0x14b)]['_reflectFilter']&&_0x29c37c[_0x3e8ede(0x1b7)][_0x3e8ede(0x12f)](this[_0x3e8ede(0x14b)]['_reflectFilter']);}if(this['_solidReflectLayer'])for(const _0x58784c of _0x5f32cf){_0x58784c['_reflection']=!![],this[_0x3e8ede(0x132)][_0x3e8ede(0x16e)](_0x58784c),_0x58784c['scale']['y']=-0.85;}},VisuMZ[_0x307ba3(0x10e)][_0x307ba3(0x13f)]=Spriteset_Map['prototype'][_0x307ba3(0x200)],Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x200)]=function(_0xcf9f2c){const _0x44d120=_0x307ba3;VisuMZ['VisualParallaxes'][_0x44d120(0x13f)][_0x44d120(0x103)](this,_0xcf9f2c);if(_0xcf9f2c[_0x44d120(0x1f2)])return;{const _0x3709c1=new Sprite_ReflectionCharacter(_0xcf9f2c);_0x3709c1[_0x44d120(0x138)]=!![],this['_waterReflectLayer'][_0x44d120(0x16e)](_0x3709c1),_0x3709c1[_0x44d120(0x1cc)]['y']=-0.85,_0x3709c1[_0x44d120(0x1b7)]=_0x3709c1[_0x44d120(0x1b7)]||[],this[_0x44d120(0x14b)][_0x44d120(0x144)]&&_0x3709c1['filters'][_0x44d120(0x12f)](this['_waterReflectLayer'][_0x44d120(0x144)]);}{const _0xf54764=new Sprite_ReflectionCharacter(_0xcf9f2c);_0xf54764[_0x44d120(0x138)]=!![],this[_0x44d120(0x1e7)][_0x44d120(0x16e)](_0xf54764),_0xf54764[_0x44d120(0x1cc)]['y']=-0.85;}},VisuMZ[_0x307ba3(0x10e)]['Spriteset_Map_update']=Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x169)],Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x169)]=function(){const _0x306989=_0x307ba3;VisuMZ[_0x306989(0x10e)][_0x306989(0xff)][_0x306989(0x103)](this),this[_0x306989(0xe2)](),this[_0x306989(0x135)]();},Spriteset_Map['prototype'][_0x307ba3(0xe2)]=function(){const _0x4497fa=_0x307ba3;if(!this[_0x4497fa(0x14b)])return;if($gameMap){if(!this[_0x4497fa(0xe5)]&&$gameMap[_0x4497fa(0x111)]())this[_0x4497fa(0x14b)]['addChild'](this[_0x4497fa(0x14a)]),this[_0x4497fa(0xe5)]=!![];else this[_0x4497fa(0xe5)]&&!$gameMap[_0x4497fa(0x111)]()&&(this[_0x4497fa(0x14b)]['removeChild'](this[_0x4497fa(0x14a)]),this[_0x4497fa(0xe5)]=![]);}this[_0x4497fa(0x14b)]['_reflectFilter']&&(this[_0x4497fa(0x14b)][_0x4497fa(0x144)]['time']+=0.05);const _0x242a02=this['_waterReflectLayer'][_0x4497fa(0x1bf)];_0x242a02&&(_0x242a02['x']=Math[_0x4497fa(0x1f3)](-$gameMap[_0x4497fa(0x1fa)]()*$gameMap[_0x4497fa(0x182)]()),_0x242a02['y']=Math[_0x4497fa(0x1f3)](-$gameMap[_0x4497fa(0xd5)]()*$gameMap['tileHeight']()));},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x135)]=function(){const _0x25b4be=_0x307ba3;if(!this[_0x25b4be(0x1e7)])return;if($gameMap){if(!this[_0x25b4be(0xe1)]&&$gameMap[_0x25b4be(0x11e)]())this[_0x25b4be(0x1e7)]['addChild'](this[_0x25b4be(0x132)]),this['_solidReflectAdded']=!![];else this[_0x25b4be(0xe1)]&&!$gameMap[_0x25b4be(0x11e)]()&&(this[_0x25b4be(0x1e7)][_0x25b4be(0x156)](this[_0x25b4be(0x132)]),this[_0x25b4be(0xe1)]=![]);}const _0x7a59b5=this[_0x25b4be(0x1e7)][_0x25b4be(0x1bf)];_0x7a59b5&&(_0x7a59b5['x']=Math[_0x25b4be(0x1f3)](-$gameMap[_0x25b4be(0x1fa)]()*$gameMap[_0x25b4be(0x182)]()),_0x7a59b5['y']=Math['floor'](-$gameMap['displayY']()*$gameMap[_0x25b4be(0x191)]()));},Spriteset_Map['prototype'][_0x307ba3(0xe3)]=function(){const _0x387fa9=_0x307ba3;this[_0x387fa9(0x1f6)]=new Sprite(),this[_0x387fa9(0xd8)][_0x387fa9(0x16e)](this[_0x387fa9(0x1f6)]),this[_0x387fa9(0xf7)]=[null];},Spriteset_Map['prototype'][_0x307ba3(0x126)]=function(){const _0x5623c8=_0x307ba3,_0x4d038f=$gameMap['getVisualParallaxes']();for(const _0xe6771c of _0x4d038f){if(!_0xe6771c)continue;this[_0x5623c8(0x12a)](_0xe6771c);}},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x12a)]=function(_0x26e6f6){const _0xbba8b8=_0x307ba3;if(!_0x26e6f6)return;const _0x461774=new Sprite_VisualParallax(_0x26e6f6['id']);_0x461774['move'](0x0,0x0,Graphics[_0xbba8b8(0x159)],Graphics[_0xbba8b8(0x1ec)]),this[_0xbba8b8(0x1f6)][_0xbba8b8(0x16e)](_0x461774);},Spriteset_Map['prototype']['sortVisualParallaxes']=function(){const _0x986e52=_0x307ba3;this[_0x986e52(0x1f6)]['children'][_0x986e52(0x116)]((_0x233d34,_0x51119f)=>_0x233d34[_0x986e52(0x1c5)]-_0x51119f[_0x986e52(0x1c5)]);},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1b2)]=function(_0x4215a1){const _0x3bcfcc=_0x307ba3;return this[_0x3bcfcc(0x1f6)][_0x3bcfcc(0x129)][_0x3bcfcc(0x1ef)](_0x13ab9a=>_0x13ab9a[_0x3bcfcc(0x1c5)]===_0x4215a1);},Spriteset_Map['prototype']['removeVisualParallaxLayer']=function(_0x4e8db5){const _0xe1fbb3=_0x307ba3,_0x47b3df=this[_0xe1fbb3(0x1b2)](_0x4e8db5);_0x47b3df&&this[_0xe1fbb3(0x1f6)][_0xe1fbb3(0x156)](_0x47b3df);},Spriteset_Map[_0x307ba3(0x1d6)][_0x307ba3(0x1f9)]=function(_0x12beb6,_0x4c3ca5){const _0x10c63c=_0x307ba3,_0x3d9b20=this[_0x10c63c(0x1b2)](_0x12beb6);!_0x3d9b20?(this[_0x10c63c(0x12a)]($gameMap[_0x10c63c(0xfc)](_0x12beb6)),this['sortVisualParallaxes']()):(_0x3d9b20[_0x10c63c(0x199)](),_0x4c3ca5&&_0x3d9b20[_0x10c63c(0x184)][_0x10c63c(0x161)](_0x3d9b20['createMaskBitmap'][_0x10c63c(0x105)](_0x3d9b20)));};