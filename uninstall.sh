#!/bin/bash

APP_NAME="wave"
INSTALL_PATH="$HOME/.local/bin/$APP_NAME"
DESKTOP_FILE="$HOME/.local/share/applications/wave.desktop"
CONFIG_DIR="$HOME/.config/Wave"
ICON_DIR="$HOME/.local/share/icons"

echo "Removing Wave..."

rm -f "$INSTALL_PATH"
rm -f "$DESKTOP_FILE"
rm -f "$ICON_DIR/$APP_NAME.png"

echo "Remove user data? (y/N)"
read -r response

if [[ "$response" == "y" || "$response" == "Y" ]]; then
  rm -rf "$CONFIG_DIR"
  echo "User data removed."
fi

echo "Wave uninstalled."
