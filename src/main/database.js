import { Low, JSONFile } from 'lowdb'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron'

const APP = process.type === 'renderer' ? remote.app : app

const STORE_PATH = APP.getPath('userData')

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH)
  }
}

// Use JSON file for storage
const file = path.join(STORE_PATH, '/data.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

export default db
