#!/bin/bash
# Ultimate Load Test Runner
# Simulates 16,000 concurrent users (1000 beginner + 15000 advanced)

echo "🚀 ULTIMATE LOAD TEST - BIGUL2 STYLE"
echo "═══════════════════════════════════════════════════════════════"
echo "📊 Configuration:"
echo "   - 1,000 Beginner Users (99% content coverage)"
echo "   - 15,000 Advanced Users (99% content coverage)"
echo "   - Total: 16,000 concurrent users"
echo "   - Cache deletion: Every 5 seconds"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "⚠️  WARNING: This will create significant database load!"
echo "   Press Ctrl+C to cancel, or wait 5 seconds to continue..."
echo ""

sleep 5

echo "🔥 Starting load test..."
echo ""

# Run with garbage collection enabled
node --expose-gc -r tsx/register scripts/ultimate-load-test.ts

echo ""
echo "✅ Load test complete!"
