#!/bin/bash

# BIGUL2 Load Test Runner
# Comprehensive load testing with cache management

echo "🤖 BIGUL2 Advanced Load Testing System"
echo "========================================"
echo ""

# Check if server is running
echo "🔍 Checking if server is running..."
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo "✅ Server is running"
else
    echo "❌ Server is not running. Please start the server first:"
    echo "   npm run dev"
    echo ""
    exit 1
fi

# Check dependencies
echo ""
echo "📦 Checking dependencies..."
if ! command -v tsx &> /dev/null; then
    echo "❌ tsx not found. Installing..."
    npm install -g tsx
fi

# Warm up cache before test
echo ""
echo "🔥 Warming up cache..."
curl -X POST http://localhost:5000/api/admin/cache/warmup -H "Content-Type: application/json" 2>/dev/null
echo "✅ Cache warmed up"

# Run the load test
echo ""
echo "🚀 Starting BIGUL2 load test..."
echo "   Phase 1: 1000 Beginner users"
echo "   Phase 2: 1500 Advanced users (after 15s)"
echo "   Cache clearing: Every 5 seconds"
echo ""
echo "Press Ctrl+C to stop the test"
echo ""

# Run the test
tsx scripts/bigul2-load-test.ts

# Check exit code
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Load test completed successfully!"
    echo ""
    echo "📊 To view cache statistics:"
    echo "   curl http://localhost:5000/api/admin/cache/stats"
else
    echo ""
    echo "❌ Load test failed or was interrupted"
fi
