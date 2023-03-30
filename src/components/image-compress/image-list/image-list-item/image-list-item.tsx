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
    <div className={styles.container}>
      <div className={styles.details}>
        <p className={styles.filename}>{image.inputFile.name}</p>
        <p className={styles.status}>
          {!image.done && <span>Compressing image ...</span>}
          {image.done && image.outputFile && <span className={styles.successStatus}>File size is now {formatFileSize(image.outputFile)} ({compareFilesSize(image.inputFile, image.outputFile)}%)</span>}
          {image.done && !image.outputFile && <span className={styles.errorStatus}>{image.error}</span>}
        </p>
      </div>
      <div className={styles.actions}>
        <button disabled={!image.done || !image.outputFile} onClick={handleOpen} className={styles.buttonDefault}>
          <EyeIcon />
          <span className="sr-only">Preview</span>
        </button>
        <button disabled={!image.done || !image.outputFile} onClick={handleDownload} className={styles.successButton}>
          {image.done ? <DownloadIcon /> : <LoadingIcon />}
          <span className="sr-only">Download</span>
        </button>
        <button onClick={handleDelete} className={styles.errorButton}>
          <TrashIcon />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </div>
  )
}
