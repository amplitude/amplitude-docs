import headingsAnchors from './heading-anchors'
import codeCopy from './code-copy';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'prismjs/plugins/toolbar/prism-toolbar';                 
import 'prismjs/plugins/show-language/prism-show-language';     
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'; 



headingsAnchors()
codeCopy()


window.onload = function() {
    const element = document.querySelector('.active');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};


document.addEventListener('DOMContentLoaded', function () {
    // Select all images with the expandable-image class
    const expandableImages = document.querySelectorAll('.expandable-image');

    // Loop through each image and add the click event listener
    expandableImages.forEach(image => {
        image.addEventListener('click', function () {
            // Open the image source in a new tab
            window.open(image.src, '_blank');
        });
    });

    Prism.highlightAll();
    

    document
    .querySelectorAll('.copy-to-clipboard-button')
    .forEach(button => {
      // 1) clear out the old text
      button.textContent = '';
      // 2) inject your SVG
      button.insertAdjacentHTML('afterbegin', `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7">
          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
        </svg>
      `);
      const container = button.parentElement;
      container.style.position = container.style.position || 'relative';

      // c) Attach click handler to show “Copied!” tooltip
      button.addEventListener('click', () => {
        const tip = document.createElement('span');
        tip.className = 'copy-tooltip';
        tip.textContent = 'Copied!';
        container.appendChild(tip);

        // after a short delay, fade out and remove
        setTimeout(() => {
          tip.classList.add('fade-out');
          tip.addEventListener('transitionend', () => tip.remove());
        }, 800);
      });
    });
});

// site.js

// site.js

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('copy-md');
  if (!btn) return; // nothing to do if no button

  // Helper: strip YAML front matter delimited by '---' at the top of the file
  function stripFrontMatter(text) {
    // ^--- start of front matter
    // [\r\n]+ after the opening ---
    // [\s\S]*? match everything (non-greedy) up to...
    // \r?\n---[\r\n] closing --- on its own line
    return text.replace(/^---[\r\n]+[\s\S]*?[\r\n]+---[\r\n]*/, '');
  }

  btn.addEventListener('click', async () => {
    // 1. Fetch the raw Markdown
    let raw;
    try {
      const resp = await fetch(btn.dataset.mdUrl);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      raw = await resp.text();
    } catch (err) {
      console.error('Failed to fetch Markdown:', err);
      alert('⚠️ Could not load Markdown source.');
      return;
    }

    // 2. Strip out YAML front matter
    const md = stripFrontMatter(raw);

    // 3. Try the modern Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(md);
        return;
      } catch (err) {
        console.warn('Clipboard API failed, falling back:', err);
      }
    }

    // 4. Fallback for older browsers / insecure contexts
    const ta = document.createElement('textarea');
    ta.value = md;
    Object.assign(ta.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '1px',
      height: '1px',
      padding: '0',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      background: 'transparent',
    });
    document.body.appendChild(ta);
    ta.focus();
    ta.select();

    try {
      const ok = document.execCommand('copy');

    } catch (err) {
      console.error('execCommand copy failed:', err);
    }

    document.body.removeChild(ta);
  });
});
