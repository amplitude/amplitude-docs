<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;

class HasMath extends Modifier
{
    public function index($value, $params, $context)
    {
        if (!is_string($value)) return false;

        // Look for common LaTeX delimiters
        $pattern = '/(\$\$[\s\S]+?\$\$)|(\$[^$\n]+?\$)|(\\\\\[[\s\S]+?\\\\\])|(\\\\\([^)\n]+?\\\\\))/m';
        return preg_match($pattern, $value) === 1;
    }
}
