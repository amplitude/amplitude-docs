<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Statamic\Facades\Collection;

class GenerateGlossaryJson extends Command
{
    protected $signature = 'glossary:generate-json {--output=public/glossary-data.json}';
    protected $description = 'Generate static JSON file for glossary data';

    public function handle()
    {
        $this->info('🚀 Generating glossary JSON...');
        
        // Get all glossary events
        $eventsCollection = Collection::find('glossary_events');
        $propertiesCollection = Collection::find('glossary_properties');
        
        if (!$eventsCollection || !$propertiesCollection) {
            $this->error('❌ Could not find glossary collections');
            return 1;
        }

        // Fetch all properties first (to avoid N+1)
        $allProperties = $propertiesCollection->queryEntries()
            ->get()
            ->keyBy('id')
            ->map(function ($property) {
                return [
                    'id' => $property->id(),
                    'title' => $property->get('title'),
                    'description' => $property->get('description'),
                    'property_type' => $property->get('property_type'),
                    'data_type' => $property->get('data_type', []),
                ];
            });

        $this->info("📊 Found {$allProperties->count()} properties");

        // Fetch all events and map their data
        $events = $eventsCollection->queryEntries()
            ->get()
            ->map(function ($event) use ($allProperties) {
                $relatedPropertyIds = $event->get('related_properties', []);
                
                // Map related properties
                $relatedProperties = collect($relatedPropertyIds)
                    ->map(function ($propertyId) use ($allProperties) {
                        return $allProperties->get($propertyId);
                    })
                    ->filter() // Remove null values
                    ->values()
                    ->toArray();

                return [
                    'id' => $event->id(),
                    'title' => $event->get('title'),
                    'description' => $event->get('description'),
                    'platform' => $event->get('platform', []),
                    'related_properties' => $relatedProperties,
                    'related_properties_count' => count($relatedProperties),
                ];
            })
            ->sortBy('title')
            ->values();

        $this->info("🎯 Found {$events->count()} events");

        // Generate output data
        $outputData = [
            'generated_at' => now()->toISOString(),
            'events_count' => $events->count(),
            'properties_count' => $allProperties->count(),
            'events' => $events->toArray(),
        ];

        // Write to file
        $outputPath = $this->option('output');
        $jsonData = json_encode($outputData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
        if (file_put_contents(base_path($outputPath), $jsonData)) {
            $fileSize = number_format(filesize(base_path($outputPath)) / 1024, 2);
            $this->info("✅ Generated: {$outputPath} ({$fileSize} KB)");
            $this->info("📅 Generated at: " . now()->format('Y-m-d H:i:s'));
            
            return 0;
        } else {
            $this->error("❌ Failed to write file: {$outputPath}");
            return 1;
        }
    }
}