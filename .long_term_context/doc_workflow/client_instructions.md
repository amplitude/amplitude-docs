When adding hyperlinks to other articles, do not use "../" as a prefix to move between directories. You'll need to figure out what the URL will actually end up being resolved into. To do this, you'll see a bunch of yaml files that sit next to every folder inside `content/collections/`.

1. Locate the collection file  
   • For `content/collections/experiment-sdks/en/experiment-ios.md` the companion file is  
     `content/collections/experiment-sdks.yaml`.

2. Open that YAML – each one contains a `route:` key, e.g.

```
content/collections/experiment-sdks.yaml
route: '/sdks/experiment-sdks/{slug}'
```

3. Statamic (the CMS this repo is built on) takes that route pattern and substitutes `{slug}` with the entry’s slug.  
   • If the Markdown front-matter doesn’t declare a `slug:` value, it simply uses the filename (minus the `.md`).  
     `experiment-ios.md` → slug `experiment-ios`.

4. The docs site is mounted at `/docs`, so the public URL is:

    https://amplitude.com/docs + <route-after-substitution>

    Example: `/sdks/experiment-sdks/experiment-ios`  
    → https://amplitude.com/docs/sdks/experiment-sdks/experiment-ios

A second example:

```
content/collections/session-replay.yaml
route: '/session-replay/{slug}'
```

`session-replay-ios-plugin.md` → slug `session-replay-ios-plugin`  
URL → https://amplitude.com/docs/session-replay/session-replay-ios-plugin

So to predict any article’s URL:

1. Take the collection name from its path.  
2. Read `content/collections/<collection>.yaml` and grab the `route:` string.  
3. Replace `{slug}` with the file’s slug (either its `slug:` front-matter value or the filename).  
4. Prepend `/docs` and the site domain.

Worst case scenario: If you're not sure, you can get the list of articles with the correct URLs in https://amplitude.com/docs/llms.txt