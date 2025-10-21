using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Healer : Unit
    {
        [Header("Healer Settings")]
        public int healRange = 2;
        public int healAmount = 8;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Healer stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.HEALER);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            healRange = unitData.healRange;
            healAmount = unitData.healAmount;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Healer heals allies instead of attacking enemies
            HealNearbyAllies();
        }
        
        private void HealNearbyAllies()
        {
            if (gridSystem == null) return;
            
            var allUnits = gridSystem.GetAllUnits();
            foreach (var unit in allUnits)
            {
                if (unit != null && unit.IsAlive() && !unit.isEnemy && unit != this)
                {
                    float distance = Vector2.Distance(
                        new Vector2(gridX, gridY),
                        new Vector2(unit.gridX, unit.gridY)
                    );
                    
                    if (distance <= healRange)
                    {
                        unit.hp = Mathf.Min(unit.maxHp, unit.hp + healAmount);
                        unit.UpdateHpBar();
                        
                        // Show heal effect
                        StartCoroutine(HealEffect(unit));
                    }
                }
            }
        }
        
        private System.Collections.IEnumerator HealEffect(Unit target)
        {
            // Create heal particles effect
            GameObject healEffect = new GameObject("HealEffect");
            healEffect.transform.position = target.transform.position;
            
            // Create green particles
            for (int i = 0; i < 5; i++)
            {
                GameObject particle = new GameObject("HealParticle");
                particle.transform.position = target.transform.position + Random.insideUnitSphere * 0.5f;
                
                SpriteRenderer particleRenderer = particle.AddComponent<SpriteRenderer>();
                particleRenderer.color = Color.green;
                
                // Create particle texture
                Texture2D particleTexture = new Texture2D(1, 1);
                particleTexture.SetPixel(0, 0, Color.white);
                particleTexture.Apply();
                
                Sprite particleSprite = Sprite.Create(particleTexture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
                particleRenderer.sprite = particleSprite;
                particle.transform.localScale = Vector3.one * 0.2f;
                
                // Animate particle
                StartCoroutine(AnimateHealParticle(particle));
            }
            
            yield return new WaitForSeconds(1f);
            Destroy(healEffect);
        }
        
        private System.Collections.IEnumerator AnimateHealParticle(GameObject particle)
        {
            float duration = 1f;
            float elapsed = 0f;
            Vector3 startPos = particle.transform.position;
            Vector3 endPos = startPos + Vector3.up * 2f;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                particle.transform.position = Vector3.Lerp(startPos, endPos, t);
                
                SpriteRenderer renderer = particle.GetComponent<SpriteRenderer>();
                Color color = renderer.color;
                color.a = Mathf.Lerp(1f, 0f, t);
                renderer.color = color;
                
                yield return null;
            }
            
            Destroy(particle);
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.HEALER;
        }
    }
}
