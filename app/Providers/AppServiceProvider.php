<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Statamic;
use Statamic\Facades\Markdown;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use Torchlight\Commonmark\V2\TorchlightExtension;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        Markdown::addExtensions(function () {
            return [new TorchlightExtension, new HeadingPermalinkExtension];
        });
    }
}

