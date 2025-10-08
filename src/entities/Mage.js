// Маг - медленные мощные атаки
import { Unit } from './Unit.js';

export class Mage extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy);
        
        // Характеристики мага
        this.maxHp = 40;
        this.hp = this.maxHp;
        this.damage = 20;
        this.attackSpeed = 2.0; // медленные атаки
        this.range = 4;
        this.size = { width: 2, height: 2 }; // занимает 2x2 клетки
        this.color = 0x9B4AE2; // фиолетовый
        
        // Обновляем визуал
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            // Добавляем иконку магии (звезда)
            const starIcon = this.scene.add.graphics();
            starIcon.fillStyle(0xFFD700);
            starIcon.beginPath();
            
            // Рисуем простую звезду
            const centerX = this.sprite.x;
            const centerY = this.sprite.y;
            const radius = 8;
            
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                if (i === 0) {
                    starIcon.moveTo(x, y);
                } else {
                    starIcon.lineTo(x, y);
                }
            }
            starIcon.closePath();
            starIcon.fillPath();
            
            // Если это враг, делаем серым
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
                starIcon.setFillStyle(0x444444);
            }
        }
    }

    createAttackEffect(target) {
        const startPos = this.sprite;
        const endPos = target.sprite;
        
        // Создаем магический снаряд
        const projectile = this.scene.add.circle(startPos.x, startPos.y, 5, 0xFFD700);
        
        // Анимация полета снаряда
        this.scene.tweens.add({
            targets: projectile,
            x: endPos.x,
            y: endPos.y,
            duration: 400,
            ease: 'Power2',
            onComplete: () => {
                // Взрыв при попадании
                this.createExplosionEffect(endPos.x, endPos.y);
                projectile.destroy();
            }
        });
        
        // Добавляем свечение
        projectile.setStrokeStyle(2, 0xFFFFFF, 0.8);
    }

    createExplosionEffect(x, y) {
        // Создаем взрыв
        const explosion = this.scene.add.circle(x, y, 0, 0xFF4500);
        
        this.scene.tweens.add({
            targets: explosion,
            radius: 20,
            alpha: 0,
            duration: 300,
            ease: 'Power2',
            onComplete: () => {
                explosion.destroy();
            }
        });
        
        // Добавляем частицы
        for (let i = 0; i < 8; i++) {
            const particle = this.scene.add.circle(x, y, 2, 0xFFD700);
            const angle = (i * Math.PI * 2) / 8;
            const distance = 15;
            
            this.scene.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
    }
}
