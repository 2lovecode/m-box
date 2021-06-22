var CryptoJS = require('crypto-js')
export class Crypto {
  constructor (secretKey) {
    this.secretKey = secretKey
  }
  encrypt (data) {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString()
  }
  decrypt (text) {
    var bytes = CryptoJS.AES.decrypt(text, this.secretKey)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
