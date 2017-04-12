const express = require('express'),
  router = express.Router(),
  path = require('path'),
  request = require("request");


/** Login Route
 * Create session in redis
 * @return token
 */
router.post('/user/login', (req, res) => {

  const options = {
    url: 'API Server URL',
    body: req.body,
  };

  request.post(options, (error, response, body) => {
    if (!error && response.statusCode >= 200 && response.statusCode <= 304) {

      // this will be attached to the JWT
      var claims = {
        user: body.user,
      };
      // create session & return the token
      req.jwtSession.create(claims, (error, token) => {
        res.json({
          access_granted: true,
          token: token
        });
      });
    }

    // Error Occured
    else {
      res.status(500).json({
        access_granted: false
      });
    }
  });
});

/** Logout Route
 * Log Out User & Destroy Redis Session
 */
router.post('/user/logout', (req, res) => {
  req.jwtSession.destroy(error => {
    res.json({
      logout: true
    });
  });
});

// Always return the main index.html, so react-router render the route in the client
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'));
});

module.exports = router;