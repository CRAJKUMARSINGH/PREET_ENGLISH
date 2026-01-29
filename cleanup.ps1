Write-Host "Starting sanitization cleanup..." -ForegroundColor Cyan

# List of specific files to delete
$FILES = @(
    "server/routes.js",
    "server/logger.js",
    "server/index.js",
    "scripts/manual-create-table.ts",
    "tests/test-results-template.md"
)

# List of directories to clean up
$DIRS = @(
    "ARCHIVE/LEGACY_REPORTS"
)

Write-Host "`n--- Deleting Files ---" -ForegroundColor Yellow
foreach ($file in $FILES) {
    if (Test-Path $file) {
        Write-Host "Removing $file..."
        # Try git rm, fallback to Remove-Item
        try {
            git rm -f $file 2>$null
            if ($LASTEXITCODE -ne 0) { throw "git rm failed" }
        } catch {
            Remove-Item -Path $file -Force -ErrorAction SilentlyContinue
        }
    } else {
        Write-Host "⚠️  File $file not found, skipping..." -ForegroundColor DarkGray
    }
}

Write-Host "`n--- Deleting Directories ---" -ForegroundColor Yellow
foreach ($dir in $DIRS) {
    if (Test-Path $dir) {
        Write-Host "Removing directory $dir..."
        try {
            git rm -r -f $dir 2>$null
            if ($LASTEXITCODE -ne 0) { throw "git rm failed" }
        } catch {
            Remove-Item -Path $dir -Recurse -Force -ErrorAction SilentlyContinue
        }
    } else {
        Write-Host "⚠️  Directory $dir not found, skipping..." -ForegroundColor DarkGray
    }
}

Write-Host "`n--- Optimizing Dependencies ---" -ForegroundColor Yellow
Write-Host "Running npm prune to remove unused packages..."
npm prune

Write-Host "`n✅ Cleanup complete! Deleted files are staged for commit." -ForegroundColor Green
Write-Host "Run 'git commit -m \"chore: cleanup legacy files and build artifacts\"' to finalize."
