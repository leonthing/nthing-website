'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/website/Navigation'
import Footer from '@/components/website/Footer'

interface Announcement {
  id: string
  title: string
  category: string
  content: string
  summary: string | null
  attachment_url: string | null
  attachment_name: string | null
  is_pinned: boolean
  published_at: string
  view_count: number
}

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'financial', label: '경영공시' },
  { value: 'investment', label: '투자공시' },
  { value: 'business', label: '사업공시' },
  { value: 'tech', label: '기술공시' },
  { value: 'general', label: '일반공시' },
]

// API URL - 프로덕션에서는 실제 URL 사용
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nthing-corp-platform.vercel.app'

export default function IRPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    fetchAnnouncements()
  }, [selectedCategory])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory)
      }

      const res = await fetch(`${API_URL}/api/public/ir-announcements?${params}`)
      const data = await res.json()

      if (data.announcements) {
        setAnnouncements(data.announcements)
      }
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryLabel = (value: string) => {
    return CATEGORIES.find(c => c.value === value)?.label || value
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const isNew = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  // 날짜 필터링된 공시 목록
  const filteredAnnouncements = announcements.filter(announcement => {
    const publishedDate = new Date(announcement.published_at)

    if (startDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      if (publishedDate < start) return false
    }

    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      if (publishedDate > end) return false
    }

    return true
  })

  const clearDateFilter = () => {
    setStartDate('')
    setEndDate('')
  }

  return (
    <main className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
              Investor Relations
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              IR 공시
            </h1>
            <p className="text-gray-400 text-lg">
              엔씽의 투자자 및 이해관계자를 위한 공시 정보를 확인하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-zinc-900 text-gray-400 border border-white/10 hover:border-orange-500/30'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Date Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-500 text-sm">기간</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50"
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-orange-500/50"
              />
              {(startDate || endDate) && (
                <button
                  onClick={clearDateFilter}
                  className="px-3 py-2 bg-zinc-800 text-gray-400 rounded-lg text-sm hover:bg-zinc-700 transition-colors"
                >
                  초기화
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">
                {announcements.length === 0 ? '등록된 공시가 없습니다.' : '해당 기간에 등록된 공시가 없습니다.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`bg-zinc-900 border rounded-xl overflow-hidden hover:border-orange-500/30 transition-all ${
                    announcement.is_pinned ? 'border-orange-500/50' : 'border-white/10'
                  }`}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === announcement.id ? null : announcement.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      {/* Date */}
                      <div className="text-sm text-gray-500 font-mono sm:w-28 flex-shrink-0">
                        {formatDate(announcement.published_at)}
                      </div>

                      {/* Category Badge */}
                      <div className="flex items-center gap-2">
                        {announcement.is_pinned && (
                          <span className="px-2 py-0.5 bg-orange-500/20 text-orange-500 rounded text-xs font-medium">
                            고정
                          </span>
                        )}
                        <span className="px-2.5 py-1 bg-white/5 text-gray-400 rounded text-xs font-medium border border-white/10">
                          {getCategoryLabel(announcement.category)}
                        </span>
                        {isNew(announcement.published_at) && (
                          <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-xs font-medium">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="flex-1 text-white font-medium">
                        {announcement.title}
                      </h3>

                      {/* Expand Icon */}
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedId === announcement.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedId === announcement.id && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/5">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                          {announcement.content}
                        </p>
                      </div>
                      {announcement.attachment_url && (
                        <div className="mt-4">
                          <a
                            href={announcement.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/10 transition-colors border border-white/10"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {announcement.attachment_name || '첨부파일 다운로드'}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">IR 문의</h3>
                <p className="text-gray-400">
                  투자 및 IR 관련 문의사항이 있으시면 연락주세요.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:ir@nthing.net"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all text-center"
                >
                  ir@nthing.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
