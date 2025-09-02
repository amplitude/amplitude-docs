<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Statamic\Facades\Collection;
use Illuminate\Support\Facades\Log;

class GenerateGlossaryJson extends Command
{
    protected $signature = 'glossary:generate-json {--output=public/glossary-data.json}';
    protected $description = 'Generate static JSON file for published glossary data';

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

        // Fetch all published properties first (to avoid N+1)
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

        // Fetch all published events and map their data
        $events = $eventsCollection->queryEntries()
            ->where('status', 'published')
            ->get()
            ->map(function ($event) use ($allProperties) {
                $eventSpecificPropertyIds = $event->get('related_properties', []); // Event-specific properties
                $autoPropertySets = $event->get('default_properties', []);

                // Separate core, product-specific, and event-specific properties
                $corePropertySetId = '7661aa62-ce58-4c11-85dc-d689b5cd2654'; // Core properties set ID
                $coreProperties = [];
                $productSpecificProperties = [];
                $propertySetsInfo = [];

                foreach ($autoPropertySets as $setId) {
                    $propertySet = Entry::find($setId);
                    if ($propertySet && $propertySet->status() === 'published') {
                        $setProperties = $propertySet->get('default_properties', []);
                        $setInfo = [
                            'id' => $setId,
                            'title' => $propertySet->get('title'),
                            'properties' => collect($setProperties)
                                ->map(function ($propertyId) use ($allProperties) {
                                    return $allProperties->get($propertyId);
                                })
                                ->filter()
                                ->values()
                                ->toArray()
                        ];
                        
                        $propertySetsInfo[] = $setInfo;
                        
                        if ($setId === $corePropertySetId) {
                            $coreProperties = array_merge($coreProperties, $setProperties);
                        } else {
                            $productSpecificProperties = array_merge($productSpecificProperties, $setProperties);
                        }
                    }
                }

                // Map core properties
                $corePropertiesMapped = collect($coreProperties)
                    ->map(function ($propertyId) use ($allProperties) {
                        return $allProperties->get($propertyId);
                    })
                    ->filter()
                    ->values()
                    ->toArray();

                // Map product-specific properties
                $productSpecificPropertiesMapped = collect($productSpecificProperties)
                    ->map(function ($propertyId) use ($allProperties) {
                        return $allProperties->get($propertyId);
                    })
                    ->filter()
                    ->values()
                    ->toArray();

                // Map event-specific properties
                $eventSpecificPropertiesMapped = collect($eventSpecificPropertyIds)
                    ->map(function ($propertyId) use ($allProperties) {
                        return $allProperties->get($propertyId);
                    })
                    ->filter()
                    ->values()
                    ->toArray();

                // Combine all properties for backwards compatibility
                $allPropertyIds = array_unique(array_merge($coreProperties, $productSpecificProperties, $eventSpecificPropertyIds));
                $relatedProperties = collect($allPropertyIds)
                    ->map(function ($propertyId) use ($allProperties) {
                        return $allProperties->get($propertyId);
                    })
                    ->filter()
                    ->values()
                    ->toArray();

                return [
                    'id' => $event->id(),
                    'title' => $event->get('title'),
                    'description' => $event->get('description'),
                    'platform' => $event->get('platform', []),
                    'product_area' => $event->get('product_area', []),
                    'related_properties' => $relatedProperties,
                    'related_properties_count' => count($relatedProperties),
                    'core_properties' => $corePropertiesMapped,
                    'core_properties_count' => count($corePropertiesMapped),
                    'product_specific_properties' => $productSpecificPropertiesMapped,
                    'product_specific_properties_count' => count($productSpecificPropertiesMapped),
                    'event_specific_properties' => $eventSpecificPropertiesMapped,
                    'event_specific_properties_count' => count($eventSpecificPropertiesMapped),
                    'property_sets' => $propertySetsInfo,
                ];
            })
            ->sortBy('title')
            ->values();

        $this->info("🎯 Found {$events->count()} published events");

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