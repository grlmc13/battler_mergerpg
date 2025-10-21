// Основной файл игры для Phaser Editor
// Импортируем сцены
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';

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

// Глобальные настройки игры
window.gameConfig = {
    GRID_WIDTH: 8,
    GRID_HEIGHT: 6,
    CELL_SIZE: 50,
    PLAYER_AREA_HEIGHT: 3,
    ENEMY_AREA_HEIGHT: 3,
    
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
            attackSpeed: 0.5,
            range: 3,
            color: 0x4A90E2
        },
        WARRIOR: {
            name: 'Мечник',
            size: { width: 1, height: 2 },
            cost: 3,
            hp: 50,
            damage: 12,
            attackSpeed: 1.0,
            range: 2,
            color: 0xE24A4A
        },
        MAGE: {
            name: 'Маг',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 40,
            damage: 20,
            attackSpeed: 2.0,
            range: 4,
            color: 0x9B4AE2
        },
        TANK: {
            name: 'Танк',
            size: { width: 3, height: 2 },
            cost: 5,
            hp: 80,
            damage: 10,
            attackSpeed: 2.0,
            range: 10,
            hasShield: true,
            shieldReduction: 0.3,
            sellPrice: 5,
            sellPricePerStar: 5,
            color: 0xC0C0C0
        },
        DRUID: {
            name: 'Друид',
            size: { width: 2, height: 2 },
            occupiedCells: [
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ],
            cost: 4,
            hp: 45,
            damage: 6,
            attackSpeed: 1.8,
            range: 10,
            hasThorns: true,
            thornsDamage: 5,
            sellPrice: 4,
            sellPricePerStar: 4,
            color: 0x8B4513
        },
        HEALER: {
            name: 'Лекарь',
            size: { width: 1, height: 1 },
            cost: 3,
            hp: 25,
            damage: 3,
            attackSpeed: 2.0,
            range: 10,
            healRange: 2,
            healAmount: 8,
            sellPrice: 3,
            sellPricePerStar: 3,
            color: 0x32CD32
        },
        WITCH: {
            name: 'Ведьма',
            size: { width: 2, height: 2 },
            occupiedCells: [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 1, y: 1 }
            ],
            cost: 6,
            hp: 35,
            damage: 12,
            attackSpeed: 3.0,
            range: 10,
            hasCurse: true,
            curseDebuff: 0.5,
            sellPrice: 6,
            sellPricePerStar: 6,
            color: 0x4B0082
        },
        BARBARIAN: {
            name: 'Варвар',
            size: { width: 2, height: 1 },
            cost: 3,
            hp: 60,
            damage: 15,
            attackSpeed: 1.5,
            range: 10,
            hasTaunt: true,
            sellPrice: 3,
            sellPricePerStar: 3,
            color: 0xFF8C00
        },
        ASSASSIN: {
            name: 'Ассасин',
            size: { width: 1, height: 1 },
            cost: 3,
            hp: 20,
            damage: 20,
            attackSpeed: 1.2,
            range: 10,
            hasCritical: true,
            criticalChance: 0.5,
            sellPrice: 3,
            sellPricePerStar: 3,
            color: 0x8B008B
        }
    }
};

// Запуск игры
const game = new Phaser.Game(config);

console.log('Игра загружена через Phaser Editor!');
