<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;
use Statamic\Facades\Collection;
use Illuminate\Support\Facades\File;

class GenerateMarkdownFiles extends Command
{
    protected $signature = 'generate:markdown-files';
    protected $description = 'Generate raw markdown files for all entries to be served statically';

    public function handle()
    {
        $this->info('Generating markdown files for static serving...');
        
        // Create the markdown directory in public
        $markdownDir = public_path('docs/md');
        if (!File::exists($markdownDir)) {
            File::makeDirectory($markdownDir, 0755, true);
        }
        
        // Clean existing files
        File::cleanDirectory($markdownDir);
        
        $count = 0;
        
        // Process all collections
        foreach (Collection::all() as $collection) {
            $this->info("Processing collection: {$collection->title()}");
            
            // Get entries from the collection
            $entries = Entry::whereCollection($collection->handle());
            
            foreach ($entries as $entry) {
                $this->generateMarkdownFile($entry, $markdownDir);
                $count++;
            }
        }
        
        $this->info("Generated {$count} markdown files in {$markdownDir}");
        
        return 0;
    }
    
    private function generateMarkdownFile($entry, $baseDir)
    {
        // Get the entry's URI and create corresponding directory structure
        $uri = trim($entry->uri(), '/');
        
        if (empty($uri)) {
            $filePath = $baseDir . '/index.md';
        } else {
            // Create directory structure matching the URI
            $pathParts = explode('/', $uri);
            $fileName = array_pop($pathParts) . '.md';
            
            if (!empty($pathParts)) {
                $dirPath = $baseDir . '/' . implode('/', $pathParts);
                if (!File::exists($dirPath)) {
                    File::makeDirectory($dirPath, 0755, true);
                }
                $filePath = $dirPath . '/' . $fileName;
            } else {
                $filePath = $baseDir . '/' . $fileName;
            }
        }
        
        // Get the raw markdown content
        $markdownContent = $this->getRawMarkdownContent($entry);
        
        if ($markdownContent) {
            File::put($filePath, $markdownContent);
            $this->line("Generated: {$filePath}");
        } else {
            $this->warn("Could not get markdown content for: {$entry->uri()}");
        }
    }
    
    private function getRawMarkdownContent($entry)
    {
        // Get the file path for the entry
        $path = $entry->path();
        
        if ($path && file_exists($path)) {
            return file_get_contents($path);
        }
        
        // Try to construct the path manually based on collection structure
        $collection = $entry->collection();
        $slug = $entry->slug();
        $site = $entry->site()->handle();
        
        $possiblePaths = [
            base_path("content/collections/{$collection->handle()}/{$site}/{$slug}.md"),
            base_path("content/collections/{$collection->handle()}/{$slug}.md"),
        ];
        
        foreach ($possiblePaths as $possiblePath) {
            if (file_exists($possiblePath)) {
                return file_get_contents($possiblePath);
            }
        }
        
        return null;
    }
}