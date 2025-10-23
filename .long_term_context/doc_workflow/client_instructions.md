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

**When feedback mentions PR updates**: If someone says "the PR is updated since then", this is a clear signal to:
1. Re-read PR comments to understand what changed
2. Review the code diff again
3. Verify your documentation matches the final implementation

**Example**: PR #1348 initially appeared to add `remoteConfigServerUrl` but the final implementation used a nested `remoteConfig.serverUrl` structure. The PR comments revealed this change, and the code diff confirmed the nested structure.