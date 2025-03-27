import ClipboardJS from 'clipboard'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css';

const COMPONENT_SELECTOR = 'code.torchlight'

export default function () {
  const codeBlocks = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < codeBlocks.length; i++) {
    const code = codeBlocks[i]
    // Ensure the code element has a unique ID
    if (!code.id) {
      code.id = `torchlight-code-${i}`
    }

    // Create the copy button
    const button = document.createElement('span')
    button.className = 'copy-btn'
    //button.setAttribute('type', 'button')
    // Although we're not relying on data-clipboard-target, we can still keep it for clarity:
    button.setAttribute('data-clipboard-target', `#${code.id}`)
    button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B7B7B7"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
  `;

    // Determine the container for positioning:
    const container = code.parentNode.parentNode 

    // Append the button to the container
    container.appendChild(button)

    // Setup tooltip using tippy.js for feedback
    const tooltip = tippy(button, {
      content: 'Copied!',
      theme: 'translucent',
      placement: 'top',
      trigger: 'manual',
      distance: 5,
    })

    // Initialize ClipboardJS with a text callback to ensure we copy the code sample's text
    const clipboard = new ClipboardJS(button, {
      text: () => {
        return code.querySelector('.torchlight-copy-target').textContent
      }
    })

    clipboard.on('success', (e) => {
      tooltip.show()
      setTimeout(() => {
        tooltip.hide()
      }, 700)
      e.clearSelection()
    })
  }
}


