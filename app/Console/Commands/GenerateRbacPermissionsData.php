<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Statamic\Facades\Entry;

class GenerateRbacPermissionsData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rbac:generate-data {--output=public/docs/rbac-permissions-data.json}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate RBAC permissions data as JSON file for static site';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating RBAC permissions data...');

        // Get all RBAC permissions from the collection
        $permissions = collect(Entry::whereCollection('rbac_permissions'))
            ->map(function ($entry) {
                return [
                    'id' => $entry->id(),
                    'title' => $entry->get('title'),
                    'description' => $entry->get('description'),
                    'product_area' => $entry->get('product_area'),
                    'advanced' => $entry->get('advanced', false),
                    'actions' => $entry->get('actions', []),
                    'slug' => $entry->slug(),
                ];
            })
            ->values();

        // Create the data structure
        $data = [
            'generated_at' => now()->toISOString(),
            'permissions_count' => $permissions->count(),
            'permissions' => $permissions,
        ];

        // Get output path
        $outputPath = $this->option('output');
        
        // Ensure directory exists
        $directory = dirname($outputPath);
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        // Write JSON file
        File::put($outputPath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

        $this->info("Generated RBAC permissions data with {$permissions->count()} permissions");
        $this->info("Output: {$outputPath}");

        return Command::SUCCESS;
    }
}
