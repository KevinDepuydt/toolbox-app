import { useEffect, useState } from 'react'
import {  useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@styles/breadcrumb.module.css'

type Item = {
  path: string
  label: string
}

const HOME_ITEM: Item = { path: '/', label: 'Home' };

export default function Breadcrumb() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const items = router.asPath
      .split('/')
      .filter((path, index) => path.length > 0 || index === 0)

    setItems(() => items.map((item: string) => ({
      path: `/${item}`,
      label: !!item.length ? item : 'Home',
    })))
  }, [router.asPath])

  return (
    <nav className="inline-flex items-center">
      {items.map((item, index) => (
        <BreadcrumbItem key={`breadcrumb-item-${index}}`} item={item} last={index === (items.length - 1)} />
      ))}
    </nav>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true" className={styles.icon} fill="currentColor" viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

type BreadcrumbItemProps = {
  item: Item
  last: boolean
}

function BreadcrumbItem({ item, last = false }: BreadcrumbItemProps) {
  if (last) {
    return (
      <div className="flex items-center">
        <span className={styles.text}>{item.label}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <Link href={item.path} className={styles.link}>{item.label}</Link>
      <ArrowIcon />
    </div>
  )
}
