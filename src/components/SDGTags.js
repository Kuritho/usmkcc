// SDGTags.js - Fixed to handle both string and number IDs
import React from 'react';
import { Badge } from 'react-bootstrap';
import { sdgGoals } from './SDGHub';

const SDGTags = ({ sdgIds }) => {
  if (!sdgIds || sdgIds.length === 0) {
    return null;
  }

  console.log('🏷️ SDGTags received:', sdgIds);

  return (
    <div className="d-flex flex-wrap gap-1">
      {sdgIds.map(id => {
        // Convert to number for comparison
        const numId = parseInt(id);
        const goal = sdgGoals.find(g => g.id === numId);
        if (!goal) {
          console.log(`⚠️ SDG ${id} not found`);
          return null;
        }
        return (
          <Badge
            key={id}
            style={{
              backgroundColor: goal.color,
              color: '#ffffff',
              marginRight: '4px',
              marginBottom: '4px',
              padding: '4px 8px',
              fontSize: '0.7rem'
            }}
          >
            SDG {numId}
          </Badge>
        );
      })}
    </div>
  );
};

export default SDGTags;