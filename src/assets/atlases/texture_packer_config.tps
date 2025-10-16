# Texture Packer Configuration
# Используйте этот файл в Texture Packer для создания атласов

[General]
# Основные настройки
dataFormat=json
textureFormat=png
textureFile=effects.png
dataFile=effects.json
trimMode=1
sizeConstraints=2048,2048
scale=1.0
algorithm=MaxRects
maxrects-heuristics=5
packMode=0

[Data]
# Настройки данных
dataFormat=json
dataFile=effects.json
texturePath=effects.png
atlas=effects

[Output]
# Настройки вывода
textureFormat=png
textureFile=effects.png
dataFile=effects.json
trimMode=1
sizeConstraints=2048,2048

[Sprites]
# Папки со спрайтами для атласа
input=../sprites/effects/
output=effects.png
data=effects.json

# Рекомендуемые настройки:
# - Размер атласа: 2048x2048 (максимум для мобильных)
# - Формат: PNG с прозрачностью
# - Алгоритм: MaxRects (лучшее использование пространства)
# - Обрезка: включена (убирает прозрачные края)
