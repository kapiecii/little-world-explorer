import * as THREE from 'three';
import { Config } from '../core/Config.js';

export class CameraController {
  constructor(camera, domElement, blockManager = null) {
    this.camera = camera;
    this.domElement = domElement;
    this.blockManager = blockManager;

    this.distance = Config.CAMERA.INITIAL_DISTANCE;
    this.height = Config.CAMERA.INITIAL_HEIGHT;
    this.yaw = 0; // Horizontal angle around player
    this.pitch = 0.38; // Vertical angle

    this.active = true;
    this.isDragging = false;
    this.lastMouseX = null;
    this.lastMouseY = null;

    this.lookTarget = new THREE.Vector3();
    this._bindEvents();
  }

  _bindEvents() {
    if (!this.domElement) return;

    this.domElement.addEventListener('mousedown', (e) => {
      if (!this.active) return;
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    this.domElement.addEventListener('mousemove', (e) => {
      if (!this.active) return;

      const dx = typeof e.movementX === 'number' && e.movementX !== 0
        ? e.movementX
        : (this.lastMouseX !== null ? e.clientX - this.lastMouseX : 0);
      const dy = typeof e.movementY === 'number' && e.movementY !== 0
        ? e.movementY
        : (this.lastMouseY !== null ? e.clientY - this.lastMouseY : 0);

      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;

      // Rotate faster when dragging or pointer-locked, or gently when moving mouse near screen edges
      if (this.isDragging || document.pointerLockElement === this.domElement) {
        this.yaw -= dx * Config.CAMERA.ROTATION_SPEED * 1.4;
        this.pitch = Math.max(
          0.12,
          Math.min(1.15, this.pitch + dy * Config.CAMERA.ROTATION_SPEED * 1.1)
        );
      } else {
        // Gentle turn when moving cursor near left/right 12% of screen
        const rect = this.domElement.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / Math.max(1, rect.width);
        if (relX < 0.12 || relX > 0.88) {
          this.yaw -= dx * Config.CAMERA.ROTATION_SPEED * 0.45;
        }
      }
    });
  }

  zoom(delta) {
    this.distance = Math.max(
      Config.CAMERA.MIN_DISTANCE,
      Math.min(Config.CAMERA.MAX_DISTANCE, this.distance + delta * 0.6)
    );
  }

  setActive(active) {
    this.active = Boolean(active);
    if (!this.active) {
      this.isDragging = false;
    }
  }

  update(playerPosition) {
    if (!this.camera || !playerPosition) return;

    this.lookTarget.set(
      playerPosition.x,
      playerPosition.y + Config.CAMERA.LOOK_AT_HEIGHT_OFFSET,
      playerPosition.z
    );

    const horizontalDist = this.distance * Math.cos(this.pitch);
    const verticalOffset = Math.max(1.2, this.distance * Math.sin(this.pitch) + (this.height - 2.0));

    let desiredX = playerPosition.x + Math.sin(this.yaw) * horizontalDist;
    let desiredY = playerPosition.y + verticalOffset;
    let desiredZ = playerPosition.z + Math.cos(this.yaw) * horizontalDist;

    // Terrain & building collision avoidance: prevent camera from going inside solid blocks
    if (this.blockManager) {
      const groundY = this.blockManager.getHighestSolidY(desiredX, desiredZ);
      if (desiredY < groundY + 0.8) {
        desiredY = groundY + 0.8;
      }
    }

    this.camera.position.lerp(new THREE.Vector3(desiredX, desiredY, desiredZ), 0.25);
    this.camera.lookAt(this.lookTarget);
  }
}
