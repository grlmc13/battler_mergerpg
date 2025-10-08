// Боевая система с одновременными атаками
export class BattleSystem {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.battleTimer = null;
        this.checkInterval = 100; // проверяем каждые 100мс
    }

    startBattle(playerUnits, enemyUnits) {
        this.isActive = true;
        this.playerUnits = playerUnits;
        this.enemyUnits = enemyUnits;
        
        console.log('Боевая система запущена');
        console.log(`Игрок: ${playerUnits.length} юнитов, Враг: ${enemyUnits.length} юнитов`);
        
        // Запускаем основной цикл боя
        this.battleTimer = this.scene.time.addEvent({
            delay: this.checkInterval,
            callback: this.updateBattle,
            callbackScope: this,
            loop: true
        });
    }

    updateBattle() {
        if (!this.isActive) return;
        
        // Проверяем живых юнитов
        const alivePlayerUnits = this.playerUnits.filter(unit => unit.isAlive());
        const aliveEnemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        
        // Проверяем условия победы/поражения
        if (alivePlayerUnits.length === 0) {
            this.endBattle(false); // поражение
            return;
        }
        
        if (aliveEnemyUnits.length === 0) {
            this.endBattle(true); // победа
            return;
        }
        
        // Обрабатываем атаки всех живых юнитов
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
            const distance = this.calculateDistance(unitPos, targetPos);
            
            // Проверяем дальность атаки
            if (distance <= unit.range && distance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = distance;
            }
        });
        
        return nearestTarget;
    }

    calculateDistance(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
        );
    }

    endBattle(victory) {
        this.isActive = false;
        
        if (this.battleTimer) {
            this.battleTimer.destroy();
            this.battleTimer = null;
        }
        
        console.log(victory ? 'Победа!' : 'Поражение!');
        
        // Уведомляем основную сцену о завершении боя
        this.scene.events.emit('battleEnded', victory);
        
        // Вызываем метод завершения боя в сцене
        if (this.scene.endBattle) {
            this.scene.endBattle(victory);
        }
    }

    stopBattle() {
        this.isActive = false;
        
        if (this.battleTimer) {
            this.battleTimer.destroy();
            this.battleTimer = null;
        }
    }

    isBattleActive() {
        return this.isActive;
    }

    getBattleStats() {
        const alivePlayerUnits = this.playerUnits.filter(unit => unit.isAlive());
        const aliveEnemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        
        return {
            playerUnits: alivePlayerUnits.length,
            enemyUnits: aliveEnemyUnits.length,
            isActive: this.isActive
        };
    }
}
