

# Assessment Patterns for Internal Bug Fixes

## When PRs May Not Require Documentation Updates

Based on PR #1274 (amplitude/Amplitude-TypeScript - consumption check fix), learned that internal implementation improvements often don't need docs updates when they:

1. **Don't change user-facing APIs** - No new methods, parameters, or configuration options
2. **Don't change implementation patterns** - Users continue using existing patterns
3. **Improve reliability behind-the-scenes** - Fix edge cases or internal errors
4. **Don't require user action** - No migration, configuration changes, or new setup steps
5. **Existing docs remain accurate** - Current guides and examples still work correctly

## Key Questions to Ask:
- Does this change how users call the API?
- Do users need to modify their existing code?
- Are there new features or configuration options?
- Does this resolve a documented known issue?
- Do existing tutorials and guides remain valid?

If answers are all "no" to user-impacting changes and "yes" to docs remaining valid, likely no updates needed.

## Testing Infrastructure Pattern

**PR #1275** (amplitude/Amplitude-TypeScript - test page for feature flags) established that testing infrastructure PRs typically don't need docs updates when they:

1. **Add files to test directories** - Files in `test-server/`, `test/`, or similar directories
2. **Are for developer debugging** - Include debugging hooks like `debugger` statements or `window.amplitude` exposure
3. **Use 'chore:' prefix** - Indicates maintenance/internal work rather than user-facing features
4. **Test existing functionality** - Load and display existing APIs without adding new ones
5. **Don't affect production code paths** - Internal tooling that doesn't change how users interact with the SDK

Example indicators: HTML test pages, debugging utilities, developer tools, CI/CD improvements.

## XMLHttpRequest Response Handling Pattern

**PR #1276** (amplitude/Amplitude-TypeScript - handle XHR responseType JSON) demonstrated that network infrastructure bug fixes typically don't need docs updates when they:

1. **Fix browser compatibility issues** - Handle edge cases like `InvalidStateError` when accessing `responseText` property
2. **Improve internal error handling** - Better parsing of XMLHttpRequest responses with different `responseType` values ('json', 'text', etc.)
3. **Are in analytics-core infrastructure** - Changes in `src/network-observer.ts` or similar internal SDK components
4. **Don't change user configuration** - Users still use the same `networkTracking: true` and capture rule APIs
5. **Add comprehensive test coverage** - Include extensive unit tests for new error handling scenarios
6. **Create internal utility functions** - Like `createXhrJsonParser()` that handle response type differences transparently

Key indicators: Changes focus on `createXhrJsonParser`, `ResponseWrapperXhr`, type safety improvements, and browser-specific error handling rather than new configuration options or user-facing APIs. The fix specifically addresses the fact that `xhr.responseText` throws `InvalidStateError` when `responseType` is not 'string' or '', requiring different approaches to access response data.

**Additional confirmed example**: PR #1276 adds `responseType` property to interfaces, creates robust JSON parsing function using `structuredClone()` for safety, and removes deprecated `text()` method while maintaining backward compatibility for all documented network capture functionality.

