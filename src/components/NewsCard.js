// src/components/NewsCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const NewsCard = ({ title, excerpt, date, image, link, type, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.location.href = link;
    }
  };

  // Get badge variant based on type
  const getBadgeVariant = () => {
    switch(type) {
      case 'news':
        return 'success';
      case 'announcement':
        return 'primary';
      case 'event':
        return 'info';
      default:
        return 'secondary';
    }
  };

  // Get badge label
  const getBadgeLabel = () => {
    switch(type) {
      case 'news':
        return 'News';
      case 'announcement':
        return 'Announcement';
      case 'event':
        return 'Event';
      default:
        return type || 'Update';
    }
  };

  return (
    <Card 
      className="mb-3 shadow-sm hover-card border-0"
      style={{ 
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.06)';
      }}
    >
      <Card.Body className="p-3 p-md-4">
        <div className="d-flex flex-column flex-sm-row align-items-start gap-3">
          {/* Image */}
          {image && (
            <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '160px' }}>
              <img 
                src={image} 
                alt={title}
                style={{ 
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/usm-logo.png';
                }}
              />
            </div>
          )}
          
          {/* Content */}
          <div className="flex-grow-1" style={{ minWidth: 0 }}>
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <span className={`badge bg-${getBadgeVariant()} px-3 py-1 rounded-pill`}>
                {getBadgeLabel()}
              </span>
              <small className="text-muted d-flex align-items-center gap-1">
                <i className="far fa-calendar-alt"></i>
                {date}
              </small>
            </div>
            <h5 className="mb-1 text-usmkc-green fw-semibold" style={{ fontSize: '1.05rem' }}>
              {title}
            </h5>
            {excerpt && (
              <p className="text-muted small mb-0" style={{ 
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: '1.5'
              }}>
                {excerpt}
              </p>
            )}
            <div className="mt-2">
              <small className="text-usmkc-green fw-medium">
                Read more <i className="fas fa-arrow-right ms-1"></i>
              </small>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;