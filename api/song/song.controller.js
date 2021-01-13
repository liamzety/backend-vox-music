const pool = require("../../db");

const SONG_TABLE = "song"

// CREATE
async function addSong(req, res) {
    try {
        const { title, url, video_id, playlist_id } = req.body
        const newSong = await pool.query(`
            INSERT INTO ${SONG_TABLE} 
            (title,url,video_id,playlist_id) VALUES ($1,$2,$3,$4) RETURNING *`, [title, url, video_id, playlist_id])
        res.send(newSong.rows[0])
    } catch (err) {
        console.error(err.message)
    }
}

// DELETE
async function removeSong(req, res) {
    try {
        const { id } = req.params
        await pool.query(`
            DELETE FROM ${SONG_TABLE} WHERE _id=$1;
            `, [id])
        res.send()

    } catch (err) {
        console.error(err.message)
    }
}


module.exports = {
    addSong,
    removeSong
}
