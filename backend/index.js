import express from 'express';
import userRouter from './routes/UserRoute.js';
import cors from 'cors';
import { cloudinaryConfig } from './config/cloudinary.js';
import DoctorRoute from './routes/DoctorRoute.js';
import AdminRoute from './routes/AdminRoute.js';

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

export default app;