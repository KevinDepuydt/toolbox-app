import React from 'react'
import FeatureList from './feature-list'


describe('<FeatureList />', () => {
  before(function() {
    cy.fixture('features').then((features) => {
      this.features = features
    })
  })

  it('renders feature items properly', function() {
    cy.mount(<FeatureList features={this.features} />)
    cy.get('[data-cy="feature-list"').should('be.visible')
    cy.get('[data-cy="feature-list"').children().should('have.length', this.features.length)
  })
})
