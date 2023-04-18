import { DownloadIcon, EyeIcon, LoadingIcon, TrashIcon } from '@components/icons'
import { compareFilesSize, fileToDataUrl, formatFileSize } from './image-list-item.utils'
import styles from './image-list-item.module.css'


type ImageCardProps = {
  image: Image,
  onDelete: (image: Image) => void
}

export default function ImageListItem({ image, onDelete }: ImageCardProps) {
  async function handleDownload() {
    if (image.outputFile) {
      const src = await fileToDataUrl(image.outputFile)
      const link = document.createElement('a')
      link.setAttribute('href', src)
      link.setAttribute('download', image.outputFile.name)
      link.click()
    }
  }

  function handleDelete() {
    onDelete(image)
  }

  function handleOpen() {
    if (image.outputFile) {
      const url = URL.createObjectURL(image.outputFile)
      window.open(url, '_blank')
    }
  }

  return (
    <div data-cy="image-list-item" className={styles.container}>
      <div className={styles.details}>
        <p data-cy="image-list-item-filename" className={styles.filename}>{image.inputFile.name}</p>
        <p data-cy="image-list-item-status" className={styles.status}>
          {!image.done && <span>Compressing image ...</span>}
          {image.done && image.outputFile && <span className={styles.successStatus}>File size is now {formatFileSize(image.outputFile)} ({compareFilesSize(image.inputFile, image.outputFile)}%)</span>}
          {image.done && !image.outputFile && <span className={styles.errorStatus}>{image.error}</span>}
        </p>
      </div>
      <div className={styles.actions}>
        <button
          data-cy="image-list-item-preview-button"
          onClick={handleOpen}
          disabled={!image.outputFile}
          className={styles.buttonDefault}
        >
          <EyeIcon />
          <span className="sr-only">Preview</span>
        </button>
        <button
          data-cy="image-list-item-download-button"
          onClick={handleDownload}
          disabled={!image.done || !image.outputFile}
          className={styles.successButton}
        >
          {image.done ? <DownloadIcon /> : <LoadingIcon />}
          <span className="sr-only">Download</span>
        </button>
        <button
          data-cy="image-list-item-delete-button"
          onClick={handleDelete}
          className={styles.errorButton}
        >
          <TrashIcon />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </div>
  )
}
