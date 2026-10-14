import React, { useEffect } from 'react';
import { gameManager } from '../game/GameManager';
import { getRankTitle } from '../game/roasts';
import { RotateCcw, Skull, Flame, Trophy } from 'lucide-react';

interface DeathModalProps {
  onRestart: () => void;
}

export const DeathModal: React.FC<DeathModalProps> = ({ onRestart }) => {
  const roast = gameManager.getCurrentRoast();
  const stats = gameManager.getStats();
  const rank = getRankTitle(stats.totalDeaths, stats.completedLevels.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'KeyR' || e.code === 'Enter') {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRestart]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-rose-500/70 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(244,63,94,0.35)] flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Warning Banner */}
        <div className="bg-rose-500/20 border border-rose-500/50 rounded-full px-4 py-1 mb-3 flex items-center gap-1.5 animate-pulse">
          <Flame className="w-4 h-4 text-rose-400" />
          <span className="font-game text-xs text-rose-300 tracking-wider uppercase">
            {roast?.tag || 'NICE TRY!'}
          </span>
        </div>

        {/* Punchy Title */}
        <h2 className="font-game text-2xl sm:text-3xl text-rose-500 uppercase tracking-wide drop-shadow mb-3">
          YOU DIED!
        </h2>

        {/* Roast Message */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-4 w-full">
          <p className="font-cute font-bold text-lg sm:text-xl text-slate-100 leading-snug">
            "{roast?.message || 'Skill issue? Or architectural issue?'}"
          </p>
          {roast?.subtext && (
            <p className="font-cute text-xs text-amber-300/90 mt-2 font-medium">
              {roast.subtext}
            </p>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-3 w-full mb-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 justify-center">
            <Skull className="w-4 h-4 text-rose-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Deaths</div>
              <div className="font-mono-code font-bold text-base text-white">{stats.totalDeaths}</div>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 flex items-center gap-2 justify-center">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Rank</div>
              <div className={`font-cute font-extrabold text-xs truncate max-w-[110px] ${rank.color}`}>
                {rank.title}
              </div>
            </div>
          </div>
        </div>

        {/* Big accessible Try Again button */}
        <button
          onClick={onRestart}
          autoFocus
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 active:scale-95 text-white font-game text-lg tracking-wider shadow-lg shadow-rose-600/40 flex items-center justify-center gap-3 transition cursor-pointer border border-rose-400/50"
        >
          <RotateCcw className="w-5 h-5 text-rose-100" />
          <span>TRY AGAIN</span>
        </button>

        <span className="text-[11px] text-slate-400 font-mono-code mt-3">
          Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300">SPACE</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-amber-300">R</kbd> to retry instantly
        </span>
      </div>
    </div>
  );
};
