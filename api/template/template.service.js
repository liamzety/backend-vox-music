
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

async function query() {
    const criteria = {};
    try {
        const collection = await dbService.getCollection('template')

        return await collection.find(criteria).toArray()
    } catch (err) {
        console.log('Error, cannot find templates', err)
        throw err
    }
}

async function add(template) {
    template.createdAt = Date.now();
    try {
        const collection = await dbService.getCollection('template')
        await collection.insert(template)
        return template
    } catch (err) {
        console.log('Error, cannot create template', err)
        throw err
    }
}

async function update(template) {
    const collection = await dbService.getCollection('template')
    try {
        await collection.updateOne({ "_id": ObjectId(template._id) }, { $set: { ...template, _id: ObjectId(template._id) } })
        return template
    } catch (err) {
        console.log('Error, cannot update template', err)
        throw err
    }

}


async function remove(id) {
    const collection = await dbService.getCollection('template')
    try {
        await collection.deleteOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log('Error, cannot update template', err)
        throw err
    }
}

async function getById(id) {
    try {
        const collection = await dbService.getCollection('template')
        const templateFound = await collection.findOne({ "_id": ObjectId(id) })
        return templateFound
    } catch (err) {
        console.log('Error, cannot update template', err)
        throw err
    }

}

