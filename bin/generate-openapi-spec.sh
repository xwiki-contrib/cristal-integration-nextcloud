#!/usr/bin/env bash
#
# Wraps the nextcloud/openapi-extractor "generate-spec" binary so that the
# absence of any OpenAPI-documented route or capability is treated as a
# no-op instead of a build failure. Once routes/capabilities are declared
# again, generate-spec runs and is enforced as usual.
set -uo pipefail

output=$(generate-spec "$@" 2>&1)
status=$?

printf '%s\n' "$output"

if [ "$status" -eq 0 ]; then
	exit 0
fi

if printf '%s\n' "$output" | grep -q 'No routes or capabilities defined'; then
	echo
	echo 'No OpenAPI routes or capabilities are defined yet, skipping OpenAPI spec generation.'
	exit 0
fi

exit "$status"
