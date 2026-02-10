import { app, BrowserWindow, Menu, Tray, shell, session } from "electron";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Single instance lock
// ---------------------------------------------------------------------------
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------
let mainWindow = null;
let tray = null;
let isQuitting = false;

// ---------------------------------------------------------------------------
// Window state persistence
// ---------------------------------------------------------------------------
const STATE_FILE = join(app.getPath("userData"), "window-state.json");

function loadWindowState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return { width: 1000, height: 800 };
  }
}

let savedBounds = loadWindowState();

function saveWindowState(win) {
  if (!win || win.isDestroyed()) return;
  if (!win.isMaximized()) {
    savedBounds = { ...win.getBounds(), isMaximized: false };
  } else {
    savedBounds = { ...savedBounds, isMaximized: true };
  }
  try {
    writeFileSync(STATE_FILE, JSON.stringify(savedBounds));
  } catch {
    /* ignore write errors */
  }
}

// ---------------------------------------------------------------------------
// Main window
// ---------------------------------------------------------------------------
function createWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: savedBounds.width,
    height: savedBounds.height,
    x: savedBounds.x,
    y: savedBounds.y,
    icon: join(__dirname, "assets", "icon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      partition: "persist:wave",
      spellcheck: true,
    },
  });

  if (savedBounds.isMaximized) mainWindow.maximize();

  // Chrome user-agent so WhatsApp Web loads correctly
  const ua =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 " +
    `(KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`;
  mainWindow.webContents.setUserAgent(ua);

  mainWindow.loadURL("https://web.whatsapp.com");

  // --- Window state save on resize / move ---
  mainWindow.on("resize", () => saveWindowState(mainWindow));
  mainWindow.on("move", () => saveWindowState(mainWindow));

  // --- Close to tray ---
  mainWindow.on("close", (e) => {
    saveWindowState(mainWindow);
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  // --- Unread badge from page title ---
  mainWindow.webContents.on("page-title-updated", (_e, title) => {
    const match = title.match(/\((\d+)\)/);
    const count = match ? parseInt(match[1], 10) : 0;
    if (tray) {
      tray.setToolTip(count > 0 ? `Wave (${count} unread)` : "Wave");
    }
    app.setBadgeCount(count);
  });

  // --- External links in default browser ---
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith("https://web.whatsapp.com")) {
      shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  mainWindow.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("https://web.whatsapp.com")) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });

  // --- Keyboard shortcuts (no menu bar needed) ---
  mainWindow.webContents.on("before-input-event", (_e, input) => {
    if (input.type !== "keyDown") return;
    const ctrl = input.control || input.meta;
    if (ctrl && input.key === "q") {
      isQuitting = true;
      app.quit();
    } else if (ctrl && input.shift && input.key === "I") {
      mainWindow.webContents.toggleDevTools();
    } else if (ctrl && input.shift && input.key === "R") {
      mainWindow.webContents.reloadIgnoringCache();
    } else if (ctrl && !input.shift && input.key === "r") {
      mainWindow.webContents.reload();
    } else if (ctrl && (input.key === "=" || input.key === "+")) {
      mainWindow.webContents.setZoomLevel(
        mainWindow.webContents.getZoomLevel() + 0.5,
      );
    } else if (ctrl && input.key === "-") {
      mainWindow.webContents.setZoomLevel(
        mainWindow.webContents.getZoomLevel() - 0.5,
      );
    } else if (ctrl && input.key === "0") {
      mainWindow.webContents.setZoomLevel(0);
    }
  });

  // --- Media & notification permissions ---
  session
    .fromPartition("persist:wave")
    .setPermissionRequestHandler((webContents, permission, callback) => {
      const allowed = ["media", "notifications", "mediaKeySystem"];
      const url = webContents.getURL();
      if (
        url.startsWith("https://web.whatsapp.com") &&
        allowed.includes(permission)
      ) {
        callback(true);
      } else {
        callback(false);
      }
    });
}

// ---------------------------------------------------------------------------
// System tray
// ---------------------------------------------------------------------------
function createTray() {
  tray = new Tray(join(__dirname, "assets", "icon.png"));
  tray.setToolTip("Wave");

  const menu = Menu.buildFromTemplate([
    {
      label: "Show / Hide",
      click: () => {
        if (mainWindow?.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow?.show();
          mainWindow?.focus();
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(menu);

  tray.on("click", () => {
    if (mainWindow?.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow?.show();
      mainWindow?.focus();
    }
  });
}

// ---------------------------------------------------------------------------
// App lifecycle
// ---------------------------------------------------------------------------

// Focus existing window when a second instance is attempted
app.on("second-instance", () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    if (!mainWindow.isVisible()) mainWindow.show();
    mainWindow.focus();
  }
});

// Ensure close-to-tray works even when the OS initiates quit (e.g. logout)
app.on("before-quit", () => {
  isQuitting = true;
});

app.whenReady().then(() => {
  createWindow();
  createTray();
});
