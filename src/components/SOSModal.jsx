import React, { useState, useEffect } from 'react'
import { AlertTriangle, X, Phone } from 'lucide-react'

const SOSModal = ({ onConfirm, onCancel }) => {
  const [countdown, setCountdown] = useState(3)
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (!isActive) return

    if (countdown === 0) {
      onConfirm()
      return
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown, isActive, onConfirm])

  const handleCancel = () => {
    setIsActive(false)
    onCancel()
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-pulse-once">
        {/* SOS Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-red-600 rounded-full p-6 animate-pulse">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Countdown Display */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-red-600 mb-2">EMERGENCY SOS</h2>
          <div className="text-6xl font-black text-red-600 mb-4">
            {countdown}
          </div>
          <p className="text-lg text-neutral-700 font-semibold">
            Emergency services will be notified
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm font-semibold text-red-800">
            Your location will be shared with emergency services
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            <span>Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            <span>Call Emergency</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SOSModal

