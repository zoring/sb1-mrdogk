import { Item } from '../data/ItemData';

export interface EquipmentSlots {
  weapon: Item | null;
  armor: Item | null;
}

export class Equipment {
  private slots: EquipmentSlots = {
    weapon: null,
    armor: null
  };

  private stats = {
    attack: 0,
    defense: 0
  };

  public equip(item: Item): Item | null {
    if (!item.type || (item.type !== 'weapon' && item.type !== 'armor')) {
      return null;
    }

    const oldItem = this.slots[item.type];
    this.slots[item.type] = item;
    this.updateStats();
    return oldItem;
  }

  public unequip(slot: keyof EquipmentSlots): Item | null {
    const item = this.slots[slot];
    if (item) {
      this.slots[slot] = null;
      this.updateStats();
    }
    return item;
  }

  private updateStats(): void {
    this.stats.attack = 0;
    this.stats.defense = 0;

    Object.values(this.slots).forEach(item => {
      if (item?.stats) {
        if (item.stats.attack) this.stats.attack += item.stats.attack;
        if (item.stats.defense) this.stats.defense += item.stats.defense;
      }
    });
  }

  public getStats(): typeof this.stats {
    return { ...this.stats };
  }

  public getEquippedItem(slot: keyof EquipmentSlots): Item | null {
    return this.slots[slot];
  }
}