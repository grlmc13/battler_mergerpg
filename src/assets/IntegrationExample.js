/**
 * Пример интеграции улучшенной системы ресурсов в игру
 * Показывает, как использовать AssetLoader и EffectManager
 */

// В GameScene.js - в методе preload():
function preload() {
    // Создаем загрузчик ресурсов
    this.assetLoader = new AssetLoader(this);
    this.assetLoader.preload();
}

// В GameScene.js - в методе create():
function create() {
    // Создаем менеджер эффектов
    this.effectManager = new EffectManager(this);
    
    // Создаем анимации
    this.assetLoader.createAnimations();
    
    // Остальная инициализация...
}

// Пример использования в классе Mage:
class ImprovedMage extends Unit {
    createMagicBolt(target) {
        // Проверяем, что цель жива
        if (!target || target.isDead || !target.sprite || !target.sprite.active) {
            return;
        }
        
        // Используем менеджер эффектов
        this.scene.effectManager.createMagicBolt(
            this.sprite.x, this.sprite.y,
            target.sprite.x, target.sprite.y,
            {
                color: 0x9B4AE2,
                thickness: 4,
                duration: 400
            }
        );
        
        // Создаем взрыв на цели
        this.scene.effectManager.createExplosion(
            target.sprite.x, target.sprite.y,
            {
                color: 0x9B4AE2,
                size: 15,
                particles: 6
            }
        );
    }
}

// Пример использования в классе Healer:
class ImprovedHealer extends Unit {
    heal(target) {
        // Обычное лечение
        target.takeDamage(-this.healAmount);
        
        // Эффект лечения
        this.scene.effectManager.createHealEffect(
            target.sprite.x, target.sprite.y,
            {
                color: 0x00FF00,
                particles: 8
            }
        );
    }
}

// Пример использования при мердже:
function mergeUnits(unit1, unit2) {
    // Обычный мердж
    const success = unit1.merge(unit2.unitType);
    
    if (success) {
        // Эффект мерджа
        this.effectManager.createMergeEffect(
            unit1.sprite.x, unit1.sprite.y,
            {
                color: 0xFFD700,
                size: 30
            }
        );
    }
}

// Пример создания UI элементов:
function createUI() {
    // Кнопка с использованием AssetLoader
    const button = this.assetLoader.createSprite(
        this.cameras.main.centerX, 50,
        'button_normal',
        {
            scale: 1.0,
            depth: 100
        }
    );
    
    // Делаем кнопку интерактивной
    button.setInteractive();
    
    // Эффект при наведении
    button.on('pointerover', () => {
        this.assetLoader.createSprite(
            button.x, button.y,
            'button_hover',
            { depth: 101 }
        );
    });
}

// Пример создания анимированного спрайта:
function createAnimatedEffect(x, y) {
    // Создаем анимированный спрайт
    const effect = this.assetLoader.createAnimatedSprite(
        x, y,
        'effects_atlas',
        'magic_bolt_anim',
        {
            scale: 1.5,
            depth: 200
        }
    );
    
    // Удаляем после анимации
    effect.on('animationcomplete', () => {
        effect.destroy();
    });
}
