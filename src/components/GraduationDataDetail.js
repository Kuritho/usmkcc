import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const GraduationDataDetail = () => {
  // Sample graduation data
  const graduationStats = [
    { year: '2025', total: 687, undergraduate: 542, graduate: 145 },
    { year: '2024', total: 654, undergraduate: 512, graduate: 142 },
    { year: '2023', total: 621, undergraduate: 487, graduate: 134 },
  ];

  const graduationRates = [
    { program: 'Computer Science', rate: '92%' },
    { program: 'Business Administration', rate: '88%' },
    { program: 'Education', rate: '95%' },
    { program: 'Engineering', rate: '85%' },
    { program: 'Agriculture', rate: '90%' },
  ];

  return (
    <Container className="py-5">
      {/* Header Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="text-usmkc-green">Graduation Statistics</h1>
            <p className="lead">Graduation data and completion rates for USM-Kidapawan City Campus</p>
          </div>
        </Col>
      </Row>

      {/* Main Infographic */}
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow">
            <Card.Header className="bg-usmkc-yellow py-3">
              <h2 className="text-center mb-0">Graduation Trends</h2>
            </Card.Header>
            <Card.Body>
              <Row>
                {/* Yearly Graduates */}
                <Col md={6}>
                  <h4 className="text-center mb-4">Yearly Graduates</h4>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Total</th>
                          <th>Undergrad</th>
                          <th>Graduate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {graduationStats.map((stat, index) => (
                          <tr key={index}>
                            <td>{stat.year}</td>
                            <td>{stat.total.toLocaleString()}</td>
                            <td>{stat.undergraduate.toLocaleString()}</td>
                            <td>{stat.graduate.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Col>

                {/* Graduation Rates */}
                <Col md={6}>
                  <h4 className="text-center mb-4">Graduation Rates by Program</h4>
                  <div className="program-rates">
                    {graduationRates.map((program, index) => (
                      <div key={index} className="mb-3">
                        <div className="d-flex justify-content-between mb-1">
                          <span>{program.program}</span>
                          <span className="font-weight-bold">{program.rate}</span>
                        </div>
                        <div className="progress">
                          <div 
                            className="progress-bar bg-usmkc-green" 
                            role="progressbar" 
                            style={{ width: program.rate }}
                            aria-valuenow={parseInt(program.rate)}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-usmkc-green text-white">
              <h5 className="mb-0">Average Time to Degree</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <h2>4.2</h2>
                <p>years (undergraduate)</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-usmkc-green text-white">
              <h5 className="mb-0">Honors Graduates</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <h2>127</h2>
                <p>in 2025 (18.5%)</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-usmkc-green text-white">
              <h5 className="mb-0">Employment Rate</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center">
                <h2>86%</h2>
                <p>within 6 months</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GraduationDataDetail;