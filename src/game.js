/**
 * БАТТЛЕР РПГ - ПРОТОТИП
 * 
 * Auto-battler игра с механикой Best of 5 раундов.
 * Создано на Phaser 3 для web-платформ с поддержкой мобильных устройств.
 * 
 * Основные механики:
 * - Размещение юнитов на сетке перед боем
 * - Автоматический бой с поиском ближайших целей
 * - Экономика на основе убийств врагов
 * - Формат Best of 5 (первым до 3 побед)
 * - Воскрешение и полное лечение между раундами
 * 
 * @version 1.0.0
 * @author Game Designer & Artist
 */

// ============================================================================
// ГЛОБАЛЬНАЯ КОНФИГУРАЦИЯ
// ============================================================================
/**
 * Главная конфигурация игры
 * Содержит настройки сетки, экономики и статистику юнитов
 */
window.gameConfig = {
    // Настройки игрового поля
    GRID_WIDTH: 8,              // Ширина сетки в клетках
    GRID_HEIGHT: 12,            // Высота сетки в клетках (6 игрок + 6 враг)
    CELL_SIZE: 80,              // Размер клетки в пикселях
    PLAYER_AREA_HEIGHT: 6,      // Количество рядов для игрока
    ENEMY_AREA_HEIGHT: 6,       // Количество рядов для врага
    VERSION: '1.2.2',           // Версия конфигурации для отладки
    
    // Экономика
    STARTING_COINS: 10,         // Стартовый капитал в раунде 1
    ROUND_COINS: 10,             // Монеты в каждом последующем раунде (2, 3, 4, 5...)
    
    // Типы юнитов и их характеристики
    UNIT_TYPES: {
        ARCHER: {
            name: 'Лучник',
            size: { width: 1, height: 1 },
            cost: 2,
            hp: 30,
            damage: 8,
            attackSpeed: 0.5,          // Очень быстрая атака
            range: 10,                 // Дальность атаки в клетках (покрывает все поле)
            sellPrice: 2,              // Базовая цена продажи
            sellPricePerStar: 2,       // Дополнительная цена за каждую звезду мерджа
            color: 0x4A90E2            // Синий цвет
        },
        WARRIOR: {
            name: 'Мечник',
            size: { width: 1, height: 2 },
            cost: 3,
            hp: 50,
            damage: 12,
            attackSpeed: 1.0,
            range: 10, // Увеличен радиус для всего поля
            hasBattleCry: true,        // СПОСОБНОСТЬ: Боевой клич (2+ мечника ускоряют союзников)
            battleCryBonus: 0.25,      // Бонус к скорости атаки (25% быстрее)
            sellPrice: 3,              // Базовая цена продажи
            sellPricePerStar: 3,       // Дополнительная цена за каждую звезду мерджа
            color: 0xE24A4A
        },
        BARBARIAN: {
            name: 'Варвар',
            size: { width: 2, height: 1 },
            cost: 4,
            hp: 60,
            damage: 15,
            attackSpeed: 1.5,
            range: 10,
            hasTaunt: true,              // СПОСОБНОСТЬ: Провокация (враги атакуют в первую очередь)
            sellPrice: 4,                // Базовая цена продажи
            sellPricePerStar: 4,         // Дополнительная цена за каждую звезду мерджа
            color: 0xFF8C00
        },
        HEALER: {
            name: 'Лекарь',
            size: { width: 1, height: 1 },
            cost: 3,
            hp: 25,
            damage: 3,
            attackSpeed: 2.0, // Возвращаем исходное значение
            range: 10, // Неограниченный радиус атаки (как у всех юнитов)
            healRange: 2, // Ограниченный радиус лечения
            healAmount: 8, // Количество HP за лечение
            sellPrice: 3,              // Базовая цена продажи
            sellPricePerStar: 3,       // Дополнительная цена за каждую звезду мерджа
            color: 0x32CD32
        },
        MAGE: {
            name: 'Маг',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 40,
            damage: 8, // Меньше урона, но бьет по 3 целям
            attackSpeed: 2.5, // Медленнее атакует
            range: 10, // Увеличен радиус для всего поля
            maxTargets: 3, // Атакует до 3 целей одновременно
            sellPrice: 5,              // Базовая цена продажи
            sellPricePerStar: 5,       // Дополнительная цена за каждую звезду мерджа
            color: 0x9B4AE2
        },
        TANK: {
            name: 'Танк',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 80,
            damage: 10,
            attackSpeed: 2.0,
            range: 10,
            hasShield: true,
            shieldReduction: 0.3,
            sellPrice: 5,              // Базовая цена продажи
            sellPricePerStar: 5,       // Дополнительная цена за каждую звезду мерджа
            color: 0xC0C0C0
        },
        ASSASSIN: {
            name: 'Ассасин',
            size: { width: 1, height: 1 },
            cost: 0,
            hp: 20,
            damage: 20,
            attackSpeed: 1.2,
            range: 10,
            hasCritical: true,
            criticalChance: 0.5,
            sellPrice: 3,              // Базовая цена продажи
            sellPricePerStar: 3,       // Дополнительная цена за каждую звезду мерджа
            color: 0x8B008B
        },
        DRUID: {
            name: 'Друид',
            size: { width: 2, height: 2 },
            occupiedCells: [
                { x: 1, y: 0 }, // Top-right
                { x: 0, y: 1 }, // Bottom-left
                { x: 1, y: 1 }  // Bottom-right
            ],
            cost: 0,
            hp: 45,
            damage: 6,
            attackSpeed: 1.8,
            range: 10,
            hasThorns: true,
            thornsDamage: 5,
            sellPrice: 4,              // Базовая цена продажи
            sellPricePerStar: 4,       // Дополнительная цена за каждую звезду мерджа
            color: 0x8B4513
        },
        WITCH: {
            name: 'Ведьма',
            size: { width: 2, height: 2 },
            occupiedCells: [
                { x: 0, y: 0 }, // Top-left
                { x: 0, y: 1 }, // Bottom-left  
                { x: 1, y: 1 }  // Bottom-right (missing top-right)
            ],
            cost: 0,
            hp: 35,
            damage: 12,
            attackSpeed: 3.0,
            range: 10,
            hasCurse: true,
            curseDebuff: 0.5,
            sellPrice: 6,              // Базовая цена продажи
            sellPricePerStar: 6,       // Дополнительная цена за каждую звезду мерджа
            color: 0x4B0082
        }
    }
};

// ============================================================================
// СИСТЕМА УПРАВЛЕНИЯ СЕТКОЙ
// ============================================================================
/**
 * GridSystem - управляет сеткой игрового поля
 * 
 * Отвечает за:
 * - Создание визуальной сетки
 * - Размещение юнитов на клетках
 * - Проверку валидности размещения
 * - Конвертацию координат (мировые ↔ сетка)
 */
class GridSystem {
    constructor(scene) {
        this.scene = scene;
        this.grid = [];
        this.cellSize = 0;
        this.gridWidth = 0;
        this.gridHeight = 0;
        this.gridOffsetX = 0;
        this.gridOffsetY = 0;
        this.gridGraphics = null; // Сохраняем ссылку на визуальную сетку
    }

    createGrid(width, height, cellSize) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.cellSize = cellSize;
        
        // Центрируем поле на экране
        const screenWidth = this.scene.cameras.main.width;
        this.gridOffsetX = (screenWidth - (width * cellSize)) / 2; // Центрируем по горизонтали
        this.gridOffsetY = 100; // Отступ сверху
        
        console.log(`GridSystem: создаем сетку ${width}x${height}, смещение (${this.gridOffsetX}, ${this.gridOffsetY})`);
        
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
        // Удаляем старую сетку если есть
        if (this.gridGraphics) {
            this.gridGraphics.destroy();
        }
        
        this.gridGraphics = this.scene.add.graphics();
        
        // Область врага (верхняя половина) - темнее
        this.gridGraphics.fillStyle(0xE24A4A, 0.1);
        this.gridGraphics.fillRect(this.gridOffsetX, this.gridOffsetY, this.gridWidth * this.cellSize, (this.gridHeight / 2) * this.cellSize);
        
        // Область игрока (нижняя половина) - светлее
        const playerAreaY = this.gridOffsetY + (this.gridHeight / 2 * this.cellSize);
        this.gridGraphics.fillStyle(0x4A90E2, 0.1);
        this.gridGraphics.fillRect(this.gridOffsetX, playerAreaY, this.gridWidth * this.cellSize, (this.gridHeight / 2) * this.cellSize);
        
        // Очень тонкие линии сетки
        this.gridGraphics.lineStyle(1, 0x888888, 0.2);
        
        // Вертикальные линии
        for (let x = 1; x < this.gridWidth; x++) {
            const startX = this.gridOffsetX + (x * this.cellSize);
            const startY = this.gridOffsetY;
            const endY = this.gridOffsetY + (this.gridHeight * this.cellSize);
            this.gridGraphics.lineBetween(startX, startY, startX, endY);
        }
        
        // Горизонтальные линии
        for (let y = 1; y < this.gridHeight; y++) {
            const startY = this.gridOffsetY + (y * this.cellSize);
            const startX = this.gridOffsetX;
            const endX = this.gridOffsetX + (this.gridWidth * this.cellSize);
            this.gridGraphics.lineBetween(startX, startY, endX, startY);
        }
    }

    getGridPosition(worldX, worldY) {
        // Проверяем валидность входных параметров
        if (isNaN(worldX) || isNaN(worldY) || 
            typeof worldX !== 'number' || typeof worldY !== 'number') {
            console.log('getGridPosition: невалидные координаты:', worldX, worldY);
            return { x: NaN, y: NaN };
        }
        
        // Проверяем валидность gridOffset и cellSize
        if (isNaN(this.gridOffsetX) || isNaN(this.gridOffsetY) || isNaN(this.cellSize)) {
            console.log('getGridPosition: невалидные grid параметры:', {
                gridOffsetX: this.gridOffsetX,
                gridOffsetY: this.gridOffsetY,
                cellSize: this.cellSize
            });
            return { x: NaN, y: NaN };
        }
        
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

    canPlaceUnit(gridX, gridY, size, occupiedCells = null) {
        // Если есть occupiedCells, используем их для проверки
        if (occupiedCells) {
            // Проверяем границы для L-образной формы
            const maxX = Math.max(...occupiedCells.map(cell => cell.x));
            const maxY = Math.max(...occupiedCells.map(cell => cell.y));
            
            if (gridX < 0 || gridY < 0 || 
                gridX + maxX >= this.gridWidth || 
                gridY + maxY >= this.gridHeight) {
                return false;
            }
            
            // Проверяем, что занятые клетки свободны
            for (const cell of occupiedCells) {
                const checkX = gridX + cell.x;
                const checkY = gridY + cell.y;
                if (this.grid[checkY][checkX] !== null) {
                    return false;
                }
            }
        } else {
            // Стандартная проверка для прямоугольных форм
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
        }
        
        // Проверяем, что юнит размещается в области игрока (нижняя половина)
        const playerAreaStart = this.gridHeight / 2;
        if (gridY < playerAreaStart) {
            return false;
        }
        
        return true;
    }

    /**
     * Получает юнита на указанной позиции сетки
     * @param {number} gridX - X координата в сетке
     * @param {number} gridY - Y координата в сетке
     * @returns {Unit|null} - юнит на позиции или null
     */
    getUnitAt(gridX, gridY) {
        // Проверяем на NaN и невалидные значения
        if (isNaN(gridX) || isNaN(gridY) || 
            gridX < 0 || gridY < 0 || 
            gridX >= this.gridWidth || 
            gridY >= this.gridHeight) {
            return null;
        }
        
        return this.grid[gridY][gridX];
    }

    /**
     * Проверяет, можно ли разместить юнита (включая мердж)
     * @param {number} gridX - X координата в сетке
     * @param {number} gridY - Y координата в сетке
     * @param {Object} size - размер юнита
     * @param {string} unitType - тип юнита
     * @param {boolean} isEnemy - является ли врагом
     * @returns {Object} - {canPlace: boolean, isMerge: boolean, existingUnit: Unit|null}
     */
    canPlaceOrMerge(gridX, gridY, size, unitType, isEnemy) {
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        const occupiedCells = unitData.occupiedCells;
        
        // Проверяем границы
        if (occupiedCells) {
            // L-образная форма
            const maxX = Math.max(...occupiedCells.map(cell => cell.x));
            const maxY = Math.max(...occupiedCells.map(cell => cell.y));
            
            if (gridX < 0 || gridY < 0 || 
                gridX + maxX >= this.gridWidth || 
                gridY + maxY >= this.gridHeight) {
                return {canPlace: false, isMerge: false, existingUnit: null};
            }
        } else {
            // Стандартная прямоугольная форма
            if (gridX < 0 || gridY < 0 || 
                gridX + size.width > this.gridWidth || 
                gridY + size.height > this.gridHeight) {
                return {canPlace: false, isMerge: false, existingUnit: null};
            }
        }
        
        // Проверяем область размещения
        const playerAreaStart = this.gridHeight / 2;
        if (!isEnemy && gridY < playerAreaStart) {
            return {canPlace: false, isMerge: false, existingUnit: null};
        }
        if (isEnemy && gridY + size.height > playerAreaStart) {
            return {canPlace: false, isMerge: false, existingUnit: null};
        }
        
        // Проверяем, есть ли юнит на позиции (для L-образных форм проверяем все занятые клетки)
        let existingUnit = null;
        if (occupiedCells) {
            // Для L-образной формы проверяем все занятые клетки
            for (const cell of occupiedCells) {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                const unitAtCell = this.getUnitAt(x, y);
                if (unitAtCell) {
                    existingUnit = unitAtCell;
                    break;
                }
            }
        } else {
            // Для обычных форм проверяем только левую верхнюю клетку
            existingUnit = this.getUnitAt(gridX, gridY);
        }
        
        if (existingUnit) {
            // Проверяем возможность мерджа
            if (!existingUnit.isEnemy && !isEnemy && 
                existingUnit.unitType === unitType && 
                existingUnit.mergeLevel < 3) {
                return {canPlace: true, isMerge: true, existingUnit: existingUnit};
            }
            return {canPlace: false, isMerge: false, existingUnit: existingUnit};
        }
        
        // Проверяем, что все клетки свободны
        if (occupiedCells) {
            // L-образная форма - проверяем только занятые клетки
            for (const cell of occupiedCells) {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                if (this.grid[y][x] !== null) {
                    return {canPlace: false, isMerge: false, existingUnit: null};
                }
            }
        } else {
            // Стандартная прямоугольная форма
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    if (this.grid[y][x] !== null) {
                        return {canPlace: false, isMerge: false, existingUnit: null};
                    }
                }
            }
        }
        
        return {canPlace: true, isMerge: false, existingUnit: null};
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
        const unitData = window.gameConfig.UNIT_TYPES[unit.unitType];
        const occupiedCells = unitData.occupiedCells;
        
        console.log(`Размещаем юнит ${unit.constructor.name} в позиции (${gridX}, ${gridY}) размером ${size.width}x${size.height}`);
        
        // Очищаем старые позиции юнита
        this.removeUnit(unit);
        
        if (occupiedCells) {
            // L-образная форма - занимаем только указанные клетки
            for (const cell of occupiedCells) {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                this.grid[y][x] = unit;
                console.log(`Занимаем L-клетку (${x}, ${y})`);
            }
        } else {
            // Стандартная прямоугольная форма
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    this.grid[y][x] = unit;
                    console.log(`Занимаем клетку (${x}, ${y})`);
                }
            }
        }
        
        // Используем правильный метод для позиционирования
        const startX = this.gridOffsetX + (gridX * this.cellSize);
        const startY = this.gridOffsetY + (gridY * this.cellSize);
        const centerX = startX + (size.width * this.cellSize / 2);
        const centerY = startY + (size.height * this.cellSize / 2);
        
        // Обновляем визуальное представление для L-образных юнитов
        if (occupiedCells) {
            unit.createVisuals();
            // Добавляем drag-and-drop для L-образных юнитов
            if (!unit.isEnemy) {
                const interactiveElements = unit.spriteElements || [unit.sprite];
                interactiveElements.forEach(element => {
                    if (element && element.setInteractive) {
                        // Для контейнеров нужно указать область взаимодействия
                        if (element.type === 'Container') {
                            element.setSize(element.width || 100, element.height || 100);
                        }
                        element.setInteractive({ draggable: true })
                            .on('dragstart', (pointer) => {
                                console.log('dragstart событие для:', unit.constructor.name);
                                unit.scene.isDraggingFromField = true;
                                unit.scene.onUnitDragStart(unit, pointer);
                            })
                            .on('drag', (pointer, dragX, dragY) => {
                                if (unit.sprite && unit.sprite.setPosition) {
                                    unit.sprite.setPosition(
                                        unit.scene.gridSystem.gridOffsetX + (unit.gridX * unit.scene.gridSystem.cellSize) + unit.scene.gridSystem.cellSize / 2,
                                        unit.scene.gridSystem.gridOffsetY + (unit.gridY * unit.scene.gridSystem.cellSize) + unit.scene.gridSystem.cellSize / 2
                                    );
                                }
                                unit.scene.onUnitDrag(pointer);
                            })
                            .on('dragend', (pointer, dragX, dragY) => {
                                console.log('dragend событие для:', unit.constructor.name);
                                unit.scene.onUnitDragEnd(unit, pointer, dragX, dragY);
                            });
                    }
                });
            }
        }
        
        unit.setPosition(centerX, centerY);
        console.log(`Установлена позиция юнита: (${centerX}, ${centerY})`);
        
        // Пересоздаем HP бар после размещения
        unit.createHpBar(centerX, centerY);
        if (unit.hpBar) {
            unit.updateHpBar();
        }
    }

    removeUnit(unit) {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.grid[y][x] === unit) {
                    this.grid[y][x] = null;
                }
            }
        }
        
        // Очищаем старые HP бары и эффекты при перемещении
        if (unit.hpBar) {
            unit.hpBar.destroy();
            unit.hpBar = null;
        }
        if (unit.hpBarBg) {
            unit.hpBarBg.destroy();
            unit.hpBarBg = null;
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

// ============================================================================
// ЮНИТЫ
// ============================================================================
/**
 * Unit - базовый класс для всех юнитов
 * 
 * Общая логика:
 * - Визуализация (спрайт + HP бар)
 * - Атака и получение урона
 * - Смерть и воскрешение
 * - Расчет расстояний до других юнитов
 * 
 * Наследуется классами: Archer, Warrior, Barbarian, Healer, Mage
 */
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
        
        // Мердж-система
        this.mergeLevel = 0;        // Уровень мерджа (0-3)
        this.mergedStars = [];      // Массив объектов-звездочек
        this.unitType = null;       // Тип юнита (ARCHER, WARRIOR и тд)
        this.baseHp = this.maxHp;   // Базовое HP для расчета бонусов
        this.baseDamage = this.damage; // Базовый урон для расчета бонусов
        
        this.sprite = null;
        this.hpBar = null;
        this.lastAttackTime = 0;
        
        this.createVisuals();
    }

    createVisuals() {
        // Очищаем старые визуальные элементы
        if (this.spriteElements) {
            this.spriteElements.forEach(elem => {
                if (elem && elem.destroy) elem.destroy();
            });
            this.spriteElements = [];
        }
        if (this.sprite && this.sprite.destroy) {
            this.sprite.destroy();
        }
        
        // Проверяем, есть ли у юнита L-образная форма
        const unitData = window.gameConfig.UNIT_TYPES[this.unitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (occupiedCells) {
            // Создаем L-образную форму из отдельных элементов
            this.spriteElements = [];
            
            occupiedCells.forEach(cell => {
                const cellX = this.scene.gridSystem.gridOffsetX + 
                    ((this.gridX + cell.x) * this.scene.gridSystem.cellSize) + 
                    this.scene.gridSystem.cellSize / 2;
                const cellY = this.scene.gridSystem.gridOffsetY + 
                    ((this.gridY + cell.y) * this.scene.gridSystem.cellSize) + 
                    this.scene.gridSystem.cellSize / 2;
                
                const rect = this.scene.add.rectangle(
                    cellX, cellY,
                    this.scene.gridSystem.cellSize * 0.8,
                    this.scene.gridSystem.cellSize * 0.8,
                    this.color
                );
                rect.setStrokeStyle(2, 0x000000);
                rect.setDepth(100);
                this.spriteElements.push(rect);
            });
            
            // Создаем контейнер для L-формы
            this.sprite = this.scene.add.container(0, 0);
            this.spriteElements.forEach(elem => this.sprite.add(elem));
            
            // Центр для HP бара
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            
            this.createHpBar(centerX, centerY);
        } else {
            // Стандартная прямоугольная форма
            const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
            const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
            
            const spriteWidth = this.size.width * this.scene.gridSystem.cellSize;
            const spriteHeight = this.size.height * this.scene.gridSystem.cellSize;
            
            const centerX = startX + (spriteWidth / 2);
            const centerY = startY + (spriteHeight / 2);
            
            console.log(`Создаем юнит ${this.constructor.name}: размер ${this.size.width}x${this.size.height}, спрайт ${spriteWidth}x${spriteHeight}, позиция (${centerX}, ${centerY})`);
            
            // Определяем спрайт в зависимости от типа юнита
            let spriteKey = 'archer';
            
            if (this.unitType) {
                if (this.unitType === 'WARRIOR') spriteKey = 'warrior';
                else if (this.unitType === 'BARBARIAN') spriteKey = 'barbarian';
                else if (this.unitType === 'HEALER') spriteKey = 'healer';
                else if (this.unitType === 'MAGE') spriteKey = 'mage';
            } else {
                if (this.constructor.name === 'Warrior') spriteKey = 'warrior';
                else if (this.constructor.name === 'Barbarian') spriteKey = 'barbarian';
                else if (this.constructor.name === 'Healer') spriteKey = 'healer';
                else if (this.constructor.name === 'Mage') spriteKey = 'mage';
                else if (this.constructor.name === 'Tank') spriteKey = 'tank';
                else if (this.constructor.name === 'Assassin') spriteKey = 'assassin';
                else if (this.constructor.name === 'Druid') spriteKey = 'druid';
                else if (this.constructor.name === 'Witch') spriteKey = 'witch';
            }
            
            console.log('Создаем спрайт:', spriteKey, 'для юнита:', this.constructor.name);
            
            if (this.scene.textures.exists(spriteKey)) {
                console.log('Спрайт найден, создаем изображение:', spriteKey);
                this.sprite = this.scene.add.image(centerX, centerY, spriteKey);
                this.sprite.setDisplaySize(spriteWidth, spriteHeight);
            } else {
                console.log('Спрайт не найден, используем прямоугольник:', spriteKey);
                this.sprite = this.scene.add.rectangle(
                    centerX, 
                    centerY, 
                    spriteWidth,
                    spriteHeight,
                    this.color
                );
            }
            
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
        }
        
        // Для врагов делаем спрайт темнее
        if (this.isEnemy) {
            if (this.sprite.setTint) {
                // Для image объектов используем setTint
                this.sprite.setTint(0x666666);
            } else if (this.sprite.setFillStyle) {
                // Для rectangle объектов используем setFillStyle
                this.sprite.setFillStyle(0x666666);
            }
        }
        
        // Добавляем drag-and-drop для юнитов игрока
        if (!this.isEnemy) {
            console.log('Добавляем drag-and-drop для юнита:', this.constructor.name);
            
            const interactiveElements = this.spriteElements || [this.sprite];
            
            interactiveElements.forEach(element => {
                if (element && element.setInteractive) {
                    // Для контейнеров нужно указать область взаимодействия
                    if (element.type === 'Container') {
                        element.setSize(element.width || 100, element.height || 100);
                    }
                    element.setInteractive({ draggable: true })
                        .on('dragstart', (pointer) => {
                            console.log('dragstart событие для:', this.constructor.name);
                            this.scene.isDraggingFromField = true;
                            this.scene.onUnitDragStart(this, pointer);
                        })
                        .on('drag', (pointer, dragX, dragY) => {
                            // Не двигаем фактический спрайт юнита, только призрак
                            if (this.sprite && this.sprite.setPosition) {
                                this.sprite.setPosition(
                                    this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize) + this.scene.gridSystem.cellSize / 2,
                                    this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize) + this.scene.gridSystem.cellSize / 2
                                );
                            }
                            this.scene.onUnitDrag(pointer);
                        })
                        .on('dragend', (pointer, dragX, dragY) => {
                            console.log('dragend событие для:', this.constructor.name);
                            this.scene.onUnitDragEnd(this, pointer, dragX, dragY);
                        });
                }
            });
        }
    }

    createHpBar(x, y) {
        // Очищаем старые HP бары
        if (this.hpBar) {
            this.hpBar.destroy();
            this.hpBar = null;
        }
        if (this.hpBarBg) {
            this.hpBarBg.destroy();
            this.hpBarBg = null;
        }
        
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const barHeight = 4;
        const barY = y - (this.size.height * this.scene.gridSystem.cellSize * 0.4);
        
        this.hpBarBg = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x333333);
        this.hpBar = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x00FF00);
        
        this.updateHpBar();
    }

    updateHpBar() {
        if (!this.hpBar || !this.hpBar.scene) return;
        
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
        const unitData = window.gameConfig.UNIT_TYPES[this.unitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (this.spriteElements && occupiedCells) {
            // Reposition each element of L-shape
            occupiedCells.forEach((cell, index) => {
                if (this.spriteElements[index]) {
                    const cellX = this.scene.gridSystem.gridOffsetX + 
                        ((this.gridX + cell.x) * this.scene.gridSystem.cellSize) + 
                        this.scene.gridSystem.cellSize / 2;
                    const cellY = this.scene.gridSystem.gridOffsetY + 
                        ((this.gridY + cell.y) * this.scene.gridSystem.cellSize) + 
                        this.scene.gridSystem.cellSize / 2;
                    this.spriteElements[index].setPosition(cellX, cellY);
                }
            });
        } else if (this.sprite) {
            // Standard positioning - пересчитываем позицию для правильного центрирования
            const spriteX = this.scene.gridSystem.gridOffsetX + 
                (this.gridX * this.scene.gridSystem.cellSize) + 
                (this.size.width * this.scene.gridSystem.cellSize / 2);
            const spriteY = this.scene.gridSystem.gridOffsetY + 
                (this.gridY * this.scene.gridSystem.cellSize) + 
                (this.size.height * this.scene.gridSystem.cellSize / 2);
            this.sprite.setPosition(spriteX, spriteY);
        }
        
        // Position HP bar at center of bounding box
        const centerX = this.scene.gridSystem.gridOffsetX + 
            ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
        const centerY = this.scene.gridSystem.gridOffsetY + 
            ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            
        if (this.hpBar) {
            this.hpBar.setPosition(centerX, centerY - (this.size.height * this.scene.gridSystem.cellSize * 0.4));
        }
        if (this.hpBarBg) {
            this.hpBarBg.setPosition(centerX, centerY - (this.size.height * this.scene.gridSystem.cellSize * 0.4));
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
        this.createDamageNumber(damage);
    }

    createDamageEffect() {
        // Эффект повреждения - меняем цвет на красный и обратно
        if (this.spriteElements && this.spriteElements.length > 0) {
            // L-shaped units - apply effect to all elements
            this.spriteElements.forEach(elem => {
                if (elem.setTint) {
                    elem.setTint(0xFF0000);
                } else if (elem.setFillStyle) {
                    elem.setFillStyle(0xFF0000);
                }
            });
            
            this.scene.time.delayedCall(100, () => {
                this.spriteElements.forEach(elem => {
                    if (elem && elem.scene) {
                        if (elem.setTint) {
                            elem.setTint(this.isEnemy ? 0x666666 : 0xFFFFFF);
                        } else if (elem.setFillStyle) {
                            elem.setFillStyle(this.isEnemy ? 0x666666 : this.color);
                        }
                    }
                });
            });
        } else if (this.sprite) {
            if (this.sprite.setTint) {
                // Это изображение - используем setTint
                const originalTint = this.isEnemy ? 0x666666 : 0xFFFFFF;
                this.sprite.setTint(0xFF0000);
                this.scene.time.delayedCall(100, () => {
                    if (this.sprite && this.sprite.scene) {
                        this.sprite.setTint(originalTint);
                    }
                });
            } else if (this.sprite.setFillStyle) {
                // Это прямоугольник - используем setFillStyle
                const originalColor = this.isEnemy ? 0x666666 : this.color;
                this.sprite.setFillStyle(0xFF0000);
                this.scene.time.delayedCall(100, () => {
                    if (this.sprite && this.sprite.scene) {
                        this.sprite.setFillStyle(originalColor);
                    }
                });
            }
        }
    }

    createDamageNumber(damage) {
        // Позиция для цифры урона (над юнитом)
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        // Создаем текст с уроном
        const damageText = this.scene.add.text(centerX, centerY - 20, `-${damage}`, {
            fontSize: '16px',
            fill: '#FF0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Анимация плавания вверх и исчезновения
        this.scene.tweens.add({
            targets: damageText,
            y: centerY - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                damageText.destroy();
            }
        });
    }

    createHealNumber(healAmount) {
        // Позиция для цифры лечения (над юнитом)
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        // Создаем текст с лечением
        const healText = this.scene.add.text(centerX, centerY - 20, `+${healAmount}`, {
            fontSize: '16px',
            fill: '#00FF00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // Анимация плавания вверх и исчезновения
        this.scene.tweens.add({
            targets: healText,
            y: centerY - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                healText.destroy();
            }
        });
    }

    die() {
        this.isDead = true;
        
        console.log(`Юнит ${this.constructor.name} убит в позиции (${this.gridX}, ${this.gridY})`);
        
        // Делаем юнита невидимым, но НЕ уничтожаем (для воскрешения)
        if (this.spriteElements && this.spriteElements.length > 0) {
            // L-shaped units - animate all elements
            this.spriteElements.forEach(elem => {
                this.scene.tweens.add({
                    targets: elem,
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    duration: 300
                });
            });
        } else if (this.sprite) {
            // Standard units
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 300
            });
        }
        
        // Скрываем hpBar, но не уничтожаем полностью
        if (this.hpBar) this.hpBar.setVisible(false);
        if (this.hpBarBg) this.hpBarBg.setVisible(false);
    }

    destroy() {
        if (this.spriteElements) {
            this.spriteElements.forEach(elem => {
                if (elem && elem.destroy) elem.destroy();
            });
            this.spriteElements = [];
        }
        if (this.sprite) this.sprite.destroy();
        if (this.hpBar) this.hpBar.destroy();
        if (this.hpBarBg) this.hpBarBg.destroy();
    }

    isAlive() {
        return !this.isDead && this.hp > 0;
    }

    getDistanceTo(otherUnit) {
        // Считаем расстояние между центрами юнитов
        let thisX, thisY, otherX, otherY;
        
        if (this.spriteElements && this.spriteElements.length > 0) {
            // L-shaped unit - use center of bounding box
            thisX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            thisY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
        } else if (this.sprite) {
            thisX = this.sprite.x;
            thisY = this.sprite.y;
        } else {
            return 0;
        }
        
        if (otherUnit.spriteElements && otherUnit.spriteElements.length > 0) {
            // L-shaped unit - use center of bounding box
            otherX = otherUnit.scene.gridSystem.gridOffsetX + 
                ((otherUnit.gridX + otherUnit.size.width / 2) * otherUnit.scene.gridSystem.cellSize);
            otherY = otherUnit.scene.gridSystem.gridOffsetY + 
                ((otherUnit.gridY + otherUnit.size.height / 2) * otherUnit.scene.gridSystem.cellSize);
        } else if (otherUnit.sprite) {
            otherX = otherUnit.sprite.x;
            otherY = otherUnit.sprite.y;
        } else {
            return 0;
        }
        
        const dx = thisX - otherX;
        const dy = thisY - otherY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getGridDistanceTo(otherUnit) {
        // Считаем расстояние в клетках сетки (более подходящее для лечения)
        const dx = Math.abs(this.gridX - otherUnit.gridX);
        const dy = Math.abs(this.gridY - otherUnit.gridY);
        return Math.max(dx, dy); // Используем "шахматное" расстояние
    }

    // ============================================================================
    // МЕРДЖ-СИСТЕМА
    // ============================================================================
    
    /**
     * Объединяет юнита с другим юнитом того же типа
     * @param {string} unitType - тип юнита для мерджа
     */
    merge(unitType) {
        if (this.mergeLevel >= 3) {
            console.log('Максимальный уровень мерджа достигнут');
            return false;
        }
        
        if (this.unitType !== unitType) {
            console.log('Нельзя мерджить разные типы юнитов');
            return false;
        }
        
        this.mergeLevel++;
        this.applyMergeBonus();
        this.createMergeStars();
        
        console.log(`${this.constructor.name} мерджнут! Уровень: ${this.mergeLevel}`);
        return true;
    }
    
    /**
     * Применяет бонусы от мерджа (+20 HP, +5 урон за уровень)
     */
    applyMergeBonus() {
        const hpBonus = this.mergeLevel * 20;
        const damageBonus = this.mergeLevel * 5;
        
        this.maxHp = this.baseHp + hpBonus;
        this.damage = this.baseDamage + damageBonus;
        
        // Восстанавливаем HP до максимума при мердже
        this.hp = this.maxHp;
        
        // Обновляем HP бар
        if (this.hpBar) {
            this.updateHpBar();
        }
        
        console.log(`Бонусы мерджа: +${hpBonus} HP, +${damageBonus} урон`);
    }
    
    /**
     * Создает визуальные звездочки на юните
     */
    createMergeStars() {
        // Удаляем старые звездочки
        this.mergedStars.forEach(star => {
            if (star && star.destroy) {
                star.destroy();
            }
        });
        this.mergedStars = [];
        
        if (this.mergeLevel === 0) return;
        
        // Позиция для звездочек (на юните)
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        // Создаем звездочки в ряд на юните
        const starSpacing = 12;
        const totalWidth = (this.mergeLevel - 1) * starSpacing;
        const startStarX = centerX - totalWidth / 2;
        const starY = centerY; // На центре юнита
        
        for (let i = 0; i < this.mergeLevel; i++) {
            const starX = startStarX + (i * starSpacing);
            const star = this.scene.add.star(starX, starY, 6, 4, 2, 0xFFD700);
            this.mergedStars.push(star);
        }
    }
    
    /**
     * Обновляет позиции звездочек (при перемещении юнита)
     */
    updateMergeStars() {
        if (this.mergedStars.length === 0) return;
        
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        const starSpacing = 12;
        const totalWidth = (this.mergeLevel - 1) * starSpacing;
        const startStarX = centerX - totalWidth / 2;
        
        this.mergedStars.forEach((star, i) => {
            if (star && star.setPosition) {
                const starX = startStarX + (i * starSpacing);
                star.setPosition(starX, centerY);
            }
        });
    }

    updateVisuals() {
        if (this.spriteElements && this.spriteElements.length > 0) {
            // Handle L-shaped units (multiple elements)
            this.spriteElements.forEach(elem => {
                if (elem.setTint) {
                    elem.setTint(this.isEnemy ? 0x666666 : 0xFFFFFF);
                } else if (elem.setFillStyle) {
                    elem.setFillStyle(this.isEnemy ? 0x666666 : this.color);
                }
            });
        } else if (this.sprite) {
            // Handle standard units (single sprite)
            if (this.sprite.setTint) {
                if (this.isEnemy) {
                    this.sprite.setTint(0x666666);
                } else {
                    this.sprite.setTint(0xFFFFFF);
                }
            } else if (this.sprite.setFillStyle) {
                if (this.isEnemy) {
                    this.sprite.setFillStyle(0x666666);
                } else {
                    this.sprite.setFillStyle(this.color);
                }
            }
        }
    }

    /**
     * Рассчитывает цену продажи юнита с учетом уровня мерджа
     */
    getSellPrice() {
        const unitData = window.gameConfig.UNIT_TYPES[this.unitType];
        if (!unitData) return 0;
        
        const basePrice = unitData.sellPrice || unitData.cost;
        const starBonus = (unitData.sellPricePerStar || basePrice) * this.mergeLevel;
        return basePrice + starBonus;
    }
}

// Лучник
class Archer extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x4A90E2);
        
        this.unitType = 'ARCHER';
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 8;
        this.attackSpeed = 0.5;
        this.baseAttackSpeed = 0.5; // Запоминаем базовую скорость для баффов
        this.range = 10; // Увеличен радиус
        
        // Сохраняем базовые значения для мерджа
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
}

// Мечник
class Warrior extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 2 }, 0xE24A4A);
        
        this.unitType = 'WARRIOR';
        this.maxHp = 50;
        this.hp = this.maxHp;
        this.damage = 12;
        this.attackSpeed = 1.0;
        this.baseAttackSpeed = 1.0; // Запоминаем базовую скорость
        this.range = 10; // Увеличен радиус
        
        // Способность: Боевой клич
        this.hasBattleCry = true;
        this.battleCryBonus = 0.25; // 25% ускорение атаки
        this.battleCryActive = false;
        this.battleCryEffect = null;
        
        // Сохраняем базовые значения для мерджа
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
    
    // Создаем визуальный эффект Боевого клича (желтые волны)
    createBattleCryEffect() {
        if (this.battleCryEffect) return; // Уже создан
        
        // Создаем 3 круговые волны
        const waves = [];
        for (let i = 0; i < 3; i++) {
            const wave = this.scene.add.circle(
                this.sprite.x,
                this.sprite.y,
                20,
                0xFFD700, // Золотой цвет
                0
            );
            wave.setStrokeStyle(2, 0xFFD700, 0.8);
            waves.push(wave);
            
            // Анимация расширения волны
            this.scene.tweens.add({
                targets: wave,
                radius: 80,
                alpha: 0,
                duration: 1500,
                delay: i * 300,
                repeat: -1,
                ease: 'Cubic.easeOut'
            });
        }
        
        // Постоянное свечение вокруг мечника
        const glow = this.scene.add.circle(
            this.sprite.x,
            this.sprite.y,
            35,
            0xFFD700,
            0.15
        );
        
        // Пульсация свечения
        this.scene.tweens.add({
            targets: glow,
            alpha: 0.3,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        this.battleCryEffect = {
            waves: waves,
            glow: glow
        };
    }
    
    // Удаляем визуальный эффект
    removeBattleCryEffect() {
        if (!this.battleCryEffect) return;
        
        this.battleCryEffect.waves.forEach(wave => {
            if (wave && wave.scene) {
                this.scene.tweens.killTweensOf(wave);
                wave.destroy();
            }
        });
        
        if (this.battleCryEffect.glow && this.battleCryEffect.glow.scene) {
            this.scene.tweens.killTweensOf(this.battleCryEffect.glow);
            this.battleCryEffect.glow.destroy();
        }
        
        this.battleCryEffect = null;
    }
    
    // Активация/деактивация боевого клича
    setBattleCryActive(active) {
        if (this.battleCryActive === active) return;
        
        this.battleCryActive = active;
        
        if (active) {
            this.createBattleCryEffect();
            console.log(`Мечник активировал Боевой клич! Союзники атакуют на ${this.battleCryBonus * 100}% быстрее`);
        } else {
            this.removeBattleCryEffect();
            console.log(`Боевой клич деактивирован`);
        }
    }
    
    die() {
        this.removeBattleCryEffect();
        super.die();
    }
}

// Лекарь
class Healer extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x32CD32);
        
        this.unitType = 'HEALER';
        this.maxHp = 25;
        this.hp = this.maxHp;
        this.damage = 3;
        this.attackSpeed = 2.0; // Возвращаем исходное значение
        this.baseAttackSpeed = 2.0; // Запоминаем базовую скорость для баффов
        this.range = 10; // Неограниченный радиус атаки (как у всех юнитов)
        this.healRange = 2; // Ограниченный радиус лечения
        this.healAmount = 8; // Количество HP за лечение
        
        // Сохраняем базовые значения для мерджа
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }

    // Переопределяем метод атаки для лечения
    attack(target = null) {
        console.log('Лекарь кастует лечение по области');
        
        const currentTime = this.scene.time.now;
        
        if (currentTime - this.lastAttackTime < this.attackSpeed * 1000) {
            console.log('Лекарь еще на кулдауне');
            return;
        }
        
        this.lastAttackTime = currentTime;
        
        // Кастуем лечение по области вокруг себя
        this.castAreaHeal();
        
        // После лечения атакуем врагов как обычно
        if (target) {
            console.log(`Лекарь атакует ${target.constructor.name} на ${this.damage} урона`);
            this.createAttackEffect(target);
            target.takeDamage(this.damage);
        }
    }

    castAreaHeal() {
        console.log('Лекарь кастует лечение крестом');
        
        const allies = this.isEnemy ? this.scene.enemyUnits : this.scene.playerUnits;
        
        // 4 соседние клетки крестом
        const adjacentPositions = [
            { x: this.gridX, y: this.gridY - 1 },     // Вверх
            { x: this.gridX, y: this.gridY + 1 },     // Вниз
            { x: this.gridX - 1, y: this.gridY },     // Влево
            { x: this.gridX + 1, y: this.gridY }      // Вправо
        ];
        
        const nearbyAllies = allies.filter(ally => {
            if (ally === this || !ally.isAlive() || ally.hp >= ally.maxHp) return false;
            
            // Проверяем, находится ли союзник в одной из 4 соседних клеток
            return adjacentPositions.some(pos => 
                ally.gridX === pos.x && ally.gridY === pos.y
            );
        });
        
        console.log(`Найдено союзников в кресте: ${nearbyAllies.length}`);
        
        // Лечим всех найденных союзников
        nearbyAllies.forEach(ally => {
            const oldHp = ally.hp;
            ally.hp = Math.min(ally.maxHp, ally.hp + this.healAmount);
            const healedAmount = ally.hp - oldHp;
            
            if (healedAmount > 0) {
                console.log(`Лекарь лечит ${ally.constructor.name} на ${healedAmount} HP (${oldHp} -> ${ally.hp})`);
                ally.updateHpBar();
                ally.createHealNumber(healedAmount);
            }
        });
        
        // Создаем визуальный эффект лечения крестом только если есть союзники
        if (nearbyAllies.length > 0) {
            this.createAreaHealEffect();
        }
    }

    createAttackEffect(target) {
        // Красная линия от лекаря к цели атаки
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xFF0000, 0.8);
        graphics.lineBetween(
            this.sprite.x, this.sprite.y,
            target.sprite.x, target.sprite.y
        );
        
        // Красные частицы вокруг цели
        for (let i = 0; i < 3; i++) {
            const particle = this.scene.add.circle(
                target.sprite.x + Phaser.Math.Between(-15, 15),
                target.sprite.y + Phaser.Math.Between(-15, 15),
                2,
                0xFF0000
            );
            
            this.scene.tweens.add({
                targets: particle,
                y: particle.y - 20,
                alpha: 0,
                duration: 600,
                onComplete: () => particle.destroy()
            });
        }
        
        // Удаляем линию через 300мс
        this.scene.time.delayedCall(300, () => {
            graphics.destroy();
        });
        
        // Эффект свечения вокруг цели
        const glow = this.scene.add.circle(target.sprite.x, target.sprite.y, 25, 0xFF0000, 0.3);
        this.scene.tweens.add({
            targets: glow,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 0,
            duration: 400,
            onComplete: () => glow.destroy()
        });
    }

    createAreaHealEffect() {
        // Создаем эффект лечения по области
        const centerX = this.sprite.x;
        const centerY = this.sprite.y;
        
        // Круг лечения
        const healCircle = this.scene.add.circle(centerX, centerY, this.healRange * 50, 0x00FF00, 0.2);
        this.scene.tweens.add({
            targets: healCircle,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 1000,
            onComplete: () => healCircle.destroy()
        });
        
        // Частицы лечения
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const distance = Phaser.Math.Between(20, this.healRange * 50);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            const particle = this.scene.add.circle(x, y, 4, 0x00FF00);
            
            this.scene.tweens.add({
                targets: particle,
                y: particle.y - 40,
                alpha: 0,
                duration: 1200,
                onComplete: () => particle.destroy()
            });
        }
        
        // Эффект свечения вокруг лекаря
        const glow = this.scene.add.circle(centerX, centerY, 30, 0x00FF00, 0.4);
        this.scene.tweens.add({
            targets: glow,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 800,
            onComplete: () => glow.destroy()
        });
    }
}

/**
 * Barbarian - танк с провокацией
 * 
 * Особенность: обладает способностью "Taunt" (провокация)
 * Враги атакуют варваров в первую очередь, игнорируя остальных юнитов
 */
class Barbarian extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 1 }, 0xFF8C00);
        
        this.unitType = 'BARBARIAN';
        this.maxHp = 60;
        this.hp = this.maxHp;
        this.damage = 15;
        this.attackSpeed = 1.5;
        this.baseAttackSpeed = 1.5; // Запоминаем базовую скорость для баффов
        this.range = 10;
        this.hasTaunt = true; // СПОСОБНОСТЬ: Провокация
        
        // Сохраняем базовые значения для мерджа
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
        this.createTauntEffect(); // Визуальный эффект провокации
    }
    
    createTauntEffect() {
        // Красное свечение вокруг варвара (эффект провокации)
        const tauntGlow = this.scene.add.circle(
            this.sprite.x, 
            this.sprite.y, 
            60, 
            0xFF0000, 
            0.15
        );
        
        // Пульсирующая анимация
        this.scene.tweens.add({
            targets: tauntGlow,
            alpha: 0.3,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        // Сохраняем ссылку для удаления при смерти
        this.tauntGlow = tauntGlow;
    }
    
    setPosition(x, y) {
        // Вызываем родительский метод для обновления позиции спрайта и HP бара
        super.setPosition(x, y);
        
        // Обновляем позицию эффекта провокации
        if (this.tauntGlow) {
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            this.tauntGlow.setPosition(centerX, centerY);
        }
    }
    
    die() {
        // Убираем эффект провокации
        if (this.tauntGlow) {
            this.tauntGlow.destroy();
        }
        
        // Вызываем стандартную смерть
        super.die();
    }
}

// Маг
class Mage extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x9B4AE2);
        
        this.unitType = 'MAGE';
        this.maxHp = 40;
        this.hp = this.maxHp;
        this.damage = 8; // Уменьшаем урон, так как бьет по 3 целям
        this.attackSpeed = 2.5; // Медленнее атакует
        this.baseAttackSpeed = 2.5; // Запоминаем базовую скорость для баффов
        this.range = 10; // Увеличен радиус
        this.maxTargets = 3; // Максимум 3 цели
        
        // Сохраняем базовые значения для мерджа
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }

    // Переопределяем метод атаки - бьет по 3 целям
    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        
        console.log(`Маг атакует множественные цели`);
        
        // Находим до 3 ближайших целей
        const enemies = this.isEnemy ? this.scene.playerUnits : this.scene.enemyUnits;
        const aliveEnemies = enemies.filter(enemy => enemy && !enemy.isDead && enemy.sprite && enemy.sprite.active);
        
        console.log(`Доступно живых врагов: ${aliveEnemies.length}`);
        
        if (aliveEnemies.length === 0) {
            console.log('Маг не нашел живых целей для атаки');
            return false;
        }
        
        // Сортируем по расстоянию и берем до 3 ближайших
        const sortedEnemies = aliveEnemies.sort((a, b) => {
            return this.getDistanceTo(a) - this.getDistanceTo(b);
        });
        
        const targets = sortedEnemies.slice(0, this.maxTargets);
        
        console.log(`Маг атакует ${targets.length} целей:`, targets.map(t => `${t.constructor.name} (${t.hp} HP)`));
        
        // Наносим урон всем целям
        targets.forEach((enemy, index) => {
            if (enemy && !enemy.isDead && enemy.sprite && enemy.sprite.active) {
                enemy.takeDamage(this.damage);
                
                // Создаем визуальный эффект для каждой цели
                setTimeout(() => {
                    this.createMagicBolt(enemy);
                }, index * 100); // Задержка между атаками
            }
        });
        
        return true;
    }

    createMagicBolt(target) {
        // Проверяем, что цель все еще жива и активна
        if (!target || target.isDead || !target.sprite || !target.sprite.active) {
            console.log('Цель мертва или неактивна, пропускаем визуальный эффект');
            return;
        }
        
        // Фиолетовая магическая стрела от мага к цели
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0x9B4AE2, 0.8);
        graphics.lineBetween(
            this.sprite.x, this.sprite.y,
            target.sprite.x, target.sprite.y
        );
        
        // Удаляем линию через 300мс
        this.scene.time.delayedCall(300, () => {
            if (graphics && graphics.destroy) {
                graphics.destroy();
            }
        });
        
        // Звёздочки на цели
        for (let i = 0; i < 3; i++) {
            const star = this.scene.add.star(
                target.sprite.x + Phaser.Math.Between(-15, 15),
                target.sprite.y + Phaser.Math.Between(-15, 15),
                5, 5, 10, 0x9B4AE2
            );
            
            this.scene.tweens.add({
                targets: star,
                y: star.y - 20,
                alpha: 0,
                angle: 360,
                duration: 500,
                delay: i * 50,
                onComplete: () => {
                    if (star && star.destroy) {
                        star.destroy();
                    }
                }
            });
        }
        
        // Вспышка на цели
        const flash = this.scene.add.circle(target.sprite.x, target.sprite.y, 15, 0x9B4AE2, 0.6);
        this.scene.tweens.add({
            targets: flash,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                if (flash && flash.destroy) {
                    flash.destroy();
                }
            }
        });
    }
}

// Танк
class Tank extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0xC0C0C0);
        
        this.unitType = 'TANK';
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.damage = 10;
        this.attackSpeed = 2.0;
        this.baseAttackSpeed = 2.0;
        this.range = 10;
        this.shieldReduction = 0.3;
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
        this.createShieldEffect();
    }
    
    createShieldEffect() {
        // Визуальный эффект щита - золотой круг вокруг юнита
        if (this.shieldGlow) {
            this.shieldGlow.destroy();
        }
        
        const centerX = this.sprite.x;
        const centerY = this.sprite.y;
        const radius = Math.max(this.size.width, this.size.height) * this.scene.gridSystem.cellSize * 0.6;
        
        this.shieldGlow = this.scene.add.circle(centerX, centerY, radius, 0xFFD700, 0.3);
        this.shieldGlow.setStrokeStyle(2, 0xFFD700, 0.8);
        
        // Пульсирующая анимация
        this.scene.tweens.add({
            targets: this.shieldGlow,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    takeDamage(damage) {
        const reducedDamage = Math.floor(damage * (1 - this.shieldReduction));
        console.log(`Танк получает урон: ${damage} -> ${reducedDamage} (щит: ${this.shieldReduction * 100}%)`);
        super.takeDamage(reducedDamage);
        
        // Применяем щит к соседним союзникам
        this.applyShieldToAllies();
    }
    
    applyShieldToAllies() {
        const allies = this.isEnemy ? this.scene.enemyUnits : this.scene.playerUnits;
        allies.forEach(ally => {
            if (ally !== this && !ally.isDead && this.getGridDistanceTo(ally) <= 1) {
                // Применяем временный щит к союзнику
                ally.tempShield = true;
                ally.shieldReduction = 0.15; // Меньший щит для союзников
                
                // Убираем щит через 3 секунды
                this.scene.time.delayedCall(3000, () => {
                    if (ally.tempShield) {
                        ally.tempShield = false;
                        ally.shieldReduction = 0;
                    }
                });
            }
        });
    }
    
    setPosition(x, y) {
        // Вызываем родительский метод для обновления позиции спрайта и HP бара
        super.setPosition(x, y);
        
        // Обновляем позицию эффекта щита
        if (this.shieldGlow) {
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            this.shieldGlow.setPosition(centerX, centerY);
        }
    }
    
    die() {
        if (this.shieldGlow) {
            this.shieldGlow.destroy();
        }
        super.die();
    }
}

// Ассасин
class Assassin extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x8B008B);
        
        this.unitType = 'ASSASSIN';
        this.maxHp = 20;
        this.hp = this.maxHp;
        this.damage = 20;
        this.attackSpeed = 1.2;
        this.baseAttackSpeed = 1.2;
        this.range = 10;
        this.criticalChance = 0.5;
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
    
    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        
        // Шанс критического удара
        const isCritical = Math.random() < this.criticalChance;
        const finalDamage = isCritical ? this.damage * 2 : this.damage;
        
        if (isCritical) {
            console.log('КРИТИЧЕСКИЙ УДАР!', finalDamage);
            this.createCriticalEffect(target);
        }
        
        target.takeDamage(finalDamage);
        this.createAttackEffect(target);
        
        return true;
    }
    
    createCriticalEffect(target) {
        // Визуальный эффект критического удара - желтая вспышка
        const flash = this.scene.add.rectangle(
            target.sprite.x, 
            target.sprite.y, 
            target.size.width * this.scene.gridSystem.cellSize,
            target.size.height * this.scene.gridSystem.cellSize,
            0xFFFF00,
            0.8
        );
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy()
        });
    }
}

// Друид
class Druid extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x8B4513);
        
        this.unitType = 'DRUID';
        this.maxHp = 45;
        this.hp = this.maxHp;
        this.damage = 6;
        this.attackSpeed = 1.8;
        this.baseAttackSpeed = 1.8;
        this.range = 10;
        this.thornsDamage = 5;
        
        // Определяем занятые клетки для _J формы
        this.occupiedCells = [
            { x: 1, y: 0 }, // Top-right
            { x: 0, y: 1 }, // Bottom-left
            { x: 1, y: 1 }  // Bottom-right
        ];
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
        this.createThornsEffect();
    }
    
    createThornsEffect() {
        // Визуальный эффект шипов - зеленые шипы вокруг юнита
        if (this.thornsGlow) {
            this.thornsGlow.destroy();
        }
        
        const centerX = this.sprite.x;
        const centerY = this.sprite.y;
        const radius = Math.max(this.size.width, this.size.height) * this.scene.gridSystem.cellSize * 0.5;
        
        this.thornsGlow = this.scene.add.circle(centerX, centerY, radius, 0x00FF00, 0.2);
        this.thornsGlow.setStrokeStyle(1, 0x00FF00, 0.6);
        
        // Вращающаяся анимация
        this.scene.tweens.add({
            targets: this.thornsGlow,
            rotation: Math.PI * 2,
            duration: 2000,
            repeat: -1,
            ease: 'Linear'
        });
    }
    
    setPosition(x, y) {
        // Вызываем родительский метод для обновления позиции спрайта и HP бара
        super.setPosition(x, y);
        
        // Обновляем позицию эффекта шипов
        if (this.thornsGlow) {
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            this.thornsGlow.setPosition(centerX, centerY);
        }
    }
    
    takeDamage(damage) {
        super.takeDamage(damage);
        
        // Отражение урона обратно атакующему
        // Это будет обработано в BattleSystem.processAttacks
    }
    
    die() {
        if (this.thornsGlow) {
            this.thornsGlow.destroy();
        }
        super.die();
    }
}

// Ведьма
class Witch extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x4B0082);
        
        this.unitType = 'WITCH';
        this.maxHp = 35;
        this.hp = this.maxHp;
        this.damage = 12;
        this.attackSpeed = 3.0;
        this.baseAttackSpeed = 3.0;
        this.range = 10;
        this.curseDebuff = 0.5;
        this.cursedEnemies = new Set();
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
    
    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        target.takeDamage(this.damage);
        this.createAttackEffect(target);
        this.applyCurseDebuff(target);
        
        return true;
    }
    
    applyCurseDebuff(target) {
        if (!target || target.isDead) return;
        
        if (!target.originalDamage) {
            target.originalDamage = target.damage;
        }
        
        target.damage = target.originalDamage * this.curseDebuff;
        target.isCursed = true;
        this.cursedEnemies.add(target);
        this.createCurseDebuffEffect(target);
        
        console.log(`Ведьма прокляла ${target.constructor.name}, урон: ${target.originalDamage} → ${target.damage}`);
    }
    
    createCurseDebuffEffect(target) {
        const aura = this.scene.add.circle(
            target.sprite.x, target.sprite.y,
            this.scene.gridSystem.cellSize * 0.6,
            0x4B0082, 0.3
        );
        aura.setDepth(90);
        
        this.scene.tweens.add({
            targets: aura,
            alpha: 0.1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        if (target.curseAura) {
            target.curseAura.destroy();
        }
        target.curseAura = aura;
    }
    
    die() {
        this.cursedEnemies.forEach(enemy => {
            if (enemy && enemy.isAlive() && enemy.isCursed) {
                enemy.damage = enemy.originalDamage || enemy.damage;
                enemy.isCursed = false;
                if (enemy.curseAura) {
                    enemy.curseAura.destroy();
                    enemy.curseAura = null;
                }
            }
        });
        this.cursedEnemies.clear();
        super.die();
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
        
        // Обновляем баффы от мечников (Боевой клич)
        this.updateBattleCryBuffs(alivePlayerUnits);
        this.updateBattleCryBuffs(aliveEnemyUnits);
        
        // Применяем проклятия Ведьм
        
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
            console.log(`Проверяем юнит ${unit.constructor.name}, может атаковать: ${unit.canAttack()}`);
            if (unit.canAttack()) {
                const target = this.findNearestTarget(unit, targetUnits);
                console.log(`Юнит ${unit.constructor.name} нашел цель: ${target ? target.constructor.name : 'нет'}`);
                if (target) {
                    console.log(`Юнит ${unit.constructor.name} атакует ${target.constructor.name}`);
                    unit.attack(target);
                    
                    // Шипы Друида: отражение урона обратно атакующему
                    if (target instanceof Druid && target.isAlive()) {
                        unit.takeDamage(target.thornsDamage);
                        console.log('Шипы Друида отражают урон:', target.thornsDamage);
                    }
                }
            }
        });
    }

    findNearestTarget(unit, possibleTargets) {
        if (possibleTargets.length === 0) return null;
        
        // ПРОВОКАЦИЯ: проверяем наличие варваров с taunt
        const tauntTargets = possibleTargets.filter(target => 
            target.isAlive() && target.hasTaunt
        );
        
        // Если есть живые варвары с провокацией - выбираем только из них
        const validTargets = tauntTargets.length > 0 ? tauntTargets : possibleTargets;
        
        if (tauntTargets.length > 0) {
            console.log(`${unit.constructor.name} провоцирован! Атакует только варваров (${tauntTargets.length})`);
        }
        
        const unitPos = unit.getPosition();
        let nearestTarget = null;
        let nearestDistance = Infinity;
        
        validTargets.forEach(target => {
            if (!target.isAlive()) return;
            
            // Используем расстояние в клетках сетки
            const gridDistance = unit.getGridDistanceTo(target);
            
            if (gridDistance <= unit.range && gridDistance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = gridDistance;
            }
        });
        
        return nearestTarget;
    }

    // Обновление баффов от Боевого клича (2+ мечника ускоряют союзников)
    updateBattleCryBuffs(units) {
        // Считаем количество живых мечников в команде
        const warriors = units.filter(unit => 
            unit instanceof Warrior && unit.isAlive()
        );
        
        const warriorCount = warriors.length;
        const battleCryActive = warriorCount >= 2;
        
        // Применяем или снимаем бафф для всех юнитов
        units.forEach(unit => {
            if (!unit.isAlive()) return;
            
            // Для мечников: включаем/выключаем визуал
            if (unit instanceof Warrior) {
                unit.setBattleCryActive(battleCryActive);
            }
            
            // Для всех юнитов: применяем бафф скорости атаки
            if (!unit.baseAttackSpeed) {
                unit.baseAttackSpeed = unit.attackSpeed;
            }
            
            if (battleCryActive) {
                // Ускоряем атаку на 25%
                unit.attackSpeed = unit.baseAttackSpeed * (1 - 0.25);
            } else {
                // Возвращаем нормальную скорость
                unit.attackSpeed = unit.baseAttackSpeed;
            }
        });
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
        this.selectedCardIndex = null; // Индекс выбранной карточки в магазине
        this.hintText = null;
        this.shopUnits = []; // Случайные юниты в магазине
        this.shopCards = []; // Карточки магазина
        this.sellArea = null; // Область продажи (null когда не активна)
        this.currentRound = 1; // Текущий раунд (1-5)
        this.maxRounds = 5; // Максимум раундов (Best of 5)
        this.winsNeeded = 3; // Нужно 3 победы для победы в матче
        this.roundResults = []; // Результаты раундов (true = победа, false = поражение)
        this.roundText = null; // Текст с номером раунда
        this.resultsText = null; // Текст с результатами раундов
        
        // Drag-and-Drop состояние
        this.isDragging = false;           // Флаг перетаскивания
        this.isDraggingFromField = false;  // Флаг перетаскивания с поля
        this.dragGhost = null;             // Призрачная копия юнита
        this.dragGhostElements = [];       // Элементы призрака (иконка, рамка и тд)
        this.highlightedCells = [];        // Подсвеченные клетки
        this.dragStartX = 0;               // Начальная позиция для отмены
        this.dragStartY = 0;
        this.draggedUnit = null;           // Перетаскиваемый юнит
    }

    init() {
        // Сбрасываем все переменные при рестарте игры
        this.playerUnits = [];
        this.enemyUnits = [];
        this.isBattleActive = false;
        this.isPlacing = false;
        this.selectedUnitType = null;
        this.selectedUnitData = null;
        this.selectedCardIndex = null;
        this.hintText = null;
        this.shopUnits = [];
        this.shopCards = [];
        this.currentRound = 1;
        this.roundResults = [];
        this.roundText = null;
        this.resultsText = null;
        
        console.log('=== ИГРА СБРОШЕНА ===');
    }

    preload() {
        // Временно отключаем загрузку спрайтов из-за CORS
        // TODO: Включить когда будет HTTP сервер
        /*
        this.load.image('archer', 'src/assets/sprites/Elf_Archer.png');
        this.load.image('warrior', 'src/assets/sprites/Elf_Knight_Sword.png');
        this.load.image('barbarian', 'src/assets/sprites/Dwarf Axe Warrior.png');
        this.load.image('healer', 'src/assets/sprites/Dark Elves Healer Priestess.png');
        this.load.image('mage', 'src/assets/sprites/Dark Elves Crystal Mage.png');
        this.load.image('tank', 'src/assets/sprites/tank.png');
        this.load.image('assassin', 'src/assets/sprites/assassin.png');
        this.load.image('druid', 'src/assets/sprites/druid.png');
        this.load.image('witch', 'src/assets/sprites/witch.png');
        */
        
        // Добавляем обработчики для отладки загрузки
        this.load.on('filecomplete', (key, type, data) => {
            console.log('Спрайт загружен:', key);
        });
        
        this.load.on('loaderror', (file) => {
            console.error('Ошибка загрузки спрайта:', file.key, file.url);
        });
    }

    create() {
        this.gridSystem = new GridSystem(this);
        this.battleSystem = new BattleSystem(this);
        this.economySystem = new EconomySystem(this);
        
        this.createGameField();
        this.createUI();
        this.createShop();
        this.createRoundDisplay();
        
        // Глобальный обработчик кликов по полю для размещения юнитов
        this.input.on('pointerdown', this.handleFieldClick, this);
        
        console.log('Игровая сцена создана');
        console.log('Конфигурация:', window.gameConfig.VERSION, 'Поле:', window.gameConfig.GRID_WIDTH + 'x' + window.gameConfig.GRID_HEIGHT);
    }

    createGameField() {
        const { GRID_WIDTH, GRID_HEIGHT, CELL_SIZE } = window.gameConfig;
        
        // Используем CELL_SIZE из конфигурации, если он задан
        let finalCellSize;
        if (CELL_SIZE && CELL_SIZE > 0) {
            finalCellSize = CELL_SIZE;
            console.log(`Используем размер клетки из конфигурации: ${finalCellSize}`);
        } else {
            // Иначе рассчитываем динамически
            const screenWidth = this.cameras.main.width;
            const availableWidth = screenWidth - 100; // 50px отступ с каждой стороны
            const cellSize = Math.floor(availableWidth / GRID_WIDTH);
            
            // Ограничиваем размер клетки, чтобы поле не было слишком большим
            const maxCellSize = 70; // Оптимальный размер клетки для витрины
            finalCellSize = Math.min(cellSize, maxCellSize);
            console.log(`Рассчитываем размер клетки динамически: ${finalCellSize} (экрана: ${screenWidth}px)`);
        }
        
        console.log(`Создаем поле: ${GRID_WIDTH}x${GRID_HEIGHT}, размер клетки: ${finalCellSize}`);
        this.gridSystem.createGrid(GRID_WIDTH, GRID_HEIGHT, finalCellSize);
    }

    createUI() {
        // Адаптивное позиционирование UI элементов
        const screenWidth = this.cameras.main.width;
        const fightButtonX = screenWidth - 80; // 80px от правого края
        
        this.fightButton = this.add.rectangle(fightButtonX, 50, 120, 40, 0xE24A4A)
            .setInteractive()
            .on('pointerdown', () => {
                this.startBattle();
            });

        this.add.text(fightButtonX, 50, 'FIGHT', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.coinsText = this.add.text(80, 50, `Монеты: ${this.economySystem.getCoins()}`, {
            fontSize: '20px',
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
        // Рассчитываем позицию витрины на основе размера поля
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 300; // 300 пикселей отступ от поля
        
        // Генерируем 4 случайных юнита
        this.generateShopUnits();
        
        // Адаптивное позиционирование карточек магазина
        const { startX, cardSpacing, cardWidth } = this.calculateShopPositions();
        
        this.createShopCards(shopY, startX, cardSpacing, cardWidth);
        
        // Кнопка реролла
        this.createRerollButton(shopY, startX, cardSpacing);
    }

    calculateShopPositions() {
        const screenWidth = this.cameras.main.width;
        const cardWidth = 90; // Немного уменьшена ширина карточки
        const cardSpacing = 100; // Уменьшен интервал между карточками
        const totalWidth = (this.shopUnits.length * cardSpacing) - (cardSpacing - cardWidth);
        const startX = (screenWidth - totalWidth) / 2;
        return { startX, cardSpacing, cardWidth };
    }

    /**
     * Скрывает витрину и все связанные элементы
     */
    hideShop() {
        // Скрываем карточки магазина
        this.shopCards.forEach(cardData => {
            if (cardData) {
                if (cardData.card && cardData.card.setVisible) cardData.card.setVisible(false);
                if (cardData.nameText && cardData.nameText.setVisible) cardData.nameText.setVisible(false);
                if (cardData.costText && cardData.costText.setVisible) cardData.costText.setVisible(false);
                if (cardData.icon && cardData.icon.setVisible) cardData.icon.setVisible(false);
                if (cardData.border && cardData.border.setVisible) cardData.border.setVisible(false);
                if (cardData.specialIcon && cardData.specialIcon.setVisible) cardData.specialIcon.setVisible(false);
                if (cardData.abilityIndicator && cardData.abilityIndicator.setVisible) cardData.abilityIndicator.setVisible(false);
            }
        });
        
        // Скрываем кнопку реролла
        if (this.rerollButton && this.rerollButton.setVisible) this.rerollButton.setVisible(false);
        if (this.rerollText && this.rerollText.setVisible) this.rerollText.setVisible(false);
        if (this.rerollCostText && this.rerollCostText.setVisible) this.rerollCostText.setVisible(false);
        
        // Скрываем кнопку FIGHT
        if (this.fightButton && this.fightButton.setVisible) this.fightButton.setVisible(false);
    }

    /**
     * Показывает витрину и все связанные элементы
     */
    showShop() {
        // Показываем карточки магазина
        this.shopCards.forEach(cardData => {
            if (cardData) {
                if (cardData.card && cardData.card.setVisible) cardData.card.setVisible(true);
                if (cardData.nameText && cardData.nameText.setVisible) cardData.nameText.setVisible(true);
                if (cardData.costText && cardData.costText.setVisible) cardData.costText.setVisible(true);
                if (cardData.icon && cardData.icon.setVisible) cardData.icon.setVisible(true);
                if (cardData.border && cardData.border.setVisible) cardData.border.setVisible(true);
                if (cardData.specialIcon && cardData.specialIcon.setVisible) cardData.specialIcon.setVisible(true);
                if (cardData.abilityIndicator && cardData.abilityIndicator.setVisible) cardData.abilityIndicator.setVisible(true);
            }
        });
        
        // Показываем кнопку реролла
        if (this.rerollButton && this.rerollButton.setVisible) this.rerollButton.setVisible(true);
        if (this.rerollText && this.rerollText.setVisible) this.rerollText.setVisible(true);
        if (this.rerollCostText && this.rerollCostText.setVisible) this.rerollCostText.setVisible(true);
        
        // Показываем кнопку FIGHT
        if (this.fightButton && this.fightButton.setVisible) this.fightButton.setVisible(true);
    }

    /**
     * Показывает область продажи вместо магазина
     */
    showSellArea(unit) {
        // Скрываем витрину при показе области продажи
        this.hideShop();
        
        // Рассчитываем позицию области продажи на основе размера поля
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 300; // 300 пикселей отступ от поля
        
        // Удаляем все карточки магазина
        this.shopCards.forEach(cardData => {
            if (cardData) {
                cardData.card.destroy();
                if (cardData.icon) cardData.icon.destroy();
                if (cardData.border) cardData.border.destroy();
                if (cardData.nameText) cardData.nameText.destroy();
                if (cardData.costText) cardData.costText.destroy();
                if (cardData.specialIcon) cardData.specialIcon.destroy();
                if (cardData.abilityIndicator) cardData.abilityIndicator.destroy();
            }
        });
        this.shopCards = [];

        // Рассчитываем цену продажи
        // Если передан объект юнита, используем его метод, иначе берем из unitData
        let sellPrice;
        if (unit && unit.getSellPrice) {
            sellPrice = unit.getSellPrice();
        } else if (unit && unit.sellPrice !== undefined) {
            // unit - это unitData
            sellPrice = unit.sellPrice;
        } else {
            sellPrice = 0;
        }
        
        // Создаем большую область продажи
        const sellRect = this.add.rectangle(
            this.cameras.main.centerX, shopY - 20,
            300, 80,
            0xFF4444, 0.8
        );
        sellRect.setStrokeStyle(3, 0xFF0000);
        sellRect.setDepth(100);
        
        // Текст "ПРОДАТЬ"
        const sellText = this.add.text(
            this.cameras.main.centerX, shopY - 40,
            'ПРОДАТЬ',
            {
                fontSize: '24px',
                fill: '#FFFFFF',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        sellText.setDepth(101);
        
        // Цена продажи
        const priceText = this.add.text(
            this.cameras.main.centerX, shopY,
            `${sellPrice} монет`,
            {
                fontSize: '18px',
                fill: '#FFD700',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        priceText.setDepth(101);
        
        // Делаем область интерактивной для drop
        sellRect.setInteractive();
        
        // Сохраняем ссылки на элементы
        this.sellArea = {
            rect: sellRect,
            text: sellText,
            priceText: priceText
        };
        
        console.log(`Область продажи показана. Цена: ${sellPrice} монет`);
    }

    /**
     * Скрывает область продажи и восстанавливает магазин
     */
    hideSellArea() {
        if (this.sellArea) {
            this.sellArea.rect.destroy();
            this.sellArea.text.destroy();
            this.sellArea.priceText.destroy();
            this.sellArea = null;
        }
        
        // Восстанавливаем магазин
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 250;
        const { startX, cardSpacing, cardWidth } = this.calculateShopPositions();
        this.createShopCards(shopY, startX, cardSpacing, cardWidth);
        
        // Восстанавливаем кнопку Fight и другие UI элементы
        this.showShop();
        
        console.log('Область продажи скрыта, магазин восстановлен');
    }

    generateShopUnits() {
        const { UNIT_TYPES } = window.gameConfig;
        const unitTypes = Object.keys(UNIT_TYPES);
        
        this.shopUnits = [];
        for (let i = 0; i < 4; i++) { // Увеличено с 3 до 4
            const randomType = Phaser.Utils.Array.GetRandom(unitTypes);
            this.shopUnits.push(randomType);
        }
        
        console.log('Сгенерированы юниты в магазине:', this.shopUnits);
    }

    createShopCards(shopY, startX, cardSpacing, cardWidth) {
        const { UNIT_TYPES } = window.gameConfig;
        
        // Очищаем старые карточки и все их элементы
        this.shopCards.forEach(cardData => {
            if (cardData) {
                // Удаляем все элементы карточки
                if (cardData.card && cardData.card.destroy) cardData.card.destroy();
                if (cardData.icon && cardData.icon.destroy) cardData.icon.destroy();
                if (cardData.border && cardData.border.destroy) cardData.border.destroy();
                if (cardData.nameText && cardData.nameText.destroy) cardData.nameText.destroy();
                if (cardData.costText && cardData.costText.destroy) cardData.costText.destroy();
                if (cardData.specialIcon && cardData.specialIcon.destroy) cardData.specialIcon.destroy();
                if (cardData.abilityIndicator && cardData.abilityIndicator.destroy) cardData.abilityIndicator.destroy();
            }
        });
        this.shopCards = [];
        
        this.shopUnits.forEach((type, index) => {
            const unitData = UNIT_TYPES[type];
            const x = startX + (index * cardSpacing);
            
            // Создаем основную карточку
            const card = this.add.rectangle(x, shopY, cardWidth, 100, unitData.color)
                .setInteractive({ draggable: true })
                .on('pointerdown', () => {
                    this.selectUnit(type, index);
                })
                .on('dragstart', (pointer, dragX, dragY) => {
                    this.onDragStart(type, index, pointer);
                })
                .on('drag', (pointer, dragX, dragY) => {
                    this.onDrag(pointer, dragX, dragY);
                })
                .on('dragend', (pointer) => {
                    this.onDragEnd(pointer, type, index);
                });

            // Иконки юнитов - соответствуют реальным размерам
            const iconScale = 0.6;
            const iconSize = this.gridSystem.cellSize * iconScale;
            const iconWidth = iconSize * unitData.size.width;
            const iconHeight = iconSize * unitData.size.height;
            
            // Создаем иконку юнита
            let icon, border, specialIcon;
            
            if (type === 'ARCHER') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
            } else if (type === 'WARRIOR') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
            } else if (type === 'BARBARIAN') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
            } else if (type === 'HEALER') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, '+', {
                    fontSize: '12px',
                    fill: '#ffffff',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            } else if (type === 'MAGE') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.star(x, shopY - 20, 3, 6, 3, 0xFFD700);
            } else if (type === 'TANK') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.rectangle(x, shopY - 20, iconWidth - 4, iconHeight - 4, 0xC0C0C0, 0.3);
            } else if (type === 'ASSASSIN') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, '!', {
                    fontSize: '14px',
                    fill: '#FFD700',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            } else if (type === 'DRUID') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, '♠', {
                    fontSize: '12px',
                    fill: '#00FF00',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            } else if (type === 'WITCH') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, '☠', {
                    fontSize: '12px',
                    fill: '#FF00FF',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            }

            // Создаем тексты
            const nameText = this.add.text(x, shopY + 25, unitData.name, {
                fontSize: '16px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            const costText = this.add.text(x, shopY + 45, 'БЕСПЛАТНО', {
                fontSize: '12px',
                fill: '#00FF00'
            }).setOrigin(0.5);
            
            // Создаем индикатор способности
            let abilityIndicator = null;
            if (unitData.hasTaunt) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xFF0000);
            } else if (unitData.hasBattleCry) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xFFD700);
            } else if (unitData.healAmount) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x00FF00);
            } else if (unitData.maxTargets) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x9B4AE2);
            } else if (unitData.hasShield) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xC0C0C0);
            } else if (unitData.hasCritical) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xFFD700);
            } else if (unitData.hasThorns) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x8B4513);
            } else if (unitData.hasCurse) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x4B0082);
            }
            
            // Сохраняем все элементы карточки для последующего удаления
            this.shopCards.push({
                card: card,
                icon: icon,
                border: border,
                nameText: nameText,
                costText: costText,
                specialIcon: specialIcon,
                abilityIndicator: abilityIndicator
            });
        });
    }

    createRerollButton(shopY, startX, cardSpacing) {
        // Позиционируем кнопку REROLL справа от карточек
        const rerollX = startX + (this.shopUnits.length * cardSpacing) + 20;
        
        const rerollButton = this.add.rectangle(rerollX, shopY, 60, 40, 0x666666)
            .setInteractive()
            .on('pointerdown', () => {
                this.rerollShop();
            });
            
        this.add.text(rerollX, shopY, 'REROLL\n5 монет', {
            fontSize: '10px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        
        this.rerollButton = rerollButton;
    }

    createRoundDisplay() {
        // Центрируем текст раунда по ширине экрана
        const screenWidth = this.cameras.main.width;
        this.roundText = this.add.text(screenWidth / 2, 30, `РАУНД ${this.currentRound}/${this.maxRounds}`, {
            fontSize: '24px',
            fill: '#FFD700',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);
        
        // Отображение результатов предыдущих раундов
        this.updateRoundResults();
    }

    updateRoundResults() {
        // Удаляем старые тексты результатов
        if (this.resultsText) {
            this.resultsText.destroy();
        }
        
        if (this.roundResults.length > 0) {
            // Подсчитываем счет
            const playerWins = this.roundResults.filter(result => result).length;
            const enemyWins = this.roundResults.length - playerWins;
            
            let resultsText = `Счет: ${playerWins}-${enemyWins} | `;
            this.roundResults.forEach((result, index) => {
                resultsText += result ? 'В' : 'П'; // В = Победа, П = Поражение
                if (index < this.roundResults.length - 1) resultsText += '-';
            });
            
            this.resultsText = this.add.text(240, 60, resultsText, {
                fontSize: '14px',
                fill: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }
    }

    rerollShop() {
        if (this.economySystem.canAfford(5)) {
            this.economySystem.spendCoins(5);
            this.updateCoinsDisplay();
            this.generateShopUnits();
            const { GRID_HEIGHT } = window.gameConfig;
            const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
            const shopY = fieldHeight + 250;
            const { startX, cardSpacing } = this.calculateShopPositions();
            this.createShopCards(shopY, startX, cardSpacing);
            console.log('Магазин обновлен за 5 монет');
        } else {
            console.log('Недостаточно монет для реролла!');
        }
    }

    removeCardFromShop(cardIndex) {
        // Удаляем конкретную карточку и все ее элементы
        if (cardIndex >= 0 && cardIndex < this.shopCards.length) {
            const cardData = this.shopCards[cardIndex];
            
            // Удаляем все элементы карточки
            if (cardData.card && cardData.card.destroy) cardData.card.destroy();
            if (cardData.icon && cardData.icon.destroy) cardData.icon.destroy();
            if (cardData.border && cardData.border.destroy) cardData.border.destroy();
            if (cardData.nameText && cardData.nameText.destroy) cardData.nameText.destroy();
            if (cardData.costText && cardData.costText.destroy) cardData.costText.destroy();
            if (cardData.specialIcon && cardData.specialIcon.destroy) cardData.specialIcon.destroy();
            if (cardData.abilityIndicator && cardData.abilityIndicator.destroy) cardData.abilityIndicator.destroy();
            
            this.shopCards.splice(cardIndex, 1);
            
            // Удаляем юнит из массива только если карточка была найдена
            this.shopUnits.splice(cardIndex, 1);
        }
        
        // Обновляем индексы оставшихся карточек
        this.shopCards.forEach((cardData, index) => {
            if (cardData.card) {
                cardData.card.off('pointerdown');
                cardData.card.on('pointerdown', () => {
                    this.selectUnit(this.shopUnits[index], index);
                });
            }
        });
        
        console.log('Карточка удалена из магазина, индекс:', cardIndex);
    }

    selectUnit(unitType, cardIndex = null) {
        if (this.isBattleActive) {
            console.log('Бой активен, нельзя покупать юнитов');
            return;
        }
        
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        console.log('Выбран юнит:', unitData.name, 'Цена:', unitData.cost, 'Монет:', this.economySystem.getCoins());
        
        // Юниты теперь бесплатные
        this.selectedUnitType = unitType;
        this.selectedUnitData = unitData;
        this.selectedCardIndex = cardIndex; // Сохраняем индекс карточки
        
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
        
        console.log('Юнит выбран, ожидаем клик по полю');
        
        // НЕ активируем режим размещения сразу - ждем клик по полю
    }


    /**
     * Обработчик кликов по полю для размещения юнитов
     */
    handleFieldClick(pointer) {
        // Проверяем, что выбран юнит и клик не по магазину
        if (!this.selectedUnitType || pointer.y > 700) {
            return;
        }
        
        // Проверяем, что не идет бой
        if (this.isBattleActive) {
            console.log('Бой активен, нельзя размещать юнитов');
            return;
        }
        
        // Удаляем подсказку
        if (this.hintText) {
            this.hintText.destroy();
            this.hintText = null;
        }
        
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        console.log('Клик по позиции:', pointer.x, pointer.y, '-> сетка:', gridPos);
        
        // Проверяем возможность размещения или мерджа
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridPos.x, 
            gridPos.y, 
            this.selectedUnitData.size, 
            this.selectedUnitType, 
            false // не враг
        );
        
        if (placementResult.canPlace) {
            if (placementResult.isMerge) {
                // МЕРДЖ
                console.log('Мердж юнита!', this.selectedUnitType);
                const success = placementResult.existingUnit.merge(this.selectedUnitType);
                
                if (success) {
                    // Юниты бесплатные - не тратим монеты
                    this.updateCoinsDisplay();
                    
                    // Удаляем карточку из магазина
                    if (this.selectedCardIndex !== null) {
                        this.removeCardFromShop(this.selectedCardIndex);
                    }
                    
                    this.selectedUnitType = null;
                    this.selectedUnitData = null;
                    this.selectedCardIndex = null;
                } else {
                    console.log('Мердж не удался. Попробуйте еще раз.');
                }
            } else {
                // ОБЫЧНОЕ РАЗМЕЩЕНИЕ
                console.log('Размещаем юнит в позиции:', gridPos);
                this.placeUnit(this.selectedUnitType, gridPos.x, gridPos.y);
                // Юниты бесплатные - не тратим монеты
                this.updateCoinsDisplay();
                
                // Удаляем карточку из магазина после успешной покупки
                if (this.selectedCardIndex !== null) {
                    this.removeCardFromShop(this.selectedCardIndex);
                }
                
                this.selectedUnitType = null;
                this.selectedUnitData = null;
                this.selectedCardIndex = null;
            }
        } else {
            console.log('Нельзя разместить в этой позиции. Попробуйте еще раз.');
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
            case 'HEALER':
                unit = new Healer(this, gridX, gridY);
                break;
            case 'MAGE':
                unit = new Mage(this, gridX, gridY);
                break;
            case 'TANK':
                unit = new Tank(this, gridX, gridY);
                break;
            case 'ASSASSIN':
                unit = new Assassin(this, gridX, gridY);
                break;
            case 'DRUID':
                unit = new Druid(this, gridX, gridY);
                break;
            case 'WITCH':
                unit = new Witch(this, gridX, gridY);
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
        
        // Скрываем витрину и кнопки во время боя
        this.hideShop();
        
        console.log('Спавним врагов...');
        this.spawnEnemies();
        
        console.log('Запускаем боевую систему...');
        console.log('Юнитов игрока:', this.playerUnits.length);
        console.log('Юнитов врага:', this.enemyUnits.length);
        
        this.battleSystem.startBattle(this.playerUnits, this.enemyUnits);
        
        console.log('Бой начат!');
    }

    spawnEnemies() {
        const { GRID_WIDTH, ENEMY_AREA_HEIGHT, UNIT_TYPES, STARTING_COINS, ROUND_COINS } = window.gameConfig;
        
        // Враг получает такой же бюджет, как у игрока в текущем раунде
        let enemyBudget = this.currentRound === 1 ? STARTING_COINS : ROUND_COINS;
        
        console.log('=== СПАВН ВРАГОВ ===');
        console.log('Бюджет врага:', enemyBudget, 'монет (как у игрока в раунде', this.currentRound, ')');
        
        // Типы юнитов, которые враг может купить (от дешевых к дорогим)
        const unitTypes = [
            { type: 'ARCHER', data: UNIT_TYPES.ARCHER },
            { type: 'WARRIOR', data: UNIT_TYPES.WARRIOR },
            { type: 'HEALER', data: UNIT_TYPES.HEALER },
            { type: 'BARBARIAN', data: UNIT_TYPES.BARBARIAN },
            { type: 'MAGE', data: UNIT_TYPES.MAGE },
            { type: 'TANK', data: UNIT_TYPES.TANK },
            { type: 'ASSASSIN', data: UNIT_TYPES.ASSASSIN },
            { type: 'DRUID', data: UNIT_TYPES.DRUID },
            { type: 'WITCH', data: UNIT_TYPES.WITCH }
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
                        case 'HEALER':
                            enemy = new Healer(this, x, y, true);
                            break;
                        case 'BARBARIAN':
                            enemy = new Barbarian(this, x, y, true);
                            break;
                        case 'MAGE':
                            enemy = new Mage(this, x, y, true);
                            break;
                        case 'TANK':
                            enemy = new Tank(this, x, y, true);
                            break;
                        case 'ASSASSIN':
                            enemy = new Assassin(this, x, y, true);
                            break;
                        case 'DRUID':
                            enemy = new Druid(this, x, y, true);
                            break;
                        case 'WITCH':
                            enemy = new Witch(this, x, y, true);
                            break;
                    }
                    
                    if (enemy) {
                        this.enemyUnits.push(enemy);
                        this.gridSystem.placeUnit(x, y, enemy);
                        enemyBudget -= selected.data.cost;
                        placed = true;
                        
                        // Случайный мердж для врага (30% шанс)
                        if (Math.random() < 0.3 && enemy.mergeLevel < 3) {
                            const mergeCount = Math.floor(Math.random() * (3 - enemy.mergeLevel)) + 1;
                            const mergeCost = mergeCount * selected.data.cost;
                            
                            if (enemyBudget >= mergeCost) {
                                for (let i = 0; i < mergeCount; i++) {
                                    enemy.merge(selected.type);
                                }
                                enemyBudget -= mergeCost;
                                console.log(`Враг мерджнул ${selected.data.name} ${mergeCount} раз! Уровень: ${enemy.mergeLevel}`);
                            }
                        }
                        
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
        
        // Показываем витрину и кнопки после окончания боя
        this.showShop();
        
        // Сохраняем результат раунда
        this.roundResults.push(victory);
        console.log(`Раунд ${this.currentRound} завершен. Результат: ${victory ? 'Победа' : 'Поражение'}`);
        
        // Убрано подсчет убитых врагов (больше не нужен для баланса)
        
        // Подсчитываем победы и поражения
        const playerWins = this.roundResults.filter(result => result).length;
        const enemyWins = this.roundResults.length - playerWins;
        
        console.log(`=== СЧЕТ МАТЧА ===`);
        console.log(`Игрок: ${playerWins} | Враг: ${enemyWins}`);
        
        // Проверяем условия завершения матча (Best of 5)
        const matchEnded = this.checkMatchEnd(playerWins, enemyWins);
        
        if (matchEnded) {
            this.endGame();
        } else if (this.currentRound >= this.maxRounds) {
            // Все 5 раундов сыграны (такое возможно при счете 2:2 -> 3:2)
            this.endGame();
        } else {
            this.prepareNextRound();
        }
    }
    
    checkMatchEnd(playerWins, enemyWins) {
        // Матч заканчивается, если кто-то набрал 3 победы
        if (playerWins >= this.winsNeeded) {
            console.log(`Игрок набрал ${this.winsNeeded} победы! Матч окончен.`);
            return true;
        }
        
        if (enemyWins >= this.winsNeeded) {
            console.log(`Враг набрал ${this.winsNeeded} победы! Матч окончен.`);
            return true;
        }
        
        return false;
    }

    prepareNextRound() {
        // Воскрешаем всех убитых юнитов
        this.resurrectUnits();
        
        // Переходим к следующему раунду
        this.currentRound++;
        if (this.roundText) {
            this.roundText.setText(`РАУНД ${this.currentRound}/${this.maxRounds}`);
        }
        
        // Даем монеты за новый раунд
        const { STARTING_COINS, ROUND_COINS } = window.gameConfig;
        const roundReward = this.currentRound === 1 ? STARTING_COINS : ROUND_COINS;
        
        this.economySystem.addCoins(roundReward);
        console.log(`=== НАЧАЛО РАУНДА ${this.currentRound} ===`);
        console.log(`Награда за раунд: ${roundReward} монет`);
        console.log(`Текущий баланс: ${this.economySystem.getCoins()} монет`);
        
        this.updateCoinsDisplay();
        
        // Перегенерируем магазин для нового раунда
        this.generateShopUnits();
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 250;
        const { startX, cardSpacing, cardWidth } = this.calculateShopPositions();
        this.createShopCards(shopY, startX, cardSpacing, cardWidth);
        console.log('Магазин перегенерирован для нового раунда');
        
        // Обновляем отображение результатов
        this.updateRoundResults();
    }

    resurrectUnits() {
        console.log('=== ВОСКРЕШЕНИЕ И ЛЕЧЕНИЕ ЮНИТОВ ===');
        
        // Воскрешаем и лечим всех юнитов игрока
        this.playerUnits.forEach(unit => {
            if (unit.isDead) {
                // ВОСКРЕШЕНИЕ
                unit.isDead = false;
                unit.hp = unit.maxHp;
                
                // ВАЖНО: Останавливаем все активные tweens на спрайте
                this.tweens.killTweensOf(unit.sprite);
                
                // Восстанавливаем спрайт
                unit.sprite.setAlpha(1);
                unit.sprite.setScale(1, 1);
                unit.sprite.setVisible(true);
                
                // Исправляем размер спрайта если это изображение
                if (unit.sprite.setDisplaySize) {
                    const spriteWidth = unit.size.width * this.gridSystem.cellSize;
                    const spriteHeight = unit.size.height * this.gridSystem.cellSize;
                    unit.sprite.setDisplaySize(spriteWidth, spriteHeight);
                    console.log('Исправляем размер спрайта после воскрешения:', spriteWidth, 'x', spriteHeight);
                }
                
                // Делаем hpBar снова видимыми
                if (unit.hpBar && unit.hpBar.scene) {
                    unit.hpBar.setVisible(true);
                }
                if (unit.hpBarBg && unit.hpBarBg.scene) {
                    unit.hpBarBg.setVisible(true);
                }
                
                // Пересоздаем hpBar если он был уничтожен
                if (!unit.hpBar || !unit.hpBar.scene) {
                    const barWidth = unit.size.width * this.gridSystem.cellSize * 0.6;
                    const barHeight = 4;
                    const barY = unit.sprite.y - (unit.size.height * this.gridSystem.cellSize * 0.4);
                    
                    unit.hpBarBg = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x333333);
                    unit.hpBar = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x00FF00);
                }
                
                // Заново размещаем юнита на сетке (в той же позиции)
                this.gridSystem.placeUnit(unit.gridX, unit.gridY, unit);
                
                // Пересоздаем звездочки мерджа если они есть
                if (unit.mergeLevel > 0) {
                    unit.createMergeStars();
                }
                
                // Добавляем drag-and-drop обработчики заново
                if (unit.sprite.type === 'Container') {
                    unit.sprite.setSize(unit.sprite.width || 100, unit.sprite.height || 100);
                }
                unit.sprite.setInteractive({ draggable: true })
                    .on('dragstart', (pointer) => {
                        this.onUnitDragStart(unit, pointer);
                    })
                    .on('drag', (pointer, dragX, dragY) => {
                        // Не двигаем фактический спрайт юнита, только призрак
                        if (unit.sprite && unit.sprite.setPosition) {
                            unit.sprite.setPosition(
                                this.gridSystem.gridOffsetX + (unit.gridX * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2,
                                this.gridSystem.gridOffsetY + (unit.gridY * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2
                            );
                        }
                        this.onUnitDrag(pointer);
                    })
                    .on('dragend', (pointer, dragX, dragY) => {
                        this.onUnitDragEnd(unit, pointer, dragX, dragY);
                    });
                
                console.log(`Воскрешен юнит игрока: ${unit.constructor.name} в позиции (${unit.gridX}, ${unit.gridY})`);
            } else {
                // ЛЕЧЕНИЕ выживших юнитов
                const oldHp = unit.hp;
                unit.hp = unit.maxHp;
                console.log(`Вылечен юнит игрока: ${unit.constructor.name} (${oldHp} -> ${unit.hp} HP)`);
                
                // Убеждаемся, что drag-and-drop обработчики есть
                if (!unit.sprite.input || !unit.sprite.input.draggable) {
                    if (unit.sprite.type === 'Container') {
                        unit.sprite.setSize(unit.sprite.width || 100, unit.sprite.height || 100);
                    }
                    unit.sprite.setInteractive({ draggable: true })
                        .on('dragstart', (pointer) => {
                            this.onUnitDragStart(unit, pointer);
                        })
                        .on('drag', (pointer, dragX, dragY) => {
                            // Не двигаем фактический спрайт юнита, только призрак
                            if (unit.sprite && unit.sprite.setPosition) {
                                unit.sprite.setPosition(
                                    this.gridSystem.gridOffsetX + (unit.gridX * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2,
                                    this.gridSystem.gridOffsetY + (unit.gridY * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2
                                );
                            }
                            this.onUnitDrag(pointer);
                        })
                        .on('dragend', (pointer, dragX, dragY) => {
                            this.onUnitDragEnd(unit, pointer, dragX, dragY);
                        });
                }
            }
            
            // Обновляем HP bar для всех юнитов
            unit.updateHpBar();
        });
        
        // Воскрешаем и лечим всех юнитов врага
        this.enemyUnits.forEach(unit => {
            if (unit.isDead) {
                // ВОСКРЕШЕНИЕ
                unit.isDead = false;
                unit.hp = unit.maxHp;
                
                // ВАЖНО: Останавливаем все активные tweens на спрайте
                this.tweens.killTweensOf(unit.sprite);
                
                // Восстанавливаем спрайт
                unit.sprite.setAlpha(1);
                unit.sprite.setScale(1, 1);
                unit.sprite.setVisible(true);
                
                // Исправляем размер спрайта если это изображение
                if (unit.sprite.setDisplaySize) {
                    const spriteWidth = unit.size.width * this.gridSystem.cellSize;
                    const spriteHeight = unit.size.height * this.gridSystem.cellSize;
                    unit.sprite.setDisplaySize(spriteWidth, spriteHeight);
                    console.log('Исправляем размер спрайта врага после воскрешения:', spriteWidth, 'x', spriteHeight);
                }
                
                // Делаем hpBar снова видимыми
                if (unit.hpBar && unit.hpBar.scene) {
                    unit.hpBar.setVisible(true);
                }
                if (unit.hpBarBg && unit.hpBarBg.scene) {
                    unit.hpBarBg.setVisible(true);
                }
                
                // Пересоздаем hpBar если он был уничтожен
                if (!unit.hpBar || !unit.hpBar.scene) {
                    const barWidth = unit.size.width * this.gridSystem.cellSize * 0.6;
                    const barHeight = 4;
                    const barY = unit.sprite.y - (unit.size.height * this.gridSystem.cellSize * 0.4);
                    
                    unit.hpBarBg = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x333333);
                    unit.hpBar = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x00FF00);
                }
                
                // Заново размещаем юнита на сетке (в той же позиции)
                this.gridSystem.placeUnit(unit.gridX, unit.gridY, unit);
                
                // Пересоздаем звездочки мерджа если они есть
                if (unit.mergeLevel > 0) {
                    unit.createMergeStars();
                }
                
                console.log(`Воскрешен юнит врага: ${unit.constructor.name} в позиции (${unit.gridX}, ${unit.gridY})`);
            } else {
                // ЛЕЧЕНИЕ выживших юнитов
                const oldHp = unit.hp;
                unit.hp = unit.maxHp;
                console.log(`Вылечен юнит врага: ${unit.constructor.name} (${oldHp} -> ${unit.hp} HP)`);
            }
            
            // Обновляем HP bar для всех юнитов
            unit.updateHpBar();
        });
        
        console.log(`Все юниты воскрешены и вылечены. Игрок: ${this.playerUnits.length}, Враг: ${this.enemyUnits.length}`);
    }

    endGame() {
        // Подсчитываем итоговый результат
        const playerWins = this.roundResults.filter(result => result).length;
        const enemyWins = this.roundResults.length - playerWins;
        
        console.log(`=== МАТЧ ЗАВЕРШЕН ===`);
        console.log(`Финальный счет: ${playerWins}-${enemyWins}`);
        
        let finalResult;
        if (playerWins >= this.winsNeeded) {
            finalResult = 'ПОБЕДА!';
            console.log(`Итоговый результат: ПОБЕДА! (${playerWins}-${enemyWins})`);
        } else if (enemyWins >= this.winsNeeded) {
            finalResult = 'ПОРАЖЕНИЕ!';
            console.log(`Итоговый результат: ПОРАЖЕНИЕ! (${playerWins}-${enemyWins})`);
        } else {
            // Не должно происходить в Bo5, но на всякий случай
            finalResult = playerWins > enemyWins ? 'ПОБЕДА!' : 'ПОРАЖЕНИЕ!';
            console.log(`Итоговый результат: ${finalResult} (${playerWins}-${enemyWins})`);
        }
        
        // Показываем итоговый результат
        this.showFinalResult(finalResult, playerWins, enemyWins);
    }

    showFinalResult(result, playerWins, enemyWins) {
        // ВАЖНО: Отключаем боевую систему полностью
        this.isBattleActive = false;
        if (this.battleSystem) {
            this.battleSystem.isActive = false;
        }
        
        // Создаем затемнение на весь экран (больше чем размеры игры)
        const overlay = this.add.rectangle(0, 0, this.scale.gameSize.width * 2, this.scale.gameSize.height * 2, 0x000000, 0.7);
        overlay.setOrigin(0, 0);
        overlay.setScrollFactor(0); // Фиксированное положение относительно камеры
        
        // Итоговый результат
        const resultText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, result, {
            fontSize: '32px',
            fill: result === 'ПОБЕДА!' ? '#00FF00' : '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        resultText.setScrollFactor(0);
        
        // Финальный счет (Best of 5)
        const scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2, `Финальный счет: ${playerWins}-${enemyWins}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        scoreText.setScrollFactor(0);
        
        // Детали раундов
        let roundsText = '';
        this.roundResults.forEach((result, index) => {
            roundsText += result ? 'В' : 'П';
            if (index < this.roundResults.length - 1) roundsText += '-';
        });
        
        const roundsTextElement = this.add.text(this.scale.width / 2, this.scale.height / 2 + 30, `Раунды: ${roundsText}`, {
            fontSize: '14px',
            fill: '#CCCCCC'
        }).setOrigin(0.5);
        roundsTextElement.setScrollFactor(0);
        
        // Кнопка новой игры
        const newGameButton = this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 100, 200, 50, 0x4A90E2)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Перезапуск игры...');
                this.scene.restart();
            });
        newGameButton.setScrollFactor(0);
            
        const buttonText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'НОВАЯ ИГРА', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        buttonText.setScrollFactor(0);
    }

    cleanupDeadUnits() {
        this.playerUnits = this.playerUnits.filter(unit => unit.isAlive());
        this.enemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        this.gridSystem.clearDeadUnits();
    }

    // ============================================================================
    // DRAG-AND-DROP СИСТЕМА
    // ============================================================================
    
    /**
     * Начало перетаскивания юнита из витрины
     */
    onDragStart(unitType, cardIndex, pointer) {
        if (this.isBattleActive) return;
        
        // Очищаем предыдущие призраки на всякий случай
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        // Юниты теперь бесплатные - убираем проверку стоимости
        
        this.isDragging = true;
        this.isDraggingFromField = false; // Сбрасываем флаг - перетаскивание из магазина
        this.selectedUnitType = unitType;
        this.selectedUnitData = unitData;
        this.selectedCardIndex = cardIndex;
        
        // НЕ показываем область продажи при перетаскивании из магазина
        // Область продажи только для уже размещенных юнитов
        
        // Создаем призрачную копию юнита
        this.createDragGhost(unitType, pointer.x, pointer.y);
        
        console.log('Начало перетаскивания:', unitData.name);
    }
    
    /**
     * Создает призрачную копию юнита для перетаскивания
     */
    createDragGhost(unitType, x, y) {
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        const size = unitData.size;
        const cellSize = this.gridSystem.cellSize;
        
        // Полупрозрачный прямоугольник размером с юнита
        this.dragGhost = this.add.rectangle(
            x, y, 
            size.width * cellSize, 
            size.height * cellSize, 
            unitData.color, 
            0.5 // Полупрозрачность
        );
        this.dragGhost.setDepth(1000); // Поверх всего
        
        // Рамка
        const border = this.add.rectangle(
            x, y,
            size.width * cellSize,
            size.height * cellSize,
            0xFFFFFF, 0
        ).setStrokeStyle(2, 0xFFFFFF);
        border.setDepth(1001);
        
        this.dragGhostElements.push(this.dragGhost, border);
    }
    
    /**
     * Обновление позиции призрака и подсветка клеток
     */
    onDrag(pointer, dragX, dragY) {
        if (!this.isDragging) return;
        
        // Обновляем позицию призрака
        this.dragGhostElements.forEach(elem => {
            elem.setPosition(pointer.x, pointer.y);
        });
        
        // Получаем позицию на сетке
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        
        // Обновляем подсветку клеток
        this.updateCellHighlight(gridPos.x, gridPos.y);
    }
    
    /**
     * Подсветка валидных/невалидных клеток
     */
    updateCellHighlight(gridX, gridY) {
        // Удаляем старую подсветку
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        const size = this.selectedUnitData.size;
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridX, gridY, size, this.selectedUnitType, false
        );
        
        // Проверяем, есть ли у юнита L-образная форма
        const unitData = window.gameConfig.UNIT_TYPES[this.selectedUnitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (occupiedCells) {
            // L-образная форма - подсвечиваем только занятые клетки
            occupiedCells.forEach(cell => {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                
                const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                const highlight = this.add.rectangle(
                    cellX, cellY,
                    this.gridSystem.cellSize,
                    this.gridSystem.cellSize,
                    color, 0.3
                );
                highlight.setDepth(500);
                this.highlightedCells.push(highlight);
            });
        } else {
            // Стандартная прямоугольная форма
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    
                    const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                    const highlight = this.add.rectangle(
                        cellX, cellY,
                        this.gridSystem.cellSize,
                        this.gridSystem.cellSize,
                        color, 0.3
                    );
                    highlight.setDepth(500);
                    this.highlightedCells.push(highlight);
                }
            }
        }
        
        // Если возможен мердж, добавляем специальный индикатор
        if (placementResult.isMerge) {
            const mergeIcon = this.add.star(
                this.highlightedCells[0].x,
                this.highlightedCells[0].y,
                5, 8, 4, 0xFFD700
            );
            mergeIcon.setDepth(501);
            this.highlightedCells.push(mergeIcon);
        }
    }
    
    /**
     * Завершение перетаскивания
     */
    onDragEnd(pointer, unitType, cardIndex) {
        if (!this.isDragging) return;
        
        // Удаляем призрак и подсветку
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        
        // Проверяем, можем ли разместить
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridPos.x, gridPos.y,
            this.selectedUnitData.size,
            this.selectedUnitType,
            false
        );
        
        if (placementResult.canPlace) {
            if (placementResult.isMerge) {
                // МЕРДЖ - только мерджим существующий юнит
                console.log('Мердж из магазина:', this.selectedUnitType);
                const success = placementResult.existingUnit.merge(this.selectedUnitType);
                if (success) {
                    // Юниты бесплатные - не тратим монеты
                    this.updateCoinsDisplay();
                    this.removeCardFromShop(cardIndex);
                    console.log('Мердж успешен!');
                } else {
                    console.log('Мердж не удался');
                }
            } else {
                // РАЗМЕЩЕНИЕ - создаем новый юнит
                console.log('Размещение из магазина:', this.selectedUnitType);
                this.placeUnit(this.selectedUnitType, gridPos.x, gridPos.y);
                // Юниты бесплатные - не тратим монеты
                this.updateCoinsDisplay();
                this.removeCardFromShop(cardIndex);
            }
        } else {
            console.log('Нельзя разместить в этой позиции');
        }
        
        // Сброс состояния
        this.isDragging = false;
        this.selectedUnitType = null;
        this.selectedUnitData = null;
        this.selectedCardIndex = null;
        
        // Дополнительная очистка на всякий случай
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
    }
    
    /**
     * Начало перетаскивания размещенного юнита
     */
    onUnitDragStart(unit, pointer) {
        if (this.isBattleActive) {
            console.log('Бой активен, нельзя перетаскивать юнитов');
            return;
        }
        
        console.log('onUnitDragStart вызван для:', unit.constructor.name);
        
        this.isDragging = true;
        this.draggedUnit = unit;
        
        // Показываем область продажи только если юнит с поля
        // Если юнит из магазина, область продажи не показываем
        if (this.isDraggingFromField) {
            this.showSellArea(unit);
        }
        
        // Создаем призрачную копию юнита
        this.createUnitDragGhost(unit, pointer.x, pointer.y);
        
        console.log('Начало перетаскивания юнита:', unit.constructor.name);
    }
    
    /**
     * Создает призрачную копию размещенного юнита
     */
    createUnitDragGhost(unit, x, y) {
        const size = unit.size;
        const cellSize = this.gridSystem.cellSize;
        
        // Полупрозрачный прямоугольник размером с юнита
        this.dragGhost = this.add.rectangle(
            x, y, 
            size.width * cellSize, 
            size.height * cellSize, 
            unit.color, 
            0.5 // Полупрозрачность
        );
        this.dragGhost.setDepth(1000); // Поверх всего
        
        // Рамка
        const border = this.add.rectangle(
            x, y,
            size.width * cellSize,
            size.height * cellSize,
            0xFFFFFF, 0
        ).setStrokeStyle(2, 0xFFFFFF);
        border.setDepth(1001);
        
        this.dragGhostElements.push(this.dragGhost, border);
    }
    
    /**
     * Обновление позиции призрака юнита
     */
    onUnitDrag(pointer) {
        if (!this.isDragging || !this.draggedUnit) {
            console.log('onUnitDrag: не перетаскиваем или нет юнита');
            return;
        }
        
        console.log('onUnitDrag: обновляем позицию призрака');
        
        // Обновляем позицию призрака
        this.dragGhostElements.forEach(elem => {
            elem.setPosition(pointer.x, pointer.y);
        });
        
        // Проверяем, находится ли курсор над областью продажи
        if (this.sellArea && this.sellArea.rect) {
            const sellRect = this.sellArea.rect;
            const bounds = sellRect.getBounds();
            const inside =
                pointer.x >= bounds.x &&
                pointer.x <= bounds.x + bounds.width &&
                pointer.y >= bounds.y &&
                pointer.y <= bounds.y + bounds.height;
            
            if (inside) {
                // Подсвечиваем область продажи
                if (sellRect.fillColor !== 0x00FF00) {
                    sellRect.setFillStyle(0x00FF00, 0.8);
                    console.log('Курсор над областью продажи');
                }
            } else if (sellRect.fillColor !== 0xFF4444) {
                // Убираем подсветку
                sellRect.setFillStyle(0xFF4444, 0.8);
            }
        }
        
        // Получаем позицию на сетке
        console.log('onUnitDrag координаты:', pointer.x, pointer.y);
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        console.log('onUnitDrag gridPos:', gridPos);
        
        // Проверяем валидность координат
        if (isNaN(gridPos.x) || isNaN(gridPos.y)) {
            console.log('onUnitDrag: невалидные координаты, пропускаем');
            return;
        }
        
        // Обновляем подсветку клеток
        this.updateUnitCellHighlight(gridPos.x, gridPos.y);
    }
    
    /**
     * Подсветка клеток для перемещения юнита
     */
    updateUnitCellHighlight(gridX, gridY) {
        // Удаляем старую подсветку
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        // Проверяем валидность координат
        if (isNaN(gridX) || isNaN(gridY)) {
            return;
        }
        
        const size = this.draggedUnit.size;
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridX, gridY, size, this.draggedUnit.unitType, false
        );
        
        // Проверяем, есть ли у юнита L-образная форма
        const unitData = window.gameConfig.UNIT_TYPES[this.draggedUnit.unitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (occupiedCells) {
            // L-образная форма - подсвечиваем только занятые клетки
            occupiedCells.forEach(cell => {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                
                const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                const highlight = this.add.rectangle(
                    cellX, cellY,
                    this.gridSystem.cellSize,
                    this.gridSystem.cellSize,
                    color, 0.3
                );
                highlight.setDepth(500);
                this.highlightedCells.push(highlight);
            });
        } else {
            // Стандартная прямоугольная форма
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    
                    const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                    const highlight = this.add.rectangle(
                        cellX, cellY,
                        this.gridSystem.cellSize,
                        this.gridSystem.cellSize,
                        color, 0.3
                    );
                    highlight.setDepth(500);
                    this.highlightedCells.push(highlight);
                }
            }
        }
        
        // Если возможен мердж, добавляем специальный индикатор
        if (placementResult.isMerge) {
            const mergeIcon = this.add.star(
                this.highlightedCells[0].x,
                this.highlightedCells[0].y,
                5, 8, 4, 0xFFD700
            );
            mergeIcon.setDepth(501);
            this.highlightedCells.push(mergeIcon);
        }
    }
    
    /**
     * Завершение перетаскивания юнита
     */
    onUnitDragEnd(unit, pointer, dragX, dragY) {
        if (!this.isDragging || !this.draggedUnit) {
            console.log('onUnitDragEnd: не перетаскиваем или нет юнита');
            return;
        }
        
        console.log('onUnitDragEnd: завершение перетаскивания');
        
        // Удаляем призрак и подсветку
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        // Используем pointer.x и pointer.y для абсолютных координат
        // dragX и dragY - это относительные координаты от начальной позиции
        const worldX = pointer.x;
        const worldY = pointer.y;
        
        console.log('Координаты drop:', worldX, worldY);
        console.log('dragX, dragY:', dragX, dragY);
        
        // Проверяем валидность координат pointer
        if (isNaN(worldX) || isNaN(worldY) || worldX === undefined || worldY === undefined) {
            console.log('Невалидные координаты pointer, отменяем перетаскивание');
            this.isDragging = false;
            this.isDraggingFromField = false;
            this.draggedUnit = null;
            return;
        }
        
        // Проверяем, находится ли курсор над областью продажи
        if (this.sellArea && this.sellArea.rect) {
            const sellRect = this.sellArea.rect;
            const bounds = sellRect.getBounds();
            const inside =
                worldX >= bounds.x &&
                worldX <= bounds.x + bounds.width &&
                worldY >= bounds.y &&
                worldY <= bounds.y + bounds.height;
            
            if (inside) {
                // ПРОДАЖА ЮНИТА
                console.log('Продаем юнит');
                const sellPrice = this.draggedUnit.getSellPrice();
                
                // Добавляем монеты
                this.economySystem.addCoins(sellPrice);
                this.updateCoinsDisplay();
                
                // Удаляем юнит с поля
                this.draggedUnit.die();
                this.gridSystem.removeUnit(this.draggedUnit);
                
                console.log(`Юнит продан за ${sellPrice} монет`);
                
                // Скрываем область продажи
                this.hideSellArea();
                
                // Сброс состояния
                this.isDragging = false;
                this.draggedUnit = null;
                return;
            }
        }
        
        const gridPos = this.gridSystem.getGridPosition(worldX, worldY);
        console.log('Позиция drop:', gridPos);
        
        // Проверяем валидность координат
        if (isNaN(gridPos.x) || isNaN(gridPos.y)) {
            console.log('Невалидные координаты, отменяем перетаскивание');
            this.hideSellArea(); // Скрываем область продажи
            this.isDragging = false;
            this.isDraggingFromField = false;
            this.draggedUnit = null;
            return;
        }
        
        // Проверяем, можем ли переместить
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridPos.x, gridPos.y,
            this.draggedUnit.size,
            this.draggedUnit.unitType,
            false
        );
        
        console.log('Результат размещения:', placementResult);
        
        if (placementResult.canPlace) {
            if (placementResult.isMerge) {
                // Проверяем, что не мерджим юнит сам с собой
                if (placementResult.existingUnit === this.draggedUnit) {
                    console.log('Нельзя мерджить юнит сам с собой');
                    this.hideSellArea(); // Скрываем область продажи
                    this.isDragging = false;
                    this.draggedUnit = null;
                    return;
                }
                
                // МЕРДЖ с существующим юнитом
                console.log('Выполняем мердж');
                const success = placementResult.existingUnit.merge(this.draggedUnit.unitType);
                
                if (success) {
                    // Удаляем перетаскиваемый юнит
                    this.draggedUnit.die();
                    this.gridSystem.removeUnit(this.draggedUnit);
                } else {
                    console.log('Мердж не удался');
                }
            } else {
                // ПЕРЕМЕЩЕНИЕ
                console.log('Выполняем перемещение');
                this.gridSystem.removeUnit(this.draggedUnit);
                
                // Обновляем координаты ПЕРЕД размещением для L-образных юнитов
                this.draggedUnit.gridX = gridPos.x;
                this.draggedUnit.gridY = gridPos.y;
                
                this.gridSystem.placeUnit(gridPos.x, gridPos.y, this.draggedUnit);
                this.draggedUnit.updateMergeStars();
                
                // Обновляем позицию эффектов для L-образных юнитов
                this.draggedUnit.setPosition(
                    this.gridSystem.gridOffsetX + (gridPos.x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2,
                    this.gridSystem.gridOffsetY + (gridPos.y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2
                );
            }
        } else {
            console.log('Нельзя разместить, отменяем перетаскивание');
        }
        
        // Скрываем область продажи
        this.hideSellArea();
        
        // Сброс состояния
        this.isDragging = false;
        this.isDraggingFromField = false;
        this.draggedUnit = null;
    }
}

// Стартовое меню
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Адаптивное позиционирование для стартового экрана
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        
        this.add.text(centerX, centerY - 100, 'БАТТЛЕР РПГ', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 50, 'Прототип', {
            fontSize: '24px',
            fill: '#cccccc'
        }).setOrigin(0.5);

        const startButton = this.add.rectangle(centerX, centerY + 20, 250, 60, 0x4A90E2)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });

        this.add.text(centerX, centerY + 20, 'НАЧАТЬ ИГРУ', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 100, 'Размещайте юнитов на поле\nи сражайтесь с врагами!', {
            fontSize: '16px',
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
    width: 800,  // Увеличена ширина для лучшего использования экрана
    height: 1400, // Увеличена высота для витрины
    parent: 'game-container',
    backgroundColor: '#16213e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 400,
            height: 600
        },
        max: {
            width: 1200,
            height: 1800
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