<?php

namespace Statamic\Fieldtypes;

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use Statamic\Support\Str;

class TemplateFolder extends Relationship
{
    protected $component = 'template_folder';
    protected $selectable = false;

    protected function toItemArray($id, $site = null)
    {
        return ['title' => $id, 'id' => $id];
    }

    public function getIndexItems($request)
    {
        return collect(config('view.paths'))
            ->flatMap(function ($path) {
                $directories = collect();
                $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path), RecursiveIteratorIterator::SELF_FIRST);

                foreach ($iterator as $file) {
                    if ($file->isDir() && ! $iterator->isDot() && ! $iterator->isLink()) {
                        $directories->push(Str::replaceFirst($path.DIRECTORY_SEPARATOR, '', $file->getPathname()));
                    }
                }

                return $directories->filter()->values();
            })
            ->map(fn ($folder) => ['id' => $folder, 'title' => $folder])
            ->values();
    }
}
