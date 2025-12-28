# 1112 INDIA - Complete UI/UX Analysis & Documentation
## Project Structure & Component Analysis for UI Redesign

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Application Architecture](#2-application-architecture)
3. [Page-by-Page Analysis](#3-page-by-page-analysis)
4. [Component Breakdown](#4-component-breakdown)
5. [Libraries & Icons Used](#5-libraries--icons-used)
6. [Layout Structure & Spacing](#6-layout-structure--spacing)
7. [Color Scheme & Design System](#7-color-scheme--design-system)
8. [Function Mapping](#8-function-mapping)

---

## 1. PROJECT OVERVIEW

**Project Name:** 1112 INDIA  
**Framework:** React 19.2.0  
**Build Tool:** Vite 7.2.4  
**Styling:** Tailwind CSS 4.1.18  
**Routing:** React Router DOM 7.11.0

**Main Features:**
- Emergency SOS System
- Incident Reporting
- Location Mapping (Leaflet/OpenStreetMap)
- Nearby Services Finder
- Community Reports Feed
- Real-time Status Tracking

---

## 2. APPLICATION ARCHITECTURE

### 2.1 File Structure
```
src/
├── App.jsx                    # Main app wrapper with providers
├── main.jsx                    # Entry point
├── index.css                  # Global styles
├── pages/
│   ├── HomePage.jsx          # Main landing page
│   └── ReportsPage.jsx       # All reports display page
├── components/
│   ├── Header.jsx            # Top navigation bar
│   ├── Sidebar.jsx           # Left sidebar with SOS & incident types
│   ├── ReportIncident.jsx    # Incident reporting form
│   ├── LocationMap.jsx       # Leaflet map component
│   ├── IncidentCard.jsx      # Report card component
│   ├── StatusTimeline.jsx    # SOS status tracker
│   ├── SOSModal.jsx          # Emergency countdown modal
│   ├── ServiceModal.jsx      # Service selection modal
│   └── [Other components]
├── context/
│   ├── ReportsContext.jsx    # Reports state management
│   └── SOSContext.jsx        # SOS state management
├── constants/
│   └── services.js           # Service configurations
└── utils/
    └── timeAgo.js            # Time calculation utility
```

### 2.2 Context Providers Hierarchy
```
App
└── ReportsProvider
    └── SOSProvider
        └── Router
            └── Routes
```

---

## 3. PAGE-BY-PAGE ANALYSIS

### 3.1 HOMEPAGE (`src/pages/HomePage.jsx`)

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Sticky, Full Width)                                 │
├──────────┬───────────────────────────────────┬─────────────┤
│          │                                   │             │
│ SIDEBAR  │  MAIN CONTENT AREA                │  MAP ASIDE  │
│ (20%     │  (Flex-1)                         │  (w-96)     │
│ width,   │                                   │             │
│ m-7)     │  ┌─────────────────────────────┐ │             │
│          │  │ Find Nearest Services Button │ │             │
│          │  └─────────────────────────────┘ │             │
│          │                                   │             │
│          │  [Status Timeline - if SOS active]│             │
│          │                                   │             │
│          │  ┌─────────────────────────────┐ │             │
│          │  │ Report Incident Form        │ │             │
│          │  └─────────────────────────────┘ │             │
│          │                                   │             │
└──────────┴───────────────────────────────────┴─────────────┘
```

#### Div Structure:
- **Main Container:** `div.flex.w-full` (1 div)
- **Sidebar Container:** `div.w-[20%].m-7` (1 div)
- **Content Wrapper:** `div.flex-1.flex` (1 div)
- **Main Content:** `main.flex-1.p-4.lg:p-6.min-w-0` (1 div)
  - Button Section: `div.mb-8.mt-8` (1 div)
  - Status Timeline: `div.mb-8.mt-8` (conditional, 1 div)
  - Report Form: `div.mt-12` (1 div)
- **Map Aside:** `aside.w-96.p-4.lg:p-6.border-l` (1 div)

**Total Divs:** ~6-7 main containers

#### Spacing:
- Sidebar margin: `m-7` (1.75rem = 28px all sides)
- Main content padding: `p-4 lg:p-6` (16px/24px)
- Button section: `mb-8 mt-8` (32px top/bottom)
- Report form: `mt-12` (48px top)
- Map aside padding: `p-4 lg:p-6` (16px/24px)

#### Functions Used:
1. `handleServiceClick(serviceKey)` - Opens service modal
2. `closeModal()` - Closes service modal
3. `getSelectedServiceData()` - Gets service data
4. `handleIncidentTypeSelect(type)` - Sets incident type
5. `handleLocationUpdate(coords)` - Updates user location
6. `handleFindNearestServices()` - Triggers nearby places search
7. `handleSOSClick()` - Opens SOS modal
8. `handleSOSConfirm()` - Activates SOS emergency
9. `handleSOSCancel()` - Cancels SOS

#### Icons Used (Lucide React):
- `Building2` - Services button
- `Navigation` - Services button
- `Search` - Services button

---

### 3.2 REPORTS PAGE (`src/pages/ReportsPage.jsx`)

#### Layout Structure:
```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Sticky, Full Width)                                 │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│ SIDEBAR  │  MAIN CONTENT AREA                              │
│ (20%     │                                                  │
│ width,   │  ┌──────────────────────────────────────────┐  │
│ m-7)     │  │ Page Title & Description                 │  │
│          │  └──────────────────────────────────────────┘  │
│          │                                                  │
│          │  ┌──────┐ ┌──────┐ ┌──────┐                   │
│          │  │Card 1│ │Card 2│ │Card 3│  (Grid Layout)     │
│          │  └──────┘ └──────┘ └──────┘                   │
│          │  ┌──────┐ ┌──────┐ ┌──────┐                   │
│          │  │Card 4│ │Card 5│ │Card 6│                   │
│          │  └──────┘ └──────┘ └──────┘                   │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘
```

#### Div Structure:
- **Main Container:** `div.flex.w-full.min-h-screen` (1 div)
- **Sidebar Container:** `div.w-[20%].m-7` (1 div)
- **Content Area:** `div.flex-1.p-4.lg:p-6` (1 div)
  - Header Section: `div.mb-8` (1 div)
  - Empty State: `div.bg-white.border.rounded-2xl.p-12` (conditional, 1 div)
  - Grid Container: `div.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-2.xl:grid-cols-3.gap-6` (1 div)
    - Each IncidentCard (multiple)

**Total Divs:** ~4-5 main containers + N cards

#### Spacing:
- Sidebar margin: `m-7` (28px)
- Content padding: `p-4 lg:p-6` (16px/24px)
- Header margin: `mb-8` (32px)
- Grid gap: `gap-6` (24px)

#### Functions Used:
1. `handleVerifyUpdate(reportId, count)` - Updates verification count
2. `handleIncidentTypeSelect(type)` - Sets incident type
3. `handleSOSClick()` - Navigates to home for SOS

---

## 4. COMPONENT BREAKDOWN

### 4.1 HEADER (`src/components/Header.jsx`)

#### Structure:
- **Container:** `header.bg-white.shadow-sm.sticky.top-0.z-40`
- **Inner Container:** `div.max-w-full.mx-auto.px-4.py-4`
- **Content:** `div.flex.items-center.justify-between`
  - Left: Logo + Navigation links
  - Right: User info + Online status

#### Divs: 3 levels
#### Spacing: `px-4 py-4` (16px)

#### Icons Used:
- `CheckCircle2` - Online status indicator
- `Home` - Home navigation
- `FileText` - Reports navigation

#### Functions:
- Uses `useLocation()` from react-router-dom for active link highlighting

---

### 4.2 SIDEBAR (`src/components/Sidebar.jsx`)

#### Structure:
```
┌─────────────────────┐
│ SOS EMERGENCY BTN   │  (Red gradient, mb-6)
│ [Tap in emergency]  │
├─────────────────────┤
│                     │
│ Incident Types      │
│ ┌───┐ ┌───┐        │
│ │ P │ │ A │        │  (Grid: 2 columns)
│ └───┘ └───┘        │
│ ┌───┐ ┌───┐        │
│ │ F │ │ P │        │
│ └───┘ └───┘        │
│ ... (11 types)     │
│                     │
└─────────────────────┘
```

#### Divs:
- **Container:** `aside.w-full.lg:w-64.bg-white.border-r`
- **Inner:** `div.p-4`
- **SOS Section:** `div.mb-6` (1 div)
  - Button: `button.w-full.bg-gradient-to-r...`
  - Helper text: `p.text-xs`
- **Incident Types:** `div` (1 div)
  - Title: `h3.text-xs`
  - Grid: `div.grid.grid-cols-2.gap-3` (1 div)
    - Each type button: `button` (11 buttons)

**Total Divs:** ~5-6 containers

#### Spacing:
- Container padding: `p-4` (16px)
- SOS section margin: `mb-6` (24px)
- Grid gap: `gap-3` (12px)
- Button padding: `p-4` (16px)

#### Icons Used (11 types):
1. `Shield` - Police, Crime
2. `Ambulance` - Ambulance
3. `Flame` - Fire
4. `Car` - Pelos
5. `AlertTriangle` - Accident
6. `Heart` - Medical Emergency
7. `Cloud` - Natural Disaster
8. `TrafficCone` - Traffic Issue
9. `Wrench` - Utility Problem
10. `MoreHorizontal` - Other
11. `Phone` - SOS Button

#### Functions:
- `onIncidentTypeSelect(type)` - Called on type click
- `onSOSClick()` - Called on SOS button click

---

### 4.3 REPORT INCIDENT FORM (`src/components/ReportIncident.jsx`)

#### Structure:
```
┌─────────────────────────────────────┐
│ Report Incident (Title)              │  (mb-10)
├─────────────────────────────────────┤
│                                     │
│ Incident Type (Select)              │  (space-y-8)
│                                     │
│ Description (Textarea, 6 rows)      │
│                                     │
│ Number of People Affected (Input)   │
│ [Users icon]                        │
│                                     │
│ [Get Location] [Upload Photo]      │  (flex gap-4)
│                                     │
│ [Submit Report Button]              │
│                                     │
└─────────────────────────────────────┘
```

#### Divs:
- **Container:** `div.bg-white.border.rounded-2xl.shadow-sm.p-10.lg:p-12`
- **Form:** `form.space-y-8`
  - Incident Type: `div` (1 div)
  - Description: `div` (1 div)
  - People Affected: `div` (1 div)
    - Input wrapper: `div.relative` (1 div)
    - Icon: `div.absolute` (1 div)
    - Helper text: `p.text-xs` (1 div)
  - Location/Upload: `div.flex.gap-4` (1 div)
  - Submit: `button` (1 button)

**Total Divs:** ~8-9 containers

#### Spacing:
- Container padding: `p-10 lg:p-12` (40px/48px)
- Title margin: `mb-10` (40px)
- Form spacing: `space-y-8` (32px between fields)
- Location/Upload gap: `gap-4` (16px)

#### Icons Used:
- `MapPin` - Location button
- `Upload` - Upload button
- `Send` - Submit button
- `Users` - People affected input

#### Functions:
1. `reverseGeocode(lat, lng)` - Gets location name from coordinates
2. `handleGetLocation()` - Gets current GPS location
3. `handleFileUpload(e)` - Handles file selection
4. `handleSubmit(e)` - Submits form and creates report

---

### 4.4 LOCATION MAP (`src/components/LocationMap.jsx`)

#### Structure:
```
┌─────────────────────────────────────┐
│ Your Location (Title)               │
├─────────────────────────────────────┤
│ [Error/Loading Messages]            │  (conditional)
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                   │ │
│ │      LEAFLET MAP                  │ │  (400px height)
│ │      (OpenStreetMap)              │ │
│ │                                   │ │
│ │  [User Marker] [Hospital] [Police]│ │
│ │                                   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Current Location Card               │
│ [Location Name]                     │
│ Coordinates: lat, lng               │
│                                     │
└─────────────────────────────────────┘
```

#### Divs:
- **Container:** `div.rounded-2xl.shadow-sm.p-6` (conditional classes for SOS)
- **SOS Alert:** `div.mb-4.p-4.bg-red-600` (conditional, 1 div)
- **Title:** `h3.text-lg.font-bold.mb-4` (1 div)
- **Error Messages:** Multiple conditional divs (3-4 divs)
- **Map Container:** `div.w-full.rounded-lg.border` (1 div)
  - MapContainer (Leaflet): 1 component
    - TileLayer: 1 component
    - User Marker: 1 component
    - Nearby Places Markers: N components
    - MapUpdater: 1 component
- **Location Display:** `div.mt-4.p-4.bg-gradient-to-r` (1 div)
  - Location info: `div.flex.items-start.gap-3` (1 div)
  - Coordinates: `div.mt-3.pt-3.border-t` (1 div)

**Total Divs:** ~10-12 containers

#### Spacing:
- Container padding: `p-6` (24px)
- Map height: `400px` (fixed)
- Location card margin: `mt-4` (16px)
- Location card padding: `p-4` (16px)

#### Libraries Used:
- **react-leaflet** - Map components
- **leaflet** - Map library
- **OpenStreetMap** - Tile provider

#### Icons Used:
- `MapPin` - Location indicator
- `AlertCircle` - Error/warning
- `Loader2` - Loading spinner

#### Functions:
1. `reverseGeocode(lat, lng)` - Gets address from coordinates
2. `formatAddress(data)` - Formats address string
3. `fetchNearbyPlaces(lat, lng, radius)` - Gets hospitals/police
4. `createCustomIcon(color, type)` - Creates map markers

---

### 4.5 INCIDENT CARD (`src/components/IncidentCard.jsx`)

#### Structure:
```
┌─────────────────────────────────────┐
│ 🔴 INCIDENT ALERT          [Count]  │  (Red gradient header)
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │                                   │ │
│ │      IMAGE SLIDER                 │ │  (h-64)
│ │  [←] [Image] [→]                  │ │
│ │      [• • •] (indicators)         │ │
│ │                                   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Road Accident (Type)                │
│ Description text...                 │
│                                     │
│ 📍 Location Name                    │
│                                     │
│ ⏱ 2 mins ago  |  [High Priority]   │
│                                     │
│ [View on Map] [Details]             │
│                                     │
│ [Verify (0)] [Fake News]           │
│                                     │
└─────────────────────────────────────┘
```

#### Divs:
- **Card Container:** `div.bg-white.border-2.border-red-200.rounded-2xl`
- **Alert Header:** `div.bg-gradient-to-r.from-red-600.to-red-700.px-6.py-4` (1 div)
- **Media Section:** `div.relative.h-64.bg-neutral-100` (1 div)
  - Image: `img` (1 img)
  - Navigation arrows: 2 buttons (conditional)
  - Indicators: `div.absolute.bottom-3` (1 div)
- **Card Content:** `div.p-6` (1 div)
  - Incident Type: `div.mb-4` (1 div)
  - Location: `div.flex.items-center.gap-2.mb-4` (1 div)
  - Time/Priority: `div.flex.justify-between.mb-6.pb-4` (1 div)
  - Action Buttons: `div.flex.gap-3.mb-4` (1 div)
  - Verify Buttons: `div.flex.gap-3` (1 div)

**Total Divs:** ~10-12 containers

#### Spacing:
- Card padding: `p-6` (24px)
- Header padding: `px-6 py-4` (24px horizontal, 16px vertical)
- Image height: `h-64` (256px)
- Section margins: `mb-4`, `mb-6` (16px, 24px)
- Button gaps: `gap-3` (12px)

#### Icons Used:
- `AlertCircle` - Alert header
- `CheckCircle` - Verification badge
- `MapPin` - Location
- `Clock` - Time
- `Camera` - No image placeholder
- `ChevronLeft`, `ChevronRight` - Image navigation
- `ExternalLink` - View on map
- `Info` - Details
- `Check` - Verified state
- `X` - Fake news
- `Loader2` - Loading state

#### Functions:
1. `handleVerify()` - Increments verification count
2. `handleReportFake()` - Flags as fake
3. `nextImage()` - Next image in slider
4. `prevImage()` - Previous image in slider
5. `getPriority()` - Calculates priority based on people affected
6. `getTimeAgo(timestamp)` - Calculates relative time

---

### 4.6 STATUS TIMELINE (`src/components/StatusTimeline.jsx`)

#### Structure:
```
┌─────────────────────────────────────┐
│ 🚨 Emergency Active                 │  (Red gradient bg)
├─────────────────────────────────────┤
│                                     │
│ ✓ Reported                          │
│   Emergency alert sent               │
│ │                                    │
│ ⏱ Processing                         │
│   Locating nearest services         │
│ │                                    │
│ ✓ Officer Assigned                  │
│   Help is on the way                │
│                                     │
│ ─────────────────────────────────── │
│ Emergency Services: 112             │
│                                     │
└─────────────────────────────────────┘
```

#### Divs:
- **Container:** `div.bg-gradient-to-br.from-red-50.to-orange-50.border-2.p-6`
- **Header:** `div.flex.items-center.gap-3.mb-6` (1 div)
- **Timeline:** `div.space-y-4` (1 div)
  - Each step: `div.flex.items-start.gap-4` (3 divs)
    - Icon container: `div.flex-shrink-0.relative` (1 div)
    - Content: `div.flex-1.pt-1` (1 div)
- **Contact Info:** `div.mt-6.pt-4.border-t` (1 div)
  - Info card: `div.bg-white.rounded-lg.p-3` (1 div)

**Total Divs:** ~8-9 containers

#### Spacing:
- Container padding: `p-6` (24px)
- Header margin: `mb-6` (24px)
- Timeline spacing: `space-y-4` (16px)
- Step gap: `gap-4` (16px)

#### Icons Used:
- `CheckCircle2` - Header icon, completed steps
- `Clock` - Processing step
- `UserCheck` - Officer assigned step
- `History` - (Not currently used in active version)

---

### 4.7 SOS MODAL (`src/components/SOSModal.jsx`)

#### Structure:
```
┌─────────────────────────────────────┐
│        [Full Screen Overlay]        │
│                                     │
│      ┌───────────────────────┐      │
│      │                       │      │
│      │    🚨 (Pulsing)       │      │
│      │                       │      │
│      │   EMERGENCY SOS       │      │
│      │        3              │      │  (Countdown)
│      │                       │      │
│      │  [Warning Message]    │      │
│      │                       │      │
│      │ [Cancel] [Call]       │      │
│      │                       │      │
│      └───────────────────────┘      │
│                                     │
└─────────────────────────────────────┘
```

#### Divs:
- **Overlay:** `div.fixed.inset-0.bg-black/70.z-50` (1 div)
- **Modal:** `div.bg-white.rounded-3xl.shadow-2xl.max-w-md.w-full.p-8` (1 div)
  - Icon: `div.mb-6.flex.justify-center` (1 div)
    - Icon circle: `div.bg-red-600.rounded-full.p-6` (1 div)
  - Countdown: `div.mb-6` (1 div)
  - Warning: `div.bg-red-50.border-2.rounded-xl.p-4.mb-6` (1 div)
  - Buttons: `div.flex.gap-3` (1 div)

**Total Divs:** ~6-7 containers

#### Spacing:
- Modal padding: `p-8` (32px)
- Section margins: `mb-6` (24px)
- Button gap: `gap-3` (12px)

#### Icons Used:
- `AlertTriangle` - SOS icon
- `X` - Cancel button
- `Phone` - Emergency call button

#### Functions:
- `handleCancel()` - Cancels countdown
- Auto countdown via `useEffect` (3 seconds)

---

## 5. LIBRARIES & ICONS USED

### 5.1 Core Libraries

| Library | Version | Usage Location |
|---------|---------|----------------|
| **react** | 19.2.0 | All components |
| **react-dom** | 19.2.0 | Entry point |
| **react-router-dom** | 7.11.0 | App.jsx, Header.jsx, ReportsPage.jsx |
| **leaflet** | 1.9.4 | LocationMap.jsx |
| **react-leaflet** | 5.0.0 | LocationMap.jsx |
| **lucide-react** | 0.562.0 | All components (primary icon library) |
| **react-icons** | 5.5.0 | Installed but not actively used |
| **tailwindcss** | 4.1.18 | Global styling |

### 5.2 Icon Library: Lucide React

#### Icons by Component:

**Header.jsx:**
- `CheckCircle2` - Online status
- `Home` - Home navigation
- `FileText` - Reports navigation

**Sidebar.jsx:**
- `Phone` - SOS button
- `Shield` - Police, Crime
- `Ambulance` - Ambulance
- `Flame` - Fire
- `Car` - Pelos
- `AlertTriangle` - Accident
- `Heart` - Medical Emergency
- `Cloud` - Natural Disaster
- `TrafficCone` - Traffic Issue
- `Wrench` - Utility Problem
- `MoreHorizontal` - Other

**ReportIncident.jsx:**
- `MapPin` - Location button
- `Upload` - File upload
- `Send` - Submit button
- `Users` - People affected input

**LocationMap.jsx:**
- `MapPin` - Location indicator
- `AlertCircle` - Error/warning
- `Loader2` - Loading spinner

**IncidentCard.jsx:**
- `AlertCircle` - Alert header
- `CheckCircle` - Verification
- `MapPin` - Location
- `Clock` - Time
- `Camera` - No image
- `ChevronLeft`, `ChevronRight` - Image navigation
- `ExternalLink` - View on map
- `Info` - Details
- `Check` - Verified
- `X` - Fake news
- `Loader2` - Loading

**StatusTimeline.jsx:**
- `CheckCircle2` - Header, completed steps
- `Clock` - Processing
- `UserCheck` - Officer assigned

**SOSModal.jsx:**
- `AlertTriangle` - SOS icon
- `X` - Cancel
- `Phone` - Emergency call

**ServiceModal.jsx:**
- `Shield` - Police
- `Ambulance` - Ambulance
- `Flame` - Fire
- `Car` - Pelos
- `TrafficCone` - Traffic
- `Wrench` - Utility
- `Phone` - Call
- `FileText` - Report
- `X` - Close

---

## 6. LAYOUT STRUCTURE & SPACING

### 6.1 Overall Layout

**Container Hierarchy:**
```
App (min-h-screen bg-neutral-50)
└── Header (sticky top-0)
└── Router
    └── Routes
        └── Page Container (flex w-full)
            ├── Sidebar (w-[20%] m-7)
            └── Content Area (flex-1)
                ├── Main Content (flex-1 p-4 lg:p-6)
                └── Map Aside (w-96 p-4 lg:p-6)
```

### 6.2 Spacing System

**Margin/Padding Scale:**
- `m-7` = 28px (Sidebar)
- `p-4` = 16px (Standard padding)
- `p-6` = 24px (Card padding)
- `p-8` = 32px (Modal padding)
- `p-10` = 40px (Form container)
- `p-12` = 48px (Large form container)
- `mb-4` = 16px (Small margin)
- `mb-6` = 24px (Medium margin)
- `mb-8` = 32px (Large margin)
- `mb-10` = 40px (Extra large margin)
- `mt-12` = 48px (Top margin)
- `gap-3` = 12px (Small gap)
- `gap-4` = 16px (Standard gap)
- `gap-6` = 24px (Large gap)

**Gap Usage:**
- Grid gaps: `gap-3`, `gap-6`
- Flex gaps: `gap-2`, `gap-3`, `gap-4`
- Form spacing: `space-y-8` (32px vertical)

### 6.3 Border Radius

- `rounded-lg` = 8px (Standard)
- `rounded-xl` = 12px (Buttons, cards)
- `rounded-2xl` = 16px (Main cards, modals)
- `rounded-3xl` = 24px (SOS modal)
- `rounded-full` = 50% (Icons, badges)

### 6.4 Shadow System

- `shadow-sm` - Small shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-soft` - Custom soft shadow (defined in CSS)
- `shadow-soft-md` - Medium soft shadow
- `shadow-soft-lg` - Large soft shadow

---

## 7. COLOR SCHEME & DESIGN SYSTEM

### 7.1 Primary Colors

**Blue (Primary Actions):**
- `blue-50` - Light background
- `blue-100` - Active link background
- `blue-600` - Primary buttons, icons
- `blue-700` - Hover states
- `blue-800` - Dark hover

**Red (Emergency/Alerts):**
- `red-50` - Light background
- `red-100` - Warning background
- `red-200` - Borders
- `red-300` - Medium borders
- `red-500` - SOS mode border
- `red-600` - Emergency buttons, hospitals
- `red-700` - Hover states
- `red-800` - Text on red
- `red-900` - Dark text

**Green (Success/Verification):**
- `green-50` - Success background
- `green-200` - Success borders
- `green-600` - Success buttons, verified
- `green-700` - Hover states
- `green-800` - Success text

**Neutral (Base):**
- `neutral-50` - Page background
- `neutral-100` - Light backgrounds
- `neutral-200` - Borders
- `neutral-300` - Medium borders
- `neutral-400` - Disabled text
- `neutral-500` - Secondary text
- `neutral-600` - Body text
- `neutral-700` - Heading text
- `neutral-900` - Primary text

**Orange (Warnings):**
- `orange-600` - Warning badges
- `orange-700` - Hover states

**Yellow (Medium Priority):**
- `yellow-50` - Warning backgrounds
- `yellow-200` - Warning borders
- `yellow-600` - Medium priority badge
- `yellow-800` - Warning text

**Purple (Utility):**
- `purple-600` - Utility problem icon

### 7.2 Component-Specific Colors

**Sidebar:**
- SOS Button: Red gradient (`from-red-600 to-red-700`)
- Selected Type: Blue (`border-blue-600 bg-blue-50`)
- Icons: Color-coded by type

**Incident Card:**
- Header: Red gradient (`from-red-600 to-red-700`)
- Border: `border-red-200`
- Priority Badges: Color-coded (Red/Orange/Yellow/Green)

**Status Timeline:**
- Background: Red gradient (`from-red-50 to-orange-50`)
- Border: `border-red-200`
- Active Step: Red (`bg-red-600`)
- Completed: Green (`bg-green-600`)

**Map:**
- Normal Mode: White background
- SOS Mode: Red background (`bg-red-50 border-red-500`)
- Hospital Markers: Red (`#ef4444`)
- Police Markers: Blue (`#3b82f6`)

---

## 8. FUNCTION MAPPING

### 8.1 App.jsx Functions
- State management for: selectedService, showModal, selectedIncidentType, userLocation

### 8.2 HomePage.jsx Functions
1. `handleServiceClick(serviceKey)` - Opens service modal
2. `closeModal()` - Closes modal
3. `getSelectedServiceData()` - Returns service data
4. `handleIncidentTypeSelect(type)` - Sets incident type
5. `handleLocationUpdate(coords)` - Updates location state
6. `handleFindNearestServices()` - Triggers nearby search
7. `handleSOSClick()` - Opens SOS modal
8. `handleSOSConfirm()` - Activates SOS, gets location
9. `handleSOSCancel()` - Cancels SOS

### 8.3 ReportsPage.jsx Functions
1. `handleVerifyUpdate(reportId, count)` - Updates verification
2. `handleIncidentTypeSelect(type)` - Sets incident type
3. `handleSOSClick()` - Navigates to home

### 8.4 ReportIncident.jsx Functions
1. `reverseGeocode(lat, lng)` - Gets address from coordinates
2. `handleGetLocation()` - Gets GPS location
3. `handleFileUpload(e)` - Handles file selection
4. `handleSubmit(e)` - Submits form

### 8.5 LocationMap.jsx Functions
1. `reverseGeocode(lat, lng)` - Nominatim API call
2. `formatAddress(data)` - Formats address string
3. `fetchNearbyPlaces(lat, lng, radius)` - Overpass API call
4. `createCustomIcon(color, type)` - Creates Leaflet icons

### 8.6 IncidentCard.jsx Functions
1. `handleVerify()` - Increments count
2. `handleReportFake()` - Flags fake
3. `nextImage()` - Image slider next
4. `prevImage()` - Image slider prev
5. `getPriority()` - Calculates priority
6. Uses `getTimeAgo()` utility

### 8.7 Context Functions

**ReportsContext:**
- `addReport(report)` - Adds new report
- `updateReportVerification(reportId, count)` - Updates count

**SOSContext:**
- `activateSOS(location)` - Activates emergency
- `deactivateSOS()` - Deactivates emergency

---

## 9. RESPONSIVE BREAKPOINTS

**Tailwind Defaults:**
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

**Used Breakpoints:**
- `lg:p-6` - Larger padding on desktop
- `lg:border-r` - Sidebar border on desktop
- `md:grid-cols-2` - 2 columns on tablet
- `xl:grid-cols-3` - 3 columns on large screens

---

## 10. ANIMATIONS & TRANSITIONS

### 10.1 CSS Animations (index.css)
- `animate-pulse-once` - One-time pulse (SOS modal)
- `animate-pulse-slow` - Slow continuous pulse (Status timeline)
- `animate-spin` - Loading spinner
- `animate-pulse` - Continuous pulse (SOS button)

### 10.2 Tailwind Transitions
- `transition-all` - All properties
- `transition-colors` - Color changes
- `transition-smooth` - Custom 200ms transition
- `transform hover:scale-[1.02]` - Hover scale
- `active:scale-[0.98]` - Active scale

---

## 11. API INTEGRATIONS

### 11.1 External APIs Used

1. **Nominatim (OpenStreetMap)**
   - Reverse Geocoding
   - URL: `https://nominatim.openstreetmap.org/reverse`
   - Rate Limit: 1 request/second

2. **Overpass API**
   - Nearby Places Query
   - URL: `https://overpass-api.de/api/interpreter`
   - Query: Hospitals & Police stations within 3000m

3. **OpenStreetMap Tiles**
   - Map Tiles
   - URL: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

### 11.2 Browser APIs
- `navigator.geolocation` - GPS location
- `FileReader` - Image preview

---

## 12. SUMMARY STATISTICS

### 12.1 Component Count
- **Pages:** 2 (HomePage, ReportsPage)
- **Main Components:** 12+
- **Context Providers:** 2 (Reports, SOS)
- **Utility Functions:** 1 (timeAgo)

### 12.2 Div Count (Approximate)
- **HomePage:** ~15-20 divs
- **ReportsPage:** ~10-15 divs + N cards
- **Header:** ~3 divs
- **Sidebar:** ~15-20 divs
- **ReportIncident:** ~10 divs
- **LocationMap:** ~12 divs
- **IncidentCard:** ~12 divs
- **StatusTimeline:** ~9 divs
- **SOSModal:** ~7 divs

**Total Estimated:** ~100-150+ divs across all components

### 12.3 Icon Count
- **Total Unique Icons:** ~25-30
- **Primary Library:** Lucide React
- **Most Used:** MapPin, AlertCircle, CheckCircle

### 12.4 Color Classes Used
- **Blue variants:** 8
- **Red variants:** 9
- **Green variants:** 5
- **Neutral variants:** 9
- **Other:** Orange, Yellow, Purple

---

## 13. UI REDESIGN RECOMMENDATIONS

### 13.1 Areas for Improvement
1. **Consistency:** Standardize spacing scale
2. **Color System:** Create color tokens
3. **Component Reusability:** Extract common patterns
4. **Responsive Design:** More breakpoint usage
5. **Accessibility:** Add ARIA labels, keyboard navigation

### 13.2 Key Files to Modify for UI Changes

**For Layout Changes:**
- `src/pages/HomePage.jsx` - Main layout
- `src/pages/ReportsPage.jsx` - Reports layout
- `src/components/Sidebar.jsx` - Sidebar structure

**For Styling Changes:**
- `src/index.css` - Global styles, animations
- Individual component files - Component-specific styles

**For Color Changes:**
- All component files (inline Tailwind classes)
- Consider creating a design tokens file

**For Spacing Changes:**
- All component files
- Consider creating spacing utility constants

---

## END OF DOCUMENTATION

This document provides a complete analysis of the project structure, UI components, functions, libraries, and design system. Use this as a reference for UI redesign and modifications.


