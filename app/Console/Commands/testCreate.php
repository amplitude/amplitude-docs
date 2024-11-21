<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Statamic\Facades\Collection;
use Statamic\Facades\Site;

class testCreate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-create
                            {collection : The name of the collection} 
                            {site : The site handle (e.g., "en", "fr")} 
                            {slug : The slug for the entry} 
                            {title : The title of the entry}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $collectionHandle = $this->argument('collection');
        $siteHandle = $this->argument('site');
        $slug = $this->argument('slug');
        $title = $this->argument('title');

        // Ensure the collection exists
        $collection = Collection::find($collectionHandle);
        if (!$collection) {
            $this->error("Collection '{$collectionHandle}' does not exist.");
            return Command::FAILURE;
        }

        // Ensure the site exists
        $site = Site::get($siteHandle);
        if (!$site) {
            $this->error("Site '{$siteHandle}' does not exist.");
            return Command::FAILURE;
        }

        // Create the entry
        $entry = Entry::make()
            ->collection($collectionHandle)
            ->locale($siteHandle) // Set the site handle
            ->slug($slug)
            ->data([
                'title' => $title,
            ]);

        try {
            $entry->save();
            $this->info("Entry '{$title}' created successfully in site '{$siteHandle}' with slug '{$slug}'.");
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error("Failed to create entry: " . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
