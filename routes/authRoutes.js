import express from 'express';
import multer from 'multer';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('photo'), registerUser);
router.post('/login', loginUser);

export default router;
