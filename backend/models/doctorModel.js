import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  specialty: { type: String },
  degree: { type: String },
  about: { type: String },
  experience: { type: Number, default: 0 }, // سنوات الخبرة
  available: { type: Boolean, default: true },
  fees: { type: Number, default: 0 },
 address: {
                   type:String
},

  date: { type: Date, default: Date.now },
  slots_booked: { type: [Date], default: [] }
}, { timestamps: true });

export const Doctor = mongoose.model("Doctor", doctorSchema);
