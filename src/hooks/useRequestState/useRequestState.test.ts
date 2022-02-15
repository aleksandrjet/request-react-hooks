import { renderHook, act } from '@testing-library/react-hooks'

import { useRequestState } from './useRequestState'

describe('useRequestState()', () => {
  it('setting loading parameter changes only loading parameter', () => {
    const { result } = renderHook(() => useRequestState())

    expect(result.current[0]).toEqual({
      loading: false,
      value: null,
      error: null,
    })

    act(() => {
      result.current[1].setLoading(true)
    })

    expect(result.current[0].loading).toBeTruthy()

    expect(result.current[0].error).toBeNull()
    expect(result.current[0].value).toBeNull()
  })

  it('setting value parameter changes only value parameter', () => {
    const { result } = renderHook(() => useRequestState())

    act(() => {
      result.current[1].setValue('new_value')
    })

    expect(result.current[0].value).toBe('new_value')

    expect(result.current[0].loading).toBeFalsy()
    expect(result.current[0].error).toBeNull()
  })

  it('setting error parameter changes only error parameter', () => {
    const { result } = renderHook(() => useRequestState())

    act(() => {
      result.current[1].setError({ message: 'invalid request' })
    })

    expect(result.current[0].error).toEqual({ message: 'invalid request' })

    expect(result.current[0].value).toBeNull()
    expect(result.current[0].loading).toBeFalsy()
  })

  it('setting a parameter does not reset other values', () => {
    const customState = {
      value: 'initial_value',
      error: { code: 400 },
      loading: false,
    }

    const { result } = renderHook(() => useRequestState(undefined, customState))

    act(() => {
      result.current[1].setValue('new_value')
    })

    act(() => {
      result.current[1].setLoading(true)
    })

    expect(result.current[0].error).toEqual(customState.error)

    expect(result.current[0].value).toBe('new_value')
    expect(result.current[0].loading).toBe(true)
  })

  it('should return passed initial state', () => {
    const customState = {
      value: 'initial_value',
      error: { code: 400 },
      loading: false,
    }

    const { result } = renderHook(() => useRequestState(undefined, customState))

    expect(result.current[0]).toEqual(customState)
  })
})
