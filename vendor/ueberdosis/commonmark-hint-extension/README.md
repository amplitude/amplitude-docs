# CommonMark Hint Extension

[![Latest Version on Packagist](https://img.shields.io/packagist/v/ueberdosis/commonmark-hint-extension.svg?style=flat-square)](https://packagist.org/packages/ueberdosis/commonmark-hint-extension)
[![GitHub Tests Action Status](https://img.shields.io/github/workflow/status/ueberdosis/commonmark-hint-extension/run-tests?label=tests)](https://github.com/ueberdosis/commonmark-hint-extension/actions?query=workflow%3ATests+branch%3Amaster)
[![GitHub Code Style Action Status](https://img.shields.io/github/workflow/status/ueberdosis/commonmark-hint-extension/Check%20&%20fix%20styling?label=code%20style)](https://github.com/ueberdosis/commonmark-hint-extension/actions?query=workflow%3A"Check+%26+fix+styling"+branch%3Amaster)
[![Total Downloads](https://img.shields.io/packagist/dt/ueberdosis/commonmark-hint-extension.svg?style=flat-square)](https://packagist.org/packages/ueberdosis/commonmark-hint-extension)

A hint extension for [league/commonmark](https://github.com/thephpleague/commonmark) that renders the following Markdown as HTML.

## Example

### Markdown
```md
:::important Warning!
This is how the **Markdown** looks.
:::
```

### HTML
```html
<div class="hint important">
    <h2 class="hint-title">
        Warning!
    </h2>
    <p class="hint-content">
        This is how the <strong>Markdown</strong> looks.
    </p>
</div>
```

## Installation

You can install the package via composer:

```bash
composer require ueberdosis/commonmark-hint-extension
```

## Usage

```php
use League\CommonMark\Environment\Environment;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\MarkdownConverter;
use Ueberdosis\CommonMark\HintExtension;

// Configure the Environment with all the CommonMark parsers/renderers
$environment = new Environment();
$environment->addExtension(new CommonMarkCoreExtension());

// Add this extension
$environment->addExtension(new HintExtension());

// Instantiate the converter engine and start converting some Markdown!
$converter = new MarkdownConverter($environment);
$markdown = <<<MARKDOWN
:::important Warning!
This is how the **Markdown** looks.
:::
MARKDOWN;

echo $converter->convertToHtml($markdown);
```

## Testing

```bash
composer test
```

## Credits

- [Hans Pagel](https://github.com/hanspagel)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
