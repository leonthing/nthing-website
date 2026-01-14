'use client'

import { useEffect, useState, useRef } from 'react'

export default function Investors() {
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

  const investors = [
    '삼성벤처투자',
    '우아한형제들',
    '한국산업은행',
    'KT&G',
    '키움인베스트먼트',
    '유진투자증권',
    '인터베스트',
    '대성창업투자',
    '비엔케이벤처투자',
    '스프링캠프',
    '스파크랩',
    '이지스자산운용',
    '어센도벤처스',
    'E1',
    'SL인베스트먼트',
    '이지스투자파트너스',
    '딥스톤인베스트먼트',
  ]

  const stats = [
    { value: '320억+', label: '누적 투자 유치' },
    { value: 'Series C', label: '투자 라운드' },
    { value: '17+', label: '기관 투자자' }
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-3 sm:px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-blue-500/20">
            Investors
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
            Backed by Leading Investors
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            국내 주요 기관투자자들이 함께합니다
          </p>
        </div>

        {/* Funding Info */}
        <div className={`flex flex-wrap justify-center gap-6 sm:gap-8 text-center mb-8 sm:mb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Investors List */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {investors.map((investor, idx) => (
            <div
              key={investor}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${500 + idx * 30}ms` }}
            >
              <span className="text-white font-medium text-xs sm:text-sm">{investor}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
