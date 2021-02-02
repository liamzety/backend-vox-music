import bcrypt from 'bcrypt';
import { userService } from '../user/user.service';

export const authService = {
  signup,
  login,
};
const saltRounds = 10;
async function login(user: User) {
  try {
    if (!user.email || !user.password) {
      throw { message: 'Email and Password are required!' };
    }
    const userFound = await userService.query({ email: user.email });
    if (!userFound) throw { message: 'Invalid Email' };
    const match = await bcrypt.compare(
      user.password.toString(),
      userFound.password
    );
    if (!match) throw { message: 'Invalid Password' };
    delete userFound.password;
    return userFound;
  } catch (err) {
    throw err;
  }
}

async function signup(user: User) {
  try {
    if (!user.password) throw { message: 'Password field is required.' };
    if (!user.email) throw { message: 'Email field is required.' };
    if (!user.name) throw { message: 'Name field is required.' };
    const hash = await bcrypt.hash(user.password.toString(), saltRounds);
    return await userService.add({ ...user, password: hash });
  } catch (err) {
    throw err;
  }
}
