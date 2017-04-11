const express = require('express');
const router = express.Router();
const path = require('path');

// Always return the main index.html, so react-router render the route in the client
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'));
});

module.exports = router;
