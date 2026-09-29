// src/components/KeyOfficials.js - Database Version with No Click Functionality (Display Only)
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { getKeyOfficialsByCategory } from '../supabase/services';
import './KeyOfficials.css';

const KeyOfficials = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('administration');
  const [officials, setOfficials] = useState({
    administration: [],
    directors: [],
    deans: []
  });

  useEffect(() => {
    loadOfficials();
  }, []);

  const loadOfficials = async () => {
    setLoading(true);
    try {
      const categories = ['administration', 'directors', 'deans'];
      const results = await Promise.all(
        categories.map(cat => getKeyOfficialsByCategory(cat))
      );
      
      const newOfficials = {};
      categories.forEach((cat, index) => {
        newOfficials[cat] = results[index].success ? results[index].data : [];
      });
      
      // Filter only active officials
      Object.keys(newOfficials).forEach(key => {
        newOfficials[key] = newOfficials[key].filter(o => o.is_active !== false);
      });
      
      setOfficials(newOfficials);
    } catch (error) {
      console.error('Error loading officials:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group officials by level for the family tree
  const getLevelOfficials = (level) => {
    return officials.administration.filter(member => member.level === level);
  };

  // Get Chancellor (Level 1) for Management Council
  const getChancellor = () => {
    return officials.directors.filter(member => member.level === 1);
  };

  // Get top 3 directors (Level 2)
  const getTopDirectors = () => {
    const sorted = [...officials.directors].filter(m => m.level !== 1).sort((a, b) => {
      return (a.level || a.order || 0) - (b.level || b.order || 0);
    });
    return sorted.slice(0, 3);
  };

  // Get remaining directors (same level)
  const getRemainingDirectors = () => {
    const sorted = [...officials.directors].filter(m => m.level !== 1).sort((a, b) => {
      return (a.level || a.order || 0) - (b.level || b.order || 0);
    });
    return sorted.slice(3);
  };

  if (loading) {
    return (
      <div className="key-officials-page">
        <div className="container text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-3">Loading key officials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="key-officials-page">
      <div className="container">
        <h1 className="page-title">Members of Management Team</h1>
        <p className="page-intro">
          The Management Team provides strategic leadership and guidance to ensure the university's continued growth and excellence in education, research, and community service.
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
                {getLevelOfficials(1).length > 0 && (
                  <div className="tree-level level-1">
                    {getLevelOfficials(1).map(member => (
                      <div key={member.id} className="official-card no-click">
                        <div className="official-image">
                          <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
                        </div>
                        <div className="official-info">
                          <h3>{member.name}</h3>
                          <p className="position">{member.position}</p>
                        </div>
                        <div className="connector-down"></div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Connector between levels */}
                {getLevelOfficials(1).length > 0 && getLevelOfficials(2).length > 0 && (
                  <div className="level-connector">
                    <div className="vertical-connector"></div>
                  </div>
                )}
                
                {/* Level 2 - Vice Presidents */}
                {getLevelOfficials(2).length > 0 && (
                  <div className="tree-level level-2">
                    {getLevelOfficials(2).map(member => (
                      <div key={member.id} className="official-card no-click">
                        <div className="connector-up"></div>
                        <div className="official-image">
                          <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
                        </div>
                        <div className="official-info">
                          <h3>{member.name}</h3>
                          <p className="position">{member.position}</p>
                        </div>
                        <div className="connector-down"></div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Connector between levels */}
                {getLevelOfficials(2).length > 0 && getLevelOfficials(3).length > 0 && (
                  <div className="level-connector">
                    <div className="vertical-connector"></div>
                  </div>
                )}
                
                {/* Level 3 - Chancellor */}
                {getLevelOfficials(3).length > 0 && (
                  <div className="tree-level level-3">
                    {getLevelOfficials(3).map(member => (
                      <div key={member.id} className="official-card no-click">
                        <div className="connector-up"></div>
                        <div className="official-image">
                          <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
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
            )}

            {activeTab === 'directors' && (
              <div className="directors-tree">
                {/* Chancellor - Level 1 at the very top */}
                {getChancellor().length > 0 && (
                  <>
                    <div className="tree-level chancellor-level">
                      <h3 className="tree-level-title"></h3>
                      <div className="chancellor-row">
                        {getChancellor().map(member => (
                          <div key={member.id} className="official-card chancellor-card no-click">
                            <div className="official-image">
                              <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
                            </div>
                            <div className="official-info">
                              <h3>{member.name}</h3>
                              <p className="position">{member.position}</p>
                            </div>
                            <div className="connector-down"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Connector from Chancellor to Directors */}
                    {getTopDirectors().length > 0 && (
                      <div className="level-connector">
                        <div className="vertical-connector"></div>
                      </div>
                    )}
                  </>
                )}

                {/* Top 3 Directors - Level 2 */}
                {getTopDirectors().length > 0 && (
                  <div className="tree-level top-directors">
                    <h3 className="tree-level-title"></h3>
                    <div className="directors-top-row">
                      {getTopDirectors().map(member => (
                        <div key={member.id} className="official-card no-click">
                          <div className="connector-up"></div>
                          <div className="official-image">
                            <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
                          </div>
                          <div className="official-info">
                            <h3>{member.name}</h3>
                            <p className="position">{member.position}</p>
                          </div>
                          <div className="connector-down"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Connector line between top directors and remaining directors */}
                {getTopDirectors().length > 0 && getRemainingDirectors().length > 0 && (
                  <div className="level-connector">
                    <div className="vertical-connector"></div>
                    <div className="horizontal-connector"></div>
                  </div>
                )}
                
                {/* Remaining Directors (same level) */}
                {getRemainingDirectors().length > 0 && (
                  <div className="tree-level remaining-directors">
                    <h3 className="tree-level-title"></h3>
                    <div className="directors-grid">
                      {getRemainingDirectors().map(member => (
                        <div key={member.id} className="official-card no-click">
                          <div className="connector-up"></div>
                          <div className="official-image">
                            <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
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
              </div>
            )}

            {activeTab === 'deans' && (
              <div className="officials-grid">
                {officials.deans.map(member => (
                  <div key={member.id} className="official-card no-click">
                    <div className="official-image">
                      <img src={member.image_url || '/images/placeholder-avatar.jpg'} alt={member.name} />
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
      </div>
    </div>
  );
};

export default KeyOfficials;