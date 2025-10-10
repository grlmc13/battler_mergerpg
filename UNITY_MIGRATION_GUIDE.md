# 🎮 Руководство по переносу на Unity

## 📋 Общая стратегия

Ваш текущий прототип на Phaser 3 уже имеет хорошую архитектуру, которая легко переносится на Unity. Основная работа будет в замене визуальной части и адаптации скриптов.

---

## 🎯 Что уже готово (архитектура)

✅ **Системная архитектура:**
- `GridSystem` - управление сеткой
- `BattleSystem` - логика боя
- `EconomySystem` - экономика
- `GameScene` - главный контроллер

✅ **Юниты с наследованием:**
- Базовый класс `Unit`
- 5 типов юнитов с уникальными способностями

✅ **Игровые механики:**
- Best of 5 формат
- Провокация (Taunt)
- Лечение по области
- Мульти-таргет атаки
- Воскрешение между раундами

---

## 🛠️ Пошаговый план миграции

### Этап 1: Настройка проекта Unity

**1.1 Создание проекта**
```
Unity Hub → New Project
Template: 2D
Unity Version: 2022.3 LTS или новее
Name: BattlerRPG
```

**1.2 Структура папок**
```
Assets/
├── Scripts/
│   ├── Core/
│   │   ├── GameManager.cs
│   │   ├── GridSystem.cs
│   │   ├── BattleSystem.cs
│   │   └── EconomySystem.cs
│   ├── Units/
│   │   ├── Unit.cs (базовый)
│   │   ├── Archer.cs
│   │   ├── Warrior.cs
│   │   ├── Barbarian.cs
│   │   ├── Healer.cs
│   │   └── Mage.cs
│   ├── UI/
│   │   ├── ShopUI.cs
│   │   ├── BattleUI.cs
│   │   └── RoundDisplay.cs
│   └── Config/
│       └── GameConfig.cs
├── Prefabs/
│   ├── Units/
│   └── UI/
├── Sprites/
│   └── Units/
├── Scenes/
│   ├── MainMenu.unity
│   └── BattleScene.unity
└── Materials/
```

---

### Этап 2: Конфигурация (1-2 часа)

**GameConfig.cs** (прямой перенос из `gameConfig`)

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "GameConfig", menuName = "Game/Config")]
public class GameConfig : ScriptableObject
{
    [Header("Grid Settings")]
    public int gridWidth = 8;
    public int gridHeight = 8;
    public float cellSize = 1f;
    public int playerAreaHeight = 4;
    public int enemyAreaHeight = 4;
    
    [Header("Economy")]
    public int startingCoins = 10;
    public int baseRoundReward = 5;
    
    [Header("Match Settings")]
    public int maxRounds = 5;
    public int winsNeeded = 3;
    
    [Header("Unit Types")]
    public UnitData[] unitTypes;
}

[System.Serializable]
public class UnitData
{
    public string unitName;
    public UnitType type;
    public Vector2Int size;
    public int cost;
    public int maxHP;
    public int damage;
    public float attackSpeed;
    public float range;
    public bool hasTaunt;
    public bool canHeal;
    public int healAmount;
    public int maxTargets;
    public Sprite sprite;
    public Color color;
}

public enum UnitType
{
    Archer,
    Warrior,
    Barbarian,
    Healer,
    Mage
}
```

---

### Этап 3: Система сетки (2-3 часа)

**GridSystem.cs** (аналог JS GridSystem)

```csharp
using UnityEngine;
using System.Collections.Generic;

public class GridSystem : MonoBehaviour
{
    private GameConfig config;
    private Unit[,] grid;
    private GameObject gridVisual;
    
    public void Initialize(GameConfig config)
    {
        this.config = config;
        grid = new Unit[config.gridWidth, config.gridHeight];
        CreateVisualGrid();
    }
    
    public bool CanPlaceUnit(Vector2Int gridPos, Vector2Int unitSize, bool isEnemy)
    {
        // Проверка границ
        if (gridPos.x < 0 || gridPos.y < 0 || 
            gridPos.x + unitSize.x > config.gridWidth ||
            gridPos.y + unitSize.y > config.gridHeight)
            return false;
        
        // Проверка занятости клеток
        for (int y = gridPos.y; y < gridPos.y + unitSize.y; y++)
        {
            for (int x = gridPos.x; x < gridPos.x + unitSize.x; x++)
            {
                if (grid[x, y] != null) return false;
            }
        }
        
        // Проверка зоны (игрок/враг)
        int areaStart = isEnemy ? 0 : config.playerAreaHeight;
        int areaEnd = isEnemy ? config.enemyAreaHeight : config.gridHeight;
        
        return gridPos.y >= areaStart && 
               gridPos.y + unitSize.y <= areaEnd;
    }
    
    public void PlaceUnit(Unit unit, Vector2Int gridPos)
    {
        Vector2Int size = unit.GetSize();
        
        // Заполняем сетку
        for (int y = gridPos.y; y < gridPos.y + size.y; y++)
        {
            for (int x = gridPos.x; x < gridPos.x + size.x; x++)
            {
                grid[x, y] = unit;
            }
        }
        
        // Позиция в мире
        Vector3 worldPos = GridToWorld(gridPos, size);
        unit.transform.position = worldPos;
    }
    
    public Vector3 GridToWorld(Vector2Int gridPos, Vector2Int size)
    {
        float x = gridPos.x * config.cellSize + (size.x * config.cellSize / 2f);
        float y = gridPos.y * config.cellSize + (size.y * config.cellSize / 2f);
        return new Vector3(x, y, 0);
    }
    
    public Vector2Int WorldToGrid(Vector3 worldPos)
    {
        int x = Mathf.FloorToInt(worldPos.x / config.cellSize);
        int y = Mathf.FloorToInt(worldPos.y / config.cellSize);
        return new Vector2Int(
            Mathf.Clamp(x, 0, config.gridWidth - 1),
            Mathf.Clamp(y, 0, config.gridHeight - 1)
        );
    }
    
    private void CreateVisualGrid()
    {
        gridVisual = new GameObject("GridVisual");
        
        // Создание визуала через LineRenderer или Sprites
        // Подробная реализация зависит от вашего стиля
    }
}
```

---

### Этап 4: Базовый класс юнита (3-4 часа)

**Unit.cs** (аналог JS Unit)

```csharp
using UnityEngine;
using System.Collections;

public abstract class Unit : MonoBehaviour
{
    [Header("Stats")]
    public int maxHP;
    public int currentHP;
    public int damage;
    public float attackSpeed;
    public float range;
    public Vector2Int size;
    
    [Header("Abilities")]
    public bool hasTaunt = false;
    public bool canHeal = false;
    
    [Header("State")]
    public bool isEnemy;
    public bool isDead;
    public Vector2Int gridPosition;
    
    [Header("Visual")]
    public SpriteRenderer spriteRenderer;
    public GameObject hpBarPrefab;
    private GameObject hpBarInstance;
    
    protected float lastAttackTime;
    
    public virtual void Initialize(UnitData data, bool isEnemy)
    {
        this.maxHP = data.maxHP;
        this.currentHP = maxHP;
        this.damage = data.damage;
        this.attackSpeed = data.attackSpeed;
        this.range = data.range;
        this.size = data.size;
        this.isEnemy = isEnemy;
        this.hasTaunt = data.hasTaunt;
        
        // Визуал
        spriteRenderer = GetComponent<SpriteRenderer>();
        spriteRenderer.sprite = data.sprite;
        spriteRenderer.color = isEnemy ? Color.gray : data.color;
        
        CreateHPBar();
    }
    
    public virtual bool CanAttack()
    {
        return Time.time - lastAttackTime >= attackSpeed;
    }
    
    public virtual void Attack(Unit target)
    {
        if (!CanAttack() || isDead) return;
        
        lastAttackTime = Time.time;
        target.TakeDamage(damage);
        
        // Визуальный эффект атаки
        StartCoroutine(AttackEffect(target));
    }
    
    public virtual void TakeDamage(int damage)
    {
        currentHP -= damage;
        UpdateHPBar();
        
        if (currentHP <= 0)
        {
            Die();
        }
        
        // Эффект получения урона
        StartCoroutine(DamageEffect());
    }
    
    public virtual void Die()
    {
        isDead = true;
        StartCoroutine(DeathAnimation());
    }
    
    public virtual void Resurrect()
    {
        isDead = false;
        currentHP = maxHP;
        
        // Восстановление визуала
        spriteRenderer.color = isEnemy ? Color.gray : spriteRenderer.color;
        transform.localScale = Vector3.one;
        
        if (hpBarInstance != null)
        {
            hpBarInstance.SetActive(true);
        }
        
        UpdateHPBar();
    }
    
    private void CreateHPBar()
    {
        if (hpBarPrefab != null)
        {
            hpBarInstance = Instantiate(hpBarPrefab, transform);
            hpBarInstance.transform.localPosition = new Vector3(0, size.y * 0.6f, 0);
        }
    }
    
    private void UpdateHPBar()
    {
        if (hpBarInstance != null)
        {
            float hpPercent = (float)currentHP / maxHP;
            // Обновление HPBar через UI или скрипт
        }
    }
    
    protected virtual IEnumerator AttackEffect(Unit target)
    {
        // Линия или снаряд от себя к цели
        yield return null;
    }
    
    protected virtual IEnumerator DamageEffect()
    {
        // Красная вспышка
        Color original = spriteRenderer.color;
        spriteRenderer.color = Color.red;
        yield return new WaitForSeconds(0.1f);
        spriteRenderer.color = original;
    }
    
    protected virtual IEnumerator DeathAnimation()
    {
        // Анимация смерти
        float duration = 0.3f;
        float elapsed = 0;
        
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            float t = elapsed / duration;
            
            spriteRenderer.color = Color.Lerp(spriteRenderer.color, 
                new Color(1, 1, 1, 0), t);
            transform.localScale = Vector3.Lerp(Vector3.one, 
                Vector3.zero, t);
            
            yield return null;
        }
        
        if (hpBarInstance != null)
        {
            hpBarInstance.SetActive(false);
        }
    }
    
    public Vector2Int GetSize() => size;
    public bool IsAlive() => !isDead && currentHP > 0;
}
```

---

### Этап 5: Специализированные юниты (2-3 часа)

**Barbarian.cs** (с провокацией)

```csharp
using UnityEngine;

public class Barbarian : Unit
{
    private GameObject tauntEffect;
    
    public override void Initialize(UnitData data, bool isEnemy)
    {
        base.Initialize(data, isEnemy);
        
        if (hasTaunt)
        {
            CreateTauntEffect();
        }
    }
    
    private void CreateTauntEffect()
    {
        // Создаем красное свечение
        tauntEffect = new GameObject("TauntEffect");
        tauntEffect.transform.SetParent(transform);
        tauntEffect.transform.localPosition = Vector3.zero;
        
        SpriteRenderer glow = tauntEffect.AddComponent<SpriteRenderer>();
        glow.sprite = CreateCircleSprite();
        glow.color = new Color(1, 0, 0, 0.15f);
        glow.sortingOrder = -1;
        
        // Пульсирующая анимация
        StartCoroutine(PulsateEffect());
    }
    
    private System.Collections.IEnumerator PulsateEffect()
    {
        SpriteRenderer glow = tauntEffect.GetComponent<SpriteRenderer>();
        
        while (tauntEffect != null)
        {
            float alpha = Mathf.PingPong(Time.time, 0.3f);
            Color c = glow.color;
            c.a = 0.15f + alpha;
            glow.color = c;
            
            yield return null;
        }
    }
    
    public override void Die()
    {
        base.Die();
        
        if (tauntEffect != null)
        {
            Destroy(tauntEffect);
        }
    }
    
    private Sprite CreateCircleSprite()
    {
        // Создать круглый спрайт через Texture2D
        // Или использовать готовый из Resources
        return null; // Placeholder
    }
}
```

**Mage.cs** (мульти-таргет)

```csharp
using UnityEngine;
using System.Collections.Generic;
using System.Linq;

public class Mage : Unit
{
    public int maxTargets = 3;
    
    public override void Attack(Unit target)
    {
        if (!CanAttack() || isDead) return;
        
        lastAttackTime = Time.time;
        
        // Находим до 3 ближайших врагов
        List<Unit> enemies = isEnemy ? 
            BattleSystem.Instance.GetPlayerUnits() : 
            BattleSystem.Instance.GetEnemyUnits();
        
        var aliveEnemies = enemies.Where(e => e.IsAlive())
            .OrderBy(e => Vector3.Distance(transform.position, e.transform.position))
            .Take(maxTargets)
            .ToList();
        
        foreach (var enemy in aliveEnemies)
        {
            enemy.TakeDamage(damage);
            StartCoroutine(MagicBolt(enemy));
        }
    }
    
    private System.Collections.IEnumerator MagicBolt(Unit target)
    {
        // Визуальный эффект магической стрелы
        yield return null;
    }
}
```

---

### Этап 6: Боевая система (3-4 часа)

**BattleSystem.cs**

```csharp
using UnityEngine;
using System.Collections.Generic;
using System.Linq;

public class BattleSystem : MonoBehaviour
{
    public static BattleSystem Instance;
    
    private List<Unit> playerUnits = new List<Unit>();
    private List<Unit> enemyUnits = new List<Unit>();
    private bool isActive = false;
    
    void Awake()
    {
        Instance = this;
    }
    
    public void StartBattle()
    {
        isActive = true;
        InvokeRepeating(nameof(UpdateBattle), 0f, 0.1f);
    }
    
    private void UpdateBattle()
    {
        if (!isActive) return;
        
        var alivePlayers = playerUnits.Where(u => u.IsAlive()).ToList();
        var aliveEnemies = enemyUnits.Where(u => u.IsAlive()).ToList();
        
        if (alivePlayers.Count == 0)
        {
            EndBattle(false);
            return;
        }
        
        if (aliveEnemies.Count == 0)
        {
            EndBattle(true);
            return;
        }
        
        ProcessAttacks(alivePlayers, aliveEnemies);
        ProcessAttacks(aliveEnemies, alivePlayers);
    }
    
    private void ProcessAttacks(List<Unit> attackers, List<Unit> targets)
    {
        foreach (var unit in attackers)
        {
            if (unit.CanAttack())
            {
                Unit target = FindNearestTarget(unit, targets);
                if (target != null)
                {
                    unit.Attack(target);
                }
            }
        }
    }
    
    private Unit FindNearestTarget(Unit attacker, List<Unit> possibleTargets)
    {
        // ПРОВОКАЦИЯ: приоритет на юнитов с taunt
        var tauntTargets = possibleTargets.Where(t => t.IsAlive() && t.hasTaunt).ToList();
        var validTargets = tauntTargets.Count > 0 ? tauntTargets : possibleTargets;
        
        Unit nearest = null;
        float nearestDist = Mathf.Infinity;
        
        foreach (var target in validTargets)
        {
            if (!target.IsAlive()) continue;
            
            float dist = Vector3.Distance(attacker.transform.position, 
                                         target.transform.position);
            
            if (dist <= attacker.range && dist < nearestDist)
            {
                nearest = target;
                nearestDist = dist;
            }
        }
        
        return nearest;
    }
    
    private void EndBattle(bool victory)
    {
        isActive = false;
        CancelInvoke(nameof(UpdateBattle));
        
        GameManager.Instance.OnBattleEnd(victory);
    }
    
    public List<Unit> GetPlayerUnits() => playerUnits;
    public List<Unit> GetEnemyUnits() => enemyUnits;
}
```

---

## 📱 Адаптация для мобильных

### Canvas UI Setup
```
Canvas (Screen Space - Overlay)
├── SafeArea (для вырезов экрана)
├── TopPanel (счет, раунды, монеты)
├── GameField (сетка)
├── BottomPanel (магазин)
└── BattleButton
```

### Touch Input
```csharp
public class TouchInput : MonoBehaviour
{
    void Update()
    {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            
            if (touch.phase == TouchPhase.Began)
            {
                HandleTouch(touch.position);
            }
        }
    }
    
    void HandleTouch(Vector2 screenPos)
    {
        Vector3 worldPos = Camera.main.ScreenToWorldPoint(screenPos);
        // Логика выбора/размещения
    }
}
```

---

## ⏱️ Оценка времени

| Задача | Время | Сложность |
|--------|-------|-----------|
| Настройка проекта | 1-2 часа | Легко |
| GridSystem | 2-3 часа | Средне |
| Базовый Unit | 3-4 часа | Средне |
| 5 типов юнитов | 2-3 часа | Легко |
| BattleSystem | 3-4 часа | Средне |
| EconomySystem | 1-2 часа | Легко |
| UI (магазин, кнопки) | 4-6 часов | Средне |
| Визуальные эффекты | 4-6 часов | Сложно |
| Полировка и баги | 4-6 часов | Средне |
| **ИТОГО** | **24-36 часов** | |

**Реально за 3-4 дня активной работы можно сделать рабочий прототип.**

---

## 🎨 Что нужно создать в Unity

### Обязательно:
- ✅ Спрайты для 5 юнитов (можно простые квадраты с цветами)
- ✅ HP Bar префаб
- ✅ Particle System для атак
- ✅ UI кнопки и панели

### Можно использовать Asset Store:
- **UI**: "Modern UI Pack"
- **Effects**: "Cartoon FX Pack"
- **Grid**: "2D Grid System"

---

## 🔧 Полезные Unity Package

```
Window → Package Manager:
- TextMeshPro (для текста)
- 2D Sprite (для спрайтов)
- Universal RP (для эффектов)
```

---

## 🚀 Преимущества Unity версии

1. **Производительность** - нативный код
2. **Мобильная оптимизация** - легче билд для iOS/Android
3. **Visual Scripting** - можно использовать Bolt/Visual Scripting
4. **Asset Store** - готовые ассеты
5. **Больше возможностей** для расширения

---

## 📚 Ресурсы для изучения

### Unity для 2D игр:
- [Unity Learn - 2D Game Kit](https://learn.unity.com/)
- [Brackeys - 2D Tutorials](https://www.youtube.com/c/Brackeys)

### Архитектура:
- ScriptableObject для конфигов
- Singleton для менеджеров
- Events для коммуникации

---

## 💡 Рекомендации

### Что делать пошагово:
1. **Неделя 1:** Базовая структура + GridSystem
2. **Неделя 2:** Юниты + визуал
3. **Неделя 3:** BattleSystem + UI
4. **Неделя 4:** Полировка + билд

### С чего начать:
1. Создайте GameConfig ScriptableObject
2. Реализуйте GridSystem с визуалом
3. Сделайте один юнит (Archer)
4. Добавьте простой бой
5. Дальше по списку

---

**Хотите, чтобы я создал стартовый шаблон Unity проекта с основными скриптами?** 🎮


