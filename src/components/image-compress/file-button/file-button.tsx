import React, { useRef } from 'react'
import Button from '@components/button'
import { UploadIcon } from '@components/icons'
import styles from './file-button.module.css'


type FileButtonProps = {
  onSelect: (files: File[]) => void
}

export default function FileButton({ onSelect }: FileButtonProps) {
  const input = useRef<HTMLInputElement>(null)

  /**
   * Handle browse file
   */
  function handleBrowse() {
    if (input.current) {
      input.current.click()
    }
  }

  /**
   * Handle selected files then reset file input
   * @param event
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      onSelect(Array.from(event.target.files))
      event.target.value = ""
    }
  }

  return (
    <>
      <input
        type="file"
        multiple={true}
        ref={input}
        onChange={handleChange}
        accept="image/*"
        className={styles.input}
      />
      <Button onClick={handleBrowse} className={styles.button}>
        <UploadIcon />
        <span className={styles.label}>Upload</span>
      </Button>
    </>
  )
}
