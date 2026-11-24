//=============================================================================
// VisuStella MZ - Action Sequence Impact
// VisuMZ_3_ActSeqImpact.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_ActSeqImpact = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ActSeqImpact = VisuMZ.ActSeqImpact || {};
VisuMZ.ActSeqImpact.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.10] [ActSeqImpact]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Action_Sequence_Impact_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * With the aid of Pixi JS Filters, this plugin adds more impact to battle by
 * producing special on screen filter effects to make certain actions like
 * critical hits, guarding, and dodging more visibly different adding to the
 * flavor of the battle.
 * 
 * This plugin also adds new Action Sequences for the Battle Core, allowing
 * impacting effects like color breaks, motion blurs, shockwaves, motion
 * trails, and zoom blurs.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Creating a color break effect when landing critical hits akin to a
 *   chromatic aberration effect.
 * * A battler who dodges an attack will display a motion blur effect.
 * * Guarding damage will cause a shockwave effect.
 * * Adds new Action Sequences available from the Battle Core Plugin Commands.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * Pixi JS Filters*
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
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
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * New Effects
 * ============================================================================
 * 
 * The following are new visual effects added through this plugin. These visual
 * effects are added and modified with the sense of adding more impact to
 * visuals in battle.
 *
 * ---
 * 
 * Bizarro Inversion
 * 
 * Swaps the blue/red colors on the battlefield. What was originally blue will
 * become red and what was originally red will become blue.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * ---
 * 
 * Color Break
 * 
 * When a critical hit occurs, the colors on the screen will break apart into
 * red, green, and blue into random directions and then come back together
 * similar to a chromatic aberration. This creates a sense of weight when
 * delivering a powerful strike.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Desaturation
 * 
 * Desaturates all colors on the battlefield. This will result in a black and
 * white greyscale effect.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Motion Blur
 * 
 * When a battler dodges an attack (either a miss or evasion proc), then the
 * battler will generate a motion blur effect. Their image splits apart in a
 * blurred manner and then fuses back together to become whole again. This
 * generates the illusion that they're hard to hit.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * There are two versions, one that affects only the battler while another that
 * affects the whole screen.
 * 
 * ---
 * 
 * Motion Trail
 * 
 * If motion trails are enabled on a battler, whenever they move, they leave
 * behind a residual sprite of their motion during that particular frame. The
 * motion blurs aid in visualizing the path the battler moved in case the
 * battler's movement trajectory is normally too fast to portray. Motion trails
 * can have different hue and/or tones.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 * 
 * Negative Inversion
 * 
 * Inverts all colors on the battlefield. They pretty much swap 180 degrees of
 * hue with whatever color is on the opposite side.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Oversaturation
 * 
 * Oversaturates all colors on the battlefield. Colors will become extra vivid
 * and look extremely concentrated. Brighter colors become brighter while
 * darker colors become darker.
 * 
 * Anything that is attached to the battlefield will be affected. UI objects,
 * pictures, etc. that aren't attached to the battlefield will not be affected
 * by the effect. Depending on your settings, this may or may not include
 * battle animations, too.
 * 
 * ---
 * 
 * Shockwave
 * 
 * When a guarding battler would receive HP damage (or manages to defend to 0
 * damage), a shockwave effect occurs to display the impact. The shockwave will
 * ripple out from the battler to the edges of the screen before disappearing.
 * 
 * This is optional and can be disabled.
 * 
 * This effect is also available as an Action Sequence in the Battle Core.
 * 
 * ---
 * 
 * Time Scale
 * 
 * This causes time to go slower or faster depending on the settings. All
 * things related to the game client will go slower or faster.
 * 
 * This only affects battle. The effects go away during the input phase or when
 * a message is present.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Time Stop
 * 
 * The game client will pause time for set amount of time, only the music and
 * any sound effects continuing.
 * 
 * Created by Manu Gaming!
 * 
 * ---
 * 
 * Zoom Blur
 * 
 * A zoom blur will direct its focus at a specific point on the screen and
 * create a visual radial distortion towards that point. The intensity of the
 * zoom effect will diminish over the duration of the zoom blur. This helps
 * draw focus towards specific parts of the screen.
 * 
 * This is an Action Sequence-only effect.
 * 
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * The following are Action Sequence Plugin Commands that have been added with
 * this plugin. These are accessible from the Battle Core plugin (not this one)
 * in order to keep all the Action Sequences in place.
 * 
 * Once again, these plugin commands are only accessible through the Battle
 * Core plugin and not this one! Make sure you have the most update to date
 * version of the Battle Core for them.
 *
 * ---
 * 
 * === Action Sequences - Impact ===
 * 
 * These Action Sequences are related to creating impact.
 * Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * IMPACT: Bizarro Inversion
 * - Swaps blue/red colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Bizarro?:
 *   - Enable Bizarro Inversion effect?
 *
 * ---
 *
 * IMPACT: Color Break
 * - Breaks the colors on the screen before reassembling.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Intensity:
 *   - What is the intensity of the color break effect?
 *
 *   Duration:
 *   - What is the duration of the color break effect?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Desaturation
 * - Desaturates all colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Desaturate?:
 *   - Enable Desaturation effect?
 *
 * ---
 *
 * IMPACT: Motion Blur Screen
 * - Creates a motion blur on the whole screen.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Blur Target(s)
 * - Creates a motion blur on selected target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion blur effects for.
 *
 *   Angle:
 *   - Determine what angle to make the motion blur at.
 *
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 *
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Motion Trail Create
 * - Creates a motion trail effect for the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to create motion trail effects for.
 *
 *   Delay:
 *   - How many frames to delay by when creating a motion trail?
 *   - The higher the delay, the less motion trails there are.
 *
 *   Duration:
 *   - How many frames should the motion trail last?
 *   - What do you want to be its duration?
 *
 *   Hue:
 *   - What do you want to be the hue for the motion trail?
 *
 *   Starting Opacity:
 *   - What starting opacity value do you want for the motion trail?
 *   - Opacity values decrease over time.
 *
 *   Tone:
 *   - What tone do you want for the motion trail?
 *   - Format: [Red, Green, Blue, Gray]
 *
 * ---
 *
 * IMPACT: Motion Trail Remove
 * - Removes the motion trail effect from the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Targets:
 *   - Select unit(s) to clear motion trail effects for.
 *
 * ---
 *
 * IMPACT: Negative Inversion
 * - Inverts all the colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Negative?:
 *   - Enable Negative Inversion effect?
 *
 * ---
 *
 * IMPACT: Oversaturation
 * - Oversaturates colors on the battlefield.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Oversaturate?:
 *   - Enable Oversaturation effect?
 *
 * ---
 *
 * IMPACT: Shockwave at Point
 * - Creates a shockwave at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to create a shockwave at?
 *   - You can use JavaScript code.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Each Target(s)
 * - Creates a shockwave at each of the target(s) location(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Shockwave from Target(s) Center
 * - Creates a shockwave from the center of the target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a shockwave from.
 *
 *   Target Location:
 *   - Select which part target group to start a shockwave from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the shockwave X/Y point by.
 *
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 *
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 *
 *   Duration:
 *   - What is the duration of the shockwave?
 *
 * ---
 *
 * IMPACT: Time Scale
 * - Adjust time to go faster or slower!
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Scale:
 *   - Adjusts how fast/slow time goes.
 *   - 1.00 is normal. Lower is slower. Higher is faster.
 *
 * ---
 *
 * IMPACT: Time Stop
 * - Stops time for a set amount of milliseconds.
 * - Requires VisuMZ_3_ActSeqImpact!
 * - Created by Manu Gaming!
 *
 *   Milliseconds:
 *   - How many milliseconds should time stop for?
 *   - 1000 milliseconds = 1 second.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Point
 * - Creates a zoom blur at the designated coordinates.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Point: X:
 *   Point: Y:
 *   - What x/y coordinate do you want to focus the zoom at?
 *   - You can use JavaScript code.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * IMPACT: Zoom Blur at Target(s) Center
 * - Creates a zoom blur at the center of targets.
 * - Requires VisuMZ_3_ActSeqImpact!
 *
 *   Targets:
 *   - Select unit(s) to start a zoom blur from.
 *
 *   Target Location:
 *   - Select which part target group to start a zoom blur from.
 * 
 *     Offset X:
 *     Offset Y:
 *     - How much to offset the zoom blur X/Y point by.
 *
 *   Zoom Strength:
 *   - What is the strength of the zoom effect?
 *   - Use a number between 0 and 1.
 *
 *   Visible Radius:
 *   - How much of a radius should be visible from the center?
 *
 *   Duration:
 *   - What is the duration of the zoom blur?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * === Action Sequences - Inject ===
 *
 * These Action Sequences are related to injecting sprite animations.
 * Requires VisuMZ_3_ActSeqImpact!
 *
 * ---
 * 
 * INJECT: Animation Begin
 * - Injects and plays a whole spritesheet animation.
 * - The spritesheet animation will play over the battler until it is finished.
 * - The battler's original sprite will be invisible until finished.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to inject the animation on.
 * 
 *   Filename:
 *   - Select the animation spritesheet file.
 *   - Located in the /img/sv_actors/ folder.
 * 
 *     Horizontal Cells:
 *     - How many horizontal cells (or columns) are there?
 * 
 *     Vertical Cells:
 *     - How many vertical cells (or rows) are there?
 * 
 *     Frame Delay:
 *     - How many frames are played inbetween cells?
 * 
 *     Smooth Bitmap?:
 *     - Smooth the spritesheet graphic?
 * 
 *   Offset:
 * 
 *     Offset X:
 *     - Offsets the X position of the injected animation.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - Offsets the Y position of the injected animation.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * INJECT: Animation End
 * - Stops and ends any injected animations on target(s).
 * - Any inject animation will be prematurely terminated.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to stop injected animation(s).
 * 
 * ---
 * 
 * INJECT: Animation Pause/Resume
 * - Pauses/resumes any injected animations on target(s).
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 *   Targets:
 *   - Select unit(s) to pause/resume injected animation(s).
 * 
 *   Pause?:
 *   - Pause the injected animation?
 * 
 * ---
 * 
 * INJECT: Wait For Injected Animation
 * - Waits for injected animations to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqImpact!
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Critical Color Break Settings
 * ============================================================================
 *
 * When critical hits occur, you can cause a Color Break effect to occur.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Color Break effect whenever a critical hit occurs?
 * 
 *   Intensity:
 *   - How intense do you want the Color Break effect to be?
 * 
 *   Duration:
 *   - What is the duration of the Color Break effect?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Dodge Motion Blur Settings
 * ============================================================================
 *
 * When a battler dodges an attack, you can create a motion blur effect.
 *
 * ---
 *
 * Settings
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Motion Blur effect whenever a battler evades an
 *     attack?
 * 
 *   Intensity Rate:
 *   - This determines intensity rate of the motion blur.
 *   - Use a number between 0 and 1.
 * 
 *   Duration:
 *   - How many frames should the motion blur last?
 *   - What do you want to be its duration?
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Guard Shockwave Settings
 * ============================================================================
 *
 * When a guarding battler receives damage, you can create a shockwave effect.
 *
 * ---
 *
 * Category
 * 
 *   Enable/Disable?:
 *   - Enables/disables the Shockwave effect whenever a battler is attacked
 *     while guarding?
 * 
 *   Amplitude:
 *   - What is the aplitude of the shockwave effect?
 * 
 *   Wavelength:
 *   - What is the wavelength of the shockwave effect?
 * 
 *   Duration:
 *   - What is the duration of the shockwave?
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
 * Manu Gaming Creations
 * * URL: https://manugamingcreations.itch.io
 * * Responsible for the following Impact Effects and adapted by VisuStella:
 * ** Desaturation
 * ** Negative Impact
 * ** Time Scale
 * ** Time Stop
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.10: May 18, 2026
 * * Compatibility Update!
 * ** Added better compatibility with Action Sequence Impact. Previously,
 *    Dragonbones would block certain effects. Update made by Arisu.
 * 
 * Version 1.09: September 14, 2023
 * * Compatibility Update!
 * ** Updated this plugin to work with Dragonbones Union's newest feature
 *    update to stop Dragonbones armatures from having their blend modes
 *    suppressed by PixiJS.
 * 
 * Version 1.08: June 15, 2023
 * * Bug Fixes!
 * ** Inject animations should now work properly for animated enemies.
 * 
 * Version 1.07: September 8, 2022
 * * Bug Fixes!
 * ** Fixed a problem with motion trails not working for Dragonbones animations
 *    that have looping properties. Fix made by Irina.
 * 
 * Version 1.06: May 26, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Action Sequence Effects added by Irina and sponsored by MirageV:
 * *** INJECT: Animation Begin
 * **** Injects and plays a whole spritesheet animation.
 * **** The spritesheet animation will play over the battler until it
 *      is finished.
 * **** The battler's original sprite will be invisible until finished.
 * *** INJECT: Animation End
 * **** Stops and ends any injected animations on target(s).
 * **** Any inject animation will be prematurely terminated.
 * *** INJECT: Animation Pause/Resume
 * **** Pauses/resumes any injected animations on target(s).
 * *** INJECT: Wait For Injected Animation
 * **** Waits for injected animations to complete before performing
 *      next command.
 * 
 * Version 1.05: April 14, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Impact Effects added by Irina and collaborating with Manu Gaming!
 * *** Impact: Bizarro Inversion
 * *** Impact: Desaturation
 * *** Impact: Negative Inversion
 * *** Impact: Oversaturation
 * *** Impact: Time Scale
 * *** Impact: Time Stop
 * 
 * Version 1.04: October 28, 2021
 * * Bug Fixes!
 * ** Guard shockwave now originates from the proper location with front view
 *    sprites enabled under specific battle layouts. Fix made by Irina.
 * 
 * Version 1.03: December 11, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Action Sequence Impact Action Sequences "Shockwave from Each Target(s)",
 *    "Shockwave from Target(s) Center", and "Zoom Blur at Target(s) Center"
 *    now have "Offset X" and "Offset Y" plugin parameters. Added by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: December 4, 2020
 * * Bug Fixes!
 * ** Enemies with a SV Battler attached to them will no longer desynch after
 *    using a motion trail effect. Fix made by Irina.
 * 
 * Version 1.01: November 29, 2020
 * * Bug Fixes!
 * ** Motion Trails for Dragonbones armatures are now properly adjusted for
 *    their scale and offset. Fix made by Arisu.
 *
 * Version 1.00: December 2, 2020
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
 * @param ActSeqImpact
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CriticalColorBreak:struct
 * @text Critical Color Break
 * @type struct<CriticalColorBreak>
 * @desc When critical hits occur, you can cause a Color Break effect to occur.
 * @default {"Enable:eval":"true","Intensity:num":"30","Duration:num":"30","EasingType:str":"OutBack"}
 *
 * @param DodgeMotionBlur:struct
 * @text Dodge Motion Blur
 * @type struct<DodgeMotionBlur>
 * @desc When a battler dodges an attack, you can create a motion blur effect.
 * @default {"Enable:eval":"true","Rate:eval":"0.5","Duration:num":"30","EasingType:str":"InOutSine"}
 *
 * @param GuardShockWave:struct
 * @text Guard Shockwave
 * @type struct<GuardShockWave>
 * @desc When a guarding battler receives damage, you can create a shockwave effect.
 * @default {"Enable:eval":"true","Amp:num":"30","Wave:num":"160","Duration:num":"30"}
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
 * Critical Color Break Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CriticalColorBreak:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Color Break effect whenever a
 * critical hit occurs?
 * @default true
 *
 * @param Intensity:num
 * @text Intensity
 * @type number
 * @min 1
 * @desc How intense do you want the Color Break effect to be?
 * @default 30
 *
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of the Color Break effect?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default OutBack
 *
 */
/* ----------------------------------------------------------------------------
 * Dodge Motion Blur Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~DodgeMotionBlur:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Motion Blur effect whenever a
 * battler evades an attack?
 * @default true
 *
 * @param Rate:eval
 * @text Intensity Rate
 * @desc This determines intensity rate of the motion blur.
 * Use a number between 0 and 1.
 * @default 0.5
 *
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc How many frames should the motion blur last?
 * What do you want to be its duration?
 * @default 30
 *
 * @param EasingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default InOutSine
 *
 */
/* ----------------------------------------------------------------------------
 * Guard Shock Wave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GuardShockWave:
 *
 * @param Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables the Shockwave effect whenever a
 * battler is attacked while guarding?
 * @default true
 * 
 * @param Amp:num
 * @text Amplitude
 * @type number
 * @min 1
 * @desc What is the aplitude of the shockwave effect?
 * @default 30
 * 
 * @param Wave:num
 * @text Wavelength
 * @type number
 * @min 1
 * @desc What is the wavelength of the shockwave effect?
 * @default 160
 * 
 * @param Duration:num
 * @text Duration
 * @type number
 * @min 1
 * @desc What is the duration of the shockwave?
 * @default 30
 *
 */
//=============================================================================

const _0x65fa05=_0x1b63;function _0x5aab(){const _0x3c75f9=['createDesaturateImpactFilter','name','Amp','return\x200','isSideView','initMembers','updateBattlerContainer','ShockwaveFilter','_targetIndex','createNegativeImpactFilter','setupDesaturateImpactFilter','Sprite_Damage_setupCriticalEffect','_spriteset','_distortionSprite','angle','Game_Battler_performMiss','blue','120176VhQxkq','304482MZNemi','VisuMZ_1_BattleCore','setupShockwaveImpactFilter','_rgbSplitImpactEasing','setPause','createDistortionSprite','_baseY','_baseX','FUNC','trim','_zoomBlurImpactWholeDuration','scaleY','disposeSprite','createBlueRedInvertImpactFilter','setFrame','_cellWidth','_offsetX','Settings','_desaturateImpactFilter','_motionBlurImpactFilter','_baseSprite','description','Sprite_Actor_updateShadowDragonbonesUnion','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_motionTrailContainer','_windowLayer','7492315jvDdSG','radius','SceneManager_determineRepeatNumber','1168567DFhqlV','frameDelay','isInjectAniPrepping','Sprite_Battler_update','_shockwaveImpactFilters','battlerMotionTrailData','push','MotionBlurFilter','_sourceSprite','ZoomBlurFilter','setupRgbSplitImpactFilter','_prep','stopInjectAnimation','Game_Battler_performEvasion','NUM','startAnimation','_pause','removeChild','frameCount','ColorMatrixFilter','match','updateShockwaveImpactFilters','RGBSplitFilter','ARRAYEVAL','waveLength','horzCells','_waitCount','updateShadowDragonbonesUnion','updateSpriteOffset','initialize','13794230MTHyqO','Spriteset_Battle_updateBattlerContainer','update','lastAnimationName','hasMotionTrailSprite','_mainSprite','_svBattlerSprite','setHue','stop','_projectilesContainer','nextOpacity','createZoomBlurImpactFilter','filters','determineRepeatNumber','_dragonbones','mainSpriteWidth','EVAL','_frameDelay','opacity','setupMotionBlurImpactFilter','filename','matchSpriteProperties','_negativeImpactFilter','innerRadius','toBGR','createBaseFilters','_battleImpactTimeScale','updateMotionBlurImpactDragonbonesCompatibility','Spriteset_Battle_adjustFlippedBattlefield','Game_Battler_onDamage','isInputting','height','updateMotionTrail','anchor','_rgbSplitImpactFilter','battlerSprites','currentTime','updateDelay','performMiss','_zoomBlurImpactFilter','_battlerMotionTrailData','_motionBlurImpactDuration','green','negative','exit','parse','setupCriticalEffect','freezeTime','floor','children','setBattlerMotionTrailData','_oversaturateImpactFilter','onDamageActSeqImpact','_offsetY','smooth','Linear','_sourceData','_battler','_scene','createInjectAnimationSprite','_frame','offsetX','_rgbSplitImpactWholeDuration','performEvasion','lsd','createActSeqImpactFilters','lastAnimationState','Enable','STR','updateDuration','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createArmature','VisuMZ_2_DragonbonesUnion','timeSpeed','_motionBlurImpactEasing','_zoomBlurImpactEasing','vertCells','constructor','skew','isAnyoneInjectAnimating','ARRAYNUM','onDamage','call','Sprite_Battler_createDistortionSprite','scaleX','status','createChildren','isInjectAnimationStarted','length','parent','_dragonbonesSpriteContainer','addLoadListener','updateMotionBlurImpactFilter','setupCriticalEffectActSeqImpact','ARRAYJSON','setupOversaturateImpactFilter','updateRgbSplitImpactFilter','6HTjmSg','STRUCT','isAlive','strength','stopGameLoop','Sprite_Battler_initMembers','toUpperCase','velocity','scale','hue','createDefaultBattlerMotionTrailData','filter','adjustFlippedBattlefield','_blueRedInvertImpactFilter','animation','createOversaturateImpactFilter','_isCreatingMotionTrailSprite','prototype','ApplyEasing','createBattleFieldContainer','_motionBlurImpactWholeDuration','sortMotionTrailBattlers','red','sin','setupMotionTrailProperties','duration','startInjectAnimation','DodgeMotionBlur','timeScale','updateMainSpriteVisibility','amplitude','map','addChild','7195116mOZQqS','isBusy','_frameIndex','_statusWindow','_zoomBlurImpactDuration','Duration','Spriteset_Base_createBaseFilters','updateNextOpacities','remove','OutBack','battler','create','updateBaseFilters','Spriteset_Base_updateBaseFilters','isGuard','24SrWIuR','tone','createMotionBlurImpactFilter','createRgbSplitImpactFilter','ActSeqImpact','delay','1088433YZtAom','updateZoomBlurImpactFilter','visible','bitmap','_rgbSplitImpactDuration','putMotionTrailBattlersOnTop','isSceneBattle','_cellHeight','JSON','desaturate','_frameCount','_appliedMotionBlurDragonbones','ConvertParams','clearBattlerMotionTrailData','enabled','dragonbonesData','_vertCells','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','updateActSeqImpactBaseFilters','applyEasing','pauseInjectAnimation','createActSeqImpactBaseFilters','Spriteset_Battle_createBattleFieldContainer','_battlerContainer','performDodgeActSeqImpact','_injectAnimationSprite','max','EasingType','CriticalColorBreak','ARRAYSTR','randomInt','VisuMZ_0_CoreEngine','_horzCells','width','ARRAYSTRUCT','getBattleImpactTimeScale','setColorTone','center','some','_duration','parameters','offsetY','120CWvNsq','format'];_0x5aab=function(){return _0x3c75f9;};return _0x5aab();}(function(_0x4301fe,_0x387799){const _0xee483e=_0x1b63,_0x433656=_0x4301fe();while(!![]){try{const _0x2bf3fa=parseInt(_0xee483e(0x185))/0x1+parseInt(_0xee483e(0x168))/0x2*(-parseInt(_0xee483e(0xf4))/0x3)+-parseInt(_0xee483e(0x115))/0x4+parseInt(_0xee483e(0x182))/0x5+parseInt(_0xee483e(0x124))/0x6*(-parseInt(_0xee483e(0x167))/0x7)+-parseInt(_0xee483e(0x154))/0x8*(-parseInt(_0xee483e(0x12a))/0x9)+-parseInt(_0xee483e(0x1a3))/0xa;if(_0x2bf3fa===_0x387799)break;else _0x433656['push'](_0x433656['shift']());}catch(_0x448452){_0x433656['push'](_0x433656['shift']());}}}(_0x5aab,0xe2fc1));var label=_0x65fa05(0x128),tier=tier||0x0,dependencies=[_0x65fa05(0x149),_0x65fa05(0x169)],pluginData=$plugins[_0x65fa05(0xff)](function(_0x3e6946){const _0x54c782=_0x65fa05;return _0x3e6946[_0x54c782(0xe8)]&&_0x3e6946[_0x54c782(0x17d)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x65fa05(0x179)]||{},VisuMZ[_0x65fa05(0x136)]=function(_0x51dcde,_0x3f087e){const _0x4cd2b1=_0x65fa05;for(const _0x37d681 in _0x3f087e){if(_0x37d681[_0x4cd2b1(0x199)](/(.*):(.*)/i)){const _0x475356=String(RegExp['$1']),_0x22e41e=String(RegExp['$2'])[_0x4cd2b1(0xfa)]()[_0x4cd2b1(0x171)]();let _0x5e804c,_0x49ff90,_0x6975ae;switch(_0x22e41e){case _0x4cd2b1(0x193):_0x5e804c=_0x3f087e[_0x37d681]!==''?Number(_0x3f087e[_0x37d681]):0x0;break;case _0x4cd2b1(0x1f3):_0x49ff90=_0x3f087e[_0x37d681]!==''?JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681]):[],_0x5e804c=_0x49ff90[_0x4cd2b1(0x113)](_0x3a2b29=>Number(_0x3a2b29));break;case _0x4cd2b1(0x1b3):_0x5e804c=_0x3f087e[_0x37d681]!==''?eval(_0x3f087e[_0x37d681]):null;break;case _0x4cd2b1(0x19c):_0x49ff90=_0x3f087e[_0x37d681]!==''?JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681]):[],_0x5e804c=_0x49ff90[_0x4cd2b1(0x113)](_0x21a1ed=>eval(_0x21a1ed));break;case _0x4cd2b1(0x132):_0x5e804c=_0x3f087e[_0x37d681]!==''?JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681]):'';break;case _0x4cd2b1(0xf1):_0x49ff90=_0x3f087e[_0x37d681]!==''?JSON['parse'](_0x3f087e[_0x37d681]):[],_0x5e804c=_0x49ff90[_0x4cd2b1(0x113)](_0x55393f=>JSON[_0x4cd2b1(0x1d0)](_0x55393f));break;case _0x4cd2b1(0x170):_0x5e804c=_0x3f087e[_0x37d681]!==''?new Function(JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681])):new Function(_0x4cd2b1(0x159));break;case'ARRAYFUNC':_0x49ff90=_0x3f087e[_0x37d681]!==''?JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681]):[],_0x5e804c=_0x49ff90[_0x4cd2b1(0x113)](_0x2d0d02=>new Function(JSON[_0x4cd2b1(0x1d0)](_0x2d0d02)));break;case _0x4cd2b1(0x1e7):_0x5e804c=_0x3f087e[_0x37d681]!==''?String(_0x3f087e[_0x37d681]):'';break;case _0x4cd2b1(0x147):_0x49ff90=_0x3f087e[_0x37d681]!==''?JSON['parse'](_0x3f087e[_0x37d681]):[],_0x5e804c=_0x49ff90[_0x4cd2b1(0x113)](_0x4de935=>String(_0x4de935));break;case _0x4cd2b1(0xf5):_0x6975ae=_0x3f087e[_0x37d681]!==''?JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681]):{},_0x5e804c=VisuMZ[_0x4cd2b1(0x136)]({},_0x6975ae);break;case _0x4cd2b1(0x14c):_0x49ff90=_0x3f087e[_0x37d681]!==''?JSON[_0x4cd2b1(0x1d0)](_0x3f087e[_0x37d681]):[],_0x5e804c=_0x49ff90['map'](_0x3b5719=>VisuMZ[_0x4cd2b1(0x136)]({},JSON[_0x4cd2b1(0x1d0)](_0x3b5719)));break;default:continue;}_0x51dcde[_0x475356]=_0x5e804c;}}return _0x51dcde;},(_0x3e58f7=>{const _0x29eba9=_0x65fa05,_0x1fa65f=_0x3e58f7[_0x29eba9(0x157)];for(const _0x4c8e1a of dependencies){if(!Imported[_0x4c8e1a]){alert(_0x29eba9(0x17f)['format'](_0x1fa65f,_0x4c8e1a)),SceneManager[_0x29eba9(0x1cf)]();break;}}const _0x24981b=_0x3e58f7[_0x29eba9(0x17d)];if(_0x24981b[_0x29eba9(0x199)](/\[Version[ ](.*?)\]/i)){const _0x2a11ab=Number(RegExp['$1']);_0x2a11ab!==VisuMZ[label]['version']&&(alert(_0x29eba9(0x1e9)['format'](_0x1fa65f,_0x2a11ab)),SceneManager[_0x29eba9(0x1cf)]());}if(_0x24981b[_0x29eba9(0x199)](/\[Tier[ ](\d+)\]/i)){const _0x217320=Number(RegExp['$1']);_0x217320<tier?(alert(_0x29eba9(0x13b)[_0x29eba9(0x155)](_0x1fa65f,_0x217320,tier)),SceneManager[_0x29eba9(0x1cf)]()):tier=Math[_0x29eba9(0x144)](_0x217320,tier);}VisuMZ[_0x29eba9(0x136)](VisuMZ[label][_0x29eba9(0x179)],_0x3e58f7[_0x29eba9(0x152)]);})(pluginData),VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x184)]=SceneManager['determineRepeatNumber'],SceneManager[_0x65fa05(0x1b0)]=function(_0x48cc95){const _0x11195f=_0x65fa05;let _0xac2232=0x1;return SceneManager[_0x11195f(0x130)]()&&(_0xac2232=$gameTemp['getBattleImpactTimeScale'](),_0xac2232=Math[_0x11195f(0x144)](0.01,_0xac2232)),VisuMZ[_0x11195f(0x128)][_0x11195f(0x184)]['call'](this,_0x48cc95*_0xac2232);},Game_Temp['prototype'][_0x65fa05(0x14d)]=function(){const _0x5162a8=_0x65fa05;if(!SceneManager[_0x5162a8(0x130)]())return 0x1;if(BattleManager[_0x5162a8(0x1c1)]())return 0x1;if($gameMessage[_0x5162a8(0x116)]())return 0x1;return this['_battleImpactTimeScale']=this[_0x5162a8(0x1bd)]??0x1,this[_0x5162a8(0x1bd)]<=0x0&&(this[_0x5162a8(0x1bd)]=0.01),this[_0x5162a8(0x1bd)];},Game_Temp[_0x65fa05(0x105)]['setBattleImpactTimeScale']=function(_0x3cc4e5,_0x38798c){const _0x844de8=_0x65fa05;_0x38798c&&(_0x38798c[_0x844de8(0x19f)]=_0x38798c[_0x844de8(0x19f)]||0x0,_0x38798c[_0x844de8(0x19f)]=Math[_0x844de8(0x144)](_0x38798c['_waitCount'],0x1)),this[_0x844de8(0x1bd)]=Math['max'](0.01,_0x3cc4e5);},Game_BattlerBase[_0x65fa05(0x105)][_0x65fa05(0x18a)]=function(){const _0xaf31cb=_0x65fa05;if(this[_0xaf31cb(0x1cb)])return this['_battlerMotionTrailData'];return this[_0xaf31cb(0x1cb)]=this[_0xaf31cb(0xfe)](),this[_0xaf31cb(0x1cb)];},Game_BattlerBase[_0x65fa05(0x105)][_0x65fa05(0x137)]=function(){const _0x188f9d=_0x65fa05;this[_0x188f9d(0x1cb)]=this[_0x188f9d(0xfe)]();},Game_BattlerBase[_0x65fa05(0x105)][_0x65fa05(0x1d5)]=function(_0x1d56e9){const _0x1285ca=_0x65fa05;this[_0x1285ca(0x1cb)]=_0x1d56e9;},Game_BattlerBase[_0x65fa05(0x105)][_0x65fa05(0xfe)]=function(){return{'delay':0x1,'duration':0x1e,'hue':0x0,'opacityStart':0xc8,'tone':[0x0,0x0,0x0,0x0],'visible':![]};},VisuMZ[_0x65fa05(0x128)]['Game_Battler_onDamage']=Game_Battler[_0x65fa05(0x105)][_0x65fa05(0x1f4)],Game_Battler['prototype'][_0x65fa05(0x1f4)]=function(_0x12af84){const _0x2a2e88=_0x65fa05;VisuMZ[_0x2a2e88(0x128)][_0x2a2e88(0x1c0)][_0x2a2e88(0x1f5)](this,_0x12af84),this[_0x2a2e88(0x1d7)](_0x12af84);},Game_Battler[_0x65fa05(0x105)][_0x65fa05(0x1d7)]=function(_0x174c8b){const _0x4ede9c=_0x65fa05;if(_0x174c8b<0x0)return;if(!this[_0x4ede9c(0x123)]())return;const _0x37e445=VisuMZ[_0x4ede9c(0x128)][_0x4ede9c(0x179)]['GuardShockWave'];if(!_0x37e445)return;if(!_0x37e445[_0x4ede9c(0x1e6)])return;if(!SceneManager[_0x4ede9c(0x130)]())return;const _0x246fee=SceneManager[_0x4ede9c(0x1dd)][_0x4ede9c(0x162)];if(!_0x246fee)return;if(!this[_0x4ede9c(0x11f)]())return;let _0x18a64e=this['battler']()[_0x4ede9c(0x16f)],_0x565ac7=this[_0x4ede9c(0x11f)]()[_0x4ede9c(0x16e)]-this['battler']()['mainSpriteHeight']()/0x2;const _0x2c8a2f=_0x37e445[_0x4ede9c(0x158)]||0x1,_0x2bbd3b=_0x37e445['Wave']||0x1,_0x116173=_0x37e445[_0x4ede9c(0x11a)]||0x1;if(this['isActor']()&&!$gameSystem[_0x4ede9c(0x15a)]()){const _0x2d5278=SceneManager[_0x4ede9c(0x1dd)];_0x18a64e+=_0x2d5278[_0x4ede9c(0x181)]['x'],_0x18a64e+=_0x2d5278['_statusWindow']['x'],_0x565ac7+=_0x2d5278['_windowLayer']['y'],_0x565ac7+=_0x2d5278[_0x4ede9c(0x118)]['y'];}_0x246fee['setupShockwaveImpactFilter'](_0x18a64e,_0x565ac7,_0x2c8a2f,_0x2bbd3b,_0x116173);},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x165)]=Game_Battler[_0x65fa05(0x105)][_0x65fa05(0x1c9)],Game_Battler['prototype'][_0x65fa05(0x1c9)]=function(){const _0x11be4=_0x65fa05;VisuMZ[_0x11be4(0x128)][_0x11be4(0x165)][_0x11be4(0x1f5)](this),this[_0x11be4(0x142)]();},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x192)]=Game_Battler['prototype'][_0x65fa05(0x1e2)],Game_Battler['prototype'][_0x65fa05(0x1e2)]=function(){const _0x435b79=_0x65fa05;VisuMZ[_0x435b79(0x128)][_0x435b79(0x192)][_0x435b79(0x1f5)](this),this['performDodgeActSeqImpact']();},Game_Battler[_0x65fa05(0x105)][_0x65fa05(0x142)]=function(){const _0x4829ac=_0x65fa05,_0xa7fea5=VisuMZ[_0x4829ac(0x128)][_0x4829ac(0x179)][_0x4829ac(0x10f)];if(!_0xa7fea5)return;if(!_0xa7fea5['Enable'])return;if(!SceneManager[_0x4829ac(0x130)]())return;const _0x34b64f=SceneManager[_0x4829ac(0x1dd)]['_spriteset'];if(!_0x34b64f)return;if(!this[_0x4829ac(0x11f)]())return;if(this[_0x4829ac(0x11f)]()[_0x4829ac(0x1cc)]>0x0)return;const _0x5a0778=Math[_0x4829ac(0x148)](0x168),_0x54bda2=_0xa7fea5['Rate']||0.1,_0x5d4219=_0xa7fea5[_0x4829ac(0x11a)],_0xf4c96d=_0xa7fea5[_0x4829ac(0x145)]||_0x4829ac(0x1da);this[_0x4829ac(0x11f)]()[_0x4829ac(0x1b6)](_0x5a0778,_0x54bda2,_0x5d4219,_0xf4c96d);},VisuMZ['ActSeqImpact']['Sprite_Battler_createDistortionSprite']=Sprite_Battler['prototype'][_0x65fa05(0x16d)],Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x16d)]=function(){const _0xf10f87=_0x65fa05;VisuMZ[_0xf10f87(0x128)][_0xf10f87(0xe6)]['call'](this),this[_0xf10f87(0x1e4)]();},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x1e4)]=function(){const _0x151964=_0x65fa05;if(!this[_0x151964(0x163)])return;this[_0x151964(0x163)]['filters']=this[_0x151964(0x163)][_0x151964(0x1af)]||[],this[_0x151964(0x126)]();},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x188)]=Sprite_Battler[_0x65fa05(0x105)]['update'],Sprite_Battler['prototype'][_0x65fa05(0x1a5)]=function(){const _0x3788e5=_0x65fa05;VisuMZ[_0x3788e5(0x128)][_0x3788e5(0x188)][_0x3788e5(0x1f5)](this),this[_0x3788e5(0x1c3)](),this[_0x3788e5(0xef)]();},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x1c3)]=function(){const _0x4b4247=_0x65fa05;if(this['constructor']===Sprite_SvEnemy)return;if(!this[_0x4b4247(0x1dc)])return;if(!this['_battler'][_0x4b4247(0xf6)]())return;if(!this['_battler']['isAppeared']())return;if(!this[_0x4b4247(0xec)])return;if(!this[_0x4b4247(0x163)])return;if(this[_0x4b4247(0x104)]){this['_isCreatingMotionTrailSprite']=![];return;}if(Imported[_0x4b4247(0x1eb)]&&this[_0x4b4247(0x1b1)]){}const _0x1cdda7=this[_0x4b4247(0x1dc)][_0x4b4247(0x18a)]();if(!_0x1cdda7[_0x4b4247(0x12c)])return;const _0x2ea927=Math[_0x4b4247(0x144)](0x1,_0x1cdda7[_0x4b4247(0x129)]);if(Graphics[_0x4b4247(0x197)]%_0x2ea927!==0x0)return;const _0x2d288e=SceneManager[_0x4b4247(0x1dd)][_0x4b4247(0x162)][_0x4b4247(0x180)];if(!_0x2d288e)return;this[_0x4b4247(0x104)]=!![];const _0x4fa310=new Sprite_BattlerMotionTrail(this,_0x1cdda7);_0x2d288e[_0x4b4247(0x114)](_0x4fa310);},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x126)]=function(){const _0x33bb2e=_0x65fa05;if(!PIXI[_0x33bb2e(0x1af)]['MotionBlurFilter'])return;this[_0x33bb2e(0x1cc)]=0x0,this['_motionBlurImpactWholeDuration']=0x0,this[_0x33bb2e(0x1ed)]='Linear',this['_motionBlurImpactFilter']=new PIXI['filters'][(_0x33bb2e(0x18c))](),this[_0x33bb2e(0x17b)]['velocity']['x']=0x0,this[_0x33bb2e(0x17b)][_0x33bb2e(0xfb)]['y']=0x0,Imported[_0x33bb2e(0x1eb)]?this['updateMotionBlurImpactDragonbonesCompatibility']():this['_distortionSprite'][_0x33bb2e(0x1af)]['push'](this[_0x33bb2e(0x17b)]);},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x1b6)]=function(_0x54f165,_0x387826,_0xd385ef,_0x332f86){const _0x160d5a=_0x65fa05;if(!this['_motionBlurImpactFilter'])return;const _0x2377d9=this[_0x160d5a(0x17b)];this[_0x160d5a(0x1cc)]=_0xd385ef,this[_0x160d5a(0x108)]=_0xd385ef,this[_0x160d5a(0x1ed)]=_0x332f86;const _0x24ac06=this[_0x160d5a(0x1b2)]()*_0x387826,_0x440f5b=_0x24ac06*Math['cos'](_0x54f165*Math['PI']/0xb4),_0x16288a=-_0x24ac06*Math[_0x160d5a(0x10b)](_0x54f165*Math['PI']/0xb4);_0x2377d9[_0x160d5a(0xfb)]['x']=_0x440f5b,_0x2377d9[_0x160d5a(0xfb)]['y']=_0x16288a;},Sprite_Battler['prototype'][_0x65fa05(0xef)]=function(){const _0x48faba=_0x65fa05;if(!this[_0x48faba(0x17b)])return;if(this[_0x48faba(0x1cc)]<=0x0)return;const _0x7c6f41=this['_motionBlurImpactFilter'],_0x65e29=this[_0x48faba(0x1cc)]||0x0,_0x3aa3f1=this['_motionBlurImpactWholeDuration']||_0x65e29,_0x317df9=0x0,_0x2bc9f8=this['_motionBlurImpactEasing'];_0x7c6f41[_0x48faba(0xfb)]['x']=VisuMZ['ActSeqImpact'][_0x48faba(0x13d)](_0x7c6f41[_0x48faba(0xfb)]['x'],_0x317df9,_0x65e29,_0x3aa3f1,_0x2bc9f8),_0x7c6f41[_0x48faba(0xfb)]['y']=VisuMZ[_0x48faba(0x128)][_0x48faba(0x13d)](_0x7c6f41[_0x48faba(0xfb)]['y'],_0x317df9,_0x65e29,_0x3aa3f1,_0x2bc9f8),this[_0x48faba(0x1cc)]--,this[_0x48faba(0x1cc)]<=0x0&&(_0x7c6f41[_0x48faba(0xfb)]['x']=0x0,_0x7c6f41[_0x48faba(0xfb)]['y']=0x0),Imported['VisuMZ_2_DragonbonesUnion']&&this[_0x48faba(0x1be)]();},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x1be)]=function(){const _0x3f4c9f=_0x65fa05;if(this[_0x3f4c9f(0x1b1)]){if(!this[_0x3f4c9f(0x135)]){this['_appliedMotionBlurDragonbones']=!![],this['_distortionSprite'][_0x3f4c9f(0x1af)]['remove'](this[_0x3f4c9f(0x17b)]);for(const _0x4a79d2 of this[_0x3f4c9f(0x1b1)]['children']){if(!_0x4a79d2)continue;if(_0x4a79d2['blendMode']!==0x0)continue;_0x4a79d2[_0x3f4c9f(0x1af)]=_0x4a79d2['filters']||[],_0x4a79d2[_0x3f4c9f(0x1af)]['push'](this['_motionBlurImpactFilter']);}}}else this[_0x3f4c9f(0x135)]?(this[_0x3f4c9f(0x135)]=![],this['_distortionSprite'][_0x3f4c9f(0x1af)][_0x3f4c9f(0x18b)](this[_0x3f4c9f(0x17b)])):!this[_0x3f4c9f(0x163)][_0x3f4c9f(0x1af)]['includes'](this['_motionBlurImpactFilter'])&&this[_0x3f4c9f(0x163)][_0x3f4c9f(0x1af)][_0x3f4c9f(0x18b)](this[_0x3f4c9f(0x17b)]);},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0xf9)]=Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x15b)],Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x15b)]=function(){const _0x4f55a2=_0x65fa05;VisuMZ[_0x4f55a2(0x128)][_0x4f55a2(0xf9)][_0x4f55a2(0x1f5)](this),this[_0x4f55a2(0x1de)]();},Sprite_Battler[_0x65fa05(0x105)]['createInjectAnimationSprite']=function(){const _0x2dc486=_0x65fa05;this[_0x2dc486(0x143)]=new Sprite_InjectAnimation();},Sprite_Battler[_0x65fa05(0x105)]['isInjectAnimating']=function(){const _0x5327b4=_0x65fa05;if(!this[_0x5327b4(0x143)])return![];if(this[_0x5327b4(0x143)][_0x5327b4(0x190)])return!![];return this[_0x5327b4(0xea)]();},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x187)]=function(){const _0x3381b5=_0x65fa05;if(!this['_injectAnimationSprite'])return![];return this[_0x3381b5(0x143)]['_prep'];},Sprite_Battler['prototype']['isInjectAnimationStarted']=function(){const _0x2b9463=_0x65fa05;if(!this[_0x2b9463(0x143)])return![];return this[_0x2b9463(0x143)][_0x2b9463(0x1b5)]>0x0;},Spriteset_Battle['prototype'][_0x65fa05(0x1f2)]=function(){const _0x549187=_0x65fa05;return this[_0x549187(0x1c6)]()[_0x549187(0x150)](_0x24cfa3=>_0x24cfa3['isInjectAnimating']());},Spriteset_Battle['prototype']['isAnyoneInjectAniPrepping']=function(){const _0x46ddf7=_0x65fa05;return this[_0x46ddf7(0x1c6)]()[_0x46ddf7(0x150)](_0x2ea82f=>_0x2ea82f[_0x46ddf7(0x187)]());},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x10e)]=function(_0x22b7be){const _0x2bf8a3=_0x65fa05;if(!this['_injectAnimationSprite'])return;this[_0x2bf8a3(0x143)]['setup'](_0x22b7be);},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x191)]=function(_0x54d89b){const _0x592a4f=_0x65fa05;if(!this[_0x592a4f(0x143)])return;this[_0x592a4f(0x143)]['stop']();},Sprite_Battler[_0x65fa05(0x105)][_0x65fa05(0x13e)]=function(_0x3b74ec){const _0x52af2d=_0x65fa05;if(!this[_0x52af2d(0x143)])return;this[_0x52af2d(0x143)]['setPause'](_0x3b74ec);};Imported['VisuMZ_2_DragonbonesUnion']&&(VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x17e)]=Sprite_Actor[_0x65fa05(0x105)][_0x65fa05(0x1a0)],Sprite_Actor[_0x65fa05(0x105)][_0x65fa05(0x1a0)]=function(){const _0x280fa1=_0x65fa05;this[_0x280fa1(0xed)]&&(this[_0x280fa1(0xed)][_0x280fa1(0x1b5)]=0xff),VisuMZ['ActSeqImpact']['Sprite_Actor_updateShadowDragonbonesUnion'][_0x280fa1(0x1f5)](this),this[_0x280fa1(0xea)]&&this[_0x280fa1(0xea)]()&&(this[_0x280fa1(0x1a8)][_0x280fa1(0x12c)]=![],this['_weaponSprite'][_0x280fa1(0x12c)]=![],this['_stateSprite']['visible']=![],this[_0x280fa1(0xed)]&&(this[_0x280fa1(0xed)][_0x280fa1(0x1b5)]=0x0));});;VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x161)]=Sprite_Damage[_0x65fa05(0x105)][_0x65fa05(0x1d1)],Sprite_Damage[_0x65fa05(0x105)][_0x65fa05(0x1d1)]=function(){const _0x1dd76b=_0x65fa05;VisuMZ['ActSeqImpact']['Sprite_Damage_setupCriticalEffect'][_0x1dd76b(0x1f5)](this),this[_0x1dd76b(0xf0)]();},Sprite_Damage[_0x65fa05(0x105)][_0x65fa05(0xf0)]=function(){const _0xb0cd5f=_0x65fa05,_0x30a1fb=VisuMZ[_0xb0cd5f(0x128)][_0xb0cd5f(0x179)][_0xb0cd5f(0x146)];if(!_0x30a1fb)return;if(!_0x30a1fb['Enable'])return;const _0x13f2fd=SceneManager[_0xb0cd5f(0x1dd)][_0xb0cd5f(0x162)];if(!_0x13f2fd)return;if(_0x13f2fd[_0xb0cd5f(0x12e)]>0x0)return;const _0xdc95ae=_0x30a1fb['Intensity']||0x1,_0x43a717=_0x30a1fb['Duration']||0x1,_0x22272d=_0x30a1fb['EasingType']||_0xb0cd5f(0x11e);_0x13f2fd[_0xb0cd5f(0x18f)](_0xdc95ae,_0x43a717,_0x22272d);};function Sprite_BattlerMotionTrail(){const _0x1bde85=_0x65fa05;this[_0x1bde85(0x1a2)](...arguments);}Sprite_BattlerMotionTrail['prototype']=Object['create'](Sprite[_0x65fa05(0x105)]),Sprite_BattlerMotionTrail['prototype'][_0x65fa05(0x1f0)]=Sprite_BattlerMotionTrail,Sprite_BattlerMotionTrail['prototype'][_0x65fa05(0x1a2)]=function(_0x6a12d4,_0x4c9ebd){const _0x4605f0=_0x65fa05;this['_sourceSprite']=_0x6a12d4,this['_sourceData']=_0x4c9ebd,Sprite[_0x4605f0(0x105)][_0x4605f0(0x1a2)][_0x4605f0(0x1f5)](this),this[_0x4605f0(0xe9)](),this['setupMotionTrailProperties']();},Sprite_BattlerMotionTrail[_0x65fa05(0x105)][_0x65fa05(0xe9)]=function(){const _0x29f730=_0x65fa05,_0x333688=this[_0x29f730(0x18d)][_0x29f730(0x163)];this[_0x29f730(0x163)]=new Sprite(),this[_0x29f730(0x114)](this['_distortionSprite']),this[_0x29f730(0x1b8)](this[_0x29f730(0x163)],_0x333688,!![]);},Sprite_BattlerMotionTrail['prototype'][_0x65fa05(0x1b8)]=function(_0x157299,_0x496a37,_0x594563){const _0x28a806=_0x65fa05;_0x157299['bitmap']=_0x496a37[_0x28a806(0x12d)];const _0x4781be=_0x496a37[_0x28a806(0x1df)];_0x4781be&&_0x157299[_0x28a806(0x176)](_0x4781be['x'],_0x4781be['y'],_0x4781be[_0x28a806(0x14b)],_0x4781be['height']);_0x157299['visible']=_0x496a37[_0x28a806(0x12c)],_0x157299[_0x28a806(0x1c4)]['x']=_0x496a37[_0x28a806(0x1c4)]['x'],_0x157299[_0x28a806(0x1c4)]['y']=_0x496a37['anchor']['y'],_0x157299[_0x28a806(0xfc)]['x']=_0x496a37[_0x28a806(0xfc)]['x'],_0x157299[_0x28a806(0xfc)]['y']=_0x496a37[_0x28a806(0xfc)]['y'],_0x157299[_0x28a806(0x164)]=_0x496a37['angle'],_0x157299[_0x28a806(0x1f1)]['x']=_0x496a37['skew']['x'],_0x157299['skew']['y']=_0x496a37[_0x28a806(0x1f1)]['y'],_0x157299['x']=_0x496a37['x'],_0x157299['y']=_0x496a37['y'],_0x157299['setHue'](_0x496a37['_hue']);if(_0x594563)for(const _0x1dbfba of _0x496a37[_0x28a806(0x1d4)]){if(!_0x1dbfba)continue;if(_0x1dbfba['armature'])this['createDragonbonesArmature'](_0x157299,_0x1dbfba);else{const _0x5da3d7=new Sprite();_0x157299[_0x28a806(0x114)](_0x5da3d7),this[_0x28a806(0x1b8)](_0x5da3d7,_0x1dbfba,!![]);}}},Sprite_BattlerMotionTrail[_0x65fa05(0x105)]['createDragonbonesArmature']=function(_0x1c8fdb,_0x7c224d){const _0x308e8c=_0x65fa05,_0x15b322=this[_0x308e8c(0x18d)]['_battler'][_0x308e8c(0x139)]();this['_dragonbones']=DragonbonesManager[_0x308e8c(0x1ea)](_0x15b322[_0x308e8c(0x11f)]),_0x1c8fdb['addChild'](this[_0x308e8c(0x1b1)]);const _0x286f48=_0x7c224d[_0x308e8c(0x102)][_0x308e8c(0x1a6)],_0x401e8b=_0x7c224d['animation'][_0x308e8c(0x1e5)][_0x308e8c(0x1c7)];this['_dragonbones']['animation']['play'](_0x286f48),this[_0x308e8c(0x1b1)][_0x308e8c(0x102)][_0x308e8c(0x1e5)][_0x308e8c(0x1c7)]=_0x401e8b,this[_0x308e8c(0x1b1)]['animation'][_0x308e8c(0x110)]=0x0,this['_dragonbones']['x']=_0x15b322[_0x308e8c(0x1e0)],this[_0x308e8c(0x1b1)]['y']=_0x15b322[_0x308e8c(0x153)],this['_dragonbones']['scale']['x']=_0x15b322[_0x308e8c(0xe7)],this[_0x308e8c(0x1b1)][_0x308e8c(0xfc)]['y']=_0x15b322[_0x308e8c(0x173)],_0x1c8fdb[_0x308e8c(0x1b5)]=0x0,_0x1c8fdb[_0x308e8c(0x1ad)]=0x2,_0x1c8fdb[_0x308e8c(0x1a5)]();},Sprite_BattlerMotionTrail['prototype'][_0x65fa05(0x10c)]=function(){const _0x9b825c=_0x65fa05,_0x298b90=this['_sourceSprite'],_0x2a24a8=this[_0x9b825c(0x1db)];this['_duration']=_0x2a24a8[_0x9b825c(0x10d)],this['opacity']=_0x2a24a8['opacityStart'],this[_0x9b825c(0x1b8)](this,_0x298b90),this['_baseX']=_0x298b90[_0x9b825c(0x16f)],this[_0x9b825c(0x16e)]=_0x298b90[_0x9b825c(0x16e)],this[_0x9b825c(0x1aa)](_0x2a24a8[_0x9b825c(0xfd)]),this[_0x9b825c(0x14e)](_0x2a24a8[_0x9b825c(0x125)]);},Sprite_BattlerMotionTrail['prototype']['update']=function(){const _0x3e89fa=_0x65fa05;Sprite['prototype'][_0x3e89fa(0x1a5)][_0x3e89fa(0x1f5)](this),this[_0x3e89fa(0x11c)](this[_0x3e89fa(0x1d4)]),this['updateDuration']();},Sprite_BattlerMotionTrail[_0x65fa05(0x105)][_0x65fa05(0x11c)]=function(_0x29d771){const _0x48d0b7=_0x65fa05;if(!_0x29d771)return;for(const _0x53cef5 of _0x29d771){if(!_0x53cef5)continue;_0x53cef5[_0x48d0b7(0x1ad)]&&(_0x53cef5[_0x48d0b7(0x1ad)]--,_0x53cef5['nextOpacity']<=0x0&&(_0x53cef5[_0x48d0b7(0x1b5)]=0xff,_0x53cef5[_0x48d0b7(0x1ad)]=undefined)),this[_0x48d0b7(0x11c)](_0x53cef5[_0x48d0b7(0x1d4)]);}},Sprite_BattlerMotionTrail['prototype'][_0x65fa05(0x1e8)]=function(){const _0x136b35=_0x65fa05;if(this[_0x136b35(0x151)]>0x0){const _0x3f2d9d=this[_0x136b35(0x151)];this['opacity']=(this[_0x136b35(0x1b5)]*(_0x3f2d9d-0x1)+0x0)/_0x3f2d9d,this['_duration']--,this[_0x136b35(0x151)]<=0x0&&this[_0x136b35(0x174)]();}},Sprite_BattlerMotionTrail[_0x65fa05(0x105)]['disposeSprite']=function(){const _0x2f238d=_0x65fa05;this[_0x2f238d(0xec)][_0x2f238d(0x196)](this);this['_dragonbones']&&(this['_dragonbones']['dispose'](),this[_0x2f238d(0x1b1)]=null);const _0x1899d8=SceneManager[_0x2f238d(0x1dd)]['_spriteset'];if(_0x1899d8&&!_0x1899d8['hasMotionTrailSprite'](this[_0x2f238d(0x18d)])){const _0x4837be=_0x1899d8[_0x2f238d(0x141)];_0x4837be[_0x2f238d(0x114)](this[_0x2f238d(0x18d)]),_0x1899d8[_0x2f238d(0x15c)]();}};function _0x1b63(_0x15a330,_0x319c10){const _0x5aab9f=_0x5aab();return _0x1b63=function(_0x1b6342,_0x416f2a){_0x1b6342=_0x1b6342-0xe6;let _0x2c10ac=_0x5aab9f[_0x1b6342];return _0x2c10ac;},_0x1b63(_0x15a330,_0x319c10);}function Sprite_InjectAnimation(){this['initialize'](...arguments);}Sprite_InjectAnimation['prototype']=Object[_0x65fa05(0x120)](Sprite[_0x65fa05(0x105)]),Sprite_InjectAnimation[_0x65fa05(0x105)]['constructor']=Sprite_InjectAnimation,Sprite_InjectAnimation[_0x65fa05(0x105)]['initialize']=function(){const _0x2619cc=_0x65fa05;Sprite['prototype']['initialize'][_0x2619cc(0x1f5)](this),this[_0x2619cc(0x15b)]();},Sprite_InjectAnimation['prototype'][_0x65fa05(0x15b)]=function(){const _0x3ba880=_0x65fa05;this['anchor']['x']=0.5,this[_0x3ba880(0x1c4)]['y']=0x1,this[_0x3ba880(0x134)]=0x0,this[_0x3ba880(0x1b4)]=0x1,this[_0x3ba880(0x117)]=0x0,this[_0x3ba880(0x15e)]=0x0,this[_0x3ba880(0x14a)]=0x1,this[_0x3ba880(0x13a)]=0x1,this[_0x3ba880(0x177)]=0x1,this[_0x3ba880(0x131)]=0x1,this[_0x3ba880(0x178)]=0x0,this[_0x3ba880(0x1d8)]=0x0,this[_0x3ba880(0x1b5)]=0x0,this['_pause']=![];},Sprite_InjectAnimation['prototype']['setup']=function(_0xa25cb2){const _0x2bb4cd=_0x65fa05;this['bitmap']=ImageManager['loadSvActor'](_0xa25cb2[_0x2bb4cd(0x1b7)]),this[_0x2bb4cd(0x14a)]=_0xa25cb2[_0x2bb4cd(0x19e)],this[_0x2bb4cd(0x13a)]=_0xa25cb2[_0x2bb4cd(0x1ef)],this[_0x2bb4cd(0x1b4)]=_0xa25cb2[_0x2bb4cd(0x186)],this[_0x2bb4cd(0x15e)]=this[_0x2bb4cd(0x14a)]*this[_0x2bb4cd(0x13a)],this['_offsetX']=_0xa25cb2[_0x2bb4cd(0x1e0)],this[_0x2bb4cd(0x1d8)]=_0xa25cb2[_0x2bb4cd(0x153)],this['_prep']=!![],this[_0x2bb4cd(0x12d)][_0x2bb4cd(0x1d9)]=_0xa25cb2[_0x2bb4cd(0x1d9)],this[_0x2bb4cd(0x195)]=![],this[_0x2bb4cd(0x12d)][_0x2bb4cd(0xee)](this[_0x2bb4cd(0x194)]['bind'](this));},Sprite_InjectAnimation[_0x65fa05(0x105)]['startAnimation']=function(){const _0x4def60=_0x65fa05;this['opacity']=0xff,this[_0x4def60(0x134)]=0x0,this['_frameIndex']=0x0,this[_0x4def60(0x177)]=Math['floor'](this[_0x4def60(0x12d)][_0x4def60(0x14b)]/this[_0x4def60(0x14a)])||0x1,this['_cellHeight']=Math[_0x4def60(0x1d3)](this[_0x4def60(0x12d)][_0x4def60(0x1c2)]/this[_0x4def60(0x13a)])||0x1,this[_0x4def60(0x1b5)]=0xff,this[_0x4def60(0x190)]=![],this['update']();},Sprite_InjectAnimation[_0x65fa05(0x105)][_0x65fa05(0x1a5)]=function(){const _0x2da74c=_0x65fa05;Sprite[_0x2da74c(0x105)][_0x2da74c(0x1a5)][_0x2da74c(0x1f5)](this);if(this['opacity']<=0x0)return;this['updateDelay'](),this['updateFrame'](),this[_0x2da74c(0x1a1)](),this['updateMainSpriteVisibility']();},Sprite_InjectAnimation[_0x65fa05(0x105)][_0x65fa05(0x1c8)]=function(){const _0x3d7038=_0x65fa05;!this[_0x3d7038(0x195)]&&++this['_frameCount']>=this['_frameDelay']&&(this['_frameCount']=0x0,this[_0x3d7038(0x117)]++),this[_0x3d7038(0x1b5)]=this['_frameIndex']<this['_targetIndex']?0xff:0x0;},Sprite_InjectAnimation[_0x65fa05(0x105)]['updateFrame']=function(){const _0xc7f36d=_0x65fa05,_0xe94a94=this['_cellWidth'],_0x92c7e6=this[_0xc7f36d(0x131)],_0x3ca6eb=this[_0xc7f36d(0x117)]%this[_0xc7f36d(0x14a)]*_0xe94a94,_0xe2f5fc=Math[_0xc7f36d(0x1d3)](this[_0xc7f36d(0x117)]/this[_0xc7f36d(0x14a)])*_0x92c7e6;this[_0xc7f36d(0x176)](_0x3ca6eb,_0xe2f5fc,_0xe94a94,_0x92c7e6);},Sprite_InjectAnimation[_0x65fa05(0x105)][_0x65fa05(0x1a1)]=function(){const _0x2e048c=_0x65fa05;this['x']=this['_offsetX'],this['y']=this[_0x2e048c(0x1d8)];const _0x471902=this[_0x2e048c(0xec)][_0x2e048c(0xec)]['_mainSprite'];_0x471902&&(this['x']+=_0x471902['x'],this['y']+=_0x471902['y']);},Sprite_InjectAnimation[_0x65fa05(0x105)]['updateMainSpriteVisibility']=function(){const _0x1caf2c=_0x65fa05;if(!this[_0x1caf2c(0xec)])return;if(!this[_0x1caf2c(0xec)][_0x1caf2c(0xec)])return;{const _0x344da9=this[_0x1caf2c(0xec)][_0x1caf2c(0xec)]['_mainSprite'];_0x344da9&&(_0x344da9[_0x1caf2c(0x12c)]=this[_0x1caf2c(0x1b5)]<=0x0);}{const _0x1d2bdb=this[_0x1caf2c(0xec)]['parent'][_0x1caf2c(0x1a9)];_0x1d2bdb&&(_0x1d2bdb[_0x1caf2c(0x12c)]=this[_0x1caf2c(0x1b5)]<=0x0);}},Sprite_InjectAnimation[_0x65fa05(0x105)][_0x65fa05(0x1ab)]=function(){const _0x24c485=_0x65fa05;this[_0x24c485(0x190)]=![],this[_0x24c485(0x1b5)]=0x0,this[_0x24c485(0x117)]=this['_targetIndex'],this[_0x24c485(0x111)]();},Sprite_InjectAnimation[_0x65fa05(0x105)][_0x65fa05(0x16c)]=function(_0x5dbb6a){this['_pause']=_0x5dbb6a;},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x11b)]=Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x1bc)],Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x1bc)]=function(){const _0x364fa1=_0x65fa05;VisuMZ[_0x364fa1(0x128)][_0x364fa1(0x11b)][_0x364fa1(0x1f5)](this),this[_0x364fa1(0x13f)]();},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x122)]=Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x121)],Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x121)]=function(){const _0x182e2=_0x65fa05;VisuMZ['ActSeqImpact'][_0x182e2(0x122)][_0x182e2(0x1f5)](this),this[_0x182e2(0x13c)]();},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x13f)]=function(){const _0x14495c=_0x65fa05;this[_0x14495c(0x127)](),this[_0x14495c(0x189)]=[],this['createMotionBlurImpactFilter'](),this[_0x14495c(0x1ae)](),this[_0x14495c(0x175)](),this[_0x14495c(0x156)](),this[_0x14495c(0x15f)](),this[_0x14495c(0x103)]();},Spriteset_Base[_0x65fa05(0x105)]['updateActSeqImpactBaseFilters']=function(){const _0x28fdce=_0x65fa05;this[_0x28fdce(0xf3)](),this[_0x28fdce(0x19a)](),this['updateMotionBlurImpactFilter'](),this[_0x28fdce(0x12b)]();},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x13d)]=function(_0xa8994f,_0x559f90,_0x1a572a,_0x367ad2,_0x145740){const _0x58c272=_0x65fa05,_0x1afb83=VisuMZ[_0x58c272(0x106)]((_0x367ad2-_0x1a572a)/_0x367ad2,_0x145740||'Linear'),_0x178a0e=VisuMZ['ApplyEasing']((_0x367ad2-_0x1a572a+0x1)/_0x367ad2,_0x145740||_0x58c272(0x1da)),_0x1b4679=(_0xa8994f-_0x559f90*_0x1afb83)/(0x1-_0x1afb83);return _0x1b4679+(_0x559f90-_0x1b4679)*_0x178a0e;},Spriteset_Base['prototype'][_0x65fa05(0x127)]=function(){const _0x568eb7=_0x65fa05;if(!PIXI[_0x568eb7(0x1af)][_0x568eb7(0x19b)])return;if(this[_0x568eb7(0x1c5)])return;this[_0x568eb7(0x12e)]=0x0,this[_0x568eb7(0x1e1)]=0x0,this[_0x568eb7(0x16b)]=_0x568eb7(0x1da),this[_0x568eb7(0x1c5)]=new PIXI[(_0x568eb7(0x1af))][(_0x568eb7(0x19b))](),this['_rgbSplitImpactFilter'][_0x568eb7(0x10a)]=[0x0,0x0],this[_0x568eb7(0x1c5)]['green']=[0x0,0x0],this[_0x568eb7(0x1c5)][_0x568eb7(0x166)]=[0x0,0x0],this['_baseSprite'][_0x568eb7(0x1af)][_0x568eb7(0x18b)](this[_0x568eb7(0x1c5)]);},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x18f)]=function(_0xd4bc41,_0x53e074,_0x1cc8f8){const _0x367d92=_0x65fa05;if(!this[_0x367d92(0x1c5)])return;const _0x2faa2f=this['_rgbSplitImpactFilter'],_0x52909c=_0xd4bc41*0x2;this['_rgbSplitImpactDuration']=_0x53e074,this[_0x367d92(0x1e1)]=_0x53e074,this[_0x367d92(0x16b)]=_0x1cc8f8||_0x367d92(0x1da),_0x2faa2f[_0x367d92(0x10a)]=[Math[_0x367d92(0x148)](_0x52909c)-_0xd4bc41,Math[_0x367d92(0x148)](_0x52909c)-_0xd4bc41],_0x2faa2f[_0x367d92(0x1cd)]=[Math[_0x367d92(0x148)](_0x52909c)-_0xd4bc41,Math[_0x367d92(0x148)](_0x52909c)-_0xd4bc41],_0x2faa2f[_0x367d92(0x166)]=[Math[_0x367d92(0x148)](_0x52909c)-_0xd4bc41,Math['randomInt'](_0x52909c)-_0xd4bc41];},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0xf3)]=function(){const _0x1fc630=_0x65fa05;if(!this[_0x1fc630(0x1c5)])return;if(this[_0x1fc630(0x12e)]<=0x0)return;const _0x33a350=this['_rgbSplitImpactFilter'],_0x44ab79=this['_rgbSplitImpactDuration']||0x0,_0x12adbb=this['_rgbSplitImpactWholeDuration']||_0x44ab79,_0x57856d=0x0,_0x3fbfb0=this[_0x1fc630(0x16b)];_0x33a350['red'][0x0]=VisuMZ[_0x1fc630(0x128)][_0x1fc630(0x13d)](_0x33a350[_0x1fc630(0x10a)][0x0],_0x57856d,_0x44ab79,_0x12adbb,_0x3fbfb0),_0x33a350[_0x1fc630(0x10a)][0x1]=VisuMZ[_0x1fc630(0x128)]['applyEasing'](_0x33a350[_0x1fc630(0x10a)][0x1],_0x57856d,_0x44ab79,_0x12adbb,_0x3fbfb0),_0x33a350[_0x1fc630(0x1cd)][0x0]=VisuMZ[_0x1fc630(0x128)][_0x1fc630(0x13d)](_0x33a350[_0x1fc630(0x1cd)][0x0],_0x57856d,_0x44ab79,_0x12adbb,_0x3fbfb0),_0x33a350[_0x1fc630(0x1cd)][0x1]=VisuMZ[_0x1fc630(0x128)][_0x1fc630(0x13d)](_0x33a350[_0x1fc630(0x1cd)][0x1],_0x57856d,_0x44ab79,_0x12adbb,_0x3fbfb0),_0x33a350['blue'][0x0]=VisuMZ[_0x1fc630(0x128)][_0x1fc630(0x13d)](_0x33a350['blue'][0x0],_0x57856d,_0x44ab79,_0x12adbb,_0x3fbfb0),_0x33a350[_0x1fc630(0x166)][0x1]=VisuMZ[_0x1fc630(0x128)][_0x1fc630(0x13d)](_0x33a350['blue'][0x1],_0x57856d,_0x44ab79,_0x12adbb,_0x3fbfb0),this[_0x1fc630(0x12e)]--,this[_0x1fc630(0x12e)]<=0x0&&(_0x33a350[_0x1fc630(0x10a)]=[0x0,0x0],_0x33a350[_0x1fc630(0x1cd)]=[0x0,0x0],_0x33a350['blue']=[0x0,0x0]);},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x16a)]=function(_0x1473d3,_0x13e59b,_0xece99a,_0x5d06bf,_0xb6588f){const _0x23822f=_0x65fa05;if(!PIXI[_0x23822f(0x1af)][_0x23822f(0x15d)])return;const _0x1b4ade=0x2/Math['max'](0x2,_0xb6588f),_0x94921b=new PIXI['filters'][(_0x23822f(0x15d))]();_0x94921b[_0x23822f(0x14f)]=[_0x1473d3,_0x13e59b],_0x94921b[_0x23822f(0x112)]=_0xece99a,_0x94921b[_0x23822f(0x19d)]=_0x5d06bf,_0x94921b['brightness']=0x1,_0x94921b[_0x23822f(0x183)]=-0x1,_0x94921b[_0x23822f(0x1ec)]=_0x1b4ade,this['_shockwaveImpactFilters'][_0x23822f(0x18b)](_0x94921b),this[_0x23822f(0x17c)]['filters'][_0x23822f(0x18b)](_0x94921b);},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x19a)]=function(){const _0x41f426=_0x65fa05;if(!this[_0x41f426(0x189)])return;if(this[_0x41f426(0x189)][_0x41f426(0xeb)]<=0x0)return;for(const _0x3307a7 of this[_0x41f426(0x189)]){if(!_0x3307a7)continue;_0x3307a7['time']+=_0x3307a7[_0x41f426(0x1ec)],_0x3307a7['time']>=0x2&&(this['_shockwaveImpactFilters'][_0x41f426(0x11d)](_0x3307a7),this[_0x41f426(0x17c)]['filters']['remove'](_0x3307a7));}},Spriteset_Base[_0x65fa05(0x105)]['createMotionBlurImpactFilter']=function(){const _0x4d695e=_0x65fa05;if(!PIXI[_0x4d695e(0x1af)][_0x4d695e(0x18c)])return;this[_0x4d695e(0x1cc)]=0x0,this['_motionBlurImpactWholeDuration']=0x0,this[_0x4d695e(0x1ed)]=_0x4d695e(0x1da),this[_0x4d695e(0x17b)]=new PIXI[(_0x4d695e(0x1af))][(_0x4d695e(0x18c))](),this[_0x4d695e(0x17b)][_0x4d695e(0xfb)]['x']=0x0,this[_0x4d695e(0x17b)][_0x4d695e(0xfb)]['y']=0x0,this[_0x4d695e(0x17c)][_0x4d695e(0x1af)][_0x4d695e(0x18b)](this[_0x4d695e(0x17b)]);},Spriteset_Base['prototype']['setupMotionBlurImpactFilter']=function(_0x55269d,_0x4df83e,_0x585cb5,_0x5bceb1){const _0x4d6809=_0x65fa05;if(!this[_0x4d6809(0x17b)])return;const _0x3786a7=this[_0x4d6809(0x17b)];this[_0x4d6809(0x1cc)]=_0x585cb5,this['_motionBlurImpactWholeDuration']=_0x585cb5,this[_0x4d6809(0x1ed)]=_0x5bceb1;const _0xd87461=Math[_0x4d6809(0x144)](this[_0x4d6809(0x14b)],this['height'])*_0x4df83e,_0x3144b2=_0xd87461*Math['cos'](_0x55269d*Math['PI']/0xb4),_0x2e39c6=-_0xd87461*Math[_0x4d6809(0x10b)](_0x55269d*Math['PI']/0xb4);_0x3786a7[_0x4d6809(0xfb)]['x']=_0x3144b2,_0x3786a7[_0x4d6809(0xfb)]['y']=_0x2e39c6;},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0xef)]=function(){const _0x20ff2f=_0x65fa05;if(!this[_0x20ff2f(0x17b)])return;if(this[_0x20ff2f(0x1cc)]<=0x0)return;const _0xb05a2e=this[_0x20ff2f(0x17b)],_0x26aa2c=this[_0x20ff2f(0x1cc)]||0x0,_0x102af3=this['_motionBlurImpactWholeDuration']||_0x26aa2c,_0x2c68e9=0x0,_0x182ce8=this[_0x20ff2f(0x1ed)];_0xb05a2e[_0x20ff2f(0xfb)]['x']=VisuMZ['ActSeqImpact'][_0x20ff2f(0x13d)](_0xb05a2e[_0x20ff2f(0xfb)]['x'],_0x2c68e9,_0x26aa2c,_0x102af3,_0x182ce8),_0xb05a2e['velocity']['y']=VisuMZ['ActSeqImpact'][_0x20ff2f(0x13d)](_0xb05a2e['velocity']['y'],_0x2c68e9,_0x26aa2c,_0x102af3,_0x182ce8),this[_0x20ff2f(0x1cc)]--,this[_0x20ff2f(0x1cc)]<=0x0&&(_0xb05a2e[_0x20ff2f(0xfb)]['x']=0x0,_0xb05a2e[_0x20ff2f(0xfb)]['y']=0x0);},Spriteset_Base['prototype'][_0x65fa05(0x1ae)]=function(){const _0x3751c6=_0x65fa05;if(!PIXI[_0x3751c6(0x1af)][_0x3751c6(0x18e)])return;this['_zoomBlurImpactDuration']=0x0,this['_zoomBlurImpactWholeDuration']=0x0,this[_0x3751c6(0x1ee)]=_0x3751c6(0x1da),this[_0x3751c6(0x1ca)]=new PIXI['filters'][(_0x3751c6(0x18e))](),this[_0x3751c6(0x1ca)][_0x3751c6(0xf7)]=0x0,this[_0x3751c6(0x1ca)][_0x3751c6(0x14f)]['x']=Graphics[_0x3751c6(0x14b)]/0x2,this[_0x3751c6(0x1ca)]['center']['y']=Graphics[_0x3751c6(0x1c2)]/0x2,this['_zoomBlurImpactFilter'][_0x3751c6(0x1ba)]=0x60,this[_0x3751c6(0x17c)][_0x3751c6(0x1af)][_0x3751c6(0x18b)](this[_0x3751c6(0x1ca)]);},Spriteset_Base[_0x65fa05(0x105)]['setupZoomBlurImpactFilter']=function(_0x2065c5,_0x189e1e,_0x14972b,_0x20e2d2,_0x304a72,_0x49fde7){const _0x1a1c28=_0x65fa05;if(!this['_zoomBlurImpactFilter'])return;const _0x3a32f3=this[_0x1a1c28(0x1ca)];this[_0x1a1c28(0x119)]=_0x304a72,this[_0x1a1c28(0x172)]=_0x304a72,this['_zoomBlurImpactEasing']=_0x49fde7,_0x3a32f3[_0x1a1c28(0xf7)]=_0x2065c5,_0x3a32f3[_0x1a1c28(0x14f)]['x']=_0x189e1e,_0x3a32f3[_0x1a1c28(0x14f)]['y']=_0x14972b,_0x3a32f3['innerRadius']=_0x20e2d2;},Spriteset_Base[_0x65fa05(0x105)]['updateZoomBlurImpactFilter']=function(){const _0x1a5832=_0x65fa05;if(!this[_0x1a5832(0x1ca)])return;if(this[_0x1a5832(0x119)]<=0x0)return;const _0x132a79=this[_0x1a5832(0x1ca)],_0x6a78d5=this[_0x1a5832(0x119)]||0x0,_0x5cda41=this['_zoomBlurImpactWholeDuration']||_0x6a78d5,_0x3b69d5=0x0,_0x202e70=this['_zoomBlurImpactEasing'];_0x132a79[_0x1a5832(0xf7)]=VisuMZ[_0x1a5832(0x128)][_0x1a5832(0x13d)](_0x132a79[_0x1a5832(0xf7)],_0x3b69d5,_0x6a78d5,_0x5cda41,_0x202e70),this[_0x1a5832(0x119)]--,this[_0x1a5832(0x119)]<=0x0&&(_0x132a79[_0x1a5832(0xf7)]=0x0);},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x175)]=function(){const _0x558cf8=_0x65fa05;if(!PIXI['filters'][_0x558cf8(0x198)])return;this[_0x558cf8(0x101)]=new PIXI[(_0x558cf8(0x1af))]['ColorMatrixFilter'](),this[_0x558cf8(0x101)][_0x558cf8(0x1bb)](),this['_blueRedInvertImpactFilter'][_0x558cf8(0x138)]=![],this[_0x558cf8(0x17c)][_0x558cf8(0x1af)][_0x558cf8(0x18b)](this[_0x558cf8(0x101)]);},Spriteset_Base[_0x65fa05(0x105)]['setupBlueRedInvertImpactFilter']=function(_0x4504c7){const _0x24a95c=_0x65fa05;if(!this[_0x24a95c(0x101)])return;this[_0x24a95c(0x101)][_0x24a95c(0x138)]=_0x4504c7,this['update']();},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0x156)]=function(){const _0x11fcdc=_0x65fa05;if(!PIXI['filters'][_0x11fcdc(0x198)])return;this[_0x11fcdc(0x17a)]=new PIXI['filters'][(_0x11fcdc(0x198))](),this[_0x11fcdc(0x17a)][_0x11fcdc(0x133)](),this[_0x11fcdc(0x17a)]['enabled']=![],this[_0x11fcdc(0x17c)]['filters'][_0x11fcdc(0x18b)](this[_0x11fcdc(0x17a)]);},Spriteset_Base['prototype'][_0x65fa05(0x160)]=function(_0x4b099d){const _0x44c3ef=_0x65fa05;if(!this[_0x44c3ef(0x17a)])return;this[_0x44c3ef(0x17a)]['enabled']=_0x4b099d,this[_0x44c3ef(0x1a5)]();},Spriteset_Base[_0x65fa05(0x105)]['createNegativeImpactFilter']=function(){const _0x527c30=_0x65fa05;if(!PIXI[_0x527c30(0x1af)][_0x527c30(0x198)])return;this[_0x527c30(0x1b9)]=new PIXI[(_0x527c30(0x1af))][(_0x527c30(0x198))](),this['_negativeImpactFilter'][_0x527c30(0x1ce)](),this[_0x527c30(0x1b9)][_0x527c30(0x138)]=![],this['_baseSprite'][_0x527c30(0x1af)][_0x527c30(0x18b)](this[_0x527c30(0x1b9)]);},Spriteset_Base[_0x65fa05(0x105)]['setupNegativeImpactFilter']=function(_0x818a86){const _0x126cc3=_0x65fa05;if(!this[_0x126cc3(0x1b9)])return;this[_0x126cc3(0x1b9)][_0x126cc3(0x138)]=_0x818a86,this[_0x126cc3(0x1a5)]();},Spriteset_Base['prototype']['createOversaturateImpactFilter']=function(){const _0x287b92=_0x65fa05;if(!PIXI['filters'][_0x287b92(0x198)])return;this[_0x287b92(0x1d6)]=new PIXI[(_0x287b92(0x1af))][(_0x287b92(0x198))](),this['_oversaturateImpactFilter'][_0x287b92(0x1e3)](),this['_oversaturateImpactFilter'][_0x287b92(0x138)]=![],this[_0x287b92(0x17c)][_0x287b92(0x1af)]['push'](this['_oversaturateImpactFilter']);},Spriteset_Base[_0x65fa05(0x105)][_0x65fa05(0xf2)]=function(_0x241776){const _0x2f999c=_0x65fa05;if(!this[_0x2f999c(0x1d6)])return;this[_0x2f999c(0x1d6)][_0x2f999c(0x138)]=_0x241776,this['update']();},VisuMZ['ActSeqImpact']['Spriteset_Battle_createBattleFieldContainer']=Spriteset_Battle[_0x65fa05(0x105)]['createBattleFieldContainer'],Spriteset_Battle[_0x65fa05(0x105)][_0x65fa05(0x107)]=function(){const _0xaa670d=_0x65fa05;VisuMZ[_0xaa670d(0x128)][_0xaa670d(0x140)][_0xaa670d(0x1f5)](this),this[_0xaa670d(0x180)]=new Sprite(),this['_battleField'][_0xaa670d(0x114)](this[_0xaa670d(0x180)]),this[_0xaa670d(0x1ac)]&&this['_battleField']['addChild'](this[_0xaa670d(0x1ac)]);},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x1bf)]=Spriteset_Battle[_0x65fa05(0x105)][_0x65fa05(0x100)],Spriteset_Battle[_0x65fa05(0x105)][_0x65fa05(0x100)]=function(){const _0x30fcca=_0x65fa05;VisuMZ[_0x30fcca(0x128)][_0x30fcca(0x1bf)]['call'](this),this['_motionTrailContainer']&&this[_0x30fcca(0x141)]&&(this['_motionTrailContainer'][_0x30fcca(0xfc)]['x']=this[_0x30fcca(0x141)][_0x30fcca(0xfc)]['x'],this['_motionTrailContainer'][_0x30fcca(0xfc)]['y']=this['_battlerContainer'][_0x30fcca(0xfc)]['y'],this[_0x30fcca(0x180)]['x']=this['_battlerContainer']['x'],this[_0x30fcca(0x180)]['y']=this[_0x30fcca(0x141)]['y']);},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x1a4)]=Spriteset_Battle[_0x65fa05(0x105)][_0x65fa05(0x15c)],Spriteset_Battle[_0x65fa05(0x105)][_0x65fa05(0x15c)]=function(){const _0x1e3c10=_0x65fa05;VisuMZ[_0x1e3c10(0x128)][_0x1e3c10(0x1a4)][_0x1e3c10(0x1f5)](this),this[_0x1e3c10(0x12f)](),this[_0x1e3c10(0x109)]();},Spriteset_Battle['prototype'][_0x65fa05(0x12f)]=function(){const _0x27fd0d=_0x65fa05;for(const _0x2d208a of this[_0x27fd0d(0x141)][_0x27fd0d(0x1d4)]){if(!_0x2d208a)continue;this[_0x27fd0d(0x1a7)](_0x2d208a)&&this[_0x27fd0d(0x180)][_0x27fd0d(0x114)](_0x2d208a);}},Spriteset_Battle[_0x65fa05(0x105)]['hasMotionTrailSprite']=function(_0x58de3f){const _0x3d752c=_0x65fa05;if(!this[_0x3d752c(0x180)])return![];return this['_motionTrailContainer'][_0x3d752c(0x1d4)][_0x3d752c(0x150)](_0x41a8db=>_0x41a8db['_sourceSprite']===_0x58de3f);},Spriteset_Battle['prototype'][_0x65fa05(0x109)]=function(){const _0x544d39=_0x65fa05;if(!this[_0x544d39(0x180)])return![];const _0x3613d9=this[_0x544d39(0x180)][_0x544d39(0x1d4)][_0x544d39(0xff)](_0x51ef64=>_0x51ef64[_0x544d39(0x1f0)]!==Sprite_BattlerMotionTrail);for(const _0x2a8f54 of _0x3613d9){this[_0x544d39(0x180)][_0x544d39(0x114)](_0x2a8f54);}},VisuMZ[_0x65fa05(0x128)][_0x65fa05(0x1d2)]=function(_0x2840ea,_0x2a442a){const _0x3e637a=_0x65fa05;_0x2a442a&&(_0x2a442a[_0x3e637a(0x19f)]=_0x2a442a[_0x3e637a(0x19f)]||0x0,_0x2a442a['_waitCount']=Math[_0x3e637a(0x144)](_0x2a442a[_0x3e637a(0x19f)],0x1)),_0x2840ea=_0x2840ea||0x1,Graphics[_0x3e637a(0xf8)](),setTimeout(Graphics['startGameLoop']['bind'](Graphics),_0x2840ea);};