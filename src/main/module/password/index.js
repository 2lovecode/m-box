import { PassRecord } from '../../../api/pass'

// 密码管理模块
// 读取
export class Pass {
  constructor () {
    this.name = 'pass'
  }

  select () {
    var record = new PassRecord()
    return record.obtainAllPassRecords()
  }

  insert (arg) {
    var record = new PassRecord(arg.id, arg.item, arg.name, arg.pass)

    return record.insertPassRecord()
  }

  update (arg) {
    var record = new PassRecord(arg.id, arg.item, arg.name, arg.pass)
    return record.updatePassRecord()
  }

  delete (arg) {
    var record = new PassRecord(arg.id)
    return record.deletePassRecord()
  }
}
