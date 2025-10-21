using UnityEngine;

namespace MergePrototype.Core
{
    public static class GameConfig
    {
        // Grid settings
        public const int GRID_WIDTH = 8;
        public const int GRID_HEIGHT = 6;
        public const float CELL_SIZE = 60f;
        
        // Economy settings
        public const int REROLL_COST = 5;
        public const int STARTING_COINS = 10;
        public const int WIN_REWARD = 5;
        
        // Unit types enum
        public enum UnitType
        {
            ARCHER,
            WARRIOR,
            BARBARIAN,
            HEALER,
            MAGE,
            TANK,
            ASSASSIN,
            DRUID,
            WITCH
        }
        
        // Unit data structure
        [System.Serializable]
        public struct UnitData
        {
            public string name;
            public Vector2Int size;
            public int cost;
            public int hp;
            public int damage;
            public float attackSpeed;
            public int range;
            public int sellPrice;
            public int sellPricePerStar;
            public Color color;
            
            // Special abilities
            public bool hasBattleCry;
            public float battleCryBonus;
            public bool hasTaunt;
            public bool hasShield;
            public float shieldReduction;
            public bool hasCritical;
            public float criticalChance;
            public bool hasThorns;
            public int thornsDamage;
            public bool hasCurse;
            public float curseDebuff;
            public bool hasHeal;
            public int healRange;
            public int healAmount;
            public int maxTargets;
            
            // L-shaped units
            public Vector2Int[] occupiedCells;
        }
        
        // Unit configurations
        public static readonly UnitData[] UNIT_TYPES = new UnitData[]
        {
            new UnitData // ARCHER
            {
                name = "Лучник",
                size = new Vector2Int(1, 1),
                cost = 0,
                hp = 30,
                damage = 8,
                attackSpeed = 0.5f,
                range = 10,
                sellPrice = 2,
                sellPricePerStar = 2,
                color = new Color(0.29f, 0.56f, 0.89f) // #4A90E2
            },
            new UnitData // WARRIOR
            {
                name = "Мечник",
                size = new Vector2Int(1, 2),
                cost = 0,
                hp = 50,
                damage = 12,
                attackSpeed = 1.0f,
                range = 10,
                hasBattleCry = true,
                battleCryBonus = 0.25f,
                sellPrice = 3,
                sellPricePerStar = 3,
                color = new Color(0.89f, 0.29f, 0.29f) // #E24A4A
            },
            new UnitData // BARBARIAN
            {
                name = "Варвар",
                size = new Vector2Int(2, 1),
                cost = 0,
                hp = 60,
                damage = 15,
                attackSpeed = 1.5f,
                range = 10,
                hasTaunt = true,
                sellPrice = 4,
                sellPricePerStar = 4,
                color = new Color(1.0f, 0.55f, 0.0f) // #FF8C00
            },
            new UnitData // HEALER
            {
                name = "Лекарь",
                size = new Vector2Int(1, 1),
                cost = 0,
                hp = 25,
                damage = 3,
                attackSpeed = 2.0f,
                range = 10,
                hasHeal = true,
                healRange = 2,
                healAmount = 8,
                sellPrice = 3,
                sellPricePerStar = 3,
                color = new Color(0.2f, 0.8f, 0.2f) // #32CD32
            },
            new UnitData // MAGE
            {
                name = "Маг",
                size = new Vector2Int(2, 2),
                cost = 0,
                hp = 40,
                damage = 8,
                attackSpeed = 2.5f,
                range = 10,
                maxTargets = 3,
                sellPrice = 5,
                sellPricePerStar = 5,
                color = new Color(0.61f, 0.29f, 0.89f) // #9B4AE2
            },
            new UnitData // TANK
            {
                name = "Танк",
                size = new Vector2Int(2, 2),
                cost = 0,
                hp = 80,
                damage = 10,
                attackSpeed = 2.0f,
                range = 10,
                hasShield = true,
                shieldReduction = 0.3f,
                sellPrice = 5,
                sellPricePerStar = 5,
                color = new Color(0.75f, 0.75f, 0.75f) // #C0C0C0
            },
            new UnitData // ASSASSIN
            {
                name = "Ассасин",
                size = new Vector2Int(1, 1),
                cost = 0,
                hp = 20,
                damage = 20,
                attackSpeed = 1.2f,
                range = 10,
                hasCritical = true,
                criticalChance = 0.5f,
                sellPrice = 3,
                sellPricePerStar = 3,
                color = new Color(0.55f, 0.0f, 0.55f) // #8B008B
            },
            new UnitData // DRUID
            {
                name = "Друид",
                size = new Vector2Int(2, 2),
                occupiedCells = new Vector2Int[]
                {
                    new Vector2Int(1, 0), // Top-right
                    new Vector2Int(0, 1), // Bottom-left
                    new Vector2Int(1, 1)  // Bottom-right
                },
                cost = 0,
                hp = 45,
                damage = 6,
                attackSpeed = 1.8f,
                range = 10,
                hasThorns = true,
                thornsDamage = 5,
                sellPrice = 4,
                sellPricePerStar = 4,
                color = new Color(0.55f, 0.27f, 0.07f) // #8B4513
            },
            new UnitData // WITCH
            {
                name = "Ведьма",
                size = new Vector2Int(2, 2),
                occupiedCells = new Vector2Int[]
                {
                    new Vector2Int(0, 0), // Top-left
                    new Vector2Int(0, 1), // Bottom-left
                    new Vector2Int(1, 1)  // Bottom-right
                },
                cost = 0,
                hp = 35,
                damage = 12,
                attackSpeed = 3.0f,
                range = 10,
                hasCurse = true,
                curseDebuff = 0.5f,
                sellPrice = 6,
                sellPricePerStar = 6,
                color = new Color(0.29f, 0.0f, 0.51f) // #4B0082
            }
        };
        
        // Helper methods
        public static UnitData GetUnitData(UnitType type)
        {
            return UNIT_TYPES[(int)type];
        }
        
        public static Vector2 GridToWorldPosition(int gridX, int gridY)
        {
            return new Vector2(gridX * CELL_SIZE, gridY * CELL_SIZE);
        }
        
        public static Vector2Int WorldToGridPosition(Vector2 worldPos)
        {
            return new Vector2Int(
                Mathf.FloorToInt(worldPos.x / CELL_SIZE),
                Mathf.FloorToInt(worldPos.y / CELL_SIZE)
            );
        }
    }
}
