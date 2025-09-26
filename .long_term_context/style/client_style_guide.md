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

### Emphasis and Highlighting
- **Don't use bold text for emphasis** of important information. If content is important enough to be bolded, it should become a note or warning admonition instead.
- **Bad**: **Important limitation that users need to know**
- **Good**: Use appropriate admonition (note, warning, info) with descriptive title

### Admonitions
Use admonitions to highlight important information:
- `{{partial:admonition type="warning" title="Descriptive title"}}` for limitations, restrictions, or important caveats
- `{{partial:admonition type="note" title="Descriptive title"}}` for helpful information or clarifications  
- `{{partial:admonition type="info" title="Descriptive title"}}` for general information or context
