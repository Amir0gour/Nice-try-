import React from 'react';
import { gameManager } from '../game/GameManager';
import { getRankTitle } from '../game/roasts';
import { X, Skull, Award, Flame, Zap, Trophy, History } from 'lucide-react';

interface RoastGalleryModalProps {
  onClose: () => void;
}

export const RoastGalleryModal: React.FC<RoastGalleryModalProps> = ({ onClose }) => {
  const stats = gameManager.getStats();
  const rank = getRankTitle(stats.totalDeaths, stats.completedLevels.length);

  const ACHIEVEMENTS = [
    { title: 'Innocent Optimist', req: 'Start the game', unlocked: true, desc: 'You thought this would be easy.' },
    { title: 'Apprentice Victim', req: '5 total deaths', unlocked: stats.totalDeaths >= 5, desc: 'Getting familiar with the spikes.' },
    { title: 'Professional Floor Inspector', req: '15 total deaths', unlocked: stats.totalDeaths >= 15, desc: 'You examined every pixel of the abyss.' },
    { title: 'Spikes\' Favorite Customer', req: '30 total deaths', unlocked: stats.totalDeaths >= 30, desc: 'They roll out the red carpet for you.' },
    { title: 'Certified Trap Tester', req: '50 total deaths', unlocked: stats.totalDeaths >= 50, desc: 'Quality assurance at its finest.' },
    { title: 'Psychological Experiment Subject', req: '100 total deaths', unlocked: stats.totalDeaths >= 100, desc: 'The scientists are deeply fascinated.' },
    { title: 'Suspiciously Competent', req: 'Complete all 15 levels with ≤ 10 deaths', unlocked: stats.completedLevels.length >= 15 && stats.totalDeaths <= 10, desc: 'Did you code the game?' },
    { title: 'Grand Trap Conqueror', req: 'Beat all 15 levels', unlocked: stats.completedLevels.length >= 15, desc: 'True legend of patience and skill.' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="font-game text-xl text-amber-400 uppercase tracking-wide">
              HALL OF SHAME & TITLES
            </h2>
            <p className="text-xs text-slate-400 font-cute">
              Your glorious history of failure and persistence
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current title showcase */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Current Title</div>
              <div className={`font-game text-base sm:text-lg ${rank.color}`}>
                {rank.title}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Deaths</span>
            <span className="font-mono-code font-bold text-lg text-rose-400">{stats.totalDeaths}</span>
          </div>
        </div>

        {/* Achievements list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mb-4">
          <h3 className="font-game text-xs text-cyan-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Achievement Titles</span>
          </h3>

          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-start gap-3 transition ${
                ach.unlocked
                  ? 'bg-slate-800/80 border-amber-500/40 text-slate-100'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                ach.unlocked ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-600'
              }`}>
                {ach.unlocked ? <Flame className="w-4 h-4" /> : <Skull className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-game text-xs tracking-wide">{ach.title}</h4>
                  <span className="text-[9px] font-mono-code text-slate-400">{ach.req}</span>
                </div>
                <p className="text-xs font-cute text-slate-400 mt-0.5">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-game text-sm tracking-wider transition cursor-pointer border border-slate-700"
        >
          BACK
        </button>
      </div>
    </div>
  );
};
