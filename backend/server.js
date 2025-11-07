import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/dbConfig.js';

import authRoutes from './routes/auth.routes.js';
import societyRoutes from './routes/society.routes.js';
import documentRoutes from './routes/document.routes.js';

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/society', societyRoutes);
app.use('/api/document', documentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});