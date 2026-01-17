'use client'

import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/website/Navigation'
import Footer from '@/components/website/Footer'

const AnimatedSection = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  )
}

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
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
    if (isVisible) {
      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(end * easeOutQuart))

        if (progress === 1) {
          clearInterval(timer)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isVisible, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function IRReleasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
                <span className="text-emerald-300 text-sm font-medium">투자 라운드 오픈</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                2026년 Q1<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  브릿지 투자라운드 Open
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                스마트 수직농장 솔루션으로 지속 가능한 식량 생태계를 구축하는 농업 테크 혁신 기업
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all">
                  투자 문의하기
                </button>
                <button className="px-8 py-3 border border-gray-400 rounded-lg font-semibold text-white hover:bg-white/10 transition-all">
                  IR 자료 다운로드
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">주식회사 엔씽</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                기후 변화와 식량 안보 문제를 해결하는 혁신적인 스마트팜 솔루션 기업
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4">비전</h3>
                  <p className="text-gray-300">
                    기술로 혁신하는 미래 식량 생태계
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">미션</h3>
                  <p className="text-gray-300">
                    스마트 수직농장 솔루션과 고품질 작물 공급을 통해 지속 가능한 식량 생태계를 구축합니다.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30">
                <h3 className="text-2xl font-bold text-red-400 mb-4">해결하는 문제</h3>
                <p className="text-gray-300 mb-6">
                  기후 변화로 인해 신선채소 가격은 매년 상승하고 있으며, 특히 상추 가격은 연최고가 기준 연평균 9%씩 증가하고 있습니다.
                </p>
                <div className="flex items-center text-3xl font-bold text-red-400">
                  연평균 <AnimatedCounter end={9} suffix="%" /> 가격 상승
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Key Solutions */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">독보적인 스마트팜 솔루션</h2>
              <p className="text-xl text-gray-300">CUBE & OS</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30 h-full">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-emerald-400 rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">모듈형 수직농장 CUBE</h3>
                <p className="text-gray-300">
                  외부 환경과 재배 환경을 완벽히 차단하여 언제 어디서나 안정적으로 최고 품질의 작물을 재배하는 규격화된 솔루션
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 h-full">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-blue-400 rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">데이터 기반 제어</h3>
                <p className="text-gray-300">
                  자체 개발한 CUBE OS를 통해 온도, 습도, LED, CO₂, 양분 등 모든 환경을 실시간 모니터링하고 원격 제어
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 h-full">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-purple-400 rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">압도적 생산성</h3>
                <p className="text-gray-300">
                  동일 면적 노지 재배 대비 40~100배 이상의 생산성을 달성하며, 로보틱스 및 AI를 도입하여 재배-생산 자동화를 실현
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center space-x-8 text-4xl font-bold text-white">
                <span>노지 재배 대비</span>
                <span className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                  <AnimatedCounter end={40} suffix="~100배" />
                </span>
                <span>생산성</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Market Validation */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">시장에서 검증된 경제성과 브랜드 파워</h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 text-center">
                <h3 className="text-xl font-bold text-white mb-4">검증된 경제성</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-green-400">
                      <AnimatedCounter end={60} suffix="%" />
                    </div>
                    <div className="text-gray-300">인건비 절감</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-400">
                      <AnimatedCounter end={89} suffix="%" />
                    </div>
                    <div className="text-gray-300">물 사용량 절감</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 text-center">
                <h3 className="text-xl font-bold text-white mb-4">프리미엄 브랜드</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-400">
                      <AnimatedCounter end={4} suffix=".8점" />
                    </div>
                    <div className="text-gray-300">소비자 평점</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    이마트, 쿠팡, 비마트 등<br />주요 유통 채널 입점
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30 text-center">
                <h3 className="text-xl font-bold text-white mb-4">원가 경쟁력</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">
                      <AnimatedCounter end={1227} suffix="원" />
                    </div>
                    <div className="text-gray-300">현재 생산원가</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">
                      <AnimatedCounter end={900} suffix="원대" />
                    </div>
                    <div className="text-gray-300">2025년 목표</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Project Pipeline */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                <AnimatedCounter end={1780} suffix="억" /> 규모의 거대 프로젝트 파이프라인
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">초대형 단지 구축</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">충북 괴산 첨단산업단지</span>
                    <span className="text-2xl font-bold text-purple-400">
                      <AnimatedCounter end={1000} suffix="억원" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">삼성웰스토리 아산 CK</span>
                    <span className="text-2xl font-bold text-purple-400">
                      연간 <AnimatedCounter end={120} suffix="억원" />
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-lg rounded-2xl p-8 border border-emerald-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">지자체 프로젝트</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">여주</span>
                    <span className="text-xl font-bold text-emerald-400">300억</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">동두천</span>
                    <span className="text-xl font-bold text-emerald-400">300-500억</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">장성</span>
                    <span className="text-xl font-bold text-emerald-400">100억</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Financial Performance */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">효율 경영을 통한 재무적 도약</h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 text-center">
                <h3 className="text-xl font-bold text-white mb-4">2024년 수익성 개선</h3>
                <div className="text-4xl font-bold text-red-400 mb-2">
                  <AnimatedCounter end={64} suffix="%" />
                </div>
                <div className="text-gray-300">영업손실폭 개선</div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/30 text-center">
                <h3 className="text-xl font-bold text-white mb-4">2025년 목표</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  <AnimatedCounter end={35} suffix="억원" />
                </div>
                <div className="text-gray-300">매출액 + 영업이익 흑자</div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 text-center">
                <h3 className="text-xl font-bold text-white mb-4">폭발적 성장</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-2xl font-bold text-green-400">
                      2026년 <AnimatedCounter end={250} suffix="억원" />
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-green-400">
                      2027년 <AnimatedCounter end={500} suffix="억원" />
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Investment & IPO */}
      <section className="py-20 px-4 bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">퀀텀 점프를 위한 전략적 투자와 IPO 로드맵</h2>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">투자 현황</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-300 mb-2">유치 목표</div>
                    <div className="text-3xl font-bold text-yellow-400">
                      <AnimatedCounter end={100} suffix="~150억원" />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-300 mb-2">삼성벤처투자 확정</div>
                    <div className="text-2xl font-bold text-yellow-400">
                      <AnimatedCounter end={25} suffix="억원" />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 border border-indigo-500/30">
                <h3 className="text-2xl font-bold text-white mb-6">IPO 로드맵</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-300">주관사: 삼성증권 선정 완료</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-300">6개월 내 Pre-IPO 진행</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-300">2027년 하반기 코스닥 상장</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl">
                <span className="text-2xl font-bold text-white">2027년 하반기 코스닥 상장 목표</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-12 border border-gray-700/50 text-center">
              <h2 className="text-3xl font-bold text-white mb-8">투자 문의</h2>
              <div className="space-y-4">
                <div className="text-xl text-gray-300">
                  <span className="font-semibold">담당자:</span> 김혜연
                </div>
                <div className="text-xl text-gray-300">
                  <span className="font-semibold">이메일:</span> 
                  <a href="mailto:ir@nthing.net" className="text-blue-400 hover:text-blue-300 ml-2">
                    ir@nthing.net
                  </a>
                </div>
                <div className="text-xl text-gray-300">
                  <span className="font-semibold">연락처:</span> 
                  <a href="tel:010-2864-0537" className="text-blue-400 hover:text-blue-300 ml-2">
                    010-2864-0537
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:ir@nthing.net"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all"
                >
                  투자 문의하기
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
}