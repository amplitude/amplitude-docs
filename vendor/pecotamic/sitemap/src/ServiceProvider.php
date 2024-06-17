<?php

namespace Pecotamic\Sitemap;

use Statamic\Facades\Site;
use Statamic\Facades\URL;
use Statamic\Providers\AddonServiceProvider;
use Statamic\StaticSite\SSG;

class ServiceProvider extends AddonServiceProvider
{
    protected $viewNamespace = 'pecotamic/sitemap';

    protected $routes = [
        'web' => __DIR__.'/../routes/web.php',
    ];

    protected function bootViews(): self
    {
        parent::bootViews();

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/'.$this->viewNamespace),
        ], 'view');

        return $this;
    }

    protected function bootConfig(): self
    {
        $this->mergeConfigFrom(__DIR__.'/../config/sitemap.php', 'pecotamic.sitemap');

        $this->publishes([
            __DIR__.'/../config/sitemap.php' => config_path('pecotamic/sitemap.php'),
        ], 'config');

        return $this;
    }

    protected function bootRoutes(): self
    {
        parent::bootRoutes();

        $this->addRoutesToSSG();

        return $this;
    }

    protected function addRoutesToSSG(): void
    {
        if (!class_exists(SSG::class)) {
            return;
        }

        SSG::addUrls(static function () {
            return Site::all()
                ->map(function ($site) {
                    return URL::makeRelative($site->url());
                })
                ->unique()
                ->map(function ($sitePrefix) {
                    return $sitePrefix . '/' . config('pecotamic.sitemap.url');
                });
        });
    }
}
