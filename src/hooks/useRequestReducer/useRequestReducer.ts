import { Dispatch, ReducerAction, ReducerState, useReducer } from 'react'

export interface State<VALUE> {
  loading: boolean
  error: Record<string, any> | null
  value: VALUE | null
}

const getInitialState: <VALUE>() => State<VALUE> = () => {
  return { loading: false, error: null, value: null }
}

type ActionName<STATE_PROPERTY extends string> =
  `set${Capitalize<STATE_PROPERTY>}`

export type ActionPayloads<VALUE> = {
  [STATE_PROPERTY in keyof State<VALUE> as ActionName<STATE_PROPERTY>]: State<VALUE>[STATE_PROPERTY]
}

export type BaseActionType = ActionName<keyof State<any>>

export interface BaseAction<VALUE, ACTION_TYPE extends BaseActionType> {
  type: ACTION_TYPE
  payload: ActionPayloads<VALUE>[ACTION_TYPE]
}

export type ActionType = BaseActionType | 'clearState'

export type Action<VALUE> =
  | BaseAction<VALUE, BaseActionType>
  | { type: 'clearState'; payload: undefined }

export type RequestReducer<
  VALUE,
  ReducerAction extends Action<VALUE> = Action<VALUE>,
> = (state: State<VALUE>, action: ReducerAction) => State<VALUE>

export const getBaseRequestReducer: <
  VALUE,
  CUSTOM_ACTION extends Action<VALUE> = Action<VALUE>,
>() => RequestReducer<VALUE, CUSTOM_ACTION> = () => {
  return (state, action) => {
    type VALUE = NonNullable<typeof state['value']>

    const payload = action.payload
    const initialState = getInitialState<VALUE>()

    switch (action.type) {
      case 'setLoading':
        return {
          ...state,
          loading: payload as ActionPayloads<VALUE>['setLoading'],
        }

      case 'setValue':
        return {
          ...state,
          value: payload as ActionPayloads<VALUE>['setValue'],
        }

      case 'setError':
        return {
          ...state,
          error: payload as ActionPayloads<VALUE>['setError'],
        }

      case 'clearState':
        return initialState

      default:
        return initialState
    }
  }
}

export type RequestReducerResult<
  VALUE,
  CUSTOM_ACTION extends Action<VALUE> = Action<VALUE>,
> = [
  ReducerState<RequestReducer<VALUE, CUSTOM_ACTION>>,
  Dispatch<ReducerAction<RequestReducer<VALUE>>>,
]

export const useRequestReducer = <
  VALUE,
  CUSTOM_STATE extends State<VALUE> = State<VALUE>,
>(
  customReducer?: RequestReducer<VALUE>,
  customInitialState?: CUSTOM_STATE,
): RequestReducerResult<VALUE> => {
  return useReducer<RequestReducer<VALUE>>(
    customReducer || getBaseRequestReducer<VALUE>(),
    customInitialState || getInitialState<VALUE>(),
  )
}
