'use client'

import { useState } from 'react'

interface FormData {
  company_name: string
  contact_name: string
  contact_phone: string
  contact_email: string
  business_type: string
  interested_products: string[]
  expected_volume: string
  delivery_frequency: string
  delivery_area: string
  inquiry_detail: string
}

const initialFormData: FormData = {
  company_name: '',
  contact_name: '',
  contact_phone: '',
  contact_email: '',
  business_type: '',
  interested_products: [],
  expected_volume: '',
  delivery_frequency: '',
  delivery_area: '',
  inquiry_detail: ''
}

const businessTypeOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'retail', label: '유통/마트' },
  { value: 'restaurant', label: '레스토랑/외식업' },
  { value: 'food_service', label: '단체급식/케이터링' },
  { value: 'food_manufacturing', label: '식품제조/가공' },
  { value: 'hotel', label: '호텔/리조트' },
  { value: 'other', label: '기타' }
]

const productOptions = [
  { value: 'romaine', label: '로메인' },
  { value: 'butterhead', label: '버터헤드' },
  { value: 'basil', label: '바질' },
  { value: 'arugula', label: '루꼴라' },
  { value: 'kale', label: '케일' },
  { value: 'mixed_greens', label: '모듬 샐러드' },
  { value: 'other', label: '기타 품종' }
]

const volumeOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'under_50kg', label: '월 50kg 미만' },
  { value: '50_200kg', label: '월 50kg ~ 200kg' },
  { value: '200_500kg', label: '월 200kg ~ 500kg' },
  { value: '500_1000kg', label: '월 500kg ~ 1톤' },
  { value: 'over_1000kg', label: '월 1톤 이상' }
]

const frequencyOptions = [
  { value: '', label: '선택해주세요' },
  { value: 'daily', label: '매일' },
  { value: 'weekly_3', label: '주 3회' },
  { value: 'weekly_2', label: '주 2회' },
  { value: 'weekly', label: '주 1회' },
  { value: 'biweekly', label: '격주' },
  { value: 'monthly', label: '월 1회' },
  { value: 'as_needed', label: '필요시' }
]

export default function FreshProduceInquiry() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleProductChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interested_products: prev.interested_products.includes(value)
        ? prev.interested_products.filter(v => v !== value)
        : [...prev.interested_products, value]
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
        body: JSON.stringify({
          ...formData,
          inquiry_type: 'fresh_produce',
          interested_solutions: ['fresh_produce_supply']
        })
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
      <section id="fresh-produce" className="py-20 sm:py-28 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              문의가 접수되었습니다
            </h2>
            <p className="text-gray-400 mb-8">
              신선채소 공급 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
              <br />
              감사합니다.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              새로운 문의하기
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="fresh-produce" className="py-20 sm:py-28 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-green-500/10 text-green-500 rounded-full text-sm font-medium mb-6 border border-green-500/20">
              Fresh Produce
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              신선채소 공급 문의
            </h2>
            <p className="text-gray-400 text-lg">
              수직농장에서 재배한 프리미엄 신선채소를 공급받으세요.
              <br />
              연중 안정적인 품질과 물량을 보장합니다.
            </p>
          </div>

          {/* Product Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: '🥬', label: '무농약 재배', desc: 'Pesticide-Free' },
              { icon: '📅', label: '연중 생산', desc: '365 Days' },
              { icon: '🚚', label: '당일 배송', desc: 'Same Day' },
              { icon: '✨', label: '세척 불필요', desc: 'Ready to Eat' }
            ].map((item) => (
              <div key={item.label} className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white font-medium text-sm">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
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
                    회사/기관명 <span className="text-green-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="회사명"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    담당자명 <span className="text-green-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="이름"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    연락처 <span className="text-green-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="010-0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    이메일 <span className="text-green-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="email@company.com"
                  />
                </div>
              </div>
            </div>

            {/* 업종 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">업종</h3>
              <select
                value={formData.business_type}
                onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {businessTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 관심 품목 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">관심 품목</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {productOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.interested_products.includes(option.value)
                        ? 'border-green-500 bg-green-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.interested_products.includes(option.value)}
                      onChange={() => handleProductChange(option.value)}
                      className="w-4 h-4 text-green-500 bg-black border-white/20 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 공급 조건 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">공급 조건</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    예상 물량
                  </label>
                  <select
                    value={formData.expected_volume}
                    onChange={(e) => setFormData({ ...formData, expected_volume: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {volumeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    배송 주기
                  </label>
                  <select
                    value={formData.delivery_frequency}
                    onChange={(e) => setFormData({ ...formData, delivery_frequency: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    배송 지역
                  </label>
                  <input
                    type="text"
                    value={formData.delivery_area}
                    onChange={(e) => setFormData({ ...formData, delivery_area: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="서울, 경기 등"
                  />
                </div>
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                문의 내용 <span className="text-green-500">*</span>
              </label>
              <textarea
                value={formData.inquiry_detail}
                onChange={(e) => setFormData({ ...formData, inquiry_detail: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="필요한 품목, 용도, 특별 요청사항 등을 적어주세요."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? '접수 중...' : '공급 문의하기'}
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">
              문의 접수 후 영업일 기준 1-2일 내에 담당자가 연락드립니다.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
