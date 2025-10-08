// Система управления сеткой
export class GridSystem {
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
        
        // Вычисляем смещение для центрирования сетки
        this.gridOffsetX = (this.scene.scale.width - (width * cellSize)) / 2;
        this.gridOffsetY = (this.scene.scale.height - (height * cellSize)) / 2 - 50; // смещение вверх для UI
        
        // Инициализируем массив сетки
        this.grid = [];
        for (let y = 0; y < height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = null;
            }
        }
        
        // Создаем визуальную сетку
        this.createVisualGrid();
        
        console.log(`Сетка создана: ${width}x${height}, размер клетки: ${cellSize}`);
    }

    createVisualGrid() {
        // Рисуем линии сетки
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(1, 0x444444, 0.5);
        
        // Вертикальные линии
        for (let x = 0; x <= this.gridWidth; x++) {
            const startX = this.gridOffsetX + (x * this.cellSize);
            const startY = this.gridOffsetY;
            const endY = this.gridOffsetY + (this.gridHeight * this.cellSize);
            
            graphics.lineBetween(startX, startY, startX, endY);
        }
        
        // Горизонтальные линии
        for (let y = 0; y <= this.gridHeight; y++) {
            const startY = this.gridOffsetY + (y * this.cellSize);
            const startX = this.gridOffsetX;
            const endX = this.gridOffsetX + (this.gridWidth * this.cellSize);
            
            graphics.lineBetween(startX, startY, endX, startY);
        }
        
        // Подсвечиваем область игрока (нижняя половина)
        const playerAreaY = this.gridOffsetY + (this.gridHeight / 2 * this.cellSize);
        graphics.fillStyle(0x4A90E2, 0.1);
        graphics.fillRect(
            this.gridOffsetX, 
            playerAreaY, 
            this.gridWidth * this.cellSize, 
            (this.gridHeight / 2) * this.cellSize
        );
        
        // Подсвечиваем область врага (верхняя половина)
        graphics.fillStyle(0xE24A4A, 0.1);
        graphics.fillRect(
            this.gridOffsetX, 
            this.gridOffsetY, 
            this.gridWidth * this.cellSize, 
            (this.gridHeight / 2) * this.cellSize
        );
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

    placeUnit(gridX, gridY, unit) {
        const size = unit.getSize();
        
        for (let y = gridY; y < gridY + size.height; y++) {
            for (let x = gridX; x < gridX + size.width; x++) {
                this.grid[y][x] = unit;
            }
        }
        
        // Устанавливаем позицию юнита в мире
        const worldPos = this.getWorldPosition(gridX, gridY);
        unit.setPosition(worldPos.x, worldPos.y);
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

    getUnitsInRange(centerX, centerY, range) {
        const units = [];
        
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.grid[y][x]) {
                    const distance = Math.sqrt(
                        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
                    );
                    
                    if (distance <= range) {
                        units.push({
                            unit: this.grid[y][x],
                            distance: distance,
                            gridX: x,
                            gridY: y
                        });
                    }
                }
            }
        }
        
        return units.sort((a, b) => a.distance - b.distance);
    }

    isValidPosition(gridX, gridY) {
        return gridX >= 0 && gridX < this.gridWidth && 
               gridY >= 0 && gridY < this.gridHeight;
    }
}
