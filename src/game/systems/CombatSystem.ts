import { Player } from '../entities/Player';
import { EntityManager } from '../entities/EntityManager';

export class CombatSystem {
  constructor(
    private player: Player,
    private entityManager: EntityManager
  ) {}

  public update(delta: number): void {
    // Handle combat logic
  }

  public destroy(): void {
    // Cleanup combat system
  }
}