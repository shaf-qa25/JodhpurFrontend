# JodhpurFrontend
# 112 India - Emergency Services Frontend

A professional React-based frontend application for emergency services in India. This application provides quick access to emergency helplines (Police, Ambulance, Fire) and displays community-reported incidents with verification capabilities.

## 🚀 Features

- **Emergency Services Hero Section**: Quick access buttons for Police (100), Ambulance (108), and Fire (101) services
- **Incident Reporting Feed**: Display of recent incidents reported in the community
- **Incident Verification**: Users can verify incidents as real or report them as fake
- **Responsive Design**: Modern, mobile-first design using Tailwind CSS
- **Backend Integration Ready**: Structured API calls for backend communication

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.jsx              # Navbar with "EMERGENCY" title
│   ├── HeroSection.jsx         # Emergency services hero section
│   ├── ServiceButton.jsx       # Individual service button component
│   ├── ServiceModal.jsx        # Modal for service options (Call/Report)
│   ├── IncidentCard.jsx        # Card component for displaying incidents
│   └── IncidentsSection.jsx    # Section displaying all incident cards
├── constants/
│   └── services.js             # Service configurations (Police, Ambulance, Fire)
├── services/
│   └── api.js                  # API service functions for backend communication
├── utils/
│   ├── serviceHandlers.js      # Handler functions for service actions
│   └── mockData.js             # Mock data for development/testing
├── App.jsx                     # Main application component
└── main.jsx                    # Application entry point
```

## 🔌 API Documentation

This frontend application requires backend API endpoints to function fully. Below are the APIs that need to be implemented on the backend:

### Base URL

All API endpoints should be prefixed with the base URL. Configure the base URL in `src/services/api.js`:

```javascript
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
```

### 1. Get All Incidents

**Endpoint:** `GET /api/incidents`

**Description:** Fetches all reported incidents from the backend.

**Request:**
- Method: `GET`
- Headers: `Content-Type: application/json`
- No request body required

**Response:**
```json
{
  "incidents": [
    {
      "id": "string",
      "description": "string",
      "image": "string (URL)",
      "peopleAffected": "number",
      "location": "string",
      "verificationCount": "number",
      "createdAt": "string (ISO 8601 datetime)",
      "status": "string"
    }
  ]
}
```

**Response Status Codes:**
- `200 OK`: Successfully retrieved incidents
- `500 Internal Server Error`: Server error

**Example Response:**
```json
{
  "incidents": [
    {
      "id": "1",
      "description": "Waterlogging in Sector 5 causing traffic disruption",
      "image": "https://example.com/images/incident1.jpg",
      "peopleAffected": 5,
      "location": "Sector 5, New Delhi",
      "verificationCount": 24,
      "createdAt": "2024-01-15T10:30:00Z",
      "status": "active"
    }
  ]
}
```

---

### 2. Verify Incident (Real)

**Endpoint:** `POST /api/incidents/:incidentId/verify`

**Description:** Marks an incident as verified/real. This endpoint increments the verification count for the incident and sends a notification to the backend. The backend should track how many users have verified the incident.

**Request:**
- Method: `POST`
- Headers: `Content-Type: application/json`
- URL Parameter: `incidentId` (string/number) - The ID of the incident to verify
- Request Body:
```json
{
  "incidentId": "string",
  "timestamp": "string (ISO 8601 datetime)"
}
```

**Request Body Example:**
```json
{
  "incidentId": "1",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Response:**
```json
{
  "success": "boolean",
  "message": "string",
  "incident": {
    "id": "string",
    "verificationCount": "number"
  }
}
```

**Response Status Codes:**
- `200 OK`: Incident verified successfully
- `400 Bad Request`: Invalid request data
- `404 Not Found`: Incident not found
- `500 Internal Server Error`: Server error

**Example Response:**
```json
{
  "success": true,
  "message": "Incident verified successfully",
  "incident": {
    "id": "1",
    "verificationCount": 25
  }
}
```

**Backend Implementation Notes:**
- Backend should increment the verification count for the incident
- Backend should store/log each verification (who verified, when, etc.)
- Backend should send notifications if needed
- Consider implementing rate limiting to prevent spam

---

### 3. Report Incident as Fake

**Endpoint:** `NOT IMPLEMENTED - Frontend Only`

**Description:** Currently, reporting an incident as fake is handled only on the frontend. No API call is made to the backend. If you need backend tracking for fake reports in the future, implement the following endpoint.

**Note:** As per the requirements, when users click the "Report Fake" button, **NO notification is sent to the backend** and **NO update is made**. This is a frontend-only action.

**Future Implementation (Optional):**
If backend tracking is needed later, implement:
- **Endpoint:** `POST /api/incidents/:incidentId/report-fake`
- **Method:** `POST`
- **Request Body:**
```json
{
  "incidentId": "string",
  "timestamp": "string (ISO 8601 datetime)"
}
```

---

## 📊 Data Models

### Incident Object

```typescript
interface Incident {
  id: string | number;              // Unique identifier for the incident
  description: string;               // Description of the incident
  image: string;                     // URL to the incident image
  peopleAffected: number;            // Number of people affected
  location: string;                  // Location of the incident
  verificationCount?: number;        // Number of users who verified it as real
  createdAt: string;                 // ISO 8601 datetime string
  status?: string;                   // Status of the incident (e.g., "active", "resolved")
}
```

---

## 🎨 Frontend Behavior

### Verify Button (Green Button)
- **Action:** Sends POST request to `/api/incidents/:id/verify`
- **Backend Communication:** ✅ Yes - Sends notification and updates verification count
- **User Feedback:** Shows loading state, then success/error message
- **Button State:** Disabled after clicking to prevent duplicate requests

### Report Fake Button (Red Button)
- **Action:** Frontend-only action (no API call)
- **Backend Communication:** ❌ No - No notification sent, no update made
- **User Feedback:** Shows alert message
- **Button State:** Disabled after clicking

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory to configure the API base URL:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## 🧪 Testing with Mock Data

If the backend is not available, you can temporarily use mock data by modifying `src/components/IncidentsSection.jsx`:

```javascript
import { mockIncidents } from '../utils/mockData'

// In the component, replace the API call with:
const data = mockIncidents
```

---

## 📝 Backend Requirements Summary

The backend needs to implement:

1. **GET /api/incidents**
   - Returns array of incident objects
   - Include: id, description, image, peopleAffected, location, verificationCount, createdAt

2. **POST /api/incidents/:id/verify**
   - Accepts incidentId and timestamp
   - Increments verification count
   - Logs/stores verification data
   - Returns updated incident with new verification count

**Important:** The "Report Fake" functionality is **frontend-only** and requires **NO backend endpoint** as per requirements.

---

## 🚦 Development Status

- ✅ Frontend UI Components
- ✅ Service buttons with helpline numbers
- ✅ Incident cards with image, description, location, people affected
- ✅ Verify and Report Fake buttons
- ✅ API service layer structure
- ⏳ Backend integration (requires backend implementation)
- ⏳ User authentication (if needed)
- ⏳ Real-time updates (if needed)

---

## 📄 License

This project is created for the 112 India Emergency Services application.

---

## 👥 Contributing

This is a frontend-only implementation. Backend developers should refer to the API documentation above to implement the required endpoints.
