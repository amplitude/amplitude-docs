<?php

namespace Takepart\Oreos;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Statamic\Facades\Blueprint;
use Statamic\Facades\File;
use Statamic\Facades\YAML;

class OreosContent extends Collection
{

    public function __construct($items = null)
    {
        if (! is_null($items)) {
            $items = collect($items)->all();
        }

        $this->items = $items ?? $this->getDefaults();
    }

    public static function load($items = null)
    {
        return new static($items);
    }

    public function augmented()
    {
        $defaultValues = static::blueprint()
            ->fields()
            ->addValues($this->items)
            ->augment()
            ->values();

        return $defaultValues
            ->only(array_keys($this->items))
            ->all();
    }

    public function save()
    {
        File::put($this->path(), YAML::dump($this->items));
    }

    protected function getDefaults()
    {
        return collect(YAML::file($this->path())->parse())
            ->all();
    }

    protected function path()
    {
        return base_path('content/oreos.yaml');
    }

    public static function blueprint()
    {
        $fields = [];
        $oreos = (new OreosManager)->getGroups();

        foreach ($oreos as $handle => $settings) {
            $instructions = [];

            $instructions[] = $settings['required']
                ? __('statamic-oreos::messages.fields.required')
                : __('statamic-oreos::messages.fields.optional');

            if ($settings['default']) {
                $instructions[] = __('statamic-oreos::messages.fields.default');
            }

            $newFields = [
                [
                    'handle' => $handle . '_intro',
                    'field' => [
                        'display' => $handle,
                        'instructions' => join(' · ', $instructions),
                        'type' => 'section',
                    ]
                ],
                [
                    'handle' => $handle . '_title',
                    'field' => [
                        'display' => __('statamic-oreos::messages.fields.title'),
                        'type' => 'text',
                        'localizable' => true,
                        'default' => Str::title($handle),
                        'placeholder' => Str::title($handle),
                    ],
                ],
                [
                    'handle' => $handle . '_description',
                    'field' => [
                        'display' => __('statamic-oreos::messages.fields.description'),
                        'type' => 'textarea',
                        'localizable' => true,
                    ],
                ],
                [
                    'handle' => $handle . '_details',
                    'field' => [
                        'display' => __('statamic-oreos::messages.fields.details'),
                        'type' => 'bard',
                        'localizable' => true,
                    ],
                ],
            ];

            $fields = array_merge($fields, $newFields);
        }

        return Blueprint::make()->setContents([
            'sections' => [
                'meta' => [
                    'display' => 'Meta',
                    'fields' => $fields
                ],
            ]
        ]);
    }
}
