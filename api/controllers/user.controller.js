import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const updateProfileAndResume = async (req, res, next) => {
    upload.single("resume")(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return next(errorHandler(400, `File upload error: ${err.message}`));
        } else if (err) {
            console.error("Unexpected error during file upload:", err);
            return next(
                errorHandler(500, `Server error during upload: ${err.message}`)
            );
        }

        if (!req.file) {
            console.error("No file uploaded");
            return next(errorHandler(400, "No file uploaded"));
        }

        try {
            const userId = req.user?.id;
            if (!userId) {
                console.error("User ID not found in request");
                return next(errorHandler(400, "User ID not found in request"));
            }

            const { bio } = req.body;
            const updateData = { bio };

            if (req.file) {
                updateData.resume = req.file.buffer;
                updateData.resumeFilename = req.file.originalname;
                updateData.resumeContentType = req.file.mimetype;
            }

            // Check if the user exists before updating
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return next(errorHandler(404, "User not found"));
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).select("-password -resume -resumeFilename -resumeContentType");

            if (!updatedUser) {
                return next(errorHandler(404, "User not found"));
            }

            res.status(200).json({
                message: "Profile updated and resume uploaded successfully!",
                user: {
                    id: updatedUser._id,
                    bio: updatedUser.bio,
                    resumeFilename: updatedUser.resumeFilename, // If needed
                },
            });
        } catch (error) {
            console.error("Error in updateProfileAndResume: ", error);
            next(error);
        }
    });
};

// Signup Controller
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({
            message: "User created successfully!",
        });
    } catch (error) {
        next(error);
    }
};

// Signin Controller
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        const { password: hashedPassword, ...userData } = validUser.toObject();

        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie('access_token', token, {
            httpOnly: true,   // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === 'production', // Sends cookie over HTTPS only in production
            sameSite: 'Lax',  // Helps prevent CSRF attacks
            expires: expiryDate,
        })        
        .status(200)
        .json({
            message: "Signin successful!",
        });
    } catch (error) {
        next(error);
    }
};


// Signout Controller
export const signout = (req, res) => {
    res.clearCookie("access_token").status(200).json("Signout success!");
};
