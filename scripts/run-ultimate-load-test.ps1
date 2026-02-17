# Ultimate Load Test Runner (PowerShell)
# Simulates 16,000 concurrent users (1000 beginner + 15000 advanced)

Write-Host "🚀 ULTIMATE LOAD TEST - BIGUL2 STYLE" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host "📊 Configuration:" -ForegroundColor Cyan
Write-Host "   - 1,000 Beginner Users (99% content coverage)" -ForegroundColor White
Write-Host "   - 15,000 Advanced Users (99% content coverage)" -ForegroundColor White
Write-Host "   - Total: 16,000 concurrent users" -ForegroundColor White
Write-Host "   - Cache deletion: Every 5 seconds" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  WARNING: This will create significant database load!" -ForegroundColor Yellow
Write-Host "   Press Ctrl+C to cancel, or wait 5 seconds to continue..." -ForegroundColor Yellow
Write-Host ""

Start-Sleep -Seconds 5

Write-Host "🔥 Starting load test..." -ForegroundColor Green
Write-Host ""

# Run with garbage collection enabled
& node --expose-gc -r tsx/register scripts/ultimate-load-test.ts

Write-Host ""
Write-Host "✅ Load test complete!" -ForegroundColor Green
