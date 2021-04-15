function Caculator () {
  this.Test = function () {
    console.log('Hello, Good!')
  }
  this.push = function (arg) {
    switch (arg) {
      case '=':
        console.log('=======')
        break
      default:
        console.log(arg)
        break
    }
    return 'good'
  }
}
module.exports = Caculator
