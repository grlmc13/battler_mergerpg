// Базовый класс юнита
export class Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        this.scene = scene;
        this.gridX = gridX;
        this.gridY = gridY;
        this.isEnemy = isEnemy;
        this.isDead = false;
        
        // Базовые характеристики
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 10;
        this.attackSpeed = 1.0; // секунды между атаками
        this.range = 2;
        this.size = { width: 1, height: 1 };
        this.color = 0xFFFFFF;
        
        // Визуальные элементы
        this.sprite = null;
        this.hpBar = null;
        
        // Таймеры атак
        this.lastAttackTime = 0;
        
        this.createVisuals();
    }

    createVisuals() {
        const worldPos = this.scene.gridSystem.getWorldPosition(this.gridX, this.gridY);
        
        // Создаем спрайт юнита
        this.sprite = this.scene.add.rectangle(
            worldPos.x, 
            worldPos.y, 
            this.size.width * this.scene.gridSystem.cellSize * 0.8,
            this.size.height * this.scene.gridSystem.cellSize * 0.8,
            this.color
        );
        
        // Добавляем рамку
        this.scene.add.rectangle(
            worldPos.x, 
            worldPos.y, 
            this.size.width * this.scene.gridSystem.cellSize * 0.8,
            this.size.height * this.scene.gridSystem.cellSize * 0.8,
            0x000000,
            0
        ).setStrokeStyle(2, 0x333333);
        
        // Создаем полоску здоровья
        this.createHpBar(worldPos.x, worldPos.y);
        
        // Если это враг, делаем его серым
        if (this.isEnemy) {
            this.sprite.setFillStyle(0x666666);
        }
    }

    createHpBar(x, y) {
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const barHeight = 4;
        const barY = y - (this.size.height * this.scene.gridSystem.cellSize * 0.4);
        
        // Фон полоски здоровья
        this.hpBarBg = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x333333);
        
        // Сама полоска здоровья
        this.hpBar = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x00FF00);
        
        this.updateHpBar();
    }

    updateHpBar() {
        if (!this.hpBar) return;
        
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const hpPercent = this.hp / this.maxHp;
        const currentWidth = barWidth * hpPercent;
        
        this.hpBar.setSize(currentWidth, 4);
        
        // Меняем цвет в зависимости от здоровья
        if (hpPercent > 0.6) {
            this.hpBar.setFillStyle(0x00FF00); // зеленый
        } else if (hpPercent > 0.3) {
            this.hpBar.setFillStyle(0xFFFF00); // желтый
        } else {
            this.hpBar.setFillStyle(0xFF0000); // красный
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
        
        // Наносим урон
        target.takeDamage(this.damage);
        
        // Создаем визуальный эффект атаки
        this.createAttackEffect(target);
        
        console.log(`${this.constructor.name} атакует ${target.constructor.name} на ${this.damage} урона`);
        
        return true;
    }

    createAttackEffect(target) {
        const startPos = this.sprite;
        const endPos = target.sprite;
        
        // Создаем линию атаки
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xFFD700, 0.8);
        graphics.lineBetween(startPos.x, startPos.y, endPos.x, endPos.y);
        
        // Удаляем эффект через 200мс
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
        
        // Эффект получения урона
        this.createDamageEffect();
    }

    createDamageEffect() {
        // Мигание красным
        this.sprite.setTint(0xFF0000);
        this.scene.time.delayedCall(100, () => {
            this.sprite.clearTint();
        });
    }

    die() {
        this.isDead = true;
        
        // Анимация смерти
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
        
        // Удаляем полоску здоровья
        if (this.hpBar) this.hpBar.destroy();
        if (this.hpBarBg) this.hpBarBg.destroy();
        
        console.log(`${this.constructor.name} погиб!`);
    }

    destroy() {
        if (this.sprite) this.sprite.destroy();
        if (this.hpBar) this.hpBar.destroy();
        if (this.hpBarBg) this.hpBarBg.destroy();
    }

    isAlive() {
        return !this.isDead && this.hp > 0;
    }

    getStats() {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
            damage: this.damage,
            attackSpeed: this.attackSpeed,
            range: this.range
        };
    }
}
