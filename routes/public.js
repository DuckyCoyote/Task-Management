const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(
      __dirname,
      '..',
      'assets',
      filename
    );
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;