export interface NPCData {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  sprite: string;
  dialogues: string[];
  items?: string[];
}

export const NPCs: NPCData[] = [
  {
    id: 'merchant1',
    name: 'Merchant Tom',
    role: 'merchant',
    x: 300,
    y: 200,
    sprite: 'merchant',
    dialogues: [
      'Welcome to my shop!',
      'I have the finest goods in all the land!',
      'Take a look at my wares.',
    ],
    items: ['health_potion', 'sword', 'shield'],
  },
  {
    id: 'villager1',
    name: 'Village Elder',
    role: 'quest_giver',
    x: 500,
    y: 300,
    sprite: 'elder',
    dialogues: [
      'Welcome, traveler!',
      'Our village needs your help...',
      'Have you heard about the ancient prophecy?',
    ],
  },
];