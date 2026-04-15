# _memory — Claude Code self-maintaining memory

This folder is the **persistent memory** for Claude Code sessions on this
project. It survives across sessions, context compactions, and model
swaps. Future Claude Code sessions MUST read and update these files.

`CLAUDE.md` at the repo root is the auto-loaded entry point — it tells
every new session to read the files here before starting work.

## File map

| File | Purpose | When to update |
|---|---|---|
| `project-facts.md` | Verified facts about the project: branch, domain, author, env vars, conventions | Whenever a fact is **learned** or **changed**. Never fabricate. |
| `code-patterns.md` | Reusable code/content patterns (AEO block format, schema factories, byline signature) | When introducing a new pattern that other pages will copy. |
| `session-history.md` | Chronological log of batches completed | At the end of every batch. One line per batch. |
| `known-issues.md` | Gotchas, errors, and their fixes | When hitting any error + resolving it. |
| `pending-items.md` | Blocked items and what's needed to unblock them | When blocked waiting on user input or external work. |
| `backup-and-recovery.md` | How to roll back safely if something breaks | Rarely — stable document. |

## Hard rules for every session

1. **Read before writing.** At session start, skim `project-facts.md` and
   `pending-items.md`. Do NOT re-ask the user for facts that are recorded.
2. **Write after learning.** If the user says something new ("the author
   is named Eugen", "we use Formspree ID X", "the branch is Y"), append
   or edit the relevant file **in the same batch** before moving on.
3. **Small atomic edits.** One fact per edit. Don't rewrite whole files.
4. **Date-stamp.** Every session-history / known-issues entry uses ISO
   date (YYYY-MM-DD) so we know when it was recorded.
5. **No speculation.** If unsure, flag `TODO` or `??` rather than inventing.
6. **Commit memory updates with the work they describe.** Don't leave
   memory stale in a separate unpushed commit.

## What NOT to put here

- Secrets (API keys, tokens, passwords) — use `.env`, never commit
- Personal user data that the user didn't explicitly ask to persist
- Long-form research (that's what `_research/` is for)
- Generated content / scratch notes (use a temp file, delete after)

## Pre-launch cleanup

The folder is safe to keep in production (Next.js doesn't serve it), but
if Eugen wants a pristine repo before going live:

```bash
rm -rf _memory
git add -A && git commit -m "Remove internal memory folder before launch"
```

The knowledge in these files should be captured in `CLAUDE.md` or
external docs before deletion so future contributors retain the context.
