export type DeathCause =
  | 'spike'
  | 'pit_fall'
  | 'fake_treasure'
  | 'lying_checkpoint'
  | 'betrayal_jump'
  | 'fake_exit'
  | 'suspicious_cloud'
  | 'overpowered_spring'
  | 'reverse_psychology'
  | 'memory_test'
  | 'fake_safe_zone'
  | 'last_second_trap'
  | 'falling_block'
  | 'general';

export interface PlayerSkin {
  id: string;
  name: string;
  color: number;
  highlightColor: number;
  unlockedByDefault: boolean;
  requiredDeaths?: number;
}

export interface TrapConfig {
  id: string;
  type:
    | 'fake_treasure'
    | 'lying_checkpoint'
    | 'betrayal_jump'
    | 'fake_exit'
    | 'suspicious_cloud'
    | 'overpowered_spring'
    | 'reverse_sign'
    | 'memory_test'
    | 'fake_safe_zone'
    | 'last_second_trap'
    | 'falling_block';
  x: number;
  y: number;
  width?: number;
  height?: number;
  customData?: Record<string, any>;
}

export interface PlatformConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  type?: 'normal' | 'cracking' | 'bouncy' | 'slippery' | 'fake';
  color?: number;
}

export interface MovingPlatformConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  targetX?: number;
  targetY?: number;
  speed?: number;
  behavior?: 'pingpong' | 'vanish_on_step' | 'troll_drop' | 'dash_forward';
}

export interface HazardConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'spikes_up' | 'spikes_down' | 'spikes_left' | 'spikes_right' | 'saw_blade';
}

export interface SignConfig {
  x: number;
  y: number;
  text: string;
  subtext?: string;
}

export interface LevelDefinition {
  id: number;
  worldNumber: number;
  worldTitle: string;
  title: string;
  description: string;
  width: number;
  height: number;
  theme: 'grass' | 'lab' | 'volcano' | 'mind' | 'evil';
  spawn: { x: number; y: number };
  realCheckpoint?: { x: number; y: number };
  realCheckpoints?: { x: number; y: number }[];
  exit: { x: number; y: number };
  platforms: PlatformConfig[];
  hazards: HazardConfig[];
  movingPlatforms?: MovingPlatformConfig[];
  traps?: TrapConfig[];
  signs?: SignConfig[];
  parTimeSeconds: number;
}

export interface GameStats {
  totalDeaths: number;
  levelDeaths: Record<number, number>;
  levelBestTimes: Record<number, number>;
  unlockedLevel: number;
  completedLevels: number[];
  recentDeaths: { cause: DeathCause; timestamp: number; x: number; y: number }[];
  consecutiveDeathsAtSameLocation: number;
  lastDeathLocation?: { x: number; y: number; level: number };
  currentRunTime: number;
}

export interface SettingsState {
  soundEnabled: boolean;
  soundVolume: number;
  screenShake: boolean;
  particles: boolean;
  speedrunTimer: boolean;
  activeSkin: string;
}
