import React from 'react';
import { gameManager } from '../game/GameManager';
import { Play, RotateCcw, Grid, Settings as SettingsIcon, Volume2, VolumeX } from 'lucide-react';

interface PauseModalProps {
  onResume: () => void;
  onRestart: () => void;
  onOpenLevelSelect: () => void;
  onOpenSettings: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  onResume,
  onRestart,
  onOpenLevelSelect,
  onOpenSettings,
}) => {
  const settings = gameManager.getSettings();

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        <h2 className="font-game text-2xl text-amber-400 uppercase tracking-wider mb-5">
          GAME PAUSED
        </h2>

        <div className="flex flex-col gap-2.5 w-full mb-4">
          <button
            onClick={onResume}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 active:scale-95 text-white font-game text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 transition cursor-pointer border border-cyan-400/50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>RESUME</span>
          </button>

          <button
            onClick={onRestart}
            className="w-full py-3.5 rounded-2xl bg-rose-900/80 hover:bg-rose-800 active:scale-95 text-rose-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-rose-700/60 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-300" />
            <span>RESTART LEVEL (R)</span>
          </button>

          <button
            onClick={onOpenLevelSelect}
            className="w-full py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700 cursor-pointer"
          >
            <Grid className="w-4 h-4 text-amber-400" />
            <span>LEVEL SELECT</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-slate-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700 cursor-pointer"
          >
            <SettingsIcon className="w-4 h-4 text-slate-400" />
            <span>SETTINGS & SKINS</span>
          </button>
        </div>

        {/* Quick sound toggle in pause menu */}
        <button
          onClick={() => gameManager.toggleSound()}
          className="flex items-center gap-2 text-xs font-cute text-slate-400 hover:text-slate-200 transition py-1"
        >
          {settings.soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Sound: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-rose-400" />
              <span>Sound: MUTED</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
