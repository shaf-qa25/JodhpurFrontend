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
  const images = incident.image 
    ? (Array.isArray(incident.image) ? incident.image : [incident.image])
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
    <div className="bg-white border-2 border-red-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
      {/* Alert Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6" />
          <span className="font-bold text-lg">INCIDENT ALERT</span>
        </div>
        {displayCount > 0 && (
          <div className="bg-white/20 px-3 py-1 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">{displayCount}</span>
          </div>
        )}
      </div>

      {/* Media Section with Slider */}
      <div className="relative h-64 bg-neutral-100 overflow-hidden">
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
      <div className="p-6">
        {/* Incident Type */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-neutral-900 mb-2">
            {incident.type || 'Incident'}
          </h3>
          <p className="text-base text-neutral-700 line-clamp-2">
            {incident.description || 'No description provided'}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-neutral-700 mb-4">
          <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span className="text-base font-semibold">
            {incident.locationName || incident.location || 'Location not specified'}
          </span>
        </div>

        {/* Time and Priority */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">{timeAgo}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${priority.color}`}>
            {priority.label}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Map</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-semibold rounded-lg transition-colors"
          >
            <Info className="w-4 h-4" />
            <span>Details</span>
          </button>
        </div>

        {/* Verify and Report Fake Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleVerify}
            disabled={isVerifying || isReportedFake || hasUserVerified}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              isVerifying || isReportedFake || hasUserVerified
                ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : hasUserVerified ? (
              <>
                <Check className="w-4 h-4" />
                <span>Verified ({displayCount})</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Verify ({displayCount})</span>
              </>
            )}
          </button>

          <button
            onClick={handleReportFake}
            disabled={isVerifying || isReportedFake || hasUserVerified}
            className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              isVerifying || isReportedFake || hasUserVerified
                ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isReportedFake ? (
              <>
                <Check className="w-4 h-4" />
                <span>Reported</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
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
