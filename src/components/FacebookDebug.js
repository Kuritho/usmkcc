// src/components/FacebookDebug.js
import React from 'react';
import { Button } from 'react-bootstrap';

const FacebookDebug = ({ url }) => {
  const debugUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`;
  
  const handleDebug = () => {
    window.open(debugUrl, '_blank', 'width=800,height=600');
  };

  return (
    <Button 
      variant="outline-secondary" 
      size="sm"
      onClick={handleDebug}
      className="ms-2"
    >
      <i className="fas fa-bug me-1"></i>
      Debug Sharing
    </Button>
  );
};

export default FacebookDebug;