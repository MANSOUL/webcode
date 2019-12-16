import { Reducer } from 'redux'
import {
  FETCH_PROJECT_DONE,
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_START,
  ProjectAction
} from './actions'

export interface ProjectState {
  loading: boolean
  error: boolean
  errorMessage: string
  data?: any
}

const initialState: ProjectState = {
  loading: false,
  error: false,
  errorMessage: ''
}

const reducer: Reducer<ProjectState> = (
  state: ProjectState = initialState,
  action: ProjectAction
) => {
  switch (action.type) {
    case FETCH_PROJECT_START:
      return {
        loading: true,
        error: false,
        errorMessage: ''
      }
    case FETCH_PROJECT_ERROR:
      return {
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage
      }
    case FETCH_PROJECT_DONE:
      return {
        loading: false,
        error: false,
        errorMessage: '',
        data: action.payload.data
      }
    default:
      return state
  }
}

export default reducer
