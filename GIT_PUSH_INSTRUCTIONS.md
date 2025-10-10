# 🚀 Инструкция для публикации на GitHub

## Шаг 1: Проверьте текущее состояние

```bash
git status
```

Вы должны увидеть измененные файлы:
- `README.md`
- `CHANGELOG.md`
- `DEVELOPMENT.md`
- `src/game.js`

## Шаг 2: Добавьте все изменения

```bash
git add .
```

## Шаг 3: Создайте коммит

```bash
git commit -m "feat: Add Taunt ability to Barbarian v1.1.0

New Features:
- ✨ Barbarian now has Taunt ability
- 🛡️ Enemies prioritize attacking Barbarians first
- 🎨 Visual effect: red pulsating glow around Barbarian
- 📝 Updated all documentation

Gameplay Impact:
- Barbarian is now a true tank
- Protects fragile allies (Archers, Mages, Healers)
- Strategic combos: Barbarian + Healer, Barbarian + Archers

Technical Changes:
- Added hasTaunt property to Barbarian class
- Modified BattleSystem.findNearestTarget() to prioritize taunt targets
- Added createTauntEffect() method with visual feedback
- Taunt effect cleans up on death

Files changed:
- src/game.js (Barbarian class, BattleSystem)
- README.md (updated unit description and strategies)
- CHANGELOG.md (version 1.1.0 notes)
- DEVELOPMENT.md (added taunt example)

Version: 1.1.0"
```

## Шаг 4: Отправьте на GitHub

```bash
git push origin main
```

Если у вас другая ветка (например, `master`):
```bash
git push origin master
```

## Шаг 5: Проверьте GitHub

1. Откройте ваш репозиторий на GitHub
2. Убедитесь, что коммит появился
3. Проверьте, что README.md отображается корректно на главной странице

## 🌐 GitHub Pages (опционально)

Если вы хотите разместить игру онлайн:

1. Перейдите в Settings репозитория
2. Выберите Pages в меню слева
3. В Source выберите `main` ветку
4. Сохраните

Игра будет доступна по адресу:
```
https://ваш-username.github.io/MergePrototype/
```

## 🎮 Демонстрация игры

После публикации вы можете показать:

1. **Ссылку на репозиторий:**
   ```
   https://github.com/ваш-username/MergePrototype
   ```

2. **Онлайн демо** (если настроен GitHub Pages):
   ```
   https://ваш-username.github.io/MergePrototype/
   ```

3. **Особенности для демонстрации:**
   - ✨ Best of 5 формат
   - 🛡️ Варвар с провокацией (танк)
   - 💚 Лекарь с лечением по области
   - 🔮 Маг с атакой по 3 целям
   - 💰 Экономика на основе убийств
   - 🎮 Полная документация

## 📝 Описание для показа

> "Это прототип auto-battler игры в формате Best of 5. 
> Игрок размещает юнитов на поле, каждый со своими способностями:
> - Варвар с провокацией защищает союзников
> - Лекарь лечит раненых
> - Маг бьет по нескольким целям
> 
> Экономика основана на количестве убитых врагов - чем эффективнее играешь,
> тем больше ресурсов на следующий раунд. Код полностью документирован
> и готов для PvP режима."

## 🐛 Если что-то пошло не так

### Ошибка: "Updates were rejected"
```bash
git pull origin main
git push origin main
```

### Ошибка: "Permission denied"
Проверьте, что вы авторизованы:
```bash
git remote -v
```

### Нужно изменить коммит
```bash
git commit --amend
```

---

**Готово! Теперь вы можете показывать проект кому угодно!** 🎉






