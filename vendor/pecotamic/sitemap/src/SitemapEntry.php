<?php

namespace Pecotamic\Sitemap;

class SitemapEntry
{
    public $path;
    public $loc;
    public $lastmod;
    public $changefreq;
    public $priority;

    public function __construct(string $loc, \DateTime $lastmod, ?string $changefreq = null, ?string $priority = null)
    {
        $this->loc = $loc;
        $this->path = parse_url($loc)['path'] ?? '/';
        $this->lastmod = $lastmod;
        $this->changefreq = $changefreq;
        $this->priority = $priority;
    }
}
