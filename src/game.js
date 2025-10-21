/**
 * Đ‘ĐĐ˘Đ˘Đ›Đ•Đ  Đ ĐźĐ“ - ĐźĐ ĐžĐ˘ĐžĐ˘ĐĐź
 * 
 * Auto-battler Đ¸ĐłŃ€Đ° Ń ĐĽĐµŃ…Đ°Đ˝Đ¸ĐşĐľĐą Best of 5 Ń€Đ°ŃĐ˝Đ´ĐľĐ˛.
 * ĐˇĐľĐ·Đ´Đ°Đ˝Đľ Đ˝Đ° Phaser 3 Đ´Đ»ŃŹ web-ĐżĐ»Đ°Ń‚Ń„ĐľŃ€ĐĽ Ń ĐżĐľĐ´Đ´ĐµŃ€Đ¶ĐşĐľĐą ĐĽĐľĐ±Đ¸Đ»ŃŚĐ˝Ń‹Ń… ŃŃŃ‚Ń€ĐľĐąŃŃ‚Đ˛.
 * 
 * ĐžŃĐ˝ĐľĐ˛Đ˝Ń‹Đµ ĐĽĐµŃ…Đ°Đ˝Đ¸ĐşĐ¸:
 * - Đ Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸Đµ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ˝Đ° ŃĐµŃ‚ĐşĐµ ĐżĐµŃ€ĐµĐ´ Đ±ĐľĐµĐĽ
 * - ĐĐ˛Ń‚ĐľĐĽĐ°Ń‚Đ¸Ń‡ĐµŃĐşĐ¸Đą Đ±ĐľĐą Ń ĐżĐľĐ¸ŃĐşĐľĐĽ Đ±Đ»Đ¸Đ¶Đ°ĐąŃĐ¸Ń… Ń†ĐµĐ»ĐµĐą
 * - Đ­ĐşĐľĐ˝ĐľĐĽĐ¸ĐşĐ° Đ˝Đ° ĐľŃĐ˝ĐľĐ˛Đµ ŃĐ±Đ¸ĐąŃŃ‚Đ˛ Đ˛Ń€Đ°ĐłĐľĐ˛
 * - Đ¤ĐľŃ€ĐĽĐ°Ń‚ Best of 5 (ĐżĐµŃ€Đ˛Ń‹ĐĽ Đ´Đľ 3 ĐżĐľĐ±ĐµĐ´)
 * - Đ’ĐľŃĐşŃ€ĐµŃĐµĐ˝Đ¸Đµ Đ¸ ĐżĐľĐ»Đ˝ĐľĐµ Đ»ĐµŃ‡ĐµĐ˝Đ¸Đµ ĐĽĐµĐ¶Đ´Ń Ń€Đ°ŃĐ˝Đ´Đ°ĐĽĐ¸
 * 
 * @version 1.0.0
 * @author Game Designer & Artist
 */

// ============================================================================
// Đ“Đ›ĐžĐ‘ĐĐ›Đ¬ĐťĐĐŻ ĐšĐžĐťĐ¤ĐĐ“ĐŁĐ ĐĐ¦ĐĐŻ
// ============================================================================
/**
 * Đ“Đ»Đ°Đ˛Đ˝Đ°ŃŹ ĐşĐľĐ˝Ń„Đ¸ĐłŃŃ€Đ°Ń†Đ¸ŃŹ Đ¸ĐłŃ€Ń‹
 * ĐˇĐľĐ´ĐµŃ€Đ¶Đ¸Ń‚ Đ˝Đ°ŃŃ‚Ń€ĐľĐąĐşĐ¸ ŃĐµŃ‚ĐşĐ¸, ŃŤĐşĐľĐ˝ĐľĐĽĐ¸ĐşĐ¸ Đ¸ ŃŃ‚Đ°Ń‚Đ¸ŃŃ‚Đ¸ĐşŃ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
 */
window.gameConfig = {
    // ĐťĐ°ŃŃ‚Ń€ĐľĐąĐşĐ¸ Đ¸ĐłŃ€ĐľĐ˛ĐľĐłĐľ ĐżĐľĐ»ŃŹ
    GRID_WIDTH: 8,              // Đ¨Đ¸Ń€Đ¸Đ˝Đ° ŃĐµŃ‚ĐşĐ¸ Đ˛ ĐşĐ»ĐµŃ‚ĐşĐ°Ń…
    GRID_HEIGHT: 12,            // Đ’Ń‹ŃĐľŃ‚Đ° ŃĐµŃ‚ĐşĐ¸ Đ˛ ĐşĐ»ĐµŃ‚ĐşĐ°Ń… (6 Đ¸ĐłŃ€ĐľĐş + 6 Đ˛Ń€Đ°Đł)
    CELL_SIZE: 80,              // Đ Đ°Đ·ĐĽĐµŃ€ ĐşĐ»ĐµŃ‚ĐşĐ¸ Đ˛ ĐżĐ¸ĐşŃĐµĐ»ŃŹŃ…
    PLAYER_AREA_HEIGHT: 6,      // ĐšĐľĐ»Đ¸Ń‡ĐµŃŃ‚Đ˛Đľ Ń€ŃŹĐ´ĐľĐ˛ Đ´Đ»ŃŹ Đ¸ĐłŃ€ĐľĐşĐ°
    ENEMY_AREA_HEIGHT: 6,       // ĐšĐľĐ»Đ¸Ń‡ĐµŃŃ‚Đ˛Đľ Ń€ŃŹĐ´ĐľĐ˛ Đ´Đ»ŃŹ Đ˛Ń€Đ°ĐłĐ°
    VERSION: '1.2.2',           // Đ’ĐµŃ€ŃĐ¸ŃŹ ĐşĐľĐ˝Ń„Đ¸ĐłŃŃ€Đ°Ń†Đ¸Đ¸ Đ´Đ»ŃŹ ĐľŃ‚Đ»Đ°Đ´ĐşĐ¸
    
    // Đ­ĐşĐľĐ˝ĐľĐĽĐ¸ĐşĐ°
    STARTING_COINS: 10,         // ĐˇŃ‚Đ°Ń€Ń‚ĐľĐ˛Ń‹Đą ĐşĐ°ĐżĐ¸Ń‚Đ°Đ» Đ˛ Ń€Đ°ŃĐ˝Đ´Đµ 1
    ROUND_COINS: 10,             // ĐśĐľĐ˝ĐµŃ‚Ń‹ Đ˛ ĐşĐ°Đ¶Đ´ĐľĐĽ ĐżĐľŃĐ»ĐµĐ´ŃŃŽŃ‰ĐµĐĽ Ń€Đ°ŃĐ˝Đ´Đµ (2, 3, 4, 5...)
    
    // Đ˘Đ¸ĐżŃ‹ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ¸ Đ¸Ń… Ń…Đ°Ń€Đ°ĐşŃ‚ĐµŃ€Đ¸ŃŃ‚Đ¸ĐşĐ¸
    UNIT_TYPES: {
        ARCHER: {
            name: 'Đ›ŃŃ‡Đ˝Đ¸Đş',
            size: { width: 1, height: 1 },
            cost: 2,
            hp: 30,
            damage: 8,
            attackSpeed: 0.5,          // ĐžŃ‡ĐµĐ˝ŃŚ Đ±Ń‹ŃŃ‚Ń€Đ°ŃŹ Đ°Ń‚Đ°ĐşĐ°
            range: 10,                 // Đ”Đ°Đ»ŃŚĐ˝ĐľŃŃ‚ŃŚ Đ°Ń‚Đ°ĐşĐ¸ Đ˛ ĐşĐ»ĐµŃ‚ĐşĐ°Ń… (ĐżĐľĐşŃ€Ń‹Đ˛Đ°ĐµŃ‚ Đ˛ŃĐµ ĐżĐľĐ»Đµ)
            sellPrice: 2,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 2,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0x4A90E2            // ĐˇĐ¸Đ˝Đ¸Đą Ń†Đ˛ĐµŃ‚
        },
        WARRIOR: {
            name: 'ĐśĐµŃ‡Đ˝Đ¸Đş',
            size: { width: 1, height: 2 },
            cost: 3,
            hp: 50,
            damage: 12,
            attackSpeed: 1.0,
            range: 10, // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝ Ń€Đ°Đ´Đ¸ŃŃ Đ´Đ»ŃŹ Đ˛ŃĐµĐłĐľ ĐżĐľĐ»ŃŹ
            hasBattleCry: true,        // ĐˇĐźĐžĐˇĐžĐ‘ĐťĐžĐˇĐ˘Đ¬: Đ‘ĐľĐµĐ˛ĐľĐą ĐşĐ»Đ¸Ń‡ (2+ ĐĽĐµŃ‡Đ˝Đ¸ĐşĐ° ŃŃĐşĐľŃ€ŃŹŃŽŃ‚ ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐľĐ˛)
            battleCryBonus: 0.25,      // Đ‘ĐľĐ˝ŃŃ Đş ŃĐşĐľŃ€ĐľŃŃ‚Đ¸ Đ°Ń‚Đ°ĐşĐ¸ (25% Đ±Ń‹ŃŃ‚Ń€ĐµĐµ)
            sellPrice: 3,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 3,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0xE24A4A
        },
        BARBARIAN: {
            name: 'Đ’Đ°Ń€Đ˛Đ°Ń€',
            size: { width: 2, height: 1 },
            cost: 4,
            hp: 60,
            damage: 15,
            attackSpeed: 1.5,
            range: 10,
            hasTaunt: true,              // ĐˇĐźĐžĐˇĐžĐ‘ĐťĐžĐˇĐ˘Đ¬: ĐźŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸ŃŹ (Đ˛Ń€Đ°ĐłĐ¸ Đ°Ń‚Đ°ĐşŃŃŽŃ‚ Đ˛ ĐżĐµŃ€Đ˛ŃŃŽ ĐľŃ‡ĐµŃ€ĐµĐ´ŃŚ)
            sellPrice: 4,                // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 4,         // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0xFF8C00
        },
        HEALER: {
            name: 'Đ›ĐµĐşĐ°Ń€ŃŚ',
            size: { width: 1, height: 1 },
            cost: 3,
            hp: 25,
            damage: 3,
            attackSpeed: 2.0, // Đ’ĐľĐ·Đ˛Ń€Đ°Ń‰Đ°ĐµĐĽ Đ¸ŃŃ…ĐľĐ´Đ˝ĐľĐµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸Đµ
            range: 10, // ĐťĐµĐľĐłŃ€Đ°Đ˝Đ¸Ń‡ĐµĐ˝Đ˝Ń‹Đą Ń€Đ°Đ´Đ¸ŃŃ Đ°Ń‚Đ°ĐşĐ¸ (ĐşĐ°Đş Ń Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛)
            healRange: 2, // ĐžĐłŃ€Đ°Đ˝Đ¸Ń‡ĐµĐ˝Đ˝Ń‹Đą Ń€Đ°Đ´Đ¸ŃŃ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ
            healAmount: 8, // ĐšĐľĐ»Đ¸Ń‡ĐµŃŃ‚Đ˛Đľ HP Đ·Đ° Đ»ĐµŃ‡ĐµĐ˝Đ¸Đµ
            sellPrice: 3,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 3,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0x32CD32
        },
        MAGE: {
            name: 'ĐśĐ°Đł',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 40,
            damage: 8, // ĐśĐµĐ˝ŃŚŃĐµ ŃŃ€ĐľĐ˝Đ°, Đ˝Đľ Đ±ŃŚĐµŃ‚ ĐżĐľ 3 Ń†ĐµĐ»ŃŹĐĽ
            attackSpeed: 2.5, // ĐśĐµĐ´Đ»ĐµĐ˝Đ˝ĐµĐµ Đ°Ń‚Đ°ĐşŃĐµŃ‚
            range: 10, // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝ Ń€Đ°Đ´Đ¸ŃŃ Đ´Đ»ŃŹ Đ˛ŃĐµĐłĐľ ĐżĐľĐ»ŃŹ
            maxTargets: 3, // ĐŃ‚Đ°ĐşŃĐµŃ‚ Đ´Đľ 3 Ń†ĐµĐ»ĐµĐą ĐľĐ´Đ˝ĐľĐ˛Ń€ĐµĐĽĐµĐ˝Đ˝Đľ
            sellPrice: 5,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 5,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0x9B4AE2
        },
        TANK: {
            name: 'Đ˘Đ°Đ˝Đş',
            size: { width: 2, height: 2 },
            cost: 5,
            hp: 80,
            damage: 10,
            attackSpeed: 2.0,
            range: 10,
            hasShield: true,
            shieldReduction: 0.3,
            sellPrice: 5,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 5,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0xC0C0C0
        },
        ASSASSIN: {
            name: 'ĐŃŃĐ°ŃĐ¸Đ˝',
            size: { width: 1, height: 1 },
            cost: 3,
            hp: 20,
            damage: 20,
            attackSpeed: 1.2,
            range: 10,
            hasCritical: true,
            criticalChance: 0.5,
            sellPrice: 3,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 3,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0x8B008B
        },
        DRUID: {
            name: 'Đ”Ń€ŃĐ¸Đ´',
            size: { width: 2, height: 2 },
            occupiedCells: [
                { x: 1, y: 0 }, // Top-right
                { x: 0, y: 1 }, // Bottom-left
                { x: 1, y: 1 }  // Bottom-right
            ],
            cost: 4,
            hp: 45,
            damage: 6,
            attackSpeed: 1.8,
            range: 10,
            hasThorns: true,
            thornsDamage: 5,
            sellPrice: 4,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 4,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0x8B4513
        },
        WITCH: {
            name: 'Đ’ĐµĐ´ŃŚĐĽĐ°',
            size: { width: 2, height: 2 },
            occupiedCells: [
                { x: 0, y: 0 }, // Top-left
                { x: 0, y: 1 }, // Bottom-left  
                { x: 1, y: 1 }  // Bottom-right (missing top-right)
            ],
            cost: 6,
            hp: 35,
            damage: 12,
            attackSpeed: 3.0,
            range: 10,
            hasCurse: true,
            curseDebuff: 0.5,
            sellPrice: 6,              // Đ‘Đ°Đ·ĐľĐ˛Đ°ŃŹ Ń†ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            sellPricePerStar: 6,       // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ Ń†ĐµĐ˝Đ° Đ·Đ° ĐşĐ°Đ¶Đ´ŃŃŽ Đ·Đ˛ĐµĐ·Đ´Ń ĐĽĐµŃ€Đ´Đ¶Đ°
            color: 0x4B0082
        }
    }
};

// ============================================================================
// ĐˇĐĐˇĐ˘Đ•ĐśĐ ĐŁĐźĐ ĐĐ’Đ›Đ•ĐťĐĐŻ ĐˇĐ•Đ˘ĐšĐžĐ™
// ============================================================================
/**
 * GridSystem - ŃĐżŃ€Đ°Đ˛Đ»ŃŹĐµŃ‚ ŃĐµŃ‚ĐşĐľĐą Đ¸ĐłŃ€ĐľĐ˛ĐľĐłĐľ ĐżĐľĐ»ŃŹ
 * 
 * ĐžŃ‚Đ˛ĐµŃ‡Đ°ĐµŃ‚ Đ·Đ°:
 * - ĐˇĐľĐ·Đ´Đ°Đ˝Đ¸Đµ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝ĐľĐą ŃĐµŃ‚ĐşĐ¸
 * - Đ Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸Đµ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ˝Đ° ĐşĐ»ĐµŃ‚ĐşĐ°Ń…
 * - ĐźŃ€ĐľĐ˛ĐµŃ€ĐşŃ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚Đ¸ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ
 * - ĐšĐľĐ˝Đ˛ĐµŃ€Ń‚Đ°Ń†Đ¸ŃŽ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚ (ĐĽĐ¸Ń€ĐľĐ˛Ń‹Đµ â†” ŃĐµŃ‚ĐşĐ°)
 */
class GridSystem {
    constructor(scene) {
        this.scene = scene;
        this.grid = [];
        this.cellSize = 0;
        this.gridWidth = 0;
        this.gridHeight = 0;
        this.gridOffsetX = 0;
        this.gridOffsetY = 0;
        this.gridGraphics = null; // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ ŃŃŃ‹Đ»ĐşŃ Đ˝Đ° Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝ŃŃŽ ŃĐµŃ‚ĐşŃ
    }

    createGrid(width, height, cellSize) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.cellSize = cellSize;
        
        // Đ¦ĐµĐ˝Ń‚Ń€Đ¸Ń€ŃĐµĐĽ ĐżĐľĐ»Đµ Đ˝Đ° ŃŤĐşŃ€Đ°Đ˝Đµ
        const screenWidth = this.scene.cameras.main.width;
        this.gridOffsetX = (screenWidth - (width * cellSize)) / 2; // Đ¦ĐµĐ˝Ń‚Ń€Đ¸Ń€ŃĐµĐĽ ĐżĐľ ĐłĐľŃ€Đ¸Đ·ĐľĐ˝Ń‚Đ°Đ»Đ¸
        this.gridOffsetY = 100; // ĐžŃ‚ŃŃ‚ŃĐż ŃĐ˛ĐµŃ€Ń…Ń
        
        console.log(`GridSystem: ŃĐľĐ·Đ´Đ°ĐµĐĽ ŃĐµŃ‚ĐşŃ ${width}x${height}, ŃĐĽĐµŃ‰ĐµĐ˝Đ¸Đµ (${this.gridOffsetX}, ${this.gridOffsetY})`);
        
        this.grid = [];
        for (let y = 0; y < height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = null;
            }
        }
        
        this.createVisualGrid();
    }

    createVisualGrid() {
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŃ‚Đ°Ń€ŃŃŽ ŃĐµŃ‚ĐşŃ ĐµŃĐ»Đ¸ ĐµŃŃ‚ŃŚ
        if (this.gridGraphics) {
            this.gridGraphics.destroy();
        }
        
        this.gridGraphics = this.scene.add.graphics();
        
        // ĐžĐ±Đ»Đ°ŃŃ‚ŃŚ Đ˛Ń€Đ°ĐłĐ° (Đ˛ĐµŃ€Ń…Đ˝ŃŹŃŹ ĐżĐľĐ»ĐľĐ˛Đ¸Đ˝Đ°) - Ń‚ĐµĐĽĐ˝ĐµĐµ
        this.gridGraphics.fillStyle(0xE24A4A, 0.1);
        this.gridGraphics.fillRect(this.gridOffsetX, this.gridOffsetY, this.gridWidth * this.cellSize, (this.gridHeight / 2) * this.cellSize);
        
        // ĐžĐ±Đ»Đ°ŃŃ‚ŃŚ Đ¸ĐłŃ€ĐľĐşĐ° (Đ˝Đ¸Đ¶Đ˝ŃŹŃŹ ĐżĐľĐ»ĐľĐ˛Đ¸Đ˝Đ°) - ŃĐ˛ĐµŃ‚Đ»ĐµĐµ
        const playerAreaY = this.gridOffsetY + (this.gridHeight / 2 * this.cellSize);
        this.gridGraphics.fillStyle(0x4A90E2, 0.1);
        this.gridGraphics.fillRect(this.gridOffsetX, playerAreaY, this.gridWidth * this.cellSize, (this.gridHeight / 2) * this.cellSize);
        
        // ĐžŃ‡ĐµĐ˝ŃŚ Ń‚ĐľĐ˝ĐşĐ¸Đµ Đ»Đ¸Đ˝Đ¸Đ¸ ŃĐµŃ‚ĐşĐ¸
        this.gridGraphics.lineStyle(1, 0x888888, 0.2);
        
        // Đ’ĐµŃ€Ń‚Đ¸ĐşĐ°Đ»ŃŚĐ˝Ń‹Đµ Đ»Đ¸Đ˝Đ¸Đ¸
        for (let x = 1; x < this.gridWidth; x++) {
            const startX = this.gridOffsetX + (x * this.cellSize);
            const startY = this.gridOffsetY;
            const endY = this.gridOffsetY + (this.gridHeight * this.cellSize);
            this.gridGraphics.lineBetween(startX, startY, startX, endY);
        }
        
        // Đ“ĐľŃ€Đ¸Đ·ĐľĐ˝Ń‚Đ°Đ»ŃŚĐ˝Ń‹Đµ Đ»Đ¸Đ˝Đ¸Đ¸
        for (let y = 1; y < this.gridHeight; y++) {
            const startY = this.gridOffsetY + (y * this.cellSize);
            const startX = this.gridOffsetX;
            const endX = this.gridOffsetX + (this.gridWidth * this.cellSize);
            this.gridGraphics.lineBetween(startX, startY, endX, startY);
        }
    }

    getGridPosition(worldX, worldY) {
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚ŃŚ Đ˛Ń…ĐľĐ´Đ˝Ń‹Ń… ĐżĐ°Ń€Đ°ĐĽĐµŃ‚Ń€ĐľĐ˛
        if (isNaN(worldX) || isNaN(worldY) || 
            typeof worldX !== 'number' || typeof worldY !== 'number') {
            console.log('getGridPosition: Đ˝ĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Đµ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹:', worldX, worldY);
            return { x: NaN, y: NaN };
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚ŃŚ gridOffset Đ¸ cellSize
        if (isNaN(this.gridOffsetX) || isNaN(this.gridOffsetY) || isNaN(this.cellSize)) {
            console.log('getGridPosition: Đ˝ĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Đµ grid ĐżĐ°Ń€Đ°ĐĽĐµŃ‚Ń€Ń‹:', {
                gridOffsetX: this.gridOffsetX,
                gridOffsetY: this.gridOffsetY,
                cellSize: this.cellSize
            });
            return { x: NaN, y: NaN };
        }
        
        const gridX = Math.floor((worldX - this.gridOffsetX) / this.cellSize);
        const gridY = Math.floor((worldY - this.gridOffsetY) / this.cellSize);
        
        return {
            x: Math.max(0, Math.min(gridX, this.gridWidth - 1)),
            y: Math.max(0, Math.min(gridY, this.gridHeight - 1))
        };
    }

    getWorldPosition(gridX, gridY) {
        return {
            x: this.gridOffsetX + (gridX * this.cellSize) + (this.cellSize / 2),
            y: this.gridOffsetY + (gridY * this.cellSize) + (this.cellSize / 2)
        };
    }
    
    getWorldPositionForUnit(gridX, gridY, size) {
        // Đ’ĐľĐ·Đ˛Ń€Đ°Ń‰Đ°ĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ Ń†ĐµĐ˝Ń‚Ń€Đ° ŃŽĐ˝Đ¸Ń‚Đ° Ń ŃŃ‡ĐµŃ‚ĐľĐĽ ĐµĐłĐľ Ń€Đ°Đ·ĐĽĐµŃ€Đ°
        const centerX = this.gridOffsetX + (gridX * this.cellSize) + (size.width * this.cellSize / 2);
        const centerY = this.gridOffsetY + (gridY * this.cellSize) + (size.height * this.cellSize / 2);
        
        return {
            x: centerX,
            y: centerY
        };
    }

    canPlaceUnit(gridX, gridY, size, occupiedCells = null) {
        // Đ•ŃĐ»Đ¸ ĐµŃŃ‚ŃŚ occupiedCells, Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ Đ¸Ń… Đ´Đ»ŃŹ ĐżŃ€ĐľĐ˛ĐµŃ€ĐşĐ¸
        if (occupiedCells) {
            // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ ĐłŃ€Đ°Đ˝Đ¸Ń†Ń‹ Đ´Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝ĐľĐą Ń„ĐľŃ€ĐĽŃ‹
            const maxX = Math.max(...occupiedCells.map(cell => cell.x));
            const maxY = Math.max(...occupiedCells.map(cell => cell.y));
            
            if (gridX < 0 || gridY < 0 || 
                gridX + maxX >= this.gridWidth || 
                gridY + maxY >= this.gridHeight) {
                return false;
            }
            
            // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸ ŃĐ˛ĐľĐ±ĐľĐ´Đ˝Ń‹
            for (const cell of occupiedCells) {
                const checkX = gridX + cell.x;
                const checkY = gridY + cell.y;
                if (this.grid[checkY][checkX] !== null) {
                    return false;
                }
            }
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ĐľĐ˛ĐµŃ€ĐşĐ° Đ´Đ»ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Ń‹Ń… Ń„ĐľŃ€ĐĽ
            if (gridX < 0 || gridY < 0 || 
                gridX + size.width > this.gridWidth || 
                gridY + size.height > this.gridHeight) {
                return false;
            }
            
            // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ ĐşĐ»ĐµŃ‚ĐşĐ¸ ŃĐ˛ĐľĐ±ĐľĐ´Đ˝Ń‹
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    if (this.grid[y][x] !== null) {
                        return false;
                    }
                }
            }
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ ŃŽĐ˝Đ¸Ń‚ Ń€Đ°Đ·ĐĽĐµŃ‰Đ°ĐµŃ‚ŃŃŹ Đ˛ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ Đ¸ĐłŃ€ĐľĐşĐ° (Đ˝Đ¸Đ¶Đ˝ŃŹŃŹ ĐżĐľĐ»ĐľĐ˛Đ¸Đ˝Đ°)
        const playerAreaStart = this.gridHeight / 2;
        if (gridY < playerAreaStart) {
            return false;
        }
        
        return true;
    }

    /**
     * ĐźĐľĐ»ŃŃ‡Đ°ĐµŃ‚ ŃŽĐ˝Đ¸Ń‚Đ° Đ˝Đ° ŃĐşĐ°Đ·Đ°Đ˝Đ˝ĐľĐą ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ŃĐµŃ‚ĐşĐ¸
     * @param {number} gridX - X ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Đ° Đ˛ ŃĐµŃ‚ĐşĐµ
     * @param {number} gridY - Y ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Đ° Đ˛ ŃĐµŃ‚ĐşĐµ
     * @returns {Unit|null} - ŃŽĐ˝Đ¸Ń‚ Đ˝Đ° ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ Đ¸Đ»Đ¸ null
     */
    getUnitAt(gridX, gridY) {
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˝Đ° NaN Đ¸ Đ˝ĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Đµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸ŃŹ
        if (isNaN(gridX) || isNaN(gridY) || 
            gridX < 0 || gridY < 0 || 
            gridX >= this.gridWidth || 
            gridY >= this.gridHeight) {
            return null;
        }
        
        return this.grid[gridY][gridX];
    }

    /**
     * ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµŃ‚, ĐĽĐľĐ¶Đ˝Đľ Đ»Đ¸ Ń€Đ°Đ·ĐĽĐµŃŃ‚Đ¸Ń‚ŃŚ ŃŽĐ˝Đ¸Ń‚Đ° (Đ˛ĐşĐ»ŃŽŃ‡Đ°ŃŹ ĐĽĐµŃ€Đ´Đ¶)
     * @param {number} gridX - X ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Đ° Đ˛ ŃĐµŃ‚ĐşĐµ
     * @param {number} gridY - Y ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Đ° Đ˛ ŃĐµŃ‚ĐşĐµ
     * @param {Object} size - Ń€Đ°Đ·ĐĽĐµŃ€ ŃŽĐ˝Đ¸Ń‚Đ°
     * @param {string} unitType - Ń‚Đ¸Đż ŃŽĐ˝Đ¸Ń‚Đ°
     * @param {boolean} isEnemy - ŃŹĐ˛Đ»ŃŹĐµŃ‚ŃŃŹ Đ»Đ¸ Đ˛Ń€Đ°ĐłĐľĐĽ
     * @returns {Object} - {canPlace: boolean, isMerge: boolean, existingUnit: Unit|null}
     */
    canPlaceOrMerge(gridX, gridY, size, unitType, isEnemy) {
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        const occupiedCells = unitData.occupiedCells;
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ ĐłŃ€Đ°Đ˝Đ¸Ń†Ń‹
        if (occupiedCells) {
            // L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            const maxX = Math.max(...occupiedCells.map(cell => cell.x));
            const maxY = Math.max(...occupiedCells.map(cell => cell.y));
            
            if (gridX < 0 || gridY < 0 || 
                gridX + maxX >= this.gridWidth || 
                gridY + maxY >= this.gridHeight) {
                return {canPlace: false, isMerge: false, existingUnit: null};
            }
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            if (gridX < 0 || gridY < 0 || 
                gridX + size.width > this.gridWidth || 
                gridY + size.height > this.gridHeight) {
                return {canPlace: false, isMerge: false, existingUnit: null};
            }
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ
        const playerAreaStart = this.gridHeight / 2;
        if (!isEnemy && gridY < playerAreaStart) {
            return {canPlace: false, isMerge: false, existingUnit: null};
        }
        if (isEnemy && gridY + size.height > playerAreaStart) {
            return {canPlace: false, isMerge: false, existingUnit: null};
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, ĐµŃŃ‚ŃŚ Đ»Đ¸ ŃŽĐ˝Đ¸Ń‚ Đ˝Đ° ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ (Đ´Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝Ń‹Ń… Ń„ĐľŃ€ĐĽ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛ŃĐµ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸)
        let existingUnit = null;
        if (occupiedCells) {
            // Đ”Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝ĐľĐą Ń„ĐľŃ€ĐĽŃ‹ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛ŃĐµ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸
            for (const cell of occupiedCells) {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                const unitAtCell = this.getUnitAt(x, y);
                if (unitAtCell) {
                    existingUnit = unitAtCell;
                    break;
                }
            }
        } else {
            // Đ”Đ»ŃŹ ĐľĐ±Ń‹Ń‡Đ˝Ń‹Ń… Ń„ĐľŃ€ĐĽ ĐżŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ Đ»ĐµĐ˛ŃŃŽ Đ˛ĐµŃ€Ń…Đ˝ŃŽŃŽ ĐşĐ»ĐµŃ‚ĐşŃ
            existingUnit = this.getUnitAt(gridX, gridY);
        }
        
        if (existingUnit) {
            // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛ĐľĐ·ĐĽĐľĐ¶Đ˝ĐľŃŃ‚ŃŚ ĐĽĐµŃ€Đ´Đ¶Đ°
            if (!existingUnit.isEnemy && !isEnemy && 
                existingUnit.unitType === unitType && 
                existingUnit.mergeLevel < 3) {
                return {canPlace: true, isMerge: true, existingUnit: existingUnit};
            }
            return {canPlace: false, isMerge: false, existingUnit: existingUnit};
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ Đ˛ŃĐµ ĐşĐ»ĐµŃ‚ĐşĐ¸ ŃĐ˛ĐľĐ±ĐľĐ´Đ˝Ń‹
        if (occupiedCells) {
            // L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ° - ĐżŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸
            for (const cell of occupiedCells) {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                if (this.grid[y][x] !== null) {
                    return {canPlace: false, isMerge: false, existingUnit: null};
                }
            }
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    if (this.grid[y][x] !== null) {
                        return {canPlace: false, isMerge: false, existingUnit: null};
                    }
                }
            }
        }
        
        return {canPlace: true, isMerge: false, existingUnit: null};
    }

    canPlaceEnemyUnit(gridX, gridY, size) {
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ ĐłŃ€Đ°Đ˝Đ¸Ń†Ń‹
        if (gridX < 0 || gridY < 0 || 
            gridX + size.width > this.gridWidth || 
            gridY + size.height > this.gridHeight) {
            return false;
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ ĐşĐ»ĐµŃ‚ĐşĐ¸ ŃĐ˛ĐľĐ±ĐľĐ´Đ˝Ń‹
        for (let y = gridY; y < gridY + size.height; y++) {
            for (let x = gridX; x < gridX + size.width; x++) {
                if (this.grid[y][x] !== null) {
                    return false;
                }
            }
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ ŃŽĐ˝Đ¸Ń‚ Ń€Đ°Đ·ĐĽĐµŃ‰Đ°ĐµŃ‚ŃŃŹ Đ˛ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ Đ˛Ń€Đ°ĐłĐ° (Đ˛ĐµŃ€Ń…Đ˝ŃŹŃŹ ĐżĐľĐ»ĐľĐ˛Đ¸Đ˝Đ°)
        const enemyAreaEnd = this.gridHeight / 2;
        if (gridY + size.height > enemyAreaEnd) {
            return false;
        }
        
        return true;
    }

    placeUnit(gridX, gridY, unit) {
        const size = unit.getSize();
        const unitData = window.gameConfig.UNIT_TYPES[unit.unitType];
        const occupiedCells = unitData.occupiedCells;
        
        console.log(`Đ Đ°Đ·ĐĽĐµŃ‰Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚ ${unit.constructor.name} Đ˛ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ (${gridX}, ${gridY}) Ń€Đ°Đ·ĐĽĐµŃ€ĐľĐĽ ${size.width}x${size.height}`);
        
        // ĐžŃ‡Đ¸Ń‰Đ°ĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ŃŽĐ˝Đ¸Ń‚Đ°
        this.removeUnit(unit);
        
        if (occupiedCells) {
            // L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ° - Đ·Đ°Đ˝Đ¸ĐĽĐ°ĐµĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ ŃĐşĐ°Đ·Đ°Đ˝Đ˝Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸
            for (const cell of occupiedCells) {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                this.grid[y][x] = unit;
                console.log(`Đ—Đ°Đ˝Đ¸ĐĽĐ°ĐµĐĽ L-ĐşĐ»ĐµŃ‚ĐşŃ (${x}, ${y})`);
            }
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    this.grid[y][x] = unit;
                    console.log(`Đ—Đ°Đ˝Đ¸ĐĽĐ°ĐµĐĽ ĐşĐ»ĐµŃ‚ĐşŃ (${x}, ${y})`);
                }
            }
        }
        
        // ĐŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ ĐżŃ€Đ°Đ˛Đ¸Đ»ŃŚĐ˝Ń‹Đą ĐĽĐµŃ‚ĐľĐ´ Đ´Đ»ŃŹ ĐżĐľĐ·Đ¸Ń†Đ¸ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸ŃŹ
        const startX = this.gridOffsetX + (gridX * this.cellSize);
        const startY = this.gridOffsetY + (gridY * this.cellSize);
        const centerX = startX + (size.width * this.cellSize / 2);
        const centerY = startY + (size.height * this.cellSize / 2);
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝ĐľĐµ ĐżŃ€ĐµĐ´ŃŃ‚Đ°Đ˛Đ»ĐµĐ˝Đ¸Đµ Đ´Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
        if (occupiedCells) {
            unit.createVisuals();
            // Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ drag-and-drop Đ´Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
            if (!unit.isEnemy) {
                const interactiveElements = unit.spriteElements || [unit.sprite];
                interactiveElements.forEach(element => {
                    if (element && element.setInteractive) {
                        // Đ”Đ»ŃŹ ĐşĐľĐ˝Ń‚ĐµĐąĐ˝ĐµŃ€ĐľĐ˛ Đ˝ŃĐ¶Đ˝Đľ ŃĐşĐ°Đ·Đ°Ń‚ŃŚ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ Đ˛Đ·Đ°Đ¸ĐĽĐľĐ´ĐµĐąŃŃ‚Đ˛Đ¸ŃŹ
                        if (element.type === 'Container') {
                            element.setSize(element.width || 100, element.height || 100);
                        }
                        element.setInteractive({ draggable: true })
                            .on('dragstart', (pointer) => {
                                console.log('dragstart ŃĐľĐ±Ń‹Ń‚Đ¸Đµ Đ´Đ»ŃŹ:', unit.constructor.name);
                                unit.scene.isDraggingFromField = true;
                                unit.scene.onUnitDragStart(unit, pointer);
                            })
                            .on('drag', (pointer, dragX, dragY) => {
                                if (unit.sprite && unit.sprite.setPosition) {
                                    unit.sprite.setPosition(
                                        unit.scene.gridSystem.gridOffsetX + (unit.gridX * unit.scene.gridSystem.cellSize) + unit.scene.gridSystem.cellSize / 2,
                                        unit.scene.gridSystem.gridOffsetY + (unit.gridY * unit.scene.gridSystem.cellSize) + unit.scene.gridSystem.cellSize / 2
                                    );
                                }
                                unit.scene.onUnitDrag(pointer);
                            })
                            .on('dragend', (pointer, dragX, dragY) => {
                                console.log('dragend ŃĐľĐ±Ń‹Ń‚Đ¸Đµ Đ´Đ»ŃŹ:', unit.constructor.name);
                                unit.scene.onUnitDragEnd(unit, pointer, dragX, dragY);
                            });
                    }
                });
            }
        }
        
        unit.setPosition(centerX, centerY);
        console.log(`ĐŁŃŃ‚Đ°Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ° ĐżĐľĐ·Đ¸Ń†Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°: (${centerX}, ${centerY})`);
        
        // ĐźĐµŃ€ĐµŃĐľĐ·Đ´Đ°ĐµĐĽ HP Đ±Đ°Ń€ ĐżĐľŃĐ»Đµ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ
        unit.createHpBar(centerX, centerY);
        if (unit.hpBar) {
            unit.updateHpBar();
        }
    }

    removeUnit(unit) {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.grid[y][x] === unit) {
                    this.grid[y][x] = null;
                }
            }
        }
        
        // ĐžŃ‡Đ¸Ń‰Đ°ĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ HP Đ±Đ°Ń€Ń‹ Đ¸ ŃŤŃ„Ń„ĐµĐşŃ‚Ń‹ ĐżŃ€Đ¸ ĐżĐµŃ€ĐµĐĽĐµŃ‰ĐµĐ˝Đ¸Đ¸
        if (unit.hpBar) {
            unit.hpBar.destroy();
            unit.hpBar = null;
        }
        if (unit.hpBarBg) {
            unit.hpBarBg.destroy();
            unit.hpBarBg = null;
        }
    }

    clearDeadUnits() {
        for (let y = 0; y < this.gridHeight; y++) {
            for (let x = 0; x < this.gridWidth; x++) {
                if (this.grid[y][x] && !this.grid[y][x].isAlive()) {
                    this.grid[y][x] = null;
                }
            }
        }
    }
}

// ============================================================================
// Đ®ĐťĐĐ˘Đ«
// ============================================================================
/**
 * Unit - Đ±Đ°Đ·ĐľĐ˛Ń‹Đą ĐşĐ»Đ°ŃŃ Đ´Đ»ŃŹ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
 * 
 * ĐžĐ±Ń‰Đ°ŃŹ Đ»ĐľĐłĐ¸ĐşĐ°:
 * - Đ’Đ¸Đ·ŃĐ°Đ»Đ¸Đ·Đ°Ń†Đ¸ŃŹ (ŃĐżŃ€Đ°ĐąŃ‚ + HP Đ±Đ°Ń€)
 * - ĐŃ‚Đ°ĐşĐ° Đ¸ ĐżĐľĐ»ŃŃ‡ĐµĐ˝Đ¸Đµ ŃŃ€ĐľĐ˝Đ°
 * - ĐˇĐĽĐµŃ€Ń‚ŃŚ Đ¸ Đ˛ĐľŃĐşŃ€ĐµŃĐµĐ˝Đ¸Đµ
 * - Đ Đ°ŃŃ‡ĐµŃ‚ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸Đą Đ´Đľ Đ´Ń€ŃĐłĐ¸Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
 * 
 * ĐťĐ°ŃĐ»ĐµĐ´ŃĐµŃ‚ŃŃŹ ĐşĐ»Đ°ŃŃĐ°ĐĽĐ¸: Archer, Warrior, Barbarian, Healer, Mage
 */
class Unit {
    constructor(scene, gridX, gridY, isEnemy = false, size = { width: 1, height: 1 }, color = 0xFFFFFF) {
        this.scene = scene;
        this.gridX = gridX;
        this.gridY = gridY;
        this.isEnemy = isEnemy;
        this.isDead = false;
        
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 10;
        this.attackSpeed = 1.0;
        this.range = 2;
        this.size = size;
        this.color = color;
        
        // ĐśĐµŃ€Đ´Đ¶-ŃĐ¸ŃŃ‚ĐµĐĽĐ°
        this.mergeLevel = 0;        // ĐŁŃ€ĐľĐ˛ĐµĐ˝ŃŚ ĐĽĐµŃ€Đ´Đ¶Đ° (0-3)
        this.mergedStars = [];      // ĐśĐ°ŃŃĐ¸Đ˛ ĐľĐ±ŃŠĐµĐşŃ‚ĐľĐ˛-Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐµĐş
        this.unitType = null;       // Đ˘Đ¸Đż ŃŽĐ˝Đ¸Ń‚Đ° (ARCHER, WARRIOR Đ¸ Ń‚Đ´)
        this.baseHp = this.maxHp;   // Đ‘Đ°Đ·ĐľĐ˛ĐľĐµ HP Đ´Đ»ŃŹ Ń€Đ°ŃŃ‡ĐµŃ‚Đ° Đ±ĐľĐ˝ŃŃĐľĐ˛
        this.baseDamage = this.damage; // Đ‘Đ°Đ·ĐľĐ˛Ń‹Đą ŃŃ€ĐľĐ˝ Đ´Đ»ŃŹ Ń€Đ°ŃŃ‡ĐµŃ‚Đ° Đ±ĐľĐ˝ŃŃĐľĐ˛
        
        this.sprite = null;
        this.hpBar = null;
        this.lastAttackTime = 0;
        
        this.createVisuals();
    }

    createVisuals() {
        // ĐžŃ‡Đ¸Ń‰Đ°ĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
        if (this.spriteElements) {
            this.spriteElements.forEach(elem => {
                if (elem && elem.destroy) elem.destroy();
            });
            this.spriteElements = [];
        }
        if (this.sprite && this.sprite.destroy) {
            this.sprite.destroy();
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, ĐµŃŃ‚ŃŚ Đ»Đ¸ Ń ŃŽĐ˝Đ¸Ń‚Đ° L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
        const unitData = window.gameConfig.UNIT_TYPES[this.unitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (occupiedCells) {
            // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ L-ĐľĐ±Ń€Đ°Đ·Đ˝ŃŃŽ Ń„ĐľŃ€ĐĽŃ Đ¸Đ· ĐľŃ‚Đ´ĐµĐ»ŃŚĐ˝Ń‹Ń… ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚ĐľĐ˛
            this.spriteElements = [];
            
            occupiedCells.forEach(cell => {
                const cellX = this.scene.gridSystem.gridOffsetX + 
                    ((this.gridX + cell.x) * this.scene.gridSystem.cellSize) + 
                    this.scene.gridSystem.cellSize / 2;
                const cellY = this.scene.gridSystem.gridOffsetY + 
                    ((this.gridY + cell.y) * this.scene.gridSystem.cellSize) + 
                    this.scene.gridSystem.cellSize / 2;
                
                const rect = this.scene.add.rectangle(
                    cellX, cellY,
                    this.scene.gridSystem.cellSize * 0.8,
                    this.scene.gridSystem.cellSize * 0.8,
                    this.color
                );
                rect.setStrokeStyle(2, 0x000000);
                rect.setDepth(100);
                this.spriteElements.push(rect);
            });
            
            // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ĐşĐľĐ˝Ń‚ĐµĐąĐ˝ĐµŃ€ Đ´Đ»ŃŹ L-Ń„ĐľŃ€ĐĽŃ‹
            this.sprite = this.scene.add.container(0, 0);
            this.spriteElements.forEach(elem => this.sprite.add(elem));
            
            // Đ¦ĐµĐ˝Ń‚Ń€ Đ´Đ»ŃŹ HP Đ±Đ°Ń€Đ°
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            
            this.createHpBar(centerX, centerY);
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
            const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
            
            const spriteWidth = this.size.width * this.scene.gridSystem.cellSize;
            const spriteHeight = this.size.height * this.scene.gridSystem.cellSize;
            
            const centerX = startX + (spriteWidth / 2);
            const centerY = startY + (spriteHeight / 2);
            
            console.log(`ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚ ${this.constructor.name}: Ń€Đ°Đ·ĐĽĐµŃ€ ${this.size.width}x${this.size.height}, ŃĐżŃ€Đ°ĐąŃ‚ ${spriteWidth}x${spriteHeight}, ĐżĐľĐ·Đ¸Ń†Đ¸ŃŹ (${centerX}, ${centerY})`);
            
            // ĐžĐżŃ€ĐµĐ´ĐµĐ»ŃŹĐµĐĽ ŃĐżŃ€Đ°ĐąŃ‚ Đ˛ Đ·Đ°Đ˛Đ¸ŃĐ¸ĐĽĐľŃŃ‚Đ¸ ĐľŃ‚ Ń‚Đ¸ĐżĐ° ŃŽĐ˝Đ¸Ń‚Đ°
            let spriteKey = 'archer';
            
            if (this.unitType) {
                if (this.unitType === 'WARRIOR') spriteKey = 'warrior';
                else if (this.unitType === 'BARBARIAN') spriteKey = 'barbarian';
                else if (this.unitType === 'HEALER') spriteKey = 'healer';
                else if (this.unitType === 'MAGE') spriteKey = 'mage';
            } else {
                if (this.constructor.name === 'Warrior') spriteKey = 'warrior';
                else if (this.constructor.name === 'Barbarian') spriteKey = 'barbarian';
                else if (this.constructor.name === 'Healer') spriteKey = 'healer';
                else if (this.constructor.name === 'Mage') spriteKey = 'mage';
                else if (this.constructor.name === 'Tank') spriteKey = 'tank';
                else if (this.constructor.name === 'Assassin') spriteKey = 'assassin';
                else if (this.constructor.name === 'Druid') spriteKey = 'druid';
                else if (this.constructor.name === 'Witch') spriteKey = 'witch';
            }
            
            console.log('ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ŃĐżŃ€Đ°ĐąŃ‚:', spriteKey, 'Đ´Đ»ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°:', this.constructor.name);
            
            if (this.scene.textures.exists(spriteKey)) {
                console.log('ĐˇĐżŃ€Đ°ĐąŃ‚ Đ˝Đ°ĐąĐ´ĐµĐ˝, ŃĐľĐ·Đ´Đ°ĐµĐĽ Đ¸Đ·ĐľĐ±Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ:', spriteKey);
                this.sprite = this.scene.add.image(centerX, centerY, spriteKey);
                this.sprite.setDisplaySize(spriteWidth, spriteHeight);
            } else {
                console.log('ĐˇĐżŃ€Đ°ĐąŃ‚ Đ˝Đµ Đ˝Đ°ĐąĐ´ĐµĐ˝, Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ¸Đş:', spriteKey);
                this.sprite = this.scene.add.rectangle(
                    centerX, 
                    centerY, 
                    spriteWidth,
                    spriteHeight,
                    this.color
                );
            }
            
            // Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ Ń€Đ°ĐĽĐşŃ
            this.scene.add.rectangle(
                centerX, 
                centerY, 
                spriteWidth,
                spriteHeight,
                0x000000,
                0
            ).setStrokeStyle(2, 0x333333);
            
            this.createHpBar(centerX, centerY);
        }
        
        // Đ”Đ»ŃŹ Đ˛Ń€Đ°ĐłĐľĐ˛ Đ´ĐµĐ»Đ°ĐµĐĽ ŃĐżŃ€Đ°ĐąŃ‚ Ń‚ĐµĐĽĐ˝ĐµĐµ
        if (this.isEnemy) {
            if (this.sprite.setTint) {
                // Đ”Đ»ŃŹ image ĐľĐ±ŃŠĐµĐşŃ‚ĐľĐ˛ Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ setTint
                this.sprite.setTint(0x666666);
            } else if (this.sprite.setFillStyle) {
                // Đ”Đ»ŃŹ rectangle ĐľĐ±ŃŠĐµĐşŃ‚ĐľĐ˛ Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ setFillStyle
                this.sprite.setFillStyle(0x666666);
            }
        }
        
        // Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ drag-and-drop Đ´Đ»ŃŹ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ¸ĐłŃ€ĐľĐşĐ°
        if (!this.isEnemy) {
            console.log('Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ drag-and-drop Đ´Đ»ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°:', this.constructor.name);
            
            const interactiveElements = this.spriteElements || [this.sprite];
            
            interactiveElements.forEach(element => {
                if (element && element.setInteractive) {
                    // Đ”Đ»ŃŹ ĐşĐľĐ˝Ń‚ĐµĐąĐ˝ĐµŃ€ĐľĐ˛ Đ˝ŃĐ¶Đ˝Đľ ŃĐşĐ°Đ·Đ°Ń‚ŃŚ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ Đ˛Đ·Đ°Đ¸ĐĽĐľĐ´ĐµĐąŃŃ‚Đ˛Đ¸ŃŹ
                    if (element.type === 'Container') {
                        element.setSize(element.width || 100, element.height || 100);
                    }
                    element.setInteractive({ draggable: true })
                        .on('dragstart', (pointer) => {
                            console.log('dragstart ŃĐľĐ±Ń‹Ń‚Đ¸Đµ Đ´Đ»ŃŹ:', this.constructor.name);
                            this.scene.isDraggingFromField = true;
                            this.scene.onUnitDragStart(this, pointer);
                        })
                        .on('drag', (pointer, dragX, dragY) => {
                            // ĐťĐµ Đ´Đ˛Đ¸ĐłĐ°ĐµĐĽ Ń„Đ°ĐşŃ‚Đ¸Ń‡ĐµŃĐşĐ¸Đą ŃĐżŃ€Đ°ĐąŃ‚ ŃŽĐ˝Đ¸Ń‚Đ°, Ń‚ĐľĐ»ŃŚĐşĐľ ĐżŃ€Đ¸Đ·Ń€Đ°Đş
                            if (this.sprite && this.sprite.setPosition) {
                                this.sprite.setPosition(
                                    this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize) + this.scene.gridSystem.cellSize / 2,
                                    this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize) + this.scene.gridSystem.cellSize / 2
                                );
                            }
                            this.scene.onUnitDrag(pointer);
                        })
                        .on('dragend', (pointer, dragX, dragY) => {
                            console.log('dragend ŃĐľĐ±Ń‹Ń‚Đ¸Đµ Đ´Đ»ŃŹ:', this.constructor.name);
                            this.scene.onUnitDragEnd(this, pointer, dragX, dragY);
                        });
                }
            });
        }
    }

    createHpBar(x, y) {
        // ĐžŃ‡Đ¸Ń‰Đ°ĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ HP Đ±Đ°Ń€Ń‹
        if (this.hpBar) {
            this.hpBar.destroy();
            this.hpBar = null;
        }
        if (this.hpBarBg) {
            this.hpBarBg.destroy();
            this.hpBarBg = null;
        }
        
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const barHeight = 4;
        const barY = y - (this.size.height * this.scene.gridSystem.cellSize * 0.4);
        
        this.hpBarBg = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x333333);
        this.hpBar = this.scene.add.rectangle(x, barY, barWidth, barHeight, 0x00FF00);
        
        this.updateHpBar();
    }

    updateHpBar() {
        if (!this.hpBar || !this.hpBar.scene) return;
        
        const barWidth = this.size.width * this.scene.gridSystem.cellSize * 0.6;
        const hpPercent = this.hp / this.maxHp;
        const currentWidth = barWidth * hpPercent;
        
        this.hpBar.setSize(currentWidth, 4);
        
        if (hpPercent > 0.6) {
            this.hpBar.setFillStyle(0x00FF00);
        } else if (hpPercent > 0.3) {
            this.hpBar.setFillStyle(0xFFFF00);
        } else {
            this.hpBar.setFillStyle(0xFF0000);
        }
    }

    setPosition(x, y) {
        const unitData = window.gameConfig.UNIT_TYPES[this.unitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (this.spriteElements && occupiedCells) {
            // Reposition each element of L-shape
            occupiedCells.forEach((cell, index) => {
                if (this.spriteElements[index]) {
                    const cellX = this.scene.gridSystem.gridOffsetX + 
                        ((this.gridX + cell.x) * this.scene.gridSystem.cellSize) + 
                        this.scene.gridSystem.cellSize / 2;
                    const cellY = this.scene.gridSystem.gridOffsetY + 
                        ((this.gridY + cell.y) * this.scene.gridSystem.cellSize) + 
                        this.scene.gridSystem.cellSize / 2;
                    this.spriteElements[index].setPosition(cellX, cellY);
                }
            });
        } else if (this.sprite) {
            // Standard positioning - ĐżĐµŃ€ĐµŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ Đ´Đ»ŃŹ ĐżŃ€Đ°Đ˛Đ¸Đ»ŃŚĐ˝ĐľĐłĐľ Ń†ĐµĐ˝Ń‚Ń€Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸ŃŹ
            const spriteX = this.scene.gridSystem.gridOffsetX + 
                (this.gridX * this.scene.gridSystem.cellSize) + 
                (this.size.width * this.scene.gridSystem.cellSize / 2);
            const spriteY = this.scene.gridSystem.gridOffsetY + 
                (this.gridY * this.scene.gridSystem.cellSize) + 
                (this.size.height * this.scene.gridSystem.cellSize / 2);
            this.sprite.setPosition(spriteX, spriteY);
        }
        
        // Position HP bar at center of bounding box
        const centerX = this.scene.gridSystem.gridOffsetX + 
            ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
        const centerY = this.scene.gridSystem.gridOffsetY + 
            ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            
        if (this.hpBar) {
            this.hpBar.setPosition(centerX, centerY - (this.size.height * this.scene.gridSystem.cellSize * 0.4));
        }
        if (this.hpBarBg) {
            this.hpBarBg.setPosition(centerX, centerY - (this.size.height * this.scene.gridSystem.cellSize * 0.4));
        }
    }

    getSize() {
        return this.size;
    }

    getPosition() {
        return { x: this.gridX, y: this.gridY };
    }

    canAttack() {
        const currentTime = this.scene.time.now;
        return (currentTime - this.lastAttackTime) >= (this.attackSpeed * 1000);
    }

    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        target.takeDamage(this.damage);
        this.createAttackEffect(target);
        
        return true;
    }

    createAttackEffect(target) {
        const startPos = this.sprite;
        const endPos = target.sprite;
        
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0xFFD700, 0.8);
        graphics.lineBetween(startPos.x, startPos.y, endPos.x, endPos.y);
        
        this.scene.time.delayedCall(200, () => {
            graphics.destroy();
        });
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
        this.updateHpBar();
        
        if (this.hp <= 0) {
            this.die();
        }
        
        this.createDamageEffect();
        this.createDamageNumber(damage);
    }

    createDamageEffect() {
        // Đ­Ń„Ń„ĐµĐşŃ‚ ĐżĐľĐ˛Ń€ĐµĐ¶Đ´ĐµĐ˝Đ¸ŃŹ - ĐĽĐµĐ˝ŃŹĐµĐĽ Ń†Đ˛ĐµŃ‚ Đ˝Đ° ĐşŃ€Đ°ŃĐ˝Ń‹Đą Đ¸ ĐľĐ±Ń€Đ°Ń‚Đ˝Đľ
        if (this.spriteElements && this.spriteElements.length > 0) {
            // L-shaped units - apply effect to all elements
            this.spriteElements.forEach(elem => {
                if (elem.setTint) {
                    elem.setTint(0xFF0000);
                } else if (elem.setFillStyle) {
                    elem.setFillStyle(0xFF0000);
                }
            });
            
            this.scene.time.delayedCall(100, () => {
                this.spriteElements.forEach(elem => {
                    if (elem && elem.scene) {
                        if (elem.setTint) {
                            elem.setTint(this.isEnemy ? 0x666666 : 0xFFFFFF);
                        } else if (elem.setFillStyle) {
                            elem.setFillStyle(this.isEnemy ? 0x666666 : this.color);
                        }
                    }
                });
            });
        } else if (this.sprite) {
            if (this.sprite.setTint) {
                // Đ­Ń‚Đľ Đ¸Đ·ĐľĐ±Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ - Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ setTint
                const originalTint = this.isEnemy ? 0x666666 : 0xFFFFFF;
                this.sprite.setTint(0xFF0000);
                this.scene.time.delayedCall(100, () => {
                    if (this.sprite && this.sprite.scene) {
                        this.sprite.setTint(originalTint);
                    }
                });
            } else if (this.sprite.setFillStyle) {
                // Đ­Ń‚Đľ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ¸Đş - Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ setFillStyle
                const originalColor = this.isEnemy ? 0x666666 : this.color;
                this.sprite.setFillStyle(0xFF0000);
                this.scene.time.delayedCall(100, () => {
                    if (this.sprite && this.sprite.scene) {
                        this.sprite.setFillStyle(originalColor);
                    }
                });
            }
        }
    }

    createDamageNumber(damage) {
        // ĐźĐľĐ·Đ¸Ń†Đ¸ŃŹ Đ´Đ»ŃŹ Ń†Đ¸Ń„Ń€Ń‹ ŃŃ€ĐľĐ˝Đ° (Đ˝Đ°Đ´ ŃŽĐ˝Đ¸Ń‚ĐľĐĽ)
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Ń‚ĐµĐşŃŃ‚ Ń ŃŃ€ĐľĐ˝ĐľĐĽ
        const damageText = this.scene.add.text(centerX, centerY - 20, `-${damage}`, {
            fontSize: '16px',
            fill: '#FF0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // ĐĐ˝Đ¸ĐĽĐ°Ń†Đ¸ŃŹ ĐżĐ»Đ°Đ˛Đ°Đ˝Đ¸ŃŹ Đ˛Đ˛ĐµŃ€Ń… Đ¸ Đ¸ŃŃ‡ĐµĐ·Đ˝ĐľĐ˛ĐµĐ˝Đ¸ŃŹ
        this.scene.tweens.add({
            targets: damageText,
            y: centerY - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                damageText.destroy();
            }
        });
    }

    createHealNumber(healAmount) {
        // ĐźĐľĐ·Đ¸Ń†Đ¸ŃŹ Đ´Đ»ŃŹ Ń†Đ¸Ń„Ń€Ń‹ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ (Đ˝Đ°Đ´ ŃŽĐ˝Đ¸Ń‚ĐľĐĽ)
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Ń‚ĐµĐşŃŃ‚ Ń Đ»ĐµŃ‡ĐµĐ˝Đ¸ĐµĐĽ
        const healText = this.scene.add.text(centerX, centerY - 20, `+${healAmount}`, {
            fontSize: '16px',
            fill: '#00FF00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        // ĐĐ˝Đ¸ĐĽĐ°Ń†Đ¸ŃŹ ĐżĐ»Đ°Đ˛Đ°Đ˝Đ¸ŃŹ Đ˛Đ˛ĐµŃ€Ń… Đ¸ Đ¸ŃŃ‡ĐµĐ·Đ˝ĐľĐ˛ĐµĐ˝Đ¸ŃŹ
        this.scene.tweens.add({
            targets: healText,
            y: centerY - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                healText.destroy();
            }
        });
    }

    die() {
        this.isDead = true;
        
        console.log(`Đ®Đ˝Đ¸Ń‚ ${this.constructor.name} ŃĐ±Đ¸Ń‚ Đ˛ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ (${this.gridX}, ${this.gridY})`);
        
        // Đ”ĐµĐ»Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚Đ° Đ˝ĐµĐ˛Đ¸Đ´Đ¸ĐĽŃ‹ĐĽ, Đ˝Đľ ĐťĐ• ŃĐ˝Đ¸Ń‡Ń‚ĐľĐ¶Đ°ĐµĐĽ (Đ´Đ»ŃŹ Đ˛ĐľŃĐşŃ€ĐµŃĐµĐ˝Đ¸ŃŹ)
        if (this.spriteElements && this.spriteElements.length > 0) {
            // L-shaped units - animate all elements
            this.spriteElements.forEach(elem => {
                this.scene.tweens.add({
                    targets: elem,
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    duration: 300
                });
            });
        } else if (this.sprite) {
            // Standard units
            this.scene.tweens.add({
                targets: this.sprite,
                alpha: 0,
                scaleX: 0,
                scaleY: 0,
                duration: 300
            });
        }
        
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ hpBar, Đ˝Đľ Đ˝Đµ ŃĐ˝Đ¸Ń‡Ń‚ĐľĐ¶Đ°ĐµĐĽ ĐżĐľĐ»Đ˝ĐľŃŃ‚ŃŚŃŽ
        if (this.hpBar) this.hpBar.setVisible(false);
        if (this.hpBarBg) this.hpBarBg.setVisible(false);
    }

    destroy() {
        if (this.spriteElements) {
            this.spriteElements.forEach(elem => {
                if (elem && elem.destroy) elem.destroy();
            });
            this.spriteElements = [];
        }
        if (this.sprite) this.sprite.destroy();
        if (this.hpBar) this.hpBar.destroy();
        if (this.hpBarBg) this.hpBarBg.destroy();
    }

    isAlive() {
        return !this.isDead && this.hp > 0;
    }

    getDistanceTo(otherUnit) {
        // ĐˇŃ‡Đ¸Ń‚Đ°ĐµĐĽ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸Đµ ĐĽĐµĐ¶Đ´Ń Ń†ĐµĐ˝Ń‚Ń€Đ°ĐĽĐ¸ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
        let thisX, thisY, otherX, otherY;
        
        if (this.spriteElements && this.spriteElements.length > 0) {
            // L-shaped unit - use center of bounding box
            thisX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            thisY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
        } else if (this.sprite) {
            thisX = this.sprite.x;
            thisY = this.sprite.y;
        } else {
            return 0;
        }
        
        if (otherUnit.spriteElements && otherUnit.spriteElements.length > 0) {
            // L-shaped unit - use center of bounding box
            otherX = otherUnit.scene.gridSystem.gridOffsetX + 
                ((otherUnit.gridX + otherUnit.size.width / 2) * otherUnit.scene.gridSystem.cellSize);
            otherY = otherUnit.scene.gridSystem.gridOffsetY + 
                ((otherUnit.gridY + otherUnit.size.height / 2) * otherUnit.scene.gridSystem.cellSize);
        } else if (otherUnit.sprite) {
            otherX = otherUnit.sprite.x;
            otherY = otherUnit.sprite.y;
        } else {
            return 0;
        }
        
        const dx = thisX - otherX;
        const dy = thisY - otherY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getGridDistanceTo(otherUnit) {
        // ĐˇŃ‡Đ¸Ń‚Đ°ĐµĐĽ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸Đµ Đ˛ ĐşĐ»ĐµŃ‚ĐşĐ°Ń… ŃĐµŃ‚ĐşĐ¸ (Đ±ĐľĐ»ĐµĐµ ĐżĐľĐ´Ń…ĐľĐ´ŃŹŃ‰ĐµĐµ Đ´Đ»ŃŹ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ)
        const dx = Math.abs(this.gridX - otherUnit.gridX);
        const dy = Math.abs(this.gridY - otherUnit.gridY);
        return Math.max(dx, dy); // ĐŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ "ŃĐ°Ń…ĐĽĐ°Ń‚Đ˝ĐľĐµ" Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸Đµ
    }

    // ============================================================================
    // ĐśĐ•Đ Đ”Đ–-ĐˇĐĐˇĐ˘Đ•ĐśĐ
    // ============================================================================
    
    /**
     * ĐžĐ±ŃŠĐµĐ´Đ¸Đ˝ŃŹĐµŃ‚ ŃŽĐ˝Đ¸Ń‚Đ° Ń Đ´Ń€ŃĐłĐ¸ĐĽ ŃŽĐ˝Đ¸Ń‚ĐľĐĽ Ń‚ĐľĐłĐľ Đ¶Đµ Ń‚Đ¸ĐżĐ°
     * @param {string} unitType - Ń‚Đ¸Đż ŃŽĐ˝Đ¸Ń‚Đ° Đ´Đ»ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
     */
    merge(unitType) {
        if (this.mergeLevel >= 3) {
            console.log('ĐśĐ°ĐşŃĐ¸ĐĽĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŃ€ĐľĐ˛ĐµĐ˝ŃŚ ĐĽĐµŃ€Đ´Đ¶Đ° Đ´ĐľŃŃ‚Đ¸ĐłĐ˝ŃŃ‚');
            return false;
        }
        
        if (this.unitType !== unitType) {
            console.log('ĐťĐµĐ»ŃŚĐ·ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ¸Ń‚ŃŚ Ń€Đ°Đ·Đ˝Ń‹Đµ Ń‚Đ¸ĐżŃ‹ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛');
            return false;
        }
        
        this.mergeLevel++;
        this.applyMergeBonus();
        this.createMergeStars();
        
        console.log(`${this.constructor.name} ĐĽĐµŃ€Đ´Đ¶Đ˝ŃŃ‚! ĐŁŃ€ĐľĐ˛ĐµĐ˝ŃŚ: ${this.mergeLevel}`);
        return true;
    }
    
    /**
     * ĐźŃ€Đ¸ĐĽĐµĐ˝ŃŹĐµŃ‚ Đ±ĐľĐ˝ŃŃŃ‹ ĐľŃ‚ ĐĽĐµŃ€Đ´Đ¶Đ° (+20 HP, +5 ŃŃ€ĐľĐ˝ Đ·Đ° ŃŃ€ĐľĐ˛ĐµĐ˝ŃŚ)
     */
    applyMergeBonus() {
        const hpBonus = this.mergeLevel * 20;
        const damageBonus = this.mergeLevel * 5;
        
        this.maxHp = this.baseHp + hpBonus;
        this.damage = this.baseDamage + damageBonus;
        
        // Đ’ĐľŃŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ HP Đ´Đľ ĐĽĐ°ĐşŃĐ¸ĐĽŃĐĽĐ° ĐżŃ€Đ¸ ĐĽĐµŃ€Đ´Đ¶Đµ
        this.hp = this.maxHp;
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ HP Đ±Đ°Ń€
        if (this.hpBar) {
            this.updateHpBar();
        }
        
        console.log(`Đ‘ĐľĐ˝ŃŃŃ‹ ĐĽĐµŃ€Đ´Đ¶Đ°: +${hpBonus} HP, +${damageBonus} ŃŃ€ĐľĐ˝`);
    }
    
    /**
     * ĐˇĐľĐ·Đ´Đ°ĐµŃ‚ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đµ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐşĐ¸ Đ˝Đ° ŃŽĐ˝Đ¸Ń‚Đµ
     */
    createMergeStars() {
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐşĐ¸
        this.mergedStars.forEach(star => {
            if (star && star.destroy) {
                star.destroy();
            }
        });
        this.mergedStars = [];
        
        if (this.mergeLevel === 0) return;
        
        // ĐźĐľĐ·Đ¸Ń†Đ¸ŃŹ Đ´Đ»ŃŹ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐµĐş (Đ˝Đ° ŃŽĐ˝Đ¸Ń‚Đµ)
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐşĐ¸ Đ˛ Ń€ŃŹĐ´ Đ˝Đ° ŃŽĐ˝Đ¸Ń‚Đµ
        const starSpacing = 12;
        const totalWidth = (this.mergeLevel - 1) * starSpacing;
        const startStarX = centerX - totalWidth / 2;
        const starY = centerY; // ĐťĐ° Ń†ĐµĐ˝Ń‚Ń€Đµ ŃŽĐ˝Đ¸Ń‚Đ°
        
        for (let i = 0; i < this.mergeLevel; i++) {
            const starX = startStarX + (i * starSpacing);
            const star = this.scene.add.star(starX, starY, 6, 4, 2, 0xFFD700);
            this.mergedStars.push(star);
        }
    }
    
    /**
     * ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµŃ‚ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐµĐş (ĐżŃ€Đ¸ ĐżĐµŃ€ĐµĐĽĐµŃ‰ĐµĐ˝Đ¸Đ¸ ŃŽĐ˝Đ¸Ń‚Đ°)
     */
    updateMergeStars() {
        if (this.mergedStars.length === 0) return;
        
        const startX = this.scene.gridSystem.gridOffsetX + (this.gridX * this.scene.gridSystem.cellSize);
        const startY = this.scene.gridSystem.gridOffsetY + (this.gridY * this.scene.gridSystem.cellSize);
        const centerX = startX + (this.size.width * this.scene.gridSystem.cellSize / 2);
        const centerY = startY + (this.size.height * this.scene.gridSystem.cellSize / 2);
        
        const starSpacing = 12;
        const totalWidth = (this.mergeLevel - 1) * starSpacing;
        const startStarX = centerX - totalWidth / 2;
        
        this.mergedStars.forEach((star, i) => {
            if (star && star.setPosition) {
                const starX = startStarX + (i * starSpacing);
                star.setPosition(starX, centerY);
            }
        });
    }

    updateVisuals() {
        if (this.spriteElements && this.spriteElements.length > 0) {
            // Handle L-shaped units (multiple elements)
            this.spriteElements.forEach(elem => {
                if (elem.setTint) {
                    elem.setTint(this.isEnemy ? 0x666666 : 0xFFFFFF);
                } else if (elem.setFillStyle) {
                    elem.setFillStyle(this.isEnemy ? 0x666666 : this.color);
                }
            });
        } else if (this.sprite) {
            // Handle standard units (single sprite)
            if (this.sprite.setTint) {
                if (this.isEnemy) {
                    this.sprite.setTint(0x666666);
                } else {
                    this.sprite.setTint(0xFFFFFF);
                }
            } else if (this.sprite.setFillStyle) {
                if (this.isEnemy) {
                    this.sprite.setFillStyle(0x666666);
                } else {
                    this.sprite.setFillStyle(this.color);
                }
            }
        }
    }

    /**
     * Đ Đ°ŃŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµŃ‚ Ń†ĐµĐ˝Ń ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ ŃŽĐ˝Đ¸Ń‚Đ° Ń ŃŃ‡ĐµŃ‚ĐľĐĽ ŃŃ€ĐľĐ˛Đ˝ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
     */
    getSellPrice() {
        const unitData = window.gameConfig.UNIT_TYPES[this.unitType];
        if (!unitData) return 0;
        
        const basePrice = unitData.sellPrice || unitData.cost;
        const starBonus = (unitData.sellPricePerStar || basePrice) * this.mergeLevel;
        return basePrice + starBonus;
    }
}

// Đ›ŃŃ‡Đ˝Đ¸Đş
class Archer extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x4A90E2);
        
        this.unitType = 'ARCHER';
        this.maxHp = 30;
        this.hp = this.maxHp;
        this.damage = 8;
        this.attackSpeed = 0.5;
        this.baseAttackSpeed = 0.5; // Đ—Đ°ĐżĐľĐĽĐ¸Đ˝Đ°ĐµĐĽ Đ±Đ°Đ·ĐľĐ˛ŃŃŽ ŃĐşĐľŃ€ĐľŃŃ‚ŃŚ Đ´Đ»ŃŹ Đ±Đ°Ń„Ń„ĐľĐ˛
        this.range = 10; // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝ Ń€Đ°Đ´Đ¸ŃŃ
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ±Đ°Đ·ĐľĐ˛Ń‹Đµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸ŃŹ Đ´Đ»ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
}

// ĐśĐµŃ‡Đ˝Đ¸Đş
class Warrior extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 2 }, 0xE24A4A);
        
        this.unitType = 'WARRIOR';
        this.maxHp = 50;
        this.hp = this.maxHp;
        this.damage = 12;
        this.attackSpeed = 1.0;
        this.baseAttackSpeed = 1.0; // Đ—Đ°ĐżĐľĐĽĐ¸Đ˝Đ°ĐµĐĽ Đ±Đ°Đ·ĐľĐ˛ŃŃŽ ŃĐşĐľŃ€ĐľŃŃ‚ŃŚ
        this.range = 10; // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝ Ń€Đ°Đ´Đ¸ŃŃ
        
        // ĐˇĐżĐľŃĐľĐ±Đ˝ĐľŃŃ‚ŃŚ: Đ‘ĐľĐµĐ˛ĐľĐą ĐşĐ»Đ¸Ń‡
        this.hasBattleCry = true;
        this.battleCryBonus = 0.25; // 25% ŃŃĐşĐľŃ€ĐµĐ˝Đ¸Đµ Đ°Ń‚Đ°ĐşĐ¸
        this.battleCryActive = false;
        this.battleCryEffect = null;
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ±Đ°Đ·ĐľĐ˛Ń‹Đµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸ŃŹ Đ´Đ»ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
    
    // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ Đ‘ĐľĐµĐ˛ĐľĐłĐľ ĐşĐ»Đ¸Ń‡Đ° (Đ¶ĐµĐ»Ń‚Ń‹Đµ Đ˛ĐľĐ»Đ˝Ń‹)
    createBattleCryEffect() {
        if (this.battleCryEffect) return; // ĐŁĐ¶Đµ ŃĐľĐ·Đ´Đ°Đ˝
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ 3 ĐşŃ€ŃĐłĐľĐ˛Ń‹Đµ Đ˛ĐľĐ»Đ˝Ń‹
        const waves = [];
        for (let i = 0; i < 3; i++) {
            const wave = this.scene.add.circle(
                this.sprite.x,
                this.sprite.y,
                20,
                0xFFD700, // Đ—ĐľĐ»ĐľŃ‚ĐľĐą Ń†Đ˛ĐµŃ‚
                0
            );
            wave.setStrokeStyle(2, 0xFFD700, 0.8);
            waves.push(wave);
            
            // ĐĐ˝Đ¸ĐĽĐ°Ń†Đ¸ŃŹ Ń€Đ°ŃŃĐ¸Ń€ĐµĐ˝Đ¸ŃŹ Đ˛ĐľĐ»Đ˝Ń‹
            this.scene.tweens.add({
                targets: wave,
                radius: 80,
                alpha: 0,
                duration: 1500,
                delay: i * 300,
                repeat: -1,
                ease: 'Cubic.easeOut'
            });
        }
        
        // ĐźĐľŃŃ‚ĐľŃŹĐ˝Đ˝ĐľĐµ ŃĐ˛ĐµŃ‡ĐµĐ˝Đ¸Đµ Đ˛ĐľĐşŃ€ŃĐł ĐĽĐµŃ‡Đ˝Đ¸ĐşĐ°
        const glow = this.scene.add.circle(
            this.sprite.x,
            this.sprite.y,
            35,
            0xFFD700,
            0.15
        );
        
        // ĐźŃĐ»ŃŚŃĐ°Ń†Đ¸ŃŹ ŃĐ˛ĐµŃ‡ĐµĐ˝Đ¸ŃŹ
        this.scene.tweens.add({
            targets: glow,
            alpha: 0.3,
            scale: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        this.battleCryEffect = {
            waves: waves,
            glow: glow
        };
    }
    
    // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚
    removeBattleCryEffect() {
        if (!this.battleCryEffect) return;
        
        this.battleCryEffect.waves.forEach(wave => {
            if (wave && wave.scene) {
                this.scene.tweens.killTweensOf(wave);
                wave.destroy();
            }
        });
        
        if (this.battleCryEffect.glow && this.battleCryEffect.glow.scene) {
            this.scene.tweens.killTweensOf(this.battleCryEffect.glow);
            this.battleCryEffect.glow.destroy();
        }
        
        this.battleCryEffect = null;
    }
    
    // ĐĐşŃ‚Đ¸Đ˛Đ°Ń†Đ¸ŃŹ/Đ´ĐµĐ°ĐşŃ‚Đ¸Đ˛Đ°Ń†Đ¸ŃŹ Đ±ĐľĐµĐ˛ĐľĐłĐľ ĐşĐ»Đ¸Ń‡Đ°
    setBattleCryActive(active) {
        if (this.battleCryActive === active) return;
        
        this.battleCryActive = active;
        
        if (active) {
            this.createBattleCryEffect();
            console.log(`ĐśĐµŃ‡Đ˝Đ¸Đş Đ°ĐşŃ‚Đ¸Đ˛Đ¸Ń€ĐľĐ˛Đ°Đ» Đ‘ĐľĐµĐ˛ĐľĐą ĐşĐ»Đ¸Ń‡! ĐˇĐľŃŽĐ·Đ˝Đ¸ĐşĐ¸ Đ°Ń‚Đ°ĐşŃŃŽŃ‚ Đ˝Đ° ${this.battleCryBonus * 100}% Đ±Ń‹ŃŃ‚Ń€ĐµĐµ`);
        } else {
            this.removeBattleCryEffect();
            console.log(`Đ‘ĐľĐµĐ˛ĐľĐą ĐşĐ»Đ¸Ń‡ Đ´ĐµĐ°ĐşŃ‚Đ¸Đ˛Đ¸Ń€ĐľĐ˛Đ°Đ˝`);
        }
    }
    
    die() {
        this.removeBattleCryEffect();
        super.die();
    }
}

// Đ›ĐµĐşĐ°Ń€ŃŚ
class Healer extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x32CD32);
        
        this.unitType = 'HEALER';
        this.maxHp = 25;
        this.hp = this.maxHp;
        this.damage = 3;
        this.attackSpeed = 2.0; // Đ’ĐľĐ·Đ˛Ń€Đ°Ń‰Đ°ĐµĐĽ Đ¸ŃŃ…ĐľĐ´Đ˝ĐľĐµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸Đµ
        this.baseAttackSpeed = 2.0; // Đ—Đ°ĐżĐľĐĽĐ¸Đ˝Đ°ĐµĐĽ Đ±Đ°Đ·ĐľĐ˛ŃŃŽ ŃĐşĐľŃ€ĐľŃŃ‚ŃŚ Đ´Đ»ŃŹ Đ±Đ°Ń„Ń„ĐľĐ˛
        this.range = 10; // ĐťĐµĐľĐłŃ€Đ°Đ˝Đ¸Ń‡ĐµĐ˝Đ˝Ń‹Đą Ń€Đ°Đ´Đ¸ŃŃ Đ°Ń‚Đ°ĐşĐ¸ (ĐşĐ°Đş Ń Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛)
        this.healRange = 2; // ĐžĐłŃ€Đ°Đ˝Đ¸Ń‡ĐµĐ˝Đ˝Ń‹Đą Ń€Đ°Đ´Đ¸ŃŃ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ
        this.healAmount = 8; // ĐšĐľĐ»Đ¸Ń‡ĐµŃŃ‚Đ˛Đľ HP Đ·Đ° Đ»ĐµŃ‡ĐµĐ˝Đ¸Đµ
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ±Đ°Đ·ĐľĐ˛Ń‹Đµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸ŃŹ Đ´Đ»ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }

    // ĐźĐµŃ€ĐµĐľĐżŃ€ĐµĐ´ĐµĐ»ŃŹĐµĐĽ ĐĽĐµŃ‚ĐľĐ´ Đ°Ń‚Đ°ĐşĐ¸ Đ´Đ»ŃŹ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ
    attack(target = null) {
        console.log('Đ›ĐµĐşĐ°Ń€ŃŚ ĐşĐ°ŃŃ‚ŃĐµŃ‚ Đ»ĐµŃ‡ĐµĐ˝Đ¸Đµ ĐżĐľ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸');
        
        const currentTime = this.scene.time.now;
        
        if (currentTime - this.lastAttackTime < this.attackSpeed * 1000) {
            console.log('Đ›ĐµĐşĐ°Ń€ŃŚ ĐµŃ‰Đµ Đ˝Đ° ĐşŃĐ»Đ´Đ°ŃĐ˝Đµ');
            return;
        }
        
        this.lastAttackTime = currentTime;
        
        // ĐšĐ°ŃŃ‚ŃĐµĐĽ Đ»ĐµŃ‡ĐµĐ˝Đ¸Đµ ĐżĐľ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ Đ˛ĐľĐşŃ€ŃĐł ŃĐµĐ±ŃŹ
        this.castAreaHeal();
        
        // ĐźĐľŃĐ»Đµ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ Đ°Ń‚Đ°ĐşŃĐµĐĽ Đ˛Ń€Đ°ĐłĐľĐ˛ ĐşĐ°Đş ĐľĐ±Ń‹Ń‡Đ˝Đľ
        if (target) {
            console.log(`Đ›ĐµĐşĐ°Ń€ŃŚ Đ°Ń‚Đ°ĐşŃĐµŃ‚ ${target.constructor.name} Đ˝Đ° ${this.damage} ŃŃ€ĐľĐ˝Đ°`);
            this.createAttackEffect(target);
            target.takeDamage(this.damage);
        }
    }

    castAreaHeal() {
        console.log('Đ›ĐµĐşĐ°Ń€ŃŚ ĐşĐ°ŃŃ‚ŃĐµŃ‚ Đ»ĐµŃ‡ĐµĐ˝Đ¸Đµ ĐşŃ€ĐµŃŃ‚ĐľĐĽ');
        
        const allies = this.isEnemy ? this.scene.enemyUnits : this.scene.playerUnits;
        
        // 4 ŃĐľŃĐµĐ´Đ˝Đ¸Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸ ĐşŃ€ĐµŃŃ‚ĐľĐĽ
        const adjacentPositions = [
            { x: this.gridX, y: this.gridY - 1 },     // Đ’Đ˛ĐµŃ€Ń…
            { x: this.gridX, y: this.gridY + 1 },     // Đ’Đ˝Đ¸Đ·
            { x: this.gridX - 1, y: this.gridY },     // Đ’Đ»ĐµĐ˛Đľ
            { x: this.gridX + 1, y: this.gridY }      // Đ’ĐżŃ€Đ°Đ˛Đľ
        ];
        
        const nearbyAllies = allies.filter(ally => {
            if (ally === this || !ally.isAlive() || ally.hp >= ally.maxHp) return false;
            
            // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Đ˝Đ°Ń…ĐľĐ´Đ¸Ń‚ŃŃŹ Đ»Đ¸ ŃĐľŃŽĐ·Đ˝Đ¸Đş Đ˛ ĐľĐ´Đ˝ĐľĐą Đ¸Đ· 4 ŃĐľŃĐµĐ´Đ˝Đ¸Ń… ĐşĐ»ĐµŃ‚ĐľĐş
            return adjacentPositions.some(pos => 
                ally.gridX === pos.x && ally.gridY === pos.y
            );
        });
        
        console.log(`ĐťĐ°ĐąĐ´ĐµĐ˝Đľ ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐľĐ˛ Đ˛ ĐşŃ€ĐµŃŃ‚Đµ: ${nearbyAllies.length}`);
        
        // Đ›ĐµŃ‡Đ¸ĐĽ Đ˛ŃĐµŃ… Đ˝Đ°ĐąĐ´ĐµĐ˝Đ˝Ń‹Ń… ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐľĐ˛
        nearbyAllies.forEach(ally => {
            const oldHp = ally.hp;
            ally.hp = Math.min(ally.maxHp, ally.hp + this.healAmount);
            const healedAmount = ally.hp - oldHp;
            
            if (healedAmount > 0) {
                console.log(`Đ›ĐµĐşĐ°Ń€ŃŚ Đ»ĐµŃ‡Đ¸Ń‚ ${ally.constructor.name} Đ˝Đ° ${healedAmount} HP (${oldHp} -> ${ally.hp})`);
                ally.updateHpBar();
                ally.createHealNumber(healedAmount);
            }
        });
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ ĐşŃ€ĐµŃŃ‚ĐľĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ ĐµŃĐ»Đ¸ ĐµŃŃ‚ŃŚ ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐ¸
        if (nearbyAllies.length > 0) {
            this.createAreaHealEffect();
        }
    }

    createAttackEffect(target) {
        // ĐšŃ€Đ°ŃĐ˝Đ°ŃŹ Đ»Đ¸Đ˝Đ¸ŃŹ ĐľŃ‚ Đ»ĐµĐşĐ°Ń€ŃŹ Đş Ń†ĐµĐ»Đ¸ Đ°Ń‚Đ°ĐşĐ¸
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(2, 0xFF0000, 0.8);
        graphics.lineBetween(
            this.sprite.x, this.sprite.y,
            target.sprite.x, target.sprite.y
        );
        
        // ĐšŃ€Đ°ŃĐ˝Ń‹Đµ Ń‡Đ°ŃŃ‚Đ¸Ń†Ń‹ Đ˛ĐľĐşŃ€ŃĐł Ń†ĐµĐ»Đ¸
        for (let i = 0; i < 3; i++) {
            const particle = this.scene.add.circle(
                target.sprite.x + Phaser.Math.Between(-15, 15),
                target.sprite.y + Phaser.Math.Between(-15, 15),
                2,
                0xFF0000
            );
            
            this.scene.tweens.add({
                targets: particle,
                y: particle.y - 20,
                alpha: 0,
                duration: 600,
                onComplete: () => particle.destroy()
            });
        }
        
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ Đ»Đ¸Đ˝Đ¸ŃŽ Ń‡ĐµŃ€ĐµĐ· 300ĐĽŃ
        this.scene.time.delayedCall(300, () => {
            graphics.destroy();
        });
        
        // Đ­Ń„Ń„ĐµĐşŃ‚ ŃĐ˛ĐµŃ‡ĐµĐ˝Đ¸ŃŹ Đ˛ĐľĐşŃ€ŃĐł Ń†ĐµĐ»Đ¸
        const glow = this.scene.add.circle(target.sprite.x, target.sprite.y, 25, 0xFF0000, 0.3);
        this.scene.tweens.add({
            targets: glow,
            scaleX: 1.2,
            scaleY: 1.2,
            alpha: 0,
            duration: 400,
            onComplete: () => glow.destroy()
        });
    }

    createAreaHealEffect() {
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ŃŤŃ„Ń„ĐµĐşŃ‚ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ ĐżĐľ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸
        const centerX = this.sprite.x;
        const centerY = this.sprite.y;
        
        // ĐšŃ€ŃĐł Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ
        const healCircle = this.scene.add.circle(centerX, centerY, this.healRange * 50, 0x00FF00, 0.2);
        this.scene.tweens.add({
            targets: healCircle,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 1000,
            onComplete: () => healCircle.destroy()
        });
        
        // Đ§Đ°ŃŃ‚Đ¸Ń†Ń‹ Đ»ĐµŃ‡ĐµĐ˝Đ¸ŃŹ
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const distance = Phaser.Math.Between(20, this.healRange * 50);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            const particle = this.scene.add.circle(x, y, 4, 0x00FF00);
            
            this.scene.tweens.add({
                targets: particle,
                y: particle.y - 40,
                alpha: 0,
                duration: 1200,
                onComplete: () => particle.destroy()
            });
        }
        
        // Đ­Ń„Ń„ĐµĐşŃ‚ ŃĐ˛ĐµŃ‡ĐµĐ˝Đ¸ŃŹ Đ˛ĐľĐşŃ€ŃĐł Đ»ĐµĐşĐ°Ń€ŃŹ
        const glow = this.scene.add.circle(centerX, centerY, 30, 0x00FF00, 0.4);
        this.scene.tweens.add({
            targets: glow,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 800,
            onComplete: () => glow.destroy()
        });
    }
}

/**
 * Barbarian - Ń‚Đ°Đ˝Đş Ń ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸ĐµĐą
 * 
 * ĐžŃĐľĐ±ĐµĐ˝Đ˝ĐľŃŃ‚ŃŚ: ĐľĐ±Đ»Đ°Đ´Đ°ĐµŃ‚ ŃĐżĐľŃĐľĐ±Đ˝ĐľŃŃ‚ŃŚŃŽ "Taunt" (ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸ŃŹ)
 * Đ’Ń€Đ°ĐłĐ¸ Đ°Ń‚Đ°ĐşŃŃŽŃ‚ Đ˛Đ°Ń€Đ˛Đ°Ń€ĐľĐ˛ Đ˛ ĐżĐµŃ€Đ˛ŃŃŽ ĐľŃ‡ĐµŃ€ĐµĐ´ŃŚ, Đ¸ĐłĐ˝ĐľŃ€Đ¸Ń€ŃŃŹ ĐľŃŃ‚Đ°Đ»ŃŚĐ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
 */
class Barbarian extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 1 }, 0xFF8C00);
        
        this.unitType = 'BARBARIAN';
        this.maxHp = 60;
        this.hp = this.maxHp;
        this.damage = 15;
        this.attackSpeed = 1.5;
        this.baseAttackSpeed = 1.5; // Đ—Đ°ĐżĐľĐĽĐ¸Đ˝Đ°ĐµĐĽ Đ±Đ°Đ·ĐľĐ˛ŃŃŽ ŃĐşĐľŃ€ĐľŃŃ‚ŃŚ Đ´Đ»ŃŹ Đ±Đ°Ń„Ń„ĐľĐ˛
        this.range = 10;
        this.hasTaunt = true; // ĐˇĐźĐžĐˇĐžĐ‘ĐťĐžĐˇĐ˘Đ¬: ĐźŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸ŃŹ
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ±Đ°Đ·ĐľĐ˛Ń‹Đµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸ŃŹ Đ´Đ»ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
        this.createTauntEffect(); // Đ’Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸Đ¸
    }
    
    createTauntEffect() {
        // ĐšŃ€Đ°ŃĐ˝ĐľĐµ ŃĐ˛ĐµŃ‡ĐµĐ˝Đ¸Đµ Đ˛ĐľĐşŃ€ŃĐł Đ˛Đ°Ń€Đ˛Đ°Ń€Đ° (ŃŤŃ„Ń„ĐµĐşŃ‚ ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸Đ¸)
        const tauntGlow = this.scene.add.circle(
            this.sprite.x, 
            this.sprite.y, 
            60, 
            0xFF0000, 
            0.15
        );
        
        // ĐźŃĐ»ŃŚŃĐ¸Ń€ŃŃŽŃ‰Đ°ŃŹ Đ°Đ˝Đ¸ĐĽĐ°Ń†Đ¸ŃŹ
        this.scene.tweens.add({
            targets: tauntGlow,
            alpha: 0.3,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ ŃŃŃ‹Đ»ĐşŃ Đ´Đ»ŃŹ ŃĐ´Đ°Đ»ĐµĐ˝Đ¸ŃŹ ĐżŃ€Đ¸ ŃĐĽĐµŃ€Ń‚Đ¸
        this.tauntGlow = tauntGlow;
    }
    
    setPosition(x, y) {
        // Đ’Ń‹Đ·Ń‹Đ˛Đ°ĐµĐĽ Ń€ĐľĐ´Đ¸Ń‚ĐµĐ»ŃŚŃĐşĐ¸Đą ĐĽĐµŃ‚ĐľĐ´ Đ´Đ»ŃŹ ĐľĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸ŃŹ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ŃĐżŃ€Đ°ĐąŃ‚Đ° Đ¸ HP Đ±Đ°Ń€Đ°
        super.setPosition(x, y);
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ŃŤŃ„Ń„ĐµĐşŃ‚Đ° ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸Đ¸
        if (this.tauntGlow) {
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            this.tauntGlow.setPosition(centerX, centerY);
        }
    }
    
    die() {
        // ĐŁĐ±Đ¸Ń€Đ°ĐµĐĽ ŃŤŃ„Ń„ĐµĐşŃ‚ ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸Đ¸
        if (this.tauntGlow) {
            this.tauntGlow.destroy();
        }
        
        // Đ’Ń‹Đ·Ń‹Đ˛Đ°ĐµĐĽ ŃŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝ŃŃŽ ŃĐĽĐµŃ€Ń‚ŃŚ
        super.die();
    }
}

// ĐśĐ°Đł
class Mage extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x9B4AE2);
        
        this.unitType = 'MAGE';
        this.maxHp = 40;
        this.hp = this.maxHp;
        this.damage = 8; // ĐŁĐĽĐµĐ˝ŃŚŃĐ°ĐµĐĽ ŃŃ€ĐľĐ˝, Ń‚Đ°Đş ĐşĐ°Đş Đ±ŃŚĐµŃ‚ ĐżĐľ 3 Ń†ĐµĐ»ŃŹĐĽ
        this.attackSpeed = 2.5; // ĐśĐµĐ´Đ»ĐµĐ˝Đ˝ĐµĐµ Đ°Ń‚Đ°ĐşŃĐµŃ‚
        this.baseAttackSpeed = 2.5; // Đ—Đ°ĐżĐľĐĽĐ¸Đ˝Đ°ĐµĐĽ Đ±Đ°Đ·ĐľĐ˛ŃŃŽ ŃĐşĐľŃ€ĐľŃŃ‚ŃŚ Đ´Đ»ŃŹ Đ±Đ°Ń„Ń„ĐľĐ˛
        this.range = 10; // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝ Ń€Đ°Đ´Đ¸ŃŃ
        this.maxTargets = 3; // ĐśĐ°ĐşŃĐ¸ĐĽŃĐĽ 3 Ń†ĐµĐ»Đ¸
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ±Đ°Đ·ĐľĐ˛Ń‹Đµ Đ·Đ˝Đ°Ń‡ĐµĐ˝Đ¸ŃŹ Đ´Đ»ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ°
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }

    // ĐźĐµŃ€ĐµĐľĐżŃ€ĐµĐ´ĐµĐ»ŃŹĐµĐĽ ĐĽĐµŃ‚ĐľĐ´ Đ°Ń‚Đ°ĐşĐ¸ - Đ±ŃŚĐµŃ‚ ĐżĐľ 3 Ń†ĐµĐ»ŃŹĐĽ
    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        
        console.log(`ĐśĐ°Đł Đ°Ń‚Đ°ĐşŃĐµŃ‚ ĐĽĐ˝ĐľĐ¶ĐµŃŃ‚Đ˛ĐµĐ˝Đ˝Ń‹Đµ Ń†ĐµĐ»Đ¸`);
        
        // ĐťĐ°Ń…ĐľĐ´Đ¸ĐĽ Đ´Đľ 3 Đ±Đ»Đ¸Đ¶Đ°ĐąŃĐ¸Ń… Ń†ĐµĐ»ĐµĐą
        const enemies = this.isEnemy ? this.scene.playerUnits : this.scene.enemyUnits;
        const aliveEnemies = enemies.filter(enemy => enemy && !enemy.isDead && enemy.sprite && enemy.sprite.active);
        
        console.log(`Đ”ĐľŃŃ‚ŃĐżĐ˝Đľ Đ¶Đ¸Đ˛Ń‹Ń… Đ˛Ń€Đ°ĐłĐľĐ˛: ${aliveEnemies.length}`);
        
        if (aliveEnemies.length === 0) {
            console.log('ĐśĐ°Đł Đ˝Đµ Đ˝Đ°ŃĐµĐ» Đ¶Đ¸Đ˛Ń‹Ń… Ń†ĐµĐ»ĐµĐą Đ´Đ»ŃŹ Đ°Ń‚Đ°ĐşĐ¸');
            return false;
        }
        
        // ĐˇĐľŃ€Ń‚Đ¸Ń€ŃĐµĐĽ ĐżĐľ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸ŃŽ Đ¸ Đ±ĐµŃ€ĐµĐĽ Đ´Đľ 3 Đ±Đ»Đ¸Đ¶Đ°ĐąŃĐ¸Ń…
        const sortedEnemies = aliveEnemies.sort((a, b) => {
            return this.getDistanceTo(a) - this.getDistanceTo(b);
        });
        
        const targets = sortedEnemies.slice(0, this.maxTargets);
        
        console.log(`ĐśĐ°Đł Đ°Ń‚Đ°ĐşŃĐµŃ‚ ${targets.length} Ń†ĐµĐ»ĐµĐą:`, targets.map(t => `${t.constructor.name} (${t.hp} HP)`));
        
        // ĐťĐ°Đ˝ĐľŃĐ¸ĐĽ ŃŃ€ĐľĐ˝ Đ˛ŃĐµĐĽ Ń†ĐµĐ»ŃŹĐĽ
        targets.forEach((enemy, index) => {
            if (enemy && !enemy.isDead && enemy.sprite && enemy.sprite.active) {
                enemy.takeDamage(this.damage);
                
                // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ Đ´Đ»ŃŹ ĐşĐ°Đ¶Đ´ĐľĐą Ń†ĐµĐ»Đ¸
                setTimeout(() => {
                    this.createMagicBolt(enemy);
                }, index * 100); // Đ—Đ°Đ´ĐµŃ€Đ¶ĐşĐ° ĐĽĐµĐ¶Đ´Ń Đ°Ń‚Đ°ĐşĐ°ĐĽĐ¸
            }
        });
        
        return true;
    }

    createMagicBolt(target) {
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ Ń†ĐµĐ»ŃŚ Đ˛ŃĐµ ĐµŃ‰Đµ Đ¶Đ¸Đ˛Đ° Đ¸ Đ°ĐşŃ‚Đ¸Đ˛Đ˝Đ°
        if (!target || target.isDead || !target.sprite || !target.sprite.active) {
            console.log('Đ¦ĐµĐ»ŃŚ ĐĽĐµŃ€Ń‚Đ˛Đ° Đ¸Đ»Đ¸ Đ˝ĐµĐ°ĐşŃ‚Đ¸Đ˛Đ˝Đ°, ĐżŃ€ĐľĐżŃŃĐşĐ°ĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚');
            return;
        }
        
        // Đ¤Đ¸ĐľĐ»ĐµŃ‚ĐľĐ˛Đ°ŃŹ ĐĽĐ°ĐłĐ¸Ń‡ĐµŃĐşĐ°ŃŹ ŃŃ‚Ń€ĐµĐ»Đ° ĐľŃ‚ ĐĽĐ°ĐłĐ° Đş Ń†ĐµĐ»Đ¸
        const graphics = this.scene.add.graphics();
        graphics.lineStyle(3, 0x9B4AE2, 0.8);
        graphics.lineBetween(
            this.sprite.x, this.sprite.y,
            target.sprite.x, target.sprite.y
        );
        
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ Đ»Đ¸Đ˝Đ¸ŃŽ Ń‡ĐµŃ€ĐµĐ· 300ĐĽŃ
        this.scene.time.delayedCall(300, () => {
            if (graphics && graphics.destroy) {
                graphics.destroy();
            }
        });
        
        // Đ—Đ˛Ń‘Đ·Đ´ĐľŃ‡ĐşĐ¸ Đ˝Đ° Ń†ĐµĐ»Đ¸
        for (let i = 0; i < 3; i++) {
            const star = this.scene.add.star(
                target.sprite.x + Phaser.Math.Between(-15, 15),
                target.sprite.y + Phaser.Math.Between(-15, 15),
                5, 5, 10, 0x9B4AE2
            );
            
            this.scene.tweens.add({
                targets: star,
                y: star.y - 20,
                alpha: 0,
                angle: 360,
                duration: 500,
                delay: i * 50,
                onComplete: () => {
                    if (star && star.destroy) {
                        star.destroy();
                    }
                }
            });
        }
        
        // Đ’ŃĐżŃ‹ŃĐşĐ° Đ˝Đ° Ń†ĐµĐ»Đ¸
        const flash = this.scene.add.circle(target.sprite.x, target.sprite.y, 15, 0x9B4AE2, 0.6);
        this.scene.tweens.add({
            targets: flash,
            scaleX: 1.5,
            scaleY: 1.5,
            alpha: 0,
            duration: 300,
            onComplete: () => {
                if (flash && flash.destroy) {
                    flash.destroy();
                }
            }
        });
    }
}

// Đ˘Đ°Đ˝Đş
class Tank extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0xC0C0C0);
        
        this.unitType = 'TANK';
        this.maxHp = 80;
        this.hp = this.maxHp;
        this.damage = 10;
        this.attackSpeed = 2.0;
        this.baseAttackSpeed = 2.0;
        this.range = 10;
        this.shieldReduction = 0.3;
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
        this.createShieldEffect();
    }
    
    createShieldEffect() {
        // Đ’Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ Ń‰Đ¸Ń‚Đ° - Đ·ĐľĐ»ĐľŃ‚ĐľĐą ĐşŃ€ŃĐł Đ˛ĐľĐşŃ€ŃĐł ŃŽĐ˝Đ¸Ń‚Đ°
        if (this.shieldGlow) {
            this.shieldGlow.destroy();
        }
        
        const centerX = this.sprite.x;
        const centerY = this.sprite.y;
        const radius = Math.max(this.size.width, this.size.height) * this.scene.gridSystem.cellSize * 0.6;
        
        this.shieldGlow = this.scene.add.circle(centerX, centerY, radius, 0xFFD700, 0.3);
        this.shieldGlow.setStrokeStyle(2, 0xFFD700, 0.8);
        
        // ĐźŃĐ»ŃŚŃĐ¸Ń€ŃŃŽŃ‰Đ°ŃŹ Đ°Đ˝Đ¸ĐĽĐ°Ń†Đ¸ŃŹ
        this.scene.tweens.add({
            targets: this.shieldGlow,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    takeDamage(damage) {
        const reducedDamage = Math.floor(damage * (1 - this.shieldReduction));
        console.log(`Đ˘Đ°Đ˝Đş ĐżĐľĐ»ŃŃ‡Đ°ĐµŃ‚ ŃŃ€ĐľĐ˝: ${damage} -> ${reducedDamage} (Ń‰Đ¸Ń‚: ${this.shieldReduction * 100}%)`);
        super.takeDamage(reducedDamage);
        
        // ĐźŃ€Đ¸ĐĽĐµĐ˝ŃŹĐµĐĽ Ń‰Đ¸Ń‚ Đş ŃĐľŃĐµĐ´Đ˝Đ¸ĐĽ ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐ°ĐĽ
        this.applyShieldToAllies();
    }
    
    applyShieldToAllies() {
        const allies = this.isEnemy ? this.scene.enemyUnits : this.scene.playerUnits;
        allies.forEach(ally => {
            if (ally !== this && !ally.isDead && this.getGridDistanceTo(ally) <= 1) {
                // ĐźŃ€Đ¸ĐĽĐµĐ˝ŃŹĐµĐĽ Đ˛Ń€ĐµĐĽĐµĐ˝Đ˝Ń‹Đą Ń‰Đ¸Ń‚ Đş ŃĐľŃŽĐ·Đ˝Đ¸ĐşŃ
                ally.tempShield = true;
                ally.shieldReduction = 0.15; // ĐśĐµĐ˝ŃŚŃĐ¸Đą Ń‰Đ¸Ń‚ Đ´Đ»ŃŹ ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐľĐ˛
                
                // ĐŁĐ±Đ¸Ń€Đ°ĐµĐĽ Ń‰Đ¸Ń‚ Ń‡ĐµŃ€ĐµĐ· 3 ŃĐµĐşŃĐ˝Đ´Ń‹
                this.scene.time.delayedCall(3000, () => {
                    if (ally.tempShield) {
                        ally.tempShield = false;
                        ally.shieldReduction = 0;
                    }
                });
            }
        });
    }
    
    setPosition(x, y) {
        // Đ’Ń‹Đ·Ń‹Đ˛Đ°ĐµĐĽ Ń€ĐľĐ´Đ¸Ń‚ĐµĐ»ŃŚŃĐşĐ¸Đą ĐĽĐµŃ‚ĐľĐ´ Đ´Đ»ŃŹ ĐľĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸ŃŹ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ŃĐżŃ€Đ°ĐąŃ‚Đ° Đ¸ HP Đ±Đ°Ń€Đ°
        super.setPosition(x, y);
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ŃŤŃ„Ń„ĐµĐşŃ‚Đ° Ń‰Đ¸Ń‚Đ°
        if (this.shieldGlow) {
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            this.shieldGlow.setPosition(centerX, centerY);
        }
    }
    
    die() {
        if (this.shieldGlow) {
            this.shieldGlow.destroy();
        }
        super.die();
    }
}

// ĐŃŃĐ°ŃĐ¸Đ˝
class Assassin extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 1, height: 1 }, 0x8B008B);
        
        this.unitType = 'ASSASSIN';
        this.maxHp = 20;
        this.hp = this.maxHp;
        this.damage = 20;
        this.attackSpeed = 1.2;
        this.baseAttackSpeed = 1.2;
        this.range = 10;
        this.criticalChance = 0.5;
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
    
    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        
        // Đ¨Đ°Đ˝Ń ĐşŃ€Đ¸Ń‚Đ¸Ń‡ĐµŃĐşĐľĐłĐľ ŃĐ´Đ°Ń€Đ°
        const isCritical = Math.random() < this.criticalChance;
        const finalDamage = isCritical ? this.damage * 2 : this.damage;
        
        if (isCritical) {
            console.log('ĐšĐ ĐĐ˘ĐĐ§Đ•ĐˇĐšĐĐ™ ĐŁĐ”ĐĐ !', finalDamage);
            this.createCriticalEffect(target);
        }
        
        target.takeDamage(finalDamage);
        this.createAttackEffect(target);
        
        return true;
    }
    
    createCriticalEffect(target) {
        // Đ’Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ ĐşŃ€Đ¸Ń‚Đ¸Ń‡ĐµŃĐşĐľĐłĐľ ŃĐ´Đ°Ń€Đ° - Đ¶ĐµĐ»Ń‚Đ°ŃŹ Đ˛ŃĐżŃ‹ŃĐşĐ°
        const flash = this.scene.add.rectangle(
            target.sprite.x, 
            target.sprite.y, 
            target.size.width * this.scene.gridSystem.cellSize,
            target.size.height * this.scene.gridSystem.cellSize,
            0xFFFF00,
            0.8
        );
        
        this.scene.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy()
        });
    }
}

// Đ”Ń€ŃĐ¸Đ´
class Druid extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x8B4513);
        
        this.unitType = 'DRUID';
        this.maxHp = 45;
        this.hp = this.maxHp;
        this.damage = 6;
        this.attackSpeed = 1.8;
        this.baseAttackSpeed = 1.8;
        this.range = 10;
        this.thornsDamage = 5;
        
        // ĐžĐżŃ€ĐµĐ´ĐµĐ»ŃŹĐµĐĽ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸ Đ´Đ»ŃŹ _J Ń„ĐľŃ€ĐĽŃ‹
        this.occupiedCells = [
            { x: 1, y: 0 }, // Top-right
            { x: 0, y: 1 }, // Bottom-left
            { x: 1, y: 1 }  // Bottom-right
        ];
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
        this.createThornsEffect();
    }
    
    createThornsEffect() {
        // Đ’Đ¸Đ·ŃĐ°Đ»ŃŚĐ˝Ń‹Đą ŃŤŃ„Ń„ĐµĐşŃ‚ ŃĐ¸ĐżĐľĐ˛ - Đ·ĐµĐ»ĐµĐ˝Ń‹Đµ ŃĐ¸ĐżŃ‹ Đ˛ĐľĐşŃ€ŃĐł ŃŽĐ˝Đ¸Ń‚Đ°
        if (this.thornsGlow) {
            this.thornsGlow.destroy();
        }
        
        const centerX = this.sprite.x;
        const centerY = this.sprite.y;
        const radius = Math.max(this.size.width, this.size.height) * this.scene.gridSystem.cellSize * 0.5;
        
        this.thornsGlow = this.scene.add.circle(centerX, centerY, radius, 0x00FF00, 0.2);
        this.thornsGlow.setStrokeStyle(1, 0x00FF00, 0.6);
        
        // Đ’Ń€Đ°Ń‰Đ°ŃŽŃ‰Đ°ŃŹŃŃŹ Đ°Đ˝Đ¸ĐĽĐ°Ń†Đ¸ŃŹ
        this.scene.tweens.add({
            targets: this.thornsGlow,
            rotation: Math.PI * 2,
            duration: 2000,
            repeat: -1,
            ease: 'Linear'
        });
    }
    
    setPosition(x, y) {
        // Đ’Ń‹Đ·Ń‹Đ˛Đ°ĐµĐĽ Ń€ĐľĐ´Đ¸Ń‚ĐµĐ»ŃŚŃĐşĐ¸Đą ĐĽĐµŃ‚ĐľĐ´ Đ´Đ»ŃŹ ĐľĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸ŃŹ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ŃĐżŃ€Đ°ĐąŃ‚Đ° Đ¸ HP Đ±Đ°Ń€Đ°
        super.setPosition(x, y);
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ŃŤŃ„Ń„ĐµĐşŃ‚Đ° ŃĐ¸ĐżĐľĐ˛
        if (this.thornsGlow) {
            const centerX = this.scene.gridSystem.gridOffsetX + 
                ((this.gridX + this.size.width / 2) * this.scene.gridSystem.cellSize);
            const centerY = this.scene.gridSystem.gridOffsetY + 
                ((this.gridY + this.size.height / 2) * this.scene.gridSystem.cellSize);
            this.thornsGlow.setPosition(centerX, centerY);
        }
    }
    
    takeDamage(damage) {
        super.takeDamage(damage);
        
        // ĐžŃ‚Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ ŃŃ€ĐľĐ˝Đ° ĐľĐ±Ń€Đ°Ń‚Đ˝Đľ Đ°Ń‚Đ°ĐşŃŃŽŃ‰ĐµĐĽŃ
        // Đ­Ń‚Đľ Đ±ŃĐ´ĐµŃ‚ ĐľĐ±Ń€Đ°Đ±ĐľŃ‚Đ°Đ˝Đľ Đ˛ BattleSystem.processAttacks
    }
    
    die() {
        if (this.thornsGlow) {
            this.thornsGlow.destroy();
        }
        super.die();
    }
}

// Đ’ĐµĐ´ŃŚĐĽĐ°
class Witch extends Unit {
    constructor(scene, gridX, gridY, isEnemy = false) {
        super(scene, gridX, gridY, isEnemy, { width: 2, height: 2 }, 0x4B0082);
        
        this.unitType = 'WITCH';
        this.maxHp = 35;
        this.hp = this.maxHp;
        this.damage = 12;
        this.attackSpeed = 3.0;
        this.baseAttackSpeed = 3.0;
        this.range = 10;
        this.curseDebuff = 0.5;
        this.cursedEnemies = new Set();
        
        this.baseHp = this.maxHp;
        this.baseDamage = this.damage;
        
        this.updateVisuals();
    }
    
    attack(target) {
        if (!this.canAttack() || this.isDead) return false;
        
        this.lastAttackTime = this.scene.time.now;
        target.takeDamage(this.damage);
        this.createAttackEffect(target);
        this.applyCurseDebuff(target);
        
        return true;
    }
    
    applyCurseDebuff(target) {
        if (!target || target.isDead) return;
        
        if (!target.originalDamage) {
            target.originalDamage = target.damage;
        }
        
        target.damage = target.originalDamage * this.curseDebuff;
        target.isCursed = true;
        this.cursedEnemies.add(target);
        this.createCurseDebuffEffect(target);
        
        console.log(`Đ’ĐµĐ´ŃŚĐĽĐ° ĐżŃ€ĐľĐşĐ»ŃŹĐ»Đ° ${target.constructor.name}, ŃŃ€ĐľĐ˝: ${target.originalDamage} â†’ ${target.damage}`);
    }
    
    createCurseDebuffEffect(target) {
        const aura = this.scene.add.circle(
            target.sprite.x, target.sprite.y,
            this.scene.gridSystem.cellSize * 0.6,
            0x4B0082, 0.3
        );
        aura.setDepth(90);
        
        this.scene.tweens.add({
            targets: aura,
            alpha: 0.1,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        if (target.curseAura) {
            target.curseAura.destroy();
        }
        target.curseAura = aura;
    }
    
    die() {
        this.cursedEnemies.forEach(enemy => {
            if (enemy && enemy.isAlive() && enemy.isCursed) {
                enemy.damage = enemy.originalDamage || enemy.damage;
                enemy.isCursed = false;
                if (enemy.curseAura) {
                    enemy.curseAura.destroy();
                    enemy.curseAura = null;
                }
            }
        });
        this.cursedEnemies.clear();
        super.die();
    }
}

// Đ‘ĐľĐµĐ˛Đ°ŃŹ ŃĐ¸ŃŃ‚ĐµĐĽĐ°
class BattleSystem {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.battleTimer = null;
        this.checkInterval = 100;
    }

    startBattle(playerUnits, enemyUnits) {
        console.log('BattleSystem.startBattle Đ˛Ń‹Đ·Đ˛Đ°Đ˝');
        console.log('Đ®Đ˝Đ¸Ń‚Ń‹ Đ¸ĐłŃ€ĐľĐşĐ°:', playerUnits.length);
        console.log('Đ®Đ˝Đ¸Ń‚Ń‹ Đ˛Ń€Đ°ĐłĐ°:', enemyUnits.length);
        
        this.isActive = true;
        this.playerUnits = playerUnits;
        this.enemyUnits = enemyUnits;
        
        this.battleTimer = this.scene.time.addEvent({
            delay: this.checkInterval,
            callback: this.updateBattle,
            callbackScope: this,
            loop: true
        });
        
        console.log('Đ˘Đ°ĐąĐĽĐµŃ€ Đ±ĐľŃŹ ŃĐľĐ·Đ´Đ°Đ˝, Đ¸Đ˝Ń‚ĐµŃ€Đ˛Đ°Đ»:', this.checkInterval);
    }

    updateBattle() {
        if (!this.isActive) return;
        
        const alivePlayerUnits = this.playerUnits.filter(unit => unit.isAlive());
        const aliveEnemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ Đ±Đ°Ń„Ń„Ń‹ ĐľŃ‚ ĐĽĐµŃ‡Đ˝Đ¸ĐşĐľĐ˛ (Đ‘ĐľĐµĐ˛ĐľĐą ĐşĐ»Đ¸Ń‡)
        this.updateBattleCryBuffs(alivePlayerUnits);
        this.updateBattleCryBuffs(aliveEnemyUnits);
        
        // ĐźŃ€Đ¸ĐĽĐµĐ˝ŃŹĐµĐĽ ĐżŃ€ĐľĐşĐ»ŃŹŃ‚Đ¸ŃŹ Đ’ĐµĐ´ŃŚĐĽ
        
        if (alivePlayerUnits.length === 0) {
            console.log('ĐźĐľŃ€Đ°Đ¶ĐµĐ˝Đ¸Đµ! Đ’Ń€Đ°ĐłĐ¸ ĐżĐľĐ±ĐµĐ´Đ¸Đ»Đ¸.');
            this.endBattle(false);
            return;
        }
        
        if (aliveEnemyUnits.length === 0) {
            console.log('ĐźĐľĐ±ĐµĐ´Đ°! Đ’ŃĐµ Đ˛Ń€Đ°ĐłĐ¸ ĐżĐľĐ˛ĐµŃ€Đ¶ĐµĐ˝Ń‹!');
            this.endBattle(true);
            return;
        }
        
        this.processAttacks(alivePlayerUnits, aliveEnemyUnits);
        this.processAttacks(aliveEnemyUnits, alivePlayerUnits);
    }

    processAttacks(attackingUnits, targetUnits) {
        attackingUnits.forEach(unit => {
            console.log(`ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ ŃŽĐ˝Đ¸Ń‚ ${unit.constructor.name}, ĐĽĐľĐ¶ĐµŃ‚ Đ°Ń‚Đ°ĐşĐľĐ˛Đ°Ń‚ŃŚ: ${unit.canAttack()}`);
            if (unit.canAttack()) {
                const target = this.findNearestTarget(unit, targetUnits);
                console.log(`Đ®Đ˝Đ¸Ń‚ ${unit.constructor.name} Đ˝Đ°ŃĐµĐ» Ń†ĐµĐ»ŃŚ: ${target ? target.constructor.name : 'Đ˝ĐµŃ‚'}`);
                if (target) {
                    console.log(`Đ®Đ˝Đ¸Ń‚ ${unit.constructor.name} Đ°Ń‚Đ°ĐşŃĐµŃ‚ ${target.constructor.name}`);
                    unit.attack(target);
                    
                    // Đ¨Đ¸ĐżŃ‹ Đ”Ń€ŃĐ¸Đ´Đ°: ĐľŃ‚Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ ŃŃ€ĐľĐ˝Đ° ĐľĐ±Ń€Đ°Ń‚Đ˝Đľ Đ°Ń‚Đ°ĐşŃŃŽŃ‰ĐµĐĽŃ
                    if (target instanceof Druid && target.isAlive()) {
                        unit.takeDamage(target.thornsDamage);
                        console.log('Đ¨Đ¸ĐżŃ‹ Đ”Ń€ŃĐ¸Đ´Đ° ĐľŃ‚Ń€Đ°Đ¶Đ°ŃŽŃ‚ ŃŃ€ĐľĐ˝:', target.thornsDamage);
                    }
                }
            }
        });
    }

    findNearestTarget(unit, possibleTargets) {
        if (possibleTargets.length === 0) return null;
        
        // ĐźĐ ĐžĐ’ĐžĐšĐĐ¦ĐĐŻ: ĐżŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˝Đ°Đ»Đ¸Ń‡Đ¸Đµ Đ˛Đ°Ń€Đ˛Đ°Ń€ĐľĐ˛ Ń taunt
        const tauntTargets = possibleTargets.filter(target => 
            target.isAlive() && target.hasTaunt
        );
        
        // Đ•ŃĐ»Đ¸ ĐµŃŃ‚ŃŚ Đ¶Đ¸Đ˛Ń‹Đµ Đ˛Đ°Ń€Đ˛Đ°Ń€Ń‹ Ń ĐżŃ€ĐľĐ˛ĐľĐşĐ°Ń†Đ¸ĐµĐą - Đ˛Ń‹Đ±Đ¸Ń€Đ°ĐµĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ Đ¸Đ· Đ˝Đ¸Ń…
        const validTargets = tauntTargets.length > 0 ? tauntTargets : possibleTargets;
        
        if (tauntTargets.length > 0) {
            console.log(`${unit.constructor.name} ĐżŃ€ĐľĐ˛ĐľŃ†Đ¸Ń€ĐľĐ˛Đ°Đ˝! ĐŃ‚Đ°ĐşŃĐµŃ‚ Ń‚ĐľĐ»ŃŚĐşĐľ Đ˛Đ°Ń€Đ˛Đ°Ń€ĐľĐ˛ (${tauntTargets.length})`);
        }
        
        const unitPos = unit.getPosition();
        let nearestTarget = null;
        let nearestDistance = Infinity;
        
        validTargets.forEach(target => {
            if (!target.isAlive()) return;
            
            // ĐŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ Ń€Đ°ŃŃŃ‚ĐľŃŹĐ˝Đ¸Đµ Đ˛ ĐşĐ»ĐµŃ‚ĐşĐ°Ń… ŃĐµŃ‚ĐşĐ¸
            const gridDistance = unit.getGridDistanceTo(target);
            
            if (gridDistance <= unit.range && gridDistance < nearestDistance) {
                nearestTarget = target;
                nearestDistance = gridDistance;
            }
        });
        
        return nearestTarget;
    }

    // ĐžĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸Đµ Đ±Đ°Ń„Ń„ĐľĐ˛ ĐľŃ‚ Đ‘ĐľĐµĐ˛ĐľĐłĐľ ĐşĐ»Đ¸Ń‡Đ° (2+ ĐĽĐµŃ‡Đ˝Đ¸ĐşĐ° ŃŃĐşĐľŃ€ŃŹŃŽŃ‚ ŃĐľŃŽĐ·Đ˝Đ¸ĐşĐľĐ˛)
    updateBattleCryBuffs(units) {
        // ĐˇŃ‡Đ¸Ń‚Đ°ĐµĐĽ ĐşĐľĐ»Đ¸Ń‡ĐµŃŃ‚Đ˛Đľ Đ¶Đ¸Đ˛Ń‹Ń… ĐĽĐµŃ‡Đ˝Đ¸ĐşĐľĐ˛ Đ˛ ĐşĐľĐĽĐ°Đ˝Đ´Đµ
        const warriors = units.filter(unit => 
            unit instanceof Warrior && unit.isAlive()
        );
        
        const warriorCount = warriors.length;
        const battleCryActive = warriorCount >= 2;
        
        // ĐźŃ€Đ¸ĐĽĐµĐ˝ŃŹĐµĐĽ Đ¸Đ»Đ¸ ŃĐ˝Đ¸ĐĽĐ°ĐµĐĽ Đ±Đ°Ń„Ń„ Đ´Đ»ŃŹ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
        units.forEach(unit => {
            if (!unit.isAlive()) return;
            
            // Đ”Đ»ŃŹ ĐĽĐµŃ‡Đ˝Đ¸ĐşĐľĐ˛: Đ˛ĐşĐ»ŃŽŃ‡Đ°ĐµĐĽ/Đ˛Ń‹ĐşĐ»ŃŽŃ‡Đ°ĐµĐĽ Đ˛Đ¸Đ·ŃĐ°Đ»
            if (unit instanceof Warrior) {
                unit.setBattleCryActive(battleCryActive);
            }
            
            // Đ”Đ»ŃŹ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛: ĐżŃ€Đ¸ĐĽĐµĐ˝ŃŹĐµĐĽ Đ±Đ°Ń„Ń„ ŃĐşĐľŃ€ĐľŃŃ‚Đ¸ Đ°Ń‚Đ°ĐşĐ¸
            if (!unit.baseAttackSpeed) {
                unit.baseAttackSpeed = unit.attackSpeed;
            }
            
            if (battleCryActive) {
                // ĐŁŃĐşĐľŃ€ŃŹĐµĐĽ Đ°Ń‚Đ°ĐşŃ Đ˝Đ° 25%
                unit.attackSpeed = unit.baseAttackSpeed * (1 - 0.25);
            } else {
                // Đ’ĐľĐ·Đ˛Ń€Đ°Ń‰Đ°ĐµĐĽ Đ˝ĐľŃ€ĐĽĐ°Đ»ŃŚĐ˝ŃŃŽ ŃĐşĐľŃ€ĐľŃŃ‚ŃŚ
                unit.attackSpeed = unit.baseAttackSpeed;
            }
        });
    }


    endBattle(victory) {
        this.isActive = false;
        
        if (this.battleTimer) {
            this.battleTimer.destroy();
            this.battleTimer = null;
        }
        
        if (this.scene && this.scene.endBattle) {
            this.scene.endBattle(victory);
        }
    }
}

// ĐˇĐ¸ŃŃ‚ĐµĐĽĐ° ŃŤĐşĐľĐ˝ĐľĐĽĐ¸ĐşĐ¸
class EconomySystem {
    constructor(scene) {
        this.scene = scene;
        this.coins = window.gameConfig.STARTING_COINS;
    }

    getCoins() {
        return this.coins;
    }

    addCoins(amount) {
        this.coins += amount;
    }

    spendCoins(amount) {
        if (this.canAfford(amount)) {
            this.coins -= amount;
            return true;
        }
        return false;
    }

    canAfford(amount) {
        return this.coins >= amount;
    }
}

// ĐžŃĐ˝ĐľĐ˛Đ˝Đ°ŃŹ Đ¸ĐłŃ€ĐľĐ˛Đ°ŃŹ ŃŃ†ĐµĐ˝Đ°
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        
        this.gridSystem = null;
        this.battleSystem = null;
        this.economySystem = null;
        this.playerUnits = [];
        this.enemyUnits = [];
        this.isBattleActive = false;
        this.isPlacing = false;
        this.selectedUnitType = null;
        this.selectedUnitData = null;
        this.selectedCardIndex = null; // ĐĐ˝Đ´ĐµĐşŃ Đ˛Ń‹Đ±Ń€Đ°Đ˝Đ˝ĐľĐą ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ Đ˛ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đµ
        this.hintText = null;
        this.shopUnits = []; // ĐˇĐ»ŃŃ‡Đ°ĐąĐ˝Ń‹Đµ ŃŽĐ˝Đ¸Ń‚Ń‹ Đ˛ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đµ
        this.shopCards = []; // ĐšĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        this.sellArea = null; // ĐžĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ (null ĐşĐľĐłĐ´Đ° Đ˝Đµ Đ°ĐşŃ‚Đ¸Đ˛Đ˝Đ°)
        this.currentRound = 1; // Đ˘ĐµĐşŃŃ‰Đ¸Đą Ń€Đ°ŃĐ˝Đ´ (1-5)
        this.maxRounds = 5; // ĐśĐ°ĐşŃĐ¸ĐĽŃĐĽ Ń€Đ°ŃĐ˝Đ´ĐľĐ˛ (Best of 5)
        this.winsNeeded = 3; // ĐťŃĐ¶Đ˝Đľ 3 ĐżĐľĐ±ĐµĐ´Ń‹ Đ´Đ»ŃŹ ĐżĐľĐ±ĐµĐ´Ń‹ Đ˛ ĐĽĐ°Ń‚Ń‡Đµ
        this.roundResults = []; // Đ ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚Ń‹ Ń€Đ°ŃĐ˝Đ´ĐľĐ˛ (true = ĐżĐľĐ±ĐµĐ´Đ°, false = ĐżĐľŃ€Đ°Đ¶ĐµĐ˝Đ¸Đµ)
        this.roundText = null; // Đ˘ĐµĐşŃŃ‚ Ń Đ˝ĐľĐĽĐµŃ€ĐľĐĽ Ń€Đ°ŃĐ˝Đ´Đ°
        this.resultsText = null; // Đ˘ĐµĐşŃŃ‚ Ń Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚Đ°ĐĽĐ¸ Ń€Đ°ŃĐ˝Đ´ĐľĐ˛
        
        // Drag-and-Drop ŃĐľŃŃ‚ĐľŃŹĐ˝Đ¸Đµ
        this.isDragging = false;           // Đ¤Đ»Đ°Đł ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ
        this.isDraggingFromField = false;  // Đ¤Đ»Đ°Đł ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ Ń ĐżĐľĐ»ŃŹ
        this.dragGhost = null;             // ĐźŃ€Đ¸Đ·Ń€Đ°Ń‡Đ˝Đ°ŃŹ ĐşĐľĐżĐ¸ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°
        this.dragGhostElements = [];       // Đ­Đ»ĐµĐĽĐµĐ˝Ń‚Ń‹ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ° (Đ¸ĐşĐľĐ˝ĐşĐ°, Ń€Đ°ĐĽĐşĐ° Đ¸ Ń‚Đ´)
        this.highlightedCells = [];        // ĐźĐľĐ´ŃĐ˛ĐµŃ‡ĐµĐ˝Đ˝Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸
        this.dragStartX = 0;               // ĐťĐ°Ń‡Đ°Đ»ŃŚĐ˝Đ°ŃŹ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŹ Đ´Đ»ŃŹ ĐľŃ‚ĐĽĐµĐ˝Ń‹
        this.dragStartY = 0;
        this.draggedUnit = null;           // ĐźĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°ĐµĐĽŃ‹Đą ŃŽĐ˝Đ¸Ń‚
    }

    init() {
        // ĐˇĐ±Ń€Đ°ŃŃ‹Đ˛Đ°ĐµĐĽ Đ˛ŃĐµ ĐżĐµŃ€ĐµĐĽĐµĐ˝Đ˝Ń‹Đµ ĐżŃ€Đ¸ Ń€ĐµŃŃ‚Đ°Ń€Ń‚Đµ Đ¸ĐłŃ€Ń‹
        this.playerUnits = [];
        this.enemyUnits = [];
        this.isBattleActive = false;
        this.isPlacing = false;
        this.selectedUnitType = null;
        this.selectedUnitData = null;
        this.selectedCardIndex = null;
        this.hintText = null;
        this.shopUnits = [];
        this.shopCards = [];
        this.currentRound = 1;
        this.roundResults = [];
        this.roundText = null;
        this.resultsText = null;
        
        console.log('=== ĐĐ“Đ Đ ĐˇĐ‘Đ ĐžĐ¨Đ•ĐťĐ ===');
    }

    preload() {
        // Đ’Ń€ĐµĐĽĐµĐ˝Đ˝Đľ ĐľŃ‚ĐşĐ»ŃŽŃ‡Đ°ĐµĐĽ Đ·Đ°ĐłŃ€ŃĐ·ĐşŃ ŃĐżŃ€Đ°ĐąŃ‚ĐľĐ˛ Đ¸Đ·-Đ·Đ° CORS
        // TODO: Đ’ĐşĐ»ŃŽŃ‡Đ¸Ń‚ŃŚ ĐşĐľĐłĐ´Đ° Đ±ŃĐ´ĐµŃ‚ HTTP ŃĐµŃ€Đ˛ĐµŃ€
        /*
        this.load.image('archer', 'src/assets/sprites/Elf_Archer.png');
        this.load.image('warrior', 'src/assets/sprites/Elf_Knight_Sword.png');
        this.load.image('barbarian', 'src/assets/sprites/Dwarf Axe Warrior.png');
        this.load.image('healer', 'src/assets/sprites/Dark Elves Healer Priestess.png');
        this.load.image('mage', 'src/assets/sprites/Dark Elves Crystal Mage.png');
        this.load.image('tank', 'src/assets/sprites/tank.png');
        this.load.image('assassin', 'src/assets/sprites/assassin.png');
        this.load.image('druid', 'src/assets/sprites/druid.png');
        this.load.image('witch', 'src/assets/sprites/witch.png');
        */
        
        // Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ ĐľĐ±Ń€Đ°Đ±ĐľŃ‚Ń‡Đ¸ĐşĐ¸ Đ´Đ»ŃŹ ĐľŃ‚Đ»Đ°Đ´ĐşĐ¸ Đ·Đ°ĐłŃ€ŃĐ·ĐşĐ¸
        this.load.on('filecomplete', (key, type, data) => {
            console.log('ĐˇĐżŃ€Đ°ĐąŃ‚ Đ·Đ°ĐłŃ€ŃĐ¶ĐµĐ˝:', key);
        });
        
        this.load.on('loaderror', (file) => {
            console.error('ĐžŃĐ¸Đ±ĐşĐ° Đ·Đ°ĐłŃ€ŃĐ·ĐşĐ¸ ŃĐżŃ€Đ°ĐąŃ‚Đ°:', file.key, file.url);
        });
    }

    create() {
        this.gridSystem = new GridSystem(this);
        this.battleSystem = new BattleSystem(this);
        this.economySystem = new EconomySystem(this);
        
        this.createGameField();
        this.createUI();
        this.createShop();
        this.createRoundDisplay();
        
        // Đ“Đ»ĐľĐ±Đ°Đ»ŃŚĐ˝Ń‹Đą ĐľĐ±Ń€Đ°Đ±ĐľŃ‚Ń‡Đ¸Đş ĐşĐ»Đ¸ĐşĐľĐ˛ ĐżĐľ ĐżĐľĐ»ŃŽ Đ´Đ»ŃŹ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
        this.input.on('pointerdown', this.handleFieldClick, this);
        
        console.log('ĐĐłŃ€ĐľĐ˛Đ°ŃŹ ŃŃ†ĐµĐ˝Đ° ŃĐľĐ·Đ´Đ°Đ˝Đ°');
        console.log('ĐšĐľĐ˝Ń„Đ¸ĐłŃŃ€Đ°Ń†Đ¸ŃŹ:', window.gameConfig.VERSION, 'ĐźĐľĐ»Đµ:', window.gameConfig.GRID_WIDTH + 'x' + window.gameConfig.GRID_HEIGHT);
    }

    createGameField() {
        const { GRID_WIDTH, GRID_HEIGHT, CELL_SIZE } = window.gameConfig;
        
        // ĐŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ CELL_SIZE Đ¸Đ· ĐşĐľĐ˝Ń„Đ¸ĐłŃŃ€Đ°Ń†Đ¸Đ¸, ĐµŃĐ»Đ¸ ĐľĐ˝ Đ·Đ°Đ´Đ°Đ˝
        let finalCellSize;
        if (CELL_SIZE && CELL_SIZE > 0) {
            finalCellSize = CELL_SIZE;
            console.log(`ĐŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ĐşĐ»ĐµŃ‚ĐşĐ¸ Đ¸Đ· ĐşĐľĐ˝Ń„Đ¸ĐłŃŃ€Đ°Ń†Đ¸Đ¸: ${finalCellSize}`);
        } else {
            // ĐĐ˝Đ°Ń‡Đµ Ń€Đ°ŃŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ Đ´Đ¸Đ˝Đ°ĐĽĐ¸Ń‡ĐµŃĐşĐ¸
            const screenWidth = this.cameras.main.width;
            const availableWidth = screenWidth - 100; // 50px ĐľŃ‚ŃŃ‚ŃĐż Ń ĐşĐ°Đ¶Đ´ĐľĐą ŃŃ‚ĐľŃ€ĐľĐ˝Ń‹
            const cellSize = Math.floor(availableWidth / GRID_WIDTH);
            
            // ĐžĐłŃ€Đ°Đ˝Đ¸Ń‡Đ¸Đ˛Đ°ĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ĐşĐ»ĐµŃ‚ĐşĐ¸, Ń‡Ń‚ĐľĐ±Ń‹ ĐżĐľĐ»Đµ Đ˝Đµ Đ±Ń‹Đ»Đľ ŃĐ»Đ¸ŃĐşĐľĐĽ Đ±ĐľĐ»ŃŚŃĐ¸ĐĽ
            const maxCellSize = 70; // ĐžĐżŃ‚Đ¸ĐĽĐ°Đ»ŃŚĐ˝Ń‹Đą Ń€Đ°Đ·ĐĽĐµŃ€ ĐşĐ»ĐµŃ‚ĐşĐ¸ Đ´Đ»ŃŹ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń‹
            finalCellSize = Math.min(cellSize, maxCellSize);
            console.log(`Đ Đ°ŃŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ĐşĐ»ĐµŃ‚ĐşĐ¸ Đ´Đ¸Đ˝Đ°ĐĽĐ¸Ń‡ĐµŃĐşĐ¸: ${finalCellSize} (ŃŤĐşŃ€Đ°Đ˝Đ°: ${screenWidth}px)`);
        }
        
        console.log(`ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ĐżĐľĐ»Đµ: ${GRID_WIDTH}x${GRID_HEIGHT}, Ń€Đ°Đ·ĐĽĐµŃ€ ĐşĐ»ĐµŃ‚ĐşĐ¸: ${finalCellSize}`);
        this.gridSystem.createGrid(GRID_WIDTH, GRID_HEIGHT, finalCellSize);
    }

    createUI() {
        // ĐĐ´Đ°ĐżŃ‚Đ¸Đ˛Đ˝ĐľĐµ ĐżĐľĐ·Đ¸Ń†Đ¸ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ UI ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚ĐľĐ˛
        const screenWidth = this.cameras.main.width;
        const fightButtonX = screenWidth - 80; // 80px ĐľŃ‚ ĐżŃ€Đ°Đ˛ĐľĐłĐľ ĐşŃ€Đ°ŃŹ
        
        this.fightButton = this.add.rectangle(fightButtonX, 50, 120, 40, 0xE24A4A)
            .setInteractive()
            .on('pointerdown', () => {
                this.startBattle();
            });

        this.add.text(fightButtonX, 50, 'FIGHT', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.coinsText = this.add.text(80, 50, `ĐśĐľĐ˝ĐµŃ‚Ń‹: ${this.economySystem.getCoins()}`, {
            fontSize: '20px',
            fill: '#FFD700',
            fontStyle: 'bold'
        });

        this.fightButton.on('pointerover', () => {
            this.fightButton.setFillStyle(0xF25A5A);
        });

        this.fightButton.on('pointerout', () => {
            this.fightButton.setFillStyle(0xE24A4A);
        });
    }

    createShop() {
        // Đ Đ°ŃŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń‹ Đ˝Đ° ĐľŃĐ˝ĐľĐ˛Đµ Ń€Đ°Đ·ĐĽĐµŃ€Đ° ĐżĐľĐ»ŃŹ
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 300; // 300 ĐżĐ¸ĐşŃĐµĐ»ĐµĐą ĐľŃ‚ŃŃ‚ŃĐż ĐľŃ‚ ĐżĐľĐ»ŃŹ
        
        // Đ“ĐµĐ˝ĐµŃ€Đ¸Ń€ŃĐµĐĽ 4 ŃĐ»ŃŃ‡Đ°ĐąĐ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚Đ°
        this.generateShopUnits();
        
        // ĐĐ´Đ°ĐżŃ‚Đ¸Đ˛Đ˝ĐľĐµ ĐżĐľĐ·Đ¸Ń†Đ¸ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐµĐş ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        const { startX, cardSpacing, cardWidth } = this.calculateShopPositions();
        
        this.createShopCards(shopY, startX, cardSpacing, cardWidth);
        
        // ĐšĐ˝ĐľĐżĐşĐ° Ń€ĐµŃ€ĐľĐ»Đ»Đ°
        this.createRerollButton(shopY, startX, cardSpacing);
    }

    calculateShopPositions() {
        const screenWidth = this.cameras.main.width;
        const cardWidth = 90; // ĐťĐµĐĽĐ˝ĐľĐłĐľ ŃĐĽĐµĐ˝ŃŚŃĐµĐ˝Đ° ŃĐ¸Ń€Đ¸Đ˝Đ° ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸
        const cardSpacing = 100; // ĐŁĐĽĐµĐ˝ŃŚŃĐµĐ˝ Đ¸Đ˝Ń‚ĐµŃ€Đ˛Đ°Đ» ĐĽĐµĐ¶Đ´Ń ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ°ĐĽĐ¸
        const totalWidth = (this.shopUnits.length * cardSpacing) - (cardSpacing - cardWidth);
        const startX = (screenWidth - totalWidth) / 2;
        return { startX, cardSpacing, cardWidth };
    }

    /**
     * ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµŃ‚ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń Đ¸ Đ˛ŃĐµ ŃĐ˛ŃŹĐ·Đ°Đ˝Đ˝Ń‹Đµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
     */
    hideShop() {
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        this.shopCards.forEach(cardData => {
            if (cardData) {
                if (cardData.card && cardData.card.setVisible) cardData.card.setVisible(false);
                if (cardData.nameText && cardData.nameText.setVisible) cardData.nameText.setVisible(false);
                if (cardData.costText && cardData.costText.setVisible) cardData.costText.setVisible(false);
                if (cardData.icon && cardData.icon.setVisible) cardData.icon.setVisible(false);
                if (cardData.border && cardData.border.setVisible) cardData.border.setVisible(false);
                if (cardData.specialIcon && cardData.specialIcon.setVisible) cardData.specialIcon.setVisible(false);
                if (cardData.abilityIndicator && cardData.abilityIndicator.setVisible) cardData.abilityIndicator.setVisible(false);
            }
        });
        
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐşĐ˝ĐľĐżĐşŃ Ń€ĐµŃ€ĐľĐ»Đ»Đ°
        if (this.rerollButton && this.rerollButton.setVisible) this.rerollButton.setVisible(false);
        if (this.rerollText && this.rerollText.setVisible) this.rerollText.setVisible(false);
        if (this.rerollCostText && this.rerollCostText.setVisible) this.rerollCostText.setVisible(false);
        
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐşĐ˝ĐľĐżĐşŃ FIGHT
        if (this.fightButton && this.fightButton.setVisible) this.fightButton.setVisible(false);
    }

    /**
     * ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµŃ‚ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń Đ¸ Đ˛ŃĐµ ŃĐ˛ŃŹĐ·Đ°Đ˝Đ˝Ń‹Đµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
     */
    showShop() {
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        this.shopCards.forEach(cardData => {
            if (cardData) {
                if (cardData.card && cardData.card.setVisible) cardData.card.setVisible(true);
                if (cardData.nameText && cardData.nameText.setVisible) cardData.nameText.setVisible(true);
                if (cardData.costText && cardData.costText.setVisible) cardData.costText.setVisible(true);
                if (cardData.icon && cardData.icon.setVisible) cardData.icon.setVisible(true);
                if (cardData.border && cardData.border.setVisible) cardData.border.setVisible(true);
                if (cardData.specialIcon && cardData.specialIcon.setVisible) cardData.specialIcon.setVisible(true);
                if (cardData.abilityIndicator && cardData.abilityIndicator.setVisible) cardData.abilityIndicator.setVisible(true);
            }
        });
        
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ ĐşĐ˝ĐľĐżĐşŃ Ń€ĐµŃ€ĐľĐ»Đ»Đ°
        if (this.rerollButton && this.rerollButton.setVisible) this.rerollButton.setVisible(true);
        if (this.rerollText && this.rerollText.setVisible) this.rerollText.setVisible(true);
        if (this.rerollCostText && this.rerollCostText.setVisible) this.rerollCostText.setVisible(true);
        
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ ĐşĐ˝ĐľĐżĐşŃ FIGHT
        if (this.fightButton && this.fightButton.setVisible) this.fightButton.setVisible(true);
    }

    /**
     * ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµŃ‚ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ Đ˛ĐĽĐµŃŃ‚Đľ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
     */
    showSellArea(unit) {
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń ĐżŃ€Đ¸ ĐżĐľĐşĐ°Đ·Đµ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        this.hideShop();
        
        // Đ Đ°ŃŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ĐľĐ±Đ»Đ°ŃŃ‚Đ¸ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ Đ˝Đ° ĐľŃĐ˝ĐľĐ˛Đµ Ń€Đ°Đ·ĐĽĐµŃ€Đ° ĐżĐľĐ»ŃŹ
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 300; // 300 ĐżĐ¸ĐşŃĐµĐ»ĐµĐą ĐľŃ‚ŃŃ‚ŃĐż ĐľŃ‚ ĐżĐľĐ»ŃŹ
        
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ Đ˛ŃĐµ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        this.shopCards.forEach(cardData => {
            if (cardData) {
                cardData.card.destroy();
                if (cardData.icon) cardData.icon.destroy();
                if (cardData.border) cardData.border.destroy();
                if (cardData.nameText) cardData.nameText.destroy();
                if (cardData.costText) cardData.costText.destroy();
                if (cardData.specialIcon) cardData.specialIcon.destroy();
                if (cardData.abilityIndicator) cardData.abilityIndicator.destroy();
            }
        });
        this.shopCards = [];

        // Đ Đ°ŃŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ Ń†ĐµĐ˝Ń ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        // Đ•ŃĐ»Đ¸ ĐżĐµŃ€ĐµĐ´Đ°Đ˝ ĐľĐ±ŃŠĐµĐşŃ‚ ŃŽĐ˝Đ¸Ń‚Đ°, Đ¸ŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ ĐµĐłĐľ ĐĽĐµŃ‚ĐľĐ´, Đ¸Đ˝Đ°Ń‡Đµ Đ±ĐµŃ€ĐµĐĽ Đ¸Đ· unitData
        let sellPrice;
        if (unit && unit.getSellPrice) {
            sellPrice = unit.getSellPrice();
        } else if (unit && unit.sellPrice !== undefined) {
            // unit - ŃŤŃ‚Đľ unitData
            sellPrice = unit.sellPrice;
        } else {
            sellPrice = 0;
        }
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ±ĐľĐ»ŃŚŃŃŃŽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        const sellRect = this.add.rectangle(
            this.cameras.main.centerX, shopY - 20,
            300, 80,
            0xFF4444, 0.8
        );
        sellRect.setStrokeStyle(3, 0xFF0000);
        sellRect.setDepth(100);
        
        // Đ˘ĐµĐşŃŃ‚ "ĐźĐ ĐžĐ”ĐĐ˘Đ¬"
        const sellText = this.add.text(
            this.cameras.main.centerX, shopY - 40,
            'ĐźĐ ĐžĐ”ĐĐ˘Đ¬',
            {
                fontSize: '24px',
                fill: '#FFFFFF',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        sellText.setDepth(101);
        
        // Đ¦ĐµĐ˝Đ° ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        const priceText = this.add.text(
            this.cameras.main.centerX, shopY,
            `${sellPrice} ĐĽĐľĐ˝ĐµŃ‚`,
            {
                fontSize: '18px',
                fill: '#FFD700',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        priceText.setDepth(101);
        
        // Đ”ĐµĐ»Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ Đ¸Đ˝Ń‚ĐµŃ€Đ°ĐşŃ‚Đ¸Đ˛Đ˝ĐľĐą Đ´Đ»ŃŹ drop
        sellRect.setInteractive();
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ ŃŃŃ‹Đ»ĐşĐ¸ Đ˝Đ° ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
        this.sellArea = {
            rect: sellRect,
            text: sellText,
            priceText: priceText
        };
        
        console.log(`ĐžĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ ĐżĐľĐşĐ°Đ·Đ°Đ˝Đ°. Đ¦ĐµĐ˝Đ°: ${sellPrice} ĐĽĐľĐ˝ĐµŃ‚`);
    }

    /**
     * ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµŃ‚ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ Đ¸ Đ˛ĐľŃŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµŃ‚ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝
     */
    hideSellArea() {
        if (this.sellArea) {
            this.sellArea.rect.destroy();
            this.sellArea.text.destroy();
            this.sellArea.priceText.destroy();
            this.sellArea = null;
        }
        
        // Đ’ĐľŃŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 250;
        const { startX, cardSpacing, cardWidth } = this.calculateShopPositions();
        this.createShopCards(shopY, startX, cardSpacing, cardWidth);
        
        // Đ’ĐľŃŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ ĐşĐ˝ĐľĐżĐşŃ Fight Đ¸ Đ´Ń€ŃĐłĐ¸Đµ UI ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
        this.showShop();
        
        console.log('ĐžĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ ŃĐşŃ€Ń‹Ń‚Đ°, ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝ Đ˛ĐľŃŃŃ‚Đ°Đ˝ĐľĐ˛Đ»ĐµĐ˝');
    }

    generateShopUnits() {
        const { UNIT_TYPES } = window.gameConfig;
        const unitTypes = Object.keys(UNIT_TYPES);
        
        this.shopUnits = [];
        for (let i = 0; i < 4; i++) { // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝Đľ Ń 3 Đ´Đľ 4
            const randomType = Phaser.Utils.Array.GetRandom(unitTypes);
            this.shopUnits.push(randomType);
        }
        
        console.log('ĐˇĐłĐµĐ˝ĐµŃ€Đ¸Ń€ĐľĐ˛Đ°Đ˝Ń‹ ŃŽĐ˝Đ¸Ń‚Ń‹ Đ˛ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đµ:', this.shopUnits);
    }

    createShopCards(shopY, startX, cardSpacing, cardWidth) {
        const { UNIT_TYPES } = window.gameConfig;
        
        // ĐžŃ‡Đ¸Ń‰Đ°ĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ Đ¸ Đ˛ŃĐµ Đ¸Ń… ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
        this.shopCards.forEach(cardData => {
            if (cardData) {
                // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ Đ˛ŃĐµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸
                if (cardData.card && cardData.card.destroy) cardData.card.destroy();
                if (cardData.icon && cardData.icon.destroy) cardData.icon.destroy();
                if (cardData.border && cardData.border.destroy) cardData.border.destroy();
                if (cardData.nameText && cardData.nameText.destroy) cardData.nameText.destroy();
                if (cardData.costText && cardData.costText.destroy) cardData.costText.destroy();
                if (cardData.specialIcon && cardData.specialIcon.destroy) cardData.specialIcon.destroy();
                if (cardData.abilityIndicator && cardData.abilityIndicator.destroy) cardData.abilityIndicator.destroy();
            }
        });
        this.shopCards = [];
        
        this.shopUnits.forEach((type, index) => {
            const unitData = UNIT_TYPES[type];
            const x = startX + (index * cardSpacing);
            
            // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ĐľŃĐ˝ĐľĐ˛Đ˝ŃŃŽ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşŃ
            const card = this.add.rectangle(x, shopY, cardWidth, 100, unitData.color)
                .setInteractive({ draggable: true })
                .on('pointerdown', () => {
                    this.selectUnit(type, index);
                })
                .on('dragstart', (pointer, dragX, dragY) => {
                    this.onDragStart(type, index, pointer);
                })
                .on('drag', (pointer, dragX, dragY) => {
                    this.onDrag(pointer, dragX, dragY);
                })
                .on('dragend', (pointer) => {
                    this.onDragEnd(pointer, type, index);
                });

            // ĐĐşĐľĐ˝ĐşĐ¸ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ - ŃĐľĐľŃ‚Đ˛ĐµŃ‚ŃŃ‚Đ˛ŃŃŽŃ‚ Ń€ĐµĐ°Đ»ŃŚĐ˝Ń‹ĐĽ Ń€Đ°Đ·ĐĽĐµŃ€Đ°ĐĽ
            const iconScale = 0.6;
            const iconSize = this.gridSystem.cellSize * iconScale;
            const iconWidth = iconSize * unitData.size.width;
            const iconHeight = iconSize * unitData.size.height;
            
            // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ¸ĐşĐľĐ˝ĐşŃ ŃŽĐ˝Đ¸Ń‚Đ°
            let icon, border, specialIcon;
            
            if (type === 'ARCHER') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
            } else if (type === 'WARRIOR') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
            } else if (type === 'BARBARIAN') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
            } else if (type === 'HEALER') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, '+', {
                    fontSize: '12px',
                    fill: '#ffffff',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            } else if (type === 'MAGE') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.star(x, shopY - 20, 3, 6, 3, 0xFFD700);
            } else if (type === 'TANK') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.rectangle(x, shopY - 20, iconWidth - 4, iconHeight - 4, 0xC0C0C0, 0.3);
            } else if (type === 'ASSASSIN') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, '!', {
                    fontSize: '14px',
                    fill: '#FFD700',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            } else if (type === 'DRUID') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, 'â™ ', {
                    fontSize: '12px',
                    fill: '#00FF00',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            } else if (type === 'WITCH') {
                icon = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, unitData.color);
                border = this.add.rectangle(x, shopY - 20, iconWidth, iconHeight, 0x000000, 0).setStrokeStyle(1, 0x333333);
                specialIcon = this.add.text(x, shopY - 20, 'â ', {
                    fontSize: '12px',
                    fill: '#FF00FF',
                    fontStyle: 'bold'
                }).setOrigin(0.5);
            }

            // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Ń‚ĐµĐşŃŃ‚Ń‹
            const nameText = this.add.text(x, shopY + 25, unitData.name, {
                fontSize: '16px',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            const costText = this.add.text(x, shopY + 45, 'Đ‘Đ•ĐˇĐźĐ›ĐĐ˘ĐťĐž', {
                fontSize: '12px',
                fill: '#00FF00'
            }).setOrigin(0.5);
            
            // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ¸Đ˝Đ´Đ¸ĐşĐ°Ń‚ĐľŃ€ ŃĐżĐľŃĐľĐ±Đ˝ĐľŃŃ‚Đ¸
            let abilityIndicator = null;
            if (unitData.hasTaunt) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xFF0000);
            } else if (unitData.hasBattleCry) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xFFD700);
            } else if (unitData.healAmount) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x00FF00);
            } else if (unitData.maxTargets) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x9B4AE2);
            } else if (unitData.hasShield) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xC0C0C0);
            } else if (unitData.hasCritical) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0xFFD700);
            } else if (unitData.hasThorns) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x8B4513);
            } else if (unitData.hasCurse) {
                abilityIndicator = this.add.circle(x + iconWidth/2 - 5, shopY - 20 - iconHeight/2 + 5, 3, 0x4B0082);
            }
            
            // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ˛ŃĐµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸ Đ´Đ»ŃŹ ĐżĐľŃĐ»ĐµĐ´ŃŃŽŃ‰ĐµĐłĐľ ŃĐ´Đ°Đ»ĐµĐ˝Đ¸ŃŹ
            this.shopCards.push({
                card: card,
                icon: icon,
                border: border,
                nameText: nameText,
                costText: costText,
                specialIcon: specialIcon,
                abilityIndicator: abilityIndicator
            });
        });
    }

    createRerollButton(shopY, startX, cardSpacing) {
        // ĐźĐľĐ·Đ¸Ń†Đ¸ĐľĐ˝Đ¸Ń€ŃĐµĐĽ ĐşĐ˝ĐľĐżĐşŃ REROLL ŃĐżŃ€Đ°Đ˛Đ° ĐľŃ‚ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐµĐş
        const rerollX = startX + (this.shopUnits.length * cardSpacing) + 20;
        
        const rerollButton = this.add.rectangle(rerollX, shopY, 60, 40, 0x666666)
            .setInteractive()
            .on('pointerdown', () => {
                this.rerollShop();
            });
            
        this.add.text(rerollX, shopY, 'REROLL\n5 ĐĽĐľĐ˝ĐµŃ‚', {
            fontSize: '10px',
            fill: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);
        
        this.rerollButton = rerollButton;
    }

    createRoundDisplay() {
        // Đ¦ĐµĐ˝Ń‚Ń€Đ¸Ń€ŃĐµĐĽ Ń‚ĐµĐşŃŃ‚ Ń€Đ°ŃĐ˝Đ´Đ° ĐżĐľ ŃĐ¸Ń€Đ¸Đ˝Đµ ŃŤĐşŃ€Đ°Đ˝Đ°
        const screenWidth = this.cameras.main.width;
        this.roundText = this.add.text(screenWidth / 2, 30, `Đ ĐĐŁĐťĐ” ${this.currentRound}/${this.maxRounds}`, {
            fontSize: '24px',
            fill: '#FFD700',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: { x: 15, y: 8 }
        }).setOrigin(0.5);
        
        // ĐžŃ‚ĐľĐ±Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚ĐľĐ˛ ĐżŃ€ĐµĐ´Ń‹Đ´ŃŃ‰Đ¸Ń… Ń€Đ°ŃĐ˝Đ´ĐľĐ˛
        this.updateRoundResults();
    }

    updateRoundResults() {
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŃ‚Đ°Ń€Ń‹Đµ Ń‚ĐµĐşŃŃ‚Ń‹ Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚ĐľĐ˛
        if (this.resultsText) {
            this.resultsText.destroy();
        }
        
        if (this.roundResults.length > 0) {
            // ĐźĐľĐ´ŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ ŃŃ‡ĐµŃ‚
            const playerWins = this.roundResults.filter(result => result).length;
            const enemyWins = this.roundResults.length - playerWins;
            
            let resultsText = `ĐˇŃ‡ĐµŃ‚: ${playerWins}-${enemyWins} | `;
            this.roundResults.forEach((result, index) => {
                resultsText += result ? 'Đ’' : 'Đź'; // Đ’ = ĐźĐľĐ±ĐµĐ´Đ°, Đź = ĐźĐľŃ€Đ°Đ¶ĐµĐ˝Đ¸Đµ
                if (index < this.roundResults.length - 1) resultsText += '-';
            });
            
            this.resultsText = this.add.text(240, 60, resultsText, {
                fontSize: '14px',
                fill: '#FFFFFF',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }
    }

    rerollShop() {
        if (this.economySystem.canAfford(5)) {
            this.economySystem.spendCoins(5);
            this.updateCoinsDisplay();
            this.generateShopUnits();
            const { GRID_HEIGHT } = window.gameConfig;
            const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
            const shopY = fieldHeight + 250;
            const { startX, cardSpacing } = this.calculateShopPositions();
            this.createShopCards(shopY, startX, cardSpacing);
            console.log('ĐśĐ°ĐłĐ°Đ·Đ¸Đ˝ ĐľĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝ Đ·Đ° 5 ĐĽĐľĐ˝ĐµŃ‚');
        } else {
            console.log('ĐťĐµĐ´ĐľŃŃ‚Đ°Ń‚ĐľŃ‡Đ˝Đľ ĐĽĐľĐ˝ĐµŃ‚ Đ´Đ»ŃŹ Ń€ĐµŃ€ĐľĐ»Đ»Đ°!');
        }
    }

    removeCardFromShop(cardIndex) {
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐşĐľĐ˝ĐşŃ€ĐµŃ‚Đ˝ŃŃŽ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşŃ Đ¸ Đ˛ŃĐµ ĐµĐµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹
        if (cardIndex >= 0 && cardIndex < this.shopCards.length) {
            const cardData = this.shopCards[cardIndex];
            
            // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ Đ˛ŃĐµ ŃŤĐ»ĐµĐĽĐµĐ˝Ń‚Ń‹ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸
            if (cardData.card && cardData.card.destroy) cardData.card.destroy();
            if (cardData.icon && cardData.icon.destroy) cardData.icon.destroy();
            if (cardData.border && cardData.border.destroy) cardData.border.destroy();
            if (cardData.nameText && cardData.nameText.destroy) cardData.nameText.destroy();
            if (cardData.costText && cardData.costText.destroy) cardData.costText.destroy();
            if (cardData.specialIcon && cardData.specialIcon.destroy) cardData.specialIcon.destroy();
            if (cardData.abilityIndicator && cardData.abilityIndicator.destroy) cardData.abilityIndicator.destroy();
            
            this.shopCards.splice(cardIndex, 1);
            
            // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŽĐ˝Đ¸Ń‚ Đ¸Đ· ĐĽĐ°ŃŃĐ¸Đ˛Đ° Ń‚ĐľĐ»ŃŚĐşĐľ ĐµŃĐ»Đ¸ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ° Đ±Ń‹Đ»Đ° Đ˝Đ°ĐąĐ´ĐµĐ˝Đ°
            this.shopUnits.splice(cardIndex, 1);
        }
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ Đ¸Đ˝Đ´ĐµĐşŃŃ‹ ĐľŃŃ‚Đ°Đ˛ŃĐ¸Ń…ŃŃŹ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐµĐş
        this.shopCards.forEach((cardData, index) => {
            if (cardData.card) {
                cardData.card.off('pointerdown');
                cardData.card.on('pointerdown', () => {
                    this.selectUnit(this.shopUnits[index], index);
                });
            }
        });
        
        console.log('ĐšĐ°Ń€Ń‚ĐľŃ‡ĐşĐ° ŃĐ´Đ°Đ»ĐµĐ˝Đ° Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°, Đ¸Đ˝Đ´ĐµĐşŃ:', cardIndex);
    }

    selectUnit(unitType, cardIndex = null) {
        if (this.isBattleActive) {
            console.log('Đ‘ĐľĐą Đ°ĐşŃ‚Đ¸Đ˛ĐµĐ˝, Đ˝ĐµĐ»ŃŚĐ·ŃŹ ĐżĐľĐşŃĐżĐ°Ń‚ŃŚ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛');
            return;
        }
        
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        console.log('Đ’Ń‹Đ±Ń€Đ°Đ˝ ŃŽĐ˝Đ¸Ń‚:', unitData.name, 'Đ¦ĐµĐ˝Đ°:', unitData.cost, 'ĐśĐľĐ˝ĐµŃ‚:', this.economySystem.getCoins());
        
        // Đ®Đ˝Đ¸Ń‚Ń‹ Ń‚ĐµĐżĐµŃ€ŃŚ Đ±ĐµŃĐżĐ»Đ°Ń‚Đ˝Ń‹Đµ
        this.selectedUnitType = unitType;
        this.selectedUnitData = unitData;
        this.selectedCardIndex = cardIndex; // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Đ¸Đ˝Đ´ĐµĐşŃ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşĐ¸
        
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ ĐżĐľĐ´ŃĐşĐ°Đ·ĐşŃ
        if (this.hintText) {
            this.hintText.destroy();
        }
        this.hintText = this.add.text(240, 120, 'ĐšĐ»Đ¸ĐşĐ˝Đ¸Ń‚Đµ Đ˝Đ° ĐťĐĐ–ĐťĐ®Đ® ĐżĐľĐ»ĐľĐ˛Đ¸Đ˝Ń ĐżĐľĐ»ŃŹ', {
            fontSize: '14px',
            fill: '#FFD700',
            fontStyle: 'bold',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5);
        
        console.log('Đ®Đ˝Đ¸Ń‚ Đ˛Ń‹Đ±Ń€Đ°Đ˝, ĐľĐ¶Đ¸Đ´Đ°ĐµĐĽ ĐşĐ»Đ¸Đş ĐżĐľ ĐżĐľĐ»ŃŽ');
        
        // ĐťĐ• Đ°ĐşŃ‚Đ¸Đ˛Đ¸Ń€ŃĐµĐĽ Ń€ĐµĐ¶Đ¸ĐĽ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ ŃŃ€Đ°Đ·Ń - Đ¶Đ´ĐµĐĽ ĐşĐ»Đ¸Đş ĐżĐľ ĐżĐľĐ»ŃŽ
    }


    /**
     * ĐžĐ±Ń€Đ°Đ±ĐľŃ‚Ń‡Đ¸Đş ĐşĐ»Đ¸ĐşĐľĐ˛ ĐżĐľ ĐżĐľĐ»ŃŽ Đ´Đ»ŃŹ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
     */
    handleFieldClick(pointer) {
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ Đ˛Ń‹Đ±Ń€Đ°Đ˝ ŃŽĐ˝Đ¸Ń‚ Đ¸ ĐşĐ»Đ¸Đş Đ˝Đµ ĐżĐľ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Ń
        if (!this.selectedUnitType || pointer.y > 700) {
            return;
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ Đ˝Đµ Đ¸Đ´ĐµŃ‚ Đ±ĐľĐą
        if (this.isBattleActive) {
            console.log('Đ‘ĐľĐą Đ°ĐşŃ‚Đ¸Đ˛ĐµĐ˝, Đ˝ĐµĐ»ŃŚĐ·ŃŹ Ń€Đ°Đ·ĐĽĐµŃ‰Đ°Ń‚ŃŚ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛');
            return;
        }
        
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐżĐľĐ´ŃĐşĐ°Đ·ĐşŃ
        if (this.hintText) {
            this.hintText.destroy();
            this.hintText = null;
        }
        
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        console.log('ĐšĐ»Đ¸Đş ĐżĐľ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸:', pointer.x, pointer.y, '-> ŃĐµŃ‚ĐşĐ°:', gridPos);
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛ĐľĐ·ĐĽĐľĐ¶Đ˝ĐľŃŃ‚ŃŚ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ Đ¸Đ»Đ¸ ĐĽĐµŃ€Đ´Đ¶Đ°
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridPos.x, 
            gridPos.y, 
            this.selectedUnitData.size, 
            this.selectedUnitType, 
            false // Đ˝Đµ Đ˛Ń€Đ°Đł
        );
        
        if (placementResult.canPlace) {
            if (placementResult.isMerge) {
                // ĐśĐ•Đ Đ”Đ–
                console.log('ĐśĐµŃ€Đ´Đ¶ ŃŽĐ˝Đ¸Ń‚Đ°!', this.selectedUnitType);
                const success = placementResult.existingUnit.merge(this.selectedUnitType);
                
                if (success) {
                    // Đ®Đ˝Đ¸Ń‚Ń‹ Đ±ĐµŃĐżĐ»Đ°Ń‚Đ˝Ń‹Đµ - Đ˝Đµ Ń‚Ń€Đ°Ń‚Đ¸ĐĽ ĐĽĐľĐ˝ĐµŃ‚Ń‹
                    this.updateCoinsDisplay();
                    
                    // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşŃ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
                    if (this.selectedCardIndex !== null) {
                        this.removeCardFromShop(this.selectedCardIndex);
                    }
                    
                    this.selectedUnitType = null;
                    this.selectedUnitData = null;
                    this.selectedCardIndex = null;
                } else {
                    console.log('ĐśĐµŃ€Đ´Đ¶ Đ˝Đµ ŃĐ´Đ°Đ»ŃŃŹ. ĐźĐľĐżŃ€ĐľĐ±ŃĐąŃ‚Đµ ĐµŃ‰Đµ Ń€Đ°Đ·.');
                }
            } else {
                // ĐžĐ‘Đ«Đ§ĐťĐžĐ• Đ ĐĐ—ĐśĐ•Đ©Đ•ĐťĐĐ•
                console.log('Đ Đ°Đ·ĐĽĐµŃ‰Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚ Đ˛ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸:', gridPos);
                this.placeUnit(this.selectedUnitType, gridPos.x, gridPos.y);
                // Đ®Đ˝Đ¸Ń‚Ń‹ Đ±ĐµŃĐżĐ»Đ°Ń‚Đ˝Ń‹Đµ - Đ˝Đµ Ń‚Ń€Đ°Ń‚Đ¸ĐĽ ĐĽĐľĐ˝ĐµŃ‚Ń‹
                this.updateCoinsDisplay();
                
                // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐşĐ°Ń€Ń‚ĐľŃ‡ĐşŃ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ° ĐżĐľŃĐ»Đµ ŃŃĐżĐµŃĐ˝ĐľĐą ĐżĐľĐşŃĐżĐşĐ¸
                if (this.selectedCardIndex !== null) {
                    this.removeCardFromShop(this.selectedCardIndex);
                }
                
                this.selectedUnitType = null;
                this.selectedUnitData = null;
                this.selectedCardIndex = null;
            }
        } else {
            console.log('ĐťĐµĐ»ŃŚĐ·ŃŹ Ń€Đ°Đ·ĐĽĐµŃŃ‚Đ¸Ń‚ŃŚ Đ˛ ŃŤŃ‚ĐľĐą ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸. ĐźĐľĐżŃ€ĐľĐ±ŃĐąŃ‚Đµ ĐµŃ‰Đµ Ń€Đ°Đ·.');
        }
    }

    placeUnit(unitType, gridX, gridY) {
        let unit;
        
        switch (unitType) {
            case 'ARCHER':
                unit = new Archer(this, gridX, gridY);
                break;
            case 'WARRIOR':
                unit = new Warrior(this, gridX, gridY);
                break;
            case 'BARBARIAN':
                unit = new Barbarian(this, gridX, gridY);
                break;
            case 'HEALER':
                unit = new Healer(this, gridX, gridY);
                break;
            case 'MAGE':
                unit = new Mage(this, gridX, gridY);
                break;
            case 'TANK':
                unit = new Tank(this, gridX, gridY);
                break;
            case 'ASSASSIN':
                unit = new Assassin(this, gridX, gridY);
                break;
            case 'DRUID':
                unit = new Druid(this, gridX, gridY);
                break;
            case 'WITCH':
                unit = new Witch(this, gridX, gridY);
                break;
        }
        
        if (unit) {
            this.playerUnits.push(unit);
            this.gridSystem.placeUnit(gridX, gridY, unit);
        }
    }

    startBattle() {
        console.log('=== ĐťĐĐ§ĐĐ›Đž Đ‘ĐžĐŻ ===');
        console.log('Đ‘ĐľĐą ŃĐ¶Đµ Đ°ĐşŃ‚Đ¸Đ˛ĐµĐ˝?', this.isBattleActive);
        console.log('Đ®Đ˝Đ¸Ń‚ĐľĐ˛ Đ¸ĐłŃ€ĐľĐşĐ°:', this.playerUnits.length);
        
        if (this.isBattleActive) {
            console.log('Đ‘ĐľĐą ŃĐ¶Đµ Đ¸Đ´ĐµŃ‚!');
            return;
        }
        
        if (this.playerUnits.length === 0) {
            console.log('ĐťĐµŃ‚ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ´Đ»ŃŹ Đ±ĐľŃŹ!');
            return;
        }
        
        this.isBattleActive = true;
        this.fightButton.setFillStyle(0x666666);
        this.fightButton.disableInteractive();
        
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń Đ¸ ĐşĐ˝ĐľĐżĐşĐ¸ Đ˛Đľ Đ˛Ń€ĐµĐĽŃŹ Đ±ĐľŃŹ
        this.hideShop();
        
        console.log('ĐˇĐżĐ°Đ˛Đ˝Đ¸ĐĽ Đ˛Ń€Đ°ĐłĐľĐ˛...');
        this.spawnEnemies();
        
        console.log('Đ—Đ°ĐżŃŃĐşĐ°ĐµĐĽ Đ±ĐľĐµĐ˛ŃŃŽ ŃĐ¸ŃŃ‚ĐµĐĽŃ...');
        console.log('Đ®Đ˝Đ¸Ń‚ĐľĐ˛ Đ¸ĐłŃ€ĐľĐşĐ°:', this.playerUnits.length);
        console.log('Đ®Đ˝Đ¸Ń‚ĐľĐ˛ Đ˛Ń€Đ°ĐłĐ°:', this.enemyUnits.length);
        
        this.battleSystem.startBattle(this.playerUnits, this.enemyUnits);
        
        console.log('Đ‘ĐľĐą Đ˝Đ°Ń‡Đ°Ń‚!');
    }

    spawnEnemies() {
        const { GRID_WIDTH, ENEMY_AREA_HEIGHT, UNIT_TYPES, STARTING_COINS, ROUND_COINS } = window.gameConfig;
        
        // Đ’Ń€Đ°Đł ĐżĐľĐ»ŃŃ‡Đ°ĐµŃ‚ Ń‚Đ°ĐşĐľĐą Đ¶Đµ Đ±ŃŽĐ´Đ¶ĐµŃ‚, ĐşĐ°Đş Ń Đ¸ĐłŃ€ĐľĐşĐ° Đ˛ Ń‚ĐµĐşŃŃ‰ĐµĐĽ Ń€Đ°ŃĐ˝Đ´Đµ
        let enemyBudget = this.currentRound === 1 ? STARTING_COINS : ROUND_COINS;
        
        console.log('=== ĐˇĐźĐĐ’Đť Đ’Đ ĐĐ“ĐžĐ’ ===');
        console.log('Đ‘ŃŽĐ´Đ¶ĐµŃ‚ Đ˛Ń€Đ°ĐłĐ°:', enemyBudget, 'ĐĽĐľĐ˝ĐµŃ‚ (ĐşĐ°Đş Ń Đ¸ĐłŃ€ĐľĐşĐ° Đ˛ Ń€Đ°ŃĐ˝Đ´Đµ', this.currentRound, ')');
        
        // Đ˘Đ¸ĐżŃ‹ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛, ĐşĐľŃ‚ĐľŃ€Ń‹Đµ Đ˛Ń€Đ°Đł ĐĽĐľĐ¶ĐµŃ‚ ĐşŃĐżĐ¸Ń‚ŃŚ (ĐľŃ‚ Đ´ĐµŃĐµĐ˛Ń‹Ń… Đş Đ´ĐľŃ€ĐľĐłĐ¸ĐĽ)
        const unitTypes = [
            { type: 'ARCHER', data: UNIT_TYPES.ARCHER },
            { type: 'WARRIOR', data: UNIT_TYPES.WARRIOR },
            { type: 'HEALER', data: UNIT_TYPES.HEALER },
            { type: 'BARBARIAN', data: UNIT_TYPES.BARBARIAN },
            { type: 'MAGE', data: UNIT_TYPES.MAGE },
            { type: 'TANK', data: UNIT_TYPES.TANK },
            { type: 'ASSASSIN', data: UNIT_TYPES.ASSASSIN },
            { type: 'DRUID', data: UNIT_TYPES.DRUID },
            { type: 'WITCH', data: UNIT_TYPES.WITCH }
        ];
        
        // Đ’Ń€Đ°Đł ĐżĐľĐşŃĐżĐ°ĐµŃ‚ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛, ĐżĐľĐşĐ° ĐµŃŃ‚ŃŚ Đ´ĐµĐ˝ŃŚĐłĐ¸
        while (enemyBudget > 0) {
            // Đ’Ń‹Đ±Đ¸Ń€Đ°ĐµĐĽ ŃĐ»ŃŃ‡Đ°ĐąĐ˝Ń‹Đą Ń‚Đ¸Đż ŃŽĐ˝Đ¸Ń‚Đ°, ĐşĐľŃ‚ĐľŃ€Ń‹Đą Đ˛Ń€Đ°Đł ĐĽĐľĐ¶ĐµŃ‚ ĐşŃĐżĐ¸Ń‚ŃŚ
            const affordable = unitTypes.filter(u => u.data.cost <= enemyBudget);
            
            if (affordable.length === 0) {
                console.log('Đ’Ń€Đ°ĐłŃ Đ˝Đµ Ń…Đ˛Đ°Ń‚Đ°ĐµŃ‚ Đ´ĐµĐ˝ĐµĐł Đ˝Đ° ŃŽĐ˝Đ¸Ń‚ĐľĐ˛. ĐžŃŃ‚Đ°Ń‚ĐľĐş:', enemyBudget);
                break;
            }
            
            // ĐˇĐ»ŃŃ‡Đ°ĐąĐ˝Đľ Đ˛Ń‹Đ±Đ¸Ń€Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚Đ°
            const selected = Phaser.Utils.Array.GetRandom(affordable);
            
            // ĐŃ‰ĐµĐĽ ŃĐ˛ĐľĐ±ĐľĐ´Đ˝ĐľĐµ ĐĽĐµŃŃ‚Đľ
            let placed = false;
            let attempts = 0;
            
            while (!placed && attempts < 50) {
                const x = Phaser.Math.Between(0, GRID_WIDTH - selected.data.size.width);
                const y = Phaser.Math.Between(0, ENEMY_AREA_HEIGHT - selected.data.size.height);
                
                if (this.gridSystem.canPlaceEnemyUnit(x, y, selected.data.size)) {
                    // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ˛Ń€Đ°ĐłĐ°
                    let enemy;
                    switch (selected.type) {
                        case 'ARCHER':
                            enemy = new Archer(this, x, y, true);
                            break;
                        case 'WARRIOR':
                            enemy = new Warrior(this, x, y, true);
                            break;
                        case 'HEALER':
                            enemy = new Healer(this, x, y, true);
                            break;
                        case 'BARBARIAN':
                            enemy = new Barbarian(this, x, y, true);
                            break;
                        case 'MAGE':
                            enemy = new Mage(this, x, y, true);
                            break;
                        case 'TANK':
                            enemy = new Tank(this, x, y, true);
                            break;
                        case 'ASSASSIN':
                            enemy = new Assassin(this, x, y, true);
                            break;
                        case 'DRUID':
                            enemy = new Druid(this, x, y, true);
                            break;
                        case 'WITCH':
                            enemy = new Witch(this, x, y, true);
                            break;
                    }
                    
                    if (enemy) {
                        this.enemyUnits.push(enemy);
                        this.gridSystem.placeUnit(x, y, enemy);
                        enemyBudget -= selected.data.cost;
                        placed = true;
                        
                        // ĐˇĐ»ŃŃ‡Đ°ĐąĐ˝Ń‹Đą ĐĽĐµŃ€Đ´Đ¶ Đ´Đ»ŃŹ Đ˛Ń€Đ°ĐłĐ° (30% ŃĐ°Đ˝Ń)
                        if (Math.random() < 0.3 && enemy.mergeLevel < 3) {
                            const mergeCount = Math.floor(Math.random() * (3 - enemy.mergeLevel)) + 1;
                            const mergeCost = mergeCount * selected.data.cost;
                            
                            if (enemyBudget >= mergeCost) {
                                for (let i = 0; i < mergeCount; i++) {
                                    enemy.merge(selected.type);
                                }
                                enemyBudget -= mergeCost;
                                console.log(`Đ’Ń€Đ°Đł ĐĽĐµŃ€Đ´Đ¶Đ˝ŃĐ» ${selected.data.name} ${mergeCount} Ń€Đ°Đ·! ĐŁŃ€ĐľĐ˛ĐµĐ˝ŃŚ: ${enemy.mergeLevel}`);
                            }
                        }
                        
                        console.log(`Đ’Ń€Đ°Đł ĐşŃĐżĐ¸Đ» ${selected.data.name} Đ·Đ° ${selected.data.cost} ĐĽĐľĐ˝ĐµŃ‚. ĐžŃŃ‚Đ°Ń‚ĐľĐş: ${enemyBudget}`);
                    }
                }
                
                attempts++;
            }
            
            if (!placed) {
                console.log('ĐťĐµ ŃĐ´Đ°Đ»ĐľŃŃŚ Đ˝Đ°ĐąŃ‚Đ¸ ĐĽĐµŃŃ‚Đľ Đ´Đ»ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°. ĐźŃ€ĐµĐşŃ€Đ°Ń‰Đ°ĐµĐĽ ŃĐżĐ°Đ˛Đ˝.');
                break;
            }
        }
        
        console.log('Đ’Ń€Đ°ĐłĐľĐ˛ ŃĐľĐ·Đ´Đ°Đ˝Đľ:', this.enemyUnits.length);
    }

    updateCoinsDisplay() {
        this.coinsText.setText(`ĐśĐľĐ˝ĐµŃ‚Ń‹: ${this.economySystem.getCoins()}`);
    }

    endBattle(victory) {
        this.isBattleActive = false;
        this.fightButton.setFillStyle(0xE24A4A);
        this.fightButton.setInteractive();
        
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń Đ¸ ĐşĐ˝ĐľĐżĐşĐ¸ ĐżĐľŃĐ»Đµ ĐľĐşĐľĐ˝Ń‡Đ°Đ˝Đ¸ŃŹ Đ±ĐľŃŹ
        this.showShop();
        
        // ĐˇĐľŃ…Ń€Đ°Đ˝ŃŹĐµĐĽ Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚ Ń€Đ°ŃĐ˝Đ´Đ°
        this.roundResults.push(victory);
        console.log(`Đ Đ°ŃĐ˝Đ´ ${this.currentRound} Đ·Đ°Đ˛ĐµŃ€ŃĐµĐ˝. Đ ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚: ${victory ? 'ĐźĐľĐ±ĐµĐ´Đ°' : 'ĐźĐľŃ€Đ°Đ¶ĐµĐ˝Đ¸Đµ'}`);
        
        // ĐŁĐ±Ń€Đ°Đ˝Đľ ĐżĐľĐ´ŃŃ‡ĐµŃ‚ ŃĐ±Đ¸Ń‚Ń‹Ń… Đ˛Ń€Đ°ĐłĐľĐ˛ (Đ±ĐľĐ»ŃŚŃĐµ Đ˝Đµ Đ˝ŃĐ¶ĐµĐ˝ Đ´Đ»ŃŹ Đ±Đ°Đ»Đ°Đ˝ŃĐ°)
        
        // ĐźĐľĐ´ŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ ĐżĐľĐ±ĐµĐ´Ń‹ Đ¸ ĐżĐľŃ€Đ°Đ¶ĐµĐ˝Đ¸ŃŹ
        const playerWins = this.roundResults.filter(result => result).length;
        const enemyWins = this.roundResults.length - playerWins;
        
        console.log(`=== ĐˇĐ§Đ•Đ˘ ĐśĐĐ˘Đ§Đ ===`);
        console.log(`ĐĐłŃ€ĐľĐş: ${playerWins} | Đ’Ń€Đ°Đł: ${enemyWins}`);
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ ŃŃĐ»ĐľĐ˛Đ¸ŃŹ Đ·Đ°Đ˛ĐµŃ€ŃĐµĐ˝Đ¸ŃŹ ĐĽĐ°Ń‚Ń‡Đ° (Best of 5)
        const matchEnded = this.checkMatchEnd(playerWins, enemyWins);
        
        if (matchEnded) {
            this.endGame();
        } else if (this.currentRound >= this.maxRounds) {
            // Đ’ŃĐµ 5 Ń€Đ°ŃĐ˝Đ´ĐľĐ˛ ŃŃ‹ĐłŃ€Đ°Đ˝Ń‹ (Ń‚Đ°ĐşĐľĐµ Đ˛ĐľĐ·ĐĽĐľĐ¶Đ˝Đľ ĐżŃ€Đ¸ ŃŃ‡ĐµŃ‚Đµ 2:2 -> 3:2)
            this.endGame();
        } else {
            this.prepareNextRound();
        }
    }
    
    checkMatchEnd(playerWins, enemyWins) {
        // ĐśĐ°Ń‚Ń‡ Đ·Đ°ĐşĐ°Đ˝Ń‡Đ¸Đ˛Đ°ĐµŃ‚ŃŃŹ, ĐµŃĐ»Đ¸ ĐşŃ‚Đľ-Ń‚Đľ Đ˝Đ°Đ±Ń€Đ°Đ» 3 ĐżĐľĐ±ĐµĐ´Ń‹
        if (playerWins >= this.winsNeeded) {
            console.log(`ĐĐłŃ€ĐľĐş Đ˝Đ°Đ±Ń€Đ°Đ» ${this.winsNeeded} ĐżĐľĐ±ĐµĐ´Ń‹! ĐśĐ°Ń‚Ń‡ ĐľĐşĐľĐ˝Ń‡ĐµĐ˝.`);
            return true;
        }
        
        if (enemyWins >= this.winsNeeded) {
            console.log(`Đ’Ń€Đ°Đł Đ˝Đ°Đ±Ń€Đ°Đ» ${this.winsNeeded} ĐżĐľĐ±ĐµĐ´Ń‹! ĐśĐ°Ń‚Ń‡ ĐľĐşĐľĐ˝Ń‡ĐµĐ˝.`);
            return true;
        }
        
        return false;
    }

    prepareNextRound() {
        // Đ’ĐľŃĐşŃ€ĐµŃĐ°ĐµĐĽ Đ˛ŃĐµŃ… ŃĐ±Đ¸Ń‚Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
        this.resurrectUnits();
        
        // ĐźĐµŃ€ĐµŃ…ĐľĐ´Đ¸ĐĽ Đş ŃĐ»ĐµĐ´ŃŃŽŃ‰ĐµĐĽŃ Ń€Đ°ŃĐ˝Đ´Ń
        this.currentRound++;
        if (this.roundText) {
            this.roundText.setText(`Đ ĐĐŁĐťĐ” ${this.currentRound}/${this.maxRounds}`);
        }
        
        // Đ”Đ°ĐµĐĽ ĐĽĐľĐ˝ĐµŃ‚Ń‹ Đ·Đ° Đ˝ĐľĐ˛Ń‹Đą Ń€Đ°ŃĐ˝Đ´
        const { STARTING_COINS, ROUND_COINS } = window.gameConfig;
        const roundReward = this.currentRound === 1 ? STARTING_COINS : ROUND_COINS;
        
        this.economySystem.addCoins(roundReward);
        console.log(`=== ĐťĐĐ§ĐĐ›Đž Đ ĐĐŁĐťĐ”Đ ${this.currentRound} ===`);
        console.log(`ĐťĐ°ĐłŃ€Đ°Đ´Đ° Đ·Đ° Ń€Đ°ŃĐ˝Đ´: ${roundReward} ĐĽĐľĐ˝ĐµŃ‚`);
        console.log(`Đ˘ĐµĐşŃŃ‰Đ¸Đą Đ±Đ°Đ»Đ°Đ˝Ń: ${this.economySystem.getCoins()} ĐĽĐľĐ˝ĐµŃ‚`);
        
        this.updateCoinsDisplay();
        
        // ĐźĐµŃ€ĐµĐłĐµĐ˝ĐµŃ€Đ¸Ń€ŃĐµĐĽ ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝ Đ´Đ»ŃŹ Đ˝ĐľĐ˛ĐľĐłĐľ Ń€Đ°ŃĐ˝Đ´Đ°
        this.generateShopUnits();
        const { GRID_HEIGHT } = window.gameConfig;
        const fieldHeight = GRID_HEIGHT * this.gridSystem.cellSize;
        const shopY = fieldHeight + 250;
        const { startX, cardSpacing, cardWidth } = this.calculateShopPositions();
        this.createShopCards(shopY, startX, cardSpacing, cardWidth);
        console.log('ĐśĐ°ĐłĐ°Đ·Đ¸Đ˝ ĐżĐµŃ€ĐµĐłĐµĐ˝ĐµŃ€Đ¸Ń€ĐľĐ˛Đ°Đ˝ Đ´Đ»ŃŹ Đ˝ĐľĐ˛ĐľĐłĐľ Ń€Đ°ŃĐ˝Đ´Đ°');
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐľŃ‚ĐľĐ±Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚ĐľĐ˛
        this.updateRoundResults();
    }

    resurrectUnits() {
        console.log('=== Đ’ĐžĐˇĐšĐ Đ•Đ¨Đ•ĐťĐĐ• Đ Đ›Đ•Đ§Đ•ĐťĐĐ• Đ®ĐťĐĐ˘ĐžĐ’ ===');
        
        // Đ’ĐľŃĐşŃ€ĐµŃĐ°ĐµĐĽ Đ¸ Đ»ĐµŃ‡Đ¸ĐĽ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ¸ĐłŃ€ĐľĐşĐ°
        this.playerUnits.forEach(unit => {
            if (unit.isDead) {
                // Đ’ĐžĐˇĐšĐ Đ•Đ¨Đ•ĐťĐĐ•
                unit.isDead = false;
                unit.hp = unit.maxHp;
                
                // Đ’ĐĐ–ĐťĐž: ĐžŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ Đ˛ŃĐµ Đ°ĐşŃ‚Đ¸Đ˛Đ˝Ń‹Đµ tweens Đ˝Đ° ŃĐżŃ€Đ°ĐąŃ‚Đµ
                this.tweens.killTweensOf(unit.sprite);
                
                // Đ’ĐľŃŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ ŃĐżŃ€Đ°ĐąŃ‚
                unit.sprite.setAlpha(1);
                unit.sprite.setScale(1, 1);
                unit.sprite.setVisible(true);
                
                // ĐŃĐżŃ€Đ°Đ˛Đ»ŃŹĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ŃĐżŃ€Đ°ĐąŃ‚Đ° ĐµŃĐ»Đ¸ ŃŤŃ‚Đľ Đ¸Đ·ĐľĐ±Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ
                if (unit.sprite.setDisplaySize) {
                    const spriteWidth = unit.size.width * this.gridSystem.cellSize;
                    const spriteHeight = unit.size.height * this.gridSystem.cellSize;
                    unit.sprite.setDisplaySize(spriteWidth, spriteHeight);
                    console.log('ĐŃĐżŃ€Đ°Đ˛Đ»ŃŹĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ŃĐżŃ€Đ°ĐąŃ‚Đ° ĐżĐľŃĐ»Đµ Đ˛ĐľŃĐşŃ€ĐµŃĐµĐ˝Đ¸ŃŹ:', spriteWidth, 'x', spriteHeight);
                }
                
                // Đ”ĐµĐ»Đ°ĐµĐĽ hpBar ŃĐ˝ĐľĐ˛Đ° Đ˛Đ¸Đ´Đ¸ĐĽŃ‹ĐĽĐ¸
                if (unit.hpBar && unit.hpBar.scene) {
                    unit.hpBar.setVisible(true);
                }
                if (unit.hpBarBg && unit.hpBarBg.scene) {
                    unit.hpBarBg.setVisible(true);
                }
                
                // ĐźĐµŃ€ĐµŃĐľĐ·Đ´Đ°ĐµĐĽ hpBar ĐµŃĐ»Đ¸ ĐľĐ˝ Đ±Ń‹Đ» ŃĐ˝Đ¸Ń‡Ń‚ĐľĐ¶ĐµĐ˝
                if (!unit.hpBar || !unit.hpBar.scene) {
                    const barWidth = unit.size.width * this.gridSystem.cellSize * 0.6;
                    const barHeight = 4;
                    const barY = unit.sprite.y - (unit.size.height * this.gridSystem.cellSize * 0.4);
                    
                    unit.hpBarBg = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x333333);
                    unit.hpBar = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x00FF00);
                }
                
                // Đ—Đ°Đ˝ĐľĐ˛Đľ Ń€Đ°Đ·ĐĽĐµŃ‰Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚Đ° Đ˝Đ° ŃĐµŃ‚ĐşĐµ (Đ˛ Ń‚ĐľĐą Đ¶Đµ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸)
                this.gridSystem.placeUnit(unit.gridX, unit.gridY, unit);
                
                // ĐźĐµŃ€ĐµŃĐľĐ·Đ´Đ°ĐµĐĽ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐşĐ¸ ĐĽĐµŃ€Đ´Đ¶Đ° ĐµŃĐ»Đ¸ ĐľĐ˝Đ¸ ĐµŃŃ‚ŃŚ
                if (unit.mergeLevel > 0) {
                    unit.createMergeStars();
                }
                
                // Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ drag-and-drop ĐľĐ±Ń€Đ°Đ±ĐľŃ‚Ń‡Đ¸ĐşĐ¸ Đ·Đ°Đ˝ĐľĐ˛Đľ
                if (unit.sprite.type === 'Container') {
                    unit.sprite.setSize(unit.sprite.width || 100, unit.sprite.height || 100);
                }
                unit.sprite.setInteractive({ draggable: true })
                    .on('dragstart', (pointer) => {
                        this.onUnitDragStart(unit, pointer);
                    })
                    .on('drag', (pointer, dragX, dragY) => {
                        // ĐťĐµ Đ´Đ˛Đ¸ĐłĐ°ĐµĐĽ Ń„Đ°ĐşŃ‚Đ¸Ń‡ĐµŃĐşĐ¸Đą ŃĐżŃ€Đ°ĐąŃ‚ ŃŽĐ˝Đ¸Ń‚Đ°, Ń‚ĐľĐ»ŃŚĐşĐľ ĐżŃ€Đ¸Đ·Ń€Đ°Đş
                        if (unit.sprite && unit.sprite.setPosition) {
                            unit.sprite.setPosition(
                                this.gridSystem.gridOffsetX + (unit.gridX * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2,
                                this.gridSystem.gridOffsetY + (unit.gridY * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2
                            );
                        }
                        this.onUnitDrag(pointer);
                    })
                    .on('dragend', (pointer, dragX, dragY) => {
                        this.onUnitDragEnd(unit, pointer, dragX, dragY);
                    });
                
                console.log(`Đ’ĐľŃĐşŃ€ĐµŃĐµĐ˝ ŃŽĐ˝Đ¸Ń‚ Đ¸ĐłŃ€ĐľĐşĐ°: ${unit.constructor.name} Đ˛ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ (${unit.gridX}, ${unit.gridY})`);
            } else {
                // Đ›Đ•Đ§Đ•ĐťĐĐ• Đ˛Ń‹Đ¶Đ¸Đ˛ŃĐ¸Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
                const oldHp = unit.hp;
                unit.hp = unit.maxHp;
                console.log(`Đ’Ń‹Đ»ĐµŃ‡ĐµĐ˝ ŃŽĐ˝Đ¸Ń‚ Đ¸ĐłŃ€ĐľĐşĐ°: ${unit.constructor.name} (${oldHp} -> ${unit.hp} HP)`);
                
                // ĐŁĐ±ĐµĐ¶Đ´Đ°ĐµĐĽŃŃŹ, Ń‡Ń‚Đľ drag-and-drop ĐľĐ±Ń€Đ°Đ±ĐľŃ‚Ń‡Đ¸ĐşĐ¸ ĐµŃŃ‚ŃŚ
                if (!unit.sprite.input || !unit.sprite.input.draggable) {
                    if (unit.sprite.type === 'Container') {
                        unit.sprite.setSize(unit.sprite.width || 100, unit.sprite.height || 100);
                    }
                    unit.sprite.setInteractive({ draggable: true })
                        .on('dragstart', (pointer) => {
                            this.onUnitDragStart(unit, pointer);
                        })
                        .on('drag', (pointer, dragX, dragY) => {
                            // ĐťĐµ Đ´Đ˛Đ¸ĐłĐ°ĐµĐĽ Ń„Đ°ĐşŃ‚Đ¸Ń‡ĐµŃĐşĐ¸Đą ŃĐżŃ€Đ°ĐąŃ‚ ŃŽĐ˝Đ¸Ń‚Đ°, Ń‚ĐľĐ»ŃŚĐşĐľ ĐżŃ€Đ¸Đ·Ń€Đ°Đş
                            if (unit.sprite && unit.sprite.setPosition) {
                                unit.sprite.setPosition(
                                    this.gridSystem.gridOffsetX + (unit.gridX * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2,
                                    this.gridSystem.gridOffsetY + (unit.gridY * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2
                                );
                            }
                            this.onUnitDrag(pointer);
                        })
                        .on('dragend', (pointer, dragX, dragY) => {
                            this.onUnitDragEnd(unit, pointer, dragX, dragY);
                        });
                }
            }
            
            // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ HP bar Đ´Đ»ŃŹ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
            unit.updateHpBar();
        });
        
        // Đ’ĐľŃĐşŃ€ĐµŃĐ°ĐµĐĽ Đ¸ Đ»ĐµŃ‡Đ¸ĐĽ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ˛Ń€Đ°ĐłĐ°
        this.enemyUnits.forEach(unit => {
            if (unit.isDead) {
                // Đ’ĐžĐˇĐšĐ Đ•Đ¨Đ•ĐťĐĐ•
                unit.isDead = false;
                unit.hp = unit.maxHp;
                
                // Đ’ĐĐ–ĐťĐž: ĐžŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ Đ˛ŃĐµ Đ°ĐşŃ‚Đ¸Đ˛Đ˝Ń‹Đµ tweens Đ˝Đ° ŃĐżŃ€Đ°ĐąŃ‚Đµ
                this.tweens.killTweensOf(unit.sprite);
                
                // Đ’ĐľŃŃŃ‚Đ°Đ˝Đ°Đ˛Đ»Đ¸Đ˛Đ°ĐµĐĽ ŃĐżŃ€Đ°ĐąŃ‚
                unit.sprite.setAlpha(1);
                unit.sprite.setScale(1, 1);
                unit.sprite.setVisible(true);
                
                // ĐŃĐżŃ€Đ°Đ˛Đ»ŃŹĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ŃĐżŃ€Đ°ĐąŃ‚Đ° ĐµŃĐ»Đ¸ ŃŤŃ‚Đľ Đ¸Đ·ĐľĐ±Ń€Đ°Đ¶ĐµĐ˝Đ¸Đµ
                if (unit.sprite.setDisplaySize) {
                    const spriteWidth = unit.size.width * this.gridSystem.cellSize;
                    const spriteHeight = unit.size.height * this.gridSystem.cellSize;
                    unit.sprite.setDisplaySize(spriteWidth, spriteHeight);
                    console.log('ĐŃĐżŃ€Đ°Đ˛Đ»ŃŹĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€ ŃĐżŃ€Đ°ĐąŃ‚Đ° Đ˛Ń€Đ°ĐłĐ° ĐżĐľŃĐ»Đµ Đ˛ĐľŃĐşŃ€ĐµŃĐµĐ˝Đ¸ŃŹ:', spriteWidth, 'x', spriteHeight);
                }
                
                // Đ”ĐµĐ»Đ°ĐµĐĽ hpBar ŃĐ˝ĐľĐ˛Đ° Đ˛Đ¸Đ´Đ¸ĐĽŃ‹ĐĽĐ¸
                if (unit.hpBar && unit.hpBar.scene) {
                    unit.hpBar.setVisible(true);
                }
                if (unit.hpBarBg && unit.hpBarBg.scene) {
                    unit.hpBarBg.setVisible(true);
                }
                
                // ĐźĐµŃ€ĐµŃĐľĐ·Đ´Đ°ĐµĐĽ hpBar ĐµŃĐ»Đ¸ ĐľĐ˝ Đ±Ń‹Đ» ŃĐ˝Đ¸Ń‡Ń‚ĐľĐ¶ĐµĐ˝
                if (!unit.hpBar || !unit.hpBar.scene) {
                    const barWidth = unit.size.width * this.gridSystem.cellSize * 0.6;
                    const barHeight = 4;
                    const barY = unit.sprite.y - (unit.size.height * this.gridSystem.cellSize * 0.4);
                    
                    unit.hpBarBg = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x333333);
                    unit.hpBar = this.add.rectangle(unit.sprite.x, barY, barWidth, barHeight, 0x00FF00);
                }
                
                // Đ—Đ°Đ˝ĐľĐ˛Đľ Ń€Đ°Đ·ĐĽĐµŃ‰Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚Đ° Đ˝Đ° ŃĐµŃ‚ĐşĐµ (Đ˛ Ń‚ĐľĐą Đ¶Đµ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸)
                this.gridSystem.placeUnit(unit.gridX, unit.gridY, unit);
                
                // ĐźĐµŃ€ĐµŃĐľĐ·Đ´Đ°ĐµĐĽ Đ·Đ˛ĐµĐ·Đ´ĐľŃ‡ĐşĐ¸ ĐĽĐµŃ€Đ´Đ¶Đ° ĐµŃĐ»Đ¸ ĐľĐ˝Đ¸ ĐµŃŃ‚ŃŚ
                if (unit.mergeLevel > 0) {
                    unit.createMergeStars();
                }
                
                console.log(`Đ’ĐľŃĐşŃ€ĐµŃĐµĐ˝ ŃŽĐ˝Đ¸Ń‚ Đ˛Ń€Đ°ĐłĐ°: ${unit.constructor.name} Đ˛ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ (${unit.gridX}, ${unit.gridY})`);
            } else {
                // Đ›Đ•Đ§Đ•ĐťĐĐ• Đ˛Ń‹Đ¶Đ¸Đ˛ŃĐ¸Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
                const oldHp = unit.hp;
                unit.hp = unit.maxHp;
                console.log(`Đ’Ń‹Đ»ĐµŃ‡ĐµĐ˝ ŃŽĐ˝Đ¸Ń‚ Đ˛Ń€Đ°ĐłĐ°: ${unit.constructor.name} (${oldHp} -> ${unit.hp} HP)`);
            }
            
            // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ HP bar Đ´Đ»ŃŹ Đ˛ŃĐµŃ… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
            unit.updateHpBar();
        });
        
        console.log(`Đ’ŃĐµ ŃŽĐ˝Đ¸Ń‚Ń‹ Đ˛ĐľŃĐşŃ€ĐµŃĐµĐ˝Ń‹ Đ¸ Đ˛Ń‹Đ»ĐµŃ‡ĐµĐ˝Ń‹. ĐĐłŃ€ĐľĐş: ${this.playerUnits.length}, Đ’Ń€Đ°Đł: ${this.enemyUnits.length}`);
    }

    endGame() {
        // ĐźĐľĐ´ŃŃ‡Đ¸Ń‚Ń‹Đ˛Đ°ĐµĐĽ Đ¸Ń‚ĐľĐłĐľĐ˛Ń‹Đą Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚
        const playerWins = this.roundResults.filter(result => result).length;
        const enemyWins = this.roundResults.length - playerWins;
        
        console.log(`=== ĐśĐĐ˘Đ§ Đ—ĐĐ’Đ•Đ Đ¨Đ•Đť ===`);
        console.log(`Đ¤Đ¸Đ˝Đ°Đ»ŃŚĐ˝Ń‹Đą ŃŃ‡ĐµŃ‚: ${playerWins}-${enemyWins}`);
        
        let finalResult;
        if (playerWins >= this.winsNeeded) {
            finalResult = 'ĐźĐžĐ‘Đ•Đ”Đ!';
            console.log(`ĐŃ‚ĐľĐłĐľĐ˛Ń‹Đą Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚: ĐźĐžĐ‘Đ•Đ”Đ! (${playerWins}-${enemyWins})`);
        } else if (enemyWins >= this.winsNeeded) {
            finalResult = 'ĐźĐžĐ ĐĐ–Đ•ĐťĐĐ•!';
            console.log(`ĐŃ‚ĐľĐłĐľĐ˛Ń‹Đą Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚: ĐźĐžĐ ĐĐ–Đ•ĐťĐĐ•! (${playerWins}-${enemyWins})`);
        } else {
            // ĐťĐµ Đ´ĐľĐ»Đ¶Đ˝Đľ ĐżŃ€ĐľĐ¸ŃŃ…ĐľĐ´Đ¸Ń‚ŃŚ Đ˛ Bo5, Đ˝Đľ Đ˝Đ° Đ˛ŃŃŹĐşĐ¸Đą ŃĐ»ŃŃ‡Đ°Đą
            finalResult = playerWins > enemyWins ? 'ĐźĐžĐ‘Đ•Đ”Đ!' : 'ĐźĐžĐ ĐĐ–Đ•ĐťĐĐ•!';
            console.log(`ĐŃ‚ĐľĐłĐľĐ˛Ń‹Đą Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚: ${finalResult} (${playerWins}-${enemyWins})`);
        }
        
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ Đ¸Ń‚ĐľĐłĐľĐ˛Ń‹Đą Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚
        this.showFinalResult(finalResult, playerWins, enemyWins);
    }

    showFinalResult(result, playerWins, enemyWins) {
        // Đ’ĐĐ–ĐťĐž: ĐžŃ‚ĐşĐ»ŃŽŃ‡Đ°ĐµĐĽ Đ±ĐľĐµĐ˛ŃŃŽ ŃĐ¸ŃŃ‚ĐµĐĽŃ ĐżĐľĐ»Đ˝ĐľŃŃ‚ŃŚŃŽ
        this.isBattleActive = false;
        if (this.battleSystem) {
            this.battleSystem.isActive = false;
        }
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ Đ·Đ°Ń‚ĐµĐĽĐ˝ĐµĐ˝Đ¸Đµ Đ˝Đ° Đ˛ĐµŃŃŚ ŃŤĐşŃ€Đ°Đ˝ (Đ±ĐľĐ»ŃŚŃĐµ Ń‡ĐµĐĽ Ń€Đ°Đ·ĐĽĐµŃ€Ń‹ Đ¸ĐłŃ€Ń‹)
        const overlay = this.add.rectangle(0, 0, this.scale.gameSize.width * 2, this.scale.gameSize.height * 2, 0x000000, 0.7);
        overlay.setOrigin(0, 0);
        overlay.setScrollFactor(0); // Đ¤Đ¸ĐşŃĐ¸Ń€ĐľĐ˛Đ°Đ˝Đ˝ĐľĐµ ĐżĐľĐ»ĐľĐ¶ĐµĐ˝Đ¸Đµ ĐľŃ‚Đ˝ĐľŃĐ¸Ń‚ĐµĐ»ŃŚĐ˝Đľ ĐşĐ°ĐĽĐµŃ€Ń‹
        
        // ĐŃ‚ĐľĐłĐľĐ˛Ń‹Đą Ń€ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚
        const resultText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, result, {
            fontSize: '32px',
            fill: result === 'ĐźĐžĐ‘Đ•Đ”Đ!' ? '#00FF00' : '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        resultText.setScrollFactor(0);
        
        // Đ¤Đ¸Đ˝Đ°Đ»ŃŚĐ˝Ń‹Đą ŃŃ‡ĐµŃ‚ (Best of 5)
        const scoreText = this.add.text(this.scale.width / 2, this.scale.height / 2, `Đ¤Đ¸Đ˝Đ°Đ»ŃŚĐ˝Ń‹Đą ŃŃ‡ĐµŃ‚: ${playerWins}-${enemyWins}`, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        scoreText.setScrollFactor(0);
        
        // Đ”ĐµŃ‚Đ°Đ»Đ¸ Ń€Đ°ŃĐ˝Đ´ĐľĐ˛
        let roundsText = '';
        this.roundResults.forEach((result, index) => {
            roundsText += result ? 'Đ’' : 'Đź';
            if (index < this.roundResults.length - 1) roundsText += '-';
        });
        
        const roundsTextElement = this.add.text(this.scale.width / 2, this.scale.height / 2 + 30, `Đ Đ°ŃĐ˝Đ´Ń‹: ${roundsText}`, {
            fontSize: '14px',
            fill: '#CCCCCC'
        }).setOrigin(0.5);
        roundsTextElement.setScrollFactor(0);
        
        // ĐšĐ˝ĐľĐżĐşĐ° Đ˝ĐľĐ˛ĐľĐą Đ¸ĐłŃ€Ń‹
        const newGameButton = this.add.rectangle(this.scale.width / 2, this.scale.height / 2 + 100, 200, 50, 0x4A90E2)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('ĐźĐµŃ€ĐµĐ·Đ°ĐżŃŃĐş Đ¸ĐłŃ€Ń‹...');
                this.scene.restart();
            });
        newGameButton.setScrollFactor(0);
            
        const buttonText = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'ĐťĐžĐ’ĐĐŻ ĐĐ“Đ Đ', {
            fontSize: '16px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        buttonText.setScrollFactor(0);
    }

    cleanupDeadUnits() {
        this.playerUnits = this.playerUnits.filter(unit => unit.isAlive());
        this.enemyUnits = this.enemyUnits.filter(unit => unit.isAlive());
        this.gridSystem.clearDeadUnits();
    }

    // ============================================================================
    // DRAG-AND-DROP ĐˇĐĐˇĐ˘Đ•ĐśĐ
    // ============================================================================
    
    /**
     * ĐťĐ°Ń‡Đ°Đ»Đľ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚Đ° Đ¸Đ· Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń‹
     */
    onDragStart(unitType, cardIndex, pointer) {
        if (this.isBattleActive) return;
        
        // ĐžŃ‡Đ¸Ń‰Đ°ĐµĐĽ ĐżŃ€ĐµĐ´Ń‹Đ´ŃŃ‰Đ¸Đµ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ¸ Đ˝Đ° Đ˛ŃŃŹĐşĐ¸Đą ŃĐ»ŃŃ‡Đ°Đą
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        // Đ®Đ˝Đ¸Ń‚Ń‹ Ń‚ĐµĐżĐµŃ€ŃŚ Đ±ĐµŃĐżĐ»Đ°Ń‚Đ˝Ń‹Đµ - ŃĐ±Đ¸Ń€Đ°ĐµĐĽ ĐżŃ€ĐľĐ˛ĐµŃ€ĐşŃ ŃŃ‚ĐľĐ¸ĐĽĐľŃŃ‚Đ¸
        
        this.isDragging = true;
        this.isDraggingFromField = false; // ĐˇĐ±Ń€Đ°ŃŃ‹Đ˛Đ°ĐµĐĽ Ń„Đ»Đ°Đł - ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸Đµ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        this.selectedUnitType = unitType;
        this.selectedUnitData = unitData;
        this.selectedCardIndex = cardIndex;
        
        // ĐťĐ• ĐżĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ ĐżŃ€Đ¸ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸Đ¸ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°
        // ĐžĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ Ń‚ĐľĐ»ŃŚĐşĐľ Đ´Đ»ŃŹ ŃĐ¶Đµ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ĐżŃ€Đ¸Đ·Ń€Đ°Ń‡Đ˝ŃŃŽ ĐşĐľĐżĐ¸ŃŽ ŃŽĐ˝Đ¸Ń‚Đ°
        this.createDragGhost(unitType, pointer.x, pointer.y);
        
        console.log('ĐťĐ°Ń‡Đ°Đ»Đľ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ:', unitData.name);
    }
    
    /**
     * ĐˇĐľĐ·Đ´Đ°ĐµŃ‚ ĐżŃ€Đ¸Đ·Ń€Đ°Ń‡Đ˝ŃŃŽ ĐşĐľĐżĐ¸ŃŽ ŃŽĐ˝Đ¸Ń‚Đ° Đ´Đ»ŃŹ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ
     */
    createDragGhost(unitType, x, y) {
        const unitData = window.gameConfig.UNIT_TYPES[unitType];
        const size = unitData.size;
        const cellSize = this.gridSystem.cellSize;
        
        // ĐźĐľĐ»ŃĐżŃ€ĐľĐ·Ń€Đ°Ń‡Đ˝Ń‹Đą ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ¸Đş Ń€Đ°Đ·ĐĽĐµŃ€ĐľĐĽ Ń ŃŽĐ˝Đ¸Ń‚Đ°
        this.dragGhost = this.add.rectangle(
            x, y, 
            size.width * cellSize, 
            size.height * cellSize, 
            unitData.color, 
            0.5 // ĐźĐľĐ»ŃĐżŃ€ĐľĐ·Ń€Đ°Ń‡Đ˝ĐľŃŃ‚ŃŚ
        );
        this.dragGhost.setDepth(1000); // ĐźĐľĐ˛ĐµŃ€Ń… Đ˛ŃĐµĐłĐľ
        
        // Đ Đ°ĐĽĐşĐ°
        const border = this.add.rectangle(
            x, y,
            size.width * cellSize,
            size.height * cellSize,
            0xFFFFFF, 0
        ).setStrokeStyle(2, 0xFFFFFF);
        border.setDepth(1001);
        
        this.dragGhostElements.push(this.dragGhost, border);
    }
    
    /**
     * ĐžĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸Đµ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ° Đ¸ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşĐ° ĐşĐ»ĐµŃ‚ĐľĐş
     */
    onDrag(pointer, dragX, dragY) {
        if (!this.isDragging) return;
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ°
        this.dragGhostElements.forEach(elem => {
            elem.setPosition(pointer.x, pointer.y);
        });
        
        // ĐźĐľĐ»ŃŃ‡Đ°ĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ Đ˝Đ° ŃĐµŃ‚ĐşĐµ
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ ĐşĐ»ĐµŃ‚ĐľĐş
        this.updateCellHighlight(gridPos.x, gridPos.y);
    }
    
    /**
     * ĐźĐľĐ´ŃĐ˛ĐµŃ‚ĐşĐ° Đ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Ń…/Đ˝ĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Ń… ĐşĐ»ĐµŃ‚ĐľĐş
     */
    updateCellHighlight(gridX, gridY) {
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŃ‚Đ°Ń€ŃŃŽ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        const size = this.selectedUnitData.size;
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridX, gridY, size, this.selectedUnitType, false
        );
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, ĐµŃŃ‚ŃŚ Đ»Đ¸ Ń ŃŽĐ˝Đ¸Ń‚Đ° L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
        const unitData = window.gameConfig.UNIT_TYPES[this.selectedUnitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (occupiedCells) {
            // L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ° - ĐżĐľĐ´ŃĐ˛ĐµŃ‡Đ¸Đ˛Đ°ĐµĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸
            occupiedCells.forEach(cell => {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                
                const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                const highlight = this.add.rectangle(
                    cellX, cellY,
                    this.gridSystem.cellSize,
                    this.gridSystem.cellSize,
                    color, 0.3
                );
                highlight.setDepth(500);
                this.highlightedCells.push(highlight);
            });
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    
                    const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                    const highlight = this.add.rectangle(
                        cellX, cellY,
                        this.gridSystem.cellSize,
                        this.gridSystem.cellSize,
                        color, 0.3
                    );
                    highlight.setDepth(500);
                    this.highlightedCells.push(highlight);
                }
            }
        }
        
        // Đ•ŃĐ»Đ¸ Đ˛ĐľĐ·ĐĽĐľĐ¶ĐµĐ˝ ĐĽĐµŃ€Đ´Đ¶, Đ´ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ ŃĐżĐµŃ†Đ¸Đ°Đ»ŃŚĐ˝Ń‹Đą Đ¸Đ˝Đ´Đ¸ĐşĐ°Ń‚ĐľŃ€
        if (placementResult.isMerge) {
            const mergeIcon = this.add.star(
                this.highlightedCells[0].x,
                this.highlightedCells[0].y,
                5, 8, 4, 0xFFD700
            );
            mergeIcon.setDepth(501);
            this.highlightedCells.push(mergeIcon);
        }
    }
    
    /**
     * Đ—Đ°Đ˛ĐµŃ€ŃĐµĐ˝Đ¸Đµ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ
     */
    onDragEnd(pointer, unitType, cardIndex) {
        if (!this.isDragging) return;
        
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐżŃ€Đ¸Đ·Ń€Đ°Đş Đ¸ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, ĐĽĐľĐ¶ĐµĐĽ Đ»Đ¸ Ń€Đ°Đ·ĐĽĐµŃŃ‚Đ¸Ń‚ŃŚ
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridPos.x, gridPos.y,
            this.selectedUnitData.size,
            this.selectedUnitType,
            false
        );
        
        if (placementResult.canPlace) {
            if (placementResult.isMerge) {
                // ĐśĐ•Đ Đ”Đ– - Ń‚ĐľĐ»ŃŚĐşĐľ ĐĽĐµŃ€Đ´Đ¶Đ¸ĐĽ ŃŃŃ‰ĐµŃŃ‚Đ˛ŃŃŽŃ‰Đ¸Đą ŃŽĐ˝Đ¸Ń‚
                console.log('ĐśĐµŃ€Đ´Đ¶ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°:', this.selectedUnitType);
                const success = placementResult.existingUnit.merge(this.selectedUnitType);
                if (success) {
                    // Đ®Đ˝Đ¸Ń‚Ń‹ Đ±ĐµŃĐżĐ»Đ°Ń‚Đ˝Ń‹Đµ - Đ˝Đµ Ń‚Ń€Đ°Ń‚Đ¸ĐĽ ĐĽĐľĐ˝ĐµŃ‚Ń‹
                    this.updateCoinsDisplay();
                    this.removeCardFromShop(cardIndex);
                    console.log('ĐśĐµŃ€Đ´Đ¶ ŃŃĐżĐµŃĐµĐ˝!');
                } else {
                    console.log('ĐśĐµŃ€Đ´Đ¶ Đ˝Đµ ŃĐ´Đ°Đ»ŃŃŹ');
                }
            } else {
                // Đ ĐĐ—ĐśĐ•Đ©Đ•ĐťĐĐ• - ŃĐľĐ·Đ´Đ°ĐµĐĽ Đ˝ĐľĐ˛Ń‹Đą ŃŽĐ˝Đ¸Ń‚
                console.log('Đ Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸Đµ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°:', this.selectedUnitType);
                this.placeUnit(this.selectedUnitType, gridPos.x, gridPos.y);
                // Đ®Đ˝Đ¸Ń‚Ń‹ Đ±ĐµŃĐżĐ»Đ°Ń‚Đ˝Ń‹Đµ - Đ˝Đµ Ń‚Ń€Đ°Ń‚Đ¸ĐĽ ĐĽĐľĐ˝ĐµŃ‚Ń‹
                this.updateCoinsDisplay();
                this.removeCardFromShop(cardIndex);
            }
        } else {
            console.log('ĐťĐµĐ»ŃŚĐ·ŃŹ Ń€Đ°Đ·ĐĽĐµŃŃ‚Đ¸Ń‚ŃŚ Đ˛ ŃŤŃ‚ĐľĐą ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸');
        }
        
        // ĐˇĐ±Ń€ĐľŃ ŃĐľŃŃ‚ĐľŃŹĐ˝Đ¸ŃŹ
        this.isDragging = false;
        this.selectedUnitType = null;
        this.selectedUnitData = null;
        this.selectedCardIndex = null;
        
        // Đ”ĐľĐżĐľĐ»Đ˝Đ¸Ń‚ĐµĐ»ŃŚĐ˝Đ°ŃŹ ĐľŃ‡Đ¸ŃŃ‚ĐşĐ° Đ˝Đ° Đ˛ŃŃŹĐşĐ¸Đą ŃĐ»ŃŃ‡Đ°Đą
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
    }
    
    /**
     * ĐťĐ°Ń‡Đ°Đ»Đľ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ˝ĐľĐłĐľ ŃŽĐ˝Đ¸Ń‚Đ°
     */
    onUnitDragStart(unit, pointer) {
        if (this.isBattleActive) {
            console.log('Đ‘ĐľĐą Đ°ĐşŃ‚Đ¸Đ˛ĐµĐ˝, Đ˝ĐµĐ»ŃŚĐ·ŃŹ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Ń‚ŃŚ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛');
            return;
        }
        
        console.log('onUnitDragStart Đ˛Ń‹Đ·Đ˛Đ°Đ˝ Đ´Đ»ŃŹ:', unit.constructor.name);
        
        this.isDragging = true;
        this.draggedUnit = unit;
        
        // ĐźĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ Ń‚ĐľĐ»ŃŚĐşĐľ ĐµŃĐ»Đ¸ ŃŽĐ˝Đ¸Ń‚ Ń ĐżĐľĐ»ŃŹ
        // Đ•ŃĐ»Đ¸ ŃŽĐ˝Đ¸Ń‚ Đ¸Đ· ĐĽĐ°ĐłĐ°Đ·Đ¸Đ˝Đ°, ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸ Đ˝Đµ ĐżĐľĐşĐ°Đ·Ń‹Đ˛Đ°ĐµĐĽ
        if (this.isDraggingFromField) {
            this.showSellArea(unit);
        }
        
        // ĐˇĐľĐ·Đ´Đ°ĐµĐĽ ĐżŃ€Đ¸Đ·Ń€Đ°Ń‡Đ˝ŃŃŽ ĐşĐľĐżĐ¸ŃŽ ŃŽĐ˝Đ¸Ń‚Đ°
        this.createUnitDragGhost(unit, pointer.x, pointer.y);
        
        console.log('ĐťĐ°Ń‡Đ°Đ»Đľ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°:', unit.constructor.name);
    }
    
    /**
     * ĐˇĐľĐ·Đ´Đ°ĐµŃ‚ ĐżŃ€Đ¸Đ·Ń€Đ°Ń‡Đ˝ŃŃŽ ĐşĐľĐżĐ¸ŃŽ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ˝ĐľĐłĐľ ŃŽĐ˝Đ¸Ń‚Đ°
     */
    createUnitDragGhost(unit, x, y) {
        const size = unit.size;
        const cellSize = this.gridSystem.cellSize;
        
        // ĐźĐľĐ»ŃĐżŃ€ĐľĐ·Ń€Đ°Ń‡Đ˝Ń‹Đą ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ¸Đş Ń€Đ°Đ·ĐĽĐµŃ€ĐľĐĽ Ń ŃŽĐ˝Đ¸Ń‚Đ°
        this.dragGhost = this.add.rectangle(
            x, y, 
            size.width * cellSize, 
            size.height * cellSize, 
            unit.color, 
            0.5 // ĐźĐľĐ»ŃĐżŃ€ĐľĐ·Ń€Đ°Ń‡Đ˝ĐľŃŃ‚ŃŚ
        );
        this.dragGhost.setDepth(1000); // ĐźĐľĐ˛ĐµŃ€Ń… Đ˛ŃĐµĐłĐľ
        
        // Đ Đ°ĐĽĐşĐ°
        const border = this.add.rectangle(
            x, y,
            size.width * cellSize,
            size.height * cellSize,
            0xFFFFFF, 0
        ).setStrokeStyle(2, 0xFFFFFF);
        border.setDepth(1001);
        
        this.dragGhostElements.push(this.dragGhost, border);
    }
    
    /**
     * ĐžĐ±Đ˝ĐľĐ˛Đ»ĐµĐ˝Đ¸Đµ ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ° ŃŽĐ˝Đ¸Ń‚Đ°
     */
    onUnitDrag(pointer) {
        if (!this.isDragging || !this.draggedUnit) {
            console.log('onUnitDrag: Đ˝Đµ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°ĐµĐĽ Đ¸Đ»Đ¸ Đ˝ĐµŃ‚ ŃŽĐ˝Đ¸Ń‚Đ°');
            return;
        }
        
        console.log('onUnitDrag: ĐľĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ°');
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ĐżŃ€Đ¸Đ·Ń€Đ°ĐşĐ°
        this.dragGhostElements.forEach(elem => {
            elem.setPosition(pointer.x, pointer.y);
        });
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Đ˝Đ°Ń…ĐľĐ´Đ¸Ń‚ŃŃŹ Đ»Đ¸ ĐşŃŃ€ŃĐľŃ€ Đ˝Đ°Đ´ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚŃŽ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        if (this.sellArea && this.sellArea.rect) {
            const sellRect = this.sellArea.rect;
            const bounds = sellRect.getBounds();
            const inside =
                pointer.x >= bounds.x &&
                pointer.x <= bounds.x + bounds.width &&
                pointer.y >= bounds.y &&
                pointer.y <= bounds.y + bounds.height;
            
            if (inside) {
                // ĐźĐľĐ´ŃĐ˛ĐµŃ‡Đ¸Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
                if (sellRect.fillColor !== 0x00FF00) {
                    sellRect.setFillStyle(0x00FF00, 0.8);
                    console.log('ĐšŃŃ€ŃĐľŃ€ Đ˝Đ°Đ´ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚŃŽ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸');
                }
            } else if (sellRect.fillColor !== 0xFF4444) {
                // ĐŁĐ±Đ¸Ń€Đ°ĐµĐĽ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ
                sellRect.setFillStyle(0xFF4444, 0.8);
            }
        }
        
        // ĐźĐľĐ»ŃŃ‡Đ°ĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ Đ˝Đ° ŃĐµŃ‚ĐşĐµ
        console.log('onUnitDrag ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹:', pointer.x, pointer.y);
        const gridPos = this.gridSystem.getGridPosition(pointer.x, pointer.y);
        console.log('onUnitDrag gridPos:', gridPos);
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚ŃŚ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚
        if (isNaN(gridPos.x) || isNaN(gridPos.y)) {
            console.log('onUnitDrag: Đ˝ĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Đµ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹, ĐżŃ€ĐľĐżŃŃĐşĐ°ĐµĐĽ');
            return;
        }
        
        // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ ĐşĐ»ĐµŃ‚ĐľĐş
        this.updateUnitCellHighlight(gridPos.x, gridPos.y);
    }
    
    /**
     * ĐźĐľĐ´ŃĐ˛ĐµŃ‚ĐşĐ° ĐşĐ»ĐµŃ‚ĐľĐş Đ´Đ»ŃŹ ĐżĐµŃ€ĐµĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°
     */
    updateUnitCellHighlight(gridX, gridY) {
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŃ‚Đ°Ń€ŃŃŽ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚ŃŚ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚
        if (isNaN(gridX) || isNaN(gridY)) {
            return;
        }
        
        const size = this.draggedUnit.size;
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridX, gridY, size, this.draggedUnit.unitType, false
        );
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, ĐµŃŃ‚ŃŚ Đ»Đ¸ Ń ŃŽĐ˝Đ¸Ń‚Đ° L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
        const unitData = window.gameConfig.UNIT_TYPES[this.draggedUnit.unitType];
        const occupiedCells = unitData?.occupiedCells;
        
        if (occupiedCells) {
            // L-ĐľĐ±Ń€Đ°Đ·Đ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ° - ĐżĐľĐ´ŃĐ˛ĐµŃ‡Đ¸Đ˛Đ°ĐµĐĽ Ń‚ĐľĐ»ŃŚĐşĐľ Đ·Đ°Đ˝ŃŹŃ‚Ń‹Đµ ĐşĐ»ĐµŃ‚ĐşĐ¸
            occupiedCells.forEach(cell => {
                const x = gridX + cell.x;
                const y = gridY + cell.y;
                const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                
                const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                const highlight = this.add.rectangle(
                    cellX, cellY,
                    this.gridSystem.cellSize,
                    this.gridSystem.cellSize,
                    color, 0.3
                );
                highlight.setDepth(500);
                this.highlightedCells.push(highlight);
            });
        } else {
            // ĐˇŃ‚Đ°Đ˝Đ´Đ°Ń€Ń‚Đ˝Đ°ŃŹ ĐżŃ€ŃŹĐĽĐľŃĐłĐľĐ»ŃŚĐ˝Đ°ŃŹ Ń„ĐľŃ€ĐĽĐ°
            for (let y = gridY; y < gridY + size.height; y++) {
                for (let x = gridX; x < gridX + size.width; x++) {
                    const cellX = this.gridSystem.gridOffsetX + (x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    const cellY = this.gridSystem.gridOffsetY + (y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2;
                    
                    const color = placementResult.canPlace ? 0x00FF00 : 0xFF0000;
                    const highlight = this.add.rectangle(
                        cellX, cellY,
                        this.gridSystem.cellSize,
                        this.gridSystem.cellSize,
                        color, 0.3
                    );
                    highlight.setDepth(500);
                    this.highlightedCells.push(highlight);
                }
            }
        }
        
        // Đ•ŃĐ»Đ¸ Đ˛ĐľĐ·ĐĽĐľĐ¶ĐµĐ˝ ĐĽĐµŃ€Đ´Đ¶, Đ´ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ ŃĐżĐµŃ†Đ¸Đ°Đ»ŃŚĐ˝Ń‹Đą Đ¸Đ˝Đ´Đ¸ĐşĐ°Ń‚ĐľŃ€
        if (placementResult.isMerge) {
            const mergeIcon = this.add.star(
                this.highlightedCells[0].x,
                this.highlightedCells[0].y,
                5, 8, 4, 0xFFD700
            );
            mergeIcon.setDepth(501);
            this.highlightedCells.push(mergeIcon);
        }
    }
    
    /**
     * Đ—Đ°Đ˛ĐµŃ€ŃĐµĐ˝Đ¸Đµ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ ŃŽĐ˝Đ¸Ń‚Đ°
     */
    onUnitDragEnd(unit, pointer, dragX, dragY) {
        if (!this.isDragging || !this.draggedUnit) {
            console.log('onUnitDragEnd: Đ˝Đµ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°ĐµĐĽ Đ¸Đ»Đ¸ Đ˝ĐµŃ‚ ŃŽĐ˝Đ¸Ń‚Đ°');
            return;
        }
        
        console.log('onUnitDragEnd: Đ·Đ°Đ˛ĐµŃ€ŃĐµĐ˝Đ¸Đµ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸ŃŹ');
        
        // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐżŃ€Đ¸Đ·Ń€Đ°Đş Đ¸ ĐżĐľĐ´ŃĐ˛ĐµŃ‚ĐşŃ
        this.dragGhostElements.forEach(elem => elem.destroy());
        this.dragGhostElements = [];
        this.highlightedCells.forEach(cell => cell.destroy());
        this.highlightedCells = [];
        
        // ĐŃĐżĐľĐ»ŃŚĐ·ŃĐµĐĽ pointer.x Đ¸ pointer.y Đ´Đ»ŃŹ Đ°Đ±ŃĐľĐ»ŃŽŃ‚Đ˝Ń‹Ń… ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚
        // dragX Đ¸ dragY - ŃŤŃ‚Đľ ĐľŃ‚Đ˝ĐľŃĐ¸Ń‚ĐµĐ»ŃŚĐ˝Ń‹Đµ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹ ĐľŃ‚ Đ˝Đ°Ń‡Đ°Đ»ŃŚĐ˝ĐľĐą ĐżĐľĐ·Đ¸Ń†Đ¸Đ¸
        const worldX = pointer.x;
        const worldY = pointer.y;
        
        console.log('ĐšĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹ drop:', worldX, worldY);
        console.log('dragX, dragY:', dragX, dragY);
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚ŃŚ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚ pointer
        if (isNaN(worldX) || isNaN(worldY) || worldX === undefined || worldY === undefined) {
            console.log('ĐťĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Đµ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹ pointer, ĐľŃ‚ĐĽĐµĐ˝ŃŹĐµĐĽ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸Đµ');
            this.isDragging = false;
            this.isDraggingFromField = false;
            this.draggedUnit = null;
            return;
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Đ˝Đ°Ń…ĐľĐ´Đ¸Ń‚ŃŃŹ Đ»Đ¸ ĐşŃŃ€ŃĐľŃ€ Đ˝Đ°Đ´ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚŃŽ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        if (this.sellArea && this.sellArea.rect) {
            const sellRect = this.sellArea.rect;
            const bounds = sellRect.getBounds();
            const inside =
                worldX >= bounds.x &&
                worldX <= bounds.x + bounds.width &&
                worldY >= bounds.y &&
                worldY <= bounds.y + bounds.height;
            
            if (inside) {
                // ĐźĐ ĐžĐ”ĐĐ–Đ Đ®ĐťĐĐ˘Đ
                console.log('ĐźŃ€ĐľĐ´Đ°ĐµĐĽ ŃŽĐ˝Đ¸Ń‚');
                const sellPrice = this.draggedUnit.getSellPrice();
                
                // Đ”ĐľĐ±Đ°Đ˛Đ»ŃŹĐµĐĽ ĐĽĐľĐ˝ĐµŃ‚Ń‹
                this.economySystem.addCoins(sellPrice);
                this.updateCoinsDisplay();
                
                // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ŃŽĐ˝Đ¸Ń‚ Ń ĐżĐľĐ»ŃŹ
                this.draggedUnit.die();
                this.gridSystem.removeUnit(this.draggedUnit);
                
                console.log(`Đ®Đ˝Đ¸Ń‚ ĐżŃ€ĐľĐ´Đ°Đ˝ Đ·Đ° ${sellPrice} ĐĽĐľĐ˝ĐµŃ‚`);
                
                // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
                this.hideSellArea();
                
                // ĐˇĐ±Ń€ĐľŃ ŃĐľŃŃ‚ĐľŃŹĐ˝Đ¸ŃŹ
                this.isDragging = false;
                this.draggedUnit = null;
                return;
            }
        }
        
        const gridPos = this.gridSystem.getGridPosition(worldX, worldY);
        console.log('ĐźĐľĐ·Đ¸Ń†Đ¸ŃŹ drop:', gridPos);
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ Đ˛Đ°Đ»Đ¸Đ´Đ˝ĐľŃŃ‚ŃŚ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚
        if (isNaN(gridPos.x) || isNaN(gridPos.y)) {
            console.log('ĐťĐµĐ˛Đ°Đ»Đ¸Đ´Đ˝Ń‹Đµ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹, ĐľŃ‚ĐĽĐµĐ˝ŃŹĐµĐĽ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸Đµ');
            this.hideSellArea(); // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
            this.isDragging = false;
            this.isDraggingFromField = false;
            this.draggedUnit = null;
            return;
        }
        
        // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, ĐĽĐľĐ¶ĐµĐĽ Đ»Đ¸ ĐżĐµŃ€ĐµĐĽĐµŃŃ‚Đ¸Ń‚ŃŚ
        const placementResult = this.gridSystem.canPlaceOrMerge(
            gridPos.x, gridPos.y,
            this.draggedUnit.size,
            this.draggedUnit.unitType,
            false
        );
        
        console.log('Đ ĐµĐ·ŃĐ»ŃŚŃ‚Đ°Ń‚ Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ŃŹ:', placementResult);
        
        if (placementResult.canPlace) {
            if (placementResult.isMerge) {
                // ĐźŃ€ĐľĐ˛ĐµŃ€ŃŹĐµĐĽ, Ń‡Ń‚Đľ Đ˝Đµ ĐĽĐµŃ€Đ´Đ¶Đ¸ĐĽ ŃŽĐ˝Đ¸Ń‚ ŃĐ°ĐĽ Ń ŃĐľĐ±ĐľĐą
                if (placementResult.existingUnit === this.draggedUnit) {
                    console.log('ĐťĐµĐ»ŃŚĐ·ŃŹ ĐĽĐµŃ€Đ´Đ¶Đ¸Ń‚ŃŚ ŃŽĐ˝Đ¸Ń‚ ŃĐ°ĐĽ Ń ŃĐľĐ±ĐľĐą');
                    this.hideSellArea(); // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
                    this.isDragging = false;
                    this.draggedUnit = null;
                    return;
                }
                
                // ĐśĐ•Đ Đ”Đ– Ń ŃŃŃ‰ĐµŃŃ‚Đ˛ŃŃŽŃ‰Đ¸ĐĽ ŃŽĐ˝Đ¸Ń‚ĐľĐĽ
                console.log('Đ’Ń‹ĐżĐľĐ»Đ˝ŃŹĐµĐĽ ĐĽĐµŃ€Đ´Đ¶');
                const success = placementResult.existingUnit.merge(this.draggedUnit.unitType);
                
                if (success) {
                    // ĐŁĐ´Đ°Đ»ŃŹĐµĐĽ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°ĐµĐĽŃ‹Đą ŃŽĐ˝Đ¸Ń‚
                    this.draggedUnit.die();
                    this.gridSystem.removeUnit(this.draggedUnit);
                } else {
                    console.log('ĐśĐµŃ€Đ´Đ¶ Đ˝Đµ ŃĐ´Đ°Đ»ŃŃŹ');
                }
            } else {
                // ĐźĐ•Đ Đ•ĐśĐ•Đ©Đ•ĐťĐĐ•
                console.log('Đ’Ń‹ĐżĐľĐ»Đ˝ŃŹĐµĐĽ ĐżĐµŃ€ĐµĐĽĐµŃ‰ĐµĐ˝Đ¸Đµ');
                this.gridSystem.removeUnit(this.draggedUnit);
                
                // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐşĐľĐľŃ€Đ´Đ¸Đ˝Đ°Ń‚Ń‹ ĐźĐ•Đ Đ•Đ” Ń€Đ°Đ·ĐĽĐµŃ‰ĐµĐ˝Đ¸ĐµĐĽ Đ´Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
                this.draggedUnit.gridX = gridPos.x;
                this.draggedUnit.gridY = gridPos.y;
                
                this.gridSystem.placeUnit(gridPos.x, gridPos.y, this.draggedUnit);
                this.draggedUnit.updateMergeStars();
                
                // ĐžĐ±Đ˝ĐľĐ˛Đ»ŃŹĐµĐĽ ĐżĐľĐ·Đ¸Ń†Đ¸ŃŽ ŃŤŃ„Ń„ĐµĐşŃ‚ĐľĐ˛ Đ´Đ»ŃŹ L-ĐľĐ±Ń€Đ°Đ·Đ˝Ń‹Ń… ŃŽĐ˝Đ¸Ń‚ĐľĐ˛
                this.draggedUnit.setPosition(
                    this.gridSystem.gridOffsetX + (gridPos.x * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2,
                    this.gridSystem.gridOffsetY + (gridPos.y * this.gridSystem.cellSize) + this.gridSystem.cellSize / 2
                );
            }
        } else {
            console.log('ĐťĐµĐ»ŃŚĐ·ŃŹ Ń€Đ°Đ·ĐĽĐµŃŃ‚Đ¸Ń‚ŃŚ, ĐľŃ‚ĐĽĐµĐ˝ŃŹĐµĐĽ ĐżĐµŃ€ĐµŃ‚Đ°ŃĐşĐ¸Đ˛Đ°Đ˝Đ¸Đµ');
        }
        
        // ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ ĐľĐ±Đ»Đ°ŃŃ‚ŃŚ ĐżŃ€ĐľĐ´Đ°Đ¶Đ¸
        this.hideSellArea();
        
        // ĐˇĐ±Ń€ĐľŃ ŃĐľŃŃ‚ĐľŃŹĐ˝Đ¸ŃŹ
        this.isDragging = false;
        this.isDraggingFromField = false;
        this.draggedUnit = null;
    }
}

// ĐˇŃ‚Đ°Ń€Ń‚ĐľĐ˛ĐľĐµ ĐĽĐµĐ˝ŃŽ
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // ĐĐ´Đ°ĐżŃ‚Đ¸Đ˛Đ˝ĐľĐµ ĐżĐľĐ·Đ¸Ń†Đ¸ĐľĐ˝Đ¸Ń€ĐľĐ˛Đ°Đ˝Đ¸Đµ Đ´Đ»ŃŹ ŃŃ‚Đ°Ń€Ń‚ĐľĐ˛ĐľĐłĐľ ŃŤĐşŃ€Đ°Đ˝Đ°
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        
        this.add.text(centerX, centerY - 100, 'Đ‘ĐĐ˘Đ˘Đ›Đ•Đ  Đ ĐźĐ“', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 50, 'ĐźŃ€ĐľŃ‚ĐľŃ‚Đ¸Đż', {
            fontSize: '24px',
            fill: '#cccccc'
        }).setOrigin(0.5);

        const startButton = this.add.rectangle(centerX, centerY + 20, 250, 60, 0x4A90E2)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('GameScene');
            });

        this.add.text(centerX, centerY + 20, 'ĐťĐĐ§ĐĐ˘Đ¬ ĐĐ“Đ ĐŁ', {
            fontSize: '20px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 100, 'Đ Đ°Đ·ĐĽĐµŃ‰Đ°ĐąŃ‚Đµ ŃŽĐ˝Đ¸Ń‚ĐľĐ˛ Đ˝Đ° ĐżĐľĐ»Đµ\nĐ¸ ŃŃ€Đ°Đ¶Đ°ĐąŃ‚ĐµŃŃŚ Ń Đ˛Ń€Đ°ĐłĐ°ĐĽĐ¸!', {
            fontSize: '16px',
            fill: '#aaaaaa',
            align: 'center'
        }).setOrigin(0.5);

        startButton.on('pointerover', () => {
            startButton.setFillStyle(0x5BA0F2);
        });

        startButton.on('pointerout', () => {
            startButton.setFillStyle(0x4A90E2);
        });
    }
}

// ĐšĐľĐ˝Ń„Đ¸ĐłŃŃ€Đ°Ń†Đ¸ŃŹ Phaser
const config = {
    type: Phaser.AUTO,
    width: 800,  // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝Đ° ŃĐ¸Ń€Đ¸Đ˝Đ° Đ´Đ»ŃŹ Đ»ŃŃ‡ŃĐµĐłĐľ Đ¸ŃĐżĐľĐ»ŃŚĐ·ĐľĐ˛Đ°Đ˝Đ¸ŃŹ ŃŤĐşŃ€Đ°Đ˝Đ°
    height: 1400, // ĐŁĐ˛ĐµĐ»Đ¸Ń‡ĐµĐ˝Đ° Đ˛Ń‹ŃĐľŃ‚Đ° Đ´Đ»ŃŹ Đ˛Đ¸Ń‚Ń€Đ¸Đ˝Ń‹
    parent: 'game-container',
    backgroundColor: '#16213e',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 400,
            height: 600
        },
        max: {
            width: 1200,
            height: 1800
        }
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false
        }
    },
    scene: [MenuScene, GameScene]
};

// Đ—Đ°ĐżŃŃĐş Đ¸ĐłŃ€Ń‹
const game = new Phaser.Game(config);

// ĐˇĐşŃ€Ń‹Đ˛Đ°ĐµĐĽ Đ˝Đ°Đ´ĐżĐ¸ŃŃŚ Đ·Đ°ĐłŃ€ŃĐ·ĐşĐ¸ ĐżĐľŃĐ»Đµ Đ·Đ°ĐżŃŃĐşĐ° Đ¸ĐłŃ€Ń‹
setTimeout(() => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}, 1000);

 
