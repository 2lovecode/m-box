import db from '../db'

const TabelName = "password"

export class PassRecord {
  constructor(id, name, pass) {
    this.id = id;
    this.name = name;
    this.pass = pass;
  }
}

export function obtainAllPassRecords () {
    if (db.has(TabelName).value() === false) {
      db.set(TabelName, []).write()
    }
    return db.get(TabelName).value()
}

export function insertPassRecord (record) {

}
  
export function updatePassRecord () {

}


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