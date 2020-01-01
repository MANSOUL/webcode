import { Dispatch, MiddlewareAPI, AnyAction } from 'redux'

const log = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (
  action: AnyAction
) => {
  console.log('dispatch action:', action)
  action = next(action)
  console.log('after dispatch action:', action)
  return action
}

export default log
