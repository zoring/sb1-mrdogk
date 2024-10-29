export interface ItemData {
  id: string;
  name: string;
  type: string;
  price: number;
  description: string;
  stats?: {
    attack?: number;
    defense?: number;
    health?: number;
  };
}

export const ITEMS: ItemData[] = [
  {
    id: 'health_potion',
    name: 'Health Potion',
    type: 'consumable',
    price: 50,
    description: 'Restores 50 HP',
    stats: {
      health: 50,
    },
  },
  {
    id: 'sword',
    name: 'Iron Sword',
    type: 'weapon',
    price: 100,
    description: 'A basic sword',
    stats: {
      attack: 10,
    },
  },
  {
    id: 'shield',
    name: 'Wooden Shield',
    type: 'armor',
    price: 75,
    description: 'A basic shield',
    stats: {
      defense: 5,
    },
  },
];