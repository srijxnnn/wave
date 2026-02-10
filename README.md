<p align="center">
  <img src="assets/icon.png" alt="Wave" width="128" height="128">
</p>

<h1 align="center">Wave</h1>
<p align="center">
  <strong>A lightweight, unofficial WhatsApp Web client for Linux</strong>
</p>
<p align="center">
  Built with Electron — focused on performance, security, and native desktop integration.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/platform-Linux-1793D1?logo=linux" alt="Platform: Linux">
  <img src="https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron" alt="Electron">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT">
</p>

---

## Features

| Feature                | Description                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **System Tray**        | Minimize to tray instead of quitting. Click the tray icon to show or hide the window.                                                                                                 |
| **Unread Badge**       | Unread message count in the tray tooltip and app badge.                                                                                                                               |
| **Notifications**      | Native Linux notifications with sound when new messages arrive (window hidden or unfocused).                                                                                          |
| **Window State**       | Remembers size, position, and maximized state across sessions.                                                                                                                        |
| **Single Instance**    | Prevents multiple instances; re-focuses the existing window instead.                                                                                                                  |
| **External Links**     | Links outside WhatsApp Web open in your default browser.                                                                                                                              |
| **Keyboard Shortcuts** | Built-in shortcuts with no menu bar clutter (see table below).                                                                                                                        |
| **Security**           | Runs with `nodeIntegration` disabled, `contextIsolation` enabled, and a sandboxed renderer. Only WhatsApp Web URLs are permitted; media and notification permissions are whitelisted. |

### Keyboard shortcuts

| Shortcut            | Action                     |
| ------------------- | -------------------------- |
| `Ctrl+Q`            | Quit                       |
| `Ctrl+R`            | Reload                     |
| `Ctrl+Shift+R`      | Hard reload (ignore cache) |
| `Ctrl+Shift+I`      | Toggle DevTools            |
| `Ctrl+=` / `Ctrl++` | Zoom in                    |
| `Ctrl+-`            | Zoom out                   |
| `Ctrl+0`            | Reset zoom                 |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)

---

## Installation

### Quick install _(recommended)_

Clone the repo and run the install script. It will install dependencies, build the AppImage, copy it to `~/.local/bin/`, and create a `.desktop` entry so Wave appears in your application launcher.

```bash
git clone https://github.com/srijxnnn/wave.git
cd wave
chmod +x install.sh
./install.sh
```

### Manual install

```bash
git clone https://github.com/srijxnnn/wave.git
cd wave
npm install
npm run build
```

Copy the AppImage from `dist/` to your preferred location and run it.

---

## Usage

**Run in development:**

```bash
npm start
```

**Build an AppImage:**

```bash
npm run build
```

The packaged AppImage is written to the `dist/` directory.

---

## Uninstall

Run the uninstall script to remove the AppImage and desktop entry:

```bash
chmod +x uninstall.sh
./uninstall.sh
```

You will be prompted whether to also remove user data in `~/.config/Wave`.

---

## Project structure

```
wave/
├── assets/
│   └── icon.png     # App icon
├── main.js          # Electron main process
├── package.json
└── README.md
```

---

## License

[MIT](https://opensource.org/licenses/MIT)

## Author

**Srijan Dhak** · [GitHub](https://github.com/srijxnnn)
