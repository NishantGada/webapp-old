const express = require('express');
const router = express.Router();

router.get('/healthz', async (req, res) => {
    // adding response header to prevent caching
    res.set('Cache-Control', 'no-cache');
    // checking whether request contains any body, if so, returns 400 bad request error
    if (req.headers['content-length'] !== undefined) {
        return res.status(400).json()
    } else {
        // success case
        return res.status(200).json({
            "message": "Connection successful"
        });
    }
})

// returns 405 method not allowed in case any method apart from 'GET' is used
router.all('/healthz', (req, res) => {
    return res.status(405).json({
        "message": `Method ${req.method} not allowed`
    });
});

module.exports = router;