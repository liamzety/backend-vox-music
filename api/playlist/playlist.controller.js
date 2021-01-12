const pool = require("../../db");

const TABLE_NAME = "template"
// GET LIST
async function getPlaylists(req, res) {
    try {
        const playlists = await pool.query(`SELECT * FROM ${TABLE_NAME}`)
        res.send(playlists.rows)
    } catch (err) {
        console.error(err.message)
    }
}
// GET SINGLE
async function getPlaylist(req, res) {
    try {
        const { id } = req.params
        const playlist = await pool.query(`
        SELECT * FROM ${TABLE_NAME}
         WHERE _id = $1
         `, [id])
        res.send(playlist.rows[0])
    } catch (err) {
        console.error(err.message)
    }
}
// CREATE
async function addPlaylist(req, res) {
    try {
        const { title, description, url } = req.body
        const newPlaylist = await pool.query(`
            INSERT INTO ${TABLE_NAME} 
            (title,description,url) VALUES ($1,$2,$3) RETURNING *`, [title, description, url])

        res.send(newPlaylist.rows[0])
    } catch (err) {
        console.error(err.message)
    }
}
// UPDATE
async function updatePlaylist(req, res) {
    try {
        const { id } = req.params
        const { name } = req.body
        const updatedPlaylist = await pool.query(`
            UPDATE ${TABLE_NAME} SET name = $1
            WHERE _id = $2 RETURNING *
            `, [name, id])
        res.send(updatedPlaylist.rows[0])

    } catch (err) {
        console.error(err.message)
    }
}

// DELETE
async function removePlaylist(req, res) {
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
    getPlaylists,
    getPlaylist,
    addPlaylist,
    updatePlaylist,
    removePlaylist
}
