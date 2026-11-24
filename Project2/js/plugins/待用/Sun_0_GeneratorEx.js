//=============================================================================
// RPG Maker MZ - SunMZ_0_GeneratorEx.js
//=============================================================================
/* 
	This software can only be used by users who have purchased it legally and agree to the terms of use.
	Furthermore, this software includes components distributed under the MIT license and Apache 2.0 license.
	http://www.opensource.org/licenses/mit-license
	http://www.apache.org/licenses/LICENSE-2.0
 */
 
/*:
 * @target MZ
 * @plugindesc SunMZ Character Generator Expansion Plugin。
 * @author Sun Min Chiech
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help SunMZ_0_GeneratorEx.js [version 3.0.4]
 * This plugin requires the official plugin [PluginCommonBase.js].
 *
 * Function 1:
 *
 * The ability to freely edit individual character components.
 * This plugin allows for the flexible editing of character sections, adjusting stacking order,
 * and then being able to specify equipment, general parameters, and replacement settings for each character.
 * Each character can be configured with:
 * One set of images (PIC), 
 * one side-view image (SV), 
 * one portrait image (FACE), 
 * one standing image (TV), 
 * one knocked-down image (TVD).
 * Component configuration is completely customizable.
 * 
 * Function 2:
 *
 * Invoke side-view images for dramatic actions in non-combat mode,
 * This feature can be directly applied to characters with configured SV images, applicable to characters or events.
 * Insert the command in the first line's comment of the event.
 * Example:
 * substitute:1:tv
 * substitute:1:tvd
 * substitute:1:sv:thrust:Y
 * <substitute:[Actor ID]:[mode(tv|tvd|sv)]:[svMotion]:[horizontal flip(Y|N)]>
 * svMotion:thrust|swing|missile|walk|dead|sleep|spell|chant|guard|abnormal|dying|wait|skill|item|damage|evade|victory|escape
 * Create new folders (as having too many files in one directory may cause MZ to crash):
 * Place paper doll (PIC) related files under \img\generator_PIC\
 * Place paper doll TV (FG) related files under \img\generator_FG\
 * Place paper doll TV related files under \img\generator_TV\
 * Place paper doll SV related files under \img\generator_SV\
 *
 * Note that setting too many components can cause MZ to crash, so it's best to simplify the settings as much as possible.
 * The template is designed to show where the configuration sections should be placed, which is why there are so many sections.
 * Actually, you don't need to set up so many sections.
 *
 *=============================================================================
 *
 * @param ActorDataList
 * @text Actor Data Ex List
 * @desc Actor Parameter Settings。
 * @default []
 * @type struct<ActorDataExItem>[]
 *
 * @param WeaponDataList
 * @text Weapon Data Ex List
 * @desc Weapon Parameter Settings。
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param WeaponSecDataList
 * @text Weapon Secondary Data Ex List
 * @desc Weapon Parameter Settings。
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param ArmorDataList
 * @text Armor Data Ex List
 * @desc Armor Parameter Settings。
 * @default []
 * @type struct<ArmorDataExItem>[]
 *
 * @param VarDataList
 * @text Variable Data Ex List
 * @desc Variable Parameter Settings。
 * @default []
 * @type struct<VariableDataExItem>[]
 *
 * @param IsSaveSync
 * @text Synchronize with Save Data
 * @desc The character's equipment configuration will be reflected in the saved data
 * @on Yes
 * @off No
 * @type boolean
 * @default true
 *
 * @param SvScalingWidth
 * @text Sv Scaling Width
 * @desc Sv Scaling Width
 * @type text
 * @default 0.75
 *
 * @param SvScalingHeight
 * @text Sv Scaling Height
 * @desc Sv Scaling Height
 * @type text
 * @default 0.75
 *
 * @param AdvancedSettings
 * @text ■ Advanced Settings
 *
 * @param FaceTimeoutNum
 * @text Face Timeout Num
 * @desc Set the face pattern delay time (number of frames)
 * @parent AdvancedSettings
 * @type number
 * @default 3
 *
 * @param IsPreloadPicB64
 * @text Whether to preload Pic B64
 * @desc Whether to preload Pic B64
 * @parent AdvancedSettings
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param IsPreloadFgB64
 * @text Whether to preload Fg B64
 * @desc Whether to preload Fg B64
 * @parent AdvancedSettings
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvB64
 * @text Whether to preload Tv B64
 * @desc Whether to preload Tv B64
 * @parent AdvancedSettings
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvdB64
 * @text Whether to preload Tvd B64
 * @desc Whether to preload Tvd B64
 * @parent AdvancedSettings
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param IsPreloadSvB64
 * @text Whether to preload Sv B64
 * @desc Whether to preload Sv B64
 * @parent AdvancedSettings
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param PicMergeType
 * @text PIC picture merging type
 * @desc PIC picture merging type
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option Waiting for completion
 * @value WaitComple
 * @option Real-time display
 * @value RealTimeDisplay
 *
 * @param FgMergeType
 * @text FG picture merging type
 * @desc FG picture merging type
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option Waiting for completion
 * @value WaitComple
 * @option Real-time display
 * @value RealTimeDisplay
 *
 * @param TvMergeType
 * @text TV picture merging type
 * @desc TV picture merging type
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option Waiting for completion
 * @value WaitComple
 * @option Real-time display
 * @value RealTimeDisplay
 *
 * @param TvdMergeType
 * @text TVD picture merging type
 * @desc TVD picture merging type
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option Waiting for completion
 * @value WaitComple
 * @option Real-time display
 * @value RealTimeDisplay
 *
 * @param SvMergeType
 * @text SV picture merging type
 * @desc SV picture merging type
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option Waiting for completion
 * @value WaitComple
 * @option Real-time display
 * @value RealTimeDisplay
 *
 * @command switchGenerator
 * @text switch Generator
 * @desc switch Generator
 *
 * @arg mode
 * @text Control mode
 * @desc Control mode
 * @type select
 * @default TV
 * @option Standing Walk Mode, Falling Mode
 * @value TV
 * @option Side View
 * @value SV
 * @option Avatar
 * @value FG
 *
 * @arg actorIds
 * 		@text actorId's
 *      @desc Actor ID's
 *      @type actor[]
 *      @default
 *
 * @arg isOpen
 * 		@on Yes
 * 		@off No
 *      @type boolean
 *      @default false
 *
 * @command checkSubstitute
 * @text Specify Event for Forcing Substitute Refresh
 * @desc Specify Event for Forcing Substitute Refresh
 *
 * @arg eventIds
 * 		@text Event ID's
 *      @desc Event ID's
 *      @type number[]
 *      @default 0
 *
 * @command checkGenerator
 * @text Specify Character for Generator Refresh
 * @desc Specify Character for Generator Refresh
 *
 * @arg actorIds
 * 		@text actorId's
 *      @desc Actor ID's
 *      @type actor[]
 *      @default
 *
 * @command setTvMode
 * @text Switch Character TV Display Mode
 * @desc Switch Character TV Display Mode
 *
 * @arg actorIds
 * 		@text actorId's
 *      @desc Actor ID's
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * @text TV Display Mode
 * @desc TV Display Mode
 * @type select
 * @default tv
 * @option Stand-Walk Mode
 * @value tv
 * @option Injured-Knocked Down Mode
 * @value tvd
 * @option Side-View Mode
 * @value sv
 *
 * @arg svMotion
 * @text Side-View Actions
 * @desc Side-View Actions
 * @type select
 * 	  @default none
 * 	  @option none
 * 	  @value none
 * 	  @option thrust
 * 	  @value thrust
 * 	  @option swing
 * 	  @value swing
 * 	  @option missile
 * 	  @value missile
 * 	  @option walk
 * 	  @value walk
 * 	  @option dead
 * 	  @value dead
 *    @option sleep
 * 	  @value sleep
 * 	  @option spell
 *    @value spell
 *    @option chant
 *    @value chant
 *    @option guard
 *    @value guard
 *    @option abnormal
 *    @value abnormal
 *    @option dying
 *    @value dying
 *    @option wait
 *    @value wait
 *    @option skill
 *    @value skill
 *    @option item
 *    @value item
 *    @option damage
 *    @value damage
 *    @option evade
 *    @value evade
 *    @option victory
 *    @value victory
 *    @option escape
 *    @value escape 
 *
 * @arg isHorizontalFlip
 * @text is Horizontal Flip
 * @desc is Horizontal Flip
 * 		@on Yes
 * 		@off No
 *      @type boolean
 *      @default false
 *
 * @command setMessageFace
 * @text Specify Character Portrait for Display in Dialogue
 * @desc Specify Character Portrait for Display in Dialogue
 *
 * @arg actorId
 * 		@text actorId
 *      @desc Actor ID
 *      @type actor
 *      @default
 *
 * @command cleanMessageFace
 * @text Clear Character Portrait Display in Dialogue
 * @desc Clear Character Portrait Display in Dialogue
 *
 * @command setupActorPicture
 * @text Display Character Image
 * @desc Display Character Image
 *
 * @arg pictureId
 * 		@text Image ID
 *      @desc Image ID
 * 		@type number
 *      @default
 *
 * @arg actorId
 * 		@text actorId
 *      @desc Actor ID
 *      @type actor
 *      @default
 *
 * @arg origin
 * 		@text origin
 *      @desc origin
 * 		@type select
 * 	  		@default 0
 * 	  		@option 左上
 * 	  		@value 0
 * 	  		@option 中央
 * 	  		@value 1
 *
 * @arg x
 * 		@text X
 *      @desc X
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg y
 * 		@text Y
 *      @desc Y
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg scaleX
 * 		@text scale X
 *      @desc scale X
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg scaleY
 * 		@text scale Y
 *      @desc scale Y
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg opacity
 * 		@text opacity
 *      @desc opacity
 * 		@type number
 *		@max 255
 *		@min 0
 * 	  	@default 255
 *
 * @arg blendMode
 * 		@text blend Mode
 *      @desc blend Mode
 * 		@type select
 * 	  		@default 0
 * 	  		@option Normal
 * 	  		@value 0
 * 	  		@option Additive
 * 	  		@value 1
 * 	  		@option Multiply
 * 	  		@value 2
 * 	  		@option Screen
 * 	  		@value 3
 *
 * @command generatorB64
 * @text generatorB64
 * @desc generatorB64
 *
 * @arg actorIds
 * 		@text actorId's
 *      @desc actor ID's
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * 		@text mode
 * 		@desc mode
 * 		@type select
 * 		@default PIC
 * 		@option PIC
 * 		@value PIC
 * 		@option FG
 * 		@value FG
 * 		@option TV
 * 		@value TV
 * 		@option TVD
 * 		@value TVD
 * 		@option SV
 * 		@value SV
 *
 * @command changeActorSyncObject
 * @text change actor sync object
 * @desc change actor sync object
 *
 * @arg actorIds
 * 		@text Actor ID's
 *      @desc Actor ID's
 *      @type actor[]
 *      @default
 *
 * @arg syncActorId
 * 		@text Sync Actor ID
 *      @desc Sync Actor ID
 *      @type actor
 *      @default 0
 *
 * @command changeActorPartColor
 * @text change actor part color
 * @desc change actor part color
 *
 * @arg actorIds
 * 		@text Actor ID's
 *      @desc Actor ID's
 *      @type actor[]
 *      @default
 *
 * @arg cds
 * 		@text Part CD's
 * 		@desc Part CD's
 * 		@type text[]
 *
 * @arg orgColor
 * 		@text org color
 * 		@desc org color
 * 		@type select
 * 		@default white
 * 		@option white
 * 		@value white
 * 		@option gray
 * 		@value gray
 * 		@option black
 * 		@value black
 * 		@option gold
 * 		@value gold
 * 		@option silver
 * 		@value silver
 * 		@option copper
 * 		@value copper
 * 		@option red
 * 		@value red
 * 		@option candyApple
 * 		@value candyApple
 * 		@option maroon
 * 		@value maroon
 * 		@option redPurple
 * 		@value redPurple
 *		@option darkReddishbrown
 * 		@value darkReddishbrown
 * 		@option reddishbrown
 * 		@value reddishbrown
 * 		@option darkRed
 * 		@value darkRed
 * 		@option skin
 * 		@value skin
 * 		@option coral
 * 		@value coral
 * 		@option pink
 * 		@value pink
 * 		@option begoniaRed
 * 		@value begoniaRed
 * 		@option magenta
 * 		@value magenta
 * 		@option yellow
 * 		@value yellow
 * 		@option midYellow
 * 		@value midYellow
 * 		@option ochre
 * 		@value ochre
 * 		@option lightOrange
 * 		@value lightOrange
 * 		@option orange
 * 		@value orange
 * 		@option darkYellowGreen
 * 		@value darkYellowGreen
 * 		@option olive
 * 		@value olive
 * 		@option lime
 * 		@value lime
 * 		@option springGreen
 * 		@value springGreen
 * 		@option green
 * 		@value green
 * 		@option persianGreen
 * 		@value persianGreen
 * 		@option deepGreen
 * 		@value deepGreen
 * 		@option turquoise
 * 		@value turquoise
 * 		@option aqua
 * 		@value aqua
 * 		@option skyBlue
 * 		@value skyBlue
 * 		@option teal
 * 		@value teal
 * 		@option olympicBlue
 * 		@value olympicBlue
 * 		@option blue
 * 		@value blue
 * 		@option ultramarineBlue
 * 		@value ultramarineBlue
 * 		@option navyBlue
 * 		@value navyBlue
 * 		@option grape
 * 		@value grape
 * 		@option fuchsia
 * 		@value fuchsia
 * 		@option purple
 * 		@value purple
 * 		@option amethyst
 * 		@value amethyst
 * 		@option darkPurple
 * 		@value darkPurple
 *
 * @arg newColor
 * 		@text new color
 * 		@desc new color
 * 		@type select
 * 		@default none
 * 		@option none
 * 		@value none
 * 		@option white
 * 		@value white
 * 		@option gray
 * 		@value gray
 * 		@option black
 * 		@value black
 * 		@option gold
 * 		@value gold
 * 		@option silver
 * 		@value silver
 * 		@option copper
 * 		@value copper
 * 		@option red
 * 		@value red
 * 		@option candyApple
 * 		@value candyApple
 * 		@option maroon
 * 		@value maroon
 * 		@option redPurple
 * 		@value redPurple
 * 		@option darkReddishbrown
 * 		@value darkReddishbrown
 * 		@option reddishbrown
 * 		@value reddishbrown
 * 		@option darkRed
 * 		@value darkRed
 * 		@option skin
 * 		@value skin
 * 		@option coral
 * 		@value coral
 * 		@option pink
 * 		@value pink
 * 		@option begoniaRed
 * 		@value begoniaRed
 * 		@option magenta
 * 		@value magenta
 * 		@option yellow
 * 		@value yellow
 * 		@option midYellow
 * 		@value midYellow
 * 		@option ochre
 * 		@value ochre
 * 		@option lightOrange
 * 		@value lightOrange
 * 		@option orange
 * 		@value orange
 * 		@option darkYellowGreen
 * 		@value darkYellowGreen
 * 		@option olive
 * 		@value olive
 * 		@option lime
 * 		@value lime
 * 		@option springGreen
 * 		@value springGreen
 * 		@option green
 * 		@value green
 * 		@option persianGreen
 * 		@value persianGreen
 * 		@option deepGreen
 * 		@value deepGreen
 * 		@option turquoise
 * 		@value turquoise
 * 		@option aqua
 * 		@value aqua
 * 		@option skyBlue
 * 		@value skyBlue
 * 		@option teal
 * 		@value teal
 * 		@option olympicBlue
 * 		@value olympicBlue
 * 		@option blue
 * 		@value blue
 * 		@option ultramarineBlue
 * 		@value ultramarineBlue
 * 		@option navyBlue
 * 		@value navyBlue
 * 		@option grape
 * 		@value grape
 * 		@option fuchsia
 * 		@value fuchsia
 * 		@option purple
 * 		@value purple
 * 		@option amethyst
 * 		@value amethyst
 * 		@option darkPurple
 * 		@value darkPurple
 *
 */

/*:ja_JP
 * @target MZ
 * @plugindesc SunMZ Character Generator Expansion Plugin。
 * @author Sun Min Chiech
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help SunMZ_0_GeneratorEx.js [version 3.0.4]
 * このプラグインは公式プラグインを必要とします PluginCommonBase.js
 *
 * 機能1:
 * 自由にキャラクターパーツを編集できる機能です。
 * このプラグインでは、キャラクターの部分構成を自由に編集し、重ねる順序を調整できます。
 * また、装備や共通パラメータを指定し、各キャラクターに置き換え設定を指定できます。
 * それぞれのキャラクターには以下の設定ができます：
 * 1組の画像、サイドビューアングルの画像、アイコン画像、立ち絵画像、ダウン画像
 * 部分の設定は完全にカスタマイズ可能です。
 * 
 * 機能2:
 * 非戦闘モードでサイドビューアングルの画像をシーンアクションとして呼び出す機能です。
 * この機能は、SV画像が設定されているキャラクターに直接適用され、キャラクターまたはイベントに使用できます。
 * イベント内の最初の行に命令を記述してください。
 * EX:<substitute:1:tv>
 * EX:<substitute:1:tvd>
 * EX:<substitute:1:sv:thrust:Y>
 * <substitute:[Acter ID]:[mode(tv|tvd|sv)]:[svMotion]:[horizontal flip(Y|N)]>
 * svMotion:thrust|swing|missile|walk|dead|sleep|spell|chant|guard|abnormal|dying|wait|skill|item|damage|evade|victory|escape
 *
 * 新しいフォルダを作成する必要があります（ファイルが多すぎる場合、設定中にMZがクラッシュする可能性があるため、データを分けて配置します）
 * \img\generator_PIC\ フォルダにペーパードールのPIC関連ファイルを配置します
 * \img\generator_FG\ フォルダにペーパードールのTV関連ファイルを配置します
 * \img\generator_TV\ フォルダにペーパードールのTV関連ファイルを配置します
 * \img\generator_SV\ フォルダにペーパードールのSV関連ファイルを配置します
 * 注意点: 部品を過多に設定すると、MZがクラッシュする可能性があるため、設定内容を簡素化することをお勧めします。
 * テンプレートは、設定すべきブロックの場所を示すために多くのブロックが配置されているだけであり、これほど多くのブロックを設定する必要は実際にはありません。
 *=============================================================================
 *
 * @param ActorDataList
 * @text アクターデータの拡張リスト
 * @desc キャラクター配列に追加したい拡張パラメータを選択して追加します。
 * @default []
 * @type struct<ActorDataExItem>[]
 *
 * @param WeaponDataList
 * @text 武器の配列
 * @desc キャラクターのパーツを武器で置き換える。
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param WeaponSecDataList
 * @text 二次武器の配列
 * @desc キャラクターのパーツを武器で置き換える。
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param ArmorDataList
 * @text 防具の配列
 * @desc キャラクターのパーツを防具で置き換える。
 * @default []
 * @type struct<ArmorDataExItem>[]
 *
 * @param VarDataList
 * @text 変数の配列
 * @desc 変数によるヌード（裸）状態の設定。
 * @default []
 * @type struct<VariableDataExItem>[]
 *
 * @param IsSaveSync
 * @text セーブデータと同期するかどうか
 * @desc キャラクターの装備設定がセーブデータに反映されるようになります。
 * @on はい
 * @off いいえ
 * @type boolean
 * @default true
 *
 * @param SvScalingWidth
 * @text SV画像の拡大縮小率（幅）
 * @desc 非戦闘マップにおけるSVマップの拡大縮小率(幅)
 * @type text
 * @default 0.75
 *
 * @param SvScalingHeight
 * @text SV画像拡大縮小率（高）
 * @desc 非戦闘マップにおけるSVマップの拡大縮小率(高)
 * @type text
 * @default 0.75
 *
 * @param AdvancedSettings
 * @text ■ 詳細設定
 *
 * @param FaceTimeoutNum
 * @text 顔の画像遅延時間
 * @desc 「顔画像の遅延時間（ミリ秒単位）」を設定します。
 * @parent AdvancedSettings
 * @type number
 * @default 3
 *
 * @param IsPreloadPicB64
 * @text Pic Base64をプリロードするかどうか
 * @desc Pic Base64をプリロードするかどうか
 * @parent AdvancedSettings
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param IsPreloadFgB64
 * @text Fg Base64をプリロードするかどうか
 * @desc Fg Base64をプリロードするかどうか
 * @parent AdvancedSettings
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvB64
 * @text Tv Base64をプリロードするかどうか
 * @desc Tv Base64をプリロードするかどうか
 * @parent AdvancedSettings
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvdB64
 * @text Tvd Base64をプリロードするかどうか
 * @desc Tvd Base64をプリロードするかどうか
 * @parent AdvancedSettings
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param IsPreloadSvB64
 * @text Sv Base64をプリロードするかどうか
 * @desc Sv Base64をプリロードするかどうか
 * @parent AdvancedSettings
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param PicMergeType
 * @text PIC画像合成タイプ
 * @desc PIC画像合成タイプ
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 完了を待機中
 * @value WaitComple
 * @option リアルタイム表示
 * @value RealTimeDisplay
 *
 * @param FgMergeType
 * @text FG画像合成タイプ
 * @desc FG画像合成タイプ
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 完了を待機中
 * @value WaitComple
 * @option リアルタイム表示
 * @value RealTimeDisplay
 *
 * @param TvMergeType
 * @text TV画像合成タイプ
 * @desc TV画像合成タイプ
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 完了を待機中
 * @value WaitComple
 * @option リアルタイム表示
 * @value RealTimeDisplay
 *
 * @param TvdMergeType
 * @text TVD画像合成タイプ
 * @desc TVD画像合成タイプ
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 完了を待機中
 * @value WaitComple
 * @option リアルタイム表示
 * @value RealTimeDisplay
 *
 * @param SvMergeType
 * @text SV画像合成タイプ
 * @desc SV画像合成タイプ
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 完了を待機中
 * @value WaitComple
 * @option リアルタイム表示
 * @value RealTimeDisplay
 *
 * @command switchGenerator
 * @text スイッチジェネレータ
 * @desc スイッチジェネレータ
 *
 * @arg mode
 * @text 制御モード
 * @desc Control mode
 * @type select
 * @default TV
 * @option 立ち歩きモード、落下モード
 * @value TV
 * @option サイドビュー
 * @value SV
 * @option アバター
 * @value FG
 *
 * @arg actorIds
 * 		@text アクターID's
 *      @desc アクターID's
 *      @type actor[]
 *      @default
 *
 * @arg isOpen
 * 		@on はい
 * 		@off いいえ
 *      @type boolean
 *      @default false
 *
 * @command checkSubstitute
 * @text 指定したイベントを強制的にリフレッシュして代わりを設定します。
 * @desc 指定したイベントを強制的にリフレッシュして代わりを設定します。
 *
 * @arg eventIds
 * 		@text リフレッシュしたいイベントのIDです。
 *      @desc リフレッシュしたいイベントのIDです。
 *      @type number[]
 *      @default 0
 *
 * @command checkGenerator
 * @text ジェネレーターのリフレッシュ用にキャラクターを指定します。
 * @desc ジェネレーターのリフレッシュ用にキャラクターを指定します。
 *
 * @arg actorIds
 * 		@text 変更するキャラクターのIDです。
 *      @desc 変更するキャラクターのIDです。
 *      @type actor[]
 *      @default
 *
 * @command setTvMode
 * @text キャラクターのTV表示モードを切り替えます。
 * @desc キャラクターのTV表示モードを切り替えます。
 *
 * @arg actorIds
 * 		@text 変更するキャラクターのIDです。
 *      @desc 変更するキャラクターのIDです。
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * @text TV表示モード
 * @desc TV表示モード
 * @type select
 * @default tv
 * @option 立ちモードと歩行モード
 * @value tv
 * @option 受傷倒れモード
 * @value tvd
 * @option サイドビューアングル
 * @value sv
 *
 * @arg svMotion
 * @text サイドビューアングルのアクション
 * @desc サイドビューアングルのアクション
 * @type select
 * 	  @default none
 * 	  @option デフォルトなし
 * 	  @value none
 * 	  @option 突き刺す
 * 	  @value thrust
 * 	  @option 振り下ろす
 * 	  @value swing
 * 	  @option 射撃
 * 	  @value missile
 * 	  @option 歩行
 * 	  @value walk
 * 	  @option 死亡
 * 	  @value dead
 *    @option 眠り
 * 	  @value sleep
 * 	  @option 詠唱1
 *    @value spell
 *    @option 詠唱（ループ）
 *    @value chant
 *    @option 防御
 *    @value guard
 *    @option 状態異常
 *    @value abnormal
 *    @option 瀕死
 *    @value dying
 *    @option 待機
 *    @value wait
 *    @option スキル
 *    @value skill
 *    @option アイテム
 *    @value item
 *    @option ダメージ
 *    @value damage
 *    @option 回避
 *    @value evade
 *    @option 勝利
 *    @value victory
 *    @option 逃走
 *    @value escape 
 *
 * @arg isHorizontalFlip
 * @text 水平方向に反転するかどうか。
 * @desc 水平方向に反転するかどうか。
 *      @on はい
 *      @off いいえ
 *      @type boolean
 *      @default false
 *
 * @command setMessageFace
 * @text 指定した対話で表示されるキャラクターの顔アイコン。
 * @desc 指定した対話で表示されるキャラクターの顔アイコン。
 *
 * @arg actorId
 * 		@text キャラクターの顔アイコンを表示するためのキャラクターID。
 *      @desc 
 *      @type actor
 *      @default
 *
 * @command cleanMessageFace
 * @text 会話に表示されるキャラクターの顔アイコンをクリアします。
 * @desc 会話に表示されるキャラクターの顔アイコンをクリアします。
 *
 * @command setupActorPicture
 * @text キャラクターの画像を表示します。
 * @desc キャラクターの画像を表示します。
 *
 * @arg pictureId
 * 		@text 画像のIDです。
 *      @desc 画像のIDです。
 * 		@type number
 *      @default
 *
 * @arg actorId
 * 		@text キャラクターのIDです。
 *      @desc キャラクターのIDです。
 *      @type actor
 *      @default
 *
 * @arg origin
 * 		@text 原点
 *      @desc 原点
 * 		@type select
 * 	  		@default 0
 * 	  		@option 左上
 * 	  		@value 0
 * 	  		@option 中央
 * 	  		@value 1
 *
 * @arg x
 * 		@text X軸
 *      @desc X軸
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg y
 * 		@text Y軸
 *      @desc Y軸
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg scaleX
 * 		@text X軸方向の拡大縮小比率。
 *      @desc X軸方向の拡大縮小比率。
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg scaleY
 * 		@text Y軸方向の拡大縮小比率。
 *      @desc Y軸方向の拡大縮小比率。
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg opacity
 * 		@text 透明度
 *      @desc 透明度
 * 		@type number
 *		@max 255
 *		@min 0
 * 	  	@default 255
 *
 * @arg blendMode
 * 		@text 合成モード
 *      @desc 合成モード
 * 		@type select
 * 	  		@default 0
 * 	  		@option 標準モード
 * 	  		@value 0
 * 	  		@option 追加モード
 * 	  		@value 1
 * 	  		@option 乗算モード
 * 	  		@value 2
 * 	  		@option 画面（スクリーン）
 * 	  		@value 3
 *
 * @command generatorB64
 * @text 指定ブロックのB64を再作成
 * @desc 指定ブロックのB64を再作成
 *
 * @arg actorIds
 * 		@text キャラクターのIDです。
 *      @desc キャラクターのIDです。
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * 		@text mode
 * 		@desc mode
 * 		@type select
 * 		@default PIC
 * 		@option PIC
 * 		@value PIC
 * 		@option FG
 * 		@value FG
 * 		@option TV
 * 		@value TV
 * 		@option TVD
 * 		@value TVD
 * 		@option SV
 * 		@value SV
 *
 * @command changeActorSyncObject
 * @text キャラクター定義装備判定同期オブジェクトを修正
 * @desc キャラクター定義装備判定同期オブジェクトを修正
 *
 * @arg actorIds
 * 		@text 変更するロールID
 *      @desc 変更するロールID
 *      @type actor[]
 *      @default
 *
 * @arg syncActorId
 * 		@text 同期するロールID
 *      @desc 同期するロールID
 *      @type actor
 *      @default 0
 *
 * @command changeActorPartColor
 * @text ロール定義ブロックの色の変更
 * @desc ロール定義ブロックの色の変更
 *
 * @arg actorIds
 * 		@text 変更するロールID
 *      @desc 変更するロールID
 *      @type actor[]
 *      @default
 *
 * @arg cds
 * 		@text パーツCD
 * 		@desc パーツCD
 * 		@type text[]
 *
 * @arg orgColor
 * 		@text 素材本来の色
 * 		@desc 素材本来の色
 * 		@type select
 * 		@default white
 * 		@option white
 * 		@value white
 * 		@option gray
 * 		@value gray
 * 		@option black
 * 		@value black
 * 		@option gold
 * 		@value gold
 * 		@option silver
 * 		@value silver
 * 		@option copper
 * 		@value copper
 * 		@option red
 * 		@value red
 * 		@option candyApple
 * 		@value candyApple
 * 		@option maroon
 * 		@value maroon
 * 		@option redPurple
 * 		@value redPurple
 *		@option darkReddishbrown
 * 		@value darkReddishbrown
 * 		@option reddishbrown
 * 		@value reddishbrown
 * 		@option darkRed
 * 		@value darkRed
 * 		@option skin
 * 		@value skin
 * 		@option coral
 * 		@value coral
 * 		@option pink
 * 		@value pink
 * 		@option begoniaRed
 * 		@value begoniaRed
 * 		@option magenta
 * 		@value magenta
 * 		@option yellow
 * 		@value yellow
 * 		@option midYellow
 * 		@value midYellow
 * 		@option ochre
 * 		@value ochre
 * 		@option lightOrange
 * 		@value lightOrange
 * 		@option orange
 * 		@value orange
 * 		@option darkYellowGreen
 * 		@value darkYellowGreen
 * 		@option olive
 * 		@value olive
 * 		@option lime
 * 		@value lime
 * 		@option springGreen
 * 		@value springGreen
 * 		@option green
 * 		@value green
 * 		@option persianGreen
 * 		@value persianGreen
 * 		@option deepGreen
 * 		@value deepGreen
 * 		@option turquoise
 * 		@value turquoise
 * 		@option aqua
 * 		@value aqua
 * 		@option skyBlue
 * 		@value skyBlue
 * 		@option teal
 * 		@value teal
 * 		@option olympicBlue
 * 		@value olympicBlue
 * 		@option blue
 * 		@value blue
 * 		@option ultramarineBlue
 * 		@value ultramarineBlue
 * 		@option navyBlue
 * 		@value navyBlue
 * 		@option grape
 * 		@value grape
 * 		@option fuchsia
 * 		@value fuchsia
 * 		@option purple
 * 		@value purple
 * 		@option amethyst
 * 		@value amethyst
 * 		@option darkPurple
 * 		@value darkPurple
 *
 * @arg newColor
 * 		@text 変換する色
 * 		@desc 変換する色
 * 		@type select
 * 		@default none
 * 		@option none
 * 		@value none
 * 		@option white
 * 		@value white
 * 		@option gray
 * 		@value gray
 * 		@option black
 * 		@value black
 * 		@option gold
 * 		@value gold
 * 		@option silver
 * 		@value silver
 * 		@option copper
 * 		@value copper
 * 		@option red
 * 		@value red
 * 		@option candyApple
 * 		@value candyApple
 * 		@option maroon
 * 		@value maroon
 * 		@option redPurple
 * 		@value redPurple
 * 		@option darkReddishbrown
 * 		@value darkReddishbrown
 * 		@option reddishbrown
 * 		@value reddishbrown
 * 		@option darkRed
 * 		@value darkRed
 * 		@option skin
 * 		@value skin
 * 		@option coral
 * 		@value coral
 * 		@option pink
 * 		@value pink
 * 		@option begoniaRed
 * 		@value begoniaRed
 * 		@option magenta
 * 		@value magenta
 * 		@option yellow
 * 		@value yellow
 * 		@option midYellow
 * 		@value midYellow
 * 		@option ochre
 * 		@value ochre
 * 		@option lightOrange
 * 		@value lightOrange
 * 		@option orange
 * 		@value orange
 * 		@option darkYellowGreen
 * 		@value darkYellowGreen
 * 		@option olive
 * 		@value olive
 * 		@option lime
 * 		@value lime
 * 		@option springGreen
 * 		@value springGreen
 * 		@option green
 * 		@value green
 * 		@option persianGreen
 * 		@value persianGreen
 * 		@option deepGreen
 * 		@value deepGreen
 * 		@option turquoise
 * 		@value turquoise
 * 		@option aqua
 * 		@value aqua
 * 		@option skyBlue
 * 		@value skyBlue
 * 		@option teal
 * 		@value teal
 * 		@option olympicBlue
 * 		@value olympicBlue
 * 		@option blue
 * 		@value blue
 * 		@option ultramarineBlue
 * 		@value ultramarineBlue
 * 		@option navyBlue
 * 		@value navyBlue
 * 		@option grape
 * 		@value grape
 * 		@option fuchsia
 * 		@value fuchsia
 * 		@option purple
 * 		@value purple
 * 		@option amethyst
 * 		@value amethyst
 * 		@option darkPurple
 * 		@value darkPurple
 *
 */

/*:zh_TW
 * @target MZ
 * @plugindesc SunMZ 角色生成器延伸應用插件。
 * @author Sun Min Chiech
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help SunMZ_0_GeneratorEx.js [version 3.0.4]
 * 該插件需要官方插件 PluginCommonBase.js
 *
 * 功能一:
 * 能夠自由編輯自身人物部件，
 * 該插件能夠自由編輯人物的區塊組成，並調整疊放順序，
 * 然後可以指定裝備，通用參數，針對每一個角色指定替換設定。
 * 每個人物可以配置:
 * 一組圖片,一個側面視角圖片,一個頭像圖片,一個站立圖片,一個倒地圖片
 * 部件的配置是完全自訂的。
 *
 * 功能二:
 * 在非戰鬥模式調用側面視角的圖片作為劇情動作使用，
 * 該功能可以針對有設置SV圖的角色直接調用，可以作用於角色或是事件。
 * 將指令打在事件裡第一行的注譯裡。
 * EX:<substitute:1:tv>
 * EX:<substitute:1:tvd>
 * EX:<substitute:1:sv:thrust:Y>
 * <substitute:[Acter ID]:[mode(tv|tvd|sv)]:[svMotion]:[horizontal flip(Y|N)]>
 * svMotion:thrust|swing|missile|walk|dead|sleep|spell|chant|guard|abnormal|dying|wait|skill|item|damage|evade|victory|escape
 *
 * 需要新建資料夾(因為檔案過多設定時會導致MZ當掉，將資料分開放)
 * 在\img\generator_PIC\底下放置紙娃娃PIC相關檔案
 * 在\img\generator_FG\底下放置紙娃娃TV相關檔案
 * 在\img\generator_TV\底下放置紙娃娃TV相關檔案
 * 在\img\generator_SV\底下放置紙娃娃SV相關檔案
 *
 * 注意一點 設置過多的部件會導致MZ當掉，所以盡量簡化設置的內容為佳，
 * 範本是為了讓大家知道設置的區塊應該擺在何處所以才設置如此多的區塊，
 * 其實不需要設置這麼多區塊。
 *=============================================================================
 *
 * @param ActorDataList
 * @text 角色陣列
 * @desc 點選角色陣列添加想要擴充的參數。
 * @default []
 * @type struct<ActorDataExItem>[]
 *
 * @param WeaponDataList
 * @text 武器陣列
 * @desc 會針對武器置換角色身上的部件。
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param WeaponSecDataList
 * @text 武器副手陣列
 * @desc 會針對武器置換角色身上的部件。
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param ArmorDataList
 * @text 防具陣列
 * @desc 會針對防具置換角色身上的部件。
 * @default []
 * @type struct<ArmorDataExItem>[]
 *
 * @param VarDataList
 * @text 變數陣列
 * @desc 會針對變數配置裸裝的狀態。
 * @default []
 * @type struct<VariableDataExItem>[]
 *
 * @param IsSaveSync
 * @text 是否與存檔同步
 * @desc 人物的裝備配置會反應在存檔上
 * @on 是
 * @off 否
 * @type boolean
 * @default true
 *
 * @param SvScalingWidth
 * @text SV圖縮放比例(寬)
 * @desc SV圖在非戰鬥地圖的縮放比例(寬)
 * @type text
 * @default 0.75
 *
 * @param SvScalingHeight
 * @text SV圖縮放比例(高)
 * @desc SV圖在非戰鬥地圖的縮放比例(高)
 * @type text
 * @default 0.75
 *
 * @param AdvancedSettings
 * @text ■ 進階設定
 *
 * @param FaceTimeoutNum
 * @text 臉部圖案延遲幀數
 * @desc 設定臉部圖案延遲時間(幀數)
 * @parent AdvancedSettings
 * @type number
 * @default 3
 *
 * @param IsPreloadPicB64
 * @text 是否預先載入Pic B64
 * @desc 是否預先載入Pic B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadFgB64
 * @text 是否預先載入Fg B64
 * @desc 是否預先載入Fg B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvB64
 * @text 是否預先載入Tv B64
 * @desc 是否預先載入Tv B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvdB64
 * @text 是否預先載入Tvd B64
 * @desc 是否預先載入Tvd B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadSvB64
 * @text 是否預先載入Sv B64
 * @desc 是否預先載入Sv B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param PicMergeType
 * @text PIC圖片合併類別
 * @desc PIC圖片合併類別
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即時顯示
 * @value RealTimeDisplay
 *
 * @param FgMergeType
 * @text FG圖片合併類別
 * @desc FG圖片合併類別
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即時顯示
 * @value RealTimeDisplay
 *
 * @param TvMergeType
 * @text TV圖片合併類別
 * @desc TV圖片合併類別
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即時顯示
 * @value RealTimeDisplay
 *
 * @param TvdMergeType
 * @text TVD圖片合併類別
 * @desc TVD圖片合併類別
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即時顯示
 * @value RealTimeDisplay
 *
 * @param SvMergeType
 * @text SV圖片合併類別
 * @desc SV圖片合併類別
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即時顯示
 * @value RealTimeDisplay
 *
 * @command switchGenerator
 * @text 選擇是否開啟紙娃娃
 * @desc 選擇是否開啟紙娃娃
 *
 * @arg mode
 * @text 控制的模式
 * @desc 控制的模式
 * @type select
 * @default TV
 * @option 站立行走模式,倒地模式
 * @value TV
 * @option 側面視角
 * @value SV
 * @option 頭像
 * @value FG
 *
 * @arg actorIds
 * 		@text 要改變的角色IDs
 *      @desc 要改變的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg isOpen
 * 		@on 是
 * 		@off 否
 *      @type boolean
 *      @default false
 *
 * @command checkSubstitute
 * @text 指定事件強制刷新替身
 * @desc 指定事件強制刷新替身
 *
 * @arg eventIds
 * 		@text 要刷新的事件IDs
 *      @desc 要刷新的事件IDs
 *      @type number[]
 *      @default 0
 *
 * @command checkGenerator
 * @text 指定角色強制刷新紙娃娃
 * @desc 指定角色強制刷新紙娃娃
 *
 * @arg actorIds
 * 		@text 要改變的角色IDs
 *      @desc 要改變的角色IDs
 *      @type actor[]
 *      @default
 *
 * @command setTvMode
 * @text 切換角色TV顯示模式
 * @desc 切換角色TV顯示模式
 *
 * @arg actorIds
 * 		@text 要改變的角色IDs
 *      @desc 要改變的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * @text TV顯示模式
 * @desc TV顯示模式
 * @type select
 * @default tv
 * @option 站立行走模式
 * @value tv
 * @option 受傷倒地模式
 * @value tvd
 * @option 側面視角
 * @value sv
 *
 * @arg svMotion
 * @text 側面視角動作
 * @desc 側面視角動作
 * @type select
 * 	  @default none
 * 	  @option 原默認值
 * 	  @value none
 * 	  @option 突刺
 * 	  @value thrust
 * 	  @option 揮砍
 * 	  @value swing
 * 	  @option 射擊
 * 	  @value missile
 * 	  @option 走動
 * 	  @value walk
 * 	  @option 死亡
 * 	  @value dead
 *    @option 睡眠
 * 	  @value sleep
 * 	  @option 施法
 *    @value spell
 *    @option 詠唱(loop)
 *    @value chant
 *    @option 防禦
 *    @value guard
 *    @option 異常
 *    @value abnormal
 *    @option 垂死
 *    @value dying
 *    @option 等待
 *    @value wait
 *    @option 技能
 *    @value skill
 *    @option 道具
 *    @value item
 *    @option 損傷
 *    @value damage
 *    @option 閃避
 *    @value evade
 *    @option 勝利
 *    @value victory
 *    @option 逃脫
 *    @value escape 
 *
 * @arg isHorizontalFlip
 * @text 是否水平翻轉
 * @desc 是否水平翻轉
 * 		@on 是
 * 		@off 否
 *      @type boolean
 *      @default false
 *
 * @command setMessageFace
 * @text 指定對話要顯示的人物頭像
 * @desc 指定對話要顯示的人物頭像
 *
 * @arg actorId
 * 		@text 顯示人物頭像的角色ID
 *      @desc 顯示人物頭像的角色ID
 *      @type actor
 *      @default
 *
 * @command cleanMessageFace
 * @text 清除對話要顯示的人物頭像
 * @desc 清除對話要顯示的人物頭像
 *
 * @command setupActorPicture
 * @text 顯示角色圖片
 * @desc 顯示角色圖片
 *
 * @arg pictureId
 * 		@text 圖片ID
 *      @desc 圖片ID
 * 		@type number
 *      @default
 *
 * @arg actorId
 * 		@text 角色ID
 *      @desc 角色ID
 *      @type actor
 *      @default
 *
 * @arg origin
 * 		@text 原點
 *      @desc 原點
 * 		@type select
 * 	  		@default 0
 * 	  		@option 左上
 * 	  		@value 0
 * 	  		@option 中央
 * 	  		@value 1
 *
 * @arg x
 * 		@text X軸
 *      @desc X軸
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg y
 * 		@text Y軸
 *      @desc Y軸
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg scaleX
 * 		@text X軸縮放比
 *      @desc X軸縮放比
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg scaleY
 * 		@text Y軸縮放比
 *      @desc Y軸縮放比
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg opacity
 * 		@text 不透明度
 *      @desc 不透明度
 * 		@type number
 *		@max 255
 *		@min 0
 * 	  	@default 255
 *
 * @arg blendMode
 * 		@text 合成方式
 *      @desc 合成方式
 * 		@type select
 * 	  		@default 0
 * 	  		@option 標準
 * 	  		@value 0
 * 	  		@option 添加
 * 	  		@value 1
 * 	  		@option 乘
 * 	  		@value 2
 * 	  		@option 畫面
 * 	  		@value 3
 *
 * @command generatorB64
 * @text 重新製作指定區塊的B64
 * @desc 重新製作指定區塊的B64
 *
 * @arg actorIds
 * 		@text 要改變的角色IDs
 *      @desc 要改變的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * 		@text 模式
 * 		@desc 模式
 * 		@type select
 * 		@default PIC
 * 		@option 立繪
 * 		@value PIC
 * 		@option 頭像
 * 		@value FG
 * 		@option 站立行走模式
 * 		@value TV
 * 		@option 倒地模式
 * 		@value TVD
 * 		@option 側面視角
 * 		@value SV
 *
 * @command changeActorSyncObject
 * @text 修改角色定義裝備判定同步對象
 * @desc 修改角色定義裝備判定同步對象
 *
 * @arg actorIds
 * 		@text 要改變的角色IDs
 *      @desc 要改變的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg syncActorId
 * 		@text 要同步的角色ID
 *      @desc 
 *      @type actor
 *      @default 0
 *
 * @command changeActorPartColor
 * @text 修改角色定義區塊顏色
 * @desc 修改角色定義區塊顏色
 *
 * @arg actorIds
 * 		@text 要改變的角色IDs
 *      @desc 要改變的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg cds
 * 		@text 部件CDs
 * 		@desc 部件CDs
 * 		@type text[]
 *
 * @arg orgColor
 * 		@text 素材原本的顏色
 * 		@desc 素材原本的顏色
 * 		@type select
 * 		@default white
 * 		@option 白色
 * 		@value white
 * 		@option 灰色
 * 		@value gray
 * 		@option 黑色
 * 		@value black
 * 		@option 金色
 * 		@value gold
 * 		@option 銀色
 * 		@value silver
 * 		@option 銅色
 * 		@value copper
 * 		@option 紅色
 * 		@value red
 * 		@option 蘋果糖紅
 * 		@value candyApple
 * 		@option 栗色
 * 		@value maroon
 * 		@option 褐色
 * 		@value redPurple
 *		@option 暗紅棕色
 * 		@value darkReddishbrown
 * 		@option 紅棕色
 * 		@value reddishbrown
 * 		@option 暗紅色
 * 		@value darkRed
 * 		@option 膚色
 * 		@value skin
 * 		@option 珊瑚色
 * 		@value coral
 * 		@option 粉紅色
 * 		@value pink
 * 		@option 海棠紅
 * 		@value begoniaRed
 * 		@option 洋紅色
 * 		@value magenta
 * 		@option 黄色
 * 		@value yellow
 * 		@option 中黄色
 * 		@value midYellow
 * 		@option 土黄色
 * 		@value ochre
 * 		@option 亮橘色
 * 		@value lightOrange
 * 		@option 橘色
 * 		@value orange
 * 		@option 暗黃綠色
 * 		@value darkYellowGreen
 * 		@option 橄欖色
 * 		@value olive
 * 		@option 青檸檬色
 * 		@value lime
 * 		@option 春綠色
 * 		@value springGreen
 * 		@option 綠色
 * 		@value green
 * 		@option 波斯綠
 * 		@value persianGreen
 * 		@option 深綠色
 * 		@value deepGreen
 * 		@option 綠松色
 * 		@value turquoise
 * 		@option 水色的
 * 		@value aqua
 * 		@option 天空藍
 * 		@value skyBlue
 * 		@option 水鴨色
 * 		@value teal
 * 		@option 奧林匹斯藍
 * 		@value olympicBlue
 * 		@option 藍色
 * 		@value blue
 * 		@option 群青色
 * 		@value ultramarineBlue
 * 		@option 深藍色
 * 		@value navyBlue
 * 		@option 葡萄藍
 * 		@value grape
 * 		@option 紫紅色
 * 		@value fuchsia
 * 		@option 紫色
 * 		@value purple
 * 		@option 紫晶色
 * 		@value amethyst
 * 		@option 深紫色
 * 		@value darkPurple
 *
 * @arg newColor
 * 		@text 要轉換的的顏色
 * 		@desc 要轉換的的顏色
 * 		@type select
 * 		@default none
 * 		@option 不轉色
 * 		@value none
 * 		@option 白色
 * 		@value white
 * 		@option 灰色
 * 		@value gray
 * 		@option 黑色
 * 		@value black
 * 		@option 金色
 * 		@value gold
 * 		@option 銀色
 * 		@value silver
 * 		@option 銅色
 * 		@value copper
 * 		@option 紅色
 * 		@value red
 * 		@option 蘋果糖紅
 * 		@value candyApple
 * 		@option 栗色
 * 		@value maroon
 * 		@option 褐色
 * 		@value redPurple
 * 		@option 暗紅棕色
 * 		@value darkReddishbrown
 * 		@option 紅棕色
 * 		@value reddishbrown
 * 		@option 暗紅色
 * 		@value darkRed
 * 		@option 膚色
 * 		@value skin
 * 		@option 珊瑚色
 * 		@value coral
 * 		@option 粉紅色
 * 		@value pink
 * 		@option 海棠紅
 * 		@value begoniaRed
 * 		@option 洋紅色
 * 		@value magenta
 * 		@option 黄色
 * 		@value yellow
 * 		@option 中黄色
 * 		@value midYellow
 * 		@option 土黄色
 * 		@value ochre
 * 		@option 亮橘色
 * 		@value lightOrange
 * 		@option 橘色
 * 		@value orange
 * 		@option 暗黃綠色
 * 		@value darkYellowGreen
 * 		@option 橄欖色
 * 		@value olive
 * 		@option 青檸檬色
 * 		@value lime
 * 		@option 春綠色
 * 		@value springGreen
 * 		@option 綠色
 * 		@value green
 * 		@option 波斯綠
 * 		@value persianGreen
 * 		@option 深綠色
 * 		@value deepGreen
 * 		@option 綠松色
 * 		@value turquoise
 * 		@option 水色的
 * 		@value aqua
 * 		@option 天空藍
 * 		@value skyBlue
 * 		@option 水鴨色
 * 		@value teal
 * 		@option 奧林匹斯藍
 * 		@value olympicBlue
 * 		@option 藍色
 * 		@value blue
 * 		@option 群青色
 * 		@value ultramarineBlue
 * 		@option 深藍色
 * 		@value navyBlue
 * 		@option 葡萄藍
 * 		@value grape
 * 		@option 紫紅色
 * 		@value fuchsia
 * 		@option 紫色
 * 		@value purple
 * 		@option 紫晶色
 * 		@value amethyst
 * 		@option 深紫色
 * 		@value darkPurple
 */
 
/*:zh_CN
 * @target MZ
 * @plugindesc SunMZ 角色生成器延伸应用插件。
 * @author Sun Min Chiech
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help SunMZ_0_GeneratorEx.js [version 3.0.4]
 * 该插件需要官方插件 PluginCommonBase.js
 *
 * 功能一:
 * 能够自由编辑自身人物部件，
 * 该插件能够自由编辑人物的区块组成，并调整迭放顺序，
 * 然后可以指定装备，通用参数，针对每一个角色指定替换设定。
 * 每个人物可以配置:
 * 一组图片,一个侧面视角图片,一个头像图片,一个站立图片,一个倒地图片
 * 部件的配置是完全自定义的。
 *
 * 功能二:
 * 在非战斗模式调用侧面视角的图片作为剧情动作使用，
 * 该功能可以针对有设置SV图的角色直接调用，可以作用于角色或是事件。
 * 将指令打在事件里第一行的注译里。
 * EX:<substitute:1:tv>
 * EX:<substitute:1:tvd>
 * EX:<substitute:1:sv:thrust:Y>
 * <substitute:[Acter ID]:[mode(tv|tvd|sv)]:[svMotion]:[horizontal flip(Y|N)]>
 * svMotion:thrust|swing|missile|walk|dead|sleep|spell|chant|guard|abnormal|dying|wait|skill|item|damage|evade|victory|escape
 *
 * 需要新建文件夹(因为档案过多设定时会导致MZ当掉，将数据分开放)
 * 在\img\generator_PIC\底下放置纸娃娃PIC相关档案
 * 在\img\generator_FG\底下放置纸娃娃TV相关档案
 * 在\img\generator_TV\底下放置纸娃娃TV相关档案
 * 在\img\generator_SV\底下放置纸娃娃SV相关档案
 *
 * 注意一点 设置过多的部件会导致MZ当掉，所以尽量简化设置的内容为佳，
 * 范本是为了让大家知道设置的区块应该摆在何处所以才设置如此多的区块，
 * 其实不需要设置这么多区块。
 *=============================================================================
 *
 * @param ActorDataList
 * @text 角色阵列
 * @desc 点选角色阵列添加想要扩充的参数。 
 * @default []
 * @type struct<ActorDataExItem>[]
 *
 * @param WeaponDataList
 * @text 武器阵列
 * @desc 会针对武器置换角色身上的部件。 
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param WeaponSecDataList
 * @text 武器副手阵列
 * @desc 会针对武器置换角色身上的部件。 
 * @default []
 * @type struct<WeaponDataExItem>[]
 *
 * @param ArmorDataList
 * @text 防具阵列
 * @desc 会针对防具置换角色身上的部件。 
 * @default []
 * @type struct<ArmorDataExItem>[]
 *
 * @param VarDataList
 * @text 变数阵列
 * @desc 会针对变数配置裸装的状态。 
 * @default []
 * @type struct<VariableDataExItem>[]
 *
 * @param IsSaveSync
 * @text 是否与存档同步
 * @desc 人物的装备配置会反应在存档上
 * @on 是
 * @off 否
 * @type boolean
 * @default true
 *
 * @param SvScalingWidth
 * @text SV图缩放比例(宽)
 * @desc SV图在非战斗地图的缩放比例(宽)
 * @type text
 * @default 0.75
 *
 * @param SvScalingHeight
 * @text SV图缩放比例(高)
 * @desc SV图在非战斗地图的缩放比例(高)
 * @type text
 * @default 0.75
 *
 * @param AdvancedSettings
 * @text ■ 进阶设定
 *
 * @param FaceTimeoutNum
 * @text 脸部图案延迟帧数
 * @desc 设定脸部图案延迟时间(帧数)
 * @parent AdvancedSettings
 * @type number
 * @default 3
 *
 * @param IsPreloadPicB64
 * @text 是否预先载入Pic B64
 * @desc 是否预先载入Pic B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadFgB64
 * @text 是否预先载入Fg B64
 * @desc 是否预先载入Fg B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvB64
 * @text 是否预先载入Tv B64
 * @desc 是否预先载入Tv B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadTvdB64
 * @text 是否预先载入Tvd B64
 * @desc 是否预先载入Tvd B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param IsPreloadSvB64
 * @text 是否预先载入Sv B64
 * @desc 是否预先载入Sv B64
 * @parent AdvancedSettings
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param PicMergeType
 * @text PIC图片合并类别
 * @desc PIC图片合并类别
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即时显示
 * @value RealTimeDisplay
 *
 * @param FgMergeType
 * @text FG图片合并类别
 * @desc FG图片合并类别
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即时显示
 * @value RealTimeDisplay
 *
 * @param TvMergeType
 * @text TV图片合并类别
 * @desc TV图片合并类别
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即时显示
 * @value RealTimeDisplay
 *
 * @param TvdMergeType
 * @text TVD图片合并类别
 * @desc TVD图片合并类别
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即时显示
 * @value RealTimeDisplay
 *
 * @param SvMergeType
 * @text SV图片合并类别
 * @desc SV图片合并类别
 * @parent AdvancedSettings
 * @type select
 * @default WaitComple
 * @option 等待完成
 * @value WaitComple
 * @option 即时显示
 * @value RealTimeDisplay
 *
 * @command switchGenerator
 * @text 选择是否开启纸娃娃
 * @desc 选择是否开启纸娃娃
 *
 * @arg mode
 * @text 控制的模式
 * @desc 控制的模式
 * @type select
 * @default TV
 * @option 站立行走模式,倒地模式
 * @value TV
 * @option 侧面视角
 * @value SV
 * @option 头像
 * @value FG
 *
 * @arg actorIds
 * 		@text 要改变的角色IDs
 *      @desc 要改变的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg isOpen
 * 		@on 是
 * 		@off 否
 *      @type boolean
 *      @default false
 *
 * @command checkSubstitute
 * @text 指定事件强制刷新替身
 * @desc 指定事件强制刷新替身
 *
 * @arg eventIds
 * 		@text 要刷新的事件IDs
 *      @desc 要刷新的事件IDs
 *      @type number[]
 *      @default 0
 *
 * @command checkGenerator
 * @text 指定角色强制刷新纸娃娃
 * @desc 指定角色强制刷新纸娃娃
 *
 * @arg actorIds
 * 		@text 要改变的角色IDs
 *      @desc 要改变的角色IDs
 *      @type actor[]
 *      @default
 *
 * @command setTvMode
 * @text 切换角色TV显示模式
 * @desc 切换角色TV显示模式
 *
 * @arg actorIds
 * 		@text 要改变的角色IDs
 *      @desc 要改变的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * @text TV显示模式
 * @desc TV显示模式
 * @type select
 * @default tv
 * @option 站立行走模式
 * @value tv
 * @option 受伤倒地模式
 * @value tvd
 * @option 侧面视角
 * @value sv
 *
 * @arg svMotion
 * @text 侧面视角动作
 * @desc 侧面视角动作
 * @type select
 *		@default none
 *		@option 原默认值
 *		@value none
 *		@option 突刺
 *		@value thrust
 *		@option 挥砍
 *		@value swing
 *		@option 射击
 *		@value missile
 *		@option 走动
 *		@value walk
 *		@option 死亡
 *		@value dead
 *		@option 睡眠
 *		@value sleep
 *		@option 施法
 *		@value spell
 *		@option 咏唱(loop)
 *		@value chant
 *		@option 防御
 *		@value guard
 *		@option 异常
 *		@value abnormal
 *		@option 垂死
 *		@value dying
 *		@option 等待
 *		@value wait
 *		@option 技能
 *		@value skill
 *		@option 道具
 *		@value item
 *		@option 损伤
 *		@value damage
 *		@option 闪避
 *		@value evade
 *		@option 胜利
 *		@value victory
 *		@option 逃脱
 *		@value escape
 *
 * @arg isHorizontalFlip
 * @text 是否水平翻转
 * @desc 是否水平翻转
 * 		@on 是
 * 		@off 否
 *      @type boolean
 *      @default false
 *
 * @command setMessageFace
 * @text 指定对话要显示的人物头像
 * @desc 指定对话要显示的人物头像
 *
 * @arg actorId
 * 		@text 显示人物头像的角色ID
 *      @desc 显示人物头像的角色ID
 *      @type actor
 *      @default
 *
 * @command cleanMessageFace
 * @text 清除对话要显示的人物头像
 * @desc 清除对话要显示的人物头像
 *
 * @command setupActorPicture
 * @text 显示角色图片
 * @desc 显示角色图片
 *
 * @arg pictureId
 * 		@text 图片ID
 *      @desc 图片ID
 * 		@type number
 *      @default
 *
 * @arg actorId
 * 		@text 角色ID
 *      @desc 角色ID
 *      @type actor
 *      @default
 *
 * @arg origin
 * 		@text 原点
 *      @desc 原点
 * 		@type select
 * 	  		@default 0
 * 	  		@option 左上
 * 	  		@value 0
 * 	  		@option 中央
 * 	  		@value 1
 *
 * @arg x
 * 		@text X轴
 *      @desc X轴
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg y
 * 		@text Y轴
 *      @desc Y轴
 * 		@type number
 *      @min -9999
 * 	  	@default 0
 *
 * @arg scaleX
 * 		@text X轴缩放比
 *      @desc X轴缩放比
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg scaleY
 * 		@text Y轴缩放比
 *      @desc Y轴缩放比
 * 		@type number
 *      @min -1000
 * 	  	@default 100
 *
 * @arg opacity
 * 		@text 不透明度
 *      @desc 不透明度
 * 		@type number
 *		@max 255
 *		@min 0
 * 	  	@default 255
 *
 * @arg blendMode
 * 		@text 合成方式
 *		@desc 合成方式
 * 		@type select
 * 	  		@default 0
 * 	  		@option 标准
 * 	  		@value 0
 * 	  		@option 添加
 * 	  		@value 1
 * 	  		@option 乘
 * 	  		@value 2
 * 	  		@option 画面
 * 	  		@value 3
 *
 * @command generatorB64
 * @text 重新制作指定区块的B64
 * @desc 重新制作指定区块的B64
 *
 * @arg actorIds
 * 		@text 要改变的角色IDs
 *      @desc 要改变的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg mode
 * 		@text 模式
 * 		@desc 模式
 * 		@type select
 * 		@default PIC
 * 		@option 立绘
 * 		@value PIC
 * 		@option 头像
 * 		@value FG
 * 		@option 站立行走模式
 * 		@value TV
 * 		@option 倒地模式
 * 		@value TVD
 * 		@option 侧面视角
 * 		@value SV
 *
 * @command changeActorSyncObject
 * @text 修改角色定义装备判定同步对象
 * @desc 修改角色定义装备判定同步对象
 *
 * @arg actorIds
 * 		@text 要改变的角色IDs
 *      @desc 要改变的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg syncActorId
 * 		@text 要同步的角色ID
 *      @desc 
 *      @type actor
 *      @default 0
 *
 * @command changeActorPartColor
 * @text 修改角色定义区块颜色
 * @desc 修改角色定义区块颜色
 *
 * @arg actorIds
 * 		@text 要改变的角色IDs
 *      @desc 要改变的角色IDs
 *      @type actor[]
 *      @default
 *
 * @arg cds
 * 		@text 部件CDs
 * 		@desc 部件CDs
 * 		@type text[]
 *
 * @arg orgColor
 * 		@text 素材原本的颜色
 * 		@desc 素材原本的颜色
 * 		@type select
 * 		@default white
 * 		@option 白色
 * 		@value white
 * 		@option 灰色
 * 		@value gray
 * 		@option 黑色
 * 		@value black
 * 		@option 金色
 * 		@value gold
 * 		@option 银色
 * 		@value silver
 * 		@option 铜色
 * 		@value copper
 * 		@option 红色
 * 		@value red
 * 		@option 苹果糖红
 * 		@value candyApple
 * 		@option 栗色
 * 		@value maroon
 * 		@option 褐色
 * 		@value redPurple
 *		@option 暗红棕色
 * 		@value darkReddishbrown
 * 		@option 红棕色
 * 		@value reddishbrown
 * 		@option 暗红色
 * 		@value darkRed
 * 		@option 肤色
 * 		@value skin
 * 		@option 珊瑚色
 * 		@value coral
 * 		@option 粉红色
 * 		@value pink
 * 		@option 海棠红
 * 		@value begoniaRed
 * 		@option 洋红色
 * 		@value magenta
 * 		@option 黄色
 * 		@value yellow
 * 		@option 中黄色
 * 		@value midYellow
 * 		@option 土黄色
 * 		@value ochre
 * 		@option 亮橘色
 * 		@value lightOrange
 * 		@option 橘色
 * 		@value orange
 * 		@option 暗黄绿色
 * 		@value darkYellowGreen
 * 		@option 橄榄色
 * 		@value olive
 * 		@option 青柠檬色
 * 		@value lime
 * 		@option 春绿色
 * 		@value springGreen
 * 		@option 绿色
 * 		@value green
 * 		@option 波斯绿
 * 		@value persianGreen
 * 		@option 深绿色
 * 		@value deepGreen
 * 		@option 绿松色
 * 		@value turquoise
 * 		@option 水色的
 * 		@value aqua
 * 		@option 天空蓝
 * 		@value skyBlue
 * 		@option 水鸭色
 * 		@value teal
 * 		@option 奥林匹斯蓝
 * 		@value olympicBlue
 * 		@option 蓝色
 * 		@value blue
 * 		@option 群青色
 * 		@value ultramarineBlue
 * 		@option 深蓝色
 * 		@value navyBlue
 * 		@option 葡萄蓝
 * 		@value grape
 * 		@option 紫红色
 * 		@value fuchsia
 * 		@option 紫色
 * 		@value purple
 * 		@option 紫晶色
 * 		@value amethyst
 * 		@option 深紫色
 * 		@value darkPurple
 *
 * @arg newColor
 * 		@text 要转换的的颜色
 * 		@desc 要转换的的颜色
 * 		@type select
 * 		@default none
 * 		@option 不转色
 * 		@value none
 * 		@option 白色
 * 		@value white
 * 		@option 灰色
 * 		@value gray
 * 		@option 黑色
 * 		@value black
 * 		@option 金色
 * 		@value gold
 * 		@option 银色
 * 		@value silver
 * 		@option 铜色
 * 		@value copper
 * 		@option 红色
 * 		@value red
 * 		@option 苹果糖红
 * 		@value candyApple
 * 		@option 栗色
 * 		@value maroon
 * 		@option 褐色
 * 		@value redPurple
 * 		@option 暗红棕色
 * 		@value darkReddishbrown
 * 		@option 红棕色
 * 		@value reddishbrown
 * 		@option 暗红色
 * 		@value darkRed
 * 		@option 肤色
 * 		@value skin
 * 		@option 珊瑚色
 * 		@value coral
 * 		@option 粉红色
 * 		@value pink
 * 		@option 海棠红
 * 		@value begoniaRed
 * 		@option 洋红色
 * 		@value magenta
 * 		@option 黄色
 * 		@value yellow
 * 		@option 中黄色
 * 		@value midYellow
 * 		@option 土黄色
 * 		@value ochre
 * 		@option 亮橘色
 * 		@value lightOrange
 * 		@option 橘色
 * 		@value orange
 * 		@option 暗黄绿色
 * 		@value darkYellowGreen
 * 		@option 橄榄色
 * 		@value olive
 * 		@option 青柠檬色
 * 		@value lime
 * 		@option 春绿色
 * 		@value springGreen
 * 		@option 绿色
 * 		@value green
 * 		@option 波斯绿
 * 		@value persianGreen
 * 		@option 深绿色
 * 		@value deepGreen
 * 		@option 绿松色
 * 		@value turquoise
 * 		@option 水色的
 * 		@value aqua
 * 		@option 天空蓝
 * 		@value skyBlue
 * 		@option 水鸭色
 * 		@value teal
 * 		@option 奥林匹斯蓝
 * 		@value olympicBlue
 * 		@option 蓝色
 * 		@value blue
 * 		@option 群青色
 * 		@value ultramarineBlue
 * 		@option 深蓝色
 * 		@value navyBlue
 * 		@option 葡萄蓝
 * 		@value grape
 * 		@option 紫红色
 * 		@value fuchsia
 * 		@option 紫色
 * 		@value purple
 * 		@option 紫晶色
 * 		@value amethyst
 * 		@option 深紫色
 * 		@value darkPurple
 */

/*~struct~VariableDataExItem:
 *
 * @param id
 * @text Variable ID
 * @desc Variable ID
 * @type variable
 * @default 0
 *  
 * @param varCodeDataList
 * @text Variable Code Data List
 * @desc Variable Parameter Differential Configuration。
 * @default []
 * @type struct<VariableCodeDataExItem>[]
 *
 */

/*~struct~VariableDataExItem:ja_JP
 *
 * @param id
 * @text 変数のID
 * @desc 変数のID
 * @type variable
 * @default 0
 *  
 * @param varCodeDataList
 * @text 変数パラメータの差異を配置する配列。
 * @desc 変数パラメータの差異を配置する配列。
 * @default []
 * @type struct<VariableCodeDataExItem>[]
 *
 */

/*~struct~VariableDataExItem:zh_TW
 *
 * @param id
 * @text 變數ID
 * @desc 變數ID
 * @type variable
 * @default 0
 *  
 * @param varCodeDataList
 * @text 變數參數差異配置陣列
 * @desc 變數參數差異配置陣列。
 * @default []
 * @type struct<VariableCodeDataExItem>[]
 *
 */
 
/*~struct~VariableDataExItem:zh_CN
 *
 * @param id
 * @text 变数ID
 * @desc 变数ID
 * @type variable
 * @default 0
 *  
 * @param varCodeDataList
 * @text 变量参数差异配置数组
 * @desc 变量参数差异配置数组。
 * @default []
 * @type struct<VariableCodeDataExItem>[]
 *
 */

/*~struct~VariableCodeDataExItem:
 *
 * @param code
 * @text Variable Value
 * @desc Variable Value
 * @type number
 * @default 0
 *
 * @param actorListVarDataList
 * @text Actor List Variable Data List
 * @desc actor Pattern Configuration。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorVarDataList
 * @text Actor Variable Data List
 * @desc actor Pattern Configuration。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~VariableCodeDataExItem:ja_JP
 *
 * @param code
 * @text 変数の値
 * @desc 変数の値
 * @type number
 * @default 0
 *
 * @param actorListVarDataList
 * @text 多役キャラクターパーツパターン配列
 * @desc 多役キャラクターパーツパターン配列
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorVarDataList
 * @text キャラクターパーツのアイコン配置の配列。
 * @desc キャラクターパーツのアイコン配置の配列。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */
 
/*~struct~VariableCodeDataExItem:zh_TW
 *
 * @param code
 * @text 變數值
 * @desc 變數值
 * @type number
 * @default 0
 *
 * @param actorListVarDataList
 * @text 多位角色部件圖案配置陣列
 * @desc 多位角色部件圖案配置陣列。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorVarDataList
 * @text 角色部件圖案配置陣列
 * @desc 角色部件圖案配置陣列。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */
 
/*~struct~VariableCodeDataExItem:zh_CN
 *
 * @param code
 * @text 变数值
 * @desc 变数值
 * @type number
 * @default 0
 *
 * @param actorListVarDataList
 * @text 多位角色部件图案配置阵列
 * @desc 多位角色部件图案配置阵列。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorVarDataList
 * @text 角色部件图案配置数组
 * @desc 角色部件图案配置数组。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~WeaponDataExItem:
 *
 * @param id
 * @text Weapon ID
 * @desc Weapon ID
 * @type weapon
 * @default 0
 *  
 * @param actorListWeaponDataList
 * @text Actor List Weapon Data List
 * @desc Actor List Equipment Image Configuration for the Weapon。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorWeaponDataList
 * @text Actor Weapon DataList
 * @desc Actor Equipment Image Configuration for the Weapon。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~WeaponDataExItem:ja_JP
 *
 * @param id
 * @text 武器のID
 * @desc 武器のID
 * @type weapon
 * @default 0
 *  
 * @paramactorListWeaponDataList
 * @text 複数のキャラクターの武器構成配列
 * @desc この武器を装備した複数のキャラクターの画像構成。
 * @デフォルト []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorWeaponDataList
 * @text キャラクターの武器配置の配列。
 * @desc キャラクターがその武器を装備した際の画像配置。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~WeaponDataExItem:zh_TW
 *
 * @param id
 * @text 武器ID
 * @desc 武器ID
 * @type weapon
 * @default 0
 *  
 * @param actorListWeaponDataList
 * @text 多位角色武器配置陣列
 * @desc 多位角色裝備該武器的圖片配置。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorWeaponDataList
 * @text 角色武器配置陣列
 * @desc 角色裝備該武器的圖片配置。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~WeaponDataExItem:zh_CN
 *
 * @param id
 * @text 武器ID
 * @desc 武器ID
 * @type weapon
 * @default 0
 *  
 * @param actorListWeaponDataList
 * @text 多位角色武器配置阵列
 * @desc 多位角色装备该武器的图片配置。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorWeaponDataList
 * @text 角色武器配置数组
 * @desc 角色装备该武器的图片配置。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~ArmorDataExItem:
 *
 * @param id
 * @text Armor ID
 * @desc Armor ID
 * @type armor
 * @default 0
 *
 * @param actorListArmorDataList
 * @text Actor List Armor Data List
 * @desc Actor List Equipment Image Configuration for the Armor。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorArmorDataList
 * @text Actor Armor Data List
 * @desc Actor Equipment Image Configuration for the Armor。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */
 
/*~struct~ArmorDataExItem:ja_JP
 *
 * @param id
 * @text 装備のID
 * @desc 装備のID
 * @type armor
 * @default 0
 *
 * @param actorListArmorDataList
 * @text 複数キャラの装備構成配列
 * @desc この防具を装備した複数のキャラクターの画像構成。
 * @default []
 * @type struct<ActorListEquipDataItem>[] 
 *
 * @param actorArmorDataList
 * @text キャラクターの装備配置の配列。
 * @desc キャラクターがその防具を装備した際の画像配置。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */
 
/*~struct~ArmorDataExItem:zh_TW
 *
 * @param id
 * @text 裝備ID
 * @desc 裝備ID
 * @type armor
 * @default 0
 *  
 * @param actorListArmorDataList
 * @text 多位角色裝備配置陣列
 * @desc 多位角色裝備該防具的圖片配置。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *  
 * @param actorArmorDataList
 * @text 角色裝備配置陣列
 * @desc 角色裝備該防具的圖片配置。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */
 
/*~struct~ArmorDataExItem:zh_CN
 *
 * @param id
 * @text 装备ID
 * @desc 装备ID
 * @type armor
 * @default 0
 *  
 * @param actorListArmorDataList
 * @text 多位角色装备配置数组
 * @desc 多位角色装备该防具的图片配置。
 * @default []
 * @type struct<ActorListEquipDataItem>[]
 *
 * @param actorArmorDataList
 * @text 角色装备配置数组
 * @desc 角色装备该防具的图片配置。
 * @default []
 * @type struct<ActorEquipDataItem>[]
 *
 */

/*~struct~ActorEquipDataItem:
 *
 * @param id
 * @text Actor ID
 * @desc Actor ID
 * @type actor
 * @default 0
 *
 * @param genPicList
 * @text Generator Pic List
 * @desc generator PIC Configuration。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text Generator Fg List
 * @desc generator Face Configuration。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text Generator Tv List
 * @desc generator TV Configuration。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text Generator Tvd List
 * @desc generator TVD Configuration。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text Generator Sv List
 * @desc generator SV Configuration。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */
 
/*~struct~ActorEquipDataItem:ja_JP
 *
 * @param id
 * @text キャラクターのIDです。
 * @desc キャラクターのIDです。
 * @type actor
 * @default 0
 *
 * @param genPicList
 * @text キャラクター生成器のPICリスト
 * @desc キャラクター生成器のPICリスト。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text キャラクター生成器のFGリスト
 * @desc キャラクター生成器のFGリスト。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text キャラクター生成器のTVリスト
 * @desc キャラクター生成器のTVリスト。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text キャラクター生成器のTVDリスト
 * @desc キャラクター生成器のTVDリスト。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text キャラクター生成器のSVリスト
 * @desc キャラクター生成器のTVDリスト。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */
 
/*~struct~ActorEquipDataItem:zh_TW
 *
 * @param id
 * @text 角色ID
 * @desc 角色ID
 * @type actor
 * @default 0
 *
 * @param genPicList
 * @text PIC紙娃娃設定
 * @desc 針對角色裝備設定PIC紙娃娃。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text FG紙娃娃設定
 * @desc 針對角色裝備設定FG紙娃娃。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text TV紙娃娃設定
 * @desc 針對角色裝備設定TV紙娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text TVD紙娃娃設定
 * @desc 針對角色裝備設定TVD紙娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text SV紙娃娃設定
 * @desc 針對角色裝備設定SV紙娃娃。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */
 
/*~struct~ActorEquipDataItem:zh_CN
 *
 * @param id
 * @text 角色ID
 * @desc 角色ID
 * @type actor
 * @default 0
 *
 * @param genPicList
 * @text PIC纸娃娃设定
 * @desc 针对角色装备设定PIC纸娃娃。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text FG纸娃娃设定
 * @desc 针对角色装备设定FG纸娃娃。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text TV纸娃娃设定
 * @desc 针对角色装备设定TV纸娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text TVD纸娃娃设定
 * @desc 针对角色装备设定TVD纸娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text SV纸娃娃设定
 * @desc 针对角色装备设定SV纸娃娃。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */
 
/*~struct~ActorListEquipDataItem:
 *
 * @param actorIdList
 * @text Actor ID List
 * @desc Actor ID List
 * @type actor[]
 * @default []
 *
 * @param genPicList
 * @text Generator Pic List
 * @desc generator PIC Configuration。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text Generator Fg List
 * @desc generator Face Configuration。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text Generator Tv List
 * @desc generator TV Configuration。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text Generator Tvd List
 * @desc generator TVD Configuration。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text Generator Sv List
 * @desc generator SV Configuration。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */

/*~struct~ActorListEquipDataItem:ja_JP
 *
 * @param actorIdList
 * @text アクターIDリスト
 * @desc アクターIDリスト
 * @type actor[]
 * @default []
 *
 * @param genPicList
 * @text キャラクター生成器のPICリスト
 * @desc キャラクター生成器のPICリスト。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text キャラクター生成器のFGリスト
 * @desc キャラクター生成器のFGリスト。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text キャラクター生成器のTVリスト
 * @desc キャラクター生成器のTVリスト。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text キャラクター生成器のTVDリスト
 * @desc キャラクター生成器のTVDリスト。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text キャラクター生成器のSVリスト
 * @desc キャラクター生成器のTVDリスト。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */
 
/*~struct~ActorListEquipDataItem:zh_TW
 *
 * @param actorIdList
 * @text 角色ID陣列
 * @desc 角色ID陣列
 * @type actor[]
 * @default []
 *
 * @param genPicList
 * @text PIC紙娃娃設定
 * @desc 針對角色裝備設定PIC紙娃娃。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text FG紙娃娃設定
 * @desc 針對角色裝備設定FG紙娃娃。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text TV紙娃娃設定
 * @desc 針對角色裝備設定TV紙娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text TVD紙娃娃設定
 * @desc 針對角色裝備設定TVD紙娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text SV紙娃娃設定
 * @desc 針對角色裝備設定SV紙娃娃。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */
 
/*~struct~ActorListEquipDataItem:zh_CN
 *
 * @param actorIdList
 * @text 角色ID陣列
 * @desc 角色ID陣列
 * @type actor[]
 * @default []
 *
 * @param genPicList
 * @text PIC纸娃娃设定
 * @desc 针对角色装备设定PIC纸娃娃。
 * @default []
 * @type struct<ActorGenPicDataItemPlus>[]
 *
 * @param genFgList
 * @text FG纸娃娃设定
 * @desc 针对角色装备设定FG纸娃娃。
 * @default []
 * @type struct<ActorGenFgDataItemPlus>[]
 *
 * @param genTvList
 * @text TV纸娃娃设定
 * @desc 针对角色装备设定TV纸娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text TVD纸娃娃设定
 * @desc 针对角色装备设定TVD纸娃娃。
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genSvList
 * @text SV纸娃娃设定
 * @desc 针对角色装备设定SV纸娃娃。
 * @default []
 * @type struct<ActorGenSvDataItemPlus>[]
 *
 */

/*~struct~ActorDataExItem:
 *
 * @param id
 * @text actorId
 * @desc Actor ID
 * @type actor
 * @default 0
 *
 * @param equipSync
 * @text Equipment synchronization
 * @desc Specifies a character to synchronize with the current status of his equipment
 * @type actor
 * @default 0
 *
 * @param picInfo
 * @text ■ PIC Related Settings
 *
 * @param picWidth
 * @text Pic Canvas Width
 * @desc Pic Canvas Width。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param picHeight
 * @text Pic Canvas Height
 * @desc Pic Canvas Height。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param genPicList
 * @text Generator Pic List
 * @desc Configure Actor Tile Composition for PIC。
 * @parent picInfo
 * @default []
 * @type struct<ActorGenPicDataItem>[]
 *
 * @param faceInfo
 * @text ■ Face Related Settings
 *
 * @param IsUseGeneratorFG
 * @text Enable Generator FACE
 * @text Enable Generator FACE
 * @on Yes
 * @off No
 * @parent faceInfo
 * @type boolean
 * @default false
 *
 * @param fgWidth
 * @text Face Canvas Width
 * @desc Face Canvas Width。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param fgHeight
 * @text Face Canvas Height
 * @desc Face Canvas Height。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param genFgList
 * @text Generator Fg List
 * @desc Configure Actor Tile Composition for FACE。
 * @parent faceInfo
 * @default []
 * @type struct<ActorGenFgDataItem>[]
 *
 * @param tvInfo
 * @text ■ TV Related Settings
 *
 * @param IsUseGeneratorTV
 * @text Enable Generator TV
 * @text Enable Generator TV
 * @on Yes
 * @off No
 * @parent tvInfo
 * @type boolean
 * @default false
 *
 * @param tvWidth
 * @text TV Canvas Width
 * @desc TV Canvas Width。
 * @type number
 * @parent tvInfo
 * @default 144
 *
 * @param tvHeight
 * @text TV Canvas Height
 * @desc TV Canvas Height。
 * @type number
 * @parent tvInfo
 * @default 192
 *
 * @param genTvList
 * @text Generator Tv List
 * @desc Configure Actor Tile Composition for TV。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text Generator Tvd List
 * @desc Configure Actor Tile Composition for TVD。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param svInfo
 * @text ■ SV Related Settings
 *
 * @param IsUseGeneratorSV
 * @text Enable Generator SV
 * @text Enable Generator SV
 * @on Yes
 * @off No
 * @parent svInfo
 * @type boolean
 * @default false
 *
 * @param svWidth
 * @text SV Canvas Width
 * @desc SV Canvas Width。
 * @type number
 * @parent svInfo
 * @default 576
 *
 * @param svHeight
 * @text SV Canvas Height
 * @desc SV Canvas Height。
 * @type number
 * @parent svInfo
 * @default 384
 *
 * @param genSvList
 * @text Generator Sv List
 * @desc Configure Actor Tile Composition for SV。
 * @parent svInfo
 * @default []
 * @type struct<ActorGenSvDataItem>[]
 *
 */

/*~struct~ActorDataExItem:ja_JP
 *
 * @param id
 * @text キャラクターID
 * @desc キャラクターID
 * @type actor
 * @default 0
 *
 * @param equipSync
 * @text 装備の同期
 * @desc 装備の現在のステータスと同期するキャラクターを指定します
 * @type アクター
 * @デフォルト0
 *
 * @param picInfo
 * @text ■ PIC関連設定
 *
 * @param picWidth
 * @text PICキャンバスの幅
 * @desc PICキャンバスの幅。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param picHeight
 * @text PICキャンバスの高さ
 * @desc PICキャンバスの高さ。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param genPicList
 * @text キャラクター生成器のPICリスト
 * @desc キャラクター生成器のPICリスト。
 * @parent picInfo
 * @default []
 * @type struct<ActorGenPicDataItem>[]
 *
 * @param faceInfo
 * @text ■ FG関連設定
 *
 * @param IsUseGeneratorFG
 * @text 顔グラ生成の有効化
 * @text 顔グラ生成の有効化
 * @on はい
 * @off いいえ
 * @parent faceInfo
 * @type boolean
 * @default false
 *
 * @param fgWidth
 * @text FGキャンバスの幅
 * @desc FGキャンバスの幅。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param fgHeight
 * @text FGキャンバスの高さ
 * @desc FGキャンバスの高さ。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param genFgList
 * @text キャラクター生成器のFGリスト
 * @desc キャラクター生成器のFGリスト。
 * @parent faceInfo
 * @default []
 * @type struct<ActorGenFgDataItem>[]
 *
 * @param tvInfo
 * @text ■ TV関連設定
 *
 * @param IsUseGeneratorTV
 * @text 歩行スプライト生成の有効化
 * @text 歩行スプライト生成の有効化
 * @on はい
 * @off いいえ
 * @parent tvInfo
 * @type boolean
 * @default false
 *
 * @param tvWidth
 * @text TVキャンバスの幅
 * @desc TVキャンバスの幅。
 * @type number
 * @parent tvInfo
 * @default 144
 *
 * @param tvHeight
 * @text TVキャンバスの高さ
 * @desc TVキャンバスの高さ。
 * @type number
 * @parent tvInfo
 * @default 192
 *
 * @param genTvList
 * @text キャラクター生成器のTVリスト
 * @desc キャラクター生成器のTVリスト。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text キャラクター生成器のTVDリスト
 * @desc キャラクター生成器のTVDリスト。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param svInfo
 * @text ■ SV関連設定
 *
 * @param IsUseGeneratorSV
 * @text サイドビュースプライト生成を有効にする
 * @text サイドビュースプライト生成を有効にする
 * @on はい
 * @off いいえ
 * @parent svInfo
 * @type boolean
 * @default false
 *
 * @param svWidth
 * @text SVキャンバスの幅
 * @desc SVキャンバスの幅。
 * @type number
 * @parent svInfo
 * @default 576
 *
 * @param svHeight
 * @text SVキャンバスの高さ
 * @desc SVキャンバスの高さ。
 * @type number
 * @parent svInfo
 * @default 384
 *
 * @param genSvList
 * @text キャラクター生成器のSVリスト
 * @desc キャラクター生成器のSVリスト。
 * @parent svInfo
 * @default []
 * @type struct<ActorGenSvDataItem>[]
 *
 */
 
/*~struct~ActorDataExItem:zh_TW
 *
 * @param id
 * @text 角色ID
 * @desc 角色ID
 * @type actor
 * @default 0
 *
 * @param equipSync
 * @text 裝備同步
 * @desc 指定某位角色與其裝備的現狀同步
 * @type actor
 * @default 0
 *
 * @param picInfo
 * @text ■ PIC相關設定
 *
 * @param picWidth
 * @text PIC畫布寬
 * @desc PIC畫布寬。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param picHeight
 * @text PIC畫布高
 * @desc PIC畫布高。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param genPicList
 * @text PIC紙娃娃設定
 * @desc 針對角色裝備設定PIC紙娃娃。
 * @parent picInfo
 * @default []
 * @type struct<ActorGenPicDataItem>[]
 *
 * @param faceInfo
 * @text ■ FG相關設定
 *
 * @param IsUseGeneratorFG
 * @text 是否在FG套用紙娃娃
 * @text 是否在FG套用紙娃娃
 * @on 是
 * @off 否
 * @parent faceInfo
 * @type boolean
 * @default false
 *
 * @param fgWidth
 * @text FG畫布寬
 * @desc FG畫布寬。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param fgHeight
 * @text FG畫布高
 * @desc FG畫布高。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param genFgList
 * @text FG紙娃娃設定
 * @desc 針對角色設定FG紙娃娃。
 * @parent faceInfo
 * @default []
 * @type struct<ActorGenFgDataItem>[]
 *
 * @param tvInfo
 * @text ■ TV相關設定
 *
 * @param IsUseGeneratorTV
 * @text 是否在TV套用紙娃娃
 * @text 是否在TV套用紙娃娃
 * @on 是
 * @off 否
 * @parent tvInfo
 * @type boolean
 * @default false
 *
 * @param tvWidth
 * @text TV畫布寬
 * @desc TV畫布寬。
 * @type number
 * @parent tvInfo
 * @default 144
 *
 * @param tvHeight
 * @text TV畫布高
 * @desc TV畫布高。
 * @type number
 * @parent tvInfo
 * @default 192
 *
 * @param genTvList
 * @text TV紙娃娃設定
 * @desc 針對角色設定TV紙娃娃。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text TVD紙娃娃設定
 * @desc 針對角色裝備設定TVD紙娃娃。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param svInfo
 * @text ■ SV相關設定
 *
 * @param IsUseGeneratorSV
 * @text 是否在SV套用紙娃娃
 * @text 是否在SV套用紙娃娃
 * @on 是
 * @off 否
 * @parent svInfo
 * @type boolean
 * @default false
 *
 * @param svWidth
 * @text SV畫布寬
 * @desc SV畫布寬。
 * @type number
 * @parent svInfo
 * @default 576
 *
 * @param svHeight
 * @text SV畫布高
 * @desc SV畫布高。
 * @type number
 * @parent svInfo
 * @default 384
 *
 * @param genSvList
 * @text SV紙娃娃設定
 * @desc 針對角色設定SV紙娃娃。
 * @parent svInfo
 * @default []
 * @type struct<ActorGenSvDataItem>[]
 *
 */
 
/*~struct~ActorDataExItem:zh_CN
 *
 * @param id
 * @text 角色ID
 * @desc 角色ID
 * @type actor
 * @default 0
 *
 * @param equipSync
 * @text 装备同步
 * @desc 指定某位角色与其装备的现状同步
 * @type actor
 * @default 0
 *
 * @param picInfo
 * @text ■ PIC相关设定
 *
 * @param picWidth
 * @text PIC画布宽
 * @desc PIC画布宽。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param picHeight
 * @text PIC画布高
 * @desc PIC画布高。
 * @type number
 * @parent picInfo
 * @default 500
 *
 * @param genPicList
 * @text PIC纸娃娃设定
 * @desc 针对角色装备设定PIC纸娃娃。
 * @parent picInfo
 * @default []
 * @type struct<ActorGenPicDataItem>[]
 *
 * @param faceInfo
 * @text ■ FG相关设定
 *
 * @param IsUseGeneratorFG
 * @text 是否在FG套用纸娃娃
 * @text 是否在FG套用纸娃娃
 * @on 是
 * @off 否
 * @parent faceInfo
 * @type boolean
 * @default false
 *
 * @param fgWidth
 * @text FG画布宽
 * @desc FG画布宽。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param fgHeight
 * @text FG画布高
 * @desc FG画布高。
 * @type number
 * @parent faceInfo
 * @default 144
 *
 * @param genFgList
 * @text FG纸娃娃设定
 * @desc 针对角色设定FG纸娃娃。
 * @parent faceInfo
 * @default []
 * @type struct<ActorGenFgDataItem>[]
 *
 * @param tvInfo
 * @text ■ TV相关设定
 *
 * @param IsUseGeneratorTV
 * @text 是否在TV套用纸娃娃
 * @text 是否在TV套用纸娃娃
 * @on 是
 * @off 否
 * @parent tvInfo
 * @type boolean
 * @default false
 *
 * @param tvWidth
 * @text TV画布宽
 * @desc TV画布宽。
 * @type number
 * @parent tvInfo
 * @default 144
 *
 * @param tvHeight
 * @text TV画布高
 * @desc TV画布高。
 * @type number
 * @parent tvInfo
 * @default 192
 *
 * @param genTvList
 * @text TV纸娃娃设定
 * @desc 针对角色设定TV纸娃娃。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param genTvdList
 * @text TVD纸娃娃设定
 * @desc 针对角色装备设定TVD纸娃娃。
 * @parent tvInfo
 * @default []
 * @type struct<ActorGenTvDataItemPlus>[]
 *
 * @param svInfo
 * @text ■ SV相关设定
 *
 * @param IsUseGeneratorSV
 * @text 是否在SV套用纸娃娃
 * @text 是否在SV套用纸娃娃
 * @on 是
 * @off 否
 * @parent svInfo
 * @type boolean
 * @default false
 *
 * @param svWidth
 * @text SV画布宽
 * @desc SV画布宽。
 * @type number
 * @parent svInfo
 * @default 576
 *
 * @param svHeight
 * @text SV画布高
 * @desc SV画布高。
 * @type number
 * @parent svInfo
 * @default 384
 *
 * @param genSvList
 * @text SV纸娃娃设定
 * @desc 针对角色设定SV纸娃娃。
 * @parent svInfo
 * @default []
 * @type struct<ActorGenSvDataItem>[]
 *
 */

/*~struct~ActorGenPicDataItem:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text Pic Image
 * @desc Pic Image
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC Canvas X
 * @desc PIC Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC Canvas Y
 * @desc PIC Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */

/*~struct~ActorGenPicDataItem:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text PIC画像
 * @desc PIC画像
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC Canvas X
 * @desc PIC Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC Canvas Y
 * @desc PIC Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenPicDataItem:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text PIC圖案
 * @desc PIC圖案
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC畫布X
 * @desc PIC畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC畫布Y
 * @desc PIC畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenPicDataItem:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text PIC图案
 * @desc PIC图案
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC画布X
 * @desc PIC画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC画布Y
 * @desc PIC画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenPicDataItemPlus:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text Pic Image
 * @desc Pic Image
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC Canvas X
 * @desc PIC Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC Canvas Y
 * @desc PIC Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text Whether to retain the color configuration of the Actor
 * @desc If set to yes, the color setting will be based on the color of the Actor setting.
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
 /*~struct~ActorGenPicDataItemPlus:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text PIC画像
 * @desc PIC画像
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC Canvas X
 * @desc PIC Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC Canvas Y
 * @desc PIC Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text キャラクターのカラー設定を保持するかどうか
 * @desc [はい] に設定すると、色の設定は変数または文字によって設定された色に基づきます。
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenPicDataItemPlus:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text PIC圖案
 * @desc PIC圖案
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC畫布X
 * @desc PIC畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC畫布Y
 * @desc PIC畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的顏色設定
 * @desc 如果設置為是，顏色設定會依照變數或是角色設定的顏色為基準。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenPicDataItemPlus:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text PIC图案
 * @desc PIC图案
 * @type file
 * @dir img/generator_PIC/
 * @default
 *
 * @param x
 * @text PIC画布X
 * @desc PIC画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text PIC画布Y
 * @desc PIC画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的颜色设定
 * @desc 如果设置为是，颜色设定会依照变数或是角色设定的颜色为基准。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

/*~struct~ActorGenFgDataItem:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text Face Image
 * @desc Face Image
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text Face Canvas X
 * @desc Face Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text Face Canvas Y
 * @desc Face Canvas Y。
 * @type number
 * @min -9999
 * @default 0

 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */

/*~struct~ActorGenFgDataItem:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text FG画像
 * @desc FG画像
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text FG Canvas X
 * @desc FG Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text FG Canvas Y
 * @desc FG Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenFgDataItem:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text FG圖案
 * @desc FG圖案
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text FG畫布X
 * @desc FG畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text FG畫布Y
 * @desc FG畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

/*~struct~ActorGenFgDataItem:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text FG图案
 * @desc FG图案
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text FG画布X
 * @desc FG画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text FG画布Y
 * @desc FG画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

/*~struct~ActorGenTvDataItem:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text TV Image
 * @desc TV Image
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV Canvas X
 * @desc TV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV Canvas Y
 * @desc TV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItem:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text TV画像
 * @desc TV画像
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV Canvas X
 * @desc TV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV Canvas Y
 * @desc TV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItem:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text TV圖案
 * @desc TV圖案
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV畫布X
 * @desc TV畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV畫布Y
 * @desc TV畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItem:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text TV图案
 * @desc TV图案
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV画布X
 * @desc TV画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV画布Y
 * @desc TV画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenFgDataItemPlus:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text Face Image
 * @desc Face Image
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text Face Canvas X
 * @desc Face Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text Face Canvas Y
 * @desc Face Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text Whether to retain the color configuration of the Actor
 * @desc If set to yes, the color setting will be based on the color of the Variable or Actor setting.
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenFgDataItemPlus:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text FG画像
 * @desc FG画像
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text FG Canvas X
 * @desc FG Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text FG Canvas Y
 * @desc FG Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text キャラクターのカラー設定を保持するかどうか
 * @desc [はい] に設定すると、色の設定は変数または文字によって設定された色に基づきます。
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenFgDataItemPlus:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text FG圖案
 * @desc FG圖案
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text FG畫布X
 * @desc FG畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text FG畫布Y
 * @desc FG畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的顏色設定
 * @desc 如果設置為是，顏色設定會依照變數或是角色設定的顏色為基準。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenFgDataItemPlus:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text FG图案
 * @desc FG图案
 * @type file
 * @dir img/generator_FG/
 * @default
 *
 * @param x
 * @text FG画布X
 * @desc FG画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text FG画布Y
 * @desc FG画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的颜色设定
 * @desc 如果设置为是，颜色设定会依照变数或是角色设定的颜色为基准。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItemPlus:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text TV Image
 * @desc TV Image
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV Canvas X
 * @desc TV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV Canvas Y
 * @desc TV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text Whether to retain the color configuration of the Actor
 * @desc If set to yes, the color setting will be based on the color of the Variable or Actor setting.
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItemPlus:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text TV画像
 * @desc TV画像
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV Canvas X
 * @desc TV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV Canvas Y
 * @desc TV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text キャラクターのカラー設定を保持するかどうか
 * @desc Yes に設定すると、このブロックの色設定はキャラクターによって設定された色に基づきます。
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItemPlus:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text TV圖案
 * @desc TV圖案
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV畫布X
 * @desc TV畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV畫布Y
 * @desc TV畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的顏色設定
 * @desc 如果設置為是，該區塊顏色設定會依照角色設定的顏色為基準。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenTvDataItemPlus:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text TV图案
 * @desc TV图案
 * @type file
 * @dir img/generator_TV/
 * @default
 *
 * @param x
 * @text TV画布X
 * @desc TV画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text TV画布Y
 * @desc TV画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的颜色设定
 * @desc 如果设置为是，该区块颜色设定会依照角色设定的颜色为基准。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

/*~struct~ActorGenSvDataItem:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text SV Image
 * @desc SV Image
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV Canvas X
 * @desc SV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV Canvas Y
 * @desc SV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */ 
 
/*~struct~ActorGenSvDataItem:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text SV画像
 * @desc SV画像
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV Canvas X
 * @desc SV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV Canvas Y
 * @desc SV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */ 
 
/*~struct~ActorGenSvDataItem:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text SV圖案
 * @desc SV圖案
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV畫布X
 * @desc SV畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV畫布Y
 * @desc SV畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */
 
/*~struct~ActorGenSvDataItem:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text SV图案
 * @desc SV图案
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV画布X
 * @desc SV画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV画布Y
 * @desc SV画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

/*~struct~ActorGenSvDataItemPlus:
 *
 * @param cd
 * @text Part Type
 * @desc Part Type
 * @type text
 *
 * @param name
 * @text Part Name
 * @desc Part Name
 * @type text
 *
 * @param img
 * @text SV Image
 * @desc SV Image
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV Canvas X
 * @desc SV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV Canvas Y
 * @desc SV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text Whether to retain the color configuration of the Actor
 * @desc If set to yes, the color setting will be based on the color of the Actor setting.
 * @on Yes
 * @off No
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text Original Color
 * @desc Original Color
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text New Color
 * @desc Colors to be Transformed
 * @type select
 * @default none
 * @option not change color
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candy apple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option red purple
 * @value redPurple
 * @option dark Reddish brown
 * @value darkReddishbrown
 * @option reddish brown
 * @value reddishbrown
 * @option dark red
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option mid yellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option light orange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option dark yellow green
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option spring green
 * @value springGreen
 * @option green
 * @value green
 * @option persian green
 * @value persianGreen
 * @option deep green
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option sky blue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympic blue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarine blue
 * @value ultramarineBlue
 * @option navy blue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */ 

/*~struct~ActorGenSvDataItemPlus:ja_JP
 *
 * @param cd
 * @text 部品カテゴリ
 * @desc 部品カテゴリ
 * @type text
 *
 * @param name
 * @text 部品名
 * @desc 部品名
 * @type text
 *
 * @param img
 * @text SV画像
 * @desc SV画像
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV Canvas X
 * @desc SV Canvas X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV Canvas Y
 * @desc SV Canvas Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text キャラクターのカラー設定を保持するかどうか
 * @desc はい に設定すると、このブロックの色設定はキャラクターによって設定された色に基づきます。
 * @on はい
 * @off いいえ
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材のオリジナルの色。
 * @desc 素材のオリジナルの色。
 * @type select
 * @default white
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 *
 * @param newColor
 * @text 変換する色。
 * @desc 変換する色。
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option white
 * @value white
 * @option gray
 * @value gray
 * @option black
 * @value black
 * @option gold
 * @value gold
 * @option silver
 * @value silver
 * @option copper
 * @value copper
 * @option red
 * @value red
 * @option candyApple
 * @value candyApple
 * @option maroon
 * @value maroon
 * @option redPurple
 * @value redPurple
 * @option darkReddishbrown
 * @value darkReddishbrown
 * @option reddishbrown
 * @value reddishbrown
 * @option darkRed
 * @value darkRed
 * @option skin
 * @value skin
 * @option coral
 * @value coral
 * @option pink
 * @value pink
 * @option begoniaRed
 * @value begoniaRed
 * @option magenta
 * @value magenta
 * @option yellow
 * @value yellow
 * @option midYellow
 * @value midYellow
 * @option ochre
 * @value ochre
 * @option lightOrange
 * @value lightOrange
 * @option orange
 * @value orange
 * @option darkYellowGreen
 * @value darkYellowGreen
 * @option olive
 * @value olive
 * @option lime
 * @value lime
 * @option springGreen
 * @value springGreen
 * @option green
 * @value green
 * @option persianGreen
 * @value persianGreen
 * @option deepGreen
 * @value deepGreen
 * @option turquoise
 * @value turquoise
 * @option aqua
 * @value aqua
 * @option skyBlue
 * @value skyBlue
 * @option teal
 * @value teal
 * @option olympicBlue
 * @value olympicBlue
 * @option blue
 * @value blue
 * @option ultramarineBlue
 * @value ultramarineBlue
 * @option navyBlue
 * @value navyBlue
 * @option grape
 * @value grape
 * @option fuchsia
 * @value fuchsia
 * @option purple
 * @value purple
 * @option amethyst
 * @value amethyst
 * @option darkPurple
 * @value darkPurple
 */
 
/*~struct~ActorGenSvDataItemPlus:zh_TW
 *
 * @param cd
 * @text 部件類別
 * @desc 部件類別
 * @type text
 *
 * @param name
 * @text 部件名稱
 * @desc 部件名稱
 * @type text
 *
 * @param img
 * @text SV圖案
 * @desc SV圖案
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV畫布X
 * @desc SV畫布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV畫布Y
 * @desc SV畫布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的顏色設定
 * @desc 如果設置為是，顏色設定會依照變數或是角色設定的顏色為基準。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的顏色
 * @desc 素材原本的顏色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要轉換的的顏色
 * @desc 要轉換的的顏色
 * @type select
 * @default none
 * @option 不轉色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 銀色
 * @value silver
 * @option 銅色
 * @value copper
 * @option 紅色
 * @value red
 * @option 蘋果糖紅
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗紅棕色
 * @value darkReddishbrown
 * @option 紅棕色
 * @value reddishbrown
 * @option 暗紅色
 * @value darkRed
 * @option 膚色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉紅色
 * @value pink
 * @option 海棠紅
 * @value begoniaRed
 * @option 洋紅色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黃綠色
 * @value darkYellowGreen
 * @option 橄欖色
 * @value olive
 * @option 青檸檬色
 * @value lime
 * @option 春綠色
 * @value springGreen
 * @option 綠色
 * @value green
 * @option 波斯綠
 * @value persianGreen
 * @option 深綠色
 * @value deepGreen
 * @option 綠松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空藍
 * @value skyBlue
 * @option 水鴨色
 * @value teal
 * @option 奧林匹斯藍
 * @value olympicBlue
 * @option 藍色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深藍色
 * @value navyBlue
 * @option 葡萄藍
 * @value grape
 * @option 紫紅色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

/*~struct~ActorGenSvDataItemPlus:zh_CN
 *
 * @param cd
 * @text 部件类别
 * @desc 部件类别
 * @type text
 *
 * @param name
 * @text 部件名称
 * @desc 部件名称
 * @type text
 *
 * @param img
 * @text SV图案
 * @desc SV图案
 * @type file
 * @dir img/generator_SV/
 * @default
 *
 * @param x
 * @text SV画布X
 * @desc SV画布X。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param y
 * @text SV画布Y
 * @desc SV画布Y。
 * @type number
 * @min -9999
 * @default 0
 *
 * @param IsInheritColors
 * @text 是否保留角色的颜色设定
 * @desc 如果设置为是，颜色设定会依照变数或是角色设定的颜色为基准。
 * @on 是
 * @off 否
 * @type boolean
 * @default false
 *
 * @param orgColor
 * @text 素材原本的颜色
 * @desc 素材原本的颜色
 * @type select
 * @default white
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 *
 * @param newColor
 * @text 要转换的的颜色
 * @desc 要转换的的颜色
 * @type select
 * @default none
 * @option 不转色
 * @value none
 * @option 白色
 * @value white
 * @option 灰色
 * @value gray
 * @option 黑色
 * @value black
 * @option 金色
 * @value gold
 * @option 银色
 * @value silver
 * @option 铜色
 * @value copper
 * @option 红色
 * @value red
 * @option 苹果糖红
 * @value candyApple
 * @option 栗色
 * @value maroon
 * @option 褐色
 * @value redPurple
 * @option 暗红棕色
 * @value darkReddishbrown
 * @option 红棕色
 * @value reddishbrown
 * @option 暗红色
 * @value darkRed
 * @option 肤色
 * @value skin
 * @option 珊瑚色
 * @value coral
 * @option 粉红色
 * @value pink
 * @option 海棠红
 * @value begoniaRed
 * @option 洋红色
 * @value magenta
 * @option 黄色
 * @value yellow
 * @option 中黄色
 * @value midYellow
 * @option 土黄色
 * @value ochre
 * @option 亮橘色
 * @value lightOrange
 * @option 橘色
 * @value orange
 * @option 暗黄绿色
 * @value darkYellowGreen
 * @option 橄榄色
 * @value olive
 * @option 青柠檬色
 * @value lime
 * @option 春绿色
 * @value springGreen
 * @option 绿色
 * @value green
 * @option 波斯绿
 * @value persianGreen
 * @option 深绿色
 * @value deepGreen
 * @option 绿松色
 * @value turquoise
 * @option 水色的
 * @value aqua
 * @option 天空蓝
 * @value skyBlue
 * @option 水鸭色
 * @value teal
 * @option 奥林匹斯蓝
 * @value olympicBlue
 * @option 蓝色
 * @value blue
 * @option 群青色
 * @value ultramarineBlue
 * @option 深蓝色
 * @value navyBlue
 * @option 葡萄蓝
 * @value grape
 * @option 紫红色
 * @value fuchsia
 * @option 紫色
 * @value purple
 * @option 紫晶色
 * @value amethyst
 * @option 深紫色
 * @value darkPurple
 */

var Imported = Imported || {};
Imported.SunMZ_GeneratorEx = true;
var SunMZ = SunMZ || {};
SunMZ.Versions = SunMZ.Versions || {};
SunMZ.Versions["SunMZ_0_GeneratorEx"] = "3.0.4";
SunMZ.GeneratorEx = SunMZ.GeneratorEx || {};
SunMZ.GeneratorEx.parameters = PluginManagerEx.createParameter(document.currentScript);
SunMZ.GeneratorEx.ActorDataExList = (SunMZ.GeneratorEx.parameters.ActorDataList || []);
SunMZ.GeneratorEx.WeaponDataExList = (SunMZ.GeneratorEx.parameters.WeaponDataList || []);
SunMZ.GeneratorEx.WeaponSecDataExList = (SunMZ.GeneratorEx.parameters.WeaponSecDataExList || []);
SunMZ.GeneratorEx.ArmorDataExList = (SunMZ.GeneratorEx.parameters.ArmorDataList || []);
SunMZ.GeneratorEx.VariableDataExList = (SunMZ.GeneratorEx.parameters.VarDataList || []);
SunMZ.GeneratorEx.IsSaveSync = (SunMZ.GeneratorEx.parameters.IsSaveSync);
SunMZ.GeneratorEx.SvScalingWidth = Number(SunMZ.GeneratorEx.parameters.SvScalingWidth) || 0.75;
SunMZ.GeneratorEx.SvScalingHeight = Number(SunMZ.GeneratorEx.parameters.SvScalingHeight) || 0.75;
SunMZ.GeneratorEx.FaceTimeoutNum = Number(SunMZ.GeneratorEx.parameters.FaceTimeoutNum) || 3;
SunMZ.GeneratorEx.IsPreloadPicB64 = (SunMZ.GeneratorEx.parameters.IsPreloadPicB64);
SunMZ.GeneratorEx.IsPreloadFgB64 = (SunMZ.GeneratorEx.parameters.IsPreloadFgB64);
SunMZ.GeneratorEx.IsPreloadTvB64 = (SunMZ.GeneratorEx.parameters.IsPreloadTvB64);
SunMZ.GeneratorEx.IsPreloadTvdB64 = (SunMZ.GeneratorEx.parameters.IsPreloadTvdB64);
SunMZ.GeneratorEx.IsPreloadSvB64 = (SunMZ.GeneratorEx.parameters.IsPreloadSvB64);
SunMZ.GeneratorEx.PicMergeType = (SunMZ.GeneratorEx.parameters.PicMergeType || "WaitComple");
SunMZ.GeneratorEx.FgMergeType = (SunMZ.GeneratorEx.parameters.FgMergeType || "WaitComple");
SunMZ.GeneratorEx.TvMergeType = (SunMZ.GeneratorEx.parameters.TvMergeType || "WaitComple");
SunMZ.GeneratorEx.TvdMergeType = (SunMZ.GeneratorEx.parameters.TvdMergeType || "WaitComple");
SunMZ.GeneratorEx.SvMergeType = (SunMZ.GeneratorEx.parameters.SvMergeType || "WaitComple");

if (Imported.SunMZ_GeneratorExSetting) {
	SunMZ.GeneratorEx.ActorDataExList = SunMZ.GeneratorEx.ActorDataExList.concat(SunMZ.GeneratorExSetting.ActorDataExList);
	SunMZ.GeneratorEx.WeaponDataExList = SunMZ.GeneratorEx.WeaponDataExList.concat(SunMZ.GeneratorExSetting.WeaponDataExList);
	SunMZ.GeneratorEx.WeaponSecDataExList = SunMZ.GeneratorEx.WeaponSecDataExList.concat(SunMZ.GeneratorExSetting.WeaponSecDataExList);
	SunMZ.GeneratorEx.ArmorDataExList = SunMZ.GeneratorEx.ArmorDataExList.concat(SunMZ.GeneratorExSetting.ArmorDataExList);
	SunMZ.GeneratorEx.VariableDataExList = SunMZ.GeneratorEx.VariableDataExList.concat(SunMZ.GeneratorExSetting.VariableDataExList);
}

ImageManager.loadGeneratorPic = function(filename, newColor, originalColor) {
	return this.loadGeneratorBitmap("img/generator_PIC/", filename, newColor, originalColor);
};

ImageManager.loadGeneratorFg = function(filename, newColor, originalColor) {
	return this.loadGeneratorBitmap("img/generator_FG/", filename, newColor, originalColor);
};

ImageManager.loadGeneratorTv = function(filename, newColor, originalColor) {
	return this.loadGeneratorBitmap("img/generator_TV/", filename, newColor, originalColor);
};

ImageManager.loadGeneratorSv = function(filename, newColor, originalColor) {
	return this.loadGeneratorBitmap("img/generator_SV/", filename, newColor, originalColor);
};

ImageManager.loadGeneratorBitmap = function(folder, filename, newColor, originalColor) {
    if (filename) {
        const url = folder + Utils.encodeURI(filename) + ".png";
        return this.loadGeneratorBitmapFromUrl(url, newColor, originalColor);
    } else {
        return this._emptyBitmap;
    }
};

ImageManager.loadBase64 = function(url) {
    const cache = this._cache;
    if (!cache[url]) {
        cache[url] = SunMZ_Bitmap.load(url);
    }
    return cache[url];
};

ImageManager.loadGeneratorBitmapFromUrl = function(url, newColor, originalColor) {
    const cache = url.includes("/system/") ? this._system : this._cache;
    if (!cache[url + "|" + newColor + "|" + originalColor]) {
        cache[url + "|" + newColor + "|" + originalColor] = Bitmap.load(url);
    }
    return cache[url + "|" + newColor + "|" + originalColor];
};

ImageManager.clearCacheByUrl = function(url) {
    const cache = this._cache;
	if (cache[url]) {
		cache[url].destroy();
	}
};

ImageManager.isBigFace = function(filename) {
	if (filename) {
		const sign = Utils.extractFileName(filename).match(/^[!$]+/);
		return sign && sign[0].includes("$");
	}
    return false;
};

if (!Imported.SunMZ_CoreBase) {
	
	function SunMZ_CoreBase() {
		throw new Error("This is a static class");
	}

	SunMZ_CoreBase.isNotBlank = (obj) => {
		return (typeof obj !== "undefined" && !(typeof obj == "number" && isNaN(obj)) && obj !== null && !(typeof obj === 'string' && obj.replace(/\u3000/g, '').trim().length == 0));
	};

	SunMZ_CoreBase.isArrayNotEmpty = (dataList) => {
		return (dataList && dataList.length > 0);
	};

	SunMZ_CoreBase.arraySetSort = (dataList) => {
		let dataSet = new Set(dataList);
		dataList = Array.from(dataSet);
		dataList = dataList.sort();
		return dataList;
	};

	SunMZ_CoreBase.arraySetSortDesc = (dataList) => {
		let dataSet = new Set(dataList);
		dataList = Array.from(dataSet);
		dataList = dataList.sort().reverse();
		return dataList;
	};

	SunMZ_CoreBase.findDataById = (list, id) => {
		let item = list.find(item => item.id == id);
		if (item && SunMZ_CoreBase.isNotBlank(item)) {
			return item;
		}
		return false;
	};

	SunMZ_CoreBase.findDataByIds = (list, id) => {
		let item = list.find(item => item.ids.includes(id));
		if (item && SunMZ_CoreBase.isNotBlank(item)) {
			return item;
		}
		return false;
	};
	
	SunMZ_CoreBase.findDataByCode = (list, code) => {
		let item = list.find(item => item.code == code);
		if (item && SunMZ_CoreBase.isNotBlank(item)) {
			return item;
		}
		return false;
	};
	
	SunMZ_CoreBase.fixFun = (fun) => {
		if (fun instanceof Function) {
			return fun;
		}
		return eval(fun);
	};
	
	SunMZ_CoreBase.getUuid = () => {
		let d = Date.now();
		if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
			d += performance.now(); //use high-precision timer if available
		}
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	};
	
}

function ColorUtils() {
	throw new Error("This is a static class");
};

ColorUtils.getColorRgb = function(colorCode) {
	let colorPalette = {
		white: {//白色
			r: 255,
			g: 255,
			b: 255
		},
		gray: {//灰色
			r: 128,
			g: 128,
			b: 128
		},
		black: {//黑色
			r: 0,
			g: 0,
			b: 0
		},
		gold: {//金色
			r: 233,
			g: 187,
			b: 52
		},
		silver: {//銀色
			r: 192,
			g: 192,
			b: 192
		},
		copper: {//銅色
			r: 136,
			g: 93,
			b: 86
		},
		red: {//紅色
			r: 255,
			g: 0,
			b: 0
		},
		candyApple: {//蘋果糖紅
			r: 230,
			g: 15,
			b: 20
		},
		maroon: {//栗色
			r: 160,
			g: 25,
			b: 25
		},
		redPurple: {//褐色
			r: 128,
			g: 0,
			b: 0
		},
		darkReddishbrown: {//深紅棕色
			r: 130,
			g: 60,
			b: 60
		},
		reddishbrown: {//紅棕色
			r: 180,
			g: 100,
			b: 100
		},
		darkRed: {//暗紅色
			r: 180,
			g: 0,
			b: 50
		},
		skin: {//膚色
			r: 217,
			g: 163,
			b: 139
		},
		coral: {//珊瑚色
			r: 205,
			g: 110,
			b: 110
		},
		pink: {//粉紅色
			r: 250,
			g: 20,
			b: 120
		},
		begoniaRed: {//海棠紅
			r: 220,
			g: 90,
			b: 110
		},
		magenta: {//洋紅色
			r: 200,
			g: 100,
			b: 150
		},
		yellow: {//黄色
			r: 255,
			g: 255,
			b: 0
		},
		midYellow: {//中黄色
			r: 255,
			g: 200,
			b: 20
		},
		ochre: {//土黄色
			r: 200,
			g: 140,
			b: 30
		},
		lightOrange: {//亮橘色
			r: 250,
			g: 170,
			b: 20
		},
		orange: {//橘色
			r: 250,
			g: 100,
			b: 15
		},
		darkYellowGreen: {//暗黃綠色
			r: 128,
			g: 128,
			b: 0
		},
		olive: {//橄欖色
			r: 107,
			g: 157,
			b: 58
		},
		lime: {//青檸檬色
			r: 0,
			g: 255,
			b: 0
		},
		springGreen: {//春綠色
			r: 70,
			g: 195,
			b: 10
		},
		green: {//綠色
			r: 0,
			g: 128,
			b: 0
		},
		persianGreen: {//波斯綠
			r: 85,
			g: 152,
			b: 101
		},
		deepGreen: {//深綠色
			r: 50,
			g: 100,
			b: 50
		},
		turquoise: {//綠松色
			r: 28,
			g: 224,
			b: 210
		},
		aqua: {//水色的
			r: 0,
			g: 255,
			b: 255
		},
		skyBlue: {//天空藍
			r: 40,
			g: 178,
			b: 235
		},
		teal: {//水鴨色
			r: 0,
			g: 128,
			b: 128
		},
		olympicBlue: {//奧林匹斯藍
			r: 63,
			g: 130,
			b: 172
		},
		blue: {//藍色
			r: 0,
			g: 0,
			b: 255
		},
		ultramarineBlue: {//群青色
			r: 15,
			g: 65,
			b: 190
		},
		navyBlue: {//深藍色
			r: 10,
			g: 15,
			b: 185
		},
		grape: {//葡萄藍
			r: 50,
			g: 50,
			b: 175
		},
		fuchsia: {//紫紅色
			r: 255,
			g: 0,
			b: 255
		},
		purple: {//紫色
			r: 128,
			g: 0,
			b: 128
		},
		amethyst: {//紫晶色
			r: 140,
			g: 25,
			b: 155
		},
		darkPurple: {//深紫色
			r: 85,
			g: 25,
			b: 165
		}
	};
	return colorPalette[colorCode];
};

//***********************************************
//畫布Utils擴充
//***********************************************
	
function CanvasUtils() {
	throw new Error("This is a static class");
}

//變色
CanvasUtils.putImageRGB = function(bitmap, r, g, b, width, height, isOriginalColorBlack) {
	if (bitmap._image) {
		let canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(bitmap._image, 0, 0, width, height);
		let ctx = canvas.getContext("2d");
		let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		let px = imageData.data;
		if (!bitmap._colorBak) {
			bitmap._colorBak = [];
			for (let i = 0; i < px.length; i++) {
				bitmap._colorBak.push(px[i]);
			}
		}

		for (let i = 0; i < px.length; i+=4) {
			//粗線條不變色
			if (isOriginalColorBlack) {
				px[i] = bitmap._colorBak[i] + r;
				px[i+1] = bitmap._colorBak[i+1] + g;
				px[i+2] = bitmap._colorBak[i+2] + b;
			} else if ((bitmap._colorBak[i] + bitmap._colorBak[i+1] + bitmap._colorBak[i+2]) > 100) {
				if (!(bitmap._colorBak[i] < 50 && bitmap._colorBak[i+1] < 50 && bitmap._colorBak[i+2] < 50)) {
					px[i] = bitmap._colorBak[i] + r;
					px[i+1] = bitmap._colorBak[i+1] + g;
					px[i+2] = bitmap._colorBak[i+2] + b;
				} else {
					let average = (bitmap._colorBak[i] + bitmap._colorBak[i+1] + bitmap._colorBak[i+2]) / 3;
					let r = ((average - bitmap._colorBak[i]) <= 10 || (average - bitmap._colorBak[i]) >= 10);
					let g = ((average - bitmap._colorBak[i+1]) <= 10 || (average - bitmap._colorBak[i+1]) >= 10);
					let b = ((average - bitmap._colorBak[i+2]) <= 10 || (average - bitmap._colorBak[i+2]) >= 10);
					if (r || g || b) {
						px[i] = bitmap._colorBak[i] + r;
						px[i+1] = bitmap._colorBak[i+1] + g;
						px[i+2] = bitmap._colorBak[i+2] + b;
					}
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);
		bitmap._canvas = canvas;
		//bitmap._image.src = canvas.toDataURL("image/png");
		//bitmap._url = canvas.toDataURL("image/png");
	}
	
	return bitmap;
};

//針對Base64處理的Bitmap元件(原生元件有針對加密的特規處理)

function SunMZ_Bitmap() {
    this.initialize(...arguments);
}

SunMZ_Bitmap.prototype = Object.create(Bitmap.prototype);
SunMZ_Bitmap.prototype.constructor = SunMZ_Bitmap;

SunMZ_Bitmap.load = function(url) {
    const bitmap = Object.create(SunMZ_Bitmap.prototype);
    bitmap.initialize();
    bitmap._url = url;
    bitmap._startLoading();
    return bitmap;
};

SunMZ_Bitmap.snap = function(stage) {
    const width = Graphics.width;
    const height = Graphics.height;
    const bitmap = new Bitmap(width, height);
    const renderTexture = PIXI.RenderTexture.create(width, height);
    if (stage) {
        const renderer = Graphics.app.renderer;
        renderer.render(stage, renderTexture);
        stage.worldTransform.identity();
        const canvas = renderer.extract.canvas(renderTexture);
        bitmap.context.drawImage(canvas, 0, 0);
        canvas.width = 0;
        canvas.height = 0;
    }
    renderTexture.destroy({ destroyBase: true });
    bitmap.baseTexture.update();
    return bitmap;
};

//覆蓋
SunMZ_Bitmap.prototype._startLoading = function() {
	this._image = new Image();
	this._image.onload = this._onLoad.bind(this);
	this._image.onerror = this._onError.bind(this);
	this._destroyCanvas();
	this._loadingState = "loading";
	this._image.src = this._url;
	if (this._image.width > 0) {
		this._image.onload = null;
		this._onLoad();
	}
};

function SunMZ_GeneratorEx() {
	throw new Error("This is a static class");
}

//角色設定擴充 & 防具設定擴充
SunMZ_GeneratorEx.processEx = function() {
	for (var i = 1; i < $dataActors.length; i++) {
		let $actorData = $dataActors[i];
		$actorData.SunMzData = $actorData.SunMzData || {};
		$actorData.SunMzData.equipSync = 0;
		$actorData.SunMzData.picCanvasWidth = 500;
		$actorData.SunMzData.picCanvasHeight = 500;
		$actorData.SunMzData.generatorPicList = [];
		$actorData.SunMzData.isUseGeneratorFG = false;
		$actorData.SunMzData.fgCanvasWidth = 144;
		$actorData.SunMzData.fgCanvasHeight = 144;
		$actorData.SunMzData.generatorFgList = [];
		$actorData.SunMzData.isUseGeneratorTV = false;
		$actorData.SunMzData.tvCanvasWidth = 144;
		$actorData.SunMzData.tvCanvasHeight = 192;
		$actorData.SunMzData.generatorTvList = [];
		$actorData.SunMzData.generatorTvdList = [];
		$actorData.SunMzData.isUseGeneratorSV = false;
		$actorData.SunMzData.svCanvasWidth = 576;
		$actorData.SunMzData.svCanvasHeight = 384;
		$actorData.SunMzData.generatorSvList = [];
		let actorItem = SunMZ_CoreBase.findDataById(SunMZ.GeneratorEx.ActorDataExList, i);
		if (actorItem) {
			$actorData.SunMzData.isUseGeneratorFG = actorItem.IsUseGeneratorFG;
			$actorData.SunMzData.isUseGeneratorTV = actorItem.IsUseGeneratorTV;
			$actorData.SunMzData.isUseGeneratorSV = actorItem.IsUseGeneratorSV;
			$actorData.SunMzData.equipSync = actorItem.equipSync || 0;
			$actorData.SunMzData.picCanvasWidth = Number(actorItem.picWidth) || 500;
			$actorData.SunMzData.picCanvasHeight = Number(actorItem.picHeight) || 500;
			$actorData.SunMzData.fgCanvasWidth = Number(actorItem.fgWidth) || 144;
			$actorData.SunMzData.fgCanvasHeight = Number(actorItem.fgHeight) || 144;
			$actorData.SunMzData.tvCanvasWidth = Number(actorItem.tvWidth) || 144;
			$actorData.SunMzData.tvCanvasHeight = Number(actorItem.tvHeight) || 192;
			$actorData.SunMzData.svCanvasWidth = Number(actorItem.svWidth) || 576;
			$actorData.SunMzData.svCanvasHeight = Number(actorItem.svHeight) || 384;
			$actorData.SunMzData.generatorPicList = actorItem.genPicList || [];
			$actorData.SunMzData.generatorFgList = actorItem.genFgList || [];
			$actorData.SunMzData.generatorTvList = actorItem.genTvList || [];
			$actorData.SunMzData.generatorTvdList = actorItem.genTvdList || [];
			$actorData.SunMzData.generatorSvList = actorItem.genSvList || [];
		}
	}
	
	for (var i = 1; i < $dataWeapons.length; i++) {
		let $weaponData = $dataWeapons[i];
		$weaponData.SunMzData = $weaponData.SunMzData || {};
		$weaponData.SunMzData.actorListWeaponDataList = [];
		$weaponData.SunMzData.actorWeaponDataList = [];
		$weaponData.SunMzData.actorListWeaponSecDataList = [];
		$weaponData.SunMzData.actorWeaponSecDataList = [];
		let weaponItem = SunMZ_CoreBase.findDataById(SunMZ.GeneratorEx.WeaponDataExList, i);
		if (weaponItem) {
			$weaponData.SunMzData.actorListWeaponDataList = weaponItem.actorListWeaponDataList || [];
			$weaponData.SunMzData.actorWeaponDataList = weaponItem.actorWeaponDataList || [];
		}
		
		let weaponItem2 = SunMZ_CoreBase.findDataById(SunMZ.GeneratorEx.WeaponSecDataExList, i);
		if (weaponItem2) {
			$weaponData.SunMzData.actorListWeaponSecDataList = weaponItem2.actorListWeaponDataList || [];
			$weaponData.SunMzData.actorWeaponSecDataList = weaponItem2.actorWeaponDataList || [];
		}
	}
	
	for (var i = 1; i < $dataArmors.length; i++) {
		let $armorData = $dataArmors[i];
		$armorData.SunMzData = $armorData.SunMzData || {};
		$armorData.SunMzData.actorListArmorDataList = [];
		$armorData.SunMzData.actorArmorDataList = [];
		let armorItem = SunMZ_CoreBase.findDataById(SunMZ.GeneratorEx.ArmorDataExList, i);
		if (armorItem) {
			$armorData.SunMzData.actorListArmorDataList = armorItem.actorListArmorDataList || [];
			$armorData.SunMzData.actorArmorDataList = armorItem.actorArmorDataList || [];
		}
	}
	
};

//合併圖片
SunMZ_GeneratorEx.bitmapMerge = function(bitmap, bitmapList, configList, dw, dh) {
	for (var i = 0; i < bitmapList.length; i++) {
		if (configList[i]._fix) {
			bitmap.blt(bitmapList[i], configList[i]._fix_canvasX, configList[i]._fix_canvasY, dw, dh, 0, 0);
		} else {
			bitmap.blt(bitmapList[i], configList[i].x, configList[i].y, dw, dh, 0, 0);
		}
	}
};

//製作B64Data
SunMZ_GeneratorEx.genBitmapBase64Data = function(actor, mode, generatorEx_bitmap_list) {
	let bitmap = null;
	switch (mode) {
		case "PIC":
			bitmap = new Bitmap(actor.sunMzData().picCanvasWidth, actor.sunMzData().picCanvasHeight);
			break;
		case "FG":
			bitmap = new Bitmap(ImageManager.faceWidth, ImageManager.faceHeight);
			break;
		case "TV":
		case "TVD":
			bitmap = new Bitmap(actor.sunMzData().tvCanvasWidth, actor.sunMzData().tvCanvasHeight);
			break;
		case "SV":
			bitmap = new Bitmap(actor.sunMzData().svCanvasWidth, actor.sunMzData().svCanvasHeight);
			break;
	}

	if (SunMZ_GeneratorEx.isReady(generatorEx_bitmap_list)) {
		switch (mode) {
			case "PIC":
				SunMZ_GeneratorEx.bitmapMerge(bitmap, generatorEx_bitmap_list, actor.sunMzData().generatorPicList, actor.sunMzData().picCanvasWidth, actor.sunMzData().picCanvasHeight);
				actor.sunMzData().genPicB64Data = bitmap._canvas.toDataURL();
				break;
			case "FG":
				SunMZ_GeneratorEx.bitmapMerge(bitmap, generatorEx_bitmap_list, actor.sunMzData().generatorFgList, actor.sunMzData().fgCanvasWidth, actor.sunMzData().fgCanvasHeight);
				actor.sunMzData().genFgB64Data = bitmap._canvas.toDataURL();
				break;
			case "TV":
				SunMZ_GeneratorEx.bitmapMerge(bitmap, generatorEx_bitmap_list, actor.sunMzData().generatorTvList, actor.sunMzData().tvCanvasWidth, actor.sunMzData().tvCanvasHeight);
				actor.sunMzData().genTvB64Data = bitmap._canvas.toDataURL();
				break;
			case "TVD":
				SunMZ_GeneratorEx.bitmapMerge(bitmap, generatorEx_bitmap_list, actor.sunMzData().generatorTvdList, actor.sunMzData().tvCanvasWidth, actor.sunMzData().tvCanvasHeight);
				actor.sunMzData().genTvdB64Data = bitmap._canvas.toDataURL();
				break;
			case "SV":
				SunMZ_GeneratorEx.bitmapMerge(bitmap, generatorEx_bitmap_list, actor.sunMzData().generatorSvList, actor.sunMzData().svCanvasWidth, actor.sunMzData().svCanvasHeight);
				actor.sunMzData().genSvB64Data = bitmap._canvas.toDataURL();
				break;
		}
	}
	return bitmap;
};

//確認圖片讀取狀況
SunMZ_GeneratorEx.isReady = function(bitmapList) {
	let isReady = true;
	for (var i = 0; i < bitmapList.length; i++) {
		if (!bitmapList[i].isReady()) {
			return false;
		}
	}
	return true;
};

SunMZ_GeneratorEx.findDataByPartType = (list, partType) => {
	let item = list.find(item => item.cd == partType);
	if (item && SunMZ_CoreBase.isNotBlank(item)) {
		return item;
	}
	return false;
};

SunMZ_GeneratorEx.findDataByActorIdList = (list, actorId) => {
	let item = list.find(item => item.actorIdList.includes(actorId));
	if (item && SunMZ_CoreBase.isNotBlank(item)) {
		return item;
	}
	return false;
};

SunMZ_GeneratorEx.findActorsBySyncActorId = (actorId) => {
	const allMembers = $gameParty.allMembers();
	if (actorId > 0) {
		return allMembers.filter(actor => actor.sunMzData().equipSync === actorId);
	}
	return [];
};

SunMZ_GeneratorEx.changeActorPartColor = function(generatorList, cd, orgColor, newColor) {
	for (let i = 0; i < generatorList.length; i++) {
		let generatorData = generatorList[i];
		if (generatorData.cd == cd) {
			generatorData.orgColor = orgColor;
			generatorData.newColor = newColor;
		}
	}
};

SunMZ_GeneratorEx.collectPartInfor = function(actor, type, mode, isArr, dataList, equipDataFilter) {
	if (!SunMZ_CoreBase.isNotBlank(actor)) {
		return equipDataFilter;
	}
	
	if (!SunMZ_CoreBase.isArrayNotEmpty(dataList)) {
		return equipDataFilter;
	}
	
	if ("variable" === type) {
		if (isArr) {
			let actorListVariableData = SunMZ_GeneratorEx.findDataByActorIdList(dataList, actor.actorId());
			if (!actorListVariableData) {
				return equipDataFilter;
			}
			
			switch (mode) {
				case "PIC":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListVariableData.genPicList)) {
						equipDataFilter.push(...actorListVariableData.genPicList);
					}
					break;
				case "FG":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListVariableData.genFgList)) {
						equipDataFilter.push(...actorListVariableData.genFgList);
					}
					break;
				case "TV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListVariableData.genTvList)) {
						equipDataFilter.push(...actorListVariableData.genTvList);
					}
					break;
				case "TVD":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListVariableData.genTvdList)) {
						equipDataFilter.push(...actorListVariableData.genTvdList);
					}
					break;
				case "SV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListVariableData.genSvList)) {
						equipDataFilter.push(...actorListVariableData.genSvList);
					}
					break;
			}
		} else {
			let actorVariableData = SunMZ_CoreBase.findDataById(dataList, actor.actorId());
			if (!actorVariableData) {
				return equipDataFilter;
			}
			
			switch (mode) {
				case "PIC":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorVariableData.genPicList)) {
						equipDataFilter.push(...actorVariableData.genPicList);
					}
					break;
				case "FG":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorVariableData.genFgList)) {
						equipDataFilter.push(...actorVariableData.genFgList);
					}
					break;
				case "TV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorVariableData.genTvList)) {
						equipDataFilter.push(...actorVariableData.genTvList);
					}
					break;
				case "TVD":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorVariableData.genTvdList)) {
						equipDataFilter.push(...actorVariableData.genTvdList);
					}
					break;
				case "SV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorVariableData.genSvList)) {
						equipDataFilter.push(...actorVariableData.genSvList);
					}
					break;
			}
		}
	}
	
	if ("weapon" === type) {
		if (isArr) {
			let actorListWeaponData = SunMZ_GeneratorEx.findDataByActorIdList(dataList, actor.actorId());
			if (!actorListWeaponData) {
				return equipDataFilter;
			}
			
			switch (mode) {
				case "PIC":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListWeaponData.genPicList)) {
						equipDataFilter.push(...actorListWeaponData.genPicList);
					}
					break;
				case "FG":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListWeaponData.genFgList)) {
						equipDataFilter.push(...actorListWeaponData.genFgList);
					}
					break;
				case "TV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListWeaponData.genTvList)) {
						equipDataFilter.push(...actorListWeaponData.genTvList);
					}
					break;
				case "TVD":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListWeaponData.genTvdList)) {
						equipDataFilter.push(...actorListWeaponData.genTvdList);
					}
					break;
				case "SV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListWeaponData.genSvList)) {
						equipDataFilter.push(...actorListWeaponData.genSvList);
					}
					break;
			}
		} else {
			let actorWeaponData = SunMZ_CoreBase.findDataById(dataList, actor.actorId());
			if (!actorWeaponData) {
				return equipDataFilter;
			}
			
			switch (mode) {
				case "PIC":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorWeaponData.genPicList)) {
						equipDataFilter.push(...actorWeaponData.genPicList);
					}
					break;
				case "FG":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorWeaponData.genFgList)) {
						equipDataFilter.push(...actorWeaponData.genFgList);
					}
					break;
				case "TV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorWeaponData.genTvList)) {
						equipDataFilter.push(...actorWeaponData.genTvList);
					}
					break;
				case "TVD":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorWeaponData.genTvdList)) {
						equipDataFilter.push(...actorWeaponData.genTvdList);
					}
					break;
				case "SV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorWeaponData.genSvList)) {
						equipDataFilter.push(...actorWeaponData.genSvList);
					}
					break;
			}
		}
	}
	
	if ("armor" === type) {
		if (isArr) {
			let actorListArmorData = SunMZ_GeneratorEx.findDataByActorIdList(dataList, actor.actorId());
			if (!actorListArmorData) {
				return equipDataFilter;
			}
			
			switch (mode) {
				case "PIC":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListArmorData.genPicList)) {
						equipDataFilter.push(...actorListArmorData.genPicList);
					}
					break;
				case "FG":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListArmorData.genFgList)) {
						equipDataFilter.push(...actorListArmorData.genFgList);
					}
					break;
				case "TV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListArmorData.genTvList)) {
						equipDataFilter.push(...actorListArmorData.genTvList);
					}
					break;
				case "TVD":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListArmorData.genTvdList)) {
						equipDataFilter.push(...actorListArmorData.genTvdList);
					}
					break;
				case "SV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorListArmorData.genSvList)) {
						equipDataFilter.push(...actorListArmorData.genSvList);
					}
					break;
			}
		} else {
			let actorArmorData = SunMZ_CoreBase.findDataById(dataList, actor.actorId());
			if (!actorArmorData) {
				return equipDataFilter;
			}
			
			switch (mode) {
				case "PIC":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorArmorData.genPicList)) {
						equipDataFilter.push(...actorArmorData.genPicList);
					}
					break;
				case "FG":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorArmorData.genFgList)) {
						equipDataFilter.push(...actorArmorData.genFgList);
					}
					break;
				case "TV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorArmorData.genTvList)) {
						equipDataFilter.push(...actorArmorData.genTvList);
					}
					break;
				case "TVD":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorArmorData.genTvdList)) {
						equipDataFilter.push(...actorArmorData.genTvdList);
					}
					break;
				case "SV":
					if (SunMZ_CoreBase.isArrayNotEmpty(actorArmorData.genSvList)) {
						equipDataFilter.push(...actorArmorData.genSvList);
					}
					break;
			}
		}
	}
	
	return equipDataFilter;
};

SunMZ_GeneratorEx.genCollectPartList = function(actor, mode) {
	let equipDataFilter = [];
	if (!SunMZ_CoreBase.isNotBlank(actor)) {
		return equipDataFilter;
	}
	const weapons = actor.syncWeapons();
	const weapon1Id = weapons[0] ? weapons[0].id : 0;
	const weapon2Id = weapons[1] ? weapons[1].id : 0;
	for (const variableData of SunMZ.GeneratorEx.VariableDataExList) {
		let variableCode = $gameVariables.value(variableData.id);
		let variableCodeData = SunMZ_CoreBase.findDataByCode(variableData.varCodeDataList, variableCode);
		if (variableCodeData) {
			equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "variable", mode, false, variableCodeData.actorVarDataList, equipDataFilter);
			equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "variable", mode, true, variableCodeData.actorListVarDataList, equipDataFilter);
		}
	}
	
	if (weapon1Id > 0) {
		equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "weapon", mode, false, weapons[0].SunMzData.actorWeaponDataList, equipDataFilter);
		equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "weapon", mode, true, weapons[0].SunMzData.actorListWeaponDataList, equipDataFilter);
	}
	
	if (weapon2Id > 0) {
		equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "weapon", mode, false, weapons[1].SunMzData.actorWeaponSecDataList, equipDataFilter);
		equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "weapon", mode, true, weapons[1].SunMzData.actorListWeaponSecDataList, equipDataFilter);
	}
	
	for (const armor of actor.syncArmors().values()) {
		equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "armor", mode, false, armor.SunMzData.actorArmorDataList, equipDataFilter);
		equipDataFilter = SunMZ_GeneratorEx.collectPartInfor(actor, "armor", mode, true, armor.SunMzData.actorListArmorDataList, equipDataFilter);
	}
	return equipDataFilter;
};

SunMZ_GeneratorEx.genB64 = function(actor, mode) {
	if (!SunMZ_CoreBase.isNotBlank(actor)) {
		return;
	}
	let generatorEx_bitmap_list = [];
	let equipDataFilter = SunMZ_GeneratorEx.genCollectPartList(actor, mode);
	switch (mode) {
		case "PIC":
			if (actor.sunMzData().isGeneratorPicChange) {
				return;
			}
			actor.sunMzData().isGeneratorPicChange = true;
			let generatorPicListLen = actor.sunMzData().generatorPicList.length;
			for (var i = 0; i < actor.sunMzData().generatorPicList.length; i++) {
				let generatorPic = actor.sunMzData().generatorPicList[i];
				let picImage = generatorPic.img;
				let picNewColor = generatorPic.newColor;
				let picOriginalColor = generatorPic.orgColor;
				let actorArmorItem = SunMZ_GeneratorEx.findDataByPartType(equipDataFilter, generatorPic.cd);
				if (actorArmorItem) {
					actor.sunMzData().generatorPicList[i]._fix = true;
					actor.sunMzData().generatorPicList[i]._fix_canvasX = actorArmorItem.x;
					actor.sunMzData().generatorPicList[i]._fix_canvasY = actorArmorItem.y;
					picImage = actorArmorItem.img;
					if (!actorArmorItem.IsInheritColors) {
						picNewColor = actorArmorItem.newColor;
						picOriginalColor = actorArmorItem.orgColor;
					}
				} else {
					actor.sunMzData().generatorPicList[i]._fix = false;
				}
				let generatorBitmap = ImageManager.loadGeneratorPic(picImage, picNewColor, picOriginalColor);
				if (picNewColor && picNewColor !== "none") {
					let fun = function() {
						let originalColorRgb = ColorUtils.getColorRgb(picOriginalColor);
						let newColorRgb = ColorUtils.getColorRgb(picNewColor);
						let isOriginalColorBlack = (picOriginalColor === "black");
						CanvasUtils.putImageRGB(generatorBitmap, newColorRgb.r - originalColorRgb.r, newColorRgb.g - originalColorRgb.g, newColorRgb.b - originalColorRgb.b, generatorBitmap.width, generatorBitmap.height, isOriginalColorBlack);
					};
					generatorBitmap.addLoadListener(fun);
				} else {
					let fun = function() {
						CanvasUtils.putImageRGB(generatorBitmap, 0, 0, 0, generatorBitmap.width, generatorBitmap.height, false);
					};
					generatorBitmap.addLoadListener(fun);
				}
				generatorEx_bitmap_list.push(generatorBitmap);
				let fun2 = function() {
					if ((SunMZ.GeneratorEx.PicMergeType == "WaitComple" && generatorEx_bitmap_list.length == generatorPicListLen) ||
						SunMZ.GeneratorEx.PicMergeType == "RealTimeDisplay") {
						SunMZ_GeneratorEx.genBitmapBase64Data(actor, mode, generatorEx_bitmap_list);
					}
				}
				generatorBitmap.addLoadListener(fun2);
			}
			break;
		case "FG":
			if (actor.sunMzData().isGeneratorFgChange) {
				return;
			}
			actor.sunMzData().isGeneratorFgChange = true;
			let generatorFgListLen = actor.sunMzData().generatorFgList.length;
			for (var i = 0; i < actor.sunMzData().generatorFgList.length; i++) {
				let generatorFg = actor.sunMzData().generatorFgList[i];
				let fgImage = generatorFg.img;
				let fgNewColor = generatorFg.newColor;
				let fgOriginalColor = generatorFg.orgColor;
				let actorArmorItem = SunMZ_GeneratorEx.findDataByPartType(equipDataFilter, generatorFg.cd);
				if (actorArmorItem) {
					actor.sunMzData().generatorFgList[i]._fix = true;
					actor.sunMzData().generatorFgList[i]._fix_canvasX = actorArmorItem.x;
					actor.sunMzData().generatorFgList[i]._fix_canvasY = actorArmorItem.y;
					fgImage = actorArmorItem.img;
					if (!actorArmorItem.IsInheritColors) {
						fgNewColor = actorArmorItem.newColor;
						fgOriginalColor = actorArmorItem.orgColor;
					}
				} else {
					actor.sunMzData().generatorFgList[i]._fix = false;
				}
				let generatorBitmap = ImageManager.loadGeneratorFg(fgImage, fgNewColor, fgOriginalColor);
				if (fgNewColor && fgNewColor !== "none") {
					let fun = function() {
						let originalColorRgb = ColorUtils.getColorRgb(fgOriginalColor);
						let newColorRgb = ColorUtils.getColorRgb(fgNewColor);
						let isOriginalColorBlack = (fgOriginalColor === "black");
						CanvasUtils.putImageRGB(generatorBitmap, newColorRgb.r - originalColorRgb.r, newColorRgb.g - originalColorRgb.g, newColorRgb.b - originalColorRgb.b, generatorBitmap.width, generatorBitmap.height, isOriginalColorBlack);
					};
					generatorBitmap.addLoadListener(fun);
				} else {
					let fun = function() {
						CanvasUtils.putImageRGB(generatorBitmap, 0, 0, 0, generatorBitmap.width, generatorBitmap.height, false);
					};
					generatorBitmap.addLoadListener(fun);
				}
				generatorEx_bitmap_list.push(generatorBitmap);
				let fun2 = function() {
					if ((SunMZ.GeneratorEx.FgMergeType == "WaitComple" && generatorEx_bitmap_list.length == generatorFgListLen) ||
						SunMZ.GeneratorEx.FgMergeType == "RealTimeDisplay") {
						SunMZ_GeneratorEx.genBitmapBase64Data(actor, mode, generatorEx_bitmap_list);
					}
				}
				generatorBitmap.addLoadListener(fun2);
			}
			break;
		case "TV":
			if (actor.sunMzData().isGeneratorTvChange) {
				return;
			}
			actor.sunMzData().isGeneratorTvChange = true;
			let generatorTvListLen = actor.sunMzData().generatorTvList.length;
			for (var i = 0; i < actor.sunMzData().generatorTvList.length; i++) {
				let generatorTv = actor.sunMzData().generatorTvList[i];
				let tvImage = generatorTv.img;
				let tvNewColor = generatorTv.newColor;
				let tvOriginalColor = generatorTv.orgColor;
				let actorArmorItem = SunMZ_GeneratorEx.findDataByPartType(equipDataFilter, generatorTv.cd);
				if (actorArmorItem) {
					actor.sunMzData().generatorTvList[i]._fix = true;
					actor.sunMzData().generatorTvList[i]._fix_canvasX = actorArmorItem.x;
					actor.sunMzData().generatorTvList[i]._fix_canvasY = actorArmorItem.y;
					tvImage = actorArmorItem.img;
					if (!actorArmorItem.IsInheritColors) {
						tvNewColor = actorArmorItem.newColor;
						tvOriginalColor = actorArmorItem.orgColor;
					}
				} else {
					actor.sunMzData().generatorTvList[i]._fix = false;
				}
				let generatorBitmap = ImageManager.loadGeneratorTv(tvImage, tvNewColor, tvOriginalColor);
				if (tvNewColor && tvNewColor !== "none") {
					let fun = function() {
						let originalColorRgb = ColorUtils.getColorRgb(tvOriginalColor);
						let newColorRgb = ColorUtils.getColorRgb(tvNewColor);
						let isOriginalColorBlack = (tvOriginalColor === "black");
						CanvasUtils.putImageRGB(generatorBitmap, newColorRgb.r - originalColorRgb.r, newColorRgb.g - originalColorRgb.g, newColorRgb.b - originalColorRgb.b, generatorBitmap.width, generatorBitmap.height, isOriginalColorBlack);
					};
					generatorBitmap.addLoadListener(fun);
				} else {
					let fun = function() {
						CanvasUtils.putImageRGB(generatorBitmap, 0, 0, 0, generatorBitmap.width, generatorBitmap.height, false);
					};
					generatorBitmap.addLoadListener(fun);
				}
				generatorEx_bitmap_list.push(generatorBitmap);
				let fun2 = function() {
					if ((SunMZ.GeneratorEx.TvMergeType == "WaitComple" && generatorEx_bitmap_list.length == generatorTvListLen) ||
						SunMZ.GeneratorEx.TvMergeType == "RealTimeDisplay") {
						SunMZ_GeneratorEx.genBitmapBase64Data(actor, mode, generatorEx_bitmap_list);
					}
				}
				generatorBitmap.addLoadListener(fun2);
			}
			break;
		case "TVD":
			if (actor.sunMzData().isGeneratorTvdChange) {
				return;
			}
			actor.sunMzData().isGeneratorTvdChange = true;
			let generatorTvdListLen = actor.sunMzData().generatorTvdList.length;
			for (var i = 0; i < actor.sunMzData().generatorTvdList.length; i++) {
				let generatorTvd = actor.sunMzData().generatorTvdList[i];
				let tvdImage = generatorTvd.img;
				let tvdNewColor = generatorTvd.newColor;
				let tvdOriginalColor = generatorTvd.orgColor;
				let actorArmorItem = SunMZ_GeneratorEx.findDataByPartType(equipDataFilter, generatorTvd.cd);
				if (actorArmorItem) {
					actor.sunMzData().generatorTvdList[i]._fix = true;
					actor.sunMzData().generatorTvdList[i]._fix_canvasX = actorArmorItem.x;
					actor.sunMzData().generatorTvdList[i]._fix_canvasY = actorArmorItem.y;
					tvdImage = actorArmorItem.img;
					if (!actorArmorItem.IsInheritColors) {
						tvdNewColor = actorArmorItem.newColor;
						tvdOriginalColor = actorArmorItem.orgColor;
					}
				} else {
					actor.sunMzData().generatorTvdList[i]._fix = false;
				}
				let generatorBitmap = ImageManager.loadGeneratorTv(tvdImage, tvdNewColor, tvdOriginalColor);
				if (tvdNewColor && tvdNewColor !== "none") {
					let fun = function() {
						let originalColorRgb = ColorUtils.getColorRgb(tvdOriginalColor);
						let newColorRgb = ColorUtils.getColorRgb(tvdNewColor);
						let isOriginalColorBlack = (tvdOriginalColor === "black");
						CanvasUtils.putImageRGB(generatorBitmap, newColorRgb.r - originalColorRgb.r, newColorRgb.g - originalColorRgb.g, newColorRgb.b - originalColorRgb.b, generatorBitmap.width, generatorBitmap.height, isOriginalColorBlack);
					};
					generatorBitmap.addLoadListener(fun);
				} else {
					let fun = function() {
						CanvasUtils.putImageRGB(generatorBitmap, 0, 0, 0, generatorBitmap.width, generatorBitmap.height, false);
					};
					generatorBitmap.addLoadListener(fun);
				}
				generatorEx_bitmap_list.push(generatorBitmap);
				let fun2 = function() {
					if ((SunMZ.GeneratorEx.TvdMergeType == "WaitComple" && generatorEx_bitmap_list.length == generatorTvdListLen) || 
						SunMZ.GeneratorEx.TvdMergeType == "RealTimeDisplay") {
						SunMZ_GeneratorEx.genBitmapBase64Data(actor, mode, generatorEx_bitmap_list);
					}
				}
				generatorBitmap.addLoadListener(fun2);
			}
			break;
		case "SV":
			if (actor.sunMzData().isGeneratorSvChange) {
				return;
			}
			actor.sunMzData().isGeneratorSvChange = true;
			let generatorSvListLen = actor.sunMzData().generatorSvList.length;
			for (var i = 0; i < actor.sunMzData().generatorSvList.length; i++) {
				let generatorSv = actor.sunMzData().generatorSvList[i];
				let svImage = generatorSv.img;
				let svNewColor = generatorSv.newColor;
				let svOriginalColor = generatorSv.orgColor;
				let actorArmorItem = SunMZ_GeneratorEx.findDataByPartType(equipDataFilter, generatorSv.cd);
				if (actorArmorItem) {
					actor.sunMzData().generatorSvList[i]._fix = true;
					actor.sunMzData().generatorSvList[i]._fix_canvasX = actorArmorItem.x;
					actor.sunMzData().generatorSvList[i]._fix_canvasY = actorArmorItem.y;
					svImage = actorArmorItem.img;
					if (!actorArmorItem.IsInheritColors) {
						svNewColor = actorArmorItem.newColor;
						svOriginalColor = actorArmorItem.orgColor;
					}
				} else {
					actor.sunMzData().generatorSvList[i]._fix = false;
				}
				let generatorBitmap = ImageManager.loadGeneratorSv(svImage, svNewColor, svOriginalColor);
				if (svNewColor && svNewColor !== "none") {
					let fun = function() {
						let originalColorRgb = ColorUtils.getColorRgb(svOriginalColor);
						let newColorRgb = ColorUtils.getColorRgb(svNewColor);
						let isOriginalColorBlack = (svOriginalColor === "black");
						CanvasUtils.putImageRGB(generatorBitmap, newColorRgb.r - originalColorRgb.r, newColorRgb.g - originalColorRgb.g, newColorRgb.b - originalColorRgb.b, generatorBitmap.width, generatorBitmap.height, isOriginalColorBlack);
					};
					generatorBitmap.addLoadListener(fun);
				} else {
					let fun = function() {
						CanvasUtils.putImageRGB(generatorBitmap, 0, 0, 0, generatorBitmap.width, generatorBitmap.height, false);
					};
					generatorBitmap.addLoadListener(fun);
				}
				generatorEx_bitmap_list.push(generatorBitmap);
				let fun2 = function() {
					if ((SunMZ.GeneratorEx.SvMergeType == "WaitComple" && generatorEx_bitmap_list.length == generatorSvListLen) || 
						SunMZ.GeneratorEx.SvMergeType == "RealTimeDisplay") {
						SunMZ_GeneratorEx.genBitmapBase64Data(actor, mode, generatorEx_bitmap_list);
					}
				}
				generatorBitmap.addLoadListener(fun2);
			}
			break;
	}
};


//-----------------------------------------------------------------------------

(() => {
	
	//開關紙娃娃
	PluginManagerEx.registerCommand(document.currentScript, 'switchGenerator', function(args) {
		const isOpen = args.isOpen;
		for (const actorId of args.actorIds) {
			const $actor = $gameActors.actor(actorId);
			switch (args.mode) {
				case "TV":
					$actor.sunMzData().isUseGeneratorTV = isOpen;
					break;
				case "SV":
					$actor.sunMzData().isUseGeneratorSV = isOpen;
					break;
				case "FG":
					$actor.sunMzData().isUseGeneratorFG = isOpen;
					break;
			}
			
		}
	});
	
	//強制檢查事件替身狀態
	PluginManagerEx.registerCommand(document.currentScript, 'checkSubstitute', function(args) {
		for (const eventId of args.eventIds) {
			$gameTemp.needCheckSubstituteEvent(eventId);
		}
	});
	
	//強制檢查紙娃娃狀態
	PluginManagerEx.registerCommand(document.currentScript, 'checkGenerator', function(args) {
		for (const actorId of args.actorIds) {
			const $actor = $gameActors.actor(actorId);
			
			$actor.sunMzData().isGeneratorPicChange = false;
			$actor.sunMzData().isGeneratorFgChange = false;
			$actor.sunMzData().isGeneratorTvChange = false;
			$actor.sunMzData().isGeneratorTvdChange = false;
			$actor.sunMzData().isGeneratorSvChange = false;
			
			$actor.sunMzData().genPicB64Data = "";
			$actor.sunMzData().genFgB64Data = "";
			$actor.sunMzData().genTvB64Data = "";
			$actor.sunMzData().genTvdB64Data = "";
			$actor.sunMzData().genSvB64Data = "";
		}
	});
	
	//注入TV模組
	PluginManagerEx.registerCommand(document.currentScript, 'setTvMode', function(args) {
		for (const actorId of args.actorIds) {
			const $actor = $gameActors.actor(actorId);
			$actor.sunMzData().mode = args.mode;
			$actor.sunMzData().svMotion = args.svMotion;
			$actor.sunMzData().isHorizFlip = args.isHorizontalFlip;
		}
	});
	
	//注入Face模組至對話框
	PluginManagerEx.registerCommand(document.currentScript, 'setMessageFace', function(args) {
		const $actor = $gameActors.actor(args.actorId);
		$gameMessage.setActor($actor);
	});
	
	//清除Face模組至對話框
	PluginManagerEx.registerCommand(document.currentScript, 'cleanMessageFace', function(args) {
		const $actor = $gameActors.actor(args.actorId);
		$gameMessage.clearActor();
	});
	
	//注入立繪
	PluginManagerEx.registerCommand(document.currentScript, 'setupActorPicture', function(args) {
	    $gameScreen.setupGenActorPicture(args.pictureId, args.actorId, args.origin, args.x, args.y, args.scaleX, args.scaleY, args.opacity, args.blendMode);
	});
	
	//改變角色裝備判定同步對象
	PluginManagerEx.registerCommand(document.currentScript, 'changeActorSyncObject', function(args) {
		const syncActorId = args.syncActorId;
		for (const actorId of args.actorIds) {
			const $actor = $gameActors.actor(actorId);
			$actor.sunMzData().equipSync = syncActorId;
			
			$actor.sunMzData().isGeneratorPicChange = false;
			$actor.sunMzData().isGeneratorFgChange = false;
			$actor.sunMzData().isGeneratorTvChange = false;
			$actor.sunMzData().isGeneratorTvdChange = false;
			$actor.sunMzData().isGeneratorSvChange = false;
			
			$actor.sunMzData().genPicB64Data = "";
			$actor.sunMzData().genFgB64Data = "";
			$actor.sunMzData().genTvB64Data = "";
			$actor.sunMzData().genTvdB64Data = "";
			$actor.sunMzData().genSvB64Data = "";
		}
	});
	
	//改變角色區塊定義顏色
	PluginManagerEx.registerCommand(document.currentScript, 'changeActorPartColor', function(args) {
		const cds = args.cds;
		const orgColor = args.orgColor;
		const newColor = args.newColor;
		for (const actorId of args.actorIds) {
			const $actor = $gameActors.actor(actorId);
			for (const cd of cds) {
				SunMZ_GeneratorEx.changeActorPartColor($actor.sunMzData().generatorPicList, cd, orgColor, newColor);
				SunMZ_GeneratorEx.changeActorPartColor($actor.sunMzData().generatorFgList, cd, orgColor, newColor);
				SunMZ_GeneratorEx.changeActorPartColor($actor.sunMzData().generatorTvList, cd, orgColor, newColor);
				SunMZ_GeneratorEx.changeActorPartColor($actor.sunMzData().generatorTvdList, cd, orgColor, newColor);
				SunMZ_GeneratorEx.changeActorPartColor($actor.sunMzData().generatorSvList, cd, orgColor, newColor);
			}
			
			$actor.sunMzData().isGeneratorPicChange = false;
			$actor.sunMzData().isGeneratorFgChange = false;
			$actor.sunMzData().isGeneratorTvChange = false;
			$actor.sunMzData().isGeneratorTvdChange = false;
			$actor.sunMzData().isGeneratorSvChange = false;
			
			$actor.sunMzData().genPicB64Data = "";
			$actor.sunMzData().genFgB64Data = "";
			$actor.sunMzData().genTvB64Data = "";
			$actor.sunMzData().genTvdB64Data = "";
			$actor.sunMzData().genSvB64Data = "";
		}
	});
	
	//重新製作Base64
	PluginManagerEx.registerCommand(document.currentScript, 'generatorB64', function(args) {
		for (const actorId of args.actorIds) {
			const $actor = $gameActors.actor(actorId);
			switch (args.mode) {
				case "PIC":
					$actor.sunMzData().isGeneratorPicChange = false;
					$actor.sunMzData().genPicB64Data = "";
					break;
				case "FG":
					$actor.sunMzData().isGeneratorFgChange = false;
					$actor.sunMzData().genFgB64Data = "";
					break;
				case "TV":
					$actor.sunMzData().isGeneratorTvChange = false;
					$actor.sunMzData().genTvB64Data = "";
					break;
				case "TVD":
					$actor.sunMzData().isGeneratorTvdChange = false;
					$actor.sunMzData().genTvdB64Data = "";
					break;
				case "SV":
					$actor.sunMzData().isGeneratorSvChange = false;
					$actor.sunMzData().genSvB64Data = "";
					break;
			}
		}
	});
	
	//NEW
	Sprite.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	//NEW
	Window.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	//NEW
	Game_CharacterBase.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	//NEW
	Game_Event.prototype.loadSubstituteParams = function () {
		this.sunMzData().substituteId = 0;
		this.sunMzData().type = "";
		this.sunMzData().mode = "tv";
		this.sunMzData().svMotion = "none";
		this.sunMzData().isHorizFlip = false;

		if (this.page() && this.list()) {
			let list = this.list();
			for (let i = 0; i < list.length; i++) {
				let command = list[i];
				let re1 = /<(substitute)(:)([0-9]*)(:)([a-zA-Z0-9_-]*)>/g;
				let re2 = /<(substitute)(:)([0-9]*)(:)([a-zA-Z0-9_-]*)(:)([a-zA-Z0-9_-]*)(:)([Y,N])>/g;
				if (command && command.code == 108) {
					if (command.parameters[0].match(re2)) {
						let match2 = re2.exec(command.parameters[0]);
						this.sunMzData().substituteId = match2[3];
						this.sunMzData().mode = match2[5];
						this.sunMzData().svMotion = match2[7];
						this.sunMzData().isHorizFlip = ("Y" == match2[9]);
					} else if (command.parameters[0].match(re1)) {
						let match1 = re1.exec(command.parameters[0]);
						this.sunMzData().substituteId = match1[3];
						this.sunMzData().mode = match1[5];
					}
				}
			}
		}
	};
	
	const alias_SunMZ_GeneratorEx_Game_Event_setupPage = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function() {
		alias_SunMZ_GeneratorEx_Game_Event_setupPage.call(this);
		if (this._pageIndex >= 0) {
			this.loadSubstituteParams();
		}
	};
	
	//角色擴充設定匯入$dataActors
	const alias_SunMZ_GeneratorEx_Game_Actors_initialize = Game_Actors.prototype.initialize;
	Game_Actors.prototype.initialize = function() {
		alias_SunMZ_GeneratorEx_Game_Actors_initialize.call(this);
		SunMZ_GeneratorEx.processEx();
	};
	
	//NEW
	Game_BattlerBase.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	//NEW
	Game_Actor.prototype.syncWeapons = function() {
		if (this.sunMzData().equipSync > 0) {
			let syncActor = $gameActors.actor(this.sunMzData().equipSync);
			return syncActor.weapons();
		}
		return this.weapons();
	};
	
	//NEW
	Game_Actor.prototype.syncArmors = function() {
		if (this.sunMzData().equipSync > 0) {
			let syncActor = $gameActors.actor(this.sunMzData().equipSync);
			return syncActor.armors();
		}
		return this.armors();
	};
	
	//NEW
	Game_Actor.prototype.getPicB64Data = function() {
		if (!SunMZ_CoreBase.isNotBlank(this.sunMzData().genPicB64Data) && 
			!this.sunMzData().isGeneratorPicChange) {
			SunMZ_GeneratorEx.genB64(this, "PIC");
		}
		return this.sunMzData().genPicB64Data;
	};
	
	//NEW
	Game_Actor.prototype.getFgB64Data = function() {
		if (this.sunMzData().isUseGeneratorFG && 
			(!SunMZ_CoreBase.isNotBlank(this.sunMzData().genFgB64Data) && !this.sunMzData().isGeneratorFgChange)) {
			SunMZ_GeneratorEx.genB64(this, "FG");
		}
		return this.sunMzData().genFgB64Data;
	};
	
	//NEW
	Game_Actor.prototype.getTvB64Data = function() {
		if (this.sunMzData().isUseGeneratorTV && 
			(!SunMZ_CoreBase.isNotBlank(this.sunMzData().genTvB64Data) && !this.sunMzData().isGeneratorTvChange)) {
			SunMZ_GeneratorEx.genB64(this, "TV");
		}
		return this.sunMzData().genTvB64Data;
	};
	
	//NEW
	Game_Actor.prototype.getTvdB64Data = function() {
		if (this.sunMzData().isUseGeneratorTV && 
			(!SunMZ_CoreBase.isNotBlank(this.sunMzData().genTvdB64Data) && !this.sunMzData().isGeneratorTvdChange)) {
			SunMZ_GeneratorEx.genB64(this, "TVD");
		}
		return this.sunMzData().genTvdB64Data;
	};
	
	//NEW
	Game_Actor.prototype.getSvB64Data = function() {
		if (this.sunMzData().isUseGeneratorSV && 
			(!SunMZ_CoreBase.isNotBlank(this.sunMzData().genSvB64Data) && !this.sunMzData().isGeneratorSvChange)) {
			SunMZ_GeneratorEx.genB64(this, "SV");
		}
		return this.sunMzData().genSvB64Data;
	};
	
	//NEW 修復存檔機制
	Game_Actor.prototype.restGenData = function() {
		
		if (SunMZ_CoreBase.isArrayNotEmpty(this.sunMzData().generatorPicList) && 
			JSON.stringify(this.sunMzData().generatorPicList).indexOf("@") > 0) {
			let newGeneratorPicList = [];
			for (var i = 0; i < this.sunMzData().generatorPicList.length; i++) {
				if (!SunMZ_CoreBase.isNotBlank(this.sunMzData().generatorPicList[i].cd)) {
					newGeneratorPicList.push(this.sunMzData().generatorPicList[i]._parameter);
				} else {
					newGeneratorPicList.push(this.sunMzData().generatorPicList[i]);
				}
			}
			this.sunMzData().generatorPicList = newGeneratorPicList;
		}
		
		if (SunMZ_CoreBase.isArrayNotEmpty(this.sunMzData().generatorFgList) && 
			JSON.stringify(this.sunMzData().generatorFgList).indexOf("@") > 0) {
			let newGeneratorFgList = [];
			for (var i = 0; i < this.sunMzData().generatorFgList.length; i++) {
				if (!SunMZ_CoreBase.isNotBlank(this.sunMzData().generatorFgList[i].cd)) {
					newGeneratorFgList.push(this.sunMzData().generatorFgList[i]._parameter);
				} else {
					newGeneratorFgList.push(this.sunMzData().generatorFgList[i]);
				}
			}
			this.sunMzData().generatorFgList = newGeneratorFgList;
		}

		if (SunMZ_CoreBase.isArrayNotEmpty(this.sunMzData().generatorTvList) && 
			JSON.stringify(this.sunMzData().generatorTvList).indexOf("@") > 0) {
			let newGeneratorTvList = [];
			for (var i = 0; i < this.sunMzData().generatorTvList.length; i++) {
				if (!SunMZ_CoreBase.isNotBlank(this.sunMzData().generatorTvList[i].cd)) {
					newGeneratorTvList.push(this.sunMzData().generatorTvList[i]._parameter);
				} else {
					newGeneratorTvList.push(this.sunMzData().generatorTvList[i]);
				}
			}
			this.sunMzData().generatorTvList = newGeneratorTvList;
		}
		
		if (SunMZ_CoreBase.isArrayNotEmpty(this.sunMzData().generatorTvdList) && 
			JSON.stringify(this.sunMzData().generatorTvdList).indexOf("@") > 0) {
			let newGeneratorTvdList = [];
			for (var i = 0; i < this.sunMzData().generatorTvdList.length; i++) {
				if (!SunMZ_CoreBase.isNotBlank(this.sunMzData().generatorTvdList[i].cd)) {
					newGeneratorTvdList.push(this.sunMzData().generatorTvdList[i]._parameter);
				} else {
					newGeneratorTvdList.push(this.sunMzData().generatorTvdList[i]);
				}
			}
			this.sunMzData().generatorTvdList = newGeneratorTvdList;
		}	
		
		if (SunMZ_CoreBase.isArrayNotEmpty(this.sunMzData().generatorSvList) && 
			JSON.stringify(this.sunMzData().generatorSvList).indexOf("@") > 0) {
			let newGeneratorSvList = [];
			for (var i = 0; i < this.sunMzData().generatorSvList.length; i++) {
				if (!SunMZ_CoreBase.isNotBlank(this.sunMzData().generatorSvList[i].cd)) {
					newGeneratorSvList.push(this.sunMzData().generatorSvList[i]._parameter);
				} else {
					newGeneratorSvList.push(this.sunMzData().generatorSvList[i]);
				}
			}
			this.sunMzData().generatorSvList = newGeneratorSvList;
		}
		
	};
	
	//角色擴充設定匯入$gameActors
	const alias_SunMZ_GeneratorEx_Game_Actor_setup = Game_Actor.prototype.setup;
	Game_Actor.prototype.setup = function(actorId) {
		alias_SunMZ_GeneratorEx_Game_Actor_setup.call(this, actorId);
		this.sunMzData().isUseGeneratorFG = $dataActors[actorId].SunMzData.isUseGeneratorFG || false;
		this.sunMzData().isUseGeneratorTV = $dataActors[actorId].SunMzData.isUseGeneratorTV || false;
		this.sunMzData().isUseGeneratorSV = $dataActors[actorId].SunMzData.isUseGeneratorSV || false;
		this.sunMzData().picCanvasWidth = $dataActors[actorId].SunMzData.picCanvasWidth || 500;
		this.sunMzData().picCanvasHeight = $dataActors[actorId].SunMzData.picCanvasHeight || 500;
		this.sunMzData().fgCanvasWidth = $dataActors[actorId].SunMzData.fgCanvasWidth || 144;
		this.sunMzData().fgCanvasHeight = $dataActors[actorId].SunMzData.fgCanvasHeight || 144;
		this.sunMzData().tvCanvasWidth = $dataActors[actorId].SunMzData.tvCanvasWidth || 144;
		this.sunMzData().tvCanvasHeight = $dataActors[actorId].SunMzData.tvCanvasHeight || 192;
		this.sunMzData().svCanvasWidth = $dataActors[actorId].SunMzData.svCanvasWidth || 576;
		this.sunMzData().svCanvasHeight = $dataActors[actorId].SunMzData.svCanvasHeight || 384;
		this.sunMzData().generatorPicList = $dataActors[actorId].SunMzData.generatorPicList || [];
		this.sunMzData().generatorFgList = $dataActors[actorId].SunMzData.generatorFgList || [];
		this.sunMzData().generatorTvList = $dataActors[actorId].SunMzData.generatorTvList || [];
		this.sunMzData().generatorTvdList = $dataActors[actorId].SunMzData.generatorTvdList || [];
		this.sunMzData().generatorSvList = $dataActors[actorId].SunMzData.generatorSvList || [];
		this.sunMzData().equipSync = $dataActors[actorId].SunMzData.equipSync || 0;
		
		this.sunMzData().isGeneratorPicChange = false;
		this.sunMzData().isGeneratorFgChange = false;
		this.sunMzData().isGeneratorTvChange = false;
		this.sunMzData().isGeneratorTvdChange = false;
		this.sunMzData().isGeneratorSvChange = false;
		
		this.sunMzData().genPicB64Data = "";
		this.sunMzData().genFgB64Data = "";
		this.sunMzData().genTvB64Data = "";
		this.sunMzData().genTvdB64Data = "";
		this.sunMzData().genSvB64Data = "";
		
		if (SunMZ.GeneratorEx.IsPreloadPicB64) {
			SunMZ_GeneratorEx.genB64(this, "PIC");
		}
		if (SunMZ.GeneratorEx.IsPreloadFgB64) {
			SunMZ_GeneratorEx.genB64(this, "FG");
		}
		if (SunMZ.GeneratorEx.IsPreloadTvB64) {
			SunMZ_GeneratorEx.genB64(this, "TV");
		}
		if (SunMZ.GeneratorEx.IsPreloadTvdB64) {
			SunMZ_GeneratorEx.genB64(this, "TVD");
		}
		if (SunMZ.GeneratorEx.IsPreloadSvB64) {
			SunMZ_GeneratorEx.genB64(this, "SV");
		}
	};
	
	const alias_SunMZ_GeneratorEx_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
	Game_Actor.prototype.changeEquip = function(slotId, item) {
		alias_SunMZ_GeneratorEx_Game_Actor_changeEquip.call(this, slotId, item);
		this.sunMzData().isGeneratorPicChange = false;
		this.sunMzData().isGeneratorFgChange = false;
		this.sunMzData().isGeneratorTvChange = false;
		this.sunMzData().isGeneratorTvdChange = false;
		this.sunMzData().isGeneratorSvChange = false;
		
		this.sunMzData().genPicB64Data = "";
		this.sunMzData().genFgB64Data = "";
		this.sunMzData().genTvB64Data = "";
		this.sunMzData().genTvdB64Data = "";
		this.sunMzData().genSvB64Data = "";
		const actorId = this._actorId;
		for (const member of $gameParty.allMembers()) {
			if (member.sunMzData().equipSync == actorId) {
				member.sunMzData().isGeneratorPicChange = false;
				member.sunMzData().isGeneratorFgChange = false;
				member.sunMzData().isGeneratorTvChange = false;
				member.sunMzData().isGeneratorTvdChange = false;
				member.sunMzData().isGeneratorSvChange = false;
				
				member.sunMzData().genPicB64Data = "";
				member.sunMzData().genFgB64Data = "";
				member.sunMzData().genTvB64Data = "";
				member.sunMzData().genTvdB64Data = "";
				member.sunMzData().genSvB64Data = "";
			}
		}
	};
	
	const alias_SunMZ_GeneratorEx_Scene_Equip_onActorChange = Scene_Equip.prototype.onActorChange;
	Scene_Equip.prototype.onActorChange = function() {
		alias_SunMZ_GeneratorEx_Scene_Equip_onActorChange.call(this);
		for (const child of this._statusWindow._innerChildren) {
			if (child._actor && this.actor() && child._actor._actorId == this.actor()._actorId) {
				child.show();
			} else {
				child.hide();
			}
		}
	};
	
	//覆蓋
	Spriteset_Map.prototype.createCharacters = function() {
		this._characterSprites = [];
		for (const event of $gameMap.events()) {
			let eventCharSprite = new Sprite_Character(event);
			eventCharSprite.sunMzData().type = "EVENT";
			this._characterSprites.push(eventCharSprite);
		}
		for (const vehicle of $gameMap.vehicles()) {
			let vehicleCharSprite = new Sprite_Character(vehicle);
			vehicleCharSprite.sunMzData().type = "VEHICLE";
			this._characterSprites.push(vehicleCharSprite);
		}
		for (const follower of $gamePlayer.followers().reverseData()) {
			let followerCharSprite = new Sprite_Character(follower);
			followerCharSprite.sunMzData().type = "FOLLOWER";
			this._characterSprites.push(followerCharSprite);
		}
		let playerCharSprite = new Sprite_Character($gamePlayer);
		playerCharSprite.sunMzData().type = "PLAYER";
		this._characterSprites.push(playerCharSprite);
		for (const sprite of this._characterSprites) {
			this._tilemap.addChild(sprite);
		}
	};
	
	//***********************************************
	//為了更好的判斷Character的類型的前置處理
	//EVENT --> 事件
	//VEHICLE --> 交通工具
	//FOLLOWER --> 跟隨夥伴
	//PLAYER --> 玩家
	//***********************************************
	const alias_SunMZ_GeneratorEx_Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers = function() {
		alias_SunMZ_GeneratorEx_Sprite_Character_initMembers.call(this);
		this.sunMzData().isUseGeneratorTV = false;
		this.sunMzData().isUseGeneratorSV = false;
		this.sunMzData().substituteId = 0;
		this.sunMzData().type = "";
		this.sunMzData().mode = "tv";
		this.sunMzData().svMotion = "none";
		this.sunMzData().isHorizFlip = false;
		this.sunMzData().isLoadedGeneratorInfo = false;
		this.sunMzData().isLoadedGeneratorImage = false;
		this.sunMzData().svBody = null;
		this.sunMzData().svUpperBody = null;
		this.sunMzData().svLowerBody = null;
		this.sunMzData().genPicB64Data = "";
		this.sunMzData().genFgB64Data = "";
		this.sunMzData().genTvB64Data = "";
		this.sunMzData().genTvdB64Data = "";
		this.sunMzData().genSvB64Data = "";
		this.sunMzData().equipSync = 0;
	};
	
	//NEW
	Sprite_Character.prototype.createSvBodySprites = function() {
		if (!this.sunMzData().svBody) {
			this.sunMzData().svBody = new Sprite();
			this.sunMzData().svBody.anchor.x = 0.5;
			this.sunMzData().svBody.anchor.y = 1;
			this.addChild(this.sunMzData().svBody);
		}
	};
	
	//NEW
	Sprite_Character.prototype.createSvHalfBodySprites = function() {
		if (!this.sunMzData().svUpperBody) {
			this.sunMzData().svUpperBody = new Sprite();
			this.sunMzData().svUpperBody.anchor.x = 0.5;
			this.sunMzData().svUpperBody.anchor.y = 1;
			this.addChild(this.sunMzData().svUpperBody);
		}
		if (!this.sunMzData().svLowerBody) {
			this.sunMzData().svLowerBody = new Sprite();
			this.sunMzData().svLowerBody.anchor.x = 0.5;
			this.sunMzData().svLowerBody.anchor.y = 1;
			this.sunMzData().svLowerBody.opacity = 128;
			this.addChild(this.sunMzData().svLowerBody);
		}
	};
	
	//NEW
	Sprite_Character.prototype.updateSvHalfBodySprites = function() {
		if (this.sunMzData().svBody && this._bushDepth > 0) {
			this.createSvHalfBodySprites();
			this.sunMzData().svUpperBody.bitmap = this.sunMzData().svBody.bitmap;
			this.sunMzData().svUpperBody.visible = true;
			this.sunMzData().svUpperBody.y = -this._bushDepth;
			this.sunMzData().svLowerBody.bitmap = this.sunMzData().svBody.bitmap;
			this.sunMzData().svLowerBody.visible = true;
			this.sunMzData().svUpperBody.setBlendColor(this.getBlendColor());
			this.sunMzData().svLowerBody.setBlendColor(this.getBlendColor());
			this.sunMzData().svUpperBody.setColorTone(this.getColorTone());
			this.sunMzData().svLowerBody.setColorTone(this.getColorTone());
			this.sunMzData().svUpperBody.blendMode = this.blendMode;
			this.sunMzData().svLowerBody.blendMode = this.blendMode;
		} else if (this.sunMzData().svUpperBody) {
			this.sunMzData().svUpperBody.visible = false;
			this.sunMzData().svLowerBody.visible = false;
		}
	};
	
	//NEW
	Sprite_Character.prototype.genActor = function() {
		switch (this.sunMzData().type) {
			case "PLAYER":
				return $gameParty.leader();
			case "FOLLOWER":
				return this._character.actor();
			case "EVENT":
				if (this.sunMzData().substituteId > 0) {
					return $gameActors.actor(this.sunMzData().substituteId);
				}
		}
		return null;
	};
	
	//NEW
	Sprite_Character.prototype.setActor = function() {
		this.sunMzData().actor = null;
		switch (this.sunMzData().type) {
			case "PLAYER":
				this.sunMzData().actor = $gameParty.leader();
				break;
			case "FOLLOWER":
				this.sunMzData().actor = this._character.actor();
				break;
			case "EVENT":
				if (this.sunMzData().substituteId > 0) {
					this.sunMzData().actor = $gameActors.actor(this.sunMzData().substituteId);
				}
				break;
		}
		this.sunMzData().isLoadedGeneratorInfo = true;
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Character_updateFrame = Sprite_Character.prototype.updateFrame;
	Sprite_Character.prototype.updateFrame = function() {
		alias_SunMZ_GeneratorEx_Sprite_Character_updateFrame.call(this);
		this.updateSvFrame();
	};
	
	//NEW
	Sprite_Character.prototype.updateSvFrame = function() {
		this.createSvBodySprites();
		const bitmap = this.sunMzData().svBody.bitmap;
		if (bitmap && this.sunMzData().mode === "sv") {
			let scalingX = SunMZ.GeneratorEx.SvScalingWidth;
			let scalingY = SunMZ.GeneratorEx.SvScalingHeight;
			
			if (this.sunMzData().svBody) {
				this.sunMzData().svBody.visible = true;
				this.bitmap.visible = false;
				if (this._upperBody) {
					this._upperBody.visible = false;
				}
				if (this._lowerBody) {
					this._lowerBody.visible = false;
				}
			}
			const motionCode = this.sunMzData().svMotion;
			if ("none" == motionCode) {
				this.sunMzData().isLoadedGeneratorInfo = false;
				return;
			}
			const motionIndex = Sprite_Actor.MOTIONS[motionCode].index;
			const pattern = this.characterPatternX() < 3 ? this.characterPatternX() : 1;
			const pw = bitmap.width / 9 * scalingX;
			const ph = bitmap.height / 6 * scalingY;
			const cw = bitmap.width / 9;
			const ch = bitmap.height / 6;
			const cx = Math.floor(motionIndex / 6) * 3 + pattern;
			const cy = motionIndex % 6;
			this.updateSvHalfBodySprites();
			if (this.sunMzData().svBody && this._bushDepth > 0) {
				let d = this._bushDepth * (1 * (scalingY / 0.75));
				this.sunMzData().svUpperBody.setFrame(cx * cw, cy * ch, cw, ch - d);
				this.sunMzData().svLowerBody.setFrame(cx * cw, (cy * ch) + ph - d, cw, d);
				this.setFrame(cx * cw, cy * ch, 0, ch);
				this.sunMzData().svBody.setFrame(cx * cw, cy * ch, 0, ch);
				if (this.sunMzData().actor && this.sunMzData().isHorizFlip) {
					this.sunMzData().svBody.scale.set(-scalingX, scalingY);
					this.sunMzData().svUpperBody.scale.set(-scalingX, scalingY);
					this.sunMzData().svLowerBody.scale.set(-scalingX, scalingY);
				} else {
					this.sunMzData().svBody.scale.set(scalingX, scalingY);
					this.sunMzData().svUpperBody.scale.set(scalingX, scalingY);
					this.sunMzData().svLowerBody.scale.set(scalingX, scalingY);
				}
			} else {
				this.setFrame(cx * cw, cy * ch, 0, ch);
				this.sunMzData().svBody.setFrame(cx * cw, cy * ch, cw, ch);
				if (this.sunMzData().actor && this.sunMzData().isHorizFlip) {
					this.sunMzData().svBody.scale.set(-scalingX, scalingY);
				} else {
					this.sunMzData().svBody.scale.set(scalingX, scalingY);
				}
			}
		}
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
	Sprite_Character.prototype.updateCharacterFrame = function() {
		alias_SunMZ_GeneratorEx_Sprite_Character_updateCharacterFrame.call(this);

		if (this.sunMzData().svBody) {
			this.sunMzData().svBody.visible = false;
		}
		
		if (this.sunMzData().svUpperBody) {
			this.sunMzData().svUpperBody.visible = false;
		}
		if (this.sunMzData().svLowerBody) {
			this.sunMzData().svLowerBody.visible = false;
		}
		
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Character_updateBitmap = Sprite_Character.prototype.updateBitmap;
	Sprite_Character.prototype.updateBitmap = function() {
		if (this.genActor() !== this.sunMzData().actor) {
			this.sunMzData().isLoadedGeneratorInfo = false;
		}
		if (SunMZ_CoreBase.isNotBlank(this.sunMzData().type) && 
			!this.sunMzData().isLoadedGeneratorInfo && 
			!(this.sunMzData().type == "EVENT" && 
			this.sunMzData().substituteId == 0) && 
			!SunMZ_CoreBase.isNotBlank(this.sunMzData().actor)) {
			this.setActor();
		}
		
		const $actor = this.sunMzData().actor;
		
		if (this.sunMzData().type == "EVENT") {
			this.sunMzData().substituteId = this._character.sunMzData().substituteId;
			this.sunMzData().mode = this._character.sunMzData().mode;
			this.sunMzData().svMotion = this._character.sunMzData().svMotion;
			this.sunMzData().isHorizFlip = this._character.sunMzData().isHorizFlip;
			
			if (SunMZ_CoreBase.isNotBlank($actor) && 
				$gameTemp.isCheckSubstituteEvent(this._character.eventId())) {
				this.sunMzData().isLoadedGeneratorImage = false;
				this.sunMzData().genSvB64Data = "";
				this.sunMzData().genTvB64Data = "";
				this.sunMzData().genTvdB64Data = "";
				this.sunMzData().equipSync = 0;
			}
			
			$gameTemp.removeSubstituteEvent(this._character.eventId());
		}
		
		if (!SunMZ_CoreBase.isNotBlank($actor)) {
			alias_SunMZ_GeneratorEx_Sprite_Character_updateBitmap.call(this);
		} else if (this.isImageChanged()) {
			if (["PLAYER", "FOLLOWER"].includes(this.sunMzData().type)) {
				this.sunMzData().mode = $actor.sunMzData().mode;
				this.sunMzData().svMotion = $actor.sunMzData().svMotion;
				this.sunMzData().isHorizFlip = $actor.sunMzData().isHorizFlip;
			}
			
			if (this.sunMzData().equipSync !== $actor.sunMzData().equipSync) {
				this.sunMzData().equipSync = $actor.sunMzData().equipSync;
				$actor.sunMzData().isGeneratorPicChange = false;
				$actor.sunMzData().isGeneratorFgChange = false;
				$actor.sunMzData().isGeneratorTvChange = false;
				$actor.sunMzData().isGeneratorTvdChange = false;
				$actor.sunMzData().isGeneratorSvChange = false;
				this.sunMzData().genSvB64Data = "";
				this.sunMzData().genTvB64Data = "";
				this.sunMzData().genTvdB64Data = "";
				this.sunMzData().isLoadedGeneratorImage = false;
			}
			
			this._tilesetId = $gameMap.tilesetId();
			this._tileId = this._character.tileId();
			this._characterName = this._character.characterName();
			this._characterIndex = this._character.characterIndex();
			
			//TN_SpriteExtender 插件相容性調整
			if (this.isSeperated && this.bodyRate) {
				this._isSeperated = this.isSeperated();
				this._bodyRate = this.bodyRate();
				this.removeChild(this._upperBody);
				this.removeChild(this._lowerBody);
				this._upperBody = null;
				this._lowerBody = null;
			}
			
			if (this._tileId == 0) {
				this.setGeneratorBitmap($actor);
			}
		}
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Character_isImageChanged = Sprite_Character.prototype.isImageChanged;
	Sprite_Character.prototype.isImageChanged = function() {
		let result = alias_SunMZ_GeneratorEx_Sprite_Character_isImageChanged.call(this);
		const $actor = this.sunMzData().actor;
		if (!result && SunMZ_CoreBase.isNotBlank($actor)) {
			if (["PLAYER", "FOLLOWER"].includes(this.sunMzData().type)) {
				return (
					this.sunMzData().mode !== $actor.sunMzData().mode ||
					this.sunMzData().svMotion !== $actor.sunMzData().svMotion ||
					this.sunMzData().isHorizFlip !== $actor.sunMzData().isHorizFlip ||
					this.sunMzData().isUseGeneratorTV !== $actor.sunMzData().isUseGeneratorTV ||
					this.sunMzData().isUseGeneratorSV !== $actor.sunMzData().isUseGeneratorSV ||
					this.sunMzData().genTvB64Data !== $actor.sunMzData().genTvB64Data ||
					this.sunMzData().genTvdB64Data !== $actor.sunMzData().genTvdB64Data ||
					this.sunMzData().genSvB64Data !== $actor.sunMzData().genSvB64Data ||
					this.sunMzData().equipSync !== $actor.sunMzData().equipSync
				);
			} else {
				return (
					this.sunMzData().isUseGeneratorTV !== $actor.sunMzData().isUseGeneratorTV ||
					this.sunMzData().isUseGeneratorSV !== $actor.sunMzData().isUseGeneratorSV ||
					this.sunMzData().genTvB64Data !== $actor.sunMzData().genTvB64Data ||
					this.sunMzData().genTvdB64Data !== $actor.sunMzData().genTvdB64Data ||
					this.sunMzData().genSvB64Data !== $actor.sunMzData().genSvB64Data ||
					this.sunMzData().equipSync !== $actor.sunMzData().equipSync
				);
			}
		}
		return result;
	};
	
	//NEW
	Sprite_Character.prototype.setGeneratorBitmap = function(actor) {
		let generatorEx_bitmap_list = [];
		let equipDataFilter = [];
		let self = this;
		if (actor) {
			actor.restGenData();
			switch (this.sunMzData().mode) {
				case "tvd":
					equipDataFilter = SunMZ_GeneratorEx.genCollectPartList(actor, "TVD");
					this.sunMzData().genTvdB64Data = actor.getTvdB64Data();
					this.sunMzData().isUseGeneratorTV = actor.sunMzData().isUseGeneratorTV;
					if (this.sunMzData().isUseGeneratorTV) {
						if (SunMZ_CoreBase.isNotBlank(this.sunMzData().genTvdB64Data)) {
							this.bitmap = ImageManager.loadBase64(this.sunMzData().genTvdB64Data);
							this._isBigCharacter = true;
						} else if (!this.sunMzData().isLoadedGeneratorImage) {
							this.sunMzData().isLoadedGeneratorImage = true;
						} else {
							this.bitmap = ImageManager.loadCharacter(actor.characterName());
							this._isBigCharacter = ImageManager.isBigCharacter(actor.characterName());
						}
					} else {
						this.bitmap = ImageManager.loadCharacter(actor.characterName());
						this._isBigCharacter = ImageManager.isBigCharacter(actor.characterName());
					}
					break;
				case "sv":
					equipDataFilter = SunMZ_GeneratorEx.genCollectPartList(actor, "SV");
					this.createSvBodySprites();
					this.sunMzData().genSvB64Data = actor.getSvB64Data();
					this.sunMzData().isUseGeneratorSV = actor.sunMzData().isUseGeneratorSV;
					this._isBigCharacter = true;
					if (this.sunMzData().isUseGeneratorSV) {
						if (this.sunMzData().svBody) {
							if (SunMZ_CoreBase.isNotBlank(this.sunMzData().genSvB64Data)) {
								this.bitmap = ImageManager.loadBase64(this.sunMzData().genSvB64Data);
								this.sunMzData().svBody.bitmap = this.bitmap;
							} else if (!this.sunMzData().isLoadedGeneratorImage) {
								this.sunMzData().isLoadedGeneratorImage = true;
							} else {
								this.bitmap = ImageManager.loadCharacter(actor.characterName());
								this._isBigCharacter = ImageManager.isBigCharacter(actor.characterName());
							}
						}
					} else {
						this.bitmap = ImageManager.loadSvActor(actor.battlerName());
						if (this.bitmap) {
							this.sunMzData().svBody.bitmap = this.bitmap;
						}
					}
					break;
				default:
					equipDataFilter = SunMZ_GeneratorEx.genCollectPartList(actor, "TV");
					this.sunMzData().genTvB64Data = actor.getTvB64Data();
					this.sunMzData().isUseGeneratorTV = actor.sunMzData().isUseGeneratorTV;
					if (this.sunMzData().isUseGeneratorTV) {
						if (SunMZ_CoreBase.isNotBlank(this.sunMzData().genTvB64Data)) {
							this.bitmap = ImageManager.loadBase64(this.sunMzData().genTvB64Data);
							this._isBigCharacter = true;
						} else if (!this.sunMzData().isLoadedGeneratorImage) {
							this.sunMzData().isLoadedGeneratorImage = true;
						} else {
							this.bitmap = ImageManager.loadCharacter(actor.characterName());
							this._isBigCharacter = ImageManager.isBigCharacter(actor.characterName());
						}
					} else {
						this.bitmap = ImageManager.loadCharacter(actor.characterName());
						this._isBigCharacter = ImageManager.isBigCharacter(actor.characterName());
					}
					break;
			}
		}
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
	Sprite_Character.prototype.patternWidth = function() {
		if (this._tileId > 0) {
			return alias_SunMZ_GeneratorEx_Sprite_Character_patternWidth.call(this);
		} else if (this.bitmap) {
			return alias_SunMZ_GeneratorEx_Sprite_Character_patternWidth.call(this);
		}
		return 0;
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Character_patternHeight = Sprite_Character.prototype.patternHeight;
	Sprite_Character.prototype.patternHeight = function() {
		if (this._tileId > 0) {
			return alias_SunMZ_GeneratorEx_Sprite_Character_patternHeight.call(this);
		} else if (this.bitmap) {
			return alias_SunMZ_GeneratorEx_Sprite_Character_patternHeight.call(this);
		}
		return 0;
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
	Sprite_Actor.prototype.initMembers = function() {
		alias_SunMZ_GeneratorEx_Sprite_Actor_initMembers.call(this);
		this.sunMzData().isLoadedGeneratorInfo = false;
		this.sunMzData().genSvB64Data = "";
		this.sunMzData().equipSync = 0;
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
	Sprite_Actor.prototype.setBattler = function(battler) {
		const actorBak = this._actor;
		alias_SunMZ_GeneratorEx_Sprite_Actor_setBattler.call(this, battler);
		if (battler !== actorBak) {
			SunMZ_GeneratorEx.genB64(this._actor, "SV");
		}
	};
	
	
	const alias_SunMZ_GeneratorEx_Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
	Sprite_Actor.prototype.updateBitmap = function() {
		if (SunMZ_CoreBase.isNotBlank(this._actor) &&
			this._actor.sunMzData().isUseGeneratorSV) {
			if (this.isImageChanged()) {
				this.sunMzData().equipSync = this._actor.sunMzData().equipSync;
				this._actor.sunMzData().isGeneratorPicChange = false;
				this._actor.sunMzData().isGeneratorFgChange = false;
				this._actor.sunMzData().isGeneratorTvChange = false;
				this._actor.sunMzData().isGeneratorTvdChange = false;
				this._actor.sunMzData().isGeneratorSvChange = false;
				SunMZ_GeneratorEx.genB64(this._actor, "SV");
				SunMZ_GeneratorEx.genB64(this._actor, "FG");
			}
			this.setGeneratorBitmap(this._actor);
		} else {
			alias_SunMZ_GeneratorEx_Sprite_Actor_updateBitmap.call(this);
		}
	};
	
	//NEW
	Sprite_Actor.prototype.isImageChanged = function() {
		if (this._actor) {
			return (
				this.sunMzData().genSvB64Data !== this._actor.sunMzData().genSvB64Data ||
				this.sunMzData().equipSync !== this._actor.sunMzData().equipSync
			);
		}
		return false;
	};
	
	//NEW
	Sprite_Actor.prototype.setGeneratorBitmap = function(actor) {
		this._battlerName = actor.battlerName();
		this.sunMzData().genSvB64Data = actor.getSvB64Data();
		if (SunMZ_CoreBase.isNotBlank(this.sunMzData().genSvB64Data)) {
			this._mainSprite.bitmap = ImageManager.loadBase64(this.sunMzData().genSvB64Data);
		}
	};
	
	const alias_SunMZ_GeneratorEx_Window_StatusBase_drawActorFace = Window_StatusBase.prototype.drawActorFace;
	Window_StatusBase.prototype.drawActorFace = function (actor, x, y, width, height) {
		if (actor.sunMzData().isUseGeneratorFG) {
			this.placeGenFace(actor, x, y, width, height);
		} else {
			alias_SunMZ_GeneratorEx_Window_StatusBase_drawActorFace.call(this, actor, x, y, width, height);
		}
	};
	
	//NEW
	Window_StatusBase.prototype.placeGenFace = function(actor, x, y, width, height) {
		const key = "actor%1-GenFace".format(actor.actorId());
		const sprite = this.createInnerSprite(key, Sprite_WindowFace);
		let className = this.constructor.name;
		sprite.setup(actor, className, width, height);
		sprite.move(x, y);
		sprite.show();
	};
	
	//NEW
	Window_Base.prototype.drawGenFace = function (actor, x, y, width, height) {
		let bitmap = null;
		const mode = "FG";
		let generatorEx_bitmap_list = [];
		let equipDataFilter = SunMZ_GeneratorEx.genCollectPartList(actor, mode);
		let self = this;
		
		width = width || ImageManager.standardFaceWidth;
		height = height || ImageManager.standardFaceHeight;
		let generatorFgListLen = actor.sunMzData().generatorFgList.length;
		for (var i = 0; i < actor.sunMzData().generatorFgList.length; i++) {
			let generatorFg = actor.sunMzData().generatorFgList[i];
			let fgImage = generatorFg.img;
			let fgNewColor = generatorFg.newColor;
			let fgOriginalColor = generatorFg.orgColor;
			let actorArmorItem = SunMZ_GeneratorEx.findDataByPartType(equipDataFilter, generatorFg.cd);
			if (actorArmorItem) {
				actor.sunMzData().generatorFgList[i]._fix = true;
				actor.sunMzData().generatorFgList[i]._fix_canvasX = actorArmorItem.x;
				actor.sunMzData().generatorFgList[i]._fix_canvasY = actorArmorItem.y;
				fgImage = actorArmorItem.img;
				if (!actorArmorItem.IsInheritColors) {
					fgNewColor = actorArmorItem.newColor;
					fgOriginalColor = actorArmorItem.orgColor;
				}
			} else {
				actor.sunMzData().generatorFgList[i]._fix = false;
			}
			let generatorBitmap = ImageManager.loadGeneratorFg(fgImage, fgNewColor, fgOriginalColor);
			if (fgNewColor && fgNewColor !== "none") {
				let fun = function() {
					let originalColorRgb = ColorUtils.getColorRgb(fgOriginalColor);
					let newColorRgb = ColorUtils.getColorRgb(fgNewColor);
					let isOriginalColorBlack = (fgOriginalColor === "black");
					CanvasUtils.putImageRGB(generatorBitmap, newColorRgb.r - originalColorRgb.r, newColorRgb.g - originalColorRgb.g, newColorRgb.b - originalColorRgb.b, generatorBitmap.width, generatorBitmap.height, isOriginalColorBlack);
				};
				generatorBitmap.addLoadListener(fun);
			} else {
				let fun = function() {
					CanvasUtils.putImageRGB(generatorBitmap, 0, 0, 0, generatorBitmap.width, generatorBitmap.height, false);
				};
				generatorBitmap.addLoadListener(fun);
			}
			generatorEx_bitmap_list.push(generatorBitmap);
			let fun2 = function() {
				if ((SunMZ.GeneratorEx.PicMergeType == "WaitComple" && generatorEx_bitmap_list.length == generatorFgListLen) || 
					SunMZ.GeneratorEx.PicMergeType == "RealTimeDisplay") {
					bitmap = SunMZ_GeneratorEx.genBitmapBase64Data(actor, mode, generatorEx_bitmap_list);
					if (bitmap) {
						const pw = ImageManager.faceWidth;
						const ph = ImageManager.faceHeight;
						const sw = Math.min(width, pw);
						const sh = Math.min(height, ph);
						const dx = Math.floor(x + Math.max(width - pw, 0) / 2);
						const dy = Math.floor(y + Math.max(height - ph, 0) / 2);
						const sx = 0;
						const sy = Math.floor((ph - sh) / 2);
						self.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
					}
				}
			}
			generatorBitmap.addLoadListener(fun2);
		}
	};
	
	//-------------------------------------------------
	//對話顯示(追加參數)
	//-------------------------------------------------
	
	//NEW
	Game_Message.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	const alias_SunMZ_GeneratorEx_Game_Message_initialize = Game_Message.prototype.initialize;
	Game_Message.prototype.initialize = function() {
		alias_SunMZ_GeneratorEx_Game_Message_initialize.call(this);
		this.clearActor();
	};
	
	//NEW
	Game_Message.prototype.clearActor = function() {
		this.sunMzData().actor = null;
	};
	
	//NEW
	Game_Message.prototype.setActor = function(actor) {
		this.sunMzData().actor = actor;
	};
	
	const alias_SunMZ_GeneratorEx_Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
	Window_Message.prototype.drawMessageFace = function() {
		const rtl = $gameMessage.isRTL();
		const width = ImageManager.faceWidth;
		const height = this.innerHeight;
		const x = rtl ? this.innerWidth - width - 4 : 4;
		const y = 0;
		
		if (SunMZ_CoreBase.isNotBlank($gameMessage.sunMzData().actor)) { 
			const actor = $gameMessage.sunMzData().actor;
			if (actor.sunMzData().isUseGeneratorFG) {
				this.drawGenFace(actor, x, y, width, height);
			} else {
				this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
			}
		} else {
			alias_SunMZ_GeneratorEx_Window_Message_drawMessageFace.call(this);
		}
	};
	
	//-------------------------------------------------
	//立繪相關
	//-------------------------------------------------
	
	//NEW
	Game_Screen.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	//NEW
	Game_Screen.prototype.setupGenActorPicture = function(pictureId, actorId, origin, x, y, scaleX, scaleY, opacity, blendMode) {
		const realPictureId = this.realPictureId(pictureId);
		const picture = new Game_Picture();
		picture.showGenActorPicture(actorId, origin, x, y, scaleX, scaleY, opacity, blendMode);
		this._pictures[realPictureId] = picture;
	};
	
	//NEW
	Game_Picture.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	const alias_SunMZ_GeneratorEx_Game_Picture_initialize = Game_Picture.prototype.initialize;
	Game_Picture.prototype.initialize = function() {
		alias_SunMZ_GeneratorEx_Game_Picture_initialize.call(this);
		this.sunMzData().actor = null;
	};
	
	//NEW
	Game_Picture.prototype.showGenActorPicture = function(actorId, origin, x, y, scaleX, scaleY, opacity, blendMode) {
		this.sunMzData().actor = $gameActors.actor(actorId);
		this._origin = origin;
		this._x = x;
		this._y = y;
		this._scaleX = scaleX;
		this._scaleY = scaleY;
		this._opacity = opacity;
		this._blendMode = blendMode;
		this.initTarget();
		this.initTone();
		this.initRotation();
	};
	
	const alias_SunMZ_GeneratorEx_Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
	Sprite_Picture.prototype.initialize = function(pictureId) {
		alias_SunMZ_GeneratorEx_Sprite_Picture_initialize.call(this, pictureId);
		this.sunMzData().actor = null;
		this.sunMzData().genPicB64Data = "";
	};
	
	//NEW
	const alias_SunMZ_GeneratorEx_Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
	Sprite_Picture.prototype.updateBitmap = function() {
		const picture = this.picture();
		if (picture) {
			this.sunMzData().actor = picture.sunMzData().actor;
			if (SunMZ_CoreBase.isNotBlank(this.sunMzData().actor)) {
				this.sunMzData().genPicB64Data = this.sunMzData().actor.getPicB64Data();
				if (SunMZ_CoreBase.isNotBlank(this.sunMzData().genPicB64Data) && this.sunMzData().actor) {
					this.bitmap = ImageManager.loadBase64(this.sunMzData().genPicB64Data);
					this.visible = true;
				} else {
					this.visible = false;
				}
			} else {
				alias_SunMZ_GeneratorEx_Sprite_Picture_updateBitmap.call(this);
			}
		} else {
			alias_SunMZ_GeneratorEx_Sprite_Picture_updateBitmap.call(this);
		}
	};
	
	//-------------------------------------------------
	//暫存指令
	//-------------------------------------------------
	
	//NEW
	Game_Temp.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};
	
	const alias_SunMZ_GeneratorEx_Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		alias_SunMZ_GeneratorEx_Game_Temp_initialize.call(this);
		this.sunMzData().substituteRefreshMapEvents = [];
	};
	
	//NEW
	Game_Temp.prototype.needCheckSubstituteEvent = function(eventId) {
		this.sunMzData().substituteRefreshMapEvents.push(eventId);
	};
	
	//NEW
	Game_Temp.prototype.isCheckSubstituteEvent = function(eventId) {
		return this.sunMzData().substituteRefreshMapEvents.includes(eventId);
	};
	
	//NEW
	Game_Temp.prototype.removeSubstituteEvent = function(eventId) {
		return this.sunMzData().substituteRefreshMapEvents.remove(eventId);
	};
	
	//----------------------------------------------------------------------------------
	//Sprite_WindowFace
	//----------------------------------------------------------------------------------
	
	function Sprite_WindowFace() {
		this.initialize(...arguments);
	}
	
	Sprite_WindowFace.prototype = Object.create(Sprite.prototype);
	Sprite_WindowFace.prototype.constructor = Sprite_WindowFace;
	
	Sprite_WindowFace.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		this.initMembers();
	};
	
	Sprite_WindowFace.prototype.sunMzData = function() {
		this.SunMzData = this.SunMzData || {};
		return this.SunMzData;
	};

	Sprite_WindowFace.prototype.initMembers = function() {
		this._actor = null;
		this._pattern = 0;
		this._faceName = "";
		this._faceIndex = 0;
		this._className = "";
		this._itemHeight = 0;
		this.sunMzData().genFgB64Data = "";
	};
	
	Sprite_WindowFace.prototype.setup = function(actor, className, width, height) {
		width = width || ImageManager.standardFaceWidth;
		height = height || ImageManager.standardFaceHeight;
		this._className = className;
		this._itemWidth = width;
		this._itemHeight = height;
		if (actor !== this._actor) {
			this._actor = actor;
		}
	};

	Sprite_WindowFace.prototype.update = function() {
		Sprite.prototype.update.call(this);
		if (this._actor) {
			this.updatePattern();
			this.updateBitmap();
			this.updateFrame();
		}
	};
	
	Sprite_WindowFace.prototype.updatePattern = function() {
		this._pattern++;
		if (this._pattern >= SunMZ.GeneratorEx.FaceTimeoutNum) {
			this._pattern = 0
		}
	};
	
	Sprite_WindowFace.prototype.updateBitmap = function() {
		const faceName = this._actor.faceName();
		const faceIndex = this._actor.faceIndex();
		if (!this._actor.sunMzData().isUseGeneratorFG && this._faceName !== faceName || this._faceIndex !== faceIndex) {
			this._faceName = faceName;
			this._faceIndex = faceIndex;
			this.loadBitmap(faceName);
		} else if (this.isImageChanged()){
			this.loadBitmap(faceName);
		}
	};
	
	Sprite_WindowFace.prototype.updateFrame = function() {
		const pw = ImageManager.faceWidth;
		const ph = ImageManager.faceHeight;
		const sw = Math.min(this._itemWidth, pw);
		const sh = Math.min(this._itemHeight, ph);

		const bitmap = this.bitmap;
		if (bitmap) {
			if (this.isBigFace()) {
				let sx = Math.floor((pw - sw) / 2);
				let sy = Math.floor((ph - sh) / 2);
				//let dx = Math.floor(sx + Math.max(this._itemWidth - pw, 0) / 2);
				//let dy = Math.floor(sy + Math.max(this._itemHeight - ph, 0) / 2);
				switch (this._className) {
					case "Window_MenuStatus":
					case "Window_Party_List"://出自 SunMZ_1_GamePartyEx.js
						this.changePaintOpacity(this._actor.isBattleMember());
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_Party_List"://出自 SunMZ_1_GamePartyEx.js
						this.changePaintOpacity(true);
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_Message":
						this.changePaintOpacity(true);
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_BattleStatus":
					case "Window_BattleActor":
						this.changePaintOpacity(true);
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_SelectStandby":
					case "Window_SelectMercenaryStandby":
						this.changePaintOpacity(this._actor.isAlive());
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					default:
						this.changePaintOpacity(true);
						this.setFrame(0, 0, bitmap.width, bitmap.height);
						break;
				}
			} else {
				const faceIndex = this._faceIndex;
				const baseX = (faceIndex % 4) * pw;
				const baseY = Math.floor(faceIndex / 4) * ph;
				let sx = Math.floor(baseX + (pw - sw) / 2);
				let sy = Math.floor(baseY + (ph - sh) / 2);
				let dx = Math.floor(sx + Math.max(this._itemWidth - pw, 0) / 2);
				let dy = Math.floor(sy + Math.max(this._itemHeight - ph, 0) / 2);
				switch (this._className) {
					case "Window_MenuStatus":
					case "Window_Party_List":
						this.changePaintOpacity(this._actor.isBattleMember());
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_Message":
						this.changePaintOpacity(true);
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_BattleStatus":
					case "Window_BattleActor":
						this.changePaintOpacity(true);
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
					case "Window_SelectStandby":
					case "Window_SelectMercenaryStandby":
					default:
						this.changePaintOpacity(true);
						this.setFrame(sx, sy, this._itemWidth, this._itemHeight);
						break;
				}
				
			}
		}
	};
	
	Sprite_WindowFace.prototype.loadBitmap = function(name) {
		if (this._actor && this._actor.sunMzData().isUseGeneratorFG) {
			this.sunMzData().genFgB64Data = this._actor.getFgB64Data();
			if (SunMZ_CoreBase.isNotBlank(this.sunMzData().genFgB64Data)) {
				this.bitmap = ImageManager.loadBase64(this.sunMzData().genFgB64Data);
			} else {
				if (this._pattern == 0) {
					SunMZ_GeneratorEx.genB64(this._actor, "FG");
				}
			}
		} else {
			this.bitmap = ImageManager.loadFace(name);
		}
		this.updateFrame();
	};
	
	Sprite_WindowFace.prototype.changePaintOpacity = function(enabled) {
		this.opacity = enabled ? 255 : 160;
	};

	Sprite_WindowFace.prototype.isBigFace = function() {
		if (this._actor && this._actor.sunMzData().isUseGeneratorFG) {
			return true;
		}
		return ImageManager.isBigFace(this._faceName);
	};
	
	Sprite_WindowFace.prototype.isImageChanged = function() {
		if (this._actor) {
			return (
				this.sunMzData().genFgB64Data !== this._actor.sunMzData().genFgB64Data ||
				(!SunMZ_CoreBase.isNotBlank(this.sunMzData().genFgB64Data) && this._pattern == 0)
			);
		}
		return false;
	};
	
	//-------------------------------------------------
	//存檔相關
	//-------------------------------------------------
	if (SunMZ.GeneratorEx.IsSaveSync) {
		
		//覆蓋
		DataManager.makeSavefileInfo = function() {
			const info = {};
			info.title = $dataSystem.gameTitle;
			info.characters = $gameParty.charactersForSavefile();
			info.faces = $gameParty.facesForSavefile();
			info.playtime = $gameSystem.playtimeText();
			info.timestamp = Date.now();
			return info;
		};
		
		//覆蓋
		Game_Party.prototype.charactersForSavefile = function() {
			let i = 0;
			return this.battleMembers().map(actor => 
			{
				i++;
				return [
					actor.characterName(),
					actor.characterIndex(),
					actor.sunMzData().isUseGeneratorTV,
					actor.sunMzData().genTvB64Data,
					i
				]
			});
		};
		
		//覆蓋
		Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
			if (info.characters) {
				const characterY = y;
				for (const data of info.characters) {
					if (data[2]) {
						if (this.index() > -1) {
							//這裡要直接讀取不然會有問題
							const bitmap = SunMZ_Bitmap.load(data[3]);
							const windowSavefileListObj = this;
							const fun = function(bitmapObj) {
								if (!SunMZ_CoreBase.isNotBlank(bitmapObj._isMerge)) {
									windowSavefileListObj.drawCharacterGenEx(bitmapObj, x + (data[4] * 48), characterY);
									bitmapObj._isMerge = true;
								}
							};
							bitmap.addLoadListener(fun);
						}
					} else {
						this.drawCharacter(data[0], data[1], x + (data[4] * 48), characterY);
					}
				}
			}
		};
		
		//NEW
		Window_SavefileList.prototype.drawCharacterGenEx = function(bitmap, x, y) {
			const salf = this;
			if (bitmap.isReady()) {
				const pw = bitmap.width / 3;
				const ph = bitmap.height / 4;
				const n = 0;
				const sx = pw;
				const sy = 0;
				salf.contents.paintOpacity = 255;
				salf.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
			}
		};
		
		//NEW
		Window_SavefileList.prototype.changePaintOpacity = function(enabled) {
			this.contents.paintOpacity = enabled ? 255 : this.translucentOpacity();
		};
		
	}
	
})();
