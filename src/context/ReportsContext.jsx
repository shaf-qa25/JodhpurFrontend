import React, { createContext, useContext, useState } from 'react'

const ReportsContext = createContext()

export const useReports = () => {
  const context = useContext(ReportsContext)
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider')
  }
  return context
}

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([])

  const addReport = (report) => {
    const newReport = {
      id: Date.now(), // Simple ID generation
      ...report,
      createdAt: new Date().toISOString(),
      verificationCount: 0,
      peopleAffected: report.peopleAffected || 1 // Use provided value or default to 1
    }
    setReports(prevReports => [newReport, ...prevReports])
    return newReport
  }

  const updateReportVerification = (reportId, count) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId
          ? { ...report, verificationCount: count }
          : report
      )
    )
  }

  return (
    <ReportsContext.Provider value={{ reports, addReport, updateReportVerification }}>
      {children}
    </ReportsContext.Provider>
  )
}

