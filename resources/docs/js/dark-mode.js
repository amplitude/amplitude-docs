/**
 * Dark Mode Toggle for Amplitude Documentation
 * 
 * Handles dark mode state with priority:
 * 1. User's saved preference (localStorage)
 * 2. System preference (prefers-color-scheme)
 * 3. Default (light mode)
 */

(function() {
  const STORAGE_KEY = 'amplitude-docs-theme';
  const DARK_CLASS = 'dark';
  
  /**
   * Gets the current theme preference
   * @returns {'dark'|'light'} The current theme
   */
  function getThemePreference() {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  }
  
  /**
   * Applies the theme to the document
   * @param {'dark'|'light'} theme - The theme to apply
   */
  function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add(DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
    }
  }
  
  /**
   * Saves theme preference to localStorage
   * @param {'dark'|'light'} theme - The theme to save
   */
  function saveThemePreference(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Failed to save theme preference:', e);
    }
  }
  
  /**
   * Toggles between dark and light mode
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    saveThemePreference(newTheme);
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('theme-changed', { 
      detail: { theme: newTheme } 
    }));
    
    return newTheme;
  }
  
  /**
   * Gets the current theme state
   * @returns {'dark'|'light'} The current theme
   */
  function getCurrentTheme() {
    return document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
  }
  
  // Initialize theme on page load
  const initialTheme = getThemePreference();
  applyTheme(initialTheme);
  
  // Listen for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  // Expose API for toggle button and other components
  window.darkMode = {
    toggle: toggleTheme,
    getCurrentTheme: getCurrentTheme,
    setTheme: function(theme) {
      applyTheme(theme);
      saveThemePreference(theme);
    }
  };
})();

