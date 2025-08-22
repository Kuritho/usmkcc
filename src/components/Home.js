import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NewsCard from './NewsCard';

const Home = () => {
  const navigate = useNavigate();
  
  // Sample news data
  const news = [
    {
      id: 1,
      title: 'USM-KCC Groundbreaking ceremony for new buildings',
      excerpt: 'The University of Southern Mindanao - Kidapawan City Campus is proud to announce...',
      date: 'June 20, 2025',
      image: "/images/news1.jpg",
      link: "https://www.usm.edu.ph/usm-kcc-to-open-two-new-buildings/"
    },
    {
      id: 2,
      title: 'USM Leaders Join UPLB HELM Fellowship',
      excerpt: 'To support leadership development in higher education, two officials from the University of Southern Mindanao participated in the UP Los Baños Higher Education Leadership Mentoring (HELM)...',
      date: 'June 5, 2025',
      image: "/images/news2.jpg",
      link: "https://www.usm.edu.ph/usm-leaders-join-uplb-helm-fellowship/"
    },
    {
      id: 3,
      title: 'USM Students Receive Cash Assistance from TDP',
      excerpt: 'The Tulong Dunong Program (TDP) beneficiaries of the University of Southern Mindanao (USM) once again received their ₱7500 worth of cash assistance through the Provincial Government...',
      date: 'June 23, 2025',
      image: '/images/news3.jpg',
      link: "https://www.usm.edu.ph/usm-students-receive-cash-assistance-from-tdp/"
    }
  ];

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: 'Graduate School Enrollment – First Semester, Academic Year 2025–2026',
      excerpt: 'All incoming students are encouraged to submit their admission requirements prior to July 14, 2025 to facilitate timely processing...',
      date: 'June 18, 2025',
      image: "/images/announcement/enrollmentgradschool.jpg",
      link: "#"
    },
    {
      id: 2,
      title: 'ENROLLMENT SCHEDULE UPDATE',
      excerpt: '1st Semester A.Y. 2025-2026, July 15, 2025- August 1, 2025 Open Enrollment (Face to Face) for irregular, returning students, and shifters...',
      date: 'June 10, 2025',
      image: "/images/announcement/enrollmentupdate.jpg",
      link: "#"
    },
    {
      id: 3,
      title: '𝗔𝗹𝗹 𝗶𝗻𝗰𝗼𝗺𝗶𝗻𝗴 𝗳𝗿𝗲𝘀𝗵𝗺𝗲𝗻 𝗼𝗳 𝗨𝗦𝗠-𝗞𝗖𝗖 𝘂𝗻𝗱𝗲𝗿 𝘁𝗵𝗲 𝗖𝗼𝗹𝗹𝗲𝗴𝗲 𝗼𝗳 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻, 𝗔𝗿𝘁𝘀, 𝗮𝗻𝗱 𝗦𝗰𝗶𝗲𝗻𝗰𝗲𝘀 (𝗖𝗘𝗔𝗦)',
      excerpt: 'Those who have 𝗽𝗿𝗲-𝗿𝗲𝗴𝗶𝘀𝘁𝗲𝗿𝗲𝗱 𝗳𝗿𝗲𝘀𝗵𝗺𝗲𝗻 𝘀𝘁𝘂𝗱𝗲𝗻𝘁𝘀 𝘁𝗵𝗿𝗼𝘂𝗴𝗵 𝗼𝗻𝗹𝗶𝗻𝗲, kindly comply with all the needed requirements to complete your enrollment process...',
      date: 'June 22, 2025',
      image: '/images/announcement/enrollmentupdatefresh.jpg',
      link: "#"
    }
  ];

  // Quick links data
  const quickLinks = [
    { name: 'Student Portal', icon: 'fas fa-user-graduate', url: '#' },
    { name: 'Faculty Portal', icon: 'fas fa-chalkboard-teacher', url: '#' },
    { name: 'Online Registration', icon: 'fas fa-file-signature', url: '#' },
    { name: 'Library', icon: 'fas fa-book', url: '#' },
    { name: 'Research Portal', icon: 'fas fa-flask', url: '#' },
    { name: 'Alumni Services', icon: 'fas fa-user-friends', url: '#' }
  ];

  return (
    <>
      {/* Hero Section - Preserved from original */}
      <section className="hero-section">
        <Container className="ms-auto" style={{ maxWidth: "1500px" }}>
          <h1>Welcome to</h1>
          <h1>University of Southern Mindanao - Kidapawan City Campus</h1>
          <p>Excellence | Service | Leadership</p>
          <Button variant="usmkc" size="lg" className="mt-3">Explore Our Programs</Button>
        </Container>
      </section>

      {/* News and Announcements Section - Redesigned */}
      <section className="py-5" style={{ background: 'rgba(248, 249, 250, 0.85)' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="text-center text-usmkc-green mb-3">Campus Updates</h2>
              <div className="d-flex justify-content-center">
                <div style={{ 
                  width: '80px', 
                  height: '3px', 
                  backgroundColor: '#02570b',
                  marginBottom: '20px'
                }}></div>
              </div>
            </Col>
          </Row>
          
          <Row>
            {/* News Section */}
            <Col lg={6} className="mb-5 mb-lg-0">
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-usmkc-green p-2 rounded me-3">
                      <i className="fas fa-newspaper text-white"></i>
                    </div>
                    <h3 className="mb-0 text-usmkc-green">News & Events</h3>
                  </div>
                  
                  <div className="news-container">
                    {news.map(item => (
                      <NewsCard 
                        key={item.id}
                        title={item.title}
                        excerpt={item.excerpt}
                        date={item.date}
                        image={item.image}
                        link={item.link}
                        type="news"
                      />
                    ))}
                  </div>
                </Card.Body>
                
                <Card.Footer className="bg-transparent border-0 text-center pt-0">
                  <Button 
                    variant="outline-usmkc-green" 
                    size="lg"
                    as="a" 
                    href="https://www.usm.edu.ph"
                    className="px-4"
                  >
                    View All News <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>

            {/* Announcements Section */}
            <Col lg={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-usmkc-green p-2 rounded me-3">
                      <i className="fas fa-bullhorn text-white"></i>
                    </div>
                    <h3 className="mb-0 text-usmkc-green">Announcements</h3>
                  </div>
                  
                  <div className="announcements-container">
                    {announcements.map(item => (
                      <NewsCard 
                        key={item.id}
                        title={item.title}
                        excerpt={item.excerpt}
                        date={item.date}
                        image={item.image}
                        link={item.link}
                        type="announcement"
                      />
                    ))}
                  </div>
                </Card.Body>
                
                <Card.Footer className="bg-transparent border-0 text-center pt-0">
                  <Button 
                    variant="outline-usmkc-green" 
                    size="lg"
                    as="a" 
                    href="#"
                    className="px-4"
                  >
                    View All Announcements <i className="fas fa-arrow-right ms-2"></i>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links Center - Redesigned */}
      <section className="py-5" style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="text-center text-usmkc-green mb-3">Quick Links Center</h2>
              <div className="d-flex justify-content-center">
                <div style={{ 
                  width: '80px', 
                  height: '3px', 
                  backgroundColor: '#1a3d7c',
                  marginBottom: '20px'
                }}></div>
              </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center align-items-center">
            {/* Infographic Cards */}
            <Col lg={5} className="mb-4 mb-lg-0">
              <Row className="g-4">
                <Col md={6}>
                  <Card 
                    onClick={() => navigate('/sdg-hub')}
                    className="border-0 shadow-sm h-100"
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <Card.Header className="bg-usmkc-blue text-white text-center py-3">
                      <h4 className="mb-0">SDG Hub</h4>
                    </Card.Header>
                    <Card.Body className="text-center d-flex flex-column">
                      <div className="my-3">
                        <i className="fas fa-globe-americas text-usmkc-blue" style={{ fontSize: '2.5rem' }}></i>
                      </div>
                      <p>
                        Explore our commitment to the United Nations Sustainable Development Goals.
                      </p>
                      <Button 
                        variant="outline-usmkc-blue" 
                        className="mt-auto align-self-center"
                      >
                        Click here
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card 
                    onClick={() => navigate('/infographics')}
                    className="border-0 shadow-sm h-100"
                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <Card.Header className="bg-usmkc-yellow text-dark text-center py-3">
                      <h4 className="mb-0">InfoGraphics</h4>
                    </Card.Header>
                    <Card.Body className="text-center d-flex flex-column">
                      <div className="my-3">
                        <i className="fas fa-chart-bar text-usmkc-green" style={{ fontSize: '2.5rem' }}></i>
                      </div>
                      <p>
                        The Infographics page shows statistics related to the university.
                      </p>
                      <Button 
                        variant="outline-usmkc-green" 
                        className="mt-auto align-self-center"
                      >
                        Click here
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            
            {/* Quick Links */}
            <Col lg={7}>
              <Row className="g-4">
                {quickLinks.map((link, index) => (
                  <Col md={4} sm={6} key={index}>
                    <Card 
                      as="a" 
                      href={link.url}
                      className="border-0 shadow-sm h-100 quick-link-card"
                      style={{ transition: 'all 0.3s' }}
                    >
                      <Card.Body className="text-center p-4 d-flex flex-column">
                        <div className="quick-link-icon mb-3">
                          <i className={`${link.icon} text-usmkc-green`} style={{ fontSize: '2rem' }}></i>
                        </div>
                        <h5 className="text-usmkc-blue">{link.name}</h5>
                        <div className="quick-link-arrow mt-auto pt-3">
                          <i className="fas fa-arrow-right text-usmkc-blue"></i>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Mission and Vision - Preserved from original */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Card className="h-100">
                <Card.Header className="bg-usmkc-yellow">
                  <Card.Title className="text-center text-black">Vision</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex align-items-center">
                  <Card.Text className="text-center">
                    Quality and relevant education for its clientele to be globally competitive, culture-sensitive and morally responsive human resources for sustainable development.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100">
                <Card.Header className="bg-usmkc-green">
                  <Card.Title className="text-center text-white">Mission</Card.Title>
                </Card.Header>
                <Card.Body className="d-flex align-items-center">
                  <Card.Text className="text-center">
                    Help accelerate socio-economic development, promote harmony among diverse communities and improve quality of life through instruction, research, extension and resource generation in Southern Philippines.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Add your CSS in your stylesheet */}
      <style jsx>{`
        .hero-section {
          /* Your existing hero section styles */
          /* Preserved exactly as in your original */
        }
        
        .news-container, .announcements-container {
          background: #fff;
          border-radius: 8px;
        }
        
        .quick-link-card {
          transition: all 0.3s;
        }
        
        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        .quick-link-icon {
          transition: all 0.3s;
        }
        
        .quick-link-card:hover .quick-link-icon {
          transform: scale(1.1);
        }
        
        .quick-link-arrow {
          opacity: 0;
          transition: all 0.3s;
        }
        
        .quick-link-card:hover .quick-link-arrow {
          opacity: 1;
          transform: translateX(5px);
        }
      `}</style>
    </>
  );
};

export default Home;