import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion, Badge, Tab, Tabs } from 'react-bootstrap';

const Scholarship = () => {
  const [key, setKey] = useState('available');

  // Sample scholarship data
  const availableScholarships = [
    {
      id: 1,
      title: 'Academic Excellence Scholarship',
      provider: 'USM-KCC Administration',
      deadline: 'August 15, 2025',
      benefits: 'Full tuition fee waiver + monthly stipend',
      eligibility: 'Incoming freshmen with at least 95% average grade',
      status: 'open',
      type: 'academic'
    },
    {
      id: 2,
      title: 'Science and Technology Scholarship',
      provider: 'DOST Region XII',
      deadline: 'July 30, 2025',
      benefits: 'Tuition fees + book allowance + monthly stipend',
      eligibility: 'STEM students with at least 88% average grade',
      status: 'open',
      type: 'government'
    },
    {
      id: 3,
      title: 'Athletic Scholarship',
      provider: 'USM-KCC Sports Office',
      deadline: 'Ongoing',
      benefits: '50-100% tuition discount',
      eligibility: 'Varsity players in university-sanctioned sports',
      status: 'open',
      type: 'sports'
    },
    {
      id: 4,
      title: 'Cultural Scholarship',
      provider: 'USM-KCC Culture and Arts Office',
      deadline: 'August 5, 2025',
      benefits: '30-70% tuition discount',
      eligibility: 'Students with exceptional talent in cultural arts',
      status: 'open',
      type: 'arts'
    }
  ];

  const upcomingScholarships = [
    {
      id: 5,
      title: 'Alumni Association Scholarship',
      provider: 'USM-KCC Alumni Association',
      deadline: 'October 2025',
      benefits: 'Partial tuition assistance',
      eligibility: 'All students with at least 85% average grade',
      status: 'upcoming',
      type: 'private'
    },
    {
      id: 6,
      title: 'Local Government Scholarship',
      provider: 'City Government of Kidapawan',
      deadline: 'November 2025',
      benefits: 'Full tuition + miscellaneous fees',
      eligibility: 'Kidapawan residents with financial need',
      status: 'upcoming',
      type: 'government'
    }
  ];

  const scholarshipTypes = [
    {
      type: 'academic',
      title: 'Academic Scholarships',
      icon: 'fas fa-graduation-cap',
      description: 'Awarded to students with outstanding academic performance and potential.'
    },
    {
      type: 'government',
      title: 'Government Scholarships',
      icon: 'fas fa-landmark',
      description: 'Funded by national and local government agencies for qualified students.'
    },
    {
      type: 'private',
      title: 'Private Scholarships',
      icon: 'fas fa-hand-holding-heart',
      description: 'Sponsored by private organizations, corporations, and individual donors.'
    },
    {
      type: 'sports',
      title: 'Athletic Scholarships',
      icon: 'fas fa-running',
      description: 'For students who excel in sports and represent the university in competitions.'
    },
    {
      type: 'arts',
      title: 'Culture & Arts Scholarships',
      icon: 'fas fa-palette',
      description: 'For students with exceptional talent in visual, performing, or literary arts.'
    },
    {
      type: 'need-based',
      title: 'Need-Based Scholarships',
      icon: 'fas fa-hands-helping',
      description: 'Designed to support students from economically disadvantaged backgrounds.'
    }
  ];

  const applicationProcess = [
    {
      step: 1,
      title: 'Check Eligibility',
      description: 'Review the requirements and criteria for each scholarship program.',
      icon: 'fas fa-clipboard-check'
    },
    {
      step: 2,
      title: 'Prepare Documents',
      description: 'Gather all necessary documents (grades, certificates, income statements, etc.).',
      icon: 'fas fa-file-alt'
    },
    {
      step: 3,
      title: 'Submit Application',
      description: 'Complete the application form and submit before the deadline.',
      icon: 'fas fa-paper-plane'
    },
    {
      step: 4,
      title: 'Interview & Assessment',
      description: 'Attend interviews or examinations if required by the scholarship provider.',
      icon: 'fas fa-comments'
    },
    {
      step: 5,
      title: 'Acceptance',
      description: 'Receive notification and complete any final requirements.',
      icon: 'fas fa-award'
    }
  ];

  const getBadgeVariant = (type) => {
    switch(type) {
      case 'academic': return 'primary';
      case 'government': return 'success';
      case 'private': return 'info';
      case 'sports': return 'warning';
      case 'arts': return 'purple';
      default: return 'secondary';
    }
  };

  const ScholarshipCard = ({ scholarship }) => (
    <Card className="h-100 border-0 shadow-sm mb-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="text-usmkc-blue">{scholarship.title}</h5>
          <Badge bg={getBadgeVariant(scholarship.type)} className="text-capitalize">
            {scholarship.type}
          </Badge>
        </div>
        <p className="text-muted mb-2">
          <i className="fas fa-university me-2"></i>
          {scholarship.provider}
        </p>
        <p className="text-muted mb-3">
          <i className="fas fa-clock me-2"></i>
          Deadline: {scholarship.deadline}
        </p>
        <p className="mb-3">
          <strong>Benefits:</strong> {scholarship.benefits}
        </p>
        <p className="mb-3">
          <strong>Eligibility:</strong> {scholarship.eligibility}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="outline-usmkc" size="sm">View Details</Button>
          <Button variant="usmkc" size="sm">Apply Now</Button>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="scholarship-hero py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold text-usmkc-green mb-3">Scholarship Programs</h1>
              <p className="lead mb-4">
                Investing in your future through various scholarship opportunities. Find financial support to achieve your academic goals at USM-KCC.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button variant="usmkc" size="lg">Apply for Scholarship</Button>
                <Button variant="outline-usmkc" size="lg">Check Requirements</Button>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="/images/scholarship/scholarship-hero.jpg" 
                alt="Students receiving scholarship" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Scholarship Types */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-usmkc-blue">Types of Scholarships</h2>
              <p className="lead">Explore various financial assistance programs available</p>
              <div className="d-flex justify-content-center">
                <div style={{ 
                  width: '80px', 
                  height: '3px', 
                  backgroundColor: '#1a3d7c',
                  marginBottom: '30px'
                }}></div>
              </div>
            </Col>
          </Row>
          
          <Row>
            {scholarshipTypes.map((type, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 border-0 text-center shadow-sm">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      <i className={`${type.icon} text-usmkc-green`} style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="text-usmkc-blue">{type.title}</h5>
                    <p className="text-muted">{type.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Available Scholarships */}
      <section className="py-5" style={{ backgroundColor: 'rgba(248, 249, 250, 0.85)' }}>
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-usmkc-green">Available Scholarships</h2>
              <p className="lead">Current opportunities for application</p>
              <div className="d-flex justify-content-center">
                <div style={{ 
                  width: '80px', 
                  height: '3px', 
                  backgroundColor: '#02570b',
                  marginBottom: '30px'
                }}></div>
              </div>
            </Col>
          </Row>
          
          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-4 justify-content-center"
            fill
          >
            <Tab eventKey="available" title="Currently Available">
              <Row className="mt-4">
                {availableScholarships.map(scholarship => (
                  <Col lg={6} key={scholarship.id}>
                    <ScholarshipCard scholarship={scholarship} />
                  </Col>
                ))}
              </Row>
            </Tab>
            <Tab eventKey="upcoming" title="Upcoming Scholarships">
              <Row className="mt-4">
                {upcomingScholarships.map(scholarship => (
                  <Col lg={6} key={scholarship.id}>
                    <ScholarshipCard scholarship={scholarship} />
                  </Col>
                ))}
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </section>

      {/* Application Process */}
      <section className="py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-usmkc-blue">Application Process</h2>
              <p className="lead">How to apply for scholarships at USM-KCC</p>
              <div className="d-flex justify-content-center">
                <div style={{ 
                  width: '80px', 
                  height: '3px', 
                  backgroundColor: '#1a3d7c',
                  marginBottom: '30px'
                }}></div>
              </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            {applicationProcess.map((step, index) => (
              <Col lg={2} md={4} sm={6} key={index} className="mb-4">
                <div className="text-center">
                  <div className="step-number mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle bg-usmkc-green text-white" 
                    style={{ width: '60px', height: '60px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {step.step}
                  </div>
                  <div className="step-icon mb-3">
                    <i className={`${step.icon} text-usmkc-blue`} style={{ fontSize: '2rem' }}></i>
                  </div>
                  <h6 className="text-usmkc-blue">{step.title}</h6>
                  <p className="small text-muted">{step.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5" style={{ backgroundColor: 'rgba(248, 249, 250, 0.85)' }}>
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="text-usmkc-green">Frequently Asked Questions</h2>
              <p className="lead">Find answers to common questions about scholarships</p>
              <div className="d-flex justify-content-center">
                <div style={{ 
                  width: '80px', 
                  height: '3px', 
                  backgroundColor: '#02570b',
                  marginBottom: '30px'
                }}></div>
              </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Who can apply for scholarships at USM-KCC?</Accordion.Header>
                  <Accordion.Body>
                    Scholarships are available to incoming freshmen, continuing students, and graduate students. Eligibility criteria vary by scholarship program but generally include academic performance, financial need, special talents, or specific demographic qualifications.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>What documents are typically required?</Accordion.Header>
                  <Accordion.Body>
                    Common requirements include: accomplished application form, certified true copy of grades, certificate of good moral character, proof of income or tax returns, and any specific documents required by the scholarship provider.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Can I apply for multiple scholarships?</Accordion.Header>
                  <Accordion.Body>
                    Yes, students may apply for multiple scholarships. However, most programs do not allow stacking of full tuition scholarships. If awarded multiple scholarships, the Financial Aid Office will help determine the best combination.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>How are scholarship recipients selected?</Accordion.Header>
                  <Accordion.Body>
                    Selection processes vary but typically involve evaluation of academic records, financial need assessments, interviews, examinations, or talent auditions. Each scholarship program has its own selection committee.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>What are the maintaining requirements?</Accordion.Header>
                  <Accordion.Body>
                    Most scholarships require recipients to maintain a certain grade point average (usually 85% or higher), carry a full course load, and remain in good disciplinary standing. Specific requirements are outlined in the scholarship agreement.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-5 bg-usmkc text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h3>Need Help With Your Scholarship Application?</h3>
              <p className="lead mb-0">
                Contact our Financial Aid Office for assistance and guidance.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
              <Button variant="light" size="lg">
                <i className="fas fa-envelope me-2"></i>
                Contact Us
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .scholarship-hero {
          background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/images/scholarship/scholarship-bg.jpg');
          background-size: cover;
          background-position: center;
        }
        .bg-usmkc {
          background-color: #1a3d7c !important;
        }
        .step-number {
          transition: all 0.3s ease;
        }
        .step-number:hover {
          transform: scale(1.1);
          background-color: #1a3d7c !important;
        }
        .purple {
          background-color: #6f42c1 !important;
          color: white;
        }
        .nav-link.active {
          background-color: #02570b !important;
          color: white !important;
          border-color: #02570b !important;
        }
        .nav-link {
          color: #02570b !important;
        }
      `}</style>
    </>
  );
};

export default Scholarship;