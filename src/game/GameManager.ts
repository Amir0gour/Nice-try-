import { GameStats, SettingsState, DeathCause } from './types';
import { LEVELS } from './levels';
import { getContextAwareRoast, RoastResult } from './roasts';
import { sounds } from './audio';
import { playables } from './playables';

export type GameScreen = 'menu' | 'playing' | 'level_select' | 'settings' | 'roasts_stats';

class GameManager {
  private currentLevelIndex: number = 0; // 0-based for level 1
  private currentScreen: GameScreen = 'menu';
  private isPaused: boolean = false;
  private isDead: boolean = false;
  private isLevelComplete: boolean = false;
  private isGameComplete: boolean = false;

  private stats: GameStats = {
    totalDeaths: 0,
    levelDeaths: {},
    levelBestTimes: {},
    unlockedLevel: 1,
    completedLevels: [],
    recentDeaths: [],
    consecutiveDeathsAtSameLocation: 0,
    currentRunTime: 0,
  };

  private settings: SettingsState = {
    soundEnabled: true,
    soundVolume: 0.6,
    screenShake: true,
    particles: true,
    speedrunTimer: true,
    activeSkin: 'player_yellow',
  };

  private levelStartTime: number = 0;
  private currentLevelTime: number = 0;
  private currentRoast: RoastResult | null = null;
  private currentDeathCause: DeathCause = 'general';

  // Listeners for UI state syncing
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadState();
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  private async loadState() {
    const saved = await playables.loadGameData();
    if (saved) {
      if (saved.stats) {
        this.stats = { ...this.stats, ...saved.stats };
      }
      if (saved.settings) {
        this.settings = { ...this.settings, ...saved.settings };
        sounds.setEnabled(this.settings.soundEnabled);
        sounds.setVolume(this.settings.soundVolume);
      }
      this.notify();
    }
  }

  public async saveState() {
    await playables.saveGameData({
      stats: this.stats,
      settings: this.settings,
    });
  }

  // --- GETTERS ---
  public getCurrentLevel() {
    return LEVELS[this.currentLevelIndex] || LEVELS[0];
  }

  public getCurrentLevelNumber() {
    return this.currentLevelIndex + 1;
  }

  public getScreen() {
    return this.currentScreen;
  }

  public getIsPaused() {
    return this.isPaused;
  }

  public getIsDead() {
    return this.isDead;
  }

  public getIsLevelComplete() {
    return this.isLevelComplete;
  }

  public getIsGameComplete() {
    return this.isGameComplete;
  }

  public getStats() {
    return this.stats;
  }

  public getSettings() {
    return this.settings;
  }

  public getCurrentRoast() {
    return this.currentRoast;
  }

  public getCurrentDeathCause() {
    return this.currentDeathCause;
  }

  public getCurrentLevelTime() {
    return this.currentLevelTime;
  }

  // --- ACTIONS ---
  public setScreen(screen: GameScreen) {
    this.currentScreen = screen;
    this.notify();
  }

  public startLevel(levelNum: number) {
    const idx = Math.max(0, Math.min(LEVELS.length - 1, levelNum - 1));
    this.currentLevelIndex = idx;
    this.currentScreen = 'playing';
    this.isPaused = false;
    this.isDead = false;
    this.isLevelComplete = false;
    this.isGameComplete = false;
    this.levelStartTime = Date.now();
    this.currentLevelTime = 0;
    this.currentRoast = null;

    sounds.unlockAudio();
    this.notify();
  }

  public restartLevel() {
    this.isPaused = false;
    this.isDead = false;
    this.isLevelComplete = false;
    this.levelStartTime = Date.now();
    this.currentLevelTime = 0;
    this.currentRoast = null;
    this.notify();
  }

  public nextLevel() {
    if (this.currentLevelIndex + 1 < LEVELS.length) {
      this.startLevel(this.currentLevelIndex + 2);
    } else {
      this.isGameComplete = true;
      this.notify();
    }
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
    this.notify();
  }

  public togglePause() {
    this.isPaused = !this.isPaused;
    this.notify();
  }

  public toggleSound() {
    const newVal = !this.settings.soundEnabled;
    this.settings.soundEnabled = newVal;
    sounds.setEnabled(newVal);
    this.saveState();
    this.notify();
  }

  public setVolume(vol: number) {
    this.settings.soundVolume = vol;
    sounds.setVolume(vol);
    this.saveState();
    this.notify();
  }

  public setScreenShake(enabled: boolean) {
    this.settings.screenShake = enabled;
    this.saveState();
    this.notify();
  }

  public setSpeedrunTimer(enabled: boolean) {
    this.settings.speedrunTimer = enabled;
    this.saveState();
    this.notify();
  }

  public setActiveSkin(skinKey: string) {
    this.settings.activeSkin = skinKey;
    this.saveState();
    this.notify();
  }

  public updateTime(deltaSeconds: number) {
    if (!this.isPaused && !this.isDead && !this.isLevelComplete && this.currentScreen === 'playing') {
      this.currentLevelTime += deltaSeconds;
      this.stats.currentRunTime += deltaSeconds;
    }
  }

  public onPlayerDeath(cause: DeathCause, x: number, y: number) {
    if (this.isDead || this.isLevelComplete) return;

    this.isDead = true;
    this.currentDeathCause = cause;
    this.stats.totalDeaths += 1;

    const currentLevelNum = this.getCurrentLevelNumber();
    this.stats.levelDeaths[currentLevelNum] = (this.stats.levelDeaths[currentLevelNum] || 0) + 1;

    // Detect streak at same position
    let sameSpot = 1;
    if (this.stats.lastDeathLocation && this.stats.lastDeathLocation.level === currentLevelNum) {
      const dist = Math.hypot(this.stats.lastDeathLocation.x - x, this.stats.lastDeathLocation.y - y);
      if (dist < 60) {
        sameSpot = this.stats.consecutiveDeathsAtSameLocation + 1;
      }
    }
    this.stats.consecutiveDeathsAtSameLocation = sameSpot;
    this.stats.lastDeathLocation = { x, y, level: currentLevelNum };

    this.stats.recentDeaths.unshift({
      cause,
      timestamp: Date.now(),
      x,
      y,
    });
    if (this.stats.recentDeaths.length > 20) {
      this.stats.recentDeaths.pop();
    }

    // Generate smart context-aware roast
    this.currentRoast = getContextAwareRoast({
      cause,
      sameSpotCount: sameSpot,
      runDurationSeconds: this.currentLevelTime,
      totalDeaths: this.stats.totalDeaths,
      levelNumber: currentLevelNum,
    });

    this.saveState();
    this.notify();
  }

  public onLevelComplete() {
    if (this.isLevelComplete) return;

    this.isLevelComplete = true;
    const currentNum = this.getCurrentLevelNumber();

    // Unlock next level
    if (currentNum + 1 > this.stats.unlockedLevel) {
      this.stats.unlockedLevel = Math.min(LEVELS.length, currentNum + 1);
    }

    if (!this.stats.completedLevels.includes(currentNum)) {
      this.stats.completedLevels.push(currentNum);
    }

    // Update best time
    const prevBest = this.stats.levelBestTimes[currentNum];
    if (!prevBest || this.currentLevelTime < prevBest) {
      this.stats.levelBestTimes[currentNum] = Math.round(this.currentLevelTime * 100) / 100;
    }

    // Report score to YouTube Playables if supported
    playables.sendScore(this.stats.completedLevels.length * 1000 - this.stats.totalDeaths * 10);

    if (currentNum === LEVELS.length) {
      this.isGameComplete = true;
    }

    this.saveState();
    this.notify();
  }
}

export const gameManager = new GameManager();
