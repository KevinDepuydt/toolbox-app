import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { IMAGE_STATUS, ImageStatus } from '@constants'
import apiService from '@services/api'
import fileService from '@services/file'
import FileDropZone from '@components/file-drop-zone/file-drop-zone'
import ImageList from '@components/image-list/image-list'
import ImageCompressListItem from '@components/pages/image-compress/image-compress-list-item/image-compress-list-item'


export default function ImageCompressPage() {
  const [images, setImages] = useState<ImageCompressState[]>([])

  useEffect(() => {
    (async () => {
      if (images.length) {
        const image = images.find((i) => i.status === IMAGE_STATUS.NONE)
        if (image) {
          try {
            updateImage(image, { status: IMAGE_STATUS.PROCESSING })
            const { data } = await apiService.compressImage(image)
            const file = await fileService.base64ToFile(data.base64, data.type, image.inputFile.name, '-min')
            updateImage(image, {
              status: IMAGE_STATUS.DONE,
              outputFile: file,
              outputFileSizeDiff: fileService.compareFilesSize(image.inputFile, file)
            })
          } catch (e: any) {
            updateImage(image, {
              status: IMAGE_STATUS.ERROR,
              error: e.response?.data?.error || e.message
            })
          }
        }
      }
    })();
  }, [images])

  function handleSelect(files: File[]) {
    if (files.length > 0) {
      files.forEach((file) => addImage(file))
    }
  }

  function addImage(file: File) {
    setImages((state) => [...state, { id: uuid(), inputFile: file, status: IMAGE_STATUS.NONE }])
  }

  function updateImage(image: ImageCompressState, updates: Partial<ImageCompressState>) {
    setImages(
      (arr) => arr.map(
        (item) => item.id === image.id
          ? { ...image, ...updates }
          : item
      )
    )
  }

  function deleteImage(image: ImageCompressState) {
    setImages(
      (arr) => arr.filter(
        (item) => item.id !== image.id
      )
    )
  }

  return (
    <>
      <FileDropZone accept="image/*" onSelect={handleSelect} />
      <ImageList>
        {images.map((image) => (
          <ImageCompressListItem key={image.id} image={image} onDelete={deleteImage} />
        ))}
      </ImageList>
    </>
  );
}
