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
  | { type: 'clearState'; payload: undefined }

const initialState = { loading: false, error: null, value: null }

const reducer = <VALUE>(
  state: IStateReducer<VALUE>,
  action: IAction<VALUE>,
): IStateReducer<VALUE> => {
  const payload = action.payload

  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        loading: payload as IPayloads<VALUE>['setLoading'],
      }

    case 'setValue':
      return {
        ...state,
        value: payload as IPayloads<VALUE>['setValue'],
      }

    case 'setError':
      return {
        ...state,
        error: payload as IPayloads<VALUE>['setError'],
      }

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
