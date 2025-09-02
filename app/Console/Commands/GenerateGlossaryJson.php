<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Statamic\Facades\Collection;

class GenerateGlossaryJson extends Command
{
    protected $signature = 'glossary:generate-json {--output=public/docs/glossary-data.json}';
    protected $description = 'Generate static JSON file for published glossary data with three property types';

    public function handle()
    {
        $this->info('🚀 Generating glossary JSON...');
        
        // Get collections
        $eventsCollection = Collection::find('glossary_events');
        $propertiesCollection = Collection::find('glossary_properties');
        
        if (!$eventsCollection || !$propertiesCollection) {
            $this->error('❌ Could not find glossary collections');
            return 1;
        }

        // Fetch all published properties (indexed by ID for quick lookup)
        $allProperties = $propertiesCollection->queryEntries()
            ->where('status', 'published')
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

        $this->info("📊 Found {$allProperties->count()} published properties");

        // Fetch all published events
        $events = $eventsCollection->queryEntries()
            ->where('status', 'published')
            ->get()
            ->map(function ($event) use ($allProperties) {
                // Get property set IDs from the three blueprint fields
                $corePropertySetIds = $event->get('core_properties', []);
                $productPropertySetIds = $event->get('product_properties', []);
                $eventSpecificPropertyIds = $event->get('related_properties', []);
                
                // Helper function to get properties from property sets
                $getPropertiesFromSets = function($setIds) use ($allProperties) {
                    $properties = [];
                    foreach ($setIds as $setId) {
                        $propertySet = Entry::find($setId);
                        if ($propertySet && $propertySet->status() === 'published') {
                            $setProperties = $propertySet->get('default_properties', []);
                            $properties = array_merge($properties, $setProperties);
                        }
                    }
                    return $properties;
                };

                // Get property IDs for each type
                $corePropertyIds = $getPropertiesFromSets($corePropertySetIds);
                $productSpecificPropertyIds = $getPropertiesFromSets($productPropertySetIds);

                // Map property IDs to full property objects
                $mapProperties = function($propertyIds) use ($allProperties) {
                    return collect($propertyIds)
                        ->map(fn($id) => $allProperties->get($id))
                        ->filter()
                        ->values()
                        ->toArray();
                };

                $corePropertiesMapped = $mapProperties($corePropertyIds);
                $productSpecificPropertiesMapped = $mapProperties($productSpecificPropertyIds);
                $eventSpecificPropertiesMapped = $mapProperties($eventSpecificPropertyIds);

                return [
                    'id' => $event->id(),
                    'title' => $event->get('title'),
                    'description' => $event->get('description'),
                    'platform' => $event->get('platform', []),
                    'product_area' => $event->get('product_area', []),
                    
                    // Three property buckets
                    'core_properties' => $corePropertiesMapped,
                    'core_properties_count' => count($corePropertiesMapped),
                    
                    'product_specific_properties' => $productSpecificPropertiesMapped,
                    'product_specific_properties_count' => count($productSpecificPropertiesMapped),
                    
                    'event_specific_properties' => $eventSpecificPropertiesMapped,
                    'event_specific_properties_count' => count($eventSpecificPropertiesMapped),
                ];
            })
            ->sortBy('title')
            ->values();

        $this->info("🎯 Found {$events->count()} published events");

        // Generate clean output data
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