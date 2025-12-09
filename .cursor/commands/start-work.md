# Start Documentation Work

## Overview

This workflow helps you start new documentation work by gathering information, creating a Jira ticket for tracking, and setting up a git branch.

## Steps

### Step 1: Gather information

Ask the user for the following details about their documentation change:

1. **Summary**: A brief description of the change (under 100 characters)
   - Example: "Add authentication section to Browser SDK docs"

2. **Description**: More details about what changes are needed
   - What pages or sections are affected?
   - What information needs to be added, updated, or removed?
   - Is there a specific reason or request driving this change?


**Wait for the user to provide this information before proceeding to Step 2.**

### Step 2: Create Jira ticket

Once you have the information from Step 1, create a Jira ticket:

1. Use the `mcp_Atlassian-MCP-Server_createJiraIssue` tool with:
   - `cloudId`: `"https://amplitude.atlassian.net"`
   - `projectKey`: `"DOC"`
   - `issueTypeName`:  `"Task"`
   - `summary`: The summary from Step 1
   - `description`: The description from Step 1

2. After successful creation, display:
   - The ticket ID (e.g., `DOC-1234`)
   - The ticket URL: `https://amplitude.atlassian.net/browse/DOC-####`

### Step 3: Create git branch

After the Jira ticket is created:

1. Switch to the `main` branch and pull the latest changes:
   ```bash
   git checkout main && git pull origin main
   ```

2. Create a new branch using the Jira ticket key:
   ```bash
   git checkout -b DOC-####
   ```
   Where `DOC-####` is the key of the ticket created in Step 2.

3. Confirm the branch was created successfully by running:
   ```bash
   git branch --show-current
   ```

### Step 4: Confirm completion

After all steps complete, provide a summary:

```
✅ Documentation work setup complete!

📝 Jira Ticket: DOC-#### 
🔗 URL: https://amplitude.atlassian.net/browse/DOC-####
🌿 Branch: DOC-####

You're ready to start making changes. When finished:
1. Commit your changes
2. Push the branch: git push origin DOC-####
3. Create a PR and link to the Jira ticket
```

## Error Handling

- **If MCP is unreachable**: Stop and inform the user to check their Atlassian MCP connection in Cursor settings.
- **If ticket creation fails**: Display the error and suggest the user create the ticket manually.
- **If git operations fail**: Display the error and suggest manual git commands.
- **If branch already exists**: Ask the user if they want to delete and recreate it, or use a different name (e.g., `DOC-####-v2`).

## Example Interaction

**User invokes command**

**Assistant:**
"I'll help you set up a new documentation task. Tell me about the change you're making:

1. **Summary** (brief, under 100 characters): What's the change?
2. **Description**: What needs to be done? Which pages are affected?
3. **Issue type**: Task, Bug, or Story? (default: Task)"

**User responds:**
"Summary: Add session replay troubleshooting guide
Description: Create a new troubleshooting page for Session Replay that covers common issues like missing replays, slow playback, and privacy masking problems.
Type: Task"

**Assistant creates ticket and branch, then confirms:**
"✅ Documentation work setup complete!

📝 Jira Ticket: DOC-1234
🔗 URL: https://amplitude.atlassian.net/browse/DOC-1234
🌿 Branch: DOC-1234

You're ready to start making changes..."

