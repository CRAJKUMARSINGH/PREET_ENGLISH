@echo off
REM Pre-commit hook to verify cache protection (Windows)
REM Install with: copy scripts\pre-commit-cache-check.bat .git\hooks\pre-commit

echo 🔒 Verifying cache protection before commit...

REM Run cache protection check
call npm run cache:protect

if errorlevel 1 (
    echo.
    echo ❌ COMMIT BLOCKED: Protected files are missing!
    echo Run 'npm run cache:verify' for details
    echo Restore missing files with: git checkout -- ^<file^>
    exit /b 1
)

echo ✅ Cache protection verified - proceeding with commit
exit /b 0
