<?php

return [
    'url' => 'sitemap.xml',
    'expire' => 60,
    'include_entries' => true,
    'include_terms' => true,
    'include_collection_terms' => true,

    /**
     * - Leave as `null` for all types
     * - Provide array of types/handles for filtering
     */
    'entry_types' => null,

    /**
     * - Use valid regex patterns (uses `preg_match`)
     * - Relative URLs (relative to site url)
     */
    'exclude_urls' => [],

    /**
     * Callable to filter entries (optional)
     *
     * Argument:
     *      $entry: Statamic\Taxonomies\LocalizedTerm|Statamic\Entries\Entry
     *
     * Result:
     *     bool: when false, exclude the entry from the sitemap
     *
     * Example:
     *
     * <code>
     * <?php
     *     'filter' => static function ($entry): bool {
     *         $augmented = $entry->newAugmentedInstance();
     *         if (!($metaRobots = $augmented->get('meta_robots')) || !is_array($metaRobotsArray = $metaRobots->raw())) {
     *             return true;
     *         }
     *
     *         return !in_array('noindex', $metaRobotsArray, true);
     *     }
     * ?>
     * </code>
     */
    'filter' => null,

    /**
     * Callable to provide properties for sitemap entries to override default values (optional)
     *
     * Argument:
     *      $entry: Statamic\Taxonomies\LocalizedTerm|Statamic\Entries\Entry
     *
     * Result:
     *     null|array with optional fields:
     *     - loc: string: absolute url
     *     - lastmod: DateTime: date of last modification
     *     - changefreq: string|null: see https://www.sitemaps.org/de/protocol.html#changefreqdef
     *     - priority: float|null: value in range 0 to 1
     *
     * Example:
     *
     * <code>
     * <?php
     *     'properties' => static function ($entry): ?array {
     *         if ($entry instanceof \Statamic\Taxonomies\LocalizedTerm) {
     *             return [
     *                 'changefreq' => 'weekly',
     *                 'priority' => 0.3,
     *             ];
     *         }
     *
     *         if ($entry->collectionHandle() === 'blog') {
     *             return [
     *                 'changefreq' => 'monthly',
     *                 'priority' => 0.5,
     *             ];
     *         }
     *
     *         return null;
     *     }
     * ?>
     * </code>
     */
    'properties' => null,
];
