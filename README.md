# Wave

A lightweight, unofficial WhatsApp Web client for Linux built with Electron. Focused on performance, security, and native desktop integration.

## Features

- **System Tray Integration** -- Minimize to tray instead of quitting. Click the tray icon to show/hide the window.
- **Unread Badge Count** -- Displays unread message count in the tray tooltip and app badge.
- **Desktop Notifications** -- Native Linux notifications with sound when new messages arrive while the window is hidden or unfocused.
- **Window State Persistence** -- Remembers window size, position, and maximized state across sessions.
- **Single Instance Lock** -- Prevents multiple instances; re-focuses the existing window instead.
- **External Link Handling** -- Links outside WhatsApp Web open in your default browser.
- **Keyboard Shortcuts** -- Built-in shortcuts with no menu bar clutter:
  | Shortcut | Action |
  |---|---|
  | `Ctrl+Q` | Quit |
  | `Ctrl+R` | Reload |
  | `Ctrl+Shift+R` | Hard reload (ignore cache) |
  | `Ctrl+Shift+I` | Toggle DevTools |
  | `Ctrl+=` / `Ctrl++` | Zoom in |
  | `Ctrl+-` | Zoom out |
  | `Ctrl+0` | Reset zoom |
- **Sandboxed & Secure** -- Runs with `nodeIntegration` disabled, `contextIsolation` enabled, and a sandboxed renderer. Only WhatsApp Web URLs are permitted; media and notification permissions are whitelisted.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)

## Installation

```bash
git clone https://github.com/srijxnnn/wave.git
cd wave
npm install
```

## Usage

### Run in development

```bash
npm start
```

### Build an AppImage

```bash
npm run build
```

The packaged AppImage will be output to the `dist/` directory.

## Project Structure

```
wave/
├── assets/
│   └── icon.png        # App icon
├── main.js             # Electron main process
├── package.json
└── README.md
```

## License

[MIT](https://opensource.org/licenses/MIT)

## Author

**Srijan Dhak** -- [GitHub](https://github.com/srijxnnn)
