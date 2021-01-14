const pool = require("../../db");

const PLAYLIST_TABLE = "playlist"
const SONG_TABLE = "song"
// GET LIST
async function getPlaylists(req, res) {
    try {
        const playlists = await pool.query(`SELECT * FROM ${PLAYLIST_TABLE}`)
        res.send(playlists.rows)
    } catch (err) {
        console.error(err.message)
    }
}
// GET SINGLE
async function getPlaylist(req, res) {
    try {
        const { id } = req.params
        let playlist = await pool.query(`
        SELECT * FROM ${PLAYLIST_TABLE}
         WHERE _id = $1
         `, [id])
        let playlistSongs = await pool.query(`
        SELECT * FROM ${SONG_TABLE}
         WHERE playlist_id = $1
         `, [id])
        playlist = playlist.rows[0]
        playlistSongs = playlistSongs.rows
        res.status(200).send({ playlist, playlistSongs })
    } catch (err) {
        console.error(err.message)
    }
}
// CREATE
async function addPlaylist(req, res) {
    try {
        const { name, description, img, genre } = req.body
        const newPlaylist = await pool.query(`
            INSERT INTO ${PLAYLIST_TABLE} 
            (name,description,img,genre) VALUES ($1,$2,$3,$4) RETURNING *`, [name, description, img, genre])

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
            UPDATE ${PLAYLIST_TABLE} SET name = $1
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
            DELETE FROM ${PLAYLIST_TABLE} WHERE _id=$1;
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
