// Mock data for development/testing when backend is not available
// This file is for frontend development only
// When backend is connected, remove this and use real API data
// NOTE: Replace image URLs with actual accident images from your backend

export const mockIncidents = [
  {
    id: '1',
    description: 'Severe car accident with vehicle overturned, police and emergency services on scene',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80',
    peopleAffected: 3,
    location: 'Highway 101, Sector 5, New Delhi',
    verificationCount: 24,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    description: 'Multi-vehicle collision involving truck and passenger cars, extensive damage',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80',
    peopleAffected: 5,
    location: 'NH-8, Gurgaon Expressway',
    verificationCount: 18,
    createdAt: '2024-01-15T08:15:00Z',
  },
  {
    id: '3',
    description: 'Head-on collision between two vehicles, both severely damaged on wet road',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop&q=80',
    peopleAffected: 4,
    location: 'Ring Road, South Delhi',
    verificationCount: 32,
    createdAt: '2024-01-14T18:45:00Z',
  },
  {
    id: '4',
    description: 'Major accident with multiple vehicles crushed, emergency response in progress',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&h=600&fit=crop&q=80',
    peopleAffected: 6,
    location: 'Mumbai-Pune Expressway, KM 45',
    verificationCount: 15,
    createdAt: '2024-01-14T14:20:00Z',
  },
  {
    id: '5',
    description: 'Nighttime accident with overturned vehicle, emergency responders with lights at scene',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80',
    peopleAffected: 2,
    location: 'Outer Ring Road, Bangalore',
    verificationCount: 28,
    createdAt: '2024-01-13T22:10:00Z',
  },
]
