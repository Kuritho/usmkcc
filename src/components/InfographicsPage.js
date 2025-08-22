import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InfographicsPage = () => {
  const navigate = useNavigate();

  // Sample data for charts
  const boardPassersData = [
    { year: '2015', passers: 45 },
    { year: '2016', passers: 52 },
    { year: '2017', passers: 60 },
    { year: '2018', passers: 68 },
    { year: '2019', passers: 75 },
    { year: '2020', passers: 82 },
    { year: '2021', passers: 90 },
    { year: '2022', passers: 95 },
    { year: '2023', passers: 102 },
    { year: '2024', passers: 110 },
  ];

  const enrollmentData = [
    { year: '2015', students: 1200 },
    { year: '2016', students: 1350 },
    { year: '2017', students: 1420 },
    { year: '2018', students: 1550 },
    { year: '2019', students: 1620 },
    { year: '2020', students: 1580 },
    { year: '2021', students: 1650 },
    { year: '2022', students: 1720 },
    { year: '2023', students: 1850 },
    { year: '2024', students: 1920 },
  ];

  const graduationData = [
    { year: '2015', graduates: 210 },
    { year: '2016', graduates: 225 },
    { year: '2017', graduates: 240 },
    { year: '2018', graduates: 255 },
    { year: '2019', graduates: 270 },
    { year: '2020', graduates: 285 },
    { year: '2021', graduates: 300 },
    { year: '2022', graduates: 315 },
    { year: '2023', graduates: 330 },
    { year: '2024', graduates: 350 },
  ];

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-4">
        Back to Home
      </Button>
      
      <h1 className="text-center mb-5 text-usmkc-green">University Infographics</h1>
      
      <Row className="g-4">
        {/* Board Passers Card */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title className="text-center">Board Passers</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={boardPassersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="passers" fill="#FFD700" name="Number of Passers" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="usmkc" onClick={() => navigate('/infographics/board-passers')}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Enrollment Data Card */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-usmkc-yellow text-dark">
              <Card.Title className="text-center">Enrollment Data</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#02570B" name="Number of Students" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="usmkc" onClick={() => navigate('/infographics/enrollment')}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        {/* Graduation Data Card */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-usmkc-blue text-white">
              <Card.Title className="text-center">Graduation Data</Card.Title>
            </Card.Header>
            <Card.Body>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={graduationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="graduates" fill="#6f42c1" name="Number of Graduates" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="usmkc" onClick={() => navigate('/infographics/graduation')}>
                View Details
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InfographicsPage;