import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { ChakraProvider } from '@chakra-ui/react'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <div className={`bg-white ${inter.className}`}>
        <ChakraProvider>
            <Header/>
              <Component {...pageProps} />
            <Footer/>
        </ChakraProvider>
      </div>
    </>
  )
}
