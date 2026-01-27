#!/bin/bash

# CHANDRAYAAN PRECISION LOAD TEST - QUICK START SCRIPT
# This script automates the entire test process

set -e

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                  🎯 CHANDRAYAAN PRECISION LOAD TEST 🎯                     ║"
echo "║                         Quick Start Script v1.0                            ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠ Dependencies not installed. Installing...${NC}"
    npm install
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Check environment file
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠ .env.local not found. Creating from .env.example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${YELLOW}⚠ Please update .env.local with your configuration${NC}"
    else
        echo -e "${RED}✗ .env.example not found${NC}"
        exit 1
    fi
fi
echo -e "${GREEN}✓ Environment configured${NC}"

echo ""
echo -e "${BLUE}🔧 Test Configuration:${NC}"
echo "   • Total Users: 1,500 (500 per category)"
echo "   • Content Coverage: 90%"
echo "   • Concurrency: 50 users at a time"
echo "   • Expected Duration: 5-10 minutes"
echo ""

# Ask user for test mode
echo -e "${BLUE}📌 Select test mode:${NC}"
echo "   1) Full Test (with server management)"
echo "   2) Load Test Only (server must be running)"
echo "   3) Performance Monitor Only"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🚀 Starting Full Test Suite...${NC}"
        echo ""
        npm run test:chandrayaan:full
        ;;
    2)
        echo ""
        echo -e "${BLUE}⚠ Make sure the server is running!${NC}"
        echo "   Run 'npm run dev' in another terminal"
        echo ""
        read -p "Press Enter when server is ready..."
        echo ""
        echo -e "${BLUE}🚀 Starting Load Test...${NC}"
        echo ""
        npm run test:chandrayaan
        ;;
    3)
        echo ""
        echo -e "${BLUE}🚀 Starting Performance Monitor...${NC}"
        echo ""
        npm run test:performance
        ;;
    *)
        echo -e "${RED}✗ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✓ Test completed!${NC}"
echo ""
echo -e "${BLUE}📊 Next Steps:${NC}"
echo "   1. Review the test results above"
echo "   2. Check for any failures or warnings"
echo "   3. Identify performance bottlenecks"
echo "   4. Implement optimizations if needed"
echo "   5. Re-run tests to verify improvements"
echo ""
echo -e "${BLUE}📖 For detailed information, see CHANDRAYAAN_TEST_GUIDE.md${NC}"
echo ""
