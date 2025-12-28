import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Upload, Send, Users } from 'lucide-react'
import { useReports } from '../context/ReportsContext'

const ReportIncident = ({ selectedIncidentType, onLocationUpdate }) => {
  const [incidentType, setIncidentType] = useState('')
  const [description, setDescription] = useState('')
  const [peopleAffected, setPeopleAffected] = useState('')
  const [location, setLocation] = useState('')
  const [locationName, setLocationName] = useState('')
  const [locationCoords, setLocationCoords] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)
  const { addReport } = useReports()
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
    'Police',
    'Ambulance',
    'Fire',
    'Pelos',
    'Accident',
    'Medical Emergency',
    'Crime',
    'Natural Disaster',
    'Traffic Issue',
    'Utility Problem',
    'Other'
  ]

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setLocation(`${latitude}, ${longitude}`)
          setLocationCoords({ latitude, longitude })
          
          // Fetch location name using reverse geocoding
          setTimeout(async () => {
            const name = await reverseGeocode(latitude, longitude)
            if (name) {
              setLocationName(name)
            }
          }, 1000) // Delay to respect rate limiting
          
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
      setUploadedFile(file)
      // Create a preview URL for the image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setUploadedFile({ file, preview: reader.result })
        }
        reader.readAsDataURL(file)
      } else {
        setUploadedFile({ file })
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!incidentType || !description) {
      alert('Please fill in all required fields')
      return
    }

    // Create report object
    const reportData = {
      type: incidentType,
      description: description, // Store description without type prefix
      location: location || 'Location not specified',
      locationName: locationName || location || 'Location not specified',
      latitude: locationCoords?.latitude,
      longitude: locationCoords?.longitude,
      image: uploadedFile?.preview || null,
      peopleAffected: parseInt(peopleAffected) || 1
    }

    // Add report to context
    addReport(reportData)

    // Show success message
    alert('Incident report submitted successfully!')

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
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-10 lg:p-12">
      <h2 className="text-xl lg:text-2xl font-bold text-neutral-900 mb-10">Report Incident</h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Incident Type */}
        <div>
          <label className="block text-base font-semibold text-neutral-700 mb-3">
            Incident Type
          </label>
          <select
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className="w-full px-5 py-4 text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-neutral-900 bg-white"
          >
            <option value="">Select incident type</option>
            {incidentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-base font-semibold text-neutral-700 mb-3">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            className="w-full px-5 py-4 text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-neutral-900 resize-none"
            placeholder="Describe the incident in detail..."
          />
        </div>

        {/* Number of People Affected */}
        <div>
          <label className="block text-base font-semibold text-neutral-700 mb-3">
            Number of People Affected
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              <Users className="w-5 h-5 text-neutral-400" />
            </div>
            <input
              type="number"
              value={peopleAffected}
              onChange={(e) => {
                const value = e.target.value
                // Only allow positive numbers
                if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 10000)) {
                  setPeopleAffected(value)
                }
              }}
              min="1"
              max="10000"
              className="w-full pl-14 pr-5 py-4 text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-neutral-900 bg-white"
              placeholder="Enter number of people affected"
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            Enter the approximate number of people affected by this incident
          </p>
        </div>

        {/* Location and Upload */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleGetLocation}
            className="flex-1 flex items-center justify-center gap-3 px-5 py-4 text-base border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold text-neutral-900"
          >
            <MapPin className="w-6 h-6 text-blue-600" />
            <span>Get Current Location</span>
          </button>
          
          <label className="flex-1 flex items-center justify-center gap-3 px-5 py-4 text-base border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer font-semibold text-neutral-900">
            <Upload className="w-6 h-6 text-blue-600" />
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 text-lg rounded-lg shadow-sm transition-colors flex items-center justify-center gap-3"
        >
          <Send className="w-6 h-6" />
          <span>Submit Report</span>
        </button>
      </form>
    </div>
  )
}

export default ReportIncident

