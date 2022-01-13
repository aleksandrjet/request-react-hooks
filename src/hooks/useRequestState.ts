import {
  State,
  ActionType as Action,
  BaseActionType,
  ActionPayloads,
  useRequestReducer,
} from './useRequestReducer'

export type ActionCreators<VALUE> = {
  [ActionType in Action]: ActionType extends BaseActionType
    ? (payload: ActionPayloads<VALUE>[ActionType]) => void
    : () => void
}

export type RequestStateResult<VALUE> = [State<VALUE>, ActionCreators<VALUE>]

export const useRequestState = <VALUE>(): RequestStateResult<VALUE> => {
  const [state, dispatch] = useRequestReducer<VALUE>()

  const actionCreators: ActionCreators<VALUE> = {
    setLoading: (payload) => dispatch({ type: 'setLoading', payload }),
    setValue: (payload) => dispatch({ type: 'setValue', payload }),
    setError: (payload) => dispatch({ type: 'setError', payload }),
    clearState: () => dispatch({ type: 'clearState', payload: undefined }),
  }

  return [state, actionCreators]
}
