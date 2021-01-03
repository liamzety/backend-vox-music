const pool = require("../../db");

const TABLE_NAME = "template"
// GET LIST
async function getTemplates(req, res) {
    try {
        const templates = await pool.query(`SELECT * FROM ${TABLE_NAME}`)
        res.send(templates.rows)
    } catch (err) {
        console.error(err.message)
    }
}
// GET SINGLE
async function getTemplate(req, res) {
    try {
        const { id } = req.params
        const template = await pool.query(`
        SELECT * FROM ${TABLE_NAME}
         WHERE _id = $1
         `, [id])
        res.send(template.rows[0])
    } catch (err) {
        console.error(err.message)
    }
}
// CREATE
async function addTemplate(req, res) {
    try {
        const { name } = req.body
        const newTemplate = await pool.query(`
            INSERT INTO ${TABLE_NAME} 
            (name) VALUES($1) RETURNING *
            `, [name])

        res.send(newTemplate.rows[0])
    } catch (err) {
        console.error(err.message)
    }
}
// UPDATE
async function updateTemplate(req, res) {
    try {
        const { id } = req.params
        const { name } = req.body
        const updatedTemplate = await pool.query(`
            UPDATE ${TABLE_NAME} SET name = $1
            WHERE _id = $2 RETURNING *
            `, [name, id])
        res.send(updatedTemplate.rows[0])

    } catch (err) {
        console.error(err.message)
    }
}

// DELETE
async function removeTemplate(req, res) {
    try {
        const { id } = req.params
        await pool.query(`
            DELETE FROM ${TABLE_NAME} WHERE _id=$1;
            `, [id])
        res.send()

    } catch (err) {
        console.error(err.message)
    }
}


module.exports = {
    getTemplates,
    getTemplate,
    addTemplate,
    updateTemplate,
    removeTemplate
}
