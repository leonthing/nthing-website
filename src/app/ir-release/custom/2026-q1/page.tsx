'use client'

import { useState, useEffect, useRef } from 'react'
import Navigation from '@/components/website/Navigation'
import Footer from '@/components/website/Footer'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

const AnimatedSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

export default function IRReleasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center">
            <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full mb-6">
              <span className="text-blue-300 font-semibold">IR Release</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              2026 Q1
            </h1>
            <p className="text-2xl md:text-3xl text-blue-200 mb-8">
              주식회사 엔씽
            </p>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                N.THING
              </h2>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                AI Farming OS for Profitability
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bridge Round Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Bridge Round
              </h2>
              <div className="flex justify-center items-center gap-4 mb-8">
                <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  ₩<AnimatedCounter end={1} />B
                </div>
              </div>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Equity/CB possible (Negotiable)
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* TL;DR Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                TL;DR
              </h2>
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-blue-500/20">
                <p className="text-xl md:text-2xl text-white leading-relaxed max-w-5xl mx-auto">
                  Bridge는 '생존자금'이 아니라 <span className="text-blue-300 font-semibold">2026년 내 Pre-IPO/Series C(100억+) 리레이팅</span>을 위한 성과 가속 자금입니다.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Milestones */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Key Milestones
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-8 border border-green-500/20">
                <div className="text-green-400 text-4xl font-bold mb-4">2Q</div>
                <h3 className="text-xl font-semibold text-white mb-4">삼성웰스토리 공급 개시</h3>
                <p className="text-green-200">2Q 내(5월~) 작물 공급 시작</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-2xl p-8 border border-blue-500/20">
                <div className="text-blue-400 text-4xl font-bold mb-4">'26 2Q</div>
                <h3 className="text-xl font-semibold text-white mb-4">분기 흑자 전환</h3>
                <p className="text-blue-200">구조적 비용 개선 기반</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-purple-400 text-4xl font-bold mb-4">
                  <AnimatedCounter end={500} />+
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">N.FARM.AI 가입 농가</h3>
                <p className="text-purple-200">'26년 내 목표, 확장 목표 1,000 농가</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Why Now
              </h2>
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-red-500/20">
                <p className="text-xl md:text-2xl text-white leading-relaxed max-w-4xl mx-auto mb-8">
                  농업은 이제 <span className="text-red-300">'시설'</span>이 아니라 <span className="text-orange-300">'운영 불확실성'</span>의 문제입니다.
                </p>
                <p className="text-lg text-orange-200 max-w-3xl mx-auto">
                  인력/원가/수요 변동이 커질수록, 현장은 데이터 기반 운영이 필요
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                What We Build
              </h2>
              <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto mb-12">
                N.FARM.AI는 농장 운영 데이터를 AI로 표준화하는 경영 플랫폼입니다.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-8 border border-cyan-500/20">
                <div className="text-cyan-400 text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-white mb-4">실시간 모니터링</h3>
                <p className="text-cyan-200">이상징후 조기 대응</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-8 border border-green-500/20">
                <div className="text-green-400 text-3xl mb-4">🔮</div>
                <h3 className="text-xl font-semibold text-white mb-4">예측 시스템</h3>
                <p className="text-green-200">수확/생산 출하/운영 계획 정확도 개선</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-purple-400 text-3xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-white mb-4">경영 관리</h3>
                <p className="text-purple-200">매출/비용 P&L 기반 의사결정</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Why Us
              </h2>
              <p className="text-xl md:text-2xl text-blue-200 max-w-4xl mx-auto mb-12">
                우리는 "현장 데이터 → AI → 운영 개선"을 이미 수행해온 팀입니다.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-2xl p-8 border border-blue-500/20 text-center">
                <div className="text-blue-400 text-4xl font-bold mb-4">CUBE OS</div>
                <p className="text-blue-200">실시간 데이터 수집/제어 운영 루프</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-teal-600/10 rounded-2xl p-8 border border-green-500/20 text-center">
                <div className="text-green-400 text-4xl font-bold mb-4">
                  <AnimatedCounter end={50} />+ 작물
                </div>
                <p className="text-green-200">레시피 데이터 축적</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-2xl p-8 border border-purple-500/20 text-center">
                <div className="text-purple-400 text-4xl font-bold mb-4">✓</div>
                <p className="text-purple-200">구축/공급 레퍼런스 기반 현장 검증된 실행력</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Business Plan Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
                2025~2026 계획
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-8 border border-green-500/20">
                <h3 className="text-2xl font-semibold text-green-300 mb-6">보수적 플랜</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white">솔루션</span>
                    <span className="text-green-300 font-bold">
                      <AnimatedCounter end={30} />억
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white">작물</span>
                    <span className="text-green-300 font-bold">
                      <AnimatedCounter end={20} />억
                    </span>
                  </div>
                  <div className="border-t border-green-500/30 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">총합</span>
                      <span className="text-green-300 font-bold text-xl">
                        <AnimatedCounter end={50} />억
                      </span>
                    </div>
                  </div>
                  <p className="text-green-200 text-sm mt-4">연간 영업흑자 목표</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-2xl p-8 border border-blue-500/20">
                <h3 className="text-2xl font-semibold text-blue-300 mb-6">공격적 플랜</h3>
                <div className="space-y-4">
                  <div className="text-white">
                    <div className="mb-2">대형 솔루션</div>
                    <div className="mb-4">유통</div>
                  </div>
                  <div className="bg-purple-500/20 rounded-lg p-4">
                    <p className="text-purple-200 font-semibold">"단계 기반 Upside"</p>
                    <p className="text-purple-300 text-sm mt-2">계약 전 숫자는 '확정'으로 표기하지 않음</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Use of Funds */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Use of Funds
              </h2>
              <p className="text-xl text-blue-200 mb-12">
                ₩1B는 리레이팅 트리거 3개 달성에만 투입합니다.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-2xl p-8 border border-orange-500/20">
                <div className="text-orange-400 text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-white mb-4">운영 안정화</h3>
                <p className="text-orange-200">삼성웰스토리 공급 개시를 위한 운영 안정화</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-2xl p-8 border border-blue-500/20">
                <div className="text-blue-400 text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-white mb-4">제품화/확산</h3>
                <p className="text-blue-200">N.FARM.AI 온보딩/세일즈/운영</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-purple-400 text-3xl mb-4">💪</div>
                <h3 className="text-xl font-semibold text-white mb-4">역량 강화</h3>
                <p className="text-purple-200">대형 솔루션 딜 클로징 역량 강화</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 backdrop-blur-sm border border-blue-500/20 inline-block">
                <p className="text-blue-200">
                  <span className="font-semibold">Structure:</span> Equity 또는 CB 가능(조건 협의)
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Exit Strategy */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Capital Plan / Exit
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-green-500/20 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-300 mb-4">2026년 내</div>
                  <div className="text-2xl text-white mb-2">Pre-IPO/Series C</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                    <AnimatedCounter end={100} />억+
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-purple-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-4">2027년 하반기</div>
                  <div className="text-xl text-white mb-4">IPO 트랙</div>
                  <p className="text-purple-200">삼성증권 주관 (현재 진행 트랙)</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Deal Terms */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Deal Terms / Timeline
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-red-500/20 mb-8">
                <div className="text-center">
                  <div className="text-xl text-red-300 mb-4">클로징 데드라인</div>
                  <div className="text-3xl font-bold text-white mb-2">2026/03/31</div>
                  <p className="text-orange-200">(빠를수록 좋음)</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-2xl p-8 border border-blue-500/20">
                  <h3 className="text-xl font-semibold text-blue-300 mb-4">브릿지 라운드</h3>
                  <div className="text-3xl font-bold text-white">₩<AnimatedCounter end={1} />B</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">구조</h3>
                  <p className="text-white">Equity 또는 CB 가능</p>
                  <p className="text-purple-200 text-sm mt-2">(조건 협의)</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
              Contact Information
            </h2>
            <div className="bg-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-white/20">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-blue-300 text-xl font-semibold mb-2">담당자</div>
                  <div className="text-white text-lg">김혜연</div>
                </div>
                <div>
                  <div className="text-blue-300 text-xl font-semibold mb-2">이메일</div>
                  <div className="text-white text-lg">ir@nthing.net</div>
                </div>
                <div>
                  <div className="text-blue-300 text-xl font-semibold mb-2">연락처</div>
                  <div className="text-white text-lg">010-2864-0537</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}