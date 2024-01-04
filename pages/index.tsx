import Image from 'next/image'
import HeroSection from '@/components/pages/HeroSection'
import JournalSection from '@/components/pages/JournalSection'
import QuotesSection from '@/components/pages/QuotesSection'
import MoodSection from '@/components/pages/MoodSection'


export default function Home() {
  return (
    <>
      <HeroSection  
        heading='"Ceritakanlah Pengalaman Keseharianmu Melalui Note Kami, We share Our Hope Here!! "' 
        message='~Hikaru Notes'
      />
      <JournalSection/>
      <QuotesSection/>
      <MoodSection/>
    </>
  )
}
