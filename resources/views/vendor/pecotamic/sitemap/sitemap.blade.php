{!! $xml_header !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

@foreach ($entries as $entry)
    <url>
        <loc>https://amplitude.com{{ $entry->path }}</loc>
        <lastmod>{{ $entry->lastmod->format("c") }}</lastmod>
        @if ($entry->changefreq)
            <changefreq>{{ $entry->changefreq }}</changefreq>
        @endif
        <priority>@if ($entry->priority){{ $entry->priority }}
            @elseif ($entry->path === '/') 1
            @else 0.8 @endif
        </priority>
    </url>
@endforeach

</urlset>
