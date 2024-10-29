import * as PIXI from 'pixi.js';

export class Dialog {
  private container: PIXI.Container;
  private background: PIXI.Graphics;
  private nameText: PIXI.Text;
  private contentText: PIXI.Text;
  private visible: boolean = false;

  constructor(name: string, content: string) {
    this.container = new PIXI.Container();
    this.setupDialog(name, content);
  }

  private setupDialog(name: string, content: string): void {
    // 创建对话框背景
    this.background = new PIXI.Graphics();
    this.background.beginFill(0x000000, 0.8);
    this.background.drawRoundedRect(0, 0, 400, 150, 10);
    this.background.endFill();

    // 创建名字文本
    this.nameText = new PIXI.Text(name, {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      fontWeight: 'bold'
    });
    this.nameText.position.set(20, 15);

    // 创建内容文本
    this.contentText = new PIXI.Text(content, {
      fontFamily: 'Arial',
      fontSize: 16,
      fill: 0xffffff,
      wordWrap: true,
      wordWrapWidth: 360
    });
    this.contentText.position.set(20, 50);

    // 添加到容器
    this.container.addChild(this.background);
    this.container.addChild(this.nameText);
    this.container.addChild(this.contentText);

    // 设置位置
    this.container.position.set(
      window.innerWidth / 2 - 200,
      window.innerHeight - 200
    );
  }

  public show(): void {
    this.visible = true;
    this.container.visible = true;
  }

  public hide(): void {
    this.visible = false;
    this.container.visible = false;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setContent(content: string): void {
    this.contentText.text = content;
  }

  public getContainer(): PIXI.Container {
    return this.container;
  }

  public destroy(): void {
    this.container.destroy({ children: true });
  }
}