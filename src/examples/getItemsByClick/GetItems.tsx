import React, { FC } from 'react'
import { useLazyRequest } from '../../index'

type User = { name: string; secondName: string }

const users: User[] = [
  { name: 'John', secondName: 'Malkovich' },
  { name: 'John', secondName: 'Malkovich' },
  { name: 'John', secondName: 'Malkovich' },
]

const asyncRequest = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users)
    }, 3000)
  })
}

const GetItemsTest: FC = () => {
  const [state, sendRequest, actions] = useLazyRequest(asyncRequest)

  return (
    <div>
      {state.value ? (
        <button onClick={actions.clearState}>Reset user list</button>
      ) : (
        <button onClick={sendRequest}>Load users</button>
      )}

      {state.value && (
        <div data-cy-id={'resultBlock'}>
          {state.value.map((user, index) => {
            return (
              <p key={`user_${index}_${user.name}`}>
                {user.name} {user.secondName}
              </p>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default GetItemsTest
