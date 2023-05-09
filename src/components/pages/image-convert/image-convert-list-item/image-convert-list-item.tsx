import React, { useEffect, useReducer } from 'react'
import { ArrowDownTrayIcon, ArrowPathIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { IMAGE_CONVERT_OUTPUT_FORMAT, IMAGE_STATUS } from '@constants'
import fileService from '@services/file'
import useImageStatus from '@hooks/image-status'
import { LoadingIcon } from '@components/icons'
import Alert from '@components/alert/alert'
import { initialState, reducer } from './image-convert-list-item.reducer'
import styles from './image-convert-list-item.module.css'


type ImageConvertListItemProps = {
  image: ImageConvertState,
  onChange: (image: ImageConvertState, updates: Partial<ImageConvertState>) => void,
  onConvert: (image: ImageConvertState) => Promise<void>,
  onDelete: (image: ImageConvertState) => void
}

export default function ImageConvertListItem({ image, onChange, onConvert, onDelete }: ImageConvertListItemProps) {
  const { isProcessing, isDone } = useImageStatus(image)
  const [state, dispatch] = useReducer(reducer, initialState)
  const availableFormats = IMAGE_CONVERT_OUTPUT_FORMAT.filter((format) => image.inputFile.type.replace('image/', '') !== format)

  useEffect(() => {
    console.log('update state effect')
    dispatch({ type: image.status, image })
  }, [image])

  async function handleDownload() {
    if (image.outputFile) {
      const src = await fileService.fileToDataUrl(image.outputFile)
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

  async function handleConvert() {
    await onConvert(image)
  }

  function handleFormatSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    onChange(image, { outputFormat: e.target.value, status: IMAGE_STATUS.NONE })
  }

  return (
    <div data-cy="image-convert-list-item" className={styles.container}>
      <div className={styles.details}>
        <p data-cy="filename" title={image.inputFile.name} className={styles.filename}>{image.inputFile.name}</p>
        <Alert
          type={state.alertType}
          message={state.alertMessage}
          discreet={true}
        />
      </div>
      <div className={styles.actions}>
        <div className={styles.formatSelect}>
          <select
            id="formats"
            className={styles.select}
            onChange={handleFormatSelect}
            value={image.outputFormat}
            disabled={isProcessing}
            data-cy="output-format"
          >
            <option value={''}>Select output format</option>
            {availableFormats.map((format) => (
              <option
                key={format}
                value={format}
              >
                {format}
              </option>
            ))}
          </select>
          <button
            data-cy="convert-button"
            onClick={handleConvert}
            className={styles.convertButton}
            disabled={!image.outputFormat || isProcessing || isDone}
          >
            {isProcessing ? <LoadingIcon /> : <ArrowPathIcon height={20} width={20} strokeWidth={2} />}
            <span className="sr-only">Convert</span>
          </button>
        </div>
        <div>
          <button
            data-cy="preview-button"
            onClick={handleOpen}
            disabled={!image.outputFile}
            className={styles.buttonDefault}
          >
            <EyeIcon width={20} height={20} strokeWidth={2} />
            <span className="sr-only">Preview</span>
          </button>
          <button
            data-cy="download-button"
            onClick={handleDownload}
            disabled={!isDone}
            className={styles.successButton}
          >
            <ArrowDownTrayIcon width={20} height={20} strokeWidth={2} />
            <span className="sr-only">Download</span>
          </button>
          <button
            data-cy="delete-button"
            onClick={handleDelete}
            className={styles.errorButton}
          >
            <TrashIcon width={20} height={20} strokeWidth={2} />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
