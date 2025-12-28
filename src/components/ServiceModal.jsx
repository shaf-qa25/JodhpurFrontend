import React from 'react'
import { Shield, Ambulance, Flame, Car, TrafficCone, Wrench, Phone, FileText, X } from 'lucide-react'

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null

  const handleCallClick = () => {
    window.location.href = `tel:${service.number}`
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleReportClick = () => {
    alert(`Reporting incident to ${service.name}. Redirecting to report form...`)
    onClose()
  }

  // Map service type to icon component
  const getIcon = () => {
    switch (service.iconType) {
      case 'police':
        return <Shield className="w-16 h-16" />
      case 'ambulance':
        return <Ambulance className="w-16 h-16" />
      case 'fire':
        return <Flame className="w-16 h-16" />
      case 'car':
        return <Car className="w-16 h-16" />
      case 'traffic':
        return <TrafficCone className="w-16 h-16" />
      case 'utility':
        return <Wrench className="w-16 h-16" />
      default:
        return null
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-soft-lg max-w-md w-full p-6 transform transition-smooth relative border border-neutral-100"
        onClick={(e) => e.stopPropagation()}
        style={{ transitionDuration: '200ms' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors p-1"
          style={{ transitionDuration: '200ms' }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4 text-blue-600">
            {getIcon()}
          </div>
          <h3 className="text-2xl font-bold uppercase text-neutral-900">
            {service.name} Service
          </h3>
          <p className="text-neutral-600 text-sm font-semibold mt-2">Choose an option</p>
        </div>

        {/* Modal Buttons */}
        <div className="space-y-3">
          {/* Direct Call Button */}
          <button
            onClick={handleCallClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-soft hover:shadow-soft-md transition-smooth flex items-center justify-center gap-3 uppercase tracking-tight transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ transitionDuration: '200ms' }}
          >
            <Phone className="w-5 h-5" />
            <span>Direct Call</span>
          </button>

          {/* Report Button */}
          <button
            onClick={handleReportClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-soft hover:shadow-soft-md transition-smooth flex items-center justify-center gap-3 uppercase tracking-tight transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ transitionDuration: '200ms' }}
          >
            <FileText className="w-5 h-5" />
            <span>Report Incident</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-semibold py-3 px-6 rounded-xl transition-colors"
            style={{ transitionDuration: '200ms' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal
