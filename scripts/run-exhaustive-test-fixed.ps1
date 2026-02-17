# EXHAUSTIVE SYSTEM TEST - FIXED VERSION
# Runs with proper rate limit configuration

Write-Host "🔬 EXHAUSTIVE SYSTEM TESTING - FIXED VERSION" -ForegroundColor Cyan
Write-Host ("=" * 80) -ForegroundColor Cyan
Write-Host ""

# Set environment variable to disable rate limiting
$env:TEST_LOAD_PATTERN = "true"
$env:NODE_ENV = "test"

Write-Host "⚙️  Configuration:" -ForegroundColor Yellow
Write-Host "   TEST_LOAD_PATTERN: $env:TEST_LOAD_PATTERN"
Write-Host "   NODE_ENV: $env:NODE_ENV"
Write-Host "   Rate Limiting: DISABLED"
Write-Host ""

# Check if server is running
Write-Host "🔍 Checking server health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✅ Server is running" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Server is not running at http://localhost:5000" -ForegroundColor Red
    Write-Host "   Please start the server first: npm run dev" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Run the exhaustive test
Write-Host "🚀 Starting exhaustive system test..." -ForegroundColor Cyan
Write-Host ""

npx tsx scripts/exhaustive-system-test.ts

$exitCode = $LASTEXITCODE

Write-Host ""
Write-Host ("=" * 80) -ForegroundColor Cyan

if ($exitCode -eq 0) {
    Write-Host "🏆 TEST COMPLETED SUCCESSFULLY!" -ForegroundColor Green
} else {
    Write-Host "⚠️  TEST COMPLETED WITH ISSUES" -ForegroundColor Yellow
    Write-Host "   Review exhaustive-test-report.json for details" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📄 Reports generated:" -ForegroundColor Cyan
Write-Host "   - exhaustive-test-report.json" -ForegroundColor White
Write-Host ""

exit $exitCode
