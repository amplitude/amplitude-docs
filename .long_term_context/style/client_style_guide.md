# Amplitude Documentation Style Guide

## Writing Style Guidelines

### Avoid Temporal Language
- **Don't use "currently"** in documentation. Documentation should always reflect the current state of the product.
- **Bad**: "Feature X is currently not supported"  
- **Good**: "Feature X is not supported" or "Amplitude does not support Feature X"

### Use Active Voice
- Prefer active voice over passive voice for clarity and directness.
- **Bad**: "Cross-region data sharing is currently not supported"
- **Good**: "Amplitude does not support cross-region data sharing"

### Avoid "AI Slop" - Unnecessary Explanations
- **Avoid excessive explanatory text** that doesn't help users complete tasks
- **Don't use marketing language** in technical documentation - be direct and factual
- **Remove verbose technical explanations** when a simpler description suffices
- **Bad**: "Session Replay captures changes to a page's Document Object Model (DOM), including elements in the shadow DOM, then replays these changes to build a video-like replay. For example, at the start of a session, Session Replay captures a full snapshot of the page's DOM. As the user interacts with the page, Session Replay captures each change to the DOM as a diff. When you watch the replay of a session, Session Replay applies each diff back to the original DOM in sequential order, to construct the replay."
- **Good**: "Session Replay captures DOM changes and plays them back to create session recordings."

## Formatting Guidelines

### Heading Structure and Spacing
- **Always include content between headings**: Never place headings sequentially without intervening content. Each heading should be followed by at least one sentence or paragraph before any subheadings.
  - **Bad**: 
    ```markdown
    ## Troubleshooting
    ### Short or incomplete replays
    ```
  - **Good**:
    ```markdown
    ## Troubleshooting
    
    This section describes common issues you may encounter with Session Replay and how to resolve them.
    
    ### Short or incomplete replays
    ```
- **Add empty lines before section headings**: Always include an empty line before `##` and `###` headings to ensure proper spacing.
  - **Bad**: No empty line before the heading
  - **Good**: One empty line separates the previous content from the heading

### Emphasis and Highlighting
- **Don't use bold text for emphasis** of important information. If content is important enough to be bolded, it should become a note or warning admonition instead.
- **Bad**: **Important limitation that users need to know**
- **Good**: Use appropriate admonition (note, warning, info) with descriptive title

### Admonitions
Use admonitions to highlight important information:
- `{{partial:admonition type="warning" title="Descriptive title"}}` for limitations, restrictions, or important caveats
- `{{partial:admonition type="note" title="Descriptive title"}}` for helpful information or clarifications  
- `{{partial:admonition type="info" title="Descriptive title"}}` for general information or context

**SDK version requirements**: Always format SDK version requirements or minimum version information as admonitions rather than plain text. Use `type="note"` to make version requirements more visible and emphasize their importance to users.
- **Bad**: Plain text like "Requires Browser SDK 2.27.0 or higher."
- **Good**: `{{partial:admonition type="note" heading=""}}Requires Browser SDK 2.27.0 or higher.{{/partial:admonition}}`

### Linking to Source Code
When documenting constants, default values, or long lists that are defined in source code:
- **Prefer linking to the source code** over duplicating long lists inline
- This keeps documentation concise and ensures accuracy as values stay up-to-date with the codebase
- **Bad**: Listing out 40+ default header names inline: `access-control-allow-origin, access-control-allow-credentials, access-control-expose-headers...` (repeating entire list)
- **Good**: "For the complete list of default safe headers, see [the source code](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-core/src/types/constants.ts#L59-L108)."
- Use inline duplication only for short lists (3-5 items) where quick reference is more valuable than a link

### Configuration Tables
When documenting configuration options in tables:
- **Enumerate possible values for options with limited sets**: When a configuration option accepts a specific set of values (enums, log levels, constants), list all possible values inline in the table's description column with brief explanations of each value
  - **Good**: "Options: `LogLevel.Disable` (no logging), `LogLevel.Error` (errors only), `LogLevel.Warn` (errors and warnings), `LogLevel.Info` (errors, warnings, and info), `LogLevel.Debug` (errors, warnings, info, and debug), `LogLevel.Verbose` (all messages)"
  - This applies when the list is reasonably short (roughly 3-10 values). For longer lists, link to source code instead (see "Linking to Source Code" above)
- **Link to detailed sections**: When configuration options have detailed explanations, examples, or troubleshooting information elsewhere in the document, include anchor links from the config table to those sections
  - **Example**: "See [Custom logging](#custom-logging) for details." or "See [Custom logging](#custom-logging)."
  - This helps users discover related content and navigate efficiently
