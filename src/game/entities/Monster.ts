import * as PIXI from 'pixi.js';
import { Entity } from './Entity';
import { Player } from './Player';
import { MonsterData } from '../data/MonsterData';

export class Monster extends Entity {
  private data: MonsterData;
  private health: number;
  private maxHealth: number;
  private player: Player;
  private state: 'idle' | 'chase' | 'attack' | 'retreat' = 'idle';
  private lastAttackTime: number = 0;
  private attackCooldown: number = 1000; // 攻击冷却时间（毫秒）
  private healthBar: PIXI.Graphics;
  private aggroRange: number = 200; // 仇恨范围
  private speed: number = 2;

  constructor(x: number, y: number, data: MonsterData, player: Player) {
    super(x, y);
    this.data = data;
    this.maxHealth = data.health;
    this.health = this.maxHealth;
    this.player = player;
    this.setupSprite();
    this.createHealthBar();
  }

  private setupSprite(): void {
    if (this.sprite) {
      this.sprite.width = 32;
      this.sprite.height = 32;
      this.sprite.tint = this.data.color;
      this.sprite.anchor.set(0.5);
    }
  }

  private createHealthBar(): void {
    this.healthBar = new PIXI.Graphics();
    this.updateHealthBar();
    if (this.sprite) {
      this.sprite.addChild(this.healthBar);
    }
  }

  private updateHealthBar(): void {
    this.healthBar.clear();
    
    // 血条背景
    this.healthBar.beginFill(0xff0000);
    this.healthBar.drawRect(-20, -25, 40, 5);
    this.healthBar.endFill();

    // 当前血量
    const healthPercent = this.health / this.maxHealth;
    this.healthBar.beginFill(0x00ff00);
    this.healthBar.drawRect(-20, -25, 40 * healthPercent, 5);
    this.healthBar.endFill();
  }

  public update(): void {
    const playerPos = this.player.getPosition();
    const distance = Math.sqrt(
      Math.pow(this.position.x - playerPos.x, 2) + 
      Math.pow(this.position.y - playerPos.y, 2)
    );

    // 更新AI状态
    this.updateState(distance);

    // 根据状态执行行为
    switch (this.state) {
      case 'chase':
        this.moveTowardsPlayer();
        break;
      case 'retreat':
        this.moveAwayFromPlayer();
        break;
      case 'attack':
        // 攻击逻辑在CombatSystem中处理
        break;
      case 'idle':
        // 可以添加随机游荡逻辑
        break;
    }

    if (this.sprite) {
      this.sprite.position.copyFrom(this.position);
    }
  }

  private updateState(distanceToPlayer: number): void {
    if (this.health < this.maxHealth * 0.3) {
      // 血量低于30%时撤退
      this.state = 'retreat';
    } else if (distanceToPlayer <= this.data.attackRange) {
      this.state = 'attack';
    } else if (distanceToPlayer <= this.aggroRange) {
      this.state = 'chase';
    } else {
      this.state = 'idle';
    }
  }

  private moveTowardsPlayer(): void {
    const playerPos = this.player.getPosition();
    const angle = Math.atan2(
      playerPos.y - this.position.y,
      playerPos.x - this.position.x
    );
    
    this.position.x += Math.cos(angle) * this.speed;
    this.position.y += Math.sin(angle) * this.speed;
  }

  private moveAwayFromPlayer(): void {
    const playerPos = this.player.getPosition();
    const angle = Math.atan2(
      playerPos.y - this.position.y,
      playerPos.x - this.position.x
    );
    
    this.position.x -= Math.cos(angle) * this.speed;
    this.position.y -= Math.sin(angle) * this.speed;
  }

  public takeDamage(amount: number): void {
    this.health = Math.max(0, this.health - amount);
    this.updateHealthBar();

    if (this.health <= 0) {
      this.die();
    }
  }

  private die(): void {
    // 掉落物品逻辑
    if (Math.random() < this.data.dropRate) {
      // TODO: 实现掉落物品系统
    }
    this.destroy();
  }

  public getAttack(): number {
    return this.data.attack;
  }

  public getDefense(): number {
    return this.data.defense;
  }

  public getAttackRange(): number {
    return this.data.attackRange;
  }

  public canAttack(): boolean {
    const now = Date.now();
    if (now - this.lastAttackTime >= this.attackCooldown) {
      this.lastAttackTime = now;
      return true;
    }
    return false;
  }

  public override destroy(): void {
    if (this.healthBar) {
      this.healthBar.destroy();
    }
    super.destroy();
  }
}