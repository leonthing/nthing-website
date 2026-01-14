import Navigation from '@/components/website/Navigation'
import Hero from '@/components/website/Hero'
import About from '@/components/website/About'
import Investors from '@/components/website/Investors'
import Solutions from '@/components/website/Solutions'
import Platform from '@/components/website/Platform'
import Products from '@/components/website/Products'
import References from '@/components/website/References'
import Partners from '@/components/website/Partners'
import FreshProduceInquiry from '@/components/website/FreshProduceInquiry'
import ContactForm from '@/components/website/ContactForm'
import Footer from '@/components/website/Footer'

export const metadata = {
  title: 'N.THING | AI 기반 수직농장 솔루션',
  description: 'AI 데이터 플랫폼과 수직농장 기술로 지속 가능한 농업의 새로운 기준을 만들어갑니다. 모듈형 컨테이너 농장부터 대규모 건물형 수직농장까지.',
  keywords: '수직농장, 스마트팜, AI 농업, 컨테이너 농장, CUBE, 엔씽, N.THING',
  openGraph: {
    title: 'N.THING | AI 기반 수직농장 솔루션',
    description: 'AI 데이터 플랫폼과 수직농장 기술로 지속 가능한 농업의 새로운 기준을 만들어갑니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'N.THING'
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Platform />
      <Solutions />
      <Products />
      <References />
      <Partners />
      <FreshProduceInquiry />
      <ContactForm />
      <Investors />
      <Footer />
    </main>
  )
}
