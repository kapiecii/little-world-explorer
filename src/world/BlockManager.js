import * as THREE from 'three';
import { Config } from '../core/Config.js';
import { LearningEvents } from '../learning/LearningEvents.js';

export class BlockManager {
  constructor(scene, eventBus, blockDefs = []) {
    this.scene = scene;
    this.eventBus = eventBus;
    this.width = Config.WORLD.WIDTH;
    this.depth = Config.WORLD.DEPTH;
    this.maxHeight = Config.WORLD.MAX_HEIGHT;

    this.blockDefs = new Map();
    blockDefs.forEach(b => this.blockDefs.set(b.id, b));

    this.blocks = new Map(); // "x,y,z" -> blockId
    this.userPlacedCoords = new Set(); // "x,y,z" placed by player
    this.modifiedBlocks = new Map(); // "x,y,z" -> blockId | null (for save diff)

    this.riverCoords = new Set();
    this.tableAnchor = { x: 22, y: 3, z: 38 };
    this.stageId = 'island';

    this.group = new THREE.Group();
    this.group.name = 'VoxelBlocksGroup';
    if (this.scene) {
      this.scene.add(this.group);
    }

    this.instancedMeshes = new Map(); // blockId -> InstancedMesh
    this.instanceCoordMap = new Map(); // blockId -> Array of [x, y, z]
    this.materials = new Map();
    this.boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.flowerGeometry = new THREE.CylinderGeometry(0.28, 0.12, 0.65, 7);

    this._initMaterials();
  }

  _initMaterials() {
    for (const [id, def] of this.blockDefs.entries()) {
      const mat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(def.color || '#ffffff'),
        transparent: Boolean(def.transparent),
        opacity: def.opacity !== undefined ? def.opacity : 1.0
      });
      this.materials.set(id, mat);
    }
  }

  loadInitialBlocks(blocksMap, riverCoords = new Set(), tableAnchor = null, stageId = 'island') {
    this.blocks = new Map(blocksMap);
    this.userPlacedCoords.clear();
    this.modifiedBlocks.clear();
    this.riverCoords = riverCoords;
    this.tableAnchor = tableAnchor;
    this.stageId = stageId;
    this.rebuildMeshes();
  }

  getBlock(x, y, z) {
    return this.blocks.get(`${Math.floor(x)},${Math.floor(y)},${Math.floor(z)}`) || null;
  }

  getBlockDef(blockId) {
    return this.blockDefs.get(blockId) || null;
  }

  isSolid(x, y, z) {
    const id = this.getBlock(x, y, z);
    if (!id) return false;
    const def = this.blockDefs.get(id);
    return def ? Boolean(def.solid) : true;
  }

  isInBounds(x, y, z) {
    return (
      x >= 0 && x < this.width &&
      z >= 0 && z < this.depth &&
      y >= 0 && y < this.maxHeight
    );
  }

  wouldOverlapPlayer(bx, by, bz, playerPosition) {
    if (!playerPosition) return false;
    const px = playerPosition.x ?? playerPosition[0];
    const py = playerPosition.y ?? playerPosition[1];
    const pz = playerPosition.z ?? playerPosition[2];
    const r = Config.PLAYER.RADIUS;
    const h = Config.PLAYER.HEIGHT;

    // Block occupies [bx, bx+1], [by, by+1], [bz, bz+1]
    const overlapX = (px + r > bx + 0.05) && (px - r < bx + 0.95);
    const overlapZ = (pz + r > bz + 0.05) && (pz - r < bz + 0.95);
    const overlapY = (py + h > by + 0.05) && (py < by + 0.95);

    return overlapX && overlapY && overlapZ;
  }

  placeBlock(x, y, z, blockId, playerPosition = null) {
    const bx = Math.floor(x);
    const by = Math.floor(y);
    const bz = Math.floor(z);

    if (!this.isInBounds(bx, by, bz)) return false;
    if (!this.blockDefs.has(blockId)) return false;

    const existing = this.getBlock(bx, by, bz);
    if (existing && existing !== 'water') return false;

    if (this.wouldOverlapPlayer(bx, by, bz, playerPosition)) {
      return false;
    }

    const key = `${bx},${by},${bz}`;
    const wasRiverWater = existing === 'water' || this.riverCoords.has(`${bx},${bz}`);

    this.blocks.set(key, blockId);
    this.userPlacedCoords.add(key);
    this.modifiedBlocks.set(key, blockId);

    this.rebuildMeshes();

    // Calculate stack height of contiguous blocks at (bx, bz)
    let stackHeight = 1;
    let checkY = by - 1;
    while (checkY >= 0 && this.userPlacedCoords.has(`${bx},${checkY},${bz}`)) {
      stackHeight++;
      checkY--;
    }

    // Check spatial relation to Table object
    let spatialRelation = null;
    if (this.tableAnchor) {
      const dx = Math.abs(bx - this.tableAnchor.x);
      const dz = Math.abs(bz - this.tableAnchor.z);
      if (dx <= 1 && dz <= 1) {
        if (by >= this.tableAnchor.y + 1) {
          spatialRelation = 'on_table';
        } else if (by <= this.tableAnchor.y) {
          spatialRelation = 'under_table';
        }
      }
    }

    const isAnimalArea = this.stageId === 'island' && bx >= 36 && bz >= 32;
    const isFarmArea = this.stageId === 'island' && bx >= 36 && bz <= 25;
    const isBuildingArea = this.stageId === 'island' && bx <= 26 && bz >= 32;

    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.BLOCK_PLACED, {
        blockId,
        position: [bx, by, bz],
        stackHeight,
        spatialRelation,
        isRiverBridge: Boolean(wasRiverWater && by <= 3),
        isAnimalArea,
        isFarmArea,
        isBuildingArea,
        stageId: this.stageId
      });
    }

    return true;
  }

  removeBlock(x, y, z) {
    const bx = Math.floor(x);
    const by = Math.floor(y);
    const bz = Math.floor(z);

    if (!this.isInBounds(bx, by, bz) || by === 0) {
      // Prevent breaking bedrock layer y=0 so player cannot fall out of the island
      return null;
    }

    const key = `${bx},${by},${bz}`;
    const blockId = this.blocks.get(key);
    if (!blockId) return null;

    const def = this.blockDefs.get(blockId);
    if (def && def.breakable === false) return null;

    this.blocks.delete(key);
    this.userPlacedCoords.delete(key);
    this.modifiedBlocks.set(key, null);

    this.rebuildMeshes();

    const dropItem = def?.dropItem || blockId;
    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.BLOCK_DESTROYED, {
        blockId,
        dropItem,
        position: [bx, by, bz]
      });
    }

    return dropItem;
  }

  _isFullyOccluded(x, y, z, blockId) {
    const def = this.blockDefs.get(blockId);
    if (def?.transparent || def?.shape === 'flower') return false;

    const neighbors = [
      [x + 1, y, z], [x - 1, y, z],
      [x, y + 1, z], [x, y - 1, z],
      [x, y, z + 1], [x, y, z - 1]
    ];

    for (const [nx, ny, nz] of neighbors) {
      if (!this.isInBounds(nx, ny, nz)) return false;
      const nId = this.blocks.get(`${nx},${ny},${nz}`);
      if (!nId) return false;
      const nDef = this.blockDefs.get(nId);
      if (!nDef || nDef.transparent || nDef.shape === 'flower') return false;
    }
    return true;
  }

  rebuildMeshes() {
    if (!this.scene) return;

    // Clear previous instanced meshes
    for (const mesh of this.instancedMeshes.values()) {
      this.group.remove(mesh);
      mesh.dispose();
    }
    this.instancedMeshes.clear();
    this.instanceCoordMap.clear();

    // Group visible blocks by blockId
    const buckets = new Map();
    for (const [key, blockId] of this.blocks.entries()) {
      const [x, y, z] = key.split(',').map(Number);
      if (this._isFullyOccluded(x, y, z, blockId)) continue;

      if (!buckets.has(blockId)) {
        buckets.set(blockId, []);
      }
      buckets.get(blockId).push([x, y, z]);
    }

    const dummy = new THREE.Object3D();

    for (const [blockId, coords] of buckets.entries()) {
      if (coords.length === 0) continue;
      const def = this.blockDefs.get(blockId);
      const geom = def?.shape === 'flower' ? this.flowerGeometry : this.boxGeometry;
      const mat = this.materials.get(blockId);

      const instMesh = new THREE.InstancedMesh(geom, mat, coords.length);
      instMesh.castShadow = blockId !== 'water';
      instMesh.receiveShadow = true;
      instMesh.userData = { isVoxelInstanced: true, blockId };

      coords.forEach(([x, y, z], idx) => {
        const yOffset = blockId === 'water' ? 0.38 : 0.5;
        dummy.position.set(x + 0.5, y + yOffset, z + 0.5);
        dummy.scale.set(1, blockId === 'water' ? 0.76 : 1, 1);
        dummy.updateMatrix();
        instMesh.setMatrixAt(idx, dummy.matrix);
      });

      instMesh.instanceMatrix.needsUpdate = true;
      this.group.add(instMesh);
      this.instancedMeshes.set(blockId, instMesh);
      this.instanceCoordMap.set(blockId, coords);
    }
  }

  resolveRaycastHit(intersection) {
    if (!intersection || !intersection.object) return null;
    const obj = intersection.object;
    if (!obj.userData?.isVoxelInstanced) return null;

    const blockId = obj.userData.blockId;
    const instanceId = intersection.instanceId;
    const coordsList = this.instanceCoordMap.get(blockId);
    if (!coordsList || instanceId === undefined || !coordsList[instanceId]) return null;

    const [x, y, z] = coordsList[instanceId];
    return {
      type: 'block',
      blockId,
      position: [x, y, z],
      normal: intersection.face ? intersection.face.normal.clone() : new THREE.Vector3(0, 1, 0),
      distance: intersection.distance
    };
  }

  getHighestSolidY(x, z) {
    const bx = Math.floor(x);
    const bz = Math.floor(z);
    for (let y = this.maxHeight - 1; y >= 0; y--) {
      if (this.isSolid(bx, y, bz)) {
        return y + 1;
      }
    }
    return 1;
  }

  getModifiedBlocksArray() {
    const arr = [];
    for (const [key, blockId] of this.modifiedBlocks.entries()) {
      const [x, y, z] = key.split(',').map(Number);
      arr.push({ x, y, z, id: blockId });
    }
    return arr;
  }

  applyModifiedBlocks(diffArray = []) {
    if (!Array.isArray(diffArray)) return;
    for (const entry of diffArray) {
      if (!entry || typeof entry.x !== 'number') continue;
      const key = `${entry.x},${entry.y},${entry.z}`;
      this.modifiedBlocks.set(key, entry.id);
      if (entry.id === null) {
        this.blocks.delete(key);
        this.userPlacedCoords.delete(key);
      } else {
        this.blocks.set(key, entry.id);
        this.userPlacedCoords.add(key);
      }
    }
    this.rebuildMeshes();
  }
}
