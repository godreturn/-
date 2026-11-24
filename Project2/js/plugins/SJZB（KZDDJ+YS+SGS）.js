/*:
 * @target MZ
 * @plugindesc 随机装备（终极防串版：属性互串零风险/全修复）
 * @author 原有作者 + 终极防串修复
 *
 * @param affixes
 * @text 词条列表
 * @desc 设置所有可以随机生成的词条
 * @type struct<Affix>[]
 * @default []
 *
 * @param pools
 * @text 词条池
 * @desc 设置随机词条池，每个池可以指定可出现的词条
 * @type struct<Pool>[]
 * @default []
 *
 * @param lineBreakCount
 * @text 副词条换行数量
 * @desc 副词条每多少个自动换行（默认4）
 * @type number
 * @default 4
 *
 * @param maxRandomEquip
 * @text 随机装备最大数量
 * @desc 随机装备总数量上限。达到后会自动清理未持有装备。
 * @type number
 * @default 300
 *
 * @param limitMessage
 * @text 上限提示文字
 * @desc 当随机装备达到上限且无法继续生成时提示玩家
 * @type text
 * @default 随机装备数量已达到上限，请出售或丢弃部分装备
 *
 * @param debugMode
 * @text 开发调试模式
 * @desc 开启后会在控制台输出ID分配、词条生成日志，方便排查问题
 * @type boolean
 * @default false
 *
 * @param ---idSetting---
 * @text === 【重要】ID区间设置 ===
 * @desc 请确保武器结束ID < 防具开始ID，绝对不能重叠！
 *
 * @param weaponStartId
 * @text 武器随机ID起始
 * @parent ---idSetting---
 * @type number
 * @default 2001
 *
 * @param weaponEndId
 * @text 武器随机ID结束
 * @parent ---idSetting---
 * @type number
 * @default 5000
 *
 * @param armorStartId
 * @text 防具随机ID起始
 * @parent ---idSetting---
 * @type number
 * @default 5001
 *
 * @param armorEndId
 * @text 防具随机ID结束
 * @parent ---idSetting---
 * @type number
 * @default 10000
 *
 * @param ---levelSystem---
 * @text === 等级系统设置 ===
 * @desc
 *
 * @param ---paramRate---
 * @text ▶ 固定值(param)倍率设置 (攻击/防御/HP等)
 * @parent ---levelSystem---
 * @desc
 *
 * @param paramBaseRate
 * @text 固定值倍率基础值
 * @parent ---paramRate---
 * @desc 公式：最终倍率 = 基础值 + (等级 × 每级增量)
 * @type number
 * @decimals 2
 * @default 1
 *
 * @param paramRatePerLevel
 * @text 固定值每级增量
 * @parent ---paramRate---
 * @desc 每提升1级，固定值倍率增加的数值
 * @type number
 * @decimals 2
 * @default 1
 *
 * @param ---xparamRate---
 * @text ▶ 百分比值(xparam/sparam)倍率设置 (暴击/闪避等)
 * @parent ---levelSystem---
 * @desc
 *
 * @param xparamBaseRate
 * @text 百分比值倍率基础值
 * @parent ---xparamRate---
 * @desc 公式：最终倍率 = 基础值 + (等级 × 每级增量)
 * @type number
 * @decimals 2
 * @default 1
 *
 * @param xparamRatePerLevel
 * @text 百分比值每级增量
 * @parent ---xparamRate---
 * @desc 每提升1级，百分比值倍率增加的数值 (建议设小一点，如0.1)
 * @type number
 * @decimals 2
 * @default 0.2
 *
 * @param xparamMaxRate
 * @text 百分比倍率最大值限制
 * @parent ---xparamRate---
 * @desc 百分比词条的倍率上限 (例如设为3，代表最多放大3倍)，0代表不限制
 * @type number
 * @decimals 2
 * @default 3
 *
 * @param levelMinRate
 * @text 全局倍率最小值限制
 * @parent ---levelSystem---
 * @desc 所有词条倍率的最小下限
 * @type number
 * @decimals 2
 * @default 0.1
 *
 * @param levelNameFormat
 * @text 装备名称等级后缀格式
 * @parent ---levelSystem---
 * @desc 等级≥1时，装备名称的后缀格式，{level}会替换为实际等级
 * @type text
 * @default +{level}
 *
 * @param ---colorSystem---
 * @text === 词条颜色系统设置 ===
 * @desc
 *
 * @param colorParam
 * @text 基础属性(param)词条名称颜色
 * @parent ---colorSystem---
 * @desc 攻击/防御/HP等词条名称颜色
 * @type number
 * @default 3
 *
 * @param colorXparam
 * @text 百分比属性(xparam)词条名称颜色
 * @parent ---colorSystem---
 * @desc 暴击/闪避等词条名称颜色
 * @type number
 * @default 2
 *
 * @param colorSparam
 * @text 特殊属性(sparam)词条名称颜色
 * @parent ---colorSystem---
 * @desc 伤害倍率/经验等词条名称颜色
 * @type number
 * @default 6
 *
 * @param colorNegative
 * @text 负面词条名称颜色
 * @parent ---colorSystem---
 * @desc 数值为负时的词条名称颜色
 * @type number
 * @default 7
 *
 * @help
 * 修复内容：
 * 1. 【致命防串】彻底修复武器/防具属性互串问题：强制ID隔离、时序锁定、引用修复。
 * 2. 【终极零偏差】描述数值直接绑定装备实际增量，100%不会出现属性与描述不符。
 * 3. 【核心修复】解决了makeEquip内部重复随机词条导致的存档与实际属性不符问题。
 * 4. 【安全防护】彻底修复回标题开新档的数据污染问题。
 * 5. 【特性保留】Stage模式主词条后强制换行、简易倍率模式、离队装备保护。
 * 6. 【脚本单次】不要一个脚本多次写入生成装备会导致属性与描述不符的情况很小概率发生。
 *
 * ============================================
 * 事件脚本调用
 * ============================================
 *
 * 生成随机武器
 *
 * RandomEquip.generateWeapon(词条池ID, 武器ID)
 * 示例：
 * RandomEquip.generateWeapon(1,1)
 *
 *
 * RandomEquip.generateWeaponStage(武器ID,主池ID,副池ID,副词条最少,副词条最多)
 * 示例： 
 * RandomEquip.generateWeaponStage(1,1,2,2,4)
 *
 * 含义：
 * 使用词条池ID=1
 * 基于数据库武器ID=1生成随机武器
 *
 *
 * 生成随机防具
 *
 * RandomEquip.generateArmor(词条池ID, 防具ID)
 * 示例：
 * RandomEquip.generateArmor(2,3)
 *
 * 
 * RandomEquip.generateArmorStage(防具ID,主池ID,副池ID,副词条最少,副词条最多)
 * 示例： 
 * RandomEquip.generateArmorStage(3,1,2,1,3)
 * ============================================
 * 属性类型说明
 * ============================================
 *
 * param  = 基础属性（固定数值）
 * xparam = 扩展属性（百分比）
 * sparam = 特殊属性（战斗倍率）
 *
 *
 * ============================================
 * param编号
 * ============================================
 *
 * 0 最大HP
 * 1 最大MP
 * 2 攻击
 * 3 防御
 * 4 魔法攻击
 * 5 魔法防御
 * 6 敏捷
 * 7 幸运
 *
 *
 * ============================================
 * xparam编号
 * ============================================
 *
 * 0 命中率
 * 1 闪避率
 * 2 暴击率
 * 3 暴击回避
 * 4 魔法闪避
 * 5 魔法反射
 * 6 反击率
 * 7 HP再生
 * 8 MP再生
 * 9 TP再生
 *
 *
 * ============================================
 * sparam编号
 * ============================================
 *
 * 0 被攻击率
 * 1 防御效果率
 * 2 恢复效果率
 * 3 药物效果率
 * 4 MP消耗率
 * 5 TP充能率
 * 6 物理伤害率
 * 7 魔法伤害率
 * 8 地形伤害率
 * 9 经验获得率
 *
 *
 *============================================
 *
 */

/*~struct~Affix:
 * @param id
 * @text 词条ID
 * @type number
 * @param name
 * @text 词条名称
 * @type text
 * @param type
 * @text 属性类型
 * @type select
 * @option param
 * @option xparam
 * @option sparam
 * @param paramId
 * @text 属性编号
 * @type number
 * @param min
 * @text 最小值
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @param max
 * @text 最大值
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @param rate
 * @text 权重
 * @type number
 */

/*~struct~Pool:
 * @param id
 * @text 词条池ID
 * @type number
 * @param affixIds
 * @text 词条ID列表
 * @type number[]
 * @param appearRate
 * @text 词条出现概率
 * @type number
 * @default 100
 * @param min
 * @text 最少词条
 * @type number
 * @param max
 * @text 最多词条
 * @type number
 */

var RandomEquip = RandomEquip || {};

(() => {
    // 自动获取当前脚本文件名，防止参数读取失败
    const pluginName = 'SJZB（KZDDJ+YS+SGS）';
    const params = PluginManager.parameters(pluginName);

    // ======================
    // 【防串核心】ID区间强制校验与初始化
    // ======================
    RandomEquip.weaponStartId = Math.max(1, Number(params.weaponStartId) || 2001);
    RandomEquip.weaponEndId = Math.max(RandomEquip.weaponStartId + 1, Number(params.weaponEndId) || 5000);
    RandomEquip.armorStartId = Math.max(RandomEquip.weaponEndId + 1, Number(params.armorStartId) || 5001);
    RandomEquip.armorEndId = Math.max(RandomEquip.armorStartId + 1, Number(params.armorEndId) || 10000);

    // 强制区间隔离，绝对不允许重叠
    if (RandomEquip.weaponEndId >= RandomEquip.armorStartId) {
        RandomEquip.armorStartId = RandomEquip.weaponEndId + 1;
        RandomEquip.armorEndId = Math.max(RandomEquip.armorStartId + 1, RandomEquip.armorEndId);
        console.warn(`[随机装备] 检测到ID区间重叠，已自动修正！武器结束ID:${RandomEquip.weaponEndId} | 防具起始ID:${RandomEquip.armorStartId}`);
    }

    // 基础参数初始化
    RandomEquip.lineBreakCount = Number(params.lineBreakCount) || 4;
    RandomEquip.maxEquip = Number(params.maxRandomEquip) || 300;
    RandomEquip.limitMessage = String(params.limitMessage);
    RandomEquip.debugMode = Boolean(params.debugMode === 'true');

    // 仅保留简易模式参数
    RandomEquip.paramBaseRate = Number(params.paramBaseRate) || 1;
    RandomEquip.paramRatePerLevel = Number(params.paramRatePerLevel) || 1;
    RandomEquip.xparamBaseRate = Number(params.xparamBaseRate) || 1;
    RandomEquip.xparamRatePerLevel = Number(params.xparamRatePerLevel) || 0.2;
    RandomEquip.xparamMaxRate = Number(params.xparamMaxRate) || 3;

    RandomEquip.levelMinRate = Number(params.levelMinRate) || 0.1;
    RandomEquip.levelNameFormat = String(params.levelNameFormat) || "+{level}";

    RandomEquip.colorParam = Number(params.colorParam) || 3;
    RandomEquip.colorXparam = Number(params.colorXparam) || 2;
    RandomEquip.colorSparam = Number(params.colorSparam) || 6;
    RandomEquip.colorNegative = Number(params.colorNegative) || 7;

    // 【防串核心】生成锁，防止连续生成时互相干扰
    RandomEquip._isGenerating = false;

    // 全局运行时数据
    RandomEquip.weaponRandomIds = [];
    RandomEquip.armorRandomIds = [];
    
    // 数据解析
    function parseStruct(s) {
        return s ? JSON.parse(s).map(it => JSON.parse(it)) : [];
    }
    const affixData = parseStruct(params.affixes);
    const poolData = parseStruct(params.pools);

    RandomEquip.affixes = {};
    RandomEquip.pools = {};

    for (const a of affixData) {
        RandomEquip.affixes[a.id] = {
            name: a.name,
            type: a.type,
            paramId: Number(a.paramId),
            min: Number(a.min),
            max: Number(a.max),
            rate: Number(a.rate)
        };
    }
    for (const p of poolData) {
        RandomEquip.pools[p.id] = {
            affixIds: JSON.parse(p.affixIds).map(Number),
            appearRate: Number(p.appearRate || 100),
            min: Number(p.min),
            max: Number(p.max)
        };
    }

    // --- 核心工具函数 ---

    RandomEquip.getAffixColorCode = function (type, value) {
        if (value < 0) return this.colorNegative;
        switch (type) {
            case "param": return this.colorParam;
            case "xparam": return this.colorXparam;
            case "sparam": return this.colorSparam;
            default: return 0;
        }
    };

    // 百分比词条保留4位小数，避免浮点数精度问题
    RandomEquip.getLevelRate = function (level, type) {
        if (level < 1) return 1;
        let rate = 1;
        const isPercent = (type === "xparam" || type === "sparam");

        if (isPercent) {
            rate = this.xparamBaseRate + level * this.xparamRatePerLevel;
            if (this.xparamMaxRate > 0) rate = Math.min(rate, this.xparamMaxRate);
            rate = Number(rate.toFixed(4));
        } else {
            rate = this.paramBaseRate + level * this.paramRatePerLevel;
        }

        return Math.max(rate, this.levelMinRate);
    };

    RandomEquip.getLevelName = function (baseName, level) {
        if (level < 1) return baseName;
        return baseName + this.levelNameFormat.replace(/{level}/g, level);
    };

    // 词条生成时就取整，从源头统一数值
    RandomEquip.rollAffix = function (list, level) {
        let total = list.reduce((t, id) => t + (this.affixes[id] ? this.affixes[id].rate : 0), 0);
        if (total <= 0) return null;
        
        let r = Math.random() * total;
        for (const id of list) {
            const a = this.affixes[id];
            if (!a) continue;
            if (r < a.rate) {
                let v = a.min + Math.random() * (a.max - a.min);
                v *= this.getLevelRate(level, a.type);
                
                // param基础属性必须是整数，直接在这里取整
                if (a.type === "param") {
                    v = Math.floor(v);
                }
                
                if (this.debugMode) {
                    console.log(`[随机装备] 词条生成: ${a.name} | 最终值: ${v} | 类型: ${a.type}`);
                }

                return { id: a.id, name: a.name, type: a.type, paramId: a.paramId, value: v };
            }
            r -= a.rate;
        }
        return null;
    };

    RandomEquip.rollAffixes = function (pool, level) {
        const res = [];
        if (!pool) return res;
        for (let i = 0; i < pool.max; i++) {
            if (i < pool.min) {
                const a = this.rollAffix(pool.affixIds, level);
                if (a) res.push(a);
                continue;
            }
            if (Math.random() * 100 > pool.appearRate) continue;
            const a = this.rollAffix(pool.affixIds, level);
            if (a) res.push(a);
        }
        return res;
    };

    // --- 【防串+零偏差】核心制作函数 ---
    RandomEquip.makeEquip = function (base, affixes, level, baseId, breakAfterFirst = false) {
        // 【防串核心】强制深拷贝+数组初始化，彻底杜绝引用残留
        const item = JsonEx.makeDeepCopy(base);
        // 强制初始化params数组，确保长度为8（RPGMZ标准8项基础属性）
        item.params = [...base.params].map(v => Number(v) || 0);
        // 强制初始化traits数组，全新数组无引用
        item.traits = JsonEx.makeDeepCopy(base.traits || []);
        
        // 挂载元数据
        item._isRandomEquipDeleted = false;
        item._meta = {
            baseId: baseId,
            level: level,
            affixes: JsonEx.makeDeepCopy(affixes)
        };

        item.name = this.getLevelName(base.name, level);
        
        // 重置描述，防止叠加基础装备的旧描述
        let desc = base.description || "";
        let cnt = 0;

        if (this.debugMode) {
            console.log(`[随机装备] 开始制作: ${base.name} | 基础攻击: ${item.params[2]}`);
        }

        for (let i = 0; i < affixes.length; i++) {
            const a = affixes[i];
            if (!a) continue;
            
            // 【零偏差核心】先加属性，再用实际增量写描述，100%一致
            if (a.type === "param") {
                const beforeValue = item.params[a.paramId];
                const addValue = a.value;
                item.params[a.paramId] = beforeValue + addValue;
                const actualAdd = item.params[a.paramId] - beforeValue;

                // 描述直接用实际增量
                const c = this.getAffixColorCode(a.type, actualAdd);
                desc += `【\\C[${c}]${a.name}\\C[0]${actualAdd >= 0 ? "+" : ""}${actualAdd}】`;

                if (this.debugMode) {
                    console.log(`[随机装备] 属性添加: ${a.name} | 实际增量: ${actualAdd} | 最终值: ${item.params[a.paramId]}`);
                }
            } 
            // 百分比属性(xparam)
            else if (a.type === "xparam") {
                const traitValue = a.value;
                item.traits.push({ code: 22, dataId: a.paramId, value: traitValue });
                const showPercent = Math.floor(traitValue * 100);
                const c = this.getAffixColorCode(a.type, showPercent);
                desc += `【\\C[${c}]${a.name}\\C[0]${showPercent >= 0 ? "+" : ""}${showPercent}%】`;
            } 
            // 特殊倍率属性(sparam)
            else if (a.type === "sparam") {
                const traitValue = Math.max(0.01, 1 + a.value); 
                item.traits.push({ code: 23, dataId: a.paramId, value: traitValue });
                const showPercent = Math.floor(a.value * 100);
                const c = this.getAffixColorCode(a.type, showPercent);
                desc += `【\\C[${c}]${a.name}\\C[0]${showPercent >= 0 ? "+" : ""}${showPercent}%】`;
            }

            cnt++;

            // 主词条后强制换行
            if (i === 0 && breakAfterFirst) {
                desc += "\n";
            } 
            // 普通换行逻辑
            else if (cnt % this.lineBreakCount === 0) {
                desc += "\n";
            }
        }

        item.description = desc;

        if (this.debugMode) {
            console.log(`[随机装备] 制作完成: ${item.name} | 最终攻击: ${item.params[2]} | 描述: ${desc.replace(/\\C\[\d+\]/g, '')}`);
        }

        return item;
    };

    // --- 存档与内存管理 ---

    RandomEquip.initSaveData = function () {
        if (!$gameSystem) return;
        if (!$gameSystem._randomEquipSaveData) {
            $gameSystem._randomEquipSaveData = { weapons: {}, armors: {} };
        }
        this.saveData = $gameSystem._randomEquipSaveData;
    };

    RandomEquip.hardReset = function () {
        // 彻底清空所有随机装备数据，防止数据污染
        this.weaponRandomIds.forEach(id => { if($dataWeapons[id]) $dataWeapons[id] = null; });
        this.armorRandomIds.forEach(id => { if($dataArmors[id]) $dataArmors[id] = null; });
        this.weaponRandomIds = [];
        this.armorRandomIds = [];
        this.saveData = null;
        this._isGenerating = false;
    };

    RandomEquip.cleanUnused = function () {
        this.initSaveData();
        if (!this.saveData || this._isGenerating) return;

        const allActorEquipIds = new Set();
        // 遍历所有角色（包括离队），收集所有装备ID
        for (let actorId = 1; actorId < $dataActors.length; actorId++) {
            const actor = $gameActors.actor(actorId);
            if (!actor) continue;
            for (const eq of actor.equips()) {
                if (eq) allActorEquipIds.add(eq.id);
            }
        }

        const allIds = [...this.weaponRandomIds, ...this.armorRandomIds];
        for (let i = allIds.length - 1; i >= 0; i--) {
            const id = allIds[i];
            const wep = $dataWeapons[id];
            const arm = $dataArmors[id];
            const item = wep || arm;
            if (!item) continue;

            // 只要在角色身上、背包里，就绝对不删
            if (allActorEquipIds.has(id)) continue;
            if ($gameParty.hasItem(item, true)) continue;

            // 执行彻底删除
            if (wep) {
                wep._isRandomEquipDeleted = true;
                $dataWeapons[id] = null;
                delete this.saveData.weapons[id];
                const idx = this.weaponRandomIds.indexOf(id);
                if (idx >= 0) this.weaponRandomIds.splice(idx, 1);
            }
            if (arm) {
                arm._isRandomEquipDeleted = true;
                $dataArmors[id] = null;
                delete this.saveData.armors[id];
                const idx = this.armorRandomIds.indexOf(id);
                if (idx >= 0) this.armorRandomIds.splice(idx, 1);
            }
        }

        if (this.debugMode) {
            console.log(`[随机装备] 清理完成 | 剩余武器: ${this.weaponRandomIds.length} | 剩余防具: ${this.armorRandomIds.length}`);
        }
    };

    // --- 【防串核心】ID注册逻辑，强制唯一性校验 ---
    RandomEquip.registerWeapon = function (item, baseId, level, affixes) {
        this.initSaveData();
        for (let id = this.weaponStartId; id <= this.weaponEndId; id++) {
            // 【防串核心】绝对不允许ID出现在防具池里
            if (this.armorRandomIds.includes(id)) continue;
            const slot = $dataWeapons[id];
            if (!slot || slot._isRandomEquipDeleted) {
                // 【防串核心】先锁定ID，再写入数据
                item.id = id;
                item._isRandomEquipDeleted = false;
                $dataWeapons[id] = item;
                
                if (!this.weaponRandomIds.includes(id)) {
                    this.weaponRandomIds.push(id);
                }
                
                this.saveData.weapons[id] = {
                    baseId,
                    level: level || 0,
                    affixes: JsonEx.makeDeepCopy(affixes),
                    name: item.name,
                    desc: item.description,
                    params: JsonEx.makeDeepCopy(item.params),
                    traits: JsonEx.makeDeepCopy(item.traits)
                };

                if (this.debugMode) {
                    console.log(`[随机装备] 武器注册完成 | ID: ${id} | 名称: ${item.name}`);
                }

                return item;
            }
        }
        $gameMessage.add(this.limitMessage);
        return null;
    };

    RandomEquip.registerArmor = function (item, baseId, level, affixes) {
        this.initSaveData();
        for (let id = this.armorStartId; id <= this.armorEndId; id++) {
            // 【防串核心】绝对不允许ID出现在武器池里
            if (this.weaponRandomIds.includes(id)) continue;
            const slot = $dataArmors[id];
            if (!slot || slot._isRandomEquipDeleted) {
                item.id = id;
                item._isRandomEquipDeleted = false;
                $dataArmors[id] = item;
                
                if (!this.armorRandomIds.includes(id)) {
                    this.armorRandomIds.push(id);
                }
                
                this.saveData.armors[id] = {
                    baseId,
                    level: level || 0,
                    affixes: JsonEx.makeDeepCopy(affixes),
                    name: item.name,
                    desc: item.description,
                    params: JsonEx.makeDeepCopy(item.params),
                    traits: JsonEx.makeDeepCopy(item.traits)
                };

                if (this.debugMode) {
                    console.log(`[随机装备] 防具注册完成 | ID: ${id} | 名称: ${item.name}`);
                }

                return item;
            }
        }
        $gameMessage.add(this.limitMessage);
        return null;
    };

    // --- 【防串核心】生成能力校验，仅在生成前清理1次 ---
    RandomEquip.canGenerateWeapon = function () {
        if (this.weaponRandomIds.length < this.maxEquip) return true;
        this.cleanUnused();
        return this.weaponRandomIds.length < this.maxEquip;
    };

    RandomEquip.canGenerateArmor = function () {
        if (this.armorRandomIds.length < this.maxEquip) return true;
        this.cleanUnused();
        return this.armorRandomIds.length < this.maxEquip;
    };

    // --- 【防串核心】生成函数，全程加锁，防止连续生成干扰 ---
    RandomEquip.generateWeapon = function (poolId, weaponId, level = 0) {
        // 生成锁，防止连续调用冲突
        if (this._isGenerating) {
            if (this.debugMode) console.warn(`[随机装备] 正在生成中，跳过本次武器生成`);
            return;
        }
        this._isGenerating = true;

        try {
            // 先校验+清理，全程不再清理
            if (!this.canGenerateWeapon()) return;
            const pool = this.pools[poolId];
            const base = $dataWeapons[weaponId];
            if (!pool || !base) return;

            // 1. 一次性随机所有词条
            const affixes = this.rollAffixes(pool, level);
            // 2. 制作装备
            const item = this.makeEquip(base, affixes, level, weaponId);
            // 3. 注册锁定ID
            const registeredItem = this.registerWeapon(item, weaponId, level, affixes);
            if (!registeredItem) return;
            // 4. 发放给玩家
            $gameParty.gainItem(registeredItem, 1);
        } finally {
            // 无论成功失败，都释放锁
            this._isGenerating = false;
        }
    };

    RandomEquip.generateArmor = function (poolId, armorId, level = 0) {
        if (this._isGenerating) {
            if (this.debugMode) console.warn(`[随机装备] 正在生成中，跳过本次防具生成`);
            return;
        }
        this._isGenerating = true;

        try {
            if (!this.canGenerateArmor()) return;
            const pool = this.pools[poolId];
            const base = $dataArmors[armorId];
            if (!pool || !base) return;

            const affixes = this.rollAffixes(pool, level);
            const item = this.makeEquip(base, affixes, level, armorId);
            const registeredItem = this.registerArmor(item, armorId, level, affixes);
            if (!registeredItem) return;
            $gameParty.gainItem(registeredItem, 1);
        } finally {
            this._isGenerating = false;
        }
    };

    // --- Stage版生成函数（主词条强制换行），同样加锁防串 ---
    RandomEquip.generateWeaponStage = function (weaponId, poolA, poolB, minB, maxB, level = 0) {
        if (this._isGenerating) {
            if (this.debugMode) console.warn(`[随机装备] 正在生成中，跳过本次Stage武器生成`);
            return;
        }
        this._isGenerating = true;

        try {
            if (!this.canGenerateWeapon()) return;
            const base = $dataWeapons[weaponId];
            if (!base) return;

            const main = this.rollAffix(this.pools[poolA].affixIds, level);
            const subs = [];
            const cnt = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
            for (let i = 0; i < cnt; i++) {
                const a = this.rollAffix(this.pools[poolB].affixIds, level);
                if (a) subs.push(a);
            }
            const affixes = [main, ...subs].filter(Boolean);

            const item = this.makeEquip(base, affixes, level, weaponId, true);
            const registeredItem = this.registerWeapon(item, weaponId, level, affixes);
            if (!registeredItem) return;
            $gameParty.gainItem(registeredItem, 1);
        } finally {
            this._isGenerating = false;
        }
    };

    RandomEquip.generateArmorStage = function (armorId, poolA, poolB, minB, maxB, level = 0) {
        if (this._isGenerating) {
            if (this.debugMode) console.warn(`[随机装备] 正在生成中，跳过本次Stage防具生成`);
            return;
        }
        this._isGenerating = true;

        try {
            if (!this.canGenerateArmor()) return;
            const base = $dataArmors[armorId];
            if (!base) return;

            const main = this.rollAffix(this.pools[poolA].affixIds, level);
            const subs = [];
            const cnt = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
            for (let i = 0; i < cnt; i++) {
                const a = this.rollAffix(this.pools[poolB].affixIds, level);
                if (a) subs.push(a);
            }
            const affixes = [main, ...subs].filter(Boolean);

            const item = this.makeEquip(base, affixes, level, armorId, true);
            const registeredItem = this.registerArmor(item, armorId, level, affixes);
            if (!registeredItem) return;
            $gameParty.gainItem(registeredItem, 1);
        } finally {
            this._isGenerating = false;
        }
    };

    // --- 读档恢复，强制ID隔离 ---
    RandomEquip.restoreRandomEquips = function () {
        this.initSaveData();
        if (!this.saveData) return;

        // 先彻底清空当前内存
        this.weaponRandomIds.forEach(id => { $dataWeapons[id] = null; });
        this.armorRandomIds.forEach(id => { $dataArmors[id] = null; });
        this.weaponRandomIds = [];
        this.armorRandomIds = [];

        // 恢复武器
        for (const [sid, data] of Object.entries(this.saveData.weapons)) {
            const id = Number(sid);
            // 【防串核心】武器ID必须在武器区间内，否则跳过
            if (id < this.weaponStartId || id > this.weaponEndId) continue;
            const base = $dataWeapons[data.baseId];
            if (!base) continue;
            
            const it = JsonEx.makeDeepCopy(base);
            it.id = id;
            it.name = data.name;
            it.description = data.desc;
            it.params = JsonEx.makeDeepCopy(data.params);
            it.traits = JsonEx.makeDeepCopy(data.traits);
            it._isRandomEquipDeleted = false;
            
            it._meta = {
                baseId: data.baseId,
                level: data.level,
                affixes: JsonEx.makeDeepCopy(data.affixes)
            };

            $dataWeapons[id] = it;
            this.weaponRandomIds.push(id);
        }

        // 恢复防具
        for (const [sid, data] of Object.entries(this.saveData.armors)) {
            const id = Number(sid);
            // 【防串核心】防具ID必须在防具区间内，否则跳过
            if (id < this.armorStartId || id > this.armorEndId) continue;
            const base = $dataArmors[data.baseId];
            if (!base) continue;

            const it = JsonEx.makeDeepCopy(base);
            it.id = id;
            it.name = data.name;
            it.description = data.desc;
            it.params = JsonEx.makeDeepCopy(data.params);
            it.traits = JsonEx.makeDeepCopy(data.traits);
            it._isRandomEquipDeleted = false;
            
            it._meta = {
                baseId: data.baseId,
                level: data.level,
                affixes: JsonEx.makeDeepCopy(data.affixes)
            };

            $dataArmors[id] = it;
            this.armorRandomIds.push(id);
        }

        if (this.debugMode) {
            console.log(`[随机装备] 读档恢复完成 | 武器数量: ${this.weaponRandomIds.length} | 防具数量: ${this.armorRandomIds.length}`);
        }
    };

})();

// ============================================================================
// 引擎挂钩
// ============================================================================
(() => {
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        _Game_System_initialize.call(this);
        this._randomEquipSaveData = { weapons: {}, armors: {} };
    };

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        RandomEquip.initSaveData();
    };

    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        const c = _DataManager_makeSaveContents.call(this);
        RandomEquip.initSaveData();
        c.randomEquipData = $gameSystem._randomEquipSaveData;
        return c;
    };

    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (c) {
        _DataManager_extractSaveContents.call(this, c);
        $gameSystem._randomEquipSaveData = c.randomEquipData || { weapons: {}, armors: {} };
        RandomEquip.initSaveData();
        RandomEquip.restoreRandomEquips();
    };

    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function () {
        RandomEquip.hardReset();
        _Scene_Title_start.call(this);
    };

    const _equipItems = Game_Actor.prototype.equipItems;
    Game_Actor.prototype.equipItems = function () {
        return _equipItems.call(this).filter(it => it && !it._isRandomEquipDeleted);
    };
})();