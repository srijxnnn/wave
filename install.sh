#!/bin/bash
set -e  # stop on error

APP_NAME="wave"
INSTALL_DIR="$HOME/.local/bin"
DESKTOP_FILE="$HOME/.local/share/applications/wave.desktop"
ICON_DIR="$HOME/.local/share/icons"

if ! command -v npm &> /dev/null; then
  echo "npm not installed. Please install Node.js first."
  exit 1
fi

echo "Installing dependencies..."
npm install

echo "Building app..."
npm run build

echo "Installing AppImage..."
mkdir -p "$INSTALL_DIR"
cp dist/*.AppImage "$INSTALL_DIR/$APP_NAME"
chmod +x "$INSTALL_DIR/$APP_NAME"

mkdir -p "$(dirname "$DESKTOP_FILE")"

mkdir -p "$ICON_DIR"
cp "$PWD/assets/icon.png" "$ICON_DIR/$APP_NAME.png"

cat > "$DESKTOP_FILE" <<EOL
[Desktop Entry]
Name=Wave
Exec=$INSTALL_DIR/$APP_NAME
Comment=Lightweight, unofficial WhatsApp Web client for Linux
Icon=$ICON_DIR/wave.png
Type=Application
Categories=Network;
Terminal=false
EOL



echo "Wave installed successfully!"
