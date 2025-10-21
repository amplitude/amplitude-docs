---
id: 7d0b778f-c493-41c5-b262-b3c9a5eb8cdf
blueprint: agent
title: 'Website Conversion Agent'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760997359
---
{{partial:admonition type="warning" heading="Experimental"}}
The Website Conversion Agent is under active development. The quality of the proposed strategies may vary.
{{/partial:admonition}}

The Website Conversion Agent guides you through optimizing website conversion metrics by helping you select high-impact pages, define clear goals, and generate tailored experiment strategies. It streamlines the process of creating, testing, and deploying web experiments or guides, making it easy for product and growth teams to identify, implement, and measure changes that improve user engagement and business outcomes.

{{partial:collapse name="Agent summary"}}
As you get started with the Dashboard agent, keep the following in mind:

|||
|--|--|
| **Target user** | Growth/Product Managers |
| **Requires** | Analytics (input), Experiment, Guides and Surveys (optional) |

{{/partial:collapse}}

## Requirements

* To generate recommended pages, the organization must have a target conversion event that includes a URL path property configured in the Agent Settings
* To be able to view the variants suggested, the target site needs to have the Experiments SDK set up (or use the chrome extension).
* To be able to create an experiment, the account must have Experiments enabled.
* To be able to create a guide, the account must have Guides and Surveys enabled.

## Create and configure the agent

1. When you create the agent, specify the conversion event that you want to optimize for. The agent uses this information to recommend pages that receive a high volume of the event you select.  
2. Choose the page you want to optimize or input a custom URL in the chat.  
3. The agent analyzes data captured about the page you specify, and proposes strategies to increase conversion based on the event you selected in step 1.   
   1. Strategies can be implementations of an experiment or a guide, and the agent provides a level of confidence for each.   
   2. Expand each strategy for more information.  
   3. Give feedback on the agent’s strategies by clicking **Generate New Strategies** or providing instructions in the chat.  
   4. Click **Explore this Strategy** to instruct the agent to develop an implementation plan.  
4. If you select an Experiment Strategy:  
   1. The agent creates variants based on the strategy you select.  
   2. Review the variants. Click a variant to view an expanded summary, and open the target page to preview the variant (if you have Web Experimentation enabled). If a variant isn’t relevant, remove it from the experiment.   
      * To iterate on a variant, click **Create New with Feedback**. Tell the agent what you want to change about the variant.   
      * Click **Remove** to remove a variant from the experiment.  
   3. When you have the variants you want to include in your experiment, click **Create draft experiment**. The agent creates a new experiment in draft.  
   4. To launch the experiment, view the experiment in the Experiment View to start it  
5. If you select Guide strategy:  
   1. The agent creates and saves a draft of the guide  
   2. To deploy the guide, view the guide in the Guides and Surveys view and deploy