// SDGDetail.js - Fixed filtering logic
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { sdgGoals } from './SDGHub';
import { getNews, getEvents } from '../supabase/services';
import SDGTags from './SDGTags';

const SDGDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({ news: [], events: [], all: [] });
  const [goal, setGoal] = useState(null);
  
  useEffect(() => {
    // Find the SDG goal
    const foundGoal = sdgGoals.find(g => g.id === parseInt(id));
    setGoal(foundGoal);
    loadSDGContent();
  }, [id]);

  const loadSDGContent = async () => {
    setLoading(true);
    try {
      // Fetch data from Supabase
      const [newsResult, eventsResult] = await Promise.all([
        getNews(),
        getEvents()
      ]);
      
      console.log(`📊 SDG ${id} - All News:`, newsResult.data);
      console.log(`📊 SDG ${id} - All Events:`, eventsResult.data);
      
      let filteredNews = [];
      let filteredEvents = [];
      
      // Filter news by SDG - handle both number and string comparisons
      if (newsResult.success && newsResult.data) {
        filteredNews = newsResult.data.filter(item => {
          if (item.sdg_tags && Array.isArray(item.sdg_tags)) {
            // Convert both to string for comparison
            const sdgId = String(id);
            const hasTag = item.sdg_tags.some(tag => String(tag) === sdgId);
            if (hasTag) {
              console.log(`✅ News "${item.title}" has SDG ${id}:`, item.sdg_tags);
            }
            return hasTag;
          }
          return false;
        });
        console.log(`📰 SDG ${id} - Filtered News (${filteredNews.length}):`, filteredNews);
      }
      
      // Filter events by SDG
      if (eventsResult.success && eventsResult.data) {
        filteredEvents = eventsResult.data.filter(item => {
          if (item.sdg_tags && Array.isArray(item.sdg_tags)) {
            const sdgId = String(id);
            const hasTag = item.sdg_tags.some(tag => String(tag) === sdgId);
            if (hasTag) {
              console.log(`✅ Event "${item.title}" has SDG ${id}:`, item.sdg_tags);
            }
            return hasTag;
          }
          return false;
        });
        console.log(`🎪 SDG ${id} - Filtered Events (${filteredEvents.length}):`, filteredEvents);
      }
      
      setContent({
        news: filteredNews,
        events: filteredEvents,
        all: [...filteredNews, ...filteredEvents]
      });
    } catch (error) {
      console.error('Error loading SDG content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item, type) => {
    console.log('🖱️ Clicked item:', item);
    navigate(`/${type}/${item.id}`, { state: { item } });
  };

  // Helper function to get image URL with fallback
  const getImageUrl = (item) => {
    if (item.image_url) {
      return item.image_url;
    }
    if (item.type === 'announcement') {
      return '/images/announcement-default.jpg';
    }
    if (item.type === 'event') {
      return '/images/event-default.jpg';
    }
    return '/images/news-default.jpg';
  };

  // Format date
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
        <p className="mt-3">Loading SDG content...</p>
      </Container>
    );
  }

  if (!goal) {
    return (
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <h2>SDG Not Found</h2>
            <Button onClick={() => navigate('/sdg-hub')} className="mt-3">
              Back to SDG Hub
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <Button variant="outline-secondary" onClick={() => navigate('/sdg-hub')}>
            &larr; Back to All SDGs
          </Button>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={4} className="text-center">
          <img
            src={`/images/sdg/SDG-${goal.id}.jpg`}
            alt={`SDG ${goal.id}`}
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/sdg-default.jpg';
            }}
          />
        </Col>
        <Col md={8}>
          <div style={{ borderLeft: `5px solid ${goal.color}`, paddingLeft: '20px' }}>
            <h1 style={{ color: goal.color }}>{goal.title}</h1>
            <p className="lead">{goal.description}</p>
            <div className="mt-2">
              <Badge bg="success" style={{ fontSize: '1rem' }}>
                <i className="fas fa-file-alt me-1"></i>
                {content.all.length} related article{content.all.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="g-4 mb-5">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h3>Key Targets</h3>
            </Card.Header>
            <Card.Body>
              <ul>
                {goal.targets.map((target, index) => (
                  <li key={index} className="mb-2">{target}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h3>USM Initiatives</h3>
            </Card.Header>
            <Card.Body>
              <ul>
                {goal.usmInitiatives.map((initiative, index) => (
                  <li key={index} className="mb-2">{initiative}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Related Content Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">
            <i className="fas fa-file-alt me-2"></i>
            Related Content from USM-KCC
          </h2>
          
          {content.all.length === 0 ? (
            <Card className="bg-light text-center">
              <Card.Body className="py-5">
                <i className="fas fa-info-circle" style={{ fontSize: '3rem', color: '#00482D' }}></i>
                <h4 className="mt-3">No Related Content Yet</h4>
                <p>There are currently no news or events tagged with this SDG.</p>
                <p className="text-muted">When articles are published with SDG tags, they will appear here automatically.</p>
                <Button variant="success" onClick={() => navigate('/campus-updates')}>
                  Browse All Updates
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <>
              {/* News Articles */}
              {content.news.length > 0 && (
                <>
                  <h5 className="mb-3">
                    <i className="fas fa-newspaper me-2" style={{ color: '#00482D' }}></i>
                    News Articles ({content.news.length})
                  </h5>
                  <Row>
                    {content.news.map((item) => {
                      console.log('📰 Rendering news item:', item.id, item.title);
                      return (
                        <Col key={item.id} md={6} lg={4} className="mb-4">
                          <Card 
                            className="h-100 shadow-sm cursor-pointer"
                            onClick={() => handleItemClick(item, 'news')}
                            style={{ 
                              cursor: 'pointer',
                              transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                              <Card.Img 
                                variant="top" 
                                src={getImageUrl(item)} 
                                style={{ 
                                  height: '100%',
                                  width: '100%',
                                  objectFit: 'cover'
                                }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/news-default.jpg';
                                }}
                              />
                            </div>
                            <Card.Body>
                              <Card.Title className="h6">{item.title}</Card.Title>
                              <Card.Text>
                                <small className="text-muted">
                                  <i className="fas fa-calendar-alt me-1"></i>
                                  {formatDate(item.date || item.created_at)}
                                </small>
                                <br />
                                <small className="text-muted">
                                  {item.summary || item.content?.substring(0, 120) + '...'}
                                </small>
                              </Card.Text>
                              {item.sdg_tags && item.sdg_tags.length > 0 && (
                                <div className="mt-2">
                                  <SDGTags sdgIds={item.sdg_tags} />
                                </div>
                              )}
                            </Card.Body>
                            <Card.Footer className="bg-transparent">
                              <Badge bg="success">News</Badge>
                              <small className="text-muted ms-2">
                                {formatDate(item.date || item.created_at)}
                              </small>
                            </Card.Footer>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </>
              )}

              {/* Events */}
              {content.events.length > 0 && (
                <>
                  <h5 className="mb-3 mt-4">
                    <i className="fas fa-calendar-alt me-2" style={{ color: '#00482D' }}></i>
                    Events ({content.events.length})
                  </h5>
                  <Row>
                    {content.events.map((item) => (
                      <Col key={item.id} md={6} lg={4} className="mb-4">
                        <Card 
                          className="h-100 shadow-sm cursor-pointer"
                          onClick={() => handleItemClick(item, 'event')}
                          style={{ 
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                        >
                          <div style={{ height: '200px', overflow: 'hidden' }}>
                            <Card.Img 
                              variant="top" 
                              src={getImageUrl(item)} 
                              style={{ 
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/event-default.jpg';
                              }}
                            />
                          </div>
                          <Card.Body>
                            <Card.Title className="h6">{item.title}</Card.Title>
                            <Card.Text>
                              <small className="text-muted">
                                <i className="fas fa-calendar-alt me-1"></i>
                                {formatDate(item.date)}
                              </small>
                              {item.location && (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    <i className="fas fa-map-marker-alt me-1"></i>
                                    {item.location}
                                  </small>
                                </>
                              )}
                              <br />
                              <small className="text-muted">
                                {item.description?.substring(0, 120) + '...'}
                              </small>
                            </Card.Text>
                            {item.sdg_tags && item.sdg_tags.length > 0 && (
                              <div className="mt-2">
                                <SDGTags sdgIds={item.sdg_tags} />
                              </div>
                            )}
                          </Card.Body>
                          <Card.Footer className="bg-transparent">
                            <Badge bg="info">Event</Badge>
                            <small className="text-muted ms-2">
                              {formatDate(item.date)}
                            </small>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </>
          )}
        </Col>
      </Row>

      {/* Call to Action */}
      <Row className="mt-5">
        <Col>
          <Card className="bg-light">
            <Card.Body className="text-center">
              <h3>Get Involved with {goal.title}</h3>
              <p className="mb-4">
                Contact us to learn how you can contribute to initiatives related to this Sustainable Development Goal.
              </p>
              <Button variant="success" className="me-2">
                Volunteer Opportunities
              </Button>
              <Button variant="outline-primary">
                Research Collaborations
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SDGDetail;