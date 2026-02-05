---
id: 2cc93767-a20b-4741-a07f-1939ec508e79
blueprint: web_experiment
title: 'Web Experiment Out-of-the-box Widgets'
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1762192449
---
Out-of-the-box (OOTB) widgets let you test new website elements like modals and banners without needing to design or code them yourself. They're pre-built, configurable components that you can customize directly in the visual editor to match your brand. By removing engineering setup such as SDK, UI frameworks, and so on, OOTB widgets let you validate new ideas, drive learnings, and scale your experimentation program while maintaining brand consistency through saved design presets and reusable styles. For more information on the Visual Editor and setting up a web experiment, go to [The Visual Editor](/docs/web-experiment/set-up-a-web-experiment#the-visual-editor). 

OOTB widgets also incorporates Amplitude AI to let you design your web experiment through conversational prompts instead of needing the precise details of your brand style guide. 

The OOTB widgets library includes:
- **Buttons**: A call to action (CTA) button. When a customer clicks a CTA button, an action occurs for them. Actions can be taking the customer to another location of your website, like their shopping cart, or taking them to your support agents.
- **Banner**: A notification or messaging bar. Message banners typically announce important information to your customer. These messages can announce expected disruptions in service, highlight sales, or any other communication you want to make.
- **Banner with a button**: A notification or messaging message that also includes a CTA button. This widget combines both a CTA button as well as messaging. Typically, banners with buttons announce a specific action you want your customers to perform. For example, applying a promo code to a shopping cart. 
- **Modal pop-up**: A pop-up modal that appears on your page after a specified amount of time. Modals typically also include CTA buttons and messaging. A pop-up modal typically appears after a few seconds and encourages your customers to take an action. For example, encouraging new users to sign up for an account. 

You can also save your customized widgets to the library for future use. For example, if you create a notification banner that announces a quarterly sale, you can save that customized message and reuse it as needed. All saved widgets are available to everyone in your organization who have permission to create experiments.

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

All changes are visible in real-time through the Visual Editor. 

### Customizing placement of your widgets

Banners and buttons are both movable around your website:
- Banners can appear at the top or bottom of a page. 
- Buttons can appear almost anywhere on the page. When set, the buttons "snaps" to a grid layout. 

You can't customize the location of the pop-up modal. It appears in the center of your page.

For more information on moving modals around your website go to [Moving elements](/docs/web-experiment/set-up-a-web-experiment#move).

### AI styling
When you click the AI style button, Amplitude automatically matches your widget with the style settings from your website. It also creates text for your buttons or other text areas. You can further edit AI-created styles if you want.