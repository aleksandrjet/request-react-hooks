# Hook to subscribe to request state updates.

`useLazyRequest` accepts an `asyncRequest` function that returns some value. As the `asyncRequest` function runs, `requestState` change.

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
  await setTimeout(() => {}, 500) //backend simulation 
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

## Exception Handling
If the `lazyRequest` function fails, an error state will be written to the `requestState`

```typescript
const asyncRequest = async (parameter: string): Promise<string> => {
  await setTimeout(() => {}, 500) //backend simulation

  if (parameter === 'invalid parameter') {
    throw {
      text: 'function was called with invalid parameter',
      status: 1001,
    }
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
// { loading: false, value: null, error: {
//    text: 'function was called with invalid parameter',
//    status: 1001,
// }}
console.log(requestState)
```

## LazyRequest function interface
When trying to call the `lazyRequest` function with parameters different from the `asyncRequest` parameter passed to the hook, an error will occur

```typescript
const asyncRequest = async (par1: number, par2: string): Promise<string> => {
  await setTimeout(() => {}, 500) //backend simulation
  return 'its result ' + String(par1) + ' ' + par2
}

const [requestState, lazyRequest] = useLazyRequest(asyncRequest)

// - its working
lazyRequest(111, '111')

// - its error typescript!
lazyRequest('111', 111) 
```

## RequestState interface
Be sure to specify the types of parameters and return values for the `asyncRequest`, passed to the hook.  

Otherwise, the compiler will not know what value is in the `requestState` and with what it will be possible to call `lazyRequest`

```typescript
type Params = { par1: string; par2: string }
type Result = { data: string; another: number }

const asyncRequest = async (params: Params): Promise<Result> => {
  const { par1, par2 } = params

  await setTimeout(() => {}, 500) //backend simulation

  return {
    data: par1 + '_' + par2,
    another: 123,
  }
}

const [requestState, lazyRequest] = useLazyRequest(asyncRequest)

// {
//   value: Result | null,
//   loading: boolean,
//   error: Record<string, any>
// }
type State = typeof requestState

// (params: Params) => void
type Request = typeof lazyRequest

// the compiler gives hints that the requestState has value.data
const myData: string | undefined = requestState.value?.data

// ERROR! 
// the compiler throws an error, 
// that there is no otherParamter in the requestState
const otherInvalidValue = requestState.value?.unknownValue

// ERROR!
// the compiler throws an error, 
// lazyRequest cannot be called with other parameters
lazyRequest('error params')
```

## Features of changing the requestSate

#### Changing value
```typescript
// When changing value, loading goes false, error goes null
case 'setValue':
  const value = (action as IBaseAction<VALUE, 'setValue'>).payload
  return { ...state, value, loading: false, error: null }
```  

#### Changing error
```typescript
// When changing error, loading goes false, value goes null
case 'setError':
  const error = (action as IBaseAction<VALUE, 'setError'>).payload
  return { ...state, error, loading: false, value: null }
```

## RequestState clearing
useLazyrRequest hook allows you to reset the `requestSate`. To do this, use the optional `clearState` function returned by the hook
```jsx
const asyncRequest = async (parameter: number): Promise<string> => {
  await setTimeout(() => {}, 500) //backend simulation
  return 'its result ' + String(parameter)
}

const [state, lazyRequest, clearState] = useLazyRequest(asyncRequest)

useEffect(() => {
  lazyRequest(1111)
}, [])

const { loading, value, error } = state

// will return on render::
// { loading: false, value: null, error: null }
// { loading: true, value: null, error: null }
// { loading: false, value: 'its result 1111', error: null }
console.log(state)

// if click on button, console.log will return 
// { loading: false, value: null, error: null }

return (
  <>
    <p>{value || 'while not value...'}</p>
    <button onClick={clearState}>RESET STATE</button>
  </>
)
```

