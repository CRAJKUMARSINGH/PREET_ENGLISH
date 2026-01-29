#!/bin/bash
echo "Starting sanitization cleanup..."

# List of specific files to delete (Relative to repo root)
FILES=(
    "server/routes.js"
    "server/logger.js"
    "server/index.js"
    "scripts/manual-create-table.ts"
    "tests/test-results-template.md"
)

# List of directories to clean up
DIRS=(
    "ARCHIVE/LEGACY_REPORTS"
)

echo "--- Deleting Files ---"
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "Removing $file..."
        # Try git rm first to stage the deletion, fallback to rm if not tracked
        git rm -f "$file" 2>/dev/null || rm -f "$file"
    else
        echo "⚠️  File $file not found, skipping..."
    fi
done

echo ""
echo "--- Deleting Directories ---"
for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "Removing directory $dir..."
        git rm -rf "$dir" 2>/dev/null || rm -rf "$dir"
    else
        echo "⚠️  Directory $dir not found, skipping..."
    fi
done

echo ""
echo "--- Optimizing Dependencies ---"
echo "Running npm prune to remove unused packages..."
npm prune

echo ""
echo "✅ Cleanup complete! Deleted files are staged for commit."
echo "Run 'git commit -m \"chore: cleanup legacy files and build artifacts\"' to finalize."
