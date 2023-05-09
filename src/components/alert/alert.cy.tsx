import React from 'react'
import { ALERT_TYPE } from '@constants'
import Alert from './alert'
import styles from './alert.module.css'

describe('<Alert />', () => {
  const alertMessage = 'alert message'

  it('renders success alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.SUCCESS} message={alertMessage} />)
    cy.get('[data-cy="alert"]').should('have.class', styles.success)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders error alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.ERROR} message={alertMessage} />)
    cy.get('[data-cy="alert"]').should('have.class', styles.error)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders warning alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.WARNING} message={alertMessage} />)
    cy.get('[data-cy="alert"]').should('have.class', styles.warning)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders info alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.INFO} message={alertMessage} />)
    cy.get('[data-cy="alert"]').should('have.class', styles.info)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders discreet success alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.SUCCESS} message={alertMessage} discreet={true} />)
    cy.get('[data-cy="alert"]')
      .should('have.class', styles.success)
      .and('have.class', styles.discreet)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders discreet error alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.ERROR} message={alertMessage} discreet={true} />)
    cy.get('[data-cy="alert"]')
      .should('have.class', styles.error)
      .and('have.class', styles.discreet)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders discreet warning alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.WARNING} message={alertMessage} discreet={true} />)
    cy.get('[data-cy="alert"]')
      .should('have.class', styles.warning)
      .and('have.class', styles.discreet)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })

  it('renders discreet info alert', () => {
    cy.mount(<Alert type={ALERT_TYPE.INFO} message={alertMessage} discreet={true} />)
    cy.get('[data-cy="alert"]')
      .should('have.class', styles.info)
      .and('have.class', styles.discreet)
    cy.get('[data-cy="alert-icon"]').should('exist')
    cy.get('[data-cy="alert-message"]').should('contain.text', alertMessage)
  })
})