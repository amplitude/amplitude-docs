<?php

namespace App\Tags;

use Statamic\Facades\Data;
use Statamic\Support\Str;

class GithubEditUrl extends \Statamic\Tags\Tags
{
    /**
     * The {{ github_edit_url }} tag.
     *
     * @return string|array
     */

    private $endpoint = 'https://github.com/amplitude/amplitude-docs/blob/main/content/';

    public function index()
    {
        if (! $id = $this->context->get('id')) {
            return false;
        }
        $content = Data::find($id);

        if ($content instanceof \Statamic\Taxonomies\LocalizedTerm) {
            return;
        }

        $path = Str::after($path = $content->path(), 'content/');

        return $this->endpoint . $path;
    }
}
