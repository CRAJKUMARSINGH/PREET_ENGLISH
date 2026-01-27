# Cache Protection System - Setup Guide

## Quick Start

The cache protection system is already configured and ready to use. No additional setup is required for basic functionality.

### Verify Installation

```bash
npm run cache:verify
```

Expected output:
```
✅ Protected Files Present: 41/41
📦 Total Protected Size: 320.37 KB
✅ All protected files are present!
🔒 CRITICAL FILES: 13/13 present
```

## Available Commands

### 1. Verify Protected Files (Detailed Report)
```bash
npm run cache:verify
```
- Shows all protected files with status
- Displays file sizes and types
- Reports any missing files
- Checks critical files status

### 2. Quick Protection Check
```bash
npm run cache:protect
```
- Fast verification (exit code based)
- Exit 0: All files present
- Exit 1: Files missing
- Useful for CI/CD pipelines

### 3. List All Protected Files
```bash
npm run cache:list
```
- Organized by type (test, legacy, documentation, backup)
- Shows existence status and file size
- Useful for understanding what's protected

### 4. Create Protection Manifest
```bash
npm run cache:manifest
```
- Generates `.cache-protection-manifest.json`
- Snapshot of current protection status
- Useful for version control and auditing

## Configuration Files

### .cacheignore
Specifies files and directories that should never be deleted.

**Location:** `/.cacheignore`

**Key Sections:**
- Protected directories (tests/, archived_prep/, ARCHIVE/, etc.)
- Protected file patterns (*.test.ts, CHANDRAYAAN_*.md, etc.)
- Database backups and reports

**To Add New Protected Files:**
1. Edit `.cacheignore`
2. Add pattern: `!path/to/file` or `!**/*.pattern`
3. Run: `npm run cache:manifest`

### .gitignore
Updated to preserve protected directories in version control.

**Key Additions:**
- `!tests/` - Protect test framework
- `!archived_prep/` - Protect legacy files
- `!ARCHIVE/` - Protect historical versions
- `!CHANDRAYAAN_*.md` - Protect test documentation
- `!.cacheignore` - Protect cache rules

## Integration with Development Workflow

### Pre-Commit Hook (Optional)

Automatically verify cache protection before commits.

#### On macOS/Linux:
```bash
cp scripts/pre-commit-cache-check.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

#### On Windows:
```cmd
copy scripts\pre-commit-cache-check.bat .git\hooks\pre-commit
```

**What It Does:**
- Runs before each commit
- Verifies all protected files exist
- Blocks commit if files are missing
- Provides helpful error messages

### CI/CD Integration

#### GitHub Actions Example:
```yaml
name: Cache Protection Check

on: [push, pull_request]

jobs:
  cache-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - name: Verify Cache Protection
        run: npm run cache:protect
      - name: Build
        run: npm run build
      - name: Verify After Build
        run: npm run cache:verify
```

#### GitLab CI Example:
```yaml
cache-protection:
  stage: test
  script:
    - npm install
    - npm run cache:protect
    - npm run build
    - npm run cache:verify
  only:
    - merge_requests
    - main
```

### Build Script Integration

Add to your build process:

```bash
#!/bin/bash
# build.sh

echo "Verifying cache protection..."
npm run cache:protect || exit 1

echo "Building application..."
npm run build

echo "Verifying cache after build..."
npm run cache:verify

echo "✅ Build complete with cache protection verified"
```

## Monitoring & Maintenance

### Daily Checks
```bash
# Quick verification
npm run cache:protect
```

### Weekly Audits
```bash
# Detailed report
npm run cache:verify

# Create snapshot
npm run cache:manifest
```

### Before Deployment
```bash
# Full verification
npm run cache:verify

# Create deployment snapshot
npm run cache:manifest

# Commit manifest
git add .cache-protection-manifest.json
git commit -m "Update cache protection manifest before deployment"
```

## Troubleshooting

### Missing Protected Files

**Problem:** `npm run cache:protect` fails

**Solution:**
1. Check what's missing:
   ```bash
   npm run cache:verify
   ```

2. Restore from git:
   ```bash
   git checkout -- <missing-file>
   ```

3. Or restore from recent commit:
   ```bash
   git log --oneline -- <missing-file>
   git checkout <commit-hash> -- <missing-file>
   ```

### Adding New Protected Files

**To protect a new file:**

1. Edit `scripts/cache-protection.ts`
2. Add to `PROTECTED_FILES` array:
   ```typescript
   { path: 'path/to/new-file.ts', type: 'test', critical: true }
   ```

3. Update `.cacheignore`:
   ```
   !path/to/new-file.ts
   ```

4. Verify:
   ```bash
   npm run cache:manifest
   npm run cache:verify
   ```

### Updating Protection Rules

**To change protection patterns:**

1. Edit `.cacheignore`
2. Add or modify patterns:
   ```
   !new/pattern/**
   !**/*.new-extension
   ```

3. Verify changes:
   ```bash
   npm run cache:verify
   ```

## File Organization

### Protected Directories Structure

```
project-root/
├── tests/                          # 🔴 CRITICAL
│   ├── load-test-chandrayaan.ts
│   ├── performance-monitor.ts
│   ├── run-chandrayaan-test.ts
│   ├── quick-start.sh / .bat
│   └── README.md
│
├── archived_prep/                  # 🟡 IMPORTANT
│   ├── AUDIT_REPORT_FULL.md
│   ├── comprehensive-*.ts
│   └── [legacy files]
│
├── ARCHIVE/                        # 🟡 IMPORTANT
│   └── [historical versions]
│
├── action-plan/ & ACTION_PLAN/     # 🟡 IMPORTANT
│   └── [project planning]
│
└── [root-level docs]               # 🔴 CRITICAL
    ├── CHANDRAYAAN_TEST_GUIDE.md
    ├── PHASE1_COMPLETION_SUMMARY.md
    ├── FINAL_COMPLETION_REPORT.md
    └── [other protected docs]
```

## Best Practices

### 1. Regular Verification
```bash
# Add to your daily workflow
npm run cache:protect
```

### 2. Pre-Deployment Checks
```bash
# Before any deployment
npm run cache:verify
npm run cache:manifest
```

### 3. Version Control
```bash
# Commit protection manifest
git add .cache-protection-manifest.json
git commit -m "Update cache protection manifest"
```

### 4. Documentation
- Keep `.cacheignore` updated
- Document new protected files
- Update this guide when adding protections

### 5. Team Communication
- Share this guide with team members
- Explain why files are protected
- Provide troubleshooting steps

## Advanced Usage

### Custom Verification Script

Create `scripts/custom-cache-check.ts`:

```typescript
import { execSync } from 'child_process';

// Run verification
const result = execSync('npm run cache:verify', { encoding: 'utf-8' });

// Parse results
if (result.includes('MISSING')) {
  console.error('❌ Cache protection failed');
  process.exit(1);
}

console.log('✅ Cache protection passed');
```

### Automated Alerts

Set up notifications for missing files:

```bash
# In your monitoring system
npm run cache:verify | grep -i "missing" && send_alert
```

### Backup Strategy

Combine with backup system:

```bash
# Backup protected files
npm run cache:manifest
cp .cache-protection-manifest.json backups/manifest-$(date +%Y%m%d).json
```

## Support & Documentation

- **Main Guide:** `CACHE_PROTECTION_GUIDE.md`
- **Setup Guide:** `CACHE_PROTECTION_SETUP.md` (this file)
- **Script:** `scripts/cache-protection.ts`
- **Rules:** `.cacheignore`
- **Manifest:** `.cache-protection-manifest.json`

## Summary

| Task | Command | Frequency |
|------|---------|-----------|
| Quick check | `npm run cache:protect` | Daily |
| Detailed report | `npm run cache:verify` | Weekly |
| List files | `npm run cache:list` | As needed |
| Create snapshot | `npm run cache:manifest` | Before deploy |

---

**Last Updated:** January 12, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready to Use
