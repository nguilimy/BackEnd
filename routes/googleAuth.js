const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Login with Google OAuth
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login via Google
 *     tags: [Auth]
 *     description: Redirects to Google for authentication.
 *     responses:
 *       302:
 *         description: Redirect to Google Login page
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback after Google login
 *     tags: [Auth]
 *     description: Google redirects here after successful login.
 *     responses:
 *       302:
 *         description: Redirect to /auth/profile
 */
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: View the logged-in user's information
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Google user data
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  res.send({
    message: "Successfully logged in with Google",
    user: req.user
  });
});

module.exports = router;
