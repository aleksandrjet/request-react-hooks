import { Dispatch, ReducerAction, ReducerState, useReducer } from 'react'

export interface IStateReducer<VALUE = boolean> {
  loading: boolean
  error: Record<string, any> | null
  value: VALUE | null
}

export type IPayloads<VALUE> = {
  [Property in keyof IStateReducer<VALUE> as `set${Capitalize<Property>}`]: IStateReducer<VALUE>[Property]
}

export type IBaseActionType = `set${Capitalize<keyof IStateReducer>}`

export interface IBaseAction<VALUE, ActionType extends IBaseActionType> {
  type: ActionType
  payload: IPayloads<VALUE>[ActionType]
}

export type IActionType = IBaseActionType | 'clearState'

export type IAction<VALUE> =
  | IBaseAction<VALUE, IBaseActionType>
  | { type: 'clearState' }

const initialState = { loading: false, error: null, value: null }

const reducer = <VALUE>(
  state: IStateReducer<VALUE>,
  action: IAction<VALUE>,
): IStateReducer<VALUE> => {
  switch (action.type) {
    case 'setLoading':
      const loading = (action as IBaseAction<VALUE, 'setLoading'>).payload
      return { ...state, loading }

    case 'setValue':
      const value = (action as IBaseAction<VALUE, 'setValue'>).payload
      return { ...state, value, loading: false, error: null }

    case 'setError':
      const error = (action as IBaseAction<VALUE, 'setError'>).payload
      return { ...state, error, loading: false, value: null }

    case 'clearState':
      return initialState

    default:
      return initialState
  }
}

export type IReducer<VALUE> = (
  state: IStateReducer<VALUE>,
  action: IAction<VALUE>,
) => IStateReducer<VALUE>

export type IResultReducerRequest<VALUE> = [
  ReducerState<IReducer<VALUE>>,
  Dispatch<ReducerAction<IReducer<VALUE>>>,
]

export const useReducerRequest = <VALUE>(): IResultReducerRequest<VALUE> => {
  return useReducer<IReducer<VALUE>>(reducer, initialState)
}
