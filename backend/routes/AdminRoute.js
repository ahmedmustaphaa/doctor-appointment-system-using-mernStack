import express from 'express';
import { changeAvailable, dashboardData, getAppointments } from '../controllers/AdminController.js';
const AdminRoute = express.Router();

AdminRoute.post("/change-available", changeAvailable);
AdminRoute.get("/get-appointment", getAppointments);
AdminRoute.get("/dashboard-data", dashboardData);


export default AdminRoute;