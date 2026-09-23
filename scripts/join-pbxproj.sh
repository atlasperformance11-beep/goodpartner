#!/usr/bin/env bash
# Join split project.pbxproj parts (Linux MCP push workaround). Run from repo root on Mac/Linux:
set -euo pipefail
DIR=ios/App/App.xcodeproj
cat "$DIR/project.pbxproj.part0" "$DIR/project.pbxproj.part1" "$DIR/project.pbxproj.part2" > "$DIR/project.pbxproj"
rm -f "$DIR/project.pbxproj.part0" "$DIR/project.pbxproj.part1" "$DIR/project.pbxproj.part2"
echo "Wrote $DIR/project.pbxproj ($(wc -c < "$DIR/project.pbxproj") bytes)"
