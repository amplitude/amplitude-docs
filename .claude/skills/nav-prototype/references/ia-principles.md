# IA diagnostic framework

## Structural problems to diagnose

Walk the parsed nav tree and flag each of these:

| Problem | Signal | Design principle violated |
|---------|--------|--------------------------|
| **Orphaned top-level items** | Page entries at depth 1 between or below section groups — no parent group | Gestalt proximity: unrelated items visually cluster as peers |
| **Inverted information architecture** | Technical reference (SDK/API) sections appear before conceptual/product sections | Progressive disclosure: installation detail should follow understanding |
| **Inconsistent depth** | Some items of equal importance are in groups while adjacent items of equal importance sit flat | False hierarchy signals mislead users about item importance |
| **Verbose repetitive naming** | Items repeat a word already present in the page title or parent section title | Cognitive load: redundant words force users to parse longer labels |
| **Too many ungrouped peers** | More than 7 items at the same level with no grouping | Miller's Law: working memory holds ~7 ± 2 items |
| **Non-sequential task flow** | Steps needed in a workflow are in reverse order or scattered across sections | Mental model alignment: users expect content to match their task sequence |
| **Content-type mixing** | Conceptual pages, how-to pages, and reference pages mixed in the same section | Information scent: users can't predict what they'll find in a section |

## Three architecture patterns

For each nav section, choose the pattern that best fits the content and persona:

### Pattern 1: User journey architecture

Organize around the user's progression through adoption:
```
orientation → build → configure → customize → install → admin
```

**Best for**: Products where users follow a predictable onboarding path.

**Sections**: Getting started → [Product A] → [Product B] → Configuration → Customization → Instrumentation/SDK → Reference/Admin

**Design rationale**: Progressive disclosure — show conceptual orientation first, operational detail later.

### Pattern 2: Product-first with shared platform section

Organize around product types as the primary axis. Cross-cutting concerns live in a "Platform" section.

**Best for**: Products with multiple distinct tools (e.g., Guides vs. Surveys) where users work in one product at a time.

**Sections**: Getting started → [Product A] → [Product B] → Platform (shared features) → Customization → Instrumentation → Admin

**Design rationale**: Gestalt similarity — "Platform" visually signals "applies to everything."

### Pattern 3: Flattened zones with static section headers

Remove all collapsible nesting. Use non-interactive section labels as visual dividers. All items always visible.

**Best for**: Users who are exploring or new to the product; shorter nav sections.

**Sections**: Same as Pattern 1 but rendered as flat zones, not collapsible accordions.

**Design rationale**: Visibility of system status (Nielsen) — users always see the full scope without toggle interaction. Improves glanceability.

**Trade-off**: Nav becomes longer. Requires CSS/template change to `side-nav.antlers.html` to render group labels as non-interactive dividers (add `data-static="true"` modifier).

## Design principles checklist

When writing the diagnosis section of the report, cite at least 2 of these:

- **Progressive disclosure** — show orientation before detail, concept before mechanism
- **Gestalt proximity** — related items must be visually close; unrelated items must be separated
- **Miller's Law** — no more than ~7 peers at the same level without grouping
- **Mental model alignment** — ordering should reflect users' task sequence, not product internals
- **Information scent** — section names must predict their contents accurately
- **Visibility of system status** — users should always know where they are in the navigation

## SDK naming convention

Inside a section already scoped to a product (e.g., "Instrumentation" inside a Guides & Surveys nav), drop the product name prefix from SDK items:

- ❌ "Guides and Surveys Web SDK" → ✅ "Web SDK"
- ❌ "Guides and Surveys iOS SDK" → ✅ "iOS SDK"
