//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.36;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.36] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
 * 
 * Temporary Parties
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
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
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 * 
 * VisuMZ_2_BattleSystemSTB
 * 
 * With Battle System - STB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Standard Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 * 
 * === Temporary Parties Plugin Commands ===
 * 
 * Temporary parties are very specific parties that will overwrite whatever the
 * player has set as a party. These can include current party members or even
 * actors that haven't joined. The temporary party cannot be changed nor can
 * the positions of said party members can be changed.
 * 
 * When a temporary party is present, menu and battle commands involving
 * changing party members will be disabled.
 * 
 * Once the temporary party is disbanded, the player's selected party will be
 * available once again as well as all of the functions to change party members
 * and their positions.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (Normal)
 * - Creates a temporary party with specific actors.
 * - Can't be used in battle.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to be added to the temporary party until the
 *     temporary party is disbanded.
 * 
 * ---
 * 
 * Temp: Create Temporary Party (JS)
 * - Creates a temporary party selected with JavaScript.
 * - Can't be used in battle.
 * 
 *   JS: Actor ID(s):
 *   - Use JavaScript to determine which actor(s) are added to the temporary
 *     party until disbanded.
 * 
 * ---
 * 
 * Temp: Disband Temporary Party
 * - Clears temporary party.
 * - Can't be used in battle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.36: April 20, 2026
 * * Compatibility Update!
 * ** Added better compatibility for other plugins that add extra commands to
 *    the party command window.
 * 
 * Version 1.35: August 14, 2025
 * * Bug Fixes!
 * ** Fixed a bug where if the battle had no battle back setting and is using a
 *    map snapshot, the snapshot would be overwritten if the player enters the
 *    party change menu from battle. This should no longer occur and the map
 *    snapshot will be preserved. Fix made by Olivia.
 * 
 * Version 1.34: July 17, 2025
 * * Compatibility Update!
 * ** Added better compatibility with TPB when using the in-battle Party switch
 *    command from the Party Command Window. Update made by Irina.
 * 
 * Version 1.33: May 15, 2025
 * * Compatibility Update!
 * ** Added better compatibility for $gameParty.swapOrder function to allow it
 *    to work on the map. Update made by Irina.
 * 
 * Version 1.32: December 19, 2024
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash upon adding new members if the
 *    VisuStella Core Engine wasn't installed. Fix made by Arisu.
 * 
 * Version 1.31: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** New section added to "Major Changes":
 * *** Temporary Parties
 * **** Temporary parties are very specific parties that will overwrite
 *      whatever the player has set as a party. These can include current party
 *      members or even actors that haven't joined. The temporary party cannot
 *      be changed nor can the positions of said party members can be changed.
 * **** When a temporary party is present, menu and battle commands involving
 *      changing party members will be disabled.
 * **** Once the temporary party is disbanded, the player's selected party will
 *      be available once again as well as all of the functions to change party
 *      members and their positions.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Temp: Create Temporary Party (Normal)
 * **** Creates a temporary party with specific actors.
 * *** Temp: Create Temporary Party (JS)
 * **** Creates a temporary party selected with JavaScript.
 * *** Temp: Disband Temporary Party
 * **** Clears temporary party.
 * 
 * Version 1.30: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with FTB, ETB, and PTB did not replace
 *    the newely added party member on the turn order timeline. Fix by Olivia.
 * 
 * Version 1.29: March 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where party changes with PTB did not register correctly.
 *    Fix made by Olivia.
 * 
 * Version 1.28: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: February 16, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * Feature Update!
 * ** When holding the "up" keyboard button with the reserve window active, the
 *    return to the active party window will no longer happen unless the "up"
 *    key is released and then pressed again. Update made by Olivia.
 * 
 * Version 1.26: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
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
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Temp
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyNormal
 * @text Temp: Create Temporary Party (Normal)
 * @desc Creates a temporary party with specific actors.
 * Can't be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to be added to the temporary party
 * until the temporary party is disbanded.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempCreatePartyJS
 * @text Temp: Create Temporary Party (JS)
 * @desc Creates a temporary party selected with JavaScript.
 * Can't be used in battle.
 *
 * @arg ActorsJS:func
 * @text JS: Actor ID(s)
 * @type note
 * @desc Use JavaScript to determine which actor(s) are added to
 * the temporary party until disbanded.
 * @default "// Declare Actor ID's\nconst actorIDs = [];\n\n// Add Actor ID's\nactorIDs.push(1);\nactorIDs.push(2);\nactorIDs.push(3);\nactorIDs.push(4);\n\n// Return Actor IDs\nreturn actorIDs;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TempDisbandTempParty
 * @text Temp: Disband Temporary Party
 * @desc Clears temporary party.
 * Can't be used in battle.
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param General
 *
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
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
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
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
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
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
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
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
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
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
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
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
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
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
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
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
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
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
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x1cd296=_0x8f6f;(function(_0xd91030,_0x42dc88){const _0x9848ce=_0x8f6f,_0x3d4cc4=_0xd91030();while(!![]){try{const _0x16d020=-parseInt(_0x9848ce(0x162))/0x1*(-parseInt(_0x9848ce(0x369))/0x2)+parseInt(_0x9848ce(0x198))/0x3*(-parseInt(_0x9848ce(0x231))/0x4)+-parseInt(_0x9848ce(0x297))/0x5+-parseInt(_0x9848ce(0x1b5))/0x6*(parseInt(_0x9848ce(0x20b))/0x7)+-parseInt(_0x9848ce(0x2b9))/0x8*(-parseInt(_0x9848ce(0x17e))/0x9)+parseInt(_0x9848ce(0x164))/0xa*(parseInt(_0x9848ce(0x1ed))/0xb)+-parseInt(_0x9848ce(0x1b0))/0xc*(-parseInt(_0x9848ce(0x1c3))/0xd);if(_0x16d020===_0x42dc88)break;else _0x3d4cc4['push'](_0x3d4cc4['shift']());}catch(_0x26e3dc){_0x3d4cc4['push'](_0x3d4cc4['shift']());}}}(_0x107f,0x660cc));var label=_0x1cd296(0x2b3),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x558dee){const _0x42f5c6=_0x1cd296;return _0x558dee[_0x42f5c6(0x219)]&&_0x558dee[_0x42f5c6(0x1a6)][_0x42f5c6(0x240)]('['+label+']');})[0x0];VisuMZ[label][_0x1cd296(0x22a)]=VisuMZ[label][_0x1cd296(0x22a)]||{},VisuMZ[_0x1cd296(0x258)]=function(_0x569d09,_0x2df6fa){const _0x6471d5=_0x1cd296;for(const _0xcf81ab in _0x2df6fa){if(_0xcf81ab[_0x6471d5(0x186)](/(.*):(.*)/i)){const _0x118345=String(RegExp['$1']),_0x32427c=String(RegExp['$2'])[_0x6471d5(0x355)]()[_0x6471d5(0x33f)]();let _0x1390c2,_0xeef466,_0x37864f;switch(_0x32427c){case _0x6471d5(0x182):_0x1390c2=_0x2df6fa[_0xcf81ab]!==''?Number(_0x2df6fa[_0xcf81ab]):0x0;break;case'ARRAYNUM':_0xeef466=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):[],_0x1390c2=_0xeef466[_0x6471d5(0x30f)](_0x2271f4=>Number(_0x2271f4));break;case _0x6471d5(0x1c9):_0x1390c2=_0x2df6fa[_0xcf81ab]!==''?eval(_0x2df6fa[_0xcf81ab]):null;break;case'ARRAYEVAL':_0xeef466=_0x2df6fa[_0xcf81ab]!==''?JSON['parse'](_0x2df6fa[_0xcf81ab]):[],_0x1390c2=_0xeef466['map'](_0x48f4a=>eval(_0x48f4a));break;case'JSON':_0x1390c2=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):'';break;case'ARRAYJSON':_0xeef466=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):[],_0x1390c2=_0xeef466[_0x6471d5(0x30f)](_0x42b617=>JSON[_0x6471d5(0x2fd)](_0x42b617));break;case _0x6471d5(0x335):_0x1390c2=_0x2df6fa[_0xcf81ab]!==''?new Function(JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab])):new Function(_0x6471d5(0x16e));break;case _0x6471d5(0x2ca):_0xeef466=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):[],_0x1390c2=_0xeef466['map'](_0x56950c=>new Function(JSON[_0x6471d5(0x2fd)](_0x56950c)));break;case'STR':_0x1390c2=_0x2df6fa[_0xcf81ab]!==''?String(_0x2df6fa[_0xcf81ab]):'';break;case'ARRAYSTR':_0xeef466=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):[],_0x1390c2=_0xeef466[_0x6471d5(0x30f)](_0x190fe0=>String(_0x190fe0));break;case _0x6471d5(0x236):_0x37864f=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):{},_0x1390c2=VisuMZ[_0x6471d5(0x258)]({},_0x37864f);break;case _0x6471d5(0x1b7):_0xeef466=_0x2df6fa[_0xcf81ab]!==''?JSON[_0x6471d5(0x2fd)](_0x2df6fa[_0xcf81ab]):[],_0x1390c2=_0xeef466[_0x6471d5(0x30f)](_0x365755=>VisuMZ['ConvertParams']({},JSON['parse'](_0x365755)));break;default:continue;}_0x569d09[_0x118345]=_0x1390c2;}}return _0x569d09;},(_0x23af57=>{const _0x10736f=_0x1cd296,_0x1ad3c3=_0x23af57[_0x10736f(0x361)];for(const _0x2a014a of dependencies){if(!Imported[_0x2a014a]){alert(_0x10736f(0x1a5)['format'](_0x1ad3c3,_0x2a014a)),SceneManager[_0x10736f(0x2f0)]();break;}}const _0x7a2058=_0x23af57[_0x10736f(0x1a6)];if(_0x7a2058['match'](/\[Version[ ](.*?)\]/i)){const _0x5f2c40=Number(RegExp['$1']);_0x5f2c40!==VisuMZ[label][_0x10736f(0x257)]&&(alert(_0x10736f(0x26e)['format'](_0x1ad3c3,_0x5f2c40)),SceneManager[_0x10736f(0x2f0)]());}if(_0x7a2058[_0x10736f(0x186)](/\[Tier[ ](\d+)\]/i)){const _0x3e7002=Number(RegExp['$1']);_0x3e7002<tier?(alert(_0x10736f(0x29a)['format'](_0x1ad3c3,_0x3e7002,tier)),SceneManager['exit']()):tier=Math[_0x10736f(0x224)](_0x3e7002,tier);}VisuMZ[_0x10736f(0x258)](VisuMZ[label]['Settings'],_0x23af57['parameters']);})(pluginData),PluginManager[_0x1cd296(0x17b)](pluginData['name'],_0x1cd296(0x27f),_0x672f31=>{SceneManager['push'](Scene_Party);}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],_0x1cd296(0x2b5),_0x1425bf=>{const _0x48e191=_0x1cd296;if($gameParty[_0x48e191(0x2d9)]())return;VisuMZ[_0x48e191(0x258)](_0x1425bf,_0x1425bf);const _0x72f6e9=_0x1425bf[_0x48e191(0x348)];$gameParty[_0x48e191(0x159)](_0x72f6e9);}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],'MoveActorsToActive',_0x3e6466=>{const _0x1ed03c=_0x1cd296;if(!SceneManager[_0x1ed03c(0x1e8)]())return;VisuMZ[_0x1ed03c(0x258)](_0x3e6466,_0x3e6466);const _0x167892=_0x3e6466['Actors'];for(const _0x1296e6 of _0x167892){$gameParty[_0x1ed03c(0x34a)](_0x1296e6);}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x1cd296(0x361)],_0x1cd296(0x33a),_0x21a867=>{const _0x55f6a1=_0x1cd296;if(!SceneManager[_0x55f6a1(0x1e8)]())return;VisuMZ[_0x55f6a1(0x258)](_0x21a867,_0x21a867);const _0x44431c=_0x21a867['Actors'];for(const _0x224ee5 of _0x44431c){if($gameParty[_0x55f6a1(0x2ac)]()[_0x55f6a1(0x2e0)]<=0x1)break;$gameParty[_0x55f6a1(0x274)](_0x224ee5);}$gamePlayer['refresh']();}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],_0x1cd296(0x2df),_0x42ed05=>{const _0x4f2c91=_0x1cd296;if(!SceneManager['isSceneMap']())return;if($gameParty[_0x4f2c91(0x2ac)]()['length']<=0x1)return;if(!$gameParty[_0x4f2c91(0x246)])return;if($gameParty[_0x4f2c91(0x246)][_0x4f2c91(0x2e0)]<=0x0)return;VisuMZ[_0x4f2c91(0x258)](_0x42ed05,_0x42ed05);const _0x52f33f=_0x42ed05[_0x4f2c91(0x30d)],_0x543af0=$gameParty[_0x4f2c91(0x246)][_0x52f33f];$gameParty[_0x4f2c91(0x274)](_0x543af0),$gamePlayer[_0x4f2c91(0x287)]();}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],'MoveRandomToActive',_0x5c8b0a=>{const _0x542e45=_0x1cd296;if(!SceneManager[_0x542e45(0x1e8)]())return;if($gameParty[_0x542e45(0x2ac)]()[_0x542e45(0x2e0)]>=$gameParty[_0x542e45(0x249)]())return;if($gameParty[_0x542e45(0x1d4)]()[_0x542e45(0x2e0)]<=0x0)return;const _0x1e0727=$gameParty['reserveMembers'](),_0x121e1c=_0x1e0727[Math[_0x542e45(0x23f)](Math['random']()*_0x1e0727['length'])],_0x1f8c71=_0x121e1c[_0x542e45(0x288)]();$gameParty[_0x542e45(0x34a)](_0x1f8c71),$gamePlayer['refresh']();}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],'LockPartyMembers',_0x4fc348=>{const _0x174a46=_0x1cd296;VisuMZ[_0x174a46(0x258)](_0x4fc348,_0x4fc348);const _0x2b6ec4=_0x4fc348['Actors'][_0x174a46(0x30f)](_0xc12d34=>$gameActors[_0x174a46(0x1d7)](_0xc12d34))[_0x174a46(0x276)](null),_0x5ddc13=_0x4fc348[_0x174a46(0x26b)];for(const _0x45225f of _0x2b6ec4){if(!_0x45225f)continue;_0x45225f[_0x174a46(0x158)](_0x5ddc13);}}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],'RequirePartyMembers',_0x43bfc7=>{const _0x3d56a3=_0x1cd296;VisuMZ[_0x3d56a3(0x258)](_0x43bfc7,_0x43bfc7);const _0x44f279=_0x43bfc7['Actors'][_0x3d56a3(0x30f)](_0x18b014=>$gameActors['actor'](_0x18b014))[_0x3d56a3(0x276)](null),_0x208ab6=_0x43bfc7[_0x3d56a3(0x2e9)];for(const _0x39f8a3 of _0x44f279){if(!_0x39f8a3)continue;_0x39f8a3[_0x3d56a3(0x244)](_0x208ab6);}}),PluginManager['registerCommand'](pluginData['name'],'TempCreatePartyNormal',_0x46e340=>{const _0x3a768a=_0x1cd296;if($gameParty[_0x3a768a(0x2d9)]())return;VisuMZ['ConvertParams'](_0x46e340,_0x46e340);const _0x29c679=_0x46e340[_0x3a768a(0x1cc)]||[];if(_0x29c679[_0x3a768a(0x2e0)]<=0x0)return;$gameParty[_0x3a768a(0x200)](_0x29c679);}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],_0x1cd296(0x2d0),_0x3527ae=>{const _0x5643dd=_0x1cd296;if($gameParty[_0x5643dd(0x2d9)]())return;VisuMZ[_0x5643dd(0x258)](_0x3527ae,_0x3527ae);let _0x58c882=[];try{_0x58c882=_0x3527ae[_0x5643dd(0x192)]()||[];}catch(_0x5e7841){console[_0x5643dd(0x20c)](_0x5643dd(0x1fd)),console[_0x5643dd(0x20c)](_0x5e7841);return;}if(_0x58c882[_0x5643dd(0x2e0)]<=0x0)return;$gameParty['createForcedParty'](_0x58c882);}),PluginManager[_0x1cd296(0x17b)](pluginData[_0x1cd296(0x361)],_0x1cd296(0x319),_0x39f97e=>{const _0x588402=_0x1cd296;if($gameParty[_0x588402(0x2d9)]())return;VisuMZ['ConvertParams'](_0x39f97e,_0x39f97e),$gameParty[_0x588402(0x18d)]();}),ImageManager[_0x1cd296(0x1f2)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)]['General']['LockIcon'],ImageManager['requiredPartyMemberIcon']=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)]['General'][_0x1cd296(0x2eb)],TextManager['activeParty']=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)]['Vocab'][_0x1cd296(0x2f4)],TextManager[_0x1cd296(0x1f0)]=VisuMZ['PartySystem'][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x22d)],TextManager[_0x1cd296(0x1c8)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)]['Status'],TextManager[_0x1cd296(0x17d)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x1e9)],TextManager['removePartyMember']=VisuMZ[_0x1cd296(0x2b3)]['Settings'][_0x1cd296(0x302)][_0x1cd296(0x27c)],TextManager[_0x1cd296(0x1ee)]=VisuMZ['PartySystem'][_0x1cd296(0x22a)][_0x1cd296(0x302)]['AssistSwapPosition'],TextManager[_0x1cd296(0x1a4)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)]['AssistRemove'],TextManager[_0x1cd296(0x23a)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x2f1)],TextManager[_0x1cd296(0x1b8)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)]['AssistSwapIn'],TextManager[_0x1cd296(0x160)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)]['AssistSwapOut'],ColorManager['getColor']=function(_0x59f9e7){const _0x20a920=_0x1cd296;return _0x59f9e7=String(_0x59f9e7),_0x59f9e7[_0x20a920(0x186)](/#(.*)/i)?'#%1'[_0x20a920(0x304)](String(RegExp['$1'])):this[_0x20a920(0x19e)](Number(_0x59f9e7));},SceneManager[_0x1cd296(0x2e1)]=function(){const _0x1e3f3b=_0x1cd296;return this[_0x1e3f3b(0x292)]&&this['_scene'][_0x1e3f3b(0x201)]===Scene_Battle;},SceneManager[_0x1cd296(0x315)]=function(){const _0xb0d21c=_0x1cd296;return this[_0xb0d21c(0x292)]&&this[_0xb0d21c(0x292)][_0xb0d21c(0x201)]===Scene_Party;},SceneManager[_0x1cd296(0x1e8)]=function(){const _0x29a432=_0x1cd296;return this[_0x29a432(0x292)]&&this[_0x29a432(0x292)][_0x29a432(0x201)]===Scene_Map;},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x2aa)]=BattleManager[_0x1cd296(0x2fa)],BattleManager[_0x1cd296(0x2fa)]=function(_0x171481,_0x17a167,_0x549fa4){const _0x49bcda=_0x1cd296;VisuMZ[_0x49bcda(0x2b3)][_0x49bcda(0x2aa)]['call'](this,_0x171481,_0x17a167,_0x549fa4),$gameParty[_0x49bcda(0x1f6)]();},BattleManager['updateTargetsForPartySwitch']=function(_0x2601be,_0x4ea469){const _0x2a6889=_0x1cd296;if(_0x2601be===_0x4ea469)return;if(!_0x2601be)return;if(!_0x4ea469)return;if(this[_0x2a6889(0x2a6)]===_0x2601be)this['_target']=_0x4ea469;while(this[_0x2a6889(0x29b)]['includes'](_0x2601be)){const _0x3514af=this['_targets'][_0x2a6889(0x2dd)](_0x2601be);this[_0x2a6889(0x29b)][_0x3514af]=_0x4ea469;}},VisuMZ[_0x1cd296(0x2b3)]['Game_Battler_onBattleStart']=Game_Battler[_0x1cd296(0x203)]['onBattleStart'],Game_Battler[_0x1cd296(0x203)][_0x1cd296(0x1c1)]=function(_0x742d0b){const _0x59838d=_0x1cd296;VisuMZ[_0x59838d(0x2b3)][_0x59838d(0x161)][_0x59838d(0x2ae)](this,_0x742d0b);if(this[_0x59838d(0x329)]())this[_0x59838d(0x298)]();this[_0x59838d(0x1fb)]();},VisuMZ[_0x1cd296(0x2b3)]['Game_Battler_regenerateAll']=Game_Battler['prototype'][_0x1cd296(0x2b1)],Game_Battler['prototype'][_0x1cd296(0x2b1)]=function(){const _0xbce975=_0x1cd296;VisuMZ[_0xbce975(0x2b3)][_0xbce975(0x1a9)]['call'](this);if(this['isActor']()&&$gameParty[_0xbce975(0x2d9)]())this['updateBattlePartySwitchCooldown']();},VisuMZ[_0x1cd296(0x2b3)]['Game_Actor_setup']=Game_Actor['prototype']['setup'],Game_Actor[_0x1cd296(0x203)][_0x1cd296(0x2fa)]=function(_0x26a6ef){const _0x2c31f2=_0x1cd296;VisuMZ[_0x2c31f2(0x2b3)]['Game_Actor_setup'][_0x2c31f2(0x2ae)](this,_0x26a6ef),this['initPartySystem'](),this[_0x2c31f2(0x298)]();},Game_Actor[_0x1cd296(0x203)][_0x1cd296(0x280)]=function(){const _0x4b8ad4=_0x1cd296;this[_0x4b8ad4(0x1a1)]=![],this[_0x4b8ad4(0x272)]=![];},Game_Actor['prototype'][_0x1cd296(0x24a)]=function(){const _0x29bc61=_0x1cd296;if(this[_0x29bc61(0x1a1)]===undefined)this[_0x29bc61(0x280)]();return!this[_0x29bc61(0x1a1)];},Game_Actor[_0x1cd296(0x203)]['setPartyLock']=function(_0x45d59a){const _0x2ece2d=_0x1cd296;if(this[_0x2ece2d(0x1a1)]===undefined)this[_0x2ece2d(0x280)]();this[_0x2ece2d(0x1a1)]=_0x45d59a;},Game_Actor['prototype'][_0x1cd296(0x35c)]=function(){const _0x19bf39=_0x1cd296;if(this[_0x19bf39(0x272)]===undefined)this[_0x19bf39(0x280)]();return this[_0x19bf39(0x272)];},Game_Actor[_0x1cd296(0x203)]['setPartyRequirement']=function(_0x336807){const _0x4ea34c=_0x1cd296;if(this[_0x4ea34c(0x272)]===undefined)this['initPartySystem']();this[_0x4ea34c(0x272)]=_0x336807;},Game_Actor[_0x1cd296(0x203)][_0x1cd296(0x298)]=function(){this['_partySwitchBattleCommandCooldown']=0x0;},Game_Actor[_0x1cd296(0x203)]['canSwitchPartyInBattle']=function(){const _0x4909f9=_0x1cd296;if(this[_0x4909f9(0x226)]===undefined)this['clearPartySwitchCommandCooldown']();if(!this[_0x4909f9(0x24a)]())return![];if(this[_0x4909f9(0x35c)]())return![];return this[_0x4909f9(0x226)]<=0x0;},Game_Actor['prototype'][_0x1cd296(0x23c)]=function(){const _0x56ced3=_0x1cd296;if(this[_0x56ced3(0x226)]===undefined)this[_0x56ced3(0x298)]();return this[_0x56ced3(0x226)];},Game_Actor['prototype'][_0x1cd296(0x17c)]=function(_0x323c6a){const _0x35aaa3=_0x1cd296;if(this[_0x35aaa3(0x226)]===undefined)this[_0x35aaa3(0x298)]();this[_0x35aaa3(0x226)]=_0x323c6a||0x0;},Game_Actor[_0x1cd296(0x203)][_0x1cd296(0x18f)]=function(){const _0x1a5048=_0x1cd296;if(this[_0x1a5048(0x226)]===undefined)this['clearPartySwitchCommandCooldown']();const _0x3fd1b6=VisuMZ['PartySystem'][_0x1a5048(0x22a)][_0x1a5048(0x2fc)]['ActorCmdCooldown'];this['setBattlePartySwitchCooldown'](_0x3fd1b6);},Game_Actor[_0x1cd296(0x203)][_0x1cd296(0x2ec)]=function(){const _0x1441f0=_0x1cd296;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x1441f0(0x298)]();this[_0x1441f0(0x226)]--;},Game_Actor[_0x1cd296(0x203)]['onBattlePartySwitch']=function(_0x549464){const _0x495fb5=_0x1cd296;Imported[_0x495fb5(0x357)]&&BattleManager[_0x495fb5(0x334)]()&&BattleManager[_0x495fb5(0x1ae)]();Imported[_0x495fb5(0x266)]&&BattleManager[_0x495fb5(0x340)]()&&(BattleManager[_0x495fb5(0x166)](),BattleManager[_0x495fb5(0x23e)]=this,BattleManager[_0x495fb5(0x21c)]=this);if(Imported[_0x495fb5(0x2be)]&&BattleManager[_0x495fb5(0x1ba)]()){BattleManager[_0x495fb5(0x23e)]=undefined,BattleManager['_currentActor']=this;const _0x43c03b=BattleManager[_0x495fb5(0x32c)][_0x495fb5(0x2dd)](_0x549464);BattleManager[_0x495fb5(0x32c)][_0x43c03b]=this,BattleManager[_0x495fb5(0x16a)]();}Imported[_0x495fb5(0x30b)]&&BattleManager['isFTB']()&&(BattleManager[_0x495fb5(0x23e)]=this,BattleManager['_currentActor']=this,BattleManager['replaceActionBattlersPartySwitch'](_0x549464,this));Imported[_0x495fb5(0x1ab)]&&BattleManager[_0x495fb5(0x1bf)]()&&(BattleManager[_0x495fb5(0x23e)]=this,BattleManager['_currentActor']=this,BattleManager['replaceActionBattlersPartySwitch'](_0x549464,this));Imported[_0x495fb5(0x2e8)]&&BattleManager['isPTB']()&&(BattleManager[_0x495fb5(0x23e)]=this,BattleManager[_0x495fb5(0x21c)]=this,BattleManager[_0x495fb5(0x358)](_0x549464,this));if(Imported[_0x495fb5(0x1ac)]&&BattleManager[_0x495fb5(0x29e)]()){BattleManager[_0x495fb5(0x23e)]=this,BattleManager[_0x495fb5(0x21c)]=this;for(let _0x3b6e4=0x0;_0x3b6e4<BattleManager[_0x495fb5(0x32c)][_0x495fb5(0x2e0)];_0x3b6e4++){const _0x52cd2d=BattleManager['_actionBattlers'][_0x3b6e4];_0x52cd2d===_0x549464&&(BattleManager[_0x495fb5(0x32c)][_0x3b6e4]=this);}for(let _0x5ce9ea=0x0;_0x5ce9ea<BattleManager[_0x495fb5(0x16b)][_0x495fb5(0x2e0)];_0x5ce9ea++){const _0x2f561e=BattleManager[_0x495fb5(0x16b)][_0x5ce9ea];_0x2f561e===_0x549464&&(BattleManager['_otb_actionBattlersNext'][_0x5ce9ea]=this);}}if(Imported[_0x495fb5(0x2ad)]&&BattleManager['isUsingGridSystem']()){const _0xb88018=_0x549464[_0x495fb5(0x271)](),_0x23d20c=_0x549464['gridFlank']();this['gridMoveTo'](_0xb88018,_0x23d20c);}},BattleManager[_0x1cd296(0x358)]=function(_0x1909db,_0x353697){const _0x1d2f08=_0x1cd296;this[_0x1d2f08(0x32c)]=this[_0x1d2f08(0x32c)][_0x1d2f08(0x30f)](_0x583114=>_0x583114===_0x1909db?_0x353697:_0x583114);},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x317)]=Game_Unit[_0x1cd296(0x203)]['inBattle'],Game_Unit[_0x1cd296(0x203)]['inBattle']=function(){const _0x92fef4=_0x1cd296;if(SceneManager[_0x92fef4(0x315)]())return![];return VisuMZ[_0x92fef4(0x2b3)][_0x92fef4(0x317)]['call'](this);},Game_Party[_0x1cd296(0x306)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)]['General'][_0x1cd296(0x28e)],VisuMZ['PartySystem'][_0x1cd296(0x233)]=Game_Party['prototype'][_0x1cd296(0x1dd)],Game_Party[_0x1cd296(0x203)]['initialize']=function(){const _0x29050e=_0x1cd296;VisuMZ['PartySystem'][_0x29050e(0x233)][_0x29050e(0x2ae)](this),this[_0x29050e(0x1f6)](),this[_0x29050e(0x32d)](),this[_0x29050e(0x261)]();},Game_Party[_0x1cd296(0x203)]['clearPartyBattleCommandCooldown']=function(){const _0xec5f68=_0x1cd296;this[_0xec5f68(0x1ea)]=0x0;},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x25e)]=function(){const _0x145058=_0x1cd296;if(this[_0x145058(0x1ea)]===undefined)this[_0x145058(0x1f6)]();return this[_0x145058(0x1ea)]<=0x0;},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x23c)]=function(){const _0x1a5034=_0x1cd296;if(this[_0x1a5034(0x1ea)]===undefined)this[_0x1a5034(0x1f6)]();return this['_partySystemBattleCommandCooldown'];},Game_Party['prototype'][_0x1cd296(0x17c)]=function(_0x16c1dd){const _0x23e072=_0x1cd296;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x23e072(0x1f6)]();this[_0x23e072(0x1ea)]=_0x16c1dd;},Game_Party['prototype']['applyBattlePartySwitchCooldown']=function(){const _0x2aac61=_0x1cd296;if(this[_0x2aac61(0x1ea)]===undefined)this[_0x2aac61(0x1f6)]();this[_0x2aac61(0x1ea)]=VisuMZ['PartySystem'][_0x2aac61(0x22a)][_0x2aac61(0x2fc)][_0x2aac61(0x15c)]||0x0;},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x2ec)]=function(){const _0x212f9f=_0x1cd296;if(this[_0x212f9f(0x1ea)]===undefined)this[_0x212f9f(0x1f6)]();this[_0x212f9f(0x1ea)]--;},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x32d)]=function(){const _0x90c5a8=_0x1cd296;this[_0x90c5a8(0x1c2)]=0x0;},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x159)]=function(_0x1bed85){const _0x1d6208=_0x1cd296;this[_0x1d6208(0x1c2)]=_0x1bed85,this['initBattleMembers'](!![]),$gamePlayer&&$gamePlayer[_0x1d6208(0x263)]()&&$gamePlayer['followers']()[_0x1d6208(0x159)]();},Game_Followers[_0x1cd296(0x203)][_0x1cd296(0x159)]=function(){const _0x2ad944=_0x1cd296;if(!SceneManager[_0x2ad944(0x1e8)]())return;this[_0x2ad944(0x2fa)]();const _0x492168=$gameMap[_0x2ad944(0x30a)](),_0x1158e3=$gamePlayer['x'],_0x571f8a=$gamePlayer['y'],_0xa7eef=$gamePlayer['direction']();$gameTemp[_0x2ad944(0x2a7)]=!![],$gamePlayer[_0x2ad944(0x234)](_0x492168,_0x1158e3,_0x571f8a,_0xa7eef,0x2),setTimeout(this['clearBypassAutoSave']['bind'](this),0x7d0);},Game_Followers['prototype'][_0x1cd296(0x269)]=function(){$gameTemp['_bypassAutoSavePartySystem']=![];},VisuMZ['PartySystem']['Scene_Base_isAutosaveEnabled']=Scene_Base[_0x1cd296(0x203)][_0x1cd296(0x1f7)],Scene_Base['prototype'][_0x1cd296(0x1f7)]=function(){const _0x35b2d1=_0x1cd296;if($gameTemp[_0x35b2d1(0x2a7)])return![];return VisuMZ['PartySystem'][_0x35b2d1(0x175)][_0x35b2d1(0x2ae)](this);},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x249)]=function(){const _0x51f90f=_0x1cd296;if(this[_0x51f90f(0x1c2)]===undefined)this['initBattleMembers']();let _0x5d015a=this[_0x51f90f(0x1c2)]||Game_Party['defaultMaxBattleMembers'];return Imported[_0x51f90f(0x2ad)]&&BattleManager[_0x51f90f(0x24f)]()&&(_0x5d015a=_0x5d015a[_0x51f90f(0x1d2)](0x1,0x14)),_0x5d015a;},Game_Party[_0x1cd296(0x203)]['checkInitBattleMembers']=function(){const _0x2f3ece=_0x1cd296;if(this[_0x2f3ece(0x1c2)]===undefined)this[_0x2f3ece(0x261)]();if(!this[_0x2f3ece(0x246)])this[_0x2f3ece(0x261)]();while(this[_0x2f3ece(0x246)][_0x2f3ece(0x2e0)]<this[_0x2f3ece(0x1c2)]){this[_0x2f3ece(0x246)][_0x2f3ece(0x178)](0x0);}},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x261)]=function(_0x2cf1a5){const _0x5bc763=_0x1cd296;!_0x2cf1a5&&(this[_0x5bc763(0x1c2)]=Game_Party[_0x5bc763(0x306)]);this[_0x5bc763(0x246)]=this[_0x5bc763(0x18c)][_0x5bc763(0x2c2)](0x0,this[_0x5bc763(0x1c2)]);while(this[_0x5bc763(0x246)]['length']<this[_0x5bc763(0x1c2)]){this[_0x5bc763(0x246)][_0x5bc763(0x178)](0x0);}},Game_Party[_0x1cd296(0x203)]['battleMembers']=function(){const _0x19c2f2=_0x1cd296;if(Imported[_0x19c2f2(0x2ad)]&&SceneManager[_0x19c2f2(0x1a8)]())return this[_0x19c2f2(0x202)](!![]);return this[_0x19c2f2(0x202)]()[_0x19c2f2(0x328)](_0x6cbab=>!!_0x6cbab);},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x202)]=function(_0x3abe15){const _0x3a89ee=_0x1cd296;this[_0x3a89ee(0x2af)]();const _0x3ab81e=this[_0x3a89ee(0x246)][_0x3a89ee(0x30f)](_0x272341=>$gameActors[_0x3a89ee(0x1d7)](_0x272341));if(_0x3abe15)return _0x3ab81e;return SceneManager[_0x3a89ee(0x315)]()?_0x3ab81e:_0x3ab81e[_0x3a89ee(0x328)](_0x3bfefb=>_0x3bfefb&&_0x3bfefb[_0x3a89ee(0x1c7)]());},Game_Party['prototype']['reserveMembers']=function(){const _0x50a9be=_0x1cd296,_0x3ff442=this[_0x50a9be(0x2ac)]();return this[_0x50a9be(0x229)]()[_0x50a9be(0x328)](_0x46378f=>!_0x3ff442[_0x50a9be(0x240)](_0x46378f));},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x197)]=Game_Party[_0x1cd296(0x203)][_0x1cd296(0x34e)],Game_Party[_0x1cd296(0x203)][_0x1cd296(0x34e)]=function(){const _0x36494a=_0x1cd296;VisuMZ[_0x36494a(0x2b3)][_0x36494a(0x197)][_0x36494a(0x2ae)](this),this[_0x36494a(0x261)]();},VisuMZ['PartySystem']['Game_Party_setupBattleTest']=Game_Party[_0x1cd296(0x203)]['setupBattleTest'],Game_Party[_0x1cd296(0x203)][_0x1cd296(0x21d)]=function(){const _0x1647f2=_0x1cd296;VisuMZ['PartySystem'][_0x1647f2(0x167)][_0x1647f2(0x2ae)](this),this[_0x1647f2(0x2a8)]();},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x18e)]=function(){const _0x40083d=_0x1cd296;this[_0x40083d(0x1c2)]=Game_Party[_0x40083d(0x306)],this[_0x40083d(0x246)]=[],this['_actors']=[];for(const _0x313d6c of $dataSystem[_0x40083d(0x367)]){const _0x55f243=$gameActors['actor'](_0x313d6c['actorId']);if(!_0x55f243)continue;_0x55f243[_0x40083d(0x154)](_0x313d6c['level'],![]),_0x55f243[_0x40083d(0x210)](_0x313d6c[_0x40083d(0x305)]),_0x55f243['recoverAll'](),this[_0x40083d(0x246)][_0x40083d(0x178)](_0x313d6c[_0x40083d(0x288)]),this[_0x40083d(0x18c)]['push'](_0x313d6c[_0x40083d(0x288)]);}this[_0x40083d(0x246)][_0x40083d(0x276)](0x0);while(this[_0x40083d(0x246)]['length']<this['_battleMaxSize']){this[_0x40083d(0x246)][_0x40083d(0x178)](0x0);}while(this[_0x40083d(0x246)][_0x40083d(0x2e0)]>this[_0x40083d(0x249)]()){this[_0x40083d(0x246)][_0x40083d(0x238)]();}if($gamePlayer)$gamePlayer[_0x40083d(0x287)]();},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x2a8)]=function(){const _0x1fc3f2=_0x1cd296,_0x5f2fc6=this[_0x1fc3f2(0x2ac)]();for(let _0x42a6ff=0x1;_0x42a6ff<$dataActors[_0x1fc3f2(0x2e0)];_0x42a6ff++){const _0x3e9d81=$gameActors[_0x1fc3f2(0x1d7)](_0x42a6ff);if(!_0x3e9d81)continue;if(_0x3e9d81[_0x1fc3f2(0x361)]()[_0x1fc3f2(0x2e0)]<=0x0)continue;if(_0x3e9d81[_0x1fc3f2(0x361)]()[_0x1fc3f2(0x186)](/-----/i))continue;if(_0x5f2fc6[_0x1fc3f2(0x240)](_0x3e9d81))continue;this[_0x1fc3f2(0x18c)]['push'](_0x3e9d81[_0x1fc3f2(0x288)]());}},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x2c6)]=Game_Party[_0x1cd296(0x203)][_0x1cd296(0x331)],Game_Party['prototype']['addActor']=function(_0x3542d2){const _0x5a0fc0=_0x1cd296;VisuMZ[_0x5a0fc0(0x2b3)][_0x5a0fc0(0x2c6)][_0x5a0fc0(0x2ae)](this,_0x3542d2),this['addActorToBattleMembers'](_0x3542d2),SceneManager[_0x5a0fc0(0x2e1)]()&&(Imported[_0x5a0fc0(0x1ac)]&&BattleManager['isOTB']()&&(BattleManager[_0x5a0fc0(0x268)](),BattleManager['otbReturnBattlerToTurnOrders']($gameActors['actor'](_0x3542d2))));},Game_Party['prototype'][_0x1cd296(0x34a)]=function(_0x2cc2f5){const _0x573aeb=_0x1cd296;this['checkInitBattleMembers']();if(this[_0x573aeb(0x246)]['includes'](_0x2cc2f5))return;if(!this[_0x573aeb(0x18c)][_0x573aeb(0x240)](_0x2cc2f5))return;if(!this[_0x573aeb(0x246)][_0x573aeb(0x240)](0x0))return;const _0x3143c5=$gameActors[_0x573aeb(0x1d7)](_0x2cc2f5);if(!_0x3143c5)return;const _0x5ab6d0=this[_0x573aeb(0x246)]['indexOf'](0x0);if(_0x5ab6d0<0x0)return;this[_0x573aeb(0x246)][_0x5ab6d0]=_0x2cc2f5,SceneManager['isSceneBattle']()&&(_0x3143c5[_0x573aeb(0x1c1)](),_0x3143c5['makeActions']()),this[_0x573aeb(0x1a3)]();},Game_Party['prototype']['addActorToBattleMembersAtIndex']=function(_0x4f8448,_0x534f7f){const _0x5aef90=_0x1cd296;this[_0x5aef90(0x2af)]();if(this[_0x5aef90(0x246)]['includes'](_0x4f8448))return;if(!this[_0x5aef90(0x246)][_0x5aef90(0x240)](0x0))return;const _0x44c17c=$gameActors[_0x5aef90(0x1d7)](_0x4f8448);if(!_0x44c17c)return;this['_battleMembers'][_0x534f7f]=_0x4f8448,_0x44c17c['makeActions'](),this['partyChangeRefresh'](),SceneManager['isPreviousScene'](Scene_Battle)&&BattleManager[_0x5aef90(0x2d1)]()&&(_0x44c17c['initTpbChargeTime'](),_0x44c17c[_0x5aef90(0x1bb)]=_0x5aef90(0x322),_0x44c17c[_0x5aef90(0x320)]=_0x5aef90(0x177),_0x44c17c[_0x5aef90(0x2d3)]=0x0);},VisuMZ[_0x1cd296(0x2b3)]['Game_Party_removeActor']=Game_Party[_0x1cd296(0x203)][_0x1cd296(0x354)],Game_Party['prototype']['removeActor']=function(_0x2ee743){const _0x2c1784=_0x1cd296;this[_0x2c1784(0x274)](_0x2ee743),VisuMZ[_0x2c1784(0x2b3)][_0x2c1784(0x2dc)][_0x2c1784(0x2ae)](this,_0x2ee743);},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x274)]=function(_0x7c627b){const _0x546ab6=_0x1cd296;this['checkInitBattleMembers']();if(!this[_0x546ab6(0x246)][_0x546ab6(0x240)](_0x7c627b))return;if(_0x7c627b<=0x0)return;const _0x3584b9=this[_0x546ab6(0x246)][_0x546ab6(0x2dd)](_0x7c627b);this[_0x546ab6(0x246)][_0x3584b9]=0x0,this[_0x546ab6(0x18c)]['remove'](_0x7c627b),this[_0x546ab6(0x18c)]['push'](_0x7c627b),this[_0x546ab6(0x1a3)]();},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x1a3)]=function(){const _0x31689d=_0x1cd296;this[_0x31689d(0x22b)](),$gamePlayer[_0x31689d(0x287)](),$gameMap[_0x31689d(0x185)]();},Game_Party['prototype'][_0x1cd296(0x22b)]=function(){const _0x495bfa=_0x1cd296;this[_0x495bfa(0x2af)]();const _0x3f807c=this[_0x495bfa(0x2ac)]()[_0x495bfa(0x2e7)](this[_0x495bfa(0x1d4)]());this['_actors']=_0x3f807c[_0x495bfa(0x30f)](_0x3e9074=>_0x3e9074?_0x3e9074[_0x495bfa(0x288)]():0x0)[_0x495bfa(0x276)](0x0);},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x22c)]=function(){const _0x460ccf=_0x1cd296;this['_actors'][_0x460ccf(0x1b1)]((_0x56c6e1,_0x3ddf94)=>_0x56c6e1-_0x3ddf94),this[_0x460ccf(0x22b)](),this[_0x460ccf(0x1a3)]();},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x17a)]=function(){const _0x1c5863=_0x1cd296;for(const _0x49634d of this[_0x1c5863(0x1d4)]()){if(!_0x49634d)continue;if(_0x49634d['isRequiredInParty']())return!![];}return![];},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x253)]=Game_Party['prototype']['swapOrder'],Game_Party[_0x1cd296(0x203)]['swapOrder']=function(_0x3f23fc,_0x539943){const _0x2b218d=_0x1cd296,_0x5b0b8f=this[_0x2b218d(0x2ac)]()['remove'](null)['remove'](undefined)[_0x2b218d(0x2e0)];VisuMZ[_0x2b218d(0x2b3)][_0x2b218d(0x253)][_0x2b218d(0x2ae)](this,_0x3f23fc,_0x539943),this[_0x2b218d(0x28f)](_0x3f23fc,_0x539943,_0x5b0b8f);},Game_Party['prototype'][_0x1cd296(0x28f)]=function(_0x3d7589,_0x26876c,_0x5ddce8){const _0x507950=_0x1cd296;this[_0x507950(0x246)]=[];for(let _0x1ecf56=0x0;_0x1ecf56<this[_0x507950(0x18c)]['length'];_0x1ecf56++){if(this[_0x507950(0x246)][_0x507950(0x2e0)]>=this[_0x507950(0x249)]())break;if(SceneManager[_0x507950(0x292)][_0x507950(0x2b2)]&&SceneManager['_scene']['allowEarlySwapOrderBreak']()){if(this[_0x507950(0x246)]['length']>=_0x5ddce8)break;}this['_battleMembers'][_0x1ecf56]=this[_0x507950(0x18c)][_0x1ecf56];}$gamePlayer[_0x507950(0x287)]();},Scene_MenuBase[_0x1cd296(0x203)]['allowEarlySwapOrderBreak']=function(){const _0x4a7505=_0x1cd296;if(this[_0x4a7505(0x201)][_0x4a7505(0x361)]===_0x4a7505(0x151))return!![];return![];},Game_Party['prototype'][_0x1cd296(0x200)]=function(_0x3dddec){const _0x3bf930=_0x1cd296;if(this[_0x3bf930(0x2d9)]())return;if(!_0x3dddec)return;if(_0x3dddec['length']<=0x0)return;this[_0x3bf930(0x2b6)]=_0x3dddec[_0x3bf930(0x27d)](),this[_0x3bf930(0x2b6)]=this[_0x3bf930(0x2b6)][_0x3bf930(0x328)](_0x1d1bea=>!!$gameActors[_0x3bf930(0x1d7)](_0x1d1bea));while(this[_0x3bf930(0x2b6)][_0x3bf930(0x2e0)]>this['maxBattleMembers']()){this[_0x3bf930(0x2b6)][_0x3bf930(0x238)]();}$gamePlayer[_0x3bf930(0x287)](),$gameMap[_0x3bf930(0x185)]();},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x18d)]=function(){const _0x4c71dc=_0x1cd296;if(this['inBattle']())return;this[_0x4c71dc(0x2b6)]=undefined,$gamePlayer['refresh'](),$gameMap[_0x4c71dc(0x185)]();},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x2a3)]=Game_Party[_0x1cd296(0x203)][_0x1cd296(0x229)],Game_Party[_0x1cd296(0x203)][_0x1cd296(0x229)]=function(){const _0x547b22=_0x1cd296;if(this['_forcedPartyActors']!==undefined)return this[_0x547b22(0x2b6)]['map'](_0x447644=>$gameActors[_0x547b22(0x1d7)](_0x447644));return VisuMZ['PartySystem']['Game_Party_allMembers_FP'][_0x547b22(0x2ae)](this);},VisuMZ[_0x1cd296(0x2b3)]['Game_Party_rawBattleMembers_FP']=Game_Party[_0x1cd296(0x203)][_0x1cd296(0x202)],Game_Party[_0x1cd296(0x203)][_0x1cd296(0x202)]=function(_0xee33c9){const _0x22e94c=_0x1cd296;if(this[_0x22e94c(0x2b6)]!==undefined)return this[_0x22e94c(0x2b6)][_0x22e94c(0x30f)](_0x4d0595=>$gameActors[_0x22e94c(0x1d7)](_0x4d0595));return VisuMZ['PartySystem']['Game_Party_rawBattleMembers_FP'][_0x22e94c(0x2ae)](this,_0xee33c9);},VisuMZ[_0x1cd296(0x2b3)]['Game_Party_reserveMembers_FP']=Game_Party['prototype'][_0x1cd296(0x1d4)],Game_Party[_0x1cd296(0x203)][_0x1cd296(0x1d4)]=function(){const _0x5f4c11=_0x1cd296;if(this['_forcedPartyActors']!==undefined)return[];return VisuMZ[_0x5f4c11(0x2b3)]['Game_Party_reserveMembers_FP'][_0x5f4c11(0x2ae)](this);},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x1f3)]=Game_System['prototype'][_0x1cd296(0x363)],Game_System[_0x1cd296(0x203)][_0x1cd296(0x363)]=function(){const _0x3bcfcf=_0x1cd296;if($gameParty[_0x3bcfcf(0x2b6)]!==undefined)return![];if($gameParty[_0x3bcfcf(0x24c)]!==undefined)return![];return VisuMZ['PartySystem']['Game_System_isFormationEnabled_FP'][_0x3bcfcf(0x2ae)](this);},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x221)]=Game_Actor[_0x1cd296(0x203)][_0x1cd296(0x25e)],Game_Actor[_0x1cd296(0x203)]['canSwitchPartyInBattle']=function(){const _0x5efd3b=_0x1cd296;if($gameParty[_0x5efd3b(0x2b6)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x5efd3b(0x2b3)]['Game_Actor_canSwitchPartyInBattle_FP'][_0x5efd3b(0x2ae)](this);},VisuMZ[_0x1cd296(0x2b3)]['Game_Party_canSwitchPartyInBattle_FP']=Game_Party['prototype']['canSwitchPartyInBattle'],Game_Party[_0x1cd296(0x203)]['canSwitchPartyInBattle']=function(){const _0x448ae7=_0x1cd296;if($gameParty[_0x448ae7(0x2b6)]!==undefined)return![];if($gameParty['_forcedBattleGridTactics']!==undefined)return![];return VisuMZ[_0x448ae7(0x2b3)][_0x448ae7(0x20d)][_0x448ae7(0x2ae)](this);},VisuMZ[_0x1cd296(0x2b3)]['Game_Troop_increaseTurn']=Game_Troop[_0x1cd296(0x203)][_0x1cd296(0x242)],Game_Troop[_0x1cd296(0x203)][_0x1cd296(0x242)]=function(){const _0x4fdf02=_0x1cd296;VisuMZ[_0x4fdf02(0x2b3)][_0x4fdf02(0x2a2)]['call'](this),$gameParty[_0x4fdf02(0x2ec)]();},Game_Troop[_0x1cd296(0x203)]['partyChangeRefresh']=function(){const _0xe6cf0b=_0x1cd296;if(Imported[_0xe6cf0b(0x344)])for(const _0xdfddb9 of this[_0xe6cf0b(0x299)]()){_0xdfddb9[_0xe6cf0b(0x287)]();}},Scene_Menu[_0x1cd296(0x203)][_0x1cd296(0x19f)]=function(){const _0x2f9f46=_0x1cd296;SceneManager[_0x2f9f46(0x178)](Scene_Party);};function Scene_Party(){const _0x5d29a5=_0x1cd296;this[_0x5d29a5(0x1dd)](...arguments);}Scene_Party['prototype']=Object[_0x1cd296(0x16d)](Scene_MenuBase[_0x1cd296(0x203)]),Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x201)]=Scene_Party,Scene_Party['prototype'][_0x1cd296(0x1dd)]=function(){const _0x2643c8=_0x1cd296;this[_0x2643c8(0x165)](),Scene_MenuBase[_0x2643c8(0x203)][_0x2643c8(0x1dd)][_0x2643c8(0x2ae)](this);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x337)]=function(){const _0x1828d2=_0x1cd296;if(ConfigManager[_0x1828d2(0x1f9)]&&ConfigManager[_0x1828d2(0x199)]!==undefined)return ConfigManager[_0x1828d2(0x199)];else return ConfigManager['uiMenuStyle']===![]?![]:Scene_MenuBase[_0x1828d2(0x203)][_0x1828d2(0x337)][_0x1828d2(0x2ae)](this);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x15f)]=function(){return 0x0;},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x153)]=function(){return!![];},Scene_Party['prototype']['createPageButtons']=function(){const _0x7b35f6=_0x1cd296;Scene_MenuBase[_0x7b35f6(0x203)][_0x7b35f6(0x2ee)]['call'](this),this[_0x7b35f6(0x32e)]['_clickHandler']=undefined,this[_0x7b35f6(0x25c)][_0x7b35f6(0x2d7)]=undefined;},Scene_Party['prototype']['loadPartyImages']=function(){const _0x55a0ca=_0x1cd296;for(const _0x599c27 of $gameParty[_0x55a0ca(0x299)]()){ImageManager[_0x55a0ca(0x245)](_0x599c27[_0x55a0ca(0x26c)]()),ImageManager[_0x55a0ca(0x2b8)](_0x599c27[_0x55a0ca(0x2e2)]()),ImageManager[_0x55a0ca(0x1b9)](_0x599c27[_0x55a0ca(0x1b2)]());}},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x16d)]=function(){const _0x134b58=_0x1cd296;Scene_MenuBase[_0x134b58(0x203)][_0x134b58(0x16d)][_0x134b58(0x2ae)](this),this[_0x134b58(0x2d8)](),this[_0x134b58(0x308)](),this[_0x134b58(0x208)](),this[_0x134b58(0x1e5)](),this[_0x134b58(0x321)](),this['createStatusWindow']();},Scene_Party['prototype'][_0x1cd296(0x2d8)]=function(){const _0x321180=_0x1cd296,_0x96fce9=this[_0x321180(0x284)]();this['_activePartyLabel']=new Window_PartyLabel(_0x96fce9,TextManager[_0x321180(0x34c)]),this['_activePartyLabel'][_0x321180(0x31b)](VisuMZ[_0x321180(0x2b3)]['Settings'][_0x321180(0x15a)][_0x321180(0x324)]),this[_0x321180(0x352)](this[_0x321180(0x20f)]);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x284)]=function(){const _0x1f653b=_0x1cd296;return VisuMZ[_0x1f653b(0x2b3)][_0x1f653b(0x22a)]['Window'][_0x1f653b(0x2ce)][_0x1f653b(0x2ae)](this);},Scene_Party[_0x1cd296(0x203)]['createActivePartyWindow']=function(){const _0x666d6=_0x1cd296,_0x5887ca=this[_0x666d6(0x1e2)]();this[_0x666d6(0x2f8)]=new Window_PartyActive(_0x5887ca),this[_0x666d6(0x2f8)][_0x666d6(0x31b)](VisuMZ['PartySystem'][_0x666d6(0x22a)]['Window']['ActivePartyWindowBgType']),this[_0x666d6(0x2f8)][_0x666d6(0x1df)]('ok',this[_0x666d6(0x254)][_0x666d6(0x2c9)](this)),this[_0x666d6(0x2f8)][_0x666d6(0x1df)](_0x666d6(0x345),this[_0x666d6(0x190)][_0x666d6(0x2c9)](this)),this[_0x666d6(0x352)](this['_activePartyWindow']);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x1e2)]=function(){const _0x58514b=_0x1cd296;return VisuMZ['PartySystem'][_0x58514b(0x22a)][_0x58514b(0x15a)][_0x58514b(0x1dc)][_0x58514b(0x2ae)](this);},Scene_Party['prototype'][_0x1cd296(0x254)]=function(){const _0x23167b=_0x1cd296;this['_reservePartyWindow'][_0x23167b(0x169)](),this[_0x23167b(0x19b)][_0x23167b(0x2f2)]();},Scene_Party['prototype']['createReservePartyLabel']=function(){const _0x19f653=_0x1cd296,_0x128d0f=this[_0x19f653(0x2d2)]();this[_0x19f653(0x2c3)]=new Window_PartyLabel(_0x128d0f,TextManager[_0x19f653(0x1f0)]),this[_0x19f653(0x2c3)]['setBackgroundType'](VisuMZ['PartySystem'][_0x19f653(0x22a)]['Window'][_0x19f653(0x1b3)]),this[_0x19f653(0x352)](this[_0x19f653(0x2c3)]);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x2d2)]=function(){const _0xf93092=_0x1cd296;return VisuMZ[_0xf93092(0x2b3)][_0xf93092(0x22a)][_0xf93092(0x15a)][_0xf93092(0x173)][_0xf93092(0x2ae)](this);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x1e5)]=function(){const _0x402325=_0x1cd296,_0x33d4d8=this[_0x402325(0x19c)]();this[_0x402325(0x19b)]=new Window_PartyReserve(_0x33d4d8),this[_0x402325(0x19b)]['setBackgroundType'](VisuMZ[_0x402325(0x2b3)][_0x402325(0x22a)]['Window'][_0x402325(0x196)]),this['_reservePartyWindow'][_0x402325(0x1df)]('ok',this['onReserveOk']['bind'](this)),this[_0x402325(0x19b)][_0x402325(0x1df)]('cancel',this[_0x402325(0x285)][_0x402325(0x2c9)](this)),this[_0x402325(0x352)](this[_0x402325(0x19b)]);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x19c)]=function(){const _0x393cab=_0x1cd296;return VisuMZ[_0x393cab(0x2b3)]['Settings']['Window']['ReservePartyWindowRect']['call'](this);},Scene_Party[_0x1cd296(0x203)]['onReserveOk']=function(){const _0x1a81a9=_0x1cd296,_0x54ef84=this[_0x1a81a9(0x19b)][_0x1a81a9(0x14f)](),_0x5e742b=this[_0x1a81a9(0x2f8)]['currentActor']();if(_0x54ef84<0x0){if(_0x5e742b)$gameParty['removeActorFromBattleMembers'](_0x5e742b[_0x1a81a9(0x288)]());}else{const _0xfcd578=this[_0x1a81a9(0x19b)][_0x1a81a9(0x295)]()[_0x1a81a9(0x288)](),_0x3cb497=this[_0x1a81a9(0x2f8)][_0x1a81a9(0x2ea)]();if(_0x5e742b)$gameParty[_0x1a81a9(0x274)](_0x5e742b[_0x1a81a9(0x288)]());$gameParty['addActorToBattleMembersAtIndex'](_0xfcd578,_0x3cb497);}this[_0x1a81a9(0x2ff)](),this[_0x1a81a9(0x285)]();},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x2ff)]=function(){const _0x1288d1=_0x1cd296;this['_activePartyWindow'][_0x1288d1(0x287)](),this[_0x1288d1(0x19b)]['refresh']();},Scene_Party[_0x1cd296(0x203)]['onReserveCancel']=function(){const _0xb5766c=_0x1cd296;this[_0xb5766c(0x19b)]['deactivate'](),this[_0xb5766c(0x19b)][_0xb5766c(0x1f1)](),this[_0xb5766c(0x2f8)]['activate']();},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x321)]=function(){const _0x21ea89=_0x1cd296,_0x218846=this[_0x21ea89(0x1ff)]();this[_0x21ea89(0x174)]=new Window_PartyLabel(_0x218846,TextManager[_0x21ea89(0x1c8)]),this[_0x21ea89(0x174)][_0x21ea89(0x31b)](VisuMZ[_0x21ea89(0x2b3)][_0x21ea89(0x22a)][_0x21ea89(0x15a)][_0x21ea89(0x260)]),this[_0x21ea89(0x352)](this['_statusPartyLabel']);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x1ff)]=function(){const _0x2b0973=_0x1cd296;return VisuMZ[_0x2b0973(0x2b3)][_0x2b0973(0x22a)]['Window'][_0x2b0973(0x14e)][_0x2b0973(0x2ae)](this);},Scene_Party[_0x1cd296(0x203)]['createStatusWindow']=function(){const _0x34377e=_0x1cd296,_0xf13167=this[_0x34377e(0x2f6)]();this[_0x34377e(0x223)]=new Window_PartyStatus(_0xf13167),this[_0x34377e(0x223)]['setBackgroundType'](VisuMZ[_0x34377e(0x2b3)][_0x34377e(0x22a)][_0x34377e(0x15a)][_0x34377e(0x262)]),this['addWindow'](this[_0x34377e(0x223)]),this[_0x34377e(0x19b)][_0x34377e(0x1aa)](this[_0x34377e(0x223)]),this['_activePartyWindow'][_0x34377e(0x1aa)](this[_0x34377e(0x223)]);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x2f6)]=function(){const _0x256856=_0x1cd296;return VisuMZ[_0x256856(0x2b3)][_0x256856(0x22a)][_0x256856(0x15a)]['StatusWindowRect']['call'](this);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x184)]=function(){const _0x2bc42f=_0x1cd296;return TextManager[_0x2bc42f(0x1bc)](_0x2bc42f(0x2e6));},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x351)]=function(){const _0x40d473=_0x1cd296;return TextManager[_0x40d473(0x1ee)];},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x1d1)]=function(){const _0x228993=_0x1cd296,_0x1abb07=this[_0x228993(0x2f8)],_0x3f27dc=this[_0x228993(0x19b)];if(_0x1abb07&&_0x1abb07[_0x228993(0x2f7)]&&_0x1abb07[_0x228993(0x295)]()&&_0x1abb07['isShiftRemoveShortcutEnabled']())return TextManager[_0x228993(0x1a4)];else return _0x3f27dc&&_0x3f27dc[_0x228993(0x2f7)]&&$gameParty[_0x228993(0x1d4)]()[_0x228993(0x2e0)]>0x0?TextManager[_0x228993(0x23a)]:'';},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x14c)]=function(){const _0x28c8c3=_0x1cd296;if(this[_0x28c8c3(0x2f8)]&&this['_activePartyWindow'][_0x28c8c3(0x2f7)])return TextManager['assistSwapOutPartyMember'];else return this[_0x28c8c3(0x19b)]&&this[_0x28c8c3(0x19b)][_0x28c8c3(0x2f7)]?TextManager[_0x28c8c3(0x1b8)]:Scene_MenuBase[_0x28c8c3(0x203)][_0x28c8c3(0x14c)][_0x28c8c3(0x2ae)](this);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x1d6)]=function(){const _0x137953=_0x1cd296;Scene_MenuBase[_0x137953(0x203)][_0x137953(0x1d6)][_0x137953(0x2ae)](this),this[_0x137953(0x235)](this['getBackgroundOpacity']()),this['createCustomBackgroundImages']();},Scene_Party[_0x1cd296(0x203)]['getBackgroundOpacity']=function(){const _0x326aa2=_0x1cd296;return VisuMZ[_0x326aa2(0x2b3)][_0x326aa2(0x22a)][_0x326aa2(0x349)][_0x326aa2(0x1e7)];},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x333)]=function(){const _0x5baad1=_0x1cd296,_0x59a2b0={'BgFilename1':VisuMZ[_0x5baad1(0x2b3)][_0x5baad1(0x22a)][_0x5baad1(0x349)]['BgFilename1'],'BgFilename2':VisuMZ['PartySystem'][_0x5baad1(0x22a)][_0x5baad1(0x349)][_0x5baad1(0x2c1)]};_0x59a2b0&&(_0x59a2b0[_0x5baad1(0x2a5)]!==''||_0x59a2b0[_0x5baad1(0x2c1)]!=='')&&(this[_0x5baad1(0x1f5)]=new Sprite(ImageManager[_0x5baad1(0x15d)](_0x59a2b0[_0x5baad1(0x2a5)])),this['_backSprite2']=new Sprite(ImageManager[_0x5baad1(0x267)](_0x59a2b0[_0x5baad1(0x2c1)])),this[_0x5baad1(0x279)](this[_0x5baad1(0x1f5)]),this[_0x5baad1(0x279)](this[_0x5baad1(0x24d)]),this[_0x5baad1(0x1f5)][_0x5baad1(0x35b)][_0x5baad1(0x2ef)](this['adjustSprite'][_0x5baad1(0x2c9)](this,this[_0x5baad1(0x1f5)])),this[_0x5baad1(0x24d)][_0x5baad1(0x35b)][_0x5baad1(0x2ef)](this['adjustSprite']['bind'](this,this[_0x5baad1(0x24d)])));},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x2c8)]=function(_0x33183d){const _0x2397ed=_0x1cd296;this[_0x2397ed(0x312)](_0x33183d),this[_0x2397ed(0x1f4)](_0x33183d);},Scene_Party[_0x1cd296(0x203)][_0x1cd296(0x239)]=function(){const _0x44d585=_0x1cd296;Scene_MenuBase[_0x44d585(0x203)][_0x44d585(0x239)]['call'](this),$gameParty[_0x44d585(0x1a3)]();},Window_StatusBase[_0x1cd296(0x203)][_0x1cd296(0x222)]=function(_0x42bfe3,_0x358f94,_0x13d2ff,_0x6fcaec){const _0x3abe1a=_0x1cd296;if(!_0x42bfe3)return;_0x6fcaec?this[_0x3abe1a(0x179)](_0x42bfe3,_0x358f94,_0x13d2ff):this[_0x3abe1a(0x1b6)](_0x42bfe3,_0x358f94,_0x13d2ff);},Window_StatusBase[_0x1cd296(0x203)][_0x1cd296(0x1b6)]=function(_0x47d53f,_0x412d9e,_0x142391){const _0x58b92f=_0x1cd296;_0x142391+=Math[_0x58b92f(0x360)]((this[_0x58b92f(0x187)]()-ImageManager[_0x58b92f(0x14d)])/0x2),!_0x47d53f['isFormationChangeOk']()&&(this[_0x58b92f(0x22e)](ImageManager[_0x58b92f(0x1f2)],_0x412d9e,_0x142391),_0x412d9e+=ImageManager['iconWidth']+0x4),_0x47d53f[_0x58b92f(0x35c)]()&&(this[_0x58b92f(0x22e)](ImageManager['requiredPartyMemberIcon'],_0x412d9e,_0x142391),_0x412d9e+=ImageManager[_0x58b92f(0x228)]+0x4);},Window_StatusBase[_0x1cd296(0x203)][_0x1cd296(0x179)]=function(_0x53c92b,_0x3e34b9,_0x546383){const _0x65b1ee=_0x1cd296;let _0x4e220b=0x0;if(!_0x53c92b[_0x65b1ee(0x24a)]())_0x4e220b+=0x1;if(_0x53c92b[_0x65b1ee(0x35c)]())_0x4e220b+=0x1;if(_0x4e220b<=0x1)return this['drawActorPartyIconsHorz'](_0x53c92b,_0x3e34b9,_0x546383);_0x546383+=Math['round']((this[_0x65b1ee(0x187)]()-ImageManager[_0x65b1ee(0x14d)])/0x2),_0x546383-=Math[_0x65b1ee(0x360)](this['lineHeight']()/0x2),this['drawIcon'](ImageManager[_0x65b1ee(0x1f2)],_0x3e34b9,_0x546383),_0x546383+=this['lineHeight'](),this[_0x65b1ee(0x22e)](ImageManager['requiredPartyMemberIcon'],_0x3e34b9,_0x546383);};function Window_PartyLabel(){const _0x4e825d=_0x1cd296;this[_0x4e825d(0x1dd)](...arguments);}Window_PartyLabel[_0x1cd296(0x203)]=Object[_0x1cd296(0x16d)](Window_Base[_0x1cd296(0x203)]),Window_PartyLabel[_0x1cd296(0x203)][_0x1cd296(0x201)]=Window_PartyLabel,Window_PartyLabel[_0x1cd296(0x203)][_0x1cd296(0x1dd)]=function(_0x44ba2e,_0x2aaf42){const _0x341998=_0x1cd296;Window_Base['prototype'][_0x341998(0x1dd)]['call'](this,_0x44ba2e),this['setText'](_0x2aaf42);},Window_PartyLabel[_0x1cd296(0x203)]['updatePadding']=function(){const _0x42211c=_0x1cd296;this[_0x42211c(0x2a1)]=0x0;},Window_PartyLabel[_0x1cd296(0x203)][_0x1cd296(0x1ce)]=function(_0x435e4c){const _0x49ec31=_0x1cd296;this['contents']['clear'](),this[_0x49ec31(0x2cc)](_0x435e4c,0x0,0x0,this['innerWidth'],_0x49ec31(0x1d8));};function _0x107f(){const _0x44fa6d=['sprite','itemRect','activePartyWindowRect','battleLayoutStyle','processDrawItem','createReservePartyWindow','cursorDown','SnapshotOpacity','isSceneMap','Empty','_partySystemBattleCommandCooldown','nameStartPosition','isAnyInputWindowActive','1494339mwTXrl','assistSwapPositions','BattleHelpFormation','reserveParty','deselect','lockPartyMemberIcon','Game_System_isFormationEnabled_FP','centerSprite','_backSprite1','clearPartyBattleCommandCooldown','isAutosaveEnabled','battleback1Name','uiMenuStyle','CoreEngine','clearDamagePopup','BattleHelpSwitch','Temp:\x20Create\x20Temporary\x20Party\x20(JS)\x20Error','ActiveTpbFormationMessage','statusLabelRect','createForcedParty','constructor','rawBattleMembers','prototype','battlePartyChangeCmdHelp','right','drawSvActor','isActiveTpb','createReservePartyLabel','loadFaceImages','deactivate','546QwqLJd','log','Game_Party_canSwitchPartyInBattle_FP','actorParams','_activePartyLabel','initEquips','isPartyCommandEnabled','createInnerSprite','processShiftSortShortcut','cursorPageup','isNextScene','isEnabled','itemHeight','windowPadding','status','addFormationCommand','_partySwitchTargetActor','_currentActor','setupBattleTest','_actorCommandWindow','battleback2Name','isShowPartySwitchOutAnimation','Game_Actor_canSwitchPartyInBattle_FP','drawActorPartyIcons','_statusPartyWindow','max','faceHeight','_partySwitchBattleCommandCooldown','drawItemDarkRect','iconWidth','allMembers','Settings','rearrangePartyActors','sortActors','ReserveParty','drawIcon','drawParamName','makeActions','203904GmMRfX','ActorCmdWinAddParty','Game_Party_initialize','reserveTransfer','setBackgroundOpacity','STRUCT','ActiveBattlerOffsetY','pop','terminate','assistSortPartyMembers','BackRectColor','battlePartySwitchCooldown','createPartySwitchWindow','_subject','floor','includes','ceil','increaseTurn','ReserveBattlerOffsetX','setPartyRequirement','loadFace','_battleMembers','dimColor1','isQueueFormationMenu','maxBattleMembers','isFormationChangeOk','getPartySystemBackColor','_forcedBattleGridTactics','_backSprite2','removePartyCommand','isUsingBattleGridTactics','snapForBackground','_statusWindow','BattlePartyCmd','Game_Party_swapOrder','onActiveOk','checkShiftRemoveShortcut','DrawBackRect','version','ConvertParams','onPartySwitchOk','Scene_Battle_isAnyInputWindowActive','PartyCmdWinAddParty','_pagedownButton','Scene_Battle_updateBattleProcess','canSwitchPartyInBattle','drawItemStatus','StatusLabelBgType','initBattleMembers','StatusWindowBgType','followers','isTriggered','processCancel','VisuMZ_2_BattleSystemSTB','loadTitle2','removeActionBattlersOTB','clearBypassAutoSave','isOkEnabled','Lock','faceName','_lastIndex','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','playOkSound','isFormationCommandEnabled','gridRank','_partyRequired','NeedsBackgroundSnapshot','removeActorFromBattleMembers','param','remove','contents','quickSwap','addChild','updateBattleProcess','clearTpbChargeTime','Remove','clone','isFTB','CallPartyScene','initPartySystem','drawItem','systemColor','startMove','activePartyLabelRect','onReserveCancel','drawItemImageFace','refresh','actorId','isPreviousSceneBattleTransitionable','isImmediateTpb','openness','getParamValue','createAllWindows','MaxBattleMembers','swapOrderPartySystemPlugin','drawDarkRect','startSwitchOutAnimation','_scene','processOk','toLowerCase','currentActor','Scene_Battle_createPartyCommandWindowBattleCore','4144395cldEHw','clearPartySwitchCommandCooldown','members','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_targets','ReserveCol','ReserveSpriteOffsetY','isOTB','close','faceWidth','padding','Game_Troop_increaseTurn','Game_Party_allMembers_FP','BattleSwitchOut','BgFilename1','_target','_bypassAutoSavePartySystem','addNonBattleTestMembers','drawRemoveCommand','BattleManager_setup','processPartySwitchMember','battleMembers','VisuMZ_2_BattleGridSystem','call','checkInitBattleMembers','BattleSwitchWindowBgType','regenerateAll','allowEarlySwapOrderBreak','PartySystem','min','ChangeMaxBattleMembers','_forcedPartyActors','hasBattleSystemIncompatibilities','loadCharacter','66608oqiwUW','ReserveSpriteOffsetX','Sprite_Actor_update','_callSceneParty','svbattler','VisuMZ_2_BattleSystemBTB','addPartyCommand','paramValueByName','BgFilename2','slice','_reservePartyLabel','battlePartyChangeCmd','playCursorSound','Game_Party_addActor','maxCols','adjustSprite','bind','ARRAYFUNC','postPartySwitchMenuTurnBased','drawText','_spriteset','ActivePartyLabelRect','isTimeActive','TempCreatePartyJS','isTpb','reservePartyLabelRect','_tpbChargeTime','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','partySwitchWindowRect','drawItemImage','_clickHandler','createActivePartyLabel','inBattle','ActivePartyGraphic','SceneManager_isPreviousSceneBattleTransitionable','Game_Party_removeActor','indexOf','cursorUp','MovePartyIndexToReserve','length','isSceneBattle','characterName','changePaintOpacity','battlePartySwitchCmdHelp','isPartyCommandAdded','shift','concat','VisuMZ_2_BattleSystemPTB','Require','index','RequireIcon','updateBattlePartySwitchCooldown','startOpacity','createPageButtons','addLoadListener','exit','AssistSort','reselect','callFormation','ActiveParty','cursorVisible','statusWindowRect','active','_activePartyWindow','VisuMZ_0_CoreEngine','setup','drawActorSimpleStatus','General','parse','SceneManager_isNextSceneBattleTransitionable','refreshAllWindows','_partySystemSwitchOut','onBattlePartySwitch','Vocab','_inputting','format','equips','defaultMaxBattleMembers','changeTextColor','createActivePartyWindow','isNextSceneBattleTransitionable','mapId','VisuMZ_2_BattleSystemFTB','ReserveBattlerOffsetY','Index','width','map','resetFontSettings','paintOpacity','scaleSprite','Scene_Battle_createAllWindows','drawActorCharacter','isSceneParty','drawParamValue','Game_Unit_inBattle','drawItemEmpty','TempDisbandTempParty','isAlive','setBackgroundType','callUpdateHelp','_debug','VisuMZ_1_MainMenuCore','SwitchOutAnimation','_tpbState','createStatusLabel','undecided','drawActorFace','ActivePartyLabelBgType','_rowThickness','select','DisplayedParams','filter','isActor','processShiftRemoveShortcut','switchStateIconActor','_actionBattlers','initMaxBattleMembers','_pageupButton','battlePartyChangeIcon','fillRect','addActor','ensureCursorVisible','createCustomBackgroundImages','isCTB','FUNC','cursorPagedown','isRightInputMode','tpbImmediateAction','drawItemImageSvActor','MoveActorsToReserve','charged','Window_PartyCommand_updateHelp','face','\x5cI[%1]%2','trim','isSTB','partySwitchWindowRectBorder','drawActorName','setActor','VisuMZ_2_AggroControlSystem','cancel','_partyMemberSwitchWindow','Window_ActorCommand_updateHelp','Value','BgSettings','addActorToBattleMembers','addCustomCommands','activeParty','addCommand','setupStartingMembers','ReserveItemThickness','addText','buttonAssistText1','addWindow','_windowLayer','removeActor','toUpperCase','Scene_Battle_isTimeActive','VisuMZ_2_BattleSystemCTB','replaceActionBattlersPartySwitch','postPartySwitchMenuTpb','createPartyCommandWindowBattleCore','bitmap','isRequiredInParty','hpColor','updatePartySwitch','gaugeBackColor','round','name','gradientFillRect','isFormationEnabled','isPTB','isShiftRemoveShortcutEnabled','isFormationCommandAdded','testBattlers','isCurrentItemEnabled','16358wtXtNf','commandStyle','buttonAssistText4','iconHeight','StatusLabelRect','pendingIndex','teamBasedFirstAvailableMember','Scene_BattleGridTactics','formation','needsPageButtons','changeLevel','_partySwitchDuration','text','clear','setPartyLock','changeMaxBattleMembers','Window','smoothSelect','PartyCmdCooldown','loadTitle1','preparePartySwitchMember','helpAreaHeight','assistSwapOutPartyMember','Game_Battler_onBattleStart','43CppEFp','_actor','60RxnJZC','loadPartyImages','updateTurnOrderSTB','Game_Party_setupBattleTest','setBattler','activate','sortActionOrdersBTB','_otb_actionBattlersNext','_partyCommandWindow','create','return\x200','_callPartyMemberSwitch','_logWindow','findSymbol','skillItemWindowRectBorderStyle','ReservePartyLabelRect','_statusPartyLabel','Scene_Base_isAutosaveEnabled','drawParamText','charging','push','drawActorPartyIconsVert','anyRequiredPartyMembersInReserve','registerCommand','setBattlePartySwitchCooldown','emptyPartyMember','423phxWeu','updateTargetsForPartySwitch','update','_helpWindow','NUM','drawItemImageSprite','buttonAssistKey3','requestRefresh','match','lineHeight','dimColor2','checkShiftSortShortcut','ActiveSpriteOffsetX','selectActor','_actors','clearForcedParty','setupBattleTestMembers','applyBattlePartySwitchCooldown','popScene','splice','ActorsJS','makeActionOrders','processCursorMove','isShiftShortcutEnabled','ReservePartyWindowBgType','Game_Party_setupStartingMembers','12ZcsvvU','uiInputPosition','createActorCommandWindow','_reservePartyWindow','reservePartyWindowRect','AddRemoveCmd','textColor','commandFormation','_tpbSceneChangeCacheActor','_partyLocked','innerHeight','partyChangeRefresh','assistRemovePartyMember','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','description','refreshOG','isSceneGridTactics','Game_Battler_regenerateAll','setStatusWindow','VisuMZ_2_BattleSystemETB','VisuMZ_2_BattleSystemOTB','addRemoveCommand','updateTurnOrderCTB','_battleSystemIncompatibilityError','323580WKuVRC','sort','battlerName','ReservePartyLabelBgType','commandPartyMemberSwitch','58038YheQHf','drawActorPartyIconsHorz','ARRAYSTRUCT','assistSwapInPartyMember','loadSvActor','isBTB','_actionState','getInputButtonString','_back1Sprite','Scene_Battle_createActorCommandWindow','isETB','open','onBattleStart','_battleMaxSize','312yEvAxe','battlePartySwitchCmd','height','getColor','isAppeared','statusParty','EVAL','removePartyMember','itemPadding','Actors','updateHelp','setText','border','callPartyMemberSwitch','buttonAssistText3','clamp','maxItems','reserveMembers','_list','createBackground','actor','center','startSwitchInAnimation','_actorGraphic','battler','ActivePartyWindowRect','initialize','isPreviousScene','setHandler'];_0x107f=function(){return _0x44fa6d;};return _0x107f();}function Window_PartyActive(){const _0xda38b4=_0x1cd296;this[_0xda38b4(0x1dd)](...arguments);}Window_PartyActive['prototype']=Object['create'](Window_StatusBase[_0x1cd296(0x203)]),Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x201)]=Window_PartyActive,Window_PartyActive[_0x1cd296(0x1da)]=VisuMZ['PartySystem'][_0x1cd296(0x22a)]['Window'][_0x1cd296(0x2da)],Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x1dd)]=function(_0x1929f3){const _0x5eef1d=_0x1cd296;Window_StatusBase[_0x5eef1d(0x203)][_0x5eef1d(0x1dd)][_0x5eef1d(0x2ae)](this,_0x1929f3),this['refresh'](),this['activate'](),this['smoothSelect'](0x0);},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x1ad)]=function(){const _0xaeb939=_0x1cd296;return VisuMZ['PartySystem'][_0xaeb939(0x22a)]['General'][_0xaeb939(0x19d)];},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x1d3)]=function(){const _0x395d83=_0x1cd296;return $gameParty[_0x395d83(0x249)]();},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x2c7)]=function(){return $gameParty['maxBattleMembers']();},Window_PartyActive[_0x1cd296(0x203)]['itemHeight']=function(){const _0x5baa52=_0x1cd296;return this[_0x5baa52(0x1a2)];},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x1d7)]=function(_0x4f6fb6){return $gameParty['rawBattleMembers']()[_0x4f6fb6];},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x295)]=function(){const _0x349902=_0x1cd296;return this[_0x349902(0x1d7)](this[_0x349902(0x2ea)]());},Window_PartyActive[_0x1cd296(0x203)]['isCurrentItemEnabled']=function(){const _0x16dc68=_0x1cd296,_0x37baba=this['actor'](this[_0x16dc68(0x2ea)]());return _0x37baba?_0x37baba[_0x16dc68(0x24a)]():!![];},Window_PartyActive[_0x1cd296(0x203)]['isCancelEnabled']=function(){const _0x11a218=_0x1cd296;if($gameParty[_0x11a218(0x299)]()[_0x11a218(0x2e0)]<=0x0)return!![];if($gameParty[_0x11a218(0x17a)]())return![];return $gameParty[_0x11a218(0x2ac)]()[_0x11a218(0x2e0)]>0x0;},Window_PartyActive['prototype'][_0x1cd296(0x194)]=function(){const _0xb3f30d=_0x1cd296;Window_StatusBase[_0xb3f30d(0x203)][_0xb3f30d(0x194)]['call'](this),this[_0xb3f30d(0x255)]();},Window_PartyActive['prototype'][_0x1cd296(0x1e6)]=function(_0x5f4825){const _0xbc1b1f=_0x1cd296;this[_0xbc1b1f(0x26a)]()&&this[_0xbc1b1f(0x293)]();},Window_PartyActive[_0x1cd296(0x203)]['cursorPagedown']=function(){const _0x21d43c=_0x1cd296,_0xa6e3fd=this['index'](),_0x37bcc1=_0xa6e3fd+0x1>=this[_0x21d43c(0x1d3)]()?0x0:_0xa6e3fd+0x1;this[_0x21d43c(0x278)](_0xa6e3fd,_0x37bcc1);},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x214)]=function(){const _0x191ef4=_0x1cd296,_0x43c5b7=this[_0x191ef4(0x2ea)](),_0x278539=_0x43c5b7-0x1<0x0?this['maxItems']()-0x1:_0x43c5b7-0x1;this[_0x191ef4(0x278)](_0x43c5b7,_0x278539);},Window_PartyActive[_0x1cd296(0x203)]['quickSwap']=function(_0x1e4032,_0x58caf0){const _0x528c73=_0x1cd296,_0x40cbc2=this[_0x528c73(0x1d7)](_0x1e4032),_0x5740fa=this[_0x528c73(0x1d7)](_0x58caf0);if(_0x40cbc2&&!_0x40cbc2[_0x528c73(0x24a)]())return;if(_0x5740fa&&!_0x5740fa[_0x528c73(0x24a)]())return;const _0x92cff3=$gameParty[_0x528c73(0x246)];_0x92cff3[_0x1e4032]=_0x5740fa?_0x5740fa[_0x528c73(0x288)]():0x0,_0x92cff3[_0x58caf0]=_0x40cbc2?_0x40cbc2[_0x528c73(0x288)]():0x0,this[_0x528c73(0x287)](),this[_0x528c73(0x2c5)](),this[_0x528c73(0x15b)](_0x58caf0);},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x255)]=function(){const _0x49689a=_0x1cd296;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input['isTriggered'](_0x49689a(0x2e6))){const _0x47719d=this[_0x49689a(0x295)]();this[_0x49689a(0x32a)]();}},Window_PartyActive['prototype'][_0x1cd296(0x32a)]=function(){const _0x31924b=_0x1cd296;SoundManager['playEquip']();const _0x3e5785=this[_0x31924b(0x295)]();$gameParty[_0x31924b(0x274)](_0x3e5785['actorId']()),this[_0x31924b(0x31c)](),SceneManager[_0x31924b(0x292)]['refreshAllWindows']();},Window_PartyActive['prototype'][_0x1cd296(0x365)]=function(){const _0x18d8e4=_0x1cd296;if(!this[_0x18d8e4(0x1ad)]())return![];const _0x334280=this[_0x18d8e4(0x295)]();return this[_0x18d8e4(0x2f7)]&&_0x334280&&_0x334280[_0x18d8e4(0x24a)]();},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x281)]=function(_0x5c8528){const _0x56dfd9=_0x1cd296,_0x37d805=this['actor'](_0x5c8528);if(!_0x37d805)return this[_0x56dfd9(0x318)](_0x5c8528);this['resetFontSettings']();const _0x1acdef=this[_0x56dfd9(0x1e1)](_0x5c8528);this['drawItemImage'](_0x5c8528);const _0x2f8244=_0x1acdef['y']+_0x1acdef[_0x56dfd9(0x1c5)]-this['lineHeight']();this['drawDarkRect'](_0x1acdef['x'],_0x2f8244,_0x1acdef[_0x56dfd9(0x30e)],0x2),this[_0x56dfd9(0x222)](_0x37d805,_0x1acdef['x']+0x2,_0x1acdef['y']),this[_0x56dfd9(0x342)](_0x37d805,_0x1acdef['x'],_0x2f8244,_0x1acdef['width']);},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x318)]=function(_0x9e63df){const _0x397095=_0x1cd296;this['resetFontSettings']();const _0x3d6eb2=this[_0x397095(0x1e1)](_0x9e63df);this[_0x397095(0x227)](_0x3d6eb2['x'],_0x3d6eb2['y'],_0x3d6eb2['width'],_0x3d6eb2[_0x397095(0x1c5)]);const _0x25c01a=_0x3d6eb2['y']+Math[_0x397095(0x360)]((_0x3d6eb2[_0x397095(0x1c5)]-this[_0x397095(0x187)]())/0x2);this[_0x397095(0x307)](ColorManager[_0x397095(0x282)]()),this[_0x397095(0x2cc)](TextManager[_0x397095(0x17d)],_0x3d6eb2['x'],_0x25c01a,_0x3d6eb2[_0x397095(0x30e)],_0x397095(0x1d8));},Window_PartyActive['prototype'][_0x1cd296(0x227)]=function(_0x390115,_0x5dd5f2,_0x308be8,_0x5ca3db,_0x5f1b00){const _0x499bf2=_0x1cd296;_0x5f1b00=Math[_0x499bf2(0x224)](_0x5f1b00||0x1,0x1);while(_0x5f1b00--){_0x5ca3db=_0x5ca3db||this[_0x499bf2(0x187)](),this[_0x499bf2(0x277)][_0x499bf2(0x311)]=0xa0;const _0x120682=ColorManager[_0x499bf2(0x35f)]();this[_0x499bf2(0x277)][_0x499bf2(0x330)](_0x390115+0x1,_0x5dd5f2+0x1,_0x308be8-0x2,_0x5ca3db-0x2,_0x120682),this['contents'][_0x499bf2(0x311)]=0xff;}},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x2d6)]=function(_0x9dc70a){const _0x3c0723=_0x1cd296;switch(Window_PartyActive[_0x3c0723(0x1da)][_0x3c0723(0x294)]()[_0x3c0723(0x33f)]()){case'face':this[_0x3c0723(0x286)](_0x9dc70a);break;case _0x3c0723(0x1e0):this[_0x3c0723(0x183)](_0x9dc70a);break;case _0x3c0723(0x2bd):Imported[_0x3c0723(0x31e)]&&this[_0x3c0723(0x339)](_0x9dc70a);break;};},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x286)]=function(_0x38da94){const _0x150d41=_0x1cd296,_0xb75793=this['actor'](_0x38da94),_0x32dabe=this[_0x150d41(0x1e1)](_0x38da94),_0x4be230=Math[_0x150d41(0x2b4)](ImageManager[_0x150d41(0x2a0)],_0x32dabe[_0x150d41(0x30e)]-0x2),_0x51c944=_0x32dabe[_0x150d41(0x1c5)]-0x2;this[_0x150d41(0x2e3)](_0xb75793[_0x150d41(0x24a)]());const _0x1c205e=Math[_0x150d41(0x360)](_0x32dabe['x']+(_0x32dabe[_0x150d41(0x30e)]-_0x4be230)/0x2);this['drawActorFace'](_0xb75793,_0x1c205e,_0x32dabe['y']+0x1,_0x4be230,_0x51c944),this['changePaintOpacity'](!![]);},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x183)]=function(_0x4cd15c){const _0x40f77b=_0x1cd296,_0x3211d2=this[_0x40f77b(0x1d7)](_0x4cd15c),_0x4b8c83=this[_0x40f77b(0x1e1)](_0x4cd15c),_0x20e005=VisuMZ[_0x40f77b(0x2b3)][_0x40f77b(0x22a)][_0x40f77b(0x15a)],_0x57f5f5=_0x4b8c83['x']+Math[_0x40f77b(0x360)](_0x4b8c83[_0x40f77b(0x30e)]/0x2)+_0x20e005[_0x40f77b(0x18a)],_0x3d877a=_0x4b8c83['y']+_0x4b8c83[_0x40f77b(0x1c5)]-this[_0x40f77b(0x187)]()-_0x20e005['ActiveSpriteOffsetY'];this[_0x40f77b(0x314)](_0x3211d2,_0x57f5f5,_0x3d877a);},Window_PartyActive['prototype'][_0x1cd296(0x339)]=function(_0x1fe001){const _0x523be7=_0x1cd296,_0x8c6b1b=this[_0x523be7(0x1d7)](_0x1fe001),_0x4a9d32=_0x8c6b1b[_0x523be7(0x1b2)](),_0x4bcc2c=this[_0x523be7(0x1e1)](_0x1fe001),_0x3a89d7=VisuMZ[_0x523be7(0x2b3)]['Settings'][_0x523be7(0x15a)],_0x14d906=_0x4bcc2c['x']+Math[_0x523be7(0x360)](_0x4bcc2c['width']/0x2)+_0x3a89d7['ActiveBattlerOffsetX'],_0x1b2edf=_0x4bcc2c['y']+_0x4bcc2c[_0x523be7(0x1c5)]-this['lineHeight']()-_0x3a89d7[_0x523be7(0x237)];this['drawSvActor'](_0x4a9d32,_0x14d906,_0x1b2edf);},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x290)]=function(_0xa18d00,_0x2a60fb,_0x288f90,_0xebc504){const _0x45e38b=_0x1cd296,_0x356108=ColorManager[_0x45e38b(0x247)](),_0xa96554=ColorManager[_0x45e38b(0x188)](),_0x35017f=_0x288f90/0x2,_0x3b73ab=this['lineHeight']();while(_0xebc504--){this[_0x45e38b(0x277)][_0x45e38b(0x362)](_0xa18d00,_0x2a60fb,_0x35017f,_0x3b73ab,_0xa96554,_0x356108),this[_0x45e38b(0x277)][_0x45e38b(0x362)](_0xa18d00+_0x35017f,_0x2a60fb,_0x35017f,_0x3b73ab,_0x356108,_0xa96554);}},Window_PartyActive[_0x1cd296(0x203)][_0x1cd296(0x342)]=function(_0x5c126d,_0x35167a,_0x31add7,_0x10cf38){const _0x1f5160=_0x1cd296;_0x10cf38=_0x10cf38||0xa8,this[_0x1f5160(0x307)](ColorManager[_0x1f5160(0x35d)](_0x5c126d)),this[_0x1f5160(0x2cc)](_0x5c126d[_0x1f5160(0x361)](),_0x35167a,_0x31add7,_0x10cf38,_0x1f5160(0x1d8));},Window_PartyActive[_0x1cd296(0x203)]['setStatusWindow']=function(_0xea1a2){const _0xc0e398=_0x1cd296;this['_statusWindow']=_0xea1a2,this[_0xc0e398(0x31c)]();},Window_PartyActive['prototype'][_0x1cd296(0x31c)]=function(){const _0xde8c87=_0x1cd296;if(this[_0xde8c87(0x251)])this[_0xde8c87(0x251)][_0xde8c87(0x343)](this[_0xde8c87(0x1d7)](this[_0xde8c87(0x2ea)]()));};function Window_PartyReserve(){const _0x1afb80=_0x1cd296;this[_0x1afb80(0x1dd)](...arguments);}Window_PartyReserve['prototype']=Object['create'](Window_StatusBase[_0x1cd296(0x203)]),Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x201)]=Window_PartyReserve,Window_PartyReserve[_0x1cd296(0x1da)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x15a)]['ReservePartyGraphic'],Window_PartyReserve[_0x1cd296(0x325)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x15a)][_0x1cd296(0x34f)],Window_PartyReserve['prototype'][_0x1cd296(0x1dd)]=function(_0x3a8f78){const _0x1abd62=_0x1cd296;Window_StatusBase[_0x1abd62(0x203)][_0x1abd62(0x1dd)][_0x1abd62(0x2ae)](this,_0x3a8f78),this[_0x1abd62(0x26d)]=0x0,this['refresh']();},Window_PartyReserve['prototype']['maxCols']=function(){const _0x207c0d=_0x1cd296;return VisuMZ[_0x207c0d(0x2b3)][_0x207c0d(0x22a)]['Window'][_0x207c0d(0x29c)]||0x1;},Window_PartyReserve['prototype'][_0x1cd296(0x217)]=function(){const _0x366c17=_0x1cd296;return this[_0x366c17(0x187)]()*Window_PartyReserve[_0x366c17(0x325)]+0x6;},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x1ad)]=function(){const _0x5a18cf=_0x1cd296;return VisuMZ[_0x5a18cf(0x2b3)]['Settings'][_0x5a18cf(0x2fc)][_0x5a18cf(0x19d)];},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x1d3)]=function(){const _0x501412=_0x1cd296;let _0x3ce622=$gameParty['reserveMembers']()[_0x501412(0x2e0)];if(this[_0x501412(0x1ad)]())_0x3ce622++;return _0x3ce622;},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x1d7)]=function(_0x1f549b){const _0x149493=_0x1cd296;return $gameParty[_0x149493(0x1d4)]()[_0x1f549b];},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x295)]=function(){const _0x1032ce=_0x1cd296;return this[_0x1032ce(0x1d7)](this[_0x1032ce(0x2ea)]());},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x26f)]=function(){SoundManager['playEquip']();},Window_PartyReserve[_0x1cd296(0x203)]['isCurrentItemEnabled']=function(){const _0x26f169=_0x1cd296,_0x55bab7=this[_0x26f169(0x1d7)](this[_0x26f169(0x2ea)]());return _0x55bab7?_0x55bab7[_0x26f169(0x24a)]():!![];},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x194)]=function(){const _0x4b50f9=_0x1cd296;Window_StatusBase['prototype'][_0x4b50f9(0x194)][_0x4b50f9(0x2ae)](this),this[_0x4b50f9(0x189)]();},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x2de)]=function(_0x2b9108){const _0x2b6634=_0x1cd296;this[_0x2b6634(0x2ea)]()<=0x0&&Input[_0x2b6634(0x264)]('up')?this[_0x2b6634(0x265)]():Window_StatusBase['prototype'][_0x2b6634(0x2de)][_0x2b6634(0x2ae)](this,_0x2b9108);},Window_PartyReserve['prototype'][_0x1cd296(0x336)]=function(){const _0xd55225=_0x1cd296,_0x5c9e2d=this['index'](),_0x5da55f=_0x5c9e2d+0x1>=this[_0xd55225(0x1d3)]()-0x1?0x0:_0x5c9e2d+0x1;this[_0xd55225(0x278)](_0x5c9e2d,_0x5da55f);},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x214)]=function(){const _0x4706b3=_0x1cd296,_0x228c77=this[_0x4706b3(0x2ea)](),_0x32ff26=_0x228c77-0x1<0x0?this[_0x4706b3(0x1d3)]()-0x2:_0x228c77-0x1;this[_0x4706b3(0x278)](_0x228c77,_0x32ff26);},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x278)]=function(_0x33c832,_0x257413){const _0x2a4d96=_0x1cd296,_0x242985=this['actor'](_0x33c832),_0x3138ca=this[_0x2a4d96(0x1d7)](_0x257413);if(!_0x242985?.[_0x2a4d96(0x24a)]()||!_0x3138ca?.[_0x2a4d96(0x24a)]())return;else{if(!_0x242985||!_0x3138ca)return;}const _0x3bbf79=$gameParty[_0x2a4d96(0x18c)],_0x5b9b36=_0x3bbf79[_0x2a4d96(0x2dd)](_0x242985[_0x2a4d96(0x288)]()),_0x160af3=_0x3bbf79[_0x2a4d96(0x2dd)](_0x3138ca['actorId']());_0x3bbf79[_0x5b9b36]=_0x3138ca?_0x3138ca[_0x2a4d96(0x288)]():0x0,_0x3bbf79[_0x160af3]=_0x242985?_0x242985['actorId']():0x0,this['refresh'](),this[_0x2a4d96(0x2c5)](),this[_0x2a4d96(0x15b)](_0x257413);},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x189)]=function(){const _0x5a4a65=_0x1cd296;if(!this[_0x5a4a65(0x195)]())return;Input[_0x5a4a65(0x264)](_0x5a4a65(0x2e6))&&this[_0x5a4a65(0x213)]();},Window_PartyReserve[_0x1cd296(0x203)]['processShiftSortShortcut']=function(){const _0x2ab129=_0x1cd296;SoundManager['playEquip'](),$gameParty[_0x2ab129(0x22c)](),this[_0x2ab129(0x15b)](0x0),SceneManager[_0x2ab129(0x292)][_0x2ab129(0x2ff)]();},Window_PartyReserve['prototype'][_0x1cd296(0x195)]=function(){const _0xd34a38=_0x1cd296;return this[_0xd34a38(0x2f7)];},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x14f)]=function(){const _0x42ec6b=_0x1cd296,_0xa77b36=this[_0x42ec6b(0x295)]();return _0xa77b36?_0xa77b36['index']():-0x1;},Window_PartyReserve[_0x1cd296(0x203)]['select']=function(_0x5d5774){const _0x3381bc=_0x1cd296;Window_StatusBase['prototype'][_0x3381bc(0x326)]['call'](this,_0x5d5774);if(_0x5d5774>=0x0)this[_0x3381bc(0x26d)]=_0x5d5774;},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x2f2)]=function(){const _0x161a76=_0x1cd296;this[_0x161a76(0x26d)]=Math[_0x161a76(0x2b4)](this[_0x161a76(0x26d)],this[_0x161a76(0x1d3)]()-0x1),this[_0x161a76(0x15b)](this[_0x161a76(0x26d)]),this[_0x161a76(0x332)](!![]),this[_0x161a76(0x2f5)]=!![];},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x281)]=function(_0x500697){const _0x3ad73c=_0x1cd296,_0x104160=this['actor'](_0x500697);if(!_0x104160)return this[_0x3ad73c(0x2a9)](_0x500697);const _0x42f8f0=this['itemLineRect'](_0x500697);this[_0x3ad73c(0x2d6)](_0x500697);const _0x3103a7=0xa8,_0x2772ce=Window_PartyReserve[_0x3ad73c(0x325)]===0x1,_0x3a6dae=ImageManager[_0x3ad73c(0x228)]*(_0x2772ce?0x2:0x1),_0x1f47cc=this[_0x3ad73c(0x1eb)]()+this[_0x3ad73c(0x1cb)](),_0x5a173d=_0x42f8f0['width']-_0x3103a7,_0x15527c=_0x42f8f0['x']+_0x3a6dae+Math[_0x3ad73c(0x2b4)](_0x1f47cc,_0x5a173d),_0x1160ff=_0x2772ce?![]:!![];this[_0x3ad73c(0x2e3)](_0x104160[_0x3ad73c(0x24a)]()),this[_0x3ad73c(0x222)](_0x104160,_0x42f8f0['x'],_0x42f8f0['y'],_0x1160ff),this[_0x3ad73c(0x342)](_0x104160,_0x15527c,_0x42f8f0['y'],_0x3103a7),this['changePaintOpacity'](!![]);},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x1eb)]=function(){const _0x2a33a2=_0x1cd296,_0x324185=VisuMZ[_0x2a33a2(0x2b3)]['Settings']['Window'];switch(Window_PartyReserve[_0x2a33a2(0x1da)][_0x2a33a2(0x294)]()[_0x2a33a2(0x33f)]()){case _0x2a33a2(0x33d):return ImageManager['faceWidth'];case _0x2a33a2(0x1e0):return _0x324185[_0x2a33a2(0x2ba)]*0x2;case'svbattler':return _0x324185[_0x2a33a2(0x243)]*0x2;};},Window_PartyReserve['prototype'][_0x1cd296(0x2a9)]=function(_0x226057){const _0x2a996b=_0x1cd296,_0x1208d3=this['itemLineRect'](_0x226057);this[_0x2a996b(0x2e3)](!![]);const _0x293804=TextManager[_0x2a996b(0x1ca)];this[_0x2a996b(0x2cc)](_0x293804,_0x1208d3['x'],_0x1208d3['y'],_0x1208d3['width'],_0x2a996b(0x1d8));},Window_PartyReserve['prototype'][_0x1cd296(0x2d6)]=function(_0x1596f5){const _0x199b12=_0x1cd296;switch(Window_PartyReserve[_0x199b12(0x1da)]['toLowerCase']()['trim']()){case'face':this[_0x199b12(0x286)](_0x1596f5);break;case _0x199b12(0x1e0):this['drawItemImageSprite'](_0x1596f5);break;case'svbattler':Imported['VisuMZ_1_MainMenuCore']&&this['drawItemImageSvActor'](_0x1596f5);break;};},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x286)]=function(_0x6e20b3){const _0xee5db3=_0x1cd296,_0x22151b=this[_0xee5db3(0x1d7)](_0x6e20b3),_0x1d0706=this[_0xee5db3(0x1e1)](_0x6e20b3),_0x27b704=Window_PartyReserve[_0xee5db3(0x325)]===0x1;_0x1d0706['x']+=ImageManager[_0xee5db3(0x228)]*(_0x27b704?0x2:0x1);const _0x48dbd8=ImageManager[_0xee5db3(0x2a0)],_0x9a4ea9=_0x1d0706['height']-0x2;this[_0xee5db3(0x2e3)](_0x22151b[_0xee5db3(0x24a)]()),this[_0xee5db3(0x323)](_0x22151b,_0x1d0706['x']+0x1,_0x1d0706['y']+0x1,_0x48dbd8,_0x9a4ea9),this[_0xee5db3(0x2e3)](!![]);},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x183)]=function(_0x59471f){const _0x23a442=_0x1cd296,_0x1df684=this['actor'](_0x59471f),_0x1aa637=this[_0x23a442(0x1e1)](_0x59471f),_0x2e2207=Window_PartyReserve[_0x23a442(0x325)]===0x1;_0x1aa637['x']+=ImageManager[_0x23a442(0x228)]*(_0x2e2207?0x2:0x1);const _0xc3f171=VisuMZ['PartySystem'][_0x23a442(0x22a)]['Window'],_0x24b00d=_0x1aa637['x']+_0xc3f171['ReserveSpriteOffsetX']+this[_0x23a442(0x1cb)](),_0x2fd872=_0x1aa637['y']+_0x1aa637[_0x23a442(0x1c5)]-_0xc3f171[_0x23a442(0x29d)];this[_0x23a442(0x314)](_0x1df684,_0x24b00d,_0x2fd872);},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x339)]=function(_0x1c9da5){const _0x2e1d02=_0x1cd296,_0x5bb689=this[_0x2e1d02(0x1d7)](_0x1c9da5),_0x5836ec=_0x5bb689[_0x2e1d02(0x1b2)](),_0x38956c=this['itemRect'](_0x1c9da5),_0x1cae19=Window_PartyReserve[_0x2e1d02(0x325)]===0x1;_0x38956c['x']+=ImageManager['iconWidth']*(_0x1cae19?0x2:0x1);const _0x2f2271=VisuMZ[_0x2e1d02(0x2b3)][_0x2e1d02(0x22a)]['Window'],_0x58d032=_0x38956c['x']+_0x2f2271[_0x2e1d02(0x243)]+this[_0x2e1d02(0x1cb)](),_0x227a65=_0x38956c['y']+_0x38956c[_0x2e1d02(0x1c5)]-_0x2f2271[_0x2e1d02(0x30c)];this[_0x2e1d02(0x206)](_0x5836ec,_0x58d032,_0x227a65);},Window_PartyReserve['prototype'][_0x1cd296(0x1aa)]=function(_0x504302){const _0x52a51e=_0x1cd296;this[_0x52a51e(0x251)]=_0x504302,this[_0x52a51e(0x31c)]();},Window_PartyReserve[_0x1cd296(0x203)][_0x1cd296(0x31c)]=function(){const _0x54232a=_0x1cd296;this[_0x54232a(0x251)]&&this[_0x54232a(0x251)][_0x54232a(0x343)](this[_0x54232a(0x1d7)](this[_0x54232a(0x2ea)]()));};function Window_PartyStatus(){this['initialize'](...arguments);}function _0x8f6f(_0x8c35c9,_0x4a5e4e){const _0x107f6e=_0x107f();return _0x8f6f=function(_0x8f6ffc,_0x20cfe5){_0x8f6ffc=_0x8f6ffc-0x14c;let _0x2e82f9=_0x107f6e[_0x8f6ffc];return _0x2e82f9;},_0x8f6f(_0x8c35c9,_0x4a5e4e);}Window_PartyStatus['prototype']=Object['create'](Window_StatusBase[_0x1cd296(0x203)]),Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x201)]=Window_PartyStatus,Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x1dd)]=function(_0x11bea3){const _0x58f377=_0x1cd296;this[_0x58f377(0x163)]=null,Window_StatusBase[_0x58f377(0x203)][_0x58f377(0x1dd)][_0x58f377(0x2ae)](this,_0x11bea3);},Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x227)]=function(_0x456c0d,_0x5b8996,_0x2b5930,_0x3189d3,_0x246e47){const _0x5bf3f3=_0x1cd296;if(VisuMZ[_0x5bf3f3(0x2b3)][_0x5bf3f3(0x22a)][_0x5bf3f3(0x2fc)][_0x5bf3f3(0x256)]===![])return;_0x246e47=Math[_0x5bf3f3(0x224)](_0x246e47||0x1,0x1);while(_0x246e47--){_0x3189d3=_0x3189d3||this[_0x5bf3f3(0x187)](),this['contents'][_0x5bf3f3(0x311)]=0xa0;const _0x1c6468=ColorManager[_0x5bf3f3(0x24b)]();this[_0x5bf3f3(0x277)][_0x5bf3f3(0x330)](_0x456c0d+0x1,_0x5b8996+0x1,_0x2b5930-0x2,_0x3189d3-0x2,_0x1c6468),this['contents']['paintOpacity']=0xff;}},ColorManager['getPartySystemBackColor']=function(){const _0x26cd1=_0x1cd296,_0x5863b0=VisuMZ[_0x26cd1(0x2b3)][_0x26cd1(0x22a)][_0x26cd1(0x2fc)];let _0x326529=_0x5863b0[_0x26cd1(0x23b)]!==undefined?_0x5863b0[_0x26cd1(0x23b)]:0x13;return ColorManager[_0x26cd1(0x1c6)](_0x326529);},Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x343)]=function(_0x56467f){const _0x3fe745=_0x1cd296;if(this[_0x3fe745(0x163)]===_0x56467f)return;this['_actor']=_0x56467f;if(_0x56467f){const _0x2ae2cd=ImageManager[_0x3fe745(0x245)](_0x56467f[_0x3fe745(0x26c)]());_0x2ae2cd[_0x3fe745(0x2ef)](this[_0x3fe745(0x287)][_0x3fe745(0x2c9)](this));}else this[_0x3fe745(0x287)]();},Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x287)]=function(){const _0x1316ef=_0x1cd296;Window_StatusBase[_0x1316ef(0x203)][_0x1316ef(0x287)]['call'](this),this[_0x1316ef(0x277)][_0x1316ef(0x157)](),this[_0x1316ef(0x310)](),VisuMZ['PartySystem'][_0x1316ef(0x22a)][_0x1316ef(0x15a)]['StatusWindowDraw'][_0x1316ef(0x2ae)](this);},Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x1a7)]=function(){const _0x242581=_0x1cd296;if(!this[_0x242581(0x163)]){this[_0x242581(0x227)](0x0,0x0,this['innerWidth'],this[_0x242581(0x1a2)]);const _0x516d71=Math['round']((this['innerHeight']-this[_0x242581(0x187)]())/0x2);this[_0x242581(0x307)](ColorManager[_0x242581(0x282)]()),this['drawText'](TextManager[_0x242581(0x17d)],0x0,_0x516d71,this['innerWidth'],_0x242581(0x1d8));return;}this[_0x242581(0x323)](this[_0x242581(0x163)],0x1,0x0,ImageManager[_0x242581(0x2a0)],ImageManager[_0x242581(0x225)]),this[_0x242581(0x2fb)](this['_actor'],ImageManager[_0x242581(0x2a0)]+0x24,0x0);const _0x2c285c=this[_0x242581(0x187)](),_0x3653dc=this[_0x242581(0x20e)](),_0x13b66e=Math[_0x242581(0x360)](this['innerWidth']/0x2),_0x357664=Math[_0x242581(0x241)](_0x3653dc['length']/0x2)*_0x2c285c,_0x4f4dc7=0x0;let _0x112ac4=0x0,_0x275697=ImageManager[_0x242581(0x225)]+_0x2c285c/0x2;for(const _0x508273 of _0x3653dc){this[_0x242581(0x227)](_0x112ac4,_0x275697,_0x13b66e,_0x2c285c),this['drawParamName'](_0x508273,_0x112ac4,_0x275697,_0x13b66e),this[_0x242581(0x316)](_0x508273,_0x112ac4,_0x275697,_0x13b66e),_0x112ac4===_0x4f4dc7?_0x112ac4+=_0x13b66e:(_0x112ac4=_0x4f4dc7,_0x275697+=_0x2c285c);}},Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x20e)]=function(){const _0x2e3bd2=_0x1cd296;return Imported['VisuMZ_0_CoreEngine']?VisuMZ[_0x2e3bd2(0x1fa)][_0x2e3bd2(0x22a)]['Param'][_0x2e3bd2(0x327)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus['prototype'][_0x1cd296(0x22f)]=function(_0x303826,_0xb3710c,_0x1dc1ec,_0xe1d7a2){const _0xc398fb=_0x1cd296,_0x289989=this[_0xc398fb(0x1cb)]();_0xe1d7a2-=_0x289989*0x2;if(Imported[_0xc398fb(0x2f9)])this[_0xc398fb(0x176)](_0xb3710c+_0x289989,_0x1dc1ec,_0xe1d7a2,_0x303826,![]);else{const _0x4cf8a7=TextManager['param'](_0x303826);this[_0xc398fb(0x307)](ColorManager[_0xc398fb(0x282)]()),this[_0xc398fb(0x2cc)](_0x4cf8a7,_0xb3710c+_0x289989,_0x1dc1ec,_0xe1d7a2);}},Window_PartyStatus[_0x1cd296(0x203)][_0x1cd296(0x316)]=function(_0x4a0c9c,_0x59b9aa,_0x3f5289,_0x82d901){const _0x57471a=_0x1cd296;this[_0x57471a(0x310)]();const _0x301576=this['itemPadding'](),_0x2e7e0a=this[_0x57471a(0x28c)](_0x4a0c9c);this[_0x57471a(0x2cc)](_0x2e7e0a,_0x59b9aa+_0x301576,_0x3f5289,_0x82d901-_0x301576*0x2,_0x57471a(0x205));},Window_PartyStatus[_0x1cd296(0x203)]['getParamValue']=function(_0x50c572){const _0x49971c=_0x1cd296,_0x9b5a0=this['_actor'];return Imported[_0x49971c(0x2f9)]?_0x9b5a0[_0x49971c(0x2c0)](_0x50c572,!![]):_0x9b5a0[_0x49971c(0x275)](_0x50c572);};function Window_PartyBattleSwitch(){this['initialize'](...arguments);}Window_PartyBattleSwitch['prototype']=Object[_0x1cd296(0x16d)](Window_StatusBase[_0x1cd296(0x203)]),Window_PartyBattleSwitch['prototype'][_0x1cd296(0x201)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x1dd)]=function(_0x1550d7){const _0x44c483=_0x1cd296;Window_StatusBase[_0x44c483(0x203)][_0x44c483(0x1dd)][_0x44c483(0x2ae)](this,_0x1550d7),this[_0x44c483(0x31b)](VisuMZ[_0x44c483(0x2b3)][_0x44c483(0x22a)][_0x44c483(0x15a)][_0x44c483(0x2b0)]),this[_0x44c483(0x28b)]=0x0;},Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x209)]=function(){const _0x4882b3=_0x1cd296;for(const _0x39b4c6 of $gameParty[_0x4882b3(0x229)]()){ImageManager['loadFace'](_0x39b4c6['faceName']());}},Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x2c7)]=function(){return 0x1;},Window_PartyBattleSwitch['prototype'][_0x1cd296(0x1d7)]=function(_0x13fa81){const _0x3eb8f2=_0x1cd296;return $gameParty[_0x3eb8f2(0x1d4)]()[_0x13fa81];},Window_PartyBattleSwitch['prototype'][_0x1cd296(0x295)]=function(){const _0xf9a7a4=_0x1cd296;return this[_0xf9a7a4(0x1d7)](this[_0xf9a7a4(0x2ea)]());},Window_PartyBattleSwitch[_0x1cd296(0x203)]['itemHeight']=function(){return this['lineHeight']()*0x2+0x8;},Window_PartyBattleSwitch[_0x1cd296(0x203)]['maxItems']=function(){const _0x3ee85b=_0x1cd296;return $gameParty[_0x3ee85b(0x1d4)]()[_0x3ee85b(0x2e0)];},Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x169)]=function(){const _0x4e1daa=_0x1cd296;Window_StatusBase['prototype'][_0x4e1daa(0x169)][_0x4e1daa(0x2ae)](this),this[_0x4e1daa(0x1c0)](),this[_0x4e1daa(0x287)](),this[_0x4e1daa(0x15b)](0x0);},Window_PartyBattleSwitch['prototype']['deactivate']=function(){const _0x5a0e7e=_0x1cd296;Window_StatusBase[_0x5a0e7e(0x203)][_0x5a0e7e(0x20a)][_0x5a0e7e(0x2ae)](this),this[_0x5a0e7e(0x29f)]();},Window_PartyBattleSwitch['prototype'][_0x1cd296(0x368)]=function(){const _0x2f281e=_0x1cd296;return this[_0x2f281e(0x216)](this[_0x2f281e(0x295)]());},Window_PartyBattleSwitch[_0x1cd296(0x203)]['isEnabled']=function(_0x4157c3){const _0x2e3baa=_0x1cd296;if(!_0x4157c3)return![];return _0x4157c3[_0x2e3baa(0x24a)]()&&_0x4157c3[_0x2e3baa(0x31a)]();},Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x281)]=function(_0x30b7fb){const _0x1208ed=_0x1cd296,_0x2f4d0a=this[_0x1208ed(0x1d7)](_0x30b7fb);if(!_0x2f4d0a)return;const _0x7337ee=ImageManager[_0x1208ed(0x245)](_0x2f4d0a['faceName']());_0x7337ee['addLoadListener'](this[_0x1208ed(0x1e4)][_0x1208ed(0x2c9)](this,_0x30b7fb));},Window_PartyBattleSwitch['prototype'][_0x1cd296(0x1e4)]=function(_0x137922){const _0x32bb2d=_0x1cd296;this[_0x32bb2d(0x2d6)](_0x137922),this[_0x32bb2d(0x25f)](_0x137922);},Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x2d6)]=function(_0x94a774){const _0x5752d4=_0x1cd296,_0x558144=this[_0x5752d4(0x1d7)](_0x94a774),_0x49ce49=this[_0x5752d4(0x1e1)](_0x94a774);this[_0x5752d4(0x2e3)](this[_0x5752d4(0x216)](_0x558144)),this[_0x5752d4(0x323)](_0x558144,_0x49ce49['x']+0x1,_0x49ce49['y']+0x1,ImageManager[_0x5752d4(0x2a0)],_0x49ce49['height']-0x2),this[_0x5752d4(0x2e3)](!![]);},Window_PartyBattleSwitch[_0x1cd296(0x203)][_0x1cd296(0x25f)]=function(_0x4ce45e){const _0x4bae78=_0x1cd296,_0x4d6aee=this[_0x4bae78(0x1d7)](_0x4ce45e),_0x371c37=this['itemRectWithPadding'](_0x4ce45e),_0x4ddb43=_0x371c37['x']+ImageManager['faceWidth']+0x24,_0x5ed763=_0x4ddb43+0xb4;this[_0x4bae78(0x2e3)](this[_0x4bae78(0x216)](_0x4d6aee)),this[_0x4bae78(0x342)](_0x4d6aee,_0x4ddb43,_0x371c37['y']),this['drawActorClass'](_0x4d6aee,_0x4ddb43,_0x371c37['y']+this[_0x4bae78(0x187)]()),this['placeBasicGauges'](_0x4d6aee,_0x5ed763,_0x371c37['y']),this[_0x4bae78(0x2e3)](!![]);};Imported['VisuMZ_1_BattleCore']&&(ImageManager['battlePartyChangeIcon']=VisuMZ[_0x1cd296(0x2b3)]['Settings']['General']['BattlePartyIcon']??0x4b,TextManager[_0x1cd296(0x2c4)]=VisuMZ['PartySystem'][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x252)],TextManager[_0x1cd296(0x204)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x1ef)],TextManager[_0x1cd296(0x1c4)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x2a4)],TextManager[_0x1cd296(0x2e4)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x302)][_0x1cd296(0x1fc)],TextManager[_0x1cd296(0x1fe)]=VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)]['Vocab']['QueuePartyScene'],VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x2db)]=SceneManager[_0x1cd296(0x289)],SceneManager[_0x1cd296(0x289)]=function(){const _0x54689a=_0x1cd296;if(SceneManager[_0x54689a(0x1de)](Scene_Party))return!![];return VisuMZ[_0x54689a(0x2b3)][_0x54689a(0x2db)][_0x54689a(0x2ae)](this);},VisuMZ['PartySystem'][_0x1cd296(0x2fe)]=SceneManager[_0x1cd296(0x309)],SceneManager[_0x1cd296(0x309)]=function(){const _0x3b44a8=_0x1cd296;if(SceneManager[_0x3b44a8(0x215)](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x3b44a8(0x2fe)][_0x3b44a8(0x2ae)](this);},SceneManager[_0x1cd296(0x1e8)]=function(){const _0x27bae5=_0x1cd296;return this[_0x27bae5(0x292)]&&this[_0x27bae5(0x292)]['constructor']===Scene_Map;},VisuMZ[_0x1cd296(0x2b3)]['Scene_Battle_createAllWindows']=Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x28d)],Scene_Battle['prototype'][_0x1cd296(0x28d)]=function(){const _0x43541c=_0x1cd296;VisuMZ[_0x43541c(0x2b3)][_0x43541c(0x313)][_0x43541c(0x2ae)](this),this[_0x43541c(0x23d)](),this[_0x43541c(0x359)](),this[_0x43541c(0x2cb)]();},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x23d)]=function(){const _0x10737b=_0x1cd296,_0x43a8e7=this[_0x10737b(0x2d5)]();this['_partyMemberSwitchWindow']=new Window_PartyBattleSwitch(_0x43a8e7),this[_0x10737b(0x352)](this[_0x10737b(0x346)]),this[_0x10737b(0x346)][_0x10737b(0x1df)]('ok',this[_0x10737b(0x259)][_0x10737b(0x2c9)](this)),this['_partyMemberSwitchWindow'][_0x10737b(0x1df)](_0x10737b(0x345),this['onPartySwitchCancel'][_0x10737b(0x2c9)](this));},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x2d5)]=function(){const _0x3f1f6a=_0x1cd296,_0x1dbbf5=this[_0x3f1f6a(0x1e3)]();return _0x1dbbf5===_0x3f1f6a(0x1cf)?this['partySwitchWindowRectBorder']():this['partySwitchWindowRectStandard']();},Scene_Battle['prototype']['partySwitchWindowRectStandard']=function(){const _0x380234=_0x1cd296;return VisuMZ[_0x380234(0x2b3)][_0x380234(0x22a)][_0x380234(0x15a)]['BattleSwitchWindowRect'][_0x380234(0x2ae)](this);},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x341)]=function(){const _0x29a608=_0x1cd296,_0x493349=this[_0x29a608(0x172)](),_0x218581=$gameSystem[_0x29a608(0x218)]()*0x2;return _0x493349['width']=0x204+_0x218581,_0x493349;},VisuMZ['PartySystem'][_0x1cd296(0x25a)]=Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x1ec)],Scene_Battle[_0x1cd296(0x203)]['isAnyInputWindowActive']=function(){const _0x43bfa3=_0x1cd296;if(this[_0x43bfa3(0x346)]&&this[_0x43bfa3(0x346)][_0x43bfa3(0x2f7)])return!![];if(this['_partySystemSwitchOut'])return!![];if(this[_0x43bfa3(0x16f)])return!![];if(this[_0x43bfa3(0x2bc)])return!![];return VisuMZ[_0x43bfa3(0x2b3)][_0x43bfa3(0x25a)]['call'](this);},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x296)]=Scene_Battle[_0x1cd296(0x203)]['createPartyCommandWindowBattleCore'],Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x35a)]=function(){const _0x3efda8=_0x1cd296;VisuMZ[_0x3efda8(0x2b3)][_0x3efda8(0x296)][_0x3efda8(0x2ae)](this),this[_0x3efda8(0x16c)]['setHandler'](_0x3efda8(0x152),this['commandFormation'][_0x3efda8(0x2c9)](this));},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x19f)]=function(){const _0x22a9a7=_0x1cd296;this['isQueueFormationMenu']()?(this['_callSceneParty']=!![],this[_0x22a9a7(0x170)][_0x22a9a7(0x350)](TextManager[_0x22a9a7(0x1fe)][_0x22a9a7(0x304)](TextManager['formation']))):this[_0x22a9a7(0x2f3)]();},Scene_Battle['prototype'][_0x1cd296(0x248)]=function(){const _0x2fd2a7=_0x1cd296;return BattleManager[_0x2fd2a7(0x207)]();},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x2f3)]=function(){const _0x4ac189=_0x1cd296;this['_callSceneParty']=![],this[_0x4ac189(0x2cd)][_0x4ac189(0x180)](),this[_0x4ac189(0x353)]['visible']=![],VisuMZ['PartySystem']['NeedsBackgroundSnapshot']()&&SceneManager[_0x4ac189(0x250)](),SceneManager['push'](Scene_Party),$gameParty[_0x4ac189(0x18f)](),BattleManager[_0x4ac189(0x2d1)]()&&(BattleManager[_0x4ac189(0x1a0)]=BattleManager['actor']());},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x273)]=function(){const _0x176b7c=_0x1cd296,_0x3d4645=SceneManager[_0x176b7c(0x292)][_0x176b7c(0x2cd)][_0x176b7c(0x1bd)],_0x57d148=SceneManager[_0x176b7c(0x292)][_0x176b7c(0x2cd)][_0x176b7c(0x1bd)];if(_0x3d4645&&_0x3d4645['battleback1Name']()!==''&&_0x3d4645[_0x176b7c(0x1f8)]()!==null)return!![];if(_0x57d148&&_0x57d148[_0x176b7c(0x21f)]()!==''&&_0x57d148[_0x176b7c(0x21f)]()!==null)return!![];return![];},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x25d)]=Scene_Battle['prototype'][_0x1cd296(0x27a)],Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x27a)]=function(){const _0x14fe85=_0x1cd296;VisuMZ['PartySystem'][_0x14fe85(0x25d)][_0x14fe85(0x2ae)](this),this[_0x14fe85(0x2bc)]&&!BattleManager[_0x14fe85(0x23e)]&&this[_0x14fe85(0x2f3)](),this['_callPartyMemberSwitch']&&!BattleManager['_subject']&&this[_0x14fe85(0x1d0)]();},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x356)]=Scene_Battle[_0x1cd296(0x203)]['isTimeActive'],Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x2cf)]=function(){const _0x24c37b=_0x1cd296;if(BattleManager[_0x24c37b(0x207)]()){if(this[_0x24c37b(0x346)]&&this[_0x24c37b(0x346)][_0x24c37b(0x2f7)])return![];}return VisuMZ[_0x24c37b(0x2b3)][_0x24c37b(0x356)]['call'](this);},VisuMZ[_0x1cd296(0x2b3)]['Scene_Battle_createActorCommandWindow']=Scene_Battle['prototype'][_0x1cd296(0x19a)],Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x19a)]=function(){const _0x413c24=_0x1cd296;VisuMZ['PartySystem'][_0x413c24(0x1be)][_0x413c24(0x2ae)](this),this[_0x413c24(0x21e)][_0x413c24(0x1df)](_0x413c24(0x152),this[_0x413c24(0x1b4)]['bind'](this));},Scene_Battle[_0x1cd296(0x203)]['commandPartyMemberSwitch']=function(){const _0x473207=_0x1cd296;this[_0x473207(0x248)]()?(this[_0x473207(0x16f)]=!![],this[_0x473207(0x170)][_0x473207(0x350)](TextManager[_0x473207(0x1fe)][_0x473207(0x304)](TextManager[_0x473207(0x152)]))):this[_0x473207(0x1d0)]();},Scene_Battle[_0x1cd296(0x203)]['callPartyMemberSwitch']=function(){const _0x3b9945=_0x1cd296;this['_callPartyMemberSwitch']=![],this[_0x3b9945(0x170)]['clear'](),BattleManager[_0x3b9945(0x1d7)]()&&this[_0x3b9945(0x346)][_0x3b9945(0x169)]();},Scene_Battle['prototype']['onPartySwitchOk']=function(){const _0xf072cc=_0x1cd296,_0x45d980=this[_0xf072cc(0x346)][_0xf072cc(0x295)]();_0x45d980?this[_0xf072cc(0x15e)](_0x45d980):(this[_0xf072cc(0x346)][_0xf072cc(0x20a)](),this[_0xf072cc(0x21e)][_0xf072cc(0x169)]());},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x15e)]=function(_0x225c49){const _0x223f45=_0x1cd296,_0x343127=BattleManager[_0x223f45(0x1d7)](),_0x2f9f69=_0x343127[_0x223f45(0x1db)]();this[_0x223f45(0x346)][_0x223f45(0x20a)](),this[_0x223f45(0x220)]()&&_0x2f9f69?(this['_partySystemSwitchOut']=!![],_0x2f9f69[_0x223f45(0x291)](_0x225c49)):this[_0x223f45(0x2ab)](_0x225c49);},Scene_Battle[_0x1cd296(0x203)][_0x1cd296(0x220)]=function(){const _0x391b3d=_0x1cd296;return VisuMZ['PartySystem']['Settings'][_0x391b3d(0x2fc)][_0x391b3d(0x31f)];},Scene_Battle['prototype'][_0x1cd296(0x2ab)]=function(_0x42e6ed){const _0x1313c9=_0x1cd296;this[_0x1313c9(0x300)]=![];const _0x25e483=BattleManager[_0x1313c9(0x1d7)](),_0x30f343=_0x25e483['battler'](),_0x57095e=$gameParty['_battleMembers'][_0x1313c9(0x2dd)](_0x25e483[_0x1313c9(0x288)]());$gameParty[_0x1313c9(0x246)][_0x57095e]=_0x42e6ed[_0x1313c9(0x288)](),$gameParty[_0x1313c9(0x1a3)](),$gameTroop['partyChangeRefresh']();if(this[_0x1313c9(0x28a)]())_0x42e6ed['_tpbChargeTime']=_0x25e483[_0x1313c9(0x2d3)],_0x42e6ed[_0x1313c9(0x320)]=_0x1313c9(0x33b);else BattleManager[_0x1313c9(0x2d1)]()&&_0x42e6ed[_0x1313c9(0x27b)]();BattleManager['_currentActor']=_0x42e6ed,BattleManager[_0x1313c9(0x17f)](_0x25e483,_0x42e6ed),_0x42e6ed[_0x1313c9(0x18f)](),_0x42e6ed[_0x1313c9(0x230)](),_0x42e6ed[_0x1313c9(0x301)](_0x25e483),_0x30f343&&_0x30f343[_0x1313c9(0x168)](_0x42e6ed),this[_0x1313c9(0x251)][_0x1313c9(0x32b)](_0x25e483,_0x42e6ed),this[_0x1313c9(0x251)][_0x1313c9(0x287)](),this[_0x1313c9(0x21e)][_0x1313c9(0x2fa)](_0x42e6ed),this['_actorCommandWindow']['smoothSelect'](0x0),this[_0x1313c9(0x21e)][_0x1313c9(0x169)](),this[_0x1313c9(0x21e)][_0x1313c9(0x31d)]=!![];},Scene_Battle[_0x1cd296(0x203)]['isImmediateTpb']=function(){const _0x1f3414=_0x1cd296;if(!BattleManager['isTpb']())return![];const _0xb096c3=VisuMZ[_0x1f3414(0x2b3)][_0x1f3414(0x22a)][_0x1f3414(0x2fc)];return _0xb096c3['tpbImmediateAction']===undefined&&(_0xb096c3[_0x1f3414(0x338)]=!![]),_0xb096c3['tpbImmediateAction'];},Window_StatusBase[_0x1cd296(0x203)][_0x1cd296(0x32b)]=function(_0x566aa8,_0x31f009){const _0x457c81=_0x1cd296,_0x5b60f5='actor%1-stateIcon'[_0x457c81(0x304)](_0x566aa8[_0x457c81(0x288)]()),_0x49bf0c=this[_0x457c81(0x212)](_0x5b60f5,Sprite_StateIcon);_0x49bf0c[_0x457c81(0x2fa)](_0x31f009);},Scene_Battle[_0x1cd296(0x203)]['onPartySwitchCancel']=function(){const _0x582da5=_0x1cd296;this[_0x582da5(0x346)][_0x582da5(0x20a)](),this[_0x582da5(0x21e)][_0x582da5(0x169)](),this[_0x582da5(0x21e)][_0x582da5(0x287)]();},Scene_Battle['prototype'][_0x1cd296(0x359)]=function(){const _0x48c222=_0x1cd296;if(!BattleManager[_0x48c222(0x2d1)]())return;if(!SceneManager[_0x48c222(0x1de)](Scene_Party))return;this[_0x48c222(0x16c)][_0x48c222(0x20a)](),this[_0x48c222(0x16c)][_0x48c222(0x29f)](),this[_0x48c222(0x21e)][_0x48c222(0x20a)](),this['_actorCommandWindow'][_0x48c222(0x29f)](),BattleManager['_currentActor']=null,BattleManager[_0x48c222(0x303)]=![];},Scene_Battle['prototype'][_0x1cd296(0x2cb)]=function(){const _0x231572=_0x1cd296;if(BattleManager[_0x231572(0x2d1)]())return;if(!SceneManager[_0x231572(0x1de)](Scene_Party))return;Imported[_0x231572(0x2be)]&&BattleManager['isBTB']()&&BattleManager[_0x231572(0x193)](),Imported[_0x231572(0x30b)]&&BattleManager[_0x231572(0x27e)]()&&(BattleManager['makeActionOrders'](),BattleManager[_0x231572(0x21c)]=$gameParty[_0x231572(0x150)](),BattleManager[_0x231572(0x23e)]=BattleManager[_0x231572(0x1d7)](),BattleManager['_inputting']=!![],this[_0x231572(0x21e)][_0x231572(0x2fa)](BattleManager['actor']()),this[_0x231572(0x251)]['selectActor'](BattleManager['actor']())),Imported[_0x231572(0x1ab)]&&BattleManager[_0x231572(0x1bf)]()&&(BattleManager[_0x231572(0x193)](),BattleManager['_currentActor']=$gameParty['teamBasedFirstAvailableMember'](),BattleManager[_0x231572(0x23e)]=BattleManager[_0x231572(0x1d7)](),BattleManager[_0x231572(0x303)]=!![],this['_actorCommandWindow'][_0x231572(0x2fa)](BattleManager['actor']()),this[_0x231572(0x251)][_0x231572(0x18b)](BattleManager[_0x231572(0x1d7)]())),Imported['VisuMZ_2_BattleSystemPTB']&&BattleManager[_0x231572(0x364)]()&&(BattleManager['makeActionOrders'](),BattleManager[_0x231572(0x21c)]=$gameParty[_0x231572(0x150)](),BattleManager[_0x231572(0x23e)]=BattleManager[_0x231572(0x1d7)](),BattleManager['_inputting']=!![],this['_actorCommandWindow'][_0x231572(0x2fa)](BattleManager['actor']()),this[_0x231572(0x251)][_0x231572(0x18b)](BattleManager[_0x231572(0x1d7)]()));},Game_Party[_0x1cd296(0x203)][_0x1cd296(0x150)]=function(){const _0x50d86d=_0x1cd296;let _0x4b1ab5=this[_0x50d86d(0x2ac)]();return _0x4b1ab5[0x0];},Sprite_Actor['_partySwitchDuration']=0xc,Sprite_Actor[_0x1cd296(0x203)][_0x1cd296(0x291)]=function(_0x25029b){const _0x48674d=_0x1cd296;this['_partySwitchTargetActor']=_0x25029b;const _0x259581=Sprite_Actor[_0x48674d(0x155)];this[_0x48674d(0x283)](0x12c,0x0,_0x259581),this[_0x48674d(0x2ed)](0x0,_0x259581),this[_0x48674d(0x155)]=_0x259581;},Sprite_Actor['prototype']['startSwitchInAnimation']=function(_0x47c134){const _0x1a2839=_0x1cd296;if(SceneManager[_0x1a2839(0x2e1)]()){SceneManager['_scene'][_0x1a2839(0x2ab)](_0x47c134);const _0x40315e=Sprite_Actor[_0x1a2839(0x155)];this['stepForward'](),this[_0x1a2839(0x2ed)](0xff,_0x40315e);}this[_0x1a2839(0x21b)]=null;},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x2bb)]=Sprite_Actor['prototype'][_0x1cd296(0x180)],Sprite_Actor[_0x1cd296(0x203)][_0x1cd296(0x180)]=function(){const _0x5840e2=_0x1cd296;VisuMZ[_0x5840e2(0x2b3)][_0x5840e2(0x2bb)][_0x5840e2(0x2ae)](this);if(this[_0x5840e2(0x155)])this[_0x5840e2(0x35e)]();},Sprite_Actor['prototype']['updatePartySwitch']=function(){const _0x3a7bd2=_0x1cd296;this[_0x3a7bd2(0x155)]=this[_0x3a7bd2(0x155)]||0x0,this['_partySwitchDuration']--,this[_0x3a7bd2(0x155)]<=0x0&&this[_0x3a7bd2(0x1d9)](this[_0x3a7bd2(0x21b)]);},VisuMZ[_0x1cd296(0x2b3)]['Window_PartyCommand_addCustomCommands']=Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x34b)],Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x34b)]=function(){const _0x5888ab=_0x1cd296;VisuMZ[_0x5888ab(0x2b3)]['Window_PartyCommand_addCustomCommands'][_0x5888ab(0x2ae)](this),this[_0x5888ab(0x21a)]();},Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x21a)]=function(){const _0x4f2e0b=_0x1cd296;if(!this[_0x4f2e0b(0x366)]())return;if(this[_0x4f2e0b(0x2b7)]()){$gameTemp['isPlaytest']()&&!BattleManager[_0x4f2e0b(0x1af)]&&(console[_0x4f2e0b(0x20c)](_0x4f2e0b(0x2d4)),BattleManager['_battleSystemIncompatibilityError']=!![]);return;}const _0x512622=this[_0x4f2e0b(0x36a)](),_0x3bd292=ImageManager[_0x4f2e0b(0x32f)],_0x58e009=_0x512622===_0x4f2e0b(0x156)?TextManager[_0x4f2e0b(0x2c4)]:_0x4f2e0b(0x33e)[_0x4f2e0b(0x304)](_0x3bd292,TextManager[_0x4f2e0b(0x2c4)]),_0x3dd47=this[_0x4f2e0b(0x270)]();this[_0x4f2e0b(0x34d)](_0x58e009,_0x4f2e0b(0x152),_0x3dd47);},Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x366)]=function(){const _0x111cfa=_0x1cd296;if(Imported['VisuMZ_2_BattleSystemOTB']&&BattleManager[_0x111cfa(0x29e)]())return![];if(Imported[_0x111cfa(0x266)]&&BattleManager[_0x111cfa(0x340)]())return![];if(Imported[_0x111cfa(0x2ad)]&&BattleManager['isUsingGridSystem']())return![];return VisuMZ[_0x111cfa(0x2b3)][_0x111cfa(0x22a)]['General'][_0x111cfa(0x25b)];},Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x2b7)]=function(){return![];},Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x270)]=function(){const _0x4daa96=_0x1cd296;if($gameParty[_0x4daa96(0x229)]()[_0x4daa96(0x2e0)]<=0x1)return![];if(!$gameParty['canSwitchPartyInBattle']())return![];return $gameSystem[_0x4daa96(0x363)]();},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x33c)]=Window_PartyCommand['prototype']['updateHelp'],Window_PartyCommand[_0x1cd296(0x203)][_0x1cd296(0x1cd)]=function(){const _0x4c4c46=_0x1cd296,_0x269e15=this['currentSymbol']();switch(_0x269e15){case _0x4c4c46(0x152):this['_helpWindow'][_0x4c4c46(0x1ce)](TextManager[_0x4c4c46(0x204)]);break;default:VisuMZ[_0x4c4c46(0x2b3)][_0x4c4c46(0x22a)][_0x4c4c46(0x33c)][_0x4c4c46(0x2ae)](this);break;}},Window_ActorCommand[_0x1cd296(0x203)][_0x1cd296(0x2bf)]=function(){const _0x2f58eb=_0x1cd296;if(!this[_0x2f58eb(0x2e5)]())return;this['findSymbol'](_0x2f58eb(0x152))>=0x0&&this[_0x2f58eb(0x24e)]();const _0x47f46a=this[_0x2f58eb(0x36a)](),_0x44f97a=ImageManager['battlePartyChangeIcon'],_0x45019e=_0x47f46a===_0x2f58eb(0x156)?TextManager['battlePartySwitchCmd']:_0x2f58eb(0x33e)[_0x2f58eb(0x304)](_0x44f97a,TextManager[_0x2f58eb(0x2c4)]),_0xdc90fd=this[_0x2f58eb(0x211)]();this['addCommand'](_0x45019e,_0x2f58eb(0x152),_0xdc90fd);},Window_ActorCommand[_0x1cd296(0x203)][_0x1cd296(0x2e5)]=function(){const _0x2fa1fc=_0x1cd296;if(!this['_actor'])return![];return VisuMZ[_0x2fa1fc(0x2b3)]['Settings'][_0x2fa1fc(0x2fc)][_0x2fa1fc(0x232)];},Window_ActorCommand[_0x1cd296(0x203)][_0x1cd296(0x211)]=function(){const _0x1ea42f=_0x1cd296;if($gameParty['allMembers']()['length']<=0x1)return![];if(!this['_actor'])return![];if(!this[_0x1ea42f(0x163)][_0x1ea42f(0x25e)]())return![];return this[_0x1ea42f(0x163)][_0x1ea42f(0x24a)]();},VisuMZ[_0x1cd296(0x2b3)][_0x1cd296(0x22a)][_0x1cd296(0x347)]=Window_ActorCommand[_0x1cd296(0x203)]['updateHelp'],Window_ActorCommand[_0x1cd296(0x203)][_0x1cd296(0x1cd)]=function(){const _0x3cb00d=_0x1cd296,_0x2d2110=this['currentSymbol']();if(!_0x2d2110)return;switch(_0x2d2110['toLowerCase']()){case _0x3cb00d(0x152):this[_0x3cb00d(0x181)][_0x3cb00d(0x1ce)](TextManager['battlePartySwitchCmdHelp']);break;default:VisuMZ[_0x3cb00d(0x2b3)]['Settings']['Window_ActorCommand_updateHelp'][_0x3cb00d(0x2ae)](this);break;}},Window_ActorCommand[_0x1cd296(0x203)][_0x1cd296(0x24e)]=function(){const _0x3a40d3=_0x1cd296;while(this[_0x3a40d3(0x171)](_0x3a40d3(0x152))>=0x0){const _0x50fb0a=this[_0x3a40d3(0x171)]('formation');this[_0x3a40d3(0x1d5)][_0x3a40d3(0x191)](_0x50fb0a,0x1);}});;