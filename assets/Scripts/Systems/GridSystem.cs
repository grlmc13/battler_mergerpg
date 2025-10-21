using UnityEngine;
using System.Collections.Generic;
using MergePrototype.Core;

namespace MergePrototype.Systems
{
    public class GridSystem : MonoBehaviour
    {
        [Header("Grid Settings")]
        public int gridWidth = GameConfig.GRID_WIDTH;
        public int gridHeight = GameConfig.GRID_HEIGHT;
        public float cellSize = GameConfig.CELL_SIZE;
        
        [Header("Visual Settings")]
        public Color gridLineColor = new Color(0.27f, 0.27f, 0.27f, 0.5f);
        public Color playerAreaColor = new Color(0.29f, 0.56f, 0.89f, 0.1f);
        public Color enemyAreaColor = new Color(0.89f, 0.29f, 0.29f, 0.1f);
        
        private Unit[,] grid;
        private float gridOffsetX;
        private float gridOffsetY;
        private LineRenderer gridLines;
        
        public void Initialize()
        {
            // Calculate grid offset for centering
            float screenWidth = Screen.width;
            float screenHeight = Screen.height;
            
            gridOffsetX = (screenWidth - (gridWidth * cellSize)) / 2f;
            gridOffsetY = (screenHeight - (gridHeight * cellSize)) / 2f - 50f; // Offset up for UI
            
            // Initialize grid array
            grid = new Unit[gridHeight, gridWidth];
            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    grid[y, x] = null;
                }
            }
            
            // Create visual grid
            CreateVisualGrid();
            
            Debug.Log($"Grid created: {gridWidth}x{gridHeight}, cell size: {cellSize}");
        }
        
        private void CreateVisualGrid()
        {
            // Create LineRenderer for grid lines
            GameObject gridObject = new GameObject("GridLines");
            gridLines = gridObject.AddComponent<LineRenderer>();
            gridLines.material = new Material(Shader.Find("Sprites/Default"));
            gridLines.color = gridLineColor;
            gridLines.startWidth = 1f;
            gridLines.endWidth = 1f;
            gridLines.useWorldSpace = false;
            
            // Calculate line positions
            List<Vector3> linePositions = new List<Vector3>();
            
            // Vertical lines
            for (int x = 0; x <= gridWidth; x++)
            {
                float startX = gridOffsetX + (x * cellSize);
                float startY = gridOffsetY;
                float endY = gridOffsetY + (gridHeight * cellSize);
                
                linePositions.Add(new Vector3(startX, startY, 0));
                linePositions.Add(new Vector3(startX, endY, 0));
            }
            
            // Horizontal lines
            for (int y = 0; y <= gridHeight; y++)
            {
                float startY = gridOffsetY + (y * cellSize);
                float startX = gridOffsetX;
                float endX = gridOffsetX + (gridWidth * cellSize);
                
                linePositions.Add(new Vector3(startX, startY, 0));
                linePositions.Add(new Vector3(endX, startY, 0));
            }
            
            gridLines.positionCount = linePositions.Count;
            gridLines.SetPositions(linePositions.ToArray());
            
            // Create area backgrounds
            CreateAreaBackgrounds();
        }
        
        private void CreateAreaBackgrounds()
        {
            // Player area (bottom half)
            GameObject playerArea = new GameObject("PlayerArea");
            SpriteRenderer playerRenderer = playerArea.AddComponent<SpriteRenderer>();
            playerRenderer.color = playerAreaColor;
            
            // Create a simple white sprite for the background
            Texture2D texture = new Texture2D(1, 1);
            texture.SetPixel(0, 0, Color.white);
            texture.Apply();
            
            Sprite sprite = Sprite.Create(texture, new Rect(0, 0, 1, 1), new Vector2(0.5f, 0.5f));
            playerRenderer.sprite = sprite;
            
            float playerAreaY = gridOffsetY + (gridHeight / 2f * cellSize);
            playerArea.transform.position = new Vector3(
                gridOffsetX + (gridWidth * cellSize) / 2f,
                playerAreaY + (gridHeight / 2f * cellSize) / 2f,
                0
            );
            playerArea.transform.localScale = new Vector3(gridWidth * cellSize, (gridHeight / 2f) * cellSize, 1);
            
            // Enemy area (top half)
            GameObject enemyArea = new GameObject("EnemyArea");
            SpriteRenderer enemyRenderer = enemyArea.AddComponent<SpriteRenderer>();
            enemyRenderer.color = enemyAreaColor;
            enemyRenderer.sprite = sprite;
            
            enemyArea.transform.position = new Vector3(
                gridOffsetX + (gridWidth * cellSize) / 2f,
                gridOffsetY + (gridHeight / 2f * cellSize) / 2f,
                0
            );
            enemyArea.transform.localScale = new Vector3(gridWidth * cellSize, (gridHeight / 2f) * cellSize, 1);
        }
        
        public Vector2Int GetGridPosition(Vector2 worldPosition)
        {
            int gridX = Mathf.FloorToInt((worldPosition.x - gridOffsetX) / cellSize);
            int gridY = Mathf.FloorToInt((worldPosition.y - gridOffsetY) / cellSize);
            
            return new Vector2Int(
                Mathf.Clamp(gridX, 0, gridWidth - 1),
                Mathf.Clamp(gridY, 0, gridHeight - 1)
            );
        }
        
        public Vector2 GetWorldPosition(int gridX, int gridY)
        {
            return new Vector2(
                gridOffsetX + (gridX * cellSize) + (cellSize / 2f),
                gridOffsetY + (gridY * cellSize) + (cellSize / 2f)
            );
        }
        
        public bool CanPlaceUnit(int gridX, int gridY, Vector2Int size, bool isEnemy = false)
        {
            // Check boundaries
            if (gridX < 0 || gridY < 0 || 
                gridX + size.x > gridWidth || 
                gridY + size.y > gridHeight)
            {
                return false;
            }
            
            // Check if cells are free
            for (int y = gridY; y < gridY + size.y; y++)
            {
                for (int x = gridX; x < gridX + size.x; x++)
                {
                    if (grid[y, x] != null)
                    {
                        return false;
                    }
                }
            }
            
            // Check placement area
            int playerAreaStart = gridHeight / 2;
            if (!isEnemy && gridY < playerAreaStart)
            {
                return false; // Player units must be in bottom half
            }
            if (isEnemy && gridY >= playerAreaStart)
            {
                return false; // Enemy units must be in top half
            }
            
            return true;
        }
        
        public bool PlaceUnit(int gridX, int gridY, Unit unit)
        {
            Vector2Int size = unit.GetSize();
            
            if (!CanPlaceUnit(gridX, gridY, size, unit.IsEnemy))
            {
                return false;
            }
            
            // Place unit in grid
            for (int y = gridY; y < gridY + size.y; y++)
            {
                for (int x = gridX; x < gridX + size.x; x++)
                {
                    grid[y, x] = unit;
                }
            }
            
            // Set unit world position
            Vector2 worldPos = GetWorldPosition(gridX, gridY);
            unit.SetPosition(worldPos.x, worldPos.y);
            unit.SetGridPosition(gridX, gridY);
            
            return true;
        }
        
        public void RemoveUnit(Unit unit)
        {
            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    if (grid[y, x] == unit)
                    {
                        grid[y, x] = null;
                    }
                }
            }
        }
        
        public void ClearDeadUnits()
        {
            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    if (grid[y, x] != null && !grid[y, x].IsAlive())
                    {
                        grid[y, x] = null;
                    }
                }
            }
        }
        
        public List<Unit> GetUnitsInRange(int centerX, int centerY, float range)
        {
            List<Unit> units = new List<Unit>();
            
            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    if (grid[y, x] != null)
                    {
                        float distance = Vector2.Distance(
                            new Vector2(x, y), 
                            new Vector2(centerX, centerY)
                        );
                        
                        if (distance <= range)
                        {
                            units.Add(grid[y, x]);
                        }
                    }
                }
            }
            
            return units;
        }
        
        public bool IsValidPosition(int gridX, int gridY)
        {
            return gridX >= 0 && gridX < gridWidth && 
                   gridY >= 0 && gridY < gridHeight;
        }
        
        public Unit GetUnitAt(int gridX, int gridY)
        {
            if (IsValidPosition(gridX, gridY))
            {
                return grid[gridY, gridX];
            }
            return null;
        }
        
        public List<Unit> GetAllUnits()
        {
            List<Unit> units = new List<Unit>();
            
            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    if (grid[y, x] != null)
                    {
                        units.Add(grid[y, x]);
                    }
                }
            }
            
            return units;
        }
        
        public List<Unit> GetPlayerUnits()
        {
            List<Unit> units = new List<Unit>();
            int playerAreaStart = gridHeight / 2;
            
            for (int y = playerAreaStart; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    if (grid[y, x] != null && !grid[y, x].IsEnemy)
                    {
                        units.Add(grid[y, x]);
                    }
                }
            }
            
            return units;
        }
        
        public List<Unit> GetEnemyUnits()
        {
            List<Unit> units = new List<Unit>();
            int playerAreaStart = gridHeight / 2;
            
            for (int y = 0; y < playerAreaStart; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    if (grid[y, x] != null && grid[y, x].IsEnemy)
                    {
                        units.Add(grid[y, x]);
                    }
                }
            }
            
            return units;
        }
    }
}
