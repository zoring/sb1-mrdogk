import * as PIXI from 'pixi.js';

export class UITextureManager {
  private static textures: Map<string, PIXI.Texture> = new Map();

  public static initialize(): void {
    // Create default textures
    const graphics = new PIXI.Graphics();
    
    // Player texture
    graphics.clear();
    graphics.beginFill(0x3498db);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();
    this.textures.set('player', PIXI.Texture.from(graphics.generateCanvasTexture()));

    // Merchant texture
    graphics.clear();
    graphics.beginFill(0xf1c40f);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();
    this.textures.set('merchant', PIXI.Texture.from(graphics.generateCanvasTexture()));

    // Elder texture
    graphics.clear();
    graphics.beginFill(0x8e44ad);
    graphics.drawRect(0, 0, 32, 32);
    graphics.endFill();
    this.textures.set('elder', PIXI.Texture.from(graphics.generateCanvasTexture()));
  }

  public static getTexture(name: string): PIXI.Texture {
    const texture = this.textures.get(name);
    if (!texture) {
      throw new Error(`Texture ${name} not found`);
    }
    return texture;
  }

  public static cleanup(): void {
    this.textures.forEach(texture => texture.destroy(true));
    this.textures.clear();
  }
}