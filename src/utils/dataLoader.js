// Load JSON files for dashboard display
// Note: In development, Vite serves files from public/

export async function loadDashboardData() {
  try {
    console.log('Attempting to load data from:', window.location.origin);
    console.log('Fetching: /data/progress.json');

    const progressResponse = await fetch('/data/progress.json');
    console.log('Progress response status:', progressResponse.status);
    console.log('Progress response headers:', progressResponse.headers.get('content-type'));
    const progressText = await progressResponse.text();
    console.log('Progress response text (first 100 chars):', progressText.substring(0, 100));

    const progress = JSON.parse(progressText);
    const gates = await fetch('/data/quality-gates.json').then(r => r.json());
    const latestSession = await loadLatestSession();

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
