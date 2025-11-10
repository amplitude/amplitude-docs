<?php

namespace App\Tags;

use Statamic\Facades\Entry;
use Statamic\Tags\Tags;

class RbacPermission extends Tags
{
    protected static $handle = 'rbac_permission';

    /**
     * Get RBAC permission details by slug or title
     * Usage: {{ rbac_permission:slug }} or {{ rbac_permission slug="permission-slug" }}
     */
    public function index()
    {
        $slug = $this->params->get('slug') ?: $this->tag;
        
        if (!$slug) {
            return '';
        }

        $permission = Entry::whereCollection('rbac_permissions')
            ->where('slug', $slug)
            ->first();

        if (!$permission) {
            // Try to find by title if slug doesn't work
            $permission = Entry::whereCollection('rbac_permissions')
                ->where('title', $slug)
                ->first();
        }

        if (!$permission) {
            return "<span class=\"text-red-500\">Permission not found: {$slug}</span>";
        }

        return $this->renderPermission($permission);
    }

    /**
     * Get permission by title
     * Usage: {{ rbac_permission:by_title title="Manage API keys" }}
     */
    public function byTitle()
    {
        $title = $this->params->get('title');
        
        if (!$title) {
            return '';
        }

        $permission = Entry::whereCollection('rbac_permissions')
            ->where('title', $title)
            ->first();

        if (!$permission) {
            return "<span class=\"text-red-500\">Permission not found: {$title}</span>";
        }

        return $this->renderPermission($permission);
    }

    /**
     * List all permissions for a product area
     * Usage: {{ rbac_permission:by_product_area area="admin" }}
     */
    public function byProductArea()
    {
        $area = $this->params->get('area');
        
        if (!$area) {
            return '';
        }

        $permissions = Entry::whereCollection('rbac_permissions')
            ->where('product_area', $area)
            ->get();

        if ($permissions->isEmpty()) {
            return "<p class=\"text-gray-500\">No permissions found for product area: {$area}</p>";
        }

        $output = "<ul class=\"list-disc list-inside space-y-2\">";
        foreach ($permissions as $permission) {
            $output .= "<li>" . $this->renderPermission($permission, false) . "</li>";
        }
        $output .= "</ul>";

        return $output;
    }

    /**
     * Render a single permission
     */
    private function renderPermission($permission, $showBadges = true)
    {
        $title = $permission->get('title');
        $description = $permission->get('description');
        $productArea = $permission->get('product_area');
        $advanced = $permission->get('advanced', false);
        $actions = $permission->get('actions', []);

        $productAreaMap = [
            'charts-metrics' => 'Charts & Metrics',
            'experiment' => 'Experiment',
            'data-management' => 'Data Management',
            'audiences' => 'Audiences',
            'integrations' => 'Integrations',
            'session-replay' => 'Session Replay',
            'heatmaps' => 'Heatmaps',
            'guides-surveys' => 'Guides & Surveys',
            'resource-center' => 'Resource Center & Content',
            'admin' => 'Admin'
        ];

        $output = "<div class=\"rbac-permission-reference border border-gray-200 rounded-lg p-4 my-4\">";
        
        // Title and badges
        $output .= "<div class=\"flex items-start justify-between mb-2\">";
        $output .= "<h4 class=\"font-semibold text-lg text-gray-900\">{$title}</h4>";
        
        if ($showBadges) {
            $output .= "<div class=\"flex gap-2 ml-4\">";
            
            if ($productArea) {
                $areaLabel = $productAreaMap[$productArea] ?? $productArea;
                $output .= "<span class=\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800\">{$areaLabel}</span>";
            }
            
            $typeClass = $advanced ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800';
            $typeLabel = $advanced ? 'Advanced' : 'Basic';
            $output .= "<span class=\"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {$typeClass}\">{$typeLabel}</span>";
            
            $output .= "</div>";
        }
        
        $output .= "</div>";

        // Description
        if ($description) {
            $output .= "<p class=\"text-gray-700 mb-3\">{$description}</p>";
        }

        // Actions
        if (!empty($actions)) {
            $output .= "<div class=\"text-sm\">";
            $output .= "<strong class=\"text-gray-900\">Specific Actions:</strong>";
            $output .= "<ul class=\"list-disc list-inside mt-1 text-gray-600\">";
            foreach ($actions as $action) {
                $output .= "<li>{$action}</li>";
            }
            $output .= "</ul>";
            $output .= "</div>";
        }

        $output .= "</div>";

        return $output;
    }
}
