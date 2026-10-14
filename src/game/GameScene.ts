import Phaser from 'phaser';
import { gameManager } from './GameManager';
import { sounds } from './audio';
import { generateAllGameTextures } from './textures';
import { DeathCause, LevelDefinition } from './types';
import confetti from 'canvas-confetti';

interface MobileInputState {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;
  private crackingPlatforms: {
    sprite: Phaser.GameObjects.TileSprite;
    body: Phaser.Physics.Arcade.StaticBody;
    triggered: boolean;
    timer?: Phaser.Time.TimerEvent;
    origX: number;
    origY: number;
    width: number;
    height: number;
  }[] = [];
  private hazards!: Phaser.Physics.Arcade.StaticGroup;
  private springs!: Phaser.Physics.Arcade.StaticGroup;
  private movingPlatformGroup!: Phaser.Physics.Arcade.Group;
  private realCheckpointObj?: Phaser.GameObjects.Sprite;
  private realCheckpointActive: boolean = false;
  private activeRespawnPoint: { x: number; y: number } = { x: 80, y: 440 };

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    SPACE: Phaser.Input.Keyboard.Key;
    R: Phaser.Input.Keyboard.Key;
    ESC: Phaser.Input.Keyboard.Key;
  };

  public static mobileInput: MobileInputState = { left: false, right: false, jump: false };

  // Jump physics variables
  private coyoteTimer: number = 0;
  private jumpBufferTimer: number = 0;
  private isGrounded: boolean = false;
  private isJumping: boolean = false;
  private levelData!: LevelDefinition;
  private isDying: boolean = false;
  private isWon: boolean = false;

  // Active traps tracking
  private activeTraps: any[] = [];
  private fakeChestObj?: Phaser.GameObjects.Sprite;
  private fakeFlagObj?: Phaser.GameObjects.Sprite;
  private fakeExitObj?: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Generate all dynamic canvas textures before creating entities
    generateAllGameTextures(this);
  }

  create() {
    this.levelData = gameManager.getCurrentLevel();
    this.isDying = false;
    this.isWon = false;
    this.crackingPlatforms = [];
    this.activeTraps = [];

    // Set world bounds based on level width & height
    this.physics.world.setBounds(0, 0, this.levelData.width, this.levelData.height + 60);

    // Default respawn at level spawn
    this.activeRespawnPoint = { ...this.levelData.spawn };
    this.realCheckpointActive = false;

    // Draw thematic background
    this.createBackground();

    // Create groups
    this.platforms = this.physics.add.staticGroup();
    this.hazards = this.physics.add.staticGroup();
    this.springs = this.physics.add.staticGroup();
    this.movingPlatformGroup = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    // Create Player before buildLevel so all traps and colliders receive a valid reference
    const skin = gameManager.getSettings().activeSkin || 'player_yellow';
    this.player = this.physics.add.sprite(
      this.activeRespawnPoint.x,
      this.activeRespawnPoint.y,
      skin
    );
    this.player.setCollideWorldBounds(false);
    this.player.setBounce(0);
    this.player.setSize(24, 26);
    this.player.setOffset(4, 5);
    (this.player.body as Phaser.Physics.Arcade.Body).setGravityY(980);

    // Build level geometry
    this.buildLevel();

    // Setup Collisions
    this.physics.add.collider(this.player, this.platforms, this.handlePlatformLanding, undefined, this);
    this.physics.add.collider(this.player, this.movingPlatformGroup, this.handleMovingPlatformLanding, undefined, this);

    // Hazards overlap
    this.physics.add.overlap(this.player, this.hazards, this.handleHazardCollision, undefined, this);

    // Setup keyboard inputs
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
        R: Phaser.Input.Keyboard.KeyCodes.R,
        ESC: Phaser.Input.Keyboard.KeyCodes.ESC,
      }) as any;

      this.wasd.R.on('down', () => {
        this.restartCurrentLevel();
      });

      this.wasd.ESC.on('down', () => {
        gameManager.togglePause();
      });
    }

    // Camera setup
    this.cameras.main.setBounds(0, 0, this.levelData.width, this.levelData.height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(100, 80);

    // Notify GameManager of successful start
    gameManager.restartLevel();
  }

  private createBackground() {
    const { width, height, theme } = this.levelData;
    let skyTop = 0x0f172a;
    let skyBottom = 0x1e293b;

    if (theme === 'grass') {
      skyTop = 0x0284c7; // Bright sky
      skyBottom = 0x38bdf8;
    } else if (theme === 'lab') {
      skyTop = 0x090d16;
      skyBottom = 0x1e1b4b;
    } else if (theme === 'volcano') {
      skyTop = 0x450a0a;
      skyBottom = 0x1c1917;
    } else if (theme === 'mind') {
      skyTop = 0x3b0764;
      skyBottom = 0x1e1b4b;
    } else if (theme === 'evil') {
      skyTop = 0x020617;
      skyBottom = 0x1e293b;
    }

    const bg = this.add.graphics();
    bg.fillGradientStyle(skyTop, skyTop, skyBottom, skyBottom, 1);
    bg.fillRect(0, 0, width, height);

    // Far background hills / pillars
    const farHills = this.add.graphics();
    farHills.fillStyle(theme === 'grass' ? 0x064e3b : theme === 'volcano' ? 0x270707 : 0x0f172a, 0.25);
    for (let i = 0; i < width + 200; i += 320) {
      farHills.fillCircle(i + 160, height - 10, 260);
    }

    // Midground hills / structures
    const hills = this.add.graphics();
    hills.fillStyle(theme === 'grass' ? 0x166534 : theme === 'volcano' ? 0x500724 : 0x1e293b, 0.4);
    for (let i = 0; i < width + 100; i += 220) {
      hills.fillCircle(i + 110, height - 20, 170);
    }

    // Floating ambient aesthetic particles (clouds/stars/embers)
    const particleCount = Math.floor(width / 70);
    const particleGfx = this.add.graphics();
    particleGfx.fillStyle(theme === 'volcano' ? 0xf97316 : theme === 'grass' ? 0xfef08a : 0x38bdf8, 0.3);
    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * (height - 80);
      particleGfx.fillCircle(px, py, 1.5 + Math.random() * 2);
    }
  }

  private buildLevel() {
    const theme = this.levelData.theme;
    let tileTexture = 'tile_grass';
    if (theme === 'lab') tileTexture = 'tile_lab';
    if (theme === 'volcano') tileTexture = 'tile_volcano';
    if (theme === 'mind') tileTexture = 'tile_mind';
    if (theme === 'evil') tileTexture = 'tile_evil';

    // 1. Static Platforms
    this.levelData.platforms.forEach((p, idx) => {
      if (p.type === 'cracking') {
        this.createCrackingPlatform(p.x, p.y, p.width, p.height);
      } else if (p.type === 'fake') {
        // Appears solid, but will drop through or disappear upon standing
        const fakeSprite = this.add.tileSprite(p.x + p.width / 2, p.y + p.height / 2, p.width, p.height, tileTexture);
        this.physics.add.existing(fakeSprite, true);
        this.physics.add.collider(this.player, fakeSprite, () => {
          // Trigger betrayal trap
          this.triggerBetrayalDrop(fakeSprite);
        });
      } else {
        const platform = this.add.tileSprite(p.x + p.width / 2, p.y + p.height / 2, p.width, p.height, tileTexture);
        this.platforms.add(platform);
      }
    });

    // 2. Hazards (Spikes)
    this.levelData.hazards.forEach((h) => {
      const tex = h.type === 'spikes_down' ? 'spike_down' : 'spike_up';
      const spike = this.add.tileSprite(h.x + h.width / 2, h.y + h.height / 2, h.width, h.height, tex);
      this.hazards.add(spike);
    });

    // 3. Moving Platforms (Clouds / Patrol stones)
    if (this.levelData.movingPlatforms) {
      this.levelData.movingPlatforms.forEach((mp) => {
        const tex = mp.behavior === 'troll_drop' ? 'cloud_platform' : 'cloud_platform';
        const sprite = this.movingPlatformGroup.create(mp.x, mp.y, tex) as Phaser.Physics.Arcade.Sprite;
        sprite.setImmovable(true);
        const arcadeBody = sprite.body as Phaser.Physics.Arcade.Body | null;
        if (arcadeBody) {
          arcadeBody.setAllowGravity(false);
        }

        const targetX = mp.targetX ?? mp.x;
        const targetY = mp.targetY ?? mp.y;
        const duration = Math.max(1000, (Math.hypot(targetX - mp.x, targetY - mp.y) / (mp.speed || 80)) * 1000);

        if (mp.behavior === 'pingpong') {
          this.tweens.add({
            targets: sprite,
            x: targetX,
            y: targetY,
            duration,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
          });
        } else if (mp.behavior === 'troll_drop') {
          // Troll cloud: hovers gently until stepped on, then drops fast!
          this.tweens.add({
            targets: sprite,
            y: mp.y - 6,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
          });
          (sprite as any).isTrollCloud = true;
          (sprite as any).trollDropY = targetY;
        }
      });
    }

    // 4. Real Checkpoints (supports single or multiple checkpoints)
    const allCheckpoints = this.levelData.realCheckpoints || (this.levelData.realCheckpoint ? [this.levelData.realCheckpoint] : []);
    allCheckpoints.forEach((cp, idx) => {
      const flagObj = this.add.sprite(cp.x, cp.y - 24, 'flag_real_off');
      this.physics.add.existing(flagObj, true);
      this.physics.add.overlap(this.player, flagObj, () => {
        if (!flagObj.getData('active')) {
          flagObj.setData('active', true);
          this.activeRespawnPoint = { x: cp.x, y: cp.y - 20 };
          flagObj.setTexture('flag_real_on');
          if (flagObj.body) {
            (flagObj.body as Phaser.Physics.Arcade.StaticBody).enable = false;
          }
          sounds.playCheckpoint();
          this.spawnFloatingText(cp.x, cp.y - 30, `CHECKPOINT ${allCheckpoints.length > 1 ? idx + 1 : ''} SAVED!`, 0x38bdf8);
        }
      });
    });

    // 5. Real Exit Door
    const exit = this.levelData.exit;
    const realExit = this.add.sprite(exit.x, exit.y - 14, 'door_real');
    this.physics.add.existing(realExit, true);
    // Pulsing aura on real exit
    this.tweens.add({
      targets: realExit,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
    });
    this.physics.add.overlap(this.player, realExit, () => {
      this.handleVictory();
    });

    // 6. Interactive Traps
    if (this.levelData.traps) {
      this.levelData.traps.forEach((trap) => {
        this.setupTrap(trap);
      });
    }

    // 7. Signs
    if (this.levelData.signs) {
      this.levelData.signs.forEach((sign) => {
        const signSprite = this.add.sprite(sign.x, sign.y, 'signpost');
        signSprite.setInteractive();

        // Floating tooltip text
        const tooltip = this.add.text(sign.x, sign.y - 36, sign.text, {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '11px',
          fontStyle: 'bold',
          color: '#ffffff',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          padding: { x: 6, y: 3 },
        }).setOrigin(0.5);

        if (sign.subtext) {
          this.add.text(sign.x, sign.y - 20, sign.subtext, {
            fontFamily: 'Fredoka, sans-serif',
            fontSize: '9px',
            color: '#facc15',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            padding: { x: 4, y: 1 },
          }).setOrigin(0.5);
        }
      });
    }
  }

  private createCrackingPlatform(x: number, y: number, width: number, height: number) {
    const sprite = this.add.tileSprite(x + width / 2, y + height / 2, width, height, 'tile_cracking');
    this.physics.add.existing(sprite, true);
    const staticBody = sprite.body as Phaser.Physics.Arcade.StaticBody;

    const entry = {
      sprite,
      body: staticBody,
      triggered: false,
      origX: x + width / 2,
      origY: y + height / 2,
      width,
      height,
    };
    this.crackingPlatforms.push(entry);

    this.physics.add.collider(this.player, sprite, () => {
      if (!entry.triggered) {
        entry.triggered = true;
        sounds.playCracking();
        // Shake animation
        this.tweens.add({
          targets: sprite,
          x: sprite.x + (Math.random() > 0.5 ? 2 : -2),
          duration: 50,
          repeat: 8,
          yoyo: true,
          onComplete: () => {
            // Drop away
            entry.body.enable = false;
            this.tweens.add({
              targets: sprite,
              y: sprite.y + 120,
              alpha: 0,
              duration: 350,
              ease: 'Quad.easeIn',
            });
          },
        });
      }
    });
  }

  private setupTrap(trap: any) {
    switch (trap.type) {
      case 'fake_treasure': {
        this.fakeChestObj = this.add.sprite(trap.x, trap.y, 'chest_closed');
        this.physics.add.existing(this.fakeChestObj, true);
        this.physics.add.overlap(this.player, this.fakeChestObj, () => {
          if (this.fakeChestObj && this.fakeChestObj.texture.key === 'chest_closed') {
            this.fakeChestObj.setTexture('chest_open');
            sounds.playChestTrigger();
            this.spawnFloatingText(trap.x, trap.y - 25, 'LOOT GOBLIN DETECTED!', 0xf43f5e);
            // Drop player or create spikes beneath
            this.time.delayedCall(120, () => {
              this.killPlayer('fake_treasure');
            });
          }
        });
        break;
      }

      case 'lying_checkpoint': {
        this.fakeFlagObj = this.add.sprite(trap.x, trap.y, 'flag_fake');
        this.physics.add.existing(this.fakeFlagObj, true);
        this.physics.add.overlap(this.player, this.fakeFlagObj, () => {
          if (this.fakeFlagObj && !this.fakeFlagObj.getData('triggered')) {
            this.fakeFlagObj.setData('triggered', true);
            if (this.fakeFlagObj.body) {
              (this.fakeFlagObj.body as Phaser.Physics.Arcade.StaticBody).enable = false;
            }
            sounds.playFakeCheckpoint();
            this.spawnFloatingText(trap.x, trap.y - 30, 'NOPE! BYE!', 0xef4444);
            // Flag sprouts legs and scurries away into the pit!
            this.tweens.add({
              targets: this.fakeFlagObj,
              x: this.fakeFlagObj.x + 80,
              y: this.fakeFlagObj.y + 160,
              angle: 35,
              duration: 500,
              ease: 'Quad.easeIn',
              onComplete: () => {
                this.fakeFlagObj?.destroy();
              },
            });
          }
        });
        break;
      }

      case 'overpowered_spring': {
        const spring = this.add.sprite(trap.x, trap.y, 'spring_idle');
        this.physics.add.existing(spring, true);
        this.physics.add.overlap(this.player, spring, () => {
          spring.setTexture('spring_compressed');
          sounds.playSpring();
          // Catapult player with extreme upward velocity directly into ceiling
          this.player.setVelocityY(-760);
          this.time.delayedCall(200, () => {
            spring.setTexture('spring_idle');
          });
        });
        break;
      }

      case 'fake_exit': {
        this.fakeExitObj = this.add.sprite(trap.x, trap.y, 'door_fake');
        this.physics.add.existing(this.fakeExitObj, true);
        this.physics.add.overlap(this.player, this.fakeExitObj, () => {
          if (!this.fakeExitObj?.getData('triggered')) {
            this.fakeExitObj?.setData('triggered', true);
            sounds.playFakeFanfare();
            this.spawnFloatingText(trap.x, trap.y - 35, 'NICE TRY! HAHAHA!', 0xf43f5e);
            // Confetti prematurely
            try {
              confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
            } catch {}
            // Punchline: Spikes drop from ceiling or floor vanishes
            this.time.delayedCall(450, () => {
              this.killPlayer('fake_exit');
            });
          }
        });
        break;
      }

      case 'falling_block': {
        // Danger zone that detects player walking underneath and drops a spiked block
        const block = this.add.sprite(trap.x, trap.y, 'spike_down');
        this.physics.add.existing(block);
        const blockBody = block.body as Phaser.Physics.Arcade.Body;
        blockBody.setAllowGravity(false);
        blockBody.setImmovable(true);

        this.physics.add.overlap(this.player, block, () => {
          this.killPlayer('falling_block');
        });

        // Trigger zone
        const trigger = this.add.zone(trap.x, trap.y + 120, 60, 240);
        this.physics.add.existing(trigger, true);
        this.physics.add.overlap(this.player, trigger, () => {
          if (!block.getData('dropped')) {
            block.setData('dropped', true);
            sounds.playCracking();
            // Telegraph wobble
            this.tweens.add({
              targets: block,
              x: block.x + 3,
              duration: 40,
              yoyo: true,
              repeat: 5,
              onComplete: () => {
                blockBody.setAllowGravity(true);
                blockBody.setGravityY(1600);
              },
            });
          }
        });
        break;
      }

      case 'last_second_trap': {
        // When player gets very close to real exit, a hidden hazard triggers
        const trigger = this.add.zone(trap.x, trap.y, 40, 60);
        this.physics.add.existing(trigger, true);
        this.physics.add.overlap(this.player, trigger, () => {
          if (!trigger.getData('triggered')) {
            trigger.setData('triggered', true);
            // Surprise overhead drop
            const surprise = this.add.sprite(trap.x, trap.y - 140, 'spike_down');
            this.physics.add.existing(surprise);
            (surprise.body as Phaser.Physics.Arcade.Body).setVelocityY(450);
            this.physics.add.overlap(this.player, surprise, () => {
              this.killPlayer('last_second_trap');
            });
          }
        });
        break;
      }

      default:
        break;
    }
  }

  private triggerBetrayalDrop(fakeSprite: Phaser.GameObjects.TileSprite) {
    if (fakeSprite.getData('dropped')) return;
    fakeSprite.setData('dropped', true);
    if (fakeSprite.body) {
      (fakeSprite.body as Phaser.Physics.Arcade.StaticBody).enable = false;
    }
    sounds.playCracking();
    this.tweens.add({
      targets: fakeSprite,
      y: fakeSprite.y + 150,
      alpha: 0,
      duration: 350,
      ease: 'Quad.easeIn',
      onComplete: () => {
        fakeSprite.destroy();
      },
    });
  }

  private handlePlatformLanding() {
    this.isGrounded = true;
    this.isJumping = false;
  }

  private handleMovingPlatformLanding(playerObj: any, platformObj: any) {
    this.isGrounded = true;
    this.isJumping = false;
    const mp = platformObj as Phaser.GameObjects.Sprite;
    if ((mp as any).isTrollCloud && !mp.getData('dropped')) {
      mp.setData('dropped', true);
      sounds.playPitFall();
      this.tweens.add({
        targets: mp,
        y: (mp as any).trollDropY || mp.y + 140,
        duration: 400,
        ease: 'Quad.easeIn',
      });
    }
  }

  private handleHazardCollision() {
    this.killPlayer('spike');
  }

  private killPlayer(cause: DeathCause) {
    if (this.isDying || this.isWon) return;
    this.isDying = true;

    // Sounds & camera shake
    if (cause === 'pit_fall') {
      sounds.playPitFall();
    } else {
      sounds.playSpikeDeath();
    }

    if (gameManager.getSettings().screenShake) {
      this.cameras.main.shake(250, 0.015);
    }

    // Freeze physics
    this.player.setVelocity(0, 0);
    if (this.player.body) {
      this.player.body.enable = false;
    }

    // Splatter comedic particles
    this.createDeathExplosion(this.player.x, this.player.y);

    // Fade player
    this.tweens.add({
      targets: this.player,
      scaleX: 1.4,
      scaleY: 0.2,
      alpha: 0,
      duration: 180,
      onComplete: () => {
        // Dispatch to GameManager for death modal roast
        gameManager.onPlayerDeath(cause, this.player.x, this.player.y);
      },
    });
  }

  private createDeathExplosion(x: number, y: number) {
    for (let i = 0; i < 14; i++) {
      const p = this.add.sprite(x, y, i % 2 === 0 ? 'particle_star' : 'particle_blood');
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 140;
      this.tweens.add({
        targets: p,
        x: x + Math.cos(angle) * speed,
        y: y + Math.sin(angle) * speed + 20,
        alpha: 0,
        scale: 0.3,
        duration: 450,
        onComplete: () => {
          p.destroy();
        },
      });
    }
  }

  private handleVictory() {
    if (this.isWon || this.isDying) return;
    this.isWon = true;

    sounds.playRealVictory();

    // Confetti explosion
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch {}

    // Spin player in joy
    this.player.setVelocity(0, -220);
    this.tweens.add({
      targets: this.player,
      angle: 360,
      duration: 600,
      repeat: 1,
    });

    this.spawnFloatingText(this.player.x, this.player.y - 40, 'LEVEL COMPLETE!', 0x22c55e);

    this.time.delayedCall(800, () => {
      gameManager.onLevelComplete();
    });
  }

  private spawnFloatingText(x: number, y: number, message: string, colorHex: number) {
    const hexStr = '#' + colorHex.toString(16).padStart(6, '0');
    const txt = this.add.text(x, y, message, {
      fontFamily: 'Bungee, cursive, sans-serif',
      fontSize: '13px',
      color: hexStr,
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: txt,
      y: y - 30,
      alpha: 0,
      duration: 1000,
      ease: 'Sine.easeOut',
      onComplete: () => {
        txt.destroy();
      },
    });
  }

  public restartCurrentLevel() {
    this.scene.restart();
  }

  update(time: number, delta: number) {
    if (this.isDying || this.isWon || gameManager.getIsPaused()) {
      return;
    }

    const deltaSec = delta / 1000;
    gameManager.updateTime(deltaSec);

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const onFloor = body.blocked.down || body.touching.down;

    // Coyote timer handling & grounded state
    if (onFloor) {
      this.coyoteTimer = 0.15; // 150ms generous grace window
      this.isGrounded = true;
      // Reset jumping flag whenever player is on floor
      if (body.velocity.y >= -10) {
        this.isJumping = false;
      }
    } else {
      this.coyoteTimer -= deltaSec;
      if (this.coyoteTimer <= 0) {
        this.isGrounded = false;
      }
    }

    // Input combination: Keyboard + Mobile Touch
    const keyLeft = (this.cursors?.left?.isDown || this.wasd?.A?.isDown || GameScene.mobileInput.left);
    const keyRight = (this.cursors?.right?.isDown || this.wasd?.D?.isDown || GameScene.mobileInput.right);
    const keyJump = (this.cursors?.up?.isDown || this.cursors?.space?.isDown || this.wasd?.W?.isDown || this.wasd?.SPACE?.isDown || GameScene.mobileInput.jump);

    // Jump buffer timer
    if (keyJump) {
      this.jumpBufferTimer = 0.14;
    } else {
      this.jumpBufferTimer -= deltaSec;
    }

    // Horizontal Movement
    const speed = 225;
    if (keyLeft && !keyRight) {
      this.player.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (keyRight && !keyLeft) {
      this.player.setVelocityX(speed);
      this.player.setFlipX(false);
    } else {
      this.player.setVelocityX(0);
    }

    // Jump Execution with buffering + coyote time (or directly onFloor)
    if (this.jumpBufferTimer > 0 && (this.coyoteTimer > 0 || onFloor)) {
      this.player.setVelocityY(-510);
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
      this.isGrounded = false;
      this.isJumping = true;
      sounds.playJump();

      // Subtle squash-stretch
      this.tweens.add({
        targets: this.player,
        scaleX: 0.8,
        scaleY: 1.25,
        duration: 100,
        yoyo: true,
      });
    }

    // Variable Jump Height: Cutting jump short if button released early
    if (!keyJump && body && body.velocity.y < -120) {
      this.player.setVelocityY(body.velocity.y * 0.5);
    }

    // Check if fallen below level bounds
    if (this.player.y > this.levelData.height + 40) {
      this.killPlayer('pit_fall');
    }
  }
}
