//=============================================================================
// VisuStella MZ - Battle System - BTB - Brave Turn Battle
// VisuMZ_2_BattleSystemBTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemBTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemBTB = VisuMZ.BattleSystemBTB || {};
VisuMZ.BattleSystemBTB.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [BattleSystemBTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_BTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Brave Turn Battle (BTB) system plays off RPG Maker MZ's default battle
 * system with a twist of allowing actors (and enemies) to use up actions from
 * the future or save up for later. These actions will be queued and delivered
 * all in one go! Any borrowed actions from the future will result in following
 * turns without any actions to use. Should a player decide to save up their
 * actions instead through Guarding, they can charge actions with less
 * repercussions. Players will have to be brave about how to go about the
 * battle system strategically.
 * 
 * Because multiple actions can be queued up all at once, they can result in
 * the creation of an action fusion. Some skills (and items) can appear instead
 * of the originally queued actions to result in stronger, better, and more
 * awesome effects, all of which, can be defined by the game dev.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "btb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Puts a twist on the Default Turn Battle system by allowing brave players
 *   to borrow actions from the future turns or save them up for later turns.
 * * Brave Points, a new currency, are added to mark how many saved turns there
 *   are for each battler.
 * * Certain actions can cost more Brave Points than others.
 * * Effects that allow battlers to alter the Brave Points of their targets.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Action fusion system which takes any of the queued up skills and/or items
 *   to bring forth new ones.
 * * Action fusion combinations can be either flexible or strict.
 * * Flexible action fusion combinations can have their actions queued up in
 *   any order to bring forth the result.
 * * Strict action fusion combinations must require their actions to be queued
 *   up in a specific order in order to bring forth the result.
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
 * * VisuMZ_1_ItemsEquipsCore
 * * VisuMZ_1_SkillsStatesCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Brave Points and the Brave Command
 * 
 * Abbreviated to "BP", Brave Points are a new currency available through the
 * Brave Turn Battle system. Battlers require at least 0 BP in order to perform
 * any actions for that turn. By default, each action consumes 1 BP. At the end
 * of each turn, each battler regenerates 1 BP. With the normal flow of battle,
 * this results in a net balance.
 * 
 * However, the player can activate the "Brave Command" located right above the
 * Guard Command. This lets the battler create an extra action to perform. When
 * used, the flow of battle will result in a negative net of BP. When BP is at
 * -1 or under, that battler's turn is skipped until it raises back to 0. This
 * effectively means that the "Brave Command" will borrow actions from future
 * turns.
 * 
 * The Guard Command, however will never consume any BP for its actions even if
 * replaced as it is always determined by the battler's current guard skill.
 * This means that when used, the Guard Command lets a battler save up BP for
 * future turns, allowing BP to go net positive for the turn.
 * 
 * By strategically deciding when to borrow actions or save up for them, whole
 * new strategies can be created for battle.
 * 
 * The game dev has control over how many max actions can be borrowed at once,
 * the maximum and minimum amounts for BP to go to, how much BP will cost at
 * default, and how much BP can be regenerated by default. These settings can
 * all be made within the Plugin Parameters.
 * 
 * ---
 *
 * Action Times +
 * 
 * While the Brave Turn Battle system is active, the "Action Times +" trait
 * is disabled. This is to prevent any conflicts with the Brave system. If the
 * Brave Turn Battle system is disabled during the course of the game, then the
 * "Action Times +" will resume working like normal.
 *
 * ---
 * 
 * Can Input
 * 
 * As mentioned in the "Brave Points and the Brave Command" above, if BP is
 * under 0, then that battler cannot input or act for that turn. The battler
 * would have to wait for BP regenerate back up to 0 first.
 * 
 * ---
 * 
 * Can Guard
 * 
 * The Guard action is only enabled when there's one action to use for that
 * turn. This means that if the "Brave Command" is used to generate new actions
 * to perform during that turn, the Guard Command will be disabled. It can be
 * enabled once again if the player cancels out the Brave Command until the
 * action count reaches 1.
 * 
 * ---
 * 
 * Enemy Brave Actions
 * 
 * Enemies can also use the "Brave Command" by faking it. By making a dummy
 * skill with the <BTB Multiple Actions: id, id, id, id> skill notetag or the
 * <BTB Multiple Actions: name, name, name, name> skill notetag, you can have
 * the enemy perform the exact skills you want in a multi-action queue.
 * 
 * Enemies that use this will also suffer from heavy BP expenditure and wait on
 * subsequent turns until they have enough BP to perform actions again.
 * 
 * This is also how you can have enemies perform Action Fusions. For the queued
 * skills, load up the Action Fusion's skill combination you want for the enemy
 * to perform.
 * 
 * ---
 *
 * ============================================================================
 * Action Fusions
 * ============================================================================
 *
 * This feature deserves its own section as it's quite indepth with how it
 * works. Action Fusions can be performed by either the actor and/or enemy
 * (though this can be disabled in the Plugin Parameters or through traits).
 * In order for them to occur, the queued up action list must have a certain
 * combination of skills/items for the Action Fusion to occur.
 *
 * ---
 * 
 * Fusion Types
 * 
 * There are two types of Action Fusions: Flexible and Strict. Flexible Action
 * Fusions can use a combination of skills/items in any order (thus flexible),
 * while Strict Action Fusions must have their skill/item combinations queued
 * up in the exact order they're listed (thus strict).
 * 
 * They all share the following properties:
 * 
 * Skill Action Fusions can only use skills for combinations. This means that
 * Action Fusions made as a skill database object cannot have item requirements
 * for the combinations.
 * 
 * Item Action Fusions can only use items for combinations. This means that
 * Action Fusions made as an item database object cannot have skills for the
 * combination requirements.
 * 
 * Skills and items that have selectable targets need to have matching targets
 * to be a part of the same Action Fusion combination. For example, if "Quad
 * Attack" requires "Attack", "Attack", "Attack", "Attack", then the player
 * would have to target the same enemy for each of the "Attack" actions. This
 * is to prevent the cases where the player wants to spread out the damage
 * evenly across various enemies without forming it into a single target "Quad
 * Attack" against one.
 * 
 * Skills and items that do not have selectable targets are combination targets
 * for any and all candidates. This means an area of effect "Flame" spell can
 * combine with any target selectable or otherwise skill.
 * 
 * When an Action Fusion is performed, it will not consume the resources for
 * the database object itself, but instead, from each of the skills/items used
 * to bring it out. This means the skill costs of the Action Fusion itself are
 * irrelevant, but the skill costs of the combinations do matter and will be
 * consumed instead. The same applies to items.
 * 
 * If the Action Fusion skill/item is used directly, its resource consumption
 * will be performed as if it was not an Action Fusion skill/item. The "Quad
 * Attack" skill will use its regular MP and TP costs while the "Double Elixir"
 * item will consume itself.
 * 
 * If a queue could potentially meet the demands of multiple Action Fusions,
 * then the Action Fusion with the highest database ID will be given priority,
 * as to make it less complicated. This means if the "Double Attack" Action
 * Fusion and "Triple Attack" Action Fusion were to occur at the same time,
 * if the "Triple Attack" skill has a higher ID than "Double Attack", then
 * "Triple Attack" will take priority instead.
 * 
 * The battler must be able to pay the actions of each of the queued actions
 * used to form the Action Fusion. This means if a battler would run out of MP
 * or items for the cost, it will just simply not occur.
 * 
 * An Action Fusion can have multiple combinations that create it as long as
 * there are multiple notetags that determine the Action Fusion. As an example,
 * the "Flame Strike" can occur with the "Attack" and "Flame" combination or
 * the "Strike" and "Flame" combination.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Examples:
 * 
 *   ---
 * 
 *   Fire Strike
 * 
 *   <BTB Flexible Fusion: Attack, Fire>
 * 
 *   This Action Fusion will occur if a battler has the "Attack" and "Fire"
 *   actions queued up in any order. "Attack" can come before "Fire" or "Fire"
 *   can come before "Attack" and it would still call upon "Fire Strike".
 * 
 *   ---
 * 
 *   Flame Strike
 * 
 *   <BTB Flexible Fusion: Attack, Flame>
 *   <BTB Flexible Fusion: Strike, Flame>
 * 
 *   This Action Fusion will occur if a battler has "Attack" and "Flame",
 *   "Flame" and "Attack", "Strike" and "Flame", or "Flame" and "Strike" in its
 *   action queue.
 * 
 *   ---
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 * 
 * Example:
 * 
 *   ---
 * 
 *   Shadow Flare Blade
 * 
 *   <BTB Strict Fusion: Shade II, Fire II, Attack>
 * 
 *   The battler must queue up "Shade II", "Fire II", and "Attack" in that
 *   exact order or else "Shadow Flare Blade" will not occur. Even if the
 *   battler changed the order to "Fire II", "Shade II", and "Attack", the
 *   Action Fusion will not occur.
 * 
 *   ---
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
 * VisuMZ_3_BoostAction
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
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General BTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <BTB Help>
 *  description
 *  description
 * </BTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under BTB.
 * - This is primarily used if the skill behaves differently in BTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to BTB.
 *
 * ---
 *
 * <BTB Cannot Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command disabled.
 *
 * ---
 *
 * <BTB Hide Brave>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   that battler cannot use Brave to generate more actions.
 * - For actors, this will come with the Brave Command hidden along with their
 *   BP values.
 *
 * ---
 * 
 * === BTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the BTB Turn Order Display
 * 
 * ---
 *
 * <BTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <BTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <BTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Brave Points Cost-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB BP Cost: x>
 *
 * - Used for: Skill, Item Notetags
 * - Determines how much BP the battler uses when performing this action.
 * - Replace 'x' with a number value to determine its BP cost.
 *
 * ---
 *
 * <BTB Hide BP Cost>
 *
 * - Used for: Skill, Item Notetags
 * - Prevents the BP cost from being shown for this action.
 *
 * ---
 * 
 * === Brave Point Manipulation-Related Notetags ===
 * 
 * The following notetags are used to manage Brave Point (BP) costs, how some
 * actions can alter other BP values, and more.
 * 
 * ---
 *
 * <BTB User Set BP: x>
 * <BTB Target Set BP: x>
 *
 * - Used for: Skill, Item Notetags
 * - Sets the user/target's current BP to a specific value.
 * - Replace 'x' with a number value to determine how much you want the user
 *   or target's BP to be set to.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 *
 * <BTB User Gain BP: +x>
 * <BTB Target Gain BP: +x>
 *
 * <BTB User Lose BP: -x>
 * <BTB Target Lose BP: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to alter how much BP the user/target has.
 * - Replace 'x' with a number value to determine how much BP is gained/lost
 *   for the user/target.
 * - The 'user' variant only affects the action's user.
 * - The 'target' variant only affects the action's target.
 *
 * ---
 * 
 * === JavaScript Notetags: Brave Point Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over Brave Point alteration.
 * 
 * ---
 *
 * <JS BTB User BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB User BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the user's final
 *   BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the user's BP.
 *   This value also starts off as the user's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 *
 * <JS BTB Target BP>
 *  code
 *  code
 *  value = code;
 * </JS BTB Target BP>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine what is the current
 *   target's final BP value after all of the code is ran.
 * - The 'value' variable is the returned value to be set as the target's BP.
 *   This value also starts off as the target's current BP.
 * - The 'user' variable refers to the action's user.
 * - The 'target' variable refers to the action's current target.
 * 
 * ---
 * 
 * === Brave Point Managment-Related Notetags ===
 * 
 * The following notetags are used to for battlers to manage their BP settings
 * throughout the course of the fight.
 * 
 * ---
 *
 * <BTB Initial BP: +x>
 * <BTB Initial BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter that battler's initial BP at the start of battle.
 * - Replace 'x' with a number value representing how much you want to alter
 *   the affected battler's initial BP at the start of battle.
 *
 * ---
 *
 * <BTB BP Regen: +x>
 * <BTB BP Degen: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   alter the amount of BP regenerated at the end of each battle turn.
 * - Replace 'x' with a number value representing how much BP is regenerated
 *   (or decreased). 
 *   - Use a positive number for gaining BP at the end of each turn.
 *   - Use a negative number for losing BP at the end of each turn.
 *
 * ---
 *
 * <BTB Maximum BP: +x>
 * <BTB Maximum BP: -x>
 *
 * <BTB Minimum BP: +x>
 * <BTB Minimum BP: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase or decrease the maximum/minimum BP that battler can have by 'x'.
 * - Replace 'x' with a number value representing the amount to change the
 *   battler's maximum/minimum BP by.
 * - These numbers cannot exceed or go under the designated amounts set by the
 *   hard cap in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * === Multiple Action-Related Notetags ===
 * 
 * These notetags allow you to determine how multiple actions are handled
 * through the Brave Turn Battle system.
 * 
 * ---
 *
 * <BTB Maximum Actions: +x>
 * <BTB Maximum Actions: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object with one of these notetags,
 *   increase/decrease the maximum number of actions that battler can have
 *   through the Brave Command.
 * - Replace 'x' with a number value representing the amount of maximum actions
 *   to increase/decrease by.
 * - This value cannot make a battler go below 1 maximum action.
 * - This value cannot make a battler go above the hard cap set in this
 *   plugin's Plugin Parameters.
 *
 * ---
 *
 * <BTB Multiple Actions: id, id>
 * <BTB Multiple Actions: id, id, id>
 * <BTB Multiple Actions: id, id, id, id>
 *
 * <BTB Multiple Actions: name, name>
 * <BTB Multiple Actions: name, name, name>
 * <BTB Multiple Actions: name, name, name, name>
 *
 * - Used for: Skill Notetags
 * - When an enemy (NOT ACTOR) uses this skill, the game will appear as if the
 *   enemy is using the Brave Command to load up multiple actions at a time.
 * - Replace 'id' with the database ID of the skill to use in the multiple
 *   action queue.
 * - Replace 'name' with the name of the skill to use in the enemy's multiple
 *   action queue.
 * 
 * ---
 * 
 * === Action Fusion-Related Notetags ===
 * 
 * For more details, please refer to the Action Fusion dedicated section listed
 * earlier in the documentation.
 * 
 * ---
 *
 * Flexible Action Fusion
 *
 * <BTB Flexible Fusion: id, id>
 * <BTB Flexible Fusion: id, id, id>
 * <BTB Flexible Fusion: id, id, id, id>
 *
 * <BTB Flexible Fusion: name, name>
 * <BTB Flexible Fusion: name, name, name>
 * <BTB Flexible Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as any of the listed
 *   combination skills/items are queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 * 
 * Strict Action Fusion
 *
 * <BTB Strict Fusion: id, id>
 * <BTB Strict Fusion: id, id, id>
 * <BTB Strict Fusion: id, id, id, id>
 *
 * <BTB Strict Fusion: name, name>
 * <BTB Strict Fusion: name, name, name>
 * <BTB Strict Fusion: name, name, name, name>
 *
 * - Used for: Skill, Item Notetags
 * - This Action Fusion skill/item will occur as long as the exact listed
 *   combination(s) of skills/items is queued in the action list for that turn.
 *   These actions can be queued in any order.
 * - Replace 'id' with the database ID of the skill/item to use as a
 *   combination requirement.
 * - Replace 'name' with the name of the skill/item to use as a combination
 *   requirement.
 * - Skill Action Fusions can only use skills for combinations.
 * - Item Action Fusions can only use items for combinations.
 * - Skills and items that have selectable targets need to have matching
 *   targets to be a part of the same Action Fusion combination.
 * - Skills and items that do not have selectable targets are combination
 *   targets for any and all candidates.
 * - When an Action Fusion is performed, it will not consume the resources for
 *   the database object itself, but instead, from each of the skills/items
 *   used to bring it out.
 * - Is used directly, this action's resource consumption will be performed as
 *   if it was not an Action Fusion skill/item.
 * - If a queue could potentially meet the demands of multiple Action Fusions,
 *   then the Action Fusion with the highest database ID is given priority.
 * - The battler must be able to pay the actions of each of the queued actions
 *   used to form the Action Fusion.
 * - Insert multiple copies of this notetag to give this Action Fusion more
 *   combinations that can activate it.
 *
 * ---
 *
 * <BTB Cannot Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler cannot perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
 *
 * ---
 *
 * <BTB Enable Fusion>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a battler is affected by a trait object that has this notetag, that
 *   battler is allowed to perform any Action Fusions. Queued skills will occur
 *   normally instead.
 * - If the actor is affected by both notetags for <BTB Cannot Fusion> and
 *   <BTB Enable Fusion> priority will be given based on the order of their
 *   trait objects.
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
 * Actor: Change BTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change BTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change BTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change BTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear BTB Turn Order Graphic
 * - Clears the BTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: BTB Turn Order Visibility
 * - Determine the visibility of the BTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the BTB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings regarding Battle System BTB. These range from how Brave
 * Points (BP) appear in-game to how their costs are displayed.
 *
 * ---
 *
 * Brave Points
 * 
 *   Full Name:
 *   - What is the full name of "Brave Points" in your game?
 * 
 *   Abbreviation:
 *   - What is the abbreviation of "Brave Points" in your game?
 * 
 *   Icon:
 *   - What icon do you wish to use to represent Brave Points?
 * 
 *   Cost Format:
 *   - How are Brave Point costs displayed?
 *   - %1 - Cost, %2 - BP Text, %3 - Icon
 *
 * ---
 *
 * Displayed Costs
 * 
 *   Cost Position Front?:
 *   - Put the BP Cost at the front of skill/item costs?
 * 
 *   Show Cost: Attack:
 *   - Show the BP cost for the Attack command?
 * 
 *   Show Cost: Guard:
 *   - Show the BP cost for the Guard command?
 * 
 *   Reduce Shown BP Cost:
 *   - Reduce shown BP costs by this much.
 *   - Used to match traditional games.
 * 
 *   Show Cost: 0 BP:
 *   - Show the BP cost when the cost is 0 BP?
 *   - Shown BP Cost reduction is applied.
 * 
 *   Show Cost: 1 BP:
 *   - Show the BP cost when the cost is 1 BP?
 *   - Shown BP Cost reduction is applied.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Adjust the mechanics settings for the Battle System BTB. Mechanics range
 * from how speed is handled to Brave action caps, how Brave Points are
 * managed, and Action Fusions.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Brave Action Max
 * 
 *   Default:
 *   - What is the default number of max actions a battler can have from the
 *     Brave system?
 * 
 *   Hard Cap:
 *   - What is the absolute highest for maximum actions a battler can have
 *     from the Brave system?
 *
 * ---
 *
 * Brave Points > Limits
 * 
 *   Default Maximum:
 *   - What is the default maximum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Default Minimum:
 *   - What is the default minimum number of Brave Points a battler can have at
 *     a time?
 * 
 *   Hard Cap Maximum:
 *   - What is the absolute maximum number of Brave Points a battler can have
 *     at a time?
 * 
 *   Hard Cap Minimum:
 *   - What is the absolute minimum number of Brave Points a battler can have
 *     at a time?
 *
 * ---
 *
 * Brave Points > Costs
 * 
 *   Default Skill Cost:
 *   - How many Brave Points does a skill cost by default?
 * 
 *   Default Item Cost:
 *   - How many Brave Points does an item cost by default?
 * 
 *   Predicted Cost:
 *   - What is considered predicted cost?
 *
 * ---
 *
 * Brave Points > Start Battle
 * 
 *   Neutral:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     neutral?
 * 
 *   Favored:
 *   - How many Brave Points should a battler have if the battle advantage is
 *     favored?
 *
 * ---
 *
 * Brave Points > Regeneration
 * 
 *   Base Recovery:
 *   - How many Brave Points are regenerated at the end of each turn?
 * 
 *   Needs to be Alive?:
 *   - Do battlers need to be alive to regenerate Brave Points?
 *
 * ---
 *
 * Action Fusions
 * 
 *   Actor Access?:
 *   - Allow actors access to Action Fusions?
 * 
 *   Enemy Access?:
 *   - Allow enemies access to Action Fusions?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Brave Animations Settings
 * ============================================================================
 *
 * Animation when applying/canceling Brave effects.
 *
 * ---
 *
 * On Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Cancel Brave
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Enemy Brave
 * 
 *   Show Activation?:
 *   - Show the enemy activating Brave?
 * 
 *   Wait Frames:
 *   - This is the number of frames to wait between activations.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System BTB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings Settings
 * ============================================================================
 *
 * Settings regarding the windows of the Battle System BTB. These mostly adjust
 * how certain aspects of the Brave Turn Battle system appear in-game.
 *
 * ---
 *
 * Window_ActorCommand
 * 
 *   Command Text:
 *   - What is the text that appears for the Brave command?
 * 
 *   Show Command?:
 *   - Show the Brave command in the Actor Command Window?
 * 
 *   Page Up/Dn Shortcuts?:
 *   - Use Page Up/Down for shortcuts on activating Brave?
 * 
 *   JS: Draw Counters:
 *   - Code used to determine how the action counters are displayed on
 *     the window.
 * 
 *     Action Slot:
 *     - This is the text used to represent a non-selected action slot.
 * 
 *     Current Action:
 *     - This is the text used to represent the current action slot.
 *
 * ---
 *
 * Window_BattleStatus
 * 
 *   Display Format:
 *   - How are actor Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon
 * 
 *   Predict Format:
 *   - How are predicted Brave Point displayed?
 *   - %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 *
 * ---
 *
 * Window_BattleStatus > Text Colors
 * 
 *   Neutral Color:
 *   - Text code color for neutral number values.
 * 
 *   Positive Color:
 *   - Text code color for positive number values.
 * 
 *   Negative Color:
 *   - Text code color for negative number values.
 *
 * ---
 *
 * Window_BattleStatus > Style Settings > Default Style
 *
 * Window_BattleStatus > Style Settings > List Style
 *
 * Window_BattleStatus > Style Settings > XP Style
 *
 * Window_BattleStatus > Style Settings > Portrait Style
 *
 * Window_BattleStatus > Style Settings > Border Style
 *
 * Window_BattleStatus > Style Settings > Alignment Style
 * 
 *   Show Display?:
 *   - Show the actor's BP values in the Battle Status Window?
 * 
 *   Alignment:
 *   - How do you want the actor BP values to be aligned?
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset the actor BP display X/Y by how many pixels?
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
 * Version 1.20: May 18, 2026
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 12, 2025
 * * Bug Fixes!
 * ** Fixed a bug where notetags like <Target: Enemy or Ally> would cause
 *    action fusions to not work properly. Fix made by Arisu.
 * ** Fixed a bug where some special targeting cases were not preserved when
 *    performing action fusions. Fix made by Arisu.
 * 
 * Version 1.18: April 17, 2025
 * * Bug Fixes!
 * ** Fixed a bug where flex fusion combinations did not work properly and
 *    where the strict fusion combinations would draw from flex fusions. Fix
 *    made by Olivia.
 * 
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where for certain battle layouts, the BTB Action Counter on
 *    the actor command window would start off center. Fix made by Olivia.
 * 
 * Version 1.16: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where strict action fusion combinations would not register.
 *    Fix made by Olivia.
 * 
 * Version 1.15: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where action fusions would consume double the amount of items
 *    if the skills were to cost items. Fix made by Olivia.
 * 
 * Version 1.14: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the BTB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.12: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a bug that caused a crash due to removing actors midway in battle.
 *    Fix made by Olivia.
 * 
 * Version 1.11: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.10: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.08: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: May 21, 2021
 * * Bug Fixes!
 * ** Using items and skills outside of battle will no longer have BP
 *    restrictions imposed upon them. Fix made by Olivia.
 * 
 * Version 1.06: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_3_BoostAction plugin.
 * 
 * Version 1.05: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * 
 * Version 1.04: March 5, 2021
 * * Bug Fixes!
 * ** <BTB User Set BP: x>, <BTB User Gain BP: +x>, <BTB User Lose BP: -x>
 *    notetags should no work properly. Fix made by Arisu.
 * 
 * Version 1.03: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.02: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: December 25, 2020
 * * Bug Fixes!
 * ** Brave Point preview in the battle status will now be bound by the
 *    absolute minimum hard card and the maximum soft cap. Fixed by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Yanfly.
 * *** <BTB Enable Fusion>
 *
 * Version 1.00: January 4, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorIcon
 * @text Actor: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderActorFace
 * @text Actor: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the BTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearActorGraphic
 * @text Actor: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyIcon
 * @text Enemy: Change BTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderEnemyFace
 * @text Enemy: Change BTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the BTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear BTB Turn Order Graphic
 * @desc Clears the BTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: BTB Turn Order Visibility
 * @desc Determine the visibility of the BTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the BTB Turn Order Display.
 * @default true
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
 * @param BattleSystemBTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings regarding Battle System BTB.
 * @default {"BravePoints":"","BravePointsFull:str":"Brave Points","BravePointsAbbr:str":"BP","BravePointsIcon:num":"73","BravePointCostFmt:str":"\\FS[22]\\C[4]%1\\C[6]%2\\C[0]","DisplayedCosts":"","CostPosition:eval":"false","ShowCostForAttack:eval":"false","ShowCostForGuard:eval":"false","ReduceShownBPCost:num":"0","Show_0_BP_Cost:eval":"true","Show_1_BP_Cost:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Adjust the mechanics settings for the Battle System BTB.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","ActionMax":"","MaxActionsDefault:num":"4","MaxActionsHardCap:num":"9","BravePoints":"","BravePointsLimits":"","MaxBravePointsDefault:num":"3","MinBravePointsDefault:num":"-4","MaxBravePointsHardCap:num":"9","MinBravePointsHardCap:num":"-9","BravePointsCosts":"","BravePointSkillCost:num":"1","BravePointItemCost:num":"1","BravePointPredictedCost:num":"1","BravePointsStartBattle":"","BravePointStartNeutral:num":"0","BravePointStartFavor:num":"3","BravePointsRegen":"","BravePointRegenBase:num":"1","BravePointsRegenAlive:eval":"true","ActionFusions":"","ActorActionFusions:eval":"true","EnemyActionFusions:eval":"true"}
 *
 * @param BraveAnimation:struct
 * @text Brave Animations
 * @type struct<BraveAnimation>
 * @desc Animation when applying/canceling Brave effects.
 * @default {"OnBrave":"","BraveAnimationID:num":"12","BraveMirror:eval":"false","BraveMute:eval":"false","CancelBrave":"","CancelAnimationID:num":"62","CancelMirror:eval":"false","CancelMute:eval":"false"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System BTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Settings regarding the windows of the Battle System BTB.
 * @default {"Window_ActorCommand":"","CommandName:str":"Brave","ShowCommand:eval":"true","BraveShortcuts:eval":"true","DrawActionCountersJS:func":"\"// Declare Constants\\nconst sprite = arguments[0];\\nconst parentWindow = arguments[1];\\nconst actor = arguments[2];\\n\\n// Set Location\\nsprite.x = Math.round(parentWindow.width / 2);\\nsprite.y = 0;\\nsprite.anchor.x = 0.5\\nsprite.anchor.y = 0.5\\n\\n// Create Text\\nconst textSlot = TextManager.btbActionSlot;\\nconst textCurrent = TextManager.btbActionCurrent;\\nlet text = textSlot.repeat(actor.numActions());\\nconst index = actor._actionInputIndex;\\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\\n\\n// Create and Draw Bitmap\\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\\nbitmap.fontSize = 36;\\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\\nsprite.bitmap = bitmap;\"","ActionSlot:str":"○","ActionCurrent:str":"◉","Window_BattleStatus":"","StatusDisplayFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1","StatusPredictFmt:str":"\\FS[16]\\C[6]%2\\C[0] \\FS[22]%1\\FS[16] → \\FS[22]%4","TextColors":"","NeutralColor:num":"0","PositiveColor:num":"4","NegativeColor:num":"2","Styles":"","DefaultStyle":"","default_display:eval":"true","default_align:str":"right","default_offsetX:num":"16","default_offsetY:num":"0","ListStyle":"","list_display:eval":"true","list_align:str":"left","list_offsetX:num":"-8","list_offsetY:num":"0","XPStyle":"","xp_display:eval":"true","xp_align:str":"right","xp_offsetX:num":"16","xp_offsetY:num":"0","PortraitStyle":"","portrait_display:eval":"true","portrait_align:str":"right","portrait_offsetX:num":"-8","portrait_offsetY:num":"56","BorderStyle":"","border_display:eval":"true","border_align:str":"right","border_offsetX:num":"16","border_offsetY:num":"0"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsFull:str
 * @text Full Name
 * @parent BravePoints
 * @desc What is the full name of "Brave Points" in your game?
 * @default Brave Points
 *
 * @param BravePointsAbbr:str
 * @text Abbreviation
 * @parent BravePoints
 * @desc What is the abbreviation of "Brave Points" in your game?
 * @default BP
 *
 * @param BravePointsIcon:num
 * @text Icon
 * @parent BravePoints
 * @desc What icon do you wish to use to represent Brave Points?
 * @default 73
 *
 * @param BravePointCostFmt:str
 * @text Cost Format
 * @parent BravePoints
 * @desc How are Brave Point costs displayed?
 * %1 - Cost, %2 - BP Text, %3 - Icon
 * @default \FS[22]\C[4]%1\C[6]%2\C[0]
 *
 * @param DisplayedCosts
 * @text Displayed Costs
 *
 * @param CostPosition:eval
 * @text Cost Position Front?
 * @parent DisplayedCosts
 * @type boolean
 * @on Front
 * @off Back
 * @desc Put the BP Cost at the front of skill/item costs?
 * @default false
 *
 * @param ShowCostForAttack:eval
 * @text Show Cost: Attack
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Attack command?
 * @default false
 *
 * @param ShowCostForGuard:eval
 * @text Show Cost: Guard
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost for the Guard command?
 * @default false
 *
 * @param ReduceShownBPCost:num
 * @text Reduce Shown BP Cost
 * @parent DisplayedCosts
 * @type number
 * @desc Reduce shown BP costs by this much.
 * Used to match traditional games.
 * @default 0
 *
 * @param Show_0_BP_Cost:eval
 * @text Show Cost: 0 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 0 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 * @param Show_1_BP_Cost:eval
 * @text Show Cost: 1 BP
 * @parent DisplayedCosts
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the BP cost when the cost is 1 BP?
 * Shown BP Cost reduction is applied.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ActionMax
 * @text Brave Action Max
 *
 * @param MaxActionsDefault:num
 * @text Default
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the default number of max actions a battler can 
 * have from the Brave system?
 * @default 4
 *
 * @param MaxActionsHardCap:num
 * @text Hard Cap
 * @parent ActionMax
 * @type number
 * @min 1
 * @desc What is the absolute highest for maximum actions a battler
 * can have from the Brave system?
 * @default 9
 *
 * @param BravePoints
 * @text Brave Points
 *
 * @param BravePointsLimits
 * @text Limits
 * @parent BravePoints
 *
 * @param MaxBravePointsDefault:num
 * @text Default Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the default maximum number of Brave Points a
 * battler can have at a time?
 * @default 3
 *
 * @param MinBravePointsDefault:num
 * @text Default Minimum
 * @parent BravePointsLimits
 * @desc What is the default minimum number of Brave Points a
 * battler can have at a time?
 * @default -4
 *
 * @param MaxBravePointsHardCap:num
 * @text Hard Cap Maximum
 * @parent BravePointsLimits
 * @type number
 * @min 1
 * @desc What is the absolute maximum number of Brave Points a
 * battler can have at a time?
 * @default 9
 *
 * @param MinBravePointsHardCap:num
 * @text Hard Cap Minimum
 * @parent BravePointsLimits
 * @desc What is the absolute minimum number of Brave Points a
 * battler can have at a time?
 * @default -9
 *
 * @param BravePointsCosts
 * @text Costs
 * @parent BravePoints
 *
 * @param BravePointSkillCost:num
 * @text Default Skill Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does a skill cost by default?
 * @default 1
 *
 * @param BravePointItemCost:num
 * @text Default Item Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc How many Brave Points does an item cost by default?
 * @default 1
 *
 * @param BravePointPredictedCost:num
 * @text Predicted Cost
 * @parent BravePointsCosts
 * @type number
 * @min 0
 * @desc What is considered predicted cost?
 * @default 1
 *
 * @param BravePointsStartBattle
 * @text Start Battle
 * @parent BravePoints
 *
 * @param BravePointStartNeutral:num
 * @text Neutral
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is neutral?
 * @default 0
 *
 * @param BravePointStartFavor:num
 * @text Favored
 * @parent BravePointsStartBattle
 * @desc How many Brave Points should a battler have if the
 * battle advantage is favored?
 * @default 3
 *
 * @param BravePointsRegen
 * @text Regeneration
 * @parent BravePoints
 *
 * @param BravePointRegenBase:num
 * @text Base Recovery
 * @parent BravePointsRegen
 * @type number
 * @min 0
 * @desc How many Brave Points are regenerated at the end
 * of each turn?
 * @default 1
 *
 * @param BravePointsRegenAlive:eval
 * @text Needs to be Alive?
 * @parent BravePointsRegen
 * @type boolean
 * @on Alive
 * @off Can Be Dead
 * @desc Do battlers need to be alive to regenerate Brave Points?
 * @default true
 *
 * @param ActionFusions
 * @text Action Fusions
 *
 * @param ActorActionFusions:eval
 * @text Actor Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow actors access to Action Fusions?
 * @default true
 *
 * @param EnemyActionFusions:eval
 * @text Enemy Access?
 * @parent ActionFusions
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow enemies access to Action Fusions?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * BraveAnimation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BraveAnimation:
 *
 * @param OnBrave
 * @text On Brave
 *
 * @param BraveAnimationID:num
 * @text Animation ID
 * @parent OnBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param BraveMirror:eval
 * @text Mirror Animation
 * @parent OnBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BraveMute:eval
 * @text Mute Animation
 * @parent OnBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param CancelBrave
 * @text Cancel Brave
 *
 * @param CancelAnimationID:num
 * @text Animation ID
 * @parent CancelBrave
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 62
 *
 * @param CancelMirror:eval
 * @text Mirror Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param CancelMute:eval
 * @text Mute Animation
 * @parent CancelBrave
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param EnemyBrave
 * @text Enemy Brave
 *
 * @param ShowEnemyBrave:eval
 * @text Show Activation?
 * @parent EnemyBrave
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy activating Brave?
 * @default true
 *
 * @param WaitFrames:num
 * @text Wait Frames
 * @parent EnemyBrave
 * @type number
 * @desc This is the number of frames to wait between activations.
 * @default 20
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_ActorCommand
 *
 * @param CommandName:str
 * @text Command Text
 * @parent Window_ActorCommand
 * @desc What is the text that appears for the Brave command?
 * @default Brave
 *
 * @param ShowCommand:eval
 * @text Show Command?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Brave command in the Actor Command Window?
 * @default true
 *
 * @param BraveShortcuts:eval
 * @text Page Up/Dn Shortcuts?
 * @parent Window_ActorCommand
 * @type boolean
 * @on Use Shortcuts
 * @off Don't Use
 * @desc Use Page Up/Down for shortcuts on activating Brave?
 * @default true
 *
 * @param DrawActionCountersJS:func
 * @text JS: Draw Counters
 * @parent Window_ActorCommand
 * @type note
 * @desc Code used to determine how the action counters are
 * displayed on the window.
 * @default "// Declare Constants\nconst sprite = arguments[0];\nconst parentWindow = arguments[1];\nconst actor = arguments[2];\n\n// Set Location\nsprite.x = Math.round(parentWindow.width / 2);\nsprite.y = 0;\nsprite.anchor.x = 0.5\nsprite.anchor.y = 0.5\n\n// Create Text\nconst textSlot = TextManager.btbActionSlot;\nconst textCurrent = TextManager.btbActionCurrent;\nlet text = textSlot.repeat(actor.numActions());\nconst index = actor._actionInputIndex;\ntext = text.substring(0, index) + textCurrent + text.substring(index + 1);\n\n// Create and Draw Bitmap\nconst bitmap = new Bitmap(parentWindow.width, parentWindow.lineHeight());\nbitmap.fontSize = 36;\nbitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');\nsprite.bitmap = bitmap;"
 *
 * @param ActionSlot:str
 * @text Action Slot
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent a non-selected action slot.
 * @default ○
 *
 * @param ActionCurrent:str
 * @text Current Action
 * @parent DrawActionCountersJS:func
 * @desc This is the text used to represent the current action slot.
 * @default ◉
 *
 * @param Window_BattleStatus
 *
 * @param StatusDisplayFmt:str
 * @text Display Format
 * @parent Window_BattleStatus
 * @desc How are actor Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1
 *
 * @param StatusPredictFmt:str
 * @text Predict Format
 * @parent Window_BattleStatus
 * @desc How are predicted Brave Point displayed?
 * %1 - Total BP, %2 - BP Text, %3 - Icon, %4 - Predicted
 * @default \FS[16]\C[6]%2\C[0] \FS[22]%1\FS[16] → \FS[22]%4
 *
 * @param TextColors
 * @text Text Colors
 * @parent Window_BattleStatus
 *
 * @param NeutralColor:num
 * @text Neutral Color
 * @parent TextColors
 * @desc Text code color for neutral number values.
 * @default 0
 *
 * @param PositiveColor:num
 * @text Positive Color
 * @parent TextColors
 * @desc Text code color for positive number values.
 * @default 4
 *
 * @param NegativeColor:num
 * @text Negative Color
 * @parent TextColors
 * @desc Text code color for negative number values.
 * @default 2
 *
 * @param Styles
 * @text Style Settings
 * @parent Window_BattleStatus
 *
 * @param DefaultStyle
 * @text Default Style
 * @parent Styles
 *
 * @param default_display:eval
 * @text Show Display?
 * @parent DefaultStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param default_align:str
 * @text Alignment
 * @parent DefaultStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param default_offsetX:num
 * @text Offset X
 * @parent DefaultStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param default_offsetY:num
 * @text Offset Y
 * @parent DefaultStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param ListStyle
 * @text List Style
 * @parent Styles
 *
 * @param list_display:eval
 * @text Show Display?
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param list_align:str
 * @text Alignment
 * @parent ListStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default left
 *
 * @param list_offsetX:num
 * @text Offset X
 * @parent ListStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param list_offsetY:num
 * @text Offset Y
 * @parent ListStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param XPStyle
 * @text XP Style
 * @parent Styles
 *
 * @param xp_display:eval
 * @text Show Display?
 * @parent XPStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param xp_align:str
 * @text Alignment
 * @parent XPStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param xp_offsetX:num
 * @text Offset X
 * @parent XPStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param xp_offsetY:num
 * @text Offset Y
 * @parent XPStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 * @param PortraitStyle
 * @text Portrait Style
 * @parent Styles
 *
 * @param portrait_display:eval
 * @text Show Display?
 * @parent PortraitStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param portrait_align:str
 * @text Alignment
 * @parent PortraitStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param portrait_offsetX:num
 * @text Offset X
 * @parent PortraitStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default -8
 *
 * @param portrait_offsetY:num
 * @text Offset Y
 * @parent PortraitStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 56
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Styles
 *
 * @param border_display:eval
 * @text Show Display?
 * @parent BorderStyle
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor's BP values in the Battle Status Window?
 * @default true
 *
 * @param border_align:str
 * @text Alignment
 * @parent BorderStyle
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc How do you want the actor BP values to be aligned?
 * @default right
 *
 * @param border_offsetX:num
 * @text Offset X
 * @parent BorderStyle
 * @desc Offset the actor BP display X by how many pixels?
 * @default 16
 *
 * @param border_offsetY:num
 * @text Offset Y
 * @parent BorderStyle
 * @desc Offset the actor BP display Y by how many pixels?
 * @default 0
 *
 */
//=============================================================================

const _0x23a158=_0x2aff;function _0x2aff(_0x52a525,_0x5899da){const _0x39a26c=_0x39a2();return _0x2aff=function(_0x2affce,_0x1cc6d1){_0x2affce=_0x2affce-0x155;let _0x8efc61=_0x39a26c[_0x2affce];return _0x8efc61;},_0x2aff(_0x52a525,_0x5899da);}(function(_0x16efe7,_0x3851e1){const _0x2ac067=_0x2aff,_0x8634e7=_0x16efe7();while(!![]){try{const _0x59699e=-parseInt(_0x2ac067(0x21a))/0x1+parseInt(_0x2ac067(0x1a7))/0x2*(parseInt(_0x2ac067(0x393))/0x3)+-parseInt(_0x2ac067(0x33a))/0x4*(parseInt(_0x2ac067(0x185))/0x5)+-parseInt(_0x2ac067(0x2fd))/0x6*(parseInt(_0x2ac067(0x1d5))/0x7)+-parseInt(_0x2ac067(0x16a))/0x8+-parseInt(_0x2ac067(0x308))/0x9*(parseInt(_0x2ac067(0x278))/0xa)+parseInt(_0x2ac067(0x299))/0xb*(parseInt(_0x2ac067(0x3b9))/0xc);if(_0x59699e===_0x3851e1)break;else _0x8634e7['push'](_0x8634e7['shift']());}catch(_0x39a4f0){_0x8634e7['push'](_0x8634e7['shift']());}}}(_0x39a2,0x797c5));var label=_0x23a158(0x287),tier=tier||0x0,dependencies=[_0x23a158(0x180),_0x23a158(0x266),_0x23a158(0x398),_0x23a158(0x388)],pluginData=$plugins[_0x23a158(0x33d)](function(_0x85eeeb){const _0x2fe15b=_0x23a158;return _0x85eeeb[_0x2fe15b(0x32d)]&&_0x85eeeb[_0x2fe15b(0x255)][_0x2fe15b(0x253)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x23a158(0x2bb)]||{},VisuMZ[_0x23a158(0x272)]=function(_0x53d4ee,_0x11f046){const _0x4888dd=_0x23a158;for(const _0x2dbf01 in _0x11f046){if(_0x2dbf01[_0x4888dd(0x1ca)](/(.*):(.*)/i)){const _0x4bab8b=String(RegExp['$1']),_0x5e1f60=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x26ed68,_0x56e458,_0x21f117;switch(_0x5e1f60){case _0x4888dd(0x325):_0x26ed68=_0x11f046[_0x2dbf01]!==''?Number(_0x11f046[_0x2dbf01]):0x0;break;case _0x4888dd(0x2fc):_0x56e458=_0x11f046[_0x2dbf01]!==''?JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01]):[],_0x26ed68=_0x56e458[_0x4888dd(0x176)](_0x35bf1a=>Number(_0x35bf1a));break;case _0x4888dd(0x2f3):_0x26ed68=_0x11f046[_0x2dbf01]!==''?eval(_0x11f046[_0x2dbf01]):null;break;case _0x4888dd(0x1a1):_0x56e458=_0x11f046[_0x2dbf01]!==''?JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01]):[],_0x26ed68=_0x56e458['map'](_0x59edc7=>eval(_0x59edc7));break;case _0x4888dd(0x1bb):_0x26ed68=_0x11f046[_0x2dbf01]!==''?JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01]):'';break;case _0x4888dd(0x295):_0x56e458=_0x11f046[_0x2dbf01]!==''?JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01]):[],_0x26ed68=_0x56e458[_0x4888dd(0x176)](_0x3cd7f9=>JSON[_0x4888dd(0x219)](_0x3cd7f9));break;case _0x4888dd(0x2cf):_0x26ed68=_0x11f046[_0x2dbf01]!==''?new Function(JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01])):new Function(_0x4888dd(0x3c5));break;case _0x4888dd(0x19e):_0x56e458=_0x11f046[_0x2dbf01]!==''?JSON['parse'](_0x11f046[_0x2dbf01]):[],_0x26ed68=_0x56e458['map'](_0xc7f088=>new Function(JSON['parse'](_0xc7f088)));break;case _0x4888dd(0x2da):_0x26ed68=_0x11f046[_0x2dbf01]!==''?String(_0x11f046[_0x2dbf01]):'';break;case _0x4888dd(0x37f):_0x56e458=_0x11f046[_0x2dbf01]!==''?JSON['parse'](_0x11f046[_0x2dbf01]):[],_0x26ed68=_0x56e458['map'](_0x3b59a9=>String(_0x3b59a9));break;case _0x4888dd(0x1af):_0x21f117=_0x11f046[_0x2dbf01]!==''?JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01]):{},_0x26ed68=VisuMZ[_0x4888dd(0x272)]({},_0x21f117);break;case'ARRAYSTRUCT':_0x56e458=_0x11f046[_0x2dbf01]!==''?JSON[_0x4888dd(0x219)](_0x11f046[_0x2dbf01]):[],_0x26ed68=_0x56e458['map'](_0x241985=>VisuMZ[_0x4888dd(0x272)]({},JSON[_0x4888dd(0x219)](_0x241985)));break;default:continue;}_0x53d4ee[_0x4bab8b]=_0x26ed68;}}return _0x53d4ee;},(_0x38ae4f=>{const _0x1cd961=_0x23a158,_0x3f8e0e=_0x38ae4f[_0x1cd961(0x1e7)];for(const _0x2e64c0 of dependencies){if(!Imported[_0x2e64c0]){alert(_0x1cd961(0x1f9)[_0x1cd961(0x1aa)](_0x3f8e0e,_0x2e64c0)),SceneManager[_0x1cd961(0x385)]();break;}}const _0x5c40e0=_0x38ae4f[_0x1cd961(0x255)];if(_0x5c40e0[_0x1cd961(0x1ca)](/\[Version[ ](.*?)\]/i)){const _0x4fb5d4=Number(RegExp['$1']);_0x4fb5d4!==VisuMZ[label][_0x1cd961(0x263)]&&(alert(_0x1cd961(0x305)[_0x1cd961(0x1aa)](_0x3f8e0e,_0x4fb5d4)),SceneManager[_0x1cd961(0x385)]());}if(_0x5c40e0['match'](/\[Tier[ ](\d+)\]/i)){const _0x35dd10=Number(RegExp['$1']);_0x35dd10<tier?(alert(_0x1cd961(0x192)[_0x1cd961(0x1aa)](_0x3f8e0e,_0x35dd10,tier)),SceneManager[_0x1cd961(0x385)]()):tier=Math['max'](_0x35dd10,tier);}VisuMZ[_0x1cd961(0x272)](VisuMZ[label]['Settings'],_0x38ae4f['parameters']);})(pluginData),PluginManager[_0x23a158(0x18e)](pluginData[_0x23a158(0x1e7)],_0x23a158(0x348),_0x481d75=>{const _0x36a4c7=_0x23a158;VisuMZ['ConvertParams'](_0x481d75,_0x481d75);const _0x508266=_0x481d75['Actors'],_0x4febf6=_0x481d75[_0x36a4c7(0x261)];for(const _0x27e6b7 of _0x508266){const _0x50d4ec=$gameActors[_0x36a4c7(0x2eb)](_0x27e6b7);if(!_0x50d4ec)continue;_0x50d4ec['_btbTurnOrderGraphicType']=_0x36a4c7(0x1ec),_0x50d4ec[_0x36a4c7(0x36b)]=_0x4febf6;}}),PluginManager[_0x23a158(0x18e)](pluginData[_0x23a158(0x1e7)],'BtbTurnOrderActorFace',_0x5e9086=>{const _0x2ddb82=_0x23a158;VisuMZ['ConvertParams'](_0x5e9086,_0x5e9086);const _0x31df98=_0x5e9086['Actors'],_0x42f055=_0x5e9086['FaceName'],_0x321a2a=_0x5e9086[_0x2ddb82(0x2ae)];for(const _0x181635 of _0x31df98){const _0x3a3e12=$gameActors[_0x2ddb82(0x2eb)](_0x181635);if(!_0x3a3e12)continue;_0x3a3e12[_0x2ddb82(0x2bc)]=_0x2ddb82(0x2b5),_0x3a3e12[_0x2ddb82(0x157)]=_0x42f055,_0x3a3e12[_0x2ddb82(0x341)]=_0x321a2a;}}),PluginManager['registerCommand'](pluginData['name'],'BtbTurnOrderClearActorGraphic',_0x3a6fbc=>{const _0x5b90c1=_0x23a158;VisuMZ[_0x5b90c1(0x272)](_0x3a6fbc,_0x3a6fbc);const _0x3be5ac=_0x3a6fbc[_0x5b90c1(0x357)];for(const _0x13f786 of _0x3be5ac){const _0x3dbcbf=$gameActors[_0x5b90c1(0x2eb)](_0x13f786);if(!_0x3dbcbf)continue;_0x3dbcbf[_0x5b90c1(0x1e5)]();}}),PluginManager['registerCommand'](pluginData[_0x23a158(0x1e7)],_0x23a158(0x191),_0x2f3edc=>{const _0xd5948b=_0x23a158;VisuMZ[_0xd5948b(0x272)](_0x2f3edc,_0x2f3edc);const _0x2ea9c4=_0x2f3edc['Enemies'],_0x16cf73=_0x2f3edc[_0xd5948b(0x261)];for(const _0x23189c of _0x2ea9c4){const _0x22390d=$gameTroop[_0xd5948b(0x2c0)]()[_0x23189c];if(!_0x22390d)continue;_0x22390d[_0xd5948b(0x2bc)]=_0xd5948b(0x1ec),_0x22390d['_btbTurnOrderIconIndex']=_0x16cf73;}}),PluginManager[_0x23a158(0x18e)](pluginData[_0x23a158(0x1e7)],_0x23a158(0x286),_0x59a9bb=>{const _0xd1088d=_0x23a158;VisuMZ[_0xd1088d(0x272)](_0x59a9bb,_0x59a9bb);const _0x18e9e0=_0x59a9bb[_0xd1088d(0x1c9)],_0x3ed756=_0x59a9bb[_0xd1088d(0x336)],_0x19f8e3=_0x59a9bb[_0xd1088d(0x2ae)];for(const _0x236a97 of _0x18e9e0){const _0x382af8=$gameTroop[_0xd1088d(0x2c0)]()[_0x236a97];if(!_0x382af8)continue;_0x382af8['_btbTurnOrderGraphicType']=_0xd1088d(0x2b5),_0x382af8['_btbTurnOrderFaceName']=_0x3ed756,_0x382af8[_0xd1088d(0x341)]=_0x19f8e3;}}),PluginManager[_0x23a158(0x18e)](pluginData[_0x23a158(0x1e7)],_0x23a158(0x352),_0x36323f=>{const _0x1a657a=_0x23a158;VisuMZ[_0x1a657a(0x272)](_0x36323f,_0x36323f);const _0x4ec594=_0x36323f[_0x1a657a(0x1c9)];for(const _0x489cd5 of _0x4ec594){const _0x307124=$gameTroop['members']()[_0x489cd5];if(!_0x307124)continue;_0x307124[_0x1a657a(0x1e5)]();}}),PluginManager[_0x23a158(0x18e)](pluginData[_0x23a158(0x1e7)],_0x23a158(0x3a4),_0x5555fc=>{const _0x534892=_0x23a158;VisuMZ[_0x534892(0x272)](_0x5555fc,_0x5555fc);const _0x4d2a67=_0x5555fc[_0x534892(0x34d)];$gameSystem[_0x534892(0x270)](_0x4d2a67);}),VisuMZ[_0x23a158(0x287)][_0x23a158(0x237)]={'EnemyMultiAction':/<BTB (?:MULTI|MULTIPLE) (?:ACTION|ACTIONS):[ ](.*)>/i,'BravePointCost':/<BTB (?:BRAVE|BP) COST:[ ](\d+)>/i,'BravePointSetUser':/<BTB USER SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointSetTarget':/<BTB TARGET SET (?:BRAVE|BP):[ ](\d+)>/i,'BravePointAlterUser':/<BTB USER (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointAlterTarget':/<BTB TARGET (?:GAIN|LOSE) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'HideBravePointCost':/<BTB HIDE (?:BRAVE|BP) COST>/i,'BTB_Help':/<BTB HELP>\s*([\s\S]*)\s*<\/BTB HELP>/i,'FusionFlex':/<BTB (?:FLEX|FLEXIBLE) FUSION:[ ](.*)>/gi,'FusionStrict':/<BTB (?:STRICT|EXACT) FUSION:[ ](.*)>/gi,'JsBravePointsUser':/<JS BTB USER (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB USER (?:BRAVE|BP)>/i,'JsBravePointsTarget':/<JS BTB TARGET (?:BRAVE|BP)>\s*([\s\S]*)\s*<\/JS BTB TARGET (?:BRAVE|BP)>/i,'BravePointBattleStart':/<BTB INITIAL (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'BravePointRegen':/<BTB (?:BRAVE|BP) (?:REGEN|DEGEN):[ ]([\+\-]\d+)>/i,'MaxBravePoints':/<BTB (?:MAXIMUM|MAX) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MinBravePoints':/<BTB (?:MINIMUM|MIN) (?:BRAVE|BP):[ ]([\+\-]\d+)>/i,'MaxActions':/<BTB (?:MAXIMUM|MAX) (?:ACTION|ACTIONS):[ ]([\+\-]\d+)>/i,'CannotBrave':/<BTB CANNOT BRAVE>/i,'HideBrave':/<BTB HIDE BRAVE>/i,'CannotFusion':/<BTB CANNOT FUSION>/i,'EnableFusion':/<BTB ENABLE FUSION>/i},VisuMZ[_0x23a158(0x287)][_0x23a158(0x30d)]=Scene_Boot[_0x23a158(0x281)][_0x23a158(0x360)],Scene_Boot['prototype'][_0x23a158(0x360)]=function(){const _0x20b873=_0x23a158;VisuMZ[_0x20b873(0x287)][_0x20b873(0x30d)][_0x20b873(0x15f)](this),this[_0x20b873(0x21e)]();},Scene_Boot[_0x23a158(0x281)][_0x23a158(0x21e)]=function(){const _0x3b85fd=_0x23a158;this[_0x3b85fd(0x171)](),this[_0x3b85fd(0x1a8)]();},Scene_Boot[_0x23a158(0x281)]['process_VisuMZ_BattleSystemBTB_Notetags']=function(){const _0x32d0b9=_0x23a158;if(VisuMZ['ParseAllNotetags'])return;const _0x37f1a2=$dataSkills[_0x32d0b9(0x2a1)]($dataItems);for(const _0x582c06 of _0x37f1a2){if(!_0x582c06)continue;DataManager[_0x32d0b9(0x28a)](_0x582c06);}},VisuMZ[_0x23a158(0x287)]['JS']={},Scene_Boot[_0x23a158(0x281)][_0x23a158(0x1a8)]=function(){const _0x47de73=_0x23a158;if(VisuMZ['ParseAllNotetags'])return;const _0x796059=VisuMZ[_0x47de73(0x287)][_0x47de73(0x237)],_0x47bde0=$dataSkills[_0x47de73(0x2a1)](dataItems);for(const _0x4b4afe of _0x47bde0){if(!_0x4b4afe)continue;VisuMZ[_0x47de73(0x287)][_0x47de73(0x2d0)](_0x4b4afe,_0x47de73(0x3bf)),VisuMZ[_0x47de73(0x287)][_0x47de73(0x2d0)](_0x4b4afe,_0x47de73(0x1b7));}},VisuMZ[_0x23a158(0x287)]['Parse_Notetags_BravePointsUserJS']=function(_0x433579,_0x5cb82b){const _0x419c36=_0x23a158,_0x798b32=VisuMZ[_0x419c36(0x287)]['RegExp'][_0x5cb82b],_0x471bd2=_0x433579[_0x419c36(0x248)];if(_0x471bd2['match'](_0x798b32)){const _0x52fad3=String(RegExp['$1']),_0x4ecf76=_0x419c36(0x27e)['format'](_0x52fad3),_0x27f6f7=VisuMZ[_0x419c36(0x287)]['createKeyJS'](_0x433579,_0x5cb82b);VisuMZ[_0x419c36(0x287)]['JS'][_0x27f6f7]=new Function(_0x4ecf76);}},VisuMZ['BattleSystemBTB'][_0x23a158(0x2c6)]=function(_0x19b6e7,_0x1711c5){const _0x2862f9=_0x23a158;if(VisuMZ['createKeyJS'])return VisuMZ[_0x2862f9(0x2c6)](_0x19b6e7,_0x1711c5);let _0x2d2c63='';if($dataActors[_0x2862f9(0x253)](_0x19b6e7))_0x2d2c63=_0x2862f9(0x1c6)[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);if($dataClasses[_0x2862f9(0x253)](_0x19b6e7))_0x2d2c63=_0x2862f9(0x2ca)[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);if($dataSkills['includes'](_0x19b6e7))_0x2d2c63='Skill-%1-%2'[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);if($dataItems[_0x2862f9(0x253)](_0x19b6e7))_0x2d2c63=_0x2862f9(0x22f)[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);if($dataWeapons[_0x2862f9(0x253)](_0x19b6e7))_0x2d2c63=_0x2862f9(0x167)[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);if($dataArmors['includes'](_0x19b6e7))_0x2d2c63=_0x2862f9(0x1f1)['format'](_0x19b6e7['id'],_0x1711c5);if($dataEnemies[_0x2862f9(0x253)](_0x19b6e7))_0x2d2c63='Enemy-%1-%2'[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);if($dataStates[_0x2862f9(0x253)](_0x19b6e7))_0x2d2c63='State-%1-%2'[_0x2862f9(0x1aa)](_0x19b6e7['id'],_0x1711c5);return _0x2d2c63;},VisuMZ[_0x23a158(0x287)][_0x23a158(0x3c1)]=VisuMZ[_0x23a158(0x3c1)],VisuMZ[_0x23a158(0x3c1)]=function(_0xafa424){const _0x2df97e=_0x23a158;VisuMZ[_0x2df97e(0x287)][_0x2df97e(0x3c1)][_0x2df97e(0x15f)](this,_0xafa424),DataManager[_0x2df97e(0x28a)](_0xafa424),VisuMZ['BattleSystemBTB'][_0x2df97e(0x2d0)](_0xafa424,_0x2df97e(0x3bf)),VisuMZ['BattleSystemBTB'][_0x2df97e(0x2d0)](_0xafa424,'JsBravePointsTarget');},VisuMZ[_0x23a158(0x287)][_0x23a158(0x1d3)]=VisuMZ[_0x23a158(0x1d3)],VisuMZ[_0x23a158(0x1d3)]=function(_0x3b0050){const _0x21773a=_0x23a158;VisuMZ[_0x21773a(0x287)]['ParseItemNotetags'][_0x21773a(0x15f)](this,_0x3b0050),DataManager['btbRegisterFusions'](_0x3b0050),VisuMZ[_0x21773a(0x287)][_0x21773a(0x2d0)](_0x3b0050,_0x21773a(0x3bf)),VisuMZ[_0x21773a(0x287)][_0x21773a(0x2d0)](_0x3b0050,'JsBravePointsTarget');},DataManager[_0x23a158(0x18f)]=function(_0x1fda08){const _0x2e1eb0=_0x23a158;_0x1fda08=_0x1fda08[_0x2e1eb0(0x241)]()[_0x2e1eb0(0x1e9)](),this[_0x2e1eb0(0x1b0)]=this['_skillIDs']||{};if(this[_0x2e1eb0(0x1b0)][_0x1fda08])return this[_0x2e1eb0(0x1b0)][_0x1fda08];for(const _0x2a0f29 of $dataSkills){if(!_0x2a0f29)continue;this[_0x2e1eb0(0x1b0)][_0x2a0f29[_0x2e1eb0(0x1e7)][_0x2e1eb0(0x241)]()[_0x2e1eb0(0x1e9)]()]=_0x2a0f29['id'];}return this['_skillIDs'][_0x1fda08]||0x0;},DataManager[_0x23a158(0x1e1)]=function(_0x12d3dd){const _0x4bf41f=_0x23a158;_0x12d3dd=_0x12d3dd[_0x4bf41f(0x241)]()[_0x4bf41f(0x1e9)](),this['_itemIDs']=this[_0x4bf41f(0x233)]||{};if(this[_0x4bf41f(0x233)][_0x12d3dd])return this[_0x4bf41f(0x233)][_0x12d3dd];for(const _0x9273f6 of $dataItems){if(!_0x9273f6)continue;this[_0x4bf41f(0x233)][_0x9273f6[_0x4bf41f(0x1e7)][_0x4bf41f(0x241)]()[_0x4bf41f(0x1e9)]()]=_0x9273f6['id'];}return this['_itemIDs'][_0x12d3dd]||0x0;},DataManager[_0x23a158(0x273)]={},DataManager[_0x23a158(0x2b2)]={},DataManager['_btbItemFlexFusion']={},DataManager[_0x23a158(0x368)]={},DataManager['btbRegisterFusions']=function(_0x1d28d5){const _0x26f5a1=_0x23a158;if(!_0x1d28d5)return;const _0x1b2a47=VisuMZ[_0x26f5a1(0x287)]['RegExp'],_0x5da9be=_0x1d28d5[_0x26f5a1(0x248)],_0x41efb7=DataManager['isSkill'](_0x1d28d5),_0x141aec=_0x5da9be[_0x26f5a1(0x1ca)](_0x1b2a47['FusionFlex']);if(_0x141aec)for(const _0xbf7605 of _0x141aec){if(!_0xbf7605)continue;_0xbf7605[_0x26f5a1(0x1ca)](_0x1b2a47[_0x26f5a1(0x269)]);const _0x28fab1=String(RegExp['$1'])[_0x26f5a1(0x2f6)](','),_0x5f1b08=this[_0x26f5a1(0x1c7)](_0x28fab1,_0x41efb7)[_0x26f5a1(0x23a)]((_0x31b352,_0x5e7ead)=>_0x31b352-_0x5e7ead);if(_0x5f1b08[_0x26f5a1(0x307)]<=0x1)continue;const _0xe050d=_0x5f1b08['join']('-'),_0x22a160=_0x41efb7?DataManager[_0x26f5a1(0x273)]:DataManager['_btbItemFlexFusion'];_0x22a160[_0xe050d]=_0x1d28d5['id'];}const _0x2a677f=_0x5da9be[_0x26f5a1(0x1ca)](_0x1b2a47[_0x26f5a1(0x1ad)]);if(_0x2a677f)for(const _0x40b52c of _0x2a677f){if(!_0x40b52c)continue;_0x40b52c[_0x26f5a1(0x1ca)](_0x1b2a47[_0x26f5a1(0x1ad)]);const _0x56459f=String(RegExp['$1'])[_0x26f5a1(0x2f6)](','),_0x2f7e28=this[_0x26f5a1(0x1c7)](_0x56459f,_0x41efb7);if(_0x2f7e28['length']<=0x1)continue;const _0x2b7255=_0x2f7e28['join']('-'),_0x10abe1=_0x41efb7?DataManager['_btbSkillStrictFusion']:DataManager['_btbItemStrictFusion'];_0x10abe1[_0x2b7255]=_0x1d28d5['id'];}},DataManager[_0x23a158(0x1c7)]=function(_0x5e600a,_0x1a14db){const _0x5e87dc=_0x23a158,_0x53827d=[];for(let _0x2ade45 of _0x5e600a){_0x2ade45=(String(_0x2ade45)||'')[_0x5e87dc(0x1e9)]();const _0x1e5ea8=/^\d+$/[_0x5e87dc(0x20b)](_0x2ade45);if(_0x1e5ea8)_0x53827d['push'](Number(_0x2ade45));else _0x1a14db?_0x53827d[_0x5e87dc(0x170)](DataManager['getSkillIdWithName'](_0x2ade45)):_0x53827d['push'](DataManager[_0x5e87dc(0x1e1)](_0x2ade45));}return _0x53827d;},ImageManager[_0x23a158(0x37d)]=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x177)][_0x23a158(0x17a)],ImageManager['svActorHorzCells']=ImageManager[_0x23a158(0x265)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x23a158(0x198)]||0x6,TextManager['btbBravePointsFull']=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x177)][_0x23a158(0x387)],TextManager[_0x23a158(0x329)]=VisuMZ[_0x23a158(0x287)]['Settings']['General'][_0x23a158(0x376)],TextManager['btbCostFormat']=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x177)][_0x23a158(0x3ba)],TextManager[_0x23a158(0x17c)]=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x283)][_0x23a158(0x314)],TextManager[_0x23a158(0x1fd)]=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x283)][_0x23a158(0x161)],TextManager['btbActionCurrent']=VisuMZ['BattleSystemBTB'][_0x23a158(0x2bb)][_0x23a158(0x283)]['ActionCurrent'],SceneManager[_0x23a158(0x1b8)]=function(){const _0x1c0fff=_0x23a158;return this[_0x1c0fff(0x2b7)]&&this[_0x1c0fff(0x2b7)][_0x1c0fff(0x2ba)]===Scene_Battle;},VisuMZ[_0x23a158(0x287)][_0x23a158(0x187)]=BattleManager[_0x23a158(0x372)],BattleManager[_0x23a158(0x372)]=function(){const _0x3d59ca=_0x23a158;if(this[_0x3d59ca(0x1ed)]())return _0x3d59ca(0x25d);return VisuMZ[_0x3d59ca(0x287)][_0x3d59ca(0x187)][_0x3d59ca(0x15f)](this);},BattleManager[_0x23a158(0x1ed)]=function(){const _0x5d86f8=_0x23a158;return $gameSystem[_0x5d86f8(0x39b)]()===_0x5d86f8(0x25d);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x3b0)]=BattleManager[_0x23a158(0x2c5)],BattleManager[_0x23a158(0x2c5)]=function(){const _0x8c4190=_0x23a158;if(this['isBTB']())return![];return VisuMZ[_0x8c4190(0x287)][_0x8c4190(0x3b0)]['call'](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x1fe)]=BattleManager[_0x23a158(0x1ac)],BattleManager[_0x23a158(0x1ac)]=function(){const _0x2ce612=_0x23a158;if(this['isBTB']())return![];return VisuMZ['BattleSystemBTB'][_0x2ce612(0x1fe)]['call'](this);},VisuMZ['BattleSystemBTB'][_0x23a158(0x1b4)]=BattleManager[_0x23a158(0x2c8)],BattleManager[_0x23a158(0x2c8)]=function(){const _0x9af201=_0x23a158;if(this['isBTB']())return!![];return VisuMZ[_0x9af201(0x287)][_0x9af201(0x1b4)][_0x9af201(0x15f)](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x15c)]=BattleManager[_0x23a158(0x23e)],BattleManager[_0x23a158(0x23e)]=function(){const _0x164682=_0x23a158;VisuMZ[_0x164682(0x287)][_0x164682(0x15c)][_0x164682(0x15f)](this),this['isBTB']()&&this[_0x164682(0x39f)]()&&!this[_0x164682(0x3a9)]&&$gameParty[_0x164682(0x188)]()&&this[_0x164682(0x2be)]();},VisuMZ[_0x23a158(0x287)]['BattleManager_startTurn']=BattleManager[_0x23a158(0x228)],BattleManager[_0x23a158(0x228)]=function(){const _0x4f1da8=_0x23a158;VisuMZ[_0x4f1da8(0x287)][_0x4f1da8(0x26b)]['call'](this),this['refreshStatusBTB']();},BattleManager[_0x23a158(0x2d6)]=function(){const _0x2d5eb4=_0x23a158;if(!SceneManager['isSceneBattle']())return;if(!this[_0x2d5eb4(0x1ed)]())return;const _0x3cb6c9=SceneManager[_0x2d5eb4(0x2b7)];if(!_0x3cb6c9)return;const _0x6ff58b=_0x3cb6c9[_0x2d5eb4(0x326)];if(!_0x6ff58b)return;_0x6ff58b[_0x2d5eb4(0x186)]();},VisuMZ['BattleSystemBTB'][_0x23a158(0x1a4)]=BattleManager[_0x23a158(0x256)],BattleManager[_0x23a158(0x256)]=function(){const _0x130e63=_0x23a158;VisuMZ['BattleSystemBTB'][_0x130e63(0x1a4)][_0x130e63(0x15f)](this),this['isBTB']()&&(this['_actionBattlers']=this[_0x130e63(0x310)]['filter'](_0x3f995c=>_0x3f995c&&_0x3f995c[_0x130e63(0x1ee)]['length']>0x0),this[_0x130e63(0x3b5)]());},BattleManager[_0x23a158(0x319)]=function(){const _0x423a08=_0x23a158;if(!this[_0x423a08(0x1ed)]())return;if(!SceneManager[_0x423a08(0x1b8)]())return;const _0x417b60=this[_0x423a08(0x310)];for(const _0x2b28b4 of _0x417b60){_0x2b28b4[_0x423a08(0x24f)]();}_0x417b60[_0x423a08(0x23a)]((_0x34fb20,_0x4dfb69)=>_0x4dfb69['speed']()-_0x34fb20[_0x423a08(0x2b8)]()),this[_0x423a08(0x1ed)]()&&this['updateTurnOrderBTB']();},BattleManager[_0x23a158(0x340)]=function(){const _0x590d07=_0x23a158;if(!this[_0x590d07(0x1ed)]())return;this[_0x590d07(0x310)]=this[_0x590d07(0x310)]||[],this[_0x590d07(0x310)]=this['_actionBattlers'][_0x590d07(0x33d)](_0xd81a66=>_0xd81a66&&_0xd81a66[_0x590d07(0x296)]()&&_0xd81a66[_0x590d07(0x2a4)]()),this[_0x590d07(0x3b5)]();},BattleManager[_0x23a158(0x3b5)]=function(_0x133534){const _0xa15c8d=_0x23a158;if(!this['isBTB']())return;const _0x31f282=SceneManager[_0xa15c8d(0x2b7)][_0xa15c8d(0x39a)];if(!_0x31f282)return;_0x31f282[_0xa15c8d(0x31b)](_0x133534);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x354)]=BattleManager[_0x23a158(0x3aa)],BattleManager['startAction']=function(){const _0x50a74e=_0x23a158;BattleManager[_0x50a74e(0x1ed)]()&&this[_0x50a74e(0x160)]&&this[_0x50a74e(0x160)][_0x50a74e(0x30c)](),VisuMZ['BattleSystemBTB'][_0x50a74e(0x354)][_0x50a74e(0x15f)](this);},VisuMZ['BattleSystemBTB'][_0x23a158(0x19d)]=Game_System['prototype'][_0x23a158(0x221)],Game_System[_0x23a158(0x281)][_0x23a158(0x221)]=function(){const _0x1a0b20=_0x23a158;VisuMZ['BattleSystemBTB'][_0x1a0b20(0x19d)][_0x1a0b20(0x15f)](this),this[_0x1a0b20(0x18c)]();},Game_System[_0x23a158(0x281)][_0x23a158(0x18c)]=function(){const _0x5af27e=_0x23a158;this[_0x5af27e(0x3b7)]=!![];},Game_System[_0x23a158(0x281)][_0x23a158(0x1dd)]=function(){const _0x354f92=_0x23a158;return this[_0x354f92(0x3b7)]===undefined&&this[_0x354f92(0x18c)](),this[_0x354f92(0x3b7)];},Game_System[_0x23a158(0x281)][_0x23a158(0x270)]=function(_0x12f63e){const _0x1cbc3f=_0x23a158;this[_0x1cbc3f(0x3b7)]===undefined&&this[_0x1cbc3f(0x18c)](),this[_0x1cbc3f(0x3b7)]=_0x12f63e;},VisuMZ[_0x23a158(0x287)][_0x23a158(0x26d)]=Game_Action[_0x23a158(0x281)]['isValid'],Game_Action[_0x23a158(0x281)][_0x23a158(0x234)]=function(){const _0x3678ac=_0x23a158;if($gameParty[_0x3678ac(0x304)]()&&BattleManager[_0x3678ac(0x1ed)]()){if(this[_0x3678ac(0x1a0)]()===null)return![];}return VisuMZ['BattleSystemBTB'][_0x3678ac(0x26d)][_0x3678ac(0x15f)](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x218)]=Game_Action[_0x23a158(0x281)][_0x23a158(0x34e)],Game_Action[_0x23a158(0x281)]['applyItemUserEffect']=function(_0x29db64){const _0x2459cd=_0x23a158;VisuMZ[_0x2459cd(0x287)]['Game_Action_applyItemUserEffect'][_0x2459cd(0x15f)](this,_0x29db64),this[_0x2459cd(0x231)](_0x29db64);},Game_Action[_0x23a158(0x281)][_0x23a158(0x231)]=function(_0x3244e9){const _0x523690=_0x23a158;if(!BattleManager[_0x523690(0x1ed)]())return;if(this['item']())this[_0x523690(0x259)](_0x3244e9);},Game_Action[_0x23a158(0x281)]['applyItemBattleSystemBTBUserEffect']=function(_0x51e8eb){const _0x499c6a=_0x23a158,_0x5c98ea=VisuMZ['BattleSystemBTB']['RegExp'],_0x3e4cd2=this[_0x499c6a(0x1a0)]()[_0x499c6a(0x248)],_0x38c65c=this[_0x499c6a(0x1a0)]();if(this['subject']()){if(_0x3e4cd2[_0x499c6a(0x1ca)](_0x5c98ea[_0x499c6a(0x213)])){const _0x165681=Number(RegExp['$1']);this[_0x499c6a(0x159)]()[_0x499c6a(0x16d)](_0x165681);}if(_0x3e4cd2['match'](_0x5c98ea[_0x499c6a(0x373)])){const _0x4dd0b9=Number(RegExp['$1']);this[_0x499c6a(0x159)]()[_0x499c6a(0x2a0)](_0x4dd0b9);}const _0x2d9b9b=_0x499c6a(0x3bf),_0xef14db=VisuMZ[_0x499c6a(0x287)]['createKeyJS'](_0x38c65c,_0x2d9b9b);if(VisuMZ[_0x499c6a(0x287)]['JS'][_0xef14db]){const _0x11dd96=VisuMZ['BattleSystemBTB']['JS'][_0xef14db][_0x499c6a(0x15f)](this,this[_0x499c6a(0x159)](),_0x51e8eb,this[_0x499c6a(0x159)]()[_0x499c6a(0x366)]());this[_0x499c6a(0x159)]()[_0x499c6a(0x16d)](_0x11dd96);}}if(_0x51e8eb){if(_0x3e4cd2[_0x499c6a(0x1ca)](_0x5c98ea[_0x499c6a(0x2dd)])){const _0x2f9ab5=Number(RegExp['$1']);_0x51e8eb[_0x499c6a(0x16d)](_0x2f9ab5);}if(_0x3e4cd2[_0x499c6a(0x1ca)](_0x5c98ea[_0x499c6a(0x3c0)])){const _0x2c1033=Number(RegExp['$1']);_0x51e8eb[_0x499c6a(0x2a0)](_0x2c1033);}const _0xedc3a8=_0x499c6a(0x1b7),_0x45ffb1=VisuMZ[_0x499c6a(0x287)][_0x499c6a(0x2c6)](_0x38c65c,_0xedc3a8);if(VisuMZ['BattleSystemBTB']['JS'][_0x45ffb1]){const _0x24e700=VisuMZ[_0x499c6a(0x287)]['JS'][_0x45ffb1][_0x499c6a(0x15f)](this,this['subject'](),_0x51e8eb,_0x51e8eb[_0x499c6a(0x366)]());_0x51e8eb[_0x499c6a(0x16d)](_0x24e700);}}},VisuMZ[_0x23a158(0x287)]['Game_Action_speed']=Game_Action[_0x23a158(0x281)][_0x23a158(0x2b8)],Game_Action[_0x23a158(0x281)][_0x23a158(0x2b8)]=function(){const _0x3a7e6f=_0x23a158;return BattleManager[_0x3a7e6f(0x1ed)]()?VisuMZ[_0x3a7e6f(0x287)][_0x3a7e6f(0x2bb)]['Mechanics'][_0x3a7e6f(0x2c9)][_0x3a7e6f(0x15f)](this):VisuMZ[_0x3a7e6f(0x287)][_0x3a7e6f(0x359)][_0x3a7e6f(0x15f)](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x331)]=Game_Action[_0x23a158(0x281)][_0x23a158(0x155)],Game_Action[_0x23a158(0x281)][_0x23a158(0x155)]=function(){const _0x32ee90=_0x23a158;return BattleManager[_0x32ee90(0x1ed)]()?VisuMZ[_0x32ee90(0x287)]['Settings']['Mechanics']['AllowRandomSpeed']:VisuMZ[_0x32ee90(0x287)][_0x32ee90(0x331)]['call'](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x39d)]=Game_Action[_0x23a158(0x281)][_0x23a158(0x21d)],Game_Action[_0x23a158(0x281)][_0x23a158(0x21d)]=function(_0x3c2206){const _0x3fed3c=_0x23a158;VisuMZ['BattleSystemBTB'][_0x3fed3c(0x39d)][_0x3fed3c(0x15f)](this,_0x3c2206),BattleManager[_0x3fed3c(0x319)]();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x16f)]=Game_Action['prototype'][_0x23a158(0x175)],Game_Action[_0x23a158(0x281)][_0x23a158(0x175)]=function(_0x2354eb){const _0x22b469=_0x23a158;VisuMZ[_0x22b469(0x287)][_0x22b469(0x16f)][_0x22b469(0x15f)](this,_0x2354eb),BattleManager[_0x22b469(0x319)]();},Game_Action[_0x23a158(0x281)][_0x23a158(0x31d)]=function(_0x40662f){const _0xc2e52f=_0x23a158;this[_0xc2e52f(0x227)]=_0x40662f;},Game_Action['prototype'][_0x23a158(0x27d)]=function(){const _0x47a2ad=_0x23a158;if(this[_0x47a2ad(0x227)]===undefined)return 0x0;return this[_0x47a2ad(0x227)][_0x47a2ad(0x2f6)]('-')['length']-0x1;},Game_Action[_0x23a158(0x281)][_0x23a158(0x344)]=function(){const _0x150c6c=_0x23a158;if(this['_actionFusionRecipe']===undefined)return[];return this['_actionFusionRecipe'][_0x150c6c(0x2f6)]('-')[_0x150c6c(0x176)](_0x7c7f1b=>$dataSkills[Number(_0x7c7f1b)]);},Game_Action[_0x23a158(0x281)][_0x23a158(0x369)]=function(){const _0x1153e7=_0x23a158;if(this[_0x1153e7(0x227)]===undefined)return[];return this[_0x1153e7(0x227)]['split']('-')[_0x1153e7(0x176)](_0x2bceb2=>$dataItems[Number(_0x2bceb2)]);},Game_BattlerBase['prototype'][_0x23a158(0x366)]=function(){const _0x4983b9=_0x23a158;return this[_0x4983b9(0x18b)]||0x0;},Game_BattlerBase['BTB_MAX_ACTIONS_DEFAULT']=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x2f5)][_0x23a158(0x32f)],Game_BattlerBase[_0x23a158(0x15e)]=VisuMZ['BattleSystemBTB'][_0x23a158(0x2bb)][_0x23a158(0x2f5)]['MaxActionsHardCap'],Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x201)]=function(){const _0x2517a4=_0x23a158;if(this[_0x2517a4(0x239)]())return 0x1;if(this['hideBraveTrait']())return 0x1;const _0x377bc2=VisuMZ[_0x2517a4(0x287)][_0x2517a4(0x237)],_0x24e7f1=_0x377bc2[_0x2517a4(0x1bf)];let _0x16af81=Game_BattlerBase[_0x2517a4(0x1bc)];const _0x5c9552=this[_0x2517a4(0x2f7)]();for(const _0x4bc499 of _0x5c9552){if(!_0x4bc499)continue;const _0x4921bf=_0x4bc499['note'];_0x4921bf[_0x2517a4(0x1ca)](_0x24e7f1)&&(_0x16af81+=Number(RegExp['$1']));}return _0x16af81[_0x2517a4(0x343)](0x1,Game_BattlerBase[_0x2517a4(0x15e)]);},Game_BattlerBase['BTB_MAX_BRAVEPOINTS_DEFAULT']=VisuMZ['BattleSystemBTB'][_0x23a158(0x2bb)][_0x23a158(0x2f5)]['MaxBravePointsDefault'],Game_BattlerBase['BTB_MIN_BRAVEPOINTS_DEFAULT']=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)]['Mechanics'][_0x23a158(0x2de)],Game_BattlerBase[_0x23a158(0x215)]=VisuMZ[_0x23a158(0x287)]['Settings']['Mechanics']['MaxBravePointsHardCap'],Game_BattlerBase[_0x23a158(0x1fc)]=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x2f5)][_0x23a158(0x249)],Game_BattlerBase[_0x23a158(0x281)]['maxBravePoints']=function(){const _0x12c111=_0x23a158,_0x1ba2ee=VisuMZ['BattleSystemBTB'][_0x12c111(0x237)],_0x1fb7b1=_0x1ba2ee[_0x12c111(0x381)];let _0x109225=Game_BattlerBase[_0x12c111(0x3ac)];const _0x10d68b=this[_0x12c111(0x2f7)]();for(const _0x227854 of _0x10d68b){if(!_0x227854)continue;const _0x3e2c55=_0x227854[_0x12c111(0x248)];_0x3e2c55[_0x12c111(0x1ca)](_0x1fb7b1)&&(_0x109225+=Number(RegExp['$1']));}return Math[_0x12c111(0x2af)](_0x109225,Game_BattlerBase[_0x12c111(0x215)]);},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x19c)]=function(){const _0x250cb5=_0x23a158,_0x3999c9=VisuMZ['BattleSystemBTB']['RegExp'],_0x2f2435=_0x3999c9[_0x250cb5(0x37c)];let _0x32b5bc=Game_BattlerBase[_0x250cb5(0x1f8)];const _0x1ab50f=this[_0x250cb5(0x2f7)]();for(const _0x32a667 of _0x1ab50f){if(!_0x32a667)continue;const _0x41640c=_0x32a667[_0x250cb5(0x248)];_0x41640c[_0x250cb5(0x1ca)](_0x2f2435)&&(_0x32b5bc+=Number(RegExp['$1']));}return Math[_0x250cb5(0x29c)](_0x32b5bc,Game_BattlerBase[_0x250cb5(0x1fc)]);},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x16d)]=function(_0x23d975){const _0x34966f=_0x23a158;this[_0x34966f(0x18b)]=Math['min'](_0x23d975,this[_0x34966f(0x20c)]()),this['refresh']();},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2a0)]=function(_0x40d11e){const _0x439427=_0x23a158;_0x40d11e+=this[_0x439427(0x18b)]||0x0,this[_0x439427(0x16d)](_0x40d11e);},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2cd)]=function(_0x5a7bbc){this['gainBravePoints'](-_0x5a7bbc);},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2d1)]=function(_0x473680){const _0x11a43c=_0x23a158,_0x5cef47=VisuMZ[_0x11a43c(0x287)]['Settings']['Mechanics'];if(!_0x473680)return _0x5cef47[_0x11a43c(0x301)];if(DataManager[_0x11a43c(0x222)](_0x473680)){if(_0x473680['id']===this[_0x11a43c(0x35b)]())return 0x0;if(this[_0x11a43c(0x35a)]()&&this[_0x11a43c(0x35a)]()[_0x11a43c(0x1a0)]()===_0x473680&&this[_0x11a43c(0x35a)]()[_0x11a43c(0x38b)])return 0x0;}const _0x59e614=VisuMZ[_0x11a43c(0x287)][_0x11a43c(0x237)],_0x2fc0e8=_0x473680[_0x11a43c(0x248)];if(_0x2fc0e8[_0x11a43c(0x1ca)](_0x59e614[_0x11a43c(0x347)]))return Number(RegExp['$1']);let _0x5144dd=0x0;if(DataManager[_0x11a43c(0x222)](_0x473680))_0x5144dd=_0x5cef47[_0x11a43c(0x1e4)];else DataManager[_0x11a43c(0x17d)](_0x473680)&&(_0x5144dd=_0x5cef47[_0x11a43c(0x1ff)]);return _0x5144dd[_0x11a43c(0x343)](0x0,Game_BattlerBase[_0x11a43c(0x215)]);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x174)]=Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x27b)],Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x27b)]=function(_0x53b109){const _0x595403=_0x23a158;if(_0x53b109&&SceneManager['isSceneBattle']()&&BattleManager[_0x595403(0x1ed)]()){const _0x564399=this[_0x595403(0x2d1)](_0x53b109);if(this['bravePoints']()-_0x564399<this[_0x595403(0x19c)]())return![];}return VisuMZ[_0x595403(0x287)][_0x595403(0x174)]['call'](this,_0x53b109);},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2d7)]=function(_0x1f39c0){const _0x689c4c=_0x23a158;if(!BattleManager['isBTB']())return;const _0x6ac9d7=this['bravePointsCost'](_0x1f39c0);this[_0x689c4c(0x2cd)](_0x6ac9d7);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x33c)]=Game_Battler[_0x23a158(0x281)]['useItem'],Game_Battler[_0x23a158(0x281)][_0x23a158(0x279)]=function(_0xfbe4d2){const _0x540730=_0x23a158;if(this[_0x540730(0x34b)](_0xfbe4d2)){this[_0x540730(0x3ad)](_0xfbe4d2);return;}VisuMZ[_0x540730(0x287)][_0x540730(0x33c)]['call'](this,_0xfbe4d2),this[_0x540730(0x2d7)](_0xfbe4d2);},Game_Battler['prototype'][_0x23a158(0x34b)]=function(_0x4f1b49){const _0x185fa2=_0x23a158;if(!BattleManager[_0x185fa2(0x1ed)]())return![];if(!SceneManager[_0x185fa2(0x1b8)]())return![];if(!this['isActor']())return![];if(this!==BattleManager[_0x185fa2(0x160)])return![];if(!this[_0x185fa2(0x35a)]())return![];if(!this[_0x185fa2(0x35a)]()[_0x185fa2(0x1a0)]())return![];if(this['currentAction']()[_0x185fa2(0x1a0)]()!==_0x4f1b49)return![];if(this['currentAction']()[_0x185fa2(0x222)]())return this[_0x185fa2(0x35a)]()['getActionFusionRecipeSkills']()['length']>0x0;else return this[_0x185fa2(0x35a)]()['isItem']()?this[_0x185fa2(0x35a)]()[_0x185fa2(0x369)]()[_0x185fa2(0x307)]>0x0:![];},Game_Battler[_0x23a158(0x281)]['useItemBTB']=function(_0x40db1c){const _0x1c1b18=_0x23a158;if(!SceneManager['isSceneBattle']())return;DataManager[_0x1c1b18(0x222)](_0x40db1c)?this['btbPaySkillFusionCosts']():this[_0x1c1b18(0x2ee)]();},Game_Battler[_0x23a158(0x281)]['btbPaySkillFusionCosts']=function(){const _0x193812=_0x23a158,_0x29a640=this['currentAction']()[_0x193812(0x344)]();if(!_0x29a640)return;for(const _0x254c71 of _0x29a640){if(!_0x254c71)continue;if(!this[_0x193812(0x27b)](_0x254c71))return![];VisuMZ[_0x193812(0x287)]['Game_Battler_useItem'][_0x193812(0x15f)](this,_0x254c71),this[_0x193812(0x2d7)](_0x254c71);}return!![];},Game_Battler[_0x23a158(0x281)][_0x23a158(0x2ee)]=function(){const _0x38e9df=_0x23a158,_0x3d425d=this['currentAction']()[_0x38e9df(0x369)]();if(!_0x3d425d)return;for(const _0x1f8177 of _0x3d425d){if(!_0x1f8177)continue;if(!this[_0x38e9df(0x27b)](_0x1f8177))return![];this[_0x38e9df(0x2d7)](_0x1f8177);}return!![];},Game_BattlerBase['prototype']['predictedBravePoints']=function(){const _0x20fba3=_0x23a158,_0x1e658e=this[_0x20fba3(0x366)]()-this['predictedBravePointCost']()+this[_0x20fba3(0x2a6)]();return _0x1e658e[_0x20fba3(0x343)](Game_BattlerBase[_0x20fba3(0x1fc)],this[_0x20fba3(0x20c)]());},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x1ab)]=function(){const _0x22fc0b=_0x23a158;let _0x30cc45=0x0;for(const _0xbdd1d0 of this[_0x22fc0b(0x1ee)]){if(!_0xbdd1d0)continue;const _0x2061ae=_0xbdd1d0[_0x22fc0b(0x1a0)]();_0x30cc45+=this[_0x22fc0b(0x2d1)](_0x2061ae);}return _0x30cc45;},VisuMZ['BattleSystemBTB'][_0x23a158(0x26a)]=Game_BattlerBase[_0x23a158(0x281)]['canInput'],Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x188)]=function(){const _0x14d3d4=_0x23a158;return BattleManager[_0x14d3d4(0x1ed)]()&&this[_0x14d3d4(0x366)]()<0x0?![]:VisuMZ[_0x14d3d4(0x287)]['Game_BattlerBase_canInput'][_0x14d3d4(0x15f)](this);},VisuMZ['BattleSystemBTB'][_0x23a158(0x34a)]=Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2b3)],Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2b3)]=function(){const _0x591b4a=_0x23a158;return BattleManager[_0x591b4a(0x1ed)]()&&this['numActions']()>0x1?![]:VisuMZ[_0x591b4a(0x287)]['Game_BattlerBase_canGuard'][_0x591b4a(0x15f)](this);},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x16c)]=function(){const _0x10e790=_0x23a158;if(this[_0x10e790(0x239)]())return![];return this[_0x10e790(0x232)]()<this[_0x10e790(0x201)]()&&this[_0x10e790(0x18b)]>this[_0x10e790(0x19c)]();},Game_BattlerBase['prototype']['cannotBraveTrait']=function(){const _0x3bc891=_0x23a158,_0x518974=VisuMZ['BattleSystemBTB'][_0x3bc891(0x237)],_0x57cb33=_0x518974[_0x3bc891(0x339)];return this[_0x3bc891(0x2f7)]()[_0x3bc891(0x2cc)](_0x5a1932=>_0x5a1932&&_0x5a1932[_0x3bc891(0x248)][_0x3bc891(0x1ca)](_0x57cb33));},Game_BattlerBase['prototype'][_0x23a158(0x1cd)]=function(){const _0x1b8b6a=_0x23a158,_0x5d8346=VisuMZ[_0x1b8b6a(0x287)]['RegExp'],_0x25191a=_0x5d8346[_0x1b8b6a(0x17e)];return this['traitObjects']()[_0x1b8b6a(0x2cc)](_0x1b46c4=>_0x1b46c4&&_0x1b46c4[_0x1b8b6a(0x248)][_0x1b8b6a(0x1ca)](_0x25191a));},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x1e5)]=function(){const _0xe1c289=_0x23a158;delete this[_0xe1c289(0x2bc)],delete this[_0xe1c289(0x157)],delete this[_0xe1c289(0x341)],delete this['_btbTurnOrderIconIndex'];},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x29d)]=function(){const _0x4a3c01=_0x23a158;return this[_0x4a3c01(0x2bc)]===undefined&&(this[_0x4a3c01(0x2bc)]=this[_0x4a3c01(0x2f2)]()),this['_btbTurnOrderGraphicType'];},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2f2)]=function(){const _0x45fd0b=_0x23a158;return Window_BTB_TurnOrder[_0x45fd0b(0x2bb)][_0x45fd0b(0x262)];},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2fa)]=function(){const _0x35987f=_0x23a158;return this[_0x35987f(0x157)]===undefined&&(this[_0x35987f(0x157)]=this[_0x35987f(0x182)]()),this[_0x35987f(0x157)];},Game_BattlerBase['prototype'][_0x23a158(0x182)]=function(){return Window_BTB_TurnOrder['Settings']['EnemyBattlerFaceName'];},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x37e)]=function(){const _0x3c14da=_0x23a158;return this[_0x3c14da(0x341)]===undefined&&(this[_0x3c14da(0x341)]=this[_0x3c14da(0x1df)]()),this[_0x3c14da(0x341)];},Game_BattlerBase['prototype'][_0x23a158(0x1df)]=function(){const _0x2cfc08=_0x23a158;return Window_BTB_TurnOrder[_0x2cfc08(0x2bb)][_0x2cfc08(0x1e0)];},Game_BattlerBase['prototype'][_0x23a158(0x183)]=function(){const _0x17f7b7=_0x23a158;return this[_0x17f7b7(0x36b)]===undefined&&(this[_0x17f7b7(0x36b)]=this[_0x17f7b7(0x2e3)]()),this[_0x17f7b7(0x36b)];},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2e3)]=function(){const _0x35b036=_0x23a158;return Window_BTB_TurnOrder['Settings'][_0x35b036(0x204)];},Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x346)]=function(_0x304e40){const _0x2cfd61=_0x23a158;this[_0x2cfd61(0x36b)]=_0x304e40;},VisuMZ['BattleSystemBTB'][_0x23a158(0x3be)]=Game_BattlerBase[_0x23a158(0x281)]['hide'],Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2e9)]=function(){const _0x276336=_0x23a158;VisuMZ[_0x276336(0x287)][_0x276336(0x3be)][_0x276336(0x15f)](this),BattleManager[_0x276336(0x340)]();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x25c)]=Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2bd)],Game_BattlerBase[_0x23a158(0x281)][_0x23a158(0x2bd)]=function(){const _0x8d15c2=_0x23a158;VisuMZ[_0x8d15c2(0x287)][_0x8d15c2(0x25c)][_0x8d15c2(0x15f)](this),BattleManager['removeActionBattlersBTB']();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x37a)]=Game_Battler['prototype'][_0x23a158(0x2b1)],Game_Battler[_0x23a158(0x281)][_0x23a158(0x2b1)]=function(){const _0x14e579=_0x23a158;VisuMZ['BattleSystemBTB'][_0x14e579(0x37a)][_0x14e579(0x15f)](this),BattleManager[_0x14e579(0x340)]();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x2b9)]=Game_Battler[_0x23a158(0x281)][_0x23a158(0x2c2)],Game_Battler['prototype'][_0x23a158(0x2c2)]=function(){const _0x499d54=_0x23a158;return BattleManager[_0x499d54(0x1ed)]()?0x1:VisuMZ[_0x499d54(0x287)][_0x499d54(0x2b9)]['call'](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x3a3)]=Game_Battler[_0x23a158(0x281)]['onBattleStart'],Game_Battler[_0x23a158(0x281)]['onBattleStart']=function(_0x5f4ae0){const _0x2d354f=_0x23a158;VisuMZ[_0x2d354f(0x287)][_0x2d354f(0x3a3)]['call'](this,_0x5f4ae0),this['onBattleStartBTB'](_0x5f4ae0);},Game_Battler[_0x23a158(0x281)][_0x23a158(0x23d)]=function(_0x52bf7a){const _0x2dbffb=_0x23a158;if(!BattleManager[_0x2dbffb(0x1ed)]())return;const _0x356b11=VisuMZ[_0x2dbffb(0x287)][_0x2dbffb(0x2bb)][_0x2dbffb(0x2f5)],_0x4bddba=VisuMZ[_0x2dbffb(0x287)]['RegExp'];let _0x19943d=_0x52bf7a?_0x356b11[_0x2dbffb(0x32e)]:_0x356b11['BravePointStartNeutral'];const _0x50bf88=this[_0x2dbffb(0x2f7)]();for(const _0x21f825 of _0x50bf88){if(!_0x21f825)continue;const _0x706aa5=_0x21f825['note'];_0x706aa5[_0x2dbffb(0x1ca)](_0x4bddba[_0x2dbffb(0x1ef)])&&(_0x19943d+=Number(RegExp['$1']));}this[_0x2dbffb(0x16d)](_0x19943d);},Game_Battler[_0x23a158(0x281)][_0x23a158(0x212)]=function(){const _0x153d0d=_0x23a158;this[_0x153d0d(0x1ee)]['push'](new Game_Action(this));const _0x27b33e=VisuMZ[_0x153d0d(0x287)][_0x153d0d(0x2bb)][_0x153d0d(0x27c)];if(_0x27b33e[_0x153d0d(0x2e8)]){const _0x2c152f='Brave',_0x2afc82=_0x27b33e[_0x153d0d(0x156)[_0x153d0d(0x1aa)](_0x2c152f)],_0x25738c=_0x27b33e[_0x153d0d(0x2ac)['format'](_0x2c152f)],_0x48eb5d=_0x27b33e[_0x153d0d(0x349)[_0x153d0d(0x1aa)](_0x2c152f)];$gameTemp[_0x153d0d(0x22c)]([this],_0x2afc82,_0x25738c,_0x48eb5d);}},Game_Battler[_0x23a158(0x281)][_0x23a158(0x20d)]=function(){const _0x276435=_0x23a158;if(this[_0x276435(0x1ee)][_0x276435(0x307)]<=0x1)return;this[_0x276435(0x1ee)][_0x276435(0x2d3)]();const _0x182fd6=VisuMZ['BattleSystemBTB'][_0x276435(0x2bb)][_0x276435(0x27c)];if(_0x182fd6[_0x276435(0x2b4)]){const _0x303efd=_0x276435(0x1cc),_0x176cd4=_0x182fd6[_0x276435(0x156)[_0x276435(0x1aa)](_0x303efd)],_0x44c67a=_0x182fd6[_0x276435(0x2ac)[_0x276435(0x1aa)](_0x303efd)],_0x152519=_0x182fd6[_0x276435(0x349)[_0x276435(0x1aa)](_0x303efd)];$gameTemp[_0x276435(0x22c)]([this],_0x176cd4,_0x44c67a,_0x152519);}},VisuMZ[_0x23a158(0x287)][_0x23a158(0x226)]=Game_Battler[_0x23a158(0x281)][_0x23a158(0x1a5)],Game_Battler[_0x23a158(0x281)][_0x23a158(0x1a5)]=function(){const _0x451f75=_0x23a158;if(BattleManager[_0x451f75(0x1ed)]())this['_bypassClearActions']=!![];VisuMZ[_0x451f75(0x287)]['Game_Battler_onRestrict'][_0x451f75(0x15f)](this);if(BattleManager[_0x451f75(0x1ed)]())this[_0x451f75(0x391)]=undefined;},VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bf)]=Game_Battler['prototype'][_0x23a158(0x28c)],Game_Battler[_0x23a158(0x281)][_0x23a158(0x28c)]=function(){const _0x47e9d3=_0x23a158;if(BattleManager[_0x47e9d3(0x1ed)]()&&this[_0x47e9d3(0x391)])return;VisuMZ[_0x47e9d3(0x287)]['Game_Battler_clearActions'][_0x47e9d3(0x15f)](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x251)]=Game_Battler[_0x23a158(0x281)][_0x23a158(0x23c)],Game_Battler['prototype']['onTurnEnd']=function(){const _0x5b9048=_0x23a158;VisuMZ[_0x5b9048(0x287)]['Game_Battler_onTurnEnd'][_0x5b9048(0x15f)](this),this[_0x5b9048(0x34f)]();},Game_Battler[_0x23a158(0x281)][_0x23a158(0x34f)]=function(){const _0x310850=_0x23a158;if(!BattleManager['isBTB']())return;if(!$gameParty[_0x310850(0x304)]())return;this[_0x310850(0x1c8)]();},Game_Battler['prototype'][_0x23a158(0x1c8)]=function(){const _0x515178=_0x23a158,_0x1526cf=VisuMZ['BattleSystemBTB'][_0x515178(0x2bb)]['Mechanics'],_0x40fb5e=_0x1526cf[_0x515178(0x389)];if(_0x40fb5e&&!this['isAlive']())return;const _0x5ab7ef=this[_0x515178(0x2a6)]();this[_0x515178(0x2a0)](_0x5ab7ef);},Game_Battler['prototype'][_0x23a158(0x2a6)]=function(){const _0x3462e1=_0x23a158,_0x226360=VisuMZ[_0x3462e1(0x287)][_0x3462e1(0x237)],_0xf35fb=VisuMZ['BattleSystemBTB'][_0x3462e1(0x2bb)][_0x3462e1(0x2f5)];let _0x5ccc3f=_0xf35fb['BravePointRegenBase']||0x0;const _0x28d3b2=this[_0x3462e1(0x2f7)]();for(const _0x53c3f8 of _0x28d3b2){if(!_0x53c3f8)continue;const _0x5bf769=_0x53c3f8[_0x3462e1(0x248)];_0x5bf769[_0x3462e1(0x1ca)](_0x226360[_0x3462e1(0x1ba)])&&(_0x5ccc3f+=Number(RegExp['$1']));}return _0x5ccc3f;},Game_Battler['prototype']['processActionFusionsBTB']=function(){const _0x33c7ca=_0x23a158;if(!this['canProcessActionFusionsBTB']())return;if(this['numActions']()<=0x1)return;if(!this[_0x33c7ca(0x35a)]())return;if(!this[_0x33c7ca(0x35a)]()[_0x33c7ca(0x1a0)]())return;const _0x1f1e49=this['currentAction']()['isSkill'](),_0x2d0a86=_0x1f1e49?DataManager['_btbSkillFlexFusion']:DataManager[_0x33c7ca(0x313)],_0x5c1b62=_0x1f1e49?DataManager[_0x33c7ca(0x2b2)]:DataManager[_0x33c7ca(0x368)];let _0x211f2c='',_0x2e9e6f=0x0;{const _0x37014b=this[_0x33c7ca(0x1eb)]();if(_0x37014b['length']>0x0)for(const _0x3b27e9 of _0x37014b){if(!_0x3b27e9)continue;_0x2d0a86[_0x3b27e9]&&_0x2d0a86[_0x3b27e9]>=_0x2e9e6f&&(this['canPayActionFusionCombination'](_0x3b27e9)&&(_0x211f2c=_0x3b27e9,_0x2e9e6f=_0x2d0a86[_0x3b27e9]));}}{const _0x1ff8d1=this[_0x33c7ca(0x3b3)]();if(_0x1ff8d1[_0x33c7ca(0x307)]>0x0)for(const _0x16399c of _0x1ff8d1){if(!_0x16399c)continue;_0x5c1b62[_0x16399c]&&_0x5c1b62[_0x16399c]>=_0x2e9e6f&&(this[_0x33c7ca(0x184)](_0x16399c)&&(_0x211f2c=_0x16399c,_0x2e9e6f=_0x5c1b62[_0x16399c]));}}if(_0x2e9e6f<=0x0)return;this[_0x33c7ca(0x1a9)](_0x211f2c),this[_0x33c7ca(0x35a)]()['setActionFusionBTB'](_0x211f2c);const _0x1bf06f=this[_0x33c7ca(0x35a)]()[_0x33c7ca(0x294)];_0x1f1e49?this[_0x33c7ca(0x35a)]()[_0x33c7ca(0x21d)](_0x2e9e6f):this[_0x33c7ca(0x35a)]()[_0x33c7ca(0x175)](_0x2e9e6f),this[_0x33c7ca(0x35a)]()['_targetBattlerKey']=_0x1bf06f;},Game_Battler[_0x23a158(0x281)][_0x23a158(0x21f)]=function(){const _0x4d6c7c=_0x23a158;if(this[_0x4d6c7c(0x3a0)]())return![];const _0x850008=VisuMZ[_0x4d6c7c(0x287)]['Settings'][_0x4d6c7c(0x2f5)];if(this[_0x4d6c7c(0x1cf)]()){if(_0x850008['ActorActionFusions']===undefined)return!![];return _0x850008[_0x4d6c7c(0x31f)];}else{if(_0x850008[_0x4d6c7c(0x327)]===undefined)return!![];return _0x850008[_0x4d6c7c(0x327)];}},Game_BattlerBase['prototype']['cannotFusionNotetagBTB']=function(){const _0x15c1ef=_0x23a158,_0x87fba5=VisuMZ[_0x15c1ef(0x287)][_0x15c1ef(0x237)],_0x3b86ce=this[_0x15c1ef(0x2f7)]();for(const _0x522e43 of _0x3b86ce){if(!_0x522e43)continue;const _0x5ab6b8=_0x522e43[_0x15c1ef(0x248)];if(_0x5ab6b8['match'](_0x87fba5[_0x15c1ef(0x210)]))return!![];if(_0x5ab6b8['match'](_0x87fba5[_0x15c1ef(0x379)]))return![];}return![];},Game_Battler[_0x23a158(0x281)][_0x23a158(0x1eb)]=function(){const _0x3478fa=_0x23a158,_0xc97bbc=this['currentAction'](),_0x14040b=this['_actions'],_0x41504d=_0x14040b[_0x3478fa(0x33d)](_0xcb9b21=>this[_0x3478fa(0x3c2)](_0xc97bbc,_0xcb9b21)),_0x18302f=_0x41504d['map'](_0x562590=>_0x562590[_0x3478fa(0x1a0)]()['id']);_0x18302f[_0x3478fa(0x170)](_0xc97bbc[_0x3478fa(0x1a0)]()['id']),_0x18302f[_0x3478fa(0x23a)]((_0x1e7b0c,_0x401998)=>_0x1e7b0c-_0x401998);const _0x5ea4c3=VisuMZ[_0x3478fa(0x287)]['formAllPossibleFlexCombos'](_0x18302f);return _0x5ea4c3['filter']((_0x338856,_0x634ba1,_0x4081ba)=>_0x4081ba[_0x3478fa(0x1ea)](_0x338856)===_0x634ba1);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x363)]=function(_0x52ff0c){const _0x4e1e12=_0x23a158;_0x52ff0c[_0x4e1e12(0x23a)]((_0x3a7e92,_0x433aef)=>_0x3a7e92-_0x433aef);const _0x1b05fb=[],_0xbae180=function(_0x56c44e,_0x29b7f8){const _0x26f21a=_0x4e1e12;_0x29b7f8[_0x26f21a(0x307)]>=0x2&&_0x1b05fb[_0x26f21a(0x170)](_0x29b7f8[_0x26f21a(0x3ab)]('-'));for(let _0x3fe209=_0x56c44e;_0x3fe209<_0x52ff0c[_0x26f21a(0x307)];_0x3fe209++){_0xbae180(_0x3fe209+0x1,[..._0x29b7f8,_0x52ff0c[_0x3fe209]]);}};return _0xbae180(0x0,[]),_0x1b05fb[_0x4e1e12(0x23a)](),_0x1b05fb[_0x4e1e12(0x33d)]((_0x5e6bbb,_0x133257,_0x5bc8ae)=>_0x5bc8ae['indexOf'](_0x5e6bbb)===_0x133257);},Game_Battler['prototype']['getStrictActionFusionCombinationsBTB']=function(){const _0x423fda=_0x23a158,_0xe7537=this[_0x423fda(0x35a)](),_0x69cc03=this[_0x423fda(0x1ee)],_0x5bb161=[];let _0x4bd425=String(_0xe7537['item']()['id']);for(let _0x3a6672=0x1;_0x3a6672<_0x69cc03[_0x423fda(0x307)];_0x3a6672++){const _0xf58227=_0x69cc03[_0x3a6672];if(this[_0x423fda(0x3c2)](_0xe7537,_0xf58227))_0x4bd425=_0x423fda(0x22a)[_0x423fda(0x1aa)](_0x4bd425,_0xf58227['item']()['id']),_0x5bb161[_0x423fda(0x170)](_0x4bd425);else break;}return _0x5bb161[_0x423fda(0x33d)]((_0x3effd2,_0xa9e0c2,_0x523a2c)=>_0x523a2c['indexOf'](_0x3effd2)===_0xa9e0c2);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x206)]=function(_0x3f5c9f,_0x1bf43b){const _0x59808a=[],_0x5ac063=function(_0x1555e4,_0x4a49b9){const _0xd3ba39=_0x2aff;for(var _0x4b8cfd=0x0;_0x4b8cfd<_0x4a49b9[_0xd3ba39(0x307)];_0x4b8cfd++){_0x59808a[_0xd3ba39(0x170)](_0x1555e4+'-'+_0x4a49b9[_0x4b8cfd]),_0x5ac063(_0x1555e4+'-'+_0x4a49b9[_0x4b8cfd],_0x4a49b9['slice'](_0x4b8cfd+0x1));}};return _0x5ac063(_0x3f5c9f,_0x1bf43b),_0x59808a;},Game_Battler[_0x23a158(0x281)][_0x23a158(0x3c2)]=function(_0x29496f,_0x3e8fd2){const _0x22e079=_0x23a158;if(!_0x29496f||!_0x3e8fd2)return![];if(_0x29496f===_0x3e8fd2)return![];if(!_0x29496f[_0x22e079(0x1a0)]()||!_0x3e8fd2[_0x22e079(0x1a0)]())return![];if(_0x29496f['isSkill']()!==_0x3e8fd2[_0x22e079(0x222)]())return![];return!![];},Game_Battler[_0x23a158(0x281)][_0x23a158(0x184)]=function(_0x385fcb){const _0xe2b878=_0x23a158,_0x29412c=this[_0xe2b878(0x35a)]()[_0xe2b878(0x222)](),_0x32c439=JsonEx[_0xe2b878(0x3b8)](this);_0x32c439[_0xe2b878(0x2f1)]=!![],_0x32c439[_0xe2b878(0x35a)]()[_0xe2b878(0x31d)](_0x385fcb);const _0x4d97b4=JsonEx[_0xe2b878(0x3b8)]($gameParty['_items']),_0x5e3bd0=JsonEx[_0xe2b878(0x3b8)]($gameParty[_0xe2b878(0x30e)]),_0x569b8f=JsonEx[_0xe2b878(0x3b8)]($gameParty[_0xe2b878(0x217)]);let _0x130bb2=_0x29412c?_0x32c439['btbPaySkillFusionCosts']():_0x32c439[_0xe2b878(0x2ee)]();return $gameParty['_items']=_0x4d97b4,$gameParty[_0xe2b878(0x30e)]=_0x5e3bd0,$gameParty[_0xe2b878(0x217)]=_0x569b8f,_0x130bb2;},Game_Battler[_0x23a158(0x281)][_0x23a158(0x1a9)]=function(_0x52b7ad){const _0x1353fc=_0x23a158,_0x5a9c7a=this[_0x1353fc(0x35a)](),_0x1b3dd8=_0x52b7ad[_0x1353fc(0x2f6)]('-')[_0x1353fc(0x176)](_0x5e92e9=>Number(_0x5e92e9)),_0x1bbb6d=_0x1b3dd8[_0x1353fc(0x1ea)](_0x5a9c7a[_0x1353fc(0x1a0)]()['id']);_0x1b3dd8[_0x1353fc(0x282)](_0x1bbb6d,0x1);const _0x1a32e1=this['_actions'],_0x2c62e0=[];for(const _0x4c80b8 of _0x1a32e1){this['canActionFusionWithBTB'](_0x5a9c7a,_0x4c80b8)&&(_0x1b3dd8[_0x1353fc(0x253)](_0x4c80b8[_0x1353fc(0x1a0)]()['id'])&&(_0x2c62e0[_0x1353fc(0x170)](_0x4c80b8),_0x1b3dd8[_0x1353fc(0x282)](_0x1b3dd8['indexOf'](_0x4c80b8[_0x1353fc(0x1a0)]()['id']),0x1)));}for(const _0x4e4be7 of _0x2c62e0){_0x1a32e1[_0x1353fc(0x28d)](_0x4e4be7);}},Game_Actor[_0x23a158(0x281)][_0x23a158(0x16d)]=function(_0xaa0ec1){const _0x4c91dc=_0x23a158;Game_Battler[_0x4c91dc(0x281)]['setBravePoints'][_0x4c91dc(0x15f)](this,_0xaa0ec1);if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x4c91dc(0x298)]()[_0x4c91dc(0x253)](this))return;BattleManager[_0x4c91dc(0x2d6)]();},VisuMZ['BattleSystemBTB'][_0x23a158(0x26e)]=Game_Actor[_0x23a158(0x281)][_0x23a158(0x24d)],Game_Actor[_0x23a158(0x281)]['makeActions']=function(){const _0x4b8556=_0x23a158;VisuMZ[_0x4b8556(0x287)][_0x4b8556(0x26e)][_0x4b8556(0x15f)](this),BattleManager['isBTB']()&&this[_0x4b8556(0x366)]()<0x0&&this[_0x4b8556(0x28c)]();},Game_Actor[_0x23a158(0x281)]['createTurnOrderBTBGraphicType']=function(){const _0xcd599b=_0x23a158,_0x3db8e2=this['actor']()[_0xcd599b(0x248)];if(_0x3db8e2[_0xcd599b(0x1ca)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x3db8e2[_0xcd599b(0x1ca)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0xcd599b(0x1ec);}return Window_BTB_TurnOrder[_0xcd599b(0x2bb)][_0xcd599b(0x21c)];},Game_Actor[_0x23a158(0x281)][_0x23a158(0x182)]=function(){const _0x7084ab=_0x23a158,_0x2ca632=this[_0x7084ab(0x2eb)]()[_0x7084ab(0x248)];if(_0x2ca632[_0x7084ab(0x1ca)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x7084ab(0x36c)]();},Game_Actor['prototype']['createTurnOrderBTBGraphicFaceIndex']=function(){const _0x27ecb4=_0x23a158,_0x3656a4=this['actor']()[_0x27ecb4(0x248)];if(_0x3656a4[_0x27ecb4(0x1ca)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this['faceIndex']();},Game_Actor[_0x23a158(0x281)][_0x23a158(0x2e3)]=function(){const _0x52a66e=_0x23a158,_0xd857dd=this['actor']()[_0x52a66e(0x248)];if(_0xd857dd['match'](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x52a66e(0x2bb)][_0x52a66e(0x16b)];},Game_Actor[_0x23a158(0x281)][_0x23a158(0x3c2)]=function(_0x2adca8,_0x309de4){const _0x1ed5fc=_0x23a158;if(!Game_Battler['prototype'][_0x1ed5fc(0x3c2)][_0x1ed5fc(0x15f)](this,_0x2adca8,_0x309de4))return![];if(_0x2adca8[_0x1ed5fc(0x312)]()&&_0x309de4['needsSelection']()){if(_0x2adca8['_targetBattlerKey']!==''||_0x309de4[_0x1ed5fc(0x294)]!==''){if(_0x2adca8[_0x1ed5fc(0x294)]!==_0x309de4['_targetBattlerKey'])return![];}else{if(_0x2adca8[_0x1ed5fc(0x1be)]!==_0x309de4[_0x1ed5fc(0x1be)])return _0x2adca8[_0x1ed5fc(0x207)]()===_0x309de4['isForFriend']();}}return!![];},Game_Enemy['prototype']['createTurnOrderBTBGraphicType']=function(){const _0x53bca4=_0x23a158,_0x2e01d4=this['enemy']()['note'];if(_0x2e01d4[_0x53bca4(0x1ca)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x53bca4(0x2b5);else{if(_0x2e01d4[_0x53bca4(0x1ca)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return _0x53bca4(0x1ec);}return Window_BTB_TurnOrder[_0x53bca4(0x2bb)][_0x53bca4(0x262)];},Game_Enemy[_0x23a158(0x281)][_0x23a158(0x182)]=function(){const _0x56dcae=_0x23a158,_0x2ffb30=this[_0x56dcae(0x33f)]()['note'];if(_0x2ffb30[_0x56dcae(0x1ca)](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_BTB_TurnOrder[_0x56dcae(0x2bb)]['EnemyBattlerFaceName'];},Game_Enemy[_0x23a158(0x281)][_0x23a158(0x1df)]=function(){const _0x35c0d4=_0x23a158,_0xf8f05a=this[_0x35c0d4(0x33f)]()[_0x35c0d4(0x248)];if(_0xf8f05a['match'](/<BTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_BTB_TurnOrder['Settings'][_0x35c0d4(0x1e0)];},Game_Enemy[_0x23a158(0x281)][_0x23a158(0x2e3)]=function(){const _0x57c931=_0x23a158,_0x27fee6=this[_0x57c931(0x33f)]()[_0x57c931(0x248)];if(_0x27fee6[_0x57c931(0x1ca)](/<BTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_BTB_TurnOrder[_0x57c931(0x2bb)]['EnemyBattlerIcon'];},VisuMZ[_0x23a158(0x287)][_0x23a158(0x38d)]=Game_Enemy[_0x23a158(0x281)][_0x23a158(0x24d)],Game_Enemy['prototype'][_0x23a158(0x24d)]=function(){const _0x5324e3=_0x23a158;VisuMZ[_0x5324e3(0x287)][_0x5324e3(0x38d)][_0x5324e3(0x15f)](this),this[_0x5324e3(0x333)](),this['makeMultiActionsBTB']();},Game_Enemy[_0x23a158(0x281)]['checkActionsBTB']=function(){const _0x47738c=_0x23a158;if(!BattleManager['isBTB']())return;if(this[_0x47738c(0x232)]()<=0x0)return;this[_0x47738c(0x342)]=![],this[_0x47738c(0x366)]()<0x0&&this[_0x47738c(0x28c)]();},Game_Enemy[_0x23a158(0x281)][_0x23a158(0x1ce)]=function(){const _0xb654e4=_0x23a158;if(!BattleManager[_0xb654e4(0x1ed)]())return;if(this[_0xb654e4(0x232)]()<=0x0)return;const _0x2d235c=this[_0xb654e4(0x1ee)][0x0];if(!_0x2d235c)return;const _0x321557=_0x2d235c[_0xb654e4(0x1a0)]();if(!_0x321557)return;const _0x5566e6=VisuMZ[_0xb654e4(0x287)][_0xb654e4(0x237)],_0x197dae=_0x321557[_0xb654e4(0x248)];let _0x7050c8=[];if(_0x197dae[_0xb654e4(0x1ca)](_0x5566e6['EnemyMultiAction'])){const _0x381501=String(RegExp['$1'])['split'](',');for(let _0x86f372 of _0x381501){_0x86f372=(String(_0x86f372)||'')[_0xb654e4(0x1e9)]();const _0x26d18f=/^\d+$/[_0xb654e4(0x20b)](_0x86f372);_0x26d18f?_0x7050c8[_0xb654e4(0x170)](Number(_0x86f372)):_0x7050c8[_0xb654e4(0x170)](DataManager[_0xb654e4(0x18f)](_0x86f372));}}if(_0x7050c8[_0xb654e4(0x307)]<=0x0)return;while(_0x7050c8[_0xb654e4(0x307)]>this['maxBraveActions']()){_0x7050c8[_0xb654e4(0x2d3)]();}if(_0x7050c8[_0xb654e4(0x307)]<=0x0)return;this['clearActions']();for(const _0x1d9f5d of _0x7050c8){const _0x4ab92f=new Game_Action(this);_0x4ab92f[_0xb654e4(0x21d)](_0x1d9f5d),_0x4ab92f[_0xb654e4(0x236)]=!![],this[_0xb654e4(0x1ee)]['push'](_0x4ab92f);}},Game_Enemy[_0x23a158(0x281)][_0x23a158(0x2e6)]=function(){const _0x53dbb3=_0x23a158;let _0x4463b0=this['numActions']();for(const _0xaef81a of this[_0x53dbb3(0x1ee)]){if(!_0xaef81a)continue;_0x4463b0+=_0xaef81a[_0x53dbb3(0x27d)]();}return _0x4463b0-0x1;},VisuMZ[_0x23a158(0x287)]['Game_Unit_makeActions']=Game_Unit[_0x23a158(0x281)][_0x23a158(0x24d)],Game_Unit[_0x23a158(0x281)][_0x23a158(0x24d)]=function(){const _0x51a805=_0x23a158;VisuMZ[_0x51a805(0x287)][_0x51a805(0x30f)]['call'](this),BattleManager['isBTB']()&&this===$gameTroop&&SceneManager[_0x51a805(0x1b8)]()&&BattleManager['makeActionOrders']();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x318)]=Game_Party[_0x23a158(0x281)][_0x23a158(0x35e)],Game_Party[_0x23a158(0x281)][_0x23a158(0x35e)]=function(_0x580066){const _0x2af824=_0x23a158;VisuMZ[_0x2af824(0x287)][_0x2af824(0x318)][_0x2af824(0x15f)](this,_0x580066),SceneManager[_0x2af824(0x1b8)]()&&BattleManager[_0x2af824(0x1ed)]()&&BattleManager[_0x2af824(0x310)]['remove']($gameActors['actor'](_0x580066));},VisuMZ[_0x23a158(0x287)]['Scene_Battle_onDisabledPartyCommandSelection']=Scene_Battle[_0x23a158(0x281)]['onDisabledPartyCommandSelection'],Scene_Battle[_0x23a158(0x281)][_0x23a158(0x34c)]=function(){const _0x4d8847=_0x23a158;BattleManager[_0x4d8847(0x1ed)]()?this['selectNextCommand']():VisuMZ[_0x4d8847(0x287)][_0x4d8847(0x2b6)][_0x4d8847(0x15f)](this);},VisuMZ[_0x23a158(0x287)][_0x23a158(0x1dc)]=Scene_Battle[_0x23a158(0x281)][_0x23a158(0x392)],Scene_Battle[_0x23a158(0x281)][_0x23a158(0x392)]=function(){const _0x1fb6fd=_0x23a158;VisuMZ[_0x1fb6fd(0x287)][_0x1fb6fd(0x1dc)][_0x1fb6fd(0x15f)](this),this[_0x1fb6fd(0x38f)]();},Scene_Battle['prototype'][_0x23a158(0x38f)]=function(){const _0x408667=_0x23a158;if(!BattleManager['isBTB']())return;const _0x3b27e3=this[_0x408667(0x394)];if(!_0x3b27e3)return;_0x3b27e3[_0x408667(0x335)](_0x408667(0x18d),this['commandBrave'][_0x408667(0x169)](this)),_0x3b27e3['setHandler'](_0x408667(0x31c),this[_0x408667(0x2cb)]['bind'](this));},Scene_Battle['prototype'][_0x23a158(0x1f4)]=function(){const _0xa191af=_0x23a158;this[_0xa191af(0x212)]();},Scene_Battle[_0x23a158(0x281)][_0x23a158(0x2cb)]=function(){const _0x5e1034=_0x23a158,_0x8876ae=BattleManager[_0x5e1034(0x2eb)]();if(!_0x8876ae)this[_0x5e1034(0x216)]();else{if(_0x8876ae[_0x5e1034(0x232)]()<=0x1)this[_0x5e1034(0x216)]();else _0x8876ae['_actionInputIndex']>0x0?this[_0x5e1034(0x216)]():this[_0x5e1034(0x39c)]();}},Scene_Battle[_0x23a158(0x281)][_0x23a158(0x212)]=function(){const _0xf197fb=_0x23a158,_0x282399=BattleManager[_0xf197fb(0x2eb)]();if(!_0x282399)return;_0x282399[_0xf197fb(0x212)]();const _0x439d60=this[_0xf197fb(0x394)]['_scrollX'],_0x37bc63=this[_0xf197fb(0x394)][_0xf197fb(0x276)],_0x769434=this['_actorCommandWindow'][_0xf197fb(0x26f)]();this['_actorCommandWindow'][_0xf197fb(0x1c1)](_0x282399),this['_actorCommandWindow'][_0xf197fb(0x367)](_0x769434),this[_0xf197fb(0x394)][_0xf197fb(0x2d9)]=_0x439d60,this[_0xf197fb(0x394)][_0xf197fb(0x276)]=_0x37bc63;},Scene_Battle[_0x23a158(0x281)][_0x23a158(0x39c)]=function(){const _0x2c9d27=_0x23a158,_0x2594cc=BattleManager['actor']();if(!_0x2594cc)return;_0x2594cc[_0x2c9d27(0x20d)]();const _0xaa24c9=this[_0x2c9d27(0x394)]['_scrollX'],_0x3203a7=this['_actorCommandWindow'][_0x2c9d27(0x276)],_0x5a0070=this['_actorCommandWindow'][_0x2c9d27(0x26f)]();this[_0x2c9d27(0x394)]['setup'](_0x2594cc),this[_0x2c9d27(0x394)][_0x2c9d27(0x367)](_0x5a0070),this[_0x2c9d27(0x394)]['_scrollX']=_0xaa24c9,this[_0x2c9d27(0x394)][_0x2c9d27(0x276)]=_0x3203a7;},VisuMZ['BattleSystemBTB']['Scene_Battle_createAllWindows']=Scene_Battle['prototype'][_0x23a158(0x274)],Scene_Battle['prototype'][_0x23a158(0x274)]=function(){const _0x512680=_0x23a158;VisuMZ['BattleSystemBTB']['Scene_Battle_createAllWindows'][_0x512680(0x15f)](this),this[_0x512680(0x383)]();},Scene_Battle[_0x23a158(0x281)][_0x23a158(0x383)]=function(){const _0x4c507a=_0x23a158;if(!BattleManager['isBTB']())return;this[_0x4c507a(0x39a)]=new Window_BTB_TurnOrder();const _0x2fe8c0=this[_0x4c507a(0x275)](this[_0x4c507a(0x364)]);this[_0x4c507a(0x19a)](this[_0x4c507a(0x39a)],_0x2fe8c0),this['repositionLogWindowBTB'](),BattleManager['updateTurnOrderBTB'](!![]);},Scene_Battle[_0x23a158(0x281)][_0x23a158(0x15a)]=function(){const _0x409a0f=_0x23a158,_0x656d9c=Window_BTB_TurnOrder['Settings'];if(_0x656d9c[_0x409a0f(0x2d8)]!==_0x409a0f(0x3c7))return;if(!_0x656d9c[_0x409a0f(0x29a)])return;if(!this[_0x409a0f(0x380)])return;const _0x18f834=this['_btbTurnOrderWindow']['y']-Math[_0x409a0f(0x1a2)]((Graphics[_0x409a0f(0x225)]-Graphics['boxHeight'])/0x2),_0x59bd79=_0x18f834+this[_0x409a0f(0x39a)][_0x409a0f(0x225)];this[_0x409a0f(0x380)]['y']=_0x59bd79+_0x656d9c[_0x409a0f(0x292)];};function Sprite_BTB_TurnOrder_Battler(){const _0x194180=_0x23a158;this[_0x194180(0x221)](...arguments);}Sprite_BTB_TurnOrder_Battler['prototype']=Object[_0x23a158(0x36d)](Sprite_Clickable[_0x23a158(0x281)]),Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x2ba)]=Sprite_BTB_TurnOrder_Battler,Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x221)]=function(_0xe4fb62,_0x4d371e){const _0x829641=_0x23a158;this[_0x829641(0x2ea)](_0xe4fb62,_0x4d371e),Sprite_Clickable[_0x829641(0x281)][_0x829641(0x221)][_0x829641(0x15f)](this),this[_0x829641(0x2fe)]=0x0,this[_0x829641(0x1e2)](),this[_0x829641(0x1d6)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x2ea)]=function(_0x197620,_0x2a77e9){const _0x47b67b=_0x23a158;this[_0x47b67b(0x38c)]=_0x197620,this[_0x47b67b(0x197)]=_0x2a77e9;const _0x4081af=Window_BTB_TurnOrder[_0x47b67b(0x2bb)],_0x2c9254=this[_0x47b67b(0x17f)](),_0x1df1e9=this[_0x47b67b(0x297)]();this['_positionDuration']=0x0,this[_0x47b67b(0x1e3)]=_0x2c9254?_0x4081af['SpriteThin']*_0x1df1e9:0x0,this[_0x47b67b(0x311)]=_0x2c9254?0x0:_0x4081af[_0x47b67b(0x29e)]*_0x1df1e9,this[_0x47b67b(0x1a6)]=0x0,this['_fadeTarget']=0xff,this[_0x47b67b(0x337)]=![],this[_0x47b67b(0x22e)]=![],this[_0x47b67b(0x26c)]=0x0,this[_0x47b67b(0x2d2)]=0x0;},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x1e2)]=function(){const _0x29bf6e=_0x23a158;this['createInitialPositions'](),this[_0x29bf6e(0x2df)](),this[_0x29bf6e(0x1bd)](),this['createBorderSprite'](),this[_0x29bf6e(0x345)]();},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x1d9)]=function(){const _0xcb71db=_0x23a158;this['x']=this['_positionTargetX'],this['y']=this[_0xcb71db(0x311)];},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['isHorz']=function(){const _0x5dc31a=_0x23a158,_0x4bfc01=Window_BTB_TurnOrder[_0x5dc31a(0x2bb)],_0x19a3d9=[_0x5dc31a(0x3c7),_0x5dc31a(0x300)][_0x5dc31a(0x253)](_0x4bfc01[_0x5dc31a(0x2d8)]);return _0x19a3d9;},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x3b4)]=function(){const _0x4affae=_0x23a158,_0x582b28=Window_BTB_TurnOrder[_0x4affae(0x2bb)];return this[_0x4affae(0x17f)]()?_0x582b28[_0x4affae(0x29e)]:_0x582b28['SpriteLength'];},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x320)]=function(){const _0x1d1155=_0x23a158,_0x1d1055=Window_BTB_TurnOrder[_0x1d1155(0x2bb)];return this[_0x1d1155(0x17f)]()?_0x1d1055['SpriteLength']:_0x1d1055[_0x1d1155(0x29e)];},Sprite_BTB_TurnOrder_Battler['prototype']['createTestBitmap']=function(){const _0x4ff045=_0x23a158;this['bitmap']=new Bitmap(0x48,0x24);const _0xfa335a=this['battler']()?this[_0x4ff045(0x15b)]()[_0x4ff045(0x1e7)]():'%1\x20%2\x20%3'[_0x4ff045(0x1aa)](this[_0x4ff045(0x38c)],this[_0x4ff045(0x197)]);this[_0x4ff045(0x2b0)][_0x4ff045(0x375)](_0xfa335a,0x0,0x0,0x48,0x24,_0x4ff045(0x2a9));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x2df)]=function(){const _0x333cb7=_0x23a158;if(!Window_BTB_TurnOrder['Settings'][_0x333cb7(0x35c)])return;const _0x4d32cb=Window_BTB_TurnOrder[_0x333cb7(0x2bb)],_0x3bede2=this[_0x333cb7(0x38c)]===$gameParty?_0x333cb7(0x3c4):_0x333cb7(0x1cb),_0x3eb0b5=_0x333cb7(0x181)[_0x333cb7(0x1aa)](_0x3bede2),_0xfb2996=new Sprite();_0xfb2996[_0x333cb7(0x1fb)]['x']=this['anchor']['x'],_0xfb2996[_0x333cb7(0x1fb)]['y']=this[_0x333cb7(0x1fb)]['y'];if(_0x4d32cb[_0x3eb0b5])_0xfb2996[_0x333cb7(0x2b0)]=ImageManager[_0x333cb7(0x2f8)](_0x4d32cb[_0x3eb0b5]);else{const _0x3898c2=this[_0x333cb7(0x3b4)](),_0x4c3258=this[_0x333cb7(0x320)]();_0xfb2996[_0x333cb7(0x2b0)]=new Bitmap(_0x3898c2,_0x4c3258);const _0x357913=ColorManager[_0x333cb7(0x284)](_0x4d32cb[_0x333cb7(0x358)[_0x333cb7(0x1aa)](_0x3bede2)]),_0x34d43f=ColorManager[_0x333cb7(0x284)](_0x4d32cb[_0x333cb7(0x2a2)['format'](_0x3bede2)]);_0xfb2996[_0x333cb7(0x2b0)][_0x333cb7(0x172)](0x0,0x0,_0x3898c2,_0x4c3258,_0x357913,_0x34d43f,!![]);}this['_backgroundSprite']=_0xfb2996,this[_0x333cb7(0x264)](this[_0x333cb7(0x19b)]);},Sprite_BTB_TurnOrder_Battler['prototype']['createGraphicSprite']=function(){const _0x4da40d=_0x23a158,_0x25f39a=new Sprite();_0x25f39a[_0x4da40d(0x1fb)]['x']=this[_0x4da40d(0x1fb)]['x'],_0x25f39a[_0x4da40d(0x1fb)]['y']=this[_0x4da40d(0x1fb)]['y'],this[_0x4da40d(0x173)]=_0x25f39a,this['addChild'](this[_0x4da40d(0x173)]),this['processUpdateGraphic']();},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x193)]=function(){const _0x29eb2f=_0x23a158;if(!Window_BTB_TurnOrder[_0x29eb2f(0x2bb)][_0x29eb2f(0x2c4)])return;const _0x33b0a1=Window_BTB_TurnOrder[_0x29eb2f(0x2bb)],_0x255f97=this[_0x29eb2f(0x38c)]===$gameParty?_0x29eb2f(0x3c4):_0x29eb2f(0x1cb),_0x4fc046=_0x29eb2f(0x3af)[_0x29eb2f(0x1aa)](_0x255f97),_0x563f11=new Sprite();_0x563f11[_0x29eb2f(0x1fb)]['x']=this[_0x29eb2f(0x1fb)]['x'],_0x563f11[_0x29eb2f(0x1fb)]['y']=this[_0x29eb2f(0x1fb)]['y'];if(_0x33b0a1[_0x4fc046])_0x563f11['bitmap']=ImageManager[_0x29eb2f(0x2f8)](_0x33b0a1[_0x4fc046]);else{let _0x6d3deb=this[_0x29eb2f(0x3b4)](),_0x34398b=this[_0x29eb2f(0x320)](),_0x1e4d70=_0x33b0a1[_0x29eb2f(0x268)];_0x563f11[_0x29eb2f(0x2b0)]=new Bitmap(_0x6d3deb,_0x34398b);const _0x48f701=_0x29eb2f(0x36f),_0x227247=ColorManager[_0x29eb2f(0x284)](_0x33b0a1[_0x29eb2f(0x3bc)[_0x29eb2f(0x1aa)](_0x255f97)]);_0x563f11[_0x29eb2f(0x2b0)][_0x29eb2f(0x3a5)](0x0,0x0,_0x6d3deb,_0x34398b,_0x48f701),_0x6d3deb-=0x2,_0x34398b-=0x2,_0x563f11[_0x29eb2f(0x2b0)][_0x29eb2f(0x3a5)](0x1,0x1,_0x6d3deb,_0x34398b,_0x227247),_0x6d3deb-=_0x1e4d70*0x2,_0x34398b-=_0x1e4d70*0x2,_0x563f11[_0x29eb2f(0x2b0)][_0x29eb2f(0x3a5)](0x1+_0x1e4d70,0x1+_0x1e4d70,_0x6d3deb,_0x34398b,_0x48f701),_0x6d3deb-=0x2,_0x34398b-=0x2,_0x1e4d70+=0x1,_0x563f11['bitmap'][_0x29eb2f(0x31a)](0x1+_0x1e4d70,0x1+_0x1e4d70,_0x6d3deb,_0x34398b);}this[_0x29eb2f(0x19b)]=_0x563f11,this[_0x29eb2f(0x264)](this[_0x29eb2f(0x19b)]),this['width']=this[_0x29eb2f(0x19b)][_0x29eb2f(0x223)],this['height']=this['_backgroundSprite']['height'];},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x345)]=function(){const _0x3dbd1d=_0x23a158,_0x153ce6=Window_BTB_TurnOrder[_0x3dbd1d(0x2bb)];if(!_0x153ce6[_0x3dbd1d(0x3a7)])return;if(this[_0x3dbd1d(0x38c)]===$gameParty)return;const _0x7e5fbe=this[_0x3dbd1d(0x3b4)](),_0x4524f8=this[_0x3dbd1d(0x320)](),_0xbcbe48=new Sprite();_0xbcbe48[_0x3dbd1d(0x1fb)]['x']=this['anchor']['x'],_0xbcbe48[_0x3dbd1d(0x1fb)]['y']=this[_0x3dbd1d(0x1fb)]['y'],_0xbcbe48[_0x3dbd1d(0x2b0)]=new Bitmap(_0x7e5fbe,_0x4524f8),this[_0x3dbd1d(0x377)]=_0xbcbe48,this[_0x3dbd1d(0x264)](this['_letterSprite']);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x15b)]=function(){const _0x1398b7=_0x23a158;return this[_0x1398b7(0x38c)]?this['_unit'][_0x1398b7(0x2c0)]()[this[_0x1398b7(0x197)]]:null;},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x22b)]=function(){const _0xba7c9c=_0x23a158;Sprite_Clickable[_0xba7c9c(0x281)]['update'][_0xba7c9c(0x15f)](this),this[_0xba7c9c(0x3c3)](),this['updatePosition'](),this['checkOpacity'](),this[_0xba7c9c(0x205)](),this['updateGraphic'](),this[_0xba7c9c(0x220)](),this[_0xba7c9c(0x252)](),this[_0xba7c9c(0x28f)]();},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x3c3)]=function(){const _0x513bea=_0x23a158,_0x15f8f5=this[_0x513bea(0x230)]();if(this['_position']===_0x15f8f5)return;this[_0x513bea(0x163)]=_0x15f8f5;this[_0x513bea(0x2fe)]<0xff&&this[_0x513bea(0x15b)]()&&_0x15f8f5!==this[_0x513bea(0x297)]()&&this[_0x513bea(0x20e)](0xff);if(_0x15f8f5===this['defaultPosition']()&&this[_0x513bea(0x1a6)]<=0x0&&this[_0x513bea(0x2fe)]>0x0)this[_0x513bea(0x20e)](0x0);else this[_0x513bea(0x1a6)]<=0x0&&this[_0x513bea(0x2fe)]<0xff&&this[_0x513bea(0x1d6)]();this[_0x513bea(0x384)]();},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['checkTargetPositions']=function(){const _0x4b4e46=_0x23a158,_0x3172ea=this[_0x4b4e46(0x196)]();if(!_0x3172ea)return;let _0x59b82f=![];if(this[_0x4b4e46(0x26c)]!==_0x3172ea[_0x4b4e46(0x223)])_0x59b82f=!![];else this[_0x4b4e46(0x2d2)]!==_0x3172ea[_0x4b4e46(0x225)]&&(_0x59b82f=!![]);_0x59b82f&&this[_0x4b4e46(0x384)]();},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x384)]=function(){const _0xb44ded=_0x23a158,_0x1885ab=Window_BTB_TurnOrder[_0xb44ded(0x2bb)],_0x447415=this[_0xb44ded(0x17f)](),_0x28ffbc=_0x1885ab[_0xb44ded(0x33b)],_0x932c44=_0x1885ab['SubjectDistance'],_0x240d75=SceneManager[_0xb44ded(0x2b7)][_0xb44ded(0x39a)];if(!_0x240d75)return;const _0x15b8c6=this['containerPosition']();this[_0xb44ded(0x2e0)]=_0x1885ab[_0xb44ded(0x1e6)],this[_0xb44ded(0x1e3)]=_0x447415?_0x1885ab['SpriteThin']*_0x15b8c6:0x0,this['_positionTargetY']=_0x447415?0x0:_0x1885ab[_0xb44ded(0x29e)]*_0x15b8c6,_0x15b8c6>0x0&&(this[_0xb44ded(0x1e3)]+=_0x447415?_0x932c44:0x0,this[_0xb44ded(0x311)]+=_0x447415?0x0:_0x932c44),_0x28ffbc?this['_positionTargetX']=_0x447415?_0x240d75[_0xb44ded(0x223)]-this[_0xb44ded(0x1e3)]-_0x1885ab[_0xb44ded(0x29e)]:0x0:this[_0xb44ded(0x311)]=_0x447415?0x0:_0x240d75['height']-this[_0xb44ded(0x311)]-_0x1885ab['SpriteThin'];},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['updatePosition']=function(){const _0x343d3f=_0x23a158;if(this[_0x343d3f(0x1a6)]>0x0)return;if(this[_0x343d3f(0x2e0)]>0x0){const _0x772754=this[_0x343d3f(0x2e0)];this['x']=(this['x']*(_0x772754-0x1)+this[_0x343d3f(0x1e3)])/_0x772754,this['y']=(this['y']*(_0x772754-0x1)+this['_positionTargetY'])/_0x772754,this[_0x343d3f(0x2e0)]--;}if(this[_0x343d3f(0x2e0)]<=0x0){this['x']=this[_0x343d3f(0x1e3)],this['y']=this[_0x343d3f(0x311)];if(this[_0x343d3f(0x2fe)]<0xff&&!this['_isBattleOver']&&this[_0x343d3f(0x1a6)]<=0x0){const _0x517c8e=this[_0x343d3f(0x15b)]();_0x517c8e&&(this[_0x343d3f(0x2f0)]=_0x517c8e[_0x343d3f(0x2a4)]()&&_0x517c8e['isAppeared']()?0xff:0x0);}}},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['defaultPosition']=function(){const _0x2a2742=_0x23a158,_0x5b0611=Window_BTB_TurnOrder['Settings'],_0x3f3dba=this[_0x2a2742(0x17f)]()?_0x5b0611[_0x2a2742(0x247)]:_0x5b0611[_0x2a2742(0x31e)];return _0x3f3dba+0x1;},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['containerWindow']=function(){const _0x22cc07=_0x23a158;return SceneManager[_0x22cc07(0x2b7)]['_btbTurnOrderWindow'];},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x230)]=function(){const _0x23098e=_0x23a158,_0x569f14=this[_0x23098e(0x15b)]();if(!_0x569f14)return this[_0x23098e(0x297)]();if(_0x569f14===BattleManager[_0x23098e(0x160)])return 0x0;if(BattleManager[_0x23098e(0x310)][_0x23098e(0x253)](_0x569f14)){const _0x35f071=BattleManager[_0x23098e(0x310)][_0x23098e(0x1ea)](_0x569f14)+0x1;return _0x35f071;}return this[_0x23098e(0x297)]();},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x20e)]=function(_0x1d54a3){const _0x28e3b7=_0x23a158,_0x10c87e=Window_BTB_TurnOrder[_0x28e3b7(0x2bb)];this[_0x28e3b7(0x1a6)]=_0x10c87e[_0x28e3b7(0x1e6)],this[_0x28e3b7(0x2f0)]=_0x1d54a3;},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x1d6)]=function(){const _0x495ffc=_0x23a158,_0x2ead06=this['battler']();if(!_0x2ead06)return;if(this[_0x495ffc(0x337)]===_0x2ead06[_0x495ffc(0x2a4)]()&&this['_isAppeared']===_0x2ead06[_0x495ffc(0x296)]())return;this[_0x495ffc(0x337)]=_0x2ead06[_0x495ffc(0x2a4)](),this[_0x495ffc(0x22e)]=_0x2ead06[_0x495ffc(0x296)]();let _0x261cdf=this[_0x495ffc(0x337)]&&this[_0x495ffc(0x22e)]?0xff:0x0;this['startFade'](_0x261cdf);},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x205)]=function(){const _0x30886f=_0x23a158;if(this[_0x30886f(0x1a6)]>0x0){const _0x46dfb7=this[_0x30886f(0x1a6)];this[_0x30886f(0x2fe)]=(this[_0x30886f(0x2fe)]*(_0x46dfb7-0x1)+this[_0x30886f(0x2f0)])/_0x46dfb7,this[_0x30886f(0x1a6)]--,this[_0x30886f(0x1a6)]<=0x0&&(this[_0x30886f(0x3c3)](),this[_0x30886f(0x2e0)]=0x0,this[_0x30886f(0x25b)](),this[_0x30886f(0x2fe)]=this[_0x30886f(0x2f0)]);}if(this[_0x30886f(0x2e7)])return;BattleManager[_0x30886f(0x208)]===_0x30886f(0x199)&&(this[_0x30886f(0x2e7)]=!![],this[_0x30886f(0x20e)](0x0));},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x27a)]=function(){const _0x34af69=_0x23a158,_0x128ab4=this[_0x34af69(0x15b)]();if(!_0x128ab4)return;const _0x38a47c=Window_BTB_TurnOrder[_0x34af69(0x2bb)],_0x2a6e81=this['_unit']===$gameParty?'Actor':_0x34af69(0x1cb);let _0xf3933b=_0x128ab4[_0x34af69(0x29d)]();if(_0x128ab4[_0x34af69(0x1cf)]()&&_0xf3933b===_0x34af69(0x33f))_0xf3933b=_0x34af69(0x2b5);else _0x128ab4[_0x34af69(0x18a)]()&&_0xf3933b===_0x34af69(0x280)&&(_0xf3933b=_0x34af69(0x33f));if(this[_0x34af69(0x1da)]!==_0xf3933b)return this[_0x34af69(0x386)]();switch(this['_graphicType']){case _0x34af69(0x2b5):if(this['_graphicFaceName']!==_0x128ab4[_0x34af69(0x2fa)]())return this['processUpdateGraphic']();if(this['_graphicFaceIndex']!==_0x128ab4[_0x34af69(0x37e)]())return this[_0x34af69(0x386)]();break;case'icon':if(this[_0x34af69(0x258)]!==_0x128ab4[_0x34af69(0x183)]())return this['processUpdateGraphic']();break;case'enemy':if(_0x128ab4['hasSvBattler']()){if(this[_0x34af69(0x158)]!==_0x128ab4['svBattlerName']())return this[_0x34af69(0x386)]();}else{if(this[_0x34af69(0x209)]!==_0x128ab4[_0x34af69(0x338)]())return this['processUpdateGraphic']();}break;case _0x34af69(0x280):if(_0x128ab4[_0x34af69(0x1cf)]()){if(this['_graphicSv']!==_0x128ab4['battlerName']())return this[_0x34af69(0x386)]();}else{if(this['_graphicEnemy']!==_0x128ab4['battlerName']())return this['processUpdateGraphic']();}break;}},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x386)]=function(){const _0x454ee6=_0x23a158,_0x190b4c=this[_0x454ee6(0x15b)]();if(!_0x190b4c)return;this[_0x454ee6(0x1da)]=_0x190b4c[_0x454ee6(0x29d)]();if(_0x190b4c[_0x454ee6(0x1cf)]()&&this[_0x454ee6(0x1da)]===_0x454ee6(0x33f))this[_0x454ee6(0x1da)]=_0x454ee6(0x2b5);else _0x190b4c[_0x454ee6(0x18a)]()&&this['_graphicType']===_0x454ee6(0x280)&&(this['_graphicType']='enemy');let _0x4c2b40;switch(this['_graphicType']){case _0x454ee6(0x2b5):this[_0x454ee6(0x2f4)]=_0x190b4c[_0x454ee6(0x2fa)](),this[_0x454ee6(0x1d1)]=_0x190b4c[_0x454ee6(0x37e)](),_0x4c2b40=ImageManager[_0x454ee6(0x39e)](this['_graphicFaceName']),_0x4c2b40['addLoadListener'](this[_0x454ee6(0x19f)][_0x454ee6(0x169)](this,_0x4c2b40));break;case _0x454ee6(0x1ec):this[_0x454ee6(0x258)]=_0x190b4c['createTurnOrderBTBGraphicIconIndex'](),_0x4c2b40=ImageManager[_0x454ee6(0x2f8)](_0x454ee6(0x322)),_0x4c2b40[_0x454ee6(0x3bb)](this['changeIconGraphicBitmap'][_0x454ee6(0x169)](this,_0x4c2b40));break;case _0x454ee6(0x33f):if(_0x190b4c[_0x454ee6(0x2aa)]())this['_graphicSv']=_0x190b4c[_0x454ee6(0x1f5)](),_0x4c2b40=ImageManager[_0x454ee6(0x245)](this[_0x454ee6(0x158)]),_0x4c2b40[_0x454ee6(0x3bb)](this[_0x454ee6(0x35d)][_0x454ee6(0x169)](this,_0x4c2b40));else $gameSystem[_0x454ee6(0x3bd)]()?(this[_0x454ee6(0x209)]=_0x190b4c[_0x454ee6(0x338)](),_0x4c2b40=ImageManager[_0x454ee6(0x3b2)](this[_0x454ee6(0x209)]),_0x4c2b40[_0x454ee6(0x3bb)](this[_0x454ee6(0x303)][_0x454ee6(0x169)](this,_0x4c2b40))):(this[_0x454ee6(0x209)]=_0x190b4c[_0x454ee6(0x338)](),_0x4c2b40=ImageManager[_0x454ee6(0x214)](this[_0x454ee6(0x209)]),_0x4c2b40[_0x454ee6(0x3bb)](this[_0x454ee6(0x303)][_0x454ee6(0x169)](this,_0x4c2b40)));break;case _0x454ee6(0x280):this[_0x454ee6(0x158)]=_0x190b4c['battlerName'](),_0x4c2b40=ImageManager[_0x454ee6(0x245)](this[_0x454ee6(0x158)]),_0x4c2b40[_0x454ee6(0x3bb)](this[_0x454ee6(0x35d)]['bind'](this,_0x4c2b40));break;}},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x19f)]=function(_0x56a06d){const _0x2b9d25=_0x23a158,_0x15e07d=this[_0x2b9d25(0x1d1)],_0x5c4478=this[_0x2b9d25(0x3b4)](),_0x51b5c0=this[_0x2b9d25(0x320)](),_0x24931c=Math['max'](_0x5c4478,_0x51b5c0);this[_0x2b9d25(0x173)][_0x2b9d25(0x2b0)]=new Bitmap(_0x5c4478,_0x51b5c0);const _0x3d4dbb=this[_0x2b9d25(0x173)]['bitmap'],_0x3a661b=ImageManager[_0x2b9d25(0x289)],_0x4c0563=ImageManager[_0x2b9d25(0x2c1)],_0x5494f8=_0x24931c/Math[_0x2b9d25(0x29c)](_0x3a661b,_0x4c0563),_0xac3c3b=ImageManager[_0x2b9d25(0x289)],_0x2ae83b=ImageManager['faceHeight'],_0x243ccc=_0x15e07d%0x4*_0x3a661b+(_0x3a661b-_0xac3c3b)/0x2,_0x2c3bf0=Math[_0x2b9d25(0x24a)](_0x15e07d/0x4)*_0x4c0563+(_0x4c0563-_0x2ae83b)/0x2,_0x4e92aa=(_0x5c4478-_0x3a661b*_0x5494f8)/0x2,_0xdeb765=(_0x51b5c0-_0x4c0563*_0x5494f8)/0x2;_0x3d4dbb['blt'](_0x56a06d,_0x243ccc,_0x2c3bf0,_0xac3c3b,_0x2ae83b,_0x4e92aa,_0xdeb765,_0x24931c,_0x24931c);},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['changeIconGraphicBitmap']=function(_0x47fbac){const _0x1cfc86=_0x23a158,_0x174824=this['_graphicIconIndex'],_0x2ff767=this['bitmapWidth'](),_0x13cc58=this[_0x1cfc86(0x320)]();this[_0x1cfc86(0x173)][_0x1cfc86(0x2b0)]=new Bitmap(_0x2ff767,_0x13cc58);const _0x42d95c=this[_0x1cfc86(0x173)][_0x1cfc86(0x2b0)],_0x2a3d52=ImageManager[_0x1cfc86(0x20f)],_0x5ce935=ImageManager[_0x1cfc86(0x3b6)],_0x21dd28=Math[_0x1cfc86(0x2af)](_0x2a3d52,_0x5ce935,_0x2ff767,_0x13cc58),_0x1f3aaf=_0x174824%0x10*_0x2a3d52,_0x4388e6=Math['floor'](_0x174824/0x10)*_0x5ce935,_0x2d9af3=Math[_0x1cfc86(0x24a)](Math[_0x1cfc86(0x29c)](_0x2ff767-_0x21dd28,0x0)/0x2),_0x370b5f=Math[_0x1cfc86(0x24a)](Math['max'](_0x13cc58-_0x21dd28,0x0)/0x2);_0x42d95c[_0x1cfc86(0x27f)](_0x47fbac,_0x1f3aaf,_0x4388e6,_0x2a3d52,_0x5ce935,_0x2d9af3,_0x370b5f,_0x21dd28,_0x21dd28);},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)]['changeSvActorGraphicBitmap']=function(_0xb62675){const _0x49432b=_0x23a158,_0x11ec30=this[_0x49432b(0x3b4)](),_0x5d4532=this[_0x49432b(0x320)](),_0x16848f=Math[_0x49432b(0x2af)](_0x11ec30,_0x5d4532);this[_0x49432b(0x173)]['bitmap']=new Bitmap(_0x11ec30,_0x5d4532);const _0x83d7e8=this['_graphicSprite']['bitmap'],_0x19e396=this[_0x49432b(0x158)][_0x49432b(0x1ca)](/\$/i),_0xe356e1=_0x19e396?0x1:ImageManager[_0x49432b(0x265)],_0x52836e=_0x19e396?0x1:ImageManager[_0x49432b(0x198)],_0xcd84af=_0xb62675['width']/_0xe356e1,_0x56e778=_0xb62675[_0x49432b(0x225)]/_0x52836e,_0x3b85aa=Math[_0x49432b(0x2af)](0x1,_0x16848f/_0xcd84af,_0x16848f/_0x56e778),_0x13991c=_0xcd84af*_0x3b85aa,_0xbd4356=_0x56e778*_0x3b85aa,_0x2abd51=Math[_0x49432b(0x1a2)]((_0x11ec30-_0x13991c)/0x2),_0x108523=Math[_0x49432b(0x1a2)]((_0x5d4532-_0xbd4356)/0x2);_0x83d7e8['blt'](_0xb62675,0x0,0x0,_0xcd84af,_0x56e778,_0x2abd51,_0x108523,_0x13991c,_0xbd4356);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x303)]=function(_0x515b59){const _0x32ff9b=_0x23a158,_0x1c8030=Window_BTB_TurnOrder[_0x32ff9b(0x2bb)],_0x1cfd51=this[_0x32ff9b(0x3b4)](),_0x506376=this[_0x32ff9b(0x320)](),_0x3988e1=Math[_0x32ff9b(0x2af)](_0x1cfd51,_0x506376);this['_graphicSprite'][_0x32ff9b(0x2b0)]=new Bitmap(_0x1cfd51,_0x506376);const _0x366340=this[_0x32ff9b(0x173)][_0x32ff9b(0x2b0)],_0x282f6c=Math['min'](0x1,_0x3988e1/_0x515b59[_0x32ff9b(0x223)],_0x3988e1/_0x515b59[_0x32ff9b(0x225)]),_0x4b4bb=_0x515b59[_0x32ff9b(0x223)]*_0x282f6c,_0x433242=_0x515b59[_0x32ff9b(0x225)]*_0x282f6c,_0x11093b=Math[_0x32ff9b(0x1a2)]((_0x1cfd51-_0x4b4bb)/0x2),_0x1e0273=Math[_0x32ff9b(0x1a2)]((_0x506376-_0x433242)/0x2);_0x366340[_0x32ff9b(0x27f)](_0x515b59,0x0,0x0,_0x515b59['width'],_0x515b59[_0x32ff9b(0x225)],_0x11093b,_0x1e0273,_0x4b4bb,_0x433242);},Sprite_BTB_TurnOrder_Battler['prototype'][_0x23a158(0x220)]=function(){const _0x8c4346=_0x23a158,_0x51bfe9=this[_0x8c4346(0x15b)]();if(!_0x51bfe9)return;if(!_0x51bfe9[_0x8c4346(0x18a)]())return;if(this['_graphicHue']===_0x51bfe9[_0x8c4346(0x315)]())return;this['_graphicHue']=_0x51bfe9[_0x8c4346(0x315)](),this['_graphicSprite'][_0x8c4346(0x33e)](_0x51bfe9[_0x8c4346(0x2aa)]()?0x0:this[_0x8c4346(0x195)]);},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x252)]=function(){const _0x303b60=_0x23a158;if(!this[_0x303b60(0x377)])return;const _0x1cf202=this[_0x303b60(0x15b)]();if(!_0x1cf202)return;if(this[_0x303b60(0x1d2)]===_0x1cf202['_letter']&&this[_0x303b60(0x1d8)]===_0x1cf202['_plural'])return;this['_letter']=_0x1cf202['_letter'],this['_plural']=_0x1cf202[_0x303b60(0x1d8)];const _0x4669e7=Window_BTB_TurnOrder[_0x303b60(0x2bb)],_0x976222=this['isHorz'](),_0x578bc8=this[_0x303b60(0x3b4)](),_0xd5a731=this[_0x303b60(0x320)](),_0x4628ea=this[_0x303b60(0x377)]['bitmap'];_0x4628ea[_0x303b60(0x378)]();if(!this[_0x303b60(0x1d8)])return;_0x4628ea[_0x303b60(0x361)]=_0x4669e7['EnemyBattlerFontFace']||$gameSystem[_0x303b60(0x267)](),_0x4628ea[_0x303b60(0x2d4)]=_0x4669e7[_0x303b60(0x36a)]||0x10,_0x976222?_0x4628ea[_0x303b60(0x375)](this[_0x303b60(0x1d2)][_0x303b60(0x1e9)](),0x0,_0xd5a731/0x2,_0x578bc8,_0xd5a731/0x2,_0x303b60(0x2a9)):_0x4628ea[_0x303b60(0x375)](this[_0x303b60(0x1d2)][_0x303b60(0x1e9)](),0x0,0x2,_0x578bc8-0x8,_0xd5a731-0x4,_0x303b60(0x374));},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x28f)]=function(){const _0x3da581=_0x23a158,_0x539313=this[_0x3da581(0x15b)]();if(!_0x539313)return;const _0x40fb19=_0x539313['battler']();if(!_0x40fb19)return;const _0x54ece5=_0x40fb19[_0x3da581(0x2dc)]();if(!_0x54ece5)return;this[_0x3da581(0x3a1)](_0x54ece5[_0x3da581(0x1f2)]);},Sprite_BTB_TurnOrder_Battler[_0x23a158(0x281)][_0x23a158(0x17b)]=function(){const _0x3c4a6b=_0x23a158;return this[_0x3c4a6b(0x15b)]();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x353)]=Window_Base[_0x23a158(0x281)][_0x23a158(0x3c6)],Window_Base[_0x23a158(0x281)][_0x23a158(0x3c6)]=function(_0x53cae5,_0x2bfa35,_0x1715a7){const _0x5e434d=_0x23a158;return _0x1715a7=VisuMZ[_0x5e434d(0x287)][_0x5e434d(0x353)][_0x5e434d(0x15f)](this,_0x53cae5,_0x2bfa35,_0x1715a7),_0x1715a7=this[_0x5e434d(0x29f)](_0x53cae5,_0x2bfa35,_0x1715a7),_0x1715a7;},VisuMZ[_0x23a158(0x287)][_0x23a158(0x2a8)]=Window_Base[_0x23a158(0x281)][_0x23a158(0x334)],Window_Base[_0x23a158(0x281)][_0x23a158(0x334)]=function(_0x13f4f8,_0x307691,_0x23dec0,_0x3be158){const _0x1faaf0=_0x23a158;BattleManager[_0x1faaf0(0x1ed)]()&&this[_0x1faaf0(0x2ba)]===Window_BattleItem?this[_0x1faaf0(0x2ad)](_0x13f4f8,_0x307691,_0x23dec0,_0x3be158):VisuMZ[_0x1faaf0(0x287)][_0x1faaf0(0x2a8)][_0x1faaf0(0x15f)](this,_0x13f4f8,_0x307691,_0x23dec0,_0x3be158),this[_0x1faaf0(0x316)]();},Window_Base[_0x23a158(0x281)]['drawItemNumberBTB']=function(_0x52db8c,_0x353b9b,_0x22e19f,_0x34298e){const _0x9054dd=_0x23a158,_0x574fe0=VisuMZ[_0x9054dd(0x287)][_0x9054dd(0x2bb)]['General'],_0x47dc90=BattleManager[_0x9054dd(0x1fa)]||$gameParty['members']()[0x0],_0x20f4c1=this[_0x9054dd(0x29f)](_0x47dc90,_0x52db8c,''),_0x5ee3ee=this[_0x9054dd(0x2ec)](_0x20f4c1)['width'],_0x5cff6c=_0x574fe0[_0x9054dd(0x1d7)];let _0x50ade2=_0x353b9b+_0x34298e-_0x5ee3ee;if(_0x20f4c1==='')VisuMZ[_0x9054dd(0x287)]['Window_Base_drawItemNumber']['call'](this,_0x52db8c,_0x353b9b,_0x22e19f,_0x34298e);else{if(this['isDrawItemNumber'](_0x52db8c)){this[_0x9054dd(0x316)]();const _0x2f1bd4=VisuMZ[_0x9054dd(0x362)][_0x9054dd(0x2bb)][_0x9054dd(0x32a)];this[_0x9054dd(0x1b9)][_0x9054dd(0x2d4)]=_0x2f1bd4[_0x9054dd(0x2ab)];if(_0x5cff6c){const _0x74766=_0x2f1bd4[_0x9054dd(0x1f0)],_0xacf7a6=_0x74766[_0x9054dd(0x1aa)]($gameParty[_0x9054dd(0x1c0)](_0x52db8c)),_0x477bcf=this['textWidth'](_0xacf7a6+this[_0x9054dd(0x254)]());_0x50ade2-=_0x477bcf;}else _0x34298e-=this[_0x9054dd(0x29b)](this[_0x9054dd(0x254)]())+_0x5ee3ee;VisuMZ[_0x9054dd(0x287)][_0x9054dd(0x2a8)][_0x9054dd(0x15f)](this,_0x52db8c,_0x353b9b,_0x22e19f,_0x34298e);}}this[_0x9054dd(0x355)](_0x20f4c1,_0x50ade2,_0x22e19f);},Window_Base[_0x23a158(0x281)]['makeAdditionalCostTextBTB']=function(_0x88d538,_0x9bd70b,_0x42fcff){const _0x582a39=_0x23a158;if(!BattleManager[_0x582a39(0x1ed)]())return _0x42fcff;if(!_0x88d538)return _0x42fcff;if(!_0x9bd70b)return _0x42fcff;if(_0x9bd70b['note']['match'](VisuMZ[_0x582a39(0x287)][_0x582a39(0x237)][_0x582a39(0x32b)]))return _0x42fcff;let _0xd29b8f=_0x88d538['bravePointsCost'](_0x9bd70b);const _0x485745=VisuMZ[_0x582a39(0x287)][_0x582a39(0x2bb)][_0x582a39(0x177)],_0x2a28d0=_0x485745[_0x582a39(0x1d7)],_0x1052a5=_0x485745[_0x582a39(0x370)],_0x294b3a=_0x485745[_0x582a39(0x1d0)],_0x3470ca=_0x485745[_0x582a39(0x2a5)]||0x0,_0x55817e=_0x485745[_0x582a39(0x20a)],_0x1af5df=_0x485745[_0x582a39(0x1de)];if(DataManager[_0x582a39(0x222)](_0x9bd70b)&&this['constructor']===Window_ActorCommand){if(!_0x1052a5&&_0x9bd70b['id']===_0x88d538[_0x582a39(0x3ae)]())return _0x42fcff;if(!_0x294b3a&&_0x9bd70b['id']===_0x88d538['guardSkillId']())return _0x42fcff;}_0xd29b8f-=_0x3470ca;if(_0xd29b8f<0x0)return _0x42fcff;if(!_0x55817e&&_0xd29b8f===0x0)return _0x42fcff;if(!_0x1af5df&&_0xd29b8f===0x1)return _0x42fcff;const _0x52f2ec='\x5cI[%1]'[_0x582a39(0x1aa)](ImageManager['btbBravePointsIcon']),_0x5ab0f4=TextManager[_0x582a39(0x329)];let _0x254259=TextManager['btbCostFormat'][_0x582a39(0x1aa)](_0xd29b8f,_0x5ab0f4,_0x52f2ec);if(_0x42fcff==='')_0x42fcff+=_0x254259;else _0x2a28d0?_0x42fcff=_0x254259+this[_0x582a39(0x254)]()+_0x42fcff:_0x42fcff=_0x42fcff+this[_0x582a39(0x254)]()+_0x254259;return _0x42fcff;},Window_Selectable[_0x23a158(0x281)][_0x23a158(0x202)]=function(){return![];},VisuMZ[_0x23a158(0x287)][_0x23a158(0x257)]=Window_Selectable[_0x23a158(0x281)][_0x23a158(0x367)],Window_Selectable['prototype']['select']=function(_0x5281cf){const _0x563bc7=_0x23a158;VisuMZ['BattleSystemBTB'][_0x563bc7(0x257)][_0x563bc7(0x15f)](this,_0x5281cf),this[_0x563bc7(0x202)]()&&this[_0x563bc7(0x2ff)]&&this[_0x563bc7(0x1c4)]();},Window_Selectable[_0x23a158(0x281)][_0x23a158(0x1c4)]=function(){const _0x1565da=_0x23a158;BattleManager[_0x1565da(0x319)]();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x2e4)]=Window_Help[_0x23a158(0x281)][_0x23a158(0x175)],Window_Help[_0x23a158(0x281)][_0x23a158(0x175)]=function(_0xcfda97){const _0xbcb0cc=_0x23a158;BattleManager['isBTB']()&&_0xcfda97&&_0xcfda97[_0xbcb0cc(0x248)]&&_0xcfda97[_0xbcb0cc(0x248)][_0xbcb0cc(0x1ca)](VisuMZ[_0xbcb0cc(0x287)]['RegExp'][_0xbcb0cc(0x16e)])?this[_0xbcb0cc(0x2a3)](String(RegExp['$1'])):VisuMZ[_0xbcb0cc(0x287)]['Window_Help_setItem'][_0xbcb0cc(0x15f)](this,_0xcfda97);},VisuMZ['BattleSystemBTB'][_0x23a158(0x22d)]=Window_BattleLog[_0x23a158(0x281)]['startAction'],Window_BattleLog[_0x23a158(0x281)][_0x23a158(0x3aa)]=function(_0x2fa939,_0x354a2c,_0x23143a){const _0x2e52cb=_0x23a158;this[_0x2e52cb(0x178)](_0x2fa939)?this[_0x2e52cb(0x2fb)](_0x2fa939,_0x354a2c,_0x23143a):VisuMZ[_0x2e52cb(0x287)][_0x2e52cb(0x22d)][_0x2e52cb(0x15f)](this,_0x2fa939,_0x354a2c,_0x23143a);},Window_BattleLog[_0x23a158(0x281)][_0x23a158(0x1c5)]=function(_0x25431c,_0x168525,_0x5d16e4){const _0x5c5e5e=_0x23a158;VisuMZ[_0x5c5e5e(0x287)][_0x5c5e5e(0x22d)]['call'](this,_0x25431c,_0x168525,_0x5d16e4);},Window_BattleLog[_0x23a158(0x281)]['showBraveAnimationBTB']=function(_0xa6cad){const _0x12de89=_0x23a158;if(!BattleManager[_0x12de89(0x1ed)]())return![];if(!_0xa6cad)return![];if(!_0xa6cad[_0x12de89(0x18a)]())return![];if(_0xa6cad['_braveStartupAnimation'])return![];const _0x27ab9e=VisuMZ[_0x12de89(0x287)]['Settings'][_0x12de89(0x27c)];if(!_0x27ab9e['ShowEnemyBrave'])return![];if(_0x27ab9e[_0x12de89(0x2e8)]<=0x0)return![];return VisuMZ['BattleSystemBTB'][_0x12de89(0x2bb)][_0x12de89(0x27c)][_0x12de89(0x23b)];},Window_BattleLog[_0x23a158(0x281)][_0x23a158(0x2fb)]=function(_0x558946,_0x4f34c2,_0x1b996b){const _0x4522e6=_0x23a158;_0x558946[_0x4522e6(0x342)]=!![];let _0x184890=_0x558946[_0x4522e6(0x2e6)]();const _0x17761d=VisuMZ[_0x4522e6(0x287)][_0x4522e6(0x2bb)]['BraveAnimation'],_0x192659=_0x17761d['BraveAnimationID'],_0x498e8a=_0x17761d[_0x4522e6(0x1f6)];while(_0x184890--){this[_0x4522e6(0x170)]('showNormalAnimation',[_0x558946],_0x192659),_0x184890>0x0?this[_0x4522e6(0x170)](_0x4522e6(0x285),_0x498e8a):this[_0x4522e6(0x170)](_0x4522e6(0x390));}this[_0x4522e6(0x170)]('startActionBTB',_0x558946,_0x4f34c2,_0x1b996b);},VisuMZ['BattleSystemBTB'][_0x23a158(0x2ce)]=Window_ActorCommand[_0x23a158(0x281)]['addGuardCommand'],Window_ActorCommand[_0x23a158(0x281)]['addGuardCommand']=function(){const _0x2a9bff=_0x23a158;this[_0x2a9bff(0x2f9)](),VisuMZ[_0x2a9bff(0x287)][_0x2a9bff(0x2ce)]['call'](this);},Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x2f9)]=function(){const _0x25dd3d=_0x23a158;if(!this[_0x25dd3d(0x235)]())return;const _0x2ac737=this['commandStyle'](),_0xa9ff2e=TextManager['btbBraveCommand'],_0x35edc3=ImageManager[_0x25dd3d(0x37d)],_0x2569f9=_0x2ac737===_0x25dd3d(0x2e1)?_0xa9ff2e:_0x25dd3d(0x1b6)['format'](_0x35edc3,_0xa9ff2e);this[_0x25dd3d(0x244)](_0x2569f9,_0x25dd3d(0x18d),this['_actor'][_0x25dd3d(0x16c)]()),BattleManager[_0x25dd3d(0x2d6)]();},Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x235)]=function(){const _0x5750b3=_0x23a158;if(!BattleManager[_0x5750b3(0x1ed)]())return![];if(!VisuMZ[_0x5750b3(0x287)][_0x5750b3(0x2bb)][_0x5750b3(0x283)][_0x5750b3(0x238)])return![];if(this['_actor']&&this[_0x5750b3(0x1fa)][_0x5750b3(0x1cd)]())return![];return!![];},VisuMZ[_0x23a158(0x287)]['Window_ActorCommand_setup']=Window_ActorCommand[_0x23a158(0x281)]['setup'],Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x1c1)]=function(_0x3131c0){const _0x14f70f=_0x23a158;VisuMZ[_0x14f70f(0x287)][_0x14f70f(0x1a3)]['call'](this,_0x3131c0),this[_0x14f70f(0x1c2)]();},VisuMZ[_0x23a158(0x287)][_0x23a158(0x396)]=Window_Selectable[_0x23a158(0x281)]['cursorPagedown'],Window_Selectable['prototype'][_0x23a158(0x246)]=function(){const _0x357341=_0x23a158;this[_0x357341(0x321)]()?this[_0x357341(0x1fa)]&&!this[_0x357341(0x1fa)]['hideBraveTrait']()&&this['_actor'][_0x357341(0x16c)]()&&SceneManager[_0x357341(0x2b7)][_0x357341(0x212)]():VisuMZ['BattleSystemBTB']['Window_Selectable_cursorPagedown']['call'](this);},VisuMZ[_0x23a158(0x287)]['Window_Selectable_cursorPageup']=Window_Selectable['prototype'][_0x23a158(0x260)],Window_Selectable[_0x23a158(0x281)][_0x23a158(0x260)]=function(){const _0x469163=_0x23a158;this[_0x469163(0x321)]()?this['_actor']&&!this[_0x469163(0x1fa)][_0x469163(0x1cd)]()&&this['_actor']['numActions']()>0x1&&SceneManager[_0x469163(0x2b7)][_0x469163(0x39c)]():VisuMZ['BattleSystemBTB'][_0x469163(0x288)][_0x469163(0x15f)](this);},Window_Selectable[_0x23a158(0x281)][_0x23a158(0x321)]=function(){const _0x319eb9=_0x23a158;if(this[_0x319eb9(0x2ba)]!==Window_ActorCommand)return![];if(!SceneManager[_0x319eb9(0x1b8)]())return![];if(!BattleManager[_0x319eb9(0x1ed)]())return![];return VisuMZ['BattleSystemBTB'][_0x319eb9(0x2bb)][_0x319eb9(0x283)][_0x319eb9(0x3b1)];},VisuMZ['BattleSystemBTB'][_0x23a158(0x229)]=Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x250)],Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x250)]=function(){const _0x55f818=_0x23a158;VisuMZ[_0x55f818(0x287)]['Window_ActorCommand_makeCommandList'][_0x55f818(0x15f)](this),this[_0x55f818(0x1c2)]();},VisuMZ[_0x23a158(0x287)]['Window_Base_close']=Window_Base[_0x23a158(0x281)][_0x23a158(0x323)],Window_Base[_0x23a158(0x281)][_0x23a158(0x323)]=function(){const _0x40a014=_0x23a158;VisuMZ['BattleSystemBTB']['Window_Base_close']['call'](this),SceneManager['isSceneBattle']()&&this[_0x40a014(0x317)]&&this[_0x40a014(0x317)]();},Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x317)]=function(){const _0x520f78=_0x23a158;if(!this[_0x520f78(0x328)])return;this[_0x520f78(0x328)][_0x520f78(0x2b0)]&&this[_0x520f78(0x328)]['bitmap'][_0x520f78(0x164)](),this[_0x520f78(0x324)](this[_0x520f78(0x328)]),delete this[_0x520f78(0x328)];},Window_ActorCommand['prototype'][_0x23a158(0x1c2)]=function(){const _0x278c9a=_0x23a158;if(!BattleManager['isBTB']())return;if(!this['_actor'])return;this[_0x278c9a(0x317)]();if(this[_0x278c9a(0x1fa)][_0x278c9a(0x1cd)]())return;this[_0x278c9a(0x328)]=new Sprite(),this[_0x278c9a(0x264)](this['_btbActionSprite']),this[_0x278c9a(0x291)]();},Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x291)]=function(){const _0x8d8c9f=_0x23a158,_0x243466=VisuMZ[_0x8d8c9f(0x287)][_0x8d8c9f(0x2bb)][_0x8d8c9f(0x283)][_0x8d8c9f(0x162)];_0x243466?_0x243466[_0x8d8c9f(0x15f)](this,this[_0x8d8c9f(0x328)],this,this[_0x8d8c9f(0x1fa)]):this['modifyBTBActionCounterSprite_Fallback'][_0x8d8c9f(0x15f)](this,this[_0x8d8c9f(0x328)],this,this[_0x8d8c9f(0x1fa)]);},Window_ActorCommand[_0x23a158(0x281)][_0x23a158(0x350)]=function(){const _0x868dc0=_0x23a158,_0x548f0c=arguments[0x0],_0x42a4b9=arguments[0x1],_0x41b2a6=arguments[0x2];_0x548f0c['x']=Math[_0x868dc0(0x1a2)](_0x42a4b9[_0x868dc0(0x223)]/0x2),_0x548f0c['y']=0x0,_0x548f0c[_0x868dc0(0x1fb)]['x']=0.5,_0x548f0c[_0x868dc0(0x1fb)]['y']=0.5;const _0x547870=TextManager[_0x868dc0(0x1fd)],_0x92a9b7=TextManager[_0x868dc0(0x240)];let _0x3ee309=_0x547870[_0x868dc0(0x37b)](_0x41b2a6['numActions']());const _0x9e814e=_0x41b2a6[_0x868dc0(0x3a6)];_0x3ee309=_0x3ee309[_0x868dc0(0x1d4)](0x0,_0x9e814e)+_0x92a9b7+_0x3ee309[_0x868dc0(0x1d4)](_0x9e814e+0x1);const _0x59766c=new Bitmap(_0x42a4b9[_0x868dc0(0x223)],_0x42a4b9[_0x868dc0(0x351)]());_0x59766c[_0x868dc0(0x2d4)]=0x24,_0x59766c[_0x868dc0(0x375)](_0x3ee309,0x0,0x0,_0x59766c[_0x868dc0(0x223)],_0x59766c['height'],'center'),_0x548f0c[_0x868dc0(0x2b0)]=_0x59766c;},Window_ActorCommand[_0x23a158(0x281)]['isBattleItemWindowBTB']=function(){return BattleManager['isBTB']();},Window_ActorCommand[_0x23a158(0x281)]['applyBattleItemWindowBTB']=function(){const _0x2ba45e=_0x23a158,_0x998799=BattleManager['inputtingAction']();if(_0x998799){const _0x29a959=this[_0x2ba45e(0x32c)]();switch(_0x29a959){case _0x2ba45e(0x200):_0x998799['setAttack']();break;case'guard':_0x998799[_0x2ba45e(0x1e8)]();break;case _0x2ba45e(0x1f7):_0x998799[_0x2ba45e(0x21d)](this[_0x2ba45e(0x38a)]());break;default:_0x998799[_0x2ba45e(0x21d)](null);break;}}Window_Command['prototype'][_0x2ba45e(0x1c4)][_0x2ba45e(0x15f)](this);},Window_Base[_0x23a158(0x281)]['drawActorBravePoints']=function(_0x5b1ab4,_0x2ce773,_0x1da3b1,_0x5c6295,_0x31af6d){const _0x379934=_0x23a158;if(!_0x5b1ab4)return;if(!BattleManager[_0x379934(0x1ed)]())return;const _0x2f7b82=VisuMZ[_0x379934(0x287)]['Settings']['Window'],_0x213248=BattleManager[_0x379934(0x2a7)]()?_0x2f7b82[_0x379934(0x356)]:_0x2f7b82[_0x379934(0x3a2)],_0x40a5a4=_0x2f7b82['NeutralColor'],_0xf9c358=_0x2f7b82[_0x379934(0x293)],_0x16c9ea=_0x2f7b82[_0x379934(0x2e5)];let _0x43824b=0x0,_0x2fea76=0x0;_0x2fea76=_0x5b1ab4['bravePoints']();if(_0x2fea76>0x0)_0x43824b=_0xf9c358;if(_0x2fea76===0x0)_0x43824b=_0x40a5a4;if(_0x2fea76<0x0)_0x43824b=_0x16c9ea;const _0x17f5a3=_0x379934(0x203)[_0x379934(0x1aa)](_0x43824b,_0x2fea76),_0xc93236='\x5cI[%1]'[_0x379934(0x1aa)](ImageManager['btbBravePointsIcon']);_0x2fea76=_0x5b1ab4[_0x379934(0x395)]();if(_0x2fea76>0x0)_0x43824b=_0xf9c358;if(_0x2fea76===0x0)_0x43824b=_0x40a5a4;_0x2fea76<0x0&&(_0x43824b=_0x16c9ea);const _0x3e5e87=_0x379934(0x203)[_0x379934(0x1aa)](_0x43824b,_0x2fea76);let _0x16a15e=_0x213248['format'](_0x17f5a3,TextManager[_0x379934(0x329)],_0xc93236,_0x3e5e87);const _0x3c2cd5=this[_0x379934(0x2ec)](_0x16a15e)['width'];if(_0x31af6d==='center')_0x2ce773+=Math[_0x379934(0x1a2)]((_0x5c6295-_0x3c2cd5)/0x2);else _0x31af6d===_0x379934(0x374)&&(_0x2ce773+=Math[_0x379934(0x1a2)](_0x5c6295-_0x3c2cd5));this[_0x379934(0x355)](_0x16a15e,_0x2ce773,_0x1da3b1,_0x5c6295);},Window_StatusBase['prototype'][_0x23a158(0x277)]=function(_0x10a3c9){const _0x4938eb=_0x23a158;if(!_0x10a3c9)return![];if(!BattleManager[_0x4938eb(0x1ed)]())return![];if(!this[_0x4938eb(0x399)])return![];if(_0x10a3c9[_0x4938eb(0x1cd)]())return![];const _0x570a82=VisuMZ[_0x4938eb(0x287)][_0x4938eb(0x2bb)]['Window'],_0x443825=this[_0x4938eb(0x399)]();return _0x570a82['%1_display'['format'](_0x443825)];},VisuMZ[_0x23a158(0x287)][_0x23a158(0x243)]=Window_BattleStatus['prototype']['drawItemStatusListStyle'],Window_BattleStatus[_0x23a158(0x281)]['drawItemStatusListStyle']=function(_0x417ec5){const _0xc4b4e6=_0x23a158;VisuMZ[_0xc4b4e6(0x287)][_0xc4b4e6(0x243)][_0xc4b4e6(0x15f)](this,_0x417ec5);const _0x5a65af=this['actor'](_0x417ec5);if(this[_0xc4b4e6(0x277)](_0x5a65af)){const _0x4aee00=this[_0xc4b4e6(0x271)](_0x417ec5),_0x23bf70=$dataSystem[_0xc4b4e6(0x24c)]?0x4:0x3,_0x546660=_0x23bf70*0x80+(_0x23bf70-0x1)*0x8+0x4;let _0x58397a=_0x4aee00['x']+this[_0xc4b4e6(0x189)];VisuMZ[_0xc4b4e6(0x290)][_0xc4b4e6(0x2bb)][_0xc4b4e6(0x30a)][_0xc4b4e6(0x24b)]?_0x58397a=_0x4aee00['x']+ImageManager[_0xc4b4e6(0x289)]+0x8:_0x58397a+=ImageManager[_0xc4b4e6(0x20f)];const _0x123323=Math['round'](Math['min'](_0x4aee00['x']+_0x4aee00['width']-_0x546660,_0x58397a));let _0x35404d=_0x123323+0x88,_0x1a89ad=_0x4aee00['y'];_0x35404d+=0x88*($dataSystem[_0xc4b4e6(0x24c)]?0x3:0x2),_0x35404d+=this[_0xc4b4e6(0x1f3)](),_0x1a89ad+=this[_0xc4b4e6(0x168)]();const _0x11955f=this['getAlignmentBTB']();if(_0x35404d>_0x4aee00['x']+_0x4aee00[_0xc4b4e6(0x223)])return;this['drawActorBravePoints'](_0x5a65af,_0x35404d,_0x1a89ad,_0x4aee00['width'],_0x11955f);}},VisuMZ['BattleSystemBTB'][_0x23a158(0x2e2)]=Window_BattleStatus[_0x23a158(0x281)][_0x23a158(0x1b5)],Window_BattleStatus[_0x23a158(0x281)][_0x23a158(0x1b5)]=function(_0x5c5850){const _0x2d0c1b=_0x23a158;VisuMZ['BattleSystemBTB']['Window_BattleStatus_drawItemStatusXPStyle'][_0x2d0c1b(0x15f)](this,_0x5c5850);const _0x2244b8=this[_0x2d0c1b(0x2eb)](_0x5c5850);if(this['showBravePoints'](_0x2244b8)){const _0x1304a0=this[_0x2d0c1b(0x166)](_0x5c5850);let _0x4a3714=_0x1304a0['x'],_0x117d7b=_0x1304a0['y'];_0x4a3714+=this[_0x2d0c1b(0x1f3)](),_0x117d7b+=this['getOffsetY_BTB']();const _0x4d2b85=this[_0x2d0c1b(0x302)]();this[_0x2d0c1b(0x371)](_0x2244b8,_0x4a3714,_0x117d7b,_0x1304a0[_0x2d0c1b(0x223)],_0x4d2b85);}},Window_BattleStatus[_0x23a158(0x281)][_0x23a158(0x166)]=function(_0x525ea5){const _0x2cf865=_0x23a158,_0x387fce=this[_0x2cf865(0x2d5)](_0x525ea5);if(_0x387fce[_0x2cf865(0x223)]<ImageManager[_0x2cf865(0x289)])return _0x387fce;let _0x1bccaf=Math['round']((_0x387fce['width']-ImageManager[_0x2cf865(0x289)])/0x2);return _0x387fce[_0x2cf865(0x223)]=ImageManager['faceWidth'],_0x387fce['x']+=_0x1bccaf,_0x387fce;},Window_BattleStatus['prototype'][_0x23a158(0x302)]=function(){const _0xf0b13=_0x23a158,_0x72a3=VisuMZ[_0xf0b13(0x287)]['Settings'][_0xf0b13(0x283)],_0x49110f=this[_0xf0b13(0x399)]();return _0x72a3[_0xf0b13(0x332)[_0xf0b13(0x1aa)](_0x49110f)]||0x0;},Window_BattleStatus['prototype']['getOffsetX_BTB']=function(){const _0x28e96b=_0x23a158,_0x49789b=VisuMZ[_0x28e96b(0x287)][_0x28e96b(0x2bb)][_0x28e96b(0x283)],_0x21e0ee=this['battleLayoutStyle']();return _0x49789b[_0x28e96b(0x1ae)[_0x28e96b(0x1aa)](_0x21e0ee)]||0x0;},Window_BattleStatus['prototype'][_0x23a158(0x168)]=function(){const _0xd39dd0=_0x23a158,_0x1b53ad=VisuMZ[_0xd39dd0(0x287)][_0xd39dd0(0x2bb)][_0xd39dd0(0x283)],_0x2c198c=this[_0xd39dd0(0x399)]();return _0x1b53ad[_0xd39dd0(0x306)['format'](_0x2c198c)]||0x0;},Window_BattleSkill['prototype'][_0x23a158(0x202)]=function(){const _0x3711f6=_0x23a158;return BattleManager[_0x3711f6(0x1ed)]();},Window_BattleSkill['prototype'][_0x23a158(0x1c4)]=function(){const _0x357a49=_0x23a158,_0x2cfa1a=this[_0x357a49(0x1a0)](),_0x17f01f=BattleManager[_0x357a49(0x1b3)]();if(_0x17f01f)_0x17f01f[_0x357a49(0x21d)](_0x2cfa1a?_0x2cfa1a['id']:null);Window_SkillList[_0x357a49(0x281)][_0x357a49(0x1c4)]['call'](this);},Window_BattleItem[_0x23a158(0x281)][_0x23a158(0x202)]=function(){const _0x21c23f=_0x23a158;return BattleManager[_0x21c23f(0x1ed)]();},Window_BattleItem['prototype']['applyBattleItemWindowBTB']=function(){const _0x2bc966=_0x23a158,_0x1e97c7=this['item'](),_0x6d4f54=BattleManager[_0x2bc966(0x1b3)]();if(_0x6d4f54)_0x6d4f54[_0x2bc966(0x175)](_0x1e97c7?_0x1e97c7['id']:null);Window_ItemList['prototype'][_0x2bc966(0x1c4)][_0x2bc966(0x15f)](this);};function _0x39a2(){const _0x49b859=['_actionFusionRecipe','startTurn','Window_ActorCommand_makeCommandList','%1-%2','update','requestFauxAnimation','Window_BattleLog_startAction','_isAppeared','Item-%1-%2','containerPosition','applyBattleSystemBTBUserEffect','numActions','_itemIDs','isValid','canAddBraveCommand','_bypassAiValidCheck','RegExp','ShowCommand','cannotBraveTrait','sort','ShowEnemyBrave','onTurnEnd','onBattleStartBTB','startInput','RepositionTopHelpX','btbActionCurrent','toUpperCase','addInnerChild','Window_BattleStatus_drawItemStatusListStyle','addCommand','loadSvActor','cursorPagedown','MaxHorzSprites','note','MinBravePointsHardCap','floor','ShowFacesListStyle','optDisplayTp','makeActions','_ogWindowLayerY','makeSpeed','makeCommandList','Game_Battler_onTurnEnd','updateLetter','includes','skillCostSeparator','description','makeActionOrders','Window_Selectable_select','_graphicIconIndex','applyItemBattleSystemBTBUserEffect','_homeY','updatePosition','Game_BattlerBase_appear','BTB','updateBattleContainerOrder','createBattlerRect','cursorPageup','IconIndex','EnemyBattlerType','version','addChild','svActorHorzCells','VisuMZ_1_BattleCore','mainFontFace','BorderThickness','FusionFlex','Game_BattlerBase_canInput','BattleManager_startTurn','_containerWidth','Game_Action_isValid','Game_Actor_makeActions','index','setBattleSystemBTBTurnOrderVisible','itemLineRect','ConvertParams','_btbSkillFlexFusion','createAllWindows','getChildIndex','_scrollY','showBravePoints','9756910DEMFYd','useItem','updateGraphic','canUse','BraveAnimation','getTotalActionFusionRecipes','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[2];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','blt','svactor','prototype','splice','Window','getColor','waitCount','BtbTurnOrderEnemyFace','BattleSystemBTB','Window_Selectable_cursorPageup','faceWidth','btbRegisterFusions','boxWidth','clearActions','remove','recalculateHome','updateSelectionEffect','BattleCore','modifyBTBActionCounterSprite','ScreenBuffer','PositiveColor','_targetBattlerKey','ARRAYJSON','isAppeared','defaultPosition','allBattleMembers','7843IRoTyp','RepositionLogWindow','textWidth','max','TurnOrderBTBGraphicType','SpriteThin','makeAdditionalCostTextBTB','gainBravePoints','concat','%1BgColor2','setText','isAlive','ReduceShownBPCost','calcRegenBravePoints','isInputting','Window_Base_drawItemNumber','center','hasSvBattler','ItemQuantityFontSize','%1Mirror','drawItemNumberBTB','FaceIndex','min','bitmap','performCollapse','_btbSkillStrictFusion','canGuard','CancelAnimationID','face','Scene_Battle_onDisabledPartyCommandSelection','_scene','speed','Game_Battler_makeActionTimes','constructor','Settings','_btbTurnOrderGraphicType','appear','selectNextCommand','Game_Battler_clearActions','members','faceHeight','makeActionTimes','SpriteLength','ShowMarkerBorder','isTpb','createKeyJS','CenterHorz','isTurnBased','CalcActionSpeedJS','Class-%1-%2','commandCancelBTB','some','loseBravePoints','Window_ActorCommand_addGuardCommand','FUNC','Parse_Notetags_BravePointsUserJS','bravePointsCost','_containerHeight','pop','fontSize','itemRect','refreshStatusBTB','payBravePointsCost','DisplayPosition','_scrollX','STR','_turnOrderInnerSprite','mainSprite','BravePointSetTarget','MinBravePointsDefault','createBackgroundSprite','_positionDuration','text','Window_BattleStatus_drawItemStatusXPStyle','createTurnOrderBTBGraphicIconIndex','Window_Help_setItem','NegativeColor','braveAnimationTimes','_isBattleOver','BraveAnimationID','hide','initMembers','actor','textSizeEx','initHomePositions','btbPayItemFusionCosts','updateSidePosition','_fadeTarget','_tempBattler','createTurnOrderBTBGraphicType','EVAL','_graphicFaceName','Mechanics','split','traitObjects','loadSystem','addBraveCommand','TurnOrderBTBGraphicFaceName','queueBraveAnimationsBTB','ARRAYNUM','1514010Qwpjgw','opacity','active','bottom','BravePointPredictedCost','getAlignmentBTB','changeEnemyGraphicBitmap','inBattle','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','%1_offsetY','length','9lRvSLL','_homeX','BattleLayout','windowRect','processActionFusionsBTB','Scene_Boot_onDatabaseLoaded','_weapons','Game_Unit_makeActions','_actionBattlers','_positionTargetY','needsSelection','_btbItemFlexFusion','CommandName','battlerHue','resetFontSettings','destroyBTBActionCounters','Game_Party_removeActor','sortActionOrdersBTB','clearRect','updateTurnOrder','cancel','setActionFusionBTB','MaxVertSprites','ActorActionFusions','bitmapHeight','isUsePageUpDnShortcutBTB','IconSet','close','removeChild','NUM','_statusWindow','EnemyActionFusions','_btbActionSprite','btbBravePointsAbbr','ItemScene','HideBravePointCost','currentSymbol','status','BravePointStartFavor','MaxActionsDefault','_helpWindow','Game_Action_allowRandomSpeed','%1_align','checkActionsBTB','drawItemNumber','setHandler','FaceName','_isAlive','battlerName','CannotBrave','6944LuvhPy','OrderDirection','Game_Battler_useItem','filter','setHue','enemy','removeActionBattlersBTB','_btbTurnOrderFaceIndex','_braveStartupAnimation','clamp','getActionFusionRecipeSkills','createLetterSprite','setBTBGraphicIconIndex','BravePointCost','BtbTurnOrderActorIcon','%1Mute','Game_BattlerBase_canGuard','btbMatchesCurrentFusionAction','onDisabledPartyCommandSelection','Visible','applyItemUserEffect','onTurnEndBTB','modifyBTBActionCounterSprite_Fallback','lineHeight','BtbTurnOrderClearEnemyGraphic','Window_Base_makeAdditionalSkillCostText','BattleManager_startAction','drawTextEx','StatusPredictFmt','Actors','%1BgColor1','Game_Action_speed','currentAction','guardSkillId','ShowMarkerBg','changeSvActorGraphicBitmap','removeActor','compareBattlerSprites','onDatabaseLoaded','fontFace','ItemsEquipsCore','formAllPossibleFlexCombos','_windowLayer','boxHeight','bravePoints','select','_btbItemStrictFusion','getActionFusionRecipeItems','EnemyBattlerFontSize','_btbTurnOrderIconIndex','faceName','create','ceil','#000000','ShowCostForAttack','drawActorBravePoints','battleSys','BravePointAlterUser','right','drawText','BravePointsAbbr','_letterSprite','clear','EnableFusion','Game_Battler_performCollapse','repeat','MinBravePoints','btbBravePointsIcon','TurnOrderBTBGraphicFaceIndex','ARRAYSTR','_logWindow','MaxBravePoints','RepositionTopHelpY','createBTBTurnOrderWindow','calculateTargetPositions','exit','processUpdateGraphic','BravePointsFull','VisuMZ_1_SkillsStatesCore','BravePointsRegenAlive','currentExt','_guardUnleash','_unit','Game_Enemy_makeActions','_turnOrderContainer','createActorCommandWindowBTB','waitForAnimation','_bypassClearActions','createActorCommandWindow','148089dLiscN','_actorCommandWindow','predictedBravePoints','Window_Selectable_cursorPagedown','_fullWidth','VisuMZ_1_ItemsEquipsCore','battleLayoutStyle','_btbTurnOrderWindow','getBattleSystem','reduceBrave','Game_Action_setSkill','loadFace','isSkipPartyCommandWindow','cannotFusionNotetagBTB','setBlendColor','StatusDisplayFmt','Game_Battler_onBattleStart','SystemTurnOrderVisibility','fillRect','_actionInputIndex','EnemyBattlerDrawLetter','TurnOrder','_surprise','startAction','join','BTB_MAX_BRAVEPOINTS_DEFAULT','useItemBTB','attackSkillId','%1SystemBorder','BattleManager_isTpb','BraveShortcuts','loadSvEnemy','getStrictActionFusionCombinationsBTB','bitmapWidth','updateTurnOrderBTB','iconHeight','_btbTurnOrderVisible','makeDeepCopy','30696EfEoWV','BravePointCostFmt','addLoadListener','%1BorderColor','isSideView','Game_BattlerBase_hide','JsBravePointsUser','BravePointAlterTarget','ParseSkillNotetags','canActionFusionWithBTB','checkPosition','Actor','return\x200','makeAdditionalSkillCostText','top','allowRandomSpeed','%1AnimationID','_btbTurnOrderFaceName','_graphicSv','subject','repositionLogWindowBTB','battler','BattleManager_startInput','DisplayOffsetX','BTB_MAX_ACTIONS_HARD_CAP','call','_subject','ActionSlot','DrawActionCountersJS','_position','destroy','visible','itemRectPortraitBTB','Weapon-%1-%2','getOffsetY_BTB','bind','1966528sbTbyW','ActorBattlerIcon','canBrave','setBravePoints','BTB_Help','Game_Action_setItem','push','process_VisuMZ_BattleSystemBTB_Notetags','gradientFillRect','_graphicSprite','Game_BattlerBase_canUse','setItem','map','General','showBraveAnimationBTB','updateVisibility','BravePointsIcon','getStateTooltipBattler','btbBraveCommand','isItem','HideBrave','isHorz','VisuMZ_0_CoreEngine','%1SystemBg','createTurnOrderBTBGraphicFaceName','TurnOrderBTBGraphicIconIndex','canPayActionFusionCombination','1030CnNZva','requestRefresh','BattleManager_battleSys','canInput','padding','isEnemy','_bravePoints','initBattleSystemBTB','brave','registerCommand','getSkillIdWithName','updateHomePosition','BtbTurnOrderEnemyIcon','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','createBorderSprite','_homeDuration','_graphicHue','containerWindow','_index','svActorVertCells','battleEnd','addChildAt','_backgroundSprite','minBravePoints','Game_System_initialize','ARRAYFUNC','changeFaceGraphicBitmap','item','ARRAYEVAL','round','Window_ActorCommand_setup','BattleManager_makeActionOrders','onRestrict','_fadeDuration','40mHWxOy','process_VisuMZ_BattleSystemBTB_JS','removeActionFusionIngredients','format','predictedBravePointCost','isActiveTpb','FusionStrict','%1_offsetX','STRUCT','_skillIDs','maxBattleMembers','_ogWindowLayerX','inputtingAction','BattleManager_isTurnBased','drawItemStatusXPStyle','\x5cI[%1]%2','JsBravePointsTarget','isSceneBattle','contents','BravePointRegen','JSON','BTB_MAX_ACTIONS_DEFAULT','createGraphicSprite','_targetIndex','MaxActions','numItems','setup','createBTBActionCounters','_targetHomeX','applyBattleItemWindowBTB','startActionBTB','Actor-%1-%2','btbParseFusionData','regenerateBravePoints','Enemies','match','Enemy','Cancel','hideBraveTrait','makeMultiActionsBTB','isActor','ShowCostForGuard','_graphicFaceIndex','_letter','ParseItemNotetags','substring','7PqNzPc','checkOpacity','CostPosition','_plural','createInitialPositions','_graphicType','left','Scene_Battle_createActorCommandWindow','isBattleSystemBTBTurnOrderVisible','Show_1_BP_Cost','createTurnOrderBTBGraphicFaceIndex','EnemyBattlerFaceIndex','getItemIdWithName','createChildren','_positionTargetX','BravePointSkillCost','clearTurnOrderBTBGraphics','UpdateFrames','name','setGuard','trim','indexOf','getFlexActionFusionCombinationsBTB','icon','isBTB','_actions','BravePointBattleStart','ItemQuantityFmt','Armor-%1-%2','_blendColor','getOffsetX_BTB','commandBrave','svBattlerName','WaitFrames','singleSkill','BTB_MIN_BRAVEPOINTS_DEFAULT','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','_actor','anchor','BTB_MIN_BRAVEPOINTS_HARD_CAP','btbActionSlot','BattleManager_isActiveTpb','BravePointItemCost','attack','maxBraveActions','isBattleItemWindowBTB','\x5cC[%1]%2\x5cC[0]','EnemyBattlerIcon','updateOpacity','formFlexCombo','isForFriend','_phase','_graphicEnemy','Show_0_BP_Cost','test','maxBravePoints','cancelBrave','startFade','iconWidth','CannotFusion','_targetHomeY','performBrave','BravePointSetUser','loadEnemy','BTB_MAX_BRAVEPOINTS_HARD_CAP','commandCancel','_armors','Game_Action_applyItemUserEffect','parse','482051bQYBYa','RepositionTopForHelp','ActorBattlerType','setSkill','process_VisuMZ_BattleSystemBTB','canProcessActionFusionsBTB','updateGraphicHue','initialize','isSkill','width','_fullHeight','height','Game_Battler_onRestrict'];_0x39a2=function(){return _0x49b859;};return _0x39a2();}function Window_BTB_TurnOrder(){this['initialize'](...arguments);}Window_BTB_TurnOrder[_0x23a158(0x281)]=Object['create'](Window_Base['prototype']),Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x2ba)]=Window_BTB_TurnOrder,Window_BTB_TurnOrder[_0x23a158(0x2bb)]=VisuMZ[_0x23a158(0x287)][_0x23a158(0x2bb)][_0x23a158(0x3a8)],Window_BTB_TurnOrder['prototype']['initialize']=function(){const _0x175c40=_0x23a158,_0x45df5b=this[_0x175c40(0x30b)]();this[_0x175c40(0x2ed)](_0x45df5b),Window_Base['prototype'][_0x175c40(0x221)][_0x175c40(0x15f)](this,_0x45df5b),this['createBattlerSprites'](),this[_0x175c40(0x179)](),this[_0x175c40(0x2fe)]=0x0;},Window_BTB_TurnOrder[_0x23a158(0x281)]['windowRect']=function(){const _0x6de62f=_0x23a158;return this['createBattlerRect']($gameParty[_0x6de62f(0x1b1)](),0x9,!![]);},Window_BTB_TurnOrder['prototype'][_0x23a158(0x2ed)]=function(_0x4f7927){const _0x9ad0ad=_0x23a158;this[_0x9ad0ad(0x1c3)]=this[_0x9ad0ad(0x309)]=_0x4f7927['x'],this[_0x9ad0ad(0x211)]=this[_0x9ad0ad(0x25a)]=_0x4f7927['y'],this[_0x9ad0ad(0x397)]=_0x4f7927[_0x9ad0ad(0x223)],this[_0x9ad0ad(0x224)]=_0x4f7927[_0x9ad0ad(0x225)],this[_0x9ad0ad(0x194)]=0x0;},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x25f)]=function(_0x144c93,_0x462551,_0x405afa){const _0xfbce9c=_0x23a158,_0x5c5104=Window_BTB_TurnOrder['Settings'],_0xe0bbc=this[_0xfbce9c(0x17f)]()?_0x5c5104['MaxHorzSprites']:_0x5c5104[_0xfbce9c(0x31e)],_0x42115a=Math[_0xfbce9c(0x2af)](_0xe0bbc,_0x144c93+_0x462551),_0x4f7ff5=SceneManager[_0xfbce9c(0x2b7)][_0xfbce9c(0x326)]['height'],_0x27ec7e=SceneManager[_0xfbce9c(0x2b7)][_0xfbce9c(0x330)]['height'],_0x5bb732=_0x5c5104['SubjectDistance'],_0x26d30b=Graphics[_0xfbce9c(0x225)]-_0x4f7ff5-_0x27ec7e;let _0x40488e=0x0,_0x2a2813=0x0,_0x5387c8=0x0,_0x495090=0x0;switch(_0x5c5104[_0xfbce9c(0x2d8)]){case _0xfbce9c(0x3c7):_0x40488e=_0x5c5104['SpriteThin']*_0x42115a+_0x5bb732,_0x2a2813=_0x5c5104[_0xfbce9c(0x2c3)],_0x5387c8=Math[_0xfbce9c(0x36e)]((Graphics[_0xfbce9c(0x223)]-_0x40488e)/0x2),_0x495090=_0x5c5104['ScreenBuffer'];break;case'bottom':_0x40488e=_0x5c5104[_0xfbce9c(0x29e)]*_0x42115a+_0x5bb732,_0x2a2813=_0x5c5104[_0xfbce9c(0x2c3)],_0x5387c8=Math[_0xfbce9c(0x36e)]((Graphics[_0xfbce9c(0x223)]-_0x40488e)/0x2),_0x495090=Graphics['height']-_0x4f7ff5-_0x2a2813-_0x5c5104[_0xfbce9c(0x292)];break;case _0xfbce9c(0x1db):_0x40488e=_0x5c5104[_0xfbce9c(0x2c3)],_0x2a2813=_0x5c5104[_0xfbce9c(0x29e)]*_0x42115a+_0x5bb732,_0x5387c8=_0x5c5104['ScreenBuffer'],_0x495090=Math['ceil']((_0x26d30b-_0x2a2813)/0x2),_0x495090+=_0x27ec7e;break;case _0xfbce9c(0x374):_0x40488e=_0x5c5104['SpriteLength'],_0x2a2813=_0x5c5104[_0xfbce9c(0x29e)]*_0x42115a+_0x5bb732,_0x5387c8=Graphics[_0xfbce9c(0x223)]-_0x40488e-_0x5c5104[_0xfbce9c(0x292)],_0x495090=Math[_0xfbce9c(0x36e)]((_0x26d30b-_0x2a2813)/0x2),_0x495090+=_0x27ec7e;break;}if(!_0x405afa){const _0x19b602=Window_BTB_TurnOrder[_0xfbce9c(0x2bb)][_0xfbce9c(0x33b)];let _0x34abe7=Math[_0xfbce9c(0x2af)](_0xe0bbc,Math[_0xfbce9c(0x2af)]($gameParty[_0xfbce9c(0x1b1)]()+0x8)-_0x42115a);switch(_0x5c5104[_0xfbce9c(0x2d8)]){case'top':case _0xfbce9c(0x300):_0x19b602&&(_0x5387c8-=_0x34abe7*_0x5c5104['SpriteThin']);break;}}return _0x5387c8+=_0x5c5104[_0xfbce9c(0x15d)],_0x495090+=_0x5c5104['DisplayOffsetY'],new Rectangle(_0x5387c8,_0x495090,_0x40488e,_0x2a2813);},Window_BTB_TurnOrder[_0x23a158(0x281)]['updatePadding']=function(){const _0x3bdd30=_0x23a158;this[_0x3bdd30(0x189)]=0x0;},Window_BTB_TurnOrder[_0x23a158(0x281)]['isHorz']=function(){const _0x45ced8=_0x23a158,_0x113b16=Window_BTB_TurnOrder[_0x45ced8(0x2bb)],_0x1aabec=[_0x45ced8(0x3c7),_0x45ced8(0x300)][_0x45ced8(0x253)](_0x113b16[_0x45ced8(0x2d8)]);return _0x1aabec;},Window_BTB_TurnOrder['prototype']['createBattlerSprites']=function(){const _0x53b4e5=_0x23a158;this[_0x53b4e5(0x2db)]=new Sprite(),this[_0x53b4e5(0x242)](this[_0x53b4e5(0x2db)]),this['_turnOrderContainer']=[];for(let _0x30ab76=0x0;_0x30ab76<$gameParty[_0x53b4e5(0x1b1)]();_0x30ab76++){const _0x98585b=new Sprite_BTB_TurnOrder_Battler($gameParty,_0x30ab76);this[_0x53b4e5(0x2db)][_0x53b4e5(0x264)](_0x98585b),this['_turnOrderContainer'][_0x53b4e5(0x170)](_0x98585b);}for(let _0x2fcde8=0x0;_0x2fcde8<$gameTroop[_0x53b4e5(0x2c0)]()['length'];_0x2fcde8++){const _0x3611df=new Sprite_BTB_TurnOrder_Battler($gameTroop,_0x2fcde8);this[_0x53b4e5(0x2db)][_0x53b4e5(0x264)](_0x3611df),this[_0x53b4e5(0x38e)][_0x53b4e5(0x170)](_0x3611df);}},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x22b)]=function(){const _0x125cdc=_0x23a158;Window_Base[_0x125cdc(0x281)]['update']['call'](this),this['updateHomePosition'](),this[_0x125cdc(0x25b)](),this['updateSidePosition'](),this['updateBattleContainerOrder'](),this[_0x125cdc(0x179)]();},Window_BTB_TurnOrder['prototype'][_0x23a158(0x190)]=function(){const _0x353d5e=_0x23a158;if(this[_0x353d5e(0x194)]>0x0){const _0xcbf852=this[_0x353d5e(0x194)];this['_homeX']=(this[_0x353d5e(0x309)]*(_0xcbf852-0x1)+this[_0x353d5e(0x1c3)])/_0xcbf852,this[_0x353d5e(0x25a)]=(this[_0x353d5e(0x25a)]*(_0xcbf852-0x1)+this[_0x353d5e(0x211)])/_0xcbf852,this[_0x353d5e(0x194)]--,this[_0x353d5e(0x194)]<=0x0&&(this[_0x353d5e(0x309)]=this[_0x353d5e(0x1c3)],this[_0x353d5e(0x25a)]=this[_0x353d5e(0x211)]);}},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x25b)]=function(){const _0x640fc=_0x23a158,_0x5ab2b8=Window_BTB_TurnOrder[_0x640fc(0x2bb)];if(_0x5ab2b8[_0x640fc(0x2d8)]!==_0x640fc(0x3c7))return;if(!_0x5ab2b8[_0x640fc(0x21b)])return;const _0x72e5ed=SceneManager[_0x640fc(0x2b7)]['_helpWindow'];if(!_0x72e5ed)return;_0x72e5ed[_0x640fc(0x165)]?(this['x']=this[_0x640fc(0x309)]+(_0x5ab2b8[_0x640fc(0x23f)]||0x0),this['y']=this['_homeY']+(_0x5ab2b8[_0x640fc(0x382)]||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x640fc(0x25a)]);const _0x3e2661=SceneManager[_0x640fc(0x2b7)][_0x640fc(0x364)];this[_0x640fc(0x1b2)]===undefined&&(this[_0x640fc(0x1b2)]=Math['round']((Graphics['width']-Math['min'](Graphics[_0x640fc(0x28b)],_0x3e2661[_0x640fc(0x223)]))/0x2),this[_0x640fc(0x24e)]=Math[_0x640fc(0x1a2)]((Graphics[_0x640fc(0x225)]-Math[_0x640fc(0x2af)](Graphics[_0x640fc(0x365)],_0x3e2661[_0x640fc(0x225)]))/0x2)),this['x']+=_0x3e2661['x']-this[_0x640fc(0x1b2)],this['y']+=_0x3e2661['y']-this['_ogWindowLayerY'];},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x2ef)]=function(){const _0x26fe1e=_0x23a158,_0x52843f=Window_BTB_TurnOrder[_0x26fe1e(0x2bb)];if(['top'][_0x26fe1e(0x253)](_0x52843f[_0x26fe1e(0x2d8)]))return;this['x']=this[_0x26fe1e(0x309)],this['y']=this[_0x26fe1e(0x25a)];const _0x368620=SceneManager[_0x26fe1e(0x2b7)][_0x26fe1e(0x364)];this['x']+=_0x368620['x'],this['y']+=_0x368620['y'];},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x25e)]=function(){const _0x13e269=_0x23a158;if(!this[_0x13e269(0x2db)])return;const _0x47e46e=this[_0x13e269(0x2db)]['children'];if(!_0x47e46e)return;_0x47e46e[_0x13e269(0x23a)](this['compareBattlerSprites'][_0x13e269(0x169)](this));},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x35f)]=function(_0x8e6b40,_0x51645f){const _0x55350=_0x23a158,_0x3310c9=this[_0x55350(0x17f)](),_0x8e0f8e=Window_BTB_TurnOrder[_0x55350(0x2bb)][_0x55350(0x33b)];if(_0x3310c9&&!_0x8e0f8e)return _0x8e6b40['x']-_0x51645f['x'];else{if(_0x3310c9&&_0x8e0f8e)return _0x51645f['x']-_0x8e6b40['x'];else{if(!_0x3310c9&&_0x8e0f8e)return _0x8e6b40['y']-_0x51645f['y'];else{if(!_0x3310c9&&!_0x8e0f8e)return _0x51645f['y']-_0x8e6b40['y'];}}}},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x179)]=function(){const _0x1a8d45=_0x23a158;this['visible']=$gameSystem[_0x1a8d45(0x1dd)]();},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x31b)]=function(_0x2a5216){const _0x4b28d0=_0x23a158;this[_0x4b28d0(0x38e)][_0x4b28d0(0x23a)]((_0x537e21,_0x1d71f6)=>{const _0x42d8c7=_0x4b28d0;return _0x537e21[_0x42d8c7(0x230)]()-_0x1d71f6[_0x42d8c7(0x230)]();}),this['recalculateHome']();if(!_0x2a5216)return;for(const _0x6aeda3 of this[_0x4b28d0(0x38e)]){if(!_0x6aeda3)continue;_0x6aeda3['update'](),_0x6aeda3[_0x4b28d0(0x2e0)]=0x0;}},Window_BTB_TurnOrder[_0x23a158(0x281)][_0x23a158(0x28e)]=function(){const _0x15fdd1=_0x23a158;if(!this[_0x15fdd1(0x17f)]())return;const _0x4101ec=VisuMZ['BattleSystemBTB'][_0x15fdd1(0x2bb)][_0x15fdd1(0x3a8)];if(!_0x4101ec[_0x15fdd1(0x2c7)])return;const _0x31da2b=$gameParty[_0x15fdd1(0x2c0)]()[_0x15fdd1(0x33d)](_0x372f1b=>_0x372f1b&&_0x372f1b[_0x15fdd1(0x2a4)]()&&_0x372f1b[_0x15fdd1(0x296)]())['length'],_0x166721=$gameTroop[_0x15fdd1(0x2c0)]()['filter'](_0x469e2d=>_0x469e2d&&_0x469e2d[_0x15fdd1(0x2a4)]()&&_0x469e2d[_0x15fdd1(0x296)]())[_0x15fdd1(0x307)],_0x2e1fd9=this[_0x15fdd1(0x25f)](_0x31da2b,_0x166721);this[_0x15fdd1(0x1c3)]=_0x2e1fd9['x'],this[_0x15fdd1(0x211)]=_0x2e1fd9['y'],(this[_0x15fdd1(0x1c3)]!==this[_0x15fdd1(0x309)]||this['_targetHomeY']!==this[_0x15fdd1(0x25a)])&&(this[_0x15fdd1(0x194)]=_0x4101ec['UpdateFrames']);};