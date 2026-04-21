# CLAUDE.md — Master rules for Claude Code sessions

**This file is auto-loaded at the start of every session.** Read it
fully before doing any work. It is the single source of authority for
how to operate on this repo.

---

## Self-maintained memory system (`_memory/`)

This project uses a self-maintained knowledge base at `_memory/`.
**At the start of every session, read these in order:**

1. `_memory/copy-source-of-truth.md` — **HARD RULE** on what Claude
   Code may write vs. what must come from Eugen's research deliverables
2. `_memory/project-facts.md` — verified facts about the project
   (branch, domain, author, env vars, conventions)
3. `_memory/standing-rules.md` — read-before-every-task rules
   (sitemap/robots/schema checklist for new pages, voice, forbidden
   tokens, what not to touch)
4. `_memory/pending-items.md` — what's blocked and what's ready to build
5. `_memory/known-issues.md` — gotchas and their fixes
6. `_memory/session-history.md` — what's been shipped, in order
7. `_memory/code-patterns.md` — reusable code/content patterns to copy

These files exist **so the user never has to repeat themselves.** If a
fact is recorded there, don't ask for it again.

**During work, update these files** whenever:

- The user states a fact that should persist (author details, domain,
  branch, env var value, preference) → append to `project-facts.md`
- A new reusable pattern is introduced → document in `code-patterns.md`
- An error is encountered and resolved → log in `known-issues.md`
- A batch of work is completed → add a one-liner to `session-history.md`
- An item becomes blocked → add to `pending-items.md`
- An item becomes unblocked → move from `pending-items.md` into
  `session-history.md`

**Rules for updating memory files:**

- Small atomic edits (one fact per edit)
- Use `Edit` tool, not `Write`, for existing files
- Use ISO dates (YYYY-MM-DD)
- Never fabricate — flag `TODO` or `??` if uncertain
- Commit memory updates **with** the work they describe, not separately

See `_memory/README.md` for the full memory system spec.

---

## Work in small batches (hard rule)

The Claude Code API times out on long streams. **Never** attempt more
than 1–3 items (files, articles, sections) per response. After each
batch:

1. Commit
2. Push
3. Report what's done and what's next
4. Wait for user to say "next"

This is non-negotiable. Documented in `_memory/known-issues.md`.

---

## Branch discipline (hard rule)

- **Working branch:** `claude/add-drone-operators-directory-T0YnN`
- **Never push to other branches** without explicit user approval
- **Never merge `main`** into the working branch — main holds the old
  Romanian codebase plus research file uploads; merging would
  reintroduce Romanian URLs
- **Never force push**, never `--no-verify`, never amend pushed commits

---

## Project snapshot

See `_memory/project-facts.md` for the authoritative version. Quick
reference:

- **Site:** US Ag Drone Directory — `https://agdronedirectory.com`
- **Author:** Eugen (founder + editor). Canonical identity in `src/data/author.ts`
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind, Netlify
- **Data:** TypeScript in `src/data/` — no database
- **Internal folders:** `_research/` (docs), `_memory/` (this system) — both deletable before launch

---

## Tool usage rules

- Use `Read` before any `Edit` on a file (Edit fails otherwise)
- Use `Edit` not `Write` when modifying existing files
- Use `Grep`/`Glob`, never `grep`/`find` in Bash
- Multiple independent tool calls → run in parallel in one response
- Dependent tool calls → sequential
- Git commit messages: short subject + 2-3 line body, no `Co-Authored-By`
  unless user asks

---

## When to ask the user vs. proceed

**Proceed without asking** when:
- Making a local, reversible edit
- Adding new content following an established pattern
- Refactoring for consistency with `_memory/code-patterns.md`
- Fixing something the user just asked about

**Ask first** when:
- About to delete or rename files the user didn't explicitly mention
- About to push to a branch other than the working branch
- Introducing a new dependency
- Ambiguous scope ("fix the bug" with multiple possible bugs)
- The user's request conflicts with a recorded fact in `_memory/`
  (tell them the conflict, let them reconcile)

---

## When something goes wrong

Consult `_memory/backup-and-recovery.md`. Core principles:

- **Don't panic.** Git reflog recovers almost anything.
- **Prefer `revert` over `reset --hard`.**
- **Never push --force.**
- **Check `git status` and `git diff` before committing.**

---

## Session end protocol

Before ending a work session:

1. Verify all commits are pushed (`git status` → "up to date")
2. Update `_memory/session-history.md` with what was shipped
3. Update `_memory/pending-items.md` — move completed items out,
   add new blockers
4. If any new pattern was introduced, document it in
   `_memory/code-patterns.md`
5. Commit the memory updates together with the work commit (don't
   leave memory stale in a separate unpushed commit)

---

*Last reviewed: 2026-04-15. When this file becomes stale (>60 days since
last review), the next session should refresh it before starting work.*
