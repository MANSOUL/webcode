import { Dispatch, MiddlewareAPI, AnyAction } from 'redux'

const captureError = ({ dispatch, getState }: MiddlewareAPI) => (
  next: Dispatch
) => (action: AnyAction) => {
  try {
    next(action)
  } catch (error) {
    console.log('capture an error:', error)
    console.log('when dispatch:', action)
  }
  return action
}

export default captureError
