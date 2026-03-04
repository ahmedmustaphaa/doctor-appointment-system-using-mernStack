import { Doctor } from "../models/doctorModel.js";
import { Appointment } from "../models/Appointment.js";
import { User } from "../models/User.js";

export const changeAvailable=async(req,res)=>{
    try{
        const {id}=req.body;

         const doctor=await Doctor.findById(id);
         doctor.available=!doctor.available;
            await doctor.save();    
            res.status(200).json({  
                success:true,
                    doctor      
            })
            
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error changing doctor availability",
            error:error.message
        })
    }
}


export const getAppointments=async(req,res)=>{

    try{
          const getAppointment=await Appointment.find({});

          res.json({success:true,appointments:getAppointment});
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error getting doctor",
            error:error.message
        })}
}

export const dashboardData=async(req,res)=>{
    try{
        const appointmentData=await Appointment.length;
        const doctorData=await Doctor.length;
        const userData=await User.length;

   const latestAppointment = await Appointment.find({})
  .sort({ createdAt: -1 }) 
  .limit(7);               

        res.json({success:true,appointment:appointmentData, doctor:doctorData,user:userData,latestAppointment})

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error fetching dashboardData",
            error:error.message
        })}
}