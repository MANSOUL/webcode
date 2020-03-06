import MySocket from '@src/utils/MySocket'
import { FileContent } from '@src/store/files'
import { FILE_SOCKET_URL } from '@src/config/project'

export default class FileSocket {
  private static instance: MySocket | null = null

  private constructor() {}

  public static getInstance() {
    if (!FileSocket.instance) {
      FileSocket.instance = new MySocket(FILE_SOCKET_URL)
    }
    return FileSocket.instance
  }

  send(file: FileContent, info: {}) {}

  addEvent() {}
}

FileSocket.getInstance()
