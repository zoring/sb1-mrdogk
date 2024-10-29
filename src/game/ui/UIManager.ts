import * as PIXI from 'pixi.js';
import { InventorySystem } from '../systems/InventorySystem';
import { ShopSystem } from '../systems/ShopSystem';

export class UIManager {
  private container: PIXI.Container;

  constructor(
    private app: PIXI.Application,
    private inventory: InventorySystem,
    private shop: ShopSystem
  ) {
    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);
  }

  public initialize(): void {
    // Initialize UI elements
  }

  public update(): void {
    // Update UI state
  }

  public onResize(width: number, height: number): void {
    // Adjust UI layout
  }

  public destroy(): void {
    this.container.destroy();
  }
}