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
     * Detect both $$...$$ (display) and $...$ (inline) math
     * This should match the delimiters configured in KaTeX
     */
    protected function hasMath(string $text): bool
    {
        // Temporary debugging - remove after fixing
        if (app()->environment('local')) {
            \Log::info('MathPrep checking content length: ' . strlen($text));
            \Log::info('First 200 chars: ' . substr($text, 0, 200));
            
            // Look for any dollar signs
            if (strpos($text, '$') !== false) {
                \Log::info('Found dollar sign in content');
                preg_match_all('/\$[^$]*\$/', $text, $matches);
                \Log::info('Dollar sign matches: ' . json_encode($matches[0]));
            }
        }
        
        // Check for display math $$...$$
        if (preg_match('/\$\$[\s\S]+?\$\$/', $text)) {
            if (app()->environment('local')) \Log::info('Found display math');
            return true;
        }
        
        // Check for inline math $...$ (but not $$)
        // More restrictive: must contain typical math characters
        if (preg_match('/(?<!\$)\$(?!\$)[^$\n]*[a-zA-Z=+\-*/^\\{}()][^$\n]*\$(?!\$)/', $text)) {
            if (app()->environment('local')) \Log::info('Found inline math');
            return true;
        }
        
        return false;
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
