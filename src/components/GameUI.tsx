import React from 'react';

export const GameUI: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 text-white z-10 bg-black/50 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-2">RGB冒险</h1>
      <p className="text-sm">WASD移动</p>
      <p className="text-sm">按E与NPC对话/交易</p>
      <p className="text-sm">按I打开背包</p>
      <div className="mt-4 text-yellow-400">
        <p className="text-sm">商人: 金色NPC</p>
        <p className="text-sm">普通NPC: 蓝色</p>
      </div>
    </div>
  );
};