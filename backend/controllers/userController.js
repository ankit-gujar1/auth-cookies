import bcrypt from "bcryptjs"
import validator from "validator"
import User from "../models/userModel.js";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body;
        if (!username || !password || !confirmPassword) return res.status(400).json({ msg: "Enter all fields" });

        const uName = username.toLowerCase();

        const usernameCheck = await User.findOne({ username: uName });
        if (usernameCheck) return res.status(400).json({ msg: "Username already exist" });

        if (!validator.isStrongPassword(password)) return res.status(400).json({ msg: "Passwords must have at least 8 characters and contain uppercase letters, lowercase letters, numbers and symbols" });

        if (password !== confirmPassword) return res.status(400).json({ msg: "Password and Confirm Password must be same" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: uName,
            password: hashPassword
        });

        if (newUser) {
            generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ msg: "Enter all fields" });

        const uName = username.toLowerCase();

        const user = await User.findOne({ username: uName });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

        generateTokenAndSetCookies(user._id, res);

        res.status(201).json({
            _id: user._id,
            username: user.username
        })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ msg: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}