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

export const getAllUsers = async (req, res) => {
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
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
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
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/*
export const updateUserDetails = async (req, res) => {
    console.log("Inside updateUserDetails");
    try {
        const requestUsername = req.body.email // username == email
        console.log("requestUsername: ", requestUsername);

        console.log("Update req body: ", req.body);

        await User.update(
            req.body,
            {
                where: {
                    email: req.body.email,
                },
            },
        );

        return res.status(200).json();
    } catch (err) {
        console.log("err: ", err);
    }
}
*/


/*
export const updateUserDetails = async (req, res) => {
    console.log("Inside updateUserDetails");
    try {
        const [username, password] = validateBasicAuth(req, res);
        const requestUsername = req.body.email; // username == email
        console.log("requestUsername: ", requestUsername);

        if (req.body.accountCreated || req.body.accountUpdated) {
            return res.status(400).json()
        }

        req.body.password = await encryptPassword(req.body.password);

        // Perform the update
        const [affectedRows] = await User.update(
            req.body,
            {
                where: {
                    email: req.body.email,
                },
            },
        );

        console.log("affectedRows: ", affectedRows);

        // Check if the update was successful (affectedRows > 0)
        if (affectedRows === 0) {
            return res.status(404).json({ message: "User not found or no updates applied" });
        }

        // Fetch the updated user data (without password)
        const updatedUser = await User.findOne({
            where: { email: req.body.email },
            attributes: { exclude: ['password'] } // Exclude the password field from the response
        });

        // Return the updated user data
        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error updating user details:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
*/


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

            console.log("before update: ", req.body);
            const [affectedRows] = await User.update(
                req.body,
                {
                    where: {
                        email: user.email,
                    },
                },
            );

            // Check if the update was successful (affectedRows > 0)
            if (affectedRows === 0) {
                // return res.status(404).json({ message: "User not found or no updates applied" });
                console.log("No rows affected");
            }

            // Fetch the updated user data (without password)
            let updatedUser = await User.findOne({
                where: {
                    email: user.email
                },
            });

            updatedUser = updatedUser.toJSON();
            console.log("updatedUser: ", updatedUser);
            const { password, ...userWithoutPassword } = user;
            console.log("userWithoutPassword: ", userWithoutPassword);

            return res.status(204).json();
        } else {
            return res.status(400).json({ message: "Error: Try checking authentication parameters" });
        }
    } catch (error) {
        console.log("err: ", error);
        return res.status(400).json({ message: "Something went wrong…" })
    }
}


// Explicitly handling the "HEAD" method as Express allows it by-default
export const handleHeadMethod = (req, res) => {
    return res.status(405).json();
}