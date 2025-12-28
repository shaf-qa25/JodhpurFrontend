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

// Providers
import { ReportsProvider } from './context/ReportsContext';
import { SOSProvider } from './context/SOSContext';
import { IncidentProvider } from './context/IncidentContext';

// Admin Side Imports
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import 'leaflet/dist/leaflet.css';

// User Side Imports
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ReportsPage from './pages/ReportsPage';

const App = () => {
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
              {/* Har user route ko 'user-theme' class mein wrap kiya hai */}
              <Route path="/" element={<div className="user-theme"><LandingPage /></div>} />
              
              <Route 
                path="/home" 
                element={
                  <div className="user-theme">
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
                  </div>
                } 
              />
              
              <Route 
                path="/reports" 
                element={
                  <div className="user-theme">
                    <div className="min-h-screen bg-neutral-50">
                      <Header onMenuClick={handleMenuClick} />
                      <ReportsPage />
                      <BottomNav />
                    </div>
                  </div>
                } 
              />

              {/* --- SHAFQA'S ADMIN ROUTES --- */}
              {/* Ye dashboard tera original style hi rakhega */}
              <Route path="/admin" element={<DashboardLayout />}>
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