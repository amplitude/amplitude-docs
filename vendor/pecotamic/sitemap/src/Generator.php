<?php

namespace Pecotamic\Sitemap;

use Illuminate\Support\Facades\Facade;
use Statamic\Facades\Collection;
use Statamic\Facades\Site;
use Statamic\Facades\Taxonomy;
use Statamic\Fields\Value;

class Generator extends Facade
{
    protected $extraEntries;

    public function __construct()
    {
        $this->extraEntries = collect();
    }

    /**
     * @return SitemapEntry[]|array
     */
    public function entries(): array
    {
        $entries = collect();

        // collect
        if (config('pecotamic.sitemap.include_entries', true)) {
            $entries = $entries->merge($this->publishedEntries(config('pecotamic.sitemap.entry_types')));
        }
        if (config('pecotamic.sitemap.include_terms', true)) {
            $entries = $entries->merge($this->publishedTerms());
        }
        if (config('pecotamic.sitemap.include_collection_terms', true)) {
            $entries = $entries->merge($this->publishedCollectionTerms());
        }

        // filter by current site
        $entries = $entries->filter(self::siteFilter(Site::current()));

        // filter by config
        if ($excludedUrls = config('pecotamic.sitemap.exclude_urls')) {
            $entries = $entries->filter(self::excludedUrlsFilter($excludedUrls));
        }

        // filter by function
        if ($callback = config('pecotamic.sitemap.filter')) {
            $callback = is_string($callback) && class_exists($callback) ? new $callback() : $callback;
            $entries = $entries->filter($callback);
        }

        // find entries
        $entries = $entries
            ->map(function ($entry) {
                $properties = self::sitemapProperties($entry);

                if ($callback = config('pecotamic.sitemap.properties')) {
                    $properties = ($callback($entry) ?? []) + $properties;
                }

                $properties = array_map(static function ($value) {
                    return $value instanceof Value ? $value->value() : $value;
                }, $properties);

                return new SitemapEntry($properties['loc'], $properties['lastmod'], $properties['changefreq'], $properties['priority']);
            })
            ->values();

        // add extra sitemap entries
        $extraEntries = $this->extraEntries
            ->flatMap(static function ($closure) {
                return $closure();
            })
            ->map(static function (SitemapEntry $entry) {
                $entry->loc = self::absoluteUrl($entry->loc);
                return $entry;
            });

        return $entries
            ->merge($extraEntries)
            ->sortBy(static function (SitemapEntry $entry) {
                return substr_count(rtrim($entry->path, '/'), '/');
            })
            ->toArray();
    }

    public function addEntries($closure): self
    {
        $this->extraEntries[] = $closure;

        return $this;
    }

    protected function publishedEntries(?array $entryTypes = null): \Illuminate\Support\Collection
    {
        return Collection::all()
            ->flatMap(function ($collection) {
                return $collection->queryEntries()->get();
            })
            ->filter(function ($entry) use ($entryTypes) {
                if (($absoluteUrl = $entry->absoluteUrl()) === null || !self::isAbsoluteUrl($absoluteUrl)) {
                    return false;
                }
                if ($entryTypes !== null && !in_array($entry->collectionHandle(), $entryTypes)) {
                    return false;
                }

                return $entry->status() === 'published';
            });
    }

    protected static function isAbsoluteUrl(string $url): bool
    {
        return preg_match('#^https?://#', $url);
    }

    protected static function absoluteUrl(string $url): string
    {
        if (self::isAbsoluteUrl($url)) {
            return $url;
        }

        return Site::current()->absoluteUrl() . $url;
    }

    protected function publishedTerms()
    {
        return Taxonomy::all()
            ->flatMap(function ($taxonomy) {
                return $taxonomy->queryTerms()->get();
            })
            ->filter
            ->published()
            ->filter(function ($term) {
                return view()->exists($term->template());
            });
    }

    protected function publishedCollectionTerms()
    {
        return Collection::all()
            ->flatMap(function ($collection) {
                return $collection->taxonomies()->map->collection($collection);
            })
            ->flatMap(function ($taxonomy) {
                return $taxonomy->queryTerms()->get()->map->collection($taxonomy->collection());
            })
            ->filter
            ->published()
            ->filter(function ($term) {
                return view()->exists($term->template());
            });
    }

    protected static function siteFilter(\Statamic\Sites\Site $currentSite): callable
    {
        return static function ($entry) use ($currentSite) {
            return !$entry->isRedirect() && $entry->locale() === $currentSite->handle();
        };
    }

    protected static function excludedUrlsFilter(array $excludedUrls): callable
    {
        return static function ($entry) use ($excludedUrls) {
            $url = $entry->url();
            foreach ($excludedUrls as $pattern) {
                if (preg_match($pattern, $url)) {
                    return false;
                }
            }

            return true;
        };
    }

    protected static function sitemapProperties($entry): array
    {
        $augmented = $entry->newAugmentedInstance();

        return [
            'loc' => $augmented->get('permalink') ?? $augmented->get('absolute_url'),
            'lastmod' => $augmented->get('updated_at'),
            'changefreq' => $augmented->get('change_frequency'),
            'priority' => $augmented->get('priority'),
        ];
    }
}
