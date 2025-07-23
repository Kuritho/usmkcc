import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';

const Academics = () => {
  const colleges = [
    {
      id: 1,
      name: "College of Engineering",
      programs: [
        "Bachelor of Science in Industrial Engineering",
        "Bachelor of Science in Mechanical Engineering",
        "Bachelor of Science in Electrical Engineering"
      ],
      description: "A College of Engineering typically offers programs in various engineering disciplines, focusing on developing students' knowledge and skills in areas like design, analysis, and problem-solving related to technology, structures, and processes."
    },
    {
      id: 2,
      name: "College of Education, Arts and Sciences",
      programs: [
        "Bachelor of Secondary Education major in Filipino",
        "Bachelor of Secondary Education major in English",
        "Bachelor of Secondary Education major in Mathematics",
        "Bachelor of Secondary Education major in Social Studies",
        "Bachelor of Technical Vocational Teacher Education major in Automotive Technology",
        "Bachelor of Technical Vocational Teacher Education major in Electronics Technology",
        "Bachelor of Technical Vocational Teacher Education major in Food and Service Management",
        "Bachelor of Technical Vocational Teacher Education major in Garments, Fashion and Design",
      ],
      description: "The College of Education, Arts, and Sciences (CEAS) at the University of Southern Mindanao (USM) - Kidapawan City Campus is dedicated to providing quality education and developing globally competitive and morally responsible professionals. It focuses on nurturing educators and professionals in various fields, emphasizing innovative teaching, community service, and research. "
    },
    {
      id: 3,
      name: "College of Technology",
      programs: [
        "Bachelor of Technology major in Food and Beverage Preparation and Service Technology",
        "Bachelor of Technology major in Civil Technology",
        "Bachelor of Technology major in Electronics Technology",
        "Bachelor of Technology major in Electrical Technology",
        "Bachelor of Technology major in Automotive Technology",
        "Bachelor of Technology major in Mechanical Technology",
        "Bachelor of Technology major in Heating, Ventilating, and Air-Conditioning",
        "Bachelor of Technology major in Welding and Fabrication",
        "Diploma of Technology major in Civil Technology",
        "Diploma of Technology major in Automotive Technology",
        "Diploma of Technology major in Mechanical Technology",
        "Diploma of Technology major in Electronics Technology",
        "Diploma of Technology major in Electrical Technology",
        "Diploma of Technology major in Heating, Ventilating, and Air-Conditioning",
        "Diploma of Technology major in Heating, Welding and Fabrication",
        "Food, Preparation and Service Technology"
      ],
      description: "The University of Southern Mindanao - Kidapawan City Campus (USM-KCC) College of Technology (COT) offers Bachelor of Technology (B.Tech) and Diploma of Technology programs, with specializations in various fields."
    }
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 text-usmkc-green">Academic Programs</h1>
      
      <Row className="mb-5">
        <Col>
          <Card className="border-usmkc-green">
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title>Undergraduate Programs</Card.Title>
            </Card.Header>
            <Card.Body>
              <p>
                The University of Southern Mindanao - Kidapawan City Campus offers a wide range of undergraduate 
                programs across various disciplines. Our programs are designed to provide students with the knowledge 
                and skills needed to excel in their chosen fields.
              </p>
              
              <Accordion>
                {colleges.map(college => (
                  <Accordion.Item eventKey={college.id} key={college.id}>
                    <Accordion.Header>{college.name}</Accordion.Header>
                    <Accordion.Body>
                      <p>{college.description}</p>
                      <h6>Offered Programs:</h6>
                      <ul>
                        {college.programs.map((program, index) => (
                          <li key={index}>{program}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Header className="bg-usmkc-yellow text-black">
              <Card.Title>Graduate Programs</Card.Title>
            </Card.Header>
            <Card.Body>
              <h5>Master's Degree Programs</h5>
              <ul>
                <li>Master of Arts in Education</li>
                <li>Master of Arts in  Language and Literacy Education</li>
                <li>Master in Technology Education</li>
              </ul>
              
              <h5>Doctoral Degree Programs</h5>
              <ul>
                <li>Doctor of Philosophy major in Technology Education and Management</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title>Certificate Programs</Card.Title>
            </Card.Header>
            <Card.Body>
              <h5>Technical-Vocational Programs</h5>
              <ul>
                <li>Agricultural Crops Production NC III</li>
                <li>Food Processing NC II</li>
                <li>Computer Systems Servicing NC II</li>
              </ul>
              
              <h5>Short Courses</h5>
              <ul>
                <li>Entrepreneurship Training</li>
                <li>Basic Computer Literacy</li>
                <li>Organic Farming Techniques</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Academics;