'use strict'

import { app, BrowserWindow } from 'electron'
import '../renderer/store'
import db from '../db'
const Caculator = require('./caculator/index')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const { ipcMain } = require('electron')

ipcMain.on('caculator-send', (event, arg) => {
  var cal = new Caculator()
  event.sender.send('caculator-reply', cal.push(arg))
})

// 密码管理模块
// 读取
ipcMain.on('pass-manage-select', (event, arg) => {
  event.sender.send('pass-manage-select-reply', db.get('posts').value())
})
// 新建
ipcMain.on('pass-manage-insert', (event, arg) => {
  if (db.has('posts').value() === false) {
    db.set('posts', []).write()
  }
  var data = {
    id: arg.id,
    name: arg.name,
    pass: arg.pass
  }
  console.log(data)
  console.log(db.get('posts').push(data).write())
  event.sender.send('pass-manage-insert-reply', 1)
})
// 更新
ipcMain.on('pass-manage-update', (event, arg) => {
  console.log(arg)
  event.sender.send('pass-manage-update-reply', db.get('posts').find({ id: arg.id }).assign(arg).write())
})

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
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
