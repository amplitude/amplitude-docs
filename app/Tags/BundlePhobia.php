<?php

namespace App\Tags;

use Statamic\Tags\Tags;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class BundlePhobia extends Tags
{
    /**
     * Set parameters manually (for API usage)
     *
     * @param $parameters
     * @return $this
     */
    public function setParameters($parameters)
    {
        $this->params = collect($parameters);
        return $this;
    }

    /**
     * The {{ bundle_phobia }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        $package = $this->params->get('package');
        
        if (empty($package)) {
            return $this->getFallbackData('Package name is required');
        }

        // Check cache first
        $cacheKey = "bundle_phobia:" . $package;
        $cached = Cache::get($cacheKey);
        
        if ($cached !== null) {
            return $cached;
        }

        // Determine timeout based on environment
        $timeout = $this->isSSGBuild() ? 30 : 10; // Longer timeout during build
        
        try {
            $data = $this->fetchBundleData($package, $timeout);
            
            if ($data) {
                // Cache longer during SSG build, shorter in development
                $cacheDuration = $this->isSSGBuild() ? 86400 : 3600; // 24h vs 1h
                Cache::put($cacheKey, $data, $cacheDuration);
                return $data;
            }
            
            return $this->getFallbackData('API returned empty data');
            
        } catch (\Exception $e) {
            Log::warning('BundlePhobia API error', [
                'package' => $package,
                'error' => $e->getMessage(),
                'environment' => app()->environment(),
                'is_ssg_build' => $this->isSSGBuild()
            ]);
            
            // Cache failure for shorter time to prevent repeated API calls
            $fallback = $this->getFallbackData($e->getMessage());
            Cache::put($cacheKey, $fallback, 300); // 5 minutes
            
            return $fallback;
        }
    }

    /**
     * Detect if we're in an SSG build context
     */
    protected function isSSGBuild(): bool
    {
        return app()->runningInConsole() || 
               config('app.env') === 'production' ||
               isset($_ENV['STATAMIC_SSG_BUILD']);
    }

    /**
     * Fetch bundle data from BundlePhobia API
     *
     * @param string $package
     * @param int $timeout
     * @return array|null
     * @throws \Exception
     */
    protected function fetchBundleData(string $package, int $timeout = 10): ?array
    {
        $base = "https://bundlephobia.com/api/size?package=";
        
        $response = Http::timeout($timeout)
            ->retry(2, 1000) // Retry twice with 1 second delay
            ->get($base . $package);

        if ($response->failed()) {
            throw new \Exception("API request failed with status: " . $response->status());
        }

        if (!$response->ok()) {
            throw new \Exception("API responded with error");
        }

        $data = $response->json();
        
        if (empty($data) || !isset($data['size'])) {
            return null;
        }

        // Process the data
        $data['size_kb'] = round($data['size'] / 1024, 2);
        $data['size_gzip_kb'] = $this->getMainSizeKb($data['assets'] ?? []);
        
        // Add metadata to help templates handle the response
        $data['_bundlephobia_success'] = true;
        $data['_bundlephobia_package'] = $package;
        
        return $data;
    }

    /**
     * Get fallback data structure
     *
     * @param string $reason
     * @return array
     */
    protected function getFallbackData(string $reason = 'Unknown error'): array
    {
        return [
            '_bundlephobia_success' => false,
            '_bundlephobia_error' => $reason,
            '_bundlephobia_package' => $this->params->get('package', 'unknown'),
            'name' => $this->params->get('package'),
        ];
    }

    /**
     * Find the asset named "main", convert its gzip → kB
     *
     * @param  array  $assets
     * @return float|null  size in kB, or null if not found
     */
    protected function getMainSizeKb(array $assets): ?float
    {
        foreach ($assets as $asset) {
            if (
                isset($asset['name'], $asset['gzip'])
                && $asset['name'] === 'main'
            ) {
                return round($asset['gzip'] / 1024, 2);
            }
        }
        return null;
    }

    /**
     * Clear cache for a specific package
     * Usage: {{ bundle_phobia:clear_cache package="lodash" }}
     *
     * @return string
     */
    public function clearCache()
    {
        $package = $this->params->get('package');
        if ($package) {
            $cacheKey = "bundle_phobia:" . $package;
            Cache::forget($cacheKey);
            return "Cache cleared for package: {$package}";
        }
        return "Package parameter required";
    }
}
