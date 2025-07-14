# Folder Move Checklist Template

This checklist ensures a smooth and error-free project folder move or migration. Adapted from TaskMate's real-world experience.

---

## Pre-Move Preparation
- [ ] Review all environment files (e.g., .env) and ensure you have backups
- [ ] Check .gitignore and editor ignore files (e.g., .cursorignore)
- [ ] Document current folder structure and dependencies
- [ ] Notify team members of planned move

## During Move
- [ ] Move all source, docs, and config files to the new location
- [ ] Double-check that hidden files (e.g., .env) are included
- [ ] Update any hardcoded paths or references in scripts and docs

## Post-Move Validation
- [ ] Recreate or copy .env and other environment files (not tracked by git)
- [ ] Run all setup scripts and validate environment
- [ ] Test backend and frontend startup
- [ ] Validate API keys and third-party integrations
- [ ] Check for missing dependencies or broken links

## Documentation Updates
- [ ] Update documentation map/README with new paths
- [ ] Add a note in the change log about the move
- [ ] Reference this checklist in session summaries and retrospectives
- [ ] Document any unique issues or lessons learned

---

> For more details, see the TaskMate project or the VCMS Documentation Standards. 