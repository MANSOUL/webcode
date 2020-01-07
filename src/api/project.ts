import { getProject } from '@src/config/project'

export const GET_PROJECT = () => `/api/project/${getProject()}`
