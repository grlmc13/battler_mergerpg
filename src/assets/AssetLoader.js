/**
 * Система загрузки ресурсов для игры
 * Поддерживает спрайты, атласы, звуки и анимации
 */
class AssetLoader {
    constructor(scene) {
        this.scene = scene;
        this.loadedAssets = new Map();
    }

    /**
     * Загружает все ресурсы игры
     */
    preload() {
        this.loadSprites();
        this.loadAtlases();
        this.loadSounds();
        this.loadFonts();
    }

    /**
     * Загружает отдельные спрайты
     */
    loadSprites() {
        const sprites = {
            // Юниты
            'archer': 'sprites/units/Elf_Archer.png',
            'warrior': 'sprites/units/Elf_Knight_Sword.png',
            'barbarian': 'sprites/units/Dwarf Axe Warrior.png',
            'healer': 'sprites/units/Dark Elves Healer Priestess.png',
            'mage': 'sprites/units/Dark Elves Crystal Mage.png',
            'tank': 'sprites/units/tank.png',
            'assassin': 'sprites/units/assassin.png',
            'druid': 'sprites/units/druid.png',
            'witch': 'sprites/units/witch.png',
            
            // Эффекты
            'magic_bolt': 'sprites/effects/magic_bolt.png',
            'heal_effect': 'sprites/effects/heal_effect.png',
            'damage_number': 'sprites/effects/damage_number.png',
            
            // UI
            'button_normal': 'sprites/ui/button_normal.png',
            'button_hover': 'sprites/ui/button_hover.png',
            'coin_icon': 'sprites/ui/coin.png',
            'star_icon': 'sprites/ui/star.png'
        };

        Object.entries(sprites).forEach(([key, path]) => {
            this.scene.load.image(key, `src/assets/${path}`);
        });
    }

    /**
     * Загружает атласы спрайтов
     */
    loadAtlases() {
        // Пример атласа для анимаций
        this.scene.load.atlas('effects_atlas', 
            'src/assets/atlases/effects.png', 
            'src/assets/atlases/effects.json'
        );
    }

    /**
     * Загружает звуки
     */
    loadSounds() {
        const sounds = {
            'attack_sound': 'sounds/attack.wav',
            'heal_sound': 'sounds/heal.wav',
            'coin_sound': 'sounds/coin.wav',
            'victory_sound': 'sounds/victory.wav'
        };

        Object.entries(sounds).forEach(([key, path]) => {
            this.scene.load.audio(key, `src/assets/${path}`);
        });
    }

    /**
     * Загружает шрифты
     */
    loadFonts() {
        // Загрузка веб-шрифтов
        this.scene.load.webfont('game_font', 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
    }

    /**
     * Создает анимации из атласа
     */
    createAnimations() {
        // Анимация магического эффекта
        this.scene.anims.create({
            key: 'magic_bolt_anim',
            frames: this.scene.anims.generateFrameNames('effects_atlas', {
                prefix: 'magic_bolt_',
                start: 1,
                end: 8
            }),
            frameRate: 12,
            repeat: 0
        });

        // Анимация эффекта лечения
        this.scene.anims.create({
            key: 'heal_effect_anim',
            frames: this.scene.anims.generateFrameNames('effects_atlas', {
                prefix: 'heal_',
                start: 1,
                end: 6
            }),
            frameRate: 10,
            repeat: 0
        });
    }

    /**
     * Получает спрайт по ключу
     */
    getSprite(key) {
        return this.scene.textures.get(key);
    }

    /**
     * Создает спрайт с настройками
     */
    createSprite(x, y, key, config = {}) {
        const sprite = this.scene.add.image(x, y, key);
        
        // Применяем настройки
        if (config.scale) sprite.setScale(config.scale);
        if (config.alpha) sprite.setAlpha(config.alpha);
        if (config.tint) sprite.setTint(config.tint);
        if (config.depth) sprite.setDepth(config.depth);
        
        return sprite;
    }

    /**
     * Создает анимированный спрайт
     */
    createAnimatedSprite(x, y, key, animKey, config = {}) {
        const sprite = this.createSprite(x, y, key, config);
        
        if (animKey) {
            sprite.play(animKey);
        }
        
        return sprite;
    }
}

// Экспортируем для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssetLoader;
} else {
    window.AssetLoader = AssetLoader;
}
