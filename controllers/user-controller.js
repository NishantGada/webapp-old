import User from '../models/user-model.js';
import { validateBasicAuth } from '../utils/basicAuth.js';
import { checkPassword, encryptPassword } from '../utils/hash.js';

export const checkValidUser = async (req, res) => {
    const [basicUsername, basicPassword, authSuccessful] = validateBasicAuth(req, res);

    // "authSuccessful" checks whether Basic Authentication was successful or not
    // False when username and / (or) password is missing
    if (!authSuccessful) {
        return [{}, false, authSuccessful];
    }

    let user = await User.findOne({
        where: {
            email: basicUsername,
        },
    });

    // If user not found, return invalid response
    if (!user) {
        console.log("User not found…");
        return [{}, false, true];
    }

    const validPassword = await checkPassword(basicPassword, user.password);

    if (user.email === basicUsername && validPassword) {
        user = user.toJSON();
        const { password, ...userWithoutPassword } = user;
        return [userWithoutPassword, true, true];
    } else {
        return [{}, false, true];
    }
}

export const getUserDetails = async (req, res) => {
    try {
        // condition to check if any response body is present or not
        if (req.headers['content-length'] !== undefined) {
            return res.status(400).json()
        }

        const [user, valid, validAuth] = await checkValidUser(req, res);
        if (!validAuth) {
            console.log("Auth failed… Check Auth params");
            return res.status(401).json();
        }

        res.set('Cache-Control', 'no-cache');

        // "valid" checks whether username and password match with the desired details
        if (valid) {
            return res.status(200).json(user);
        } else {
            console.log("Error: Try checking authentication parameters");
            return res.status(400).json();
        }
    } catch (error) {
        console.error('Error fetching user: ', error);
        return res.status(400).json();
    }
};


export const createNewUser = async (req, res) => {
    console.log("Inside createNewUser API");
    const { firstName, lastName, email, password } = req.body;
    res.set('Cache-Control', 'no-cache');

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
        res.set('Cache-Control', 'no-cache');
        if (req.body.accountCreated || req.body.accountUpdated) {
            console.log("invalid req param");
            return res.status(400).json()
        }

        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            console.log("missing req param");
            return res.status(400).json();
        }

        console.log("req: ", req.body);

        const [user, valid, validAuth] = await checkValidUser(req, res);
        if (!validAuth) {
            console.log("Auth failed… Check Auth params");
            return res.status(401).json();
        }

        console.log("valid user? ", valid);

        if (valid) {
            console.log("user: ", user);
            const newPassword = await encryptPassword(req.body.password);

            req.body.password = newPassword;
            const { email, ...userWithoutEmail } = req.body;

            const [affectedRows] = await User.update(
                userWithoutEmail,
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