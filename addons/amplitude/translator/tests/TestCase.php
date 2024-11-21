<?php

namespace Amplitude\Translator\Tests;

use Amplitude\Translator\ServiceProvider;
use Statamic\Testing\AddonTestCase;

abstract class TestCase extends AddonTestCase
{
    protected string $addonServiceProvider = ServiceProvider::class;
}
