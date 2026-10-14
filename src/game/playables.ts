// Official YouTube Playables SDK Integration Module
// Grounded in official documentation: https://developers.google.com/youtube/gaming/playables
// Falls back seamlessly to browser APIs and localStorage when running standalone.

export interface PlayablesSDK {
  firstFrameReady?: () => void;
  gameReady?: () => void;
  sendScore?: (score: { value: number }) => void;
  saveData?: (data: string) => Promise<void>;
  loadData?: () => Promise<string>;
  onPause?: (callback: () => void) => void;
  onResume?: (callback: () => void) => void;
  isAudioEnabled?: () => boolean;
  onAudioEnabledChange?: (callback: (enabled: boolean) => void) => void;
}

class YouTubePlayablesManager {
  private sdk: PlayablesSDK | null = null;
  private isAvailable: boolean = false;
  private initialized: boolean = false;
  private onPauseCallback: (() => void) | null = null;
  private onResumeCallback: (() => void) | null = null;

  constructor() {
    this.detectSDK();
  }

  private detectSDK() {
    try {
      const globalWindow = window as any;
      if (globalWindow.YTPlayables) {
        this.sdk = globalWindow.YTPlayables;
        this.isAvailable = true;
      } else if (window.parent && (window.parent as any).YTPlayables) {
        this.sdk = (window.parent as any).YTPlayables;
        this.isAvailable = true;
      }
    } catch {
      // In cross-origin iframe without access, fallback safely
      this.isAvailable = false;
    }
  }

  public init(handlers?: { onPause?: () => void; onResume?: () => void }) {
    if (this.initialized) return;
    this.initialized = true;

    if (handlers?.onPause) this.onPauseCallback = handlers.onPause;
    if (handlers?.onResume) this.onResumeCallback = handlers.onResume;

    if (this.isAvailable && this.sdk) {
      try {
        if (typeof this.sdk.onPause === 'function') {
          this.sdk.onPause(() => {
            if (this.onPauseCallback) this.onPauseCallback();
          });
        }
        if (typeof this.sdk.onResume === 'function') {
          this.sdk.onResume(() => {
            if (this.onResumeCallback) this.onResumeCallback();
          });
        }
      } catch (err) {
        console.warn('[YTPlayables] Error setting lifecycle hooks', err);
      }
    }
  }

  public notifyFirstFrameReady() {
    if (this.isAvailable && this.sdk?.firstFrameReady) {
      try {
        this.sdk.firstFrameReady();
      } catch (err) {
        console.warn('[YTPlayables] firstFrameReady error', err);
      }
    }
  }

  public notifyGameReady() {
    if (this.isAvailable && this.sdk?.gameReady) {
      try {
        this.sdk.gameReady();
      } catch (err) {
        console.warn('[YTPlayables] gameReady error', err);
      }
    }
  }

  public sendScore(scoreValue: number) {
    if (this.isAvailable && this.sdk?.sendScore) {
      try {
        this.sdk.sendScore({ value: scoreValue });
      } catch (err) {
        console.warn('[YTPlayables] sendScore error', err);
      }
    }
  }

  public async saveGameData(data: object): Promise<boolean> {
    const serialized = JSON.stringify(data);
    if (this.isAvailable && this.sdk?.saveData) {
      try {
        await this.sdk.saveData(serialized);
        return true;
      } catch {
        // Fallback to localStorage
      }
    }

    try {
      localStorage.setItem('nice_try_save_data', serialized);
      return true;
    } catch {
      return false;
    }
  }

  public async loadGameData(): Promise<any | null> {
    if (this.isAvailable && this.sdk?.loadData) {
      try {
        const raw = await this.sdk.loadData();
        if (raw) return JSON.parse(raw);
      } catch {
        // Fallback to localStorage
      }
    }

    try {
      const local = localStorage.getItem('nice_try_save_data');
      if (local) return JSON.parse(local);
    } catch {}

    return null;
  }

  public isPlatformAvailable(): boolean {
    return this.isAvailable;
  }
}

export const playables = new YouTubePlayablesManager();
