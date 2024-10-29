import * as PIXI from 'pixi.js';

export enum TileType {
  GROUND,
  WALL,
  WATER
}

export class TileMap {
  private container: PIXI.Container;
  private tiles: TileType[][] = [];
  private tileSize: number = 32;
  private tileSprites: PIXI.Sprite[][] = [];

  constructor(width: number, height: number) {
    this.container = new PIXI.Container();
    this.initializeTiles(width, height);
    this.createTileSprites();
  }

  private initializeTiles(width: number, height: number): void {
    for (let y = 0; y < height; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < width; x++) {
        // 创建简单的地图布局
        if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
          this.tiles[y][x] = TileType.WALL;
        } else {
          this.tiles[y][x] = TileType.GROUND;
        }
      }
    }
  }

  private createTileSprites(): void {
    this.tiles.forEach((row, y) => {
      this.tileSprites[y] = [];
      row.forEach((tile, x) => {
        const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
        sprite.width = this.tileSize;
        sprite.height = this.tileSize;
        sprite.position.set(x * this.tileSize, y * this.tileSize);

        switch (tile) {
          case TileType.WALL:
            sprite.tint = 0x808080;
            break;
          case TileType.GROUND:
            sprite.tint = 0x90EE90;
            break;
          case TileType.WATER:
            sprite.tint = 0x4169E1;
            break;
        }

        this.tileSprites[y][x] = sprite;
        this.container.addChild(sprite);
      });
    });
  }

  public isColliding(x: number, y: number): boolean {
    const tileX = Math.floor(x / this.tileSize);
    const tileY = Math.floor(y / this.tileSize);

    if (tileX < 0 || tileX >= this.tiles[0].length || 
        tileY < 0 || tileY >= this.tiles.length) {
      return true;
    }

    return this.tiles[tileY][tileX] === TileType.WALL;
  }

  public getContainer(): PIXI.Container {
    return this.container;
  }

  public destroy(): void {
    this.tileSprites.forEach(row => {
      row.forEach(sprite => sprite.destroy());
    });
    this.container.destroy({ children: true });
  }
}