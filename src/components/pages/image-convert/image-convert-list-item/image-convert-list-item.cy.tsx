import React from 'react'
import ImageConvertListItem from './image-convert-list-item'
import { IMAGE_STATUS } from '@constants'


describe('<ImageListItem />', () => {
  before(function () {
    cy.fixture('assets/sample-png.png').as('pngImage')
  })

  beforeEach(function() {
    this.pngImageFile = new File(
      [Cypress.Blob.base64StringToBlob(this.pngImage, 'image/png')],
      'sample-png.png',
      { type: 'image/png' }
    )
  })

  context('when image output format is not selected', () => {
    beforeEach(function() {
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: undefined,
        outputFormat: undefined,
        error: undefined,
        status: IMAGE_STATUS.NONE
      }
    })

    it('render image item', function() {
      cy.mount(
        <ImageConvertListItem
          image={this.image}
          onDelete={cy.stub()}
          onConvert={cy.stub()}
          onChange={cy.stub()}
        />
      )
      cy.get('[data-cy="image-convert-list-item"]').should('exist')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="alert"]').should('contain.text', 'Select the image output format')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'Select output format')
        .and('have.value', '')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]').find('option').should('have.length', 6)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="convert-button"]').should('contain.text', 'Convert').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })

    it('select output image format', function() {
      const onChangeSpy = cy.spy().as('onChange')
      cy.mount(
        <ImageConvertListItem
          image={this.image}
          onDelete={cy.stub()}
          onConvert={cy.stub()}
          onChange={onChangeSpy}
        />
      )

      cy.get('select[data-cy="output-format"]').select('jpeg')
      cy.get('select[data-cy="output-format"]').should('have.value', 'jpeg')
      cy.get('@onChange').should('be.calledOnce')
      cy.get('@onChange').should('be.calledWith', this.image, { outputFormat: 'jpeg', status: IMAGE_STATUS.NONE })
    })
  })

  context('when image output format is selected', () => {
    beforeEach(function() {
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: undefined,
        outputFormat: 'jpeg',
        error: undefined,
        status: IMAGE_STATUS.NONE
      }
    })

    it('render image item with selected format', function() {
      cy.mount(
        <ImageConvertListItem
          image={this.image}
          onDelete={cy.stub()}
          onConvert={cy.stub()}
          onChange={cy.stub()}
        />
      )
      cy.get('[data-cy="image-convert-list-item"]').should('exist')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="alert"]').should('contain.text', 'Select the image output format')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]')
        .should('exist')
        .and('be.visible')
        .and('have.value', 'jpeg')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]').find('option').should('have.length', 6)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="convert-button"]').should('contain.text', 'Convert').and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })
  })

  context('when image is processing', () => {
    beforeEach(function() {
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: undefined,
        outputFormat: 'jpeg',
        error: undefined,
        status: IMAGE_STATUS.PROCESSING
      }
    })

    it('render processing image item', function() {
      cy.mount(
        <ImageConvertListItem
          image={this.image}
          onDelete={cy.stub()}
          onConvert={cy.stub()}
          onChange={cy.stub()}
        />
      )
      cy.get('[data-cy="image-convert-list-item"]').should('exist')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="alert"]').should('contain.text', 'Converting image')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]')
        .should('exist')
        .and('be.visible')
        .and('be.disabled')
        .and('have.value', 'jpeg')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]').find('option').should('have.length', 6)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="convert-button"]').should('contain.text', 'Convert').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })
  })

  context('when image is processed successfully', () => {
    beforeEach(function() {
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: this.pngImageFile,
        outputFormat: 'jpeg',
        error: undefined,
        status: IMAGE_STATUS.DONE
      }
    })

    it('render processed image item', function() {
      cy.mount(
        <ImageConvertListItem
          image={this.image}
          onDelete={cy.stub()}
          onConvert={cy.stub()}
          onChange={cy.stub()}
        />
      )
      cy.get('[data-cy="image-convert-list-item"]').should('exist')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="alert"]').should('contain.text', 'image generated successfully')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]')
        .should('exist')
        .and('be.visible')
        .and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]').find('option').should('have.length', 6)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="convert-button"]').should('contain.text', 'Convert').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })
  })

  context('when image is not processed successfully', () => {
    beforeEach(function() {
      this.error = "Error compressing image"
      this.image = {
        id: 'sample-png',
        inputFile: this.pngImageFile,
        outputFile: undefined,
        outputFormat: 'jpeg',
        error: this.error,
        status: IMAGE_STATUS.ERROR
      }
    })

    it('render processed with error image item', function() {
      cy.mount(
        <ImageConvertListItem
          image={this.image}
          onDelete={cy.stub()}
          onConvert={cy.stub()}
          onChange={cy.stub()}
        />
      )
      cy.get('[data-cy="image-convert-list-item"]').should('exist')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="filename"]').should('contain.text', this.image.inputFile.name)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="alert"]').should('contain.text', this.error)
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]')
        .should('exist')
        .and('be.visible')
        .and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('select[data-cy="output-format"]').find('option').should('have.length', 6)
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="convert-button"]').should('contain.text', 'Convert').and('not.be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="download-button"]').should('contain.text', 'Download').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="preview-button"]').should('contain.text', 'Preview').and('be.disabled')
      cy.get('[data-cy="image-convert-list-item"]').find('[data-cy="delete-button"]').should('contain.text', 'Delete').and('not.be.disabled')
    })
  })
})
