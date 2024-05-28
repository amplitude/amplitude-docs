# Statamic Oreos

> Cookie consent manager for Statamic 3.

## Features

*Oreos* gives you the opportunity to manage cookie consents on two levels: groups of consents and the regarding settings are managed via the addons’ config-file, whereas the corresponding titles and descriptions are managed from within the control panel. This enables your authors to not only edit texts on the fly, without the need to deploy the site or the developer to open their editor, but also to manage texts in multi-site (and multi-lang) installations.

- Manage cookies via addon config file
- Manage texts for cookies via control panel
- Permissions for control panel views (view and edit)
- Customizable views for formular (antlers tag, e.g. for privacy page) and popup (the one shown if no cookie is set)

## How to Install

You can search for this addon in the `Tools > Addons` section of the Statamic control panel and click **install**, or run the following command from your project root:

``` bash
composer require takepart-media/statamic-oreos
```

After that, publish the config file to customize your consent groups and to tweak other settings.

```bash
php artisan vendor:publish --tag=oreos-config
```

To customize the user experience, you are free to publish the views to customize them based on your needs:

```bash
php artisan vendor:publish --tag=oreos-views
```

## How to Use

### Default views

#### Popup

To add the popup with the included form to your layout, use the `oreos:popup` tag to place it at it's belonging position (usually near the end of the body as first-level child, e.g. in your main layout file):

**resources/views/layout.antlers.html**
```html
        ...

        {{ oreos:popup }}
    </body>
</html>
```

When saved, the page gets reloaded (technically, we got redirected to the referers page after saving within the posted controller's action at `/!/oreos/save`), so all statements to check for consents should return the correct setting.

#### Formular

To recall the settings, usually within the privacy statements, add the `oreos:form` tag. This can be done within your content, but be sure to allow antlers to be parsed:

```html
{{ oreos:form }}
```

This will show just the *form from within the popup*, not the popup itself (everything around the form). By passing parameters, you can show or hide certain elements. If you are using custom views, this feature might be broken. The default config (if parameters are omitted, the default value will kick in):

```html
{{ oreos:form
    description="true"
    acceptall="true"
    cancel="true"
    reset="false"
}}
```

### Custom views

Pretty sure you want to customize the experience for your visitors: we got you covered. With the help of our tags, you can pretty easily overwrite and customize both the popup as well as the form – or just some part of it.

First, publish the addon’s views:

```bash
php artisan vendor:publish --tag=oreos-views
```

This should create the two files inside the folder `/resources/views/vendor/oreos/` for the form (`form.antlers.php`) and the popup (`popup.antlers.html`). Those files can be customized as you wish. You even have the possibility to completely omit our views and just use our backbone, by using our controller endpoint and our `oreos` tag from within your own partials or templates. Have a look at `form.antlers.php` how everything is wired up!

### Use cookie groups elsewhere

With the help of the `oreos` tag, you can display your cookie groups with all relevant information everywhere on your website:

```html
{{ oreos }}
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>Consent: {{ consent ? 'true' : 'false' }}</p>
{{ /oreos }}
```

The following attributes are augmented within the oreos-loop:

| Handle | Type | Description |
| ---- | ---- | ---- |
| **`handle`** | `string` | The group handle you configured inside the `config/oreos.php` |
| **`title`** | `string` | The title for your group as written in the control panel (localized). |
| **`description`** | `string` | The description for your group as written in the control panel (localized). |
| **`details`** | `array` | Further details as bard field written in the control panel (localized). |
| **`consent`** | `bool` | If the user has given their consent or not. |
| **`explicit`** | `bool` | If the cookie is explicitly set. |
| **`required`** | `bool` | If the consent is required. |
| **`default`** | `bool` | If the checkbox is checked by default. |
| **`checked`** | `bool` | If the checkbox in the form is checked or not. Calculated based on consent, explicit, default and required. |
### Check for consents

To check if a cookie group was given consent to, use the `oreo:yourgrouphandle` tag:

```html
{{ if {oreo:yourgrouphandle} }}
    do something if yourgrouphandle is checked
{{ else }}
    do something if yourgrouphandle is *not* checked
{{ /if }}
```

### Usage with static caching

When used with [static caching enabled](https://statamic.dev/static-caching), without any further changes, your site will throw a `419 page expired` error. For the plugin to work, you have to exclude the `oreo`-popup as well as all checks from cache by using the ``{{ nocache }}``-tag: https://statamic.dev/tags/nocache

```
# resources/views/layout.antlers.html

{{ nocache }}
    {{ oreos:popup }}
{{ /nocache }}
```

```
# resources/views/partials/embed.antlers.html

{{ nocache }}
    {{ if {oreo:embeds} }}
        {{ embed_code }}
    {{ /if }}
{{ /nocache }}
```

## Authors

- Dennis Dick, <dick@takepart-media.de>
- Jakob Plöns, <jploens@takepart-media.de>

© 2021 TAKEPART Media + Science GmbH
