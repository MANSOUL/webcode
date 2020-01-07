import { getProject } from '@src/config/project'

export const API_PROJECTS = '/api/project'

export const GET_PROJECT = () => `/api/project/${getProject()}`
