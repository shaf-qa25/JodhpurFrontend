import React, { useState } from 'react'
import ServiceButton from './ServiceButton'
import ServiceModal from './ServiceModal'
import PanicButton from './PanicButton'
import { services } from '../constants/services'

const HeroSection = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleServiceClick = (serviceKey) => {
    setSelectedService(serviceKey)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedService(null)
  }

  const getSelectedServiceData = () => {
    return selectedService ? services[selectedService] : null
  }

  const handlePanicClick = () => {
    // Handle panic button click
    alert('Emergency SOS activated! Help is on the way.')
    // In a real app, this would trigger an emergency report
  }

  return (
    <>
      <section className="py-8 px-4">
        <div className="max-w-md mx-auto">
          {/* Panic Button - 8px spacing */}
          <div className="mb-8 flex justify-center">
            <PanicButton onClick={handlePanicClick} />
          </div>

          {/* Section Header - Typography scale */}
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-900">
              Emergency Services
            </span>
            <p className="text-sm text-neutral-600 mt-2">
              Quick access to emergency helplines
            </p>
          </div>

          {/* Service Buttons - 8px spacing */}
          <div className="space-y-4">
            <ServiceButton
              service={services.police}
              onClick={() => handleServiceClick('police')}
            />
            <ServiceButton
              service={services.ambulance}
              onClick={() => handleServiceClick('ambulance')}
            />
            <ServiceButton
              service={services.fire}
              onClick={() => handleServiceClick('fire')}
            />
          </div>
        </div>
      </section>

      {/* Modal for Service Options */}
      {showModal && (
        <ServiceModal
          service={getSelectedServiceData()}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default HeroSection
