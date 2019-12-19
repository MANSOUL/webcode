import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import project, { ProjectState } from './project'
import files, { FilesState } from './files'
import editor, { EditorState } from './editor'

const store = createStore(
  combineReducers({
    project,
    files,
    editor
  }),
  applyMiddleware(reduxThunk)
)

export interface AppStore {
  project: ProjectState
  files: FilesState
  editor: EditorState
}

export default store
