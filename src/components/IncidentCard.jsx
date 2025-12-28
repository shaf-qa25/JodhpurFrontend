import React, { useState } from 'react'
import { MapPin, CheckCircle, X, Camera, Loader2, Check, AlertCircle, Clock, ChevronLeft, ChevronRight, ExternalLink, Info } from 'lucide-react'
import { getTimeAgo } from '../utils/timeAgo'

const IncidentCard = ({ incident, onVerifyUpdate }) => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isReportedFake, setIsReportedFake] = useState(false)
  const [localVerificationCount, setLocalVerificationCount] = useState(incident.verificationCount || 0)
  const [hasUserVerified, setHasUserVerified] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Handle multiple images - convert single image to array
  // Support both frontend format (image) and backend format (mediaUrl)
  const imageUrl = incident.image || incident.mediaUrl
  const images = imageUrl 
    ? (Array.isArray(imageUrl) ? imageUrl : [imageUrl])
    : []

  const handleVerify = async () => {
    if (isVerifying || isReportedFake || hasUserVerified) return

    setIsVerifying(true)
    try {
      // Update local count immediately for better UX
      const newCount = localVerificationCount + 1
      setLocalVerificationCount(newCount)
      setHasUserVerified(true)
      
      // Notify parent component if callback provided
      if (onVerifyUpdate) {
        onVerifyUpdate(incident.id, newCount)
      }
    } catch (error) {
      console.error('Error verifying incident:', error)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleReportFake = () => {
    if (isVerifying || isReportedFake || hasUserVerified) return
    setIsReportedFake(true)
    alert('Thank you for your feedback. This incident has been flagged.')
  }

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  // Determine priority based on people affected
  const getPriority = () => {
    const affected = incident.peopleAffected || 1
    if (affected >= 10) return { label: 'Critical', color: 'bg-red-600 text-white' }
    if (affected >= 5) return { label: 'High', color: 'bg-orange-600 text-white' }
    if (affected >= 2) return { label: 'Medium', color: 'bg-yellow-600 text-white' }
    return { label: 'Low', color: 'bg-green-600 text-white' }
  }

  const priority = getPriority()
  const timeAgo = getTimeAgo(incident.createdAt)
  const displayCount = localVerificationCount

  return (
    <div className="bg-white   shadow-md overflow-hidden transition-all">
      {/* Alert Header */}
      <div className=" text-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span className="font-bold text-sm">INCIDENT ALERT</span>
        </div>
        {displayCount > 0 && (
          <div className="bg-white/20 px-2 py-1 rounded-lg flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs font-semibold">{displayCount}</span>
          </div>
        )}
      </div>

      {/* Media Section with Slider */}
      <div className="relative h-48 bg-neutral-100 overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={incident.description}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available'
              }}
            />
            
            {/* Navigation Arrows - Only show if more than one image */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 bg-neutral-100">
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <span className="text-sm">No Image Available</span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Incident Type */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-neutral-900 mb-1">
            {incident.type || 'Incident'}
          </h3>
          <p className="text-sm text-neutral-700 line-clamp-2">
            {incident.description || 'No description provided'}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-neutral-700 mb-3">
          <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="text-sm font-semibold">
            {incident.locationName || incident.location || 'Location not specified'}
          </span>
        </div>

        {/* Time and Priority */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-600">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-semibold">{timeAgo}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${priority.color}`}>
            {priority.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-3">
          <button
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold m-4 transition-colors text-xs"
          >
            <ExternalLink className="w-3 h-3" />
            <span>View on Map</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold  transition-colors text-xs"
          >
            <Info className="w-3 h-3" />
            <span>Details</span>
          </button>
        </div>

        {/* Verify and Report Fake Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleVerify}
            disabled={isVerifying || isReportedFake || hasUserVerified}
            className={`flex-1 py-2 px-3  font-bold text-xs transition-all flex items-center justify-center gap-1 ${
              isVerifying || isReportedFake || hasUserVerified
                ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : hasUserVerified ? (
              <>
                <Check className="w-3 h-3" />
                <span>Verified ({displayCount})</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                <span>Verify ({displayCount})</span>
              </>
            )}
          </button>

          <button
            onClick={handleReportFake}
            disabled={isVerifying || isReportedFake || hasUserVerified}
            className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1 ${
              isVerifying || isReportedFake || hasUserVerified
                ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-300 text-white shadow-sm hover:shadow-md'
            }`}
          >
            {isReportedFake ? (
              <>
                <Check className="w-3 h-3" />
                <span>Reported</span>
              </>
            ) : (
              <>
                <X className="w-3 h-3" />
                <span>Fake News</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncidentCard
