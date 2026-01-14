'use client'

import { useState } from 'react'

interface FormData {
  company_name: string
  contact_name: string
  contact_phone: string
  contact_email: string
  interested_solutions: string[]
  expected_scale: string
  deployment_timeline: string
  budget_range: string
  inquiry_detail: string
}

const initialFormData: FormData = {
  company_name: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  interested_solutions: [],
  expected_scale: '',
  deployment_timeline: '',
  budget_range: '',
  inquiry_detail: ''
}

const solutionOptions = [
  { value: 'farm_os', label: 'Farm OS (소프트웨어 플랫폼)' },
  { value: 'cube_module', label: 'CUBE (모듈형 수직농장)' },
  { value: 'giga_farm', label: 'Giga Farm (건물형 수직농장)' },
  { value: 'consulting', label: '컨설팅/기술 자문' },
  { value: 'other', label: '기타' }
]

const scaleOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'small', label: '소규모 (시범 도입)' },
  { value: 'medium', label: '중규모 (상업 생산)' },
  { value: 'large', label: '대규모 (대량 생산)' },
  { value: 'undecided', label: '미정' }
]

const timelineOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'immediate', label: '즉시 (1개월 이내)' },
  { value: 'short', label: '단기 (3개월 이내)' },
  { value: 'medium', label: '중기 (6개월 이내)' },
  { value: 'long', label: '장기 (1년 이내)' },
  { value: 'undecided', label: '미정' }
]

const budgetOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'under_100m', label: '1억 미만' },
  { value: '100m_500m', label: '1억 ~ 5억' },
  { value: '500m_1b', label: '5억 ~ 10억' },
  { value: 'over_1b', label: '10억 이상' },
  { value: 'undecided', label: '미정/협의' }
]

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSolutionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interested_solutions: prev.interested_solutions.includes(value)
        ? prev.interested_solutions.filter(v => v !== value)
        : [...prev.interested_solutions, value]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://nthing-corp-platform.vercel.app'
      const response = await fetch(`${apiUrl}/api/public/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '문의 접수에 실패했습니다.')
      }

      setSubmitted(true)
      setFormData(initialFormData)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="py-20 sm:py-28 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              문의가 접수되었습니다
            </h2>
            <p className="text-gray-400 mb-8">
              담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
              <br />
              감사합니다.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              새로운 문의하기
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium mb-6 border border-orange-500/20">
              Contact Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              프로젝트 문의
            </h2>
            <p className="text-gray-400 text-lg">
              수직농장 솔루션 도입에 관심이 있으시면 문의해주세요.
              <br />
              전문 컨설턴트가 최적의 솔루션을 제안드립니다.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* 기본 정보 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">기본 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    회사/기관명 <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="회사명"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    담당자명 <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="이름"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    연락처 <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    이메일 <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="email@company.com"
                  />
                </div>
              </div>
            </div>

            {/* 관심 솔루션 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">관심 솔루션</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {solutionOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.interested_solutions.includes(option.value)
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interested_solutions.includes(option.value)}
                      onChange={() => handleSolutionChange(option.value)}
                      className="w-4 h-4 text-orange-500 bg-black border-white/20 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">상세 정보 (선택)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    예상 규모
                  </label>
                  <select
                    value={formData.expected_scale}
                    onChange={(e) => setFormData({ ...formData, expected_scale: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {scaleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    도입 시기
                  </label>
                  <select
                    value={formData.deployment_timeline}
                    onChange={(e) => setFormData({ ...formData, deployment_timeline: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {timelineOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    예산 범위
                  </label>
                  <select
                    value={formData.budget_range}
                    onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                문의 내용 <span className="text-orange-500">*</span>
              </label>
              <textarea
                value={formData.inquiry_detail}
                onChange={(e) => setFormData({ ...formData, inquiry_detail: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="프로젝트 배경이나 구체적인 요청 사항을 적어주세요."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '접수 중...' : '문의하기'}
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">
              제출하신 정보는 상담 목적으로만 사용되며, 개인정보보호법에 따라 안전하게 관리됩니다.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
