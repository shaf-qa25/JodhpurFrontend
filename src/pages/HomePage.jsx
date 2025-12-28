import React, { useState } from 'react'
import { Building2, Navigation, Search } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import ReportIncident from '../components/ReportIncident'
import CommunityFeed from '../components/CommunityFeed'
import LocationMap from '../components/LocationMap'
import ServiceModal from '../components/ServiceModal'
import SOSModal from '../components/SOSModal'
import StatusTimeline from '../components/StatusTimeline'
import { services } from '../constants/services'
import { useSOS } from '../context/SOSContext'

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
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false)
  const [showSOSModal, setShowSOSModal] = useState(false)
  const { isSOSActive, sosStatus, activateSOS, deactivateSOS } = useSOS()

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

  const handleFindNearestServices = () => {
    if (!userLocation?.latitude || !userLocation?.longitude) {
      alert('Please get your location first to find nearest services.')
      return
    }
    // Toggle the showNearbyPlaces state to trigger the search
    setShowNearbyPlaces(true)
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
          
          // Automatically show nearby places
          setShowNearbyPlaces(true)
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
    <div className="flex w-full">
      {/* Left Sidebar */}
      <div className='w-[20%] m-7'>
        <Sidebar 
          onServiceClick={handleServiceClick} 
          onIncidentTypeSelect={handleIncidentTypeSelect}
          selectedIncidentType={selectedIncidentType}
          onSOSClick={handleSOSClick}
        />
      </div>
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 min-w-0">
          {/* Top Section - Find Nearest Services Button */}
          <div className="mb-8 mt-8">
            <button
              onClick={handleFindNearestServices}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-8 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-4 transform hover:scale-[1.02] active:scale-[0.98] group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
                  <Search className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span>Get Nearest Hospital or Police Station</span>
                </div>
              </div>
              <Navigation className="w-5 h-5 opacity-90 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Status Timeline - Show when SOS is active */}
          {isSOSActive && (
            <div className="mb-8 mt-8">
              <StatusTimeline status={sosStatus} isActive={isSOSActive} />
            </div>
          )}

          {/* Report Incident Section - Moved Down */}
          <div className="mt-12">
            <ReportIncident 
              selectedIncidentType={selectedIncidentType}
              onLocationUpdate={handleLocationUpdate}
            />
          </div>
            {/* <div className="m-3">
              <CommunityFeed />
            </div> */}
        
        </main>
        
        {/* Right Side - Location Map */}
        <aside className="w-96  p-4 lg:p-6 border-l border-neutral-200">
          <LocationMap 
            latitude={userLocation?.latitude} 
            longitude={userLocation?.longitude}
            showNearbyPlaces={showNearbyPlaces || isSOSActive}
            isSOSMode={isSOSActive}
          />
        </aside>
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
    </div>
  )
}

export default HomePage

