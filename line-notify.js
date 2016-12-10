const exec = require('child_process').exec
const C    = require('colors')

class LineNotify {
  constructor(apiToken, message) {
    this.url = 'https://notify-api.line.me/api/notify'
    this.apiToken = apiToken
    this.message = message
  }

  notify() {
    let command = `curl -X POST -H 'Authorization: Bearer ${this.apiToken}' -F 'message=${this.message}' ${this.url}`
    exec(command, (error, stdout) => {
      let res = JSON.parse(stdout)
      if (res.status === 200) {
        console.log(C.green(`status:${res.status}\nmessage:${res.message}`))
      } else {
        console.log(C.red(`status:${res.status}\nmessage:${res.message}`))
      }

      if (error !== null) {
        console.log(C.red(`error:${error}`))
      }
    })
  }
}

module.exports = LineNotify