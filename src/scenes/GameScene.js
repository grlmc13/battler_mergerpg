// Основная игровая сцена
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        // Игровые системы
        this.gridSystem = null;
        this.battleSystem = null;
        this.economySystem = null;
        
        // Игровые объекты
        this.playerUnits = [];
        this.enemyUnits = [];
        this.shopCards = [];
        
        // UI элементы
        this.shopPanel = null;
        this.fightButton = null;
        this.coinText = null;
        
        // Состояние игры
        this.coins = 10;
        this.isDragging = false;
        this.selectedUnit = null;
    }

    preload() {
        // Загружаем спрайты юнитов
        this.load.image('tank', 'src/assets/sprites/units/tank.png');
        this.load.image('druid', 'src/assets/sprites/units/druid.png');
        this.load.image('healer', 'src/assets/sprites/units/Dark Elves Healer Priestess.png');
        this.load.image('witch', 'src/assets/sprites/units/witch.png');
        this.load.image('barbarian', 'src/assets/sprites/units/Dwarf Axe Warrior.png');
        this.load.image('archer', 'src/assets/sprites/units/Elf_Archer.png');
        this.load.image('warrior', 'src/assets/sprites/units/Elf_Knight_Sword.png');
        this.load.image('mage', 'src/assets/sprites/units/Dark Elves Crystal Mage.png');
        this.load.image('assassin', 'src/assets/sprites/units/assassin.png');
        
        // Загружаем UI элементы
        this.load.image('shopCard', 'src/assets/sprites/ui/shop_card.png');
        this.load.image('fightButton', 'src/assets/sprites/ui/fight_button.png');
    }

    create() {
        // Инициализируем системы
        this.gridSystem = new GridSystem(this);
        this.battleSystem = new BattleSystem(this);
        this.economySystem = new EconomySystem(this);
        
        // Создаем игровое поле
        this.gridSystem.createGrid();
        
        // Создаем UI
        this.createUI();
        
        // Создаем магазин
        this.createShop();
        
        console.log('GameScene создана успешно!');
    }

    createUI() {
        // Создаем панель магазина
        this.shopPanel = this.add.rectangle(240, 700, 480, 100, 0x2a2a2a, 0.9);
        
        // Создаем кнопку "Fight"
        this.fightButton = this.add.image(400, 700, 'fightButton')
            .setInteractive()
            .setScale(0.8);
            
        this.fightButton.on('pointerdown', () => {
            this.startBattle();
        });
        
        // Создаем счетчик монет
        this.coinText = this.add.text(50, 700, `Монеты: ${this.coins}`, {
            fontSize: '20px',
            fill: '#FFD700',
            fontFamily: 'Arial'
        });
    }

    createShop() {
        const unitTypes = ['ARCHER', 'WARRIOR', 'MAGE', 'TANK', 'DRUID', 'HEALER', 'WITCH', 'BARBARIAN', 'ASSASSIN'];
        const startX = 50;
        const cardSpacing = 50;
        
        unitTypes.forEach((unitType, index) => {
            const unitData = window.gameConfig.UNIT_TYPES[unitType];
            if (unitData) {
                const cardX = startX + (index * cardSpacing);
                const card = this.add.image(cardX, 700, 'shopCard')
                    .setInteractive()
                    .setScale(0.6);
                    
                // Добавляем спрайт юнита на карточку
                const unitSprite = this.add.image(cardX, 700, unitData.name.toLowerCase());
                unitSprite.setScale(0.3);
                
                // Добавляем текст стоимости
                this.add.text(cardX, 720, `${unitData.cost}`, {
                    fontSize: '16px',
                    fill: '#FFD700',
                    fontFamily: 'Arial'
                }).setOrigin(0.5);
                
                // Добавляем обработчик клика
                card.on('pointerdown', () => {
                    this.onShopCardClick(unitType, unitData);
                });
                
                this.shopCards.push({ card, unitType, unitData });
            }
        });
    }

    onShopCardClick(unitType, unitData) {
        if (this.coins >= unitData.cost) {
            console.log(`Покупка ${unitData.name} за ${unitData.cost} монет`);
            // Здесь будет логика покупки и размещения юнита
        } else {
            console.log('Недостаточно монет!');
        }
    }

    startBattle() {
        console.log('Начинаем бой!');
        this.battleSystem.startBattle();
    }

    update() {
        // Обновляем системы
        if (this.battleSystem) {
            this.battleSystem.update();
        }
    }
}