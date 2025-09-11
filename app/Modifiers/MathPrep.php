<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;

class MathPrep extends Modifier
{
    /**
     * Usage:
     *   {{ content | math_prep }}          // returns content unchanged
     *   {{ content | math_prep:mark }}     // wraps $$...$$ spans with .tex-unprocessed
     */
    public function index($value, $params, $context)
    {
        if (!is_string($value)) {
            return $value;
        }

        // Only handle 'mark' mode now
        $mark = in_array('mark', $params);

        if ($mark) {
            return $this->markMath($value);
        }

        return $value;
    }


    /**
     * Wrap $$...$$ blocks in .tex-unprocessed to hide until KaTeX renders.
     */
    protected function markMath(string $text): string
    {
        return preg_replace(
            '/\$\$([\s\S]+?)\$\$/',
            '<span class="tex-unprocessed">$$$1$$</span>',
            $text
        );
    }
}
