<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;

class MathPrep extends Modifier
{
    /**
     * Usage:
     *   {{ content | math_prep:detect }}   // returns true/false
     *   {{ content | math_prep }}          // returns content unchanged
     *   {{ content | math_prep:mark }}     // wraps $$...$$ spans with .tex-unprocessed
     */
    public function index($value, $params, $context)
    {
        if (!is_string($value)) {
            return $value;
        }

        // Params
        $mode = 'normalize'; // normalize|detect
        $mark = false;

        foreach ($params as $p) {
            $p = strtolower(trim((string)$p));
            if ($p === 'detect') $mode = 'detect';
            if ($p === 'mark')   $mark = true;
        }

        if ($mode === 'detect') {
            return $this->hasMath($value);
        }

        // No normalization needed — KaTeX handles $$ directly
        $out = $value;

        if ($mark) {
            $out = $this->markMath($out);
        }

        return $out;
    }

    /**
     * Detect only $$...$$ math
     */
    protected function hasMath(string $text): bool
    {
        return (bool) preg_match('/\$\$[\s\S]+?\$\$/', $text);
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
