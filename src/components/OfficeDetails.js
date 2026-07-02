import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image, Breadcrumb } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

// USM-KCC color scheme
const usmGreen = '#02570B';
const usmLightGreen = '#1e5631';
const usmYellow = '#ffcc00';
const usmWhite = '#ffffff';

const officeData = {
  chancellor: {
    name: "Chancellor Office",
    description: "The central administrative office overseeing all campus operations.",
    contact: "064-200-1234",
    email: "chancellor@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Main Administration Building",
    staff: [
      { 
        name: "Dr. Ronielyn F. Pinsoy", 
        position: "Chancellor",
        image: "/images/staff/chancellor.jpg"
      },
      { 
        name: "Algin Mae A. Lagang", 
        position: "Executive Assistant",
        image: "/images/staff/executive-assistant.jpg"
      }
    ],
    services: [
      "University policy implementation",
      "Strategic planning",
      "External relations"
    ]
  },
  admission: {
    name: "Admission and Records Office",
    description: "Handles all student admissions, enrollment, and academic records.",
    contact: "064-200-1235",
    email: "kcc-registrar@usm.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Ground Floor, Administration Building",
    requirements: ["Form 138", "Good Moral Certificate", "2x2 ID Photo"],
    staff: [
      { 
        name: "John Smith", 
        position: "Admissions Officer",
        image: "/images/staff/admissions-officer.jpg"
      },
      { 
        name: "Sarah Johnson", 
        position: "Records Administrator",
        image: "/images/staff/records-admin.jpg"
      }
    ]
  },
  cashier: {
    name: "Cashier Office",
    description: "Handles all financial transactions including tuition fees and other payments.",
    contact: "064-200-1236",
    email: "cashier@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:30 AM - 4:30 PM",
    location: "Ground Floor, Administration Building",
    paymentMethods: ["Cash", "Check", "Bank Transfer"],
    staff: [
      { 
        name: "Robert Tan", 
        position: "Chief Cashier",
        image: "/images/staff/cashier-chief.jpg"
      },
      { 
        name: "Lisa Wong", 
        position: "Cashier",
        image: "/images/staff/cashier.jpg"
      }
    ]
  },
  instruction: {
    name: "Instruction Office",
    description: "Oversees academic programs, curriculum development, and faculty matters.",
    contact: "064-200-1237",
    email: "instruction@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Second Floor, Academic Building",
    staff: [
      { 
        name: "Dr. Maria Garcia", 
        position: "Dean of Instruction",
        image: "/images/staff/dean-instruction.jpg"
      },
      { 
        name: "Carlos Reyes", 
        position: "Academic Coordinator",
        image: "/images/staff/academic-coordinator.jpg"
      }
    ]
  },
  supply: {
    name: "Supply Office",
    description: "Manages procurement, inventory, and distribution of supplies and equipment.",
    contact: "064-200-1238",
    email: "supply@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Annex Building",
    staff: [
      { 
        name: "Antonio Cruz", 
        position: "Supply Officer",
        image: "/images/staff/supply-officer.jpg"
      },
      { 
        name: "Elena Mendoza", 
        position: "Inventory Clerk",
        image: "/images/staff/inventory-clerk.jpg"
      }
    ]
  },
  research: {
    name: "Research Office",
    description: "Coordinates research activities, grants, and publications.",
    contact: "064-200-1239",
    email: "research@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Research Center Building",
    staff: [
      { 
        name: "Dr. James Wilson", 
        position: "Research Director",
        image: "/images/staff/research-director.jpg"
      },
      { 
        name: "Emily Chen", 
        position: "Research Coordinator",
        image: "/images/staff/research-coordinator.jpg"
      }
    ]
  },
  accounting: {
    name: "Accounting Office",
    description: "Handles financial accounting, budgeting, and financial reporting.",
    contact: "064-200-1240",
    email: "cherrylou.abanilla@usm.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Administration Building",
    staff: [
      { 
        name: "Michael Lim", 
        position: "Chief Accountant",
        image: "/images/staff/chief-accountant.jpg"
      },
      { 
        name: "Grace Torres", 
        position: "Accounting Staff",
        image: "/images/staff/accounting-staff.jpg"
      }
    ]
  },
  hr: {
    name: "HRDM Office",
    description: "Manages human resources, recruitment, and employee relations.",
    contact: "064-200-1241",
    email: "usmkcchrmdo@usm.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "First Floor, Administration Building",
    staff: [
      { 
        name: "Patricia Gomez", 
        position: "HR Manager",
        image: "/images/staff/hr-manager.jpg"
      },
      { 
        name: "Daniel Kim", 
        position: "HR Officer",
        image: "/images/staff/hr-officer.jpg"
      }
    ]
  },
  'student-affairs': {
    name: "Office of Student Affairs",
    description: "Supports student welfare, activities, and discipline.",
    contact: "064-200-1242",
    email: "osa@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Student Center Building",
    staff: [
      { 
        name: "Jennifer Lee", 
        position: "Dean of Student Affairs",
        image: "/images/staff/dean-student-affairs.jpg"
      },
      { 
        name: "Mark Rodriguez", 
        position: "Student Activities Coordinator",
        image: "/images/staff/activities-coordinator.jpg"
      }
    ]
  },
  ict: {
    name: "Information, Communication and Technology Office",
    description: "Manages information and communication technology infrastructure and services.",
    contact: "064-200-1243",
    email: "ict@usmkcc.edu.ph",
    hours: "Monday-Friday, 8:00 AM - 5:00 PM",
    location: "Science Building",
    staff: [
      { 
        name: "Engr. Erwin C. Bolasa, ME-CpE", 
        position: "ICTO Director",
        image: "/images/faculty/bolasa.JPG"
      },
      { 
        name: "Kurt Brian D. Catulong", 
        position: "Information Systems Specialist I",
        image: "/images/staff/Kurt1.png"
      },
      { 
        name: "Reyco S. Arrogancia", 
        position: "IT Support Specialist",
        image: "/images/staff/reyco.jpg"
      }
    ]
  }
};

const OfficeDetails = () => {
  const { officeId } = useParams();
  const navigate = useNavigate();
  const office = officeData[officeId];

  if (!office) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm" style={{ borderColor: usmGreen, borderWidth: '2px' }}>
          <Card.Body className="text-center py-5">
            <Card.Title style={{ color: usmGreen, fontSize: '2rem' }}>Office Not Found</Card.Title>
            <Card.Text style={{ color: usmLightGreen, fontSize: '1.2rem' }}>
              The requested office could not be found.
            </Card.Text>
            <Button 
              variant="outline-primary" 
              onClick={() => navigate('/offices')}
              style={{
                borderColor: usmGreen,
                color: usmGreen,
                fontWeight: '600',
                padding: '8px 20px',
                marginTop: '20px'
              }}
            >
              Back to Offices
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4 office-details">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item onClick={() => navigate('/')} style={{ cursor: 'pointer', color: usmLightGreen }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate('/offices')} style={{ cursor: 'pointer', color: usmLightGreen }}>
          Offices
        </Breadcrumb.Item>
        <Breadcrumb.Item active style={{ color: usmGreen, fontWeight: '600' }}>
          {office.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Office Header */}
      <div 
        className="p-4 mb-4 rounded" 
        style={{ 
          backgroundColor: usmGreen,
          backgroundImage: 'linear-gradient(to right, #02570B, #1e5631)',
          color: usmWhite,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          backgroundColor: 'rgba(255, 204, 0, 0.1)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(255, 204, 0, 0.1)',
          borderRadius: '50%'
        }}></div>
        
        <h1 className="display-5 mb-3" style={{ position: 'relative', zIndex: 1 }}>
          {office.name}
        </h1>
        <p className="lead mb-0" style={{ position: 'relative', zIndex: 1 }}>
          {office.description}
        </p>
      </div>

      <Row>
        {/* Main Content Column */}
        <Col lg={8}>
          <Card className="mb-4 shadow-sm" style={{ borderColor: usmGreen }}>
            <Card.Header 
              style={{ 
                backgroundColor: usmWhite,
                borderBottom: `2px solid ${usmGreen}`,
                color: usmGreen,
                fontWeight: '600',
                fontSize: '1.2rem'
              }}
            >
              <i className="bi bi-info-circle-fill me-2" style={{ color: usmYellow }}></i>
              Office Information
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center">
                      <i className="bi bi-telephone-fill me-3" style={{ color: usmGreen, fontSize: '1.2rem' }}></i>
                      <div>
                        <div style={{ color: usmLightGreen, fontWeight: '500' }}>Contact Number</div>
                        <div style={{ color: usmGreen, fontWeight: '600' }}>{office.contact}</div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <i className="bi bi-envelope-fill me-3" style={{ color: usmGreen, fontSize: '1.2rem' }}></i>
                      <div>
                        <div style={{ color: usmLightGreen, fontWeight: '500' }}>Email Address</div>
                        <div style={{ color: usmGreen, fontWeight: '600' }}>{office.email}</div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill me-3" style={{ color: usmGreen, fontSize: '1.2rem' }}></i>
                      <div>
                        <div style={{ color: usmLightGreen, fontWeight: '500' }}>Location</div>
                        <div style={{ color: usmGreen, fontWeight: '600' }}>{office.location}</div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center">
                      <i className="bi bi-clock-fill me-3" style={{ color: usmGreen, fontSize: '1.2rem' }}></i>
                      <div>
                        <div style={{ color: usmLightGreen, fontWeight: '500' }}>Office Hours</div>
                        <div style={{ color: usmGreen, fontWeight: '600' }}>{office.hours}</div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Services/Requirements Section */}
          {office.services && (
            <Card className="mb-4 shadow-sm" style={{ borderColor: usmGreen }}>
              <Card.Header 
                style={{ 
                  backgroundColor: usmWhite,
                  borderBottom: `2px solid ${usmGreen}`,
                  color: usmGreen,
                  fontWeight: '600',
                  fontSize: '1.2rem'
                }}
              >
                <i className="bi bi-list-check me-2" style={{ color: usmYellow }}></i>
                Services Offered
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {office.services.map((service, i) => (
                    <ListGroup.Item key={i} className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill me-3" style={{ color: usmYellow }}></i>
                      <span style={{ color: usmLightGreen }}>{service}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}

          {office.requirements && (
            <Card className="mb-4 shadow-sm" style={{ borderColor: usmGreen }}>
              <Card.Header 
                style={{ 
                  backgroundColor: usmWhite,
                  borderBottom: `2px solid ${usmGreen}`,
                  color: usmGreen,
                  fontWeight: '600',
                  fontSize: '1.2rem'
                }}
              >
                <i className="bi bi-file-earmark-text-fill me-2" style={{ color: usmYellow }}></i>
                Requirements
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {office.requirements.map((req, i) => (
                    <ListGroup.Item key={i} className="d-flex align-items-center">
                      <i className="bi bi-file-earmark me-3" style={{ color: usmGreen }}></i>
                      <span style={{ color: usmLightGreen }}>{req}</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Sidebar Column */}
        <Col lg={4}>
          {/* Staff Members */}
          <Card className="mb-4 shadow-sm" style={{ borderColor: usmGreen }}>
            <Card.Header 
              style={{ 
                backgroundColor: usmWhite,
                borderBottom: `2px solid ${usmGreen}`,
                color: usmGreen,
                fontWeight: '600',
                fontSize: '1.2rem'
              }}
            >
              <i className="bi bi-people-fill me-2" style={{ color: usmYellow }}></i>
              Key Personnel
            </Card.Header>
            <Card.Body>
              {office.staff.map((person, i) => (
                <div key={i} className="d-flex mb-3 align-items-center">
                  <div className="me-3">
                    <Image 
                      src={person.image} 
                      roundedCircle 
                      width="60" 
                      height="60"
                      style={{ objectFit: 'cover', border: `2px solid ${usmYellow}` }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.png';
                      }}
                    />
                  </div>
                  <div>
                    <h6 className="mb-0" style={{ color: usmGreen }}>{person.name}</h6>
                    <small className="text-muted" style={{ color: usmLightGreen }}>{person.position}</small>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          {/* Quick Links */}
          <Card className="shadow-sm" style={{ borderColor: usmGreen }}>
            <Card.Header 
              style={{ 
                backgroundColor: usmWhite,
                borderBottom: `2px solid ${usmGreen}`,
                color: usmGreen,
                fontWeight: '600',
                fontSize: '1.2rem'
              }}
            >
              <i className="bi bi-link-45deg me-2" style={{ color: usmYellow }}></i>
              Quick Links
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item 
                  action 
                  className="d-flex align-items-center"
                  onClick={() => window.open('https://www.usm.edu.ph', '_blank')}
                >
                  <i className="bi bi-globe me-3" style={{ color: usmGreen }}></i>
                  University Website
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className="d-flex align-items-center"
                  onClick={() => window.open('https://www.usm.edu.ph/academics', '_blank')}
                >
                  <i className="bi bi-calendar-event me-3" style={{ color: usmGreen }}></i>
                  Academic Calendar
                </ListGroup.Item>
                <ListGroup.Item 
                  action 
                  className="d-flex align-items-center"
                  onClick={() => window.open('https://www.usm.edu.ph/forms', '_blank')}
                >
                  <i className="bi bi-download me-3" style={{ color: usmGreen }}></i>
                  Downloadable Forms
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OfficeDetails;