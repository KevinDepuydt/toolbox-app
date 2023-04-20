import React, { useRef } from 'react'
import styles from './file-drop-zone.module.css'


type FileDropZoneProps = {
  accept: string
  children?: React.ReactNode
  onSelect: (files: File[]) => void
}

export default function FileDropZone({ accept, children, onSelect }: FileDropZoneProps) {
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

  /**
   * Handle files drop
   * @param event
   */
  function handleDrop(event: React.DragEvent<HTMLInputElement>) {
    // prevent file from being opened)
    event.preventDefault()

    const fileTypeRegexp = new RegExp(accept)

    let files: File[] = []

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      files = Array.from(event.dataTransfer.items)
        .filter((item) => item.kind === 'file' && fileTypeRegexp.test(item.type))
        .reduce((items: File[], item) => {
          const file = item.getAsFile();
          if (file) {
            items.push(file)
          }

          return items;
        }, [])
    } else {
      // Use DataTransfer interface to access the file(s)
      files = Array.from(event.dataTransfer.files)
        .filter((item) => fileTypeRegexp.test(item.type))
    }

    onSelect(files)
  }

  function handleDragOver(event: React.DragEvent<HTMLInputElement>) {
    event.preventDefault()
  }

  return (
    <div
      data-cy="file-drop-zone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleBrowse}
      className={styles.container}
    >
      <input
        data-cy="file-drop-zone-input"
        type="file"
        multiple={true}
        ref={input}
        onChange={handleChange}
        accept={accept}
        className={styles.input}
      />
      <p
        data-cy="file-drop-zone-message"
        className={styles.help}
      >
        Drop files here or click to select
      </p>
      {children}
    </div>
  )
}
