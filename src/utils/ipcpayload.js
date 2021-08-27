export class IPCPayload {
  constructor (operation, data) {
    this.operation = operation
    this.data = data
  }
  toJSON () {
    return {
      operation: this.operation,
      data: this.data
    }
  }
}
