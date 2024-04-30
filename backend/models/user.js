import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fname: {
      type: String,
      required: true,
    },

    lname: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    skills: {
      type: [
        {
          label: String,
          value: String,
        },
      ],
    },

    // user_type: {
    //   type: String,
    //   default: "Freelancer",
    // },
  },
  { timestamps: true }
);
const User = mongoose.model("User", schema);
export default User;
