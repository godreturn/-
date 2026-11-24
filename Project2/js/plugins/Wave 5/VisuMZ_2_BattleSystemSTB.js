//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.24;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.24] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Standard Turn Battle
 * is in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * VisuMZ_4_BreakShields
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
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
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
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
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
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
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Forced Actions:
 *   - Apply exploit system to Forced Actions?
 *   - We added this function because forced actions can disrupt player
 *     strategies when used with the exploit system.
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
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
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
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
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
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
 * Version 1.24: July 20, 2026
 * * Bug Fixes!
 * ** Fixed a bug where if an escape attempt is made, the turn count would skip
 *    entirely and fast forward to the following and after. This should no
 *    longer happen. Fix made by Olivia.
 * 
 * Version 1.23: May 18, 2026
 * * Bug Fixes!
 * ** Fixed a bug where if a stun is cleared before an actor's turn, the actor
 *    would lose that turn. This should no longer happen. Fix made by Olivia.
 * 
 * Version 1.22: February 16, 2026
 * * Bug Fixes!
 * ** Fixed a bug where <STB Cannot Be Exploited> and <STB Cannot Be Exploiter>
 *    notetags were not working properly. Bug fixed by Olivia.
 * 
 * Version 1.21: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where auto-battle would not give ONE MORE! bonus to actors.
 *    Fix made by Olivia.
 * 
 * Version 1.20: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving auto-battle that would give infinite actions if
 *    cancelled at specific timings. Fix made by Olivia.
 * 
 * Version 1.19: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the STB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.16: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.15: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Exploit System Settings > Forced Actions
 * **** Apply exploit system to Forced Actions?
 * **** We added this function because forced actions can disrupt player
 *      strategies when used with the exploit system.
 * 
 * Version 1.14: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
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
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
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
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
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
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
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
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param ForcedActions:eval
 * @text Forced Actions
 * @parent Exploit
 * @type boolean
 * @on Apply
 * @off Don't Apply
 * @desc Apply exploit system to Forced Actions?
 * @default false
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
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
//=============================================================================

const _0x2492b8=_0x46e8;(function(_0x3f26cd,_0x4f75f9){const _0x3c8050=_0x46e8,_0xe1dc6b=_0x3f26cd();while(!![]){try{const _0x544477=-parseInt(_0x3c8050(0x121))/0x1+parseInt(_0x3c8050(0x129))/0x2*(parseInt(_0x3c8050(0x1be))/0x3)+-parseInt(_0x3c8050(0x19e))/0x4*(-parseInt(_0x3c8050(0x119))/0x5)+-parseInt(_0x3c8050(0x23a))/0x6+parseInt(_0x3c8050(0x1c0))/0x7+-parseInt(_0x3c8050(0x185))/0x8+parseInt(_0x3c8050(0x246))/0x9*(parseInt(_0x3c8050(0x16b))/0xa);if(_0x544477===_0x4f75f9)break;else _0xe1dc6b['push'](_0xe1dc6b['shift']());}catch(_0x1e4734){_0xe1dc6b['push'](_0xe1dc6b['shift']());}}}(_0x28b9,0xcff4c));var label=_0x2492b8(0x268),tier=tier||0x0,dependencies=[_0x2492b8(0x1f8),_0x2492b8(0x200)],pluginData=$plugins[_0x2492b8(0x1f1)](function(_0xb608b){const _0x5dba1a=_0x2492b8;return _0xb608b['status']&&_0xb608b[_0x5dba1a(0x207)][_0x5dba1a(0x2c0)]('['+label+']');})[0x0];function _0x46e8(_0x1aa8de,_0x46d183){const _0x28b934=_0x28b9();return _0x46e8=function(_0x46e889,_0x241693){_0x46e889=_0x46e889-0x112;let _0x3866eb=_0x28b934[_0x46e889];return _0x3866eb;},_0x46e8(_0x1aa8de,_0x46d183);}VisuMZ[label][_0x2492b8(0x236)]=VisuMZ[label][_0x2492b8(0x236)]||{},VisuMZ['ConvertParams']=function(_0x31b0ac,_0x3b4597){const _0x279f55=_0x2492b8;for(const _0xfa27c9 in _0x3b4597){if(_0xfa27c9[_0x279f55(0x153)](/(.*):(.*)/i)){const _0x868fd0=String(RegExp['$1']),_0x5573a8=String(RegExp['$2'])['toUpperCase']()[_0x279f55(0x165)]();let _0x16af29,_0x5c1eed,_0x225ffe;switch(_0x5573a8){case'NUM':_0x16af29=_0x3b4597[_0xfa27c9]!==''?Number(_0x3b4597[_0xfa27c9]):0x0;break;case _0x279f55(0x123):_0x5c1eed=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):[],_0x16af29=_0x5c1eed[_0x279f55(0x274)](_0x55d518=>Number(_0x55d518));break;case _0x279f55(0x287):_0x16af29=_0x3b4597[_0xfa27c9]!==''?eval(_0x3b4597[_0xfa27c9]):null;break;case _0x279f55(0x244):_0x5c1eed=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):[],_0x16af29=_0x5c1eed['map'](_0x1fcfaf=>eval(_0x1fcfaf));break;case _0x279f55(0x1f2):_0x16af29=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):'';break;case'ARRAYJSON':_0x5c1eed=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):[],_0x16af29=_0x5c1eed[_0x279f55(0x274)](_0x2b9428=>JSON[_0x279f55(0x2ad)](_0x2b9428));break;case'FUNC':_0x16af29=_0x3b4597[_0xfa27c9]!==''?new Function(JSON['parse'](_0x3b4597[_0xfa27c9])):new Function(_0x279f55(0x2c4));break;case _0x279f55(0x14f):_0x5c1eed=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):[],_0x16af29=_0x5c1eed['map'](_0x29d69b=>new Function(JSON[_0x279f55(0x2ad)](_0x29d69b)));break;case _0x279f55(0x131):_0x16af29=_0x3b4597[_0xfa27c9]!==''?String(_0x3b4597[_0xfa27c9]):'';break;case _0x279f55(0x230):_0x5c1eed=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):[],_0x16af29=_0x5c1eed[_0x279f55(0x274)](_0x489ec4=>String(_0x489ec4));break;case _0x279f55(0x238):_0x225ffe=_0x3b4597[_0xfa27c9]!==''?JSON['parse'](_0x3b4597[_0xfa27c9]):{},_0x16af29=VisuMZ[_0x279f55(0x29d)]({},_0x225ffe);break;case'ARRAYSTRUCT':_0x5c1eed=_0x3b4597[_0xfa27c9]!==''?JSON[_0x279f55(0x2ad)](_0x3b4597[_0xfa27c9]):[],_0x16af29=_0x5c1eed['map'](_0x2e18d5=>VisuMZ[_0x279f55(0x29d)]({},JSON['parse'](_0x2e18d5)));break;default:continue;}_0x31b0ac[_0x868fd0]=_0x16af29;}}return _0x31b0ac;},(_0x4db86e=>{const _0x531d30=_0x2492b8,_0x22308a=_0x4db86e[_0x531d30(0x24e)];for(const _0xb8b5e7 of dependencies){if(!Imported[_0xb8b5e7]){alert(_0x531d30(0x26a)[_0x531d30(0x15b)](_0x22308a,_0xb8b5e7)),SceneManager['exit']();break;}}const _0x547621=_0x4db86e['description'];if(_0x547621[_0x531d30(0x153)](/\[Version[ ](.*?)\]/i)){const _0x5a4635=Number(RegExp['$1']);_0x5a4635!==VisuMZ[label][_0x531d30(0x288)]&&(alert(_0x531d30(0x23b)[_0x531d30(0x15b)](_0x22308a,_0x5a4635)),SceneManager[_0x531d30(0x1d0)]());}if(_0x547621['match'](/\[Tier[ ](\d+)\]/i)){const _0x46710b=Number(RegExp['$1']);_0x46710b<tier?(alert(_0x531d30(0x24c)[_0x531d30(0x15b)](_0x22308a,_0x46710b,tier)),SceneManager[_0x531d30(0x1d0)]()):tier=Math['max'](_0x46710b,tier);}VisuMZ[_0x531d30(0x29d)](VisuMZ[label][_0x531d30(0x236)],_0x4db86e[_0x531d30(0x135)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2492b8(0x24e)],_0x2492b8(0x1c3),_0x3d041c=>{const _0x35bcf0=_0x2492b8;VisuMZ[_0x35bcf0(0x29d)](_0x3d041c,_0x3d041c);const _0x3f5bc3=_0x3d041c[_0x35bcf0(0x224)],_0x2f4ee5=_0x3d041c['IconIndex'];for(const _0x537438 of _0x3f5bc3){const _0x7cd325=$gameActors[_0x35bcf0(0x2bf)](_0x537438);if(!_0x7cd325)continue;_0x7cd325[_0x35bcf0(0x19d)]=_0x35bcf0(0x1a2),_0x7cd325[_0x35bcf0(0x21d)]=_0x2f4ee5;}}),PluginManager[_0x2492b8(0x1cc)](pluginData['name'],_0x2492b8(0x217),_0x1a7730=>{const _0x40a54b=_0x2492b8;VisuMZ['ConvertParams'](_0x1a7730,_0x1a7730);const _0x98993b=_0x1a7730['Actors'],_0x5a9198=_0x1a7730[_0x40a54b(0x126)],_0x4a8a70=_0x1a7730[_0x40a54b(0x223)];for(const _0xa5a262 of _0x98993b){const _0x5a902f=$gameActors[_0x40a54b(0x2bf)](_0xa5a262);if(!_0x5a902f)continue;_0x5a902f['_stbTurnOrderGraphicType']=_0x40a54b(0x21f),_0x5a902f[_0x40a54b(0x151)]=_0x5a9198,_0x5a902f[_0x40a54b(0x136)]=_0x4a8a70;}}),PluginManager[_0x2492b8(0x1cc)](pluginData['name'],_0x2492b8(0x2b9),_0x23d36f=>{const _0x1af32c=_0x2492b8;VisuMZ[_0x1af32c(0x29d)](_0x23d36f,_0x23d36f);const _0x401695=_0x23d36f[_0x1af32c(0x224)];for(const _0x1400a3 of _0x401695){const _0x5da9a8=$gameActors[_0x1af32c(0x2bf)](_0x1400a3);if(!_0x5da9a8)continue;_0x5da9a8[_0x1af32c(0x11d)]();}}),PluginManager['registerCommand'](pluginData['name'],_0x2492b8(0x180),_0xb5bf10=>{const _0x14f0be=_0x2492b8;VisuMZ[_0x14f0be(0x29d)](_0xb5bf10,_0xb5bf10);const _0x2f8e43=_0xb5bf10[_0x14f0be(0x149)],_0x26c461=_0xb5bf10[_0x14f0be(0x1c5)];for(const _0x1a61d9 of _0x2f8e43){const _0x5531d9=$gameTroop['members']()[_0x1a61d9];if(!_0x5531d9)continue;_0x5531d9[_0x14f0be(0x19d)]=_0x14f0be(0x1a2),_0x5531d9[_0x14f0be(0x21d)]=_0x26c461;}}),PluginManager[_0x2492b8(0x1cc)](pluginData[_0x2492b8(0x24e)],_0x2492b8(0x1dc),_0x3992eb=>{const _0x36bcf8=_0x2492b8;VisuMZ['ConvertParams'](_0x3992eb,_0x3992eb);const _0x3bffec=_0x3992eb['Enemies'],_0x3a6ccc=_0x3992eb[_0x36bcf8(0x126)],_0x31a99b=_0x3992eb[_0x36bcf8(0x223)];for(const _0x3cb614 of _0x3bffec){const _0x3cf924=$gameTroop[_0x36bcf8(0x1b0)]()[_0x3cb614];if(!_0x3cf924)continue;_0x3cf924[_0x36bcf8(0x19d)]=_0x36bcf8(0x21f),_0x3cf924[_0x36bcf8(0x151)]=_0x3a6ccc,_0x3cf924['_stbTurnOrderFaceIndex']=_0x31a99b;}}),PluginManager[_0x2492b8(0x1cc)](pluginData['name'],'StbTurnOrderClearEnemyGraphic',_0x47e8c6=>{const _0x110cb0=_0x2492b8;VisuMZ[_0x110cb0(0x29d)](_0x47e8c6,_0x47e8c6);const _0xc3beb6=_0x47e8c6[_0x110cb0(0x149)];for(const _0x12cd22 of _0xc3beb6){const _0x1f4c8c=$gameTroop[_0x110cb0(0x1b0)]()[_0x12cd22];if(!_0x1f4c8c)continue;_0x1f4c8c[_0x110cb0(0x11d)]();}}),PluginManager['registerCommand'](pluginData[_0x2492b8(0x24e)],_0x2492b8(0x1d3),_0x19ecc8=>{const _0x17dfcb=_0x2492b8;VisuMZ[_0x17dfcb(0x29d)](_0x19ecc8,_0x19ecc8);const _0x57eea5=_0x19ecc8[_0x17dfcb(0x1bb)];$gameSystem[_0x17dfcb(0x261)](_0x57eea5);}),VisuMZ[_0x2492b8(0x268)]['RegExp']={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x2492b8(0x219)]=function(_0x1ec63b){const _0x3b97f6=_0x2492b8;_0x1ec63b=_0x1ec63b[_0x3b97f6(0x2b7)]()[_0x3b97f6(0x165)](),this[_0x3b97f6(0x191)]=this[_0x3b97f6(0x191)]||{};if(this[_0x3b97f6(0x191)][_0x1ec63b])return this[_0x3b97f6(0x191)][_0x1ec63b];for(const _0x1e120a of $dataStates){if(!_0x1e120a)continue;this['_stateIDs'][_0x1e120a['name'][_0x3b97f6(0x2b7)]()['trim']()]=_0x1e120a['id'];}return this[_0x3b97f6(0x191)][_0x1ec63b]||0x0;},ImageManager[_0x2492b8(0x147)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x2492b8(0x239)]=ImageManager[_0x2492b8(0x239)]||0x6,SceneManager[_0x2492b8(0x298)]=function(){const _0x3913e3=_0x2492b8;return this[_0x3913e3(0x14d)]&&this['_scene']['constructor']===Scene_Battle;},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x15f)]=BattleManager[_0x2492b8(0x2a3)],BattleManager[_0x2492b8(0x2a3)]=function(){const _0x5247f6=_0x2492b8;if(this[_0x5247f6(0x1da)]())return _0x5247f6(0x25f);return VisuMZ[_0x5247f6(0x268)]['BattleManager_battleSys'][_0x5247f6(0x29c)](this);},BattleManager[_0x2492b8(0x1da)]=function(){const _0x34feba=_0x2492b8;return $gameSystem[_0x34feba(0x18b)]()===_0x34feba(0x25f);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x12a)]=BattleManager[_0x2492b8(0x291)],BattleManager['isTpb']=function(){const _0x3f1c02=_0x2492b8;if(this[_0x3f1c02(0x1da)]())return![];return VisuMZ[_0x3f1c02(0x268)]['BattleManager_isTpb'][_0x3f1c02(0x29c)](this);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x2a4)]=BattleManager['isActiveTpb'],BattleManager[_0x2492b8(0x22b)]=function(){const _0x34ea70=_0x2492b8;if(this[_0x34ea70(0x1da)]())return![];return VisuMZ[_0x34ea70(0x268)][_0x34ea70(0x2a4)][_0x34ea70(0x29c)](this);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x1e7)]=BattleManager[_0x2492b8(0x197)],BattleManager[_0x2492b8(0x197)]=function(){const _0x3d0395=_0x2492b8;if(this[_0x3d0395(0x1da)]())return!![];return VisuMZ[_0x3d0395(0x268)]['BattleManager_isTurnBased'][_0x3d0395(0x29c)](this);},VisuMZ[_0x2492b8(0x268)]['BattleManager_startInput']=BattleManager[_0x2492b8(0x1fd)],BattleManager[_0x2492b8(0x1fd)]=function(){const _0x4a072f=_0x2492b8;VisuMZ[_0x4a072f(0x268)][_0x4a072f(0x2d4)]['call'](this);if(this[_0x4a072f(0x1da)]()&&$gameParty['canInput']()&&!this[_0x4a072f(0x27e)])this[_0x4a072f(0x1ac)]();},BattleManager[_0x2492b8(0x1ac)]=function(){const _0x1321b2=_0x2492b8;this[_0x1321b2(0x273)]();},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x1b5)]=BattleManager['processTurn'],BattleManager[_0x2492b8(0x284)]=function(){const _0x136915=_0x2492b8;this['isSTB']()?this[_0x136915(0x225)]():VisuMZ[_0x136915(0x268)][_0x136915(0x1b5)]['call'](this);},BattleManager['processTurnSTB']=function(){const _0x14eb9d=_0x2492b8,_0x43e6c9=this[_0x14eb9d(0x2b8)];if(_0x43e6c9[_0x14eb9d(0x1cb)]()&&_0x43e6c9[_0x14eb9d(0x272)]()){const _0xe71b59=_0x43e6c9[_0x14eb9d(0x1e0)]();if(!_0xe71b59)VisuMZ[_0x14eb9d(0x268)]['BattleManager_processTurn'][_0x14eb9d(0x29c)](this);else _0xe71b59[_0x14eb9d(0x2c9)]?VisuMZ[_0x14eb9d(0x268)][_0x14eb9d(0x1b5)][_0x14eb9d(0x29c)](this):(this[_0x14eb9d(0x294)]=_0x43e6c9,this['startActorInput']());}else VisuMZ[_0x14eb9d(0x268)]['BattleManager_processTurn']['call'](this);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x134)]=BattleManager['finishActorInput'],BattleManager['finishActorInput']=function(){const _0x4c3b80=_0x2492b8;this[_0x4c3b80(0x1da)]()?VisuMZ[_0x4c3b80(0x268)][_0x4c3b80(0x1b5)]['call'](this):VisuMZ[_0x4c3b80(0x268)][_0x4c3b80(0x134)][_0x4c3b80(0x29c)](this);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x12e)]=BattleManager['selectNextActor'],BattleManager[_0x2492b8(0x1e5)]=function(){const _0x30bb2c=_0x2492b8;this['isSTB']()?this[_0x30bb2c(0x233)]():VisuMZ[_0x30bb2c(0x268)][_0x30bb2c(0x12e)][_0x30bb2c(0x29c)](this);},BattleManager[_0x2492b8(0x233)]=function(){this['_currentActor']=null,this['_inputting']=![];},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x237)]=BattleManager['endAction'],BattleManager[_0x2492b8(0x13e)]=function(){const _0x62c67a=_0x2492b8;VisuMZ['BattleSystemSTB']['BattleManager_endAction'][_0x62c67a(0x29c)](this),this['endActionSTB']();},BattleManager[_0x2492b8(0x194)]=function(){const _0x8c59af=_0x2492b8;if(!this['isSTB']())return;this[_0x8c59af(0x2d1)]();this[_0x8c59af(0x2ce)][_0x8c59af(0x2a1)]>0x0&&(this[_0x8c59af(0x2b8)]&&(!this[_0x8c59af(0x2cf)][_0x8c59af(0x2c0)](this[_0x8c59af(0x2b8)])&&this['_actionBattlers'][_0x8c59af(0x213)](this[_0x8c59af(0x2b8)])),this[_0x8c59af(0x2b8)]=this['getNextSubject']());;},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x199)]=BattleManager[_0x2492b8(0x1e3)],BattleManager[_0x2492b8(0x1e3)]=function(){const _0x2e6ff4=_0x2492b8;this[_0x2e6ff4(0x1da)]()?this['onEscapeFailureSTB']():VisuMZ[_0x2e6ff4(0x268)]['BattleManager_onEscapeFailure'][_0x2e6ff4(0x29c)](this);},BattleManager[_0x2492b8(0x2b4)]=function(){const _0x1a0868=_0x2492b8;this[_0x1a0868(0x1f5)](_0x1a0868(0x296));const _0x3b8a4c=this[_0x1a0868(0x292)];$gameParty[_0x1a0868(0x1e3)](),this[_0x1a0868(0x181)](),this[_0x1a0868(0x292)]=_0x3b8a4c+VisuMZ['BattleCore'][_0x1a0868(0x236)][_0x1a0868(0x1ad)]['CalcEscapeRaiseJS']['call'](this),this[_0x1a0868(0x2c8)]=![],this[_0x1a0868(0x2a0)](_0x1a0868(0x18d));},BattleManager['isSTBExploitSystemEnabled']=function(){const _0x508d56=_0x2492b8;return VisuMZ['BattleSystemSTB']['Settings']['Exploit'][_0x508d56(0x27d)];},BattleManager[_0x2492b8(0x171)]=function(){const _0x5a5de5=_0x2492b8,_0x3e7115=$gameParty[_0x5a5de5(0x158)]()['filter'](_0x4efb88=>_0x4efb88['isAppeared']()),_0x5ab7cf=_0x3e7115[_0x5a5de5(0x1f1)](_0x2c6e51=>_0x2c6e51[_0x5a5de5(0x132)]());return _0x3e7115[_0x5a5de5(0x2a1)]===_0x5ab7cf[_0x5a5de5(0x2a1)];},BattleManager[_0x2492b8(0x21c)]=function(){const _0x162a38=_0x2492b8,_0x173b2f=$gameTroop['aliveMembers']()[_0x162a38(0x1f1)](_0x4abef1=>_0x4abef1['isAppeared']()),_0x46ec30=_0x173b2f[_0x162a38(0x1f1)](_0x28c8c7=>_0x28c8c7[_0x162a38(0x132)]());return _0x173b2f['length']===_0x46ec30[_0x162a38(0x2a1)];},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x141)]=BattleManager[_0x2492b8(0x28f)],BattleManager[_0x2492b8(0x28f)]=function(){const _0x3cc510=_0x2492b8;VisuMZ[_0x3cc510(0x268)][_0x3cc510(0x141)][_0x3cc510(0x29c)](this),this[_0x3cc510(0x1da)]()&&(this[_0x3cc510(0x2d1)](),this['updateTurnOrderSTB'](),this['clearNextTurnSpeedSTB']());},BattleManager[_0x2492b8(0x2d1)]=function(){const _0x56af26=_0x2492b8;if(!this[_0x56af26(0x1da)]())return;this['_actionBattlers']=this[_0x56af26(0x2cf)]||[],this[_0x56af26(0x2cf)]=this[_0x56af26(0x2cf)][_0x56af26(0x1f1)](_0x34f4fd=>_0x34f4fd&&_0x34f4fd[_0x56af26(0x2a8)]()&&_0x34f4fd[_0x56af26(0x1ef)]()),this[_0x56af26(0x1c9)]();},BattleManager[_0x2492b8(0x1c9)]=function(_0x83e188){const _0x39ad4c=_0x2492b8;if(!this[_0x39ad4c(0x1da)]())return;const _0x527ecc=SceneManager[_0x39ad4c(0x14d)][_0x39ad4c(0x146)];if(!_0x527ecc)return;_0x527ecc[_0x39ad4c(0x2c2)](_0x83e188);},BattleManager[_0x2492b8(0x2bc)]=function(){const _0x2d0634=_0x2492b8;for(const _0x50774e of this[_0x2d0634(0x25c)]()){if(!_0x50774e)continue;_0x50774e[_0x2d0634(0x276)](0x0);}},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x11f)]=Game_System[_0x2492b8(0x20a)][_0x2492b8(0x1df)],Game_System[_0x2492b8(0x20a)][_0x2492b8(0x1df)]=function(){const _0xdb05dc=_0x2492b8;VisuMZ[_0xdb05dc(0x268)]['Game_System_initialize'][_0xdb05dc(0x29c)](this),this[_0xdb05dc(0x27a)]();},Game_System[_0x2492b8(0x20a)][_0x2492b8(0x27a)]=function(){const _0x42f7c6=_0x2492b8;this[_0x42f7c6(0x26e)]=!![];},Game_System[_0x2492b8(0x20a)]['isBattleSystemSTBTurnOrderVisible']=function(){const _0x572bb7=_0x2492b8;return this[_0x572bb7(0x26e)]===undefined&&this['initBattleSystemSTB'](),this[_0x572bb7(0x26e)];},Game_System['prototype'][_0x2492b8(0x261)]=function(_0xaa60c6){const _0x57a2d1=_0x2492b8;this[_0x57a2d1(0x26e)]===undefined&&this['initBattleSystemSTB'](),this['_stbTurnOrderVisible']=_0xaa60c6;},VisuMZ[_0x2492b8(0x268)]['Game_Action_speed']=Game_Action[_0x2492b8(0x20a)][_0x2492b8(0x190)],Game_Action['prototype'][_0x2492b8(0x190)]=function(){const _0xdd44cb=_0x2492b8;return BattleManager[_0xdd44cb(0x1da)]()?0x0:VisuMZ[_0xdd44cb(0x268)][_0xdd44cb(0x124)]['call'](this);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x182)]=Game_Action[_0x2492b8(0x20a)][_0x2492b8(0x2a2)],Game_Action[_0x2492b8(0x20a)]['applyGlobal']=function(){const _0x70e0ea=_0x2492b8;VisuMZ[_0x70e0ea(0x268)][_0x70e0ea(0x182)][_0x70e0ea(0x29c)](this),this[_0x70e0ea(0x17a)]();},Game_Action[_0x2492b8(0x20a)][_0x2492b8(0x17a)]=function(){const _0x24f5d0=_0x2492b8;if(!SceneManager[_0x24f5d0(0x298)]())return;if(!BattleManager[_0x24f5d0(0x1da)]())return;const _0x4aec8e=this[_0x24f5d0(0x241)](),_0x45027e=VisuMZ[_0x24f5d0(0x268)][_0x24f5d0(0x2aa)],_0xf2f698=VisuMZ[_0x24f5d0(0x268)][_0x24f5d0(0x236)][_0x24f5d0(0x2c5)];_0x4aec8e&&_0x4aec8e[_0x24f5d0(0x1c1)][_0x24f5d0(0x153)](_0x45027e[_0x24f5d0(0x209)])&&this[_0x24f5d0(0x222)]()[_0x24f5d0(0x27b)](0x1);const _0x4e5c8e=_0xf2f698[_0x24f5d0(0x2c7)][_0x24f5d0(0x29c)](this);this[_0x24f5d0(0x222)]()[_0x24f5d0(0x229)](_0x4e5c8e);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x252)]=Game_Action['prototype'][_0x2492b8(0x240)],Game_Action['prototype'][_0x2492b8(0x240)]=function(){const _0x1e8019=_0x2492b8;VisuMZ[_0x1e8019(0x268)][_0x1e8019(0x252)][_0x1e8019(0x29c)](this),this[_0x1e8019(0x20c)]();},Game_Action[_0x2492b8(0x20a)][_0x2492b8(0x20c)]=function(){const _0xfb6460=_0x2492b8;this['_stbExploitAdvantageFlag']=![],this[_0xfb6460(0x166)]=![];},Game_Action[_0x2492b8(0x20a)]['hasSTBExploited']=function(){const _0x34e62c=_0x2492b8;return this['_stbExploitAdvantageFlag']===undefined&&this['clearSTB'](),this[_0x34e62c(0x1c2)];},Game_Action[_0x2492b8(0x20a)][_0x2492b8(0x28a)]=function(_0x2ab20e){const _0x32e593=_0x2492b8;this[_0x32e593(0x1c2)]===undefined&&this['clearSTB'](),this['_stbExploitAdvantageFlag']=_0x2ab20e;},VisuMZ['BattleSystemSTB'][_0x2492b8(0x2d5)]=Game_Action['prototype'][_0x2492b8(0x18c)],Game_Action['prototype'][_0x2492b8(0x18c)]=function(_0x2c2910,_0x1f4b12){const _0x418ba8=_0x2492b8;VisuMZ['BattleSystemSTB'][_0x418ba8(0x2d5)][_0x418ba8(0x29c)](this,_0x2c2910,_0x1f4b12),this[_0x418ba8(0x25a)](_0x2c2910);},Game_Action['prototype'][_0x2492b8(0x25a)]=function(_0x11a1ea){const _0x2d0f15=_0x2492b8;if(!SceneManager['isSceneBattle']())return;if(!BattleManager['isSTB']())return;if(!BattleManager[_0x2d0f15(0x21b)]())return;if(_0x11a1ea[_0x2d0f15(0x2cb)]()===this[_0x2d0f15(0x222)]()['friendsUnit']())return;const _0x4ae003=VisuMZ[_0x2d0f15(0x268)]['Settings']['Exploit'],_0x28e6f1=_0x11a1ea[_0x2d0f15(0x176)]();if(!_0x4ae003[_0x2d0f15(0x1b2)]&&this[_0x2d0f15(0x127)])return;_0x4ae003['ExploitCritical']&&_0x28e6f1['critical']&&(this['subject']()['performSTBExploiter'](_0x11a1ea,this),_0x11a1ea[_0x2d0f15(0x1bd)](this['subject'](),this));if(_0x4ae003[_0x2d0f15(0x2ba)]){const _0x3e823a=this[_0x2d0f15(0x177)](_0x11a1ea);_0x3e823a>=_0x4ae003[_0x2d0f15(0x202)]&&(this['subject']()[_0x2d0f15(0x228)](_0x11a1ea,this),_0x11a1ea[_0x2d0f15(0x1bd)](this[_0x2d0f15(0x222)](),this));}},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x2a9)]=Game_BattlerBase[_0x2492b8(0x20a)]['initMembers'],Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x250)]=function(){const _0x36ed52=_0x2492b8;VisuMZ[_0x36ed52(0x268)][_0x36ed52(0x2a9)][_0x36ed52(0x29c)](this),this[_0x36ed52(0x2c3)]();},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x2c3)]=function(){const _0x53f5fc=_0x2492b8;this[_0x53f5fc(0x1dd)](),this[_0x53f5fc(0x2b5)]();},Game_BattlerBase['prototype']['clearSTBNextTurnSpeed']=function(){const _0x4a602e=_0x2492b8;this[_0x4a602e(0x29e)]=0x0;},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x1ed)]=function(){const _0x1e8550=_0x2492b8;return this[_0x1e8550(0x29e)]===undefined&&this['initMembersBattleSystemSTB'](),this['_stbNextTurnSpeed'];},Game_BattlerBase[_0x2492b8(0x20a)]['setSTBNextTurnSpeed']=function(_0x44f880){const _0x5e7a7e=_0x2492b8;this['_stbNextTurnSpeed']===undefined&&this[_0x5e7a7e(0x2c3)](),this['_stbNextTurnSpeed']=_0x44f880;},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x229)]=function(_0x308f63){const _0x45c4e0=_0x2492b8;this[_0x45c4e0(0x29e)]===undefined&&this['initMembersBattleSystemSTB'](),_0x308f63+=this[_0x45c4e0(0x1ed)](),this[_0x45c4e0(0x276)](_0x308f63);},Game_BattlerBase['prototype'][_0x2492b8(0x2b5)]=function(){const _0xc8c852=_0x2492b8;this[_0xc8c852(0x156)]=![];},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x132)]=function(){const _0x66a027=_0x2492b8;return this[_0x66a027(0x156)]===undefined&&this[_0x66a027(0x2c3)](),this[_0x66a027(0x156)];},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x266)]=function(_0x33f3dc){const _0x5280c8=_0x2492b8;this[_0x5280c8(0x156)]===undefined&&this['initMembersBattleSystemSTB'](),this[_0x5280c8(0x156)]=_0x33f3dc;},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x1fb)]=function(){const _0x2fce98=_0x2492b8,_0xe7d226=VisuMZ[_0x2fce98(0x268)][_0x2fce98(0x2aa)][_0x2fce98(0x179)];return this['traitObjects']()[_0x2fce98(0x24a)](_0x5a1d87=>_0x5a1d87[_0x2fce98(0x1c1)][_0x2fce98(0x153)](_0xe7d226));},Game_BattlerBase['prototype'][_0x2492b8(0x12b)]=function(){const _0x2fccbc=_0x2492b8,_0x14a9ab=VisuMZ[_0x2fccbc(0x268)][_0x2fccbc(0x2aa)]['CannotBeExploiter'];return this['traitObjects']()[_0x2fccbc(0x24a)](_0x394dde=>_0x394dde[_0x2fccbc(0x1c1)][_0x2fccbc(0x153)](_0x14a9ab));},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x11d)]=function(){const _0x3a9f56=_0x2492b8;delete this[_0x3a9f56(0x19d)],delete this[_0x3a9f56(0x151)],delete this[_0x3a9f56(0x136)],delete this['_stbTurnOrderIconIndex'];},Game_BattlerBase['prototype'][_0x2492b8(0x18a)]=function(){const _0x4e5089=_0x2492b8;return this[_0x4e5089(0x19d)]===undefined&&(this[_0x4e5089(0x19d)]=this[_0x4e5089(0x2d6)]()),this['_stbTurnOrderGraphicType'];},Game_BattlerBase['prototype'][_0x2492b8(0x2d6)]=function(){const _0x26072d=_0x2492b8;return Window_STB_TurnOrder[_0x26072d(0x236)]['EnemyBattlerType'];},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x280)]=function(){const _0x335c7d=_0x2492b8;return this['_stbTurnOrderFaceName']===undefined&&(this[_0x335c7d(0x151)]=this[_0x335c7d(0x2ac)]()),this['_stbTurnOrderFaceName'];},Game_BattlerBase['prototype'][_0x2492b8(0x2ac)]=function(){const _0x3b444c=_0x2492b8;return Window_STB_TurnOrder[_0x3b444c(0x236)][_0x3b444c(0x270)];},Game_BattlerBase['prototype']['TurnOrderSTBGraphicFaceIndex']=function(){const _0x469bed=_0x2492b8;return this[_0x469bed(0x136)]===undefined&&(this[_0x469bed(0x136)]=this[_0x469bed(0x2d3)]()),this[_0x469bed(0x136)];},Game_BattlerBase['prototype']['createTurnOrderSTBGraphicFaceIndex']=function(){const _0x4b8efa=_0x2492b8;return Window_STB_TurnOrder['Settings'][_0x4b8efa(0x1a8)];},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x1a6)]=function(){const _0x302815=_0x2492b8;return this['_stbTurnOrderIconIndex']===undefined&&(this['_stbTurnOrderIconIndex']=this['createTurnOrderSTBGraphicIconIndex']()),this[_0x302815(0x21d)];},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x1e2)]=function(){const _0x2fabfb=_0x2492b8;return Window_STB_TurnOrder[_0x2fabfb(0x236)]['EnemyBattlerIcon'];},Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x1c8)]=function(_0x3a70ae){this['_stbTurnOrderIconIndex']=_0x3a70ae;},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x174)]=Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x278)],Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x278)]=function(){const _0x16bb43=_0x2492b8;VisuMZ[_0x16bb43(0x268)]['Game_BattlerBase_hide'][_0x16bb43(0x29c)](this),BattleManager[_0x16bb43(0x2d1)]();},VisuMZ[_0x2492b8(0x268)]['Game_BattlerBase_appear']=Game_BattlerBase['prototype']['appear'],Game_BattlerBase[_0x2492b8(0x20a)][_0x2492b8(0x259)]=function(){const _0x595dcb=_0x2492b8;VisuMZ[_0x595dcb(0x268)][_0x595dcb(0x120)]['call'](this),BattleManager[_0x595dcb(0x2d1)]();},VisuMZ[_0x2492b8(0x268)]['Game_Battler_performCollapse']=Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x2d2)],Game_Battler[_0x2492b8(0x20a)]['performCollapse']=function(){const _0x21d776=_0x2492b8;VisuMZ[_0x21d776(0x268)][_0x21d776(0x1a7)][_0x21d776(0x29c)](this),BattleManager[_0x21d776(0x2d1)]();},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x1f0)]=Game_Battler['prototype'][_0x2492b8(0x1d9)],Game_Battler['prototype'][_0x2492b8(0x1d9)]=function(_0x74a584){const _0x38f63c=_0x2492b8;VisuMZ['BattleSystemSTB']['Game_Battler_onBattleStart'][_0x38f63c(0x29c)](this,_0x74a584),this[_0x38f63c(0x20b)](_0x74a584);},Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x20b)]=function(_0x43878d){const _0x2c2599=_0x2492b8;if(!BattleManager[_0x2c2599(0x1da)]())return;this['clearSTBExploit']();const _0xca2efa=new Game_Action(this);this[_0x2c2599(0x276)](0x0);},VisuMZ['BattleSystemSTB'][_0x2492b8(0x211)]=Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x186)],Game_Battler[_0x2492b8(0x20a)]['onTurnEnd']=function(){const _0x3e51e4=_0x2492b8;VisuMZ[_0x3e51e4(0x268)][_0x3e51e4(0x211)]['call'](this),BattleManager[_0x3e51e4(0x1da)]()&&VisuMZ[_0x3e51e4(0x268)][_0x3e51e4(0x236)]['Exploit'][_0x3e51e4(0x21a)]&&this[_0x3e51e4(0x2b5)]();},VisuMZ[_0x2492b8(0x268)]['Game_Battler_performActionEnd']=Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x226)],Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x226)]=function(){const _0x32fbbc=_0x2492b8;VisuMZ[_0x32fbbc(0x268)]['Game_Battler_performActionEnd'][_0x32fbbc(0x29c)](this),BattleManager[_0x32fbbc(0x1da)]()&&this['performActionEndSTB']();},Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x164)]=function(){const _0x428a93=_0x2492b8;if(this['numActions']()>0x0&&this===BattleManager['_subject']){const _0xd84c61=BattleManager['_forcedBattlers'];if(_0xd84c61[_0x428a93(0x2a1)]>0x0&&_0xd84c61[0x0]!==this)return;const _0xf7acf=this[_0x428a93(0x12c)]();if(_0xf7acf)_0xf7acf[_0x428a93(0x16a)]();}},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x137)]=Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x210)],Game_Battler['prototype'][_0x2492b8(0x210)]=function(){const _0x5a8426=_0x2492b8;if(BattleManager['isSTB']())this[_0x5a8426(0x162)]=!![];VisuMZ[_0x5a8426(0x268)][_0x5a8426(0x137)]['call'](this);if(BattleManager['isSTB']())this[_0x5a8426(0x162)]=undefined;},VisuMZ[_0x2492b8(0x268)]['Game_Battler_clearActions']=Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x24d)],Game_Battler['prototype'][_0x2492b8(0x24d)]=function(){const _0x2b630d=_0x2492b8;if(BattleManager[_0x2b630d(0x1da)]()&&this[_0x2b630d(0x162)])return;VisuMZ[_0x2b630d(0x268)][_0x2b630d(0x20e)][_0x2b630d(0x29c)](this);},Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x144)]=function(){const _0x3d0cfd=_0x2492b8;return VisuMZ[_0x3d0cfd(0x2b2)][_0x3d0cfd(0x236)][_0x3d0cfd(0x1ad)][_0x3d0cfd(0x11e)];},VisuMZ['BattleSystemSTB'][_0x2492b8(0x114)]=Game_Battler['prototype'][_0x2492b8(0x25e)],Game_Battler[_0x2492b8(0x20a)]['makeSpeed']=function(){const _0x299dda=_0x2492b8;BattleManager['isSTB']()?this['makeSTBSpeed']():VisuMZ[_0x299dda(0x268)][_0x299dda(0x114)][_0x299dda(0x29c)](this);},Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x115)]=function(){const _0xcfb551=_0x2492b8;this[_0xcfb551(0x218)]=VisuMZ[_0xcfb551(0x268)][_0xcfb551(0x236)][_0xcfb551(0x2c5)][_0xcfb551(0x2ab)][_0xcfb551(0x29c)](this);},Game_Battler['prototype']['stbExploitedStates']=function(){const _0x1f78ae=_0x2492b8,_0x4d8148=this[_0x1f78ae(0x1cb)]()?this[_0x1f78ae(0x1f9)]()[_0x1f78ae(0x1c1)]:this[_0x1f78ae(0x26f)]()[_0x1f78ae(0x1c1)];if(_0x4d8148[_0x1f78ae(0x153)](VisuMZ[_0x1f78ae(0x268)][_0x1f78ae(0x2aa)][_0x1f78ae(0x183)]))return VisuMZ['BattleSystemSTB']['ParseStateData'](RegExp['$1']);return VisuMZ[_0x1f78ae(0x268)][_0x1f78ae(0x236)][_0x1f78ae(0x1d7)][_0x1f78ae(0x160)]||[];},Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x16e)]=function(){const _0xe5957a=_0x2492b8,_0x1cd75e=this[_0xe5957a(0x1cb)]()?this['currentClass']()[_0xe5957a(0x1c1)]:this[_0xe5957a(0x26f)]()[_0xe5957a(0x1c1)];if(_0x1cd75e[_0xe5957a(0x153)](VisuMZ[_0xe5957a(0x268)]['RegExp'][_0xe5957a(0x212)]))return VisuMZ['BattleSystemSTB'][_0xe5957a(0x20f)](RegExp['$1']);return VisuMZ[_0xe5957a(0x268)][_0xe5957a(0x236)][_0xe5957a(0x25d)][_0xe5957a(0x160)]||[];},VisuMZ['BattleSystemSTB'][_0x2492b8(0x20f)]=function(_0x447e67){const _0x3b6f1b=_0x2492b8,_0x4c7296=_0x447e67[_0x3b6f1b(0x258)](','),_0xf39772=[];for(let _0xee41c9 of _0x4c7296){_0xee41c9=(String(_0xee41c9)||'')[_0x3b6f1b(0x165)]();const _0x1ddb0b=/^\d+$/[_0x3b6f1b(0x1c4)](_0xee41c9);_0x1ddb0b?_0xf39772['push'](Number(_0xee41c9)):_0xf39772[_0x3b6f1b(0x1b4)](DataManager['getStateIdWithName'](_0xee41c9));}return _0xf39772;},Game_Battler[_0x2492b8(0x20a)][_0x2492b8(0x1bd)]=function(_0xb0ba30,_0x413c92){const _0x5aaf03=_0x2492b8;if(!BattleManager['isSTB']())return;if(!BattleManager[_0x5aaf03(0x21b)]())return;if(this[_0x5aaf03(0x132)]())return;if(this[_0x5aaf03(0x1fb)]())return;if(_0xb0ba30[_0x5aaf03(0x12b)]())return;const _0x460444=VisuMZ[_0x5aaf03(0x268)][_0x5aaf03(0x236)]['Exploited'];!_0x460444['UnlimitedExploits']&&this['setSTBExploited'](!![]);if(this['hp']<=0x0)return;this['displayExploitedEffects'](_0x460444);if(this['hp']>0x0||!this[_0x5aaf03(0x1f7)]())for(const _0x390b67 of this[_0x5aaf03(0x23e)]()){if(!$dataStates[_0x390b67])continue;this['addState'](_0x390b67);}_0x460444[_0x5aaf03(0x295)]&&_0x460444['CustomJS'][_0x5aaf03(0x29c)](this,_0xb0ba30,_0x413c92);if(this['isActor']()&&BattleManager[_0x5aaf03(0x171)]()){const _0x13813f=_0x460444[_0x5aaf03(0x290)];_0x13813f>0x0&&$dataCommonEvents[_0x13813f]&&$gameTemp[_0x5aaf03(0x1fc)](_0x13813f);}else{if(this[_0x5aaf03(0x15d)]()&&BattleManager['areAllEnemiesExploited']()){const _0xf4a28=_0x460444['vsEnemiesFullExploit'];_0xf4a28>0x0&&$dataCommonEvents[_0xf4a28]&&$gameTemp[_0x5aaf03(0x1fc)](_0xf4a28);}}},Game_Battler['prototype'][_0x2492b8(0x228)]=function(_0x1d89ed,_0x102a29){const _0x888f9d=_0x2492b8;if(!BattleManager[_0x888f9d(0x1da)]())return;if(!BattleManager['isSTBExploitSystemEnabled']())return;if(_0x102a29[_0x888f9d(0x2a6)]())return;if(_0x1d89ed[_0x888f9d(0x132)]())return;if(_0x1d89ed[_0x888f9d(0x1fb)]())return;if(this[_0x888f9d(0x12b)]())return;const _0x34eb11=VisuMZ[_0x888f9d(0x268)]['Settings']['Exploiter'];!_0x34eb11[_0x888f9d(0x21e)]&&_0x102a29[_0x888f9d(0x28a)](!![]);this[_0x888f9d(0x299)](_0x34eb11);_0x34eb11[_0x888f9d(0x23d)]>0x0&&this[_0x888f9d(0x27b)](_0x34eb11[_0x888f9d(0x23d)]);for(const _0x5dd88c of this[_0x888f9d(0x16e)]()){if(!$dataStates[_0x5dd88c])continue;this[_0x888f9d(0x1ea)](_0x5dd88c);}_0x34eb11[_0x888f9d(0x295)]&&_0x34eb11['CustomJS'][_0x888f9d(0x29c)](this,_0x1d89ed,_0x102a29);},Game_Battler['prototype'][_0x2492b8(0x299)]=function(_0x4fd8f9){const _0x2e2c53=_0x2492b8;if(!_0x4fd8f9)return;if(_0x4fd8f9[_0x2e2c53(0x263)]){const _0x4cdeb6=_0x4fd8f9[_0x2e2c53(0x263)],_0x2ad742=_0x4fd8f9['Mirror'],_0x24b1e0=_0x4fd8f9['Mute'];$gameTemp['requestFauxAnimation']([this],_0x4cdeb6,_0x2ad742,_0x24b1e0);}if(this[_0x2e2c53(0x12c)]()&&_0x4fd8f9[_0x2e2c53(0x2b6)][_0x2e2c53(0x2a1)]>0x0){const _0x557455=_0x4fd8f9['PopupText'],_0x418473={'textColor':ColorManager[_0x2e2c53(0x22a)](_0x4fd8f9[_0x2e2c53(0x257)]),'flashColor':_0x4fd8f9['FlashColor'],'flashDuration':_0x4fd8f9[_0x2e2c53(0x2cc)]};this[_0x2e2c53(0x253)](_0x557455,_0x418473);}},Game_Battler[_0x2492b8(0x20a)]['stbGainInstant']=function(_0x32cc38){const _0x342082=_0x2492b8;if(!this[_0x342082(0x118)]())return;this['_actions']=this[_0x342082(0x17f)]||[];const _0x42531b=this[_0x342082(0x17f)][_0x342082(0x2a1)]<=0x0;for(let _0x32cc30=0x0;_0x32cc30<_0x32cc38;_0x32cc30++){this[_0x342082(0x17f)]['push'](new Game_Action(this));}this[_0x342082(0x1cb)]()&&this[_0x342082(0x13a)]()&&this[_0x342082(0x1aa)]();if(!this[_0x342082(0x15d)]())return;const _0x5cdf5a=this[_0x342082(0x26f)]()['actions']['filter'](_0xd6922a=>this[_0x342082(0x17c)](_0xd6922a));if(_0x5cdf5a[_0x342082(0x2a1)]>0x0){let _0x29cc22;!_0x42531b&&(_0x29cc22=this[_0x342082(0x17f)][_0x342082(0x19c)]()),this[_0x342082(0x2c1)](_0x5cdf5a),!_0x42531b&&this[_0x342082(0x17f)]['unshift'](_0x29cc22);}},VisuMZ['BattleSystemSTB'][_0x2492b8(0x17e)]=Game_Actor['prototype'][_0x2492b8(0x293)],Game_Actor[_0x2492b8(0x20a)]['selectNextCommand']=function(){const _0x4a84a5=_0x2492b8;if(BattleManager[_0x4a84a5(0x1da)]()){if(this['battler']())this[_0x4a84a5(0x12c)]()[_0x4a84a5(0x16a)]();return![];}return VisuMZ[_0x4a84a5(0x268)]['Game_Actor_selectNextCommand'][_0x4a84a5(0x29c)](this);},Game_Actor['prototype'][_0x2492b8(0x2d6)]=function(){const _0x40c364=_0x2492b8,_0x30213c=this[_0x40c364(0x2bf)]()['note'];if(_0x30213c[_0x40c364(0x153)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x40c364(0x21f);else{if(_0x30213c[_0x40c364(0x153)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x40c364(0x1a2);}return Window_STB_TurnOrder[_0x40c364(0x236)][_0x40c364(0x138)];},Game_Actor[_0x2492b8(0x20a)][_0x2492b8(0x2ac)]=function(){const _0x5ec1e7=_0x2492b8,_0x4fd32f=this[_0x5ec1e7(0x2bf)]()[_0x5ec1e7(0x1c1)];if(_0x4fd32f[_0x5ec1e7(0x153)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x2492b8(0x20a)][_0x2492b8(0x2d3)]=function(){const _0x563c9c=_0x2492b8,_0x2223db=this[_0x563c9c(0x2bf)]()[_0x563c9c(0x1c1)];if(_0x2223db[_0x563c9c(0x153)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x563c9c(0x277)]();},Game_Actor[_0x2492b8(0x20a)][_0x2492b8(0x1e2)]=function(){const _0x2d9347=_0x2492b8,_0x1e2ca4=this[_0x2d9347(0x2bf)]()['note'];if(_0x1e2ca4[_0x2d9347(0x153)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder['Settings'][_0x2d9347(0x1b8)];},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x133)]=Game_Actor[_0x2492b8(0x20a)][_0x2492b8(0x13a)],Game_Actor['prototype'][_0x2492b8(0x13a)]=function(){const _0x294cab=_0x2492b8;if(BattleManager[_0x294cab(0x1da)]()){if(this[_0x294cab(0x1e0)]()&&this['currentAction']()[_0x294cab(0x168)]())return!![];}return VisuMZ[_0x294cab(0x268)][_0x294cab(0x133)][_0x294cab(0x29c)](this);},Game_Action[_0x2492b8(0x20a)][_0x2492b8(0x282)]=function(){const _0x54b13b=_0x2492b8;this[_0x54b13b(0x166)]=!![];},Game_Action['prototype']['isAutoBattleStb']=function(){const _0xe1ff00=_0x2492b8;return this[_0xe1ff00(0x166)];},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x1e1)]=Game_Actor[_0x2492b8(0x20a)][_0x2492b8(0x1aa)],Game_Actor[_0x2492b8(0x20a)]['makeAutoBattleActions']=function(){const _0x55dba1=_0x2492b8;VisuMZ[_0x55dba1(0x268)][_0x55dba1(0x1e1)]['call'](this);if(BattleManager[_0x55dba1(0x1da)]())for(const _0x3d60de of this[_0x55dba1(0x17f)]){if(!_0x3d60de)continue;_0x3d60de[_0x55dba1(0x282)]();}},Game_Enemy[_0x2492b8(0x20a)]['createTurnOrderSTBGraphicType']=function(){const _0x527641=_0x2492b8,_0x517b9a=this[_0x527641(0x26f)]()['note'];if(_0x517b9a[_0x527641(0x153)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x517b9a[_0x527641(0x153)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x527641(0x1a2);}return Window_STB_TurnOrder[_0x527641(0x236)]['EnemyBattlerType'];},Game_Enemy[_0x2492b8(0x20a)][_0x2492b8(0x2ac)]=function(){const _0x3e8c74=_0x2492b8,_0x86f2fe=this[_0x3e8c74(0x26f)]()['note'];if(_0x86f2fe[_0x3e8c74(0x153)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_STB_TurnOrder[_0x3e8c74(0x236)]['EnemyBattlerFaceName'];},Game_Enemy['prototype'][_0x2492b8(0x2d3)]=function(){const _0x9bb15a=_0x2492b8,_0x45153a=this[_0x9bb15a(0x26f)]()[_0x9bb15a(0x1c1)];if(_0x45153a['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_STB_TurnOrder[_0x9bb15a(0x236)][_0x9bb15a(0x1a8)];},Game_Enemy[_0x2492b8(0x20a)]['createTurnOrderSTBGraphicIconIndex']=function(){const _0x536a60=_0x2492b8,_0x50b770=this[_0x536a60(0x26f)]()[_0x536a60(0x1c1)];if(_0x50b770[_0x536a60(0x153)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_STB_TurnOrder[_0x536a60(0x236)][_0x536a60(0x154)];},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x206)]=Game_Party[_0x2492b8(0x20a)][_0x2492b8(0x260)],Game_Party[_0x2492b8(0x20a)]['removeActor']=function(_0x44105e){const _0x43884f=_0x2492b8;VisuMZ[_0x43884f(0x268)][_0x43884f(0x206)][_0x43884f(0x29c)](this,_0x44105e),SceneManager[_0x43884f(0x298)]()&&BattleManager[_0x43884f(0x1da)]()&&BattleManager[_0x43884f(0x2cf)][_0x43884f(0x23c)]($gameActors[_0x43884f(0x2bf)](_0x44105e));},VisuMZ['BattleSystemSTB'][_0x2492b8(0x28c)]=Scene_Battle[_0x2492b8(0x20a)]['createActorCommandWindow'],Scene_Battle[_0x2492b8(0x20a)][_0x2492b8(0x13c)]=function(){const _0xae9c65=_0x2492b8;VisuMZ['BattleSystemSTB'][_0xae9c65(0x28c)][_0xae9c65(0x29c)](this),BattleManager[_0xae9c65(0x1da)]()&&this[_0xae9c65(0x2ae)]();},Scene_Battle[_0x2492b8(0x20a)][_0x2492b8(0x2ae)]=function(){const _0x5739f9=_0x2492b8,_0x4e8dd5=this[_0x5739f9(0x198)];this[_0x5739f9(0x152)]()&&delete _0x4e8dd5['_handlers'][_0x5739f9(0x27c)];},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x204)]=Scene_Battle[_0x2492b8(0x20a)]['commandCancel'],Scene_Battle[_0x2492b8(0x20a)]['commandCancel']=function(){const _0x101f12=_0x2492b8;BattleManager[_0x101f12(0x1da)]()?this['commandCancelSTB']():VisuMZ['BattleSystemSTB'][_0x101f12(0x204)]['call'](this);},Scene_Battle[_0x2492b8(0x20a)][_0x2492b8(0x1a9)]=function(){const _0x99a8c7=_0x2492b8;this[_0x99a8c7(0x1c6)][_0x99a8c7(0x159)](),this['_actorCommandWindow'][_0x99a8c7(0x1e8)]();},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x262)]=Scene_Battle['prototype'][_0x2492b8(0x19f)],Scene_Battle[_0x2492b8(0x20a)]['commandFight']=function(){const _0x496845=_0x2492b8;BattleManager[_0x496845(0x1da)]()?this[_0x496845(0x29b)]():VisuMZ[_0x496845(0x268)][_0x496845(0x262)][_0x496845(0x29c)](this);},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x1d8)]=Scene_Battle[_0x2492b8(0x20a)][_0x2492b8(0x1eb)],Scene_Battle[_0x2492b8(0x20a)]['createAllWindows']=function(){const _0x5e6482=_0x2492b8;VisuMZ['BattleSystemSTB']['Scene_Battle_createAllWindows'][_0x5e6482(0x29c)](this),this['createSTBTurnOrderWindow']();},Scene_Battle[_0x2492b8(0x20a)][_0x2492b8(0x2b1)]=function(){const _0x220069=_0x2492b8;if(!BattleManager[_0x220069(0x1da)]())return;this['_stbTurnOrderWindow']=new Window_STB_TurnOrder();const _0x1e345c=this[_0x220069(0x2a5)](this['_windowLayer']);this[_0x220069(0x18f)](this['_stbTurnOrderWindow'],_0x1e345c),this[_0x220069(0x155)](),BattleManager['updateTurnOrderSTB'](!![]);},Scene_Battle[_0x2492b8(0x20a)][_0x2492b8(0x155)]=function(){const _0x252fc7=_0x2492b8,_0x458d62=Window_STB_TurnOrder[_0x252fc7(0x236)];if(_0x458d62[_0x252fc7(0x170)]!==_0x252fc7(0x256))return;if(!_0x458d62[_0x252fc7(0x1bf)])return;if(!this['_logWindow'])return;const _0x57f13b=this['_stbTurnOrderWindow']['y']-Math[_0x252fc7(0x1a4)]((Graphics[_0x252fc7(0x1f4)]-Graphics['boxHeight'])/0x2),_0x2a61b6=_0x57f13b+this[_0x252fc7(0x146)][_0x252fc7(0x1f4)];this[_0x252fc7(0x29a)]['y']=_0x2a61b6+_0x458d62[_0x252fc7(0x1b7)];};function _0x28b9(){const _0xf971b=['EnemyBattlerIcon','repositionLogWindowSTB','_stbExploited','setBlendColor','aliveMembers','setup','updateHomePosition','format','windowRect','isEnemy','updateBattleContainerOrder','BattleManager_battleSys','AddedStates','updateOpacity','_bypassClearActions','loadSvEnemy','performActionEndSTB','trim','_stbAutoBattle','_targetHomeY','isAutoBattleStb','containerWindow','stepForward','22113910WGpITb','_letterSprite','createBattlerRect','stbExploiterStates','processUpdateGraphic','DisplayPosition','areAllActorsExploited','_letter','updateSidePosition','Game_BattlerBase_hide','checkTargetPositions','result','calcElementRate','createInitialPositions','CannotBeExploited','applyGlobalBattleSystemSTB','MaxHorzSprites','isActionValid','updatePadding','Game_Actor_selectNextCommand','_actions','StbTurnOrderEnemyIcon','displayEscapeFailureMessage','Game_Action_applyGlobal','ExploitedStates','floor','6521616blCmoY','onTurnEnd','faceHeight','checkPosition','loadFace','TurnOrderSTBGraphicType','getBattleSystem','executeDamage','EscapeFail','updatePosition','addChildAt','speed','_stateIDs','_fullHeight','updateSelectionEffect','endActionSTB','bitmap','_graphicIconIndex','isTurnBased','_actorCommandWindow','BattleManager_onEscapeFailure','changeIconGraphicBitmap','bitmapHeight','shift','_stbTurnOrderGraphicType','4NzOYHb','commandFight','left','_ogWindowLayerX','icon','addChild','round','width','TurnOrderSTBGraphicIconIndex','Game_Battler_performCollapse','EnemyBattlerFaceIndex','commandCancelSTB','makeAutoBattleActions','battlerName','startInputSTB','Mechanics','changeEnemyGraphicBitmap','%1BgColor2','members','isSideView','ForcedActions','_graphicHue','push','BattleManager_processTurn','opacity','ScreenBuffer','ActorBattlerIcon','hasSvBattler','children','Visible','_isAlive','becomeSTBExploited','3gHtShP','RepositionLogWindow','194012GCbUBr','note','_stbExploitAdvantageFlag','StbTurnOrderActorIcon','test','IconIndex','_partyCommandWindow','_isBattleOver','setSTBGraphicIconIndex','updateTurnOrderSTB','mainSprite','isActor','registerCommand','_positionTargetY','_helpWindow','_unit','exit','blt','svactor','SystemTurnOrderVisibility','EnemyBattlerFontFace','_graphicSv','faceWidth','Exploited','Scene_Battle_createAllWindows','onBattleStart','isSTB','bitmapWidth','StbTurnOrderEnemyFace','clearSTBNextTurnSpeed','createBorderSprite','initialize','currentAction','Game_Actor_makeAutoBattleActions','createTurnOrderSTBGraphicIconIndex','onEscapeFailure','MaxVertSprites','selectNextActor','_plural','BattleManager_isTurnBased','close','maxBattleMembers','addState','createAllWindows','%1BgColor1','getSTBNextTurnSpeed','anchor','isAlive','Game_Battler_onBattleStart','filter','JSON','TurnOrderSTBGraphicFaceIndex','height','processBattleCoreJS','CenterHorz','isImmortal','VisuMZ_0_CoreEngine','currentClass','containerPosition','stbCannotBeExploited','reserveCommonEvent','startInput','constructor','updateVisibility','VisuMZ_1_BattleCore','EnemyBattlerDrawLetter','ExploitEleRate','padding','Scene_Battle_commandCancel','fillRect','Game_Party_removeActor','description','OrderDirection','Instant','prototype','onBattleStartSTB','clearSTB','%1BorderColor','Game_Battler_clearActions','ParseStateData','onRestrict','Game_Battler_onTurnEnd','ExploiterStates','unshift','createLetterSprite','EnemyBattlerFontSize','createGraphicSprite','StbTurnOrderActorFace','_speed','getStateIdWithName','TurnResetExploits','isSTBExploitSystemEnabled','areAllEnemiesExploited','_stbTurnOrderIconIndex','MultipleExploits','face','iconHeight','drawText','subject','FaceIndex','Actors','processTurnSTB','performActionEnd','_positionDuration','performSTBExploiter','addSTBNextTurnSpeed','getColor','isActiveTpb','SpriteLength','loadSystem','defaultPosition','SubjectDistance','ARRAYSTR','setItem','SpriteThin','selectNextActorSTB','recalculateHome','createBattlerSprites','Settings','BattleManager_endAction','STRUCT','svActorVertCells','9770874EBHAav','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','remove','ExtraActions','stbExploitedStates','boxHeight','clear','item','bind','_graphicEnemy','ARRAYEVAL','_fadeDuration','9zhfIrj','Actor','_graphicFaceIndex','%1SystemBg','some','bottom','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','clearActions','name','createBackgroundSprite','initMembers','_index','Game_Action_clear','setupTextPopup','initHomePositions','Window_Help_setItem','top','TextColor','split','appear','executeDamageSTB','_turnOrderInnerSprite','allBattleMembers','Exploiter','makeSpeed','STB','removeActor','setBattleSystemSTBTurnOrderVisible','Scene_Battle_commandFight','AnimationID','updateGraphicHue','iconWidth','setSTBExploited','createTestBitmap','BattleSystemSTB','calculateTargetPositions','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','#000000','changeSvActorGraphicBitmap','startFade','_stbTurnOrderVisible','enemy','EnemyBattlerFaceName','_windowLayer','canInput','startTurn','map','_targetHomeX','setSTBNextTurnSpeed','faceIndex','hide','fontSize','initBattleSystemSTB','stbGainInstant','cancel','EnableExploit','_surprise','_containerHeight','TurnOrderSTBGraphicFaceName','DisplayOffsetY','setAutoBattleStb','Enemy','processTurn','RepositionTopForHelp','mainFontFace','EVAL','version','_graphicType','setSTBExploitedFlag','DisplayOffsetX','Scene_Battle_createActorCommandWindow','svBattlerName','visible','makeActionOrders','vsActorsFullExploit','isTpb','_escapeRatio','selectNextCommand','_currentActor','CustomJS','EscapeFailureJS','getStateTooltipBattler','isSceneBattle','displayExploitedEffects','_logWindow','startActorCommandSelection','call','ConvertParams','_stbNextTurnSpeed','loadEnemy','processPostBattleCommonEvents','length','applyGlobal','battleSys','BattleManager_isActiveTpb','getChildIndex','hasSTBExploited','updateGraphic','isAppeared','Game_BattlerBase_initMembers','RegExp','InitialSpeedJS','createTurnOrderSTBGraphicFaceName','parse','createActorCommandWindowSTB','_positionTargetX','_phase','createSTBTurnOrderWindow','BattleCore','_fullWidth','onEscapeFailureSTB','clearSTBExploit','PopupText','toUpperCase','_subject','StbTurnOrderClearActorGraphic','ExploitEleWeakness','addInnerChild','clearNextTurnSpeedSTB','indexOf','checkOpacity','actor','includes','selectAllActions','updateTurnOrder','initMembersBattleSystemSTB','return\x200','Speed','_backgroundSprite','NextTurnSavedSpeedJS','_inputting','_forceAction','_graphicSprite','friendsUnit','FlashDuration','_fadeTarget','_forcedBattlers','_actionBattlers','create','removeActionBattlersSTB','performCollapse','createTurnOrderSTBGraphicFaceIndex','BattleManager_startInput','Game_Action_executeDamage','createTurnOrderSTBGraphicType','ceil','setText','Game_Battler_makeSpeed','makeSTBSpeed','RepositionTopHelpX','_homeX','canMove','7062285XkTcvO','_graphicFaceName','isBattleSystemSTBTurnOrderVisible','max','clearTurnOrderSTBGraphics','AllowRandomSpeed','Game_System_initialize','Game_BattlerBase_appear','1379539nAviEm','loadSvActor','ARRAYNUM','Game_Action_speed','_homeDuration','FaceName','_forcing','right','2046888hAyYSo','BattleManager_isTpb','stbCannotBeExploiter','battler','_containerWidth','BattleManager_selectNextActor','createChildren','%1\x20%2\x20%3','STR','isSTBExploited','Game_Actor_isAutoBattle','BattleManager_finishActorInput','parameters','_stbTurnOrderFaceIndex','Game_Battler_onRestrict','ActorBattlerType','_isAppeared','isAutoBattle','ShowMarkerBorder','createActorCommandWindow','changeFaceGraphicBitmap','endAction','updateLetter','update','BattleManager_makeActionOrders','_turnOrderContainer','_homeY','allowRandomSpeed','center','_stbTurnOrderWindow','svActorHorzCells','BorderThickness','Enemies','min','addLoadListener','UpdateFrames','_scene','isHorz','ARRAYFUNC','battlerHue','_stbTurnOrderFaceName','isPartyCommandWindowDisabled','match'];_0x28b9=function(){return _0xf971b;};return _0x28b9();}function Sprite_STB_TurnOrder_Battler(){const _0x471dd0=_0x2492b8;this[_0x471dd0(0x1df)](...arguments);}Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]=Object[_0x2492b8(0x2d0)](Sprite_Clickable[_0x2492b8(0x20a)]),Sprite_STB_TurnOrder_Battler['prototype']['constructor']=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x1df)]=function(_0x3675a7,_0x2b392d){const _0x3136f1=_0x2492b8;this[_0x3136f1(0x250)](_0x3675a7,_0x2b392d),Sprite_Clickable[_0x3136f1(0x20a)][_0x3136f1(0x1df)]['call'](this),this[_0x3136f1(0x1b6)]=0x0,this[_0x3136f1(0x12f)](),this['checkOpacity']();},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x250)]=function(_0x37fafe,_0x2df5b1){const _0x5888a8=_0x2492b8;this[_0x5888a8(0x1cf)]=_0x37fafe,this[_0x5888a8(0x251)]=_0x2df5b1;const _0xa1327e=Window_STB_TurnOrder[_0x5888a8(0x236)],_0x59fc13=this[_0x5888a8(0x14e)](),_0x12e17e=this[_0x5888a8(0x22e)]();this[_0x5888a8(0x227)]=0x0,this[_0x5888a8(0x2af)]=_0x59fc13?_0xa1327e[_0x5888a8(0x232)]*_0x12e17e:0x0,this[_0x5888a8(0x1cd)]=_0x59fc13?0x0:_0xa1327e[_0x5888a8(0x232)]*_0x12e17e,this['_fadeDuration']=0x0,this[_0x5888a8(0x2cd)]=0xff,this[_0x5888a8(0x1bc)]=![],this[_0x5888a8(0x139)]=![],this[_0x5888a8(0x12d)]=0x0,this[_0x5888a8(0x27f)]=0x0;},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x12f)]=function(){const _0x26dbeb=_0x2492b8;this[_0x26dbeb(0x178)](),this[_0x26dbeb(0x24f)](),this[_0x26dbeb(0x216)](),this['createBorderSprite'](),this[_0x26dbeb(0x214)]();},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['createInitialPositions']=function(){const _0x3d540c=_0x2492b8;this['x']=this[_0x3d540c(0x2af)],this['y']=this[_0x3d540c(0x1cd)];},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['isHorz']=function(){const _0x331396=_0x2492b8,_0x58a2b4=Window_STB_TurnOrder[_0x331396(0x236)],_0x2ed4e9=[_0x331396(0x256),'bottom']['includes'](_0x58a2b4['DisplayPosition']);return _0x2ed4e9;},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['bitmapWidth']=function(){const _0x166bc5=_0x2492b8,_0xf2b86f=Window_STB_TurnOrder[_0x166bc5(0x236)];return this[_0x166bc5(0x14e)]()?_0xf2b86f['SpriteThin']:_0xf2b86f[_0x166bc5(0x22c)];},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x19b)]=function(){const _0x78202=_0x2492b8,_0x233fb7=Window_STB_TurnOrder[_0x78202(0x236)];return this[_0x78202(0x14e)]()?_0x233fb7[_0x78202(0x22c)]:_0x233fb7[_0x78202(0x232)];},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x267)]=function(){const _0x3aecce=_0x2492b8;this[_0x3aecce(0x195)]=new Bitmap(0x48,0x24);const _0x4e852f=this[_0x3aecce(0x12c)]()?this[_0x3aecce(0x12c)]()[_0x3aecce(0x24e)]():_0x3aecce(0x130)[_0x3aecce(0x15b)](this[_0x3aecce(0x1cf)],this[_0x3aecce(0x251)]);this['bitmap'][_0x3aecce(0x221)](_0x4e852f,0x0,0x0,0x48,0x24,_0x3aecce(0x145));},Sprite_STB_TurnOrder_Battler['prototype'][_0x2492b8(0x24f)]=function(){const _0x5db597=_0x2492b8;if(!Window_STB_TurnOrder['Settings']['ShowMarkerBg'])return;const _0x2e9588=Window_STB_TurnOrder['Settings'],_0x3554e6=this[_0x5db597(0x1cf)]===$gameParty?_0x5db597(0x247):'Enemy',_0x1dba33=_0x5db597(0x249)[_0x5db597(0x15b)](_0x3554e6),_0x1b1882=new Sprite();_0x1b1882[_0x5db597(0x1ee)]['x']=this[_0x5db597(0x1ee)]['x'],_0x1b1882[_0x5db597(0x1ee)]['y']=this[_0x5db597(0x1ee)]['y'];if(_0x2e9588[_0x1dba33])_0x1b1882['bitmap']=ImageManager['loadSystem'](_0x2e9588[_0x1dba33]);else{const _0x49db22=this['bitmapWidth'](),_0x402844=this['bitmapHeight']();_0x1b1882[_0x5db597(0x195)]=new Bitmap(_0x49db22,_0x402844);const _0x5eb44d=ColorManager[_0x5db597(0x22a)](_0x2e9588[_0x5db597(0x1ec)[_0x5db597(0x15b)](_0x3554e6)]),_0x46db2d=ColorManager[_0x5db597(0x22a)](_0x2e9588[_0x5db597(0x1af)[_0x5db597(0x15b)](_0x3554e6)]);_0x1b1882[_0x5db597(0x195)]['gradientFillRect'](0x0,0x0,_0x49db22,_0x402844,_0x5eb44d,_0x46db2d,!![]);}this[_0x5db597(0x2c6)]=_0x1b1882,this[_0x5db597(0x1a3)](this[_0x5db597(0x2c6)]),this[_0x5db597(0x1a5)]=this['_backgroundSprite'][_0x5db597(0x1a5)],this[_0x5db597(0x1f4)]=this['_backgroundSprite'][_0x5db597(0x1f4)];},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x216)]=function(){const _0x34a52c=_0x2492b8,_0x1f3b7b=new Sprite();_0x1f3b7b[_0x34a52c(0x1ee)]['x']=this[_0x34a52c(0x1ee)]['x'],_0x1f3b7b[_0x34a52c(0x1ee)]['y']=this['anchor']['y'],this[_0x34a52c(0x2ca)]=_0x1f3b7b,this[_0x34a52c(0x1a3)](this[_0x34a52c(0x2ca)]),this[_0x34a52c(0x16f)]();},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x1de)]=function(){const _0x50de6d=_0x2492b8;if(!Window_STB_TurnOrder[_0x50de6d(0x236)][_0x50de6d(0x13b)])return;const _0xfd2dba=Window_STB_TurnOrder['Settings'],_0x9dc42b=this[_0x50de6d(0x1cf)]===$gameParty?_0x50de6d(0x247):_0x50de6d(0x283),_0x37e75b='%1SystemBorder'[_0x50de6d(0x15b)](_0x9dc42b),_0x47a001=new Sprite();_0x47a001[_0x50de6d(0x1ee)]['x']=this[_0x50de6d(0x1ee)]['x'],_0x47a001['anchor']['y']=this[_0x50de6d(0x1ee)]['y'];if(_0xfd2dba[_0x37e75b])_0x47a001[_0x50de6d(0x195)]=ImageManager[_0x50de6d(0x22d)](_0xfd2dba[_0x37e75b]);else{let _0x437097=this[_0x50de6d(0x1db)](),_0x124e92=this[_0x50de6d(0x19b)](),_0x6138f0=_0xfd2dba[_0x50de6d(0x148)];_0x47a001[_0x50de6d(0x195)]=new Bitmap(_0x437097,_0x124e92);const _0x32e561=_0x50de6d(0x26b),_0x1b54c6=ColorManager[_0x50de6d(0x22a)](_0xfd2dba[_0x50de6d(0x20d)[_0x50de6d(0x15b)](_0x9dc42b)]);_0x47a001[_0x50de6d(0x195)][_0x50de6d(0x205)](0x0,0x0,_0x437097,_0x124e92,_0x32e561),_0x437097-=0x2,_0x124e92-=0x2,_0x47a001[_0x50de6d(0x195)][_0x50de6d(0x205)](0x1,0x1,_0x437097,_0x124e92,_0x1b54c6),_0x437097-=_0x6138f0*0x2,_0x124e92-=_0x6138f0*0x2,_0x47a001[_0x50de6d(0x195)][_0x50de6d(0x205)](0x1+_0x6138f0,0x1+_0x6138f0,_0x437097,_0x124e92,_0x32e561),_0x437097-=0x2,_0x124e92-=0x2,_0x6138f0+=0x1,_0x47a001[_0x50de6d(0x195)]['clearRect'](0x1+_0x6138f0,0x1+_0x6138f0,_0x437097,_0x124e92);}this[_0x50de6d(0x2c6)]=_0x47a001,this[_0x50de6d(0x1a3)](this[_0x50de6d(0x2c6)]);},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x214)]=function(){const _0x596167=_0x2492b8,_0x3b564a=Window_STB_TurnOrder[_0x596167(0x236)];if(!_0x3b564a[_0x596167(0x201)])return;if(this[_0x596167(0x1cf)]===$gameParty)return;const _0x434e4d=this[_0x596167(0x1db)](),_0xc40f1=this['bitmapHeight'](),_0xe805c4=new Sprite();_0xe805c4[_0x596167(0x1ee)]['x']=this[_0x596167(0x1ee)]['x'],_0xe805c4[_0x596167(0x1ee)]['y']=this[_0x596167(0x1ee)]['y'],_0xe805c4[_0x596167(0x195)]=new Bitmap(_0x434e4d,_0xc40f1),this[_0x596167(0x16c)]=_0xe805c4,this[_0x596167(0x1a3)](this[_0x596167(0x16c)]);},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x12c)]=function(){const _0x14bfcb=_0x2492b8;return this[_0x14bfcb(0x1cf)]?this[_0x14bfcb(0x1cf)]['members']()[this[_0x14bfcb(0x251)]]:null;},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x140)]=function(){const _0x5ab3f0=_0x2492b8;Sprite_Clickable[_0x5ab3f0(0x20a)][_0x5ab3f0(0x140)][_0x5ab3f0(0x29c)](this),this[_0x5ab3f0(0x188)](),this['updatePosition'](),this[_0x5ab3f0(0x2be)](),this[_0x5ab3f0(0x161)](),this[_0x5ab3f0(0x2a7)](),this[_0x5ab3f0(0x264)](),this['updateLetter'](),this[_0x5ab3f0(0x193)]();},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['checkPosition']=function(){const _0xdd83d7=_0x2492b8,_0x278c03=this[_0xdd83d7(0x1fa)]();if(this['_position']===_0x278c03)return;this['_position']=_0x278c03;this[_0xdd83d7(0x1b6)]<0xff&&this['battler']()&&_0x278c03!==this[_0xdd83d7(0x22e)]()&&this[_0xdd83d7(0x26d)](0xff);if(_0x278c03===this[_0xdd83d7(0x22e)]()&&this['_fadeDuration']<=0x0&&this['opacity']>0x0)this['startFade'](0x0);else this[_0xdd83d7(0x245)]<=0x0&&this[_0xdd83d7(0x1b6)]<0xff&&this[_0xdd83d7(0x2be)]();this[_0xdd83d7(0x269)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x2492b8(0x175)]=function(){const _0x16ff52=_0x2492b8,_0x5e60cb=this[_0x16ff52(0x169)]();if(!_0x5e60cb)return;let _0xbcd91b=![];if(this[_0x16ff52(0x12d)]!==_0x5e60cb[_0x16ff52(0x1a5)])_0xbcd91b=!![];else this[_0x16ff52(0x27f)]!==_0x5e60cb[_0x16ff52(0x1f4)]&&(_0xbcd91b=!![]);_0xbcd91b&&this[_0x16ff52(0x269)]();},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x269)]=function(){const _0x1828aa=_0x2492b8,_0x2da5f9=Window_STB_TurnOrder['Settings'],_0x3df65e=this[_0x1828aa(0x14e)](),_0x10bad7=_0x2da5f9[_0x1828aa(0x208)],_0x105214=_0x2da5f9[_0x1828aa(0x22f)],_0x557060=SceneManager[_0x1828aa(0x14d)]['_stbTurnOrderWindow'];if(!_0x557060)return;const _0x49010c=this['containerPosition']();this[_0x1828aa(0x227)]=_0x2da5f9['UpdateFrames'],this[_0x1828aa(0x2af)]=_0x3df65e?_0x2da5f9[_0x1828aa(0x232)]*_0x49010c:0x0,this['_positionTargetY']=_0x3df65e?0x0:_0x2da5f9['SpriteThin']*_0x49010c,_0x49010c>0x0&&(this['_positionTargetX']+=_0x3df65e?_0x105214:0x0,this['_positionTargetY']+=_0x3df65e?0x0:_0x105214),_0x10bad7?this[_0x1828aa(0x2af)]=_0x3df65e?_0x557060['width']-this[_0x1828aa(0x2af)]-_0x2da5f9[_0x1828aa(0x232)]:0x0:this['_positionTargetY']=_0x3df65e?0x0:_0x557060[_0x1828aa(0x1f4)]-this['_positionTargetY']-_0x2da5f9[_0x1828aa(0x232)];},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['updatePosition']=function(){const _0x1a7db3=_0x2492b8;if(this[_0x1a7db3(0x245)]>0x0)return;if(this[_0x1a7db3(0x227)]>0x0){const _0x3c4236=this[_0x1a7db3(0x227)];this['x']=(this['x']*(_0x3c4236-0x1)+this['_positionTargetX'])/_0x3c4236,this['y']=(this['y']*(_0x3c4236-0x1)+this[_0x1a7db3(0x1cd)])/_0x3c4236,this['_positionDuration']--;}if(this[_0x1a7db3(0x227)]<=0x0){this['x']=this[_0x1a7db3(0x2af)],this['y']=this[_0x1a7db3(0x1cd)];if(this[_0x1a7db3(0x1b6)]<0xff&&!this[_0x1a7db3(0x1c7)]&&this[_0x1a7db3(0x245)]<=0x0){const _0x7000bc=this[_0x1a7db3(0x12c)]();_0x7000bc&&(this[_0x1a7db3(0x2cd)]=_0x7000bc[_0x1a7db3(0x1ef)]()&&_0x7000bc['isAppeared']()?0xff:0x0);}}},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x22e)]=function(){const _0xf9dbac=_0x2492b8,_0x126660=Window_STB_TurnOrder[_0xf9dbac(0x236)],_0xa57788=this[_0xf9dbac(0x14e)]()?_0x126660['MaxHorzSprites']:_0x126660['MaxVertSprites'];return _0xa57788+0x1;},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x169)]=function(){const _0x37b22c=_0x2492b8;return SceneManager[_0x37b22c(0x14d)][_0x37b22c(0x146)];},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x1fa)]=function(){const _0x23f085=_0x2492b8,_0x14c66e=this[_0x23f085(0x12c)]();if(!_0x14c66e)return this[_0x23f085(0x22e)]();if(_0x14c66e===BattleManager[_0x23f085(0x2b8)])return 0x0;if(BattleManager['_actionBattlers']['includes'](_0x14c66e)){const _0x401138=BattleManager[_0x23f085(0x2cf)][_0x23f085(0x2bd)](_0x14c66e)+0x1;return _0x401138;}return this[_0x23f085(0x22e)]();},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['startFade']=function(_0x28c9ee){const _0xc3bf98=_0x2492b8,_0xbb1d85=Window_STB_TurnOrder[_0xc3bf98(0x236)];this[_0xc3bf98(0x245)]=_0xbb1d85[_0xc3bf98(0x14c)],this['_fadeTarget']=_0x28c9ee;},Sprite_STB_TurnOrder_Battler['prototype'][_0x2492b8(0x2be)]=function(){const _0x3c6f40=_0x2492b8,_0x2b5bdc=this[_0x3c6f40(0x12c)]();if(!_0x2b5bdc)return;if(this[_0x3c6f40(0x1bc)]===_0x2b5bdc[_0x3c6f40(0x1ef)]()&&this[_0x3c6f40(0x139)]===_0x2b5bdc[_0x3c6f40(0x2a8)]())return;this['_isAlive']=_0x2b5bdc[_0x3c6f40(0x1ef)](),this['_isAppeared']=_0x2b5bdc[_0x3c6f40(0x2a8)]();let _0x29e32c=this['_isAlive']&&this[_0x3c6f40(0x139)]?0xff:0x0;this[_0x3c6f40(0x26d)](_0x29e32c);},Sprite_STB_TurnOrder_Battler['prototype'][_0x2492b8(0x161)]=function(){const _0x49cdfe=_0x2492b8;if(this['_fadeDuration']>0x0){const _0x4d4f3e=this[_0x49cdfe(0x245)];this[_0x49cdfe(0x1b6)]=(this['opacity']*(_0x4d4f3e-0x1)+this[_0x49cdfe(0x2cd)])/_0x4d4f3e,this[_0x49cdfe(0x245)]--,this[_0x49cdfe(0x245)]<=0x0&&(this['checkPosition'](),this['_positionDuration']=0x0,this['updatePosition'](),this[_0x49cdfe(0x1b6)]=this[_0x49cdfe(0x2cd)]);}if(this[_0x49cdfe(0x1c7)])return;BattleManager[_0x49cdfe(0x2b0)]==='battleEnd'&&(this[_0x49cdfe(0x1c7)]=!![],this[_0x49cdfe(0x26d)](0x0));},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x2a7)]=function(){const _0x11d465=_0x2492b8,_0xe72abe=this['battler']();if(!_0xe72abe)return;const _0x3eb1a2=Window_STB_TurnOrder[_0x11d465(0x236)],_0x3af6bf=this[_0x11d465(0x1cf)]===$gameParty?'Actor':_0x11d465(0x283);let _0x1fbe9e=_0xe72abe[_0x11d465(0x18a)]();if(_0xe72abe['isActor']()&&_0x1fbe9e===_0x11d465(0x26f))_0x1fbe9e='face';else _0xe72abe[_0x11d465(0x15d)]()&&_0x1fbe9e===_0x11d465(0x1d2)&&(_0x1fbe9e='enemy');if(this[_0x11d465(0x289)]!==_0x1fbe9e)return this['processUpdateGraphic']();switch(this[_0x11d465(0x289)]){case _0x11d465(0x21f):if(this['_graphicFaceName']!==_0xe72abe[_0x11d465(0x280)]())return this['processUpdateGraphic']();if(this[_0x11d465(0x248)]!==_0xe72abe[_0x11d465(0x1f3)]())return this[_0x11d465(0x16f)]();break;case _0x11d465(0x1a2):if(this[_0x11d465(0x196)]!==_0xe72abe[_0x11d465(0x1a6)]())return this['processUpdateGraphic']();break;case'enemy':if(_0xe72abe['hasSvBattler']()){if(this[_0x11d465(0x1d5)]!==_0xe72abe[_0x11d465(0x28d)]())return this['processUpdateGraphic']();}else{if(this[_0x11d465(0x243)]!==_0xe72abe['battlerName']())return this[_0x11d465(0x16f)]();}break;case'svactor':if(_0xe72abe['isActor']()){if(this[_0x11d465(0x1d5)]!==_0xe72abe[_0x11d465(0x1ab)]())return this['processUpdateGraphic']();}else{if(this[_0x11d465(0x243)]!==_0xe72abe[_0x11d465(0x1ab)]())return this[_0x11d465(0x16f)]();}break;}},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x16f)]=function(){const _0x289fab=_0x2492b8,_0x33ec59=this[_0x289fab(0x12c)]();if(!_0x33ec59)return;this[_0x289fab(0x289)]=_0x33ec59['TurnOrderSTBGraphicType']();if(_0x33ec59['isActor']()&&this['_graphicType']==='enemy')this[_0x289fab(0x289)]=_0x289fab(0x21f);else _0x33ec59[_0x289fab(0x15d)]()&&this['_graphicType']==='svactor'&&(this[_0x289fab(0x289)]='enemy');let _0x5a072f;switch(this[_0x289fab(0x289)]){case _0x289fab(0x21f):this[_0x289fab(0x11a)]=_0x33ec59[_0x289fab(0x280)](),this[_0x289fab(0x248)]=_0x33ec59[_0x289fab(0x1f3)](),_0x5a072f=ImageManager[_0x289fab(0x189)](this['_graphicFaceName']),_0x5a072f[_0x289fab(0x14b)](this[_0x289fab(0x13d)][_0x289fab(0x242)](this,_0x5a072f));break;case _0x289fab(0x1a2):this[_0x289fab(0x196)]=_0x33ec59[_0x289fab(0x1e2)](),_0x5a072f=ImageManager[_0x289fab(0x22d)]('IconSet'),_0x5a072f[_0x289fab(0x14b)](this[_0x289fab(0x19a)][_0x289fab(0x242)](this,_0x5a072f));break;case _0x289fab(0x26f):if(_0x33ec59[_0x289fab(0x1b9)]())this[_0x289fab(0x1d5)]=_0x33ec59[_0x289fab(0x28d)](),_0x5a072f=ImageManager[_0x289fab(0x122)](this[_0x289fab(0x1d5)]),_0x5a072f[_0x289fab(0x14b)](this[_0x289fab(0x26c)]['bind'](this,_0x5a072f));else $gameSystem[_0x289fab(0x1b1)]()?(this[_0x289fab(0x243)]=_0x33ec59[_0x289fab(0x1ab)](),_0x5a072f=ImageManager[_0x289fab(0x163)](this[_0x289fab(0x243)]),_0x5a072f['addLoadListener'](this['changeEnemyGraphicBitmap'][_0x289fab(0x242)](this,_0x5a072f))):(this['_graphicEnemy']=_0x33ec59[_0x289fab(0x1ab)](),_0x5a072f=ImageManager[_0x289fab(0x29f)](this[_0x289fab(0x243)]),_0x5a072f[_0x289fab(0x14b)](this[_0x289fab(0x1ae)][_0x289fab(0x242)](this,_0x5a072f)));break;case'svactor':this[_0x289fab(0x1d5)]=_0x33ec59['battlerName'](),_0x5a072f=ImageManager[_0x289fab(0x122)](this[_0x289fab(0x1d5)]),_0x5a072f[_0x289fab(0x14b)](this[_0x289fab(0x26c)][_0x289fab(0x242)](this,_0x5a072f));break;}},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x13d)]=function(_0x100ff6){const _0x3b5005=_0x2492b8,_0xae371d=this['_graphicFaceIndex'],_0x57c965=this[_0x3b5005(0x1db)](),_0x27ee63=this[_0x3b5005(0x19b)](),_0x38ac19=Math[_0x3b5005(0x11c)](_0x57c965,_0x27ee63);this['_graphicSprite'][_0x3b5005(0x195)]=new Bitmap(_0x57c965,_0x27ee63);const _0x1a5942=this[_0x3b5005(0x2ca)][_0x3b5005(0x195)],_0x5bd600=ImageManager[_0x3b5005(0x1d6)],_0x544030=ImageManager[_0x3b5005(0x187)],_0x148acd=_0x38ac19/Math[_0x3b5005(0x11c)](_0x5bd600,_0x544030),_0x1ca098=ImageManager['faceWidth'],_0x542ecb=ImageManager[_0x3b5005(0x187)],_0x1af00b=_0xae371d%0x4*_0x5bd600+(_0x5bd600-_0x1ca098)/0x2,_0x2ad429=Math['floor'](_0xae371d/0x4)*_0x544030+(_0x544030-_0x542ecb)/0x2,_0x163655=(_0x57c965-_0x5bd600*_0x148acd)/0x2,_0x9168ad=(_0x27ee63-_0x544030*_0x148acd)/0x2;_0x1a5942['blt'](_0x100ff6,_0x1af00b,_0x2ad429,_0x1ca098,_0x542ecb,_0x163655,_0x9168ad,_0x38ac19,_0x38ac19);},Sprite_STB_TurnOrder_Battler['prototype']['changeIconGraphicBitmap']=function(_0x1ae1ca){const _0x287484=_0x2492b8,_0xa0fe48=this['_graphicIconIndex'],_0x303177=this['bitmapWidth'](),_0x2a18c2=this[_0x287484(0x19b)]();this['_graphicSprite'][_0x287484(0x195)]=new Bitmap(_0x303177,_0x2a18c2);const _0x35e2da=this[_0x287484(0x2ca)]['bitmap'],_0x55bde3=ImageManager[_0x287484(0x265)],_0x391c14=ImageManager[_0x287484(0x220)],_0xd02eac=Math[_0x287484(0x14a)](_0x55bde3,_0x391c14,_0x303177,_0x2a18c2),_0x2c7d79=_0xa0fe48%0x10*_0x55bde3,_0xf024fa=Math[_0x287484(0x184)](_0xa0fe48/0x10)*_0x391c14,_0x536d6b=Math['floor'](Math[_0x287484(0x11c)](_0x303177-_0xd02eac,0x0)/0x2),_0x210a3e=Math['floor'](Math['max'](_0x2a18c2-_0xd02eac,0x0)/0x2);_0x35e2da[_0x287484(0x1d1)](_0x1ae1ca,_0x2c7d79,_0xf024fa,_0x55bde3,_0x391c14,_0x536d6b,_0x210a3e,_0xd02eac,_0xd02eac);},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x26c)]=function(_0x4127d0){const _0x37904f=_0x2492b8,_0x1b1c15=this[_0x37904f(0x1db)](),_0x3aa515=this[_0x37904f(0x19b)](),_0x526890=Math[_0x37904f(0x14a)](_0x1b1c15,_0x3aa515);this[_0x37904f(0x2ca)]['bitmap']=new Bitmap(_0x1b1c15,_0x3aa515);const _0x3755ae=this['_graphicSprite'][_0x37904f(0x195)],_0x460288=this[_0x37904f(0x1d5)][_0x37904f(0x153)](/\$/i),_0x3d9615=_0x460288?0x1:ImageManager['svActorHorzCells'],_0x3742c4=_0x460288?0x1:ImageManager[_0x37904f(0x239)],_0x289e2f=_0x4127d0[_0x37904f(0x1a5)]/_0x3d9615,_0x409756=_0x4127d0[_0x37904f(0x1f4)]/_0x3742c4,_0x505d53=Math[_0x37904f(0x14a)](0x1,_0x526890/_0x289e2f,_0x526890/_0x409756),_0x23783e=_0x289e2f*_0x505d53,_0x1e627e=_0x409756*_0x505d53,_0x181ddc=Math['round']((_0x1b1c15-_0x23783e)/0x2),_0x5c5d8c=Math[_0x37904f(0x1a4)]((_0x3aa515-_0x1e627e)/0x2);_0x3755ae['blt'](_0x4127d0,0x0,0x0,_0x289e2f,_0x409756,_0x181ddc,_0x5c5d8c,_0x23783e,_0x1e627e);},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x1ae)]=function(_0x5653e0){const _0x294327=_0x2492b8,_0x10475a=Window_STB_TurnOrder['Settings'],_0x3ab90e=this[_0x294327(0x1db)](),_0x548748=this[_0x294327(0x19b)](),_0x234e4b=Math[_0x294327(0x14a)](_0x3ab90e,_0x548748);this[_0x294327(0x2ca)][_0x294327(0x195)]=new Bitmap(_0x3ab90e,_0x548748);const _0x2d6fae=this['_graphicSprite']['bitmap'],_0xd43c14=Math[_0x294327(0x14a)](0x1,_0x234e4b/_0x5653e0[_0x294327(0x1a5)],_0x234e4b/_0x5653e0[_0x294327(0x1f4)]),_0x3d1ee3=_0x5653e0[_0x294327(0x1a5)]*_0xd43c14,_0x58b23a=_0x5653e0[_0x294327(0x1f4)]*_0xd43c14,_0x3d7ec2=Math[_0x294327(0x1a4)]((_0x3ab90e-_0x3d1ee3)/0x2),_0x1b3afc=Math[_0x294327(0x1a4)]((_0x548748-_0x58b23a)/0x2);_0x2d6fae[_0x294327(0x1d1)](_0x5653e0,0x0,0x0,_0x5653e0[_0x294327(0x1a5)],_0x5653e0['height'],_0x3d7ec2,_0x1b3afc,_0x3d1ee3,_0x58b23a);},Sprite_STB_TurnOrder_Battler['prototype'][_0x2492b8(0x264)]=function(){const _0x2cded3=_0x2492b8,_0x260eff=this['battler']();if(!_0x260eff)return;if(!_0x260eff[_0x2cded3(0x15d)]())return;if(this[_0x2cded3(0x1b3)]===_0x260eff[_0x2cded3(0x150)]())return;this['_graphicHue']=_0x260eff[_0x2cded3(0x150)](),this[_0x2cded3(0x2ca)]['setHue'](_0x260eff[_0x2cded3(0x1b9)]()?0x0:this[_0x2cded3(0x1b3)]);},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x13f)]=function(){const _0x184730=_0x2492b8;if(!this[_0x184730(0x16c)])return;const _0x54e50a=this[_0x184730(0x12c)]();if(!_0x54e50a)return;if(this[_0x184730(0x172)]===_0x54e50a[_0x184730(0x172)]&&this['_plural']===_0x54e50a['_plural'])return;this[_0x184730(0x172)]=_0x54e50a['_letter'],this[_0x184730(0x1e6)]=_0x54e50a[_0x184730(0x1e6)];const _0x1e343b=Window_STB_TurnOrder[_0x184730(0x236)],_0x247816=this[_0x184730(0x14e)](),_0x470c36=this[_0x184730(0x1db)](),_0x319785=this[_0x184730(0x19b)](),_0x21ee42=this[_0x184730(0x16c)][_0x184730(0x195)];_0x21ee42['clear']();if(!this[_0x184730(0x1e6)])return;_0x21ee42['fontFace']=_0x1e343b[_0x184730(0x1d4)]||$gameSystem[_0x184730(0x286)](),_0x21ee42[_0x184730(0x279)]=_0x1e343b[_0x184730(0x215)]||0x10,_0x247816?_0x21ee42['drawText'](this[_0x184730(0x172)][_0x184730(0x165)](),0x0,_0x319785/0x2,_0x470c36,_0x319785/0x2,_0x184730(0x145)):_0x21ee42[_0x184730(0x221)](this[_0x184730(0x172)][_0x184730(0x165)](),0x0,0x2,_0x470c36-0x8,_0x319785-0x4,'right');},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)]['updateSelectionEffect']=function(){const _0x413684=_0x2492b8,_0x139e7e=this[_0x413684(0x12c)]();if(!_0x139e7e)return;const _0x3ae3b5=_0x139e7e[_0x413684(0x12c)]();if(!_0x3ae3b5)return;const _0x30dc8e=_0x3ae3b5[_0x413684(0x1ca)]();if(!_0x30dc8e)return;this[_0x413684(0x157)](_0x30dc8e['_blendColor']);},Sprite_STB_TurnOrder_Battler[_0x2492b8(0x20a)][_0x2492b8(0x297)]=function(){const _0x14c4b9=_0x2492b8;return this[_0x14c4b9(0x12c)]();},VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x255)]=Window_Help[_0x2492b8(0x20a)][_0x2492b8(0x231)],Window_Help[_0x2492b8(0x20a)]['setItem']=function(_0x1c3bc0){const _0xd2e55c=_0x2492b8;BattleManager[_0xd2e55c(0x1da)]()&&_0x1c3bc0&&_0x1c3bc0[_0xd2e55c(0x1c1)]&&_0x1c3bc0[_0xd2e55c(0x1c1)]['match'](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)?this[_0xd2e55c(0x113)](String(RegExp['$1'])):VisuMZ[_0xd2e55c(0x268)][_0xd2e55c(0x255)]['call'](this,_0x1c3bc0);};function Window_STB_TurnOrder(){this['initialize'](...arguments);}Window_STB_TurnOrder['prototype']=Object['create'](Window_Base[_0x2492b8(0x20a)]),Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x1fe)]=Window_STB_TurnOrder,Window_STB_TurnOrder['Settings']=VisuMZ[_0x2492b8(0x268)][_0x2492b8(0x236)]['TurnOrder'],Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x1df)]=function(){const _0x311b22=_0x2492b8,_0x6bacbf=this[_0x311b22(0x15c)]();this[_0x311b22(0x254)](_0x6bacbf),Window_Base[_0x311b22(0x20a)][_0x311b22(0x1df)][_0x311b22(0x29c)](this,_0x6bacbf),this[_0x311b22(0x235)](),this[_0x311b22(0x1ff)](),this[_0x311b22(0x1b6)]=0x0;},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x15c)]=function(){return this['createBattlerRect']($gameParty['maxBattleMembers'](),0x9,!![]);},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x254)]=function(_0x1ef20d){const _0x34fc10=_0x2492b8;this[_0x34fc10(0x275)]=this[_0x34fc10(0x117)]=_0x1ef20d['x'],this[_0x34fc10(0x167)]=this[_0x34fc10(0x143)]=_0x1ef20d['y'],this[_0x34fc10(0x2b3)]=_0x1ef20d['width'],this[_0x34fc10(0x192)]=_0x1ef20d[_0x34fc10(0x1f4)],this[_0x34fc10(0x125)]=0x0;},Window_STB_TurnOrder['prototype'][_0x2492b8(0x16d)]=function(_0x25bdb2,_0x458f3d,_0x5413dc){const _0x233541=_0x2492b8,_0x4ea5f5=Window_STB_TurnOrder[_0x233541(0x236)],_0x206a4b=this[_0x233541(0x14e)]()?_0x4ea5f5[_0x233541(0x17b)]:_0x4ea5f5[_0x233541(0x1e4)],_0x46fdfd=Math[_0x233541(0x14a)](_0x206a4b,_0x25bdb2+_0x458f3d),_0x51af7e=SceneManager[_0x233541(0x14d)]['_statusWindow'][_0x233541(0x1f4)],_0x4ab453=SceneManager[_0x233541(0x14d)][_0x233541(0x1ce)][_0x233541(0x1f4)],_0x2c60d3=_0x4ea5f5[_0x233541(0x22f)],_0x1bfd83=Graphics['height']-_0x51af7e-_0x4ab453;let _0x291ae5=0x0,_0x8a8c28=0x0,_0x2c5bd5=0x0,_0x4c22c8=0x0;switch(_0x4ea5f5[_0x233541(0x170)]){case'top':_0x291ae5=_0x4ea5f5[_0x233541(0x232)]*_0x46fdfd+_0x2c60d3,_0x8a8c28=_0x4ea5f5[_0x233541(0x22c)],_0x2c5bd5=Math[_0x233541(0x112)]((Graphics[_0x233541(0x1a5)]-_0x291ae5)/0x2),_0x4c22c8=_0x4ea5f5[_0x233541(0x1b7)];break;case'bottom':_0x291ae5=_0x4ea5f5[_0x233541(0x232)]*_0x46fdfd+_0x2c60d3,_0x8a8c28=_0x4ea5f5['SpriteLength'],_0x2c5bd5=Math[_0x233541(0x112)]((Graphics[_0x233541(0x1a5)]-_0x291ae5)/0x2),_0x4c22c8=Graphics['height']-_0x51af7e-_0x8a8c28-_0x4ea5f5[_0x233541(0x1b7)];break;case _0x233541(0x1a0):_0x291ae5=_0x4ea5f5['SpriteLength'],_0x8a8c28=_0x4ea5f5[_0x233541(0x232)]*_0x46fdfd+_0x2c60d3,_0x2c5bd5=_0x4ea5f5[_0x233541(0x1b7)],_0x4c22c8=Math[_0x233541(0x112)]((_0x1bfd83-_0x8a8c28)/0x2),_0x4c22c8+=_0x4ab453;break;case _0x233541(0x128):_0x291ae5=_0x4ea5f5['SpriteLength'],_0x8a8c28=_0x4ea5f5[_0x233541(0x232)]*_0x46fdfd+_0x2c60d3,_0x2c5bd5=Graphics['width']-_0x291ae5-_0x4ea5f5[_0x233541(0x1b7)],_0x4c22c8=Math[_0x233541(0x112)]((_0x1bfd83-_0x8a8c28)/0x2),_0x4c22c8+=_0x4ab453;break;}if(!_0x5413dc){const _0x47125b=Window_STB_TurnOrder[_0x233541(0x236)][_0x233541(0x208)];let _0x40e635=Math[_0x233541(0x14a)](_0x206a4b,Math[_0x233541(0x14a)]($gameParty['maxBattleMembers']()+0x8)-_0x46fdfd);switch(_0x4ea5f5[_0x233541(0x170)]){case _0x233541(0x256):case _0x233541(0x24b):_0x47125b&&(_0x2c5bd5-=_0x40e635*_0x4ea5f5[_0x233541(0x232)]);break;}}return _0x2c5bd5+=_0x4ea5f5[_0x233541(0x28b)],_0x4c22c8+=_0x4ea5f5[_0x233541(0x281)],new Rectangle(_0x2c5bd5,_0x4c22c8,_0x291ae5,_0x8a8c28);},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x17d)]=function(){const _0x1a4b10=_0x2492b8;this[_0x1a4b10(0x203)]=0x0;},Window_STB_TurnOrder['prototype'][_0x2492b8(0x14e)]=function(){const _0x2b8507=_0x2492b8,_0x5ab4c8=Window_STB_TurnOrder['Settings'],_0xecab16=['top','bottom']['includes'](_0x5ab4c8[_0x2b8507(0x170)]);return _0xecab16;},Window_STB_TurnOrder['prototype'][_0x2492b8(0x235)]=function(){const _0x4865e8=_0x2492b8;this[_0x4865e8(0x25b)]=new Sprite(),this[_0x4865e8(0x2bb)](this[_0x4865e8(0x25b)]),this[_0x4865e8(0x142)]=[];for(let _0x1071c4=0x0;_0x1071c4<$gameParty[_0x4865e8(0x1e9)]();_0x1071c4++){const _0x4012c2=new Sprite_STB_TurnOrder_Battler($gameParty,_0x1071c4);this['_turnOrderInnerSprite'][_0x4865e8(0x1a3)](_0x4012c2),this['_turnOrderContainer'][_0x4865e8(0x1b4)](_0x4012c2);}for(let _0x286386=0x0;_0x286386<$gameTroop[_0x4865e8(0x1b0)]()[_0x4865e8(0x2a1)];_0x286386++){const _0x2c6b2f=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x286386);this['_turnOrderInnerSprite'][_0x4865e8(0x1a3)](_0x2c6b2f),this[_0x4865e8(0x142)][_0x4865e8(0x1b4)](_0x2c6b2f);}},Window_STB_TurnOrder['prototype']['update']=function(){const _0x8fd306=_0x2492b8;Window_Base['prototype'][_0x8fd306(0x140)]['call'](this),this[_0x8fd306(0x15a)](),this[_0x8fd306(0x18e)](),this[_0x8fd306(0x173)](),this[_0x8fd306(0x15e)](),this[_0x8fd306(0x1ff)]();},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x15a)]=function(){const _0x1fea04=_0x2492b8;if(this[_0x1fea04(0x125)]>0x0){const _0x24e180=this[_0x1fea04(0x125)];this[_0x1fea04(0x117)]=(this[_0x1fea04(0x117)]*(_0x24e180-0x1)+this['_targetHomeX'])/_0x24e180,this[_0x1fea04(0x143)]=(this['_homeY']*(_0x24e180-0x1)+this[_0x1fea04(0x167)])/_0x24e180,this[_0x1fea04(0x125)]--,this[_0x1fea04(0x125)]<=0x0&&(this['_homeX']=this[_0x1fea04(0x275)],this['_homeY']=this[_0x1fea04(0x167)]);}},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x18e)]=function(){const _0x2634bd=_0x2492b8,_0x970463=Window_STB_TurnOrder[_0x2634bd(0x236)];if(_0x970463[_0x2634bd(0x170)]!==_0x2634bd(0x256))return;if(!_0x970463[_0x2634bd(0x285)])return;const _0x533dc6=SceneManager[_0x2634bd(0x14d)][_0x2634bd(0x1ce)];if(!_0x533dc6)return;_0x533dc6[_0x2634bd(0x28e)]?(this['x']=this[_0x2634bd(0x117)]+(_0x970463[_0x2634bd(0x116)]||0x0),this['y']=this[_0x2634bd(0x143)]+(_0x970463['RepositionTopHelpY']||0x0)):(this['x']=this['_homeX'],this['y']=this[_0x2634bd(0x143)]);const _0x582b2a=SceneManager[_0x2634bd(0x14d)]['_windowLayer'];Window_STB_TurnOrder['_ogWindowLayerX']===undefined&&(Window_STB_TurnOrder[_0x2634bd(0x1a1)]=Math[_0x2634bd(0x1a4)]((Graphics[_0x2634bd(0x1a5)]-Math[_0x2634bd(0x14a)](Graphics['boxWidth'],_0x582b2a[_0x2634bd(0x1a5)]))/0x2),Window_STB_TurnOrder['_ogWindowLayerY']=Math[_0x2634bd(0x1a4)]((Graphics[_0x2634bd(0x1f4)]-Math[_0x2634bd(0x14a)](Graphics[_0x2634bd(0x23f)],_0x582b2a[_0x2634bd(0x1f4)]))/0x2)),this['x']+=_0x582b2a['x']-Window_STB_TurnOrder[_0x2634bd(0x1a1)],this['y']+=_0x582b2a['y']-Window_STB_TurnOrder['_ogWindowLayerY'];},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x173)]=function(){const _0x9ccbc5=_0x2492b8,_0x2c8cf0=Window_STB_TurnOrder[_0x9ccbc5(0x236)];if([_0x9ccbc5(0x256)][_0x9ccbc5(0x2c0)](_0x2c8cf0[_0x9ccbc5(0x170)]))return;this['x']=this[_0x9ccbc5(0x117)],this['y']=this[_0x9ccbc5(0x143)];const _0x515d47=SceneManager[_0x9ccbc5(0x14d)][_0x9ccbc5(0x271)];this['x']+=_0x515d47['x'],this['y']+=_0x515d47['y'];},Window_STB_TurnOrder[_0x2492b8(0x20a)]['updateBattleContainerOrder']=function(){const _0x1d118a=_0x2492b8;if(!this['_turnOrderInnerSprite'])return;const _0x439eb3=this['_turnOrderInnerSprite'][_0x1d118a(0x1ba)];if(!_0x439eb3)return;_0x439eb3['sort'](this['compareBattlerSprites'][_0x1d118a(0x242)](this));},Window_STB_TurnOrder[_0x2492b8(0x20a)]['compareBattlerSprites']=function(_0x229516,_0x1e24e6){const _0x166e9a=_0x2492b8,_0x5adfdf=this[_0x166e9a(0x14e)](),_0xdc29ab=Window_STB_TurnOrder['Settings']['OrderDirection'];if(_0x5adfdf&&!_0xdc29ab)return _0x229516['x']-_0x1e24e6['x'];else{if(_0x5adfdf&&_0xdc29ab)return _0x1e24e6['x']-_0x229516['x'];else{if(!_0x5adfdf&&_0xdc29ab)return _0x229516['y']-_0x1e24e6['y'];else{if(!_0x5adfdf&&!_0xdc29ab)return _0x1e24e6['y']-_0x229516['y'];}}}},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x1ff)]=function(){const _0x1de5dd=_0x2492b8;this[_0x1de5dd(0x28e)]=$gameSystem[_0x1de5dd(0x11b)]();},Window_STB_TurnOrder[_0x2492b8(0x20a)][_0x2492b8(0x2c2)]=function(_0xa67f00){const _0x16cd95=_0x2492b8;this[_0x16cd95(0x142)]['sort']((_0x11eb66,_0x4b2372)=>{const _0x5e0173=_0x16cd95;return _0x11eb66[_0x5e0173(0x1fa)]()-_0x4b2372[_0x5e0173(0x1fa)]();}),this[_0x16cd95(0x234)]();if(!_0xa67f00)return;for(const _0x583b8a of this[_0x16cd95(0x142)]){if(!_0x583b8a)continue;_0x583b8a[_0x16cd95(0x140)](),_0x583b8a[_0x16cd95(0x227)]=0x0;}},Window_STB_TurnOrder[_0x2492b8(0x20a)]['recalculateHome']=function(){const _0x2ce621=_0x2492b8;if(!this[_0x2ce621(0x14e)]())return;const _0x47fa57=VisuMZ['BattleSystemSTB'][_0x2ce621(0x236)]['TurnOrder'];if(!_0x47fa57[_0x2ce621(0x1f6)])return;const _0x482fe0=$gameParty['members']()[_0x2ce621(0x1f1)](_0x15dd80=>_0x15dd80&&_0x15dd80[_0x2ce621(0x1ef)]()&&_0x15dd80[_0x2ce621(0x2a8)]())[_0x2ce621(0x2a1)],_0x24587b=$gameTroop[_0x2ce621(0x1b0)]()[_0x2ce621(0x1f1)](_0x4f0f72=>_0x4f0f72&&_0x4f0f72[_0x2ce621(0x1ef)]()&&_0x4f0f72['isAppeared']())[_0x2ce621(0x2a1)],_0x307a07=this[_0x2ce621(0x16d)](_0x482fe0,_0x24587b);this['_targetHomeX']=_0x307a07['x'],this[_0x2ce621(0x167)]=_0x307a07['y'],(this[_0x2ce621(0x275)]!==this[_0x2ce621(0x117)]||this[_0x2ce621(0x167)]!==this[_0x2ce621(0x143)])&&(this[_0x2ce621(0x125)]=_0x47fa57['UpdateFrames']);};