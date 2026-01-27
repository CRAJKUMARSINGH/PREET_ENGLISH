#!/bin/bash
# Pre-commit hook to verify cache protection
# Install with: cp scripts/pre-commit-cache-check.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

echo "🔒 Verifying cache protection before commit..."

# Run cache protection check
npm run cache:protect

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ COMMIT BLOCKED: Protected files are missing!"
    echo "Run 'npm run cache:verify' for details"
    echo "Restore missing files with: git checkout -- <file>"
    exit 1
fi

echo "✅ Cache protection verified - proceeding with commit"
exit 0
