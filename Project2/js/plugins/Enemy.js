/*
@plugindesc 按Region+载具切换敌群（内置权重，清空地图遇敌列表）
@author Custom
@target MZ
*/
(() => {
    // ========== 在这里配置敌群权重！！ ==========
    // 格式：troopWeights[敌群ID] = 权重数值
    const troopWeights = {
        1: 10,
        2: 10,
        3: 10,
        4: 10,

        5: 10,
        6: 10,
        7: 10,
        8: 10,
        9: 10,

        10: 10,
        11: 10,
        12: 10,
        13: 10,
        14: 10,
        15: 10,
    };
    // ==========================================

    // 遇敌开关判定
    const _Game_Player_canEncounter = Game_Player.prototype.canEncounter;
    Game_Player.prototype.canEncounter = function() {
        const base = _Game_Player_canEncounter.call(this);
        if (!base) return false;

        const rId = $gameMap.regionId(this.x, this.y);
        const inBoat = this.isInVehicle() && this.vehicle()._type === 'boat';

        switch(rId) {
            case 1: return true;
            case 2: return true;
            case 3: return inBoat;
            case 4: return true;
            default: return true;
        }
    };

    // 从敌群数组，按权重随机挑选一个敌群
    function pickTroopByWeight(idList) {
        let total = 0;
        const pool = [];
        for(const id of idList) {
            const w = troopWeights[id] ?? 1;
            total += w;
            pool.push({id, w: total});
        }
        const r = Math.random() * total;
        for(const item of pool) {
            if(r < item.w) return item.id;
        }
        return idList[0];
    }

    // 拦截遇敌触发，替换敌群
    const _Game_Player_makeEncounterTroopId = Game_Player.prototype.makeEncounterTroopId;
    Game_Player.prototype.makeEncounterTroopId = function() {
        const rId = $gameMap.regionId(this.x, this.y);
        const inBoat = this.isInVehicle() && this.vehicle()._type === 'boat';
        let troopList = [];

        switch(rId) {
            case 1:
                troopList = [1,2,3,4];
                break;
            case 2:
                troopList = [5];
                break;
            case 3:
                if(inBoat){
                    troopList = [5,6,7,8,9];
                }else{
                    troopList = [];
                }
                break;
            case 4:
                troopList = [10,11,12,13,14,15];
                break;
            default:
                // 其他区域使用原生遇敌逻辑
                return _Game_Player_makeEncounterTroopId.call(this);
        }

        if(troopList.length === 0) return 0;
        return pickTroopByWeight(troopList);
    };
})();
