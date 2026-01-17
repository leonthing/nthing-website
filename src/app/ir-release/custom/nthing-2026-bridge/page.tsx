'use client'

import { useEffect, useState, useRef } from 'react'
import Navigation from '@/components/website/Navigation'
import Footer from '@/components/website/Footer'

// Animated Counter Component
function AnimatedCounter({ end, suffix = '', prefix = '', decimals = 0 }: { end: number, suffix?: string, prefix?: string, decimals?: number }) {
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
            const current = easeOut * end
            setValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current))

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
  }, [end, decimals])

  return <div ref={ref}>{prefix}{decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}{suffix}</div>
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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-black" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.1}px)`
            }}
          />
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <span className="text-white font-bold text-2xl">N</span>
                </div>
                <div>
                  <p className="text-emerald-400 font-medium">N.THING</p>
                  <p className="text-gray-500 text-sm">AI Farming OS</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
                  Bridge Round
                </span>
                <span className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium border border-amber-500/20">
                  ₩1B Target
                </span>
                <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
                  Equity/CB Negotiable
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                AI Farming OS
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  for Profitability
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                농업의 &lsquo;운영 불확실성&rsquo;을 AI로 해결합니다.<br />
                데이터 기반 농장 경영 플랫폼, N.FARM.AI
              </p>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="flex flex-wrap gap-4">
                <a href="#investment" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/25">
                  투자 개요 보기
                </a>
                <a href="#tldr" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all">
                  TL;DR 한 장 요약
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

      {/* TL;DR Section */}
      <section id="tldr" className="py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/20">
              TL;DR
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              한 장 요약
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Bridge는 <span className="text-amber-400 font-semibold">&lsquo;생존자금&rsquo;이 아닙니다.</span><br />
              2026년 내 <span className="text-emerald-400 font-semibold">Pre-IPO / Series C (100억+)</span> 리레이팅을 위한 성과 가속 자금입니다.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '🏢',
                title: '삼성웰스토리 공급 개시',
                desc: '2Q 내 (5월~) 작물 공급 시작',
                color: 'emerald',
                tag: 'Confirmed'
              },
              {
                icon: '📈',
                title: '2Q 분기 흑자 전환',
                desc: '구조적 비용 개선 기반',
                color: 'cyan',
                tag: '2026 Target'
              },
              {
                icon: '🌾',
                title: 'N.FARM.AI 500+ 농가',
                desc: '확장 목표 1,000 농가',
                color: 'purple',
                tag: 'Expansion'
              },
            ].map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{item.icon}</span>
                    <span className={`px-2 py-1 bg-${item.color}-500/20 text-${item.color}-400 rounded text-xs font-medium`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-white font-bold text-lg mb-2">{item.title}</p>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection direction="left">
              <span className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium border border-amber-500/20">
                Why Now
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-6">
                농업은 이제<br />
                <span className="text-amber-400">&lsquo;시설&rsquo;이 아니라 &lsquo;운영 불확실성&rsquo;의 문제</span>입니다
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                인력/원가/수요 변동이 커질수록, 현장은 데이터 기반 운영이 필요합니다.
                농업 시장은 시설 투자에서 운영 최적화로 패러다임이 전환되고 있습니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: '농가 인력난', value: '심화', icon: '👷' },
                  { label: '원가 변동성', value: '증가', icon: '📊' },
                  { label: '수요 예측', value: '어려움', icon: '🎯' },
                  { label: 'AI 도입 필요성', value: '급증', icon: '🤖' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-amber-400 text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-emerald-500/20 rounded-3xl transform rotate-3" />
                <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 overflow-hidden">
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-sm mb-2">농업 패러다임 전환</p>
                    <p className="text-white text-2xl font-bold">시설 → 운영</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center text-2xl">🏗️</div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-sm">AS-IS</p>
                        <p className="text-white">시설 중심 투자</p>
                      </div>
                      <span className="text-gray-500">→</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-2xl">🧠</div>
                      <div className="flex-1">
                        <p className="text-emerald-400 text-sm">TO-BE</p>
                        <p className="text-white font-semibold">AI 기반 운영 최적화</p>
                      </div>
                      <span className="text-emerald-400">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
              What We Build
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              N.FARM.AI
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              농장 운영 데이터를 AI로 표준화하는 <span className="text-emerald-400">경영 플랫폼</span>
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '📡',
                title: '실시간 모니터링',
                desc: '이상징후 조기 대응',
                detail: '센서 데이터 수집 → AI 분석 → 즉시 알림',
                color: 'emerald'
              },
              {
                icon: '🔮',
                title: '예측 (수확/생산)',
                desc: '출하/운영 계획 정확도 개선',
                detail: '수확량 예측 → 물류 최적화 → 폐기 최소화',
                color: 'cyan'
              },
              {
                icon: '💰',
                title: '경영 (매출/비용)',
                desc: 'P&L 기반 의사결정',
                detail: '실시간 손익 파악 → 비용 최적화 → 수익성 개선',
                color: 'purple'
              },
            ].map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-all h-full group">
                  <div className={`w-16 h-16 bg-${item.color}-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <p className="text-white font-bold text-xl mb-2">{item.title}</p>
                  <p className="text-gray-400 mb-4">{item.desc}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-gray-500 text-sm">{item.detail}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              Physical AI 역량
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              &ldquo;현장 데이터 → AI → 운영 개선&rdquo;을 이미 수행해온 팀입니다
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: '🔄',
                title: 'CUBE OS 운영 루프',
                desc: '실시간 데이터 수집/제어',
                stat: '24/7',
                statLabel: '운영'
              },
              {
                icon: '🌱',
                title: '작물/레시피 데이터',
                desc: '재배 노하우 축적',
                stat: '50+',
                statLabel: '작물'
              },
              {
                icon: '🏗️',
                title: '현장 검증된 실행력',
                desc: '구축/공급 레퍼런스 기반',
                stat: '다수',
                statLabel: '프로젝트'
              },
            ].map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="text-right">
                      <p className="text-blue-400 font-bold text-2xl">{item.stat}</p>
                      <p className="text-gray-500 text-xs">{item.statLabel}</p>
                    </div>
                  </div>
                  <p className="text-white font-bold mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Points Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
              Proof Points
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
              리레이팅 트리거
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Proof #1 */}
            <AnimatedSection>
              <div className="bg-gradient-to-br from-emerald-500/10 to-zinc-900 border border-emerald-500/20 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                    Proof #1
                  </span>
                  <span className="text-gray-500 text-sm">삼성웰스토리</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  2Q 공급 개시가<br />
                  <span className="text-emerald-400">리레이팅 트리거</span>입니다
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-400">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">5월~ 작물 공급 개시 예정</p>
                      <p className="text-gray-500 text-sm">2Q 내 시작</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-emerald-400">✓</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">아산 CK 협력 진행 중</p>
                      <p className="text-gray-500 text-sm">기존 IR 레퍼런스</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Proof #2 */}
            <AnimatedSection delay={150}>
              <div className="bg-gradient-to-br from-cyan-500/10 to-zinc-900 border border-cyan-500/20 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold">
                    Proof #2
                  </span>
                  <span className="text-gray-500 text-sm">흑자 전환</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  12월 월 기준 흑자 달성<br />
                  <span className="text-cyan-400">+1,700만원</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400">📈</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">구조적 비용 개선</p>
                      <p className="text-gray-500 text-sm">AI로 대체/가속 예정</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400">🎯</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">&lsquo;26년 2Q 분기 흑자 전환</p>
                      <p className="text-gray-500 text-sm">KPI 설정 완료</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 2025-2026 Plan Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
              Business Plan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              2025~2026 계획
            </h2>
            <p className="text-gray-400">
              보수적 플랜(확정·가시성) + 공격적 플랜(옵션·단계표기) 분리
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Conservative */}
            <AnimatedSection>
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold">
                    보수적
                  </span>
                  <span className="text-gray-500 text-sm">확정 · 가시성</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">솔루션</p>
                    <p className="text-3xl font-bold text-white">30억</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div>
                    <p className="text-gray-400 text-sm mb-2">작물</p>
                    <p className="text-3xl font-bold text-white">20억</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="bg-emerald-500/10 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">합계</p>
                    <p className="text-3xl font-bold text-emerald-400">50억</p>
                    <p className="text-emerald-400 text-sm">연간 영업흑자 목표</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Aggressive */}
            <AnimatedSection delay={150}>
              <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-bold">
                    공격적
                  </span>
                  <span className="text-gray-500 text-sm">옵션 · 단계표기</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-400">🏗️</span>
                      <p className="text-white font-medium">대형 솔루션</p>
                    </div>
                    <p className="text-gray-500 text-sm">단계 기반 Upside로 제시</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-400">🛒</span>
                      <p className="text-white font-medium">유통 확대</p>
                    </div>
                    <p className="text-gray-500 text-sm">계약 전 숫자는 &lsquo;확정&rsquo;처럼 쓰지 않음</p>
                  </div>
                  <div className="mt-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <p className="text-amber-400 text-sm">
                      ⚠️ 공격적 플랜은 성과 달성 시 추가 Upside
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* N.FARM.AI Expansion */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <AnimatedSection direction="left">
              <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
                N.FARM.AI Expansion
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-6">
                확장 KPI는<br />
                <span className="text-emerald-400">&lsquo;가입 농가 수&rsquo;</span>입니다
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                순수 가입 기준으로 측정합니다.<br />
                자체 농장 → 도입 고객사 → 일반 농가 순으로 확장합니다.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-white/10">
                  <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-emerald-400 text-2xl font-bold">500+</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">&lsquo;26년 내 목표</p>
                    <p className="text-gray-500 text-sm">가입 농가 수</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-white/10">
                  <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-cyan-400 text-2xl font-bold">1K</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">확장 목표</p>
                    <p className="text-gray-500 text-sm">연내 1,000 농가</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl transform -rotate-3" />
                <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8">
                  <p className="text-gray-400 text-sm mb-6">도입 경로</p>
                  <div className="space-y-4">
                    {[
                      { step: 1, title: '자체 농장', desc: '기술 검증 & 최적화', status: 'done' },
                      { step: 2, title: '도입 고객사', desc: '파트너 농장 확대', status: 'current' },
                      { step: 3, title: '일반 농가', desc: 'SaaS 대중화', status: 'next' },
                    ].map((item) => (
                      <div key={item.step} className={`flex items-center gap-4 p-4 rounded-xl ${
                        item.status === 'done' ? 'bg-emerald-500/10 border border-emerald-500/20' :
                        item.status === 'current' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                        'bg-white/5 border border-white/5'
                      }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          item.status === 'done' ? 'bg-emerald-500 text-white' :
                          item.status === 'current' ? 'bg-cyan-500 text-white' :
                          'bg-white/10 text-gray-400'
                        }`}>
                          {item.status === 'done' ? '✓' : item.step}
                        </div>
                        <div>
                          <p className="text-white font-medium">{item.title}</p>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Moat Section */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium border border-amber-500/20">
              Moat
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              AI 신뢰도의 기반
            </h2>
            <p className="text-gray-400">
              글로벌 인증 + 누적 투자 + 현장 레퍼런스
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: '🏆', title: 'CES 혁신상', desc: '2020, 2022 수상' },
              { icon: '🌍', title: 'WEF', desc: 'Technology Pioneer' },
              { icon: '💰', title: '누적 투자', desc: '320억+ 유치' },
              { icon: '🤝', title: '기관 투자자', desc: '삼성벤처투자 등' },
            ].map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 100}>
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <p className="text-white font-bold">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use of Funds Section */}
      <section id="investment" className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20">
              Use of Funds
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6 mb-4">
              ₩1B는 리레이팅 트리거 3개 달성에만 투입합니다
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-900 border border-emerald-500/20 rounded-3xl p-8 sm:p-12">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: '🏢', title: '삼성웰스토리', desc: '공급 개시를 위한 운영 안정화' },
                    { icon: '📱', title: 'N.FARM.AI', desc: '제품화/확산 (온보딩/세일즈/운영)' },
                    { icon: '🤝', title: '대형 솔루션', desc: '딜 클로징 역량 강화' },
                  ].map((item, idx) => (
                    <div key={idx} className="text-center p-6 bg-white/5 rounded-2xl">
                      <span className="text-4xl mb-4 block">{item.icon}</span>
                      <p className="text-white font-bold mb-2">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    <div className="px-6 py-3 bg-emerald-500/20 rounded-full">
                      <span className="text-emerald-400 font-medium">Structure: Equity 또는 CB 가능</span>
                    </div>
                    <div className="px-6 py-3 bg-white/5 rounded-full">
                      <span className="text-gray-400">조건 협의</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Capital Plan / Exit */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium border border-purple-500/20">
              Capital Plan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
              Exit Strategy
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-purple-500 to-amber-500 hidden md:block transform -translate-x-1/2" />

                <div className="space-y-8">
                  {[
                    {
                      year: '2026',
                      title: 'Pre-IPO / Series C',
                      amount: '100억+',
                      desc: '브릿지 이후 본격 사업성과 지표로 증명',
                      color: 'emerald'
                    },
                    {
                      year: '2027 H2',
                      title: 'KOSDAQ IPO',
                      amount: 'Exit',
                      desc: '삼성증권 주관 (현재 진행 트랙)',
                      color: 'amber'
                    },
                  ].map((item, idx) => (
                    <div key={idx} className={`relative md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                      <div className={`bg-zinc-900/50 border border-${item.color}-500/30 rounded-2xl p-6`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 bg-${item.color}-500/20 text-${item.color}-400 rounded-full text-sm font-bold`}>
                            {item.year}
                          </span>
                        </div>
                        <p className="text-xl font-bold text-white mb-1">{item.title}</p>
                        <p className={`text-2xl font-bold text-${item.color}-400 mb-2`}>{item.amount}</p>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                      {/* Timeline Dot */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-${item.color}-500 rounded-full border-4 border-black hidden md:block ${idx % 2 === 0 ? '-right-2' : '-left-2'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Deal Terms */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-8">
                  <span className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                    Deal Terms
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
                    투자 조건
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">라운드</p>
                      <p className="text-2xl font-bold text-white">Bridge Round</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">목표 금액</p>
                      <p className="text-2xl font-bold text-emerald-400">₩1B</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">구조</p>
                      <p className="text-xl font-bold text-white">Equity 또는 CB 가능</p>
                      <p className="text-gray-500 text-sm">조건 협의</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-center">
                      <p className="text-red-400 text-sm mb-2">⏰ 클로징 데드라인</p>
                      <p className="text-3xl font-bold text-white">2026/03/31</p>
                      <p className="text-gray-400 text-sm mt-2">빠를수록 좋음</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
              <div className="relative p-8 sm:p-12 md:p-16 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  투자 미팅을 원하시나요?
                </h2>
                <p className="text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
                  N.THING의 AI Farming OS와 투자 기회에 대해<br />
                  더 자세히 안내해 드리겠습니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:ir@nthing.net"
                    className="px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg"
                  >
                    ir@nthing.net
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
