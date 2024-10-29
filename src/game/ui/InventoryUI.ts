import * as PIXI from 'pixi.js';

export class InventoryUI {
  private container: PIXI.Container;
  private background: PIXI.Graphics;

  constructor(parentContainer: PIXI.Container) {
    this.container = new PIXI.Container();
    parentContainer.addChild(this.container);
    
    this.setupUI();
  }

  private setupUI(): void {
    this.background = new PIXI.Graphics();
    this.container.addChild(this.background);
    this.drawBackground();
  }

  private drawBackground(): void {
    this.background.clear();
    this.background.beginFill(0x000000, 0.5);
    this.background.drawRect(10, 10, 200, 300);
    this.background.endFill();
  }

  public update(): void {
    // Update inventory UI elements
  }

  public onResize(width: number, height: number): void {
    // Handle resize if needed
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}