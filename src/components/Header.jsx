import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, Home, FileText } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-neutral-100">
      <div className="max-w-full mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-neutral-900">
              1112 INDIA
            </h1>
            <nav className="flex items-center gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/reports"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/reports'
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>All Reports</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-neutral-900">tlasennew</span>
            <span className="text-xs text-neutral-600">/</span>
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-neutral-600">Online</span>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
