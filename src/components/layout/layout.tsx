import React from 'react'
import Head from 'next/head'
import { Roboto } from 'next/font/google'
import styles from './layout.module.css'
import Breadcrumb from '@components/breadcrumb/breadcrumb';


const roboto = Roboto({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Kevin&apos;s tools</title>
        <meta name="description" content="A toolbox to handle common digital tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main data-cy="layout" className={`${styles.main} ${roboto.className}`}>
        <h1 data-cy="layout-title" className={styles.title}>Kevin&apos;s tools</h1>
        <p data-cy="layout-subtitle" className={styles.subtitle}>A list of tools to handle digital tasks</p>
        <Breadcrumb />
        <div data-cy="layout-content" className={styles.content}>
          {children}
        </div>
      </main>
    </>
  )
}
