const express = require('express');
const router = express.Router();
const {
    getDeals,
    getDealById,
    claimDeal,
    getMyClaims,
} = require('../controllers/dealController');
const { protect } = require('../middleware/auth');

router.get('/', getDeals);
router.get('/my-claims', protect, getMyClaims);
router.get('/:id', getDealById);
router.post('/:id/claim', protect, claimDeal);

module.exports = router;
