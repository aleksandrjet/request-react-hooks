# Hook to subscribe to request state updates.

`useLazyRequest` accepts an `asyncRequest` function that returns some value. As the `asyncRequest` function runs, `requestState` change.

It is free dependencies library, that easy in usages and does not required wrappers

## Install

By using npm on yarn:

```shell
npm install request-react-hooks
```

```shell
yarn add request-react-hooks
```

## Example usage:

Pass an `asyncRequest` function to the hook and subscribe to `requestState` updates:

```jsx
import { useLazyRequest } from 'request-react-hooks'

const asyncRequest = async (parameter: number): Promise<string> => {
  await requestToBackend()
  return 'its result ' + String(parameter)
}

const MyAsyncComponent = () => {
  const [requestState, lazyRequest] = useLazyRequest(asyncRequest)

  useEffect(() => {
    lazyRequest(1111)
  }, [])

  const { loading, value, error } = requestState

  // will return on render:
  // { loading: false, value: null, error: null }
  // { loading: true, value: null, error: null }
  // { loading: false, value: 'its result 1111', error: null }
  console.log(requestState)

  if (loading) {
    return <p>Loading...</p>
  } else if (error) {
    return <p>Error!</p>
  } else {
    return <p>{value}</p>
  }
}
```

## Returned types

Be sure to specify the types of parameters and return values for the `asyncRequest`, passed to the hook.

Otherwise, the compiler will not know what value is in the `requestState` and with what it will be possible to call `lazyRequest`

```typescript
import {
  ActionCreators,
  LazyRequest,
  RequestState,
  UseLazyRequestResult,
} from 'request-react-hooks'

type Params = { par1: string; par2: string }
type Result = { result1: string; result2: number }

const asyncRequest = async (params: Params): Promise<Result> => {
  await requestToBackend()
  return { result1: params.par1, result2: params.par2 }
}

const initialState: Result<Result> = {
  value: { result1: 'initial_value_1', result2: 'initial_value_2' },
  error: null,
  loading: false,
}

// type UseLazyRequestResult<typeof asyncRequest> = [
//   RequestState<Result>,
//   LazyRequest<typeof asyncRequest>,
//   ActionCreators<Result>
// ]
const useLazyResult: UseLazyRequestResult<typeof asyncRequest> = useLazyRequest(
  asyncRequest,
  initialState,
)

// type RequestState<Result> = {
//   value: Result | null,
//   loading: boolean,
//   error: Record<string, any>
// }
const state: RequestState<Result> = useLazyResult[0]

// interface LazyRequest<typeof asyncRequest> {
//  (args: Parameters<typeof asyncRequest>): Promise<Result | undefined>
// }
const lazyRequest: LazyRequest<typeof asyncRequest> = useLazyResult[1]

// type ActionCreators<Result> = {
//   setValue: (value: Result | null) => void
//   setLoading: (loading: boolean) => void,
//   setError: (error: Record<string, any> | null) => void
//   clearState: () => void
// }
const actions: ActionCreators<Result> = useLazyResult[2]
```

## Request exception handling

If the `lazyRequest` function fails, an error state will be written to the `requestState`

```typescript
const asyncRequest = async (parameter: string): Promise<string> => {
  await requestToBackend()

  if (parameter === 'invalid parameter') {
    throw { text: 'passed invalid parameter', status: 1001 }
  }

  return 'its result ' + parameter
}

const [requestState, lazyRequest] = useLazyRequest(asyncRequest)

useEffect(() => {
  lazyRequest('invalid parameter')
}, [])

// will return on render:
// { loading: false, value: null, error: null }
// { loading: true, value: null, error: null }
// {
//   loading: false,
//   value: null,
//   error: {
//     text: 'passed invalid parameter',
//     status: 1001,
//   }
// }
console.log(requestState)
```

## Use all possibilities of useLazyRequest

```jsx
import { useCallback } from 'react'
import { RequestState, useLazyRequest } from 'request-react-hooks'

type Result = string

const request = async (par1: string, par2: string): Promise<Result> => {
  await requestToBackend()
  return 'its result ' + par1 + par2
}

const initialState: RequestState<Result> = {
  value: 'initial_value',
  error: null,
  loading: false,
}

const Component = () => {
  const [requestState, lazyRequest, actions] = useLazyRequest(
    request,
    initialState,
  )

  const { loading, value, error } = requestState

  const handleReload = useCallback(() => {
    lazyRequest('value_1', 'value_2')
  }, [lazyRequest])

  // After click on reload button, user will see the disabled button
  // and error message, because clear error in state will be after succes
  // execute request
  if (error) {
    return (
      <>
        <p>Error!</p>

        <button onClick={handleReload} disabled={loading}>
          upload again
        </button>
      </>
    )
  }

  if (loading) {
    return <p>Loading</p>
  }

  // This is the first thing the user sees
  // because we passed initial values in state.
  // After click on reload button, user will see loading message,
  // because handling of load case happens before that case is handled
  return (
    <>
      <p>{value}</p>

      <button onClick={handleReload}>clear state and reload</button>
    </>
  )
}
```

## More examples usage

- [Get items by user click](https://github.com/aleksandrjet/request-react-hooks/blob/master/examples/getItemsByClick/GetItemsByClick.tsx)
- [Get items by component mount](https://github.com/aleksandrjet/request-react-hooks/blob/master/examples/getItemsByMount/GetItemsByMount.tsx)
- [Handle user input](https://github.com/aleksandrjet/request-react-hooks/blob/master/examples/searchQuery/SearchQuery.tsx)
