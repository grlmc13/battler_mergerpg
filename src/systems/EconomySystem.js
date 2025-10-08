// Система экономики и монет
export class EconomySystem {
    constructor(scene) {
        this.scene = scene;
        this.coins = window.gameConfig.STARTING_COINS;
        this.totalEarned = 0;
        this.totalSpent = 0;
    }

    getCoins() {
        return this.coins;
    }

    addCoins(amount) {
        this.coins += amount;
        this.totalEarned += amount;
        
        console.log(`Получено ${amount} монет. Всего: ${this.coins}`);
        
        // Событие изменения монет
        this.scene.events.emit('coinsChanged', this.coins);
    }

    spendCoins(amount) {
        if (this.canAfford(amount)) {
            this.coins -= amount;
            this.totalSpent += amount;
            
            console.log(`Потрачено ${amount} монет. Осталось: ${this.coins}`);
            
            // Событие изменения монет
            this.scene.events.emit('coinsChanged', this.coins);
            
            return true;
        }
        
        return false;
    }

    canAfford(amount) {
        return this.coins >= amount;
    }

    getStats() {
        return {
            currentCoins: this.coins,
            totalEarned: this.totalEarned,
            totalSpent: this.totalSpent,
            netProfit: this.totalEarned - this.totalSpent
        };
    }

    reset() {
        this.coins = window.gameConfig.STARTING_COINS;
        this.totalEarned = 0;
        this.totalSpent = 0;
        
        console.log('Экономика сброшена');
    }
}
