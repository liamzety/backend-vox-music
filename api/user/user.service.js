
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('users')
        return await collection.find().toArray()
    } catch (err) {
        console.log('Error, cannot find users', err)
        throw err
    }
}
async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log('Error, cannot create user', err)
        throw err
    }
}

async function add(user) {
    user.createdAt = Date.now();
    try {
        const collection = await dbService.getCollection('users')
        await collection.insertOne(user)
        return user
    } catch (err) {
        console.log('Error, cannot create user', err)
        throw err
    }

}


module.exports = {
    add,
    query,
    getByUsername
}
