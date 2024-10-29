export class InventorySystem {
  private items: Map<string, number> = new Map();
  private gold: number = 1000;

  public addItem(itemId: string, quantity: number = 1): void {
    const currentQuantity = this.items.get(itemId) || 0;
    this.items.set(itemId, currentQuantity + quantity);
  }

  public removeItem(itemId: string, quantity: number = 1): boolean {
    const currentQuantity = this.items.get(itemId) || 0;
    if (currentQuantity >= quantity) {
      this.items.set(itemId, currentQuantity - quantity);
      return true;
    }
    return false;
  }

  public getGold(): number {
    return this.gold;
  }

  public addGold(amount: number): void {
    this.gold += amount;
  }

  public removeGold(amount: number): boolean {
    if (this.gold >= amount) {
      this.gold -= amount;
      return true;
    }
    return false;
  }
}