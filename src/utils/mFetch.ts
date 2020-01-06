import storage from './storage'

const KEY_STORAGE_AUTH = 'm_authorization'

export interface RequestConfig {
  method: string
  headers: Record<string, any>
  body?: any
}

export default function mFetch(
  url: string,
  method = 'get',
  body?: Record<string, any>,
  formData = false
) {
  const requestParams: RequestConfig = {
    method,
    headers: {}
  }
  if (formData) {
    requestParams.body = body
  } else {
    if (method !== 'get' && body) {
      requestParams.body = JSON.stringify(body)
      requestParams.headers['Content-Type'] = 'application/json'
    }
  }
  if (storage.get(KEY_STORAGE_AUTH)) {
    requestParams.headers.Authorization = storage.get(KEY_STORAGE_AUTH)
  }
  return fetch(url, requestParams).then(res => res.json())
}

export function uploadFile(fd: FormData) {
  return mFetch('/api/upload', 'post', fd, true)
}

export function mFetchFile(url: string) {
  return fetch(url).then(res => res.blob())
}
