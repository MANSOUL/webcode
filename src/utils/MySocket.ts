export interface MySocketOptions {
  reconnectTimes: number
  retryDuration: number
}

const initOptions = {
  reconnectTimes: 30,
  retryDuration: 3000
}

export default class MySocket {
  options: MySocketOptions
  ws: WebSocket | null = null
  url: string
  protocol: string | undefined
  reconnectTimes: number
  retryDuration: number
  reconnectTimer: any
  messageCallback: Function[] = []
  constructor(
    url: string,
    options: MySocketOptions = initOptions,
    protocol?: string | undefined
  ) {
    this.url = url
    this.protocol = protocol
    this.options = Object.assign({}, initOptions, options)
    this.reconnectTimes = this.options.reconnectTimes
    this.retryDuration = this.options.retryDuration
    this.connect()
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url, this.protocol)
      this.bindEvent()
    } catch (error) {
      console.log('init error.', error)
      this.reconnect()
    }
  }

  reconnect() {
    if (this.reconnectTimes === 0) {
      console.log('retry times out.')
      return
    }
    this.reconnectTimes--
    console.log(
      `try to reconnect after ${this.retryDuration}ms, reconnect time: ${this
        .options.reconnectTimes - this.reconnectTimes}`
    )
    clearTimeout(this.reconnectTimer)
    this.reconnectTimer = setTimeout(() => this.connect(), this.retryDuration)
  }

  heartbeat() {}

  close() {
    this.ws && this.ws.close()
  }

  send(data: any) {
    this.ws && this.ws.send(data)
  }

  bindEvent() {
    if (this.ws) {
      this.ws.addEventListener('open', () => {
        console.log('socket opened.')
        this.reconnectTimes = this.options.reconnectTimes
      })
      this.ws.addEventListener('close', () => {
        console.log('socket closed.')
        this.reconnect()
      })
      this.ws.addEventListener('error', error => {
        console.error('socket error.', error)
        this.close()
      })
      this.ws.addEventListener('message', msg => this.handleMessage(msg))
    }
  }

  handleMessage(message: MessageEvent) {
    this.messageCallback.forEach(cb => cb(message))
  }

  onMessage(cb: (msg: MessageEvent) => void) {
    this.messageCallback.push(cb)
  }
}
