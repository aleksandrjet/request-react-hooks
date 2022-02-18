import React from 'react'
import { mount } from '@cypress/react'

import GetItems from './GetItemsByClick'

describe('<GetItemsByClick/>', () => {
  it('loading and hiding list of users', () => {
    mount(<GetItems />)

    cy.getByTestId('placeholder').should('be.visible')

    cy.getByTestId('loadButton').should('be.visible').click()

    cy.getByTestId('resultBlock').should('be.visible')

    cy.getByTestId('clearButton').should('be.visible').click()

    cy.getByTestId('resultBlock').should('not.exist')
  })
})
