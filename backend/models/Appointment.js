import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    slotDate: {
      type: String, // مثلا "2026-02-22"
      required: true,
    },

    slotTime: {
      type: String, // مثلا "16:30"
      required: true,
    },

    userData: {
      type: Object, // تخزين بيانات المستخدم وقت الحجز (اسم، ايميل، هاتف، ... )
      required: true,
    },

    doctorData: {
      type: Object, // بيانات الدكتور وقت الحجز (اسم، تخصص، صورة، ...)
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    cancelled: {
      type: Boolean,
      default: false, // مش ملغي افتراضياً
    },

    payment: {
      type: Boolean,
      default: false, // الدفع مش مؤكد افتراضياً
    },

    isCompleted: {
      type: Boolean,
      default: false, // لم يكتمل افتراضياً
    },
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);