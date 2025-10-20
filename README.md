# Merge Prototype — Phaser Web Prototype

Игровой прототип автобаттлера на Phaser 3. В репозитории также есть папка с черновой Unity-версией (`assets/Scripts`), но основной актуальный клиент — веб-версия на Phaser.

## Особенности

- **Формат боев**: раунды, кнопка FIGHT
- **Экономика**: старт 10 монет, базовая награда за раунд 5
- **Сетка**: 8x6, по 3 ряда зоны игрока и врага
- **Юниты и витрина**: покупка юнитов из магазина, размещение на сетке

## Быстрый старт

1) Запуск в браузере (CDN Phaser)

```
Откройте файл index.html в браузере
```

или запустите локальный сервер:

```
cd D:\Work\MergePrototype
python -m http.server 8000
Откройте http://localhost:8000/index.html
```

2) Запуск через Phaser Editor (рекомендуется для разработки)

- См. документ `PHASER_EDITOR_SETUP.md`
- Используется `index-editor.html` и `src/main-editor.js` (поддержка расширенного набора юнитов и сцен редактора)

## Структура (веб-версия Phaser)

```
src/
├── scenes/
│   ├── MenuScene.js      # Главное меню
│   └── GameScene.js      # Игровая сцена
├── game.js               # Точка входа для index.html
├── main-editor.js        # Точка входа для Phaser Editor
└── assets/
    ├── sprites/
    │   └── units/        # Спрайты юнитов
    └── atlases/          # Атласы/конфиги
```

Unity-папка с C# скриптами расположена в `assets/Scripts` и не является основным путём сборки сейчас.

## Сцены

- `MenuScene` — стартовый экран, кнопка перехода в игру
- `GameScene` — поле, витрина, покупка и размещение, запуск боя

## Настройки игры (gameConfig)

Актуальные параметры для веб-запуска (`src/game.js`):

- `GRID_WIDTH: 8`, `GRID_HEIGHT: 6`, `CELL_SIZE: 50`
- `PLAYER_AREA_HEIGHT: 3`, `ENEMY_AREA_HEIGHT: 3`
- `STARTING_COINS: 10`
- `UNIT_TYPES`: минимальный набор (ARCHER, WARRIOR, MAGE)

Для режима редактора (`src/main-editor.js`) доступен расширенный набор: TANK, DRUID, HEALER, WITCH, BARBARIAN, ASSASSIN и др. Запускайте через Phaser Editor, см. выше.

## Полезные документы

- `PHASER_EDITOR_SETUP.md` — как открыть и запускать через Phaser Editor
- `DEVELOPMENT.md` — детали архитектуры и workflow
- `CHANGELOG.md` — список изменений

---

Если что-то не запускается, откройте консоль браузера (F12) и проверьте логи загрузки Phaser/CDN и `src/game.js`.