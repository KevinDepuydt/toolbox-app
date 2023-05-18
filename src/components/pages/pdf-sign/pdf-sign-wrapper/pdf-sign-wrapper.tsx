import React from 'react'
import styles from './pdf-sign-wrapper.module.css'
import PdfSignatures from '@components/pages/pdf-sign/pdf-signatures/pdf-signatures'
import PdfDocument from '@components/pages/pdf-sign/pdf-document/pdf-document'
import FileDropZone from '@components/file-drop-zone/file-drop-zone'


type PdfSignWrapperProps = {
  file?: File
  onFileSelect: (files: File[]) => void
}

export default function PdfSignWrapper({ file, onFileSelect }: PdfSignWrapperProps) {
  return (
    <div className={styles.wrapper}>
      {file ? (
        <PdfDocument file={file} />
      ) : (
        <FileDropZone
          accept="application/pdf"
          onSelect={onFileSelect}
          multiple={false}
        />
      )}
      <div>
        {/* PdfSignButton */}
        <PdfSignatures />
      </div>
    </div>
  )
}
