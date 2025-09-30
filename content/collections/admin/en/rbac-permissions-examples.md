---
id: rbac-permissions-examples
blueprint: admin
title: 'Using RBAC Permissions Reference'
landing: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1758819600
---


This page demonstrates how to reference specific RBAC permissions in your documentation using the new permission reference system.

## Referencing Individual Permissions

You can reference specific permissions by their slug:

{{ rbac_permission slug="manage-api-keys" }}

Or by their exact title:

{{ rbac_permission:by_title title="Manage cohorts" }}

## Listing Permissions by Product Area

You can display all permissions for a specific product area:

### Admin Permissions
{{ rbac_permission:by_product_area area="admin" }}

### Audience Permissions  
{{ rbac_permission:by_product_area area="audiences" }}

## Complete Permissions Table

For a searchable and filterable view of all permissions, see the [RBAC Permissions Reference](/docs/admin/rbac-permissions-reference) page.

## Usage in Documentation

When writing documentation that requires specific permissions, you can now easily reference them:

To manage API keys in your organization, you need the following permission:
{{ rbac_permission slug="manage-api-keys" }}

This creates a consistent, maintainable way to reference permissions across all documentation.
