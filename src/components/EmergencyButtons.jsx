import React from 'react'
import { Shield, Heart, Flame, Phone } from 'lucide-react'
import { useSOS } from '../context/SOSContext'

const EmergencyButtons = ({ onSOSClick, onIncidentTypeSelect }) => {
  const { isSOSActive } = useSOS()

  // Map service keys to incident types
  const serviceToIncidentType = {
    'police': 'police',
    'ambulance': 'medical',
    'fire': 'fire'
  }

  const emergencyServices = [
    {
      key: 'police',
      label: 'Police 100',
      icon: Shield,
      color: 'police',
      incidentType: 'police',
      onClick: () => onIncidentTypeSelect && onIncidentTypeSelect('police'),
      isStatic: true // Static on mobile, active on desktop
    },
    {
      key: 'ambulance',
      label: 'Ambulance',
      icon: Heart,
      color: 'ambulance',
      incidentType: 'medical',
      onClick: () => onIncidentTypeSelect && onIncidentTypeSelect('medical'),
      isStatic: true // Static on mobile, active on desktop
    },
    {
      key: 'fire',
      label: 'Fire 101',
      icon: Flame,
      color: 'fire',
      incidentType: 'fire',
      onClick: () => onIncidentTypeSelect && onIncidentTypeSelect('fire'),
      isStatic: true // Static on mobile, active on desktop
    },
    {
      key: 'sos',
      label: 'SOS - DIAL 112',
      icon: Phone,
      color: 'sos',
      onClick: onSOSClick,
      isStatic: false // Always active
    }
  ]

  const handleButtonClick = (service) => {
    // For SOS, call the onClick directly (keep SOS functionality untouched)
    if (service.key === 'sos') {
      if (service.onClick) {
        service.onClick()
      }
      return
    }
    
    // For other services (Police, Ambulance, Fire), set incident type
    // On desktop, buttons are active; on mobile they remain static
    if (service.onClick) {
      service.onClick()
    }
  }

  return (
    <div className="emergency-grid">
      {emergencyServices.map((service) => {
        const IconComponent = service.icon
        const isStatic = service.isStatic && service.key !== 'sos'
        return (
          <button
            key={service.key}
            onClick={() => handleButtonClick(service)}
            disabled={isStatic}
            className={`e-btn ${service.color} ${isSOSActive && service.key === 'sos' ? 'animate-pulse' : ''} ${isStatic ? 'e-btn-static' : ''}`}
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-center leading-tight">{service.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default EmergencyButtons

