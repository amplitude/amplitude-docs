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
     * Get cache key with build isolation
     */
    protected function getCacheKey($package): string
    {
        // Include build ID to prevent cross-deployment cache pollution
        $buildId = env('BUILD_ID', env('VERCEL_GIT_COMMIT_SHA', 'local'));
        return "bundle_phobia:{$buildId}:{$package}";
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

        // Remove the forced test data now that we've confirmed the system works
        // if ($package === '@amplitude/analytics-browser') { ... }

        // Use the new cache key method
        $cacheKey = $this->getCacheKey($package);
        $timestampKey = $cacheKey . ':timestamp';
        $cached = Cache::get($cacheKey);
        
        // Enhanced logging
        Log::info('BundlePhobia cache check', [
            'package' => $package,
            'cache_key' => $cacheKey,
            'cache_exists' => $cached !== null,
            'build_id' => env('BUILD_ID', 'unknown'),
            'vercel_commit' => env('VERCEL_GIT_COMMIT_SHA', 'unknown'),
            'environment' => app()->environment(),
        ]);
        
        if ($cached !== null) {
            Log::info('BundlePhobia using cached data', [
                'package' => $package,
                'cached_version' => $cached['version'] ?? 'unknown',
                'cached_success' => $cached['_bundlephobia_success'] ?? false
            ]);
            
            // Add cache metadata with more details
            $cached['_bundlephobia_cached'] = true;
            $cached['_bundlephobia_cache_time'] = Cache::get($timestampKey, 'unknown');
            $cached['_bundlephobia_cache_driver'] = config('cache.default');
            return $cached;
        }

        // Determine timeout based on environment
        $timeout = $this->isSSGBuild() ? 30 : 10; // Longer timeout during build
        
        try {
            Log::info('BundlePhobia attempting fresh fetch', [
                'package' => $package,
                'timeout' => $timeout
            ]);
            
            $data = $this->fetchBundleData($package, $timeout);
            
            if ($data) {
                Log::info('BundlePhobia fresh fetch successful', [
                    'package' => $package,
                    'version' => $data['version'] ?? 'unknown',
                    'size' => $data['size_gzip_kb'] ?? 'unknown'
                ]);
                
                // Cache longer during SSG build, shorter in development
                $cacheDuration = $this->isSSGBuild() ? 86400 : 3600; // 24h vs 1h
                
                // Store data and timestamp
                Cache::put($cacheKey, $data, $cacheDuration);
                Cache::put($timestampKey, now()->toISOString(), $cacheDuration);
                
                // Add metadata for fresh data
                $data['_bundlephobia_cached'] = false;
                $data['_bundlephobia_fetch_time'] = now()->toISOString();
                $data['_bundlephobia_cache_driver'] = config('cache.default');
                
                return $data;
            }
            
            return $this->getFallbackData('API returned empty data');
            
        } catch (\Exception $e) {
            Log::error('BundlePhobia fetch failed', [
                'package' => $package,
                'error' => $e->getMessage(),
                'environment' => app()->environment(),
                'is_ssg_build' => $this->isSSGBuild()
            ]);
            
            // Check for stale cache that we can use as fallback
            $staleKey = "bundle_phobia_stale:{$package}"; // Different key for long-term cache
            $staleData = Cache::get($staleKey);
            
            if ($staleData && $staleData['_bundlephobia_success']) {
                Log::info('BundlePhobia using stale cache as fallback', [
                    'package' => $package,
                    'stale_version' => $staleData['version'] ?? 'unknown'
                ]);
                
                // Mark as cached and stale
                $staleData['_bundlephobia_cached'] = true;
                $staleData['_bundlephobia_stale'] = true;
                $staleData['_bundlephobia_cache_time'] = 'stale';
                $staleData['_bundlephobia_error'] = $e->getMessage();
                
                return $staleData;
            }
            
            // No stale cache available, return error fallback
            $fallback = $this->getFallbackData($e->getMessage());
            
            // Cache failure for shorter time (5 minutes)
            Cache::put($cacheKey, $fallback, 300);
            Cache::put($timestampKey, now()->toISOString(), 300);
            
            $fallback['_bundlephobia_cached'] = false;
            $fallback['_bundlephobia_fetch_time'] = now()->toISOString();
            $fallback['_bundlephobia_cache_driver'] = config('cache.default');
            
            return $fallback;
        }
    }

    /**
     * Detect if we're in an SSG build context
     */
    protected function isSSGBuild(): bool
    {
        return app()->runningInConsole() || 
               in_array(config('app.env'), ['production', 'preview']) ||
               isset($_ENV['STATAMIC_SSG_BUILD']) ||
               isset($_ENV['VERCEL']);
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
        $base = "https://bundlephobia.com/api/size";
        
        // Add cache-busting parameters
        $params = [
            'package' => $package,
            '_t' => time(), // Cache buster
            '_build' => env('BUILD_ID', 'unknown')
        ];
        
        $url = $base . '?' . http_build_query($params);
        
        Log::info('BundlePhobia API request with cache busting', [
            'package' => $package,
            'url' => $url,
            'params' => $params,
            'timeout' => $timeout,
            'timestamp' => now()->toISOString()
        ]);
        
        $response = Http::timeout($timeout)
            ->retry(2, 1000) // Retry twice with 1 second delay
            ->get($url);

        Log::info('BundlePhobia API response', [
            'package' => $package,
            'status' => $response->status(),
            'successful' => $response->successful(),
            'failed' => $response->failed(),
            'body_size' => strlen($response->body())
        ]);

        if ($response->failed()) {
            throw new \Exception("API request failed with status: " . $response->status());
        }

        if (!$response->ok()) {
            throw new \Exception("API responded with error");
        }

        $data = $response->json();
        
        Log::info('BundlePhobia API parsed data', [
            'package' => $package,
            'data_keys' => array_keys($data ?? []),
            'version' => $data['version'] ?? 'missing',
            'size' => $data['size'] ?? 'missing',
        ]);
        
        if (empty($data) || !isset($data['size'])) {
            Log::warning('BundlePhobia API returned invalid data', [
                'package' => $package,
                'data' => $data
            ]);
            return null;
        }

        // Process the data
        $data['size_kb'] = round($data['size'] / 1024, 2);
        $data['size_gzip_kb'] = $this->getMainSizeKb($data['assets'] ?? []);
        
        // Add metadata to help templates handle the response
        $data['_bundlephobia_success'] = true;
        $data['_bundlephobia_package'] = $package;
        $data['_bundlephobia_api_url'] = $url;
        $data['_bundlephobia_api_timestamp'] = now()->toISOString();
        
        // Store successful data in long-term stale cache
        $staleKey = "bundle_phobia_stale:{$package}";
        Cache::put($staleKey, $data, 86400 * 7); // Keep for 7 days as stale fallback
        
        Log::info('BundlePhobia processed final data', [
            'package' => $package,
            'final_version' => $data['version'] ?? 'missing',
            'final_size_gzip_kb' => $data['size_gzip_kb'],
            'processed_timestamp' => $data['_bundlephobia_api_timestamp']
        ]);
        
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
            'size' => $this->params->get('fallback_size', 0),
            'size_kb' => $this->params->get('fallback_size_kb', 0),
            'size_gzip_kb' => $this->params->get('fallback_gzip_kb', 0),
            'name' => $this->params->get('package'),
            'version' => $this->params->get('fallback_version', 'unknown'),
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
            Cache::forget($cacheKey . ':timestamp');
            return "Cache cleared for package: {$package}";
        }
        return "Package parameter required";
    }
}
