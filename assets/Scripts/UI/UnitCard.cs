using UnityEngine;
using UnityEngine.UI;
using MergePrototype.Core;

namespace MergePrototype.UI
{
    public class UnitCard : MonoBehaviour
    {
        [Header("UI Components")]
        public Image unitIcon;
        public Text unitNameText;
        public Text unitCostText;
        public Button cardButton;
        
        private GameConfig.UnitType unitType;
        private int cardIndex;
        private GameManager gameManager;
        
        public void Initialize(GameConfig.UnitType type, int index, GameManager manager)
        {
            unitType = type;
            cardIndex = index;
            gameManager = manager;
            
            // Get unit data
            var unitData = GameConfig.GetUnitData(unitType);
            
            // Set UI elements
            if (unitNameText != null)
                unitNameText.text = unitData.name;
            
            if (unitCostText != null)
                unitCostText.text = "FREE"; // All units are free now
            
            if (unitIcon != null)
                unitIcon.color = unitData.color;
            
            // Set up button
            if (cardButton != null)
                cardButton.onClick.AddListener(OnCardClicked);
        }
        
        private void OnCardClicked()
        {
            if (gameManager != null)
            {
                gameManager.OnUnitCardClicked(cardIndex);
            }
        }
        
        public GameConfig.UnitType GetUnitType()
        {
            return unitType;
        }
        
        public int GetCardIndex()
        {
            return cardIndex;
        }
    }
}
