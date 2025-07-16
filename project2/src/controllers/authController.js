const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashpassword, role });
        await newUser.save();

        res.status(201).json({ message: `User registered with username: ${username}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET, // Make sure it's named JWT_SECRET in your .env file
            { expiresIn: "1h" }
        );

        res.status(200).json({ token, message: "Login successful" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    register,
    login,
};
