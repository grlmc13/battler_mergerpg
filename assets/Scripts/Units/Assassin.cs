using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Assassin : Unit
    {
        [Header("Assassin Settings")]
        public bool hasCritical = true;
        public float criticalChance = 0.5f;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Assassin stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.ASSASSIN);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
            hasCritical = unitData.hasCritical;
            criticalChance = unitData.criticalChance;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Assassin attacks the closest target
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
            
            // Deal damage with critical chance
            if (closestTarget != null && closestTarget.IsAlive())
            {
                int finalDamage = damage;
                bool isCritical = false;
                
                if (hasCritical && Random.value < criticalChance)
                {
                    finalDamage = Mathf.RoundToInt(damage * 2f);
                    isCritical = true;
                }
                
                closestTarget.TakeDamage(finalDamage);
                
                if (isCritical)
                {
                    StartCoroutine(CriticalHitEffect(closestTarget));
                }
            }
        }
        
        private System.Collections.IEnumerator CriticalHitEffect(Unit target)
        {
            // Create critical hit effect
            GameObject critEffect = new GameObject("CriticalHit");
            critEffect.transform.position = target.transform.position;
            
            // Create "CRIT!" text
            GameObject textObject = new GameObject("CritText");
            textObject.transform.SetParent(critEffect.transform);
            textObject.transform.localPosition = Vector3.zero;
            
            // Add text component (simplified - in real game would use TextMeshPro)
            SpriteRenderer textRenderer = textObject.AddComponent<SpriteRenderer>();
            textRenderer.color = Color.red;
            
            // Create simple text texture
            Texture2D textTexture = new Texture2D(1, 1);
            textTexture.SetPixel(0, 0, Color.white);
            textTexture.Apply();
            
            Sprite textSprite = Sprite.Create(textTexture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
            textRenderer.sprite = textSprite;
            textObject.transform.localScale = Vector3.one * 2f;
            
            // Animate
            float duration = 1f;
            float elapsed = 0f;
            Vector3 startPos = textObject.transform.position;
            Vector3 endPos = startPos + Vector3.up * 3f;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                textObject.transform.position = Vector3.Lerp(startPos, endPos, t);
                
                Color color = textRenderer.color;
                color.a = Mathf.Lerp(1f, 0f, t);
                textRenderer.color = color;
                
                yield return null;
            }
            
            Destroy(critEffect);
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.ASSASSIN;
        }
    }
}
