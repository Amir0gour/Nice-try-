import { LevelDefinition } from './types';

// All 15 levels calibrated with:
// - Lengthy widths (2400px - 3400px)
// - Gentle vertical platform steps (40px - 60px max height difference, never exceeding 70px)
// - Comfortable horizontal gaps (60px - 120px)
// - Multi-checkpoint checkpoints on lengthy levels

export const LEVELS: LevelDefinition[] = [
  // ==========================================
  // WORLD 1 — TRUST ISSUES (Levels 1–3)
  // ==========================================
  {
    id: 1,
    worldNumber: 1,
    worldTitle: 'Trust Issues',
    title: 'Welcome to Paradise',
    description: 'An expansive introductory run across the meadows. Learn the controls without stress.',
    width: 2500,
    height: 600,
    theme: 'grass',
    spawn: { x: 80, y: 480 },
    realCheckpoints: [
      { x: 860, y: 480 },
      { x: 1720, y: 460 },
    ],
    exit: { x: 2380, y: 460 },
    parTimeSeconds: 28,
    platforms: [
      // Section 1: Intro meadows
      { x: 0, y: 520, width: 340, height: 80 },
      { x: 400, y: 520, width: 220, height: 80 },
      { x: 480, y: 460, width: 120, height: 24 }, // Gentle 60px step up
      { x: 660, y: 460, width: 120, height: 24 },
      // Checkpoint 1 Plateau
      { x: 800, y: 520, width: 220, height: 80 },
      // Section 2: Moving platform crossing
      { x: 1200, y: 480, width: 120, height: 24 },
      { x: 1380, y: 450, width: 140, height: 24 },
      { x: 1560, y: 480, width: 120, height: 24 },
      // Checkpoint 2 Plateau
      { x: 1680, y: 500, width: 200, height: 80 },
      // Section 3: Final step stone sprint
      { x: 1940, y: 460, width: 110, height: 24 },
      { x: 2100, y: 440, width: 110, height: 24 },
      { x: 2260, y: 500, width: 240, height: 80 },
    ],
    hazards: [
      { x: 340, y: 560, width: 60, height: 28, type: 'spikes_up' },
      { x: 620, y: 560, width: 180, height: 28, type: 'spikes_up' },
      { x: 1020, y: 560, width: 660, height: 28, type: 'spikes_up' },
      { x: 1880, y: 560, width: 380, height: 28, type: 'spikes_up' },
    ],
    movingPlatforms: [
      { x: 1050, y: 480, width: 90, height: 24, targetX: 1170, targetY: 480, speed: 65, behavior: 'pingpong' },
    ],
    signs: [
      { x: 140, y: 480, text: 'A/D to Move. SPACE to Jump!', subtext: 'Hold Jump for maximum height.' },
      { x: 860, y: 480, text: 'Checkpoint 1 Activated', subtext: 'Progress safely stored.' },
      { x: 1720, y: 460, text: 'Checkpoint 2 Activated', subtext: 'The home stretch awaits!' },
    ],
  },
  {
    id: 2,
    worldNumber: 1,
    worldTitle: 'Trust Issues',
    title: 'Greed is Good?',
    description: 'A lengthy adventure with tempting treasure and multiple routes.',
    width: 2700,
    height: 600,
    theme: 'grass',
    spawn: { x: 80, y: 480 },
    realCheckpoints: [
      { x: 920, y: 460 },
      { x: 1840, y: 440 },
    ],
    exit: { x: 2580, y: 440 },
    parTimeSeconds: 32,
    platforms: [
      { x: 0, y: 520, width: 300, height: 80 },
      // Lower path to Fake Chest (Trap platform)
      { x: 360, y: 520, width: 140, height: 24, type: 'fake' }, // Collapses when looted!
      // Upper genuine route (gentle steps: 520 -> 460 -> 420)
      { x: 260, y: 460, width: 120, height: 24 },
      { x: 440, y: 420, width: 140, height: 24 },
      { x: 640, y: 450, width: 140, height: 24 },
      // Checkpoint 1 Island
      { x: 840, y: 500, width: 220, height: 60 },
      // Midfield stepping bridges
      { x: 1120, y: 470, width: 120, height: 24 },
      { x: 1300, y: 440, width: 120, height: 24 },
      { x: 1480, y: 470, width: 120, height: 24 },
      { x: 1660, y: 450, width: 120, height: 24 },
      // Checkpoint 2 Island
      { x: 1780, y: 480, width: 200, height: 60 },
      // Final leg to goal
      { x: 2040, y: 460, width: 110, height: 24 },
      { x: 2210, y: 430, width: 110, height: 24 },
      { x: 2380, y: 460, width: 110, height: 24 },
      { x: 2520, y: 480, width: 180, height: 80 },
    ],
    hazards: [
      { x: 300, y: 560, width: 60, height: 28, type: 'spikes_up' },
      { x: 360, y: 560, width: 140, height: 28, type: 'spikes_up' }, // Spikes beneath chest trap
      { x: 500, y: 560, width: 340, height: 28, type: 'spikes_up' },
      { x: 1060, y: 560, width: 720, height: 28, type: 'spikes_up' },
      { x: 1980, y: 560, width: 540, height: 28, type: 'spikes_up' },
    ],
    traps: [
      {
        id: 'chest_trap_1',
        type: 'fake_treasure',
        x: 430,
        y: 488,
      },
    ],
    signs: [
      { x: 140, y: 480, text: 'Free Diamonds Below!', subtext: 'Definitely not rigged to collapse.' },
      { x: 440, y: 385, text: 'Upper Route', subtext: 'Leave the chest alone!' },
      { x: 920, y: 460, text: 'Checkpoint 1', subtext: 'Halfway there.' },
    ],
  },
  {
    id: 3,
    worldNumber: 1,
    worldTitle: 'Trust Issues',
    title: 'The Lying Flag',
    description: 'A lengthy gauntlet where flags test your loyalty. Jumping works perfectly!',
    width: 2800,
    height: 600,
    theme: 'grass',
    spawn: { x: 80, y: 480 },
    realCheckpoints: [
      { x: 960, y: 460 },
      { x: 1920, y: 440 },
    ],
    exit: { x: 2680, y: 440 },
    parTimeSeconds: 35,
    platforms: [
      { x: 0, y: 520, width: 260, height: 80 },
      { x: 320, y: 480, width: 100, height: 24 },
      // Fake checkpoint platform that crumbles!
      { x: 480, y: 460, width: 110, height: 24, type: 'cracking' },
      // Safe escape stones
      { x: 650, y: 440, width: 110, height: 24 },
      // REAL CHECKPOINT 1 PLATFORM (wide, comfortable, jumping guaranteed)
      { x: 840, y: 500, width: 240, height: 60 },
      // Middle leg with moving cloud
      { x: 1140, y: 470, width: 110, height: 24 },
      { x: 1460, y: 450, width: 120, height: 24 },
      { x: 1640, y: 480, width: 120, height: 24 },
      // REAL CHECKPOINT 2 PLATFORM
      { x: 1820, y: 480, width: 220, height: 60 },
      // Final approach
      { x: 2100, y: 450, width: 110, height: 24 },
      { x: 2270, y: 420, width: 110, height: 24 },
      { x: 2440, y: 450, width: 110, height: 24 },
      { x: 2600, y: 480, width: 200, height: 80 },
    ],
    hazards: [
      { x: 260, y: 560, width: 60, height: 28, type: 'spikes_up' },
      { x: 420, y: 560, width: 420, height: 28, type: 'spikes_up' },
      { x: 1080, y: 560, width: 740, height: 28, type: 'spikes_up' },
      { x: 2040, y: 560, width: 560, height: 28, type: 'spikes_up' },
    ],
    movingPlatforms: [
      { x: 1290, y: 460, width: 90, height: 24, targetX: 1410, targetY: 460, speed: 65, behavior: 'pingpong' },
    ],
    traps: [
      {
        id: 'fake_flag_1',
        type: 'lying_checkpoint',
        x: 535,
        y: 420,
      },
    ],
    signs: [
      { x: 140, y: 480, text: 'Checkpoint Ahead!', subtext: 'Notice the red base? It might run away.' },
      { x: 960, y: 460, text: 'REAL CHECKPOINT', subtext: 'Solid blue base. Flawless jumping ahead.' },
    ],
  },

  // ==========================================
  // WORLD 2 — PSYCHOLOGICAL WARFARE (Levels 4–6)
  // ==========================================
  {
    id: 4,
    worldNumber: 2,
    worldTitle: 'Psychological Warfare',
    title: 'Signs of Danger',
    description: 'A lengthy cyber-laboratory test of reading comprehension and skepticism.',
    width: 2900,
    height: 600,
    theme: 'lab',
    spawn: { x: 80, y: 500 },
    realCheckpoints: [
      { x: 960, y: 480 },
      { x: 1950, y: 460 },
    ],
    exit: { x: 2780, y: 460 },
    parTimeSeconds: 36,
    platforms: [
      { x: 0, y: 540, width: 240, height: 80 },
      // Reverse sign section: walking drops into pit, must jump!
      { x: 320, y: 540, width: 100, height: 80 },
      { x: 490, y: 500, width: 110, height: 24 },
      { x: 670, y: 470, width: 110, height: 24 },
      // Checkpoint 1
      { x: 860, y: 520, width: 220, height: 60 },
      // Second sign gauntlet with overhead ceiling
      { x: 1160, y: 500, width: 140, height: 24 },
      { x: 1370, y: 470, width: 120, height: 24 },
      { x: 1570, y: 450, width: 120, height: 24 },
      { x: 1750, y: 480, width: 120, height: 24 },
      // Checkpoint 2
      { x: 1880, y: 500, width: 200, height: 60 },
      // Final section
      { x: 2160, y: 470, width: 110, height: 24 },
      { x: 2340, y: 440, width: 110, height: 24 },
      { x: 2520, y: 470, width: 110, height: 24 },
      { x: 2680, y: 500, width: 220, height: 80 },
    ],
    hazards: [
      { x: 240, y: 580, width: 80, height: 28, type: 'spikes_up' },
      { x: 420, y: 580, width: 440, height: 28, type: 'spikes_up' },
      // Overhead spikes punishing high jumps if player follows sign #2
      { x: 1160, y: 390, width: 140, height: 28, type: 'spikes_down' },
      { x: 1080, y: 580, width: 800, height: 28, type: 'spikes_up' },
      { x: 2080, y: 580, width: 600, height: 28, type: 'spikes_up' },
    ],
    signs: [
      { x: 140, y: 500, text: 'DO NOT JUMP', subtext: 'Walking into pits builds character.' },
      { x: 1100, y: 460, text: 'DO A HIGH JUMP!', subtext: 'Look above before leaping!' },
      { x: 1950, y: 460, text: 'Checkpoint 2', subtext: 'Final stretch ahead!' },
    ],
    traps: [
      {
        id: 'rev_sign_1',
        type: 'reverse_sign',
        x: 140,
        y: 500,
      },
    ],
  },
  {
    id: 5,
    worldNumber: 2,
    worldTitle: 'Psychological Warfare',
    title: 'Bouncy Betrayal',
    description: 'A super-lengthy bouncy laboratory where springs launch you to the stratosphere.',
    width: 3000,
    height: 620,
    theme: 'lab',
    spawn: { x: 80, y: 500 },
    realCheckpoints: [
      { x: 1020, y: 440 },
      { x: 2040, y: 440 },
    ],
    exit: { x: 2900, y: 440 },
    parTimeSeconds: 38,
    platforms: [
      { x: 0, y: 540, width: 220, height: 80 },
      // Spring 1 Platform
      { x: 300, y: 540, width: 100, height: 80 },
      // Safe landing ledge (comfortable jump)
      { x: 500, y: 460, width: 140, height: 30 },
      { x: 720, y: 430, width: 120, height: 24 },
      // Checkpoint 1
      { x: 940, y: 480, width: 180, height: 60 },
      // Midfield bounce section
      { x: 1200, y: 540, width: 100, height: 80 }, // Spring 2
      { x: 1420, y: 460, width: 140, height: 24 },
      { x: 1640, y: 430, width: 120, height: 24 },
      { x: 1820, y: 460, width: 120, height: 24 },
      // Checkpoint 2
      { x: 1960, y: 480, width: 180, height: 60 },
      // Final leg
      { x: 2220, y: 460, width: 110, height: 24 },
      { x: 2400, y: 430, width: 110, height: 24 },
      { x: 2580, y: 460, width: 110, height: 24 },
      { x: 2780, y: 500, width: 220, height: 80 },
    ],
    hazards: [
      { x: 220, y: 580, width: 80, height: 28, type: 'spikes_up' },
      { x: 280, y: 250, width: 140, height: 28, type: 'spikes_down' }, // High ceiling spikes above Spring 1
      { x: 400, y: 580, width: 540, height: 28, type: 'spikes_up' },
      { x: 1180, y: 250, width: 140, height: 28, type: 'spikes_down' }, // Above Spring 2
      { x: 1120, y: 580, width: 840, height: 28, type: 'spikes_up' },
      { x: 2140, y: 580, width: 640, height: 28, type: 'spikes_up' },
    ],
    traps: [
      {
        id: 'spring_overpowered_1',
        type: 'overpowered_spring',
        x: 350,
        y: 508,
      },
      {
        id: 'spring_overpowered_1b',
        type: 'overpowered_spring',
        x: 1250,
        y: 508,
      },
    ],
    signs: [
      { x: 140, y: 500, text: 'Super Boost Springs', subtext: 'Steer sideways mid-air to land safely.' },
      { x: 1020, y: 440, text: 'Checkpoint 1', subtext: 'Safe footing achieved.' },
    ],
  },
  {
    id: 6,
    worldNumber: 2,
    worldTitle: 'Psychological Warfare',
    title: 'Cloudy with a Chance of Troll',
    description: 'An extended cloud-hopping voyage across a bottomless digital canyon.',
    width: 3000,
    height: 620,
    theme: 'lab',
    spawn: { x: 80, y: 500 },
    realCheckpoints: [
      { x: 1000, y: 440 },
      { x: 2000, y: 440 },
    ],
    exit: { x: 2900, y: 460 },
    parTimeSeconds: 40,
    platforms: [
      { x: 0, y: 540, width: 220, height: 80 },
      { x: 560, y: 480, width: 120, height: 30 },
      // Checkpoint 1 Island
      { x: 920, y: 480, width: 180, height: 60 },
      { x: 1440, y: 460, width: 120, height: 30 },
      // Checkpoint 2 Island
      { x: 1920, y: 480, width: 180, height: 60 },
      { x: 2420, y: 460, width: 120, height: 30 },
      { x: 2800, y: 520, width: 200, height: 80 },
    ],
    hazards: [
      { x: 220, y: 580, width: 340, height: 28, type: 'spikes_up' },
      { x: 680, y: 580, width: 240, height: 28, type: 'spikes_up' },
      { x: 1100, y: 580, width: 820, height: 28, type: 'spikes_up' },
      { x: 2100, y: 580, width: 700, height: 28, type: 'spikes_up' },
    ],
    movingPlatforms: [
      // Cloud 1: Steady ferry
      { x: 300, y: 450, width: 90, height: 24, targetX: 480, targetY: 450, speed: 70, behavior: 'pingpong' },
      // Cloud 2: Troll cloud that drops!
      { x: 760, y: 430, width: 90, height: 24, targetX: 860, targetY: 530, speed: 120, behavior: 'troll_drop' },
      // Cloud 3: Midfield smooth ferry
      { x: 1200, y: 450, width: 90, height: 24, targetX: 1360, targetY: 450, speed: 75, behavior: 'pingpong' },
      // Cloud 4: Second troll drop
      { x: 1640, y: 430, width: 90, height: 24, targetX: 1780, targetY: 530, speed: 120, behavior: 'troll_drop' },
      // Cloud 5: Final approach ferry
      { x: 2180, y: 450, width: 90, height: 24, targetX: 2340, targetY: 450, speed: 75, behavior: 'pingpong' },
      // Cloud 6: Final troll test
      { x: 2600, y: 440, width: 90, height: 24, targetX: 2720, targetY: 530, speed: 120, behavior: 'troll_drop' },
    ],
    traps: [
      {
        id: 'suspicious_cloud_1',
        type: 'suspicious_cloud',
        x: 760,
        y: 430,
      },
      {
        id: 'suspicious_cloud_2',
        type: 'suspicious_cloud',
        x: 1640,
        y: 430,
      },
      {
        id: 'suspicious_cloud_3',
        type: 'suspicious_cloud',
        x: 2600,
        y: 440,
      },
    ],
    signs: [
      { x: 140, y: 500, text: 'Cloud Transit System', subtext: 'Some clouds drop fast. Be ready to jump!' },
    ],
  },

  // ==========================================
  // WORLD 3 — PURE BETRAYAL (Levels 7–9)
  // ==========================================
  {
    id: 7,
    worldNumber: 3,
    worldTitle: 'Pure Betrayal',
    title: 'Twin Leap of Faith',
    description: 'An extended volcanic expedition. Identical twins hide sinister trapdoors.',
    width: 3100,
    height: 620,
    theme: 'volcano',
    spawn: { x: 80, y: 500 },
    realCheckpoints: [
      { x: 1040, y: 440 },
      { x: 2060, y: 440 },
    ],
    exit: { x: 2980, y: 460 },
    parTimeSeconds: 42,
    platforms: [
      { x: 0, y: 540, width: 220, height: 80 },
      // Twin Platform Pair 1
      { x: 300, y: 480, width: 90, height: 24 },
      { x: 460, y: 480, width: 90, height: 24, type: 'fake' }, // Collapses!
      // High safety beam
      { x: 380, y: 390, width: 110, height: 24 },
      { x: 620, y: 440, width: 110, height: 24 },
      { x: 790, y: 470, width: 110, height: 24 },
      // Checkpoint 1
      { x: 960, y: 480, width: 180, height: 60 },
      // Twin Platform Pair 2
      { x: 1240, y: 460, width: 90, height: 24, type: 'fake' },
      { x: 1400, y: 460, width: 90, height: 24 },
      { x: 1580, y: 430, width: 110, height: 24 },
      { x: 1780, y: 460, width: 110, height: 24 },
      // Checkpoint 2
      { x: 1980, y: 480, width: 180, height: 60 },
      // Twin Platform Pair 3
      { x: 2260, y: 460, width: 90, height: 24 },
      { x: 2420, y: 460, width: 90, height: 24, type: 'fake' },
      { x: 2620, y: 440, width: 110, height: 24 },
      { x: 2860, y: 500, width: 240, height: 80 },
    ],
    hazards: [
      { x: 220, y: 580, width: 740, height: 28, type: 'spikes_up' },
      { x: 1140, y: 580, width: 840, height: 28, type: 'spikes_up' },
      { x: 2160, y: 580, width: 700, height: 28, type: 'spikes_up' },
    ],
    traps: [
      {
        id: 'betrayal_jump_1',
        type: 'betrayal_jump',
        x: 460,
        y: 480,
      },
      {
        id: 'betrayal_jump_2',
        type: 'betrayal_jump',
        x: 1240,
        y: 460,
      },
      {
        id: 'betrayal_jump_3',
        type: 'betrayal_jump',
        x: 2420,
        y: 460,
      },
    ],
    signs: [
      { x: 140, y: 500, text: 'Spot the Difference!', subtext: 'One twin platform always betrays.' },
      { x: 1040, y: 440, text: 'Checkpoint 1', subtext: 'Halfway through the volcano.' },
    ],
  },
  {
    id: 8,
    worldNumber: 3,
    worldTitle: 'Pure Betrayal',
    title: 'The Floor is Treachery',
    description: 'A grand marathon across crumbling platforms. Keep your feet moving!',
    width: 3200,
    height: 620,
    theme: 'volcano',
    spawn: { x: 80, y: 500 },
    realCheckpoints: [
      { x: 1040, y: 440 },
      { x: 2120, y: 440 },
    ],
    exit: { x: 3080, y: 440 },
    parTimeSeconds: 44,
    platforms: [
      { x: 0, y: 540, width: 200, height: 80 },
      // Crumbling sprint 1 (comfortably spaced 110-120px apart, 30px height step)
      { x: 280, y: 490, width: 70, height: 24, type: 'cracking' },
      { x: 400, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 520, y: 440, width: 70, height: 24, type: 'cracking' },
      { x: 640, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 770, y: 450, width: 70, height: 24, type: 'cracking' },
      // Checkpoint 1 Island
      { x: 940, y: 480, width: 200, height: 60 },
      // Crumbling sprint 2
      { x: 1220, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 1350, y: 440, width: 70, height: 24, type: 'cracking' },
      { x: 1480, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 1610, y: 440, width: 70, height: 24, type: 'cracking' },
      { x: 1740, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 1870, y: 440, width: 70, height: 24, type: 'cracking' },
      // Checkpoint 2 Island
      { x: 2020, y: 480, width: 200, height: 60 },
      // Final sprint
      { x: 2300, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 2430, y: 440, width: 70, height: 24, type: 'cracking' },
      { x: 2560, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 2690, y: 440, width: 70, height: 24, type: 'cracking' },
      { x: 2820, y: 460, width: 70, height: 24, type: 'cracking' },
      { x: 2980, y: 480, width: 220, height: 80 },
    ],
    hazards: [
      { x: 200, y: 580, width: 740, height: 28, type: 'spikes_up' },
      { x: 1140, y: 580, width: 880, height: 28, type: 'spikes_up' },
      { x: 2220, y: 580, width: 760, height: 28, type: 'spikes_up' },
    ],
    traps: [
      {
        id: 'memory_test_1',
        type: 'memory_test',
        x: 400,
        y: 460,
      },
    ],
    signs: [
      { x: 140, y: 500, text: 'No Hesitation Allowed', subtext: '0.5 seconds before collapse. Maintain pace!' },
    ],
  },
  {
    id: 9,
    worldNumber: 3,
    worldTitle: 'Pure Betrayal',
    title: 'The Fake Finish',
    description: 'A grand multi-tier volcanic fortress. The shiny door below is a wicked trap!',
    width: 3200,
    height: 650,
    theme: 'volcano',
    spawn: { x: 80, y: 520 },
    realCheckpoints: [
      { x: 1050, y: 460 },
      { x: 2100, y: 440 },
    ],
    exit: { x: 3050, y: 260 }, // Real exit is perched high in the sky!
    parTimeSeconds: 46,
    platforms: [
      { x: 0, y: 560, width: 220, height: 80 },
      { x: 300, y: 510, width: 110, height: 24 },
      { x: 480, y: 470, width: 110, height: 24 },
      { x: 670, y: 490, width: 110, height: 24 },
      // Checkpoint 1
      { x: 960, y: 500, width: 200, height: 60 },
      // Middle volcanic bridge
      { x: 1240, y: 470, width: 110, height: 24 },
      { x: 1440, y: 440, width: 110, height: 24 },
      { x: 1640, y: 470, width: 110, height: 24 },
      { x: 1840, y: 450, width: 110, height: 24 },
      // Checkpoint 2
      { x: 2000, y: 480, width: 200, height: 60 },
      // Ledge with the FAKE exit on bottom floor
      { x: 2280, y: 540, width: 220, height: 40 },
      // Path to the REAL exit up top (gentle vertical climb)
      { x: 2320, y: 390, width: 110, height: 24 },
      { x: 2520, y: 340, width: 110, height: 24 },
      { x: 2720, y: 300, width: 110, height: 24 },
      { x: 2940, y: 300, width: 240, height: 40 }, // Real exit shrine!
    ],
    hazards: [
      { x: 220, y: 600, width: 740, height: 28, type: 'spikes_up' },
      { x: 1160, y: 600, width: 840, height: 28, type: 'spikes_up' },
      { x: 2200, y: 600, width: 900, height: 28, type: 'spikes_up' },
      // Spikes in front of fake exit
      { x: 2440, y: 560, width: 60, height: 28, type: 'spikes_up' },
    ],
    traps: [
      {
        id: 'fake_exit_1',
        type: 'fake_exit',
        x: 2400,
        y: 495,
      },
    ],
    signs: [
      { x: 140, y: 520, text: 'Look UP!', subtext: 'The true path is in the sky, not in the basement.' },
      { x: 2100, y: 440, text: 'Checkpoint 2', subtext: 'Climb above to claim victory!' },
    ],
  },

  // ==========================================
  // WORLD 4 — THE MIND GAMES (Levels 10–12)
  // ==========================================
  {
    id: 10,
    worldNumber: 4,
    worldTitle: 'The Mind Games',
    title: 'The Cozy Rest Stop',
    description: 'A lengthy trek into the void with a suspiciously enclosed shelter.',
    width: 3200,
    height: 650,
    theme: 'mind',
    spawn: { x: 80, y: 520 },
    realCheckpoints: [
      { x: 1150, y: 460 },
      { x: 2150, y: 440 },
    ],
    exit: { x: 3080, y: 460 },
    parTimeSeconds: 46,
    platforms: [
      { x: 0, y: 560, width: 220, height: 80 },
      { x: 300, y: 510, width: 110, height: 24 },
      // Enclosed "Rest Stop" cabin (Trap floor collapses into spikes!)
      { x: 480, y: 530, width: 240, height: 30, type: 'cracking' },
      { x: 480, y: 370, width: 240, height: 20 }, // Ceiling
      { x: 470, y: 390, width: 20, height: 90 },  // Left wall
      // Escape ledge
      { x: 790, y: 490, width: 120, height: 24 },
      // Checkpoint 1
      { x: 1040, y: 500, width: 220, height: 60 },
      // Midfield stepping bridges
      { x: 1340, y: 470, width: 110, height: 24 },
      { x: 1540, y: 440, width: 110, height: 24 },
      { x: 1740, y: 470, width: 110, height: 24 },
      { x: 1940, y: 450, width: 110, height: 24 },
      // Checkpoint 2
      { x: 2060, y: 480, width: 200, height: 60 },
      // Final stretch
      { x: 2340, y: 460, width: 110, height: 24 },
      { x: 2520, y: 430, width: 110, height: 24 },
      { x: 2700, y: 460, width: 110, height: 24 },
      { x: 2900, y: 500, width: 280, height: 80 },
    ],
    hazards: [
      { x: 220, y: 600, width: 80, height: 28, type: 'spikes_up' },
      { x: 480, y: 600, width: 240, height: 28, type: 'spikes_up' }, // Beneath fake rest floor
      { x: 480, y: 390, width: 240, height: 24, type: 'spikes_down' }, // Ceiling spikes in rest stop!
      { x: 720, y: 600, width: 320, height: 28, type: 'spikes_up' },
      { x: 1260, y: 600, width: 800, height: 28, type: 'spikes_up' },
      { x: 2260, y: 600, width: 640, height: 28, type: 'spikes_up' },
    ],
    traps: [
      {
        id: 'fake_safe_zone_1',
        type: 'fake_safe_zone',
        x: 600,
        y: 490,
      },
    ],
    signs: [
      { x: 520, y: 495, text: 'REST STOP', subtext: 'Do not panic. Sprint through!' },
      { x: 1150, y: 460, text: 'Checkpoint 1', subtext: 'Sanctuary achieved.' },
    ],
  },
  {
    id: 11,
    worldNumber: 4,
    worldTitle: 'The Mind Games',
    title: "Don't Look Up",
    description: 'A lengthy gauntlet with overhead falling hazards. Observe before stepping forward.',
    width: 3250,
    height: 650,
    theme: 'mind',
    spawn: { x: 80, y: 520 },
    realCheckpoints: [
      { x: 1100, y: 460 },
      { x: 2150, y: 440 },
    ],
    exit: { x: 3100, y: 460 },
    parTimeSeconds: 46,
    platforms: [
      { x: 0, y: 560, width: 200, height: 80 },
      { x: 300, y: 510, width: 110, height: 24 },
      { x: 500, y: 480, width: 110, height: 24 },
      { x: 720, y: 500, width: 110, height: 24 },
      // Checkpoint 1
      { x: 1000, y: 500, width: 200, height: 60 },
      { x: 1280, y: 470, width: 110, height: 24 },
      { x: 1480, y: 440, width: 110, height: 24 },
      { x: 1700, y: 470, width: 110, height: 24 },
      { x: 1920, y: 450, width: 110, height: 24 },
      // Checkpoint 2
      { x: 2060, y: 480, width: 200, height: 60 },
      { x: 2340, y: 460, width: 110, height: 24 },
      { x: 2540, y: 430, width: 110, height: 24 },
      { x: 2740, y: 460, width: 110, height: 24 },
      { x: 2950, y: 500, width: 280, height: 80 },
    ],
    hazards: [
      { x: 200, y: 600, width: 800, height: 28, type: 'spikes_up' },
      { x: 1200, y: 600, width: 860, height: 28, type: 'spikes_up' },
      { x: 2260, y: 600, width: 690, height: 28, type: 'spikes_up' },
      // Overhead falling blocks
      { x: 350, y: 240, width: 32, height: 32, type: 'spikes_down' },
      { x: 770, y: 240, width: 32, height: 32, type: 'spikes_down' },
      { x: 1530, y: 240, width: 32, height: 32, type: 'spikes_down' },
      { x: 2590, y: 240, width: 32, height: 32, type: 'spikes_down' },
    ],
    traps: [
      {
        id: 'fall_block_1',
        type: 'falling_block',
        x: 350,
        y: 260,
      },
      {
        id: 'fall_block_2',
        type: 'falling_block',
        x: 770,
        y: 260,
      },
      {
        id: 'fall_block_3',
        type: 'falling_block',
        x: 1530,
        y: 260,
      },
      {
        id: 'fall_block_4',
        type: 'falling_block',
        x: 2590,
        y: 260,
      },
    ],
    signs: [
      { x: 140, y: 520, text: 'Safety Helmet Zone', subtext: 'Look up before stepping under hazards.' },
    ],
  },
  {
    id: 12,
    worldNumber: 4,
    worldTitle: 'The Mind Games',
    title: 'The Second Thoughts',
    description: 'An expansive fork with multiple temptations, cracking floors, and boost springs.',
    width: 3300,
    height: 650,
    theme: 'mind',
    spawn: { x: 80, y: 520 },
    realCheckpoints: [
      { x: 1100, y: 420 },
      { x: 2200, y: 420 },
    ],
    exit: { x: 3150, y: 440 },
    parTimeSeconds: 48,
    platforms: [
      { x: 0, y: 560, width: 200, height: 80 },
      // Lower path with bait chest, Upper path with springs (gentle steps)
      { x: 280, y: 520, width: 120, height: 24, type: 'cracking' },
      { x: 460, y: 460, width: 140, height: 30 },
      { x: 700, y: 420, width: 120, height: 24 },
      { x: 900, y: 460, width: 110, height: 24 },
      // Checkpoint 1
      { x: 1020, y: 480, width: 180, height: 50 },
      // Midfield gauntlet
      { x: 1300, y: 440, width: 110, height: 24 },
      { x: 1520, y: 470, width: 110, height: 24 },
      { x: 1740, y: 440, width: 110, height: 24 },
      { x: 1960, y: 470, width: 110, height: 24 },
      // Checkpoint 2
      { x: 2120, y: 480, width: 180, height: 50 },
      // Final stretch
      { x: 2400, y: 450, width: 110, height: 24 },
      { x: 2600, y: 420, width: 110, height: 24 },
      { x: 2800, y: 450, width: 110, height: 24 },
      { x: 3020, y: 500, width: 260, height: 80 },
    ],
    hazards: [
      { x: 200, y: 600, width: 2820, height: 28, type: 'spikes_up' },
      { x: 700, y: 310, width: 120, height: 24, type: 'spikes_down' },
    ],
    traps: [
      {
        id: 'spring_overpowered_2',
        type: 'overpowered_spring',
        x: 940,
        y: 430,
      },
      {
        id: 'chest_trap_2',
        type: 'fake_treasure',
        x: 340,
        y: 488,
      },
      {
        id: 'spring_overpowered_2b',
        type: 'overpowered_spring',
        x: 1990,
        y: 440,
      },
    ],
    signs: [
      { x: 140, y: 520, text: 'Choose Wisely', subtext: 'One path tests memory, one tests air control.' },
    ],
  },

  // ==========================================
  // WORLD 5 — THE DEVELOPER IS EVIL (Levels 13–15)
  // ==========================================
  {
    id: 13,
    worldNumber: 5,
    worldTitle: 'The Developer is Evil',
    title: 'The Gauntlet of Shame',
    description: 'A massive gauntlet testing everything learned. Moving clouds, deceitful flags, and precision hops.',
    width: 3350,
    height: 650,
    theme: 'evil',
    spawn: { x: 80, y: 520 },
    realCheckpoints: [
      { x: 1150, y: 420 },
      { x: 2250, y: 420 },
    ],
    exit: { x: 3200, y: 440 },
    parTimeSeconds: 50,
    platforms: [
      { x: 0, y: 560, width: 180, height: 80 },
      { x: 480, y: 490, width: 110, height: 24 },
      { x: 690, y: 460, width: 110, height: 24 },
      { x: 910, y: 430, width: 100, height: 24 },
      // Checkpoint 1
      { x: 1080, y: 480, width: 180, height: 50 },
      { x: 1380, y: 440, width: 110, height: 24 },
      { x: 1600, y: 480, width: 100, height: 24 },
      { x: 1820, y: 450, width: 100, height: 24 },
      { x: 2020, y: 480, width: 100, height: 24 },
      // Checkpoint 2
      { x: 2180, y: 480, width: 180, height: 50 },
      { x: 2480, y: 450, width: 110, height: 24 },
      { x: 2680, y: 420, width: 110, height: 24 },
      { x: 2880, y: 450, width: 110, height: 24 },
      { x: 3080, y: 500, width: 250, height: 80 },
    ],
    hazards: [
      { x: 180, y: 600, width: 2900, height: 28, type: 'spikes_up' },
      { x: 910, y: 330, width: 100, height: 28, type: 'spikes_down' },
    ],
    movingPlatforms: [
      { x: 260, y: 500, width: 90, height: 24, targetX: 420, targetY: 500, speed: 80, behavior: 'pingpong' },
    ],
    traps: [
      {
        id: 'lying_flag_2',
        type: 'lying_checkpoint',
        x: 745,
        y: 425,
      },
      {
        id: 'spring_overpowered_3',
        type: 'overpowered_spring',
        x: 1640,
        y: 450,
      },
    ],
    signs: [
      { x: 120, y: 520, text: 'No Mercy Zone', subtext: 'Check the flag base and watch for high launches.' },
    ],
  },
  {
    id: 14,
    worldNumber: 5,
    worldTitle: 'The Developer is Evil',
    title: 'Trust Nobody, Not Even The Floor',
    description: 'A lengthy master trial with crumbling stones, betrayal jumps, and a last-second trap at the door.',
    width: 3400,
    height: 680,
    theme: 'evil',
    spawn: { x: 80, y: 540 },
    realCheckpoints: [
      { x: 1150, y: 460 },
      { x: 2280, y: 460 },
    ],
    exit: { x: 3260, y: 460 },
    parTimeSeconds: 52,
    platforms: [
      { x: 0, y: 580, width: 180, height: 80 },
      { x: 260, y: 530, width: 80, height: 24, type: 'cracking' },
      { x: 410, y: 500, width: 80, height: 24, type: 'cracking' },
      { x: 560, y: 520, width: 80, height: 24, type: 'cracking' },
      { x: 730, y: 480, width: 110, height: 24 },
      { x: 920, y: 450, width: 100, height: 24, type: 'fake' }, // Betrayal jump
      { x: 920, y: 530, width: 100, height: 24 }, // Safe lower route
      // Checkpoint 1
      { x: 1080, y: 510, width: 180, height: 50 },
      { x: 1380, y: 470, width: 90, height: 24, type: 'cracking' },
      { x: 1560, y: 440, width: 90, height: 24, type: 'cracking' },
      { x: 1760, y: 470, width: 110, height: 24 },
      { x: 1980, y: 450, width: 110, height: 24 },
      // Checkpoint 2
      { x: 2200, y: 510, width: 180, height: 50 },
      { x: 2480, y: 480, width: 100, height: 24, type: 'cracking' },
      { x: 2660, y: 450, width: 100, height: 24, type: 'cracking' },
      { x: 2860, y: 480, width: 110, height: 24 },
      { x: 3060, y: 460, width: 110, height: 24 },
      { x: 3180, y: 520, width: 220, height: 80 },
    ],
    hazards: [
      { x: 180, y: 620, width: 3000, height: 28, type: 'spikes_up' },
      // Last-second overhead hazard right before exit
      { x: 3210, y: 420, width: 32, height: 32, type: 'spikes_down' },
    ],
    traps: [
      {
        id: 'last_second_1',
        type: 'last_second_trap',
        x: 3210,
        y: 470,
      },
    ],
    signs: [
      { x: 120, y: 540, text: 'Look Before Stepping', subtext: 'The finish line has trust issues too.' },
    ],
  },
  {
    id: 15,
    worldNumber: 5,
    worldTitle: 'The Developer is Evil',
    title: 'NICE TRY! - The Grand Finale',
    description: 'The monumental final showdown. Every trap combined into a 3500px mega-marathon.',
    width: 3500,
    height: 700,
    theme: 'evil',
    spawn: { x: 80, y: 560 },
    realCheckpoints: [
      { x: 1200, y: 460 },
      { x: 2360, y: 440 },
    ],
    exit: { x: 3380, y: 340 }, // Real Golden Shrine high up!
    parTimeSeconds: 60,
    platforms: [
      { x: 0, y: 600, width: 200, height: 80 },
      // Phase 1: Cracking tiles + spring
      { x: 280, y: 560, width: 80, height: 24, type: 'cracking' },
      { x: 440, y: 530, width: 90, height: 24 },
      { x: 630, y: 490, width: 110, height: 24 },
      // Phase 2: Moving platform to Checkpoint 1 island
      { x: 920, y: 470, width: 110, height: 24 },
      { x: 1120, y: 500, width: 180, height: 60 }, // Checkpoint 1
      // Phase 3: Middle gauntlet
      { x: 1420, y: 460, width: 110, height: 24 },
      { x: 1640, y: 430, width: 110, height: 24 },
      { x: 1860, y: 460, width: 110, height: 24 },
      { x: 2080, y: 430, width: 110, height: 24 },
      // Checkpoint 2 Island
      { x: 2280, y: 480, width: 180, height: 60 }, // Checkpoint 2
      // Phase 4: Lower path has the Fake Exit Door (Troll Trap!)
      { x: 2560, y: 550, width: 200, height: 40 },
      // Phase 5: Upper genuine sky route to the authentic Golden Shrine
      { x: 2540, y: 420, width: 110, height: 24 },
      { x: 2740, y: 380, width: 110, height: 24 },
      { x: 2940, y: 340, width: 110, height: 24 },
      { x: 3140, y: 370, width: 120, height: 24 },
      { x: 3300, y: 400, width: 180, height: 60 }, // Real Golden Shrine
    ],
    hazards: [
      { x: 200, y: 640, width: 3100, height: 28, type: 'spikes_up' },
      { x: 440, y: 380, width: 90, height: 28, type: 'spikes_down' },
      // Spikes in front of fake exit on lower floor
      { x: 2690, y: 550, width: 60, height: 28, type: 'spikes_up' },
    ],
    movingPlatforms: [
      { x: 760, y: 480, width: 90, height: 24, targetX: 890, targetY: 480, speed: 70, behavior: 'pingpong' },
    ],
    traps: [
      {
        id: 'grand_spring',
        type: 'overpowered_spring',
        x: 475,
        y: 498,
      },
      {
        id: 'grand_fake_exit',
        type: 'fake_exit',
        x: 2640,
        y: 505,
      },
      {
        id: 'grand_last_second',
        type: 'last_second_trap',
        x: 3240,
        y: 350,
      },
    ],
    signs: [
      { x: 120, y: 560, text: 'THE DEVELOPER AWAITS', subtext: 'Remember everything you learned. Stay focused.' },
      { x: 1200, y: 460, text: 'Checkpoint 1', subtext: 'One third cleared.' },
      { x: 2360, y: 440, text: 'Checkpoint 2', subtext: 'Ascend to the stars above for the TRUE exit!' },
    ],
  },
];
