/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react'
import { mount } from '@cypress/react'

import SearchQuery from './SearchQuery'

describe('<SearchQuery/>', () => {
  beforeEach(() => {
    mount(<SearchQuery />)

    cy.get('[data-cy-id=searchField]').should('be.visible')
  })

  it('show result for valid request', () => {
    cy.get('[data-cy-id=searchField]').type('search request')

    cy.get('[data-cy-id=loaderBlock]').should('be.visible')
    cy.get('[data-cy-id=resultBlock]').should('be.visible')

    cy.get('[data-cy-id=resultBlock]').should('contain.text', 'result')
    cy.get('[data-cy-id=resultBlock]').should('contain.text', 'search request')
  })

  it('show error block if promise reject error', () => {
    cy.get('[data-cy-id=searchField]').type('error request')

    cy.get('[data-cy-id=loaderBlock]').should('be.visible')
    cy.get('[data-cy-id=resultBlock]').should('not.exist')
    cy.get('[data-cy-id=errorBlock]').should('be.visible')

    cy.get('[data-cy-id=errorBlock]').should('contain.text', 'error')
  })

  it('clear result', () => {
    cy.get('[data-cy-id=searchField]').type('search request')
    cy.get('[data-cy-id=loaderBlock]').should('be.visible')

    cy.get('[data-cy-id=searchField]').clear()

    cy.get('[data-cy-id=loaderBlock]').should('not.exist')
    cy.get('[data-cy-id=resultBlock]').should('not.exist')
    cy.get('[data-cy-id=errorBlock]').should('not.exist')

    cy.get('[data-cy-id=placeholderBlock]').should('be.visible')
  })
})

export {}
