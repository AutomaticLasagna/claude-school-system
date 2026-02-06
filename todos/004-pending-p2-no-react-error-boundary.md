---
status: pending
priority: p2
issue_id: "004"
tags: [code-review, architecture, quality]
---

# No React Error Boundary

## Problem Statement
The React app has no `ErrorBoundary` component. If any component throws during render (e.g., malformed JSON data, missing properties), the entire dashboard crashes with a white screen and no user-visible error message.

## Location
- `src/App.jsx` - top-level component, no error boundary wrapping
- `src/components/Dashboard.jsx` - handles fetch errors but not render errors

## Proposed Fix
Create an `ErrorBoundary` class component that catches render errors and displays a friendly fallback UI.

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">
        <h2>Something went wrong</h2>
        <p>{this.state.error?.message}</p>
      </div>;
    }
    return this.props.children;
  }
}
```

Wrap `<Dashboard />` in `App.jsx` with `<ErrorBoundary>`.

## Acceptance Criteria
- [ ] ErrorBoundary component created
- [ ] Dashboard wrapped in ErrorBoundary
- [ ] White screen no longer occurs on render errors
