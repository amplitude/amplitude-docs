<?php

namespace Pecotamic\Sitemap\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;
use Pecotamic\Sitemap\Sitemap;
use Pecotamic\Sitemap\SitemapEntry;
use Statamic\Facades\Site;
use Statamic\Support\Str;
use Statamic\View\Antlers\Engine as AntlersEngine;

class SitemapController extends Controller
{
    private const CACHE_KEY = 'pecotamic-sitemap.sitemap';

    public function show()
    {
        $cacheUntil = Carbon::now()->addSeconds(config('pecotamic.sitemap.expire'));
        $content = Cache::remember(self::cacheKey(), $cacheUntil, function () {
            $view = view('pecotamic/sitemap::sitemap');
            return $view->with([
                'entries' => self::entriesFor($view),
                'xml_header' => '<?xml version="1.0" encoding="UTF-8"?>',
            ])->render();
        });

        return response($content)
            ->header('Content-Type', 'application/xml')
            ->header('Expires', $cacheUntil->format('D, d M Y H:i:s T'));
    }

    private static function cacheKey(): string
    {
        return self::CACHE_KEY . '.' . Site::current()->handle();
    }

    /**
     * @param View $view
     * @return SitemapEntry[]|array
     */
    private static function entriesFor(View $view): array
    {
        $entries = Sitemap::entries();
        if (self::isUsingAntlersTemplate($view)) {
            return array_map(static function (SitemapEntry $entry) {
                return (array)$entry;
            }, $entries);
        }

        return $entries;
    }

    /**
     * @see \Statamic\View\View::isUsingAntlersTemplate()
     */
    private static function isUsingAntlersTemplate(View $view): bool
    {
        return Str::endsWith($view->getPath(), collect(AntlersEngine::EXTENSIONS)->map(function ($extension) {
            return '.' . $extension;
        })->all());
    }
}
