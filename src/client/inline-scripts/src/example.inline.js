/**
 * This is the place where any inline script that should be injected
 * into the application could be placed.
 *
 * Use cases:
 * 1. Analytics
 * 2. Pixel tracking
 * 3. CSS variables injection
 *
 * Separate each script with a new file and get them injected into the app.
 *
 * @see build:inlinescripts in package.json
 */

(function (w) {
  if (w.console && typeof w.console.warn === 'function') {
    console.warn('This is injected script');
  }
}(window || {}));
