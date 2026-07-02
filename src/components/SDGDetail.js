import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { sdgGoals } from './SDGHub';
import { getAllContentBySDG } from '../firebase/services';
import SDGTags from './SDGTags';

const SDGDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({ news: [], events: [], all: [] });
  
  const goal = sdgGoals.find(g => g.id === parseInt(id));

  useEffect(() => {
    loadSDGContent();
  }, [id]);

  const loadSDGContent = async () => {
    setLoading(true);
    try {
      const data = await getAllContentBySDG(id);
      setContent(data);
    } catch (error) {
      console.error('Error loading SDG content:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleItemClick = (item, type) => {
    navigate(`/${type}/${item.id}`, { state: { item } });
  };

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
          />
        </Col>
        <Col md={8}>
          <div style={{ borderLeft: `5px solid ${goal.color}`, paddingLeft: '20px' }}>
            <h1 style={{ color: goal.color }}>{goal.title}</h1>
            <p className="lead">{goal.description}</p>
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
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Loading related content...</p>
        </div>
      ) : (
        <>
          {content.all.length > 0 && (
            <Row className="mb-5">
              <Col>
                <h2 className="mb-4">Related Content</h2>
                
                {/* News */}
                {content.news.length > 0 && (
                  <>
                    <h5 className="mb-3">News Articles</h5>
                    <Row>
                      {content.news.map((item) => (
                        <Col key={item.id} md={6} className="mb-4">
                          <Card 
                            className="h-100 shadow-sm cursor-pointer"
                            onClick={() => handleItemClick(item, 'news')}
                          >
                            {item.imageUrl && (
                              <Card.Img 
                                variant="top" 
                                src={item.imageUrl} 
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            )}
                            <Card.Body>
                              <Card.Title>{item.title}</Card.Title>
                              <Card.Text>
                                <small className="text-muted">
                                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date}
                                </small>
                                <br />
                                {item.summary || item.content?.substring(0, 150) + '...'}
                              </Card.Text>
                              <SDGTags sdgIds={item.sdgTags} />
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}

                {/* Events */}
                {content.events.length > 0 && (
                  <>
                    <h5 className="mb-3 mt-4">Events</h5>
                    <Row>
                      {content.events.map((item) => (
                        <Col key={item.id} md={6} className="mb-4">
                          <Card 
                            className="h-100 shadow-sm cursor-pointer"
                            onClick={() => handleItemClick(item, 'event')}
                          >
                            {item.imageUrl && (
                              <Card.Img 
                                variant="top" 
                                src={item.imageUrl} 
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            )}
                            <Card.Body>
                              <Card.Title>{item.title}</Card.Title>
                              <Card.Text>
                                <small className="text-muted">
                                  {item.date ? new Date(item.date).toLocaleDateString() : ''} | {item.time} | {item.location}
                                </small>
                                <br />
                                {item.description?.substring(0, 150) + '...'}
                              </Card.Text>
                              <SDGTags sdgIds={item.sdgTags} />
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          )}

          {content.all.length === 0 && (
            <Row className="mt-5">
              <Col>
                <Card className="bg-light text-center">
                  <Card.Body className="py-5">
                    <i className="fas fa-info-circle" style={{ fontSize: '3rem', color: '#00482D' }}></i>
                    <h4 className="mt-3">No Related Content Yet</h4>
                    <p>There are currently no news or events tagged with this SDG.</p>
                    <Button variant="success" onClick={() => navigate('/campus-updates')}>
                      Browse All Updates
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </>
      )}

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