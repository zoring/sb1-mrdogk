import { Item } from '../types/Item';
import { EventSystem } from './EventSystem';

export class Inventory {
  private items: Item[] = [];
  private gold: number = 100000;
  private maxSize: number = 20;
  private events: EventSystem;

  constructor() {
    this.events = new EventSystem();
  }

  public addItem(item: Item): boolean {
    if (this.items.length < this.maxSize) {
      this.items.push(item);
      this.events.emit('inventoryChanged');
      return true;
    }
    return false;
  }

  public removeItem(itemId: string): boolean {
    const index = this.items.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.events.emit('inventoryChanged');
      return true;
    }
    return false;
  }

  public getItems(): Item[] {
    return [...this.items];
  }

  public addGold(amount: number): void {
    this.gold += amount;
    this.events.emit('goldChanged', this.gold);
  }

  public removeGold(amount: number): boolean {
    if (this.gold >= amount) {
      this.gold -= amount;
      this.events.emit('goldChanged', this.gold);
      return true;
    }
    return false;
  }

  public getGold(): number {
    return this.gold;
  }

  public hasItem(itemId: string): boolean {
    return this.items.some(item => item.id === itemId);
  }

  public clear(): void {
    this.items = [];
    this.events.emit('inventoryChanged');
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    this.events.on(event, callback);
  }

  public off(event: string, callback: (...args: any[]) => void): void {
    this.events.off(event, callback);
  }
}