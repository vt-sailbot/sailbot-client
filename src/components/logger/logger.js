const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

var loggerWindow = null;

function createLoggerWindow() {
    loggerWindow = new BrowserWindow({ width: 800, height: 600});
    loggerWindow.loadURL(`file://${__dirname}/components/logger/logger.html`);
    loggerWindow.on('closed', () => {
        loggerWindow = null;
    });
}

// TODO: replace event close to be hide. 
function toggleLoggerWindow() {
    if (loggerWindow === null) {
        createLoggerWindow();
    } else {
        loggerWindow
    }
}