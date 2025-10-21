using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using MergePrototype.Core;
using MergePrototype.Systems;

namespace MergePrototype.Units
{
    public abstract class Unit : MonoBehaviour
    {
        [Header("Unit Stats")]
        public int maxHp = 30;
        public int hp;
        public int damage = 10;
        public float attackSpeed = 1.0f;
        public int range = 2;
        public Vector2Int size = new Vector2Int(1, 1);
        public Color unitColor = Color.white;
        
        [Header("Position")]
        public int gridX;
        public int gridY;
        public bool isEnemy = false;
        
        [Header("Visual Components")]
        public SpriteRenderer spriteRenderer;
        public GameObject hpBarObject;
        public Image hpBarFill;
        public Image hpBarBackground;
        
        // State
        protected bool isDead = false;
        protected float lastAttackTime = 0f;
        protected int stars = 0; // For merge system
        
        // References
        protected GridSystem gridSystem;
        
        protected virtual void Awake()
        {
            // Initialize components
            spriteRenderer = GetComponent<SpriteRenderer>();
            if (spriteRenderer == null)
            {
                spriteRenderer = gameObject.AddComponent<SpriteRenderer>();
            }
            
            // Initialize HP
            hp = maxHp;
            
            // Find grid system
            gridSystem = FindObjectOfType<GridSystem>();
        }
        
        protected virtual void Start()
        {
            CreateVisuals();
            CreateHpBar();
        }
        
        protected virtual void Update()
        {
            if (!isDead && !isEnemy)
            {
                // Auto-attack logic for player units
                TryAttack();
            }
        }
        
        protected virtual void CreateVisuals()
        {
            // Set sprite color
            spriteRenderer.color = isEnemy ? Color.gray : unitColor;
            
            // Set scale based on size
            Vector3 scale = new Vector3(
                size.x * GameConfig.CELL_SIZE * 0.8f,
                size.y * GameConfig.CELL_SIZE * 0.8f,
                1f
            );
            transform.localScale = scale;
            
            // Create a simple colored square sprite
            CreateColoredSprite();
        }
        
        private void CreateColoredSprite()
        {
            // Create a simple white texture
            Texture2D texture = new Texture2D(1, 1);
            texture.SetPixel(0, 0, Color.white);
            texture.Apply();
            
            Sprite sprite = Sprite.Create(texture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
            spriteRenderer.sprite = sprite;
        }
        
        protected virtual void CreateHpBar()
        {
            // Create HP bar canvas
            GameObject canvasObject = new GameObject("HPBarCanvas");
            canvasObject.transform.SetParent(transform);
            canvasObject.transform.localPosition = Vector3.zero;
            
            Canvas canvas = canvasObject.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.WorldSpace;
            canvas.sortingOrder = 10;
            
            CanvasScaler scaler = canvasObject.AddComponent<CanvasScaler>();
            scaler.dynamicPixelsPerUnit = 10;
            
            // Create HP bar background
            GameObject bgObject = new GameObject("HPBarBackground");
            bgObject.transform.SetParent(canvasObject.transform);
            bgObject.transform.localPosition = new Vector3(0, -0.4f, 0);
            
            hpBarBackground = bgObject.AddComponent<Image>();
            hpBarBackground.color = new Color(0.2f, 0.2f, 0.2f, 0.8f);
            
            RectTransform bgRect = hpBarBackground.rectTransform;
            bgRect.sizeDelta = new Vector2(size.x * GameConfig.CELL_SIZE * 0.6f, 4f);
            bgRect.anchorMin = new Vector2(0.5f, 0.5f);
            bgRect.anchorMax = new Vector2(0.5f, 0.5f);
            
            // Create HP bar fill
            GameObject fillObject = new GameObject("HPBarFill");
            fillObject.transform.SetParent(bgObject.transform);
            fillObject.transform.localPosition = Vector3.zero;
            
            hpBarFill = fillObject.AddComponent<Image>();
            hpBarFill.color = Color.green;
            
            RectTransform fillRect = hpBarFill.rectTransform;
            fillRect.sizeDelta = new Vector2(size.x * GameConfig.CELL_SIZE * 0.6f, 4f);
            fillRect.anchorMin = new Vector2(0, 0.5f);
            fillRect.anchorMax = new Vector2(0, 0.5f);
            fillRect.anchoredPosition = new Vector2(-fillRect.sizeDelta.x / 2, 0);
            
            hpBarObject = canvasObject;
            UpdateHpBar();
        }
        
        protected virtual void UpdateHpBar()
        {
            if (hpBarFill == null) return;
            
            float hpPercent = (float)hp / maxHp;
            hpBarFill.fillAmount = hpPercent;
            
            // Change color based on health
            if (hpPercent > 0.6f)
            {
                hpBarFill.color = Color.green;
            }
            else if (hpPercent > 0.3f)
            {
                hpBarFill.color = Color.yellow;
            }
            else
            {
                hpBarFill.color = Color.red;
            }
        }
        
        public virtual void SetPosition(float x, float y)
        {
            transform.position = new Vector3(x, y, 0);
        }
        
        public virtual void SetGridPosition(int x, int y)
        {
            gridX = x;
            gridY = y;
        }
        
        public virtual Vector2Int GetSize()
        {
            return size;
        }
        
        public virtual bool IsAlive()
        {
            return !isDead && hp > 0;
        }
        
        public virtual bool IsEnemy()
        {
            return isEnemy;
        }
        
        public virtual void TakeDamage(int damageAmount)
        {
            if (isDead) return;
            
            hp -= damageAmount;
            hp = Mathf.Max(0, hp);
            
            UpdateHpBar();
            
            if (hp <= 0)
            {
                Die();
            }
        }
        
        protected virtual void Die()
        {
            isDead = true;
            
            // Play death animation
            StartCoroutine(DeathAnimation());
            
            Debug.Log($"{GetType().Name} died!");
        }
        
        protected virtual IEnumerator DeathAnimation()
        {
            // Fade out animation
            float duration = 0.3f;
            float elapsed = 0f;
            Color originalColor = spriteRenderer.color;
            
            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                float alpha = Mathf.Lerp(1f, 0f, elapsed / duration);
                spriteRenderer.color = new Color(originalColor.r, originalColor.g, originalColor.b, alpha);
                yield return null;
            }
            
            // Destroy HP bar
            if (hpBarObject != null)
            {
                Destroy(hpBarObject);
            }
            
            // Remove from grid
            if (gridSystem != null)
            {
                gridSystem.RemoveUnit(this);
            }
            
            // Destroy game object
            Destroy(gameObject);
        }
        
        protected virtual void TryAttack()
        {
            if (Time.time - lastAttackTime < attackSpeed) return;
            
            // Find targets
            var targets = FindTargets();
            if (targets.Count > 0)
            {
                Attack(targets);
                lastAttackTime = Time.time;
            }
        }
        
        protected virtual System.Collections.Generic.List<Unit> FindTargets()
        {
            var targets = new System.Collections.Generic.List<Unit>();
            
            if (gridSystem == null) return targets;
            
            // Get all enemy units
            var enemyUnits = isEnemy ? gridSystem.GetPlayerUnits() : gridSystem.GetEnemyUnits();
            
            // Find units in range
            foreach (var unit in enemyUnits)
            {
                if (unit == null || !unit.IsAlive()) continue;
                
                float distance = Vector2.Distance(
                    new Vector2(gridX, gridY),
                    new Vector2(unit.gridX, unit.gridY)
                );
                
                if (distance <= range)
                {
                    targets.Add(unit);
                }
            }
            
            return targets;
        }
        
        protected virtual void Attack(System.Collections.Generic.List<Unit> targets)
        {
            // Override in derived classes for specific attack logic
            foreach (var target in targets)
            {
                if (target != null && target.IsAlive())
                {
                    target.TakeDamage(damage);
                }
            }
        }
        
        public virtual bool Merge(Unit other)
        {
            // Check if units can merge (same type and adjacent)
            if (GetType() != other.GetType()) return false;
            if (isEnemy != other.isEnemy) return false;
            
            // Check if adjacent
            float distance = Vector2.Distance(
                new Vector2(gridX, gridY),
                new Vector2(other.gridX, other.gridY)
            );
            
            if (distance > 1.5f) return false;
            
            // Merge units
            stars++;
            maxHp = Mathf.RoundToInt(maxHp * 1.5f);
            hp = maxHp;
            damage = Mathf.RoundToInt(damage * 1.3f);
            attackSpeed = Mathf.Max(0.1f, attackSpeed * 0.9f);
            
            UpdateHpBar();
            
            // Destroy the other unit
            other.Die();
            
            Debug.Log($"{GetType().Name} merged! Stars: {stars}");
            return true;
        }
        
        public virtual UnitStats GetStats()
        {
            return new UnitStats
            {
                hp = hp,
                maxHp = maxHp,
                damage = damage,
                attackSpeed = attackSpeed,
                range = range,
                stars = stars
            };
        }
        
        public int GetStars()
        {
            return stars;
        }
        
        public int GetSellPrice()
        {
            var unitData = GameConfig.GetUnitData(GetUnitType());
            return unitData.sellPrice + (stars * unitData.sellPricePerStar);
        }
        
        protected abstract GameConfig.UnitType GetUnitType();
    }
    
    [System.Serializable]
    public struct UnitStats
    {
        public int hp;
        public int maxHp;
        public int damage;
        public float attackSpeed;
        public int range;
        public int stars;
    }
}
