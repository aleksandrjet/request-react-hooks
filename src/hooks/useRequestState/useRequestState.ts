import {
  State,
  ActionType as Action,
  BaseActionType,
  ActionPayloads,
  useRequestReducer,
  RequestReducer,
} from '../useRequestReducer/useRequestReducer'

export type ActionCreators<VALUE> = {
  [ActionType in Action]: ActionType extends BaseActionType
    ? (payload: ActionPayloads<VALUE>[ActionType]) => void
    : () => void
}

export type RequestStateResult<VALUE> = [State<VALUE>, ActionCreators<VALUE>]

export const useRequestState = <
  VALUE,
  CUSTOM_STATE extends State<VALUE> = State<VALUE>,
>(
  customReducer?: RequestReducer<VALUE>,
  customInitialState?: CUSTOM_STATE,
): RequestStateResult<VALUE> => {
  const [state, dispatch] = useRequestReducer<VALUE, CUSTOM_STATE>(
    customReducer,
    customInitialState,
  )

  const actionCreators: ActionCreators<VALUE> = {
    setLoading: (payload) => dispatch({ type: 'setLoading', payload }),
    setValue: (payload) => dispatch({ type: 'setValue', payload }),
    setError: (payload) => dispatch({ type: 'setError', payload }),
    clearState: () => dispatch({ type: 'clearState', payload: undefined }),
  }

  return [state, actionCreators]
}
