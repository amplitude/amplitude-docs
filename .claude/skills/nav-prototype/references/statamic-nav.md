# Statamic nav tree format

## Node types

**Page entry** — renders as a nav link to a content document:
```yaml
-
  id: <uuid>          # unique nav node UUID (not the content UUID)
  entry: <uuid>       # content document UUID — resolved to slug/title by Statamic
  title: 'Override'  # optional: overrides the document's own title
```

**Section group** — renders as a collapsible accordion header with child items:
```yaml
-
  id: <uuid>
  title: 'Section name'   # required; displayed as the group header
  children:
    - ...                 # page entries or nested section groups
```

**URL entry** — renders as a direct link (less preferred; hard to maintain):
```yaml
-
  id: <uuid>
  title: 'Link label'
  url: /docs/some/path
```

## Building the UUID index

To resolve `entry:` values to human-readable titles, read the frontmatter from each content file in the related collection:

```
content/collections/<collection-name>/en/*.md
```

Each file's YAML frontmatter contains:
- `id:` — the document UUID (matches `entry:` values in nav trees)
- `title:` — the document's display title

Build: `{ entry_uuid → { title, file_path } }`

## UUID uniqueness rule

Nav node `id:` values must be unique across the entire nav file. When creating new section groups (which aren't backed by content documents), generate a UUIDv4 or use a deterministic synthetic UUID. Never reuse an existing `id:` value from the same file.

## Active nav file

The live nav is `content/trees/navigation/en/<nav-name>.yaml`.
Prototype variants use the naming convention `<nav-name>.option{N}.yaml`.
The original is preserved as `<nav-name>.original.yaml`.

## Switcher script pattern

```bash
cp "$SOURCE" "$TARGET"   # SOURCE = .option{N}.yaml, TARGET = live .yaml
```
