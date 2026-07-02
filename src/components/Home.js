import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import NewsCard from './NewsCard';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  
  // Sample news data
  const news = [
    {
      id: 1,
      title: 'USM – KIDAPAWAN CITY CAMPUS HONORS EXCELLENCE AT  25TH RECOGNITION DAY AND GAWAD PARANGAL',
      excerpt: 'The University of Southern Mindanao–Kidapawan City Campus celebrated its 25th Recognition Day and Gawad Parangal on April 23 at the campus covered court...',
      date: 'April 23, 2026',
      image: "/images/news1.jpg",
      link: "/news/1"
    },
    {
      id: 2,
      title: 'USM–KCC, DTI XII Formalize FABLAB Management Turnover, Sign Deed of Donation of SSF Equipment',
      excerpt: 'The University of Southern Mindanao, in partnership with the Department of Trade and Industry (DTI) Region XI...',
      date: 'April 6, 2026',
      image: "/images/news2.jpg",
      link: "/news/2"
    },
    {
      id: 3,
      title: 'USM–KCC Conducts Mock Board for Graduating Education Students, Launches Free LET Review Program',
      excerpt: 'The University of Southern Mindanao – Kidapawan City Campus (USM–KCC), through the College of Education, Arts, and Sciences (CEAS), successfully conducted a Mock Board Examination for 349 graduating students...',
      date: 'April 15, 2026',
      image: '/images/news3.jpg',
      link: "/news/3"
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

  // Quick links data – two new links added
  const quickLinks = [
    { name: 'Student Portal', icon: 'fas fa-user-graduate', url: 'https://studentportal.usm.edu.ph/' },
    { name: 'Faculty Portal', icon: 'fas fa-chalkboard-teacher', url: '#' },
    { name: 'Online Registration', icon: 'fas fa-file-signature', url: '#' },
    { name: 'Library', icon: 'fas fa-book', url: '#' },
    { name: 'Research Portal', icon: 'fas fa-flask', url: '#' },
    { name: 'Alumni Services', icon: 'fas fa-user-friends', url: '#' },
    { name: 'Get USM Email', icon: 'fas fa-envelope', url: 'https://getmail.usm.edu.ph/' },
    { name: 'USM College Entrance Exam', icon: 'fas fa-clipboard-list', url: 'https://cee.usm.edu.ph/' }
  ];

  // Hero carousel images
  const heroImages = [
    {
      id: 1,
      src: process.env.PUBLIC_URL + "/images/adminbuilding.jpg",
      alt: "USM-KCC Campus",
      caption: "A Premier Educational Institution in Mindanao"
    },
    {
      id: 2,
      src: process.env.PUBLIC_URL + "/images/sciencebuilding.jpg",
      alt: "Students at USM-KCC",
      caption: "Nurturing Future Leaders"
    },
    {
      id: 3,
      src: process.env.PUBLIC_URL + "/images/maingate.jpg",
      alt: "Graduation Ceremony",
      caption: "Celebrating Academic Excellence"
    }
  ];

  return (
    <>
      {/* Hero Section - Redesigned with Carousel */}
      <section className="hero-section position-relative">
        <Carousel fade controls={false} indicators={true} interval={5000}>
          {heroImages.map((image) => (
            <Carousel.Item key={image.id}>
              <div 
                className={`d-block w-100 ${styles.heroSlide}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${image.src})`,
                }}
              ></div>
              <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className="hero-content text-center">
                  <h1 className="display-4 fw-bold mb-3 text-white">Welcome to</h1>
                  <h2 className="display-5 fw-bold mb-3 text-white">University of Southern Mindanao - Kidapawan City Campus</h2>
                  <p className="lead mb-4 text-light">Excellence | Service | Leadership</p>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <Link to="/academics">
                      <button variant="light" size="lg" className="px-4 py-2 rounded-pill fw-semibold btn btn-light btn-lg">
                        Explore Our Programs
                      </button>
                    </Link>
                    {/* <Link to="/apply">
                      <button variant="outline-light" size="lg" className="px-4 py-2 rounded-pill fw-semibold btn btn-outline-light btn-lg">
                        Apply Now
                      </button>
                    </Link> */}
                  </div>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Quick Stats - Moved below the hero section */}
      <section className="bg-usmkc-green py-4">
        <Container>
          <Row className="text-center text-white">
            <Col md={3} className="border-end border-white">
              <h4 className="fw-bold mb-0">20+</h4>
              <p className="mb-0 text-light">Academic Programs</p>
            </Col>
            <Col md={3} className="border-end border-white">
              <h4 className="fw-bold mb-0">4,000+</h4>
              <p className="mb-0 text-light">Students</p>
            </Col>
            <Col md={3} className="border-end border-white">
              <h4 className="fw-bold mb-0">100+</h4>
              <p className="mb-0 text-light">Faculty Members</p>
            </Col>
            <Col md={3}>
              <h4 className="fw-bold mb-0">25+</h4>
              <p className="mb-0 text-light">Years of Excellence</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News and Announcements Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col>
              <div className="text-center">
                <h2 className="section-title position-relative d-inline-block mb-4">Campus Updates</h2>
                <p className="text-muted">Stay informed with the latest news and announcements from USM-KCC</p>
              </div>
            </Col>
          </Row>
          
          <Row>
            {/* News Section */}
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="d-flex align-items-center mb-4">
                <div className="bg-usmkc-green p-3 rounded-circle me-3">
                  <i className="fas fa-newspaper text-white fa-lg"></i>
                </div>
                <h3 className="mb-0 text-usmkc-green fw-bold">News & Events</h3>
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
              
              <div className="text-center mt-4">
                <Button 
                  variant="outline-usmkc-green" 
                  size="lg"
                  onClick={() => navigate('/campus-updates')}
                  className="px-4 rounded-pill"
                >
                  View All News <i className="fas fa-arrow-right ms-2"></i>
                </Button>
              </div>
            </Col>

            {/* Announcements Section */}
            <Col lg={6}>
              <div className="d-flex align-items-center mb-4">
                <div className="bg-usmkc-blue p-3 rounded-circle me-3">
                  <i className="fas fa-bullhorn text-white fa-lg"></i>
                </div>
                <h3 className="mb-0 text-usmkc-blue fw-bold">Announcements</h3>
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
              
              <div className="text-center mt-4">
                <Button 
                  variant="outline-usmkc-blue" 
                  size="lg"
                  onClick={() => navigate('/campus-updates')}
                  className="px-4 rounded-pill"
                >
                  View All Announcements <i className="fas fa-arrow-right ms-2"></i>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Quick Links Center - Redesigned with Borders */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col>
              <div className="text-center">
                <h2 className="section-title position-relative d-inline-block mb-4">Quick Access</h2>
                <p className="text-muted">Easy navigation to important campus resources</p>
              </div>
            </Col>
          </Row>
          
          <Row className="g-4">
            {/* Quick Links - now includes 8 items */}
            {quickLinks.map((link, index) => (
              <Col lg={4} md={6} key={index}>
                <Card 
                  as="a" 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-100 quick-link-card text-decoration-none"
                  style={{ 
                    border: '2px solid #02570b',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }}
                >
                  <Card.Body className="text-center p-4 d-flex flex-column align-items-center">
                    <div 
                      className="quick-link-icon mb-3 bg-usmkc-green p-3 rounded-circle"
                      style={{ border: '2px solid #02570b' }}
                    >
                      <i className={`${link.icon} text-white fa-2x`}></i>
                    </div>
                    <h5 className="text-usmkc-blue mb-0">{link.name}</h5>
                    <div className="quick-link-arrow mt-3">
                      <i className="fas fa-arrow-right text-usmkc-green"></i>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            
            {/* SDG Hub Card */}
            <Col lg={4} md={6}>
              <Card 
                onClick={() => navigate('/sdg-hub')}
                className="h-100 quick-link-card"
                style={{ 
                  cursor: 'pointer',
                  border: '2px solid #1a3d7c',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              >
                <Card.Body className="text-center p-4 d-flex flex-column">
                  <div 
                    className="bg-usmkc-blue p-3 rounded-circle d-inline-block mb-3 mx-auto"
                    style={{ border: '2px solid #1a3d7c' }}
                  >
                    <i className="fas fa-globe-americas text-white fa-2x"></i>
                  </div>
                  <h4 className="text-usmkc-blue mb-3">SDG Hub</h4>
                  <p className="flex-grow-1">
                    Explore our commitment to the United Nations Sustainable Development Goals.
                  </p>
                  <Button 
                    variant="outline-usmkc-blue" 
                    className="rounded-pill mt-2"
                    style={{ border: '2px solid' }}
                  >
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            {/* InfoGraphics Card */}
            {/* <Col lg={4} md={6}>
              <Card 
                onClick={() => navigate('/infographics')}
                className="h-100 quick-link-card"
                style={{ 
                  cursor: 'pointer',
                  border: '2px solid #02570b',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              >
                <Card.Body className="text-center p-4 d-flex flex-column">
                  <div 
                    className="bg-usmkc-green p-3 rounded-circle d-inline-block mb-3 mx-auto"
                    style={{ border: '2px solid #02570b' }}
                  >
                    <i className="fas fa-chart-bar text-white fa-2x"></i>
                  </div>
                  <h4 className="text-usmkc-green mb-3">InfoGraphics</h4>
                  <p className="flex-grow-1">
                    The Infographics page shows statistics related to the university.
                  </p>
                  <Button 
                    variant="outline-usmkc-green" 
                    className="rounded-pill mt-2"
                    style={{ border: '2px solid' }}
                  >
                    View Data
                  </Button>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col>
              <div className="text-center">
                <h2 className="section-title position-relative d-inline-block mb-4">Upcoming Events</h2>
                <p className="text-muted">Mark your calendars for these important dates</p>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card className="border-0 shadow-sm h-100 event-card">
                <div className="event-date bg-usmkc-green text-white text-center p-2">
                  <h5 className="mb-0">JUL 15</h5>
                  <small>2025</small>
                </div>
                <Card.Img variant="top" src="/images/event-enrollment.jpg" />
                <Card.Body>
                  <Card.Title>Enrollment Period</Card.Title>
                  <Card.Text>
                    1st Semester A.Y. 2025-2026 enrollment for all students begins.
                  </Card.Text>
                  <Button variant="outline-usmkc-green" size="sm">More Info</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="border-0 shadow-sm h-100 event-card">
                <div className="event-date bg-usmkc-blue text-white text-center p-2">
                  <h5 className="mb-0">AUG 15</h5>
                  <small>2025</small>
                </div>
                <Card.Img variant="top" src="/images/event-orientation.jpg" />
                <Card.Body>
                  <Card.Title>Freshman Orientation</Card.Title>
                  <Card.Text>
                    Welcome event for incoming freshman students of A.Y. 2025-2026.
                  </Card.Text>
                  <Button variant="outline-usmkc-blue" size="sm">More Info</Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card className="border-0 shadow-sm h-100 event-card">
                <div className="event-date bg-usmkc-yellow text-dark text-center p-2">
                  <h5 className="mb-0">SEP 1</h5>
                  <small>2025</small>
                </div>
                <Card.Img variant="top" src="/images/event-foundation.jpg" />
                <Card.Body>
                  <Card.Title>Foundation Day</Card.Title>
                  <Card.Text>
                    Join us as we celebrate the university's founding anniversary.
                  </Card.Text>
                  <Button variant="outline-usmkc-yellow" size="sm">More Info</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <div className="text-center mt-4">
            <Button 
              variant="usmkc-green" 
              size="lg" 
              onClick={() => navigate('/upcoming-events')}
              className="px-4 rounded-pill"
            >
              View All Events
            </Button>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      {/* <section className="py-5 bg-usmkc-green text-white">
        <Container>
          <Row className="align-items-center">
            <Col md={8}>
              <h3 className="fw-bold mb-3">Ready to start your journey at USM-KCC?</h3>
              <p className="mb-0 text-white">Apply now and become part of our growing community of scholars and leaders.</p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Link to="/apply">
                <Button variant="light" size="lg" className="me-2 rounded-pill px-4">
                  Apply Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline-light" size="lg" className="rounded-pill px-4">
                  Contact Us
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Inline styles */}
      <style jsx>{`
        .hero-section {
          overflow: hidden;
        }
        
        .hero-slide {
          position: relative;
        }
        
        .section-title:after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 3px;
          background-color: #02570b;
        }
        
        .quick-link-card {
          transition: all 0.3s ease;
        }
        
        .quick-link-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        .quick-link-icon {
          transition: all 0.3s ease;
        }
        
        .quick-link-card:hover .quick-link-icon {
          transform: scale(1.1);
          background-color: #1a3d7c !important;
        }
        
        .mission-vision-card {
          transition: all 0.3s ease;
        }
        
        .mission-vision-card:hover {
          transform: translateY(-5px);
        }
        
        .event-card {
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
        }
        
        .event-date {
          position: absolute;
          top: 15px;
          right: 15px;
          z-index: 1;
          border-radius: 5px;
          width: 60px;
        }
      `}</style>
    </>
  );
};

export default Home;