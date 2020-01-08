import queryString from 'query-string'

const qs = queryString.parse(location.search)
export const getProject = () => qs.project
export const TERMINAL_SOCKET_URL = 'ws://localhost:9999'
