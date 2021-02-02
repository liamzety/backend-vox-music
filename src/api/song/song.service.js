import { pool } from "../../db.js";

export const songService = {
    add,
    query,
    update,
    remove
}

const SONG_TABLE = "song"

async function query(email) {
    let users;
    try {
        if (email) {
            users = await pool.query(`SELECT * FROM ${USER_TABLE} WHERE email = $1`, [email])
            return (users.rows[0])
        } else {
            users = await pool.query(`SELECT * FROM ${USER_TABLE}`)
            return (users.rows)
        }
    } catch (err) {
        console.error('err from user.service:', err.message)
    }
}

async function add({ title, url, video_id, playlist_id }) {
    try {
        const newSong = await pool.query(`
            INSERT INTO ${SONG_TABLE} 
            (title,url,video_id,playlist_id) VALUES ($1,$2,$3,$4) RETURNING *`, [title, url, video_id, playlist_id])
        return newSong.rows[0]
    } catch (err) {
        throw err
    }
}

async function update(id, user) {
    try {
        const updatedUser = await pool.query(`
            UPDATE ${USER_TABLE} SET name = $1 , profile_img = $2
            WHERE _id = $3 RETURNING *
            `, [user.name, user.profile_img, id])
        return (updatedUser.rows[0])

    } catch (err) {
        console.error(err.message)
    }
}
async function remove({ id }) {
    try {
        await pool.query(`
        DELETE FROM ${SONG_TABLE} WHERE _id=$1;
        `, [id])
        return
    } catch (err) {
        throw err
    }
}


