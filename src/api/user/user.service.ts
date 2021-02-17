import { pool } from '../../db.js';
export const userService = {
  add,
  query,
  update,
  remove,
};
const USER_TABLE = 'users';

async function query(filterBy: { email?: string; id?: string }) {
  const { email, id } = filterBy;
  let users;
  try {
    if (email) {
      users = await pool.query(`SELECT * FROM ${USER_TABLE} WHERE email = $1`, [
        email,
      ]);
      return users.rows[0];
    } else if (id) {
      users = await pool.query(`SELECT * FROM ${USER_TABLE} WHERE _id = $1`, [
        id,
      ]);
      return users.rows[0];
    } else {
      users = await pool.query(`SELECT * FROM ${USER_TABLE}`);
      return users.rows;
    }
  } catch (err) {
    console.error('err, user.service -> query():', err.message);
    throw { message: 'Could not add user/s.' };
  }
}

async function add(user: User) {
  const { name, profile_img, email, password } = user;
  try {
    if (await query({ email }))
      throw { message: 'This email is already registered.' };
    const newUser = await pool.query(
      `
        INSERT INTO ${USER_TABLE} 
        (name,profile_img,email,password) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, profile_img, email, password]
    );
    return newUser.rows[0];
  } catch (err) {
    console.error('err, user.service -> add():', err.message);
    throw err;
  }
}

async function update(id: string, user: User) {
  try {
    const updatedUser = await pool.query(
      `
            UPDATE ${USER_TABLE} SET name = $1 , profile_img = $2
            WHERE _id = $3 RETURNING *
            `,
      [user.name, user.profile_img, id]
    );
    return updatedUser.rows[0];
  } catch (err) {
    console.error('err, user.service -> update():', err.message);
    throw { message: 'Could not update user.' };
  }
}
async function remove(id: string) {
  try {
    await pool.query(
      `
      DELETE FROM ${USER_TABLE} WHERE _id=$1;
      `,
      [id]
    );
    return;
  } catch (err) {
    console.error('err, user.service -> remove():', err.message);
    throw { message: 'Could not remove user.' };
  }
}
