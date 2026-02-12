---
id: 05c26116-31bf-4215-bc7b-8bc230655839
blueprint: guides_and_survey
title: Settings
landing: false
updated_by: 15756874-6eaf-4a8c-8779-bd4081ba41b6
updated_at: 1750961188
landing_blurb: Discover the options available to Resource Center, and how they help you customize the experience.
---
The Resource Center settings option applies to the Resource Center as a whole. 

##### To access the Settings page

From the Resource Center main page, click **Settings**. 

## Targeting
Targeting done from the Resource Center settings page applies to the entire Resource Center module. This is different from the targeting you can apply to either the [source content](/docs/guides-and-surveys/resource-center-source-content) or the [Resource Center sets](/docs/guides-and-surveys/resource-center-targeting-recommendation-sets).

You would use this targeting if, for example, you only wanted the widget to appear to users in specific geographies or for users with specific job titles. 

The other types of targeting you may have applied are still in effect. Because of this, don't try to restrict the widget, recommendation sets, and source content at the same time until you are very familiar with how your users may interact with the Resource Center recommendations. By using all three types of targeting at the same time, you risk restricting content from users who need to receive recommendations from the Resource Center. 

### General
The general settings let you specify the following:
- **Enable Resource Center**: Turns the entire widget on or off. If this is set to Off, the Resource Center isn't available for your users. 
- **Autopilot**: Automatically suggests articles and information based on what page your user is on when they click the Resource Center icon. By default, Autopilot is set to On. 

### Quick links  
The Quick links section adds permanent links to the bottom of the Resource Center widget. These are links to your main website, specific guides or surveys, videos, opening a support chat widget, or similar. 

The Quick links section also provides a primary call to action (CTA) button that encourages user interaction.  

**To add a quick link**

1. Set the Quick links enable to **On**.
2. Click **Add link**.
3. Click **Link** to specify what type of link you want.
4. Enter the link URL.
5. In the Label field, enter the name of the link. 
7. Click **Save Changes**.

**To add a CTA button**

1. Click the Primary CTA slider to **On**.
2. In the CTA Label field, enter the name of the CTA.
3. Click **Link** to specify what type of link you want.
4. Enter the link URL.
5. Click **Save Changes**.

### Text customization
The Text customization section lets you customize the text on the Resource Center itself. You can specify customized content for: 
- Resource center name
- Search input placeholder text
- Quick links label
- View article button label
- Featured content section header
- No results title
- No results description

### Launcher
The launcher is the icon that lets your users interact with the Resource Center. 

#### Pre-built icon
By default, this is a pre-built icon that appears on the bottom-right corner of your pages. 

In the pre-built icon, customize the launcher in the following ways:
- **Style**: You can specify whether you want to use an icon or a self-uploaded image. 
- **Bottom position**: The location where the launcher appears:
    - Top right
    - Top left
    - Bottom right
    - Bottom left
- **Offset**: Modifies the exact horizontal or vertical position of the icon.
- **Z-index**: Specifies the specific CSS position where the icon appears. 

Alternately, customize the launcher by:
- Custom element (no code)
- With Code

#### Custom element (no code)
The custom element feature lets you specify a pre-existing element on your site that you can use to launch the Resource Center. You could use images, Page headers, logos, buttons, or anything else that appears on your website as the launched. 

**To specify a target**
1. Select Custom element (no code).
2. Click **Select target**. 
3. Enter your website. 
4. When your website appears, click the element that you want. 
{{partial:admonition type="note" heading=""}}
Alternately, specify the specific CSS or XPath selector in the field.
{{/partial:admonition}}: 

#### With Code
Use the Guides and Surveys [SDK](/docs/guides-and-surveys/sdk) to directly code the launcher you want. 

## Theme
Specify a theme for the Resource Center widget. If you previously created a theme for your Guides and Surveys, your theme appears as an option for the Resource Center. 
For more information about creating themes, go to [Themes](/docs/guides-and-surveys/themes).
