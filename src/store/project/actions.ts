import { Action, Dispatch } from 'redux'
import mFetch from '@src/utils/mFetch'

export const FETCH_PROJECT_START = 'FETCH_PROJECT_START'
export const FETCH_PROJECT_DONE = 'FETCH_PROJECT_DONE'
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR'
export const FETCH_FILE_START = 'FETCH_FILE_START'
export const FETCH_FILE_DONE = 'FETCH_FILE_DONE'
export const FETCH_FILE_ERROR = 'FETCH_FILE_ERROR'

export interface ProjectAction extends Action {
  type: string
  payload?: {
    fileStructure: any
    fileContent: string
    relative: string
    errorMessage: string
  }
}

/**
 * 获取项目
 * @param project
 */
export const fetchProject = (project: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PROJECT_START
    })
    try {
      const res = await mFetch(`/api/project/${project}`)
      if (res.status === 200) {
        dispatch({
          type: FETCH_PROJECT_DONE,
          payload: { fileStructure: res.data.fileTree }
        })
      } else {
        dispatch({
          type: FETCH_PROJECT_ERROR,
          payload: {
            errorMessage: res.errorMessage
          }
        })
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROJECT_ERROR,
        payload: {
          errorMessage: error.message
        }
      })
    }
  }
}

/**
 * 获取文件内容
 * @param project
 * @param relative
 */
export const fetchFile = (project: string, relative: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_FILE_START
    })
    try {
      const res = await mFetch(`/api/file/${project}?relative=${relative}`)
      if (res.status === 200) {
        dispatch({
          type: FETCH_FILE_DONE,
          payload: { fileContent: res.data.content, relative }
        })
      } else {
        dispatch({
          type: FETCH_FILE_ERROR,
          payload: {
            errorMessage: res.errorMessage
          }
        })
      }
    } catch (error) {
      dispatch({
        type: FETCH_FILE_ERROR,
        payload: {
          errorMessage: error.message
        }
      })
    }
  }
}
