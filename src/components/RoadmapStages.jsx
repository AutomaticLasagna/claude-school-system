import './RoadmapStages.css';

export default function RoadmapStages({ stages, currentStage, completedSessions }) {
  return (
    <div className="roadmap-stages">
      {stages.map(stage => {
        const stageComplete = stage.sessions.every(s =>
          completedSessions.includes(s)
        );
        const stageCurrent = stage.id === currentStage;
        const stageProgress = stage.sessions.filter(s =>
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
                    style={{ width: `${(stageProgress / stage.sessions.length) * 100}%` }}
                  />
                </span>
                <span className="progress-text">
                  {stageProgress}/{stage.sessions.length} sessions
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
