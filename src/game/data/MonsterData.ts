export interface MonsterData {
  id: string;
  name: string;
  health: number;
  attack: number;
  defense: number;
  attackRange: number;
  dropRate: number;
  color: number;
  experience: number;
}

export const MONSTERS: MonsterData[] = [
  {
    id: 'slime',
    name: '史莱姆',
    health: 50,
    attack: 5,
    defense: 2,
    attackRange: 30,
    dropRate: 0.3,
    color: 0x00ff00,
    experience: 10
  },
  {
    id: 'wolf',
    name: '狼',
    health: 80,
    attack: 12,
    defense: 4,
    attackRange: 40,
    dropRate: 0.4,
    color: 0x808080,
    experience: 20
  },
  {
    id: 'skeleton',
    name: '骷髅',
    health: 100,
    attack: 15,
    defense: 6,
    attackRange: 50,
    dropRate: 0.5,
    color: 0xffffff,
    experience: 30
  }
];