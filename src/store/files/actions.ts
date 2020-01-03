import { Action, Dispatch } from 'redux'
import mFetch from '@src/utils/mFetch'
import { getFileById } from './util'
import { AppStore } from '..'
import { getProject } from '@src/config/project'

export const FETCH_FILE_START = 'FETCH_FILE_START'
export const FETCH_FILE_DONE = 'FETCH_FILE_DONE'
export const FETCH_FILE_ERROR = 'FETCH_FILE_ERROR'
export const CHANGE_CURRENT_FILE = 'CHANGE_CURRENT_FILE'
export const FILE_NEW_FILE = 'FILE_NEW_FILE'
export const FILE_CLOSE_FILE = 'FILE_CLOSE_FILE'
export const FILE_MODIFY_FILE = 'FILE_MODIFY_FILE'
export const FILE_SAVE_FILE = 'FILE_SAVE_FILE'

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
export const fetchFile = (relative: string, id: string) => {
  return async (dispatch: Dispatch, getState: () => any) => {
    let state: AppStore = getState()
    let prevFile = getFileById(state.files.fileContents, id)
    if (prevFile) {
      dispatch(createChangeFileAction(id))
      return
    }
    dispatch({
      type: FETCH_FILE_START,
      payload: {
        relative,
        id,
        fileName: relative
          .split('/')
          .slice(-1)
          .toString()
      }
    })
    try {
      const res = await mFetch(`/api/file/${getProject()}?relative=${relative}`)
      if (res.status === 200) {
        // 网速慢时可能导致点击了多次
        state = getState()
        prevFile = getFileById(state.files.fileContents, id)
        if (prevFile && !prevFile.loading) {
          return
        }
        console.log(res)
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

/**
 * 关闭文件action
 * @param id
 */
export const fileCloseFile = (id: string) => ({
  type: FILE_CLOSE_FILE,
  payload: {
    id
  }
})

/**
 * 修改文件内容
 * @param id
 * @param content
 */
export const fileModifyFile = (id: string, fileContent: string) => ({
  type: FILE_MODIFY_FILE,
  payload: {
    id,
    fileContent
  }
})

/**
 * 保存文件
 * @param id
 */
export const fileSaveFile = (
  id: string,
  onDone?: () => void,
  onError?: () => void
) => {
  return async (dispatch: Dispatch, getState: () => AppStore) => {
    const state: AppStore = getState()
    const file = getFileById(state.files.fileContents, id)
    if (!file) return
    // dispatch({
    //   type: FETCH_FILE_START
    // })
    try {
      const res = await mFetch(
        `/api/file/${getProject()}?relative=${file.relative}`,
        'put',
        {
          content: file.content
        }
      )
      if (res.status === 200) {
        dispatch({
          type: FILE_SAVE_FILE,
          payload: {
            id
          }
        })
        onDone && onDone()
      } else {
        dispatch({
          type: FETCH_FILE_ERROR,
          payload: {
            errorMessage: res.errorMessage
          }
        })
        onError && onError()
      }
    } catch (error) {
      dispatch({
        type: FETCH_FILE_ERROR,
        payload: {
          errorMessage: error.message
        }
      })
      onError && onError()
    }
  }
}
