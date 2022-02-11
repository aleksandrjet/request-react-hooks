import React from 'react'
import { mount } from '@cypress/react'

import GetItemsByMount from './GetItemsByMount'

describe('<GetItemsByMount/>', () => {
  it('load items on mount component', () => {
    mount(<GetItemsByMount />)

    cy.get('[data-cy-id=loaderText]').should('be.visible')
    cy.get('[data-cy-id=resultBlock]').should('be.visible')
  })
})
