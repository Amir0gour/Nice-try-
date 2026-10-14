import React from 'react';
import { gameManager } from '../game/GameManager';
import { LEVELS } from '../game/levels';
import { X, Lock, CheckCircle, Clock, Skull, Play } from 'lucide-react';

interface LevelSelectModalProps {
  onSelectLevel: (lvl: number) => void;
  onClose: () => void;
}

export const LevelSelectModal: React.FC<LevelSelectModalProps> = ({ onSelectLevel, onClose }) => {
  const stats = gameManager.getStats();
  const unlocked = stats.unlockedLevel || 1;

  // Group by world
  const worlds = [
    { num: 1, title: 'World 1: Trust Issues', levels: LEVELS.slice(0, 3) },
    { num: 2, title: 'World 2: Psychological Warfare', levels: LEVELS.slice(3, 6) },
    { num: 3, title: 'World 3: Pure Betrayal', levels: LEVELS.slice(6, 9) },
    { num: 4, title: 'World 4: The Mind Games', levels: LEVELS.slice(9, 12) },
    { num: 5, title: 'World 5: The Developer is Evil', levels: LEVELS.slice(12, 15) },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="font-game text-xl sm:text-2xl text-amber-400 uppercase tracking-wide">
              LEVEL SELECT
            </h2>
            <p className="text-xs text-slate-400 font-cute">
              {stats.completedLevels.length} / 15 Levels Conquered • {stats.totalDeaths} Total Deaths
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable list of worlds */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {worlds.map((w) => (
            <div key={w.num} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-3.5">
              <h3 className="font-game text-xs sm:text-sm text-cyan-300 tracking-wide uppercase mb-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {w.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {w.levels.map((lvl) => {
                  const isLocked = lvl.id > unlocked;
                  const isCompleted = stats.completedLevels.includes(lvl.id);
                  const bestTime = stats.levelBestTimes[lvl.id];
                  const deaths = stats.levelDeaths[lvl.id] || 0;

                  return (
                    <button
                      key={lvl.id}
                      disabled={isLocked}
                      onClick={() => onSelectLevel(lvl.id)}
                      className={`relative p-3 rounded-xl border text-left transition flex flex-col justify-between h-24 ${
                        isLocked
                          ? 'bg-slate-950/60 border-slate-800/80 text-slate-600 opacity-60 cursor-not-allowed'
                          : isCompleted
                          ? 'bg-slate-800/90 hover:bg-slate-700/90 border-emerald-500/50 text-white cursor-pointer active:scale-95 shadow-md'
                          : 'bg-slate-800/70 hover:bg-slate-700/80 border-amber-500/40 text-slate-200 cursor-pointer active:scale-95'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-game text-xs text-amber-400">
                          {lvl.id}
                        </span>
                        {isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-slate-600" />
                        ) : isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400/40" />
                        )}
                      </div>

                      <div>
                        <div className="font-cute font-bold text-xs truncate text-slate-100">
                          {lvl.title}
                        </div>
                        {!isLocked && (
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono-code mt-1">
                            {bestTime ? (
                              <span className="flex items-center gap-0.5 text-cyan-300">
                                <Clock className="w-2.5 h-2.5" /> {bestTime.toFixed(1)}s
                              </span>
                            ) : null}
                            <span className="flex items-center gap-0.5 text-rose-400">
                              <Skull className="w-2.5 h-2.5" /> {deaths}
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
