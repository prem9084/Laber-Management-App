import mongoose from "mongoose";

const userScheema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["0", "1"],
      default: "0",
    },
    createdBy: {
     type: mongoose.Schema.Types.ObjectId,
      required:true
    },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userScheema);
