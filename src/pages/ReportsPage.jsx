import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReports } from '../context/ReportsContext'
import IncidentCard from '../components/IncidentCard'
import Sidebar from '../components/Sidebar'

const ReportsPage = () => {
  const { reports, updateReportVerification } = useReports()
  const [selectedIncidentType, setSelectedIncidentType] = useState('')
  const navigate = useNavigate()

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

  return (
    <div className="flex w-full min-h-screen bg-neutral-50">
      {/* Left Sidebar */}
      <div className='w-[20%] m-7'>
        <Sidebar 
          onIncidentTypeSelect={handleIncidentTypeSelect}
          selectedIncidentType={selectedIncidentType}
          onSOSClick={handleSOSClick}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            All Submitted Reports
          </h1>
          <p className="text-neutral-600">
            {reports.length === 0 
              ? 'No reports submitted yet. Be the first to report an incident!'
              : `Showing ${reports.length} ${reports.length === 1 ? 'report' : 'reports'}`
            }
          </p>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-12 text-center">
            <p className="text-lg text-neutral-500">
              No reports have been submitted yet. Submit a report to see it here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reports.map((report) => (
              <IncidentCard
                key={report.id}
                incident={report}
                onVerifyUpdate={handleVerifyUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportsPage

