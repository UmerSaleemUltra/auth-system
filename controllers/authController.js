import transporter from '../config/emailConfig.js';
import accountActivationEmail from '../templates/accountActivationEmail.js';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;
        const photo = req.file?.path;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Create new user
        const user = new User({ name, email, password, number, photo });
        await user.save();

        // Send account activation email
        const activationLink = `http://192.168.0.101:3000/account`; // Replace with actual URL
        const emailContent = accountActivationEmail(name, activationLink);

        await transporter.sendMail({
            from: '"Your App Name" <hello@umersaleem.com>',
            to: email,
            subject: 'Welcome to Our Platform - Your Account is Active!',
            html: emailContent,
        });

        res.status(201).json({ message: 'User registered and activation email sent', user });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Registration error', error });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token (optional)
        const token = jwt.sign({ id: user._id, email: user.email }, 'SMHAU', { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Login error', error });
    }
};