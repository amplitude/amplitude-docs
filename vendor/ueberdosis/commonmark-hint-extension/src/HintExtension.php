<?php

namespace Ueberdosis\CommonMark;

use League\CommonMark\Environment\EnvironmentBuilderInterface;
use League\CommonMark\Extension\ExtensionInterface;

class HintExtension implements ExtensionInterface
{
    public function register(EnvironmentBuilderInterface $environment): void
    {
        $environment->addBlockStartParser(new HintStartParser());
        $environment->addRenderer(Hint::class, new HintRenderer());
    }
}
