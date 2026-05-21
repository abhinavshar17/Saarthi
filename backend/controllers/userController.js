import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import createTransporter from "../config/email.js";
import nodemailer from 'nodemailer';


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        if (!user.isVerified) {
            return res.json({ success: false, message: "Please verify your email to continue" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {

            const token = createToken(user._id)
            res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Step 1: Register (init) - create or update an unverified user and send OTP
const registerUserInit = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // checking user already exists or not
        const exists = await userModel.findOne({ email });
        if (exists && exists.isVerified) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpSalt = await bcrypt.genSalt(10)
        const otpHash = await bcrypt.hash(otp, otpSalt)
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

        let user;
        if (exists) {
            // update unverified user
            exists.name = name;
            exists.password = hashedPassword;
            exists.isVerified = false;
            exists.otpHash = otpHash;
            exists.otpExpiresAt = otpExpiresAt;
            user = await exists.save();
        } else {
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
                isVerified: false,
                otpHash,
                otpExpiresAt
            })
            user = await newUser.save()
        }

        // send OTP email
        const mailOptions = {
            from: process.env.SMTP_FROM || 'no-reply@example.com',
            to: email,
            subject: 'Your verification code',
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`
        };
        const transporter = await createTransporter();
        const info = await transporter.sendMail(mailOptions);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (!process.env.SMTP_HOST && previewUrl) {
            console.log('Preview OTP email URL:', previewUrl);
        }

        res.json({ success: true, message: 'OTP sent to email' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Step 2: Verify OTP - mark user verified and return token
const verifyUserOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.json({ success: false, message: 'Email and OTP are required' })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }
        if (user.isVerified) {
            return res.json({ success: true, message: 'Already verified', token: createToken(user._id) })
        }
        if (!user.otpHash || !user.otpExpiresAt) {
            return res.json({ success: false, message: 'No OTP found. Please sign up again.' })
        }
        if (user.otpExpiresAt.getTime() < Date.now()) {
            return res.json({ success: false, message: 'OTP expired. Please resend.' })
        }
        const isMatch = await bcrypt.compare(otp, user.otpHash)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid OTP' })
        }

        user.isVerified = true;
        user.otpHash = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export { loginUser, registerUserInit, verifyUserOtp, adminLogin }
 
// Get current user profile
export const getMe = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId).select('name email phone alternateEmail');
        if (!user) return res.json({ success: false, message: "User not found" })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Update current user profile
export const updateMe = async (req, res) => {
    try {
        const { userId, phone, alternateEmail } = req.body;
        if (alternateEmail && !validator.isEmail(alternateEmail)) {
            return res.json({ success: false, message: 'Alternate email is not valid' })
        }
        const update = { };
        if (typeof phone !== 'undefined') update.phone = phone;
        if (typeof alternateEmail !== 'undefined') update.alternateEmail = alternateEmail;
        const user = await userModel.findByIdAndUpdate(userId, update, { new: true }).select('name email phone alternateEmail');
        if (!user) return res.json({ success: false, message: "User not found" })
        res.json({ success: true, user, message: 'Profile updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Init name change: send OTP to primary email for confirmation
export const initNameChange = async (req, res) => {
    try {
        const { userId, newName } = req.body;
        if (!newName || newName.trim().length < 2) {
            return res.json({ success: false, message: 'Please provide a valid name' })
        }
        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: 'User not found' })

        // generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpSalt = await bcrypt.genSalt(10)
        const otpHash = await bcrypt.hash(otp, otpSalt)
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

        user.otpHash = otpHash;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        const transporter = await createTransporter();
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || 'no-reply@example.com',
            to: user.email,
            subject: 'Confirm your name change',
            text: `Your OTP to change your name to "${newName}" is ${otp}. It expires in 10 minutes.`
        });
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (!process.env.SMTP_HOST && previewUrl) {
            console.log('Preview Name Change OTP URL:', previewUrl);
        }

        res.json({ success: true, message: 'OTP sent to your email' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Verify OTP and change the name
export const verifyNameChange = async (req, res) => {
    try {
        const { userId, newName, otp } = req.body;
        if (!newName || newName.trim().length < 2) {
            return res.json({ success: false, message: 'Please provide a valid name' })
        }
        if (!otp) return res.json({ success: false, message: 'OTP is required' })

        const user = await userModel.findById(userId);
        if (!user) return res.json({ success: false, message: 'User not found' })

        if (!user.otpHash || !user.otpExpiresAt) {
            return res.json({ success: false, message: 'No OTP found. Please request again.' })
        }
        if (user.otpExpiresAt.getTime() < Date.now()) {
            return res.json({ success: false, message: 'OTP expired. Please resend.' })
        }
        const isMatch = await bcrypt.compare(otp, user.otpHash)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid OTP' })
        }

        user.name = newName.trim();
        user.otpHash = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        const { name, email, phone, alternateEmail } = user.toObject();
        res.json({ success: true, user: { name, email, phone, alternateEmail }, message: 'Name updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}