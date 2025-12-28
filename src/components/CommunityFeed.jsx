import React from 'react'
import { ThumbsUp } from 'lucide-react'
import { getTimeAgo } from '../utils/timeAgo'

const CommunityFeed = ({ reports = [], isDesktop = false }) => {
  // Use reports from context or fallback to empty array (no mock data)
  const feedItems = reports.length > 0 
    ? reports.slice(0, 5).map(report => ({
        id: report.id,
        image: report.image || null,
        title: report.description || report.type || 'Incident Report',
        upvotes: report.verificationCount || 0,
        timeAgo: getTimeAgo(report.createdAt)
      }))
    : []

  return (
    <div className={isDesktop ? "" : "feed-section"}>
      <h3 className={isDesktop ? "text-xl font-bold mb-4" : "section-heading"}>Remmunity Feed</h3>
      
      <div>
        {feedItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No reports available. Check back later!
          </div>
        ) : (
          feedItems.map((item) => (
            <div key={item.id} className={isDesktop ? "feed-item" : "feed-card"}>
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={isDesktop ? "avatar" : "feed-img"}
                    onError={(e) => {
                      // Hide broken image and show placeholder
                      e.target.style.display = 'none'
                      const placeholder = e.target.nextElementSibling
                      if (placeholder) placeholder.style.display = 'flex'
                    }}
                  />
                  <div className={`${isDesktop ? "avatar" : "feed-img"} bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-2`} style={{ display: 'none' }}>
                    No Image
                  </div>
                </>
              ) : (
                <div className={`${isDesktop ? "avatar" : "feed-img"} bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center p-2`}>
                  No Image
                </div>
              )}
              <div className="feed-content">
                <p>{item.title}</p>
                <span>{item.timeAgo || 'Recently'}</span>
              </div>
              <button className={isDesktop ? "upvote-tag" : "upvote-btn"}>
                <ThumbsUp className="w-3 h-3" />
                <span>{item.upvotes}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CommunityFeed

