import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Upload, Send, Users, Loader2 } from 'lucide-react'
import { useReports } from '../context/ReportsContext'
import { createIncident } from '../services/api'

const ReportIncident = ({ selectedIncidentType, onLocationUpdate, onIncidentTypeSelect, isDesktop = false }) => {
  const [incidentType, setIncidentType] = useState('')
  const [description, setDescription] = useState('')
  const [peopleAffected, setPeopleAffected] = useState('')
  const [location, setLocation] = useState('')
  const [locationName, setLocationName] = useState('')
  const [locationCoords, setLocationCoords] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const { addReport, refreshReports } = useReports()
  const navigate = useNavigate()

  // Reverse geocoding function
  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'IITJ-Frontend-App'
          }
        }
      )
      
      if (!response.ok) return null
      
      const data = await response.json()
      if (!data || !data.address) return null
      
      const addr = data.address
      const parts = []
      
      if (addr.neighbourhood || addr.suburb || addr.quarter) {
        parts.push(addr.neighbourhood || addr.suburb || addr.quarter)
      }
      if (addr.city || addr.town || addr.village) {
        parts.push(addr.city || addr.town || addr.village)
      }
      if (addr.state) {
        parts.push(addr.state)
      }
      
      return parts.length > 0 ? parts.join(', ') : (data.display_name || null)
    } catch (error) {
      console.error('Error reverse geocoding:', error)
      return null
    }
  }

  // Update incident type when selected from sidebar
  React.useEffect(() => {
    if (selectedIncidentType) {
      setIncidentType(selectedIncidentType)
    }
  }, [selectedIncidentType])

  const incidentTypes = [
    'police',
    'fire',
    'accident',
    'medical',
    'crime',
    'traffic',
    'utility',
    'disaster',
    'other'
  ]

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude}, ${longitude}`)
          setLocationCoords({ latitude, longitude })
          
          // Fetch location name using reverse geocoding (only if not already set)
          if (!locationName) {
            setTimeout(async () => {
              const name = await reverseGeocode(latitude, longitude)
              if (name) {
                setLocationName(name)
              }
            }, 2000) // Increased delay to reduce requests
          }
          
          // Pass location to parent component for map display
          if (onLocationUpdate) {
            onLocationUpdate({ latitude, longitude })
          }
        },
        (error) => {
          alert('Unable to get location. Please enter manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Store file object and create preview for display
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          // Store both file object (for API) and preview (for display)
          setUploadedFile({ file, preview: reader.result })
        }
        reader.readAsDataURL(file)
      } else {
        // For non-image files, just store the file object
        setUploadedFile({ file, preview: null })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!incidentType || !description) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Get the actual file object (not the preview/base64)
      const fileObject = uploadedFile?.file || (uploadedFile instanceof File ? uploadedFile : null)
      
      // Create report object with file object for FormData
      const reportData = {
        type: incidentType,
        description: description,
        location: location || 'Location not specified',
        locationName: locationName || location || 'Location not specified',
        latitude: locationCoords?.latitude,
        longitude: locationCoords?.longitude,
        file: fileObject, // Pass the actual file object
        peopleAffected: parseInt(peopleAffected) || 1
      }

      // Submit to backend API
      const response = await createIncident(reportData)
      
      // Backend response format: array with incident object or single object
      const incidentResponse = Array.isArray(response) ? response[0] : (response.incident || response)
      
      // Map backend response to frontend format for context
      const reportToAdd = {
        id: incidentResponse._id || incidentResponse.id || Date.now(),
        type: (incidentResponse.type || '').toLowerCase(),
        description: incidentResponse.description,
        location: locationName || location || 'Location not specified',
        locationName: locationName || location || 'Location not specified',
        latitude: incidentResponse.coordinates?.lat || locationCoords?.latitude,
        longitude: incidentResponse.coordinates?.lng || locationCoords?.longitude,
        image: incidentResponse.mediaUrl || uploadedFile?.preview || null,
        peopleAffected: incidentResponse.peopleAffected || parseInt(peopleAffected) || 1,
        verificationCount: incidentResponse.confirmCount || 0,
        createdAt: incidentResponse.createdAt || new Date().toISOString(),
        status: incidentResponse.status || 'PENDING'
      }
      
      addReport(reportToAdd)
      
      // Show success message
      alert('Incident report submitted successfully!')
      
      // Refresh reports from backend after navigation (only if on reports page)
      // This prevents duplicate requests
      if (refreshReports && window.location.pathname === '/reports') {
        setTimeout(() => {
          refreshReports()
        }, 1500)
      }

      // Reset form
      setIncidentType('')
      setDescription('')
      setPeopleAffected('')
      setLocation('')
      setLocationName('')
      setLocationCoords(null)
      setUploadedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      // Navigate to reports page to see the new report
      navigate('/reports')
    } catch (error) {
      console.error('Error submitting incident:', error)
      setError(error.message || 'Failed to submit incident report. Please try again.')
      alert(`Error: ${error.message || 'Failed to submit incident report. Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h3 className={isDesktop ? "text-xl font-bold mb-4" : "section-heading"}>Report Incident</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-semibold">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={isDesktop ? "space-y-4" : "space-y-4"}>
        {/* Incident Type */}
        <select
          value={incidentType}
          onChange={(e) => {
            setIncidentType(e.target.value)
            if (onIncidentTypeSelect) {
              onIncidentTypeSelect(e.target.value)
            }
          }}
          className={isDesktop ? "desktop-input" : "input-field"}
        >
          <option value="">Incident Type Accident, Medical, Fire</option>
          {incidentTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={isDesktop ? "6" : "4"}
          className={isDesktop ? "desktop-textarea" : "input-field resize-none"}
          placeholder="Description"
        />

        {/* Number of People Affected */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Users className="w-4 h-4 text-neutral-400" />
          </div>
          <input
            type="number"
            value={peopleAffected}
            onChange={(e) => {
              const value = e.target.value
              if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 10000)) {
                setPeopleAffected(value)
              }
            }}
            min="1"
            max="10000"
            className={isDesktop ? "desktop-input pl-10" : "input-field pl-10"}
            placeholder="People Affected"
          />
        </div>

        {/* Location and Upload */}
        <div className={isDesktop ? "flex gap-3 flex-wrap" : "upload-row"}>
          <button
            type="button"
            onClick={handleGetLocation}
            className={isDesktop ? "flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors min-w-[150px]" : "loc-btn"}
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Get Current Location</span>
          </button>
          
          <label className={isDesktop ? "flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer min-w-[150px]" : "photo-btn"}>
            <Upload className="w-4 h-4 text-blue-600" />
            <span>Upload Photo/Video</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={isDesktop ? "btn-submit" : "submit-btn"}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Report</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ReportIncident

