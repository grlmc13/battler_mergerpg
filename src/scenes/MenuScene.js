// Главное меню игры
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Загружаем ресурсы для меню
        this.load.image('background', 'src/assets/sprites/ui/background.png');
        this.load.image('logo', 'src/assets/sprites/ui/logo.png');
        this.load.image('playButton', 'src/assets/sprites/ui/play_button.png');
    }

    create() {
        // Создаем фон
        this.add.image(240, 400, 'background').setScale(1);
        
        // Создаем логотип
        const logo = this.add.image(240, 200, 'logo').setScale(0.8);
        
        // Создаем кнопку "PvP Mode" (текущий бесконечный режим)
        const pvpButton = this.add.image(240, 350, 'playButton')
            .setInteractive()
            .setScale(0.6);
            
        pvpButton.on('pointerdown', () => {
            this.scene.start('GameScene', { mode: 'pvp' });
        });
        
        // Создаем кнопку "PvE Waves" (новый волновой режим)
        const pveButton = this.add.image(240, 450, 'playButton')
            .setInteractive()
            .setScale(0.6);
            
        pveButton.on('pointerdown', () => {
            this.scene.start('GameScenePvE');
        });
        
        // Добавляем тексты
        this.add.text(240, 320, 'PvP Mode', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(240, 420, 'PvE Waves', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        
        this.add.text(240, 500, 'Выберите режим игры', {
            fontSize: '18px',
            fill: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
    }
}