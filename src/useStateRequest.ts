import {
  IStateReducer,
  IActionType,
  IBaseActionType,
  IPayloads,
  useReducerRequest,
} from './useReducerRequest'

export type IActions<VALUE> = {
  [ActionType in IActionType]: ActionType extends IBaseActionType
    ? (payload: IPayloads<VALUE>[ActionType]) => void
    : () => void
}

export interface IResultRequestState<VALUE> extends IActions<VALUE> {
  state: IStateReducer<VALUE>
}

export const useStateRequest = <VALUE>(): IResultRequestState<VALUE> => {
  const [state, dispatch] = useReducerRequest<VALUE>()

  const actionCreators: IActions<VALUE> = {
    setLoading: (payload) => dispatch({ type: 'setLoading', payload }),
    setValue: (payload) => dispatch({ type: 'setValue', payload }),
    setError: (payload) => dispatch({ type: 'setError', payload }),
    clearState: () => dispatch({ type: 'clearState' }),
  }

  return { state, ...actionCreators }
}
