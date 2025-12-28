import React from 'react'
import { MapPin, Truck, Radio } from 'lucide-react'

const MapView = () => {
  // Mock vehicle positions
  const vehicles = [
    { id: 1, x: 30, y: 40, type: 'truck' },
    { id: 2, x: 60, y: 25, type: 'truck' },
    { id: 3, x: 45, y: 60, type: 'truck' }
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900">Live Updates</h2>
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-600 animate-pulse" />
          <span className="text-xs font-semibold text-red-600">Live</span>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="relative bg-neutral-100 rounded-lg overflow-hidden" style={{ height: '300px' }}>
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Mock Streets */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Horizontal streets */}
            <line x1="0" y1="20" x2="100" y2="20" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="#cbd5e1" strokeWidth="2" />
            {/* Vertical streets */}
            <line x1="20" y1="0" x2="20" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="40" y1="0" x2="40" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="#cbd5e1" strokeWidth="2" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="#cbd5e1" strokeWidth="2" />
          </svg>
        </div>

        {/* Main Location Pin */}
        <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <MapPin className="w-8 h-8 text-red-600" fill="currentColor" />
        </div>

        {/* Vehicle Markers */}
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="absolute"
            style={{ left: `${vehicle.x}%`, top: `${vehicle.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <Truck className="w-6 h-6 text-red-600" />
          </div>
        ))}

        {/* Mock Street Labels */}
        <div className="absolute top-2 left-2 text-xs font-semibold text-neutral-600 bg-white/80 px-2 py-1 rounded">
          Warniem
        </div>
        <div className="absolute top-2 right-2 text-xs font-semibold text-neutral-600 bg-white/80 px-2 py-1 rounded">
          Wohlen
        </div>
        <div className="absolute bottom-2 left-2 text-xs font-semibold text-neutral-600 bg-white/80 px-2 py-1 rounded">
          2. Lorento
        </div>
        <div className="absolute bottom-2 right-2 text-xs font-semibold text-neutral-600 bg-white/80 px-2 py-1 rounded">
          Roursifet 11
        </div>
      </div>
    </div>
  )
}

export default MapView


