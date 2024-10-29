export interface ItemType {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'consumable' | 'material';
  value: number;
  icon?: string;
}

export interface NPCType {
  id: number;
  name: string;
  type: 'merchant' | 'quest' | 'enemy';
  x: number;
  y: number;
  texture: string;
  dialogue: string[];
  inventory?: ItemType[];
}

export interface PlayerStats {
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  level: number;
  experience: number;
  gold: number;
}