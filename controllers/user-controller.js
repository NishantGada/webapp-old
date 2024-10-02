import User from '../models/user-model.js';
import { validateBasicAuth } from '../utils/basicAuth.js';
import { checkPassword, encryptPassword } from '../utils/hash.js';

const checkValidUser = async (req, res) => {
    const [basicUsername, basicPassword] = validateBasicAuth(req, res);
    let user = await User.findOne({
        where: {
            email: basicUsername,
        },
    });

    // If user not found, return invalid response
    if (!user) {
        console.log("User not found…");
        return [{}, false];
    }

    const validPassword = await checkPassword(basicPassword, user.password);

    if (user.email === basicUsername && validPassword) {
        user = user.toJSON();
        const { password, ...userWithoutPassword } = user;
        return [userWithoutPassword, true];
    } else {
        return [{}, false];
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const [user, valid] = await checkValidUser(req, res);

        if (valid) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ message: "Error: Try checking authentication parameters" });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(400).json({ message: "Error: Try checking authentication parameters" });
    }
};


export const createNewUser = async (req, res) => {
    console.log("Inside createNewUser API");
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json();
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json();
        }

        // Hash the password
        const hashedPassword = await encryptPassword(password);
        console.log("hashedPassword: ", hashedPassword);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Respond with the newly created user (without password)
        const { password: _, ...userWithoutPassword } = newUser.toJSON();
        return res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Error creating user: ", error);
        return res.status(400).json();
    }
};


export const updateUserDetails = async (req, res) => {
    try {
        if (req.body.accountCreated || req.body.accountUpdated || req.body.email) {
            return res.status(400).json()
        }
        console.log("req: ", req.body);

        const [user, valid] = await checkValidUser(req, res);
        console.log("valid user? ", valid);

        if (valid) {
            console.log("user: ", user);

            const newPassword = await encryptPassword(req.body.password);
            console.log("newPassword: ", newPassword);

            req.body.password = newPassword;

            // console.log("before update: ", req.body);
            const [affectedRows] = await User.update(
                req.body,
                {
                    where: {
                        email: user.email,
                    },
                },
            );

            // Fetch the updated user data (without password)
            let updatedUser = await User.findOne({
                where: {
                    email: user.email
                },
            });

            updatedUser = updatedUser.toJSON();
            // console.log("updatedUser: ", updatedUser);
            const { password, ...userWithoutPassword } = user;
            // console.log("userWithoutPassword: ", userWithoutPassword);

            return res.status(204).json();
        } else {
            return res.status(400).json();
        }
    } catch (error) {
        console.log("err: ", error);
        return res.status(400).json();
    }
}


// Explicitly handling the "HEAD" method as Express allows it by-default
export const handleHeadMethod = (req, res) => {
    return res.status(405).json();
}