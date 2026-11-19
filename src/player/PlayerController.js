import * as THREE from 'three';
import { Config } from '../core/Config.js';
import { LearningEvents } from '../learning/LearningEvents.js';
import { PlayerAnimation } from './PlayerAnimation.js';

export class PlayerController {
  constructor(scene, eventBus, blockManager) {
    this.scene = scene;
    this.eventBus = eventBus;
    this.blockManager = blockManager;

    this.animation = new PlayerAnimation();
    this.mesh = this.animation.root;
    if (this.scene) {
      this.scene.add(this.mesh);
    }

    this.position = new THREE.Vector3(...Config.PLAYER.START_POS);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.radius = Config.PLAYER.RADIUS;
    this.height = Config.PLAYER.HEIGHT;
    this.onGround = false;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
      sprint: false
    };

    this.controlsEnabled = true;
    this.runTimer = 0;
    this._bindKeyboard();
    this.resetPosition(Config.PLAYER.START_POS);
  }

  _bindKeyboard() {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (e) => {
      if (!this.controlsEnabled) return;
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'Space':
          e.preventDefault();
          this.keys.jump = true;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.sprint = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'Space':
          this.keys.jump = false;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          this.keys.sprint = false;
          break;
      }
    });
  }

  resetPosition(posArray = Config.PLAYER.START_POS) {
    const [x, y, z] = posArray;
    const topY = this.blockManager ? Math.max(y, this.blockManager.getHighestSolidY(x, z)) : y;
    this.position.set(x, topY, z);
    this.velocity.set(0, 0, 0);
    this.mesh.position.copy(this.position);
  }

  update(dt, cameraYaw = 0) {
    const safeDt = Math.min(dt, 0.05);

    // 1. Horizontal movement input relative to camera yaw
    let inputX = 0;
    let inputZ = 0;
    if (this.controlsEnabled) {
      if (this.keys.forward) inputZ -= 1;
      if (this.keys.backward) inputZ += 1;
      if (this.keys.left) inputX -= 1;
      if (this.keys.right) inputX += 1;
    }

    const moveVec = new THREE.Vector3(inputX, 0, inputZ);
    const isMoving = moveVec.lengthSq() > 0;
    const speed = this.keys.sprint ? Config.PLAYER.RUN_SPEED : Config.PLAYER.WALK_SPEED;

    if (isMoving) {
      moveVec.normalize();
      moveVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraYaw);
      this.velocity.x = moveVec.x * speed;
      this.velocity.z = moveVec.z * speed;

      // Smoothly rotate character to face movement direction
      const targetAngle = Math.atan2(moveVec.x, moveVec.z);
      this.mesh.rotation.y = targetAngle;
    } else {
      this.velocity.x = 0;
      this.velocity.z = 0;
    }

    // 2. Jump
    if (this.controlsEnabled && this.keys.jump && this.onGround) {
      this.velocity.y = Config.PLAYER.JUMP_FORCE;
      this.onGround = false;
      if (this.eventBus) {
        this.eventBus.emit(LearningEvents.PLAYER_JUMPED, {
          position: this.getPositionArray()
        });
      }
    }

    // 3. Gravity
    this.velocity.y -= Config.PLAYER.GRAVITY * safeDt;
    const preMoveVy = this.velocity.y;

    // 4. Apply movement with voxel collision
    const wasOnGround = this.onGround;
    this._moveAndCollide(safeDt);

    if (!wasOnGround && this.onGround && preMoveVy < -3.5) {
      this.animation.triggerLandingReaction();
    }

    // Clamp to world boundaries & safe respawn if fallen
    const maxW = Config.WORLD.WIDTH - 1.5;
    const maxD = Config.WORLD.DEPTH - 1.5;
    this.position.x = Math.max(1.5, Math.min(maxW, this.position.x));
    this.position.z = Math.max(1.5, Math.min(maxD, this.position.z));
    if (this.position.y < -2) {
      this.resetPosition(Config.PLAYER.START_POS);
    }

    this.mesh.position.copy(this.position);

    // 5. Update character animation state & run learning event
    let animState = 'idle';
    if (!this.onGround) {
      animState = 'jump';
    } else if (isMoving) {
      animState = this.keys.sprint ? 'run' : 'walk';
    }

    if (isMoving && this.keys.sprint) {
      if (this.onGround) {
        this.runTimer += safeDt;
        while (this.runTimer >= 1.0) {
          this.runTimer -= 1.0;
          if (this.eventBus) {
            this.eventBus.emit(LearningEvents.PLAYER_RAN, {
              position: this.getPositionArray()
            });
          }
        }
      }
    } else {
      this.runTimer = 0;
    }

    this.animation.update(safeDt, animState);
  }

  _moveAndCollide(dt) {
    // Move X
    const nextX = this.position.x + this.velocity.x * dt;
    if (!this._checkCollisionAt(nextX, this.position.y, this.position.z, false)) {
      this.position.x = nextX;
    } else {
      this.velocity.x = 0;
    }

    // Move Z
    const nextZ = this.position.z + this.velocity.z * dt;
    if (!this._checkCollisionAt(this.position.x, this.position.y, nextZ, false)) {
      this.position.z = nextZ;
    } else {
      this.velocity.z = 0;
    }

    // Move Y
    const nextY = this.position.y + this.velocity.y * dt;
    if (!this._checkCollisionAt(this.position.x, nextY, this.position.z, true)) {
      this.position.y = nextY;
      this.onGround = false;
    } else {
      if (this.velocity.y <= 0) {
        this.position.y = Math.floor(nextY) + 1;
        this.onGround = true;
      }
      this.velocity.y = 0;
    }
  }

  _checkCollisionAt(px, py, pz, isVertical = false) {
    if (!this.blockManager) return py < 1;

    const r = this.radius;
    const h = this.height;
    const minX = Math.floor(px - r);
    const maxX = Math.floor(px + r);
    const minY = isVertical ? Math.floor(py) : Math.floor(py + 0.001);
    const maxY = Math.floor(py + h - 0.05);
    const minZ = Math.floor(pz - r);
    const maxZ = Math.floor(pz + r);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          if (this.blockManager.isSolid(x, y, z)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getPositionArray() {
    return [
      Number(this.position.x.toFixed(2)),
      Number(this.position.y.toFixed(2)),
      Number(this.position.z.toFixed(2))
    ];
  }
}
