import React from 'react'
import { mount } from '@cypress/react'

import SearchQuery from './SearchQuery'

describe('<SearchQuery/>', () => {
  beforeEach(() => {
    mount(<SearchQuery />)

    cy.getByTestId('searchField').should('be.visible')
  })

  it('shows result for valid query', () => {
    cy.getByTestId('searchField').type('search request')

    cy.getByTestId('loaderBlock').should('be.visible')
    cy.getByTestId('resultBlock').should('be.visible')

    cy.getByTestId('resultBlock').should('contain.text', 'result')
    cy.getByTestId('resultBlock').should('contain.text', 'search request')
  })

  it('shows error block if promise was rejected', () => {
    cy.getByTestId('searchField').type('error request')

    cy.getByTestId('loaderBlock').should('be.visible')
    cy.getByTestId('resultBlock').should('not.exist')
    cy.getByTestId('errorBlock').should('be.visible')

    cy.getByTestId('errorBlock').should('contain.text', 'error')
  })

  it('calling clearState action will clear result', () => {
    cy.getByTestId('searchField').type('search request')
    cy.getByTestId('loaderBlock').should('be.visible')

    cy.getByTestId('searchField').clear()

    cy.getByTestId('loaderBlock').should('not.exist')
    cy.getByTestId('resultBlock').should('not.exist')
    cy.getByTestId('errorBlock').should('not.exist')

    cy.getByTestId('placeholderBlock').should('be.visible')
  })
})

export {}
