import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReports } from '../context/ReportsContext'
import IncidentCard from '../components/IncidentCard'
import { Loader2 } from 'lucide-react'

const ReportsPage = () => {
  const { reports, updateReportVerification, isLoading, error, refreshReports } = useReports()
  const [selectedIncidentType, setSelectedIncidentType] = useState('')
  const navigate = useNavigate()

  // Don't fetch here - ReportsContext already fetches on mount
  // Only refresh manually when needed (e.g., after form submission)

  const handleVerifyUpdate = (reportId, count) => {
    updateReportVerification(reportId, count)
  }

  const handleIncidentTypeSelect = (type) => {
    setSelectedIncidentType(type)
  }

  const handleSOSClick = () => {
    // Navigate to home page where SOS functionality is available
    navigate('/')
  }

  // Filter reports by incident type if selected
  const filteredReports = selectedIncidentType
    ? reports.filter(report => report.type === selectedIncidentType)
    : reports

  return (
    <>
      {/* Mobile Layout */}
      <div className="phone-container mobile-only">
        <div className="p-5">
          <div className="mb-6">
            <h1 className="section-heading mb-2">
              All Submitted Reports
            </h1>
            <p className="text-sm text-neutral-600">
              {isLoading 
                ? 'Loading reports...'
                : filteredReports.length === 0 
                  ? 'No reports found. Be the first to report an incident!'
                  : `Showing ${filteredReports.length} ${filteredReports.length === 1 ? 'report' : 'reports'}`
              }
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-semibold">
                Error loading reports: {error}
              </p>
              <button
                onClick={refreshReports}
                className="mt-2 px-4 py-2  text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-base text-neutral-500">Loading reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 text-center">
              <p className="text-base text-neutral-500">
                {selectedIncidentType 
                  ? `No ${selectedIncidentType} reports found.`
                  : 'No reports have been submitted yet. Submit a report to see it here!'
                }
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredReports.map((report) => (
                <div key={report.id} className="flex-[1_1_300px] min-w-[280px] max-w-full">
                  <IncidentCard
                    incident={report}
                    onVerifyUpdate={handleVerifyUpdate}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="desktop-only">
        <div className="p-5 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              All Submitted Reports
            </h1>
            <p className="text-base text-neutral-600">
              {isLoading 
                ? 'Loading reports...'
                : filteredReports.length === 0 
                  ? 'No reports found. Be the first to report an incident!'
                  : `Showing ${filteredReports.length} ${filteredReports.length === 1 ? 'report' : 'reports'}`
              }
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-semibold">
                Error loading reports: {error}
              </p>
              <button
                onClick={refreshReports}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-base text-neutral-500">Loading reports...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-8 text-center">
              <p className="text-base text-neutral-500">
                {selectedIncidentType 
                  ? `No ${selectedIncidentType} reports found.`
                  : 'No reports have been submitted yet. Submit a report to see it here!'
                }
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6">
              {filteredReports.map((report) => (
                <div key={report.id} className="flex-[1_1_350px] min-w-[320px] max-w-[450px]">
                  <IncidentCard
                    incident={report}
                    onVerifyUpdate={handleVerifyUpdate}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReportsPage

