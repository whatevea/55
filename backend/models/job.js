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
    // skills_required: {
    //   required: true,
    //   type: [String],
    // },
    university: {
      type: String,
      // required: true,
    },
    class: {
      type: String,
      // required: true,
    },
    budgetType: {
      required: true,
      type: String,
    },
    budgetHourlyMin: {
      type: Number,
    },
    budgetHourlyMax: {
      type: Number,
    },
    budgetFixed: {
      type: Number,
    },
    scopeDuration: {
      type: String,
    },
    scopeExperience: {
      type: String,
    },
    attachmentUrls: {
      type: [String],
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
