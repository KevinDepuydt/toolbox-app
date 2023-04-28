import { useEffect, useReducer } from 'react'
import { ImageStatus } from '@constants'


type ImageStatusState = {
  isNone: boolean
  isProcessing: boolean
  isDone: boolean
  isError: boolean
}

type Action = {
  type: ImageStatus
}

const initialState = {
  isNone: true,
  isProcessing: false,
  isDone: false,
  isError: false,
}

function imageStatusReducer(state: ImageStatusState, action: Action) {
  const newState = { isNone: false, isProcessing: false, isDone: false, isError: false }
  switch (action.type) {
    case ImageStatus.NONE:
      newState.isNone = true
      break
    case ImageStatus.PROCESSING:
      newState.isProcessing = true
      break
    case ImageStatus.DONE:
      newState.isDone = true
      break
    case ImageStatus.ERROR:
      newState.isError = true
      break
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }

  return newState
}

export default function useImageStatus(image: ImageState) {
  const [imageStatus, dispatch] = useReducer(imageStatusReducer, initialState)

  useEffect(() => {
    dispatch({ type: image.status })
  }, [image])

  return imageStatus
}
