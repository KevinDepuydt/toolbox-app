import { ALERT_TYPE, AlertType, IMAGE_STATUS, ImageStatus } from '@constants'
import { compareFilesSize, formatFileSize } from './image-convert-list-item.utils'

type ImageConvertListItemState = {
  alertType: AlertType
  alertMessage: string
}

type Action = {
  type: ImageStatus
  image: ImageConvertState
}

export const initialState = {
  alertType: ALERT_TYPE.INFO,
  alertMessage: 'Select the image output format below then click the convert button'
}

export function reducer(state: ImageConvertListItemState, action: Action) {
  const newState = { ...state }
  const { type, image } = action
  switch (type) {
    case IMAGE_STATUS.NONE:
      newState.alertType = ALERT_TYPE.INFO
      newState.alertMessage = 'Select the image output format below then click the convert button'
      break
    case IMAGE_STATUS.PROCESSING:
      newState.alertType = ALERT_TYPE.INFO
      newState.alertMessage = 'Converting image ...'
      break
    case IMAGE_STATUS.DONE:
      newState.alertType = ALERT_TYPE.SUCCESS
      if (image.outputFile) {
        newState.alertMessage = `${image.outputFormat} image generated successfully, output image size is ${formatFileSize(image.outputFile)} (${compareFilesSize(image.inputFile, image.outputFile)}%)`
      } else {
        newState.alertMessage = `${image.outputFormat} image generated successfully`
      }
      break
    case IMAGE_STATUS.ERROR:
      newState.alertType = ALERT_TYPE.ERROR
      newState.alertMessage = image.error || 'Image format cannot be converted'
      break
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

  return newState
}
