//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.58;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.58] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
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
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * EXAMPLE:
 * 
 * - The new state: "Fiery Blade" will allow the affected battler to deal fire
 * elemental damage. With Action End, this means for 5 actions, those attacks
 * will deal fire damage.
 * 
 * - This means that if no action is taken, due to a status effect like "Sleep"
 * or "Stun", then the duration count will not decrease.
 * 
 * - On the flip side, if the battler performs multiple actions a turn, then
 * the duration count drops faster because more actions have been spent.
 * 
 * - However, if this "Fiery Blade" state was using Turn End instead, it will
 * have its duration reduced by 1 each turn, regardless of "Sleep" or "Stun"
 * states, and regardless of how many actions are performed each turn.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * - If used with Battle Core's <Command Text: x>, the Command Text notetag
 *   will take priority in the command window, but the List Name notetag will
 *   appear in the skill list.
 * - This does not change the display text. If you'd like to change that, use
 *   the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * ---
 * 
 * <ID Sort Priority: x>
 * 
 * - Used for: Skill Notetags
 * - Used for Scene_Skill.
 * - Changes sorting priority by ID for skills to 'x'. 
 *   - Default priority level is '50'.
 * - Skills with higher priority values will be sorted higher up on the list
 *   while lower values will be lower on the list.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Non-consumable items will not be consumed but their amounts will be
 *     required.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Bypass State Damage Removal: id>
 * <Bypass State Damage Removal: id, id, id>
 * 
 * <Bypass State Damage Removal: name>
 * <Bypass State Damage Removal: name, name, name>
 * 
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used to attack an enemy with the listed state that
 *   would normally have on damage removal (ie Sleep).
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for attacks like "Dream Eater" that would prevent waking
 *   up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Attacker: id>
 * <Bypass State Damage Removal as Attacker: id, id, id>
 * 
 * <Bypass State Damage Removal as Attacker: name>
 * <Bypass State Damage Removal as Attacker: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When an attacker with an associated trait object that has this notetag
 *   would attack an enemy with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Sleep Striker" that would prevent the
 *   attacker from waking up a sleeping opponent.
 * 
 * ---
 * 
 * <Bypass State Damage Removal as Target: id>
 * <Bypass State Damage Removal as Target: id, id, id>
 * 
 * <Bypass State Damage Removal as Target: name>
 * <Bypass State Damage Removal as Target: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - When a target with an associated trait object that has this notetag is
 *   attacked as the target with the listed state, bypass on damage removal.
 * - For 'id' variant, replace each 'id' with a number representing the state's
 *   ID to bypass the damage removal for.
 * - For 'name' variant, replace each 'name' with the state's name to bypass
 *   the damage removal for.
 * - This can be used for effects like "Deep Sleep" that would prevent the
 *   attacked target from waking up.
 * 
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * - If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *   <Passive State: x> will always have the passive state be available no
 *   matter if the skill is equipped or not, as long as the skill is learned.
 *   - If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 * 
 * === Skill Toggle Notetags ===
 * 
 * Skill Toggles are skills that can be toggled ON or OFF. If ON, then any
 * passive states on that skill will become enabled (assuming all other passive
 * conditions are met) and if toggled OFF, then that passive state will not
 * appear (even if all other conditions are met).
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 * 
 * Otherwise, you can use JavaScript calls like the following for script call
 * checks, and the like:
 * 
 *   $gameActors.actor(2).isSkillToggled($dataSkills[3])
 * 
 * ---
 * 
 * <Toggle>
 * 
 * - Used for: Skill Notetags
 * - Turns the skill into a toggle skill.
 * - Best used with a passive state.
 *   - Just like with regular <Passive State: x> notetag:
 *   - If you plan on applying a passive state through a skill, it must be
 *     through a skill that has been learned by the target and not a skill that
 *     is given through a trait.
 * - Toggle skills cannot be used with certain skill effects:
 *   - Active Chain Skills, Evolution Matrix Skills, Input Combo Skills
 *   - Field Skills
 *   - Item Amplify Skills, Item Concoct Skills, Item Throw Skills
 *   - Toggle skills cannot be Skill Containers
 * 
 * ---
 * 
 * <Initial Toggle: On>
 * <Initial Toggle: Off>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - Sets the initial toggle for this skill to be ON/OFF.
 *   - aka when an actor learns the skill for the first time and this
 *     determines what toggle it will have
 * - If this notetag is not used, refer to the setting found in the
 *   Plugin Parameters
 * 
 * ---
 * 
 * <Toggle Exclusion Group: key>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When this skill is toggled, all other toggle skills with a matching 'key'
 *   will be turned off.
 *   - For example, the skills Fire Force, Ice Force, and Thunder Force have
 *     the <Toggle Exclusion Group: Force> notetag.
 *   - When Fire Force is toggled ON, then Ice Force and Thunder Force will
 *     automatically turn OFF.
 * - Replace 'key' with a toggle exclusion group name for this skill to use.
 * 
 * ---
 * 
 * <Toggle On Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the skill's animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled on.
 * 
 * ---
 * 
 * <Toggle Off Animation: x>
 * 
 * - Used for: Skill Notetags
 * - Pair this notetag together with skill toggles.
 * - When a skill is turned off, this is the animation that plays.
 * - If this notetag is not used, refer to the Plugin Parameters' animation.
 * - Replace 'x' with a number representing the ID of the animation to play
 *   when the skill is toggled off.
 * 
 * ---
 * 
 * === Aura & Miasma Notetags ===
 * 
 * Auras are a type passive that affects an allied party. Miasmas are a type of
 * passive that affects an opposing party. Auras and Miasmas only need to come
 * from a single source to give an entire party or troop a passive provided
 * that the battler emitting the aura/miasma is alive and in battle.
 * 
 * ---
 * 
 * <Aura State: x>
 * <Aura States: x, x, x>
 * 
 * <Aura State: name>
 * <Aura States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an aura that affects the battler's allies and gives each affected
 *   member passive state(s) 'x'.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this aura.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this aura.
 * - Note: If you plan on applying an aura effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Miasma State: x>
 * <Miasma States: x, x, x>
 * 
 * <Miasma State: name>
 * <Miasma States: name, name, name>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
 * - Emits an miasma that affects the battler's opponents and gives each
 *   affected member passive state(s) 'x'.
 * - Miasmas do NOT apply outside of battle.
 * - Replace 'x' with a number to determine which state to add as a passive
 *   generated by this miasma.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive generated by this miasma.
 * - Note: If you plan on applying a miasma effect through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 * 
 * ---
 * 
 * <Not User Aura>
 * <Aura Not For User>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Prevents the emitting user from being affected by the related aura.
 * 
 * ---
 * 
 * <Allow Dead Aura>
 * <Allow Dead Miasma>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to continue emitting even after the emitting user is
 *   in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
 * - Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.
 * 
 * ---
 * 
 * <Dead Aura Only>
 * <Dead Miasma Only>
 * 
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Allows aura/miasma to only emit if the emitting user is in a dead state.
 * - When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
 *   only affect the auras/miasmas emitted from that object.
 * - When used with States, the effect will take place as long as it is used
 *   as an aura or miasma regardless of where it is emitting from.
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
 * === Skill Cost Plugin Commands ===
 * 
 * ---
 * 
 * Skill Cost: Emulate Actor Pay
 * - Target actor(s) emulates paying for skill cost.
 * - 
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * Skill Cost: Emulate Enemy Pay
 * - Target enemy(s) emulates paying for skill cost.
 * - 
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) will pay skill cost.
 * 
 *   Skill ID:
 *   - What is the ID of the skill to emulate paying the skill cost for?
 * 
 * ---
 * 
 * === State Turns Plugin Commands ===
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change By
 * - Changes actor(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Actor State Turns Change To
 * - Changes actor(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change By
 * - Changes enemy(s) state turns by an amount.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns By:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 * State Turns: Enemy State Turns Change To
 * - Changes enemy(s) state turns to a specific value.
 * - Only works on states that can have turns.
 * 
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 * 
 *   State ID:
 *   - What is the ID of the state you wish to change turns for?
 *   - Only works on states that can have turns.
 * 
 *   Change Turns To:
 *   - How many turns should the state be changed to?
 *   - You may use JavaScript code.
 * 
 *   Auto-Add State?:
 *   - Automatically adds state if actor(s) does not have it applied?
 * 
 * ---
 * 
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Sort: Alphabetical:
 *   - Insert the ID's of Skill Types you want sorted alphabetically.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Toggle Settings
 * ============================================================================
 *
 * Skill toggles are a new type of skill. They do not perform any actions but
 * instead, will switch on/off any passive effects the skill has.
 * 
 * Skill Toggles do not take up actions, even in battle. They will not consume
 * an actor's current turn. A player can toggle multiple skill toggles at a
 * time.
 * 
 * Skill Toggles require the character to pay the skill cost ONLY when the
 * skill is toggled from OFF to ON, not when it is toggled ON to OFF.
 * 
 * Enemies are unable to switch Toggle Skills and the passive effects on a
 * Toggle Skill for an enemy will always be considered ON.
 *
 * ---
 *
 * Default
 * 
 *   Default Toggle:
 *   - What is the default toggle setting for toggle skills?
 * 
 *   Toggle Off Animation:
 *   - Play this animation when a skill is toggled off.
 *   - Requires VisuMZ_0_CoreEngine.
 *   - Toggle On animation by default is whatever the skill animation is set to
 * 
 * ---
 * 
 * Appearance
 * 
 *   Toggle On Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *   - Applies for skill name, not the skill cost
 * 
 * ---
 * 
 * Vocabulary
 * 
 *   Toggle Type:
 *   - Skill toggle displayed in the status window.
 * 
 *   Toggle On:
 *   - Text displayed for a skill that's toggled on
 * 
 *   Toggle Off:
 *   - Text displayed for a skill that's toggled off
 * 
 *     Off Text Location:
 *     - Where is the [OFF] text located in the skill cost?
 *       - front
 *       - back
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - Refer to "Major Changes" in Help File for explanation.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.58: September 14, 2026
 * * Bug Fixes!
 * ** Fixed a bug where when erasing a state during <JS On Erase State> would
 *    bypass <No Death Clear> flags. Fix made by Arisu.
 * ** Fixed a bug with <Bypass State Damage Removal: x> notetag that would
 *    cause it to crash. Fix made by Arisu.
 * 
 * Version 1.57: July 20, 2026
 * * Compatibility Update!
 * ** Toggle skills now work with <Battle Commands>. Update made by Arisu.
 * 
 * Version 1.56: April 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where <param Buff Turns: +x> and <param Debuff Turns: +x>
 *    would cause a crash. Fix made by Olivia.
 * 
 * Version 1.55: March 16, 2026
 * * Documentation Update!
 * ** Added extra clarity for <Toggle> notetag:
 * *** Just like with regular <Passive State: x> notetag:
 * *** If you plan on applying a passive state through a skill, it must be
 *     through a skill that has been learned by the target and not a skill that
 *     is given through a trait.
 * 
 * Version 1.54: December 15, 2025
 * * Documentation Update!
 * ** Added extra clarity for <List Name: name> notetag:
 * *** If used with Battle Core's <Command Text: x>, the Command Text notetag
 *     will take priority in the command window, but the List Name notetag will
 *     appear in the skill list.
 * *** This does not change the display text. If you'd like to change that, use
 *     the Battle Core's <Display Text: x> notetag along with this notetag.
 * 
 * Version 1.53: September 18, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the "Preset: Gauge Color" Plugin Parameter was not
 *    accepting #rrggbb values. Fix made by Arisu.
 * * Documentation Update!
 * ** Added extra clarity for <Passive State: x>:
 * *** If you are using VisuMZ's Equip Battle Skills, know that the notetag
 *     <Passive State: x> will always have the passive state be available no
 *     matter if the skill is equipped or not, as long as the skill is learned.
 * *** If you want the passive state to only appear while the skill is equipped
 *     then use the VisuMZ Equip Battle Skills notetag <Equip State: x> for
 *     this effect instead.
 * 
 * Version 1.52: August 14, 2025
 * * Feature Update!
 * ** Passive States with custom JS conditions should be less prone to infinite
 *    loops. Update made by Irina.
 * 
 * Version 1.51: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Skill Toggle Settings
 * **** Skill toggles are a new type of skill. They do not perform any actions
 *      but instead, will switch on/off any passive effects the skill has.
 * **** Enemies are unable to switch Toggle Skills and the passive effects on a
 *      Toggle Skill for an enemy will always be considered ON.
 * **** See the help file for more information.
 * ** New Notetags added by Olivia:
 * *** Skill Toggle Notetags:
 * **** <Toggle>
 * **** <Initial Toggle: On/Off>
 * **** <Toggle Exclusion Group: key>
 * **** <Toggle On Animation: x>
 * **** <Toggle Off Animation: x>
 * ***** See the help file for more information.
 * 
 * Version 1.50: March 20, 2025
 * * Documentation Update!
 * ** Changed the description of Plugin Parameter 'Action End Update' to
 *    'Refer to "Major Changes" in Help File for explanation.'
 * ** Added examples of "Action End Update" under "Major Changes"
 * *** The new state: "Fiery Blade" will allow the affected battler to deal
 *     fire elemental damage. With Action End, this means for 5 actions, those
 *     attacks will deal fire damage.
 * *** This means that if no action is taken, due to a status effect like
 *     "Sleep" or "Stun", then the duration count will not decrease.
 * *** On the flip side, if the battler performs multiple actions a turn, then
 *     the duration count drops faster because more actions have been spent.
 * *** However, if this "Fiery Blade" state was using Turn End instead, it will
 *     have its duration reduced by 1 each turn, regardless of "Sleep" or
 *     "Stun" states, and regardless of how many actions are performed each
 *     turn.
 * 
 * Version 1.49: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a bug where causing a dead battler to refresh afterwards would
 *    yield multiple death states on that battler. Fix made by Arisu.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.48: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Auras & Miasmas added by Olivia:
 * *** Auras are a type passive that affects an allied party. Miasmas are a
 *     type of passive that affects an opposing party. Auras and Miasmas only
 *     need to come from a single source to give an entire party or troop a
 *     passive provided that the battler emitting the aura/miasma is alive and
 *     in battle.
 * ** New Notetags added by Olivia:
 * *** <Aura State: x>
 * **** Emits an aura that affects the battler's allies and gives each affected
 *      member passive state(s) 'x'.
 * *** <Miasma State: x>
 * **** Emits an aura that affects the battler's opponents and gives each
 *      affected member passive state(s) 'x'.
 * *** <Not User Aura>
 * **** Prevents the emitting user from being affected by the related aura.
 * *** <Allow Dead Aura>
 * *** <Allow Dead Miasma>
 * **** Allows aura/miasma to continue emitting even after the emitting user is
 *      in a dead state.
 * *** <Dead Aura Only>
 * *** <Dead Miasma Only>
 * **** Allows aura/miasma to only emit if the emitting user is in a dead state
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.47: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <Bypass State Damage Removal: id/name>
 * **** When this skill/item is used to attack an enemy with the listed state
 *      that would normally have on damage removal (ie Sleep).
 * **** This can be used for attacks like "Dream Eater" that would prevent
 *      waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Attacker: id/name>
 * **** When an attacker with an associated trait object that has this notetag
 *      would attack an enemy with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Sleep Striker" that would prevent
 *      the attacker from waking up a sleeping opponent.
 * *** <Bypass State Damage Removal as Target: id/name>
 * **** When a target with an associated trait object that has this notetag is
 *      attacked as the target with the listed state, bypass on damage removal.
 * **** This can be used for effects like "Deep Sleep" that would prevent the
 *      attacked target from waking up.
 * 
 * Version 1.46: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Skill Settings > Skill Types > Sort: Alphabetical
 * **** Insert the ID's of Skill Types you want sorted alphabetically.
 * ** New notetags added by Irina:
 * *** <ID Sort Priority: x>
 * **** Used for Scene_Skill.
 * **** Changes sorting priority by ID for skill to 'x'. 
 * **** Default priority level is '50'.
 * **** Skills with higher priority values will be sorted higher up on the list
 *      while lower values will be lower on the list.
 * 
 * Version 1.45: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem with passive state conditional notetags not working
 *    properly. Fix made by Irina.
 * 
 * Version 1.44: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where passive states would not appear. Fix made by Olivia.
 * ** Fixed a bug where a crash would occur if certain plugins cleared the
 *    passive state cache midway through trying to register it. Fix by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * ** States with lots and lots of text data within their notes will no longer
 *    cause FPS drops.
 * 
 * Version 1.43: January 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Skill Cost: Emulate Actor Pay
 * *** Skill Cost: Emulate Enemy Pay
 * **** Target actor(s)/enemy(s) emulates paying for skill cost.
 * *** State Turns: Actor State Turns Change By
 * *** State Turns: Actor State Turns Change To
 * *** State Turns: Enemy State Turns Change By
 * *** State Turns: Enemy State Turns Change To
 * **** Changes actor(s)/enemy(s) state turns to a specific value/by an amount.
 * **** Only works on states that can have turns.
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillActorPaySkillCost
 * @text Skill Cost: Emulate Actor Pay
 * @desc Target actor(s) emulates paying for skill cost.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillEnemyPaySkillCost
 * @text Skill Cost: Emulate Enemy Pay
 * @desc Target enemy(s) emulates paying for skill cost.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) will pay skill cost.
 * @default ["1"]
 *
 * @arg SkillID:num
 * @text Skill ID
 * @type skill
 * @desc What is the ID of the skill to emulate paying the skill cost for?
 * @default 99
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_StateTurns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeBy
 * @text State Turns: Actor State Turns Change By
 * @desc Changes actor(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsActorChangeTo
 * @text State Turns: Actor State Turns Change To
 * @desc Changes actor(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg ActorIDs:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if actor(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeBy
 * @text State Turns: Enemy State Turns Change By
 * @desc Changes enemy(s) state turns by an amount.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns By
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default +1
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StateTurnsEnemyChangeTo
 * @text State Turns: Enemy State Turns Change To
 * @desc Changes enemy(s) state turns to a specific value.
 * Only works on states that can have turns.
 *
 * @arg EnemyIndex:arraynum
 * @text Enemy Index(es)
 * @type actr[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg StateID:num
 * @text State ID
 * @type state
 * @desc What is the ID of the state you wish to change turns for?
 * Only works on states that can have turns.
 * @default 5
 *
 * @arg Turns:eval
 * @text Change Turns To
 * @desc How many turns should the state be changed to?
 * You may use JavaScript code.
 * @default 10
 *
 * @arg AutoAddState:eval
 * @text Auto-Add State?
 * @type boolean
 * @on Auto-Add
 * @off Don't Add
 * @desc Automatically adds state if enemy(s) does not have it applied?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Toggles:struct
 * @text Skill Toggle Settings
 * @parent Skills:struct
 * @type struct<Toggles>
 * @desc Settings in regards to how skill toggles function.
 * @default {"Default":"","DefaultToggle:eval":"true","ToggleOffAnimationID:num":"62","Appear":"","ToggleOnTextColor:str":"24","Vocab":"","ToggleType:str":"Toggle","ToggleOn:str":"\\FS[22]\\C[0][ON]","ToggleOff:str":"\\FS[22]\\C[8][OFF]","ToggleOffLocation:str":"back"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param SortSkillTypesAbc:arraynum
 * @text Sort: Alphabetical
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of Skill Types you want sorted alphabetically.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Toggle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Toggles:
 *
 * @param Default
 *
 * @param DefaultToggle:eval
 * @text Default Toggle
 * @parent Default
 * @type boolean
 * @on ON
 * @off OFF
 * @desc What is the default toggle setting for toggle skills?
 * @default true
 *
 * @param ToggleOffAnimationID:num
 * @text Toggle Off Animation
 * @parent Default
 * @type animation
 * @desc Play this animation when a skill is toggled off.
 * Requires VisuMZ_0_CoreEngine.
 * @default 62
 *
 * @param Appear
 * @text Appearance
 *
 * @param ToggleOnTextColor:str
 * @text Toggle On Text Color
 * @parent Appear
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param ToggleType:str
 * @text Toggle Type
 * @parent Vocab
 * @desc Skill toggle displayed in the status window.
 * @default Toggle
 *
 * @param ToggleOn:str
 * @text Toggle On
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled on
 * @default \FS[22]\C[0][ON]
 *
 * @param ToggleOff:str
 * @text Toggle Off
 * @parent Vocab
 * @desc Text displayed for a skill that's toggled off
 * @default \FS[22]\C[8][OFF]
 *
 * @param ToggleOffLocation:str
 * @text Off Text Location
 * @parent ToggleOff:str
 * @type select
 * @option front
 * @option back
 * @desc Where is the [OFF] text located in the skill cost?
 * @default back
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:str
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc Refer to "Major Changes" in Help File for explanation.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x3d74(){const _0x9826bd=['Window_StatusBase_placeGauge','KnownList','equipPassives','GaugeCurrentJS','stateHpSlipHealJS','getClassIdWithName','_buffTurns','onExpireBuffGlobalJS','Game_BattlerBase_skillMpCost','MeetsAuraStateConditions','active','addState','AmplifyWith','CheckBypassRemoveStatesByDamage','TurnOffsetX','isUseSkillsStatesCoreUpdatedLayout','CheckVisibleSwitchNotetags','LearnedChainSkill','onAddDebuffJS','getStateData','number','2784OjwjEX','drawActorBuffRates','Window_Base_createAllSkillCostText_Toggle','Buffs','hide','MeetsAuraObjConditions','_stateData','recalculateSlipDamageJS','retrieveStateColor','POSITIVE','makeCommandName','changeTextColor','heal','CanThrowType','testApply','_currentTroopUniqueID','changeOutlineColor','ColorDebuff','RegExp','skills','6885MzhfVr','DataFontSize','76DGeFNa','toLowerCase','Game_Player_refresh','#%1','ParseAllNotetags','onRegenerateCustomStateDamageOverTime','stepsForTurn','rgba(0,\x200,\x200,\x200)','onEraseBuff','_stateRetainType','_lastStatesActionEndFrameCount','activate','_bypassRemoveStateDamage_action','description','_prevPassiveJsFrameCount','clearStateOrigin','action','onExpireStateJS','members','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','setStateOrigin','meetsPassiveStateConditionClasses','_commandNameWindow','Game_Battler_onBattleEnd','_stored_buffColor','onEraseStateCustomJS','_tempActor','add','passiveStateObjects','innerWidth','Window_SkillType_initialize','parameters','_cache_isToggleSkill','gaugeBackColor','initMembersSkillsStatesCore','multiclasses','toggleOffLocation','onAddStateCustomJS','Window_SkillList_updateHelp','_skillTypeWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','SkillsStatesCore','onExpireDebuffJS','Game_BattlerBase_eraseBuff','recover\x20all','commandStyle','maxSlipDamage','ToggleOffLocation','filter','ReapplyRules','sortPriority','increaseBuff','addPassiveStatesFromOtherPlugins','_data','actorId','Game_BattlerBase_skillTpCost','requestFauxAnimation','Window_SkillList_setActor','singleSkill','PassiveStates','iconWidth','Game_BattlerBase_resetStateCounts','Scene_Battle_onSkillOk_Toggle','applySkillsStatesCoreEffects','commandNameWindowDrawText','debuffColor','onAddDebuffGlobalJS','equips','removeStatesByCategoryAll','Game_BattlerBase_die','getCurrentStateOriginKey','ParseStateNotetags','stateEraseJS','canUse','isStateCategoryResisted','onExpireDebuff','chanceByDamage','_phase','Settings','forgetSkill','Scene_Skill_statusWindowRect','createCommandNameWindow','onSkillToggle','clearStateDisplay','some','Game_BattlerBase_buffIconIndex','setBuffTurns','ATK','<member-%1>','SortByIDandPriority','valueOutlineColor','_stateMaxTurns','Name','toggleOn','isSceneBattle','stateColor','applyBuffTurnManipulationEffects','_bypassRemoveStateDamage_user','windowPadding','restriction','paySkillCost','isGroupDefeatStateAffected','TextJS','_currentActor','isMaxBuffAffected','_result','Game_BattlerBase_overwriteBuffTurns','PayJS','sortSkillList','equipBattleSkills','front','_cache_getPassiveStatesFromObj','reset','name','VisuMZ_0_CoreEngine','alterSkillName','PresetLabelGaugeColor','_battler','refreshAllMembers','updatedLayoutStyle','43767hxlJDi','MAT','meetsSkillConditionsGlobalJS','makeCurrentTroopUniqueID','ignore','removeStatesByCategory','itemWindowRectSkillsStatesCore','removeState','version','parse','helpWindowRectSkillsStatesCore','Game_Action_testApply','onEraseDebuff','isSkillTypeMatchForUse','Scene_Boot_onDatabaseLoaded','createPassiveStatesCache','Enemy-%1-%2','ToggleOnTextColor','meetsPassiveStateConditionJS','passiveStates','clearStates','skillTypeWindowRectSkillsStatesCore','onExpireStateCustomJS','addWindow','initMembers','textSizeEx','skillTypeWindowRect','drawActorStateTurns','log','Parse_Notetags_State_ApplyRemoveLeaveJS','helpWindowRect','testSkillStatesCoreNotetags','skillMpCost','skillLearn','isPlaytest','isLearnedSkill','categories','StackDebuffMax','SkillSceneStatusBgType','Game_Action_executeHpDamage_bypassStateDmgRemoval','Game_Switches_onChange','MDF','stateAddJS','trim','getStateOrigin','createKeyJS','inBattle','currentSymbol','match','ActionEndUpdate','VisuMZ_3_ActiveChainSkills','onItemOk','menuActor','itemLineRect','isStateAffected','replace','uiInputPosition','icon','Global','setupSkillsStatesCore','includes','getStateReapplyRulings','greater','ValueFontMainType','CanPayJS','addPassiveStatesTraitSets','convertPassiveStates','gradientFillRect','process_VisuMZ_SkillsStatesCore_CheckForAuras','VisuMZ_3_ItemConcoctSkills','getStateRetainType','Game_Unit_deadMembers','addBuff','Actor-%1-%2','fillRect','ToggleOn','AutoAddState','removeBuff','frameCount','callUpdateHelp','currentMaxValue','_actor','initialize','sort','none','autoRemovalTiming','_cache_getPassiveStateConditionClassesData','Window_Base_drawText','MatchLabelGaugeColor','StateTurnsActorChangeTo','test','onAddDebuff','isEnemy','itemTextAlign','calcWindowHeight','Gauge','3484210dTpqee','KnownListRange','deathStateId','updateCommandNameWindow','toggleExclusionGroups','setItem','ARRAYSTR','DEF','resetFontSettings','State-%1-%2','user','TurnEndOnMap','gaugeRate','subject','makeAdditionalSkillCostText','updateStatesActionEnd','setPassiveStateSlipDamageJS','anySwitchOff','paramValueByName','commandNameWindowCenter','Skills','CmdTextAlign','createAllSkillCostText','changePaintOpacity','onExpireStateGlobalJS','updateTurnDisplaySprite','allBattleMembers','onExpireBuffJS','ParseSkillChangessIntoData','learnSkill','Game_BattlerBase_refresh','concat','_costSettings','isStateRestrict','push','constructor','_skillToggle','Sprite_Gauge_currentValue','miasmaStateIDs','outlineColor','_buffs','setup','CheckIncompatibleStates','slipMp','stateMpSlipHealJS','_actorCommandWindow','ForcedChainSkill','Game_BattlerBase_initMembers','buffIconIndex','deadMembers','buttonAssistSwitch','shopStatusWidth','LabelFontMainType','updateVisibility','executeHpDamage','5023080rSroin','checkSkillConditionsNotetags','Sprite_StateIcon_loadBitmap','Game_Unit_isAllDead','index','LabelOutlineWidth','drawFullGauge','Toggles','setStateTurns','back','CalcJS','stateData','_stypeId','makeResistedStateCategories','Game_Actor_forgetSkill','onEraseBuffGlobalJS','MAXMP','onAddStateMakeCustomSlipValues','Game_BattlerBase_meetsSkillConditions_Toggle','ParseSkillNotetags','isUseModernControls','changeSkillsThroughStateEffects','useDigitGrouping','DefaultToggle','Sprite_Gauge_redraw','RefreshCacheVar','helpAreaTop','ARRAYNUM','checkShowHideJS','commandNameWindowDrawBackground','drawItemStyleIconText','setStateData','removeStatesByDamage','allowCreateShopStatusWindow','clearStatesWithStateRetain','onRemoveState','isDead','SkillActorPaySkillCost','meetsPassiveStateConditions','onExpireState','Sprite_Gauge_initMembers','length','currentMaxValueSkillsStatesCore','mpDamage','eraseBuff','resetTextColor','createTurnDisplaySprite','isStateResist','_prevPassiveJsCounter','allSwitchOn','isStateAddable','FieldSkill','StackBuffMax','drawItemStyleIcon','applyStateTurnManipulationEffects','value','ActiveChainSkills','Turns','Class-%1-%2','StateTurnsActorChangeBy','helpAreaHeight','attacker','commandStyleCheck','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','_checkingVisuMzPassiveStateObjects','gainHp','Game_Battler_addState','process_VisuMZ_SkillsStatesCore_Skill_Notetags','_classIDs','Game_Battler_isStateAddable','isPartyAllAffectedByGroupDefeatStates','skillCostSeparator','buff','removeStatesAuto','actor','\x5cFS[22]\x5cC[0][ON]','clearAllStateOrigins','regenerateAll','bypassRemoveStatesByDamage','priority','loadBitmap','skillEnableJS','min','ToggleOffAnimationID','Game_BattlerBase_clearStates','currentValue','Window_Base_changeTextColor','_skillChangesFromState','fontBold','fontFace','skillTpCost','checkCacheKey','onAddBuffGlobalJS','auraStateIDs','Game_Battler_addDebuff','labelOutlineWidth','mainAreaHeight','text','ANY','process_VisuMZ_SkillsStatesCore_State_Notetags','Game_BattlerBase_decreaseBuff','DataOffsetX','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','gaugeLineHeight','ColorPositive','enemy','makeItemList','_stateDisplay','ValueOutlineWidth','slipHp','getAuraPassiveStatesFromObj','_stored_state-%1-color','AGI','traitObjects','isAllDead','overwriteBuffTurns','isBuffExpired','ItemThrowSkills','stateHpSlipDamageJS','_checkingPassiveStates','Window_SkillList_makeItemList','_stateTurns','onEraseDebuffGlobalJS','Actor','addChild','placeExactGauge','Sprite_StateIcon_updateFrame','currentExt','applyItemUserEffect','opponentsUnit','drawParamText','slipTp','resetStateCounts','SkillEnemyPaySkillCost','Window_StatusBase_drawActorIcons','localeCompare','createItemWindow','buffTurns','isDebuffAffected','statusWindowRect','18NQDTVA','getCurrentStateActiveUser','stateId','EnemyIndex','_cache_toggleExclusionGroups','labelColor','[ON]','isPassiveStateStackable','_endingBattle','Window_SkillList_includes','onEraseStateJS','maxCols','ForcedMatrix','animationId','Game_BattlerBase_states','hasToggleSkillAntiCheck','lineHeight','addPassiveStates','scrollTo','752ncWjaQ','buttonAssistText1','isStateExpired','CheckVisibleSkillNotetags','canClearState','getColorDataFromPluginParameters','traitsSet','_stypeIDs','hasState','meetsSkillConditionsEnableJS','onExpireDebuffGlobalJS','_shopStatusWindow','fontSize','VisuMZ_3_FieldSkills','standardIconWidth','getStateOriginByKey','isRightInputMode','drawTextEx','auto','registerCommand','LabelOutlineSolid','isSkillCostShown','totalStateCategoryAffected','addBuffTurns','checkShowHideNotetags','TurnOffsetY','valueFontFace','toggleType','getStateIdWithName','SkillContainers','States','keys','iconText','commandName','Scene_Skill_createItemWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','untitled','setDebuffTurns','toUpperCase','_statusWindow','isUserBypassRemoveStatesByDamage','getCurrentTroopUniqueID','Game_BattlerBase_isStateResist','uiMenuStyle','prototype','onEraseBuffJS','contents','isAutoBattle','stateTurns','prepareResetStateCounts','DisplayedParams','maxItems','drawActorIcons','_checkingTraitsSetSkillsStatesCore','shopStatusWindowRectSkillsStatesCore','allSwitchOff','convertGaugeTypeSkillsStatesCore','skill','textColor','drawActorStateData','hpDamage','GaugeDrawJS','redraw','Game_Action_applyItemUserEffect','Parse_Notetags_Skill_JS','recoverAll','getStateDisplay','stateMaximumTurns','createShopStatusWindow','\x5cFS[22]\x5cC[8][OFF]','VisuMZ_4_SkillContainers','playEquip','getSkillTypes','onEraseStateGlobalJS','_stateIDs','onSelectAction','split','CheckVisibleBattleNotetags','STR','drawActorBuffTurns','enemyId','hasSkill','VisuMZ_3_InputComboSkills','colSpacing','actions','skillId','Armor-%1-%2','placeGauge','_toggleSkillColor','MAXHP','ColorNegative','Sprite_Gauge_gaugeRate','LayoutStyle','updateFrame','VisuMZ_1_MainMenuCore','onAddBuff','isStateRemoved','states','createSkillCostText','VisuMZ_1_ItemsEquipsCore','_passiveStateResults','map','StateID','getPassiveStatesFromObj','friendsUnit','%1\x20%2\x20%3','ShowShopStatus','stateMpSlipDamageJS','format','_bypassRemoveStateDamage_value','multiClass','_stateOrigin','buffColor','Game_BattlerBase_recoverAll','HiddenSkillTypes','getPassiveStateConditionSwitchData','ParseClassIDs','83633wUyjCE','InputComboSkills','Parse_Notetags_State_SlipEffectJS','isSkillUsableForAutoBattle','Parse_Notetags_Skill_Cost','InputKey','AURA_SYSTEM_ENABLED','STRUCT','redrawSkillsStatesCore','currentDisplayedValue','setActor','skillTypes','MaxTurns','Game_BattlerBase_traitsSet','onExpireBuff','getAuraPassiveStateIDs','canSortSkillTypeList','Window_SkillList_drawItem','_prevPassiveJsResults','statusWindowRectSkillsStatesCore','death','buffLength','isTargetBypassRemoveStatesByDamage','labelOutlineColor','Game_BattlerBase_increaseBuff','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','stateTpSlipDamageJS','addPassiveStatesByPluginParameters','maxTurns','labelFontSize','usableSkills','anchor','indexOf','height','_stored_debuffColor','applyStateCategoryRemovalEffects','valueFontSize','onEraseDebuffJS','isCurrentCommandSkillToggle','remove','BattleManager_endAction','itemAt','groupDefeat','Game_Battler_addBuff','onAddStateJS','magicSkills','Parse_Notetags_State_Category','_categoryWindow','isBottomHelpMode','max','numberFontFace','itemWindowRect','ActorIDs','normalColor','boxWidth','getColor','updateHelp','getSkillChangesFromState','statePassiveConditionJS','_states','uiHelpPosition','applyDebuffTurnManipulationEffects','TurnFontSize','removeBuffsAuto','setSkillToggle','paramBuffRate','_skillIDs','drawExtendedParameter','mainFontFace','Window_SkillStatus_refresh','VisuMZ_3_EvoMatrixSkills','clear','_cache_getAuraPassiveStatesFromObj','SkillSceneAdjustSkillList','canChangeSkillsThroughStateEffects','iconIndex','checkSkillTypeMatch','convertTargetToStateOriginKey','call','SkillConditionJS','isMaxDebuffAffected','LUK','addPassiveStatesByNotetag','VisuMZ_2_ClassChangeSystem','isStateCategoryAffected','Scene_Skill_itemWindowRect','Game_BattlerBase_addNewState','skillVisibleJS','allIcons','Scene_Skill_skillTypeWindowRect','FieldSkills','StateTurnsEnemyChangeBy','ceil','drawSkillCost','setStateRetainType','meetsPassiveStateGlobalConditionJS','decreaseBuff','ConvertParams','addStateTurns','isBuffOrDebuffAffected','checkSkillConditionsSwitchNotetags','MeetsAuraNoteConditions','addNewState','success','CmdStyle','floor','_animationIndex','Scene_Skill_helpWindowRect','GroupDigits','onSkillOk','eraseState','SortByIDandPriorityUsingIDs','_cache_CheckBypassRemoveStatesByDamage','state','Parse_Notetags_Skill_Sorting','_cache','PassiveConditionJS','_tempBattler','meetsStateCondition','note','3728935mdQnNz','getSkillIdWithName','ARRAYFUNC','getStypeIdWithName','isSkillToggled','adjustSkillCost','iconHeight','regenerateAllSkillsStatesCore','damage','isToggleSkill','_itemWindow','ShowData','meetsSkillConditions','VisuMZ_1_ElementStatusCore','die','stateTpSlipHealJS','item','isActor','onBattleEnd','onAddState','Game_Actor_learnSkill','totalStateCategory','SkillID','Skill-%1-%2','standardIconHeight','_cache_getPassiveStateConditionSwitchData','isConfused','Game_Variables_onChange','Scene_Battle_onSelectAction','clearStateData','width','shopStatusWindowRect','stateExpireJS','shift','getPassiveStateConditionClassesData','Game_Troop_setup','defaultToggleSkillSetting','ToggleType','bitmap','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','addCommand','refresh','onDatabaseLoaded','isBuffAffected','<actor-%1>','_turnDisplaySprite','ForceListRange','ColorNeutral','IconStypeMagic','target','center','makeSuccess','innerHeight','34953PpCRCm','currentClass','ToggleOff','clearStateRetainType','_colorCache','ARRAYEVAL','addAuraPassiveStateIDs','isSkillHidden','Window_SkillList_maxCols','6sgGHfq','rgba(0,\x200,\x200,\x201)','labelFontFace','Game_Actor_skillTypes','currentValueSkillsStatesCore','process_VisuMZ_SkillsStatesCore_Notetags','anySwitchOn','mainFontSize','AvailableMatrix','hasStateCategory','_subject','StateTurnsEnemyChangeTo','setStateDisplay','setStatusWindow','exit','includesSkillsStatesCore','drawText','Game_Action_isValid','Costs','mainCommandWidth','clamp','EnableLayout','Parse_Notetags_State_PassiveJS','_scene','setBackgroundType','DataOffsetY','right','toggleOff','drawItem','isValid','ShowTurns','statesByCategory','Scene_Skill_onItemOk_Toggle','Game_BattlerBase_eraseState','isBuffPrevented','addDebuff','onChange'];_0x3d74=function(){return _0x9826bd;};return _0x3d74();}const _0x15a52d=_0x15cc;function _0x15cc(_0x51c0fa,_0x27b571){const _0x3d744b=_0x3d74();return _0x15cc=function(_0x15cc7f,_0x3cbdd7){_0x15cc7f=_0x15cc7f-0xdf;let _0x11e7b2=_0x3d744b[_0x15cc7f];return _0x11e7b2;},_0x15cc(_0x51c0fa,_0x27b571);}(function(_0x1ab4fe,_0x34cf7f){const _0x48c7e4=_0x15cc,_0x49e2ba=_0x1ab4fe();while(!![]){try{const _0x398f41=-parseInt(_0x48c7e4(0x3e6))/0x1*(parseInt(_0x48c7e4(0x1e0))/0x2)+-parseInt(_0x48c7e4(0x315))/0x3*(parseInt(_0x48c7e4(0x36e))/0x4)+-parseInt(_0x48c7e4(0x11d))/0x5+-parseInt(_0x48c7e4(0x31e))/0x6*(-parseInt(_0x48c7e4(0x2e0))/0x7)+parseInt(_0x48c7e4(0x1f3))/0x8*(-parseInt(_0x48c7e4(0x36c))/0x9)+-parseInt(_0x48c7e4(0x154))/0xa+parseInt(_0x48c7e4(0x268))/0xb*(parseInt(_0x48c7e4(0x358))/0xc);if(_0x398f41===_0x34cf7f)break;else _0x49e2ba['push'](_0x49e2ba['shift']());}catch(_0x40d987){_0x49e2ba['push'](_0x49e2ba['shift']());}}}(_0x3d74,0x6429d));var label='SkillsStatesCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x15a52d(0x39e)](function(_0x5de6c9){const _0x22c540=_0x15a52d;return _0x5de6c9['status']&&_0x5de6c9[_0x22c540(0x37b)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x15a52d(0x3bc)]||{},VisuMZ[_0x15a52d(0x2c9)]=function(_0x3e312c,_0xa60443){const _0x1e306d=_0x15a52d;for(const _0xc8ad3c in _0xa60443){if(_0xc8ad3c[_0x1e306d(0xed)](/(.*):(.*)/i)){const _0x42e7fe=String(RegExp['$1']),_0x49673f=String(RegExp['$2'])[_0x1e306d(0x219)]()[_0x1e306d(0xe8)]();let _0x5161a8,_0x54d7f6,_0x35efc5;switch(_0x49673f){case'NUM':_0x5161a8=_0xa60443[_0xc8ad3c]!==''?Number(_0xa60443[_0xc8ad3c]):0x0;break;case _0x1e306d(0x16f):_0x54d7f6=_0xa60443[_0xc8ad3c]!==''?JSON['parse'](_0xa60443[_0xc8ad3c]):[],_0x5161a8=_0x54d7f6[_0x1e306d(0x258)](_0x36d432=>Number(_0x36d432));break;case'EVAL':_0x5161a8=_0xa60443[_0xc8ad3c]!==''?eval(_0xa60443[_0xc8ad3c]):null;break;case _0x1e306d(0x31a):_0x54d7f6=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):[],_0x5161a8=_0x54d7f6[_0x1e306d(0x258)](_0xee79d4=>eval(_0xee79d4));break;case'JSON':_0x5161a8=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):'';break;case'ARRAYJSON':_0x54d7f6=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):[],_0x5161a8=_0x54d7f6[_0x1e306d(0x258)](_0x41104e=>JSON[_0x1e306d(0x3ef)](_0x41104e));break;case'FUNC':_0x5161a8=_0xa60443[_0xc8ad3c]!==''?new Function(JSON['parse'](_0xa60443[_0xc8ad3c])):new Function('return\x200');break;case _0x1e306d(0x2e2):_0x54d7f6=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):[],_0x5161a8=_0x54d7f6[_0x1e306d(0x258)](_0x5ad10a=>new Function(JSON['parse'](_0x5ad10a)));break;case _0x1e306d(0x241):_0x5161a8=_0xa60443[_0xc8ad3c]!==''?String(_0xa60443[_0xc8ad3c]):'';break;case _0x1e306d(0x123):_0x54d7f6=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):[],_0x5161a8=_0x54d7f6[_0x1e306d(0x258)](_0x43b6c1=>String(_0x43b6c1));break;case _0x1e306d(0x26f):_0x35efc5=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):{},_0x3e312c[_0x42e7fe]={},VisuMZ[_0x1e306d(0x2c9)](_0x3e312c[_0x42e7fe],_0x35efc5);continue;case'ARRAYSTRUCT':_0x54d7f6=_0xa60443[_0xc8ad3c]!==''?JSON[_0x1e306d(0x3ef)](_0xa60443[_0xc8ad3c]):[],_0x5161a8=_0x54d7f6[_0x1e306d(0x258)](_0x34208d=>VisuMZ[_0x1e306d(0x2c9)]({},JSON['parse'](_0x34208d)));break;default:continue;}_0x3e312c[_0x42e7fe]=_0x5161a8;}}return _0x3e312c;},(_0x3178f9=>{const _0x118ac8=_0x15a52d,_0x157572=_0x3178f9['name'];for(const _0x5bbab8 of dependencies){if(!Imported[_0x5bbab8]){alert(_0x118ac8(0x1ba)[_0x118ac8(0x25f)](_0x157572,_0x5bbab8)),SceneManager[_0x118ac8(0x32c)]();break;}}const _0x3ceb91=_0x3178f9[_0x118ac8(0x37b)];if(_0x3ceb91['match'](/\[Version[ ](.*?)\]/i)){const _0x2f64f7=Number(RegExp['$1']);_0x2f64f7!==VisuMZ[label][_0x118ac8(0x3ee)]&&(alert(_0x118ac8(0x307)['format'](_0x157572,_0x2f64f7)),SceneManager[_0x118ac8(0x32c)]());}if(_0x3ceb91['match'](/\[Tier[ ](\d+)\]/i)){const _0x5931de=Number(RegExp['$1']);_0x5931de<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x118ac8(0x25f)](_0x157572,_0x5931de,tier)),SceneManager[_0x118ac8(0x32c)]()):tier=Math[_0x118ac8(0x299)](_0x5931de,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x118ac8(0x3bc)],_0x3178f9[_0x118ac8(0x38d)]);})(pluginData),PluginManager[_0x15a52d(0x206)](pluginData[_0x15a52d(0x3df)],_0x15a52d(0x179),_0x59ad0a=>{const _0x178a1e=_0x15a52d;VisuMZ[_0x178a1e(0x2c9)](_0x59ad0a,_0x59ad0a);const _0x38f09a=_0x59ad0a[_0x178a1e(0x29c)]||[],_0x5bf648=Number(_0x59ad0a[_0x178a1e(0x2f6)]),_0x29f3ed=$dataSkills[_0x5bf648];if(!_0x29f3ed)return;for(const _0x4fdce0 of _0x38f09a){const _0x2a71e1=$gameActors[_0x178a1e(0x19e)](_0x4fdce0);if(!_0x2a71e1)continue;_0x2a71e1[_0x178a1e(0x3d2)](_0x29f3ed);}}),PluginManager[_0x15a52d(0x206)](pluginData[_0x15a52d(0x3df)],_0x15a52d(0x1d9),_0x523802=>{const _0x31774d=_0x15a52d;VisuMZ[_0x31774d(0x2c9)](_0x523802,_0x523802);const _0x1db598=_0x523802[_0x31774d(0x1e3)]||[],_0x230272=Number(_0x523802[_0x31774d(0x2f6)]),_0x51b4e9=$dataSkills[_0x230272];if(!_0x51b4e9)return;for(const _0x45ddd6 of _0x1db598){const _0x53b5ce=$gameTroop[_0x31774d(0x380)]()[_0x45ddd6];if(!_0x53b5ce)continue;_0x53b5ce['paySkillCost'](_0x51b4e9);}}),PluginManager[_0x15a52d(0x206)](pluginData['name'],_0x15a52d(0x18f),_0x468e86=>{const _0x58e555=_0x15a52d;VisuMZ[_0x58e555(0x2c9)](_0x468e86,_0x468e86);const _0x2d647d=_0x468e86[_0x58e555(0x29c)]||[],_0x39ad89=Number(_0x468e86[_0x58e555(0x259)]),_0x269ce7=Number(_0x468e86[_0x58e555(0x18d)]),_0x598424=_0x468e86['AutoAddState'];for(const _0x50b3d7 of _0x2d647d){const _0x220308=$gameActors['actor'](_0x50b3d7);if(!_0x220308)continue;_0x598424&&!_0x220308[_0x58e555(0xf3)](_0x39ad89)?(_0x220308[_0x58e555(0x34e)](_0x39ad89),_0x220308[_0x58e555(0x15c)](_0x39ad89,_0x269ce7)):_0x220308[_0x58e555(0x2ca)](_0x39ad89,_0x269ce7);}}),PluginManager[_0x15a52d(0x206)](pluginData['name'],_0x15a52d(0x116),_0xeb0136=>{const _0x55eb58=_0x15a52d;VisuMZ['ConvertParams'](_0xeb0136,_0xeb0136);const _0x153938=_0xeb0136[_0x55eb58(0x29c)]||[],_0x1e5554=Number(_0xeb0136['StateID']),_0x111e34=Math[_0x55eb58(0x299)](Number(_0xeb0136['Turns']),0x0),_0x55d871=_0xeb0136[_0x55eb58(0x109)];for(const _0x1a383f of _0x153938){const _0x465cfc=$gameActors[_0x55eb58(0x19e)](_0x1a383f);if(!_0x465cfc)continue;_0x55d871&&!_0x465cfc[_0x55eb58(0xf3)](_0x1e5554)&&_0x465cfc['addState'](_0x1e5554),_0x465cfc[_0x55eb58(0x15c)](_0x1e5554,_0x111e34);}}),PluginManager['registerCommand'](pluginData[_0x15a52d(0x3df)],_0x15a52d(0x2c3),_0xc8ab0c=>{const _0x5d07f6=_0x15a52d;if(!$gameParty[_0x5d07f6(0xeb)]())return;VisuMZ[_0x5d07f6(0x2c9)](_0xc8ab0c,_0xc8ab0c);const _0x3afa80=_0xc8ab0c[_0x5d07f6(0x1e3)]||[],_0x5d1f89=Number(_0xc8ab0c[_0x5d07f6(0x259)]),_0x576b01=Number(_0xc8ab0c[_0x5d07f6(0x18d)]),_0x29a8ee=_0xc8ab0c['AutoAddState'];for(const _0xa37f34 of _0x3afa80){const _0x47b09a=$gameTroop[_0x5d07f6(0x380)]()[_0xa37f34];if(!_0x47b09a)continue;_0x29a8ee&&!_0x47b09a[_0x5d07f6(0xf3)](_0x5d1f89)?(_0x47b09a[_0x5d07f6(0x34e)](_0x5d1f89),_0x47b09a[_0x5d07f6(0x15c)](_0x5d1f89,_0x576b01)):_0x47b09a['addStateTurns'](_0x5d1f89,_0x576b01);}}),PluginManager['registerCommand'](pluginData[_0x15a52d(0x3df)],_0x15a52d(0x329),_0x37a0e8=>{const _0x31c60e=_0x15a52d;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x37a0e8,_0x37a0e8);const _0x147e53=_0x37a0e8[_0x31c60e(0x1e3)]||[],_0x275f7a=Number(_0x37a0e8[_0x31c60e(0x259)]),_0xfa9c5b=Math[_0x31c60e(0x299)](Number(_0x37a0e8['Turns']),0x0),_0x4479bc=_0x37a0e8['AutoAddState'];for(const _0x268ace of _0x147e53){const _0x13c36c=$gameTroop[_0x31c60e(0x380)]()[_0x268ace];if(!_0x13c36c)continue;_0x4479bc&&!_0x13c36c['isStateAffected'](_0x275f7a)&&_0x13c36c['addState'](_0x275f7a),_0x13c36c[_0x31c60e(0x15c)](_0x275f7a,_0xfa9c5b);}}),VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3f4)]=Scene_Boot[_0x15a52d(0x21f)][_0x15a52d(0x30a)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x452af3=_0x15a52d;VisuMZ[_0x452af3(0x397)][_0x452af3(0x3f4)][_0x452af3(0x2b6)](this),this[_0x452af3(0x323)](),VisuMZ[_0x452af3(0x397)][_0x452af3(0x147)]();},Scene_Boot[_0x15a52d(0x21f)][_0x15a52d(0x323)]=function(){const _0xe6f2b6=_0x15a52d;this[_0xe6f2b6(0x101)]();if(VisuMZ[_0xe6f2b6(0x372)])return;this[_0xe6f2b6(0x197)](),this[_0xe6f2b6(0x1b7)]();},Scene_Boot['prototype'][_0x15a52d(0x197)]=function(){const _0x48ed24=_0x15a52d;for(const _0x19e397 of $dataSkills){if(!_0x19e397)continue;VisuMZ[_0x48ed24(0x397)][_0x48ed24(0x26c)](_0x19e397),VisuMZ['SkillsStatesCore'][_0x48ed24(0x2da)](_0x19e397),VisuMZ[_0x48ed24(0x397)][_0x48ed24(0x233)](_0x19e397);}},Scene_Boot[_0x15a52d(0x21f)][_0x15a52d(0x1b7)]=function(){const _0x479f07=_0x15a52d;for(const _0x103651 of $dataStates){if(!_0x103651)continue;VisuMZ[_0x479f07(0x397)][_0x479f07(0x296)](_0x103651),VisuMZ[_0x479f07(0x397)][_0x479f07(0x334)](_0x103651),VisuMZ[_0x479f07(0x397)][_0x479f07(0x26a)](_0x103651),VisuMZ[_0x479f07(0x397)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x103651);}},VisuMZ['SkillsStatesCore'][_0x15a52d(0x167)]=VisuMZ[_0x15a52d(0x167)],VisuMZ[_0x15a52d(0x167)]=function(_0x45d887){const _0x1b0165=_0x15a52d;VisuMZ[_0x1b0165(0x397)][_0x1b0165(0x167)]['call'](this,_0x45d887),VisuMZ[_0x1b0165(0x397)]['Parse_Notetags_Skill_Cost'](_0x45d887),VisuMZ['SkillsStatesCore'][_0x1b0165(0x2da)](_0x45d887),VisuMZ['SkillsStatesCore'][_0x1b0165(0x233)](_0x45d887);},VisuMZ[_0x15a52d(0x397)]['ParseStateNotetags']=VisuMZ[_0x15a52d(0x3b5)],VisuMZ[_0x15a52d(0x3b5)]=function(_0x448a91){const _0x5da9db=_0x15a52d;VisuMZ['SkillsStatesCore']['ParseStateNotetags'][_0x5da9db(0x2b6)](this,_0x448a91),VisuMZ['SkillsStatesCore'][_0x5da9db(0x296)](_0x448a91),VisuMZ[_0x5da9db(0x397)]['Parse_Notetags_State_PassiveJS'](_0x448a91),VisuMZ[_0x5da9db(0x397)][_0x5da9db(0x26a)](_0x448a91),VisuMZ[_0x5da9db(0x397)][_0x5da9db(0x403)](_0x448a91);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x26c)]=function(_0xef7e83){const _0x18d189=_0x15a52d,_0x34fe13=_0xef7e83['note'];_0x34fe13[_0x18d189(0xed)](/<MP COST:[ ](\d+)>/i)&&(_0xef7e83['mpCost']=Number(RegExp['$1'])),_0x34fe13[_0x18d189(0xed)](/<TP COST:[ ](\d+)>/i)&&(_0xef7e83['tpCost']=Number(RegExp['$1']));},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2da)]=function(_0x5eca91){const _0x4d01c5=_0x15a52d;if(!_0x5eca91)return;_0x5eca91[_0x4d01c5(0x3a0)]=0x32;const _0x53766a=_0x5eca91[_0x4d01c5(0x2df)]||'';_0x53766a[_0x4d01c5(0xed)](/<(?:|ID )SORT(?:|ING)[ ]PRIORITY:[ ](\d+)>/i)&&(_0x5eca91['sortPriority']=Number(RegExp['$1']));},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x1a5)]={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2bf)]={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x233)]=function(_0x52bfee){const _0x279958=_0x15a52d,_0x4011ed=_0x52bfee[_0x279958(0x2df)];if(_0x4011ed[_0x279958(0xed)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x5adb8e=String(RegExp['$1']),_0x83bbab=_0x279958(0x381)['format'](_0x5adb8e);VisuMZ[_0x279958(0x397)][_0x279958(0x1a5)][_0x52bfee['id']]=new Function(_0x279958(0x22c),_0x83bbab);}if(_0x4011ed[_0x279958(0xed)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x59a609=String(RegExp['$1']),_0x35b9a2=_0x279958(0x193)['format'](_0x59a609);VisuMZ[_0x279958(0x397)][_0x279958(0x2bf)][_0x52bfee['id']]=new Function(_0x279958(0x22c),_0x35b9a2);}},VisuMZ['SkillsStatesCore'][_0x15a52d(0x296)]=function(_0x175010){const _0x3bade9=_0x15a52d;_0x175010[_0x3bade9(0xe1)]=['ALL',_0x3bade9(0x1b6)];const _0x2097d5=_0x175010[_0x3bade9(0x2df)],_0x208657=_0x2097d5['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x208657)for(const _0x172cc6 of _0x208657){_0x172cc6['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x5d6d56=String(RegExp['$1'])['toUpperCase']()['trim']()[_0x3bade9(0x23f)](',');for(const _0x199706 of _0x5d6d56){_0x175010[_0x3bade9(0xe1)][_0x3bade9(0x13f)](_0x199706[_0x3bade9(0xe8)]());}}if(_0x2097d5[_0x3bade9(0xed)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x1edb48=RegExp['$1'][_0x3bade9(0x23f)](/[\r\n]+/);for(const _0x527bfa of _0x1edb48){_0x175010[_0x3bade9(0xe1)][_0x3bade9(0x13f)](_0x527bfa[_0x3bade9(0x219)]()[_0x3bade9(0xe8)]());}}_0x2097d5[_0x3bade9(0xed)](/<POSITIVE STATE>/i)&&_0x175010['categories']['push'](_0x3bade9(0x361)),_0x2097d5[_0x3bade9(0xed)](/<NEGATIVE STATE>/i)&&_0x175010[_0x3bade9(0xe1)][_0x3bade9(0x13f)]('NEGATIVE');},VisuMZ[_0x15a52d(0x397)]['statePassiveConditionJS']={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x334)]=function(_0x506d0d){const _0x1f9bb6=_0x15a52d,_0x1bd267=_0x506d0d['note'];if(_0x1bd267[_0x1f9bb6(0xed)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x39b8f1=String(RegExp['$1']),_0x50b25b=_0x1f9bb6(0x396)[_0x1f9bb6(0x25f)](_0x39b8f1);VisuMZ[_0x1f9bb6(0x397)][_0x1f9bb6(0x2a2)][_0x506d0d['id']]=new Function(_0x1f9bb6(0x2d9),_0x50b25b);}},VisuMZ['SkillsStatesCore'][_0x15a52d(0x1ca)]={},VisuMZ['SkillsStatesCore'][_0x15a52d(0x347)]={},VisuMZ[_0x15a52d(0x397)]['stateMpSlipDamageJS']={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x149)]={},VisuMZ['SkillsStatesCore'][_0x15a52d(0x282)]={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2ef)]={},VisuMZ['SkillsStatesCore'][_0x15a52d(0x26a)]=function(_0x574d76){const _0x2ca1f1=_0x15a52d,_0x6f2dc7=_0x574d76['note'],_0x3ca785=_0x2ca1f1(0x216);if(_0x6f2dc7[_0x2ca1f1(0xed)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x511083=String(RegExp['$1']),_0x2d7b71=_0x3ca785[_0x2ca1f1(0x25f)](_0x511083,_0x2ca1f1(0x2e8),-0x1,_0x2ca1f1(0x1c1));VisuMZ[_0x2ca1f1(0x397)]['stateHpSlipDamageJS'][_0x574d76['id']]=new Function(_0x2ca1f1(0x1e2),_0x2d7b71);}else{if(_0x6f2dc7[_0x2ca1f1(0xed)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x286635=String(RegExp['$1']),_0x2b7d6a=_0x3ca785[_0x2ca1f1(0x25f)](_0x286635,_0x2ca1f1(0x364),0x1,_0x2ca1f1(0x1c1));VisuMZ[_0x2ca1f1(0x397)]['stateHpSlipHealJS'][_0x574d76['id']]=new Function(_0x2ca1f1(0x1e2),_0x2b7d6a);}}if(_0x6f2dc7[_0x2ca1f1(0xed)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){const _0x248034=String(RegExp['$1']),_0x18b452=_0x3ca785[_0x2ca1f1(0x25f)](_0x248034,'damage',-0x1,'slipMp');VisuMZ['SkillsStatesCore'][_0x2ca1f1(0x25e)][_0x574d76['id']]=new Function(_0x2ca1f1(0x1e2),_0x18b452);}else{if(_0x6f2dc7[_0x2ca1f1(0xed)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0xe4f31c=String(RegExp['$1']),_0x4c342a=_0x3ca785[_0x2ca1f1(0x25f)](_0xe4f31c,_0x2ca1f1(0x364),0x1,'slipMp');VisuMZ[_0x2ca1f1(0x397)][_0x2ca1f1(0x149)][_0x574d76['id']]=new Function(_0x2ca1f1(0x1e2),_0x4c342a);}}if(_0x6f2dc7[_0x2ca1f1(0xed)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x2857e7=String(RegExp['$1']),_0x57df72=_0x3ca785[_0x2ca1f1(0x25f)](_0x2857e7,_0x2ca1f1(0x2e8),-0x1,_0x2ca1f1(0x1d7));VisuMZ[_0x2ca1f1(0x397)][_0x2ca1f1(0x282)][_0x574d76['id']]=new Function(_0x2ca1f1(0x1e2),_0x57df72);}else{if(_0x6f2dc7[_0x2ca1f1(0xed)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x5efa87=String(RegExp['$1']),_0x1c65ee=_0x3ca785['format'](_0x5efa87,_0x2ca1f1(0x364),0x1,_0x2ca1f1(0x1d7));VisuMZ[_0x2ca1f1(0x397)]['stateTpSlipHealJS'][_0x574d76['id']]=new Function(_0x2ca1f1(0x1e2),_0x1c65ee);}}},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0xe7)]={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3b6)]={},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x300)]={},VisuMZ[_0x15a52d(0x397)]['Parse_Notetags_State_ApplyRemoveLeaveJS']=function(_0x35d9d1){const _0x1dfc37=_0x15a52d,_0x14cdbf=_0x35d9d1[_0x1dfc37(0x2df)],_0x190dc1=_0x1dfc37(0x281);if(_0x14cdbf['match'](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0x1515a6=String(RegExp['$1']),_0x5da580=_0x190dc1['format'](_0x1515a6);VisuMZ[_0x1dfc37(0x397)][_0x1dfc37(0xe7)][_0x35d9d1['id']]=new Function(_0x1dfc37(0x1e2),_0x5da580);}if(_0x14cdbf[_0x1dfc37(0xed)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x5646af=String(RegExp['$1']),_0x2ff2a7=_0x190dc1[_0x1dfc37(0x25f)](_0x5646af);VisuMZ['SkillsStatesCore'][_0x1dfc37(0x3b6)][_0x35d9d1['id']]=new Function(_0x1dfc37(0x1e2),_0x2ff2a7);}if(_0x14cdbf[_0x1dfc37(0xed)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x56483c=String(RegExp['$1']),_0x4fea79=_0x190dc1['format'](_0x56483c);VisuMZ[_0x1dfc37(0x397)][_0x1dfc37(0x300)][_0x35d9d1['id']]=new Function(_0x1dfc37(0x1e2),_0x4fea79);}},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x147)]=function(){const _0x2f3e3e=_0x15a52d;if(!VisuMZ[_0x2f3e3e(0x397)][_0x2f3e3e(0x3bc)]['States'][_0x2f3e3e(0xee)])return;for(const _0x234dee of $dataStates){if(!_0x234dee)continue;_0x234dee[_0x2f3e3e(0x3d1)]===0x4&&_0x234dee['autoRemovalTiming']===0x1&&(_0x234dee[_0x2f3e3e(0x112)]=0x2);}},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0xea)]=function(_0x9a548e,_0x2068e8){const _0xce57e5=_0x15a52d;if(VisuMZ[_0xce57e5(0xea)])return VisuMZ[_0xce57e5(0xea)](_0x9a548e,_0x2068e8);let _0x4474b4='';if($dataActors[_0xce57e5(0xf9)](_0x9a548e))_0x4474b4=_0xce57e5(0x106)[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataClasses[_0xce57e5(0xf9)](_0x9a548e))_0x4474b4=_0xce57e5(0x18e)[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataSkills['includes'](_0x9a548e))_0x4474b4=_0xce57e5(0x2f7)[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataItems[_0xce57e5(0xf9)](_0x9a548e))_0x4474b4='Item-%1-%2'[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataWeapons[_0xce57e5(0xf9)](_0x9a548e))_0x4474b4='Weapon-%1-%2'[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataArmors['includes'](_0x9a548e))_0x4474b4=_0xce57e5(0x249)[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataEnemies[_0xce57e5(0xf9)](_0x9a548e))_0x4474b4=_0xce57e5(0x3f6)[_0xce57e5(0x25f)](_0x9a548e['id'],_0x2068e8);if($dataStates[_0xce57e5(0xf9)](_0x9a548e))_0x4474b4=_0xce57e5(0x126)['format'](_0x9a548e['id'],_0x2068e8);return _0x4474b4;},DataManager['getClassIdWithName']=function(_0x13616e){const _0x22a9e8=_0x15a52d;_0x13616e=_0x13616e[_0x22a9e8(0x219)]()['trim'](),this[_0x22a9e8(0x198)]=this[_0x22a9e8(0x198)]||{};if(this[_0x22a9e8(0x198)][_0x13616e])return this[_0x22a9e8(0x198)][_0x13616e];for(const _0x29485a of $dataClasses){if(!_0x29485a)continue;let _0x3e9f4d=_0x29485a['name'];_0x3e9f4d=_0x3e9f4d['replace'](/\x1I\[(\d+)\]/gi,''),_0x3e9f4d=_0x3e9f4d[_0x22a9e8(0xf4)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x3e9f4d[_0x22a9e8(0x219)]()[_0x22a9e8(0xe8)]()]=_0x29485a['id'];}return this[_0x22a9e8(0x198)][_0x13616e]||0x0;},DataManager[_0x15a52d(0x23b)]=function(_0x5ebe59){const _0x2b9342=_0x15a52d;this[_0x2b9342(0x1fa)]=this['_stypeIDs']||{};if(this[_0x2b9342(0x1fa)][_0x5ebe59['id']])return this[_0x2b9342(0x1fa)][_0x5ebe59['id']];this[_0x2b9342(0x1fa)][_0x5ebe59['id']]=[_0x5ebe59['stypeId']];if(_0x5ebe59[_0x2b9342(0x2df)][_0x2b9342(0xed)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1407c8=JSON[_0x2b9342(0x3ef)]('['+RegExp['$1'][_0x2b9342(0xed)](/\d+/g)+']');this[_0x2b9342(0x1fa)][_0x5ebe59['id']]=this['_stypeIDs'][_0x5ebe59['id']][_0x2b9342(0x13c)](_0x1407c8);}else{if(_0x5ebe59['note']['match'](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x30b831=RegExp['$1'][_0x2b9342(0x23f)](',');for(const _0x38785a of _0x30b831){const _0xe5cd02=DataManager[_0x2b9342(0x2e3)](_0x38785a);if(_0xe5cd02)this[_0x2b9342(0x1fa)][_0x5ebe59['id']][_0x2b9342(0x13f)](_0xe5cd02);}}}return this['_stypeIDs'][_0x5ebe59['id']];},DataManager[_0x15a52d(0x2e3)]=function(_0x141b00){const _0xf7bedb=_0x15a52d;_0x141b00=_0x141b00[_0xf7bedb(0x219)]()['trim'](),this[_0xf7bedb(0x1fa)]=this[_0xf7bedb(0x1fa)]||{};if(this['_stypeIDs'][_0x141b00])return this[_0xf7bedb(0x1fa)][_0x141b00];for(let _0x1174e1=0x1;_0x1174e1<0x64;_0x1174e1++){if(!$dataSystem['skillTypes'][_0x1174e1])continue;let _0x7fc505=$dataSystem[_0xf7bedb(0x273)][_0x1174e1][_0xf7bedb(0x219)]()[_0xf7bedb(0xe8)]();_0x7fc505=_0x7fc505[_0xf7bedb(0xf4)](/\x1I\[(\d+)\]/gi,''),_0x7fc505=_0x7fc505[_0xf7bedb(0xf4)](/\\I\[(\d+)\]/gi,''),this[_0xf7bedb(0x1fa)][_0x7fc505]=_0x1174e1;}return this[_0xf7bedb(0x1fa)][_0x141b00]||0x0;},DataManager['getSkillIdWithName']=function(_0x12fa58){const _0x381c1c=_0x15a52d;_0x12fa58=_0x12fa58[_0x381c1c(0x219)]()[_0x381c1c(0xe8)](),this['_skillIDs']=this[_0x381c1c(0x2aa)]||{};if(this[_0x381c1c(0x2aa)][_0x12fa58])return this[_0x381c1c(0x2aa)][_0x12fa58];for(const _0x883881 of $dataSkills){if(!_0x883881)continue;this[_0x381c1c(0x2aa)][_0x883881[_0x381c1c(0x3df)][_0x381c1c(0x219)]()[_0x381c1c(0xe8)]()]=_0x883881['id'];}return this[_0x381c1c(0x2aa)][_0x12fa58]||0x0;},DataManager[_0x15a52d(0x20f)]=function(_0x1d7604){const _0x11553d=_0x15a52d;_0x1d7604=_0x1d7604[_0x11553d(0x219)]()[_0x11553d(0xe8)](),this[_0x11553d(0x23d)]=this['_stateIDs']||{};if(this['_stateIDs'][_0x1d7604])return this[_0x11553d(0x23d)][_0x1d7604];for(const _0x3bde00 of $dataStates){if(!_0x3bde00)continue;this['_stateIDs'][_0x3bde00['name'][_0x11553d(0x219)]()[_0x11553d(0xe8)]()]=_0x3bde00['id'];}return this['_stateIDs'][_0x1d7604]||0x0;},DataManager[_0x15a52d(0x236)]=function(_0x33c214){const _0x5ebadc=_0x15a52d;this[_0x5ebadc(0x3c9)]=this[_0x5ebadc(0x3c9)]||{};if(this[_0x5ebadc(0x3c9)][_0x33c214])return this[_0x5ebadc(0x3c9)][_0x33c214];return $dataStates[_0x33c214][_0x5ebadc(0x2df)][_0x5ebadc(0xed)](/<MAX TURNS:[ ](\d+)>/i)?this[_0x5ebadc(0x3c9)][_0x33c214]=Number(RegExp['$1']):this[_0x5ebadc(0x3c9)][_0x33c214]=VisuMZ[_0x5ebadc(0x397)]['Settings'][_0x5ebadc(0x211)][_0x5ebadc(0x274)],this[_0x5ebadc(0x3c9)][_0x33c214];},DataManager[_0x15a52d(0x2a1)]=function(_0x409f61){const _0x4b6296=_0x15a52d;if(!_0x409f61)return{};this[_0x4b6296(0x1ab)]=this[_0x4b6296(0x1ab)]||{};if(this['_skillChangesFromState'][_0x409f61['id']]!==undefined)return this[_0x4b6296(0x1ab)][_0x409f61['id']];const _0x25a410=_0x409f61[_0x4b6296(0x2df)]||'',_0x5f16ed={};{const _0x1817d1=_0x25a410['match'](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);if(_0x1817d1)for(const _0x351e25 of _0x1817d1){_0x351e25[_0x4b6296(0xed)](/<SKILL CHANGE(?:|S):[ ](.*)[ ]>>>[ ](.*)>/gi);let _0x4861c2=String(RegExp['$1']),_0x3e7140=String(RegExp['$2']);VisuMZ['SkillsStatesCore'][_0x4b6296(0x139)](_0x5f16ed,_0x4861c2,_0x3e7140);}}if(_0x25a410[_0x4b6296(0xed)](/<SKILL CHANGE(?:|S)>\s*([\s\S]*)\s*<\/SKILL CHANGE(?:|S)>/i)){const _0x1836e2=String(RegExp['$1'])[_0x4b6296(0x23f)](/[\r\n]+/)[_0x4b6296(0x28f)]('');for(const _0x185cf2 of _0x1836e2){if(_0x185cf2[_0x4b6296(0xed)](/(.*)[ ]>>>[ ](.*)/i)){let _0x283ff9=String(RegExp['$1']),_0x3e5255=String(RegExp['$2']);VisuMZ[_0x4b6296(0x397)][_0x4b6296(0x139)](_0x5f16ed,_0x283ff9,_0x3e5255);}}}return this[_0x4b6296(0x1ab)][_0x409f61['id']]=_0x5f16ed,this[_0x4b6296(0x1ab)][_0x409f61['id']];},VisuMZ['SkillsStatesCore']['ParseSkillChangessIntoData']=function(_0x68064f,_0x72bd3d,_0x4d7b55){const _0x4f1d0f=_0x15a52d;/^\d+$/[_0x4f1d0f(0x117)](_0x72bd3d)?_0x72bd3d=Number(_0x72bd3d):_0x72bd3d=DataManager[_0x4f1d0f(0x2e1)](_0x72bd3d),/^\d+$/[_0x4f1d0f(0x117)](_0x4d7b55)?_0x4d7b55=Number(_0x4d7b55):_0x4d7b55=DataManager['getSkillIdWithName'](_0x4d7b55),_0x68064f[_0x72bd3d]=_0x4d7b55;},DataManager[_0x15a52d(0x2e9)]=function(_0x208bb6){const _0x30956c=_0x15a52d;if(!DataManager['isSkill'](_0x208bb6))return![];this[_0x30956c(0x38e)]=this[_0x30956c(0x38e)]||{};if(this[_0x30956c(0x38e)][_0x208bb6['id']]!==undefined)return this[_0x30956c(0x38e)][_0x208bb6['id']];this[_0x30956c(0x38e)][_0x208bb6['id']]=![];const _0x2f1167=_0x208bb6[_0x30956c(0x2df)]||'';if(_0x2f1167[_0x30956c(0xed)](/<TOGGLE>/i))this['_cache_isToggleSkill'][_0x208bb6['id']]=!![];else{if(_0x2f1167[_0x30956c(0xed)](/<INITIAL TOGGLE: ON>/i))this[_0x30956c(0x38e)][_0x208bb6['id']]=!![];else{if(_0x2f1167[_0x30956c(0xed)](/<INITIAL TOGGLE: OFF>/i))this[_0x30956c(0x38e)][_0x208bb6['id']]=!![];else _0x2f1167['match'](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(this[_0x30956c(0x38e)][_0x208bb6['id']]=!![]);}}return this[_0x30956c(0x1ef)](_0x2f1167)&&(this[_0x30956c(0x38e)][_0x208bb6['id']]=![]),this[_0x30956c(0x38e)][_0x208bb6['id']];},DataManager[_0x15a52d(0x1ef)]=function(_0x5b553b){const _0x23f4e8=_0x15a52d;if(Imported[_0x23f4e8(0xef)]){const _0x44a134=VisuMZ[_0x23f4e8(0x18c)]['RegExp'];if(_0x5b553b[_0x23f4e8(0xed)](_0x44a134['AvailableChainSkill']))return!![];if(_0x5b553b['match'](_0x44a134[_0x23f4e8(0x14b)]))return!![];if(_0x5b553b['match'](_0x44a134[_0x23f4e8(0x354)]))return!![];}if(Imported[_0x23f4e8(0x2ae)]){const _0x42ac69=VisuMZ['EvoMatrixSkills']['RegExp'];if(_0x5b553b[_0x23f4e8(0xed)](_0x42ac69[_0x23f4e8(0x326)]))return!![];if(_0x5b553b[_0x23f4e8(0xed)](_0x42ac69[_0x23f4e8(0x1ec)]))return!![];if(_0x5b553b['match'](_0x42ac69['LearnedMatrix']))return!![];}if(Imported[_0x23f4e8(0x245)]){const _0x11b766=VisuMZ[_0x23f4e8(0x269)][_0x23f4e8(0x36a)];if(_0x5b553b[_0x23f4e8(0xed)](_0x11b766[_0x23f4e8(0x26d)]))return!![];}if(Imported[_0x23f4e8(0x200)]){const _0x3a4f0c=VisuMZ[_0x23f4e8(0x2c2)][_0x23f4e8(0x36a)];if(_0x5b553b[_0x23f4e8(0xed)](_0x3a4f0c[_0x23f4e8(0x187)]))return!![];}if(Imported['VisuMZ_3_ItemAmplifySkills']){const _0x51c1a9=VisuMZ['ItemAmplifySkills'][_0x23f4e8(0x36a)];if(_0x5b553b[_0x23f4e8(0xed)](_0x51c1a9[_0x23f4e8(0x34f)]))return!![];}if(Imported[_0x23f4e8(0x102)]){const _0x340a05=VisuMZ['ItemConcoctSkills'][_0x23f4e8(0x36a)];if(_0x5b553b['match'](_0x340a05['CanConcoct']))return!![];}if(Imported['VisuMZ_3_ItemThrowSkills']){const _0x1ab89e=VisuMZ[_0x23f4e8(0x1c9)][_0x23f4e8(0x36a)];if(_0x5b553b['match'](_0x1ab89e[_0x23f4e8(0x365)]))return!![];}if(Imported[_0x23f4e8(0x239)]){const _0x22bb31=VisuMZ[_0x23f4e8(0x210)][_0x23f4e8(0x36a)];if(_0x5b553b[_0x23f4e8(0xed)](_0x22bb31[_0x23f4e8(0x344)]))return!![];if(_0x5b553b[_0x23f4e8(0xed)](_0x22bb31[_0x23f4e8(0x11e)]))return!![];if(_0x5b553b['match'](_0x22bb31['ForceList']))return!![];if(_0x5b553b[_0x23f4e8(0xed)](_0x22bb31[_0x23f4e8(0x30e)]))return!![];}return![];},DataManager[_0x15a52d(0x304)]=function(_0x483eda){const _0x2db955=_0x15a52d,_0x544ebf=_0x483eda?_0x483eda['note']||'':'';if(_0x544ebf[_0x2db955(0xed)](/<INITIAL TOGGLE: ON>/i))return!![];else{if(_0x544ebf['match'](/<INITIAL TOGGLE: OFF>/i))return![];}return VisuMZ[_0x2db955(0x397)]['Settings'][_0x2db955(0x15b)][_0x2db955(0x16b)];},DataManager[_0x15a52d(0x121)]=function(_0x36624d){const _0x1f94ff=_0x15a52d;if(!this['isSkill'](_0x36624d))return[];this[_0x1f94ff(0x1e4)]=this[_0x1f94ff(0x1e4)]||{};if(this[_0x1f94ff(0x1e4)][_0x36624d['id']]!==undefined)return this[_0x1f94ff(0x1e4)][_0x36624d['id']];let _0x2d2aca=[];const _0x14c8bd=_0x36624d[_0x1f94ff(0x2df)]||'';return _0x14c8bd[_0x1f94ff(0xed)](/<TOGGLE EXCLU(?:DE|SION) GROUP(?:|S):[ ](.*)>/i)&&(_0x2d2aca=String(RegExp['$1'])[_0x1f94ff(0x23f)](',')[_0x1f94ff(0x258)](_0x18ffa3=>_0x18ffa3[_0x1f94ff(0x219)]()[_0x1f94ff(0xe8)]())),this[_0x1f94ff(0x1e4)][_0x36624d['id']]=_0x2d2aca,this['_cache_toggleExclusionGroups'][_0x36624d['id']];},TextManager[_0x15a52d(0x20e)]=VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3bc)]['Toggles'][_0x15a52d(0x305)]??'Toggle',TextManager['toggleOn']=VisuMZ[_0x15a52d(0x397)]['Settings'][_0x15a52d(0x15b)][_0x15a52d(0x108)]??_0x15a52d(0x19f),TextManager[_0x15a52d(0x339)]=VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3bc)][_0x15a52d(0x15b)][_0x15a52d(0x317)]??_0x15a52d(0x238),TextManager[_0x15a52d(0x392)]=VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3bc)][_0x15a52d(0x15b)][_0x15a52d(0x39d)]??_0x15a52d(0x15d),ColorManager[_0x15a52d(0x1f8)]=function(_0x719748,_0x30a468){const _0x50d5cc=_0x15a52d;return _0x30a468=String(_0x30a468),this[_0x50d5cc(0x319)]=this['_colorCache']||{},_0x30a468[_0x50d5cc(0xed)](/#(.*)/i)?this['_colorCache'][_0x719748]=_0x50d5cc(0x371)['format'](String(RegExp['$1'])):this[_0x50d5cc(0x319)][_0x719748]=this[_0x50d5cc(0x22d)](Number(_0x30a468)),this[_0x50d5cc(0x319)][_0x719748];},ColorManager[_0x15a52d(0x29f)]=function(_0x235bc3){const _0x12b4d7=_0x15a52d;return _0x235bc3=String(_0x235bc3),_0x235bc3['match'](/#(.*)/i)?_0x12b4d7(0x371)[_0x12b4d7(0x25f)](String(RegExp['$1'])):this[_0x12b4d7(0x22d)](Number(_0x235bc3));},ColorManager[_0x15a52d(0x3cd)]=function(_0x41b2ce){const _0x168a45=_0x15a52d;if(typeof _0x41b2ce==='number')_0x41b2ce=$dataStates[_0x41b2ce];const _0x1d532a=_0x168a45(0x1c3)[_0x168a45(0x25f)](_0x41b2ce['id']);this[_0x168a45(0x319)]=this[_0x168a45(0x319)]||{};if(this[_0x168a45(0x319)][_0x1d532a])return this['_colorCache'][_0x1d532a];const _0x2b3307=this['retrieveStateColor'](_0x41b2ce);return this[_0x168a45(0x1f8)](_0x1d532a,_0x2b3307);},ColorManager[_0x15a52d(0x360)]=function(_0x3c764e){const _0x20888d=_0x15a52d,_0x1bf4ec=_0x3c764e[_0x20888d(0x2df)];if(_0x1bf4ec['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x1bf4ec[_0x20888d(0xed)](/<POSITIVE STATE>/i))return VisuMZ[_0x20888d(0x397)][_0x20888d(0x3bc)][_0x20888d(0x211)][_0x20888d(0x1bc)];else return _0x1bf4ec['match'](/<NEGATIVE STATE>/i)?VisuMZ[_0x20888d(0x397)]['Settings'][_0x20888d(0x211)][_0x20888d(0x24d)]:VisuMZ[_0x20888d(0x397)][_0x20888d(0x3bc)][_0x20888d(0x211)][_0x20888d(0x30f)];}},ColorManager[_0x15a52d(0x263)]=function(){const _0x2099b2=_0x15a52d,_0x578f35=_0x2099b2(0x386);this['_colorCache']=this[_0x2099b2(0x319)]||{};if(this[_0x2099b2(0x319)][_0x578f35])return this[_0x2099b2(0x319)][_0x578f35];const _0x542a03=VisuMZ['SkillsStatesCore'][_0x2099b2(0x3bc)][_0x2099b2(0x35b)]['ColorBuff'];return this[_0x2099b2(0x1f8)](_0x578f35,_0x542a03);},ColorManager[_0x15a52d(0x3af)]=function(){const _0x29a7ac=_0x15a52d,_0x2eb00b=_0x29a7ac(0x28a);this[_0x29a7ac(0x319)]=this[_0x29a7ac(0x319)]||{};if(this['_colorCache'][_0x2eb00b])return this['_colorCache'][_0x2eb00b];const _0x3d7504=VisuMZ[_0x29a7ac(0x397)][_0x29a7ac(0x3bc)][_0x29a7ac(0x35b)][_0x29a7ac(0x369)];return this['getColorDataFromPluginParameters'](_0x2eb00b,_0x3d7504);},SceneManager[_0x15a52d(0x3cc)]=function(){const _0x3a2c93=_0x15a52d;return this['_scene']&&this[_0x3a2c93(0x335)][_0x3a2c93(0x140)]===Scene_Battle;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x290)]=BattleManager['endAction'],BattleManager['endAction']=function(){const _0x5043fb=_0x15a52d;this['updateStatesActionEnd'](),VisuMZ[_0x5043fb(0x397)][_0x5043fb(0x290)]['call'](this);},BattleManager['updateStatesActionEnd']=function(){const _0x24f56d=_0x15a52d,_0x49d504=VisuMZ[_0x24f56d(0x397)][_0x24f56d(0x3bc)][_0x24f56d(0x211)];if(!_0x49d504)return;if(_0x49d504['ActionEndUpdate']===![])return;if(!this['_subject'])return;this[_0x24f56d(0x328)][_0x24f56d(0x12c)]();},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x12c)]=function(){const _0x529410=_0x15a52d;if(BattleManager[_0x529410(0x3bb)]!=='action')return;if(this[_0x529410(0x378)]===Graphics[_0x529410(0x10b)])return;this[_0x529410(0x378)]=Graphics[_0x529410(0x10b)];for(const _0x1a1614 of this[_0x529410(0x2a3)]){const _0x268c5e=$dataStates[_0x1a1614];if(!_0x268c5e)continue;if(_0x268c5e[_0x529410(0x112)]!==0x1)continue;this[_0x529410(0x1cd)][_0x1a1614]>0x0&&this[_0x529410(0x1cd)][_0x1a1614]--;}this[_0x529410(0x19d)](0x1);},Game_BattlerBase['prototype']['updateStateTurns']=function(){const _0x524d13=_0x15a52d,_0x446fa8=VisuMZ[_0x524d13(0x397)][_0x524d13(0x3bc)][_0x524d13(0x211)];for(const _0x5d6826 of this[_0x524d13(0x2a3)]){const _0x44b434=$dataStates[_0x5d6826];if(_0x446fa8&&_0x446fa8[_0x524d13(0xee)]!==![]){if(_0x44b434&&_0x44b434[_0x524d13(0x112)]===0x1)continue;}this[_0x524d13(0x1cd)][_0x5d6826]>0x0&&this[_0x524d13(0x1cd)][_0x5d6826]--;}},VisuMZ['SkillsStatesCore']['Game_Switches_onChange']=Game_Switches['prototype'][_0x15a52d(0x342)],Game_Switches[_0x15a52d(0x21f)][_0x15a52d(0x342)]=function(){const _0x104972=_0x15a52d;VisuMZ[_0x104972(0x397)][_0x104972(0xe5)][_0x104972(0x2b6)](this);const _0x35da08=VisuMZ['SkillsStatesCore'][_0x104972(0x3bc)][_0x104972(0x3a9)]['RefreshCacheSwitch']??!![];if(!_0x35da08)return;if(SceneManager[_0x104972(0x3cc)]())for(const _0x342558 of BattleManager[_0x104972(0x137)]()){if(_0x342558)_0x342558['refresh']();}},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2fb)]=Game_Variables[_0x15a52d(0x21f)]['onChange'],Game_Variables[_0x15a52d(0x21f)][_0x15a52d(0x342)]=function(){const _0x4fba7a=_0x15a52d;VisuMZ[_0x4fba7a(0x397)][_0x4fba7a(0x2fb)]['call'](this);const _0x6c8a1d=VisuMZ[_0x4fba7a(0x397)]['Settings'][_0x4fba7a(0x3a9)][_0x4fba7a(0x16d)]??!![];if(!_0x6c8a1d)return;if(SceneManager[_0x4fba7a(0x3cc)]())for(const _0x52d4b6 of BattleManager[_0x4fba7a(0x137)]()){if(_0x52d4b6)_0x52d4b6[_0x4fba7a(0x309)]();}},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x232)]=Game_Action['prototype'][_0x15a52d(0x1d4)],Game_Action['prototype'][_0x15a52d(0x1d4)]=function(_0x3e607b){const _0x20bbe0=_0x15a52d;VisuMZ[_0x20bbe0(0x397)]['Game_Action_applyItemUserEffect'][_0x20bbe0(0x2b6)](this,_0x3e607b),this['applySkillsStatesCoreEffects'](_0x3e607b);},Game_Action['prototype'][_0x15a52d(0x3ad)]=function(_0x1faf8d){const _0x28b47c=_0x15a52d;this['applyStateCategoryRemovalEffects'](_0x1faf8d),this[_0x28b47c(0x18a)](_0x1faf8d),this[_0x28b47c(0x3ce)](_0x1faf8d),this[_0x28b47c(0x2a5)](_0x1faf8d);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3f1)]=Game_Action['prototype'][_0x15a52d(0x366)],Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x366)]=function(_0x5eac41){const _0x1b4a97=_0x15a52d;if(this[_0x1b4a97(0x405)](_0x5eac41))return!![];return VisuMZ[_0x1b4a97(0x397)][_0x1b4a97(0x3f1)]['call'](this,_0x5eac41);},Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x405)]=function(_0x3bd4d8){const _0x251c0a=_0x15a52d;if(!this[_0x251c0a(0x2f0)]())return;const _0xddebe1=this[_0x251c0a(0x2f0)]()[_0x251c0a(0x2df)];if(_0xddebe1[_0x251c0a(0xed)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){const _0x24c47a=String(RegExp['$1']);if(_0x3bd4d8[_0x251c0a(0x2bc)](_0x24c47a))return!![];}if(_0xddebe1[_0x251c0a(0xed)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){const _0x229ecb=Number(RegExp['$1']);if(_0x3bd4d8[_0x251c0a(0xf3)](_0x229ecb))return!![];}else{if(_0xddebe1[_0x251c0a(0xed)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x2eb798=DataManager[_0x251c0a(0x20f)](RegExp['$1']);if(_0x3bd4d8[_0x251c0a(0xf3)](_0x2eb798))return!![];}}return![];},Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x28b)]=function(_0x3bc369){const _0x1a28bf=_0x15a52d;if(_0x3bc369['states']()['length']<=0x0)return;const _0x3924d1=this[_0x1a28bf(0x2f0)]()['note'];{const _0x27c37e=_0x3924d1[_0x1a28bf(0xed)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x27c37e)for(const _0x2068f2 of _0x27c37e){_0x2068f2[_0x1a28bf(0xed)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0xe0e883=String(RegExp['$1']);_0x3bc369[_0x1a28bf(0x3b2)](_0xe0e883);}}{const _0x443cba=_0x3924d1[_0x1a28bf(0xed)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x443cba)for(const _0x212ca5 of _0x443cba){_0x212ca5[_0x1a28bf(0xed)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x5c1bea=String(RegExp['$1']),_0x730dd9=Number(RegExp['$2']);_0x3bc369[_0x1a28bf(0x3eb)](_0x5c1bea,_0x730dd9);}}},Game_Action['prototype'][_0x15a52d(0x18a)]=function(_0x37c109){const _0x49ca25=_0x15a52d,_0x37be58=this['item']()['note'],_0x1f90b8=_0x37be58['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x1f90b8)for(const _0x51e6b1 of _0x1f90b8){let _0x52f26a=0x0,_0x59ef96=0x0;if(_0x51e6b1[_0x49ca25(0xed)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x52f26a=Number(RegExp['$1']),_0x59ef96=Number(RegExp['$2']);else _0x51e6b1[_0x49ca25(0xed)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x52f26a=DataManager[_0x49ca25(0x20f)](RegExp['$1']),_0x59ef96=Number(RegExp['$2']));_0x37c109['setStateTurns'](_0x52f26a,_0x59ef96),this['makeSuccess'](_0x37c109);}const _0x32032d=_0x37be58['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x32032d)for(const _0x399f5d of _0x32032d){let _0x2f8c8a=0x0,_0x15eb31=0x0;if(_0x399f5d[_0x49ca25(0xed)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x2f8c8a=Number(RegExp['$1']),_0x15eb31=Number(RegExp['$2']);else _0x399f5d['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x2f8c8a=DataManager['getStateIdWithName'](RegExp['$1']),_0x15eb31=Number(RegExp['$2']));_0x37c109[_0x49ca25(0x2ca)](_0x2f8c8a,_0x15eb31),this[_0x49ca25(0x313)](_0x37c109);}},Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x3ce)]=function(_0xbd1e27){const _0x5a3f=_0x15a52d,_0x5e0412=[_0x5a3f(0x24c),_0x5a3f(0x164),_0x5a3f(0x3c5),_0x5a3f(0x124),_0x5a3f(0x3e7),_0x5a3f(0xe6),_0x5a3f(0x1c4),'LUK'],_0x1671a4=this[_0x5a3f(0x2f0)]()[_0x5a3f(0x2df)],_0x542514=_0x1671a4[_0x5a3f(0xed)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x542514)for(const _0x1a9ad1 of _0x542514){_0x1a9ad1['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x2dd651=_0x5e0412[_0x5a3f(0x288)](String(RegExp['$1'])[_0x5a3f(0x219)]()),_0x38c0de=Number(RegExp['$2']);_0x2dd651>=0x0&&(_0xbd1e27[_0x5a3f(0x3c4)](_0x2dd651,_0x38c0de),this['makeSuccess'](_0xbd1e27));}const _0x8fd560=_0x1671a4[_0x5a3f(0xed)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x8fd560)for(const _0x3705c0 of _0x8fd560){_0x3705c0['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x178639=_0x5e0412[_0x5a3f(0x288)](String(RegExp['$1'])[_0x5a3f(0x219)]()),_0x56cd30=Number(RegExp['$2']);_0x178639>=0x0&&(_0xbd1e27[_0x5a3f(0x20a)](_0x178639,_0x56cd30),this[_0x5a3f(0x313)](_0xbd1e27));}},Game_Action[_0x15a52d(0x21f)]['applyDebuffTurnManipulationEffects']=function(_0x47e59a){const _0x5b28b3=_0x15a52d,_0x252737=[_0x5b28b3(0x24c),_0x5b28b3(0x164),_0x5b28b3(0x3c5),_0x5b28b3(0x124),_0x5b28b3(0x3e7),_0x5b28b3(0xe6),_0x5b28b3(0x1c4),_0x5b28b3(0x2b9)],_0x2a7438=this['item']()['note'],_0x39a9c2=_0x2a7438[_0x5b28b3(0xed)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x39a9c2)for(const _0x155afd of _0x39a9c2){_0x155afd[_0x5b28b3(0xed)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x47a04=_0x252737[_0x5b28b3(0x288)](String(RegExp['$1'])[_0x5b28b3(0x219)]()),_0x6dd108=Number(RegExp['$2']);_0x47a04>=0x0&&(_0x47e59a[_0x5b28b3(0x218)](_0x47a04,_0x6dd108),this[_0x5b28b3(0x313)](_0x47e59a));}const _0x4cbbc0=_0x2a7438[_0x5b28b3(0xed)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x4cbbc0)for(const _0x8093 of _0x4cbbc0){_0x8093[_0x5b28b3(0xed)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x10cbaa=_0x252737['indexOf'](String(RegExp['$1'])[_0x5b28b3(0x219)]()),_0x4626f7=Number(RegExp['$2']);_0x10cbaa>=0x0&&(_0x47e59a['addDebuffTurns'](_0x10cbaa,_0x4626f7),this[_0x5b28b3(0x313)](_0x47e59a));}},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x14c)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3fe)],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3fe)]=function(){const _0x1894f3=_0x15a52d;this['_cache']={},this[_0x1894f3(0x390)](),VisuMZ[_0x1894f3(0x397)][_0x1894f3(0x14c)][_0x1894f3(0x2b6)](this);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x390)]=function(){const _0x49eff0=_0x15a52d;this[_0x49eff0(0x377)]='',this['_stateData']={},this[_0x49eff0(0x1bf)]={},this['_stateOrigin']={},this[_0x49eff0(0x141)]={};},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1af)]=function(_0x5739e3){const _0x244e15=_0x15a52d;return this['_cache']=this[_0x244e15(0x2db)]||{},this[_0x244e15(0x2db)][_0x5739e3]!==undefined;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x13b)]=Game_BattlerBase[_0x15a52d(0x21f)]['refresh'],Game_BattlerBase['prototype']['refresh']=function(){const _0x4a4ecd=_0x15a52d;this[_0x4a4ecd(0x2db)]={},VisuMZ['SkillsStatesCore']['Game_BattlerBase_refresh']['call'](this);},VisuMZ['SkillsStatesCore'][_0x15a52d(0x33f)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2d6)],Game_BattlerBase[_0x15a52d(0x21f)]['eraseState']=function(_0x17204f){const _0x2c62b6=_0x15a52d;let _0x4b76c9=this[_0x2c62b6(0xf3)](_0x17204f);VisuMZ['SkillsStatesCore'][_0x2c62b6(0x33f)][_0x2c62b6(0x2b6)](this,_0x17204f);if(_0x4b76c9&&!this['isStateAffected'](_0x17204f))this['onRemoveState'](_0x17204f);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x177)]=function(_0x331f8f){const _0x1e5958=_0x15a52d;this[_0x1e5958(0x2fd)](_0x331f8f),this[_0x1e5958(0x3c1)](_0x331f8f);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x385)]=Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x2f2)],Game_Battler[_0x15a52d(0x21f)]['onBattleEnd']=function(){const _0x3b3370=_0x15a52d;VisuMZ[_0x3b3370(0x397)][_0x3b3370(0x385)][_0x3b3370(0x2b6)](this),this[_0x3b3370(0x1a0)](),this[_0x3b3370(0x37c)]=0x0,this[_0x3b3370(0x184)]=0x0;},VisuMZ['SkillsStatesCore'][_0x15a52d(0x3ab)]=Game_BattlerBase[_0x15a52d(0x21f)]['resetStateCounts'],Game_BattlerBase['prototype'][_0x15a52d(0x1d8)]=function(_0x5e21e6){const _0x1ea14b=_0x15a52d,_0x2bdd10=$dataStates[_0x5e21e6],_0x3d0e81=this[_0x1ea14b(0x223)](_0x5e21e6),_0xb8b098=this['getStateReapplyRulings'](_0x2bdd10)['toLowerCase']()['trim']();switch(_0xb8b098){case _0x1ea14b(0x3ea):if(_0x3d0e81<=0x0)this[_0x1ea14b(0x224)](_0x5e21e6);break;case _0x1ea14b(0x3de):this[_0x1ea14b(0x224)](_0x5e21e6);break;case _0x1ea14b(0xfb):this[_0x1ea14b(0x224)](_0x5e21e6),this[_0x1ea14b(0x1cd)][_0x5e21e6]=Math['max'](this['_stateTurns'][_0x5e21e6],_0x3d0e81);break;case _0x1ea14b(0x389):this[_0x1ea14b(0x224)](_0x5e21e6),this[_0x1ea14b(0x1cd)][_0x5e21e6]+=_0x3d0e81;break;default:this[_0x1ea14b(0x224)](_0x5e21e6);break;}if(this[_0x1ea14b(0xf3)](_0x5e21e6)){const _0x15c0e9=DataManager[_0x1ea14b(0x236)](_0x5e21e6);this['_stateTurns'][_0x5e21e6]=this['_stateTurns'][_0x5e21e6][_0x1ea14b(0x332)](0x0,_0x15c0e9);}},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x224)]=function(_0x169580){const _0x3ab930=_0x15a52d;VisuMZ[_0x3ab930(0x397)][_0x3ab930(0x3ab)][_0x3ab930(0x2b6)](this,_0x169580);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0xfa)]=function(_0x14e53d){const _0x2d1660=_0x15a52d,_0x333fb7=_0x14e53d['note'];return _0x333fb7[_0x2d1660(0xed)](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x2d1660(0x397)][_0x2d1660(0x3bc)][_0x2d1660(0x211)][_0x2d1660(0x39f)];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3d8)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1c7)],Game_BattlerBase[_0x15a52d(0x21f)]['overwriteBuffTurns']=function(_0x4a7bed,_0x470d4c){const _0x32e899=_0x15a52d,_0x54c0fe=VisuMZ['SkillsStatesCore'][_0x32e899(0x3bc)][_0x32e899(0x35b)]['ReapplyRules'],_0x2c5f57=this[_0x32e899(0x1dd)](_0x4a7bed);switch(_0x54c0fe){case _0x32e899(0x3ea):if(_0x2c5f57<=0x0)this[_0x32e899(0x349)][_0x4a7bed]=_0x470d4c;break;case'reset':this[_0x32e899(0x349)][_0x4a7bed]=_0x470d4c;break;case _0x32e899(0xfb):this[_0x32e899(0x349)][_0x4a7bed]=Math['max'](_0x2c5f57,_0x470d4c);break;case _0x32e899(0x389):this['_buffTurns'][_0x4a7bed]+=_0x470d4c;break;default:VisuMZ[_0x32e899(0x397)][_0x32e899(0x3d8)][_0x32e899(0x2b6)](this,_0x4a7bed,_0x470d4c);break;}const _0x23d489=VisuMZ[_0x32e899(0x397)][_0x32e899(0x3bc)][_0x32e899(0x35b)][_0x32e899(0x274)];this['_buffTurns'][_0x4a7bed]=this[_0x32e899(0x349)][_0x4a7bed][_0x32e899(0x332)](0x0,_0x23d489);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3d3)]=function(){const _0x22a40c=_0x15a52d;if(this[_0x22a40c(0x2db)][_0x22a40c(0x292)]!==undefined)return this[_0x22a40c(0x2db)][_0x22a40c(0x292)];this[_0x22a40c(0x2db)][_0x22a40c(0x292)]=![];const _0x2080ec=this[_0x22a40c(0x254)]();for(const _0xed696d of _0x2080ec){if(!_0xed696d)continue;if(_0xed696d['note'][_0x22a40c(0xed)](/<GROUP DEFEAT>/i)){this[_0x22a40c(0x2db)][_0x22a40c(0x292)]=!![];break;}}return this[_0x22a40c(0x2db)][_0x22a40c(0x292)];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x104)]=Game_Unit[_0x15a52d(0x21f)][_0x15a52d(0x14e)],Game_Unit['prototype']['deadMembers']=function(){const _0x3a27f4=_0x15a52d;let _0x11af5f=VisuMZ[_0x3a27f4(0x397)][_0x3a27f4(0x104)][_0x3a27f4(0x2b6)](this);return BattleManager[_0x3a27f4(0x1e8)]&&(_0x11af5f=_0x11af5f[_0x3a27f4(0x13c)](this[_0x3a27f4(0x380)]()[_0x3a27f4(0x39e)](_0x7047e8=>_0x7047e8[_0x3a27f4(0x3d3)]()))),_0x11af5f;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x1a8)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3fa)],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3fa)]=function(){const _0xd65fe2=_0x15a52d;this[_0xd65fe2(0x103)]()!==''?this['clearStatesWithStateRetain']():(VisuMZ[_0xd65fe2(0x397)][_0xd65fe2(0x1a8)][_0xd65fe2(0x2b6)](this),this[_0xd65fe2(0x390)]());},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x3fa)]=function(){const _0x47c87a=_0x15a52d;this['_stateSteps']=this['_stateSteps']||{},Game_Battler[_0x47c87a(0x21f)]['clearStates']['call'](this);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x176)]=function(){const _0x1697e8=_0x15a52d,_0x54ae40=this[_0x1697e8(0x254)]();for(const _0x1f61d0 of _0x54ae40){if(_0x1f61d0&&this[_0x1697e8(0x1f7)](_0x1f61d0)){const _0x57e772=this[_0x1697e8(0x377)]||'';this['eraseState'](_0x1f61d0['id']),this[_0x1697e8(0x377)]=_0x57e772;}}this[_0x1697e8(0x2db)]={};},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1f7)]=function(_0x21f268){const _0x5d7d2f=_0x15a52d,_0x5194ea=this[_0x5d7d2f(0x103)]();if(_0x5194ea!==''){const _0x31ac7c=_0x21f268[_0x5d7d2f(0x2df)];if(_0x5194ea==='death'&&_0x31ac7c[_0x5d7d2f(0xed)](/<NO DEATH CLEAR>/i))return![];if(_0x5194ea===_0x5d7d2f(0x39a)&&_0x31ac7c[_0x5d7d2f(0xed)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x5d7d2f(0xf3)](_0x21f268['id']);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x103)]=function(){const _0x592a87=_0x15a52d;return this[_0x592a87(0x377)];},Game_BattlerBase['prototype']['setStateRetainType']=function(_0x2ed018){const _0x118ffe=_0x15a52d;this[_0x118ffe(0x377)]=_0x2ed018;},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x318)]=function(){const _0x3f863c=_0x15a52d;this[_0x3f863c(0x377)]='';},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3b3)]=Game_BattlerBase['prototype'][_0x15a52d(0x2ee)],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2ee)]=function(){const _0xa723b9=_0x15a52d;this[_0xa723b9(0x2c6)](_0xa723b9(0x27c)),VisuMZ['SkillsStatesCore'][_0xa723b9(0x3b3)][_0xa723b9(0x2b6)](this),this[_0xa723b9(0x318)]();},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x264)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x234)],Game_BattlerBase['prototype']['recoverAll']=function(){const _0x4da3b5=_0x15a52d;this['setStateRetainType'](_0x4da3b5(0x39a)),VisuMZ[_0x4da3b5(0x397)][_0x4da3b5(0x264)][_0x4da3b5(0x2b6)](this),this[_0x4da3b5(0x318)]();},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2e5)]=function(_0x147710,_0x4333f2,_0x23ec87){return _0x4333f2;},Game_BattlerBase[_0x15a52d(0x21f)]['canPaySkillCost']=function(_0xb4af31){const _0x1a305f=_0x15a52d;for(settings of VisuMZ[_0x1a305f(0x397)][_0x1a305f(0x3bc)][_0x1a305f(0x330)]){let _0x3219b9=settings[_0x1a305f(0x15e)][_0x1a305f(0x2b6)](this,_0xb4af31);_0x3219b9=this[_0x1a305f(0x2e5)](_0xb4af31,_0x3219b9,settings);if(!settings[_0x1a305f(0xfd)][_0x1a305f(0x2b6)](this,_0xb4af31,_0x3219b9))return![];}return!![];},Game_BattlerBase[_0x15a52d(0x21f)]['paySkillCost']=function(_0x56a4aa){const _0xd2883c=_0x15a52d;for(settings of VisuMZ[_0xd2883c(0x397)][_0xd2883c(0x3bc)][_0xd2883c(0x330)]){let _0x36caa2=settings[_0xd2883c(0x15e)]['call'](this,_0x56a4aa);_0x36caa2=this['adjustSkillCost'](_0x56a4aa,_0x36caa2,settings),settings[_0xd2883c(0x3d9)][_0xd2883c(0x2b6)](this,_0x56a4aa,_0x36caa2);}},VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase['prototype'][_0x15a52d(0x2ec)],Game_BattlerBase['prototype'][_0x15a52d(0x2ec)]=function(_0x12e90d){const _0x929ff0=_0x15a52d;if(!_0x12e90d)return![];if(!VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions'][_0x929ff0(0x2b6)](this,_0x12e90d))return![];if(!this[_0x929ff0(0x155)](_0x12e90d))return![];if(!this[_0x929ff0(0x1fc)](_0x12e90d))return![];if(!this[_0x929ff0(0x3e8)](_0x12e90d))return![];return!![];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x155)]=function(_0x1f3c4a){const _0x494427=_0x15a52d;if(!this[_0x494427(0x2cc)](_0x1f3c4a))return![];return!![];},Game_BattlerBase['prototype'][_0x15a52d(0x2cc)]=function(_0x5f1137){const _0x1782fd=_0x15a52d,_0x3f75d6=_0x5f1137[_0x1782fd(0x2df)];if(_0x3f75d6[_0x1782fd(0xed)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x442fec=JSON[_0x1782fd(0x3ef)]('['+RegExp['$1'][_0x1782fd(0xed)](/\d+/g)+']');for(const _0x43033c of _0x442fec){if(!$gameSwitches[_0x1782fd(0x18b)](_0x43033c))return![];}return!![];}if(_0x3f75d6[_0x1782fd(0xed)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x541fa9=JSON[_0x1782fd(0x3ef)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3624ea of _0x541fa9){if(!$gameSwitches[_0x1782fd(0x18b)](_0x3624ea))return![];}return!![];}if(_0x3f75d6[_0x1782fd(0xed)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x540503=JSON[_0x1782fd(0x3ef)]('['+RegExp['$1'][_0x1782fd(0xed)](/\d+/g)+']');for(const _0x56b8a9 of _0x540503){if($gameSwitches[_0x1782fd(0x18b)](_0x56b8a9))return!![];}return![];}if(_0x3f75d6['match'](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d6539=JSON[_0x1782fd(0x3ef)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3ab4bf of _0x3d6539){if(!$gameSwitches[_0x1782fd(0x18b)](_0x3ab4bf))return!![];}return![];}if(_0x3f75d6[_0x1782fd(0xed)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e8ea8=JSON[_0x1782fd(0x3ef)]('['+RegExp['$1'][_0x1782fd(0xed)](/\d+/g)+']');for(const _0x596da2 of _0x3e8ea8){if(!$gameSwitches[_0x1782fd(0x18b)](_0x596da2))return!![];}return![];}if(_0x3f75d6[_0x1782fd(0xed)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13e8dd=JSON[_0x1782fd(0x3ef)]('['+RegExp['$1'][_0x1782fd(0xed)](/\d+/g)+']');for(const _0x3a4900 of _0x13e8dd){if($gameSwitches['value'](_0x3a4900))return![];}return!![];}return!![];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1fc)]=function(_0x27fd02){const _0x4ce19c=_0x15a52d,_0x2b6c3a=_0x27fd02[_0x4ce19c(0x2df)],_0x370c7d=VisuMZ[_0x4ce19c(0x397)]['skillEnableJS'];return _0x370c7d[_0x27fd02['id']]?_0x370c7d[_0x27fd02['id']][_0x4ce19c(0x2b6)](this,_0x27fd02):!![];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3e8)]=function(_0x1f0f62){const _0x59c291=_0x15a52d;return VisuMZ[_0x59c291(0x397)][_0x59c291(0x3bc)][_0x59c291(0x131)][_0x59c291(0x2b7)][_0x59c291(0x2b6)](this,_0x1f0f62);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x34b)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x406)],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x406)]=function(_0x367ca3){const _0x461c37=_0x15a52d;for(settings of VisuMZ[_0x461c37(0x397)][_0x461c37(0x3bc)][_0x461c37(0x330)]){if(settings[_0x461c37(0x3ca)][_0x461c37(0x219)]()==='MP'){let _0xa90fb1=settings[_0x461c37(0x15e)][_0x461c37(0x2b6)](this,_0x367ca3);return _0xa90fb1=this[_0x461c37(0x2e5)](_0x367ca3,_0xa90fb1,settings),_0xa90fb1;}}return VisuMZ[_0x461c37(0x397)][_0x461c37(0x34b)][_0x461c37(0x2b6)](this,_0x367ca3);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_skillTpCost']=Game_BattlerBase[_0x15a52d(0x21f)]['skillTpCost'],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1ae)]=function(_0x3574da){const _0x52b5a5=_0x15a52d;for(settings of VisuMZ[_0x52b5a5(0x397)][_0x52b5a5(0x3bc)][_0x52b5a5(0x330)]){if(settings[_0x52b5a5(0x3ca)][_0x52b5a5(0x219)]()==='TP'){let _0x52f038=settings[_0x52b5a5(0x15e)][_0x52b5a5(0x2b6)](this,_0x3574da);return _0x52f038=this[_0x52b5a5(0x2e5)](_0x3574da,_0x52f038,settings),_0x52f038;}}return VisuMZ[_0x52b5a5(0x397)][_0x52b5a5(0x3a5)]['call'](this,_0x3574da);},Game_BattlerBase['prototype'][_0x15a52d(0x1fb)]=function(_0x2de9a5){const _0x1b3722=_0x15a52d;if(typeof _0x2de9a5===_0x1b3722(0x357))_0x2de9a5=$dataStates[_0x2de9a5];return this[_0x1b3722(0x254)]()[_0x1b3722(0xf9)](_0x2de9a5);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x1ee)]=Game_BattlerBase['prototype']['states'],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x254)]=function(){const _0x472074=_0x15a52d;let _0x51f38f=VisuMZ[_0x472074(0x397)][_0x472074(0x1ee)][_0x472074(0x2b6)](this);if($gameTemp['_checkingPassiveStates'])return _0x51f38f;return $gameTemp['_checkingPassiveStates']=!![],this[_0x472074(0x1f1)](_0x51f38f),$gameTemp[_0x472074(0x1cb)]=undefined,_0x51f38f;},Game_BattlerBase['prototype'][_0x15a52d(0x1f1)]=function(_0x28724b){const _0x296a75=_0x15a52d,_0x3f7a58=this[_0x296a75(0x3f9)]();for(state of _0x3f7a58){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x28724b['includes'](state))continue;_0x28724b[_0x296a75(0x13f)](state);}_0x3f7a58[_0x296a75(0x17d)]>0x0&&_0x28724b[_0x296a75(0x110)]((_0x57d218,_0x30593f)=>{const _0x3f0d53=_0x296a75,_0x4d7c3d=_0x57d218[_0x3f0d53(0x1a3)],_0x5ad26c=_0x30593f[_0x3f0d53(0x1a3)];if(_0x4d7c3d!==_0x5ad26c)return _0x5ad26c-_0x4d7c3d;return _0x57d218-_0x30593f;});},Game_BattlerBase['prototype'][_0x15a52d(0x1e7)]=function(_0xa0bf2a){const _0x5e8dfb=_0x15a52d;return _0xa0bf2a[_0x5e8dfb(0x2df)][_0x5e8dfb(0xed)](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x275)]=Game_BattlerBase[_0x15a52d(0x21f)]['traitsSet'],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1f9)]=function(_0x170732){const _0x1e3255=_0x15a52d;this[_0x1e3255(0x228)]=!![];let _0x53ce05=VisuMZ[_0x1e3255(0x397)]['Game_BattlerBase_traitsSet']['call'](this,_0x170732);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x53ce05;},Game_BattlerBase['prototype']['convertPassiveStates']=function(){const _0x24b2dd=_0x15a52d;let _0x54b2cf=[];this['_passiveStateResults']=this[_0x24b2dd(0x257)]||{};for(;;){_0x54b2cf=[];let _0x1387f9=!![];for(const _0x156f77 of this[_0x24b2dd(0x2db)]['passiveStates']){const _0x2fc067=$dataStates[_0x156f77];if(!_0x2fc067)continue;let _0x2c208a=this[_0x24b2dd(0x17a)](_0x2fc067);this[_0x24b2dd(0x257)][_0x156f77]!==_0x2c208a&&(_0x1387f9=![],this[_0x24b2dd(0x257)][_0x156f77]=_0x2c208a);if(!_0x2c208a)continue;_0x54b2cf['push'](_0x2fc067);}if(_0x1387f9)break;else{if(!this[_0x24b2dd(0x228)])this['refresh']();this[_0x24b2dd(0x3f5)]();}}return _0x54b2cf;},Game_BattlerBase['prototype'][_0x15a52d(0x17a)]=function(_0x135098){const _0x2b7431=_0x15a52d;if(!this['meetsPassiveStateConditionClasses'](_0x135098))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x135098))return![];if(!this['meetsPassiveStateConditionJS'](_0x135098))return![];if(!this[_0x2b7431(0x2c7)](_0x135098))return![];return!![];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x383)]=function(_0x552cfe){return!![];},Game_Actor['prototype']['meetsPassiveStateConditionClasses']=function(_0x1d2f36){const _0x4f00be=_0x15a52d,_0x45bd2e=DataManager[_0x4f00be(0x302)](_0x1d2f36);if(_0x45bd2e[_0x4f00be(0x316)]['length']>0x0){const _0x4faf4a=_0x45bd2e[_0x4f00be(0x316)];if(!_0x4faf4a['includes'](this[_0x4f00be(0x316)]()))return![];}if(_0x45bd2e[_0x4f00be(0x261)][_0x4f00be(0x17d)]>0x0){const _0x4a3a66=_0x45bd2e[_0x4f00be(0x261)];let _0x4bd2b1=[this[_0x4f00be(0x316)]()];Imported[_0x4f00be(0x2bb)]&&this[_0x4f00be(0x391)]&&(_0x4bd2b1=this[_0x4f00be(0x391)]());if(_0x4a3a66[_0x4f00be(0x39e)](_0x310ff2=>_0x4bd2b1[_0x4f00be(0xf9)](_0x310ff2))[_0x4f00be(0x17d)]<=0x0)return![];}return Game_BattlerBase[_0x4f00be(0x21f)][_0x4f00be(0x383)][_0x4f00be(0x2b6)](this,_0x1d2f36);},DataManager[_0x15a52d(0x302)]=function(_0x4e24d1){const _0x2cdfe2=_0x15a52d,_0x581384={'currentClass':[],'multiClass':[]};if(!_0x4e24d1)return _0x581384;this[_0x2cdfe2(0x113)]=this['_cache_getPassiveStateConditionClassesData']||{};if(this[_0x2cdfe2(0x113)][_0x4e24d1['id']]!==undefined)return this[_0x2cdfe2(0x113)][_0x4e24d1['id']];const _0x4bafc8=_0x4e24d1[_0x2cdfe2(0x2df)]||'';if(_0x4bafc8['match'](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0xc3cf2c=String(RegExp['$1'])[_0x2cdfe2(0x23f)](',')[_0x2cdfe2(0x258)](_0x20ccdc=>_0x20ccdc['trim']());_0x581384[_0x2cdfe2(0x316)]=VisuMZ[_0x2cdfe2(0x397)][_0x2cdfe2(0x267)](_0xc3cf2c);}if(_0x4bafc8[_0x2cdfe2(0xed)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x323cd5=String(RegExp['$1'])[_0x2cdfe2(0x23f)](',')[_0x2cdfe2(0x258)](_0x3795cc=>_0x3795cc['trim']());_0x581384[_0x2cdfe2(0x261)]=VisuMZ[_0x2cdfe2(0x397)][_0x2cdfe2(0x267)](_0x323cd5);}return this[_0x2cdfe2(0x113)][_0x4e24d1['id']]=_0x581384,this[_0x2cdfe2(0x113)][_0x4e24d1['id']];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x267)]=function(_0x23314a){const _0x15d644=_0x15a52d,_0x5dff80=[];for(let _0xf5c724 of _0x23314a){_0xf5c724=(String(_0xf5c724)||'')[_0x15d644(0xe8)]();const _0x15680c=/^\d+$/[_0x15d644(0x117)](_0xf5c724);_0x15680c?_0x5dff80[_0x15d644(0x13f)](Number(_0xf5c724)):_0x5dff80[_0x15d644(0x13f)](DataManager[_0x15d644(0x348)](_0xf5c724));}return _0x5dff80[_0x15d644(0x258)](_0x371f41=>$dataClasses[Number(_0x371f41)])['remove'](null);},Game_BattlerBase[_0x15a52d(0x21f)]['meetsPassiveStateConditionSwitches']=function(_0x540dd7){const _0x5bb177=_0x15a52d,_0x18390f=DataManager[_0x5bb177(0x266)](_0x540dd7);if(_0x18390f[_0x5bb177(0x185)]&&_0x18390f[_0x5bb177(0x185)][_0x5bb177(0x17d)]>0x0){const _0x3466db=_0x18390f[_0x5bb177(0x185)];for(const _0x5b6e54 of _0x3466db){if(!$gameSwitches[_0x5bb177(0x18b)](_0x5b6e54))return![];}}if(_0x18390f[_0x5bb177(0x324)]&&_0x18390f[_0x5bb177(0x324)][_0x5bb177(0x17d)]>0x0){const _0x4bf96d=_0x18390f[_0x5bb177(0x324)];let _0x54d8a0=!![];for(const _0x5ec85a of _0x4bf96d){if($gameSwitches['value'](_0x5ec85a)){_0x54d8a0=![];break;}}if(_0x54d8a0)return![];}if(_0x18390f[_0x5bb177(0x22a)]&&_0x18390f[_0x5bb177(0x22a)][_0x5bb177(0x17d)]>0x0){const _0x4ef36b=_0x18390f[_0x5bb177(0x22a)];for(const _0x3b8e43 of _0x4ef36b){if($gameSwitches[_0x5bb177(0x18b)](_0x3b8e43))return![];}}if(_0x18390f['anySwitchOff']&&_0x18390f[_0x5bb177(0x12e)][_0x5bb177(0x17d)]>0x0){const _0x4c5245=_0x18390f['anySwitchOff'];let _0x54a7f6=!![];for(const _0x7e2c21 of _0x4c5245){if(!$gameSwitches[_0x5bb177(0x18b)](_0x7e2c21)){_0x54a7f6=![];break;}}if(_0x54a7f6)return![];}return!![];},DataManager['getPassiveStateConditionSwitchData']=function(_0x33d3e9){const _0x30397e=_0x15a52d;let _0x4d48a3={'allSwitchOn':[],'anySwitchOn':[],'allSwitchOff':[],'anySwitchOff':[]};if(!_0x33d3e9)return _0x4d48a3;const _0x312771=_0x33d3e9['id'];this[_0x30397e(0x2f9)]=this[_0x30397e(0x2f9)]||{};if(this[_0x30397e(0x2f9)][_0x312771]!==undefined)return this[_0x30397e(0x2f9)][_0x312771];const _0x4f2610=_0x33d3e9[_0x30397e(0x2df)]||'';return _0x4f2610[_0x30397e(0xed)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x4d48a3['allSwitchOn']=String(RegExp['$1'])['split'](',')[_0x30397e(0x258)](_0x346cac=>Number(_0x346cac))),_0x4f2610[_0x30397e(0xed)](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ](.*)>/i)&&(_0x4d48a3[_0x30397e(0x324)]=String(RegExp['$1'])['split'](',')['map'](_0x1b7a59=>Number(_0x1b7a59))),_0x4f2610[_0x30397e(0xed)](/PASSIVE CONDITION(?:| ALL)[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x4d48a3['allSwitchOff']=String(RegExp['$1'])[_0x30397e(0x23f)](',')['map'](_0x7104e7=>Number(_0x7104e7))),_0x4f2610['match'](/PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ](.*)>/i)&&(_0x4d48a3[_0x30397e(0x12e)]=String(RegExp['$1'])[_0x30397e(0x23f)](',')[_0x30397e(0x258)](_0x5b5a0e=>Number(_0x5b5a0e))),this[_0x30397e(0x2f9)][_0x312771]=_0x4d48a3,this[_0x30397e(0x2f9)][_0x312771];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3f8)]=function(_0xe5e249){const _0x35c4b3=_0x15a52d,_0x4b9f71=VisuMZ['SkillsStatesCore']['statePassiveConditionJS'];if(_0x4b9f71[_0xe5e249['id']]){this[_0x35c4b3(0x37c)]=this[_0x35c4b3(0x37c)]||0x0,this['_prevPassiveJsCounter']=this[_0x35c4b3(0x184)]||0x0;this['_prevPassiveJsFrameCount']!==Graphics[_0x35c4b3(0x10b)]&&(this[_0x35c4b3(0x37c)]=Graphics[_0x35c4b3(0x10b)],this[_0x35c4b3(0x27a)]={},this[_0x35c4b3(0x184)]=0x0);this[_0x35c4b3(0x184)]++;if(this[_0x35c4b3(0x184)]>=0x1e)return this[_0x35c4b3(0x27a)][_0xe5e249['id']]??!![];else{const _0x28d749=_0x4b9f71[_0xe5e249['id']][_0x35c4b3(0x2b6)](this,_0xe5e249);return this[_0x35c4b3(0x27a)][_0xe5e249['id']]=_0x28d749,_0x28d749;}}else return!![];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2c7)]=function(_0x1b7ee3){const _0xcaa1c0=_0x15a52d;return VisuMZ[_0xcaa1c0(0x397)][_0xcaa1c0(0x3bc)][_0xcaa1c0(0x3a9)][_0xcaa1c0(0x2dc)][_0xcaa1c0(0x2b6)](this,_0x1b7ee3);},Game_BattlerBase[_0x15a52d(0x21f)]['passiveStates']=function(){const _0xa49cc2=_0x15a52d;if(this[_0xa49cc2(0x1af)]('passiveStates'))return this[_0xa49cc2(0xff)]();if(this[_0xa49cc2(0x194)])return[];return this[_0xa49cc2(0x194)]=!![],this['createPassiveStatesCache'](),this['_checkingVisuMzPassiveStateObjects']=undefined,this[_0xa49cc2(0xff)]();},Game_BattlerBase['prototype'][_0x15a52d(0x3f5)]=function(){const _0xfd0387=_0x15a52d;this['_checkingVisuMzPassiveStateObjects']=!![],this['_cache'][_0xfd0387(0x3f9)]=[],this[_0xfd0387(0x3a2)](),this[_0xfd0387(0x2ba)](),this[_0xfd0387(0x283)](),Game_BattlerBase['AURA_SYSTEM_ENABLED']&&this[_0xfd0387(0x31b)](),this[_0xfd0387(0x2db)][_0xfd0387(0x3f9)]=this[_0xfd0387(0x2db)]['passiveStates'][_0xfd0387(0x110)]((_0x4f27be,_0x1179be)=>_0x4f27be-_0x1179be),this[_0xfd0387(0x194)]=undefined;},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3a2)]=function(){const _0x4411e6=_0x15a52d;if(Imported[_0x4411e6(0x2ed)])this[_0x4411e6(0xfe)]();},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x38a)]=function(){return[];},Game_BattlerBase['prototype'][_0x15a52d(0x2ba)]=function(){const _0x13c814=_0x15a52d,_0x33445a=this['_cache'][_0x13c814(0x3f9)]||[],_0x2d64b1=this[_0x13c814(0x38a)]();this[_0x13c814(0x2db)]['passiveStates']=_0x33445a||[];for(const _0x5d86a5 of _0x2d64b1){if(!_0x5d86a5)continue;const _0x59a83c=DataManager[_0x13c814(0x25a)](_0x5d86a5);for(const _0x29b1d0 of _0x59a83c){this['_cache'][_0x13c814(0x3f9)][_0x13c814(0x13f)](_0x29b1d0);}}},DataManager[_0x15a52d(0x25a)]=function(_0xb2eac){const _0x338691=_0x15a52d;if(!_0xb2eac)return[];const _0x2b9327=VisuMZ[_0x338691(0x397)][_0x338691(0xea)](_0xb2eac,'passiveStateIDs');this['_cache_getPassiveStatesFromObj']=this[_0x338691(0x3dd)]||{};if(this[_0x338691(0x3dd)][_0x2b9327]!==undefined)return this[_0x338691(0x3dd)][_0x2b9327];const _0x9907d0=[],_0x215816=_0xb2eac['note']||'',_0x4cdabd=/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi,_0x573940=_0x215816[_0x338691(0xed)](_0x4cdabd);if(_0x573940)for(const _0x2944ba of _0x573940){_0x2944ba[_0x338691(0xed)](_0x4cdabd);const _0x444416=String(RegExp['$1'])[_0x338691(0x23f)](',')[_0x338691(0x258)](_0x4fec09=>_0x4fec09[_0x338691(0xe8)]());for(const _0x46695f of _0x444416){const _0x104803=/^\d+$/['test'](_0x46695f);let _0x1c678e=0x0;_0x104803?_0x1c678e=Number(_0x46695f):_0x1c678e=DataManager[_0x338691(0x20f)](_0x46695f),_0x1c678e&&_0x9907d0[_0x338691(0x13f)](_0x1c678e);}}return this['_cache_getPassiveStatesFromObj'][_0x2b9327]=_0x9907d0,this[_0x338691(0x3dd)][_0x2b9327];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x283)]=function(){const _0x19c0ab=_0x15a52d,_0x240b29=VisuMZ['SkillsStatesCore'][_0x19c0ab(0x3bc)][_0x19c0ab(0x3a9)][_0x19c0ab(0xf7)];this[_0x19c0ab(0x2db)][_0x19c0ab(0x3f9)]=this[_0x19c0ab(0x2db)][_0x19c0ab(0x3f9)][_0x19c0ab(0x13c)](_0x240b29);},Game_BattlerBase[_0x15a52d(0x26e)]=![],Scene_Boot[_0x15a52d(0x21f)][_0x15a52d(0x101)]=function(){const _0x13de9b=_0x15a52d,_0x3f7e46=[$dataActors,$dataClasses,$dataSkills,$dataWeapons,$dataArmors,$dataEnemies];for(const _0x34aeb7 of _0x3f7e46){for(const _0x2e6575 of _0x34aeb7){if(!_0x2e6575)continue;const _0x365baa=_0x2e6575[_0x13de9b(0x2df)]||'';if(_0x365baa[_0x13de9b(0xed)](/<(?:AURA|MIASMA) (?:STATE|STATES):[ ](.*)>/gi)){Game_BattlerBase[_0x13de9b(0x26e)]=!![];break;}}}},Game_BattlerBase['prototype'][_0x15a52d(0x31b)]=function(){const _0x2cbcdc=_0x15a52d;if(this[_0x2cbcdc(0x178)]())return;if(!this['isAppeared']())return;const _0x4f9407=this[_0x2cbcdc(0x2db)][_0x2cbcdc(0x3f9)]||[],_0x2753a0=this,_0x32e7ae=this[_0x2cbcdc(0x25b)]()[_0x2cbcdc(0x277)](!![],_0x2753a0),_0x46c7a7=$gameParty[_0x2cbcdc(0xeb)]()?this[_0x2cbcdc(0x1d5)]()[_0x2cbcdc(0x277)](![],_0x2753a0):[];this[_0x2cbcdc(0x2db)][_0x2cbcdc(0x3f9)]=_0x4f9407||[],this[_0x2cbcdc(0x2db)][_0x2cbcdc(0x3f9)]=this[_0x2cbcdc(0x2db)][_0x2cbcdc(0x3f9)][_0x2cbcdc(0x13c)](_0x32e7ae)[_0x2cbcdc(0x13c)](_0x46c7a7);},Game_Unit[_0x15a52d(0x21f)][_0x15a52d(0x277)]=function(_0x4686af,_0x237a1e){const _0x180a4f=_0x15a52d;let _0x400827=[];const _0xdd0a2f=this===$gameParty?this['battleMembers']():this[_0x180a4f(0x380)]();for(const _0x354c1d of _0xdd0a2f){if(!_0x354c1d)continue;if(!_0x354c1d['isAppeared']())continue;const _0x18320a=_0x354c1d['passiveStateObjects']();for(const _0x4728e7 of _0x18320a){if(!_0x4728e7)continue;if(!VisuMZ[_0x180a4f(0x397)][_0x180a4f(0x35d)](_0x4728e7,_0x4686af,_0x354c1d,_0x237a1e))continue;let _0x559876=DataManager[_0x180a4f(0x1c2)](_0x4728e7,_0x4686af);for(const _0x216ca9 of _0x559876){if(!VisuMZ[_0x180a4f(0x397)][_0x180a4f(0x34c)](_0x216ca9,_0x4686af,_0x354c1d,_0x237a1e))continue;_0x400827[_0x180a4f(0x13f)](_0x216ca9),!_0x237a1e[_0x180a4f(0xf3)](_0x216ca9)&&_0x237a1e['setStateOrigin'](_0x216ca9,_0x354c1d);}}}return _0x400827;},DataManager['getAuraPassiveStatesFromObj']=function(_0x621d29,_0x218c40){const _0x24ecd2=_0x15a52d;if(!_0x621d29)return[];const _0x46a1b7=_0x218c40?_0x24ecd2(0x1b1):_0x24ecd2(0x143),_0x20f0b5=VisuMZ[_0x24ecd2(0x397)]['createKeyJS'](_0x621d29,_0x46a1b7);this[_0x24ecd2(0x2b0)]=this[_0x24ecd2(0x2b0)]||{};if(this[_0x24ecd2(0x2b0)][_0x20f0b5]!==undefined)return this[_0x24ecd2(0x2b0)][_0x20f0b5];const _0x398938=[],_0x484b9c=_0x621d29['note']||'',_0x3e8a06=_0x218c40?/<AURA (?:STATE|STATES):[ ](.*)>/gi:/<MIASMA (?:STATE|STATES):[ ](.*)>/gi,_0x4f99f5=_0x484b9c[_0x24ecd2(0xed)](_0x3e8a06);if(_0x4f99f5)for(const _0x522dd6 of _0x4f99f5){_0x522dd6[_0x24ecd2(0xed)](_0x3e8a06);const _0x378cda=String(RegExp['$1'])[_0x24ecd2(0x23f)](',')[_0x24ecd2(0x258)](_0x1c51e8=>_0x1c51e8[_0x24ecd2(0xe8)]());for(const _0x6cc268 of _0x378cda){const _0x45d9d9=/^\d+$/['test'](_0x6cc268);let _0x35c265=0x0;_0x45d9d9?_0x35c265=Number(_0x6cc268):_0x35c265=DataManager[_0x24ecd2(0x20f)](_0x6cc268),_0x35c265&&_0x398938[_0x24ecd2(0x13f)](_0x35c265);}}return this['_cache_getAuraPassiveStatesFromObj'][_0x20f0b5]=_0x398938,this[_0x24ecd2(0x2b0)][_0x20f0b5];},VisuMZ[_0x15a52d(0x397)]['MeetsAuraObjConditions']=function(_0x40a843,_0x385ef6,_0x5a2e8f,_0xd97629){const _0x3fc780=_0x15a52d;if(!_0x40a843)return![];if(_0x40a843[_0x3fc780(0x112)]!==undefined&&_0x40a843[_0x3fc780(0x284)]!==undefined)return![];const _0x4cfd29=_0x40a843[_0x3fc780(0x2df)]||'';if(!VisuMZ['SkillsStatesCore'][_0x3fc780(0x2cd)](_0x4cfd29,_0x385ef6,_0x5a2e8f,_0xd97629))return![];return!![];},VisuMZ[_0x15a52d(0x397)]['MeetsAuraStateConditions']=function(_0x1a22df,_0x5570bc,_0x55a297,_0x3c5ed3){const _0x3ce3fe=_0x15a52d,_0x17ab3a=$dataStates[_0x1a22df];if(!_0x17ab3a)return![];const _0x3519a6=_0x17ab3a[_0x3ce3fe(0x2df)]||'';if(!VisuMZ[_0x3ce3fe(0x397)][_0x3ce3fe(0x2cd)](_0x3519a6,_0x5570bc,_0x55a297,_0x3c5ed3))return![];return!![];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2cd)]=function(_0x4113be,_0x21dc41,_0x564bca,_0x4af2f5){const _0x7c45a5=_0x15a52d;_0x4113be=_0x4113be||'';if(_0x564bca[_0x7c45a5(0x178)]()){if(_0x21dc41&&_0x4113be[_0x7c45a5(0xed)](/<ALLOW DEAD AURA>/i)){}else{if(!_0x21dc41&&_0x4113be[_0x7c45a5(0xed)](/<ALLOW DEAD MIASMA>/i)){}else{if(_0x21dc41&&_0x4113be[_0x7c45a5(0xed)](/<DEAD AURA ONLY>/i)){}else{if(!_0x21dc41&&_0x4113be[_0x7c45a5(0xed)](/<DEAD MIASMA ONLY>/i)){}else return![];}}}}else{if(_0x21dc41&&_0x4113be['match'](/<DEAD AURA ONLY>/i))return![];else{if(!_0x21dc41&&_0x4113be[_0x7c45a5(0xed)](/<DEAD MIASMA ONLY>/i))return![];}}if(_0x21dc41){if(_0x4113be[_0x7c45a5(0xed)](/<AURA NOT FOR USER>/i)){if(_0x564bca===_0x4af2f5)return![];}else{if(_0x4113be[_0x7c45a5(0xed)](/<NOT USER AURA>/i)){if(_0x564bca===_0x4af2f5)return![];}}}return!![];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x223)]=function(_0x4ada09){const _0x5a2694=_0x15a52d;if(typeof _0x4ada09!==_0x5a2694(0x357))_0x4ada09=_0x4ada09['id'];return this['_stateTurns'][_0x4ada09]||0x0;},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x15c)]=function(_0x3f950f,_0x52f661){const _0x1e85b6=_0x15a52d;if(typeof _0x3f950f!=='number')_0x3f950f=_0x3f950f['id'];if(this['isStateAffected'](_0x3f950f)){const _0x1f8d43=DataManager['stateMaximumTurns'](_0x3f950f);this[_0x1e85b6(0x1cd)][_0x3f950f]=_0x52f661[_0x1e85b6(0x332)](0x0,_0x1f8d43);if(this[_0x1e85b6(0x1cd)][_0x3f950f]<=0x0)this['removeState'](_0x3f950f);}},Game_BattlerBase[_0x15a52d(0x21f)]['addStateTurns']=function(_0x1d9586,_0x3f1bf1){const _0x2c82ce=_0x15a52d;if(typeof _0x1d9586!==_0x2c82ce(0x357))_0x1d9586=_0x1d9586['id'];this[_0x2c82ce(0xf3)](_0x1d9586)&&(_0x3f1bf1+=this[_0x2c82ce(0x223)](_0x1d9586),this['setStateTurns'](_0x1d9586,_0x3f1bf1));},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x399)]=Game_BattlerBase['prototype'][_0x15a52d(0x180)],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x180)]=function(_0x147f80){const _0x1cd767=_0x15a52d,_0x1b36d8=this[_0x1cd767(0x145)][_0x147f80];VisuMZ['SkillsStatesCore'][_0x1cd767(0x399)]['call'](this,_0x147f80);if(_0x1b36d8>0x0)this[_0x1cd767(0x376)](_0x147f80);if(_0x1b36d8<0x0)this[_0x1cd767(0x3f2)](_0x147f80);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x280)]=Game_BattlerBase[_0x15a52d(0x21f)]['increaseBuff'],Game_BattlerBase['prototype'][_0x15a52d(0x3a1)]=function(_0x16b092){const _0x4486f5=_0x15a52d;VisuMZ['SkillsStatesCore'][_0x4486f5(0x280)][_0x4486f5(0x2b6)](this,_0x16b092);if(!this[_0x4486f5(0x2cb)](_0x16b092))this[_0x4486f5(0x180)](_0x16b092);},VisuMZ['SkillsStatesCore'][_0x15a52d(0x1b8)]=Game_BattlerBase[_0x15a52d(0x21f)]['decreaseBuff'],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2c8)]=function(_0x212897){const _0x416741=_0x15a52d;VisuMZ[_0x416741(0x397)][_0x416741(0x1b8)]['call'](this,_0x212897);if(!this['isBuffOrDebuffAffected'](_0x212897))this[_0x416741(0x180)](_0x212897);},Game_BattlerBase['prototype']['onEraseBuff']=function(_0x25dad7){},Game_BattlerBase[_0x15a52d(0x21f)]['onEraseDebuff']=function(_0x4be74d){},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3d6)]=function(_0x2d7eb9){const _0x1ae1fb=_0x15a52d;return this[_0x1ae1fb(0x145)][_0x2d7eb9]===VisuMZ[_0x1ae1fb(0x397)][_0x1ae1fb(0x3bc)]['Buffs'][_0x1ae1fb(0x188)];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2b8)]=function(_0x49eea4){const _0x15b6ef=_0x15a52d;return this['_buffs'][_0x49eea4]===-VisuMZ[_0x15b6ef(0x397)]['Settings'][_0x15b6ef(0x35b)][_0x15b6ef(0xe2)];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3c3)]=Game_BattlerBase[_0x15a52d(0x21f)]['buffIconIndex'],Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x14d)]=function(_0x423931,_0xff4536){const _0xbc6205=_0x15a52d;return _0x423931=_0x423931[_0xbc6205(0x332)](-0x2,0x2),VisuMZ[_0xbc6205(0x397)]['Game_BattlerBase_buffIconIndex']['call'](this,_0x423931,_0xff4536);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2a9)]=function(_0x46bbc8){const _0x696351=_0x15a52d,_0x382f01=this['_buffs'][_0x46bbc8];return VisuMZ['SkillsStatesCore'][_0x696351(0x3bc)][_0x696351(0x35b)]['MultiplierJS']['call'](this,_0x46bbc8,_0x382f01);},Game_BattlerBase['prototype']['buffTurns']=function(_0x428750){return this['_buffTurns'][_0x428750]||0x0;},Game_BattlerBase[_0x15a52d(0x21f)]['debuffTurns']=function(_0x582d4e){const _0x53a355=_0x15a52d;return this[_0x53a355(0x1dd)](_0x582d4e);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x3c4)]=function(_0x380905,_0x28ff70){const _0x585645=_0x15a52d;if(this['isBuffAffected'](_0x380905)){const _0x5a54a6=VisuMZ[_0x585645(0x397)]['Settings'][_0x585645(0x35b)][_0x585645(0x274)];this[_0x585645(0x349)][_0x380905]=_0x28ff70[_0x585645(0x332)](0x0,_0x5a54a6);}},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x20a)]=function(_0x5bed25,_0x807d1f){const _0x39ece5=_0x15a52d;this['isBuffAffected'](_0x5bed25)&&(_0x807d1f+=this['buffTurns'](_0x5bed25),this[_0x39ece5(0x3c4)](_0x5bed25,_0x807d1f));},Game_BattlerBase['prototype']['setDebuffTurns']=function(_0x3a5c18,_0x49d90a){const _0x29d10e=_0x15a52d;if(this['isDebuffAffected'](_0x3a5c18)){const _0x16d0c2=VisuMZ['SkillsStatesCore'][_0x29d10e(0x3bc)][_0x29d10e(0x35b)]['MaxTurns'];this[_0x29d10e(0x349)][_0x3a5c18]=_0x49d90a[_0x29d10e(0x332)](0x0,_0x16d0c2);}},Game_BattlerBase[_0x15a52d(0x21f)]['addDebuffTurns']=function(_0xdec3c3,_0x39fb8b){const _0x8fc8ca=_0x15a52d;this[_0x8fc8ca(0x1de)](_0xdec3c3)&&(_0x39fb8b+=this['buffTurns'](_0xdec3c3),this[_0x8fc8ca(0x218)](_0xdec3c3,_0x39fb8b));},Game_BattlerBase[_0x15a52d(0x21f)]['stateData']=function(_0x500d4e){const _0x427639=_0x15a52d;if(typeof _0x500d4e!=='number')_0x500d4e=_0x500d4e['id'];return this[_0x427639(0x35e)]=this['_stateData']||{},this['_stateData'][_0x500d4e]=this['_stateData'][_0x500d4e]||{},this[_0x427639(0x35e)][_0x500d4e];},Game_BattlerBase['prototype'][_0x15a52d(0x356)]=function(_0x4d9d4f,_0x1fd3e6){const _0xa8359=_0x15a52d;if(typeof _0x4d9d4f!==_0xa8359(0x357))_0x4d9d4f=_0x4d9d4f['id'];const _0x5419d6=this[_0xa8359(0x15f)](_0x4d9d4f);return _0x5419d6[_0x1fd3e6];},Game_BattlerBase['prototype'][_0x15a52d(0x173)]=function(_0x6b9720,_0x5a17a0,_0x115e34){const _0x240b08=_0x15a52d;if(typeof _0x6b9720!==_0x240b08(0x357))_0x6b9720=_0x6b9720['id'];const _0x5899cb=this[_0x240b08(0x15f)](_0x6b9720);_0x5899cb[_0x5a17a0]=_0x115e34;},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2fd)]=function(_0xa38d00){const _0xa22cb8=_0x15a52d;if(typeof _0xa38d00!=='number')_0xa38d00=_0xa38d00['id'];this[_0xa22cb8(0x35e)]=this['_stateData']||{},this[_0xa22cb8(0x35e)][_0xa38d00]={};},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x235)]=function(_0x4b9a27){const _0x34e986=_0x15a52d;if(typeof _0x4b9a27!=='number')_0x4b9a27=_0x4b9a27['id'];return this[_0x34e986(0x1bf)]=this[_0x34e986(0x1bf)]||{},this[_0x34e986(0x1bf)][_0x4b9a27]===undefined&&(this[_0x34e986(0x1bf)][_0x4b9a27]=''),this[_0x34e986(0x1bf)][_0x4b9a27];},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x32a)]=function(_0x3bf46e,_0xa81070){const _0x5f3ccd=_0x15a52d;if(typeof _0x3bf46e!=='number')_0x3bf46e=_0x3bf46e['id'];this[_0x5f3ccd(0x1bf)]=this[_0x5f3ccd(0x1bf)]||{},this[_0x5f3ccd(0x1bf)][_0x3bf46e]=_0xa81070;},Game_BattlerBase['prototype']['clearStateDisplay']=function(_0x2394b8){const _0x5bf7fe=_0x15a52d;if(typeof _0x2394b8!=='number')_0x2394b8=_0x2394b8['id'];this[_0x5bf7fe(0x1bf)]=this[_0x5bf7fe(0x1bf)]||{},this[_0x5bf7fe(0x1bf)][_0x2394b8]='';},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0xe9)]=function(_0x30159d){const _0x53b292=_0x15a52d;if(typeof _0x30159d!==_0x53b292(0x357))_0x30159d=_0x30159d['id'];this['_stateOrigin']=this[_0x53b292(0x262)]||{},this[_0x53b292(0x262)][_0x30159d]=this[_0x53b292(0x262)][_0x30159d]||_0x53b292(0x127);const _0x20d907=this['_stateOrigin'][_0x30159d];return this[_0x53b292(0x202)](_0x20d907);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x382)]=function(_0x1cf4bb,_0x31abe7){const _0x4af96d=_0x15a52d;this[_0x4af96d(0x262)]=this[_0x4af96d(0x262)]||{};const _0x20a267=_0x31abe7?this['convertTargetToStateOriginKey'](_0x31abe7):this[_0x4af96d(0x3b4)]();this[_0x4af96d(0x262)][_0x1cf4bb]=_0x20a267;},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x37d)]=function(_0x2a6499){const _0x1f912d=_0x15a52d;this['_stateOrigin']=this[_0x1f912d(0x262)]||{},delete this[_0x1f912d(0x262)][_0x2a6499];},Game_BattlerBase['prototype'][_0x15a52d(0x1a0)]=function(){const _0x4f8b58=_0x15a52d;this[_0x4f8b58(0x262)]={};},Game_BattlerBase[_0x15a52d(0x21f)]['getCurrentStateOriginKey']=function(){const _0x2fb80c=_0x15a52d,_0x556c15=this[_0x2fb80c(0x1e1)]();return this[_0x2fb80c(0x2b5)](_0x556c15);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1e1)]=function(){const _0x1dd04c=_0x15a52d;if($gameParty['inBattle']()){if(BattleManager[_0x1dd04c(0x328)])return BattleManager['_subject'];else{if(BattleManager[_0x1dd04c(0x3d5)])return BattleManager[_0x1dd04c(0x3d5)];}}else{const _0x5d1bb3=SceneManager['_scene'];if(![Scene_Map,Scene_Item][_0x1dd04c(0xf9)](_0x5d1bb3[_0x1dd04c(0x140)]))return $gameParty[_0x1dd04c(0xf1)]();}return this;},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2b5)]=function(_0x2f3031){const _0x582de3=_0x15a52d;if(!_0x2f3031)return _0x582de3(0x127);if(_0x2f3031[_0x582de3(0x2f1)]())return _0x582de3(0x30c)[_0x582de3(0x25f)](_0x2f3031[_0x582de3(0x3a4)]());else{const _0x6cf403='<enemy-%1>'[_0x582de3(0x25f)](_0x2f3031[_0x582de3(0x243)]()),_0x2a87f3=_0x582de3(0x3c6)[_0x582de3(0x25f)](_0x2f3031[_0x582de3(0x158)]()),_0x35eeba='<troop-%1>'[_0x582de3(0x25f)]($gameTroop[_0x582de3(0x21c)]());return _0x582de3(0x25c)[_0x582de3(0x25f)](_0x6cf403,_0x2a87f3,_0x35eeba);}return _0x582de3(0x127);},Game_BattlerBase[_0x15a52d(0x21f)]['getStateOriginByKey']=function(_0x56e022){const _0x37ba00=_0x15a52d;if(_0x56e022===_0x37ba00(0x127))return this;else{if(_0x56e022[_0x37ba00(0xed)](/<actor-(\d+)>/i))return $gameActors[_0x37ba00(0x19e)](Number(RegExp['$1']));else{if($gameParty['inBattle']()&&_0x56e022[_0x37ba00(0xed)](/<troop-(\d+)>/i)){const _0x30a26f=Number(RegExp['$1']);if(_0x30a26f===$gameTroop[_0x37ba00(0x21c)]()){if(_0x56e022[_0x37ba00(0xed)](/<member-(\d+)>/i))return $gameTroop[_0x37ba00(0x380)]()[Number(RegExp['$1'])];}}if(_0x56e022[_0x37ba00(0xed)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},Game_BattlerBase['prototype'][_0x15a52d(0x2e4)]=function(_0x183952){const _0x4c8420=_0x15a52d;if(!_0x183952)return![];if(this[_0x4c8420(0x119)]())return!![];this['_skillToggle']=this['_skillToggle']||{};if(this[_0x4c8420(0x141)][_0x183952['id']]===undefined){this['isActor']()?this[_0x4c8420(0x141)][_0x183952['id']]=DataManager['defaultToggleSkillSetting'](_0x183952):this['_skillToggle'][_0x183952['id']]=!![];if(this[_0x4c8420(0x141)][_0x183952['id']]&&DataManager[_0x4c8420(0x121)](_0x183952)['length']>0x0){const _0x2b9778=DataManager[_0x4c8420(0x121)](_0x183952),_0x12cf03=this[_0x4c8420(0x36b)]()['filter'](_0xd232ae=>_0xd232ae!==_0x183952)[_0x4c8420(0x39e)](_0x402847=>DataManager[_0x4c8420(0x2e9)](_0x402847))[_0x4c8420(0x39e)](_0x3d5279=>DataManager[_0x4c8420(0x121)](_0x3d5279)['some'](_0xb58a65=>_0x2b9778[_0x4c8420(0xf9)](_0xb58a65)));_0x12cf03[_0x4c8420(0x17d)]>0x0&&(this[_0x4c8420(0x141)][_0x183952['id']]=![]);}if(this[_0x4c8420(0x141)][_0x183952['id']]){this['refresh'](),$gameParty[_0x4c8420(0x3e4)]();if($gameParty[_0x4c8420(0xeb)]())$gameTroop['refreshAllMembers']();}}return this[_0x4c8420(0x141)][_0x183952['id']];},Game_BattlerBase['prototype'][_0x15a52d(0x2a8)]=function(_0x52baaf,_0x289209){const _0x1ca6a2=_0x15a52d;if(!DataManager[_0x1ca6a2(0x2e9)](_0x52baaf))return;if(this['isEnemy']())return;this[_0x1ca6a2(0x141)]=this[_0x1ca6a2(0x141)]||{};if(_0x289209&&DataManager['toggleExclusionGroups'](_0x52baaf)[_0x1ca6a2(0x17d)]>0x0){const _0x270526=DataManager[_0x1ca6a2(0x121)](_0x52baaf),_0x44b4f7=this[_0x1ca6a2(0x36b)]()['filter'](_0x3f84a9=>DataManager[_0x1ca6a2(0x2e9)](_0x3f84a9))[_0x1ca6a2(0x39e)](_0x11b13=>DataManager[_0x1ca6a2(0x121)](_0x11b13)[_0x1ca6a2(0x3c2)](_0x509c17=>_0x270526[_0x1ca6a2(0xf9)](_0x509c17)));for(const _0x32e0b4 of _0x44b4f7){if(!_0x32e0b4)continue;this[_0x1ca6a2(0x141)][_0x32e0b4['id']]=![];}}this[_0x1ca6a2(0x141)][_0x52baaf['id']]=_0x289209,this['refresh'](),$gameParty[_0x1ca6a2(0x3e4)]();if($gameParty[_0x1ca6a2(0xeb)]())$gameTroop[_0x1ca6a2(0x3e4)]();},VisuMZ['SkillsStatesCore']['Game_BattlerBase_meetsSkillConditions_Toggle']=Game_BattlerBase['prototype'][_0x15a52d(0x2ec)],Game_BattlerBase[_0x15a52d(0x21f)]['meetsSkillConditions']=function(_0x34ca72){const _0x7ce779=_0x15a52d;if(DataManager[_0x7ce779(0x2e9)](_0x34ca72)){if(this[_0x7ce779(0x2f1)]()){if($gameParty[_0x7ce779(0xeb)]()){if(this[_0x7ce779(0x222)]())return![];if(this[_0x7ce779(0x2fa)]())return![];}if(this[_0x7ce779(0x2e4)](_0x34ca72))return!![];}else return![];}return VisuMZ[_0x7ce779(0x397)][_0x7ce779(0x166)][_0x7ce779(0x2b6)](this,_0x34ca72);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x32f)]=Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x33b)],Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x33b)]=function(){const _0x3fe329=_0x15a52d;if(DataManager[_0x3fe329(0x2e9)](this[_0x3fe329(0x2f0)]()))return![];return VisuMZ[_0x3fe329(0x397)][_0x3fe329(0x32f)][_0x3fe329(0x2b6)](this);},VisuMZ[_0x15a52d(0x397)]['Game_Battler_addState']=Game_Battler[_0x15a52d(0x21f)]['addState'],Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x34e)]=function(_0x10790b){const _0x36d5f1=_0x15a52d,_0x3b5cf3=this[_0x36d5f1(0x186)](_0x10790b);VisuMZ[_0x36d5f1(0x397)][_0x36d5f1(0x196)][_0x36d5f1(0x2b6)](this,_0x10790b);if(_0x3b5cf3&&this['hasState']($dataStates[_0x10790b])){this['onAddState'](_0x10790b);;}},VisuMZ['SkillsStatesCore'][_0x15a52d(0x199)]=Game_Battler['prototype'][_0x15a52d(0x186)],Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x186)]=function(_0x4c20d6){const _0xb376ab=_0x15a52d,_0x2a7e46=$dataStates[_0x4c20d6];if(_0x2a7e46&&_0x2a7e46[_0xb376ab(0x2df)]['match'](/<NO DEATH CLEAR>/i))return!this[_0xb376ab(0x183)](_0x4c20d6)&&!this[_0xb376ab(0x13e)](_0x4c20d6)&&!this['_result'][_0xb376ab(0x253)](_0x4c20d6);return VisuMZ[_0xb376ab(0x397)]['Game_Battler_isStateAddable'][_0xb376ab(0x2b6)](this,_0x4c20d6);},VisuMZ[_0x15a52d(0x397)]['Game_BattlerBase_addNewState']=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x2ce)],Game_BattlerBase['prototype']['addNewState']=function(_0x363ab0){const _0x259080=_0x15a52d;VisuMZ[_0x259080(0x397)][_0x259080(0x2be)][_0x259080(0x2b6)](this,_0x363ab0);if(_0x363ab0===this[_0x259080(0x11f)]())while(this[_0x259080(0x2a3)][_0x259080(0x39e)](_0x15e9bc=>_0x15e9bc===this[_0x259080(0x11f)]())['length']>0x1){const _0x1bd681=this[_0x259080(0x2a3)][_0x259080(0x288)](this[_0x259080(0x11f)]());this[_0x259080(0x2a3)]['splice'](_0x1bd681,0x1);}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x2f3)]=function(_0x375afb){const _0x884a8e=_0x15a52d;this['setStateOrigin'](_0x375afb),this['removeOtherStatesOfSameCategory'](_0x375afb),this[_0x884a8e(0x165)](_0x375afb),this[_0x884a8e(0x393)](_0x375afb),this['onAddStateGlobalJS'](_0x375afb);},Game_Battler[_0x15a52d(0x21f)]['onRemoveState']=function(_0x439777){const _0x114830=_0x15a52d;this[_0x114830(0x387)](_0x439777),this['onEraseStateGlobalJS'](_0x439777),Game_BattlerBase['prototype'][_0x114830(0x177)][_0x114830(0x2b6)](this,_0x439777);},Game_Battler['prototype']['removeStatesAuto']=function(_0xa0794d){const _0x556874=_0x15a52d;for(const _0x34dd8b of this['states']()){this[_0x556874(0x1f5)](_0x34dd8b['id'])&&_0x34dd8b[_0x556874(0x112)]===_0xa0794d&&(this['removeState'](_0x34dd8b['id']),this[_0x556874(0x17b)](_0x34dd8b['id']),this[_0x556874(0x135)](_0x34dd8b['id']));}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x17b)]=function(_0x3125e0){const _0x528a3e=_0x15a52d;this[_0x528a3e(0x3fc)](_0x3125e0);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x393)]=function(_0x2b1faa){const _0x3965cd=_0x15a52d;if(this[_0x3965cd(0x388)]||this[_0x3965cd(0x2dd)])return;const _0x9a78d2=VisuMZ[_0x3965cd(0x397)]['stateAddJS'];if(_0x9a78d2[_0x2b1faa])_0x9a78d2[_0x2b1faa][_0x3965cd(0x2b6)](this,_0x2b1faa);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x387)]=function(_0x25c8d5){const _0x98ff1a=_0x15a52d;if(this[_0x98ff1a(0x388)]||this[_0x98ff1a(0x2dd)])return;const _0x243f56=VisuMZ[_0x98ff1a(0x397)][_0x98ff1a(0x3b6)];if(_0x243f56[_0x25c8d5])_0x243f56[_0x25c8d5][_0x98ff1a(0x2b6)](this,_0x25c8d5);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x3fc)]=function(_0x3c5678){const _0x3e83dd=_0x15a52d;if(this[_0x3e83dd(0x388)]||this[_0x3e83dd(0x2dd)])return;const _0x2f0938=VisuMZ[_0x3e83dd(0x397)][_0x3e83dd(0x300)];if(_0x2f0938[_0x3c5678])_0x2f0938[_0x3c5678][_0x3e83dd(0x2b6)](this,_0x3c5678);},Game_Battler[_0x15a52d(0x21f)]['onAddStateGlobalJS']=function(_0x2952e2){const _0x1d7ee5=_0x15a52d;if(this[_0x1d7ee5(0x388)]||this['_tempBattler'])return;try{VisuMZ['SkillsStatesCore'][_0x1d7ee5(0x3bc)][_0x1d7ee5(0x211)][_0x1d7ee5(0x294)][_0x1d7ee5(0x2b6)](this,_0x2952e2);}catch(_0x348aed){if($gameTemp['isPlaytest']())console[_0x1d7ee5(0x402)](_0x348aed);}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x23c)]=function(_0x1ad956){const _0x5e7209=_0x15a52d;if(this[_0x5e7209(0x388)]||this[_0x5e7209(0x2dd)])return;try{VisuMZ[_0x5e7209(0x397)]['Settings']['States'][_0x5e7209(0x1ea)]['call'](this,_0x1ad956);}catch(_0x392ee0){if($gameTemp['isPlaytest']())console['log'](_0x392ee0);}},Game_Battler[_0x15a52d(0x21f)]['onExpireStateGlobalJS']=function(_0x411233){const _0x120850=_0x15a52d;if(this[_0x120850(0x388)]||this[_0x120850(0x2dd)])return;try{VisuMZ['SkillsStatesCore'][_0x120850(0x3bc)][_0x120850(0x211)][_0x120850(0x37f)][_0x120850(0x2b6)](this,_0x411233);}catch(_0x17f1ba){if($gameTemp[_0x120850(0xdf)]())console[_0x120850(0x402)](_0x17f1ba);}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x33d)]=function(_0x26a3ad){const _0x3e0ca4=_0x15a52d;return _0x26a3ad=_0x26a3ad[_0x3e0ca4(0x219)]()[_0x3e0ca4(0xe8)](),this[_0x3e0ca4(0x254)]()[_0x3e0ca4(0x39e)](_0xa34688=>_0xa34688['categories']['includes'](_0x26a3ad));},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x3eb)]=function(_0x5ba4f2,_0x50c1e4){const _0x36760b=_0x15a52d;_0x5ba4f2=_0x5ba4f2[_0x36760b(0x219)]()['trim'](),_0x50c1e4=_0x50c1e4||0x0;const _0x376fed=this[_0x36760b(0x33d)](_0x5ba4f2),_0xff5539=[];for(const _0x495ca2 of _0x376fed){if(!_0x495ca2)continue;if(_0x50c1e4<=0x0)break;_0xff5539[_0x36760b(0x13f)](_0x495ca2['id']),this[_0x36760b(0x3d7)]['success']=!![],_0x50c1e4--;}while(_0xff5539[_0x36760b(0x17d)]>0x0){this['removeState'](_0xff5539[_0x36760b(0x301)]());}},Game_Battler['prototype'][_0x15a52d(0x3b2)]=function(_0x4180e5,_0x579b14){const _0x5b5fec=_0x15a52d;_0x4180e5=_0x4180e5[_0x5b5fec(0x219)]()[_0x5b5fec(0xe8)](),_0x579b14=_0x579b14||[];const _0x1928b4=this[_0x5b5fec(0x33d)](_0x4180e5),_0x443fa7=[];for(const _0x2d4409 of _0x1928b4){if(!_0x2d4409)continue;if(_0x579b14[_0x5b5fec(0xf9)](_0x2d4409))continue;_0x443fa7[_0x5b5fec(0x13f)](_0x2d4409['id']),this[_0x5b5fec(0x3d7)][_0x5b5fec(0x2cf)]=!![];}while(_0x443fa7[_0x5b5fec(0x17d)]>0x0){this['removeState'](_0x443fa7['shift']());}},Game_Battler['prototype']['isStateCategoryAffected']=function(_0x2a81f4){return this['totalStateCategoryAffected'](_0x2a81f4)>0x0;},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x327)]=function(_0xd9eb72){const _0xd6d13d=_0x15a52d;return this[_0xd6d13d(0x2f5)](_0xd9eb72)>0x0;},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x209)]=function(_0x569e46){const _0x1ff51f=_0x15a52d,_0x1699ef=this[_0x1ff51f(0x33d)](_0x569e46)[_0x1ff51f(0x39e)](_0x3b543b=>this[_0x1ff51f(0xf3)](_0x3b543b['id']));return _0x1699ef[_0x1ff51f(0x17d)];},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x2f5)]=function(_0x450883){const _0x4b8d52=_0x15a52d,_0x4c591a=this[_0x4b8d52(0x33d)](_0x450883);return _0x4c591a[_0x4b8d52(0x17d)];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x21d)]=Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x183)],Game_BattlerBase['prototype'][_0x15a52d(0x183)]=function(_0xce96b6){const _0x522256=_0x15a52d,_0x1c6f74=$dataStates[_0xce96b6];if(_0x1c6f74&&_0x1c6f74['categories'][_0x522256(0x17d)]>0x0)for(const _0x1e69f7 of _0x1c6f74[_0x522256(0xe1)]){if(this[_0x522256(0x3b8)](_0x1e69f7))return!![];}return VisuMZ[_0x522256(0x397)][_0x522256(0x21d)][_0x522256(0x2b6)](this,_0xce96b6);},Game_BattlerBase['prototype'][_0x15a52d(0x3b8)]=function(_0x2ed2a0){const _0x535423=_0x15a52d;let _0x5d77b9='stateCategoriesResisted';if(this[_0x535423(0x1af)](_0x5d77b9))return this['_cache'][_0x5d77b9][_0x535423(0xf9)](_0x2ed2a0);return this['_cache'][_0x5d77b9]=this[_0x535423(0x161)](),this[_0x535423(0x2db)][_0x5d77b9][_0x535423(0xf9)](_0x2ed2a0);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x161)]=function(){const _0x13dc6b=_0x15a52d,_0x5a77e2=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x113225=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x5a6ea0=[];for(const _0x10277e of this[_0x13dc6b(0x1c5)]()){if(!_0x10277e)continue;const _0x3886be=_0x10277e[_0x13dc6b(0x2df)],_0x30b310=_0x3886be[_0x13dc6b(0xed)](_0x5a77e2);if(_0x30b310)for(const _0x360629 of _0x30b310){_0x360629[_0x13dc6b(0xed)](_0x5a77e2);const _0x580ad1=String(RegExp['$1'])[_0x13dc6b(0x23f)](',')[_0x13dc6b(0x258)](_0x198141=>String(_0x198141)[_0x13dc6b(0x219)]()['trim']());_0x5a6ea0=_0x5a6ea0['concat'](_0x580ad1);}if(_0x3886be[_0x13dc6b(0xed)](_0x113225)){const _0x45a752=String(RegExp['$1'])[_0x13dc6b(0x23f)](/[\r\n]+/)[_0x13dc6b(0x258)](_0x23a828=>String(_0x23a828)[_0x13dc6b(0x219)]()[_0x13dc6b(0xe8)]());_0x5a6ea0=_0x5a6ea0[_0x13dc6b(0x13c)](_0x45a752);}}return _0x5a6ea0;},Game_BattlerBase['prototype']['removeOtherStatesOfSameCategory']=function(_0x1dd109){const _0x215cc3=_0x15a52d,_0x187b8e=$dataStates[_0x1dd109];if(!_0x187b8e)return;const _0x51d86e=_0x187b8e[_0x215cc3(0x2df)]||'',_0x2b445a=_0x51d86e[_0x215cc3(0xed)](/<REMOVE OTHER (.*) STATES>/gi);if(_0x2b445a){const _0x782509=[_0x187b8e];for(const _0x46d954 of _0x2b445a){_0x46d954['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x495830=String(RegExp['$1']);this[_0x215cc3(0x3b2)](_0x495830,_0x782509);}}},Game_Battler['prototype'][_0x15a52d(0x174)]=function(){const _0x1ebc2a=_0x15a52d;for(const _0x5dc5d6 of this[_0x1ebc2a(0x254)]()){if(!_0x5dc5d6)continue;if(!this[_0x1ebc2a(0xf3)](_0x5dc5d6['id']))continue;if(!_0x5dc5d6['removeByDamage'])continue;if(this[_0x1ebc2a(0x1a2)](_0x5dc5d6))continue;Math['randomInt'](0x64)<_0x5dc5d6[_0x1ebc2a(0x3ba)]&&this[_0x1ebc2a(0x3ed)](_0x5dc5d6['id']);}},VisuMZ['SkillsStatesCore'][_0x15a52d(0xe4)]=Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x153)],Game_Action[_0x15a52d(0x21f)][_0x15a52d(0x153)]=function(_0x979ba1,_0x5d772a){const _0x1bfe04=_0x15a52d;$gameTemp[_0x1bfe04(0x37a)]=this[_0x1bfe04(0x2f0)](),$gameTemp[_0x1bfe04(0x3cf)]=this[_0x1bfe04(0x12a)](),$gameTemp['_bypassRemoveStateDamage_value']=_0x5d772a,VisuMZ[_0x1bfe04(0x397)]['Game_Action_executeHpDamage_bypassStateDmgRemoval'][_0x1bfe04(0x2b6)](this,_0x979ba1,_0x5d772a),$gameTemp[_0x1bfe04(0x37a)]=undefined,$gameTemp[_0x1bfe04(0x3cf)]=undefined,$gameTemp[_0x1bfe04(0x260)]=undefined;},Game_Battler[_0x15a52d(0x21f)]['bypassRemoveStatesByDamage']=function(_0x5861cc){const _0x358b29=_0x15a52d;if($gameTemp[_0x358b29(0x37a)]){const _0x29ac25=$gameTemp['_bypassRemoveStateDamage_action'],_0x14d080=/<BYPASS STATE DAMAGE REMOVAL:[ ](.*)>/gi;if(DataManager[_0x358b29(0x350)](_0x5861cc,_0x29ac25,_0x14d080,_0x358b29(0x37e)))return!![];}if($gameTemp['_bypassRemoveStateDamage_user']){const _0x5a174e=$gameTemp[_0x358b29(0x3cf)];if(_0x5a174e['isUserBypassRemoveStatesByDamage'](_0x5861cc))return!![];}if(this[_0x358b29(0x27e)](_0x5861cc))return!![];return![];},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x21b)]=function(_0xfdfbe6){const _0x54451c=_0x15a52d,_0x74ba83=/<BYPASS STATE DAMAGE REMOVAL AS (?:ATTACKER|USER):[ ](.*)>/gi;for(const _0x216c0e of this[_0x54451c(0x1c5)]()){if(!_0x216c0e)continue;if(DataManager['CheckBypassRemoveStatesByDamage'](_0xfdfbe6,_0x216c0e,_0x74ba83,_0x54451c(0x191)))return!![];}return![];},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x27e)]=function(_0x2d25a9){const _0x4e2dba=_0x15a52d,_0x4523a7=/<BYPASS STATE DAMAGE REMOVAL AS (?:TARGET|VICTIM):[ ](.*)>/gi;for(const _0x5198e6 of this[_0x4e2dba(0x1c5)]()){if(!_0x5198e6)continue;if(DataManager[_0x4e2dba(0x350)](_0x2d25a9,_0x5198e6,_0x4523a7,_0x4e2dba(0x311)))return!![];}return![];},DataManager[_0x15a52d(0x350)]=function(_0x584a8f,_0x1614b0,_0x2f3b14,_0x391853){const _0x1a47b1=_0x15a52d,_0x161594='%1-%2-%3'[_0x1a47b1(0x25f)](_0x1614b0[_0x1a47b1(0x3df)],_0x1614b0['id'],_0x391853);this[_0x1a47b1(0x2d8)]=this['_cache_CheckBypassRemoveStatesByDamage']||{};if(this[_0x1a47b1(0x2d8)][_0x161594]!==undefined)return this['_cache_CheckBypassRemoveStatesByDamage'][_0x161594][_0x1a47b1(0xf9)](_0x584a8f['id']);const _0x57d635=[],_0x43f8f6=_0x1614b0[_0x1a47b1(0x2df)][_0x1a47b1(0xed)](_0x2f3b14);if(_0x43f8f6)for(const _0x2e70ec of _0x43f8f6){_0x2e70ec[_0x1a47b1(0xed)](_0x2f3b14);const _0x298354=String(RegExp['$1'])['split'](',')[_0x1a47b1(0x258)](_0x501cd4=>_0x501cd4[_0x1a47b1(0xe8)]());for(let _0x213633 of _0x298354){_0x213633=(String(_0x213633)||'')['trim']();if(_0x213633[_0x1a47b1(0xed)](/(\d+)[ ](?:THROUGH|to)[ ](\d+)/i)){const _0x8454a=Math[_0x1a47b1(0x1a6)](Number(RegExp['$1']),Number(RegExp['$2'])),_0x399a44=Math[_0x1a47b1(0x299)](Number(RegExp['$1']),Number(RegExp['$2']));for(let _0x4ae020=_0x8454a;_0x4ae020<=_0x399a44;_0x4ae020++)_0x57d635[_0x1a47b1(0x13f)](_0x4ae020);continue;}const _0x562b43=/^\d+$/[_0x1a47b1(0x117)](_0x213633);_0x562b43?entryID=Number(_0x213633):entryID=DataManager['getStateIdWithName'](_0x213633),entryID&&_0x57d635[_0x1a47b1(0x13f)](entryID);}}return this['_cache_CheckBypassRemoveStatesByDamage'][_0x161594]=_0x57d635,this['_cache_CheckBypassRemoveStatesByDamage'][_0x161594][_0x1a47b1(0xf9)](_0x584a8f['id']);},VisuMZ[_0x15a52d(0x397)]['Game_Battler_addBuff']=Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x105)],Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x105)]=function(_0xe71b5f,_0x2dd3a2){const _0x1ebb8d=_0x15a52d;VisuMZ[_0x1ebb8d(0x397)][_0x1ebb8d(0x293)][_0x1ebb8d(0x2b6)](this,_0xe71b5f,_0x2dd3a2),this[_0x1ebb8d(0x30b)](_0xe71b5f)&&this[_0x1ebb8d(0x252)](_0xe71b5f,_0x2dd3a2);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x340)]=function(_0x3235d4){},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x1b2)]=Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x341)],Game_Battler[_0x15a52d(0x21f)]['addDebuff']=function(_0x24288e,_0x4b93d1){const _0x21667a=_0x15a52d;VisuMZ['SkillsStatesCore'][_0x21667a(0x1b2)][_0x21667a(0x2b6)](this,_0x24288e,_0x4b93d1),this[_0x21667a(0x1de)](_0x24288e)&&this[_0x21667a(0x118)](_0x24288e,_0x4b93d1);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x2a7)]=function(){const _0x42ed97=_0x15a52d;for(let _0x1185bf=0x0;_0x1185bf<this[_0x42ed97(0x27d)]();_0x1185bf++){if(this[_0x42ed97(0x1c8)](_0x1185bf)){const _0x1fba8f=this[_0x42ed97(0x145)][_0x1185bf];this[_0x42ed97(0x10a)](_0x1185bf);if(_0x1fba8f>0x0)this[_0x42ed97(0x276)](_0x1185bf);if(_0x1fba8f<0x0)this[_0x42ed97(0x3b9)](_0x1185bf);}}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x252)]=function(_0xfe17f8,_0x3b921e){const _0x3a0046=_0x15a52d;this[_0x3a0046(0x1b0)](_0xfe17f8,_0x3b921e);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x118)]=function(_0x11ec46,_0xdb63fa){const _0x5277b3=_0x15a52d;this[_0x5277b3(0x3b0)](_0x11ec46,_0xdb63fa);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x376)]=function(_0x4df260){const _0x2c687f=_0x15a52d;Game_BattlerBase[_0x2c687f(0x21f)][_0x2c687f(0x376)][_0x2c687f(0x2b6)](this,_0x4df260),this[_0x2c687f(0x163)](_0x4df260);},Game_Battler['prototype'][_0x15a52d(0x3f2)]=function(_0x42b18e){const _0x415eeb=_0x15a52d;Game_BattlerBase[_0x415eeb(0x21f)]['onEraseDebuff'][_0x415eeb(0x2b6)](this,_0x42b18e),this[_0x415eeb(0x1ce)](_0x42b18e);},Game_Battler['prototype'][_0x15a52d(0x276)]=function(_0x2e0114){const _0x34a223=_0x15a52d;this[_0x34a223(0x34a)](_0x2e0114);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x3b9)]=function(_0x3ee206){const _0x4b68d4=_0x15a52d;this[_0x4b68d4(0x1fd)](_0x3ee206);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x1b0)]=function(_0x2e616c,_0x23900e){const _0xc589ef=_0x15a52d;VisuMZ[_0xc589ef(0x397)]['Settings'][_0xc589ef(0x35b)]['onAddBuffJS'][_0xc589ef(0x2b6)](this,_0x2e616c,_0x23900e);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x3b0)]=function(_0x4d2702,_0x338eaf){const _0x34c58a=_0x15a52d;VisuMZ[_0x34c58a(0x397)][_0x34c58a(0x3bc)][_0x34c58a(0x35b)][_0x34c58a(0x355)]['call'](this,_0x4d2702,_0x338eaf);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x163)]=function(_0x2cbd0d){const _0x5e4de3=_0x15a52d;VisuMZ[_0x5e4de3(0x397)]['Settings'][_0x5e4de3(0x35b)][_0x5e4de3(0x220)][_0x5e4de3(0x2b6)](this,_0x2cbd0d);},Game_BattlerBase[_0x15a52d(0x21f)][_0x15a52d(0x1ce)]=function(_0x5ea6a3){const _0x4c23a0=_0x15a52d;VisuMZ[_0x4c23a0(0x397)][_0x4c23a0(0x3bc)][_0x4c23a0(0x35b)][_0x4c23a0(0x28d)][_0x4c23a0(0x2b6)](this,_0x5ea6a3);},Game_Battler['prototype'][_0x15a52d(0x34a)]=function(_0x57ee9f){const _0x49d46d=_0x15a52d;VisuMZ[_0x49d46d(0x397)][_0x49d46d(0x3bc)][_0x49d46d(0x35b)][_0x49d46d(0x138)]['call'](this,_0x57ee9f);},Game_Battler[_0x15a52d(0x21f)]['onExpireDebuffGlobalJS']=function(_0x50ad80){const _0x3a9a6a=_0x15a52d;VisuMZ[_0x3a9a6a(0x397)][_0x3a9a6a(0x3bc)][_0x3a9a6a(0x35b)][_0x3a9a6a(0x398)]['call'](this,_0x50ad80);},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x165)]=function(_0x3403e6){const _0x20d798=_0x15a52d,_0x14cd35=VisuMZ[_0x20d798(0x397)],_0xfe6720=[_0x20d798(0x1ca),'stateHpSlipHealJS',_0x20d798(0x25e),_0x20d798(0x149),'stateTpSlipDamageJS','stateTpSlipHealJS'];for(const _0x2cc9a8 of _0xfe6720){_0x14cd35[_0x2cc9a8][_0x3403e6]&&_0x14cd35[_0x2cc9a8][_0x3403e6][_0x20d798(0x2b6)](this,_0x3403e6);}},VisuMZ[_0x15a52d(0x397)]['Game_Battler_regenerateAll']=Game_Battler['prototype']['regenerateAll'],Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x1a1)]=function(){const _0x597d06=_0x15a52d;this['recalculateSlipDamageJS'](),VisuMZ['SkillsStatesCore']['Game_Battler_regenerateAll'][_0x597d06(0x2b6)](this),this[_0x597d06(0x12d)](),this[_0x597d06(0x2e7)]();},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x12d)]=function(){for(const _0x24ebd6 of this['passiveStates']()){if(!_0x24ebd6)continue;this['onAddStateMakeCustomSlipValues'](_0x24ebd6['id']);}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x35f)]=function(){const _0x48c1bd=_0x15a52d;for(const _0x206c21 of this['states']()){if(!_0x206c21)continue;_0x206c21[_0x48c1bd(0x2df)]['match'](/<JS SLIP REFRESH>/i)&&this[_0x48c1bd(0x165)](_0x206c21['id']);}},Game_Battler[_0x15a52d(0x21f)][_0x15a52d(0x2e7)]=function(){const _0x28255b=_0x15a52d;if(!this['isAlive']())return;const _0x1b0769=this[_0x28255b(0x254)]();for(const _0x4ddc10 of _0x1b0769){if(!_0x4ddc10)continue;this[_0x28255b(0x373)](_0x4ddc10);}},Game_Battler['prototype'][_0x15a52d(0x373)]=function(_0x429f72){const _0x37755f=_0x15a52d,_0x5849e6=this[_0x37755f(0x356)](_0x429f72['id'],'slipHp')||0x0,_0x32407c=-this[_0x37755f(0x39c)](),_0x5ab06d=Math[_0x37755f(0x299)](_0x5849e6,_0x32407c);if(_0x5ab06d!==0x0){const _0x14a30f=this[_0x37755f(0x3d7)]['hpDamage']||0x0;this[_0x37755f(0x195)](_0x5ab06d),this[_0x37755f(0x3d7)][_0x37755f(0x22f)]+=_0x14a30f;}const _0x3f9686=this[_0x37755f(0x356)](_0x429f72['id'],_0x37755f(0x148))||0x0;if(_0x3f9686!==0x0){const _0x432283=this[_0x37755f(0x3d7)]['mpDamage']||0x0;this['gainMp'](_0x3f9686),this[_0x37755f(0x3d7)][_0x37755f(0x17f)]+=_0x432283;}const _0x21d84f=this['getStateData'](_0x429f72['id'],_0x37755f(0x1d7))||0x0;_0x21d84f!==0x0&&this['gainSilentTp'](_0x21d84f);},VisuMZ[_0x15a52d(0x397)]['Game_Actor_skillTypes']=Game_Actor[_0x15a52d(0x21f)]['skillTypes'],Game_Actor['prototype'][_0x15a52d(0x273)]=function(){const _0x3f0b8d=_0x15a52d,_0x12b29c=VisuMZ['SkillsStatesCore'][_0x3f0b8d(0x321)][_0x3f0b8d(0x2b6)](this),_0x5b22ed=VisuMZ[_0x3f0b8d(0x397)][_0x3f0b8d(0x3bc)]['Skills'];let _0x5f4255=_0x5b22ed[_0x3f0b8d(0x265)];return $gameParty[_0x3f0b8d(0xeb)]()&&(_0x5f4255=_0x5f4255[_0x3f0b8d(0x13c)](_0x5b22ed['BattleHiddenSkillTypes'])),_0x12b29c['filter'](_0x23dfe3=>!_0x5f4255[_0x3f0b8d(0xf9)](_0x23dfe3));},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x286)]=function(){const _0x40b1e4=_0x15a52d;return this[_0x40b1e4(0x36b)]()[_0x40b1e4(0x39e)](_0x5c5ee5=>this[_0x40b1e4(0x26b)](_0x5c5ee5));},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x26b)]=function(_0x4d3f99){const _0x513684=_0x15a52d;if(!this[_0x513684(0x3b7)](_0x4d3f99))return![];if(!_0x4d3f99)return![];if(!this[_0x513684(0x3f3)](_0x4d3f99))return![];if(this[_0x513684(0x31c)](_0x4d3f99))return![];return!![];},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x3f3)]=function(_0x41aefb){const _0x3b2d57=_0x15a52d,_0x189d23=this[_0x3b2d57(0x273)](),_0x35247b=DataManager[_0x3b2d57(0x23b)](_0x41aefb),_0x581176=_0x189d23['filter'](_0x4e0004=>_0x35247b[_0x3b2d57(0xf9)](_0x4e0004));return _0x581176['length']>0x0;},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x31c)]=function(_0x5c283a){const _0x4ac365=_0x15a52d;if(!VisuMZ[_0x4ac365(0x397)][_0x4ac365(0x240)](this,_0x5c283a))return!![];if(!VisuMZ['SkillsStatesCore'][_0x4ac365(0x353)](this,_0x5c283a))return!![];if(!VisuMZ[_0x4ac365(0x397)]['CheckVisibleSkillNotetags'](this,_0x5c283a))return!![];return![];},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x38a)]=function(){const _0x371cbc=_0x15a52d;let _0x14ca97=[this[_0x371cbc(0x19e)](),this[_0x371cbc(0x316)]()];_0x14ca97=_0x14ca97[_0x371cbc(0x13c)](this[_0x371cbc(0x3b1)]()['filter'](_0x5e2c9e=>_0x5e2c9e));for(const _0x4a7360 of this['_skills']){const _0x42a7c4=$dataSkills[_0x4a7360];if(!_0x42a7c4)continue;if(DataManager[_0x371cbc(0x2e9)](_0x42a7c4)){if(!this[_0x371cbc(0x2e4)](_0x42a7c4))continue;}_0x14ca97[_0x371cbc(0x13f)](_0x42a7c4);}return _0x14ca97;},Game_Actor['prototype'][_0x15a52d(0x283)]=function(){const _0x4d4afa=_0x15a52d;Game_Battler[_0x4d4afa(0x21f)]['addPassiveStatesByPluginParameters'][_0x4d4afa(0x2b6)](this);const _0x146d01=VisuMZ[_0x4d4afa(0x397)][_0x4d4afa(0x3bc)][_0x4d4afa(0x3a9)][_0x4d4afa(0x1cf)];this[_0x4d4afa(0x2db)][_0x4d4afa(0x3f9)]=this[_0x4d4afa(0x2db)][_0x4d4afa(0x3f9)][_0x4d4afa(0x13c)](_0x146d01);},VisuMZ['SkillsStatesCore'][_0x15a52d(0x2f4)]=Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x13a)],Game_Actor[_0x15a52d(0x21f)]['learnSkill']=function(_0x22846f){const _0x2bc02f=_0x15a52d;VisuMZ[_0x2bc02f(0x397)][_0x2bc02f(0x2f4)][_0x2bc02f(0x2b6)](this,_0x22846f),this[_0x2bc02f(0x2db)]={},this['passiveStates']();},VisuMZ[_0x15a52d(0x397)]['Game_Actor_forgetSkill']=Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x3bd)],Game_Actor[_0x15a52d(0x21f)]['forgetSkill']=function(_0x153a83){const _0x4074f9=_0x15a52d;VisuMZ[_0x4074f9(0x397)][_0x4074f9(0x162)]['call'](this,_0x153a83),this[_0x4074f9(0x2db)]={},this['passiveStates']();},Game_Actor[_0x15a52d(0x21f)][_0x15a52d(0x374)]=function(){const _0x3b0142=_0x15a52d;return VisuMZ[_0x3b0142(0x397)][_0x3b0142(0x3bc)]['States'][_0x3b0142(0x128)]??0x14;},Game_Enemy[_0x15a52d(0x21f)][_0x15a52d(0x38a)]=function(){const _0x30ef61=_0x15a52d;let _0x382b0e=[this[_0x30ef61(0x1bd)]()];return _0x382b0e['concat'](this[_0x30ef61(0x36b)]());},Game_Enemy[_0x15a52d(0x21f)]['addPassiveStatesByPluginParameters']=function(){const _0x19ad24=_0x15a52d;Game_Battler[_0x19ad24(0x21f)][_0x19ad24(0x283)][_0x19ad24(0x2b6)](this);const _0x1f0f0e=VisuMZ[_0x19ad24(0x397)][_0x19ad24(0x3bc)][_0x19ad24(0x3a9)]['Enemy'];this['_cache'][_0x19ad24(0x3f9)]=this['_cache']['passiveStates'][_0x19ad24(0x13c)](_0x1f0f0e);},Game_Enemy[_0x15a52d(0x21f)][_0x15a52d(0x36b)]=function(){const _0x5992c6=_0x15a52d,_0x3afc0e=[];for(const _0x3eb48a of this[_0x5992c6(0x1bd)]()[_0x5992c6(0x247)]){const _0x83c855=$dataSkills[_0x3eb48a[_0x5992c6(0x248)]];if(_0x83c855&&!_0x3afc0e[_0x5992c6(0xf9)](_0x83c855))_0x3afc0e[_0x5992c6(0x13f)](_0x83c855);}return _0x3afc0e;},Game_Enemy[_0x15a52d(0x21f)][_0x15a52d(0x2de)]=function(_0x505b4c){const _0x2bee3f=_0x15a52d;return this[_0x2bee3f(0x1fb)]($dataStates[_0x505b4c]);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x157)]=Game_Unit[_0x15a52d(0x21f)][_0x15a52d(0x1c6)],Game_Unit[_0x15a52d(0x21f)]['isAllDead']=function(){const _0x2b7129=_0x15a52d;if(this[_0x2b7129(0x19a)]())return!![];return VisuMZ['SkillsStatesCore'][_0x2b7129(0x157)][_0x2b7129(0x2b6)](this);},Game_Unit[_0x15a52d(0x21f)][_0x15a52d(0x19a)]=function(){const _0x9c812d=_0x15a52d,_0xc7e522=this['aliveMembers']();for(const _0xb35e46 of _0xc7e522){if(!_0xb35e46[_0x9c812d(0x3d3)]())return![];}return!![];},Game_Unit['prototype']['refreshAllMembers']=function(){const _0x4730db=_0x15a52d;for(const _0x3bd201 of this[_0x4730db(0x380)]()){if(!_0x3bd201)continue;_0x3bd201[_0x4730db(0x309)]();}},VisuMZ['SkillsStatesCore'][_0x15a52d(0x370)]=Game_Player[_0x15a52d(0x21f)][_0x15a52d(0x309)],Game_Player[_0x15a52d(0x21f)][_0x15a52d(0x309)]=function(){const _0x44376a=_0x15a52d;VisuMZ[_0x44376a(0x397)][_0x44376a(0x370)][_0x44376a(0x2b6)](this),$gameParty[_0x44376a(0x3e4)](),$gameParty[_0x44376a(0xeb)]()&&$gameTroop[_0x44376a(0x3e4)]();},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x303)]=Game_Troop[_0x15a52d(0x21f)]['setup'],Game_Troop[_0x15a52d(0x21f)]['setup']=function(_0xd4feff){const _0x1dc721=_0x15a52d;VisuMZ['SkillsStatesCore'][_0x1dc721(0x303)]['call'](this,_0xd4feff),this[_0x1dc721(0x3e9)]();},Game_Troop[_0x15a52d(0x21f)][_0x15a52d(0x3e9)]=function(){const _0x44e1ad=_0x15a52d;this[_0x44e1ad(0x367)]=Graphics[_0x44e1ad(0x10b)];},Game_Troop['prototype'][_0x15a52d(0x21c)]=function(){const _0x2ff4bb=_0x15a52d;return this[_0x2ff4bb(0x367)]=this['_currentTroopUniqueID']||Graphics[_0x2ff4bb(0x10b)],this['_currentTroopUniqueID'];},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x298)]=function(){const _0x2d2494=_0x15a52d;if(ConfigManager[_0x2d2494(0x21e)]&&ConfigManager[_0x2d2494(0x2a4)]!==undefined)return ConfigManager[_0x2d2494(0x2a4)];else{if(this[_0x2d2494(0x352)]())return this['updatedLayoutStyle']()[_0x2d2494(0xed)](/LOWER/i);else Scene_ItemBase[_0x2d2494(0x21f)][_0x2d2494(0x203)][_0x2d2494(0x2b6)](this);}},Scene_Skill['prototype'][_0x15a52d(0x203)]=function(){const _0x61721e=_0x15a52d;if(ConfigManager[_0x61721e(0x21e)]&&ConfigManager[_0x61721e(0xf5)]!==undefined)return ConfigManager[_0x61721e(0xf5)];else return this[_0x61721e(0x352)]()?this[_0x61721e(0x3e5)]()[_0x61721e(0xed)](/RIGHT/i):Scene_ItemBase[_0x61721e(0x21f)][_0x61721e(0x203)]['call'](this);},Scene_Skill['prototype'][_0x15a52d(0x3e5)]=function(){const _0x35c5a9=_0x15a52d;return VisuMZ[_0x35c5a9(0x397)]['Settings'][_0x35c5a9(0x131)][_0x35c5a9(0x24f)];},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x168)]=function(){const _0x50369e=_0x15a52d;return this[_0x50369e(0x297)]&&this[_0x50369e(0x297)][_0x50369e(0x168)]();},Scene_Skill[_0x15a52d(0x21f)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0xf4f4f=_0x15a52d;return VisuMZ[_0xf4f4f(0x397)]['Settings'][_0xf4f4f(0x131)][_0xf4f4f(0x333)];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2d3)]=Scene_Skill['prototype']['helpWindowRect'],Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x404)]=function(){const _0x2dc662=_0x15a52d;return this['isUseSkillsStatesCoreUpdatedLayout']()?this['helpWindowRectSkillsStatesCore']():VisuMZ['SkillsStatesCore'][_0x2dc662(0x2d3)][_0x2dc662(0x2b6)](this);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x3f0)]=function(){const _0x128b4a=_0x15a52d,_0x2e48cc=0x0,_0x496ba0=this[_0x128b4a(0x16e)](),_0x107775=Graphics[_0x128b4a(0x29e)],_0x3e39ce=this[_0x128b4a(0x190)]();return new Rectangle(_0x2e48cc,_0x496ba0,_0x107775,_0x3e39ce);},VisuMZ[_0x15a52d(0x397)]['Scene_Skill_skillTypeWindowRect']=Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x400)],Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x400)]=function(){const _0x86e0e=_0x15a52d;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x86e0e(0x3fb)]():VisuMZ[_0x86e0e(0x397)][_0x86e0e(0x2c1)][_0x86e0e(0x2b6)](this);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x331)]=function(){const _0x500a02=_0x15a52d;return VisuMZ['SkillsStatesCore']['Settings'][_0x500a02(0x131)]['CmdWidth']??Scene_MenuBase[_0x500a02(0x21f)]['mainCommandWidth'][_0x500a02(0x2b6)](this);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x3fb)]=function(){const _0x215fa7=_0x15a52d,_0x35bf7e=this[_0x215fa7(0x331)](),_0x4ea7f5=this[_0x215fa7(0x11b)](0x3,!![]),_0x1d0fff=this[_0x215fa7(0x203)]()?Graphics[_0x215fa7(0x29e)]-_0x35bf7e:0x0,_0x562af0=this['mainAreaTop']();return new Rectangle(_0x1d0fff,_0x562af0,_0x35bf7e,_0x4ea7f5);},VisuMZ[_0x15a52d(0x397)]['Scene_Skill_statusWindowRect']=Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x1df)],Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x1df)]=function(){const _0x4d19d0=_0x15a52d;return this['isUseSkillsStatesCoreUpdatedLayout']()?this[_0x4d19d0(0x27b)]():VisuMZ[_0x4d19d0(0x397)][_0x4d19d0(0x3be)]['call'](this);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x27b)]=function(){const _0x4b5aaf=_0x15a52d,_0x102926=Graphics['boxWidth']-this[_0x4b5aaf(0x331)](),_0x57ccf5=this[_0x4b5aaf(0x395)][_0x4b5aaf(0x289)],_0x155e68=this[_0x4b5aaf(0x203)]()?0x0:Graphics[_0x4b5aaf(0x29e)]-_0x102926,_0x230084=this['mainAreaTop']();return new Rectangle(_0x155e68,_0x230084,_0x102926,_0x57ccf5);},VisuMZ[_0x15a52d(0x397)]['Scene_Skill_createItemWindow']=Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x1dc)],Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x1dc)]=function(){const _0x352ad0=_0x15a52d;VisuMZ['SkillsStatesCore'][_0x352ad0(0x215)]['call'](this),this[_0x352ad0(0x175)]()&&this[_0x352ad0(0x237)]();},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2bd)]=Scene_Skill[_0x15a52d(0x21f)]['itemWindowRect'],Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x29b)]=function(){const _0x5ab117=_0x15a52d;if(this[_0x5ab117(0x352)]())return this[_0x5ab117(0x3ec)]();else{const _0x5c27ee=VisuMZ[_0x5ab117(0x397)]['Scene_Skill_itemWindowRect']['call'](this);return this[_0x5ab117(0x175)]()&&this['adjustItemWidthByShopStatus']()&&(_0x5c27ee[_0x5ab117(0x2fe)]-=this[_0x5ab117(0x150)]()),_0x5c27ee;}},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x3ec)]=function(){const _0x3e7c8f=_0x15a52d,_0x5c24d0=Graphics['boxWidth']-this[_0x3e7c8f(0x150)](),_0xb9f02=this[_0x3e7c8f(0x1b4)]()-this['_statusWindow'][_0x3e7c8f(0x289)],_0x395c77=this[_0x3e7c8f(0x203)]()?Graphics[_0x3e7c8f(0x29e)]-_0x5c24d0:0x0,_0x206138=this['_statusWindow']['y']+this[_0x3e7c8f(0x21a)][_0x3e7c8f(0x289)];return new Rectangle(_0x395c77,_0x206138,_0x5c24d0,_0xb9f02);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x175)]=function(){const _0x43efc4=_0x15a52d;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0x43efc4(0x352)]()?!![]:VisuMZ['SkillsStatesCore'][_0x43efc4(0x3bc)]['Skills'][_0x43efc4(0x25d)];},Scene_Skill['prototype']['adjustItemWidthByShopStatus']=function(){const _0x37673b=_0x15a52d;return VisuMZ['SkillsStatesCore']['Settings'][_0x37673b(0x131)][_0x37673b(0x2b1)];},Scene_Skill[_0x15a52d(0x21f)]['createShopStatusWindow']=function(){const _0x418300=_0x15a52d,_0x7f5f0e=this[_0x418300(0x2ff)]();this[_0x418300(0x1fe)]=new Window_ShopStatus(_0x7f5f0e),this[_0x418300(0x3fd)](this['_shopStatusWindow']),this[_0x418300(0x2ea)][_0x418300(0x32b)](this['_shopStatusWindow']);const _0x5e69c9=VisuMZ[_0x418300(0x397)][_0x418300(0x3bc)]['Skills'][_0x418300(0xe3)];this[_0x418300(0x1fe)][_0x418300(0x336)](_0x5e69c9||0x0);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x2ff)]=function(){const _0x1c4b79=_0x15a52d;return this[_0x1c4b79(0x352)]()?this[_0x1c4b79(0x229)]():VisuMZ['SkillsStatesCore'][_0x1c4b79(0x3bc)][_0x1c4b79(0x131)]['SkillMenuStatusRect'][_0x1c4b79(0x2b6)](this);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x229)]=function(){const _0x4221f0=_0x15a52d,_0x5e8454=this[_0x4221f0(0x150)](),_0x6e420b=this[_0x4221f0(0x2ea)]['height'],_0x4dd77f=this[_0x4221f0(0x203)]()?0x0:Graphics[_0x4221f0(0x29e)]-this[_0x4221f0(0x150)](),_0x22fe7b=this['_itemWindow']['y'];return new Rectangle(_0x4dd77f,_0x22fe7b,_0x5e8454,_0x6e420b);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x150)]=function(){const _0x2b75d1=_0x15a52d;return Imported[_0x2b75d1(0x256)]?Scene_Shop[_0x2b75d1(0x21f)]['statusWidth']():0x0;},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x1f4)]=function(){const _0x19cbe8=_0x15a52d;return this[_0x19cbe8(0x395)]&&this['_skillTypeWindow'][_0x19cbe8(0x34d)]?TextManager[_0x19cbe8(0x14f)]:'';},VisuMZ[_0x15a52d(0x397)]['Scene_Skill_onItemOk_Toggle']=Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0xf0)],Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0xf0)]=function(){const _0x15f9cb=_0x15a52d,_0x7ce3db=this['item']();DataManager['isToggleSkill'](_0x7ce3db)?this[_0x15f9cb(0x3c0)]():VisuMZ[_0x15f9cb(0x397)][_0x15f9cb(0x33e)][_0x15f9cb(0x2b6)](this);},Scene_Skill[_0x15a52d(0x21f)][_0x15a52d(0x3c0)]=function(){const _0xead59a=_0x15a52d;SoundManager['playEquip']();const _0x3b451a=this[_0xead59a(0x2f0)](),_0x2153bc=this[_0xead59a(0x19e)]()[_0xead59a(0x2e4)](_0x3b451a);if(!_0x2153bc)this['actor']()[_0xead59a(0x3d2)](_0x3b451a);this[_0xead59a(0x19e)]()[_0xead59a(0x2a8)](_0x3b451a,!_0x2153bc),this[_0xead59a(0x2ea)]['refresh'](),this[_0xead59a(0x2ea)][_0xead59a(0x379)]();if(this['_statusWindow'])this[_0xead59a(0x21a)]['refresh']();},VisuMZ[_0x15a52d(0x397)]['Scene_Battle_onSkillOk_Toggle']=Scene_Battle['prototype'][_0x15a52d(0x2d5)],Scene_Battle['prototype'][_0x15a52d(0x2d5)]=function(){const _0x439a99=_0x15a52d,_0x1b6017=this['_skillWindow'][_0x439a99(0x2f0)]();DataManager[_0x439a99(0x2e9)](_0x1b6017)?(this[_0x439a99(0x3c0)](_0x1b6017),this['_skillWindow'][_0x439a99(0x309)](),this['_skillWindow'][_0x439a99(0x379)]()):VisuMZ[_0x439a99(0x397)][_0x439a99(0x3ac)]['call'](this);},Scene_Battle[_0x15a52d(0x21f)]['isCurrentCommandSkillToggle']=function(){const _0x4d7d62=_0x15a52d;if(this[_0x4d7d62(0x14a)][_0x4d7d62(0xec)]()!==_0x4d7d62(0x3a8))return![];const _0x4459d2=this['_actorCommandWindow'][_0x4d7d62(0x1d3)](),_0x51246b=$dataSkills[_0x4459d2];return DataManager['isToggleSkill'](_0x51246b);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2fc)]=Scene_Battle[_0x15a52d(0x21f)][_0x15a52d(0x23e)],Scene_Battle[_0x15a52d(0x21f)]['onSelectAction']=function(){const _0x62e8e6=_0x15a52d;if(this[_0x62e8e6(0x28e)]()){const _0x2febb8=this[_0x62e8e6(0x14a)][_0x62e8e6(0x1d3)](),_0x55b8f9=$dataSkills[_0x2febb8];this[_0x62e8e6(0x3c0)](_0x55b8f9),this[_0x62e8e6(0x14a)][_0x62e8e6(0x309)](),this[_0x62e8e6(0x14a)]['activate']();}else VisuMZ['SkillsStatesCore'][_0x62e8e6(0x2fc)][_0x62e8e6(0x2b6)](this);},Scene_Battle[_0x15a52d(0x21f)][_0x15a52d(0x3c0)]=function(_0x445e68){const _0xda7a14=_0x15a52d;SoundManager[_0xda7a14(0x23a)]();const _0x2b11c8=BattleManager[_0xda7a14(0x19e)](),_0x46c65b=_0x2b11c8[_0xda7a14(0x2e4)](_0x445e68);if(!_0x46c65b)_0x2b11c8[_0xda7a14(0x3d2)](_0x445e68);_0x2b11c8[_0xda7a14(0x2a8)](_0x445e68,!_0x46c65b);if(Imported[_0xda7a14(0x3e0)]){let _0x29cbe6=0x0;_0x2b11c8[_0xda7a14(0x2e4)](_0x445e68)?_0x445e68[_0xda7a14(0x2df)][_0xda7a14(0xed)](/<TOGGLE ON (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x29cbe6=Number(RegExp['$1']):_0x29cbe6=_0x445e68[_0xda7a14(0x1ed)]||0x0:_0x445e68['note'][_0xda7a14(0xed)](/<TOGGLE OFF (?:ANI|ANIMATION):[ ](\d+)>/i)?_0x29cbe6=Number(RegExp['$1']):_0x29cbe6=VisuMZ[_0xda7a14(0x397)]['Settings'][_0xda7a14(0x15b)][_0xda7a14(0x1a7)]??0x0,_0x29cbe6>0x0&&$gameTemp[_0xda7a14(0x3a6)]([_0x2b11c8],_0x29cbe6,![],![]);}if(this[_0xda7a14(0x21a)])this[_0xda7a14(0x21a)][_0xda7a14(0x309)]();},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x17c)]=Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x3fe)],Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x3fe)]=function(){const _0x4a654f=_0x15a52d;VisuMZ['SkillsStatesCore'][_0x4a654f(0x17c)][_0x4a654f(0x2b6)](this),this[_0x4a654f(0x13d)]=null;},VisuMZ[_0x15a52d(0x397)]['Sprite_Gauge_setup']=Sprite_Gauge['prototype'][_0x15a52d(0x146)],Sprite_Gauge['prototype'][_0x15a52d(0x146)]=function(_0x3b4d37,_0x24024f){const _0x3e299c=_0x15a52d;this[_0x3e299c(0xf8)](_0x3b4d37,_0x24024f),_0x24024f=_0x24024f['toLowerCase'](),VisuMZ[_0x3e299c(0x397)]['Sprite_Gauge_setup']['call'](this,_0x3b4d37,_0x24024f);},Sprite_Gauge[_0x15a52d(0x21f)]['setupSkillsStatesCore']=function(_0x449270,_0xc91c8a){const _0x209c5e=_0x15a52d,_0xf7618d=VisuMZ[_0x209c5e(0x397)][_0x209c5e(0x3bc)]['Costs'][_0x209c5e(0x39e)](_0x3b06e4=>_0x3b06e4[_0x209c5e(0x3ca)][_0x209c5e(0x219)]()===_0xc91c8a[_0x209c5e(0x219)]());_0xf7618d[_0x209c5e(0x17d)]>=0x1?this['_costSettings']=_0xf7618d[0x0]:this[_0x209c5e(0x13d)]=null;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x142)]=Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x1a9)],Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x1a9)]=function(){const _0x49e601=_0x15a52d;return this[_0x49e601(0x3e3)]&&this[_0x49e601(0x13d)]?this[_0x49e601(0x322)]():VisuMZ[_0x49e601(0x397)][_0x49e601(0x142)]['call'](this);},Sprite_Gauge['prototype'][_0x15a52d(0x322)]=function(){const _0x2766a3=_0x15a52d;return this['_costSettings'][_0x2766a3(0x346)][_0x2766a3(0x2b6)](this[_0x2766a3(0x3e3)]);},VisuMZ[_0x15a52d(0x397)]['Sprite_Gauge_currentMaxValue']=Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x10d)],Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x10d)]=function(){const _0x54b0bb=_0x15a52d;return this[_0x54b0bb(0x3e3)]&&this[_0x54b0bb(0x13d)]?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x54b0bb(0x397)]['Sprite_Gauge_currentMaxValue'][_0x54b0bb(0x2b6)](this);},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x17e)]=function(){const _0x35e4ac=_0x15a52d;return this[_0x35e4ac(0x13d)]['GaugeMaxJS']['call'](this[_0x35e4ac(0x3e3)]);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x24e)]=Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x129)],Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x129)]=function(){const _0x4acaca=_0x15a52d,_0xb2dd48=VisuMZ['SkillsStatesCore'][_0x4acaca(0x24e)][_0x4acaca(0x2b6)](this);return _0xb2dd48['clamp'](0x0,0x1);},VisuMZ['SkillsStatesCore'][_0x15a52d(0x16c)]=Sprite_Gauge['prototype'][_0x15a52d(0x231)],Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x231)]=function(){const _0x3c4fe0=_0x15a52d;this[_0x3c4fe0(0x3e3)]&&this[_0x3c4fe0(0x13d)]?(this[_0x3c4fe0(0x306)][_0x3c4fe0(0x2af)](),this['redrawSkillsStatesCore']()):VisuMZ[_0x3c4fe0(0x397)][_0x3c4fe0(0x16c)][_0x3c4fe0(0x2b6)](this);},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x271)]=function(){const _0x224e7b=_0x15a52d;let _0x580e2b=this[_0x224e7b(0x1a9)]();return Imported[_0x224e7b(0x3e0)]&&this[_0x224e7b(0x16a)]()&&(_0x580e2b=VisuMZ[_0x224e7b(0x2d4)](_0x580e2b)),_0x580e2b;},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x270)]=function(){const _0x16aac5=_0x15a52d;this[_0x16aac5(0x306)][_0x16aac5(0x2af)](),this[_0x16aac5(0x13d)][_0x16aac5(0x230)][_0x16aac5(0x2b6)](this);},Sprite_Gauge['prototype'][_0x15a52d(0x15a)]=function(_0x44ee4b,_0x8504ad,_0x5367a5,_0x25be8e,_0x58a964,_0x5ba5da){const _0x11f200=_0x15a52d,_0x1fafb7=this[_0x11f200(0x129)](),_0x110b05=Math[_0x11f200(0x2d1)]((_0x58a964-0x2)*_0x1fafb7),_0x4d6179=_0x5ba5da-0x2,_0x31cca3=this[_0x11f200(0x38f)]();this['bitmap'][_0x11f200(0x107)](_0x5367a5,_0x25be8e,_0x58a964,_0x5ba5da,_0x31cca3),this[_0x11f200(0x306)][_0x11f200(0x100)](_0x5367a5+0x1,_0x25be8e+0x1,_0x110b05,_0x4d6179,_0x44ee4b,_0x8504ad);},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x320)]=function(){const _0xf68b84=_0x15a52d,_0x494a07=VisuMZ['SkillsStatesCore']['Settings'][_0xf68b84(0x11c)];return _0x494a07[_0xf68b84(0x151)]==='number'?$gameSystem[_0xf68b84(0x29a)]():$gameSystem[_0xf68b84(0x2ac)]();},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x285)]=function(){const _0xeab5e9=_0x15a52d,_0x1fb1c6=VisuMZ['SkillsStatesCore'][_0xeab5e9(0x3bc)][_0xeab5e9(0x11c)];return _0x1fb1c6[_0xeab5e9(0x151)]===_0xeab5e9(0x357)?$gameSystem[_0xeab5e9(0x325)]()-0x6:$gameSystem[_0xeab5e9(0x325)]()-0x2;},Sprite_Gauge['prototype'][_0x15a52d(0x20d)]=function(){const _0x51af37=_0x15a52d,_0x49af62=VisuMZ[_0x51af37(0x397)][_0x51af37(0x3bc)][_0x51af37(0x11c)];return _0x49af62[_0x51af37(0xfc)]===_0x51af37(0x357)?$gameSystem['numberFontFace']():$gameSystem['mainFontFace']();},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x28c)]=function(){const _0x505f06=_0x15a52d,_0x516f8f=VisuMZ['SkillsStatesCore'][_0x505f06(0x3bc)][_0x505f06(0x11c)];return _0x516f8f['ValueFontMainType']===_0x505f06(0x357)?$gameSystem[_0x505f06(0x325)]()-0x6:$gameSystem[_0x505f06(0x325)]()-0x2;},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x1e5)]=function(){const _0x18d6a5=_0x15a52d,_0x1027be=VisuMZ['SkillsStatesCore'][_0x18d6a5(0x3bc)]['Gauge'];if(_0x1027be['MatchLabelColor']){if(_0x1027be['MatchLabelGaugeColor']===0x1)return this['gaugeColor1']();else{if(_0x1027be[_0x18d6a5(0x115)]===0x2)return this['gaugeColor2']();}}const _0x226d5b=_0x1027be[_0x18d6a5(0x3e2)];return ColorManager[_0x18d6a5(0x29f)](_0x226d5b);},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x27f)]=function(){const _0x4992b1=_0x15a52d,_0x6ddde1=VisuMZ[_0x4992b1(0x397)][_0x4992b1(0x3bc)]['Gauge'];if(this[_0x4992b1(0x1b3)]()<=0x0)return'rgba(0,\x200,\x200,\x200)';else return _0x6ddde1[_0x4992b1(0x207)]?_0x4992b1(0x31f):ColorManager[_0x4992b1(0x144)]();},Sprite_Gauge['prototype']['labelOutlineWidth']=function(){const _0x1833b4=_0x15a52d;return VisuMZ['SkillsStatesCore'][_0x1833b4(0x3bc)][_0x1833b4(0x11c)][_0x1833b4(0x159)]||0x0;},Sprite_Gauge[_0x15a52d(0x21f)][_0x15a52d(0x3c8)]=function(){const _0x2f6d04=_0x15a52d,_0x4c8475=VisuMZ[_0x2f6d04(0x397)][_0x2f6d04(0x3bc)][_0x2f6d04(0x11c)];if(this['valueOutlineWidth']()<=0x0)return _0x2f6d04(0x375);else return _0x4c8475['ValueOutlineSolid']?_0x2f6d04(0x31f):ColorManager[_0x2f6d04(0x144)]();},Sprite_Gauge[_0x15a52d(0x21f)]['valueOutlineWidth']=function(){const _0x972d82=_0x15a52d;return VisuMZ[_0x972d82(0x397)][_0x972d82(0x3bc)]['Gauge'][_0x972d82(0x1c0)]||0x0;},VisuMZ['SkillsStatesCore'][_0x15a52d(0x156)]=Sprite_StateIcon[_0x15a52d(0x21f)][_0x15a52d(0x1a4)],Sprite_StateIcon['prototype'][_0x15a52d(0x1a4)]=function(){const _0x548b96=_0x15a52d;VisuMZ['SkillsStatesCore'][_0x548b96(0x156)][_0x548b96(0x2b6)](this),this[_0x548b96(0x182)]();},Sprite_StateIcon[_0x15a52d(0x21f)][_0x15a52d(0x182)]=function(){const _0x17c327=_0x15a52d,_0x625325=Window_Base['prototype'][_0x17c327(0x1f0)]();this[_0x17c327(0x30d)]=new Sprite(),this[_0x17c327(0x30d)][_0x17c327(0x306)]=new Bitmap(ImageManager[_0x17c327(0x3aa)],_0x625325),this[_0x17c327(0x30d)][_0x17c327(0x287)]['x']=this[_0x17c327(0x287)]['x'],this['_turnDisplaySprite'][_0x17c327(0x287)]['y']=this[_0x17c327(0x287)]['y'],this[_0x17c327(0x1d0)](this['_turnDisplaySprite']),this['contents']=this[_0x17c327(0x30d)]['bitmap'];},VisuMZ[_0x15a52d(0x397)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x15a52d(0x21f)]['updateFrame'],Sprite_StateIcon[_0x15a52d(0x21f)][_0x15a52d(0x250)]=function(){const _0x1a121d=_0x15a52d;VisuMZ[_0x1a121d(0x397)][_0x1a121d(0x1d2)][_0x1a121d(0x2b6)](this),this[_0x1a121d(0x136)]();},Sprite_StateIcon[_0x15a52d(0x21f)][_0x15a52d(0x32e)]=function(_0x13c139,_0x7af011,_0x198603,_0x5e6817,_0x1afc4e){const _0x220827=_0x15a52d;this[_0x220827(0x221)][_0x220827(0x32e)](_0x13c139,_0x7af011,_0x198603,_0x5e6817,this[_0x220827(0x221)][_0x220827(0x289)],_0x1afc4e);},Sprite_StateIcon['prototype']['updateTurnDisplaySprite']=function(){const _0x427249=_0x15a52d;this[_0x427249(0x125)](),this['contents'][_0x427249(0x2af)]();const _0x1dee0c=this[_0x427249(0x3e3)];if(!_0x1dee0c)return;const _0x25d561=_0x1dee0c['states']()[_0x427249(0x39e)](_0x1a26e7=>_0x1a26e7[_0x427249(0x2b3)]>0x0),_0x3008b6=[...Array(0x8)[_0x427249(0x212)]()][_0x427249(0x39e)](_0x41f0d9=>_0x1dee0c['buff'](_0x41f0d9)!==0x0),_0x34606e=this[_0x427249(0x2d2)],_0x437d3a=_0x25d561[_0x34606e];if(_0x437d3a)Window_Base[_0x427249(0x21f)]['drawActorStateTurns'][_0x427249(0x2b6)](this,_0x1dee0c,_0x437d3a,0x0,0x0),Window_Base[_0x427249(0x21f)][_0x427249(0x22e)][_0x427249(0x2b6)](this,_0x1dee0c,_0x437d3a,0x0,0x0);else{const _0x116d5d=_0x3008b6[_0x34606e-_0x25d561[_0x427249(0x17d)]];if(_0x116d5d===undefined)return;Window_Base[_0x427249(0x21f)][_0x427249(0x242)][_0x427249(0x2b6)](this,_0x1dee0c,_0x116d5d,0x0,0x0),Window_Base[_0x427249(0x21f)][_0x427249(0x359)][_0x427249(0x2b6)](this,_0x1dee0c,_0x116d5d,0x0,0x0);}},Sprite_StateIcon[_0x15a52d(0x21f)][_0x15a52d(0x125)]=function(){const _0xcd007a=_0x15a52d;this[_0xcd007a(0x221)][_0xcd007a(0x1ad)]=$gameSystem['mainFontFace'](),this[_0xcd007a(0x221)][_0xcd007a(0x1ff)]=$gameSystem[_0xcd007a(0x325)](),this[_0xcd007a(0x181)]();},Sprite_StateIcon[_0x15a52d(0x21f)][_0x15a52d(0x181)]=function(){const _0x10b6da=_0x15a52d;this[_0x10b6da(0x363)](ColorManager[_0x10b6da(0x29d)]()),this[_0x10b6da(0x368)](ColorManager[_0x10b6da(0x144)]());},Sprite_StateIcon['prototype'][_0x15a52d(0x363)]=function(_0x5ef6bf){const _0x3aad0e=_0x15a52d;this[_0x3aad0e(0x221)]['textColor']=_0x5ef6bf;},Sprite_StateIcon[_0x15a52d(0x21f)]['changeOutlineColor']=function(_0x25d38f){const _0x53ca51=_0x15a52d;this[_0x53ca51(0x221)][_0x53ca51(0x144)]=_0x25d38f;},Sprite_StateIcon['prototype'][_0x15a52d(0x35c)]=function(){const _0x263131=_0x15a52d;this['_hidden']=!![],this[_0x263131(0x152)]();},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x2c5)]=function(_0x3e0e9a,_0x55bc80,_0x2ff90a,_0x208d68,_0x387a8e){const _0x4b3a85=_0x15a52d,_0x464bc6=this[_0x4b3a85(0x133)](_0x3e0e9a,_0x55bc80),_0x546e04=this['textSizeEx'](_0x464bc6,_0x2ff90a,_0x208d68,_0x387a8e),_0xc85e97=_0x2ff90a+_0x387a8e-_0x546e04['width'];this[_0x4b3a85(0x204)](_0x464bc6,_0xc85e97,_0x208d68,_0x387a8e),this['resetFontSettings']();},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x133)]=function(_0x21ee35,_0x265ef1){const _0x2850f0=_0x15a52d;let _0x310284='';for(settings of VisuMZ[_0x2850f0(0x397)][_0x2850f0(0x3bc)][_0x2850f0(0x330)]){if(!this[_0x2850f0(0x208)](_0x21ee35,_0x265ef1,settings))continue;if(_0x310284[_0x2850f0(0x17d)]>0x0)_0x310284+=this[_0x2850f0(0x19b)]();_0x310284+=this[_0x2850f0(0x255)](_0x21ee35,_0x265ef1,settings);}_0x310284=this[_0x2850f0(0x12b)](_0x21ee35,_0x265ef1,_0x310284);if(_0x265ef1[_0x2850f0(0x2df)][_0x2850f0(0xed)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x310284['length']>0x0)_0x310284+=this[_0x2850f0(0x19b)]();_0x310284+=String(RegExp['$1']);}return _0x310284;},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x12b)]=function(_0x548f85,_0x53b37c,_0x491cff){return _0x491cff;},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x208)]=function(_0x33bedb,_0xb7d6f9,_0x2b3fd7){const _0x22eaee=_0x15a52d;let _0x451583=_0x2b3fd7[_0x22eaee(0x15e)][_0x22eaee(0x2b6)](_0x33bedb,_0xb7d6f9);return _0x451583=_0x33bedb[_0x22eaee(0x2e5)](_0xb7d6f9,_0x451583,_0x2b3fd7),_0x2b3fd7['ShowJS'][_0x22eaee(0x2b6)](_0x33bedb,_0xb7d6f9,_0x451583,_0x2b3fd7);},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x255)]=function(_0x421eea,_0x3c70cc,_0x3c5432){const _0x20178f=_0x15a52d;let _0x215259=_0x3c5432[_0x20178f(0x15e)][_0x20178f(0x2b6)](_0x421eea,_0x3c70cc);return _0x215259=_0x421eea[_0x20178f(0x2e5)](_0x3c70cc,_0x215259,_0x3c5432),_0x3c5432[_0x20178f(0x3d4)][_0x20178f(0x2b6)](_0x421eea,_0x3c70cc,_0x215259,_0x3c5432);},Window_Base['prototype'][_0x15a52d(0x19b)]=function(){return'\x20';},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x227)]=function(_0x653969,_0x5dc3f9,_0x1d52ee,_0x3e8864){const _0x36719f=_0x15a52d;if(!_0x653969)return;VisuMZ[_0x36719f(0x397)][_0x36719f(0x1da)][_0x36719f(0x2b6)](this,_0x653969,_0x5dc3f9,_0x1d52ee,_0x3e8864),this['drawActorIconsAllTurnCounters'](_0x653969,_0x5dc3f9,_0x1d52ee,_0x3e8864);},Window_Base['prototype']['drawActorIconsAllTurnCounters']=function(_0x816962,_0x141e2e,_0x3cff4e,_0x30a98c){const _0x12213f=_0x15a52d;_0x30a98c=_0x30a98c||0x90;const _0x513345=ImageManager['standardIconWidth']||0x20,_0x3ae824=ImageManager[_0x12213f(0x2f8)]||0x20,_0x1f2563=_0x513345,_0xc4133d=_0x816962[_0x12213f(0x2c0)]()['slice'](0x0,Math['floor'](_0x30a98c/_0x1f2563)),_0x1c7f26=_0x816962['states']()[_0x12213f(0x39e)](_0x4d41cd=>_0x4d41cd['iconIndex']>0x0),_0x4e9e4e=[...Array(0x8)[_0x12213f(0x212)]()][_0x12213f(0x39e)](_0x35f1e6=>_0x816962[_0x12213f(0x19c)](_0x35f1e6)!==0x0),_0x4f1d3a=[];let _0x41b484=_0x141e2e;for(let _0x1d0775=0x0;_0x1d0775<_0xc4133d[_0x12213f(0x17d)];_0x1d0775++){this[_0x12213f(0x125)]();const _0x1403a7=_0x1c7f26[_0x1d0775];if(_0x1403a7)!_0x4f1d3a[_0x12213f(0xf9)](_0x1403a7)&&this['drawActorStateTurns'](_0x816962,_0x1403a7,_0x41b484,_0x3cff4e),this[_0x12213f(0x22e)](_0x816962,_0x1403a7,_0x41b484,_0x3cff4e),_0x4f1d3a[_0x12213f(0x13f)](_0x1403a7);else{const _0x38dc0b=_0x4e9e4e[_0x1d0775-_0x1c7f26[_0x12213f(0x17d)]];this[_0x12213f(0x242)](_0x816962,_0x38dc0b,_0x41b484,_0x3cff4e),this[_0x12213f(0x359)](_0x816962,_0x38dc0b,_0x41b484,_0x3cff4e);}_0x41b484+=_0x1f2563;}},Window_Base['prototype'][_0x15a52d(0x401)]=function(_0x2766fa,_0x245dda,_0x1a2bdd,_0x914612){const _0x53364f=_0x15a52d;if(!VisuMZ[_0x53364f(0x397)][_0x53364f(0x3bc)]['States'][_0x53364f(0x33c)])return;if(!_0x2766fa['isStateAffected'](_0x245dda['id']))return;if(_0x245dda['autoRemovalTiming']===0x0)return;if(_0x245dda[_0x53364f(0x2df)][_0x53364f(0xed)](/<HIDE STATE TURNS>/i))return;const _0x5c9228=ImageManager[_0x53364f(0x201)]||0x20,_0x2b6593=_0x5c9228,_0x4ca1b7=_0x2766fa['stateTurns'](_0x245dda['id']),_0x6dcc79=ColorManager[_0x53364f(0x3cd)](_0x245dda);this[_0x53364f(0x363)](_0x6dcc79),this[_0x53364f(0x368)]('rgba(0,\x200,\x200,\x201)'),this['contents']['fontBold']=!![],this[_0x53364f(0x221)][_0x53364f(0x1ff)]=VisuMZ['SkillsStatesCore']['Settings']['States']['TurnFontSize'],_0x1a2bdd+=VisuMZ['SkillsStatesCore'][_0x53364f(0x3bc)][_0x53364f(0x211)]['TurnOffsetX'],_0x914612+=VisuMZ[_0x53364f(0x397)][_0x53364f(0x3bc)][_0x53364f(0x211)][_0x53364f(0x20c)],this['drawText'](_0x4ca1b7,_0x1a2bdd,_0x914612,_0x2b6593,'right'),this[_0x53364f(0x221)]['fontBold']=![],this[_0x53364f(0x125)]();},Window_Base[_0x15a52d(0x21f)]['drawActorStateData']=function(_0x5bd525,_0x39ba39,_0x4485b2,_0xc9546b){const _0xeb4ddb=_0x15a52d;if(!VisuMZ['SkillsStatesCore'][_0xeb4ddb(0x3bc)][_0xeb4ddb(0x211)][_0xeb4ddb(0x2eb)])return;const _0x4e6e98=ImageManager[_0xeb4ddb(0x201)]||0x20,_0x2a609d=ImageManager[_0xeb4ddb(0x2f8)]||0x20,_0x5cd888=_0x4e6e98,_0x33f2a3=_0x2a609d/0x2,_0x4be115=ColorManager['normalColor']();this['changeTextColor'](_0x4be115),this['changeOutlineColor'](_0xeb4ddb(0x31f)),this[_0xeb4ddb(0x221)][_0xeb4ddb(0x1ac)]=!![],this['contents']['fontSize']=VisuMZ['SkillsStatesCore'][_0xeb4ddb(0x3bc)][_0xeb4ddb(0x211)][_0xeb4ddb(0x36d)],_0x4485b2+=VisuMZ[_0xeb4ddb(0x397)][_0xeb4ddb(0x3bc)][_0xeb4ddb(0x211)][_0xeb4ddb(0x1b9)],_0xc9546b+=VisuMZ[_0xeb4ddb(0x397)][_0xeb4ddb(0x3bc)]['States'][_0xeb4ddb(0x337)];const _0x271004=String(_0x5bd525[_0xeb4ddb(0x235)](_0x39ba39['id']));this[_0xeb4ddb(0x32e)](_0x271004,_0x4485b2,_0xc9546b,_0x5cd888,_0xeb4ddb(0x312)),this[_0xeb4ddb(0x221)][_0xeb4ddb(0x1ac)]=![],this[_0xeb4ddb(0x125)]();},Window_Base[_0x15a52d(0x21f)]['drawActorBuffTurns']=function(_0x4667e9,_0x5bb2d2,_0x7de8b2,_0x45b274){const _0x3775a9=_0x15a52d;if(!VisuMZ['SkillsStatesCore'][_0x3775a9(0x3bc)][_0x3775a9(0x35b)][_0x3775a9(0x33c)])return;const _0x16e1a9=_0x4667e9[_0x3775a9(0x19c)](_0x5bb2d2);if(_0x16e1a9===0x0)return;const _0x2885a8=_0x4667e9['buffTurns'](_0x5bb2d2),_0x359e9c=ImageManager[_0x3775a9(0x3aa)],_0x1e3f37=_0x16e1a9>0x0?ColorManager[_0x3775a9(0x263)]():ColorManager[_0x3775a9(0x3af)]();this[_0x3775a9(0x363)](_0x1e3f37),this[_0x3775a9(0x368)]('rgba(0,\x200,\x200,\x201)'),this['contents']['fontBold']=!![],this[_0x3775a9(0x221)][_0x3775a9(0x1ff)]=VisuMZ[_0x3775a9(0x397)]['Settings'][_0x3775a9(0x35b)][_0x3775a9(0x2a6)],_0x7de8b2+=VisuMZ[_0x3775a9(0x397)][_0x3775a9(0x3bc)][_0x3775a9(0x35b)][_0x3775a9(0x351)],_0x45b274+=VisuMZ[_0x3775a9(0x397)]['Settings'][_0x3775a9(0x35b)]['TurnOffsetY'],this[_0x3775a9(0x32e)](_0x2885a8,_0x7de8b2,_0x45b274,_0x359e9c,_0x3775a9(0x338)),this['contents'][_0x3775a9(0x1ac)]=![],this['resetFontSettings']();},Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x359)]=function(_0x767f61,_0x35b858,_0x244f73,_0x47b4dc){const _0x239408=_0x15a52d;if(!VisuMZ[_0x239408(0x397)][_0x239408(0x3bc)][_0x239408(0x35b)][_0x239408(0x2eb)])return;const _0x220c41=_0x767f61['paramBuffRate'](_0x35b858),_0x313995=_0x767f61[_0x239408(0x19c)](_0x35b858),_0x844707=ImageManager['standardIconWidth']||0x20,_0x9b1f69=ImageManager[_0x239408(0x2f8)]||0x20,_0xed91d3=_0x844707,_0x4fadb2=_0x9b1f69/0x2,_0x34f92f=_0x313995>0x0?ColorManager[_0x239408(0x263)]():ColorManager[_0x239408(0x3af)]();this[_0x239408(0x363)](_0x34f92f),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x239408(0x221)][_0x239408(0x1ac)]=!![],this['contents'][_0x239408(0x1ff)]=VisuMZ[_0x239408(0x397)][_0x239408(0x3bc)][_0x239408(0x35b)]['DataFontSize'],_0x244f73+=VisuMZ['SkillsStatesCore'][_0x239408(0x3bc)][_0x239408(0x35b)][_0x239408(0x1b9)],_0x47b4dc+=VisuMZ[_0x239408(0x397)][_0x239408(0x3bc)]['Buffs']['DataOffsetY'];const _0x1f37ad='%1%'[_0x239408(0x25f)](Math['round'](_0x220c41*0x64));this[_0x239408(0x32e)](_0x1f37ad,_0x244f73,_0x47b4dc,_0xed91d3,_0x239408(0x312)),this[_0x239408(0x221)][_0x239408(0x1ac)]=![],this[_0x239408(0x125)]();},VisuMZ['SkillsStatesCore']['Window_Base_changeTextColor']=Window_Base['prototype']['changeTextColor'],Window_Base[_0x15a52d(0x21f)]['changeTextColor']=function(_0x528395){const _0x5543a8=_0x15a52d;this[_0x5543a8(0x24b)]&&(_0x528395=ColorManager['getColor'](VisuMZ[_0x5543a8(0x397)]['Settings'][_0x5543a8(0x15b)][_0x5543a8(0x3f7)]??0x0)),VisuMZ['SkillsStatesCore'][_0x5543a8(0x1aa)][_0x5543a8(0x2b6)](this,_0x528395);},VisuMZ[_0x15a52d(0x397)]['Window_Base_drawText']=Window_Base[_0x15a52d(0x21f)]['drawText'],Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x32e)]=function(_0x4e14db,_0x3fe659,_0x27f5d3,_0x45418e,_0x33d608){const _0x30aa0f=_0x15a52d;VisuMZ[_0x30aa0f(0x397)][_0x30aa0f(0x114)]['call'](this,_0x4e14db,_0x3fe659,_0x27f5d3,_0x45418e,_0x33d608),this[_0x30aa0f(0x24b)]=undefined;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x35a)]=Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x133)],Window_Base[_0x15a52d(0x21f)][_0x15a52d(0x133)]=function(_0x3b8e90,_0xecb386){const _0x5164a1=_0x15a52d;let _0x542fbf=VisuMZ[_0x5164a1(0x397)][_0x5164a1(0x35a)]['call'](this,_0x3b8e90,_0xecb386);;return DataManager[_0x5164a1(0x2e9)](_0xecb386)&&_0x3b8e90&&(_0x3b8e90[_0x5164a1(0x2e4)](_0xecb386)?_0x542fbf=TextManager[_0x5164a1(0x3cb)]??_0x5164a1(0x1e6):(TextManager[_0x5164a1(0x392)]===_0x5164a1(0x3dc)?_0x542fbf=(TextManager[_0x5164a1(0x339)]??'[OFF]')+this['skillCostSeparator']()+_0x542fbf:_0x542fbf=_0x542fbf+this['skillCostSeparator']()+(TextManager[_0x5164a1(0x339)]??'[OFF]'),_0x542fbf=_0x542fbf[_0x5164a1(0xe8)]())),_0x542fbf;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x343)]=Window_StatusBase[_0x15a52d(0x21f)][_0x15a52d(0x24a)],Window_StatusBase[_0x15a52d(0x21f)][_0x15a52d(0x24a)]=function(_0x247631,_0x490d22,_0x53ea91,_0x1423bd){const _0x5b7cfb=_0x15a52d;if(_0x247631[_0x5b7cfb(0x2f1)]())_0x490d22=this[_0x5b7cfb(0x22b)](_0x247631,_0x490d22);this['placeExactGauge'](_0x247631,_0x490d22,_0x53ea91,_0x1423bd);},Window_StatusBase['prototype'][_0x15a52d(0x1d1)]=function(_0x52ac01,_0x1620e9,_0x4aeab9,_0x36e8eb){const _0x352b36=_0x15a52d;if([_0x352b36(0x111),_0x352b36(0x217)][_0x352b36(0xf9)](_0x1620e9[_0x352b36(0x36f)]()))return;VisuMZ['SkillsStatesCore'][_0x352b36(0x343)]['call'](this,_0x52ac01,_0x1620e9,_0x4aeab9,_0x36e8eb);},Window_StatusBase[_0x15a52d(0x21f)][_0x15a52d(0x22b)]=function(_0x4dff52,_0x10d24b){const _0xa1691b=_0x15a52d,_0x539730=_0x4dff52['currentClass']()['note'];if(_0x10d24b==='hp'&&_0x539730[_0xa1691b(0xed)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x10d24b==='mp'&&_0x539730[_0xa1691b(0xed)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else return _0x10d24b==='tp'&&_0x539730['match'](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0x10d24b;}},VisuMZ[_0x15a52d(0x397)]['Window_StatusBase_drawActorIcons']=Window_StatusBase[_0x15a52d(0x21f)][_0x15a52d(0x227)],Window_StatusBase[_0x15a52d(0x21f)][_0x15a52d(0x227)]=function(_0x2a7b5f,_0x2eb4e5,_0x423b60,_0x47bcb0){const _0xfa462e=_0x15a52d;if(!_0x2a7b5f)return;Window_Base[_0xfa462e(0x21f)]['drawActorIcons'][_0xfa462e(0x2b6)](this,_0x2a7b5f,_0x2eb4e5,_0x423b60,_0x47bcb0);},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x38c)]=Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x10f)],Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x10f)]=function(_0x32d6d0){const _0x425eec=_0x15a52d;VisuMZ[_0x425eec(0x397)][_0x425eec(0x38c)][_0x425eec(0x2b6)](this,_0x32d6d0),this[_0x425eec(0x3bf)](_0x32d6d0);},Window_SkillType[_0x15a52d(0x21f)]['createCommandNameWindow']=function(_0x218d1a){const _0x2748f8=_0x15a52d,_0x5ae69b=new Rectangle(0x0,0x0,_0x218d1a[_0x2748f8(0x2fe)],_0x218d1a[_0x2748f8(0x289)]);this['_commandNameWindow']=new Window_Base(_0x5ae69b),this['_commandNameWindow']['opacity']=0x0,this[_0x2748f8(0x1d0)](this[_0x2748f8(0x384)]),this['updateCommandNameWindow']();},Window_SkillType[_0x15a52d(0x21f)]['callUpdateHelp']=function(){const _0x28bc86=_0x15a52d;Window_Command[_0x28bc86(0x21f)][_0x28bc86(0x10c)][_0x28bc86(0x2b6)](this);if(this[_0x28bc86(0x384)])this[_0x28bc86(0x120)]();},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x120)]=function(){const _0x4f338e=_0x15a52d,_0x5acfa6=this[_0x4f338e(0x384)];_0x5acfa6[_0x4f338e(0x221)][_0x4f338e(0x2af)]();const _0x281814=this['commandStyleCheck'](this[_0x4f338e(0x158)]());if(_0x281814===_0x4f338e(0xf6)&&this[_0x4f338e(0x226)]()>0x0){const _0x122c3e=this[_0x4f338e(0xf2)](this[_0x4f338e(0x158)]());let _0x581a50=this[_0x4f338e(0x214)](this[_0x4f338e(0x158)]());_0x581a50=_0x581a50['replace'](/\\I\[(\d+)\]/gi,''),_0x5acfa6[_0x4f338e(0x125)](),this['commandNameWindowDrawBackground'](_0x581a50,_0x122c3e),this[_0x4f338e(0x3ae)](_0x581a50,_0x122c3e),this[_0x4f338e(0x130)](_0x581a50,_0x122c3e);}},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x171)]=function(_0x661693,_0x2821f0){},Window_SkillType['prototype']['commandNameWindowDrawText']=function(_0x2c231e,_0xaf07b9){const _0x52fa55=_0x15a52d,_0x13145d=this[_0x52fa55(0x384)];_0x13145d[_0x52fa55(0x32e)](_0x2c231e,0x0,_0xaf07b9['y'],_0x13145d[_0x52fa55(0x38b)],_0x52fa55(0x312));},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x130)]=function(_0x45d0fb,_0x2061f2){const _0x399cdc=_0x15a52d,_0x474347=this['_commandNameWindow'],_0x468f40=$gameSystem[_0x399cdc(0x3d0)](),_0x2eae9c=_0x2061f2['x']+Math[_0x399cdc(0x2d1)](_0x2061f2['width']/0x2)+_0x468f40;_0x474347['x']=_0x474347[_0x399cdc(0x2fe)]/-0x2+_0x2eae9c,_0x474347['y']=Math[_0x399cdc(0x2d1)](_0x2061f2[_0x399cdc(0x289)]/0x2);},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x168)]=function(){const _0x2743f9=_0x15a52d;return Imported['VisuMZ_0_CoreEngine']&&Window_Command['prototype'][_0x2743f9(0x168)][_0x2743f9(0x2b6)](this);},Window_SkillType[_0x15a52d(0x21f)]['makeCommandList']=function(){const _0xbeaf4d=_0x15a52d;if(!this[_0xbeaf4d(0x10e)])return;const _0x5e2620=this[_0xbeaf4d(0x10e)][_0xbeaf4d(0x273)]();for(const _0x22de84 of _0x5e2620){const _0xcc1274=this[_0xbeaf4d(0x362)](_0x22de84);this[_0xbeaf4d(0x308)](_0xcc1274,_0xbeaf4d(0x22c),!![],_0x22de84);}},Window_SkillType['prototype'][_0x15a52d(0x362)]=function(_0x3cd9fd){const _0x2ef43c=_0x15a52d;let _0x18e6f3=$dataSystem[_0x2ef43c(0x273)][_0x3cd9fd];if(_0x18e6f3[_0x2ef43c(0xed)](/\\I\[(\d+)\]/i))return _0x18e6f3;if(this[_0x2ef43c(0x39b)]()==='text')return _0x18e6f3;const _0x57b035=VisuMZ[_0x2ef43c(0x397)][_0x2ef43c(0x3bc)][_0x2ef43c(0x131)],_0x43020b=$dataSystem[_0x2ef43c(0x295)]['includes'](_0x3cd9fd),_0x39f050=_0x43020b?_0x57b035[_0x2ef43c(0x310)]:_0x57b035['IconStypeNorm'];return'\x5cI[%1]%2'[_0x2ef43c(0x25f)](_0x39f050,_0x18e6f3);},Window_SkillType[_0x15a52d(0x21f)]['itemTextAlign']=function(){const _0x226619=_0x15a52d;return VisuMZ[_0x226619(0x397)][_0x226619(0x3bc)]['Skills'][_0x226619(0x132)];},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x33a)]=function(_0x3a890c){const _0x46e73a=_0x15a52d,_0x6ce4fe=this[_0x46e73a(0x192)](_0x3a890c);if(_0x6ce4fe===_0x46e73a(0x213))this[_0x46e73a(0x172)](_0x3a890c);else _0x6ce4fe===_0x46e73a(0xf6)?this[_0x46e73a(0x189)](_0x3a890c):Window_Command[_0x46e73a(0x21f)][_0x46e73a(0x33a)]['call'](this,_0x3a890c);},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x39b)]=function(){const _0x181e07=_0x15a52d;return VisuMZ[_0x181e07(0x397)][_0x181e07(0x3bc)][_0x181e07(0x131)][_0x181e07(0x2d0)];},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x192)]=function(_0x5ee782){const _0x2d6ef1=_0x15a52d;if(_0x5ee782<0x0)return'text';const _0x4b9c02=this[_0x2d6ef1(0x39b)]();if(_0x4b9c02!==_0x2d6ef1(0x205))return _0x4b9c02;else{if(this[_0x2d6ef1(0x226)]()>0x0){const _0x40dd7d=this[_0x2d6ef1(0x214)](_0x5ee782);if(_0x40dd7d[_0x2d6ef1(0xed)](/\\I\[(\d+)\]/i)){const _0x2a454a=this[_0x2d6ef1(0xf2)](_0x5ee782),_0x438c06=this[_0x2d6ef1(0x3ff)](_0x40dd7d)[_0x2d6ef1(0x2fe)];return _0x438c06<=_0x2a454a[_0x2d6ef1(0x2fe)]?_0x2d6ef1(0x213):_0x2d6ef1(0xf6);}}}return _0x2d6ef1(0x1b5);},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x172)]=function(_0x4adb8a){const _0x42721c=_0x15a52d,_0x2a9fd7=this[_0x42721c(0xf2)](_0x4adb8a),_0x2bc1b0=this[_0x42721c(0x214)](_0x4adb8a),_0x278a9e=this[_0x42721c(0x3ff)](_0x2bc1b0)['width'];this[_0x42721c(0x134)](this['isCommandEnabled'](_0x4adb8a));const _0x22c03f=this[_0x42721c(0x11a)]();if(_0x22c03f==='right')this['drawTextEx'](_0x2bc1b0,_0x2a9fd7['x']+_0x2a9fd7[_0x42721c(0x2fe)]-_0x278a9e,_0x2a9fd7['y'],_0x278a9e);else{if(_0x22c03f===_0x42721c(0x312)){const _0x556ba2=_0x2a9fd7['x']+Math[_0x42721c(0x2d1)]((_0x2a9fd7['width']-_0x278a9e)/0x2);this['drawTextEx'](_0x2bc1b0,_0x556ba2,_0x2a9fd7['y'],_0x278a9e);}else this[_0x42721c(0x204)](_0x2bc1b0,_0x2a9fd7['x'],_0x2a9fd7['y'],_0x278a9e);}},Window_SkillType[_0x15a52d(0x21f)][_0x15a52d(0x189)]=function(_0x5dbddd){const _0x146ee6=_0x15a52d;this[_0x146ee6(0x214)](_0x5dbddd)[_0x146ee6(0xed)](/\\I\[(\d+)\]/i);const _0x23129d=Number(RegExp['$1'])||0x0,_0x4b19c1=this['itemLineRect'](_0x5dbddd),_0x3cc4f7=_0x4b19c1['x']+Math[_0x146ee6(0x2d1)]((_0x4b19c1[_0x146ee6(0x2fe)]-ImageManager[_0x146ee6(0x3aa)])/0x2),_0x1f8a0f=_0x4b19c1['y']+(_0x4b19c1['height']-ImageManager[_0x146ee6(0x2e6)])/0x2;this['drawIcon'](_0x23129d,_0x3cc4f7,_0x1f8a0f);},VisuMZ[_0x15a52d(0x397)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x15a52d(0x21f)][_0x15a52d(0x309)],Window_SkillStatus[_0x15a52d(0x21f)][_0x15a52d(0x309)]=function(){const _0x1eef0f=_0x15a52d;VisuMZ[_0x1eef0f(0x397)][_0x1eef0f(0x2ad)][_0x1eef0f(0x2b6)](this);if(this[_0x1eef0f(0x10e)])this['drawExtendedSkillsStatesCoreStatus']();},Window_SkillStatus[_0x15a52d(0x21f)]['drawExtendedSkillsStatesCoreStatus']=function(){const _0x4d2410=_0x15a52d;if(!Imported[_0x4d2410(0x3e0)])return;if(!Imported[_0x4d2410(0x251)])return;const _0x39740c=this[_0x4d2410(0x1bb)]();let _0x515240=this[_0x4d2410(0x246)]()/0x2+0xb4+0xb4+0xb4,_0x943439=this['innerWidth']-_0x515240-0x2;if(_0x943439>=0x12c){const _0x4199cb=VisuMZ['CoreEngine'][_0x4d2410(0x3bc)]['Param'][_0x4d2410(0x225)],_0x14daeb=Math[_0x4d2410(0x2d1)](_0x943439/0x2)-0x18;let _0x4ae0d3=_0x515240,_0x4b4f45=Math[_0x4d2410(0x2d1)]((this[_0x4d2410(0x314)]-Math[_0x4d2410(0x2c4)](_0x4199cb[_0x4d2410(0x17d)]/0x2)*_0x39740c)/0x2),_0x54df7a=0x0;for(const _0x34fda4 of _0x4199cb){this[_0x4d2410(0x2ab)](_0x4ae0d3,_0x4b4f45,_0x14daeb,_0x34fda4),_0x54df7a++,_0x54df7a%0x2===0x0?(_0x4ae0d3=_0x515240,_0x4b4f45+=_0x39740c):_0x4ae0d3+=_0x14daeb+0x18;}}this['resetFontSettings']();},Window_SkillStatus[_0x15a52d(0x21f)][_0x15a52d(0x2ab)]=function(_0x5af1e8,_0x564a0b,_0x338ec6,_0x4877c9){const _0x593b7d=_0x15a52d,_0xdea62b=this[_0x593b7d(0x1bb)]();this[_0x593b7d(0x125)](),this[_0x593b7d(0x1d6)](_0x5af1e8,_0x564a0b,_0x338ec6,_0x4877c9,!![]),this[_0x593b7d(0x181)](),this[_0x593b7d(0x221)][_0x593b7d(0x1ff)]-=0x8;const _0x2e0b36=this[_0x593b7d(0x10e)][_0x593b7d(0x12f)](_0x4877c9,!![]);this[_0x593b7d(0x221)][_0x593b7d(0x32e)](_0x2e0b36,_0x5af1e8,_0x564a0b,_0x338ec6,_0xdea62b,'right');},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x1e9)]=Window_SkillList['prototype'][_0x15a52d(0xf9)],Window_SkillList['prototype'][_0x15a52d(0xf9)]=function(_0x1ea4df){const _0x15d349=_0x15a52d;if(this[_0x15d349(0x160)]<=0x0)return![];return this[_0x15d349(0x32d)](_0x1ea4df);},VisuMZ['SkillsStatesCore']['Window_SkillList_maxCols']=Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x1eb)],Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x1eb)]=function(){const _0x2e8da1=_0x15a52d;return SceneManager[_0x2e8da1(0x335)]['constructor']===Scene_Battle?VisuMZ[_0x2e8da1(0x397)][_0x2e8da1(0x31d)][_0x2e8da1(0x2b6)](this):VisuMZ[_0x2e8da1(0x397)]['Settings'][_0x2e8da1(0x131)]['ListWindowCols'];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x3a7)]=Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x272)],Window_SkillList['prototype'][_0x15a52d(0x272)]=function(_0x5839df){const _0x5d483c=_0x15a52d,_0x513b26=this[_0x5d483c(0x10e)]!==_0x5839df;VisuMZ[_0x5d483c(0x397)][_0x5d483c(0x3a7)][_0x5d483c(0x2b6)](this,_0x5839df),_0x513b26&&(this[_0x5d483c(0x21a)]&&this[_0x5d483c(0x21a)][_0x5d483c(0x140)]===Window_ShopStatus&&this['_statusWindow'][_0x5d483c(0x122)](this[_0x5d483c(0x291)](0x0)));},Window_SkillList[_0x15a52d(0x21f)]['setStypeId']=function(_0x16dba8){const _0x408ec8=_0x15a52d;if(this[_0x408ec8(0x160)]===_0x16dba8)return;if(!_0x16dba8)return;this['_stypeId']=_0x16dba8,this[_0x408ec8(0x309)](),this[_0x408ec8(0x1f2)](0x0,0x0),this['_statusWindow']&&this[_0x408ec8(0x21a)][_0x408ec8(0x140)]===Window_ShopStatus&&this[_0x408ec8(0x21a)]['setItem'](this['itemAt'](0x0));},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x32d)]=function(_0x312bb1){const _0xf684d3=_0x15a52d;if(!_0x312bb1)return VisuMZ[_0xf684d3(0x397)][_0xf684d3(0x1e9)][_0xf684d3(0x2b6)](this,_0x312bb1);if(!this[_0xf684d3(0x2b4)](_0x312bb1))return![];if(!this[_0xf684d3(0x20b)](_0x312bb1))return![];if(!this[_0xf684d3(0x170)](_0x312bb1))return![];return!![];},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x2b4)]=function(_0x39c696){const _0x4a31da=_0x15a52d;return DataManager['getSkillTypes'](_0x39c696)[_0x4a31da(0xf9)](this[_0x4a31da(0x160)]);},Window_SkillList['prototype'][_0x15a52d(0x20b)]=function(_0x7e039a){const _0x13ea96=_0x15a52d;if(!VisuMZ['SkillsStatesCore'][_0x13ea96(0x240)](this[_0x13ea96(0x10e)],_0x7e039a))return![];if(!VisuMZ['SkillsStatesCore'][_0x13ea96(0x353)](this[_0x13ea96(0x10e)],_0x7e039a))return![];if(!VisuMZ[_0x13ea96(0x397)][_0x13ea96(0x1f6)](this[_0x13ea96(0x10e)],_0x7e039a))return![];return!![];},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x240)]=function(_0x2e2e03,_0x272cb5){const _0x20b1c1=_0x15a52d,_0xab64d6=_0x272cb5[_0x20b1c1(0x2df)];if(_0xab64d6[_0x20b1c1(0xed)](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']())return![];else return _0xab64d6['match'](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x20b1c1(0xeb)]()?![]:!![];},VisuMZ['SkillsStatesCore']['CheckVisibleSwitchNotetags']=function(_0x43f64c,_0x442a25){const _0x5e039b=_0x15a52d,_0x57fd41=_0x442a25[_0x5e039b(0x2df)];if(_0x57fd41['match'](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bd3cd=JSON[_0x5e039b(0x3ef)]('['+RegExp['$1'][_0x5e039b(0xed)](/\d+/g)+']');for(const _0xff41c1 of _0x3bd3cd){if(!$gameSwitches['value'](_0xff41c1))return![];}return!![];}if(_0x57fd41[_0x5e039b(0xed)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2f3b88=JSON[_0x5e039b(0x3ef)]('['+RegExp['$1'][_0x5e039b(0xed)](/\d+/g)+']');for(const _0x68378 of _0x2f3b88){if(!$gameSwitches[_0x5e039b(0x18b)](_0x68378))return![];}return!![];}if(_0x57fd41[_0x5e039b(0xed)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f70cc=JSON[_0x5e039b(0x3ef)]('['+RegExp['$1'][_0x5e039b(0xed)](/\d+/g)+']');for(const _0x244a3f of _0x3f70cc){if($gameSwitches[_0x5e039b(0x18b)](_0x244a3f))return!![];}return![];}if(_0x57fd41[_0x5e039b(0xed)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41de6a=JSON[_0x5e039b(0x3ef)]('['+RegExp['$1'][_0x5e039b(0xed)](/\d+/g)+']');for(const _0x188cc4 of _0x41de6a){if(!$gameSwitches[_0x5e039b(0x18b)](_0x188cc4))return!![];}return![];}if(_0x57fd41[_0x5e039b(0xed)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3bf135=JSON[_0x5e039b(0x3ef)]('['+RegExp['$1'][_0x5e039b(0xed)](/\d+/g)+']');for(const _0x1fbe79 of _0x3bf135){if(!$gameSwitches[_0x5e039b(0x18b)](_0x1fbe79))return!![];}return![];}if(_0x57fd41[_0x5e039b(0xed)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e0b63=JSON[_0x5e039b(0x3ef)]('['+RegExp['$1'][_0x5e039b(0xed)](/\d+/g)+']');for(const _0x4aafaa of _0x3e0b63){if($gameSwitches[_0x5e039b(0x18b)](_0x4aafaa))return![];}return!![];}return!![];},VisuMZ[_0x15a52d(0x397)]['CheckVisibleSkillNotetags']=function(_0x4c3217,_0x46ef46){const _0x565cce=_0x15a52d,_0x2678a2=_0x46ef46['note'];if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5001ad=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x17a739 of _0x5001ad){if(!_0x4c3217[_0x565cce(0xe0)](_0x17a739))return![];}return!![];}else{if(_0x2678a2['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2be4b7=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x7a2a35 of _0x2be4b7){const _0x6d61ba=DataManager['getSkillIdWithName'](_0x7a2a35);if(!_0x6d61ba)continue;if(!_0x4c3217[_0x565cce(0xe0)](_0x6d61ba))return![];}return!![];}}if(_0x2678a2['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3b678f=JSON['parse']('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x41da3c of _0x3b678f){if(!_0x4c3217[_0x565cce(0xe0)](_0x41da3c))return![];}return!![];}else{if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x48d513=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x32e11f of _0x48d513){const _0x2c6aa6=DataManager['getSkillIdWithName'](_0x32e11f);if(!_0x2c6aa6)continue;if(!_0x4c3217[_0x565cce(0xe0)](_0x2c6aa6))return![];}return!![];}}if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3e267a=JSON[_0x565cce(0x3ef)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x329747 of _0x3e267a){if(_0x4c3217[_0x565cce(0xe0)](_0x329747))return!![];}return![];}else{if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5e4b3c=RegExp['$1']['split'](',');for(const _0x1a5fa0 of _0x5e4b3c){const _0x3a08bc=DataManager[_0x565cce(0x2e1)](_0x1a5fa0);if(!_0x3a08bc)continue;if(_0x4c3217['isLearnedSkill'](_0x3a08bc))return!![];}return![];}}if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3277d2=JSON['parse']('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x348c3b of _0x3277d2){if(!_0x4c3217[_0x565cce(0xe0)](_0x348c3b))return!![];}return![];}else{if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x4431d1=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x3185dd of _0x4431d1){const _0x151136=DataManager[_0x565cce(0x2e1)](_0x3185dd);if(!_0x151136)continue;if(!_0x4c3217['isLearnedSkill'](_0x151136))return!![];}return![];}}if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5a523c=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x213b4e of _0x5a523c){if(!_0x4c3217[_0x565cce(0xe0)](_0x213b4e))return!![];}return![];}else{if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x915262=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x31b8fd of _0x915262){const _0x461fc0=DataManager['getSkillIdWithName'](_0x31b8fd);if(!_0x461fc0)continue;if(!_0x4c3217[_0x565cce(0xe0)](_0x461fc0))return!![];}return![];}}if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4a3069=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x542050 of _0x4a3069){if(_0x4c3217[_0x565cce(0xe0)](_0x542050))return![];}return!![];}else{if(_0x2678a2['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x23f85c=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x4ef59a of _0x23f85c){const _0x28bb60=DataManager[_0x565cce(0x2e1)](_0x4ef59a);if(!_0x28bb60)continue;if(_0x4c3217['isLearnedSkill'](_0x28bb60))return![];}return!![];}}if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e2e82=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0xe34fe6 of _0x2e2e82){if(!_0x4c3217[_0x565cce(0x244)](_0xe34fe6))return![];}return!![];}else{if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1d980d=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0xe990e1 of _0x1d980d){const _0x4b92d4=DataManager[_0x565cce(0x2e1)](_0xe990e1);if(!_0x4b92d4)continue;if(!_0x4c3217['hasSkill'](_0x4b92d4))return![];}return!![];}}if(_0x2678a2['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4729f6=JSON['parse']('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x4314b0 of _0x4729f6){if(!_0x4c3217[_0x565cce(0x244)](_0x4314b0))return![];}return!![];}else{if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3d6107=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x289c00 of _0x3d6107){const _0x89b4de=DataManager[_0x565cce(0x2e1)](_0x289c00);if(!_0x89b4de)continue;if(!_0x4c3217['hasSkill'](_0x89b4de))return![];}return!![];}}if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x40326a=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x326ea9 of _0x40326a){if(_0x4c3217[_0x565cce(0x244)](_0x326ea9))return!![];}return![];}else{if(_0x2678a2[_0x565cce(0xed)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x54b8cb=RegExp['$1']['split'](',');for(const _0xb0385d of _0x54b8cb){const _0x331b45=DataManager['getSkillIdWithName'](_0xb0385d);if(!_0x331b45)continue;if(_0x4c3217['hasSkill'](_0x331b45))return!![];}return![];}}if(_0x2678a2['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x895b89=JSON[_0x565cce(0x3ef)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5af5da of _0x895b89){if(!_0x4c3217[_0x565cce(0x244)](_0x5af5da))return!![];}return![];}else{if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x3c1647=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x33a33b of _0x3c1647){const _0x538a7a=DataManager['getSkillIdWithName'](_0x33a33b);if(!_0x538a7a)continue;if(!_0x4c3217[_0x565cce(0x244)](_0x538a7a))return!![];}return![];}}if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x11810e=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x516ba8 of _0x11810e){if(!_0x4c3217[_0x565cce(0x244)](_0x516ba8))return!![];}return![];}else{if(_0x2678a2['match'](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x2d733e=RegExp['$1'][_0x565cce(0x23f)](',');for(const _0x374a7c of _0x2d733e){const _0x22920e=DataManager[_0x565cce(0x2e1)](_0x374a7c);if(!_0x22920e)continue;if(!_0x4c3217['hasSkill'](_0x22920e))return!![];}return![];}}if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30fb6f=JSON[_0x565cce(0x3ef)]('['+RegExp['$1'][_0x565cce(0xed)](/\d+/g)+']');for(const _0x4e8185 of _0x30fb6f){if(_0x4c3217['hasSkill'](_0x4e8185))return![];}return!![];}else{if(_0x2678a2[_0x565cce(0xed)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x269e14=RegExp['$1']['split'](',');for(const _0x4bae18 of _0x269e14){const _0x2c42b3=DataManager['getSkillIdWithName'](_0x4bae18);if(!_0x2c42b3)continue;if(_0x4c3217['hasSkill'](_0x2c42b3))return![];}return!![];}}return!![];},Window_SkillList['prototype'][_0x15a52d(0x170)]=function(_0x497a2d){const _0x21a7e7=_0x15a52d,_0x2a8deb=_0x497a2d[_0x21a7e7(0x2df)],_0x110c14=VisuMZ[_0x21a7e7(0x397)][_0x21a7e7(0x2bf)];return _0x110c14[_0x497a2d['id']]?_0x110c14[_0x497a2d['id']]['call'](this,_0x497a2d):!![];},VisuMZ['SkillsStatesCore']['Window_SkillList_makeItemList']=Window_SkillList[_0x15a52d(0x21f)]['makeItemList'],Window_SkillList['prototype'][_0x15a52d(0x1be)]=function(){const _0x560aa8=_0x15a52d;VisuMZ[_0x560aa8(0x397)][_0x560aa8(0x1cc)][_0x560aa8(0x2b6)](this),this['canSortSkillTypeList']()&&this[_0x560aa8(0x3da)](),this['canChangeSkillsThroughStateEffects']()&&this[_0x560aa8(0x169)]();},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x278)]=function(){return!![];},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x3da)]=function(){const _0x3d22a7=_0x15a52d,_0x5204e1=VisuMZ[_0x3d22a7(0x397)][_0x3d22a7(0x3bc)][_0x3d22a7(0x131)]['SortSkillTypesAbc']||[];return _0x5204e1&&_0x5204e1[_0x3d22a7(0xf9)](this['_stypeId'])?this['_data'][_0x3d22a7(0x110)]((_0x32b18f,_0x1912f8)=>{const _0x492e5d=_0x3d22a7;if(!!_0x32b18f&&!!_0x1912f8)return _0x32b18f[_0x492e5d(0x3df)][_0x492e5d(0x1db)](_0x1912f8[_0x492e5d(0x3df)]);return 0x0;}):VisuMZ['SkillsStatesCore'][_0x3d22a7(0x3c7)](this[_0x3d22a7(0x3a3)]),this['_data'];},VisuMZ['SkillsStatesCore'][_0x15a52d(0x3c7)]=function(_0x1c89e8){const _0x1719e0=_0x15a52d;return _0x1c89e8[_0x1719e0(0x110)]((_0x227f92,_0x5b9a9e)=>{const _0x35b8ae=_0x1719e0;if(!!_0x227f92&&!!_0x5b9a9e){if(_0x227f92[_0x35b8ae(0x3a0)]===undefined)VisuMZ[_0x35b8ae(0x397)][_0x35b8ae(0x2da)](_0x227f92);if(_0x5b9a9e[_0x35b8ae(0x3a0)]===undefined)VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Sorting'](_0x5b9a9e);const _0x173aaa=_0x227f92[_0x35b8ae(0x3a0)],_0x30e32c=_0x5b9a9e['sortPriority'];if(_0x173aaa!==_0x30e32c)return _0x30e32c-_0x173aaa;return _0x227f92['id']-_0x5b9a9e['id'];}return 0x0;}),_0x1c89e8;},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x2d7)]=function(_0x1e9b19){const _0x6f1e24=_0x15a52d;return _0x1e9b19[_0x6f1e24(0x110)]((_0x1c4f47,_0x2a3fe2)=>{const _0x4560bd=_0x6f1e24,_0x274fdd=$dataSkills[_0x1c4f47],_0x157afd=$dataSkills[_0x2a3fe2];if(!!_0x274fdd&&!!_0x157afd){if(_0x274fdd['sortPriority']===undefined)VisuMZ[_0x4560bd(0x397)][_0x4560bd(0x2da)](_0x274fdd);if(_0x157afd[_0x4560bd(0x3a0)]===undefined)VisuMZ[_0x4560bd(0x397)]['Parse_Notetags_Skill_Sorting'](_0x157afd);const _0xd6bfda=_0x274fdd[_0x4560bd(0x3a0)],_0x26772b=_0x157afd[_0x4560bd(0x3a0)];if(_0xd6bfda!==_0x26772b)return _0x26772b-_0xd6bfda;return _0x1c4f47-_0x2a3fe2;}return 0x0;}),_0x1e9b19;},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x2b2)]=function(){const _0xe41ce8=_0x15a52d;if(!this[_0xe41ce8(0x10e)])return![];if([_0xe41ce8(0x407),_0xe41ce8(0x3db),_0xe41ce8(0x345)][_0xe41ce8(0xf9)](this[_0xe41ce8(0x160)]))return![];return!![];},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x169)]=function(){const _0x1ee156=_0x15a52d,_0x6466e=this['_actor'][_0x1ee156(0x254)]();for(const _0x460711 of _0x6466e){const _0x5b2cec=DataManager[_0x1ee156(0x2a1)](_0x460711);for(const _0x17bd4e in _0x5b2cec){const _0x1e46bb=$dataSkills[Number(_0x17bd4e)]||null,_0x27eb62=$dataSkills[Number(_0x5b2cec[_0x17bd4e])]||null;while(this['_data']['includes'](_0x1e46bb)){const _0x43fd5b=this[_0x1ee156(0x3a3)][_0x1ee156(0x288)](_0x1e46bb);this[_0x1ee156(0x3a3)][_0x43fd5b]=_0x27eb62;}}}},VisuMZ['SkillsStatesCore']['Window_SkillList_drawItem']=Window_SkillList[_0x15a52d(0x21f)]['drawItem'],Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x33a)]=function(_0x5cdeb9){const _0x2f8b0f=_0x15a52d,_0x8544a2=this[_0x2f8b0f(0x291)](_0x5cdeb9),_0xb8bff1=_0x8544a2?_0x8544a2[_0x2f8b0f(0x3df)]:'';if(_0x8544a2)this[_0x2f8b0f(0x3e1)](_0x8544a2);DataManager['isToggleSkill'](_0x8544a2)&&this[_0x2f8b0f(0x10e)]&&this[_0x2f8b0f(0x10e)][_0x2f8b0f(0x2e4)](_0x8544a2)&&(this[_0x2f8b0f(0x24b)]=!![]);VisuMZ[_0x2f8b0f(0x397)][_0x2f8b0f(0x279)][_0x2f8b0f(0x2b6)](this,_0x5cdeb9),this[_0x2f8b0f(0x24b)]=undefined;if(_0x8544a2)_0x8544a2['name']=_0xb8bff1;},Window_SkillList['prototype'][_0x15a52d(0x3e1)]=function(_0xa94707){const _0x30d2a6=_0x15a52d;if(_0xa94707&&_0xa94707[_0x30d2a6(0x2df)]['match'](/<LIST NAME:[ ](.*)>/i)){_0xa94707['name']=String(RegExp['$1'])['trim']();for(;;){if(_0xa94707[_0x30d2a6(0x3df)][_0x30d2a6(0xed)](/\\V\[(\d+)\]/gi))_0xa94707['name']=_0xa94707['name'][_0x30d2a6(0xf4)](/\\V\[(\d+)\]/gi,(_0x485604,_0x195ea4)=>$gameVariables['value'](parseInt(_0x195ea4)));else break;}}},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x2c5)]=function(_0x3cccef,_0x5548dd,_0x287faf,_0x440b56){const _0x22a140=_0x15a52d;Window_Base[_0x22a140(0x21f)][_0x22a140(0x2c5)][_0x22a140(0x2b6)](this,this['_actor'],_0x3cccef,_0x5548dd,_0x287faf,_0x440b56);},Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x32b)]=function(_0x2f8ff4){const _0x412585=_0x15a52d;this[_0x412585(0x21a)]=_0x2f8ff4,this['callUpdateHelp']();},VisuMZ[_0x15a52d(0x397)][_0x15a52d(0x394)]=Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x2a0)],Window_SkillList[_0x15a52d(0x21f)][_0x15a52d(0x2a0)]=function(){const _0x494601=_0x15a52d;VisuMZ[_0x494601(0x397)]['Window_SkillList_updateHelp'][_0x494601(0x2b6)](this),this[_0x494601(0x21a)]&&this['_statusWindow']['constructor']===Window_ShopStatus&&this[_0x494601(0x21a)][_0x494601(0x122)](this[_0x494601(0x2f0)]());};