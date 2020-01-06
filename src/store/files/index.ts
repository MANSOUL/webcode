import { Reducer } from 'redux'
import {
  FETCH_FILE_DONE,
  FETCH_FILE_ERROR,
  FETCH_FILE_START,
  CHANGE_CURRENT_FILE,
  FilesAction,
  FILE_NEW_FILE,
  FILE_CLOSE_FILE,
  FILE_MODIFY_FILE,
  FILE_SAVE_FILE
} from './actions'
import { getFileIndex } from './util'

export interface FileContent {
  id: string
  relative: string
  content: string
  modified: boolean
  fileName: string
  loading: boolean
  type: 'text' | 'image'
}

export interface FilesState {
  loading: boolean
  error: boolean
  errorMessage: string | undefined
  fileContents: FileContent[]
  currentFileId: string
}

const initialState: FilesState = {
  loading: false,
  error: false,
  errorMessage: '',
  fileContents: [],
  currentFileId: ''
}

const getPayload = (action: FilesAction) => {
  return (
    action.payload || {
      errorMessage: '',
      relative: '',
      fileContent: '',
      id: '',
      fileName: '',
      newFile: {},
      type: 'text'
    }
  )
}

const reducer: Reducer<FilesState> = (
  state: FilesState = initialState,
  action: FilesAction
) => {
  const payload = getPayload(action)
  let index = -1
  let currentFile = null
  switch (action.type) {
    case FETCH_FILE_START:
      return {
        ...state,
        fileContents: [
          ...state.fileContents,
          {
            id: payload.id,
            content: payload.fileContent || '',
            relative: payload.relative,
            fileName: payload.fileName,
            modified: false,
            loading: true,
            type: payload.type
          }
        ],
        currentFileId: payload.id
      }
    case FETCH_FILE_DONE:
      index = getFileIndex(state.fileContents, payload.id)
      currentFile = state.fileContents[index]
      return {
        ...state,
        fileContents: [
          ...state.fileContents.slice(0, index),
          {
            ...currentFile,
            content: payload.fileContent,
            loading: false
          },
          ...state.fileContents.slice(index + 1)
        ],
        currentFileId: payload.id
      }
    case FILE_NEW_FILE:
      const newFile = payload.newFile
      return {
        ...state,
        fileContents: [
          ...state.fileContents,
          {
            ...newFile,
            modified: false,
            loading: false
          }
        ],
        currentFileId: newFile.id
      }
    case CHANGE_CURRENT_FILE:
      return {
        ...state,
        currentFileId: payload.id
      }
    case FILE_CLOSE_FILE:
      index = getFileIndex(state.fileContents, payload.id)
      if (index === -1) return state
      currentFile = state.fileContents[index]
      let nextFile = null
      // 如果关闭的当前打开的文件则需要重新设置active
      if (state.currentFileId === currentFile.id) {
        nextFile =
          index === 0
            ? state.fileContents[index + 1]
            : state.fileContents[index - 1]
      }
      return {
        ...state,
        fileContents: [
          ...state.fileContents.slice(0, index),
          ...state.fileContents.slice(index + 1)
        ],
        currentFileId: nextFile ? nextFile.id : state.currentFileId
      }
    case FILE_MODIFY_FILE:
      index = getFileIndex(state.fileContents, payload.id)
      currentFile = state.fileContents[index]
      return {
        ...state,
        fileContents: [
          ...state.fileContents.slice(0, index),
          {
            ...currentFile,
            content: payload.fileContent,
            modified: true
          },
          ...state.fileContents.slice(index + 1)
        ]
      }
    case FILE_SAVE_FILE:
      index = getFileIndex(state.fileContents, payload.id)
      currentFile = state.fileContents[index]
      return {
        ...state,
        fileContents: [
          ...state.fileContents.slice(0, index),
          {
            ...currentFile,
            modified: false
          },
          ...state.fileContents.slice(index + 1)
        ]
      }
    default:
      return state
  }
}

export default reducer
