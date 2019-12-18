import { Action, Dispatch } from 'redux'
import mFetch from '@src/utils/mFetch'

export const FETCH_PROJECT_START = 'FETCH_PROJECT_START'
export const FETCH_PROJECT_DONE = 'FETCH_PROJECT_DONE'
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR'

export interface ProjectAction extends Action {
  type: string
  payload?: {
    fileStructure: any
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
