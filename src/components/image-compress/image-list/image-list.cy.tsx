import React from 'react'
import ImageList from './image-list'


function createFile(blob: Blob, fileName: string, type: string) {
  return new File([blob], fileName, { type })
}

describe('<ImageList />', () => {
  before(function () {
    cy.fixture('assets/sample-png.png').as('pngImage')
    cy.fixture('assets/sample-jpg.jpg').as('jpgImage')
  })

  beforeEach(function() {
    this.pngImageFile = createFile(Cypress.Blob.base64StringToBlob(this.pngImage, 'image/png'), 'sample-png.png', 'image/png')
    this.jpgImageFile = createFile(Cypress.Blob.base64StringToBlob(this.jpgImage, 'image/jpg'), 'sample-jpg.jpg', 'image/jpg')
  })

  context('when no images are provided', () => {
    beforeEach(function() {
      this.images = []
    })

    it('renders image list container', function() {
      cy.mount(<ImageList images={this.images} onDelete={cy.stub()} />)
      cy.get('[data-cy="image-list"]').should('exist')
    })

    it('does not render image items', function() {
      cy.mount(<ImageList images={this.images} onDelete={cy.stub()} />)
      cy.get('[data-cy="image-list"]').should('exist')
      cy.get('[data-cy="image-list"]').children('[data-cy="image-list-item"]').should('not.exist')
    })
  })

  context('when some images are provided', () => {
    beforeEach(function() {
      this.images = [
        {
          id: 'sample-png',
          inputFile: this.pngImageFile,
          outputFile: undefined,
          done: false,
          error: undefined
        },
        {
          id: 'sample-jpg',
          inputFile: this.jpgImageFile,
          outputFile: undefined,
          done: false,
          error: undefined
        },
      ]
    })

    it('renders image items', function() {
      cy.mount(<ImageList images={this.images} onDelete={cy.stub()} />)
      cy.get('[data-cy="image-list"]').should('be.visible')
      cy.get('[data-cy="image-list"]').children('[data-cy="image-list-item"]').should('have.length', this.images.length)
    })

    // it(('does not handle image item download button click'), function() {
    //   cy.mount(<ImageList images={this.images} onDelete={cy.stub()} />)
    //   cy.get('[data-cy="image-list"]').should('be.visible')
    //   cy.get('[data-cy="image-list"]').children('[data-cy="image-list-item"]').first().find('[data-cy="image-list-item-download-button"]').should('be.disabled')
    // })
    //
    // it(('does not handle image item preview button click'), function() {
    //   cy.mount(<ImageList images={this.images} onDelete={cy.stub()} />)
    //   cy.get('[data-cy="image-list"]').should('be.visible')
    //   cy.get('[data-cy="image-list"]').children('[data-cy="image-list-item"]').first().find('[data-cy="image-list-item-preview-button"]').should('be.disabled')
    // })

    it(('handles image item delete button click'), function() {
      const onDeleteSpy = cy.spy(cy.stub()).as('onDeleteSpy')
      cy.mount(<ImageList images={this.images} onDelete={onDeleteSpy} />)
      cy.get('[data-cy="image-list"]').children('[data-cy="image-list-item"]').first().find('[data-cy="image-list-item-delete-button"]').click()
      cy.get('@onDeleteSpy').should('be.calledOnce')
      cy.get('@onDeleteSpy').should('be.calledWith', this.images[0])
    })
  })
})
