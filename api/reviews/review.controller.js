const reviewService = require("./review.service");

// GET LIST
async function getReviews(req, res) {
    const reviews = await reviewService.query()
    res.send(reviews)
}
// GET SINGLE
async function getReview(req, res) {
    const review = await reviewService.getById(req.params.id)
    res.send(review)
}
// DELETE
async function removeReview(req, res) {
    await reviewService.remove(req.params.id)
    res.end()
}
// CREATE
async function addReview(req, res) {
    const review = await reviewService.add(req.body)
    res.send(review)
}

// UPDATE
async function updateReview(req, res) {
    const review = await reviewService.update(req.params.id)
    res.send(review)
}


module.exports = {
    getReviews,
    getReview,
    addReview,
    updateReview,
    removeReview
}
