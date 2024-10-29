import * as PIXI from 'pixi.js';
import { Entity } from './Entity';

/**
 * 实体管理器
 * 负责管理所有游戏实体的生命周期
 */
export class EntityManager {
  private entities: Set<Entity> = new Set();
  private container: PIXI.Container;

  constructor() {
    this.container = new PIXI.Container();
  }

  /**
   * 初始化实体管理器
   */
  public initialize(): void {
    // 初始化逻辑
  }

  /**
   * 添加实体
   */
  public add(entity: Entity): void {
    this.entities.add(entity);
    if (entity.getSprite) {
      this.container.addChild(entity.getSprite());
    }
  }

  /**
   * 移除实体
   */
  public remove(entity: Entity): void {
    this.entities.delete(entity);
    if (entity.getSprite) {
      this.container.removeChild(entity.getSprite());
    }
  }

  /**
   * 更新所有实体
   */
  public update(delta: number): void {
    this.entities.forEach(entity => {
      if (entity.update) {
        entity.update(delta);
      }
    });
  }

  /**
   * 获取所有实体
   */
  public getEntities(): Entity[] {
    return Array.from(this.entities);
  }

  /**
   * 获取容器
   */
  public getContainer(): PIXI.Container {
    return this.container;
  }

  /**
   * 销毁实体管理器
   */
  public destroy(): void {
    this.entities.forEach(entity => {
      if (entity.destroy) {
        entity.destroy();
      }
    });
    this.entities.clear();
    this.container.destroy({ children: true });
  }
}