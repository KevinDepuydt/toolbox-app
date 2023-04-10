import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BreadcrumbItem from './breadcrumb-item/breadcrumb-item'
import styles from './breadcrumb.module.css'


export default function Breadcrumb() {
  const router = useRouter()
  const [items, setItems] = useState<BreadcrumbItem[]>([])

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
    <nav className={styles.container}>
      {items.map((item, index) => (
        <BreadcrumbItem
          key={`breadcrumb-item-${index}}`}
          item={item}
          last={index === (items.length - 1)}
        />
      ))}
    </nav>
  )
}
