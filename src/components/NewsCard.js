import React from 'react';
import { Card } from 'react-bootstrap';

const NewsCard = ({ title, excerpt, date, image, link, type, onClick, clickable = false }) => {
  const cardContent = (
    <Card className={`h-100 border-0 shadow-sm news-card ${clickable ? 'clickable' : ''}`}>
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={image} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className={`position-absolute top-0 start-0 p-2 bg-${type === 'news' ? 'usmkc-green' : 'usmkc-blue'} text-white`}>
          {type === 'news' ? 'News' : 'Announcement'}
        </div>
      </div>
      <Card.Body>
        <Card.Title className="fs-6">{title}</Card.Title>
        <Card.Text className="text-muted small">{excerpt}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{date}</small>
          {!clickable && (
            <a href={link} className="stretched-link text-decoration-none">
              <i className={`fas fa-arrow-right text-${type === 'news' ? 'usmkc-green' : 'usmkc-blue'}`}></i>
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  if (clickable) {
    return (
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {cardContent}
      </div>
    );
  }

  return cardContent;
};

export default NewsCard;