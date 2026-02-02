import './SessionSummary.css';

export default function SessionSummary({ session }) {
  if (!session) return null;

  return (
    <div className="session-summary">
      <div className="summary-header">
        <span className="session-title">{session.title || `Session ${session.sessionNumber}`}</span>
        <span className="session-date">{session.date}</span>
        <span className={`session-status ${session.status}`}>{session.status}</span>
      </div>

      {session.skillsDemonstrated?.length > 0 && (
        <div className="summary-section">
          <h4>Skills Demonstrated</h4>
          <ul className="skills-list">
            {session.skillsDemonstrated.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {session.keyInsights?.length > 0 && (
        <div className="summary-section">
          <h4>Key Insights</h4>
          <ul className="insights-list">
            {session.keyInsights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      {session.nextObjectives?.length > 0 && (
        <div className="summary-section">
          <h4>Next Objectives</h4>
          <ul className="objectives-list">
            {session.nextObjectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>
      )}

      {session.openQuestions?.length > 0 && (
        <div className="summary-section">
          <h4>Open Questions</h4>
          <ul className="questions-list">
            {session.openQuestions.map((question, i) => (
              <li key={i}>{question}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
