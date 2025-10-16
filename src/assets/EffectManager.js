/**
 * Менеджер эффектов для игры
 * Создает и управляет визуальными эффектами
 */
class EffectManager {
    constructor(scene) {
        this.scene = scene;
        this.activeEffects = [];
    }

    /**
     * Создает эффект магической стрелы
     */
    createMagicBolt(fromX, fromY, toX, toY, config = {}) {
        const graphics = this.scene.add.graphics();
        
        // Настройки по умолчанию
        const settings = {
            color: 0x9B4AE2,
            thickness: 3,
            alpha: 0.8,
            duration: 300,
            ...config
        };

        // Рисуем линию
        graphics.lineStyle(settings.thickness, settings.color, settings.alpha);
        graphics.lineBetween(fromX, fromY, toX, toY);

        // Анимация исчезновения
        this.scene.tweens.add({
            targets: graphics,
            alpha: 0,
            duration: settings.duration,
            onComplete: () => {
                if (graphics && graphics.destroy) {
                    graphics.destroy();
                }
            }
        });

        return graphics;
    }

    /**
     * Создает эффект взрыва
     */
    createExplosion(x, y, config = {}) {
        const settings = {
            color: 0xFF6B6B,
            size: 20,
            particles: 8,
            duration: 500,
            ...config
        };

        // Создаем частицы взрыва
        for (let i = 0; i < settings.particles; i++) {
            const particle = this.scene.add.circle(
                x + Phaser.Math.Between(-10, 10),
                y + Phaser.Math.Between(-10, 10),
                Phaser.Math.Between(2, 5),
                settings.color
            );

            // Анимация частицы
            this.scene.tweens.add({
                targets: particle,
                x: particle.x + Phaser.Math.Between(-50, 50),
                y: particle.y + Phaser.Math.Between(-50, 50),
                alpha: 0,
                scale: 0,
                duration: settings.duration,
                delay: i * 20,
                onComplete: () => {
                    if (particle && particle.destroy) {
                        particle.destroy();
                    }
                }
            });
        }

        // Основной взрыв
        const explosion = this.scene.add.circle(x, y, settings.size, settings.color, 0.8);
        this.scene.tweens.add({
            targets: explosion,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: settings.duration,
            onComplete: () => {
                if (explosion && explosion.destroy) {
                    explosion.destroy();
                }
            }
        });
    }

    /**
     * Создает эффект лечения
     */
    createHealEffect(x, y, config = {}) {
        const settings = {
            color: 0x00FF00,
            size: 15,
            particles: 5,
            duration: 800,
            ...config
        };

        // Создаем частицы лечения
        for (let i = 0; i < settings.particles; i++) {
            const particle = this.scene.add.star(
                x + Phaser.Math.Between(-20, 20),
                y + Phaser.Math.Between(-20, 20),
                5, 5, 10, settings.color
            );

            this.scene.tweens.add({
                targets: particle,
                y: particle.y - 30,
                alpha: 0,
                angle: 360,
                duration: settings.duration,
                delay: i * 100,
                onComplete: () => {
                    if (particle && particle.destroy) {
                        particle.destroy();
                    }
                }
            });
        }
    }

    /**
     * Создает эффект урона
     */
    createDamageNumber(x, y, damage, config = {}) {
        const settings = {
            color: 0xFF0000,
            fontSize: '16px',
            duration: 1000,
            ...config
        };

        const damageText = this.scene.add.text(x, y, `-${damage}`, {
            fontSize: settings.fontSize,
            fill: `#${settings.color.toString(16).padStart(6, '0')}`,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: damageText,
            y: damageText.y - 30,
            alpha: 0,
            duration: settings.duration,
            onComplete: () => {
                if (damageText && damageText.destroy) {
                    damageText.destroy();
                }
            }
        });

        return damageText;
    }

    /**
     * Создает эффект мерджа
     */
    createMergeEffect(x, y, config = {}) {
        const settings = {
            color: 0xFFD700,
            size: 25,
            duration: 600,
            ...config
        };

        // Золотая вспышка
        const flash = this.scene.add.circle(x, y, settings.size, settings.color, 0.6);
        
        this.scene.tweens.add({
            targets: flash,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: settings.duration,
            onComplete: () => {
                if (flash && flash.destroy) {
                    flash.destroy();
                }
            }
        });

        // Звездочки вокруг
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const starX = x + Math.cos(angle) * 30;
            const starY = y + Math.sin(angle) * 30;
            
            const star = this.scene.add.star(starX, starY, 5, 5, 10, settings.color);
            
            this.scene.tweens.add({
                targets: star,
                x: starX + Math.cos(angle) * 20,
                y: starY + Math.sin(angle) * 20,
                alpha: 0,
                scale: 0,
                duration: settings.duration,
                delay: i * 50,
                onComplete: () => {
                    if (star && star.destroy) {
                        star.destroy();
                    }
                }
            });
        }
    }

    /**
     * Очищает все активные эффекты
     */
    clearAllEffects() {
        this.activeEffects.forEach(effect => {
            if (effect && effect.destroy) {
                effect.destroy();
            }
        });
        this.activeEffects = [];
    }
}

// Экспортируем для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EffectManager;
} else {
    window.EffectManager = EffectManager;
}
