import React from 'react';
import { gameManager } from '../game/GameManager';
import { X, Volume2, VolumeX, Eye, Sparkles, Check } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const settings = gameManager.getSettings();

  const SKINS = [
    { id: 'player_yellow', name: 'Blobby Classic', colorHex: '#fbbf24', desc: 'The original naive victim' },
    { id: 'player_green', name: 'Toxic Jelly', colorHex: '#34d399', desc: 'Looks like acid, tastes like lime' },
    { id: 'player_red', name: 'Rage Mode', colorHex: '#f87171', desc: 'Pre-angry before the spikes touch you' },
    { id: 'player_blue', name: 'Blueberry Chill', colorHex: '#60a5fa', desc: 'Calm under emotional distress' },
    { id: 'player_white', name: 'Spooky Spirit', colorHex: '#e2e8f0', desc: 'Already looks like a ghost' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
          <h2 className="font-game text-xl text-amber-400 uppercase tracking-wide">
            SETTINGS & SKINS
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition border border-slate-700"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Skin Selector */}
        <div className="mb-6">
          <label className="font-game text-xs text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Select Blob Skin</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {SKINS.map((skin) => {
              const isSelected = settings.activeSkin === skin.id;
              return (
                <button
                  key={skin.id}
                  onClick={() => gameManager.setActiveSkin(skin.id)}
                  className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 border-2 transition active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 bg-amber-400/15 shadow-md ring-2 ring-amber-400/40'
                      : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                  }`}
                  title={skin.name}
                >
                  <div
                    className="w-9 h-9 rounded-xl relative shadow-inner flex items-center justify-center"
                    style={{ backgroundColor: skin.colorHex }}
                  >
                    {/* Cute dots for eyes */}
                    <div className="flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center shadow">
                        <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-cute font-bold text-slate-300 truncate w-full text-center">
                    {skin.name.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio controls */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div className="flex items-center gap-2.5">
              {settings.soundEnabled ? (
                <Volume2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-rose-400" />
              )}
              <div>
                <div className="font-cute font-bold text-sm text-slate-100">Procedural SFX</div>
                <div className="text-[10px] text-slate-400">8-bit retro jump, bounce & death audio</div>
              </div>
            </div>
            <button
              onClick={() => gameManager.toggleSound()}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-1 left-1 ${
                  settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider */}
          {settings.soundEnabled && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
              <div className="flex justify-between text-xs font-cute font-bold text-slate-300 mb-2">
                <span>Sound Volume</span>
                <span className="font-mono-code">{Math.round(settings.soundVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => gameManager.setVolume(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          )}

          {/* Screen Shake Toggle */}
          <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div>
              <div className="font-cute font-bold text-sm text-slate-100">Screen Shake</div>
              <div className="text-[10px] text-slate-400">Dramatic camera impact on traps</div>
            </div>
            <button
              onClick={() => gameManager.setScreenShake(!settings.screenShake)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.screenShake ? 'bg-cyan-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-1 left-1 ${
                  settings.screenShake ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Speedrun Timer Toggle */}
          <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-3">
            <div>
              <div className="font-cute font-bold text-sm text-slate-100">Speedrun Timer</div>
              <div className="text-[10px] text-slate-400">Display running millisecond clock in HUD</div>
            </div>
            <button
              onClick={() => gameManager.setSpeedrunTimer(!settings.speedrunTimer)}
              className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
                settings.speedrunTimer ? 'bg-amber-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-1 left-1 ${
                  settings.speedrunTimer ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-game text-sm tracking-wider transition cursor-pointer border border-slate-700"
        >
          DONE
        </button>
      </div>
    </div>
  );
};
