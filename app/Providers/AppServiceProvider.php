<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Statamic;
use Statamic\Facades\Markdown;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Extension\HeadingPermalink\HeadingPermalinkExtension;
use Torchlight\Commonmark\V2\TorchlightExtension;
use App\Markdown\Copy\TorchlightWithCopyExtension;
use App\Modifiers\MathPrep;
use Statamic\StaticSite\SSG;
use Symfony\Component\Finder\Finder;


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
            return [new HeadingPermalinkExtension];
        });

        // Register MathPrep modifier manually
        Statamic::booted(function () {
            \Statamic\Modifiers\Modifier::register('math_prep', MathPrep::class);
        });
    }
}

