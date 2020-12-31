const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

async function query(filterBy = {}) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }

    try {
        const collection = await dbService.getCollection('reviews')
        return await collection.find(criteria).toArray()
    } catch (err) {
        console.log('Error, cannot find reviews', err)
        throw err
    }
}

async function add(review) {
    review.createdAt = Date.now();
    try {
        const collection = await dbService.getCollection('reviews')
        await collection.insert(review)
        return review
    } catch (err) {
        console.log('Error, cannot create review', err)
        throw err
    }
}

async function update(review) {
    const collection = await dbService.getCollection('reviews')
    try {
        await collection.updateOne({ "_id": ObjectId(review._id) }, { $set: { ...review, _id: ObjectId(review._id) } })
        return review
    } catch (err) {
        console.log('Error, cannot update review', err)
        throw err
    }

}


async function remove(id) {
    const collection = await dbService.getCollection('reviews')
    try {
        await collection.deleteOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log('Error, cannot update review', err)
        throw err
    }
}

async function getById(id) {
    try {
        const collection = await dbService.getCollection('reviews')
        const reviewsFound = await collection.findMany({ "templateId": ObjectId(id) })
        return reviewsFound
    } catch (err) {
        console.log('Error, get reviews', err)
        throw err
    }

}

