<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cookie Name
    |--------------------------------------------------------------------------
    |
    | If the user consents (even if not), the addon needs a way to store that
    | information. This is done in a cookie with the following name. No cookie
    | is set if the user does nothing.
    |
    */

    'enabled' => env('TP_OREOS_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Cookie Name
    |--------------------------------------------------------------------------
    |
    | If the user consents (even if not), the addon needs a way to store that
    | information. This is done in a cookie with the following name. No cookie
    | is set if the user does nothing.
    |
    */

    'name' => env('TP_OREOS_NAME', 'TP_OREOS'),

    /*
    |--------------------------------------------------------------------------
    | Expires After
    |--------------------------------------------------------------------------
    |
    | Sets the time after which the consents are expired, in minutes.
    | Default value are 30 days (á 24 hours á 60 minutes).
    |
    */

    'expires_after' => env('TP_OREOS_EXPIRES_AFTER', 60 * 24 * 30),

    /*
    |--------------------------------------------------------------------------
    | Resets with new config
    |--------------------------------------------------------------------------
    |
    | Adds a check wether new a configuration (specifically, added or
    | updated cookie keys) should trigger a consent reset.
    |
    */

    'resets_with_new_config' => true,

    /*
    |--------------------------------------------------------------------------
    | Cookie Groups
    |--------------------------------------------------------------------------
    |
    | Define the cookie groups you want your users to choose from whether they
    | like to consent to the group or not. Titles and description texts are
    | editable within the control panel section.
    */

    'groups' => [
        'essentials' => [
            'required' => true,
            'default' => true
        ],
        'analytics' => [
            'required' => false,
            'default' => false,
        ],
        'embeds' => [
            'required' => false,
            'default' => false,
        ],
    ],

];
