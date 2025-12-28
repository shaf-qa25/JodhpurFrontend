// import React, { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import { ReportsProvider } from './context/ReportsContext'
// import { SOSProvider } from './context/SOSContext'
// import Header from './components/Header'
// import BottomNav from './components/BottomNav'
// import LandingPage from './pages/LandingPage'
// import HomePage from './pages/HomePage'
// import ReportsPage from './pages/ReportsPage'

// const App = () => {
//   const [selectedService, setSelectedService] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedIncidentType, setSelectedIncidentType] = useState('')
//   const [userLocation, setUserLocation] = useState(null)

//   const handleMenuClick = () => {
//     // Menu functionality can be added later
//     alert('Menu coming soon!')
//   }

//   return (
//     <ReportsProvider>
//       <SOSProvider>
//         <Router>
//           <Routes>
//             {/* Landing Page - First route */}
//             <Route path="/" element={<LandingPage />} />
            
//             {/* Main App Routes */}
//             <Route 
//               path="/home" 
//               element={
//                 <div className="min-h-screen bg-neutral-50">
//                   <Header onMenuClick={handleMenuClick} />
//                   <HomePage
//                     selectedService={selectedService}
//                     setSelectedService={setSelectedService}
//                     showModal={showModal}
//                     setShowModal={setShowModal}
//                     selectedIncidentType={selectedIncidentType}
//                     setSelectedIncidentType={setSelectedIncidentType}
//                     userLocation={userLocation}
//                     setUserLocation={setUserLocation}
//                   />
//                   <BottomNav />
//                 </div>
//               } 
//             />
//             <Route 
//               path="/reports" 
//               element={
//                 <div className="min-h-screen bg-neutral-50">
//                   <Header onMenuClick={handleMenuClick} />
//                   <ReportsPage />
//                   <BottomNav />
//                 </div>
//               } 
//             />
//           </Routes>
//         </Router>
//       </SOSProvider>
//     </ReportsProvider>
//   )
// }

// export default App



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers (Sabko wrap karna hoga)
import { ReportsProvider } from './context/ReportsContext';
import { SOSProvider } from './context/SOSContext';
import { IncidentProvider } from './context/IncidentContext';

// Tera Admin Side ka Imports
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Login from "./pages/Login"; 
import 'leaflet/dist/leaflet.css';

// Nikhil ka User Side ka Imports
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';

// Protected Route Logic
const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  // Nikhil ki states
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncidentType, setSelectedIncidentType] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const handleMenuClick = () => {
    alert('Menu coming soon!');
  };

  return (
    <IncidentProvider>
      <ReportsProvider>
        <SOSProvider>
          <Router>
            <Routes>
              {/* --- NIKHIL'S USER ROUTES --- */}
              <Route path="/" element={<LandingPage />} />
              
              <Route 
                path="/home" 
                element={
                  <div className="min-h-screen bg-neutral-50">
                    <Header onMenuClick={handleMenuClick} />
                    <HomePage
                      selectedService={selectedService}
                      setSelectedService={setSelectedService}
                      showModal={showModal}
                      setShowModal={setShowModal}
                      selectedIncidentType={selectedIncidentType}
                      setSelectedIncidentType={setSelectedIncidentType}
                      userLocation={userLocation}
                      setUserLocation={setUserLocation}
                    />
                    <BottomNav />
                  </div>
                } 
              />
              
              <Route 
                path="/reports" 
                element={
                  <div className="min-h-screen bg-neutral-50">
                    <Header onMenuClick={handleMenuClick} />
                    <ReportsPage />
                    <BottomNav />
                  </div>
                } 
              />

              {/* --- SHAFQA'S ADMIN ROUTES --- */}
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Home />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </SOSProvider>
      </ReportsProvider>
    </IncidentProvider>
  );
};

export default App;