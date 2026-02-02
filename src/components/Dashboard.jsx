import { useState, useEffect } from 'react';
import { loadDashboardData, calculateProgress } from '../utils/dataLoader';
import RoadmapStages from './RoadmapStages';
import SessionSummary from './SessionSummary';
import './Dashboard.css';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData()
      .then(result => {
        if (result) {
          setData(result);
        } else {
          setError('Failed to load data');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="dashboard loading">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard error">{error}</div>;
  }

  if (!data) {
    return <div className="dashboard empty">No data available</div>;
  }

  const progressPercent = calculateProgress(data.progress);

  return (
    <div className="dashboard">
      <header>
        <h1>Claude School Progress</h1>
        <div className="progress-badge">
          {progressPercent}% Complete
        </div>
      </header>

      <main>
        <section className="roadmap-section">
          <h2>6-Stage Roadmap</h2>
          <RoadmapStages
            stages={data.progress.stages}
            currentStage={data.progress.currentStage}
            completedSessions={data.progress.completedSessions}
          />
        </section>

        <section className="session-section">
          <h2>Current Position</h2>
          <div className="current-info">
            <span>Stage {data.progress.currentStage}</span>
            <span>Session {data.progress.currentSession}</span>
          </div>
        </section>

        {data.latestSession && (
          <section className="summary-section">
            <h2>Last Session</h2>
            <SessionSummary session={data.latestSession} />
          </section>
        )}
      </main>

      <footer>
        <p>Refresh browser to see updates</p>
      </footer>
    </div>
  );
}
