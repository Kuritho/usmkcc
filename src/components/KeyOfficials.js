// components/KeyOfficials.js
import React, { useState } from 'react';
import './KeyOfficials.css';

const KeyOfficials = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeTab, setActiveTab] = useState('administration');
  const [revealedMembers, setRevealedMembers] = useState(new Set());

  // Data structure for all members
  const councilMembers = {
    administration: [
      {
        id: 1,
        name: "Dr. Jonald L. Pimentel",
        position: "SUC President IV",
        email: "president@university.edu",
        phone: "(123) 456-7890",
        image: "/images/president.png",
        bio: "Dr. Jonald Pimentel was elected as the 8th President of the University of Southern Mindanao (USM) on February 14, 2025. As a leader, he sees the value of continued development while preserving the indigenous heritage in the institution. Aside from that, he envisions an academic community that contributes to scientific advancements. Hence, he plans to develop a comprehensive research program for the faculty members, university researchers, and students. Guided by the USM spirit of collaboration and partnership, the former faculty member of the USM Mathematics and Statistics Department also looks forward to maintain and forge strong partnerships with cultural communities, government agencies, and academic institutions. With his love for the tri-people (Muslims, Christians, and Indigenous People) in the community, President Pimentel raises his tagline for USM that says, “We TRIbe as One.” In his tagline, he aims to ensure that in his term as President, the USM Community progresses together. Serving USM since 1994, Dr. Pimentel advocates a stress-free environment for USM personnel.",
        level: 1 // Top level in hierarchy
      },
      {
        id: 2,
        name: "Ms. Quenielyn L. Durendes",
        position: "Vice President for Administration & Finance",
        email: "vp.adminfinance@university.edu",
        phone: "(123) 456-7891",
        image: "/images/vp-admin.png",
        bio: "Ms. Quenielyn L. Durendes oversees all administrative and financial operations of the university. She has implemented several efficiency improvements in university operations during her tenure.",
        level: 2
      },
      {
        id: 3,
        name: "Dr. Debbie Marie B. Verzosa",
        position: "Vice President for Research, Development & Extension",
        email: "vp.research@university.edu",
        phone: "(123) 456-7892",
        image: "/images/vp-research.png",
        bio: "Dr. Debbie Marie B. Verzosa leads the university's research initiatives, development programs, and extension services. She has published numerous papers in international journals.",
        level: 2
      },
      {
        id: 4,
        name: "Dr. Leorence C. Tandog",
        position: "Vice President for Academic Affairs",
        email: "vp.academic@university.edu",
        phone: "(123) 456-7893",
        image: "/images/vp-academic.png",
        bio: "Dr. Leorence C. Tandog is responsible for all academic programs and faculty development. He has been instrumental in curriculum modernization and quality assurance initiatives.",
        level: 2
      },
      {
        id: 5,
        name: "Dr. Samsudin S. Panday",
        position: "Vice President for Resource Generation & Entrepreneurial Services",
        email: "vp.resources@university.edu",
        phone: "(123) 456-7894",
        image: "/images/vp-resources.png",
        bio: "Dr. Samsudin S. Panday manages the university's resource generation and entrepreneurial initiatives. He has established several successful industry partnerships for the university.",
        level: 2
      },
      {
        id: 6,
        name: "Dr. Ronielyn F. Pinsoy",
        position: "Chancellor",
        email: "chancellor@university.edu",
        phone: "(123) 456-7876",
        image: "/images/chancellor.jpg",
        bio: "Dr. Ronielyn F. Pinsoy serves as the Chancellor, overseeing campus operations and implementing the university's strategic initiatives at the campus level.",
        level: 3
      }
      
    ],
    directors: [
      {
        id: 7,
        name: "Dr. Ronielyn F. Pinsoy ",
        position: "Chancellor",
        email: "director.hrmo@university.edu",
        phone: "(123) 456-7898",
        image: "/images/chancellor.jpg",
        bio: "Dr. Ronielyn F. Pinsoy manages the university's human resources, including recruitment, training, and development of faculty and staff."
      },
      {
        id: 8,
        name: "Prof. Marlowe E. Llorito",
        position: "OIC, Vice Chancellor Manager",
        email: "director.finance@university.edu",
        phone: "(123) 456-7899",
        image: "/images/director-finance.jpg",
        bio: "Prof. Marlowe E. Llorito oversees the university's financial operations, budgeting, and accounting services."
      },
      {
        id: 9,
        name: "Dr.  Vhenus B. Maglinte",
        position: "Dean, CEAS ",
        email: "director.procurement@university.edu",
        phone: "(123) 456-7900",
        image: "/images/faculty/maglinte.JPG",
        bio: "Dr.  Vhenus B. Maglinte manages the university's procurement processes and ensures compliance with government regulations."
      },
      {
        id: 10,
        name: "Dr. April Rose B. Flores",
        position: "Dean, COT",
        email: "director.facilities@university.edu",
        phone: "(123) 456-7901",
        image: "/images/faculty/flores.JPG",
        bio: "Dr. April Rose B. Flores is responsible for the maintenance and development of university facilities and infrastructure."
      },
      {
        id: 11,
        name: "Engr. Analiza B. Bingil",
        position: "Dean, COE",
        email: "director.research@university.edu",
        phone: "(123) 456-7902",
        image: "/images/faculty/bingil.JPG",
        bio: "Engr. Analiza B. Bingil leads the university's research initiatives and promotes research culture among faculty and students."
      },
      {
        id: 12,
        name: "Prof. Marcos F. Monderin",
        position: "Director, International Affairs and Linkages",
        email: "director.extension@university.edu",
        phone: "(123) 456-7903",
        image: "/images/faculty/monderin.JPG",
        bio: "Prof. Marcos F. Monderin oversees community extension programs that bring the university's resources to surrounding communities."
      },
      {
        id: 13,
        name: "Ms. Ruth R. Grecia",
        position: "Director, Admin. Services",
        email: "director.instruction@university.edu",
        phone: "(123) 456-7904",
        image: "/images/staff/grecia.jpg",
        bio: "Ms. Ruth R. Grecia is responsible for curriculum development, instructional quality, and academic standards."
      },
      {
        id: 14,
        name: "Dr. Rowena V. Sosas",
        position: "Director, QA",
        email: "director.studentaffairs@university.edu",
        phone: "(123) 456-7905",
        image: "/images/faculty/sosas.JPG",
        bio: "Dr. Rowena V. Sosas oversees student development programs, services, and extracurricular activities."
      },
      {
        id: 15,
        name: "Dr. Jeanne Y. Aure",
        position: "Director, Instruction, NSTP",
        email: "director.admission@university.edu",
        phone: "(123) 456-7906",
        image: "/images/faculty/aure.JPG",
        bio: "Dr. Jeanne Y. Aure manages student admission, registration, and records management."
      },
      {
        id: 16,
        name: "Dr. Dhealyn Decee V. Sabit",
        position: "Director, RESO",
        email: "director.library@university.edu",
        phone: "(123) 456-7907",
        image: "/images/faculty/sabit.JPG",
        bio: "Dr. Dhealyn Decee V. Sabit oversees the university library system and information resources."
      },
      {
        id: 17,
        name: "Engr. George F. Gamolo",
        position: "Director, Planning and Development",
        email: "director.ict@university.edu",
        phone: "(123) 456-7908",
        image: "/images/faculty/gamolo.JPG",
        bio: "Engr. George F. Gamolo manages the university's IT infrastructure, systems, and digital services."
      },
      {
        id: 18,
        name: "Ms. Maria Elena P. Pineda",
        position: "Director, ARO",
        email: "director.international@university.edu",
        phone: "(123) 456-7909",
        image: "/images/faculty/pineda.JPG",
        bio: "Ms. Maria Elena P. Pineda oversees international partnerships, student exchanges, and global initiatives."
      },
      {
        id: 19,
        name: "Engr. Janeth V. Lumang",
        position: "Director, Resource Gen.",
        email: "director.planning@university.edu",
        phone: "(123) 456-7910",
        image: "/images/faculty/lumang.JPG",
        bio: "Engr. Janeth V. Lumang is responsible for institutional planning, development, and strategic initiatives."
      },
      {
        id: 20,
        name: "Prof. April Geraldine M. Quiñonero",
        position: "Director, SAS",
        email: "director.quality@university.edu",
        phone: "(123) 456-7911",
        image: "/images/faculty/quiñonero.JPG",
        bio: "Prof. April Geraldine M. Quiñonero ensures academic quality and compliance with accreditation standards."
      },
      {
        id: 21,
        name: "Ms. Donah Joy M. Villegas",
        position: "Director, HRMDO",
        email: "director.sports@university.edu",
        phone: "(123) 456-7912",
        image: "/images/staff/villegas.JPG",
        bio: "Ms. Donah Joy M. Villegas oversees sports programs, cultural activities, and athletic facilities."
      },{
        id: 22,
        name: "Ms. Christine A. Ruiz",
        position: "Director, PRIO",
        email: "dean.engineering@university.edu",
        phone: "(123) 456-7895",
        image: "/images/staff/ruiz.JPG",
        bio: "Ms. Christine A. Ruiz leads the College of Engineering with a focus on innovation and industry collaboration. She has secured several research grants for engineering projects."
      },
      {
        id: 23,
        name: "Engr. Erwin C. Bolasa",
        position: "Director, ICT",
        email: "dean.education@university.edu",
        phone: "(123) 456-7896",
        image: "/images/faculty/bolasa.JPG",
        bio: "Engr. Erwin C. Bolasa oversees the largest college in the university. He has implemented several community outreach programs that benefit local schools."
      },
      {
        id: 24,
        name: "Ms. Rizza C. Odias",
        position: "Director, LRC",
        email: "dean.business@university.edu",
        phone: "(123) 456-7897",
        image: "/images/staff/odias.JPG",
        bio: "Ms. Rizza C. Odias leads the College of Business and Management with an emphasis on entrepreneurship and industry readiness. She has established partnerships with several multinational corporations."
      },
      {
        id: 25,
        name: "Ms. Cherry Lou B. Abanilla",
        position: "Director, Finance",
        email: "dean.business@university.edu",
        phone: "(123) 456-7897",
        image: "/images/staff/abanilla.JPG",
        bio: "Ms. Cherry Lou B. Abanilla leads the College of Business and Management with an emphasis on entrepreneurship and industry readiness. She has established partnerships with several multinational corporations."
      },
      {
        id: 26,
        name: "Mr. Jonathan B. Gutierrez",
        position: "Chief Security Officer",
        email: "director.lrc@university.edu",
        phone: "(123) 456-7898",
        image: "/images/staff/gutierrez.JPG",
        bio: "Mr. Jonathan B. Gutierrez oversees the Library and Resource Center, ensuring access to academic resources and promoting information literacy among students and faculty."
      },
      {
        id: 27,
        name: "Joshua Q. Sarmiento",
        position: "ASG President",
        email: "asg-president@university.edu",
        phone: "(123) 456-7899",
        image: "/images/asg/sarmiento.JPG",
        bio: "Mr. Joshua Q. Sarmiento serves as the President of the Associated Students of the University (ASG), representing student interests and advocating for student welfare."
      }
    ],
    deans: [
      {
        id: 28,
        name: "Dr.  Vhenus B. Maglinte",
        position: "Dean, CEAS ",
        email: "director.procurement@university.edu",
        phone: "(123) 456-7900",
        image: "/images/faculty/maglinte.JPG",
        bio: "Dr.  Vhenus B. Maglinte manages the university's procurement processes and ensures compliance with government regulations."
      },
      {
        id: 29,
        name: "Dr. April Rose B. Flores",
        position: "Dean, COT",
        email: "director.facilities@university.edu",
        phone: "(123) 456-7901",
        image: "/images/faculty/flores.JPG",
        bio: "Dr. April Rose B. Flores is responsible for the maintenance and development of university facilities and infrastructure."
      },
      {
        id: 30,
        name: "Engr. Analiza B. Bingil",
        position: "Dean, COE",
        email: "director.research@university.edu",
        phone: "(123) 456-7902",
        image: "/images/faculty/bingil.JPG",
        bio: "Engr. Analiza B. Bingil leads the university's research initiatives and promotes research culture among faculty and students."
      }
    ]
  };

  const handleMemberClick = (member) => {
    const newRevealed = new Set(revealedMembers);
    newRevealed.add(member.id);
    setRevealedMembers(newRevealed);
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  // Group officials by level for the family tree
  const level1Officials = councilMembers.administration.filter(member => member.level === 1);
  const level2Officials = councilMembers.administration.filter(member => member.level === 2);
  const level3Officials = councilMembers.administration.filter(member => member.level === 3);
  const level4Officials = councilMembers.administration.filter(member => member.level === 4);


  return (
    <div className="key-officials-page">
      <div className="container">
        <h1 className="page-title">Members of Administrative Council</h1>
        <p className="page-intro">
          The Administrative Council provides strategic leadership and guidance to ensure the university's continued growth and excellence in education, research, and community service.
        </p>

        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'administration' ? 'active' : ''}`}
              onClick={() => setActiveTab('administration')}
            >
              Key Officials
            </button>
            <button 
              className={`tab ${activeTab === 'directors' ? 'active' : ''}`}
              onClick={() => setActiveTab('directors')}
            >
              Management Council Members
            </button>
            <button 
              className={`tab ${activeTab === 'deans' ? 'active' : ''}`}
              onClick={() => setActiveTab('deans')}
            >
              Campus College Deans
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'administration' && (
              <div className="family-tree">
                {/* Level 1 - President */}
                <div className="tree-level level-1">
                  {level1Officials.map(member => (
                    <div key={member.id} className="official-card" onClick={() => handleMemberClick(member)}>
                      <div className="official-image">
                        <img src={member.image || '/images/placeholder-avatar.jpg'} alt={member.name} />
                      </div>
                      <div className="official-info">
                        <h3>{member.name}</h3>
                        <p className="position">{member.position}</p>
                      </div>
                      <div className="connector-down"></div>
                    </div>
                  ))}
                </div>
                
                {/* Connector between levels */}
                <div className="level-connector">
                  <div className="vertical-connector"></div>
                </div>
                
                {/* Level 2 - Vice Presidents */}
                <div className="tree-level level-2">
                  {level2Officials.map(member => (
                    <div key={member.id} className="official-card" onClick={() => handleMemberClick(member)}>
                      <div className="connector-up"></div>
                      <div className="official-image">
                        <img src={member.image || '/images/placeholder-avatar.jpg'} alt={member.name} />
                      </div>
                      <div className="official-info">
                        <h3>{member.name}</h3>
                        <p className="position">{member.position}</p>
                      </div>
                      <div className="connector-down"></div>
                    </div>
                  ))}
                </div>
                
                {/* Connector between levels */}
                <div className="level-connector">
                  <div className="vertical-connector"></div>
                </div>
                
                {/* Level 3 - Chancellor */}
                <div className="tree-level level-3">
                  {level3Officials.map(member => (
                    <div key={member.id} className="official-card" onClick={() => handleMemberClick(member)}>
                      <div className="connector-up"></div>
                      <div className="official-image">
                        <img src={member.image || '/images/placeholder-avatar.jpg'} alt={member.name} />
                      </div>
                      <div className="official-info">
                        <h3>{member.name}</h3>
                        <p className="position">{member.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Level 4 - Vice Chancellor */}
                <div className="tree-level level-3">
                  {level4Officials.map(member => (
                    <div key={member.id} className="official-card" onClick={() => handleMemberClick(member)}>
                      <div className="connector-up"></div>
                      <div className="official-image">
                        <img src={member.image || '/images/placeholder-avatar.jpg'} alt={member.name} />
                      </div>
                      <div className="official-info">
                        <h3>{member.name}</h3>
                        <p className="position">{member.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'directors' && (
              <div className="officials-grid">
                {councilMembers.directors.map(member => (
                  <div key={member.id} className="official-card" onClick={() => handleMemberClick(member)}>
                    <div className="official-image">
                      <img src={member.image || '/images/placeholder-avatar.jpg'} alt={member.name} />
                    </div>
                    <div className="official-info">
                      <h3>{member.name}</h3>
                      <p className="position">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'deans' && (
              <div className="officials-grid">
                {councilMembers.deans.map(member => (
                  <div key={member.id} className="official-card" onClick={() => handleMemberClick(member)}>
                    <div className="official-image">
                      <img src={member.image || '/images/placeholder-avatar.jpg'} alt={member.name} />
                    </div>
                    <div className="official-info">
                      <h3>{member.name}</h3>
                      <p className="position">{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedMember && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="modal-body">
                <div className="official-detail-image">
                  <img src={selectedMember.image || '/images/placeholder-avatar.jpg'} alt={selectedMember.name} />
                </div>
                <div className="official-detail-info">
                  <h2>{selectedMember.name}</h2>
                  <p className="position">{selectedMember.position}</p>
                  <div className="contact-info">
                    <p><i className="fas fa-envelope"></i> {selectedMember.email}</p>
                    <p><i className="fas fa-phone"></i> {selectedMember.phone}</p>
                  </div>
                  <div className="bio">
                    <h4>About</h4>
                    <p>{selectedMember.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyOfficials;