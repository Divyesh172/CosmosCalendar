#!/usr/bin/env python3
"""
CosmosCommand - Master Pipeline Runner (run_pipeline.py)
Orchestrates Phase 1 (Discovery Agent) and Phase 2 (Source & Integrity Verification Agent),
producing cryptographically signed, source-verified space intelligence for CosmosCommand.
"""

import sys
import os
import time

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, CURRENT_DIR)

from discovery_agent import DiscoveryAgent
from verification_agent import SourceIntegrityVerificationAgent

def run_pipeline():
    print("=" * 65)
    print("  COSMOSCOMMAND // MULTI-AGENT SPACE INTELLIGENCE PIPELINE")
    print("=" * 65)
    start_time = time.time()

    # Step 1: Discovery Agent
    print("\n>>> INITIATING PHASE 1: DISCOVERY AGENT")
    discovery = DiscoveryAgent()
    total_staged = discovery.run()

    # Step 2: Source & Integrity Verification Agent
    print("\n>>> INITIATING PHASE 2: SOURCE & INTEGRITY VERIFICATION AGENT")
    print("    [Auditing: Domain Whitelist & Tier, ISO-8601 Syntax, Aerospace Entity Relevance, Non-Spam Density]")
    verification = SourceIntegrityVerificationAgent()
    success = verification.run()

    elapsed = round(time.time() - start_time, 2)
    stats = verification.stats

    print("\n" + "=" * 65)
    print("  MULTI-AGENT PIPELINE AUDIT SUMMARY")
    print("=" * 65)
    print(f"  • Execution Time:         {elapsed}s")
    print(f"  • Total Discovered:       {stats['total_audited']} candidates")
    print(f"  • Verified & Approved:    {stats['approved_count']} records (>= 85% confidence)")
    print(f"  • Quarantined / Rejected: {stats['quarantined_count']} records (< 85% confidence)")
    print(f"  • Mean Confidence Score:  {stats['average_confidence']}%")
    print(f"  • Verified Store:         pipeline/data/verified_intel.json")
    print(f"  • Client Telemetry:       pipeline/data/pipeline_metrics.js")
    print("=" * 65)
    print("  STATUS: SOURCE & INTEGRITY PIPELINE SYNCHRONIZED WITH COCKPIT.\n")

if __name__ == '__main__':
    run_pipeline()
