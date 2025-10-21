using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Barbarian : Unit
    {
        [Header("Barbarian Settings")]
        public bool hasTaunt = true;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Barbarian stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.BARBARIAN);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            hasTaunt = unitData.hasTaunt;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Barbarian attacks the closest target
            if (targets.Count == 0) return;
            
            Unit closestTarget = targets[0];
            float closestDistance = float.MaxValue;
            
            foreach (var target in targets)
            {
                float distance = Vector2.Distance(
                    new Vector2(gridX, gridY),
                    new Vector2(target.gridX, target.gridY)
                );
                
                if (distance < closestDistance)
                {
                    closestDistance = distance;
                    closestTarget = target;
                }
            }
            
            // Deal damage directly (melee attack)
            if (closestTarget != null && closestTarget.IsAlive())
            {
                closestTarget.TakeDamage(damage);
            }
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.BARBARIAN;
        }
    }
}
