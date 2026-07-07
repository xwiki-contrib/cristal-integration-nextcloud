#!/usr/bin/env bash
#
# See the LICENSE file distributed with this work for additional
# information regarding copyright ownership.
#
# This is free software; you can redistribute it and/or modify it
# under the terms of the GNU Lesser General Public License as
# published by the Free Software Foundation; either version 2.1 of
# the License, or (at your option) any later version.
#
# This software is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this software; if not, write to the Free
# Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
# 02110-1301 USA, or see the FSF site: http://www.fsf.org.

# Starts a throwaway Nextcloud instance in Docker with the Cristal app
# (this checkout, front-end already built) mounted and enabled.
# Admin credentials: admin / admin.

set -euo pipefail

NEXTCLOUD_VERSION="${1:?Usage: start-nextcloud.sh <nextcloud-major-version>}"
CONTAINER_NAME="${NEXTCLOUD_CONTAINER_NAME:-nextcloud-cristal}"
PORT="${NEXTCLOUD_PORT:-8080}"
APP_DIR="$(cd "$(dirname "$0")/../.." && pwd)"

# The official image reads apps from /var/www/html/custom_apps (declared in its
# apps.config.php as its writable apps path) and its entrypoint skips that
# directory when populating the server, so the bind mounts survive the
# container initialization. custom_apps itself must be writable by www-data or
# the Nextcloud installer aborts, hence the world-writable staging directory;
# the app is nested inside it read-only, under a directory named after the app
# id (cristal).
CUSTOM_APPS_DIR="${TMPDIR:-/tmp}/custom-apps-$CONTAINER_NAME"
mkdir -p "$CUSTOM_APPS_DIR"
chmod 0777 "$CUSTOM_APPS_DIR"

docker run -d --name "$CONTAINER_NAME" -p "$PORT:80" \
  -e SQLITE_DATABASE=nextcloud \
  -e NEXTCLOUD_ADMIN_USER=admin -e NEXTCLOUD_ADMIN_PASSWORD=admin \
  -e NEXTCLOUD_TRUSTED_DOMAINS=localhost \
  -v "$CUSTOM_APPS_DIR:/var/www/html/custom_apps" \
  -v "$APP_DIR:/var/www/html/custom_apps/cristal:ro" \
  "nextcloud:$NEXTCLOUD_VERSION"

echo "Waiting for Nextcloud $NEXTCLOUD_VERSION to be installed (image pull + install can take a few minutes)..."
for _ in $(seq 1 150); do
  if curl -sf "http://localhost:$PORT/status.php" | grep -q '"installed":true'; then
    installed=1
    break
  fi
  sleep 2
done
if [ -z "${installed:-}" ]; then
  echo "Nextcloud did not become ready in time" >&2
  docker logs "$CONTAINER_NAME" >&2
  exit 1
fi

# The first-run wizard modal would sit on top of the UI in tests.
docker exec -u www-data "$CONTAINER_NAME" php occ app:disable firstrunwizard || true
# --force bypasses the min/max Nextcloud version compatibility check.
docker exec -u www-data "$CONTAINER_NAME" php occ app:enable --force cristal

echo "Nextcloud $NEXTCLOUD_VERSION ready on http://localhost:$PORT (admin/admin)"
