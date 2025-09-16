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

        // Simply return the content unchanged - KaTeX handles the rendering perfectly
        return $value;
    }


    /**
     * Wrap $$...$$ blocks in .tex-unprocessed to hide until KaTeX renders.
     */
    protected function markMath(string $text): string
    {
        // Debug logging
        if (app()->environment('local')) {
            \Log::info('=== MARKING MATH ===');
            \Log::info('Content length: ' . strlen($text));
            \Log::info('Content preview: ' . substr($text, 0, 200));
            $matchCount = preg_match_all('/\$\$([\s\S]+?)\$\$/', $text, $matches);
            \Log::info('Found $$ patterns: ' . $matchCount);
            if (!empty($matches[0])) {
                \Log::info('Math expressions found: ' . json_encode($matches[0]));
            }
        }
        
        $result = preg_replace(
            '/\$\$([\s\S]+?)\$\$/',
            '$$<span class="tex-unprocessed">$1</span>$$',
            $text
        );
        
        if (app()->environment('local')) {
            \Log::info('Result preview: ' . substr($result, 0, 200));
            \Log::info('Result contains tex-unprocessed: ' . (strpos($result, 'tex-unprocessed') !== false ? 'YES' : 'NO'));
        }
        
        return $result;
    }
}
