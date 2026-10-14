import Phaser from 'phaser';

export function generateAllGameTextures(scene: Phaser.Scene) {
  // Generate Player Texture
  generatePlayerTexture(scene, 'player_yellow', 0xfbbf24, 0xd97706);
  generatePlayerTexture(scene, 'player_green', 0x34d399, 0x059669);
  generatePlayerTexture(scene, 'player_red', 0xf87171, 0xdc2626);
  generatePlayerTexture(scene, 'player_blue', 0x60a5fa, 0x2563eb);
  generatePlayerTexture(scene, 'player_white', 0xe2e8f0, 0x94a3b8);

  // Generate World Platform Textures (32x32 tiles)
  generateWorldTile(scene, 'tile_grass', 0x15803d, 0x22c55e, 0x166534); // World 1
  generateWorldTile(scene, 'tile_lab', 0x0284c7, 0x38bdf8, 0x0369a1);   // World 2
  generateWorldTile(scene, 'tile_volcano', 0xb91c1c, 0xf97316, 0x7f1d1d); // World 3
  generateWorldTile(scene, 'tile_mind', 0x7e22ce, 0xa855f7, 0x581c87);    // World 4
  generateWorldTile(scene, 'tile_evil', 0x334155, 0x64748b, 0x0f172a);    // World 5

  // Cracking platform texture
  generateCrackingTile(scene);

  // Spikes (Up, Down, Left, Right)
  generateSpikesTexture(scene);

  // Spring
  generateSpringTextures(scene);

  // Fake & Real Chests
  generateChestTextures(scene);

  // Fake & Real Checkpoint Flags
  generateCheckpointTextures(scene);

  // Cloud
  generateCloudTexture(scene);

  // Exit doors (Real & Fake)
  generateExitTextures(scene);

  // Signs & Indicators
  generateSignTexture(scene);

  // Particles
  generateParticleTextures(scene);
}

function generatePlayerTexture(scene: Phaser.Scene, key: string, mainColor: number, shadowColor: number) {
  if (scene.textures.exists(key)) return;
  const canvas = scene.textures.createCanvas(key, 32, 32);
  if (!canvas) return;
  const ctx = canvas.getContext();

  // Rounded squishy cube body
  ctx.fillStyle = '#' + mainColor.toString(16).padStart(6, '0');
  roundRect(ctx, 2, 2, 28, 28, 7);
  ctx.fill();

  // Bottom shadow
  ctx.fillStyle = '#' + shadowColor.toString(16).padStart(6, '0');
  roundRect(ctx, 4, 24, 24, 5, 2);
  ctx.fill();

  // Top gloss highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  roundRect(ctx, 5, 4, 22, 4, 2);
  ctx.fill();

  // Expressive cartoon eyes
  // Left eye
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(10, 13, 4, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right eye
  ctx.beginPath();
  ctx.ellipse(22, 13, 4, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Pupils (looking forward/slightly right)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(11, 13, 2.2, 0, Math.PI * 2);
  ctx.arc(23, 13, 2.2, 0, Math.PI * 2);
  ctx.fill();

  // Eye shines
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(10, 11.5, 1, 0, Math.PI * 2);
  ctx.arc(22, 11.5, 1, 0, Math.PI * 2);
  ctx.fill();

  // Cute blushing cheeks
  ctx.fillStyle = 'rgba(244, 63, 94, 0.4)';
  ctx.beginPath();
  ctx.arc(6, 18, 2.5, 0, Math.PI * 2);
  ctx.arc(26, 18, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Determined mouth
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(16, 17, 3, 0.2, Math.PI - 0.2);
  ctx.stroke();

  canvas.refresh();
}

function generateWorldTile(scene: Phaser.Scene, key: string, base: number, highlight: number, dark: number) {
  if (scene.textures.exists(key)) return;
  const canvas = scene.textures.createCanvas(key, 32, 32);
  if (!canvas) return;
  const ctx = canvas.getContext();

  ctx.fillStyle = '#' + base.toString(16).padStart(6, '0');
  ctx.fillRect(0, 0, 32, 32);

  // Top bevel highlight
  ctx.fillStyle = '#' + highlight.toString(16).padStart(6, '0');
  ctx.fillRect(0, 0, 32, 4);

  // Bottom edge shadow
  ctx.fillStyle = '#' + dark.toString(16).padStart(6, '0');
  ctx.fillRect(0, 28, 32, 4);
  ctx.fillRect(28, 0, 4, 32);

  // Brick / rock pattern
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(15, 4, 2, 24);
  ctx.fillRect(0, 15, 32, 2);

  canvas.refresh();
}

function generateCrackingTile(scene: Phaser.Scene) {
  if (scene.textures.exists('tile_cracking')) return;
  const canvas = scene.textures.createCanvas('tile_cracking', 32, 32);
  if (!canvas) return;
  const ctx = canvas.getContext();

  // Earthy crumbling stone
  ctx.fillStyle = '#64748b';
  ctx.fillRect(0, 0, 32, 32);
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(0, 0, 32, 3);

  // Prominent warning cracks
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(4, 2);
  ctx.lineTo(12, 14);
  ctx.lineTo(8, 22);
  ctx.lineTo(15, 30);
  ctx.moveTo(12, 14);
  ctx.lineTo(24, 18);
  ctx.lineTo(28, 28);
  ctx.stroke();

  canvas.refresh();
}

function generateSpikesTexture(scene: Phaser.Scene) {
  if (!scene.textures.exists('spike_up')) {
    const canvas = scene.textures.createCanvas('spike_up', 32, 32);
    if (canvas) {
      const ctx = canvas.getContext();
      // Draw 2 menacing triangular spikes
      drawSingleSpike(ctx, 0, 32, 8, 2, 16, 32);
      drawSingleSpike(ctx, 16, 32, 24, 2, 32, 32);
      canvas.refresh();
    }
  }

  if (!scene.textures.exists('spike_down')) {
    const canvas = scene.textures.createCanvas('spike_down', 32, 32);
    if (canvas) {
      const ctx = canvas.getContext();
      drawSingleSpike(ctx, 0, 0, 8, 30, 16, 0);
      drawSingleSpike(ctx, 16, 0, 24, 30, 32, 0);
      canvas.refresh();
    }
  }
}

function drawSingleSpike(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
  // Main metal body
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();

  // Dark shadow half
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo((x1 + x3) / 2, y1);
  ctx.closePath();
  ctx.fill();

  // Danger blood / glowing warning tip
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(x2, y2 + (y1 > y2 ? 3 : -3), 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function generateSpringTextures(scene: Phaser.Scene) {
  // Spring Idle
  if (!scene.textures.exists('spring_idle')) {
    const canvas = scene.textures.createCanvas('spring_idle', 32, 32);
    if (canvas) {
      const ctx = canvas.getContext();
      // Metal base
      ctx.fillStyle = '#475569';
      ctx.fillRect(4, 26, 24, 6);
      // Coiled spring
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(8, 26);
      ctx.lineTo(24, 21);
      ctx.lineTo(8, 16);
      ctx.lineTo(24, 11);
      ctx.stroke();
      // Bouncy red launch pad
      ctx.fillStyle = '#f43f5e';
      roundRect(ctx, 2, 7, 28, 6, 2);
      ctx.fill();
      ctx.fillStyle = '#fda4af';
      ctx.fillRect(4, 8, 24, 2);
      canvas.refresh();
    }
  }

  // Spring Compressed
  if (!scene.textures.exists('spring_compressed')) {
    const canvas = scene.textures.createCanvas('spring_compressed', 32, 32);
    if (canvas) {
      const ctx = canvas.getContext();
      ctx.fillStyle = '#475569';
      ctx.fillRect(4, 26, 24, 6);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(6, 26);
      ctx.lineTo(26, 24);
      ctx.lineTo(6, 22);
      ctx.stroke();
      ctx.fillStyle = '#f43f5e';
      roundRect(ctx, 2, 19, 28, 5, 2);
      ctx.fill();
      canvas.refresh();
    }
  }
}

function generateChestTextures(scene: Phaser.Scene) {
  // Closed Fake Treasure Chest
  if (!scene.textures.exists('chest_closed')) {
    const canvas = scene.textures.createCanvas('chest_closed', 32, 32);
    if (canvas) {
      const ctx = canvas.getContext();
      // Wooden box
      ctx.fillStyle = '#b45309';
      roundRect(ctx, 2, 8, 28, 22, 3);
      ctx.fill();

      // Gold bands
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(2, 14, 28, 3);
      ctx.fillRect(8, 8, 3, 22);
      ctx.fillRect(21, 8, 3, 22);

      // Keyhole / lock
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(16, 18, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#451a03';
      ctx.fillRect(15.5, 18, 1, 3);

      // Sparkle to tempt player
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(24, 9, 2, 2);
      canvas.refresh();
    }
  }

  // Open Chest with mocking sign
  if (!scene.textures.exists('chest_open')) {
    const canvas = scene.textures.createCanvas('chest_open', 32, 32);
    if (canvas) {
      const ctx = canvas.getContext();
      ctx.fillStyle = '#78350f';
      ctx.fillRect(2, 16, 28, 14);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(5, 18, 22, 10);
      // "HA HA!" inside
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 8px monospace';
      ctx.fillText(':P', 12, 25);
      canvas.refresh();
    }
  }
}

function generateCheckpointTextures(scene: Phaser.Scene) {
  // Real Checkpoint Flag (Blue base & star)
  if (!scene.textures.exists('flag_real_off')) {
    const canvas = scene.textures.createCanvas('flag_real_off', 32, 48);
    if (canvas) {
      const ctx = canvas.getContext();
      // Pole
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(6, 6, 3, 38);
      // Base
      ctx.fillStyle = '#3b82f6';
      roundRect(ctx, 2, 42, 12, 5, 2);
      ctx.fill();
      // Flag banner (unactivated gray)
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(9, 8);
      ctx.lineTo(28, 16);
      ctx.lineTo(9, 24);
      ctx.closePath();
      ctx.fill();
      canvas.refresh();
    }
  }

  if (!scene.textures.exists('flag_real_on')) {
    const canvas = scene.textures.createCanvas('flag_real_on', 32, 48);
    if (canvas) {
      const ctx = canvas.getContext();
      // Pole
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(6, 6, 3, 38);
      // Base (Glowing Blue)
      ctx.fillStyle = '#38bdf8';
      roundRect(ctx, 2, 42, 12, 5, 2);
      ctx.fill();
      // Flag banner (Active glowing cyan/blue)
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.moveTo(9, 8);
      ctx.lineTo(30, 16);
      ctx.lineTo(9, 24);
      ctx.closePath();
      ctx.fill();
      // Star emblem
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(15, 16, 3, 0, Math.PI * 2);
      ctx.fill();
      canvas.refresh();
    }
  }

  // Fake Checkpoint Flag (Has sneaky eyes on it!)
  if (!scene.textures.exists('flag_fake')) {
    const canvas = scene.textures.createCanvas('flag_fake', 32, 48);
    if (canvas) {
      const ctx = canvas.getContext();
      // Pole
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(6, 6, 3, 38);
      // Base (Red)
      ctx.fillStyle = '#ef4444';
      roundRect(ctx, 2, 42, 12, 5, 2);
      ctx.fill();
      // Bright tempting red/gold flag
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(9, 8);
      ctx.lineTo(29, 16);
      ctx.lineTo(9, 24);
      ctx.closePath();
      ctx.fill();
      // Cheeky eyes on flag
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(13, 13, 3, 3);
      ctx.fillRect(19, 13, 3, 3);
      ctx.fillStyle = '#000000';
      ctx.fillRect(15, 14, 1.5, 1.5);
      ctx.fillRect(21, 14, 1.5, 1.5);
      // Little shoes beneath pole!
      ctx.fillStyle = '#dc2626';
      roundRect(ctx, 12, 42, 6, 4, 1);
      ctx.fill();
      canvas.refresh();
    }
  }
}

function generateCloudTexture(scene: Phaser.Scene) {
  if (scene.textures.exists('cloud_platform')) return;
  const canvas = scene.textures.createCanvas('cloud_platform', 64, 28);
  if (!canvas) return;
  const ctx = canvas.getContext();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.arc(18, 16, 12, 0, Math.PI * 2);
  ctx.arc(32, 12, 14, 0, Math.PI * 2);
  ctx.arc(46, 16, 12, 0, Math.PI * 2);
  ctx.fill();

  // Subtle bottom shade
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.ellipse(32, 23, 24, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  canvas.refresh();
}

function generateExitTextures(scene: Phaser.Scene) {
  // Real Exit Door: Glowing Golden/Green Portal
  if (!scene.textures.exists('door_real')) {
    const canvas = scene.textures.createCanvas('door_real', 36, 48);
    if (canvas) {
      const ctx = canvas.getContext();
      // Outer frame
      ctx.fillStyle = '#065f46';
      roundRect(ctx, 2, 2, 32, 44, 16);
      ctx.fill();
      // Inner portal
      ctx.fillStyle = '#10b981';
      roundRect(ctx, 5, 5, 26, 41, 13);
      ctx.fill();
      // Swirl core
      ctx.fillStyle = '#a7f3d0';
      ctx.beginPath();
      ctx.arc(18, 24, 7, 0, Math.PI * 2);
      ctx.fill();
      // EXIT text banner
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px sans-serif';
      ctx.fillText('GOAL', 9, 12);
      canvas.refresh();
    }
  }

  // Fake Exit Door: Gaudy rainbow door
  if (!scene.textures.exists('door_fake')) {
    const canvas = scene.textures.createCanvas('door_fake', 36, 48);
    if (canvas) {
      const ctx = canvas.getContext();
      ctx.fillStyle = '#d97706';
      roundRect(ctx, 2, 2, 32, 44, 16);
      ctx.fill();
      // Fake glittery portal
      ctx.fillStyle = '#fbbf24';
      roundRect(ctx, 5, 5, 26, 41, 13);
      ctx.fill();
      // "FREE WIN" badge
      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 6px sans-serif';
      ctx.fillText('WIN! ->', 7, 12);
      canvas.refresh();
    }
  }
}

function generateSignTexture(scene: Phaser.Scene) {
  if (scene.textures.exists('signpost')) return;
  const canvas = scene.textures.createCanvas('signpost', 32, 32);
  if (!canvas) return;
  const ctx = canvas.getContext();

  // Wooden post
  ctx.fillStyle = '#78350f';
  ctx.fillRect(14, 14, 4, 18);

  // Signboard
  ctx.fillStyle = '#d97706';
  roundRect(ctx, 2, 2, 28, 16, 2);
  ctx.fill();

  // Exclamation point
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(15, 4, 2, 7);
  ctx.fillRect(15, 13, 2, 2);

  canvas.refresh();
}

function generateParticleTextures(scene: Phaser.Scene) {
  if (!scene.textures.exists('particle_star')) {
    const canvas = scene.textures.createCanvas('particle_star', 8, 8);
    if (canvas) {
      const ctx = canvas.getContext();
      ctx.fillStyle = '#fde047';
      ctx.fillRect(2, 2, 4, 4);
      canvas.refresh();
    }
  }

  if (!scene.textures.exists('particle_blood')) {
    const canvas = scene.textures.createCanvas('particle_blood', 8, 8);
    if (canvas) {
      const ctx = canvas.getContext();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(4, 4, 3, 0, Math.PI * 2);
      ctx.fill();
      canvas.refresh();
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
