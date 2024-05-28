<?php

namespace Takepart\Oreos\Tags;

use Statamic\Facades\Site;
use Statamic\Tags\Tags;
use Takepart\Oreos\OreosManager;

class OreosTag extends Tags
{
    protected static $handle = 'oreos';

    protected OreosManager $manager;

    public function __construct()
    {
        $this->manager = new OreosManager;
    }

    public function index(): array
    {
        return $this->groups();
    }

    public function groups(): array
    {
        return $this->manager->getGroupsWithInfo()
            ->values()
            ->toArray();
    }

    public function form()
    {
        return $this->view('form');
    }

    public function popup()
    {
        if ($this->manager->isCookieSet()) {
            return;
        }

        return $this->view('popup');
    }

    protected function view(string $key)
    {
        $data = [
            'site' => Site::current()->augmentedArrayData(),

            'showDescription' => $this->params->get('description') ?? true,
            'showDetails' => $this->params->get('details') ?? true,

            'showAcceptall' => $this->params->get('acceptall') ?? true,
            'showCancel' => $this->params->get('cancel') ?? true,
            'showReset' => $this->params->get('reset') ?? false,
        ];

        return view('statamic-oreos::' . $key, $data);
    }

}
