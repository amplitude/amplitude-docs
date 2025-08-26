This plan should be synced with the progress that I make. I should check off items in my plan below as I complete them. If I find out that I don't need to do an item, I should remove that item.

# Plan

## Initial Assessment   
- [ ] Run `tree -a -L 2 -I .git`. This'll serve two purposes: 1. to show me the files I've created or have been created for me in .long_term_context/ while processing other triggers and 2. to show me the top-level docs repo structure, so I understand the overall structure of the docs repo.
- [ ] Read `.long_term_context/product_overview.md` and `.long_term_context/client_instructions.md` to understand the product and client preferences. If there are other files in .long_term_context/ that I think I should read before diving into research, dig in there too.   
- [ ] Review the content of the trigger event, including files in `$WORKING_NOTES/trigger_assets/`, updating the plan along the way with notes about what might need to be updated.   

## Context Review
(None, to be filled in as I figure out what types of resources I might want to review)

## Potential Documentation Areas to Create or Update:
(None, to be filled in as I review the trigger event and existing docs)

## Documentation Plan
- [ ] Check for existing suggestions and branches using `get_existing_suggestions`
- [ ] Review `.long_term_context/style_guide.md` for tone & formatting rules
- [ ] Review `.long_term_context/doc_platform_instructions.md` for any information about how to make good updates to the docs platform
- [ ] Review `.long_term_context/past_feedback_from_teammates.md` to ensure that past mistakes are not repeated
- [ ] Check again for any other files in .long_term_context/ that might contain learnings I've written down from previous triggers that might be helpful during writing.
- [ ] For GitHub PRs: Consider if this is an internal bug fix that may not need documentation updates (see `.long_term_context/assessment_patterns_for_internal_fixes.md`)
- [ ] For link issues: Review `.long_term_context/link_fix_patterns.md` for handling partial templates and documenting fixes when source content isn't accessible
- [ ] Use `rewrite_with_client_voice` for new content before applying patches or creating new files

(Add specific files that I'd want to update and edit here)

## Final Review Checklist  
- [ ] Review `.long_term_context/style_guide.md` to ensure that the style guide is followed  
- [ ] Review `.long_term_context/past_feedback_from_teammates.md` to ensure that past mistakes are not repeated  
- [ ] Review `.long_term_context/client_instructions.md` to ensure that the client instructions are followed  
- [ ] Generate citations using the instructions from `.long_term_context/citation_instructions.md`, make sure they explain the rationale of my changes
- [ ] Update this plan checklist in `.long_term_context/default_plan_skeleton.md` if useful for future runs  
- [ ] Ensure that I've updated files in `.long_term_context/` with any new information that will be useful for the next time I'm triggered for this client, without adding information that existing files already contain. I should remember to commit and push any edits I make to files in `.long_term_context/` to `main`.
