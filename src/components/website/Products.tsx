'use client'

import { useEffect, useState, useRef } from 'react'

const ModuleIcons = {
  entry: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  ),
  work: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  seedling: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  grow: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  storage: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  )
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeModule, setActiveModule] = useState(0)
  const [activeProduct, setActiveProduct] = useState(0)

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

  // Auto rotate modules
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [isVisible])

  // Auto rotate products
  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  const modules = [
    { id: 'entry', name: '입구/방역 모듈', description: '위생 관리 및 출입 통제', icon: ModuleIcons.entry },
    { id: 'work', name: '작업 모듈', description: '수확 및 포장 작업', icon: ModuleIcons.work },
    { id: 'seedling', name: '육묘 모듈', description: '파종 및 초기 생육', icon: ModuleIcons.seedling },
    { id: 'grow', name: '재배 모듈', description: '본 재배 및 성장', icon: ModuleIcons.grow },
    { id: 'storage', name: '저장/출하 모듈', description: '저온 보관 및 출하', icon: ModuleIcons.storage }
  ]

  const products = [
    {
      id: 'cube-standard',
      name: 'CUBE Standard',
      category: 'Entry Level',
      description: '소규모 시범 도입 및 연구용. 핵심 기능을 갖춘 컴팩트 솔루션.',
      specs: {
        size: '40ft Container',
        capacity: '월 1,000kg+',
        modules: '2-3 모듈'
      },
      price: '상담 필요'
    },
    {
      id: 'cube-pro',
      name: 'CUBE Pro',
      category: 'Commercial',
      description: '상업 생산에 최적화된 풀 시스템. 자동화 및 모니터링 포함.',
      specs: {
        size: 'Multi Container',
        capacity: '월 3,000kg+',
        modules: '5 모듈 풀셋'
      },
      price: '상담 필요'
    },
    {
      id: 'giga-farm',
      name: 'Giga Farm',
      category: 'Large Scale',
      description: '물류센터형 대규모 수직농장. 생산부터 유통까지 통합 인프라.',
      specs: {
        size: 'Building Type',
        capacity: '월 10,000kg+',
        modules: '맞춤 설계'
      },
      price: '프로젝트 기반'
    }
  ]

  return (
    <section ref={sectionRef} id="products" className="py-16 sm:py-20 md:py-28 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-orange-500/20">
            Products
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Modular System Architecture
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            목적별로 설계된 5가지 모듈을 조합하여
            <br className="hidden sm:block" />
            최적의 수직농장을 구성합니다
          </p>
        </div>

        {/* Module Flow - Desktop */}
        <div className={`mb-12 sm:mb-20 hidden sm:block transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {modules.map((module, index) => (
              <div key={module.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${activeModule === index ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => setActiveModule(index)}
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 bg-zinc-900 border rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${activeModule === index ? 'border-orange-500 shadow-lg shadow-orange-500/20 text-orange-500' : 'border-white/10 hover:border-orange-500/50 text-gray-400'}`}>
                    {module.icon}
                  </div>
                  <div className={`text-xs md:text-sm font-medium transition-colors ${activeModule === index ? 'text-orange-500' : 'text-white'}`}>{module.name}</div>
                  <div className="text-xs text-gray-500 hidden md:block">{module.description}</div>
                </div>
                {index < modules.length - 1 && (
                  <svg className={`w-5 h-5 md:w-6 md:h-6 mx-1 md:mx-2 transition-colors ${activeModule === index ? 'text-orange-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Module Flow - Mobile */}
        <div className={`mb-10 sm:hidden transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
            {modules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(index)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeModule === index
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-900 text-gray-400 border border-white/10'
                }`}
              >
                <span className="w-5 h-5">{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 bg-zinc-900 border border-white/10 rounded-xl text-center">
            <div className="flex justify-center text-orange-500 mb-2">{modules[activeModule].icon}</div>
            <div className="text-white font-medium">{modules[activeModule].name}</div>
            <div className="text-xs text-gray-500">{modules[activeModule].description}</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              onClick={() => setActiveProduct(index)}
              className={`relative bg-zinc-900 rounded-2xl border p-6 sm:p-8 transition-all duration-500 cursor-pointer ${
                activeProduct === index
                  ? 'border-orange-500 shadow-lg shadow-orange-500/10 scale-[1.02]'
                  : 'border-white/10 hover:border-white/20'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              {/* Active Badge */}
              {activeProduct === index && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 sm:px-4 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                    RECOMMENDED
                  </span>
                </div>
              )}

              {/* Category */}
              <div className="text-xs sm:text-sm text-orange-500 font-medium mb-2">{product.category}</div>

              {/* Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{product.name}</h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">규격</span>
                  <span className="font-medium text-white">{product.specs.size}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">생산량</span>
                  <span className="font-medium text-white">{product.specs.capacity}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">모듈</span>
                  <span className="font-medium text-white">{product.specs.modules}</span>
                </div>
              </div>

              {/* Price */}
              <div className="border-t border-white/10 pt-4 sm:pt-6">
                <div className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">{product.price}</div>
                <a
                  href="#contact"
                  className={`block w-full py-2.5 sm:py-3 text-center rounded-lg text-sm font-medium transition-all ${
                    activeProduct === index
                      ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/25'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  문의하기
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Features Banner */}
        <div className={`mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { label: 'GAP 인증', desc: '우수농산물 기준 준수' },
            { label: '턴키 설치', desc: '설계부터 운영까지' },
            { label: '24/7 지원', desc: '원격 기술 지원' },
            { label: '확장 가능', desc: '모듈 추가 확장' }
          ].map((feature, idx) => (
            <div
              key={feature.label}
              className={`p-3 sm:p-4 bg-zinc-900 border border-white/10 rounded-xl text-center hover:border-orange-500/30 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${800 + idx * 100}ms` }}
            >
              <div className="text-white font-medium text-sm sm:text-base mb-0.5 sm:mb-1">{feature.label}</div>
              <div className="text-xs text-gray-500">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
