import queryString from 'query-string'

const qs = queryString.parse(location.search)
export const getProject = () => {
  if (qs.project && Array.isArray(qs.project)) return qs.project[0]
  return qs.project || ''
}
export const TERMINAL_SOCKET_URL = 'ws://localhost:9999/tty'
export const FILE_SOCKET_URL = 'ws://localhost:9999/file'
