import React from 'react';
import { gameManager } from '../game/GameManager';
import { getRankTitle } from '../game/roasts';
import { Trophy, Award, RotateCcw, Home, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  onRestartGame: () => void;
  onGoHome: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({ onRestartGame, onGoHome }) => {
  const stats = gameManager.getStats();
  const rank = getRankTitle(stats.totalDeaths, 15);

  React.useEffect(() => {
    // Blast celebratory fireworks
    const duration = 3000;
    const end = Date.now() + duration;

    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      try {
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        });
      } catch {}
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border-3 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(251,191,36,0.35)] flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow corner ornaments */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-rose-500/20 rounded-full blur-2xl" />

        <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-4 shadow-inner">
          <Trophy className="w-11 h-11 text-amber-400 animate-pulse" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-game tracking-wider uppercase mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>YOU ACTUALLY BEAT IT!</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <h2 className="font-game text-3xl sm:text-4xl text-amber-400 uppercase tracking-wider drop-shadow mb-2">
          NICE TRY COMPLETE!
        </h2>

        <p className="font-cute font-bold text-slate-300 text-sm max-w-sm mb-5">
          Against fake exits, lying flags, overpowered springs, and malicious architecture, you survived all 15 levels!
        </p>

        {/* Certificate Card */}
        <div className="bg-slate-800/90 border-2 border-slate-700 rounded-2xl p-4 w-full mb-6 relative">
          <div className="text-[10px] text-amber-400 font-mono-code font-bold uppercase tracking-widest mb-1">
            Official Troll Board Certificate
          </div>

          <div className="text-xl font-game text-white mb-2">
            TITLE: <span className={rank.color}>{rank.title}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-left pt-2 border-t border-slate-700/80">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Deaths</span>
              <span className="font-mono-code text-lg font-extrabold text-rose-400">{stats.totalDeaths}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Campaign Time</span>
              <span className="font-mono-code text-lg font-extrabold text-cyan-400">
                {Math.round(stats.currentRunTime)}s
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onRestartGame}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-slate-950 font-game text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 transition cursor-pointer border border-amber-300 font-black"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            onClick={onGoHome}
            className="flex-1 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-cute font-extrabold text-sm flex items-center justify-center gap-2 transition border border-slate-700 cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-300" />
            <span>MAIN MENU</span>
          </button>
        </div>
      </div>
    </div>
  );
};
