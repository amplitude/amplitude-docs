---
id: 2cc93767-a20b-4741-a07f-1939ec508e79
blueprint: web_experiment
title: 'Web Experiment Out-of-the-box Widgets'
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

You can also save your customized widgets to the library for future use. For example, if you create a notification banner that announces a quarterly sale, you can save that customized message and reuse it as needed. Everyone in your organization who has permission to create experiments can access all saved widgets.

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

When you select a widget, the element toolbar lets you delete it or save it to the library.

The Visual Editor shows all changes in real time. 

### Customizing placement of your widgets

You can move banners and buttons around your website:
- Banners can appear at the top or bottom of a page. 
- Buttons can appear almost anywhere on the page. When set, the buttons snap to a grid layout. 

You can't customize the location of the pop-up modal. It appears in the center of your page.

For more information on moving banners and buttons, go to [Moving elements](/docs/web-experiment/set-up-a-web-experiment#move).

### AI Stylizer

AI Stylizer is an AI assistant in the Visual Editor that helps you refine copy, apply brand-aware styling, and clean up elements such as spacing, alignment, and hierarchy on your OOTB widgets. AI Stylizer also works on existing page elements—headlines, CTAs, banners, modals, and text blocks. You don't need the precise details of your brand style guide, design, or coding skills. You can use natural-language prompts instead to align your widgets or elements to your brand's style.

When you select a widget or any text-based element in the Visual Editor, the AI Stylizer control appears in the element toolbar. Select it to open the AI Stylizer popover. You can describe what you want in plain language. 

For example, you could enter "Make this headline more urgent" or "Shorten this and make it easier to read" or "Make this feel more premium," or "Make the CTA more action-oriented." Stylizer updates the selected element based on your request. 

You can use AI Stylizer in the following ways: 

**On OOTB widgets:** When you use AI Stylizer on a pre-built widget (modal, CTA, banner, or promo block), it adapts the element to your brand. This means that it updates typography, colors, and spacing to match your site and can create or refine headline and CTA text so the component looks like part of your product.

**On existing page elements:** When you insert pre-built elements in the Visual Editor, AI Stylizer adapts them to your brand and content. For example:
- **Headlines:** Make them more compelling or more urgent, simplify and clarify the information in the topic or tailor for new visitors.
- **Buttons (CTAs):** Make them more action-oriented, increase contrast and visibility, and customize for returning customers.
- **Banners:** Make them more prominent, simplify the messaging, and customize for new visitors.
- **Text blocks:** Simplify and clarify, shift from features to benefits, and customize for mobile users.

You can choose a preset prompt or enter your own, custom, prompt. AI Stylizer generates multiple headline or copy variants in a single interaction so you can pick which one you want. You can also revert to a previous AI-generated version from the AI Stylizer version history. You can continue to edit all AI-created styles and copy after you apply them. For example, select a hero headline and ask AI Stylizer to make it more urgent or clearer. Or, select a CTA banner and ask it to simplify the copy and fix spacing so the banner looks balanced and on-brand.

You can't use AI Stylizer on an element that contains an embedded OOTB widget. If you try, the product shows a message explaining that this case isn't supported.