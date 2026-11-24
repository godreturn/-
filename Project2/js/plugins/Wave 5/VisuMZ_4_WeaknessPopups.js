//=============================================================================
// VisuStella MZ - Weakness Popups
// VisuMZ_4_WeaknessPopups.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_WeaknessPopups = true;

var VisuMZ = VisuMZ || {};
VisuMZ.WeaknessPopups = VisuMZ.WeaknessPopups || {};
VisuMZ.WeaknessPopups.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.11] [WeaknessPopups]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Weakness_Popups_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * When striking enemies with elemental attacks, it's difficult for the player
 * to know at first glance if he or she has hit a weakness or resistance,
 * especially if they are unfamiliar with how much damage the enemy should take
 * normally. This plugin creates popups that appear upon being hit at various
 * elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
 * 0% for immunity, and under that for absorption.
 * 
 * Critical hits also gain an extra popup effect to indicate landing a critical
 * hit in case they've missed the extra flash that comes with one by default.
 * This plugin helps relay information to the player in a more visible form.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create popups that appear in battle whenever battlers take elemental
 *   damage that results in weaknesses, resistances, immunities, or absorption.
 * * Critical hits will also generate popups.
 * * Popups can use images or generate bitmap text on the spot.
 * * Move the popups through various means like scaling and acceleration.
 * * Elemental rates can generate different popups depending on the rate.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 *
 * If you decide to use front view with the VisuStella MZ Battle Core, Weakness
 * Popups will show up for actors above the Battle Status Window. Normally,
 * they would not appear in front view without the Battle Core because normal
 * damage popups don't appear there either.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Popup Settings
 * ============================================================================
 *
 * Popups are created from a similar template. These are used for Critical Hits
 * and Elemental Rates. The Critical Hit popups will only appear once critical
 * hits are applied in battle. Elemental Rate popups will only appear once
 * certain damage thresholds are met through the element rate calculations.
 *
 * ---
 *
 * General
 * 
 *   Enabled:
 *   - Is this popup enabled?
 * 
 *   Stack Offset X:
 *   - Offsets the popup x position if stacked with a weakness.
 *   - Negative: left. Positive: right.
 *   - For Critical Hit Popups ONLY!
 * 
 *   Stack Offset Y:
 *   - Offsets the popup y position if stacked with a weakness.
 *   - Negative: up. Positive: down.
 *   - For Critical Hit Popups ONLY!
 *
 * ---
 *
 * Custom Image
 * 
 *   Filename:
 *   - Select an image from img/system/ to use as a custom image popup.
 *   - If you use this, ignore the Render settings.
 *
 * ---
 * 
 * Custom Animation
 * 
 *   Animation ID:
 *   - Play this animation when weakness effect activates.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the weakness effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the weakness effect animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 * ---
 *
 * Render
 * 
 *   Text:
 *   - Type in the text you want displayed for the popup.
 * 
 *   Bitmap Width:
 *   Bitmap Height:
 *   - What is the maximum width/height of this popup?
 * 
 *   Font Name:
 *   - What font do you wish to use for this popup?
 * 
 *   Font Size:
 *   - What's the font size to use for the popup text?
 * 
 *   Bold?:
 *   Italic?
 *   - Do you wish to make the text bold/italic?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Outline Size:
 *   - What size do you want to use for the outline?
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Offset
 * 
 *   Offset: X:
 *   Offset: Y:
 *   - How much do you wish to offset the X/Y position by?
 * 
 *   Variance:
 *   - How much variance should be given to offset X?
 *
 * ---
 *
 * Scale
 * 
 *   Duration:
 *   - How many frames should it take the scaling to reach the target scale?
 * 
 *   Starting Scale: X:
 *   Starting Scale: Y:
 *   - What scale X/Y value should the popup start at?
 * 
 *   Target Scale: X:
 *   Target Scale: Y:
 *   - What scale X/Y value should the popup end at?
 *
 * ---
 *
 * Acceleration
 * 
 *   Starting Speed: X:
 *   Starting Speed: Y:
 *   - How much should the starting X/Y speed of the popup be?
 * 
 *   Delta Speed: X:
 *   Delta Speed: Y:
 *   - How much should the growing X/Y speed of the popup be?
 *
 * ---
 *
 * Fading
 * 
 *   Opaque Duration:
 *   - How many frames should the popup stay opaque?
 * 
 *   Fade Duration:
 *   - After the opaque duration wears off, how many frames will it take for
 *     the popup to vanish?
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
 * Version 1.11: September 14, 2026
 * * Bug Fixes!
 * ** Fixed a bug where if a new popup is created while an animation hasn't
 *    ended, it would cause the animation to jump vertically. Fixed by Olivia.
 * 
 * Version 1.10: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Any Weakness > Animation ID
 * **** Play this animation when weakness effect activates.
 * **** Requires VisuMZ_0_CoreEngine.
 * *** Plugin Parameters > Any Weakness > Animation ID > Mirror Animation
 * *** Plugin Parameters > Any Weakness > Animation ID > Mute Animation
 * **** Mirrors/mutes the weakness effect animation?
 * **** Requires VisuMZ_0_CoreEngine.
 * 
 * Version 1.09: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Critical > Stack Offset X
 * *** Plugin Parameters > Critical > Stack Offset Y
 * **** Offsets the popup x/y position if stacked with a weakness popup.
 * 
 * Version 1.08: May 16, 2024
 * * Compatibility Update!
 * ** Added better compatibility with VisuStella MZ Frontview Battle UI.
 * 
 * Version 1.07: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a problem with certain elemental rates displaying the wrong popup.
 *    Fix made by Irina.
 * 
 * Version 1.06: October 27, 2022
 * * Bug Fixes!
 * ** Fixed a bug where "HP Drain" damage type would not proc weakness popups.
 *    Fix made by Olivia.
 * 
 * Version 1.05: December 30, 2021
 * * Bug Fixes!
 * ** Corrected a bug that caused 0 damage/healing when this plugin is on.
 *    Fix made by Olivia.
 * 
 * Version 1.04: December 23, 2021
 * * Compatibility Update!
 * ** Weakness Popups now ignore the notetags involving caster element damage
 *    when calculating the type of popup to display. Update made by Olivia.
 * 
 * Version 1.03: June 4, 2021
 * * Compatibility Update!
 * ** Added automatic offset for those using UI Areas and Widths with different
 *    values from their screen resolutions once the Action Sequence Camera
 *    plugin is enabled. Update made by Irina.
 * 
 * Version 1.02: March 5, 2021
 * * Bug Fixes!
 * ** Weakness Popups for front view actors will no longer appear at the top
 *    of the screen. Fix made by Irina.
 * ** Weakness Popups will no longer shift positions prior to an actor's status
 *    window positioning anchor. Fix made by Irina.
 * * Documentation Update!
 * ** Added "Extra Features" section for more clarity on what having the Battle
 *    Core enables for Front View games.
 * 
 * Version 1.01: January 1, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** Plugin Parameters for the Popup Settings now have a Variance factor for
 *    Offset X and Offset Y. Added by Yanfly.
 *
 * Version 1.00: November 27, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param WeaknessPopups
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Critical
 *
 * @param Critical:struct
 * @text Critical Popup Settings
 * @parent Critical
 * @type struct<Popup>
 * @desc Settings for the Critical Popup!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param CritStackOffsetX:num
 * @text Stack Offset X
 * @parent Critical:struct
 * @desc Offsets the popup x position if stacked with a weakness.
 * Negative: left. Positive: right.
 * @default +48
 *
 * @param CritStackOffsetY:num
 * @text Stack Offset Y
 * @parent Critical:struct
 * @desc Offsets the popup y position if stacked with a weakness.
 * Negative: up. Positive: down.
 * @default -48
 * 
 * @param Element
 * @text Element Rates
 *
 * @param Element200:struct
 * @text Rate >= 200%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 200%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element175:struct
 * @text Rate >= 175%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element150:struct
 * @text Rate >= 150%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 150%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element125:struct
 * @text Rate >= 125%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 125%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element110:struct
 * @text Rate >= 110%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 110%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element105:struct
 * @text Rate >= 105%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element101:struct
 * @text Rate >= 101%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at least 105%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element99:struct
 * @text Rate <= 99%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element95:struct
 * @text Rate <= 95%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 95%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element90:struct
 * @text Rate <= 90%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 90%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element75:struct
 * @text Rate <= 75%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 75%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element50:struct
 * @text Rate <= 50%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 50%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element25:struct
 * @text Rate <= 25%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is at most 25%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param Element0:struct
 * @text Rate = 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is exactly 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
 *
 * @param ElementNegative:struct
 * @text Rate < 0%
 * @parent Element
 * @type struct<Popup>
 * @desc Settings for the Popup when Element Rate is under 0%!
 * @default {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"}
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
 * Popup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Popup:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled
 * @parent General
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc Is this popup enabled?
 * @default true
 *
 * @param Image
 * @text Custom Image
 *
 * @param filename:str
 * @text Filename
 * @parent Image
 * @type file
 * @dir img/system/
 * @require 1
 * @desc Select an image from img/system/ to use as a custom image
 * popup. If you use this, ignore the Render settings.
 * @default 
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when weakness effect activates.
 * Requires VisuMZ_0_CoreEngine.
 * @default 0
 *
 * @param AniMirror:eval
 * @text Mirror Animation
 * @parent AnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the weakness effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param AniMute:eval
 * @text Mute Animation
 * @parent AnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the weakness effect animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param Render
 *
 * @param text:str
 * @text Text
 * @parent Render
 * @desc Type in the text you want displayed for the popup.
 * @default Text!
 *
 * @param bitmapWidth:num
 * @text Bitmap Width
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum width of this popup?
 * @default 600
 *
 * @param bitmapHeight:num
 * @text Bitmap Height
 * @parent Render
 * @type number
 * @min 1
 * @desc What is the maximum height of this popup?
 * @default 200
 *
 * @param fontFace:str
 * @text Font Name
 * @parent Render
 * @desc What font do you wish to use for this popup?
 * @default Impact
 *
 * @param fontSize:num
 * @text Font Size
 * @parent fontFace:str
 * @type number
 * @min 1
 * @desc What's the font size to use for the popup text?
 * @default 48
 *
 * @param fontBold:eval
 * @text Bold?
 * @parent fontFace:str
 * @type boolean
 * @on Bold
 * @off Normal
 * @desc Do you wish to make the text bold?
 * @default true
 *
 * @param fontItalic:eval
 * @text Italic?
 * @parent fontFace:str
 * @type boolean
 * @on Italic
 * @off Normal
 * @desc Do you wish to make the text italic?
 * @default false
 *
 * @param textColor:str
 * @text Text Color
 * @parent Render
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param outlineSize:num
 * @text Outline Size
 * @parent Render
 * @type number
 * @min 0
 * @desc What size do you want to use for the outline?
 * @default 5
 *
 * @param outlineColor:str
 * @text Outline Color
 * @parent outlineSize:num
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1)
 *
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset: X
 * @parent Offset
 * @desc How much do you wish to offset the X position by?
 * @default 0
 *
 * @param offsetXvariance:num
 * @text Variance
 * @type number
 * @parent offsetX:num
 * @desc How much variance should be given to offset X?
 * @default 0
 *
 * @param offsetY:num
 * @text Offset: Y
 * @parent Offset
 * @desc How much do you wish to offset the Y position by?
 * @default 0
 *
 * @param offsetYvariance:num
 * @text Variance
 * @type number
 * @parent offsetY:num
 * @desc How much variance should be given to offset Y?
 * @default 0
 *
 * @param Scale
 *
 * @param scaleDuration:num
 * @text Duration
 * @parent Scale
 * @type number
 * @min 1
 * @desc How many frames should it take the scaling to reach the target scale?
 * @default 20
 *
 * @param startScaleX:num
 * @text Starting Scale: X
 * @parent Scale
 * @desc What scale X value should the popup start at?
 * @default 2.0
 *
 * @param startScaleY:num
 * @text Starting Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup start at?
 * @default 2.0
 *
 * @param targetScaleX:num
 * @text Target Scale: X
 * @parent Scale
 * @desc What scale X value should the popup end at?
 * @default 1.0
 *
 * @param targetScaleY:num
 * @text Target Scale: Y
 * @parent Scale
 * @desc What scale Y value should the popup end at?
 * @default 1.0
 *
 * @param Acceleration
 *
 * @param startSpeedX:num
 * @text Starting Speed: X
 * @parent Acceleration
 * @desc How much should the starting X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default 0
 *
 * @param startSpeedY:num
 * @text Starting Speed: Y
 * @parent Acceleration
 * @desc How much should the starting Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param deltaSpeedX:num
 * @text Delta Speed: X
 * @parent Acceleration
 * @desc How much should the growing X speed of the popup be?
 * Negative: Left, Positive: Right
 * @default -0.10
 *
 * @param deltaSpeedY:num
 * @text Delta Speed: Y
 * @parent Acceleration
 * @desc How much should the growing Y speed of the popup be?
 * Negative: Up, Positive: Down
 * @default 0
 *
 * @param Fading
 *
 * @param opaqueDuration:num
 * @text Opaque Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc How many frames should the popup stay opaque?
 * @default 40
 *
 * @param fadeDuration:num
 * @text Fade Duration
 * @parent Fading
 * @type number
 * @min 1
 * @desc After the opaque duration wears off, how many frames will
 * it take for the popup to vanish?
 * @default 20
 *
 */
//=============================================================================

const _0x49745f=_0x35d9;(function(_0x512a65,_0x185b01){const _0x2a6349=_0x35d9,_0x5346b0=_0x512a65();while(!![]){try{const _0x1c81d3=-parseInt(_0x2a6349(0x170))/0x1+-parseInt(_0x2a6349(0x114))/0x2*(parseInt(_0x2a6349(0xf4))/0x3)+-parseInt(_0x2a6349(0x18b))/0x4+parseInt(_0x2a6349(0x18c))/0x5+parseInt(_0x2a6349(0x188))/0x6*(parseInt(_0x2a6349(0x14f))/0x7)+-parseInt(_0x2a6349(0xf6))/0x8*(-parseInt(_0x2a6349(0x115))/0x9)+parseInt(_0x2a6349(0x141))/0xa;if(_0x1c81d3===_0x185b01)break;else _0x5346b0['push'](_0x5346b0['shift']());}catch(_0x56ab7c){_0x5346b0['push'](_0x5346b0['shift']());}}}(_0x773d,0xe4b68));function _0x35d9(_0x2108f1,_0x1bba74){const _0x773d61=_0x773d();return _0x35d9=function(_0x35d9c7,_0x5edcb4){_0x35d9c7=_0x35d9c7-0xf2;let _0x1cd078=_0x773d61[_0x35d9c7];return _0x1cd078;},_0x35d9(_0x2108f1,_0x1bba74);}var label=_0x49745f(0x10b),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x49745f(0x19b)](function(_0x34cf43){const _0x272c73=_0x49745f;return _0x34cf43[_0x272c73(0x17d)]&&_0x34cf43[_0x272c73(0x11d)][_0x272c73(0x173)]('['+label+']');})[0x0];VisuMZ[label][_0x49745f(0x15b)]=VisuMZ[label][_0x49745f(0x15b)]||{},VisuMZ['ConvertParams']=function(_0x1f5eda,_0x3c5b7d){const _0x48a5a9=_0x49745f;for(const _0x593b64 in _0x3c5b7d){if(_0x593b64[_0x48a5a9(0x189)](/(.*):(.*)/i)){const _0x3da519=String(RegExp['$1']),_0x5a55d0=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x2b8fa3,_0x4b2825,_0x53d641;switch(_0x5a55d0){case _0x48a5a9(0x144):_0x2b8fa3=_0x3c5b7d[_0x593b64]!==''?Number(_0x3c5b7d[_0x593b64]):0x0;break;case _0x48a5a9(0x183):_0x4b2825=_0x3c5b7d[_0x593b64]!==''?JSON['parse'](_0x3c5b7d[_0x593b64]):[],_0x2b8fa3=_0x4b2825[_0x48a5a9(0x137)](_0xfa0a03=>Number(_0xfa0a03));break;case _0x48a5a9(0x12a):_0x2b8fa3=_0x3c5b7d[_0x593b64]!==''?eval(_0x3c5b7d[_0x593b64]):null;break;case'ARRAYEVAL':_0x4b2825=_0x3c5b7d[_0x593b64]!==''?JSON[_0x48a5a9(0x147)](_0x3c5b7d[_0x593b64]):[],_0x2b8fa3=_0x4b2825['map'](_0x491a0f=>eval(_0x491a0f));break;case'JSON':_0x2b8fa3=_0x3c5b7d[_0x593b64]!==''?JSON[_0x48a5a9(0x147)](_0x3c5b7d[_0x593b64]):'';break;case _0x48a5a9(0x15d):_0x4b2825=_0x3c5b7d[_0x593b64]!==''?JSON[_0x48a5a9(0x147)](_0x3c5b7d[_0x593b64]):[],_0x2b8fa3=_0x4b2825['map'](_0x34c87c=>JSON[_0x48a5a9(0x147)](_0x34c87c));break;case'FUNC':_0x2b8fa3=_0x3c5b7d[_0x593b64]!==''?new Function(JSON['parse'](_0x3c5b7d[_0x593b64])):new Function(_0x48a5a9(0x13b));break;case _0x48a5a9(0x132):_0x4b2825=_0x3c5b7d[_0x593b64]!==''?JSON[_0x48a5a9(0x147)](_0x3c5b7d[_0x593b64]):[],_0x2b8fa3=_0x4b2825[_0x48a5a9(0x137)](_0x2c02d1=>new Function(JSON[_0x48a5a9(0x147)](_0x2c02d1)));break;case _0x48a5a9(0x136):_0x2b8fa3=_0x3c5b7d[_0x593b64]!==''?String(_0x3c5b7d[_0x593b64]):'';break;case _0x48a5a9(0x165):_0x4b2825=_0x3c5b7d[_0x593b64]!==''?JSON[_0x48a5a9(0x147)](_0x3c5b7d[_0x593b64]):[],_0x2b8fa3=_0x4b2825[_0x48a5a9(0x137)](_0x283a9e=>String(_0x283a9e));break;case _0x48a5a9(0x164):_0x53d641=_0x3c5b7d[_0x593b64]!==''?JSON['parse'](_0x3c5b7d[_0x593b64]):{},_0x2b8fa3=VisuMZ['ConvertParams']({},_0x53d641);break;case _0x48a5a9(0xfb):_0x4b2825=_0x3c5b7d[_0x593b64]!==''?JSON['parse'](_0x3c5b7d[_0x593b64]):[],_0x2b8fa3=_0x4b2825['map'](_0x411ee9=>VisuMZ[_0x48a5a9(0x19c)]({},JSON[_0x48a5a9(0x147)](_0x411ee9)));break;default:continue;}_0x1f5eda[_0x3da519]=_0x2b8fa3;}}return _0x1f5eda;},(_0x1670bb=>{const _0x567542=_0x49745f,_0x251349=_0x1670bb[_0x567542(0x18f)];for(const _0x53d56f of dependencies){if(!Imported[_0x53d56f]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x567542(0x155)](_0x251349,_0x53d56f)),SceneManager['exit']();break;}}const _0x5c0836=_0x1670bb[_0x567542(0x11d)];if(_0x5c0836['match'](/\[Version[ ](.*?)\]/i)){const _0x3aab94=Number(RegExp['$1']);_0x3aab94!==VisuMZ[label][_0x567542(0x161)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x567542(0x155)](_0x251349,_0x3aab94)),SceneManager['exit']());}if(_0x5c0836[_0x567542(0x189)](/\[Tier[ ](\d+)\]/i)){const _0x4bdf35=Number(RegExp['$1']);_0x4bdf35<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x567542(0x155)](_0x251349,_0x4bdf35,tier)),SceneManager['exit']()):tier=Math['max'](_0x4bdf35,tier);}VisuMZ[_0x567542(0x19c)](VisuMZ[label][_0x567542(0x15b)],_0x1670bb[_0x567542(0x104)]);})(pluginData),ColorManager[_0x49745f(0x102)]=function(_0xc53d0d){const _0x3cd034=_0x49745f;return _0xc53d0d=String(_0xc53d0d),_0xc53d0d[_0x3cd034(0x189)](/#(.*)/i)?_0x3cd034(0x129)[_0x3cd034(0x155)](String(RegExp['$1'])):this['textColor'](Number(_0xc53d0d));},SceneManager[_0x49745f(0x17b)]=function(){const _0x39f3f2=_0x49745f;return this[_0x39f3f2(0x181)]&&this['_scene']['constructor']===Scene_Battle;},VisuMZ[_0x49745f(0x10b)][_0x49745f(0x10c)]=Game_Action[_0x49745f(0x192)][_0x49745f(0x15a)],Game_Action[_0x49745f(0x192)][_0x49745f(0x15a)]=function(_0x3b8265,_0x2f8a69){const _0x5694f1=_0x49745f;VisuMZ[_0x5694f1(0x10b)]['Game_Action_executeDamage'][_0x5694f1(0x160)](this,_0x3b8265,_0x2f8a69),this[_0x5694f1(0x134)](_0x3b8265,_0x2f8a69);},Game_Action[_0x49745f(0x192)]['createWeaknessPopups']=function(_0x21136e,_0x5582a6){const _0x30629b=_0x49745f;if(!SceneManager[_0x30629b(0x17b)]())return;if(!this[_0x30629b(0xfc)]()&&!this[_0x30629b(0x12b)]())return;this[_0x30629b(0x133)](_0x21136e,_0x5582a6),this['createWeaknessPopupsForCritical'](_0x21136e,_0x5582a6);},Game_Action[_0x49745f(0x192)][_0x49745f(0x18d)]=function(_0x57277e,_0x44c299){const _0xf6b718=_0x49745f,_0x5ce50d=_0x57277e['result']();if(!_0x5ce50d['critical'])return;const _0x4a80db=SceneManager[_0xf6b718(0x181)][_0xf6b718(0x124)];if(!_0x4a80db)return;_0x4a80db[_0xf6b718(0x127)](_0x57277e,_0xf6b718(0x13e));},Game_Action[_0x49745f(0x192)]['createWeaknessPopupsForElementRate']=function(_0x5ce397,_0x4a84ca){const _0x2eb67b=_0x49745f,_0xee71b7=SceneManager['_scene'][_0x2eb67b(0x124)];if(!_0xee71b7)return;$gameTemp['bypassUserElementBonus']=!![];const _0x495137=this[_0x2eb67b(0xff)](_0x5ce397);$gameTemp['bypassUserElementBonus']=![];let _0x1c991f=_0x2eb67b(0x13f);if(_0x495137===0x0)_0x1c991f=_0x2eb67b(0x103);else{if(_0x495137<0x0)_0x1c991f=_0x2eb67b(0x12d);else{if(_0x495137>=0x2)_0x1c991f='Element200';else{if(_0x495137>=1.75)_0x1c991f='Element175';else{if(_0x495137>=1.5)_0x1c991f=_0x2eb67b(0x13a);else{if(_0x495137>=1.25)_0x1c991f=_0x2eb67b(0x120);else{if(_0x495137>=1.1)_0x1c991f=_0x2eb67b(0x17a);else{if(_0x495137>=1.05)_0x1c991f=_0x2eb67b(0x15c);else{if(_0x495137>=1.01)_0x1c991f='Element101';else{if(_0x495137<=0.25)_0x1c991f=_0x2eb67b(0x179);else{if(_0x495137<=0.5)_0x1c991f=_0x2eb67b(0x11c);else{if(_0x495137<=0.75)_0x1c991f='Element75';else{if(_0x495137<=0.9)_0x1c991f=_0x2eb67b(0x159);else{if(_0x495137<=0.95)_0x1c991f=_0x2eb67b(0x153);else _0x495137<=0.99&&(_0x1c991f=_0x2eb67b(0x167));}}}}}}}}}}}}}_0xee71b7['createWeaknessPopupType'](_0x5ce397,_0x1c991f);},VisuMZ[_0x49745f(0x10b)][_0x49745f(0x109)]=Game_Action[_0x49745f(0x192)]['calcUserElementDamagePlus'],Game_Action['prototype'][_0x49745f(0x199)]=function(_0x47cf51,_0x31a439){const _0x302160=_0x49745f;if($gameTemp[_0x302160(0x184)])return 0x0;return VisuMZ[_0x302160(0x10b)][_0x302160(0x109)][_0x302160(0x160)](this,_0x47cf51,_0x31a439);},VisuMZ['WeaknessPopups'][_0x49745f(0x172)]=Game_Action[_0x49745f(0x192)]['calcUserElementDamageRate'],Game_Action['prototype'][_0x49745f(0x171)]=function(_0x21b202,_0x1ee805){const _0x541eea=_0x49745f;if($gameTemp[_0x541eea(0x184)])return 0x1;return VisuMZ[_0x541eea(0x10b)][_0x541eea(0x172)][_0x541eea(0x160)](this,_0x21b202,_0x1ee805);},VisuMZ[_0x49745f(0x10b)][_0x49745f(0x12f)]=Game_Action[_0x49745f(0x192)][_0x49745f(0x15e)],Game_Action['prototype'][_0x49745f(0x15e)]=function(_0xf8b3f5,_0x172c24){const _0x3c06ed=_0x49745f;if($gameTemp[_0x3c06ed(0x184)])return 0x0;return VisuMZ[_0x3c06ed(0x10b)]['Game_Action_calcUserElementDamageFlat'][_0x3c06ed(0x160)](this,_0xf8b3f5,_0x172c24);};function Sprite_WeaknessPopup(){const _0x1a2cb8=_0x49745f;this[_0x1a2cb8(0x14e)](...arguments);}function _0x773d(){const _0x48410e=['findTargetSprite','Element99','TEXT','updateOpacity','CRITICAL_STACK_OFFSET','AniMute','boxHeight','fontFace','BattleCore','fontSize','784700kySkbm','calcUserElementDamageRate','Game_Action_calcUserElementDamageRate','includes','updateAttachmentSprites','drawText','fontBold','addChildAt','filename','Element25','Element110','isSceneBattle','_battleField','status','offsetX','_homeX','round','_scene','_speedY','ARRAYNUM','bypassUserElementBonus','_createWeaknessPopupContainer','VisuMZ_1_BattleCore','randomInt','9215346MDpJyR','match','_opaqueDuration','1285996qzKEPU','7658500mmyYAa','createWeaknessPopupsForCritical','Spriteset_Battle_adjustFlippedBattlefield','name','getWeaknessPopupData','_scaleDuration','prototype','battleLayoutStyle','createBattleField','AnimationID','_weaknessPopupContainer','#ffffff','center','calcUserElementDamagePlus','textColor','filter','ConvertParams','createBitmapImage','updateScaling','fadeDuration','some','createWeaknessPopupsContainer','createWeaknessPopupAnimation','height','targetScaleY','extraPositionY','deltaSpeedX','63AtZDUf','create','8vuRNng','_distortionSprite','width','VisuMZ_3_FrontviewBattleUI','itemRect','ARRAYSTRUCT','isDamage','update','scaleDuration','calcElementRate','loadWeaknessPopupBitmap','CritStackOffsetY','getColor','Element0','parameters','offsetXvariance','initPosition','centerFrontViewSpriteWeaknessPopup','Impact','Game_Action_calcUserElementDamagePlus','text','WeaknessPopups','Game_Action_executeDamage','_baseY','startScaleY','initMembers','boxWidth','_weaknessPopupsContainer','abs','ceil','172702ssSbKX','2114469ALjKOT','targetScaleX','_targetScaleY','outlineSize','removeChild','Spriteset_Battle_createBattleField','getWeaknessPopupContainer','Element50','description','updateEffectsContainer','createBitmap','Element125','actor','updatePosition','_fadeDuration','_spriteset','loadSystem','VisuMZ_0_CoreEngine','createWeaknessPopupType','offsetY','#%1','EVAL','isDrain','_baseX','ElementNegative','bitmapHeight','Game_Action_calcUserElementDamageFlat','extraPositionX','bitmap','ARRAYFUNC','createWeaknessPopupsForElementRate','createWeaknessPopups','_speedX','STR','map','addChild','_battler','Element150','return\x200','enabled','_createDamageContainer','Critical','none','startSpeedY','5538460JdzYUp','scale','_data','NUM','deltaSpeedY','bitmapWidth','parse','isSideView','isActor','type','updateWeaknessPopupsContainer','adjustFlippedBattlefield','outlineColor','initialize','7CFrWbk','battleMembers','VisuMZ_3_ActSeqCamera','Spriteset_Battle_update','Element95','_damageContainer','format','Window_BattleStatus_createDamageContainer','startScaleX','AniMirror','Element90','executeDamage','Settings','Element105','ARRAYJSON','calcUserElementDamageFlat','requestFauxAnimation','call','version','fontItalic','_statusWindow','STRUCT','ARRAYSTR'];_0x773d=function(){return _0x48410e;};return _0x773d();}Sprite_WeaknessPopup[_0x49745f(0x192)]=Object[_0x49745f(0xf5)](Sprite['prototype']),Sprite_WeaknessPopup['prototype']['constructor']=Sprite_WeaknessPopup,Sprite_WeaknessPopup[_0x49745f(0x16a)]={'offsetX':VisuMZ['WeaknessPopups']['Settings']['CritStackOffsetX'],'offsetY':VisuMZ[_0x49745f(0x10b)][_0x49745f(0x15b)][_0x49745f(0x101)]},Sprite_WeaknessPopup['prototype'][_0x49745f(0x14e)]=function(_0x58088f,_0x48d8a6){const _0x3a494b=_0x49745f;this[_0x3a494b(0x139)]=_0x58088f,this['_data']=_0x48d8a6,this[_0x3a494b(0x10f)](),Sprite[_0x3a494b(0x192)]['initialize'][_0x3a494b(0x160)](this),this['createBitmap'](),this['initPosition']();},Sprite_WeaknessPopup['prototype'][_0x49745f(0x11f)]=function(){const _0x3535a2=_0x49745f;this['_data'][_0x3535a2(0x178)]?this[_0x3535a2(0x100)]():this[_0x3535a2(0x19d)]();},Sprite_WeaknessPopup[_0x49745f(0x192)][_0x49745f(0x100)]=function(){const _0x5a0769=_0x49745f;this[_0x5a0769(0x131)]=ImageManager[_0x5a0769(0x125)](this[_0x5a0769(0x143)][_0x5a0769(0x178)]);},Sprite_WeaknessPopup[_0x49745f(0x192)][_0x49745f(0x19d)]=function(){const _0x238e5d=_0x49745f;this[_0x238e5d(0x131)]=new Bitmap(this[_0x238e5d(0x143)][_0x238e5d(0x146)],this['_data'][_0x238e5d(0x12e)]),this[_0x238e5d(0x131)][_0x238e5d(0x16d)]=this[_0x238e5d(0x143)][_0x238e5d(0x16d)],this[_0x238e5d(0x131)]['fontSize']=this[_0x238e5d(0x143)][_0x238e5d(0x16f)],this['bitmap'][_0x238e5d(0x176)]=this[_0x238e5d(0x143)][_0x238e5d(0x176)],this[_0x238e5d(0x131)][_0x238e5d(0x162)]=this[_0x238e5d(0x143)][_0x238e5d(0x162)],this[_0x238e5d(0x131)][_0x238e5d(0x19a)]=ColorManager[_0x238e5d(0x102)](this[_0x238e5d(0x143)][_0x238e5d(0x19a)]),this[_0x238e5d(0x131)]['outlineSize']=this[_0x238e5d(0x143)][_0x238e5d(0x118)],this['bitmap'][_0x238e5d(0x14d)]=this[_0x238e5d(0x143)][_0x238e5d(0x14d)],this[_0x238e5d(0x131)][_0x238e5d(0x175)](this[_0x238e5d(0x143)][_0x238e5d(0x10a)],0x0,0x0,this[_0x238e5d(0x131)]['width'],this[_0x238e5d(0x131)][_0x238e5d(0x1a3)],_0x238e5d(0x198));},Sprite_WeaknessPopup[_0x49745f(0x192)][_0x49745f(0x10f)]=function(){const _0x2df50e=_0x49745f;this[_0x2df50e(0x135)]=this[_0x2df50e(0x143)]['startSpeedX'],this[_0x2df50e(0x182)]=this[_0x2df50e(0x143)][_0x2df50e(0x140)],this['_opaqueDuration']=this[_0x2df50e(0x143)]['opaqueDuration'],this[_0x2df50e(0x123)]=this['_data'][_0x2df50e(0x19f)],this[_0x2df50e(0x191)]=this[_0x2df50e(0x143)][_0x2df50e(0xfe)];},Sprite_WeaknessPopup[_0x49745f(0x192)][_0x49745f(0x106)]=function(){const _0x4c29a3=_0x49745f,_0x35b5cb=SceneManager[_0x4c29a3(0x181)]['_statusWindow'];if(!$gameSystem[_0x4c29a3(0x148)]()&&this[_0x4c29a3(0x139)][_0x4c29a3(0x139)]['isActor']()){if(Imported[_0x4c29a3(0x186)]){const _0x3d08d4=this['_battler'][_0x4c29a3(0x139)]['index']();_0x35b5cb[_0x4c29a3(0x107)](_0x3d08d4);}}this['x']=this[_0x4c29a3(0x139)][_0x4c29a3(0x12c)]??this['_battler']['x'],this['x']+=this[_0x4c29a3(0x143)][_0x4c29a3(0x17e)];Imported[_0x4c29a3(0xf9)]&&this[_0x4c29a3(0x139)]['_battler'][_0x4c29a3(0x149)]()&&!$gameSystem['isSideView']()?this['y']=-0x24:(this['y']=this[_0x4c29a3(0x139)][_0x4c29a3(0x10d)]??this[_0x4c29a3(0x139)]['y'],this['y']-=this[_0x4c29a3(0x139)][_0x4c29a3(0x1a3)]*this[_0x4c29a3(0x139)]['scale']['y'],this['y']+=this[_0x4c29a3(0x143)]['offsetY']);if(Imported[_0x4c29a3(0x186)]&&VisuMZ[_0x4c29a3(0x16e)][_0x4c29a3(0x161)]>=1.38){this['x']+=this['_battler'][_0x4c29a3(0x130)]();const _0x28e15d=this[_0x4c29a3(0x139)][_0x4c29a3(0xf7)]['scale']['y'];this['y']+=this[_0x4c29a3(0x139)][_0x4c29a3(0xf2)]();}const _0x3309b0=this[_0x4c29a3(0x143)][_0x4c29a3(0x105)]||0x0,_0x364c3d=this[_0x4c29a3(0x143)]['offsetYvariance']||0x0;this['x']+=Math['randomInt'](_0x3309b0*0x2)-_0x3309b0,this['y']+=Math[_0x4c29a3(0x187)](_0x364c3d*0x2)-_0x364c3d,this['anchor']['x']=0.5,this['anchor']['y']=0.5,this[_0x4c29a3(0x142)]['x']=this['_data'][_0x4c29a3(0x157)],this[_0x4c29a3(0x142)]['y']=this['_data'][_0x4c29a3(0x10e)],this['_targetScaleX']=this['_data'][_0x4c29a3(0x116)],this[_0x4c29a3(0x117)]=this[_0x4c29a3(0x143)][_0x4c29a3(0x1a4)];},Window_BattleStatus[_0x49745f(0x192)][_0x49745f(0x107)]=function(_0x3dd33f){const _0x4ad1bd=_0x49745f,_0x3ab396=this[_0x4ad1bd(0x121)](_0x3dd33f)['battler']();if(!_0x3ab396)return;const _0x681767=this[_0x4ad1bd(0x193)](),_0x56a8e8=this[_0x4ad1bd(0xfa)](_0x3dd33f);let _0x414f9c=Math[_0x4ad1bd(0x180)](_0x56a8e8['x']+_0x56a8e8[_0x4ad1bd(0xf8)]/0x2)+this['padding'];['list'][_0x4ad1bd(0x173)](_0x681767)&&(_0x414f9c=_0x56a8e8['width']/$gameParty[_0x4ad1bd(0x150)]()['length'],_0x414f9c*=_0x3dd33f,_0x414f9c+=_0x56a8e8[_0x4ad1bd(0xf8)]/$gameParty[_0x4ad1bd(0x150)]()['length']/0x2),_0x3ab396[_0x4ad1bd(0x17f)]=_0x414f9c,this[_0x4ad1bd(0x177)](_0x3ab396,0x1),_0x3ab396['show'](),this[_0x4ad1bd(0x11e)](),this[_0x4ad1bd(0x174)]();},Sprite_WeaknessPopup['prototype'][_0x49745f(0xfd)]=function(){const _0x3b4a35=_0x49745f;Sprite['prototype'][_0x3b4a35(0xfd)][_0x3b4a35(0x160)](this),this['updatePosition'](),this[_0x3b4a35(0x19e)](),this[_0x3b4a35(0x169)]();},Sprite_WeaknessPopup[_0x49745f(0x192)][_0x49745f(0x122)]=function(){const _0x3b38f4=_0x49745f;this['x']+=this[_0x3b38f4(0x135)],this['y']+=this['_speedY'],this[_0x3b38f4(0x135)]+=this['_data'][_0x3b38f4(0xf3)],this[_0x3b38f4(0x182)]+=this[_0x3b38f4(0x143)][_0x3b38f4(0x145)];},Sprite_WeaknessPopup['prototype'][_0x49745f(0x19e)]=function(){const _0x312ea2=_0x49745f;if(this[_0x312ea2(0x191)]>0x0){const _0x574055=this[_0x312ea2(0x191)];this['scale']['x']=(this[_0x312ea2(0x142)]['x']*(_0x574055-0x1)+this['_targetScaleX'])/_0x574055,this[_0x312ea2(0x142)]['y']=(this['scale']['y']*(_0x574055-0x1)+this[_0x312ea2(0x117)])/_0x574055,this[_0x312ea2(0x191)]--;}else this[_0x312ea2(0x142)]['x']=0x1,this[_0x312ea2(0x142)]['y']=0x1;},Sprite_WeaknessPopup[_0x49745f(0x192)][_0x49745f(0x169)]=function(){const _0x18818c=_0x49745f;if(this[_0x18818c(0x18a)]-->0x0)return;if(this[_0x18818c(0x123)]>0x0){const _0x323a79=this[_0x18818c(0x123)];this['opacity']=(this['opacity']*(_0x323a79-0x1)+0x0)/_0x323a79,this[_0x18818c(0x123)]--;}else{const _0x2fb90f=this['parent'];_0x2fb90f&&(_0x2fb90f[_0x18818c(0x119)](this),this['destroy']());}},VisuMZ[_0x49745f(0x10b)]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x49745f(0x192)][_0x49745f(0x194)],Spriteset_Battle[_0x49745f(0x192)][_0x49745f(0x194)]=function(){const _0xcc8b3c=_0x49745f;VisuMZ[_0xcc8b3c(0x10b)][_0xcc8b3c(0x11a)][_0xcc8b3c(0x160)](this),this['createWeaknessPopupsContainer']();},Spriteset_Battle['prototype'][_0x49745f(0x1a1)]=function(){const _0xb030ab=_0x49745f;if(this[_0xb030ab(0x111)])return;this[_0xb030ab(0x111)]=new Sprite(),this[_0xb030ab(0x111)]['x']=this[_0xb030ab(0x17c)]['x'],this[_0xb030ab(0x111)]['y']=this[_0xb030ab(0x17c)]['y'];const _0x4a75d8=Math[_0xb030ab(0x113)]((Graphics['width']-Graphics[_0xb030ab(0x110)])/0x2),_0x219985=Math[_0xb030ab(0x113)]((Graphics[_0xb030ab(0x1a3)]-Graphics[_0xb030ab(0x16c)])/0x2);this['_weaknessPopupsContainer']['x']+=_0x4a75d8,this[_0xb030ab(0x111)]['y']+=_0x219985,this['addChild'](this[_0xb030ab(0x111)]);},VisuMZ['WeaknessPopups']['Spriteset_Battle_adjustFlippedBattlefield']=Spriteset_Battle[_0x49745f(0x192)][_0x49745f(0x14c)],Spriteset_Battle['prototype'][_0x49745f(0x14c)]=function(){const _0x39c04f=_0x49745f;VisuMZ[_0x39c04f(0x10b)][_0x39c04f(0x18e)]['call'](this);!this['_weaknessPopupsContainer']&&this[_0x39c04f(0x1a1)]();if(!this['isFlipped']())return;this['_weaknessPopupsContainer'][_0x39c04f(0x142)]['x']=-0x1,this[_0x39c04f(0x111)]['x']=this[_0x39c04f(0x17c)]['x']+this['_battleField'][_0x39c04f(0xf8)];},VisuMZ['WeaknessPopups'][_0x49745f(0x152)]=Spriteset_Battle['prototype'][_0x49745f(0xfd)],Spriteset_Battle[_0x49745f(0x192)][_0x49745f(0xfd)]=function(){const _0x4b2028=_0x49745f;VisuMZ[_0x4b2028(0x10b)][_0x4b2028(0x152)][_0x4b2028(0x160)](this),this[_0x4b2028(0x14b)]();},Spriteset_Battle['prototype']['updateWeaknessPopupsContainer']=function(){const _0x19db95=_0x49745f;if(!this['_weaknessPopupsContainer'])return;if(!this[_0x19db95(0x154)])return;this[_0x19db95(0x111)]['x']=this[_0x19db95(0x154)]['x'],this[_0x19db95(0x111)]['y']=this[_0x19db95(0x154)]['y'];if(!Imported[_0x19db95(0x151)])return;const _0x5a44f2=Math[_0x19db95(0x113)]((Graphics['width']-Graphics[_0x19db95(0x110)])/0x2),_0x9852fe=Math[_0x19db95(0x113)]((Graphics[_0x19db95(0x1a3)]-Graphics[_0x19db95(0x16c)])/0x2);this[_0x19db95(0x111)]['x']+=_0x5a44f2,this[_0x19db95(0x111)]['y']+=_0x9852fe;},Spriteset_Battle[_0x49745f(0x192)]['createWeaknessPopupType']=function(_0x1c9b97,_0x263efa){const _0x5588e2=_0x49745f;if(!_0x1c9b97)return;if(!this[_0x5588e2(0x111)])return;const _0xbe590=this[_0x5588e2(0x190)](_0x263efa);if(!_0xbe590)return;if(!_0xbe590[_0x5588e2(0x13c)])return;this['createWeaknessPopup'](_0x1c9b97,_0xbe590);},VisuMZ[_0x49745f(0x10b)]['DefaultPopupSettings']=function(){const _0x29cf5c=_0x49745f;return{'enabled':!![],'filename':'','text':_0x29cf5c(0x168),'bitmapWidth':0x258,'bitmapHeight':0xc8,'fontFace':_0x29cf5c(0x108),'fontSize':0x24,'fontBold':![],'fontItalic':![],'textColor':_0x29cf5c(0x197),'outlineSize':0x5,'outlineColor':'rgba(1,\x201,\x201,\x201)','offsetX':0x0,'offsetY':0x0,'scaleDuration':0x14,'startScaleX':0x2,'startScaleY':0x2,'targetScaleX':0x1,'targetScaleY':0x1,'startSpeedX':0x0,'startSpeedY':0x0,'deltaSpeedX':0x0,'deltaSpeedY':0x0,'opaqueDuration':0x28,'fadeDuration':0x14};},Spriteset_Battle[_0x49745f(0x192)][_0x49745f(0x190)]=function(_0x13a02d){const _0x58e6c6=_0x49745f,_0x552b39=VisuMZ['WeaknessPopups'][_0x58e6c6(0x15b)];if(!_0x552b39)return null;if(_0x13a02d===_0x58e6c6(0x13f))return null;const _0xae865e=_0x552b39[_0x13a02d];return _0xae865e[_0x58e6c6(0x14a)]=_0x13a02d,_0xae865e;},Spriteset_Battle[_0x49745f(0x192)]['createWeaknessPopup']=function(_0x79e85f,_0x81edd7){const _0x12ba8b=_0x49745f;if(!_0x79e85f)return;if(!_0x81edd7)return;if(!_0x81edd7[_0x12ba8b(0x13c)])return;if(!this['_weaknessPopupsContainer'])return;if(!Imported[_0x12ba8b(0x186)]&&_0x79e85f['isActor']()&&!$gameSystem['isSideView']())return;const _0x4d5083=this[_0x12ba8b(0x166)](_0x79e85f);if(!_0x4d5083)return;const _0xc9c446=new Sprite_WeaknessPopup(_0x4d5083,_0x81edd7),_0x31a0e2=this[_0x12ba8b(0x11b)](_0x4d5083);if(_0x81edd7[_0x12ba8b(0x14a)]===_0x12ba8b(0x13e)){const _0x34c4c9=Math[_0x12ba8b(0x113)](_0x81edd7[_0x12ba8b(0x146)]/0x4),_0x317d43=Math[_0x12ba8b(0x113)](_0x81edd7[_0x12ba8b(0x12e)]/0x2);if(_0x31a0e2['children'][_0x12ba8b(0x1a0)](_0xaa5c3a=>Math[_0x12ba8b(0x112)](_0xaa5c3a['x']-_0xc9c446['x'])<_0x34c4c9&&Math[_0x12ba8b(0x112)](_0xaa5c3a['y']-_0xc9c446['y'])<_0x317d43)){const _0x491119=Sprite_WeaknessPopup[_0x12ba8b(0x16a)];_0xc9c446['x']+=_0x491119[_0x12ba8b(0x17e)],_0xc9c446['y']+=_0x491119[_0x12ba8b(0x128)];}}_0x31a0e2[_0x12ba8b(0x138)](_0xc9c446);},Spriteset_Battle[_0x49745f(0x192)][_0x49745f(0x11b)]=function(_0x7e438a){const _0x3a72ce=_0x49745f;return!$gameSystem[_0x3a72ce(0x148)]()&&_0x7e438a[_0x3a72ce(0x139)]['isActor']()?SceneManager['_scene'][_0x3a72ce(0x163)][_0x3a72ce(0x196)]:this[_0x3a72ce(0x111)];},Spriteset_Battle['prototype'][_0x49745f(0x1a2)]=function(_0x41679c,_0x29e06d){const _0x5af84a=_0x49745f;if(!_0x41679c)return;if(!_0x29e06d)return;if(!_0x29e06d[_0x5af84a(0x13c)])return;if(!Imported[_0x5af84a(0x126)])return;const _0x1d6545=_0x29e06d[_0x5af84a(0x195)]??0x0;if(_0x1d6545>0x0){const _0x50764f=_0x29e06d[_0x5af84a(0x158)]??![],_0x38c53a=_0x29e06d[_0x5af84a(0x16b)]??![];$gameTemp[_0x5af84a(0x15f)]([_0x41679c],_0x1d6545,_0x50764f,_0x38c53a);}},VisuMZ[_0x49745f(0x10b)]['Window_BattleStatus_createDamageContainer']=Window_BattleStatus[_0x49745f(0x192)][_0x49745f(0x13d)],Window_BattleStatus[_0x49745f(0x192)]['_createDamageContainer']=function(){const _0x42dead=_0x49745f;this[_0x42dead(0x185)](),VisuMZ[_0x42dead(0x10b)][_0x42dead(0x156)][_0x42dead(0x160)](this);},Window_BattleStatus['prototype'][_0x49745f(0x185)]=function(){const _0x3aeb8c=_0x49745f;this[_0x3aeb8c(0x196)]=new Sprite(),this['addChild'](this[_0x3aeb8c(0x196)]);};