//=============================================================================
// Villa_MapLightAndShadow.js
// Copyright (c) 2024- 村人Ａ
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc マップに影と光を付与します。
 * @author 村人Ａ
 *
 * @param shadowTerrainTagId
 * @text 影をつける地形タグ
 * @desc 影をつける地形タグ番号を指定します。
 * @default 1
 * @type number
 * @max 7
 * @min 0
 *
 * @param roofTerrainTagId
 * @text 屋根・天井の地形タグ
 * @desc 影を描画しない屋根・天井につける地形タグ番号を指定します。
 * @default 2
 * @type number
 * @max 7
 * @min 0
 *
 * @param degreeVarId
 * @text 影の角度変数ID
 * @desc 影の角度を指定する変数のIDを指定します。
 * @default 1
 * @type variable
 *
 * @param blightnessVarId
 * @text 影の透過度変数ID
 * @desc 全体の透過度を指定する変数のIDを指定します。
 * @default 2
 * @type variable
 *
 * @param shadowColorRedVarId
 * @text 影の色赤成分変数ID
 * @desc 影の色の赤成分を指定する変数のIDを指定します。変数の値は-255~255で指定し、値が大きいほど赤みが強くなります。
 * @default 3
 * @type variable
 *
 * @param shadowColorGreenVarId
 * @text 影の色緑成分変数ID
 * @desc 影の色の緑成分を指定する変数のIDを指定します。変数の値は-255~255で指定し、値が大きいほど緑が強くなります。
 * @default 4
 * @type variable
 *
 * @param shadowColorBlueVarId
 * @text 影の色青成分変数ID
 * @desc 影の色の青成分を指定する変数のIDを指定します。変数の値は-255~255で指定し、値が大きいほど青みが強くなります。
 * @default 5
 * @type variable
 *
 * @param shadowDensityVarId
 * @text 影の濃さ変数ID
 * @desc 影の濃さを指定する変数のIDを指定します。値が大きいほど濃くなります。18程が丁度良い影の濃さになります。
 * @default 6
 * @type variable
 *
 * @param shadowBlurVarId
 * @text 影のぼかし強度変数ID
 * @desc 影のぼかし強度を指定する変数のIDを指定します。値が大きいほどぼかしが強くなります。100~200推奨。
 * @default 7
 * @type variable
 *
 * @param shadeDensityVarId
 * @text 陰の濃さ変数ID
 * @desc オブジェクト自体に出来る陰の濃さを指定する変数のIDを指定します。値は0~100で指定し、値が大きいほど濃くなります。７０程度推奨。
 * @default 8
 * @type variable
 *
 * @command onFilter
 * @text フィルターのON
 * @desc 影フィルターを適用開始します。
 *
 * @command offFilter
 * @text フィルターのOFF
 * @desc 影フィルターを解除します。
 *
 * @help
 * ============================================================================
 * ■ バージョン
 * ============================================================================
 * バージョン 1.0
 *
 * ============================================================================
 *  ◇ 機能概要
 * ============================================================================
 *  ● 地形タグとゲーム変数だけで “壁影・物体影・キャラ影・陰影” をリアルタイム
 *    演算
 *  ● キャラチップは 1 マス 512px まで対応、茂みや踏破アニメも追従
 *  ● 光源角・色味・濃度・ぼかし・陰影をイベントから即時変更可能
 *  ● マップ２枚を自動キャッシュ、再訪は高速ロード
 *
 * ============================================================================
 *  ■ 導入手順
 * ============================================================================
 *  1. タイルマップに地形タグ設定  
 *     影を落とす面       … プラグインパラメータ「影をつける地形タグ」の番号を
 *     設定
 *     屋根・天井など影なし … プラグインパラメータ「屋根・天井の地形タグ」の番
 *     号を設定
 *  2. 影を出したくないイベントのメモ欄に <noShadow> を記述
 *  3. 以下パラメータ用の “ゲーム変数” を用意
 *  4. マップ開始時または任意タイミングで
 *        プラグインコマンド【フィルターのON】→ 影＋ライティング適用
 *        プラグインコマンド【フィルターのOFF】→ 無効化・解放
 *
 * ============================================================================
 *  ■ プラグインコマンド
 * ============================================================================
 *  ◆ フィルターのON   … 影フィルターを適用
 *  ◆ フィルターのOFF  … 影フィルター解除
 *
 * ============================================================================
 *  ■ パラメータ（すべて “ゲーム変数” で制御）
 * ============================================================================
 *   影の角度変数ID       : 影角度           0～359°（0°=下）※直角は自動 ±3°
 *   影の透過度変数ID     : 影の透過度       0(透明)～255(不透明)
 *   影の色赤成分変数ID   : 影色 赤          -255～255
 *   影の色緑成分変数ID   : 影色 緑          -255～255
 *   影の色青成分変数ID   : 影色 青          -255～255
 *   影の濃さ変数ID       : ドロップ影濃度   推奨 18
 *   影のぼかし強度変数ID : 影ぼかし半径     推奨 100～200（値÷100 px）
 *   陰の濃さ変数ID       : 物体陰影濃度     0～100  推奨 70
 *
 * ============================================================================
 *  ■ 描画仕様
 * ============================================================================
 *  ● 壁・物体影  
 *    ‐ “影タグ” が付いたタイルを基準に最大６マス分まで生成  
 *    ‐ “屋根タグ” が付いたタイルからは影を非表示
 *
 *  ● キャラクター影  
 *    ‐ 512px まで対応、茂み表現にも追従  
 *    ‐ <noShadow> イベントは除外
 *
 *  ● 陰（オブジェクト上面の暗部）  
 *    ‐ 陰の濃さ変数IDで濃さを独立制御し乗算合成
 *
 * ============================================================================
 *  ■ ぼかしと画質
 * ============================================================================
 *  0～100 でパキッとした影にするとズーム時に透明な筋が出ることがあります。  
 *  100～200 が自然で安定します。
 *
 * ============================================================================
 *  ■ 非対応・制限事項
 * ============================================================================
 *   × 屋根上オブジェクト／壁面投影／複雑多段地形  
 *   × A2 柵の縦連結・坂／斜め階段  
 *   × ７マス超の高層建築  
 *   × アーチ状建物の影  
 *   × マップ縮小(<1.0)・動的マップサイズ変更  
 *   × 0/90/180/270° は ±3° に補正 → 回転時カクつき
 *
 * ============================================================================
 *  ■ パフォーマンス
 * ============================================================================
 *  直近２マップをキャッシュ、再訪は生成スキップ。  
 *  OFF コマンドでテクスチャを完全解放し負荷ゼロ。
 *
 * ============================================================================
 *  ■ Q & A
 * ============================================================================
 *  Q. 屋根横に突き出した煙突の影を出したい  
 *     → 煙突を付ける高さ分の空白マスを用意し、建物＋空白をセットで配置
 *
 *  Q. アーチ状タイルに影を落としたい  
 *     → 建物ごと BCDE レイヤに１枚絵登録で簡易的に対応
 *
 *  Q. スケルトン建造物の内部を暗くしたい  
 *     → 透過 50% 超の塗りつぶしタイルを内部に敷いて陰影を演出
 *
 *  Q. レイヤ合成で影が欠ける  
 *     → 元から合成した１枚タイルにして配置
 *
 * ============================================================================
 * ■ 注意事項
 * ============================================================================
 * - 他のフィルター系プラグインと競合する可能性があります。
 * - 高負荷なエフェクトのため、低スペック環境では処理落ちの可能性があります。
 *
 * ============================================================================
 * ■ 規約
 * ============================================================================
 * プラグインの使用規約は「GGG製品利用規約」の「素材利用条件」並びに当サイトの
 * 規約ページをご確認ください。
 *
 * GGG製品利用規約
 * https://rpgmakerofficial.com/support/rule/
 *
 * 有料プラグイン使用規約
 * https://www.rpgmaker-script-wiki.xyz/kiyakuForPaid.php
 *
 * ============================================================================
 * ■ 不具合報告
 * ============================================================================
 * 不具合が発生した場合は以下の方法でご報告くださると助かります。
 *
 * RPG Maker Officialお問い合わせフォーム
 * https://rpgmakerofficial.com/support/contact/
 *
 */
 
 /*:
 * @target MZ
 * @plugindesc Adds dynamic shadows and lighting to maps.
 * @author Murabito A
 *
 * @param shadowTerrainTagId
 * @text Terrain Tag for Shadow Casting
 * @desc Specifies the terrain tag ID used for tiles that cast shadows.
 * @default 1
 * @type number
 * @max 7
 * @min 0
 *
 * @param roofTerrainTagId
 * @text Terrain Tag for Roof / Ceiling
 * @desc Specifies the terrain tag ID for roofs or ceilings where shadows are not rendered.
 * @default 2
 * @type number
 * @max 7
 * @min 0
 *
 * @param degreeVarId
 * @text Shadow Angle Variable ID
 * @desc Specifies the game variable ID used to control the shadow angle.
 * @default 1
 * @type variable
 *
 * @param blightnessVarId
 * @text Shadow Opacity Variable ID
 * @desc Specifies the game variable ID used to control overall shadow opacity.
 * @default 2
 * @type variable
 *
 * @param shadowColorRedVarId
 * @text Shadow Color Red Variable ID
 * @desc Specifies the variable ID for the red component of the shadow color.
 *       Variable range: -255 to 255. Higher values increase redness.
 * @default 3
 * @type variable
 *
 * @param shadowColorGreenVarId
 * @text Shadow Color Green Variable ID
 * @desc Specifies the variable ID for the green component of the shadow color.
 *       Variable range: -255 to 255. Higher values increase greenness.
 * @default 4
 * @type variable
 *
 * @param shadowColorBlueVarId
 * @text Shadow Color Blue Variable ID
 * @desc Specifies the variable ID for the blue component of the shadow color.
 *       Variable range: -255 to 255. Higher values increase blueness.
 * @default 5
 * @type variable
 *
 * @param shadowDensityVarId
 * @text Shadow Density Variable ID
 * @desc Specifies the variable ID for drop shadow density.
 *       Higher values produce darker shadows. Recommended value: around 18.
 * @default 6
 * @type variable
 *
 * @param shadowBlurVarId
 * @text Shadow Blur Strength Variable ID
 * @desc Specifies the variable ID for shadow blur strength.
 *       Higher values increase blur. Recommended range: 100–200.
 * @default 7
 * @type variable
 *
 * @param shadeDensityVarId
 * @text Shading Density Variable ID
 * @desc Specifies the variable ID controlling shading on object surfaces.
 *       Range: 0–100. Higher values produce darker shading. Recommended: around 70.
 * @default 8
 * @type variable
 *
 * @command onFilter
 * @text Filter ON
 * @desc Activates the shadow and lighting filter.
 *
 * @command offFilter
 * @text Filter OFF
 * @desc Deactivates and releases the shadow filter.
 *
 * @help
 * ============================================================================
 * ■ Version
 * ============================================================================
 * Version 1.0
 *
 * ============================================================================
 *  ◇ Overview
 * ============================================================================
 *  ● Real-time calculation of wall shadows, object shadows, character shadows,
 *    and surface shading using only terrain tags and game variables.
 *  ● Character sprites up to 512px per tile are supported, including bush and
 *    stepping animations.
 *  ● Light angle, color, density, blur, and shading can be changed instantly
 *    via events.
 *  ● Automatically caches the last two maps for fast revisits.
 *
 * ============================================================================
 *  ■ Setup Instructions
 * ============================================================================
 *  1. Assign terrain tags to tiles
 *     Tiles that cast shadows:
 *       Set the terrain tag number specified by the plugin parameter
 *       “Terrain Tag for Shadow Casting”.
 *     Roofs / ceilings without shadows:
 *       Set the terrain tag number specified by
 *       “Terrain Tag for Roof / Ceiling”.
 *
 *  2. Add <noShadow> to the note field of events that should not cast shadows.
 *
 *  3. Prepare the required game variables for controlling parameters.
 *
 *  4. At map start or any desired timing:
 *       Plugin Command [Filter ON]  → Enable shadows and lighting
 *       Plugin Command [Filter OFF] → Disable and release resources
 *
 * ============================================================================
 *  ■ Plugin Commands
 * ============================================================================
 *  ◆ Filter ON   … Enables the shadow filter
 *  ◆ Filter OFF  … Disables the shadow filter
 *
 * ============================================================================
 *  ■ Parameters (All controlled via Game Variables)
 * ============================================================================
 *   Shadow Angle Variable ID        : Shadow angle        0–359°
 *                                    (0° = downward; right angles auto-adjust ±3°)
 *   Shadow Opacity Variable ID      : Shadow opacity      0 (transparent) – 255 (opaque)
 *   Shadow Color Red Variable ID    : Shadow color (Red)  -255 – 255
 *   Shadow Color Green Variable ID  : Shadow color (Green)-255 – 255
 *   Shadow Color Blue Variable ID   : Shadow color (Blue) -255 – 255
 *   Shadow Density Variable ID      : Drop shadow density Recommended: 18
 *   Shadow Blur Strength Variable ID: Blur radius         Recommended: 100–200
 *                                     (value ÷ 100 = pixels)
 *   Shading Density Variable ID     : Surface shading     0–100  Recommended: 70
 *
 * ============================================================================
 *  ■ Rendering Specifications
 * ============================================================================
 *  ● Wall / Object Shadows
 *    - Generated up to a maximum of 6 tiles based on tiles with the shadow tag.
 *    - Shadows are not rendered from tiles with the roof tag.
 *
 *  ● Character Shadows
 *    - Supports sprites up to 512px and follows bush rendering.
 *    - Events with <noShadow> are excluded.
 *
 *  ● Shading (Darkened surfaces)
 *    - Shading density is controlled independently and composited via multiply.
 *
 * ============================================================================
 *  ■ Blur and Image Quality
 * ============================================================================
 *  Using values between 0–100 may cause visible transparent streaks during zoom.
 *  Values between 100–200 provide stable and natural results.
 *
 * ============================================================================
 *  ■ Unsupported / Limitations
 * ============================================================================
 *   × Objects placed on roofs / wall projection / complex multi-layer terrain
 *   × Vertically connected A2 fences / slopes / diagonal stairs
 *   × Buildings taller than 7 tiles
 *   × Arch-shaped building shadows
 *   × Map scaling (<1.0) or dynamic map size changes
 *   × Angles of 0 / 90 / 180 / 270 degrees are corrected by ±3°
 *     to avoid rendering artifacts
 *
 * ============================================================================
 *  ■ Performance
 * ============================================================================
 *  The two most recent maps are cached; revisits skip regeneration.
 *  Using the OFF command fully releases textures, resulting in zero overhead.
 *
 * ============================================================================
 *  ■ Q & A
 * ============================================================================
 *  Q. I want shadows for chimneys protruding from roofs.
 *     → Leave empty tiles equal to the chimney height and place them together
 *       with the building.
 *
 *  Q. I want shadows on arch-shaped tiles.
 *     → Register the entire building as a single image on the BCDE layer.
 *
 *  Q. I want to darken the interior of skeletal structures.
 *     → Place semi-transparent (over 50%) fill tiles inside to simulate shading.
 *
 *  Q. Shadows are missing when using layer compositing.
 *     → Pre-compose tiles into a single image before placement.
 *
 * ============================================================================
 * ■ Notes
 * ============================================================================
 * - May conflict with other filter-based plugins.
 * - This is a high-load effect; performance may degrade on low-spec environments.
 *
 * ============================================================================
 * ■ Terms of Use
 * ============================================================================
 * Please review the "Material Terms and Conditions" section of 
 * the GGG Products Terms and Condition, as well as the terms page on this 
 * website, for details regarding plugin usage.
 *
 * GGG Product Terms of Use
 * https://rpgmakerofficial.com/support/rule/
 *
 * Paid Plugin Terms of Use
 * https://www.rpgmaker-script-wiki.xyz/en_kiyakuForPaid.php
 *
 * ============================================================================
 * ■ Bug Reports
 * ============================================================================
 * If you encounter any issues or bugs, please report them using the method below.
 *
 * RPG Maker Official Contact Form
 * https://rpgmakerofficial.com/en/contactform/
 *
 */

 
 const _0x22037d=_0x948b;(function(_0x18330a,_0x21119e){const _0x482bf0=_0x948b,_0x2f5a2f=_0x18330a();while(!![]){try{const _0x1258b7=-parseInt(_0x482bf0(0x18b))/0x1*(parseInt(_0x482bf0(0x208))/0x2)+parseInt(_0x482bf0(0x1db))/0x3*(parseInt(_0x482bf0(0x15f))/0x4)+parseInt(_0x482bf0(0x1b5))/0x5+-parseInt(_0x482bf0(0x202))/0x6*(parseInt(_0x482bf0(0x169))/0x7)+-parseInt(_0x482bf0(0x1a7))/0x8*(parseInt(_0x482bf0(0x194))/0x9)+-parseInt(_0x482bf0(0x164))/0xa+parseInt(_0x482bf0(0x1aa))/0xb*(parseInt(_0x482bf0(0x1a3))/0xc);if(_0x1258b7===_0x21119e)break;else _0x2f5a2f['push'](_0x2f5a2f['shift']());}catch(_0x221ce3){_0x2f5a2f['push'](_0x2f5a2f['shift']());}}}(_0x37a9,0x56860));function _0x948b(_0x5b80fb,_0x499d7d){const _0x7c9e23=_0x37a9();return _0x948b=function(_0x418bf5,_0x28a7b0){_0x418bf5=_0x418bf5-0x155;let _0x37a941=_0x7c9e23[_0x418bf5];return _0x37a941;},_0x948b(_0x5b80fb,_0x499d7d);}const _0x28a7b0=(function(){let _0x4a465b=!![];return function(_0x34f898,_0x400ec6){const _0x24da02=_0x4a465b?function(){if(_0x400ec6){const _0xdf5099=_0x400ec6['apply'](_0x34f898,arguments);return _0x400ec6=null,_0xdf5099;}}:function(){};return _0x4a465b=![],_0x24da02;};}()),_0x418bf5=_0x28a7b0(this,function(){const _0x483d9a=_0x948b;return _0x418bf5['toString']()['search'](_0x483d9a(0x17d))[_0x483d9a(0x160)]()['constructor'](_0x418bf5)[_0x483d9a(0x1b6)](_0x483d9a(0x17d));});function _0x37a9(){const _0x6b1563=['origin','setHighQualityShadowFilter','filters','isTileA3','removeShadowSprites','_charShadeRenderTexture','a10','CLAMP','length','renderer','_isTableTile','getTileInfoAt','RenderTexture','characterBlockX','Filter','setCharacterMaskUVAdj','WALL_AUTOTILE_TABLE','#000000','refresh','SCALE_MODES','canvas','BLEND_MODES','_character','tileHeight','a17','find','constructor','zoomY','updateCharacterFrame','destination-out','7マス以上の高さの建物には対応していません。当該マス\x20x:','_characterName','initialize','use\x20strict','shadowBitmapSpriteArray','_characterSprites','cos','uCharShadeTexture','24EboSjs','registerCommand','MIPMAP_MODES','indexOf','create','mapId','2fQBJvL','shadowColorRedVarId','_spriteset','createCharacters','shadowColorBlueVarId','shake','TILE_ID_D','characterShadowFilter','save','a22','shadeBitmapSprite','b13','zoomScale','removeCharactersShadow','patternHeight','destroy','uniforms','TILE_ID_C','a11','tileset','baseTexture','height','bitmap','\x0a\x20\x20\x20\x20\x20\x20\x20\x20precision\x20mediump\x20float;\x0a\x09\x09\x0a\x20\x20\x20\x20\x20\x20\x20\x20varying\x20vec2\x20vTextureCoord;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20c1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a0;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a1;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a2;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a3;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a4;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a5;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a6;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a7;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a8;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a9;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a10;\x0a\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20a11;\x0a\x09\x09uniform\x20vec3\x20a12;\x0a\x09\x09uniform\x20vec3\x20a13;\x0a\x09\x09uniform\x20vec2\x20a14;\x0a\x09\x09uniform\x20vec2\x20a15;\x0a\x09\x09uniform\x20vec2\x20a16;\x0a\x09\x09uniform\x20vec2\x20a17;\x0a\x09\x09uniform\x20vec2\x20a18;\x0a\x09\x09uniform\x20vec2\x20a19;\x0a\x09\x09uniform\x20vec2\x20a20;\x0a\x09\x09uniform\x20vec2\x20a21;\x0a\x09\x09uniform\x20vec2\x20a22;\x0a\x09\x09vec3\x20f1(float\x20_0,\x20float\x20_1,\x20float\x20_2)\x20{\x0a\x09\x09\x09float\x20_3\x20=\x20floor(_0\x20/\x20_1)\x20*\x20_1;\x0a\x09\x09\x09float\x20_4\x20=\x20(_0\x20-\x20_3)\x20/\x20_1;\x0a\x09\x09\x09float\x20_5\x20=\x201.0\x20-\x20(1.0\x20-\x20_4)\x20*\x20_2;\x0a\x09\x09\x09float\x20_6\x20=\x20step(0.0,\x20_5)\x20*\x20step(_5,\x201.0);\x0a\x09\x09\x09return\x20vec3(_6,\x20_3\x20+\x20_5\x20*\x20_1,\x20_5);\x0a\x09\x09}\x0a\x0a\x09\x09float\x20f2(float\x20x)\x20{\x0a\x09\x09\x09return\x20x\x20-\x202.0\x20*\x20floor(x\x20*\x200.5);\x0a\x09\x09}\x0a\x09\x09\x0a\x20\x20\x20\x20\x20\x20\x20\x20void\x20main(void)\x20{\x0a\x09\x09\x09vec2\x20a23\x20=\x20vTextureCoord\x20*\x20a18;\x0a\x09\x09\x09vec2\x20a24\x20\x20\x20\x20=\x20a23\x20+\x20a20;\x0a\x09\x09\x09vec2\x20a25\x20\x20\x20\x20\x20\x20\x20=\x20a24\x20/\x20a21;\x0a\x09\x09\x09float\x20PI\x20=\x203.1415926;\x0a\x09\x09\x09vec3\x20a26\x20=\x20normalize(a12);\x0a\x09\x09\x09float\x20a27\x20=\x20abs(a26.x\x20/\x20a26.z);\x0a\x09\x09\x09float\x20a28\x20=\x20abs(a26.y\x20/\x20a26.z);\x0a\x09\x09\x09float\x20a29\x20=\x20sign(a26.x);\x0a\x09\x09\x09float\x20a30\x20=\x20sign(a26.y);\x0a\x09\x09\x09float\x20a31\x20=\x20step(0.0,\x20a26.y);\x0a\x09\x09\x09float\x20a32\x20=\x20a18.x\x20/\x20a15.x;\x0a\x09\x09\x09float\x20a33\x20=\x20a18.y\x20/\x20a15.y;\x0a\x09\x09\x09float\x20a34\x20=\x201.0\x20/\x20a32;\x0a\x09\x09\x09float\x20a35\x20=\x201.0\x20/\x20a33;\x0a\x09\x09\x09float\x20a36\x20=\x20a14.x;\x0a\x09\x09\x09float\x20a37\x20=\x20a14.y;\x0a\x09\x09\x09float\x20a38\x20=\x201.0\x20/\x20a36;\x0a\x09\x09\x09float\x20a39\x20=\x201.0\x20/\x20a37;\x0a\x09\x09\x09float\x20a40\x20=\x20a38*0.0;\x0a\x09\x09\x09float\x20a41\x20=\x20a39*0.0;\x0a\x09\x09\x09float\x20a42\x20=\x20a39*(0.24999);//0.396;//\x0a\x09\x09\x09float\x20a43\x20=\x20atan(a26.x,\x20a26.y);\x0a\x09\x09\x09float\x20a44\x20=\x20abs(1.0\x20/\x20tan(a43))\x20*\x20(a37\x20/\x20a36);\x0a\x09\x09\x09float\x20a45\x20=\x20abs(tan(a43))\x20*\x20(a36\x20/\x20a37);\x0a\x09\x09\x09float\x20a46\x20=\x20sign(a43+PI\x20*\x20a30);\x0a\x09\x09\x09float\x20a47\x20=\x20sign(-a43);\x0a\x09\x09\x09float\x20a48\x20=\x201.0\x20+\x200.0\x20+\x20a44;\x0a\x09\x09\x09float\x20a49\x20=\x201.0\x20+\x200.0\x20+\x20a45;\x0a\x09\x09\x09float\x20a50\x20=\x20(1.0\x20-\x201.0/(1.0\x20+\x20a44))\x20*\x20a38;\x0a\x09\x09\x09float\x20a51\x20=\x20(1.0\x20-\x201.0/(1.0\x20+\x20a45))\x20*\x20a39;\x0a\x09\x09\x09float\x20a52\x20=\x20floor(a50\x20*\x20a21.x\x20+\x200.5)\x20/\x20a21.x;\x0a\x09\x09\x09float\x20a53\x20=\x20floor(a51\x20*\x20a21.y\x20+\x200.5)\x20/\x20a21.y;\x0a\x09\x09\x09vec2\x20a54\x20=\x20a25\x20-\x20vec2(0.5);\x0a\x09\x09\x09float\x20a55\x20=\x20f2(a14.y)\x20==\x200.0\x20?\x200.0\x20:\x20(a18.y/a15.y)\x20/\x20(2.0\x20*\x20a14.y);\x0a\x09\x09\x09float\x20a56\x20=\x20f2(a14.x)\x20==\x200.0\x20?\x200.0\x20:\x20(a18.x/a15.x)\x20/\x20(2.0\x20*\x20a14.x);\x0a\x09\x09\x09vec2\x20a57\x20=\x20vec2(\x0a\x09\x09\x09\x09a54.x,\x20\x0a\x09\x09\x09\x09mod(a54.y\x20+\x20a35*a55\x20+\x20a41,\x20a39)\x0a\x09\x09\x09);\x0a\x09\x09\x09vec2\x20a58\x20=\x20vec2(\x0a\x09\x09\x09\x09a54.x,\x20\x0a\x09\x09\x09\x09mod(a54.y\x20+\x20a35*a55\x20+\x20a42,\x20a39)\x0a\x09\x09\x09);\x0a\x09\x09\x09float\x20a59\x20=\x20mod(a54.x\x20+\x20a34*a56,\x20a38)\x20*\x20step(a43,\x200.0);\x0a\x09\x09\x09float\x20a60\x20=\x20(a38\x20-\x20mod(a54.x\x20-\x20a34*a56,\x20a38))\x20*\x20step(0.0,\x20a43);\x0a\x09\x09\x09vec2\x20a61\x20=\x20vec2(\x0a\x09\x09\x09\x09a59\x20+\x20a60,\x20\x0a\x09\x09\x09\x09a54.y\x0a\x09\x09\x09);\x0a\x09\x09\x09\x0a\x09\x09\x09vec3\x20a62\x20=\x20normalize(vec3(a58,\x20-1.0));\x0a\x09\x09\x09vec3\x20a63\x20=\x20vec3(0.0,\x200.0,\x200.5);\x0a\x09\x09\x09vec3\x20a64\x20=\x20normalize(vec3(a57,\x20-1.0));\x0a\x09\x09\x09vec3\x20a65\x20=\x20vec3(0.0,\x200.0,\x200.5);\x0a\x09\x09\x09vec3\x20a66\x20=\x20normalize(vec3(a61,\x20-1.0));\x0a\x09\x09\x09float\x20halfPI\x20=\x20PI\x20/\x202.0;\x0a\x09\x09\x09\x0a\x09\x09\x09float\x20a67\x20=\x20cos(halfPI),\x20a68\x20=\x20sin(halfPI);\x0a\x09\x09\x09mat3\x20a69\x20=\x20mat3(\x0a\x09\x09\x09\x091.0,\x200.0,\x200.0,\x0a\x09\x09\x09\x090.0,\x20\x20a67,\x20\x20a68,\x0a\x09\x09\x09\x090.0,\x20-a68,\x20\x20a67\x0a\x09\x09\x09);\x0a\x0a\x09\x09\x09float\x20a70\x20=\x20cos(halfPI),\x20a71\x20=\x20sin(halfPI);\x0a\x09\x09\x09mat3\x20rotY\x20=\x20mat3(\x0a\x09\x09\x09\x09\x20a70,\x200.0,\x20-a71,\x0a\x09\x09\x09\x090.0,\x201.0,\x200.0,\x0a\x09\x09\x09\x09a71,\x200.0,\x20a70\x0a\x09\x09\x09);\x0a\x09\x09\x09//\x20オブジェクト影\x0a\x09\x09\x09mat3\x20a72\x20=\x20a69;\x20\x0a\x09\x09\x09vec3\x20a73\x20=\x20a63\x20+\x20((-0.5\x20-\x20a63.z)\x20/\x20a62.z)\x20*\x20a62;\x0a\x09\x09\x09vec3\x20a74\x20=\x20a72\x20*\x20a73;\x0a\x09\x09\x09vec3\x20a75\x20=\x20a72\x20*\x20a12;\x0a\x09\x09\x09vec3\x20a76\x20=\x20a75\x20-\x20a74;\x0a\x09\x09\x09float\x20a77\x20=\x20a74.z\x20/\x20a76.z;\x0a\x09\x09\x09vec3\x20a78\x20=\x20a74\x20+\x20a77\x20*\x20a76;\x0a\x09\x09\x09float\x20a79\x20=\x20a78.x\x20+\x200.5;\x0a\x09\x09\x09vec3\x20a80\x20=\x20-\x20a76\x20*\x20(a72\x20*\x20vec3(0.0,\x20a39,\x200.0)).z\x20/\x20a76.z;\x0a\x09\x09\x09\x0a\x09\x09\x09float\x20a81\x20=\x20a25.y\x20+\x20a42\x20-\x20a53\x20*\x20a46\x20*\x200.0;\x0a\x09\x09\x09float\x20a82\x20=\x20a25.y\x20+\x20a42\x20-\x20a53\x20*\x20a46\x20*\x201.0;\x0a\x09\x09\x09float\x20a83\x20=\x20a25.y\x20+\x20a42\x20-\x20a53\x20*\x20a46\x20*\x202.0;\x0a\x09\x09\x09float\x20a84\x20=\x20a25.y\x20+\x20a42\x20-\x20a53\x20*\x20a46\x20*\x203.0;\x0a\x09\x09\x09float\x20a85\x20=\x20a25.y\x20+\x20a42\x20-\x20a53\x20*\x20a46\x20*\x204.0;\x0a\x09\x09\x09float\x20a86\x20=\x20a25.y\x20+\x20a42\x20-\x20a53\x20*\x20a46\x20*\x205.0;\x0a\x0a\x09\x09\x09float\x20a87\x20=\x20a46\x20*\x20mod(a81,\x20a39)\x20+\x20floor(a81\x20/\x20a39)\x20*\x20a39;\x0a\x09\x09\x09float\x20a88\x20=\x20a46\x20*\x20mod(a82,\x20a39)\x20+\x20floor(a82\x20/\x20a39)\x20*\x20a39;\x0a\x09\x09\x09float\x20a89\x20=\x20a46\x20*\x20mod(a83,\x20a39)\x20+\x20floor(a83\x20/\x20a39)\x20*\x20a39;\x0a\x09\x09\x09float\x20a90\x20=\x20a46\x20*\x20mod(a84,\x20a39)\x20+\x20floor(a84\x20/\x20a39)\x20*\x20a39;\x0a\x09\x09\x09float\x20a91\x20=\x20a46\x20*\x20mod(a85,\x20a39)\x20+\x20floor(a85\x20/\x20a39)\x20*\x20a39;\x0a\x09\x09\x09float\x20a92\x20=\x20a46\x20*\x20mod(a86,\x20a39)\x20+\x20floor(a86\x20/\x20a39)\x20*\x20a39;\x0a\x0a\x09\x09\x09vec3\x20a93\x20=\x20f1(a87,\x20a39,\x20a49);\x0a\x09\x09\x09vec3\x20a94\x20=\x20f1(a88,\x20a39,\x20a49);\x0a\x09\x09\x09vec3\x20a95\x20=\x20f1(a89,\x20a39,\x20a49);\x0a\x09\x09\x09vec3\x20a96\x20=\x20f1(a90,\x20a39,\x20a49);\x0a\x09\x09\x09vec3\x20a97\x20=\x20f1(a91,\x20a39,\x20a49);\x0a\x09\x09\x09vec3\x20a98\x20=\x20f1(a92,\x20a39,\x20a49);\x0a\x0a\x09\x09\x09vec2\x20a99\x20=\x20vec2(a79,\x20a93.t\x20+\x20a80.z\x20-\x20(step(0.0,\x20a30)\x20-\x201.0)\x20*\x20a39);\x0a\x09\x09\x09vec2\x20a100\x20=\x20vec2(a79,\x20a94.t\x20+\x20a80.z\x20-\x20(step(0.0,\x20a30)\x20-\x200.0)\x20*\x20a39);\x0a\x09\x09\x09vec2\x20a101\x20=\x20vec2(a79,\x20a95.t\x20+\x20a80.z\x20-\x20(step(0.0,\x20a30)\x20+\x201.0)\x20*\x20a39);\x0a\x09\x09\x09vec2\x20a102\x20=\x20vec2(a79,\x20a96.t\x20+\x20a80.z\x20-\x20(step(0.0,\x20a30)\x20+\x202.0)\x20*\x20a39);\x0a\x09\x09\x09vec2\x20a103\x20=\x20vec2(a79,\x20a97.t\x20+\x20a80.z\x20-\x20(step(0.0,\x20a30)\x20+\x203.0)\x20*\x20a39);\x0a\x09\x09\x09vec2\x20a104\x20=\x20vec2(a79,\x20a98.t\x20+\x20a80.z\x20-\x20(step(0.0,\x20a30)\x20+\x204.0)\x20*\x20a39);\x0a\x09\x09\x09\x0a\x09\x09\x09float\x20a105\x20=\x200.0;\x0a\x09\x09\x09float\x20a106\x20=\x20a105\x20+\x20a93.s;\x0a\x09\x09\x09float\x20a107\x20=\x20a106\x20+\x20a94.s;\x0a\x09\x09\x09float\x20a108\x20=\x20a107\x20+\x20a95.s;\x0a\x09\x09\x09float\x20a109\x20=\x20a108\x20+\x20a96.s;\x0a\x09\x09\x09float\x20a110\x20=\x20a109\x20+\x20a97.s;\x0a\x09\x09\x09\x0a\x09\x09\x09a99\x20+=\x20vec2(\x0a\x09\x09\x09\x09(a105\x20+\x20a93.s\x20*\x20a31)\x20*\x20a46\x20*\x20a80.x,\x20\x0a\x09\x09\x09\x09a39\x20*\x20(a46\x20*\x200.0\x20+\x20a31)\x0a\x09\x09\x09);\x0a\x09\x09\x09a100\x20+=\x20vec2(\x0a\x09\x09\x09\x09(a106\x20+\x20a94.s\x20*\x20a31)\x20*\x20a46\x20*\x20a80.x,\x20\x0a\x09\x09\x09\x09a39\x20*\x20(a46\x20*\x201.0\x20+\x20a31)\x0a\x09\x09\x09);\x0a\x09\x09\x09a101\x20+=\x20vec2(\x0a\x09\x09\x09\x09(a107\x20+\x20a95.s\x20*\x20a31)\x20*\x20a46\x20*\x20a80.x,\x20\x0a\x09\x09\x09\x09a39\x20*\x20(a46\x20*\x202.0\x20+\x20a31)\x0a\x09\x09\x09);\x0a\x09\x09\x09a102\x20+=\x20vec2(\x0a\x09\x09\x09\x09(a108\x20+\x20a96.s\x20*\x20a31)\x20*\x20a46\x20*\x20a80.x,\x20\x0a\x09\x09\x09\x09a39\x20*\x20(a46\x20*\x203.0\x20+\x20a31)\x0a\x09\x09\x09);\x0a\x09\x09\x09a103\x20+=\x20vec2(\x0a\x09\x09\x09\x09(a109\x20+\x20a97.s\x20*\x20a31)\x20*\x20a46\x20*\x20a80.x,\x20\x0a\x09\x09\x09\x09a39\x20*\x20(a46\x20*\x204.0\x20+\x20a31)\x0a\x09\x09\x09);\x0a\x09\x09\x09a104\x20+=\x20vec2(\x0a\x09\x09\x09\x09(a110\x20+\x20a98.s\x20*\x20a31)\x20*\x20a46\x20*\x20a80.x,\x20\x0a\x09\x09\x09\x09a39\x20*\x20(a46\x20*\x205.0\x20+\x20a31)\x0a\x09\x09\x09);\x0a\x09\x09\x09\x0a\x09\x09\x09float\x20ob_shadow0\x20=\x20texture2D(a0,\x20a99).a\x20*\x20a93.s;\x0a\x09\x09\x09float\x20a112\x20=\x20texture2D(a1,\x20a100).a\x20*\x20a94.s;\x0a\x09\x09\x09float\x20a113\x20=\x20texture2D(a2,\x20a101).a\x20*\x20a95.s;\x0a\x09\x09\x09float\x20a114\x20=\x20texture2D(a3,\x20a102).a\x20*\x20a96.s;\x0a\x09\x09\x09float\x20a115\x20=\x20texture2D(a4,\x20a103).a\x20*\x20a97.s;\x0a\x09\x09\x09float\x20a116\x20=\x20texture2D(a5,\x20a104).a\x20*\x20a98.s;\x0a\x0a\x09\x09\x09float\x20a117\x20=\x20step(0.5,\x20ob_shadow0\x20+\x20a112\x20+\x20a113\x20+\x20a114\x20+\x20a115\x20+\x20a116);\x0a\x0a\x09\x09\x09\x0a\x09\x09\x09//\x20縦\x0a\x09\x09\x09vec3\x20a118\x20=\x20a63\x20+\x20((-0.5\x20-\x20a63.z)\x20/\x20a64.z)\x20*\x20a64;\x0a\x09\x09\x09vec3\x20a119\x20=\x20a72\x20*\x20a118;\x0a\x09\x09\x09vec3\x20a120\x20=\x20a75\x20-\x20a119;\x0a\x09\x09\x09float\x20a121\x20=\x20a119.z\x20/\x20a120.z;\x0a\x09\x09\x09vec3\x20a122\x20=\x20a119\x20+\x20a121\x20*\x20a120;\x0a\x09\x09\x09float\x20a123\x20=\x20a122.x\x20+\x200.5;\x0a\x09\x09\x09vec3\x20a124\x20=\x20-\x20a120\x20*\x20(a72\x20*\x20vec3(0.0,\x20a39,\x200.0)).z\x20/\x20a120.z;\x0a\x09\x09\x09//\x20Obfuscated\x20fragment\x20snippet\x0afloat\x20z0\x20=\x20a25.y\x20+\x20a41\x20-\x20a53\x20*\x20a46\x20*\x200.0;\x0afloat\x20z1\x20=\x20a25.y\x20+\x20a41\x20-\x20a53\x20*\x20a46\x20*\x201.0;\x0afloat\x20z2\x20=\x20a25.y\x20+\x20a41\x20-\x20a53\x20*\x20a46\x20*\x202.0;\x0afloat\x20z3\x20=\x20a25.y\x20+\x20a41\x20-\x20a53\x20*\x20a46\x20*\x203.0;\x0afloat\x20z4\x20=\x20a25.y\x20+\x20a41\x20-\x20a53\x20*\x20a46\x20*\x204.0;\x0afloat\x20z5\x20=\x20a25.y\x20+\x20a41\x20-\x20a53\x20*\x20a46\x20*\x205.0;\x0a\x0afloat\x20sc0\x20=\x20a46\x20*\x20mod(z0,\x20a39)\x20+\x20floor(z0\x20/\x20a39)\x20*\x20a39\x20+\x20step(0.0,\x20a46)\x20*\x20a39;\x0afloat\x20sc1\x20=\x20a46\x20*\x20mod(z1,\x20a39)\x20+\x20floor(z1\x20/\x20a39)\x20*\x20a39\x20+\x20step(0.0,\x20a46)\x20*\x20a39;\x0afloat\x20sc2\x20=\x20a46\x20*\x20mod(z2,\x20a39)\x20+\x20floor(z2\x20/\x20a39)\x20*\x20a39\x20+\x20step(0.0,\x20a46)\x20*\x20a39;\x0afloat\x20sc3\x20=\x20a46\x20*\x20mod(z3,\x20a39)\x20+\x20floor(z3\x20/\x20a39)\x20*\x20a39\x20+\x20step(0.0,\x20a46)\x20*\x20a39;\x0afloat\x20sc4\x20=\x20a46\x20*\x20mod(z4,\x20a39)\x20+\x20floor(z4\x20/\x20a39)\x20*\x20a39\x20+\x20step(0.0,\x20a46)\x20*\x20a39;\x0afloat\x20sc5\x20=\x20a46\x20*\x20mod(z5,\x20a39)\x20+\x20floor(z5\x20/\x20a39)\x20*\x20a39\x20+\x20step(0.0,\x20a46)\x20*\x20a39;\x0a\x0avec3\x20sg0\x20=\x20f1(sc0,\x20a39,\x20a49);\x0avec3\x20sg1\x20=\x20f1(sc1,\x20a39,\x20a49);\x0avec3\x20sg2\x20=\x20f1(sc2,\x20a39,\x20a49);\x0avec3\x20sg3\x20=\x20f1(sc3,\x20a39,\x20a49);\x0avec3\x20sg4\x20=\x20f1(sc4,\x20a39,\x20a49);\x0avec3\x20sg5\x20=\x20f1(sc5,\x20a39,\x20a49);\x0a\x0avec2\x20uv0\x20=\x20vec2(a123,\x20sg0.t\x20+\x20a124.z\x20-\x20(step(0.0,\x20a30)\x20-\x201.0)\x20*\x20a39);\x0avec2\x20uv1\x20=\x20vec2(a123,\x20sg1.t\x20+\x20a124.z\x20-\x20(step(0.0,\x20a30)\x20-\x200.0)\x20*\x20a39);\x0avec2\x20b1\x20=\x20vec2(a123,\x20sg2.t\x20+\x20a124.z\x20-\x20(step(0.0,\x20a30)\x20+\x201.0)\x20*\x20a39);\x0avec2\x20uv3\x20=\x20vec2(a123,\x20sg3.t\x20+\x20a124.z\x20-\x20(step(0.0,\x20a30)\x20+\x202.0)\x20*\x20a39);\x0avec2\x20uv4\x20=\x20vec2(a123,\x20sg4.t\x20+\x20a124.z\x20-\x20(step(0.0,\x20a30)\x20+\x203.0)\x20*\x20a39);\x0avec2\x20uv5\x20=\x20vec2(a123,\x20sg5.t\x20+\x20a124.z\x20-\x20(step(0.0,\x20a30)\x20+\x204.0)\x20*\x20a39);\x0a\x0afloat\x20sm0\x20=\x200.0;\x0afloat\x20sm1\x20=\x20sm0\x20+\x20sg0.s;\x0afloat\x20sm2\x20=\x20sm1\x20+\x20sg1.s;\x0afloat\x20sm3\x20=\x20sm2\x20+\x20sg2.s;\x0afloat\x20sm4\x20=\x20sm3\x20+\x20sg3.s;\x0afloat\x20sm5\x20=\x20sm4\x20+\x20sg4.s;\x0a\x0auv0\x20+=\x20vec2(\x0a\x20\x20\x20\x20(sm0\x20+\x20sg0.s\x20*\x20a31)\x20*\x20a46\x20*\x20a124.x,\x0a\x20\x20\x20\x20a39\x20*\x20(a46\x20*\x200.0\x20+\x20a31)\x0a);\x0auv1\x20+=\x20vec2(\x0a\x20\x20\x20\x20(sm1\x20+\x20sg1.s\x20*\x20a31)\x20*\x20a46\x20*\x20a124.x,\x0a\x20\x20\x20\x20a39\x20*\x20(a46\x20*\x201.0\x20+\x20a31)\x0a);\x0ab1\x20+=\x20vec2(\x0a\x20\x20\x20\x20(sm2\x20+\x20sg2.s\x20*\x20a31)\x20*\x20a46\x20*\x20a124.x,\x0a\x20\x20\x20\x20a39\x20*\x20(a46\x20*\x202.0\x20+\x20a31)\x0a);\x0auv3\x20+=\x20vec2(\x0a\x20\x20\x20\x20(sm3\x20+\x20sg3.s\x20*\x20a31)\x20*\x20a46\x20*\x20a124.x,\x0a\x20\x20\x20\x20a39\x20*\x20(a46\x20*\x203.0\x20+\x20a31)\x0a);\x0auv4\x20+=\x20vec2(\x0a\x20\x20\x20\x20(sm4\x20+\x20sg4.s\x20*\x20a31)\x20*\x20a46\x20*\x20a124.x,\x0a\x20\x20\x20\x20a39\x20*\x20(a46\x20*\x204.0\x20+\x20a31)\x0a);\x0auv5\x20+=\x20vec2(\x0a\x20\x20\x20\x20(sm5\x20+\x20sg5.s\x20*\x20a31)\x20*\x20a46\x20*\x20a124.x,\x0a\x20\x20\x20\x20a39\x20*\x20(a46\x20*\x205.0\x20+\x20a31)\x0a);\x0a\x0afloat\x20sh0\x20=\x20texture2D(a6,\x20\x20uv0).a\x20*\x20sg0.s;\x0afloat\x20sh1\x20=\x20texture2D(a7,\x20\x20uv1).a\x20*\x20sg1.s;\x0afloat\x20sh2\x20=\x20texture2D(a8,\x20\x20b1).a\x20*\x20sg2.s;\x0afloat\x20sh3\x20=\x20texture2D(a9,\x20\x20uv3).a\x20*\x20sg3.s;\x0afloat\x20sh4\x20=\x20texture2D(a10,\x20uv4).a\x20*\x20sg4.s;\x0afloat\x20sh5\x20=\x20texture2D(a11,\x20uv5).a\x20*\x20sg5.s;\x0a\x0afloat\x20a149\x20=\x20step(0.5,\x20sh0\x20+\x20sh1\x20+\x20sh2\x20+\x20sh3\x20+\x20sh4\x20+\x20sh5);\x0amat3\x20\x20\x20a201\x20=\x20rotY;\x0avec3\x20\x20\x20a202\x20=\x20a65\x20+\x20((-0.5\x20-\x20a65.z)\x20/\x20a66.z)\x20*\x20a66;\x0avec3\x20\x20\x20a203\x20=\x20a201\x20*\x20a202;\x0avec3\x20\x20\x20a204\x20=\x20a201\x20*\x20a12;\x0avec3\x20\x20\x20a205\x20=\x20a204\x20-\x20a203;\x0afloat\x20\x20a206\x20=\x20a203.z\x20/\x20a205.z;\x0avec3\x20\x20\x20a207\x20=\x20a203\x20+\x20a206\x20*\x20a205\x20*\x20a47;\x0afloat\x20\x20a208\x20=\x20a207.y\x20+\x200.5;\x0avec3\x20\x20\x20a209\x20=\x20-a205\x20*\x20(a201\x20*\x20vec3(a38,\x200.0,\x200.0)).z\x20/\x20a205.z;\x0a\x0afloat\x20\x20a210\x20=\x20a25.x\x20+\x20a40\x20-\x20a52\x20*\x20a47\x20*\x200.0;\x0afloat\x20\x20a211\x20=\x20a25.x\x20+\x20a40\x20-\x20a52\x20*\x20a47\x20*\x201.0;\x0afloat\x20\x20a212\x20=\x20a25.x\x20+\x20a40\x20-\x20a52\x20*\x20a47\x20*\x202.0;\x0afloat\x20\x20a213\x20=\x20a25.x\x20+\x20a40\x20-\x20a52\x20*\x20a47\x20*\x203.0;\x0afloat\x20\x20a214\x20=\x20a25.x\x20+\x20a40\x20-\x20a52\x20*\x20a47\x20*\x204.0;\x0afloat\x20\x20a215\x20=\x20a25.x\x20+\x20a40\x20-\x20a52\x20*\x20a47\x20*\x205.0;\x0a\x0afloat\x20\x20a216\x20=\x20a47\x20*\x20mod(a210,\x20a38)\x20+\x20floor(a210\x20/\x20a38)\x20*\x20a38\x20+\x20step(0.0,\x20a47)\x20*\x20a38;\x0afloat\x20\x20a217\x20=\x20a47\x20*\x20mod(a211,\x20a38)\x20+\x20floor(a211\x20/\x20a38)\x20*\x20a38\x20+\x20step(0.0,\x20a47)\x20*\x20a38;\x0afloat\x20\x20a218\x20=\x20a47\x20*\x20mod(a212,\x20a38)\x20+\x20floor(a212\x20/\x20a38)\x20*\x20a38\x20+\x20step(0.0,\x20a47)\x20*\x20a38;\x0afloat\x20\x20a219\x20=\x20a47\x20*\x20mod(a213,\x20a38)\x20+\x20floor(a213\x20/\x20a38)\x20*\x20a38\x20+\x20step(0.0,\x20a47)\x20*\x20a38;\x0afloat\x20\x20a220\x20=\x20a47\x20*\x20mod(a214,\x20a38)\x20+\x20floor(a214\x20/\x20a38)\x20*\x20a38\x20+\x20step(0.0,\x20a47)\x20*\x20a38;\x0afloat\x20\x20a221\x20=\x20a47\x20*\x20mod(a215,\x20a38)\x20+\x20floor(a215\x20/\x20a38)\x20*\x20a38\x20+\x20step(0.0,\x20a47)\x20*\x20a38;\x0a\x0avec3\x20\x20\x20a222\x20=\x20f1(a216,\x20a38,\x20a48);\x0avec3\x20\x20\x20a223\x20=\x20f1(a217,\x20a38,\x20a48);\x0avec3\x20\x20\x20a224\x20=\x20f1(a218,\x20a38,\x20a48);\x0avec3\x20\x20\x20a225\x20=\x20f1(a219,\x20a38,\x20a48);\x0avec3\x20\x20\x20a226\x20=\x20f1(a220,\x20a38,\x20a48);\x0avec3\x20\x20\x20a227\x20=\x20f1(a221,\x20a38,\x20a48);\x0a\x0avec2\x20\x20\x20a228\x20=\x20vec2(a222.t\x20+\x20a209.z\x20-\x20a38,\x20a208);\x0avec2\x20\x20\x20a229\x20=\x20vec2(a223.t\x20+\x20a209.z\x20-\x20a38,\x20a208);\x0avec2\x20\x20\x20a230\x20=\x20vec2(a224.t\x20+\x20a209.z\x20-\x20a38,\x20a208);\x0avec2\x20\x20\x20a231\x20=\x20vec2(a225.t\x20+\x20a209.z\x20-\x20a38,\x20a208);\x0avec2\x20\x20\x20a232\x20=\x20vec2(a226.t\x20+\x20a209.z\x20-\x20a38,\x20a208);\x0avec2\x20\x20\x20a233\x20=\x20vec2(a227.t\x20+\x20a209.z\x20-\x20a38,\x20a208);\x0a\x0afloat\x20\x20a234\x20=\x200.0;\x0afloat\x20\x20a235\x20=\x20a234\x20+\x20a222.s;\x0afloat\x20\x20a236\x20=\x20a235\x20+\x20a223.s;\x0afloat\x20\x20a237\x20=\x20a236\x20+\x20a224.s;\x0afloat\x20\x20a238\x20=\x20a237\x20+\x20a225.s;\x0afloat\x20\x20a239\x20=\x20a238\x20+\x20a226.s;\x0afloat\x20\x20a240\x20=\x20a239\x20+\x20a227.s;\x0a\x0aa228\x20+=\x20vec2(\x0a\x20\x20\x20\x20a47\x20*\x20a38\x20*\x200.0,\x0a\x20\x20\x20\x20a30\x20*\x20a235\x20*\x20a47\x20*\x20a209.x\x20*\x20a28\x20-\x20a39\x20*\x200.0\x0a);\x0aa229\x20+=\x20vec2(\x0a\x20\x20\x20\x20a47\x20*\x20a38\x20*\x201.0,\x0a\x20\x20\x20\x20a30\x20*\x20a236\x20*\x20a47\x20*\x20a209.x\x20*\x20a28\x20-\x20a39\x20*\x201.0\x0a);\x0aa230\x20+=\x20vec2(\x0a\x20\x20\x20\x20a47\x20*\x20a38\x20*\x202.0,\x0a\x20\x20\x20\x20a30\x20*\x20a237\x20*\x20a47\x20*\x20a209.x\x20*\x20a28\x20-\x20a39\x20*\x202.0\x0a);\x0aa231\x20+=\x20vec2(\x0a\x20\x20\x20\x20a47\x20*\x20a38\x20*\x203.0,\x0a\x20\x20\x20\x20a30\x20*\x20a238\x20*\x20a47\x20*\x20a209.x\x20*\x20a28\x20-\x20a39\x20*\x203.0\x0a);\x0aa232\x20+=\x20vec2(\x0a\x20\x20\x20\x20a47\x20*\x20a38\x20*\x204.0,\x0a\x20\x20\x20\x20a30\x20*\x20a239\x20*\x20a47\x20*\x20a209.x\x20*\x20a28\x20-\x20a39\x20*\x204.0\x0a);\x0aa233\x20+=\x20vec2(\x0a\x20\x20\x20\x20a47\x20*\x20a38\x20*\x205.0,\x0a\x20\x20\x20\x20a30\x20*\x20a240\x20*\x20a47\x20*\x20a209.x\x20*\x20a28\x20-\x20a39\x20*\x205.0\x0a);\x0a\x0afloat\x20\x20a241\x20=\x20texture2D(a6,\x20\x20a228).a\x20*\x20a222.s;\x0afloat\x20\x20a242\x20=\x20texture2D(a7,\x20\x20a229).a\x20*\x20a223.s;\x0afloat\x20\x20a243\x20=\x20texture2D(a8,\x20\x20a230).a\x20*\x20a224.s;\x0afloat\x20\x20a244\x20=\x20texture2D(a9,\x20\x20a231).a\x20*\x20a225.s;\x0afloat\x20\x20a245\x20=\x20texture2D(a10,\x20a232).a\x20*\x20a226.s;\x0afloat\x20\x20a246\x20=\x20texture2D(a11,\x20a233).a\x20*\x20a227.s;\x0a\x0afloat\x20\x20a247\x20=\x20step(0.5,\x20a241\x20+\x20a242\x20+\x20a243\x20+\x20a244\x20+\x20a245\x20+\x20a246);\x0afloat\x20\x20a248\x20=\x20texture2D(c1,\x20vTextureCoord\x20*\x20a16\x20+\x20(1.0\x20-\x20a16)\x20*\x20a17\x20-\x20a22).a;\x0afloat\x20\x20a249\x20=\x20step(0.01,\x20a149\x20+\x20a247\x20+\x20a117\x20+\x20a248);\x0a\x0avec4\x20\x20\x20a250\x20=\x20vec4(a249\x20*\x20a13,\x20a249\x20*\x200.7);\x0agl_FragColor\x20=\x20a250;\x0a\x0a\x09\x09}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','context','hasOwnProperty','createShadow','388qZShgQ','toString','isValid','degreeVarId','prototype','6698430UBZSUO','value','_scene','clear','createCharactersShadow','932155puwYqT','_createColorFilter','scaleMode','a16','apply','WATERFALL_AUTOTILE_TABLE','a13','shadowOffset','a14','refreshShadowShadeSprites','render','call','\x0a\x09\x09\x09varying\x20vec2\x20vTextureCoord;\x0a\x09\x09\x09uniform\x20sampler2D\x20uSampler;\x0a\x09\x09\x09uniform\x20sampler2D\x20uCharShadeTexture;\x0a\x09\x09\x09uniform\x20sampler2D\x20uShadeTexture;\x0a\x09\x09\x09uniform\x20sampler2D\x20uRoofTexture;\x0a\x09\x09\x09uniform\x20vec3\x20a13;\x0a\x09\x09\x09uniform\x20vec2\x20a18;\x0a\x09\x09\x09uniform\x20vec3\x20a12;\x0a\x09\x09\x09uniform\x20vec2\x20a17;\x0a\x09\x09\x09uniform\x20vec2\x20a22;\x0a\x09\x09\x09uniform\x20vec2\x20a16;\x0a\x09\x09\x09uniform\x20vec2\x20a21;\x0a\x09\x09\x09uniform\x20vec2\x20a20;\x0a\x09\x09\x09uniform\x20float\x20b12;\x0a\x09\x09\x09uniform\x20float\x20b13;\x0a\x09\x09\x09uniform\x20float\x20b14;\x0a\x09\x09\x09uniform\x20float\x20b15;\x0a\x09\x09\x09\x0a\x09\x09\x09void\x20main()\x20{\x0a\x09\x09\x09\x09vec2\x20a25\x20=\x20vTextureCoord;\x0a\x09\x09\x09\x09vec2\x20a23\x20=\x20a25\x20*\x20a18;\x0a\x09\x09\x09\x09vec2\x20a24\x20\x20\x20\x20=\x20a23\x20+\x20a20;\x0a\x09\x09\x09\x09vec2\x20b1\x20\x20\x20\x20\x20\x20\x20=\x20a24\x20/\x20a21;\x0a\x09\x09\x09\x09vec2\x20b2\x20=\x20b14\x20/\x20a18;\x0a\x09\x09\x09\x09vec4\x20b3\x20=\x20vec4(0.0);\x0a\x09\x09\x09\x09float\x20b4\x20=\x200.0;\x0a\x09\x09\x09\x09for(float\x20i\x20=\x20-2.0;\x20i\x20<\x203.0;\x20i++){\x0a\x09\x09\x09\x09\x09for(float\x20j\x20=\x20-2.0;\x20j\x20<\x203.0;\x20j++){\x0a\x09\x09\x09\x09\x09\x09vec4\x20b5\x20=\x20texture2D(uSampler,\x20a25\x20+\x20vec2(b2.x\x20*\x20i,\x20\x20b2.y\x20*\x20j));\x0a\x09\x09\x09\x09\x09\x09b3\x20+=\x20b5;\x0a\x09\x09\x09\x09\x09\x09b4\x20+=\x20b5.a;\x0a\x09\x09\x09\x09\x09}\x0a\x09\x09\x09\x09}\x0a\x09\x09\x09\x09b3\x20*=\x20abs(step(vec4(3.0),\x20b3)\x20-\x20step(b3,\x20vec4(4.0)));\x0a\x09\x09\x09\x09b3\x20=\x20mix(b3,\x20vec4(b13),\x20step(vec4(13.0),\x20b3)\x20*\x20step(b3,\x20vec4(18.0)));\x0a\x09\x09\x09\x09vec4\x20b6\x20=\x20vec4(b3.rgba\x20/\x2025.0)\x20*\x20b15;\x0a\x09\x09\x09\x09float\x20b7\x20=\x20texture2D(uCharShadeTexture,\x20vTextureCoord\x20*\x20a16\x20+\x20(1.0\x20-\x20a16)\x20*\x20a17\x20-\x20a22).a;\x0a\x09\x09\x09\x09float\x20b8\x20=\x20step(0.5,\x20texture2D(uShadeTexture,\x20b1).a\x20+\x20b7);\x0a\x09\x09\x09\x09vec3\x20a26\x20=\x20normalize(a12);\x0a\x09\x09\x09\x09float\x20a30\x20=\x20sign(a26.y);\x0a\x09\x09\x09\x09float\x20b9\x20=\x20max(-1.0,\x20b8\x20*\x20a26.y);\x0a\x09\x09\x09\x09float\x20b10\x20=\x20texture2D(uRoofTexture,\x20b1).a;\x0a\x09\x09\x09\x09vec4\x20b11\x20=\x20step(b8,\x200.0)\x20*\x20b6\x20+\x20max(b8\x20*\x20a30,\x200.0)\x20-\x20vec4(b9\x20*\x20a13,\x20b9*b12);\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20step(b10,\x200.0)\x20*\x20b11;\x0a\x09\x09\x09}\x0a\x09\x09','a18','tileId','objectShadowBitmapSpriteArray','filterArea','uRoofTexture','TILE_ID_A5','setHighQualityMapLightingWithShadowsToSpriteset','(((.+)+)+)+$','TILE_ID_E','update','characterPatternY','_bushDepth','a21','offFilter','setCharacterBitmap','start','anchor','shadowBlurVarId','push','concat','floor','416275MhIypI','some','WRAP_MODES','noShadow','roofTerrainTagId','wrapMode','map','texture','renderTexture','3683907hvnhfF','patternWidth','tilesetNames','blt','_charRenderTexture','a12','b15','event','isTileA2','Sprite','isTileA1','removeChild','b14','zoomX','NEAREST','17544PLKZHH','app','roofBitmapSprite','FLOOR_AUTOTILE_TABLE','8ZhLdmG','addChild','_tilemap','13453zglcgf','terrainTagFromUnder','globalCompositeOperation','isTileA4','_fragmentSrc','loadTileset','drawImage','removeHighQualityMapLightingWithShadows','getAutotileKind','tileWidth','isTileA5','2871980NjllPu','search','roofBitmap','tilesetFlags','blightnessVarId','shadowBitmaps','_highQualityShadowFilter','animationFrame','onFilter','restore','bind','characterShadowFilterSprite','parameters','round','_frame','set','shadeDensityVarId','shadowLayerSprite','shadowColorGreenVarId','MULTIPLY','width','fillRect','pow','_complementBlurFilter','a15','a20','uShadeTexture','Rectangle','mipmap','shadeBitmap','endLoading','setShadowSprites','clamp','forEach','isAutotile','shadowTerrainTagId','_upperBody','objectShadowBitmaps','621hlzIJW'];_0x37a9=function(){return _0x6b1563;};return _0x37a9();}_0x418bf5();{_0x22037d(0x1fd);const pluginName='Villa_MapLightAndShadow',param=PluginManager[_0x22037d(0x1c1)](pluginName),shadowTerrainTagId=Number(param[_0x22037d(0x1d8)]),roofTerrainTagId=Number(param[_0x22037d(0x18f)]),degreeVarId=Number(param[_0x22037d(0x162)]),blightnessVarId=Number(param[_0x22037d(0x1b9)]),colorRedVarId=Number(param[_0x22037d(0x209)]),colorGreenVarId=Number(param[_0x22037d(0x1c7)]),colorBlueVarId=Number(param[_0x22037d(0x20c)]),shadowDensityVarId=Number(param['shadowDensityVarId']),shadeDensityVarId=Number(param[_0x22037d(0x1c5)]),shadowBlurVarId=Number(param[_0x22037d(0x187)]);function CharacterShadowFilter(){const _0x3d586f=_0x22037d;this['initialize'][_0x3d586f(0x16d)](this,arguments);}CharacterShadowFilter['prototype']=Object[_0x22037d(0x206)](PIXI[_0x22037d(0x1ea)]['prototype']),CharacterShadowFilter[_0x22037d(0x163)][_0x22037d(0x1f6)]=CharacterShadowFilter,CharacterShadowFilter[_0x22037d(0x163)][_0x22037d(0x1fc)]=function(){const _0x219520=_0x22037d;PIXI['Filter'][_0x219520(0x174)](this,null,this[_0x219520(0x1ae)]()),this[_0x219520(0x218)]['d3']=0x0,this['uniforms']['d2']=[0x0,0x0],this[_0x219520(0x218)][_0x219520(0x176)]=[0x1/Graphics[_0x219520(0x1c9)],0x1/Graphics[_0x219520(0x159)]],this[_0x219520(0x218)][_0x219520(0x199)]=[0x0,0x64,0x64],this[_0x219520(0x218)][_0x219520(0x1ce)]=[0x0,0x0],this[_0x219520(0x218)]['d1']=[0x0,0x0],this[_0x219520(0x218)][_0x219520(0x171)]=[$dataMap[_0x219520(0x1c9)],$dataMap['height']],this[_0x219520(0x218)][_0x219520(0x182)]=[$dataMap[_0x219520(0x1c9)]*$gameMap[_0x219520(0x1b3)](),$dataMap[_0x219520(0x159)]*$gameMap[_0x219520(0x1f3)]()],this['uniforms'][_0x219520(0x1cd)]=[$gameMap[_0x219520(0x1b3)](),$gameMap[_0x219520(0x1f3)]()];},CharacterShadowFilter[_0x22037d(0x163)]['update']=function(_0x5c0cae,_0x33de14,_0x289a8a){const _0x5c04f8=_0x22037d;this['uniforms'][_0x5c04f8(0x199)]=_0x5c0cae,this['uniforms']['d1']=_0x33de14,this[_0x5c04f8(0x218)][_0x5c04f8(0x1ce)]=_0x289a8a;},CharacterShadowFilter['prototype']['_fragmentSrc']=function(){return'\x0a\x09\x09\x09precision\x20mediump\x20float;\x0a\x0a\x09\x09\x09varying\x20vec2\x20vTextureCoord;\x0a\x09\x09\x09uniform\x20sampler2D\x20uSampler;\x0a\x09\x09\x09uniform\x20vec3\x20a12;\x0a\x09\x09\x09uniform\x20vec2\x20a14;\x0a\x09\x09\x09uniform\x20vec2\x20d1;\x0a\x09\x09\x09uniform\x20vec2\x20d2;\x0a\x09\x09\x09uniform\x20vec2\x20a21;\x0a\x09\x09\x09uniform\x20vec2\x20a20;\x0a\x09\x09\x09uniform\x20float\x20d3;\x0a\x09\x09\x09const\x20float\x20PI\x20=\x203.1415926;\x0a\x0a\x09\x09\x09void\x20main()\x20{\x0a\x09\x09\x09\x09vec2\x20a25\x20=\x20vTextureCoord\x20*\x204.0;\x0a\x09\x09\x09\x09vec2\x20d4\x20=\x201.0\x20-\x20d2;\x0a\x09\x09\x09\x09a25\x20-=\x20vec2(d4.x,\x200.5\x20-\x20d4.y);\x0a\x09\x09\x09\x09a25\x20+=\x20a20\x20/\x20a21;\x0a\x09\x09\x09\x09vec3\x20P\x20=\x20vec3(a25,\x200.0);\x0a\x09\x09\x09\x09float\x20d5\x20=\x200.3;\x0a\x09\x09\x09\x09vec2\x20d6\x20=\x20vec2(0.5);\x0a\x09\x09\x09\x09vec2\x20d7\x20=\x20vec2(-a12.x,\x20a12.y)\x20*\x20d5;\x0a\x09\x09\x09\x09vec3\x20a26\x20=\x20vec3(d6\x20+\x20d7,\x20a12.z);\x0a\x09\x09\x09\x09vec3\x20D\x20=\x20P\x20-\x20a26;\x0a\x09\x09\x09\x09float\x20d8\x20\x20\x20\x20\x20\x20=\x201.0;\x0a\x09\x09\x09\x09vec2\x20\x20d9\x20=\x20vec2(0.0,\x201.0);\x0a\x09\x09\x09\x09vec2\x20\x20d10\x20=\x20vec2(0.0,\x201.0);\x0a\x09\x09\x09\x09float\x20t\x20=\x20(d8\x20-\x20a26.y)\x20*\x20inversesqrt(D.y\x20*\x20D.y);\x0a\x09\x09\x09\x09t\x20*=\x20sign(D.y);\x0a\x09\x09\x09\x09vec3\x20I\x20=\x20a26\x20+\x20D\x20*\x20t;\x0a\x09\x09\x09\x09float\x20d11\x20=\x201.0\x20/\x20(d9.y\x20-\x20d9.x);\x0a\x09\x09\x09\x09float\x20d12\x20=\x201.0\x20/\x20(d10.y\x20-\x20d10.x);\x0a\x09\x09\x09\x09float\x20d13\x20=\x20(I.x\x20-\x20d9.x)\x20*\x20d11;\x0a\x09\x09\x09\x09float\x20d14\x20=\x20(I.z\x20-\x20d10.x)\x20*\x20d12;\x0a\x09\x09\x09\x09d14\x20+=\x20d3;\x0a\x09\x09\x09\x09vec2\x20d15\x20=\x20vec2(d13\x20-\x20d2.x,\x20d2.y\x20-\x20d14);\x0a\x09\x09\x09\x09float\x20d16\x20=\x20step(0.0,\x20d15.x)\x20*\x20(1.0\x20-\x20step(1.0,\x20d15.x));\x0a\x09\x09\x09\x09float\x20d17\x20=\x20step(0.0,\x20d15.y)\x20*\x20(1.0\x20-\x20step(1.0,\x20d15.y));\x0a\x09\x09\x09\x09float\x20d18\x20=\x20step(0.0,\x20t);\x0a\x09\x09\x09\x09vec2\x20d19\x20=\x20d15;\x0a\x09\x09\x09\x09float\x20d20\x20=\x20texture2D(uSampler,\x20d19).a\x20*\x20d16\x20*\x20d17\x20*\x20d18;\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20vec4(0.0,\x200.0,\x200.0,\x201.0)\x20*\x20step(0.5,\x20d20);\x0a\x09\x09\x09}\x0a\x09\x09';};function ComplementBlurFilter(){const _0x26538a=_0x22037d;this[_0x26538a(0x1fc)]['apply'](this,arguments);}ComplementBlurFilter[_0x22037d(0x163)]=Object[_0x22037d(0x206)](PIXI[_0x22037d(0x1ea)][_0x22037d(0x163)]),ComplementBlurFilter[_0x22037d(0x163)][_0x22037d(0x1f6)]=ComplementBlurFilter,ComplementBlurFilter[_0x22037d(0x163)][_0x22037d(0x1fc)]=function(){const _0x3ad316=_0x22037d;PIXI[_0x3ad316(0x1ea)]['call'](this,null,this[_0x3ad316(0x1ae)]()),this[_0x3ad316(0x1ee)](),this['uniforms'][_0x3ad316(0x176)]=[Graphics[_0x3ad316(0x1c9)],Graphics[_0x3ad316(0x159)]],this[_0x3ad316(0x218)][_0x3ad316(0x213)]=0xf,this[_0x3ad316(0x218)][_0x3ad316(0x1a0)]=0x1,this[_0x3ad316(0x218)][_0x3ad316(0x19a)]=0x0,this[_0x3ad316(0x218)]['a16']=[0x1,0x1],this[_0x3ad316(0x218)][_0x3ad316(0x1f4)]=[0x0,0x0],this[_0x3ad316(0x218)][_0x3ad316(0x211)]=[0x0,0x0],this[_0x3ad316(0x218)][_0x3ad316(0x16f)]=[0x0,0x0,0x0],this[_0x3ad316(0x218)][_0x3ad316(0x199)]=[0x0,0x0,0x0],this['uniforms'][_0x3ad316(0x1ce)]=[0x0,0x0],this[_0x3ad316(0x218)]['a21']=[$dataMap[_0x3ad316(0x1c9)]*$gameMap[_0x3ad316(0x1b3)](),$dataMap[_0x3ad316(0x159)]*$gameMap[_0x3ad316(0x1f3)]()];},ComplementBlurFilter[_0x22037d(0x163)][_0x22037d(0x1ee)]=function(){const _0x2eb37b=_0x22037d;this[_0x2eb37b(0x218)][_0x2eb37b(0x201)]=SceneManager['_scene'][_0x2eb37b(0x20a)][_0x2eb37b(0x1e1)],this[_0x2eb37b(0x218)][_0x2eb37b(0x1cf)]=SceneManager['_scene'][_0x2eb37b(0x212)]['bitmap'][_0x2eb37b(0x158)],this[_0x2eb37b(0x218)][_0x2eb37b(0x17a)]=SceneManager[_0x2eb37b(0x166)]['roofBitmapSprite'][_0x2eb37b(0x15a)]['baseTexture'];},ComplementBlurFilter[_0x22037d(0x163)]['update']=function(_0x3f8e2a){const _0x5094b5=_0x22037d,_0x281080=$gameScreen[_0x5094b5(0x214)]();this[_0x5094b5(0x218)]['a18']=[Graphics[_0x5094b5(0x1c9)]/_0x281080,Graphics['height']/_0x281080],this[_0x5094b5(0x218)][_0x5094b5(0x1f4)]=[$gameScreen[_0x5094b5(0x1a1)]()/Graphics[_0x5094b5(0x1c9)],$gameScreen['zoomY']()/Graphics[_0x5094b5(0x159)]];const _0x50b977=SceneManager[_0x5094b5(0x166)][_0x5094b5(0x20a)],_0x3d9276=_0x50b977[_0x5094b5(0x1a9)],_0x45b29b=_0x3d9276['origin']['x'],_0x29f574=_0x3d9276[_0x5094b5(0x1dc)]['y'],_0xc09538=_0x45b29b-_0x50b977['x']+Math['round'](_0x45b29b*(_0x281080-0x1)),_0x4f9072=_0x29f574-_0x50b977['y']+Math[_0x5094b5(0x1c2)](_0x29f574*(_0x281080-0x1));this[_0x5094b5(0x218)]['a22']=[$gameScreen[_0x5094b5(0x20d)]()/_0x281080/Graphics[_0x5094b5(0x1c9)],0x0],this[_0x5094b5(0x218)][_0x5094b5(0x16c)]=[0x1/_0x281080,0x1/_0x281080],this[_0x5094b5(0x218)]['b12']=($gameVariables[_0x5094b5(0x165)](shadeDensityVarId)/0x64)['clamp'](0x0,0x1),this[_0x5094b5(0x218)][_0x5094b5(0x213)]=$gameVariables[_0x5094b5(0x165)](shadowDensityVarId),this[_0x5094b5(0x218)][_0x5094b5(0x1a0)]=$gameVariables['value'](shadowBlurVarId)/0x64,this[_0x5094b5(0x218)][_0x5094b5(0x19a)]=($gameVariables[_0x5094b5(0x165)](blightnessVarId)/0xff)[_0x5094b5(0x1d5)](0x0,0x1),this[_0x5094b5(0x218)]['a12']=_0x3f8e2a;const _0x1dea55=$gameVariables['value'](colorRedVarId)/0xff,_0x422d0e=$gameVariables[_0x5094b5(0x165)](colorGreenVarId)/0xff,_0x28913f=$gameVariables[_0x5094b5(0x165)](colorBlueVarId)/0xff;this[_0x5094b5(0x218)][_0x5094b5(0x16f)]=[_0x1dea55,_0x422d0e,_0x28913f],this['uniforms'][_0x5094b5(0x1ce)]=[_0xc09538/_0x281080,_0x4f9072/_0x281080];},ComplementBlurFilter[_0x22037d(0x163)][_0x22037d(0x1ae)]=function(){const _0x525fb2=_0x22037d;return _0x525fb2(0x175);};function MapDropShadowFilter(){const _0x9378e4=_0x22037d;this[_0x9378e4(0x1fc)]['apply'](this,arguments);}MapDropShadowFilter[_0x22037d(0x163)]=Object[_0x22037d(0x206)](PIXI[_0x22037d(0x1ea)][_0x22037d(0x163)]),MapDropShadowFilter[_0x22037d(0x163)]['constructor']=MapDropShadowFilter,MapDropShadowFilter['prototype'][_0x22037d(0x1fc)]=function(){const _0x1134d6=_0x22037d;PIXI[_0x1134d6(0x1ea)][_0x1134d6(0x174)](this,null,this[_0x1134d6(0x1ae)]()),this[_0x1134d6(0x1ee)](),this[_0x1134d6(0x218)][_0x1134d6(0x176)]=[Graphics[_0x1134d6(0x1c9)],Graphics[_0x1134d6(0x159)]],this[_0x1134d6(0x218)][_0x1134d6(0x199)]=[0x0,0x0,0x0],this[_0x1134d6(0x218)][_0x1134d6(0x16f)]=[0x0,0x0,0x0],this[_0x1134d6(0x218)][_0x1134d6(0x16c)]=[0x1,0x1],this[_0x1134d6(0x218)][_0x1134d6(0x1f4)]=[0x0,0x0],this[_0x1134d6(0x218)][_0x1134d6(0x211)]=[0x0,0x0],this[_0x1134d6(0x218)]['a20']=[0x0,0x0],this['uniforms']['a14']=[$dataMap[_0x1134d6(0x1c9)],$dataMap['height']],this[_0x1134d6(0x218)][_0x1134d6(0x182)]=[$dataMap['width']*$gameMap['tileWidth'](),$dataMap[_0x1134d6(0x159)]*$gameMap[_0x1134d6(0x1f3)]()],this[_0x1134d6(0x218)][_0x1134d6(0x1cd)]=[$gameMap[_0x1134d6(0x1b3)](),$gameMap[_0x1134d6(0x1f3)]()];},MapDropShadowFilter[_0x22037d(0x163)][_0x22037d(0x17f)]=function(_0x496ee2){const _0x248230=_0x22037d;this[_0x248230(0x218)]['a12']=_0x496ee2;const _0xa9f69c=$gameVariables[_0x248230(0x165)](colorRedVarId)/0xff,_0x1fb419=$gameVariables[_0x248230(0x165)](colorGreenVarId)/0xff,_0x2ec400=$gameVariables[_0x248230(0x165)](colorBlueVarId)/0xff;this[_0x248230(0x218)][_0x248230(0x16f)]=[_0xa9f69c,_0x1fb419,_0x2ec400];const _0x12d15d=SceneManager[_0x248230(0x166)]['_spriteset'],_0x504bc7=_0x12d15d[_0x248230(0x1a9)],_0x26cde7=$gameScreen['zoomScale'](),_0x55daa0=_0x504bc7['origin']['x'],_0xb1e17e=_0x504bc7[_0x248230(0x1dc)]['y'],_0x411dba=_0x55daa0-_0x12d15d['x']+Math[_0x248230(0x1c2)](_0x55daa0*(_0x26cde7-0x1)),_0x280a4b=_0xb1e17e-_0x12d15d['y']+Math[_0x248230(0x1c2)](_0xb1e17e*(_0x26cde7-0x1));this[_0x248230(0x218)][_0x248230(0x1f4)]=[$gameScreen[_0x248230(0x1a1)]()/Graphics[_0x248230(0x1c9)],$gameScreen[_0x248230(0x1f7)]()/Graphics['height']],this[_0x248230(0x218)][_0x248230(0x211)]=[$gameScreen['shake']()/_0x26cde7/Graphics[_0x248230(0x1c9)],0x0],this[_0x248230(0x218)][_0x248230(0x16c)]=[0x1/_0x26cde7,0x1/_0x26cde7],this[_0x248230(0x218)][_0x248230(0x176)]=[Graphics['width']/_0x26cde7,Graphics[_0x248230(0x159)]/_0x26cde7],this[_0x248230(0x218)][_0x248230(0x1ce)]=[_0x411dba/_0x26cde7,_0x280a4b/_0x26cde7];},MapDropShadowFilter[_0x22037d(0x163)][_0x22037d(0x1ee)]=function(){const _0x30e873=_0x22037d;this[_0x30e873(0x218)]['c1']=SceneManager['_scene'][_0x30e873(0x20a)][_0x30e873(0x198)],this[_0x30e873(0x218)]['a6']=SceneManager['_scene'][_0x30e873(0x1fe)][0x0][_0x30e873(0x15a)]['baseTexture'],this['uniforms']['a7']=SceneManager['_scene'][_0x30e873(0x1fe)][0x1][_0x30e873(0x15a)]['baseTexture'],this[_0x30e873(0x218)]['a8']=SceneManager['_scene'][_0x30e873(0x1fe)][0x2]['bitmap'][_0x30e873(0x158)],this[_0x30e873(0x218)]['a9']=SceneManager[_0x30e873(0x166)]['shadowBitmapSpriteArray'][0x3]['bitmap']['baseTexture'],this['uniforms'][_0x30e873(0x1e2)]=SceneManager[_0x30e873(0x166)]['shadowBitmapSpriteArray'][0x4][_0x30e873(0x15a)][_0x30e873(0x158)],this[_0x30e873(0x218)][_0x30e873(0x156)]=SceneManager[_0x30e873(0x166)][_0x30e873(0x1fe)][0x5][_0x30e873(0x15a)][_0x30e873(0x158)],this[_0x30e873(0x218)]['a0']=SceneManager['_scene'][_0x30e873(0x178)][0x0]['bitmap'][_0x30e873(0x158)],this['uniforms']['a1']=SceneManager[_0x30e873(0x166)][_0x30e873(0x178)][0x1]['bitmap'][_0x30e873(0x158)],this[_0x30e873(0x218)]['a2']=SceneManager[_0x30e873(0x166)][_0x30e873(0x178)][0x2][_0x30e873(0x15a)][_0x30e873(0x158)],this['uniforms']['a3']=SceneManager[_0x30e873(0x166)][_0x30e873(0x178)][0x3]['bitmap'][_0x30e873(0x158)],this[_0x30e873(0x218)]['a4']=SceneManager[_0x30e873(0x166)]['objectShadowBitmapSpriteArray'][0x4][_0x30e873(0x15a)][_0x30e873(0x158)],this[_0x30e873(0x218)]['a5']=SceneManager[_0x30e873(0x166)][_0x30e873(0x178)][0x5][_0x30e873(0x15a)][_0x30e873(0x158)];},MapDropShadowFilter[_0x22037d(0x163)][_0x22037d(0x1ae)]=function(){const _0x3ab1db=_0x22037d;return _0x3ab1db(0x15b);};const HighQualityMapShadowCache={},HighQualityMapShadowCacheOrder=[],setHighQualityMapShadowCache=(_0x52eb79,_0x44970c)=>{const _0x47fd7c=_0x22037d;if(!HighQualityMapShadowCache[_0x47fd7c(0x15d)](_0x52eb79)){if(HighQualityMapShadowCacheOrder[_0x47fd7c(0x1e4)]>=0x2){const _0x80e7c9=HighQualityMapShadowCacheOrder['shift']();delete HighQualityMapShadowCache[_0x80e7c9];}HighQualityMapShadowCacheOrder[_0x47fd7c(0x188)](_0x52eb79);}HighQualityMapShadowCache[_0x52eb79]={'shadeBitmap':_0x44970c[0x0],'roofBitmap':_0x44970c[0x1],'shadowBitmaps':_0x44970c[0x2][_0x47fd7c(0x189)]([]),'objectShadowBitmaps':_0x44970c[0x3]['concat']([])};},renderTexturePool=[];function acquireRenderTexture(){const _0x33aa19=_0x22037d;return renderTexturePool['length']>0x0?renderTexturePool['pop']():PIXI[_0x33aa19(0x1e8)][_0x33aa19(0x206)]({'width':Graphics['width'],'height':Graphics['height']});}function releaseRenderTexture(_0x2b64d4){const _0x1a6654=_0x22037d,_0x7b25a8=Graphics[_0x1a6654(0x1a4)][_0x1a6654(0x1e5)];_0x7b25a8[_0x1a6654(0x193)][_0x1a6654(0x1bf)](_0x2b64d4),_0x7b25a8['renderTexture']['clear'](),_0x7b25a8[_0x1a6654(0x193)][_0x1a6654(0x1bf)](null),renderTexturePool[_0x1a6654(0x188)](_0x2b64d4);}PluginManager[_0x22037d(0x203)](pluginName,_0x22037d(0x1bd),_0xa724d7=>{Graphics['startLoading'](),setTimeout(()=>{const _0x1be87f=_0x948b;SceneManager[_0x1be87f(0x166)][_0x1be87f(0x17c)]();},0xa);}),PluginManager[_0x22037d(0x203)](pluginName,_0x22037d(0x183),_0x8f6c40=>{const _0x53b0c3=_0x22037d;SceneManager[_0x53b0c3(0x166)][_0x53b0c3(0x1b1)]();}),Scene_Map[_0x22037d(0x163)]['setShadowSprites']=function(){const _0x3fca1a=_0x22037d,_0x3e757b=$gameMap[_0x3fca1a(0x1b3)](),_0x1e7b68=$gameMap[_0x3fca1a(0x1f3)]();this['shadowBitmapSpriteArray']=[],this[_0x3fca1a(0x178)]=[];const _0x6d7d65=HighQualityMapShadowCache[$gameMap[_0x3fca1a(0x207)]()];if(_0x6d7d65){for(let _0x30bd55=0x0;_0x30bd55<=0x6;_0x30bd55++){const _0x298f6a=new Sprite();_0x298f6a[_0x3fca1a(0x15a)]=_0x6d7d65[_0x3fca1a(0x1ba)][_0x30bd55],this['shadowBitmapSpriteArray'][_0x3fca1a(0x188)](_0x298f6a);const _0x2ea3bb=new Sprite();_0x2ea3bb[_0x3fca1a(0x15a)]=_0x6d7d65[_0x3fca1a(0x1da)][_0x30bd55],this[_0x3fca1a(0x178)][_0x3fca1a(0x188)](_0x2ea3bb);}this[_0x3fca1a(0x212)]=new Sprite(),this[_0x3fca1a(0x212)][_0x3fca1a(0x15a)]=_0x6d7d65[_0x3fca1a(0x1d2)],this[_0x3fca1a(0x1a5)]=new Sprite(),this[_0x3fca1a(0x1a5)][_0x3fca1a(0x15a)]=_0x6d7d65[_0x3fca1a(0x1b7)];}else{for(let _0x175360=0x0;_0x175360<=0x6;_0x175360++){const _0x542473=new Sprite(),_0x38c94b=new Bitmap($dataMap['width']*_0x3e757b,$dataMap['height']*_0x1e7b68);_0x38c94b['baseTexture'][_0x3fca1a(0x190)]=PIXI[_0x3fca1a(0x18d)][_0x3fca1a(0x1e3)],_0x38c94b[_0x3fca1a(0x158)][_0x3fca1a(0x16b)]=PIXI[_0x3fca1a(0x1ef)]['NEAREST'],_0x38c94b[_0x3fca1a(0x158)][_0x3fca1a(0x17f)](),_0x542473['bitmap']=_0x38c94b,this[_0x3fca1a(0x1fe)][_0x3fca1a(0x188)](_0x542473);const _0x13e580=new Sprite(),_0x43fa1b=new Bitmap($dataMap[_0x3fca1a(0x1c9)]*_0x3e757b,$dataMap['height']*_0x1e7b68);_0x43fa1b[_0x3fca1a(0x158)][_0x3fca1a(0x190)]=PIXI[_0x3fca1a(0x18d)][_0x3fca1a(0x1e3)],_0x43fa1b[_0x3fca1a(0x158)][_0x3fca1a(0x16b)]=PIXI[_0x3fca1a(0x1ef)][_0x3fca1a(0x1a2)],_0x43fa1b['baseTexture'][_0x3fca1a(0x17f)](),_0x13e580['bitmap']=_0x43fa1b,this[_0x3fca1a(0x178)]['push'](_0x13e580);}this['shadeBitmapSprite']=new Sprite(),this[_0x3fca1a(0x212)]['bitmap']=new Bitmap($dataMap[_0x3fca1a(0x1c9)]*_0x3e757b,$dataMap['height']*_0x1e7b68),this[_0x3fca1a(0x1a5)]=new Sprite(),this[_0x3fca1a(0x1a5)][_0x3fca1a(0x15a)]=new Bitmap($dataMap[_0x3fca1a(0x1c9)]*_0x3e757b,$dataMap[_0x3fca1a(0x159)]*_0x1e7b68),this[_0x3fca1a(0x172)]();}},Scene_Map[_0x22037d(0x163)][_0x22037d(0x1e0)]=function(){const _0x5c65b4=_0x22037d;this[_0x5c65b4(0x1fe)][_0x5c65b4(0x1d6)](_0xfd5200=>_0xfd5200[_0x5c65b4(0x217)]()),this[_0x5c65b4(0x178)][_0x5c65b4(0x1d6)](_0x1aaf65=>_0x1aaf65[_0x5c65b4(0x217)]()),this[_0x5c65b4(0x212)][_0x5c65b4(0x217)](),this[_0x5c65b4(0x1a5)]['destroy'](),this['shadowBitmapSpriteArray']=[],this[_0x5c65b4(0x178)]=[];};function maskBitmap(_0x511719,_0x3600f2){const _0x3fe088=_0x22037d,_0x43e48b=_0x511719[_0x3fe088(0x15c)];_0x43e48b[_0x3fe088(0x210)](),_0x43e48b[_0x3fe088(0x1ac)]='destination-in',_0x43e48b['drawImage'](_0x3600f2[_0x3fe088(0x1f0)],0x0,0x0),_0x43e48b[_0x3fe088(0x1be)](),_0x511719[_0x3fe088(0x158)][_0x3fe088(0x17f)]();}function eraseMaskedArea(_0x40205c,_0x4e968b,_0x30013a,_0x1e19f5){const _0x2a2a3f=_0x22037d,_0x4dc6df=_0x40205c[_0x2a2a3f(0x15c)];_0x4dc6df[_0x2a2a3f(0x210)](),_0x4dc6df[_0x2a2a3f(0x1ac)]=_0x2a2a3f(0x1f9),_0x4dc6df[_0x2a2a3f(0x1b0)](_0x4e968b[_0x2a2a3f(0x1f0)],_0x30013a,_0x1e19f5),_0x4dc6df['restore'](),_0x40205c[_0x2a2a3f(0x158)]['update']();}Scene_Map[_0x22037d(0x163)][_0x22037d(0x172)]=function(){const _0x59eac2=_0x22037d;let _0x3b7881=[];const _0x546b50=$gameMap[_0x59eac2(0x1b3)](),_0x28955e=$gameMap[_0x59eac2(0x1f3)]();for(let _0x12d5aa=0x0;_0x12d5aa<$dataMap[_0x59eac2(0x159)];_0x12d5aa++){for(let _0x5872b1=0x0;_0x5872b1<$dataMap[_0x59eac2(0x1c9)];_0x5872b1++){const _0xe879a7=$gameMap[_0x59eac2(0x1e7)](_0x5872b1,_0x12d5aa,!![]),_0x3ba786=_0x5872b1*_0x546b50,_0x2274cb=_0x12d5aa*_0x28955e;if(_0xe879a7==null)this[_0x59eac2(0x1a5)][_0x59eac2(0x15a)]['fillRect'](_0x3ba786,_0x2274cb,_0x546b50,_0x28955e,_0x59eac2(0x1ed));else _0xe879a7[_0x59eac2(0x1e4)]&&_0xe879a7[_0x59eac2(0x1d6)](_0x4c87e7=>{const _0x2d4e53=_0x59eac2,_0x19d5c3=_0x4c87e7[0x2];if(_0x4c87e7[0x3]<Tilemap[_0x2d4e53(0x17b)]){if(_0x19d5c3==roofTerrainTagId)this['roofBitmapSprite']['bitmap'][_0x2d4e53(0x197)](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e);else{let _0x227a48=0x0;while($gameMap[_0x2d4e53(0x1e7)](_0x5872b1,_0x12d5aa+_0x227a48+0x1)[_0x2d4e53(0x18c)](_0x2fd752=>_0x2fd752[0x3]==_0x4c87e7[0x3]+(_0x227a48+0x1)*0x8)){_0x227a48++;}const _0x1d9b4f=$gameMap[_0x2d4e53(0x177)](_0x5872b1,_0x12d5aa,0x0)==0x0&&$gameMap[_0x2d4e53(0x177)](_0x5872b1,_0x12d5aa,0x1)==0x0;_0x1d9b4f&&(this['roofBitmapSprite'][_0x2d4e53(0x15a)][_0x2d4e53(0x1ca)](_0x3ba786,_0x2274cb,_0x546b50,_0x28955e),eraseMaskedArea(this['roofBitmapSprite'][_0x2d4e53(0x15a)],_0x4c87e7[0x1],_0x3ba786,_0x2274cb)),_0x4c87e7[0x4]==0x0&&eraseMaskedArea(this[_0x2d4e53(0x1a5)][_0x2d4e53(0x15a)],_0x4c87e7[0x1],_0x3ba786,_0x2274cb),this[_0x2d4e53(0x178)][_0x227a48][_0x2d4e53(0x15a)]['blt'](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e),this[_0x2d4e53(0x212)][_0x2d4e53(0x15a)][_0x2d4e53(0x197)](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e);}}else{if(Tilemap['isTileA2'](_0x4c87e7[0x3])&&_0x4c87e7[0x2]==0x1)this[_0x2d4e53(0x178)][0x0]['bitmap']['blt'](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e),this[_0x2d4e53(0x212)][_0x2d4e53(0x15a)][_0x2d4e53(0x197)](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e);else{if(_0x19d5c3==roofTerrainTagId)this[_0x2d4e53(0x1a5)][_0x2d4e53(0x15a)][_0x2d4e53(0x197)](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e);else{if(_0x19d5c3==shadowTerrainTagId){let _0x234963=0x0,_0x599ccf=-0x1,_0x20eb15=![];while($gameMap[_0x2d4e53(0x1e7)](_0x5872b1,_0x12d5aa-_0x234963-0x1)){const _0x53f9f5=$gameMap['getTileInfoAt'](_0x5872b1,_0x12d5aa-_0x234963-0x1)[_0x2d4e53(0x18c)](_0xb74bc2=>_0xb74bc2[0x2]==shadowTerrainTagId),_0x1ac93f=$gameMap['getTileInfoAt'](_0x5872b1,_0x12d5aa-_0x234963-0x1)[_0x2d4e53(0x18c)](_0x314744=>_0x314744[0x2]==roofTerrainTagId);if(!_0x1ac93f&&!_0x53f9f5)break;if(_0x20eb15&&_0x53f9f5)break;_0x1ac93f&&(_0x20eb15=!![],_0x599ccf++),_0x234963++;}let _0x106093=0x0,_0x74bdfa=!![];while(_0x74bdfa){_0x74bdfa=$gameMap[_0x2d4e53(0x1e7)](_0x5872b1,_0x12d5aa+_0x106093+0x1)['some'](_0x193bd6=>_0x193bd6[0x2]==shadowTerrainTagId&&(Tilemap[_0x2d4e53(0x1df)](_0x193bd6[0x3])||Tilemap[_0x2d4e53(0x1ad)](_0x193bd6[0x3]))),_0x74bdfa&&_0x106093++;}if(_0x106093>0x6)throw new Error(_0x2d4e53(0x1fa)+_0x5872b1+',\x20y:'+_0x12d5aa);this[_0x2d4e53(0x212)]['bitmap'][_0x2d4e53(0x197)](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,_0x2274cb,_0x546b50,_0x28955e);for(let _0x5deefb=0x0;_0x5deefb<=_0x599ccf;_0x5deefb++){this['shadowBitmapSpriteArray'][_0x106093]['bitmap'][_0x2d4e53(0x197)](_0x4c87e7[0x1],0x0,0x0,_0x546b50,_0x28955e,_0x3ba786,(_0x12d5aa-_0x5deefb)*_0x28955e,_0x546b50,_0x28955e);}}}}}});}}const _0x232850=[this['shadeBitmapSprite']['bitmap'],this['roofBitmapSprite'][_0x59eac2(0x15a)],this[_0x59eac2(0x1fe)][_0x59eac2(0x191)](_0x3790b8=>_0x3790b8[_0x59eac2(0x15a)]),this[_0x59eac2(0x178)][_0x59eac2(0x191)](_0x507b14=>_0x507b14['bitmap'])];setHighQualityMapShadowCache($gameMap['mapId'](),_0x232850);},Scene_Map['prototype'][_0x22037d(0x17c)]=function(){const _0x29d0a4=_0x22037d;$gameSystem['setHighQualityShadowFilter']=!![];const _0x128732=this[_0x29d0a4(0x20a)][_0x29d0a4(0x1c6)];_0x128732[_0x29d0a4(0x1bb)]?(_0x128732['_highQualityShadowFilter'][_0x29d0a4(0x1ee)](),_0x128732[_0x29d0a4(0x1cc)][_0x29d0a4(0x1ee)]()):(this[_0x29d0a4(0x1d4)](),this[_0x29d0a4(0x20a)][_0x29d0a4(0x168)](),_0x128732[_0x29d0a4(0x1bb)]=new MapDropShadowFilter(),_0x128732[_0x29d0a4(0x1cc)]=new ComplementBlurFilter(),_0x128732[_0x29d0a4(0x1de)]=[_0x128732['_highQualityShadowFilter'],_0x128732['_complementBlurFilter']],_0x128732[_0x29d0a4(0x16a)](),_0x128732['blendMode']=PIXI[_0x29d0a4(0x1f1)][_0x29d0a4(0x1c8)],_0x128732[_0x29d0a4(0x179)]=new PIXI[(_0x29d0a4(0x1d0))](0x0,0x0,Graphics[_0x29d0a4(0x1c9)],Graphics[_0x29d0a4(0x159)]),this['_spriteset'][_0x29d0a4(0x1ff)][_0x29d0a4(0x1d6)](_0x2b16b0=>_0x2b16b0[_0x29d0a4(0x1eb)]()),setTimeout(()=>{const _0x3424c1=_0x29d0a4;_0x128732[_0x3424c1(0x1bb)][_0x3424c1(0x1ee)](),_0x128732[_0x3424c1(0x1cc)]['refresh']();},0xa)),Graphics[_0x29d0a4(0x1d3)]();},Scene_Map[_0x22037d(0x163)]['removeHighQualityMapLightingWithShadows']=function(){const _0x43bfb9=_0x22037d,_0x2a80c8=this[_0x43bfb9(0x20a)]['shadowLayerSprite'];_0x2a80c8[_0x43bfb9(0x1bb)]&&($gameSystem['setHighQualityShadowFilter']=![],_0x2a80c8[_0x43bfb9(0x1de)]=[],_0x2a80c8['_highQualityShadowFilter']=null,_0x2a80c8['_complementBlurFilter']=null,this[_0x43bfb9(0x1e0)](),this['_spriteset'][_0x43bfb9(0x215)]());};const _alias_Scene_Map_start=Scene_Map[_0x22037d(0x163)][_0x22037d(0x185)];Scene_Map[_0x22037d(0x163)][_0x22037d(0x185)]=function(){const _0x351fd1=_0x22037d;_alias_Scene_Map_start[_0x351fd1(0x174)](this),$gameSystem[_0x351fd1(0x1dd)]&&setTimeout(()=>{const _0x40a33b=_0x351fd1;this[_0x40a33b(0x17c)]();},0x1);};const _alias_Spriteset_Map_createCharacters=Spriteset_Map[_0x22037d(0x163)][_0x22037d(0x20b)];Spriteset_Map['prototype'][_0x22037d(0x20b)]=function(){const _0x2e548f=_0x22037d;_alias_Spriteset_Map_createCharacters['call'](this),$gameSystem[_0x2e548f(0x1dd)]&&this[_0x2e548f(0x168)]();};const _alias_Spriteset_Map_createCharactersShadow=Spriteset_Map[_0x22037d(0x163)][_0x22037d(0x168)];Spriteset_Map[_0x22037d(0x163)][_0x22037d(0x168)]=function(){const _0x445c42=_0x22037d;this['_charRenderTexture']&&(releaseRenderTexture(this[_0x445c42(0x198)]),this[_0x445c42(0x198)]=null),this['_charShadeRenderTexture']&&(releaseRenderTexture(this[_0x445c42(0x1e1)]),this['_charShadeRenderTexture']=null),this[_0x445c42(0x198)]=acquireRenderTexture(),this[_0x445c42(0x1e1)]=acquireRenderTexture(),this[_0x445c42(0x1ff)][_0x445c42(0x1d6)](_0x357cd3=>{const _0x3ab37a=_0x445c42;_0x357cd3[_0x3ab37a(0x17f)]();if(!_0x357cd3['visible']||!_0x357cd3[_0x3ab37a(0x1fb)]||_0x357cd3[_0x3ab37a(0x1fb)]==='')return;if(_0x357cd3[_0x3ab37a(0x1f2)]&&_0x357cd3[_0x3ab37a(0x1f2)]['_eventId']&&_0x357cd3[_0x3ab37a(0x1f2)][_0x3ab37a(0x19b)]()['meta'][_0x3ab37a(0x18e)])return;!_0x357cd3[_0x3ab37a(0x1de)]&&(_0x357cd3[_0x3ab37a(0x1de)]=[]),_0x357cd3[_0x3ab37a(0x1c0)]=new PIXI[(_0x3ab37a(0x19d))](_0x357cd3['texture']),_0x357cd3['characterShadowFilter']=new CharacterShadowFilter(),_0x357cd3[_0x3ab37a(0x1c0)]['filters']=[_0x357cd3[_0x3ab37a(0x20f)]],_0x357cd3[_0x3ab37a(0x192)][_0x3ab37a(0x158)]['wrapMode']=PIXI[_0x3ab37a(0x18d)][_0x3ab37a(0x1e3)],_0x357cd3[_0x3ab37a(0x192)][_0x3ab37a(0x158)][_0x3ab37a(0x1d1)]=PIXI[_0x3ab37a(0x204)]['NONE'],_0x357cd3['characterShadowFilterSprite']['texture']['baseTexture']['wrapMode']=PIXI['WRAP_MODES'][_0x3ab37a(0x1e3)],_0x357cd3[_0x3ab37a(0x1c0)]['texture'][_0x3ab37a(0x158)][_0x3ab37a(0x1d1)]=PIXI[_0x3ab37a(0x204)]['NONE'],_0x357cd3[_0x3ab37a(0x20f)]['autoFit']=![],_0x357cd3[_0x3ab37a(0x1c0)][_0x3ab37a(0x192)][_0x3ab37a(0x158)][_0x3ab37a(0x17f)](),_0x357cd3['texture'][_0x3ab37a(0x158)][_0x3ab37a(0x17f)]();});},Spriteset_Map['prototype'][_0x22037d(0x215)]=function(){const _0x22b195=_0x22037d;this[_0x22b195(0x1e1)]=null,this[_0x22b195(0x198)]=null,this[_0x22b195(0x1ff)][_0x22b195(0x1d6)](_0x41b0c7=>{const _0x2d7f63=_0x22b195;if(!_0x41b0c7[_0x2d7f63(0x1c0)])return;_0x41b0c7[_0x2d7f63(0x1c0)][_0x2d7f63(0x217)](),_0x41b0c7[_0x2d7f63(0x19f)](_0x41b0c7[_0x2d7f63(0x1c0)]),_0x41b0c7['characterShadowFilterSprite']=null,_0x41b0c7[_0x2d7f63(0x20f)]=null;}),this[_0x22b195(0x198)]&&(releaseRenderTexture(this[_0x22b195(0x198)]),this[_0x22b195(0x198)]=null),this[_0x22b195(0x1e1)]&&(releaseRenderTexture(this[_0x22b195(0x1e1)]),this[_0x22b195(0x1e1)]=null);};const _alias_Spriteset_Map_update=Spriteset_Map['prototype'][_0x22037d(0x17f)];Spriteset_Map[_0x22037d(0x163)][_0x22037d(0x17f)]=function(){const _0x4229d6=_0x22037d;_alias_Spriteset_Map_update[_0x4229d6(0x174)](this);if(!SceneManager['_scene'][_0x4229d6(0x20a)][_0x4229d6(0x1c6)][_0x4229d6(0x1bb)])return;let _0x981975=$gameVariables['value'](degreeVarId)*Math['PI']/0xb4;_0x981975=_0x981975%(3.14*0x2),_0x981975=Math[_0x4229d6(0x1c2)](_0x981975*0x64)/0x64;const _0x1eff87=0.05,_0x55cb4b=[0x0,1.57,3.14,4.71,6.28],_0x3a2e1d=_0x55cb4b[_0x4229d6(0x1f5)](_0x583597=>{return _0x583597-_0x1eff87<=_0x981975&&_0x981975<=_0x583597+_0x1eff87;});_0x3a2e1d&&(_0x981975=_0x981975>_0x3a2e1d?_0x3a2e1d+0.05:_0x3a2e1d-0.05);const _0x260361=Math['sin'](_0x981975)*0x64,_0x1cf35d=Math[_0x4229d6(0x200)](_0x981975)*0x64,_0xfb7879=0x64;this[_0x4229d6(0x1c6)]['_highQualityShadowFilter'][_0x4229d6(0x17f)]([_0x260361,_0x1cf35d,_0xfb7879]),this[_0x4229d6(0x1c6)][_0x4229d6(0x1cc)][_0x4229d6(0x17f)]([_0x260361,_0x1cf35d,_0xfb7879]);const _0x3a9759=Graphics[_0x4229d6(0x1a4)][_0x4229d6(0x1e5)],_0x4db9e2=this[_0x4229d6(0x198)];_0x3a9759['renderTexture'][_0x4229d6(0x1bf)](_0x4db9e2),_0x3a9759[_0x4229d6(0x193)][_0x4229d6(0x167)](),_0x3a9759[_0x4229d6(0x193)][_0x4229d6(0x1bf)](null);const _0x58de43=this[_0x4229d6(0x1e1)];_0x3a9759[_0x4229d6(0x193)][_0x4229d6(0x1bf)](_0x58de43),_0x3a9759[_0x4229d6(0x193)][_0x4229d6(0x167)](),_0x3a9759[_0x4229d6(0x193)][_0x4229d6(0x1bf)](null);let _0x241e66=0x4;const _0x104f1c=$gameScreen[_0x4229d6(0x214)](),_0x912abb=this[_0x4229d6(0x1a9)],_0xf9bf2a=_0x912abb[_0x4229d6(0x1dc)]['x'],_0x4e8c35=_0x912abb[_0x4229d6(0x1dc)]['y'],_0x2ca1d4=this['x']+Math[_0x4229d6(0x1c2)](_0xf9bf2a*(_0x104f1c-0x1)),_0x3f0c36=this['y']+Math[_0x4229d6(0x1c2)](_0x4e8c35*(_0x104f1c-0x1)),_0x2c822c=[_0x2ca1d4/_0x104f1c,_0x3f0c36/_0x104f1c];for(const _0x2c9844 of this[_0x4229d6(0x1ff)]){if(!_0x2c9844[_0x4229d6(0x1c0)])continue;_0x2c9844[_0x4229d6(0x1f8)](),_0x2c9844[_0x4229d6(0x20f)][_0x4229d6(0x17f)]([_0x260361*0x5,_0x1cf35d*0x5,_0xfb7879],[this['x'],this['y']],_0x2c822c);const _0x1e380b=_0x2c9844[_0x4229d6(0x181)]>0x0?[0xa,0x3c]:[0x0,0x0];_0x2c9844['characterShadowFilterSprite']['x']=Math[_0x4229d6(0x1c2)](_0x2c9844['x']+_0x2c9844[_0x4229d6(0x1c3)][_0x4229d6(0x1c9)]*_0x2c9844[_0x4229d6(0x170)][0x0]+_0x1e380b[0x0]),_0x2c9844[_0x4229d6(0x1c0)]['y']=Math[_0x4229d6(0x1c2)](_0x2c9844['y']+_0x2c9844[_0x4229d6(0x1c3)]['height']*_0x2c9844[_0x4229d6(0x170)][0x1]-0x5-_0x1e380b[0x1]),_0x2c9844[_0x4229d6(0x1c0)][_0x4229d6(0x186)][_0x4229d6(0x1c4)](_0x2c9844[_0x4229d6(0x186)]['x'],_0x2c9844[_0x4229d6(0x186)]['y']),_0x2c9844[_0x4229d6(0x1c0)]['scale'][_0x4229d6(0x1c4)](_0x241e66,_0x241e66),_0x3a9759[_0x4229d6(0x173)](_0x2c9844['characterShadowFilterSprite'],_0x4db9e2,![]),_0x3a9759['render'](_0x2c9844,_0x58de43,![]);}};const _alias_Spriteset_Map_createShadow=Spriteset_Map[_0x22037d(0x163)][_0x22037d(0x15e)];Spriteset_Map[_0x22037d(0x163)][_0x22037d(0x15e)]=function(){const _0x5c12f7=_0x22037d;_alias_Spriteset_Map_createShadow['call'](this),this[_0x5c12f7(0x1c6)]=new Sprite(),this['shadowLayerSprite'][_0x5c12f7(0x15a)]=new Bitmap(Graphics[_0x5c12f7(0x1c9)],Graphics[_0x5c12f7(0x159)]),this['shadowLayerSprite']['filters']=[],this[_0x5c12f7(0x1a9)][_0x5c12f7(0x1a8)](this[_0x5c12f7(0x1c6)]);};const _Sprite_Character_updateCharacterFrame=Sprite_Character[_0x22037d(0x163)][_0x22037d(0x1f8)];Sprite_Character[_0x22037d(0x163)][_0x22037d(0x1f8)]=function(){const _0x292bc3=_0x22037d;_Sprite_Character_updateCharacterFrame[_0x292bc3(0x174)](this);if(this[_0x292bc3(0x1c0)]){const _0x285294=this[_0x292bc3(0x195)](),_0x1b33c9=this[_0x292bc3(0x216)](),_0x5f1287=(this[_0x292bc3(0x1e9)]()+this['characterPatternX']())*_0x285294,_0x4d6859=(this['characterBlockY']()+this[_0x292bc3(0x180)]())*_0x1b33c9;if(this[_0x292bc3(0x20f)]){const _0x54fe6a=this['_bushDepth']>0x0?0.2:0x0;this[_0x292bc3(0x20f)]['uniforms']['d3']!=_0x54fe6a&&(this[_0x292bc3(0x181)]>0x0?(this[_0x292bc3(0x1c0)][_0x292bc3(0x192)]=this[_0x292bc3(0x1d9)][_0x292bc3(0x192)],this[_0x292bc3(0x1eb)]()):(this['characterShadowFilterSprite']['texture']=this['texture'],this['setCharacterMaskUVAdj']())),this['characterShadowFilter'][_0x292bc3(0x218)]['d3']=_0x54fe6a;}}};const _alias_Sprite_Character_setCharacterBitmap=Sprite_Character['prototype'][_0x22037d(0x184)];Sprite_Character[_0x22037d(0x163)]['setCharacterBitmap']=function(){const _0x180784=_0x22037d;_alias_Sprite_Character_setCharacterBitmap[_0x180784(0x174)](this),this[_0x180784(0x1eb)]();},Sprite_Character['prototype'][_0x22037d(0x1eb)]=function(){const _0x49579b=_0x22037d;if(!this[_0x49579b(0x20f)])return;let _0x5e87f9=0x0,_0x4f289b=0x0;for(let _0xf17d58=0x0;_0xf17d58<=0x9;_0xf17d58++){if(Math[_0x49579b(0x1cb)](0x2,_0xf17d58)<this[_0x49579b(0x1c3)][_0x49579b(0x159)]&&this[_0x49579b(0x1c3)]['height']<=Math[_0x49579b(0x1cb)](0x2,_0xf17d58+0x1)){_0x4f289b=this[_0x49579b(0x1c3)][_0x49579b(0x159)]/Math[_0x49579b(0x1cb)](0x2,_0xf17d58+0x1);break;}}this[_0x49579b(0x20f)][_0x49579b(0x218)]['d2']=[0x0,_0x4f289b],this[_0x49579b(0x170)]=[0x0,0x0];const _0xf2ac46=this[_0x49579b(0x1c3)]['width'],_0x4cf157=this[_0x49579b(0x1c3)][_0x49579b(0x159)];for(let _0x1a3d2d=0x0;_0x1a3d2d<=0x9;_0x1a3d2d++){const _0x197b4b=Math[_0x49579b(0x1cb)](0x2,_0x1a3d2d),_0x385cb4=Math[_0x49579b(0x1cb)](0x2,_0x1a3d2d+0x1);if(_0x197b4b<_0xf2ac46&&_0xf2ac46<=_0x385cb4){const _0x3e3cde=0x1+0.3*(0x1-(_0xf2ac46-_0x197b4b*0x3/0x2)/(_0x197b4b/0x2));_0x5e87f9=(_0xf2ac46-_0x197b4b)/_0x197b4b*_0x3e3cde-0.5;break;}}for(let _0x22ec4a=0x0;_0x22ec4a<=0x9;_0x22ec4a++){const _0x50893b=Math['pow'](0x2,_0x22ec4a),_0xf86f2=Math[_0x49579b(0x1cb)](0x2,_0x22ec4a+0x1);if(_0x50893b<_0x4cf157&&_0x4cf157<=_0xf86f2){const _0x43ae2a=0.5+0.2*(0x1-(_0xf2ac46-_0x50893b*0x3/0x2)/(_0x50893b/0x2));_0x4f289b=(_0x4cf157-_0x50893b)/_0x50893b*_0x43ae2a+0x2;break;}}this[_0x49579b(0x170)]=[_0x5e87f9,_0x4f289b];},Game_Map[_0x22037d(0x163)][_0x22037d(0x1ab)]=function(_0x582c7f,_0x4cbd8f){const _0x2eddcc=_0x22037d;if(this[_0x2eddcc(0x161)](_0x582c7f,_0x4cbd8f)){const _0x315c05=this[_0x2eddcc(0x1b8)](),_0x336ee8=[];for(let _0x12ada7=0x0;_0x12ada7<0x4;_0x12ada7++){_0x336ee8['push'](this[_0x2eddcc(0x177)](_0x582c7f,_0x4cbd8f,_0x12ada7));}for(const _0x3e8f1c of _0x336ee8){const _0x14fd47=_0x315c05[_0x3e8f1c]>>0xc;if(_0x14fd47>0x0)return _0x14fd47;}}return 0x0;},Game_Map[_0x22037d(0x163)]['layerTerrainTag']=function(_0x449567,_0x1ca11c,_0x59efd7){const _0x4a91da=_0x22037d;if(this[_0x4a91da(0x161)](_0x449567,_0x1ca11c)){const _0x1d2368=this[_0x4a91da(0x1b8)](),_0x38dd15=this['layeredTiles'](_0x449567,_0x1ca11c),_0x2787bc=_0x1d2368[_0x38dd15[_0x59efd7]]>>0xc;if(_0x2787bc>0x0)return _0x2787bc;}return 0x0;},Game_Map[_0x22037d(0x163)][_0x22037d(0x1e7)]=function(_0x15c431,_0x3ec173,_0x383018=![]){const _0x3945dc=_0x22037d,_0x505c24=$gameMap['layeredTiles'](_0x15c431,_0x3ec173),_0x5d636f=[];let _0x1cf038=!![];for(let _0xa34f6f=_0x505c24['length'];_0xa34f6f>=0x0;_0xa34f6f--){const _0x624bc2=_0x505c24[_0xa34f6f];_0x1cf038&&_0x624bc2>0x0&&(_0x1cf038=![]);;const _0x55f46f=$gameMap['layerTerrainTag'](_0x15c431,_0x3ec173,_0xa34f6f);if(_0x624bc2===0x0||!~[shadowTerrainTagId,roofTerrainTagId][_0x3945dc(0x205)](_0x55f46f))continue;const _0x1197ac=0x3-_0xa34f6f,_0xdb8903=getTileChipBitmap(_0x624bc2);_0x5d636f[_0x3945dc(0x188)]([_0x1197ac,_0xdb8903,_0x55f46f,_0x624bc2,_0xa34f6f]);}return _0x383018&&_0x1cf038?null:_0x5d636f;};function getTilesetImageName(_0x226b18){const _0x4a3817=_0x22037d,_0x47a9e2=$gameMap[_0x4a3817(0x157)]();if(Tilemap['isTileA1'](_0x226b18))return _0x47a9e2['tilesetNames'][0x0];else{if(Tilemap[_0x4a3817(0x19c)](_0x226b18))return _0x47a9e2['tilesetNames'][0x1];else{if(Tilemap['isTileA3'](_0x226b18))return _0x47a9e2[_0x4a3817(0x196)][0x2];else{if(Tilemap[_0x4a3817(0x1ad)](_0x226b18))return _0x47a9e2[_0x4a3817(0x196)][0x3];else{if(Tilemap[_0x4a3817(0x1b4)](_0x226b18))return _0x47a9e2[_0x4a3817(0x196)][0x4];else{if(_0x226b18>=Tilemap['TILE_ID_B']&&_0x226b18<Tilemap[_0x4a3817(0x155)])return _0x47a9e2[_0x4a3817(0x196)][0x5];else{if(_0x226b18>=Tilemap['TILE_ID_C']&&_0x226b18<Tilemap[_0x4a3817(0x20e)])return _0x47a9e2[_0x4a3817(0x196)][0x6];else{if(_0x226b18>=Tilemap[_0x4a3817(0x20e)]&&_0x226b18<Tilemap[_0x4a3817(0x17e)])return _0x47a9e2[_0x4a3817(0x196)][0x7];else return _0x226b18>=Tilemap[_0x4a3817(0x17e)]&&_0x226b18<Tilemap[_0x4a3817(0x17b)]?_0x47a9e2[_0x4a3817(0x196)][0x8]:'';}}}}}}}}let _tileChipBitmapCache={};function getTileChipBitmap(_0x20808e){const _0x4001f8=_0x22037d;if(_tileChipBitmapCache[_0x20808e])return _tileChipBitmapCache[_0x20808e];const _0xdbdb0c=SceneManager[_0x4001f8(0x166)]['_spriteset'][_0x4001f8(0x1a9)],_0x367216=_0xdbdb0c[_0x4001f8(0x1b3)],_0x2cd5da=_0xdbdb0c['tileHeight'],_0x398ee3=new Bitmap(_0x367216,_0x2cd5da);if(Tilemap[_0x4001f8(0x1d7)](_0x20808e)){const _0x378519=Tilemap[_0x4001f8(0x1b2)](_0x20808e),_0x5ee4c7=Tilemap['getAutotileShape'](_0x20808e),_0x5a16ef=_0x378519%0x8,_0x59b6d7=Math[_0x4001f8(0x18a)](_0x378519/0x8);let _0x528b25=0x0,_0x9ad582=0x0,_0x1a7cae=0x0,_0x92c74c=Tilemap[_0x4001f8(0x1a6)],_0x901461=![];if(Tilemap[_0x4001f8(0x19e)](_0x20808e)){const _0x5ed343=[0x0,0x1,0x2,0x1][_0xdbdb0c[_0x4001f8(0x1bc)]%0x4];_0x528b25=0x0;if(_0x378519===0x0)_0x9ad582=_0x5ed343*0x2,_0x1a7cae=0x0;else{if(_0x378519===0x1)_0x9ad582=_0x5ed343*0x2,_0x1a7cae=0x3;else{if(_0x378519===0x2)_0x9ad582=0x6,_0x1a7cae=0x0;else _0x378519===0x3?(_0x9ad582=0x6,_0x1a7cae=0x3):(_0x9ad582=Math[_0x4001f8(0x18a)](_0x5a16ef/0x4)*0x8,_0x1a7cae=_0x59b6d7*0x6+Math[_0x4001f8(0x18a)](_0x5a16ef/0x2)%0x2*0x3,_0x378519%0x2===0x0?_0x9ad582+=_0x5ed343*0x2:(_0x9ad582+=0x6,_0x92c74c=Tilemap[_0x4001f8(0x16e)],_0x1a7cae+=_0xdbdb0c[_0x4001f8(0x1bc)]%0x3));}}}else{if(Tilemap['isTileA2'](_0x20808e))_0x528b25=0x1,_0x9ad582=_0x5a16ef*0x2,_0x1a7cae=(_0x59b6d7-0x2)*0x3,_0x901461=_0xdbdb0c[_0x4001f8(0x1e6)](_0x20808e);else{if(Tilemap[_0x4001f8(0x1df)](_0x20808e))_0x528b25=0x2,_0x9ad582=_0x5a16ef*0x2,_0x1a7cae=(_0x59b6d7-0x6)*0x2,_0x92c74c=Tilemap[_0x4001f8(0x1ec)];else Tilemap[_0x4001f8(0x1ad)](_0x20808e)&&(_0x528b25=0x3,_0x9ad582=_0x5a16ef*0x2,_0x1a7cae=Math[_0x4001f8(0x18a)]((_0x59b6d7-0xa)*2.5+(_0x59b6d7%0x2===0x1?0.5:0x0)),_0x59b6d7%0x2===0x1&&(_0x92c74c=Tilemap[_0x4001f8(0x1ec)]));}}const _0x435cf9=_0x92c74c[_0x5ee4c7],_0x4529ed=_0x367216/0x2,_0x10dba0=_0x2cd5da/0x2,_0x944992=ImageManager[_0x4001f8(0x1af)](getTilesetImageName(_0x20808e));for(let _0x2e9a94=0x0;_0x2e9a94<0x4;_0x2e9a94++){const _0x5ad8c1=_0x435cf9[_0x2e9a94][0x0],_0x818155=_0x435cf9[_0x2e9a94][0x1],_0x59f4ab=(_0x9ad582*0x2+_0x5ad8c1)*_0x4529ed,_0x1ada58=(_0x1a7cae*0x2+_0x818155)*_0x10dba0,_0xfb3c75=_0x2e9a94%0x2*_0x4529ed,_0x35a484=Math[_0x4001f8(0x18a)](_0x2e9a94/0x2)*_0x10dba0;if(_0x901461&&(_0x818155===0x1||_0x818155===0x5)){const _0x328279=_0x818155===0x1?(0x4-_0x5ad8c1)%0x4:_0x5ad8c1,_0x10b38c=0x3,_0x5422a7=(_0x9ad582*0x2+_0x328279)*_0x4529ed,_0x392001=(_0x1a7cae*0x2+_0x10b38c)*_0x10dba0;_0x398ee3['blt'](_0x944992,_0x5422a7+_0xfb3c75,_0x392001+_0x35a484,_0x4529ed,_0x10dba0,_0xfb3c75,_0x35a484),_0x398ee3['blt'](_0x944992,_0x59f4ab+_0xfb3c75,_0x1ada58+_0x35a484+_0x10dba0/0x2,_0x4529ed,_0x10dba0/0x2,_0xfb3c75,_0x35a484+_0x10dba0/0x2);}else _0x398ee3[_0x4001f8(0x197)](_0x944992,_0x59f4ab,_0x1ada58,_0x4529ed,_0x10dba0,_0xfb3c75,_0x35a484);}}else{const _0xafae43=ImageManager[_0x4001f8(0x1af)](getTilesetImageName(_0x20808e)),_0x3c2b3e=Math[_0x4001f8(0x18a)](_0x20808e/0x80)%0x2*0x8+_0x20808e%0x8,_0x72b5bb=Math['floor'](_0x20808e%0x100/0x8)%0x10;_0x398ee3['blt'](_0xafae43,_0x3c2b3e*_0x367216,_0x72b5bb*_0x2cd5da,_0x367216,_0x2cd5da,0x0,0x0);}return _tileChipBitmapCache[_0x20808e]=_0x398ee3,_0x398ee3;}};