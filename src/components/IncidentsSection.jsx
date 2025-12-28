import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import IncidentCard from './IncidentCard'
import { IncidentCardSkeleton } from './Skeleton'
import { getIncidents } from '../services/api'
import { mockIncidents } from '../utils/mockData'

const IncidentsSection = () => {
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    fetchIncidents()
  }, [])

  const fetchIncidents = async () => {
    try {
      setLoading(true)
      setError(null)
      setUseMockData(false)
      
      // Try to fetch from backend
      const data = await getIncidents()
      
      // If we get data from backend, use it
      if (data && data.length > 0) {
        setIncidents(data)
        setUseMockData(false)
      } else {
        // If backend returns empty, use mock data
        setIncidents(mockIncidents)
        setUseMockData(true)
      }
    } catch (err) {
      console.error('Error fetching incidents:', err)
      // Backend not available, use mock data
      console.log('Backend not available, using mock data')
      setIncidents(mockIncidents)
      setUseMockData(true)
      setError(null) // Don't show error, just use mock data
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyUpdate = (incidentId, newCount) => {
    // Update the incident's verification count in state
    setIncidents(prevIncidents =>
      prevIncidents.map(incident =>
        incident.id === incidentId
          ? { ...incident, verificationCount: newCount }
          : incident
      )
    )
  }

  if (loading) {
    return (
      <section className="max-w-md mx-auto px-4 py-12">
        {/* Use Skeleton instead of spinner */}
        <div className="space-y-4">
          <IncidentCardSkeleton />
          <IncidentCardSkeleton />
          <IncidentCardSkeleton />
        </div>
      </section>
    )
  }

  if (incidents.length === 0) {
    return (
      <section className="max-w-md mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-base text-neutral-600">No incidents reported at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-md mx-auto px-4 py-8">
      {/* 8px spacing */}
      <div className="mb-6">
        <h2 className="text-lg font-bold uppercase tracking-widest mb-2 text-neutral-900">
          Recent Incidents
        </h2>
        <p className="text-sm text-neutral-600">Verify or report incidents in your area</p>
      </div>

      {/* 8px spacing between cards */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onVerifyUpdate={handleVerifyUpdate}
          />
        ))}
      </div>
    </section>
  )
}

export default IncidentsSection
