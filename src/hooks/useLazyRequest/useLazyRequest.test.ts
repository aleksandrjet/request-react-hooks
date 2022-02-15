import { act, renderHook } from '@testing-library/react-hooks'

import { useLazyRequest } from './useLazyRequest'

const VALID_ARG = 'valid_arg'
const INVALID_ARG = 'invalid_arg'

const asyncRequest = async (query: string | null): Promise<string> => {
  return await new Promise((resolve, reject) => {
    if (query === INVALID_ARG) {
      reject({ message: 'invalid parameter passed', code: 400 })
    }

    setTimeout(() => resolve(`result for query: ${query}`), 300)
  })
}

describe('useLazyRequest()', () => {
  it('setting loading parameter before change value', async () => {
    const { result, waitFor } = renderHook(() => useLazyRequest(asyncRequest))

    act(() => {
      result.current[1](VALID_ARG)
    })

    const expectedValue = `result for query: ${VALID_ARG}`

    expect(result.current[0].loading).toBeTruthy()
    expect(result.current[0].value).toBeNull()
    expect(result.current[0].error).toBeNull()

    await waitFor(() => result.current[0].value === expectedValue)

    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].error).toBeNull()

    expect(result.current[0].value).toBe(expectedValue)
  })

  it('changes error parameter, when request was rejected', async () => {
    const { result, waitFor } = renderHook(() => useLazyRequest(asyncRequest))

    act(() => {
      result.current[1](INVALID_ARG)
    })

    expect(result.current[0].loading).toBeTruthy()
    expect(result.current[0].value).toBeNull()
    expect(result.current[0].error).toBeNull()

    await waitFor(() => !!result.current[0].error)

    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].value).toBeNull()

    expect(result.current[0].error).toEqual({
      message: 'invalid parameter passed',
      code: 400,
    })
  })

  it('should return initial state after call clearState action', async () => {
    const { result, waitFor } = renderHook(() => useLazyRequest(asyncRequest))

    act(() => {
      result.current[1](VALID_ARG)
    })
    await waitFor(() => !!result.current[0].value)

    act(() => {
      result.current[1](INVALID_ARG)
    })
    await waitFor(() => !!result.current[0].error)

    // after reject request, value parameter will reset
    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].value).toBeNull()
    expect(result.current[0].error).toBeTruthy()

    act(() => {
      result.current[2].clearState()
    })

    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].value).toBeNull()
    expect(result.current[0].error).toBeNull()
  })

  it('call setValue action changes value parameter', async () => {
    const { result, waitFor } = renderHook(() => useLazyRequest(asyncRequest))

    act(() => {
      result.current[1](VALID_ARG)
    })
    await waitFor(() => !!result.current[0].value)

    act(() => {
      result.current[2].setValue('new_value')
    })

    // if you change value by action calling, loading parameter in state
    // will not change
    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].value).toBe('new_value')
  })

  it('call setValue action dont changes error parameter', async () => {
    const { result, waitFor } = renderHook(() => useLazyRequest(asyncRequest))

    act(() => {
      result.current[1](INVALID_ARG)
    })
    await waitFor(() => !!result.current[0].error)

    act(() => {
      result.current[2].setValue('new_value')
    })

    // if you change value by action calling, error parameter in state
    // will not remove
    expect(result.current[0].error).toBeTruthy()
    expect(result.current[0].value).toBe('new_value')
  })

  it('call setError action with null argument will clear error parameter', async () => {
    const { result, waitFor } = renderHook(() => useLazyRequest(asyncRequest))

    act(() => {
      result.current[1](INVALID_ARG)
    })
    await waitFor(() => !!result.current[0].error)

    act(() => {
      result.current[2].setError(null)
    })

    expect(result.current[0].error).toBeNull()
  })
})
