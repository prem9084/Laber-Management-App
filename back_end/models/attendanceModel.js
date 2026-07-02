import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
    },

    laberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

     date: {
      type: Date,
      default: Date.now,
    },

    type: {
        type: String,
        enum: ["0", "1"], // 0 = Thandi, 1 = Garam
        required: true
    },

    rate: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["present", "absent"],
        default: "present"
    }

}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);