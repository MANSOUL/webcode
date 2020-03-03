import MySocket from './MySocket'

export default class FileSocket {
  private static instance: MySocket | null = null

  private constructor() {}

  getInstance(url: string) {
    if (!FileSocket.instance) {
      FileSocket.instance = new MySocket(url)
    }
    return FileSocket.instance
  }
}
