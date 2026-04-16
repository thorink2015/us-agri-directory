/**
 * Netlify Build Plugin — auto-ping IndexNow after every production deploy.
 *
 * Fires on the onSuccess event (after the deploy is fully live on the CDN),
 * which ensures the key file is already accessible when IndexNow's servers
 * try to verify ownership.
 *
 * Only runs in the production context — skips branch deploys and previews.
 */

const { execSync } = require('child_process');

module.exports = {
  onSuccess: async ({ utils, constants }) => {
    // Only ping on production deploys
    if (process.env.CONTEXT !== 'production') {
      console.log('[indexnow-plugin] Skipping — not a production deploy');
      return;
    }

    console.log('[indexnow-plugin] Production deploy detected — pinging IndexNow...');

    try {
      execSync('node scripts/ping-indexnow.mjs', {
        stdio: 'inherit',
        cwd: constants.PUBLISH_DIR ? process.cwd() : process.cwd(),
      });
      console.log('[indexnow-plugin] Done.');
    } catch (err) {
      // Warn but don't fail the deploy if IndexNow ping fails
      console.warn('[indexnow-plugin] IndexNow ping failed (deploy still succeeded):', err.message);
    }
  },
};
