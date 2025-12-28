import React from 'react'
import { Shield, Ambulance, Flame, Car, TrafficCone, Wrench } from 'lucide-react'

const ServiceButton = ({ service, onClick }) => {
  // Map service type to icon component
  const getIcon = () => {
    switch (service.iconType) {
      case 'police':
        return <Shield className="w-7 h-7" />
      case 'ambulance':
        return <Ambulance className="w-7 h-7" />
      case 'fire':
        return <Flame className="w-7 h-7" />
      case 'car':
        return <Car className="w-7 h-7" />
      case 'traffic':
        return <TrafficCone className="w-7 h-7" />
      case 'utility':
        return <Wrench className="w-7 h-7" />
      default:
        return null
    }
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-neutral-100 rounded-2xl shadow-sm p-6 hover:shadow-soft transition-smooth text-left flex items-center gap-4 group"
      style={{ transitionDuration: '200ms' }}
    >
      <div className="flex-shrink-0 text-blue-600 group-hover:text-blue-700 transition-colors" style={{ transitionDuration: '200ms' }}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="text-lg font-bold text-neutral-900">
          {service.name}
        </div>
        <div className="text-2xl font-bold mt-1 text-blue-600">
          {service.number}
        </div>
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
        Helpline
      </div>
    </button>
  )
}

export default ServiceButton
