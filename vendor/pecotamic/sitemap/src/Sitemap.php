<?php

namespace Pecotamic\Sitemap;

use Illuminate\Support\Facades\Facade;

class Sitemap extends Facade
{
    protected static function getFacadeAccessor()
    {
        return Generator::class;
    }
}
