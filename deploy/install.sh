#!/usr/bin/env bash
# Олег Михайлович (Telegram-бот: вакансии, дизайнер, видео LTX-2.5) на своём сервере, 24/7.
#
# Установка — одна команда на сервере (Ubuntu/Debian и другие Linux; root или sudo), где
# <ветка> — ветка репозитория с этим файлом (main или рабочая):
#   curl -fsSL https://raw.githubusercontent.com/ivanrasstri/home-office/<ветка>/deploy/install.sh | sudo bash -s -- --branch <ветка>
#
# Что делает:
#   1. ставит git и Docker, если их нет;
#   2. кладёт репозиторий в /opt/home-office (нужная ветка);
#   3. спрашивает токены (ввод скрыт) и пишет их в /opt/home-office/.env с правами 600;
#   4. собирает образ и запускает бота с автоперезапуском: падения и перезагрузка сервера не страшны;
#   5. включает автообновление: раз в 5 минут сервер сам подтягивает новые коммиты ветки и
#      пересобирает бота. Если новая версия не собирается, продолжает работать старая.
#
# Граница доверия: автообновление меняет только код бота, а бот работает в контейнере без
# root и без доступа к серверу. Сам этот скрипт и docker-compose.yml копируются в
# /usr/local/lib/home-office при установке и меняются только при повторной установке.
#
# Управление потом — командой home-office:
#   status | logs | restart | update | config | branch <имя> | stop | start | uninstall
set -Eeuo pipefail

CONF=/etc/default/home-office
LIB=/usr/local/lib/home-office
LOCK=/var/lock/home-office.lock
UNIT=home-office-update
INSTALL_HINT="команда из README, раздел «Свой сервер (VPS), 24/7»"

say()  { printf '\033[1;36m▸ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m! %s\033[0m\n' "$*" >&2; }
die()  { printf '\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

load_conf() {
  DIR=/opt/home-office
  BRANCH=main
  REPO_URL=https://github.com/ivanrasstri/home-office.git
  AUTOUPDATE=yes
  # shellcheck disable=SC1090
  if [ -r "$CONF" ]; then . "$CONF"; fi
}

save_conf() {
  (umask 022; cat > "$CONF" <<EOF
# home-office: где лежит бот и какую ветку он отслеживает (менять: home-office branch <имя>)
DIR='$DIR'
BRANCH='$BRANCH'
REPO_URL='$REPO_URL'
AUTOUPDATE='$AUTOUPDATE'
EOF
  )
}

has_systemd() { command -v systemctl >/dev/null 2>&1 && [ -d /run/systemd/system ]; }

pkg_install() {
  if command -v apt-get >/dev/null 2>&1; then
    DEBIAN_FRONTEND=noninteractive apt-get update -qq
    DEBIAN_FRONTEND=noninteractive apt-get install -y -qq "$@" >/dev/null
  elif command -v dnf >/dev/null 2>&1; then dnf install -y -q "$@"
  elif command -v yum >/dev/null 2>&1; then yum install -y -q "$@"
  elif command -v apk >/dev/null 2>&1; then apk add --no-cache -q "$@"
  else die "Не знаю, как поставить $* на этой системе — поставь вручную и запусти снова"
  fi
}

ensure_tools() {
  local missing=()
  command -v git >/dev/null 2>&1 || missing+=(git)
  command -v curl >/dev/null 2>&1 || missing+=(curl)
  command -v flock >/dev/null 2>&1 || missing+=(util-linux)
  if [ ${#missing[@]} -gt 0 ]; then
    say "Ставлю ${missing[*]}"
    pkg_install "${missing[@]}"
  fi
}

ensure_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    say "Ставлю Docker (официальный скрипт get.docker.com)"
    curl -fsSL https://get.docker.com | sh
  fi
  if ! docker info >/dev/null 2>&1; then
    if has_systemd; then systemctl enable --now docker >/dev/null 2>&1 || true
    else service docker start >/dev/null 2>&1 || true
    fi
    sleep 2
    docker info >/dev/null 2>&1 || die "Docker установлен, но не запускается. Проверь: systemctl status docker"
  fi
  if ! docker compose version >/dev/null 2>&1; then
    say "Ставлю docker compose"
    pkg_install docker-compose-plugin || die "Не вышло поставить docker compose — поставь пакет docker-compose-plugin"
  fi
}

sync_repo() {
  if [ -d "$DIR/.git" ]; then
    git -C "$DIR" remote set-url origin "$REPO_URL"
    git -C "$DIR" fetch --quiet origin "$BRANCH" || die "Нет ветки $BRANCH в $REPO_URL"
    git -C "$DIR" checkout --quiet -B "$BRANCH" "origin/$BRANCH"
    git -C "$DIR" reset --quiet --hard "origin/$BRANCH"
  else
    say "Скачиваю $REPO_URL (ветка $BRANCH) в $DIR"
    mkdir -p "$(dirname "$DIR")"
    git clone --quiet --branch "$BRANCH" "$REPO_URL" "$DIR" || die "Не вышло скачать ветку $BRANCH из $REPO_URL"
  fi
}

# --- .env: токены лежат только на сервере ------------------------------------
env_file() { printf '%s/.env' "$DIR"; }

env_get() {
  local line
  line=$(grep -E "^$1=" "$(env_file)" 2>/dev/null | tail -n 1) || true
  line=${line#*=}
  line=${line#\'}; line=${line%\'}
  line=${line#\"}; line=${line%\"}
  printf '%s' "$line"
}

env_set() {
  local key=$1 value=$2 file tmp found=0 line
  file=$(env_file)
  case $value in *"'"*|*$'\n'*) die "В значении $key не должно быть кавычек и переводов строки" ;; esac
  tmp=$(mktemp "$DIR/.env.XXXXXX")
  chmod 600 "$tmp"
  if [ -f "$file" ]; then
    while IFS= read -r line || [ -n "$line" ]; do
      if [[ $line == "$key="* ]]; then printf "%s='%s'\n" "$key" "$value"; found=1
      else printf '%s\n' "$line"
      fi
    done < "$file" > "$tmp"
  fi
  if [ $found = 0 ]; then printf "%s='%s'\n" "$key" "$value" >> "$tmp"; fi
  mv "$tmp" "$file"
}

tty_ok() { (exec < /dev/tty) 2>/dev/null; }

# ask КЛЮЧ "вопрос" [secret] [required]: значение из окружения → из терминала → оставить текущее
ask() {
  local key=$1 question=$2 secret=${3:-} required=${4:-} current value=""
  current=$(env_get "$key")
  if [ -n "${!key:-}" ]; then
    value=${!key}
  elif tty_ok; then
    local hint=""
    if [ -n "$current" ]; then hint=" [Enter — оставить текущий]"; fi
    printf '%s%s: ' "$question" "$hint" > /dev/tty
    if [ "$secret" = secret ]; then
      IFS= read -rs value < /dev/tty || true
      printf '\n' > /dev/tty
    else
      IFS= read -r value < /dev/tty || true
    fi
  fi
  value=${value:-$current}
  if [ -z "$value" ] && [ "$required" = required ]; then
    die "$key обязателен. Запусти в терминале или передай переменной окружения $key"
  fi
  env_set "$key" "$value"
}

configure() {
  local file
  file=$(env_file)
  if [ ! -f "$file" ]; then
    (umask 077; printf '%s\n' \
      "# Токены бота. Только на этом сервере, права 600. Поменять: home-office config" \
      "# Другие настройки (модели, расписание, лимиты) — см. .env.example, впиши сюда нужные строки." \
      > "$file")
  fi
  if [ "${1:-}" != all ] && [ -n "$(env_get TELEGRAM_BOT_TOKEN)" ]; then return; fi
  if tty_ok; then say "Токены (ввод скрыт; пусто — пропустить необязательный)"; fi
  ask TELEGRAM_BOT_TOKEN "Токен бота от @BotFather" secret required
  ask TELEGRAM_CHAT_ID   "Твой chat_id (бот покажет его в ответ на /start; пусто — первый, кто напишет /start)"
  ask ANTHROPIC_API_KEY  "Ключ Claude API (отклики и /design)" secret
  ask LTXV_API_KEY       "Ключ LTX API для /video (console.ltx.io)" secret
  ask API_KEY_21ST       "Ключ 21st.dev (необязательно)" secret
}

compose() { docker compose --project-directory "$DIR" -f "$LIB/docker-compose.yml" "$@"; }

deploy_bot() {
  say "Собираю и запускаю бота"
  compose up -d --build --remove-orphans
  docker image prune -f >/dev/null 2>&1 || true
}

check_health() {  # смотрим только лог с момента запуска этой команды
  local state logs problem=""
  sleep "${1:-12}"
  state=$(docker inspect -f '{{.State.Status}} {{.RestartCount}}' "$(compose ps -q bot)" 2>/dev/null || echo "missing 0")
  logs=$(compose logs --since "$STARTED" --tail 60 bot 2>&1 || true)
  case $logs in
    *Conflict*) problem=1
      warn "Telegram: этот бот уже запущен где-то ещё (Railway, ноутбук). Останови там — иначе они мешают друг другу." ;;
  esac
  case $logs in
    *"401 Client Error"*|*"404 Client Error"*) problem=1
      warn "Telegram не принимает токен — поправь: home-office config" ;;
  esac
  if [ "${state%% *}" != running ] || [ "${state##* }" -gt 0 ]; then
    warn "Бот не в порядке (состояние: $state). Последние строки лога:"
    printf '%s\n' "$logs" | tail -n 20 >&2
    return 1
  fi
  if [ -n "$problem" ]; then return 1; fi
  say "Бот работает ($(git -C "$DIR" log -1 --format='%h %s'))"
}

install_cli() {  # закреплённые копии: обновляются только повторной установкой
  mkdir -p "$LIB"
  install -m 755 "$DIR/deploy/install.sh" "$LIB/home-office"
  install -m 644 "$DIR/docker-compose.yml" "$LIB/docker-compose.yml"
  ln -sf "$LIB/home-office" /usr/local/bin/home-office
}

autoupdate_on() {
  if has_systemd; then
    cat > "/etc/systemd/system/$UNIT.service" <<EOF
[Unit]
Description=home-office: подтянуть новые коммиты и пересобрать бота
After=network-online.target docker.service
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/home-office update --quiet
EOF
    cat > "/etc/systemd/system/$UNIT.timer" <<EOF
[Unit]
Description=home-office: проверка обновлений каждые 5 минут

[Timer]
OnBootSec=3min
OnUnitActiveSec=5min
RandomizedDelaySec=30

[Install]
WantedBy=timers.target
EOF
    systemctl daemon-reload
    systemctl enable --now "$UNIT.timer" >/dev/null 2>&1
  elif [ -d /etc/cron.d ]; then
    printf '*/5 * * * * root /usr/local/bin/home-office update --quiet >> /var/log/home-office-update.log 2>&1\n' \
      > /etc/cron.d/home-office
  else
    warn "Нет ни systemd, ни cron — автообновление не включено. Обновлять: home-office update"
    return
  fi
  say "Автообновление включено: каждые 5 минут с ветки $BRANCH"
}

autoupdate_off() {
  if has_systemd && [ -f "/etc/systemd/system/$UNIT.timer" ]; then
    systemctl disable --now "$UNIT.timer" >/dev/null 2>&1 || true
  fi
  rm -f /etc/cron.d/home-office
}

need_root() { [ "$(id -u)" -eq 0 ] || die "Нужны права root: запусти через sudo"; }

need_installed() {
  [ -d "$DIR/.git" ] && [ -f "$LIB/docker-compose.yml" ] || die "Бот не установлен. Установка: $INSTALL_HINT"
}

# --- команды ----------------------------------------------------------------
require_deployable() {  # в ветке должен быть деплой (Dockerfile и этот установщик)
  [ -f "$DIR/Dockerfile" ] && [ -f "$DIR/deploy/install.sh" ] ||
    die "В ветке $BRANCH нет Dockerfile/deploy — сервер её не соберёт. Возьми ветку, где они есть."
}

cmd_install() {
  need_root
  ensure_tools
  ensure_docker
  sync_repo
  require_deployable
  save_conf
  install_cli
  configure
  deploy_bot
  if [ "$AUTOUPDATE" = yes ]; then autoupdate_on; else autoupdate_off; fi
  if check_health; then
    printf '\nГотово. Напиши боту /start в Telegram.\n'
  else
    printf '\nУстановка завершена, но бот пока не в порядке — см. предупреждения выше.\n'
  fi
  cat <<EOF
  home-office status     — что запущено и какая версия
  home-office logs       — лог бота (Ctrl+C — выйти)
  home-office config     — поменять токены (например, добавить ключ LTX)
  home-office update     — обновиться сейчас (само делается каждые 5 минут)
  home-office branch X   — переключиться на ветку X
  home-office stop       — остановить (и автообновление)
EOF
}

cmd_update() {
  need_root
  need_installed
  mkdir -p "$(dirname "$LOCK")"
  exec 9> "$LOCK"
  flock -n 9 || exit 0  # уже обновляется
  git -C "$DIR" fetch --quiet origin "$BRANCH"
  local old new bad="$DIR/.git/home-office-bad-commit"
  old=$(git -C "$DIR" rev-parse HEAD)
  new=$(git -C "$DIR" rev-parse "origin/$BRANCH")
  if [ "$old" = "$new" ]; then
    [ "$QUIET" = yes ] || say "Обновлений нет ($(git -C "$DIR" log -1 --format='%h %s'))"
    return
  fi
  if [ "$new" = "$(cat "$bad" 2>/dev/null)" ]; then
    [ "$QUIET" = yes ] || warn "Коммит ${new:0:7} уже не собрался — жду следующего"
    return
  fi
  git -C "$DIR" reset --quiet --hard "$new"
  echo "$(date -Is) обновление ${old:0:7} → ${new:0:7}"
  if ! compose up -d --build --remove-orphans; then
    echo "$new" > "$bad"
    git -C "$DIR" reset --quiet --hard "$old"
    warn "Версия ${new:0:7} не собралась — работает прежняя ${old:0:7}"
    exit 1
  fi
  rm -f "$bad"
  docker image prune -f >/dev/null 2>&1 || true
}

main() {
  STARTED=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  load_conf
  local cmd=install
  case ${1:-} in
    ""|-*) ;;
    *) cmd=$1; shift ;;
  esac
  QUIET=no
  NEW_BRANCH=""
  while [ $# -gt 0 ]; do
    case $1 in
      --branch) BRANCH=${2:?нужно имя ветки}; shift 2 ;;
      --dir) DIR=${2:?нужен путь}; shift 2 ;;
      --repo) REPO_URL=${2:?нужен адрес репозитория}; shift 2 ;;
      --no-autoupdate) AUTOUPDATE=no; shift ;;
      --quiet) QUIET=yes; shift ;;
      *) if [ "$cmd" = branch ] && [ -z "$NEW_BRANCH" ]; then NEW_BRANCH=$1; shift
         else die "Не понимаю аргумент: $1"; fi ;;
    esac
  done

  # значения уходят в /etc/default/home-office, который читается как shell — только безопасные символы
  for v in "$BRANCH" "$NEW_BRANCH" "$DIR" "$REPO_URL"; do
    case $v in *[!A-Za-z0-9._/:@+-]*) die "Недопустимые символы в «$v»" ;; esac
  done

  case $cmd in
    install) cmd_install ;;
    update) cmd_update ;;
    status)
      need_installed
      compose ps
      echo "Версия: $(git -C "$DIR" log -1 --format='%h %s (%cr)') · ветка $BRANCH"
      if has_systemd; then systemctl list-timers "$UNIT.timer" --no-pager 2>/dev/null | head -n 2; fi ;;
    logs) need_installed; compose logs -f --tail 100 bot ;;
    restart) need_root; need_installed; compose restart bot; check_health 8 ;;
    config) need_root; need_installed; configure all; compose up -d --force-recreate bot; check_health 8 ;;
    branch)
      need_root; need_installed
      [ -n "$NEW_BRANCH" ] || die "Укажи ветку: home-office branch <имя>"
      git -C "$DIR" fetch --quiet origin "$NEW_BRANCH" || die "Нет ветки $NEW_BRANCH в $REPO_URL"
      git -C "$DIR" cat-file -e "origin/$NEW_BRANCH:Dockerfile" 2>/dev/null ||
        die "В ветке $NEW_BRANCH нет Dockerfile — сервер её не соберёт. Остаюсь на $BRANCH."
      BRANCH=$NEW_BRANCH
      sync_repo; save_conf; deploy_bot; check_health ;;
    stop) need_root; need_installed; autoupdate_off; compose stop bot; say "Бот остановлен, автообновление выключено" ;;
    start) need_root; need_installed; deploy_bot; if [ "$AUTOUPDATE" = yes ]; then autoupdate_on; fi; check_health ;;
    uninstall)
      need_root; need_installed
      autoupdate_off
      compose down --remove-orphans || true
      rm -f "/etc/systemd/system/$UNIT.service" "/etc/systemd/system/$UNIT.timer" /usr/local/bin/home-office "$CONF"
      rm -rf "$LIB"
      if has_systemd; then systemctl daemon-reload; fi
      say "Бот удалён. Данные и токены остались: $DIR и том Docker home-office_bot-data"
      echo "Стереть совсем: rm -rf '$DIR' && docker volume rm home-office_bot-data" ;;
    *) die "Команды: install | status | logs | restart | update | config | branch <имя> | stop | start | uninstall" ;;
  esac
}

main "$@"
exit
