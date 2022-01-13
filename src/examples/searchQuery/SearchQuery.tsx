import React, { FC, useCallback } from 'react'
import { useLazyRequest } from '../../index'

const asyncRequest = (query): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('result for query:' + query)
    }, 300)
  })
}

const SearchQuery: FC = () => {
  const [state, sendRequest] = useLazyRequest(asyncRequest)
  const { value, loading } = state

  const handleChange = useCallback(
    (event) => {
      sendRequest(event.target.value)
    },
    [sendRequest],
  )

  return (
    <div>
      <input onChange={handleChange} data-cy-id={'search-field'} />

      {loading ? (
        <p data-cy-id={'loader'}>Loading...</p>
      ) : (
        <p data-cy-id={'result'}> {value}</p>
      )}
    </div>
  )
}

export default SearchQuery
