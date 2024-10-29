export interface Skill {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'buff' | 'heal';
  power: number;
  range: number;
  cooldown: number;
  manaCost: number;
  duration?: number;
}

export const SKILLS: Skill[] = [
  {
    id: 'slash',
    name: '斩击',
    description: '对目标造成物理伤害',
    type: 'attack',
    power: 20,
    range: 60,
    cooldown: 2,
    manaCost: 10
  },
  {
    id: 'fireball',
    name: '火球术',
    description: '发射一个火球造成魔法伤害',
    type: 'attack',
    power: 30,
    range: 150,
    cooldown: 5,
    manaCost: 25
  },
  {
    id: 'heal',
    name: '治疗术',
    description: '恢复生命值',
    type: 'heal',
    power: 40,
    range: 0,
    cooldown: 8,
    manaCost: 30
  },
  {
    id: 'rage',
    name: '狂暴',
    description: '暂时提高攻击力',
    type: 'buff',
    power: 15,
    range: 0,
    cooldown: 15,
    manaCost: 35,
    duration: 10
  }
];