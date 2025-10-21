using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Druid : Unit
    {
        [Header("Druid Settings")]
        public bool hasThorns = true;
        public int thornsDamage = 5;
        public Vector2Int[] occupiedCells;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Druid stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.DRUID);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            hasThorns = unitData.hasThorns;
            thornsDamage = unitData.thornsDamage;
            occupiedCells = unitData.occupiedCells;
        }
        
        public override void TakeDamage(int damageAmount)
        {
            if (isDead) return;
            
            // Apply thorns damage to attacker
            if (hasThorns)
            {
                // Find the attacker (simplified - in real game would track attacker)
                var nearbyUnits = FindNearbyUnits();
                foreach (var unit in nearbyUnits)
                {
                    if (unit != null && unit.isEnemy != isEnemy)
                    {
                        unit.TakeDamage(thornsDamage);
                        StartCoroutine(ThornsEffect(unit));
                    }
                }
            }
            
            base.TakeDamage(damageAmount);
        }
        
        private List<Unit> FindNearbyUnits()
        {
            var nearbyUnits = new List<Unit>();
            
            if (gridSystem == null) return nearbyUnits;
            
            var allUnits = gridSystem.GetAllUnits();
            foreach (var unit in allUnits)
            {
                if (unit != null && unit != this)
                {
                    float distance = Vector2.Distance(
                        new Vector2(gridX, gridY),
                        new Vector2(unit.gridX, unit.gridY)
                    );
                    
                    if (distance <= 1.5f) // Adjacent cells
                    {
                        nearbyUnits.Add(unit);
                    }
                }
            }
            
            return nearbyUnits;
        }
        
        private System.Collections.IEnumerator ThornsEffect(Unit target)
        {
            // Create thorns damage effect
            GameObject thornsEffect = new GameObject("ThornsEffect");
            thornsEffect.transform.position = target.transform.position;
            
            // Create spike particles
            for (int i = 0; i < 3; i++)
            {
                GameObject spike = new GameObject("ThornSpike");
                spike.transform.position = target.transform.position + Random.insideUnitSphere * 0.3f;
                
                SpriteRenderer spikeRenderer = spike.AddComponent<SpriteRenderer>();
                spikeRenderer.color = new Color(0.5f, 0.3f, 0.1f); // Brown spikes
                
                // Create spike texture
                Texture2D spikeTexture = new Texture2D(1, 1);
                spikeTexture.SetPixel(0, 0, Color.white);
                spikeTexture.Apply();
                
                Sprite spikeSprite = Sprite.Create(spikeTexture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
                spikeRenderer.sprite = spikeSprite;
                spike.transform.localScale = Vector3.one * 0.3f;
                
                // Animate spike
                StartCoroutine(AnimateThornSpike(spike));
            }
            
            yield return new WaitForSeconds(1f);
            Destroy(thornsEffect);
        }
        
        private System.Collections.IEnumerator AnimateThornSpike(GameObject spike)
        {
            float duration = 0.5f;
            float elapsed = 0f;
            Vector3 startPos = spike.transform.position;
            Vector3 endPos = startPos + Vector3.up * 1f;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                spike.transform.position = Vector3.Lerp(startPos, endPos, t);
                
                SpriteRenderer renderer = spike.GetComponent<SpriteRenderer>();
                Color color = renderer.color;
                color.a = Mathf.Lerp(1f, 0f, t);
                renderer.color = color;
                
                yield return null;
            }
            
            Destroy(spike);
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Druid attacks the closest target
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
            return GameConfig.UnitType.DRUID;
        }
    }
}
