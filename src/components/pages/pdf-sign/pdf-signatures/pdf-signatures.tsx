import React from 'react'
import styles from './pdf-signatures.module.css'


type PdfSignaturesProps = {}

export default function PdfSignatures({}: PdfSignaturesProps) {
  return (
    <div className={styles.container}>
      <h3>Signatures</h3>
      <div>
        {/* signatures list goes here */}
      </div>
      <button>Add</button>
    </div>
  )
}
