'use client'

import { useState, useEffect, Suspense } from 'react'
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
      fetchRelease(tokenFromUrl)
    }
  }, [tokenFromUrl])

  const fetchRelease = async (token: string) => {
    try {
      setLoading(true)
      setError(null)

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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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

        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
                  IR Release
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  초대 코드 입력
                </h1>
                <p className="text-gray-400">
                  IR Release에 접근하려면 초대 코드가 필요합니다.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmitCode} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    placeholder="초대 코드를 입력하세요"
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inviteCode.trim()}
                  className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  확인
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  초대 코드가 없으신가요?{' '}
                  <a href="mailto:ir@nthing.net" className="text-orange-500 hover:underline">
                    문의하기
                  </a>
                </p>
              </div>
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
        <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl">
              {release.company && (
                <div className="flex items-center gap-3 mb-6">
                  {release.company.logo_url && (
                    <img
                      src={release.company.logo_url}
                      alt={release.company.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  )}
                  <span className="text-gray-400">{release.company.name}</span>
                </div>
              )}
              <div className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
                IR Release
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                {release.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {release.cover_image_url && (
          <section className="pb-12">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl">
                <img
                  src={release.cover_image_url}
                  alt={release.title}
                  className="w-full rounded-xl border border-white/10"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl space-y-12">
              {/* Company Intro */}
              {release.company_intro && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    회사 소개
                  </h2>
                  <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {release.company_intro}
                    </p>
                  </div>
                </div>
              )}

              {/* Vision */}
              {release.company_vision && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    비전
                  </h2>
                  <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {release.company_vision}
                    </p>
                  </div>
                </div>
              )}

              {/* Team Intro */}
              {release.team_intro && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    팀 소개
                  </h2>
                  <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {release.team_intro}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Content */}
              {release.investment_terms && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    주요 내용
                  </h2>
                  <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {release.investment_terms}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {release.use_of_funds && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    추가 정보
                  </h2>
                  <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {release.use_of_funds}
                    </p>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {release.attachments && release.attachments.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    첨부 파일
                  </h2>
                  <div className="space-y-3">
                    {release.attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-zinc-900 border border-white/10 rounded-xl hover:border-orange-500/30 transition-all"
                      >
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                          <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="flex-1 text-gray-300">{file.name}</span>
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {(release.contact_name || release.contact_email || release.contact_phone) && (
          <section className="pb-20">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl">
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">문의하기</h3>
                      <p className="text-gray-400">
                        더 자세한 정보가 필요하시면 연락주세요.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {release.contact_name && (
                        <span className="text-gray-300">{release.contact_name}</span>
                      )}
                      {release.contact_email && (
                        <a
                          href={`mailto:${release.contact_email}`}
                          className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all text-center"
                        >
                          {release.contact_email}
                        </a>
                      )}
                      {release.contact_phone && (
                        <a
                          href={`tel:${release.contact_phone}`}
                          className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 transition-all text-center"
                        >
                          {release.contact_phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
