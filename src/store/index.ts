import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import project, { ProjectState } from './project'
import files, { FilesState } from './files'

const store = createStore(
  combineReducers({
    project,
    files
  }),
  applyMiddleware(reduxThunk)
)

export interface AppStore {
  project: ProjectState
  files: FilesState
}

export default store
