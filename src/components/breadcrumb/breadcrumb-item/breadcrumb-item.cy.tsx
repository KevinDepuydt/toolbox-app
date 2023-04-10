import React from 'react'
import BreadcrumbItem from './breadcrumb-item'

const LABEL = 'label'
const PATH = '/path'
const ITEM: BreadcrumbItem = {
  label: LABEL,
  path: PATH
}

describe('<BreadcrumbItem />', () => {
  it('renders as text', () => {
    cy.mount(<BreadcrumbItem item={ITEM} last={true} />)
    cy.get('span').should('contain.text', LABEL)
    cy.get('a').should('not.exist')
    cy.get('svg').should('not.exist')
  })

  it('renders as link', () => {
    cy.mount(<BreadcrumbItem item={ITEM} last={false} />)
    cy.get('a')
      .should('have.attr', 'href', PATH)
      .and('contain.text', LABEL)
    cy.get('svg').should('be.visible')
    cy.get('span').should('not.exist')
  })
})
