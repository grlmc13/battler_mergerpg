// Основной файл игры - точка входа

// Загружаем сцены после загрузки Phaser
let GameScene, MenuScene;

// Конфигурация Phaser
const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 800,
    parent: 'game-container',
    backgroundColor: '#16213e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 320,
            height: 568
        },
        max: {
            width: 480,
            height: 800
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene]
};

// Запуск игры
const game = new Phaser.Game(config);

// Глобальные настройки игры
window.gameConfig = {
    GRID_WIDTH: 8,
    GRID_HEIGHT: 6,
    CELL_SIZE: 50,
    PLAYER_AREA_HEIGHT: 3, // 3 ряда для игрока
    ENEMY_AREA_HEIGHT: 3,  // 3 ряда для врага
    
    // Стартовые ресурсы
    STARTING_COINS: 10,
    
    // Типы юнитов
    UNIT_TYPES: {
        ARCHER: {
            name: 'Лучник',
            size: { width: 1, height: 1 },
            cost: 2,
            hp: 30,
            damage: 8,
            attackSpeed: 0.5, // секунды между атаками
            range: 3,
            color: 0x4A90E2 // синий
        },
        WARRIOR: {
            name: 'Мечник',
            size: { width: 1, height: 2 },
            cost: 3,
            hp: 50,
            damage: 12,
            attackSpeed: 1.0,
            range: 2,
            color: 0xE24A4A // красный
        },
        MAGE: {
            name: 'Маг',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 40,
            damage: 20,
            attackSpeed: 2.0,
            range: 4,
            color: 0x9B4AE2 // фиолетовый
        }
    }
};

console.log('Игра загружена!');
