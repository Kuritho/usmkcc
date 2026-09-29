// src/components/EventDetail.js - Updated with Tweet Button Removed
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Carousel, Badge, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import SEO from './SEO';

const EventDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState({});

  useEffect(() => {
    if (location.state?.event) {
      setEvent(location.state.event);
      setLoading(false);
      prepareSEOData(location.state.event);
    } else if (id) {
      fetchEventFromDatabase(id);
    } else {
      setError('No event data found');
      setLoading(false);
    }
  }, [id, location.state]);

  const fetchEventFromDatabase = async (eventId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      
      if (data) {
        const processedEvent = {
          ...data,
          images: data.images || data.image_url ? [data.image_url] : [],
          content: data.content || data.description || '',
          excerpt: data.summary || data.content?.substring(0, 200) || '',
        };
        setEvent(processedEvent);
        prepareSEOData(processedEvent);
      } else {
        setError('Event not found');
      }
    } catch (err) {
      console.error('Error fetching event:', err);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const prepareSEOData = (eventData) => {
    const siteUrl = process.env.REACT_APP_SITE_URL || 'https://usmkcc.edu.ph';
    
    let imageUrl = eventData.image_url || eventData.images?.[0] || '/images/event-default.jpg';
    if (!imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
      imageUrl = `${siteUrl}/${imageUrl}`;
    }
    if (imageUrl.startsWith('/')) {
      imageUrl = `${siteUrl}${imageUrl}`;
    }

    const eventDate = eventData.date || eventData.created_at;
    const eventLocation = eventData.location || 'USM-KCC, Kidapawan City';

    setSeoData({
      title: eventData.title || 'Event at USM-KCC',
      description: eventData.summary || eventData.content?.substring(0, 160) || `Join us for ${eventData.title} at USM-KCC.`,
      image: imageUrl,
      url: window.location.href,
      publishedTime: eventDate,
      modifiedTime: eventDate,
      type: 'event',
      keywords: `${eventData.title}, USM-KCC event, ${eventLocation}, USM event, Kidapawan City`
    });
  };

  const handleFacebookShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading event details...</p>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <div className="text-center py-5">
              <i className="fas fa-calendar-times" style={{ fontSize: '4rem', color: '#ccc' }}></i>
              <h3 className="mt-3">Event Not Found</h3>
              <p className="text-muted">{error || 'The requested event could not be found.'}</p>
              <Button variant="success" onClick={() => navigate('/upcoming-events')}>
                <i className="fas fa-arrow-left me-2"></i>
                Back to Events
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  const hasImages = event.images && event.images.length > 0;

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        image={seoData.image}
        url={seoData.url}
        type="event"
        publishedTime={seoData.publishedTime}
        modifiedTime={seoData.modifiedTime}
        keywords={seoData.keywords}
      />

      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate(-1)} 
                className="mb-3"
              >
                <i className="fas fa-arrow-left me-2"></i>Back
              </Button>
              
              <div className="d-flex gap-2 mb-3">
                <Button 
                  variant="primary"
                  onClick={handleFacebookShare}
                  style={{ backgroundColor: '#1877f2', border: 'none' }}
                >
                  <i className="fab fa-facebook-f me-2"></i>
                  Share
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={handleCopyLink}
                >
                  <i className="fas fa-link me-2"></i>
                  Copy Link
                </Button>
              </div>
            </div>

            <h1 className="display-5 fw-bold mb-3">{event.title}</h1>
            
            <div className="d-flex flex-wrap gap-2 mb-4">
              {event.date && (
                <Badge bg="usmkc-green" className="px-3 py-2 rounded-pill">
                  <i className="far fa-calendar-alt me-1"></i>
                  {formatDate(event.date)}
                </Badge>
              )}
              {event.location && (
                <Badge bg="secondary" className="px-3 py-2 rounded-pill">
                  <i className="fas fa-map-marker-alt me-1"></i>
                  {event.location}
                </Badge>
              )}
              {event.time && (
                <Badge bg="info" className="px-3 py-2 rounded-pill">
                  <i className="far fa-clock me-1"></i>
                  {event.time}
                </Badge>
              )}
              {event.category && (
                <Badge bg="dark" className="px-3 py-2 rounded-pill">
                  {event.category}
                </Badge>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {hasImages && (
              <div className="mb-4">
                <Carousel 
                  fade 
                  indicators={event.images.length > 1}
                  controls={event.images.length > 1}
                  className="event-carousel shadow-sm rounded overflow-hidden"
                >
                  {event.images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <div style={{ height: '450px', overflow: 'hidden', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <img
                          className="d-block"
                          src={img}
                          alt={`${event.title} - Image ${index + 1}`}
                          style={{ 
                            maxWidth: '100%',
                            maxHeight: '450px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/event-default.jpg';
                            e.target.style.objectFit = 'contain';
                          }}
                        />
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            )}
            
            <div className="event-content">
              {event.excerpt && (
                <div className="lead mb-4" style={{ fontSize: '1.15rem', color: '#555' }}>
                  {event.excerpt}
                </div>
              )}
              
              <div style={{ 
                fontSize: '1.05rem', 
                lineHeight: '1.8',
                whiteSpace: 'pre-wrap'
              }}>
                {event.content || event.description || 'No description available.'}
              </div>
            </div>
          </Col>
          
          <Col lg={4}>
            <div className="bg-light p-4 rounded shadow-sm sticky-top" style={{ top: '20px' }}>
              <h5 className="mb-3">
                <i className="fas fa-info-circle me-2"></i>
                Event Details
              </h5>
              
              {event.date && (
                <div className="mb-3">
                  <strong><i className="far fa-calendar-alt me-2"></i>Date:</strong>
                  <p className="mb-0">{formatDate(event.date)}</p>
                </div>
              )}
              
              {event.time && (
                <div className="mb-3">
                  <strong><i className="far fa-clock me-2"></i>Time:</strong>
                  <p className="mb-0">{event.time}</p>
                </div>
              )}
              
              {event.location && (
                <div className="mb-3">
                  <strong><i className="fas fa-map-marker-alt me-2"></i>Location:</strong>
                  <p className="mb-0">{event.location}</p>
                </div>
              )}
              
              {event.organizer && (
                <div className="mb-3">
                  <strong><i className="fas fa-user me-2"></i>Organizer:</strong>
                  <p className="mb-0">{event.organizer}</p>
                </div>
              )}
              
              <hr />
              
              <Button 
                variant="success" 
                className="w-100 mb-2"
                onClick={() => {
                  const startDate = event.date ? new Date(event.date) : new Date();
                  const endDate = new Date(startDate);
                  endDate.setHours(endDate.getHours() + 2);
                  
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=${encodeURIComponent(event.content || '')}&location=${encodeURIComponent(event.location || '')}`;
                  window.open(googleCalendarUrl, '_blank');
                }}
              >
                <i className="far fa-calendar-plus me-2"></i>
                Add to Calendar
              </Button>
              
              <Button 
                variant="outline-success" 
                className="w-100 mb-2"
                onClick={handleFacebookShare}
              >
                <i className="fab fa-facebook-f me-2"></i>
                Share on Facebook
              </Button>
              
              <Button 
                variant="outline-secondary" 
                className="w-100"
                onClick={handleCopyLink}
              >
                <i className="fas fa-link me-2"></i>
                Copy Event Link
              </Button>
            </div>

            <div className="mt-4">
              <h6 className="text-muted mb-3">
                <i className="fas fa-calendar-alt me-2"></i>
                Upcoming Events
              </h6>
              <div className="bg-white p-3 rounded shadow-sm">
                <p className="text-muted mb-0 small">
                  <i className="fas fa-plus-circle me-1"></i>
                  Check more events on our{' '}
                  <Button 
                    variant="link" 
                    className="p-0 text-decoration-none"
                    onClick={() => navigate('/upcoming-events')}
                  >
                    Upcoming Events
                  </Button>
                  {' '}page.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .event-carousel {
          border-radius: 12px;
          overflow: hidden;
        }
        
        .event-carousel .carousel-control-prev,
        .event-carousel .carousel-control-next {
          background: rgba(0,0,0,0.3);
          width: 50px;
          border-radius: 0;
        }
        
        .event-carousel .carousel-indicators {
          margin-bottom: 10px;
        }
        
        .event-carousel .carousel-indicators button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
        }
        
        .event-content {
          color: #333;
        }
        
        @media (max-width: 768px) {
          .sticky-top {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </>
  );
};

export default EventDetail;