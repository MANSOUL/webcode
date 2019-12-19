import { Reducer } from 'redux'
import {
  EditorAction,
  EDITOR_RESIZE_COUNT_INCREMENT,
  EDITOR_SELECTION_CHANGE
} from './actions'

export interface EditorState {
  resizeCount: number
  editorSlection: {
    row: number
    col: number
    selectedColCount: number
  }
}

const initialState: EditorState = {
  resizeCount: 0,
  editorSlection: {
    row: 0,
    col: 0,
    selectedColCount: 0
  }
}

const reducer: Reducer<EditorState> = (
  state: EditorState = initialState,
  action: EditorAction
) => {
  switch (action.type) {
    case EDITOR_RESIZE_COUNT_INCREMENT:
      return {
        ...state,
        resizeCount: state.resizeCount + 1
      }
    case EDITOR_SELECTION_CHANGE:
      return {
        ...state,
        editorSlection: action.payload?.editorSlection || {
          row: 0,
          col: 0,
          selectedColCount: 0
        }
      }
    default:
      return state
  }
}

export default reducer
