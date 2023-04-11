import React from 'react'
import FeatureListItem from './feature-list-item'


describe('<FeatureListItem />', () => {
  before(function() {
    cy.fixture('features').then((features) => {
      this.feature = features[0]
    })
  })

  it('renders feature list item correctly', function() {
    cy.mount(<FeatureListItem feature={this.feature} />)
    cy.get('a').should('be.visible').and('have.attr', 'href', this.feature.path)
    cy.get('h3').should('contain.text', this.feature.name)
    cy.get('p').should('contain.text', this.feature.description)
  })
})
