import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap'; // Added Badge here
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';
import { getAllNews, getAllEvents, getAllAnnouncements } from '../firebase/services';
import SDGTags from './SDGTags';

const CampusUpdates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [newsData, eventsData, announcementsData] = await Promise.all([
        getAllNews(),
        getAllEvents(),
        getAllAnnouncements()
      ]);
      
      setNews(newsData);
      setEvents(eventsData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item, type) => {
    navigate(`/${type}/${item.id}`, { state: { item } });
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading updates...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-usmkc-green">Campus Updates</h1>
          <p className="text-center text-muted">All news, events, and announcements from USM-KCC</p>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-5">
          <h2 className="border-bottom pb-2 mb-4 text-usmkc-green">
            <i className="fas fa-newspaper me-2"></i>
            News
          </h2>
          {news.length > 0 ? (
            news.map(item => (
              <div key={item.id} className="mb-4">
                <NewsCard 
                  title={item.title}
                  excerpt={item.summary || item.content?.substring(0, 150) + '...'}
                  date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : item.date}
                  image={item.imageUrl}
                  onClick={() => handleItemClick(item, 'news')}
                  type="news"
                  clickable
                />
                {item.sdgTags && item.sdgTags.length > 0 && (
                  <div className="mt-2">
                    <SDGTags sdgIds={item.sdgTags} />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">No news articles yet.</p>
          )}
        </Col>

        <Col lg={6}>
          <Row>
            <Col xs={12} className="mb-5">
              <h2 className="border-bottom pb-2 mb-4 text-usmkc-blue">
                <i className="fas fa-calendar-alt me-2"></i>
                Upcoming Events
              </h2>
              {events.length > 0 ? (
                events.map(item => (
                  <div key={item.id} className="mb-4">
                    <NewsCard 
                      title={item.title}
                      excerpt={item.description?.substring(0, 150) + '...'}
                      date={item.date ? new Date(item.date).toLocaleDateString() : ''}
                      image={item.imageUrl}
                      onClick={() => handleItemClick(item, 'event')}
                      type="event"
                      clickable
                    />
                    {item.sdgTags && item.sdgTags.length > 0 && (
                      <div className="mt-2">
                        <SDGTags sdgIds={item.sdgTags} />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted">No upcoming events.</p>
              )}
            </Col>

            <Col xs={12}>
              <h2 className="border-bottom pb-2 mb-4 text-usmkc-blue">
                <i className="fas fa-bullhorn me-2"></i>
                Announcements
              </h2>
              {announcements.length > 0 ? (
                announcements.map(item => (
                  <div key={item.id} className="mb-4">
                    <NewsCard 
                      title={item.title}
                      excerpt={item.content?.substring(0, 150) + '...'}
                      date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                      image="/images/announcement-default.jpg"
                      onClick={() => handleItemClick(item, 'announcement')}
                      type="announcement"
                      clickable
                    />
                    {item.priority === 'urgent' && (
                      <Badge bg="danger" className="mt-2">URGENT</Badge>
                    )}
                    {item.priority === 'high' && (
                      <Badge bg="warning" className="mt-2">HIGH PRIORITY</Badge>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted">No announcements yet.</p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CampusUpdates;