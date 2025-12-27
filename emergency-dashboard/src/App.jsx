import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IncidentProvider } from "./context/IncidentContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import 'leaflet/dist/leaflet.css';
function App() {
  return (
    <IncidentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IncidentProvider>
  );
}

export default App;