import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import NewsCard from './NewsCard';

const Home = () => {
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

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1>Welcome to</h1>
          <h1>University of Southern Mindanao - Kidapawan City Campus</h1>
          {/* <p className="lead">University of Southern Mindanao - Kidapawan City Campus</p> */}
          <p>Excellence | Service | Leadership</p>
          <Button variant="usmkc" size="lg" className="mt-3">Explore Our Programs</Button>
        </Container>
      </section>
      {/* Quick Links */}
      <section className="py-5">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4 mb-md-0">
              <Card>
                <Card.Header className="bg-usmkc-green text-white">
                  <i className="fas fa-graduation-cap fa-3x mb-2"></i>
                  <Card.Title>Academics</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    Explore our wide range of academic programs designed for your success.
                  </Card.Text>
                  <Button variant="usmkc" as="a" href="/academics">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <Card>
                <Card.Header className="bg-usmkc-yellow text-black">
                  <i className="fas fa-user-graduate fa-3x mb-2"></i>
                  <Card.Title>Admission</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    Learn about our admission process and requirements for new students.
                  </Card.Text>
                  <Button variant="usmkc" as="a" href="/admission">Apply Now</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <Card>
                <Card.Header className="bg-usmkc-green text-white">
                  <i className="fas fa-flask fa-3x mb-2"></i>
                  <Card.Title>Research</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    Discover our research initiatives and opportunities for collaboration.
                  </Card.Text>
                  <Button variant="usmkc" as="a" href="/research">View Research</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Header className="bg-usmkc-yellow text-black">
                  <i className="fas fa-calendar-alt fa-3x mb-2"></i>
                  <Card.Title>Events</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    Stay updated with upcoming events, seminars, and university activities.
                  </Card.Text>
                  <Button variant="usmkc" as="a" href="/events">View Calendar</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News and Updates */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 text-usmkc-green">News and Updates</h2>
          <Row>
            {news.map(item => (
              <Col key={item.id} md={4} className="mb-4">
                <NewsCard 
                  title={item.title}
                  excerpt={item.excerpt}
                  date={item.date}
                  image={item.image}
                  link={item.link}
                />
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button 
              variant="outline-usmkc-green" 
              size="lg"
              as="a" 
              href="https://www.usm.edu.ph/usmians/news/page/4/#:~:text=USM%20Students%20Receive%20Cash%20Assistance,Do%20you%20like%20it?"
            >
              View All News
            </Button>
          </div>
        </Container>
      </section>

      {/* Mission and Vision */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Card className="h-100">
                <Card.Header className="bg-usmkc-yellow">
                  <Card.Title className="text-center text-black">Our Vision</Card.Title>
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
                  <Card.Title className="text-center text-white">Our Mission</Card.Title>
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
    </>
  );
};

export default Home;