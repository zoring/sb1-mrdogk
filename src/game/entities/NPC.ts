import * as PIXI from 'pixi.js';
import { Entity } from './Entity';
import { Player } from './Player';
import { Shop } from '../ui/Shop';
import { Dialog } from '../ui/Dialog';
import { NPCData } from '../data/NPCData';

export class NPC extends Entity {
  private name: string;
  private role: string;
  private dialogues: string[];
  private shop: Shop | null = null;
  private dialog: Dialog;
  private interactionRange: number = 100;

  constructor(data: NPCData) {
    const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    const position = { x: data.x, y: data.y };
    const stats = { health: 100, maxHealth: 100, attack: 0, defense: 0, level: 1, experience: 0 };
    
    super(sprite, position, stats);
    
    this.name = data.name;
    this.role = data.role;
    this.dialogues = data.dialogues;
    
    // Setup sprite appearance
    this.sprite.width = 32;
    this.sprite.height = 32;
    this.sprite.tint = this.role === 'merchant' ? 0xFFD700 : 0x4169E1;
    
    this.dialog = new Dialog(this.name, "");
  }

  public setShop(shop: Shop): void {
    this.shop = shop;
  }

  public interact(player: Player): void {
    if (this.role === 'merchant' && this.shop) {
      this.shop.show();
    } else {
      const randomDialogue = this.dialogues[Math.floor(Math.random() * this.dialogues.length)];
      this.dialog.setContent(randomDialogue);
      this.dialog.show();
      
      setTimeout(() => this.dialog.hide(), 3000);
    }
  }

  public update(): void {
    // NPC behavior logic here
  }

  public destroy(): void {
    if (this.dialog) {
      this.dialog.destroy();
    }
    super.destroy();
  }
}