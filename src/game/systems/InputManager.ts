/**
 * 输入管理器
 * 处理键盘输入事件
 */
export class InputManager {
  private keys: Map<string, boolean> = new Map();  // 按键状态映射

  constructor() {
    // 添加键盘事件监听
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  /**
   * 处理按键按下事件
   */
  private onKeyDown(event: KeyboardEvent): void {
    this.keys.set(event.key, true);
  }

  /**
   * 处理按键释放事件
   */
  private onKeyUp(event: KeyboardEvent): void {
    this.keys.set(event.key, false);
  }

  /**
   * 检查指定按键是否被按下
   */
  public isKeyDown(key: string): boolean {
    return this.keys.get(key) || false;
  }

  /**
   * 更新输入状态
   */
  public update(): void {
    // 在这里可以添加额外的输入状态更新逻辑
  }

  /**
   * 清理事件监听
   */
  public destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    window.removeEventListener('keyup', this.onKeyUp.bind(this));
  }
}