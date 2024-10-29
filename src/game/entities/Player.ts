import * as PIXI from 'pixi.js';
import { InputManager } from '../systems/InputManager';

export class Player {
  public container: PIXI.Container;
  private sprite: PIXI.Graphics;
  private speed: number = 5;
  private position = { x: 0, y: 0 };

  constructor(private app: PIXI.Application) {
    this.container = new PIXI.Container();
    this.createSprite();
  }

  private createSprite(): void {
    this.sprite = new PIXI.Graphics();
    
    // Create player character
    this.sprite.beginFill(0x3498db); // Blue color
    this.sprite.drawCircle(0, 0, 20); // Main body
    this.sprite.endFill();
    
    // Add details
    this.sprite.lineStyle(2, 0x2980b9);
    this.sprite.drawCircle(0, 0, 16);
    
    // Add to container
    this.container.addChild(this.sprite);
  }

  public initialize(): void {
    // Set initial position to center of screen
    this.position.x = this.app.screen.width / 2;
    this.position.y = this.app.screen.height / 2;
    this.container.position.set(this.position.x, this.position.y);
  }

  public update(delta: number, inputManager: InputManager): void {
    // Handle movement
    if (inputManager.isKeyDown('ArrowLeft') || inputManager.isKeyDown('a')) {
      this.position.x -= this.speed * delta;
    }
    if (inputManager.isKeyDown('ArrowRight') || inputManager.isKeyDown('d')) {
      this.position.x += this.speed * delta;
    }
    if (inputManager.isKeyDown('ArrowUp') || inputManager.isKeyDown('w')) {
      this.position.y -= this.speed * delta;
    }
    if (inputManager.isKeyDown('ArrowDown') || inputManager.isKeyDown('s')) {
      this.position.y += this.speed * delta;
    }

    // Keep player within bounds
    this.position.x = Math.max(20, Math.min(this.app.screen.width - 20, this.position.x));
    this.position.y = Math.max(20, Math.min(this.app.screen.height - 20, this.position.y));
    
    // Update position
    this.container.position.set(this.position.x, this.position.y);
  }

  public getPosition() {
    return { ...this.position };
  }

  public destroy(): void {
    this.sprite.destroy();
    this.container.destroy({ children: true });
  }
}