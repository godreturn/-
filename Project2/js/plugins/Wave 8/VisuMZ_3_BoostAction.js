//=============================================================================
// VisuStella MZ - Boost Action
// VisuMZ_3_BoostAction.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BoostAction = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BoostAction = VisuMZ.BoostAction || {};
VisuMZ.BoostAction.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.14] [BoostAction]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Boost_Action_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds Boost Points, a mechanic which augments the potency of
 * skills and/or items based on the type of notetag they have. The newly added
 * mechanic allows actors and/or enemies to temporarily power themselves up for
 * the current turn by using the Boost Points resource. Boost Points are gained
 * at the end of each turn if the battler did not use any Boost Points. While
 * Boosted, actions can deal more damage, hit more times, make buffs/debuffs or
 * states last longer, and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add a new battle resource to your game: Boost Points!
 * * Determine how many Boost Points can be stored at a time!
 * * Also determine how many Boost Points can be used at a time!
 * * Determine how Boosting affects skills and items through the different
 *   kinds of notetags provided through this plug.
 * * Enemies can Boost, too! As long as the proper notetags are in place!
 * * Utilize Shortcut Keys to quickly Boost skills and/or items.
 * * Boosting skills and/or items can also affect the text displayed in the
 *   Help Window, too!
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
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
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
 * VisuMZ_3_WeaknessDisplay
 *
 * The "Analyze" ability in the VisuStella MZ Weakness Display can be Boosted
 * through this plugin and reveal multiple weaknesses at a time.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * When using Action Sequences, Boost effects for damage, turn extensions,
 * analyze, etc. will not occur for anything other than the Action Sequence:
 * "MECH: Action Effect" in order to maintain controlled effects. However, if
 * you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
 * store inside a variable how many times Boosts were used. This can be used
 * however which way you want it to as long as it is manageable through events
 * and Common Events.
 * 
 * ---
 *
 * VisuMZ_2_BattleSystemBTB
 * 
 * The Boost Actions plugin cannot be used together with Battle System - BTB.
 * If the Battle System is switched to using Battle System - BTB, then the
 * Boost Actions plugin will shut itself off.
 * 
 * The reason why these plugins cannot work together is because their mechanics
 * play off too similarly to each other and cause conflicts. We, the plugin
 * developer team, highly recommend that you utilize Battle System - BTB's
 * Brave system instead of the Boost system to make the best use of the battle
 * system in effect.
 *
 * ---
 * 
 * VisuMZ_3_ActiveChainSkills
 * 
 * Boosts now carry over across the entire chain and granting bonuses to all
 * chained skills instead of just the first skill of the chain. The bonus
 * effects of the boosts will end when the chains end.
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
 * === Boost Effect-Related Notetags ===
 * 
 * ---
 *
 * <Boost Damage>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the damage dealt by this skill/item.
 * - The amount of damage increased will be determined by the Plugin Parameter
 *   Mechanical settings for Damage Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Turns>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the duration of skills, buffs, and debuffs added by
 *   this skill/item.
 * - The amount of turns increased will be determined by the Plugin Parameter
 *   Mechanical settings for Turn Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Repeat>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of repeated hits dealt by this skill/item.
 * - The amount of hits increased will be determined by the Plugin Parameter
 *   Mechanical settings for Repeated Hits Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Effect Gain>
 *
 * - Used for: Skill, Item Notetags
 * - Boosts will alter the number of Boost Points acquired through the
 *   <Target Boost Points: +x> and <User Boost Points: +x> notetags.
 * - The power of the effect will be determined by the Plugin Parameter
 *   Mechanical settings for Effect Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 *
 * ---
 *
 * <Boost Analyze>
 *
 * - Used for: Skill, Item Notetags
 * - Requires VisuMZ_3_WeaknessDisplay!
 * - Boosts will alter the number of revealed weaknesses by this skill/item.
 * - The amount of weaknesses revealed will be determined by the Plugin
 *   Parameter Mechanical settings for Analyze Multipliers and Addition.
 * - When using Action Sequences, this will have no effect outside of the
 *   MECH: Action Effect command.
 * 
 * ---
 * 
 * === Boost Points Gain/Loss-Related Notetags ===
 * 
 * ---
 *
 * <User Boost Points: +x>
 * <User Boost Points: -x>
 *
 * <Target Boost Points: +x>
 * <Target Boost Points: -x>
 *
 * - Used for: Skill, Item Notetags
 * - The user/target will gain/lose Boost Points if this skill/item connects.
 * - Replace 'x' with a number representing the number of Boost Points for the
 *   user/target to gain/lose.
 *
 * ---
 *
 * <Boost Points Battle Start: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by multiplicatively.
 *
 * ---
 *
 * <Boost Points Battle Start: +x>
 * <Boost Points Battle Start: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Determines how many extra (or less) Boost Points the battler will start
 *   a new battle with.
 * - Replace 'x' with a number representing the amount of Boost Points to
 *   increase or decrease the starting Boost Points value by additively.
 *
 * ---
 * 
 * === Boost Point Requirements-Related Notetags ===
 * 
 * The following are notetags that make skills/items require a certain amount
 * of Boost Points to be in "use" before they can become enabled.
 * 
 * ---
 *
 * <Require x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require >= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at least x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require > x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require more than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require = x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require exactly x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require < x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require less than x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 *
 * <Require <= x Boost Points>
 *
 * - Used for: Skill, Item Notetags
 * - This causes the skill to require at most x Boost Points to be spent.
 * - Replace 'x' with a number value representing the Boost Points to be spent.
 *
 * ---
 * 
 * === Boosting-Related Notetags ===
 * 
 * ---
 *
 * <Boost Sealed>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - As long as the battler is affected by a trait object with this notetag,
 *   the battler cannot Boost.
 *
 * ---
 * 
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Boost Skill id: Full>
 * <Boost name: Full>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will use as many Boost
 *   Points as it can to cast it.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Least x>
 * <Boost name: At Least x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use Boost Points
 *   after reaching 'x' Boost Points and will use as much as it can.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: At Most x>
 * <Boost name: At Most x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only as many Boost
 *   Points as it can unless the Boost Points spent go over 'x'.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 *
 * <Boost Skill id: Exactly x>
 * <Boost name: Exactly x>
 *
 * - Used for: Enemy Notetags
 * - Determines which skills the notetag'd enemy will Boost and their range
 *   for Boosting it.
 * - When the enemy Boosts for this skill, the enemy will only use 'x' Boost
 *   Points when Boosting for the skill.
 * - Replace 'id' with a number representing the skill ID to Boost.
 * - Replace 'name' with the skill's name to Boost.
 *
 * ---
 * 
 * === Regeneration-Related Notetags ===
 * 
 * ---
 *
 * <Boost Points Regen: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by multiplicatively.
 *
 * ---
 *
 * <Boost Points Regen: +x>
 * <Boost Points Regen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Alters the amount of Boost Points gained when regenerating Boost Points
 *   (as long as the battler can).
 * - Replace 'x' with a number value representing the amount of Boost Points
 *   to increase or decrease the regenerated amount by additively.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. 
 *
 * === Boosting-Related Text Codes ===
 *
 * These text codes are used for Help Window descriptions. When Boosting, the
 * text displayed in the Help Window can change to reflect the amount boosted.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boostDamage[x]      This will apply damage modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostTurn[x]        This will apply turn modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * \boostRepeat[x]      This will apply repeat hit modifiers to number x based
 *                      on the actor's currently used Boost amount.
 * 
 * \boostEffect[x]      This will apply Boost Point effect modifiers to number
 *                      x based on the actor's currently used Boost amount.
 * 
 * \boostAnalyze[x]     This will apply analyze modifiers to number x based on
 *                      the actor's currently used Boost amount.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Help Window Text Only)
 * ------------------   -------------------------------------------------------
 * 
 * \boost{text}         The text inside the brackets won't appear unless at
 *                      least 1 Boost is used.
 * 
 * \boost0{text}        The text inside the brackets won't appear unless if any
 *                      Boost is used.
 * 
 * \boost>=x{text}      The text inside the brackets will only appear if at
 *                      least x Boosts are used. In battle use only!
 * 
 * \boost>x{text}       The text inside the brackets will only appear if more
 *                      than x Boosts are used. In battle use only!
 * 
 * \boost=x{text}       The text inside the brackets will only appear if
 *                      exactly x Boosts are used. In battle use only!
 * 
 * \boost<x{text}       The text inside the brackets will only appear if less
 *                      than x Boosts are used. In battle use only!
 * 
 * \boost<=x{text}      The text inside the brackets will only appear if at
 *                      most x Boosts are used. In battle use only!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * These Plugin Parameters govern the mechanics behind Boost Points and
 * Boosting for this RPG Maker MZ plugin.
 *
 * ---
 *
 * Boost Points
 * 
 *   Max Stored:
 *   - Maximum Boost Points that can be stored at any time.
 * 
 *   Max Usable:
 *   - How many Boost Points can be usable at a time?
 * 
 *   Start Battle:
 *   - How many Boost Points as a base do you want battlers to start
 *     battles with?
 * 
 *   Regeneration:
 *   - How many Boost Points do you want battlers to regenerate each
 *     turn applicable?
 * 
 *     Always Regen?:
 *     - Always regenerate Boost Points each turn?
 *     - Otherwise, regenerate on turns when Boost Points weren't used.
 * 
 *     Death Regen?:
 *     - Regenerate Boost Points while dead?
 *     - Otherwise, don't.
 * 
 *   Death Removal?:
 *   - Remove all stored Boost Points on death?
 *   - Otherwise, keep them.
 *
 * ---
 *
 * Boost Animations
 * 
 *   Animation ID's:
 *   - Animation IDs start from 0 Boosts to max.
 *   - These animations play when Boosting/Unboosting.
 * 
 *   Animation Delay:
 *   - How many milliseconds to play between animations when enemies
 *     Boost actions?
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 *   - This is used for on boost.
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *   - This is used for on boost.
 * 
 *   Repeat Animation?:
 *   - Repeat boost animation played?
 *   - Only repeated during command input.
 * 
 *     Repeat Cycle:
 *     - How many frames to wait between each animation?
 *     - 60 frames = 1 second.
 * 
 *     Mirror Animation:
 *     - Mirror the effect animation when repeated?
 *     - Overrides on boost Mirror setting.
 * 
 *     Mute Animation:
 *     - Mute the effect animation when repeated?
 *     - Overrides on boost Mute setting.
 *
 * ---
 *
 * Boost Modifiers
 * 
 *   Damage:
 * 
 *     Multipliers:
 *     - Damage multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *     Addition:
 *     - Damage addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Damage> notetag.
 * 
 *   State/Buff Turns:
 * 
 *     Multipliers:
 *     - Turn multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *     Addition:
 *     - Turn addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Turns> notetag.
 * 
 *   Repeated Hits:
 * 
 *     Multipliers:
 *     - Repeat multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *     Addition:
 *     - Repeat addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Repeat> notetag.
 * 
 *   Effect:
 * 
 *     Multipliers:
 *     - Effect multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *     Addition:
 *     - Effect addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Effect Gain> notetag.
 * 
 *   Analyze:
 * 
 *     Multipliers:
 *     - Analyze multipliers start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 * 
 *     Addition:
 *     - Analyze addition start from 0 Boosts to max.
 *     - Affects skills/items with <Boost Analyze> notetag.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * These Plugin Parameter settings govern the visual elements related to Boost
 * Points and Boosting.
 *
 * ---
 *
 * Icons
 * 
 *   Boost Icon:
 *   - What icon do you wish to represent Boosting and
 *     Boost Point availability?
 * 
 *   Empty Icon:
 *   - What icon do you wish to represent Unboosting and
 *     Boost Point absence?
 * 
 *   Icon Size Rate:
 *   - What size do you wish the icons to be displayed at?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *   Smooth Icons?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Vocab
 * 
 *   Boost Command:
 *   - This is the text used for the "Boost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 * 
 *   Unboost Command:
 *   - This is the text used for the "Unboost" command displayed in the
 *     Actor Command Window.
 * 
 *     Show?:
 *     - Show this command in the Actor Command Window?
 *
 * ---
 *
 * Shortcut Controls
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Enable Page Up/Down keys to adjust Boost points as a shortcut?
 * 
 *   Bypassed Windows:
 *   - These are constructor names for windows that the shortcut key will not
 *     work on.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Boost Points?:
 *   - Show Boost Points in the Battle Status Window?
 * 
 *   Auto-Position?:
 *   - Automatically position the Boost Points?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X/Y:
 *   - How much to offset the Boost icons X/Y position by?
 *   - For X: Negative goes left. Positive goes right.
 *   - For Y: Negative goes up. Positive goes down.
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
 * Version 1.14: June 15, 2026
 * * Bug Fixes!
 * ** Fixed a bug where the "Boost" and "Unboost" commands can be duplicated
 *    and appear multiple times in the actor command window. Fix by Olivia.
 * 
 * Version 1.13: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug that would cause Boost Points to not work properly. Fix made
 *    by Arisu.
 * 
 * Version 1.12: April 17, 2025
 * * Compatibility Update!
 * ** Better compatibility with Message Core's wordwrap.
 * * Documentation Update!
 * ** The follow text codes now have added notes to them:
 * *** \boost>=x[text]
 * *** \boost>x[text]
 * *** \boost=x[text]
 * *** \boost<x[text]
 * *** \boost<=x[text]
 * **** Added note: In battle use only!
 * * Feature Update!
 * ** \boost=0[x] now functions the same as \boost0[x] and does not require
 *    being in battle. Update made by Arisu.
 * 
 * Version 1.11: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Parameters > Mechanics > Boost Animations > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Mute Animation
 * **** Mirror/Mute the effect animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat Animation?
 * *** Parameters > Mechanics > Boost Animations > Repeat > Repeat Cycle
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mirror Animation
 * *** Parameters > Mechanics > Boost Animations > Repeat > Mute Animation
 * **** Allows repeating animations while boosted and inputting.
 * **** Only repeated during command input.
 * 
 * Version 1.10: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where boost would cause softlocks in certain menus. Fix made
 *    by Olivia.
 * 
 * Version 1.09: March 14, 2024
 * * Feature Update!
 * ** Removed VisuMZ_1_MessageCore dependency.
 * 
 * Version 1.08: October 12, 2023
 * * Documentation Update!
 * ** Fixed a typo found within a notetag:
 * *** <Boost Stealed> should be <Boost Sealed>.
 * **** That is some massive Engrish there, Olivia.
 * ***** Don't sneak these kinds of comments in. They're not funny.
 * 
 * Version 1.07: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles. Update made by Olivia.
 * 
 * Version 1.06: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a crash that would occur with <Seal Attack> notetag on any actor
 *    that focuses on auto-battle. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added better compatibility with Active Chain Skills. Boosts now carry
 *    over across the entire chain and granting bonuses to all chained skills
 *    instead of just the first skill of the chain. The bonus effects of the
 *    boosts will end when the chains end.
 * * Documentation Update!
 * ** Added section to "VisuStella MZ Compatibility"
 * *** VisuMZ_3_ActiveChainSkills
 * **** Boosts now carry over across the entire chain and granting bonuses to
 *      all chained skills instead of just the first skill of the chain. The
 *      bonus effects of the boosts will end when the chains end.
 * 
 * Version 1.05: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: August 27, 2021
 * * Compatibility Update!
 * ** Boost text should now work properly with VisuStella MZ's Party System
 *    switching. Update made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 23, 2021
 * * Bug Fixes!
 * ** Boost icons should no longer disappear after a single battle. Fix made
 *    by Olivia.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** <User Boost Points: +x> notetag should now work properly. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: May 5, 2021
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
 * @param BoostAction
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings for the Boost Action mechanics.
 * @default {"BoostPoints":"","MaxStored:num":"5","Usable:num":"3","StartBattle:num":"1","Regen:num":"1","AlwaysRegen:eval":"false","DeathRegen:eval":"false","DeathRemoval:eval":"true","Animations":"","Animations:arraynum":"[\"12\",\"13\",\"15\",\"14\",\"2\",\"51\",\"52\",\"53\",\"67\",\"66\",\"107\"]","AnimationDelay:num":"800","Modifiers":"","Damage":"","DmgMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","DmgAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Turns":"","TurnMultiply:arraynum":"[\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\",\"1.0\"]","TurnAddition:arraynum":"[\"0\",\"2\",\"4\",\"6\",\"8\",\"10\",\"12\",\"14\",\"16\",\"18\",\"20\"]","Repeat":"","RepeatMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","RepeatAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Effect":"","EffectMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","EffectAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]","Analyze":"","AnalyzeMultiply:arraynum":"[\"1.0\",\"2.0\",\"3.0\",\"4.0\",\"5.0\",\"6.0\",\"7.0\",\"8.0\",\"9.0\",\"10.0\",\"11.0\"]","AnalyzeAddition:arraynum":"[\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\"]"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Settings for the Boost Action UI.
 * @default {"Icons":"","BoostIcon:num":"163","EmptyIcon:num":"161","IconSizeRate:num":"0.5","SmoothIcons:eval":"true","Vocab":"","BoostCmd:str":"Boost","ShowBoostCmd:eval":"true","UnboostCmd:str":"Unboost","ShowUnboostCmd:eval":"true","Controls":"","PgUpDnShortcuts:eval":"true","BypassConstructors:arraystr":"[\"Window_BattleActor\",\"Window_BattleEnemy\",\"Window_BattleItem\",\"Window_PartyBattleSwitch\"]","BattleStatus":"","BattleStatusShow:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BoostPoints
 * @text Boost Points
 *
 * @param MaxStored:num
 * @text Max Stored
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc Maximum Boost Points that can be stored at any time.
 * @default 5
 *
 * @param Usable:num
 * @text Max Usable
 * @parent BoostPoints
 * @type number
 * @min 1
 * @desc How many Boost Points can be usable at a time?
 * @default 3
 *
 * @param StartBattle:num
 * @text Start Battle
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points as a base do you want battlers
 * to start battles with?
 * @default 1
 *
 * @param Regen:num
 * @text Regeneration
 * @parent BoostPoints
 * @type number
 * @desc How many Boost Points do you want battlers to regenerate
 * each turn applicable?
 * @default 1
 *
 * @param AlwaysRegen:eval
 * @text Always Regen?
 * @parent Regen:num
 * @type boolean
 * @on Always
 * @off Other
 * @desc Always regenerate Boost Points each turn? Otherwise,
 * regenerate on turns when Boost Points weren't used.
 * @default false
 *
 * @param DeathRegen:eval
 * @text Death Regen?
 * @parent Regen:num
 * @type boolean
 * @on Regen on Death
 * @off No Regen
 * @desc Regenerate Boost Points while dead?
 * Otherwise, don't.
 * @default false
 *
 * @param DeathRemoval:eval
 * @text Death Removal?
 * @parent BoostPoints
 * @type boolean
 * @on Remove on Death
 * @off No Removal
 * @desc Remove all stored Boost Points on death?
 * Otherwise, keep them.
 * @default true
 * 
 * @param Animations
 * @text Boost Animations
 *
 * @param Animations:arraynum
 * @text Animation ID's
 * @parent Animations
 * @type animation[]
 * @desc Animation IDs start from 0 Boosts to max.
 * These animations play when Boosting/Unboosting.
 * @default ["12","13","15","14","2","51","52","53","67","66","107"]
 *
 * @param AnimationDelay:num
 * @text Animation Delay
 * @parent Animations
 * @type number
 * @desc How many milliseconds to play between animations when
 * enemies Boost actions?
 * @default 1000
 *
 * @param BoostAniMirror:eval
 * @text Mirror Animation
 * @parent Animations
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param BoostAniMute:eval
 * @text Mute Animation
 * @parent Animations
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * This is used for on boost.
 * @default false
 *
 * @param RepeatBoostAni:eval
 * @text Repeat Animation?
 * @parent Animations
 * @type boolean
 * @on Repeat
 * @off Single
 * @desc Repeat boost animation played?
 * Only repeated during command input.
 * @default false
 * 
 * @param RepeatAniCycle:num
 * @text Repeat Cycle
 * @parent RepeatBoostAni:eval
 * @desc How many frames to wait between each animation?
 * 60 frames = 1 second.
 * @default 120
 *
 * @param RepeatAniMirror:eval
 * @text Mirror Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation when repeated?
 * Overrides on boost Mirror setting.
 * @default false
 *
 * @param RepeatAniMute:eval
 * @text Mute Animation
 * @parent RepeatBoostAni:eval
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation when repeated?
 * Overrides on boost Mute setting.
 * @default true
 * 
 * @param Modifiers
 * @text Boost Modifiers
 * 
 * @param Damage
 * @parent Modifiers
 *
 * @param DmgMultiply:arraynum
 * @text Multipliers
 * @parent Damage
 * @type string[]
 * @desc Damage multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param DmgAddition:arraynum
 * @text Addition
 * @parent Damage
 * @type string[]
 * @desc Damage addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Damage> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Turns
 * @parent Modifiers
 * @text State/Buff Turns
 *
 * @param TurnMultiply:arraynum
 * @text Multipliers
 * @parent Turns
 * @type string[]
 * @desc Turn multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0","1.0"]
 *
 * @param TurnAddition:arraynum
 * @text Addition
 * @parent Turns
 * @type string[]
 * @desc Turn addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Turns> notetag.
 * @default ["0","2","4","6","8","10","12","14","16","18","20"]
 * 
 * @param Repeat
 * @parent Modifiers
 * @text Repeated Hits
 *
 * @param RepeatMultiply:arraynum
 * @text Multipliers
 * @parent Repeat
 * @type string[]
 * @desc Repeat multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param RepeatAddition:arraynum
 * @text Addition
 * @parent Repeat
 * @type string[]
 * @desc Repeat addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Repeat> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Effect
 * @parent Modifiers
 *
 * @param EffectMultiply:arraynum
 * @text Multipliers
 * @parent Effect
 * @type string[]
 * @desc Effect multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param EffectAddition:arraynum
 * @text Addition
 * @parent Effect
 * @type string[]
 * @desc Effect addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Effect Gain> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 * 
 * @param Analyze
 * @parent Modifiers
 *
 * @param AnalyzeMultiply:arraynum
 * @text Multipliers
 * @parent Analyze
 * @type string[]
 * @desc Analyze multipliers start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["1.0","2.0","3.0","4.0","5.0","6.0","7.0","8.0","9.0","10.0","11.0"]
 *
 * @param AnalyzeAddition:arraynum
 * @text Addition
 * @parent Analyze
 * @type string[]
 * @desc Analyze addition start from 0 Boosts to max.
 * Affects skills/items with <Boost Analyze> notetag.
 * @default ["0","0","0","0","0","0","0","0","0","0","0"]
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param BoostIcon:num
 * @text Boost Icon
 * @parent Icons
 * @desc What icon do you wish to represent Boosting
 * and Boost Point availability?
 * @default 163
 *
 * @param EmptyIcon:num
 * @text Empty Icon
 * @parent Icons
 * @desc What icon do you wish to represent Unboosting
 * and Boost Point absence?
 * @default 161
 *
 * @param IconSizeRate:num
 * @text Icon Size Rate
 * @parent Icons
 * @desc What size do you wish the icons to be displayed at?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param SmoothIcons:eval
 * @text Smooth Icons?
 * @parent Icons
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default true
 * 
 * @param Vocab
 *
 * @param BoostCmd:str
 * @text Boost Command
 * @parent Vocab
 * @desc This is the text used for the "Boost" command
 * displayed in the Actor Command Window.
 * @default Boost
 *
 * @param ShowBoostCmd:eval
 * @text Show?
 * @parent BoostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 *
 * @param UnboostCmd:str
 * @text Unboost Command
 * @parent Vocab
 * @desc This is the text used for the "Unboost" command
 * displayed in the Actor Command Window.
 * @default Unboost
 *
 * @param ShowUnboostCmd:eval
 * @text Show?
 * @parent UnboostCmd:str
 * @type boolean
 * @on Show Command
 * @off Hide Command
 * @desc Show this command in the Actor Command Window?
 * @default true
 * 
 * @param Controls
 * @text Shortcut Controls
 *
 * @param PgUpDnShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Controls
 * @type boolean
 * @on Enable Shortcuts
 * @off Disable Shortcuts
 * @desc Enable Page Up/Down keys to adjust Boost points
 * as a shortcut?
 * @default true
 *
 * @param BypassConstructors:arraystr
 * @text Bypassed Windows
 * @parent Controls
 * @type string[]
 * @desc These are constructor names for windows that the shortcut
 * key will not work on.
 * @default ["Window_BattleActor","Window_BattleEnemy","Window_BattleItem","Window_PartyBattleSwitch"]
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusShow:eval
 * @text Show Boost Points?
 * @parent BattleStatus
 * @type boolean
 * @on Show Boost Points
 * @off Hide Boost Points
 * @desc Show Boost Points in the Battle Status Window?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Boost Points?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the Boost icons X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the Boost icons Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 *
 */
//=============================================================================

const _0x5ee417=_0x3999;(function(_0xda0521,_0x4ca7ac){const _0x3003af=_0x3999,_0x49f58d=_0xda0521();while(!![]){try{const _0x7db803=parseInt(_0x3003af(0x179))/0x1+parseInt(_0x3003af(0x15a))/0x2*(-parseInt(_0x3003af(0xd8))/0x3)+parseInt(_0x3003af(0xda))/0x4*(parseInt(_0x3003af(0x12e))/0x5)+parseInt(_0x3003af(0x1c7))/0x6+-parseInt(_0x3003af(0x11e))/0x7+-parseInt(_0x3003af(0xb8))/0x8+parseInt(_0x3003af(0x1cb))/0x9*(parseInt(_0x3003af(0x13b))/0xa);if(_0x7db803===_0x4ca7ac)break;else _0x49f58d['push'](_0x49f58d['shift']());}catch(_0x47551a){_0x49f58d['push'](_0x49f58d['shift']());}}}(_0x3d7d,0x4477f));var label=_0x5ee417(0x8a),tier=tier||0x0,dependencies=[_0x5ee417(0xdd),_0x5ee417(0xaa),'VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x5ee417(0x1af)](function(_0x5f255e){const _0x1a18ec=_0x5ee417;return _0x5f255e['status']&&_0x5f255e[_0x1a18ec(0xdf)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x5ee417(0xf9)]=VisuMZ[label][_0x5ee417(0xf9)]||{},VisuMZ[_0x5ee417(0x1a6)]=function(_0x3a608d,_0x56dfba){const _0x499d20=_0x5ee417;for(const _0x46c9a9 in _0x56dfba){if(_0x46c9a9[_0x499d20(0xf1)](/(.*):(.*)/i)){const _0x420239=String(RegExp['$1']),_0x29f9be=String(RegExp['$2'])[_0x499d20(0x10c)]()[_0x499d20(0xd6)]();let _0x378f11,_0x1495f5,_0xde3190;switch(_0x29f9be){case _0x499d20(0xc5):_0x378f11=_0x56dfba[_0x46c9a9]!==''?Number(_0x56dfba[_0x46c9a9]):0x0;break;case _0x499d20(0x1b0):_0x1495f5=_0x56dfba[_0x46c9a9]!==''?JSON['parse'](_0x56dfba[_0x46c9a9]):[],_0x378f11=_0x1495f5['map'](_0x177348=>Number(_0x177348));break;case _0x499d20(0xa5):_0x378f11=_0x56dfba[_0x46c9a9]!==''?eval(_0x56dfba[_0x46c9a9]):null;break;case _0x499d20(0x11d):_0x1495f5=_0x56dfba[_0x46c9a9]!==''?JSON['parse'](_0x56dfba[_0x46c9a9]):[],_0x378f11=_0x1495f5[_0x499d20(0xf2)](_0x31c15d=>eval(_0x31c15d));break;case _0x499d20(0xe1):_0x378f11=_0x56dfba[_0x46c9a9]!==''?JSON[_0x499d20(0xfb)](_0x56dfba[_0x46c9a9]):'';break;case _0x499d20(0xab):_0x1495f5=_0x56dfba[_0x46c9a9]!==''?JSON[_0x499d20(0xfb)](_0x56dfba[_0x46c9a9]):[],_0x378f11=_0x1495f5['map'](_0x46b5c7=>JSON[_0x499d20(0xfb)](_0x46b5c7));break;case'FUNC':_0x378f11=_0x56dfba[_0x46c9a9]!==''?new Function(JSON['parse'](_0x56dfba[_0x46c9a9])):new Function(_0x499d20(0x8e));break;case _0x499d20(0x1b8):_0x1495f5=_0x56dfba[_0x46c9a9]!==''?JSON[_0x499d20(0xfb)](_0x56dfba[_0x46c9a9]):[],_0x378f11=_0x1495f5[_0x499d20(0xf2)](_0x563cc5=>new Function(JSON[_0x499d20(0xfb)](_0x563cc5)));break;case _0x499d20(0xe6):_0x378f11=_0x56dfba[_0x46c9a9]!==''?String(_0x56dfba[_0x46c9a9]):'';break;case _0x499d20(0x9b):_0x1495f5=_0x56dfba[_0x46c9a9]!==''?JSON[_0x499d20(0xfb)](_0x56dfba[_0x46c9a9]):[],_0x378f11=_0x1495f5[_0x499d20(0xf2)](_0x35f927=>String(_0x35f927));break;case'STRUCT':_0xde3190=_0x56dfba[_0x46c9a9]!==''?JSON[_0x499d20(0xfb)](_0x56dfba[_0x46c9a9]):{},_0x378f11=VisuMZ['ConvertParams']({},_0xde3190);break;case _0x499d20(0xba):_0x1495f5=_0x56dfba[_0x46c9a9]!==''?JSON[_0x499d20(0xfb)](_0x56dfba[_0x46c9a9]):[],_0x378f11=_0x1495f5[_0x499d20(0xf2)](_0x42c1c0=>VisuMZ['ConvertParams']({},JSON[_0x499d20(0xfb)](_0x42c1c0)));break;default:continue;}_0x3a608d[_0x420239]=_0x378f11;}}return _0x3a608d;},(_0x3e5da6=>{const _0x196931=_0x5ee417,_0x24f2f6=_0x3e5da6['name'];for(const _0x389295 of dependencies){if(!Imported[_0x389295]){alert(_0x196931(0x194)[_0x196931(0x181)](_0x24f2f6,_0x389295)),SceneManager['exit']();break;}}const _0x4241cc=_0x3e5da6['description'];if(_0x4241cc[_0x196931(0xf1)](/\[Version[ ](.*?)\]/i)){const _0x1262f9=Number(RegExp['$1']);_0x1262f9!==VisuMZ[label][_0x196931(0xfd)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x24f2f6,_0x1262f9)),SceneManager[_0x196931(0xeb)]());}if(_0x4241cc['match'](/\[Tier[ ](\d+)\]/i)){const _0x3b074f=Number(RegExp['$1']);_0x3b074f<tier?(alert(_0x196931(0xad)[_0x196931(0x181)](_0x24f2f6,_0x3b074f,tier)),SceneManager[_0x196931(0xeb)]()):tier=Math['max'](_0x3b074f,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x3e5da6[_0x196931(0x80)]);})(pluginData),VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x1d6)]={'BoostDamage':/<(?:BP|BOOST) (?:DMG|DAMAGE)>/i,'BoostTurns':/<(?:BP|BOOST) (?:TURN|TURNS)>/i,'BoostRepeat':/<(?:BP|BOOST) (?:REPEAT|REPEATS|HIT|HITS)>/i,'BoostAnalyze':/<(?:BP|BOOST) (?:ANALYZE|ANALYSIS)>/i,'TargetBoostPoints':/<TARGET (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'UserBoostPoints':/<USER (?:BP|BOOST POINT|BOOST POINTS): ([\+\-]\d+)>/i,'BoostGainPoints':/<(?:BP|BOOST) (?:BP|BOOST POINT|BOOST POINTS|POINT|POINTS|EFFECT|EFFECTS) (?:EFFECT|GAIN|LOSS)>/i,'Require':{'Amount':/<REQUIRE (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'GreaterEqual':/<REQUIRE >= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Greater':/<REQUIRE > (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Equal':/<REQUIRE = (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'Less':/<REQUIRE < (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i,'LessEqual':/<REQUIRE <= (\d+) (?:BP|BOOST POINT|BOOST POINTS)>/i},'BoostSealed':/<(?:BP|BOOST) (?:SEAL|SEALED)>/i,'BoostBattleStartRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: (\d+)([%％])>/i,'BoostBattleStartFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) BATTLE START: ([\+\-]\d+)>/i,'BoostPointsRegenRate':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: (\d+)([%％])>/i,'BoostPointsRegenFlat':/<(?:BP|BOOST|BOOST POINT|BOOST POINTS) REGEN: ([\+\-]\d+)>/i,'EnemyBoostSkillID':/<BOOST SKILL (\d+):[ ](.*)>/i,'EnemyBoostSkillName':/<BOOST (.*):[ ](.*)>/i},ImageManager[_0x5ee417(0xd5)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['UI'][_0x5ee417(0x14f)],ImageManager[_0x5ee417(0x148)]=VisuMZ[_0x5ee417(0x8a)]['Settings']['UI'][_0x5ee417(0x162)],ImageManager[_0x5ee417(0x161)]=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['UI'][_0x5ee417(0x9c)],ImageManager[_0x5ee417(0x171)]=function(){const _0x5203cd=_0x5ee417;if(!this['_boostIconSheet']){this[_0x5203cd(0xb2)]=new Bitmap();const _0x179267=ImageManager[_0x5203cd(0xc9)]('IconSet');_0x179267[_0x5203cd(0x8f)](this['boostTransferBitmap']['bind'](this,_0x179267));}return this['_boostIconSheet'];},ImageManager['boostTransferBitmap']=function(_0x7b86aa){const _0x2f3ad7=_0x5ee417;this[_0x2f3ad7(0xb2)]['resize'](_0x7b86aa['width'],_0x7b86aa['height']),this['_boostIconSheet'][_0x2f3ad7(0x9a)](_0x7b86aa,0x0,0x0,_0x7b86aa[_0x2f3ad7(0x1b1)],_0x7b86aa['height'],0x0,0x0),this[_0x2f3ad7(0xb2)][_0x2f3ad7(0x106)]=ImageManager['boostSmooth'],this[_0x2f3ad7(0xb2)]['_customModified']=![];},TextManager[_0x5ee417(0x173)]=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['UI']['BoostCmd'],TextManager[_0x5ee417(0x141)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['UI'][_0x5ee417(0x88)],VisuMZ[_0x5ee417(0x8a)]['BattleManager_setup']=BattleManager[_0x5ee417(0x122)],BattleManager[_0x5ee417(0x122)]=function(_0x431b01,_0x24f267,_0x5c286f){const _0x128896=_0x5ee417;VisuMZ['BoostAction'][_0x128896(0x8d)][_0x128896(0x112)](this,_0x431b01,_0x24f267,_0x5c286f),$gameParty['setupBattleBoostPoints'](),$gameTroop['setupBattleBoostPoints']();},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf4)]=BattleManager[_0x5ee417(0x85)],BattleManager[_0x5ee417(0x85)]=function(){const _0x46a9bf=_0x5ee417;this[_0x46a9bf(0x184)](),VisuMZ[_0x46a9bf(0x8a)][_0x46a9bf(0xf4)]['call'](this);},BattleManager['processEnemyUseBoost']=function(){const _0xce6e34=_0x5ee417;var _0x54e24f=this['_subject'],_0xb2c52d=_0x54e24f['currentAction']();!!_0x54e24f&&_0x54e24f['isEnemy']()&&!!_0xb2c52d&&_0xb2c52d[_0xce6e34(0x11c)]()&&_0x54e24f[_0xce6e34(0xcd)]()>0x0&&!_0x54e24f['isBoostSealed']()&&_0x54e24f[_0xce6e34(0x104)](_0xb2c52d[_0xce6e34(0x133)]());},BattleManager['allowBoostAction']=function(){const _0x21662a=_0x5ee417;if(Imported[_0x21662a(0x18b)]&&this['isBTB']())return![];return!![];},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x156)]=Game_Action['prototype'][_0x5ee417(0x1b6)],Game_Action['prototype'][_0x5ee417(0x1b6)]=function(){const _0xcb03e5=_0x5ee417;var _0x11d252=VisuMZ[_0xcb03e5(0x8a)]['Game_Action_numRepeats']['call'](this);_0x11d252=this[_0xcb03e5(0x92)](_0x11d252);return Math[_0xcb03e5(0x189)](_0x11d252);;},Game_Action['prototype'][_0x5ee417(0x92)]=function(_0x1a7044){const _0x218899=_0x5ee417,_0x3e59ca=VisuMZ[_0x218899(0x8a)][_0x218899(0x1d6)];if(!!this[_0x218899(0xc3)]()&&!!this[_0x218899(0x133)]()&&this['item']()[_0x218899(0x1ba)]['match'](_0x3e59ca['BoostRepeat'])){var _0x6f3ac=this[_0x218899(0xc3)]()['boostMultiplier']('Repeat');_0x1a7044=Math[_0x218899(0x189)](_0x1a7044*_0x6f3ac),_0x1a7044+=this[_0x218899(0xc3)]()[_0x218899(0x98)](_0x218899(0xf0));}return _0x1a7044;},VisuMZ[_0x5ee417(0x8a)]['Game_Action_applyGuard']=Game_Action[_0x5ee417(0x12b)][_0x5ee417(0x1bd)],Game_Action[_0x5ee417(0x12b)][_0x5ee417(0x1bd)]=function(_0x57dd74,_0x2308ec){const _0x4dcd24=_0x5ee417;return _0x57dd74=this[_0x4dcd24(0x1d4)](_0x57dd74),VisuMZ[_0x4dcd24(0x8a)][_0x4dcd24(0x83)][_0x4dcd24(0x112)](this,_0x57dd74,_0x2308ec);},Game_Action['prototype']['applyBoostPointDamage']=function(_0x34e5d4){const _0xdbcecd=_0x5ee417,_0x136371=VisuMZ[_0xdbcecd(0x8a)]['RegExp'];if(!!this['subject']()&&this['item']()[_0xdbcecd(0x1ba)][_0xdbcecd(0xf1)](_0x136371[_0xdbcecd(0xb0)])){var _0x1e6555=this['subject']()['boostMultiplier'](_0xdbcecd(0x19a));_0x34e5d4=Math['round'](_0x34e5d4*_0x1e6555),_0x34e5d4+=this[_0xdbcecd(0xc3)]()[_0xdbcecd(0x98)](_0xdbcecd(0x19a));}return _0x34e5d4;},VisuMZ[_0x5ee417(0x8a)]['Game_Action_apply']=Game_Action[_0x5ee417(0x12b)]['apply'],Game_Action[_0x5ee417(0x12b)][_0x5ee417(0x82)]=function(_0x379bd8){const _0x4166ca=_0x5ee417;this[_0x4166ca(0x145)](![]),VisuMZ[_0x4166ca(0x8a)][_0x4166ca(0x197)]['call'](this,_0x379bd8),this[_0x4166ca(0x145)](!![]);},Game_Action[_0x5ee417(0x12b)][_0x5ee417(0x145)]=function(_0x5114e3){const _0x19ed62=_0x5ee417,_0x232a97=VisuMZ[_0x19ed62(0x8a)][_0x19ed62(0x1d6)];if(!!this[_0x19ed62(0xc3)]()&&this[_0x19ed62(0x133)]()[_0x19ed62(0x1ba)]['match'](_0x232a97[_0x19ed62(0x10d)])){var _0x5bccf9=this[_0x19ed62(0xc3)]()[_0x19ed62(0xf3)](_0x19ed62(0xfa));$gameTemp['_bpTurnRate']=_0x5bccf9,$gameTemp[_0x19ed62(0x136)]=this[_0x19ed62(0xc3)]()[_0x19ed62(0x98)]('Turn');}_0x5114e3&&($gameTemp[_0x19ed62(0x1b4)]=undefined,$gameTemp['_bpTurnFlat']=undefined);},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x182)]=Game_Action[_0x5ee417(0x12b)]['applyItemUserEffect'],Game_Action[_0x5ee417(0x12b)][_0x5ee417(0xf5)]=function(_0x487da5){const _0x53ceb5=_0x5ee417;VisuMZ['BoostAction'][_0x53ceb5(0x182)][_0x53ceb5(0x112)](this,_0x487da5),this['applyBPEffects'](_0x487da5);},Game_Action[_0x5ee417(0x12b)][_0x5ee417(0x9e)]=function(_0xefd376){const _0x1df173=_0x5ee417,_0x8d7bc6=VisuMZ['BoostAction'][_0x1df173(0x1d6)];if(!!_0xefd376&&this[_0x1df173(0x133)]()[_0x1df173(0x1ba)][_0x1df173(0xf1)](_0x8d7bc6['TargetBoostPoints'])){var _0x54b359=parseInt(RegExp['$1']);this['item']()[_0x1df173(0x1ba)]['match'](_0x8d7bc6[_0x1df173(0x19d)])&&(_0x54b359=Math[_0x1df173(0x189)](this[_0x1df173(0xc3)]()[_0x1df173(0xf3)](_0x1df173(0xbc))*_0x54b359),_0x54b359+=this['subject']()[_0x1df173(0x98)](_0x1df173(0xbc))),_0xefd376[_0x1df173(0xa4)](_0x54b359);}if(!!this[_0x1df173(0xc3)]()&&this[_0x1df173(0x133)]()[_0x1df173(0x1ba)][_0x1df173(0xf1)](_0x8d7bc6[_0x1df173(0xc8)])){var _0x54b359=parseInt(RegExp['$1']);this[_0x1df173(0x133)]()[_0x1df173(0x1ba)][_0x1df173(0xf1)](_0x8d7bc6[_0x1df173(0x19d)])&&(_0x54b359=Math[_0x1df173(0x189)](this[_0x1df173(0xc3)]()['boostMultiplier'](_0x1df173(0xbc))*_0x54b359),_0x54b359+=this[_0x1df173(0xc3)]()['boostAddition'](_0x1df173(0xbc))),this['subject']()[_0x1df173(0xa4)](_0x54b359);}},Game_BattlerBase['BOOST_POINTS_MAX_STORED']=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x1ae)],Game_BattlerBase[_0x5ee417(0x107)]=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x13e)],Game_BattlerBase[_0x5ee417(0x17f)]=VisuMZ['BoostAction']['Settings'][_0x5ee417(0x149)][_0x5ee417(0x10f)],Game_BattlerBase[_0x5ee417(0xb7)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['Mechanics']['DeathRemoval'],Game_BattlerBase['BOOST_POINTS_REGEN_ALWAYS']=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)]['AlwaysRegen'],Game_BattlerBase[_0x5ee417(0xde)]=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x170)],Game_BattlerBase[_0x5ee417(0x81)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)][_0x5ee417(0x149)]['StartBattle'],VisuMZ[_0x5ee417(0x8a)]['Game_BattlerBase_initialize']=Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0x117)],Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0x117)]=function(){const _0x2add9e=_0x5ee417;VisuMZ[_0x2add9e(0x8a)][_0x2add9e(0x11b)]['call'](this),this['initBoostAction']();},Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0x15d)]=function(){const _0x11779c=_0x5ee417;this['_storedBoostPoints']=this[_0x11779c(0x124)]||0x0,this[_0x11779c(0x1a4)]=this['_toUseBoostPoints']||0x0,this[_0x11779c(0x13f)]=this['_turnUsedBoostPoints']||0x0;},Game_BattlerBase[_0x5ee417(0x12b)]['storedBoostPoints']=function(){const _0x3d36a7=_0x5ee417;return this[_0x3d36a7(0x124)]===undefined&&this['initBoostAction'](),this[_0x3d36a7(0x124)];},Game_BattlerBase[_0x5ee417(0x12b)]['setStoredBoostPoints']=function(_0x4881fa){const _0x10ca1c=_0x5ee417;this[_0x10ca1c(0x124)]===undefined&&this['initBoostAction'](),_0x4881fa=Math[_0x10ca1c(0x189)](_0x4881fa),this[_0x10ca1c(0x124)]=_0x4881fa['clamp'](0x0,Game_BattlerBase[_0x10ca1c(0x1ca)]),this[_0x10ca1c(0x19e)]();},Game_BattlerBase['prototype'][_0x5ee417(0x84)]=function(){const _0x35dbe4=_0x5ee417;if(!$gameParty[_0x35dbe4(0x12f)]())return 0x0;return this[_0x35dbe4(0x1a4)]===undefined&&this[_0x35dbe4(0x15d)](),this[_0x35dbe4(0x1a4)];},Game_BattlerBase[_0x5ee417(0x12b)]['setToUseBoostPoints']=function(_0x49e636){const _0x179e3d=_0x5ee417;this[_0x179e3d(0x1a4)]===undefined&&this[_0x179e3d(0x15d)](),_0x49e636=Math[_0x179e3d(0x189)](_0x49e636),this['_toUseBoostPoints']=_0x49e636['clamp'](0x0,Game_BattlerBase[_0x179e3d(0x107)]),this[_0x179e3d(0x19e)]();},Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0x12c)]=function(){const _0x12c043=_0x5ee417;if(!Game_BattlerBase[_0x12c043(0x17f)]&&(this[_0x12c043(0x15c)]()||this['isHidden']()))return 0x0;else{var _0x2332d5=Game_BattlerBase[_0x12c043(0xde)];return _0x2332d5=this['bpRegenMultipliers'](_0x2332d5),_0x2332d5=this[_0x12c043(0xee)](_0x2332d5),_0x2332d5;}},Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0x1a9)]=function(){const _0xfe0c69=_0x5ee417,_0x56b6c3=this[_0xfe0c69(0x12d)](),_0x3d260b=VisuMZ[_0xfe0c69(0x8a)]['RegExp'];return _0x56b6c3[_0xfe0c69(0x18c)](_0x1b70d6=>_0x1b70d6&&_0x1b70d6['note'][_0xfe0c69(0xf1)](_0x3d260b[_0xfe0c69(0x180)]));},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xc4)]=Game_BattlerBase['prototype']['resetStateCounts'],Game_BattlerBase['prototype']['resetStateCounts']=function(_0x46c0ca){const _0x48a4bd=_0x5ee417;var _0x49ad14=this[_0x48a4bd(0xdc)][_0x46c0ca]||0x0;VisuMZ[_0x48a4bd(0x8a)]['Game_BattlerBase_resetStateCounts'][_0x48a4bd(0x112)](this,_0x46c0ca);if(!!$gameTemp[_0x48a4bd(0x1b4)]){$gameTemp[_0x48a4bd(0x136)]=$gameTemp[_0x48a4bd(0x136)]||0x0;var _0x424726=$dataStates[_0x46c0ca],_0x2c3f28=Math[_0x48a4bd(0x189)](_0x424726[_0x48a4bd(0x1ad)]*$gameTemp[_0x48a4bd(0x1b4)])+$gameTemp['_bpTurnFlat'],_0x25ceb4=Math['round'](_0x424726[_0x48a4bd(0x113)]*$gameTemp[_0x48a4bd(0x1b4)])+$gameTemp[_0x48a4bd(0x136)],_0x4b71fa=0x1+Math['max'](_0x2c3f28-_0x25ceb4,0x0);const _0x47f158=this[_0x48a4bd(0xbd)](_0x424726)[_0x48a4bd(0x154)]()[_0x48a4bd(0xd6)]();switch(_0x47f158){case _0x48a4bd(0xaf):this[_0x48a4bd(0xdc)][_0x46c0ca]=_0x25ceb4+Math[_0x48a4bd(0x1b5)](_0x4b71fa);break;case _0x48a4bd(0x1c9):const _0x2410b3=this[_0x48a4bd(0xdc)][_0x46c0ca],_0x723423=_0x25ceb4+Math['randomInt'](_0x4b71fa);this[_0x48a4bd(0xdc)][_0x46c0ca]=Math[_0x48a4bd(0x1b3)](_0x2410b3,_0x723423);break;case _0x48a4bd(0x165):this['_stateTurns'][_0x46c0ca]=_0x25ceb4+Math['randomInt'](_0x4b71fa)+_0x49ad14;break;}}},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x159)]=Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0xa3)],Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0xa3)]=function(_0x1db7dd){const _0x22dc8e=_0x5ee417;return VisuMZ[_0x22dc8e(0x8a)]['Game_BattlerBase_meetsUsableItemConditions'][_0x22dc8e(0x112)](this,_0x1db7dd)?this['meetstoUseBoostPointsRequirement'](_0x1db7dd):![];},Game_BattlerBase[_0x5ee417(0x12b)][_0x5ee417(0x192)]=function(_0x3a6667){const _0x3ea5a6=_0x5ee417,_0x58e03e=VisuMZ[_0x3ea5a6(0x8a)][_0x3ea5a6(0x1d6)];var _0x342e6a=_0x3a6667['note'];if(_0x342e6a[_0x3ea5a6(0xf1)](_0x58e03e[_0x3ea5a6(0x10e)][_0x3ea5a6(0x132)])||_0x342e6a[_0x3ea5a6(0xf1)](_0x58e03e[_0x3ea5a6(0x10e)][_0x3ea5a6(0x140)])){var _0x1b18b0=parseInt(RegExp['$1']);return this[_0x3ea5a6(0xc7)]()?this[_0x3ea5a6(0x84)]()>=_0x1b18b0:this[_0x3ea5a6(0xcd)]()>=_0x1b18b0;}else{if(_0x3a6667['note']['match'](_0x58e03e[_0x3ea5a6(0x10e)][_0x3ea5a6(0x140)])){var _0x1b18b0=parseInt(RegExp['$1']);return this[_0x3ea5a6(0xc7)]()?this[_0x3ea5a6(0x84)]()>_0x1b18b0:this['storedBoostPoints']()>_0x1b18b0;}else{if(_0x3a6667[_0x3ea5a6(0x1ba)][_0x3ea5a6(0xf1)](_0x58e03e[_0x3ea5a6(0x10e)][_0x3ea5a6(0xbb)])){var _0x1b18b0=parseInt(RegExp['$1']);return this[_0x3ea5a6(0xc7)]()?this['toUseBoostPoints']()===_0x1b18b0:this[_0x3ea5a6(0xcd)]()===_0x1b18b0;}else{if(_0x3a6667['note'][_0x3ea5a6(0xf1)](_0x58e03e[_0x3ea5a6(0x10e)][_0x3ea5a6(0x199)])){var _0x1b18b0=parseInt(RegExp['$1']);return this['isActor']()?this['toUseBoostPoints']()<_0x1b18b0:this[_0x3ea5a6(0xcd)]()<_0x1b18b0;}else{if(_0x3a6667[_0x3ea5a6(0x1ba)][_0x3ea5a6(0xf1)](_0x58e03e[_0x3ea5a6(0x10e)]['LessEqual'])){var _0x1b18b0=parseInt(RegExp['$1']);return this[_0x3ea5a6(0xc7)]()?this['toUseBoostPoints']()<=_0x1b18b0:this['storedBoostPoints']()<=_0x1b18b0;}else return!![];}}}}},Game_Battler['BOOST_POINTS_MULTIPLIERS']={'Damage':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0xfe)],'Turn':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['Mechanics'][_0x5ee417(0x15b)],'Repeat':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['Mechanics'][_0x5ee417(0x14b)],'BpEffect':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x13a)],'Analyze':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x8c)]},Game_Battler[_0x5ee417(0xac)]={'Damage':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0xec)],'Turn':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x1c6)],'Repeat':VisuMZ['BoostAction']['Settings']['Mechanics'][_0x5ee417(0x172)],'BpEffect':VisuMZ[_0x5ee417(0x8a)]['Settings'][_0x5ee417(0x149)][_0x5ee417(0xae)],'Analyze':VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)][_0x5ee417(0x149)][_0x5ee417(0x18e)]},Game_Battler['BOOST_POINTS_ANIMATIONS']=VisuMZ['BoostAction']['Settings'][_0x5ee417(0x149)]['Animations'],Game_Battler['prototype'][_0x5ee417(0xa4)]=function(_0x2805){const _0x10d23c=_0x5ee417;this['setStoredBoostPoints'](this[_0x10d23c(0xcd)]()+_0x2805);},Game_Battler['prototype'][_0x5ee417(0x9f)]=function(_0x42512c){const _0x3cdbf4=_0x5ee417;this['setToUseBoostPoints'](this[_0x3cdbf4(0x84)]()+_0x42512c);},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0xf3)]=function(_0x5ed0ff){const _0x7f458f=_0x5ee417,_0x69f57=Game_Battler[_0x7f458f(0x1ce)];if(_0x5ed0ff[_0x7f458f(0xf1)](/Damage/i))var _0x34e0b4=_0x69f57[_0x7f458f(0x19a)];else{if(_0x5ed0ff['match'](/Turn/i))var _0x34e0b4=_0x69f57[_0x7f458f(0xfa)];else{if(_0x5ed0ff['match'](/Repeat/i))var _0x34e0b4=_0x69f57[_0x7f458f(0xf0)];else{if(_0x5ed0ff['match'](/BP Effect/i))var _0x34e0b4=_0x69f57[_0x7f458f(0x16f)];else{if(_0x5ed0ff['match'](/Analyze/i))var _0x34e0b4=_0x69f57['Analyze'];else return this[_0x7f458f(0x84)]();}}}}var _0x54a93a=this['toUseBoostPoints']();return _0x34e0b4[_0x54a93a]||_0x34e0b4[0x0];},Game_Battler[_0x5ee417(0x12b)]['boostAddition']=function(_0xcf4d25){const _0x707269=_0x5ee417,_0xfe290a=Game_Battler[_0x707269(0xac)];if(_0xcf4d25[_0x707269(0xf1)](/Damage/i))var _0x5b3ef4=_0xfe290a[_0x707269(0x19a)];else{if(_0xcf4d25[_0x707269(0xf1)](/Turn/i))var _0x5b3ef4=_0xfe290a['Turn'];else{if(_0xcf4d25[_0x707269(0xf1)](/Repeat/i))var _0x5b3ef4=_0xfe290a[_0x707269(0xf0)];else{if(_0xcf4d25[_0x707269(0xf1)](/BP Effect/i))var _0x5b3ef4=_0xfe290a[_0x707269(0x16f)];else{if(_0xcf4d25[_0x707269(0xf1)](/Analyze/i))var _0x5b3ef4=_0xfe290a[_0x707269(0x1c8)];else return this[_0x707269(0x84)]();}}}}var _0x58e65d=this[_0x707269(0x84)]();return parseInt(_0x5b3ef4[_0x58e65d]||_0x5b3ef4[0x0]);},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x1a7)]=function(){const _0x520313=_0x5ee417;if(this['_previousBattleChainBoostActions']){this['_previousBattleChainBoostActions']=undefined;return;}var _0x6a8796=Game_BattlerBase[_0x520313(0x81)];_0x6a8796=this['setupBattleBoostPointsMultiplier'](_0x6a8796),_0x6a8796=this['setupBattleBoostPointsAdded'](_0x6a8796),_0x6a8796=Math[_0x520313(0x189)](_0x6a8796),this[_0x520313(0x126)](_0x6a8796);},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x8b)]=function(_0x428442){const _0x818d4c=_0x5ee417,_0x4f609a=this[_0x818d4c(0x12d)](),_0x466384=VisuMZ[_0x818d4c(0x8a)]['RegExp'];for(const _0x547415 of _0x4f609a){if(!_0x547415)continue;_0x547415['note'][_0x818d4c(0xf1)](_0x466384['BoostBattleStartRate'])&&(_0x428442*=Number(RegExp['$1'])*0.01);}return _0x428442;},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0xa8)]=function(_0x53a0da){const _0x3d65d1=_0x5ee417,_0x148e66=this[_0x3d65d1(0x12d)](),_0x15080e=VisuMZ['BoostAction']['RegExp'];for(const _0x541553 of _0x148e66){if(!_0x541553)continue;_0x541553[_0x3d65d1(0x1ba)]['match'](_0x15080e['BoostBattleStartFlat'])&&(_0x53a0da+=Number(RegExp['$1']));}return _0x53a0da;},Game_Battler[_0x5ee417(0x12b)]['startChangeBoostPointsAnimation']=function(_0x455bba){const _0x3e7d20=_0x5ee417;var _0x332deb=this[_0x3e7d20(0x84)]()['clamp'](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']);const _0x139383=Game_Battler['BOOST_POINTS_ANIMATIONS'];var _0x461ba1=Number(_0x139383[_0x332deb]||_0x139383[0x0]);if(_0x461ba1>0x0){const _0x26e5ce=VisuMZ[_0x3e7d20(0x8a)][_0x3e7d20(0xf9)][_0x3e7d20(0x149)],_0x5e6bb7=_0x455bba?_0x26e5ce['RepeatAniMirror']||![]:_0x26e5ce[_0x3e7d20(0x105)]||![],_0x512059=_0x455bba?_0x26e5ce[_0x3e7d20(0x9d)]||![]:_0x26e5ce['BoostAniMute']||![];$gameTemp[_0x3e7d20(0x15e)]([this],_0x461ba1,_0x5e6bb7,_0x512059);}},Game_Battler['prototype'][_0x5ee417(0x144)]=function(){const _0x74ada4=_0x5ee417;if(this[_0x74ada4(0x1a9)]())return![];return this[_0x74ada4(0x84)]()<Game_BattlerBase[_0x74ada4(0x107)]&&this[_0x74ada4(0xcd)]()>0x0;},Game_Battler[_0x5ee417(0x12b)]['canUndoBoostPoints']=function(){const _0x5323a7=_0x5ee417;return this[_0x5323a7(0x84)]()>0x0;},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xd2)]=Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x19f)],Game_Battler['prototype']['removeBattleStates']=function(){const _0x2223c1=_0x5ee417;VisuMZ['BoostAction']['Game_Battler_removeBattleStates'][_0x2223c1(0x112)](this),this[_0x2223c1(0x124)]=0x0,this['_toUseBoostPoints']=0x0;},VisuMZ['BoostAction'][_0x5ee417(0x12a)]=Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x158)],Game_Battler[_0x5ee417(0x12b)]['regenerateTp']=function(){const _0x58cc17=_0x5ee417;VisuMZ[_0x58cc17(0x8a)][_0x58cc17(0x12a)][_0x58cc17(0x112)](this),this['regenerateBoostPoints']();},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xc0)]=Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0xbf)],Game_Battler['prototype'][_0x5ee417(0xbf)]=function(){const _0x57359c=_0x5ee417;VisuMZ['BoostAction'][_0x57359c(0xc0)][_0x57359c(0x112)](this),Game_BattlerBase[_0x57359c(0x17f)]&&this['isDead']()&&$gameParty[_0x57359c(0x12f)]()&&this[_0x57359c(0x1cd)]();},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x1cd)]=function(){const _0x553ab=_0x5ee417;(Game_BattlerBase[_0x553ab(0x10b)]||this[_0x553ab(0x13f)]<=0x0)&&this[_0x553ab(0xa4)](this[_0x553ab(0x12c)]()),this[_0x553ab(0x13f)]=0x0;},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x1ab)]=BattleManager['endAction'],BattleManager[_0x5ee417(0x109)]=function(){const _0x3e1774=_0x5ee417;this['_subject']&&this[_0x3e1774(0x137)]['endActionBoostPoints'](),VisuMZ['BoostAction'][_0x3e1774(0x1ab)][_0x3e1774(0x112)](this);},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x1bc)]=function(){const _0xbc1464=_0x5ee417;if(Imported[_0xbc1464(0xa1)]&&$gameTemp['getActiveChainSkillSelected']())return;this['_turnUsedBoostPoints']+=this['toUseBoostPoints'](),this['setToUseBoostPoints'](0x0);},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x118)]=function(_0x1acb39){const _0x165150=_0x5ee417,_0x20cba6=this[_0x165150(0x12d)](),_0xb45cca=VisuMZ[_0x165150(0x8a)][_0x165150(0x1d6)];for(const _0x31d4c9 of _0x20cba6){if(!_0x31d4c9)continue;_0x31d4c9[_0x165150(0x1ba)][_0x165150(0xf1)](_0xb45cca[_0x165150(0xdb)])&&(_0x1acb39*=Number(RegExp['$1'])*0.01);}return _0x1acb39;},Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0xee)]=function(_0x5be02c){const _0x52e452=_0x5ee417,_0x582a30=this['traitObjects'](),_0x16b724=VisuMZ[_0x52e452(0x8a)][_0x52e452(0x1d6)];for(const _0xe9a549 of _0x582a30){if(!_0xe9a549)continue;_0xe9a549[_0x52e452(0x1ba)][_0x52e452(0xf1)](_0x16b724[_0x52e452(0x178)])&&(_0x5be02c+=Number(RegExp['$1']));}return _0x5be02c;},VisuMZ[_0x5ee417(0x8a)]['Game_Battler_addState']=Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x94)],Game_Battler['prototype'][_0x5ee417(0x94)]=function(_0x2e311c){const _0x4a77c9=_0x5ee417;var _0x11e8c2=this[_0x4a77c9(0x15c)]();VisuMZ[_0x4a77c9(0x8a)][_0x4a77c9(0x102)][_0x4a77c9(0x112)](this,_0x2e311c),Game_BattlerBase[_0x4a77c9(0xb7)]&&!_0x11e8c2&&this['isDead']()&&this[_0x4a77c9(0x126)](0x0);},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xb4)]=Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x1be)],Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x1be)]=function(_0x463ca0,_0x1e1c4e){const _0x14b615=_0x5ee417;!!$gameTemp['_bpTurnRate']&&($gameTemp[_0x14b615(0x136)]=$gameTemp[_0x14b615(0x136)]||0x0,_0x1e1c4e=Math[_0x14b615(0x189)]($gameTemp[_0x14b615(0x1b4)]*_0x1e1c4e)+$gameTemp[_0x14b615(0x136)]),VisuMZ[_0x14b615(0x8a)]['Game_Battler_addBuff'][_0x14b615(0x112)](this,_0x463ca0,_0x1e1c4e);},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x1b7)]=Game_Battler[_0x5ee417(0x12b)][_0x5ee417(0x1bb)],Game_Battler['prototype'][_0x5ee417(0x1bb)]=function(_0x316642,_0x5a14dc){const _0x18de9d=_0x5ee417;!!$gameTemp[_0x18de9d(0x1b4)]&&($gameTemp[_0x18de9d(0x136)]=$gameTemp[_0x18de9d(0x136)]||0x0,_0x5a14dc=Math[_0x18de9d(0x189)]($gameTemp[_0x18de9d(0x1b4)]*_0x5a14dc)+$gameTemp['_bpTurnFlat']),VisuMZ['BoostAction']['Game_Battler_addDebuff'][_0x18de9d(0x112)](this,_0x316642,_0x5a14dc);},Game_Enemy[_0x5ee417(0xb1)]=VisuMZ[_0x5ee417(0x8a)]['Settings']['Mechanics'][_0x5ee417(0xca)],VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x116)]=Game_Enemy[_0x5ee417(0x12b)][_0x5ee417(0x122)],Game_Enemy[_0x5ee417(0x12b)]['setup']=function(_0x41f719,_0x5632bb,_0x3238c9){const _0x105fa3=_0x5ee417;VisuMZ[_0x105fa3(0x8a)]['Game_Enemy_setup'][_0x105fa3(0x112)](this,_0x41f719,_0x5632bb,_0x3238c9),this[_0x105fa3(0x120)]();},Game_Enemy[_0x5ee417(0x12b)]['setupBoostAI']=function(){const _0xd03f8e=_0x5ee417,_0x652fbf=VisuMZ['BoostAction']['RegExp'];if(this[_0xd03f8e(0xef)]()[_0xd03f8e(0x17a)]===undefined){this['enemy']()[_0xd03f8e(0x17a)]={};var _0x39226c=this[_0xd03f8e(0xef)]()[_0xd03f8e(0x1ba)][_0xd03f8e(0x16b)](/[\r\n]+/);for(var _0x41de5e=0x0;_0x41de5e<_0x39226c[_0xd03f8e(0x103)];_0x41de5e++){var _0x12c73c=_0x39226c[_0x41de5e];if(_0x12c73c[_0xd03f8e(0xf1)](_0x652fbf['EnemyBoostSkillID'])){var _0x14ca5e=_0xd03f8e(0x15f)+parseInt(RegExp['$1']),_0x36ce3e=String(RegExp['$2'])[_0xd03f8e(0x154)]();this['enemy']()['_boostAI'][_0x14ca5e]=_0x36ce3e;}else{if(_0x12c73c[_0xd03f8e(0xf1)](_0x652fbf[_0xd03f8e(0x127)])){var _0x1906a2=String(RegExp['$1']),_0x36ce3e=String(RegExp['$2'])[_0xd03f8e(0x154)]();this['enemy']()['_boostAI'][_0x1906a2]=_0x36ce3e;}}}}},Game_Enemy[_0x5ee417(0x12b)]['processtoUseBoostPoints']=function(_0x465fac){const _0x58b603=_0x5ee417;this['setupBoostAI']();var _0x15252f=this['calculateBPtoUse'](_0x465fac);_0x15252f>0x0&&(this[_0x58b603(0x14d)](_0x15252f),this['startChangeBoostPointsAnimation']());},Game_Enemy[_0x5ee417(0x12b)][_0x5ee417(0xe8)]=function(_0x23e234){const _0xcdb4d=_0x5ee417;if(this[_0xcdb4d(0xcd)]()<=0x0)return 0x0;var _0x3c6cab=_0x23e234[_0xcdb4d(0x13c)],_0x26e0f2='Skill\x20'+_0x23e234['id'],_0x813c47=0x0;if(this[_0xcdb4d(0xef)]()[_0xcdb4d(0x17a)][_0x3c6cab]||this[_0xcdb4d(0xef)]()[_0xcdb4d(0x17a)][_0x26e0f2]){var _0x41ea97=this['enemy']()[_0xcdb4d(0x17a)][_0x3c6cab]||this[_0xcdb4d(0xef)]()[_0xcdb4d(0x17a)][_0x26e0f2];if(_0x41ea97[_0xcdb4d(0xf1)](/(?:ALL|FULL)/i))_0x813c47=this['storedBoostPoints']();else{if(_0x41ea97['match'](/AT LEAST (\d+)/i)){var _0x48a4d0=parseInt(RegExp['$1']);this[_0xcdb4d(0xcd)]()>=_0x48a4d0&&(_0x813c47=this[_0xcdb4d(0xcd)]());}else{if(_0x41ea97[_0xcdb4d(0xf1)](/AT MOST (\d+)/i)){var _0x48a4d0=parseInt(RegExp['$1']);this[_0xcdb4d(0xcd)]()<=_0x48a4d0&&(_0x813c47=this['storedBoostPoints']());}else{if(_0x41ea97[_0xcdb4d(0xf1)](/EXACTLY (\d+)/i)){var _0x48a4d0=parseInt(RegExp['$1']);this[_0xcdb4d(0xcd)]()===_0x48a4d0&&(_0x813c47=_0x48a4d0);}}}}}return _0x813c47[_0xcdb4d(0x152)](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']);},Game_Enemy[_0x5ee417(0x12b)]['processEnemyBPUsage']=function(_0x5105d2){const _0x5ae0a9=_0x5ee417;_0x5105d2=_0x5105d2[_0x5ae0a9(0x152)](0x0,this[_0x5ae0a9(0xcd)]()),_0x5105d2=_0x5105d2[_0x5ae0a9(0x152)](0x0,Game_BattlerBase['BOOST_POINTS_MAX_TOUSE']),this[_0x5ae0a9(0xa4)](-_0x5105d2),this[_0x5ae0a9(0x9f)](_0x5105d2);},Game_Enemy['prototype'][_0x5ee417(0xf8)]=function(){const _0x3a5ee7=_0x5ee417;var _0x27bdd5=0x0,_0x5c0bcd=this['toUseBoostPoints']()['clamp'](0x0,Game_BattlerBase[_0x3a5ee7(0x107)]);const _0x4221b6=Game_Battler[_0x3a5ee7(0x14c)],_0x299c07=Game_Enemy[_0x3a5ee7(0xb1)],_0x1d5178=0x3e8/0x3c;for(var _0x2452b5=0x1;_0x2452b5<=_0x5c0bcd;_0x2452b5++){var _0x3ef99d=_0x4221b6[_0x2452b5]||_0x4221b6[0x0];if(_0x3ef99d>0x0){let _0x5acaf0=_0x299c07*(_0x2452b5-0x1);setTimeout($gameTemp['requestFauxAnimation'][_0x3a5ee7(0x108)]($gameTemp,[this],_0x3ef99d,![],![]),_0x5acaf0);}_0x27bdd5+=_0x299c07/_0x1d5178;}_0x27bdd5=Math[_0x3a5ee7(0x160)](_0x27bdd5),SceneManager[_0x3a5ee7(0x1d2)][_0x3a5ee7(0x163)][_0x3a5ee7(0x175)]=_0x27bdd5;},Game_Unit[_0x5ee417(0x12b)][_0x5ee417(0x1a7)]=function(){const _0x1f6da8=_0x5ee417;var _0xfc162e=this[_0x1f6da8(0x99)];this[_0x1f6da8(0x99)]=![];for(const _0x3c1ad5 of this[_0x1f6da8(0x1cf)]()){if(!_0x3c1ad5)continue;_0x3c1ad5['setupBattleBoostPoints']();}this['_inBattle']=_0xfc162e;},VisuMZ[_0x5ee417(0x8a)]['Game_Party_addActor']=Game_Party[_0x5ee417(0x12b)][_0x5ee417(0xd0)],Game_Party[_0x5ee417(0x12b)][_0x5ee417(0xd0)]=function(_0x3cb5fb){const _0x17645f=_0x5ee417;VisuMZ['BoostAction'][_0x17645f(0xa2)]['call'](this,_0x3cb5fb),setTimeout(VisuMZ['BoostAction'][_0x17645f(0x191)]['bind'](this),0x32);},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x19b)]=Game_Party[_0x5ee417(0x12b)]['removeActor'],Game_Party[_0x5ee417(0x12b)][_0x5ee417(0xc1)]=function(_0x80992f){const _0x569428=_0x5ee417;VisuMZ[_0x569428(0x8a)][_0x569428(0x19b)][_0x569428(0x112)](this,_0x80992f),setTimeout(VisuMZ[_0x569428(0x8a)][_0x569428(0x191)]['bind'](this),0x32);},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xe4)]=Game_Party['prototype']['partyChangeRefresh'],Game_Party[_0x5ee417(0x12b)]['partyChangeRefresh']=function(){const _0xd14a60=_0x5ee417;VisuMZ[_0xd14a60(0x8a)][_0xd14a60(0xe4)][_0xd14a60(0x112)](this),setTimeout(VisuMZ[_0xd14a60(0x8a)][_0xd14a60(0x191)][_0xd14a60(0x108)](this),0x32);},VisuMZ[_0x5ee417(0x8a)]['RefreshHelpWindowInBattle']=function(){const _0x351482=_0x5ee417;if(!SceneManager[_0x351482(0x123)]())return;const _0x26f721=SceneManager[_0x351482(0x1d2)][_0x351482(0x128)];if(!_0x26f721)return;_0x26f721[_0x351482(0xfc)](BattleManager['actor']()),_0x26f721[_0x351482(0x19e)]();},VisuMZ[_0x5ee417(0x8a)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x153)],Scene_Battle[_0x5ee417(0x12b)]['createActorCommandWindow']=function(){const _0x13f32d=_0x5ee417;VisuMZ[_0x13f32d(0x8a)][_0x13f32d(0x130)]['call'](this),this[_0x13f32d(0x198)][_0x13f32d(0xd3)](_0x13f32d(0x134),this[_0x13f32d(0x190)][_0x13f32d(0x108)](this)),this['_actorCommandWindow'][_0x13f32d(0xd3)]('unboost',this['commandUnboost'][_0x13f32d(0x108)](this));},Scene_Battle[_0x5ee417(0x12b)]['commandBoost']=function(_0x2052a2){const _0x254373=_0x5ee417;BattleManager[_0x254373(0x177)]()[_0x254373(0xa4)](-0x1),BattleManager['actor']()['gainToUseBoostPoints'](0x1),BattleManager[_0x254373(0x177)]()[_0x254373(0xf8)](),this[_0x254373(0x183)](),this[_0x254373(0x128)][_0x254373(0x19e)](),!_0x2052a2&&this[_0x254373(0x198)][_0x254373(0x18a)](),this[_0x254373(0x198)][_0x254373(0x19e)]();},Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x14e)]=function(_0x492b43){const _0x18a595=_0x5ee417;BattleManager[_0x18a595(0x177)]()[_0x18a595(0x9f)](-0x1),BattleManager[_0x18a595(0x177)]()['gainStoredBoostPoints'](0x1),BattleManager[_0x18a595(0x177)]()[_0x18a595(0xf8)](),this[_0x18a595(0x183)](),this['_helpWindow'][_0x18a595(0x19e)](),!_0x492b43&&this[_0x18a595(0x198)][_0x18a595(0x18a)](),this['_actorCommandWindow'][_0x18a595(0x19e)]();},VisuMZ['BoostAction'][_0x5ee417(0x16a)]=Scene_Battle[_0x5ee417(0x12b)]['selectNextCommand'],Scene_Battle['prototype']['selectNextCommand']=function(){const _0x31b8aa=_0x5ee417;this[_0x31b8aa(0x128)]&&(this[_0x31b8aa(0x128)][_0x31b8aa(0x1c5)](),this['clearRepeatBoostAnimation']()),VisuMZ['BoostAction'][_0x31b8aa(0x16a)][_0x31b8aa(0x112)](this);},VisuMZ[_0x5ee417(0x8a)]['Scene_Battle_startActorCommandSelection']=Scene_Battle['prototype'][_0x5ee417(0xe7)],Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0xe7)]=function(){const _0x77b00b=_0x5ee417;VisuMZ[_0x77b00b(0x8a)][_0x77b00b(0x1d3)]['call'](this),this[_0x77b00b(0x128)]&&(this[_0x77b00b(0x128)][_0x77b00b(0xfc)](BattleManager['actor']()),this['clearRepeatBoostAnimation']());},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x186)]=Scene_Battle['prototype'][_0x5ee417(0x16e)],Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x16e)]=function(){const _0x31b418=_0x5ee417;VisuMZ[_0x31b418(0x8a)][_0x31b418(0x186)]['call'](this),this[_0x31b418(0x1d5)]();},Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x100)]=function(){const _0x7834ac=_0x5ee417;return this[_0x7834ac(0x164)]===undefined&&this[_0x7834ac(0x17d)](),VisuMZ[_0x7834ac(0x8a)][_0x7834ac(0xf9)]['Mechanics'][_0x7834ac(0x166)]??![];},Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x17d)]=function(){this['_repeatBoostAnimationTimer']=-0x1;},Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x183)]=function(){const _0x165d31=_0x5ee417,_0x3e8970=BattleManager['actor']()[_0x165d31(0x84)]();this['_repeatBoostAnimationTimer']=_0x3e8970>0x0?VisuMZ[_0x165d31(0x8a)][_0x165d31(0xf9)][_0x165d31(0x149)][_0x165d31(0x1a2)]||0x1:-0x1;},Scene_Battle[_0x5ee417(0x12b)][_0x5ee417(0x1d5)]=function(){const _0x3e50fd=_0x5ee417;if(!this[_0x3e50fd(0x100)]())return;if(this['_repeatBoostAnimationTimer']<=0x0)return;this['_repeatBoostAnimationTimer']--,this[_0x3e50fd(0x164)]<=0x0&&BattleManager['actor']()&&(BattleManager['actor']()['startChangeBoostPointsAnimation'](!![]),BattleManager['actor']()[_0x3e50fd(0x84)]()>0x0&&this['startRepeatBoostAnimation']());};function _0x3999(_0x3c5181,_0x365b45){const _0x3d7dfa=_0x3d7d();return _0x3999=function(_0x3999b0,_0x4d66c5){_0x3999b0=_0x3999b0-0x80;let _0x35b894=_0x3d7dfa[_0x3999b0];return _0x35b894;},_0x3999(_0x3c5181,_0x365b45);}function Sprite_BoostContainer(){const _0x30ad06=_0x5ee417;this[_0x30ad06(0x117)](...arguments);}Sprite_BoostContainer[_0x5ee417(0x12b)]=Object[_0x5ee417(0x1c2)](Sprite[_0x5ee417(0x12b)]),Sprite_BoostContainer['prototype'][_0x5ee417(0x16c)]=Sprite_BoostContainer,Sprite_BoostContainer['ICON_SIZE_RATE']=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['UI'][_0x5ee417(0xea)],Sprite_BoostContainer[_0x5ee417(0x12b)][_0x5ee417(0x117)]=function(){const _0x4d9dd6=_0x5ee417;Sprite[_0x4d9dd6(0x12b)][_0x4d9dd6(0x117)][_0x4d9dd6(0x112)](this),this[_0x4d9dd6(0x1a3)](),this[_0x4d9dd6(0xc6)]();},Sprite_BoostContainer['prototype']['initMembers']=function(){const _0x25c854=_0x5ee417;this[_0x25c854(0x185)]['x']=Sprite_BoostContainer[_0x25c854(0x1b2)],this['scale']['y']=Sprite_BoostContainer[_0x25c854(0x1b2)];},Sprite_BoostContainer[_0x5ee417(0x12b)][_0x5ee417(0xc6)]=function(){const _0x1252fd=_0x5ee417;this['_icons']=[];for(let _0x1d3e8a=0x1;_0x1d3e8a<=Game_BattlerBase[_0x1252fd(0x1ca)];_0x1d3e8a++){const _0x342ae7=new Sprite_BoostIcon(_0x1d3e8a);this[_0x1252fd(0x193)](_0x342ae7),this[_0x1252fd(0x11f)][_0x1252fd(0x1b9)](_0x342ae7);}},Sprite_BoostContainer[_0x5ee417(0x12b)][_0x5ee417(0x122)]=function(_0x5e1d23){const _0xdcb854=_0x5ee417;if(!this[_0xdcb854(0x11f)])return;for(const _0x5a2fcf of this['_icons']){_0x5a2fcf[_0xdcb854(0x122)](_0x5e1d23);}};function _0x3d7d(){const _0xe9cf23=['commandStyle','BoostAction','setupBattleBoostPointsMultiplier','AnalyzeMultiply','BattleManager_setup','return\x200','addLoadListener','convertBoostRepeatEscape','_bpSubject','applyBoostPointRepeats','convertBoostEscapeCharacters','addState','portrait','default','convertEscapeCharacters','boostAddition','_inBattle','blt','ARRAYSTR','SmoothIcons','RepeatAniMute','applyBPEffects','gainToUseBoostPoints','canUseBoostShortcut','VisuMZ_3_ActiveChainSkills','Game_Party_addActor','meetsUsableItemConditions','gainStoredBoostPoints','EVAL','Window_ActorCommand_addGuardCommand','show','setupBattleBoostPointsAdded','_iconIndex','VisuMZ_1_BattleCore','ARRAYJSON','BOOST_POINTS_ADDITION','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','EffectAddition','reset','BoostDamage','BOOST_POINTS_ANIMATION_DELAY','_boostIconSheet','BOOST_POINTS_DISPLAY_AUTO_POS','Game_Battler_addBuff','convertBoostLessEscape','PgUpDnShortcuts','BOOST_POINTS_DEATH_REMOVE','250304JRYmbg','currentSymbol','ARRAYSTRUCT','Equal','BP\x20Effect','getStateReapplyRulings','Window_Base_convertEscapeCharacters','regenerateAll','Game_Battler_regenerateAll','removeActor','convertBoostEffectEscape','subject','Game_BattlerBase_resetStateCounts','NUM','createChildSprites','isActor','UserBoostPoints','loadSystem','AnimationDelay','convertBoostEqualEscape','convertBoostDamageEscape','storedBoostPoints','includes','BypassConstructors','addActor','Window_BattleStatus_drawItemStatus','Game_Battler_removeBattleStates','setHandler','canUndoBoostPoints','boostIcon','trim','text','45051zeeBxw','drawItemStatus','197320uPMNcO','BoostPointsRegenRate','_stateTurns','VisuMZ_0_CoreEngine','BOOST_POINTS_TURN_REGEN','description','shouldDrawBoostIcons','JSON','BattleStatusAutoPosition','findIndex','Game_Party_partyChangeRefresh','symbol','STR','startActorCommandSelection','calculateBPtoUse','drawItemStatusBoostPoints','IconSizeRate','exit','DmgAddition','findBoostCommand','bpRegenAdded','enemy','Repeat','match','map','boostMultiplier','BattleManager_processTurn','applyItemUserEffect','optDisplayTp','convertBoostAnalyzeEscape','startChangeBoostPointsAnimation','Settings','Turn','parse','setBoostSubject','version','DmgMultiply','BOOST_POINTS_DISPLAY_BATTLE_STATUS','isUsingRepeatBoostAnimation','_slot','Game_Battler_addState','length','processtoUseBoostPoints','BoostAniMirror','smooth','BOOST_POINTS_MAX_TOUSE','bind','endAction','convertBoostGreaterEscape','BOOST_POINTS_REGEN_ALWAYS','toUpperCase','BoostTurns','Require','DeathRegen','BOOST_ACTION_SHORTCUT_PAGEUP_PAGEDN','actor%1-boostPoints','call','minTurns','convertBoostGreaterEqualEscape','convertBoostUpEscape','Game_Enemy_setup','initialize','bpRegenMultipliers','updateFrame','unboost','Game_BattlerBase_initialize','isSkill','ARRAYEVAL','2680125vjXvvf','_icons','setupBoostAI','placeBoostPoints','setup','isSceneBattle','_storedBoostPoints','setFrame','setStoredBoostPoints','EnemyBoostSkillName','_helpWindow','playOkSound','Game_Battler_regenerateTp','prototype','boostPointsRegenValue','traitObjects','30fyHDvw','inBattle','Scene_Battle_createActorCommandWindow','list','Amount','item','boost','UNBOOST_ACTION_SHOW','_bpTurnFlat','_subject','BattleStatusOffsetX','ShowFacesListStyle','EffectMultiply','10Ekrljy','name','meetsBoostShortcutRequirements','Usable','_turnUsedBoostPoints','GreaterEqual','unboostCommandName','itemRect','ext','canUseBoostPoints','applyBoostPointTurns','drawItemStatusBoostPointsDefault','actorId','unboostIcon','Mechanics','Window_Selectable_cursorPagedown','RepeatMultiply','BOOST_POINTS_ANIMATIONS','processEnemyBPUsage','commandUnboost','BoostIcon','ShowBoostCmd','border','clamp','createActorCommandWindow','toLowerCase','lineHeight','Game_Action_numRepeats','cursorPagedown','regenerateTp','Game_BattlerBase_meetsUsableItemConditions','28oDjDqn','TurnMultiply','isDead','initBoostAction','requestFauxAnimation','Skill\x20','ceil','boostSmooth','EmptyIcon','_logWindow','_repeatBoostAnimationTimer','add','RepeatBoostAni','_actor','BOOST_POINTS_DISPLAY_OFFSET_Y','postConvertEscapeCharacters','Scene_Battle_selectNextCommand','split','constructor','createInnerSprite','update','BpEffect','Regen','boostIconsheetBitmap','RepeatAddition','boostCommandName','_battler','_waitCount','replace','actor','BoostPointsRegenFlat','418303ivxfrV','_boostAI','ShowUnboostCmd','addBoostCommand','clearRepeatBoostAnimation','itemRectWithPadding','BOOST_POINTS_DEATH_REGEN','BoostSealed','format','__Game_Action_applyItemUserEffect','startRepeatBoostAnimation','processEnemyUseBoost','scale','Scene_Battle_update','cursorPageup','\x5cI[%1]%2','round','activate','VisuMZ_2_BattleSystemBTB','some','convertBoost0Escape','AnalyzeAddition','skillID','commandBoost','RefreshHelpWindowInBattle','meetstoUseBoostPointsRequirement','addChild','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','BOOST_ACTION_BYPASS_CONSTRUCTORS','drawItemStatusBoostPointsAuto','Game_Action_apply','_actorCommandWindow','Less','Damage','Game_Party_removeActor','move','BoostGainPoints','refresh','removeBattleStates','allowBoostAction','callUpdateHelp','RepeatAniCycle','initMembers','_toUseBoostPoints','convertBoostTurnEscape','ConvertParams','setupBattleBoostPoints','addCommand','isBoostSealed','BOOST_ACTION_SHOW','BattleManager_endAction','BOOST_POINTS_DISPLAY_OFFSET_X','maxTurns','MaxStored','filter','ARRAYNUM','width','ICON_SIZE_RATE','max','_bpTurnRate','randomInt','numRepeats','Game_Battler_addDebuff','ARRAYFUNC','push','note','addDebuff','endActionBoostPoints','applyGuard','addBuff','iconWidth','BattleCmdTalk','addGuardCommand','create','clear','createFallbackBoostSubject','clearBoostSubject','TurnAddition','110832niFheq','Analyze','greater','BOOST_POINTS_MAX_STORED','1548837VjMlFN','loadBitmap','regenerateBoostPoints','BOOST_POINTS_MULTIPLIERS','members','VisuMZ_1_MessageCore','Window_Selectable_cursorPageup','_scene','Scene_Battle_startActorCommandSelection','applyBoostPointDamage','updateRepeatBoostAnimation','RegExp','updateIcon','BattleCore','parameters','BOOST_POINTS_START_BATTLE','apply','Game_Action_applyGuard','toUseBoostPoints','processTurn','Window_Base_postConvertEscapeCharacters','bitmap','UnboostCmd'];_0x3d7d=function(){return _0xe9cf23;};return _0x3d7d();}function Sprite_BoostIcon(){const _0x209b78=_0x5ee417;this[_0x209b78(0x117)](...arguments);}Sprite_BoostIcon[_0x5ee417(0x12b)]=Object[_0x5ee417(0x1c2)](Sprite[_0x5ee417(0x12b)]),Sprite_BoostIcon[_0x5ee417(0x12b)][_0x5ee417(0x16c)]=Sprite_BoostIcon,Sprite_BoostIcon[_0x5ee417(0x12b)][_0x5ee417(0x117)]=function(_0x128af4){const _0x3d79e9=_0x5ee417;this[_0x3d79e9(0x101)]=_0x128af4,Sprite[_0x3d79e9(0x12b)][_0x3d79e9(0x117)][_0x3d79e9(0x112)](this),this['initMembers'](),this[_0x3d79e9(0x1cc)]();},Sprite_BoostIcon[_0x5ee417(0x12b)]['initMembers']=function(){const _0x57c273=_0x5ee417;this[_0x57c273(0xa9)]=ImageManager[_0x57c273(0x148)],this['x']=ImageManager[_0x57c273(0x1bf)]*(this[_0x57c273(0x101)]-0x1);},Sprite_BoostIcon['prototype']['loadBitmap']=function(){const _0x121f60=_0x5ee417;this[_0x121f60(0x87)]=ImageManager[_0x121f60(0x171)](),this[_0x121f60(0x125)](0x0,0x0,0x0,0x0);},Sprite_BoostIcon[_0x5ee417(0x12b)][_0x5ee417(0x122)]=function(_0x32802f){const _0x32a784=_0x5ee417;this['_battler']!==_0x32802f&&(this[_0x32a784(0x174)]=_0x32802f);},Sprite_BoostIcon[_0x5ee417(0x12b)][_0x5ee417(0x16e)]=function(){const _0x2c5cb4=_0x5ee417;Sprite[_0x2c5cb4(0x12b)][_0x2c5cb4(0x16e)][_0x2c5cb4(0x112)](this),this[_0x2c5cb4(0x1d7)](),this[_0x2c5cb4(0x119)]();},Sprite_BoostIcon['prototype']['updateIcon']=function(){const _0x520719=_0x5ee417;if(this[_0x520719(0x174)]){let _0x580372=this[_0x520719(0x174)]['storedBoostPoints']();_0x580372>=this['_slot']?this[_0x520719(0xa9)]=ImageManager[_0x520719(0xd5)]:this[_0x520719(0xa9)]=ImageManager[_0x520719(0x148)];}else this[_0x520719(0xa9)]=0x0;},Sprite_BoostIcon['prototype'][_0x5ee417(0x119)]=function(){const _0x18983b=_0x5ee417,_0x38e001=ImageManager[_0x18983b(0x1bf)],_0xb844db=ImageManager['iconHeight'],_0x5bb735=this[_0x18983b(0xa9)]%0x10*_0x38e001,_0x1a600e=Math['floor'](this[_0x18983b(0xa9)]/0x10)*_0xb844db;this['setFrame'](_0x5bb735,_0x1a600e,_0x38e001,_0xb844db);},VisuMZ['BoostAction'][_0x5ee417(0xbe)]=Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x97)],Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x97)]=function(_0x3d28b2){const _0x4eebcd=_0x5ee417;return _0x3d28b2=VisuMZ[_0x4eebcd(0x8a)]['Window_Base_convertEscapeCharacters'][_0x4eebcd(0x112)](this,_0x3d28b2),!Imported[_0x4eebcd(0x1d0)]&&(_0x3d28b2=this[_0x4eebcd(0x93)](_0x3d28b2)),_0x3d28b2;},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x86)]=Window_Base['prototype']['postConvertEscapeCharacters'],Window_Base['prototype'][_0x5ee417(0x169)]=function(_0x97896c){const _0x3743de=_0x5ee417;return _0x97896c=VisuMZ[_0x3743de(0x8a)][_0x3743de(0x86)][_0x3743de(0x112)](this,_0x97896c),_0x97896c=this[_0x3743de(0x93)](_0x97896c),_0x97896c;},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x1c4)]=function(){const _0x3a0f73=_0x5ee417;if(!!this[_0x3a0f73(0x91)])return;if($gameParty[_0x3a0f73(0x12f)]())this[_0x3a0f73(0x91)]=BattleManager[_0x3a0f73(0x177)]()||BattleManager[_0x3a0f73(0x137)];else{const _0x134e36=SceneManager['_scene'];this['_bpSubject']=_0x134e36[_0x3a0f73(0x167)];}},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x93)]=function(_0x2b0b7a){const _0x7a4a0f=_0x5ee417;return _0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)DMG\[(\d+)\]/gi,function(){const _0x5a0cbe=_0x7a4a0f;return this[_0x5a0cbe(0xcc)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a['replace'](/\x1b(?:BP|BOOST)DAMAGE\[(\d+)\]/gi,function(){const _0x3c1068=_0x7a4a0f;return this[_0x3c1068(0xcc)](parseInt(arguments[0x1]));}['bind'](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)TURN\[(\d+)\]/gi,function(){const _0x425892=_0x7a4a0f;return this[_0x425892(0x1a5)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a['replace'](/\x1b(?:BP|BOOST)TURNS\[(\d+)\]/gi,function(){const _0x1695b2=_0x7a4a0f;return this[_0x1695b2(0x1a5)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a['replace'](/\x1b(?:BP|BOOST)REP\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)REPEAT\[(\d+)\]/gi,function(){const _0x257a62=_0x7a4a0f;return this[_0x257a62(0x90)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)REPEATS\[(\d+)\]/gi,function(){const _0x5a7c24=_0x7a4a0f;return this[_0x5a7c24(0x90)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)HITS\[(\d+)\]/gi,function(){return this['convertBoostRepeatEscape'](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)ANALYZE\[(\d+)\]/gi,function(){const _0x365ce9=_0x7a4a0f;return this[_0x365ce9(0xf7)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)EFFECT\[(\d+)\]/gi,function(){const _0x4732f0=_0x7a4a0f;return this[_0x4732f0(0xc2)](parseInt(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a['replace'](/\x1b(?:BP|BOOST)\[(.*?)\]/gi,function(){const _0x4e34cb=_0x7a4a0f;return this[_0x4e34cb(0x115)](String(arguments[0x1]));}['bind'](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)0\[(.*?)\]/gi,function(){return this['convertBoost0Escape'](String(arguments[0x1]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}['bind'](this)),_0x2b0b7a=_0x2b0b7a['replace'](/\x1b(?:BP|BOOST)=(\d+)\[(.*?)\]/gi,function(){const _0x37e575=_0x7a4a0f;return this[_0x37e575(0xcb)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)\<=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostLessEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)\<(\d+)\[(.*?)\]/gi,function(){const _0x276715=_0x7a4a0f;return this[_0x276715(0xb5)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a['replace'](/\x1b(?:BP|BOOST)\>=(\d+)\[(.*?)\]/gi,function(){return this['convertBoostGreaterEqualEscape'](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a=_0x2b0b7a[_0x7a4a0f(0x176)](/\x1b(?:BP|BOOST)\>(\d+)\[(.*?)\]/gi,function(){const _0x2f6c27=_0x7a4a0f;return this[_0x2f6c27(0x10a)](parseInt(arguments[0x1]),String(arguments[0x2]));}[_0x7a4a0f(0x108)](this)),_0x2b0b7a;},Window_Base['prototype'][_0x5ee417(0xcc)]=function(_0x230a95){const _0x464e8b=_0x5ee417;if(!!this['_bpSubject']){var _0x22a925=this[_0x464e8b(0x91)][_0x464e8b(0xf3)]('Damage');_0x230a95=Math[_0x464e8b(0x189)](_0x230a95*_0x22a925),_0x230a95+=this[_0x464e8b(0x91)][_0x464e8b(0x98)]('Damage');}return _0x230a95;},Window_Base[_0x5ee417(0x12b)]['convertBoostTurnEscape']=function(_0x47c003){const _0x46fa3f=_0x5ee417;if(!!this['_bpSubject']){var _0x2c619f=this[_0x46fa3f(0x91)][_0x46fa3f(0xf3)](_0x46fa3f(0xfa));_0x47c003=Math[_0x46fa3f(0x189)](_0x47c003*_0x2c619f),_0x47c003+=this[_0x46fa3f(0x91)]['boostAddition'](_0x46fa3f(0xfa));}return _0x47c003;},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x90)]=function(_0x2c3be3){const _0x3aa9aa=_0x5ee417;if(!!this['_bpSubject']){var _0x28a5aa=this[_0x3aa9aa(0x91)][_0x3aa9aa(0xf3)](_0x3aa9aa(0xf0));_0x2c3be3=Math[_0x3aa9aa(0x189)](_0x2c3be3*_0x28a5aa),_0x2c3be3+=this['_bpSubject'][_0x3aa9aa(0x98)](_0x3aa9aa(0xf0));}return _0x2c3be3;},Window_Base['prototype'][_0x5ee417(0xf7)]=function(_0x5eba9d){const _0x3129a6=_0x5ee417;if(!!this[_0x3129a6(0x91)]){var _0xb09206=this[_0x3129a6(0x91)]['boostMultiplier']('Analyze');_0x5eba9d=Math[_0x3129a6(0x189)](_0x5eba9d*_0xb09206),_0x5eba9d+=this['_bpSubject'][_0x3129a6(0x98)]('Analyze');}return _0x5eba9d;},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0xc2)]=function(_0x22fb7c){const _0x231208=_0x5ee417;if(!!this[_0x231208(0x91)]){var _0x3bd995=this[_0x231208(0x91)][_0x231208(0xf3)]('BP\x20Effect');_0x22fb7c=Math['round'](_0x22fb7c*_0x3bd995),_0x22fb7c+=this[_0x231208(0x91)]['boostAddition'](_0x231208(0xbc));}return _0x22fb7c;},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x115)]=function(_0x646bea){const _0x198367=_0x5ee417;return!!this['_bpSubject']&&this['_bpSubject'][_0x198367(0x84)]()>0x0?_0x646bea:'';},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x18d)]=function(_0x6d8e7f){const _0x240629=_0x5ee417;return!this[_0x240629(0x91)]||this['_bpSubject'][_0x240629(0x84)]()<=0x0?_0x6d8e7f:'';},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0xcb)]=function(_0x58769e,_0x260388){const _0x535c5d=_0x5ee417;this[_0x535c5d(0x1c4)]();if(!!this['_bpSubject']&&this['_bpSubject'][_0x535c5d(0x84)]()===_0x58769e)return _0x260388;else return _0x58769e===0x0?_0x260388:'';},Window_Base[_0x5ee417(0x12b)]['convertBoostLessEqualEscape']=function(_0x3a2385,_0x456985){const _0x42a32d=_0x5ee417;return this[_0x42a32d(0x1c4)](),!!this[_0x42a32d(0x91)]&&this[_0x42a32d(0x91)][_0x42a32d(0x84)]()<=_0x3a2385?_0x456985:'';},Window_Base['prototype'][_0x5ee417(0xb5)]=function(_0x43ae3f,_0x577e26){const _0xf17d1c=_0x5ee417;return this['createFallbackBoostSubject'](),!!this[_0xf17d1c(0x91)]&&this[_0xf17d1c(0x91)][_0xf17d1c(0x84)]()<_0x43ae3f?_0x577e26:'';},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x114)]=function(_0x37bb98,_0x52db94){const _0x35a2d2=_0x5ee417;return this[_0x35a2d2(0x1c4)](),!!this[_0x35a2d2(0x91)]&&this[_0x35a2d2(0x91)][_0x35a2d2(0x84)]()>=_0x37bb98?_0x52db94:'';},Window_Base[_0x5ee417(0x12b)][_0x5ee417(0x10a)]=function(_0x1efc0e,_0x2e026e){const _0x592e29=_0x5ee417;return this[_0x592e29(0x1c4)](),!!this[_0x592e29(0x91)]&&this[_0x592e29(0x91)][_0x592e29(0x84)]()>_0x1efc0e?_0x2e026e:'';},Window_Selectable[_0x5ee417(0x110)]=VisuMZ[_0x5ee417(0x8a)]['Settings']['UI'][_0x5ee417(0xb6)],Window_Selectable[_0x5ee417(0x195)]=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['UI'][_0x5ee417(0xcf)],Window_Selectable['prototype'][_0x5ee417(0xa0)]=function(){const _0x125e08=_0x5ee417,_0x18a2b1=this[_0x125e08(0x16c)][_0x125e08(0x13c)];return Window_Selectable[_0x125e08(0x195)][_0x125e08(0xce)](_0x18a2b1)?![]:!![];},Window_Selectable[_0x5ee417(0x12b)][_0x5ee417(0x13d)]=function(){const _0x13af55=_0x5ee417;if(!SceneManager['isSceneBattle']())return![];if(!Window_Selectable[_0x13af55(0x110)])return![];if(!BattleManager[_0x13af55(0x1a0)]())return![];return this[_0x13af55(0xa0)]();},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x14a)]=Window_Selectable['prototype'][_0x5ee417(0x157)],Window_Selectable[_0x5ee417(0x12b)][_0x5ee417(0x157)]=function(){const _0x5432cb=_0x5ee417;if(this['meetsBoostShortcutRequirements']()){const _0x3a3825=BattleManager[_0x5432cb(0x177)]();_0x3a3825&&_0x3a3825[_0x5432cb(0x144)]()&&(SceneManager['_scene'][_0x5432cb(0x190)](!![]),this[_0x5432cb(0x19e)](),this[_0x5432cb(0x1a1)]()),Input[_0x5432cb(0x1c3)]();}else VisuMZ[_0x5432cb(0x8a)][_0x5432cb(0x14a)][_0x5432cb(0x112)](this);},VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0x1d1)]=Window_Selectable[_0x5ee417(0x12b)][_0x5ee417(0x187)],Window_Selectable[_0x5ee417(0x12b)][_0x5ee417(0x187)]=function(){const _0x42f22f=_0x5ee417;if(this[_0x42f22f(0x13d)]()){const _0xd0c4b8=BattleManager[_0x42f22f(0x177)]();_0xd0c4b8&&_0xd0c4b8[_0x42f22f(0xd4)]()&&(SceneManager[_0x42f22f(0x1d2)][_0x42f22f(0x14e)](!![]),this[_0x42f22f(0x19e)](),this[_0x42f22f(0x1a1)]()),Input[_0x42f22f(0x1c3)]();}else VisuMZ[_0x42f22f(0x8a)][_0x42f22f(0x1d1)][_0x42f22f(0x112)](this);},Window_Help[_0x5ee417(0x12b)]['setBoostSubject']=function(_0x417f44){this['_bpSubject']=_0x417f44;},Window_Help[_0x5ee417(0x12b)][_0x5ee417(0x1c5)]=function(){this['_bpSubject']=undefined;},Window_StatusBase[_0x5ee417(0x12b)][_0x5ee417(0xe0)]=function(){const _0x405ef6=_0x5ee417;return BattleManager[_0x405ef6(0x1a0)]();},Window_StatusBase[_0x5ee417(0x12b)]['placeBoostPoints']=function(_0x4aa6ee,_0x2f1466,_0x1278ab){const _0x1c77b1=_0x5ee417;if(!this[_0x1c77b1(0xe0)]())return;const _0x2edd6c=_0x1c77b1(0x111)[_0x1c77b1(0x181)](_0x4aa6ee[_0x1c77b1(0x147)]()),_0x4f7919=this[_0x1c77b1(0x16d)](_0x2edd6c,Sprite_BoostContainer);_0x4f7919[_0x1c77b1(0x122)](_0x4aa6ee),_0x4f7919[_0x1c77b1(0x19c)](_0x2f1466,_0x1278ab),_0x4f7919[_0x1c77b1(0xa7)]();},Window_ActorCommand['BOOST_ACTION_SHOW']=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['UI'][_0x5ee417(0x150)],Window_ActorCommand['UNBOOST_ACTION_SHOW']=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['UI'][_0x5ee417(0x17b)],VisuMZ['BoostAction']['Window_ActorCommand_addGuardCommand']=Window_ActorCommand[_0x5ee417(0x12b)][_0x5ee417(0x1c1)],Window_ActorCommand[_0x5ee417(0x12b)][_0x5ee417(0x1c1)]=function(){const _0x5c7bf4=_0x5ee417;BattleManager['allowBoostAction']()&&(this[_0x5c7bf4(0x17c)](),this['addUnboostCommand']()),VisuMZ[_0x5c7bf4(0x8a)][_0x5c7bf4(0xa6)][_0x5c7bf4(0x112)](this);},Window_ActorCommand[_0x5ee417(0x12b)][_0x5ee417(0xed)]=function(){const _0x47c35c=_0x5ee417;return this['_list'][_0x47c35c(0xe3)](_0x50e6cc=>_0x50e6cc[_0x47c35c(0xe5)]==='boost'&&_0x50e6cc[_0x47c35c(0x143)]===VisuMZ[_0x47c35c(0x1c0)][_0x47c35c(0x18f)]);},Window_ActorCommand['prototype'][_0x5ee417(0x17c)]=function(){const _0xe579cd=_0x5ee417;if(!Window_ActorCommand[_0xe579cd(0x1aa)])return;if(!BattleManager[_0xe579cd(0x1a0)]())return;if(this[_0xe579cd(0xed)]()>=0x0)return;const _0x19c95b=this[_0xe579cd(0x89)](),_0x5a8511=TextManager[_0xe579cd(0x173)],_0x3b3349=ImageManager['boostIcon'],_0xfd29e1=_0x19c95b===_0xe579cd(0xd7)?_0x5a8511:'\x5cI[%1]%2'[_0xe579cd(0x181)](_0x3b3349,_0x5a8511);var _0x154650=this['_actor'][_0xe579cd(0x144)]();this[_0xe579cd(0x1a8)](_0xfd29e1,_0xe579cd(0x134),_0x154650);},Window_ActorCommand[_0x5ee417(0x12b)]['findUnboostCommand']=function(){const _0x31d9bb=_0x5ee417;return this['_list'][_0x31d9bb(0xe3)](_0x222ce6=>_0x222ce6['symbol']===_0x31d9bb(0x11a)&&_0x222ce6[_0x31d9bb(0x143)]===VisuMZ[_0x31d9bb(0x1c0)][_0x31d9bb(0x18f)]);},Window_ActorCommand[_0x5ee417(0x12b)]['addUnboostCommand']=function(){const _0x4fc037=_0x5ee417;if(!Window_ActorCommand[_0x4fc037(0x135)])return;if(!BattleManager[_0x4fc037(0x1a0)]())return;if(this['findUnboostCommand']()>=0x0)return;const _0xa8a846=this[_0x4fc037(0x89)](),_0x388cdd=TextManager[_0x4fc037(0x141)],_0x4cb12e=ImageManager['unboostIcon'],_0x15d094=_0xa8a846==='text'?_0x388cdd:_0x4fc037(0x188)[_0x4fc037(0x181)](_0x4cb12e,_0x388cdd);var _0x47c706=this[_0x4fc037(0x167)]['canUndoBoostPoints']();this['addCommand'](_0x15d094,_0x4fc037(0x11a),_0x47c706);},Window_ActorCommand[_0x5ee417(0x12b)][_0x5ee417(0x129)]=function(){const _0x53251f=_0x5ee417;this[_0x53251f(0xb9)]()!==_0x53251f(0x134)&&this[_0x53251f(0xb9)]()!==_0x53251f(0x11a)&&Window_Selectable[_0x53251f(0x12b)][_0x53251f(0x129)][_0x53251f(0x112)](this);},Window_BattleStatus[_0x5ee417(0xff)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['UI']['BattleStatusShow'],Window_BattleStatus[_0x5ee417(0xb3)]=VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xf9)]['UI'][_0x5ee417(0xe2)],Window_BattleStatus[_0x5ee417(0x1ac)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['UI'][_0x5ee417(0x138)],Window_BattleStatus[_0x5ee417(0x168)]=VisuMZ['BoostAction'][_0x5ee417(0xf9)]['UI']['BattleStatusOffsetY'],VisuMZ[_0x5ee417(0x8a)][_0x5ee417(0xd1)]=Window_BattleStatus[_0x5ee417(0x12b)]['drawItemStatus'],Window_BattleStatus[_0x5ee417(0x12b)][_0x5ee417(0xd9)]=function(_0x1fb686){const _0x2330db=_0x5ee417;VisuMZ[_0x2330db(0x8a)][_0x2330db(0xd1)][_0x2330db(0x112)](this,_0x1fb686),this['drawItemStatusBoostPoints'](_0x1fb686);},Window_BattleStatus[_0x5ee417(0x12b)][_0x5ee417(0xe9)]=function(_0x30bf22){const _0x5c2b58=_0x5ee417;if(!Window_BattleStatus[_0x5c2b58(0xff)])return;const _0x21afaa=this[_0x5c2b58(0x177)](_0x30bf22);if(!_0x21afaa)return;!Window_BattleStatus['BOOST_POINTS_DISPLAY_AUTO_POS']?this[_0x5c2b58(0x146)](_0x30bf22):this['drawItemStatusBoostPointsAuto'](_0x30bf22);},Window_BattleStatus[_0x5ee417(0x12b)][_0x5ee417(0x146)]=function(_0x50aabd){const _0x2f867e=_0x5ee417,_0x431077=this[_0x2f867e(0x177)](_0x50aabd),_0x5d022e=this[_0x2f867e(0x17e)](_0x50aabd);let _0x5b5726=_0x5d022e['x']-0x4+Window_BattleStatus[_0x2f867e(0x1ac)],_0x1e9bbc=_0x5d022e['y']+0x4+Window_BattleStatus['BOOST_POINTS_DISPLAY_OFFSET_Y'];this['placeBoostPoints'](_0x431077,_0x5b5726,_0x1e9bbc);},Window_BattleStatus['prototype'][_0x5ee417(0x196)]=function(_0x2eafce){const _0x983f7=_0x5ee417,_0x2b74b2=this[_0x983f7(0x177)](_0x2eafce),_0x577251=this[_0x983f7(0x142)](_0x2eafce),_0x3fe221=Math[_0x983f7(0x160)](ImageManager[_0x983f7(0x1bf)]*Game_BattlerBase[_0x983f7(0x1ca)]*Sprite_BoostContainer[_0x983f7(0x1b2)]),_0x561646=Math[_0x983f7(0x160)](ImageManager['iconHeight']*Sprite_BoostContainer[_0x983f7(0x1b2)]);let _0x5b6045=_0x577251['x']+0x4,_0x45ccab=_0x577251['y']+0x4;const _0x234e34=this['battleLayoutStyle']();switch(_0x234e34){case _0x983f7(0x131):VisuMZ[_0x983f7(0x1d8)][_0x983f7(0xf9)]['BattleLayout'][_0x983f7(0x139)]?_0x5b6045+=ImageManager['faceWidth']+0x8:_0x5b6045+=ImageManager['iconWidth']+0x8;_0x5b6045+=0x88,_0x5b6045+=0x88*0x2;$dataSystem[_0x983f7(0xf6)]&&(_0x5b6045+=0x88);_0x45ccab+=Math[_0x983f7(0x1b3)](0x0,Math[_0x983f7(0x189)]((this['lineHeight']()-_0x561646)/0x2));break;case'xp':case _0x983f7(0x96):case _0x983f7(0x151):_0x5b6045=Math[_0x983f7(0x189)](_0x577251['x']+(_0x577251[_0x983f7(0x1b1)]-_0x3fe221)/0x2);break;case _0x983f7(0x95):_0x5b6045=Math[_0x983f7(0x189)](_0x577251['x']+(_0x577251[_0x983f7(0x1b1)]-_0x3fe221)/0x2);const _0x525861=$dataSystem[_0x983f7(0xf6)]?0x4:0x3;_0x45ccab=Math[_0x983f7(0x189)](_0x577251['y']+_0x577251['height']-0x4-this[_0x983f7(0x155)]()*_0x525861);break;}_0x5b6045+=Window_BattleStatus[_0x983f7(0x1ac)],_0x45ccab+=Window_BattleStatus[_0x983f7(0x168)],this[_0x983f7(0x121)](_0x2b74b2,_0x5b6045,_0x45ccab);};