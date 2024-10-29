import * as PIXI from 'pixi.js';
import { Player } from '../entities/Player';
import { SKILLS } from '../data/SkillData';
import { CombatSystem } from '../systems/CombatSystem';
import { UITextureManager } from './UIAssets';

export class CombatUI {
  private container: PIXI.Container;
  private skillButtons: Map<string, PIXI.Container> = new Map();
  private player: Player;
  private combatSystem: CombatSystem;

  constructor(player: Player, combatSystem: CombatSystem) {
    this.container = new PIXI.Container();
    this.player = player;
    this.combatSystem = combatSystem;
    this.setupUI();
  }

  private setupUI(): void {
    // 创建技能栏背景
    const skillBar = new PIXI.Sprite(UITextureManager.getTexture('PANEL_BG'));
    skillBar.width = 400;
    skillBar.height = 60;
    skillBar.position.set(
      window.innerWidth / 2 - 200,
      window.innerHeight - 80
    );
    skillBar.alpha = 0.8;

    this.container.addChild(skillBar);

    // 创建技能按钮
    SKILLS.forEach((skill, index) => {
      const button = this.createSkillButton(skill, index);
      skillBar.addChild(button);
      this.skillButtons.set(skill.id, button);
    });
  }

  private createSkillButton(skill: Skill, index: number): PIXI.Container {
    const button = new PIXI.Container();
    button.position.set(10 + index * 100, 10);

    // 技能槽背景
    const slotBg = new PIXI.Sprite(UITextureManager.getTexture('SKILL_SLOT'));
    slotBg.width = 80;
    slotBg.height = 40;

    // 技能图标
    const skillIcon = new PIXI.Sprite(UITextureManager.getSkillTexture(skill.id));
    skillIcon.width = 32;
    skillIcon.height = 32;
    skillIcon.position.set(4, 4);

    // 技能名称
    const text = new PIXI.Text(skill.name, {
      fontFamily: 'Arial',
      fontSize: 12,
      fill: 0xffffff
    });
    text.position.set(40, 12);

    const cooldownOverlay = new PIXI.Graphics();
    cooldownOverlay.visible = false;

    button.addChild(slotBg, skillIcon, text, cooldownOverlay);
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', () => this.useSkill(skill));

    return button;
  }

  // ... 其余代码保持不变 ...
}