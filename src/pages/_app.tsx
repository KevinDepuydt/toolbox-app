import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@components/layout/layout';
import { NotificationsProvider } from '@contexts/notifications'


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </Layout>
  )
}
