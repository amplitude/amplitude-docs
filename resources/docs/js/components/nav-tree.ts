/**
 * Navigation Tree Web Component
 * Built with Lit for modern, maintainable navigation
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export interface NavItem {
  id: string;
  title: string;
  url?: string;
  entry?: string;
  children?: NavItem[];
  is_current?: boolean;
  is_parent?: boolean;
  icon?: string;
}

@customElement('nav-tree')
export class NavTree extends LitElement {
  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String }) currentUri: string = '';
  @property({ type: String }) type: 'standard' | 'catalog' = 'standard';
  
  @state() private expanded = new Set<string>();
  @state() private initialized = false;

  static styles = css`
    :host {
      display: block;
      font-size: 0.875rem;
    }

    .nav-container {
      padding: 1rem;
      display: flex;
      flex-direction: column;
    }

    /* Navigation items */
    .nav-item {
      position: relative;
      transition: all 0.15s ease;
    }

    /* Links */
    .nav-link {
      display: block;
      padding: 0.5rem;
      text-decoration: none;
      color: var(--nav-text-color, #6b7280);
      transition: all 0.15s ease;
      border-radius: 0.25rem;
      line-height: 1.25rem;
    }

    .nav-link:hover {
      color: var(--nav-hover-color, #3b82f6);
      background-color: var(--nav-hover-bg, #f9fafb);
    }

    .nav-link.active {
      color: var(--nav-active-color, #3b82f6);
      background-color: var(--nav-active-bg, rgba(59, 130, 246, 0.1));
      font-weight: 600;
      border-radius: 0.25rem;
    }

    /* Buttons (for sections) */
    .nav-button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.25rem 0.5rem;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--nav-text-color, #6b7280);
      transition: all 0.15s ease;
      position: relative;
    }

    .nav-button:hover {
      color: var(--nav-hover-color, #3b82f6);
    }

    .nav-button.active {
      color: var(--nav-active-color, #3b82f6);
    }

    /* Chevron icon */
    .chevron {
      position: absolute;
      right: 0;
      width: 1rem;
      height: 1rem;
      transition: transform 0.2s ease;
      fill: currentColor;
    }

    .chevron.expanded {
      transform: rotate(180deg);
    }

    /* Children container */
    .nav-children {
      display: flex;
      flex-direction: column;
      margin: 0;
    }

    /* Level-based indentation */
    .level-0 { padding-left: 0; }
    .level-1 { padding-left: 1rem; }
    .level-2 { padding-left: 2rem; }
    .level-3 { padding-left: 3rem; }
    .level-4 { padding-left: 4rem; }

    /* Role cards (for Get Started) */
    .role-card {
      margin-bottom: 1rem;
    }

    .role-card-header {
      width: 100%;
      text-align: left;
      font-weight: 600;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      border-left: 4px solid;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .role-card-header.developer {
      background: linear-gradient(to right, #eef2ff, #f5f3ff);
      border-color: #6366f1;
    }

    .role-card-header.developer:hover {
      background: linear-gradient(to right, #e0e7ff, #ede9fe);
    }

    .role-card-header.analyst {
      background: linear-gradient(to right, #fdf2f8, #fef2f2);
      border-color: #ef4444;
    }

    .role-card-header.analyst:hover {
      background: linear-gradient(to right, #fce7f3, #fee2e2);
    }

    .role-card-header.data-engineer {
      background: linear-gradient(to right, #eff6ff, #ecfeff);
      border-color: #3b82f6;
    }

    .role-card-header.data-engineer:hover {
      background: linear-gradient(to right, #dbeafe, #cffafe);
    }

    .role-card-header.expanded {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .role-card-content {
      background: white;
      border-left: 4px solid;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      padding: 0.5rem 1rem;
    }

    .role-card-content.developer { border-color: #6366f1; }
    .role-card-content.analyst { border-color: #ef4444; }
    .role-card-content.data-engineer { border-color: #3b82f6; }

    /* Catalog-specific styles */
    .catalog-back-link {
      margin-bottom: 1rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      color: var(--nav-text-color, #6b7280);
      text-decoration: none;
      border-radius: 0.25rem;
      transition: all 0.15s ease;
    }

    .catalog-back-link:hover {
      color: var(--nav-hover-color, #3b82f6);
      background-color: var(--nav-hover-bg, #f9fafb);
    }

    /* Hide until initialized to prevent flash */
    :host(:not(.initialized)) {
      opacity: 0;
    }

    :host(.initialized) {
      opacity: 1;
      transition: opacity 0.2s ease;
    }

    /* Icon support */
    .nav-icon {
      display: inline-block;
      width: 0.875rem;
      height: 0.875rem;
      margin-right: 0.5rem;
      color: var(--nav-text-color, #6b7280);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadExpandedState();
    this.autoExpandCurrent();
    this.initialized = true;
    this.classList.add('initialized');
  }

  private loadExpandedState() {
    try {
      const saved = localStorage.getItem('nav-expanded');
      if (saved) {
        this.expanded = new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to load nav state:', e);
    }
  }

  private saveExpandedState() {
    try {
      localStorage.setItem('nav-expanded', JSON.stringify([...this.expanded]));
    } catch (e) {
      console.warn('Failed to save nav state:', e);
    }
  }

  private autoExpandCurrent() {
    const expandParents = (items: NavItem[], parentIds: string[] = []): boolean => {
      for (const item of items) {
        const currentPath = [...parentIds, item.id];
        
        if (item.is_current || (item.url && this.currentUri.includes(item.url))) {
          // Expand all parents
          currentPath.forEach(id => this.expanded.add(id));
          return true;
        }
        
        if (item.children) {
          const found = expandParents(item.children, currentPath);
          if (found) return true;
        }
      }
      return false;
    };

    expandParents(this.items);
  }

  private toggle(id: string) {
    if (this.expanded.has(id)) {
      this.expanded.delete(id);
    } else {
      this.expanded.add(id);
    }
    this.requestUpdate();
    this.saveExpandedState();
  }

  private isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  private getRoleClass(title: string): string {
    if (title.includes("Developer")) return 'developer';
    if (title.includes("Analyst")) return 'analyst';
    if (title.includes("Data Engineer")) return 'data-engineer';
    return '';
  }

  private isRoleCard(title: string): boolean {
    return title.includes("I'm a");
  }

  private renderChevron(expanded: boolean) {
    return html`
      <svg class="chevron ${classMap({ expanded })}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    `;
  }

  private renderItem(item: NavItem, level: number = 0): unknown {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = this.isExpanded(item.id);
    const isActive = item.is_current || (item.url && this.currentUri === item.url);
    const levelClass = `level-${level}`;

    // Role card rendering
    if (level === 0 && this.isRoleCard(item.title)) {
      const roleClass = this.getRoleClass(item.title);
      return html`
        <div class="role-card">
          <button
            class="role-card-header ${roleClass} ${classMap({ expanded: isExpanded })}"
            @click=${() => this.toggle(item.id)}
          >
            <span>${item.title}</span>
            ${this.renderChevron(isExpanded)}
          </button>
          ${isExpanded && hasChildren ? html`
            <div class="role-card-content ${roleClass}">
              ${item.children!.map(child => this.renderItem(child, level + 1))}
            </div>
          ` : nothing}
        </div>
      `;
    }

    // Section header (no URL, has children)
    if (!item.url && hasChildren) {
      return html`
        <div class="nav-item ${levelClass}">
          <button
            class="nav-button ${classMap({ active: isExpanded })}"
            @click=${() => this.toggle(item.id)}
          >
            <span>${item.title}</span>
            ${this.renderChevron(isExpanded)}
          </button>
          ${isExpanded ? html`
            <div class="nav-children">
              ${item.children!.map(child => this.renderItem(child, level + 1))}
            </div>
          ` : nothing}
        </div>
      `;
    }

    // Link with children
    if (item.url && hasChildren) {
      return html`
        <div class="nav-item ${levelClass}">
          <div style="display: flex; align-items: center; position: relative;">
            <a
              href="${item.url}"
              class="nav-link ${classMap({ active: isActive })}"
              style="flex: 1;"
            >
              ${item.icon ? html`<span class="nav-icon">${unsafeHTML(item.icon)}</span>` : nothing}
              ${item.title}
            </a>
            <button
              @click=${() => this.toggle(item.id)}
              style="padding: 0.5rem; background: none; border: none; cursor: pointer;"
            >
              ${this.renderChevron(isExpanded)}
            </button>
          </div>
          ${isExpanded ? html`
            <div class="nav-children">
              ${item.children!.map(child => this.renderItem(child, level + 1))}
            </div>
          ` : nothing}
        </div>
      `;
    }

    // Simple link (most common case)
    if (item.url) {
      return html`
        <div class="nav-item ${levelClass}">
          <a
            href="${item.url}"
            class="nav-link ${classMap({ active: isActive })}"
          >
            ${item.icon ? html`<span class="nav-icon">${unsafeHTML(item.icon)}</span>` : nothing}
            ${item.title}
          </a>
        </div>
      `;
    }

    // Fallback (plain text)
    return html`
      <div class="nav-item ${levelClass}">
        <span style="padding: 0.5rem; color: #9ca3af; font-style: italic;">
          ${item.title}
        </span>
      </div>
    `;
  }

  private renderCatalog() {
    return html`
      <div class="nav-container">
        <a href="/docs/data" class="catalog-back-link">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Data
        </a>
        ${this.items.map(item => html`
          <a
            href="${item.url}"
            class="nav-link ${classMap({ active: item.is_current || this.currentUri === item.url })}"
          >
            ${item.title}
          </a>
        `)}
      </div>
    `;
  }

  render() {
    if (this.type === 'catalog') {
      return this.renderCatalog();
    }

    return html`
      <div class="nav-container">
        ${this.items.map(item => this.renderItem(item, 0))}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-tree': NavTree;
  }
}

