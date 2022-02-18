import { useCallback } from 'react'

import {
  ActionCreators,
  useRequestState,
} from '../useRequestState/useRequestState'
import { ExtractPromise } from '../../utils/typeUtils'
import { State } from '../useRequestReducer/useRequestReducer'

type Request = (...args: any[]) => Promise<any>

type RequestResult<REQUEST extends Request> = ExtractPromise<
  ReturnType<REQUEST>
>

interface LazyRequest<REQUEST extends Request> {
  (...args: Parameters<REQUEST>): Promise<RequestResult<REQUEST> | undefined>
}

export type UseLazyRequestResult<REQUEST extends Request> = [
  State<RequestResult<REQUEST>>,
  LazyRequest<REQUEST>,
  ActionCreators<RequestResult<REQUEST>>,
]

export const useLazyRequest = <REQUEST extends Request>(
  request: REQUEST,
): UseLazyRequestResult<REQUEST> => {
  const [state, actions] = useRequestState<RequestResult<REQUEST>>()

  const { setLoading, setValue, setError } = actions

  const lazyRequest = useCallback<LazyRequest<REQUEST>>(
    async (...args: Parameters<REQUEST>) => {
      try {
        setLoading(true)

        const response: RequestResult<REQUEST> = await request(...args)
        setValue(response)

        setError(null)

        return response
      } catch (error) {
        setError(error)
        setValue(null)
      } finally {
        setLoading(false)
      }
    },
    [request],
  )

  return [state, lazyRequest, actions]
}
