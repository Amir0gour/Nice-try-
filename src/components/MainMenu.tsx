import React, { useState } from 'react';
import { gameManager } from '../game/GameManager';
import { Play, Grid, Settings as SettingsIcon, Trophy, HelpCircle, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface MainMenuProps {
  onStart: () => void;
  onOpenLevelSelect: () => void;
  onOpenSettings: () => void;
  onOpenRoasts: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStart,
  onOpenLevelSelect,
  onOpenSettings,
  onOpenRoasts,
}) => {
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const settings = gameManager.getSettings();
  const stats = gameManager.getStats();

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 bg-slate-950 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col items-center text-center relative z-10">
        {/* Animated Main Logo */}
        <div className="relative mb-3 flex flex-col items-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-400 font-game text-[11px] tracking-widest uppercase mb-2 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Game That Hates You</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="font-game text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-red-500 uppercase tracking-tight drop-shadow-[0_4px_20px_rgba(244,63,94,0.4)] animate-wobble-subtle">
            NICE TRY!
          </h1>

          <p className="font-cute font-extrabold text-sm sm:text-base text-slate-300 mt-1 max-w-xs">
            "Every mistake is a joke. You're the punchline."
          </p>
        </div>

        {/* Blob Character Mascot Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-500 border-4 border-amber-300 shadow-xl shadow-amber-500/20 flex flex-col items-center justify-center relative mb-6 animate-pulse-fast">
          <div className="flex gap-3 items-center">
            <div className="w-2.5 h-3.5 bg-slate-900 rounded-full" />
            <div className="w-2.5 h-3.5 bg-slate-900 rounded-full" />
          </div>
          <div className="w-4 h-1.5 bg-slate-900 rounded-full mt-1.5" />
          {/* Subtle blush */}
          <div className="absolute left-2 bottom-3 w-2.5 h-1.5 bg-rose-500/40 rounded-full" />
          <div className="absolute right-2 bottom-3 w-2.5 h-1.5 bg-rose-500/40 rounded-full" />
        </div>

        {/* Menu Buttons */}
        <div className="w-full flex flex-col gap-3 mb-5">
          <button
            onClick={onStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 active:scale-95 text-white font-game text-lg tracking-wider shadow-xl shadow-rose-600/30 flex items-center justify-center gap-3 transition cursor-pointer border-2 border-rose-400/60"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>PLAY GAME</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onOpenLevelSelect}
              className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700/80 cursor-pointer active:scale-95 shadow-md"
            >
              <Grid className="w-4 h-4 text-amber-400" />
              <span>Level Select</span>
            </button>

            <button
              onClick={onOpenRoasts}
              className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700/80 cursor-pointer active:scale-95 shadow-md"
            >
              <Trophy className="w-4 h-4 text-rose-400" />
              <span>Hall of Shame</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setShowHowToPlay(true)}
              className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700/80 cursor-pointer active:scale-95 shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>How To Play</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700/80 cursor-pointer active:scale-95 shadow-md"
            >
              <SettingsIcon className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Footer Info & Sound Toggle */}
        <div className="flex items-center justify-between w-full px-2 text-xs text-slate-500 font-cute">
          <span>Deaths: {stats.totalDeaths}</span>
          <button
            onClick={() => gameManager.toggleSound()}
            className="flex items-center gap-1.5 hover:text-slate-300 transition"
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
            <span>{settings.soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
          </button>
        </div>
      </div>

      {/* How To Play Modal */}
      {showHowToPlay && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 text-left">
            <h3 className="font-game text-xl text-amber-400 uppercase tracking-wide mb-3">
              HOW TO PLAY
            </h3>

            <div className="space-y-3 text-xs sm:text-sm font-cute text-slate-300 leading-relaxed mb-5">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="font-bold text-amber-400 block mb-1">🎮 Desktop Controls:</span>
                • <kbd className="px-1.5 py-0.5 bg-slate-900 rounded text-cyan-300">A / D</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-900 rounded text-cyan-300">Arrows</kbd> to Move<br />
                • <kbd className="px-1.5 py-0.5 bg-slate-900 rounded text-amber-300">SPACE / W</kbd> to Jump (Hold for higher jump)<br />
                • <kbd className="px-1.5 py-0.5 bg-slate-900 rounded text-rose-300">R</kbd> for Instant Restart<br />
                • <kbd className="px-1.5 py-0.5 bg-slate-900 rounded text-slate-400">ESC</kbd> to Pause
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="font-bold text-amber-400 block mb-1">📱 Mobile Controls:</span>
                • On-screen Left/Right directional buttons<br />
                • Large JUMP button with touch-boost sensitivity
              </div>

              <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-500/30 text-rose-200">
                <span className="font-bold text-rose-400 block mb-1">⚠️ The Golden Rule:</span>
                Trust nothing. Fake treasure chests drop the floor. Lying checkpoints run away. Clouds have commitment issues. But every level is 100% beatable!
              </div>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-game text-sm tracking-wide transition cursor-pointer"
            >
              GOT IT, LET ME DIE!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
