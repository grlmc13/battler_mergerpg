# 🎨 Рабочий процесс работы со спрайтами в Phaser

## 1. Визуальные редакторы

### Phaser Editor 2D (Рекомендуется)
- **Скачать:** https://phasereditor2d.com/
- **Возможности:**
  - Визуальное размещение спрайтов
  - Создание анимаций
  - Работа со сценами
  - Экспорт в код

### Texture Packer
- **Скачать:** https://www.codeandweb.com/texturepacker
- **Для:** создания атласов спрайтов
- **Экспорт:** JSON + PNG

### Tiled Map Editor
- **Скачать:** https://www.mapeditor.org/
- **Для:** создания тайловых карт
- **Интеграция:** Phaser поддерживает Tiled

## 2. Структура ресурсов

```
src/assets/
├── sprites/
│   ├── units/          # Спрайты юнитов (64x64 или 128x128)
│   ├── effects/        # Эффекты (32x32 или 64x64)
│   └── ui/             # UI элементы (кратные 16px)
├── atlases/            # Атласы спрайтов
├── sounds/             # Звуки (WAV, MP3)
├── music/              # Музыка (MP3, OGG)
└── fonts/              # Шрифты (TTF, WOFF)
```

## 3. Рекомендации по размерам

### Юниты
- **Размер:** 64x64 или 128x128 пикселей
- **Формат:** PNG с прозрачностью
- **Стиль:** Pixel art или векторная графика

### Эффекты
- **Размер:** 32x32 или 64x64 пикселей
- **Формат:** PNG с прозрачностью
- **Анимация:** 4-8 кадров

### UI элементы
- **Размер:** кратные 16 пикселям
- **Формат:** PNG с прозрачностью
- **Состояния:** normal, hover, pressed

## 4. Создание атласов

### Используя Texture Packer:
1. Откройте Texture Packer
2. Добавьте папку со спрайтами
3. Настройте экспорт:
   - **Data format:** JSON
   - **Texture format:** PNG
   - **Size constraints:** 2048x2048
4. Экспортируйте в папку `atlases/`

### Используя код:
```javascript
// Загрузка атласа
this.load.atlas('effects_atlas', 
    'src/assets/atlases/effects.png', 
    'src/assets/atlases/effects.json'
);

// Создание анимации
this.anims.create({
    key: 'magic_bolt_anim',
    frames: this.anims.generateFrameNames('effects_atlas', {
        prefix: 'magic_bolt_',
        start: 1,
        end: 8
    }),
    frameRate: 12,
    repeat: 0
});
```

## 5. Интеграция в игру

### Загрузка ресурсов:
```javascript
// В GameScene.js - метод preload()
preload() {
    this.assetLoader = new AssetLoader(this);
    this.assetLoader.preload();
}
```

### Создание эффектов:
```javascript
// Создание магической стрелы
this.effectManager.createMagicBolt(
    fromX, fromY, toX, toY,
    { color: 0x9B4AE2, thickness: 4 }
);

// Создание эффекта взрыва
this.effectManager.createExplosion(
    x, y,
    { color: 0xFF6B6B, particles: 8 }
);
```

## 6. Оптимизация

### Размеры текстур:
- **Мобильные:** максимум 2048x2048
- **Десктоп:** максимум 4096x4096
- **Сжатие:** используйте PNG-8 для простых спрайтов

### Атласы:
- Группируйте связанные спрайты
- Используйте обрезку (trimming)
- Оптимизируйте размеры

### Анимации:
- Используйте спрайт-листы для анимаций
- Ограничьте количество кадров
- Оптимизируйте частоту кадров

## 7. Инструменты для создания спрайтов

### Pixel Art:
- **Aseprite** (платный, лучший)
- **GIMP** (бесплатный)
- **Piskel** (онлайн, бесплатный)

### Векторная графика:
- **Adobe Illustrator**
- **Inkscape** (бесплатный)
- **Figma** (онлайн)

### Анимация:
- **Aseprite** (pixel art)
- **Spine** (скелетная анимация)
- **DragonBones** (бесплатный)

## 8. Примеры использования

Смотрите файлы:
- `AssetLoader.js` - система загрузки
- `EffectManager.js` - менеджер эффектов
- `IntegrationExample.js` - примеры интеграции
