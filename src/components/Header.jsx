import React from 'react'
import { Car, MoreVertical, Home, FileText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ onMenuClick }) => {
  const location = useLocation()

  return (
    <>
      {/* Mobile Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-neutral-100 mobile-only">
        <div className="app-header">
          <div className="title-bar">
            <Car className="w-5 h-5 text-red-600" />
            <h1 className="text-xl font-bold text-neutral-900">
              SAMPARK
            </h1>
            <button
              onClick={onMenuClick}
              className="absolute right-0 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Menu"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navbar */}
      <nav className="navbar desktop-only">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-red-600" />
          <h1 className="text-xl font-bold text-neutral-900">
            SAMPARK
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/home'
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            to="/reports"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === '/reports'
                ? 'bg-blue-100 text-blue-700 font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Reports</span>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Header
