const DashButton = require('dash-button')
const MorseJp    = require('morse-jp')
const C          = require('colors')
const LineNotify = require('./line-notify')
const Setting    = require('./setting')

const tonButton      = new DashButton(Setting.TON_BUTTON_MAC_ADDRESS)
const tsuButton      = new DashButton(Setting.TSU_BUTTON_MAC_ADDRESS)
const spaceButton    = new DashButton(Setting.SPACE_BUTTON_MAC_ADDRESS)

const morse = new MorseJp()

let morseCode = ''
let timeoutId = ''

;(() => {
  console.log(C.blue('Listening'))

  tonButton.addListener (() => {
    appendMorseCode(Setting.TON)
    setTimer()
  })

  tsuButton.addListener (() => {
    appendMorseCode(Setting.TSU)
    setTimer()
  })

  spaceButton.addListener (() => {
    appendMorseCode(Setting.SPACE)
    setTimer()
  })
})()

function appendMorseCode (char) {
  char = char.replace(new RegExp('\\\\', 'g'), '')
  console.log(`CODE:${morseCode}${C.green(char)}`)
  morseCode += char
}

function setTimer () {
  clearTimeout(timeoutId)
  // 一定時間入力がないとき出力する
  timeoutId = setTimeout(() => {
    morse2word(),
    morseCode = ''
  }, Setting.TIMEOUT_MS)
}

function morse2word () {
  let message = morse.morse2word(morseCode, {dot: Setting.TON, dash: Setting.TSU, separate: Setting.SPACE})
  console.log(`WORD:${C.green(message)}`)
  notify(message)
}

function notify(message) {
  line = new LineNotify(Setting.LINE_NOTIFY_API_TOKEN, message)
  line.notify()
}