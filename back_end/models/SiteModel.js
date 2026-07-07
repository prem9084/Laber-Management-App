import mongoose from "mongoose";

const SiteModel = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Site", SiteModel);
