import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import accountActivationEmail from '../templates/accountActivationEmail.js';
import User from '../models/User.js';
import otpGenerator from 'otp-generator';
import requestIp from 'request-ip';
import iplocation from 'iplocation';

const otpStore = new Map(); // Temporary OTP storage

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;
        const photo = req.file ? req.file.path : null;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword, number, photo });
        await user.save();

        // Send account activation email
        const activationLink = `http://yourdomain.com/account`; // Replace with actual URL
        const emailContent = accountActivationEmail(name, activationLink);

        await transporter.sendMail({
            from: '"Your QuickDocs" <hello@umersaleem.com>',
            to: email,
            subject: 'Welcome to Our QuickDocs - Your Account is Active!',
            html: emailContent,
        });

        res.status(201).json({ message: 'User registered and activation email sent', user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration error', error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }

        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });

        // Save OTP temporarily
        otpStore.set(user.email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

        // Get client IP address
        let clientIp = requestIp.getClientIp(req);

        // Handle local development IPs
        if (clientIp === '::1' || clientIp === '127.0.0.1') {
            clientIp = '192.168.0.103'; // Replace with your local testing IP address
        }

        // Email content
        const emailContent = `
            <div>
                <p>Hello ${user.name},</p>
                <p>Your account was accessed from IP address: <strong>${clientIp}</strong>.</p>
                <p>Your OTP for login is: <strong>${otp}</strong>.</p>
                <p>This OTP is valid for 5 minutes. If this was not you, secure your account immediately.</p>
            </div>
        `;

        // Send OTP via email
        await transporter.sendMail({
            from: '"Your QuickDocs" <hello@umersaleem.com>',
            to: user.email,
            subject: 'Your OTP Code - Login Verification',
            html: emailContent,
        });

        return res.status(200).json({
            message: 'OTP sent to your email. Please verify to complete login.',
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login error', error });
    }
};
export const verifyLoginOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        const storedOtpData = otpStore.get(email);

        if (!storedOtpData) {
            return res.status(400).json({ message: 'OTP not generated for this email' });
        }

        if (storedOtpData.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (Date.now() > storedOtpData.expiresAt) {
            otpStore.delete(email); // Remove expired OTP
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        const user = await User.findOne({ email });

        // Generate JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            'SMHAU171175', // Use a secret key from environment variable
            { expiresIn: '1h' }
        );

        otpStore.delete(email);

        // Send success email
        const emailContent = `
            <div>
                <p>Hello ${user.name},</p>
                <p>Welcome back! You have successfully logged in to your account.</p>
                <p>Access your dashboard here: <a href="http://yourdomain.com/dashboard">Go to Dashboard</a></p>
                <p>If you encounter any issues, feel free to contact support.</p>
                <p>Best regards,</p>
                <p>Your QuickDocs Team</p>
            </div>
        `;

        await transporter.sendMail({
            from: '"Your QuickDocs" <hello@umersaleem.com>',
            to: user.email,
            subject: 'Login Successful - Access Your Dashboard',
            html: emailContent,
        });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(500).json({ message: 'OTP verification error', error });
    }
};
