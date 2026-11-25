import * as THREE from 'three';
import { TerrainGenerator } from './TerrainGenerator.js';
import { BlockManager } from './BlockManager.js';
import { ObjectManager } from './ObjectManager.js';

export class WorldManager {
  constructor(scene, eventBus, blockDefs = [], objectDefs = [], inventoryManager = null) {
    this.scene = scene;
    this.eventBus = eventBus;
    this.terrainGenerator = new TerrainGenerator();
    this.blockManager = new BlockManager(scene, eventBus, blockDefs);
    this.objectManager = new ObjectManager(scene, eventBus, objectDefs, inventoryManager);

    this.baseWorldData = null;
    this.currentStageId = 'island';
    this.stageStates = {}; // stageId -> { blocks, farmPlots, collectedObjectIds }
    this.cloudsGroup = new THREE.Group();
    this.createdAt = Date.now();

    if (this.scene) {
      this._setupEnvironment();
    }
  }

  _setupEnvironment() {
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.008);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x90d590, 0.85);
    hemiLight.position.set(0, 40, 0);
    this.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.05);
    dirLight.position.set(42, 48, 36);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 120;
    const d = 40;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    this.scene.add(dirLight);

    // Friendly sun sphere in the sky
    const sunMesh = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfde047 })
    );
    sunMesh.position.set(46, 38, 12);
    this.scene.add(sunMesh);

    // Fluffy voxel clouds
    const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.92 });
    const cloudSpots = [
      [16, 18, 18], [34, 20, 26], [48, 19, 40], [20, 21, 46], [42, 18, 14]
    ];
    for (const [cx, cy, cz] of cloudSpots) {
      const cg = new THREE.Group();
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.2, 3.0), cloudMat);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.4, 2.2), cloudMat);
      b2.position.set(0.8, 0.5, 0);
      cg.add(b1, b2);
      cg.position.set(cx, cy, cz);
      this.cloudsGroup.add(cg);
    }
    this.scene.add(this.cloudsGroup);
  }

  _captureCurrentStageSnapshot() {
    return {
      blocks: this.blockManager.getModifiedBlocksArray(),
      farmPlots: this.objectManager.getFarmPlotStates(),
      collectedObjectIds: this.objectManager.getCollectedUids()
    };
  }

  _loadStage(stageId, savedStageState = null) {
    this.currentStageId = stageId === 'town' ? 'town' : 'island';
    this.baseWorldData = this.terrainGenerator.generate(this.currentStageId);

    this.blockManager.loadInitialBlocks(
      this.baseWorldData.blocks,
      this.baseWorldData.riverCoords,
      this.baseWorldData.tableAnchor,
      this.currentStageId
    );
    if (savedStageState && Array.isArray(savedStageState.blocks)) {
      this.blockManager.applyModifiedBlocks(savedStageState.blocks);
    }

    this.objectManager.spawnObjects(
      this.baseWorldData.objects,
      savedStageState?.collectedObjectIds || [],
      savedStageState?.farmPlots || []
    );

    if (this.scene) {
      const skyHex = this.currentStageId === 'town' ? 0x93d5ff : 0x87ceeb;
      this.scene.background = new THREE.Color(skyHex);
      if (this.scene.fog && this.scene.fog.color) {
        this.scene.fog.color.setHex(skyHex);
      }
    }
  }

  buildNewWorld(stageId = 'island') {
    this.createdAt = Date.now();
    this.stageStates = {};
    this._loadStage(stageId, null);
  }

  switchStage(targetStageId) {
    const nextStage = targetStageId === 'town' ? 'town' : 'island';
    if (this.baseWorldData) {
      this.stageStates[this.currentStageId] = this._captureCurrentStageSnapshot();
    }
    this._loadStage(nextStage, this.stageStates[nextStage] || null);
    return this.currentStageId;
  }

  restoreWorld(savedWorld = {}) {
    this.createdAt = savedWorld.createdAt || Date.now();
    const targetStage = savedWorld.currentStageId === 'town' ? 'town' : 'island';
    this.stageStates = savedWorld.stages && typeof savedWorld.stages === 'object'
      ? { ...savedWorld.stages }
      : {};

    const stageData = this.stageStates[targetStage] || {
      blocks: savedWorld.blocks || [],
      farmPlots: savedWorld.farmPlots || [],
      collectedObjectIds: savedWorld.collectedObjectIds || []
    };
    this._loadStage(targetStage, stageData);
  }

  resetObjects() {
    if (!this.baseWorldData) {
      this.baseWorldData = this.terrainGenerator.generate(this.currentStageId);
    }
    this.objectManager.spawnObjects(this.baseWorldData.objects, [], []);
    this.stageStates[this.currentStageId] = this._captureCurrentStageSnapshot();
  }

  update(dt) {
    this.objectManager.update(dt);
    // Gentle cloud drift
    for (const cloud of this.cloudsGroup.children) {
      cloud.position.x += dt * 0.45;
      if (cloud.position.x > 66) {
        cloud.position.x = -4;
      }
    }
  }

  getSerializedState() {
    const currentSnapshot = this._captureCurrentStageSnapshot();
    const stages = {
      ...this.stageStates,
      [this.currentStageId]: currentSnapshot
    };
    return {
      id: 'world_001',
      currentStageId: this.currentStageId,
      blocks: currentSnapshot.blocks,
      farmPlots: currentSnapshot.farmPlots,
      collectedObjectIds: currentSnapshot.collectedObjectIds,
      stages,
      createdAt: this.createdAt,
      updatedAt: Date.now()
    };
  }
}
