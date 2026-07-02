// components/Hiring.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hiring = () => {
  // Sample job data - in a real app, this would come from an API
  const jobOpenings = [
    {
      id: 1,
      title: "Assistant Professor - Industrial Engineering",
      department: "College of Engineering",
      type: "Full-time",
      deadline: "2025-12-15",
      description: "We are seeking a qualified individual to teach undergraduate courses in computer science, conduct research, and contribute to department service."
    },
    {
      id: 2,
      title: "Administrative Aide IV",
      department: "Registrar's Office",
      type: "Full-time",
      deadline: "2025-12-10",
      description: "The Administrative Assistant will provide support for daily office operations, manage records, and assist students with enrollment procedures."
    },
    {
      id: 3,
      title: "Research Assistant",
      department: "Research and Development Center",
      type: "Contract of Service",
      deadline: "2025-12-20",
      description: "The Research Assistant will support faculty research projects, assist with data collection and analysis, and help prepare research reports."
    },
    {
      id: 4,
      title: "IT Support Specialist",
      department: "Management Information Systems",
      type: "Full-time",
      deadline: "2023-12-18",
      description: "The IT Support Specialist will provide technical assistance to faculty and staff, maintain computer systems, and troubleshoot hardware/software issues."
    }
  ];

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Job Openings</li>
            </ol>
          </nav>
          
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h2 className="h3 mb-0">Join Our Team</h2>
            </div>
            <div className="card-body p-4">
              <div className="row mb-4">
                <div className="col-md-8">
                  <p className="lead">We're always looking for talented individuals to join our academic community. Explore our current job openings below.</p>
                </div>
                <div className="col-md-4 text-md-end">
                  <Link to="/apply" className="btn btn-outline-success">
                    Apply for Admission Instead
                  </Link>
                </div>
              </div>
              
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                To apply for any position, please send your resume, PDS, and other requirements to <strong>hr@university.edu</strong> with the job title as the subject line.
              </div>
              
              <div className="row">
                {jobOpenings.map(job => (
                  <div key={job.id} className="col-md-6 mb-4">
                    <div className="card h-100">
                      <div className="card-body">
                        <h3 className="h5 card-title text-success">{job.title}</h3>
                        <div className="d-flex flex-wrap mb-2">
                          <span className="badge bg-secondary me-2 mb-2">{job.department}</span>
                          <span className="badge bg-primary me-2 mb-2">{job.type}</span>
                          <span className="badge bg-warning mb-2">Apply by: {job.deadline}</span>
                        </div>
                        <p className="card-text">{job.description}</p>
                      </div>
                      <div className="card-footer bg-transparent">
                        <button 
                          className="btn btn-success btn-sm"
                          data-bs-toggle="modal" 
                          data-bs-target="#applyModal"
                          onClick={() => document.getElementById('positionTitle').value = job.title}
                        >
                          Apply for this Position
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-5 p-4 bg-light rounded">
                <h3 className="h4">Why Work With Us?</h3>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Competitive salary and benefits</li>
                      <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Professional development opportunities</li>
                      <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Collaborative work environment</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Work-life balance initiatives</li>
                      <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Access to campus facilities</li>
                      <li className="mb-2"><i className="fas fa-check text-success me-2"></i> Tuition discount programs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Modal */}
      <div className="modal fade" id="applyModal" tabIndex="-1" aria-labelledby="applyModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="applyModalLabel">Apply for Position</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>To apply for this position, please email the following documents to <strong>hr@university.edu</strong>:</p>
              <ul>
                <li>Updated Resume/CV</li>
                <li>Completed Personal Data Sheet (PDS)</li>
                <li>Transcript of Records</li>
                <li>Certificate of Eligibility/License (if applicable)</li>
              </ul>
              <div className="mb-3">
                <label htmlFor="positionTitle" className="form-label">Position You're Applying For:</label>
                <input type="text" className="form-control" id="positionTitle" readOnly />
              </div>
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                Please use the format: <strong>[Position Title] - [Your Full Name]</strong> as the email subject.
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <a 
                href="mailto:hr@university.edu" 
                className="btn btn-success"
                onClick={() => {
                  const position = document.getElementById('positionTitle').value;
                  document.getElementById('emailLink').href = `mailto:hr@university.edu?subject=Application for ${encodeURIComponent(position)}`;
                }}
                id="emailLink"
              >
                Open Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hiring;