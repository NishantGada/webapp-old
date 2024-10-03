import bcrypt from 'bcrypt';
const saltRounds = 15;

export const encryptPassword = async (password) => {
    const hash  = await bcrypt.hash(password, saltRounds);
    return hash;
}

export const checkPassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
}