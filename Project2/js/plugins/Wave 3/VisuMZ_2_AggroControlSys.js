//=============================================================================
// VisuStella MZ - Aggro Control System
// VisuMZ_2_AggroControlSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_AggroControlSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AggroControlSystem = VisuMZ.AggroControlSystem || {};
VisuMZ.AggroControlSystem.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.23] [AggroControlSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Aggro_Control_System_VisuStella_MZ
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * A common mechanic found in many RPG's nowadays is the ability to steer the
 * way enemies target party members. This can be in the form of provocations, 
 * taunts, and aggro.
 *
 * Provocations come in the form of states, where when a unit applies a provoke
 * state on a target, the target must attack the provoker when using single
 * target skills. This plugin provides support for multiple provocations and
 * such provocations will be given focus based on the state's priority value.
 *
 * Taunts are a third way to steer an opponent to focus on a party member. The
 * taunt effects can be split up into global, physical, magical, or certain hit
 * only taunts and these can be applied to almost any trait object.
 *
 * Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Three different ways to influencing which targets enemies should attack:
 *   Provoke, taunt, and aggro.
 * * Provoke and taunt effects work both ways for actors and enemies.
 * * Aggro effects accumulate through battle and can be manipulated through
 *   notetag values, Plugin Commands, and/or Plugin Parameters.
 * * Provoked battlers can have provoke lines displayed to indicate which
 *   unit has provoked them.
 * * Taunting units can have animations played on them repeatedly to quickly
 *   relay information to the player about their taunt properties.
 * * Gauges that can be displayed over the heads of actor sprites to display
 *   how much aggro that actor holds in comparison to the other actors.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_0_CoreEngine
 * VisuMZ_1_BattleCore
 *
 * - Provoke Priority Lines and Taunt animations become available if these
 *   plugins are installed.
 *
 * ---
 *
 * ============================================================================
 * How Aggro, Provoke, and Taunts Work
 * ============================================================================
 *
 * This section will explain how aggro, provoke, and taunts work.
 *
 * ---
 *
 * Provoke
 *
 * - Provocations come in the form of states, where when a unit applies a
 * provoke state on a target, the target must attack the provoker when using
 * single target skills. This plugin provides support for multiple provocations
 * and such provocations will be given focus based on the state's database
 * priority value.
 *
 * - The provoke will last only as long as the duration of the state itself. If
 * the state's duration is refreshed by reapplying the Provoke state, then the
 * provoker of that state will then switch over to the one applying the newly
 * added state.
 *
 * - When an actor selects a target for an action and the actor is provoked by
 * an enemy on the other team, the player's choice selection becomes limited to
 * only the provoker.
 *
 * - Provoke can be bypassed through the <Bypass Provoke> notetag.
 *
 * ---
 *
 * Taunts
 *
 * - Taunts are a third way to steer an opponent to focus on a party member.
 * The taunt effects can be split up into global, physical, magical, or certain
 * hit only taunts and these can be applied to almost any trait object.
 *
 * - When an actor selects a target and the enemy team has a taunting unit,
 * the player's choice selection becomes limited to only the targets with the
 * associated taunt type.
 *
 * - Taunts can be bypassed through the <Bypass Taunt> notetag.
 *
 * ---
 *
 * Aggro
 *
 * - Aggro is a numeric value that determines the likelihood and/or priority
 * level of how often a target party member is to be attacked by an enemy unit.
 * The higher the aggro value, the more likely the chances of being targeted.
 * A option can be turned on (or through notetags) to set enemies to always
 * target the party member with the highest aggro.
 *
 * - Skills and items can raise its user's aggro value through notetags and/or
 * how much damage they've dealt or healed. Skills and items can also change a
 * target's aggro value through notetags, too.
 *
 * - Through the Plugin Parameters, you can set Aggro to automatically raised
 * based on how much damage or healing dealt by a user.
 *
 * - Some enemies can be bypass forced aggro target through the <Bypass Aggro>
 * notetag while other enemies can be forced to target the highest aggro target
 * through the <Target Highest Aggro> notetag.
 * 
 * - The aggro gauge shows the value based on how much aggro that party member
 * has relative to the rest of the party. Sometimes it will appear like the
 * party member's aggro "resets" back to zero, when it fact, that's not what's
 * happening. If that party member's aggro gauge is "empty", that means the
 * aggro for that party member is the lowest of the party. if all party members
 * appear to have their aggro gauge as "full", then that means the aggro for
 * all party members is equal and that everybody is likely targeted for attack.
 *
 * ---
 *
 * Priorities
 *
 * - Priority will be given in the order of provokes, taunts, and then aggro.
 * This means if an enemy is provoked, the opposing side has a taunt, and there
 * is a member with high aggro, then the enemy will always attack the provoker
 * first before targeting a taunting unit before targeting the unit with high
 * aggro values.
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
 * === Provoke-Related Notetags ===
 *
 * The following notetags enable you to utilize the Provoke effects added by
 * this plugin. Provoked targets can only attack the provoking unit for single
 * target actions.
 *
 * ---
 *
 * <Provoke>
 *
 * - Used for: State Notetags
 * - Causes the state affected unit to be able to only attack the caster of the
 *   provoke state for single target actions.
 * - If multiple provoke states are applied, then the provoker is the one who
 *   applied the highest priority provoke state.
 *
 * ---
 *
 * <Bypass Provoke>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Makes the affected unit to ignore any and all provoke effects applied by
 *   any provoke states, allowing them to target foes as if they are unaffected
 *   by provoke states altogether.
 *
 * ---
 * 
 * <Bypass Provoke>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass provoke effects applied by any provoke states,
 *   allowing this action to target foes as if the user is unaffected by any
 *   provoke effects altogether.
 * 
 * ---
 * 
 * <Provoke Height Origin: x%>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the provoke height origin point to x% of the sprite's height.
 * - This is the landing point for the provoke trails.
 * - Replace 'x' with a number presenting what rate of the sprite's height to
 *   set as the provoke height origin point.
 * 
 * ---
 *
 * === Taunt-Related Notetags ===
 *
 * ---
 *
 * <Taunt>
 * <All Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Physical Taunt>
 * <Magical Taunt>
 * <Certain Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the taunting unit to become the target of the opposing team's
 *   single target actions for physical, magical, and certain hit actions
 *   respectively.
 * - Add/remove any combination of the above to cause the affected unit to
 *   become the target of those types of actions.
 * - If multiple taunters exist, then the opposing team can select between any
 *   of the taunters for targets.
 *
 * ---
 *
 * <Bypass Taunt>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The affected unit will ignore any and all taunt effects created by the
 *   opposing team, allowing them to use single target actions as if no
 *   taunters exist on the opposing team.
 *
 * ---
 * 
 * <Bypass Taunt>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass taunt effects created by the opposing team,
 *   allowing the user to use single target actions as if no taunters exist on
 *   the opposing team.
 * 
 * ---
 *
 * === Aggro-Related Notetags ===
 *
 * ---
 *
 * <User Aggro: +x>
 * <User Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the user's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <Target Aggro: +x>
 * <Target Aggro: -x>
 *
 * - Used for: Skill, Item
 * - Upon using this action, raise the target's battle aggro value by 'x'.
 * - Replace 'x' with the amount of battle aggro to increase/decrease by.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
 *
 * ---
 *
 * <Aggro: +x>
 * <Aggro: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to passively have increased/decreased aggro
 *   values independent of the amount of aggro it earns in battle.
 * - Replace 'x' with the amount of aggro this object increases/decreases by.
 *
 * ---
 *
 * <Aggro Multiplier: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected unit to increase the amount of perceived aggro it has
 *   by the aggro multiplier.
 * - Replace 'x' with a number representing the percentage to increase/decrease
 *   the perceived aggro by.
 * - If multiple of these traits exist across different trait objects, the
 *   effects are increased multiplicatively.
 *
 * ---
 *
 * <Bypass Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will decide targets by aggro weight
 *   instead of always picking the highest aggro unit(s).
 * - If used on trait objects, the affected unit will decide targets by aggro
 *   weight instead of always picking the highest aggro unit(s).
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 * 
 * <Bypass Highest Aggro>
 * - Used for: Skill and Item Notetags
 * - Makes the action bypass highest aggro effects and instead focuses on
 *   targets by aggro weight instead.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 * 
 * ---
 *
 * <Target Highest Aggro>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills or items, the action will always decide its targets by
 *   the highest aggro value.
 * - If used on trait objects, the affected unit will always decide on targets
 *   by the highest aggro value.
 * - If the <Bypass Highest Aggro> notetag exists, this effect is ignored.
 * - This is used for enemy A.I. or Actor auto battle A.I.
 *
 * ---
 *
 * === JavaScript Notetags: Aggro-Related ===
 *
 * ---
 *
 * <JS User Aggro>
 *  code
 *  code
 *  value = code
 * </JS User Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change the user's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will only apply once per usage regardless of the number of
 *   successful hits landed by the action.
 *
 * ---
 *
 * <JS Target Aggro>
 *  code
 *  code
 *  value = code
 * </JS Target Aggro>
 *
 * - Used for: Skill, Item
 * - Replace 'code' with JavaScript code to determine the final 'value' to
 *   change target's battle aggro to upon using this skill.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 * - This effect will apply multiple times based on the number of successful
 *   hits landed by the action.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Aggro
 * - Changes target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Actor: Set Aggro
 * - Set target actor's aggro value.
 *
 *   Actor ID:
 *   - Select which Actor ID to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change Aggro
 * - Changes target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Change Aggro By:
 *   - Change aggro by this amount.
 *   - Use negative numbers to reduce aggro.
 *
 * ---
 *
 * Enemy: Set Aggro
 * - Set target enemy's aggro value.
 *
 *   Enemy Index:
 *   - Select which Enemy Index to affect.
 *
 *   Set Aggro To:
 *   - Sets target's aggro to this amount.
 *   - Aggro must be at least a value of 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Provoke Settings
 * ============================================================================
 *
 * The Provoke Settings Plugin Parameters adjust the visual aspects related to
 * the provoke effect. These settings will require VisuMZ_1_BattleCore to be
 * installed in order for them to work due to dependencies. 
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 *   Show Priority Lines?:
 *   - Show priority target lines for this plugin?
 *   - Requires VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Line Settings
 * 
 *   Arc Height:
 *   - How tall should the line arc in pixels?
 * 
 *   Blend Mode:
 *   - The blend mode used for the sprite.
 * 
 *   Height Origin:
 *   - The rate from the battler's sprite base to determine where the line
 *     starts from.
 * 
 *   Line Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Opacity:
 *   - The highest possible opacity for active provoke lines.
 * 
 *   Opacity Speed:
 *   - The speed at which opacity fluctuates for the line sprite.
 * 
 *   Parts:
 *   - The number of joint parts to split up the sprite as.
 * 
 *   Parts Size:
 *   - The number in pixels for the diameter of each part.
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Provoke Origin' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Taunt Settings
 * ============================================================================
 *
 * Battlers with specific taunt types can have animations playing on them over
 * and over to relay information to the player. These settings require you to
 * have both VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore installed in your
 * project's plugin list in order to use.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine & VisuMZ_1_BattleCore
 * 
 *   Show Animations?:
 *   - Show animations for each of the taunt effects?
 *   - Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 *
 * ---
 *
 * Animation ID's
 * 
 *   Physical Taunt:
 *   - The animation ID used for physical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Magical Taunt:
 *   - The animation ID used for magical taunts.
 *   - Use 0 or 'None' to bypass this type.
 * 
 *   Certain Hit Taunt:
 *   - The animation ID used for certain hit taunts.
 *   - Use 0 or 'None' to bypass this type.
 *
 * ---
 *
 * Animation Settings
 * 
 *   Cycle Time:
 *   - The amount of frames to wait before each animation cycle.
 *   - WARNING: Lower numbers can jeopardize game performance.
 * 
 *   Mirror Actor Ani?:
 *   - Mirror animations played on actors?
 * 
 *   Mute Animation SFX?:
 *   - Mute sounds played by animations?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Aggro Settings
 * ============================================================================
 *
 * This lets you adjust the settings for this plugin's Aggro mechanics. Most of
 * these settings focus on the visual gauge display of the Aggro gauge, but you
 * can also change up the settings for how aggro is utilized.
 *
 * ---
 *
 * General
 * 
 *   Priority: Highest TGR:
 *   - When enemies target actors for an single target attack, always target
 *     the highest members or make it weighted?
 *
 *   Aggro Per Damage:
 *   - The amount of aggro generated per point of HP damage dealt to an enemy.
 *
 *   Aggro Per Heal:
 *   - The amount of aggro generated per point of HP recovered to an ally.
 *
 * ---
 *
 * Gauge
 * 
 *   Visible Battler Gauge:
 *   - Display an aggro gauge over an SV actor's head to show current aggro
 *     level compared to other party members.
 * 
 *   Visible Status Gauge:
 *   - Display an aggro gauge in the Battle Status Window to show the current
 *     aggro level compared to others.
 * 
 *   Gauge Color 1:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Gauge Width:
 *   - Width in pixels you want the gauge to be.
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the Aggro Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the Aggro Gauge to be scaled?
 * 
 *   Battler Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 * 
 *   Battle Status Gauge
 * 
 *     Offset X:
 *     Offset Y:
 *     - How many pixels to offset the Aggro Gauge's X/Y by?
 *
 * ---
 * 
 * Options
 * 
 *   Add Provoke Option?
 *   - Add the 'Show Aggro Gauge' option to the Options menu?
 * 
 *   Adjust Window Height
 *   - Automatically adjust the options window height?
 * 
 *   Option Name
 *   - Command name of the option.
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
 * Version 1.23: January 19, 2026
 * * Documentation Update!
 * ** Under "How Aggro, Provoke, and Taunts Work" > Aggro
 * *** Added this section:
 * **** The aggro gauge shows the value based on how much aggro that party
 *      member has relative to the rest of the party. Sometimes it will appear
 *      like the party member's aggro "resets" back to zero, when it fact,
 *      that's not what's happening. If that party member's aggro gauge is
 *      "empty", that means the aggro for that party member is the lowest of
 *      the party. if all party members appear to have their aggro gauge as
 *      "full", then that means the aggro for all party members is equal and
 *      that everybody is likely targeted for attack.
 * 
 * Version 1.22: December 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where battlers can become immune to provoke effects. Fix made
 *    by Olivia.
 * 
 * Version 1.21: October 16, 2025
 * * Bug Fixes!
 * ** Fixed a bug where auto-battle would bypass Taunt and Provoke effects.
 *    Fix made by Olivia.
 * 
 * Version 1.20: July 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if a party member who provoked an enemy decided to
 *    switch out, the provoke effect would be retained and cause the enemy to
 *    bug out and crash the game. Fix made by Arisu.
 * 
 * Version 1.19: April 18, 2024
 * * Feature Update!
 * ** Altered TGR and Aggro-related stats so that they cannot dip too deep into
 *    the negatives and prevent randomized targeting altogether. Update made
 *    by Olivia.
 * 
 * Version 1.18: March 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for other plugins.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 17, 2023
 * * Compatibility Update!
 * ** When enemies use skills with VisuStella MZ Battle A.I. installed, aggro
 *    settings will no longer automatically target "highest aggro targets" if
 *    there are <AI Targets: x> notetags.
 * 
 * Version 1.16: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an issue with non-weighted aggro selected actions that will cause
 *    actors (instead of just enemies) to also target highest TGR enemies.
 *    Fix made by Irina.
 * 
 * Version 1.15: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused <All Taunt> to not work properly.
 *    Fix made by Irina.
 * 
 * Version 1.14: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause cached battlers from a previous save file to
 *    not load up properly when actions are used for highest aggro actors.
 *    Fix made by Irina.
 * 
 * Version 1.13: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a problem that would cause a crash when exiting the Options menu in
 *    battle when used with specific battle systems. Fix made by Irina.
 * 
 * Version 1.12: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for Battle Core updated version 1.73
 *    new features.
 * 
 * Version 1.11: November 17, 2022
 * * Bug Fixes!
 * ** <JS User Aggro> and <JS Target Aggro> should now work properly.
 *    Fix made by Arisu.
 * 
 * Version 1.10: August 25, 2022
 * * Documentation Update!
 * ** Added note to the <Provoke> notetag:
 * *** States with <Provoke> on them will automatically remove themselves if
 *     the provoker dies. Update made by Arisu.
 * * Feature Update!
 * ** States with <Provoke> on them will automatically remove themselves if the
 *    provoker dies. Update made by Arisu.
 * 
 * Version 1.09: June 2, 2022
 * * Bug Fixes!
 * ** Filename has been shortened from VisuMZ_2_AggroControlSystem.js to
 *    VisuMZ_2_AggroControlSys.js due to deployment reasons. For some mobile
 *    devices, keeping the name as long as VisuMZ_2_AggroControlSystem.js
 *    causes problems, but VisuMZ_2_AggroControlSys.js is fine. Take note of
 *    this while you are updating.
 * ** 'user' and 'target' now works properly with the JS notetags.
 *    Fix made by Irina.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Highest and lowest TGR members are now cached on an action by action
 *    basis for reduce needed computations. Update made by Irina.
 * 
 * Version 1.07: April 9, 2021
 * * Bug Fixes!
 * ** Provoke effect now takes into consideration when Provoke is applied by
 *    a weapon effect that comes off a counter attack from an actor. Fix made
 *    by Olivia.
 * 
 * Version 1.06: March 12, 2021
 * * Bug Fixes!
 * ** Subsequent battles or changing scenes should no longer clear the custom
 *    rendered bitmap used for the provoke trail. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for the Skill and Item versions of the following
 *    notetags into the help file and wiki:
 * *** <Bypass Provoke>
 * *** <Bypass Taunt>
 * *** <Bypass Highest Aggro>
 * 
 * Version 1.05: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Aggro Settings > Battle Status Gauge
 * **** These settings allow you to offset the Aggro Gauge in the Battle Status
 *      Window from its original position.
 * 
 * Version 1.04: February 26, 2021
 * * Bug Fixes!
 * ** Fixed positioning of gauge for List Style battle layouts without faces.
 *    Fix made by Olivia.
 * 
 * Version 1.03: February 5, 2021
 * * Feature Update!
 * ** Aggro is now cleared at the end of each battle in addition to the start
 *    of each battle. Update made by Olivia.
 *
 * Version 1.02: November 1, 2020
 * * Compatibility Update!
 * ** Plugin is made more compatible with other plugins.
 * 
 * Version 1.01: October 4, 2020
 * * Bug Fixes!
 * ** Provoke lines should now be placed correctly if the UI area is smaller
 *    than the resolution area.
 * ** The Plugin Commands should no longer cause crashes. Fix made by Irina.
 *
 * Version 1.00: September 28, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeAggro
 * @text Actor: Change Aggro
 * @desc Changes target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSetAggro
 * @text Actor: Set Aggro
 * @desc Set target actor's aggro value.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select which Actor ID to affect.
 * @default 1
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyChangeAggro
 * @text Enemy: Change Aggro
 * @desc Changes target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Change Aggro By
 * @desc Change aggro by this amount.
 * Use negative numbers to reduce aggro.
 * @default +1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySetAggro
 * @text Enemy: Set Aggro
 * @desc Set target enemy's aggro value.
 *
 * @arg EnemyIndex:num
 * @text Enemy Index
 * @type actor
 * @desc Select which Enemy Index to affect.
 * @default 0
 *
 * @arg Aggro:num
 * @text Set Aggro To
 * @desc Sets target's aggro to this amount.
 * Aggro must be at least a value of 1.
 * @default 1
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
 * @param AggroControl
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Provoke:struct
 * @text Provoke Settings
 * @type struct<Provoke>
 * @desc Settings related to the Provoke mechanic.
 * These settings require VisuMZ_1_BattleCore.
 * @default {"VisuMZ_1_BattleCore":"","ShowLines:eval":"true","LineSettings":"","ArcHeight:num":"125","BlendMode:num":"1","HeightOrigin:num":"0.8","LineColor:str":"#ff0000","Opacity:num":"255","OpacitySpeed:num":"4","Parts:num":"256","PartsSize:num":"5","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Provoke Origin"}
 *
 * @param Taunt:struct
 * @text Taunt Settings
 * @type struct<Taunt>
 * @desc Settings related to the Taunt mechanic.
 * @default {"Dependency":"VisuMZ_1_BattleCore","ShowAnimation:eval":"true","AnimationID":"","AniPhysical:num":"1","AniMagical:num":"2","AniCertain:num":"3","AnimationSettings":"","CycleTime:num":"60","MirrorActorAni:eval":"true","MuteAnimations:eval":"true"}
 *
 * @param Aggro:struct
 * @text Aggro Settings
 * @type struct<Aggro>
 * @desc Settings related to the Aggro mechanic.
 * @default {"General":"","PriorityHighest:eval":"true","AggroPerDmg:num":"0.1","AggroPerHeal:num":"0.5","Gauge":"","VisibleGauge:eval":"false","StatusGauge:eval":"true","GaugeColor1:str":"#959595","GaugeColor2:str":"#ffffff","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"+0","OffsetY:num":"+2","Options":"","AddOption:eval":"true","AdjustOptionsRect:eval":"true","OptionName:str":"Show Aggro Gauge"}
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
 * Provoke Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Provoke:
 *
 * @param VisuMZ_1_BattleCore
 *
 * @param ShowLines:eval
 * @text Show Priority Lines?
 * @parent VisuMZ_1_BattleCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show priority target lines for this plugin?
 * Requires VisuMZ_1_BattleCore.
 * @default true
 *
 * @param LineSettings
 * @text Line Settings
 *
 * @param ArcHeight:num
 * @text Arc Height
 * @parent LineSettings
 * @type number
 * @desc How tall should the line arc in pixels?
 * @default 125
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent LineSettings
 * @type select
 * @option Normal
 * @value 0
 * @option Additive
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @desc The blend mode used for the sprite.
 * @default 1
 *
 * @param HeightOrigin:num
 * @text Height Origin
 * @parent LineSettings
 * @desc The rate from the battler's sprite base to determine where the line starts from.
 * @default 0.8
 *
 * @param LineColor:str
 * @text Line Color
 * @parent LineSettings
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ff0000
 *
 * @param Opacity:num
 * @text Opacity
 * @parent LineSettings
 * @type number
 * @min 1
 * @max 255
 * @desc The highest possible opacity for active provoke lines.
 * @default 255
 *
 * @param OpacitySpeed:num
 * @text Opacity Speed
 * @parent Opacity:num
 * @type number
 * @min 1
 * @desc The speed at which opacity fluctuates for the line sprite.
 * @default 4
 *
 * @param Parts:num
 * @text Parts
 * @parent LineSettings
 * @type number
 * @min 1
 * @desc The number of joint parts to split up the sprite as.
 * @default 256
 *
 * @param PartsSize:num
 * @text Parts Size
 * @parent Parts:num
 * @type number
 * @min 1
 * @desc The number in pixels for the diameter of each part.
 * @default 5
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Provoke Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Provoke Origin' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Provoke Origin
 *
 */
/* ----------------------------------------------------------------------------
 * Taunt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Taunt:
 *
 * @param Dependency
 * @text VisuMZ_0_CoreEngine
 * @default VisuMZ_1_BattleCore
 *
 * @param ShowAnimation:eval
 * @text Show Animations?
 * @parent Dependency
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show animations for each of the taunt effects?
 * Requires VisuMZ_0_CoreEngine and VisuMZ_1_BattleCore.
 * @default true
 *
 * @param AnimationID
 * @text Animation ID's
 *
 * @param AniPhysical:num
 * @text Physical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for physical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 13
 *
 * @param AniMagical:num
 * @text Magical Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for magical taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 14
 *
 * @param AniCertain:num
 * @text Certain Hit Taunt
 * @parent AnimationID
 * @type animation
 * @desc The animation ID used for certain hit taunts.
 * Use 0 or 'None' to bypass this type.
 * @default 15
 *
 * @param AnimationSettings
 * @text Animation Settings
 *
 * @param CycleTime:num
 * @text Cycle Time
 * @parent AnimationSettings
 * @type number
 * @min 1
 * @desc The amount of frames to wait before each animation cycle.
 * WARNING: Lower numbers can jeopardize game performance.
 * @default 60
 *
 * @param MirrorActorAni:eval
 * @text Mirror Actor Ani?
 * @parent AnimationSettings
 * @type boolean
 * @on Mirror
 * @off Don't
 * @desc Mirror animations played on actors?
 * @default true
 *
 * @param MuteAnimations:eval
 * @text Mute Animation SFX?
 * @parent AnimationSettings
 * @type boolean
 * @on Mute
 * @off Don't
 * @desc Mute sounds played by animations?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Aggro Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Aggro:
 *
 * @param General
 *
 * @param PriorityHighest:eval
 * @text Priority: Highest TGR
 * @parent General
 * @type boolean
 * @on Always
 * @off Weighted
 * @desc When enemies target actors for an single target attack,
 * always target the highest members or make it weighted?
 * @default true
 *
 * @param AggroPerDmg:num
 * @text Aggro Per Damage
 * @parent General
 * @desc The amount of aggro generated per point of HP damage dealt to an enemy.
 * @default 0.1
 *
 * @param AggroPerHeal:num
 * @text Aggro Per Heal
 * @parent General
 * @desc The amount of aggro generated per point of HP recovered to an ally.
 * @default 0.5
 *
 * @param Gauge
 *
 * @param VisibleGauge:eval
 * @text Visible Battler Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge over an SV actor's head to show
 * current aggro level compared to other party members.
 * @default false
 *
 * @param StatusGauge:eval
 * @text Visible Status Gauge
 * @parent Gauge
 * @type boolean
 * @on Visible
 * @off None
 * @desc Display an aggro gauge in the Battle Status Window
 * to show the current aggro level compared to others.
 * @default true
 *
 * @param GaugeColor1:str
 * @text Gauge Color 1
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #959595
 *
 * @param GaugeColor2:str
 * @text Gauge Color 2
 * @parent Gauge
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Gauge
 * @desc Where do you want the Aggro Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Gauge
 * @desc How large/small do you want the Aggro Gauge to be scaled?
 * @default 0.5
 * 
 * @param BattlerGauge
 * @text Battler Gauge
 * @parent Gauge
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent BattlerGauge
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +2
 * 
 * @param BattleStatus
 * @text Battle Status Gauge
 * @parent Gauge
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's X by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How many pixels to offset the Aggro Gauge's Y by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show Aggro Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustOptionsRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param OptionName:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show Aggro Gauge
 *
 */
//=============================================================================

const _0x2482a2=_0x4e6d;(function(_0x59e60c,_0x4b26a7){const _0x339c57=_0x4e6d,_0x8a3d8c=_0x59e60c();while(!![]){try{const _0x390105=-parseInt(_0x339c57(0x9f))/0x1*(-parseInt(_0x339c57(0xe6))/0x2)+parseInt(_0x339c57(0x15d))/0x3+-parseInt(_0x339c57(0x19c))/0x4+-parseInt(_0x339c57(0x131))/0x5*(-parseInt(_0x339c57(0x1ec))/0x6)+parseInt(_0x339c57(0x1a4))/0x7+parseInt(_0x339c57(0x102))/0x8*(-parseInt(_0x339c57(0x103))/0x9)+-parseInt(_0x339c57(0x99))/0xa*(-parseInt(_0x339c57(0x137))/0xb);if(_0x390105===_0x4b26a7)break;else _0x8a3d8c['push'](_0x8a3d8c['shift']());}catch(_0x3752cf){_0x8a3d8c['push'](_0x8a3d8c['shift']());}}}(_0x3b8e,0xa837b));var label=_0x2482a2(0xea),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x33f006){const _0x155a1d=_0x2482a2;return _0x33f006[_0x155a1d(0x169)]&&_0x33f006[_0x155a1d(0x109)][_0x155a1d(0x181)]('['+label+']');})[0x0];function _0x4e6d(_0x2f82a5,_0x4a77d7){const _0x3b8edf=_0x3b8e();return _0x4e6d=function(_0x4e6d90,_0x590d09){_0x4e6d90=_0x4e6d90-0x6f;let _0x52285b=_0x3b8edf[_0x4e6d90];return _0x52285b;},_0x4e6d(_0x2f82a5,_0x4a77d7);}VisuMZ[label][_0x2482a2(0x106)]=VisuMZ[label][_0x2482a2(0x106)]||{},VisuMZ[_0x2482a2(0x18e)]=function(_0x35681f,_0x2c9303){const _0x2b3679=_0x2482a2;for(const _0x57f8fc in _0x2c9303){if(_0x57f8fc['match'](/(.*):(.*)/i)){const _0x21f7c3=String(RegExp['$1']),_0xbb3078=String(RegExp['$2'])['toUpperCase']()[_0x2b3679(0x7c)]();let _0x230f24,_0x7fc71b,_0x5d92ad;switch(_0xbb3078){case _0x2b3679(0x138):_0x230f24=_0x2c9303[_0x57f8fc]!==''?Number(_0x2c9303[_0x57f8fc]):0x0;break;case _0x2b3679(0x19f):_0x7fc71b=_0x2c9303[_0x57f8fc]!==''?JSON[_0x2b3679(0x130)](_0x2c9303[_0x57f8fc]):[],_0x230f24=_0x7fc71b[_0x2b3679(0xa0)](_0x30a735=>Number(_0x30a735));break;case _0x2b3679(0x156):_0x230f24=_0x2c9303[_0x57f8fc]!==''?eval(_0x2c9303[_0x57f8fc]):null;break;case _0x2b3679(0x132):_0x7fc71b=_0x2c9303[_0x57f8fc]!==''?JSON[_0x2b3679(0x130)](_0x2c9303[_0x57f8fc]):[],_0x230f24=_0x7fc71b[_0x2b3679(0xa0)](_0x257fc9=>eval(_0x257fc9));break;case _0x2b3679(0x16e):_0x230f24=_0x2c9303[_0x57f8fc]!==''?JSON[_0x2b3679(0x130)](_0x2c9303[_0x57f8fc]):'';break;case _0x2b3679(0xe2):_0x7fc71b=_0x2c9303[_0x57f8fc]!==''?JSON['parse'](_0x2c9303[_0x57f8fc]):[],_0x230f24=_0x7fc71b['map'](_0x349662=>JSON['parse'](_0x349662));break;case'FUNC':_0x230f24=_0x2c9303[_0x57f8fc]!==''?new Function(JSON['parse'](_0x2c9303[_0x57f8fc])):new Function(_0x2b3679(0x177));break;case'ARRAYFUNC':_0x7fc71b=_0x2c9303[_0x57f8fc]!==''?JSON['parse'](_0x2c9303[_0x57f8fc]):[],_0x230f24=_0x7fc71b[_0x2b3679(0xa0)](_0x46c63c=>new Function(JSON[_0x2b3679(0x130)](_0x46c63c)));break;case _0x2b3679(0x1bd):_0x230f24=_0x2c9303[_0x57f8fc]!==''?String(_0x2c9303[_0x57f8fc]):'';break;case _0x2b3679(0x170):_0x7fc71b=_0x2c9303[_0x57f8fc]!==''?JSON[_0x2b3679(0x130)](_0x2c9303[_0x57f8fc]):[],_0x230f24=_0x7fc71b[_0x2b3679(0xa0)](_0x240b42=>String(_0x240b42));break;case _0x2b3679(0x70):_0x5d92ad=_0x2c9303[_0x57f8fc]!==''?JSON[_0x2b3679(0x130)](_0x2c9303[_0x57f8fc]):{},_0x230f24=VisuMZ['ConvertParams']({},_0x5d92ad);break;case _0x2b3679(0x1a0):_0x7fc71b=_0x2c9303[_0x57f8fc]!==''?JSON['parse'](_0x2c9303[_0x57f8fc]):[],_0x230f24=_0x7fc71b[_0x2b3679(0xa0)](_0x5ca83b=>VisuMZ[_0x2b3679(0x18e)]({},JSON[_0x2b3679(0x130)](_0x5ca83b)));break;default:continue;}_0x35681f[_0x21f7c3]=_0x230f24;}}return _0x35681f;},(_0x4df54c=>{const _0x3a9a5d=_0x2482a2,_0x499101=_0x4df54c[_0x3a9a5d(0x18d)];for(const _0x5971c5 of dependencies){if(!Imported[_0x5971c5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x499101,_0x5971c5)),SceneManager[_0x3a9a5d(0x126)]();break;}}const _0x3af713=_0x4df54c['description'];if(_0x3af713[_0x3a9a5d(0x128)](/\[Version[ ](.*?)\]/i)){const _0x2538a0=Number(RegExp['$1']);_0x2538a0!==VisuMZ[label][_0x3a9a5d(0x1eb)]&&(alert(_0x3a9a5d(0x1e8)[_0x3a9a5d(0x124)](_0x499101,_0x2538a0)),SceneManager[_0x3a9a5d(0x126)]());}if(_0x3af713[_0x3a9a5d(0x128)](/\[Tier[ ](\d+)\]/i)){const _0x58c447=Number(RegExp['$1']);_0x58c447<tier?(alert(_0x3a9a5d(0x12e)[_0x3a9a5d(0x124)](_0x499101,_0x58c447,tier)),SceneManager['exit']()):tier=Math['max'](_0x58c447,tier);}VisuMZ[_0x3a9a5d(0x18e)](VisuMZ[label][_0x3a9a5d(0x106)],_0x4df54c[_0x3a9a5d(0x129)]);})(pluginData),PluginManager[_0x2482a2(0x1cd)](pluginData[_0x2482a2(0x18d)],_0x2482a2(0xb1),_0x5b54b0=>{const _0x1cebce=_0x2482a2;if(!$gameParty[_0x1cebce(0x175)]())return;VisuMZ['ConvertParams'](_0x5b54b0,_0x5b54b0);const _0x126678=$gameActors[_0x1cebce(0x121)](_0x5b54b0[_0x1cebce(0x1c2)]),_0x1f6d29=_0x5b54b0['Aggro'];if(_0x126678)_0x126678['gainAggro'](_0x1f6d29);}),PluginManager[_0x2482a2(0x1cd)](pluginData['name'],'ActorSetAggro',_0x13d607=>{const _0x394c21=_0x2482a2;if(!$gameParty['inBattle']())return;VisuMZ[_0x394c21(0x18e)](_0x13d607,_0x13d607);const _0x16295f=$gameActors[_0x394c21(0x121)](_0x13d607[_0x394c21(0x1c2)]),_0x48d8af=_0x13d607['Aggro'];if(_0x16295f)_0x16295f['setAggro'](_0x48d8af);}),PluginManager['registerCommand'](pluginData[_0x2482a2(0x18d)],'EnemyChangeAggro',_0x56f5ff=>{const _0x53f287=_0x2482a2;if(!$gameParty[_0x53f287(0x175)]())return;VisuMZ[_0x53f287(0x18e)](_0x56f5ff,_0x56f5ff);const _0x1ffeed=$gameTroop['members']()[_0x56f5ff[_0x53f287(0x11d)]],_0x4a1e88=_0x56f5ff[_0x53f287(0x1ea)];if(_0x1ffeed)_0x1ffeed['gainAggro'](_0x4a1e88);}),PluginManager[_0x2482a2(0x1cd)](pluginData[_0x2482a2(0x18d)],_0x2482a2(0x79),_0x3d01b5=>{const _0x264175=_0x2482a2;if(!$gameParty[_0x264175(0x175)]())return;VisuMZ[_0x264175(0x18e)](_0x3d01b5,_0x3d01b5);const _0x18c5fc=$gameTroop[_0x264175(0x10c)]()[_0x3d01b5['EnemyIndex']],_0x295d91=_0x3d01b5[_0x264175(0x1ea)];if(_0x18c5fc)_0x18c5fc[_0x264175(0x176)](_0x295d91);}),DataManager[_0x2482a2(0xb0)]=function(_0x3423f6){const _0x297306=_0x2482a2;if(!_0x3423f6)return![];return _0x3423f6['note'][_0x297306(0x128)](/<PROVOKE>/i);},DataManager['isBypassProvoke']=function(_0x872fd5){const _0x24ea60=_0x2482a2;if(!_0x872fd5)return![];return _0x872fd5[_0x24ea60(0xce)][_0x24ea60(0x128)](/<BYPASS PROVOKE>/i);},DataManager[_0x2482a2(0x160)]=function(_0x15697f){const _0x37bf1f=_0x2482a2;if(!_0x15697f)return![];return _0x15697f[_0x37bf1f(0xce)][_0x37bf1f(0x128)](/<BYPASS TAUNT>/i);},DataManager[_0x2482a2(0xb7)]=function(_0x3891d4){if(!_0x3891d4)return![];return _0x3891d4['note']['match'](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},DataManager[_0x2482a2(0x14b)]=function(_0x9cd1b){const _0x597752=_0x2482a2;if(!_0x9cd1b)return![];return _0x9cd1b[_0x597752(0xce)][_0x597752(0x128)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i);},ImageManager[_0x2482a2(0x12c)]=function(){const _0x5748e9=_0x2482a2;if(this[_0x5748e9(0xd6)])return this[_0x5748e9(0xd6)];return this[_0x5748e9(0xd6)]=new Bitmap(0x64,0x64),this[_0x5748e9(0xd6)]['drawCircle'](0x32,0x32,0x32,ColorManager[_0x5748e9(0x1b0)]()),this['_provokeBitmap'][_0x5748e9(0x1d5)]=![],this[_0x5748e9(0xd6)];},ConfigManager[_0x2482a2(0x12f)]=!![],ConfigManager[_0x2482a2(0xdc)]=!![],VisuMZ['AggroControlSystem'][_0x2482a2(0x1c3)]=ConfigManager[_0x2482a2(0x14c)],ConfigManager[_0x2482a2(0x14c)]=function(){const _0x3cd2c=_0x2482a2,_0x2f69ad=VisuMZ['AggroControlSystem'][_0x3cd2c(0x1c3)][_0x3cd2c(0x104)](this);return _0x2f69ad['aggroGauge']=this[_0x3cd2c(0x12f)],_0x2f69ad[_0x3cd2c(0xdc)]=this[_0x3cd2c(0xdc)],_0x2f69ad;},VisuMZ[_0x2482a2(0xea)]['ConfigManager_applyData']=ConfigManager[_0x2482a2(0x8c)],ConfigManager[_0x2482a2(0x8c)]=function(_0x237e10){const _0xa0bb81=_0x2482a2;VisuMZ[_0xa0bb81(0xea)]['ConfigManager_applyData']['call'](this,_0x237e10),_0xa0bb81(0x12f)in _0x237e10?this[_0xa0bb81(0x12f)]=_0x237e10[_0xa0bb81(0x12f)]:this[_0xa0bb81(0x12f)]=!![],_0xa0bb81(0xdc)in _0x237e10?this[_0xa0bb81(0xdc)]=_0x237e10['provokeOrigin']:this['provokeOrigin']=!![];},TextManager[_0x2482a2(0x12f)]=VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x106)][_0x2482a2(0x1ea)][_0x2482a2(0x18f)],TextManager[_0x2482a2(0xdc)]=VisuMZ['AggroControlSystem'][_0x2482a2(0x106)]['Provoke'][_0x2482a2(0x18f)],ColorManager[_0x2482a2(0x19b)]=function(_0x4b7aba,_0x733a58){const _0x4096ac=_0x2482a2;return _0x733a58=String(_0x733a58),this['_colorCache']=this[_0x4096ac(0x16f)]||{},_0x733a58[_0x4096ac(0x128)](/#(.*)/i)?this['_colorCache'][_0x4b7aba]='#%1'['format'](String(RegExp['$1'])):this['_colorCache'][_0x4b7aba]=this[_0x4096ac(0x149)](Number(_0x733a58)),this[_0x4096ac(0x16f)][_0x4b7aba];},ColorManager[_0x2482a2(0xf7)]=function(_0x318caf){const _0x44653f=_0x2482a2;return _0x318caf=String(_0x318caf),_0x318caf[_0x44653f(0x128)](/#(.*)/i)?_0x44653f(0x16a)[_0x44653f(0x124)](String(RegExp['$1'])):this[_0x44653f(0x149)](Number(_0x318caf));},ColorManager[_0x2482a2(0x1b0)]=function(){const _0x3de7c0=_0x2482a2,_0xcbaee4=_0x3de7c0(0xa3);this[_0x3de7c0(0x16f)]=this[_0x3de7c0(0x16f)]||{};if(this[_0x3de7c0(0x16f)][_0xcbaee4])return this[_0x3de7c0(0x16f)][_0xcbaee4];const _0x567bcb=VisuMZ['AggroControlSystem'][_0x3de7c0(0x106)][_0x3de7c0(0x10b)][_0x3de7c0(0xa9)];return this[_0x3de7c0(0x19b)](_0xcbaee4,_0x567bcb);},ColorManager[_0x2482a2(0x13b)]=function(){const _0x471240=_0x2482a2,_0x314bc8='aggro-gauge-color-1';this[_0x471240(0x16f)]=this['_colorCache']||{};if(this[_0x471240(0x16f)][_0x314bc8])return this[_0x471240(0x16f)][_0x314bc8];const _0x4c4869=VisuMZ['AggroControlSystem'][_0x471240(0x106)][_0x471240(0x1ea)]['GaugeColor1'];return this[_0x471240(0x19b)](_0x314bc8,_0x4c4869);},ColorManager[_0x2482a2(0xcd)]=function(){const _0x4a90cc=_0x2482a2,_0x30d620=_0x4a90cc(0x1a8);this[_0x4a90cc(0x16f)]=this['_colorCache']||{};if(this[_0x4a90cc(0x16f)][_0x30d620])return this[_0x4a90cc(0x16f)][_0x30d620];const _0x9340bb=VisuMZ['AggroControlSystem'][_0x4a90cc(0x106)][_0x4a90cc(0x1ea)][_0x4a90cc(0x151)];return this[_0x4a90cc(0x19b)](_0x30d620,_0x9340bb);},SceneManager[_0x2482a2(0x111)]=function(){const _0x335bd3=_0x2482a2;return this[_0x335bd3(0x113)]&&this[_0x335bd3(0x113)]['constructor']===Scene_Battle;},BattleManager['convertBattleTargetToString']=function(_0x2728e2){const _0x33a9e6=_0x2482a2;let _0x2d9c2a=this[_0x33a9e6(0x193)];this[_0x33a9e6(0xd8)]&&(_0x2d9c2a=this[_0x33a9e6(0xd8)]);if(!_0x2d9c2a)return null;if(_0x2d9c2a[_0x33a9e6(0x17d)]()&&_0x2728e2['isEnemy']())return'Battle\x20Actor\x20%1'['format'](_0x2d9c2a['actorId']());else{if(_0x2d9c2a[_0x33a9e6(0x105)]()&&_0x2728e2[_0x33a9e6(0x17d)]())return'Battle\x20Enemy\x20%1'[_0x33a9e6(0x124)](_0x2d9c2a[_0x33a9e6(0x10e)]());}return null;},BattleManager[_0x2482a2(0x12d)]=function(_0x1f0ba1){const _0x3463e7=_0x2482a2;if(!_0x1f0ba1)return null;if(_0x1f0ba1['match'](/BATTLE ACTOR (\d+)/i))return $gameActors['actor'](Number(RegExp['$1']));else{if(_0x1f0ba1[_0x3463e7(0x128)](/BATTLE ENEMY (\d+)/i))return $gameTroop[_0x3463e7(0x10c)]()[Number(RegExp['$1'])];}return null;},BattleManager[_0x2482a2(0x118)]=function(){const _0x12d1c2=_0x2482a2;return VisuMZ['AggroControlSystem']['Settings'][_0x12d1c2(0x1ea)]['PriorityHighest'];},VisuMZ['AggroControlSystem'][_0x2482a2(0xa2)]=Game_Action[_0x2482a2(0xff)]['getSpecificBattlerKeyTarget'],Game_Action[_0x2482a2(0xff)][_0x2482a2(0x1d4)]=function(){const _0x50ef6b=_0x2482a2;let _0x665baf=VisuMZ[_0x50ef6b(0xea)]['Game_Action_getSpecificBattlerKeyTarget'][_0x50ef6b(0x104)](this);if(this['_checkingAggroTarget'])return _0x665baf;this['_checkingAggroTarget']=!![];if(_0x665baf&&_0x665baf[_0x50ef6b(0x17d)]()!==this[_0x50ef6b(0x1c8)]()[_0x50ef6b(0x17d)]()){this['_targetIndex']=-0x1;if(this[_0x50ef6b(0x71)]())_0x665baf=this[_0x50ef6b(0x1c8)]()['provoker']();else{if(this[_0x50ef6b(0x1a9)]()){this[_0x50ef6b(0x146)]=![];const _0x10f622=this['item']()['hitType'],_0x3f4093=this[_0x50ef6b(0x1da)]()[_0x50ef6b(0x162)](_0x10f622);!_0x3f4093[_0x50ef6b(0x181)](_0x665baf)&&(_0x665baf=_0x3f4093[Math[_0x50ef6b(0x166)](_0x3f4093[_0x50ef6b(0x17e)])]);}else this[_0x50ef6b(0x1d3)]()&&(this[_0x50ef6b(0x146)]=![],_0x665baf=this[_0x50ef6b(0x1da)]()[_0x50ef6b(0x1aa)]());}}return this['_checkingAggroTarget']=![],_0x665baf;},VisuMZ[_0x2482a2(0xea)]['Game_Action_targetsForAlive']=Game_Action[_0x2482a2(0xff)][_0x2482a2(0xe9)],Game_Action['prototype']['targetsForAlive']=function(_0x495810){const _0x2b6c39=_0x2482a2;if(this[_0x2b6c39(0x71)]())return this[_0x2b6c39(0x161)]();else{if(this['isTauntAffected']())return this[_0x2b6c39(0xf3)](_0x495810);else return this[_0x2b6c39(0x1d3)]()?(_0x495810[_0x2b6c39(0xbd)](),[_0x495810[_0x2b6c39(0x1aa)]()]):VisuMZ[_0x2b6c39(0xea)]['Game_Action_targetsForAlive']['call'](this,_0x495810);}},Game_Action['prototype']['isNotEnemySelectAction']=function(){const _0x4e66ae=_0x2482a2;if(this['isForAnyone']&&this[_0x4e66ae(0x17c)]()&&this[_0x4e66ae(0x110)]()){const _0x26b8c8=this[_0x4e66ae(0x91)]();return _0x26b8c8[_0x4e66ae(0x17e)]>=0x1&&_0x26b8c8[0x0]&&_0x26b8c8[0x0]['isActor']()===this[_0x4e66ae(0x1c8)]()[_0x4e66ae(0x17d)]();}else{if(this[_0x4e66ae(0x1ab)]()[_0x4e66ae(0x1b3)]!==0x1)return!![];}return![];},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0xee)]=Game_Action[_0x2482a2(0xff)]['itemTargetCandidates'],Game_Action[_0x2482a2(0xff)][_0x2482a2(0xc1)]=function(){const _0xc5e1d6=_0x2482a2;let _0x2105d3=VisuMZ[_0xc5e1d6(0xea)]['Game_Action_itemTargetCandidates']['call'](this);if(this[_0xc5e1d6(0x145)]()){if(this['isProvokeAffected']()&&_0x2105d3[_0xc5e1d6(0x181)](this[_0xc5e1d6(0x1c8)]()[_0xc5e1d6(0x9b)]()))return this[_0xc5e1d6(0x161)]();else{if(this[_0xc5e1d6(0x1a9)]()){const _0x29b89c=this[_0xc5e1d6(0x1da)]();if(this[_0xc5e1d6(0x188)]()&&_0x29b89c[_0xc5e1d6(0x98)]()[_0xc5e1d6(0x17e)]>0x0)return _0x2105d3[_0xc5e1d6(0xae)](_0x1a293c=>_0x29b89c[_0xc5e1d6(0x98)]()[_0xc5e1d6(0x181)](_0x1a293c));else{if(this[_0xc5e1d6(0x122)]()&&_0x29b89c['magicalTauntMembers']()[_0xc5e1d6(0x17e)]>0x0)return _0x2105d3[_0xc5e1d6(0xae)](_0x382117=>_0x29b89c['magicalTauntMembers']()['includes'](_0x382117));else{if(this[_0xc5e1d6(0x1c5)]()&&_0x29b89c[_0xc5e1d6(0x182)]()[_0xc5e1d6(0x17e)]>0x0)return _0x2105d3[_0xc5e1d6(0xae)](_0x2962ef=>_0x29b89c[_0xc5e1d6(0x182)]()[_0xc5e1d6(0x181)](_0x2962ef));}}}}}return _0x2105d3;},Game_Action['prototype']['isProvokeAffected']=function(){const _0x2b3d69=_0x2482a2;if(!$gameParty[_0x2b3d69(0x175)]())return![];if(!this['item']())return![];if(this[_0x2b3d69(0x19a)]())return![];if(!this[_0x2b3d69(0x110)]())return![];if(DataManager[_0x2b3d69(0x17f)](this[_0x2b3d69(0x1ab)]()))return![];if(this[_0x2b3d69(0x1c8)]()['bypassProvoke']())return![];if(!this['subject']()[_0x2b3d69(0x71)]())return![];const _0x4d974a=this['subject']()[_0x2b3d69(0x9b)]();if(_0x4d974a['isDead']())return![];return!![];},Game_Action[_0x2482a2(0xff)][_0x2482a2(0x161)]=function(){const _0x3f93f5=_0x2482a2;return[this[_0x3f93f5(0x1c8)]()[_0x3f93f5(0x9b)]()];},Game_Action[_0x2482a2(0xff)]['isTauntAffected']=function(){const _0x5544af=_0x2482a2;if(!$gameParty[_0x5544af(0x175)]())return![];if(!this[_0x5544af(0x1ab)]())return![];if(this['isNotEnemySelectAction']())return![];if(!this['needsSelection']())return![];if(DataManager['isBypassTaunt'](this[_0x5544af(0x1ab)]()))return![];if(this[_0x5544af(0x1c8)]()['bypassTaunt']())return![];const _0x396329=this[_0x5544af(0x1da)]();let _0xf6bf9e=![];if(this[_0x5544af(0x188)]()&&_0x396329[_0x5544af(0x98)]()[_0x5544af(0x17e)]>0x0)_0xf6bf9e=!![];if(this[_0x5544af(0x122)]()&&_0x396329['magicalTauntMembers']()['length']>0x0)_0xf6bf9e=!![];if(this[_0x5544af(0x1c5)]()&&_0x396329['certainHitTauntMembers']()[_0x5544af(0x17e)]>0x0)_0xf6bf9e=!![];return _0xf6bf9e;},Game_Action['prototype'][_0x2482a2(0xf3)]=function(_0x1508b2){const _0x3cb267=_0x2482a2;if(this[_0x3cb267(0x125)]<0x0)return[_0x1508b2['randomTauntTarget'](this['item']()[_0x3cb267(0x1ed)])];else{const _0x1f1409=_0x1508b2[_0x3cb267(0xdb)](this['_targetIndex']);return _0x1f1409[_0x3cb267(0x1e5)](this[_0x3cb267(0x1ab)]()[_0x3cb267(0x1ed)])?[_0x1f1409]:[_0x1508b2['randomTauntTarget']()];}},Game_Action[_0x2482a2(0xff)][_0x2482a2(0x1d3)]=function(){const _0xbff16a=_0x2482a2;if(!$gameParty[_0xbff16a(0x175)]())return![];if(this[_0xbff16a(0x19a)]())return![];if(this[_0xbff16a(0x125)]>=0x0)return![];if(Imported[_0xbff16a(0x8b)]&&this[_0xbff16a(0x1c8)]()['isEnemy']()){const _0x4fb91a=this[_0xbff16a(0x1ab)]()['note']||'',_0x5f36fc=AIManager[_0xbff16a(0xf2)];if(_0x4fb91a['match'](_0x5f36fc[_0xbff16a(0xbc)]))return![];}if(DataManager[_0xbff16a(0xb7)](this['item']()))return![];if(this[_0xbff16a(0x1c8)]()[_0xbff16a(0x17a)]())return![];if(DataManager[_0xbff16a(0x14b)](this[_0xbff16a(0x1ab)]()))return!![];if(this[_0xbff16a(0x1c8)]()[_0xbff16a(0x14b)]())return!![];if(this[_0xbff16a(0x1c8)]()[_0xbff16a(0x17d)]())return![];return BattleManager[_0xbff16a(0x118)]();},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x183)]=Game_Action[_0x2482a2(0xff)]['applyGlobal'],Game_Action[_0x2482a2(0xff)]['applyGlobal']=function(){const _0x1a3652=_0x2482a2;VisuMZ[_0x1a3652(0xea)][_0x1a3652(0x183)][_0x1a3652(0x104)](this),this[_0x1a3652(0x1d6)]();},Game_Action[_0x2482a2(0xff)][_0x2482a2(0x1d6)]=function(){const _0x23fd38=_0x2482a2,_0x43e430=this[_0x23fd38(0x1ab)]()[_0x23fd38(0xce)];if(_0x43e430[_0x23fd38(0x128)](/<(?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT): ([\+\-]\d+)>/i)){const _0x46ed01=Number(RegExp['$1']);this[_0x23fd38(0x1c8)]()[_0x23fd38(0xed)](_0x46ed01);}if(_0x43e430[_0x23fd38(0x128)](/<JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>\s*([\s\S]*)\s*<\/JS (?:USER AGGRO|AGGRO|USER ENMITY|ENMITY|USER THREAT|THREAT)>/i)){const _0x4e7859=String(RegExp['$1']);window[_0x23fd38(0xd0)]=this[_0x23fd38(0x1c8)](),window[_0x23fd38(0x1ab)]=this[_0x23fd38(0x1ab)](),window['a']=this[_0x23fd38(0x1c8)](),window['b']=a,window[_0x23fd38(0xcb)]=user[_0x23fd38(0x1e6)]();try{eval(_0x4e7859);}catch(_0x4506d2){if($gameTemp[_0x23fd38(0x116)]())console['log'](_0x4506d2);}user[_0x23fd38(0x176)](window[_0x23fd38(0xcb)]),window[_0x23fd38(0xd0)]=undefined,window[_0x23fd38(0x114)]=undefined,window['item']=undefined,window['a']=undefined,window['b']=undefined,window['value']=undefined;}},VisuMZ['AggroControlSystem'][_0x2482a2(0xbf)]=Game_Action[_0x2482a2(0xff)][_0x2482a2(0x1bf)],Game_Action[_0x2482a2(0xff)][_0x2482a2(0x1bf)]=function(_0x3a4002){const _0x529c45=_0x2482a2;VisuMZ[_0x529c45(0xea)][_0x529c45(0xbf)][_0x529c45(0x104)](this,_0x3a4002),this[_0x529c45(0x87)](_0x3a4002);},Game_Action[_0x2482a2(0xff)][_0x2482a2(0x87)]=function(_0x2d4b51){const _0x2ca548=_0x2482a2;if(!this[_0x2ca548(0x1ab)]())return;if(!SceneManager['isSceneBattle']())return;const _0x4d014a=this[_0x2ca548(0x1ab)]()[_0x2ca548(0xce)];if(_0x4d014a['match'](/<TARGET (?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)){const _0x560ef2=Number(RegExp['$1']);_0x2d4b51[_0x2ca548(0xed)](_0x560ef2);}if(_0x4d014a[_0x2ca548(0x128)](/<JS TARGET (?:AGGRO|ENMITY|THREAT)>\s*([\s\S]*)\s*<\/JS TARGET (?:AGGRO|ENMITY|THREAT)>/i)){const _0x39020e=String(RegExp['$1']);window['user']=this[_0x2ca548(0x1c8)](),window[_0x2ca548(0x114)]=_0x2d4b51,window[_0x2ca548(0x1ab)]=this[_0x2ca548(0x1ab)](),window['a']=this[_0x2ca548(0x1c8)](),window['b']=_0x2d4b51,window[_0x2ca548(0xcb)]=_0x2d4b51[_0x2ca548(0x1e6)]();try{eval(_0x39020e);}catch(_0x3106e6){if($gameTemp['isPlaytest']())console[_0x2ca548(0xf5)](_0x3106e6);}_0x2d4b51[_0x2ca548(0x176)](window[_0x2ca548(0xcb)]),window['user']=undefined,window[_0x2ca548(0x114)]=undefined,window[_0x2ca548(0x1ab)]=undefined,window['a']=undefined,window['b']=undefined,window[_0x2ca548(0xcb)]=undefined;}},VisuMZ[_0x2482a2(0xea)]['Game_Action_executeHpDamage']=Game_Action['prototype']['executeHpDamage'],Game_Action[_0x2482a2(0xff)][_0x2482a2(0xef)]=function(_0x2396ab,_0x4d3e4b){const _0x1600bf=_0x2482a2;VisuMZ[_0x1600bf(0xea)]['Game_Action_executeHpDamage'][_0x1600bf(0x104)](this,_0x2396ab,_0x4d3e4b),this['executeHpDamageAggroControl'](_0x2396ab,_0x4d3e4b);},Game_Action[_0x2482a2(0xff)][_0x2482a2(0xc9)]=function(_0x3f1df4,_0x4361cb){const _0x4e2d62=_0x2482a2,_0x3448bb=VisuMZ[_0x4e2d62(0xea)][_0x4e2d62(0x106)][_0x4e2d62(0x1ea)];if(_0x4361cb>0x0&&_0x3f1df4[_0x4e2d62(0x17d)]()!==this[_0x4e2d62(0x1c8)]()[_0x4e2d62(0x17d)]()){const _0x315825=_0x3448bb['AggroPerDmg'];this['subject']()[_0x4e2d62(0xed)](_0x315825*_0x4361cb);}if(_0x4361cb<0x0&&_0x3f1df4[_0x4e2d62(0x17d)]()===this[_0x4e2d62(0x1c8)]()[_0x4e2d62(0x17d)]()){const _0x1fdaec=_0x3448bb[_0x4e2d62(0x133)];this['subject']()[_0x4e2d62(0xed)](_0x1fdaec*Math[_0x4e2d62(0x190)](_0x4361cb));}},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0xc4)]=Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x180)],Game_BattlerBase[_0x2482a2(0xff)]['initMembers']=function(){const _0x2dd126=_0x2482a2;this[_0x2dd126(0xf9)]={},VisuMZ['AggroControlSystem'][_0x2dd126(0xc4)][_0x2dd126(0x104)](this),this[_0x2dd126(0x184)]();},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x184)]=function(){const _0x4feece=_0x2482a2;this['clearProvokers'](),this[_0x4feece(0x136)]();},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x15f)]=function(){const _0x16723c=_0x2482a2;this[_0x16723c(0x1e0)]={};},VisuMZ['AggroControlSystem']['Game_BattlerBase_refresh']=Game_BattlerBase['prototype'][_0x2482a2(0x178)],Game_BattlerBase['prototype'][_0x2482a2(0x178)]=function(){const _0x59fd2b=_0x2482a2;this['_cache']={},VisuMZ['AggroControlSystem'][_0x59fd2b(0x1d7)][_0x59fd2b(0x104)](this),this[_0x59fd2b(0x186)]();},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x11e)]=function(_0x537bcd){const _0x178aeb=_0x2482a2;return this[_0x178aeb(0xf9)]=this['_cache']||{},this[_0x178aeb(0xf9)][_0x537bcd]!==undefined;},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x9b)]=function(){const _0x339711=_0x2482a2;for(const _0x5cb3ca of this[_0x339711(0x1b8)]()){if(DataManager['stateHasProvoke'](_0x5cb3ca)){if(this[_0x339711(0x1e0)]===undefined)this[_0x339711(0x15f)]();const _0xe661e5=this[_0x339711(0x1e0)][_0x5cb3ca['id']],_0x2cab32=BattleManager['convertStringToBattleTarget'](_0xe661e5);if(!_0x2cab32)continue;if(_0x2cab32[_0x339711(0x17d)]()&&!$gameParty[_0x339711(0x78)]()[_0x339711(0x181)](_0x2cab32)){this['removeState'](_0x5cb3ca['id']);continue;}if(_0x2cab32[_0x339711(0x89)]())return _0x2cab32;}}return null;},Game_BattlerBase['prototype'][_0x2482a2(0x71)]=function(){return!!this['provoker']();},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x159)]=function(){const _0x2920b8=_0x2482a2;return this[_0x2920b8(0x76)]()['some'](_0x4cf499=>_0x4cf499&&_0x4cf499[_0x2920b8(0xce)][_0x2920b8(0x128)](/<BYPASS PROVOKE>/i));},Game_BattlerBase['prototype'][_0x2482a2(0xe0)]=function(){const _0x5171e1=_0x2482a2;let _0x3bbc3c=_0x5171e1(0xe0);if(this['checkCacheKey'](_0x3bbc3c))return this[_0x5171e1(0xf9)][_0x3bbc3c];return this[_0x5171e1(0xf9)][_0x3bbc3c]=this[_0x5171e1(0x7e)](),this[_0x5171e1(0xf9)][_0x3bbc3c];},Game_BattlerBase['prototype']['createProvokeHeightOrigin']=function(){const _0x120374=_0x2482a2,_0xcdd20d=this[_0x120374(0x17d)]()?this[_0x120374(0x121)]()['note']:this[_0x120374(0x105)]()?this[_0x120374(0x1b7)]()[_0x120374(0xce)]:'';if(_0xcdd20d['match'](/<PROVOKE HEIGHT ORIGIN: (\d+)([%％])>/i))return Number(RegExp['$1'])*0.01;return VisuMZ[_0x120374(0xea)][_0x120374(0x106)]['Provoke'][_0x120374(0xd7)];},Game_BattlerBase[_0x2482a2(0xff)]['removeDeadProvokerStates']=function(){const _0x1997da=_0x2482a2;for(const _0x34e942 of this[_0x1997da(0x1b8)]()){if(DataManager[_0x1997da(0xb0)](_0x34e942)){if(this['_provoker']===undefined)this[_0x1997da(0x15f)]();const _0x483e4c=this['_provoker'][_0x34e942['id']],_0x498220=BattleManager[_0x1997da(0x12d)](_0x483e4c);if(!_0x498220)continue;_0x498220[_0x1997da(0x17d)]()&&!$gameParty[_0x1997da(0x78)]()[_0x1997da(0x181)](_0x498220)&&(this[_0x1997da(0x19e)](_0x34e942['id']),delete this[_0x1997da(0x1e0)][_0x34e942['id']]),_0x498220[_0x1997da(0xc2)]()&&(this[_0x1997da(0x19e)](_0x34e942['id']),delete this[_0x1997da(0x1e0)][_0x34e942['id']]);}}},Game_BattlerBase[_0x2482a2(0xff)]['matchTauntType']=function(_0x5e2319){const _0x57738e=_0x2482a2;switch(_0x5e2319){case Game_Action['HITTYPE_PHYSICAL']:return this[_0x57738e(0x11a)]();break;case Game_Action[_0x57738e(0x13c)]:return this[_0x57738e(0x75)]();break;case Game_Action[_0x57738e(0x1a1)]:return this[_0x57738e(0x101)]();break;}},Game_BattlerBase['prototype'][_0x2482a2(0x14f)]=function(){const _0x10f499=_0x2482a2;return this[_0x10f499(0x11a)]()||this[_0x10f499(0x75)]()||this[_0x10f499(0x101)]();},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x11a)]=function(){const _0x535bdf=_0x2482a2;return this['traitObjects']()[_0x535bdf(0x1c4)](_0x4a0f29=>_0x4a0f29&&_0x4a0f29[_0x535bdf(0xce)]['match'](/<(?:TAUNT|PHYSICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x2482a2(0xff)]['magicalTaunt']=function(){const _0x3dd4cb=_0x2482a2;return this[_0x3dd4cb(0x76)]()[_0x3dd4cb(0x1c4)](_0x471e57=>_0x471e57&&_0x471e57[_0x3dd4cb(0xce)][_0x3dd4cb(0x128)](/<(?:TAUNT|MAGICAL TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x2482a2(0xff)]['certainHitTaunt']=function(){const _0x53599a=_0x2482a2;return this[_0x53599a(0x76)]()[_0x53599a(0x1c4)](_0x385e0c=>_0x385e0c&&_0x385e0c[_0x53599a(0xce)]['match'](/<(?:TAUNT|CERTAIN TAUNT|CERTAIN HIT TAUNT|ALL TAUNT)>/i));},Game_BattlerBase[_0x2482a2(0xff)]['bypassTaunt']=function(){const _0x5355eb=_0x2482a2;return this[_0x5355eb(0x76)]()['some'](_0x47d822=>_0x47d822&&_0x47d822['note']['match'](/<BYPASS TAUNT>/i));},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x136)]=function(){const _0x5937dc=_0x2482a2;this[_0x5937dc(0x1d1)]=0x1;},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x108)]=Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x198)],Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x198)]=function(_0x13eadf){const _0x4f3389=_0x2482a2;let _0x3bc909=VisuMZ[_0x4f3389(0xea)]['Game_BattlerBase_sparam']['call'](this,_0x13eadf);if(_0x13eadf===0x0){if(this['_aggro']===undefined)this[_0x4f3389(0x136)]();_0x3bc909*=this[_0x4f3389(0x18b)](),_0x3bc909=Math[_0x4f3389(0xc3)](_0x3bc909,0x0);}return _0x3bc909;},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x176)]=function(_0x47dd47){const _0x423b5e=_0x2482a2;if(this['_aggro']===undefined)this[_0x423b5e(0x136)]();this[_0x423b5e(0x1d1)]=Math[_0x423b5e(0xc3)](0x1,Math['round'](this[_0x423b5e(0x1d1)]));},Game_BattlerBase[_0x2482a2(0xff)]['gainAggro']=function(_0x3c8f93){const _0xeab9e7=_0x2482a2;if(this[_0xeab9e7(0x1d1)]===undefined)this['clearAggro']();this[_0xeab9e7(0x1d1)]=Math[_0xeab9e7(0xc3)](0x1,this[_0xeab9e7(0x1d1)]+Math[_0xeab9e7(0x90)](_0x3c8f93));},Game_BattlerBase['prototype'][_0x2482a2(0x8f)]=function(_0x1de192){this['gainAggro'](-_0x1de192);},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x18b)]=function(){const _0x143e52=_0x2482a2;if(this[_0x143e52(0xc2)]())return 0x0;return this[_0x143e52(0x117)]()*this[_0x143e52(0xb5)]();},Game_BattlerBase[_0x2482a2(0xff)][_0x2482a2(0x1e6)]=function(){const _0x84400=_0x2482a2;return this['_aggro']===undefined&&this['clearAggro'](),this[_0x84400(0x1d1)];},Game_BattlerBase[_0x2482a2(0xff)]['baseAggro']=function(){const _0x1b2f95=_0x2482a2;return this[_0x1b2f95(0x76)]()['reduce']((_0x512c13,_0x42d15f)=>{const _0x196737=_0x1b2f95;return _0x42d15f&&_0x42d15f[_0x196737(0xce)]['match'](/<(?:AGGRO|ENMITY|THREAT): ([\+\-]\d+)>/i)?_0x512c13+Number(RegExp['$1'])/0x64:_0x512c13;},this[_0x1b2f95(0x1e6)]());},Game_BattlerBase[_0x2482a2(0xff)]['aggroMultiplier']=function(){const _0x10e07a=_0x2482a2;return this[_0x10e07a(0x76)]()[_0x10e07a(0xfc)]((_0x2c2e5e,_0x52a582)=>{const _0x5cb1bf=_0x10e07a;return _0x52a582&&_0x52a582[_0x5cb1bf(0xce)]['match'](/<(?:AGGRO|ENMITY|THREAT) MULTIPLIER: (\d+)%>/i)?_0x2c2e5e+Number(RegExp['$1'])/0x64:_0x2c2e5e;},0x1);},Game_BattlerBase['prototype'][_0x2482a2(0x17a)]=function(){const _0x516792=_0x2482a2;return this[_0x516792(0x76)]()[_0x516792(0x1c4)](_0x2854f5=>_0x2854f5&&_0x2854f5[_0x516792(0xce)]['match'](/<BYPASS HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},Game_BattlerBase['prototype'][_0x2482a2(0x14b)]=function(){const _0x5cf2a0=_0x2482a2;return this[_0x5cf2a0(0x76)]()['some'](_0x223dec=>_0x223dec&&_0x223dec['note'][_0x5cf2a0(0x128)](/<TARGET HIGHEST (?:AGGRO|ENMITY|THREAT)>/i));},VisuMZ[_0x2482a2(0xea)]['Game_Battler_onBattleStart']=Game_Battler[_0x2482a2(0xff)]['onBattleStart'],Game_Battler['prototype']['onBattleStart']=function(_0xe08e49){const _0x31da47=_0x2482a2;VisuMZ[_0x31da47(0xea)][_0x31da47(0x84)][_0x31da47(0x104)](this,_0xe08e49),this[_0x31da47(0x136)]();},VisuMZ['AggroControlSystem']['Game_Battler_onBattleEnd']=Game_Battler[_0x2482a2(0xff)][_0x2482a2(0x96)],Game_Battler['prototype'][_0x2482a2(0x96)]=function(){const _0x4f3bcd=_0x2482a2;VisuMZ[_0x4f3bcd(0xea)]['Game_Battler_onBattleEnd'][_0x4f3bcd(0x104)](this),this[_0x4f3bcd(0x136)]();},VisuMZ[_0x2482a2(0xea)]['Game_Battler_addState']=Game_Battler['prototype'][_0x2482a2(0x1b9)],Game_Battler[_0x2482a2(0xff)][_0x2482a2(0x1b9)]=function(_0x18aec1){const _0x4ebbcc=_0x2482a2;VisuMZ[_0x4ebbcc(0xea)][_0x4ebbcc(0xac)][_0x4ebbcc(0x104)](this,_0x18aec1),this[_0x4ebbcc(0xeb)](_0x18aec1)&&DataManager['isProvokeState'](_0x18aec1)&&this[_0x4ebbcc(0x1a2)](_0x18aec1);},Game_Battler[_0x2482a2(0xff)][_0x2482a2(0x1a2)]=function(_0x2d49cc){const _0x17576f=_0x2482a2;this[_0x17576f(0x1e0)]===undefined&&this[_0x17576f(0x15f)]();const _0x2a7df0=BattleManager[_0x17576f(0xad)](this);this[_0x17576f(0x1e0)][_0x2d49cc]=_0x2a7df0,!this[_0x17576f(0x1e0)][_0x2d49cc]&&delete this[_0x17576f(0x1e0)][_0x2d49cc];},DataManager['isProvokeState']=function(_0x19aae4){const _0x46df36=_0x2482a2;this[_0x46df36(0x1b5)]=this[_0x46df36(0x1b5)]||{};if(this[_0x46df36(0x1b5)][_0x19aae4]!==undefined)return this[_0x46df36(0x1b5)][_0x19aae4];let _0x274cdf=![];const _0x155e67=$dataStates[_0x19aae4],_0x1f280b=_0x155e67[_0x46df36(0xce)]||'';return _0x1f280b[_0x46df36(0x128)](/<PROVOKE>/i)&&(_0x274cdf=!![]),this[_0x46df36(0x1b5)][_0x19aae4]=_0x274cdf,_0x274cdf;},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0xe8)]=BattleManager[_0x2482a2(0x14e)],BattleManager['invokeCounterAttack']=function(_0x4512a5,_0x5ee85f){const _0x188ad5=_0x2482a2;this[_0x188ad5(0xd8)]=_0x5ee85f,VisuMZ[_0x188ad5(0xea)][_0x188ad5(0xe8)][_0x188ad5(0x104)](this,_0x4512a5,_0x5ee85f),this[_0x188ad5(0xd8)]=undefined;},VisuMZ[_0x2482a2(0xea)]['BattleManager_invokeMagicReflection']=BattleManager[_0x2482a2(0x10a)],BattleManager[_0x2482a2(0x10a)]=function(_0x5e9c8a,_0x410f7e){const _0x5b041d=_0x2482a2;this[_0x5b041d(0xd8)]=_0x410f7e,VisuMZ['AggroControlSystem']['BattleManager_invokeMagicReflection'][_0x5b041d(0x104)](this,_0x5e9c8a,_0x410f7e),this[_0x5b041d(0xd8)]=undefined;},VisuMZ[_0x2482a2(0xea)]['Game_Unit_onBattleStart']=Game_Unit[_0x2482a2(0xff)][_0x2482a2(0x1b6)],Game_Unit[_0x2482a2(0xff)][_0x2482a2(0x1b6)]=function(_0x1fb791){const _0x51f9d3=_0x2482a2;this[_0x51f9d3(0xbd)](),VisuMZ['AggroControlSystem'][_0x51f9d3(0x7f)][_0x51f9d3(0x104)](this,_0x1fb791);},Game_Unit[_0x2482a2(0xff)][_0x2482a2(0x98)]=function(){const _0x7eb4b7=_0x2482a2;return this[_0x7eb4b7(0x167)]()[_0x7eb4b7(0xae)](_0x5b2119=>_0x5b2119&&_0x5b2119[_0x7eb4b7(0x11a)]());},Game_Unit[_0x2482a2(0xff)][_0x2482a2(0x168)]=function(){const _0x1a1a5d=_0x2482a2;return this[_0x1a1a5d(0x167)]()[_0x1a1a5d(0xae)](_0x4158a3=>_0x4158a3&&_0x4158a3[_0x1a1a5d(0x75)]());},Game_Unit[_0x2482a2(0xff)][_0x2482a2(0x182)]=function(){const _0x6f119c=_0x2482a2;return this[_0x6f119c(0x167)]()['filter'](_0x5926af=>_0x5926af&&_0x5926af[_0x6f119c(0x101)]());},Game_Unit['prototype'][_0x2482a2(0x162)]=function(_0x410746){const _0x2ed22b=_0x2482a2;switch(_0x410746){case Game_Action[_0x2ed22b(0x157)]:return this['physicalTauntMembers']();break;case Game_Action['HITTYPE_MAGICAL']:return this[_0x2ed22b(0x168)]();break;case Game_Action[_0x2ed22b(0x1a1)]:return this[_0x2ed22b(0x182)]();break;}return[];},Game_Unit[_0x2482a2(0xff)]['randomTauntTarget']=function(_0x1ea770){const _0x4eb73b=_0x2482a2;let _0x300fe2=[];switch(_0x1ea770){case Game_Action[_0x4eb73b(0x157)]:_0x300fe2=this[_0x4eb73b(0x98)]();break;case Game_Action[_0x4eb73b(0x13c)]:_0x300fe2=this[_0x4eb73b(0x168)]();break;case Game_Action[_0x4eb73b(0x1a1)]:_0x300fe2=this[_0x4eb73b(0x182)]();break;}let _0x29ee45=Math[_0x4eb73b(0x191)]()*this[_0x4eb73b(0x1bb)](_0x300fe2),_0x47c6d4=null;if(BattleManager[_0x4eb73b(0x118)]()){const _0x101d06=!![];return this[_0x4eb73b(0x189)](_0x300fe2,_0x101d06);}else{for(const _0x4e2df6 of _0x300fe2){_0x29ee45-=_0x4e2df6[_0x4eb73b(0xc6)],_0x29ee45<=0x0&&!_0x47c6d4&&(_0x47c6d4=_0x4e2df6);}return _0x47c6d4||this[_0x4eb73b(0x7b)]();}},Game_Unit[_0x2482a2(0xff)]['tgrSumFromGroup']=function(_0x296486){const _0x1e15ef=_0x2482a2;return _0x296486[_0x1e15ef(0xfc)]((_0x5916c0,_0x5d7d73)=>_0x5916c0+_0x5d7d73[_0x1e15ef(0xc6)],0x0);},Game_Unit[_0x2482a2(0xff)][_0x2482a2(0xe1)]=function(){const _0x138b93=_0x2482a2,_0x1a49b6=this[_0x138b93(0x167)]()[_0x138b93(0xa0)](_0x51f1b2=>_0x51f1b2[_0x138b93(0xc6)]);return Math[_0x138b93(0xc3)](..._0x1a49b6);},Game_Unit[_0x2482a2(0xff)]['tgrMin']=function(){const _0x4f71cc=_0x2482a2,_0x3ae5cf=this[_0x4f71cc(0x167)]()[_0x4f71cc(0xa0)](_0x7dfc62=>_0x7dfc62[_0x4f71cc(0xc6)]);return Math[_0x4f71cc(0x119)](..._0x3ae5cf);},Game_Unit[_0x2482a2(0xff)][_0x2482a2(0xbd)]=function(){this['_highestTgrMember']=undefined,this['_lowestTgrMember']=undefined;},Game_Unit[_0x2482a2(0xff)][_0x2482a2(0x1aa)]=function(){const _0x52da56=_0x2482a2;if(!this[_0x52da56(0x1b4)]){const _0x30a35f=this['tgrMax'](),_0x9f3339=this[_0x52da56(0x167)]()[_0x52da56(0xae)](_0x539d64=>_0x539d64[_0x52da56(0xc6)]===_0x30a35f);this[_0x52da56(0x1b4)]=_0x9f3339[Math[_0x52da56(0x166)](_0x9f3339['length'])]||this['randomTarget']();}return this[_0x52da56(0x1b4)];},Game_Unit['prototype'][_0x2482a2(0x1e9)]=function(){const _0x889304=_0x2482a2;if(!this['_lowestTgrMember']){const _0x230326=this[_0x889304(0xfe)](),_0x95421f=this[_0x889304(0x167)]()[_0x889304(0xae)](_0x48536d=>_0x48536d['tgr']===_0x230326);this[_0x889304(0x15a)]=_0x95421f[Math['randomInt'](_0x95421f['length'])]||this[_0x889304(0x7b)]();}return this[_0x889304(0x15a)];},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x16c)]=BattleManager[_0x2482a2(0x1e4)],BattleManager[_0x2482a2(0x1e4)]=function(){const _0x3ad5ac=_0x2482a2;VisuMZ[_0x3ad5ac(0xea)][_0x3ad5ac(0x16c)][_0x3ad5ac(0x104)](this),$gameParty[_0x3ad5ac(0xbd)](),$gameTroop[_0x3ad5ac(0xbd)]();},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x148)]=BattleManager[_0x2482a2(0x13f)],BattleManager[_0x2482a2(0x13f)]=function(_0x1f2bbe){const _0x4bd239=_0x2482a2;VisuMZ[_0x4bd239(0xea)]['BattleManager_endBattle'][_0x4bd239(0x104)](this,_0x1f2bbe),$gameParty[_0x4bd239(0xbd)](),$gameTroop[_0x4bd239(0xbd)]();},Game_Unit[_0x2482a2(0xff)]['findTgrMember']=function(_0x18c195,_0x1c6bac){const _0x569f4f=_0x2482a2,_0x36c3c8=_0x18c195['map'](_0x1edaaf=>_0x1edaaf[_0x569f4f(0xc6)]),_0x106c63=_0x1c6bac?Math[_0x569f4f(0xc3)](..._0x36c3c8):Math['min'](..._0x36c3c8),_0x260d55=_0x18c195['filter'](_0x2793bb=>_0x2793bb[_0x569f4f(0xc6)]===_0x106c63);return _0x260d55[Math[_0x569f4f(0x166)](_0x260d55['length'])]||this['randomTarget']();},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x1dc)]=Scene_Options[_0x2482a2(0xff)][_0x2482a2(0x1c1)],Scene_Options[_0x2482a2(0xff)][_0x2482a2(0x1c1)]=function(){const _0x1bfcd7=_0x2482a2;let _0x393a2f=VisuMZ['AggroControlSystem'][_0x1bfcd7(0x1dc)]['call'](this);const _0x5b55c7=VisuMZ['AggroControlSystem'][_0x1bfcd7(0x106)];if(_0x5b55c7[_0x1bfcd7(0x10b)][_0x1bfcd7(0x74)]&&_0x5b55c7[_0x1bfcd7(0x10b)][_0x1bfcd7(0xd9)])_0x393a2f++;if(_0x5b55c7[_0x1bfcd7(0x1ea)]['AddOption']&&_0x5b55c7[_0x1bfcd7(0x1ea)][_0x1bfcd7(0xd9)])_0x393a2f++;return _0x393a2f;},Sprite_Battler[_0x2482a2(0xb8)]=VisuMZ[_0x2482a2(0xea)]['Settings'][_0x2482a2(0xfa)]['CycleTime'],Sprite_Battler['_physicalTauntAnimation']=VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x106)][_0x2482a2(0xfa)][_0x2482a2(0x1ae)],Sprite_Battler[_0x2482a2(0x152)]=VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x106)]['Taunt'][_0x2482a2(0x1be)],Sprite_Battler[_0x2482a2(0x155)]=VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x106)][_0x2482a2(0xfa)][_0x2482a2(0x100)],Sprite_Battler[_0x2482a2(0xba)]=VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x106)]['Taunt'][_0x2482a2(0x81)],Sprite_Battler['_muteTauntAnimations']=VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x106)][_0x2482a2(0xfa)][_0x2482a2(0xf0)],VisuMZ['AggroControlSystem']['Sprite_Battler_initialize']=Sprite_Battler['prototype'][_0x2482a2(0x1c7)],Sprite_Battler['prototype'][_0x2482a2(0x1c7)]=function(_0x334ab5){const _0x1ae0f1=_0x2482a2;VisuMZ[_0x1ae0f1(0xea)][_0x1ae0f1(0x12a)][_0x1ae0f1(0x104)](this,_0x334ab5),this[_0x1ae0f1(0x1a7)]()&&setTimeout(this[_0x1ae0f1(0xd3)][_0x1ae0f1(0x127)](this),0x3e8);},VisuMZ['AggroControlSystem'][_0x2482a2(0x1a5)]=Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x180)],Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x180)]=function(){const _0x4b1791=_0x2482a2;VisuMZ[_0x4b1791(0xea)][_0x4b1791(0x1a5)][_0x4b1791(0x104)](this),this[_0x4b1791(0x15c)]();},Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x15c)]=function(){const _0x3438f7=_0x2482a2;this[_0x3438f7(0x7d)]=VisuMZ['AggroControlSystem'][_0x3438f7(0x106)][_0x3438f7(0xfa)][_0x3438f7(0x85)],this[_0x3438f7(0x1dd)]=[_0x3438f7(0xbe),_0x3438f7(0x115),'certainHit'];},Sprite_Battler[_0x2482a2(0xff)]['isShowPriorityLines']=function(){const _0x219e36=_0x2482a2;if(!Imported[_0x219e36(0x199)])return![];if(![Sprite_Actor,Sprite_Enemy][_0x219e36(0x181)](this[_0x219e36(0xaa)]))return![];return ConfigManager[_0x219e36(0xdc)]&&VisuMZ[_0x219e36(0xea)]['Settings'][_0x219e36(0x10b)]['ShowLines'];},Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0xd3)]=function(){const _0x18552a=_0x2482a2;if(!SceneManager[_0x18552a(0x111)]())return;this['_provokeSprite']=new Sprite_ProvokeTrail(this),this[_0x18552a(0xa4)][_0x18552a(0x1d9)]()[_0x18552a(0xde)](this['_provokeSprite']);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x95)]=Sprite_Battler['prototype'][_0x2482a2(0x1ca)],Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x1ca)]=function(_0x54a2c5){const _0x5eb1ed=_0x2482a2;VisuMZ[_0x5eb1ed(0xea)][_0x5eb1ed(0x95)][_0x5eb1ed(0x104)](this,_0x54a2c5);if(this[_0x5eb1ed(0x73)])this[_0x5eb1ed(0x73)][_0x5eb1ed(0xca)]=_0x54a2c5;},VisuMZ['AggroControlSystem'][_0x2482a2(0xb3)]=Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x1b1)],Sprite_Battler['prototype'][_0x2482a2(0x1b1)]=function(){const _0x5b7b9a=_0x2482a2;VisuMZ['AggroControlSystem']['Sprite_Battler_update'][_0x5b7b9a(0x104)](this),this[_0x5b7b9a(0x1a6)]();},Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x1a6)]=function(){const _0x263392=_0x2482a2;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported['VisuMZ_1_BattleCore'])return;if(!VisuMZ[_0x263392(0xea)]['Settings']['Taunt'][_0x263392(0x10f)])return;if(!this[_0x263392(0xca)])return;this[_0x263392(0x7d)]--,this['_tauntAnimationTimer']<=0x0&&this[_0x263392(0xb6)]();},Sprite_Battler[_0x2482a2(0xff)]['startNewTauntAnimation']=function(){const _0x2a5901=_0x2482a2;this[_0x2a5901(0x7d)]=Sprite_Battler[_0x2a5901(0xb8)];if(!this[_0x2a5901(0xca)])return;if(!this[_0x2a5901(0xca)][_0x2a5901(0x14f)]())return;const _0x39f023=[this['_battler']],_0x2cdafd=this['getNextTauntAnimation'](),_0x5762a1=this[_0x2a5901(0xca)][_0x2a5901(0x17d)]()&&Sprite_Battler[_0x2a5901(0xba)],_0x1f579e=Sprite_Battler[_0x2a5901(0x97)];$gameTemp[_0x2a5901(0x1c6)](_0x39f023,_0x2cdafd,_0x5762a1,_0x1f579e);},Sprite_Battler[_0x2482a2(0xff)][_0x2482a2(0x150)]=function(){const _0x276bfc=_0x2482a2;let _0x102c0b=this[_0x276bfc(0x1dd)]['length'];while(_0x102c0b){const _0x3c3cb9=this['_tauntAnimationCycle'][_0x276bfc(0x1db)]();this['_tauntAnimationCycle'][_0x276bfc(0xbb)](_0x3c3cb9);const _0x51eb88=_0x276bfc(0x11f)['format'](_0x3c3cb9);if(this[_0x276bfc(0xca)][_0x51eb88]()){const _0x12c9dc=_0x276bfc(0x1ba)['format'](_0x3c3cb9),_0x20c835=Sprite_Battler[_0x12c9dc];if(_0x20c835)return _0x20c835;}_0x102c0b--;}return Sprite_Battler['_certainHitTauntAnimation'];},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x1a3)]=Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0x13a)],Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0x13a)]=function(){const _0x352632=_0x2482a2;VisuMZ[_0x352632(0xea)]['Sprite_Actor_createStateSprite'][_0x352632(0x104)](this),this[_0x352632(0x163)]();},Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0x163)]=function(){const _0x322dc1=_0x2482a2;if(this['constructor']!==Sprite_Actor)return;if(!this[_0x322dc1(0xf8)]())return;if(!SceneManager[_0x322dc1(0x111)]())return;const _0x3edff3=VisuMZ['AggroControlSystem']['Settings']['Aggro'],_0x5d530a=new Sprite_Gauge();_0x5d530a[_0x322dc1(0x88)]['x']=_0x3edff3[_0x322dc1(0x12b)],_0x5d530a[_0x322dc1(0x88)]['y']=_0x3edff3[_0x322dc1(0xab)];const _0xb1633f=Sprite_Gauge['prototype'][_0x322dc1(0x143)]();_0x5d530a[_0x322dc1(0x9d)]['x']=_0x5d530a[_0x322dc1(0x9d)]['y']=_0x3edff3['Scale'],this['_aggroGaugeSprite']=_0x5d530a,this[_0x322dc1(0xde)](_0x5d530a);},Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0xf8)]=function(){const _0x38e123=_0x2482a2;if(Imported[_0x38e123(0x199)]&&this[_0x38e123(0xaa)]===Sprite_SvEnemy)return![];return ConfigManager[_0x38e123(0x12f)]&&VisuMZ['AggroControlSystem'][_0x38e123(0x106)][_0x38e123(0x1ea)][_0x38e123(0xdf)];},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x16d)]=Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0x1b1)],Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0x1b1)]=function(){const _0x5a3000=_0x2482a2;VisuMZ['AggroControlSystem'][_0x5a3000(0x16d)][_0x5a3000(0x104)](this),this['updateAggroGaugeSprite']();},Sprite_Actor[_0x2482a2(0xff)][_0x2482a2(0x13d)]=function(){const _0xe41927=_0x2482a2;if(!this[_0xe41927(0xca)])return;if(!this[_0xe41927(0x73)])return;const _0x6226a8=VisuMZ['AggroControlSystem']['Settings'][_0xe41927(0x1ea)],_0x5357fc=this[_0xe41927(0x73)];let _0x351d6b=_0x6226a8['OffsetX'];this[_0xe41927(0xca)]['battleUIOffsetX']&&(_0x351d6b+=this[_0xe41927(0xca)][_0xe41927(0x196)]());let _0x9ec111=_0x6226a8[_0xe41927(0x173)];this[_0xe41927(0xca)][_0xe41927(0x1e2)]&&(_0x9ec111+=this[_0xe41927(0xca)]['battleUIOffsetY']()),_0x5357fc['x']=_0x351d6b,_0x5357fc['y']=-this[_0xe41927(0x8d)]+_0x9ec111,this['_battler']&&_0x5357fc[_0xe41927(0x107)]!==_0xe41927(0x18b)&&(_0x5357fc[_0xe41927(0xe7)]=!![],_0x5357fc[_0xe41927(0xd1)](this[_0xe41927(0xca)],_0xe41927(0x18b))),this[_0xe41927(0x9d)]['x']<0x0&&(_0x5357fc[_0xe41927(0x9d)]['x']=-Math[_0xe41927(0x190)](_0x5357fc[_0xe41927(0x9d)]['x']));},Sprite_Gauge[_0x2482a2(0xff)]['isAggroType']=function(){const _0x23ae73=_0x2482a2;return this[_0x23ae73(0xca)]&&this[_0x23ae73(0x107)]==='aggro';},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x165)]=Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0xc5)],Sprite_Gauge['prototype'][_0x2482a2(0xc5)]=function(){const _0x2e4adb=_0x2482a2;return this[_0x2e4adb(0x72)]()?0x0:VisuMZ[_0x2e4adb(0xea)]['Sprite_Gauge_gaugeX'][_0x2e4adb(0x104)](this);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0xd5)]=Sprite_Gauge['prototype'][_0x2482a2(0x18a)],Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x18a)]=function(){const _0x33769f=_0x2482a2;let _0x49aacf=VisuMZ[_0x33769f(0xea)][_0x33769f(0xd5)][_0x33769f(0x104)](this);if(this[_0x33769f(0x72)]()&&this[_0x33769f(0xca)]){if(this[_0x33769f(0xca)]['isDead']())return 0x0;if(this['_battler'][_0x33769f(0x89)]()&&this[_0x33769f(0xca)][_0x33769f(0x82)]()[_0x33769f(0x167)]()[_0x33769f(0x17e)]===0x1)return 0x1;}return _0x49aacf[_0x33769f(0x153)](0x0,0x1);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0xda)]=Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x192)],Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x192)]=function(){const _0x1ccb3e=_0x2482a2;return this[_0x1ccb3e(0x72)]()?this['currentValueAggroControl']():VisuMZ[_0x1ccb3e(0xea)][_0x1ccb3e(0xda)][_0x1ccb3e(0x104)](this);},Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x135)]=function(){const _0x804797=_0x2482a2,_0x39e8a3=this['_battler'][_0x804797(0x82)](),_0x2b26bb=this[_0x804797(0xca)][_0x804797(0xc6)]-_0x39e8a3[_0x804797(0xfe)](),_0x51c9af=_0x39e8a3[_0x804797(0xe1)]()-_0x39e8a3['tgrMin']();if(_0x2b26bb>=_0x51c9af)return 0x64;const _0x5c660d=_0x2b26bb/Math[_0x804797(0xc3)](_0x51c9af,0x1)*0x64,_0xe6945e=Math['min'](this['_battler']['tgr']-0x1,0xa);return _0x5c660d['clamp'](_0xe6945e,0x64);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x1df)]=Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x141)],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x72ff96=_0x2482a2;return this[_0x72ff96(0x72)]()?this['currentMaxValueAggroControl']():VisuMZ['AggroControlSystem'][_0x72ff96(0x1df)][_0x72ff96(0x104)](this);},Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x171)]=function(){return 0x64;},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x142)]=Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x11b)],Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x11b)]=function(){const _0x3ff786=_0x2482a2;return this[_0x3ff786(0x72)]()?ColorManager[_0x3ff786(0x13b)]():VisuMZ[_0x3ff786(0xea)][_0x3ff786(0x142)]['call'](this);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x1e3)]=Sprite_Gauge['prototype']['gaugeColor2'],Sprite_Gauge['prototype']['gaugeColor2']=function(){const _0x52a185=_0x2482a2;return this[_0x52a185(0x72)]()?ColorManager['aggroGaugeColor2']():VisuMZ['AggroControlSystem'][_0x52a185(0x1e3)][_0x52a185(0x104)](this);},VisuMZ['AggroControlSystem'][_0x2482a2(0xa8)]=Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x1b1)],Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x1b1)]=function(){const _0x56f8dc=_0x2482a2;VisuMZ[_0x56f8dc(0xea)]['Sprite_Gauge_update'][_0x56f8dc(0x104)](this),this['updateOpacityAggroControl']();},Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0x1e7)]=function(){const _0x50bedd=_0x2482a2;if(!this[_0x50bedd(0x72)]())return;if(!Imported['VisuMZ_1_BattleCore'])return;const _0x2c292a=this[_0x50bedd(0xca)][_0x50bedd(0x9e)]();if(this[_0x50bedd(0x77)])this[_0x50bedd(0x9a)]=0xff;else _0x2c292a&&_0x2c292a[_0x50bedd(0x9a)]>0x0?this[_0x50bedd(0x9a)]=0xff:this[_0x50bedd(0x9a)]=0x0;},VisuMZ[_0x2482a2(0xea)]['Sprite_Gauge_drawValue']=Sprite_Gauge['prototype'][_0x2482a2(0xc0)],Sprite_Gauge[_0x2482a2(0xff)][_0x2482a2(0xc0)]=function(){const _0x188b61=_0x2482a2;if(this[_0x188b61(0x72)]())return;VisuMZ[_0x188b61(0xea)][_0x188b61(0xa1)][_0x188b61(0x104)](this);};function _0x3b8e(){const _0x11b527=['initMembers','includes','certainHitTauntMembers','Game_Action_applyGlobal','initAggroControl','applyTauntFilters','removeDeadProvokerStates','showVisualAtbGauge','isPhysical','findTgrMember','gaugeRate','aggro','isTpb','name','ConvertParams','OptionName','abs','random','currentValue','_subject','BattleLayout','blendMode','battleUIOffsetX','isAggroGaugeShown','sparam','VisuMZ_1_BattleCore','isNotEnemySelectAction','getColorDataFromPluginParameters','1400580frutel','maxOpacity','removeState','ARRAYNUM','ARRAYSTRUCT','HITTYPE_CERTAIN','applyProvokeEffect','Sprite_Actor_createStateSprite','7049217KzQMgo','Sprite_Battler_initMembers','updateTauntAnimations','isShowPriorityLines','aggro-gauge-color-2','isTauntAffected','highestTgrMember','item','placeActorName','padding','AniPhysical','Parts','provokeLineColor','update','updateSubPositions','scope','_highestTgrMember','_cache_isProvokeState','onBattleStart','enemy','states','addState','_%1TauntAnimation','tgrSumFromGroup','_provokeContainer','STR','AniMagical','applyItemUserEffect','createInnerSprite','maxCommands','ActorID','ConfigManager_makeData','some','isCertainHit','requestFauxAnimation','initialize','subject','itemRectWithPadding','setBattler','_homeX','_damageContainer','registerCommand','list','addCommand','_homeY','_aggro','maxSprites','isAggroAffected','getSpecificBattlerKeyTarget','_customModified','applySubjectAggro','Game_BattlerBase_refresh','bitmap','parentContainer','opponentsUnit','shift','Scene_Options_maxCommands','_tauntAnimationCycle','sortEnemies','Sprite_Gauge_currentMaxValue','_provoker','arcHeight','battleUIOffsetY','Sprite_Gauge_gaugeColor2','endAction','matchTauntType','battleAggro','updateOpacityAggroControl','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','lowestTgrMember','Aggro','version','13002FfAYDs','hitType','_enemies','STRUCT','isProvokeAffected','isAggroType','_aggroGaugeSprite','AddOption','magicalTaunt','traitObjects','_menuAggroType','battleMembers','EnemySetAggro','isAtbGaugeVisible','randomTarget','trim','_tauntAnimationTimer','createProvokeHeightOrigin','Game_Unit_onBattleStart','concat','MirrorActorAni','friendsUnit','aggroGaugeX','Game_Battler_onBattleStart','CycleTime','bypassTaunt','applyItemUserEffectAggroControl','anchor','isAlive','Window_Options_addGeneralOptions','VisuMZ_3_BattleAI','applyData','height','_targetX','loseAggro','round','getBattlerKeyTargets','applyProvokeFilters','drawAggroGauge','actorId','Sprite_Battler_setBattler','onBattleEnd','_muteTauntAnimations','physicalTauntMembers','5200BEVUBI','opacity','provoker','addAggroControlSystemAggroCommand','scale','battler','3827rDiaPR','map','Sprite_Gauge_drawValue','Game_Action_getSpecificBattlerKeyTarget','provoke-line-color','_provokeSprite','Window_BattleEnemy_refresh','inputtingAction','boxWidth','Sprite_Gauge_update','LineColor','constructor','AnchorY','Game_Battler_addState','convertBattleTargetToString','filter','_mainSprite','stateHasProvoke','ActorChangeAggro','actor%1-gauge-aggro','Sprite_Battler_update','createBattleFieldAggroControl','aggroMultiplier','startNewTauntAnimation','isBypassHighestAggro','_animationCycleTime','Window_StatusBase_placeActorName','_mirrorActorTauntAnimations','push','aiTarget','clearTgrCache','physical','Game_Action_applyItemUserEffect','drawValue','itemTargetCandidates','isDead','max','Game_BattlerBase_initMembers','gaugeX','tgr','updateChildrenOpacity','addAggroControlSystemCommands','executeHpDamageAggroControl','_battler','value','addAggroControlSystemProvokeCommand','aggroGaugeColor2','note','nameX','user','setup','PartsSize','createProvokeSprite','updateBattlerPositions','Sprite_Gauge_gaugeRate','_provokeBitmap','HeightOrigin','_counterAttackingTarget','AdjustOptionsRect','Sprite_Gauge_currentValue','smoothTarget','provokeOrigin','width','addChild','VisibleGauge','provokeHeightOrigin','tgrMax','ARRAYJSON','placeAggroGauge','_statusWindow','StatusGauge','8FelNyR','visible','BattleManager_invokeCounterAttack','targetsForAlive','AggroControlSystem','isStateAffected','Opacity','gainAggro','Game_Action_itemTargetCandidates','executeHpDamage','MuteAnimations','create','_regexp','tauntTargetsForAlive','nameY','log','BattleStatusOffsetX','getColor','isAggroGaugeVisible','_cache','Taunt','_targetY','reduce','selectAllActors','tgrMin','prototype','AniCertain','certainHitTaunt','5752JKRtGU','13059iiumaq','call','isEnemy','Settings','_statusType','Game_BattlerBase_sparam','description','invokeMagicReflection','Provoke','members','optDisplayTp','index','ShowAnimation','needsSelection','isSceneBattle','OpacitySpeed','_scene','target','magical','isPlaytest','baseAggro','isTargetHighestTGR','min','physicalTaunt','gaugeColor1','pagedown','EnemyIndex','checkCacheKey','%1Taunt','setHandler','actor','isMagical','updateAggroControl','format','_targetIndex','exit','bind','match','parameters','Sprite_Battler_initialize','AnchorX','provokeBitmap','convertStringToBattleTarget','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','aggroGauge','parse','45zzyroz','ARRAYEVAL','AggroPerHeal','Spriteset_Battle_createBattleField','currentValueAggroControl','clearAggro','16346ucczAl','NUM','aggroGaugeY','createStateSprite','aggroGaugeColor1','HITTYPE_MAGICAL','updateAggroGaugeSprite','partsSize','endBattle','itemRect','currentMaxValue','Sprite_Gauge_gaugeColor1','bitmapWidth','_sprites','isForOpponent','_checkingAggroTarget','iconWidth','BattleManager_endBattle','textColor','canSingleOrMultipleSelect','alwaysTargetHighestAggro','makeData','Spriteset_Battle_update','invokeCounterAttack','taunting','getNextTauntAnimation','GaugeColor2','_magicalTauntAnimation','clamp','leftwardAnimation','_certainHitTauntAnimation','EVAL','HITTYPE_PHYSICAL','placeGauge','bypassProvoke','_lowestTgrMember','updateOpacity','initTauntAnimations','803613evEkHL','indexOf','clearProvokers','isBypassTaunt','makeProvokeTarget','getTauntMembers','createAggroGauge','children','Sprite_Gauge_gaugeX','randomInt','aliveMembers','magicalTauntMembers','status','#%1','createChildSprites','BattleManager_endAction','Sprite_Actor_update','JSON','_colorCache','ARRAYSTR','currentMaxValueAggroControl','ShowFacesListStyle','OffsetY','_opacitySpeed','inBattle','setAggro','return\x200','refresh','_battleField','bypassHighestAggro','ArcHeight','isForAnyone','isActor','length','isBypassProvoke'];_0x3b8e=function(){return _0x11b527;};return _0x3b8e();}function Sprite_ProvokeTrail(){const _0x43f3f9=_0x2482a2;this[_0x43f3f9(0x1c7)](...arguments);}Sprite_ProvokeTrail['prototype']=Object[_0x2482a2(0xf1)](Sprite[_0x2482a2(0xff)]),Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0xaa)]=Sprite_ProvokeTrail,Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x1c7)]=function(_0x2a18f9){const _0x1d5ac9=_0x2482a2;this[_0x1d5ac9(0xaf)]=_0x2a18f9,Sprite[_0x1d5ac9(0xff)]['initialize'][_0x1d5ac9(0x104)](this),this[_0x1d5ac9(0x180)](),this[_0x1d5ac9(0x16b)]();},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x180)]=function(){const _0x39e507=_0x2482a2,_0x2fbbf3=VisuMZ[_0x39e507(0xea)]['Settings']['Provoke'];this['anchor']['x']=0.5,this[_0x39e507(0x88)]['y']=0.5,this[_0x39e507(0x1cb)]=0x0,this[_0x39e507(0x1d0)]=0x0,this['_targetX']=0x0,this[_0x39e507(0xfb)]=0x0,this[_0x39e507(0x9a)]=0x0,this[_0x39e507(0x174)]=_0x2fbbf3[_0x39e507(0x112)],this[_0x39e507(0x195)]=_0x2fbbf3['BlendMode'];},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x1d2)]=function(){const _0x1bf9fa=_0x2482a2;return VisuMZ[_0x1bf9fa(0xea)]['Settings'][_0x1bf9fa(0x10b)][_0x1bf9fa(0x1af)];},Sprite_ProvokeTrail[_0x2482a2(0xff)]['partsSize']=function(){const _0x1bdf91=_0x2482a2;return VisuMZ[_0x1bdf91(0xea)][_0x1bdf91(0x106)][_0x1bdf91(0x10b)][_0x1bdf91(0xd2)]/0x64;},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x16b)]=function(){const _0xe6f5d3=_0x2482a2;this[_0xe6f5d3(0x144)]=[];let _0x3c59d4=0x0;for(let _0xef975=0x0;_0xef975<=this[_0xe6f5d3(0x1d2)]();_0xef975++){const _0xfc0700=new Sprite();_0xfc0700[_0xe6f5d3(0x1d8)]=ImageManager[_0xe6f5d3(0x12c)](),_0xfc0700[_0xe6f5d3(0x88)]['x']=0.5,_0xfc0700['anchor']['y']=0.5,_0xfc0700[_0xe6f5d3(0x9d)]['x']=_0xfc0700[_0xe6f5d3(0x9d)]['y']=this[_0xe6f5d3(0x13e)](),_0xfc0700[_0xe6f5d3(0x9a)]=_0x3c59d4,_0xfc0700[_0xe6f5d3(0x195)]=this[_0xe6f5d3(0x195)],this[_0xe6f5d3(0xde)](_0xfc0700),this['_sprites'][_0xe6f5d3(0xbb)](_0xfc0700),_0x3c59d4+=this[_0xe6f5d3(0x174)];if(_0x3c59d4>=0xff)_0x3c59d4=0x0;}},Sprite_ProvokeTrail[_0x2482a2(0xff)]['leftwardAnimation']=function(){return this['_mainSprite']['constructor']===Sprite_Actor;},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x1d9)]=function(){const _0x1b3f6a=_0x2482a2;return SceneManager[_0x1b3f6a(0x113)]['_spriteset']['_provokeContainer'];},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x1b1)]=function(){const _0x628f79=_0x2482a2;Sprite[_0x628f79(0xff)][_0x628f79(0x1b1)][_0x628f79(0x104)](this),this['updateBattlerPositions'](),this['updateSubPositions'](),this[_0x628f79(0x15b)](),this[_0x628f79(0xc7)]();},Sprite_ProvokeTrail[_0x2482a2(0xff)]['heightOrigin']=function(){const _0x10fea4=_0x2482a2;return VisuMZ[_0x10fea4(0xea)][_0x10fea4(0x106)][_0x10fea4(0x10b)]['HeightOrigin'];},Sprite_ProvokeTrail['prototype'][_0x2482a2(0xd4)]=function(){const _0x39112d=_0x2482a2;if(!this['_mainSprite'][_0x39112d(0xca)])return;if(!this[_0x39112d(0xaf)][_0x39112d(0xca)][_0x39112d(0x9b)]())return;const _0x39f9b4=this[_0x39112d(0xaf)][_0x39112d(0xca)][_0x39112d(0x9b)]()[_0x39112d(0x9e)]();if(!_0x39f9b4)return;const _0x662285=this[_0x39112d(0xaf)][_0x39112d(0xca)][_0x39112d(0xe0)](),_0x3b6ea7=this[_0x39112d(0xaf)]['_battler'][_0x39112d(0x9b)]()[_0x39112d(0xe0)]();this['_homeX']=this[_0x39112d(0xaf)]['x'],this[_0x39112d(0x1d0)]=this[_0x39112d(0xaf)]['y']-this[_0x39112d(0xaf)]['height']*_0x662285,this['_targetX']=_0x39f9b4['x'],this[_0x39112d(0xfb)]=_0x39f9b4['y']-_0x39f9b4[_0x39112d(0x8d)]*_0x3b6ea7,this[_0x39112d(0x1cb)]+=Math[_0x39112d(0x90)]((Graphics['width']-Graphics[_0x39112d(0xa7)])/0x2),this[_0x39112d(0x1d0)]+=Math[_0x39112d(0x90)]((Graphics[_0x39112d(0x8d)]-Graphics['boxHeight'])/0x2),this[_0x39112d(0x8e)]+=Math[_0x39112d(0x90)]((Graphics[_0x39112d(0xdd)]-Graphics[_0x39112d(0xa7)])/0x2),this[_0x39112d(0xfb)]+=Math['round']((Graphics[_0x39112d(0x8d)]-Graphics['boxHeight'])/0x2);if(!$gameSystem['isSideView']()){if(_0x39f9b4[_0x39112d(0xca)][_0x39112d(0x17d)]())visible=!![],this['_targetX']+=SceneManager[_0x39112d(0x113)]['_statusWindow']['x'],this[_0x39112d(0xfb)]+=SceneManager[_0x39112d(0x113)]['_statusWindow']['y'];else _0x39f9b4[_0x39112d(0xca)][_0x39112d(0x105)]()&&(visible=!![],this[_0x39112d(0x1cb)]+=SceneManager[_0x39112d(0x113)][_0x39112d(0xe4)]['x'],this[_0x39112d(0x1d0)]+=SceneManager['_scene'][_0x39112d(0xe4)]['y']);}},Sprite_ProvokeTrail[_0x2482a2(0xff)]['arcHeight']=function(){const _0x39fd1c=_0x2482a2;return VisuMZ['AggroControlSystem'][_0x39fd1c(0x106)]['Provoke'][_0x39fd1c(0x17b)];},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x1b2)]=function(){const _0x51a401=_0x2482a2;if(!this['_mainSprite'][_0x51a401(0xca)])return;if(!this[_0x51a401(0xaf)][_0x51a401(0xca)][_0x51a401(0x9b)]())return;if(!this[_0x51a401(0x144)])return;if(this[_0x51a401(0x144)]['length']<=0x0)return;const _0x576f34=(this[_0x51a401(0x8e)]-this['_homeX'])/this['maxSprites'](),_0x8fce0a=(this['_targetY']-this[_0x51a401(0x1d0)])/this[_0x51a401(0x1d2)]();for(let _0x19049a=0x0;_0x19049a<=this[_0x51a401(0x1d2)]();_0x19049a++){const _0x15ae2c=this[_0x51a401(0x144)][_0x19049a];if(!_0x15ae2c)continue;_0x15ae2c['x']=this[_0x51a401(0x1cb)]+_0x576f34*_0x19049a;const _0x44b965=this[_0x51a401(0x1d2)]()-_0x19049a,_0x145156=this[_0x51a401(0x1d2)]()/0x2,_0x55c818=this[_0x51a401(0x1e1)](),_0x24dad2=-_0x55c818/Math['pow'](_0x145156,0x2),_0x1a652f=_0x24dad2*Math['pow'](_0x44b965-_0x145156,0x2)+_0x55c818;_0x15ae2c['y']=this[_0x51a401(0x1d0)]+_0x8fce0a*_0x19049a-_0x1a652f;}},Sprite_ProvokeTrail[_0x2482a2(0xff)][_0x2482a2(0x19d)]=function(){const _0x3d3e7c=_0x2482a2;return VisuMZ['AggroControlSystem'][_0x3d3e7c(0x106)][_0x3d3e7c(0x10b)][_0x3d3e7c(0xec)];},Sprite_ProvokeTrail['prototype'][_0x2482a2(0x15b)]=function(){const _0x39c58c=_0x2482a2,_0x4daadf=this[_0x39c58c(0xaf)]['_battler'];if(!_0x4daadf)this[_0x39c58c(0x9a)]=0x0;else _0x4daadf[_0x39c58c(0x89)]()&&_0x4daadf[_0x39c58c(0x9b)]()?this[_0x39c58c(0x9a)]=0xff:this['opacity']=0x0;},Sprite_ProvokeTrail['prototype'][_0x2482a2(0xc7)]=function(){const _0x55bec5=_0x2482a2;if(!this[_0x55bec5(0xaf)][_0x55bec5(0xca)])return;if(!this[_0x55bec5(0xaf)][_0x55bec5(0xca)][_0x55bec5(0x9b)]())return;if(!this[_0x55bec5(0x144)])return;if(this[_0x55bec5(0x144)]['length']<=0x0)return;for(let _0x407129=0x0;_0x407129<=this[_0x55bec5(0x1d2)]();_0x407129++){const _0x24182a=this[_0x55bec5(0x144)][this[_0x55bec5(0x154)]()?this[_0x55bec5(0x1d2)]()-_0x407129:_0x407129];if(!_0x24182a)continue;_0x24182a[_0x55bec5(0x9a)]-=this[_0x55bec5(0x174)];if(_0x24182a['opacity']<=0x0)_0x24182a['opacity']=0xff;}},VisuMZ['AggroControlSystem'][_0x2482a2(0x134)]=Spriteset_Battle[_0x2482a2(0xff)]['createBattleField'],Spriteset_Battle[_0x2482a2(0xff)]['createBattleField']=function(){const _0x3572fe=_0x2482a2;VisuMZ[_0x3572fe(0xea)][_0x3572fe(0x134)][_0x3572fe(0x104)](this),this[_0x3572fe(0xb4)]();},Spriteset_Battle[_0x2482a2(0xff)][_0x2482a2(0xb4)]=function(){const _0x1dede0=_0x2482a2;if(!Imported['VisuMZ_1_BattleCore'])return;const _0xa5a605=this['_battleField']['x'],_0x37ff9b=this[_0x1dede0(0x179)]['y'],_0x488bfe=this[_0x1dede0(0x179)][_0x1dede0(0xdd)],_0x518b88=this[_0x1dede0(0x179)][_0x1dede0(0x8d)];this[_0x1dede0(0x1bc)]=new Sprite(),this[_0x1dede0(0x1bc)]['setFrame'](0x0,0x0,_0x488bfe,_0x518b88),this[_0x1dede0(0x1bc)]['x']=_0xa5a605,this[_0x1dede0(0x1bc)]['y']=_0x37ff9b;if(Imported[_0x1dede0(0x199)]){const _0x4804db=this[_0x1dede0(0x164)][_0x1dede0(0x15e)](this[_0x1dede0(0x1cc)]);this['addChildAt'](this[_0x1dede0(0x1bc)],_0x4804db);}else this[_0x1dede0(0xde)](this['_provokeContainer']);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x14d)]=Spriteset_Battle[_0x2482a2(0xff)][_0x2482a2(0x1b1)],Spriteset_Battle[_0x2482a2(0xff)][_0x2482a2(0x1b1)]=function(){const _0x4b8988=_0x2482a2;VisuMZ['AggroControlSystem'][_0x4b8988(0x14d)][_0x4b8988(0x104)](this),this[_0x4b8988(0x123)]();},Spriteset_Battle[_0x2482a2(0xff)][_0x2482a2(0x123)]=function(){const _0x4261d2=_0x2482a2;if(!this['_provokeContainer'])return;if(!this[_0x4261d2(0x1cc)])return;this[_0x4261d2(0x1bc)]['x']=this[_0x4261d2(0x1cc)]['x'],this[_0x4261d2(0x1bc)]['y']=this[_0x4261d2(0x1cc)]['y'];},VisuMZ[_0x2482a2(0xea)]['Window_BattleEnemy_refresh']=Window_BattleEnemy[_0x2482a2(0xff)][_0x2482a2(0x178)],Window_BattleEnemy['prototype'][_0x2482a2(0x178)]=function(){const _0x456218=_0x2482a2;if(this[_0x456218(0x92)]())Imported['VisuMZ_1_BattleCore']&&this[_0x456218(0x1de)](),Window_Selectable[_0x456218(0xff)][_0x456218(0x178)][_0x456218(0x104)](this);else this[_0x456218(0x185)]()?(Imported[_0x456218(0x199)]&&this[_0x456218(0x1de)](),Window_Selectable[_0x456218(0xff)][_0x456218(0x178)][_0x456218(0x104)](this)):VisuMZ['AggroControlSystem'][_0x456218(0xa5)]['call'](this);},Window_BattleEnemy['prototype']['applyProvokeFilters']=function(){const _0x58ab12=_0x2482a2,_0x124f9e=BattleManager[_0x58ab12(0xa6)](),_0x14bacd=BattleManager[_0x58ab12(0x121)]();if(!_0x124f9e)return![];if(!_0x14bacd)return![];if(DataManager[_0x58ab12(0x17f)](_0x124f9e[_0x58ab12(0x1ab)]()))return![];if(_0x14bacd[_0x58ab12(0x159)]())return![];if(!_0x124f9e[_0x58ab12(0x71)]())return![];if(_0x14bacd[_0x58ab12(0x71)]()){this['_enemies']=[_0x14bacd[_0x58ab12(0x9b)]()];if(_0x124f9e[_0x58ab12(0x17c)]&&_0x124f9e[_0x58ab12(0x17c)]()){const _0x37783=$gameParty[_0x58ab12(0x167)]();this['_enemies']=this[_0x58ab12(0x6f)][_0x58ab12(0x80)](_0x37783),_0x124f9e[_0x58ab12(0x14a)]&&_0x124f9e[_0x58ab12(0x14a)]()&&_0x37783['length']>0x1&&this['setHandler'](_0x58ab12(0x11c),this[_0x58ab12(0xfd)][_0x58ab12(0x127)](this));}return!![];}else return![];},Window_BattleEnemy[_0x2482a2(0xff)]['applyTauntFilters']=function(){const _0x38509b=_0x2482a2,_0x4e5c36=BattleManager[_0x38509b(0xa6)](),_0x4a1a92=BattleManager[_0x38509b(0x121)](),_0x535f3e=$gameTroop;if(!_0x4e5c36)return![];if(!_0x4a1a92)return![];if(!_0x4e5c36[_0x38509b(0x1ab)]())return![];if(DataManager['isBypassTaunt'](_0x4e5c36['item']()))return![];if(_0x4a1a92[_0x38509b(0x86)]())return![];if(!_0x4e5c36[_0x38509b(0x1a9)]())return![];if(_0x4e5c36['isPhysical']()&&_0x535f3e[_0x38509b(0x98)]()[_0x38509b(0x17e)]>0x0)this[_0x38509b(0x6f)]=_0x535f3e[_0x38509b(0x98)]();else{if(_0x4e5c36[_0x38509b(0x122)]()&&_0x535f3e[_0x38509b(0x168)]()['length']>0x0)this[_0x38509b(0x6f)]=_0x535f3e['magicalTauntMembers']();else{if(_0x4e5c36[_0x38509b(0x1c5)]()&&_0x535f3e['certainHitTauntMembers']()[_0x38509b(0x17e)]>0x0)this['_enemies']=_0x535f3e[_0x38509b(0x182)]();else return![];}}if(_0x4e5c36['isForAnyone']&&_0x4e5c36[_0x38509b(0x17c)]()){const _0x1f44eb=$gameParty[_0x38509b(0x167)]();this[_0x38509b(0x6f)]=this[_0x38509b(0x6f)][_0x38509b(0x80)](_0x1f44eb),_0x4e5c36[_0x38509b(0x14a)]&&_0x4e5c36[_0x38509b(0x14a)]()&&_0x1f44eb[_0x38509b(0x17e)]>0x1&&this[_0x38509b(0x120)](_0x38509b(0x11c),this[_0x38509b(0xfd)][_0x38509b(0x127)](this));}return!![];},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0x8a)]=Window_Options[_0x2482a2(0xff)]['addGeneralOptions'],Window_Options[_0x2482a2(0xff)]['addGeneralOptions']=function(){const _0x164fdd=_0x2482a2;VisuMZ[_0x164fdd(0xea)][_0x164fdd(0x8a)][_0x164fdd(0x104)](this),this['addAggroControlSystemCommands']();},Window_Options['prototype'][_0x2482a2(0xc8)]=function(){const _0x259869=_0x2482a2;VisuMZ[_0x259869(0xea)]['Settings'][_0x259869(0x10b)][_0x259869(0x74)]&&this[_0x259869(0xcc)](),VisuMZ[_0x259869(0xea)][_0x259869(0x106)][_0x259869(0x1ea)]['AddOption']&&this['addAggroControlSystemAggroCommand']();},Window_Options[_0x2482a2(0xff)][_0x2482a2(0xcc)]=function(){const _0x2bcea2=_0x2482a2,_0x3246de=TextManager[_0x2bcea2(0xdc)],_0x225f13=_0x2bcea2(0xdc);this[_0x2bcea2(0x1cf)](_0x3246de,_0x225f13);},Window_Options[_0x2482a2(0xff)][_0x2482a2(0x9c)]=function(){const _0x1fb7a5=_0x2482a2,_0x3ac915=TextManager[_0x1fb7a5(0x12f)],_0x17c085='aggroGauge';this[_0x1fb7a5(0x1cf)](_0x3ac915,_0x17c085);},VisuMZ[_0x2482a2(0xea)][_0x2482a2(0xb9)]=Window_StatusBase[_0x2482a2(0xff)][_0x2482a2(0x1ac)],Window_StatusBase['prototype'][_0x2482a2(0x1ac)]=function(_0x5615f7,_0x26b990,_0x1096bc){const _0x4149cd=_0x2482a2;if(this[_0x4149cd(0x197)]())this[_0x4149cd(0x93)](_0x5615f7['index']());VisuMZ['AggroControlSystem'][_0x4149cd(0xb9)][_0x4149cd(0x104)](this,_0x5615f7,_0x26b990,_0x1096bc);},Window_StatusBase[_0x2482a2(0xff)][_0x2482a2(0x197)]=function(){const _0x5381df=_0x2482a2;if(![Window_BattleActor,Window_BattleStatus][_0x5381df(0x181)](this[_0x5381df(0xaa)]))return![];if(!SceneManager[_0x5381df(0x111)]())return![];return ConfigManager[_0x5381df(0x12f)]&&VisuMZ[_0x5381df(0xea)][_0x5381df(0x106)][_0x5381df(0x1ea)][_0x5381df(0xe5)];},Window_StatusBase[_0x2482a2(0xff)][_0x2482a2(0xe3)]=function(_0x2eabf5,_0x34245c,_0x232c97){const _0x248234=_0x2482a2;this[_0x248234(0x158)](_0x2eabf5,'aggro',_0x34245c,_0x232c97);},Window_BattleStatus[_0x2482a2(0xff)]['drawAggroGauge']=function(_0x2d8825){const _0x4bc496=_0x2482a2,_0x17c75d=this[_0x4bc496(0x121)](_0x2d8825),_0x184e15=this['aggroGaugeX'](_0x2d8825),_0x42a021=this[_0x4bc496(0x139)](_0x2d8825),_0x279dd1=_0x4bc496(0xb2)[_0x4bc496(0x124)](_0x17c75d[_0x4bc496(0x94)]()),_0x1c311a=this[_0x4bc496(0x1c0)](_0x279dd1,Sprite_Gauge),_0x1240bc=VisuMZ[_0x4bc496(0xea)][_0x4bc496(0x106)][_0x4bc496(0x1ea)];_0x1c311a['x']=_0x184e15+(_0x1240bc[_0x4bc496(0xf6)]||0x0),_0x1c311a['y']=_0x42a021+(_0x1240bc['BattleStatusOffsetY']||0x0),_0x1c311a['_menuAggroType']=!![],_0x1c311a['setup'](_0x17c75d,_0x4bc496(0x18b)),_0x1c311a[_0x4bc496(0xe7)]=!![];},Window_BattleStatus[_0x2482a2(0xff)][_0x2482a2(0x83)]=function(_0x3a6377){const _0x379892=_0x2482a2;let _0x27a663=this[_0x379892(0x1c9)](_0x3a6377),_0x485957=this[_0x379892(0xcf)](_0x27a663);if(Imported[_0x379892(0x199)]){let _0x331b58=this[_0x379892(0x140)](_0x3a6377);if(this['battleLayoutStyle']()===_0x379892(0x1ce)){const _0x34e914=$dataSystem[_0x379892(0x10d)]?0x4:0x3,_0x479fd6=_0x34e914*0x80+(_0x34e914-0x1)*0x8+0x4,_0x383bd2=this[_0x379892(0x121)](_0x3a6377);let _0xbb4fff=_0x331b58['x']+this[_0x379892(0x1ad)];VisuMZ['BattleCore'][_0x379892(0x106)][_0x379892(0x194)][_0x379892(0x172)]?_0xbb4fff=_0x331b58['x']+ImageManager['faceWidth']+0x8:_0xbb4fff+=ImageManager[_0x379892(0x147)],_0x485957=Math[_0x379892(0x90)](Math['min'](_0x331b58['x']+_0x331b58[_0x379892(0xdd)]-_0x479fd6,_0xbb4fff)),_0x485957-=0x4;}else _0x485957=Math[_0x379892(0x90)](_0x331b58['x']+(_0x331b58['width']-0x80)/0x2);}return _0x485957;},Window_BattleStatus[_0x2482a2(0xff)][_0x2482a2(0x139)]=function(_0x18a596){const _0x1581a7=_0x2482a2,_0x54e92a=this[_0x1581a7(0x140)](_0x18a596);let _0x4b01a7=this[_0x1581a7(0xf4)](_0x54e92a);if(Imported[_0x1581a7(0x199)]){if(this['battleLayoutStyle']()===_0x1581a7(0x1ce)){let _0xea369c=this['itemRect'](_0x18a596);_0x4b01a7=Math[_0x1581a7(0x90)](_0xea369c['y']+(_0xea369c[_0x1581a7(0x8d)]-Sprite_Name[_0x1581a7(0xff)]['bitmapHeight']())/0x2);}}if(this[_0x1581a7(0x7a)]())_0x4b01a7-=Sprite_Gauge[_0x1581a7(0xff)]['gaugeHeight']()-0x1;return _0x4b01a7;},Window_BattleStatus[_0x2482a2(0xff)][_0x2482a2(0x7a)]=function(){const _0xbd2f24=_0x2482a2;if(!BattleManager[_0xbd2f24(0x18c)]())return![];if(Imported['VisuMZ_2_BattleSystemATB'])return this[_0xbd2f24(0x187)]('time');return!![];};