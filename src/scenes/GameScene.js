// Основная игровая сцена
import { GridSystem } from '../systems/GridSystem.js';
import { Unit } from '../entities/Unit.js';
import { Archer } from '../entities/Archer.js';
import { Warrior } from '../entities/Warrior.js';
import { Mage } from '../entities/Mage.js';
import { BattleSystem } from '../systems/BattleSystem.js';
import { EconomySystem } from '../systems/EconomySystem.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        this.gridSystem = null;
        this.battleSystem = null;
        this.economySystem = null;
        this.playerUnits = [];
        this.enemyUnits = [];
        this.isBattleActive = false;
        this.shopUI = null;
    }

    create() {
        // Инициализация систем
        this.gridSystem = new GridSystem(this);
        this.battleSystem = new BattleSystem(this);
        this.economySystem = new EconomySystem(this);
        
        // Создание игрового поля
        this.createGameField();
        
        // Создание UI
        this.createUI();
        
        // Создание магазина
        this.createShop();
        
        console.log('Игровая сцена создана');
    }

    createGameField() {
        const { GRID_WIDTH, GRID_HEIGHT, CELL_SIZE } = window.gameConfig;
        
        // Создание сетки
        this.gridSystem.createGrid(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE);
        
        // Разделительная линия между игроком и врагом
        const centerY = (GRID_HEIGHT * CELL_SIZE) / 2;
        this.add.line(0, centerY, 0, 0, GRID_WIDTH * CELL_SIZE, 0, 0x666666)
            .setLineWidth(2);
    }

    createUI() {
        const { GRID_WIDTH, GRID_HEIGHT, CELL_SIZE } = window.gameConfig;
        
        // Кнопка Fight
        this.fightButton = this.add.rectangle(400, 50, 120, 40, 0xE24A4A)
            .setInteractive()
            .on('pointerdown', () => {
                this.startBattle();
            });

        this.add.text(400, 50, 'FIGHT', {
            fontSize: '16px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Счетчик монет
        this.coinsText = this.add.text(80, 50, `Монеты: ${this.economySystem.getCoins()}`, {
            fontSize: '16px',
            fill: '#FFD700',
            fontStyle: 'bold'
        });

        // Эффекты кнопки Fight
        this.fightButton.on('pointerover', () => {
            this.fightButton.setFillStyle(0xF25A5A);
        });

        this.fightButton.on('pointerout', () => {
            this.fightButton.setFillStyle(0xE24A4A);
        });
    }

    createShop() {
        const { UNIT_TYPES } = window.gameConfig;
        const shopY = 600;
        
        // Заголовок магазина
        this.add.text(240, shopY - 30, 'МАГАЗИН', {
            fontSize: '18px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Карточки юнитов
        const unitTypes = Object.keys(UNIT_TYPES);
        unitTypes.forEach((type, index) => {
            const unitData = UNIT_TYPES[type];
            const x = 80 + (index * 100);
            
            // Карточка юнита
            const card = this.add.rectangle(x, shopY, 80, 100, unitData.color)
                .setInteractive()
                .on('pointerdown', () => {
                    this.selectUnit(type);
                });

            // Иконка юнита (простой квадрат/круг)
            if (type === 'ARCHER') {
                this.add.circle(x, shopY - 20, 15, unitData.color);
            } else if (type === 'WARRIOR') {
                this.add.rectangle(x, shopY - 20, 20, 30, unitData.color);
            } else if (type === 'MAGE') {
                this.add.rectangle(x, shopY - 20, 25, 25, unitData.color);
            }

            // Название и стоимость
            this.add.text(x, shopY + 20, unitData.name, {
                fontSize: '12px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            this.add.text(x, shopY + 35, `${unitData.cost} монет`, {
                fontSize: '10px',
                fill: '#FFD700'
            }).setOrigin(0.5);

            // Эффект при наведении
            card.on('pointerover', () => {
                card.setFillStyle(unitData.color + 0x333333);
            });

            card.on('pointerout', () => {
                card.setFillStyle(unitData.color);
            });
        });
    }

    selectUnit(unitType) {
        if (this.isBattleActive) return;
        
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        
        if (this.economySystem.canAfford(unitData.cost)) {
            // Создаем временный юнит для размещения
            this.selectedUnitType = unitType;
            this.selectedUnitData = unitData;
            
            // Включаем режим размещения
            this.input.on('pointerdown', this.onGridClick, this);
            
            console.log(`Выбран ${unitData.name} за ${unitData.cost} монет`);
        } else {
            console.log('Недостаточно монет!');
        }
    }

    onGridClick(pointer) {
        if (!this.selectedUnitType) return;
        
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        
        if (this.gridSystem.canPlaceUnit(gridPos.x, gridPos.y, this.selectedUnitData.size)) {
            // Размещаем юнит
            this.placeUnit(this.selectedUnitType, gridPos.x, gridPos.y);
            
            // Снимаем с баланса
            this.economySystem.spendCoins(this.selectedUnitData.cost);
            this.updateCoinsDisplay();
            
            // Отключаем режим размещения
            this.selectedUnitType = null;
            this.selectedUnitData = null;
            this.input.off('pointerdown', this.onGridClick, this);
        }
    }

    placeUnit(unitType, gridX, gridY) {
        let unit;
        
        switch (unitType) {
            case 'ARCHER':
                unit = new Archer(this, gridX, gridY);
                break;
            case 'WARRIOR':
                unit = new Warrior(this, gridX, gridY);
                break;
            case 'MAGE':
                unit = new Mage(this, gridX, gridY);
                break;
        }
        
        if (unit) {
            this.playerUnits.push(unit);
            this.gridSystem.placeUnit(gridX, gridY, unit);
            console.log(`Размещен ${unitType} в позиции (${gridX}, ${gridY})`);
        }
    }

    startBattle() {
        if (this.isBattleActive) return;
        
        this.isBattleActive = true;
        this.fightButton.setFillStyle(0x666666);
        this.fightButton.disableInteractive();
        
        // Спавним вражеских юнитов
        this.spawnEnemies();
        
        // Запускаем боевую систему
        this.battleSystem.startBattle(this.playerUnits, this.enemyUnits);
        
        console.log('Бой начался!');
    }

    spawnEnemies() {
        // Простой спавн врагов - случайные юниты в верхней части поля
        const { GRID_WIDTH, ENEMY_AREA_HEIGHT } = window.gameConfig;
        
        for (let i = 0; i < 3; i++) {
            const x = Phaser.Math.Between(0, GRID_WIDTH - 1);
            const y = Phaser.Math.Between(0, ENEMY_AREA_HEIGHT - 1);
            
            // Создаем вражеского лучника (пока только один тип)
            const enemy = new Archer(this, x, y, true); // true = враг
            this.enemyUnits.push(enemy);
            this.gridSystem.placeUnit(x, y, enemy);
        }
    }

    updateCoinsDisplay() {
        this.coinsText.setText(`Монеты: ${this.economySystem.getCoins()}`);
    }

    endBattle(victory) {
        this.isBattleActive = false;
        this.fightButton.setFillStyle(0xE24A4A);
        this.fightButton.setInteractive();
        
        if (victory) {
            const reward = Phaser.Math.Between(5, 8);
            this.economySystem.addCoins(reward);
            this.updateCoinsDisplay();
            console.log(`Победа! Получено ${reward} монет`);
        } else {
            console.log('Поражение!');
        }
        
        // Очищаем поле от мертвых юнитов
        this.cleanupDeadUnits();
    }

    cleanupDeadUnits() {
        // Удаляем мертвых юнитов
        this.playerUnits = this.playerUnits.filter(unit => unit.isAlive());
        this.enemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        
        // Очищаем сетку
        this.gridSystem.clearDeadUnits();
    }
}
