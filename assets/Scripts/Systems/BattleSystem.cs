using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using MergePrototype.Core;
using MergePrototype.Units;

namespace MergePrototype.Systems
{
    public class BattleSystem : MonoBehaviour
    {
        [Header("Battle Settings")]
        public float battleUpdateInterval = 0.1f;
        public int enemySpawnCount = 3;
        
        private bool isBattleActive = false;
        private Coroutine battleCoroutine;
        private GridSystem gridSystem;
        private GameManager gameManager;
        
        private void Awake()
        {
            gridSystem = FindObjectOfType<GridSystem>();
            gameManager = FindObjectOfType<GameManager>();
        }
        
        public void Initialize()
        {
            Debug.Log("BattleSystem initialized");
        }
        
        public void StartBattle()
        {
            if (isBattleActive) return;
            
            isBattleActive = true;
            SpawnEnemies();
            
            // Start battle update loop
            if (battleCoroutine != null)
            {
                StopCoroutine(battleCoroutine);
            }
            battleCoroutine = StartCoroutine(BattleUpdateLoop());
            
            Debug.Log("Battle started!");
        }
        
        public void EndBattle()
        {
            isBattleActive = false;
            
            if (battleCoroutine != null)
            {
                StopCoroutine(battleCoroutine);
                battleCoroutine = null;
            }
            
            Debug.Log("Battle ended!");
        }
        
        private void SpawnEnemies()
        {
            if (gridSystem == null) return;
            
            // Spawn enemies in the top half of the grid
            int playerAreaStart = GameConfig.GRID_HEIGHT / 2;
            int spawnCount = Mathf.Min(enemySpawnCount, playerAreaStart * GameConfig.GRID_WIDTH);
            
            for (int i = 0; i < spawnCount; i++)
            {
                // Find random position in enemy area
                int x = Random.Range(0, GameConfig.GRID_WIDTH);
                int y = Random.Range(0, playerAreaStart);
                
                // Try to place enemy
                if (gridSystem.CanPlaceUnit(x, y, new Vector2Int(1, 1), true))
                {
                    // Create random enemy unit
                    CreateRandomEnemy(x, y);
                }
            }
        }
        
        private void CreateRandomEnemy(int gridX, int gridY)
        {
            if (gridSystem == null) return;
            
            // Get random unit type
            GameConfig.UnitType[] unitTypes = System.Enum.GetValues(typeof(GameConfig.UnitType)) as GameConfig.UnitType[];
            GameConfig.UnitType randomType = unitTypes[Random.Range(0, unitTypes.Length)];
            
            // Create enemy unit
            Unit enemy = CreateEnemyUnit(randomType, gridX, gridY);
            
            if (enemy != null)
            {
                // Place in grid
                gridSystem.PlaceUnit(gridX, gridY, enemy);
            }
        }
        
        private Unit CreateEnemyUnit(GameConfig.UnitType unitType, int gridX, int gridY)
        {
            // Create enemy unit based on type
            GameObject enemyObject = new GameObject($"Enemy_{unitType}");
            Unit enemy = null;
            
            switch (unitType)
            {
                case GameConfig.UnitType.ARCHER:
                    enemy = enemyObject.AddComponent<Archer>();
                    break;
                case GameConfig.UnitType.WARRIOR:
                    enemy = enemyObject.AddComponent<Warrior>();
                    break;
                case GameConfig.UnitType.TANK:
                    enemy = enemyObject.AddComponent<Tank>();
                    break;
                case GameConfig.UnitType.MAGE:
                    enemy = enemyObject.AddComponent<Mage>();
                    break;
                case GameConfig.UnitType.HEALER:
                    enemy = enemyObject.AddComponent<Healer>();
                    break;
                case GameConfig.UnitType.BARBARIAN:
                    enemy = enemyObject.AddComponent<Barbarian>();
                    break;
                case GameConfig.UnitType.ASSASSIN:
                    enemy = enemyObject.AddComponent<Assassin>();
                    break;
                case GameConfig.UnitType.DRUID:
                    enemy = enemyObject.AddComponent<Druid>();
                    break;
                case GameConfig.UnitType.WITCH:
                    enemy = enemyObject.AddComponent<Witch>();
                    break;
            }
            
            if (enemy != null)
            {
                enemy.isEnemy = true;
                enemy.SetGridPosition(gridX, gridY);
                
                // Position in world
                Vector2 worldPos = GameConfig.GridToWorldPosition(gridX, gridY);
                enemy.SetPosition(worldPos.x, worldPos.y);
            }
            
            return enemy;
        }
        
        private IEnumerator BattleUpdateLoop()
        {
            while (isBattleActive)
            {
                UpdateBattle();
                yield return new WaitForSeconds(battleUpdateInterval);
            }
        }
        
        private void UpdateBattle()
        {
            if (gridSystem == null) return;
            
            // Check win/lose conditions
            var playerUnits = gridSystem.GetPlayerUnits();
            var enemyUnits = gridSystem.GetEnemyUnits();
            
            // Remove dead units
            gridSystem.ClearDeadUnits();
            
            // Check if battle is over
            bool playerWon = enemyUnits.Count == 0;
            bool playerLost = playerUnits.Count == 0;
            
            if (playerWon || playerLost)
            {
                EndBattle();
                
                if (gameManager != null)
                {
                    gameManager.EndBattle(playerWon);
                }
            }
        }
        
        public bool IsBattleActive()
        {
            return isBattleActive;
        }
        
        public int GetPlayerUnitCount()
        {
            if (gridSystem == null) return 0;
            return gridSystem.GetPlayerUnits().Count;
        }
        
        public int GetEnemyUnitCount()
        {
            if (gridSystem == null) return 0;
            return gridSystem.GetEnemyUnits().Count;
        }
    }
}
