import { Action } from 'redux'

export const EDITOR_RESIZE_COUNT_INCREMENT = 'EDITOR_RESIZE_COUNT_INCREMENT'
export const EDITOR_SELECTION_CHANGE = 'EDITOR_SELECTION_CHANGE'

type editorSlection = {
  row: number
  col: number
  selectedColCount: number
}

export interface EditorAction extends Action {
  type: string
  payload?: {
    editorSlection: editorSlection
  }
}

export const createEditorResizeAction = () => ({
  type: EDITOR_RESIZE_COUNT_INCREMENT
})

export const createEditorSelectionAction = (
  editorSlection: editorSlection
) => ({
  type: EDITOR_SELECTION_CHANGE,
  payload: {
    editorSlection
  }
})
