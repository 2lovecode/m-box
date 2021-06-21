import db from '../db'

const PassTabelName = 'password'

export class PassRecord {
  constructor (id, name, pass) {
    this.id = id
    this.name = name
    this.pass = pass
  }
  obtainAllPassRecords () {
    createPassTableIfNotExsist()
    return db.get(PassTabelName).value()
  }
  insertPassRecord () {
    createPassTableIfNotExsist()
    var data = {
      id: this.id,
      name: this.name,
      pass: this.pass
    }
    return db.get(PassTabelName).push(data).write()
  }
  updatePassRecord () {
    createPassTableIfNotExsist()
  }
}

function createPassTableIfNotExsist () {
  if (db.has(PassTabelName).value() === false) {
    db.set(PassTabelName, []).write()
  }
}
