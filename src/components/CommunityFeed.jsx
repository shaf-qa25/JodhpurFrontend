import React from 'react'
import { ThumbsUp } from 'lucide-react'
import { getTimeAgo } from '../utils/timeAgo'

const CommunityFeed = ({ reports = [], isDesktop = false }) => {
  // Use reports from context or fallback to sample data
  const feedItems = reports.length > 0 
    ? reports.slice(0, 5).map(report => ({
        id: report.id,
        image: report.image || 'https://via.placeholder.com/300x200?text=No+Image',
        title: report.description || report.type || 'Incident Report',
        upvotes: report.verificationCount || 0,
        timeAgo: getTimeAgo(report.createdAt)
      }))
    : [
        {
          id: 1,
          image: 'https://via.placeholder.com/300x200?text=Waterlogging',
          title: 'Waterlooging in Sector 5',
          upvotes: 24,
          timeAgo: '5 min ago'
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/300x200?text=Streetlight',
          title: 'Streetlight out near Park',
          upvotes: 18,
          timeAgo: '5 hour ago'
        }
      ]

  return (
    <div className={isDesktop ? "" : "feed-section"}>
      <h3 className={isDesktop ? "text-xl font-bold mb-4" : "section-heading"}>Remmunity Feed</h3>
      
      <div>
        {feedItems.map((item) => (
          <div key={item.id} className={isDesktop ? "feed-item" : "feed-card"}>
            <img
              src={item.image}
              alt={item.title}
              className={isDesktop ? "avatar" : "feed-img"}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
              }}
            />
            <div className="feed-content">
              <p>{item.title}</p>
              <span>{item.timeAgo || 'Recently'}</span>
            </div>
            <button className={isDesktop ? "upvote-tag" : "upvote-btn"}>
              <ThumbsUp className="w-3 h-3" />
              <span>{item.upvotes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommunityFeed

