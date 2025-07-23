import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Table } from 'react-bootstrap';

const About = () => {
  const [activeButton, setActiveButton] = useState('about-usm-kcc');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = [
    { id: 1, src: "/images/turnover.jpg", alt: "Turnover Ceremony" },
    { id: 2, src: "/images/turnover1.jpg", alt: "Campus Event" },
    { id: 3, src: "/images/pic1.jpg", alt: "Campus Building" },
    { id: 4, src: "/images/pic2.jpg", alt: "Student Activity" },
    { id: 5, src: "/images/pic3.jpg", alt: "Graduation Ceremony" },
    { id: 6, src: "/images/pic4.jpg", alt: "Faculty Meeting" }
  ];

  const facultyData = [
    { name: "ABARING, Zilpah D.", education: "EdD(6 units)", specialization: "English" },
    { name: "AGUILAR, Justfer John D.", education: "MA - Filipino", specialization: "Filipino" },
    { name: "ALCANTARA, Matt Edison G.", education: "Ph.D. in Technology Mngt. (on-going)", specialization: "Electronics" },
    { name: "ALOJIPAN, Bonifacia A.", education: "Ed.D", specialization: "" },
    { name: "ANTIQUISA, Jaime A.", education: "MAT", specialization: "Electrical" },
    { name: "APOLINARIO, Marlyn D.", education: "EdD. Educational Mngt.", specialization: "English" },
    { name: "AURE, Jeanne Y.", education: "EdD. Educational Mngt.", specialization: "English" },
    { name: "BALNEG, Carmee Lyn L.", education: "Ph D. Mathematical Sciences (on-going)", specialization: "Mathematics" },
    { name: "BAUTISTA, Sheila R.", education: "Ed D. Admin. Supervision", specialization: "Civil Eng'g" },
    { name: "BELTRAN, Darwin R.", education: "MEP", specialization: "Mechanical Eng'g" },
    { name: "BOLASA, Erwin C.", education: "ME Computer Eng'g.", specialization: "Computer Eng'g" },
    { name: "CABANTOG, Maria Hynee A.", education: "MAED-Educ'l Admin.", specialization: "English" },
    { name: "CASIANO, Almira E.", education: "MAED-Educational Mgt.", specialization: "Science" },
    { name: "CATULONG, Kevin Mark D.", education: "MTE", specialization: "Electrical" },
    { name: "CENTILLO, Mercedes T.", education: "MAT-Science", specialization: "Science" },
    { name: "COLOMER, Ruby V.", education: "MAED Guid. and Counseling", specialization: "" },
    { name: "CORNELIO, Marcial R.", education: "MAED", specialization: "Mechanical Tech." },
    { name: "DELA CRUZ, Cristina Q.", education: "Ed. D.-Educational Mgt.", specialization: "PE" },
    { name: "ESTELLOSO, Emilie S.", education: "Ph.D. in Education", specialization: "Food Tech." },
    { name: "FLORES, April Rose B.", education: "Ph.D. in Technology Mngt. (on-going)", specialization: "Food Tech." },
    { name: "GAMOLO, George F.", education: "Doctor of Technology (on-going)", specialization: "Mechanical Eng'g" },
    { name: "GASPAR, Evangeline S.", education: "MAT-PE", specialization: "PE" },
    { name: "GONZAGA, Josephine A.", education: "Ph.D. in Technology Mngt. (on-going)", specialization: "Food Tech." },
    { name: "GRIJALDO, Vicky Q.", education: "ME-ECE", specialization: "Computer Eng'g" },
    { name: "GUAY, Shellah A.", education: "MBA", specialization: "Industrial Eng'g" },
    { name: "GUIAMAN, Baikongan B.", education: "MBA", specialization: "Accountancy" },
    { name: "JUAREZ, Kathryn D.", education: "Ph.D. in Technology Mngt. (on-going)", specialization: "Food Tech." },
    { name: "LACBAYO, Phoebe Norvin B.", education: "MAEd-ICT", specialization: "ICT" },
    { name: "LANOY, Fausto Jr. M.", education: "MATIA", specialization: "Drawing" },
    { name: "LIM, Vanessa Jane C.", education: "Ph.D. in Technology Mngt. (on-going)", specialization: "Refrigeration and Air-Condition Technology" },
    { name: "LLORITO, Marlowe E.", education: "MATIA Master in Info. Mngt", specialization: "ICT" },
    { name: "LUMANG, Janet V.", education: "MBA Master of Eng'g in Industrial Eng'g", specialization: "Industrial Eng'g" },
    { name: "MAGLINTE, Vhenus B.", education: "Ph.D. in Applied Linguistic", specialization: "English" },
    { name: "MAIT, Nelben B.", education: "MVE (30 units)/ MTE", specialization: "Welding and Fabrication" },
    { name: "MAMACUS, Jenny B.", education: "MAED (30 units) Master of Tech (38 units)", specialization: "" },
    { name: "MANTAWIL, Liezel L.", education: "MIT", specialization: "Refrigeration and Air-Condition Technology" },
    { name: "MELODIAS, Ben Hur Jr. G.", education: "MAT (21u) MIT (36 u)", specialization: "Automotive Technology" },
    { name: "NAPARAN, Fredde Rick Jan G.", education: "MTE (Acad. Reqt's.)", specialization: "Automotive Technology" },
    { name: "OQUENDO, Jojie Sonnette D.", education: "MTE", specialization: "Food Technology" },
    { name: "ORTIGAS, Raphael P.", education: "Master of Arts in Philosophy", specialization: "" },
    { name: "PARILLO, Girley M.", education: "Ph D. Mathematical Sciences (on-going)", specialization: "Mathematics" },
    { name: "PAUNON, Danilo G.", education: "MAT Mathematics", specialization: "Mathematics" },
    { name: "PECONADA, Joy D.", education: "MEnglish in Applied Linguistics", specialization: "English" },
    { name: "PINEDA, Maria Elena P.", education: "MBA", specialization: "" },
    { name: "PINSOY, Ronielyn F.", education: "Ed D.", specialization: "" },
    { name: "PURUGGANAN, Ramil B.", education: "Ph.D. in Educ'l. Leadership", specialization: "" },
    { name: "RAMA, Jimmy D.", education: "Ph.D in Math (on-going)", specialization: "Mechanical Engineering" },
    { name: "RAMOS, Sarah V.", education: "MEnglish in Applied Linguistics", specialization: "English" },
    { name: "RENOBLAS, Jonathan D.", education: "Ph.D. in Technology Mngt. (on-going)", specialization: "Automotive Technology" },
    { name: "REYNES, Janice E.", education: "Ph.D in Applied Linguistics (on-going)", specialization: "English" },
    { name: "SABIT, Dhealyn Decee V.", education: "Ph.D. in Education", specialization: "Electronics" },
    { name: "SABIT, Niño Chelvin E.", education: "Doctor in Technology Educ. (acad. Req't)", specialization: "Civil Technology" },
    { name: "SANTOS, Jo-Ann D.", education: "EdD in Filipino (on-going)", specialization: "Filipino" },
    { name: "SOSAS, Rowena V.", education: "PhD in Applied Linguistic", specialization: "English" },
    { name: "SUASIN, Michelle P.", education: "MS Computer Eng'g.", specialization: "Computer Eng'g" },
    { name: "TANGGAN, Jeconi Joice S.", education: "MS Biology", specialization: "Science" },
    { name: "UGBANA, Dionesio S.", education: "MATIA", specialization: "Welding and Fabrication" },
  ];

  return (
    <Container className="py-5 about-container">
      {/* Banner image at the top */}
      <Row className="mb-4">
        <Col>
          <img 
            src="/images/usmbggate.jpg" 
            alt="USM-KCC Campus Overview" 
            className="img-fluid rounded shadow campus-banner"
          />
        </Col>
      </Row>

      {/* Horizontal Navigation Buttons */}
      <Row className="mb-4 nav-button-row">
        <Col className="d-flex flex-wrap px-0">
          <Button 
            href="#about-usm-kcc"
            className={`nav-btn ${activeButton === 'about-usm-kcc' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('about-usm-kcc')}
          >
            About USM-KCC
          </Button>
          
          <Button 
            href="#goals-objectives"
            className={`nav-btn ${activeButton === 'goals-objectives' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('goals-objectives')}
          >
            Goals and Objectives
          </Button>
          
          <Button 
            href="#our-campus"
            className={`nav-btn ${activeButton === 'our-campus' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('our-campus')}
          >
            Our Campus
          </Button>
          
          <Button 
            href="#faculty"
            className={`nav-btn ${activeButton === 'faculty' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('faculty')}
          >
            Faculty
          </Button>
          
          <Button 
            href="#university-admin"
            className={`nav-btn ${activeButton === 'university-admin' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('university-admin')}
          >
            Administration
          </Button>
          
          <Button 
            href="#gallery"
            className={`nav-btn ${activeButton === 'gallery' ? 'active-nav-btn' : ''}`}
            onClick={() => setActiveButton('gallery')}
          >
            Gallery
          </Button>
        </Col>
      </Row>

      {/* About USM-KCC Section */}
      <h1 className="text-center mb-5 section-title">About USM-KCC</h1>
      
      <Row id="about-usm-kcc" className="mb-5 section-content">
        <Col md={6}>
          <h2 className="section-subtitle">Our History</h2>
          <p>
            The University of Southern Mindanao- Kidapawan City Campus (USM-KCC) is known to be the former North Cotabato College of Arts and Trades (NCCAT). Prior to NCCAT it was named Kidapawan Trade School (KTS) established in 1962 with the passage of Republic Act No. 3329, otherwise known as the "Higher Modernization Act of 1997" and pursuant to the Special Provision No. 2 of CHED FY 1999 Budget under the General Appropriation Act of 1999 or RA 8745 on the Integration of CHED-Supervised Institutions (CSIs) to State Universities and Colleges (SUCs), the commission on Higher Education issues guidelines to effect integration of CSIs to the SUCs for immediate implementation. As per CHED Memorandum Order no. 18, series of 1999, North Cotabato College of Arts and Trades was integrated to the University of Southern Mindanao as the host SUC. On June 31, 2000 dated the formal turn-over of NCCAT to USM by CHEDRO XII Regional Director to the University President.
          </p>
          <p>
            This external campus of USM is headed by the Campus Dean by virtue of BOR Resolution no. 30 s. 1999. The first USM-KCC Campus dean was Dr. Palasig U. Ampang, followed by Dr. Rogelio S. Tabora, Dr. Rufino S. Garzon, Dr. Rene U. Handoc, Dr. Herminigildo M. Gutierrez, Prof. Alfredo E. Naparan as OIC dean, Dr. Luz A. Taposok, then a short period for Prof. Alfredo E. Naparan as dean. At present, the campus has now the fiscal autonomy from University of Southern Mindanao, Kabacan, Cotabato and headed by Chancellor Dr. Ronielyn F Pinsoy.
          </p>
        </Col>
        <Col md={6}>
          <img 
            src="/images/kccampus.jpg" 
            alt="USMKC Campus History" 
            className="img-fluid rounded shadow content-image"
          />
          <img 
            src="/images/Pinsoy.jpg" 
            alt="Chancellor Pinsoy" 
            className="img-fluid rounded shadow mt-3 content-image portrait"
          />
        </Col>
      </Row>
      
      {/* Goals and Objectives Section */}
      <Row id="goals-objectives" className="mb-5 py-3 section-content">
        <Col>
          <h2 className="section-subtitle">Goals and Objectives</h2>
          <p>
            <strong>Vision:</strong> Quality and relevant education for its clientele to be globally competitive, culture-sensitive and morally responsive human resources for sustainable development.
          </p>
          <p>
            <strong>Mission:</strong> Help accelerate socio-economic development, promote harmony among diverse communities and improve quality of life through instruction, research, extension and resource generation in Southern Philippines.
          </p>
          <p>
            <strong>Goals:</strong> In general, the USM-KCC aims to provide quality comprehensive education while at the same time establish a vibrant, well-managed campus which fosters internal harmony and responsive to issues and concerns affecting its external environment. Specifically, USM-KCC aims to:
          </p>
          <ol>
            <li>Provide effective, efficient and transparent governance and management practices;</li>
            <li>Become a leader and model for teaching and learning in the fields of education, engineering, technology and other areas;</li>
            <li>Heighten the empowerment of communities particularly in alleviating poverty and sustainable management of resources through research, training and extension;</li>
            <li>Increase and manage enrolment, enhance and expand facilities, strengthen its financial position; and</li>
            <li>Make USM-KCC an excellent place to work and study.</li>
          </ol>
          <h5 className="mt-4">Core Objectives:</h5>
          <ul>
            <li>To provide effective, efficient and transparent governance and management practices</li>
            <ol>
              <li>Implement fully the enhanced autonomy policy for USM-KCC</li>
              <li>Sustain efficient, transparent and effective management with consensus decision-making and guidance from the USM Main Campus; and</li>
              <li>Automate and make more convenient the financial and enrolment systems for USM-KCC constituents.</li>
            </ol>
            <li>Become a leader and model for teaching and learning in the field of education, engineering, technology and other areas;</li>
            <ol>
              <li>Continue and improve on its use of information and communications technology to facilitate teaching and learning both inside and outside the classroom;</li>
              <li>Provide adequate laboratory, classroom, library, health and other facilities;</li>
              <li>Offer additional programs which will contribute to the development of the campus' area of responsibility;</li>
              <li>Continued program accreditation with appropriate bodies both international and local;</li>
              <li>Continue monitoring the performance of alumni in board exams and employment in both private and public sectors; and</li>
              <li>Hiring and retention of highly competent and qualified faculty and staff members (preferably those on CHED scholarships);</li>
            </ol>
            <li>Heighten the empowerment of communities particularly in alleviating poverty and sustainable management of resources through research, training, and extension</li>
            <ol>
              <li>Relevant and quality RET that responds to the needs of USM-KCC constituents;</li>
              <li>Enhance cultural heritage of indigenous peoples in the area of coverage;</li>
              <li>Provide adequate campus RET facilities that will encourage faculty, staff, and students to conduct RET activities</li>
              <li>Seek ways by which the intellectual output of USM-KCC personnel can be utilized and disseminated such as the establishment of a RET journal, participation in research and extension fora, or patenting/copyrighting intellectual properties;</li>
            </ol>
            <li>Increase and manage enrolment, enhance and expand facilities, and strengthen financial position</li>
            <ol>
              <li>Conduct consultations with constituents, especially as to courses that will be offered and/or revisions to existing ones which will redound towards better quality graduates and access to education especially among those coming from the underprivileged sectors of society;</li>
              <li>Enhance enrolment system that will allow enrolment from outside the campus;</li>
              <li>Improve farm production through adoption of modern practices and provision of adequate facilities;</li>
              <li>Improve income generation by providing improved facilities and new investments;</li>
              <li>Intensify efforts to seek fund sources and partnerships with outside sectors; and</li>
              <li>Improve funds utilization through judicious and timely expenditures made in accordance with government and USM rules and regulations.</li>
            </ol>
            <li>Make USM-KCC a convivial place to work and study</li>
            <ol>
              <li>Improve benefits of campus personnel within limits set by university policies and pertinent laws;</li>
              <li>Increase participation in campus extracurricular activities such as sports competitions, field trips, and others which promote harmony among personnel, students, alumni, parents/guardians of students, and surrounding communities;</li>
              <li>Increase participation in civic activities together with relevant local government units and agencies that will enhance the corporate responsiveness of the campus;</li>
              <li>Improve linkage with the private sector to implement projects designed to improve the welfare of campus constituents; and</li>
              <li>Explore more ways by which students and USM-KCC personnel can avail of scholarships and other forms of assistance for their education and professional development.</li>             
            </ol>
          </ul>
        </Col>
      </Row>
      
      {/* Our Campus Section */}
      <Row id="our-campus" className="mb-5 py-3 section-content">
        <Col md={6} className="order-md-2">
          <h2 className="section-subtitle">Our Campus</h2>
          <p>
            The University of Southern Mindanao - Kidapawan City Campus (USM-KCC) is located in Sudapin, Kidapawan City. Specifically, the campus is situated in Kidapawan City, Cotabato. The USM Kidapawan City Campus (USM KCC) has 14.97 hectares of land. 
          </p>
          <p>
            USM‑KCC features modern academic buildings, laboratories, and a learning resource center. The campus has recently undertaken improvements in coordination with local government to enhance road access and parking for students and staff.
          </p>
          <p>
            Aligned with USM's overarching mandate, the Kidapawan campus aims to "empower everyone" through quality instruction, research, and community engagement. It plays a vital role in delivering technical, industrial, and education programs to the region. There have been active pushes to gain autonomy, including proposals to convert the campus into the Kidapawan City State College to allow more fiscal flexibility and expansion of academic offerings. As of June 2025, two new academic buildings were inaugurated, signalling steady infrastructural growth.
          </p>
        </Col>
        <Col md={6} className="order-md-1">
          <img 
            src="/images/maingate.jpg" 
            alt="USMKC Campus Aerial View" 
            className="img-fluid rounded shadow content-image"
          />
          <img 
            src="/images/adminbuilding.jpg" 
            alt="USMKC Campus Aerial View" 
            className="img-fluid rounded shadow content-image"
          />
        </Col>
      </Row>
      
      {/* Faculty Section */}
      <Row id="faculty" className="mb-5 py-3 section-content">
        <Col>
          <h2 className="section-subtitle">Faculty</h2>
          <p>
            USM-KCC boasts a team of highly qualified faculty members committed to academic excellence and student development:
          </p>
          
          {/* Faculty Table */}
          <Table striped bordered hover responsive className="mt-4 faculty-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Highest Educational Attainment</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              {facultyData.map((faculty, index) => (
                <tr key={index}>
                  <td>{faculty.name}</td>
                  <td>{faculty.education}</td>
                  <td>{faculty.specialization}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      
      {/* University Administration Section */}
      <Row id="university-admin" className="mb-5 py-3 section-content">
        <Col>
          <h2 className="text-center section-subtitle">University Administration</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 admin-card">
                <Card.Img variant="top" src="/images/president.png" />
                <Card.Body>
                  <Card.Title>University President</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Dr. Jonald L. Pimentel</Card.Subtitle>
                  <Card.Text>
                    Leads the university in achieving its vision and mission through strategic planning and 
                    effective governance.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 admin-card">
                <Card.Img variant="top" src="/images/vp-academic.png" />
                <Card.Body>
                  <Card.Title>Vice President for Academic Affairs</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Dr. Leorence C. Tandog</Card.Subtitle>
                  <Card.Text>
                    Oversees all academic programs, faculty development, and curriculum enhancement initiatives.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 admin-card">
                <Card.Img variant="top" src="/images/Pinsoy.jpg" />
                <Card.Body>
                  <Card.Title>USM-KCC Chancellor</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Dr. Ronielyn F Pinsoy</Card.Subtitle>
                  <Card.Text>
                    Manages the daily operations of the Kidapawan City Campus and implements university policies.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      
      {/* Gallery Section */}
      <Row id="gallery" className="mb-5 py-3 section-content">
        <Col>
          <h2 className="section-subtitle mb-4">Gallery</h2>
          <Carousel 
            activeIndex={galleryIndex} 
            onSelect={(selectedIndex) => setGalleryIndex(selectedIndex)}
            indicators={false}
            prevIcon={
              <span aria-hidden="true" className="carousel-control-prev-icon gallery-nav-icon" />
            }
            nextIcon={
              <span aria-hidden="true" className="carousel-control-next-icon gallery-nav-icon" />
            }
          >
            {galleryImages.map((image) => (
              <Carousel.Item key={image.id}>
                <div className="d-flex justify-content-center">
                  <img
                    className="d-block img-fluid rounded shadow gallery-image"
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
                {image.alt && (
                  <Carousel.Caption className="d-none d-md-block">
                    <h5 className="gallery-caption">
                      {image.alt}
                    </h5>
                  </Carousel.Caption>
                )}
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Thumbnail navigation */}
          <div className="d-flex flex-wrap justify-content-center mt-3">
            {galleryImages.map((image, index) => (
              <img
                key={image.id}
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className={`img-thumbnail mx-1 gallery-thumbnail ${galleryIndex === index ? 'active-thumbnail' : ''}`}
                onClick={() => setGalleryIndex(index)}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;