"use client"

import { useState } from "react"
import { Search, User, TrendingUp, Target, Truck, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminActionModal } from "@/components/admin-action-modal"

const mockIncidents = [
  {
    id: "1",
    caller: "Amit S. (98xxxxx)",
    type: "Police",
    location: "Sector 18 Noida",
    severity: "High",
    status: "New",
    coordinates: { lat: 28.5706, lng: 77.3272 },
  },
  {
    id: "2",
    caller: "Rajesh K.",
    type: "Medical",
    location: "MG Road",
    severity: "Critical",
    status: "New",
    coordinates: { lat: 28.6315, lng: 77.2167 },
  },
  {
    id: "3",
    caller: "Priya K. (91xxxxxx)",
    type: "Medical",
    location: "Lajpat Nagar",
    severity: "Medium",
    status: "In Progress",
    coordinates: { lat: 28.5677, lng: 77.2431 },
  },
  {
    id: "4",
    caller: "Vikram M.",
    type: "Fire",
    location: "Lajpat Nagar",
    severity: "High",
    status: "In Progress",
    coordinates: { lat: 28.5677, lng: 77.2431 },
  },
  {
    id: "5",
    caller: "Neha P.",
    type: "Fire",
    location: "Connagut Place",
    severity: "Low",
    status: "Resolved",
    coordinates: { lat: 28.6315, lng: 77.2167 },
  },
  {
    id: "6",
    caller: "Suresh T.",
    type: "Fire",
    location: "Fire Dept",
    severity: "Low",
    status: "Resolved",
    coordinates: { lat: 28.6139, lng: 77.209 },
  },
]

export default function EmergencyDashboard() {
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [incidents, setIncidents] = useState(mockIncidents)
  const [searchQuery, setSearchQuery] = useState("")

  const totalAlerts = incidents.length
  const pendingAlerts = incidents.filter((i) => i.status === "New").length
  const dispatchedAlerts = incidents.filter((i) => i.status === "In Progress").length
  const resolvedAlerts = incidents.filter((i) => i.status === "Resolved").length

  const handleSaveIncident = (id, updates) => {
    setIncidents((prev) => prev.map((incident) => (incident.id === id ? { ...incident, ...updates } : incident)))
  }

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.caller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Top Bar */}
      <header className="mb-6 rounded-lg bg-white px-6 py-4 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">112 India Admin</h1>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[280px] bg-gray-50 border-gray-300"
              />
            </div>
            <Button size="icon" variant="ghost" className="shrink-0 rounded-full bg-gray-300 hover:bg-gray-400">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-md border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Total Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-gray-900">{totalAlerts}</div>
              <div className="rounded-full bg-blue-100 p-3">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-red-600">{pendingAlerts}</div>
              <div className="rounded-full bg-red-100 p-3">
                <Target className="h-7 w-7 text-red-600 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Dispatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-yellow-600">{dispatchedAlerts}</div>
              <div className="rounded-full bg-yellow-100 p-3">
                <Truck className="h-7 w-7 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-green-600">{resolvedAlerts}</div>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[70%_30%]">
        {/* Live Incident Table */}
        <Card className="bg-white shadow-md border-0">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Live Incident Table
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 uppercase tracking-wide text-xs">
                      Caller
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 uppercase tracking-wide text-xs">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 uppercase tracking-wide text-xs">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 uppercase tracking-wide text-xs">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-gray-800 uppercase tracking-wide text-xs">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredIncidents.map((incident) => (
                    <tr key={incident.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium flex items-center gap-2">
                        {incident.type === "Police" && <span className="text-blue-600 text-lg">👮</span>}
                        {incident.type === "Medical" && <span className="text-red-600 text-lg">🏥</span>}
                        {incident.type === "Fire" && <span className="text-orange-600 text-lg">🔥</span>}
                        {incident.caller}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={
                            incident.type === "Police"
                              ? "bg-blue-50 text-blue-700 border-blue-200 font-medium"
                              : incident.type === "Medical"
                                ? "bg-red-50 text-red-700 border-red-200 font-medium"
                                : "bg-orange-50 text-orange-700 border-orange-200 font-medium"
                          }
                        >
                          {incident.type === "Police" && "🔵 "}
                          {incident.type === "Medical" && "🔴 "}
                          {incident.type === "Fire" && "🟠 "}
                          {incident.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{incident.location}</td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={
                            incident.status === "New"
                              ? "bg-red-50 text-red-700 border-red-300 font-semibold"
                              : incident.status === "In Progress"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-300 font-semibold"
                                : "bg-green-50 text-green-700 border-green-300 font-semibold"
                          }
                        >
                          {incident.status === "New" && "NEW"}
                          {incident.status === "In Progress" && "PENDING"}
                          {incident.status === "Resolved" && "RESOLVED"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          size="sm"
                          onClick={() => setSelectedIncident(incident)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase text-xs px-5"
                        >
                          Assign
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Map Section */}
        <Card className="bg-white shadow-md border-0 h-fit">
          <CardHeader className="border-b border-gray-200 bg-gray-50">
            <CardTitle className="text-sm font-bold text-gray-900 uppercase tracking-wide">Map Section</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-6xl">📍</div>
                  <p className="text-sm font-semibold text-gray-800 bg-white px-3 py-1 rounded shadow-sm">
                    Current Incident
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Action Modal */}
      {selectedIncident && (
        <AdminActionModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onSave={handleSaveIncident}
        />
      )}
    </div>
  )
}
