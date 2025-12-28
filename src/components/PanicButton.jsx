import React from 'react'
import { AlertTriangle } from 'lucide-react'

const PanicButton = ({ onClick }) => {
  return (
    <div className="relative">
      {/* Animated ping ring - using 8px spacing */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full bg-red-600 opacity-75 animate-ping"></div>
      </div>
      
      {/* Main button - 8px grid spacing, consistent radius */}
      <button
        onClick={onClick}
        className="relative bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-soft hover:shadow-soft-md transition-smooth transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-tight flex items-center gap-3"
        style={{ transitionDuration: '200ms' }}
      >
        <AlertTriangle className="w-6 h-6" />
        <span className="text-lg">SOS - Tap to Report</span>
      </button>
    </div>
  )
}

export default PanicButton
