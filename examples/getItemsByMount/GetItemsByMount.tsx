import React, { FC, useEffect, useMemo } from 'react'

import { useLazyRequest } from '../../src'

type User = { name: string; secondName: string }

const users: User[] = [
  { name: 'User1', secondName: 'SecondName1' },
  { name: 'User2', secondName: 'SecondName2' },
  { name: 'User3', secondName: 'SecondName3' },
]

const asyncRequest = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 3000)
  })
}

const GetItemsByMount: FC = () => {
  const [state, sendRequest] = useLazyRequest(asyncRequest)

  useEffect(() => {
    sendRequest()
  }, [])

  const content = useMemo(() => {
    if (state.loading) {
      return <p data-cy-id={'loaderText'}>Loading...</p>
    } else if (state.error) {
      return <p data-cy-id={'errorText'}>Error while loading!</p>
    } else {
      return (
        <div data-cy-id={'resultBlock'}>
          {state.value?.map((user, index) => {
            return (
              <p key={`user_${index}_${user.name}`}>
                {user.name} {user.secondName}
              </p>
            )
          })}
        </div>
      )
    }
  }, [state])

  return <div>{content}</div>
}

export default GetItemsByMount
