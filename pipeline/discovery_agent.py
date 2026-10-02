#!/usr/bin/env python3
"""
CosmosCommand - Phase 1: Discovery Agent (discovery_agent.py)
Automated space event harvester that crawls primary agency feeds, university research,
and aerospace manifests, staging candidates for verification.
"""

import json
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import datetime
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
STAGING_FILE = os.path.join(DATA_DIR, 'staging_candidates.json')

class DiscoveryAgent:
    def __init__(self):
        self.candidates = []

    def log(self, msg):
        now = datetime.datetime.now(datetime.timezone.utc).strftime("%H:%M:%S")
        safe_msg = str(msg).encode('ascii', 'replace').decode('ascii')
        print(f"[{now}] [DiscoveryAgent] {safe_msg}")

    def fetch_feed(self, url, timeout=8):
        req = urllib.request.Request(url, headers={'User-Agent': 'CosmosCommand-DiscoveryAgent/1.0'})
        try:
            with urllib.request.urlopen(req, timeout=timeout) as response:
                return response.read()
        except Exception as e:
            self.log(f"Warning: Could not fetch feed {url}: {e}")
            return None

    def discover_nasa_rss(self):
        self.log("Crawling NASA Science & Mission Press Feeds...")
        urls = [
            "https://www.nasa.gov/news-release/feed/",
            "https://science.nasa.gov/feed/"
        ]
        count = 0
        for url in urls:
            raw = self.fetch_feed(url)
            if not raw:
                continue
            try:
                root = ET.fromstring(raw)
                for item in root.findall('.//item'):
                    title = item.findtext('title', '').strip()
                    link = item.findtext('link', '').strip()
                    pub_date = item.findtext('pubDate', '').strip()
                    desc = item.findtext('description', '').strip()

                    # Clean CDATA/HTML tags from description
                    desc_clean = re.sub(r'<[^>]+>', '', desc).strip()

                    if title and link:
                        self.candidates.append({
                            "candidate_id": f"nasa-{abs(hash(link)) % 10000000}",
                            "title": title,
                            "raw_date": pub_date,
                            "publisher": "NASA",
                            "agency": "NASA",
                            "source_url": link,
                            "summary": desc_clean[:280] if desc_clean else title,
                            "discovery_source": "NASA Official RSS",
                            "discovered_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                            "domain": "nasa.gov",
                            "candidate_type": "agency_dispatch"
                        })
                        count += 1
            except Exception as e:
                self.log(f"Error parsing XML from {url}: {e}")
        self.log(f"NASA feeds harvested: {count} candidates.")

    def discover_esa_rss(self):
        self.log("Crawling European Space Agency (ESA) Feeds...")
        url = "https://www.esa.int/rssfeed/Our_Activities/Space_News"
        raw = self.fetch_feed(url)
        count = 0
        if raw:
            try:
                root = ET.fromstring(raw)
                for item in root.findall('.//item'):
                    title = item.findtext('title', '').strip()
                    link = item.findtext('link', '').strip()
                    pub_date = item.findtext('pubDate', '').strip()
                    desc = item.findtext('description', '').strip()
                    desc_clean = re.sub(r'<[^>]+>', '', desc).strip()

                    if title and link:
                        self.candidates.append({
                            "candidate_id": f"esa-{abs(hash(link)) % 10000000}",
                            "title": title,
                            "raw_date": pub_date,
                            "publisher": "European Space Agency",
                            "agency": "ESA",
                            "source_url": link,
                            "summary": desc_clean[:280] if desc_clean else title,
                            "discovery_source": "ESA Official RSS",
                            "discovered_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                            "domain": "esa.int",
                            "candidate_type": "agency_dispatch"
                        })
                        count += 1
            except Exception as e:
                self.log(f"Error parsing ESA XML: {e}")
        self.log(f"ESA feeds harvested: {count} candidates.")

    def discover_snapi_candidates(self):
        self.log("Querying Spaceflight News API (SNAPI v4) for verified space missions...")
        url = "https://api.spaceflightnewsapi.net/v4/articles/?limit=20"
        raw = self.fetch_feed(url)
        count = 0
        if raw:
            try:
                data = json.loads(raw.decode('utf-8'))
                for art in data.get('results', []):
                    title = art.get('title', '').strip()
                    link = art.get('url', '').strip()
                    pub_date = art.get('published_at', '')
                    site = art.get('news_site', 'Spaceflight Publisher')
                    summary = art.get('summary', '')

                    # Extract primary domain
                    domain_match = re.search(r'https?://([^/]+)', link)
                    domain = domain_match.group(1) if domain_match else "unknown"

                    if title and link:
                        self.candidates.append({
                            "candidate_id": f"snapi-{art.get('id', abs(hash(link)) % 10000000)}",
                            "title": title,
                            "raw_date": pub_date,
                            "publisher": site,
                            "agency": "Multi-Agency / Global",
                            "source_url": link,
                            "summary": summary[:280] if summary else title,
                            "discovery_source": "SNAPI v4 Aggregator",
                            "discovered_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                            "domain": domain,
                            "candidate_type": "aerospace_report"
                        })
                        count += 1
            except Exception as e:
                self.log(f"Error parsing SNAPI JSON: {e}")
        self.log(f"SNAPI harvested: {count} candidates.")

    def run(self):
        self.log("=== INITIATING AUTOMATED DISCOVERY RUN ===")
        self.candidates = []

        self.discover_nasa_rss()
        self.discover_esa_rss()
        self.discover_snapi_candidates()

        os.makedirs(DATA_DIR, exist_ok=True)
        with open(STAGING_FILE, 'w', encoding='utf-8') as f:
            json.dump({
                "pipeline_version": "1.0-provenance",
                "harvest_timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "total_candidates": len(self.candidates),
                "candidates": self.candidates
            }, f, indent=2)

        self.log(f"Discovery Run Complete. Staged {len(self.candidates)} candidates in {STAGING_FILE}")
        return len(self.candidates)

if __name__ == '__main__':
    agent = DiscoveryAgent()
    agent.run()
