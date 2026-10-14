/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { gameManager, GameScreen } from './game/GameManager';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { TouchControls } from './components/TouchControls';
import { DeathModal } from './components/DeathModal';
import { LevelCompleteModal } from './components/LevelCompleteModal';
import { VictoryModal } from './components/VictoryModal';
import { PauseModal } from './components/PauseModal';
import { LevelSelectModal } from './components/LevelSelectModal';
import { SettingsModal } from './components/SettingsModal';
import { RoastGalleryModal } from './components/RoastGalleryModal';
import { MainMenu } from './components/MainMenu';

export default function App() {
  const [, setTick] = useState<number>(0);
  const [modalScreen, setModalScreen] = useState<'none' | 'level_select' | 'settings' | 'roasts'>('none');
  const gameKeyRef = useRef<number>(1);

  // Subscribe to GameManager updates
  useEffect(() => {
    const unsubscribe = gameManager.subscribe(() => {
      setTick((t) => t + 1);
    });
    return unsubscribe;
  }, []);

  const screen = gameManager.getScreen();
  const isPaused = gameManager.getIsPaused();
  const isDead = gameManager.getIsDead();
  const isLevelComplete = gameManager.getIsLevelComplete();
  const isGameComplete = gameManager.getIsGameComplete();

  // Instant Restart Action
  const handleInstantRestart = () => {
    gameKeyRef.current += 1;
    gameManager.restartLevel();
  };

  const handleStartPlaying = () => {
    gameManager.startLevel(1);
    gameKeyRef.current += 1;
  };

  const handleSelectLevel = (lvl: number) => {
    setModalScreen('none');
    gameManager.startLevel(lvl);
    gameKeyRef.current += 1;
  };

  const handleNextLevel = () => {
    gameManager.nextLevel();
    gameKeyRef.current += 1;
  };

  const handleReplayLevel = () => {
    gameKeyRef.current += 1;
    gameManager.restartLevel();
  };

  const handleRestartFullGame = () => {
    gameManager.startLevel(1);
    gameKeyRef.current += 1;
  };

  const handleGoHome = () => {
    gameManager.setScreen('menu');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-center items-center relative select-none font-sans">
      {/* 1. Main Menu View */}
      {screen === 'menu' && (
        <MainMenu
          onStart={handleStartPlaying}
          onOpenLevelSelect={() => setModalScreen('level_select')}
          onOpenSettings={() => setModalScreen('settings')}
          onOpenRoasts={() => setModalScreen('roasts')}
        />
      )}

      {/* 2. Active Gameplay View */}
      {screen === 'playing' && (
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Game Canvas Container */}
          <GameCanvas key={gameKeyRef.current} />

          {/* HUD Overlay */}
          <HUD onRestart={handleInstantRestart} />

          {/* Touch Controls (shown on mobile / tablet) */}
          <TouchControls />

          {/* Death Roast Modal */}
          {isDead && <DeathModal onRestart={handleInstantRestart} />}

          {/* Level Complete Modal */}
          {isLevelComplete && !isGameComplete && (
            <LevelCompleteModal
              onNext={handleNextLevel}
              onReplay={handleReplayLevel}
            />
          )}

          {/* Final Campaign Victory Modal */}
          {isGameComplete && (
            <VictoryModal
              onRestartGame={handleRestartFullGame}
              onGoHome={handleGoHome}
            />
          )}

          {/* Pause Menu Modal */}
          {isPaused && (
            <PauseModal
              onResume={() => gameManager.setPaused(false)}
              onRestart={handleInstantRestart}
              onOpenLevelSelect={() => setModalScreen('level_select')}
              onOpenSettings={() => setModalScreen('settings')}
            />
          )}
        </div>
      )}

      {/* 3. Global Sub-modals (Available from Menu or In-Game Pause) */}
      {modalScreen === 'level_select' && (
        <LevelSelectModal
          onSelectLevel={handleSelectLevel}
          onClose={() => setModalScreen('none')}
        />
      )}

      {modalScreen === 'settings' && (
        <SettingsModal onClose={() => setModalScreen('none')} />
      )}

      {modalScreen === 'roasts' && (
        <RoastGalleryModal onClose={() => setModalScreen('none')} />
      )}
    </div>
  );
}
