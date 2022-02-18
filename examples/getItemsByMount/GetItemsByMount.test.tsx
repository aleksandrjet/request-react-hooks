import React from 'react'
import { mount } from '@cypress/react'

import GetItemsByMount from './GetItemsByMount'

describe('<GetItemsByMount/>', () => {
  it('elements are loaded when component is mounted', () => {
    mount(<GetItemsByMount />)

    cy.getByTestId('loaderText').should('be.visible')
    cy.getByTestId('resultBlock').should('be.visible')
  })
})
