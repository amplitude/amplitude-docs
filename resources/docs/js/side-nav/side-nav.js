import { LitElement, html, css } from 'lit';

/**
 * Amplitude Side Navigation Web Component
 * 
 * A multi-level expandable navigation component built with Lit.
 * Supports up to 3 levels of nested navigation with smooth expand/collapse animations.
 * 
 * Usage:
 * <amp-side-nav current-uri="/docs/analytics/charts">
 *   <amp-nav-item title="Charts" slug="charts" url="/docs/analytics/charts" has-children>
 *     <amp-nav-item title="Event Segmentation" url="/docs/analytics/charts/event-seg" level="2"></amp-nav-item>
 *   </amp-nav-item>
 * </amp-side-nav>
 */

// ============================================
// AmpNavItem - Individual navigation item
// ============================================
export class AmpNavItem extends LitElement {
  static properties = {
    title: { type: String },
    url: { type: String },
    slug: { type: String },
    icon: { type: String },
    level: { type: Number },
    hasChildren: { type: Boolean, attribute: 'has-children' },
    isCurrent: { type: Boolean, attribute: 'is-current' },
    isExpanded: { type: Boolean, state: true },
    parentSlug: { type: String, attribute: 'parent-slug' },
    grandparentSlug: { type: String, attribute: 'grandparent-slug' },
  };

  static styles = css`
    :host {
      display: block;
      font-family: "IBM Plex Sans", sans-serif;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
    }

    .nav-link,
    .nav-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      text-align: left;
      font-family: "IBM Plex Sans", sans-serif;
      font-size: 0.875rem;
      line-height: 1.25rem;
      padding: 0.5rem; /* py-2 px-2 */
      margin: 0;
      position: relative;
      color: #5a5e68; /* amp-gray-600 */
      background: transparent;
      border: none;
      cursor: pointer;
      transition: color 0.15s ease, background-color 0.15s ease;
      width: 100%;
      box-sizing: border-box;
    }

    .nav-link:hover,
    .nav-button:hover {
      color: #1e61f0; /* amp-blue-500 */
    }

    /* Level 2 and 3 items get hover background */
    :host([level="2"]) .nav-link:hover,
    :host([level="3"]) .nav-link:hover {
      background-color: #F4F5F6; /* amp-gray-50 */
      border-radius: 0.25rem;
    }

    .nav-link.active,
    .nav-button.active {
      color: #1e61f0; /* amp-blue-500 */
    }

    .nav-link.is-current {
      background-color: #EBF5FF; /* amp-blue-950 (light blue bg for current) */
      color: #1e61f0; /* amp-blue-500 */
      border-radius: 0.25rem;
    }


    .chevron {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    .chevron.expanded {
      transform: rotate(180deg);
    }

    .children {
      display: none;
      flex-direction: column;
      margin: 0;
      padding-left: 1rem;
    }

    .children.expanded {
      display: flex;
    }

    /* Level 3 children have less padding */
    :host([level="2"]) .children {
      padding-left: 0.5rem;
    }

    .icon {
      display: inline-block;
      padding-right: 0.5rem;
      color: #5a5e68; /* amp-gray-600 */
      height: 0.875rem;
    }

    .icon svg,
    .icon img {
      height: 0.875rem;
      width: auto;
    }

    .title-text {
      flex-grow: 1;
    }
  `;

  constructor() {
    super();
    this.title = '';
    this.url = '';
    this.slug = '';
    this.icon = '';
    this.level = 1;
    this.hasChildren = false;
    this.isCurrent = false;
    this.isExpanded = false;
    this.parentSlug = '';
    this.grandparentSlug = '';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  firstUpdated() {
    // Auto-expand if this item or any descendant is current
    // Must run in firstUpdated() because shadow DOM (and slot) doesn't exist until after first render
    this._checkAutoExpand();
  }

  _checkAutoExpand() {
    // Check if this item is current
    if (this.isCurrent) {
      this.isExpanded = true;
      this._notifyParentToExpand();
      return;
    }

    // Check if any child is current (using slot assignment)
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const children = slot.assignedElements({ flatten: true });
      const hasCurrentChild = children.some(child => {
        if (child.tagName === 'AMP-NAV-ITEM') {
          return child.isCurrent || child.hasCurrentDescendant?.();
        }
        return false;
      });
      if (hasCurrentChild) {
        this.isExpanded = true;
        this._notifyParentToExpand();
      }
    }
  }

  hasCurrentDescendant() {
    if (this.isCurrent) return true;
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const children = slot.assignedElements({ flatten: true });
      return children.some(child => {
        if (child.tagName === 'AMP-NAV-ITEM') {
          return child.isCurrent || child.hasCurrentDescendant?.();
        }
        return false;
      });
    }
    return false;
  }

  _notifyParentToExpand() {
    // Dispatch event to notify parent to expand
    this.dispatchEvent(new CustomEvent('child-is-current', {
      bubbles: true,
      composed: true,
    }));
  }

  _handleClick(e) {
    if (this.hasChildren) {
      // If has URL and children, navigate but also toggle on current page
      if (this.url && !this.isCurrent) {
        // Let the link navigate naturally
        return;
      }
      e.preventDefault();
      this.isExpanded = !this.isExpanded;
    }
  }

  _handleButtonClick(e) {
    e.preventDefault();
    this.isExpanded = !this.isExpanded;
  }

  _renderChevron() {
    if (!this.hasChildren) return '';
    return html`
      <svg class="chevron ${this.isExpanded ? 'expanded' : ''}" 
           viewBox="0 0 24 24" 
           fill="none" 
           stroke="currentColor" 
           stroke-width="2">
        <polyline points="6,9 12,15 18,9"></polyline>
      </svg>
    `;
  }

  _renderIcon() {
    if (!this.icon) return '';
    // The icon will be passed as a URL to an SVG
    return html`<span class="icon"><img src="${this.icon}" alt="" /></span>`;
  }

  render() {
    const isActive = this.isExpanded;
    const linkClasses = `nav-link ${isActive ? 'active' : ''} ${this.isCurrent ? 'is-current' : ''}`;
    const buttonClasses = `nav-button ${isActive ? 'active' : ''}`;

    // If has URL and children - render as link with click handler
    if (this.url && this.hasChildren) {
      return html`
        <div class="nav-item">
          <a href="${this.url}" 
             class="${linkClasses}"
             @click="${this._handleClick}">
            ${this._renderIcon()}
            <span class="title-text">${this.title}</span>
            ${this._renderChevron()}
          </a>
          <div class="children ${this.isExpanded ? 'expanded' : ''}">
            <slot></slot>
          </div>
        </div>
      `;
    }

    // If has URL only - render as plain link
    if (this.url) {
      return html`
        <div class="nav-item">
          <a href="${this.url}" class="${linkClasses}">
            ${this._renderIcon()}
            <span class="title-text">${this.title}</span>
          </a>
        </div>
      `;
    }

    // No URL but has children - render as button
    if (this.hasChildren) {
      return html`
        <div class="nav-item">
          <button class="${buttonClasses}" @click="${this._handleButtonClick}">
            ${this._renderIcon()}
            <span class="title-text">${this.title}</span>
            ${this._renderChevron()}
          </button>
          <div class="children ${this.isExpanded ? 'expanded' : ''}">
            <slot></slot>
          </div>
        </div>
      `;
    }

    // Fallback - just title
    return html`
      <div class="nav-item">
        <span class="nav-link">${this.title}</span>
      </div>
    `;
  }
}

// ============================================
// AmpSideNav - Container component
// ============================================
export class AmpSideNav extends LitElement {
  static properties = {
    currentUri: { type: String, attribute: 'current-uri' },
    navTitle: { type: String, attribute: 'nav-title' },
  };

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: "IBM Plex Sans", sans-serif;
    }

    .nav-container {
      display: flex;
      flex-direction: column;
    }

    ::slotted(amp-nav-item) {
      display: block;
      font-family: "IBM Plex Sans", sans-serif;
    }
  `;

  constructor() {
    super();
    this.currentUri = '';
    this.navTitle = '';
  }

  connectedCallback() {
    super.connectedCallback();
    // Listen for child-is-current events to handle auto-expansion
    this.addEventListener('child-is-current', this._handleChildCurrent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('child-is-current', this._handleChildCurrent);
  }

  _handleChildCurrent(e) {
    // The event bubbles up, so parents can react
    // This is handled by the individual AmpNavItem components
  }

  firstUpdated() {
    // After first render, trigger expansion check on all children
    this._checkCurrentItems();
  }

  _checkCurrentItems() {
    const items = this.querySelectorAll('amp-nav-item');
    items.forEach(item => {
      if (item.isCurrent) {
        // Expand all ancestors
        let parent = item.parentElement;
        while (parent && parent !== this) {
          if (parent.tagName === 'AMP-NAV-ITEM') {
            parent.isExpanded = true;
          }
          parent = parent.parentElement;
        }
      }
    });
  }

  render() {
    return html`
      <div class="nav-container">
        <slot></slot>
      </div>
    `;
  }
}

// ============================================
// AmpCatalogNav - Simple catalog navigation
// ============================================
export class AmpCatalogNav extends LitElement {
  static properties = {
    backUrl: { type: String, attribute: 'back-url' },
    backLabel: { type: String, attribute: 'back-label' },
    currentUri: { type: String, attribute: 'current-uri' },
  };

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: "IBM Plex Sans", sans-serif;
    }

    .nav-container {
      display: flex;
      flex-direction: column;
    }

    .back-link {
      text-decoration: none;
      text-align: left;
      font-size: 0.875rem;
      margin: 0;
      padding: 0.5rem 0.5rem;
      position: relative;
      color: #5a5e68; /* amp-gray-600 */
      transition: color 0.15s ease;
    }

    .back-link:hover {
      color: #1e61f0; /* amp-blue-500 */
    }

    ::slotted(a) {
      text-decoration: none;
      text-align: left;
      font-size: 0.875rem;
      margin: 0;
      padding: 0.5rem 0.5rem;
      position: relative;
      color: #5a5e68;
      display: block;
      transition: color 0.15s ease, background-color 0.15s ease;
    }

    ::slotted(a:hover) {
      color: #1e61f0;
      background-color: #F4F5F6;
      border-radius: 0.25rem;
    }

    ::slotted(a.active) {
      background-color: #EBF5FF;
      color: #1e61f0;
      border-radius: 0.25rem;
    }
  `;

  constructor() {
    super();
    this.backUrl = '/docs/data';
    this.backLabel = 'Back to Data';
    this.currentUri = '';
  }

  render() {
    return html`
      <div class="nav-container">
        <a href="${this.backUrl}" class="back-link">${this.backLabel}</a>
        <slot></slot>
      </div>
    `;
  }
}

// Register custom elements
customElements.define('amp-nav-item', AmpNavItem);
customElements.define('amp-side-nav', AmpSideNav);
customElements.define('amp-catalog-nav', AmpCatalogNav);

// Auto-scroll to active item on page load
window.addEventListener('load', () => {
  const activeItem = document.querySelector('amp-nav-item[is-current]');
  if (activeItem) {
    // Small delay to ensure rendering is complete
    setTimeout(() => {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
});

