'use client'

import { useEffect, useState, useRef } from 'react'

// Counter component for stats
function AnimatedCounter({ value, suffix = '', duration = 2000 }: { value: string, suffix?: string, duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          // Parse the numeric part
          const numericMatch = value.match(/[\d.]+/)
          if (!numericMatch) {
            setDisplayValue(value)
            return
          }

          const numericValue = parseFloat(numericMatch[0])
          const prefix = value.slice(0, value.indexOf(numericMatch[0]))
          const postfix = value.slice(value.indexOf(numericMatch[0]) + numericMatch[0].length)

          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)

            const current = numericValue * easeOut
            const formatted = numericValue % 1 === 0
              ? Math.floor(current).toString()
              : current.toFixed(1)

            setDisplayValue(prefix + formatted + postfix)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setDisplayValue(value)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, duration])

  return <div ref={ref}>{displayValue}{suffix}</div>
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showXAI, setShowXAI] = useState(false)
  const [blinkPhase, setBlinkPhase] = useState(false)
  const fullText = 'Data-Driven'

  useEffect(() => {
    setIsVisible(true)

    // Typing animation
    let index = 0
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typeInterval)
        // After typing completes, start blink and add X AI
        setTimeout(() => {
          setBlinkPhase(true)
          setTimeout(() => {
            setBlinkPhase(false)
            setShowXAI(true)
          }, 1500)
        }, 500)
      }
    }, 100)

    return () => clearInterval(typeInterval)
  }, [])

  const stats = [
    { value: '94', suffix: '%', label: '물 사용량 절감' },
    { value: '40', suffix: 'x', label: '생산성 향상' },
    { value: '5', suffix: '%', label: '작물 폐기율', prefix: '<' },
    { value: '24/7', suffix: '', label: '자동화 운영' }
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,59,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,59,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400">CES 2020 Best of Innovation Award</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 sm:mb-6">
            <span className="inline-block min-w-[280px] sm:min-w-[400px]">
              <span className={blinkPhase ? 'animate-blink-fast' : ''}>
                {typedText}
              </span>
              {showXAI && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 animate-fade-in"> X AI</span>
              )}
              {!showXAI && <span className="animate-blink">|</span>}
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 animate-gradient">
              Vertical Farming
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-8 sm:mb-10 leading-relaxed">
            IoT, AI, 클라우드 기술로 완전히 자동화된 모듈형 수직농장.
            <br className="hidden sm:block" />
            지속가능한 분산형 농업 인프라를 구축합니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16">
            <a
              href="#solutions"
              className="group px-6 sm:px-8 py-3.5 sm:py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-500/25 text-center relative overflow-hidden"
            >
              <span className="relative z-10">솔루션 알아보기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="#contact"
              className="px-6 sm:px-8 py-3.5 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-white/40 transition-all text-center"
            >
              도입 문의
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 mb-1 flex items-baseline">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  {stat.value === '24/7' ? (
                    <span>{stat.value}</span>
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
          <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-orange-500/50 to-transparent" />
        </div>
      </div>

      {/* Tech Lines Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-20 hidden lg:block">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          <path d="M400 0 L200 400 L400 800" stroke="url(#gradient)" strokeWidth="1" fill="none" className="animate-draw" />
          <path d="M400 100 L250 400 L400 700" stroke="url(#gradient)" strokeWidth="0.5" fill="none" className="animate-draw" style={{ animationDelay: '0.5s' }} />
          <path d="M400 200 L300 400 L400 600" stroke="url(#gradient)" strokeWidth="0.5" fill="none" className="animate-draw" style={{ animationDelay: '1s' }} />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff3b00" stopOpacity="0" />
              <stop offset="50%" stopColor="#ff3b00" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff3b00" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes blink-fast {
          0%, 25% { opacity: 1; }
          26%, 50% { opacity: 0; }
          51%, 75% { opacity: 1; }
          76%, 100% { opacity: 0; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes draw {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-blink-fast { animation: blink-fast 0.3s infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
