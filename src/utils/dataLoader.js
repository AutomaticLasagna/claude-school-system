// Load JSON files for dashboard display
// Note: In development, Vite serves files from public/

export async function loadDashboardData() {
  try {
    const [progress, gates, latestSession] = await Promise.all([
      fetch('/data/progress.json').then(r => r.json()),
      fetch('/data/quality-gates.json').then(r => r.json()),
      loadLatestSession()
    ]);

    return { progress, gates, latestSession };
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    return null;
  }
}

async function loadLatestSession() {
  // Try loading sessions in reverse order until we find one
  for (let i = 20; i >= 1; i--) {
    try {
      const session = await fetch(`/data/sessions/session-${String(i).padStart(2, '0')}.json`);
      if (session.ok) {
        return session.json();
      }
    } catch {
      continue;
    }
  }
  return null;
}

export function calculateProgress(progress) {
  const totalSessions = 20;
  const completed = progress.completedSessions?.length || 0;
  return Math.round((completed / totalSessions) * 100);
}

export function getStageName(stageId, stages) {
  const stage = stages.find(s => s.id === stageId);
  return stage ? stage.name : `Stage ${stageId}`;
}
