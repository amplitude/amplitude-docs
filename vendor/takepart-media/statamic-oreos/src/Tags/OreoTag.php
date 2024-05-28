<?php

namespace Takepart\Oreos\Tags;

use Exception;
use Statamic\Tags\Tags;
use Takepart\Oreos\OreosManager;

class OreoTag extends Tags
{
    protected static $handle = 'oreo';

    protected OreosManager $manager;

    public function __construct()
    {
        $this->manager = new OreosManager;
    }

    public function wildcard($tag)
    {
        if (! $this->manager->isGroupAvailable($tag)) {
            throw new Exception('Oreo can not find a group `' . $tag . '` in its configuration');
        }

        return $this->manager->isGroupConsent($tag);
    }
}
