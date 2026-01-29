#!/bin/bash
# Test Environment Initialization Script
# Prepares the application for real-world load testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[TEST-INIT]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[TEST-INIT]${NC} $1"
}

error() {
    echo -e "${RED}[TEST-INIT]${NC} $1"
}

info() {
    echo -e "${BLUE}[TEST-INIT]${NC} $1"
}

# Function to wait for database
wait_for_database() {
    log "Waiting for database to be ready..."
    
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if [ -n "$DATABASE_URL" ]; then
            # Extract database details
            DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
            DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
            DB_USER=$(echo $DATABASE_URL | sed -n 's/.*\/\/\([^:]*\):.*/\1/p')
            DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
            
            if pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t 5; then
                log "✓ Database is ready"
                return 0
            fi
        else
            warn "DATABASE_URL not set, assuming SQLite"
            return 0
        fi
        
        info "Database not ready, attempt $attempt/$max_attempts"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    error "Database failed to become ready after $max_attempts attempts"
    return 1
}

# Function to initialize database schema
init_database() {
    log "Initializing database schema..."
    
    if npm run db:push; then
        log "✓ Database schema initialized"
    else
        error "Failed to initialize database schema"
        return 1
    fi
}

# Function to seed test data
seed_test_data() {
    log "Seeding test data for load testing..."
    
    # Seed test users
    if node -e "
        const { TestUserOrchestrator } = require('./scripts/seed-test-users.ts');
        const orchestrator = new TestUserOrchestrator();
        orchestrator.seedUsers().then(result => {
            if (result.success) {
                console.log('✓ Test users seeded successfully');
                process.exit(0);
            } else {
                console.error('✗ Failed to seed test users');
                process.exit(1);
            }
        }).catch(err => {
            console.error('✗ Error seeding test users:', err);
            process.exit(1);
        });
    "; then
        log "✓ Test users seeded"
    else
        warn "Failed to seed test users (continuing anyway)"
    fi
    
    # Seed basic lessons if needed
    if [ -f "scripts/seed-real-data.ts" ]; then
        if tsx scripts/seed-real-data.ts; then
            log "✓ Basic lesson data seeded"
        else
            warn "Failed to seed lesson data (continuing anyway)"
        fi
    fi
}

# Function to configure test environment
configure_test_env() {
    log "Configuring test environment..."
    
    # Set test-specific environment variables
    export NODE_ENV=test
    export TEST_LOAD_PATTERN=true
    export LOG_LEVEL=${LOG_LEVEL:-info}
    
    # Create necessary directories
    mkdir -p /app/logs /app/test-results /app/screenshots
    
    # Set permissions
    chmod 755 /app/logs /app/test-results /app/screenshots
    
    log "✓ Test environment configured"
}

# Function to start monitoring
start_monitoring() {
    log "Starting performance monitoring..."
    
    # Start background monitoring script
    if [ -f "/app/scripts/performance-monitor.ts" ]; then
        nohup tsx /app/scripts/performance-monitor.ts > /app/logs/monitor.log 2>&1 &
        echo $! > /app/monitor.pid
        log "✓ Performance monitoring started (PID: $(cat /app/monitor.pid))"
    else
        warn "Performance monitor script not found"
    fi
}

# Function to validate test readiness
validate_readiness() {
    log "Validating test readiness..."
    
    local checks_passed=0
    local total_checks=4
    
    # Check 1: Application responds
    if curl -f -s --max-time 10 "http://localhost:5000/api/health" > /dev/null; then
        log "✓ Application health check passed"
        checks_passed=$((checks_passed + 1))
    else
        error "✗ Application health check failed"
    fi
    
    # Check 2: Authentication system
    if curl -f -s --max-time 10 "http://localhost:5000/api/auth/status" > /dev/null; then
        log "✓ Authentication system check passed"
        checks_passed=$((checks_passed + 1))
    else
        error "✗ Authentication system check failed"
    fi
    
    # Check 3: Database connectivity
    if node -e "
        const { db } = require('./server/db.js');
        const { users } = require('./shared/schema.js');
        db.select().from(users).limit(1).then(() => {
            console.log('✓ Database connectivity check passed');
            process.exit(0);
        }).catch(err => {
            console.error('✗ Database connectivity check failed:', err.message);
            process.exit(1);
        });
    "; then
        checks_passed=$((checks_passed + 1))
    fi
    
    # Check 4: Test users available
    if node -e "
        const { TestUserOrchestrator } = require('./scripts/seed-test-users.ts');
        const orchestrator = new TestUserOrchestrator();
        orchestrator.verifyTestUsers().then(result => {
            if (result.count > 0) {
                console.log('✓ Test users available:', result.count);
                process.exit(0);
            } else {
                console.error('✗ No test users found');
                process.exit(1);
            }
        }).catch(err => {
            console.error('✗ Test user verification failed:', err.message);
            process.exit(1);
        });
    "; then
        checks_passed=$((checks_passed + 1))
    fi
    
    if [ $checks_passed -eq $total_checks ]; then
        log "🎯 All readiness checks passed ($checks_passed/$total_checks)"
        return 0
    else
        error "❌ Readiness validation failed ($checks_passed/$total_checks checks passed)"
        return 1
    fi
}

# Function to start the application
start_application() {
    log "Starting PREET_ENGLISH application..."
    
    # Start the application with production settings
    if [ "$NODE_ENV" = "production" ]; then
        exec node dist/index.cjs
    else
        exec tsx server/index.ts
    fi
}

# Main initialization routine
main() {
    log "🚀 Initializing PREET_ENGLISH test environment"
    
    # Configure environment
    configure_test_env
    
    # Wait for dependencies
    wait_for_database || exit 1
    
    # Initialize database
    init_database || exit 1
    
    # Seed test data
    seed_test_data
    
    # Start monitoring
    start_monitoring
    
    # Give the application a moment to start
    sleep 5
    
    # Start application in background for validation
    start_application &
    APP_PID=$!
    
    # Wait for application to be ready
    sleep 10
    
    # Validate readiness
    if validate_readiness; then
        log "🎯 Test environment initialization completed successfully"
        log "Application PID: $APP_PID"
        log "Ready for load testing!"
        
        # Keep the application running
        wait $APP_PID
    else
        error "❌ Test environment initialization failed"
        kill $APP_PID 2>/dev/null || true
        exit 1
    fi
}

# Handle signals for graceful shutdown
cleanup() {
    log "Shutting down test environment..."
    
    # Stop monitoring
    if [ -f "/app/monitor.pid" ]; then
        kill $(cat /app/monitor.pid) 2>/dev/null || true
        rm -f /app/monitor.pid
    fi
    
    # Stop application
    if [ -n "$APP_PID" ]; then
        kill $APP_PID 2>/dev/null || true
    fi
    
    log "Test environment shutdown complete"
    exit 0
}

trap cleanup SIGTERM SIGINT

# Run main function
main "$@"