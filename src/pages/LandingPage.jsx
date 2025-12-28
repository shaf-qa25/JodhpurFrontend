import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleAdminClick = () => {
    // Leave as # - no action needed
    window.location.href = '#'
  }

  const handleReportClick = () => {
    // Navigate to home page
    navigate('/home')
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button
          className="modal-button"
          onClick={handleAdminClick}
        >
          As Admin
        </button>
        <button
          className="modal-button"
          onClick={handleReportClick}
        >
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            <span>Report an incident</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default LandingPage

