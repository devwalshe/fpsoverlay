const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('update-fps', (event, fpsHTML) => {
  const fpsOverlayElement = document.getElementById('fps-overlay');
  fpsOverlayElement.innerHTML = fpsHTML;
});
