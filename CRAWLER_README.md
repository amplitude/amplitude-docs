# Markdown Crawler for Amplitude Docs

A Node.js-based crawler that detects unrendered markdown content in your Statamic-generated static site, with special focus on tables and other markdown syntax that may not be properly processed.

## Features

✅ **Sitemap-based crawling** - Uses your existing sitemap as entry point  
✅ **Table detection** - Specifically looks for unrendered table markdown (`|` characters)  
✅ **Comprehensive markdown patterns** - Headers, links, code blocks, lists, emphasis  
✅ **False positive filtering** - Smart detection to avoid false alarms  
✅ **Concurrent crawling** - Configurable concurrency for performance  
✅ **Detailed reporting** - JSON reports with samples and statistics  
✅ **CI/CD integration** - Ready-to-use GitHub Actions workflow  
✅ **Local & production ready** - Works in any environment  
✅ **PR comments** - Automatic feedback on pull requests  

## Installation

Install the required dependency:

```bash
npm install fast-xml-parser
```

The crawler script (`crawler.js`) and GitHub Actions workflow are already configured.

## Usage

### Local Development

#### Quick Start
```bash
# Start your local Statamic site first
php please serve

# Run the crawler against local site
npm run crawl:local
```

#### Custom Options
```bash
# Run with custom configuration
node crawler.js \
  --base-url http://localhost:8000 \
  --sitemap-path /docs/sitemap-docs.xml \
  --output my-report.json \
  --concurrency 5 \
  --verbose
```

### Production Check
```bash
# Check your production site
npm run crawl:production

# Or with custom production URL
node crawler.js --base-url https://your-production-site.com
```

### Ignoring Pages
```bash
# Use ignore file (recommended)
npm run crawl:local:ignore

# Ignore specific URLs
node crawler.js --ignore-url "/docs/test-page" --ignore-url "/docs/sandbox"

# Ignore URL patterns
node crawler.js --ignore-pattern "/docs/admin/*" --ignore-pattern "*/draft/*"

# Combine ignore methods
node crawler.js --ignore-file .crawlerignore --ignore-url "/docs/temp"
```

## Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--base-url` | Base URL to crawl | `http://localhost:8000` (local), `https://amplitude.com` (CI) |
| `--sitemap-path` | Path to sitemap | `/docs/sitemap-docs.xml` |
| `--output` | Output file for report | `markdown-issues.json` |
| `--concurrency` | Number of concurrent requests | `10` |
| `--timeout` | Request timeout in milliseconds | `30000` |
| `--ignore-pattern` | URL pattern to ignore (supports wildcards) | none |
| `--ignore-url` | Specific URL to ignore | none |
| `--ignore-file` | File containing ignore patterns/URLs | none |
| `--verbose` | Enable verbose logging | `false` |

## Ignore Configuration

### Ignore File Format

Create a `.crawlerignore` file (or any filename) with patterns and URLs to skip:

```
# Lines starting with # are comments
# Empty lines are ignored

# Ignore specific URLs (exact matches)
/docs/test-page
/docs/sandbox

# Ignore URL patterns using wildcards
/docs/admin/*          # Ignore all URLs starting with /docs/admin/
/docs/*/test-*        # Ignore test pages in any subdirectory
**/draft/**           # Ignore draft pages at any level

# Ignore file types
*.pdf
*.zip

# Ignore entire sections
/docs/jp/*            # Ignore Japanese documentation
```

### Pattern Matching

- `*` matches any characters
- `?` matches single character  
- `**/` matches any directory levels
- Patterns are anchored (must match from start to end)
- Both absolute URLs and relative paths work

### Example Ignore Scenarios

```bash
# Ignore all test/example pages
node crawler.js --ignore-pattern "*/test-*" --ignore-pattern "*/example*"

# Ignore specific documentation sections
node crawler.js --ignore-pattern "/docs/admin/*" --ignore-pattern "/docs/internal/*"

# Ignore non-English content
node crawler.js --ignore-pattern "/docs/jp/*" --ignore-pattern "/docs/es/*"

# Use ignore file for complex rules
node crawler.js --ignore-file .crawlerignore
```

## Detection Patterns

The crawler detects the following unrendered markdown patterns:

### Tables
**Pattern**: `|column1|column2|column3|`  
**Description**: Unrendered table markdown with pipe characters

### Headers
**Pattern**: `# Header`, `## Subheader`, etc.  
**Description**: Unrendered headers with hash symbols

### Code Blocks
**Pattern**: `` `code` `` or ``` code blocks ```  
**Description**: Unrendered inline code or code blocks

### Links
**Pattern**: `[link text](url)`  
**Description**: Unrendered markdown links

### Emphasis
**Pattern**: `**bold**` or `*italic*`  
**Description**: Unrendered bold or italic text

### Lists
**Pattern**: `- item` or `* item`  
**Description**: Unrendered bullet lists

## Report Format

The crawler generates a JSON report with the following structure:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "summary": {
    "totalUrls": 150,
    "totalErrors": 2,
    "totalSkipped": 12,
    "totalIssues": 5,
    "urlsWithIssues": 3,
    "ignorePatterns": ["/docs/admin/*", "*/draft/*"],
    "ignoreUrls": ["/docs/test-page"],
    "issuesByType": [
      {
        "type": "tables",
        "count": 3,
        "description": "Unrendered table (pipe characters)"
      }
    ]
  },
  "markdownIssues": [
    {
      "type": "tables",
      "description": "Unrendered table (pipe characters)",
      "count": 1,
      "samples": ["|Column 1|Column 2|Column 3|"],
      "url": "https://amplitude.com/docs/some-page"
    }
  ],
  "issuesByType": {
    "tables": [/* array of table issues */]
  },
  "issuesByUrl": {
    "https://amplitude.com/docs/some-page": [/* array of issues for this URL */]
  },
  "skippedUrls": [
    "https://amplitude.com/docs/admin/settings",
    "https://amplitude.com/docs/test-page"
  ]
}
```

## CI/CD Integration

### GitHub Actions

The workflow (`.github/workflows/markdown-check.yml`) automatically:

1. **Builds your site** using the existing build process
2. **Starts a local server** with the static files
3. **Runs the crawler** against the local build
4. **Comments on PRs** with results
5. **Uploads reports** as artifacts
6. **Fails the build** if issues are found

### Triggers

- **Push** to `main` or `develop` branches
- **Pull requests** to `main`
- **Daily schedule** at 2 AM UTC
- **Manual trigger** from GitHub Actions tab

### Environment Variables

The workflow uses these variables:
- `APP_URL`: Your application URL (set in GitHub repository variables)

## Local Testing Workflow

1. **Make changes** to your Statamic content
2. **Generate static site**: `php please ssg:generate`
3. **Start local server**: 
   ```bash
   cd storage/app/static
   python3 -m http.server 8000
   ```
4. **Run crawler**: `npm run crawl:local`
5. **Review report**: Check `markdown-issues.json`

## Troubleshooting

### Common Issues

#### Sitemap Not Found
```
Error: Sitemap request failed with status 404
```
**Solution**: Verify your sitemap path. Check if `/docs/sitemap-docs.xml` is accessible.

#### Connection Refused
```
Error: Request failed for http://localhost:8000: connect ECONNREFUSED
```
**Solution**: Ensure your local server is running before running the crawler.

#### False Positives
If you get false positives for tables that are actually rendered correctly, the issue might be:
- Markdown content inside `<script>` tags (filtered out automatically)
- Markdown inside code examples (check if it should be in a code block)

### Debugging

Enable verbose logging:
```bash
node crawler.js --verbose
```

This will show:
- Each URL being crawled
- Progress updates every 50 URLs
- Detailed error messages

### Performance Tuning

For large sites, adjust concurrency:
```bash
# Lower concurrency for stability
node crawler.js --concurrency 3

# Higher concurrency for speed (if server can handle it)
node crawler.js --concurrency 15
```

## Integration with Existing Workflow

The crawler integrates seamlessly with your existing deployment process:

1. **No changes needed** to your existing build process
2. **Runs in parallel** to your regular deploy workflow
3. **Optional enforcement** - you can choose whether to fail builds on issues
4. **Non-intrusive** - doesn't affect your production deployment

## Customization

### Adding New Patterns

Edit `crawler.js` and add new patterns to the `markdownPatterns` object:

```javascript
this.markdownPatterns = {
    // ... existing patterns
    customPattern: {
        regex: /your-regex-here/g,
        description: 'Description of what this detects'
    }
};
```

### Filtering Specific URLs

You can modify the crawler to skip certain URLs by adding filtering logic in the `fetchSitemap()` method:

```javascript
urls = urls.filter(url => !url.includes('/skip-this-path/'));
```

### Custom Report Format

Modify the `generateReport()` method to customize the output format or add additional metrics.

## Support

For issues or questions:
1. Check the GitHub Actions logs for detailed error information
2. Review the generated `markdown-issues.json` report
3. Test locally with `--verbose` flag for debugging 