import { Action, Dispatch } from 'redux'
import mFetch from '@src/utils/mFetch'
import { fileNewFile } from '../files/actions'
import { getProject } from '@src/config/project'

export const FETCH_PROJECT_START = 'FETCH_PROJECT_START'
export const FETCH_PROJECT_DONE = 'FETCH_PROJECT_DONE'
export const FETCH_PROJECT_ERROR = 'FETCH_PROJECT_ERROR'
export const PROJECT_CREATE_FILE = 'PROJECT_CREATE_FILE'
export const PROJECT_CREATE_FOLDER = 'PROJECT_CREATE_FOLDER'
export const PROJECT_RENAME_FILE = 'PROJECT_RENAME_FILE'
export const PROJECT_REMOVE_FILE = 'PROJECT_REMOVE_FILE'

export interface ProjectAction extends Action {
  type: string
  payload?: {
    fileStructure: any
    errorMessage: string
    newFile: {
      relative: string
      fileName: string
      content: string
    }
    renameFile: {
      id: string
      newName: string
    }
    removeFile: {
      id: string
      relative: string
      fileName: string
    }
  }
}

/**
 * 获取项目
 * @param project
 */
export const fetchProject = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PROJECT_START
    })
    try {
      const res = await mFetch(`/api/project/${getProject()}`)
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

export const projectCreateFile = (
  relative: string,
  fileName: string,
  content: string = ''
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PROJECT_START
    })
    try {
      const res = await mFetch(`/api/project/${getProject()}`, 'post', {
        relative,
        fileName,
        type: 'file'
      })
      if (res.status === 200) {
        dispatch({
          type: PROJECT_CREATE_FILE,
          payload: {
            newFile: {
              relative,
              fileName,
              content
            }
          }
        })
        {
          const { relative, id, name, content } = res.data.file
          dispatch(fileNewFile(relative, id, name, content))
        }
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

export const projectCreateFolder = (
  relative: string,
  fileName: string,
  content: string = ''
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PROJECT_START
    })
    try {
      const res = await mFetch(`/api/project/${getProject()}`, 'post', {
        relative,
        fileName,
        type: 'folder'
      })
      if (res.status === 200) {
        dispatch({
          type: PROJECT_CREATE_FOLDER,
          payload: {
            newFile: {
              relative,
              fileName,
              content
            }
          }
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

export const projectRenameFile = (
  id: string,
  newName: string,
  oldName: string,
  relative: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PROJECT_START
    })
    try {
      const res = await mFetch(`/api/project/${getProject()}`, 'put', {
        relative,
        fileName: oldName,
        newFileName: newName
      })
      if (res.status === 200) {
        dispatch({
          type: PROJECT_RENAME_FILE,
          payload: {
            renameFile: {
              id,
              newName
            }
          }
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

export const projectRemoveFile = (
  id: string,
  relative: string,
  fileName: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FETCH_PROJECT_START
    })
    try {
      const res = await mFetch(
        `/api/project/${getProject()}?relative=${relative}&fileName=${fileName}`,
        'delete'
      )
      if (res.status === 200) {
        dispatch({
          type: PROJECT_REMOVE_FILE,
          payload: {
            removeFile: {
              id,
              relative,
              fileName
            }
          }
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
