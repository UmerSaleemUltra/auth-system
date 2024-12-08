import express from 'express';
import multer from 'multer';
import { registerUser, loginUser, verifyLoginOtp } from '../controllers/authController.js';

const router = express.Router();

// Multer setup for file uploads (already configured)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyLoginOtp);  // Add the OTP verification route

export default router;
