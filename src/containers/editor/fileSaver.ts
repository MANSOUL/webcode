import mFetch from '@src/utils/mFetch'
import { GET_FILE_SVAE_API_PROJECT } from '@src/api/project'

export default function(relative: string, content: string) {
  return mFetch(GET_FILE_SVAE_API_PROJECT(), 'put', { relative, content })
}