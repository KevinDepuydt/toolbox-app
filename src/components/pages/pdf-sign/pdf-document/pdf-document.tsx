import React from 'react'
import styles from './pdf-document.module.css'
import PdfDocumentCanvas from '../pdf-document-canvas/pdf-document-canvas'


type PdfDocumentProps = {
  file: File
}

export default function PdfDocument({ file }: PdfDocumentProps) {
  console.log('PdfDocument: render')
  return (
    <div className={styles.container}>
      <div>
        {/* drop area where we can drag signatures */}
      </div>
      <PdfDocumentCanvas file={file} />
    </div>
  )
}
