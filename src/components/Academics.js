import React from 'react';
import { Container, Row, Col, Card, Accordion, Image } from 'react-bootstrap';

const Academics = () => {
  // Complete faculty data for all programs
  const facultyData = {
    // College of Engineering
    "Bachelor of Science in Industrial Engineering": [
      {
        name: "Engr. Andre Paul V. Espadera",
        designation: "Master in Engineering - Industrial Eng’g. (on-going)",
        email: "info@usm.edu.ph",
        image: "/images/faculty/espadera.JPG",
        designations: [
        ]
      },
      {
        name: "Engr. Shellah A. Guay, MBA",
        designation: "College of Engineering Department Head",
        email: "info@usm.edu.ph",
        image: "/images/faculty/guay.JPG",
        designations: [
          "College of Engineering Department Head",
          "Doctor of Business Management (on-going)"
        ]
      },
      {
        name: "Engr. Janet V. Lumang, MBA",
        designation: "Campus Director, Resource Generation",
        email: "info@usm.edu.ph",
        image: "/images/faculty/lumang.JPG",
        designations: [
          "Campus Director, Resource Generation",
          "Master in Eng’g.-Industrial Engineering (on-going)"
        ]
      }
    ],
    "Bachelor of Science in Mechanical Engineering": [
      {
        name: "Engr. Analiza B. Bingil, ME – ME",
        designation: "",
        email: "info@usm.edu.ph",
        image: "/images/faculty/bingil.JPG",
        designations: [
          "College Dean",
          "Doctor of Engineering in Energy System (on going)",
          "Registered Mechanical Engineer"
        ]
      },
      {
        name: "Engr. Cyril L. Beltran",
        designation: "Associate Professor",
        email: "info@usm.edu.ph",
        image: "/images/staff/placeholder.png",
        designations: [
          "Master of Science in Mechanical Eng’g. (on-going)",
          "Registered Mechanical Engineer",
          "Master Plumber & NCII Holder"
        ]
      },
      {
        name: "Engr. Martin V. Daza, MBA",
        designation: "Assistant Professor",
        email: "info@usm.edu.ph",
        image: "/images/staff/placeholder.png",
        designations: [
          "Professional Mechanical Engineer",
          "Registered Mechanical Engineer"
        ]
      },
      {
        name: "Engr. George F. Gamolo, ME – ME",
        designation: "Lecturer",
        email: "info@usm.edu.ph",
        image: "/images/faculty/gamolo.JPG",
        designations: [
          "Campus Director, Planning & Dev’t.",
          "Doctor of Technology (on-going)",
          "Registered Mechanical Engineer"
        ]
      },
      {
        name: "Engr. Jimmy D. Rama, MA",
        designation: "Professor Emeritus",
        email: "info@usm.edu.ph",
        image: "/images/faculty/rama.JPG",
        designations: [
          "PhD in Mathematics (on-going)",
          "Registered Mechanical Engineer)"
        ]
      },
       {
        name: "Engr. Reynald B. Villagomeza",
        designation: "Professor Emeritus",
        email: "info@usm.edu.ph",
        image: "/images/faculty/villagomeza.JPG",
        designations: [
          "Registered Mechanical Engineer"
        ]
      }
    ],
    "Bachelor of Science in Electrical Engineering": [
      {
        name: "Engr. Jeffrey R. Gorre, MS",
        designation: "Professor and Department Chair",
        email: "info@usm.edu.ph",
        image: "/images/faculty/gorre.JPG",
        designations: [
          "CoE Research Coordinator",
          "Doctor of Eng’g.- Renewable Energy  System (on-going)",
          "Registered Electrical Engineer"
        ]
      },
      {
        name: "Engr. Ernie June L. Lumantao",
        designation: "Associate Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/lumantao.JPG",
        designations: [
          "CoE Laboratory-in-Charge",
          "Master in Eng’g.-Electrical Eng’g (on-going)",
          "ASEAN Engineer",
          "Professional Electrical Engineer"
        ]
      },
      {
        name: "Engr. Niño Marvin A. Reston, MEP - EE",
        designation: "Assistant Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/reston.JPG",
        designations: [
          "CoE LSG Adviser",
          "Registered Electrical Engineer",
          "Master Electrician"
        ]
      }
    ],
    "Allied Engineering Faculty": [
      {
        name: "Engr. Erwin C. Bolasa, MEP Com. Eng.",
        designation: "Professor of Mathematics",
        email: "info@usm.edu.ph",
        image: "/images/faculty/bolasa.JPG",
        designations: [
          "Campus Director, Information & Communication",
          "Certified Computer Engineer"
        ]
      },
      {
        name: "Engr. Karl Eigen C. Castillo",
        designation: "Professor of Mathematics",
        email: "info@usm.edu.ph",
        image: "/images/faculty/castillo.JPG",
        designations: [
          "Registered Civil Engineer"
        ]
      },
      {
        name: "Baikongan B. Guiaman, CPA",
        designation: "Professor of Mathematics",
        email: "info@usm.edu.ph",
        image: "/images/staff/placeholder.png",
        designations: [
          "Campus Director, Finance & Services",
          "Master of Science in Accountancy (on-going)"
        ]
      },
      {
        name: "Engr. Rhett Sean P. Pomares, MS",
        designation: "Professor of Mathematics",
        email: "info@usm.edu.ph",
        image: "/images/faculty/pomares.JPG",
        designations: [
          "CoE Extension Coordinator",
          "Registered Chemical Engineer"
        ]
      },
      {
        name: "Engr. Ven Hur C. Tabugoc",
        designation: "Professor of Mathematics",
        email: "info@usm.edu.ph",
        image: "/images/faculty/tabugoc.JPG",
        designations: [
          "Registered Civil Engineer"
        ]
      }
    ],

    // College of Education, Arts and Sciences
    "Bachelor of Secondary Education major in Filipino": [
      {
        name: "Dr. Rosario Almario",
        designation: "Professor of Filipino",
        email: "info@usm.edu.ph",
        image: "/images/faculty/rosario-almario.jpg"
      },
      {
        name: "Prof. Dante Reyes",
        designation: "Associate Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/dante-reyes.jpg"
      },
      {
        name: "Dr. Lilia Hernandez",
        designation: "Assistant Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/lilia-hernandez.jpg"
      },
      {
        name: "Prof. Armando Salazar",
        designation: "Lecturer",
        email: "info@usm.edu.ph",
        image: "/images/faculty/armando-salazar.jpg"
      },
      {
        name: "Dr. Corazon dela Paz",
        designation: "Professor Emeritus",
        email: "info@usm.edu.ph",
        image: "/images/faculty/corazon-delapaz.jpg"
      }
    ],
    "Bachelor of Secondary Education major in English": [
      {
        name: "Marlyn D. Apolinario, EdD",
        designation: "Professor of English",
        email: "info@usm.edu.ph",
        image: "/images/faculty/apolinario.JPG",
        designations: [
          "Department Chairperson, English Program Head"
        ]
      },
      {
        name: "Zilpah D. Abaring, MAEd",
        designation: "Associate Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/abaring.JPG",
        designations: [
          "PhD in English Language and Literature (on-going)"
        ]
      },
      {
        name: "Joy P. Aguilar, PhD",
        designation: "Assistant Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/aguilarjoy.JPG",
        designations: [
          "USM-KCC Media Team Member"
        ]
      },
      {
        name: "Mona Melliah C. Bañas, BSE Eng",
        designation: "Senior Lecturer",
        email: "info@usm.edu.ph",
        image: "/images/faculty/banas.JPG",
        designations: [
          "Master of Arts in Language and Literary Education (on-going)"
        ]
      },
      {
        name: "Maria Hynee A. Cabantog, MAEd",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/cabantog.JPG",
        designations: [
          "Master of Education in Language Teaching (on-going)"
        ]
      },
      {
        name: "Shara Joy P. Constantinopla, MALT",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/constantinopla.JPG",
        designations: [
          "Research Ethics, Journal, and Publication Head; and Leadership, Training, and Student Discipline Head",
          "PhD in Education major in English Language Teaching (on-going)"
        ]
      },
      {
        name: "Ian Leo S. Domingo, PhD",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/domingo.JPG",
        designations: [
          ""
        ]
      },
      {
        name: "Algin Mae A. Lagang, MAEd",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/lagang.JPG",
        designations: [
          "Assistant to the Office of the Chancellor",
          "PhD in Education major in Applied Linguistics (on-going)"
        ]
      },
      {
        name: "Vhenus B. Maglinte, PhD",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/maglinte.JPG",
        designations: [
          "College Dean"
        ]
      },
      {
        name: "Sarah V. Ramos, PhD ",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/ramos.JPG",
        designations: [
          "GAD Focal Person"
        ]
      },
      {
        name: "Janice E. Reynes, PhD",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/reynes.JPG",
        designations: [
          "Internal Auditor, Admission Officer for English "
        ]
      },
      {
        name: "Clint Abygyl P. Serdon, MA",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/serdon.JPG",
        designations: [
          "Assistant to the CEAS Dean; CEAS LSG Adviser, Gen Ed & Prof Ed Program Head"
        ]
      },
      {
        name: "Rowena V. Sosas, PhD",
        designation: "Professor",
        email: "info@usm.edu.ph",
        image: "/images/faculty/sosas.JPG",
        designations: [
          "Director for Quality Assurance; Management Representative, Adviser for Student Publication (TTB); TWG for Insurance; English Club Adviser"
        ]
      }
    ],
    "Bachelor of Secondary Education major in Mathematics": [
      {
        name: "Dr. Albert Einstein",
        designation: "Professor of Mathematics",
        email: "albert.einstein@usm.edu.ph",
        image: "/images/faculty/albert-einstein.jpg"
      },
      {
        name: "Prof. Maria Curie",
        designation: "Associate Professor",
        email: "maria.curie@usm.edu.ph",
        image: "/images/faculty/maria-curie.jpg"
      },
      {
        name: "Dr. Isaac Newton",
        designation: "Assistant Professor",
        email: "isaac.newton@usm.edu.ph",
        image: "/images/faculty/isaac-newton.jpg"
      },
      {
        name: "Prof. Alan Turing",
        designation: "Lecturer",
        email: "alan.turing@usm.edu.ph",
        image: "/images/faculty/alan-turing.jpg"
      },
      {
        name: "Dr. Katherine Johnson",
        designation: "Professor",
        email: "katherine.johnson@usm.edu.ph",
        image: "/images/faculty/katherine-johnson.jpg"
      }
    ],
    "Bachelor of Secondary Education major in Social Studies": [
      {
        name: "Dr. Jose Rizal",
        designation: "Professor of Social Studies",
        email: "jose.rizal@usm.edu.ph",
        image: "/images/faculty/jose-rizal.jpg"
      },
      {
        name: "Prof. Andres Bonifacio",
        designation: "Associate Professor",
        email: "andres.bonifacio@usm.edu.ph",
        image: "/images/faculty/andres-bonifacio.jpg"
      },
      {
        name: "Dr. Apolinario Mabini",
        designation: "Assistant Professor",
        email: "apolinario.mabini@usm.edu.ph",
        image: "/images/faculty/apolinario-mabini.jpg"
      },
      {
        name: "Prof. Melchora Aquino",
        designation: "Lecturer",
        email: "melchora.aquino@usm.edu.ph",
        image: "/images/faculty/melchora-aquino.jpg"
      },
      {
        name: "Dr. Gabriela Silang",
        designation: "Professor",
        email: "gabriela.silang@usm.edu.ph",
        image: "/images/faculty/gabriela-silang.jpg"
      }
    ],
    "Bachelor of Technical Vocational Teacher Education major in Automotive Technology": [
      {
        name: "Engr. Henry Ford",
        designation: "Professor of Automotive Technology",
        email: "henry.ford@usm.edu.ph",
        image: "/images/faculty/henry-ford.jpg"
      },
      {
        name: "Prof. Karl Benz",
        designation: "Associate Professor",
        email: "karl.benz@usm.edu.ph",
        image: "/images/faculty/karl-benz.jpg"
      },
      {
        name: "Dr. Ferdinand Porsche",
        designation: "Assistant Professor",
        email: "ferdinand.porsche@usm.edu.ph",
        image: "/images/faculty/ferdinand-porsche.jpg"
      },
      {
        name: "Prof. Soichiro Honda",
        designation: "Senior Lecturer",
        email: "soichiro.honda@usm.edu.ph",
        image: "/images/faculty/soichiro-honda.jpg"
      },
      {
        name: "Dr. Kiichiro Toyoda",
        designation: "Professor",
        email: "kiichiro.toyoda@usm.edu.ph",
        image: "/images/faculty/kiichiro-toyoda.jpg"
      }
    ],
    "Bachelor of Technical Vocational Teacher Education major in Electronics Technology": [
      {
        name: "Dr. Thomas Edison",
        designation: "Professor of Electronics",
        email: "thomas.edison@usm.edu.ph",
        image: "/images/faculty/thomas-edison.jpg"
      },
      {
        name: "Prof. Nikola Tesla",
        designation: "Associate Professor",
        email: "nikola.tesla@usm.edu.ph",
        image: "/images/faculty/nikola-tesla.jpg"
      },
      {
        name: "Dr. Michael Faraday",
        designation: "Assistant Professor",
        email: "michael.faraday@usm.edu.ph",
        image: "/images/faculty/michael-faraday.jpg"
      },
      {
        name: "Prof. James Watt",
        designation: "Lecturer",
        email: "james.watt@usm.edu.ph",
        image: "/images/faculty/james-watt.jpg"
      },
      {
        name: "Dr. Alessandro Volta",
        designation: "Professor",
        email: "alessandro.volta@usm.edu.ph",
        image: "/images/faculty/alessandro-volta.jpg"
      }
    ],
    "Bachelor of Technical Vocational Teacher Education major in Food and Service Management": [
      {
        name: "Chef Marie Antonie",
        designation: "Professor of Culinary Arts",
        email: "marie.antonie@usm.edu.ph",
        image: "/images/faculty/marie-antonie.jpg"
      },
      {
        name: "Prof. Julia Child",
        designation: "Associate Professor",
        email: "julia.child@usm.edu.ph",
        image: "/images/faculty/julia-child.jpg"
      },
      {
        name: "Dr. Gordon Ramsay",
        designation: "Assistant Professor",
        email: "gordon.ramsay@usm.edu.ph",
        image: "/images/faculty/gordon-ramsay.jpg"
      },
      {
        name: "Prof. Jamie Oliver",
        designation: "Lecturer",
        email: "jamie.oliver@usm.edu.ph",
        image: "/images/faculty/jamie-oliver.jpg"
      },
      {
        name: "Dr. Alice Waters",
        designation: "Professor",
        email: "alice.waters@usm.edu.ph",
        image: "/images/faculty/alice-waters.jpg"
      }
    ],
    "Bachelor of Technical Vocational Teacher Education major in Garments, Fashion and Design": [
      {
        name: "Prof. Coco Chanel",
        designation: "Professor of Fashion Design",
        email: "coco.chanel@usm.edu.ph",
        image: "/images/faculty/coco-chanel.jpg"
      },
      {
        name: "Dr. Giorgio Armani",
        designation: "Associate Professor",
        email: "giorgio.armani@usm.edu.ph",
        image: "/images/faculty/giorgio-armani.jpg"
      },
      {
        name: "Prof. Vera Wang",
        designation: "Assistant Professor",
        email: "vera.wang@usm.edu.ph",
        image: "/images/faculty/vera-wang.jpg"
      },
      {
        name: "Dr. Calvin Klein",
        designation: "Lecturer",
        email: "calvin.klein@usm.edu.ph",
        image: "/images/faculty/calvin-klein.jpg"
      },
      {
        name: "Prof. Donatella Versace",
        designation: "Professor",
        email: "donatella.versace@usm.edu.ph",
        image: "/images/faculty/donatella-versace.jpg"
      }
    ],

    // College of Technology
    "Bachelor of Technology major in Food and Beverage Preparation and Service Technology": [
      {
        name: "Chef Auguste Escoffier",
        designation: "Professor of Culinary Technology",
        email: "auguste.escoffier@usm.edu.ph",
        image: "/images/faculty/auguste-escoffier.jpg"
      },
      {
        name: "Prof. Ferran Adrià",
        designation: "Associate Professor",
        email: "ferran.adria@usm.edu.ph",
        image: "/images/faculty/ferran-adria.jpg"
      },
      {
        name: "Dr. Heston Blumenthal",
        designation: "Assistant Professor",
        email: "heston.blumenthal@usm.edu.ph",
        image: "/images/faculty/heston-blumenthal.jpg"
      },
      {
        name: "Prof. Massimo Bottura",
        designation: "Lecturer",
        email: "massimo.bottura@usm.edu.ph",
        image: "/images/faculty/massimo-bottura.jpg"
      },
      {
        name: "Dr. Rene Redzepi",
        designation: "Professor",
        email: "rene.redzepi@usm.edu.ph",
        image: "/images/faculty/rene-redzepi.jpg"
      }
    ],
    "Bachelor of Technology major in Civil Technology": [
      {
        name: "Engr. Gustave Eiffel",
        designation: "Professor of Civil Technology",
        email: "gustave.eiffel@usm.edu.ph",
        image: "/images/faculty/gustave-eiffel.jpg"
      },
      {
        name: "Prof. Isambard Brunel",
        designation: "Associate Professor",
        email: "isambard.brunel@usm.edu.ph",
        image: "/images/faculty/isambard-brunel.jpg"
      },
      {
        name: "Dr. Fazlur Khan",
        designation: "Assistant Professor",
        email: "fazlur.khan@usm.edu.ph",
        image: "/images/faculty/fazlur-khan.jpg"
      },
      {
        name: "Prof. Santiago Calatrava",
        designation: "Lecturer",
        email: "santiago.calatrava@usm.edu.ph",
        image: "/images/faculty/santiago-calatrava.jpg"
      },
      {
        name: "Dr. Zaha Hadid",
        designation: "Professor",
        email: "zaha.hadid@usm.edu.ph",
        image: "/images/faculty/zaha-hadid.jpg"
      }
    ],
      // Additional programs would follow the same pattern...
    
  };

  const colleges = [
    {
      id: 1,
      name: "College of Engineering",
      programs: [
        "Bachelor of Science in Industrial Engineering",
        "Bachelor of Science in Mechanical Engineering",
        "Bachelor of Science in Electrical Engineering",
        "Allied Engineering Faculty"
      ],
      description: "The College of Engineering at USM-Kidapawan City Campus offers programs designed to develop competent engineers equipped with technical knowledge and practical skills. Our curriculum emphasizes hands-on learning and industry partnerships to prepare students for real-world challenges."
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
      description: "The College of Education, Arts, and Sciences (CEAS) is committed to producing highly competent teachers and professionals. We provide quality education through innovative teaching methods, research, and community engagement to develop morally upright and globally competitive graduates."
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
      description: "The College of Technology offers technical-vocational programs that combine theoretical knowledge with practical skills training. Our state-of-the-art facilities and industry-experienced faculty prepare students for immediate employment in various technical fields."
    }
  ];

  const renderFaculty = (program) => {
    const faculty = facultyData[program];
    if (!faculty || faculty.length === 0) {
      return <p className="text-muted">Faculty information will be available soon.</p>;
    }

    return (
      <div className="mt-3">
        <h6 className="text-usmkc-green mb-3">Faculty Members:</h6>
        <Row>
          {faculty.map((member, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm">
                <div className="text-center pt-3">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    roundedCircle
                    fluid
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    className="border border-usmkc-green"
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="h6">{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted small">
                    {member.designations && member.designations.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {member.designations.map((designation, idx) => (
                          <li key={idx}>{designation}</li>
                        ))}
                      </ul>
                    ) : (
                      member.designation
                    )}
                  </Card.Subtitle>
                  <Card.Text className="small">
                    <a href={`mailto:${member.email}`} className="text-usmkc-green">{member.email}</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 text-usmkc-green">Academic Programs</h1>
      
      <Row className="mb-5">
        <Col>
          <Card className="border-usmkc-green shadow">
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title className="mb-0">Undergraduate Programs</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="lead">
                The University of Southern Mindanao - Kidapawan City Campus offers comprehensive undergraduate 
                programs across various disciplines. Our programs combine academic excellence with practical 
                skills development to prepare students for successful careers.
              </p>
              
              <Accordion>
                {colleges.map(college => (
                  <Accordion.Item eventKey={college.id} key={college.id}>
                    <Accordion.Header className="fw-bold">{college.name}</Accordion.Header>
                    <Accordion.Body>
                      <p className="mb-4">{college.description}</p>
                      <h5 className="text-usmkc-green mb-3">Offered Programs:</h5>
                      <ul className="list-unstyled">
                        {college.programs.map((program, index) => (
                          <li key={index} className="mb-4 pb-3 border-bottom">
                            <h6 className="text-usmkc-yellow">{program}</h6>
                            {renderFaculty(program)}
                          </li>
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
          <Card className="h-100 shadow">
            <Card.Header className="bg-usmkc-yellow text-black">
              <Card.Title className="mb-0">Graduate Programs</Card.Title>
            </Card.Header>
            <Card.Body>
              <h5 className="text-usmkc-green">Master's Degree Programs</h5>
              <ul className="mb-4">
                <li className="mb-2">Master of Arts in Education</li>
                <li className="mb-2">Master of Arts in Language and Literacy Education</li>
                <li className="mb-2">Master in Technology Education</li>
              </ul>
              
              <h5 className="text-usmkc-green">Doctoral Degree Programs</h5>
              <ul>
                <li>Doctor of Philosophy major in Technology Education and Management</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Header className="bg-usmkc-green text-white">
              <Card.Title className="mb-0">Certificate Programs</Card.Title>
            </Card.Header>
            <Card.Body>
              <h5 className="text-usmkc-green">Technical-Vocational Programs</h5>
              <ul className="mb-4">
                <li className="mb-2">Agricultural Crops Production NC III</li>
                <li className="mb-2">Food Processing NC II</li>
                <li className="mb-2">Computer Systems Servicing NC II</li>
              </ul>
              
              <h5 className="text-usmkc-green">Short Courses</h5>
              <ul>
                <li className="mb-2">Entrepreneurship Training</li>
                <li className="mb-2">Basic Computer Literacy</li>
                <li className="mb-2">Organic Farming Techniques</li>
                <li className="mb-2">Basic Automotive Servicing</li>
                <li>Food Safety and Sanitation</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Academics;