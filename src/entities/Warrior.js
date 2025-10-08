// Мечник - средние атаки
import { Unit } from './Unit.js';

export class Warrior extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy);
        
        // Характеристики мечника
        this.maxHp = 50;
        this.hp = this.maxHp;
        this.damage = 12;
        this.attackSpeed = 1.0; // средние атаки
        this.range = 2;
        this.size = { width: 1, height: 2 }; // занимает 2 клетки по высоте
        this.color = 0xE24A4A; // красный
        
        // Обновляем визуал
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            // Добавляем иконку меча (вертикальная линия)
            const swordIcon = this.scene.add.rectangle(
                this.sprite.x, 
                this.sprite.y, 
                3, 
                12, 
                0x8B4513
            );
            
            // Если это враг, делаем серым
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
                swordIcon.setFillStyle(0x444444);
            }
        }
    }

    createAttackEffect(target) {
        const startPos = this.sprite;
        const endPos = target.sprite;
        
        // Создаем эффект удара мечом
        const slash = this.scene.add.graphics();
        slash.lineStyle(4, 0xFFD700, 0.8);
        
        // Рисуем дугу удара
        const angle = Phaser.Math.Angle.Between(startPos.x, startPos.y, endPos.x, endPos.y);
        const arcRadius = 15;
        
        slash.beginPath();
        slash.arc(startPos.x, startPos.y, arcRadius, angle - 0.3, angle + 0.3);
        slash.strokePath();
        
        // Удаляем эффект через 200мс
        this.scene.time.delayedCall(200, () => {
            slash.destroy();
        });
    }
}
