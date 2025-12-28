import React, { useState } from 'react'
import EmergencyButtons from '../components/EmergencyButtons'
import ReportIncident from '../components/ReportIncident'
import CommunityFeed from '../components/CommunityFeed'
import ServiceModal from '../components/ServiceModal'
import SOSModal from '../components/SOSModal'
import StatusTimeline from '../components/StatusTimeline'
import LocationMap from '../components/LocationMap'
import Sidebar from '../components/Sidebar'
import { services } from '../constants/services'
import { useSOS } from '../context/SOSContext'
import { useReports } from '../context/ReportsContext'
import { Shield, Heart, Flame, Phone } from 'lucide-react'

const HomePage = ({ 
  selectedService, 
  setSelectedService, 
  showModal, 
  setShowModal,
  selectedIncidentType,
  setSelectedIncidentType,
  userLocation,
  setUserLocation
}) => {
  const [showSOSModal, setShowSOSModal] = useState(false)
  const { isSOSActive, sosStatus, activateSOS, deactivateSOS } = useSOS()
  const { reports } = useReports()

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

  const handleIncidentTypeSelect = (type) => {
    setSelectedIncidentType(type)
  }

  const handleLocationUpdate = (coords) => {
    setUserLocation(coords)
  }

  const handleSOSClick = () => {
    setShowSOSModal(true)
  }

  const handleSOSConfirm = () => {
    setShowSOSModal(false)
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const location = { latitude, longitude }
          
          // Update user location
          setUserLocation(location)
          
          // Activate SOS
          activateSOS(location)
        },
        (error) => {
          alert('Unable to get location. Please enable location services.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const handleSOSCancel = () => {
    setShowSOSModal(false)
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="phone-container mobile-only">
        {/* Emergency Buttons Grid */}
        <EmergencyButtons 
          onSOSClick={handleSOSClick}
          onIncidentTypeSelect={handleIncidentTypeSelect}
        />

        {/* Status Timeline - Show when SOS is active */}
        {isSOSActive && (
          <div className="px-5 mb-5">
            <StatusTimeline status={sosStatus} isActive={isSOSActive} />
          </div>
        )}

        {/* Report Incident Section */}
        <div className="report-section">
          <ReportIncident 
            selectedIncidentType={selectedIncidentType}
            onLocationUpdate={handleLocationUpdate}
            onIncidentTypeSelect={handleIncidentTypeSelect}
          />
        </div>

        {/* Community Feed Section */}
        <CommunityFeed reports={reports} />
      </div>

      {/* Desktop Layout */}
      <div className="desktop-only">
        <div className="dashboard-container">
          {/* Left Sidebar */}
          <aside className="desktop-sidebar">
            <h3>Emergency Services</h3>
            <button
              className="btn sos"
              onClick={handleSOSClick}
            >
              <Phone className="w-5 h-5" />
              <span>SOS - DIAL 112</span>
            </button>
            <button
              className="btn police"
              onClick={() => handleIncidentTypeSelect('police')}
            >
              <Shield className="w-5 h-5" />
              <span>Police 100</span>
            </button>
            <button
              className="btn fire"
              onClick={() => handleIncidentTypeSelect('fire')}
            >
              <Flame className="w-5 h-5" />
              <span>Fire 101</span>
            </button>
            <button
              className="btn ambulance"
              onClick={() => handleIncidentTypeSelect('medical')}
            >
              <Heart className="w-5 h-5" />
              <span>Ambulance</span>
            </button>
            
            {/* Incident Types Section */}
            <div className="mt-6">
              <Sidebar 
                onIncidentTypeSelect={handleIncidentTypeSelect}
                selectedIncidentType={selectedIncidentType}
                onSOSClick={handleSOSClick}
                hideSOS={true}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="desktop-main-content">
            {/* Status Timeline - Show when SOS is active */}
            {isSOSActive && (
              <div className="card">
                <StatusTimeline status={sosStatus} isActive={isSOSActive} />
              </div>
            )}

            {/* Report Incident Card */}
            <div className="card">
              <ReportIncident 
                selectedIncidentType={selectedIncidentType}
                onLocationUpdate={handleLocationUpdate}
                onIncidentTypeSelect={handleIncidentTypeSelect}
                isDesktop={true}
              />
            </div>

            {/* Community Feed Card */}
            <div className="card">
              <CommunityFeed reports={reports} isDesktop={true} />
            </div>
          </div>

          {/* Right Side - Map */}
          <div className="desktop-map-container">
            <LocationMap 
              latitude={userLocation?.latitude} 
              longitude={userLocation?.longitude}
              showNearbyPlaces={isSOSActive}
              isSOSMode={isSOSActive}
            />
          </div>
        </div>
      </div>
      
      {/* SOS Modal */}
      {showSOSModal && (
        <SOSModal
          onConfirm={handleSOSConfirm}
          onCancel={handleSOSCancel}
        />
      )}
      
      {/* Service Modal */}
      {showModal && (
        <ServiceModal
          service={getSelectedServiceData()}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default HomePage

