import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Image, Button, Badge } from 'react-bootstrap';

import coeImage from '../assets/images/coe.jpg';
import cotImage from '../assets/images/cot.jpg';
import ceasImage from '../assets/images/ceas.jpg';
import graduateImage from '../assets/images/graduate.jpg';
import straceImage from '../assets/images/strace.jpg';
import defaultCollegeImage from '../assets/images/default-college.jpg';

const Academics = () => {
  // Complete faculty data for all programs
  const facultyData = {
    // College of Engineering
    "Bachelor of Science in Industrial Engineering": [
      {
        name: "Engr. Shellah A. Guay, MBA",
        designation: "College of Engineering Department Head",
        image: "/images/faculty/guay.JPG",
        designations: [
          "College of Engineering Department Head",
          "Doctor of Business Management (on-going)"
        ]
      },
      {
        name: "Engr. Janet V. Lumang, MBA",
        designation: "Campus Director, Resource Generation",
        image: "/images/faculty/lumang.JPG",
        designations: [
          "Campus Director, Resource Generation",
          "Master in Eng’g.-Industrial Engineering (on-going)"
        ]
      },
      {
        name: "Engr. Andre Paul V. Espadera",
        designation: "Master in Engineering - Industrial Eng’g. (on-going)",
        image: "/images/faculty/espadera.JPG",
        designations: [
        ]
      }
    ],
    "Bachelor of Science in Mechanical Engineering": [
      {
        name: "Engr. Analiza B. Bingil, ME – ME",
        designation: "",
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
        image: "/images/staff/placeholder.png",
        designations: [
          "Professional Mechanical Engineer",
          "Registered Mechanical Engineer"
        ]
      },
      {
        name: "Engr. George F. Gamolo, ME – ME",
        designation: "Lecturer",
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
        image: "/images/faculty/rama.JPG",
        designations: [
          "PhD in Mathematics (on-going)",
          "Registered Mechanical Engineer)"
        ]
      },
       {
        name: "Engr. Reynald B. Villagomeza",
        designation: "Professor Emeritus",
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
        image: "/images/faculty/reston.JPG",
        designations: [
          "CoE LSG Adviser",
          "Registered Electrical Engineer",
          "Master Electrician"
        ]
      },
      {
        name: "Engr. Allan Roy A. Soriano, EE, RME, PEE",
        designation: "Assistant Professor",
        image: "/images/faculty/soriano.JPG",
        designations: [
          "Registered Master Electrician",
          "Me Program - Electronics Engineering (on-going)"
    
        ]
      }
    ],
    "Allied Engineering Faculty": [
      {
        name: "Engr. Erwin C. Bolasa, MEP Com. Eng.",
        designation: "Professor of Mathematics",
        image: "/images/faculty/bolasa.JPG",
        designations: [
          "Campus Director, Information & Communication",
          "Certified Computer Engineer"
        ]
      },
      {
        name: "Engr. Karl Eigen C. Castillo",
        designation: "Professor of Mathematics",
        image: "/images/faculty/castillo.JPG",
        designations: [
          "Registered Civil Engineer"
        ]
      },
      {
        name: "Engr. Ven Hur C. Tabugoc",
        designation: "Professor of Mathematics",
        image: "/images/faculty/tabugoc.JPG",
        designations: [
          "Registered Civil Engineer"
        ]
      }
    ],

    // College of Education, Arts and Sciences
    "Bachelor of Secondary Education major in Filipino": [
      {
        name: "Justfer John D. Aguilar, PhD",
        designation: "Professor of Filipino",
        image: "/images/faculty/aguilar.jpg",
        designations: [
          "Filipino Program Head, GAD Focal"
        ]
      },
      {
        name: "Rhizza C. Corneja",
        designation: "Associate Professor",
        image: "/images/faculty/corneja.jpg",
        designations: [
          "MA in Teaching Filipino (on-going)"
        ]
      },
      {
        name: "Ian Gil A. Mugdan",
        designation: "Assistant Professor",
        image: "/images/faculty/mugdan.jpg",
        designations: [
          "MA in Language Teaching Filipino (on-going)"
        ]
      },
      {
        name: "Kevin F. Porras",
        designation: "Lecturer",
        image: "/images/faculty/porras.jpg",
        designations: [
          "MA in Language Education - Filipino (on-going)",
          "College Extension Coordinator, Samahan ng Kabataang Makabansa Adviser"
        ]
      },
      {
        name: "Jo-Ann D. Santos, MALT",
        designation: "Professor Emeritus",
        image: "/images/faculty/santos.jpg",
        designations: [
          "PhD in Education Major in Filipino (on-going)",
          "Head, Culture and Arts"
        ]
      },
      {
        name: "Christine Mae S. Burato",
        designation: "Professor Emeritus",
        image: "/images/faculty/soliva.jpg",
        designations: [
          "Field Study Coordinator",
          "Practicum Supervisor",
          "USM-KCC Media Team Member"
        ]
      }
    ],
    "Bachelor of Secondary Education major in English": [
      {
        name: "Marlyn D. Apolinario, EdD",
        designation: "Professor of English",
        image: "/images/faculty/apolinario.JPG",
        designations: [
          "Department Chairperson, English Program Head"
        ]
      },
      {
        name: "Zilpah D. Abaring, MAEd",
        designation: "Associate Professor",
        image: "/images/faculty/abaring.JPG",
        designations: [
          "PhD in English Language and Literature (on-going)"
        ]
      },
      {
        name: "Joy P. Aguilar, PhD",
        designation: "Assistant Professor",
        image: "/images/faculty/aguilarjoy.JPG",
        designations: [
          "USM-KCC Media Team Member"
        ]
      },
      {
        name: "Mona Melliah C. Bañas, BSE Eng",
        designation: "Senior Lecturer",
        image: "/images/faculty/banas.JPG",
        designations: [
          "Master of Arts in Language and Literary Education (on-going)"
        ]
      },
      {
        name: "Maria Hynee A. Cabantog, MAEd",
        designation: "Professor",
        image: "/images/faculty/cabantog.JPG",
        designations: [
          "Master of Education in Language Teaching (on-going)"
        ]
      },
      {
        name: "Shara Joy P. Constantinopla, MALT",
        designation: "Professor",
        image: "/images/faculty/constantinopla.JPG",
        designations: [
          "Research Ethics, Journal, and Publication Head; and Leadership, Training, and Student Discipline Head",
          "PhD in Education major in English Language Teaching (on-going)"
        ]
      },
      {
        name: "Ian Leo S. Domingo, PhD",
        designation: "Professor",
        image: "/images/faculty/domingo.JPG",
        designations: [
          ""
        ]
      },
      {
        name: "Algin Mae L. Catulong, PhD",
        designation: "Professor",
        image: "/images/faculty/lagang.JPG",
        designations: [
          "Assistant to the Office of the Chancellor",
          "PhD in Education major in Applied Linguistics"
        ]
      },
      {
        name: "Vhenus B. Maglinte, PhD",
        designation: "Professor",
        image: "/images/faculty/maglinte.JPG",
        designations: [
          "College Dean"
        ]
      },
      {
        name: "Sarah R. Jover, PhD ",
        designation: "Professor",
        image: "/images/faculty/ramos.JPG",
        designations: [
          "GAD Focal Person"
        ]
      },
      {
        name: "Janice E. Reynes, PhD",
        designation: "Professor",
        image: "/images/faculty/reynes.JPG",
        designations: [
          "Internal Auditor, Admission Officer for English "
        ]
      },
      {
        name: "Clint Abygyl P. Serdon, MA",
        designation: "Professor",
        image: "/images/faculty/serdon.JPG",
        designations: [
          "Assistant to the CEAS Dean; CEAS LSG Adviser, Gen Ed & Prof Ed Program Head"
        ]
      },
      {
        name: "Rowena V. Sosas, PhD",
        designation: "Professor",
        image: "/images/faculty/sosas.JPG",
        designations: [
          "Director for Quality Assurance; Management Representative, Adviser for Student Publication (TTB); TWG for Insurance; English Club Adviser"
        ]
      }
    ],
    "Bachelor of Secondary Education major in Mathematics": [
      {
        name: "Carmee Lyn B. Paylangco, MS",
        designation: "Professor of Mathematics",
        image: "/images/faculty/paylangco.jpg",
        designations: [
          "PhD in Mathematical Sciences (CAR)",
          "PhD in Education major in Mathematics (on-going)",
          "USM-KCC Research Head",
          "BSE Mathematics Program Head",
          "Mathematics Enthusiasts’ Society Adviser",
          "Christian Brotherhood International Adviser"
        ]
      },
      {
        name: "Marlou P. Camano",
        designation: "Associate Professor",
        image: "/images/faculty/camano.jpg",
        designations: [
          "MAEd major in Mathematics (on-going)"
        ]
      },
      {
        name: "Gilbert B. Guita, MS",
        designation: "Assistant Professor",
        image: "/images/faculty/guita.jpg",
        designations: [
          "PhD in Education major in Mathematics (on-going)",
          "College Research Coordinator",
          "Program Admission Officer (BSE Math)",
          "7S Champion",
          "College PRAISE Committee member"
        ]
      },
      {
        name: "Girley M. Parillo, MA",
        designation: "Lecturer",
        image: "/images/faculty/parillo.jpg",
        designations: [
          "Doctor of Philosophy in Mathematical Sciences (on-going)"
        ]
      },
      {
        name: "Danilo G. Paunon, MA",
        designation: "Professor",
        image: "/images/faculty/paunon.jpg",
        designations: [
          "Civic Welfare Training Service (CWTS) Coordinator"
        ]
      }
    ],
    "Allied Secondary Education major in Mathematics Faculty": [
        {
        name: "Jimmy D. Rama, MA",
        designation: "Professor",
        image: "/images/faculty/rama.jpg",
        designations: [
          "PhD in Mathematics (on-going)",
          "Registered Mechanical Engineer)"
        ]
      },
      // {
      //   name: "Baikongan B. Guiaman, CPA",
      //   designation: "Professor of Mathematics",
      //   image: "/images/staff/guiaman.png",
      //   designations: [
      //     "Campus Director, Finance & Services",
      //     "Master of Science in Accountancy (on-going)"
      //   ]
      // }
    ],
    "Bachelor of Secondary Education major in Social Studies": [
      {
        name: "Michael E. Tacdoro, MAEd",
        designation: "Professor of Social Studies",
        image: "/images/faculty/tacdoro.jpg",
        designations: [
          "PhD in Social Sciences (on-going)",
          "Head, Student Regulation & Development, Social Studies Program Head"
        ]
      },
      {
        name: "Honeylen F. Balogbog, MAEd",
        designation: "Associate Professor",
        image: "/images/faculty/balogbog.jpg",
        designations: [
          ""
        ]
      },
      {
        name: "Ma. Karysa, F. Garcia, MBA",
        designation: "Assistant Professor",
        image: "/images/faculty/garcia.jpg",
        designations: [
          "PhD in Business Administration (on-going)",
          "Extension Head"
        ]
      },
      {
        name: "Isaac, B. Gutierrez, MS",
        designation: "Lecturer",
        image: "/images/faculty/gutierrez.jpg",
        designations: [
          "PhD in Community Development (on-going)"
        ]
      },
      {
        name: "Baiko L. Makasimbual",
        designation: "Professor",
        image: "/images/faculty/makasimbual.jpg",
        designations: [
          "MAEd major in Social Sciences (on-going)"
        ]
      },
      {
        name: "Quincy Gayle G. Malnegro",
        designation: "Professor",
        image: "/images/faculty/malnegro.jpg",
        designations: [
          "Master in Public Administration (on-going)",
          "Assistant to the Culture and Arts Head",
          "Document Control Center Head"

        ]
      },
      {
        name: "Marcos F. Monderin, JD, MA",
        designation: "Professor",
        image: "/images/faculty/monderin.jpg",
        designations: [
          "PhD in Philosophy (Candidate)",
          "Director for International Affairs Office and Micro-Credentials"
        ]
      }
    ],
    "Bachelor of Technical-Vocational Teacher Education Faculty": [
      {
        name: "Emilie S. Estelloso, PhD",
        designation: "Professor of Automotive Technology",
        image: "/images/faculty/estelloso.jpg",
        designations: [
          "BTVTED Program Head"
        ]
      },
      {
        name: "Glorie Mae R. Bation, BTTE",
        designation: "Associate Professor",
        image: "/images/faculty/bation.jpg",
        designations: [
          "Master of Technology Education (on-going)"
        ]
      },
      {
        name: "Steffi Van Languido, BTTE",
        designation: "",
        image: "/images/faculty/languido.jpg",
        designations: [
          // "BTTE"
        ]
      },
      {
        name: "Ken Jayrard D. Pan, BTTE",
        designation: "Senior Lecturer",
        image: "/images/faculty/pan.jpg",
        designations: [
          // "BTTE",
          "Master of Technology Education (on going)"
        ]
      },
      {
        name: "Nedenly A. Tabuan, BTTE",
        designation: "Professor",
        image: "/images/faculty/tabuan.jpg",
        designations: [
          // "BTTE",
          "Master of Technology Education (thesis writing)"
        ]
      }
    ],
    "Allied Technical-Vocational Teacher Education Faculty": [
      {
        name: "Jayson N. Evangelio",
        designation: "Professor",
        image: "/images/faculty/evangelio.jpg",
        designations: [
          "MTE"
        ]
      },
      {
        name: "James April C. Flores",
        designation: "Professor",
        image: "/images/faculty/flores.jpg",
        designations: [
          "BTTE",
          "Master of Technology Education (thesis writing)"
        ]
      },
      {
        name: "Jenny B. Mamacus",
        designation: "Professor",
        image: "/images/faculty/mamacus.jpg",
        designations: [
          "MTE"
        ]
      },
      {
        name: "Dennis S. Muyco",
        designation: "Professor",
        image: "/images/faculty/muyco.jpg",
        designations: [
          "MTE"
        ]
      },
      {
        name: "Frede Rick Jan G. Naparan",
        designation: "Professor",
        image: "/images/faculty/naparan.jpg",
        designations: [
          "MTE"
        ]
      },
      {
        name: "Jovany Omahoy",
        designation: "Professor",
        image: "/images/faculty/omahoy.jpg",
        designations: [
          "BT",
          "Master of Technology Education (on going)"
        ]
      },
    ],

    // NEW: General and Professional Education Program
    "General and Professional Education Program": {
      generalEducation: [
         {
          name: "Clint Abygyl P. Serdon, MA",
          designation: "College Dean",
          image: "/images/faculty/serdon.JPG",
          designations: ["Assistant to CEAS Dean;", "CEAS LSG Adviser", "Gen Ed & Proj Ed Program Head"]
        },
        {
          name: "Christoffer Roy R. Acelar, MAEd",
          designation: "",
          image: "/images/faculty/acelar.JPG",
          
        },
        {
          name: "Mercedes T. Centillo, MAT",
          designation: "Professor of Mathematics",
          image: "/images/faculty/centillo.jpg",
          designations: ["Science Laboratory"]
        },
        {
          name: "Yvonnie F. Corpuz, BPE",
          designation: "",
          image: "/images/faculty/corpuz.jpg",
          
        },
        {
          name: "Evangeline S. Gaspar, MAT",
          designation: "",
          image: "/images/faculty/gaspar.jpg",
         
        },
        {
          name: "Magno Jr. M. Gonzales, MAEd",
          designation: "Professor of English",
          image: "/images/faculty/gonzales.JPG",
          designations: ["Sports Development Head", "Faculty Association Representative"]
        },
        {
          name: "Raphael P. Ortigas, MA",
          designation: "Professor of English",
          image: "/images/faculty/ortigas.JPG",
          designations: ["Assistant Sport Coordinator", "BAC TWG Member"]
        },
        {
          name: "April Geraldine M. Quiñonero, MS - RED",
          designation: "Professor of English",
          image: "/images/faculty/quiñonero.JPG",
          designations: ["Campus Director Student Affairs and Services"]
        }
      ],
      professionalEducation: [
        {
          name: "Clint Abygyl P. Serdon, MA",
          designation: "College Dean",
          image: "/images/faculty/serdon.JPG",
          designations: ["Assistant to CEAS Dean;", "CEAS LSG Adviser", "Gen Ed & Proj Ed Program Head"]
        },
        {
          name: "Jeanne Y. Aure, EdD",
          designation: "College Dean",
          image: "/images/faculty/aure.JPG",
          designations: ["Campus Director for Instruction", "NSTP Campus Director", "SIPP Coordinator"]
        },
        {
          name: "Ruby V. Colomer, MA",
          designation: "Professor",
          image: "/images/faculty/colomer.JPG",
          designations: ["Counseling and Career Development Head"]
        },
        {
          name: "Vicky Q. Grijaldo, MEP - ECE",
          designation: "Professor",
          image: "/images/faculty/grijaldo.JPG",
          designations: ["Former Instruction Director"]
        },
        {
          name: "Phoebe Norvin B. Lacbayo, MAEd",
          designation: "Professor",
          image: "/images/faculty/lacbayo.JPG",
          designations: ["Data Privacy Officer", "Program Admission Officer (BTVTED ELX)"]
        },
        {
          name: "Michelle S. Pomares, MS CeP",
          designation: "Professor",
          image: "/images/faculty/mpomares.JPG",
          designations: [""]
        },
        {
          name: "Ramil B. Purungganan, PhD",
          designation: "Professor",
          image: "/images/faculty/purungganan.JPG",
          designations: [""]
        }
      ]
    },

    // College of Technology
    "Automotive Technology": [
      {
        name: "JAYSON N. EVANGELIO, MTE",
        designation: "Professor of Civil Technology",
        image: "/images/faculty/evangelio.jpg",
        designations: [
          "Unit Head",
          "USM-KCC Media Team Member",
          "CoT Document Controller"
        ]
      },
      {
        name: "JAMES APRIL C. FLORES, LPT ",
        designation: "Associate Professor",
        image: "/images/faculty/jaflores.jpg",
        designations: [
          "Master of Technology Education (on-going)"
        ]
      },
      {
        name: "ERNEL P. HORNADA, MTE",
        designation: "Assistant Professor",
        image: "/images/faculty/hornada.jpg",
        designations: [
          "TESDA Accredited Assessor/Trainer",
          "LTO Accredited Trainer"
        ]
      },
      {
        name: "JONEL W. ISMAEL, PhD",
        designation: "Lecturer",
        image: "/images/faculty/ismael.jpg",
        designations: [
          "Doctor of Philosophy in Technology Management",
          "Assistant to the Chancellor"
        ]
      },
      {
        name: "BEN HUR G. MELODIAS, JR. ",
        image: "/images/faculty/zaha-hadid.jpg"
      },
      {
        name: "FREDDE RICK JAN G. NAPARAN, MTE ",
        designation: "Lecturer",
        image: "/images/faculty/naparan.jpg",
        designations: [
          "CoT (BT) Research Coordinator",
          "USM-KCC Alumni Coordinator",
          "USM-KCC Media Team Member"
        ]
      },
      {
        name: "JOVANY D. OMAHOY ",
        designation: "Lecturer",
        image: "/images/faculty/omahoy.jpg",
        designations: [
          "Master of Technology Education (on-going)",
          "OJT Coordinator",
          "TESDA Accredited Assessor/Trainer"
        ]
      },{
        name: "Jonathan D. Renoblas, PhD",
        designation: "Lecturer",
        image: "/images/faculty/omahoy.jpg",
        designations: [
          "OJT Coordinator",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
    ],

    "Civil Technology": [
      {
        name: "NIÑO CHELVIN E. SABIT, MAEd",
        designation: "Lecturer",
        image: "/images/faculty/nsabit.jpg",
        designations: [
          "Unit Head, Civil Technology",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
      {
        name: "JULIUS G. ALMARIEGO, EdD",
        designation: "Lecturer",
        image: "/images/faculty/almariego.jpg",
        designations: [
          "Coordinator, USM-KCC Disaster Risk Reduction and Management (DRRM)"
        ]
      },
    ],

    "Electronics Technology": [
      {
        name: "MATT EDISON G. ALCANTARA, PhD",
        designation: "Lecturer",
        image: "/images/faculty/alcantara.jpg",
        designations: [
          "Department Head, Technology ",
          "Unit Head, Electronics Technology",
          "OJT Coordinator",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
      {
        name: "DHEALYN DECEE V. SABIT, PhD",
        designation: "Lecturer",
        image: "/images/faculty/sabit.jpg",
        designations: [
          "Director, USM-KCC Research and Extension Services",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
    ],

    "Electrical Technology": [
      {
        name: "BRYAN A. TOMADA, MATIA",
        designation: "Lecturer",
        image: "/images/faculty/tomada.jpg",
        designations: [
          "Unit Head, Electrical Technology",
          "CoT Extension Coordinator OJT Coordinator"
        ]
      },
      {
        name: "JOHN MAR D. IBARRA, MATIA",
        designation: "Lecturer",
        image: "/images/faculty/ibarra.jpg",
        designations: [
          "Head, Intellectual Property Office (IPO)",
          "OJT Coordinator"
        ]
      },
      {
        name: "KEVIN MARK D. CATULONG, MTE",
        designation: "Lecturer",
        image: "/images/faculty/catulong.jpg",
        designations: [
          "Adviser, CoT LSG",
          "OJT Coordinator"
        ]
      },
      {
        name: "MARK ANTHONY T. HONORARIO, MTE",
        designation: "Lecturer",
        image: "/images/faculty/honorario.jpg",
        designations: [
          "USM-KCC Media Team Member"
        ]
      },
      {
        name: "ANTHONY RUSTY P. SILGUERA",
        designation: "Lecturer",
        image: "/images/faculty/silguera.jpg",
        designations: [
          "Master of Technology Education (on-going)"
        ]
      },
    ],

    "Heating, Ventilating, and Air-Conditioning": [
      {
        name: "LIEZEL L. MANTAWIL, MVT",
        designation: "Lecturer",
        image: "/images/faculty/mantawil.jpg",
        designations: [
          "Unit Head, HVACR Technology",
          "OJT Coordinator"
        ]
      },
      {
        name: "JAMES J. LIM, MTE",
        designation: "Lecturer",
        image: "/images/faculty/lim.jpg",
        designations: [
          "OJT Coordinator"
        ]
      },
      {
        name: "Vanessa Jane C. Lim, PhD",
        designation: "Lecturer",
        image: "/images/faculty/lim.jpg",
        designations: [
          ""
        ]
      },
    ],

    "Mechanical Technology": [
      {
        name: "MARCIAL R. CORNELIO, MAEd",
        designation: "Lecturer",
        image: "/images/faculty/cornelio.jpg",
        designations: [
          "Unit Head, Mechanical Technology",
          "OJT Coordinator"
        ]
      },
      {
        name: "ROSELL MAE C. BALASO, MTE",
        image: "/images/faculty/balaso.jpg",
      },
      {
        name: "JAKE F. TIGAO",
        designation: "Lecturer",
        image: "/images/faculty/tigao.jpg",
        designations: [
          "Master of Technology Education (on-going)"
        ]
      },
    ],
    "Welding and Fabrication Technology": [
      {
        name: "NELBEN B. MAIT, MTE",
        designation: "Lecturer",
        image: "/images/faculty/mait.jpg",
        designations: [
          "Unit Head, WAF Technology",
          "TESDA Accredited Assessor/Trainer"
        ]
      }
    ],
    "Food Science and Technology": [
      {
        name: "APRIL ROSE B. FLORES, PhD",
        designation: "Lecturer",
        image: "/images/faculty/aflores.jpg",
        designations: [
          "Graduate School Coordinator",
          "",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
       {
        name: "JOSEPHINE G. GONZAGA, PhD",
        designation: "Lecturer",
        image: "/images/faculty/gonzaga.jpg",
        designations: [
          "Department Head, BINDTECH",
          "OJT Coordinator",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
      {
        name: "RHEA MAE BARBADILLO, MTE",
        image: "/images/faculty/santiago-calatrava.jpg",
      },
      {
        name: "SHEILA MAE A. HORTILLOSA, MTE",
        designation: "Lecturer",
        image: "/images/faculty/hortillosa.jpg",
        designations: [
          "BIT Research Coordinator"
        ]
      },
      {
        name: "KATHRYN D. JUAREZ, PhD",
        designation: "Lecturer",
        image: "/images/faculty/juarez.jpg",
        designations: [
          "Unit Head, BIndTech FBPST",
          "TESDA Accredited Assessor/Trainer"
        ]
      },
      {
        name: "JENNY B. MAMACUS, MTE",
        designation: "Lecturer",
        image: "/images/faculty/mamacus.jpg",
        designations: [
          "TESDA Accredited Assessor/Trainer"
        ]
      },
      {
        name: "DENNIS S. MUYCO, MTE ",
        designation: "Lecturer",
        image: "/images/faculty/muyco.jpg",
        designations: [
          "Unit Head, BIndTech Culinary",
          "Adviser, ASG"
        ]
      },
      {
        name: "BERNARDO O. NACUBUAN JR., LPT",
        designation: "Lecturer",
        image: "/images/faculty/nacubuan.jpg",
        designations: [
          "Master of Technology Education (on-going)"
        ]
      },
      {
        name: "JESTONY A. PAN, MTE",
        designation: "Lecturer",
        image: "/images/faculty/jpan.jpg",
        designations: [
          "Food Laboratory In-Charge"
        ]
      },
      {
        name: "ALTHEA LOU REMANDABAN",
        designation: "Lecturer",
        image: "/images/faculty/remandaban.jpg",
        designations: [
          "Masters in International Tourism and Hospitality Management (on-going)"
        ]
      },
      {
        name: "SYGI B. SALIGUMBA, MTE",
        image: "/images/faculty/santiago-calatrava.jpg",
      },
    ],
    "Allied Food Science and Technology Faculty": [
      {
        name: "RONIELYN F. PINSOY, EdD",
        designation: "Lecturer",
        image: "/images/faculty/pinsoy.jpg",
        designations: [
          "USM – KCC Chancellor",
          "Management Courses"
        ]
      },
      {
        name: "EMILOU N. GALLARDO, PhD",
        designation: "Lecturer",
        image: "/images/faculty/gallardo.jpg",
        designations: [
          "Occupational Health and Safety Management Courses"
        ]
      },
      {
        name: "MARLOWE E. LLORITO, MATIA",
        designation: "Lecturer",
        image: "/images/faculty/llorito.jpg",
        designations: [
          "OIC Vice Chancellor, Head, FABLAB",
          "Head, USM-AVAS Extension Campus",
          "Drafting Technology"
        ]
      },
      {
        name: "MARIANNE O. MILLAROSA, MAEd",
        designation: "Lecturer",
        image: "/images/faculty/millarosa.jpg",
        designations: [
          "General Education Courses"
        ]
      },
      {
        name: "MARIA ELENA P. PINEDA, MBA ",
        designation: "Lecturer",
        image: "/images/faculty/pineda.jpg",
        designations: [
          "Director, Admission and Records Office (ARO)",
          "Accounting and General Education Courses"
        ]
      },
      {
        name: "JOHN RAY AGUSTIN, LPT ",
        designation: "Lecturer",
        image: "/images/faculty/agustin.jpg",
        designations: [
          "Drafting Technology"
        ]
      },
    ],
  };

  const colleges = [
    {
      id: 1,
      name: "College of Engineering",
      image: coeImage,
      programs: [
        "Bachelor of Science in Industrial Engineering",
        "Bachelor of Science in Mechanical Engineering",
        "Bachelor of Science in Electrical Engineering",
      ],
      description: "The College of Engineering at USM-Kidapawan City Campus offers programs designed to develop competent engineers equipped with technical knowledge and practical skills. Our curriculum emphasizes hands-on learning and industry partnerships to prepare students for real-world challenges."
    },
    {
      id: 2,
      name: "College of Education, Arts and Sciences",
      image: ceasImage,
      programs: [
        "Bachelor of Secondary Education major in Filipino",
        "Bachelor of Secondary Education major in English",
        "Bachelor of Secondary Education major in Mathematics",
        "Allied Secondary Education major in Mathematics Faculty",
        "Bachelor of Secondary Education major in Social Studies",
        "Bachelor of Technical-Vocational Teacher Education Faculty",
        "General and Professional Education Program"
      ],
      description: "The College of Education, Arts, and Sciences (CEAS) is committed to producing highly competent teachers and professionals. We provide quality education through innovative teaching methods, research, and community engagement to develop morally upright and globally competitive graduates."
    },
    {
      id: 3,
      name: "College of Technology",
      image: cotImage,
      programs: [
        "Automotive Technology",
        "Civil Technology",
        "Electronics Technology",
        "Electrical Technology",
        "Heating, Ventilating, and Air-Conditioning",
        "Mechanical Technology",
        "Welding and Fabrication Technology",
        "Food Science and Technology"
      ],
      description: "The College of Technology offers technical-vocational programs that combine theoretical knowledge with practical skills training. Our state-of-the-art facilities and industry-experienced faculty prepare students for immediate employment in various technical fields."
    }
  ];

   const collegeDeans = {
    "College of Engineering": {
      name: "Engr. Analiza B. Bingil, ME – ME",
      designation: "College Dean",
      image: "/images/faculty/bingil.JPG",
      details: [
        "Doctor of Engineering in Energy System (on going)",
        "Registered Mechanical Engineer"
      ]
    },
    "College of Education, Arts and Sciences": {
      name: "Vhenus B. Maglinte, PhD",
      designation: "College Dean",
      image: "/images/faculty/maglinte.JPG",
      details: []
    },
    "College of Technology": {
      name: "APRIL ROSE B. FLORES, PhD",
      designation: "Dean, College of Technology",
      image: "/images/faculty/aflores.jpg",
      details: [
        "Graduate School Coordinator",
        "",
        "TESDA Accredited Assessor/Trainer"
      ]
    }
  };

  // Add program heads information
  const programHeads = {
    "College of Engineering": {
      "College of Engineering Department Head": "Engr. Shellah A. Guay, MBA",
    },
    "College of Education, Arts and Sciences": {
      "Bachelor of Secondary Education major in Filipino": "Justfer John D. Aguilar, PhD",
      "Bachelor of Secondary Education major in English": "Marlyn D. Apolinario, EdD",
      "Bachelor of Secondary Education major in Mathematics": "Carmee Lyn B. Paylangco, MS",
      "Bachelor of Secondary Education major in Social Studies": "Michael E. Tacdoro, MAEd",
      "Bachelor of Technical-Vocational Teacher Education Faculty": "Emilie S. Estelloso, PhD",
      "General and Professional Education Program": "Clint Abygyl P. Serdon, MA"
    },
    "College of Technology": {
      "Automotive Technology": "JAYSON N. EVANGELIO, MTE",
      "Civil Technology": "NIÑO CHELVIN E. SABIT, MAEd",
      "Electronics Technology": "MATT EDISON G. ALCANTARA, PhD",
      "Electrical Technology": "BRYAN A. TOMADA, MATIA",
      "Heating, Ventilating, and Air-Conditioning": "LIEZEL L. MANTAWIL, MVT",
      "Mechanical Technology": "MARCIAL R. CORNELIO, MAEd",
      "Welding and Fabrication Technology": "NELBEN B. MAIT, MTE",
      "Food Science and Technology": "KATHRYN D. JUAREZ, PhD"
    }
  };

  const programDescriptions = {
  // College of Engineering programs
  "Bachelor of Science in Industrial Engineering": {
    description: "The Bachelor of Science in Industrial Engineering program is intended to prepare students for a professional Industrial Engineering career including a leading role in the design, improvement, and installation of integrated systems of people, materials, information, equipment, and energy. Graduates of the program must have specialized knowledge and skills in the mathematical, physical, and social sciences together with the principles and methods of engineering analysis and design to specify, predict, and evaluate the results to be obtained from such systems.",
    objectives: [
      "Ability to apply knowledge of mathematics and science to solve complex industrial engineering problems.",
      "Ability to design and conduct experiments, as well as to analyse and interpret data",
      "Ability to design a system, component, or process to meet desired needs with realistic constraints such as economic, environmental, social, political, ethical, health and safety, manufacturability, and sustainability, in accordance with standards",
      "Ability to function on multidisciplinary and multicultural teams",
      "Ability to identify, formulate, and solve complex industrial engineering problems",
      "Understanding of professional and ethical responsibility",
      "Ability to communicate effectively"
    ]
  },
  "Bachelor of Science in Mechanical Engineering": {
    description: "Mechanical Engineering is a profession that concerns itself with mechanical design, energy conversion, fuel and combustion technologies, heat transfer, materials, noise control and acoustics, manufacturing processes, rail transportation, automatic control, product safety and reliability, solar energy, and technological impacts to the society. Mechanical engineers study the behaviour of materials when forces are applied to them, such as the motion of solids, liquids, gases, and heating and cooling of object and machines. Using these basic building blocks, mechanical engineers design space vehicles, computers, power plants, intelligent machines and robots, automobile, trains, airplanes, furnaces, and air-conditioners. Mechanical engineers work on jet engine design, submarines, hot air balloons, textile and new materials, medical and hospital equipment, and refrigerator and other home appliances. Anything that is mechanical or must interact with another machine or human being is within the broad scope of mechanical engineering.",
    objectives: [
      "Apply knowledge of mathematics and science to solve complex mechanical engineering problems;",
      "Design and conduct experiments, as well as to analyse and interpret data;",
      "Design a system, component, or process to meet desired needs within realistic constraints, in accordance with standards;",
      "Function in multidisciplinary and multi-cultural teams;",
      "Identify, formulate, and solve complex mechanical engineering problems;",
      "Understand professional and ethical responsibility;",
      "Communicate effectively;",
      "Understand the impact of mechanical engineering solutions in a global, economic, environmental, and societal context;",
      "Recognize the need for, and engage in life-long learning",
      "Know contemporary issues;",
      "Use techniques, skills, and modern engineering tools necessary mechanical engineering practice;",
      "Know and understand engineering and management principles as a member and leader of a team, and to manage projects in a multidisciplinary environment."
    ]
  },
  "Bachelor of Science in Electrical Engineering": {
    description: "The BSEE program equips students with knowledge in electrical systems, power generation, transmission, and electronics.",
    objectives: [
      "Produce electrical engineers proficient in power systems and electronics",
      "Develop skills in electrical system design, analysis, and implementation",
      "Prepare graduates for careers in power utilities, telecommunications, and electronics industries"
    ]
  },
  "Allied Engineering Faculty": {
    description: "Allied faculty supporting all programs in the College of Engineering. They bring expertise from various disciplines including mathematics, civil engineering, chemical engineering, finance, and information technology.",
    objectives: [
      "Provide interdisciplinary support across all College of Engineering programs",
      "Enhance student learning through diverse professional backgrounds",
      "Bridge engineering principles with business, finance, and IT applications"
    ]
  },

  // College of Education, Arts and Sciences programs
  "Bachelor of Secondary Education major in Filipino": {
    description: "The BSEd Filipino program prepares students to become competent teachers specializing in Filipino language and literature.",
    objectives: [
      "Produce highly competent teachers in Filipino language and literature",
      "Develop effective communication and teaching skills in Filipino",
      "Promote appreciation and preservation of Filipino culture and heritage"
    ]
  },
  "Bachelor of Secondary Education major in English": {
    description: "The BSEd English program develops educators proficient in English language teaching and literature.",
    objectives: [
      "Produce competent English teachers with strong language proficiency",
      "Develop skills in teaching English as a second language",
      "Prepare graduates for careers in education, research, and language-related fields"
    ]
  },
  "Bachelor of Secondary Education major in Mathematics": {
    description: "The BSEd Mathematics program prepares students to become effective mathematics teachers in secondary education.",
    objectives: [
      "Produce mathematics teachers with strong content knowledge and pedagogical skills",
      "Develop problem-solving and critical thinking abilities",
      "Prepare graduates to effectively teach mathematics at the secondary level"
    ]
  },
  "Bachelor of Secondary Education major in Social Studies": {
    description: "The BSEd Social Studies program equips students with knowledge in history, geography, economics, and political science for teaching.",
    objectives: [
      "Produce social studies teachers with comprehensive understanding of social sciences",
      "Develop skills in teaching history, geography, economics, and governance",
      "Promote civic consciousness and national identity among students"
    ]
  },
  "Bachelor of Technical-Vocational Teacher Education Faculty": {
    description: "The BTVTED program prepares teachers for technical-vocational education in various specialized fields.",
    objectives: [
      "Produce competent technical-vocational teachers and trainers",
      "Develop skills in teaching technical subjects with practical applications",
      "Prepare graduates for careers in technical education and skills training"
    ]
  },
  "General and Professional Education Program": {
    description: "The General and Professional Education Program provides foundational and professional education courses essential for teacher education. It equips future educators with the necessary pedagogical theories, teaching methodologies, and subject matter expertise across various disciplines.",
    objectives: [
      "Develop a strong foundation in general education subjects including languages, mathematics, sciences, and social sciences.",
      "Provide comprehensive professional education training including teaching strategies, classroom management, assessment, and curriculum development.",
      "Prepare students for the Licensure Examination for Teachers (LET) and effective teaching practice in basic education."
    ]
  },

  // College of Technology programs
  "Automotive Technology": {
    description: "The Automotive Technology program provides training in vehicle maintenance, repair, and diagnostics.",
    objectives: [
      "Produce skilled automotive technicians with industry-standard competencies",
      "Develop skills in vehicle maintenance, repair, and diagnostics",
      "Prepare graduates for careers in automotive service and repair industry"
    ]
  },
  "Civil Technology": {
    description: "The Civil Technology program focuses on construction techniques, materials, and project management.",
    objectives: [
      "Produce skilled civil technology professionals for construction industry",
      "Develop competencies in construction techniques and project management",
      "Prepare graduates for careers in construction and infrastructure development"
    ]
  },
  "Electronics Technology": {
    description: "The Electronics Technology program provides training in electronic devices, circuits, and systems.",
    objectives: [
      "Produce electronics technicians with strong technical skills",
      "Develop competencies in electronic circuit design and troubleshooting",
      "Prepare graduates for careers in electronics manufacturing and service industries"
    ]
  },
  "Electrical Technology": {
    description: "The Electrical Technology program focuses on electrical installation, maintenance, and power systems.",
    objectives: [
      "Produce skilled electrical technicians with industry competencies",
      "Develop skills in electrical installation, maintenance, and troubleshooting",
      "Prepare graduates for careers in electrical services and power industries"
    ]
  },
  "Heating, Ventilating, and Air-Conditioning": {
    description: "The HVAC program provides training in climate control systems installation and maintenance.",
    objectives: [
      "Produce skilled HVAC technicians with industry-standard competencies",
      "Develop skills in installation, maintenance, and repair of HVAC systems",
      "Prepare graduates for careers in climate control and refrigeration industries"
    ]
  },
  "Mechanical Technology": {
    description: "The Mechanical Technology program focuses on machine operation, maintenance, and fabrication.",
    objectives: [
      "Produce skilled mechanical technicians with practical competencies",
      "Develop skills in machine operation, maintenance, and fabrication",
      "Prepare graduates for careers in manufacturing and mechanical services"
    ]
  },
  "Welding and Fabrication Technology": {
    description: "The Welding and Fabrication program provides training in various welding techniques and metal fabrication.",
    objectives: [
      "Produce skilled welders and metal fabricators with industry competencies",
      "Develop proficiency in various welding techniques and metal fabrication",
      "Prepare graduates for careers in construction, manufacturing, and metal industries"
    ]
  },
  "Food Science and Technology": {
    description: "The Food Science and Technology program focuses on food processing, safety, and quality control.",
    objectives: [
      "Produce food technologists with knowledge in food processing and safety",
      "Develop skills in food production, quality control, and safety standards",
      "Prepare graduates for careers in food manufacturing and processing industries"
    ]
  },
  "Allied Food Science and Technology Faculty": {
    description: "Allied faculty supporting all programs in the College of Technology. They bring expertise from various disciplines including management, health and safety, drafting, general education, and more.",
    objectives: [
      "Provide interdisciplinary support across all College of Technology programs",
      "Enhance student learning through diverse professional backgrounds",
      "Bridge industry and academic practices"
    ]
  }
};

const [activeCollege, setActiveCollege] = useState(null);
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [expandedAlliedCoE, setExpandedAlliedCoE] = useState(false);
  const [expandedAlliedCoT, setExpandedAlliedCoT] = useState(false);

  const renderFaculty = (program) => {
    // Special handling for General and Professional Education Program (nested categories)
    if (program === "General and Professional Education Program") {
      const data = facultyData[program];
      if (!data || (!data.generalEducation && !data.professionalEducation)) {
        return <p className="text-muted">Faculty information will be available soon.</p>;
      }
      const programInfo = programDescriptions[program] || {};

      return (
        <div className="mt-4">
          {programInfo.description && (
            <div className="program-info mb-4">
              <h6 className="text-usmkc-green mb-2 fw-semibold">Program Description</h6>
              <p className="text-muted">{programInfo.description}</p>
              {programInfo.objectives && programInfo.objectives.length > 0 && (
                <>
                  <h6 className="text-usmkc-green mb-2 fw-semibold">Program Objectives</h6>
                  <ul className="text-muted">
                    {programInfo.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* General Education Section */}
          <h5 className="text-usmkc-green mb-3 fw-bold border-bottom pb-2">Faculty: General Education</h5>
          <Row>
            {data.generalEducation && data.generalEducation.map((member, index) => (
              <Col md={6} lg={4} key={`gen-${index}`} className="mb-4">
                <Card className="h-100 shadow-sm faculty-card border-0">
                  <div className="text-center pt-3">
                    <div className="faculty-image-container mx-auto">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        fluid
                        className="faculty-image"
                        onError={(e) => {
                          e.target.src = '/images/staff/placeholder.png';
                        }}
                      />
                    </div>
                  </div>
                  <Card.Body className="text-center px-3">
                    <Card.Title className="h6 faculty-name fw-bold mb-2">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small faculty-designation">
                      {member.designations && member.designations.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {member.designations.map((designation, idx) => (
                            <li key={idx} className="mb-1">{designation}</li>
                          ))}
                        </ul>
                      ) : (
                        member.designation
                      )}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Professional Education Section */}
          <h5 className="text-usmkc-green mb-3 fw-bold border-bottom pb-2 mt-4">Faculty: Professional Education</h5>
          <Row>
            {data.professionalEducation && data.professionalEducation.map((member, index) => (
              <Col md={6} lg={4} key={`prof-${index}`} className="mb-4">
                <Card className="h-100 shadow-sm faculty-card border-0">
                  <div className="text-center pt-3">
                    <div className="faculty-image-container mx-auto">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        fluid
                        className="faculty-image"
                        onError={(e) => {
                          e.target.src = '/images/staff/placeholder.png';
                        }}
                      />
                    </div>
                  </div>
                  <Card.Body className="text-center px-3">
                    <Card.Title className="h6 faculty-name fw-bold mb-2">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted small faculty-designation">
                      {member.designations && member.designations.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {member.designations.map((designation, idx) => (
                            <li key={idx} className="mb-1">{designation}</li>
                          ))}
                        </ul>
                      ) : (
                        member.designation
                      )}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    // Default rendering for all other programs (simple array of faculty)
    const faculty = facultyData[program];
    if (!faculty || faculty.length === 0) {
      return <p className="text-muted">Faculty information will be available soon.</p>;
    }
    const programInfo = programDescriptions[program] || {};
    return (
      <div className="mt-4">
        {programInfo.description && (
        <div className="program-info mb-4">
          <h6 className="text-usmkc-green mb-2 fw-semibold">Program Description</h6>
          <p className="text-muted">{programInfo.description}</p>
          
          {programInfo.objectives && programInfo.objectives.length > 0 && (
            <>
              <h6 className="text-usmkc-green mb-2 fw-semibold">Program Objectives</h6>
              <ul className="text-muted">
                {programInfo.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
        <h6 className="text-usmkc-green mb-3 fw-semibold">Faculty Members</h6>
        <Row>
          {faculty.map((member, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className="h-100 shadow-sm faculty-card border-0">
                <div className="text-center pt-3">
                  <div className="faculty-image-container mx-auto">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fluid
                      className="faculty-image"
                      onError={(e) => {
                        e.target.src = '/images/staff/placeholder.png';
                      }}
                    />
                  </div>
                </div>
                <Card.Body className="text-center px-3">
                  <Card.Title className="h6 faculty-name fw-bold mb-2">{member.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted small faculty-designation">
                    {member.designations && member.designations.length > 0 ? (
                      <ul className="list-unstyled mb-0">
                        {member.designations.map((designation, idx) => (
                          <li key={idx} className="mb-1">{designation}</li>
                        ))}
                      </ul>
                    ) : (
                      member.designation
                    )}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  // Updated renderCollegeLeadership: only College of Technology has Department Heads (2)
  const renderCollegeLeadership = (collegeName) => {
    const dean = collegeDeans[collegeName];
    const heads = programHeads[collegeName];

    // Department Heads data for College of Technology only
    let departmentHeads = [];
    if (collegeName === "College of Technology") {
      departmentHeads = [
        {
          name: "Josephine G. Gonzaga, PhD",
          role: ["Department Head;", " Food Science & Technology",", OJT Coordinator", ", TESDA Accredited Assesor/Trainer"],
          image: "/images/faculty/aflores.jpg",
        },
        {
          name: "Matt Edison G. Alcantara, PhD",
          role: "Department Head, Technology, Unit Head, Electronics Technology, OJT Coordinator, TESDA Accredited, Assesor/Trainer",
          image: "/images/faculty/sabit.jpg",
        }
      ];
    }

    return (
      <div className="college-leadership mb-5">
        <h4 className="text-usmkc-green mb-4 fw-bold section-title">College Leadership</h4>

        {/* DEAN – large profile card */}
        <div className="dean-card text-center mb-4">
          <div className="position-relative">
            <div className="dean-connector mx-auto"></div>
            <Card className="dean-profile mx-auto border-0 shadow">
              <div className="text-center pt-4">
                <div className="dean-image-container mx-auto">
                  <Image
                    src={dean.image}
                    alt={dean.name}
                    fluid
                    className="dean-image"
                    onError={(e) => (e.target.src = '/images/staff/placeholder.png')}
                  />
                </div>
              </div>
              <Card.Body className="text-center">
                <Badge bg="usmkc-yellow" text="dark" className="mb-2">Dean</Badge>
                <Card.Title className="h5 text-usmkc-green fw-bold">{dean.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{dean.designation}</Card.Subtitle>
                {dean.details && dean.details.length > 0 && (
                  <ul className="list-unstyled mt-2">
                    {dean.details.map((detail, idx) => (
                      <li key={idx} className="small text-muted">{detail}</li>
                    ))}
                  </ul>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>

        {/* DEPARTMENT HEADS – only for College of Technology, shown as a row of cards */}
        {departmentHeads.length > 0 && (
          <>
            <h5 className="text-usmkc-green mb-4 fw-semibold">Department Heads</h5>
            <Row className="justify-content-center program-heads-row mb-4">
              {departmentHeads.map((deptHead, idx) => (
                <Col md={6} lg={4} key={idx}>
                  <div className="program-head-card position-relative">
                    <Card className="h-100 text-center border-0 shadow-sm">
                      <Card.Body className="py-3">
                        <Badge bg="light" text="usmkc-green" className="mb-2">Department Head</Badge>
                        <Card.Title className="h6 text-usmkc-green fw-semibold">{deptHead.name}</Card.Title>
                        <Card.Subtitle className="mb-2 small text-muted">{deptHead.role}</Card.Subtitle>
                        {deptHead.image && (
                          <div className="mt-2">
                            <Image
                              src={deptHead.image}
                              alt={deptHead.name}
                              width="80"
                              height="80"
                              roundedCircle
                              onError={(e) => (e.target.src = '/images/staff/placeholder.png')}
                            />
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}

        {/* PROGRAM / UNIT HEADS – compact cards */}
        <h5 className="text-usmkc-green mb-4 fw-semibold">
          {collegeName === "College of Technology" ? "Unit Heads" : "Department Chairperson"}
        </h5>
        <Row className="justify-content-center program-heads-row">
          {Object.entries(heads).map(([program, headName], index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <div className="program-head-card position-relative">
                <div className="head-connector"></div>
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body className="py-3">
                    <Badge bg="light" text="usmkc-green" className="mb-2">
                      {collegeName === "College of Technology" ? "Unit Head" : "Program Head"}
                    </Badge>
                    <Card.Title className="h6 text-usmkc-green fw-semibold">{headName}</Card.Title>
                    <Card.Subtitle className="mb-2 small text-muted">{program}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <div className="academics-page">
      {/* Hero Section */}
      <div className="academics-hero bg-gradient-usmkc text-white py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="display-4 fw-bold mb-3">Academic Programs</h1>
              <p className="lead text-white mb-4">Excellence in Education, Innovation, and Community Service</p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                
              </div>
            </Col>
          </Row>
        </Container>
      </div>

       <Container className="py-5">
      {/* College Selection Cards - Default View */}
      {!activeCollege && (
        <Row className="mb-5">
          <Col>
            <h2 className="text-center text-usmkc-green mb-4 fw-bold">Campus Colleges</h2>
            <Row className="g-4">
              {colleges.map(college => (
                <Col md={6} lg={4} key={college.id}>
                  <Card 
                    className="h-100 shadow college-card text-center border-0" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveCollege(college)}
                  >
                    <div className="college-image-container">
                      <Card.Img 
                        variant="top" 
                        src={college.image} // Use the imported image directly
                        alt={college.name}
                        className="college-image"
                        style={{ height: '200px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = defaultCollegeImage;
                        }}
                      />
                      <div className="college-overlay d-flex align-items-center justify-content-center">
                        <div>
                          <Button variant="outline-light" className="rounded-pill px-4">View Programs</Button>
                          <p className="mt-2 mb-0 text-white small">{college.programs.length} Programs</p>
                        </div>
                      </div>
                    </div>
                    <Card.Body className="p-4">
                      <Card.Title className="text-usmkc-green fw-bold">{college.name}</Card.Title>
                      <Card.Text className="text-muted small">{college.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          
          </Col>
            <h2 className="text-center text-usmkc-green mb-4 fw-bold mt-4">Graduate School and Trainings</h2>
            <Row className="g-4">   
              {/* Graduate Programs Card */}
              <Col md={6} lg={4}>
                <Card 
                  className="h-100 shadow college-card text-center border-0" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveCollege({
                    id: 'graduate',
                    name: 'Graduate Programs',
                    description: 'Advanced degree programs designed to enhance professional skills and academic knowledge.',
                    programs: []
                  })}
                >
                  <div className="college-image-container">
                    <Card.Img 
                      variant="top" 
                      src={graduateImage} 
                      alt="Graduate Programs"
                      className="college-image"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = defaultCollegeImage;
                      }}
                    />
                    <div className="college-overlay d-flex align-items-center justify-content-center">
                      <div>
                        <Button variant="outline-light" className="rounded-pill px-4">View Programs</Button>
                      </div>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <Card.Title className="text-usmkc-green fw-bold">Graduate Programs</Card.Title>
                    <Card.Text className="text-muted small">Advanced degree programs designed to enhance professional skills and academic knowledge.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              
              {/* STraCe Card */}
              <Col md={6} lg={4}>
                <Card 
                  className="h-100 shadow college-card text-center border-0" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveCollege({
                    id: 'strace',
                    name: 'Skills Training and Assessment Center',
                    description: 'Short-term technical-vocational programs designed to develop practical skills for immediate employment.',
                    programs: []
                  })}
                >
                  <div className="college-image-container">
                    <Card.Img 
                      variant="top" 
                      src={straceImage} // Use the imported image
                      alt="Skills Training and Assessment Center"
                      className="college-image"
                      style={{ height: '200px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = defaultCollegeImage;
                      }}
                    />
                    <div className="college-overlay d-flex align-items-center justify-content-center">
                      <div>
                        <Button variant="outline-light" className="rounded-pill px-4">View Programs</Button>
                      </div>
                    </div>
                  </div>
                  <Card.Body className="p-4">
                    <Card.Title className="text-usmkc-green fw-bold">Skills Training and Assessment Center</Card.Title>
                    <Card.Text className="text-muted small">Short-term technical-vocational programs designed to develop practical skills for immediate employment.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          <Col>
          </Col>
        </Row>
      )}

      {/* Back Button when a college is selected */}
      {activeCollege && (
        <Row className="mb-4">
          <Col>
            <Button 
              variant="outline-usmkc-green" 
              onClick={() => {
                setActiveCollege(null);
                setExpandedProgram(null);
                setExpandedAlliedCoE(false);
                setExpandedAlliedCoT(false);
              }} 
              className="mb-3 rounded-pill px-4"
            >
              ← Go Back
            </Button>
          </Col>
        </Row>
      )}
      
      {/* College Content - Programs First */}
      {activeCollege && activeCollege.id !== 'graduate' && activeCollege.id !== 'strace' && (
        <div>
          <Row className="mb-4">
            <Col>
              <div className="d-flex align-items-center mb-3">
                <div className="college-icon-container bg-usmkc-light p-3 rounded-circle me-3">
                  <i className="fas fa-graduation-cap text-usmkc-green fs-2"></i>
                </div>
                <div>
                  <h2 className="text-usmkc-green mb-1 fw-bold">{activeCollege.name}</h2>
                  <p className="lead text-muted mb-0">{activeCollege.description}</p>
                </div>
              </div>
            </Col>
          </Row>
          
          {/* College Leadership Section */}
          {renderCollegeLeadership(activeCollege.name)}
          
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-usmkc-green mb-0 fw-bold">Programs Offered</h4>
                <Badge bg="usmkc-light" text="usmkc-green" className="fs-6">
                  {activeCollege.programs.length} Programs
                </Badge>
              </div>
              <div className="programs-list">
                {activeCollege.programs.map((program, index) => (
                  <Card key={index} className="mb-3 program-card border-0 shadow-sm">
                    <Card.Header 
                      className="program-header"
                      onClick={() => setExpandedProgram(expandedProgram === program ? null : program)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-usmkc-yellow fw-semibold">{program}</h5>
                        <span className="program-toggle">
                          {expandedProgram === program ? 
                            <i className="fas fa-chevron-up text-usmkc-green"></i> : 
                            <i className="fas fa-chevron-down text-usmkc-green"></i>
                          }
                        </span>
                      </div>
                    </Card.Header>
                    {expandedProgram === program && (
                      <Card.Body className="bg-light">
                        {renderFaculty(program)}
                      </Card.Body>
                    )}
                  </Card>
                ))}

                {/* Allied Faculty Section for College of Engineering */}
                {activeCollege.name === "College of Engineering" && (
                  <Card className="mb-3 program-card border-0 shadow-sm">
                    <Card.Header 
                      className="program-header"
                      onClick={() => setExpandedAlliedCoE(!expandedAlliedCoE)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-usmkc-yellow fw-semibold">Allied Faculty</h5>
                        <span className="program-toggle">
                          {expandedAlliedCoE ? 
                            <i className="fas fa-chevron-up text-usmkc-green"></i> : 
                            <i className="fas fa-chevron-down text-usmkc-green"></i>
                          }
                        </span>
                      </div>
                    </Card.Header>
                    {expandedAlliedCoE && (
                      <Card.Body className="bg-light">
                        {renderFaculty("Allied Engineering Faculty")}
                      </Card.Body>
                    )}
                  </Card>
                )}

                {/* Allied Faculty Section for College of Technology */}
                {activeCollege.name === "College of Technology" && (
                  <Card className="mb-3 program-card border-0 shadow-sm">
                    <Card.Header 
                      className="program-header"
                      onClick={() => setExpandedAlliedCoT(!expandedAlliedCoT)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 text-usmkc-yellow fw-semibold">Allied Faculty</h5>
                        <span className="program-toggle">
                          {expandedAlliedCoT ? 
                            <i className="fas fa-chevron-up text-usmkc-green"></i> : 
                            <i className="fas fa-chevron-down text-usmkc-green"></i>
                          }
                        </span>
                      </div>
                    </Card.Header>
                    {expandedAlliedCoT && (
                      <Card.Body className="bg-light">
                        {renderFaculty("Allied Food Science and Technology Faculty")}
                      </Card.Body>
                    )}
                  </Card>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
      
      {/* Graduate Programs Content */}
      {activeCollege && activeCollege.id === 'graduate' && (
        <div>
          <Row className="mb-4">
            <Col>
              <div className="d-flex align-items-center mb-3">
                <div className="college-icon-container bg-usmkc-light p-3 rounded-circle me-3">
                  <i className="fas fa-user-graduate text-usmkc-green fs-2"></i>
                </div>
                <div>
                  <h2 className="text-usmkc-green mb-1 fw-bold">Graduate Programs</h2>
                  <p className="lead text-muted mb-0">Advanced degree programs designed to enhance professional skills and academic knowledge.</p>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Card className="shadow program-card border-0">
                <Card.Header className="program-header bg-usmkc-green text-white">
                  <Card.Title className="mb-0">Graduate Programs</Card.Title>
                </Card.Header>
                <Card.Body className="p-4">
                  <h5 className="text-usmkc-green mb-3 fw-semibold">Master's Degree Programs</h5>
                  <ul className="mb-4 list-group list-group-flush">
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-angle-right text-usmkc-green me-2"></i>
                      Master of Arts in Education
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-angle-right text-usmkc-green me-2"></i>
                      Master of Arts in Language and Literacy Education
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-angle-right text-usmkc-green me-2"></i>
                      Master in Technology Education
                    </li>
                  </ul>
                  
                  <h5 className="text-usmkc-green mb-3 fw-semibold">Doctoral Degree Programs</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-angle-right text-usmkc-green me-2"></i>
                      Doctor of Philosophy major in Technology Education and Management
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
      
      {/* STraCe Content */}
      {activeCollege && activeCollege.id === 'strace' && (
        <div>
          <Row className="mb-4">
            <Col>
              <div className="d-flex align-items-center mb-3">
                <div className="college-icon-container bg-usmkc-light p-3 rounded-circle me-3">
                  <i className="fas fa-tools text-usmkc-green fs-2"></i>
                </div>
                <div>
                  <h2 className="text-usmkc-green mb-1 fw-bold">Skills Training and Assessment Center (STraCe)</h2>
                  <p className="lead text-muted mb-0">Short-term technical-vocational programs designed to develop practical skills for immediate employment.</p>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <Card className="shadow program-card border-0">
                <Card.Header className="program-header bg-usmkc-green text-white">
                  <Card.Title className="mb-0">Skills Training and Assessment Center (STraCe)</Card.Title>
                </Card.Header>
                <Card.Body className="p-4">
                  <h5 className="text-usmkc-green mb-3 fw-semibold">Technical-Vocational Programs</h5>
                  <ul className="mb-4 list-group list-group-flush">
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-certificate text-usmkc-yellow me-2"></i>
                      Agricultural Crops Production NC III
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-certificate text-usmkc-yellow me-2"></i>
                      Food Processing NC II
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-certificate text-usmkc-yellow me-2"></i>
                      Computer Systems Servicing NC II
                    </li>
                  </ul>
                  
                  <h5 className="text-usmkc-green mb-3 fw-semibold">Short Courses</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-book text-usmkc-green me-2"></i>
                      Entrepreneurship Training
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-book text-usmkc-green me-2"></i>
                      Basic Computer Literacy
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-book text-usmkc-green me-2"></i>
                      Organic Farming Techniques
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-book text-usmkc-green me-2"></i>
                      Basic Automotive Servicing
                    </li>
                    <li className="list-group-item border-0 d-flex align-items-center">
                      <i className="fas fa-book text-usmkc-green me-2"></i>
                      Food Safety and Sanitation
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </Container>

      <style>{`
        :root {
          --usmkc-green: #00482D;
          --usmkc-yellow: #FFD326;
          --usmkc-light-green: #e6f2ed;
          --usmkc-light: #f8f9fa;
        }
        
        .academics-hero {
          background: linear-gradient(135deg, rgba(0, 72, 45, 0.9) 0%, rgba(0, 72, 45, 0.85) 100%), url('/images/academics-hero-bg.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .bg-gradient-usmkc {
          background: linear-gradient(135deg, var(--usmkc-green) 0%, #006641 100%) !important;
        }
        
        .bg-usmkc-green {
          background-color: var(--usmkc-green) !important;
        }
        
        .bg-usmkc-yellow {
          background-color: var(--usmkc-yellow) !important;
        }
        
        .bg-usmkc-light {
          background-color: var(--usmkc-light-green) !important;
        }
        
        .text-usmkc-green {
          color: var(--usmkc-green) !important;
        }
        
        .text-usmkc-yellow {
          color: var(--usmkc-yellow) !important;
        }
        
        .btn-usmkc-yellow {
          background-color: var(--usmkc-yellow);
          color: #000;
          border: none;
          font-weight: 500;
        }
        
        .btn-usmkc-yellow:hover {
          background-color: #e6ba1f;
          color: #000;
        }
        
        .btn-outline-usmkc-green {
          color: var(--usmkc-green);
          border-color: var(--usmkc-green);
          font-weight: 500;
        }
        
        .btn-outline-usmkc-green:hover {
          background-color: var(--usmkc-green);
          color: white;
        }
        
        .college-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
        }
        
        .college-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
        }
        
        .college-image-container {
          position: relative;
          overflow: hidden;
          height: 200px;
        }
        
        .college-image {
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .college-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 72, 45, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .college-card:hover .college-overlay {
          opacity: 1;
        }
        
        .college-card:hover .college-image {
          transform: scale(1.1);
        }
        
        .college-icon-container {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* College Leadership Styles */
        .college-leadership {
          position: relative;
          padding: 2rem 0;
        }
        
        .section-title {
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: var(--usmkc-yellow);
        }
        
        .dean-card {
          position: relative;
          z-index: 2;
        }
        
        .dean-profile {
          max-width: 320px;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .dean-image-container {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--usmkc-green);
        }
        
        .dean-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .program-heads-row {
          position: relative;
        }
        
        .program-head-card {
          padding-top: 20px;
        }
        
        .program-head-card .card {
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        .program-head-card .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Program Cards */
        .program-card {
          border-radius: 10px;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }
        
        .program-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .program-header {
          background-color: white;
          border-bottom: 1px solid #eaeaea;
          padding: 1.25rem;
          transition: background-color 0.3s ease;
        }
        
        .program-header:hover {
          background-color: var(--usmkc-light-green);
        }
        
        .program-toggle {
          font-size: 1.1rem;
          color: var(--usmkc-green);
        }
        
        .faculty-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 10px;
        }
        
        .faculty-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
        
        .faculty-image-container {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--usmkc-green);
        }
        
        .faculty-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .faculty-card:hover .faculty-image {
          transform: scale(1.08);
        }
        
        .faculty-name {
          color: var(--usmkc-green);
        }
        
        /* Badge customization */
        .badge.bg-usmkc-yellow {
          color: #000 !important;
        }
        
        .badge.bg-usmkc-light {
          background-color: var(--usmkc-light-green) !important;
        }
      `}</style>
    </div>
  );
};

export default Academics;