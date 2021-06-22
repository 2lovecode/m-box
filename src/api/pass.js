import db from '../db'

const PassTabelName = 'password'

export class PassRecord {
  constructor (id, name, pass) {
    this.id = id
    this.name = name
    this.pass = pass
    if (db.has(PassTabelName).value() === false) {
      db.set(PassTabelName, []).write()
    }
  }
  obtainAllPassRecords () {
    return db.get(PassTabelName).value()
  }
  insertPassRecord () {
    var data = {
      name: this.name,
      pass: this.pass
    }
    if (this.id !== '') {
      var record = db.get(PassTabelName).getById(this.id).value()
      if (record !== undefined) {
        return this.updatePassRecord()
      }
    }
    return db.get(PassTabelName).insert(data).write()
  }
  updatePassRecord () {
    var data = {
      name: this.name,
      pass: this.pass
    }
    return db.get(PassTabelName).find({ id: this.id }).assign(data).write()
  }
}
