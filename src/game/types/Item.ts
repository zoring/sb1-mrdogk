export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'weapon' | 'armor' | 'consumable' | 'material';
  stats?: {
    attack?: number;
    defense?: number;
    health?: number;
  };
}