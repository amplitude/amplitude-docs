---
description: Use inclusive, modern terminology in documentation
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Inclusive Terminology

Use inclusive, modern terminology that avoids potentially offensive or outdated terms.

## Required Terminology Changes

### Access Control Terms
- ❌ "blacklist" → ✅ "block list" or "deny list"
- ❌ "whitelist" → ✅ "allow list" or "accept list"

**Examples:**
- ❌ "Add the domain to the whitelist."
- ✅ "Add the domain to the allow list."

### Process Termination
Use neutral terms for stopping processes:

- ❌ "kill" → ✅ "end", "cancel", "stop", or "terminate"
- ❌ "abort" → ✅ "end", "cancel", or "stop"

**Examples:**
- ❌ "Kill the running process."
- ✅ "Stop the running process."
- ❌ "Abort the operation."
- ✅ "Cancel the operation."

### Legacy and Exemption
- ❌ "grandfathered" → ✅ "legacy" or "exempt"

**Examples:**
- ❌ "Existing users are grandfathered into the old pricing."
- ✅ "Existing users are exempt from the new pricing."

### Placeholder Terms
- ❌ "dummy" → ✅ "placeholder", "mock", "stub", or "sample"

**Examples:**
- ❌ "Use dummy data for testing."
- ✅ "Use placeholder data for testing."

### UI State Terms
- ❌ "grayed-out" → ✅ "disabled" or "inactive"

**Examples:**
- ❌ "The button appears grayed-out."
- ✅ "The button appears disabled."

### Verification Terms
- ❌ "sanity-check" → ✅ "validate", "verify", or "final check"

**Examples:**
- ❌ "Run a sanity-check on the configuration."
- ✅ "Validate the configuration."

### Navigation Terms
- ❌ "see" (when referring to other documentation) → ✅ "go to", "navigate to", "review", or "refer to"

**Examples:**
- ❌ "See the API documentation."
- ✅ "Review the API documentation." or "Refer to the API documentation."

### Other Terms
- ❌ "via" → ✅ "through" or "using"
- ❌ "once" (meaning "after") → ✅ "after"
- ❌ "desire" → ✅ "want" or "need"
- ❌ "first-class" (in abstract contexts) → ✅ "primary" or "default"
- ❌ "cripple" → ✅ "hinder", "slow down", or "impede"

## Gender-Neutral Language

Use gender-neutral pronouns and terms:

- Use "they/their" for singular when gender is unknown
- Use role-based terms: "developer," "user," "administrator" rather than gendered alternatives
- Avoid "guys" when referring to groups

**Examples:**
- ❌ "Each developer should configure his API key."
- ✅ "Each developer should configure their API key."
- ✅ "Developers should configure their API keys."

## Accessibility Language

When describing UI elements:

- Use "select" or "choose" rather than "click" (to include keyboard and screen reader users)
- Describe what happens, not just the action: "Select **Save** to save your changes."
- Avoid relying solely on color: "Select the blue **Submit** button" → "Select **Submit**"

## Examples

**Before:**
```
Add the API endpoint to your whitelist. Once the connection is established, 
kill any existing sessions. Run a sanity-check on the configuration, then 
see the advanced setup guide for more options.
```

**After:**
```
Add the API endpoint to your allow list. After the connection is established, 
end any existing sessions. Validate the configuration, then review the advanced 
setup guide for more options.
```

