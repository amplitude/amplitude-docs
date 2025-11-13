#!/bin/bash

# Generate RBAC permissions data for local development
echo "Generating RBAC permissions data..."
php artisan rbac:generate-data

echo "RBAC permissions data generated successfully!"
echo "File: public/docs/rbac-permissions-data.json"

# Show file size and permissions count
if [ -f "public/docs/rbac-permissions-data.json" ]; then
    echo "File size: $(du -h public/docs/rbac-permissions-data.json | cut -f1)"
    echo "Permissions count: $(grep -o '"permissions_count": [0-9]*' public/docs/rbac-permissions-data.json | grep -o '[0-9]*')"
fi
