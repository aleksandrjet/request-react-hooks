import React from 'react'
import { mount } from '@cypress/react'

import GetItems from './GetItemsByClick'

describe('<GetItemsByClick/>', () => {
  it('load and hide user list', () => {
    mount(<GetItems />)

    cy.get('[data-cy-id=placeholder]').should('be.visible')

    cy.get('[data-cy-id=loadButton]').should('be.visible').click()

    cy.get('[data-cy-id=resultBlock]').should('be.visible')

    cy.get('[data-cy-id=clearButton]').should('be.visible').click()

    cy.get('[data-cy-id=resultBlock]').should('not.exist')
  })
})
