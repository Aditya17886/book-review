const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details!" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, user: { email: user.email }, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

userRouter.post('/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!password || !email) {
            return res.json({ success: false, message: "Missing Details!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            email,
            password: hashedPassword,
        };

        const newUser = new UserModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, user: { email: user.email }, token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = userRouter;
