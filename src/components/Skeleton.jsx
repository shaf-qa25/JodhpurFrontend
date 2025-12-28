// Skeleton Loading Component for better UX
import React from 'react'

const Skeleton = ({ className = '', variant = 'default' }) => {
  const baseClasses = 'animate-pulse bg-neutral-200 rounded'
  
  const variants = {
    default: 'h-4 w-full',
    text: 'h-4 w-3/4',
    title: 'h-6 w-1/2',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-64 w-full',
    button: 'h-10 w-24',
  }

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}></div>
  )
}

// Card Skeleton for incident cards
export const IncidentCardSkeleton = () => {
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-6 animate-pulse">
      {/* Image skeleton */}
      <div className="h-56 bg-neutral-200 rounded-xl mb-6"></div>
      
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
        <div className="h-6 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-200 rounded w-full"></div>
        <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
        
        {/* Buttons skeleton */}
        <div className="flex gap-3 mt-8">
          <div className="h-10 bg-neutral-200 rounded-xl flex-1"></div>
          <div className="h-10 bg-neutral-200 rounded-xl flex-1"></div>
        </div>
      </div>
    </div>
  )
}

export default Skeleton



