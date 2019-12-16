import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import project, { ProjectState } from './project'

const store = createStore(
  combineReducers({
    project
  }),
  applyMiddleware(reduxThunk)
)

export interface AppStore {
  project: ProjectState
}

export default store
