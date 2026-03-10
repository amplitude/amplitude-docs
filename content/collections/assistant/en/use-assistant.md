---
id: 45b04bd3-f913-4ea0-9e11-8ac201ac630e
blueprint: assistant
title: 'Use Assistant'
section: assistant
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1772784000
landing_blurb: Learn how to open Assistant, ask questions, follow up in a conversation, give feedback, and analyze chats to improve coverage.
---
How your users open Assistant depends on how you configure the widget, but the basic pattern is:

1. **Find the Assistant widget launcher**

   Look for a help or chat icon, often in the bottom-right corner of the page. Your team may label it with your brand, for example, "Help", "Need assistance?", or your company name.

2. **Open the widget**

   Select the launcher. The Assistant widget opens as a panel on the page. Depending on configuration, users may see:

   * A **Chat** tab where they can talk with Assistant.
   * A **Resource Center** tab with recommended and searchable content.
   * Both, as separate tabs in the same widget.

3. **Switch between Chat and Resource Center**

   If your team enabled both, use the tabs at the top of the widget, for example, **Chat** and **Resources**, to switch modes:

   * **Chat** for conversational help.
   * **Resources** for browsing and searching articles, guides, and other content.

## Ask a question

On the **Chat** tab, users can ask Assistant any question that your connected content and tools can answer. Typical use cases include:

* "How do I invite a teammate?"
* "Why is my dashboard empty?"
* "Show me a quick tour of the new feature."
* "Where can I find your billing documentation?"

To ask a question:

1. Select the **message box** at the bottom of the **Chat** tab.
2. Type your question in plain language.
3. Press **Enter** or select **Send**.

Assistant processes your request and then:

* Streams its answer into the chat.
* May include links to relevant docs or Resource Center items.
* May open an in-app guide, checklist, or survey that walks you through a flow.

## Continue a conversation

Assistant keeps track of context within a single chat:

* You can ask follow-up questions without repeating yourself.
* Assistant can refer back to earlier messages in the same conversation.

For example:

1. You: "How do I set up SSO?"
2. Assistant: Explains the process and links a setup guide.
3. You: "Can I require this for all users?"
4. Assistant: Builds on the previous answer to cover enforcement.

If you want to switch topics completely, start a new question in the same chat. Assistant keeps context within a conversation, not across unrelated threads.

## Give feedback on answers

End users can help improve Assistant by giving feedback:

* **Thumbs up** a helpful answer so your admins know it worked well.
* **Thumbs down** an unhelpful answer. Assistant (and your admins) use this to improve:
  * Assistant may try an alternative answer or ask for clarification.
  * Your admins can review that this answer didn't work and adjust content or configuration.

## Inspect answers with X-ray

Assistant includes a detailed inspection view that explains how Assistant produced each answer.

At a high level, X-ray lets you:

* See which content sources Assistant used to generate an answer.
* See which tools or workflows Assistant called.
* Read a short reasoning explanation of how Assistant derived the answer.
* Audit both live test chats and historical user chats.

### Open X-ray from a chat

There are two main entry points:

1. **While testing in the Assistant admin area**

   When you test Assistant directly in its configuration view:

   * Start a conversation on the right side of the screen.
   * Open the **X-ray** tab for that conversation.
   * For each Assistant message, open the details to see:
     * The **Thinking** timeline (tool calls and intermediate reasoning).
     * The **Sources** that Assistant retrieved and cited.

2. **From historical chats in analytics**

   From the Assistant or chat analytics area:

   1. Filter or search to find a chat you care about, for example, a chat that hit a fallback or received negative feedback.
   2. Open the chat detail view.
   3. Select the **X-ray** or **Inspect** button.
   4. Review each response in the same way: thinking, sources, and (where applicable) workflows.

### Understand the Thinking view

The **Thinking** timeline gives a chronological account of how Assistant handled the message.

Use this view to:

* Verify that Assistant calls the right tools in the right order.
* Check that Assistant selects workflows when it should.
* Spot cases where Assistant skipped a tool you expected it to use.

### Understand the Sources view

The **Sources** tab shows what information Assistant had access to when it wrote its answer. Typical information includes:

* **Cited sources** — passages and Answers that most directly shaped the answer.
* **Other considered sources** — content that Assistant retrieved and evaluated but didn't directly cite.
* **Per-source details** — such as the title, URL, and content section.

Internally, Assistant stores point-in-time snapshots of the relevant passages so you can see what it "saw" even if someone edited or removed the underlying article later.

Use this view to:

* Confirm that Assistant uses the right documents.
* Identify when outdated or incorrect content drives bad answers.
* Decide whether to:
  * Update an article.
  * Create an Answer with a clearer answer.
  * Adjust content tags or indexing.

## Analyze chats and improve Assistant

Assistant's value increases as you iterate. Use chat analytics plus X-ray to improve coverage and quality.

### Find problem areas

From the chat analytics area:

1. Filter chats by:
   * High fallback rate.
   * Negative feedback.
   * A specific topic or keyword.
2. Open individual chats and inspect them with X-ray to see:
   * Which sources Assistant used.
   * Which tools Assistant called.
   * Whether the answer was incomplete or incorrect.

### Fix gaps

Based on what you find:

* **Update or add content in your docs or help center.**
* **Create Answers for recurring high-importance questions.**
* **Adjust workflows or tools if Assistant isn't choosing the right path.**
* **Tighten or expand targeting for Resource Center content so articles appear when and where users need them.**
* **Create a guide for important or confusing product areas.**

Over time, this loop—chat, X-ray, then content or configuration updates—turns Assistant into a high-quality, product-specific helper rather than a generic chatbot.
