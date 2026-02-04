// Load JSON files for dashboard display
// Note: In development, Vite serves files from public/

export async function loadDashboardData() {
  try {
    const baseUrl = window.location.origin;
    console.log('Browser URL:', window.location.href);
    console.log('Fetching from origin:', baseUrl);

    const fetchOptions = {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' }
    };

    // Fetch progress.json
    const progressUrl = `${baseUrl}/data/progress.json`;
    console.log('Fetching:', progressUrl);

    const progressResponse = await fetch(progressUrl, fetchOptions);
    console.log('Progress response status:', progressResponse.status);

    // Check if response is ok
    if (!progressResponse.ok) {
      throw new Error(`HTTP error! status: ${progressResponse.status}`);
    }

    // Check content type
    const contentType = progressResponse.headers.get('content-type');
    console.log('Content-Type:', contentType);

    if (!contentType || !contentType.includes('application/json')) {
      const text = await progressResponse.text();
      console.error('Expected JSON but received:', text.substring(0, 200));
      throw new TypeError(`Expected JSON but got: ${contentType}`);
    }

    const progress = await progressResponse.json();
    console.log('Progress loaded successfully:', progress.currentSession);

    // Fetch quality gates
    const gatesResponse = await fetch(`${baseUrl}/data/quality-gates.json`, fetchOptions);
    if (!gatesResponse.ok) {
      throw new Error(`Failed to load quality-gates.json: ${gatesResponse.status}`);
    }
    const gates = await gatesResponse.json();

    // Fetch latest session
    const latestSession = await loadLatestSession(baseUrl, fetchOptions);

    return { progress, gates, latestSession };
  } catch (error) {
    console.error('Failed to load dashboard data:', error);
    return null;
  }
}

async function loadLatestSession(baseUrl, fetchOptions) {
  // Try loading sessions in reverse order until we find one
  for (let i = 20; i >= 1; i--) {
    try {
      const url = `${baseUrl}/data/sessions/session-${String(i).padStart(2, '0')}.json`;
      const session = await fetch(url, fetchOptions);
      if (session.ok) {
        const contentType = session.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return session.json();
        }
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
