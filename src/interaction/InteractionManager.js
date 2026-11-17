import * as THREE from 'three';
import { Config } from '../core/Config.js';
import { LearningEvents } from '../learning/LearningEvents.js';

export class InteractionManager {
  constructor(
    scene,
    camera,
    domElement,
    eventBus,
    blockManager,
    objectManager,
    inventoryManager,
    playerController,
    cameraController
  ) {
    this.scene = scene;
    this.camera = camera;
    this.domElement = domElement;
    this.eventBus = eventBus;
    this.blockManager = blockManager;
    this.objectManager = objectManager;
    this.inventoryManager = inventoryManager;
    this.playerController = playerController;
    this.cameraController = cameraController;

    this.raycaster = new THREE.Raycaster();
    this.raycaster.far = Config.INTERACTION.MAX_DISTANCE;
    this.mouseNDC = new THREE.Vector2(0, 0);

    this.enabled = true;
    this.currentTarget = null; // { type: 'object' | 'block', ... }

    // Hold-to-break state
    this.isLeftDown = false;
    this.leftDownTime = 0;
    this.breakCompleted = false;
    this.downMousePos = { x: 0, y: 0 };

    // 3D selection highlight wireframe box
    this.highlightMesh = this._createHighlightMesh();
    if (this.scene) {
      this.scene.add(this.highlightMesh);
    }

    this._bindEvents();
  }

  _createHighlightMesh() {
    const geo = new THREE.BoxGeometry(1.04, 1.04, 1.04);
    const edges = new THREE.EdgesGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color: 0xfef08a, linewidth: 2 });
    const line = new THREE.LineSegments(edges, mat);
    line.visible = false;
    return line;
  }

  _bindEvents() {
    if (!this.domElement) return;

    // Suppress browser context menu on right-click (Section 3.3 & 17.4)
    this.domElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    this.domElement.addEventListener('mousemove', (e) => {
      if (!this.enabled) return;
      const rect = this.domElement.getBoundingClientRect();
      this.mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    this.domElement.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      this._updateRaycast();

      if (e.button === 0) {
        // Left mouse button: click to select/interact, hold to break block or harvest tree
        this.isLeftDown = true;
        this.leftDownTime = performance.now();
        this.breakCompleted = false;
        this.downMousePos = { x: e.clientX, y: e.clientY };
      } else if (e.button === 2) {
        // Right mouse button: place selected block
        this._handleRightClick();
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (!this.enabled) return;
      if (e.button === 0 && this.isLeftDown) {
        const heldMs = performance.now() - this.leftDownTime;
        const movedDist = Math.hypot(e.clientX - this.downMousePos.x, e.clientY - this.downMousePos.y);
        this.isLeftDown = false;

        // If released before hold threshold and didn't drag camera far, treat as short click selection
        if (!this.breakCompleted && heldMs < Config.INTERACTION.BREAK_HOLD_MS && movedDist < 18) {
          this._handleShortLeftClick();
        }
      }
    });

    // Mouse wheel: switch inventory slot (or zoom camera if Shift/Ctrl held)
    this.domElement.addEventListener('wheel', (e) => {
      if (!this.enabled) return;
      e.preventDefault();
      if (e.ctrlKey || e.shiftKey) {
        if (this.cameraController) {
          this.cameraController.zoom(Math.sign(e.deltaY));
        }
      } else if (this.inventoryManager) {
        this.inventoryManager.cycleSlot(Math.sign(e.deltaY));
      }
    }, { passive: false });

    // Number keys 1..9 for inventory slot selection
    window.addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      if (e.code.startsWith('Digit')) {
        const num = parseInt(e.code.replace('Digit', ''), 10);
        if (num >= 1 && num <= 9 && this.inventoryManager) {
          this.inventoryManager.selectSlot(num - 1);
        }
      }
    });
  }

  _updateRaycast() {
    if (!this.camera || !this.blockManager || !this.objectManager) return;

    this.raycaster.setFromCamera(this.mouseNDC, this.camera);

    // 1. Check interactive objects first
    const objHits = this.raycaster.intersectObjects(this.objectManager.group.children, true);
    let closestObjHit = null;
    for (const hit of objHits) {
      if (hit.object?.userData?.isInteractiveObject) {
        closestObjHit = hit;
        break;
      }
    }

    // 2. Check voxel blocks
    const blockHits = this.raycaster.intersectObjects(this.blockManager.group.children, false);
    const closestBlockHit = blockHits.length > 0 ? this.blockManager.resolveRaycastHit(blockHits[0]) : null;

    if (closestObjHit && (!closestBlockHit || closestObjHit.distance <= closestBlockHit.distance + 0.2)) {
      const uid = closestObjHit.object.userData.uid;
      const objectId = closestObjHit.object.userData.objectId;
      const inst = this.objectManager.objects.get(uid);
      this.currentTarget = {
        type: 'object',
        uid,
        id: objectId,
        position: inst ? inst.position : [0, 0, 0],
        distance: closestObjHit.distance
      };
      this.objectManager.setHovered(uid);
      if (inst) {
        this.highlightMesh.position.set(inst.position[0] + 0.5, inst.position[1] + 0.5, inst.position[2] + 0.5);
        this.highlightMesh.visible = true;
      }
    } else if (closestBlockHit) {
      this.objectManager.setHovered(null);
      this.currentTarget = closestBlockHit;
      const [bx, by, bz] = closestBlockHit.position;
      this.highlightMesh.position.set(bx + 0.5, by + 0.5, bz + 0.5);
      this.highlightMesh.visible = true;

      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.OBJECT_DISCOVERED, {
          id: closestBlockHit.blockId
        });
      }
    } else {
      this.objectManager.setHovered(null);
      this.currentTarget = null;
      this.highlightMesh.visible = false;
    }
  }

  _handleShortLeftClick() {
    this._updateRaycast();
    if (!this.currentTarget) return;

    if (this.currentTarget.type === 'object') {
      this.objectManager.interactWithObject(this.currentTarget.uid, false);
    } else if (this.currentTarget.type === 'block') {
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.OBJECT_SELECTED, {
          id: this.currentTarget.blockId,
          position: this.currentTarget.position
        });
      }
    }
  }

  _handleHoldBreak() {
    this._updateRaycast();
    if (!this.currentTarget) return;

    if (this.currentTarget.type === 'object' && this.currentTarget.id === 'tree') {
      // Break tree to obtain Wood (Section 14.2 step 4)
      this.objectManager.interactWithObject(this.currentTarget.uid, true);
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.BLOCK_DESTROYED, { blockId: 'wood' });
      }
    } else if (this.currentTarget.type === 'block') {
      const [bx, by, bz] = this.currentTarget.position;
      const dropItem = this.blockManager.removeBlock(bx, by, bz);
      if (dropItem && this.inventoryManager) {
        this.inventoryManager.addItem(dropItem, 1);
      }
    }
  }

  _handleRightClick() {
    this._updateRaycast();
    if (!this.currentTarget || !this.inventoryManager) return;

    const selected = this.inventoryManager.getSelectedItem();
    if (!selected || selected.count <= 0) return;

    // If right-clicking a farm plot with seed or water
    if (this.currentTarget.type === 'object' && this.currentTarget.id === 'farm_plot') {
      this.objectManager.interactWithObject(this.currentTarget.uid, false);
      return;
    }

    if (!selected.placeable || !selected.blockId) return;

    let targetX, targetY, targetZ;
    if (this.currentTarget.type === 'block') {
      const [bx, by, bz] = this.currentTarget.position;
      const n = this.currentTarget.normal;
      targetX = bx + Math.round(n.x);
      targetY = by + Math.round(n.y);
      targetZ = bz + Math.round(n.z);
    } else if (this.currentTarget.type === 'object') {
      const [ox, oy, oz] = this.currentTarget.position;
      targetX = Math.floor(ox);
      targetY = Math.floor(oy) + 1;
      targetZ = Math.floor(oz);
    } else {
      return;
    }

    const playerPos = this.playerController ? this.playerController.position : null;
    const placed = this.blockManager.placeBlock(targetX, targetY, targetZ, selected.blockId, playerPos);
    if (placed) {
      this.inventoryManager.removeItem(selected.id, 1);
    }
  }

  getBreakProgress() {
    if (!this.isLeftDown || this.breakCompleted || !this.currentTarget) return 0;
    const elapsed = performance.now() - this.leftDownTime;
    return Math.min(1, elapsed / Config.INTERACTION.BREAK_HOLD_MS);
  }

  update() {
    if (!this.enabled) return;
    this._updateRaycast();

    if (this.isLeftDown && !this.breakCompleted) {
      const elapsed = performance.now() - this.leftDownTime;
      if (elapsed >= Config.INTERACTION.BREAK_HOLD_MS) {
        this.breakCompleted = true;
        this._handleHoldBreak();
      }
    }
  }
}
