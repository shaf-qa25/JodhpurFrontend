import React from 'react'
import { CheckCircle2, History, Clock, UserCheck } from 'lucide-react'

const StatusTimeline = ({ status = 'reported', isActive = false }) => {
  if (!isActive) {
    return null
  }

  const steps = [
    { 
      id: 'reported', 
      label: 'Reported', 
      completed: status !== 'reported',
      icon: CheckCircle2,
      description: 'Emergency alert sent'
    },
    { 
      id: 'processing', 
      label: 'Processing', 
      completed: status === 'processing' || status === 'officer-assigned',
      icon: Clock,
      description: 'Locating nearest services'
    },
    { 
      id: 'officer-assigned', 
      label: 'Officer Assigned', 
      completed: status === 'officer-assigned',
      icon: UserCheck,
      description: 'Help is on the way'
    },
  ]

  const currentStepIndex = steps.findIndex(step => !step.completed)
  const activeStep = currentStepIndex === -1 ? steps[steps.length - 1] : steps[currentStepIndex]

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl shadow-lg p-6 animate-pulse-slow">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600 rounded-full p-2">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-red-900">Emergency Active</h2>
      </div>
      
      {/* Timeline */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          const isCurrent = step.id === activeStep.id && !step.completed
          
          return (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex-shrink-0 relative">
                {step.completed ? (
                  <div className="bg-green-600 rounded-full p-2">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="bg-red-600 rounded-full p-2 animate-pulse">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="bg-neutral-300 rounded-full p-2">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                )}
                {index < steps.length - 1 && (
                  <div className={`absolute left-1/2 top-8 w-0.5 h-8 -translate-x-1/2 ${
                    step.completed ? 'bg-green-600' : 'bg-neutral-300'
                  }`} />
                )}
              </div>
              <div className="flex-1 pt-1">
                <div
                  className={`text-base font-bold mb-1 ${
                    step.completed 
                      ? 'text-green-700' 
                      : isCurrent 
                        ? 'text-red-700' 
                        : 'text-neutral-400'
                    }`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-neutral-600 font-semibold">
                  {step.description}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Emergency Contact Info */}
      <div className="mt-6 pt-4 border-t border-red-200">
        <div className="bg-white rounded-lg p-3">
          <p className="text-xs font-semibold text-neutral-700 mb-1">
            Emergency Services: <span className="text-red-600 font-bold">112</span>
          </p>
          <p className="text-xs text-neutral-600">
            Help is being dispatched to your location
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatusTimeline
