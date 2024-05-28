<?php

namespace Takepart\Oreos;

use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cookie as CookieJar;

class OreosManager
{
    protected array $config;
    protected Collection $groups;
    protected array $consents;

    public function __construct()
    {
        $this->config = $this->loadConfig();
        $this->groups = $this->loadGroups();

        $this->checkForNewConfig();

        $this->consents = $this->loadConsents();
    }

    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function getGroupsWithInfo(): Collection
    {
        $contents = (new OreosContent);

        return $this->groups
            ->map(function($group, $key) use($contents) {
                $explicit = $this->isGroupExplicitlySet($key);
                $consent = $this->isGroupConsent($key);
                $default = $group['default'];
                $required = $group['required'];

                return [
                    'handle' => $key,
                    'consent' => $consent,
                    'explicit' => $explicit,
                    'checked' => (($explicit && $consent) || (!$explicit && $default)),
                    'default' => $default,
                    'required' => $required,
                    'title' => $contents->get($key . '_title') ?? Str::title($key),
                    'description' => $contents->get($key . '_description'),
                    'details' => $contents->get($key . '_details'),
                ];
            });
    }

    public function isGroupAvailable(string $key): bool
    {
        $groups = $this->getConfig('groups');
        return isset($groups[$key]);
    }

    public function isGroupExplicitlySet(string $key): bool
    {
        if (! $this->isCookieSet()) {
            return false;
        }

        return $this->getCookieData()->has($key);
    }

    public function isGroupConsent(string $key): bool
    {
        if (! $this->isGroupExplicitlySet($key)) {
            return false;
        }

        return $this->getCookieData()->get($key);
    }

    public function setGroupConsent(string $key, bool $consent = true)
    {
        $this->consents[$key] = $consent;
    }

    public function saveConsents()
    {
        $cookie = cookie(
            $this->getConfig('name'),
            collect($this->consents),
            $this->getConfig('expires_after'),
            config('session.path'),
            config('session.domain') ?? request()->getHost(),
            config('session.secure'),
            config('session.http_only'),
            false,
            config('session.same_site')
        );

        CookieJar::queue( $cookie );
    }

    public function resetConsents()
    {
        CookieJar::queue(
            CookieJar::forget(
                $this->getConfig('name'),
                config('session.path'),
                config('session.domain') ?? request()->getHost()
            )
        );
    }

    public function checkForNewConfig(): void
    {
        if (! config('oreos.resets_with_new_config', true)) {
            return;
        }

        if (! $this->isCookieSet()) {
            return;
        }

        $diffByGroup = $this->groups->diffKeys( $this->getCookieData() );
        $diffByConsents = $this->getCookieData()->diffKeys( $this->groups );
        $diff = $diffByGroup->merge($diffByConsents);

        $hasNewConfig = $diff->count() > 0;

        if ($hasNewConfig) {
            $this->resetConsents();
            header("Refresh: 0");
        }
    }

    public function isCookieSet(): bool
    {
        return CookieJar::has( $this->getConfig('name') );
    }

    protected function getCookie(): string
    {
        return CookieJar::get( $this->getConfig('name') );
    }

    protected function getCookieData(): Collection
    {
        return collect(json_decode( $this->getCookie() ));
    }

    protected function getConfig(string $key)
    {
        $config = $this->config[$key];

        if (! isset($config)) {
            throw new Exception('Can not find configuration within `statamic.oreos` with key `' . $key . '`');
        }

        return $config;
    }

    protected function loadGroups(): Collection
    {
        return collect($this->getConfig('groups'));
    }

    protected function loadConsents(): array
    {
        return $this->groups->map(function($group, $key) {
            return $this->isGroupConsent($key);
        })->toArray();
    }

    protected function loadConfig(): array
    {
        return config('oreos');
    }

}
