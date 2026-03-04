import express from 'express';
import { connectDb } from './Db/ConnectDb.js';
import dotenv from 'dotenv';
import userRouter from './routes/UserRoute.js';
import cors from 'cors';
import { cloudinaryConfig } from './config/cloudinary.js';
import DoctorRoute from './routes/DoctorRoute.js';
import AdminRoute from './routes/AdminRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
cloudinaryConfig(); 

// Routes
app.use('/api/user', userRouter);
app.use('/api/admin', DoctorRoute);
app.use('/api/adminRoute', AdminRoute);

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Connect to DB
await connectDb(); // لو Vercel شغال بـ Node 18+ يدعم await top-level

export default app;