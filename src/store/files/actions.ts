import { Action, Dispatch } from 'redux'
import mFetch from '@src/utils/mFetch'
import { getFileById } from './util'
import { AppStore } from '..'

export const FETCH_FILE_START = 'FETCH_FILE_START'
export const FETCH_FILE_DONE = 'FETCH_FILE_DONE'
export const FETCH_FILE_ERROR = 'FETCH_FILE_ERROR'
export const CHANGE_CURRENT_FILE = 'CHANGE_CURRENT_FILE'
export const FILE_NEW_FILE = 'FILE_NEW_FILE'

export interface FilesAction extends Action {
  type: string
  payload?: {
    id: string
    fileContent: string
    relative: string
    errorMessage: string
    fileName: string
    newFile: any
  }
}

const createChangeFileAction = (id: string) => ({
  type: CHANGE_CURRENT_FILE,
  payload: { id }
})

/**
 * 获取文件内容
 * @param project 项目
 * @param relative 文件相对项目的相对路径
 */
export const fetchFile = (project: string, relative: string, id: string) => {
  return async (dispatch: Dispatch, getState: () => any) => {
    const state: AppStore = getState()
    if (getFileById(state.files.fileContents, id)) {
      dispatch(createChangeFileAction(id))
      return
    }
    dispatch({
      type: FETCH_FILE_START
    })
    try {
      const res = await mFetch(`/api/file/${project}?relative=${relative}`)
      if (res.status === 200) {
        dispatch({
          type: FETCH_FILE_DONE,
          payload: {
            fileContent: res.data.content,
            relative,
            id,
            fileName: relative
              .split('/')
              .slice(-1)
              .toString()
          }
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

export const changeCurrentFile = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(createChangeFileAction(id))
  }
}

/**
 * 创建新文件action
 * @param relative
 * @param id
 * @param fileName
 * @param content
 */
export const fileNewFile = (
  relative: string,
  id: string,
  fileName: string,
  content: string = ''
) => ({
  type: FILE_NEW_FILE,
  payload: {
    newFile: {
      relative,
      id,
      fileName,
      content
    }
  }
})
