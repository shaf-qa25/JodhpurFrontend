import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, History, Settings } from 'lucide-react'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    {
      path: '/home',
      icon: Home,
      label: 'Home'
    },
    {
      path: '/reports',
      icon: History,
      label: 'History'
    },
    {
      path: '/settings',
      icon: Settings,
      label: 'Settings'
    }
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon
        const isActive = location.pathname === item.path
        
        if (item.path === '/settings') {
          return (
            <button
              key={item.path}
              className={isActive ? 'active' : ''}
              onClick={() => {
                // Settings functionality can be added later
                alert('Settings coming soon!')
              }}
            >
              <IconComponent />
              <span>{item.label}</span>
            </button>
          )
        }

        return (
          <Link
            key={item.path}
            to={item.path}
            className={isActive ? 'active' : ''}
          >
            <IconComponent />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav

