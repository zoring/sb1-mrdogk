import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../game/Engine';

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error('Canvas reference is null');
      return;
    }

    try {
      console.log('Initializing GameEngine...');
      gameEngineRef.current = new GameEngine(canvasRef.current);
      console.log('GameEngine initialized successfully');
      console.log('ouyang ！！ initialized successfully');
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }

    return () => {
      console.log('Cleaning up GameEngine...');
      if (gameEngineRef.current) {
        try {
          gameEngineRef.current.destroy(); // 确保正确销毁
        } catch (error) {
          console.error('Failed to destroy GameEngine:', error);
        }
        gameEngineRef.current = null; // 置为 null
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100vw',
        height: '100vh',
        touchAction: 'none',
      }}
    />
  );
};

export default Game;
