'use client'

import { useEffect, useState, useRef } from 'react'

const Icons = {
  vegetable: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  truck: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0-6.677V6.75" />
    </svg>
  )
}

export default function Partners() {
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

  const partners = [
    {
      name: 'E-MART',
      category: '유통',
      description: '대형마트 신선채소 공급'
    },
    {
      name: 'B마트',
      category: '퀵커머스',
      description: '배민 B마트 프리미엄 채소'
    },
    {
      name: 'Samsung Welstory',
      category: '단체급식',
      description: '기업 급식 식자재 공급'
    },
    {
      name: 'OTTOGI',
      category: '식품제조',
      description: '식품 원료 파트너십'
    },
    {
      name: '★★★',
      category: '프리미엄',
      description: '호텔, 파인다이닝'
    }
  ]

  const stats = [
    { value: '50+', label: '다양한 재배 작물' },
    { value: '365', label: '연중 안정 공급' },
    { value: 'SAFETY', label: '무농약 인증' },
    { value: '당일', label: '수확 후 배송' }
  ]

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-28 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-orange-500/20">
            Partners & Clients
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            국내 주요 유통사, 식품 기업, 프리미엄 레스토랑에
            <br className="hidden sm:block" />
            신선한 수직농장 채소를 공급하고 있습니다
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
          {partners.map((partner, idx) => (
            <div
              key={partner.name}
              className={`group relative bg-zinc-900 border border-white/10 rounded-xl p-4 sm:p-6 hover:border-orange-500/30 transition-all duration-500 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + idx * 100}ms` }}
            >
              <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors text-center">
                {partner.name}
              </div>
              <div className="text-xs text-orange-500 font-medium">
                {partner.category}
              </div>
              <div className="text-xs text-gray-500 mt-1 text-center hidden sm:block">
                {partner.description}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className={`bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-6 sm:p-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${600 + idx * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
