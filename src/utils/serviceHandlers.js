// Handler functions for service actions

/**
 * Initiates a direct call to the emergency service
 * @param {string} serviceNumber - The phone number to call
 * @param {Function} closeModal - Function to close the modal after call
 */
export const handleDirectCall = (serviceNumber, closeModal) => {
  // Create a tel: link to initiate phone call
  window.location.href = `tel:${serviceNumber}`
  // Close modal after a brief delay (200ms transition)
  setTimeout(() => {
    closeModal()
  }, 200)
}

/**
 * Handles the report incident action
 * @param {string} serviceName - Name of the service being reported to
 * @param {Function} closeModal - Function to close the modal after report
 */
export const handleReport = (serviceName, closeModal) => {
  // You can navigate to a report page or show a form
  // For now, we'll show an alert and could navigate later
  alert(`Reporting incident to ${serviceName}. Redirecting to report form...`)
  // In a real app, you would navigate: navigate(`/report/${serviceName}`)
  closeModal()
}
