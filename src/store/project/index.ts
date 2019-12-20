import { Reducer } from 'redux'
import {
  FETCH_PROJECT_DONE,
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_START,
  PROJECT_CREATE_FILE,
  ProjectAction,
  PROJECT_CREATE_FOLDER,
  PROJECT_RENAME_FILE
} from './actions'
import { createNewFile, renameNewFile } from './util'

export interface ProjectState {
  loading: boolean
  error: boolean
  errorMessage: string | undefined
  fileStructure: any
}

const initialState: ProjectState = {
  loading: false,
  error: false,
  errorMessage: '',
  fileStructure: null
}

const getPayload = (action: ProjectAction) => {
  return (
    action.payload || {
      errorMessage: '',
      fileStructure: {},
      newFile: {},
      renameFile: {}
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
    case PROJECT_CREATE_FILE:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        fileStructure: createNewFile(state.fileStructure, payload.newFile)
      }
    case PROJECT_CREATE_FOLDER:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        fileStructure: createNewFile(
          state.fileStructure,
          payload.newFile,
          'folder'
        )
      }
    case PROJECT_RENAME_FILE:
      return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        fileStructure: renameNewFile(state.fileStructure, payload.renameFile)
      }
    default:
      return state
  }
}

export default reducer
