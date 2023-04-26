import React from 'react'
import styles from './image-list.module.css'


type ImageListProps = {
  children?: React.ReactNode
}

export default function ImageList({ children }: ImageListProps) {
  return (
    <div data-cy="convert-image-list" className={styles.container}>
      {children}
    </div>
  )
}
