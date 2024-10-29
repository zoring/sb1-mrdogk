import { InventorySystem } from './InventorySystem';

export class ShopSystem {
  constructor(private inventory: InventorySystem) {}

  public buyItem(itemId: string, price: number): boolean {
    if (this.inventory.removeGold(price)) {
      this.inventory.addItem(itemId);
      return true;
    }
    return false;
  }

  public sellItem(itemId: string, price: number): boolean {
    if (this.inventory.removeItem(itemId)) {
      this.inventory.addGold(price);
      return true;
    }
    return false;
  }
}