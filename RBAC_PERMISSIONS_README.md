# RBAC Permissions Reference System

This system provides a searchable, filterable table of RBAC permissions similar to the event dictionary, with reusable components for referencing permissions throughout the documentation.

## 🏗️ Architecture

### Static JSON Generation
- **Command**: `php artisan rbac:generate-data`
- **Output**: `public/docs/rbac-permissions-data.json`
- **Build Integration**: Automatically generated during site build via `build.sh`

### Components
1. **Searchable Table**: `resources/views/partials/_rbac-permissions-table.antlers.html`
2. **Reference Tag**: `app/Tags/RbacPermission.php`
3. **Reference Pages**: 
   - `/docs/admin/rbac-permissions-reference` - Main table
   - `/docs/admin/rbac-permissions-examples` - Usage examples

## 🚀 Usage

### Generating Data (Development)
```bash
# Generate JSON file
php artisan rbac:generate-data

# Or use the convenience script
./generate-rbac-data.sh
```

### Displaying the Full Table
```antlers
{{partial:partials/rbac-permissions-table}}
```

### Referencing Individual Permissions

#### By Slug
```antlers
{{ rbac_permission slug="manage-api-keys" }}
```

#### By Title
```antlers
{{ rbac_permission:by_title title="Manage cohorts" }}
```

#### List by Product Area
```antlers
{{ rbac_permission:by_product_area area="admin" }}
```

## 📊 Data Structure

The JSON file contains:
```json
{
  "generated_at": "2025-09-30T19:44:46.140488Z",
  "permissions_count": 41,
  "permissions": [
    {
      "id": "unique-id",
      "title": "Permission Name",
      "description": "What this permission allows",
      "product_area": "admin|charts-metrics|data-management|audiences|integrations|session-replay|heatmaps|guides-surveys|resource-center|experiment",
      "advanced": true|false,
      "actions": ["specific", "actions", "list"],
      "slug": "permission-slug"
    }
  ]
}
```

## 🎨 Features

### Searchable Table
- **Search**: Full-text search across titles, descriptions, and actions
- **Filters**: 
  - Product Area dropdown
  - Permission Type (Basic/Advanced)
- **Real-time**: Live filtering with result counts
- **Responsive**: Mobile-friendly design

### Reference System
- **Consistent Styling**: Matches Amplitude design system
- **Color-coded Badges**: Product areas and permission types
- **Rich Information**: Shows description, actions, and metadata
- **Maintainable**: Single source of truth from collection

## 🔄 Build Process

The JSON file is automatically generated during the build process:

1. **Local Development**: Run `./generate-rbac-data.sh` or `php artisan rbac:generate-data`
2. **Production Build**: Automatically included in `build.sh`
3. **Static Site**: JSON file is served as static asset

## 📝 Adding New Permissions

1. Add new permission to `content/collections/rbac_permissions/en/`
2. Follow the blueprint structure in `resources/blueprints/collections/rbac_permissions/rbac_permission.yaml`
3. Regenerate data: `php artisan rbac:generate-data`
4. The permission will automatically appear in the table and be available for referencing

## 🎯 Product Areas

Available product areas and their display names:
- `admin` → Admin
- `charts-metrics` → Charts & Metrics  
- `data-management` → Data Management
- `audiences` → Audiences
- `integrations` → Integrations
- `session-replay` → Session Replay
- `heatmaps` → Heatmaps
- `guides-surveys` → Guides & Surveys
- `resource-center` → Resource Center & Content
- `experiment` → Experiment

## 🔍 Examples

See `/docs/admin/rbac-permissions-examples` for comprehensive usage examples and `/docs/admin/rbac-permissions-reference` for the full searchable table.
