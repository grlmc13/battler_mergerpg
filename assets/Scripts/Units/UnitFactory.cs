using UnityEngine;
using MergePrototype.Core;
using MergePrototype.Systems;

namespace MergePrototype.Units
{
    public class UnitFactory : MonoBehaviour
    {
        [Header("Unit Prefabs")]
        public GameObject archerPrefab;
        public GameObject warriorPrefab;
        public GameObject tankPrefab;
        public GameObject magePrefab;
        public GameObject healerPrefab;
        public GameObject barbarianPrefab;
        public GameObject assassinPrefab;
        public GameObject druidPrefab;
        public GameObject witchPrefab;
        
        private GridSystem gridSystem;
        
        private void Awake()
        {
            gridSystem = FindObjectOfType<GridSystem>();
        }
        
        public Unit CreateUnit(GameConfig.UnitType unitType, int gridX, int gridY, bool isEnemy = false)
        {
            GameObject unitObject = null;
            
            // Get the appropriate prefab
            switch (unitType)
            {
                case GameConfig.UnitType.ARCHER:
                    unitObject = archerPrefab != null ? Instantiate(archerPrefab) : CreateDefaultUnit("Archer");
                    break;
                case GameConfig.UnitType.WARRIOR:
                    unitObject = warriorPrefab != null ? Instantiate(warriorPrefab) : CreateDefaultUnit("Warrior");
                    break;
                case GameConfig.UnitType.TANK:
                    unitObject = tankPrefab != null ? Instantiate(tankPrefab) : CreateDefaultUnit("Tank");
                    break;
                case GameConfig.UnitType.MAGE:
                    unitObject = magePrefab != null ? Instantiate(magePrefab) : CreateDefaultUnit("Mage");
                    break;
                case GameConfig.UnitType.HEALER:
                    unitObject = healerPrefab != null ? Instantiate(healerPrefab) : CreateDefaultUnit("Healer");
                    break;
                case GameConfig.UnitType.BARBARIAN:
                    unitObject = barbarianPrefab != null ? Instantiate(barbarianPrefab) : CreateDefaultUnit("Barbarian");
                    break;
                case GameConfig.UnitType.ASSASSIN:
                    unitObject = assassinPrefab != null ? Instantiate(assassinPrefab) : CreateDefaultUnit("Assassin");
                    break;
                case GameConfig.UnitType.DRUID:
                    unitObject = druidPrefab != null ? Instantiate(druidPrefab) : CreateDefaultUnit("Druid");
                    break;
                case GameConfig.UnitType.WITCH:
                    unitObject = witchPrefab != null ? Instantiate(witchPrefab) : CreateDefaultUnit("Witch");
                    break;
                default:
                    Debug.LogError($"Unknown unit type: {unitType}");
                    return null;
            }
            
            if (unitObject == null)
            {
                Debug.LogError($"Failed to create unit of type: {unitType}");
                return null;
            }
            
            // Set up the unit
            Unit unit = unitObject.GetComponent<Unit>();
            if (unit == null)
            {
                // Add the appropriate unit component if not present
                switch (unitType)
                {
                    case GameConfig.UnitType.ARCHER:
                        unit = unitObject.AddComponent<Archer>();
                        break;
                    case GameConfig.UnitType.WARRIOR:
                        unit = unitObject.AddComponent<Warrior>();
                        break;
                    case GameConfig.UnitType.TANK:
                        unit = unitObject.AddComponent<Tank>();
                        break;
                    case GameConfig.UnitType.MAGE:
                        unit = unitObject.AddComponent<Mage>();
                        break;
                    case GameConfig.UnitType.HEALER:
                        unit = unitObject.AddComponent<Healer>();
                        break;
                    case GameConfig.UnitType.BARBARIAN:
                        unit = unitObject.AddComponent<Barbarian>();
                        break;
                    case GameConfig.UnitType.ASSASSIN:
                        unit = unitObject.AddComponent<Assassin>();
                        break;
                    case GameConfig.UnitType.DRUID:
                        unit = unitObject.AddComponent<Druid>();
                        break;
                    case GameConfig.UnitType.WITCH:
                        unit = unitObject.AddComponent<Witch>();
                        break;
                }
            }
            
            // Set unit properties
            unit.isEnemy = isEnemy;
            unit.SetGridPosition(gridX, gridY);
            
            // Position the unit in the world
            Vector2 worldPos = GameConfig.GridToWorldPosition(gridX, gridY);
            unit.SetPosition(worldPos.x, worldPos.y);
            
            // Place in grid system
            if (gridSystem != null)
            {
                gridSystem.PlaceUnit(gridX, gridY, unit);
            }
            
            Debug.Log($"Created {unitType} at ({gridX}, {gridY}) - Enemy: {isEnemy}");
            return unit;
        }
        
        private GameObject CreateDefaultUnit(string unitName)
        {
            GameObject unitObject = new GameObject(unitName);
            
            // Add basic components
            unitObject.AddComponent<SpriteRenderer>();
            unitObject.AddComponent<BoxCollider2D>();
            
            return unitObject;
        }
        
        public Unit CreateRandomUnit(int gridX, int gridY, bool isEnemy = false)
        {
            // Get random unit type
            GameConfig.UnitType[] unitTypes = System.Enum.GetValues(typeof(GameConfig.UnitType)) as GameConfig.UnitType[];
            GameConfig.UnitType randomType = unitTypes[Random.Range(0, unitTypes.Length)];
            
            return CreateUnit(randomType, gridX, gridY, isEnemy);
        }
        
        public Unit CreateUnitFromData(GameConfig.UnitData unitData, int gridX, int gridY, bool isEnemy = false)
        {
            // Convert UnitData to UnitType
            GameConfig.UnitType unitType = GameConfig.UnitType.ARCHER; // Default
            
            // Find matching unit type by name
            for (int i = 0; i < GameConfig.UNIT_TYPES.Length; i++)
            {
                if (GameConfig.UNIT_TYPES[i].name == unitData.name)
                {
                    unitType = (GameConfig.UnitType)i;
                    break;
                }
            }
            
            return CreateUnit(unitType, gridX, gridY, isEnemy);
        }
    }
}
