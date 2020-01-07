import { getProject } from '@src/config/project'

export const GET_FILE_API = () => `/api/file/${getProject()}`
