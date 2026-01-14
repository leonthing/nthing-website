export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              N.THING
            </div>
            <p className="text-gray-500 mb-6 leading-relaxed max-w-md">
              IoT, AI, 클라우드 기술을 결합한 모듈형 수직농장 솔루션.
              데이터 기반의 스마트 농업으로 지속 가능한 식량 생산 인프라를 구축합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              {['IoT', 'AI/ML', 'Cloud', 'Hydroponics', 'Heart', 'Automation'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 flex items-center gap-1"
                >
                  {tech}
                  {tech === 'Heart' && <span className="text-red-500">♥</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-500 hover:text-orange-500 transition-colors">About</a>
              </li>
              <li>
                <a href="#platform" className="text-gray-500 hover:text-orange-500 transition-colors">N.FARM.AI</a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-500 hover:text-orange-500 transition-colors">Solutions</a>
              </li>
              <li>
                <a href="#products" className="text-gray-500 hover:text-orange-500 transition-colors">Products</a>
              </li>
              <li>
                <a href="#fresh-produce" className="text-gray-500 hover:text-orange-500 transition-colors">Fresh Produce</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-500 hover:text-orange-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-500">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex flex-col">
                  <span>경기도 이천시 경충대로 2330-63</span>
                  <span className="text-xs text-gray-600">37.2667°N, 127.4350°E</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex flex-col">
                  <span>connect@nthing.net</span>
                  <span className="text-xs text-gray-600">IR: ir@nthing.net</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} N.THING Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a
                href="https://nthing-corp-platform.vercel.app/login"
                className="hover:text-orange-500 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
