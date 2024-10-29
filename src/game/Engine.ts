import * as PIXI from 'pixi.js';
import { Player } from './entities/Player';
import { World } from './World';
import { InputManager } from './systems/InputManager';
import { CombatSystem } from './systems/CombatSystem';
import { InventorySystem } from './systems/InventorySystem';
import { ShopSystem } from './systems/ShopSystem';
import { EntityManager } from './entities/EntityManager';
import { UIManager } from './ui/UIManager';

export class GameEngine {
  private app: PIXI.Application;
  private world: World;
  private player: Player;
  private inputManager: InputManager;
  private combatSystem: CombatSystem;
  private inventorySystem: InventorySystem;
  private shopSystem: ShopSystem;
  private entityManager: EntityManager;
  private uiManager: UIManager;
  private initialized: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    // Initialize PIXI Application with WebGL
    this.app = new PIXI.Application({
      view: canvas,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: 0x1099bb,
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true
    });

    // Initialize all systems in order
    this.initializeSystems();
  }

  private async initializeSystems(): Promise<void> {
    try {
      // Initialize core systems first
      this.inputManager = new InputManager();
      this.inventorySystem = new InventorySystem();
      this.entityManager = new EntityManager();
      
      // Initialize world and player
      this.world = new World(this.app);
      this.player = new Player(this.app);
      
      // Initialize dependent systems
      this.combatSystem = new CombatSystem(this.player, this.entityManager);
      this.shopSystem = new ShopSystem(this.inventorySystem);
      this.uiManager = new UIManager(this.app, this.inventorySystem, this.shopSystem);

      // Add world and player containers to stage
      this.app.stage.addChild(this.world.container);
      this.app.stage.addChild(this.player.container);
      
      // Initialize all components
      this.world.initialize();
      this.player.initialize();
      this.entityManager.initialize();
      this.uiManager.initialize();

      // Set up event listeners
      window.addEventListener('resize', this.onResize.bind(this));
      this.onResize();

      // Start game loop
      this.app.ticker.add(this.update.bind(this));
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize game systems:', error);
      this.destroy();
      throw error;
    }
  }

  private update(delta: number): void {
    if (!this.initialized) return;

    try {
      this.inputManager.update();
      this.player.update(delta, this.inputManager);
      this.world.update(delta);
      this.entityManager.update(delta);
      this.combatSystem.update(delta);
      this.uiManager.update();
    } catch (error) {
      console.error('Error in game update loop:', error);
    }
  }

  private onResize(): void {
    if (!this.initialized) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.app.renderer.resize(width, height);
    this.world.onResize(width, height);
    this.uiManager.onResize(width, height);
  }

  public destroy(): void {
    if (!this.initialized) return;

    try {
      // Remove event listeners
      window.removeEventListener('resize', this.onResize.bind(this));
      
      // Destroy all systems in reverse order
      if (this.uiManager) this.uiManager.destroy();
      if (this.shopSystem) this.shopSystem.destroy?.();
      if (this.combatSystem) this.combatSystem.destroy?.();
      if (this.player) this.player.destroy();
      if (this.entityManager) this.entityManager.destroy();
      if (this.world) this.world.destroy();
      if (this.inputManager) this.inputManager.destroy();
      
      // Finally destroy the PIXI application
      this.app.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true
      });
      
      this.initialized = false;
    } catch (error) {
      console.error('Error during game cleanup:', error);
    }
  }
}