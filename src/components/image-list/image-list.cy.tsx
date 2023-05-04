import React from 'react'
import ImageList from './image-list'
import ImageCompressListItem from '@components/pages/image-compress/image-compress-list-item/image-compress-list-item'
import { IMAGE_STATUS } from '@constants'


function createFile(blob: Blob, fileName: string, type: string) {
  return new File([blob], fileName, { type })
}

describe('<ImageList />', () => {
  before(function () {
    cy.fixture('assets/sample-png.png').as('pngImage')
    cy.fixture('assets/sample-jpg.jpg').as('jpgImage')
  })

  beforeEach(function() {
    const pngImageFile = createFile(Cypress.Blob.base64StringToBlob(this.pngImage, 'image/png'), 'sample-png.png', 'image/png')
    const jpgImageFile = createFile(Cypress.Blob.base64StringToBlob(this.jpgImage, 'image/jpg'), 'sample-jpg.jpg', 'image/jpg')

    this.images = [
      {
        id: 'sample-png',
        inputFile: pngImageFile,
        outputFile: undefined,
        done: false,
        error: undefined,
        status: IMAGE_STATUS.NONE
      },
      {
        id: 'sample-jpg',
        inputFile: jpgImageFile,
        outputFile: undefined,
        done: false,
        error: undefined,
        status: IMAGE_STATUS.NONE
      },
    ]
  })

  it('renders image list with no children', function () {
    cy.mount(<ImageList/>)
    cy.get('[data-cy="image-list"]').should('exist')
  })

  it('renders image list with children', function () {
    cy.mount(
      <ImageList>
        {this.images.map((image: ImageCompressState, index: number) => (
          <ImageCompressListItem
            key={index}
            image={image}
            onDelete={cy.stub()}
          />
        ))}
      </ImageList>
    )
    cy.get('[data-cy="image-list"]').should('exist')
    cy.get('[data-cy="image-list"]').should('be.visible')
    cy.get('[data-cy="image-list"]').children('[data-cy="image-compress-list-item"]')
      .should('exist')
      .and('have.length', this.images.length)
  })
})
