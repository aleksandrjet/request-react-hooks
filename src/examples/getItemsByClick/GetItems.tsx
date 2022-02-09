import React, { FC } from 'react'
import { useLazyRequest } from '../../index'

type User = { name: string; secondName: string }

const users: User[] = [
  { name: 'John', secondName: 'Malkovich' },
  { name: 'John', secondName: 'Malkovich' },
  { name: 'John', secondName: 'Malkovich' },
]

const asyncRequest = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users)
    }, 3000)
  })
}

const GetItemsTest: FC = () => {
  const [state, sendRequest, actions] = useLazyRequest(asyncRequest)

  return (
    <div>
      <button>show users</button>
      <button>hide</button>

      <div data-cy-id={'resultBlock'}></div>
    </div>
  )
}

export default GetItemsTest
