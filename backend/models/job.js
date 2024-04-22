import mongoose from "mongoose";
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },

    user_university: {
      type: String,
    },
    user_class: {
      type: String,
    },
    budgetType: {
      required: true,
      type: String,
    },
    // budgetHourlyPrice: {
    //   type: Number,
    // },
    budgetFixed: {
      type: Number,
    },
    scopeDuration: {
      type: String,
      default: "0 days",
    },
    scopeExperience: {
      type: String,
      default: "Entry",
    },
    attachmentUrls: {
      type: [String],
    },
    imagesUrls: {
      type: [String],
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
