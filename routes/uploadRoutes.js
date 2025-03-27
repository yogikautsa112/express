const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({ 
    url: req.file.path, 
    public_id: req.file.filename 
  });
});

module.exports = router;
