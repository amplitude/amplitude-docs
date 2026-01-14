#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const { XMLParser } = require('fast-xml-parser');

class MarkdownCrawler {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || 'https://amplitude.com';
        this.sitemapPath = options.sitemapPath || '/docs/sitemap-docs.xml';
        this.maxConcurrency = options.maxConcurrency || 10;
        this.timeout = options.timeout || 30000;
        this.userAgent = options.userAgent || 'Amplitude-Docs-Markdown-Crawler/1.0';
        this.outputFile = options.outputFile || 'markdown-issues.json';
        this.verbose = options.verbose || false;
        
        // URL ignore patterns and configuration
        this.ignorePatterns = options.ignorePatterns || [];
        this.ignoreUrls = options.ignoreUrls || [];
        this.ignoreFile = options.ignoreFile || null;
        
        // Load ignore patterns from file if specified
        if (this.ignoreFile) {
            this.loadIgnoreFile();
        }
        
        this.results = {
            crawled: 0,
            errors: 0,
            skipped: 0,
            markdownIssues: [],
            summary: {}
        };
        
        this.urlQueue = [];
        this.activeRequests = 0;
        this.processedUrls = new Set();
        this.skippedUrls = new Set();
        
        // Markdown detection patterns
        this.markdownPatterns = {
            tables: {
                regex: /\|[^|]*\|[^|]*\|/g,
                description: 'Unrendered table (pipe characters)'
            },
            headers: {
                regex: /^#{1,6}\s+.+$/gm,
                description: 'Unrendered headers (# symbols)'
            },
            codeBlocks: {
                regex: /```[\s\S]*?```|`[^`]+`/g,
                description: 'Unrendered code blocks'
            },
            links: {
                regex: /\[([^\]]+)\]\(([^)]+)\)/g,
                description: 'Unrendered links [text](url)'
            },
            emphasis: {
                regex: /\*\*([^*]+)\*\*|\*([^*]+)\*/g,
                description: 'Unrendered emphasis (**bold** or *italic*)'
            },
            lists: {
                regex: /^[\s]*[-*+]\s+.+$/gm,
                description: 'Unrendered lists (- or * bullets)'
            }
        };
    }

    log(message, level = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = level.toUpperCase();
        
        if (level === 'error' || this.verbose || level === 'success') {
            console.log(`[${timestamp}] ${prefix}: ${message}`);
        }
    }

    async fetchUrl(url) {
        return new Promise((resolve, reject) => {
            const urlObj = new URL(url);
            const isHttps = urlObj.protocol === 'https:';
            const client = isHttps ? https : http;
            
            const options = {
                hostname: urlObj.hostname,
                port: urlObj.port || (isHttps ? 443 : 80),
                path: urlObj.pathname + urlObj.search,
                method: 'GET',
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
                },
                timeout: this.timeout
            };

            const req = client.request(options, (res) => {
                let data = '';
                
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: data,
                        url: url
                    });
                });
            });
            
            req.on('error', (error) => {
                reject(new Error(`Request failed for ${url}: ${error.message}`));
            });
            
            req.on('timeout', () => {
                req.destroy();
                reject(new Error(`Request timeout for ${url}`));
            });
            
            req.end();
        });
    }

    async fetchSitemap() {
        this.log('Fetching sitemap...');
        const sitemapUrl = this.baseUrl + this.sitemapPath;
        
        try {
            const response = await this.fetchUrl(sitemapUrl);
            
            if (response.statusCode !== 200) {
                throw new Error(`Sitemap request failed with status ${response.statusCode}`);
            }
            
            const parser = new XMLParser();
            const parsed = parser.parse(response.body);
            
            let urls = [];
            if (parsed.urlset && parsed.urlset.url) {
                const urlEntries = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
                urls = urlEntries.map(entry => {
                    if (typeof entry === 'string') return entry;
                    return entry.loc || entry;
                }).filter(url => url);
            }
            
            this.log(`Found ${urls.length} URLs in sitemap`);
            
            // Filter out ignored URLs
            const originalCount = urls.length;
            const filteredUrls = [];
            
            for (const url of urls) {
                if (this.shouldIgnoreUrl(url)) {
                    this.skippedUrls.add(url);
                    this.log(`Ignoring URL: ${url}`, 'debug');
                } else {
                    filteredUrls.push(url);
                }
            }
            
            const skippedCount = originalCount - filteredUrls.length;
            if (skippedCount > 0) {
                this.log(`Filtered out ${skippedCount} ignored URLs, ${filteredUrls.length} remaining`);
            }
            
            return filteredUrls;
            
        } catch (error) {
            throw new Error(`Failed to fetch sitemap: ${error.message}`);
        }
    }

    detectMarkdownIssues(html, url) {
        const issues = [];
        
        // Build a list of code regions in the original HTML
        // This allows us to check if any match falls within a code block
        const codeRegions = this.findCodeRegions(html);
        
        // Create cleaned HTML by replacing code regions with placeholder spaces
        // This preserves indices for accurate position checking
        let cleanHtml = html;
        
        // Remove HTML comments first (they may contain markdown-like syntax)
        cleanHtml = cleanHtml.replace(/<!--[\s\S]*?-->/gi, match => ' '.repeat(match.length));
        
        // Remove data attributes that might contain markdown-like syntax
        cleanHtml = cleanHtml.replace(/\sdata-[^=]*="[^"]*"/gi, match => ' '.repeat(match.length));
        
        // Replace code regions with spaces (preserving length for index alignment)
        for (const region of codeRegions) {
            const placeholder = ' '.repeat(region.end - region.start);
            cleanHtml = cleanHtml.substring(0, region.start) + placeholder + cleanHtml.substring(region.end);
        }
        
        for (const [patternName, pattern] of Object.entries(this.markdownPatterns)) {
            const matches = [];
            let match;
            const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
            
            while ((match = regex.exec(cleanHtml)) !== null) {
                const matchStart = match.index;
                const matchEnd = matchStart + match[0].length;
                
                // Check if this match overlaps with any code region
                const inCodeRegion = codeRegions.some(region => 
                    (matchStart >= region.start && matchStart < region.end) ||
                    (matchEnd > region.start && matchEnd <= region.end) ||
                    (matchStart <= region.start && matchEnd >= region.end)
                );
                
                if (!inCodeRegion) {
                    matches.push(match[0]);
                }
                
                // Prevent infinite loop for global regexes
                if (!pattern.regex.global) break;
            }
            
            if (matches.length > 0) {
                let filteredMatches = matches;
                
                // Special filtering for different pattern types
                if (patternName === 'tables') {
                    filteredMatches = matches.filter(matchText => {
                        const tableContext = cleanHtml.indexOf(matchText);
                        const beforeMatch = cleanHtml.substring(Math.max(0, tableContext - 200), tableContext);
                        const afterMatch = cleanHtml.substring(tableContext, Math.min(cleanHtml.length, tableContext + 200));
                        
                        return !(beforeMatch.includes('<table') || afterMatch.includes('</table>'));
                    });
                } else if (patternName === 'links') {
                    filteredMatches = matches.filter(matchText => {
                        const linkContext = cleanHtml.indexOf(matchText);
                        const beforeMatch = cleanHtml.substring(Math.max(0, linkContext - 50), linkContext);
                        const afterMatch = cleanHtml.substring(linkContext, Math.min(cleanHtml.length, linkContext + 50));
                        
                        return !(beforeMatch.includes('<a ') || afterMatch.includes('</a>'));
                    });
                }
                
                if (filteredMatches.length > 0) {
                    issues.push({
                        type: patternName,
                        description: pattern.description,
                        count: filteredMatches.length,
                        samples: filteredMatches.slice(0, 3),
                        url: url
                    });
                }
            }
        }
        
        return issues;
    }
    
    /**
     * Find all code regions in the HTML that should be excluded from markdown detection.
     * Returns an array of {start, end} objects representing character positions.
     */
    findCodeRegions(html) {
        const regions = [];
        
        // Tags whose content should be completely ignored
        const tagsToIgnore = ['script', 'style', 'title', 'code', 'pre', 'textarea', 'kbd', 'samp', 'var'];
        
        for (const tag of tagsToIgnore) {
            // Match opening tag, content, and closing tag
            // Using a greedy approach for nested tags of the same type
            const regex = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'gi');
            let match;
            
            while ((match = regex.exec(html)) !== null) {
                regions.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    tag: tag
                });
            }
        }
        
        // Also find elements with code-related classes
        const codeClassPatterns = [
            // Elements with class containing 'code', 'highlight', 'language-', etc.
            /<(\w+)[^>]*class="[^"]*\b(?:code|highlight|language-\w*|hljs|prism|syntax|snippet)\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
        ];
        
        for (const pattern of codeClassPatterns) {
            let match;
            while ((match = pattern.exec(html)) !== null) {
                regions.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    tag: 'class-based'
                });
            }
        }
        
        // Find inline code patterns in attributes (like title="some `code` here")
        const attrCodePattern = /(?:title|alt|aria-label|data-\w+)="[^"]*`[^`]*`[^"]*"/gi;
        let attrMatch;
        while ((attrMatch = attrCodePattern.exec(html)) !== null) {
            regions.push({
                start: attrMatch.index,
                end: attrMatch.index + attrMatch[0].length,
                tag: 'attribute'
            });
        }
        
        // Sort regions by start position and merge overlapping regions
        regions.sort((a, b) => a.start - b.start);
        
        const mergedRegions = [];
        for (const region of regions) {
            if (mergedRegions.length === 0) {
                mergedRegions.push(region);
            } else {
                const last = mergedRegions[mergedRegions.length - 1];
                if (region.start <= last.end) {
                    // Overlapping or adjacent - extend the last region
                    last.end = Math.max(last.end, region.end);
                } else {
                    mergedRegions.push(region);
                }
            }
        }
        
        return mergedRegions;
    }

    async processUrl(url) {
        if (this.processedUrls.has(url)) {
            return;
        }
        
        this.processedUrls.add(url);
        this.activeRequests++;
        
        try {
            this.log(`Crawling: ${url}`, 'debug');
            const response = await this.fetchUrl(url);
            
            if (response.statusCode !== 200) {
                this.log(`HTTP ${response.statusCode} for ${url}`, 'warn');
                this.results.errors++;
                return;
            }
            
            const contentType = response.headers['content-type'] || '';
            if (!contentType.includes('text/html')) {
                this.log(`Skipping non-HTML content: ${url}`, 'debug');
                return;
            }
            
            const issues = this.detectMarkdownIssues(response.body, url);
            
            if (issues.length > 0) {
                this.results.markdownIssues.push(...issues);
                this.log(`Found ${issues.length} markdown issues on ${url}`, 'warn');
            }
            
            this.results.crawled++;
            
            if (this.results.crawled % 50 === 0) {
                this.log(`Progress: ${this.results.crawled} pages crawled, ${this.results.markdownIssues.length} issues found`);
            }
            
        } catch (error) {
            this.log(`Error crawling ${url}: ${error.message}`, 'error');
            this.results.errors++;
        } finally {
            this.activeRequests--;
            this.processNextUrl();
        }
    }

    async processNextUrl() {
        if (this.urlQueue.length > 0 && this.activeRequests < this.maxConcurrency) {
            const url = this.urlQueue.shift();
            await this.processUrl(url);
        }
    }

    async crawl() {
        try {
            const urls = await this.fetchSitemap();
            this.urlQueue = [...urls];
            
            this.log(`Starting crawl of ${urls.length} URLs with concurrency ${this.maxConcurrency}`);
            
            // Start initial batch of requests
            const initialBatch = Math.min(this.maxConcurrency, this.urlQueue.length);
            for (let i = 0; i < initialBatch; i++) {
                this.processNextUrl();
            }
            
            // Wait for all requests to complete
            return new Promise((resolve) => {
                const checkCompletion = setInterval(() => {
                    if (this.activeRequests === 0 && this.urlQueue.length === 0) {
                        clearInterval(checkCompletion);
                        resolve();
                    }
                }, 100);
            });
            
        } catch (error) {
            this.log(`Crawl failed: ${error.message}`, 'error');
            throw error;
        }
    }

    generateReport() {
        // Group issues by type and URL
        const issuesByType = {};
        const issuesByUrl = {};
        
        this.results.markdownIssues.forEach(issue => {
            if (!issuesByType[issue.type]) {
                issuesByType[issue.type] = [];
            }
            issuesByType[issue.type].push(issue);
            
            if (!issuesByUrl[issue.url]) {
                issuesByUrl[issue.url] = [];
            }
            issuesByUrl[issue.url].push(issue);
        });
        
        this.results.summary = {
            totalUrls: this.results.crawled,
            totalErrors: this.results.errors,
            totalSkipped: this.results.skipped || this.skippedUrls.size,
            totalIssues: this.results.markdownIssues.length,
            urlsWithIssues: Object.keys(issuesByUrl).length,
            ignorePatterns: this.ignorePatterns,
            ignoreUrls: this.ignoreUrls,
            issuesByType: Object.keys(issuesByType).map(type => ({
                type,
                count: issuesByType[type].length,
                description: this.markdownPatterns[type]?.description || 'Unknown'
            }))
        };
        
        return {
            ...this.results,
            issuesByType,
            issuesByUrl,
            skippedUrls: Array.from(this.skippedUrls)
        };
    }

    async saveReport(report) {
        const reportData = {
            timestamp: new Date().toISOString(),
            ...report
        };
        
        fs.writeFileSync(this.outputFile, JSON.stringify(reportData, null, 2));
        this.log(`Report saved to ${this.outputFile}`, 'success');
    }

    printSummary(report) {
        console.log('\n=== MARKDOWN CRAWL SUMMARY ===');
        console.log(`Crawled URLs: ${report.summary.totalUrls}`);
        console.log(`Skipped URLs: ${report.summary.totalSkipped || 0}`);
        console.log(`Errors: ${report.summary.totalErrors}`);
        console.log(`Total Issues: ${report.summary.totalIssues}`);
        console.log(`URLs with Issues: ${report.summary.urlsWithIssues}`);
        
        if (report.summary.totalSkipped > 0) {
            console.log(`\nIgnore Configuration:`);
            if (report.summary.ignorePatterns && report.summary.ignorePatterns.length > 0) {
                console.log(`  Patterns: ${report.summary.ignorePatterns.join(', ')}`);
            }
            if (report.summary.ignoreUrls && report.summary.ignoreUrls.length > 0) {
                console.log(`  URLs: ${report.summary.ignoreUrls.slice(0, 3).join(', ')}${report.summary.ignoreUrls.length > 3 ? '...' : ''}`);
            }
        }
        
        if (report.summary.issuesByType.length > 0) {
            console.log('\nIssues by Type:');
            report.summary.issuesByType.forEach(item => {
                console.log(`  ${item.type}: ${item.count} (${item.description})`);
            });
        }
        
        if (report.summary.totalIssues > 0) {
            console.log('\nSample Issues:');
            Object.keys(report.issuesByUrl).slice(0, 5).forEach(url => {
                console.log(`\n  ${url}:`);
                report.issuesByUrl[url].forEach(issue => {
                    console.log(`    - ${issue.type}: ${issue.count} occurrences`);
                    if (issue.samples.length > 0) {
                        console.log(`      Sample: "${issue.samples[0].substring(0, 100)}..."`);
                    }
                });
            });
        }
        
        console.log(`\nExit code: ${report.summary.totalIssues > 0 ? 1 : 0}`);
    }

    loadIgnoreFile() {
        try {
            const fs = require('fs');
            if (fs.existsSync(this.ignoreFile)) {
                const content = fs.readFileSync(this.ignoreFile, 'utf8');
                const lines = content.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('#'));
                
                lines.forEach(line => {
                    if (line.startsWith('/') || line.includes('*') || line.includes('?')) {
                        // Pattern
                        this.ignorePatterns.push(line);
                    } else {
                        // Exact URL
                        this.ignoreUrls.push(line);
                    }
                });
                
                this.log(`Loaded ${lines.length} ignore rules from ${this.ignoreFile}`);
            }
        } catch (error) {
            this.log(`Warning: Could not load ignore file ${this.ignoreFile}: ${error.message}`, 'warn');
        }
    }

    shouldIgnoreUrl(url) {
        // Check exact URL matches
        if (this.ignoreUrls.includes(url)) {
            return true;
        }
        
        // Check URL without base for exact matches
        const relativeUrl = url.replace(this.baseUrl, '');
        if (this.ignoreUrls.includes(relativeUrl)) {
            return true;
        }
        
        // Check patterns
        for (const pattern of this.ignorePatterns) {
            if (this.matchesPattern(url, pattern) || this.matchesPattern(relativeUrl, pattern)) {
                return true;
            }
        }
        
        return false;
    }

    matchesPattern(url, pattern) {
        // Convert glob-like patterns to regex
        let regexPattern = pattern
            .replace(/\*/g, '.*')  // * matches any characters
            .replace(/\?/g, '.')   // ? matches single character
            .replace(/\//g, '\\/'); // Escape forward slashes
        
        // Anchor the pattern
        if (!regexPattern.startsWith('^')) {
            regexPattern = '^' + regexPattern;
        }
        if (!regexPattern.endsWith('$')) {
            regexPattern = regexPattern + '$';
        }
        
        try {
            const regex = new RegExp(regexPattern);
            return regex.test(url);
        } catch (error) {
            this.log(`Invalid ignore pattern: ${pattern}`, 'warn');
            return false;
        }
    }
}

// CLI Interface
async function main() {
    const args = process.argv.slice(2);
    const options = {};
    
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^--/, '');
        const value = args[i + 1];
        
        switch (key) {
            case 'base-url':
                options.baseUrl = value;
                break;
            case 'sitemap-path':
                options.sitemapPath = value;
                break;
            case 'output':
                options.outputFile = value;
                break;
            case 'concurrency':
                options.maxConcurrency = parseInt(value);
                break;
            case 'timeout':
                options.timeout = parseInt(value);
                break;
            case 'ignore-pattern':
                if (!options.ignorePatterns) options.ignorePatterns = [];
                options.ignorePatterns.push(value);
                break;
            case 'ignore-url':
                if (!options.ignoreUrls) options.ignoreUrls = [];
                options.ignoreUrls.push(value);
                break;
            case 'ignore-file':
                options.ignoreFile = value;
                break;
            case 'verbose':
                options.verbose = true;
                i--; // No value for boolean flag
                break;
        }
    }
    
    // Set defaults based on environment
    if (process.env.CI) {
        options.baseUrl = options.baseUrl || process.env.DEPLOY_URL || 'https://amplitude.com';
        options.verbose = true;
    } else {
        options.baseUrl = options.baseUrl || 'http://localhost:8000';
    }
    
    const crawler = new MarkdownCrawler(options);
    
    try {
        await crawler.crawl();
        const report = crawler.generateReport();
        await crawler.saveReport(report);
        crawler.printSummary(report);
        
        // Exit with error code if issues found (for CI)
        process.exit(report.summary.totalIssues > 0 ? 1 : 0);
        
    } catch (error) {
        console.error('Crawl failed:', error.message);
        process.exit(1);
    }
}

// Export for testing
module.exports = MarkdownCrawler;

// Run if called directly
if (require.main === module) {
    main();
} 