import React, { useState, useEffect } from 'react';
import { GameScene } from '../game/GameScene';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

export const TouchControls: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [leftPressed, setLeftPressed] = useState<boolean>(false);
  const [rightPressed, setRightPressed] = useState<boolean>(false);
  const [jumpPressed, setJumpPressed] = useState<boolean>(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth <= 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const handleLeftStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setLeftPressed(true);
    GameScene.mobileInput.left = true;
  };
  const handleLeftEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setLeftPressed(false);
    GameScene.mobileInput.left = false;
  };

  const handleRightStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setRightPressed(true);
    GameScene.mobileInput.right = true;
  };
  const handleRightEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setRightPressed(false);
    GameScene.mobileInput.right = false;
  };

  const handleJumpStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setJumpPressed(true);
    GameScene.mobileInput.jump = true;
  };
  const handleJumpEnd = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setJumpPressed(false);
    GameScene.mobileInput.jump = false;
  };

  if (!isTouchDevice) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none select-none z-20 pb-4 px-6 flex justify-between items-end">
      {/* Directional Pad */}
      <div className="flex gap-4 pointer-events-auto">
        <button
          onTouchStart={handleLeftStart}
          onTouchEnd={handleLeftEnd}
          onMouseDown={handleLeftStart}
          onMouseUp={handleLeftEnd}
          className={`w-18 h-18 rounded-2xl flex items-center justify-center font-bold text-white shadow-xl transition-all border-2 ${
            leftPressed
              ? 'bg-rose-600 scale-95 border-rose-400 ring-4 ring-rose-500/40'
              : 'bg-slate-900/80 active:bg-rose-600 border-slate-700 backdrop-blur-sm'
          }`}
          aria-label="Move Left"
        >
          <ArrowLeft className="w-8 h-8 text-white drop-shadow" />
        </button>

        <button
          onTouchStart={handleRightStart}
          onTouchEnd={handleRightEnd}
          onMouseDown={handleRightStart}
          onMouseUp={handleRightEnd}
          className={`w-18 h-18 rounded-2xl flex items-center justify-center font-bold text-white shadow-xl transition-all border-2 ${
            rightPressed
              ? 'bg-rose-600 scale-95 border-rose-400 ring-4 ring-rose-500/40'
              : 'bg-slate-900/80 active:bg-rose-600 border-slate-700 backdrop-blur-sm'
          }`}
          aria-label="Move Right"
        >
          <ArrowRight className="w-8 h-8 text-white drop-shadow" />
        </button>
      </div>

      {/* Jump Button */}
      <div className="pointer-events-auto">
        <button
          onTouchStart={handleJumpStart}
          onTouchEnd={handleJumpEnd}
          onMouseDown={handleJumpStart}
          onMouseUp={handleJumpEnd}
          className={`w-22 h-22 rounded-2xl flex flex-col items-center justify-center font-game text-white shadow-2xl transition-all border-3 ${
            jumpPressed
              ? 'bg-amber-500 scale-95 border-amber-300 ring-4 ring-amber-400/50'
              : 'bg-amber-600/90 active:bg-amber-500 border-amber-400/80 backdrop-blur-sm'
          }`}
          aria-label="Jump"
        >
          <ArrowUp className="w-9 h-9 text-white drop-shadow" />
          <span className="text-[11px] tracking-wider font-extrabold uppercase mt-[-2px]">JUMP</span>
        </button>
      </div>
    </div>
  );
};
