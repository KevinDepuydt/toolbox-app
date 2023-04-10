import React from 'react'
import Button from './button'

// Constants
const BUTTON_LABEL = 'Click me'
const BUTTON_CUSTOM_CLASS = 'testing-class'
const LOG_MESSAGE = 'clicked!'
const onClick = () => console.log(LOG_MESSAGE)

describe('<Button />', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      cy.wrap(cy.spy(win.console, 'log')).as('consoleLog')
    })
  })

  it('renders with expected label', () => {
    cy.mount(<Button label={BUTTON_LABEL} onClick={onClick} />)
    cy.get('button').should('contain.text', BUTTON_LABEL)
  })

  it('renders with expected children', () => {
    const children = <span>{BUTTON_LABEL}</span>
    cy.mount(<Button onClick={onClick}>{children}</Button>)
    cy.get('button')
      .should('contain.html', `<span>${BUTTON_LABEL}</span>`)
      .and('contain.text', BUTTON_LABEL)
  })

  it('renders with expected classname', () => {
    cy.mount(<Button label={BUTTON_LABEL} onClick={onClick} className={BUTTON_CUSTOM_CLASS} />)
    cy.get('button').should('have.class', BUTTON_CUSTOM_CLASS)
  })

  it('runs onClick as expected', () => {
    cy.mount(<Button label={BUTTON_LABEL} onClick={onClick} />)
    cy.get('button').click()
    cy.get('@consoleLog').should('be.calledWith', LOG_MESSAGE)
  })
})
