import * as THREE from 'three';
import { Config } from './Config.js';
import { EventBus } from './EventBus.js';
import { LearningEvents } from '../learning/LearningEvents.js';
import { SaveManager } from '../save/SaveManager.js';
import { AudioManager, AudioPriority } from '../audio/AudioManager.js';
import { InventoryManager } from '../inventory/InventoryManager.js';
import { VocabularyManager } from '../learning/VocabularyManager.js';
import { MissionManager } from '../learning/MissionManager.js';
import { LearningManager } from '../learning/LearningManager.js';
import { WorldManager } from '../world/WorldManager.js';
import { PlayerController } from '../player/PlayerController.js';
import { CameraController } from '../player/CameraController.js';
import { InteractionManager } from '../interaction/InteractionManager.js';
import { UIManager } from '../ui/UIManager.js';
import {
  DEFAULT_BLOCKS,
  DEFAULT_OBJECTS,
  DEFAULT_VOCABULARY,
  DEFAULT_MISSIONS
} from '../data/defaultData.js';

export class GameController {
  constructor(canvasContainerId = 'game-canvas-container') {
    this.container = document.getElementById(canvasContainerId);
    this.eventBus = new EventBus();
    this.saveManager = new SaveManager(this.eventBus);

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.audioManager = null;
    this.inventoryManager = null;
    this.vocabularyManager = null;
    this.missionManager = null;
    this.learningManager = null;
    this.worldManager = null;
    this.playerController = null;
    this.cameraController = null;
    this.interactionManager = null;
    this.uiManager = null;

    this.lastTime = performance.now();
    this.isRunning = false;
  }

  async init() {
    await this.saveManager.init();
    const initialSettings = this.saveManager.loadSettings();

    // Load JSON data files (with fallback to embedded defaultData)
    const [blocksData, objectsData, vocabData, missionsData] = await Promise.all([
      this._fetchJson('./src/data/blocks.json', DEFAULT_BLOCKS),
      this._fetchJson('./src/data/objects.json', DEFAULT_OBJECTS),
      this._fetchJson('./src/data/vocabulary.json', DEFAULT_VOCABULARY),
      this._fetchJson('./src/data/missions.json', DEFAULT_MISSIONS)
    ]);

    // Initialize Three.js Scene, Camera, Renderer
    this._initThree();

    // Initialize core managers
    this.audioManager = new AudioManager(this.eventBus, initialSettings);
    this.inventoryManager = new InventoryManager(this.eventBus, blocksData, objectsData);
    this.vocabularyManager = new VocabularyManager(vocabData, blocksData, objectsData);
    this.missionManager = new MissionManager(this.eventBus, missionsData);
    this.learningManager = new LearningManager(
      this.eventBus,
      this.vocabularyManager,
      this.missionManager,
      this.inventoryManager,
      initialSettings
    );

    // Initialize 3D World, Player, Camera, Interaction
    this.worldManager = new WorldManager(
      this.scene,
      this.eventBus,
      blocksData,
      objectsData,
      this.inventoryManager
    );
    this.worldManager.buildNewWorld();

    this.playerController = new PlayerController(
      this.scene,
      this.eventBus,
      this.worldManager.blockManager
    );

    this.cameraController = new CameraController(
      this.camera,
      this.renderer.domElement,
      this.worldManager.blockManager
    );

    this.interactionManager = new InteractionManager(
      this.scene,
      this.camera,
      this.renderer.domElement,
      this.eventBus,
      this.worldManager.blockManager,
      this.worldManager.objectManager,
      this.inventoryManager,
      this.playerController,
      this.cameraController
    );

    // Initialize UI
    this.uiManager = new UIManager({
      eventBus: this.eventBus,
      inventoryManager: this.inventoryManager,
      learningManager: this.learningManager,
      missionManager: this.missionManager,
      vocabularyManager: this.vocabularyManager,
      saveManager: this.saveManager,
      initialSettings,
      onStartNewGame: () => this.startNewGame(),
      onContinueGame: () => this.continueGame(),
      onResetWorldObjects: () => this.resetWorldObjects(),
      onUIModalStateChange: (gameplayActive) => this._setGameplayActive(gameplayActive)
    });

    // Wire SaveManager state provider & event-driven auto-save
    this.saveManager.setStateProvider(() => this.getFullSaveState());
    this.eventBus.on(LearningEvents.SAVE_REQUESTED, () => {
      this.saveManager.requestSaveDebounced(500);
    });

    await this.uiManager.refreshContinueButton();
    this.uiManager.showTitleScreen();

    // Start render loop
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this._animate(t));
  }

  async _fetchJson(url, fallback) {
    try {
      const res = await fetch(url);
      if (!res.ok) return fallback;
      return await res.json();
    } catch (err) {
      console.warn(`[GameController] Failed to fetch ${url}:`, err);
      return fallback;
    }
  }

  _initThree() {
    this.scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 160);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    if (this.container) {
      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);
    }

    window.addEventListener('resize', () => {
      if (!this.camera || !this.renderer) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  _setGameplayActive(active) {
    if (this.playerController) {
      this.playerController.controlsEnabled = active;
    }
    if (this.cameraController) {
      this.cameraController.setActive(active);
    }
    if (this.interactionManager) {
      this.interactionManager.enabled = active;
    }
  }

  async startNewGame() {
    this.audioManager.unlockAudio();
    await this.saveManager.clearSave();

    this.inventoryManager.resetToInitial();
    this.worldManager.buildNewWorld();
    this.playerController.resetPosition(Config.PLAYER.START_POS);
    this.learningManager.restoreState({
      discoveredWords: [],
      wordCounts: {},
      completedMissions: [],
      activeMissionId: null,
      progress: {}
    });

    // Start with the first friendly mission active (can be paused anytime!)
    this.missionManager.startMission('find_apples_001', true);
    this.saveManager.startAutoSave();
    await this.saveManager.triggerSave('new_game');

    this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
      text: 'Welcome to Little World Explorer! Find three apples!',
      priority: AudioPriority.HIGH,
      force: true
    });
  }

  async continueGame() {
    this.audioManager.unlockAudio();
    const saved = await this.saveManager.loadGame();
    if (!saved) {
      return this.startNewGame();
    }

    if (saved.world) {
      this.worldManager.restoreWorld(saved.world);
    }
    if (saved.player?.inventory) {
      this.inventoryManager.restoreState(saved.player.inventory);
    }
    if (saved.player?.position) {
      this.playerController.resetPosition(saved.player.position);
    }
    if (saved.learning) {
      this.learningManager.restoreState(saved.learning);
      this.uiManager.missionUI.renderHudCard();
    }

    this.saveManager.startAutoSave();
    this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
      text: 'Welcome back! Let us play!',
      priority: AudioPriority.HIGH,
      force: true
    });
  }

  async resetWorldObjects() {
    if (!this.worldManager) return false;
    this.worldManager.resetObjects();
    await this.saveManager.triggerSave('reset_objects');
    this.eventBus.emit(LearningEvents.SFX_REQUESTED, { type: 'collect' });
    this.eventBus.emit(LearningEvents.SPEAK_REQUESTED, {
      text: 'World objects are back!',
      priority: AudioPriority.HIGH,
      force: true
    });
    return true;
  }

  getFullSaveState() {
    return {
      version: Config.VERSION,
      world: this.worldManager ? this.worldManager.getSerializedState() : {},
      player: {
        position: this.playerController ? this.playerController.getPositionArray() : [...Config.PLAYER.START_POS],
        inventory: this.inventoryManager ? this.inventoryManager.getSerializedState() : []
      },
      learning: this.learningManager ? this.learningManager.getSerializedState() : {},
      settings: this.uiManager ? this.uiManager.settingsUI.getSettings() : this.saveManager.loadSettings()
    };
  }

  _animate(now) {
    if (!this.isRunning) return;
    requestAnimationFrame((t) => this._animate(t));

    const dt = Math.min(0.1, (now - this.lastTime) / 1000);
    this.lastTime = now;

    if (this.worldManager) {
      this.worldManager.update(dt);
    }
    if (this.playerController && this.cameraController) {
      this.playerController.update(dt, this.cameraController.yaw);
      this.cameraController.update(this.playerController.position);
    }
    if (this.interactionManager) {
      this.interactionManager.update();
      if (this.uiManager?.hud) {
        this.uiManager.hud.updateBreakProgress(this.interactionManager.getBreakProgress());
      }
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
