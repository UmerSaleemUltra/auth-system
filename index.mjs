import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';


const app = express();
const PORT =  3000;


// Connect to the database
db.connection.once('open', () => {
    console.log('Database connected successfully!');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
