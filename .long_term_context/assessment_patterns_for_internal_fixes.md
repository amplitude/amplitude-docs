

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

## Preview Modal Timing Internal Fix Pattern

**PR #209** (amplitude/experiment-js-client - show preview modal on applyVariants) demonstrated that UI timing adjustments typically don't need docs updates when they:

1. **Change internal timing without changing user experience** - Modal moved from SDK initialization to `applyVariants()` method call, but still appears automatically during preview workflow
2. **Are follow-up fixes to recently documented features** - Previous PR #205 documented the preview modal; this fixes timing behavior
3. **Add internal reliability improvements** - Added duplicate modal prevention by checking for existing `amp-preview-modal` ID in DOM
4. **Don't change user-facing APIs or configuration** - Users still call `applyVariants()` the same way, preview URLs work identically
5. **Existing documentation remains accurate** - "appears automatically when SDK detects preview flags" statement still true

Key indicators: Changes in `packages/experiment-tag/src/experiment.ts` moving `showPreviewModeModal()` calls between methods, adding DOM element ID attributes for better tracking, duplicate prevention logic. The user experience is unchanged - modal still appears during preview workflow, just at a slightly different moment in the SDK lifecycle.

**Confirmed pattern**: When UI timing changes improve reliability without changing the fundamental user interaction model, existing documentation typically remains accurate and no updates are needed.

## Remote Config Testing Infrastructure Pattern

**PR #1277** (amplitude/Amplitude-TypeScript - playwright remote config smoke tests) confirmed that testing infrastructure for already-documented features typically doesn't need docs updates when they:

1. **Test existing documented functionality** - The `fetchRemoteConfig` option is already comprehensively documented in Browser SDK docs with usage examples and Data settings explanations
2. **Add test infrastructure only** - Creates `packages/e2e-remote-config/` with E2E tests and `test-server/remote-config-test.html` for manual testing
3. **Use "chore:" prefix** - Indicates internal maintenance work rather than user-facing features
4. **Include debugging utilities** - Test page includes extensive logging, status updates, and debugging hooks for developers
5. **Don't change production APIs** - No changes to how users configure or call `amplitude.init()` with `fetchRemoteConfig: true`
6. **Update dependencies for testing** - Playwright version updates and nx workspace tools are for internal development workflow improvements

Key indicators: E2E test files in `packages/e2e-remote-config/test/e2e/`, test HTML pages in `test-server/`, dependency updates in `package.json` for testing tools, and comprehensive test coverage of existing documented API (`fetchRemoteConfig: true`). The functionality being tested has full documentation coverage in Browser SDK configuration tables, Remote configuration sections, and Data settings pages.

**Confirmed example**: Remote config functionality is already documented starting with SDK 2.16.1 where `fetchRemoteConfig` defaults to `true`, with detailed usage examples and server-side behavior explanations. Testing infrastructure validates this existing functionality without exposing new user-facing APIs or configuration options.

## New User-Facing Feature Identification Pattern

**PR #1264** (amplitude/Amplitude-TypeScript - pageUrlExcludelist autocapture feature) confirmed that new configuration options clearly require documentation updates when they:

1. **Add new API parameters** - New `pageUrlExcludelist` property in ElementInteractionsOptions and FrustrationInteractionsOptions interfaces
2. **Follow existing paradigms** - Excludelist complements existing allowlist pattern, making it intuitive for users
3. **Change user implementation patterns** - Users can now configure exclusion patterns in addition to inclusion patterns
4. **Include comprehensive type support** - Supports strings, RegExp patterns, and {pattern: string} objects
5. **Have precedence rules** - Excludelist takes precedence over allowlist, requiring clear documentation of behavior

**Key Documentation Areas for New Config Options:**
- Main SDK configuration reference tables
- Code examples showing usage patterns
- Behavioral notes about precedence and interaction with existing options
- General product overview docs for consistency

**Autocapture Documentation Location Pattern**: As of Browser SDK 2.10.0+, main autocapture documentation lives in Browser SDK 2 docs, not the deprecated standalone autocapture plugin documentation. Always check both locations but prioritize the main SDK docs.

## Marketing Cookie Internal Implementation Pattern

**PR #208** (amplitude/experiment-js-client - expire marketing cookie after session) demonstrated that internal cookie management changes typically don't need docs updates when they:

1. **Affect internal-only mechanisms** - Marketing cookies used to pass props between SDK components (experiment-js-client to analytics SDK)
2. **Have no user-facing documentation** - Feature not mentioned in any user guides, configuration docs, or troubleshooting materials
3. **Change internal behavior only** - Removes `expirationDays: 365` from `setMarketingCookie()` function, making cookies session-only instead of persistent
4. **Don't affect user APIs** - No changes to how users configure or interact with the SDK
5. **Are implementation improvements** - Rationale: "Marketing cookies should expire after session, as they are only used to pass props to analytics SDK and should not be persisted"

Key indicators: Changes in `packages/experiment-tag/src/util/cookie.ts`, internal utility functions like `setMarketingCookie()`, cookie lifetime adjustments for internal data flow rather than user-configurable settings. The functionality being changed (marketing cookies) has zero mentions in existing documentation, confirming it's purely internal infrastructure.

