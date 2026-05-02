#!/usr/bin/env python3
"""
Internal duplication audit across recently-uplifted templates.

Computes pairwise Jaccard similarity over 5-word shingles for 10 random
pages per route type. Strips chrome (header/footer/sidebar/breadcrumb,
operator cards block) before shingling so we measure ONLY the per-page
unique content the templates compose.

Usage:  python3 tools/content-audits/duplicate_check.py
"""

import os
import random
import re
import sys
from collections import defaultdict
from pathlib import Path

random.seed(42)

NEXT_APP = Path(".next/server/app")

ROUTE_DEFS = [
    {
        "name": "/states/[slug]/[city]",
        "list_fn": "list_cities",
    },
    {
        "name": "/states/[slug]/crops/[crop]",
        "list_fn": "list_state_crops",
    },
    {
        "name": "/states/[slug]/services/[service]",
        "list_fn": "list_state_services",
    },
    {
        "name": "/operators/[slug]",
        "list_fn": "list_operators",
    },
    {
        "name": "/states/[slug]",
        "list_fn": "list_state_hubs",
    },
]


def list_cities():
    out = []
    states_dir = NEXT_APP / "states"
    for state in sorted(states_dir.iterdir()):
        if not state.is_dir():
            continue
        for f in state.iterdir():
            if f.name.endswith(".html") and f.name not in ("operators.html",):
                slug = f.stem
                out.append((f"{state.name}/{slug}", str(f)))
    return out


def list_state_crops():
    out = []
    states_dir = NEXT_APP / "states"
    for state in sorted(states_dir.iterdir()):
        crops = state / "crops"
        if not crops.exists():
            continue
        for f in crops.iterdir():
            if f.name.endswith(".html"):
                slug = f.stem
                out.append((f"{state.name}/crops/{slug}", str(f)))
    return out


def list_state_services():
    out = []
    states_dir = NEXT_APP / "states"
    for state in sorted(states_dir.iterdir()):
        services = state / "services"
        if not services.exists():
            continue
        for f in services.iterdir():
            if f.name.endswith(".html"):
                slug = f.stem
                out.append((f"{state.name}/services/{slug}", str(f)))
    return out


def list_operators():
    out = []
    ops_dir = NEXT_APP / "operators"
    for f in sorted(ops_dir.iterdir()):
        if f.name.endswith(".html"):
            out.append((f.stem, str(f)))
    return out


def list_state_hubs():
    out = []
    states_dir = NEXT_APP / "states"
    for f in sorted(states_dir.iterdir()):
        if f.name.endswith(".html"):
            out.append((f.stem, str(f)))
    return out


LIST_FNS = {
    "list_cities": list_cities,
    "list_state_crops": list_state_crops,
    "list_state_services": list_state_services,
    "list_operators": list_operators,
    "list_state_hubs": list_state_hubs,
}


def strip_html(html: str, route_name: str) -> str:
    """Strip chrome and shared blocks. Output is plain text of unique-to-page copy."""
    s = html

    # Remove all <script> and <style>
    s = re.sub(r"<script\b[\s\S]*?</script>", " ", s, flags=re.I)
    s = re.sub(r"<style\b[\s\S]*?</style>", " ", s, flags=re.I)

    # Remove top-level chrome
    s = re.sub(r"<header\b[\s\S]*?</header>", " ", s, flags=re.I)
    s = re.sub(r"<footer\b[\s\S]*?</footer>", " ", s, flags=re.I)
    s = re.sub(r'<nav\b[^>]*aria-label="?Breadcrumb[^>]*>[\s\S]*?</nav>', " ", s, flags=re.I)
    s = re.sub(r"<aside\b[\s\S]*?</aside>", " ", s, flags=re.I)

    # Remove the operator-cards grid pattern. The grid wrapper is
    # <div class="grid grid-cols-1 sm:grid-cols-2 gap-5"> ... </div>
    # Operator cards are intentionally shared across pages within a state, so
    # they shouldn't count as unique-to-page content.
    # We detect and excise it conservatively.
    s = re.sub(
        r'<div class="grid grid-cols-1 sm:grid-cols-2 gap-5"[^>]*>[\s\S]*?(?=<section|<div class="(?!grid grid-cols-1 sm)|<h2|<aside|<footer)',
        " ",
        s,
        flags=re.I,
    )

    # Remove the "Other crops" / "Other cities" / "Related" chip rows that
    # are mechanically composed from a shared list.
    s = re.sub(
        r"(Other (crops|cities|drone services) in[\s\S]*?)(?=<h2|<section|<footer|<aside)",
        " ",
        s,
        flags=re.I,
    )

    # Strip remaining HTML tags
    s = re.sub(r"<[^>]+>", " ", s)

    # Decode entities
    entities = {
        "&nbsp;": " ", "&amp;": "&", "&apos;": "'", "&#x27;": "'",
        "&quot;": '"', "&lt;": "<", "&gt;": ">", "&#x2F;": "/",
    }
    for k, v in entities.items():
        s = s.replace(k, v)
    s = re.sub(r"&#?\w+;", " ", s)

    # Collapse whitespace
    s = re.sub(r"\s+", " ", s).strip()

    # Lowercase for shingling robustness
    return s.lower()


def shingles(text: str, n: int = 5) -> set:
    words = text.split()
    if len(words) < n:
        return set()
    return {" ".join(words[i:i + n]) for i in range(len(words) - n + 1)}


def jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    union = len(a | b)
    return inter / union if union else 0.0


def audit_route(route, sample_size=10):
    pages = LIST_FNS[route["list_fn"]]()
    if not pages:
        return None
    sample = random.sample(pages, min(sample_size, len(pages)))

    docs = {}
    for label, path in sample:
        try:
            with open(path) as f:
                html = f.read()
        except Exception as e:
            print(f"  [skip] {label}: {e}", file=sys.stderr)
            continue
        text = strip_html(html, route["name"])
        sh = shingles(text)
        docs[label] = (text, sh)

    labels = list(docs.keys())
    n = len(labels)
    pairwise = []
    for i in range(n):
        for j in range(i + 1, n):
            la, lb = labels[i], labels[j]
            sim = jaccard(docs[la][1], docs[lb][1])
            pairwise.append((la, lb, sim))

    pairwise.sort(key=lambda x: -x[2])
    avg = sum(p[2] for p in pairwise) / len(pairwise) if pairwise else 0.0
    high = [p for p in pairwise if p[2] >= 0.70]

    word_counts = {label: len(text.split()) for label, (text, _) in docs.items()}

    return {
        "route": route["name"],
        "sample_size": n,
        "total_pages": len(pages),
        "avg_similarity": avg,
        "max_similarity": pairwise[0][2] if pairwise else 0.0,
        "min_similarity": pairwise[-1][2] if pairwise else 0.0,
        "top5": pairwise[:5],
        "high_similarity_pairs": high,
        "word_counts": word_counts,
    }


def verdict(avg_sim: float, has_70_plus: bool) -> str:
    if has_70_plus:
        return "FAIL"
    if avg_sim >= 0.60:
        return "FAIL"
    if avg_sim >= 0.40:
        return "WARN"
    return "PASS"


def main():
    if not NEXT_APP.exists():
        print(f"Error: {NEXT_APP} not found. Run `npm run build` first.", file=sys.stderr)
        sys.exit(1)

    results = []
    for route in ROUTE_DEFS:
        r = audit_route(route)
        if r:
            results.append(r)

    print("# Internal duplication audit\n")
    print("Per-route summary (lower = more unique pages):\n")
    print(f"{'Route':<40} {'Sample':>7} {'Avg sim':>8} {'Max sim':>8} {'Min sim':>8} {'Verdict':>8}")
    print("-" * 85)
    for r in results:
        v = verdict(r["avg_similarity"], len(r["high_similarity_pairs"]) > 0)
        print(
            f"{r['route']:<40} {r['sample_size']:>7} "
            f"{r['avg_similarity']*100:>7.1f}% {r['max_similarity']*100:>7.1f}% "
            f"{r['min_similarity']*100:>7.1f}% {v:>8}"
        )

    for r in results:
        print(f"\n## {r['route']} ({r['total_pages']} total pages)")
        print(f"Sample size: {r['sample_size']}; pairwise comparisons: {r['sample_size']*(r['sample_size']-1)//2}")
        print(f"Avg / max / min Jaccard similarity: {r['avg_similarity']*100:.1f}% / {r['max_similarity']*100:.1f}% / {r['min_similarity']*100:.1f}%")
        print(f"Pairs >=70% similarity: {len(r['high_similarity_pairs'])}")
        print(f"\nTop 5 most-similar pairs:")
        for la, lb, sim in r["top5"]:
            wa = r["word_counts"].get(la, 0)
            wb = r["word_counts"].get(lb, 0)
            print(f"  {sim*100:5.1f}%  {la}  ({wa} words)  vs  {lb}  ({wb} words)")
        print(f"\nWord-count range across sample: {min(r['word_counts'].values())} to {max(r['word_counts'].values())} words")


if __name__ == "__main__":
    main()
