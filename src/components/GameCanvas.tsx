import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { GameScene } from '../game/GameScene';
import { playables } from '../game/playables';

interface GameCanvasProps {
  onGameReady?: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onGameReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: 960,
      height: 540,
      backgroundColor: '#090d16',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: [GameScene],
      callbacks: {
        postBoot: (game) => {
          playables.notifyFirstFrameReady();
          playables.notifyGameReady();
          if (onGameReady) onGameReady();
        },
      },
    };

    gameRef.current = new Phaser.Game(config);

    // YouTube Playables lifecycle hooks
    playables.init({
      onPause: () => {
        if (gameRef.current?.scene.isActive('GameScene')) {
          gameRef.current.scene.pause('GameScene');
        }
      },
      onResume: () => {
        if (gameRef.current?.scene.isPaused('GameScene')) {
          gameRef.current.scene.resume('GameScene');
        }
      },
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden relative"
      tabIndex={0}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};
