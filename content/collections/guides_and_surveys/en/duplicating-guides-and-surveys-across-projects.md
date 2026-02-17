---
id: 45e19199-60ed-4e35-9998-dc51019b4862
blueprint: guides_and_survey
title: 'Duplicating Across Projects'
landing: false
updated_by: 83fbb88a-75e7-45dc-aed3-39c10967893c
updated_at: 1771358278
---
You may have multiple projects within your organization for a variety of reasons. For example, you might want to differentiate between different environments (such as staging or production or to differentiate between different geolocations of customers). Duplicating a guide, survey, or theme across projects lets you from having to recreate the same information for each of your environments. This saves time as well as encourages consistency across your projects. 

{{partial:admonition type="note" heading="Duplication in Experiments"}}
You cannot duplicate a guide or survey across your projects that is being used in an experiment. If you want the same guide or survey in experiments in multiple projects, you must manually recreate it.
{{/partial:admonition}}

When you duplicate a guide, survey, or theme to a new project, the project treats the duplicated content as a completely new entity. None of the previous analytics are copied to the new project. If you want to move a guide, survey, or theme from one project to another, copy it to the desitination project and then delete it from the originating project.

##### to duplicate a guide or survey across projects

1. Go to either *Guides and Surveys > Guides* or *Guides and Surveys > Surveys* and select the one that you want to duplicate.
2. Click the **three-dot** menu item for the one you want and click **Duplicate across projects**.
3. Click the Destination drop-down and select the project or projects where you want your guide, survey, or theme duplicated. 
4. For guides and survyes select which of the following elements you want to duplicate:
   * Targeting setup
   * Trigger setup
   * Limits setup
   * Theme
   * Translations
5. Click **Duplicate**. 

##### To duplicate a theme across projects

1. Go to *Guides and Surveys > Themes* and find the theme you want to duplicate.
2. Click the **three-dot** menu item and select **Duplicate across projects**.
3. Click the **Destination** drop-down and select the project or projects where you want your theme duplicated. 
4. Click **Duplicate**.

### Re-duplicating a guide, survey, or theme.

If you duplicate a guide, servey, or theme to a project that already contains the dulicated content, Amplitude overwrites the content in the target project. 

For example, you create a guide (Guide-1) in Project A. You duplicate Guide1 to Project B. You then make changes to Guide-1 in Project A and want to re-duplicate the guide to Project B again. Amplitude overwrites the original Guide-1 in Project B with the newest version. It does not keep both versions of Guide-1.

When you select the project where you want to duplicate your guide, survey, or theme, Amplitude applies a badge to denote whether the entity you're duplicating is new for the project or if it already exists on the target project. You can click into the Preview changes section for more information.