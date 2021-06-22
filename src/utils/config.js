import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
// import fs from 'fs-extra'
import { app, remote } from 'electron' // 引入remote模块

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录

const adapter = new FileSync(path.join(STORE_PATH, '/config.json')) // 初始化lowdb读写的json文件名以及存储路径

const db = Datastore(adapter) // lowdb接管该文件

export class Configuration {
  getValue (module, key) {
    if (db.has(module).value() === false) {
      db.set(module, {}).write()
    }
    var k = module + '.' + key
    return db.get(k).value()
  }
  setValue (module, key, value) {
    if (db.has(module).value() === false) {
      db.set(module, {}).write()
    }
    var k = module + '.' + key

    return db.set(k, value).write()
  }
}
