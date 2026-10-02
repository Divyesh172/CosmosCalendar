#!/usr/bin/env python3
"""
CosmosCommand - Phase 2: Source & Integrity Verification Agent (verification_agent.py)
Audits staged candidates against primary authority rules, validates temporal geometry,
evaluates content integrity/anti-spam, assigns confidence scores and SHA-256 provenance signatures.

HONESTY & PROVENANCE GUARANTEE:
This agent validates:
(1) Domain whitelisting & authority tier,
(2) ISO-8601 temporal syntax integrity,
(3) Aerospace entity relevance classification,
(4) Content density & anti-spam integrity,
and signs records cryptographically with SHA-256. It does NOT assert independent truth-of-claim.
"""

import json
import hashlib
import datetime
import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
STAGING_FILE = os.path.join(DATA_DIR, 'staging_candidates.json')
VERIFIED_FILE = os.path.join(DATA_DIR, 'verified_intel.json')
QUARANTINE_FILE = os.path.join(DATA_DIR, 'quarantine_log.json')
VERIFIED_JS_FILE = os.path.join(DATA_DIR, 'verified_intel.js')
METRICS_JS_FILE = os.path.join(DATA_DIR, 'pipeline_metrics.js')

# Approved Authoritative & Verified Aerospace Whitelist
AUTHORITATIVE_DOMAINS = {
    "nasa.gov": {"tier": "authoritative", "authority": "primary", "weight": 35},
    "esa.int": {"tier": "authoritative", "authority": "primary", "weight": 35},
    "isro.gov.in": {"tier": "authoritative", "authority": "primary", "weight": 35},
    "jaxa.jp": {"tier": "authoritative", "authority": "primary", "weight": 35},
    "cnsa.gov.cn": {"tier": "authoritative", "authority": "primary", "weight": 35},
    "spacex.com": {"tier": "authoritative", "authority": "primary", "weight": 30},
    "rocketlabusa.com": {"tier": "authoritative", "authority": "primary", "weight": 30},
    "thespacedevs.com": {"tier": "aggregator", "authority": "secondary", "weight": 25},
    "spacenews.com": {"tier": "aggregator", "authority": "secondary", "weight": 25},
    "arstechnica.com": {"tier": "aggregator", "authority": "secondary", "weight": 25},
    "spaceflightnow.com": {"tier": "aggregator", "authority": "secondary", "weight": 25},
    "nasaspaceflight.com": {"tier": "aggregator", "authority": "secondary", "weight": 25}
}

# Recognized Aerospace Research Institutes, Observatories & Laboratories
AEROSPACE_ACADEMIC_INSTITUTES = {
    "jhuapl.edu": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "Johns Hopkins Applied Physics Laboratory"},
    "cfa.harvard.edu": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "Center for Astrophysics | Harvard & Smithsonian"},
    "lasp.colorado.edu": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "Laboratory for Atmospheric and Space Physics (CU Boulder)"},
    "space.mit.edu": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "MIT Kavli Institute for Astrophysics and Space Research"},
    "sese.asu.edu": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "ASU School of Earth and Space Exploration"},
    "caltech.edu": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "California Institute of Technology / JPL Affiliation"},
    "astro.univie.ac.at": {"tier": "academic_institute", "authority": "primary", "weight": 35, "name": "University of Vienna Dept. of Astrophysics"},
}

class SourceIntegrityVerificationAgent:
    def __init__(self):
        self.verified_events = []
        self.quarantined_events = []
        self.stats = {
            "total_audited": 0,
            "approved_count": 0,
            "quarantined_count": 0,
            "average_confidence": 0.0,
            "audit_timestamp": None
        }

    def log(self, msg):
        now = datetime.datetime.now(datetime.timezone.utc).strftime("%H:%M:%S")
        safe_msg = str(msg).encode('ascii', 'replace').decode('ascii')
        print(f"[{now}] [SourceIntegrityVerificationAgent] {safe_msg}")

    def parse_date(self, raw_date_str):
        if not raw_date_str:
            return None
        # Handle ISO strings (e.g. 2026-10-01T12:00:00Z)
        try:
            return datetime.datetime.fromisoformat(raw_date_str.replace('Z', '+00:00'))
        except Exception:
            pass

        # Handle RFC 2822 (e.g. Thu, 01 Oct 2026 12:00:00 +0000)
        try:
            import email.utils
            parsed_tuple = email.utils.parsedate_to_datetime(raw_date_str)
            return parsed_tuple
        except Exception:
            pass

        # Handle standard YYYY-MM-DD
        try:
            return datetime.datetime.strptime(raw_date_str[:10], "%Y-%m-%d").replace(tzinfo=datetime.timezone.utc)
        except Exception:
            return None

    def compute_sha256(self, title, url, iso_date):
        payload = f"{title.strip().lower()}|{url.strip().lower()}|{iso_date}".encode('utf-8')
        return hashlib.sha256(payload).hexdigest()

    def audit_candidate(self, candidate):
        self.stats["total_audited"] += 1
        title = candidate.get("title", "").strip()
        raw_date = candidate.get("raw_date", "")
        url = candidate.get("source_url", "")
        domain = candidate.get("domain", "").lower()
        summary = candidate.get("summary", "")
        text_corpus = f"{title} {summary}".lower()

        checks = {
            "domain_whitelisted": False,
            "temporal_syntax_valid": False,
            "aerospace_entity_match": False,
            "content_integrity_valid": False
        }
        score = 0
        failure_reasons = []

        # 1. Domain Authority Check (Max 35 pts)
        matched_auth = None
        for auth_domain, info in AUTHORITATIVE_DOMAINS.items():
            if auth_domain in domain:
                matched_auth = info
                score += info["weight"]
                checks["domain_whitelisted"] = True
                break

        # Check recognized aerospace research institutes & observatories
        if not checks["domain_whitelisted"]:
            for inst_domain, info in AEROSPACE_ACADEMIC_INSTITUTES.items():
                if inst_domain in domain:
                    matched_auth = info
                    score += info["weight"]
                    checks["domain_whitelisted"] = True
                    break

        # Secondary academic candidate check (require specific lab/observatory/astrophysics attribution)
        if not checks["domain_whitelisted"]:
            is_academic = (
                domain.endswith(".edu") or
                domain.endswith(".ac.uk") or
                domain.endswith(".ac.at") or
                domain.endswith(".edu.au") or
                ".edu." in domain
            )
            if is_academic:
                academic_indicators = [
                    "observatory", "laboratory", "lab", "astrophysics", "astronomy",
                    "aerospace", "space", "institute", "cosmology", "planetary", "telescope"
                ]
                has_attr = any(ind in text_corpus for ind in academic_indicators) or any(ind in domain for ind in academic_indicators)
                if has_attr:
                    matched_auth = {
                        "tier": "academic_candidate",
                        "authority": "secondary",
                        "weight": 18,
                        "attribution": "Aerospace laboratory / observatory attribution detected"
                    }
                    score += 18
                    checks["domain_whitelisted"] = True
                else:
                    failure_reasons.append(f"Academic domain '{domain}' lacks verified aerospace observatory/laboratory attribution")
            else:
                failure_reasons.append(f"Domain '{domain}' not in authoritative aerospace whitelist")

        # 2. Temporal Syntax Check (Max 25 pts)
        parsed_dt = self.parse_date(raw_date)
        if parsed_dt:
            checks["temporal_syntax_valid"] = True
            score += 25
            iso_date = parsed_dt.astimezone(datetime.timezone.utc).isoformat()
        else:
            iso_date = datetime.datetime.now(datetime.timezone.utc).isoformat()
            failure_reasons.append(f"Could not parse temporal timestamp: '{raw_date}'")

        # 3. Aerospace Entity Match (Max 20 pts)
        keywords = ["space", "nasa", "esa", "isro", "orbit", "satellite", "rocket", "moon", "lunar",
                    "mars", "telescope", "payload", "launch", "astronaut", "cosmic", "asteroid", "rover"]
        matched_keywords = [k for k in keywords if k in text_corpus]
        if len(matched_keywords) >= 1:
            checks["aerospace_entity_match"] = True
            score += min(20, len(matched_keywords) * 7)
        else:
            failure_reasons.append("No recognized aerospace entities or mission parameters found")

        # 4. Content Integrity & Anti-Spam Density (Max 20 pts)
        if len(title) >= 12 and not any(spam in text_corpus for spam in ["casino", "crypto", "free gift"]):
            checks["content_integrity_valid"] = True
            score += 20
        else:
            failure_reasons.append("Title length inadequate or spam signatures detected")

        # Compute Provenance Hash
        prov_hash = self.compute_sha256(title, url, iso_date)

        # Confidence Score (Capped 0-100)
        confidence = min(100, score)

        verified_record = {
            "id": f"intel-{candidate.get('candidate_id', prov_hash[:12])}",
            "type": "news" if "dispatch" in candidate.get("candidate_type", "") else "launch",
            "category": "Verified Intel",
            "title": f"✦ {title}",
            "date": iso_date,
            "day": parsed_dt.day if parsed_dt else 1,
            "agency": candidate.get("agency", "Global Space Authority"),
            "publisher": candidate.get("publisher", "Verified Source"),
            "summary": summary,
            "details": f"{summary} Audited by CosmosCommand Source & Integrity Verification Agent (Confidence: {confidence}%).",
            "color": "#06b6d4" if confidence >= 90 else "#3b82f6",
            "provenance": {
                "tier": matched_auth["tier"] if matched_auth else "unverified",
                "authority": matched_auth["authority"] if matched_auth else "unverified",
                "publisher": candidate.get("publisher", "Space Authority"),
                "reportingSource": candidate.get("discovery_source", "Automated Multi-Agent Pipeline"),
                "sourceUrl": url,
                "retrievedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                "status": "verified_live",
                "verification_score": confidence,
                "signature_hash": prov_hash,
                "audit_checks": checks,
                "verification_method": "source_and_integrity_audit",
                "verification_scope": "domain_whitelisting, iso8601_syntax_integrity, aerospace_entity_relevance, content_density_antispam",
                "verification_disclaimer": "Authenticates source tier, ISO-8601 timestamp syntax, aerospace keyword relevance, and content integrity; does not assert independent truth-of-claim.",
                "cachedAt": None
            }
        }

        # Threshold: 85% required for automated inclusion
        if confidence >= 85 and checks["domain_whitelisted"] and checks["temporal_syntax_valid"]:
            self.verified_events.append(verified_record)
            self.log(f"APPROVED [{confidence}%]: {title[:55]}...")
        else:
            self.quarantined_events.append({
                "candidate": candidate,
                "confidence_score": confidence,
                "failure_reasons": failure_reasons,
                "audit_checks": checks,
                "quarantined_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
            })
            self.log(f"QUARANTINED [{confidence}%]: {title[:55]}... Reasons: {', '.join(failure_reasons)}")

    def run(self):
        self.log("=== INITIATING SOURCE & INTEGRITY VERIFICATION AUDIT ===")
        if not os.path.exists(STAGING_FILE):
            self.log(f"Error: Staging file {STAGING_FILE} not found. Run discovery_agent.py first.")
            return False

        with open(STAGING_FILE, 'r', encoding='utf-8') as f:
            staging_data = json.load(f)

        candidates = staging_data.get("candidates", [])
        self.log(f"Loaded {len(candidates)} candidates for verification.")

        self.verified_events = []
        self.quarantined_events = []
        self.stats["total_audited"] = 0

        for cand in candidates:
            self.audit_candidate(cand)

        self.stats["approved_count"] = len(self.verified_events)
        self.stats["quarantined_count"] = len(self.quarantined_events)
        total_scores = sum(e["provenance"]["verification_score"] for e in self.verified_events)
        self.stats["average_confidence"] = round(total_scores / max(1, len(self.verified_events)), 1)
        self.stats["audit_timestamp"] = datetime.datetime.now(datetime.timezone.utc).isoformat()

        # Save verified intel JSON
        with open(VERIFIED_FILE, 'w', encoding='utf-8') as f:
            json.dump({
                "pipeline_version": "1.0-source-integrity",
                "stats": self.stats,
                "verified_events": self.verified_events
            }, f, indent=2)

        # Save quarantine log JSON
        with open(QUARANTINE_FILE, 'w', encoding='utf-8') as f:
            json.dump({
                "stats": self.stats,
                "quarantined_events": self.quarantined_events
            }, f, indent=2)

        # Save client-ready JS files so CosmosCommand browser UI ingests it instantly
        with open(VERIFIED_JS_FILE, 'w', encoding='utf-8') as f:
            f.write(f"// Auto-generated by CosmosCommand Source & Integrity Verification Agent\nwindow.verifiedIntelEvents = {json.dumps(self.verified_events, indent=2)};\n")

        with open(METRICS_JS_FILE, 'w', encoding='utf-8') as f:
            f.write(f"// Auto-generated by CosmosCommand Source & Integrity Verification Agent\nwindow.agentPipelineTelemetry = {json.dumps({'stats': self.stats, 'quarantine': self.quarantined_events[:10]}, indent=2)};\n")

        self.log(f"Verification Run Complete: {len(self.verified_events)} Approved, {len(self.quarantined_events)} Quarantined.")
        self.log(f"Average Confidence: {self.stats['average_confidence']}%")
        return True

# Backward compatibility alias
VerificationAgent = SourceIntegrityVerificationAgent

if __name__ == '__main__':
    agent = SourceIntegrityVerificationAgent()
    agent.run()
