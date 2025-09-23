# Luminal Analytics
[Luminal Analytics](https://luminalanalytics.com) is a specialized data collection system that captures real engagement metrics and ad revenue data for content publishers. It seamlessly sends this enhanced data to Amplitude, providing the complete data picture you need to grow your content business.  

## Considerations
- You must enable this integration in each Amplitude project you want to use it in.
- Luminal Analytics captures engagement data that traditional analytics miss and sends it directly to Amplitude for analysis.
- The system integrates seamlessly with Amplitude, requiring no additional dashboards or tools to learn.

## What Data is Collected
Luminal Analytics collects comprehensive engagement and performance data including:
- **Real Engagement Metrics**: Actual reading time for each article, including sessions where readers arrive, consume content, and leave
- **Reader Behavior Data**: Content consumption patterns, scroll depth, and time spent on different sections of articles
- **Ad Performance Metrics**: Ad load times, viewability rates, and revenue correlation with engagement
- **Core Web Vitals**: Page performance metrics that impact both user experience and ad revenue
- **Content Performance**: Headline effectiveness, content format performance, and reader loyalty metrics
- **Revenue Attribution**: Direct connections between content engagement and ad revenue

## Why It's Useful (Especially for Content Publishers)
Luminal Analytics supercharges your Amplitude analytics by addressing critical data gaps that cost publishers revenue:
- **Enhanced Amplitude Data**: Luminal captures engagement metrics that traditional tracking misses and sends them directly to your Amplitude dashboard, giving you a more complete view of user behavior without leaving the platform you already know and love
- **Better Revenue Attribution in Amplitude**: See direct correlations between content engagement and ad performance within your existing Amplitude reports, enabling more precise revenue optimization decisions
- **Richer User Segmentation**: Luminal's detailed engagement data creates more sophisticated user segments in Amplitude based on actual content consumption, not just page views
- **Complete Engagement Journey**: Track the full user journey in Amplitude, including single-page visits that drive real value but are typically missed by standard analytics implementations
- **Amplitude-Native Ad Insights**: View ad performance data alongside your existing Amplitude behavioral analytics, creating a unified view of content performance and monetization
- **Enhanced Amplitude Cohorts**: Build more accurate cohort analyses in Amplitude using Luminal's real engagement metrics, helping you understand true reader loyalty and lifetime value

## Setup
This guide is complementary to Luminal Analytics' instructions. For detailed technical specifications including complete lists of Events and Properties that Luminal captures and sends to Amplitude, visit the [Luminal Analytics documentation](https://luminalanalytics.com/documentation).

1. Copy your project's API key from Amplitude
2. Get your company key from Luminal (your account team can help with this).
3. Add the Amplitude & Luminal SDKs to your project:  
    - **Via Package**  
	```  
	import * as amplitude from '@amplitude/analytics-browser';
	import { luminalPlugin } from '@luminal/amplitude-plugin';

	(() => {
		amplitude.init('YOUR_AMPLITUDE_PROJECT_KEY');	
		amplitude.add(
			luminalPlugin({
				apiKey: 'YOUR_LUMINAL_COMPANY_KEY',
				integrations: [],
			}),
		);
	})();
	```
   - **Via Script Tag**  
	```  
	<script type='text/javascript' />  
		window.luminalOnLoad = () => {
			console.log('Initializing Luminal Analytics');
			amplitude.add(
			    Luminal.luminalPlugin({
			      apiKey: 'LUMINAL_COMPANY_KEY',
			      integrations: [
			        Luminal.googleAdsIntegration({
			          includeCustomTargeting: false,
			        })
			      ]
			    }),
			);
		};  
	</script>  
	<script type="text/javascript">YOUR AMPLITUDE SCRIPT TAG FROM THE AMPLITUDE UI</script>
	<script src="https://cdn.luminalanalytics.com/luminal.amplitude.plugin.js" />   
	```
3. Using the Live Events view in Amplitude verify that the Luminal events (which will be prefixed with [Luminal] ) are making it into Amplitude.
4. Optionally, create custom dashboards in Amplitude to visualize the new engagement metrics you'll be receiving


## Use Cases
Luminal Analytics integration with Amplitude provides powerful use cases specifically valuable for content publishers:
- **Enhanced Amplitude Analytics**: Combine Luminal's real engagement tracking with Amplitude's powerful behavioral analytics to understand the complete user journey from content discovery to revenue generation. See which content keeps readers engaged and drives actual business value, all within your familiar Amplitude interface.
- **Supercharged Amplitude Cohorts**: Leverage Luminal's detailed reading behavior data to create sophisticated reader cohorts in Amplitude based on actual content consumption patterns, enabling more targeted content strategies and better lifetime value analysis.
- **Amplitude-Native Revenue Optimization**: Use Luminal's ad performance insights within Amplitude's analytics framework to optimize ad placement and formats based on actual engagement patterns, not just page views. Build revenue attribution models directly in Amplitude.
- **Advanced Amplitude Segmentation**: Analyze headline effectiveness, content format performance, and reader loyalty metrics using Amplitude's powerful segmentation tools, informed by Luminal's rich engagement data that traditional tracking misses.
- **Amplitude Performance Intelligence**: Identify and resolve Core Web Vitals issues that impact both reader experience and ad revenue by correlating Luminal's performance data with user behavior patterns in your existing Amplitude dashboards.
- **Complete Amplitude Revenue Attribution**: Build comprehensive attribution models in Amplitude that connect specific content pieces, engagement patterns, and reader behaviors to actual revenue outcomes, enabling data-driven content investment decisions within the analytics platform you already use and trust.
Overall, integrating Luminal Analytics with Amplitude supercharges your existing analytics investment by filling critical data gaps in your view of site and ad performance. Content publishers get a complete view of reader engagement and revenue performance within the Amplitude platform they already know and trust, enabling data-driven decisions that optimize both content strategy and monetization efforts. This integration is particularly valuable for publishers who want to move beyond vanity metrics and leverage Amplitude's powerful analytics capabilities with the complete engagement data they need to drive real business results.
