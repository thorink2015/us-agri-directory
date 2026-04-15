# Backup and recovery

> How to roll back safely if something breaks, and how to find things
> that seem lost.

## Git is the backup

Every change is committed and pushed to GitHub:

- **Remote:** `origin` = `http://127.0.0.1:28755/git/thorink2015/usss-terra`
  (local proxy to https://github.com/thorink2015/usss-terra)
- **Working branch:** `claude/add-drone-operators-directory-T0YnN`
  — this is where all US-site development happens.
- **Main branch:** holds the OLD Romanian codebase + research file uploads.
  Never merge main into the working branch.

Before any destructive operation, check `git log --oneline -20` to
verify you know which commit to restore to.

## Finding a lost file

If a file was deleted or overwritten:

```bash
# List every version of the file across history
git log --all --follow -- path/to/file

# Recover from a past commit
git checkout <commit-hash> -- path/to/file
```

## Reverting a bad commit (safe)

**Prefer revert over reset.** `revert` creates a new commit that undoes
the bad one; history is preserved. `reset --hard` rewrites history and
can destroy work.

```bash
# Undo the most recent commit without losing history
git revert HEAD

# Undo a specific commit by hash
git revert <commit-hash>

git push origin claude/add-drone-operators-directory-T0YnN
```

## Backing out an uncommitted mess

```bash
# See what's changed
git status && git diff

# Discard changes in a specific file
git checkout -- path/to/file

# Discard ALL uncommitted changes (destructive — confirm first!)
git stash      # safer: keeps changes on stash
# or
git reset --hard HEAD   # destructive
```

## Rolling back a deploy on Netlify

Netlify keeps a history of every deploy. If a production deploy is
bad:

1. Go to Netlify dashboard → Deploys
2. Find the last known good deploy
3. Click "Publish deploy" on that row — reverts production instantly
4. Then push a fix to the branch; Netlify will redeploy the working branch

## Disaster recovery checklist

If the working branch gets corrupted or something catastrophic happens:

1. **Don't panic.** Nothing is deleted until you run a destructive command.
2. `git reflog` — shows every HEAD move, including after `reset --hard`.
   You can recover commits that "disappeared."
3. Check the remote: `git fetch origin && git log origin/claude/add-drone-operators-directory-T0YnN -10`
   — the remote has everything that was pushed.
4. If the local branch is hosed but the remote is fine:
   ```bash
   git reset --hard origin/claude/add-drone-operators-directory-T0YnN
   ```
5. If the remote is also hosed: Netlify deploy logs still have the
   built site, and GitHub may have branch-protection / reflog.

## Avoiding disaster in the first place

- **Never** `git push --force` or `git reset --hard origin/main`
- **Never** delete the working branch
- **Never** commit secrets (`.env`, credentials) — check `.gitignore`
- **Never** use `--no-verify` to skip commit hooks
- **Never** amend a pushed commit — create a new commit instead
- **Always** check `git status` and `git diff` before committing
- **Always** prefer specific `git add path/to/file` over `git add .`
- **Always** test destructive commands on a throwaway file first

## Files outside git (not backed up)

- `node_modules/` — regenerate with `npm install`
- `.next/` — regenerate with `npm run build`
- `.env` — must be recreated from Netlify dashboard env vars
- Anything in `/tmp/` — ephemeral, gone on restart
