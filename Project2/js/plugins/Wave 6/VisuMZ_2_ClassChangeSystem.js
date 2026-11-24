//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
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
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
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
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How come the <Passive State: x> notetag doesn't work with subclasses?
 * 
 * A. This is intentional. We didn't want passive state notetags read while the
 * class is equipped as a subclass. This is to prevent things like having
 * a primary class Healer with a Double Healing passive state to carry that
 * over for their subclass.
 * 
 * However, the effect is still achievable. Instead of putting the notetag
 * <Passive State: x> on the class itself, put it on a skill that the class
 * learns. Then, insert into the passive this notetag from  Skills & States
 * Core: <Passive Condition Multiclass: id, id, id>
 * 
 * As long as any of those ID's match with a main class or subclass, then
 * the passive state will have its condition be met and become available.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 * depending on the primary class and how they're set up. To avoid
 * conflicting with subclass resources and requirements, the Skill Learn
 * System only makes it available for the primary class to learn skills from
 * at a time. To learn skills from a subclass through the Skill Learn System
 * the player would have to change to the subclass' class as the primary and
 * then learn from it.
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
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <CP Plus: +x%>
 * <CP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <CP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <CP Flat: +x%>
 * <CP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <JP Plus: +x%>
 * <JP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <JP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <JP Flat: +x%>
 * <JP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
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
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * 
 *   Select Same Subclass?:
 *   - Allow selecting the same subclass that's already equipped in that slot?
 *   - Mostly an aesthetic thing to allow/prevent the same subclass from being
 *     selected if that's what you want to control.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 * 
 *     Play for Unassign?:
 *     - Play animation for unassigning a subclass?
 *     - Mostly an aesthetic thing to play/not play animations when unassigning
 *       a subclass if that's what you want to control.
 * 
 *   Show Class Level?
 *   - Show the class level when displaying classes?
 *   - Used for the windows in the Class Change menu.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 *   - For extra clarity:
 *     - Shows up if there is enough room on the screen. Make sure your game's
 *       screen resolution is large enough (ie. 1280x720).
 *     - Shows up in the Skill menu if 'Learn' is selected.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 *   - For extra clarity:
 *     - Shows up if there is enough room on the screen. Make sure your game's
 *       screen resolution is large enough (ie. 1280x720).
 *     - Shows up in the Skill menu if 'Learn' is selected.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.20: October 19, 20266
 * * Bug Fixes!
 * ** Fixed a bug where if only one multiclass is available, selecting a class
 *    that is lower down on the list won't jump to the top before jumping back
 *    to the current index. Fix made by Arisu.
 * 
 * Version 1.19: December 15, 2025
 * * Documentation Update!
 * ** Added extra notes for clarity for the "Show in Menus?" plugin parameter
 *    for CP and JP.
 * *** For extra clarity:
 * **** Shows up if there is enough room on the screen. Make sure your game's
 *      screen resolution is large enough (ie. 1280x720).
 * **** Shows up in the Skill menu if 'Learn' is selected.
 * * Compatibility Update!
 * ** Added better preloading functionality for Main Menu Core's options to
 *    utilize Map Sprites and SV Battlers for the visual actor graphic.
 * 
 * Version 1.18: June 12, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new line for <CP Rate: x%>
 * *** CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * ** Added new line for <JP Rate: x%>
 * *** JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <CP Plus: +x%>
 * *** <CP Plus: -x%>
 * *** <CP Flat: +x%>
 * *** <CP Flat: -x%>
 * *** <JP Plus: +x%>
 * *** <JP Plus: -x%>
 * *** <JP Flat: +x%>
 * *** <JP Flat: -x%>
 * **** These are the additive versions of <CP Rate: x%> and <JP Rate: x%>
 * **** See help file for more information.
 * 
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon loading a save game that was made
 *    before Class Change System was installed. Fix made by Olivia.
 * 
 * Version 1.16: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameters added by Irina:
 * *** Parameters > General Settings > Select Same Subclass?
 * **** Allow selecting the same subclass that's already equipped in that slot?
 * **** Mostly an aesthetic thing to allow/prevent the same subclass from being
 *      selected if that's what you want to control.
 * *** Parameters > Window Settings > Confirm Animation ID > Play for Unassign?
 * **** Play animation for unassigning a subclass?
 * **** Mostly an aesthetic thing to play/not play animations when unassigning
 *      a subclass if that's what you want to control.
 * 
 * Version 1.15: December 14, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with the \Class[x] textcode from the VisuStella
 *    MZ message core. Fix made by Irina.
 * 
 * Version 1.14: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Window Settings > Show Class Level?
 * **** Show the class level when displaying classes?
 * **** Used for the windows in the Class Change menu.
 * 
 * Version 1.13: May 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the element rate traits of subclasses did not apply.
 *    Fix made by Olivia.
 * 
 * Version 1.12: April 14, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain face index values not registering properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Added a better bitmap loading system for face graphics. Update by Irina.
 * 
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
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
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
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
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 *
 * @param AllowSameSubclassSelect:eval
 * @text Select Same Subclass?
 * @parent Basics
 * @type boolean
 * @on Allow Selection
 * @off Disallow Selection
 * @desc Allow selecting the same subclass that's already equipped in that slot?
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 * 
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
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
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param AllowClearClassAni:eval
 * @text Play for Unassign?
 * @parent ConfirmAnimationID:num
 * @type boolean
 * @on Play Animation
 * @off Don't Play
 * @desc Play animation for unassigning a subclass?
 * @default true
 *
 * @param ShowClassLevel:eval
 * @text Show Class Level?
 * @parent Scene
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the class level when displaying classes?
 * Used for the windows in the Class Change menu.
 * @default true
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
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
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
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
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
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
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much CP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much JP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x152cc7=_0x6ce8;(function(_0x29f802,_0x38657a){const _0x2ebc4a=_0x6ce8,_0x4ef34a=_0x29f802();while(!![]){try{const _0x2c885c=-parseInt(_0x2ebc4a(0x26a))/0x1+parseInt(_0x2ebc4a(0x1c3))/0x2*(parseInt(_0x2ebc4a(0x171))/0x3)+parseInt(_0x2ebc4a(0x323))/0x4+-parseInt(_0x2ebc4a(0x268))/0x5+-parseInt(_0x2ebc4a(0x30e))/0x6*(parseInt(_0x2ebc4a(0x1e2))/0x7)+parseInt(_0x2ebc4a(0xe4))/0x8+-parseInt(_0x2ebc4a(0x253))/0x9;if(_0x2c885c===_0x38657a)break;else _0x4ef34a['push'](_0x4ef34a['shift']());}catch(_0x576034){_0x4ef34a['push'](_0x4ef34a['shift']());}}}(_0x2e6b,0x6acf7));var label=_0x152cc7(0x1be),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x152cc7(0x301)](function(_0xa335a5){const _0x22239d=_0x152cc7;return _0xa335a5[_0x22239d(0x10f)]&&_0xa335a5[_0x22239d(0x309)][_0x22239d(0x12a)]('['+label+']');})[0x0];VisuMZ[label][_0x152cc7(0x1a0)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x152cc7(0x203)]=function(_0x1bd6f8,_0xe367a4){const _0x2c439c=_0x152cc7;for(const _0x572dbb in _0xe367a4){if(_0x572dbb[_0x2c439c(0x2fa)](/(.*):(.*)/i)){const _0x529c95=String(RegExp['$1']),_0x540357=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x547ef7,_0x4eed58,_0x1ebdaa;switch(_0x540357){case'NUM':_0x547ef7=_0xe367a4[_0x572dbb]!==''?Number(_0xe367a4[_0x572dbb]):0x0;break;case _0x2c439c(0x214):_0x4eed58=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):[],_0x547ef7=_0x4eed58[_0x2c439c(0x167)](_0x5490c0=>Number(_0x5490c0));break;case'EVAL':_0x547ef7=_0xe367a4[_0x572dbb]!==''?eval(_0xe367a4[_0x572dbb]):null;break;case'ARRAYEVAL':_0x4eed58=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):[],_0x547ef7=_0x4eed58[_0x2c439c(0x167)](_0x50c0ad=>eval(_0x50c0ad));break;case _0x2c439c(0x1fa):_0x547ef7=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):'';break;case _0x2c439c(0x269):_0x4eed58=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):[],_0x547ef7=_0x4eed58[_0x2c439c(0x167)](_0x18c427=>JSON[_0x2c439c(0x267)](_0x18c427));break;case _0x2c439c(0x19e):_0x547ef7=_0xe367a4[_0x572dbb]!==''?new Function(JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb])):new Function(_0x2c439c(0x314));break;case'ARRAYFUNC':_0x4eed58=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):[],_0x547ef7=_0x4eed58[_0x2c439c(0x167)](_0x47de0c=>new Function(JSON[_0x2c439c(0x267)](_0x47de0c)));break;case'STR':_0x547ef7=_0xe367a4[_0x572dbb]!==''?String(_0xe367a4[_0x572dbb]):'';break;case _0x2c439c(0x238):_0x4eed58=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):[],_0x547ef7=_0x4eed58['map'](_0x4ce884=>String(_0x4ce884));break;case _0x2c439c(0x22b):_0x1ebdaa=_0xe367a4[_0x572dbb]!==''?JSON[_0x2c439c(0x267)](_0xe367a4[_0x572dbb]):{},_0x547ef7=VisuMZ['ConvertParams']({},_0x1ebdaa);break;case _0x2c439c(0x1ec):_0x4eed58=_0xe367a4[_0x572dbb]!==''?JSON['parse'](_0xe367a4[_0x572dbb]):[],_0x547ef7=_0x4eed58[_0x2c439c(0x167)](_0x73ca22=>VisuMZ[_0x2c439c(0x203)]({},JSON[_0x2c439c(0x267)](_0x73ca22)));break;default:continue;}_0x1bd6f8[_0x529c95]=_0x547ef7;}}return _0x1bd6f8;},(_0x15fea1=>{const _0x1c4153=_0x152cc7,_0x5b022d=_0x15fea1[_0x1c4153(0x242)];for(const _0x2f8445 of dependencies){if(!Imported[_0x2f8445]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x1c4153(0x34a)](_0x5b022d,_0x2f8445)),SceneManager[_0x1c4153(0x34d)]();break;}}const _0x5c05c=_0x15fea1[_0x1c4153(0x309)];if(_0x5c05c[_0x1c4153(0x2fa)](/\[Version[ ](.*?)\]/i)){const _0x4118c6=Number(RegExp['$1']);_0x4118c6!==VisuMZ[label][_0x1c4153(0xad)]&&(alert(_0x1c4153(0x1cb)[_0x1c4153(0x34a)](_0x5b022d,_0x4118c6)),SceneManager['exit']());}if(_0x5c05c[_0x1c4153(0x2fa)](/\[Tier[ ](\d+)\]/i)){const _0x612516=Number(RegExp['$1']);_0x612516<tier?(alert(_0x1c4153(0x1f2)[_0x1c4153(0x34a)](_0x5b022d,_0x612516,tier)),SceneManager[_0x1c4153(0x34d)]()):tier=Math[_0x1c4153(0x135)](_0x612516,tier);}VisuMZ[_0x1c4153(0x203)](VisuMZ[label][_0x1c4153(0x1a0)],_0x15fea1[_0x1c4153(0x235)]);})(pluginData),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],_0x152cc7(0x27c),_0x45a71b=>{const _0x4a70a3=_0x152cc7;VisuMZ['ConvertParams'](_0x45a71b,_0x45a71b);const _0x48e57d=_0x45a71b[_0x4a70a3(0xee)][_0x4a70a3(0x167)](_0x54cb0a=>$gameActors[_0x4a70a3(0x210)](_0x54cb0a)),_0x399836=_0x45a71b['Classes'];for(const _0x2bc84d of _0x48e57d){if(!_0x2bc84d)continue;for(const _0x5dc1fa of _0x399836){_0x2bc84d['unlockClass'](_0x5dc1fa);}}}),PluginManager[_0x152cc7(0xfb)](pluginData['name'],_0x152cc7(0x324),_0x494aa5=>{const _0x59ecd7=_0x152cc7;VisuMZ[_0x59ecd7(0x203)](_0x494aa5,_0x494aa5);const _0x45289e=_0x494aa5[_0x59ecd7(0x32b)];for(const _0x3e973f of _0x45289e){$gameParty['unlockClass'](_0x3e973f);}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],'ClassUnlockRemoveActor',_0x10044f=>{const _0x5b00d5=_0x152cc7;VisuMZ[_0x5b00d5(0x203)](_0x10044f,_0x10044f);const _0x3a78cc=_0x10044f[_0x5b00d5(0xee)][_0x5b00d5(0x167)](_0x56f01b=>$gameActors['actor'](_0x56f01b)),_0x11cd8e=_0x10044f[_0x5b00d5(0x32b)];for(const _0x41379f of _0x3a78cc){if(!_0x41379f)continue;for(const _0x19448c of _0x11cd8e){_0x41379f[_0x5b00d5(0x2b6)](_0x19448c);}}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],_0x152cc7(0x120),_0x5d7474=>{const _0x4b6608=_0x152cc7;VisuMZ[_0x4b6608(0x203)](_0x5d7474,_0x5d7474);const _0x2afbaf=_0x5d7474[_0x4b6608(0x32b)];for(const _0x4a6232 of _0x2afbaf){$gameParty[_0x4b6608(0x2b6)](_0x4a6232);}}),PluginManager['registerCommand'](pluginData['name'],_0x152cc7(0x312),_0x370006=>{const _0x5994ff=_0x152cc7;VisuMZ['ConvertParams'](_0x370006,_0x370006);const _0x50ef02=_0x370006[_0x5994ff(0xee)][_0x5994ff(0x167)](_0x253a6a=>$gameActors[_0x5994ff(0x210)](_0x253a6a)),_0x4294f8=_0x370006[_0x5994ff(0x118)];for(const _0x946cf9 of _0x50ef02){if(!_0x946cf9)continue;for(const _0x7a2b6d of _0x4294f8){_0x946cf9[_0x5994ff(0x1bd)](_0x7a2b6d);}}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],_0x152cc7(0x1dc),_0x5b911e=>{const _0x1cb8c0=_0x152cc7;VisuMZ[_0x1cb8c0(0x203)](_0x5b911e,_0x5b911e);const _0x32200b=_0x5b911e[_0x1cb8c0(0xee)]['map'](_0x49aaba=>$gameActors[_0x1cb8c0(0x210)](_0x49aaba)),_0x44cf48=_0x5b911e['Tiers'];for(const _0x4714c6 of _0x32200b){if(!_0x4714c6)continue;for(const _0x1de939 of _0x44cf48){_0x4714c6[_0x1cb8c0(0x1cd)](_0x1de939);}}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],_0x152cc7(0x18f),_0xa02739=>{const _0x59879f=_0x152cc7;VisuMZ['ConvertParams'](_0xa02739,_0xa02739);const _0xbceb8e=_0xa02739['Actors']['map'](_0x56b024=>$gameActors['actor'](_0x56b024)),_0x9b9588=_0xa02739[_0x59879f(0x1bf)],_0x4cb839=_0xa02739[_0x59879f(0xd4)];for(const _0x305dbe of _0xbceb8e){if(!_0x305dbe)continue;_0x305dbe[_0x59879f(0x119)](_0x4cb839,_0x9b9588);}}),PluginManager[_0x152cc7(0xfb)](pluginData['name'],_0x152cc7(0x33f),_0x241f52=>{const _0x4626c9=_0x152cc7;VisuMZ[_0x4626c9(0x203)](_0x241f52,_0x241f52);const _0x49a2f1=_0x241f52[_0x4626c9(0xee)]['map'](_0x336514=>$gameActors[_0x4626c9(0x210)](_0x336514)),_0x1515ea=_0x241f52[_0x4626c9(0x176)];for(const _0x2daf5b of _0x49a2f1){if(!_0x2daf5b)continue;_0x2daf5b[_0x4626c9(0x2d1)](_0x1515ea);}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],_0x152cc7(0xc3),_0x1412da=>{const _0x572a6a=_0x152cc7;VisuMZ[_0x572a6a(0x203)](_0x1412da,_0x1412da);const _0x108354=_0x1412da[_0x572a6a(0xee)][_0x572a6a(0x167)](_0x50b9fc=>$gameActors['actor'](_0x50b9fc)),_0x1e9369=_0x1412da['Limit'];for(const _0xdd72ac of _0x108354){if(!_0xdd72ac)continue;_0xdd72ac[_0x572a6a(0x2b0)](_0x1e9369);}}),PluginManager['registerCommand'](pluginData['name'],_0x152cc7(0x21c),_0x318417=>{const _0x27248d=_0x152cc7;VisuMZ[_0x27248d(0x203)](_0x318417,_0x318417);const _0x35f474=_0x318417['Actors'][_0x27248d(0x167)](_0x488bed=>$gameActors[_0x27248d(0x210)](_0x488bed)),_0x389655=_0x318417['Limit'];for(const _0x1ec0f9 of _0x35f474){if(!_0x1ec0f9)continue;_0x1ec0f9['setMulticlassTiers'](_0x389655);}}),PluginManager['registerCommand'](pluginData[_0x152cc7(0x242)],_0x152cc7(0x13e),_0x54482d=>{const _0x2be518=_0x152cc7;VisuMZ[_0x2be518(0x203)](_0x54482d,_0x54482d);const _0x4ab296=_0x54482d[_0x2be518(0xee)][_0x2be518(0x167)](_0x6c2823=>$gameActors[_0x2be518(0x210)](_0x6c2823)),_0x300c1b=_0x54482d[_0x2be518(0x32b)],_0x292d51=_0x54482d[_0x2be518(0xcf)];for(const _0x22f5b1 of _0x4ab296){if(!_0x22f5b1)continue;for(const _0x29ca7e of _0x300c1b){_0x22f5b1[_0x2be518(0x13f)](_0x292d51,_0x29ca7e);}}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],_0x152cc7(0xc9),_0x5c3343=>{const _0x24c25e=_0x152cc7;VisuMZ[_0x24c25e(0x203)](_0x5c3343,_0x5c3343);const _0x2474d8=_0x5c3343[_0x24c25e(0xee)][_0x24c25e(0x167)](_0xa55023=>$gameActors[_0x24c25e(0x210)](_0xa55023)),_0x9ec779=_0x5c3343['Classes'],_0x1a7047=_0x5c3343[_0x24c25e(0xcf)];for(const _0x3ad9b5 of _0x2474d8){if(!_0x3ad9b5)continue;for(const _0x5f2a4d of _0x9ec779){_0x3ad9b5[_0x24c25e(0x240)](_0x1a7047,_0x5f2a4d);}}}),PluginManager[_0x152cc7(0xfb)](pluginData[_0x152cc7(0x242)],'ClassPointsLose',_0x4e5144=>{const _0x4c8489=_0x152cc7;VisuMZ[_0x4c8489(0x203)](_0x4e5144,_0x4e5144);const _0x1c8f5a=_0x4e5144['Actors'][_0x4c8489(0x167)](_0x3b2e02=>$gameActors['actor'](_0x3b2e02)),_0x2c9f25=_0x4e5144[_0x4c8489(0x32b)],_0x46f05c=_0x4e5144[_0x4c8489(0xcf)];for(const _0x5f2f8f of _0x1c8f5a){if(!_0x5f2f8f)continue;for(const _0x348ad0 of _0x2c9f25){_0x5f2f8f[_0x4c8489(0x32e)](_0x46f05c,_0x348ad0);}}}),PluginManager['registerCommand'](pluginData[_0x152cc7(0x242)],_0x152cc7(0x14d),_0x22bd67=>{const _0x30fcd5=_0x152cc7;VisuMZ[_0x30fcd5(0x203)](_0x22bd67,_0x22bd67);const _0x20c509=_0x22bd67[_0x30fcd5(0xee)][_0x30fcd5(0x167)](_0x1f3ac7=>$gameActors['actor'](_0x1f3ac7)),_0x5a4cf6=_0x22bd67[_0x30fcd5(0x32b)],_0x1d50f3=_0x22bd67['Points'];for(const _0x536d44 of _0x20c509){if(!_0x536d44)continue;for(const _0x25a694 of _0x5a4cf6){_0x536d44['setClassPoints'](_0x1d50f3,_0x25a694);}}}),PluginManager['registerCommand'](pluginData[_0x152cc7(0x242)],'JobPointsGain',_0x4bc4d6=>{const _0xa1e3dc=_0x152cc7;VisuMZ[_0xa1e3dc(0x203)](_0x4bc4d6,_0x4bc4d6);const _0x333807=_0x4bc4d6[_0xa1e3dc(0xee)]['map'](_0x27e4b7=>$gameActors['actor'](_0x27e4b7)),_0x42d801=_0x4bc4d6[_0xa1e3dc(0x32b)],_0x3c7e80=_0x4bc4d6[_0xa1e3dc(0xcf)];for(const _0x3ae0ab of _0x333807){if(!_0x3ae0ab)continue;for(const _0x276f2b of _0x42d801){_0x3ae0ab['gainJobPoints'](_0x3c7e80,_0x276f2b);}}}),PluginManager[_0x152cc7(0xfb)](pluginData['name'],_0x152cc7(0x194),_0x328216=>{const _0x1ad314=_0x152cc7;VisuMZ[_0x1ad314(0x203)](_0x328216,_0x328216);const _0x4fb8e9=_0x328216[_0x1ad314(0xee)][_0x1ad314(0x167)](_0x229812=>$gameActors['actor'](_0x229812)),_0x5f1a19=_0x328216[_0x1ad314(0x32b)],_0x1d0d53=_0x328216[_0x1ad314(0xcf)];for(const _0x4472da of _0x4fb8e9){if(!_0x4472da)continue;for(const _0x372c6a of _0x5f1a19){_0x4472da[_0x1ad314(0x1bc)](_0x1d0d53,_0x372c6a);}}}),PluginManager['registerCommand'](pluginData[_0x152cc7(0x242)],_0x152cc7(0x243),_0x228532=>{const _0x1f161d=_0x152cc7;VisuMZ[_0x1f161d(0x203)](_0x228532,_0x228532);const _0x133c6b=_0x228532[_0x1f161d(0xee)][_0x1f161d(0x167)](_0x24a5b6=>$gameActors[_0x1f161d(0x210)](_0x24a5b6)),_0x28af95=_0x228532[_0x1f161d(0x32b)],_0x12771c=_0x228532[_0x1f161d(0xcf)];for(const _0x554c42 of _0x133c6b){if(!_0x554c42)continue;for(const _0x26ef36 of _0x28af95){_0x554c42['loseJobPoints'](_0x12771c,_0x26ef36);}}}),PluginManager['registerCommand'](pluginData[_0x152cc7(0x242)],_0x152cc7(0x271),_0x4c3788=>{const _0xfbf35f=_0x152cc7;VisuMZ[_0xfbf35f(0x203)](_0x4c3788,_0x4c3788);const _0x362354=_0x4c3788[_0xfbf35f(0xee)][_0xfbf35f(0x167)](_0x50cd25=>$gameActors[_0xfbf35f(0x210)](_0x50cd25)),_0xf0f24=_0x4c3788[_0xfbf35f(0x32b)],_0x2b1193=_0x4c3788[_0xfbf35f(0xcf)];for(const _0x555065 of _0x362354){if(!_0x555065)continue;for(const _0x31e2e3 of _0xf0f24){_0x555065['setJobPoints'](_0x2b1193,_0x31e2e3);}}}),PluginManager[_0x152cc7(0xfb)](pluginData['name'],'SystemEnableClassChangeSystemMenu',_0x406abb=>{const _0x44243f=_0x152cc7;VisuMZ[_0x44243f(0x203)](_0x406abb,_0x406abb),$gameSystem[_0x44243f(0x1af)](_0x406abb['Enable']);}),PluginManager['registerCommand'](pluginData[_0x152cc7(0x242)],_0x152cc7(0x12e),_0x1ee678=>{const _0x182e78=_0x152cc7;VisuMZ['ConvertParams'](_0x1ee678,_0x1ee678),$gameSystem[_0x182e78(0x1b4)](_0x1ee678[_0x182e78(0x24a)]);}),VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1ba)]=function(){const _0x348357=_0x152cc7;try{}catch(_0x373f50){if($gameTemp[_0x348357(0x23e)]())console[_0x348357(0x212)](_0x373f50);}},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x2f2)]={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsPlus':/<(?:CLASS POINTS|CP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'ClassPointsFlat':/<(?:CLASS POINTS|CP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsPlus':/<(?:CLASS POINTS|CP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'JobPointsFlat':/<(?:CLASS POINTS|CP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1f6)]=Scene_Boot[_0x152cc7(0x20e)][_0x152cc7(0xa4)],Scene_Boot[_0x152cc7(0x20e)][_0x152cc7(0xa4)]=function(){const _0x2bc4ea=_0x152cc7;VisuMZ[_0x2bc4ea(0x1be)]['Scene_Boot_onDatabaseLoaded']['call'](this),this['process_VisuMZ_ClassChangeSystem']();},Scene_Boot[_0x152cc7(0x20e)][_0x152cc7(0xa6)]=function(){const _0x6ca27c=_0x152cc7;this[_0x6ca27c(0x35c)]();},Scene_Boot[_0x152cc7(0x20e)]['process_VisuMZ_ClassChangeSystem_Notetags']=function(){const _0xbbefe0=_0x152cc7;if(VisuMZ[_0xbbefe0(0x11c)])return;for(const _0x2735c5 of $dataActors){if(!_0x2735c5)continue;ImageManager[_0xbbefe0(0x25b)](_0x2735c5);}for(const _0x485708 of $dataClasses){if(!_0x485708)continue;VisuMZ[_0xbbefe0(0x1be)][_0xbbefe0(0x213)](_0x485708);}},VisuMZ[_0x152cc7(0x1be)]['JS']={},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x12c)]=function(_0x4ee3ee,_0x303e85,_0x5de070){const _0x3870e2=_0x152cc7,_0x2064ce=_0x4ee3ee[_0x3870e2(0x2a6)];if(_0x2064ce[_0x3870e2(0x2fa)](_0x5de070)){const _0x219df7=String(RegExp['$1']),_0x3410a4=_0x3870e2(0x1c1)[_0x3870e2(0x34a)](_0x219df7),_0x19395d=VisuMZ[_0x3870e2(0x1be)][_0x3870e2(0x1f9)](_0x4ee3ee,_0x303e85);VisuMZ[_0x3870e2(0x1be)]['JS'][_0x19395d]=new Function(_0x3410a4);}},VisuMZ['ClassChangeSystem'][_0x152cc7(0x1f9)]=function(_0x2c76b3,_0x2eb5b3){const _0x1f2e41=_0x152cc7;let _0x5715a0='';if($dataActors[_0x1f2e41(0x12a)](_0x2c76b3))_0x5715a0='Actor-%1-%2'[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);if($dataClasses[_0x1f2e41(0x12a)](_0x2c76b3))_0x5715a0='Class-%1-%2'[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);if($dataSkills[_0x1f2e41(0x12a)](_0x2c76b3))_0x5715a0=_0x1f2e41(0x241)[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);if($dataItems['includes'](_0x2c76b3))_0x5715a0='Item-%1-%2'['format'](_0x2c76b3['id'],_0x2eb5b3);if($dataWeapons[_0x1f2e41(0x12a)](_0x2c76b3))_0x5715a0=_0x1f2e41(0x29c)[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);if($dataArmors[_0x1f2e41(0x12a)](_0x2c76b3))_0x5715a0='Armor-%1-%2'[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);if($dataEnemies['includes'](_0x2c76b3))_0x5715a0='Enemy-%1-%2'[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);if($dataStates[_0x1f2e41(0x12a)](_0x2c76b3))_0x5715a0=_0x1f2e41(0x2b4)[_0x1f2e41(0x34a)](_0x2c76b3['id'],_0x2eb5b3);return _0x5715a0;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x2f8)]=VisuMZ[_0x152cc7(0x2f8)],VisuMZ[_0x152cc7(0x2f8)]=function(_0x133fd4){const _0x4704e6=_0x152cc7;VisuMZ[_0x4704e6(0x1be)][_0x4704e6(0x2f8)][_0x4704e6(0x28f)](this,_0x133fd4),ImageManager[_0x4704e6(0x25b)](_0x133fd4);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x2cb)]=VisuMZ[_0x152cc7(0x2cb)],VisuMZ[_0x152cc7(0x2cb)]=function(_0x3bc946){const _0x569c42=_0x152cc7;VisuMZ[_0x569c42(0x1be)][_0x569c42(0x2cb)]['call'](this,_0x3bc946),VisuMZ[_0x569c42(0x1be)][_0x569c42(0x213)](_0x3bc946),VisuMZ[_0x569c42(0x1be)][_0x569c42(0x288)](_0x3bc946);},VisuMZ['ClassChangeSystem'][_0x152cc7(0x213)]=function(_0x566ca7){const _0x379e81=_0x152cc7;_0x566ca7['iconIndex']=ImageManager[_0x379e81(0x13c)]||0x0,_0x566ca7[_0x379e81(0x309)]=TextManager[_0x379e81(0x1b6)]['format'](_0x566ca7['name']||'');const _0x54b431=VisuMZ[_0x379e81(0x1be)][_0x379e81(0x2f2)],_0x522441=_0x566ca7['note'];_0x522441[_0x379e81(0x2fa)](_0x54b431[_0x379e81(0x295)])&&(_0x566ca7[_0x379e81(0x33e)]=Number(RegExp['$1'])),_0x522441[_0x379e81(0x2fa)](_0x54b431[_0x379e81(0x14a)])&&(_0x566ca7[_0x379e81(0x309)]=String(RegExp['$1']));},VisuMZ['ClassChangeSystem'][_0x152cc7(0x288)]=function(_0x15c9cd){const _0x21ddfe=_0x152cc7;_0x15c9cd['name'][_0x21ddfe(0x2fa)](/\\I\[(\d+)\]/i)&&(_0x15c9cd[_0x21ddfe(0x33e)]=Number(RegExp['$1']));if(Imported[_0x21ddfe(0x198)]){if(VisuMZ[_0x21ddfe(0x130)]['Settings']['UI'][_0x21ddfe(0xf6)]){const _0x44e4c6='\x5cI[%1]%2';_0x15c9cd[_0x21ddfe(0x242)]=_0x44e4c6[_0x21ddfe(0x34a)](_0x15c9cd[_0x21ddfe(0x33e)],_0x15c9cd[_0x21ddfe(0x242)]);}else _0x15c9cd['name']=_0x15c9cd[_0x21ddfe(0x242)][_0x21ddfe(0x2a5)](/\x1bI\[(\d+)\]/gi,''),_0x15c9cd['name']=_0x15c9cd['name'][_0x21ddfe(0x2a5)](/\\I\[(\d+)\]/gi,'');}},DataManager[_0x152cc7(0x168)]=function(_0x4ad6a0){const _0x417d3d=_0x152cc7;if(!_0x4ad6a0)return[];let _0x4622d2=[];return _0x4622d2=_0x4622d2['concat'](_0x4ad6a0[_0x417d3d(0x26f)]()['map'](_0x4ebdd0=>_0x4ebdd0['id'])),_0x4622d2=_0x4622d2[_0x417d3d(0x188)](_0x4ad6a0['getUnlockedClasses']()),_0x4622d2=_0x4622d2[_0x417d3d(0x188)]($gameParty[_0x417d3d(0x331)]()),_0x4622d2=_0x4622d2['concat'](VisuMZ[_0x417d3d(0x1be)][_0x417d3d(0x1a0)]['General'][_0x417d3d(0x28d)]),_0x4622d2=_0x4622d2[_0x417d3d(0x301)]((_0x377668,_0x44e50c,_0x23e9ec)=>_0x23e9ec[_0x417d3d(0x29a)](_0x377668)===_0x44e50c),_0x4622d2[_0x417d3d(0x297)](function(_0x28d945,_0x28f448){return _0x28d945-_0x28f448;}),_0x4622d2[_0x417d3d(0x167)](_0x303cb6=>$dataClasses[_0x303cb6])[_0x417d3d(0x116)](null);},DataManager['checkForNewUnlockedClasses']=function(_0x1039f4){const _0x248f13=_0x152cc7,_0x19bfa7=[],_0x1951de=DataManager[_0x248f13(0x168)](_0x1039f4);for(const _0x1e371d of $dataClasses){if(!_0x1e371d)continue;if(_0x1951de['includes'](_0x1e371d))continue;this[_0x248f13(0x244)](_0x1039f4,_0x1e371d)&&_0x19bfa7[_0x248f13(0x1f0)](_0x1e371d['id']);}return _0x19bfa7;},DataManager[_0x152cc7(0x244)]=function(_0xf9a4b0,_0x55fa7f){const _0x3705e5=_0x152cc7;if(!_0xf9a4b0)return![];if(!_0x55fa7f)return![];const _0x512060=VisuMZ[_0x3705e5(0x1be)]['RegExp'],_0x363754=_0x55fa7f[_0x3705e5(0x2a6)];if(_0x363754[_0x3705e5(0x2fa)](_0x512060[_0x3705e5(0x1ea)])){const _0x584894=String(RegExp['$1'])[_0x3705e5(0xc2)](/[\r\n]+/);for(const _0x2b8be3 of _0x584894){let _0x3dcb34=0x0;if(_0x2b8be3[_0x3705e5(0x2fa)](/(.*):[ ](.*)/i)){const _0x21f6a9=String(RegExp['$1']),_0x2a5ce3=String(RegExp['$2']);if(_0x21f6a9[_0x3705e5(0x2fa)](/CLASS[ ](\d+)/i))_0x3dcb34=Number(RegExp['$1']);else{if(_0x21f6a9[_0x3705e5(0x2fa)](/CLASS[ ](.*)/i))_0x3dcb34=this[_0x3705e5(0x16d)](RegExp['$1']);else{if(_0x21f6a9[_0x3705e5(0x2fa)](/\b(?:AP|CP|JP|SP)\b/i)){const _0x24f661=_0x21f6a9[_0x3705e5(0x2e0)]()[_0x3705e5(0x25d)](),_0xe65872=Number(_0x2a5ce3)||0x0;if(Imported[_0x3705e5(0x110)]){if(_0x24f661==='AP'){const _0x5f3608=_0xf9a4b0['getAbilityPoints']();if(_0x5f3608<_0xe65872)return![];}else{if(_0x24f661==='SP'){const _0x3d416e=_0xf9a4b0['getSkillPoints']();if(_0x3d416e<_0xe65872)return![];}}}if(Imported[_0x3705e5(0x29d)]){if(_0x24f661==='CP'){const _0x189b08=_0xf9a4b0[_0x3705e5(0x349)]();if(_0x189b08<_0xe65872)return![];}else{if(_0x24f661==='JP'){const _0x42ba2f=_0xf9a4b0['getJobPoints']();if(_0x42ba2f<_0xe65872)return![];}}}}}}if(_0x2a5ce3[_0x3705e5(0x2fa)](/LEVEL[ ](\d+)/i)){const _0x2e91c8=Number(RegExp['$1']);if(_0xf9a4b0['classLevel'](_0x3dcb34)<_0x2e91c8)return![];}else{if(_0x2a5ce3['match'](/(\d+)[ ]CP/i)){const _0x2c9965=Number(RegExp['$1']);if(_0xf9a4b0[_0x3705e5(0x349)](_0x3dcb34)<_0x2c9965)return![];}else{if(_0x2a5ce3['match'](/(\d+)[ ]JP/i)){const _0x3f5cc6=Number(RegExp['$1']);if(_0xf9a4b0[_0x3705e5(0x246)](_0x3dcb34)<_0x3f5cc6)return![];}else{if(_0x2a5ce3[_0x3705e5(0x2fa)](/(\d+)[ ]AP/i)){if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;const _0x5e8f69=Number(RegExp['$1']);if(_0xf9a4b0[_0x3705e5(0x197)](_0x3dcb34)<_0x5e8f69)return![];}else{if(_0x2a5ce3[_0x3705e5(0x2fa)](/(\d+)[ ]SP/i)){const _0x424626=Number(RegExp['$1']);if(_0xf9a4b0[_0x3705e5(0x2c3)](_0x3dcb34)<_0x424626)return![];}}}}}}}return!![];}return![];},DataManager[_0x152cc7(0x15a)]=function(_0x4a559b){const _0x394dde=_0x152cc7;if(!_0x4a559b)return[];const _0x4b6054=VisuMZ[_0x394dde(0x1be)][_0x394dde(0x2f2)],_0x4b28ac=_0x4a559b['note'];let _0x12b2bb=[];const _0xd44a45=_0x4b28ac[_0x394dde(0x2fa)](_0x4b6054[_0x394dde(0x107)]);if(_0xd44a45){for(const _0xca47c6 of _0xd44a45){if(!_0xca47c6)continue;_0xca47c6[_0x394dde(0x2fa)](_0x4b6054['TierOnlyClass']);const _0x56bfc8=String(RegExp['$1'])[_0x394dde(0xc2)](',')['map'](_0x590bcc=>Number(_0x590bcc))[_0x394dde(0x116)](null)[_0x394dde(0x116)](undefined)['remove'](NaN);_0x12b2bb=_0x12b2bb[_0x394dde(0x188)](_0x56bfc8);}return _0x12b2bb;}else{const _0x3d56ea=VisuMZ[_0x394dde(0x1be)]['Settings'][_0x394dde(0x16c)][_0x394dde(0x149)];return Array['from']({'length':_0x3d56ea},(_0x50fde8,_0x14e95a)=>_0x14e95a+0x1);}},DataManager[_0x152cc7(0x16d)]=function(_0x1e9aee){const _0x33a562=_0x152cc7;_0x1e9aee=_0x1e9aee[_0x33a562(0x2e0)]()['trim'](),this['_classIDs']=this[_0x33a562(0x127)]||{};if(this['_classIDs'][_0x1e9aee])return this[_0x33a562(0x127)][_0x1e9aee];for(const _0x27e072 of $dataClasses){if(!_0x27e072)continue;let _0x5daa57=_0x27e072['name'];_0x5daa57=_0x5daa57[_0x33a562(0x2a5)](/\x1I\[(\d+)\]/gi,''),_0x5daa57=_0x5daa57[_0x33a562(0x2a5)](/\\I\[(\d+)\]/gi,''),this[_0x33a562(0x127)][_0x5daa57['toUpperCase']()[_0x33a562(0x25d)]()]=_0x27e072['id'];}return this[_0x33a562(0x127)][_0x1e9aee]||0x0;},ImageManager[_0x152cc7(0x201)]=VisuMZ['ClassChangeSystem'][_0x152cc7(0x1a0)][_0x152cc7(0x2c6)][_0x152cc7(0x25e)],ImageManager[_0x152cc7(0x1c5)]=VisuMZ[_0x152cc7(0x1be)]['Settings'][_0x152cc7(0xb6)][_0x152cc7(0x25e)],ImageManager[_0x152cc7(0x13c)]=VisuMZ[_0x152cc7(0x1be)]['Settings']['General'][_0x152cc7(0x25e)],ImageManager[_0x152cc7(0x22c)]={},ImageManager['actorClassFaceIndex']={},ImageManager[_0x152cc7(0x225)]={},ImageManager[_0x152cc7(0x32d)]={},ImageManager[_0x152cc7(0x10b)]={},ImageManager['actorClassMenuPortrait']={},ImageManager[_0x152cc7(0x1ef)]={},ImageManager['registerActorClassImages']=function(_0x1af1f0){const _0x24c451=_0x152cc7;if(!_0x1af1f0)return;const _0x418966=VisuMZ[_0x24c451(0x1be)][_0x24c451(0x2f2)],_0x3b53a2=_0x1af1f0[_0x24c451(0x2a6)],_0x434356=_0x1af1f0['id'],_0x5f0235=_0x3b53a2['match'](_0x418966[_0x24c451(0x2e2)]);if(_0x5f0235)for(const _0x13c57f of _0x5f0235){if(!_0x13c57f)continue;_0x13c57f[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x2e2)]);const _0x6d78f3=String(RegExp['$1']),_0x5825e3=String(RegExp['$2'])[_0x24c451(0x25d)](),_0x658454=Number(RegExp['$3']);let _0x36e7c5=0x0;if(_0x6d78f3['match'](/CLASS[ ](\d+)/i))_0x36e7c5=Number(RegExp['$1']);else _0x6d78f3[_0x24c451(0x2fa)](/CLASS[ ](.*)/i)?_0x36e7c5=DataManager[_0x24c451(0x16d)](RegExp['$1']):_0x36e7c5=DataManager[_0x24c451(0x16d)](_0x6d78f3);if(_0x36e7c5>0x0){const _0xb00c8b=_0x24c451(0x10e)['format'](_0x434356,_0x36e7c5);ImageManager['actorClassFaceName'][_0xb00c8b]=_0x5825e3,ImageManager[_0x24c451(0xe2)][_0xb00c8b]=_0x658454;}}const _0x5f42e3=_0x3b53a2[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x1c9)]);if(_0x5f42e3)for(const _0x5202a1 of _0x5f42e3){if(!_0x5202a1)continue;_0x5202a1[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x1c9)]);const _0x24ce32=String(RegExp['$1']),_0x1de56e=String(RegExp['$2'])['trim'](),_0x1afade=Number(RegExp['$3']);let _0x26070a=0x0;if(_0x24ce32['match'](/CLASS[ ](\d+)/i))_0x26070a=Number(RegExp['$1']);else _0x24ce32[_0x24c451(0x2fa)](/CLASS[ ](.*)/i)?_0x26070a=DataManager[_0x24c451(0x16d)](RegExp['$1']):_0x26070a=DataManager['getClassIdWithName'](_0x24ce32);if(_0x26070a>0x0){const _0x523a45=_0x24c451(0x10e)[_0x24c451(0x34a)](_0x434356,_0x26070a);ImageManager[_0x24c451(0x225)][_0x523a45]=_0x1de56e,ImageManager[_0x24c451(0x32d)][_0x523a45]=_0x1afade;}}const _0x1c2a3c=_0x3b53a2['match'](_0x418966[_0x24c451(0x102)]);if(_0x1c2a3c)for(const _0x2a3458 of _0x1c2a3c){if(!_0x2a3458)continue;_0x2a3458['match'](_0x418966[_0x24c451(0x102)]);const _0x186f64=String(RegExp['$1']),_0x22ffd6=String(RegExp['$2'])[_0x24c451(0x25d)]();let _0xc6d510=0x0;if(_0x186f64[_0x24c451(0x2fa)](/CLASS[ ](\d+)/i))_0xc6d510=Number(RegExp['$1']);else _0x186f64[_0x24c451(0x2fa)](/CLASS[ ](.*)/i)?_0xc6d510=DataManager[_0x24c451(0x16d)](RegExp['$1']):_0xc6d510=DataManager[_0x24c451(0x16d)](_0x186f64);if(_0xc6d510>0x0){const _0x1d0dd3=_0x24c451(0x10e)[_0x24c451(0x34a)](_0x434356,_0xc6d510);ImageManager[_0x24c451(0x10b)][_0x1d0dd3]=_0x22ffd6;}}const _0x52f819=_0x3b53a2[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x293)]);if(_0x52f819)for(const _0x32e956 of _0x52f819){if(!_0x32e956)continue;_0x32e956[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x293)]);const _0x53f724=String(RegExp['$1']),_0x52e74f=String(RegExp['$2'])[_0x24c451(0x25d)]();let _0x303aaa=0x0;if(_0x53f724[_0x24c451(0x2fa)](/CLASS[ ](\d+)/i))_0x303aaa=Number(RegExp['$1']);else _0x53f724[_0x24c451(0x2fa)](/CLASS[ ](.*)/i)?_0x303aaa=DataManager['getClassIdWithName'](RegExp['$1']):_0x303aaa=DataManager[_0x24c451(0x16d)](_0x53f724);if(_0x303aaa>0x0){const _0x25a631='Actor-%1-Class-%2'[_0x24c451(0x34a)](_0x434356,_0x303aaa);ImageManager[_0x24c451(0x26d)][_0x25a631]=_0x52e74f;}}const _0x1eb030=_0x3b53a2[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x100)]);if(_0x1eb030)for(const _0x2fac51 of _0x1eb030){if(!_0x2fac51)continue;_0x2fac51[_0x24c451(0x2fa)](_0x418966[_0x24c451(0x100)]);const _0x493201=String(RegExp['$1']),_0x35622c=String(RegExp['$2'])[_0x24c451(0x25d)]();let _0x533cfe=0x0;if(_0x493201['match'](/CLASS[ ](\d+)/i))_0x533cfe=Number(RegExp['$1']);else _0x493201['match'](/CLASS[ ](.*)/i)?_0x533cfe=DataManager[_0x24c451(0x16d)](RegExp['$1']):_0x533cfe=DataManager[_0x24c451(0x16d)](_0x493201);if(_0x533cfe>0x0){const _0x2011ab=_0x24c451(0x10e)[_0x24c451(0x34a)](_0x434356,_0x533cfe);ImageManager[_0x24c451(0x1ef)][_0x2011ab]=_0x35622c;}}},ImageManager[_0x152cc7(0x28e)]=function(_0x24e6b4){const _0x590fab=_0x152cc7;if(!_0x24e6b4)return'';const _0x47f446=_0x590fab(0x10e)[_0x590fab(0x34a)](_0x24e6b4['actorId'](),_0x24e6b4[_0x590fab(0x2c9)]()['id']);return ImageManager[_0x590fab(0x22c)][_0x47f446]??'';},ImageManager['getActorClassFaceIndex']=function(_0x28fe2a){const _0x1acede=_0x152cc7;if(!_0x28fe2a)return undefined;const _0x38290d=_0x1acede(0x10e)[_0x1acede(0x34a)](_0x28fe2a[_0x1acede(0x1d3)](),_0x28fe2a[_0x1acede(0x2c9)]()['id']);return ImageManager[_0x1acede(0xe2)][_0x38290d]??undefined;},ImageManager[_0x152cc7(0x289)]=function(_0x2e5604){const _0x4e27d0=_0x152cc7;if(!_0x2e5604)return'';const _0x6b4d2e=_0x4e27d0(0x10e)[_0x4e27d0(0x34a)](_0x2e5604[_0x4e27d0(0x1d3)](),_0x2e5604[_0x4e27d0(0x2c9)]()['id']);return ImageManager[_0x4e27d0(0x225)][_0x6b4d2e]??'';},ImageManager[_0x152cc7(0xd5)]=function(_0x9afcf3){const _0x198abf=_0x152cc7;if(!_0x9afcf3)return undefined;const _0x603c8b='Actor-%1-Class-%2'['format'](_0x9afcf3['actorId'](),_0x9afcf3[_0x198abf(0x2c9)]()['id']);return ImageManager[_0x198abf(0x32d)][_0x603c8b]??undefined;},ImageManager[_0x152cc7(0x2af)]=function(_0x266339){const _0x427eb2=_0x152cc7;if(!_0x266339)return'';const _0xedda3b=_0x427eb2(0x10e)['format'](_0x266339[_0x427eb2(0x1d3)](),_0x266339[_0x427eb2(0x2c9)]()['id']);return ImageManager[_0x427eb2(0x10b)][_0xedda3b]??'';},ImageManager['getActorClassMenuPortrait']=function(_0x446bb2){const _0x4c52bc=_0x152cc7;if(!_0x446bb2)return'';const _0x12bc1c=_0x4c52bc(0x10e)[_0x4c52bc(0x34a)](_0x446bb2[_0x4c52bc(0x1d3)](),_0x446bb2[_0x4c52bc(0x2c9)]()['id']);return ImageManager[_0x4c52bc(0x26d)][_0x12bc1c]??'';},ImageManager[_0x152cc7(0x184)]=function(_0x17fa1e){const _0x12d4e8=_0x152cc7;if(!_0x17fa1e)return'';const _0x5426e2=_0x12d4e8(0x10e)[_0x12d4e8(0x34a)](_0x17fa1e[_0x12d4e8(0x1d3)](),_0x17fa1e[_0x12d4e8(0x2c9)]()['id']);return ImageManager[_0x12d4e8(0x1ef)][_0x5426e2]??'';},SoundManager[_0x152cc7(0x2f4)]=function(_0x3cd4a2){const _0x3cb62d=_0x152cc7;AudioManager[_0x3cb62d(0x14b)](VisuMZ['ClassChangeSystem'][_0x3cb62d(0x1a0)]['ChangeClassSound']);},TextManager[_0x152cc7(0x1e5)]=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)]['MainMenu'][_0x152cc7(0x18d)],TextManager['classPointsFull']=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)]['ClassPoints'][_0x152cc7(0x17f)],TextManager[_0x152cc7(0x223)]=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0x2c6)][_0x152cc7(0x264)],TextManager[_0x152cc7(0x2a4)]=VisuMZ[_0x152cc7(0x1be)]['Settings']['ClassPoints'][_0x152cc7(0x2cd)],TextManager['jobPointsFull']=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0xb6)][_0x152cc7(0x17f)],TextManager['jobPointsAbbr']=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0xb6)][_0x152cc7(0x264)],TextManager[_0x152cc7(0x1d9)]=VisuMZ[_0x152cc7(0x1be)]['Settings'][_0x152cc7(0xb6)][_0x152cc7(0x2cd)],TextManager['classDescription']=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0xf2)]['HelpDescription'],TextManager['classChange_multiclass_noClass']=VisuMZ['ClassChangeSystem'][_0x152cc7(0x1a0)]['Window'][_0x152cc7(0x1b5)],TextManager['classChange_multiclass_ShiftHelp']=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0x307)]['ShiftButtonAssistText'],TextManager[_0x152cc7(0xe7)]=VisuMZ[_0x152cc7(0x1be)]['Settings'][_0x152cc7(0x307)][_0x152cc7(0xb2)],TextManager[_0x152cc7(0x27d)]=VisuMZ['ClassChangeSystem'][_0x152cc7(0x1a0)]['Window'][_0x152cc7(0x22a)],ColorManager[_0x152cc7(0x9b)]=function(_0x5d45ef){const _0x18cf78=_0x152cc7;return _0x5d45ef=String(_0x5d45ef),_0x5d45ef['match'](/#(.*)/i)?_0x18cf78(0x327)[_0x18cf78(0x34a)](String(RegExp['$1'])):this[_0x18cf78(0x173)](Number(_0x5d45ef));},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x211)]=BattleManager[_0x152cc7(0x1b7)],BattleManager[_0x152cc7(0x1b7)]=function(){const _0x1b3c03=_0x152cc7;VisuMZ[_0x1b3c03(0x1be)][_0x1b3c03(0x211)][_0x1b3c03(0x28f)](this),this[_0x1b3c03(0x2be)](),this[_0x1b3c03(0xbf)](),this[_0x1b3c03(0x24d)](),this[_0x1b3c03(0x24c)]();},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x310)]=BattleManager[_0x152cc7(0x170)],BattleManager[_0x152cc7(0x170)]=function(){const _0x14685d=_0x152cc7;VisuMZ[_0x14685d(0x1be)][_0x14685d(0x310)][_0x14685d(0x28f)](this),this[_0x14685d(0x14c)](),this[_0x14685d(0x27b)]();},VisuMZ['ClassChangeSystem'][_0x152cc7(0x334)]=BattleManager[_0x152cc7(0x2f3)],BattleManager[_0x152cc7(0x2f3)]=function(){const _0xf65f5b=_0x152cc7;VisuMZ[_0xf65f5b(0x1be)][_0xf65f5b(0x334)]['call'](this);const _0xe4ba0e=this[_0xf65f5b(0x256)][_0xf65f5b(0x2db)];for(const _0x4fefc2 of $gameParty[_0xf65f5b(0x302)]()){_0x4fefc2[_0xf65f5b(0x1bb)](_0xe4ba0e);}},VisuMZ['ClassChangeSystem'][_0x152cc7(0x1e3)]=BattleManager[_0x152cc7(0x123)],BattleManager[_0x152cc7(0x123)]=function(_0x350e99){const _0x2a1e25=_0x152cc7;VisuMZ[_0x2a1e25(0x1be)][_0x2a1e25(0x1e3)][_0x2a1e25(0x28f)](this,_0x350e99);for(const _0x15f65f of $gameParty[_0x2a1e25(0x302)]()){_0x15f65f[_0x2a1e25(0x283)]();}},BattleManager[_0x152cc7(0x2be)]=function(){const _0xa51fdf=_0x152cc7;this['_rewards'][_0xa51fdf(0x2ec)]=$gameTroop[_0xa51fdf(0xfa)]();},BattleManager[_0x152cc7(0x14c)]=function(){const _0x5723a1=_0x152cc7;if(!this['classPointsVisible']())return;$gameMessage[_0x5723a1(0xd8)]();const _0x4b020f=$gameParty[_0x5723a1(0xe6)](),_0x3bd45c=VisuMZ[_0x5723a1(0x1be)][_0x5723a1(0x1a0)][_0x5723a1(0x2c6)],_0x4d21b9=_0x3bd45c[_0x5723a1(0x239)];for(const _0x9d62e3 of _0x4b020f){if(!_0x9d62e3)continue;const _0x3193dd=_0x4d21b9[_0x5723a1(0x34a)](_0x9d62e3[_0x5723a1(0x242)](),_0x9d62e3[_0x5723a1(0x325)](),TextManager[_0x5723a1(0x223)],TextManager['classPointsFmt']);$gameMessage['add']('\x5c.'+_0x3193dd);}},BattleManager['gainRewardsClassPoints']=function(){const _0x48e83=_0x152cc7;this['_rewards'][_0x48e83(0x2ec)]=this['_rewards'][_0x48e83(0x2ec)]||0x0;let _0x578fa3=$gameParty[_0x48e83(0x302)]();VisuMZ['ClassChangeSystem'][_0x48e83(0x1a0)][_0x48e83(0x2c6)][_0x48e83(0x18e)]&&(_0x578fa3=_0x578fa3[_0x48e83(0x301)](_0x3076b4=>_0x3076b4[_0x48e83(0x2ce)]()));for(const _0x3efe51 of _0x578fa3){if(!_0x3efe51)continue;if(!$dataSystem['optExtraExp']&&!_0x3efe51['isBattleMember']())continue;_0x3efe51[_0x48e83(0x13f)](this[_0x48e83(0x256)][_0x48e83(0x2ec)]),_0x3efe51[_0x48e83(0x19b)](this['_rewards'][_0x48e83(0x2ec)]);}},BattleManager['classPointsVisible']=function(){const _0x59b628=_0x152cc7;return VisuMZ[_0x59b628(0x1be)]['Settings']['ClassPoints'][_0x59b628(0x19f)];},BattleManager['makeRewardsJobPoints']=function(){const _0x3a11f2=_0x152cc7;this['_rewards']['jobPoints']=$gameTroop[_0x3a11f2(0xf1)]();},BattleManager[_0x152cc7(0x27b)]=function(){const _0x49c5ab=_0x152cc7;if(!this['jobPointsVisible']())return;$gameMessage[_0x49c5ab(0xd8)]();const _0x2157d5=$gameParty['members'](),_0x36e49e=VisuMZ[_0x49c5ab(0x1be)][_0x49c5ab(0x1a0)][_0x49c5ab(0xb6)],_0x215a0b=_0x36e49e[_0x49c5ab(0x239)];for(const _0x46a128 of _0x2157d5){if(!_0x46a128)continue;const _0x3e0695=_0x215a0b[_0x49c5ab(0x34a)](_0x46a128[_0x49c5ab(0x242)](),_0x46a128[_0x49c5ab(0x21e)](),TextManager['jobPointsAbbr'],TextManager[_0x49c5ab(0x1d9)]);$gameMessage[_0x49c5ab(0x117)]('\x5c.'+_0x3e0695);}},BattleManager[_0x152cc7(0x24c)]=function(){const _0x59b12b=_0x152cc7;this[_0x59b12b(0x256)]['jobPoints']=this['_rewards'][_0x59b12b(0x193)]||0x0;let _0x480890=$gameParty[_0x59b12b(0x302)]();VisuMZ['ClassChangeSystem'][_0x59b12b(0x1a0)]['JobPoints'][_0x59b12b(0x18e)]&&(_0x480890=_0x480890[_0x59b12b(0x301)](_0x46183=>_0x46183[_0x59b12b(0x2ce)]()));for(const _0x51eec5 of _0x480890){if(!_0x51eec5)continue;if(!$dataSystem[_0x59b12b(0x11b)]&&!_0x51eec5[_0x59b12b(0x18a)]())continue;_0x51eec5[_0x59b12b(0x2b3)](this[_0x59b12b(0x256)][_0x59b12b(0x193)]),_0x51eec5[_0x59b12b(0x2d9)](this[_0x59b12b(0x256)][_0x59b12b(0x193)]);}},BattleManager[_0x152cc7(0x138)]=function(){const _0x55fe74=_0x152cc7;return VisuMZ[_0x55fe74(0x1be)][_0x55fe74(0x1a0)][_0x55fe74(0xb6)]['ShowVictory'];},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0xf4)]=Game_System[_0x152cc7(0x20e)]['initialize'],Game_System[_0x152cc7(0x20e)][_0x152cc7(0x287)]=function(){const _0x3619b6=_0x152cc7;VisuMZ['ClassChangeSystem']['Game_System_initialize'][_0x3619b6(0x28f)](this),this[_0x3619b6(0xdf)]();},Game_System[_0x152cc7(0x20e)]['initClassChangeSystemMainMenu']=function(){const _0x2ef303=_0x152cc7;this[_0x2ef303(0x166)]={'shown':VisuMZ[_0x2ef303(0x1be)][_0x2ef303(0x1a0)][_0x2ef303(0x286)]['ShowMainMenu'],'enabled':VisuMZ[_0x2ef303(0x1be)][_0x2ef303(0x1a0)][_0x2ef303(0x286)][_0x2ef303(0x26e)]};},Game_System[_0x152cc7(0x20e)][_0x152cc7(0xc8)]=function(){const _0x5a2b40=_0x152cc7;if(this[_0x5a2b40(0x166)]===undefined)this[_0x5a2b40(0xdf)]();return this[_0x5a2b40(0x166)][_0x5a2b40(0x33a)];},Game_System['prototype'][_0x152cc7(0x1b4)]=function(_0x3b6a33){const _0x2bdbdd=_0x152cc7;if(this[_0x2bdbdd(0x166)]===undefined)this['initClassChangeSystemMainMenu']();this[_0x2bdbdd(0x166)][_0x2bdbdd(0x33a)]=_0x3b6a33;},Game_System[_0x152cc7(0x20e)][_0x152cc7(0x105)]=function(){const _0x3280bc=_0x152cc7;if(this[_0x3280bc(0x166)]===undefined)this[_0x3280bc(0xdf)]();return this[_0x3280bc(0x166)][_0x3280bc(0x1b1)];},Game_System[_0x152cc7(0x20e)][_0x152cc7(0x1af)]=function(_0x198fe9){const _0x4bb951=_0x152cc7;if(this[_0x4bb951(0x166)]===undefined)this['initClassChangeSystemMainMenu']();this[_0x4bb951(0x166)][_0x4bb951(0x1b1)]=_0x198fe9;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1d2)]=Game_Action[_0x152cc7(0x20e)][_0x152cc7(0x1e8)],Game_Action[_0x152cc7(0x20e)][_0x152cc7(0x1e8)]=function(_0x49fa27){const _0x39be1a=_0x152cc7;VisuMZ[_0x39be1a(0x1be)][_0x39be1a(0x1d2)][_0x39be1a(0x28f)](this,_0x49fa27),this[_0x39be1a(0x1a7)](_0x49fa27);},Game_Action[_0x152cc7(0x20e)][_0x152cc7(0x1a7)]=function(_0x2a6113){if(this['item']())this['applyItemClassChangeSystemUserEffect'](_0x2a6113);},Game_Action[_0x152cc7(0x20e)][_0x152cc7(0x141)]=function(_0x2a21db){const _0x487541=_0x152cc7,_0x3d8cfc=VisuMZ['ClassChangeSystem']['RegExp'],_0x373d7f=this['item']()[_0x487541(0x2a6)];if($gameParty[_0x487541(0x361)]()){if(this['subject']()[_0x487541(0x326)]()&&_0x373d7f['match'](_0x3d8cfc[_0x487541(0x282)])){const _0x30834d=eval(RegExp['$1']);this[_0x487541(0x178)]()['gainClassPoints'](_0x30834d);}else this[_0x487541(0x1f4)]();if(_0x2a21db[_0x487541(0x326)]()&&_0x373d7f[_0x487541(0x2fa)](_0x3d8cfc[_0x487541(0xb3)])){const _0x4534bd=eval(RegExp['$1']);_0x2a21db[_0x487541(0x13f)](_0x4534bd);}}if($gameParty[_0x487541(0x361)]()){if(this['subject']()[_0x487541(0x326)]()&&_0x373d7f['match'](_0x3d8cfc[_0x487541(0x190)])){const _0x56db34=eval(RegExp['$1']);this[_0x487541(0x178)]()[_0x487541(0x2b3)](_0x56db34);}else this[_0x487541(0x272)]();if(_0x2a21db['isActor']()&&_0x373d7f[_0x487541(0x2fa)](_0x3d8cfc[_0x487541(0x335)])){const _0x163a6b=eval(RegExp['$1']);_0x2a21db[_0x487541(0x2b3)](_0x163a6b);}}if(_0x373d7f[_0x487541(0x2fa)](/<NOTETAG>/i)){}},Game_Action[_0x152cc7(0x20e)]['applyClassPoints']=function(){const _0x484f0e=_0x152cc7;if(!$gameParty['inBattle']())return;if(!this[_0x484f0e(0x178)]()[_0x484f0e(0x326)]())return;const _0x47afcc=VisuMZ['ClassChangeSystem'][_0x484f0e(0x1a0)]['ClassPoints'];let _0x28e141=0x0;try{_0x28e141=eval(_0x47afcc['PerAction']);}catch(_0x47a286){if($gameTemp['isPlaytest']())console[_0x484f0e(0x212)](_0x47a286);}this[_0x484f0e(0x178)]()[_0x484f0e(0x13f)](_0x28e141);},Game_Action['prototype'][_0x152cc7(0x272)]=function(){const _0x378f4c=_0x152cc7;if(!$gameParty[_0x378f4c(0x361)]())return;if(!this[_0x378f4c(0x178)]()[_0x378f4c(0x326)]())return;const _0x325cdd=VisuMZ[_0x378f4c(0x1be)]['Settings'][_0x378f4c(0xb6)];let _0xb9269f=0x0;try{_0xb9269f=eval(_0x325cdd[_0x378f4c(0x156)]);}catch(_0x14a271){if($gameTemp['isPlaytest']())console['log'](_0x14a271);}this[_0x378f4c(0x178)]()[_0x378f4c(0x2b3)](_0xb9269f);},VisuMZ['ClassChangeSystem'][_0x152cc7(0x1d6)]=Game_Battler[_0x152cc7(0x20e)][_0x152cc7(0x157)],Game_Battler[_0x152cc7(0x20e)][_0x152cc7(0x157)]=function(_0x3300c4){const _0x52e54e=_0x152cc7;this[_0x52e54e(0x26b)]&&this[_0x52e54e(0x326)]()&&$gameParty[_0x52e54e(0x361)]()?this[_0x52e54e(0x234)]=(this[_0x52e54e(0x234)]+_0x3300c4)['clamp'](0x0,this[_0x52e54e(0x338)]()):VisuMZ['ClassChangeSystem']['Game_Battler_gainSilentTp'][_0x52e54e(0x28f)](this,_0x3300c4);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x136)]=Game_Actor[_0x152cc7(0x20e)]['equips'],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x14e)]=function(){const _0x4ea003=_0x152cc7;return VisuMZ['ClassChangeSystem'][_0x4ea003(0x2a0)](this)?VisuMZ[_0x4ea003(0x1a8)][_0x4ea003(0x136)][_0x4ea003(0x28f)](this):VisuMZ[_0x4ea003(0x1be)][_0x4ea003(0x136)][_0x4ea003(0x28f)](this);},VisuMZ['ClassChangeSystem'][_0x152cc7(0x2a0)]=function(_0x5b1c96){const _0x5e3c81=_0x152cc7;return Imported['VisuMZ_1_BattleCore']&&_0x5b1c96[_0x5e3c81(0x326)]()&&_0x5b1c96[_0x5e3c81(0x258)]!==undefined&&_0x5b1c96===BattleManager[_0x5e3c81(0x2f1)]&&$gameParty['inBattle']();},VisuMZ['ClassChangeSystem'][_0x152cc7(0x237)]=Game_Battler['prototype'][_0x152cc7(0x1aa)],Game_Battler[_0x152cc7(0x20e)][_0x152cc7(0x1aa)]=function(_0x5654b2){const _0x4fc368=_0x152cc7;VisuMZ['ClassChangeSystem']['Game_Battler_onBattleStart'][_0x4fc368(0x28f)](this,_0x5654b2),this[_0x4fc368(0x326)]()&&(this[_0x4fc368(0xd6)]=this[_0x4fc368(0x349)](),this['_earnedJobPoints']=this[_0x4fc368(0x246)]());},Game_Actor[_0x152cc7(0x342)]=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0xf2)][_0x152cc7(0xff)],VisuMZ['ClassChangeSystem'][_0x152cc7(0x2f5)]=Game_Actor['prototype'][_0x152cc7(0x359)],Game_Actor['prototype'][_0x152cc7(0x359)]=function(_0x1b4010){const _0xff5d05=_0x152cc7;VisuMZ[_0xff5d05(0x1be)][_0xff5d05(0x2f5)][_0xff5d05(0x28f)](this,_0x1b4010),this[_0xff5d05(0x1e1)](),this[_0xff5d05(0x180)](),this[_0xff5d05(0x1eb)](),this[_0xff5d05(0x1fb)](),this[_0xff5d05(0xcb)]();},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0xcb)]=function(){const _0x2ccd73=_0x152cc7;this['initClassChangeUnlocks'](),this[_0x2ccd73(0xa8)](),this[_0x2ccd73(0xf5)](),this['initClassChangeRestrictions'](),this['updateClassLearnedSkills'](),this[_0x2ccd73(0xa1)](),this[_0x2ccd73(0x112)](),this[_0x2ccd73(0xf3)]();},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x330)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x10d)],Game_Actor[_0x152cc7(0x20e)]['changeClass']=function(_0x5cf11b,_0x48eee8){const _0x36463e=_0x152cc7;_0x48eee8=this[_0x36463e(0x2a8)]();_0x48eee8&&(this[_0x36463e(0x250)]=this[_0x36463e(0x250)]||{},this['_exp'][_0x5cf11b]=this[_0x36463e(0x250)][this[_0x36463e(0x11e)]]||0x0,_0x48eee8=![]);this[_0x36463e(0x9d)]=!![];const _0x57adf1=JsonEx[_0x36463e(0x364)](this);_0x57adf1['_tempActor']=!![],VisuMZ[_0x36463e(0x1be)][_0x36463e(0x330)]['call'](this,_0x5cf11b,_0x48eee8),this[_0x36463e(0x1c0)](_0x57adf1),this['checkMulticlasses'](),this[_0x36463e(0xc4)](_0x5cf11b),this[_0x36463e(0x9d)]=undefined;if($gamePlayer)$gamePlayer['refresh']();},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1d8)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2fe)],Game_Actor[_0x152cc7(0x20e)]['tradeItemWithParty']=function(_0x53c06a,_0x2a8719){const _0x608d7d=_0x152cc7;if(this[_0x608d7d(0x2b5)])return![];return VisuMZ[_0x608d7d(0x1be)][_0x608d7d(0x1d8)][_0x608d7d(0x28f)](this,_0x53c06a,_0x2a8719);},VisuMZ[_0x152cc7(0x1be)]['Game_Actor_releaseUnequippableItems']=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x358)],Game_Actor['prototype'][_0x152cc7(0x358)]=function(_0x3bc29a){const _0x2693ba=_0x152cc7;if($gameParty[_0x2693ba(0x361)]())return;VisuMZ['ClassChangeSystem'][_0x2693ba(0xb4)][_0x2693ba(0x28f)](this,_0x3bc29a);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x2ed)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x217)],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x217)]=function(){const _0x34dd97=_0x152cc7;VisuMZ[_0x34dd97(0x1be)][_0x34dd97(0x2ed)][_0x34dd97(0x28f)](this);const _0x4265bb=this[_0x34dd97(0x2c9)]()['id'];this[_0x34dd97(0x101)](_0x4265bb),this[_0x34dd97(0x1a5)](_0x4265bb),this[_0x34dd97(0x1c8)]=this[_0x34dd97(0x1c8)]||{},this[_0x34dd97(0x1c8)][_0x4265bb]=this[_0x34dd97(0x153)],this[_0x34dd97(0x2a8)]()&&this[_0x34dd97(0xab)]();},Game_Actor['prototype']['classAdjustHpMp']=function(_0x426a81){const _0x1d830c=_0x152cc7;if(!Game_Actor[_0x1d830c(0x342)])return;const _0x5198d2=Math['round'](_0x426a81[_0x1d830c(0x162)]()*this[_0x1d830c(0xa7)]),_0x150f76=Math['round'](_0x426a81[_0x1d830c(0x145)]()*this['mmp']);if(this['hp']>0x0)this['setHp'](_0x5198d2);if(this['mp']>0x0)this[_0x1d830c(0x304)](_0x150f76);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x1e1)]=function(){this['_classPoints']={};},Game_Actor['prototype']['gainStartingClassPoints']=function(){const _0x238407=_0x152cc7,_0x2928ff=VisuMZ['ClassChangeSystem'][_0x238407(0x2f2)],_0x2d88de=this['actor']()[_0x238407(0x2a6)];if(_0x2d88de[_0x238407(0x2fa)](_0x2928ff[_0x238407(0x2d8)])){const _0x32fa1b=eval(RegExp['$1']);this['gainClassPoints'](_0x32fa1b);}const _0x2e108d=VisuMZ[_0x238407(0x1be)]['Settings'][_0x238407(0x2c6)];if(!_0x2e108d[_0x238407(0x2e5)])return;const _0x2b7c1d=_0x2d88de[_0x238407(0x2fa)](_0x2928ff[_0x238407(0x317)]);if(_0x2b7c1d)for(const _0x18dbc4 of _0x2b7c1d){if(!_0x18dbc4)continue;_0x18dbc4[_0x238407(0x2fa)](_0x2928ff['StartClassClassPoints']);const _0x466ef4=String(RegExp['$1']),_0x370727=eval(RegExp['$2']),_0x279907=/^\d+$/['test'](_0x466ef4);let _0x2f27f7=0x0;_0x279907?_0x2f27f7=Number(_0x466ef4):_0x2f27f7=DataManager[_0x238407(0x16d)](_0x466ef4),this['gainClassPoints'](_0x370727,_0x2f27f7);}},Game_Actor['prototype'][_0x152cc7(0x349)]=function(_0x11a119){const _0x206778=_0x152cc7;this[_0x206778(0x354)]===undefined&&this[_0x206778(0x1e1)]();const _0x986d0b=VisuMZ[_0x206778(0x1be)][_0x206778(0x1a0)]['ClassPoints'];return _0x986d0b[_0x206778(0x2e5)]?_0x11a119=0x0:_0x11a119=_0x11a119||this['currentClass']()['id'],this['_classPoints'][_0x11a119]=this[_0x206778(0x354)][_0x11a119]||0x0,Math['round'](this[_0x206778(0x354)][_0x11a119]);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x362)]=function(_0x1b5edc,_0x35a32e){const _0x459c83=_0x152cc7;this[_0x459c83(0x354)]===undefined&&this[_0x459c83(0x1e1)]();const _0x5e946d=VisuMZ[_0x459c83(0x1be)][_0x459c83(0x1a0)][_0x459c83(0x2c6)];_0x5e946d['SharedResource']?_0x35a32e=0x0:_0x35a32e=_0x35a32e||this[_0x459c83(0x2c9)]()['id'];this[_0x459c83(0x354)][_0x35a32e]=this['_classPoints'][_0x35a32e]||0x0,this[_0x459c83(0x354)][_0x35a32e]=Math[_0x459c83(0x1a9)](_0x1b5edc||0x0);const _0x19aad0=_0x5e946d[_0x459c83(0x16b)]||Number[_0x459c83(0x1c7)];this['_classPoints'][_0x35a32e]=this[_0x459c83(0x354)][_0x35a32e][_0x459c83(0x26c)](0x0,_0x19aad0);},Game_Actor['prototype'][_0x152cc7(0x13f)]=function(_0x2d6a69,_0x20ba33){const _0x5bfece=_0x152cc7;_0x2d6a69>0x0&&(_0x2d6a69*=this[_0x5bfece(0xaa)]()),this[_0x5bfece(0x240)](_0x2d6a69,_0x20ba33);},Game_Actor['prototype'][_0x152cc7(0x19b)]=function(_0x2e0f3c){const _0x5342ec=_0x152cc7;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x2e0f3c>0x0&&(_0x2e0f3c*=this[_0x5342ec(0xaa)]()),this[_0x5342ec(0x17a)](_0x2e0f3c,_0x5342ec(0x1ca));},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x240)]=function(_0xb412f7,_0x1632b7){const _0x5a7be7=_0x152cc7,_0x2bc01a=VisuMZ[_0x5a7be7(0x1be)]['Settings'][_0x5a7be7(0x2c6)];_0x2bc01a[_0x5a7be7(0x2e5)]?_0x1632b7=0x0:_0x1632b7=_0x1632b7||this[_0x5a7be7(0x2c9)]()['id'],_0xb412f7+=this[_0x5a7be7(0x349)](_0x1632b7),this[_0x5a7be7(0x362)](_0xb412f7,_0x1632b7);},Game_Actor[_0x152cc7(0x20e)]['loseClassPoints']=function(_0x38f002,_0x40cb43){const _0x231339=_0x152cc7;this[_0x231339(0x240)](-_0x38f002,_0x40cb43);},Game_Actor['prototype'][_0x152cc7(0xaa)]=function(){const _0x8b6985=_0x152cc7,_0x16ada8=VisuMZ[_0x8b6985(0x1be)]['RegExp'],_0x4d8254=this['traitObjects']()[_0x8b6985(0x116)](null)['remove'](undefined);let _0x3012fe=0x1;return _0x3012fe=_0x4d8254['reduce']((_0x2f74f4,_0x5b1104)=>{const _0x485d0b=_0x8b6985;return _0x5b1104&&_0x5b1104[_0x485d0b(0x2a6)][_0x485d0b(0x2fa)](_0x16ada8['ClassPointsPlus'])?_0x2f74f4+Number(RegExp['$1'])*0.01:_0x2f74f4;},_0x3012fe),_0x3012fe=_0x4d8254[_0x8b6985(0x227)]((_0x34375f,_0x2c8f96)=>{const _0x28908b=_0x8b6985;return _0x2c8f96&&_0x2c8f96[_0x28908b(0x2a6)]['match'](_0x16ada8[_0x28908b(0x315)])?_0x34375f*(Number(RegExp['$1'])*0.01):_0x34375f;},_0x3012fe),_0x3012fe=_0x4d8254[_0x8b6985(0x227)]((_0x3ca561,_0x41201f)=>{const _0x37fe6f=_0x8b6985;return _0x41201f&&_0x41201f['note'][_0x37fe6f(0x2fa)](_0x16ada8[_0x37fe6f(0xa0)])?_0x3ca561+Number(RegExp['$1'])*0.01:_0x3ca561;},_0x3012fe),_0x3012fe;},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x101)]=function(_0x703799){const _0x1b56d7=_0x152cc7;if(this['_ClassChangeSystem_preventLevelUpGain'])return;const _0xa8d11c=VisuMZ[_0x1b56d7(0x1be)][_0x1b56d7(0x1a0)]['ClassPoints'];let _0x384873=0x0;try{_0x384873=eval(_0xa8d11c[_0x1b56d7(0x34b)]);}catch(_0x456744){if($gameTemp[_0x1b56d7(0x23e)]())console[_0x1b56d7(0x212)](_0x456744);}this[_0x1b56d7(0x13f)](_0x384873,_0x703799);},Game_Actor[_0x152cc7(0x20e)]['earnedClassPoints']=function(){const _0x2a2a6c=_0x152cc7;return this[_0x2a2a6c(0xd6)]=this['_earnedClassPoints']||0x0,this[_0x2a2a6c(0x349)]()-this[_0x2a2a6c(0xd6)];},Game_Actor['prototype'][_0x152cc7(0x1eb)]=function(){const _0x5eeb86=_0x152cc7;this[_0x5eeb86(0x1a1)]={};},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x1fb)]=function(){const _0x4aad8c=_0x152cc7,_0x5b1200=VisuMZ[_0x4aad8c(0x1be)][_0x4aad8c(0x2f2)],_0x59a0e4=this[_0x4aad8c(0x210)]()['note'];if(_0x59a0e4['match'](_0x5b1200['StartingJobPoints'])){const _0x5cc00e=eval(RegExp['$1']);this[_0x4aad8c(0x2b3)](_0x5cc00e);}const _0x276b02=VisuMZ[_0x4aad8c(0x1be)][_0x4aad8c(0x1a0)][_0x4aad8c(0xb6)];if(!_0x276b02[_0x4aad8c(0x2e5)])return;const _0x4c9c91=_0x59a0e4[_0x4aad8c(0x2fa)](_0x5b1200[_0x4aad8c(0x329)]);if(_0x4c9c91)for(const _0x3db0a8 of _0x4c9c91){if(!_0x3db0a8)continue;_0x3db0a8[_0x4aad8c(0x2fa)](_0x5b1200['StartClassJobPoints']);const _0x507893=String(RegExp['$1']),_0x3232ff=eval(RegExp['$2']),_0x52090d=/^\d+$/[_0x4aad8c(0xb8)](_0x507893);let _0x2e2d3c=0x0;_0x52090d?_0x2e2d3c=Number(_0x507893):_0x2e2d3c=DataManager[_0x4aad8c(0x16d)](_0x507893),this[_0x4aad8c(0x2b3)](_0x3232ff,_0x2e2d3c);}},Game_Actor['prototype'][_0x152cc7(0x246)]=function(_0x1989a2){const _0x420e60=_0x152cc7;this[_0x420e60(0x1a1)]===undefined&&this['initJobPoints']();const _0x2f2ab5=VisuMZ['ClassChangeSystem'][_0x420e60(0x1a0)]['JobPoints'];return _0x2f2ab5[_0x420e60(0x2e5)]?_0x1989a2=0x0:_0x1989a2=_0x1989a2||this['currentClass']()['id'],this[_0x420e60(0x1a1)][_0x1989a2]=this['_jobPoints'][_0x1989a2]||0x0,Math[_0x420e60(0x1a9)](this[_0x420e60(0x1a1)][_0x1989a2]);},Game_Actor['prototype'][_0x152cc7(0x341)]=function(_0x1526fb,_0x5c56fd){const _0x5c68f5=_0x152cc7;this[_0x5c68f5(0x1a1)]===undefined&&this[_0x5c68f5(0x1eb)]();const _0x6e5639=VisuMZ[_0x5c68f5(0x1be)][_0x5c68f5(0x1a0)][_0x5c68f5(0xb6)];_0x6e5639[_0x5c68f5(0x2e5)]?_0x5c56fd=0x0:_0x5c56fd=_0x5c56fd||this['currentClass']()['id'];this[_0x5c68f5(0x1a1)][_0x5c56fd]=this['_jobPoints'][_0x5c56fd]||0x0,this[_0x5c68f5(0x1a1)][_0x5c56fd]=Math['round'](_0x1526fb||0x0);const _0x592158=_0x6e5639['MaxResource']||Number['MAX_SAFE_INTEGER'];this[_0x5c68f5(0x1a1)][_0x5c56fd]=this['_jobPoints'][_0x5c56fd][_0x5c68f5(0x26c)](0x0,_0x592158);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2b3)]=function(_0x1ead49,_0x868feb){const _0x33d34c=_0x152cc7;_0x1ead49>0x0&&(_0x1ead49*=this[_0x33d34c(0x2da)]()),this[_0x33d34c(0x1bc)](_0x1ead49,_0x868feb);},Game_Actor['prototype']['gainJobPointsForMulticlasses']=function(_0x19dfb1){const _0x48bbb6=_0x152cc7;if(!Imported[_0x48bbb6(0x29d)])return;_0x19dfb1>0x0&&(_0x19dfb1*=this[_0x48bbb6(0x2da)]()),this[_0x48bbb6(0x17a)](_0x19dfb1,_0x48bbb6(0xf9));},Game_Actor['prototype'][_0x152cc7(0x1bc)]=function(_0x3fd09f,_0x5d21c9){const _0x2f8ba6=_0x152cc7,_0x356baa=VisuMZ[_0x2f8ba6(0x1be)][_0x2f8ba6(0x1a0)][_0x2f8ba6(0xb6)];_0x356baa[_0x2f8ba6(0x2e5)]?_0x5d21c9=0x0:_0x5d21c9=_0x5d21c9||this[_0x2f8ba6(0x2c9)]()['id'],_0x3fd09f+=this[_0x2f8ba6(0x246)](_0x5d21c9),this[_0x2f8ba6(0x341)](_0x3fd09f,_0x5d21c9);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x320)]=function(_0x59b2a1,_0x2e40f8){const _0x343073=_0x152cc7;this[_0x343073(0x1bc)](-_0x59b2a1,_0x2e40f8);},Game_Actor['prototype']['jobPointsRate']=function(){const _0x4d6d37=_0x152cc7,_0x352fab=VisuMZ[_0x4d6d37(0x1be)][_0x4d6d37(0x2f2)],_0x38dd7f=this[_0x4d6d37(0x35e)]()[_0x4d6d37(0x116)](null)[_0x4d6d37(0x116)](undefined);let _0x37e084=0x1;return _0x37e084=_0x38dd7f[_0x4d6d37(0x227)]((_0x28c0b0,_0xdd77e3)=>{const _0x3790a4=_0x4d6d37;return _0xdd77e3&&_0xdd77e3[_0x3790a4(0x2a6)]['match'](_0x352fab[_0x3790a4(0x2f7)])?_0x28c0b0+Number(RegExp['$1'])*0.01:_0x28c0b0;},_0x37e084),_0x37e084=_0x38dd7f[_0x4d6d37(0x227)]((_0x2ef796,_0x1e3db7)=>{const _0x205a73=_0x4d6d37;return _0x1e3db7&&_0x1e3db7[_0x205a73(0x2a6)][_0x205a73(0x2fa)](_0x352fab[_0x205a73(0x290)])?_0x2ef796*(Number(RegExp['$1'])*0.01):_0x2ef796;},_0x37e084),_0x37e084=_0x38dd7f[_0x4d6d37(0x227)]((_0x555919,_0xb735bd)=>{const _0x173502=_0x4d6d37;return _0xb735bd&&_0xb735bd[_0x173502(0x2a6)]['match'](_0x352fab[_0x173502(0x232)])?_0x555919+Number(RegExp['$1'])*0.01:_0x555919;},_0x37e084),_0x37e084;},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x1a5)]=function(_0x2b7085){const _0x1cac0f=_0x152cc7;if(this[_0x1cac0f(0x9d)])return;const _0x44459a=VisuMZ[_0x1cac0f(0x1be)][_0x1cac0f(0x1a0)][_0x1cac0f(0xb6)];let _0x24f363=0x0;try{_0x24f363=eval(_0x44459a[_0x1cac0f(0x34b)]);}catch(_0x487ee8){if($gameTemp[_0x1cac0f(0x23e)]())console[_0x1cac0f(0x212)](_0x487ee8);}this[_0x1cac0f(0x2b3)](_0x24f363,_0x2b7085);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x21e)]=function(){const _0x501bae=_0x152cc7;return this[_0x501bae(0x2bc)]=this[_0x501bae(0x2bc)]||0x0,this[_0x501bae(0x246)]()-this['_earnedJobPoints'];},VisuMZ[_0x152cc7(0x1be)]['Game_Actor_setFaceImage']=Game_Actor[_0x152cc7(0x20e)]['setFaceImage'],Game_Actor[_0x152cc7(0x20e)]['setFaceImage']=function(_0xccfc76,_0x31875f){const _0x124f66=_0x152cc7;_0xccfc76!==''?(this[_0x124f66(0x16a)]=_0xccfc76,this[_0x124f66(0xeb)]=_0x31875f):(this[_0x124f66(0x16a)]=undefined,this[_0x124f66(0xeb)]=undefined);},VisuMZ['ClassChangeSystem'][_0x152cc7(0x300)]=Game_Actor['prototype'][_0x152cc7(0xfd)],Game_Actor['prototype'][_0x152cc7(0xfd)]=function(){const _0x4f9fd8=_0x152cc7;if(this[_0x4f9fd8(0x16a)]!==undefined)return this['_priorityFaceName'];return ImageManager['getActorClassFaceName'](this)||VisuMZ[_0x4f9fd8(0x1be)][_0x4f9fd8(0x300)][_0x4f9fd8(0x28f)](this);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x20c)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x23a)],Game_Actor['prototype']['faceIndex']=function(){const _0x35b6bf=_0x152cc7;if(this['_priorityFaceIndex']!==undefined)return this[_0x35b6bf(0xeb)];const _0x12bb31=ImageManager[_0x35b6bf(0x9e)](this);if(_0x12bb31!==undefined)return _0x12bb31;return VisuMZ[_0x35b6bf(0x1be)]['Game_Actor_faceIndex']['call'](this);},VisuMZ['ClassChangeSystem'][_0x152cc7(0xf8)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x206)],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x206)]=function(_0x4187f1,_0x34e8ca){const _0x43b397=_0x152cc7;_0x4187f1!==''?(this[_0x43b397(0x1fd)]=_0x4187f1,this[_0x43b397(0x2dd)]=_0x34e8ca):(this['_priorityCharacterName']=undefined,this[_0x43b397(0x2dd)]=undefined);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x30b)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2a7)],Game_Actor[_0x152cc7(0x20e)]['characterName']=function(){const _0x58a479=_0x152cc7;if(this['_priorityCharacterName']!==undefined)return this['_priorityCharacterName'];return ImageManager[_0x58a479(0x289)](this)||VisuMZ['ClassChangeSystem']['Game_Actor_characterName'][_0x58a479(0x28f)](this);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x260)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x183)],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x183)]=function(){const _0x50d690=_0x152cc7;if(this[_0x50d690(0x2dd)]!==undefined)return this['_priorityCharacterIndex'];const _0xaa223e=ImageManager[_0x50d690(0xd5)](this);if(_0xaa223e!==undefined)return _0xaa223e;return VisuMZ[_0x50d690(0x1be)][_0x50d690(0x260)][_0x50d690(0x28f)](this);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0xa5)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x360)],Game_Actor[_0x152cc7(0x20e)]['setBattlerImage']=function(_0x5d9591){const _0xff3ed3=_0x152cc7;_0x5d9591!==''?this[_0xff3ed3(0x28b)]=_0x5d9591:this[_0xff3ed3(0x28b)]=undefined;},VisuMZ[_0x152cc7(0x1be)]['Game_Actor_battlerName']=Game_Actor['prototype']['battlerName'],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2b2)]=function(){const _0x5f5508=_0x152cc7;if(this[_0x5f5508(0x28b)]!==undefined)return this[_0x5f5508(0x28b)];return ImageManager[_0x5f5508(0x2af)](this)||VisuMZ[_0x5f5508(0x1be)][_0x5f5508(0x261)][_0x5f5508(0x28f)](this);;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x328)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x1a2)],Game_Actor[_0x152cc7(0x20e)]['setMenuImage']=function(_0x2e36c7){const _0x473583=_0x152cc7;_0x2e36c7!==''?this[_0x473583(0x284)]=_0x2e36c7:this['_priorityMenuImage']=undefined;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x25f)]=Game_Actor[_0x152cc7(0x20e)]['getMenuImage'],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x109)]=function(){const _0x2bb778=_0x152cc7;if(this[_0x2bb778(0x284)]!==undefined)return this['_priorityMenuImage'];if(!Imported['VisuMZ_1_MainMenuCore'])return'';return ImageManager[_0x2bb778(0x1a6)](this)||VisuMZ[_0x2bb778(0x1be)]['Game_Actor_getMenuImage'][_0x2bb778(0x28f)](this);;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x15b)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x27e)],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x27e)]=function(_0x5734fc){const _0x479d9e=_0x152cc7;_0x5734fc!==''?this[_0x479d9e(0x29f)]=_0x5734fc:this['_priorityBattlePortrait']=undefined;if(SceneManager[_0x479d9e(0x98)]()&&$gameParty[_0x479d9e(0x265)]()['includes'](this)){const _0x1d856b=SceneManager[_0x479d9e(0x23d)][_0x479d9e(0xd2)];if(_0x1d856b)_0x1d856b[_0x479d9e(0x20b)](this);}},VisuMZ['ClassChangeSystem'][_0x152cc7(0x35f)]=Game_Actor['prototype'][_0x152cc7(0xe1)],Game_Actor['prototype'][_0x152cc7(0xe1)]=function(){const _0x592529=_0x152cc7;if(this[_0x592529(0x29f)]!==undefined)return this[_0x592529(0x29f)];return ImageManager[_0x592529(0x184)](this)||VisuMZ[_0x592529(0x1be)][_0x592529(0x35f)]['call'](this);;},Game_Actor['prototype'][_0x152cc7(0x172)]=function(){const _0x606be7=_0x152cc7;this[_0x606be7(0x21d)]=[this[_0x606be7(0x2c9)]()['id']];const _0x59f0dd=VisuMZ[_0x606be7(0x1be)][_0x606be7(0x2f2)],_0x1deb83=this[_0x606be7(0x210)]()[_0x606be7(0x2a6)],_0x34a85d=_0x1deb83[_0x606be7(0x2fa)](_0x59f0dd['ActorUnlockedClasses']);if(_0x34a85d)for(const _0x3d9d30 of _0x34a85d){if(!_0x3d9d30)continue;_0x3d9d30['match'](_0x59f0dd[_0x606be7(0x196)]);const _0x5115b9=String(RegExp['$1'])[_0x606be7(0xc2)](',');for(let _0x4165b8 of _0x5115b9){_0x4165b8=(String(_0x4165b8)||'')[_0x606be7(0x25d)]();const _0x199ad6=/^\d+$/['test'](_0x4165b8);_0x199ad6?this[_0x606be7(0x21d)][_0x606be7(0x1f0)](Number(_0x4165b8)):this[_0x606be7(0x21d)][_0x606be7(0x1f0)](DataManager[_0x606be7(0x16d)](_0x4165b8));}}},Game_Actor[_0x152cc7(0x20e)]['getUnlockedClasses']=function(){const _0x462821=_0x152cc7;if(this['_unlockedClasses']===undefined)this[_0x462821(0x172)]();return this['_unlockedClasses'];},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x24b)]=function(_0x2fce55){const _0x9cc665=_0x152cc7;if(this[_0x9cc665(0x21d)]===undefined)this[_0x9cc665(0x172)]();if(this['_unlockedClasses']['includes'](_0x2fce55))return;this[_0x9cc665(0x21d)][_0x9cc665(0x1f0)](_0x2fce55),this['_unlockedClasses'][_0x9cc665(0x116)](0x0),this[_0x9cc665(0x21d)][_0x9cc665(0x297)](function(_0x5e5187,_0x370d62){return _0x5e5187-_0x370d62;});},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2b6)]=function(_0xa33d0a){const _0x5e2e9a=_0x152cc7;if(this['_unlockedClasses']===undefined)this[_0x5e2e9a(0x172)]();if(!this[_0x5e2e9a(0x21d)][_0x5e2e9a(0x12a)](_0xa33d0a))return;this[_0x5e2e9a(0x21d)]['remove'](_0xa33d0a)[_0x5e2e9a(0x116)](null),this['_unlockedClasses'][_0x5e2e9a(0x297)](function(_0x32e2bf,_0x2b5356){return _0x32e2bf-_0x2b5356;});},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0xc4)]=function(_0x37159f){const _0x3343e8=_0x152cc7;this[_0x3343e8(0x24b)](_0x37159f);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0xa8)]=function(){const _0x2f29e7=_0x152cc7;this[_0x2f29e7(0x1ff)]=VisuMZ[_0x2f29e7(0x1be)][_0x2f29e7(0x1a0)][_0x2f29e7(0xf2)]['StartingMulticlasses'],this[_0x2f29e7(0x22f)]=[this[_0x2f29e7(0x11e)]];const _0x6e615a=this[_0x2f29e7(0x210)]()[_0x2f29e7(0x2a6)],_0xe726b9=VisuMZ[_0x2f29e7(0x1be)][_0x2f29e7(0x2f2)];_0x6e615a['match'](_0xe726b9[_0x2f29e7(0xd7)])&&(this[_0x2f29e7(0x1ff)]=Number(RegExp['$1']));const _0x558721=_0x6e615a['match'](_0xe726b9['StartingClassTier']);if(_0x558721)for(const _0x33244a of _0x558721){if(!_0x33244a)continue;_0x33244a['match'](_0xe726b9[_0x2f29e7(0x11a)]);const _0x126b50=Number(RegExp['$1'])-0x1;if(_0x126b50+0x1>this[_0x2f29e7(0x1ff)])continue;let _0x4f68dc=(String(RegExp['$2'])||'')[_0x2f29e7(0x25d)]();const _0x43f255=/^\d+$/[_0x2f29e7(0xb8)](_0x4f68dc);_0x43f255?this[_0x2f29e7(0x22f)][_0x126b50]=Number(_0x4f68dc):this[_0x2f29e7(0x22f)][_0x126b50]=DataManager[_0x2f29e7(0x16d)](_0x4f68dc);}this[_0x2f29e7(0xdb)](),this['_multiclassTiers']=this[_0x2f29e7(0x1ff)][_0x2f29e7(0x26c)](0x1,VisuMZ['ClassChangeSystem'][_0x2f29e7(0x1a0)][_0x2f29e7(0x16c)][_0x2f29e7(0x149)]||0x1);for(const _0x508671 of this[_0x2f29e7(0x22f)]){this[_0x2f29e7(0x24b)](_0x508671);}},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x26f)]=function(){const _0x281199=_0x152cc7;if(this[_0x281199(0x22f)]===undefined)this[_0x281199(0xa8)]();return this[_0x281199(0x22f)][0x0]=this[_0x281199(0x11e)],this[_0x281199(0x22f)][_0x281199(0x301)](_0x197a60=>!!$dataClasses[_0x197a60])[_0x281199(0x167)](_0x553cf8=>$dataClasses[_0x553cf8]);},Game_Actor['prototype'][_0x152cc7(0x23b)]=function(){const _0x570a51=_0x152cc7;return this[_0x570a51(0x26f)]();},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x14f)]=function(_0x280c1d){const _0x518139=_0x152cc7;if(this[_0x518139(0x22f)]===undefined)this[_0x518139(0xa8)]();return _0x280c1d-=0x1,$dataClasses[this[_0x518139(0x22f)][_0x280c1d]]||null;},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2de)]=function(_0xd89eb2){const _0x2627db=_0x152cc7;return this[_0x2627db(0x14f)](_0xd89eb2);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x333)]=function(_0x4074f9){const _0x5caa87=this['getMulticlassAtTier'](_0x4074f9);return _0x5caa87?_0x5caa87['id']:0x0;},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0xea)]=function(){const _0x41a4c2=_0x152cc7;if(this['_multiclassTiers']===undefined)this[_0x41a4c2(0xa8)]();return this[_0x41a4c2(0x1ff)]=this[_0x41a4c2(0x1ff)][_0x41a4c2(0x26c)](0x1,VisuMZ[_0x41a4c2(0x1be)][_0x41a4c2(0x1a0)]['Multiclass'][_0x41a4c2(0x149)]||0x1),this[_0x41a4c2(0x1ff)];},Game_Actor['prototype']['setMulticlassTiers']=function(_0x5f04eb){const _0x2a83b4=_0x152cc7;if(this[_0x2a83b4(0x1ff)]===undefined)this[_0x2a83b4(0xa8)]();this['_multiclassTiers']=_0x5f04eb[_0x2a83b4(0x26c)](0x1,VisuMZ[_0x2a83b4(0x1be)]['Settings']['Multiclass'][_0x2a83b4(0x149)]||0x1);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2d1)]=function(_0xf2fb73){const _0x504799=_0x152cc7;_0xf2fb73+=this['totalMulticlass'](),this[_0x504799(0x191)](_0xf2fb73);},Game_Actor['prototype']['loseMulticlassTiers']=function(_0x17be4e){const _0x1390b8=_0x152cc7;_0x17be4e=this[_0x1390b8(0xea)]()-_0x17be4e,this[_0x1390b8(0x191)](_0x17be4e);},Game_Actor['prototype'][_0x152cc7(0xdb)]=function(){const _0x41c5c5=_0x152cc7;if(this['_multiclasses']===undefined)this[_0x41c5c5(0xa8)]();let _0x4d58bc=![];const _0x4d9704=this[_0x41c5c5(0xea)]();while(this['_multiclasses'][_0x41c5c5(0x149)]>_0x4d9704){_0x4d58bc=!![],this[_0x41c5c5(0x22f)]['pop']();}this[_0x41c5c5(0x22f)][0x0]=this['currentClass']()['id'];const _0x5d86e6=this['_multiclasses'][_0x41c5c5(0x149)];for(let _0x72163e=0x1;_0x72163e<_0x5d86e6;_0x72163e++){this['_multiclasses'][_0x72163e]===this['currentClass']()['id']&&(this['_multiclasses'][_0x72163e]=0x0,_0x4d58bc=!![]);}if(_0x4d58bc)this[_0x41c5c5(0xa1)]();},VisuMZ['ClassChangeSystem'][_0x152cc7(0x2d4)]=Game_BattlerBase['prototype']['elementRate'],Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x230)]=function(_0x22a878){const _0x4df1da=_0x152cc7;if(this[_0x4df1da(0x326)]())this['_multiclassCheck']=_0x4df1da(0x99);let _0x3a9a26=VisuMZ[_0x4df1da(0x1be)][_0x4df1da(0x2d4)][_0x4df1da(0x28f)](this,_0x22a878);if(this[_0x4df1da(0x326)]())this['_multiclassCheck']=undefined;return _0x3a9a26;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x257)]=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0xdc)],Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0xdc)]=function(_0x47a9d7){const _0x4e0237=_0x152cc7;if(this[_0x4e0237(0x326)]())this[_0x4e0237(0x258)]=_0x4e0237(0x2c0);let _0x33b44f=VisuMZ['ClassChangeSystem'][_0x4e0237(0x257)][_0x4e0237(0x28f)](this,_0x47a9d7);if(this[_0x4e0237(0x326)]())this[_0x4e0237(0x258)]=undefined;return _0x33b44f;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x31c)]=Game_BattlerBase['prototype'][_0x152cc7(0x29b)],Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x29b)]=function(_0x810eae){const _0x4b11f8=_0x152cc7;if(this[_0x4b11f8(0x326)]())this[_0x4b11f8(0x258)]=_0x4b11f8(0x2b8);let _0x313780=VisuMZ['ClassChangeSystem'][_0x4b11f8(0x31c)][_0x4b11f8(0x28f)](this,_0x810eae);if(this[_0x4b11f8(0x326)]())this[_0x4b11f8(0x258)]=undefined;return _0x313780;},VisuMZ[_0x152cc7(0x1be)]['Game_BattlerBase_stateResistSet']=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x344)],Game_BattlerBase['prototype']['stateResistSet']=function(){const _0x1054c9=_0x152cc7;if(this[_0x1054c9(0x326)]())this[_0x1054c9(0x258)]='StateResistance';let _0x53f067=VisuMZ[_0x1054c9(0x1be)][_0x1054c9(0x22d)][_0x1054c9(0x28f)](this);if(this[_0x1054c9(0x326)]())this[_0x1054c9(0x258)]=undefined;return _0x53f067;},VisuMZ['ClassChangeSystem'][_0x152cc7(0x1da)]=Game_BattlerBase[_0x152cc7(0x20e)]['paramRate'],Game_BattlerBase[_0x152cc7(0x20e)]['paramRate']=function(_0x1c2760){const _0x57e8f4=_0x152cc7;if(this[_0x57e8f4(0x326)]())this[_0x57e8f4(0x258)]=_0x57e8f4(0x160);let _0x58e26a=VisuMZ[_0x57e8f4(0x1be)]['Game_BattlerBase_paramRate'][_0x57e8f4(0x28f)](this,_0x1c2760);if(this[_0x57e8f4(0x326)]())this[_0x57e8f4(0x258)]=undefined;return _0x58e26a;},VisuMZ[_0x152cc7(0x1be)]['Game_BattlerBase_xparam']=Game_BattlerBase['prototype'][_0x152cc7(0x200)],Game_BattlerBase['prototype']['xparam']=function(_0x2bdbd6){const _0x29022c=_0x152cc7;if(this['isActor']())this[_0x29022c(0x258)]=_0x29022c(0xef);let _0x5791ab=VisuMZ[_0x29022c(0x1be)][_0x29022c(0xfc)][_0x29022c(0x28f)](this,_0x2bdbd6);if(this[_0x29022c(0x326)]())this[_0x29022c(0x258)]=undefined;return _0x5791ab;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x305)]=Game_BattlerBase['prototype'][_0x152cc7(0xfe)],Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0xfe)]=function(_0xc17b54){const _0x46e413=_0x152cc7;if(this['isActor']())this[_0x46e413(0x258)]=_0x46e413(0x12f);let _0x1fa4e3=VisuMZ[_0x46e413(0x1be)][_0x46e413(0x305)]['call'](this,_0xc17b54);if(this[_0x46e413(0x326)]())this[_0x46e413(0x258)]=undefined;return _0x1fa4e3;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1ce)]=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x2e4)],Game_BattlerBase['prototype'][_0x152cc7(0x2e4)]=function(){const _0x32cad4=_0x152cc7;if(this[_0x32cad4(0x326)]())this[_0x32cad4(0x258)]=_0x32cad4(0x222);let _0xe5aa74=VisuMZ[_0x32cad4(0x1be)]['Game_BattlerBase_attackElements'][_0x32cad4(0x28f)](this);if(this['isActor']())this[_0x32cad4(0x258)]=undefined;return _0xe5aa74;},VisuMZ[_0x152cc7(0x1be)]['Game_BattlerBase_attackStates']=Game_BattlerBase['prototype'][_0x152cc7(0x2c1)],Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x2c1)]=function(){const _0x2ee385=_0x152cc7;if(this['isActor']())this[_0x2ee385(0x258)]=_0x2ee385(0x128);let _0x53463b=VisuMZ[_0x2ee385(0x1be)][_0x2ee385(0x169)][_0x2ee385(0x28f)](this);if(this[_0x2ee385(0x326)]())this['_multiclassCheck']=undefined;return _0x53463b;},VisuMZ['ClassChangeSystem'][_0x152cc7(0x2e8)]=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x2cf)],Game_BattlerBase['prototype']['attackStatesRate']=function(_0x54afe4){const _0x5d92b2=_0x152cc7;if(this[_0x5d92b2(0x326)]())this[_0x5d92b2(0x258)]=_0x5d92b2(0x128);let _0x2899b4=VisuMZ[_0x5d92b2(0x1be)][_0x5d92b2(0x2e8)][_0x5d92b2(0x28f)](this,_0x54afe4);if(this['isActor']())this[_0x5d92b2(0x258)]=undefined;return _0x2899b4;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x10c)]=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x15f)],Game_BattlerBase['prototype'][_0x152cc7(0x15f)]=function(){const _0x22e166=_0x152cc7;if(this['isActor']())this['_multiclassCheck']=_0x22e166(0x1a4);let _0x37f7bf=VisuMZ[_0x22e166(0x1be)]['Game_BattlerBase_addedSkillTypes']['call'](this);if(this[_0x22e166(0x326)]())this[_0x22e166(0x258)]=undefined;return _0x37f7bf;},VisuMZ['ClassChangeSystem']['Game_BattlerBase_addedSkills']=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x163)],Game_BattlerBase['prototype']['addedSkills']=function(){const _0x16f48e=_0x152cc7;if(this[_0x16f48e(0x326)]())this['_multiclassCheck']='AddedSkills';let _0x480ce6=VisuMZ[_0x16f48e(0x1be)][_0x16f48e(0x2e9)][_0x16f48e(0x28f)](this);if(this[_0x16f48e(0x326)]())this['_multiclassCheck']=undefined;return _0x480ce6;},VisuMZ['ClassChangeSystem'][_0x152cc7(0x337)]=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x158)],Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x158)]=function(_0x4fdbf7){const _0x50f8ae=_0x152cc7;if(this[_0x50f8ae(0x326)]())this[_0x50f8ae(0x258)]=_0x50f8ae(0x274);let _0x4a49cf=VisuMZ['ClassChangeSystem']['Game_BattlerBase_isEquipWtypeOk']['call'](this,_0x4fdbf7);if(this[_0x50f8ae(0x326)]())this[_0x50f8ae(0x258)]=undefined;return _0x4a49cf;},VisuMZ['ClassChangeSystem'][_0x152cc7(0x221)]=Game_BattlerBase[_0x152cc7(0x20e)][_0x152cc7(0x131)],Game_BattlerBase['prototype'][_0x152cc7(0x131)]=function(_0x33626c){const _0x24710a=_0x152cc7;if(this[_0x24710a(0x326)]())this[_0x24710a(0x258)]=_0x24710a(0x30c);let _0x20d42a=VisuMZ['ClassChangeSystem'][_0x24710a(0x221)][_0x24710a(0x28f)](this,_0x33626c);if(this[_0x24710a(0x326)]())this[_0x24710a(0x258)]=undefined;return _0x20d42a;},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a3)]=Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x35e)],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x35e)]=function(){const _0x2302fe=_0x152cc7;let _0x3d2c15=VisuMZ[_0x2302fe(0x1be)]['Game_Actor_traitObjects'][_0x2302fe(0x28f)](this);return this['_multiclassCheck']&&(_0x3d2c15=this[_0x2302fe(0xda)](_0x3d2c15)),_0x3d2c15;},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0xda)]=function(_0x15277c){const _0x548820=_0x152cc7;if(this[_0x548820(0x22f)]===undefined)this[_0x548820(0xa8)]();const _0xcf2990=this[_0x548820(0x258)];let _0x33251f=_0x15277c['indexOf'](this[_0x548820(0x2c9)]());const _0x278462=VisuMZ[_0x548820(0x1be)][_0x548820(0x1a0)][_0x548820(0x16c)],_0x2a5603=_0x278462['length'];for(let _0x5e6c27=0x1;_0x5e6c27<_0x2a5603;_0x5e6c27++){let _0x348ae5=$dataClasses[this['_multiclasses'][_0x5e6c27]||0x0];if(!_0x348ae5)continue;if(_0x348ae5===this[_0x548820(0x2c9)]())continue;const _0x41c135=_0x278462[_0x5e6c27];if(!_0x41c135)continue;_0x41c135[this[_0x548820(0x258)]]&&_0x15277c[_0x548820(0x252)](++_0x33251f,0x0,_0x348ae5);}return _0x15277c;},Game_Actor[_0x152cc7(0x20e)]['gainMulticlassRewardPoints']=function(_0x1a2a0b,_0x898c55){const _0x4bcc5f=_0x152cc7;if(_0x1a2a0b<=0x0)return;if(!_0x898c55)return;if(!$dataSystem[_0x4bcc5f(0x11b)]&&!this['isBattleMember']())return;this['getMulticlasses']();const _0x5bc280=VisuMZ[_0x4bcc5f(0x1be)][_0x4bcc5f(0x1a0)][_0x4bcc5f(0x16c)],_0x12047e=_0x5bc280[_0x4bcc5f(0x149)];for(let _0x3f26f6=0x1;_0x3f26f6<_0x12047e;_0x3f26f6++){let _0x1bdb9b=$dataClasses[this[_0x4bcc5f(0x22f)][_0x3f26f6]||0x0];if(!_0x1bdb9b)continue;if(_0x1bdb9b===this[_0x4bcc5f(0x2c9)]())continue;const _0x8a05a7=_0x5bc280[_0x3f26f6];if(!_0x8a05a7)continue;if(this[_0x4bcc5f(0x1f3)[_0x4bcc5f(0x34a)](_0x898c55)]){const _0x25fa89=_0x8a05a7[_0x4bcc5f(0x31e)],_0x233338=_0x25fa89*_0x1a2a0b;this[_0x4bcc5f(0x1f3)[_0x4bcc5f(0x34a)](_0x898c55)](_0x233338,this[_0x4bcc5f(0x22f)][_0x3f26f6]);}}},Game_Actor['prototype'][_0x152cc7(0x1bb)]=function(_0x35ad4f){const _0x9e128=_0x152cc7;if(!_0x35ad4f)return;if(this[_0x9e128(0x2a8)]())return;this['getMulticlasses']();const _0x5a1bcc=VisuMZ[_0x9e128(0x1be)]['Settings'][_0x9e128(0x16c)],_0x2c8856=_0x5a1bcc[_0x9e128(0x149)];for(let _0x3c9418=0x1;_0x3c9418<_0x2c8856;_0x3c9418++){let _0x3b37f3=$dataClasses[this[_0x9e128(0x22f)][_0x3c9418]||0x0];if(!_0x3b37f3)continue;if(_0x3b37f3===this['currentClass']())continue;const _0x5e7f30=_0x5a1bcc[_0x3c9418];if(!_0x5e7f30)continue;const _0x239ab6=_0x5e7f30[_0x9e128(0x204)],_0x2f0d26=Math['round'](_0x35ad4f*_0x239ab6*this[_0x9e128(0x346)]()),_0x39b927=this[_0x9e128(0x22f)][_0x3c9418];this['_exp'][_0x39b927]=this[_0x9e128(0x250)][_0x39b927]||0x0;const _0x1a5cfb=this[_0x9e128(0x250)][_0x39b927]+_0x2f0d26;this['changeClassExp'](_0x1a5cfb,_0x39b927);}},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x119)]=function(_0x67457d,_0x5cf95f){const _0x15c45a=_0x152cc7;if(this[_0x15c45a(0x22f)]===undefined)this[_0x15c45a(0xa8)]();_0x5cf95f-=0x1;if(_0x67457d<=0x0&&_0x5cf95f<=0x0)return;this['unlockClass'](_0x67457d);const _0x468cc0=this[_0x15c45a(0x22f)][_0x15c45a(0x149)];for(let _0x30b28d=0x0;_0x30b28d<_0x468cc0;_0x30b28d++){this[_0x15c45a(0x22f)][_0x30b28d]===_0x67457d&&(this[_0x15c45a(0x22f)][_0x30b28d]=0x0);}this[_0x15c45a(0x22f)][0x0]=this[_0x15c45a(0x2c9)]()['id'];if(_0x5cf95f<=0x0){this['changeClass'](_0x67457d);return;}const _0x405fb9=JsonEx[_0x15c45a(0x364)](this);_0x405fb9[_0x15c45a(0x2b5)]=!![],this[_0x15c45a(0x22f)][_0x5cf95f]=_0x67457d,this['checkMulticlasses'](),this[_0x15c45a(0xa1)](),this['classAdjustHpMp'](_0x405fb9),this[_0x15c45a(0xdb)]();},Game_Actor[_0x152cc7(0x20e)]['findMulticlassTier']=function(_0x155502){const _0x579412=_0x152cc7;if(this['_multiclasses']===undefined)this[_0x579412(0xa8)]();return this[_0x579412(0x22f)][0x0]=this['currentClass']()['id'],this[_0x579412(0x22f)][_0x579412(0x29a)](_0x155502)+0x1;},Game_Actor[_0x152cc7(0x20e)]['initClassLevels']=function(){const _0x55f03c=_0x152cc7;this[_0x55f03c(0x1c8)]={},this[_0x55f03c(0x1c8)][this[_0x55f03c(0x2c9)]()['id']]=this[_0x55f03c(0x153)];},Game_Actor['prototype'][_0x152cc7(0x2a8)]=function(){const _0x50ca1e=_0x152cc7;return VisuMZ['ClassChangeSystem']['Settings'][_0x50ca1e(0xf2)][_0x50ca1e(0x182)];},Game_Actor['prototype'][_0x152cc7(0x19d)]=function(_0x26cb93){const _0x596203=_0x152cc7;if(this[_0x596203(0x2a8)]())return this[_0x596203(0x153)];return this[_0x596203(0x207)](_0x26cb93),this['_classLevel'][_0x26cb93];},Game_Actor['prototype'][_0x152cc7(0x215)]=function(_0x1ab721,_0x1386a8){const _0x5ddb0e=_0x152cc7;if(this[_0x5ddb0e(0x2a8)]())return this['changeExp'](_0x1ab721);this[_0x5ddb0e(0x250)][_0x1386a8]=Math[_0x5ddb0e(0x135)](_0x1ab721,0x0),this[_0x5ddb0e(0x207)](_0x1386a8);if(_0x1386a8===this[_0x5ddb0e(0x2c9)]()['id'])this[_0x5ddb0e(0xa1)]();},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x207)]=function(_0x47b44c){const _0x229141=_0x152cc7;if(this[_0x229141(0x2a8)]())return;this[_0x229141(0x250)][_0x47b44c]=this[_0x229141(0x250)][_0x47b44c]||0x0,this[_0x229141(0x1c8)]=this[_0x229141(0x1c8)]||{},this['_classLevel'][_0x47b44c]=this['_classLevel'][_0x47b44c]||0x1;while(!(this[_0x229141(0x1c8)][_0x47b44c]>=this[_0x229141(0x1b3)]())&&this[_0x229141(0x250)][_0x47b44c]>=this['nextClassLevelExp'](_0x47b44c,this[_0x229141(0x1c8)][_0x47b44c])){this['_classLevel'][_0x47b44c]+=0x1,this[_0x229141(0x1e6)](_0x47b44c);}while(this[_0x229141(0x250)][_0x47b44c]<this[_0x229141(0x2eb)](_0x47b44c,this[_0x229141(0x1c8)][_0x47b44c])){this[_0x229141(0x1c8)][_0x47b44c]-=0x1;}this['updateClassLearnedSkills']();},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x1d5)]=function(_0x280773,_0x3dea25){const _0x517a8a=_0x152cc7,_0x5a889c=$dataClasses[_0x280773],_0x56fb15=_0x5a889c[_0x517a8a(0x1c2)][0x0],_0x11ca8d=_0x5a889c['expParams'][0x1],_0x301ea4=_0x5a889c[_0x517a8a(0x1c2)][0x2],_0x20aa48=_0x5a889c[_0x517a8a(0x1c2)][0x3];return Math['round'](_0x56fb15*Math[_0x517a8a(0x2f6)](_0x3dea25-0x1,0.9+_0x301ea4/0xfa)*_0x3dea25*(_0x3dea25+0x1)/(0x6+Math[_0x517a8a(0x2f6)](_0x3dea25,0x2)/0x32/_0x20aa48)+(_0x3dea25-0x1)*_0x11ca8d);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x13b)]=function(_0x3dbc23,_0x3681eb){const _0x271a1d=_0x152cc7;return this[_0x271a1d(0x1d5)](_0x3dbc23,_0x3681eb+0x1);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x2eb)]=function(_0x106f9e,_0x39c109){const _0x1c5893=_0x152cc7;return this[_0x1c5893(0x1d5)](_0x106f9e,_0x39c109);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x1e6)]=function(_0x1bca28){const _0x28972f=_0x152cc7;this[_0x28972f(0x101)](_0x1bca28),this['levelUpGainJobPoints'](_0x1bca28),Imported[_0x28972f(0x110)]&&(this[_0x28972f(0x2bf)](_0x1bca28),this[_0x28972f(0x174)](_0x1bca28));},Game_Actor['prototype'][_0x152cc7(0xab)]=function(){const _0x314e06=_0x152cc7;if(this[_0x314e06(0x2d3)])return;this[_0x314e06(0x2d3)]=!![];const _0x39b96a=DataManager['getActorUnlockedClasses'](this);for(const _0x59ef75 of _0x39b96a){if(!_0x59ef75)continue;const _0x2f4acf=_0x59ef75['learnings'];if(!_0x2f4acf)continue;for(const _0x4cd051 of _0x2f4acf){if(this[_0x314e06(0x2d5)](_0x4cd051[_0x314e06(0x1db)]))continue;if(this[_0x314e06(0x19d)](_0x59ef75['id'])>=_0x4cd051[_0x314e06(0x153)]){const _0x1d5a8f=this[_0x314e06(0x26b)]||{};this[_0x314e06(0x332)](_0x4cd051[_0x314e06(0x1db)]),this['_cache']=_0x1d5a8f;}}}this[_0x314e06(0x2d3)]=![];},VisuMZ['ClassChangeSystem']['Game_Actor_paramBase']=Game_Actor[_0x152cc7(0x20e)]['paramBase'],Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x280)]=function(_0x37d07e){const _0x1f7ba3=_0x152cc7;let _0x3af61b=VisuMZ[_0x1f7ba3(0x1be)]['Game_Actor_paramBase'][_0x1f7ba3(0x28f)](this,_0x37d07e);this[_0x1f7ba3(0x26f)]();const _0x9d9e79=VisuMZ['ClassChangeSystem'][_0x1f7ba3(0x1a0)]['Multiclass'],_0x11e365='paramRate%1'[_0x1f7ba3(0x34a)](_0x37d07e),_0x5e765c=_0x9d9e79[_0x1f7ba3(0x149)];for(let _0x4974bb=0x1;_0x4974bb<_0x5e765c;_0x4974bb++){let _0x19f780=$dataClasses[this[_0x1f7ba3(0x22f)][_0x4974bb]||0x0];if(!_0x19f780)continue;if(_0x19f780===this[_0x1f7ba3(0x2c9)]())continue;const _0x1a3224=_0x9d9e79[_0x4974bb];if(!_0x1a3224)continue;const _0x1305fa=_0x1a3224[_0x11e365];_0x3af61b+=_0x1305fa*this[_0x1f7ba3(0xcc)](this[_0x1f7ba3(0x22f)][_0x4974bb],_0x37d07e);}return _0x3af61b;},Game_Actor[_0x152cc7(0x20e)]['paramBaseForClass']=function(_0x20922d,_0x4d83df){const _0x52989f=_0x152cc7,_0x135a2f=$dataClasses[_0x20922d],_0x29ed7e=this[_0x52989f(0x19d)](_0x20922d);if(_0x29ed7e>0x63){const _0x421c7f=_0x135a2f[_0x52989f(0x9f)][_0x4d83df][0x63],_0x124eb7=_0x135a2f[_0x52989f(0x9f)][_0x4d83df][0x62];return _0x421c7f+(_0x421c7f-_0x124eb7)*(_0x29ed7e-0x63);}else return _0x135a2f[_0x52989f(0x9f)][_0x4d83df][_0x29ed7e];},Game_Actor[_0x152cc7(0x20e)]['classExpRate']=function(_0x1104c9){const _0x70d32b=_0x152cc7;if(this['_classLevel'][_0x1104c9]>=this[_0x70d32b(0x1b3)]())return 0x1;const _0x49f00e=this[_0x70d32b(0x19d)](_0x1104c9),_0x19fd10=this[_0x70d32b(0x13b)](_0x1104c9,_0x49f00e)-this[_0x70d32b(0x2eb)](_0x1104c9,_0x49f00e);this[_0x70d32b(0x250)][_0x1104c9]=this[_0x70d32b(0x250)][_0x1104c9]||0x0;const _0x5e1db0=this[_0x70d32b(0x250)][_0x1104c9]-this['currentClassLevelExp'](_0x1104c9,_0x49f00e);return(_0x5e1db0/_0x19fd10)['clamp'](0x0,0x1);},Game_Actor[_0x152cc7(0x20e)][_0x152cc7(0x283)]=function(){const _0x1e46dc=_0x152cc7;for(;;){const _0x327a5e=DataManager[_0x1e46dc(0x2bd)](this);if(_0x327a5e['length']>0x0)for(const _0x636297 of _0x327a5e){this[_0x1e46dc(0x24b)](_0x636297);}else break;}},Game_Actor['prototype'][_0x152cc7(0x187)]=function(){const _0x194a71=_0x152cc7;let _0x1574e4=[];const _0x17229f=VisuMZ[_0x194a71(0x1be)][_0x194a71(0x2f2)],_0x3caaef=this[_0x194a71(0x210)]()[_0x194a71(0x2a6)],_0x23248a=_0x3caaef['match'](_0x17229f[_0x194a71(0x1ae)]);if(_0x23248a)for(const _0x2336f1 of _0x23248a){if(!_0x2336f1)continue;_0x2336f1[_0x194a71(0x2fa)](_0x17229f[_0x194a71(0x1ae)]);const _0x255764=String(RegExp['$1'])[_0x194a71(0xc2)](',')[_0x194a71(0x167)](_0x28ed82=>Number(_0x28ed82));_0x1574e4=_0x1574e4[_0x194a71(0x188)](_0x255764);}_0x1574e4=_0x1574e4[_0x194a71(0x301)]((_0xa161bf,_0x1dc649,_0x494132)=>_0x494132[_0x194a71(0x29a)](_0xa161bf)===_0x1dc649),_0x1574e4[_0x194a71(0x116)](null)['remove'](undefined),_0x1574e4[_0x194a71(0x297)]((_0x5a209c,_0x50ee3e)=>_0x5a209c-_0x50ee3e),this['_classChangeTierRestrictions']=_0x1574e4;},Game_Actor[_0x152cc7(0x20e)]['isClassChangeTierRestricted']=function(_0x46b241){const _0x2a6001=_0x152cc7;return this[_0x2a6001(0x303)]===undefined&&this[_0x2a6001(0x187)](),this[_0x2a6001(0x303)]['includes'](_0x46b241);},Game_Actor['prototype']['addClassChangeTierRestriction']=function(_0x36371e){const _0x243a90=_0x152cc7;this['_classChangeTierRestrictions']===undefined&&this[_0x243a90(0x187)]();if(this['_classChangeTierRestrictions']['includes'](_0x36371e))return;this['_classChangeTierRestrictions'][_0x243a90(0x1f0)](_0x36371e),this['_classChangeTierRestrictions']['sort']((_0x19261d,_0x1a1db1)=>_0x19261d-_0x1a1db1);},Game_Actor['prototype'][_0x152cc7(0x1cd)]=function(_0x31fba2){const _0x2ce5b7=_0x152cc7;this[_0x2ce5b7(0x303)]===undefined&&this[_0x2ce5b7(0x187)]();if(!this['_classChangeTierRestrictions'][_0x2ce5b7(0x12a)](_0x31fba2))return;this[_0x2ce5b7(0x303)]['remove'](_0x31fba2),this[_0x2ce5b7(0x303)][_0x2ce5b7(0x297)]((_0x370996,_0x17e02b)=>_0x370996-_0x17e02b);},Game_Enemy[_0x152cc7(0x20e)][_0x152cc7(0x2ec)]=function(){const _0x59ceab=_0x152cc7,_0x24d681=VisuMZ[_0x59ceab(0x1be)][_0x59ceab(0x1a0)]['ClassPoints'],_0x4e895a=VisuMZ[_0x59ceab(0x1be)][_0x59ceab(0x2f2)],_0x796913=this[_0x59ceab(0x114)]()['note'];if(_0x796913[_0x59ceab(0x2fa)](_0x4e895a[_0x59ceab(0xd9)]))try{return eval(RegExp['$1']);}catch(_0x2213ba){if($gameTemp[_0x59ceab(0x23e)]())console[_0x59ceab(0x212)](_0x2213ba);return 0x0;}try{return eval(_0x24d681['PerEnemy']);}catch(_0x120967){if($gameTemp[_0x59ceab(0x23e)]())console[_0x59ceab(0x212)](_0x120967);return 0x0;}},Game_Enemy[_0x152cc7(0x20e)][_0x152cc7(0x193)]=function(){const _0x3a4e71=_0x152cc7,_0x4fa787=VisuMZ['ClassChangeSystem'][_0x3a4e71(0x1a0)][_0x3a4e71(0xb6)],_0x4c4ced=VisuMZ[_0x3a4e71(0x1be)][_0x3a4e71(0x2f2)],_0x30a88a=this['enemy']()[_0x3a4e71(0x2a6)];if(_0x30a88a[_0x3a4e71(0x2fa)](_0x4c4ced[_0x3a4e71(0x2d7)]))try{return eval(RegExp['$1']);}catch(_0x3c75ae){if($gameTemp[_0x3a4e71(0x23e)]())console[_0x3a4e71(0x212)](_0x3c75ae);return 0x0;}try{return eval(_0x4fa787[_0x3a4e71(0x177)]);}catch(_0x43cde9){if($gameTemp['isPlaytest']())console['log'](_0x43cde9);return 0x0;}},VisuMZ['ClassChangeSystem'][_0x152cc7(0x2e7)]=Game_Party[_0x152cc7(0x20e)][_0x152cc7(0x287)],Game_Party[_0x152cc7(0x20e)][_0x152cc7(0x287)]=function(){const _0xc2f643=_0x152cc7;VisuMZ[_0xc2f643(0x1be)]['Game_Party_initialize'][_0xc2f643(0x28f)](this),this[_0xc2f643(0x172)]();},Game_Party[_0x152cc7(0x20e)][_0x152cc7(0x172)]=function(){const _0x865142=_0x152cc7;this[_0x865142(0x21d)]=[];},Game_Party[_0x152cc7(0x20e)][_0x152cc7(0x331)]=function(){const _0x7cccb8=_0x152cc7;if(this[_0x7cccb8(0x21d)]===undefined)this[_0x7cccb8(0x172)]();return this['_unlockedClasses'];},Game_Party[_0x152cc7(0x20e)][_0x152cc7(0x24b)]=function(_0x478bdb){const _0x5368df=_0x152cc7;for(const _0x1d1685 of this[_0x5368df(0x302)]()){if(!_0x1d1685)continue;_0x1d1685['unlockClass'](_0x478bdb);}if(this[_0x5368df(0x21d)]===undefined)this[_0x5368df(0x172)]();if(this[_0x5368df(0x21d)][_0x5368df(0x12a)](_0x478bdb))return;this['_unlockedClasses']['push'](_0x478bdb),this[_0x5368df(0x21d)][_0x5368df(0x297)](function(_0x59e7ad,_0x444c1a){return _0x59e7ad-_0x444c1a;});},Game_Party[_0x152cc7(0x20e)][_0x152cc7(0x2b6)]=function(_0x4eafa5){const _0x155d57=_0x152cc7;for(const _0x8f82b4 of this[_0x155d57(0x302)]()){if(!_0x8f82b4)continue;_0x8f82b4['removeUnlockedClass'](_0x4eafa5);}if(this[_0x155d57(0x21d)]===undefined)this[_0x155d57(0x172)]();if(!this['_unlockedClasses'][_0x155d57(0x12a)](_0x4eafa5))return;this['_unlockedClasses'][_0x155d57(0x116)](_0x4eafa5)[_0x155d57(0x116)](null),this[_0x155d57(0x21d)][_0x155d57(0x297)](function(_0x2a40d6,_0x5d75a0){return _0x2a40d6-_0x5d75a0;});},Game_Party[_0x152cc7(0x20e)]['highestMulticlassTier']=function(){const _0x526e96=_0x152cc7,_0x47c873=this[_0x526e96(0x302)]();return Math[_0x526e96(0x135)](...this[_0x526e96(0xe6)]()[_0x526e96(0x167)](_0x5c88f1=>_0x5c88f1['totalMulticlass']()));},Game_Troop[_0x152cc7(0x20e)][_0x152cc7(0xfa)]=function(){const _0x4369a6=_0x152cc7;return this[_0x4369a6(0x30a)]()['reduce']((_0x3e3632,_0x133c7c)=>_0x3e3632+_0x133c7c[_0x4369a6(0x2ec)](),0x0);},Game_Troop['prototype'][_0x152cc7(0xf1)]=function(){const _0x29d745=_0x152cc7;return this['deadMembers']()[_0x29d745(0x227)]((_0x3477b4,_0x548f7b)=>_0x3477b4+_0x548f7b[_0x29d745(0x193)](),0x0);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x259)]=Scene_Menu[_0x152cc7(0x20e)]['createCommandWindow'],Scene_Menu[_0x152cc7(0x20e)][_0x152cc7(0x285)]=function(){const _0x11bf38=_0x152cc7;VisuMZ['ClassChangeSystem']['Scene_Menu_createCommandWindow'][_0x11bf38(0x28f)](this);const _0x1cb750=this['_commandWindow'];_0x1cb750[_0x11bf38(0x1d7)](_0x11bf38(0x1be),this[_0x11bf38(0x124)][_0x11bf38(0x24e)](this));},VisuMZ[_0x152cc7(0x1be)]['Scene_Menu_onPersonalOk']=Scene_Menu[_0x152cc7(0x20e)][_0x152cc7(0x150)],Scene_Menu['prototype'][_0x152cc7(0x150)]=function(){const _0x295ec0=_0x152cc7;this[_0x295ec0(0x318)]['currentSymbol']()===_0x295ec0(0x1be)?SceneManager[_0x295ec0(0x1f0)](Scene_ClassChange):VisuMZ[_0x295ec0(0x1be)]['Scene_Menu_onPersonalOk']['call'](this);};function Scene_ClassChange(){const _0x1db1b2=_0x152cc7;this[_0x1db1b2(0x287)](...arguments);}Scene_ClassChange[_0x152cc7(0x20e)]=Object['create'](Scene_MenuBase[_0x152cc7(0x20e)]),Scene_ClassChange['prototype']['constructor']=Scene_ClassChange,Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x287)]=function(){const _0x11cd11=_0x152cc7;Scene_MenuBase[_0x11cd11(0x20e)]['initialize'][_0x11cd11(0x28f)](this),this['_animations']=this[_0x11cd11(0x28c)]||[];},Scene_ClassChange['prototype']['needsPageButtons']=function(){return!![];},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0xd0)]=function(){const _0x24b78f=_0x152cc7;return this['highestTier']()>0x1?this[_0x24b78f(0x125)]&&this['_classTierWindow'][_0x24b78f(0x245)]:this[_0x24b78f(0x2e6)]&&this['_classListWindow'][_0x24b78f(0x245)];},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x13a)]=function(){const _0x5d55b1=_0x152cc7;Scene_MenuBase['prototype'][_0x5d55b1(0x13a)][_0x5d55b1(0x28f)](this),this[_0x5d55b1(0x1b9)]();},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0xac)]=function(){return!![];},Scene_ClassChange['prototype']['isBottomHelpMode']=function(){const _0x41656c=_0x152cc7;if(ConfigManager[_0x41656c(0x228)]&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x41656c(0x2ca)];else{if(this[_0x41656c(0x132)]())return this[_0x41656c(0x1e4)]()[_0x41656c(0x2fa)](/LOWER/i);else Scene_MenuBase['prototype'][_0x41656c(0x2df)]['call'](this);}},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x2df)]=function(){const _0x59f8ac=_0x152cc7;if(ConfigManager[_0x59f8ac(0x228)]&&ConfigManager[_0x59f8ac(0x106)]!==undefined)return ConfigManager[_0x59f8ac(0x106)];else{if(this[_0x59f8ac(0x132)]())return this[_0x59f8ac(0x1e4)]()[_0x59f8ac(0x2fa)](/RIGHT/i);else Scene_MenuBase[_0x59f8ac(0x20e)][_0x59f8ac(0x2df)][_0x59f8ac(0x28f)](this);}},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x1e4)]=function(){const _0x1f9604=_0x152cc7;return VisuMZ[_0x1f9604(0x1be)][_0x1f9604(0x1a0)][_0x1f9604(0x307)]['LayoutStyle'];},Scene_ClassChange['prototype']['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x341945=_0x152cc7;return VisuMZ[_0x341945(0x1be)][_0x341945(0x1a0)][_0x341945(0x307)][_0x341945(0x2e1)];},Scene_ClassChange[_0x152cc7(0x20e)]['create']=function(){const _0x38dc7b=_0x152cc7;Scene_MenuBase['prototype']['create'][_0x38dc7b(0x28f)](this),this[_0x38dc7b(0x2a1)](),this[_0x38dc7b(0x1f1)](),this[_0x38dc7b(0x35a)](),this[_0x38dc7b(0x27f)](),this[_0x38dc7b(0x348)](),this[_0x38dc7b(0x2f9)]();},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x1f1)]=function(){const _0xacdbeb=_0x152cc7,_0x35082e=this['statusWindowRect']();this[_0xacdbeb(0xd2)]=new Window_ClassStatus(_0x35082e),this[_0xacdbeb(0x2fc)](this[_0xacdbeb(0xd2)]),this['_statusWindow'][_0xacdbeb(0x1f5)](VisuMZ['ClassChangeSystem'][_0xacdbeb(0x1a0)][_0xacdbeb(0x307)][_0xacdbeb(0x339)]);},Scene_ClassChange['prototype'][_0x152cc7(0x30d)]=function(){const _0xef22c9=_0x152cc7,_0x456047=VisuMZ[_0xef22c9(0x1be)][_0xef22c9(0x1a0)]['Window'];if(_0x456047[_0xef22c9(0x2f0)])return _0x456047[_0xef22c9(0x2f0)][_0xef22c9(0x28f)](this);const _0x474183=Math[_0xef22c9(0x277)](Graphics['boxWidth']/0x2),_0x2198de=this[_0xef22c9(0x2ac)](),_0x37dafe=this['isRightInputMode']()?0x0:_0x474183,_0x2178d8=this[_0xef22c9(0x1df)]();return new Rectangle(_0x37dafe,_0x2178d8,_0x474183,_0x2198de);},Scene_ClassChange['prototype'][_0x152cc7(0x35a)]=function(){const _0x5b345c=_0x152cc7,_0x443982=this[_0x5b345c(0x33c)](),_0x1344e0=new Window_ClassTier(_0x443982);_0x1344e0[_0x5b345c(0x23c)](this[_0x5b345c(0x2d6)]),_0x1344e0[_0x5b345c(0x1f5)](VisuMZ[_0x5b345c(0x1be)]['Settings'][_0x5b345c(0x307)]['Window_ClassTier_BgType']),this[_0x5b345c(0x2fc)](_0x1344e0),this[_0x5b345c(0x125)]=_0x1344e0,_0x1344e0[_0x5b345c(0x1d7)](_0x5b345c(0x97),this[_0x5b345c(0x2c2)][_0x5b345c(0x24e)](this)),this[_0x5b345c(0x13d)]()>0x1&&(_0x1344e0['setHandler']('pagedown',this['nextActor'][_0x5b345c(0x24e)](this)),_0x1344e0[_0x5b345c(0x1d7)](_0x5b345c(0x1cc),this[_0x5b345c(0x15d)][_0x5b345c(0x24e)](this))),_0x1344e0[_0x5b345c(0x1d7)](_0x5b345c(0x23f),this[_0x5b345c(0x2dc)]['bind'](this));},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x33c)]=function(){const _0x3b52b1=_0x152cc7,_0x59ee91=VisuMZ[_0x3b52b1(0x1be)][_0x3b52b1(0x1a0)][_0x3b52b1(0x307)];if(_0x59ee91[_0x3b52b1(0x164)])return _0x59ee91[_0x3b52b1(0x164)][_0x3b52b1(0x28f)](this);const _0x254487=Graphics[_0x3b52b1(0x17d)]-this[_0x3b52b1(0xd2)]['width'],_0x4726e5=this[_0x3b52b1(0x2ac)](),_0x73f8d7=this[_0x3b52b1(0x2df)]()?_0x254487:0x0,_0x57e093=this[_0x3b52b1(0x1df)]();return new Rectangle(_0x73f8d7,_0x57e093,_0x254487,_0x4726e5);},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x27f)]=function(){const _0x224058=_0x152cc7,_0x4cdccb=this[_0x224058(0x140)](),_0x107145=new Window_ClassList(_0x4cdccb);_0x107145[_0x224058(0x23c)](this[_0x224058(0x2d6)]),_0x107145[_0x224058(0x1b8)](this[_0x224058(0xd2)]),_0x107145[_0x224058(0x1f5)](VisuMZ['ClassChangeSystem']['Settings'][_0x224058(0x307)]['Window_ClassList_BgType']),this[_0x224058(0x2fc)](_0x107145),this['_classListWindow']=_0x107145,_0x107145[_0x224058(0x1d7)]('cancel',this[_0x224058(0x15c)][_0x224058(0x24e)](this)),this[_0x224058(0x13d)]()<=0x1&&(_0x107145['setHandler'](_0x224058(0x1ac),this[_0x224058(0xe3)][_0x224058(0x24e)](this)),_0x107145[_0x224058(0x1d7)](_0x224058(0x1cc),this[_0x224058(0x15d)][_0x224058(0x24e)](this))),_0x107145[_0x224058(0x1d7)]('classChange',this[_0x224058(0x16f)]['bind'](this));},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x140)]=function(){const _0x21399a=_0x152cc7,_0x4855fe=VisuMZ[_0x21399a(0x1be)]['Settings']['Window'];if(_0x4855fe['Window_ClassList_RectJS'])return _0x4855fe['Window_ClassList_RectJS'][_0x21399a(0x28f)](this);const _0x2a5cc6=Graphics[_0x21399a(0x17d)]-this[_0x21399a(0xd2)][_0x21399a(0x322)],_0x168061=this['mainAreaHeight'](),_0x377758=this[_0x21399a(0x2df)]()?_0x2a5cc6:0x0,_0x50c07b=this[_0x21399a(0x1df)]();return new Rectangle(_0x377758,_0x50c07b,_0x2a5cc6,_0x168061);},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x13d)]=function(){const _0x3702c6=_0x152cc7;if(this[_0x3702c6(0x255)]!==undefined)return this[_0x3702c6(0x255)];return this[_0x3702c6(0x255)]=$gameParty[_0x3702c6(0x126)](),this[_0x3702c6(0x255)];},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x348)]=function(){const _0x27720b=_0x152cc7;if(this[_0x27720b(0x13d)]()>0x1)this[_0x27720b(0x125)]['forceSelect'](0x0),this[_0x27720b(0x125)][_0x27720b(0x175)](),this[_0x27720b(0x125)][_0x27720b(0x1e7)](),this[_0x27720b(0x2e6)][_0x27720b(0x233)](),this[_0x27720b(0x2e6)][_0x27720b(0x1dd)]();else{const _0x5b62be=Math[_0x27720b(0x135)](0x0,this[_0x27720b(0x2e6)][_0x27720b(0x1ed)]());this[_0x27720b(0x2e6)][_0x27720b(0x96)](_0x5b62be),this[_0x27720b(0x2e6)]['setTier'](0x1),this[_0x27720b(0x2e6)][_0x27720b(0x175)](),this[_0x27720b(0x2e6)][_0x27720b(0x1e7)](),this[_0x27720b(0x125)]['hide'](),this[_0x27720b(0x125)][_0x27720b(0x1dd)]();}},Scene_ClassChange['prototype'][_0x152cc7(0x2f9)]=function(){const _0x39e48f=_0x152cc7,_0x4d9166=this[_0x39e48f(0x210)]();_0x4d9166[_0x39e48f(0x283)](),this['_statusWindow'][_0x39e48f(0x345)](_0x4d9166),this[_0x39e48f(0x125)][_0x39e48f(0x345)](_0x4d9166),this[_0x39e48f(0x2e6)][_0x39e48f(0x345)](_0x4d9166);},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x11f)]=function(){const _0x32be52=_0x152cc7;Scene_MenuBase[_0x32be52(0x20e)][_0x32be52(0x11f)][_0x32be52(0x28f)](this),this[_0x32be52(0x2f9)](),this[_0x32be52(0x348)]();},Scene_ClassChange[_0x152cc7(0x20e)]['onMulticlassOk']=function(){const _0x191d32=_0x152cc7,_0x46cd1d=this[_0x191d32(0x125)][_0x191d32(0x229)]();this[_0x191d32(0x2e6)][_0x191d32(0x186)](_0x46cd1d),this[_0x191d32(0x2e6)][_0x191d32(0x175)](),this[_0x191d32(0x2e6)]['activate'](),this[_0x191d32(0x2e6)]['forceSelect'](0x0),this['_classTierWindow']['hide'](),this[_0x191d32(0x125)][_0x191d32(0x1dd)](),this[_0x191d32(0x181)]();},Scene_ClassChange[_0x152cc7(0x20e)]['onClassListCancel']=function(){const _0xc32ef6=_0x152cc7;this[_0xc32ef6(0x13d)]()>0x1?(this[_0xc32ef6(0x125)]['show'](),this[_0xc32ef6(0x125)][_0xc32ef6(0x1e7)](),this[_0xc32ef6(0x2e6)][_0xc32ef6(0x233)](),this[_0xc32ef6(0x2e6)]['deactivate'](),this['_statusWindow'][_0xc32ef6(0x1c6)](null)):this[_0xc32ef6(0x2c2)]();},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x16f)]=function(){const _0x4f1039=_0x152cc7,_0x2ac797=this[_0x4f1039(0x2e6)]['_tier'],_0x28f931=this[_0x4f1039(0x2e6)]['currentExt'](),_0x120ab0=this[_0x4f1039(0x2e6)]['index'](),_0xf98b03=_0x28f931?_0x28f931['id']:0x0;this[_0x4f1039(0xc6)][_0x4f1039(0x119)](_0xf98b03,_0x2ac797),this[_0x4f1039(0x125)][_0x4f1039(0xa1)](),this['_classListWindow'][_0x4f1039(0xa1)](),this[_0x4f1039(0xd2)][_0x4f1039(0x1c6)](null),this[_0x4f1039(0x1c4)](_0xf98b03,_0x2ac797),this['determineActiveWindow']();if(this[_0x4f1039(0x125)][_0x4f1039(0x245)])this[_0x4f1039(0x125)][_0x4f1039(0x108)](_0x2ac797-0x1);else this[_0x4f1039(0x2e6)]['active']&&this['_classListWindow'][_0x4f1039(0x108)](_0x120ab0);},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x1c4)]=function(_0x3d1b3b,_0x4ab6f4){const _0x5cb11f=_0x152cc7,_0x52c247=this[_0x5cb11f(0x2b7)](_0x4ab6f4);this[_0x5cb11f(0x2b1)](_0x3d1b3b,_0x4ab6f4,_0x52c247);},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x2b7)]=function(_0x23e642){const _0x4c5e62=_0x152cc7,_0x49890a=new Sprite(),_0x46e77a=VisuMZ[_0x4c5e62(0x1be)][_0x4c5e62(0x1a0)][_0x4c5e62(0x307)];if(_0x23e642<=0x1){const _0x15f2e0=this[_0x4c5e62(0xd2)];_0x49890a['x']=_0x15f2e0['x']+Math[_0x4c5e62(0x1a9)](_0x15f2e0['width']/0x2),_0x49890a['y']=_0x15f2e0['y']+Math['round'](_0x15f2e0[_0x4c5e62(0x276)]/0x2),_0x49890a['x']+=_0x46e77a[_0x4c5e62(0x31d)]||0x0,_0x49890a['y']+=_0x46e77a[_0x4c5e62(0x195)]||0x0;}else{const _0x4ceb57=this[_0x4c5e62(0x125)],_0x10075c=_0x4ceb57['itemRect'](_0x4ceb57[_0x4c5e62(0x1ed)]()),_0x108481=_0x4ceb57['padding']||0x0;_0x49890a['x']=_0x4ceb57['x']+_0x10075c['x']+Math[_0x4c5e62(0x1a9)](_0x10075c[_0x4c5e62(0x322)]/0x2)+_0x108481,_0x49890a['y']=_0x4ceb57['y']+_0x10075c['y']+Math[_0x4c5e62(0x1a9)](_0x10075c[_0x4c5e62(0x276)]/0x2)+_0x108481,_0x49890a['x']+=_0x46e77a[_0x4c5e62(0x2a3)]||0x0,_0x49890a['y']+=_0x46e77a[_0x4c5e62(0x34f)]||0x0;}return _0x49890a['x']+=this[_0x4c5e62(0x142)]['x'],_0x49890a['y']+=this['_windowLayer']['y'],_0x49890a;},Scene_ClassChange['prototype']['createClassChangeAnimation']=function(_0x28b547,_0x34ce1f,_0x5490f2){const _0x3d99f6=_0x152cc7,_0x2a1f4c=this[_0x3d99f6(0x17c)](_0x28b547),_0x119882=$dataAnimations[_0x2a1f4c];if(!_0x119882)return;const _0x5541a0=this[_0x3d99f6(0x20f)](_0x119882),_0x35cb43=new(_0x5541a0?Sprite_AnimationMV:Sprite_Animation)(),_0x15f438=[_0x5490f2],_0x17b049=0x0;_0x35cb43[_0x3d99f6(0x359)](_0x15f438,_0x119882,![],_0x17b049,null),_0x35cb43[_0x3d99f6(0xe9)]=_0x34ce1f,this[_0x3d99f6(0xbb)](_0x5490f2),this[_0x3d99f6(0xbb)](_0x35cb43),this[_0x3d99f6(0x28c)][_0x3d99f6(0x1f0)](_0x35cb43);},Scene_ClassChange[_0x152cc7(0x32f)]=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)]['Window'][_0x152cc7(0x1e9)]??!![],Scene_ClassChange[_0x152cc7(0x20e)]['getClassChangeAnimationID']=function(_0x25af8a){const _0x3e33cb=_0x152cc7,_0x4b89f9=$dataClasses[_0x25af8a];if(_0x4b89f9){const _0x444550=VisuMZ[_0x3e33cb(0x1be)][_0x3e33cb(0x2f2)],_0x15f5f6=_0x4b89f9[_0x3e33cb(0x2a6)];if(_0x15f5f6['match'](_0x444550[_0x3e33cb(0x20d)]))return Number(RegExp['$1']);}else{if(!Scene_ClassChange[_0x3e33cb(0x32f)])return 0x0;}return VisuMZ[_0x3e33cb(0x1be)][_0x3e33cb(0x1a0)][_0x3e33cb(0x307)][_0x3e33cb(0x35d)];},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x20f)]=function(_0x4ae14d){const _0x5e030c=_0x152cc7;return!!_0x4ae14d[_0x5e030c(0x1f7)];},Scene_ClassChange['prototype']['updateClassChangeAnimations']=function(){const _0x320d95=_0x152cc7,_0x36adb6=[];for(const _0x22526a of this[_0x320d95(0x28c)]){if(!_0x22526a)continue;if(_0x22526a[_0x320d95(0x2d2)]())continue;_0x36adb6[_0x320d95(0x1f0)](_0x22526a);}for(const _0x467128 of _0x36adb6){if(!_0x467128)continue;for(const _0x366ee6 of _0x467128[_0x320d95(0x11d)]){this['removeChild'](_0x366ee6);}this[_0x320d95(0x28c)][_0x320d95(0x116)](_0x467128),this[_0x320d95(0x298)](_0x467128);};},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x181)]=function(){const _0x232f2f=_0x152cc7,_0x1554c2=[];for(const _0x2f4b41 of this['_animations']){if(!_0x2f4b41)continue;if(_0x2f4b41[_0x232f2f(0xe9)]<=0x1)continue;_0x1554c2[_0x232f2f(0x1f0)](_0x2f4b41);}for(const _0x2e1ecf of _0x1554c2){if(!_0x2e1ecf)continue;for(const _0x7d738c of _0x2e1ecf[_0x232f2f(0x11d)]){this[_0x232f2f(0x298)](_0x7d738c);}this[_0x232f2f(0x28c)][_0x232f2f(0x116)](_0x2e1ecf),this[_0x232f2f(0x298)](_0x2e1ecf);};},Scene_ClassChange[_0x152cc7(0x20e)]['buttonAssistSlotWindowShift']=function(){const _0x21c6b9=_0x152cc7;if(!this[_0x21c6b9(0x125)])return![];if(!this[_0x21c6b9(0x125)][_0x21c6b9(0x245)])return![];return this['_classTierWindow'][_0x21c6b9(0x143)]();},Scene_ClassChange[_0x152cc7(0x20e)]['buttonAssistKey3']=function(){const _0x3ceb0c=_0x152cc7;if(this[_0x3ceb0c(0x363)]())return TextManager[_0x3ceb0c(0xe5)](_0x3ceb0c(0xbd));return Scene_MenuBase['prototype']['buttonAssistKey3'][_0x3ceb0c(0x28f)](this);},Scene_ClassChange['prototype']['buttonAssistText3']=function(){const _0x9cdfd3=_0x152cc7;if(this[_0x9cdfd3(0x363)]())return TextManager['classChange_multiclass_ShiftHelp'];return Scene_MenuBase['prototype'][_0x9cdfd3(0x189)]['call'](this);},Scene_ClassChange['prototype']['buttonAssistOffset3']=function(){const _0x5d9848=_0x152cc7;if(this[_0x5d9848(0x363)]())return this[_0x5d9848(0x134)][_0x5d9848(0x322)]/0x5/-0x3;return Scene_MenuBase[_0x5d9848(0x20e)][_0x5d9848(0x19c)]['call'](this);},Scene_ClassChange['prototype'][_0x152cc7(0x209)]=function(){const _0x2a9c47=_0x152cc7;Scene_MenuBase['prototype'][_0x2a9c47(0x209)][_0x2a9c47(0x28f)](this),this['setBackgroundOpacity'](this[_0x2a9c47(0xbe)]()),this[_0x2a9c47(0x2c5)]();},Scene_ClassChange['prototype'][_0x152cc7(0xbe)]=function(){const _0x1bc897=_0x152cc7;return VisuMZ['ClassChangeSystem'][_0x1bc897(0x1a0)][_0x1bc897(0x2bb)][_0x1bc897(0x137)];},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x2c5)]=function(){const _0x78ce24=_0x152cc7,_0x1c3322=VisuMZ[_0x78ce24(0x1be)][_0x78ce24(0x1a0)][_0x78ce24(0x2bb)];_0x1c3322&&(_0x1c3322[_0x78ce24(0xa9)]!==''||_0x1c3322[_0x78ce24(0x299)]!=='')&&(this[_0x78ce24(0x291)]=new Sprite(ImageManager[_0x78ce24(0x1b2)](_0x1c3322[_0x78ce24(0xa9)]||'')),this[_0x78ce24(0x1d4)]=new Sprite(ImageManager[_0x78ce24(0x350)](_0x1c3322[_0x78ce24(0x299)]||'')),this['addChild'](this[_0x78ce24(0x291)]),this[_0x78ce24(0xbb)](this['_backSprite2']),this['_backSprite1'][_0x78ce24(0x236)][_0x78ce24(0x2ee)](this[_0x78ce24(0x15e)][_0x78ce24(0x24e)](this,this[_0x78ce24(0x291)])),this[_0x78ce24(0x1d4)][_0x78ce24(0x236)]['addLoadListener'](this[_0x78ce24(0x15e)][_0x78ce24(0x24e)](this,this[_0x78ce24(0x1d4)])));},Scene_ClassChange[_0x152cc7(0x20e)][_0x152cc7(0x15e)]=function(_0x4bb8a1){const _0xb82ff6=_0x152cc7;this['scaleSprite'](_0x4bb8a1),this[_0xb82ff6(0x308)](_0x4bb8a1);},Window_Base[_0x152cc7(0x27a)]=VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x1a0)][_0x152cc7(0x307)][_0x152cc7(0x292)]??!![],Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x139)]=function(_0x564057,_0xe6efa4,_0x5c349d,_0x1caeeb,_0x518d7a){const _0x232f79=_0x152cc7;_0x518d7a=_0x518d7a||_0x232f79(0x231);const _0x4f3b3c=_0x232f79(0x9a)[_0x232f79(0x34a)](ImageManager[_0x232f79(0x201)]),_0x1af644=TextManager[_0x232f79(0x2a4)],_0x2ade21=_0x1af644[_0x232f79(0x34a)](_0x564057,TextManager[_0x232f79(0x223)],_0x4f3b3c,TextManager['classPointsFull']),_0x58beb4=this[_0x232f79(0x148)](_0x2ade21)['width'];if(_0x518d7a===_0x232f79(0x231))_0xe6efa4+=0x0;else _0x518d7a===_0x232f79(0x1cf)?_0xe6efa4+=Math[_0x232f79(0x1a9)]((_0x1caeeb-_0x58beb4)/0x2):_0xe6efa4+=_0x1caeeb-_0x58beb4;this[_0x232f79(0x199)](_0x2ade21,_0xe6efa4,_0x5c349d);},Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x2ef)]=function(_0x528866,_0x2d0900,_0x1543b7,_0x38076f,_0x4bb48b,_0x2cea18){const _0x5d2e81=_0x152cc7,_0xf4d9af=_0x528866[_0x5d2e81(0x349)](_0x2d0900);this[_0x5d2e81(0x139)](_0xf4d9af,_0x1543b7,_0x38076f,_0x4bb48b,_0x2cea18);},Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x33d)]=function(_0xfd97fb,_0xe3d631,_0x47685d,_0x155494,_0xa884f1){const _0x37c756=_0x152cc7;_0xa884f1=_0xa884f1||_0x37c756(0x231);const _0x17f635=_0x37c756(0x9a)['format'](ImageManager[_0x37c756(0x1c5)]),_0x2c95a2=TextManager[_0x37c756(0x1d9)],_0x2196c9=_0x2c95a2[_0x37c756(0x34a)](_0xfd97fb,TextManager[_0x37c756(0xed)],_0x17f635,TextManager[_0x37c756(0x10a)]),_0x2aaa07=this[_0x37c756(0x148)](_0x2196c9)['width'];if(_0xa884f1===_0x37c756(0x231))_0xe3d631+=0x0;else _0xa884f1===_0x37c756(0x1cf)?_0xe3d631+=Math[_0x37c756(0x1a9)]((_0x155494-_0x2aaa07)/0x2):_0xe3d631+=_0x155494-_0x2aaa07;this['drawTextEx'](_0x2196c9,_0xe3d631,_0x47685d);},Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x25a)]=function(_0x40542c,_0x19d797,_0x41d8e1,_0x2170d5,_0x544237,_0x4ac15b){const _0x51a213=_0x152cc7,_0x290573=_0x40542c['getJobPoints'](_0x19d797);this[_0x51a213(0x33d)](_0x290573,_0x41d8e1,_0x2170d5,_0x544237,_0x4ac15b);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x2b9)]=Window_Base[_0x152cc7(0x20e)]['databaseObjectName'],Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x1ad)]=function(_0x4b9437,_0x252705,_0x25c7f5){const _0x39239d=_0x152cc7;if(_0x4b9437===$dataClasses){const _0x3c351a=_0x4b9437[_0x252705];let _0xd8eb03='';if(_0x3c351a&&_0x25c7f5&&_0x3c351a['iconIndex']){const _0x4312be=_0x39239d(0xf7);let _0x5b4629=_0x3c351a['name'];_0x5b4629=_0x5b4629['replace'](/\\I\[(\d+)\]/gi,''),_0xd8eb03=_0x4312be[_0x39239d(0x34a)](_0x3c351a[_0x39239d(0x33e)],_0x5b4629);}else{if(_0x3c351a){let _0x7cb9e6=_0x3c351a[_0x39239d(0x242)];_0x7cb9e6=_0x7cb9e6[_0x39239d(0x2a5)](/\\I\[(\d+)\]/gi,''),_0xd8eb03=_0x7cb9e6;}else _0xd8eb03='';}return this[_0x39239d(0x115)]()&&(_0xd8eb03=this['applyDatabaseAutoColor'](_0xd8eb03,_0x4b9437)),_0xd8eb03;}return VisuMZ[_0x39239d(0x1be)]['Window_Base_databaseObjectName'][_0x39239d(0x28f)](this,_0x4b9437,_0x252705,_0x25c7f5);},Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x32c)]=function(_0x63f466,_0x534a5a,_0x418a51,_0x25eb34){const _0x35db67=_0x152cc7;if(!Window_Base[_0x35db67(0x27a)])return;if(!$dataClasses[_0x534a5a])return;this[_0x35db67(0x2ae)]()&&this[_0x35db67(0x35b)](_0x63f466,_0x534a5a,_0x418a51,_0x25eb34),this['changeTextColor'](ColorManager[_0x35db67(0xcd)]()),this[_0x35db67(0x278)](TextManager['levelA'],_0x418a51,_0x25eb34,0x30),this['resetTextColor'](),this['drawText'](_0x63f466[_0x35db67(0x19d)](_0x534a5a),_0x418a51+0x54,_0x25eb34,0x24,'right');},Window_Base[_0x152cc7(0x20e)]['isClassExpGaugeDrawn']=function(){const _0x2f58e6=_0x152cc7;return Imported[_0x2f58e6(0x198)]&&VisuMZ[_0x2f58e6(0x130)][_0x2f58e6(0x1a0)]['UI'][_0x2f58e6(0x2ba)];},Window_Base[_0x152cc7(0x20e)][_0x152cc7(0x35b)]=function(_0x5b129e,_0x23c003,_0x3b96c7,_0x11c947){const _0x2c4cb4=_0x152cc7;if(!_0x5b129e)return;if(!_0x5b129e[_0x2c4cb4(0x326)]())return;const _0x318ffa=0x80,_0x2f547d=_0x5b129e['classExpRate'](_0x23c003);let _0x39dbc8=ColorManager[_0x2c4cb4(0x2c8)](),_0x20fddc=ColorManager['expGaugeColor2']();_0x2f547d>=0x1&&(_0x39dbc8=ColorManager[_0x2c4cb4(0x18c)](),_0x20fddc=ColorManager[_0x2c4cb4(0x30f)]()),this['drawGauge'](_0x3b96c7,_0x11c947,_0x318ffa,_0x2f547d,_0x39dbc8,_0x20fddc);},VisuMZ[_0x152cc7(0x1be)][_0x152cc7(0x33b)]=Window_MenuCommand['prototype'][_0x152cc7(0x319)],Window_MenuCommand['prototype'][_0x152cc7(0x319)]=function(){const _0x30675e=_0x152cc7;VisuMZ[_0x30675e(0x1be)][_0x30675e(0x33b)][_0x30675e(0x28f)](this),this[_0x30675e(0x270)]();},Window_MenuCommand['prototype'][_0x152cc7(0x270)]=function(){const _0x1db1cb=_0x152cc7;if(!this[_0x1db1cb(0x306)]())return;if(!this[_0x1db1cb(0x1de)]())return;const _0x34e61f=TextManager[_0x1db1cb(0x1e5)],_0x26964e=this[_0x1db1cb(0x9c)]();this['addCommand'](_0x34e61f,_0x1db1cb(0x1be),_0x26964e);},Window_MenuCommand[_0x152cc7(0x20e)]['addClassChangeSystemCommandAutomatically']=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x152cc7(0x20e)]['isClassChangeCommandVisible']=function(){const _0x18e296=_0x152cc7;return $gameSystem[_0x18e296(0xc8)]();},Window_MenuCommand[_0x152cc7(0x20e)][_0x152cc7(0x9c)]=function(){return $gameSystem['isMainMenuClassChangeSystemEnabled']();};function _0x6ce8(_0xbc8c51,_0x3da62b){const _0x2e6b6c=_0x2e6b();return _0x6ce8=function(_0x6ce896,_0x2be30f){_0x6ce896=_0x6ce896-0x96;let _0x103f2e=_0x2e6b6c[_0x6ce896];return _0x103f2e;},_0x6ce8(_0xbc8c51,_0x3da62b);}function Window_ClassStatus(){this['initialize'](...arguments);}Window_ClassStatus[_0x152cc7(0x20e)]=Object['create'](Window_StatusBase['prototype']),Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x16e)]=Window_ClassStatus,Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x287)]=function(_0x392d36){const _0x8ce422=_0x152cc7;Window_StatusBase[_0x8ce422(0x20e)][_0x8ce422(0x287)][_0x8ce422(0x28f)](this,_0x392d36),this[_0x8ce422(0xc6)]=null,this['_tempActor']=null,this[_0x8ce422(0xa1)]();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x345)]=function(_0x359666){const _0x264b3e=_0x152cc7;this[_0x264b3e(0xc6)]!==_0x359666&&(this[_0x264b3e(0xc6)]=_0x359666,this[_0x264b3e(0xa1)]());},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x1ab)]=function(){return 0x0;},Window_ClassStatus['prototype'][_0x152cc7(0x1c6)]=function(_0x35032f){const _0x1f6fed=_0x152cc7;this[_0x1f6fed(0x2b5)]!==_0x35032f&&(this[_0x1f6fed(0x2b5)]=_0x35032f,this[_0x1f6fed(0xa1)]());},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0xa1)]=function(){const _0x37c695=_0x152cc7;this[_0x37c695(0xb5)](),this['resetFontSettings']();if(this['_actor'])this[_0x37c695(0xc6)]['refresh']();this[_0x37c695(0x279)]();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x279)]=function(){const _0x39d5fc=_0x152cc7;this['contents']['clear']();if(!this[_0x39d5fc(0xc6)])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x9efa86=ImageManager[_0x39d5fc(0x34c)](this[_0x39d5fc(0xc6)]['getMenuImage']());_0x9efa86['addLoadListener'](this[_0x39d5fc(0x111)]['bind'](this));}else this['refreshNoMenuImage']();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0xba)]=function(){const _0x51eb6f=_0x152cc7;return Imported['VisuMZ_1_MainMenuCore']&&this[_0x51eb6f(0xc6)][_0x51eb6f(0x109)]()!==''&&VisuMZ[_0x51eb6f(0x1be)][_0x51eb6f(0x1a0)][_0x51eb6f(0x307)][_0x51eb6f(0x152)];},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x111)]=function(){const _0x2fa6ec=_0x152cc7;VisuMZ['ClassChangeSystem'][_0x2fa6ec(0x1a0)]['Window'][_0x2fa6ec(0x121)][_0x2fa6ec(0x28f)](this),this[_0x2fa6ec(0x159)]();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x275)]=function(_0x34cefe,_0x5d6384,_0x408676,_0x37ad05,_0x2268f0){const _0x13cfb6=_0x152cc7,_0x564dfe=ImageManager['loadPicture'](_0x34cefe[_0x13cfb6(0x109)]()),_0x55b25c=this[_0x13cfb6(0x28a)]-_0x564dfe[_0x13cfb6(0x322)];_0x5d6384+=_0x55b25c/0x2;if(_0x55b25c<0x0)_0x37ad05-=_0x55b25c;Window_StatusBase[_0x13cfb6(0x20e)]['drawItemActorMenuImage']['call'](this,_0x34cefe,_0x5d6384,_0x408676,_0x37ad05,_0x2268f0);},Window_ClassStatus['prototype'][_0x152cc7(0x352)]=function(){const _0x487241=_0x152cc7;VisuMZ[_0x487241(0x1be)][_0x487241(0x1a0)][_0x487241(0x307)][_0x487241(0x192)]['call'](this),this['drawParameterList']();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x159)]=function(){const _0x26612f=_0x152cc7;this[_0x26612f(0xaf)](),VisuMZ[_0x26612f(0x1be)][_0x26612f(0x1a0)][_0x26612f(0x307)][_0x26612f(0xc7)][_0x26612f(0x28f)](this);},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x17e)]=function(){const _0x29c37b=_0x152cc7;return Imported[_0x29c37b(0x198)]?VisuMZ[_0x29c37b(0x130)]['Settings']['Param'][_0x29c37b(0x154)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x281)]=function(){const _0x378da4=_0x152cc7;return VisuMZ['ClassChangeSystem'][_0x378da4(0x1a0)][_0x378da4(0x307)][_0x378da4(0xb1)];},Window_ClassStatus[_0x152cc7(0x20e)]['isUseParamNamesWithIcons']=function(){const _0x515b4d=_0x152cc7;return Imported[_0x515b4d(0x198)]&&VisuMZ['CoreEngine'][_0x515b4d(0x1a0)][_0x515b4d(0x34e)][_0x515b4d(0x208)];},Window_ClassStatus['prototype'][_0x152cc7(0x321)]=function(_0x9a7bb7,_0x18e0b3,_0x574dcc,_0x5abe9d,_0x35bff0){const _0x4011d2=_0x152cc7;if(Imported['VisuMZ_1_MainMenuCore'])switch(this[_0x4011d2(0x2fb)]()){case _0x4011d2(0xde):break;case _0x4011d2(0x224):this['prepareDrawActorSprite'](_0x9a7bb7,_0x18e0b3,_0x574dcc,_0x5abe9d,_0x35bff0);break;case'svbattler':this[_0x4011d2(0x20a)](_0x9a7bb7,_0x18e0b3,_0x574dcc,_0x5abe9d,_0x35bff0);break;default:this[_0x4011d2(0xce)](_0x9a7bb7,_0x18e0b3,_0x574dcc,_0x5abe9d,_0x35bff0);break;}else this[_0x4011d2(0xce)](_0x9a7bb7,_0x18e0b3,_0x574dcc,_0x5abe9d,_0x35bff0);},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0xce)]=function(_0x14b93f,_0x5e646f,_0x214bec,_0x1a762a,_0x4edc95){const _0x421251=_0x152cc7,_0x266bb3=ImageManager[_0x421251(0xd3)](_0x14b93f[_0x421251(0xfd)]());_0x266bb3['addLoadListener'](Window_StatusBase[_0x421251(0x20e)][_0x421251(0x321)][_0x421251(0x24e)](this,_0x14b93f,_0x5e646f,_0x214bec,_0x1a762a,_0x4edc95));},Window_ClassStatus['prototype']['prepareDrawActorSprite']=function(_0x2117d6,_0x10429f,_0x18e471,_0x4c6204,_0x3784a8){const _0x4c3f4c=_0x152cc7,_0x3a01a2=ImageManager[_0x4c3f4c(0x122)](_0x2117d6[_0x4c3f4c(0x2a7)]());_0x3a01a2[_0x4c3f4c(0x2ee)](Window_StatusBase['prototype'][_0x4c3f4c(0xc0)][_0x4c3f4c(0x24e)](this,_0x2117d6,_0x10429f,_0x18e471,_0x4c6204,_0x3784a8));},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x20a)]=function(_0x4ff266,_0x5cb03e,_0x30daaa,_0x36cb82,_0x4e1174){const _0x545781=_0x152cc7,_0x320f54=ImageManager[_0x545781(0x1f8)](_0x4ff266[_0x545781(0x2b2)]());_0x320f54[_0x545781(0x2ee)](Window_StatusBase[_0x545781(0x20e)][_0x545781(0x251)][_0x545781(0x24e)](this,_0x4ff266,_0x5cb03e,_0x30daaa,_0x36cb82,_0x4e1174));},Window_ClassStatus['prototype'][_0x152cc7(0x249)]=function(_0x323b8c,_0x3c8a56){const _0x447ef3=_0x152cc7,_0x4f0f57=this[_0x447ef3(0x273)]();this[_0x447ef3(0x165)](ColorManager[_0x447ef3(0xcd)]());if(Imported['VisuMZ_0_CoreEngine']){const _0x57046d=VisuMZ['CoreEngine'][_0x447ef3(0x1a0)]['UI'][_0x447ef3(0x202)];this[_0x447ef3(0x278)](_0x57046d,_0x323b8c,_0x3c8a56,_0x4f0f57,_0x447ef3(0x1cf));}else this[_0x447ef3(0x278)]('→',_0x323b8c,_0x3c8a56,_0x4f0f57,'center');},Window_ClassStatus['prototype'][_0x152cc7(0x273)]=function(){return 0x20;},Window_ClassStatus['prototype'][_0x152cc7(0x226)]=function(_0x498a8e,_0x20d01b,_0xac8611,_0x2fb89e){const _0x2d20d3=_0x152cc7,_0x4abf71=this[_0x2d20d3(0xb9)]();Imported[_0x2d20d3(0x198)]?this['drawParamText'](_0x20d01b+_0x4abf71,_0xac8611,_0x2fb89e,_0x498a8e,![]):(this[_0x2d20d3(0x165)](ColorManager[_0x2d20d3(0xcd)]()),this[_0x2d20d3(0x278)](TextManager[_0x2d20d3(0x2fd)](_0x498a8e),_0x20d01b+_0x4abf71,_0xac8611,_0x2fb89e),this[_0x2d20d3(0x133)]());},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x151)]=function(_0x36579d,_0x292a71,_0x4ec90f,_0x1e79ae){const _0x45ae32=_0x152cc7,_0x3bc8ec=this[_0x45ae32(0xb9)]();let _0x2c7fb2=0x0;Imported['VisuMZ_0_CoreEngine']?_0x2c7fb2=this['_actor'][_0x45ae32(0x19a)](_0x36579d,!![]):_0x2c7fb2=this[_0x45ae32(0xc6)][_0x45ae32(0x2fd)](_0x36579d);const _0x15993e=_0x2c7fb2;this[_0x45ae32(0x278)](_0x2c7fb2,_0x292a71,_0x4ec90f,_0x1e79ae-_0x3bc8ec,_0x45ae32(0x31f)),this[_0x45ae32(0x133)]();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0xbc)]=function(_0x233e69,_0x5ce7ad,_0x30f20c,_0x299029){const _0x507838=_0x152cc7,_0x3fdec4=this[_0x507838(0xb9)]();let _0x338c20=0x0,_0x37b776=0x0,_0x2f88fc='';if(this[_0x507838(0x2b5)]){Imported[_0x507838(0x198)]?(_0x338c20=this[_0x507838(0xc6)][_0x507838(0x19a)](_0x233e69,![]),_0x37b776=this['_tempActor']['paramValueByName'](_0x233e69,![]),_0x2f88fc=this['_tempActor']['paramValueByName'](_0x233e69,!![])):(_0x338c20=this[_0x507838(0xc6)]['param'](_0x233e69),_0x37b776=this[_0x507838(0x2b5)][_0x507838(0x2fd)](_0x233e69),_0x2f88fc=this['_tempActor'][_0x507838(0x2fd)](_0x233e69));const _0x2e331e=_0x338c20,_0x291e37=_0x37b776;diffValue=_0x291e37-_0x2e331e,this['changeTextColor'](ColorManager[_0x507838(0x1fc)](diffValue)),this[_0x507838(0x278)](_0x2f88fc,_0x5ce7ad,_0x30f20c,_0x299029-_0x3fdec4,_0x507838(0x31f));}this['resetTextColor']();},Window_ClassStatus[_0x152cc7(0x20e)]['drawUpdatedParamValueDiff']=function(_0x254417,_0x3b2efe,_0x4d3b4d,_0x2dc4ff){const _0x4b69ee=_0x152cc7,_0x24fe42=this[_0x4b69ee(0xb9)]();let _0x1bf10c=0x0,_0x2b5d02=0x0,_0xc1d383=![];if(this[_0x4b69ee(0x2b5)]){Imported[_0x4b69ee(0x198)]?(_0x1bf10c=this[_0x4b69ee(0xc6)][_0x4b69ee(0x19a)](_0x254417,![]),_0x2b5d02=this['_tempActor']['paramValueByName'](_0x254417,![]),_0xc1d383=String(this[_0x4b69ee(0xc6)][_0x4b69ee(0x19a)](_0x254417,!![]))['match'](/([%％])/i)):(_0x1bf10c=this[_0x4b69ee(0xc6)][_0x4b69ee(0x2fd)](_0x254417),_0x2b5d02=this[_0x4b69ee(0x2b5)][_0x4b69ee(0x2fd)](_0x254417),_0xc1d383=_0x1bf10c%0x1!==0x0||_0x2b5d02%0x1!==0x0);const _0x5b537f=_0x1bf10c,_0x31f53d=_0x2b5d02,_0x52ae9c=_0x31f53d-_0x5b537f;let _0x128ada=_0x52ae9c;if(_0xc1d383)_0x128ada=Math[_0x4b69ee(0x1a9)](_0x52ae9c*0x64)+'%';_0x52ae9c!==0x0&&(this[_0x4b69ee(0x165)](ColorManager['paramchangeTextColor'](_0x52ae9c)),_0x128ada=(_0x52ae9c>0x0?_0x4b69ee(0x2ff):_0x4b69ee(0x2a9))['format'](_0x128ada),this['drawText'](_0x128ada,_0x3b2efe+_0x24fe42,_0x4d3b4d,_0x2dc4ff,_0x4b69ee(0x231)));}this[_0x4b69ee(0x133)]();},Window_ClassStatus[_0x152cc7(0x20e)][_0x152cc7(0x179)]=function(_0x20fee2,_0x4137a7,_0x591ef1,_0x19b962,_0x1113ba){const _0x13f7da=_0x152cc7;if(VisuMZ['ClassChangeSystem']['Settings'][_0x13f7da(0x307)][_0x13f7da(0xca)]===![])return;_0x1113ba=Math[_0x13f7da(0x135)](_0x1113ba||0x1,0x1);while(_0x1113ba--){_0x19b962=_0x19b962||this[_0x13f7da(0x21a)](),this[_0x13f7da(0xc1)][_0x13f7da(0x347)]=0xa0;const _0x250003=ColorManager[_0x13f7da(0xd1)]();this[_0x13f7da(0xc1)]['fillRect'](_0x20fee2+0x1,_0x4137a7+0x1,_0x591ef1-0x2,_0x19b962-0x2,_0x250003),this['contents'][_0x13f7da(0x347)]=0xff;}},ColorManager['getClassChangeBackColor2']=function(){const _0x24689c=_0x152cc7,_0x53bfb0=VisuMZ['ClassChangeSystem'][_0x24689c(0x1a0)][_0x24689c(0x307)];let _0x3670de=_0x53bfb0[_0x24689c(0x104)]!==undefined?_0x53bfb0[_0x24689c(0x104)]:0x13;return ColorManager['getColor'](_0x3670de);},Window_ClassStatus['prototype'][_0x152cc7(0x1d0)]=function(_0x3a9f80,_0x2d899c,_0x401b74){const _0x37f247=_0x152cc7,_0xde90aa=VisuMZ['ClassChangeSystem'][_0x37f247(0x1a0)][_0x37f247(0x307)]['DisplayedResources'],_0x296978=this[_0x37f247(0xc6)][_0x37f247(0x2c9)]()['id'];for(const _0x4c5ec7 of _0xde90aa){switch(_0x4c5ec7['toUpperCase']()[_0x37f247(0x25d)]()){case'AP':if(!Imported[_0x37f247(0x110)])continue;this['drawActorAbilityPoints'](this[_0x37f247(0xc6)],_0x296978,_0x3a9f80,_0x2d899c,_0x401b74,_0x37f247(0x31f)),_0x2d899c+=this['lineHeight']();break;case'CP':if(!Imported[_0x37f247(0x29d)])continue;this[_0x37f247(0x2ef)](this[_0x37f247(0xc6)],_0x296978,_0x3a9f80,_0x2d899c,_0x401b74,_0x37f247(0x31f)),_0x2d899c+=this[_0x37f247(0x21a)]();break;case'JP':if(!Imported[_0x37f247(0x29d)])continue;this[_0x37f247(0x25a)](this[_0x37f247(0xc6)],_0x296978,_0x3a9f80,_0x2d899c,_0x401b74,_0x37f247(0x31f)),_0x2d899c+=this[_0x37f247(0x21a)]();break;case'SP':if(!Imported[_0x37f247(0x110)])continue;this[_0x37f247(0x351)](this['_actor'],_0x296978,_0x3a9f80,_0x2d899c,_0x401b74,_0x37f247(0x31f)),_0x2d899c+=this['lineHeight']();break;}}};function Window_ClassCommand(){const _0x3d7957=_0x152cc7;this[_0x3d7957(0x287)](...arguments);}Window_ClassCommand[_0x152cc7(0x20e)]=Object[_0x152cc7(0xa3)](Window_Command[_0x152cc7(0x20e)]),Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x16e)]=Window_ClassCommand,Window_ClassCommand[_0x152cc7(0x20e)]['initialize']=function(_0x13eff1){const _0x245afb=_0x152cc7;Window_Command[_0x245afb(0x20e)][_0x245afb(0x287)][_0x245afb(0x28f)](this,_0x13eff1),this['deselect'](),this['deactivate']();},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x2a2)]=function(){const _0x229d20=_0x152cc7;return this[_0x229d20(0x21a)]()*0x3+0x8;},Window_ClassCommand[_0x152cc7(0x20e)]['setActor']=function(_0x446337){const _0x23d635=_0x152cc7;this[_0x23d635(0xc6)]!==_0x446337&&(this[_0x23d635(0xc6)]=_0x446337,this['refresh']());},Window_ClassCommand[_0x152cc7(0x20e)]['refresh']=function(){const _0x59ff99=_0x152cc7;Window_Command[_0x59ff99(0x20e)][_0x59ff99(0xa1)][_0x59ff99(0x28f)](this),this[_0x59ff99(0x357)]();if(this[_0x59ff99(0x245)])this[_0x59ff99(0x21f)]();},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x147)]=function(_0x2befe4,_0x4e7163){const _0x53fbc6=_0x152cc7;_0x4e7163=_0x4e7163||0x1,this[_0x53fbc6(0x343)](![]);const _0x2defad=ColorManager[_0x53fbc6(0x29e)](),_0x193ed0=ColorManager[_0x53fbc6(0x2ad)](),_0x22940b=_0x2befe4[_0x53fbc6(0x322)]/0x2,_0x317ee8=this['lineHeight']();while(_0x4e7163--){this[_0x53fbc6(0xc1)][_0x53fbc6(0x1ee)](_0x2befe4['x'],_0x2befe4['y'],_0x22940b,_0x317ee8,_0x193ed0,_0x2defad),this[_0x53fbc6(0xc1)][_0x53fbc6(0x1ee)](_0x2befe4['x']+_0x22940b,_0x2befe4['y'],_0x22940b,_0x317ee8,_0x2defad,_0x193ed0);}this[_0x53fbc6(0x343)](!![]);},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x355)]=function(_0x4d61fe,_0x5b0d8a,_0x459589){const _0xf12dcc=_0x152cc7;if(!_0x5b0d8a)return;const _0x45a8a9=VisuMZ[_0xf12dcc(0x1be)][_0xf12dcc(0x2f2)],_0x572cea=_0x5b0d8a[_0xf12dcc(0x2a6)];let _0x5cb31f='';if(_0x572cea[_0xf12dcc(0x2fa)](_0x45a8a9[_0xf12dcc(0x336)]))_0x5cb31f=String(RegExp['$1']);else _0x572cea[_0xf12dcc(0x2fa)](_0x45a8a9[_0xf12dcc(0x1d1)])&&(_0x5cb31f=String(RegExp['$1']));if(_0x5cb31f){const _0x2f870c=ImageManager[_0xf12dcc(0x34c)](_0x5cb31f);_0x2f870c[_0xf12dcc(0x2ee)](this[_0xf12dcc(0xc5)][_0xf12dcc(0x24e)](this,_0x4d61fe,_0x2f870c));}else this[_0xf12dcc(0x2c4)](_0x5b0d8a,_0x459589);},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0xc5)]=function(_0x2abea4,_0x397e85){const _0x4678ec=_0x152cc7,_0x2a5def=this['itemRectWithPadding'](_0x2abea4);let _0x4af9ba=_0x2a5def['x']+this[_0x4678ec(0xb9)](),_0x460193=_0x2a5def['y']+0x4,_0x3bbb1f=_0x2a5def[_0x4678ec(0x322)]-this['itemPadding']()*0x2,_0x5da916=Math['min'](this[_0x4678ec(0x21a)]()*0x3,_0x2a5def[_0x4678ec(0x276)])-0x4,_0x1539c7=Math[_0x4678ec(0x129)](_0x3bbb1f,_0x5da916);const _0x1d6781=_0x1539c7/_0x397e85[_0x4678ec(0x322)],_0x27a7c4=_0x1539c7/_0x397e85[_0x4678ec(0x276)],_0x2c9e83=Math[_0x4678ec(0x129)](_0x1d6781,_0x27a7c4,0x1);let _0x568056=Math[_0x4678ec(0x1a9)](_0x397e85[_0x4678ec(0x322)]*_0x2c9e83),_0x104f12=Math[_0x4678ec(0x1a9)](_0x397e85[_0x4678ec(0x276)]*_0x2c9e83);_0x4af9ba+=Math[_0x4678ec(0x1a9)]((_0x1539c7-_0x568056)/0x2),_0x460193+=Math['round']((_0x1539c7-_0x104f12)/0x2);const _0x344ecc=_0x397e85[_0x4678ec(0x322)],_0x1e116b=_0x397e85[_0x4678ec(0x276)];this['contents'][_0x4678ec(0x25c)][_0x4678ec(0x32a)]=!![],this[_0x4678ec(0xc1)][_0x4678ec(0x220)](_0x397e85,0x0,0x0,_0x344ecc,_0x1e116b,_0x4af9ba,_0x460193,_0x568056,_0x104f12),this[_0x4678ec(0xc1)][_0x4678ec(0x25c)]['imageSmoothingEnabled']=!![];},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x2c4)]=function(_0x1082db,_0x54b996){const _0x386fc6=_0x152cc7;if(!_0x1082db)return;const _0x171ab3=_0x1082db[_0x386fc6(0x33e)];let _0x451f1b=_0x54b996['x']+this[_0x386fc6(0xb9)](),_0x2e37fa=_0x54b996['y']+0x4,_0x1e0c1f=_0x54b996[_0x386fc6(0x322)]-this[_0x386fc6(0xb9)]()*0x2,_0x5ed5fa=Math['min'](this[_0x386fc6(0x21a)]()*0x3,_0x54b996[_0x386fc6(0x276)]),_0x44ae54=Math['min'](_0x1e0c1f,_0x5ed5fa);_0x44ae54=Math[_0x386fc6(0x277)](_0x44ae54/ImageManager[_0x386fc6(0x31b)])*ImageManager[_0x386fc6(0x31b)],_0x2e37fa+=(_0x5ed5fa-_0x44ae54)/0x2;const _0x336232=ImageManager[_0x386fc6(0x296)]('IconSet'),_0x38ee58=ImageManager[_0x386fc6(0x31b)],_0x39207c=ImageManager[_0x386fc6(0x294)],_0x4956ce=_0x171ab3%0x10*_0x38ee58,_0x4316b9=Math['floor'](_0x171ab3/0x10)*_0x39207c;this[_0x386fc6(0xc1)][_0x386fc6(0x25c)][_0x386fc6(0x32a)]=![],this['contents']['blt'](_0x336232,_0x4956ce,_0x4316b9,_0x38ee58,_0x39207c,_0x451f1b,_0x2e37fa,_0x44ae54,_0x44ae54),this[_0x386fc6(0xc1)][_0x386fc6(0x25c)][_0x386fc6(0x32a)]=!![];},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x263)]=function(){const _0x2321f1=_0x152cc7;return VisuMZ[_0x2321f1(0x1be)][_0x2321f1(0x1a0)][_0x2321f1(0x307)][_0x2321f1(0x1b0)]||[];},Window_ClassCommand[_0x152cc7(0x20e)][_0x152cc7(0x356)]=function(_0x575b41,_0x4617bc){const _0x28492b=_0x152cc7,_0x446bd7=this[_0x28492b(0x263)]();let _0x174a64=_0x4617bc['y']+this[_0x28492b(0x21a)](),_0x273c6a=0x0;const _0x217a3e=_0x4617bc['width']-this[_0x28492b(0xb9)]()*0x2;for(const _0x4978a8 of _0x446bd7){if(_0x273c6a>=0x2)return;switch(_0x4978a8){case'AP':if(!Imported[_0x28492b(0x110)])continue;let _0x9f492=VisuMZ['SkillLearnSystem'][_0x28492b(0x1a0)][_0x28492b(0xec)];if(!_0x9f492)continue;if(_0x9f492['SharedResource'])continue;this[_0x28492b(0x1e0)](this[_0x28492b(0xc6)],_0x575b41,_0x4617bc['x'],_0x174a64,_0x217a3e,_0x28492b(0x31f)),_0x174a64+=this[_0x28492b(0x21a)](),_0x273c6a++;break;case'CP':if(!Imported['VisuMZ_2_ClassChangeSystem'])continue;let _0x2b538f=VisuMZ[_0x28492b(0x1be)][_0x28492b(0x1a0)][_0x28492b(0x2c6)];if(!_0x2b538f)continue;if(_0x2b538f[_0x28492b(0x2e5)])continue;this[_0x28492b(0x2ef)](this[_0x28492b(0xc6)],_0x575b41,_0x4617bc['x'],_0x174a64,_0x217a3e,'right'),_0x174a64+=this['lineHeight'](),_0x273c6a++;break;case'JP':if(!Imported[_0x28492b(0x29d)])continue;let _0xbbef36=VisuMZ['ClassChangeSystem'][_0x28492b(0x1a0)][_0x28492b(0xb6)];if(!_0xbbef36)continue;if(_0xbbef36[_0x28492b(0x2e5)])continue;this[_0x28492b(0x25a)](this[_0x28492b(0xc6)],_0x575b41,_0x4617bc['x'],_0x174a64,_0x217a3e,_0x28492b(0x31f)),_0x174a64+=this[_0x28492b(0x21a)](),_0x273c6a++;break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;let _0x74e278=VisuMZ['SkillLearnSystem'][_0x28492b(0x1a0)][_0x28492b(0x311)];if(!_0x74e278)continue;if(_0x74e278[_0x28492b(0x2e5)])continue;this[_0x28492b(0x351)](this['_actor'],_0x575b41,_0x4617bc['x'],_0x174a64,_0x217a3e,_0x28492b(0x31f)),_0x174a64+=this[_0x28492b(0x21a)](),_0x273c6a++;break;}}};function Window_ClassTier(){const _0x37d09d=_0x152cc7;this[_0x37d09d(0x287)](...arguments);}Window_ClassTier[_0x152cc7(0x20e)]=Object['create'](Window_ClassCommand[_0x152cc7(0x20e)]),Window_ClassTier[_0x152cc7(0x20e)]['constructor']=Window_ClassTier,Window_ClassTier[_0x152cc7(0x20e)][_0x152cc7(0x287)]=function(_0x5ccbb3){const _0x572287=_0x152cc7;Window_ClassCommand[_0x572287(0x20e)][_0x572287(0x287)][_0x572287(0x28f)](this,_0x5ccbb3);},Window_ClassTier[_0x152cc7(0x20e)][_0x152cc7(0xf0)]=function(){const _0x348e99=_0x152cc7;return this[_0x348e99(0x254)];},Window_ClassTier[_0x152cc7(0x20e)][_0x152cc7(0x2a2)]=function(){const _0x30d0f4=_0x152cc7;let _0x556c79=Window_ClassCommand[_0x30d0f4(0x20e)][_0x30d0f4(0x2a2)][_0x30d0f4(0x28f)](this);if(this[_0x30d0f4(0xc6)]){const _0x48049b=this[_0x30d0f4(0xc6)]['totalMulticlass']()||0x1;_0x556c79=Math[_0x30d0f4(0x135)](_0x556c79,this[_0x30d0f4(0x247)]/_0x48049b);}return _0x556c79;},Window_ClassTier[_0x152cc7(0x20e)][_0x152cc7(0x21f)]=function(){const _0x12b62=_0x152cc7;if(this[_0x12b62(0x2d6)]){if(this[_0x12b62(0x229)]()){const _0x1217e9=VisuMZ['ClassChangeSystem'][_0x12b62(0x1a0)][_0x12b62(0x16c)];if(!_0x1217e9)return;const _0xbe52ba=_0x1217e9[this[_0x12b62(0x229)]()-0x1];if(!_0xbe52ba)return;this[_0x12b62(0x2d6)]['setText'](_0xbe52ba[_0x12b62(0x313)]);}else this['_helpWindow'][_0x12b62(0x146)]('');}},Window_ClassTier['prototype']['makeCommandList']=function(){const _0x136907=_0x152cc7;if(!this['_actor'])return;const _0x4d8630=this['_actor']['totalMulticlass'](),_0x464073=VisuMZ['ClassChangeSystem'][_0x136907(0x1a0)][_0x136907(0x16c)];for(let _0x2e32d5=0x0;_0x2e32d5<_0x4d8630;_0x2e32d5++){const _0x41f692=_0x464073[_0x2e32d5];if(!_0x41f692)continue;const _0x358fcc=_0x41f692['Name'],_0x159d15=_0x2e32d5+0x1,_0x5f214b=this[_0x136907(0xae)](_0x159d15);this[_0x136907(0x2d0)](_0x358fcc,_0x136907(0x23f),_0x5f214b,_0x159d15);}},Window_ClassTier['prototype'][_0x152cc7(0xae)]=function(_0x17b137){const _0x2034d4=_0x152cc7;if(this[_0x2034d4(0xc6)][_0x2034d4(0x21b)](_0x17b137))return![];return _0x17b137>0x0;},Window_ClassTier[_0x152cc7(0x20e)]['drawItem']=function(_0x32d847){const _0x55fa37=_0x152cc7;if(!this[_0x55fa37(0xc6)])return;const _0x9d8811=this[_0x55fa37(0x2cc)](_0x32d847),_0x1ddc91=this['_list'][_0x32d847][_0x55fa37(0x22e)]||0x1,_0x9f2954=this[_0x55fa37(0xc6)][_0x55fa37(0x14f)](_0x1ddc91),_0x3b5710=_0x9f2954?_0x9f2954['id']:0x0,_0x16193f=VisuMZ['ClassChangeSystem']['Settings'][_0x55fa37(0x16c)];if(!_0x16193f)return;const _0x2277e3=_0x16193f[_0x1ddc91-0x1];if(!_0x2277e3)return;let _0x288ad2=_0x9d8811['x'],_0x277298=_0x9d8811['y'],_0x178791=_0x9d8811[_0x55fa37(0x322)]-this[_0x55fa37(0xb9)]()*0x2,_0x28400a=_0x9d8811[_0x55fa37(0x276)],_0x2afe9a=Math[_0x55fa37(0x129)](_0x178791,_0x28400a,this[_0x55fa37(0x21a)]()*0x3);_0x2afe9a=Math[_0x55fa37(0x277)](_0x2afe9a/ImageManager[_0x55fa37(0x31b)])*ImageManager[_0x55fa37(0x31b)],_0x288ad2+=_0x2afe9a+this[_0x55fa37(0xb9)]()*0x4,this[_0x55fa37(0xaf)](),this[_0x55fa37(0x133)](),this[_0x55fa37(0x147)](_0x9d8811),this[_0x55fa37(0x343)](this[_0x55fa37(0xae)](_0x1ddc91)),this[_0x55fa37(0x355)](_0x32d847,_0x9f2954,_0x9d8811),this['changeTextColor'](ColorManager[_0x55fa37(0x9b)](_0x2277e3[_0x55fa37(0x218)])),this[_0x55fa37(0x278)](_0x2277e3[_0x55fa37(0x18d)],_0x9d8811['x'],_0x9d8811['y'],_0x9d8811[_0x55fa37(0x322)],'center'),this[_0x55fa37(0x133)]();if(!_0x9f2954){this[_0x55fa37(0x343)](![]);const _0x3c4315=Math[_0x55fa37(0x1a9)](_0x9d8811['y']+this[_0x55fa37(0x21a)]()+(_0x9d8811[_0x55fa37(0x276)]-this[_0x55fa37(0x21a)]()*0x2)/0x2);this[_0x55fa37(0x278)](TextManager[_0x55fa37(0xa2)],_0x9d8811['x'],_0x3c4315,_0x9d8811[_0x55fa37(0x322)],_0x55fa37(0x1cf));return;}_0x277298+=this[_0x55fa37(0x21a)]();let _0x16662b=_0x9f2954[_0x55fa37(0x242)];_0x16662b=_0x16662b['replace'](/\x1I\[(\d+)\]/gi,''),_0x16662b=_0x16662b['replace'](/\\I\[(\d+)\]/gi,''),this[_0x55fa37(0x278)](_0x16662b,_0x288ad2,_0x277298,_0x9d8811[_0x55fa37(0x322)]-_0x288ad2),_0x277298+=this[_0x55fa37(0x21a)](),this[_0x55fa37(0x32c)](this[_0x55fa37(0xc6)],_0x3b5710,_0x288ad2,_0x277298-0x4),_0x277298+=this[_0x55fa37(0x21a)](),this[_0x55fa37(0x356)](_0x3b5710,_0x9d8811),this[_0x55fa37(0x266)](_0x3b5710,_0x1ddc91,_0x2277e3,_0x9d8811);},Window_ClassTier['prototype'][_0x152cc7(0x266)]=function(){const _0x38147f=_0x152cc7,_0x51911c=VisuMZ[_0x38147f(0x1be)][_0x38147f(0x1a0)][_0x38147f(0x307)][_0x38147f(0x161)];if(_0x51911c){_0x51911c['apply'](this,arguments);return;}const _0x2add31=arguments[0x0],_0x385f1a=arguments[0x1],_0x381156=arguments[0x2],_0xd81ba2=arguments[0x3],_0x2947c8=$dataClasses[_0x2add31],_0x28e346=Imported[_0x38147f(0xe8)],_0x48101f=!![],_0x4d3b37=0x16;let _0x587c47=_0xd81ba2['x']+this[_0x38147f(0xb9)]()*0x4,_0xc88fe=_0xd81ba2['y']+this[_0x38147f(0x21a)]()*3.25,_0x16aad3=_0xd81ba2[_0x38147f(0x322)]-this[_0x38147f(0xb9)]()*0x8;if(_0x381156[_0x38147f(0x1a4)]&&_0xc88fe+this[_0x38147f(0x21a)]()<=_0xd81ba2['y']+_0xd81ba2[_0x38147f(0x276)]){let _0x1fdf0f=_0x2947c8[_0x38147f(0x248)][_0x38147f(0x301)](_0x1b9036=>_0x1b9036['code']===Game_BattlerBase[_0x38147f(0x1fe)])[_0x38147f(0x167)](_0x562d32=>$dataSystem[_0x38147f(0x2ab)][_0x562d32[_0x38147f(0xb7)]])['join'](',\x20'),_0x51a465='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x38147f(0x34a)](TextManager['skill'],_0x1fdf0f,_0x4d3b37||0x16);if(_0x48101f)_0x51a465=_0x51a465[_0x38147f(0x2a5)](/\\I\[(\d+)\]/gi,'');if(_0x28e346)_0x51a465=_0x38147f(0x155)+_0x51a465;this[_0x38147f(0x199)](_0x51a465,_0x587c47,_0xc88fe,_0x16aad3),_0xc88fe+=this[_0x38147f(0x21a)]();}if(_0x381156[_0x38147f(0x274)]&&_0xc88fe+this['lineHeight']()<=_0xd81ba2['y']+_0xd81ba2[_0x38147f(0x276)]){let _0x2d3950=_0x2947c8[_0x38147f(0x248)][_0x38147f(0x301)](_0x19d3b6=>_0x19d3b6['code']===Game_BattlerBase[_0x38147f(0x216)])[_0x38147f(0x167)](_0x259854=>$dataSystem[_0x38147f(0x262)][_0x259854[_0x38147f(0xb7)]])['join'](',\x20'),_0x3c150c=_0x38147f(0x2ea)['format'](TextManager[_0x38147f(0x2e3)],_0x2d3950,_0x4d3b37||0x16);if(_0x48101f)_0x3c150c=_0x3c150c[_0x38147f(0x2a5)](/\\I\[(\d+)\]/gi,'');if(_0x28e346)_0x3c150c=_0x38147f(0x155)+_0x3c150c;this[_0x38147f(0x199)](_0x3c150c,_0x587c47,_0xc88fe,_0x16aad3),_0xc88fe+=this[_0x38147f(0x21a)]();}if(_0x381156[_0x38147f(0x30c)]&&_0xc88fe+this[_0x38147f(0x21a)]()<=_0xd81ba2['y']+_0xd81ba2[_0x38147f(0x276)]){let _0x1bc33e=_0x2947c8['traits'][_0x38147f(0x301)](_0x54ac62=>_0x54ac62[_0x38147f(0x185)]===Game_BattlerBase['TRAIT_EQUIP_ATYPE'])[_0x38147f(0x167)](_0x4d28be=>$dataSystem[_0x38147f(0x353)][_0x4d28be[_0x38147f(0xb7)]])[_0x38147f(0x18b)](',\x20'),_0x4732d5='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'['format'](TextManager['armor'],_0x1bc33e,_0x4d3b37||0x16);if(_0x48101f)_0x4732d5=_0x4732d5[_0x38147f(0x2a5)](/\\I\[(\d+)\]/gi,'');if(_0x28e346)_0x4732d5=_0x38147f(0x155)+_0x4732d5;this[_0x38147f(0x199)](_0x4732d5,_0x587c47,_0xc88fe,_0x16aad3),_0xc88fe+=this[_0x38147f(0x21a)]();}},Window_ClassTier['prototype'][_0x152cc7(0x340)]=function(){const _0x33db9f=_0x152cc7;Window_ClassCommand['prototype'][_0x33db9f(0x340)][_0x33db9f(0x28f)](this),this[_0x33db9f(0x2c7)]();},Window_ClassTier[_0x152cc7(0x20e)]['checkShiftRemoveShortcut']=function(){const _0x24c42e=_0x152cc7;if(!this['isShiftRemoveShortcutEnabled']())return;if(!this['_actor'])return;Input[_0x24c42e(0xb0)]('shift')&&(this['_actor']&&(this[_0x24c42e(0x316)](this['index']())?(this[_0x24c42e(0xe0)](),this['updateHelp']()):this[_0x24c42e(0x144)]()));},Window_ClassTier[_0x152cc7(0x20e)][_0x152cc7(0x143)]=function(){const _0x3b9709=_0x152cc7;if(!this[_0x3b9709(0x245)])return![];if(!VisuMZ[_0x3b9709(0x1be)]['Settings']['Window'][_0x3b9709(0x17b)])return![];return!![];},Window_ClassTier['prototype'][_0x152cc7(0x316)]=function(_0x7c857e){const _0x14725f=_0x152cc7;if(!this[_0x14725f(0xc6)])return;const _0x3f63c0=this['index']()+0x1;if(_0x3f63c0<=0x1)return![];if(this['_actor'][_0x14725f(0x21b)](_0x3f63c0))return![];if(!this['_actor'][_0x14725f(0x14f)](_0x3f63c0))return![];return!![];;},Window_ClassTier[_0x152cc7(0x20e)][_0x152cc7(0xe0)]=function(){const _0x4d6fe3=_0x152cc7;SoundManager[_0x4d6fe3(0x2f4)](),this['_actor'][_0x4d6fe3(0x119)](0x0,this[_0x4d6fe3(0x1ed)]()+0x1),this[_0x4d6fe3(0xa1)](),SceneManager[_0x4d6fe3(0x23d)]['_statusWindow'][_0x4d6fe3(0xa1)]();};function Window_ClassList(){const _0x215d3e=_0x152cc7;this[_0x215d3e(0x287)](...arguments);}Window_ClassList[_0x152cc7(0x20e)]=Object['create'](Window_ClassCommand[_0x152cc7(0x20e)]),Window_ClassList['prototype'][_0x152cc7(0x16e)]=Window_ClassList,Window_ClassList[_0x152cc7(0x20e)][_0x152cc7(0x287)]=function(_0x2f5846){const _0x14a8ac=_0x152cc7;this['_tier']=0x1,Window_ClassCommand[_0x14a8ac(0x20e)][_0x14a8ac(0x287)][_0x14a8ac(0x28f)](this,_0x2f5846);},Window_ClassList[_0x152cc7(0x20e)][_0x152cc7(0x24f)]=function(){const _0xe62316=_0x152cc7;SoundManager[_0xe62316(0x2f4)]();},Window_ClassList['prototype']['setStatusWindow']=function(_0x233c6b){const _0xa9b41c=_0x152cc7;this[_0xa9b41c(0xd2)]=_0x233c6b,this['callUpdateHelp']();},Window_ClassList[_0x152cc7(0x20e)]['updateHelp']=function(){const _0x30d90b=_0x152cc7;this[_0x30d90b(0x2d6)]&&(this[_0x30d90b(0x229)]()?this[_0x30d90b(0x2d6)][_0x30d90b(0x205)](this[_0x30d90b(0x229)]()):this['_helpWindow'][_0x30d90b(0x146)](TextManager[_0x30d90b(0x27d)])),this[_0x30d90b(0xc6)]&&this[_0x30d90b(0xd2)]&&this[_0x30d90b(0x103)]();},Window_ClassList[_0x152cc7(0x20e)][_0x152cc7(0x103)]=function(){const _0x58bd7a=_0x152cc7,_0x53fcb5=this[_0x58bd7a(0x229)](),_0x4c6881=JsonEx[_0x58bd7a(0x364)](this[_0x58bd7a(0xc6)]);_0x4c6881[_0x58bd7a(0x2b5)]=!![],_0x53fcb5!==this[_0x58bd7a(0xc6)][_0x58bd7a(0x2c9)]()&&(_0x53fcb5?_0x4c6881['changeMulticlass'](_0x53fcb5['id'],this[_0x58bd7a(0x12d)]):_0x4c6881['changeMulticlass'](0x0,this[_0x58bd7a(0x12d)])),this[_0x58bd7a(0xd2)][_0x58bd7a(0x1c6)](_0x4c6881);},Window_ClassList[_0x152cc7(0x20e)]['setTier']=function(_0x47f97f){const _0x57eff0=_0x152cc7;this[_0x57eff0(0x12d)]!==_0x47f97f&&(this[_0x57eff0(0x12d)]=_0x47f97f,this[_0x57eff0(0xa1)]());},Window_ClassList[_0x152cc7(0x20e)][_0x152cc7(0x12b)]=function(){const _0x332c44=_0x152cc7;if(!this['_actor'])return;if(this[_0x332c44(0x12d)]<=0x0)return;const _0x1b7be5=DataManager['getActorUnlockedClasses'](this[_0x332c44(0xc6)]);for(const _0x440387 of _0x1b7be5){if(!_0x440387)continue;let _0x548c20=_0x440387[_0x332c44(0x242)];_0x548c20=_0x548c20[_0x332c44(0x2a5)](/\x1I\[(\d+)\]/gi,''),_0x548c20=_0x548c20['replace'](/\\I\[(\d+)\]/gi,'');const _0x48c570=this[_0x332c44(0xae)](_0x440387);this[_0x332c44(0x2d0)](_0x548c20,_0x332c44(0x31a),_0x48c570,_0x440387);}this[_0x332c44(0x12d)]>0x1&&this[_0x332c44(0x2d0)]('',_0x332c44(0x31a),!![],null);},Window_ClassList[_0x152cc7(0xdd)]=VisuMZ['ClassChangeSystem'][_0x152cc7(0x1a0)]['General'][_0x152cc7(0x219)]??!![],Window_ClassList[_0x152cc7(0x20e)][_0x152cc7(0xae)]=function(_0x55e9ff){const _0x2853fb=_0x152cc7;if(this['_actor'][_0x2853fb(0x21b)](this[_0x2853fb(0x12d)]))return![];if(this[_0x2853fb(0x12d)]>0x1&&_0x55e9ff===this[_0x2853fb(0xc6)][_0x2853fb(0x2c9)]())return![];if(_0x55e9ff){const _0x3f2df8=this[_0x2853fb(0xc6)][_0x2853fb(0x2aa)](_0x55e9ff['id']);if(_0x3f2df8>0x0&&this[_0x2853fb(0xc6)]['isClassChangeTierRestricted'](_0x3f2df8))return![];const _0x37bf7c=DataManager[_0x2853fb(0x15a)](_0x55e9ff);if(!_0x37bf7c[_0x2853fb(0x12a)](this[_0x2853fb(0x12d)]))return![];if(!Window_ClassList[_0x2853fb(0xdd)]){const _0x1de1a9=this[_0x2853fb(0xc6)][_0x2853fb(0x14f)](this[_0x2853fb(0x12d)]);if(_0x1de1a9===_0x55e9ff)return![];}}return this[_0x2853fb(0x12d)]>0x0;},Window_ClassList[_0x152cc7(0x20e)]['drawItem']=function(_0x2fefea){const _0xa9fc53=_0x152cc7;if(!this[_0xa9fc53(0xc6)])return;const _0x4df45c=this[_0xa9fc53(0x2cc)](_0x2fefea),_0x2401a3=this[_0xa9fc53(0x12d)],_0x4a1f5f=this[_0xa9fc53(0x113)][_0x2fefea][_0xa9fc53(0x22e)],_0x3b1cf8=_0x4a1f5f?_0x4a1f5f['id']:0x0,_0x3bcd31=VisuMZ[_0xa9fc53(0x1be)][_0xa9fc53(0x1a0)][_0xa9fc53(0x16c)];if(!_0x3bcd31)return;const _0x1e1c94=_0x3bcd31[_0x2401a3-0x1];if(!_0x1e1c94)return;let _0x3e7e22=_0x4df45c['x'],_0x490421=_0x4df45c['y'],_0x37ae2d=_0x4df45c[_0xa9fc53(0x322)]-this[_0xa9fc53(0xb9)]()*0x2,_0x2bea1c=_0x4df45c['height'],_0x2faa32=Math[_0xa9fc53(0x129)](_0x37ae2d,_0x2bea1c,this[_0xa9fc53(0x21a)]()*0x3);_0x2faa32=Math['floor'](_0x2faa32/ImageManager[_0xa9fc53(0x31b)])*ImageManager[_0xa9fc53(0x31b)],_0x3e7e22+=_0x2faa32+this[_0xa9fc53(0xb9)]()*0x4,this[_0xa9fc53(0xaf)](),this['resetTextColor'](),this[_0xa9fc53(0x147)](_0x4df45c),this[_0xa9fc53(0x343)](this['isEnabled'](_0x4a1f5f));if(!_0x4a1f5f){this['changePaintOpacity'](![]);const _0x184eb1=Math[_0xa9fc53(0x1a9)](_0x4df45c['y']+this[_0xa9fc53(0x21a)]()+(_0x4df45c[_0xa9fc53(0x276)]-this[_0xa9fc53(0x21a)]()*0x2)/0x2);this[_0xa9fc53(0x278)](TextManager[_0xa9fc53(0xe7)],_0x4df45c['x'],_0x184eb1,_0x4df45c[_0xa9fc53(0x322)],_0xa9fc53(0x1cf));return;}this['drawBigItemImage'](_0x2fefea,_0x4a1f5f,_0x4df45c);const _0x145192=this[_0xa9fc53(0xc6)][_0xa9fc53(0x2aa)](_0x3b1cf8);if(_0x145192>0x0){const _0x7d8a92=_0x3bcd31[_0x145192-0x1];_0x7d8a92&&(this[_0xa9fc53(0x165)](ColorManager[_0xa9fc53(0x9b)](_0x7d8a92[_0xa9fc53(0x218)])),this[_0xa9fc53(0x278)](_0x7d8a92[_0xa9fc53(0x18d)],_0x4df45c['x'],_0x4df45c['y'],_0x4df45c['width'],_0xa9fc53(0x1cf)),this[_0xa9fc53(0x133)]());}this[_0xa9fc53(0x343)](this[_0xa9fc53(0xae)](_0x4a1f5f)),_0x490421+=this[_0xa9fc53(0x21a)]();let _0x2f3fae=_0x4a1f5f[_0xa9fc53(0x242)];_0x2f3fae=_0x2f3fae[_0xa9fc53(0x2a5)](/\x1I\[(\d+)\]/gi,''),_0x2f3fae=_0x2f3fae['replace'](/\\I\[(\d+)\]/gi,''),this[_0xa9fc53(0x278)](_0x2f3fae,_0x3e7e22,_0x490421,_0x4df45c[_0xa9fc53(0x322)]-_0x3e7e22),_0x490421+=this['lineHeight'](),this['drawClassLevel'](this[_0xa9fc53(0xc6)],_0x3b1cf8,_0x3e7e22,_0x490421-0x4),_0x490421+=this['lineHeight'](),this[_0xa9fc53(0x356)](_0x3b1cf8,_0x4df45c);};function _0x2e6b(){const _0x134d7c=['exp','onMulticlassOk','_priorityCharacterIndex','multiclass','isRightInputMode','toUpperCase','EnableLayout','ClassFaceName','weapon','attackElements','SharedResource','_classListWindow','Game_Party_initialize','Game_BattlerBase_attackStatesRate','Game_BattlerBase_addedSkills','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','currentClassLevelExp','classPoints','Game_Actor_levelUp','addLoadListener','drawActorClassPoints','Window_ClassStatus_RectJS','_subject','RegExp','gainExp','playClassChange','Game_Actor_setup','pow','JobPointsPlus','ParseActorNotetags','refreshActor','match','graphicType','addWindow','param','tradeItemWithParty','(+%1)','Game_Actor_faceName','filter','allMembers','_classChangeTierRestrictions','setMp','Game_BattlerBase_sparam','addClassChangeSystemCommandAutomatically','Window','centerSprite','description','deadMembers','Game_Actor_characterName','EquipArmors','statusWindowRect','6342EeeMyI','maxLvGaugeColor2','BattleManager_displayRewards','SkillPoints','ClassChangeAddRestrictTier','HelpDescription','return\x200','ClassPointsRate','canShiftRemoveClass','StartClassClassPoints','_commandWindow','addOriginalCommands','classChange','iconWidth','Game_BattlerBase_stateRate','ConfirmAniPrimaryOffsetX','resourceRate','right','loseJobPoints','drawActorFace','width','2832668nvoXjA','ClassUnlockForGlobal','earnedClassPoints','isActor','#%1','Game_Actor_setMenuImage','StartClassJobPoints','imageSmoothingEnabled','Classes','drawClassLevel','actorClassCharacterIndex','loseClassPoints','PLAY_ANI_FOR_UNASSIGN','Game_Actor_changeClass','getUnlockedClasses','learnSkill','multiclassId','BattleManager_gainExp','TargetGainJobPoints','classPicture','Game_BattlerBase_isEquipWtypeOk','maxTp','Window_ClassStatus_BgType','shown','Window_MenuCommand_addOriginalCommands','classTierWindowRect','drawJobPoints','iconIndex','MulticlassRaiseLimit','processCursorMove','setJobPoints','CLASS_CHANGE_ADJUST_HP_MP','changePaintOpacity','stateResistSet','setActor','finalExpRate','paintOpacity','determineActiveWindow','getClassPoints','format','PerLevelUp','loadPicture','exit','Param','ConfirmAniSubclassOffsetY','loadTitle2','drawActorSkillPoints','refreshNoMenuImage','armorTypes','_classPoints','drawBigItemImage','drawClassResources','refreshCursor','releaseUnequippableItems','setup','createClassTierWindow','drawClassExpGauge','process_VisuMZ_ClassChangeSystem_Notetags','ConfirmAnimationID','traitObjects','Game_Actor_getBattlePortraitFilename','setBattlerImage','inBattle','setClassPoints','buttonAssistSlotWindowShift','makeDeepCopy','forceSelect','cancel','isSceneBattle','ElementRates','\x5cI[%1]','getColor','isClassChangeCommandEnabled','_ClassChangeSystem_preventLevelUpGain','getActorClassFaceIndex','params','ClassPointsFlat','refresh','classChange_multiclass_noClass','create','onDatabaseLoaded','Game_Actor_setBattlerImage','process_VisuMZ_ClassChangeSystem','mhp','initMulticlass','BgFilename1','classPointsRate','updateClassLearnedSkills','isRecommendedLayout','version','isEnabled','resetFontSettings','isTriggered','ParamValueFontSize','VocabUnassignClass','TargetGainClassPoints','Game_Actor_releaseUnequippableItems','hideAdditionalSprites','JobPoints','dataId','test','itemPadding','isMainMenuCoreMenuImageOptionAvailable','addChild','drawUpdatedAfterParamValue','shift','getBackgroundOpacity','gainRewardsClassPoints','drawItemActorSprite','contents','split','MulticlassLowerLimit','naturalUnlockClass','drawPicture','_actor','DrawParamJS','isMainMenuClassChangeSystemVisible','ClassPointsAdd','DrawBackRect','setupClassChangeSystem','paramBaseForClass','systemColor','prepareDrawActorFace','Points','arePageButtonsEnabled','getClassChangeBackColor2','_statusWindow','loadFace','ClassID','getActorClassCharacterIndex','_earnedClassPoints','StartingMulticlasses','newPage','EnemyClassPoints','applyMulticlassObjects','checkMulticlasses','debuffRate','ALLOW_SELECT_SAME_SUBCLASS','none','initClassChangeSystemMainMenu','processShiftRemoveShortcut','getBattlePortraitFilename','actorClassFaceIndex','nextActor','5223640iPPBAV','getInputButtonString','members','classChange_multiclass_remove','VisuMZ_1_MessageCore','_classChangeTier','totalMulticlass','_priorityFaceIndex','AbilityPoints','jobPointsAbbr','Actors','XParamRates','isWordWrapEnabled','jobPointsTotal','General','recoverAll','Game_System_initialize','initClassLevels','TextCodeClassNames','\x1bi[%1]%2','Game_Actor_setCharacterImage','Job','classPointsTotal','registerCommand','Game_BattlerBase_xparam','faceName','sparam','ChangeAdjusHpMp','ClassBattlePortrait','levelUpGainClassPoints','ClassBattlerName','updateStatusWindow','BackRectColor','isMainMenuClassChangeSystemEnabled','uiInputPosition','TierOnlyClass','smoothSelect','getMenuImage','jobPointsFull','actorClassBattlerName','Game_BattlerBase_addedSkillTypes','changeClass','Actor-%1-Class-%2','status','VisuMZ_2_SkillLearnSystem','onMenuImageLoad','clearParamPlus','_list','enemy','isAutoColorAffected','remove','add','Tiers','changeMulticlass','StartingClassTier','optExtraExp','ParseAllNotetags','_targets','_classId','onActorChange','ClassUnlockRemoveGlobal','DrawPortraitJS','loadCharacter','endBattle','commandPersonal','_classTierWindow','highestMulticlassTier','_classIDs','AttackStates','min','includes','makeCommandList','createJS','_tier','SystemShowClassChangeSystemMenu','SParamRates','CoreEngine','isEquipAtypeOk','isUseSkillsStatesCoreUpdatedLayout','resetTextColor','_buttonAssistWindow','max','Game_Actor_equips','SnapshotOpacity','jobPointsVisible','drawClassPoints','update','nextClassLevelExp','classIcon','highestTier','ClassPointsGain','gainClassPoints','classListWindowRect','applyItemClassChangeSystemUserEffect','_windowLayer','isShiftRemoveShortcutEnabled','playBuzzerSound','mpRate','setText','drawFadedItemBackground','textSizeEx','length','ClassDescription','playStaticSe','displayRewardsClassPoints','ClassPointsSet','equips','getMulticlassAtTier','onPersonalOk','drawUpdatedBeforeParamValue','MenuPortraits','level','ExtDisplayedParams','<WordWrap>','PerAction','gainSilentTp','isEquipWtypeOk','drawParameterList','getClassChangeTiersOnly','Game_Actor_setBattlePortrait','onClassListCancel','previousActor','adjustSprite','addedSkillTypes','ParamRates','Window_ClassTier_ExtraJS','hpRate','addedSkills','Window_ClassTier_RectJS','changeTextColor','_ClassChangeSystem_MainMenu','map','getActorUnlockedClasses','Game_BattlerBase_attackStates','_priorityFaceName','MaxResource','Multiclass','getClassIdWithName','constructor','onClassListOk','displayRewards','39714vbGYpz','initClassChangeUnlocks','textColor','levelUpGainSkillPoints','show','Limit','PerEnemy','subject','drawItemDarkRect','gainMulticlassRewardPoints','ShiftShortcutKey','getClassChangeAnimationID','boxWidth','actorParams','FullText','gainStartingClassPoints','forceRemoveClassChangeAnimations','MaintainLevels','characterIndex','getActorClassBattlePortrait','code','setTier','initClassChangeRestrictions','concat','buttonAssistText3','isBattleMember','join','maxLvGaugeColor1','Name','AliveActors','MulticlassChangeActorClass','UserGainJobPoints','setMulticlassTiers','DrawFaceJS','jobPoints','JobPointsAdd','ConfirmAniPrimaryOffsetY','ActorUnlockedClasses','getAbilityPoints','VisuMZ_0_CoreEngine','drawTextEx','paramValueByName','gainClassPointsForMulticlasses','buttonAssistOffset3','classLevel','FUNC','ShowVictory','Settings','_jobPoints','setMenuImage','Game_Actor_traitObjects','AddedStypes','levelUpGainJobPoints','getActorClassMenuPortrait','applyClassChangeSystemUserEffect','BattleCore','round','onBattleStart','colSpacing','pagedown','databaseObjectName','RestrictClassChangeTier','setMainMenuClassChangeSystemEnabled','DisplayedResources','enabled','loadTitle1','maxLevel','setMainMenuClassChangeSystemVisible','VocabNoClassAssigned','classDescription','makeRewards','setStatusWindow','updateClassChangeAnimations','functionName','gainMulticlassExp','addJobPoints','addClassChangeTierRestriction','ClassChangeSystem','Tier','classAdjustHpMp','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','expParams','18VaBsNb','startClassChangeAnimation','jobPointsIcon','setTempActor','MAX_SAFE_INTEGER','_classLevel','ClassCharaName','Class','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','pageup','removeClassChangeTierRestriction','Game_BattlerBase_attackElements','center','drawActorResources','bigPicture','Game_Action_applyItemUserEffect','actorId','_backSprite2','expForClassLevel','Game_Battler_gainSilentTp','setHandler','Game_Actor_tradeItemWithParty','jobPointsFmt','Game_BattlerBase_paramRate','skillId','ClassChangeRemoveRestrictTier','deactivate','isClassChangeCommandVisible','mainAreaTop','drawActorAbilityPoints','initClassPoints','2051ZaKUZe','BattleManager_endBattle','updatedLayoutStyle','classChangeMenuCommand','classLevelUp','activate','applyItemUserEffect','AllowClearClassAni','AutoUnlockRequirements','initJobPoints','ARRAYSTRUCT','index','gradientFillRect','actorClassBattlePortrait','push','createStatusWindow','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','gain%1Points','applyClassPoints','setBackgroundType','Scene_Boot_onDatabaseLoaded','frames','loadSvActor','createKeyJS','JSON','gainStartingJobPoints','paramchangeTextColor','_priorityCharacterName','TRAIT_STYPE_ADD','_multiclassTiers','xparam','classPointsIcon','ParamArrow','ConvertParams','expRate','setItem','setCharacterImage','updateClassLevel','DrawIcons','createBackground','prepareDrawActorSvBattler','refreshActorPortrait','Game_Actor_faceIndex','ClassChangeAnimation','prototype','isMVAnimation','actor','BattleManager_makeRewards','log','Parse_Notetags_Basic','ARRAYNUM','changeClassExp','TRAIT_EQUIP_WTYPE','levelUp','TextColor','AllowSameSubclassSelect','lineHeight','isClassChangeTierRestricted','MulticlassSetLimit','_unlockedClasses','earnedJobPoints','updateHelp','blt','Game_BattlerBase_isEquipAtypeOk','AttackElements','classPointsAbbr','sprite','actorClassCharacterName','drawUpdatedParamName','reduce','uiMenuStyle','currentExt','UnassignHelpDescription','STRUCT','actorClassFaceName','Game_BattlerBase_stateResistSet','ext','_multiclasses','elementRate','left','JobPointsFlat','hide','_tp','parameters','bitmap','Game_Battler_onBattleStart','ARRAYSTR','VictoryText','faceIndex','multiclasses','setHelpWindow','_scene','isPlaytest','tier','addClassPoints','Skill-%1-%2','name','JobPointsLose','isClassAutoUnlockRequirementsMet','active','getJobPoints','innerHeight','traits','drawRightArrow','Show','unlockClass','gainRewardsJobPoints','makeRewardsJobPoints','bind','playOkSound','_exp','drawItemActorSvBattler','splice','498096oODNsf','_wordWrap','_highestTier','_rewards','Game_BattlerBase_debuffRate','_multiclassCheck','Scene_Menu_createCommandWindow','drawActorJobPoints','registerActorClassImages','_context','trim','Icon','Game_Actor_getMenuImage','Game_Actor_characterIndex','Game_Actor_battlerName','weaponTypes','visibleResources','AbbrText','battleMembers','drawExtraContents','parse','1758445OvQTPu','ARRAYJSON','326035MAgVhx','_cache','clamp','actorClassMenuPortrait','EnableMainMenu','getMulticlasses','addClassChangeSystemCommand','JobPointsSet','applyJobPoints','rightArrowWidth','EquipWeapons','drawItemActorMenuImage','height','floor','drawText','prepareRefreshItemsEquipsCoreLayout','CLASS_CHANGE_SHOW_CLASS_LEVEL','displayRewardsJobPoints','ClassUnlockForActor','classChange_multiclass_remove_help','setBattlePortrait','createClassListWindow','paramBase','paramValueFontSize','UserGainClassPoints','checkForAutoClassUnlocks','_priorityMenuImage','createCommandWindow','MainMenu','initialize','Parse_ClassIcons','getActorClassCharacterName','innerWidth','_priorityBattlerName','_animations','AlwaysUnlocked','getActorClassFaceName','call','JobPointsRate','_backSprite1','ShowClassLevel','ClassMenuPortrait','iconHeight','ClassIcon','loadSystem','sort','removeChild','BgFilename2','indexOf','stateRate','Weapon-%1-%2','VisuMZ_2_ClassChangeSystem','dimColor1','_priorityBattlePortrait','antiEquipsCacheClear_BattleCore_ClassChangeSystem','createHelpWindow','itemHeight','ConfirmAniSubclassOffsetX','classPointsFmt','replace','note','characterName','maintainLevels','(%1)','findMulticlassTier','skillTypes','mainAreaHeight','dimColor2','isClassExpGaugeDrawn','getActorClassBattlerName','loseMulticlassTiers','createClassChangeAnimation','battlerName','gainJobPoints','State-%1-%2','_tempActor','removeUnlockedClass','createAnimationDummySprite','StateRates','Window_Base_databaseObjectName','LvExpGauge','BgSettings','_earnedJobPoints','checkForNewUnlockedClasses','makeRewardsClassPoints','levelUpGainAbilityPoints','DebuffRates','attackStates','popScene','getSkillPoints','drawBigItemIcon','createCustomBackgroundImages','ClassPoints','checkShiftRemoveShortcut','expGaugeColor1','currentClass','uiHelpPosition','ParseClassNotetags','itemRectWithPadding','TextFmt','isAlive','attackStatesRate','addCommand','addMulticlassTiers','isPlaying','_updateClassLearnedSkills','Game_BattlerBase_elementRate','isLearnedSkill','_helpWindow','EnemyJobPoints','StartingClassPoints','gainJobPointsForMulticlasses','jobPointsRate'];_0x2e6b=function(){return _0x134d7c;};return _0x2e6b();}