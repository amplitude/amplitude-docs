<?php

namespace App\Tags;

use Statamic\Tags\Tags;
use Illuminate\Support\Facades\Http;

class BundlePhobia extends Tags
{
    /**
     * The {{ bundle_phobia }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        $package =  $this->params->get('package');
        $base = "https://bundlephobia.com/api/size?package=";
        $response = Http::get($base . $package);

        if ($response->failed()) {
            return 'Error fetching API data.';
        }

        $data = $response->ok() ? $response->json() :[];
        $data['size_kb'] = round($data['size'] / 1024, 2);
        $data['size_gzip_kb'] = $this->getMainSizeKb($data['assets'] ?? []);
        return $data;
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
     * The {{ bundle_phobia:example }} tag.
     *
     * @return string|array
     */
    public function example()
    {
        //
    }
}
