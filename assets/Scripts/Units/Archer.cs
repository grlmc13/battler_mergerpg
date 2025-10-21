using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Units
{
    public class Archer : Unit
    {
        [Header("Archer Settings")]
        public GameObject arrowPrefab;
        public float arrowSpeed = 10f;
        
        protected override void Awake()
        {
            base.Awake();
            
            // Set Archer stats from config
            var unitData = GameConfig.GetUnitData(GameConfig.UnitType.ARCHER);
            maxHp = unitData.hp;
            hp = maxHp;
            damage = unitData.damage;
            attackSpeed = unitData.attackSpeed;
            range = unitData.range;
            size = unitData.size;
            unitColor = unitData.color;
        }
        
        protected override void Attack(List<Unit> targets)
        {
            // Archer attacks the closest target
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
            
            // Create arrow projectile
            CreateArrow(closestTarget);
        }
        
        private void CreateArrow(Unit target)
        {
            if (arrowPrefab == null)
            {
                // Create simple arrow if no prefab assigned
                CreateSimpleArrow(target);
                return;
            }
            
            // Instantiate arrow prefab
            GameObject arrow = Instantiate(arrowPrefab, transform.position, Quaternion.identity);
            
            // Set up arrow movement
            ArrowProjectile arrowScript = arrow.GetComponent<ArrowProjectile>();
            if (arrowScript == null)
            {
                arrowScript = arrow.AddComponent<ArrowProjectile>();
            }
            
            arrowScript.Initialize(target, damage, arrowSpeed);
        }
        
        private void CreateSimpleArrow(Unit target)
        {
            // Create a simple line renderer arrow
            GameObject arrowObject = new GameObject("Arrow");
            arrowObject.transform.position = transform.position;
            
            LineRenderer lineRenderer = arrowObject.AddComponent<LineRenderer>();
            lineRenderer.material = new Material(Shader.Find("Sprites/Default"));
            lineRenderer.color = Color.yellow;
            lineRenderer.startWidth = 0.1f;
            lineRenderer.endWidth = 0.1f;
            lineRenderer.useWorldSpace = true;
            
            // Set arrow positions
            Vector3 startPos = transform.position;
            Vector3 endPos = new Vector3(target.gridX * GameConfig.CELL_SIZE, target.gridY * GameConfig.CELL_SIZE, 0);
            
            lineRenderer.positionCount = 2;
            lineRenderer.SetPosition(0, startPos);
            lineRenderer.SetPosition(1, endPos);
            
            // Move arrow towards target
            StartCoroutine(MoveArrow(arrowObject, startPos, endPos, target));
        }
        
        private System.Collections.IEnumerator MoveArrow(GameObject arrow, Vector3 startPos, Vector3 endPos, Unit target)
        {
            float duration = Vector3.Distance(startPos, endPos) / arrowSpeed;
            float elapsed = 0f;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                arrow.transform.position = Vector3.Lerp(startPos, endPos, t);
                yield return null;
            }
            
            // Deal damage to target
            if (target != null && target.IsAlive())
            {
                target.TakeDamage(damage);
            }
            
            // Destroy arrow
            Destroy(arrow);
        }
        
        protected override GameConfig.UnitType GetUnitType()
        {
            return GameConfig.UnitType.ARCHER;
        }
    }
    
    // Simple arrow projectile component
    public class ArrowProjectile : MonoBehaviour
    {
        private Unit target;
        private int damage;
        private float speed;
        private bool hasHit = false;
        
        public void Initialize(Unit targetUnit, int damageAmount, float moveSpeed)
        {
            target = targetUnit;
            damage = damageAmount;
            speed = moveSpeed;
            
            StartCoroutine(MoveToTarget());
        }
        
        private System.Collections.IEnumerator MoveToTarget()
        {
            Vector3 startPos = transform.position;
            Vector3 endPos = new Vector3(target.gridX * GameConfig.CELL_SIZE, target.gridY * GameConfig.CELL_SIZE, 0);
            
            float duration = Vector3.Distance(startPos, endPos) / speed;
            float elapsed = 0f;
            
            while (elapsed < duration && !hasHit)
            {
                elapsed += Time.deltaTime;
                float t = elapsed / duration;
                
                transform.position = Vector3.Lerp(startPos, endPos, t);
                yield return null;
            }
            
            // Deal damage if we reached the target
            if (!hasHit && target != null && target.IsAlive())
            {
                target.TakeDamage(damage);
                hasHit = true;
            }
            
            // Destroy arrow
            Destroy(gameObject);
        }
        
        private void OnTriggerEnter2D(Collider2D other)
        {
            Unit unit = other.GetComponent<Unit>();
            if (unit == target && !hasHit)
            {
                unit.TakeDamage(damage);
                hasHit = true;
                Destroy(gameObject);
            }
        }
    }
}
