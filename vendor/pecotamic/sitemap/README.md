# Sitemap Addon for Statamic

![Statamic 3.0+](https://img.shields.io/badge/Statamic-3.0+-FF269E?style=for-the-badge&link=https://statamic.com)
![Statamic 4.0+](https://img.shields.io/badge/Statamic-4.0+-FF269E?style=for-the-badge&link=https://statamic.com)
![Statamic 5.0+](https://img.shields.io/badge/Statamic-5.0+-FF269E?style=for-the-badge&link=https://statamic.com)

Automatically adds a sitemap to your Statamic web site. The default path is &lt;your web site&gt;/sitemap.xml

## Installation

Include the package with composer:

```sh
composer require pecotamic/sitemap
```

The package requires PHP 7.3+ or PHP 8+. It will auto register.

## Configuration (optional)

You can override the default options by publishing the configuration:

```
php artisan vendor:publish --provider="Pecotamic\Sitemap\ServiceProvider" --tag=config
```

This will copy the default config file to `config/pecotamic/sitemap.php`.

### View (optional)

You can also override the view template to adjust the output by publishing the view:

```
php artisan vendor:publish --provider="Pecotamic\Sitemap\ServiceProvider" --tag=view
```

The view template will be copied to `resources/views/vendor/pecotamic/sitemap/sitemap.blade.php`.

If you prefer another view engine, it is also possible. For example to use Antlers, create a file named `sitemap.antlers.html` instead of the blade template.

#### View variables

An array of sitemap **entries** is passed to the view template. Each **entry** has these properties: 

 * **loc**: The absolute url
 * **path**: The relative path
 * **lastmod**: A `DateTime` object of the last modification date 
 * **changefreq**: A string like 'daily', 'weekly' (optional) 
 * **priority**: A string presenting a float value between 0 and 1 (optional) 

### Dynamically adding entries (optional)

You may add entries dynamically by providing a closure that returns an array to the `addEntries` method.

```php
use Pecotamic\Sitemap\Sitemap;
use Pecotamic\Sitemap\SitemapEntry;

class AppServiceProvider extends Provider
{
    public function boot()
    {
        Sitemap::addEntries(static function () {
            return [
                new SitemapEntry('/hidden-page', new \DateTime('2020-02-20')),
                new SitemapEntry('/about-me', new \DateTime('now'), 'daily', '1.0'),
            ];
        });
    }
}
```

## Credits

Thanks for code contribution to [Prageeth Silva](/prageeth), [Poh Nean](/pohnean) and [Frederik Sauer](/FrittenKeeZ).
