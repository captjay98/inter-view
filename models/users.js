import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      enum: ["admin", "employer", "seeker"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { TimeStamps: true },
);

export default mongoose.model("User", userSchema);
