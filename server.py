#!/usr/bin/env python3
"""
Simple HTTP server to serve the AI Agent Interview web app.
"""

import http.server
import socketserver
import os
from pathlib import Path

# Set the port
PORT = 8000

# Change to the directory containing our files
os.chdir(Path(__file__).parent)

# Create handler
Handler = http.server.SimpleHTTPRequestHandler

# Create server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")