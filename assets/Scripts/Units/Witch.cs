using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Witch : Unit
    {
        [Header("Witch Settings")]
        public bool hasCurse = true;
        public float curseDebuff = 0.5f;
        public Vector2Int[] occupiedCells;
        
        private Dictionary<Unit, float> cursedUnits = new Dictionary<Unit, float>();
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Witch stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.WITCH);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            hasCurse = unitData.hasCurse;
            curseDebuff = unitData.curseDebuff;
            occupiedCells = unitData.occupiedCells;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Witch attacks the closest target and applies curse
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
            
            // Deal damage and apply curse
            if (closestTarget != null && closestTarget.IsAlive())
            {
                closestTarget.TakeDamage(damage);
                
                if (hasCurse)
                {
                    ApplyCurse(closestTarget);
                }
            }
        }
        
        private void ApplyCurse(Unit target)
        {
            if (cursedUnits.ContainsKey(target))
            {
                cursedUnits[target] = 5f; // Reset curse duration
            }
            else
            {
                cursedUnits.Add(target, 5f); // 5 second curse
            }
            
            // Apply curse debuff
            target.damage = Mathf.RoundToInt(target.damage * (1f - curseDebuff));
            
            // Show curse effect
            StartCoroutine(CurseEffect(target));
            
            Debug.Log($"Cursed {target.GetType().Name}! Damage reduced by {curseDebuff * 100}%");
        }
        
        private System.Collections.IEnumerator CurseEffect(Unit target)
        {
            // Create curse visual effect
            GameObject curseEffect = new GameObject("CurseEffect");
            curseEffect.transform.position = target.transform.position;
            
            // Create purple aura
            SpriteRenderer curseRenderer = curseEffect.AddComponent<SpriteRenderer>();
            curseRenderer.color = new Color(0.5f, 0f, 0.5f, 0.7f); // Purple aura
            
            // Create aura texture
            Texture2D auraTexture = new Texture2D(1, 1);
            auraTexture.SetPixel(0, 0, Color.white);
            auraTexture.Apply();
            
            Sprite auraSprite = Sprite.Create(auraTexture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
            curseRenderer.sprite = auraSprite;
            curseEffect.transform.localScale = Vector3.one * 2f;
            
            // Animate curse aura
            float duration = 5f;
            float elapsed = 0f;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                // Pulsing effect
                float scale = 1f + Mathf.Sin(t * Mathf.PI * 4) * 0.2f;
                curseEffect.transform.localScale = Vector3.one * scale * 2f;
                
                // Fade out
                Color color = curseRenderer.color;
                color.a = Mathf.Lerp(0.7f, 0f, t);
                curseRenderer.color = color;
                
                yield return null;
            }
            
            Destroy(curseEffect);
        }
        
        private void Update()
        {
            base.Update();
            
            // Update curse timers
            if (cursedUnits.Count > 0)
            {
                var keysToRemove = new List<Unit>();
                
                foreach (var kvp in cursedUnits)
                {
                    Unit unit = kvp.Key;
                    float timeLeft = kvp.Value - Time.deltaTime;
                    
                    if (timeLeft <= 0 || unit == null || !unit.IsAlive())
                    {
                        // Remove curse
                        if (unit != null)
                        {
                            unit.damage = Mathf.RoundToInt(unit.damage / (1f - curseDebuff));
                            Debug.Log($"Curse removed from {unit.GetType().Name}");
                        }
                        keysToRemove.Add(unit);
                    }
                    else
                    {
                        cursedUnits[unit] = timeLeft;
                    }
                }
                
                // Remove expired curses
                foreach (var unit in keysToRemove)
                {
                    cursedUnits.Remove(unit);
                }
            }
        }
        
        protected override void Die()
        {
            // Remove all curses when witch dies
            foreach (var kvp in cursedUnits)
            {
                Unit unit = kvp.Key;
                if (unit != null)
                {
                    unit.damage = Mathf.RoundToInt(unit.damage / (1f - curseDebuff));
                }
            }
            cursedUnits.Clear();
            
            base.Die();
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.WITCH;
        }
    }
}
