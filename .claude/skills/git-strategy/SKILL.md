---
name: Git Sync Strategy
description: Manage dual-branch synchronization for Local (full backup) and Cloud (public whitelist).
---

# Git Sync Strategy

This skill manages the synchronization of the project across two distinct scopes:
1. **Local Scope**: Full project backup on branch `local-all`.
2. **Cloud Scope**: Restricted public release on branch `public-view` (pushed to `origin/main`), containing only whitelisted files.

## Whitelisted Paths for Cloud
Only these files/directories are allowed on the remote `origin`:
- `uixskills/`
- `public/`
- `README.md`
- `docs/`
- `functions/`
- `uixskill.json`
- `.gitignore`
- `.claude/`
- `packages/uixskills/`

## Workflows

### 1. Sync to Local (Save All)
Use this workflow when the user asks to "save to local", "sync local", or "local backup".

**Steps:**
1. Ensure we are on `local-all`.
2. Stage all changes.
3. Commit with a descriptive message.

```bash
git checkout local-all
git add .
git commit -m "wip: local progress save" # Replace message as appropriate
```

### 2. Sync to Cloud (Publish)
Use this workflow when the user asks to "sync to cloud", "push to github", or "publish".

**Critical Rule**: NEVER push `local-all` to `origin`.

**Steps:**
1. Ensure local changes are saved to `local-all` first (run Local Sync if needed).
2. Switch to `public-view`.
3. Checkout the *latest version* of whitelisted files from `local-all`.
4. Commit the update.
5. Push `public-view` to `origin/main`.
6. Switch back to `local-all`.

```bash
# 1. Save local state
git checkout local-all
git add .
git commit -m "chore: save progress before sync"

# 2. Switch to public view and clean
git checkout public-view
# Remove all files except .git to ensure a clean sync
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +

# 3. Bring in latest whitelisted content from local-all
git checkout local-all -- uixskills public README.md docs functions uixskill.json .gitignore .claude packages/uixskills

# 4. Commit and Push
git add .
git commit -m "chore: sync public content from local"
git push origin public-view:main

# 5. Return to workspace
git checkout local-all
```
