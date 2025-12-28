import React from 'react'
import { Shield, Flame, TrafficCone, Wrench, AlertTriangle, Heart, Cloud, MoreHorizontal, Phone, AlertCircle } from 'lucide-react'

const Sidebar = ({ onIncidentTypeSelect, selectedIncidentType, onSOSClick, hideSOS = false }) => {
  // Unified list of all incident types - backend accepted types only
  const allIncidentTypes = [
    { name: 'police', displayName: 'Police', icon: Shield, color: 'text-blue-600' },
    { name: 'fire', displayName: 'Fire', icon: Flame, color: 'text-red-600' },
    { name: 'accident', displayName: 'Accident', icon: AlertTriangle, color: 'text-orange-600' },
    { name: 'medical', displayName: 'Medical', icon: Heart, color: 'text-red-600' },
    { name: 'crime', displayName: 'Crime', icon: AlertCircle, color: 'text-blue-600' },
    { name: 'traffic', displayName: 'Traffic', icon: TrafficCone, color: 'text-orange-600' },
    { name: 'utility', displayName: 'Utility', icon: Wrench, color: 'text-purple-600' },
    { name: 'disaster', displayName: 'Disaster', icon: Cloud, color: 'text-blue-600' },
    { name: 'other', displayName: 'Other', icon: MoreHorizontal, color: 'text-neutral-600' }
  ]

  // If hideSOS is true, we're in desktop mode - return just the incident types
  if (hideSOS) {
    return (
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
          Incident Types
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {allIncidentTypes.map((type) => {
            const IconComponent = type.icon
            const isSelected = selectedIncidentType === type.name
            
            return (
              <button
                key={type.name}
                onClick={() => onIncidentTypeSelect && onIncidentTypeSelect(type.name)}
                className={`bg-white border-2 rounded-xl p-4 hover:bg-neutral-50 transition-all flex flex-col items-center gap-2 ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <IconComponent className={`w-7 h-7 ${type.color}`} />
                <span className="text-xs font-semibold text-neutral-900 text-center leading-tight">
                  {type.displayName}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-neutral-100 lg:h-screen overflow-y-auto lg:sticky lg:top-0">
      <div className="p-4">
        {/* SOS Emergency Button */}
        <div className="mb-6">
          <button
            onClick={onSOSClick}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-5 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98] animate-pulse"
          >
            <Phone className="w-6 h-6" />
            <span className="text-lg">SOS EMERGENCY</span>
          </button>
          <p className="text-xs text-neutral-500 text-center mt-2 font-semibold">
            Tap in case of emergency
          </p>
        </div>

        {/* Incident Types Section - All boxes unified here */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
            Incident Types
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {allIncidentTypes.map((type) => {
              const IconComponent = type.icon
              const isSelected = selectedIncidentType === type.name
              
              return (
                <button
                  key={type.name}
                  onClick={() => onIncidentTypeSelect && onIncidentTypeSelect(type.name)}
                  className={`bg-white border-2 rounded-xl p-4 hover:bg-neutral-50 transition-all flex flex-col items-center gap-2 ${
                    isSelected 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <IconComponent className={`w-7 h-7 ${type.color}`} />
                  <span className="text-xs font-semibold text-neutral-900 text-center leading-tight">
                    {type.displayName}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

