// SDGHub.js - Updated to show article counts and links
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Accordion, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getNews, getEvents } from '../supabase/services';

export const sdgGoals = [
  {
    id: 1,
    title: 'No Poverty',
    color: '#E5243B',
    description: 'End poverty in all its forms everywhere.',
    targets: [
      'By 2030, eradicate extreme poverty for all people everywhere',
      'Implement nationally appropriate social protection systems',
      'Ensure equal rights to economic resources'
    ],
    usmInitiatives: [
      'Scholarship programs for underprivileged students',
      'Community outreach programs in impoverished areas',
      'Financial literacy workshops'
    ]
  },
  {
    id: 2,
    title: 'Zero Hunger',
    color: '#DDA63A',
    description: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture.',
    targets: [
      'By 2030, end hunger and ensure access to safe, nutritious food',
      'Double agricultural productivity and incomes of small-scale food producers',
      'Ensure sustainable food production systems'
    ],
    usmInitiatives: [
      'Agricultural research and extension services',
      'Campus vegetable garden projects',
      'Nutrition education programs'
    ]
  },
  {
    id: 3,
    title: 'Good Health and Well-being',
    color: '#4C9F38',
    description: 'Ensure healthy lives and promote well-being for all at all ages.',
    targets: [
      'Reduce maternal mortality and end preventable deaths of newborns',
      'End epidemics of AIDS, tuberculosis, malaria and other communicable diseases',
      'Achieve universal health coverage'
    ],
    usmInitiatives: [
      'Campus health services and wellness programs',
      'Public health research initiatives',
      'Community medical missions'
    ]
  },
  {
    id: 4,
    title: 'Quality Education',
    color: '#C5192D',
    description: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.',
    targets: [
      'Ensure all children complete free, equitable quality primary and secondary education',
      'Increase number of youth and adults with relevant skills for employment',
      'Build and upgrade education facilities'
    ],
    usmInitiatives: [
      'Scholarship and financial aid programs',
      'Teacher training and development',
      'Community literacy programs'
    ]
  },
  {
    id: 5,
    title: 'Gender Equality',
    color: '#FF3A21',
    description: 'Achieve gender equality and empower all women and girls.',
    targets: [
      'End all forms of discrimination against women and girls',
      'Eliminate all forms of violence against women and girls',
      'Ensure women full participation in leadership and decision-making'
    ],
    usmInitiatives: [
      'Gender sensitivity training',
      'Women leadership programs',
      'Research on gender issues'
    ]
  },
  {
    id: 6,
    title: 'Clean Water and Sanitation',
    color: '#26BDE2',
    description: 'Ensure availability and sustainable management of water and sanitation for all.',
    targets: [
      'Achieve universal access to safe drinking water',
      'Improve water quality by reducing pollution',
      'Increase water-use efficiency across all sectors'
    ],
    usmInitiatives: [
      'Water conservation research',
      'Community water system projects',
      'Sanitation education programs'
    ]
  },
  {
    id: 7,
    title: 'Affordable and Clean Energy',
    color: '#FCC30B',
    description: 'Ensure access to affordable, reliable, sustainable and modern energy for all.',
    targets: [
      'Ensure universal access to affordable, reliable energy services',
      'Increase share of renewable energy in the global energy mix',
      'Double global rate of improvement in energy efficiency'
    ],
    usmInitiatives: [
      'Solar panel installations on campus',
      'Research on renewable energy solutions',
      'Energy conservation campaigns'
    ]
  },
  {
    id: 8,
    title: 'Decent Work and Economic Growth',
    color: '#A21942',
    description: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.',
    targets: [
      'Sustain per capita economic growth',
      'Achieve higher levels of economic productivity',
      'Promote development-oriented policies'
    ],
    usmInitiatives: [
      'Career counseling and job placement services',
      'Entrepreneurship training programs',
      'Industry partnerships for student internships'
    ]
  },
  {
    id: 9,
    title: 'Industry, Innovation and Infrastructure',
    color: '#FD6925',
    description: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.',
    targets: [
      'Develop quality, reliable, sustainable infrastructure',
      'Promote inclusive and sustainable industrialization',
      'Enhance scientific research and technological capabilities'
    ],
    usmInitiatives: [
      'Engineering and technology research',
      'Innovation hubs and maker spaces',
      'Industry collaboration projects'
    ]
  },
  {
    id: 10,
    title: 'Reduced Inequalities',
    color: '#DD1367',
    description: 'Reduce inequality within and among countries.',
    targets: [
      'Achieve income growth of the bottom 40% of the population',
      'Promote social, economic and political inclusion',
      'Ensure equal opportunity and reduce inequalities of outcome'
    ],
    usmInitiatives: [
      'Programs for indigenous communities',
      'Disability access initiatives',
      'Research on social inequality'
    ]
  },
  {
    id: 11,
    title: 'Sustainable Cities and Communities',
    color: '#FD9D24',
    description: 'Make cities and human settlements inclusive, safe, resilient and sustainable.',
    targets: [
      'Ensure access to adequate, safe and affordable housing',
      'Provide access to safe, affordable transport systems',
      'Strengthen efforts to protect cultural and natural heritage'
    ],
    usmInitiatives: [
      'Urban planning research',
      'Community development projects',
      'Heritage conservation programs'
    ]
  },
  {
    id: 12,
    title: 'Responsible Consumption and Production',
    color: '#BF8B2E',
    description: 'Ensure sustainable consumption and production patterns.',
    targets: [
      'Achieve sustainable management of natural resources',
      'Halve per capita global food waste at retail and consumer levels',
      'Encourage companies to adopt sustainable practices'
    ],
    usmInitiatives: [
      'Campus recycling programs',
      'Sustainable agriculture research',
      'Zero-waste initiatives'
    ]
  },
  {
    id: 13,
    title: 'Climate Action',
    color: '#3F7E44',
    description: 'Take urgent action to combat climate change and its impacts.',
    targets: [
      'Strengthen resilience to climate-related hazards',
      'Integrate climate change measures into national policies',
      'Improve education on climate change mitigation'
    ],
    usmInitiatives: [
      'Climate change research',
      'Tree planting campaigns',
      'Carbon footprint reduction programs'
    ]
  },
  {
    id: 14,
    title: 'Life Below Water',
    color: '#0A97D9',
    description: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development.',
    targets: [
      'Prevent and significantly reduce marine pollution',
      'Sustainably manage marine ecosystems',
      'Increase scientific knowledge of marine biodiversity'
    ],
    usmInitiatives: [
      'Marine biology research',
      'Coastal clean-up drives',
      'Fisheries management programs'
    ]
  },
  {
    id: 15,
    title: 'Life on Land',
    color: '#56C02B',
    description: 'Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.',
    targets: [
      'Ensure conservation of terrestrial ecosystems',
      'Promote sustainable forest management',
      'Combat desertification and restore degraded land'
    ],
    usmInitiatives: [
      'Biodiversity research',
      'Reforestation projects',
      'Wildlife conservation programs'
    ]
  },
  {
    id: 16,
    title: 'Peace, Justice and Strong Institutions',
    color: '#00689D',
    description: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.',
    targets: [
      'Reduce violence and related death rates',
      'Promote rule of law and equal access to justice',
      'Develop effective, accountable institutions'
    ],
    usmInitiatives: [
      'Human rights education',
      'Conflict resolution programs',
      'Good governance research'
    ]
  },
  {
    id: 17,
    title: 'Partnerships for the Goals',
    color: '#19486A',
    description: 'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.',
    targets: [
      'Strengthen domestic resource mobilization',
      'Enhance international cooperation',
      'Promote effective public-private partnerships'
    ],
    usmInitiatives: [
      'International student exchange programs',
      'Collaborative research projects',
      'Community-industry partnerships'
    ]
  }
];

const SDGHub = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [articleCounts, setArticleCounts] = useState({});
  const [allNews, setAllNews] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [newsResult, eventsResult] = await Promise.all([
        getNews(),
        getEvents()
      ]);

      let news = [];
      let events = [];

      if (newsResult.success) {
        news = newsResult.data;
        setAllNews(news);
        console.log('📰 All News for SDG Hub:', news);
      }

      if (eventsResult.success) {
        events = eventsResult.data;
        setAllEvents(events);
        console.log('🎪 All Events for SDG Hub:', events);
      }

      // Count articles per SDG
      const counts = {};
      
      // Count news
      news.forEach(item => {
        if (item.sdg_tags && Array.isArray(item.sdg_tags)) {
          item.sdg_tags.forEach(tagId => {
            counts[tagId] = (counts[tagId] || 0) + 1;
          });
        }
      });

      // Count events
      events.forEach(item => {
        if (item.sdg_tags && Array.isArray(item.sdg_tags)) {
          item.sdg_tags.forEach(tagId => {
            counts[tagId] = (counts[tagId] || 0) + 1;
          });
        }
      });

      console.log('📊 SDG Article Counts:', counts);
      setArticleCounts(counts);

    } catch (error) {
      console.error('Error loading SDG data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSDGClick = (sdgId) => {
    navigate(`/sdg/${sdgId}`);
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading SDG Hub...</p>
      </Container>
    );
  }

  const totalArticles = Object.values(articleCounts).reduce((a, b) => a + b, 0);

  return (
    <Container className="py-5">
      {/* Header Section */}
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-3">Sustainable Development Goals Hub</h1>
          <p className="lead text-center">
            The University of Southern Mindanao's commitment to the United Nations 2030 Agenda for Sustainable Development
          </p>
          <p className="text-center text-muted">
            <i className="fas fa-file-alt me-1"></i>
            {totalArticles} article{totalArticles !== 1 ? 's' : ''} tagged across all SDGs
          </p>
        </Col>
      </Row>

      {/* Introduction Section */}
      <Row className="mb-5">
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">About the SDGs</h2>
              <p>
                The Sustainable Development Goals (SDGs) are a collection of 17 interlinked global goals designed to be a
                "blueprint to achieve a better and more sustainable future for all". The SDGs were set up in 2015 by the
                United Nations General Assembly and are intended to be achieved by the year 2030.
              </p>
              <p>
                USM-Kidapawan City Campus is committed to contributing to these global goals through our teaching,
                research, operations, and community engagement. This hub showcases our initiatives aligned with each of
                the 17 SDGs.
              </p>
              <div className="text-center mt-4">
                <Button
                  variant="primary"
                  href="https://sdgs.un.org/goals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More About UN SDGs
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* SDG Grid */}
      <Row className="g-4">
        {sdgGoals.map((goal) => {
          const count = articleCounts[goal.id] || 0;
          return (
            <Col key={goal.id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                className="h-100 shadow-sm cursor-pointer" 
                style={{ 
                  borderTop: `5px solid ${goal.color}`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onClick={() => handleSDGClick(goal.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Card.Body>
                  <div className="text-center mb-3">
                    <img
                      src={`/images/sdg/SDG-${goal.id}.jpg`}
                      alt={`SDG ${goal.id}`}
                      style={{ height: '100px', width: 'auto' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/sdg-default.jpg';
                      }}
                    />
                  </div>
                  <Card.Title className="text-center h6">{goal.title}</Card.Title>
                  <Card.Text className="text-center small">{goal.description}</Card.Text>
                  
                  <div className="text-center mt-2">
                    <Badge 
                      bg={count > 0 ? 'success' : 'secondary'} 
                      style={{ fontSize: '0.8rem' }}
                    >
                      <i className="fas fa-file-alt me-1"></i>
                      {count} article{count !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <Accordion flush onClick={(e) => e.stopPropagation()}>
                    <Accordion.Item eventKey={goal.id.toString()}>
                      <Accordion.Header style={{ fontSize: '0.9rem' }}>
                        Preview Details
                      </Accordion.Header>
                      <Accordion.Body style={{ fontSize: '0.85rem' }}>
                        <h6>Key Targets:</h6>
                        <ul>
                          {goal.targets.slice(0, 2).map((target, index) => (
                            <li key={index}>{target}</li>
                          ))}
                        </ul>
                        
                        <h6 className="mt-3">USM-KCC Initiatives:</h6>
                        <ul>
                          {goal.usmInitiatives.slice(0, 2).map((initiative, index) => (
                            <li key={index}>{initiative}</li>
                          ))}
                        </ul>
                        <div className="text-center mt-2">
                          <small className="text-muted">Click anywhere on card for full details</small>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default SDGHub;