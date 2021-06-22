import Datastore from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
// import fs from 'fs-extra'
import { app, remote } from 'electron' // 引入remote模块
import { Crypto } from '../utils/crypto'
import { Configuration } from '../utils/config'
const lodashId = require('lodash-id')

const APP = process.type === 'renderer' ? remote.app : app // 根据process.type来分辨在哪种模式使用哪种模块

const STORE_PATH = APP.getPath('userData') // 获取electron应用的用户目录
console.log(path.join(STORE_PATH, '/data.json'))

const config = new Configuration()
if (config.getValue('pass', 'secretKey') === undefined) {
  config.setValue('pass', 'secretKey', 'm81Ag_;HP}eSLX!D]tlo-4=Zvr{|j.fnsT`z:kG?6aQ9<,W"w&yVqOM%7R@^~Y+U')
}

const crypto = new Crypto(config.getValue('pass', 'secretKey'))
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'), {
  serialize: (data) => crypto.encrypt(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(crypto.decrypt(data))
}) // 初始化lowdb读写的json文件名以及存储路径

const db = Datastore(adapter) // lowdb接管该文件
db._.mixin(lodashId)

export default db // 暴露出去
