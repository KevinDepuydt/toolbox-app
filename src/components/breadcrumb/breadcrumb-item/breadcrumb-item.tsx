import React from 'react'
import Link from 'next/link'
import { ArrowIcon } from '@components/icons'
import styles from './breadcrumb-item.module.css'


type BreadcrumbItemProps = {
  item: BreadcrumbItem
  last: boolean
}

export default function BreadcrumbItem({ item, last = false }: BreadcrumbItemProps) {
  if (last) {
    return (
      <div data-cy="breadcrumb-item" className={styles.container}>
        <span className={styles.text}>{item.label}</span>
      </div>
    )
  }

  return (
    <div data-cy="breadcrumb-item" className={styles.container}>
      <Link href={item.path} className={styles.link}>{item.label}</Link>
      <ArrowIcon className={styles.icon} />
    </div>
  )
}
