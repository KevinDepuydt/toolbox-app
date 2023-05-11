import React from 'react'
import NotificationsContainer from './notifications-container'

describe('<NotificationsContainer />', () => {
  beforeEach(function() {
    cy.fixture('notifications').as('notifications')
  })

  it('renders notifications container and items', function() {
    const notifications = [
      this.notifications.infoNotification,
      this.notifications.successNotification,
      this.notifications.warningNotification,
      this.notifications.errorNotification
    ]

    cy.mount(<NotificationsContainer notifications={notifications} onDelete={cy.stub()} />)
    cy.get('[data-cy="notifications-container"]').should('be.visible')
    cy.get('[data-cy="notifications-container"]').find('[data-cy="notification-item"]').should('have.length', notifications.length)
  })

  it('handles notification item delete', function() {
    const notifications = [
      this.notifications.infoNotification,
      this.notifications.successNotification,
    ]
    const onDelete = cy.spy(cy.stub()).as('onDeleteSpy')
    cy.mount(<NotificationsContainer notifications={notifications} onDelete={onDelete} />)
    cy.get('[data-cy="notifications-container"]').should('be.visible')
    cy.get('[data-cy="notifications-container"]').find('[data-cy="notification-item"]').first().click()
    cy.get('@onDeleteSpy').should('be.calledOnce')
    cy.get('@onDeleteSpy').should('be.calledWith', notifications[0].id)
    cy.wait(1000)
    cy.get('[data-cy="notifications-container"]').find('[data-cy="notification-item"]').should('have.length', notifications.length - 1)
  })
})
