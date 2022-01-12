import { useCallback } from 'react'

import { ActionCreators, useRequestState } from './useRequestState'
import { State } from './useRequestReducer'

export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T

type IRequest = (...args: any[]) => any

type IRequestValue<Request extends IRequest> = Unpacked<ReturnType<Request>>

interface ILazyRequest<Request extends IRequest> {
  (...args: Parameters<Request>): Promise<IRequestValue<Request> | undefined>
}

export type IUseLazyRequestResult<Request extends IRequest> = [
  State<IRequestValue<Request>>,
  ILazyRequest<Request>,
  ActionCreators<IRequestValue<Request>>,
]

export const useLazyRequest = <Request extends IRequest>(
  request: Request,
): IUseLazyRequestResult<Request> => {
  const requestState = useRequestState<IRequestValue<Request>>()

  const [state, actions] = requestState
  const { setLoading, setValue, setError } = actions

  const lazyRequest = useCallback<ILazyRequest<Request>>(
    async (...values) => {
      try {
        setLoading(true)

        const response = await request(...values)
        setValue(response)

        setError(null)

        return response
      } catch (e) {
        setError(e)
        setValue(null)
      } finally {
        setLoading(false)
      }
    },
    [request],
  )

  return [state, lazyRequest, actions]
}
