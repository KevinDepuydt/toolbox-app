import React from 'react'
import Head from 'next/head'
import { Roboto } from 'next/font/google'
import styles from '@styles/layout.module.css'
import Breadcrumb from '@components/breadcrumb';


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

type LayoutProps = {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/*<Head>*/}
      {/*  <title>Kevin&apos;s tools</title>*/}
      {/*  <meta name="description" content="A toolbox to handle common tasks" />*/}
      {/*  <meta name="viewport" content="width=device-width, initial-scale=1" />*/}
      {/*  <link rel="icon" href="/favicon.ico" />*/}
      {/*</Head>*/}
      <main className={`${styles.main} ${roboto.className}`}>
        <h1 className={styles.title}>Kevin&apos;s tools</h1>
        <p className={styles.subtitle}>A list of tools to handle digital tasks</p>
        <Breadcrumb />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </>
  )
}
