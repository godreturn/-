/*:
 * @target MZ
 * @plugindesc 特別な配置のA1タイル画像を利用可能にします。
 * @author F_
 * 
 * @help
 * 
 * 次のような特別な配置のA1タイル画像を利用可能にします。
 * 
 * * ブロックCのタイルをブロックEのタイルと同様に表示
 * * ブロックCおよびブロックEのアニメーションをブロックA、B、Dと同様の順番で表示
 * 
 * 対象のA1タイル画像は予めプラグインパラメータより設定する必要があります。
 *
 * @param TargetTileImages
 * @type file[]
 * @dir img/tilesets/
 * @text 対象タイル画像
 * @desc 特別な配置のA1タイル画像の一覧。
 */

"use strict";

{
	const PLUGIN_NAME = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const TARGET_TILE_IMAGES = JSON.parse(PARAMS["TargetTileImages"]);

	const hasSpecialA1Tile = tileset => {
		const A1_TILE_IMAGE_INDEX = 0;
		const a1 = tileset.tilesetNames[A1_TILE_IMAGE_INDEX];
		return TARGET_TILE_IMAGES.includes(a1);
	};

	const Autotile = (() => {
		const START_ID = 2048;
		const A1_KIND_SIZE = 16;
		const A2_KIND_SIZE = 32;
		const A3_KIND_SIZE = 32;
		const A4_KIND_SIZE = 48;
		const SHAPE_SIZE = 48;

		const A1_SIZE = A1_KIND_SIZE * SHAPE_SIZE;
		const A2_SIZE = A2_KIND_SIZE * SHAPE_SIZE;
		const A3_SIZE = A3_KIND_SIZE * SHAPE_SIZE;
		const A4_SIZE = A4_KIND_SIZE * SHAPE_SIZE;
		const A1_START_ID = START_ID;
		const A1_END_ID = A1_START_ID + A1_SIZE;
		const A2_START_ID = A1_END_ID;
		const A2_END_ID = A2_START_ID + A2_SIZE;
		const A3_START_ID = A2_END_ID;
		const A3_END_ID = A3_START_ID + A3_SIZE;
		const A4_START_ID = A3_END_ID;
		const A4_END_ID = A4_START_ID + A4_SIZE;
		const END_ID = A4_END_ID;

		const kind = id => Math.floor((id - START_ID) / SHAPE_SIZE);
		const shape = id => (id - START_ID) % SHAPE_SIZE;
		const make = (kind, shape) => START_ID + kind * SHAPE_SIZE + shape;
		const is = id => id >= START_ID && id < END_ID;
		const isA1 = id => id >= A1_START_ID && id < A1_END_ID;
		const isA2 = id => id >= A2_START_ID && id < A2_END_ID;
		const isA3 = id => id >= A3_START_ID && id < A3_END_ID;
		const isA4 = id => id >= A4_START_ID && id < A4_END_ID;

		return { kind, shape, make, is, isA1, isA2, isA3, isA4 };
	})();

	const isA1BlockCKind = kind => kind === 2 || kind === 3;

	const isA1BlockCTile = id => Autotile.isA1(id) && isA1BlockCKind(Autotile.kind(id));

	const waterfallShape = (map, x, y, z) => {
		const { width, height, data } = map;
		const index = x + y * width + z * width * height;
		const kind = Autotile.kind(data[index]);
		const w = width - 1;
		const l = x === 0 || Autotile.kind(data[index - 1]) === kind ? 0 : 0x01;
		const r = x === w || Autotile.kind(data[index + 1]) === kind ? 0 : 0x02;
		return l | r;
	};

	const Tilemap__addAutotile = Tilemap.prototype._addAutotile;
	Tilemap.prototype._addAutotile = function (layer, tileId, dx, dy) {
		if (this.hasSpecialA1Tile) {
			const kind = Tilemap.getAutotileKind(tileId);
			const shape = Tilemap.getAutotileShape(tileId);
			const tx = kind % 8;
			const ty = Math.floor(kind / 8);
			let setNumber = 0;
			let bx = 0;
			let by = 0;
			let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
			let isTable = false;

			if (Tilemap.isTileA1(tileId)) {
				const waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
				setNumber = 0;
				if (kind === 0) {
					bx = waterSurfaceIndex * 2;
					by = 0;
				} else if (kind === 1) {
					bx = waterSurfaceIndex * 2;
					by = 3;
				} else if (kind === 2) {
					bx = 6;
					by = 0 + waterSurfaceIndex;
					autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
				} else if (kind === 3) {
					bx = 6;
					by = 3 + waterSurfaceIndex;
					autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
				} else {
					bx = Math.floor(tx / 4) * 8;
					by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;
					if (kind % 2 === 0) {
						bx += waterSurfaceIndex * 2;
					} else {
						bx += 6;
						by += waterSurfaceIndex;
						autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;
					}
				}
			} else if (Tilemap.isTileA2(tileId)) {
				setNumber = 1;
				bx = tx * 2;
				by = (ty - 2) * 3;
				isTable = this._isTableTile(tileId);
			} else if (Tilemap.isTileA3(tileId)) {
				setNumber = 2;
				bx = tx * 2;
				by = (ty - 6) * 2;
				autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
			} else if (Tilemap.isTileA4(tileId)) {
				setNumber = 3;
				bx = tx * 2;
				by = Math.floor((ty - 10) * 2.5 + (ty % 2 === 1 ? 0.5 : 0));
				if (ty % 2 === 1) {
					autotileTable = Tilemap.WALL_AUTOTILE_TABLE;
				}
			}

			const table = autotileTable[shape];
			const w1 = this._tileWidth / 2;
			const h1 = this._tileHeight / 2;
			for (let i = 0; i < 4; i++) {
				const qsx = table[i][0];
				const qsy = table[i][1];
				const sx1 = (bx * 2 + qsx) * w1;
				const sy1 = (by * 2 + qsy) * h1;
				const dx1 = dx + (i % 2) * w1;
				const dy1 = dy + Math.floor(i / 2) * h1;
				if (isTable && (qsy === 1 || qsy === 5)) {
					const qsx2 = qsy === 1 ? (4 - qsx) % 4 : qsx;
					const qsy2 = 3;
					const sx2 = (bx * 2 + qsx2) * w1;
					const sy2 = (by * 2 + qsy2) * h1;
					layer.addRect(setNumber, sx2, sy2, dx1, dy1, w1, h1);
					layer.addRect(setNumber, sx1, sy1, dx1, dy1 + h1 / 2, w1, h1 / 2);
				} else {
					layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1);
				}
			}
		} else {
			Tilemap__addAutotile.apply(this, arguments);
		}
	};

	const Spriteset_Map_loadTileset = Spriteset_Map.prototype.loadTileset;
	Spriteset_Map.prototype.loadTileset = function () {
		Spriteset_Map_loadTileset.apply(this, arguments);

		this._tilemap.hasSpecialA1Tile = hasSpecialA1Tile(this._tileset);
	};

	const Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
	Scene_Map.prototype.onMapLoaded = function () {
		this.fixAutotileForSpecialA1Tile();

		Scene_Map_onMapLoaded.apply(this, arguments);
	};

	Scene_Map.prototype.fixAutotileForSpecialA1Tile = function () {
		const { width, height, data, tilesetId } = $dataMap;
		const tileset = $dataTilesets[tilesetId];
		if (hasSpecialA1Tile(tileset)) {
			const map = { width, height, data };
			const dst = data.slice();
			const size = width * height;
			for (let i = 0; i < size; i++) {
				const layer0 = size * 0 + i;
				const layer1 = size * 1 + i;
				const tileId1 = data[layer1];
				if (isA1BlockCTile(tileId1)) {
					const x = i % width;
					const y = Math.floor(i / width);
					const kind = Autotile.kind(tileId1);
					const shape = waterfallShape(map, x, y, 1);
					const id = Autotile.make(kind, shape);
					dst[layer0] = id;
					dst[layer1] = 0;
				}
			}
			$dataMap.data = dst;
		}
	};
}