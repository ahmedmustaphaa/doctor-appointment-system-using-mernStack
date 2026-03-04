import express from "express";
import { upload } from "../middleware/multer.js";
import { AddDoctor, DoctorList, getDoctorById, getDoctors, loginAdmin } from "../controllers/DoctorController.js";
import { authAdmin } from "../middleware/AuthAdmin.js";
import { getMyAppointments } from "../controllers/Authrization.js";
const DoctorRoute = express.Router();

DoctorRoute.post("/addDoctor", upload.single("image"),AddDoctor);
DoctorRoute.post("/login",loginAdmin);
DoctorRoute.get("/getDoctors", getDoctors);
DoctorRoute.get("/DoctorList", DoctorList);

DoctorRoute.get("/get-doctor-byid/:docId", getDoctorById);

export default DoctorRoute;