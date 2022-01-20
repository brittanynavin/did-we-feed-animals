const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })

    win.loadFile('index.html')
    win.webContents.openDevTools()
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // quitting the app when no windows are open on non-macOS platforms
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})