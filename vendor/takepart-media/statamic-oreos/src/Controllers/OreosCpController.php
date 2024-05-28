<?php

namespace Takepart\Oreos\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\User;
use Statamic\Http\Controllers\Controller;
use Statamic\Support\Arr;
use Takepart\Oreos\OreosContent;
use Takepart\Oreos\OreosManager;

class OreosCpController extends Controller
{
    protected OreosManager $manager;

    public function __construct()
    {
        $this->manager = new OreosManager;
    }

    public function edit()
    {
        abort_unless(User::current()->can('edit oreos settings'), 403);

        $blueprint = OreosContent::blueprint();

        $fields = $blueprint
            ->fields()
            ->addValues(OreosContent::load()->all())
            ->preProcess();

        return view('statamic-oreos::edit', [
            'title' => __('statamic-oreos::messages.title'),
            'action' => cp_route('oreos.update'),
            'blueprint' => $blueprint->toPublishArray(),
            'meta' => $fields->meta(),
            'values' => $fields->values(),
        ]);
    }

    public function update(Request $request)
    {
        abort_unless(User::current()->can('edit oreos settings'), 403);

        $blueprint = OreosContent::blueprint();

        $fields = $blueprint->fields()->addValues($request->all());

        $fields->validate();

        $values = Arr::removeNullValues($fields->process()->values()->all());

        OreosContent::load($values)->save();
    }
}
