<?php

namespace App\Listeners;

use Statamic\Events\EntrySaved;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Statamic\Facades\CP\Toast;

class GlossaryEntryListener
{
    /**
     * Handle the event.
     */
    public function handle(EntrySaved $event): void
    {
        $entry = $event->entry;
        
        // Check if the entry belongs to a glossary-related collection
        if (in_array($entry->collectionHandle(), ['glossary_events', 'glossary_properties'])) {
            try {
                Log::info('Regenerating glossary JSON due to entry save', [
                    'collection' => $entry->collectionHandle(),
                    'entry_title' => $entry->get('title'),
                    'entry_id' => $entry->id()
                ]);
                
                // Run the glossary generation command and capture exit code
                $exitCode = Artisan::call('glossary:generate-json');
                
                // Check if command was successful
                if ($exitCode === 0) {
                    Log::info('Glossary JSON regenerated successfully');
                    
                    // Show success toast notification
                    Toast::success('Glossary JSON generated successfully! The documentation has been updated.')
                        ->duration(4000);
                } else {
                    Log::error('Glossary generation command failed', [
                        'exit_code' => $exitCode,
                        'collection' => $entry->collectionHandle(),
                        'entry_id' => $entry->id()
                    ]);
                    
                    // Show error toast notification
                    Toast::error('Failed to generate Glossary JSON. Please check the logs for details.')
                        ->duration(6000);
                }
                
            } catch (\Exception $e) {
                Log::error('Failed to regenerate glossary JSON', [
                    'error' => $e->getMessage(),
                    'collection' => $entry->collectionHandle(),
                    'entry_id' => $entry->id()
                ]);
                
                // Show error toast notification with exception details
                Toast::error('An error occurred while generating Glossary JSON: ' . $e->getMessage())
                    ->duration(6000);
            }
        }
    }
}