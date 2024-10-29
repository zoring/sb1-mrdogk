import * as PIXI from 'pixi.js';
import { Inventory } from '../systems/Inventory';
import { Item } from '../types/Item';

export class Shop {
  private container: PIXI.Container;
  private inventory: Inventory;
  private items: Item[];
  private goldText: PIXI.Text;
  private itemList: PIXI.Container;
  private isVisible: boolean = false;

  constructor(items: Item[], inventory: Inventory) {
    this.items = items;
    this.inventory = inventory;
    this.container = new PIXI.Container();
    this.container.visible = false;
    
    // 创建商店UI
    const background = new PIXI.Graphics();
    background.beginFill(0x2C3E50, 0.9);
    background.drawRect(0, 0, 300, 400);
    background.endFill();
    this.container.addChild(background);

    // 创建标题
    const title = new PIXI.Text('Shop', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xFFFFFF
    });
    title.position.set(10, 10);
    this.container.addChild(title);

    // 创建金币显示
    this.goldText = new PIXI.Text(`Gold: ${this.inventory.getGold()}`, {
      fontFamily: 'Arial',
      fontSize: 18,
      fill: 0xFFD700
    });
    this.goldText.position.set(10, 40);
    this.container.addChild(this.goldText);

    // 创建物品列表容器
    this.itemList = new PIXI.Container();
    this.itemList.position.set(10, 70);
    this.container.addChild(this.itemList);

    this.setupShop();
  }

  private setupShop(): void {
    this.items.forEach((item, index) => {
      const itemContainer = new PIXI.Container();
      itemContainer.position.set(0, index * 40);

      // 物品名称
      const nameText = new PIXI.Text(item.name, {
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xFFFFFF
      });
      itemContainer.addChild(nameText);

      // 物品价格
      const priceText = new PIXI.Text(`${item.price}g`, {
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xFFD700
      });
      priceText.position.set(150, 0);
      itemContainer.addChild(priceText);

      // 购买按钮
      const buyButton = new PIXI.Text('Buy', {
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0x2ECC71
      });
      buyButton.position.set(220, 0);
      buyButton.eventMode = 'static';
      buyButton.cursor = 'pointer';
      buyButton.on('pointerdown', () => this.buyItem(item));
      itemContainer.addChild(buyButton);

      this.itemList.addChild(itemContainer);
    });

    this.updateGoldDisplay();
  }

  private updateGoldDisplay(): void {
    this.goldText.text = `Gold: ${this.inventory.getGold()}`;
  }

  private buyItem(item: Item): void {
    if (this.inventory.getGold() >= item.price) {
      this.inventory.removeGold(item.price);
      this.inventory.addItem(item);
      this.updateGoldDisplay();
    }
  }

  public show(): void {
    this.isVisible = true;
    this.container.visible = true;
    this.updateGoldDisplay();
  }

  public hide(): void {
    this.isVisible = false;
    this.container.visible = false;
  }

  public toggle(): void {
    this.isVisible ? this.hide() : this.show();
  }

  public getContainer(): PIXI.Container {
    return this.container;
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}