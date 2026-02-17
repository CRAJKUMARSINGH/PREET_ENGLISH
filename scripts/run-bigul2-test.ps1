# BIGUL2 Load Test Runner (PowerShell)
# Comprehensive load testing with cache management

Write-Host "`n🤖 BIGUL2 Advanced Load Testing System" -ForegroundColor Cyan
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

# Warm up cache before test
Write-Host "`n🔥 Warming up cache..." -NoNewline
try {
    Invoke-WebRequest -Uri "http://localhost:5000/api/admin/cache/warmup" -Method POST -ContentType "application/json" -UseBasicParsing -ErrorAction Stop | Out-Null
    Write-Host " ✅ Cache warmed up" -ForegroundColor Green
} catch {
    Write-Host " ⚠️  Cache warmup failed (continuing anyway)" -ForegroundColor Yellow
}

# Run the load test
Write-Host "`n🚀 Starting BIGUL2 load test..." -ForegroundColor Green
Write-Host "   Phase 1: 1000 Beginner users" -ForegroundColor White
Write-Host "   Phase 2: 1500 Advanced users (after 15s)" -ForegroundColor White
Write-Host "   Cache clearing: Every 5 seconds" -ForegroundColor White
Write-Host "`nPress Ctrl+C to stop the test`n" -ForegroundColor Yellow

# Run the test
npx tsx scripts/bigul2-load-test.ts

# Check exit code
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Load test completed successfully!" -ForegroundColor Green
    Write-Host "`n📊 To view cache statistics:" -ForegroundColor Cyan
    Write-Host "   curl http://localhost:5000/api/admin/cache/stats" -ForegroundColor White
} else {
    Write-Host "`n❌ Load test failed or was interrupted" -ForegroundColor Red
}
