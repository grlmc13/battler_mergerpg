// Лучник - быстрые слабые атаки
import { Unit } from './Unit.js';

export class Archer extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy);
        
        // Характеристики лучника
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 8;
        this.attackSpeed = 0.5; // быстрые атаки
        this.range = 3;
        this.size = { width: 1, height: 1 };
        this.color = 0x4A90E2; // синий
        
        // Обновляем визуал
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            // Добавляем иконку лука (простой треугольник)
            const bowIcon = this.scene.add.triangle(
                this.sprite.x, 
                this.sprite.y, 
                0, -8, -6, 6, 6, 6, 
                0x8B4513
            );
            
            // Если это враг, делаем серым
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
                bowIcon.setFillStyle(0x444444);
            }
        }
    }

    createAttackEffect(target) {
        const startPos = this.sprite;
        const endPos = target.sprite;
        
        // Создаем стрелу
        const arrow = this.scene.add.graphics();
        arrow.lineStyle(2, 0x8B4513, 1);
        arrow.lineBetween(startPos.x, startPos.y, endPos.x, endPos.y);
        
        // Добавляем наконечник стрелы
        const angle = Phaser.Math.Angle.Between(startPos.x, startPos.y, endPos.x, endPos.y);
        const tipX = endPos.x - Math.cos(angle) * 10;
        const tipY = endPos.y - Math.sin(angle) * 10;
        
        arrow.fillStyle(0x8B4513);
        arrow.beginPath();
        arrow.moveTo(endPos.x, endPos.y);
        arrow.lineTo(tipX - Math.cos(angle + 0.5) * 5, tipY - Math.sin(angle + 0.5) * 5);
        arrow.lineTo(tipX - Math.cos(angle - 0.5) * 5, tipY - Math.sin(angle - 0.5) * 5);
        arrow.closePath();
        arrow.fillPath();
        
        // Удаляем стрелу через 300мс
        this.scene.time.delayedCall(300, () => {
            arrow.destroy();
        });
    }
}
