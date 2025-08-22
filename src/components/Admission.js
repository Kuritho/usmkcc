import React from 'react';
import { Container, Row, Col, Card, Table, ListGroup } from 'react-bootstrap';

const Admission = () => {
  const requirements = [
    "Original and photocopy of Form 138/Report Card (for incoming freshmen)",
    "Original and photocopy of Certificate of Good Moral Character",
    "Original and photocopy of PSA Birth Certificate",
    "Two (2) recent 2x2 ID pictures",
    "Certificate of Philippine Educational Placement Test (PEPT) result (if applicable)",
    "Transfer Credential/Honorable Dismissal (for transferees)",
    "Original and photocopy of Transcript of Records (for transferees)"
  ];

  const deadlines = [
    { period: "First Semester", date: "May 15 - June 30, 2025" },
    { period: "Second Semester", date: "October 15 - November 30, 2025" },
    { period: "Summer Term", date: "March 1-15, 2025" }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 text-usmkc-green">Steps and Guidelines</h1>
      
      <Row className="mb-5">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title>Freshmen Applicants</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                To be admitted as a freshman student at USM-KCC, applicants must meet the following requirements:
              </Card.Text>
              <ListGroup variant="flush">
                {requirements.map((item, index) => (
                  <ListGroup.Item key={index}>{item}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-usmkc-yellow text-black">
              <Card.Title>Transferees</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Students transferring from other colleges/universities must submit the following additional requirements:
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Honorable Dismissal/Transfer Credential from last school attended</ListGroup.Item>
                <ListGroup.Item>Original and photocopy of Transcript of Records</ListGroup.Item>
                <ListGroup.Item>Course Description of subjects taken (for evaluation purposes)</ListGroup.Item>
                <ListGroup.Item>Must have a GWA of 2.5 or better (or its equivalent) in all college subjects taken</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col>
          <Card>
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title>Admission Procedures</Card.Title>
            </Card.Header>
            <Card.Body>
              <ol>
                <li>Secure and complete the Application Form from the Office of the Registrar</li>
                <li>Submit the completed form together with all required documents</li>
                <li>Pay the application fee at the Cashier's Office</li>
                <li>Take the USMKC Admission Test (if required by the program)</li>
                <li>Wait for the release of results (usually within 5 working days)</li>
                <li>If accepted, proceed to enrollment by submitting additional requirements and paying tuition fees</li>
                <li>Attend the orientation program for new students</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <Card>
            <Card.Header className="bg-usmkc-yellow text-white">
              <Card.Title>Admission Schedule</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Admission Period</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {deadlines.map((item, index) => (
                    <tr key={index}>
                      <td>{item.period}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p className="text-muted">
                Note: Late applications may be accepted on a case-to-case basis depending on slot availability.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admission;