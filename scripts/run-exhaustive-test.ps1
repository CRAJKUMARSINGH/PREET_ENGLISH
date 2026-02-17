# Exhaustive System Test Runner (PowerShell)

Write-Host "`n🔬 EXHAUSTIVE SYSTEM TESTING FRAMEWORK" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if server is running
Write-Host "🔍 Checking if server is running..." -NoNewline
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host " ✅ Server is running" -ForegroundColor Green
} catch {
    Write-Host " ❌ Server is not running" -ForegroundColor Red
    Write-Host "`nPlease start the server first:" -ForegroundColor Yellow
    Write-Host "   npm run dev" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Run exhaustive test
Write-Host "`n🚀 Starting exhaustive system test..." -ForegroundColor Green
Write-Host "   This will test:" -ForegroundColor White
Write-Host "   • All file system components" -ForegroundColor White
Write-Host "   • All React components" -ForegroundColor White
Write-Host "   • All API routes" -ForegroundColor White
Write-Host "   • All lessons and data" -ForegroundColor White
Write-Host "   • 251 simulated users (125 Beginner + 75 Intermediate + 51 Advanced)" -ForegroundColor White
Write-Host "   • 90% lesson coverage per user" -ForegroundColor White
Write-Host "`nThis may take 5-10 minutes...`n" -ForegroundColor Yellow

npx tsx scripts/exhaustive-system-test.ts

# Check exit code
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Exhaustive test completed successfully!" -ForegroundColor Green
    Write-Host "`n📊 Review the detailed report:" -ForegroundColor Cyan
    Write-Host "   exhaustive-test-report.json" -ForegroundColor White
    
    Write-Host "`n🔧 To automatically fix issues:" -ForegroundColor Cyan
    Write-Host "   npx tsx scripts/auto-fix-issues.ts" -ForegroundColor White
} else {
    Write-Host "`n❌ Exhaustive test found issues" -ForegroundColor Red
    Write-Host "`n📊 Review the detailed report:" -ForegroundColor Cyan
    Write-Host "   exhaustive-test-report.json" -ForegroundColor White
    
    Write-Host "`n🔧 Run auto-fix to attempt repairs:" -ForegroundColor Yellow
    Write-Host "   npx tsx scripts/auto-fix-issues.ts" -ForegroundColor White
}

Write-Host ""
