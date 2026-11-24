//=============================================================================
// VisuStella MZ - Visual Item Inventory
// VisuMZ_4_VisualItemInv.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_VisualItemInv = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualItemInv = VisuMZ.VisualItemInv || {};
VisuMZ.VisualItemInv.version = 1.08;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.08] [VisualItemInv]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Item_Inventory_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the item list displayed in-game to become more visual
 * and show bigger images, either as icons or pictures. The enlarged item,
 * weapon, and armor images will show their item quantities next to them while
 * a tooltip window appears above their selected cell to show the item's name.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Changes the item inventory windows to become more visual.
 * * Enlarged item images can be either icons or picture images.
 * * Alter how large you want the images to appear with the Plugin Parameters.
 * * Add different color backgrounds for different items.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Window Columns and Spacing
 * 
 * It should come off as no surprise that these windows will have their usual
 * column counts changed to adjust for the item images shown. The columns will
 * be based on how many of the item icons can fit inside of the window.
 *
 * ---
 * 
 * Item Quantity Positioning
 * 
 * The item quantity will now be positioned to show in the lower right of any
 * window cell with an enlarged icon. Due to this being a much smaller area
 * than what is usually provided, some plugins may have incredibly squished
 * appearances when it comes to displaying item quantity in some areas.
 * 
 * This needs to be adjusted in those plugins individually.
 * 
 * ---
 * 
 * Items and Equips Core
 * 
 * For the Equip Menu, the remove item entry has been changed to show only the
 * enlarged icon. This is to keep consistency with the rest of the plugin.
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
 * === Picture-Related Notetags ===
 * 
 * ---
 * 
 * <Visual Item Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   item's icon inside the item windows instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of this plugin, too.
 * - The size used for the image will vary based on the icon size settings.
 * 
 * ---
 * 
 * === Background Colors-Related Notetags ===
 * 
 * ---
 *
 * <Visual Item BG Color 1: x>
 * <Visual Item BG Color 2: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to text color 'x'.
 * - Replace 'x' with a number from 0 to 31 to represent a text color.
 *
 * ---
 *
 * <Visual Item BG Color 1: #rrggbb>
 * <Visual Item BG Color 2: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the background color(s) for the item to a hex color.
 * - Use #rrggbb for custom colors.
 * - You can find out what hex codes belong to which color from this website:
 *   https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Visual Item Inventory Settings
 * ============================================================================
 *
 * These settings allow you to adjust how the Visual Item Inventory windows
 * appear and which ones they appear in.
 *
 * ---
 *
 * General
 * 
 *   Applied Windows:
 *   - Insert the name of their constructors here to apply them.
 *   - Only works with windows made from Window_ItemList.
 * 
 *   Icon Size:
 *   - The icon size used for the Visual Item windows.
 * 
 *   Icon Smoothing?:
 *   - Do you wish to smooth out the icons or pixelate them?
 *
 * ---
 *
 * Item Quantity Outline
 * 
 *   Outline Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 *   Outline Size:
 *   - How thick are the outlines for the item quantity?
 *
 * ---
 *
 * Tooltip Window
 * 
 *   Show Tooltip Window?:
 *   - Show the tooltip window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Buffer Width:
 *   - How much to buffer this window's width by?
 * 
 *   Font Size:
 *   - What should this window's font size be?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset this window's X/Y position by?
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
 * Version 1.08: January 19, 2026
 * * Compatibility Update!
 * ** When used together with the Battle Grid System, item slots will no longer
 *    be covered by the Battle Grid targeting and usage nodes. Update by Arisu.
 * ** When used together with the More Currencies plugin, no longer display the
 *    extra currency count on item grid. Update by Arisu. 
 * 
 * Version 1.07: May 15, 2025
 * * Compatibility Update!
 * ** Tooltip window now accounts for target window's scaling (ie Frontview
 *    Battle UI). Update made by Arisu.
 * 
 * Version 1.06: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a visual overlapping error. Fix made by Olivia.
 * 
 * Version 1.05: March 14, 2024
 * * Compatibility Update!
 * ** Added better compatibility with VisuMZ_3_ItemAmplifySkills! The confirm
 *    icon should now be displayed properly. Update made by Irina.
 * 
 * Version 1.04: July 13, 2023
 * * Compatibility Update!
 * ** Added compatibility with Quest Journal System's newest Quest Label update
 *    in order for the Quest Label to show up in the visual inventory. Update
 *    made by Irina.
 * 
 * Version 1.03: August 25, 2022
 * * Feature Update!
 * ** Updated the boundaries for visual item name display positions to always
 *    fit within the verticality of the game screen. Fix made by Irina.
 * 
 * Version 1.02: July 16, 2021
 * * Bug Fixes!
 * ** Visual glitch fixed that would make item quantity not appear. Fix made
 *    by Arisu.
 * 
 * Version 1.01: February 19, 2021
 * * Feature Update!
 * ** No longer requires VisuStella MZ Items and Equips Core dependency.
 *
 * Version 1.00 Official Release Date: February 26, 2021
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
 * @param VisualItemInv
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param General
 *
 * @param Constructors:arraystr
 * @text Applied Windows
 * @parent General
 * @type string[]
 * @desc Insert the name of their constructors here to apply them.
 * Only works with windows made from Window_ItemList.
 * @default ["Window_ItemList","Window_EquipItem","Window_ShopSell","Window_EventItem","Window_BattleItem"]
 *
 * @param IconSize:num
 * @text Icon Size
 * @parent General
 * @desc The icon size used for the Visual Item windows.
 * @default 64
 *
 * @param IconSmoothing:eval
 * @text Icon Smoothing?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc Do you wish to smooth out the icons or pixelate them?
 * @default false
 * 
 * @param Outline
 * @text Item Quantity Outline
 *
 * @param OutlineColor:num
 * @text Outline Color
 * @parent Outline
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param OutlineSize:num
 * @text Outline Size
 * @parent Outline
 * @desc How thick are the outlines for the item quantity?
 * @default 4
 * 
 * @param Tooltip
 * @text Tooltip Window
 *
 * @param ShowTooltip:eval
 * @text Show Tooltip Window?
 * @parent Tooltip
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the tooltip window?
 * @default true
 *
 * @param TooltipBgType:num
 * @text Background Type
 * @parent Tooltip
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
 * @param TooltipBufferWidth:num
 * @text Buffer Width
 * @parent Tooltip
 * @desc How much to buffer this window's width by?
 * @default 16
 *
 * @param TooltipFontSize:num
 * @text Font Size
 * @parent Tooltip
 * @desc What should this window's font size be?
 * @default 22
 *
 * @param TooltipOffsetX:num
 * @text Offset X
 * @parent Tooltip
 * @desc How much to offset this window's X position by?
 * @default 0
 *
 * @param TooltipOffsetY:num
 * @text Offset Y
 * @parent Tooltip
 * @desc How much to offset this window's Y position by?
 * @default 8
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

const _0x4c1a84=_0x19fa;function _0x19fa(_0xf04e7c,_0x2c3a96){const _0x27c3c0=_0x27c3();return _0x19fa=function(_0x19fa37,_0x340093){_0x19fa37=_0x19fa37-0x9c;let _0x56aba6=_0x27c3c0[_0x19fa37];return _0x56aba6;},_0x19fa(_0xf04e7c,_0x2c3a96);}(function(_0x2a28fa,_0x203d23){const _0x54bd1f=_0x19fa,_0x20dfe6=_0x2a28fa();while(!![]){try{const _0xdb1945=-parseInt(_0x54bd1f(0xa8))/0x1+parseInt(_0x54bd1f(0xf8))/0x2*(parseInt(_0x54bd1f(0xd8))/0x3)+parseInt(_0x54bd1f(0x132))/0x4*(parseInt(_0x54bd1f(0x145))/0x5)+-parseInt(_0x54bd1f(0xf3))/0x6+-parseInt(_0x54bd1f(0x14d))/0x7+-parseInt(_0x54bd1f(0xe2))/0x8*(parseInt(_0x54bd1f(0xeb))/0x9)+parseInt(_0x54bd1f(0x11a))/0xa;if(_0xdb1945===_0x203d23)break;else _0x20dfe6['push'](_0x20dfe6['shift']());}catch(_0x41ac39){_0x20dfe6['push'](_0x20dfe6['shift']());}}}(_0x27c3,0xdac04));var label=_0x4c1a84(0x130),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x48417e){const _0x23c9e5=_0x4c1a84;return _0x48417e['status']&&_0x48417e[_0x23c9e5(0x136)]['includes']('['+label+']');})[0x0];function _0x27c3(){const _0x5ee859=['parameters','OFFSET_Y','prototype','placeItemQuestLabel','Window_ItemList_canDrawUsableGridNodes','Window_Selectable_itemHeight','contentsBack','constructor','paintOpacity','setItem','bgColorNum1','OFFSET_X','102997ChpQUb','opacity','ShowTooltip','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ItemsEquipsCore','round','textWidth','drawItemVisualItemInventory','changeTextColor','length','QuestSystem','_item','rgba(0,\x200,\x200,\x201.0)','IconSize','Settings','rgba(','_scene','outlineColor','map','initialize','ceil','textColor','JSON','VISUAL_ITEM_ICON_SIZE','usesVisualItemInventory','itemBackColor1','ARRAYFUNC','refresh','exit','colSpacing','updateVisibility','_parentWindow','VISUAL_ITEM_CONSTRUCTORS','Window_ItemList_maxCols','note','RegExp','ITEM_AMPLIFY_CONFIRM','VISUAL_ITEM_OUTLINE_COLOR','New','contents','imageSmoothingEnabled','STRUCT','Window_ItemList_colSpacing','0.5','canDrawUsableGridNodes','placeItemNewLabel','right','Window_EquipItem_maxCols','57sXsNkT','drawBigItemPicture','TooltipOffsetY','BUFFER_WIDTH','setupVisualItemInvFontSettings','ConvertParams','blt','trim','confirmIcon','Window_ItemList_drawItem','866872WEahhY','padding','ARRAYEVAL','resetTextColor','includes','min','Window_ShopSell_colSpacing','canDrawTargetGridNodes','BG_TYPE','81NDmZbM','STR','_context','match','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','toUpperCase','version','isShowQuest','7259292bQTuci','visible','iconHeight','isQuestItem','callUpdateHelp','90646gMyrcA','Window_ItemList_placeItemNewLabel','TooltipOffsetX','refreshReturnCheck','drawItemBackground','substring','Constructors','TooltipBgType','VISUAL_ITEM_OUTLINE_SIZE','placeQuestLabel','Window_ItemList_initialize','itemRectWithPadding','ARRAYSTR','drawItem','drawItemBackgroundVisualItemInventory','isNewItem','Window_ItemList_drawItemBackground','_clientArea','width','drawItemAmplifyConfirm','replace','lineHeight','bgColorNum2','ARRAYNUM','Label','OutlineColor','ARRAYSTRUCT','format','Window_ItemList_placeItemQuestLabel','_visualItemInventoryTooltipWindow','TooltipFontSize','_windowLayer','height','Window_EquipItem_colSpacing','24545680LAemyF','scale','placeItemQuestLabelVisualItemInventory','bgColorHex1','center','placeNewLabel','addChild','clear','_visualItemHeight','Window_ShopSell_maxCols','loadSystem','TooltipBufferWidth','active','call','getItemName','Window_ItemList_drawItemNumber','ARRAYJSON','Window_ItemList_drawItemMoreCurrencies','floor','Window_ItemList_canDrawTargetGridNodes','_amplifySkill','numItems','VisualItemInv','itemAt','1468744QOJKne','drawItemMoreCurrencies','drawBigIcon','fontSize','description','isEnabled','EVAL','iconIndex','IconSet','drawText','OffsetX','FONT_SIZE','innerWidth','name','clamp','placeItemNewLabelVisualItemInventory','FUNC','update','max','5rewuDH','rowSpacing','OffsetY','createContents','VisuMZ_1_ItemsEquipsCore','VISUAL_ITEM_ICON_SMOOTHING','IconSmoothing','ItemScene','3491439fZgXxJ','Window_Base_drawItemNumber','parse','drawItemNumberVisualItemInventory','createVisualItemInventoryTooltipWindow','resetFontSettings','VisuMZ_2_QuestSystem','RemoveEquipIcon','drawItemNumber','item','changePaintOpacity','strokeRect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','ConvertHexToRgba','isOpen','maxCols','Window_ItemList_callUpdateHelp'];_0x27c3=function(){return _0x5ee859;};return _0x27c3();}VisuMZ[label]['Settings']=VisuMZ[label]['Settings']||{},VisuMZ[_0x4c1a84(0xdd)]=function(_0x5a52b3,_0x131bbd){const _0x12d6c6=_0x4c1a84;for(const _0x310458 in _0x131bbd){if(_0x310458[_0x12d6c6(0xee)](/(.*):(.*)/i)){const _0x23f36d=String(RegExp['$1']),_0x6d7075=String(RegExp['$2'])[_0x12d6c6(0xf0)]()[_0x12d6c6(0xdf)]();let _0x19a11d,_0xf513b9,_0x255b30;switch(_0x6d7075){case'NUM':_0x19a11d=_0x131bbd[_0x310458]!==''?Number(_0x131bbd[_0x310458]):0x0;break;case _0x12d6c6(0x10f):_0xf513b9=_0x131bbd[_0x310458]!==''?JSON['parse'](_0x131bbd[_0x310458]):[],_0x19a11d=_0xf513b9[_0x12d6c6(0xba)](_0x4f0eb2=>Number(_0x4f0eb2));break;case _0x12d6c6(0x138):_0x19a11d=_0x131bbd[_0x310458]!==''?eval(_0x131bbd[_0x310458]):null;break;case _0x12d6c6(0xe4):_0xf513b9=_0x131bbd[_0x310458]!==''?JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458]):[],_0x19a11d=_0xf513b9[_0x12d6c6(0xba)](_0xadfe7c=>eval(_0xadfe7c));break;case _0x12d6c6(0xbe):_0x19a11d=_0x131bbd[_0x310458]!==''?JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458]):'';break;case _0x12d6c6(0x12a):_0xf513b9=_0x131bbd[_0x310458]!==''?JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458]):[],_0x19a11d=_0xf513b9['map'](_0x41664b=>JSON[_0x12d6c6(0x14f)](_0x41664b));break;case _0x12d6c6(0x142):_0x19a11d=_0x131bbd[_0x310458]!==''?new Function(JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458])):new Function('return\x200');break;case _0x12d6c6(0xc2):_0xf513b9=_0x131bbd[_0x310458]!==''?JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458]):[],_0x19a11d=_0xf513b9[_0x12d6c6(0xba)](_0x44841d=>new Function(JSON[_0x12d6c6(0x14f)](_0x44841d)));break;case _0x12d6c6(0xec):_0x19a11d=_0x131bbd[_0x310458]!==''?String(_0x131bbd[_0x310458]):'';break;case _0x12d6c6(0x104):_0xf513b9=_0x131bbd[_0x310458]!==''?JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458]):[],_0x19a11d=_0xf513b9[_0x12d6c6(0xba)](_0x35d015=>String(_0x35d015));break;case _0x12d6c6(0xd1):_0x255b30=_0x131bbd[_0x310458]!==''?JSON[_0x12d6c6(0x14f)](_0x131bbd[_0x310458]):{},_0x19a11d=VisuMZ['ConvertParams']({},_0x255b30);break;case _0x12d6c6(0x112):_0xf513b9=_0x131bbd[_0x310458]!==''?JSON['parse'](_0x131bbd[_0x310458]):[],_0x19a11d=_0xf513b9[_0x12d6c6(0xba)](_0x159c87=>VisuMZ[_0x12d6c6(0xdd)]({},JSON['parse'](_0x159c87)));break;default:continue;}_0x5a52b3[_0x23f36d]=_0x19a11d;}}return _0x5a52b3;},(_0x5c8414=>{const _0x207f3d=_0x4c1a84,_0x141fc8=_0x5c8414['name'];for(const _0x516e8a of dependencies){if(!Imported[_0x516e8a]){alert(_0x207f3d(0xef)[_0x207f3d(0x113)](_0x141fc8,_0x516e8a)),SceneManager[_0x207f3d(0xc4)]();break;}}const _0x374669=_0x5c8414['description'];if(_0x374669['match'](/\[Version[ ](.*?)\]/i)){const _0x21847d=Number(RegExp['$1']);_0x21847d!==VisuMZ[label][_0x207f3d(0xf1)]&&(alert(_0x207f3d(0x159)['format'](_0x141fc8,_0x21847d)),SceneManager[_0x207f3d(0xc4)]());}if(_0x374669[_0x207f3d(0xee)](/\[Tier[ ](\d+)\]/i)){const _0x1989f6=Number(RegExp['$1']);_0x1989f6<tier?(alert(_0x207f3d(0xab)[_0x207f3d(0x113)](_0x141fc8,_0x1989f6,tier)),SceneManager[_0x207f3d(0xc4)]()):tier=Math[_0x207f3d(0x144)](_0x1989f6,tier);}VisuMZ[_0x207f3d(0xdd)](VisuMZ[label][_0x207f3d(0xb6)],_0x5c8414[_0x207f3d(0x9c)]);})(pluginData),VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xcb)]={'visualPicture':/<(?:VISUAL|VISUAL ITEM) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'bgColorNum1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ](\d+)>/i,'bgColorNum2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ](\d+)>/i,'bgColorHex1':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]1:[ ]#(.*)>/i,'bgColorHex2':/<(?:VISUAL|VISUAL ITEM)[ ](?:BG|BACKGROUND)[ ]COLOR[ ]2:[ ]#(.*)>/i},Window_ItemList[_0x4c1a84(0xbf)]=VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xb6)][_0x4c1a84(0xb5)]||0x40,Window_ItemList[_0x4c1a84(0x14a)]=VisuMZ[_0x4c1a84(0x130)]['Settings'][_0x4c1a84(0x14b)]||![],Window_ItemList[_0x4c1a84(0xcd)]=VisuMZ['VisualItemInv']['Settings'][_0x4c1a84(0x111)]||_0x4c1a84(0xb4),Window_ItemList['VISUAL_ITEM_OUTLINE_SIZE']=VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xb6)]['OutlineSize']||0x0,Window_ItemList[_0x4c1a84(0xc8)]=VisuMZ[_0x4c1a84(0x130)]['Settings'][_0x4c1a84(0xfe)]||0x0,Window_ItemList['prototype']['usesVisualItemInventory']=function(){const _0xd7e48=_0x4c1a84;return Window_ItemList['VISUAL_ITEM_CONSTRUCTORS'][_0xd7e48(0xe6)](this[_0xd7e48(0xa3)][_0xd7e48(0x13f)]);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xa0)]=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xd4)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xd4)]=function(){const _0x2244ff=_0x4c1a84;if(this[_0x2244ff(0xc0)]())return![];return VisuMZ[_0x2244ff(0x130)][_0x2244ff(0xa0)][_0x2244ff(0x127)](this);},VisuMZ[_0x4c1a84(0x130)]['Window_ItemList_canDrawTargetGridNodes']=Window_ItemList['prototype']['canDrawTargetGridNodes'],Window_ItemList['prototype'][_0x4c1a84(0xe9)]=function(){const _0x5ab706=_0x4c1a84;if(this[_0x5ab706(0xc0)]())return![];return VisuMZ[_0x5ab706(0x130)][_0x5ab706(0x12d)][_0x5ab706(0x127)](this);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0x12b)]=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x133)],Window_ItemList['prototype'][_0x4c1a84(0x133)]=function(_0x555fca,_0x13f575,_0x7c1c93,_0x31516a){const _0x5dd9bf=_0x4c1a84;if(this[_0x5dd9bf(0xc0)]())return;VisuMZ['VisualItemInv'][_0x5dd9bf(0x12b)][_0x5dd9bf(0x127)](this,_0x555fca,_0x13f575,_0x7c1c93,_0x31516a);},VisuMZ['VisualItemInv'][_0x4c1a84(0xa1)]=Window_Selectable['prototype']['itemHeight'],Window_ItemList[_0x4c1a84(0x9e)]['itemHeight']=function(){const _0xb21c4e=_0x4c1a84;if(this[_0xb21c4e(0xc0)]()){if(this[_0xb21c4e(0x122)]!==undefined)return this[_0xb21c4e(0x122)];const _0x1bea8a=Math['ceil'](Window_ItemList[_0xb21c4e(0xbf)]/this[_0xb21c4e(0x10d)]());return this[_0xb21c4e(0x122)]=Math[_0xb21c4e(0xad)](_0x1bea8a*this[_0xb21c4e(0x10d)]())+0x8,this[_0xb21c4e(0x122)];}else return VisuMZ[_0xb21c4e(0x130)][_0xb21c4e(0xa1)]['call'](this);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xc9)]=Window_ItemList['prototype'][_0x4c1a84(0x15c)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x15c)]=function(){const _0x140a10=_0x4c1a84;return this[_0x140a10(0xc0)]()?Math[_0x140a10(0xbc)](this[_0x140a10(0x13e)]/this['itemHeight']()):VisuMZ[_0x140a10(0x130)][_0x140a10(0xc9)][_0x140a10(0x127)](this);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xd2)]=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xc5)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xc5)]=function(){const _0x1be06b=_0x4c1a84;return this['usesVisualItemInventory']()?0x0:VisuMZ['VisualItemInv'][_0x1be06b(0xd2)][_0x1be06b(0x127)](this);},VisuMZ['VisualItemInv']['Window_ItemList_rowSpacing']=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x146)],Window_ItemList['prototype'][_0x4c1a84(0x146)]=function(){const _0x3593f7=_0x4c1a84;return this[_0x3593f7(0xc0)]()?0x0:VisuMZ[_0x3593f7(0x130)]['Window_ItemList_rowSpacing'][_0x3593f7(0x127)](this);},VisuMZ[_0x4c1a84(0x130)]['Window_ItemList_drawItem']=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x105)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x105)]=function(_0x4c901b){const _0x507290=_0x4c1a84;this[_0x507290(0xc0)]()?this['drawItemVisualItemInventory'](_0x4c901b):VisuMZ[_0x507290(0x130)][_0x507290(0xe1)][_0x507290(0x127)](this,_0x4c901b);},Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xaf)]=function(_0x3d5ed1){const _0x30c84a=_0x4c1a84,_0x56361d=this['itemAt'](_0x3d5ed1);if(this[_0x30c84a(0x12e)]&&_0x56361d===null)return this[_0x30c84a(0x10b)](_0x3d5ed1);if(!_0x56361d)return;const _0x9b5662=VisuMZ[_0x30c84a(0x130)][_0x30c84a(0xcb)],_0x1a46ec=_0x56361d[_0x30c84a(0xca)],_0x399b7e=this['itemRectWithPadding'](_0x3d5ed1);if(_0x1a46ec['match'](_0x9b5662['visualPicture'])||_0x1a46ec['match'](_0x9b5662['bigPicture'])){const _0x1e0bb4=String(RegExp['$1'])[_0x30c84a(0xdf)](),_0x4bebf6=ImageManager['loadPicture'](_0x1e0bb4);_0x4bebf6['addLoadListener'](this[_0x30c84a(0xd9)]['bind'](this,_0x56361d,_0x4bebf6,_0x399b7e));}else this[_0x30c84a(0x157)](this[_0x30c84a(0x137)](_0x56361d)),this['drawBigItemIcon'](_0x56361d,_0x399b7e),this[_0x30c84a(0x155)](_0x56361d,_0x399b7e['x'],_0x399b7e['y']+_0x399b7e[_0x30c84a(0x118)]-this[_0x30c84a(0x10d)](),_0x399b7e['width']),this[_0x30c84a(0x152)](),this[_0x30c84a(0x157)](!![]);this[_0x30c84a(0xd5)](_0x3d5ed1),this[_0x30c84a(0x9f)](_0x3d5ed1);},Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xd9)]=function(_0x60726d,_0x577ac9,_0x24fb03){const _0x4213e8=_0x4c1a84;this[_0x4213e8(0x157)](this['isEnabled'](_0x60726d));let _0x178b51=_0x24fb03['x']+0x2,_0x24ae99=_0x24fb03['y']+0x2,_0x4654ae=_0x24fb03[_0x4213e8(0x10a)]-0x4,_0x343cc5=_0x24fb03[_0x4213e8(0x118)]-0x4,_0x512e4a=Math[_0x4213e8(0xe7)](_0x4654ae,_0x343cc5);const _0x31e51c=_0x512e4a/_0x577ac9[_0x4213e8(0x10a)],_0x462549=_0x512e4a/_0x577ac9[_0x4213e8(0x118)],_0x2496e5=Math[_0x4213e8(0xe7)](_0x31e51c,_0x462549,0x1);let _0x49f2c9=Math[_0x4213e8(0xad)](_0x577ac9['width']*_0x2496e5),_0xe1b21f=Math[_0x4213e8(0xad)](_0x577ac9[_0x4213e8(0x118)]*_0x2496e5);_0x178b51+=Math[_0x4213e8(0xad)]((_0x4654ae-_0x49f2c9)/0x2),_0x24ae99+=Math[_0x4213e8(0xad)]((_0x343cc5-_0xe1b21f)/0x2);const _0x131bdf=_0x577ac9['width'],_0x3f2f3d=_0x577ac9[_0x4213e8(0x118)],_0x469214=this['contents']['_context']['imageSmoothingEnabled'];this[_0x4213e8(0xcf)][_0x4213e8(0xed)][_0x4213e8(0xd0)]=!![],this['contents'][_0x4213e8(0xde)](_0x577ac9,0x0,0x0,_0x131bdf,_0x3f2f3d,_0x178b51,_0x24ae99,_0x49f2c9,_0xe1b21f),this[_0x4213e8(0xcf)][_0x4213e8(0xed)][_0x4213e8(0xd0)]=_0x469214,this['drawItemNumber'](_0x60726d,_0x24fb03['x'],_0x24fb03['y']+_0x24fb03[_0x4213e8(0x118)]-this[_0x4213e8(0x10d)](),_0x24fb03[_0x4213e8(0x10a)]),this['resetFontSettings'](),this[_0x4213e8(0x157)](!![]);},Window_ItemList['prototype']['drawBigItemIcon']=function(_0x1b31b1,_0x523908){const _0x692176=_0x4c1a84,_0x125aa7=_0x1b31b1[_0x692176(0x139)];this[_0x692176(0x134)](_0x125aa7,_0x523908);},Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x134)]=function(_0x3b7605,_0x128d74){const _0x5bc873=_0x4c1a84;let _0x832a21=_0x128d74['x'],_0x220ade=_0x128d74['y'],_0x9967e2=Window_ItemList['VISUAL_ITEM_ICON_SIZE'];_0x832a21+=Math[_0x5bc873(0xad)]((_0x128d74[_0x5bc873(0x10a)]-_0x9967e2)/0x2),_0x220ade+=Math[_0x5bc873(0xad)]((_0x128d74['height']-_0x9967e2)/0x2);const _0x5f07fa=ImageManager[_0x5bc873(0x124)](_0x5bc873(0x13a)),_0x15ab97=ImageManager['iconWidth'],_0x558325=ImageManager[_0x5bc873(0xf5)],_0x4f35d8=_0x3b7605%0x10*_0x15ab97,_0x1379a6=Math[_0x5bc873(0x12c)](_0x3b7605/0x10)*_0x558325;this[_0x5bc873(0xcf)]['_context'][_0x5bc873(0xd0)]=Window_ItemList[_0x5bc873(0x14a)],this['contents'][_0x5bc873(0xde)](_0x5f07fa,_0x4f35d8,_0x1379a6,_0x15ab97,_0x558325,_0x832a21,_0x220ade,_0x9967e2,_0x9967e2),this[_0x5bc873(0xcf)][_0x5bc873(0xed)]['imageSmoothingEnabled']=!![];},VisuMZ['VisualItemInv'][_0x4c1a84(0x129)]=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x155)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x155)]=function(_0x179985,_0x219497,_0x49850d,_0x354f83){const _0x229313=_0x4c1a84;this[_0x229313(0xc0)]()?(this['setupVisualItemInvFontSettings'](),VisuMZ[_0x229313(0x130)]['Window_ItemList_drawItemNumber'][_0x229313(0x127)](this,_0x179985,_0x219497,_0x49850d,_0x354f83),this['resetFontSettings']()):VisuMZ[_0x229313(0x130)][_0x229313(0x129)][_0x229313(0x127)](this,_0x179985,_0x219497,_0x49850d,_0x354f83);},Window_Base[_0x4c1a84(0x9e)][_0x4c1a84(0xdc)]=function(){const _0x14a776=_0x4c1a84;this[_0x14a776(0x152)](),this[_0x14a776(0xcf)][_0x14a776(0xb9)]=Window_ItemList[_0x14a776(0xcd)],this[_0x14a776(0xcf)]['outlineWidth']=Window_ItemList[_0x14a776(0x100)];},VisuMZ[_0x4c1a84(0x130)]['Window_ItemList_initialize']=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xbb)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xbb)]=function(_0x35a48d){const _0x1cfdf1=_0x4c1a84;VisuMZ[_0x1cfdf1(0x130)][_0x1cfdf1(0x102)][_0x1cfdf1(0x127)](this,_0x35a48d),this[_0x1cfdf1(0x151)]();},Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x151)]=function(){const _0x53e72f=_0x4c1a84;if(!this[_0x53e72f(0xc0)]())return;if(!VisuMZ[_0x53e72f(0x130)][_0x53e72f(0xb6)][_0x53e72f(0xaa)])return;this[_0x53e72f(0x115)]=new Window_VisualItemTooltip(this),SceneManager[_0x53e72f(0xb8)][_0x53e72f(0x120)](this[_0x53e72f(0x115)]);},VisuMZ['VisualItemInv'][_0x4c1a84(0x15d)]=Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xf7)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xf7)]=function(){const _0x4d5972=_0x4c1a84;VisuMZ[_0x4d5972(0x130)]['Window_ItemList_callUpdateHelp'][_0x4d5972(0x127)](this),this[_0x4d5972(0x115)]&&(this[_0x4d5972(0x115)][_0x4d5972(0xa5)](this[_0x4d5972(0x156)]()),this[_0x4d5972(0x12e)]&&this[_0x4d5972(0x115)][_0x4d5972(0xc3)]());},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0x108)]=Window_ItemList['prototype'][_0x4c1a84(0xfc)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xfc)]=function(_0x460910){const _0xe12fb6=_0x4c1a84;this[_0xe12fb6(0xc0)]()?this[_0xe12fb6(0x106)](_0x460910):VisuMZ[_0xe12fb6(0x130)][_0xe12fb6(0x108)][_0xe12fb6(0x127)](this,_0x460910);const _0x2cfcf1=this['itemRect'](_0x460910);this['drawBackgroundRect'](_0x2cfcf1);},Window_ItemList['prototype'][_0x4c1a84(0x106)]=function(_0x576110){const _0x3975ad=_0x4c1a84,_0x1e27e0=this[_0x3975ad(0x131)](_0x576110);if(!_0x1e27e0){VisuMZ['VisualItemInv']['Window_ItemList_drawItemBackground'][_0x3975ad(0x127)](this,_0x576110);return;}const _0x1b0ae8=VisuMZ[_0x3975ad(0x130)][_0x3975ad(0xcb)],_0x2f275a=_0x1e27e0[_0x3975ad(0xca)];let _0x591369=ColorManager[_0x3975ad(0xc1)](),_0x5ded64=ColorManager['itemBackColor2']();_0x2f275a[_0x3975ad(0xee)](_0x1b0ae8[_0x3975ad(0xa6)])&&(_0x591369=ColorManager[_0x3975ad(0xbd)](Number(RegExp['$1'])));_0x2f275a[_0x3975ad(0xee)](_0x1b0ae8[_0x3975ad(0x10e)])&&(_0x5ded64=ColorManager['textColor'](Number(RegExp['$1'])));_0x2f275a[_0x3975ad(0xee)](_0x1b0ae8[_0x3975ad(0x11d)])&&(_0x591369='#'+String(RegExp['$1']));_0x2f275a[_0x3975ad(0xee)](_0x1b0ae8['bgColorHex2'])&&(_0x5ded64='#'+String(RegExp['$1']));const _0x1899ab=this['itemRect'](_0x576110),_0x345eab=_0x1899ab['x'],_0x2fcead=_0x1899ab['y'],_0x2b3837=_0x1899ab[_0x3975ad(0x10a)],_0x780791=_0x1899ab['height'];this[_0x3975ad(0xa2)][_0x3975ad(0xa4)]=0xff,this[_0x3975ad(0xa2)]['gradientFillRect'](_0x345eab,_0x2fcead,_0x2b3837,_0x780791,_0x591369,_0x5ded64,!![]),this[_0x3975ad(0xa2)][_0x3975ad(0x158)](_0x345eab,_0x2fcead,_0x2b3837,_0x780791,_0x591369);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0x15a)]=function(_0x1dc3a9){const _0x4fdee7=_0x4c1a84;_0x1dc3a9=_0x1dc3a9[_0x4fdee7(0x10c)]('#','');_0x1dc3a9[_0x4fdee7(0xb1)]===0x3&&(_0x1dc3a9=_0x1dc3a9[0x0]+_0x1dc3a9[0x0]+_0x1dc3a9[0x1]+_0x1dc3a9[0x1]+_0x1dc3a9[0x2]+_0x1dc3a9[0x2]);var _0x260503=parseInt(_0x1dc3a9[_0x4fdee7(0xfd)](0x0,0x2),0x10),_0x34e2f2=parseInt(_0x1dc3a9['substring'](0x2,0x4),0x10),_0x43039c=parseInt(_0x1dc3a9[_0x4fdee7(0xfd)](0x4,0x6),0x10);return _0x4fdee7(0xb7)+_0x260503+','+_0x34e2f2+','+_0x43039c+','+_0x4fdee7(0xd3)+')';},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0x14e)]=Window_Base[_0x4c1a84(0x9e)]['drawItemNumber'],Window_Base[_0x4c1a84(0x9e)][_0x4c1a84(0x155)]=function(_0x1f965f,_0x20b9cb,_0x59ae68,_0xee061){const _0x50f8d3=_0x4c1a84;this[_0x50f8d3(0xc0)]&&this[_0x50f8d3(0xc0)]()?this['drawItemNumberVisualItemInventory'](_0x1f965f,_0x20b9cb,_0x59ae68,_0xee061):VisuMZ[_0x50f8d3(0x130)]['Window_Base_drawItemNumber'][_0x50f8d3(0x127)](this,_0x1f965f,_0x20b9cb,_0x59ae68,_0xee061);},Window_Base['prototype'][_0x4c1a84(0x150)]=function(_0x30ce48,_0x2cd60a,_0x227bd4,_0x4f20b4){const _0x59eef7=_0x4c1a84;if(this['isDrawItemNumber'](_0x30ce48)){this[_0x59eef7(0xdc)]();const _0x5963e1=VisuMZ[_0x59eef7(0xac)][_0x59eef7(0xb6)][_0x59eef7(0x14c)],_0x47fa6b=_0x5963e1['ItemQuantityFmt'],_0x21a9f3=_0x47fa6b[_0x59eef7(0x113)]($gameParty[_0x59eef7(0x12f)](_0x30ce48));this['contents'][_0x59eef7(0x135)]=_0x5963e1['ItemQuantityFontSize'],this['drawText'](_0x21a9f3,_0x2cd60a,_0x227bd4,_0x4f20b4,_0x59eef7(0xd6)),this[_0x59eef7(0x152)]();}},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xf9)]=Window_ItemList['prototype'][_0x4c1a84(0xd5)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0xd5)]=function(_0x4fff42){const _0x212fd3=_0x4c1a84;this[_0x212fd3(0xc0)]()?this[_0x212fd3(0x141)](_0x4fff42):VisuMZ['VisualItemInv'][_0x212fd3(0xf9)][_0x212fd3(0x127)](this,_0x4fff42);},Window_ItemList[_0x4c1a84(0x9e)]['placeItemNewLabelVisualItemInventory']=function(_0x581ce8){const _0x587a35=_0x4c1a84;if(!Imported['VisuMZ_1_ItemsEquipsCore'])return;const _0x3c98fd=this[_0x587a35(0x131)](_0x581ce8);if(!_0x3c98fd||!this['isShowNew']())return;if(!$gameParty[_0x587a35(0x107)](_0x3c98fd))return;const _0x7a722=this['itemRectWithPadding'](_0x581ce8),_0x5db25d=_0x7a722['x'],_0x2e0d38=_0x7a722['y'],_0x1b239a=VisuMZ[_0x587a35(0xac)][_0x587a35(0xb6)][_0x587a35(0xce)][_0x587a35(0x13c)],_0x1d8edf=VisuMZ[_0x587a35(0xac)][_0x587a35(0xb6)]['New'][_0x587a35(0x147)];this[_0x587a35(0x11f)](_0x3c98fd,_0x5db25d+_0x1b239a,_0x2e0d38+_0x1d8edf);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0x114)]=Window_ItemList['prototype'][_0x4c1a84(0x9f)],Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x9f)]=function(_0x4bb470){const _0x4a6559=_0x4c1a84;this[_0x4a6559(0xc0)]()?this[_0x4a6559(0x11c)](_0x4bb470):VisuMZ[_0x4a6559(0x130)][_0x4a6559(0x114)][_0x4a6559(0x127)](this,_0x4bb470);},Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x11c)]=function(_0x3bff97){const _0x17cd6b=_0x4c1a84;if(!Imported[_0x17cd6b(0x153)])return;const _0xfc47f6=this[_0x17cd6b(0x131)](_0x3bff97);if(!_0xfc47f6||!this[_0x17cd6b(0xf2)]())return;if(!$gameParty[_0x17cd6b(0xf6)](_0xfc47f6))return;const _0x5abaeb=this[_0x17cd6b(0x103)](_0x3bff97),_0x299d4c=_0x5abaeb['x'],_0x341cfe=_0x5abaeb['y'],_0x332278=VisuMZ['QuestSystem']['Settings'][_0x17cd6b(0x110)][_0x17cd6b(0x13c)],_0x44c5bd=VisuMZ[_0x17cd6b(0xb2)]['Settings'][_0x17cd6b(0x110)][_0x17cd6b(0x147)];this[_0x17cd6b(0x101)](_0xfc47f6,_0x299d4c+_0x332278,_0x341cfe+_0x44c5bd);},Window_ItemList[_0x4c1a84(0x9e)][_0x4c1a84(0x10b)]=function(_0x37a13a){const _0x17df15=_0x4c1a84,_0x34c8a4=this[_0x17df15(0x103)](_0x37a13a);this[_0x17df15(0x157)](this[_0x17df15(0x137)](null)),this[_0x17df15(0x152)]();const _0x4a9d93=Window_BattleItem['ITEM_AMPLIFY_SETTINGS'][_0x17df15(0xe0)];this['drawBigIcon'](_0x4a9d93,_0x34c8a4);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xd7)]=Window_EquipItem[_0x4c1a84(0x9e)][_0x4c1a84(0x15c)],Window_EquipItem[_0x4c1a84(0x9e)][_0x4c1a84(0x15c)]=function(){const _0x48bef8=_0x4c1a84;return this[_0x48bef8(0xc0)]()?Window_ItemList[_0x48bef8(0x9e)][_0x48bef8(0x15c)][_0x48bef8(0x127)](this):VisuMZ[_0x48bef8(0x130)][_0x48bef8(0xd7)][_0x48bef8(0x127)](this);},VisuMZ['VisualItemInv'][_0x4c1a84(0x119)]=Window_EquipItem[_0x4c1a84(0x9e)][_0x4c1a84(0xc5)],Window_EquipItem['prototype']['colSpacing']=function(){const _0x3ea14f=_0x4c1a84;return this['usesVisualItemInventory']()?Window_ItemList['prototype']['colSpacing'][_0x3ea14f(0x127)](this):VisuMZ['VisualItemInv']['Window_EquipItem_colSpacing'][_0x3ea14f(0x127)](this);},Window_EquipItem[_0x4c1a84(0x9e)]['drawRemoveItem']=function(_0x2810d2){const _0x58ba59=_0x4c1a84,_0x1fa918=this[_0x58ba59(0x103)](_0x2810d2),_0x34c037=VisuMZ['ItemsEquipsCore']['Settings']['EquipScene'],_0x4d0021=_0x34c037[_0x58ba59(0x154)];this[_0x58ba59(0x157)](![]),this[_0x58ba59(0x134)](_0x4d0021,_0x1fa918),this[_0x58ba59(0x157)](!![]);},VisuMZ[_0x4c1a84(0x130)]['Window_ShopSell_maxCols']=Window_ShopSell['prototype'][_0x4c1a84(0x15c)],Window_ShopSell['prototype'][_0x4c1a84(0x15c)]=function(){const _0x3f5238=_0x4c1a84;return this['usesVisualItemInventory']()?Window_ItemList['prototype'][_0x3f5238(0x15c)][_0x3f5238(0x127)](this):VisuMZ[_0x3f5238(0x130)][_0x3f5238(0x123)]['call'](this);},VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xe8)]=Window_ShopSell[_0x4c1a84(0x9e)][_0x4c1a84(0xc5)],Window_ShopSell['prototype'][_0x4c1a84(0xc5)]=function(){const _0x34a77a=_0x4c1a84;return this[_0x34a77a(0xc0)]()?Window_ItemList[_0x34a77a(0x9e)][_0x34a77a(0xc5)]['call'](this):VisuMZ[_0x34a77a(0x130)][_0x34a77a(0xe8)][_0x34a77a(0x127)](this);};function Window_VisualItemTooltip(){const _0x19efdb=_0x4c1a84;this[_0x19efdb(0xbb)](...arguments);}Window_VisualItemTooltip[_0x4c1a84(0x9e)]=Object['create'](Window_Base['prototype']),Window_VisualItemTooltip[_0x4c1a84(0x9e)][_0x4c1a84(0xa3)]=Window_VisualItemTooltip,Window_VisualItemTooltip[_0x4c1a84(0xea)]=VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xb6)][_0x4c1a84(0xff)],Window_VisualItemTooltip['BUFFER_WIDTH']=VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xb6)][_0x4c1a84(0x125)],Window_VisualItemTooltip['FONT_SIZE']=VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xb6)][_0x4c1a84(0x116)],Window_VisualItemTooltip[_0x4c1a84(0xa7)]=VisuMZ['VisualItemInv'][_0x4c1a84(0xb6)][_0x4c1a84(0xfa)],Window_VisualItemTooltip['OFFSET_Y']=VisuMZ[_0x4c1a84(0x130)][_0x4c1a84(0xb6)][_0x4c1a84(0xda)],Window_VisualItemTooltip['prototype'][_0x4c1a84(0xbb)]=function(_0xb9d3f1){const _0x3e109b=_0x4c1a84;this['_parentWindow']=_0xb9d3f1;const _0x30c671=new Rectangle(0x0,0x0,0x0,this['lineHeight']());Window_Base[_0x3e109b(0x9e)][_0x3e109b(0xbb)][_0x3e109b(0x127)](this,_0x30c671),this[_0x3e109b(0xf4)]=![],this['backOpacity']=0xff,this[_0x3e109b(0xa9)]=0xff,this[_0x3e109b(0xb3)]=null;},Window_VisualItemTooltip['prototype']['updatePadding']=function(){const _0x43cf3d=_0x4c1a84;this[_0x43cf3d(0xe3)]=0x0;},Window_VisualItemTooltip['prototype']['setItem']=function(_0x57a1f5){const _0x5780e5=_0x4c1a84;if(this[_0x5780e5(0xb3)]===_0x57a1f5&&!this[_0x5780e5(0x12e)])return;this[_0x5780e5(0xb3)]=_0x57a1f5,this['refresh']();},Window_VisualItemTooltip[_0x4c1a84(0x9e)][_0x4c1a84(0xfb)]=function(){const _0x4bd77d=_0x4c1a84;if(this[_0x4bd77d(0xc7)]&&this[_0x4bd77d(0xc7)][_0x4bd77d(0x12e)]){if(!this[_0x4bd77d(0xb3)])return!![];}return!!this[_0x4bd77d(0xb3)];},Window_VisualItemTooltip[_0x4c1a84(0x9e)][_0x4c1a84(0x128)]=function(){const _0x5cddd4=_0x4c1a84;if(this[_0x5cddd4(0xc7)]&&this[_0x5cddd4(0xc7)][_0x5cddd4(0x12e)]&&!this['_item'])return TextManager[_0x5cddd4(0xcc)];return this[_0x5cddd4(0xb3)]?this[_0x5cddd4(0xb3)][_0x5cddd4(0x13f)]:'';},Window_VisualItemTooltip[_0x4c1a84(0x9e)][_0x4c1a84(0xc3)]=function(){const _0x1dee4b=_0x4c1a84;this['contents'][_0x1dee4b(0x121)]();if(!this['refreshReturnCheck']())return;this[_0x1dee4b(0x152)](),this['contents'][_0x1dee4b(0x135)]=Window_VisualItemTooltip[_0x1dee4b(0x13d)];const _0x5cccc1=this[_0x1dee4b(0x128)](),_0x4bcdca=this[_0x1dee4b(0xae)](_0x5cccc1)+Window_VisualItemTooltip[_0x1dee4b(0xdb)];this[_0x1dee4b(0x10a)]=Math['ceil'](_0x4bcdca),this[_0x1dee4b(0x148)](),this[_0x1dee4b(0xcf)][_0x1dee4b(0x135)]=Window_VisualItemTooltip[_0x1dee4b(0x13d)];if(Imported[_0x1dee4b(0x149)]){const _0x33e950=ColorManager['getItemColor'](this[_0x1dee4b(0xb3)]);this[_0x1dee4b(0xb0)](_0x33e950);}this[_0x1dee4b(0x13b)](_0x5cccc1,0x0,0x0,this[_0x1dee4b(0x13e)],_0x1dee4b(0x11e)),this[_0x1dee4b(0xe5)](),this['setBackgroundType'](Window_VisualItemTooltip[_0x1dee4b(0xea)]);},Window_VisualItemTooltip[_0x4c1a84(0x9e)]['update']=function(){const _0x423503=_0x4c1a84;Window_Base[_0x423503(0x9e)][_0x423503(0x143)][_0x423503(0x127)](this),this[_0x423503(0xc6)](),this['updatePosition']();},Window_VisualItemTooltip['prototype'][_0x4c1a84(0xc6)]=function(){const _0x16cf94=_0x4c1a84,_0x5c30c6=this[_0x16cf94(0xf4)];this[_0x16cf94(0xf4)]=this[_0x16cf94(0xb3)]&&this[_0x16cf94(0xc7)][_0x16cf94(0x126)]&&this['_parentWindow'][_0x16cf94(0x15b)](),this[_0x16cf94(0xc7)]&&this[_0x16cf94(0xc7)][_0x16cf94(0x12e)]&&!this[_0x16cf94(0xb3)]&&(this[_0x16cf94(0xf4)]=!![]),_0x5c30c6!==this[_0x16cf94(0xf4)]&&SceneManager[_0x16cf94(0xb8)]['addChild'](this);},Window_VisualItemTooltip[_0x4c1a84(0x9e)]['updatePosition']=function(){const _0x141c0a=_0x4c1a84;if(!this[_0x141c0a(0xf4)])return;const _0x4fe72f=SceneManager[_0x141c0a(0xb8)][_0x141c0a(0x117)],_0x5009b3=this['_parentWindow'];let _0x211e8d=_0x5009b3['x']+_0x4fe72f['x'],_0x8f7267=_0x5009b3['y']+_0x4fe72f['y'];const _0x18ab77=_0x5009b3['_cursorRect'],_0x10f8dc=_0x5009b3[_0x141c0a(0x109)],_0x86ed04=_0x5009b3[_0x141c0a(0x11b)]['x'],_0x2ea9d0=_0x5009b3[_0x141c0a(0x11b)]['y'];_0x211e8d+=_0x18ab77['x']*_0x86ed04+_0x18ab77[_0x141c0a(0x10a)]*_0x86ed04/0x2-this['width']/0x2+_0x10f8dc['x']*_0x86ed04,_0x8f7267+=_0x18ab77['y']*_0x2ea9d0-this['height']+_0x10f8dc['y']*_0x2ea9d0;let _0x3762b0=_0x5009b3['y']+_0x4fe72f['y']-this[_0x141c0a(0x118)]+_0x5009b3[_0x141c0a(0xe3)]*_0x2ea9d0;_0x3762b0+=Window_VisualItemTooltip[_0x141c0a(0x9d)],_0x211e8d+=Window_VisualItemTooltip[_0x141c0a(0xa7)],_0x8f7267+=Window_VisualItemTooltip[_0x141c0a(0x9d)],this['x']=Math[_0x141c0a(0xad)](_0x211e8d)[_0x141c0a(0x140)](0x0,Graphics[_0x141c0a(0x10a)]-this[_0x141c0a(0x10a)]),this['y']=Math[_0x141c0a(0xad)](_0x8f7267)[_0x141c0a(0x140)](0x0,Graphics['height']-this[_0x141c0a(0x118)]);};