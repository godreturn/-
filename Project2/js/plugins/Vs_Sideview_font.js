/*:
 * @target MZ
 * @plugindesc Visu SideviewBattleUI 全局Bitmap钩子，修改侧边状态栏名字/HPMPTP字号+斜体
 * @author Custom
 */
(function() {
    // ========== 配置区 ==========
    const NAME_FONT_SIZE = 10;
    const NAME_ITALIC = true;
    const PARAM_FONT_SIZE = 10;
    const PARAM_ITALIC = true;
    // ============================

    // 标记：当前正在绘制Sideview状态面板
    let isSideviewStatusDraw = false;

    // 劫持VS创建Sideview状态Sprite，标记绘制阶段
    const _VS_Sideview_createActorStatusSprite = Scene_Battle.prototype.createActorStatusSprite;
    Scene_Battle.prototype.createActorStatusSprite = function(actor) {
        isSideviewStatusDraw = true;
        const sprite = _VS_Sideview_createActorStatusSprite.call(this, actor);
        isSideviewStatusDraw = false;
        return sprite;
    };

    // 全局劫持Bitmap.drawText
    const _Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, maxWidth, align) {
        if (isSideviewStatusDraw) {
            // 判断：角色名字（非纯数字） / HP MP TP数值（纯数字）
            const isNum = /^\d+$/.test(text.trim());
            if (isNum) {
                this.fontSize = PARAM_FONT_SIZE;
                this.fontItalic = PARAM_ITALIC;
            } else {
                this.fontSize = NAME_FONT_SIZE;
                this.fontItalic = NAME_ITALIC;
            }
            _Bitmap_drawText.call(this, text, x, y, maxWidth, align);
            // 恢复字体，防止污染其他UI
            this.fontSize = $gameSystem.mainFontSize();
            this.fontItalic = false;
        } else {
            _Bitmap_drawText.call(this, text, x, y, maxWidth, align);
        }
    };

    // ===== 【可选】角色立绘头顶名字（Battler Sprite名字）字号+斜体 =====
    const ACTOR_SPRITE_NAME_SIZE = 24;
    const ACTOR_SPRITE_NAME_ITALIC = true;
    const _Sprite_Battler_drawName = Sprite_Battler.prototype.drawName;
    Sprite_Battler.prototype.drawName = function() {
        if (this._battler && this._battler.isActor()) {
            this._nameBitmap.fontSize = ACTOR_SPRITE_NAME_SIZE;
            this._nameBitmap.fontItalic = ACTOR_SPRITE_NAME_ITALIC;
        }
        _Sprite_Battler_drawName.call(this);
    };

})();
