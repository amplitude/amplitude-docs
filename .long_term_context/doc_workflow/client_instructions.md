When adding hyperlinks to other articles, do not use "../" as a prefix to move between directories. You'll need to figure out what the URL will actually end up being resolved into. To do this, you'll see a bunch of yaml files that sit next to every folder inside `content/collections/`.

1. Locate the collection file  
   • For `content/collections/experiment-sdks/en/experiment-ios.md` the companion file is  
     `content/collections/experiment-sdks.yaml`.

2. Open that YAML – each one contains a `route:` key, e.g.

```
content/collections/experiment-sdks.yaml
route: '/sdks/experiment-sdks/{slug}'
```

3. Statamic (the CMS this repo is built on) takes that route pattern and substitutes `{slug}` with the entry’s slug.  
   • If the Markdown front-matter doesn’t declare a `slug:` value, it simply uses the filename (minus the `.md`).  
     `experiment-ios.md` → slug `experiment-ios`.

4. The docs site is mounted at `/docs`, so the public URL is:

    https://amplitude.com/docs + <route-after-substitution>

    Example: `/sdks/experiment-sdks/experiment-ios`  
    → https://amplitude.com/docs/sdks/experiment-sdks/experiment-ios

A second example:

```
content/collections/session-replay.yaml
route: '/session-replay/{slug}'
```

`session-replay-ios-plugin.md` → slug `session-replay-ios-plugin`  
URL → https://amplitude.com/docs/session-replay/session-replay-ios-plugin

So to predict any article’s URL:

1. Take the collection name from its path.  
2. Read `content/collections/<collection>.yaml` and grab the `route:` string.  
3. Replace `{slug}` with the file’s slug (either its `slug:` front-matter value or the filename).  
4. Prepend `/docs` and the site domain.

Worst case scenario: If you're not sure, you can get the list of articles with the correct URLs in https://amplitude.com/docs/llms.txt
## Implementation Guide Coverage for SDK Features

When documenting new SDK features that require configuration, ensure comprehensive coverage across all relevant implementation guides:

**Check multiple implementation paths**: New SDK features often have configuration details that need to be documented in multiple places:
- Main feature documentation (e.g., `session-replay.md` for UI features)
- Autocapture configuration docs (e.g., `autocapture.md` for feature enablement)
- **SDK-specific implementation guides** (e.g., `session-replay-plugin.md`, `session-replay-standalone-sdk.md`)

**Implementation guides need configuration details**: Users following SDK-specific implementation guides (like Browser SDK Plugin, Standalone SDK, etc.) need to know how to configure new features in their specific setup context. Don't assume they'll find configuration details in other docs.

**Example**: When Session Replay added error tracking and frustration analytics, the configuration details (`autocapture.frustrationInteractions`, `autocapture.networkTracking`) needed to be included in:
- `autocapture.md` (feature documentation)
- `session-replay-plugin.md` (Browser SDK Plugin implementation guide)
- Any other relevant SDK implementation guides

Always ask: "What implementation guides would users be following who need this configuration information?"
## Verifying PR Code Changes

When documenting features from GitHub PRs, always verify the actual code implementation:

**Check the code diff, not just the description**: PR descriptions and summaries can become outdated if the implementation changes during code review. Always examine the actual code changes to see what was implemented.

**Review PR comments for implementation changes**: PR comments may reveal that the API design changed after initial submission. Look for comments from reviewers that indicate structural changes (e.g., "I changed this to use a nested object instead").

**For configuration APIs, verify the exact structure**: Configuration option names, nesting, and structure matter. Check:
- Interface/type definitions to see the exact property names
- Test files for usage examples
- Constructor/initialization code to understand how options are processed

**Verify conditional behavior and config option interactions**: Many SDK configuration options have conditional relationships. When documenting config options, trace the logic flow to understand:
- Whether options have dependencies or affect each other's behavior
- If certain options only apply in specific conditions (e.g., `if option_x.nil?`)
- How default values are applied vs. user-provided values
- **Example**: In Ruby Experiment SDK PR #74, the `debug` flag only affects the default logger (when `logger.nil?`). If a custom logger is provided, the debug flag is ignored entirely. Missing this conditional led to incorrect documentation about debug "overriding" custom logger levels.

**When feedback mentions PR updates**: If someone says "the PR is updated since then", this is a clear signal to:
1. Re-read PR comments to understand what changed
2. Review the code diff again
3. Verify your documentation matches the final implementation

**Distinguish user-facing APIs from plugin lifecycle hooks**: When documenting new SDK methods, verify whether the API is:
- **User-facing**: Users call the method directly (e.g., `amplitude.reset()`, `amplitude.track()`)
- **Plugin lifecycle hook**: Plugins implement the method, SDK calls it automatically (e.g., `plugin.onReset()`, `plugin.setup()`, `plugin.teardown()`)

Check the code diff to understand the pattern:
- User-facing APIs are methods on the client class (e.g., `BrowserClient`)
- Plugin lifecycle hooks are optional methods in the Plugin interface that get called by the timeline/SDK

**Example**: PR #1393 added `onReset()` as a plugin lifecycle hook (not `amplitude.onReset()`). The implementation shows `plugin.onReset?(): Promise<void>` in the Plugin interface, and `timeline.onReset()` calls all registered plugins' onReset methods. This should be documented in the plugin lifecycle table alongside `setup()`, `execute()`, and `teardown()`, not as a user-facing listener API.

**Example**: PR #1348 initially appeared to add `remoteConfigServerUrl` but the final implementation used a nested `remoteConfig.serverUrl` structure. The PR comments revealed this change, and the code diff confirmed the nested structure.
## Maintaining Document Structure and Hierarchy

When adding new sections to existing documents, be vigilant about preserving the existing document hierarchy:

**Verify heading structure before and after changes**: When adding new sections (especially top-level sections with `##`), ensure you understand where they'll sit in relation to existing sections and subsections. Use `grep -n "^## \|^### " filename.md` to check the heading hierarchy.

**Be explicit about placement**: When planning to add a new section, explicitly note WHERE it should be placed:
- "Add new section AFTER section X"
- "Add new subsection under section Y, before subsection Z"
- "Add new top-level section at the end of the document"

**Check for accidental hierarchy changes**: After adding content, verify that existing subsections haven't been accidentally moved under the wrong parent section. A subsection (`###`) should remain under its intended parent section (`##`).

**Example of what went wrong**: In PR #1104, when adding the "Custom logging" section (with `##`), it was placed before the "Local evaluation cohort targeting" subsection (with `###`). This made "cohort targeting" appear to be a subsection of "Custom logging" instead of staying under "Local evaluation". The fix was to place "Custom logging" AFTER "Local evaluation cohort targeting" so the cohort targeting subsection remained under its correct parent.

**Prevention strategy**:
1. Before editing: Review existing heading hierarchy
2. While planning: Be explicit about exact placement of new sections
3. After editing: Verify heading hierarchy matches intent using `grep -n` or similar commands
## Handling Vale Linting Failures

When a PR fails the Vale CI check, you need to fix all errors before the PR can be merged. Vale runs on the entire file when checking PRs, so you may encounter pre-existing errors in files you edit, even if your new content is error-free.

**Key facts about Vale at Amplitude**:
- **Errors block CI, warnings don't**: Focus on fixing all errors (red). Warnings (yellow) are informational but won't block the PR.
- **Vale runs on entire files**: When you edit a file, Vale checks the whole file, not just your changes. You're responsible for fixing all errors, including pre-existing ones.
- **Run Vale locally**: `vale --config=.vale/rules.ini <filepath>` to see errors before pushing.
- **Vale CI requires `.vale.ini` at repository root**: The errata-ai/vale-action@reviewdog GitHub Action expects a `.vale.ini` or `_vale.ini` file at the root of the repository. If this file is missing, CI will fail even if Vale passes locally. The file should contain:
  ```
  StylesPath = .github/styles
  MinAlertLevel = warning

  [*.md]
  BasedOnStyles = Amplitude
  ```
  **Important**: The StylesPath must be `.github/styles` (where Amplitude's custom rules live), not `.vale/styles` (which contains Microsoft's generic rules). Using the wrong path will cause CI to fail with "style 'Amplitude' does not exist on StylesPath".

**Common Vale rules and fixes**:
- **Amplitude.Latin**: Replace Latin phrases with clearer English
  - "via" → "through", "using", or "with"
  - "i.e." → "that's" (use contraction directly to avoid triggering both Latin error and Contractions warning)
  - "e.g." → "for example" or "such as"
- **Amplitude.Dashes**: No spaces around em dashes
  - Change ` — ` or ` —` to `---` (markdown convention for em dash)
- **Amplitude.TooWordy**: Simplify complex phrases
  - "in order to" → "to"
  - "prior to" → "before"
  - "with respect to" → "for" or "about"
- **Amplitude.Contractions**: Use contractions for informal tone
  - "that is" → "that's"
  - When replacing Latin phrases like "i.e.", go directly to "that's" to avoid both the Latin error and Contractions warning

**Workflow for fixing Vale errors**:
1. Run Vale locally to see all errors: `vale --config=.vale/rules.ini <filepath>`
2. Read each error line and understand what needs to change
3. Use `sed -n '<line_number>p' <filepath>` to view specific lines
4. Apply fixes using `apply_update` for precise changes
5. Run Vale again to confirm all errors are resolved (0 errors)
6. Commit and push changes