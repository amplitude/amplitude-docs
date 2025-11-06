Your goal is to retrieve the details of a Jira issue, understand what the issue describes, and update documentation to resolve the issue. You'll do this in the following 7 steps:

1. Ensure that the Atlassian MCP is enabled and reachable. If you can't reach it or it returns an error. Stop the process immediately.
2. Look at the ticket URL that follows the invocation command, and retrieve its details.
3. Using the Git CLI, switch to the `main` branch, and perform a `git pull`.
4. Create a new branch using the issue's key or ID as the branch name. For example, `DOC-###` where `###` is a number.
5. Using the details provided in the issue, identify the impacted docs location, and propose a solution to the issue.
6. Ensure the updates you write meet the rules described in .cursor/rules.
7. Explain both the Jira issue, and the updates you made to resolve it.