import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookies('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({ _id: user._id, name: user.name, email: user.email });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie('jwt', '',{httpOnly: true, expires: new Date(0)});
    res.status(200).json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({ _id: user._id, name: user.name, email: user.email });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export { registerUser, loginUser, logoutUser, getMe };