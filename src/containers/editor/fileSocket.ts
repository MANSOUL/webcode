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

  public static send(
    relative: string,
    project: string,
    type: 'edit' | 'save',
    data?: any
  ) {
    const ws = FileSocket.getInstance()
    ws && ws.send(JSON.stringify({ relative, project, type, change: data }))
  }

  public static on(listener: (msg: MessageEvent) => void) {
    const ws = FileSocket.getInstance()
    if (ws) {
      ws.onMessage(listener)
    }
  }
}

FileSocket.getInstance()
