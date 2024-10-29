import * as PIXI from 'pixi.js';
import { Position } from '../types/Position';
import { Stats } from '../types/Stats';

/**
 * 基础实体类
 * 所有游戏实体的基类
 */
export class Entity {
  protected sprite: PIXI.Sprite;
  protected position: Position;
  protected stats: Stats;

  constructor(sprite: PIXI.Sprite, position: Position, stats: Stats) {
    this.sprite = sprite;
    this.position = position;
    this.stats = stats;
    
    // 设置精灵位置
    this.sprite.position.set(position.x, position.y);
  }

  /**
   * 获取实体精灵
   */
  public getSprite(): PIXI.Sprite {
    return this.sprite;
  }

  /**
   * 获取实体位置
   */
  public getPosition(): Position {
    return { ...this.position };
  }

  /**
   * 获取实体状态
   */
  public getStats(): Stats {
    return { ...this.stats };
  }

  /**
   * 更新实体状态
   */
  public update(delta: number): void {
    // 基础更新逻辑
  }

  /**
   * 销毁实体
   */
  public destroy(): void {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}