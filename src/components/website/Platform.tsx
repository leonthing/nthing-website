'use client'

import { useEffect, useState, useRef } from 'react'

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
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
  }, [end, duration])

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>
}

// Icon components
const Icons = {
  thermometer: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  droplet: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
    </svg>
  ),
  wind: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  trendingUp: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  currency: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  users: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  plug: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  wifi: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>
  ),
  cpu: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  )
}

export default function Platform() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [activeDashboardStat, setActiveDashboardStat] = useState(0)

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

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveDashboardStat((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [isVisible])

  const dashboardStats = [
    { label: '재배 현황', value: 12450, suffix: '포기', color: 'from-emerald-500 to-emerald-400' },
    { label: '금일 수확', value: 847, suffix: 'kg', color: 'from-amber-500 to-amber-400' },
    { label: '이번 달 매출', value: 24.5, suffix: 'M', color: 'from-violet-500 to-violet-400' },
    { label: 'AI 예측 정확도', value: 94.2, suffix: '%', color: 'from-orange-500 to-orange-400' }
  ]

  const sensorData = [
    { label: '온도', value: '24.5°C', color: 'text-emerald-400' },
    { label: '습도', value: '68%', color: 'text-cyan-400' },
    { label: 'CO₂', value: '820ppm', color: 'text-amber-400' }
  ]

  const features = [
    {
      icon: Icons.chart,
      title: 'AI 데이터 분석',
      description: '온도, 습도, CO₂, 조도 등 환경 데이터를 실시간 수집. AI가 패턴을 분석하고 최적의 재배 조건을 제안합니다.',
      highlights: ['실시간 센서 모니터링', '이상 징후 즉시 알림']
    },
    {
      icon: Icons.trendingUp,
      title: '수확량 예측',
      description: '과거 데이터와 현재 생육 상태를 분석하여 수확량을 예측. 정확한 출하 계획 수립을 지원합니다.',
      highlights: ['AI 기반 수확량 예측', '생육 단계별 분석']
    },
    {
      icon: Icons.currency,
      title: '경영 관리',
      description: '매출, 비용, 수익을 한눈에. 고객사 관리부터 정산까지 농장 경영의 모든 것을 통합 관리합니다.',
      highlights: ['매출/비용 대시보드', '고객사/수주 관리']
    },
    {
      icon: Icons.building,
      title: '멀티 농장 관리',
      description: '여러 농장을 하나의 플랫폼에서 통합 관리. 농장별 현황을 한눈에 비교하고 모니터링합니다.',
      highlights: ['통합 대시보드', '농장별 성과 비교']
    },
    {
      icon: Icons.document,
      title: '견적서 자동화',
      description: '고객 요청에 맞춰 견적서를 신속하게 생성. PDF 출력과 이메일 발송까지 한 번에 처리합니다.',
      highlights: ['PDF 자동 생성', '이메일 발송']
    },
    {
      icon: Icons.users,
      title: '팀 협업',
      description: '팀원을 초대하여 함께 농장을 관리하세요. 역할별 권한 설정으로 안전하게 협업합니다.',
      highlights: ['팀원 초대', '역할 권한 설정']
    }
  ]

  const iotFeatures = [
    { icon: Icons.plug, title: '플러그 앤 플레이', desc: '모듈 설치 즉시 자동 연결' },
    { icon: Icons.wifi, title: '실시간 센서 데이터', desc: '온도, 습도, CO₂, EC, pH 수집' },
    { icon: Icons.cpu, title: 'AI 자동 제어', desc: '조명, 관수, 영양제 자동 조절' }
  ]

  return (
    <section ref={sectionRef} id="platform" className="py-16 sm:py-20 md:py-28 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            N.FARM.AI Platform
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            농장 경영의 모든 것을
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI와 함께</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            복잡한 농장 운영, 데이터 기반으로 단순화하세요
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-zinc-900/80 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs sm:text-sm text-gray-500 ml-2">N.FARM.AI Dashboard</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {dashboardStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-xl p-3 sm:p-4 transition-all duration-500 cursor-pointer ${
                    activeDashboardStat === idx
                      ? 'bg-gradient-to-br ' + stat.color + ' scale-105 shadow-lg'
                      : 'bg-zinc-800/50 hover:bg-zinc-800'
                  }`}
                  onClick={() => setActiveDashboardStat(idx)}
                >
                  <div className={`text-xs sm:text-sm mb-1 ${activeDashboardStat === idx ? 'text-white/80' : 'text-gray-500'}`}>
                    {stat.label}
                  </div>
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${activeDashboardStat === idx ? 'text-white' : 'text-white'}`}>
                    {stat.suffix === '%' || stat.suffix === 'M' ? (
                      <>{stat.value}{stat.suffix}</>
                    ) : (
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="md:col-span-2 bg-zinc-800/30 rounded-xl p-4">
                <div className="text-xs sm:text-sm text-gray-500 mb-3">환경 데이터 트렌드</div>
                <div className="flex items-end gap-1 sm:gap-2 h-24 sm:h-32">
                  {[40, 55, 45, 60, 50, 70, 65, 75, 70, 80, 75, 85].map((height, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        height: `${height}%`,
                        transitionDelay: `${800 + idx * 50}ms`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-zinc-800/30 rounded-xl p-4">
                <div className="text-xs sm:text-sm text-gray-500 mb-3">실시간 센서</div>
                <div className="space-y-3">
                  {sensorData.map((sensor, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-400">{sensor.label}</span>
                      <span className={`text-sm sm:text-base font-medium ${sensor.color}`}>
                        {sensor.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IoT Integration */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className={`aspect-square bg-zinc-800 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${
                      isVisible ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/20' : 'border-white/10'
                    }`}
                    style={{ transitionDelay: `${600 + num * 100}ms` }}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isVisible ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-gray-400">IoT 연결됨</span>
                </div>
                <span className="text-emerald-400">실시간 동기화</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">6</div>
                  <div className="text-xs text-gray-500">연결 모듈</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">24/7</div>
                  <div className="text-xs text-gray-500">모니터링</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400">0.5s</div>
                  <div className="text-xs text-gray-500">응답시간</div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium mb-4 border border-cyan-500/20">
                IoT Integration
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                모듈형 수직농장과
                <br />
                <span className="text-cyan-400">실시간 연동</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                N.THING의 IoT 기반 모듈형 수직농장(CUBE)과 직접 연동됩니다.
                각 모듈의 센서 데이터를 실시간으로 수집하고, AI가 최적의 재배 환경을 자동으로 제어합니다.
              </p>
              <div className="space-y-3">
                {iotFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 bg-zinc-900/50 rounded-lg border border-white/5 transition-all duration-500 hover:border-cyan-500/30 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                    style={{ transitionDelay: `${800 + idx * 150}ms` }}
                  >
                    <div className="text-cyan-400">{feature.icon}</div>
                    <div>
                      <div className="text-white font-medium text-sm sm:text-base">{feature.title}</div>
                      <div className="text-gray-500 text-xs sm:text-sm">{feature.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="lg:hidden mb-4">
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
              {features.map((feature, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeFeature === idx
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-900 text-gray-400 border border-white/10'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:hidden">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-3">
                {features[activeFeature].icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{features[activeFeature].title}</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{features[activeFeature].description}</p>
              <div className="space-y-2">
                {features[activeFeature].highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group bg-zinc-900 border rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
                  activeFeature === idx
                    ? 'border-emerald-500/50 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'border-white/10 hover:border-white/20'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${700 + idx * 100}ms` }}
                onClick={() => setActiveFeature(idx)}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-all ${
                  activeFeature === idx ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {feature.icon}
                </div>
                <h4 className={`text-lg font-bold mb-2 transition-colors ${activeFeature === idx ? 'text-emerald-400' : 'text-white'}`}>
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <div className="space-y-2">
                  {feature.highlights.map((highlight, hidx) => (
                    <div key={hidx} className="flex items-center gap-2 text-sm">
                      <svg className={`w-4 h-4 transition-colors ${activeFeature === idx ? 'text-emerald-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-12 sm:mt-16 text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://nthing-farm-platform-v2.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all text-center"
          >
            플랫폼 체험하기
          </a>
          <p className="text-gray-500 text-xs sm:text-sm mt-3">데모 계정으로 무료 체험 가능</p>
        </div>
      </div>
    </section>
  )
}
