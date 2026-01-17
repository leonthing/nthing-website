'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navigation from '@/components/website/Navigation'
import Footer from '@/components/website/Footer'

interface Attachment {
  name: string
  url: string
  type: string
  size: number
}

interface Company {
  id: string
  name: string
  description: string | null
  logo_url: string | null
}

interface IRRelease {
  id: string
  title: string
  company_intro: string | null
  company_vision: string | null
  team_intro: string | null
  investment_terms: string | null
  use_of_funds: string | null
  attachments: Attachment[]
  cover_image_url: string | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  view_count: number
  company: Company
}

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nthing-corp-platform.vercel.app'

// Animated Section Component
function AnimatedSection({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
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

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function IRReleaseContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [release, setRelease] = useState<IRRelease | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inviteCode, setInviteCode] = useState('')

  const tokenFromUrl = searchParams.get('token')

  useEffect(() => {
    if (tokenFromUrl) {
      // First check if there's a custom page for this token
      checkAndFetchRelease(tokenFromUrl)
    }
  }, [tokenFromUrl])

  const checkAndFetchRelease = async (token: string) => {
    try {
      setLoading(true)
      setError(null)

      // Check if there's a custom page for this token
      const checkRes = await fetch(`${API_URL}/api/public/ir-release?token=${token}&check=true`)
      const checkData = await checkRes.json()

      if (checkData.hasCustomPage && checkData.customPageSlug) {
        router.replace(`/ir-release/custom/${checkData.customPageSlug}`)
        return
      }

      // No custom page, fetch the regular release data
      const res = await fetch(`${API_URL}/api/public/ir-release?token=${token}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '유효하지 않은 초대 코드입니다.')
        return
      }

      if (data.release) {
        setRelease(data.release)
      }
    } catch (err) {
      console.error('Error fetching IR release:', err)
      setError('IR Release를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (inviteCode.trim()) {
      router.push(`/ir-release?token=${inviteCode.trim()}`)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-400">IR Release를 불러오는 중...</p>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  // Show invitation code form (no token or error)
  if (!tokenFromUrl || error) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />

        <section className="pt-32 pb-20 min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
              <AnimatedSection className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  IR Release
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  초대 코드 입력
                </h1>
                <p className="text-gray-400 text-lg">
                  IR Release에 접근하려면 초대 코드가 필요합니다.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmitCode} className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="초대 코드를 입력하세요"
                      className="w-full px-5 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inviteCode.trim()}
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-orange-500/25"
                  >
                    확인
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-500 text-sm">
                    초대 코드가 없으신가요?{' '}
                    <a href="mailto:ir@nthing.net" className="text-orange-500 hover:text-orange-400 transition-colors">
                      문의하기
                    </a>
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    )
  }

  // Show IR Release content
  if (release) {
    return (
      <main className="min-h-screen bg-black">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 relative">
            <AnimatedSection className="max-w-4xl">
              {release.company && (
                <div className="flex items-center gap-4 mb-6">
                  {release.company.logo_url && (
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                      <img
                        src={release.company.logo_url}
                        alt={release.company.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-white font-medium text-lg">{release.company.name}</span>
                    {release.company.description && (
                      <p className="text-gray-500 text-sm">{release.company.description}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                IR Release
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {release.title}
              </h1>
            </AnimatedSection>
          </div>
        </section>

        {/* Cover Image */}
        {release.cover_image_url && (
          <section className="pb-16">
            <div className="container mx-auto px-4 sm:px-6">
              <AnimatedSection className="max-w-5xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={release.cover_image_url}
                    alt={release.title}
                    className="w-full"
                  />
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {/* Content Sections */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto space-y-16 sm:space-y-24">

              {/* Company Intro Section */}
              {release.company_intro && (
                <AnimatedSection>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium mb-4 border border-blue-500/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        About Company
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        회사 소개
                      </h2>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                        {release.company_intro}
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl transform rotate-3" />
                      <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
                          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-white font-medium text-lg mb-2">{release.company?.name || 'Company'}</p>
                        <p className="text-gray-500 text-sm">기업 소개 및 핵심 가치</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Vision Section */}
              {release.company_vision && (
                <AnimatedSection>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/5 rounded-3xl" />
                    <div className="relative bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12">
                      <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium mb-6 border border-purple-500/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Vision
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
                          비전
                        </h2>
                        <p className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-wrap">
                          &ldquo;{release.company_vision}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Team Section */}
              {release.team_intro && (
                <AnimatedSection>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="order-2 lg:order-1 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent rounded-2xl transform -rotate-3" />
                      <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                        <div className="grid grid-cols-3 gap-4">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm font-medium mb-4 border border-green-500/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Team
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        팀 소개
                      </h2>
                      <p className="text-gray-400 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                        {release.team_intro}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Main Content Section */}
              {release.investment_terms && (
                <AnimatedSection>
                  <div className="bg-gradient-to-br from-orange-500/10 via-zinc-900/50 to-zinc-900/50 border border-orange-500/20 rounded-3xl p-8 sm:p-12">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20">
                        <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">주요 내용</h2>
                        <p className="text-gray-500 text-sm">Key Information</p>
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                        {release.investment_terms}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Additional Info Section */}
              {release.use_of_funds && (
                <AnimatedSection>
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
                        <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">추가 정보</h2>
                        <p className="text-gray-500 text-sm">Additional Information</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                      {release.use_of_funds}
                    </p>
                  </div>
                </AnimatedSection>
              )}

              {/* Attachments Section */}
              {release.attachments && release.attachments.length > 0 && (
                <AnimatedSection>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-4 border border-red-500/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Downloads
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">첨부 파일</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {release.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 p-5 bg-zinc-900/50 border border-white/10 rounded-xl hover:border-orange-500/30 hover:bg-zinc-900 transition-all"
                      >
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{file.name}</p>
                          <p className="text-gray-500 text-sm">다운로드하려면 클릭하세요</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {(release.contact_name || release.contact_email || release.contact_phone) && (
          <section className="pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <AnimatedSection className="max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-orange-600/20" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
                  <div className="relative border border-orange-500/20 rounded-3xl p-8 sm:p-12">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">문의하기</h3>
                        <p className="text-gray-400 text-lg">
                          더 자세한 정보가 필요하시면 연락주세요.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {release.contact_name && (
                          <div className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl">
                            <p className="text-gray-500 text-xs mb-1">담당자</p>
                            <p className="text-white font-medium">{release.contact_name}</p>
                          </div>
                        )}
                        {release.contact_email && (
                          <a
                            href={`mailto:${release.contact_email}`}
                            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all text-center shadow-lg shadow-orange-500/25"
                          >
                            {release.contact_email}
                          </a>
                        )}
                        {release.contact_phone && (
                          <a
                            href={`tel:${release.contact_phone}`}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-medium transition-all text-center"
                          >
                            {release.contact_phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        <Footer />
      </main>
    )
  }

  return null
}

export default function IRReleasePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black">
        <Navigation />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-400">페이지를 불러오는 중...</p>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <IRReleaseContent />
    </Suspense>
  )
}
