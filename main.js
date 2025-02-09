const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // Load preload script
            contextIsolation: true, // Ensure security
            enableRemoteModule: false,
            nodeIntegration: false,
        },
    });

    mainWindow.loadURL("http://localhost:5173").catch(() => {
        mainWindow.loadFile(path.join(__dirname, "frontend/build/index.html"));
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) app.whenReady();
    });
});

// Handle request to open a new window for word details
ipcMain.on("open-word-details", (event, word) => {
    let wordWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        title: `Dictionary: ${word}`,
        webPreferences: {
            nodeIntegration: false,
        }
    });

    wordWindow.loadURL(`https://dictionary.cambridge.org/dictionary/english/${word}`);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
