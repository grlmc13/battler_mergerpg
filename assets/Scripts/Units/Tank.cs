using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Tank : Unit
    {
        [Header("Tank Settings")]
        public bool hasShield = true;
        public float shieldReduction = 0.3f;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Tank stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.TANK);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            hasShield = unitData.hasShield;
            shieldReduction = unitData.shieldReduction;
        }
        
        public override void TakeDamage(int damageAmount)
        {
            if (isDead) return;
            
            // Apply shield reduction
            int actualDamage = damageAmount;
            if (hasShield)
            {
                actualDamage = Mathf.RoundToInt(damageAmount * (1f - shieldReduction));
                
                // Show shield effect
                StartCoroutine(ShieldEffect());
            }
            
            hp -= actualDamage;
            hp = Mathf.Max(0, hp);
            
            UpdateHpBar();
            
            if (hp <= 0)
            {
                Die();
            }
        }
        
        private System.Collections.IEnumerator ShieldEffect()
        {
            // Create shield visual effect
            GameObject shieldEffect = new GameObject("ShieldEffect");
            shieldEffect.transform.SetParent(transform);
            shieldEffect.transform.localPosition = Vector3.zero;
            
            SpriteRenderer shieldRenderer = shieldEffect.AddComponent<SpriteRenderer>();
            shieldRenderer.color = new Color(0f, 1f, 1f, 0.7f); // Cyan shield
            
            // Create shield sprite
            Texture2D shieldTexture = new Texture2D(1, 1);
            shieldTexture.SetPixel(0, 0, Color.white);
            shieldTexture.Apply();
            
            Sprite shieldSprite = Sprite.Create(shieldTexture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
            shieldRenderer.sprite = shieldSprite;
            
            // Scale shield
            float shieldSize = Mathf.Max(size.x, size.y) * GameConfig.CELL_SIZE * 1.2f;
            shieldEffect.transform.localScale = new Vector3(shieldSize, shieldSize, 1f);
            
            // Animate shield
            float duration = 0.3f;
            float elapsed = 0f;
            Vector3 originalScale = shieldEffect.transform.localScale;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                // Pulsing effect
                float scale = Mathf.Lerp(0.5f, 1.2f, Mathf.Sin(t * Mathf.PI * 4));
                shieldEffect.transform.localScale = originalScale * scale;
                
                // Fade out
                Color color = shieldRenderer.color;
                color.a = Mathf.Lerp(0.7f, 0f, t);
                shieldRenderer.color = color;
                
                yield return null;
            }
            
            Destroy(shieldEffect);
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Tank attacks the closest target
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
                
                // Visual effect for tank attack
                StartCoroutine(TankAttackEffect(closestTarget));
            }
        }
        
        private System.Collections.IEnumerator TankAttackEffect(Unit target)
        {
            // Create a heavy impact effect
            GameObject impactEffect = new GameObject("TankImpact");
            impactEffect.transform.position = target.transform.position;
            
            // Create impact circle
            SpriteRenderer impactRenderer = impactEffect.AddComponent<SpriteRenderer>();
            impactRenderer.color = new Color(1f, 0.5f, 0f, 0.8f); // Orange impact
            
            // Create circle texture
            Texture2D circleTexture = CreateCircleTexture(32);
            Sprite circleSprite = Sprite.Create(circleTexture, new Rect(0, 0, 32, 32), new Vector2(0.5f, 0.5f));
            impactRenderer.sprite = circleSprite;
            
            // Scale and animate
            float impactSize = 0.5f;
            impactEffect.transform.localScale = Vector3.zero;
            
            float duration = 0.4f;
            float elapsed = 0f;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                // Scale up then down
                float scale = Mathf.Lerp(0f, impactSize, t) * (1f - t);
                impactEffect.transform.localScale = Vector3.one * scale;
                
                // Fade out
                Color color = impactRenderer.color;
                color.a = Mathf.Lerp(0.8f, 0f, t);
                impactRenderer.color = color;
                
                yield return null;
            }
            
            Destroy(impactEffect);
        }
        
        private Texture2D CreateCircleTexture(int size)
        {
            Texture2D texture = new Texture2D(size, size);
            Color[] pixels = new Color[size * size];
            
            Vector2 center = new Vector2(size / 2f, size / 2f);
            float radius = size / 2f;
            
            for (int y = 0; y < size; y++)
            {
                for (int x = 0; x < size; x++)
                {
                    float distance = Vector2.Distance(new Vector2(x, y), center);
                    float alpha = 1f - (distance / radius);
                    alpha = Mathf.Clamp01(alpha);
                    
                    pixels[y * size + x] = new Color(1f, 1f, 1f, alpha);
                }
            }
            
            texture.SetPixels(pixels);
            texture.Apply();
            
            return texture;
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.TANK;
        }
    }
}
