# Cache Protection System

## Overview

The Cache Protection System ensures that critical test files, legacy code, and important documentation are never accidentally deleted during cache operations, build processes, or cleanup scripts.

## Protected Directories

### 1. **tests/** - Test Framework & CHANDRAYAAN Suite
Contains all testing infrastructure including the CHANDRAYAAN Precision Load Test Framework.

**Critical Files:**
- `load-test-chandrayaan.ts` - Main load test runner (1,500 concurrent users)
- `performance-monitor.ts` - Real-time performance monitoring
- `run-chandrayaan-test.ts` - Test orchestration
- `quick-start.sh` / `quick-start.bat` - Quick start scripts
- `README.md` - Test documentation
- `test-results-template.md` - Results template

**Status:** 🔴 CRITICAL - Do not delete

### 2. **archived_prep/** - Legacy Test & Preparation Files
Historical test files and preparation scripts that may be referenced or needed for debugging.

**Contents:**
- Comprehensive user testing scripts
- Lesson access verification tests
- Security tests
- Audit reports
- Programmatic test reports

**Status:** 🟡 IMPORTANT - Preserve for reference

### 3. **ARCHIVE/** - Historical Project Versions
Previous versions and reference implementations.

**Status:** 🟡 IMPORTANT - Preserve for comparison

### 4. **action-plan/** & **ACTION_PLAN/** - Project Planning
Project planning and action tracking documents.

**Status:** 🟡 IMPORTANT - Preserve for project history

## Protected Documentation Files

### Critical Documentation (🔴 CRITICAL)
- `CHANDRAYAAN_TEST_GUIDE.md` - Test framework guide
- `CHANDRAYAAN_TEST_IMPLEMENTATION.md` - Implementation details
- `PHASE1_COMPLETION_SUMMARY.md` - Phase 1 overview
- `FINAL_COMPLETION_REPORT.md` - Project completion status
- `DEPLOYMENT_READY.md` - Deployment checklist
- `MD_FILES_CONTRIBUTION_ANALYSIS_DETAILED.md` - Documentation analysis

### Important Documentation (🟡 IMPORTANT)
- `TESTING_*.md` - Testing results and summaries
- `TEST_*.md` - Test documentation
- `ROBUSTNESS_TEST_README.md` - Robustness testing guide
- `LAUNCH_READINESS_*.md` - Launch preparation docs
- `REF_APP_ASSESSMENT.md` - Reference app analysis
- `DEPLOYMENT_*.md` - Deployment guides
- `VERCEL_*.md` - Vercel deployment docs
- `SUPABASE_*.md` - Supabase setup guides

## Protected Backup Files

- `audit-report.json` - Audit results
- `LESSON_QUALITY_AUDIT.json` - Lesson quality metrics
- `enriched-lessons.json` - Enriched lesson data
- `mission_report.log` / `mission_report.txt` - Mission reports
- `*.db-backup` - Database backups
- `*.db.bak` - Database backups
- `backup_*.db` - Database backups

## Usage

### Verify Protected Files

```bash
npm run cache:verify
```

Displays a detailed report of all protected files with their status:
- ✅ Present files
- ❌ Missing files
- 📊 Breakdown by type
- 🔒 Critical files status

### Quick Protection Check

```bash
npm run cache:protect
```

Quick check that exits with status code:
- Exit 0: All protected files present
- Exit 1: Some protected files missing

### List All Protected Files

```bash
npm run cache:list
```

Shows all protected files organized by type with:
- File path
- Protection level (critical/important)
- Existence status
- File size

### Create Protection Manifest

```bash
npm run cache:manifest
```

Generates `.cache-protection-manifest.json` with:
- Complete file inventory
- File sizes and existence status
- Summary statistics
- Timestamp of verification

## Configuration Files

### .cacheignore
Specifies which files and directories should never be deleted during cache operations. Similar to `.gitignore` but for cache protection.

**Location:** `/.cacheignore`

**Key Patterns:**
```
!tests/                    # Protect entire tests directory
!archived_prep/            # Protect legacy files
!ARCHIVE/                  # Protect archive
!**/*.test.ts             # Protect all test files
!CHANDRAYAAN_*.md         # Protect CHANDRAYAAN docs
!TESTING_*.md             # Protect testing docs
```

### .cache-protection-manifest.json
Auto-generated manifest of all protected files with their current status.

**Location:** `/.cache-protection-manifest.json`

**Contents:**
```json
{
  "version": "1.0.0",
  "createdAt": "2024-01-12T...",
  "protectedFiles": [...],
  "summary": {
    "total": 45,
    "present": 45,
    "missing": 0,
    "critical": 12
  }
}
```

## Integration with Build Process

### Pre-Build Verification

Add to your CI/CD pipeline:

```bash
npm run cache:protect || exit 1
npm run build
```

This ensures all protected files exist before building.

### Post-Build Verification

After cleanup or cache operations:

```bash
npm run cache:verify
```

### Automated Checks

The protection system can be integrated into:
- Pre-commit hooks
- CI/CD pipelines
- Build scripts
- Deployment workflows

## File Organization Strategy

### Test Files
```
tests/
├── load-test-chandrayaan.ts      # Main load test
├── performance-monitor.ts         # Performance tracking
├── run-chandrayaan-test.ts        # Test runner
├── quick-start.sh / .bat          # Quick start scripts
├── README.md                      # Test documentation
└── [subdirectories]/              # Organized test suites
```

### Legacy Files
```
archived_prep/
├── AUDIT_REPORT_FULL.md           # Historical audits
├── comprehensive-*.ts             # Legacy test scripts
├── FINAL_TEST_SUMMARY.md          # Historical results
└── [other legacy files]/          # Reference materials
```

### Documentation
```
[root]/
├── CHANDRAYAAN_TEST_GUIDE.md      # Test framework guide
├── PHASE1_COMPLETION_SUMMARY.md   # Phase 1 status
├── FINAL_COMPLETION_REPORT.md     # Project completion
├── DEPLOYMENT_READY.md            # Deployment checklist
└── [other docs]/                  # Supporting documentation
```

## Best Practices

### 1. Never Delete Protected Directories
```bash
# ❌ DON'T DO THIS
rm -rf tests/
rm -rf archived_prep/

# ✅ DO THIS INSTEAD
npm run cache:verify  # Check status first
```

### 2. Verify Before Cleanup
```bash
# Always verify before any cleanup operation
npm run cache:verify
npm run cache:list

# Then proceed with cleanup
npm run clean:cache
```

### 3. Regular Backups
```bash
# Create protection manifest regularly
npm run cache:manifest

# Commit manifest to version control
git add .cache-protection-manifest.json
git commit -m "Update cache protection manifest"
```

### 4. CI/CD Integration
```yaml
# Example GitHub Actions
- name: Verify Protected Files
  run: npm run cache:protect

- name: Build
  run: npm run build

- name: Verify After Build
  run: npm run cache:verify
```

## Troubleshooting

### Missing Protected Files

If `npm run cache:protect` fails:

1. Check the report:
   ```bash
   npm run cache:verify
   ```

2. Identify missing files from the report

3. Restore from git:
   ```bash
   git checkout -- <missing-file>
   ```

4. Or restore from backup:
   ```bash
   git log --oneline -- <missing-file>
   git checkout <commit-hash> -- <missing-file>
   ```

### Adding New Protected Files

To add a new file to the protection list:

1. Edit `scripts/cache-protection.ts`
2. Add entry to `PROTECTED_FILES` array:
   ```typescript
   { path: 'path/to/file.ts', type: 'test', critical: true }
   ```
3. Update `.cacheignore` with matching pattern
4. Run verification:
   ```bash
   npm run cache:manifest
   ```

### Updating Protection Rules

Edit `.cacheignore` to add new patterns:

```
# Add new protected pattern
!path/to/new/files/**
!**/*.new-extension
```

Then verify:
```bash
npm run cache:verify
```

## Monitoring

### Regular Verification Schedule

- **Daily:** `npm run cache:protect` (quick check)
- **Weekly:** `npm run cache:verify` (detailed report)
- **Before Deploy:** `npm run cache:manifest` (create snapshot)

### Alerts

The system will alert if:
- Any critical file is missing
- Total protected size changes significantly
- New files appear in protected directories

## Summary

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run cache:protect` | Quick verification | Exit code (0/1) |
| `npm run cache:verify` | Detailed report | Full status report |
| `npm run cache:list` | List all files | Organized file list |
| `npm run cache:manifest` | Create snapshot | JSON manifest |

## Support

For issues or questions about cache protection:

1. Check `.cache-protection-manifest.json` for current status
2. Review `.cacheignore` for protection rules
3. Run `npm run cache:verify` for detailed diagnostics
4. Check `scripts/cache-protection.ts` for implementation details

---

**Last Updated:** January 12, 2026  
**Version:** 1.0.0  
**Status:** ✅ Active
