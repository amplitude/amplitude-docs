<?php
namespace App\Markdown\Copy;

use Torchlight\Block;
use Torchlight\Commonmark\V2\TorchlightExtension;

class TorchlightWithCopyExtension extends TorchlightExtension
{
    public function defaultBlockRenderer()
    {
        return function (Block $block) {
            $torchlight = parent::defaultBlockRenderer();

            return <<<HTML
                <div class="relative code-container">
                    {$torchlight($block)}
                </div>
            HTML;
        };
    }
}