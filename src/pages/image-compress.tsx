import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import apiService from '@services/api'
import fileService from '@services/file'
import FileDropZone from '@components/file-drop-zone/file-drop-zone'
import ImageList from '@components/image-compress/image-list/image-list'


export default function ImageCompressPage() {
  const [images, setImages] = useState<Image[]>([])

  useEffect(() => {
    (async () => {
      if (images.length) {
        const image = images.find((i) => !i.done);
        if (image) {
          try {
            const { data } = await apiService.compressImage(image)
            const file = await fileService.base64ToFile(data.base64, data.type, image.inputFile.name, '-min')
            updateImage(image, { outputFile: file })
          } catch (e: any) {
            updateImage(image, { error: e.response?.data?.error || e.message })
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
    setImages((state) => [...state, { id: uuid(), inputFile: file, done: false }])
  }

  function updateImage(image: Image, updates: Partial<Image>) {
    setImages(
      (arr) => arr.map(
        (item) => item.id === image.id
          ? { ...image, ...updates, done: true }
          : item
      )
    )
  }

  function deleteImage(image: Image) {
    setImages(
      (arr) => arr.filter(
        (item) => item.id !== image.id
      )
    )
  }

  return (
    <>
      <FileDropZone accept="image/*" onSelect={handleSelect} />
      <ImageList images={images} onDelete={deleteImage} />
    </>
  );
}
