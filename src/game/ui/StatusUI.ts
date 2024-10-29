import * as PIXI from 'pixi.js';

export class StatusUI {
  private container: PIXI.Container;
  private background: PIXI.Graphics;
  private healthBar: PIXI.Graphics;

  constructor(parentContainer: PIXI.Container) {
    this.container = new PIXI.Container();
    parentContainer.addChild(this.container);
    
    this.setupUI();
  }

  private setupUI(): void {
    this.background = new PIXI.Graphics();
    this.healthBar = new PIXI.Graphics();
    
    this.container.addChild(this.background);
    this.container.addChild(this.healthBar);
    
    this.drawUI();
  }

  private drawUI(): void {
    // Draw status background
    this.background.clear();
    this.background.beginFill(0x000000, 0.5);
    this.background.drawRect(10, 10, 200, 50);
    this.background.endFill();

    // Draw health bar
    this.healthBar.clear();
    this.healthBar.beginFill(0xff0000);
    this.healthBar.drawRect(20, 20, 180, 20);
    this.healthBar.endFill();
  }

  public update(): void {
    // Update status UI elements
  }

  public onResize(width: number, height: number): void {
    // Handle resize if needed
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}