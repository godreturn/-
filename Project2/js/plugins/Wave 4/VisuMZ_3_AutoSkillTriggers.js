//=============================================================================
// VisuStella MZ - Auto Skill Triggers
// VisuMZ_3_AutoSkillTriggers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AutoSkillTriggers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AutoSkillTriggers = VisuMZ.AutoSkillTriggers || {};
VisuMZ.AutoSkillTriggers.version = 1.19;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.19] [AutoSkillTriggers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Auto_Skill_Triggers_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Sometimes you want some skills that only occur after a specific condition
 * triggers (ie. death, receiving specific elemental damage, or allies
 * performing skills of a specific type). These skill triggers are now made
 * possible through this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Skill triggers that launch at the start of battle or winning a battle.
 * * Skills that let actors/enemies do one last hurrah before dying.
 * * Skills that function as a reaction to the user performing specific actions
 *   ranging from basic attacks, guarding, items, physical attacks, magical
 *   attacks, certain hit attacks, skills from specific skill types, or actions
 *   that inflict any specific kind of elemental damage.
 * * A total of 60 different auto triggers for a variety of situations.
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
 * - VisuMZ_1_BattleCore
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
 * Battle System - FTB
 * Battle System - ETB
 * Battle System - PTB
 * 
 * These battle systems are incompatible with Auto Skill Triggers. This is due
 * to their turn structures, making them highly incompatible with the way that
 * Auto Skill Triggers work.
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
 * === Skill Trigger-Related Notetags ===
 *
 * <No Auto Skill Trigger>
 *
 * - Used for: Skill, Item State Notetags
 * - This prevents Auto Skill Triggers from occurring upon using this
 *   skill or item.
 *
 * ---
 *
 * <Auto Trigger: condition>
 *
 * <Auto Trigger x%: condition>
 *
 * - Used for: Skill Notetags
 * - Turns this skill into an Auto Trigger Skill, where it will automatically
 *   be used if the 'condition' has been met.
 * - If using the x% variant, the Auto Trigger has a x% chance to occur.
 *   - Replace 'x' with a number value representing the chance to succeed.
 * - Skill must be usable normally outside of the occasion in order to trigger.
 * - This marked skill cannot trigger any other Auto Skill Triggers in order to
 *   prevent an infinite loop.
 * - Skills can have multiple Auto Triggers and will trigger upon meeting the
 *   conditions of any of them.
 * - Replace 'condition' with any of the below keywords:
 * 
 *   *Note1*: Being the target of an action means the potential target must be
 *     a part of the original scope, regardless of how the targets are changed
 *     up later by Action Sequences.
 * 
 * Keywords:
 * 
 *   ---
 * 
 *   Battle Start
 *   - Triggers skill when the battle starts.
 * 
 *   Battle Win
 *   - Triggers skill when the battle is won.
 * 
 *   Death
 *   - Triggers skill moments before the user's death.
 *   - If the user recovers enough HP from the skill trigger, then the
 *     user won't die. However, any other Death triggered effects will
 *     still continue to prompt.
 * 
 *   ---
 * 
 *   Attack User
 *   - Triggers skill when the user uses a basic attack.
 * 
 *   Guard User
 *   - Triggers skill when the user guards.
 * 
 *   Item User
 *   - Triggers skill when the user uses any item.
 * 
 *   Physical User
 *   - Triggers skill when the user performs any physical action.
 * 
 *   Magical User
 *   - Triggers skill when the user performs any magical action.
 * 
 *   Certain Hit User
 *   - Triggers skill when the user performs a certain hit action.
 * 
 *   Skill Type name User
 *   - Triggers skill when the user performs a skill of the named
 *     Skill Type.
 * 
 *   Element name User
 *   - Triggers skill when the user performs an action with the named
 *     element type.
 * 
 *   ---
 * 
 *   Attack Target
 *   - Triggers skill when user is the target of a basic attack.
 *   - See Note1 Above.
 * 
 *   Guard Target
 *   - Triggers skill when user is the target of a guard action.
 *   - See Note1 Above.
 * 
 *   Item Target
 *   - Triggers skill when user is the target of an item action.
 *   - See Note1 Above.
 * 
 *   Physical Target
 *   - Triggers skill when user is the target of a physical action.
 *   - See Note1 Above.
 * 
 *   Magical Target
 *   - Triggers skill when user is the target of a magical action.
 *   - See Note1 Above.
 * 
 *   Certain Hit Target
 *   - Triggers skill when user is the target of a certain hit action.
 *   - See Note1 Above.
 * 
 *   Skill Type name Target
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type.
 *   - See Note1 Above.
 * 
 *   Element name Target
 *   - Triggers skill when user is the target of of an action with the named
 *     element type.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Ally
 *   - Triggers skill when user is the target of a basic attack
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Ally
 *   - Triggers skill when user is the target of a guard action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Ally
 *   - Triggers skill when user is the target of an item action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Ally
 *   - Triggers skill when user is the target of a physical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Ally
 *   - Triggers skill when user is the target of a magical action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Ally
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Ally
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Ally
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an ally of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Enemy
 *   - Triggers skill when user is the target of a basic attack
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Guard Enemy
 *   - Triggers skill when user is the target of a guard action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Item Enemy
 *   - Triggers skill when user is the target of an item action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Physical Enemy
 *   - Triggers skill when user is the target of a physical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Magical Enemy
 *   - Triggers skill when user is the target of a magical action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Certain Hit Enemy
 *   - Triggers skill when user is the target of a certain hit action
 *     and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Skill Type name Enemy
 *   - Triggers skill when user is the target of a skill by named
 *     Skill Type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   Element name Enemy
 *   - Triggers skill when user is the target of of an action with the named
 *     element type and is an enemy of the currently active battler.
 *   - See Note1 Above.
 * 
 *   ---
 * 
 *   Attack Friends
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Guard Friends
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Item Friends
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Physical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Magical Friends
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Certain Hit Friends
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team.
 * 
 *   Skill Type name Friends
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team.
 * 
 *   Element name Friends
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team.
 * 
 *   ---
 * 
 *   Attack Friends Only
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Guard Friends Only
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Item Friends Only
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Physical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Magical Friends Only
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Certain Hit Friends Only
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's allied team, but the active battler cannot be the user.
 * 
 *   Skill Type name Friends Only
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   Element name Friends Only
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's allied team, but the active battler
 *     cannot be the user.
 * 
 *   ---
 * 
 *   Attack Opponents
 *   - Triggers skill when a basic attack occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Guard Opponents
 *   - Triggers skill when a guard action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Item Opponents
 *   - Triggers skill when an item action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Physical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Magical Opponents
 *   - Triggers skill when a physical action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Certain Hit Opponents
 *   - Triggers skill when a certain hit action occurs and the active battler
 *     is in the user's opposing team.
 * 
 *   Skill Type name Opponents
 *   - Triggers skill when a skill by the named Skill Type action occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   Element name Opponents
 *   - Triggers skill when an action with the named element type occurs and
 *     the active battler is in the user's opposing team.
 * 
 *   ---
 * 
 * Examples:
 * 
 *   <Auto Trigger: Battle Start>
 *   <Auto Trigger: Death>
 *   <Auto Trigger: Attack User>
 *   <Auto Trigger: Guard User>
 *   <Auto Trigger: Physical Target>
 *   <Auto Trigger: Magical Target>
 *   <Auto Trigger: Certain Hit Ally>
 *   <Auto Trigger: Item Enemy>
 *   <Auto Trigger: Skill Type Magic Ally>
 *   <Auto Trigger: Skill Type Special Enemy>
 *   <Auto Trigger: Element Fire Friends>
 *   <Auto Trigger: Element Ice Opponents>
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These are general settings used for this plugin. These are primarily used to
 * impose a limit on the number of auto skill triggers that can happen per
 * battler per turn (meaning each member in battle has that limit individually
 * and not as a whole). Generally speaking, we recommend imposing limits limits
 * like MP costs, TP costs, cooldowns, and the like.
 * 
 * This is because auto skill triggers, when left unchecked and reacting to
 * everything, can cause a runaway effect where the player no longer inputs
 * anything. Instead, it is best to put a limit (even if high) on the number of
 * auto triggers to prevent such a thing from happening.
 * 
 * If you still want seemingly unlimited auto skill triggers, change the
 * numbers to 100 or something, but keep in mind that we're not responsible for
 * runaway effects when the risk of it happening is already mentioned.
 *
 * ---
 *
 * Settings
 * 
 *   Limit Per Turn (Turn-Based):
 *   - Turn-Based Only.
 *   - How many triggers per battler per turn?
 *   - Higher risk of runaway auto triggers at higher counts.
 * 
 *   Limit Per Turn (TPB-Based):
 *   - TPB-Only.
 *   - How many triggers per battler per turn?
 *   - Higher risk of runaway auto triggers at higher counts.
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
 * Version 1.19: September 14, 2026
 * * Feature Update!
 * ** Enemies can now trigger auto skills added by trait-added skills. Update
 *    made by Arisu.
 * 
 * Version 1.18: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where battle start auto skill triggers would erase the bonus
 *    effects of preemptive and surprise attacks. Fix made by Olivia.
 * 
 * Version 1.17: March 20, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > General Settings:
 * **** These are general settings used for this plugin. These are primarily
 *      used to impose a limit on the number of auto skill triggers that can
 *      happen per battler per turn (meaning each member in battle has that
 *      limit individually and not as a whole). Generally speaking, we
 *      recommend imposing limits limits like MP costs, TP costs, cooldowns,
 *      and the like.
 * **** This is because auto skill triggers, when left unchecked and reacting
 *      to everything, can cause a runaway effect where the player no longer
 *      inputs anything. Instead, it is best to put a limit (even if high) on
 *      the number of auto triggers to prevent such a thing from happening.
 * **** If you still want seemingly unlimited auto skill triggers, change the
 *      numbers to 100 or something, but keep in mind that we're not
 *      responsible for runaway effects when the risk of it happening is
 *      already mentioned.
 * *** Plugin Parameters > Limit Per Turn (Turn-Based)
 * **** Turn-Based Only. How many triggers per battler per turn? Higher risk of
 *      runaway auto triggers at higher counts.
 * *** Plugin Parameters > Limit Per Turn (TPB-Based)
 * **** TPB-Only. How many triggers per battler per turn? Higher risk of
 *      runaway auto triggers at higher counts.
 * 
 * Version 1.16: January 18, 2024
 * * Compatibility Update!
 * ** Added better compatibiliy with Battle System - OTB when using states with
 *    Action Times+. Update made by Olivia.
 * 
 * Version 1.15: August 17, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System - ATB's wait setting.
 *    Update made by Olivia.
 * 
 * Version 1.14: July 13, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System - ATB's active setting.
 *    Update made by Olivia.
 * ** Added better compatibility with Battle System - OTB for battle start and
 *    enemy responses. Update made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Compatibility Update!
 * ** Added better compatibility with Battle System OTB's forced action update.
 *    Update made by Olivia.
 * 
 * Version 1.12: June 30, 2022
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.11: March 10, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 16, 2021
 * * Compatibility Update!
 * ** Auto Skill Triggers is now disabled with the following battle systems:
 *    ETB, FTB, and PTB. This is due to the way their turn structures work,
 *    making them highly incompatible with one another.
 * ** We may revisit this in the future, but for now, Auto Skill Triggers are
 *    to be disabled by code when any of the battle systems are detected.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section.
 * 
 * Version 1.09: June 25, 2021
 * * Feature Update!
 * ** Added failsafe for those using illegal syntax charactes inside of their
 *    database type names which conflict with notetag creation. Fix by Irina.
 * 
 * Version 1.08: March 19, 2021
 * * Bug Fixes!
 * ** Death Triggers that cannot be used will no longer cause the battler to
 *    become immortal. Fix made by Irina.
 * 
 * Version 1.07: March 12, 2021
 * * Bug Fixes!
 * ** Battle Start auto-triggers should now work properly for actors when using
 *    auto-skills set up to be battle screen only. Fix made by Irina.
 * 
 * Version 1.06: February 12, 2021
 * * Optimization Update!
 * ** Skills that cannot be used will no longer be checked for auto triggers.
 *    Update made by Olivia.
 * 
 * Version 1.05: January 22, 2021
 * * Bug Fixes!
 * ** Triggers involving the user should now work properly. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Arisu:
 * *** <Auto Trigger x%: condition>
 * **** If using the x% variant, the Auto Trigger has a x% chance to occur.
 * **** Replace 'x' with a number value representing the chance to succeed.
 * 
 * Version 1.04: December 25, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for Battle System - STB.
 * 
 * Version 1.03: November 22, 2020
 * * Bug Fixes!
 * ** Auto Skill Triggers no long clear battler speed in TPB. Fixed by Yanfly.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Stunned enemies will have their auto triggers bypassed. Fix made
 *    by Olivia.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Skills and Items used outside of battle should no longer crash the game.
 *    Fix made by Yanfly.
 * ** Specific trigger types should no longer crash the game.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: October 28, 2020
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
 * @param AutoSkillTriggers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param LimitPerTurn:num
 * @text Limit Per Turn (Turn-Base)
 * @type number
 * @min 1
 * @desc Turn-Based Only. How many triggers per battler per turn?
 * Higher risk of runaway auto triggers at higher counts.
 * @default 10
 *
 * @param LimitPerTurnTPB:num
 * @text Limit Per Turn (TPB-Base)
 * @type number
 * @min 1
 * @desc TPB-Only. How many triggers per battler per turn?
 * Higher risk of runaway auto triggers at higher counts.
 * @default 5
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
//=============================================================================

function _0x4379(){const _0x55e0d1=['includes','_action','VisuMZ_1_ElementStatusCore','isValid','on%1Magical','otbProcessActionCheck','_tpbCastTime','allBattleMembers','Game_Action_applyGlobal','Game_Enemy_makeActions','isATB','skillTypes','clearTpbChargeTime','isActor','constructAutoSkillTriggerATB','format','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','endAction','forceAction','(?:MAGICAL\x20%1|MAGICAL\x20ATTACK\x20%1)','stripNameTextCodes','FUNC','Cannot\x20create\x20%1\x20and\x20%2\x20notetags','Settings','(?:ELEMENT\x20%1\x20%2|ELE\x20%1\x20%2)','User','<AUTO\x20TRIGGER\x20(.*)([%％]):[\x20]%1>','Scene_Boot_onDatabaseLoaded','name','STRUCT','note','constructor','387aBLYdI','_actions','CreateNotetags','occasion','setAutoSkillTrigger','isActiveChainSkillsUiVisible','battler','1654088fDojYQ','hasDeathTransform','_deathAutoSkillTriggerActive','(?:ITEM\x20%1|ITEM\x20%1)','isOptionValid','Game_Action_isValid','canMove','ARRAYNUM','69740RAjwEP','AUTO_TRIGGER_LIMIT_PER_TURN_NORMAL','ARRAYFUNC','PTB','_tpbIdleTime','53349pSCdCs','isCertainHit','checkDeathAutoSkillTriggerRemoval','JSON','hasDeathAutoSkillTrigger','match','prototype','_autoTriggerAtbReturn','description','hasOtbForcedActionAutoSkillBattler','_tpbState','startTurn','isAttack','isItem','elementId','isImmortal','VisuMZ_2_BattleSystemOTB\x20needs\x20to\x20be\x20updated\x20','on%1Item','_actionBattlers','_CHANCE','clearDeathAutoSkillTrigger','length','_scene','adjustTurnOrderAutoSkillTrigger','opponentsUnit','clear','VisuMZ_1_SkillsStatesCore','_tpbChargeTime','_preemptive','FRIENDS','_deathAutoSkillTriggerPerformed','parse','isAutoSkillTriggerCompatible','isMagical','on%1Physical','getAutoSkillTriggerSTypes','unshift','endActionAutoTriggerATB','_autoSkillTrigger_otbProcessActionCheck','CreateNotetag','_inBattle','OPPONENTS','BattleManager_endTurn','forceAutoSkillTrigger','on%1Attack','onBattleWin','Opponents','requestUpdateTurnOrders','on%1Element%2','_subjectX','addedSkills','10wezOZS','TARGET','_positionDuration','isOTB','acting','skills','log','\x20\x20\x20','remove','exit','Ally','Game_Battler_clearTpbChargeTime','NUM','_instance','constructAutoSkillTriggerOTB','Friends','Target','isAllDead','_surprise','Type\x20name\x20has\x20invalid\x20characters\x20that\x20cannot\x20be\x20used.','_lastAutoTriggerTurn','isGuard','test','(?:DEATH|DEATHRATTLE|DEATH\x20RATTLE|LASTWORD|LAST\x20WORD|FINAL\x20ATTACK)','subject','isAlive','getSkillTypes','onAllActionsEnd','Game_BattlerBase_addNewState','onDeath','aliveMembers','_preventMakeActionsOtb','LimitPerTurnTPB','ARRAYJSON','(?:BATTLE\x20WIN|WIN\x20BATTLE|VICTORY|VICTORY\x20CRY|VICTORYCRY)','isSkill','isEnemy','damage','_autoTriggersThisTurn','makeActions','ARRAYEVAL','AUTO_TRIGGER_LIMIT_PER_TURN_TPB','BattleManager_endAction','turnCount','process_VisuMZ_AutoSkillTriggers_Notetags','isAutoSkillTrigger','processOnBattleWinAutoSkillTriggers','max','FRIENDS\x20ONLY','revive','BattleManager_startTurn','push','RegExp','ENEMY','FTB','_tpbTurnEnd','on%1SType%2','48pQxXRs','_currentTurn','version','meetsDeathAutoSkillTrigger','getElementNameFromID','replace','_otbTurnOrderWindow','toUpperCase','applyAutoSkillTriggers','isSceneBattle','_onBattleWinAutoSkillTriggerOn','ConvertParams','Game_Action_clear','endTurn','Game_Actor_makeActions','pop','_tpbTurnCount','ARRAYSTRUCT','_forcedBattlers','isPhysical','VisuMZ_3_LifeStateEffects','<AUTO\x20TRIGGER:[\x20]%1>','(?:SKILL\x20TYPE\x20%1\x20%2|STYPE\x20%1\x20%2)','_forceAction','30nrdvTn','_savedAutoSkillTriggerActions','canUse','attackElements','324460QUtMyt','performAutoSkillTriggers','Game_Unit_onBattleStart','applyGlobal','stypeId','Enemy','constructAutoSkillTrigger','chargeTime','trim','isTpb','_subject','item','LimitPerTurn','return\x200','random','_autoSkillTrigger','elements','Game_BattlerBase_revive','ETB','checkBattleEnd','Game_BattlerBase_isImmortal','ONDEATH','call','AutoSkillTriggers','BattleManager_checkBattleEnd','processDeathAutoSkillTriggerEffects','VisuMZ_2_BattleSystemOTB','onBattleEnd','some','charged','onBattleStart','indexOf','filter','isBattleSys','processAutoSkillTriggers','Game_Battler_onBattleEnd','onDatabaseLoaded','on%1Certain','getSkillTypeNameFromID','canPerformAutoSkillTriggers','turnEnd','ARRAYSTR','971327gobGMg','processAutoSkillTrigger','VisuMZ_3_InputComboSkills','status','2664079jHgvHC','map','canActivateDeathAutoSkillTrigger','concat','373970IPjaKq','(?:BATTLE\x20START|START\x20BATTLE|BATTLECRY|BATTLE\x20CRY|FANFARE|SNEAK\x20ATTACK)','returnSavedAutoSkillTriggerActions','8QdBSgC'];_0x4379=function(){return _0x55e0d1;};return _0x4379();}const _0x5efba2=_0x12be;(function(_0x732431,_0x232947){const _0x4e0408=_0x12be,_0x4945e7=_0x732431();while(!![]){try{const _0x39e3af=-parseInt(_0x4e0408(0x296))/0x1+-parseInt(_0x4e0408(0x20f))/0x2*(-parseInt(_0x4e0408(0x1dc))/0x3)+-parseInt(_0x4e0408(0x299))/0x4*(parseInt(_0x4e0408(0x264))/0x5)+-parseInt(_0x4e0408(0x260))/0x6*(parseInt(_0x4e0408(0x28e))/0x7)+parseInt(_0x4e0408(0x1cf))/0x8+-parseInt(_0x4e0408(0x1c8))/0x9*(-parseInt(_0x4e0408(0x1d7))/0xa)+-parseInt(_0x4e0408(0x292))/0xb*(-parseInt(_0x4e0408(0x248))/0xc);if(_0x39e3af===_0x232947)break;else _0x4945e7['push'](_0x4945e7['shift']());}catch(_0x2d5c1e){_0x4945e7['push'](_0x4945e7['shift']());}}}(_0x4379,0x598a3));var label=_0x5efba2(0x27b),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x5efba2(0x284)](function(_0x5e28b4){const _0x5b8dec=_0x5efba2;return _0x5e28b4[_0x5b8dec(0x291)]&&_0x5e28b4[_0x5b8dec(0x1e4)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5efba2(0x2b1)]||{},VisuMZ[_0x5efba2(0x253)]=function(_0x1a3294,_0x2bb0a6){const _0x18703f=_0x5efba2;for(const _0x5e1ef7 in _0x2bb0a6){if(_0x5e1ef7[_0x18703f(0x1e1)](/(.*):(.*)/i)){const _0x2406d6=String(RegExp['$1']),_0x1e6ad8=String(RegExp['$2'])['toUpperCase']()[_0x18703f(0x26c)]();let _0x26da55,_0xef94e3,_0x5ce760;switch(_0x1e6ad8){case _0x18703f(0x21b):_0x26da55=_0x2bb0a6[_0x5e1ef7]!==''?Number(_0x2bb0a6[_0x5e1ef7]):0x0;break;case _0x18703f(0x1d6):_0xef94e3=_0x2bb0a6[_0x5e1ef7]!==''?JSON['parse'](_0x2bb0a6[_0x5e1ef7]):[],_0x26da55=_0xef94e3['map'](_0x4492a9=>Number(_0x4492a9));break;case'EVAL':_0x26da55=_0x2bb0a6[_0x5e1ef7]!==''?eval(_0x2bb0a6[_0x5e1ef7]):null;break;case _0x18703f(0x237):_0xef94e3=_0x2bb0a6[_0x5e1ef7]!==''?JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7]):[],_0x26da55=_0xef94e3[_0x18703f(0x293)](_0x288e6e=>eval(_0x288e6e));break;case _0x18703f(0x1df):_0x26da55=_0x2bb0a6[_0x5e1ef7]!==''?JSON['parse'](_0x2bb0a6[_0x5e1ef7]):'';break;case _0x18703f(0x230):_0xef94e3=_0x2bb0a6[_0x5e1ef7]!==''?JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7]):[],_0x26da55=_0xef94e3[_0x18703f(0x293)](_0x5a4e72=>JSON[_0x18703f(0x1fb)](_0x5a4e72));break;case _0x18703f(0x2af):_0x26da55=_0x2bb0a6[_0x5e1ef7]!==''?new Function(JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7])):new Function(_0x18703f(0x271));break;case _0x18703f(0x1d9):_0xef94e3=_0x2bb0a6[_0x5e1ef7]!==''?JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7]):[],_0x26da55=_0xef94e3['map'](_0x503d34=>new Function(JSON[_0x18703f(0x1fb)](_0x503d34)));break;case'STR':_0x26da55=_0x2bb0a6[_0x5e1ef7]!==''?String(_0x2bb0a6[_0x5e1ef7]):'';break;case _0x18703f(0x28d):_0xef94e3=_0x2bb0a6[_0x5e1ef7]!==''?JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7]):[],_0x26da55=_0xef94e3[_0x18703f(0x293)](_0x525ddc=>String(_0x525ddc));break;case _0x18703f(0x1c5):_0x5ce760=_0x2bb0a6[_0x5e1ef7]!==''?JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7]):{},_0x26da55=VisuMZ[_0x18703f(0x253)]({},_0x5ce760);break;case _0x18703f(0x259):_0xef94e3=_0x2bb0a6[_0x5e1ef7]!==''?JSON[_0x18703f(0x1fb)](_0x2bb0a6[_0x5e1ef7]):[],_0x26da55=_0xef94e3[_0x18703f(0x293)](_0x141f26=>VisuMZ['ConvertParams']({},JSON[_0x18703f(0x1fb)](_0x141f26)));break;default:continue;}_0x1a3294[_0x2406d6]=_0x26da55;}}return _0x1a3294;},(_0x4034f6=>{const _0xa0049e=_0x5efba2,_0x44464a=_0x4034f6[_0xa0049e(0x1c4)];for(const _0x208fbe of dependencies){if(!Imported[_0x208fbe]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xa0049e(0x2a9)](_0x44464a,_0x208fbe)),SceneManager[_0xa0049e(0x218)]();break;}}const _0x39030a=_0x4034f6[_0xa0049e(0x1e4)];if(_0x39030a[_0xa0049e(0x1e1)](/\[Version[ ](.*?)\]/i)){const _0x1af582=Number(RegExp['$1']);_0x1af582!==VisuMZ[label]['version']&&(alert(_0xa0049e(0x2aa)[_0xa0049e(0x2a9)](_0x44464a,_0x1af582)),SceneManager['exit']());}if(_0x39030a['match'](/\[Tier[ ](\d+)\]/i)){const _0x5cb237=Number(RegExp['$1']);_0x5cb237<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x44464a,_0x5cb237,tier)),SceneManager['exit']()):tier=Math[_0xa0049e(0x23e)](_0x5cb237,tier);}VisuMZ[_0xa0049e(0x253)](VisuMZ[label][_0xa0049e(0x2b1)],_0x4034f6['parameters']);})(pluginData);if(Imported[_0x5efba2(0x27e)]&&VisuMZ['BattleSystemOTB'][_0x5efba2(0x24a)]<1.13){let text='';text+=_0x5efba2(0x1ec),text+='in\x20order\x20for\x20VisuMZ_3_AutoSkillTriggers\x20to\x20work.',alert(text),SceneManager[_0x5efba2(0x218)]();}VisuMZ[_0x5efba2(0x27b)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x5efba2(0x1e2)][_0x5efba2(0x288)],Scene_Boot[_0x5efba2(0x1e2)][_0x5efba2(0x288)]=function(){const _0x30f878=_0x5efba2;VisuMZ['AutoSkillTriggers'][_0x30f878(0x1c3)][_0x30f878(0x27a)](this),this[_0x30f878(0x23b)]();},Scene_Boot[_0x5efba2(0x1e2)][_0x5efba2(0x23b)]=function(){const _0x304443=_0x5efba2;VisuMZ[_0x304443(0x27b)][_0x304443(0x1ca)]();},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x243)]={},VisuMZ[_0x5efba2(0x27b)]['CreateNotetags']=function(){const _0x69791=_0x5efba2;let _0x434314=[[_0x69791(0x1c1),'USER'],[_0x69791(0x21f),_0x69791(0x210)],['Ally','ALLY'],[_0x69791(0x269),_0x69791(0x244)],[_0x69791(0x21e),_0x69791(0x1f9)],['FriendsOnly',_0x69791(0x23f)],[_0x69791(0x20a),_0x69791(0x205)]],_0x208764=[[_0x69791(0x282),_0x69791(0x297)],[_0x69791(0x209),_0x69791(0x231)],[_0x69791(0x22c),_0x69791(0x226)]];for(const _0x564aab of _0x434314){if(!_0x564aab)continue;_0x208764[_0x69791(0x242)]([_0x69791(0x208)[_0x69791(0x2a9)](_0x564aab[0x0]),'(?:ATTACK\x20%1|STRIKE\x20%1)'[_0x69791(0x2a9)](_0x564aab[0x1])]),_0x208764['push'](['on%1Guard'[_0x69791(0x2a9)](_0x564aab[0x0]),'(?:GUARD\x20%1|GUARD\x20%1)'[_0x69791(0x2a9)](_0x564aab[0x1])]),_0x208764[_0x69791(0x242)](['on%1Item'['format'](_0x564aab[0x0]),_0x69791(0x1d2)[_0x69791(0x2a9)](_0x564aab[0x1])]),_0x208764[_0x69791(0x242)]([_0x69791(0x1fe)[_0x69791(0x2a9)](_0x564aab[0x0]),'(?:PHYSICAL\x20%1|PHYSICAL\x20ATTACK\x20%1)'['format'](_0x564aab[0x1])]),_0x208764[_0x69791(0x242)](['on%1Magical'[_0x69791(0x2a9)](_0x564aab[0x0]),_0x69791(0x2ad)[_0x69791(0x2a9)](_0x564aab[0x1])]),_0x208764[_0x69791(0x242)]([_0x69791(0x289)[_0x69791(0x2a9)](_0x564aab[0x0]),'(?:CERTAIN\x20%1|CERTAIN\x20HIT\x20%1)'[_0x69791(0x2a9)](_0x564aab[0x1])]);}for(const _0x2901a6 of $dataSystem['skillTypes']){if(!_0x2901a6)continue;let _0x17b7c5=DataManager[_0x69791(0x2ae)](_0x2901a6);for(const _0x2df482 of _0x434314){if(!_0x2df482)continue;_0x208764['push'](['on%2SType%1'[_0x69791(0x2a9)](_0x17b7c5[_0x69791(0x24d)](/[ ]/gi,''),_0x2df482[0x0]),_0x69791(0x25e)[_0x69791(0x2a9)](_0x17b7c5,_0x2df482[0x1])]);}}for(const _0x4a4140 of $dataSystem[_0x69791(0x274)]){if(!_0x4a4140)continue;let _0x5a840d=DataManager[_0x69791(0x2ae)](_0x4a4140);for(const _0x1e460e of _0x434314){if(!_0x1e460e)continue;_0x208764[_0x69791(0x242)](['on%2Element%1'['format'](_0x5a840d[_0x69791(0x24d)](/[ ]/gi,''),_0x1e460e[0x0]),_0x69791(0x2b2)[_0x69791(0x2a9)](_0x5a840d,_0x1e460e[0x1])]);}}for(const _0x124bf7 of _0x208764){this['CreateNotetag'](_0x124bf7[0x0],_0x124bf7[0x1]);}},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x203)]=function(_0x2b8471,_0x1ae65c){const _0x1d9549=_0x5efba2;_0x2b8471=_0x2b8471[_0x1d9549(0x24f)]()[_0x1d9549(0x26c)]();const _0x4b6741=_0x1d9549(0x25d)[_0x1d9549(0x2a9)](_0x1ae65c),_0x21df73=_0x2b8471+'_CHANCE',_0x531e7e=_0x1d9549(0x1c2)[_0x1d9549(0x2a9)](_0x1ae65c);try{VisuMZ[_0x1d9549(0x27b)][_0x1d9549(0x243)][_0x2b8471]=new RegExp(_0x4b6741,'i'),VisuMZ['AutoSkillTriggers'][_0x1d9549(0x243)][_0x21df73]=new RegExp(_0x531e7e,'i');}catch(_0x4f996a){Utils[_0x1d9549(0x1d3)](_0x1d9549(0x225))&&(console['log']('===\x20This\x20Message\x20Only\x20Appears\x20in\x20Play\x20Test\x20==='),console[_0x1d9549(0x215)](_0x1d9549(0x2b0)[_0x1d9549(0x2a9)](_0x4b6741,_0x531e7e)),console[_0x1d9549(0x215)](_0x1d9549(0x222)),console['log'](_0x1d9549(0x216)));}},DataManager['getSkillTypeNameFromID']=function(_0x3df89b){const _0x5d599c=_0x5efba2;return this[_0x5d599c(0x2ae)]($dataSystem[_0x5d599c(0x2a5)][_0x3df89b]);},DataManager[_0x5efba2(0x2ae)]=function(_0xca37e0){const _0x5d0584=_0x5efba2;if(!_0xca37e0)return'';return _0xca37e0=_0xca37e0['replace'](/\\V\[(\d+)\]/gi,''),_0xca37e0=_0xca37e0['replace'](/\\I\[(\d+)\]/gi,''),_0xca37e0=_0xca37e0[_0x5d0584(0x24d)](/\\C\[(\d+)\]/gi,''),_0xca37e0=_0xca37e0[_0x5d0584(0x24d)](/\\N\[(\d+)\]/gi,''),_0xca37e0=_0xca37e0['replace'](/\\P\[(\d+)\]/gi,''),(_0xca37e0||'')['toUpperCase']()[_0x5d0584(0x26c)]();},DataManager['getElementNameFromID']=function(_0x539792){const _0x11066a=_0x5efba2;return this['stripNameTextCodes']($dataSystem[_0x11066a(0x274)][_0x539792]);},VisuMZ['AutoSkillTriggers'][_0x5efba2(0x206)]=BattleManager[_0x5efba2(0x255)],BattleManager[_0x5efba2(0x255)]=function(){const _0x57669f=_0x5efba2,_0x1f10b7=this[_0x57669f(0x221)],_0x4c3da8=this['_preemptive'];VisuMZ['AutoSkillTriggers']['BattleManager_endTurn'][_0x57669f(0x27a)](this);if($gameTroop[_0x57669f(0x23a)]()<=0x0){if(_0x1f10b7)this['_surprise']=!![];if(_0x4c3da8)this[_0x57669f(0x1f8)]=!![];}},BattleManager[_0x5efba2(0x1fc)]=function(){const _0x5b9077=_0x5efba2;if(this[_0x5b9077(0x285)](_0x5b9077(0x276)))return![];if(this[_0x5b9077(0x285)](_0x5b9077(0x245)))return![];if(this[_0x5b9077(0x285)](_0x5b9077(0x1da)))return![];if(Imported['VisuMZ_3_ActiveChainSkills']){const _0x24534b=SceneManager[_0x5b9077(0x1f2)];if(_0x24534b&&_0x24534b[_0x5b9077(0x1cd)]())return![];}if(Imported[_0x5b9077(0x290)]){const _0x4ad6de=SceneManager[_0x5b9077(0x1f2)];if(_0x4ad6de&&_0x4ad6de['canPerformInputComboSkills']())return![];}return!![];},VisuMZ['AutoSkillTriggers'][_0x5efba2(0x239)]=BattleManager[_0x5efba2(0x2ab)],BattleManager[_0x5efba2(0x2ab)]=function(){const _0x2cd770=_0x5efba2,_0x2bc9ca=this['_action']&&this[_0x2cd770(0x29b)][_0x2cd770(0x23c)](),_0x98b0f9=this[_0x2cd770(0x26e)];_0x2bc9ca&&(this[_0x2cd770(0x26e)]['_autoSkillTriggerBypassTpbClear']=!![]),VisuMZ[_0x2cd770(0x27b)]['BattleManager_endAction'][_0x2cd770(0x27a)](this),_0x98b0f9&&_0x2bc9ca&&(_0x98b0f9[_0x2cd770(0x298)](),_0x98b0f9[_0x2cd770(0x201)]());},VisuMZ['AutoSkillTriggers'][_0x5efba2(0x27c)]=BattleManager[_0x5efba2(0x277)],BattleManager[_0x5efba2(0x277)]=function(){const _0x3bd373=_0x5efba2;$gameTroop[_0x3bd373(0x220)]()&&$gameParty[_0x3bd373(0x23d)]();if(this[_0x3bd373(0x25a)][_0x3bd373(0x1f1)]>0x0)return![];if(BattleManager[_0x3bd373(0x1e5)]())return![];return VisuMZ[_0x3bd373(0x27b)]['BattleManager_checkBattleEnd'][_0x3bd373(0x27a)](this);},BattleManager['hasOtbForcedActionAutoSkillBattler']=function(){const _0x153156=_0x5efba2;if(!Imported[_0x153156(0x27e)])return![];if(!BattleManager[_0x153156(0x212)]())return![];return this[_0x153156(0x1ee)][_0x153156(0x280)](_0x57ed43=>_0x57ed43['_actions']['some'](_0xbc3ea5=>_0xbc3ea5&&_0xbc3ea5[_0x153156(0x25f)]));},Game_Action[_0x5efba2(0x1d8)]=VisuMZ[_0x5efba2(0x27b)]['Settings'][_0x5efba2(0x270)]??0xa,Game_Action[_0x5efba2(0x238)]=VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x2b1)][_0x5efba2(0x22f)]??0x5,VisuMZ['AutoSkillTriggers'][_0x5efba2(0x254)]=Game_Action[_0x5efba2(0x1e2)]['clear'],Game_Action[_0x5efba2(0x1e2)][_0x5efba2(0x1f5)]=function(){const _0x3def1d=_0x5efba2;VisuMZ[_0x3def1d(0x27b)][_0x3def1d(0x254)]['call'](this),this[_0x3def1d(0x1cc)](![]);},Game_Action[_0x5efba2(0x1e2)][_0x5efba2(0x1cc)]=function(_0x2f4912){const _0x160ba6=_0x5efba2;this[_0x160ba6(0x273)]=_0x2f4912;},Game_Action[_0x5efba2(0x1e2)][_0x5efba2(0x23c)]=function(){const _0x52f3c3=_0x5efba2;return!!this[_0x52f3c3(0x273)];},VisuMZ['AutoSkillTriggers']['Game_Action_isValid']=Game_Action['prototype'][_0x5efba2(0x29d)],Game_Action['prototype'][_0x5efba2(0x29d)]=function(){const _0x5a8c43=_0x5efba2;let _0x11563f=VisuMZ[_0x5a8c43(0x27b)][_0x5a8c43(0x1d4)]['call'](this),_0x1f2139=this[_0x5a8c43(0x26f)]()?this[_0x5a8c43(0x26f)]()['occasion']:-0x1;return this[_0x5a8c43(0x26f)]()&&this['isAutoSkillTrigger']()?(this[_0x5a8c43(0x26f)]()[_0x5a8c43(0x1cb)]=0x0,_0x11563f=_0x11563f&&this[_0x5a8c43(0x227)]()[_0x5a8c43(0x262)](this[_0x5a8c43(0x26f)]()),this['item']()[_0x5a8c43(0x1cb)]=_0x1f2139,_0x11563f&&(this[_0x5a8c43(0x227)]()[_0x5a8c43(0x235)]+=0x1),_0x11563f):_0x11563f;},VisuMZ[_0x5efba2(0x27b)]['Game_Action_applyGlobal']=Game_Action[_0x5efba2(0x1e2)]['applyGlobal'],Game_Action[_0x5efba2(0x1e2)][_0x5efba2(0x267)]=function(){const _0xd22993=_0x5efba2;VisuMZ[_0xd22993(0x27b)][_0xd22993(0x2a2)][_0xd22993(0x27a)](this),this[_0xd22993(0x250)]();},Game_Action[_0x5efba2(0x1e2)][_0x5efba2(0x1ff)]=function(){const _0x5cc611=_0x5efba2;if(!this[_0x5cc611(0x232)]())return[];let _0x2a5ef2=[];return Imported[_0x5cc611(0x1f6)]?_0x2a5ef2=DataManager[_0x5cc611(0x229)](this[_0x5cc611(0x26f)]()):_0x2a5ef2[_0x5cc611(0x242)](this[_0x5cc611(0x26f)]()[_0x5cc611(0x268)]),_0x2a5ef2[_0x5cc611(0x293)](_0x241a90=>DataManager[_0x5cc611(0x28a)](_0x241a90));},Game_Action[_0x5efba2(0x1e2)]['getAutoSkillTriggerElements']=function(){const _0x298ba3=_0x5efba2;let _0x5bf57c=[];if(Imported[_0x298ba3(0x29c)])_0x5bf57c=this[_0x298ba3(0x274)]();else{if(this['item']()[_0x298ba3(0x234)][_0x298ba3(0x1ea)]<0x0){const _0x5827ff=this[_0x298ba3(0x227)]();_0x5bf57c=_0x5827ff[_0x298ba3(0x263)]();}else _0x5bf57c=[this['item']()[_0x298ba3(0x234)][_0x298ba3(0x1ea)]];}return _0x5bf57c[_0x298ba3(0x293)](_0x453b84=>DataManager[_0x298ba3(0x24c)](_0x453b84));},Game_Action[_0x5efba2(0x1e2)][_0x5efba2(0x250)]=function(){const _0x2fb919=_0x5efba2;if(!SceneManager[_0x2fb919(0x251)]())return;if(!BattleManager[_0x2fb919(0x1fc)]())return;if(!this[_0x2fb919(0x26f)]())return;if(this['item']()[_0x2fb919(0x1c6)][_0x2fb919(0x1e1)](/<NO AUTO SKILL TRIGGER>/i))return;if(this['item']()[_0x2fb919(0x1c6)]['match'](/<AUTO TRIGGER:[ ](.*)>/i))return;const _0x37b612=this[_0x2fb919(0x227)](),_0x5e6139=BattleManager['_targets'][_0x2fb919(0x284)]((_0x174289,_0x442832,_0x5ccb55)=>_0x5ccb55[_0x2fb919(0x283)](_0x174289)===_0x442832),_0x263e5b=_0x37b612['friendsUnit']()[_0x2fb919(0x22d)](),_0x15f7a2=_0x37b612[_0x2fb919(0x1f4)]()[_0x2fb919(0x22d)]();this[_0x2fb919(0x265)](_0x37b612,_0x2fb919(0x1c1));for(const _0x5f48eb of _0x5e6139){this['performAutoSkillTriggers'](_0x5f48eb,_0x2fb919(0x21f));if(_0x5f48eb[_0x2fb919(0x2a7)]()===_0x37b612[_0x2fb919(0x2a7)]())this[_0x2fb919(0x265)](_0x5f48eb,_0x2fb919(0x219));else _0x5f48eb['isActor']()!==_0x37b612[_0x2fb919(0x2a7)]()&&this[_0x2fb919(0x265)](_0x5f48eb,_0x2fb919(0x269));}for(const _0x1f7248 of _0x263e5b){this[_0x2fb919(0x265)](_0x1f7248,_0x2fb919(0x21e)),_0x1f7248!==_0x37b612&&this[_0x2fb919(0x265)](_0x1f7248,'FriendsOnly');}for(const _0x43e9dd of _0x15f7a2){this[_0x2fb919(0x265)](_0x43e9dd,_0x2fb919(0x20a));}},Game_Action[_0x5efba2(0x1e2)]['performAutoSkillTriggers']=function(_0xf03d84,_0x2f70c9){const _0x30d718=_0x5efba2;if(!_0xf03d84)return;if(!BattleManager[_0x30d718(0x1fc)]())return;if(this[_0x30d718(0x1e8)]())_0xf03d84[_0x30d718(0x28f)](_0x30d718(0x208)[_0x30d718(0x2a9)](_0x2f70c9));if(this[_0x30d718(0x224)]())_0xf03d84[_0x30d718(0x28f)]('on%1Guard'['format'](_0x2f70c9));if(this[_0x30d718(0x1e9)]())_0xf03d84['processAutoSkillTrigger'](_0x30d718(0x1ed)[_0x30d718(0x2a9)](_0x2f70c9));if(this[_0x30d718(0x25b)]())_0xf03d84[_0x30d718(0x28f)]('on%1Physical'['format'](_0x2f70c9));if(this[_0x30d718(0x1fd)]())_0xf03d84[_0x30d718(0x28f)](_0x30d718(0x29e)[_0x30d718(0x2a9)](_0x2f70c9));if(this[_0x30d718(0x1dd)]())_0xf03d84[_0x30d718(0x28f)](_0x30d718(0x289)[_0x30d718(0x2a9)](_0x2f70c9));const _0x43427f=this[_0x30d718(0x1ff)]();for(let _0x5c5af9 of _0x43427f){if(!_0x5c5af9)continue;_0x5c5af9=_0x5c5af9['replace'](/[ ]/gi,''),_0xf03d84[_0x30d718(0x28f)](_0x30d718(0x247)[_0x30d718(0x2a9)](_0x2f70c9,_0x5c5af9));}const _0x49ab85=this['getAutoSkillTriggerElements']();for(let _0x1c5c5d of _0x49ab85){if(!_0x1c5c5d)continue;_0x1c5c5d=_0x1c5c5d[_0x30d718(0x24d)](/[ ]/gi,''),_0xf03d84[_0x30d718(0x28f)](_0x30d718(0x20c)['format'](_0x2f70c9,_0x1c5c5d));}},VisuMZ['AutoSkillTriggers'][_0x5efba2(0x22b)]=Game_BattlerBase[_0x5efba2(0x1e2)]['addNewState'],Game_BattlerBase[_0x5efba2(0x1e2)]['addNewState']=function(_0xef94a6){const _0xc797af=_0x5efba2;if(this[_0xc797af(0x294)](_0xef94a6))return this[_0xc797af(0x27d)]();VisuMZ[_0xc797af(0x27b)][_0xc797af(0x22b)][_0xc797af(0x27a)](this,_0xef94a6);},Game_BattlerBase['prototype'][_0x5efba2(0x294)]=function(_0x513e8e){const _0x1f60f0=_0x5efba2;if(_0x513e8e!==this['deathStateId']())return![];if(Imported[_0x1f60f0(0x25c)]){if(this['hasLifeStateAutoLifeEffect']())return![];if(this[_0x1f60f0(0x233)]()&&this[_0x1f60f0(0x1d0)]())return![];}return this['hasDeathAutoSkillTrigger']();},Game_BattlerBase[_0x5efba2(0x1e2)][_0x5efba2(0x1e0)]=function(){const _0x4125e3=_0x5efba2;if(!SceneManager[_0x4125e3(0x251)]())return![];if(!this['canMove']())return![];if(this['_deathAutoSkillTriggerPerformed'])return![];return this[_0x4125e3(0x214)]()[_0x4125e3(0x280)](_0x143751=>this[_0x4125e3(0x24b)](_0x143751));},Game_BattlerBase[_0x5efba2(0x1e2)][_0x5efba2(0x24b)]=function(_0x5369cf){const _0x4b0188=_0x5efba2,_0x3ae48f=VisuMZ[_0x4b0188(0x27b)]['RegExp'][_0x4b0188(0x279)];return _0x5369cf&&_0x5369cf['note']['match'](_0x3ae48f)&&this[_0x4b0188(0x262)](_0x5369cf);},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x278)]=Game_BattlerBase['prototype']['isImmortal'],Game_BattlerBase[_0x5efba2(0x1e2)][_0x5efba2(0x1eb)]=function(){const _0x51be0b=_0x5efba2;if(this['_deathAutoSkillTriggerActive'])return!![];return VisuMZ[_0x51be0b(0x27b)]['Game_BattlerBase_isImmortal'][_0x51be0b(0x27a)](this);},Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x28f)]=function(_0x3c2263){const _0x18970f=_0x5efba2;if(!SceneManager['isSceneBattle']())return;if(!this[_0x18970f(0x28b)]())return;if(!BattleManager[_0x18970f(0x1fc)]())return;_0x3c2263=_0x3c2263[_0x18970f(0x24f)]()[_0x18970f(0x26c)]();const _0xc6983f=VisuMZ['AutoSkillTriggers'][_0x18970f(0x243)][_0x3c2263],_0x5a1ff9=_0x3c2263+_0x18970f(0x1ef),_0x442efe=VisuMZ[_0x18970f(0x27b)][_0x18970f(0x243)][_0x5a1ff9];if(!_0xc6983f&&!_0x442efe)return;if(!this[_0x18970f(0x1d5)]())return;const _0x3452ba=this[_0x18970f(0x214)](),_0x557a54=this[_0x18970f(0x20e)]()[_0x18970f(0x293)](_0x2a0127=>$dataSkills[_0x2a0127])[_0x18970f(0x217)](undefined)[_0x18970f(0x217)](null),_0x568d0=_0x3452ba[_0x18970f(0x295)](_0x557a54)[_0x18970f(0x284)]((_0x4f7843,_0x5ad63d,_0x56bb7e)=>_0x56bb7e[_0x18970f(0x283)](_0x4f7843)===_0x5ad63d);for(const _0x34485e of _0x568d0){if(!_0x34485e)continue;if(!this[_0x18970f(0x262)](_0x34485e))continue;let _0x589932=![];if(_0x34485e['note'][_0x18970f(0x1e1)](_0xc6983f))_0x589932=!![];else{if(_0x34485e['note'][_0x18970f(0x1e1)](_0x442efe)){const _0x481d51=(Number(RegExp['$1'])||0x0)*0.01;_0x589932=Math[_0x18970f(0x272)]()<_0x481d51;}}if(_0x589932){if(Imported['VisuMZ_2_BattleSystemATB']&&BattleManager[_0x18970f(0x1fc)]())this[_0x18970f(0x2a8)](_0x34485e);else Imported[_0x18970f(0x27e)]&&BattleManager[_0x18970f(0x212)]()?this[_0x18970f(0x21d)](_0x34485e):this['constructAutoSkillTrigger'](_0x34485e);}}},Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x26a)]=function(_0x513b72){const _0x5762c0=_0x5efba2;this[_0x5762c0(0x207)](_0x513b72['id']);const _0x1906ba=BattleManager[_0x5762c0(0x1ee)]['clone'](),_0x2c4dbc=BattleManager[_0x5762c0(0x26e)];BattleManager[_0x5762c0(0x26e)]=null,BattleManager[_0x5762c0(0x2ac)](this),BattleManager[_0x5762c0(0x1ee)]=_0x1906ba,BattleManager[_0x5762c0(0x26e)]=_0x2c4dbc;},Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x2a8)]=function(_0x59aa15,_0x40d5d5){const _0x1024b4=_0x5efba2;this['_autoTriggerAtbReturn']={'state':this[_0x1024b4(0x1e6)],'chargeTime':this['_tpbChargeTime'],'castTime':this['_tpbCastTime'],'idleTime':this['_tpbIdleTime'],'turnCount':this[_0x1024b4(0x258)],'turnEnd':this[_0x1024b4(0x246)]},this['constructAutoSkillTrigger'](_0x59aa15);},Game_Battler['prototype'][_0x5efba2(0x201)]=function(){const _0x395c81=_0x5efba2;if(!Imported['VisuMZ_2_BattleSystemATB'])return;if(!BattleManager[_0x395c81(0x2a4)]())return;[_0x395c81(0x213),'charged'][_0x395c81(0x29a)](this[_0x395c81(0x1e6)])&&this['clearTpbChargeTime']();if(!this[_0x395c81(0x1e3)])return;this[_0x395c81(0x1e6)]=this[_0x395c81(0x1e3)]['state'],this[_0x395c81(0x1f7)]=this[_0x395c81(0x1e3)][_0x395c81(0x26b)],this[_0x395c81(0x2a0)]=this['_autoTriggerAtbReturn']['castTime'],this[_0x395c81(0x1db)]=this['_autoTriggerAtbReturn']['idleTime'],this['_tpbTurnCount']=this[_0x395c81(0x1e3)]['turnCount'],this[_0x395c81(0x246)]=this[_0x395c81(0x1e3)][_0x395c81(0x28c)],BattleManager[_0x395c81(0x26e)]=null,this[_0x395c81(0x1e3)]=undefined,[_0x395c81(0x213),_0x395c81(0x281)][_0x395c81(0x29a)](this['_tpbState'])&&this[_0x395c81(0x2a6)]();},Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x21d)]=function(_0x1db120){const _0x129310=_0x5efba2;if(!this[_0x129310(0x1d5)]())return;this[_0x129310(0x207)](_0x1db120['id']),$gameTemp[_0x129310(0x22e)]=!![],this['otbAddActions'](0x1,!![]),$gameTemp[_0x129310(0x22e)]=![];const _0x3e15c8=BattleManager[_0x129310(0x1ee)];_0x3e15c8[_0x129310(0x200)](_0x3e15c8[_0x129310(0x257)]());const _0x1e7848=SceneManager[_0x129310(0x1f2)][_0x129310(0x24e)];_0x1e7848&&_0x1e7848[_0x129310(0x1f3)](this);},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x256)]=Game_Actor[_0x5efba2(0x1e2)][_0x5efba2(0x236)],Game_Actor['prototype'][_0x5efba2(0x236)]=function(){const _0x43b7c4=_0x5efba2;if($gameTemp[_0x43b7c4(0x22e)])return;if(this['_autoSkillTrigger_otbProcessActionCheck'])return;const _0x24fb72=this[_0x43b7c4(0x1c9)],_0x56fe00=_0x24fb72['filter'](_0x2c3435=>_0x2c3435[_0x43b7c4(0x23c)]());VisuMZ['AutoSkillTriggers']['Game_Actor_makeActions'][_0x43b7c4(0x27a)](this);let _0x2d3c7a=0x0;for(const _0x2e09f2 of _0x56fe00){if(this[_0x43b7c4(0x1c9)][_0x2d3c7a])this[_0x43b7c4(0x1c9)][_0x2d3c7a]=_0x2e09f2;else break;_0x2d3c7a++;}},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x2a3)]=Game_Enemy[_0x5efba2(0x1e2)][_0x5efba2(0x236)],Game_Enemy[_0x5efba2(0x1e2)][_0x5efba2(0x236)]=function(){const _0x5ad6db=_0x5efba2;if($gameTemp[_0x5ad6db(0x22e)])return;VisuMZ[_0x5ad6db(0x27b)][_0x5ad6db(0x2a3)]['call'](this);},Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x207)]=function(_0x33c98e){const _0x52778d=_0x5efba2;if(!BattleManager['isAutoSkillTriggerCompatible']())return;!this['_savedAutoSkillTriggerActions']&&(this[_0x52778d(0x261)]=this[_0x52778d(0x1c9)]['clone']());this['forceAction'](_0x33c98e,-0x2);if(!this[_0x52778d(0x1c9)])return;const _0x20b07b=this[_0x52778d(0x1c9)][this[_0x52778d(0x1c9)]['length']-0x1];_0x20b07b[_0x52778d(0x1cc)](!![]);},Game_Battler[_0x5efba2(0x1e2)]['returnSavedAutoSkillTriggerActions']=function(){const _0x7b20b=_0x5efba2;if(!BattleManager['isAutoSkillTriggerCompatible']())return;if(!this[_0x7b20b(0x261)])return;if(this[_0x7b20b(0x1c9)][_0x7b20b(0x1f1)]>0x0)return;this[_0x7b20b(0x1c9)]=this[_0x7b20b(0x261)],this[_0x7b20b(0x261)]=undefined;},VisuMZ['AutoSkillTriggers']['Game_Battler_onBattleEnd']=Game_Battler[_0x5efba2(0x1e2)]['onBattleEnd'],Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x27f)]=function(){const _0x1c241e=_0x5efba2;this[_0x1c241e(0x261)]=undefined,VisuMZ[_0x1c241e(0x27b)][_0x1c241e(0x287)][_0x1c241e(0x27a)](this);},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x21a)]=Game_Battler['prototype'][_0x5efba2(0x2a6)],Game_Battler['prototype'][_0x5efba2(0x2a6)]=function(){const _0x59567b=_0x5efba2;if(this['_autoSkillTriggerBypassTpbClear']){this['_autoSkillTriggerBypassTpbClear']=undefined;return;}VisuMZ['AutoSkillTriggers']['Game_Battler_clearTpbChargeTime'][_0x59567b(0x27a)](this);},VisuMZ[_0x5efba2(0x27b)]['Game_Battler_onBattleStart']=Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x282)],Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x282)]=function(_0xaae5d8){const _0x1e663b=_0x5efba2;this[_0x1e663b(0x261)]=undefined,$gameParty[_0x1e663b(0x204)]=!![],VisuMZ[_0x1e663b(0x27b)]['Game_Battler_onBattleStart'][_0x1e663b(0x27a)](this,_0xaae5d8),this[_0x1e663b(0x223)]=-0x1,this[_0x1e663b(0x235)]=0x0;if(Imported[_0x1e663b(0x27e)]&&BattleManager[_0x1e663b(0x212)]())return;this['processAutoSkillTrigger'](_0x1e663b(0x282)),this[_0x1e663b(0x1f0)]();},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x241)]=BattleManager[_0x5efba2(0x1e7)],BattleManager[_0x5efba2(0x1e7)]=function(){const _0x278a4f=_0x5efba2;VisuMZ[_0x278a4f(0x27b)]['BattleManager_startTurn'][_0x278a4f(0x27a)](this);if(Imported[_0x278a4f(0x27e)]&&BattleManager[_0x278a4f(0x212)]()&&$gameTroop[_0x278a4f(0x23a)]()===0x1)for(const _0x576142 of this[_0x278a4f(0x2a1)]()){_0x576142&&(_0x576142[_0x278a4f(0x28f)](_0x278a4f(0x282)),_0x576142['clearDeathAutoSkillTrigger']());}},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x275)]=Game_BattlerBase[_0x5efba2(0x1e2)][_0x5efba2(0x240)],Game_BattlerBase[_0x5efba2(0x1e2)]['revive']=function(){const _0x4db795=_0x5efba2;VisuMZ[_0x4db795(0x27b)][_0x4db795(0x275)][_0x4db795(0x27a)](this),this[_0x4db795(0x1f0)]();},Game_Battler['prototype'][_0x5efba2(0x1f0)]=function(){const _0x9f1cc7=_0x5efba2;this[_0x9f1cc7(0x1d1)]=![],this[_0x9f1cc7(0x1fa)]=![];},Game_Battler['prototype'][_0x5efba2(0x27d)]=function(){const _0x4f0881=_0x5efba2;if(!this['canMove']())return;if(!SceneManager[_0x4f0881(0x251)]())return;this[_0x4f0881(0x1d1)]=!![],this[_0x4f0881(0x28f)](_0x4f0881(0x22c));};const _Game_Battler_onAllActionsEnd_=Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x22a)];Game_Battler['prototype'][_0x5efba2(0x22a)]=function(){const _0x5cffa0=_0x5efba2;_Game_Battler_onAllActionsEnd_[_0x5cffa0(0x27a)](this),this[_0x5cffa0(0x1de)]();},Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x1de)]=function(){const _0x15037c=_0x5efba2;if(!this['_deathAutoSkillTriggerActive'])return;if(this[_0x15037c(0x1fa)])return;const _0x4a581f=BattleManager[_0x15037c(0x25a)];for(const _0x1aa6f3 of _0x4a581f){if(!_0x1aa6f3)continue;if(_0x1aa6f3[0x0]===this)return;}this['_deathAutoSkillTriggerActive']=![],this['_deathAutoSkillTriggerPerformed']=!![],this['refresh']();if(this[_0x15037c(0x228)]())this[_0x15037c(0x1f0)]();},VisuMZ[_0x5efba2(0x27b)]['Game_Battler_otbProcessActionCheck']=Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x29f)],Game_Battler[_0x5efba2(0x1e2)][_0x5efba2(0x29f)]=function(_0x3d2c98,_0x446d9e){const _0x4a9269=_0x5efba2;this[_0x4a9269(0x202)]=!![],VisuMZ[_0x4a9269(0x27b)]['Game_Battler_otbProcessActionCheck'][_0x4a9269(0x27a)](this,_0x3d2c98,_0x446d9e),this[_0x4a9269(0x202)]=![];},Game_Battler['prototype'][_0x5efba2(0x28b)]=function(){const _0x685b5f=_0x5efba2;let _0x385abb=Game_Action[_0x685b5f(0x1d8)];return BattleManager[_0x685b5f(0x26d)]()&&(_0x385abb=Game_Action[_0x685b5f(0x238)]),_0x385abb<=0x0&&(BattleManager[_0x685b5f(0x26d)]()?_0x385abb=0x5:_0x385abb=0xa),this[_0x685b5f(0x223)]!==this[_0x685b5f(0x23a)]()?(this['_lastAutoTriggerTurn']=this[_0x685b5f(0x23a)](),this[_0x685b5f(0x235)]=0x0,!![]):this[_0x685b5f(0x235)]<_0x385abb;},VisuMZ[_0x5efba2(0x27b)][_0x5efba2(0x266)]=Game_Unit['prototype'][_0x5efba2(0x282)],Game_Unit[_0x5efba2(0x1e2)][_0x5efba2(0x282)]=function(_0x429eb9){const _0x5e207e=_0x5efba2;VisuMZ[_0x5e207e(0x27b)][_0x5e207e(0x266)][_0x5e207e(0x27a)](this,_0x429eb9);if(this[_0x5e207e(0x1c7)]===Game_Party)this[_0x5e207e(0x252)]=![];},Game_Unit[_0x5efba2(0x1e2)][_0x5efba2(0x286)]=function(_0x573659,_0x7e186){const _0x3548e7=_0x5efba2;_0x7e186=_0x7e186||null;const _0xf9e430=this[_0x3548e7(0x22d)]()[_0x3548e7(0x284)](_0x28c332=>_0x28c332!==_0x7e186);for(const _0x45f9c4 of _0xf9e430){if(!_0x45f9c4)continue;_0x45f9c4[_0x3548e7(0x28f)](_0x573659);}},Game_Party['prototype'][_0x5efba2(0x23d)]=function(){const _0x122ecf=_0x5efba2;if(this[_0x122ecf(0x252)])return;this['_onBattleWinAutoSkillTriggerOn']=!![],this[_0x122ecf(0x286)](_0x122ecf(0x209));};function _0x12be(_0x32e751,_0x422976){const _0x437983=_0x4379();return _0x12be=function(_0x12be3d,_0x4f987c){_0x12be3d=_0x12be3d-0x1c1;let _0x164a40=_0x437983[_0x12be3d];return _0x164a40;},_0x12be(_0x32e751,_0x422976);}Imported[_0x5efba2(0x27e)]&&(Window_OTB_TurnOrder[_0x5efba2(0x1e2)][_0x5efba2(0x1f3)]=function(_0x3e78fd){const _0x19a6a9=_0x5efba2;let _0x4930f4=null;for(const _0x13e1dc of this[_0x19a6a9(0x249)]){if(!_0x13e1dc)continue;if(_0x13e1dc[_0x19a6a9(0x1ce)]()!==_0x3e78fd)continue;_0x4930f4=_0x13e1dc,_0x13e1dc['_instance']=_0x13e1dc[_0x19a6a9(0x21c)]||0x0,_0x13e1dc['_instance']++;}_0x4930f4['_instance']=0x0,_0x4930f4[_0x19a6a9(0x211)]=0x258,_0x4930f4['x']=this[_0x19a6a9(0x20d)],this['_currentTurn'][_0x19a6a9(0x200)](this[_0x19a6a9(0x249)][_0x19a6a9(0x257)]()),this[_0x19a6a9(0x20b)]();});;