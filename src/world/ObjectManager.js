import * as THREE from 'three';
import { LearningEvents } from '../learning/LearningEvents.js';

const GROWTH_STAGE_NAMES = ['Empty', 'Seed', 'Sprout', 'Plant', 'Flower'];

export class ObjectManager {
  constructor(scene, eventBus, objectDefs = [], inventoryManager = null) {
    this.scene = scene;
    this.eventBus = eventBus;
    this.inventoryManager = inventoryManager;

    this.objectDefs = new Map();
    objectDefs.forEach(o => this.objectDefs.set(o.id, o));

    this.objects = new Map(); // uid -> objectInstance
    this.collectedUids = new Set();

    this.group = new THREE.Group();
    this.group.name = 'InteractiveObjectsGroup';
    if (this.scene) {
      this.scene.add(this.group);
    }

    this.hoveredUid = null;
    this.selectedUid = null;
  }

  getObjectDef(id) {
    return this.objectDefs.get(id) || null;
  }

  spawnObjects(objectList = [], savedCollected = [], savedFarmPlots = []) {
    // Clear existing
    for (const inst of this.objects.values()) {
      if (inst.mesh) this.group.remove(inst.mesh);
    }
    this.objects.clear();
    this.collectedUids = new Set(savedCollected);
    this.hoveredUid = null;
    this.selectedUid = null;

    const farmStageMap = new Map();
    if (Array.isArray(savedFarmPlots)) {
      savedFarmPlots.forEach(p => farmStageMap.set(p.uid, p.growthStage));
    }

    for (const item of objectList) {
      if (this.collectedUids.has(item.uid)) continue;
      const def = this.objectDefs.get(item.id);
      if (!def) continue;

      const stage = farmStageMap.has(item.uid)
        ? farmStageMap.get(item.uid)
        : (item.growthStage || 0);

      const mesh = this._createMeshForObject(item.id, def, stage);
      mesh.position.set(item.position[0] + 0.5, item.position[1], item.position[2] + 0.5);
      mesh.userData = {
        isInteractiveObject: true,
        uid: item.uid,
        objectId: item.id
      };
      // Propagate userData to children for raycasting
      mesh.traverse(child => {
        child.userData = {
          isInteractiveObject: true,
          uid: item.uid,
          objectId: item.id
        };
      });

      this.group.add(mesh);

      this.objects.set(item.uid, {
        uid: item.uid,
        id: item.id,
        def,
        position: [...item.position],
        baseY: item.position[1],
        state: 'Idle',
        mesh,
        growthStage: stage,
        signalState: item.signalState !== undefined ? item.signalState : 0,
        growthTimer: 0,
        bounceTimer: 0,
        animPhase: Math.random() * Math.PI * 2
      });
    }
  }

  _createMeshForObject(id, def, growthStage = 0) {
    const root = new THREE.Group();

    if (id === 'apple') {
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.32, 14, 14),
        new THREE.MeshLambertMaterial({ color: 0xef4444 })
      );
      body.position.y = 0.32;
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.16, 6),
        new THREE.MeshLambertMaterial({ color: 0x78350f })
      );
      stem.position.y = 0.65;
      root.add(body, stem);
    } else if (id === 'tree') {
      const trunk = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 2.2, 0.6),
        new THREE.MeshLambertMaterial({ color: 0x8b5a2b })
      );
      trunk.position.y = 1.1;
      const leaves1 = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.4, 2.2),
        new THREE.MeshLambertMaterial({ color: 0x22c55e })
      );
      leaves1.position.y = 2.6;
      const leaves2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 1.0, 1.4),
        new THREE.MeshLambertMaterial({ color: 0x4ade80 })
      );
      leaves2.position.y = 3.6;
      root.add(trunk, leaves1, leaves2);
    } else if (id.startsWith('flower_')) {
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.45, 6),
        new THREE.MeshLambertMaterial({ color: 0x16a34a })
      );
      stem.position.y = 0.22;
      const petalColor = new THREE.Color(def.color || '#f43f5e');
      const head = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.18, 0.16, 8),
        new THREE.MeshLambertMaterial({ color: petalColor })
      );
      head.position.y = 0.48;
      const center = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshLambertMaterial({ color: 0xfef08a })
      );
      center.position.y = 0.56;
      root.add(stem, head, center);
    } else if (id === 'mushroom') {
      const stalk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.15, 0.35, 8),
        new THREE.MeshLambertMaterial({ color: 0xfef3c7 })
      );
      stalk.position.y = 0.17;
      const cap = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 0.28, 10),
        new THREE.MeshLambertMaterial({ color: 0xf43f5e })
      );
      cap.position.y = 0.42;
      root.add(stalk, cap);
    } else if (id === 'seed_item') {
      const seedMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 10, 10),
        new THREE.MeshLambertMaterial({ color: 0x84cc16 })
      );
      seedMesh.position.y = 0.25;
      root.add(seedMesh);
    } else if (id === 'farm_plot') {
      const soil = new THREE.Mesh(
        new THREE.BoxGeometry(0.92, 0.16, 0.92),
        new THREE.MeshLambertMaterial({ color: 0x5c3a21 })
      );
      soil.position.y = 0.08;
      root.add(soil);

      const plantGroup = this._buildPlantStageMesh(growthStage);
      plantGroup.name = 'PlantStageMesh';
      root.add(plantGroup);
    } else if (['cow', 'sheep', 'chicken', 'dog', 'cat', 'fish'].includes(id)) {
      root.add(this._buildAnimalMesh(id, def.color));
    } else if (id === 'shape_sphere') {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 20, 20),
        new THREE.MeshLambertMaterial({ color: 0xa855f7 })
      );
      m.position.y = 0.65;
      root.add(m);
    } else if (id === 'shape_cylinder') {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.5, 1.4, 18),
        new THREE.MeshLambertMaterial({ color: 0xf97316 })
      );
      m.position.y = 0.7;
      root.add(m);
    } else if (id === 'shape_triangle') {
      const m = new THREE.Mesh(
        new THREE.ConeGeometry(0.65, 1.3, 4),
        new THREE.MeshLambertMaterial({ color: 0xeab308 })
      );
      m.position.y = 0.65;
      root.add(m);
    } else if (id === 'shape_cube') {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 1.1, 1.1),
        new THREE.MeshLambertMaterial({ color: 0x3b82f6 })
      );
      m.position.y = 0.55;
      root.add(m);
    } else if (id === 'table_box') {
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.2, 1.8),
        new THREE.MeshLambertMaterial({ color: 0xd97706 })
      );
      top.position.y = 0.9;
      root.add(top);
      const legOffsets = [[-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7]];
      for (const [lx, lz] of legOffsets) {
        const leg = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.8, 0.2),
          new THREE.MeshLambertMaterial({ color: 0x92400e })
        );
        leg.position.set(lx, 0.4, lz);
        root.add(leg);
      }
    } else if (id === 'car') {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.5, 2.1),
        new THREE.MeshLambertMaterial({ color: 0xef4444 })
      );
      body.position.y = 0.45;
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.45, 1.0),
        new THREE.MeshLambertMaterial({ color: 0xbae6fd })
      );
      cabin.position.set(0, 0.9, -0.1);
      const wheelMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
      for (const [wx, wz] of [[-0.65, -0.65], [0.65, -0.65], [-0.65, 0.65], [0.65, 0.65]]) {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.4, 0.4), wheelMat);
        w.position.set(wx, 0.2, wz);
        root.add(w);
      }
      root.add(body, cabin);
    } else if (id === 'bus') {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.2, 3.0),
        new THREE.MeshLambertMaterial({ color: 0xfacc15 })
      );
      body.position.y = 0.85;
      const windowBand = new THREE.Mesh(
        new THREE.BoxGeometry(1.54, 0.4, 2.4),
        new THREE.MeshLambertMaterial({ color: 0x38bdf8 })
      );
      windowBand.position.y = 1.05;
      const wheelMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
      for (const [wx, wz] of [[-0.75, -0.95], [0.75, -0.95], [-0.75, 0.95], [0.75, 0.95]]) {
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.45, 0.45), wheelMat);
        w.position.set(wx, 0.24, wz);
        root.add(w);
      }
      root.add(body, windowBand);
    } else if (id === 'bicycle') {
      const wheelMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
      const w1 = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 12), wheelMat);
      w1.rotation.z = Math.PI / 2;
      w1.position.set(0, 0.3, -0.42);
      const w2 = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.1, 12), wheelMat);
      w2.rotation.z = Math.PI / 2;
      w2.position.set(0, 0.3, 0.42);
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.4, 0.9),
        new THREE.MeshLambertMaterial({ color: 0x3b82f6 })
      );
      frame.position.set(0, 0.55, 0);
      const handle = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.08, 0.08),
        new THREE.MeshLambertMaterial({ color: 0x94a3b8 })
      );
      handle.position.set(0, 0.88, 0.35);
      root.add(w1, w2, frame, handle);
    } else if (id === 'traffic_light') {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.12, 2.2, 8),
        new THREE.MeshLambertMaterial({ color: 0x475569 })
      );
      pole.position.y = 1.1;
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 1.15, 0.45),
        new THREE.MeshLambertMaterial({ color: 0x1e293b })
      );
      box.position.y = 2.5;
      const redLamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xef4444 })
      );
      redLamp.name = 'SignalRed';
      redLamp.position.set(0, 2.82, 0.22);
      const yellowLamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x713f12 })
      );
      yellowLamp.name = 'SignalYellow';
      yellowLamp.position.set(0, 2.5, 0.22);
      const greenLamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x14532d })
      );
      greenLamp.name = 'SignalGreen';
      greenLamp.position.set(0, 2.18, 0.22);
      root.add(pole, box, redLamp, yellowLamp, greenLamp);
    } else if (id === 'bread') {
      const loaf = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.32, 0.38),
        new THREE.MeshLambertMaterial({ color: 0xd97706 })
      );
      loaf.position.y = 0.22;
      root.add(loaf);
    } else if (id === 'ice_cream') {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.22, 0.48, 10),
        new THREE.MeshLambertMaterial({ color: 0xf59e0b })
      );
      cone.rotation.x = Math.PI;
      cone.position.y = 0.26;
      const scoop = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 12, 12),
        new THREE.MeshLambertMaterial({ color: 0xf472b6 })
      );
      scoop.position.y = 0.58;
      root.add(cone, scoop);
    } else if (id === 'book') {
      const cover = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.14, 0.6),
        new THREE.MeshLambertMaterial({ color: 0x2563eb })
      );
      cover.position.y = 0.16;
      const pages = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.1, 0.54),
        new THREE.MeshLambertMaterial({ color: 0xf8fafc })
      );
      pages.position.set(0.04, 0.16, 0);
      root.add(cover, pages);
    } else if (id === 'mailbox') {
      const post = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.9, 0.2),
        new THREE.MeshLambertMaterial({ color: 0x475569 })
      );
      post.position.y = 0.45;
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.55, 0.5),
        new THREE.MeshLambertMaterial({ color: 0xdc2626 })
      );
      box.position.y = 1.1;
      root.add(post, box);
    } else if (id === 'bench') {
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.14, 0.55),
        new THREE.MeshLambertMaterial({ color: 0xb45309 })
      );
      seat.position.y = 0.45;
      const back = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.45, 0.12),
        new THREE.MeshLambertMaterial({ color: 0x92400e })
      );
      back.position.set(0, 0.72, -0.22);
      const leg1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 0.48), new THREE.MeshLambertMaterial({ color: 0x334155 }));
      leg1.position.set(-0.6, 0.21, 0);
      const leg2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.42, 0.48), new THREE.MeshLambertMaterial({ color: 0x334155 }));
      leg2.position.set(0.6, 0.21, 0);
      root.add(seat, back, leg1, leg2);
    } else if (id === 'fountain') {
      const basin = new THREE.Mesh(
        new THREE.CylinderGeometry(1.25, 1.35, 0.5, 12),
        new THREE.MeshLambertMaterial({ color: 0x94a3b8 })
      );
      basin.position.y = 0.25;
      const pool = new THREE.Mesh(
        new THREE.CylinderGeometry(1.05, 1.05, 0.12, 12),
        new THREE.MeshLambertMaterial({ color: 0x38bdf8 })
      );
      pool.position.y = 0.48;
      const jet = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.32, 1.3, 10),
        new THREE.MeshLambertMaterial({ color: 0x7dd3fc })
      );
      jet.position.y = 1.0;
      root.add(basin, pool, jet);
    } else if (id === 'clock_tower') {
      const tower = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 3.6, 1.2),
        new THREE.MeshLambertMaterial({ color: 0xfef08a })
      );
      tower.position.y = 1.8;
      const face = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 0.12, 16),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
      );
      face.rotation.x = Math.PI / 2;
      face.position.set(0, 2.8, 0.62);
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.95, 1.0, 4),
        new THREE.MeshLambertMaterial({ color: 0xd97706 })
      );
      roof.position.y = 4.1;
      root.add(tower, face, roof);
    } else if (id === 'street_lamp') {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 2.8, 8),
        new THREE.MeshLambertMaterial({ color: 0x334155 })
      );
      pole.position.y = 1.4;
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xfef08a })
      );
      bulb.position.y = 2.9;
      root.add(pole, bulb);
    } else if (id === 'travel_gate') {
      const pillarL = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 2.4, 0.35),
        new THREE.MeshLambertMaterial({ color: 0x7c3aed })
      );
      pillarL.position.set(-0.9, 1.2, 0);
      const pillarR = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 2.4, 0.35),
        new THREE.MeshLambertMaterial({ color: 0x7c3aed })
      );
      pillarR.position.set(0.9, 1.2, 0);
      const topBar = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 0.4, 0.45),
        new THREE.MeshLambertMaterial({ color: 0xfacc15 })
      );
      topBar.position.set(0, 2.5, 0);
      const portalCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.55),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
      );
      portalCore.name = 'PortalCore';
      portalCore.position.set(0, 1.25, 0);
      root.add(pillarL, pillarR, topBar, portalCore);
    } else {
      const box = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.4),
        new THREE.MeshLambertMaterial({ color: new THREE.Color(def.color || '#fde047') })
      );
      box.position.y = 0.5;
      root.add(box);
    }

    root.traverse(c => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });

    return root;
  }

  _buildPlantStageMesh(stage) {
    const g = new THREE.Group();
    if (stage <= 0) return g;

    if (stage === 1) {
      // Seed
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 8, 8),
        new THREE.MeshLambertMaterial({ color: 0xd9f99d })
      );
      s.position.y = 0.2;
      g.add(s);
    } else if (stage === 2) {
      // Sprout
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, 0.38, 6),
        new THREE.MeshLambertMaterial({ color: 0x4ade80 })
      );
      stem.position.y = 0.32;
      const leaf = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.08, 0.14),
        new THREE.MeshLambertMaterial({ color: 0x22c55e })
      );
      leaf.position.y = 0.48;
      g.add(stem, leaf);
    } else if (stage === 3) {
      // Plant
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.08, 0.65, 6),
        new THREE.MeshLambertMaterial({ color: 0x16a34a })
      );
      stem.position.y = 0.45;
      const bush = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 10, 10),
        new THREE.MeshLambertMaterial({ color: 0x22c55e })
      );
      bush.position.y = 0.68;
      g.add(stem, bush);
    } else {
      // Stage 4: Blooming Flower!
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.08, 0.75, 6),
        new THREE.MeshLambertMaterial({ color: 0x16a34a })
      );
      stem.position.y = 0.48;
      const petals = new THREE.Mesh(
        new THREE.CylinderGeometry(0.38, 0.25, 0.2, 8),
        new THREE.MeshLambertMaterial({ color: 0xf43f5e })
      );
      petals.position.y = 0.88;
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 8),
        new THREE.MeshLambertMaterial({ color: 0xfacc15 })
      );
      core.position.y = 0.98;
      g.add(stem, petals, core);
    }
    return g;
  }

  _buildAnimalMesh(id, hexColor) {
    const g = new THREE.Group();
    const mainColor = new THREE.Color(hexColor || '#ffffff');

    if (id === 'fish') {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.55, 0.28, 0.22),
        new THREE.MeshLambertMaterial({ color: 0x38bdf8 })
      );
      body.position.y = 0.2;
      const tail = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.24, 0.08),
        new THREE.MeshLambertMaterial({ color: 0x0284c7 })
      );
      tail.position.set(-0.35, 0.2, 0);
      g.add(body, tail);
      return g;
    }

    const scale = id === 'cow' ? 1.15 : id === 'chicken' ? 0.65 : 0.9;
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.75 * scale, 0.55 * scale, 1.0 * scale),
      new THREE.MeshLambertMaterial({ color: mainColor })
    );
    body.position.y = 0.5 * scale;

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.5 * scale, 0.48 * scale, 0.48 * scale),
      new THREE.MeshLambertMaterial({ color: mainColor })
    );
    head.position.set(0, 0.82 * scale, 0.52 * scale);

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), eyeMat);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.05), eyeMat);
    eyeL.position.set(-0.14 * scale, 0.88 * scale, 0.76 * scale);
    eyeR.position.set(0.14 * scale, 0.88 * scale, 0.76 * scale);

    g.add(body, head, eyeL, eyeR);

    // 4 cute legs
    const legOffsets = [
      [-0.22 * scale, -0.32 * scale],
      [0.22 * scale, -0.32 * scale],
      [-0.22 * scale, 0.32 * scale],
      [0.22 * scale, 0.32 * scale]
    ];
    for (const [lx, lz] of legOffsets) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.18 * scale, 0.35 * scale, 0.18 * scale),
        new THREE.MeshLambertMaterial({ color: mainColor })
      );
      leg.position.set(lx, 0.18 * scale, lz);
      g.add(leg);
    }

    return g;
  }

  setHovered(uid) {
    if (this.hoveredUid === uid) return;

    if (this.hoveredUid && this.objects.has(this.hoveredUid)) {
      const prev = this.objects.get(this.hoveredUid);
      if (prev.state === 'Hover') prev.state = 'Idle';
      prev.mesh.scale.set(1, 1, 1);
    }

    this.hoveredUid = uid;
    if (uid && this.objects.has(uid)) {
      const inst = this.objects.get(uid);
      if (inst.state === 'Idle') inst.state = 'Hover';
      inst.mesh.scale.set(1.08, 1.08, 1.08);
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.OBJECT_DISCOVERED, {
          uid: inst.uid,
          id: inst.id,
          def: inst.def
        });
      }
    }
  }

  interactWithObject(uid, isHoldBreak = false) {
    const inst = this.objects.get(uid);
    if (!inst) return null;

    inst.state = 'Selected';
    inst.bounceTimer = 0.45;
    this.selectedUid = uid;

    // Emit OBJECT_SELECTED for learning banner + speech
    if (this.eventBus && !isHoldBreak) {
      this.eventBus.emit(LearningEvents.OBJECT_SELECTED, {
        uid: inst.uid,
        id: inst.id,
        def: inst.def
      });
    }

    const interactions = inst.def.interactions || [];

    // 1. Harvestable tree (either on hold-break or click)
    if (inst.id === 'tree' && isHoldBreak) {
      const drop = inst.def.dropItem || 'wood';
      if (this.inventoryManager) {
        this.inventoryManager.addItem(drop, 2, { alwaysEmit: true });
      }
      this._removeObjectInstance(uid, 'Destroyed');
      return { action: 'harvested', drop };
    }

    // 2. Collectible objects (apple, flower, mushroom, seed_item, star)
    if (interactions.includes('collect')) {
      const collectItemId = inst.def.collectId || inst.id;
      if (this.inventoryManager) {
        this.inventoryManager.addItem(collectItemId, 1, { alwaysEmit: true });
      }
      this._removeObjectInstance(uid, 'Collected');
      return { action: 'collected', itemId: collectItemId };
    }

    // 3. Farm plot (plant seed or water plant)
    if (inst.id === 'farm_plot') {
      return this._interactWithFarmPlot(inst);
    }

    // 4. Interactive Traffic Light (Red=Stop -> Yellow=Wait -> Green=Go)
    if (inst.id === 'traffic_light') {
      inst.signalState = ((inst.signalState || 0) + 1) % 3;
      const states = [
        { name: 'red', word: 'Stop', speech: 'Red light! Stop!' },
        { name: 'yellow', word: 'Wait', speech: 'Yellow light! Wait!' },
        { name: 'green', word: 'Go', speech: 'Green light! Go!' }
      ];
      const current = states[inst.signalState];
      const redMesh = inst.mesh.getObjectByName('SignalRed');
      const yellowMesh = inst.mesh.getObjectByName('SignalYellow');
      const greenMesh = inst.mesh.getObjectByName('SignalGreen');
      if (redMesh?.material?.color?.setHex) redMesh.material.color.setHex(inst.signalState === 0 ? 0xef4444 : 0x450a0a);
      if (yellowMesh?.material?.color?.setHex) yellowMesh.material.color.setHex(inst.signalState === 1 ? 0xfacc15 : 0x422006);
      if (greenMesh?.material?.color?.setHex) greenMesh.material.color.setHex(inst.signalState === 2 ? 0x22c55e : 0x052e16);

      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.TRAFFIC_LIGHT_CHANGED, {
          uid: inst.uid,
          signalState: inst.signalState,
          ...current
        });
      }
      return { action: 'traffic_light', signalState: inst.signalState };
    }

    // 5. Magic Travel Gate (switches between Nature Island and Sunny Town)
    if (inst.id === 'travel_gate') {
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.STAGE_SWITCH_REQUESTED, { uid: inst.uid });
      }
      return { action: 'travel' };
    }

    return { action: 'observed', id: inst.id };
  }

  _interactWithFarmPlot(inst) {
    if (inst.growthStage === 0) {
      // Plant a seed
      if (this.inventoryManager && this.inventoryManager.getItemCount('seed') > 0) {
        this.inventoryManager.removeItem('seed', 1);
      }
      this._setFarmPlotStage(inst, 1);
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.SEED_PLANTED, { uid: inst.uid });
      }
      return { action: 'planted', stage: 1 };
    } else if (inst.growthStage < 4) {
      const nextStage = inst.growthStage + 1;
      this._setFarmPlotStage(inst, nextStage);
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.PLANT_GROWN, {
          uid: inst.uid,
          stage: nextStage,
          stageName: GROWTH_STAGE_NAMES[nextStage]
        });
      }
      return { action: 'grown', stage: nextStage };
    } else {
      // Stage 4 flower ready to harvest!
      if (this.inventoryManager) {
        this.inventoryManager.addItem('flower', 1);
      }
      this._setFarmPlotStage(inst, 0);
      return { action: 'harvested_flower', stage: 0 };
    }
  }

  _setFarmPlotStage(inst, stage) {
    inst.growthStage = stage;
    inst.growthTimer = 0;
    const oldPlant = inst.mesh.getObjectByName('PlantStageMesh');
    if (oldPlant) {
      inst.mesh.remove(oldPlant);
    }
    const newPlant = this._buildPlantStageMesh(stage);
    newPlant.name = 'PlantStageMesh';
    newPlant.traverse(c => {
      c.userData = {
        isInteractiveObject: true,
        uid: inst.uid,
        objectId: inst.id
      };
    });
    inst.mesh.add(newPlant);
  }

  _removeObjectInstance(uid, finalState = 'Collected') {
    const inst = this.objects.get(uid);
    if (!inst) return;
    inst.state = finalState;
    if (inst.mesh) {
      this.group.remove(inst.mesh);
    }
    this.objects.delete(uid);
    this.collectedUids.add(uid);
  }

  update(dt) {
    for (const inst of this.objects.values()) {
      inst.animPhase += dt * 2.2;

      // Bounce reaction when selected/petted
      if (inst.bounceTimer > 0) {
        inst.bounceTimer = Math.max(0, inst.bounceTimer - dt);
        const jumpOffset = Math.sin((inst.bounceTimer / 0.45) * Math.PI) * 0.55;
        inst.mesh.position.y = inst.baseY + jumpOffset;
      } else if (inst.def.type === 'animal') {
        // Gentle idle bob and slight rotation
        if (inst.id === 'fish') {
          inst.mesh.position.y = inst.baseY + Math.sin(inst.animPhase * 1.5) * 0.08;
          inst.mesh.rotation.y = Math.sin(inst.animPhase * 0.7) * 0.5;
        } else {
          inst.mesh.position.y = inst.baseY + Math.abs(Math.sin(inst.animPhase)) * 0.06;
          inst.mesh.rotation.y = Math.sin(inst.animPhase * 0.35) * 0.35;
        }
      } else if (['apple', 'seed_item', 'bread', 'ice_cream', 'book'].includes(inst.id) || inst.id.startsWith('shape_')) {
        inst.mesh.rotation.y += dt * 0.6;
      } else if (inst.id === 'travel_gate') {
        const core = inst.mesh.getObjectByName('PortalCore');
        if (core) {
          core.rotation.y += dt * 1.8;
          core.position.y = 1.25 + Math.sin(inst.animPhase) * 0.14;
        }
      }

      // Automatic gentle plant growth over time once a seed is planted
      if (inst.id === 'farm_plot' && inst.growthStage >= 1 && inst.growthStage < 4) {
        inst.growthTimer += dt;
        if (inst.growthTimer >= 12.0) {
          this._setFarmPlotStage(inst, inst.growthStage + 1);
        }
      }
    }
  }

  getFarmPlotStates() {
    const list = [];
    for (const inst of this.objects.values()) {
      if (inst.id === 'farm_plot') {
        list.push({ uid: inst.uid, growthStage: inst.growthStage });
      }
    }
    return list;
  }

  getCollectedUids() {
    return Array.from(this.collectedUids);
  }
}
