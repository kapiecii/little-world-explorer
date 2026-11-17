import { LearningEvents } from './LearningEvents.js';

export class MissionManager {
  constructor(eventBus, missionList = []) {
    this.eventBus = eventBus;
    this.missions = new Map();
    missionList.forEach(m => {
      this.missions.set(m.id, { ...m });
    });

    this.activeMissionId = null;
    this.completedMissions = new Set();
    this.progress = {}; // missionId -> current count
  }

  getAllMissions() {
    return Array.from(this.missions.values()).map(m => ({
      ...m,
      current: this.progress[m.id] || 0,
      completed: this.completedMissions.has(m.id),
      active: this.activeMissionId === m.id
    }));
  }

  getActiveMission() {
    if (!this.activeMissionId) return null;
    const m = this.missions.get(this.activeMissionId);
    if (!m) return null;
    return {
      ...m,
      current: this.progress[m.id] || 0,
      completed: this.completedMissions.has(m.id),
      active: true
    };
  }

  startMission(missionId, resetIfCompleted = false) {
    const mission = this.missions.get(missionId);
    if (!mission) return null;

    if (resetIfCompleted || this.completedMissions.has(missionId)) {
      this.progress[missionId] = 0;
    } else if (this.progress[missionId] === undefined) {
      this.progress[missionId] = 0;
    }

    this.activeMissionId = missionId;
    const active = this.getActiveMission();

    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.MISSION_STARTED, active);
    }
    return active;
  }

  pauseMission() {
    if (!this.activeMissionId) return;
    const pausedId = this.activeMissionId;
    this.activeMissionId = null;
    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.MISSION_PAUSED, { missionId: pausedId });
    }
  }

  recordAction(type, target, amount = 1, isAbsolute = false) {
    const active = this.getActiveMission();
    if (!active) return false;

    const obj = active.objective;
    if (!obj || obj.type !== type) return false;

    const targetMatches =
      obj.target === 'any' ||
      obj.target === target ||
      (obj.target === 'flower' && String(target).startsWith('flower'));

    if (!targetMatches) return false;

    const prev = this.progress[active.id] || 0;
    const next = isAbsolute ? Math.max(prev, amount) : prev + amount;
    this.progress[active.id] = Math.min(obj.count, next);

    const updated = this.getActiveMission();
    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.MISSION_PROGRESS, updated);
    }

    if (this.progress[active.id] >= obj.count) {
      this.completeMission(active.id);
      return true;
    }
    return false;
  }

  completeMission(missionId) {
    const mission = this.missions.get(missionId);
    if (!mission) return;

    this.completedMissions.add(missionId);
    this.progress[missionId] = mission.objective.count;

    const completedPayload = {
      ...mission,
      current: mission.objective.count,
      completed: true,
      active: false
    };

    if (this.activeMissionId === missionId) {
      this.activeMissionId = null;
    }

    if (this.eventBus) {
      this.eventBus.emit(LearningEvents.MISSION_COMPLETED, completedPayload);
    }
  }

  getSerializedState() {
    return {
      activeMissionId: this.activeMissionId,
      completedMissions: Array.from(this.completedMissions),
      progress: { ...this.progress }
    };
  }

  restoreState(learningData = {}) {
    if (Array.isArray(learningData.completedMissions)) {
      this.completedMissions = new Set(learningData.completedMissions);
    }
    if (learningData.progress && typeof learningData.progress === 'object') {
      this.progress = { ...learningData.progress };
    }
    if (learningData.activeMissionId && this.missions.has(learningData.activeMissionId)) {
      this.activeMissionId = learningData.activeMissionId;
    }
  }
}
