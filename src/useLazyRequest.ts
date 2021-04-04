import { useCallback, useEffect } from 'react'
import isEmpty from 'lodash.isempty'
import some from 'lodash.some'

import { useStateRequest } from './useStateRequest'
import { IStateReducer } from './useReducerRequest'

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T

type IClearState = () => void

type IRequest = (...args: any[]) => any

type IRequestValue<Request extends IRequest> = Unpacked<ReturnType<Request>>

interface ILazyRequest<Request extends IRequest> {
  (...args: Parameters<Request>): Promise<IRequestValue<Request> | undefined>
}

export type IUseLazyRequestResult<Request extends IRequest> = [
  IStateReducer<IRequestValue<Request>>,
  ILazyRequest<Request>,
  IClearState,
]

export const useLazyRequest = <Request extends IRequest>(
  request: Request,
): IUseLazyRequestResult<Request> => {
  const requestState = useStateRequest<IRequestValue<Request>>()
  const { state, setLoading, setValue, setError } = requestState

  const lazyRequest = useCallback<ILazyRequest<Request>>(
    async (...values) => {
      try {
        setLoading(true)
        const response = await request(...values)
        setValue(response)
        return response
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

  useEffect(() => clearState, [])

  return [state, lazyRequest, clearState]
}
