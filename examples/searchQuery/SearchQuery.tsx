import React, { ChangeEvent, FC, useCallback, useMemo } from 'react'

import { useLazyRequest } from '../../lib'

const asyncRequest = (query): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query === 'error request') {
        reject('error! invalid request!')
      }

      resolve('result for query:' + query)
    }, 3000)
  })
}

const SearchQuery: FC = () => {
  const [state, sendRequest, actions] = useLazyRequest(asyncRequest)
  const { value, loading, error } = state

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value

      if (query) {
        sendRequest(query)
      } else {
        actions.clearState()
      }
    },
    [sendRequest],
  )

  const content = useMemo(() => {
    if (loading) {
      return <p data-cy-id={'loaderBlock'}>loading...</p>
    } else if (error) {
      return <p data-cy-id={'errorBlock'}>{error}</p>
    } else if (value) {
      return <p data-cy-id={'resultBlock'}>{value}</p>
    } else {
      return <p data-cy-id={'placeholderBlock'}>please, input request</p>
    }
  }, [state])

  return (
    <div>
      <input onChange={handleChange} data-cy-id={'searchField'} />
      {content}
    </div>
  )
}

export default SearchQuery
