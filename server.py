"""
CosmosCommand - Local Mission Control Runner
Serves the web application on localhost and automatically launches the default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    port = PORT
    while port < 8090:
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print(f"==================================================")
                print(f"  COSMOSCOMMAND MISSION CONTROL OPERATIONAL")
                print(f"  Cockpit URL: {url}")
                print(f"  Root Dir:    {DIRECTORY}")
                print(f"  Press Ctrl+C to stop local telemetry server.")
                print(f"==================================================")
                webbrowser.open(url)
                httpd.serve_forever()
        except OSError:
            port += 1

if __name__ == '__main__':
    try:
        run()
    except KeyboardInterrupt:
        print("\n[CosmosCommand] Server gracefully terminated.")
        sys.exit(0)
