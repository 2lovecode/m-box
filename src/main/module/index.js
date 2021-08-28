
import * as cs from '../../utils/const'
import {IPCPayload} from '../../utils/ipcpayload'
import {Pass} from './password/index'

var pass = new Pass()

export function Dispatcher () {
  this.deal = function (arg) {
    var operation = ''
    var res = {}
    var data = {}
    if ('operation' in arg) {
      operation = arg.operation
    }
    if ('data' in arg) {
      data = arg.data
    }
    
    switch (operation) {
      case cs.passRecordList:
        res = pass.select()
        break
      case cs.passRecordAdd:
        res = pass.insert(data)
        break
      case cs.passRecordEdit:
        res = pass.update(data)
        break
      case cs.passRecordDel:
        res = pass.delete(data)
        break
    }
    var ipcPayload = new IPCPayload(operation, res)
    return ipcPayload.toJSON()
  }
}
