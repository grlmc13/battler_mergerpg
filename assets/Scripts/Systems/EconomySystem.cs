using UnityEngine;
using System;
using MergePrototype.Core;

namespace MergePrototype.Systems
{
    public class EconomySystem : MonoBehaviour
    {
        [Header("Economy Settings")]
        public int startingCoins = GameConfig.STARTING_COINS;
        public int rerollCost = GameConfig.REROLL_COST;
        public int winReward = GameConfig.WIN_REWARD;
        
        private int coins;
        private int totalEarned;
        private int totalSpent;
        
        // Events
        public static event Action<int> OnCoinsChanged;
        
        public void Initialize()
        {
            coins = startingCoins;
            totalEarned = 0;
            totalSpent = 0;
            
            Debug.Log($"Economy initialized with {coins} coins");
        }
        
        public int GetCoins()
        {
            return coins;
        }
        
        public void AddCoins(int amount)
        {
            coins += amount;
            totalEarned += amount;
            
            Debug.Log($"Earned {amount} coins. Total: {coins}");
            
            // Trigger coins changed event
            OnCoinsChanged?.Invoke(coins);
        }
        
        public bool SpendCoins(int amount)
        {
            if (CanAfford(amount))
            {
                coins -= amount;
                totalSpent += amount;
                
                Debug.Log($"Spent {amount} coins. Remaining: {coins}");
                
                // Trigger coins changed event
                OnCoinsChanged?.Invoke(coins);
                
                return true;
            }
            
            Debug.Log($"Cannot afford {amount} coins. Current: {coins}");
            return false;
        }
        
        public bool CanAfford(int amount)
        {
            return coins >= amount;
        }
        
        public EconomyStats GetStats()
        {
            return new EconomyStats
            {
                currentCoins = coins,
                totalEarned = totalEarned,
                totalSpent = totalSpent,
                netProfit = totalEarned - totalSpent
            };
        }
        
        public void Reset()
        {
            coins = startingCoins;
            totalEarned = 0;
            totalSpent = 0;
            
            Debug.Log("Economy reset");
            
            // Trigger coins changed event
            OnCoinsChanged?.Invoke(coins);
        }
        
        // Helper methods for specific actions
        public bool TryReroll()
        {
            return SpendCoins(rerollCost);
        }
        
        public void AddWinReward()
        {
            AddCoins(winReward);
        }
        
        public int GetRerollCost()
        {
            return rerollCost;
        }
    }
    
    [System.Serializable]
    public struct EconomyStats
    {
        public int currentCoins;
        public int totalEarned;
        public int totalSpent;
        public int netProfit;
    }
}
