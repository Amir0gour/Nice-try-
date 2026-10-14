import React from 'react';
import { gameManager } from '../game/GameManager';
import { ArrowRight, RotateCcw, CheckCircle, Clock, Skull, Trophy } from 'lucide-react';

interface LevelCompleteModalProps {
  onNext: () => void;
  onReplay: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ onNext, onReplay }) => {
  const levelNum = gameManager.getCurrentLevelNumber();
  const level = gameManager.getCurrentLevel();
  const stats = gameManager.getStats();
  const levelDeaths = stats.levelDeaths[levelNum] || 0;
  const time = gameManager.getCurrentLevelTime();
  const bestTime = stats.levelBestTimes[levelNum] || time;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex flex-col items-center text-center">
        {/* Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-3 animate-bounce">
          <CheckCircle className="w-9 h-9 text-emerald-400" />
        </div>

        <h2 className="font-game text-2xl sm:text-3xl text-emerald-400 uppercase tracking-wide drop-shadow mb-1">
          CLEARED!
        </h2>
        <p className="font-cute font-bold text-slate-300 text-sm mb-5">
          {level.worldTitle} — Level {levelNum}: {level.title}
        </p>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 flex flex-col items-center">
            <Clock className="w-5 h-5 text-cyan-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Time</span>
            <span className="font-mono-code font-bold text-base text-cyan-200">
              {time.toFixed(2)}s
            </span>
            <span className="text-[9px] text-slate-400">Best: {bestTime.toFixed(2)}s</span>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 flex flex-col items-center">
            <Skull className="w-5 h-5 text-rose-400 mb-1" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Level Deaths</span>
            <span className="font-mono-code font-bold text-base text-rose-300">
              {levelDeaths}
            </span>
            <span className="text-[9px] text-slate-400">Total: {stats.totalDeaths}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={onNext}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 text-white font-game text-base tracking-wider shadow-lg shadow-emerald-600/40 flex items-center justify-center gap-2 transition cursor-pointer border border-emerald-400/50"
          >
            <span>NEXT LEVEL</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onReplay}
            className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-cute font-bold text-sm flex items-center justify-center gap-2 transition border border-slate-700 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Replay for Faster Time</span>
          </button>
        </div>
      </div>
    </div>
  );
};
