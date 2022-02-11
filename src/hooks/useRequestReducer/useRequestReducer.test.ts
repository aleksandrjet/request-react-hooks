import { renderHook } from '@testing-library/react-hooks'

import { useRequestReducer } from './useRequestReducer'

describe('useRequestReducer()', () => {
  it('use initial state by default', () => {
    const { result } = renderHook(() => useRequestReducer())

    expect(result.current[0]).toEqual({
      loading: false,
      value: null,
      error: null,
    })
  })

  it('return custom initial state', () => {
    const customState = {
      value: 'initial_value',
      error: { code: 400 },
      loading: false,
    }

    const { result } = renderHook(() =>
      useRequestReducer(undefined, customState),
    )

    expect(result.current[0]).toEqual(customState)
  })
})
