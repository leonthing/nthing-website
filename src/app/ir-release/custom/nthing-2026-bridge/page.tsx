'use client'

import { useEffect, useState, useRef } from 'react'
import Navigation from '@/components/website/Navigation'
import Footer from '@/components/website/Footer'

// Animated Counter Component
function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number, suffix?: string, prefix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const startTime = Date.now()

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(easeOut * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return <div ref={ref}>{prefix}{value.toLocaleString()}{suffix}</div>
}

// Animated Section Component
function AnimatedSection({
  children,
  delay = 0,
  className = '',
  direction = 'up'
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left': return 'opacity-0 -translate-x-10'
        case 'right': return 'opacity-0 translate-x-10'
        default: return 'opacity-0 translate-y-10'
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0'
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${getTransform()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function NThing2026BridgePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-black" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25">
                  <span className="text-white font-bold text-2xl">N</span>
                </div>
                <div>
                  <p className="text-green-400 font-medium">주식회사 엔씽</p>
                  <p className="text-gray-500 text-sm">N.THING Inc.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
                  2026 Q1 Bridge Round
                </span>
                <span className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium border border-orange-500/20">
                  Confidential
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                스마트팜으로 만드는
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  지속가능한 식량 생태계
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                데이터와 디지털 인프라를 기반으로 아시아 신선채소 시장의
                핵심 공급자로 도약합니다.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex flex-wrap gap-4">
                <a href="#investment" className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/25">
                  투자 개요 보기
                </a>
                <a href="mailto:ir@nthing.net" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all">
                  IR 담당자 연락
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Key Metrics Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
              Key Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
              핵심 투자 지표
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: 64, suffix: '%', label: '영업손실 감소', sublabel: 'YoY 2024', color: 'green' },
              { value: 89, suffix: '%', label: '물 사용량 절감', sublabel: 'vs 전통농업', color: 'blue' },
              { value: 60, suffix: '%', label: '인건비 절감', sublabel: '삼성웰스토리 PoC', color: 'purple' },
              { value: 1.78, suffix: '조', label: '프로젝트 파이프라인', sublabel: '누적 계약', color: 'orange', prefix: '₩' },
            ].map((stat, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className={`bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-${stat.color}-500/30 transition-all group`}>
                  <div className={`text-3xl sm:text-4xl font-bold text-${stat.color}-400 mb-2`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                  </div>
                  <p className="text-white font-medium">{stat.label}</p>
                  <p className="text-gray-500 text-sm">{stat.sublabel}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                Core Technology
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-6">
                CUBE System &<br />
                <span className="text-blue-400">CUBE OS</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                자체 개발한 CUBE 시스템과 CUBE OS를 통해 완벽한 환경 제어가 가능합니다.
                온도, 습도, LED, CO2, 양분을 실시간 모니터링하고 원격으로 관리합니다.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🌡️', title: '환경 제어', desc: '온도, 습도, CO2 실시간 모니터링' },
                  { icon: '💡', title: 'LED 시스템', desc: '최적 광량 자동 조절' },
                  { icon: '🌱', title: '양분 관리', desc: 'AI 기반 양액 공급 최적화' },
                  { icon: '📱', title: '원격 관리', desc: '클라우드 기반 농장 통합 관리' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-3xl transform rotate-3" />
                <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 overflow-hidden">
                  {/* Mock Dashboard */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">CUBE OS Dashboard</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Online</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: '온도', value: '22.5°C', color: 'orange' },
                        { label: '습도', value: '65%', color: 'blue' },
                        { label: 'CO2', value: '800ppm', color: 'green' },
                        { label: 'LED', value: '85%', color: 'yellow' },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-3">
                          <p className="text-gray-500 text-xs mb-1">{item.label}</p>
                          <p className={`text-${item.color}-400 font-mono font-bold`}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="h-32 bg-white/5 rounded-lg flex items-end p-4 gap-1">
                      {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 90].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs text-center">24시간 생육 데이터</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Market Traction Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium border border-orange-500/20">
              Market Traction
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              검증된 시장 성과
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              &ldquo;뿌리가 살아있는 신선채소&rdquo; 제품 라인은 주요 유통채널에서
              소비자 평점 4.8점을 유지하고 있습니다.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'E-mart', logo: '🛒', desc: '전국 매장 입점' },
              { name: 'Coupang', logo: '📦', desc: '로켓프레시 파트너' },
              { name: 'B-mart', logo: '🚀', desc: '배민 B마트 공급' },
              { name: 'Samsung', logo: '🏢', desc: '웰스토리 계약' },
            ].map((partner, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-500/30 hover:bg-zinc-900 transition-all group">
                  <div className="text-4xl mb-4">{partner.logo}</div>
                  <p className="text-white font-bold text-lg">{partner.name}</p>
                  <p className="text-gray-500 text-sm">{partner.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Rating Badge */}
          <AnimatedSection delay={400} className="mt-12">
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white font-bold">4.8</span>
                <span className="text-gray-400">소비자 평점</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Financial Roadmap */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
              Financial Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
              재무 성장 로드맵
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-green-500 to-orange-500 hidden md:block" />

              {[
                { year: '2024', revenue: '영업손실 64% 감소', highlight: '턴어라운드 원년', color: 'purple', align: 'right' },
                { year: '2025', revenue: '35억원 (BEP 달성)', highlight: '영업이익 흑자전환', color: 'green', align: 'left' },
                { year: '2026', revenue: '250억원', highlight: '괴산 Giga Farm 착공', color: 'blue', align: 'right' },
                { year: '2027', revenue: '500억원', highlight: 'KOSDAQ 상장', color: 'orange', align: 'left' },
              ].map((item, idx) => (
                <AnimatedSection key={idx} delay={idx * 150} className={`relative md:w-1/2 ${item.align === 'left' ? 'md:ml-auto md:pl-12' : 'md:pr-12'} mb-8`}>
                  <div className={`bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-${item.color}-500/30 transition-all`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 bg-${item.color}-500/20 text-${item.color}-400 rounded-full text-sm font-bold`}>
                        {item.year}
                      </span>
                      <span className="text-gray-500 text-sm">{item.highlight}</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{item.revenue}</p>
                  </div>
                  {/* Timeline Dot */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-${item.color}-500 rounded-full border-4 border-black hidden md:block ${item.align === 'left' ? '-left-2' : '-right-2'}`} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Major Projects Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-medium border border-green-500/20">
              Project Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              주요 프로젝트
            </h2>
            <p className="text-gray-400">누적 파이프라인 가치 1.78조원</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-green-500/10 to-zinc-900 border border-green-500/20 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🏭</span>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold text-lg">괴산 Giga Farm</p>
                    <p className="text-gray-500 text-sm">충북 괴산군</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">프로젝트 규모</span>
                    <span className="text-white font-bold">1,000억원+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">착공 예정</span>
                    <span className="text-white font-bold">2026년</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">연간 생산량</span>
                    <span className="text-white font-bold">1,000만+ 팩</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🤝</span>
                  </div>
                  <div>
                    <p className="text-blue-400 font-bold text-lg">지자체 계약</p>
                    <p className="text-gray-500 text-sm">여주, 동두천, 장성</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">총 계약 규모</span>
                    <span className="text-white font-bold">1.78조원</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {['여주시', '동두천시', '장성군'].map((city, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-gray-300">{city} 스마트팜 구축</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium border border-orange-500/20">
              Investment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
              투자 라운드
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-orange-500/10 via-zinc-900 to-zinc-900 border border-orange-500/20 rounded-3xl p-8 sm:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-400 mb-2">현재 라운드</p>
                    <p className="text-3xl font-bold text-white mb-6">Bridge Financing</p>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-gray-400">목표 금액</span>
                        <span className="text-white font-bold">100~150억원</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-gray-400">확정 투자</span>
                        <span className="text-green-400 font-bold">25억원 (삼성벤처투자)</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-400">Pre-IPO</span>
                        <span className="text-white font-bold">착공 후 6개월 내</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">
                    <p className="text-orange-400 font-medium mb-4">Exit Strategy</p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-orange-400 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">KOSDAQ 상장</p>
                          <p className="text-gray-500 text-sm">2027년 하반기 목표</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-orange-400 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">주관사</p>
                          <p className="text-gray-500 text-sm">삼성증권 대표주관</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
              <div className="relative p-8 sm:p-12 md:p-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  투자 미팅을 원하시나요?
                </h2>
                <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
                  엔씽의 성장 스토리와 투자 기회에 대해 더 자세히 안내해 드리겠습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:ir@nthing.net"
                    className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg"
                  >
                    ir@nthing.net
                  </a>
                  <a
                    href="tel:02-1234-5678"
                    className="px-8 py-4 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all border border-white/30"
                  >
                    02-1234-5678
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
