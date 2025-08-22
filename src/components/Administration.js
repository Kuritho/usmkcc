import React from 'react';
import { Container, Row, Col, Card, Accordion, Image } from 'react-bootstrap';

const fallbackProfile = `data:image/svg+xml;base64,${btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="40" r="20" fill="#02570B" opacity="0.7"/>
    <circle cx="50" cy="100" r="40" fill="#02570B" opacity="0.7"/>
  </svg>
`)}`;

const Administration = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5" style={{ color: '#02570B', borderBottom: '2px solid #ffcc00', paddingBottom: '10px' }}>
        UNIVERSITY ADMINISTRATION
      </h1>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="mb-4 shadow-sm">
            <Card.Header style={{ backgroundColor: '#02570B', color: 'white' }}>
              <h3 className="mb-0">Members of Administration Council</h3>
            </Card.Header>
            <Card.Body>
              <Accordion>
                {/* Chancellor */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <h4 className="mb-0" style={{ color: '#02570B' }}>Chancellor</h4>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row className="align-items-center">
                      <Col md={3} className="text-center mb-3 mb-md-0">
                        <Image 
                          src="/images/admin/chancellor.jpg"
                          alt="Chancellor"
                          roundedCircle
                          fluid
                          style={{
                            width: '180px',
                            height: '180px',
                            objectFit: 'cover',
                            border: '3px solid #ffcc00'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackProfile;
                          }}
                        />
                      </Col>
                      <Col md={9}>
                        <h3 style={{ color: '#02570B' }}>Dr. Ronielyn F. Pinsoy</h3>
                        <h5 className="text-muted mb-3">University Chancellor</h5>
                        <p className="mb-2">
                          <strong>Email:</strong> info@usm.edu.ph
                        </p>
                        <p className="mb-2">
                          <strong>Office:</strong> Administration Building, Office of the Chancellor
                        </p>
                        <p>
                          <strong>Bio:</strong> Dr. Ronielyn F. Pinsoy has served as Chancellor since 2015, with over 20 years of academic leadership experience...
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                
                {/* Vice Chancellor */}
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <h4 className="mb-0" style={{ color: '#02570B' }}>Vice Chancellor</h4>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row className="align-items-center">
                      <Col md={3} className="text-center mb-3 mb-md-0">
                        <Image 
                          src="/images/admin/vice-chancellor.jpg"
                          alt="Vice Chancellor"
                          roundedCircle
                          fluid
                          style={{
                            width: '180px',
                            height: '180px',
                            objectFit: 'cover',
                            border: '3px solid #ffcc00'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackProfile;
                          }}
                        />
                      </Col>
                      <Col md={9}>
                        <h3 style={{ color: '#02570B' }}>Dr.  Cristina Q. Dela Cruz</h3>
                        <h5 className="text-muted mb-3">Vice Chancellor</h5>
                        <p className="mb-2">
                          <strong>Email:</strong> info@usm.edu.ph
                        </p>
                        <p className="mb-2">
                          <strong>Office:</strong> Administration Building, Office of the Chancellor
                        </p>
                        <p>
                          <strong>Bio:</strong> Dr.  Cristina Q. Dela Cruz oversees daily operations and strategic planning, with expertise in academic administration...
                        </p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                
                {/* University Directors */}
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <h4 className="mb-0" style={{ color: '#02570B' }}>University Directors</h4>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {/* Director 1 */}
                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-academic.jpg"
                              alt="Director of Academic Affairs"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Prof. Marcos F. Monderin</h4>
                            <h6 className="text-muted mb-3">Director, International Affairs </h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      {/* Director 2 */}
                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-student.jpg"
                              alt="Director of Student Affairs"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Ms. Ruth R. Grecia</h4>
                            <h6 className="text-muted mb-3">Director, Admin. Services</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      {/* Director 3 */}
                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Dr. Rowena V. Sosas</h4>
                            <h6 className="text-muted mb-3">Director, Quality Assurance</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Engr. Vicky Q. Grijaldo</h4>
                            <h6 className="text-muted mb-3">Director, Instruction</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                        <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Dr. Dhealyn Decee V. Sabit</h4>
                            <h6 className="text-muted mb-3">Director, Research & Extension Services </h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Dr. Jeanne Y. Aure</h4>
                            <h6 className="text-muted mb-3">Director, National Service Training Program</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Engr. George F. Gamolo</h4>
                            <h6 className="text-muted mb-3">Director, Planning and Development</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Ms. Maria Elena P. Pineda</h4>
                            <h6 className="text-muted mb-3">Director, Admission and Records</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Engr. Janeth V. Lumang </h4>
                            <h6 className="text-muted mb-3">Director, Resource Generation</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Prof. April Geraldine M. Quiñonero</h4>
                            <h6 className="text-muted mb-3">Director, Student Affairs and Services</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Prof. Marlowe E. Llorito</h4>
                            <h6 className="text-muted mb-3">Prof. Marlowe E. Llorito</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Ms. Chelsea Angelique B.  Alcordo</h4>
                            <h6 className="text-muted mb-3">OIC Director, HRMDO</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Ms. Christine A. Ruiz</h4>
                            <h6 className="text-muted mb-3">OIC Director, PRIO</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Engr. Erwin C. Bolasa</h4>
                            <h6 className="text-muted mb-3">Director, Information and Communication</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Ms. Rizza C. Odias</h4>
                            <h6 className="text-muted mb-3">Director, Learning Resource Services</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Ms. Baikongan B. Guiaman</h4>
                            <h6 className="text-muted mb-3">Director, Finance Services</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Dr. Emilou N. Gallardo </h4>
                            <h6 className="text-muted mb-3">Head, Heath Services </h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Prof. Phoebe Norvin B. Lacbayo</h4>
                            <h6 className="text-muted mb-3">Data Privacy Officer</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Dr. Julius G. Almariego</h4>
                            <h6 className="text-muted mb-3">Officer, Disaster Risk Reduction Management</h6>
                            <h6 className="text-muted mb-3">OIC, Chief Security Officer</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col md={6} className="mb-4">
                        <Card>
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/director-finance.jpg"
                              alt="Director of Finance"
                              roundedCircle
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h4>Joshua Q. Sarmiento</h4>
                            <h6 className="text-muted mb-3">President, Autonomous Student Government</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                
                {/* College Deans */}
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <h4 className="mb-0" style={{ color: '#02570B' }}>College Deans</h4>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      {/* Dean 1 */}
                      <Col md={4} className="mb-4">
                        <Card className="h-100">
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/dean-arts.jpg"
                              alt="Dean of Arts and Sciences"
                              roundedCircle
                              style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h5>Dr.  Vhenus B. Maglinte</h5>
                            <h6 className="text-muted mb-2">Dean, College of Education, Arts and Sciences</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      {/* Dean 2 */}
                      <Col md={4} className="mb-4">
                        <Card className="h-100">
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/dean-engineering.jpg"
                              alt="Dean of Engineering"
                              roundedCircle
                              style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h5>Engr. Analiza B. Bingil</h5>
                            <h6 className="text-muted mb-2">Dean, College of Engineering</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                      {/* Dean 3 */}
                      <Col md={4} className="mb-4">
                        <Card className="h-100">
                          <Card.Body className="text-center">
                            <Image 
                              src="/images/admin/dean-education.jpg"
                              alt="Dean of Education"
                              roundedCircle
                              style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                border: '3px solid #02570B',
                                marginBottom: '15px'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackProfile;
                              }}
                            />
                            <h5>Dr. April Rose B. Flores</h5>
                            <h6 className="text-muted mb-2">Dean, College of Technology</h6>
                            <p className="mb-1">
                              <small><strong>Email:</strong> info@usm.edu.ph</small>
                            </p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Administration;