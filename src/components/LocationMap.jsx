import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, AlertCircle, Loader2 } from 'lucide-react'

// Fix for default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to update map view when location changes
const MapUpdater = ({ center, zoom }) => {
  const map = useMap()
  
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom)
    }
  }, [center, zoom, map])
  
  return null
}

// Create custom icons for different place types with larger, more visible icons
const createCustomIcon = (color, iconType) => {
  // Much larger size for better visibility on map
  const iconSize = 50
  const borderWidth = 5
  
  // Hospital icon SVG (plus sign in circle)
  const hospitalIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" style="width: 28px; height: 28px;">
      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 128c-8.844 0-16 7.156-16 16v96H144c-8.844 0-16 7.156-16 16v32c0 8.844 7.156 16 16 16h96v96c0 8.844 7.156 16 16 16h32c8.844 0 16-7.156 16-16v-96h96c8.844 0 16-7.156 16-16v-32c0-8.844-7.156-16-16-16h-96v-96c0-8.844-7.156-16-16-16H256z"/>
    </svg>
  `
  
  // Police/Shield icon SVG
  const policeIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" style="width: 28px; height: 28px;">
      <path d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3c11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-.1-.1 .1c-95.2-42.2-208-170.9-208-318.3c0-6.2 3.5-11.8 9-14.5l192-80c5.8-2.4 12.4-2.4 18.2 0l192 80c5.5 2.7 9 8.3 9 14.5c0 147.4-112.8 276.1-208 318.3z"/>
    </svg>
  `
  
  const iconSvg = iconType === 'hospital' ? hospitalIconSvg : policeIconSvg
  
  // Create icon HTML with larger size and better styling
  const iconHtml = `
    <div style="
      background-color: ${color};
      width: ${iconSize}px;
      height: ${iconSize}px;
      border-radius: 50%;
      border: ${borderWidth}px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      position: relative;
      z-index: 1000;
    ">
      ${iconSvg}
    </div>
  `
  
  return L.divIcon({
    className: 'custom-marker-icon',
    html: iconHtml,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize],
    popupAnchor: [0, -iconSize / 2]
  })
}

// Reverse geocoding function using Nominatim API
const reverseGeocode = async (latitude, longitude) => {
  const nominatimUrl = 'https://nominatim.openstreetmap.org/reverse'
  
  try {
    const response = await fetch(
      `${nominatimUrl}?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'IITJ-Frontend-App' // Required by Nominatim
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch location name')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error reverse geocoding:', error)
    throw error
  }
}

// Format address from Nominatim response
const formatAddress = (data) => {
  if (!data || !data.address) {
    return 'Location name not available'
  }
  
  const addr = data.address
  const parts = []
  
  // Build address in order: area/neighborhood -> city -> state -> country
  if (addr.neighbourhood || addr.suburb || addr.quarter) {
    parts.push(addr.neighbourhood || addr.suburb || addr.quarter)
  }
  
  if (addr.city || addr.town || addr.village) {
    parts.push(addr.city || addr.town || addr.village)
  }
  
  if (addr.state) {
    parts.push(addr.state)
  }
  
  if (addr.country) {
    parts.push(addr.country)
  }
  
  // If no parts found, try display_name
  if (parts.length === 0) {
    return data.display_name || 'Location name not available'
  }
  
  return parts.join(', ')
}

// Overpass API query function
const fetchNearbyPlaces = async (latitude, longitude, radius = 3000) => {
  const overpassUrl = 'https://overpass-api.de/api/interpreter'
  
  // Query for hospitals and police stations within radius
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${latitude},${longitude});
      node["amenity"="clinic"](around:${radius},${latitude},${longitude});
      node["amenity"="doctors"](around:${radius},${latitude},${longitude});
      way["amenity"="hospital"](around:${radius},${latitude},${longitude});
      way["amenity"="clinic"](around:${radius},${latitude},${longitude});
      node["amenity"="police"](around:${radius},${latitude},${longitude});
      way["amenity"="police"](around:${radius},${latitude},${longitude});
    );
    out center;
  `
  
  try {
    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch nearby places')
    }
    
    const data = await response.json()
    return data.elements || []
  } catch (error) {
    console.error('Error fetching nearby places:', error)
    throw error
  }
}

const LocationMap = ({ latitude, longitude, showNearbyPlaces = false, isSOSMode = false }) => {
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nearbyPlaces, setNearbyPlaces] = useState([])
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false)
  const [placesError, setPlacesError] = useState(null)
  const [locationName, setLocationName] = useState(null)
  const [isLoadingLocationName, setIsLoadingLocationName] = useState(false)
  const [locationNameError, setLocationNameError] = useState(null)

  // Default location (IIT Jodhpur coordinates as fallback)
  const defaultLocation = [26.4691, 73.1139]
  const defaultZoom = 13

  useEffect(() => {
    // If props are provided, use them
    if (latitude && longitude) {
      setUserLocation([latitude, longitude])
      setIsLoading(false)
      setLocationError(null)
      return
    }

    // Otherwise, try to get current location automatically
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords
          setUserLocation([lat, lng])
          setIsLoading(false)
          setLocationError(null)
        },
        (error) => {
          setIsLoading(false)
          let errorMessage = 'Unable to get your location.'
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location permissions in your browser settings to see your location on the map.'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.'
              break
            case error.TIMEOUT:
              errorMessage = 'Location request timed out. Please try again.'
              break
            default:
              errorMessage = 'An unknown error occurred while getting your location.'
          }
          
          setLocationError(errorMessage)
          // Use default location if geolocation fails
          setUserLocation(defaultLocation)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    } else {
      setIsLoading(false)
      setLocationError('Geolocation is not supported by your browser.')
      setUserLocation(defaultLocation)
    }
  }, [latitude, longitude])

  // Fetch location name when userLocation changes (with debouncing)
  useEffect(() => {
    if (userLocation && userLocation[0] && userLocation[1]) {
      setIsLoadingLocationName(true)
      setLocationNameError(null)
      
      // Add delay to respect Nominatim rate limiting (1 request per second)
      // Use longer delay to prevent too many requests
      const timeoutId = setTimeout(() => {
        reverseGeocode(userLocation[0], userLocation[1])
          .then((data) => {
            const formattedAddress = formatAddress(data)
            setLocationName(formattedAddress)
            setIsLoadingLocationName(false)
          })
          .catch((error) => {
            console.error('Error fetching location name:', error)
            setLocationNameError('Unable to fetch location name')
            setLocationName(null)
            setIsLoadingLocationName(false)
          })
      }, 2000) // 2 second delay for rate limiting and to reduce requests
      
      return () => clearTimeout(timeoutId)
    }
  }, [userLocation])

  // Fetch nearby places when showNearbyPlaces is true or SOS mode is active (with debouncing)
  useEffect(() => {
    if ((showNearbyPlaces || isSOSMode) && userLocation && userLocation[0] && userLocation[1]) {
      // Debounce to prevent multiple rapid requests
      const timeoutId = setTimeout(() => {
        setIsLoadingPlaces(true)
        setPlacesError(null)
        
        fetchNearbyPlaces(userLocation[0], userLocation[1], 3000)
          .then((places) => {
            // Process places and extract coordinates
            const processedPlaces = places
              .map((place) => {
                let lat, lon
                
                if (place.type === 'node') {
                  lat = place.lat
                  lon = place.lon
                } else if (place.center) {
                  lat = place.center.lat
                  lon = place.center.lon
                } else {
                  return null
                }
                
                // Determine place type
                const tags = place.tags || {}
                let placeType = 'other'
                let name = tags.name || tags['name:en'] || 'Unnamed Place'
                
                if (tags.amenity === 'hospital' || tags.amenity === 'clinic' || tags.amenity === 'doctors') {
                  placeType = 'hospital'
                } else if (tags.amenity === 'police') {
                  placeType = 'police'
                }
                
                return {
                  id: place.id,
                  name,
                  type: placeType,
                  latitude: lat,
                  longitude: lon,
                  tags
                }
              })
              .filter(place => place !== null && (place.type === 'hospital' || place.type === 'police'))
            
            setNearbyPlaces(processedPlaces)
            setIsLoadingPlaces(false)
          })
          .catch((error) => {
            console.error('Error fetching nearby places:', error)
            setPlacesError('Failed to load nearby places. Please try again.')
            setIsLoadingPlaces(false)
          })
      }, 500) // Debounce delay
      
      return () => clearTimeout(timeoutId)
    } else if (!showNearbyPlaces && !isSOSMode) {
      // Clear places when showNearbyPlaces is false and not in SOS mode
      setNearbyPlaces([])
    }
  }, [showNearbyPlaces, isSOSMode, userLocation])

  // Create custom icon for user location marker
  const userLocationIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  // Create icons for hospitals and police stations
  const hospitalIcon = createCustomIcon('#ef4444', 'hospital') // Red for hospitals
  const policeIcon = createCustomIcon('#3b82f6', 'police') // Blue for police

  if (isLoading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Your Location
        </h3>
        <div className="bg-neutral-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-neutral-500 font-semibold">Getting your location...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!userLocation) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Your Location
        </h3>
        <div className="bg-neutral-100 rounded-lg h-64 flex items-center justify-center">
          <p className="text-neutral-500 font-semibold text-center px-4">
            Click "Get Current Location" to see your location on map
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl shadow-sm p-6 ${isSOSMode ? 'bg-red-50 border-2 border-red-500' : 'bg-white border border-neutral-200'}`}>
      {isSOSMode && (
        <div className="mb-4 p-4 bg-red-600 text-white rounded-xl flex items-center gap-3 animate-pulse">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-bold text-lg">EMERGENCY ACTIVE</p>
            <p className="text-sm text-red-100">Emergency services are being notified</p>
          </div>
        </div>
      )}
      <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isSOSMode ? 'text-red-900' : 'text-neutral-900'}`}>
        <MapPin className={`w-5 h-5 ${isSOSMode ? 'text-red-600' : 'text-blue-600'}`} />
        {isSOSMode ? 'Emergency Location' : 'Your Location'}
      </h3>
      
      {/* Error message if location permission was denied */}
      {locationError && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-yellow-800">{locationError}</p>
        </div>
      )}

      {/* Loading state for nearby places */}
      {isLoadingPlaces && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <p className="text-sm font-semibold text-blue-800">Loading nearby places...</p>
        </div>
      )}

      {/* Error state for nearby places */}
      {placesError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-red-800">{placesError}</p>
        </div>
      )}

      {/* Success message when places are loaded */}
      {(showNearbyPlaces || isSOSMode) && !isLoadingPlaces && !placesError && nearbyPlaces.length > 0 && (
        <div className={`mb-4 p-3 rounded-lg ${isSOSMode ? 'bg-red-100 border-2 border-red-300' : 'bg-green-50 border border-green-200'}`}>
          <p className={`text-sm font-semibold ${isSOSMode ? 'text-red-900' : 'text-green-800'}`}>
            {isSOSMode ? (
              <>
                🚨 <strong>Emergency Services Located:</strong> {nearbyPlaces.filter(p => p.type === 'police').length} police stations, {nearbyPlaces.filter(p => p.type === 'hospital').length} hospitals nearby
              </>
            ) : (
              <>
                Found {nearbyPlaces.length} nearby {nearbyPlaces.length === 1 ? 'place' : 'places'}
              </>
            )}
          </p>
        </div>
      )}

      {/* Map Container - Responsive */}
      <div className="w-full rounded-lg overflow-hidden border border-neutral-200" style={{ height: '400px', minHeight: '300px' }}>
        <MapContainer
          center={userLocation}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User Location Marker */}
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="text-center">
                <strong className="text-base">You are here</strong>
                {locationName && (
                  <>
                    <br />
                    <span className="text-sm text-neutral-700 mt-1 block">
                      {locationName}
                    </span>
                  </>
                )}
                <br />
                <span className="text-xs text-neutral-500 mt-1 block">
                  {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                </span>
              </div>
            </Popup>
          </Marker>

          {/* Nearby Places Markers - Highlighted in SOS mode */}
          {nearbyPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.latitude, place.longitude]}
              icon={place.type === 'hospital' ? hospitalIcon : policeIcon}
            >
              <Popup>
                <div className="text-center">
                  <strong className="text-base">{place.name}</strong>
                  <br />
                  <span className="text-xs text-neutral-600 capitalize">
                    {place.type === 'hospital' ? '🏥 Hospital' : '🚓 Police Station'}
                  </span>
                  {isSOSMode && (
                    <>
                      <br />
                      <span className="text-xs font-bold text-red-600 mt-1 block">
                        🚨 Emergency Service
                      </span>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          <MapUpdater center={userLocation} zoom={defaultZoom} />
        </MapContainer>
      </div>

      {/* Location Name Display */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-1">
              Current Location
            </p>
            {isLoadingLocationName ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <p className="text-sm font-semibold text-neutral-600">Loading location name...</p>
              </div>
            ) : locationNameError ? (
              <p className="text-sm font-semibold text-neutral-600">
                {locationNameError}
              </p>
            ) : locationName ? (
              <p className="text-base font-bold text-neutral-900">
                {locationName}
              </p>
            ) : (
              <p className="text-sm font-semibold text-neutral-600">
                Location name not available
              </p>
            )}
          </div>
        </div>
        
        {/* Coordinates */}
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs font-semibold text-neutral-600">
            <span className="text-blue-600">Coordinates:</span>{' '}
            {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
          </p>
          {nearbyPlaces.length > 0 && (
            <p className="text-xs text-neutral-600 mt-1">
              {nearbyPlaces.filter(p => p.type === 'hospital').length} hospitals,{' '}
              {nearbyPlaces.filter(p => p.type === 'police').length} police stations nearby
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationMap
