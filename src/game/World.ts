import * as PIXI from 'pixi.js';

export class World {
  public container: PIXI.Container;
  private background: PIXI.TilingSprite;

  constructor(private app: PIXI.Application) {
    this.container = new PIXI.Container();
    
    // Create a simple background using Graphics instead of loading texture
    const bgTexture = this.createBackgroundTexture();
    this.background = new PIXI.TilingSprite(
      bgTexture,
      app.screen.width,
      app.screen.height
    );
    this.container.addChild(this.background);
  }

  private createBackgroundTexture(): PIXI.Texture {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0x90EE90); // Light green color
    graphics.drawRect(0, 0, 64, 64); // Create a 64x64 tile
    graphics.endFill();
    
    // Add some texture details
    graphics.lineStyle(1, 0x85DA85);
    graphics.moveTo(0, 32);
    graphics.lineTo(64, 32);
    graphics.moveTo(32, 0);
    graphics.lineTo(32, 64);
    
    return PIXI.Texture.from(graphics.generateCanvasTexture());
  }

  public initialize(): void {
    // Additional initialization logic can be added here
  }

  public update(delta: number): void {
    // Subtle background movement
    this.background.tilePosition.x -= 0.1 * delta;
    this.background.tilePosition.y -= 0.1 * delta;
  }

  public onResize(width: number, height: number): void {
    this.background.width = width;
    this.background.height = height;
  }

  public destroy(): void {
    this.background.destroy(true);
    this.container.destroy({ children: true });
  }
}