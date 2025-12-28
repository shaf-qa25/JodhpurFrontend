import React from 'react'
import { ThumbsUp, User } from 'lucide-react'

const CommunityFeed = () => {
  const feedItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x200?text=Waterlogging',
      title: 'Waterlogging on Street 5',
      upvotes: 20,
      author: 'User123'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x200?text=Streetlight',
      title: 'Streetlight',
      upvotes: 15,
      author: 'User456'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x200?text=Road+Damage',
      title: 'Road Damage on Main Street',
      upvotes: 8,
      author: 'User789'
    }
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">Community Feed</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {feedItems.map((item) => (
          <div key={item.id} className="bg-neutral-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-32 bg-neutral-200">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                }}
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-neutral-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-neutral-700">
                    Upvotes: {item.upvotes}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3 text-neutral-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommunityFeed

