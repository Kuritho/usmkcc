import React from 'react';
import { Card, Button } from 'react-bootstrap';

const NewsCard = ({ title, excerpt, date, image, link }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{excerpt}</Card.Text>
        <Card.Text className="text-muted"><small>{date}</small></Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button 
          variant="usmkc" 
          as="a" 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Read more
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default NewsCard;