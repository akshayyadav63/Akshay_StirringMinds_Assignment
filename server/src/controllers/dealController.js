const Deal = require('../models/Deal');
const Claim = require('../models/Claim');

// @desc    Get all deals
// @route   GET /api/deals
// @access  Public
const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Public
const getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Claim a deal
// @route   POST /api/deals/:id/claim
// @access  Private
const claimDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        // Check if deal is restricted and user is not verified
        if (deal.accessLevel === 'restricted' && !req.user.isVerified) {
            return res.status(403).json({
                message: 'This deal is restricted. Please verify your account to access it.'
            });
        }

        // Check if already claimed
        const alreadyClaimed = await Claim.findOne({
            user: req.user._id,
            deal: deal._id,
        });

        if (alreadyClaimed) {
            return res.status(400).json({ message: 'Deal already claimed' });
        }

        const claim = await Claim.create({
            user: req.user._id,
            deal: deal._id,
            status: 'pending' // Default status
        });

        res.status(201).json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user claims
// @route   GET /api/claims/my-claims
// @access  Private
const getMyClaims = async (req, res) => {
    try {
        const claims = await Claim.find({ user: req.user._id }).populate('deal');
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getDeals,
    getDealById,
    claimDeal,
    getMyClaims,
};
