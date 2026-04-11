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

app.use(cors());
app.use(express.json());

cloudinaryConfig(); 
app.use('/api/user', userRouter);
app.use('/api/admin', DoctorRoute);
app.use("/api/adminRoute", AdminRoute);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});   




await connectDb() 

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});