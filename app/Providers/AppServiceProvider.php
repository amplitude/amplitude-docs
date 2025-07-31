<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Statamic;
use Statamic\Facades\Markdown;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use Torchlight\Engine\CommonMark\Extension;
use Torchlight\Engine\Options;


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
        Options::setDefaultOptionsBuilder(fn () => Options::fromArray(config('torchlight.options')));

        Markdown::addExtensions(function () {
            return [new Extension('dracula'), new HeadingPermalinkExtension];
        });
    }
}

