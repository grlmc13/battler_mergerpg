// Стартовое меню
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Заголовок игры
        this.add.text(240, 200, 'БАТТЛЕР РПГ', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Подзаголовок
        this.add.text(240, 250, 'Прототип', {
            fontSize: '18px',
            fill: '#cccccc'
        }).setOrigin(0.5);

        // Кнопка старта
        const startButton = this.add.rectangle(240, 400, 200, 60, 0x4A90E2)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });

        this.add.text(240, 400, 'НАЧАТЬ ИГРУ', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Инструкции
        this.add.text(240, 500, 'Размещайте юнитов на поле\nи сражайтесь с врагами!', {
            fontSize: '14px',
            fill: '#aaaaaa',
            align: 'center'
        }).setOrigin(0.5);

        // Эффект при наведении на кнопку
        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x5BA0F2);
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x4A90E2);
        });
    }
}
