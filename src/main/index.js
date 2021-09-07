'use strict'

import { app, BrowserWindow } from 'electron'
import '../renderer/store'

import {Dispatcher} from './module/index'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

/**
 * 创建主窗口
 */
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const { ipcMain, Menu } = require('electron')

function createMainWindow () {
  Menu.setApplicationMenu(null)
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 650,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    for (var x in windowPool) {
      if (windowPool[x] != null) {
        windowPool[x].close()
      }
    }
    mainWindow = null
  })
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

let windowPool = []

function createWindow (name, path) {
  /**
   * Initial window options
   */
  windowPool[name] = new BrowserWindow({
    height: 650,
    useContentSize: true,
    width: 1000,
    x: 300,
    y: 200
  })

  windowPool[name].loadURL(path)

  windowPool[name].on('closed', () => {
    windowPool[name] = null
  })
}

function calcPath (path) {
  return process.env.NODE_ENV === 'development' ? `http://localhost:9080#${path}` : `file://${__dirname}/index.html#${path}`
}

/**
 * 通信处理
 */

// 处理业务请求公共入口
ipcMain.on('mbox-request', (event, arg) => {
  var dispatcher = new Dispatcher()
  event.sender.send('mbox-response', dispatcher.deal(arg))
})

// 创建窗口
ipcMain.on('mbox-create-window', (event, arg) => {
  if ('name' in arg && 'path' in arg) {
    if (windowPool.hasOwnProperty(arg['name']) && windowPool[arg['name']] != null) {
      // 防止重复打开同一功能窗口
      windowPool[arg['name']].focus()
    } else {
      let realPath = calcPath(arg['path'])
      createWindow(arg['name'], realPath)
    }
  }
})

// 关闭窗口
ipcMain.on('mbox-close-window', (event, arg) => {
  if ('name' in arg) {
    switch (arg['name']) {
      case 'main':
        mainWindow.close()
        break
      default:
        if (windowPool.hasOwnProperty(arg['name']) && windowPool[arg['name']] != null) {
          windowPool[arg['name']].close()
        }
    }
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
