import headingsAnchors from './heading-anchors'
import codeCopy from './code-copy';

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
