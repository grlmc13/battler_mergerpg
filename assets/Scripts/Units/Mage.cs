using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Mage : Unit
    {
        [Header("Mage Settings")]
        public int maxTargets = 3;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Mage stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.MAGE);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            maxTargets = unitData.maxTargets;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Mage attacks up to maxTargets
            int targetsToAttack = Mathf.Min(maxTargets, targets.Count);
            
            for (int i = 0; i < targetsToAttack; i++)
            {
                if (targets[i] != null && targets[i].IsAlive())
                {
                    targets[i].TakeDamage(damage);
                }
            }
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.MAGE;
        }
    }
}
