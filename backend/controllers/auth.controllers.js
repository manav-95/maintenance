import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js'

export const registerUser = async (req, res) => {
    try {
        const { name, phone, email, password, role } = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ $or: [{ phone }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, phone, email, password, role });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matched = await user.comparePassword(password);
        if (!matched) return res.status(401).json({ message: 'Invalid credentials' });

        // Create tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // console.log('Generated Refresh Token:', refreshToken);

        user.refreshToken = refreshToken;
        await user.save();


        // Send refresh token as HTTP-only cookie
        res.cookie("refreshToken", refreshToken,
            {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        )

        res.json({ accessToken, user: { id: user._id, name: user.name, phone: user.phone, email: user.email, role: user.role, societyId: user.society, flat: user.flat } });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const refreshAccessToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });

    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(400).json({ message: 'No refresh token' });
        const user = await User.findOne({ refreshToken: token });
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'User Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}