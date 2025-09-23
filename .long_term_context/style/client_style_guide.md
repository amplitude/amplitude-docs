# Amplitude Documentation Style Guide

## Admonitions and Callouts

### Note Admonitions
**Use admonition format, not inline bolded text for notes:**

✅ **Correct:** Use blockquote admonition format
```markdown
> **Note:** Amplitude recommends not enabling session storage as this information may contain PII.
```

❌ **Incorrect:** Don't use inline bolded note text
```markdown
**Note**: Amplitude recommends not enabling session storage as this information may contain PII.
```

**Why:** The blockquote format (`> **Note:**`) creates proper admonition styling in the documentation platform, while inline bolded text (`**Note**:`) appears as plain bolded text without the visual callout styling that helps readers notice important information.

**Feedback source:** User feedback from 2025-09-23 requested converting bolded note text to note admonition format.