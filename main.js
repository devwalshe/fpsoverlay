const { app, BrowserWindow } = require('electron');
const { getFPS } = require('./get-fps');

let fpsOverlayWindow;

function createFPSOverlayWindow() {
  fpsOverlayWindow = new BrowserWindow({
    width: 200,
    height: 50,
    alwaysOnTop: true,
    frame: false,
    transparent: true,
  });

  fpsOverlayWindow.loadFile('index.html');

  fpsOverlayWindow.on('readyToShow', () => {
    fpsOverlayWindow.moveWindowToTheTop();
    updateFPSOverlay();
  });

  fpsOverlayWindow.on('closed', () => {
    fpsOverlayWindow = null;
  });
}

function updateFPSOverlay() {
  const fpsData = getFPS();
  const fpsHTML = `
    <div>
      FPS: ${fpsData.fps}
    </div>
    <div>
      1% Low: ${fpsData.onePercentLow}
    </div>
    <div>
      0.1% Low: ${fpsData.zeroPointOnePercentLow}
    </div>
  `;

  fpsOverlayWindow.webContents.send('update-fps', fpsHTML);
}

app.on('ready', () => {
  createFPSOverlayWindow();
});

setInterval(updateFPSOverlay, 1000);
