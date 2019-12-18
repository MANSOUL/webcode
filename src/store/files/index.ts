import { Reducer } from 'redux'
import {
  FETCH_FILE_DONE,
  FETCH_FILE_ERROR,
  FETCH_FILE_START,
  CHANGE_CURRENT_FILE,
  FilesAction
} from './actions'

export interface FileContent {
  id: string
  relative: string
  content: string
  modified: boolean
  fileName: string
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
      fileName: ''
    }
  )
}

const reducer: Reducer<FilesState> = (
  state: FilesState = initialState,
  action: FilesAction
) => {
  const payload = getPayload(action)
  switch (action.type) {
    case FETCH_FILE_DONE:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        fileContents: [
          ...state.fileContents,
          {
            id: payload.id,
            content: payload.fileContent,
            relative: payload.relative,
            fileName: payload.fileName,
            modified: false
          }
        ],
        currentFileId: payload.id
      }
    case CHANGE_CURRENT_FILE:
      return {
        ...state,
        currentFileId: payload.id
      }
    default:
      return state
  }
}

export default reducer
