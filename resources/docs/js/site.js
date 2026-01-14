import headingsAnchors from './heading-anchors'
import codeCopy from './code-copy';
import Prism from 'prismjs';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-ruby';
import 'prismjs/plugins/toolbar/prism-toolbar';                 
import 'prismjs/plugins/show-language/prism-show-language';     
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

// Expose tippy globally for inline scripts that may need it
window.tippy = tippy; 

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

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.code-toolbar').forEach(toolbar => {
        Prism.highlightAllUnder(toolbar);
    });
    initApiKeyFeature();
});

// Re-highlight code blocks after Alpine.js initializes (Alpine might strip tokens)
document.addEventListener('alpine:init', function() {
    setTimeout(() => {
        document.querySelectorAll('.code-toolbar').forEach(toolbar => {
            Prism.highlightAllUnder(toolbar);
        });
    }, 100);
});

// Also listen for when Alpine is done processing the DOM
document.addEventListener('alpine:initialized', function() {
    setTimeout(() => {
        document.querySelectorAll('.code-toolbar').forEach(toolbar => {
            Prism.highlightAllUnder(toolbar);
        });
    }, 100);
});

// Re-highlight after Amplitude Engagement SDK loads (it manipulates DOM)
// Use MutationObserver to watch for DOM changes that strip Prism tokens
let highlightTimeout;
const observer = new MutationObserver((mutations) => {
    // Check if any code blocks lost their tokens
    const codeBlocks = document.querySelectorAll('code[class*="language-"]');
    const hasBlockWithoutTokens = Array.from(codeBlocks).some(block => 
        // CRITICAL: Don't use textContent as it strips Prism tokens in Chrome
        // Instead check innerHTML length (preserves tokens) and count token elements
        block.innerHTML.trim().length > 0 && block.querySelectorAll('.token').length === 0
    );
    
    if (hasBlockWithoutTokens) {
        // Debounce: wait for DOM changes to settle
        clearTimeout(highlightTimeout);
        highlightTimeout = setTimeout(() => {
            document.querySelectorAll('.code-toolbar').forEach(toolbar => {
                Prism.highlightAllUnder(toolbar);
            });
        }, 300);
    }
});

// Start observing after a short delay (let initial rendering complete)
setTimeout(() => {
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
}, 1000);

// Expose API key functionality globally for debugging
window.amplitudeApiKeyFeature = {
    showModal: showApiKeyModal,
    updateBlocks: updateAllCodeBlocks,
    addButtons: addManualApiKeyButtons,
    init: initApiKeyFeature
};

// API Key Management for Amplitude code snippets
function initApiKeyFeature() {
    // Add manual buttons with multiple retry attempts to handle dynamic content
    addManualApiKeyButtonsWithRetry();
    
    // Check if we have an API key stored and update code blocks
    const storedApiKey = localStorage.getItem('amplitude_api_key');
    if (storedApiKey) {
        updateAllCodeBlocks(storedApiKey);
    }
}

function addManualApiKeyButtonsWithRetry() {
    let attempts = 0;
    const maxAttempts = 10; // Try for up to 5 seconds
    
    function tryAddButtons() {
        attempts++;
        
        const foundButtons = addManualApiKeyButtons();
        
        if (foundButtons === 0 && attempts < maxAttempts) {
            // No buttons found, try again in 500ms
            setTimeout(tryAddButtons, 500);
        }
    }
    
    // Start trying immediately
    tryAddButtons();
}

function addManualApiKeyButtons() {
    const codeBlocks = document.querySelectorAll('code[class*="language-"], code');
    let buttonsAdded = 0;
    const storedApiKey = localStorage.getItem('amplitude_api_key');
    
    codeBlocks.forEach((codeBlock, index) => {
        // Check if this code block has .code-toolbar as an ancestor
        const hasToolbar = codeBlock.closest('.code-toolbar');
        
        if (!hasToolbar) {
            return;
        }
        
        // CRITICAL: Never read textContent directly as it strips Prism tokens in Chrome
        // Instead, check data-original-content (if it exists) or innerHTML (which preserves tokens)
        const originalContent = codeBlock.getAttribute('data-original-content');
        const hasApiKey = originalContent 
            ? originalContent.includes('AMPLITUDE_API_KEY')
            : codeBlock.innerHTML.includes('AMPLITUDE_API_KEY');
        
        // Skip blocks that don't have the API key placeholder
        if (!hasApiKey) {
            return;
        }
        
        // Now we know this block has the placeholder, safe to continue
        const alreadyHasButton = codeBlock.parentElement.querySelector('.api-key-manual-button');
        
        if (!alreadyHasButton) {
            const container = codeBlock.closest('pre') || codeBlock.parentElement;
            
            // Create a wrapper if needed
            if (!container.style.position || container.style.position === 'static') {
                container.style.position = 'relative';
            }
            
            // Create the API key button
            const apiKeyButton = document.createElement('button');
            apiKeyButton.className = 'api-key-manual-button';
            apiKeyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z"/>
                </svg>
            `;
            apiKeyButton.title = 'Set your Amplitude API Key';
            
            // Add click handler
            apiKeyButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showApiKeyModal();
            });
            
            container.appendChild(apiKeyButton);
            buttonsAdded++;
            
            // Add Tippy tooltip only if no API key is stored
            // Only add to the first matching button to avoid multiple tooltips
            if (!storedApiKey && window.tippy && buttonsAdded === 1) {
                const tooltipInstance = window.tippy(apiKeyButton, {
                    content: 'Add your API key to personalize code samples',
                    placement: 'top',
                    theme: 'amplitude-api-key',
                    trigger: 'mouseenter focus',
                    hideOnClick: true,
                });
                apiKeyButton._tippyInstance = tooltipInstance;
                
                // Delay showing tooltip to allow DOM to fully render
                setTimeout(() => {
                    const rect = apiKeyButton.getBoundingClientRect();
                    // Only show if button is visible and properly positioned
                    if (tooltipInstance && !localStorage.getItem('amplitude_api_key') && rect.width > 0 && rect.top > 0) {
                        tooltipInstance.show();
                        
                        // Auto-hide after 5 seconds
                        setTimeout(() => {
                            if (tooltipInstance.state && tooltipInstance.state.isVisible) {
                                tooltipInstance.hide();
                            }
                        }, 5000);
                    }
                }, 1000);
            }
        }
    });
    
    return buttonsAdded;
}

function showApiKeyModal() {
    const currentApiKey = localStorage.getItem('amplitude_api_key') || '';
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'api-key-modal-overlay';
    modal.innerHTML = `
        <div class="api-key-modal">
            <div class="api-key-modal-header">
                <h3>Set Your Amplitude API Key</h3>
                <button class="api-key-modal-close">&times;</button>
            </div>
            <div class="api-key-modal-body">
                <p>Enter your Amplitude API Key to personalize code snippets.</p>
                <p>Need an API key? Create a <a href="https://app.amplitude.com/signup" target="_blank" style="color: rgb(30,97,240);">free Amplitude account</a> to get started.</p>
                <input type="text" id="api-key-input" placeholder="Enter your API Key" value="${currentApiKey}" />
                <div class="api-key-modal-actions">
                    <button id="api-key-save" class="api-key-btn-primary">Save & Update Code</button>
                    <button id="api-key-clear" class="api-key-btn-secondary">Clear API Key</button>
                    <button id="api-key-cancel" class="api-key-btn-secondary">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus the input
    const input = document.getElementById('api-key-input');
    input.focus();
    input.select();
    
    // Event handlers
    document.getElementById('api-key-save').addEventListener('click', () => {
        const apiKey = input.value.trim();
        if (apiKey) {
            localStorage.setItem('amplitude_api_key', apiKey);
            updateAllCodeBlocks(apiKey);
            showNotification('API Key saved! All code snippets updated.');
        }
        closeModal();
    });
    
    document.getElementById('api-key-clear').addEventListener('click', () => {
        localStorage.removeItem('amplitude_api_key');
        updateAllCodeBlocks('AMPLITUDE_API_KEY');
        showNotification('API Key cleared. Code snippets reset to default.');
        closeModal();
    });
    
    document.getElementById('api-key-cancel').addEventListener('click', closeModal);
    document.querySelector('.api-key-modal-close').addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    function closeModal() {
        document.body.removeChild(modal);
    }
}

function updateAllCodeBlocks(apiKey) {
    // Find all code blocks that contain AMPLITUDE_API_KEY placeholder
    const codeBlocks = document.querySelectorAll('code[class*="language-"]');
    const isPlaceholder = !apiKey || apiKey === 'AMPLITUDE_API_KEY';
    let tooltipAdded = false;
    
    // Handle tooltips on API key buttons based on whether a real API key is set
    document.querySelectorAll('.api-key-manual-button').forEach(button => {
        if (isPlaceholder) {
            // Re-add tooltip only to first button if it doesn't exist (API key was cleared)
            if (!button._tippyInstance && window.tippy && !tooltipAdded) {
                const tooltipInstance = window.tippy(button, {
                    content: 'Add your API key to personalize code samples',
                    placement: 'top',
                    theme: 'amplitude-api-key',
                    trigger: 'mouseenter focus',
                    hideOnClick: true,
                });
                button._tippyInstance = tooltipInstance;
                tooltipAdded = true;
                
                // Delay showing tooltip to allow DOM to fully render
                setTimeout(() => {
                    const rect = button.getBoundingClientRect();
                    // Only show if button is visible and properly positioned
                    if (tooltipInstance && !localStorage.getItem('amplitude_api_key') && rect.width > 0 && rect.top > 0) {
                        tooltipInstance.show();
                        
                        // Auto-hide after 5 seconds
                        setTimeout(() => {
                            if (tooltipInstance.state && tooltipInstance.state.isVisible) {
                                tooltipInstance.hide();
                            }
                        }, 5000);
                    }
                }, 1000);
            }
        } else {
            // Destroy tooltip if API key is set
            if (button._tippyInstance) {
                button._tippyInstance.destroy();
                delete button._tippyInstance;
            }
        }
    });
    
    codeBlocks.forEach(codeBlock => {
        // Check if this code block has .code-toolbar as an ancestor
        if (!codeBlock.closest('.code-toolbar')) {
            return;
        }
        
        // CRITICAL: Never use textContent.includes() as it strips Prism tokens in Chrome
        // Check data-original-content first, then innerHTML (which preserves tokens)
        const dataOriginal = codeBlock.getAttribute('data-original-content');
        const hasPlaceholder = dataOriginal 
            ? dataOriginal.includes('AMPLITUDE_API_KEY')
            : codeBlock.innerHTML.includes('AMPLITUDE_API_KEY');
        
        // ONLY process blocks that actually contain the API key placeholder
        if (!hasPlaceholder) {
            return; // Skip this block entirely
        }
        
        // For originalText, use data-original-content if it exists
        // Otherwise extract text from innerHTML (preserves Prism tokens until we need to replace)
        const originalText = dataOriginal || codeBlock.textContent;
        
        // Store original content if not already stored
        if (!codeBlock.getAttribute('data-original-content')) {
            // Store the PLAIN TEXT version (strip HTML tags) for future comparisons
            const plainText = codeBlock.textContent;
            codeBlock.setAttribute('data-original-content', plainText);
        }
        
        // Replace API key in the content
        if (originalText.includes('AMPLITUDE_API_KEY')) {
            const updatedText = originalText.replace(/AMPLITUDE_API_KEY/g, apiKey);
            codeBlock.textContent = updatedText;
            
            // Re-highlight the code block
            Prism.highlightElement(codeBlock);
        }
    });
    
    // Also re-scan for new manual buttons after content update
    addManualApiKeyButtons();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'api-key-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}
