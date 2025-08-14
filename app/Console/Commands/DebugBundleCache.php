<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class DebugBundleCache extends Command
{
    protected $signature = 'bundle:debug {package?}';
    protected $description = 'Debug bundle phobia cache status';

    public function handle()
    {
        $package = $this->argument('package');
        
        if ($package) {
            $this->debugPackage($package);
        } else {
            $this->info('Available cached packages:');
            // List all bundle cache keys (requires Redis or similar)
            $this->info('Run with specific package name for details');
        }
    }
    
    private function debugPackage($package)
    {
        $cacheKey = "bundle_phobia:" . $package;
        $cached = Cache::get($cacheKey);
        $timestamp = Cache::get($cacheKey . ':timestamp');
        
        if ($cached) {
            $this->info("✅ Package '{$package}' is cached");
            $this->line("   Cached at: " . ($timestamp ?? 'unknown'));
            $this->line("   Success: " . ($cached['_bundlephobia_success'] ? 'Yes' : 'No'));
            if ($cached['_bundlephobia_success']) {
                $this->line("   Version: " . $cached['version']);
                $this->line("   Size: " . $cached['size_gzip_kb'] . ' kB');
            } else {
                $this->line("   Error: " . $cached['_bundlephobia_error']);
            }
        } else {
            $this->error("❌ Package '{$package}' is not cached");
        }
    }
}
