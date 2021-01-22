const pool = require("../../db");

module.exports = {
    add,
    query,
    update,
    remove
}
const USER_TABLE = "users"

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

async function add(user) {
    const { name, imgUrl, email, password } = user
    try {
        if (await query(email)) throw { msg: 'email taken.' }
        const newUser = await pool.query(`
        INSERT INTO ${USER_TABLE} 
        (name,imgUrl,email,password) VALUES ($1,$2,$3,$4) RETURNING *`, [name, imgUrl, email, password])
        return newUser.rows[0]
    } catch (err) {
        throw err
    }
}

async function update(id, user) {
    try {
        const updatedUser = await pool.query(`
            UPDATE ${USER_TABLE} SET name = $1 , imgUrl = $2
            WHERE _id = $3 RETURNING *
            `, [user.name, user.imgUrl, id])
        return (updatedUser.rows[0])

    } catch (err) {
        console.error(err.message)
    }
}
async function remove(id) {
    try {
        await pool.query(`
        DELETE FROM ${USER_TABLE} WHERE _id=$1;
        `, [id])
        return
    } catch (err) {
        throw err
    }
}


