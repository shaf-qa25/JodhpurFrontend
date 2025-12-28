// API Service for backend communication
const BASE_URL = import.meta.env.VITE_API_URL || 'https://safety-system-ikpn.onrender.com'


/**
 * Fetch all incidents from the backend
 * @returns {Promise<Array>} Array of incident objects
 */
export const getIncidents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/incidents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // Backend returns array directly or wrapped in incidents property
    const incidents = Array.isArray(data) ? data : (data.incidents || [])
    
    // Map backend format to frontend format
    return incidents.map(incident => ({
      id: incident._id || incident.id,
      type: (incident.type || '').toLowerCase(),
      description: incident.description || '',
      location: incident.location || '',
      locationName: incident.locationName || '',
      latitude: incident.coordinates?.lat || incident.latitude,
      longitude: incident.coordinates?.lng || incident.longitude,
      image: incident.mediaUrl || null,
      peopleAffected: incident.peopleAffected || 1,
      verificationCount: incident.confirmCount || 0,
      fakeCount: incident.fakeCount || 0,
      isVerified: incident.isVerified || false,
      status: incident.status || 'PENDING',
      createdAt: incident.createdAt || new Date().toISOString()
    }))
  } catch (error) {
    console.error('Error fetching incidents:', error)
    throw error
  }
}

/**
 * Verify an incident as real
 * Sends notification to backend and increments verification count
 * @param {string|number} incidentId - The ID of the incident to verify
 * @returns {Promise<Object>} Response from the backend
 */
export const verifyIncident = async (incidentId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/incidents/${incidentId}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incidentId,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying incident:', error)
    throw error
  }
}

/**
 * Convert incident type to uppercase format for backend
 * @param {string} type - Frontend incident type (e.g., "Police", "Medical Emergency")
 * @returns {string} Uppercase format (e.g., "POLICE", "MEDICAL_EMERGENCY")
 */
const convertIncidentTypeToUpperCase = (type) => {
  if (!type) return type
  // Convert to uppercase and replace spaces with underscores
  return type.toUpperCase().replace(/\s+/g, '_')
}

/**
 * Create a new incident report
 * @param {Object} incidentData - The incident data to submit
 * @param {string} incidentData.type - Type of incident (e.g., "Police", "Ambulance", "Fire")
 * @param {string} incidentData.description - Description of the incident
 * @param {string} incidentData.location - Location string (coordinates or address)
 * @param {string} incidentData.locationName - Human-readable location name
 * @param {number} incidentData.latitude - Latitude coordinate
 * @param {number} incidentData.longitude - Longitude coordinate
 * @param {File|null} incidentData.file - File object (image/video) to upload
 * @param {number} incidentData.peopleAffected - Number of people affected
 * @returns {Promise<Object>} Response from the backend with the created incident
 */
export const createIncident = async (incidentData) => {
  try {
    // Create FormData object for multipart/form-data
    const formData = new FormData()
    
    // Convert type to uppercase format
    const typeUpperCase = convertIncidentTypeToUpperCase(incidentData.type)
    formData.append('type', typeUpperCase)
    
    // Add description
    formData.append('description', incidentData.description || '')
    
    // Add people affected
    formData.append('peopleAffected', (incidentData.peopleAffected || 1).toString())
    
    // Add location data if available
    if (incidentData.latitude !== undefined && incidentData.latitude !== null) {
      formData.append('latitude', incidentData.latitude.toString())
    }
    if (incidentData.longitude !== undefined && incidentData.longitude !== null) {
      formData.append('longitude', incidentData.longitude.toString())
    }
    if (incidentData.location) {
      formData.append('location', incidentData.location)
    }
    if (incidentData.locationName) {
      formData.append('locationName', incidentData.locationName)
    }
    
    // Add file if provided (backend will handle upload to cloud storage)
    if (incidentData.file) {
      formData.append('media', incidentData.file)
    }

    const response = await fetch(`${BASE_URL}/api/incidents`, {
      method: 'POST',
      // Don't set Content-Type header - browser will set it automatically with boundary for FormData
      body: formData,
    })

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage
      }
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating incident:', error)
    throw error
  }
}

/**
 * Report an incident as fake
 * NOTE: This function is defined but NOT called from the frontend
 * as per requirements - it's frontend only action
 * @param {string|number} incidentId - The ID of the incident to report as fake
 */
export const reportFakeIncident = async (incidentId) => {
  // This function is not used in the frontend as per requirements
  // Incidents reported as fake are handled only on the frontend
  // If backend tracking is needed in future, uncomment and implement:
  
  /*
  try {
    const response = await fetch(`${BASE_URL}/incidents/${incidentId}/report-fake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        incidentId,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error reporting fake incident:', error)
    throw error
  }
  */
  
  console.log('Fake report is frontend only - no API call made for incident:', incidentId)
}




