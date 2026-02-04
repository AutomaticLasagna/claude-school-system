#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

import json
import sys
from datetime import datetime
from pathlib import Path

def main():
    """Hook for session completion validation and logging"""
    try:
        payload = json.load(sys.stdin)
    except Exception:
        sys.exit(0)
    
    # Create logs directory if it doesn't exist
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)
    
    timestamp = datetime.now().isoformat()
    
    # Log the completion event
    entry = {
        "timestamp": timestamp,
        "session_id": payload.get("session_id", "unknown"),
        "event": "session_complete_hook",
        "payload": payload
    }
    
    log_file = log_dir / "session_complete.json"
    with open(log_file, "a", encoding="utf-8") as f:
        json.dump(entry, f)
        f.write("\n")
    
    # Simple text output (Git Bash compatible)
    print("=== Claude School - Session Complete ===")
    print(f"Timestamp: {timestamp}")
    print(f"Session: {payload.get('session_id', 'unknown')[:16]}...")
    print("=========================================")
    
    sys.exit(0)

if __name__ == "__main__":
    main()
