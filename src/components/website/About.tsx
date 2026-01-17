'use client'

import { useEffect, useState, useRef } from 'react'

function AnimatedCounter({ end, suffix = '' }: { end: number | string, suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const numericEnd = typeof end === 'string' ? parseInt(end) : end
          const duration = 2000
          const startTime = Date.now()

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(easeOut * numericEnd))

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

  return <div ref={ref}>{value}{suffix}</div>
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
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

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: '완전 자동화 시스템',
      description: 'IoT 기반 실시간 환경 제어 및 모니터링'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI 기반 생육 최적화',
      description: '머신러닝으로 재배 환경 자동 조정'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      title: '데이터 기반 의사결정',
      description: '클라우드 대시보드로 농장 운영 최적화'
    }
  ]

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 md:py-28 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Left: Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-orange-500/20">
              About N.THING
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              IoT와 데이터 기술로
              <br />
              <span className="text-orange-500">농업을 재정의합니다</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              2014년 설립된 엔씽은 IT와 데이터를 접목한 첨단 IoT 기반의
              모듈형 수직농장 솔루션을 개발하는 애그테크 기업입니다.
            </p>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              CES 2020, 2022에서 농업 분야 최고혁신상을 수상하며
              기술력을 국제적으로 인정받았습니다. 시리즈C까지 누적 320억원 이상의
              투자를 유치하며 성장하고 있습니다.
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
              {['IoT', 'Cloud', 'AI/ML', 'Hydroponics', 'Heart', 'Automation'].map((tech, idx) => (
                <span
                  key={tech}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-xs sm:text-sm text-gray-300 transition-all duration-500 hover:border-orange-500/30 hover:bg-orange-500/5 flex items-center gap-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${300 + idx * 100}ms` }}
                >
                  {tech}
                  {tech === 'Heart' && <span className="text-red-500">♥</span>}
                  {tech === 'Hydroponics' && (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  )}
                </span>
              ))}
            </div>

            {/* Key Points */}
            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 sm:gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${600 + idx * 150}ms` }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-orange-500/20">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base mb-0.5 sm:mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-2xl sm:rounded-3xl transform rotate-3" />
            <div className="relative bg-zinc-900 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { value: '2014', label: '설립 연도', isYear: true },
                  { value: 320, label: '누적 투자 유치', suffix: '억+' },
                  { value: 'CES', label: '최고혁신상 수상', isText: true },
                  { value: '300만+', label: '신선채소 생산/공급', isText: true }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/5 transition-all duration-500 hover:border-orange-500/30 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    style={{ transitionDelay: `${500 + idx * 100}ms` }}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-1 sm:mb-2">
                      {item.isText || item.isYear ? (
                        item.value
                      ) : (
                        <AnimatedCounter end={item.value as number} suffix={item.suffix} />
                      )}
                    </div>
                    <div className="text-gray-500 text-xs sm:text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-orange-500/10 to-transparent rounded-xl sm:rounded-2xl border border-orange-500/20">
                <p className="text-white font-medium mb-1 text-sm sm:text-base">Mission</p>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  &ldquo;기술로 식량 생산의 한계를 극복하고, 지속 가능한 농업 인프라를 구축한다&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
