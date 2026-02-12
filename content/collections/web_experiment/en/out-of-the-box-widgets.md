---
id: 2cc93767-a20b-4741-a07f-1939ec508e79
blueprint: web_experiment
title: 'Web Experiment Out-of-the-box Widgets'
this_article_will_help_you:
  - 'Understand what OOTB widgets are'
  - 'Use OOTB widgets to create experiments'
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1762192449
---
Out-of-the-box (OOTB) widgets let you test new website elements like modals and banners without needing to design or code them yourself. They're pre-built, configurable components that you can customize directly in the visual editor to match your brand. By removing engineering setup such as SDK, UI frameworks, and so on, OOTB widgets let you validate new ideas, drive learnings, and scale your experimentation program while maintaining brand consistency through saved design presets and reusable styles. For more information on the Visual Editor and setting up a web experiment, go to [The Visual Editor](/docs/web-experiment/set-up-a-web-experiment#the-visual-editor). 

OOTB widgets also incorporate Amplitude AI to let you design your web experiment through conversational prompts instead of needing the precise details of your brand style guide. 

The OOTB widgets library includes:
- **Buttons**: A call to action (CTA) button. When a customer clicks a CTA button, an action occurs for them. Actions can be taking the customer to another location of your website, like their shopping cart, or taking them to your support agents.
- **Banner**: A notification or messaging bar. Message banners typically announce important information to your customer. These messages can announce expected disruptions in service, highlight sales, or any other communication you want to make.
- **Banner with a button**: A notification or messaging message that also includes a CTA button. This widget combines both a CTA button as well as messaging. Typically, banners with buttons announce a specific action you want your customers to perform. For example, applying a promo code to a shopping cart. 
- **Modal pop-up**: A pop-up modal that appears on your page after a specified amount of time. Modals typically also include CTA buttons and messaging. A pop-up modal typically appears after a few seconds and encourages your customers to take an action. For example, encouraging new users to sign up for an account. 

You can also save your customized widgets to the library for future use. For example, if you create a notification banner that announces a quarterly sale, you can save that customized message and reuse it as needed. All saved widgets are available to everyone in your organization who has permission to create experiments.

{{partial:admonition type="note" heading="Tracked key integrations"}}
You may need to set up tracking for key integrations. For more information, go to [Autocapture visual labeling](/docs/get-started/autocapture#visual-labeling-for-web). {{/partial:admonition}}

## Using widgets

You can add an OOTB widget to any Web experiment. After you create your [Web experiment](/docs/web-experiment/set-up-a-web-experiment), click **Open Visual Editor**. Click **Widgets** from the top menu bar. This opens the OOTB widgets modal and you can then select the widgets you want. Drag and drop the widget on your experiment. 

### Editing widgets

By default, you can edit the following aspects of any widget:
- Text
- Button label
- Background color
- Font

From the element toolbar when a widget is selected, you can delete the widget or save it to the library.

All changes are visible in real-time through the Visual Editor. 

### Customizing placement of your widgets

Banners and buttons are both movable around your website:
- Banners can appear at the top or bottom of a page. 
- Buttons can appear almost anywhere on the page. When set, the buttons snap to a grid layout. 

You can't customize the location of the pop-up modal. It appears in the center of your page.

For more information on moving banners and buttons, go to [Moving elements](/docs/web-experiment/set-up-a-web-experiment#move).

### AI Stylizer

AI Stylizer uses Amplitude AI to refine copy and styles on OOTB widgets and on existing page elements—headlines (H1, H2, H3), CTAs (buttons and link buttons), banners, and text blocks. You don't need the precise details of your brand style guide; you can use conversational prompts instead.

When you select a widget or any text-based element in the Visual Editor, the AI Stylizer control appears in the element toolbar (alongside edit, duplicate, and delete). Select it to open the Stylizer popover.

**On OOTB widgets:** When you use AI Stylizer on a widget, Amplitude matches the widget to your site's style settings and can create or refine text for buttons and other text areas.

**On existing page elements:** Stylizer offers element-specific preset prompts so you can refine copy and style quickly. Examples:
- **Headlines:** Make it more compelling, simplify and clarify, tailor for new visitors.
- **Buttons (CTAs):** Make it more action-oriented, increase contrast and visibility, tailor for returning customers.
- **Banners:** Make it more prominent, simplify messaging, tailor for new visitors.
- **Text blocks:** Simplify and clarify, shift from features to benefits, tailor for mobile users.

You can choose a preset or enter a custom prompt. Stylizer can generate multiple headline or copy variants in one interaction so you can pick which to test. You can also revert to a previous AI-generated version from version history. All AI-created styles and copy can be edited further after you apply them.

AI Stylizer can't be used on an element that contains an embedded OOTB widget. If you try, the product shows a message explaining that this case isn't supported.