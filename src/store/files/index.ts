import { Reducer } from 'redux'
import {
  FETCH_FILE_DONE,
  FETCH_FILE_ERROR,
  FETCH_FILE_START,
  FilesAction
} from './actions'

export interface FilesState {
  loading: boolean
  error: boolean
  errorMessage: string | undefined
  fileContents: Record<string, string>
  currentFile: string
}

const initialState: FilesState = {
  loading: false,
  error: false,
  errorMessage: '',
  fileContents: {},
  currentFile: ''
}

const getPayload = (action: FilesAction) => {
  return (
    action.payload || {
      errorMessage: '',
      relative: '',
      fileContent: ''
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
        fileContents: {
          ...state.fileContents,
          [payload.relative]: payload.fileContent
        },
        currentFile: payload.relative
      }
    default:
      return state
  }
}

export default reducer
