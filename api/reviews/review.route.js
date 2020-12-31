const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getReviews,
    getReview,
    addReview,
    updateReview,
    removeReview } = require('./review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getReviews)
router.get('/:id', getReview)
router.put('/:id', requireAuth, requireAdmin, updateReview)
router.post('/', requireAuth, addReview)
router.delete('/:id', requireAuth, requireAdmin, removeReview)

module.exports = router


