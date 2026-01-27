@echo off
REM CHANDRAYAAN PRECISION LOAD TEST - QUICK START SCRIPT (Windows)
REM This script automates the entire test process

setlocal enabledelayedexpansion

echo.
echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║                  🎯 CHANDRAYAAN PRECISION LOAD TEST 🎯                     ║
echo ║                    Quick Start Script v1.0 (Windows)                       ║
echo ╚════════════════════════════════════════════════════════════════════════════╝
echo.

REM Check prerequisites
echo 📋 Checking prerequisites...

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js not found. Please install Node.js 18+
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ npm not found
    exit /b 1
)
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✓ npm %NPM_VERSION%

REM Check if dependencies are installed
if not exist "node_modules" (
    echo ⚠ Dependencies not installed. Installing...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ✗ Failed to install dependencies
        exit /b 1
    )
)
echo ✓ Dependencies installed

REM Check environment file
if not exist ".env.local" (
    echo ⚠ .env.local not found. Creating from .env.example...
    if exist ".env.example" (
        copy .env.example .env.local >nul
        echo ⚠ Please update .env.local with your configuration
    ) else (
        echo ✗ .env.example not found
        exit /b 1
    )
)
echo ✓ Environment configured

echo.
echo 🔧 Test Configuration:
echo    • Total Users: 1,500 (500 per category)
echo    • Content Coverage: 90%%
echo    • Concurrency: 50 users at a time
echo    • Expected Duration: 5-10 minutes
echo.

REM Ask user for test mode
echo 📌 Select test mode:
echo    1) Full Test (with server management)
echo    2) Load Test Only (server must be running)
echo    3) Performance Monitor Only
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting Full Test Suite...
    echo.
    call npm run test:chandrayaan:full
) else if "%choice%"=="2" (
    echo.
    echo ⚠ Make sure the server is running!
    echo    Run 'npm run dev' in another terminal
    echo.
    pause
    echo.
    echo 🚀 Starting Load Test...
    echo.
    call npm run test:chandrayaan
) else if "%choice%"=="3" (
    echo.
    echo 🚀 Starting Performance Monitor...
    echo.
    call npm run test:performance
) else (
    echo ✗ Invalid choice
    exit /b 1
)

echo.
echo ✓ Test completed!
echo.
echo 📊 Next Steps:
echo    1. Review the test results above
echo    2. Check for any failures or warnings
echo    3. Identify performance bottlenecks
echo    4. Implement optimizations if needed
echo    5. Re-run tests to verify improvements
echo.
echo 📖 For detailed information, see CHANDRAYAAN_TEST_GUIDE.md
echo.

pause
