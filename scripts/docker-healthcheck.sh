#!/bin/bash
# Docker Health Check Script for Test Environment
# Validates application readiness for load testing

set -e

# Configuration
BASE_URL="http://localhost:5000"
TIMEOUT=10
MAX_RETRIES=3

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[HEALTHCHECK]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[HEALTHCHECK]${NC} $1"
}

error() {
    echo -e "${RED}[HEALTHCHECK]${NC} $1"
}

# Function to check HTTP endpoint
check_endpoint() {
    local endpoint=$1
    local expected_status=${2:-200}
    local retry_count=0
    
    while [ $retry_count -lt $MAX_RETRIES ]; do
        if curl -f -s --max-time $TIMEOUT "$BASE_URL$endpoint" > /dev/null 2>&1; then
            log "✓ $endpoint is healthy"
            return 0
        fi
        
        retry_count=$((retry_count + 1))
        if [ $retry_count -lt $MAX_RETRIES ]; then
            warn "Retry $retry_count/$MAX_RETRIES for $endpoint"
            sleep 2
        fi
    done
    
    error "✗ $endpoint failed after $MAX_RETRIES attempts"
    return 1
}

# Function to check database connectivity
check_database() {
    log "Checking database connectivity..."
    
    if [ -n "$DATABASE_URL" ]; then
        # Extract database details from URL
        DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
        DB_PORT=$(echo $DATABASE_URL | sed -n 's/.*:\([0-9]*\)\/.*/\1/p')
        DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
        DB_USER=$(echo $DATABASE_URL | sed -n 's/.*\/\/\([^:]*\):.*/\1/p')
        
        if command -v pg_isready > /dev/null 2>&1; then
            if pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t $TIMEOUT; then
                log "✓ Database is ready"
                return 0
            else
                error "✗ Database is not ready"
                return 1
            fi
        else
            warn "pg_isready not available, skipping database check"
        fi
    else
        warn "DATABASE_URL not set, skipping database check"
    fi
    
    return 0
}

# Function to check memory usage
check_memory() {
    log "Checking memory usage..."
    
    # Get memory info
    MEMORY_INFO=$(cat /proc/meminfo)
    TOTAL_MEM=$(echo "$MEMORY_INFO" | grep MemTotal | awk '{print $2}')
    AVAILABLE_MEM=$(echo "$MEMORY_INFO" | grep MemAvailable | awk '{print $2}')
    
    if [ -n "$TOTAL_MEM" ] && [ -n "$AVAILABLE_MEM" ]; then
        MEMORY_USAGE_PERCENT=$(( (TOTAL_MEM - AVAILABLE_MEM) * 100 / TOTAL_MEM ))
        
        if [ $MEMORY_USAGE_PERCENT -lt 90 ]; then
            log "✓ Memory usage: ${MEMORY_USAGE_PERCENT}%"
            return 0
        else
            error "✗ High memory usage: ${MEMORY_USAGE_PERCENT}%"
            return 1
        fi
    else
        warn "Could not determine memory usage"
        return 0
    fi
}

# Function to check disk space
check_disk() {
    log "Checking disk space..."
    
    DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
    
    if [ "$DISK_USAGE" -lt 90 ]; then
        log "✓ Disk usage: ${DISK_USAGE}%"
        return 0
    else
        error "✗ High disk usage: ${DISK_USAGE}%"
        return 1
    fi
}

# Function to check process health
check_process() {
    log "Checking Node.js process..."
    
    if pgrep -f "node.*server" > /dev/null; then
        log "✓ Node.js process is running"
        return 0
    else
        error "✗ Node.js process not found"
        return 1
    fi
}

# Main health check routine
main() {
    log "Starting health check for PREET_ENGLISH test environment"
    
    local exit_code=0
    
    # Check critical endpoints
    check_endpoint "/api/health" || exit_code=1
    check_endpoint "/api/auth/status" || exit_code=1
    
    # Check system resources
    check_memory || exit_code=1
    check_disk || exit_code=1
    
    # Check processes
    check_process || exit_code=1
    
    # Check database (non-critical for health check)
    check_database || warn "Database check failed (non-critical)"
    
    if [ $exit_code -eq 0 ]; then
        log "🎯 Health check PASSED - Application ready for load testing"
    else
        error "❌ Health check FAILED - Application not ready"
    fi
    
    exit $exit_code
}

# Run main function
main "$@"