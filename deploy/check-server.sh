#!/usr/bin/env bash
# Проверка сервера: потянет ли ComfyUI (картинки, видео LTX-2.5, музыка, озвучка).
# Только читает характеристики — ничего не ставит и не меняет. Запуск на сервере:
#   curl -fsSL https://raw.githubusercontent.com/ivanrasstri/home-office/claude/friendly-lovelace-74z514/deploy/check-server.sh | bash
set -u

os=$( (. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME") || uname -s)
arch=$(uname -m)
cpu=$(lscpu 2>/dev/null | awk -F: '/Model name/ {sub(/^ +/, "", $2); print $2; exit}')
cores=$(nproc 2>/dev/null || echo "?")
ram_gb=$(awk '/MemTotal/ {printf "%.0f", $2 / 1048576}' /proc/meminfo 2>/dev/null || echo 0)
disk_gb=$(df -BG --output=avail / 2>/dev/null | tail -n 1 | tr -dc '0-9')
disk_gb=${disk_gb:-0}

gpu="нет"
vram_gb=0
if command -v nvidia-smi >/dev/null 2>&1 && nvidia-smi >/dev/null 2>&1; then
  gpu=$(nvidia-smi --query-gpu=name --format=csv,noheader | head -n 1)
  vram_mib=$(nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits | head -n 1 | tr -dc '0-9')
  vram_gb=$(( ${vram_mib:-0} / 1024 ))
elif command -v lspci >/dev/null 2>&1; then
  g=$(lspci 2>/dev/null | grep -iE 'vga|3d|display' | grep -iE 'nvidia|amd|radeon' | head -n 1)
  if [ -n "$g" ]; then gpu="${g#*: } (драйвер NVIDIA не найден)"; fi
fi
docker_v=$( (docker --version 2>/dev/null | cut -d, -f1) || true)

echo "=== Сервер ==="
echo "Система:     $os ($arch)"
echo "Процессор:   ${cpu:-?}, ядер: $cores"
echo "Память:      ${ram_gb} ГБ"
echo "Свободно:    ${disk_gb} ГБ на диске"
echo "Видеокарта:  $gpu$( [ "$vram_gb" -gt 0 ] && echo ", ${vram_gb} ГБ видеопамяти")"
echo "Docker:      ${docker_v:-нет}"
echo
echo "=== Что потянет ComfyUI ==="
if [ "$vram_gb" -ge 8 ]; then
  echo "Картинки:    да, быстро (видеокарта)"
elif [ "$ram_gb" -ge 16 ]; then
  echo "Картинки:    только на процессоре — минуты на картинку, лёгкие модели (SD 1.5, SDXL Turbo)"
elif [ "$ram_gb" -ge 8 ]; then
  echo "Картинки:    на процессоре, очень медленно и только самые лёгкие модели"
else
  echo "Картинки:    нет — меньше 8 ГБ памяти"
fi
if [ "$vram_gb" -ge 32 ]; then
  echo "Видео LTX:   да — видеокарта от 32 ГБ (официальный минимум для LTX-2.5)"
elif [ "$vram_gb" -ge 24 ]; then
  echo "Видео LTX:   на грани — сжатые int8-веса и выгрузка в RAM; нужно 64 ГБ+ оперативной памяти"
else
  echo "Видео LTX:   нет — нужна видеокарта NVIDIA от 24–32 ГБ (можно арендовать на пару часов)"
fi
if [ "$vram_gb" -ge 8 ]; then
  echo "Музыка, голос: да"
elif [ "$ram_gb" -ge 16 ]; then
  echo "Музыка, голос: на процессоре, медленно"
else
  echo "Музыка, голос: вряд ли — мало памяти"
fi
if [ "$disk_gb" -lt 40 ]; then
  echo "Диск:        мало — под модели нужно от 20 ГБ (картинки) до ~40 ГБ+ (видео LTX-2.5)"
fi
echo
echo "Скопируй этот вывод в чат — по нему скажу, что ставить."
