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
        
        this.results = {
            crawled: 0,
            errors: 0,
            markdownIssues: [],
            summary: {}
        };
        
        this.urlQueue = [];
        this.activeRequests = 0;
        this.processedUrls = new Set();
        
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
            return urls;
            
        } catch (error) {
            throw new Error(`Failed to fetch sitemap: ${error.message}`);
        }
    }

    detectMarkdownIssues(html, url) {
        const issues = [];
        
        // Remove script and style content to avoid false positives
        const cleanHtml = html
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<!--[\s\S]*?-->/gi, '');
        
        for (const [patternName, pattern] of Object.entries(this.markdownPatterns)) {
            const matches = cleanHtml.match(pattern.regex);
            
            if (matches) {
                // Filter out false positives for tables
                if (patternName === 'tables') {
                    const filteredMatches = matches.filter(match => {
                        // Exclude table matches that are already inside proper HTML tables
                        const tableContext = cleanHtml.indexOf(match);
                        const beforeMatch = cleanHtml.substring(Math.max(0, tableContext - 200), tableContext);
                        const afterMatch = cleanHtml.substring(tableContext, Math.min(cleanHtml.length, tableContext + 200));
                        
                        return !(beforeMatch.includes('<table') || afterMatch.includes('</table>'));
                    });
                    
                    if (filteredMatches.length > 0) {
                        issues.push({
                            type: patternName,
                            description: pattern.description,
                            count: filteredMatches.length,
                            samples: filteredMatches.slice(0, 3),
                            url: url
                        });
                    }
                } else {
                    issues.push({
                        type: patternName,
                        description: pattern.description,
                        count: matches.length,
                        samples: matches.slice(0, 3),
                        url: url
                    });
                }
            }
        }
        
        return issues;
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
            totalIssues: this.results.markdownIssues.length,
            urlsWithIssues: Object.keys(issuesByUrl).length,
            issuesByType: Object.keys(issuesByType).map(type => ({
                type,
                count: issuesByType[type].length,
                description: this.markdownPatterns[type]?.description || 'Unknown'
            }))
        };
        
        return {
            ...this.results,
            issuesByType,
            issuesByUrl
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
        console.log(`Errors: ${report.summary.totalErrors}`);
        console.log(`Total Issues: ${report.summary.totalIssues}`);
        console.log(`URLs with Issues: ${report.summary.urlsWithIssues}`);
        
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