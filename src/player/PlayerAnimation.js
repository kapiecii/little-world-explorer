import * as THREE from 'three';

export class PlayerAnimation {
  constructor() {
    this.root = new THREE.Group();
    this.bodyGroup = new THREE.Group();
    this.root.add(this.bodyGroup);

    this.head = null;
    this.torso = null;
    this.leftArm = null;
    this.rightArm = null;
    this.leftLeg = null;
    this.rightLeg = null;

    this.state = 'idle'; // 'idle' | 'walk' | 'run' | 'jump'
    this.animTime = 0;
    this.landSquashTimer = 0;

    this._buildCharacterMesh();
  }

  _buildCharacterMesh() {
    // Legs
    const legGeo = new THREE.BoxGeometry(0.24, 0.48, 0.24);
    const pantsMat = new THREE.MeshLambertMaterial({ color: 0x2563eb });
    this.leftLeg = new THREE.Mesh(legGeo, pantsMat);
    this.rightLeg = new THREE.Mesh(legGeo, pantsMat);
    this.leftLeg.position.set(-0.15, 0.24, 0);
    this.rightLeg.position.set(0.15, 0.24, 0);

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.56, 0.56, 0.34);
    const shirtMat = new THREE.MeshLambertMaterial({ color: 0xf97316 });
    this.torso = new THREE.Mesh(torsoGeo, shirtMat);
    this.torso.position.set(0, 0.76, 0);

    // Explorer Backpack
    const packGeo = new THREE.BoxGeometry(0.42, 0.42, 0.18);
    const packMat = new THREE.MeshLambertMaterial({ color: 0xb45309 });
    const pack = new THREE.Mesh(packGeo, packMat);
    pack.position.set(0, 0, -0.24);
    this.torso.add(pack);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.2, 0.48, 0.2);
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xfde68a });
    this.leftArm = new THREE.Mesh(armGeo, skinMat);
    this.rightArm = new THREE.Mesh(armGeo, skinMat);
    this.leftArm.position.set(-0.4, 0.76, 0);
    this.rightArm.position.set(0.4, 0.76, 0);

    // Cute Big Voxel Head
    const headGeo = new THREE.BoxGeometry(0.62, 0.58, 0.58);
    this.head = new THREE.Mesh(headGeo, skinMat);
    this.head.position.set(0, 1.34, 0);

    // Explorer Hat
    const hatCrown = new THREE.Mesh(
      new THREE.BoxGeometry(0.66, 0.2, 0.62),
      new THREE.MeshLambertMaterial({ color: 0xfacc15 })
    );
    hatCrown.position.set(0, 0.32, 0);
    const hatBrim = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.08, 0.78),
      new THREE.MeshLambertMaterial({ color: 0xeab308 })
    );
    hatBrim.position.set(0, 0.22, 0.06);
    this.head.add(hatCrown, hatBrim);

    // Friendly Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 0.05), eyeMat);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 0.05), eyeMat);
    eyeL.position.set(-0.15, 0.02, 0.3);
    eyeR.position.set(0.15, 0.02, 0.3);
    this.head.add(eyeL, eyeR);

    this.bodyGroup.add(
      this.leftLeg,
      this.rightLeg,
      this.torso,
      this.leftArm,
      this.rightArm,
      this.head
    );

    this.bodyGroup.traverse(c => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
  }

  triggerLandingReaction() {
    this.landSquashTimer = 0.22;
  }

  update(dt, state = 'idle') {
    this.state = state;
    this.animTime += dt;

    // Landing squash & stretch reaction
    if (this.landSquashTimer > 0) {
      this.landSquashTimer = Math.max(0, this.landSquashTimer - dt);
      const t = this.landSquashTimer / 0.22;
      const squash = Math.sin(t * Math.PI) * 0.16;
      this.bodyGroup.scale.set(1 + squash, 1 - squash, 1 + squash);
    } else {
      this.bodyGroup.scale.set(1, 1, 1);
    }

    if (state === 'walk' || state === 'run') {
      const freq = state === 'run' ? 13.0 : 8.5;
      const amp = state === 'run' ? 0.75 : 0.48;
      const swing = Math.sin(this.animTime * freq) * amp;

      this.leftLeg.rotation.x = swing;
      this.rightLeg.rotation.x = -swing;
      this.leftArm.rotation.x = -swing * 0.9;
      this.rightArm.rotation.x = swing * 0.9;
      this.head.position.y = 1.34 + Math.abs(Math.cos(this.animTime * freq)) * 0.04;
    } else if (state === 'jump') {
      this.leftLeg.rotation.x = -0.35;
      this.rightLeg.rotation.x = 0.25;
      this.leftArm.rotation.x = -2.2;
      this.rightArm.rotation.x = -2.2;
    } else {
      // Gentle idle breathing
      const breathe = Math.sin(this.animTime * 2.5) * 0.04;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = breathe;
      this.rightArm.rotation.x = -breathe;
      this.head.position.y = 1.34 + breathe * 0.5;
    }
  }
}
