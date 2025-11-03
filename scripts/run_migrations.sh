#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage: scripts/run_migrations.sh [up|down]

Applies or rolls back SQL migrations against the database pointed to by $DATABASE_URL.

Environment variables:
  DATABASE_URL   PostgreSQL connection string (required)

Examples:
  DATABASE_URL=postgres://user:pass@localhost:5432/db scripts/run_migrations.sh up
  DATABASE_URL=postgres://user:pass@localhost:5432/db scripts/run_migrations.sh down
USAGE
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

ACTION=$(echo "$1" | tr '[:upper:]' '[:lower:]')

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set. Please export it before running the script." >&2
  exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "psql command not found. Install PostgreSQL client tools to continue." >&2
  exit 1
fi

case "$ACTION" in
  up)
    mapfile -t migration_files < <(ls migrations/*.sql | sort)
    ;;
  down)
    mapfile -t migration_files < <(ls migrations/*.sql | sort -r)
    ;;
  *)
    echo "Unknown action: $ACTION" >&2
    usage
    exit 1
    ;;
esac

if [[ ${#migration_files[@]} -eq 0 ]]; then
  echo "No migration files found in the migrations/ directory." >&2
  exit 1
fi

execute_sql_segment() {
  local file="$1"
  local action="$2"

  local sql
  sql=$(awk -v action="$action" '
    BEGIN { capture=0 }
    tolower($0) ~ /^--[[:space:]]*migrate:(up|down)/ {
      capture = (tolower($0) == "-- migrate:" action);
      next;
    }
    capture { print }
  ' "$file")

  if [[ -z "$sql" ]]; then
    echo "Skipping $file (no -- migrate:$action section)"
    return 0
  fi

  local tmp
  tmp=$(mktemp)
  printf '%s\n' "$sql" > "$tmp"

  echo "Running $action migration: $file"
  PGPASSWORD="${PGPASSWORD:-}" psql "$DATABASE_URL" --set ON_ERROR_STOP=1 --file="$tmp" --quiet

  rm -f "$tmp"
}

for file in "${migration_files[@]}"; do
  execute_sql_segment "$file" "$ACTION"
done

echo "Migrations ($ACTION) completed successfully."
