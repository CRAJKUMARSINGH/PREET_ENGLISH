# Test Fix Plan - Path to 95%+ Pass Rate

## Current Status
- **Pass Rate**: 78% (498 tests passing)
- **Target**: 95%+ (640+ tests passing)
- **Main Issues Identified**:
  1. Import/module resolution errors
  2. Component export/import mismatches
  3. Missing mocks for server-side modules

## Critical Issues Found

### Issue 1: Module Resolution - logger.js
**Location**: `server/middleware/monitoring.ts:2`
**Error**: `Cannot find module '../logger.js'`
**Root Cause**: Import uses `.js` extension but file is `.ts`
**Impact**: Blocks all integration tests that import server routes

**Fix**:
```typescript
// Change from:
import logger from '../logger.js';
// To:
import logger from '../logger';
```

### Issue 2: Component Import Errors - LessonCard
**Location**: `tests/components/LessonCard.test.tsx`
**Error**: `Element type is invalid: expected a string... but got: undefined`
**Root Cause**: Component not properly exported or import path incorrect
**Impact**: 21 test failures

**Fix Options**:
1. Verify `@/components/LessonCard` exists and is properly exported
2. Check if it should be `@/components/LessonCard.tsx` or named export
3. Add proper mock if component has complex dependencies

### Issue 3: QueryClientProvider Import
**Location**: Multiple component tests
**Error**: Component rendering failures
**Root Cause**: Missing or incorrect QueryClientProvider setup

**Fix**: Standardize test wrapper in `tests/setup.ts`

## Systematic Fix Strategy

### Phase 1: Module Resolution (30 min)
1. Fix all `.js` extension imports in TypeScript files
2. Update jest.config.cjs to handle module extensions properly
3. Create mock for server logger in tests

### Phase 2: Component Test Fixes (1-2 hours)
1. Audit all component imports in tests
2. Create standardized test utilities for common wrappers
3. Fix QueryClientProvider setup
4. Add missing component mocks

### Phase 3: Integration Test Fixes (1 hour)
1. Mock server dependencies properly
2. Fix database connection mocks
3. Ensure proper cleanup between tests

### Phase 4: Verification (30 min)
1. Run full test suite
2. Verify pass rate ≥ 95%
3. Check coverage metrics
4. Document any remaining known issues

## Quick Wins (Immediate Actions)

### 1. Fix Logger Import
```bash
# Search and replace .js extensions in server imports
```

### 2. Create Test Utilities
```typescript
// tests/utils/test-helpers.tsx
export const renderWithProviders = (ui, options) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>,
    options
  );
};
```

### 3. Mock Server Logger
```typescript
// tests/mocks/logger.ts
export default {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};
```

## Expected Outcomes

After fixes:
- **Pass Rate**: 95-98%
- **Failed Tests**: <30 (down from ~140)
- **Coverage**: Maintain 60%+ across all metrics
- **Build Time**: <3 minutes for full test suite

## Risk Mitigation

1. **Backup**: Current test results documented
2. **Incremental**: Fix one category at a time
3. **Verification**: Run tests after each fix
4. **Rollback**: Git commits for each phase

## Timeline

- **Phase 1**: 30 minutes
- **Phase 2**: 1-2 hours  
- **Phase 3**: 1 hour
- **Phase 4**: 30 minutes
- **Total**: 3-4 hours to 95%+ pass rate

## Success Criteria

✅ Test pass rate ≥ 95%
✅ No module resolution errors
✅ All component tests rendering properly
✅ Integration tests passing
✅ Coverage maintained at 60%+
✅ CI/CD pipeline green
