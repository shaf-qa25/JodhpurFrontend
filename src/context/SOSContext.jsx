import React, { createContext, useContext, useState } from 'react'

const SOSContext = createContext()

export const useSOS = () => {
  const context = useContext(SOSContext)
  if (!context) {
    throw new Error('useSOS must be used within a SOSProvider')
  }
  return context
}

export const SOSProvider = ({ children }) => {
  const [isSOSActive, setIsSOSActive] = useState(false)
  const [sosLocation, setSosLocation] = useState(null)
  const [sosStatus, setSOSStatus] = useState('reported') // reported, processing, officer-assigned
  const [sosIncidentId, setSOSIncidentId] = useState(null)

  const activateSOS = (location) => {
    setIsSOSActive(true)
    setSosLocation(location)
    setSOSStatus('reported')
    setSOSIncidentId(Date.now()) // Mock incident ID
    
    // Simulate status progression
    setTimeout(() => {
      setSOSStatus('processing')
    }, 2000)
    
    setTimeout(() => {
      setSOSStatus('officer-assigned')
    }, 5000)
  }

  const deactivateSOS = () => {
    setIsSOSActive(false)
    setSosLocation(null)
    setSOSStatus('reported')
    setSOSIncidentId(null)
  }

  return (
    <SOSContext.Provider value={{
      isSOSActive,
      sosLocation,
      sosStatus,
      sosIncidentId,
      activateSOS,
      deactivateSOS
    }}>
      {children}
    </SOSContext.Provider>
  )
}

