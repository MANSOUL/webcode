import { Reducer } from 'redux'
import {
  FETCH_PROJECT_DONE,
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_START,
  FETCH_FILE_DONE,
  FETCH_FILE_ERROR,
  FETCH_FILE_START,
  ProjectAction
} from './actions'

export interface ProjectState {
  loading: boolean
  error: boolean
  errorMessage: string | undefined
  fileStructure: any
  fileContents: Record<string, string>
  currentFile: string
}

const initialState: ProjectState = {
  loading: false,
  error: false,
  errorMessage: '',
  fileStructure: null,
  fileContents: {},
  currentFile: ''
}

const getPayload = (action: ProjectAction) => {
  return (
    action.payload || {
      errorMessage: '',
      fileStructure: {},
      relative: '',
      fileContent: ''
    }
  )
}

const reducer: Reducer<ProjectState> = (
  state: ProjectState = initialState,
  action: ProjectAction
) => {
  const payload = getPayload(action)
  switch (action.type) {
    case FETCH_PROJECT_START:
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
      }
    case FETCH_PROJECT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload.errorMessage
      }
    case FETCH_PROJECT_DONE:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        fileStructure: payload.fileStructure
      }
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
