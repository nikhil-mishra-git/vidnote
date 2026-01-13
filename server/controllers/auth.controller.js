import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Note from "../models/Notes.model.js";
import { generateToken } from "../utils/generateToken.js";

/* ================= REGISTER ================= */
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        generateToken(res, user._id);

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        generateToken(res, user._id);

        res.json({
            success: true,
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }

        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= PROFILE ================= */
export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                notes: user.generatedNotes,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

/* ================= UPDATE PROFILE ================= */

export const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });

    } catch (error) {
        console.error("Update Profile Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,  
            sameSite: "None",  
            expires: new Date(0)
        });

        res.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/* ================= DELETE ACCOUNT ================= */
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;

        await Note.deleteMany({ user: userId });

        await User.findByIdAndDelete(userId);

        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.json({
            success: true,
            message: "Account Deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
