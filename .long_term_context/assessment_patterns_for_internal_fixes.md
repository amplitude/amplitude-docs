

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

## Dead Click Detection Internal Fix Pattern

**PR #1278** (amplitude/Amplitude-TypeScript - fix dead click on visibility hidden) confirmed that dead click detection improvements typically don't need docs updates when they:

1. **Improve internal reliability without changing user APIs** - Adds `VisibilityChangeObservable` internally to track document visibility changes, but users don't interact with this directly
2. **Fix false positive detection logic** - Prevents dead click events when page visibility changes after click (indicating navigation), reducing incorrect event triggering
3. **Are purely internal implementation changes** - Changes in `src/autocapture/track-dead-click.ts`, `src/frustration-plugin.ts` without exposing new configuration options
4. **Don't change autocapture usage patterns** - Users still configure dead click tracking the same way through existing allowlist/excludelist options
5. **Existing documentation remains accurate** - Current dead click references (like in amplitude-data-settings.md) continue to be correct since users can still control dead click volume through allowlists

Key indicators: Changes add internal observables (`VisibilityChangeObservable`), modify internal event detection logic, add comprehensive test coverage for edge cases, but don't expose new user-facing configuration options. The fundamental user experience (configuring autocapture dead click detection) remains unchanged while accuracy improves behind the scenes.

**Summary**: Dead click detection is an internal autocapture feature where logic improvements don't require documentation updates as long as the user configuration methods and expected behavior remain consistent.

## Swift Package Manager Build Configuration Pattern

**PR #78** (amplitude/experiment-ios-client - Swift 6.2 manifest compiles in Swift 6 language mode) confirmed that Swift Package Manager build configuration fixes typically don't need docs updates when they:

1. **Fix internal build/compilation issues** - Adds `swiftSettings: [.swiftLanguageMode(.v5)]` to Package@swift-6.2.swift to prevent Swift 6 language mode compilation errors
2. **Are transparent to users** - Users continue using the same installation methods (Package URL, CocoaPods) without any changes to their workflow  
3. **Don't change user-facing APIs** - No changes to SDK initialization, configuration options, or method signatures
4. **Follow up on toolchain updates** - Resolves compatibility issues introduced by Swift toolchain version updates (follow-up to PR #76 which added Swift 6.2 manifest)
5. **Handle language mode compatibility** - Internal Swift Package Manager configuration that manages compilation settings automatically

Key indicators: Changes in `Package@swift-6.2.swift` files, `swiftSettings` configuration, Swift language mode specifications, build error fixes that don't affect the public API. The fix specifically addresses Swift Package Manager's default behavior where swift-tools-version 6.0+ compiles targets in Swift 6 language mode by default, requiring explicit v5 language mode settings for compatibility.

**Summary**: Swift Package Manager configuration files (Package@swift-X.Y.swift) are internal build system files that users don't interact with directly. Changes to these files that fix compilation or build issues typically don't require documentation updates since installation instructions and usage patterns remain unchanged.

## Basic Auth URL Stripping Internal Privacy Fix Pattern

**PR #1279** (amplitude/Amplitude-TypeScript - strip out basic auth from url) confirmed that internal privacy/security improvements typically don't need docs updates when they:

1. **Improve existing documented privacy behavior** - Existing Browser SDK docs already promise `[Amplitude] URL` contains "sensitive information masked"
2. **Affect purely internal classes** - NetworkObserver class is not mentioned in any user-facing documentation or APIs
3. **Don't change user configuration** - Users continue using same `networkTracking: true` configuration and capture rules
4. **Method visibility changes are for testing only** - Made `handleNetworkRequestEvent` public to enable unit testing, but method is internal to SDK
5. **Implement better security without changing API surface** - Strips `username:password@` from URLs using `new URL()` parsing before logging network events

Key indicators: Changes in `src/network-observer.ts`, URL parsing logic using `new URL()` constructor, test coverage for basic auth stripping (e.g., `https://username:password@api.example.com/data` → `https://api.example.com/data`), no changes to user-facing network tracking configuration options or event property schemas. The functionality being improved (network request URL capture) already has documented privacy promises that this change better fulfills.

**Summary**: When internal implementation improvements enhance privacy/security to better fulfill existing documented promises without changing user-facing APIs or behavior, documentation updates are typically not needed.

## Preview Mode Internal Refactoring Pattern (Added 2025-09-09)

**PR #211** (amplitude/experiment-js-client - refactor preview mode) confirmed that preview mode refactoring typically doesn't need docs updates when they:

1. **Improve internal implementation without changing user workflow** - Moved preview setup logic from constructor to `setupPreviewMode()` method but users still access preview through same "Test & Preview" button
2. **Add framework compatibility improvements** - Added Next.js hydration attributes (`data-hydration-safe`, `data-preserve-hydration`) and `requestAnimationFrame()` for stable DOM insertion
3. **Refactor internal state management** - Changed `previewFlags` type from `Record<string, string>` to `Record<string, Variant>` and added `isPreviewMode` boolean, but user-facing behavior unchanged
4. **Follow up on recently documented features** - Improves implementation of preview modal documented in PR #205, but modal still "appears automatically when SDK detects preview flags"
5. **Don't change URL parameters or session storage behavior** - Users continue using same `PREVIEW=true` + flag parameters, same session storage mechanisms
6. **Keep existing APIs and configuration unchanged** - No new user-facing methods, parameters, or configuration options

Key indicators: Changes in `packages/experiment-tag/src/experiment.ts` that move setup logic between methods, update internal type definitions, add framework compatibility attributes, improve message handling with `webExperimentClient.globalScope` instead of `getGlobalScope()`, but preserve all documented user workflows and behaviors.

**Summary**: Preview mode refactoring that improves reliability, framework compatibility, and internal architecture without changing how users create, access, or experience preview functionality doesn't require documentation updates since existing guides remain accurate.

## Cross-SDK Integration Coordination Pattern

**PR #321** (amplitude/Amplitude-Swift - expose trackAppOpenedEvent for Flutter SDK) confirmed that cross-SDK integration changes typically don't need docs updates when they:

1. **Enable cross-platform SDK coordination** - Made `trackAppOpenedEvent` function public solely for Flutter SDK to call, not for Swift SDK users
2. **Address platform-specific reliability issues** - Solves Flutter iOS lifecycle tracking unreliability on cold starts through direct function access
3. **Don't change user-facing behavior** - Swift SDK users continue using same `appLifecycles` autocapture configuration without modification
4. **Keep existing documentation accurate** - All current lifecycle tracking docs remain correct since user configuration and behavior is unchanged
5. **Are purely internal coordination mechanisms** - The exposed function serves Flutter SDK's internal needs rather than providing new Swift SDK features
6. **Don't require user action or awareness** - Cross-SDK coordination happens transparently without users needing to understand or configure the integration

Key indicators: Changes in SDK utility classes (like `DefaultEventUtils.swift`) that change method visibility (`internal` to `public`) specifically for other SDKs to consume, PR descriptions mentioning Flutter SDK integration or coordination, no changes to user-facing configuration APIs, existing autocapture documentation continues to apply without modification.

**Summary**: Cross-SDK integration changes that expose internal functions for platform coordination don't require documentation updates when they're transparent to users and don't change how users configure or interact with the individual SDKs.

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



## Infrastructure PR Documentation Pattern (Added 2025-09-02)

**PR #23** (amplitude/evaluation-proxy - Redis Cluster support) confirmed that infrastructure PRs adding user-facing configuration options clearly require documentation updates when they:

1. **Add new environment variables** - New `AMPLITUDE_REDIS_USE_CLUSTER` environment variable that users must understand and configure
2. **Add new YAML configuration options** - New `useCluster` field in redis configuration section that changes behavior  
3. **Provide new deployment capabilities** - Redis Cluster support alongside existing single-node Redis requires user choice between modes
4. **Include performance characteristics changes** - Large cohort optimizations affect user experience and deployment decisions
5. **Follow existing configuration patterns** - New options follow established boolean flag patterns with sensible defaults

**Key Documentation Areas for Infrastructure Configuration PRs:**
- Environment variables reference tables
- YAML/JSON configuration option tables  
- Example configurations showing different deployment modes
- Behavioral notes about when to use different options
- Performance implications that affect user deployment decisions

**Assessment Pattern**: Infrastructure PRs that add user-facing configuration (env vars, config options) are NOT internal fixes and require comprehensive documentation updates, even when the core functionality (Redis usage) already exists. Users need to understand new deployment options and make informed configuration decisions.

## AMD Module Loading Build Configuration Pattern (Added 2025-09-02)

**PR #210** (amplitude/experiment-js-client - fix AMD module loading) confirmed that build configuration fixes typically don't need docs updates when they:

1. **Change only internal build configuration** - Modifies `rollup.config.js` build settings without exposing new user APIs
2. **Fix module loading compatibility** - Changes exports from 'named' to 'auto' and adds global mode settings for better AMD support
3. **Don't change user installation methods** - Users continue using same npm, yarn, script tag installation patterns
4. **Don't expose new configuration options** - No new SDK initialization parameters, methods, or user-controllable settings
5. **Keep existing APIs unchanged** - All documented SDK methods (initialize, fetch, variant, etc.) work identically
6. **Address internal compatibility only** - AMD module loading improvements happen behind-the-scenes without user action required

Key indicators: Changes in build configuration files (`rollup.config.js`, webpack configs), module export formats (`exports: 'auto'`), global mode settings (`globals: {}`), build bundling improvements that don't affect the public API. These changes improve compatibility across different module loading systems (AMD, CommonJS, ES modules) without requiring users to modify their integration patterns.

**Summary**: Build system changes that improve module loading compatibility are transparent to users when they don't introduce new configuration options or change documented installation/usage patterns. Existing documentation remains accurate since user-facing behavior is unchanged.

## Cross-SDK Attribution Coordination Pattern (Added 2025-09-02)

**PR #1280** (amplitude/Amplitude-TypeScript - "Use original marketing cookies set by web experiment pre-redirect") established that cross-SDK coordination fixes typically don't need docs updates when they:

1. **Coordinate between SDKs internally** - Uses MKTG_ORIGINAL cookie coordination between experiment-js-client and Amplitude-TypeScript without exposing coordination details to users
2. **Fix attribution data loss during redirects** - Solves referrer loss when web experiments use `location.replace()` by preserving original campaign data
3. **Don't change user configuration patterns** - Users continue using same attribution autocapture and web experiment setup without modification
4. **Complete a two-part internal fix** - Works with related PR (experiment-js-client #206) to set/read coordination cookies transparently
5. **Improve data accuracy behind-the-scenes** - Better attribution tracking happens automatically without user awareness or action required
6. **Don't expose coordination mechanisms** - MKTG_ORIGINAL cookie usage is internal implementation detail not documented for user configuration

Key indicators: Changes in `packages/analytics-client-common/src/attribution/web-attribution.ts` that add internal storage keys (`webExpStorageKey`), modify `fetchCampaign()` logic to check for coordination cookies first, and implement automatic cleanup of temporary cookies. The fix operates transparently during web experiment redirects to preserve attribution data that was previously lost due to `location.replace()` behavior.

**Assessment Pattern**: Multi-SDK coordination fixes that solve data loss issues are internal improvements when they don't change user APIs, configuration options, or require user action. Users simply experience improved data accuracy without needing to modify their implementation.

## New User-Facing Feature Behavior Change Pattern (Added 2025-09-09)

**PR #1282** (amplitude/Amplitude-TypeScript - "fix(autocapture): make the default for patterns in mask-text-regex to be case insensitive") demonstrated that behavior changes to recently added user-facing features clearly require documentation updates when they:

1. **Affect new user-facing configuration options** - Changes default behavior of `maskTextRegex` feature added just 2 weeks earlier in PR #1259
2. **Change pattern matching behavior** - Makes regex patterns case-insensitive by default by adding 'i' flag to `new RegExp(entry.pattern, 'i')`
3. **Are follow-up fixes to recently added features** - PR #1282 is a behavior improvement to the brand new `maskTextRegex` option
4. **Could impact user patterns** - Users who wrote case-sensitive patterns like `/API_KEY/` would now also match "api_key", "Api_Key", etc.
5. **Add user-visible functionality not yet documented** - The original `maskTextRegex` feature from PR #1259 had not been documented yet

**Key Documentation Areas for New Feature Behavior Changes:**
- Document the new feature completely if not yet documented
- Configuration reference table entries
- Detailed explanation sections with code examples
- Behavioral notes emphasizing the behavior (case-insensitive by default)
- Distinction from similar features (maskTextRegex vs redactTextRegex)

**Assessment Pattern**: When a GitHub PR affects a user-facing feature that was recently added but not yet documented, comprehensive documentation is needed covering both the original feature and the behavior change. This is NOT an internal fix pattern - it's a user-impacting change that requires full feature documentation.

**Example Context**: PR #1259 (merged 2025-08-26) added `maskTextRegex` option to `ElementInteractionsOptions` interface, accepting `RegExp[]` or objects with `pattern`/`description` properties. PR #1282 (2 weeks later) made these patterns case-insensitive by default in the `DataExtractor` class compilation logic.

