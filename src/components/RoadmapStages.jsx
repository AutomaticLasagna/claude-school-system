import './RoadmapStages.css';

export default function RoadmapStages({ stages, currentStage, completedSessions }) {
  return (
    <div className="roadmap-stages">
      {stages.map(stage => {
        // Derive session numbers from sessionDetails keys
        const stageSessions = Object.keys(stage.sessionDetails || {}).map(Number);
        const stageComplete = stageSessions.length > 0 && stageSessions.every(s =>
          completedSessions.includes(s)
        );
        const stageCurrent = stage.id === currentStage;
        const stageProgress = stageSessions.filter(s =>
          completedSessions.includes(s)
        ).length;

        return (
          <div
            key={stage.id}
            className={`stage ${stageComplete ? 'complete' : ''} ${stageCurrent ? 'current' : ''}`}
          >
            <div className="stage-number">{stage.id}</div>
            <div className="stage-info">
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
              <div className="stage-progress">
                <span className="progress-bar-container">
                  <span
                    className="progress-bar-fill"
                    style={{ width: `${stageSessions.length ? (stageProgress / stageSessions.length) * 100 : 0}%` }}
                  />
                </span>
                <span className="progress-text">
                  {stageProgress}/{stageSessions.length} sessions
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
