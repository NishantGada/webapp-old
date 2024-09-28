import User from '../models/user-model.js';
import { encryptPassword } from '../utils/hash.js';

export const getAllUsers = async (req, res) => {
    console.log("Inside getAllUsers API");
    try {
        const users = await User.findAll();  // Default scope excludes 'password'
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Server error' });
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