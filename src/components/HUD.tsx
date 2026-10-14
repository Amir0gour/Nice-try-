import React from 'react';
import { gameManager } from '../game/GameManager';
import { Volume2, VolumeX, RotateCcw, Pause, Skull, Clock, Flag } from 'lucide-react';

interface HUDProps {
  onRestart: () => void;
}

export const HUD: React.FC<HUDProps> = ({ onRestart }) => {
  const level = gameManager.getCurrentLevel();
  const levelNum = gameManager.getCurrentLevelNumber();
  const stats = gameManager.getStats();
  const settings = gameManager.getSettings();
  const currentLevelDeaths = stats.levelDeaths[levelNum] || 0;
  const time = gameManager.getCurrentLevelTime();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <header className="absolute top-0 inset-x-0 z-20 pointer-events-none p-3 sm:p-4 flex justify-between items-start">
      {/* Level Info Banner */}
      <div className="pointer-events-auto flex flex-col gap-1">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3.5 py-1.5 shadow-lg flex items-center gap-2.5">
          <span className="font-game text-xs sm:text-sm text-amber-400 tracking-wide uppercase">
            W{level.worldNumber}-{levelNum}
          </span>
          <span className="text-slate-500 font-bold">|</span>
          <span className="font-cute font-extrabold text-xs sm:text-sm text-slate-100 truncate max-w-[150px] sm:max-w-[240px]">
            {level.title}
          </span>
        </div>

        {/* Small theme sub-tag */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 font-cute font-semibold px-1">
          <span className="text-rose-400 uppercase tracking-wider">{level.worldTitle}</span>
        </div>
      </div>

      {/* Center Stats: Deaths & Time */}
      <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
        {/* Deaths Card */}
        <div className="bg-rose-950/80 backdrop-blur-md border border-rose-500/40 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-2">
          <Skull className="w-4 h-4 text-rose-400 animate-pulse" />
          <div className="flex items-baseline gap-1 font-mono-code font-bold">
            <span className="text-sm sm:text-base text-rose-200">{stats.totalDeaths}</span>
            <span className="text-[10px] text-rose-400 font-normal">
              ({currentLevelDeaths})
            </span>
          </div>
        </div>

        {/* Timer */}
        {settings.speedrunTimer && (
          <div className="hidden sm:flex bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-lg items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono-code text-xs sm:text-sm text-cyan-200 font-bold">
              {formatTime(time)}
            </span>
          </div>
        )}
      </div>

      {/* Right Controls: Mute, Restart, Pause */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Sound Toggle */}
        <button
          onClick={() => gameManager.toggleSound()}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition shadow-md active:scale-95"
          title="Toggle Sound"
          aria-label="Toggle Sound"
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Instant Restart Button */}
        <button
          onClick={onRestart}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-600/70 flex items-center justify-center transition shadow-md active:scale-95"
          title="Instant Restart (R)"
          aria-label="Restart Level"
        >
          <RotateCcw className="w-4 h-4 text-rose-300" />
        </button>

        {/* Pause Button */}
        <button
          onClick={() => gameManager.togglePause()}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center justify-center transition shadow-md active:scale-95"
          title="Pause Game (ESC)"
          aria-label="Pause Game"
        >
          <Pause className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </header>
  );
};
