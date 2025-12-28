// API Service for backend communication
// NOTE: Replace BASE_URL with your actual backend API URL

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'


/**
 * Fetch all incidents from the backend
 * @returns {Promise<Array>} Array of incident objects
 */
export const getIncidents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/incidents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.incidents || data
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
    const response = await fetch(`${BASE_URL}/incidents/${incidentId}/verify`, {
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



