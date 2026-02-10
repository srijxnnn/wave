#!/bin/bash

APP_NAME="wave"
INSTALL_PATH="$HOME/.local/bin/$APP_NAME"
DESKTOP_FILE="$HOME/.local/share/applications/wave.desktop"
CONFIG_DIR="$HOME/.config/Wave"

echo "Removing Wave..."

rm -f "$INSTALL_PATH"
rm -f "$DESKTOP_FILE"

echo "Remove user data? (y/N)"
read -r response

if [[ "$response" == "y" || "$response" == "Y" ]]; then
  rm -rf "$CONFIG_DIR"
  echo "User data removed."
fi

echo "Wave uninstalled."
