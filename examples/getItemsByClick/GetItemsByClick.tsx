import React, { FC } from 'react'

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

const GetItemsTest: FC = () => {
  const [state, sendRequest, actions] = useLazyRequest(asyncRequest)

  return (
    <div>
      {state.value ? (
        <button onClick={actions.clearState} data-cy-id={'clearButton'}>
          Reset user list
        </button>
      ) : (
        <button onClick={sendRequest} data-cy-id={'loadButton'}>
          Load users
        </button>
      )}

      {state.value ? (
        <div data-cy-id={'resultBlock'}>
          {state.value.map((user, index) => {
            return (
              <p key={`user_${index}_${user.name}`}>
                {user.name} {user.secondName}
              </p>
            )
          })}
        </div>
      ) : (
        <p data-cy-id={'placeholder'}>Click by button for load users</p>
      )}
    </div>
  )
}

export default GetItemsTest
