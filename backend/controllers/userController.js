import userModel from "../models/userModel.js"; // Добавлено расширение .js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User doesn't exist" 
            });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }
        
        // Generate token
        const token = createToken(user._id);
        
        // Send success response
        res.status(200).json({ 
            success: true, 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error occurred during login" 
        });
    }
};

// Function to create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user function
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        // Check password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save user to database
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({ success: true, token }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { registerUser, loginUser };