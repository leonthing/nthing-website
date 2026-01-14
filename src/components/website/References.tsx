'use client'

import { useEffect, useState, useRef } from 'react'

const CategoryIcons = {
  factory: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  lab: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.136a2.25 2.25 0 01-1.977-.607l-1.386-1.285M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611l.772.136a2.25 2.25 0 001.977-.607l1.586-1.485" />
    </svg>
  ),
  government: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  agriculture: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  education: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  ),
  global: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}

function AnimatedCounter({ end, suffix = '' }: { end: number, suffix?: string }) {
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

  return <div ref={ref}>{value}{suffix}</div>
}

export default function References() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)

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

  const stats = {
    totalProjects: 36,
    totalArea: 2000,
    totalValue: 150,
    countries: 3
  }

  const categories = [
    {
      title: '대규모 상업농장',
      icon: CategoryIcons.factory,
      projects: [
        { name: 'CUBE.ICHEON', client: '엔씽 이천', year: '2021' },
        { name: 'UAE CUBE X', client: 'UAE 아부다비', year: '2023' },
        { name: '오늘농산 창고형', client: '세인유통', year: '2023' },
      ]
    },
    {
      title: '기업 연구시설',
      icon: CategoryIcons.lab,
      projects: [
        { name: 'KT&G 스마트팜', client: 'KT&G', year: '2023' },
        { name: 'CJ 배추연구 PoC', client: 'CJ', year: '2022' },
        { name: '삼성웰스토리 PoC', client: '삼성웰스토리', year: '2024' },
        { name: '오뚜기제유 수직농장', client: '오뚜기', year: '2025' },
      ]
    },
    {
      title: '공공기관 / 지자체',
      icon: CategoryIcons.government,
      projects: [
        { name: '국립원예특작과학원', client: '농촌진흥청', year: '2025' },
        { name: '한국핵융합연구원', client: 'KFE', year: '2021-22' },
        { name: '함안 시설원예연구소', client: '경남도', year: '2023' },
        { name: '거창군 실증시험포', client: '거창군', year: '2024' },
        { name: '가평군 CUBE 04', client: '가평군', year: '2025' },
        { name: '경남 밀양 스마트팜', client: '경남도', year: '2024' },
        { name: '고양시 농업기술센터', client: '고양시', year: '2024' },
        { name: '남해군 농업기술센터', client: '남해군', year: '2024' },
      ]
    },
    {
      title: '리테일 상업시설',
      icon: CategoryIcons.factory,
      projects: [
        { name: '식물성 카페', client: '압구정', year: '2023' },
        { name: 'N서울타워 한쿡', client: 'CJ푸드빌', year: '2022' },
        { name: '남해군 로컬푸드직매장', client: '남해군', year: '2024' },
        { name: '엘더버거 성수점', client: '엘더버거', year: '2024' },
        { name: '엘더버거 베트남점', client: '엘더버거', year: '2024' },
      ]
    },
    {
      title: '대학교 / 교육기관',
      icon: CategoryIcons.education,
      projects: [
        { name: '연암대학교', client: '연암대', year: '2022' },
        { name: '충북대학교', client: '충북대', year: '2021-23' },
        { name: '제주대학교', client: '제주대', year: '2023' },
        { name: '전북대학교', client: '전북대', year: '2025' },
        { name: '광운인공지능고등학교', client: '광운고', year: '2023' },
        { name: '노원 청소년진로센터', client: '노원구', year: '2020' },
      ]
    },
    {
      title: '해외 프로젝트',
      icon: CategoryIcons.global,
      projects: [
        { name: 'UAE 아부다비 PoC', client: 'UAE 정부', year: '2020' },
        { name: 'UAE CUBE X', client: 'UAE 정부', year: '2023' },
        { name: '인도네시아 ODA', client: 'IPB 대학교', year: '2025' },
      ]
    },
  ]

  const majorClients = [
    'KT&G', 'CJ', '삼성웰스토리', '오뚜기',
    'UAE 정부', '농촌진흥청', '한국핵융합연구원',
  ]

  return (
    <section ref={sectionRef} id="references" className="py-16 sm:py-20 md:py-28 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-orange-500/20">
            Project References
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            수직농장 구축 실적
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            2018년부터 국내외 다양한 규모의 수직농장을 성공적으로 구축해왔습니다
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: stats.totalProjects, suffix: '+', label: '구축 프로젝트' },
            { value: stats.totalArea, suffix: '+평', label: '총 시공면적' },
            { value: stats.totalValue, suffix: '억+', label: '누적 시공금액' },
            { value: stats.countries, suffix: '개국', label: '글로벌 진출' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-zinc-900 border border-white/10 rounded-xl p-4 sm:p-6 text-center hover:border-orange-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${300 + idx * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Major Clients */}
        <div className={`mb-10 sm:mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-base sm:text-lg font-semibold text-white text-center mb-4 sm:mb-6">주요 고객사 &amp; 협력사</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {majorClients.map((client, idx) => (
              <span
                key={client}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 bg-zinc-900 border border-white/10 rounded-lg text-xs sm:text-sm text-white hover:border-orange-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: `${500 + idx * 50}ms` }}
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile: Category Tabs */}
        <div className="lg:hidden mb-4">
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((category, idx) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === idx
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-900 text-gray-400 border border-white/10'
                }`}
              >
                <span className="w-4 h-4">{category.icon}</span>
                <span className="whitespace-nowrap">{category.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Single Category View */}
        <div className="lg:hidden">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`${activeCategory === index ? 'block' : 'hidden'}`}
            >
              <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="space-y-3">
                  {category.projects.map((project) => (
                    <div
                      key={project.name}
                      className="p-3 bg-black/30 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-white font-medium text-sm">{project.name}</span>
                        <span className="text-xs text-gray-500">{project.year}</span>
                      </div>
                      <div className="text-xs text-gray-400">{project.client}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Categories Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className={`bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-orange-500">{category.icon}</span>
                <h3 className="text-lg font-semibold text-white">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.projects.map((project, idx) => (
                  <div
                    key={project.name}
                    className="p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-medium text-sm group-hover:text-orange-500 transition-colors">{project.name}</span>
                      <span className="text-xs text-gray-500">{project.year}</span>
                    </div>
                    <div className="text-xs text-gray-400">{project.client}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 sm:mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
            맞춤형 수직농장 구축이 필요하신가요?
          </p>
          <a
            href="#contact"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-500/25"
          >
            프로젝트 상담하기
          </a>
        </div>
      </div>
    </section>
  )
}
