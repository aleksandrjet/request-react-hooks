import { useCallback, useEffect } from 'react'
import isEmpty from 'lodash.isempty'
import some from 'lodash.some'

import { useStateRequest } from './useStateRequest'
import { IStateReducer } from './useReducerRequest'

export interface IAsyncRequest<VALUE, ArgumentsType extends any[]> {
  (...values: ArgumentsType): Promise<VALUE>
}

export interface ILazyRequest<ArgumentsType extends any[]> {
  (...values: ArgumentsType): void
}

type IClearState = () => void

export type IResultLazyRequest<VALUE, ArgumentsType extends any[]> = [
  IStateReducer<VALUE>,
  ILazyRequest<ArgumentsType>,
  IClearState,
]

export const useLazyRequest = <VALUE, ArgumentsType extends any[]>(
  request: IAsyncRequest<VALUE, ArgumentsType>,
): IResultLazyRequest<VALUE, ArgumentsType> => {
  const requestState = useStateRequest<VALUE>()
  const { state, setLoading, setValue, setError } = requestState

  const lazyRequest = useCallback(
    async (...values: ArgumentsType): Promise<void> => {
      try {
        setLoading(true)
        const response = await request(...values)
        setValue(response)
      } catch (e) {
        console.error('error', e)
        setError(e)
      }
    },
    [request],
  )

  const clearState = useCallback(() => {
    some(state, !isEmpty) && requestState.clearState()
  }, [state])

  useEffect(() => () => {
    clearState()
  }, [])

  return [state, lazyRequest, clearState]
}
