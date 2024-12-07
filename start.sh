#!/bin/bash
# Start Xvfb
Xvfb :99 -screen 0 1280x1024x24 > /dev/null 2>&1 &

# Keep container running
tail -f /dev/null