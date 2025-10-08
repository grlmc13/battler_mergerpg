// БАТТЛЕР РПГ - Прототип (ИСПРАВЛЕННАЯ ВЕРСИЯ)
// Все в одном файле для быстрого запуска

// Глобальные настройки игры
window.gameConfig = {
    GRID_WIDTH: 8,
    GRID_HEIGHT: 8, // Увеличено с 6 до 8 (добавлено 2 ряда)
    CELL_SIZE: 50,
    PLAYER_AREA_HEIGHT: 4, // Увеличено с 3 до 4
    ENEMY_AREA_HEIGHT: 4, // Увеличено с 3 до 4
    STARTING_COINS: 10,
    
    UNIT_TYPES: {
        ARCHER: {
            name: 'Лучник',
            size: { width: 1, height: 1 },
            cost: 2,
            hp: 30,
            damage: 8,
            attackSpeed: 0.5,
            range: 10, // Увеличен радиус для всего поля
            color: 0x4A90E2
        },
        WARRIOR: {
            name: 'Мечник',
            size: { width: 1, height: 2 },
            cost: 3,
            hp: 50,
            damage: 12,
            attackSpeed: 1.0,
            range: 10, // Увеличен радиус для всего поля
            color: 0xE24A4A
        },
        BARBARIAN: {
            name: 'Варвар',
            size: { width: 2, height: 1 },
            cost: 4,
            hp: 60,
            damage: 15,
            attackSpeed: 1.5,
            range: 10, // Увеличен радиус для всего поля
            color: 0xFF8C00
        },
        MAGE: {
            name: 'Маг',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 40,
            damage: 20,
            attackSpeed: 2.0,
            range: 10, // Увеличен радиус для всего поля
            color: 0x9B4AE2
        }
    }
};

// Система управления сеткой
class GridSystem {
    constructor(scene) {
        this.scene = scene;
        this.grid = [];
        this.cellSize = 0;
        this.gridWidth = 0;
        this.gridHeight = 0;
        this.gridOffsetX = 0;
        this.gridOffsetY = 0;
    }

    createGrid(width, height, cellSize) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.cellSize = cellSize;
        
        // Исправляем вычисление смещения
        this.gridOffsetX = 40; // фиксированное смещение слева
        this.gridOffsetY = 150; // фиксированное смещение сверху
        
        this.grid = [];
        for (let y = 0; y < height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = null;
            }
        }
        
        this.createVisualGrid();
    }

    createVisualGrid() {
        const graphics = this.scene.add.graphics();
        
        // Область врага (верхняя половина) - темнее
        graphics.fillStyle(0xE24A4A, 0.1);
        graphics.fillRect(this.gridOffsetX, this.gridOffsetY, this.gridWidth * this.cellSize, (this.gridHeight / 2) * this.cellSize);
        
        // Область игрока (нижняя половина) - светлее
        const playerAreaY = this.gridOffsetY + (this.gridHeight / 2 * this.cellSize);
        graphics.fillStyle(0x4A90E2, 0.1);
        graphics.fillRect(this.gridOffsetX, playerAreaY, this.gridWidth * this.cellSize, (this.gridHeight / 2) * this.cellSize);
        
        // Очень тонкие линии сетки
        graphics.lineStyle(1, 0x888888, 0.2);
        
        // Вертикальные линии
        for (let x = 1; x < this.gridWidth; x++) {
            const startX = this.gridOffsetX + (x * this.cellSize);
            const startY = this.gridOffsetY;
            const endY = this.gridOffsetY + (this.gridHeight * this.cellSize);
            graphics.lineBetween(startX, startY, startX, endY);
        }
        
        // Горизонтальные линии
        for (let y = 1; y < this.gridHeight; y++) {
            const startY = this.gridOffsetY + (y * this.cellSize);
            const startX = this.gridOffsetX;
            const endX = this.gridOffsetX + (this.gridWidth * this.cellSize);
            graphics.lineBetween(startX, startY, endX, startY);
        }
    }

    getGridPosition(worldX, worldY) {
        const gridX = Math.floor((worldX - this.gridOffsetX) / this.cellSize);
        const gridY = Math.floor((worldY - this.gridOffsetY) / this.cellSize);
        
        return {
            x: Math.max(0, Math.min(gridX, this.gridWidth - 1)),
            y: Math.max(0, Math.min(gridY, this.gridHeight - 1))
        };
    }

    getWorldPosition(gridX, gridY) {
        return {
            x: this.gridOffsetX + (gridX * this.cellSize) + (this.cellSize / 2),
            y: this.gridOffsetY + (gridY * this.cellSize) + (this.cellSize / 2)
        };
    }
    
    getWorldPositionForUnit(gridX, gridY, size) {
        // Возвращаем позицию центра юнита с учетом его размера
        const centerX = this.gridOffsetX + (gridX * this.cellSize) + (size.width * this.cellSize / 2);
        const centerY = this.gridOffsetY + (gridY * this.cellSize) + (size.height * this.cellSize / 2);
        
        return {
            x: centerX,
            y: centerY
        };
    }

    canPlaceUnit(gridX, gridY, size) {
        // Проверяем границы
        if (gridX < 0 || gridY < 0 || 
            gridX + size.width > this.gridWidth || 
            gridY + size.height > this.gridHeight) {
            return false;
        }
        
        // Проверяем, что клетки свободны
        for (let y = gridY; y < gridY + size.height; y++) {
            for (let x = gridX; x < gridX + size.width; x++) {
                if (this.grid[y][x] !== null) {
                    return false;
                }
            }
        }
        
        // Проверяем, что юнит размещается в области игрока (нижняя половина)
        const playerAreaStart = this.gridHeight / 2;
        if (gridY < playerAreaStart) {
            return false;
        }
        
        return true;
    }

    canPlaceEnemyUnit(gridX, gridY, size) {
        // Проверяем границы
        if (gridX < 0 || gridY < 0 || 
            gridX + size.width > this.gridWidth || 
            gridY + size.height > this.gridHeight) {
            return false;
        }
        
        // Проверяем, что клетки свободны
        for (let y = gridY; y < gridY + size.height; y++) {
            for (let x = gridX; x < gridX + size.width; x++) {
                if (this.grid[y][x] !== null) {
                    return false;
                }
            }
        }
        
        // Проверяем, что юнит размещается в области врага (верхняя половина)
        const enemyAreaEnd = this.gridHeight / 2;
        if (gridY + size.height > enemyAreaEnd) {
            return false;
        }
        
        return true;
    }

    placeUnit(gridX, gridY, unit) {
        const size = unit.getSize();
        
        console.log(`Размещаем юнит ${unit.constructor.name} в позиции (${gridX}, ${gridY}) размером ${size.width}x${size.height}`);
        
        for (let y = gridY; y < gridY + size.height; y++) {
            for (let x = gridX; x < gridX + size.width; x++) {
                this.grid[y][x] = unit;
                console.log(`Занимаем клетку (${x}, ${y})`);
            }
        }
        
        // Используем правильный метод для позиционирования
        const startX = this.gridOffsetX + (gridX * this.cellSize);
        const startY = this.gridOffsetY + (gridY * this.cellSize);
        const centerX = startX + (size.width * this.cellSize / 2);
        const centerY = startY + (size.height * this.cellSize / 2);
        
        unit.setPosition(centerX, centerY);
        console.log(`Установлена позиция юнита: (${centerX}, ${centerY})`);
    }

    removeUnit(unit) {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.grid[y][x] === unit) {
                    this.grid[y][x] = null;
                }
            }
        }
    }

    clearDeadUnits() {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.grid[y][x] && !this.grid[y][x].isAlive()) {
                    this.grid[y][x] = null;
                }
            }
        }
    }
}

// Базовый класс юнита
class Unit {
    constructor(scene, gridX, gridY, isEnemy = false, size = { width: 1, height: 1 }, color = 0xFFFFFF) {
        this.scene = scene;
        this.gridX = gridX;
        this.gridY = gridY;
        this.isEnemy = isEnemy;
        this.isDead = false;
        
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 10;
        this.attackSpeed = 1.0;
        this.range = 2;
        this.size = size;
        this.color = color;
        
        this.sprite = null;
        this.hpBar = null;
        this.lastAttackTime = 0;
        
        this.createVisuals();
    }

    createVisuals() {
        // Вычисляем позицию левого верхнего угла юнита на сетке
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        
        // Вычисляем размер спрайта точно по размеру клеток
        const spriteWidth = this.size.width * this.scene.gridSystem.cellSize;
        const spriteHeight = this.size.height * this.scene.gridSystem.cellSize;
        
        // Центрируем спрайт в области, которую занимает юнит
        const centerX = startX + (spriteWidth / 2);
        const centerY = startY + (spriteHeight / 2);
        
        console.log(`Создаем юнит ${this.constructor.name}: размер ${this.size.width}x${this.size.height}, спрайт ${spriteWidth}x${spriteHeight}, позиция (${centerX}, ${centerY})`);
        
        this.sprite = this.scene.add.rectangle(
            centerX, 
            centerY, 
            spriteWidth,
            spriteHeight,
            this.color
        );
        
        // Добавляем рамку
        this.scene.add.rectangle(
            centerX, 
            centerY, 
            spriteWidth,
            spriteHeight,
            0x000000,
            0
        ).setStrokeStyle(2, 0x333333);
        
        this.createHpBar(centerX, centerY);
        
        if (this.isEnemy) {
            this.sprite.setFillStyle(0x666666);
        }
    }

    createHpBar(x, y) {
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const barHeight = 4;
        const barY = y - (this.size.height * this.scene.gridSystem.cellSize * 0.4);
        
        this.hpBarBg = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x333333);
        this.hpBar = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x00FF00);
        
        this.updateHpBar();
    }

    updateHpBar() {
        if (!this.hpBar) return;
        
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const hpPercent = this.hp / this.maxHp;
        const currentWidth = barWidth * hpPercent;
        
        this.hpBar.setSize(currentWidth, 4);
        
        if (hpPercent > 0.6) {
            this.hpBar.setFillStyle(0x00FF00);
        } else if (hpPercent > 0.3) {
            this.hpBar.setFillStyle(0xFFFF00);
        } else {
            this.hpBar.setFillStyle(0xFF0000);
        }
    }

    setPosition(x, y) {
        if (this.sprite) {
            this.sprite.setPosition(x, y);
            if (this.hpBar) {
                this.hpBar.setPosition(x, y - (this.size.height * this.scene.gridSystem.cellSize * 0.4));
            }
            if (this.hpBarBg) {
                this.hpBarBg.setPosition(x, y - (this.size.height * this.scene.gridSystem.cellSize * 0.4));
            }
        }
    }

    getSize() {
        return this.size;
    }

    getPosition() {
        return { x: this.gridX, y: this.gridY };
    }

    canAttack() {
        const currentTime = this.scene.time.now;
        return (currentTime - this.lastAttackTime) >= (this.attackSpeed * 1000);
    }

    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        target.takeDamage(this.damage);
        this.createAttackEffect(target);
        
        return true;
    }

    createAttackEffect(target) {
        const startPos = this.sprite;
        const endPos = target.sprite;
        
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xFFD700, 0.8);
        graphics.lineBetween(startPos.x, startPos.y, endPos.x, endPos.y);
        
        this.scene.time.delayedCall(200, () => {
            graphics.destroy();
        });
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
        this.updateHpBar();
        
        if (this.hp <= 0) {
            this.die();
        }
        
        this.createDamageEffect();
    }

    createDamageEffect() {
        // Эффект повреждения - меняем цвет на красный и обратно
        const originalColor = this.sprite.fillColor;
        this.sprite.setFillStyle(0xFF0000);
        this.scene.time.delayedCall(100, () => {
            this.sprite.setFillStyle(originalColor);
        });
    }

    die() {
        this.isDead = true;
        
        // Даем монеты за убийство врага
        if (this.isEnemy) {
            const killReward = Phaser.Math.Between(1, 3);
            this.scene.economySystem.addCoins(killReward);
            this.scene.updateCoinsDisplay();
            console.log(`Убит враг! Получено ${killReward} монет`);
        }
        
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            duration: 300,
            onComplete: () => {
                this.destroy();
            }
        });
        
        if (this.hpBar) this.hpBar.destroy();
        if (this.hpBarBg) this.hpBarBg.destroy();
    }

    destroy() {
        if (this.sprite) this.sprite.destroy();
        if (this.hpBar) this.hpBar.destroy();
        if (this.hpBarBg) this.hpBarBg.destroy();
    }

    isAlive() {
        return !this.isDead && this.hp > 0;
    }
}

// Лучник
class Archer extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x4A90E2);
        
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 8;
        this.attackSpeed = 0.5;
        this.range = 10; // Увеличен радиус
        
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
            }
        }
    }
}

// Мечник
class Warrior extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 2 }, 0xE24A4A);
        
        this.maxHp = 50;
        this.hp = this.maxHp;
        this.damage = 12;
        this.attackSpeed = 1.0;
        this.range = 10; // Увеличен радиус
        
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
            }
        }
    }
}

// Варвар
class Barbarian extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 1 }, 0xFF8C00);
        
        this.maxHp = 60;
        this.hp = this.maxHp;
        this.damage = 15;
        this.attackSpeed = 1.5;
        this.range = 10; // Увеличен радиус
        
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
            }
        }
    }
}

// Маг
class Mage extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x9B4AE2);
        
        this.maxHp = 40;
        this.hp = this.maxHp;
        this.damage = 20;
        this.attackSpeed = 2.0;
        this.range = 10; // Увеличен радиус
        
        this.updateVisuals();
    }

    updateVisuals() {
        if (this.sprite) {
            this.sprite.setFillStyle(this.color);
            
            if (this.isEnemy) {
                this.sprite.setFillStyle(0x666666);
            }
        }
    }
}

// Боевая система
class BattleSystem {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.battleTimer = null;
        this.checkInterval = 100;
    }

    startBattle(playerUnits, enemyUnits) {
        console.log('BattleSystem.startBattle вызван');
        console.log('Юниты игрока:', playerUnits.length);
        console.log('Юниты врага:', enemyUnits.length);
        
        this.isActive = true;
        this.playerUnits = playerUnits;
        this.enemyUnits = enemyUnits;
        
        this.battleTimer = this.scene.time.addEvent({
            delay: this.checkInterval,
            callback: this.updateBattle,
            callbackScope: this,
            loop: true
        });
        
        console.log('Таймер боя создан, интервал:', this.checkInterval);
    }

    updateBattle() {
        if (!this.isActive) return;
        
        const alivePlayerUnits = this.playerUnits.filter(unit => unit.isAlive());
        const aliveEnemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        
        if (alivePlayerUnits.length === 0) {
            console.log('Поражение! Враги победили.');
            this.endBattle(false);
            return;
        }
        
        if (aliveEnemyUnits.length === 0) {
            console.log('Победа! Все враги повержены!');
            this.endBattle(true);
            return;
        }
        
        this.processAttacks(alivePlayerUnits, aliveEnemyUnits);
        this.processAttacks(aliveEnemyUnits, alivePlayerUnits);
    }

    processAttacks(attackingUnits, targetUnits) {
        attackingUnits.forEach(unit => {
            if (unit.canAttack()) {
                const target = this.findNearestTarget(unit, targetUnits);
                if (target) {
                    unit.attack(target);
                }
            }
        });
    }

    findNearestTarget(unit, possibleTargets) {
        if (possibleTargets.length === 0) return null;
        
        const unitPos = unit.getPosition();
        let nearestTarget = null;
        let nearestDistance = Infinity;
        
        possibleTargets.forEach(target => {
            if (!target.isAlive()) return;
            
            const targetPos = target.getPosition();
            const distance = Math.sqrt(
                Math.pow(unitPos.x - targetPos.x, 2) + Math.pow(unitPos.y - targetPos.y, 2)
            );
            
            if (distance <= unit.range && distance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = distance;
            }
        });
        
        return nearestTarget;
    }

    endBattle(victory) {
        this.isActive = false;
        
        if (this.battleTimer) {
            this.battleTimer.destroy();
            this.battleTimer = null;
        }
        
        if (this.scene && this.scene.endBattle) {
            this.scene.endBattle(victory);
        }
    }
}

// Система экономики
class EconomySystem {
    constructor(scene) {
        this.scene = scene;
        this.coins = window.gameConfig.STARTING_COINS;
    }

    getCoins() {
        return this.coins;
    }

    addCoins(amount) {
        this.coins += amount;
    }

    spendCoins(amount) {
        if (this.canAfford(amount)) {
            this.coins -= amount;
            return true;
        }
        return false;
    }

    canAfford(amount) {
        return this.coins >= amount;
    }
}

// Основная игровая сцена
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        this.gridSystem = null;
        this.battleSystem = null;
        this.economySystem = null;
        this.playerUnits = [];
        this.enemyUnits = [];
        this.isBattleActive = false;
        this.isPlacing = false;
        this.selectedUnitType = null;
        this.selectedUnitData = null;
        this.hintText = null;
        this.shopUnits = []; // Случайные юниты в магазине
        this.shopCards = []; // Карточки магазина
    }

    create() {
        this.gridSystem = new GridSystem(this);
        this.battleSystem = new BattleSystem(this);
        this.economySystem = new EconomySystem(this);
        
        this.createGameField();
        this.createUI();
        this.createShop();
        
        console.log('Игровая сцена создана');
    }

    createGameField() {
        const { GRID_WIDTH, GRID_HEIGHT, CELL_SIZE } = window.gameConfig;
        this.gridSystem.createGrid(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE);
    }

    createUI() {
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

        this.coinsText = this.add.text(80, 50, `Монеты: ${this.economySystem.getCoins()}`, {
            fontSize: '16px',
            fill: '#FFD700',
            fontStyle: 'bold'
        });

        this.fightButton.on('pointerover', () => {
            this.fightButton.setFillStyle(0xF25A5A);
        });

        this.fightButton.on('pointerout', () => {
            this.fightButton.setFillStyle(0xE24A4A);
        });
    }

    createShop() {
        const shopY = 700; // Сдвинуто с 600 до 700
        
        // Генерируем 3 случайных юнита
        this.generateShopUnits();
        this.createShopCards(shopY);
        
        // Кнопка реролла
        this.createRerollButton(shopY);
    }

    generateShopUnits() {
        const { UNIT_TYPES } = window.gameConfig;
        const unitTypes = Object.keys(UNIT_TYPES);
        
        this.shopUnits = [];
        for (let i = 0; i < 3; i++) {
            const randomType = Phaser.Utils.Array.GetRandom(unitTypes);
            this.shopUnits.push(randomType);
        }
        
        console.log('Сгенерированы юниты в магазине:', this.shopUnits);
    }

    createShopCards(shopY) {
        const { UNIT_TYPES } = window.gameConfig;
        
        // Очищаем старые карточки
        this.shopCards.forEach(card => card.destroy());
        this.shopCards = [];
        
        this.shopUnits.forEach((type, index) => {
            const unitData = UNIT_TYPES[type];
            const x = 80 + (index * 100);
            
            const card = this.add.rectangle(x, shopY, 80, 100, unitData.color)
                .setInteractive()
                .on('pointerdown', () => {
                    this.selectUnit(type);
                });

            // Иконки юнитов
            if (type === 'ARCHER') {
                this.add.circle(x, shopY - 20, 15, 0x8B4513);
            } else if (type === 'WARRIOR') {
                this.add.rectangle(x, shopY - 20, 3, 12, 0x8B4513);
            } else if (type === 'BARBARIAN') {
                this.add.rectangle(x, shopY - 20, 15, 8, 0x8B4513);
            } else if (type === 'MAGE') {
                this.add.star(x, shopY - 20, 5, 8, 4, 0xFFD700);
            }

            this.add.text(x, shopY + 20, unitData.name, {
                fontSize: '12px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            this.add.text(x, shopY + 35, `${unitData.cost} монет`, {
                fontSize: '10px',
                fill: '#FFD700'
            }).setOrigin(0.5);
            
            this.shopCards.push(card);
        });
    }

    createRerollButton(shopY) {
        const rerollButton = this.add.rectangle(400, shopY, 60, 40, 0x666666)
            .setInteractive()
            .on('pointerdown', () => {
                this.rerollShop();
            });
            
        this.add.text(400, shopY, 'REROLL\n1 монета', {
            fontSize: '10px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        
        this.rerollButton = rerollButton;
    }

    rerollShop() {
        if (this.economySystem.canAfford(1)) {
            this.economySystem.spendCoins(1);
            this.updateCoinsDisplay();
            this.generateShopUnits();
            this.createShopCards(700); // Обновлено с 600 до 700
            console.log('Магазин обновлен за 1 монету');
        } else {
            console.log('Недостаточно монет для реролла!');
        }
    }

    selectUnit(unitType) {
        if (this.isBattleActive) {
            console.log('Бой активен, нельзя покупать юнитов');
            return;
        }
        
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        console.log('Выбран юнит:', unitData.name, 'Цена:', unitData.cost, 'Монет:', this.economySystem.getCoins());
        
        if (this.economySystem.canAfford(unitData.cost)) {
            this.selectedUnitType = unitType;
            this.selectedUnitData = unitData;
            
            // Показываем подсказку
            if (this.hintText) {
                this.hintText.destroy();
            }
            this.hintText = this.add.text(240, 120, 'Кликните на НИЖНЮЮ половину поля', {
                fontSize: '14px',
                fill: '#FFD700',
                fontStyle: 'bold',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }).setOrigin(0.5);
            
            console.log('Режим размещения активирован');
            
            // Используем событие вместо update
            this.input.once('pointerdown', this.handlePlacement, this);
        } else {
            console.log('Недостаточно монет!');
        }
    }

    handlePlacement(pointer) {
        if (!this.selectedUnitType) {
            console.log('Нет выбранного юнита');
            return;
        }
        
        // Проверяем, что клик НЕ по магазину (магазин теперь внизу, y > 650)
        if (pointer.y > 650) {
            console.log('Клик по магазину - игнорируем');
            // Возвращаем обработчик клика
            this.input.once('pointerdown', this.handlePlacement, this);
            return;
        }
        
        // Удаляем подсказку
        if (this.hintText) {
            this.hintText.destroy();
            this.hintText = null;
        }
        
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        console.log('Клик по позиции:', pointer.x, pointer.y, '-> сетка:', gridPos);
        
        if (this.gridSystem.canPlaceUnit(gridPos.x, gridPos.y, this.selectedUnitData.size)) {
            console.log('Размещаем юнит в позиции:', gridPos);
            this.placeUnit(this.selectedUnitType, gridPos.x, gridPos.y);
            this.economySystem.spendCoins(this.selectedUnitData.cost);
            this.updateCoinsDisplay();
            
            this.selectedUnitType = null;
            this.selectedUnitData = null;
        } else {
            console.log('Нельзя разместить в этой позиции. Попробуйте еще раз.');
            // Если не получилось разместить - даем еще одну попытку
            this.input.once('pointerdown', this.handlePlacement, this);
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
            case 'BARBARIAN':
                unit = new Barbarian(this, gridX, gridY);
                break;
            case 'MAGE':
                unit = new Mage(this, gridX, gridY);
                break;
        }
        
        if (unit) {
            this.playerUnits.push(unit);
            this.gridSystem.placeUnit(gridX, gridY, unit);
        }
    }

    startBattle() {
        console.log('=== НАЧАЛО БОЯ ===');
        console.log('Бой уже активен?', this.isBattleActive);
        console.log('Юнитов игрока:', this.playerUnits.length);
        
        if (this.isBattleActive) {
            console.log('Бой уже идет!');
            return;
        }
        
        if (this.playerUnits.length === 0) {
            console.log('Нет юнитов для боя!');
            return;
        }
        
        this.isBattleActive = true;
        this.fightButton.setFillStyle(0x666666);
        this.fightButton.disableInteractive();
        
        console.log('Спавним врагов...');
        this.spawnEnemies();
        
        console.log('Запускаем боевую систему...');
        console.log('Юнитов игрока:', this.playerUnits.length);
        console.log('Юнитов врага:', this.enemyUnits.length);
        
        this.battleSystem.startBattle(this.playerUnits, this.enemyUnits);
        
        console.log('Бой начат!');
    }

    spawnEnemies() {
        const { GRID_WIDTH, ENEMY_AREA_HEIGHT, UNIT_TYPES, STARTING_COINS } = window.gameConfig;
        
        // Враг получает такой же бюджет, как у игрока в начале раунда
        let enemyBudget = STARTING_COINS;
        
        console.log('=== СПАВН ВРАГОВ ===');
        console.log('Бюджет врага:', enemyBudget, 'монет (как у игрока в начале)');
        
        // Типы юнитов, которые враг может купить (от дешевых к дорогим)
        const unitTypes = [
            { type: 'ARCHER', data: UNIT_TYPES.ARCHER },
            { type: 'WARRIOR', data: UNIT_TYPES.WARRIOR },
            { type: 'BARBARIAN', data: UNIT_TYPES.BARBARIAN },
            { type: 'MAGE', data: UNIT_TYPES.MAGE }
        ];
        
        // Враг покупает юнитов, пока есть деньги
        while (enemyBudget > 0) {
            // Выбираем случайный тип юнита, который враг может купить
            const affordable = unitTypes.filter(u => u.data.cost <= enemyBudget);
            
            if (affordable.length === 0) {
                console.log('Врагу не хватает денег на юнитов. Остаток:', enemyBudget);
                break;
            }
            
            // Случайно выбираем юнита
            const selected = Phaser.Utils.Array.GetRandom(affordable);
            
            // Ищем свободное место
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 50) {
                const x = Phaser.Math.Between(0, GRID_WIDTH - selected.data.size.width);
                const y = Phaser.Math.Between(0, ENEMY_AREA_HEIGHT - selected.data.size.height);
                
                if (this.gridSystem.canPlaceEnemyUnit(x, y, selected.data.size)) {
                    // Создаем врага
                    let enemy;
                    switch (selected.type) {
                        case 'ARCHER':
                            enemy = new Archer(this, x, y, true);
                            break;
                        case 'WARRIOR':
                            enemy = new Warrior(this, x, y, true);
                            break;
                        case 'BARBARIAN':
                            enemy = new Barbarian(this, x, y, true);
                            break;
                        case 'MAGE':
                            enemy = new Mage(this, x, y, true);
                            break;
                    }
                    
                    if (enemy) {
                        this.enemyUnits.push(enemy);
                        this.gridSystem.placeUnit(x, y, enemy);
                        enemyBudget -= selected.data.cost;
                        placed = true;
                        
                        console.log(`Враг купил ${selected.data.name} за ${selected.data.cost} монет. Остаток: ${enemyBudget}`);
                    }
                }
                
                attempts++;
            }
            
            if (!placed) {
                console.log('Не удалось найти место для юнита. Прекращаем спавн.');
                break;
            }
        }
        
        console.log('Врагов создано:', this.enemyUnits.length);
    }

    updateCoinsDisplay() {
        this.coinsText.setText(`Монеты: ${this.economySystem.getCoins()}`);
    }

    endBattle(victory) {
        this.isBattleActive = false;
        this.fightButton.setFillStyle(0xE24A4A);
        this.fightButton.setInteractive();
        
        // Даем монеты в зависимости от результата
        if (victory) {
            const reward = Phaser.Math.Between(8, 12); // Больше за победу
            this.economySystem.addCoins(reward);
            console.log(`Победа! Получено ${reward} монет`);
        } else {
            const reward = Phaser.Math.Between(3, 5); // Меньше за поражение
            this.economySystem.addCoins(reward);
            console.log(`Поражение! Получено ${reward} монет`);
        }
        
        this.updateCoinsDisplay();
        this.cleanupDeadUnits();
    }

    cleanupDeadUnits() {
        this.playerUnits = this.playerUnits.filter(unit => unit.isAlive());
        this.enemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        this.gridSystem.clearDeadUnits();
    }
}

// Стартовое меню
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.text(240, 200, 'БАТТЛЕР РПГ', {
            fontSize: '32px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(240, 250, 'Прототип', {
            fontSize: '18px',
            fill: '#cccccc'
        }).setOrigin(0.5);

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

        this.add.text(240, 500, 'Размещайте юнитов на поле\nи сражайтесь с врагами!', {
            fontSize: '14px',
            fill: '#aaaaaa',
            align: 'center'
        }).setOrigin(0.5);

        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x5BA0F2);
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x4A90E2);
        });
    }
}

// Конфигурация Phaser
const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 900, // Увеличено с 800 до 900
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

// Скрываем надпись загрузки после запуска игры
setTimeout(() => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}, 1000);

console.log('Игра загружена!');