import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { getIncidents } from '../services/api'

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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const isFetchingRef = useRef(false) // Prevent duplicate requests

  // Fetch reports function
  const fetchReports = useCallback(async () => {
    // Prevent duplicate requests
    if (isFetchingRef.current) {
      return
    }

    try {
      isFetchingRef.current = true
      setIsLoading(true)
      setError(null)
      const incidents = await getIncidents()
      setReports(incidents)
    } catch (err) {
      console.error('Error fetching reports:', err)
      setError(err.message)
      // Keep empty array on error, don't break the app
      setReports([])
    } finally {
      setIsLoading(false)
      isFetchingRef.current = false
    }
  }, [])

  // Fetch reports from backend on mount only once
  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  const addReport = (report) => {
    const newReport = {
      id: report.id || Date.now(),
      ...report,
      createdAt: report.createdAt || new Date().toISOString(),
      verificationCount: report.verificationCount || 0,
      peopleAffected: report.peopleAffected || 1
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

  // Memoized refresh function to prevent unnecessary re-renders
  const refreshReports = useCallback(async () => {
    // Use the same fetch function to prevent duplicates
    await fetchReports()
  }, [fetchReports])

  return (
    <ReportsContext.Provider value={{ 
      reports, 
      addReport, 
      updateReportVerification, 
      isLoading, 
      error,
      refreshReports 
    }}>
      {children}
    </ReportsContext.Provider>
  )
}

