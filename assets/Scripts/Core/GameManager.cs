using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using MergePrototype.Core;
using MergePrototype.Systems;
using MergePrototype.Units;

namespace MergePrototype.Core
{
    public class GameManager : MonoBehaviour
    {
        [Header("Game Systems")]
        public GridSystem gridSystem;
        public EconomySystem economySystem;
        public BattleSystem battleSystem;
        public UnitFactory unitFactory;
        
        [Header("UI References")]
        public Text coinsText;
        public Text roundText;
        public Button fightButton;
        public Button rerollButton;
        public Text rerollCostText;
        
        [Header("Shop Settings")]
        public Transform shopContainer;
        public GameObject unitCardPrefab;
        public int shopSize = 5;
        
        [Header("Game State")]
        public GameState currentState = GameState.Shop;
        public int currentRound = 1;
        
        private List<GameConfig.UnitType> shopUnits = new List<GameConfig.UnitType>();
        private List<GameObject> shopCards = new List<GameObject>();
        
        public enum GameState
        {
            Shop,
            Battle,
            GameOver
        }
        
        private static GameManager instance;
        public static GameManager Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = FindObjectOfType<GameManager>();
                }
                return instance;
            }
        }
        
        private void Awake()
        {
            if (instance == null)
            {
                instance = this;
                DontDestroyOnLoad(gameObject);
            }
            else if (instance != this)
            {
                Destroy(gameObject);
            }
        }
        
        private void Start()
        {
            InitializeGame();
        }
        
        private void InitializeGame()
        {
            // Initialize systems
            if (gridSystem == null) gridSystem = FindObjectOfType<GridSystem>();
            if (economySystem == null) economySystem = FindObjectOfType<EconomySystem>();
            if (battleSystem == null) battleSystem = FindObjectOfType<BattleSystem>();
            if (unitFactory == null) unitFactory = FindObjectOfType<UnitFactory>();
            
            // Initialize each system
            if (gridSystem != null) gridSystem.Initialize();
            if (economySystem != null) economySystem.Initialize();
            if (battleSystem != null) battleSystem.Initialize();
            
            // Subscribe to events
            EconomySystem.OnCoinsChanged += UpdateCoinsDisplay;
            
            // Initialize UI
            UpdateCoinsDisplay(economySystem.GetCoins());
            UpdateRoundDisplay();
            
            // Generate initial shop
            GenerateShop();
            
            // Set up button listeners
            if (fightButton != null)
                fightButton.onClick.AddListener(StartBattle);
            
            if (rerollButton != null)
                rerollButton.onClick.AddListener(RerollShop);
            
            Debug.Log("Game initialized successfully!");
        }
        
        private void Update()
        {
            // Update game state
            switch (currentState)
            {
                case GameState.Shop:
                    UpdateShopState();
                    break;
                case GameState.Battle:
                    UpdateBattleState();
                    break;
                case GameState.GameOver:
                    UpdateGameOverState();
                    break;
            }
        }
        
        private void UpdateShopState()
        {
            // Shop state logic
        }
        
        private void UpdateBattleState()
        {
            // Battle state logic handled by BattleSystem
        }
        
        private void UpdateGameOverState()
        {
            // Game over state logic
        }
        
        public void GenerateShop()
        {
            // Clear existing shop cards
            ClearShop();
            
            // Generate random units for shop
            shopUnits.Clear();
            GameConfig.UnitType[] allUnitTypes = System.Enum.GetValues(typeof(GameConfig.UnitType)) as GameConfig.UnitType[];
            
            for (int i = 0; i < shopSize; i++)
            {
                GameConfig.UnitType randomType = allUnitTypes[Random.Range(0, allUnitTypes.Length)];
                shopUnits.Add(randomType);
            }
            
            // Create shop cards
            CreateShopCards();
        }
        
        private void CreateShopCards()
        {
            if (shopContainer == null || unitCardPrefab == null) return;
            
            for (int i = 0; i < shopUnits.Count; i++)
            {
                GameObject cardObject = Instantiate(unitCardPrefab, shopContainer);
                UnitCard card = cardObject.GetComponent<UnitCard>();
                
                if (card != null)
                {
                    card.Initialize(shopUnits[i], i, this);
                    shopCards.Add(cardObject);
                }
            }
        }
        
        private void ClearShop()
        {
            foreach (GameObject card in shopCards)
            {
                if (card != null)
                {
                    Destroy(card);
                }
            }
            shopCards.Clear();
        }
        
        public void OnUnitCardClicked(int cardIndex)
        {
            if (cardIndex < 0 || cardIndex >= shopUnits.Count) return;
            
            GameConfig.UnitType unitType = shopUnits[cardIndex];
            Debug.Log($"Selected unit: {unitType}");
            
            // TODO: Implement unit selection for placement
        }
        
        public void RerollShop()
        {
            if (economySystem.TryReroll())
            {
                GenerateShop();
                Debug.Log("Shop rerolled!");
            }
            else
            {
                Debug.Log("Not enough coins for reroll!");
            }
        }
        
        public void StartBattle()
        {
            if (currentState != GameState.Shop) return;
            
            currentState = GameState.Battle;
            
            if (battleSystem != null)
            {
                battleSystem.StartBattle();
            }
            
            // Hide shop UI
            if (shopContainer != null)
                shopContainer.gameObject.SetActive(false);
            
            if (rerollButton != null)
                rerollButton.gameObject.SetActive(false);
            
            if (fightButton != null)
                fightButton.gameObject.SetActive(false);
            
            Debug.Log("Battle started!");
        }
        
        public void EndBattle(bool playerWon)
        {
            currentState = GameState.Shop;
            
            if (playerWon)
            {
                currentRound++;
                economySystem.AddWinReward();
                Debug.Log($"Round {currentRound - 1} completed! Reward: {GameConfig.WIN_REWARD} coins");
            }
            else
            {
                Debug.Log("Battle lost!");
                // TODO: Handle game over
            }
            
            // Show shop UI
            if (shopContainer != null)
                shopContainer.gameObject.SetActive(true);
            
            if (rerollButton != null)
                rerollButton.gameObject.SetActive(true);
            
            if (fightButton != null)
                fightButton.gameObject.SetActive(true);
            
            // Generate new shop
            GenerateShop();
            
            UpdateRoundDisplay();
        }
        
        private void UpdateCoinsDisplay(int coins)
        {
            if (coinsText != null)
            {
                coinsText.text = $"Coins: {coins}";
            }
        }
        
        private void UpdateRoundDisplay()
        {
            if (roundText != null)
            {
                roundText.text = $"Round: {currentRound}";
            }
        }
        
        private void OnDestroy()
        {
            // Unsubscribe from events
            EconomySystem.OnCoinsChanged -= UpdateCoinsDisplay;
        }
    }
}
