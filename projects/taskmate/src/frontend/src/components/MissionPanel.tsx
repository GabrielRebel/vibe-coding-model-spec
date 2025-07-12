import React from 'react';

interface MissionPanelProps {
  missions: any[];
  onMissionUpdate: () => void;
}

const MissionPanel: React.FC<MissionPanelProps> = ({ missions, onMissionUpdate }) => {
  return (
    <div className="mission-panel">
      <h3>Missions ({missions.length})</h3>
      {missions.length === 0 ? (
        <p>No missions yet. Create one through chat!</p>
      ) : (
        <div className="mission-list">
          {missions.map((mission) => (
            <div key={mission.id} className="mission-item">
              <h4>{mission.title}</h4>
              <p>{mission.goal}</p>
              <span className="mission-status">
                {mission.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionPanel; 