import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReportsProvider } from './context/ReportsContext'
import { SOSProvider } from './context/SOSContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ReportsPage from './pages/ReportsPage'

const App = () => {
  const [selectedService, setSelectedService] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedIncidentType, setSelectedIncidentType] = useState('')
  const [userLocation, setUserLocation] = useState(null)

  return (
    <ReportsProvider>
      <SOSProvider>
        <Router>
          <div className="min-h-screen bg-neutral-50">
            <Header />
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedIncidentType={selectedIncidentType}
                    setSelectedIncidentType={setSelectedIncidentType}
                    userLocation={userLocation}
                    setUserLocation={setUserLocation}
                  />
                } 
              />
              <Route path="/reports" element={<ReportsPage />} />
            </Routes>
          </div>
        </Router>
      </SOSProvider>
    </ReportsProvider>
  )
}

export default App
