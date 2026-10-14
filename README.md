# NICE TRY! — The Game That Hates You 🎮💥

> *"Every mistake is a joke. You're the punchline."*

**NICE TRY!** is a brutally difficult, hilarious 2D troll platformer built with **HTML5, Phaser 3, TypeScript, and Vite**, designed for precision jumping, psychological warfare, and browser/YouTube Playables compatibility.

---

## 🌟 Game Highlights

- **15 Handcrafted Levels across 5 Distinct Worlds**:
  - **World 1: Trust Issues** (Levels 1–3) — The gentle introduction to betrayal.
  - **World 2: Psychological Warfare** (Levels 4–6) — Reverse psychology signs, overpowered springs, and malicious clouds.
  - **World 3: Pure Betrayal** (Levels 7–9) — Twin platforms, cracking stones, and the infamous Fake Finish door.
  - **World 4: The Mind Games** (Levels 10–12) — The Cozy Rest Stop trap, falling blocks, and fork choices.
  - **World 5: The Developer is Evil** (Levels 13–15) — Complex trap gauntlets culminating in the Grand Finale!

- **10 Deceptive Troll Traps**:
  1. **Fake Treasure**: Tempting gold chest that drops a pit trap beneath you.
  2. **Lying Checkpoint**: Celebratory flag that sprouts feet, mocks you, and drops you into spikes.
  3. **The Betrayal Jump**: Identical looking platform that crumbles upon touch.
  4. **The Fake Finish**: Premature victory fanfare and confetti before reality crashes down.
  5. **The Suspicious Cloud**: Moving cloud that drops instantly upon boarding.
  6. **The Overpowered Spring**: Extreme 3x catapult launch aimed at ceiling hazards.
  7. **Reverse Psychology Signs**: Signs that deliberately mislead ("DO NOT JUMP").
  8. **The Memory Test**: Cracking stone platforms with a 0.5s collapse timer.
  9. **The Fake Safe Zone**: An enclosed "Rest Stop" room with falling hazards.
  10. **The Last-Second Trap**: Surprise falling hazard right in front of the real goal.

- **50+ Context-Aware Death Roasts**:
  - Dynamically selected based on actual death cause (`spikes`, `fake_treasure`, `lying_checkpoint`, `overpowered_spring`, `streak_deaths`, `rushing`).
  - No repetitive messages; includes adaptive commentary and performance titles (*"Suspiciously Competent"*, *"Professional Floor Inspector"*, *"Spikes' Favorite Customer"*).

- **Instant Restart System**:
  - Zero load time: press <kbd>R</kbd>, <kbd>SPACE</kbd>, or tap the screen to restart immediately with preserved genuine checkpoints.

- **Web Audio Procedural Sound Engine**:
  - Zero external MP3/WAV assets to download or fail! 100% synthesized jump tones, boings, crunchy spike impacts, sliding whistles, fake sour fanfare, and real victory anthems.

- **Multiplatform & YouTube Playables Integration**:
  - Desktop keyboard controls (`A/D`, arrows, `SPACE`, `W`, `R`, `ESC`).
  - Mobile touch controls with on-screen D-pad and tactile Jump button.
  - YouTube Playables SDK lifecycle handling (`firstFrameReady`, `gameReady`, pause/resume, save/load with `localStorage` fallback).

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The game will start at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
The optimized static build will be generated in the `dist` folder.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🕹️ Controls

| Action | Desktop Keyboard | Mobile Touchscreen |
| :--- | :--- | :--- |
| **Move Left** | `A` or `Left Arrow` | Left Arrow Button |
| **Move Right** | `D` or `Right Arrow` | Right Arrow Button |
| **Jump (Variable Height)** | `Space` / `W` / `Up Arrow` | Big Yellow JUMP Button |
| **Instant Restart** | `R` or `Space` (on death) | Quick Retry Button / Tap |
| **Pause Game** | `Escape` | Pause Button in HUD |

---

## 🛠️ Architecture

- `src/game/GameScene.ts` — Phaser 3 arcade physics scene, collision matrix, and trap implementations.
- `src/game/GameManager.ts` — Central state management, speedrun stopwatch, local save data, and stats.
- `src/game/levels.ts` — Level definitions, platform geometries, hazards, and spawn points.
- `src/game/roasts.ts` — 60+ context-aware comedic death messages and title ranks.
- `src/game/textures.ts` — Dynamic canvas vector texture generator for crisp graphics at all display scales.
- `src/game/audio.ts` — Procedural Web Audio API synthesizer.
- `src/game/playables.ts` — YouTube Playables SDK compliance layer.
- `src/components/` — React UI overlays (HUD, MainMenu, DeathModal, LevelCompleteModal, VictoryModal, TouchControls, SettingsModal, LevelSelectModal, RoastGalleryModal).

---

## 📜 License
Apache-2.0
