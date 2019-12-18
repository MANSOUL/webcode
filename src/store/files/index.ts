import { Reducer } from 'redux'
import {
  FETCH_FILE_DONE,
  FETCH_FILE_ERROR,
  FETCH_FILE_START,
  FilesAction
} from './actions'

export interface FileContent {
  id: string
  relative: string
  content: string
  modified: boolean
}

export interface FilesState {
  loading: boolean
  error: boolean
  errorMessage: string | undefined
  fileContents: FileContent[]
  currentFile: string
}

const initialState: FilesState = {
  loading: false,
  error: false,
  errorMessage: '',
  fileContents: [],
  currentFile: ''
}

const getPayload = (action: FilesAction) => {
  return (
    action.payload || {
      errorMessage: '',
      relative: '',
      fileContent: '',
      id: ''
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
            modified: false
          }
        ],
        currentFile: payload.relative
      }
    default:
      return state
  }
}

export default reducer
