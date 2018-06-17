const { app, BrowserWindow } = require("electron")
const fs = require("fs")

/**
 * @type {Electron.BrowserWindow}
 */
let win

/**
 * @type {string}
 */
let musicPath = app.getPath("music")

/**
 * @type {object}
 */
let shared = {
  path: musicPath,
  files: []
}

/**
 * Store all files in music path and sub folders
 */
let getFiles = function (path) {
  // Get all files and folders in path
  fs.readdir(path, function (error, files) {
    if (error) {
      console.log(error);
    } else {
      // For each file and folder in directory
      for (let file of files) {
        // Get path
        let filePath = path + "/" + file;
        // Is a directory?
        if (fs.statSync(filePath).isDirectory()) {
          // Read it's files and folders again
          getFiles(filePath);
        }
        // Is a file and has mp3 ext?
        else if (file.indexOf(".mp3") !== -1) {
          // Store to files
          if (shared.files.length < 10) {
            shared.files.push({
              id: file,
              path: filePath,
              url: "file://" + filePath,
              artist: "Artist",
              title: file
            });
          }
        }
      }
    }
  });
}

app.on("ready", () => {

  // Get all music files
  getFiles(musicPath);

  // Start window
  win = new BrowserWindow({
    width: 480,
    height: 720,
    minWidth: 400,
      minHeight: 300,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    title: "Electro Music",
    icon: "./app/app.png",
    backgroundColor: "#333"
  })

  // Share shared data
  win.shared = shared;

  // Open inspector
  // win.webContents.openDevTools();

  // Load the HTML file
  win.loadFile("./app/app.html")

  // Clear win variable on close
  win.on("closed", () => {
    win = null
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (win === null) {
    createWindow()
  }
})
