using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Warrior : Unit
    {
        [Header("Warrior Settings")]
        public bool hasBattleCry = true;
        public float battleCryBonus = 0.25f;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Warrior stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.WARRIOR);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            hasBattleCry = unitData.hasBattleCry;
            battleCryBonus = unitData.battleCryBonus;
        }
        
        protected override void Start()
        {
            base.Start();
            
            // Apply battle cry bonus if there are other warriors nearby
            ApplyBattleCryBonus();
        }
        
        private void ApplyBattleCryBonus()
        {
            if (!hasBattleCry) return;
            
            // Find other warriors in range
            var nearbyWarriors = FindNearbyWarriors();
            
            if (nearbyWarriors.Count >= 1) // 2+ warriors total (including self)
            {
                // Apply speed bonus to all nearby warriors
                foreach (var warrior in nearbyWarriors)
                {
                    if (warrior != null)
                    {
                        warrior.attackSpeed *= (1f - battleCryBonus);
                    }
                }
                
                Debug.Log($"Battle cry activated! {nearbyWarriors.Count} warriors nearby");
            }
        }
        
        private List<Warrior> FindNearbyWarriors()
        {
            var warriors = new List<Warrior>();
            
            if (gridSystem == null) return warriors;
            
            var allUnits = gridSystem.GetAllUnits();
            foreach (var unit in allUnits)
            {
                if (unit is Warrior warrior && warrior != this && !warrior.isEnemy)
                {
                    float distance = Vector2.Distance(
                        new Vector2(gridX, gridY),
                        new Vector2(warrior.gridX, warrior.gridY)
                    );
                    
                    if (distance <= 2f) // Within 2 cells
                    {
                        warriors.Add(warrior);
                    }
                }
            }
            
            // Add self
            warriors.Add(this);
            
            return warriors;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Warrior attacks the closest target
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
                
                // Visual effect for melee attack
                StartCoroutine(MeleeAttackEffect(closestTarget));
            }
        }
        
        private System.Collections.IEnumerator MeleeAttackEffect(Unit target)
        {
            // Create a simple slash effect
            GameObject slashEffect = new GameObject("SlashEffect");
            slashEffect.transform.position = target.transform.position;
            
            LineRenderer slash = slashEffect.AddComponent<LineRenderer>();
            slash.material = new Material(Shader.Find("Sprites/Default"));
            slash.color = Color.red;
            slash.startWidth = 0.2f;
            slash.endWidth = 0.2f;
            slash.useWorldSpace = true;
            
            // Create X pattern
            Vector3 center = target.transform.position;
            float size = 0.5f;
            
            slash.positionCount = 4;
            slash.SetPosition(0, center + new Vector3(-size, -size, 0));
            slash.SetPosition(1, center + new Vector3(size, size, 0));
            slash.SetPosition(2, center + new Vector3(-size, size, 0));
            slash.SetPosition(3, center + new Vector3(size, -size, 0));
            
            // Fade out
            float duration = 0.2f;
            float elapsed = 0f;
            Color originalColor = slash.color;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float alpha = Mathf.Lerp(1f, 0f, elapsed / duration);
                slash.color = new Color(originalColor.r, originalColor.g, originalColor.b, alpha);
                yield return null;
            }
            
            Destroy(slashEffect);
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.WARRIOR;
        }
    }
}
